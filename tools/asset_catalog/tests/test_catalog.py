from __future__ import annotations

import json
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

import pytest
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from catalog_lib import (  # noqa: E402
    CatalogConfig,
    SourceSpec,
    apply_audit_warnings,
    build_base_records,
    create_delivery_zip,
    generate_all_documents,
    inspect_non_model_assets,
    summarize_records,
    validate_generated_outputs,
    write_inventory_files,
    write_summary_json,
)


def create_fixture_repositories(tmp_path: Path) -> tuple[Path, Path]:
    demons = tmp_path / "demons"
    template = tmp_path / "template"
    (demons / "00_Packs_Raw" / "Test Pack").mkdir(parents=True)
    (demons / "01_Assets_Organizados" / "Textures").mkdir(parents=True)
    (demons / "02_ConceptArt").mkdir(parents=True)
    (template / "public" / "models" / "props").mkdir(parents=True)
    (template / "public" / "textures").mkdir(parents=True)
    (template / "public" / "audio").mkdir(parents=True)

    image = Image.new("RGBA", (128, 64), (120, 20, 40, 128))
    image.save(demons / "01_Assets_Organizados" / "Textures" / "blood_albedo.png")
    image.save(template / "public" / "textures" / "grass.png")
    image.save(demons / "02_ConceptArt" / "castle_concept.png")
    shutil.copy2(
        demons / "01_Assets_Organizados" / "Textures" / "blood_albedo.png",
        demons / "00_Packs_Raw" / "Test Pack" / "blood_albedo_duplicate.png",
    )

    obj = """o Triangle\nv 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3\n"""
    (template / "public" / "models" / "props" / "triangle.obj").write_text(obj, encoding="utf-8")

    with zipfile.ZipFile(demons / "00_Packs_Raw" / "Test Pack" / "bundle.zip", "w") as archive:
        archive.writestr("inside/asset.png", b"fake")
        archive.writestr("readme.txt", "test")
    (demons / "00_Packs_Raw" / "Test Pack" / "LICENSE.txt").write_text("Test license", encoding="utf-8")
    return demons, template


def test_discovery_dedup_and_image_metadata(tmp_path: Path) -> None:
    demons, template = create_fixture_repositories(tmp_path)
    specs = [
        SourceSpec("TEMPLATE", "template", template, "World of Claudecraft", [Path("public")]),
        SourceSpec("NOVO", "demons", demons, "Demons Whip", [Path("00_Packs_Raw"), Path("01_Assets_Organizados"), Path("02_ConceptArt")]),
    ]
    records = build_base_records(specs)
    assert len(records) == 6
    duplicate_records = [record for record in records if record["is_duplicate"]]
    assert len(duplicate_records) >= 3  # same RGBA content saved/copied across roots

    preview_dir = tmp_path / "previews"
    inspect_non_model_assets(records, preview_dir, 256)
    image_records = [record for record in records if record["kind"] == "IMAGE_TEXTURE"]
    assert image_records
    assert all(record["image_width"] == 128 for record in image_records)
    assert all(Path(record["preview_path"]).exists() for record in image_records)


def test_generate_documents_inventory_and_zip(tmp_path: Path) -> None:
    demons, template = create_fixture_repositories(tmp_path)
    specs = [
        SourceSpec("TEMPLATE", "template", template, "World of Claudecraft", [Path("public")]),
        SourceSpec("NOVO", "demons", demons, "Demons Whip", [Path("00_Packs_Raw"), Path("01_Assets_Organizados"), Path("02_ConceptArt")]),
    ]
    records = build_base_records(specs)
    output = tmp_path / "out"
    preview_dir = output / "previews"
    inspect_non_model_assets(records, preview_dir, 256)
    # Model fallback simulates an environment without Blender.
    for record in records:
        if record["kind"] == "MODEL_3D":
            placeholder = preview_dir / f"{record['asset_id']}.jpg"
            from catalog_lib import make_placeholder_preview
            make_placeholder_preview(placeholder, record["filename"], "3D test fallback", 256)
            record["preview_path"] = str(placeholder)
            record["technical_status"] = "UNSUPPORTED"
    config = CatalogConfig(
        output_dir=output,
        preview_size=256,
        max_model_assets_per_volume=10,
        max_image_assets_per_volume=10,
        max_generic_assets_per_volume=10,
    )
    apply_audit_warnings(records, config)
    data_files = write_inventory_files(records, output / "data")
    write_summary_json(records, output / "data")
    master, volumes = generate_all_documents(records, output, config, "template-test", "demons-test")
    assert master.exists() and master.stat().st_size > 0
    assert sum(row["asset_count"] for row in volumes) == len(records)
    assert json.loads(data_files["json"].read_text(encoding="utf-8"))[0]["preview_path"].startswith("previews/")

    if shutil.which("libreoffice"):
        from catalog_lib import convert_docx_files_to_pdf
        convert_docx_files_to_pdf([master] + [Path(row["docx_path"]) for row in volumes], output)
        validation = validate_generated_outputs(records, master, volumes, data_files, 92)
        assert validation["ok"], validation

    zip_path = tmp_path / "delivery.zip"
    create_delivery_zip(output, zip_path)
    assert zip_path.exists() and zip_path.stat().st_size > 0
    with zipfile.ZipFile(zip_path) as archive:
        names = archive.namelist()
        assert any(name.endswith("Demons_Whip_Inventario_Mestre.docx") for name in names)
        assert not any("/previews/" in name for name in names)


def test_summary_counts(tmp_path: Path) -> None:
    demons, template = create_fixture_repositories(tmp_path)
    records = build_base_records([
        SourceSpec("TEMPLATE", "template", template, "World of Claudecraft", [Path("public")]),
        SourceSpec("NOVO", "demons", demons, "Demons Whip", [Path("00_Packs_Raw"), Path("01_Assets_Organizados"), Path("02_ConceptArt")]),
    ])
    summary = summarize_records(records)
    assert summary["total_assets"] == len(records)
    assert summary["by_origin"]["TEMPLATE"] > 0
    assert summary["by_origin"]["NOVO"] > 0
