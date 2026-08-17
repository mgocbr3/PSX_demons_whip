#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
import time
from pathlib import Path

from catalog_lib import (
    CatalogConfig,
    SourceSpec,
    apply_audit_warnings,
    build_base_records,
    convert_docx_files_to_pdf,
    copy_committable_outputs,
    create_delivery_zip,
    generate_all_documents,
    human_bytes,
    inspect_non_model_assets,
    run_blender_model_inspection,
    summarize_records,
    utc_now_iso,
    validate_generated_outputs,
    write_inventory_files,
    write_readme,
    write_summary_json,
    write_volume_manifest,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate the full technical and visual asset catalog for Demons Whip."
    )
    parser.add_argument("--demons-root", type=Path, required=True, help="Checkout root of PSX_demons_whip")
    parser.add_argument("--template-root", type=Path, required=True, help="Checkout root of world-of-claudecraft")
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--repository-output-dir", type=Path)
    parser.add_argument("--delivery-zip", type=Path, required=True)
    parser.add_argument("--preview-size", type=int, default=512)
    parser.add_argument("--blender", default="blender")
    parser.add_argument("--blender-chunk-size", type=int, default=40)
    parser.add_argument("--skip-blender", action="store_true")
    parser.add_argument("--skip-pdf", action="store_true")
    parser.add_argument("--include-previews-in-zip", action="store_true")
    parser.add_argument("--template-commit", default=os.getenv("TEMPLATE_COMMIT", "unknown"))
    parser.add_argument("--demons-commit", default=os.getenv("DEMONS_COMMIT", "unknown"))
    parser.add_argument("--max-model-assets-per-volume", type=int, default=80)
    parser.add_argument("--max-image-assets-per-volume", type=int, default=240)
    parser.add_argument("--max-generic-assets-per-volume", type=int, default=160)
    parser.add_argument("--max-committable-file-mb", type=int, default=92)
    return parser.parse_args()


def log(message: str) -> None:
    print(f"[{utc_now_iso()}] {message}", flush=True)


def validate_inputs(args: argparse.Namespace) -> None:
    if not args.demons_root.exists():
        raise FileNotFoundError(f"Demons Whip checkout not found: {args.demons_root}")
    if not args.template_root.exists():
        raise FileNotFoundError(f"Template checkout not found: {args.template_root}")
    required_demons = [
        args.demons_root / "00_Packs_Raw",
        args.demons_root / "01_Assets_Organizados",
    ]
    if not any(path.exists() for path in required_demons):
        raise FileNotFoundError("No Demons Whip asset roots were found.")
    if not (args.template_root / "public").exists():
        raise FileNotFoundError("Template public directory was not found.")


def build_specs(args: argparse.Namespace) -> list[SourceSpec]:
    demons_include_roots = [
        Path("00_Packs_Raw"),
        Path("01_Assets_Organizados"),
        Path("02_ConceptArt"),
        Path("Torment Textures"),
    ]
    return [
        SourceSpec(
            origin="TEMPLATE",
            repository="mgocbr3/world-of-claudecraft",
            root=args.template_root.resolve(),
            label="World of Claudecraft",
            include_roots=[Path("public")],
        ),
        SourceSpec(
            origin="NOVO",
            repository="mgocbr3/PSX_demons_whip",
            root=args.demons_root.resolve(),
            label="Demons Whip - Assets Novos",
            include_roots=demons_include_roots,
        ),
    ]


def write_progress(output_dir: Path, stage: str, details: dict | None = None) -> None:
    payload = {
        "stage": stage,
        "updated_at": utc_now_iso(),
        "details": details or {},
    }
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "build_progress.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def main() -> int:
    args = parse_args()
    validate_inputs(args)
    config = CatalogConfig(
        output_dir=args.output_dir.resolve(),
        preview_size=args.preview_size,
        max_model_assets_per_volume=args.max_model_assets_per_volume,
        max_image_assets_per_volume=args.max_image_assets_per_volume,
        max_generic_assets_per_volume=args.max_generic_assets_per_volume,
        include_preview_folder_in_zip=args.include_previews_in_zip,
        max_committable_file_mb=args.max_committable_file_mb,
    )
    output_dir = config.output_dir
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    preview_dir = output_dir / "previews"
    work_dir = output_dir / ".work"
    data_dir = output_dir / "data"

    start = time.monotonic()
    log("Stage 1/8 - Discovering asset files in both repositories")
    write_progress(output_dir, "DISCOVERY")
    records = build_base_records(build_specs(args))
    if not records:
        raise RuntimeError("No assets were discovered. Check sparse checkout paths and extension policy.")
    base_summary = summarize_records(records)
    log(
        f"Discovered {len(records):,} assets ({human_bytes(base_summary['total_size_bytes'])}) - "
        f"template={base_summary['by_origin'].get('TEMPLATE', 0):,}, new={base_summary['by_origin'].get('NOVO', 0):,}"
    )
    write_progress(output_dir, "DISCOVERY_COMPLETE", {"asset_count": len(records)})

    log("Stage 2/8 - Inspecting images, textures, audio, video, fonts and containers")
    write_progress(output_dir, "NON_MODEL_INSPECTION", {"asset_count": len(records)})
    inspect_non_model_assets(records, preview_dir, config.preview_size)

    log("Stage 3/8 - Inspecting and rendering 3D models")
    write_progress(output_dir, "MODEL_INSPECTION")
    blender_script = Path(__file__).with_name("blender_batch.py")
    if args.skip_blender:
        blender_executable = "__missing_blender__"
    else:
        blender_executable = args.blender
    run_blender_model_inspection(
        records,
        blender_script=blender_script,
        preview_dir=preview_dir,
        work_dir=work_dir,
        blender_executable=blender_executable,
        chunk_size=args.blender_chunk_size,
        preview_size=config.preview_size,
    )

    log("Stage 4/8 - Applying technical warnings and writing structured inventories")
    write_progress(output_dir, "STRUCTURED_DATA")
    apply_audit_warnings(records, config)
    data_files = write_inventory_files(records, data_dir)
    summary_path = write_summary_json(records, data_dir)
    data_files["summary"] = summary_path
    summary = summarize_records(records)

    log("Stage 5/8 - Generating Word master and detailed catalog volumes")
    write_progress(output_dir, "DOCX_GENERATION", {"asset_count": len(records)})
    master_docx, volume_rows = generate_all_documents(
        records,
        output_dir=output_dir,
        config=config,
        template_commit=args.template_commit,
        demons_commit=args.demons_commit,
    )
    write_volume_manifest(volume_rows, data_dir)
    write_readme(output_dir, summary, volume_rows)

    docx_paths = [master_docx] + [Path(row["docx_path"]) for row in volume_rows]
    if not args.skip_pdf:
        log(f"Stage 6/8 - Converting {len(docx_paths):,} Word files to PDF")
        write_progress(output_dir, "PDF_CONVERSION", {"docx_count": len(docx_paths)})
        convert_docx_files_to_pdf(docx_paths, output_dir)
    else:
        log("Stage 6/8 - PDF conversion skipped by flag")

    log("Stage 7/8 - Validating completeness and package integrity")
    write_progress(output_dir, "VALIDATION")
    validation = validate_generated_outputs(
        records,
        master_docx=master_docx,
        volume_rows=volume_rows,
        data_files=data_files,
        max_file_mb=config.max_committable_file_mb,
    ) if not args.skip_pdf else {
        "ok": True,
        "errors": [],
        "warnings": ["PDF validation skipped because --skip-pdf was used."],
        "asset_count": len(records),
        "volume_asset_total": sum(row["asset_count"] for row in volume_rows),
        "volume_count": len(volume_rows),
    }
    (data_dir / "validation_report.json").write_text(
        json.dumps(validation, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    if not validation["ok"]:
        for error in validation["errors"]:
            log(f"VALIDATION ERROR: {error}")
        raise RuntimeError("Generated catalog failed completeness validation.")
    for warning in validation.get("warnings", []):
        log(f"VALIDATION WARNING: {warning}")

    if args.repository_output_dir:
        log("Copying committable outputs back into PSX_demons_whip checkout")
        manifest = copy_committable_outputs(
            output_dir,
            args.repository_output_dir.resolve(),
            max_file_mb=config.max_committable_file_mb,
        )
        log(
            f"Repository copy: {len(manifest['copied']):,} files copied, "
            f"{len(manifest['skipped_over_size']):,} skipped for size."
        )

    log("Stage 8/8 - Creating downloadable ZIP")
    write_progress(output_dir, "ZIP_CREATION")
    create_delivery_zip(
        output_dir,
        args.delivery_zip.resolve(),
        include_previews=args.include_previews_in_zip,
    )
    elapsed = time.monotonic() - start
    final_summary = {
        "status": "COMPLETE",
        "generated_at": utc_now_iso(),
        "elapsed_seconds": elapsed,
        "asset_count": len(records),
        "volume_count": len(volume_rows),
        "delivery_zip": str(args.delivery_zip.resolve()),
        "delivery_zip_size_bytes": args.delivery_zip.resolve().stat().st_size,
        "validation": validation,
    }
    (output_dir / "build_complete.json").write_text(
        json.dumps(final_summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    write_progress(output_dir, "COMPLETE", final_summary)
    log(
        f"Catalog complete: {len(records):,} assets, {len(volume_rows):,} detail volumes, "
        f"ZIP {human_bytes(args.delivery_zip.resolve().stat().st_size)}, elapsed {elapsed / 60:.1f} min."
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("Interrupted", file=sys.stderr)
        raise
