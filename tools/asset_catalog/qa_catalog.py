#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import math
import zipfile
from datetime import datetime, timezone
from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFont


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Render and audit every generated PDF page.")
    parser.add_argument("--catalog-dir", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--fail-on-blank", action="store_true")
    parser.add_argument("--render-dpi", type=int, default=54)
    return parser.parse_args()


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def page_metrics(page: fitz.Page, dpi: int) -> tuple[Image.Image, dict]:
    scale = dpi / 72.0
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    gray = image.convert("L")
    histogram = gray.histogram()
    total = max(1, image.width * image.height)
    dark_pixels = sum(histogram[:242])
    very_dark_pixels = sum(histogram[:210])
    ink_ratio = dark_pixels / total
    strong_ink_ratio = very_dark_pixels / total
    text = page.get_text("text").strip()
    blocks = page.get_text("blocks")
    is_blank = len(text) < 4 and ink_ratio < 0.0008
    return image, {
        "text_chars": len(text),
        "text_blocks": len(blocks),
        "ink_ratio": ink_ratio,
        "strong_ink_ratio": strong_ink_ratio,
        "is_blank": is_blank,
        "width_px": image.width,
        "height_px": image.height,
    }


def validate_docx(path: Path) -> tuple[bool, str]:
    try:
        with zipfile.ZipFile(path) as archive:
            names = set(archive.namelist())
            required = {"[Content_Types].xml", "word/document.xml"}
            missing = required - names
            if missing:
                return False, f"missing entries: {sorted(missing)}"
            bad = archive.testzip()
            if bad:
                return False, f"corrupt member: {bad}"
        return True, "ok"
    except Exception as exc:
        return False, f"{type(exc).__name__}: {exc}"


def make_contact_sheet(pdf_path: Path, samples: list[tuple[int, Image.Image]], output_path: Path) -> None:
    if not samples:
        return
    cell_w, cell_h = 360, 520
    cols = min(3, len(samples))
    rows = math.ceil(len(samples) / cols)
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), (225, 225, 228))
    draw = ImageDraw.Draw(sheet)
    title_font = font(15, bold=True)
    small_font = font(12)
    for index, (page_number, image) in enumerate(samples):
        thumb = image.copy()
        thumb.thumbnail((cell_w - 30, cell_h - 65), Image.Resampling.LANCZOS)
        x = (index % cols) * cell_w
        y = (index // cols) * cell_h
        canvas = Image.new("RGB", (cell_w - 10, cell_h - 10), "white")
        canvas.paste(thumb, ((canvas.width - thumb.width) // 2, 30))
        local_draw = ImageDraw.Draw(canvas)
        local_draw.text((10, 7), f"Página {page_number}", fill=(30, 30, 34), font=title_font)
        sheet.paste(canvas, (x + 5, y + 5))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output_path, "JPEG", quality=84, optimize=True)


def main() -> int:
    args = parse_args()
    catalog_dir = args.catalog_dir.resolve()
    output_dir = args.output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    flagged_dir = output_dir / "flagged_pages"
    contact_dir = output_dir / "contact_sheets"

    pdf_paths = sorted(catalog_dir.rglob("*.pdf"))
    docx_paths = sorted(catalog_dir.rglob("*.docx"))
    if not pdf_paths:
        raise RuntimeError(f"No PDFs found under {catalog_dir}")

    docx_results = []
    for path in docx_paths:
        valid, detail = validate_docx(path)
        docx_results.append({"path": str(path.relative_to(catalog_dir)), "valid": valid, "detail": detail})

    page_rows = []
    pdf_rows = []
    blank_pages = []
    render_errors = []
    for pdf_index, pdf_path in enumerate(pdf_paths, start=1):
        relative_pdf = str(pdf_path.relative_to(catalog_dir)).replace("\\", "/")
        try:
            document = fitz.open(pdf_path)
        except Exception as exc:
            render_errors.append({"pdf": relative_pdf, "error": f"{type(exc).__name__}: {exc}"})
            continue
        sample_indices = sorted(set([0, max(0, len(document) // 2), max(0, len(document) - 1)]))
        samples = []
        pdf_blank_count = 0
        for page_index in range(len(document)):
            try:
                page = document[page_index]
                image, metrics = page_metrics(page, args.render_dpi)
                row = {
                    "pdf": relative_pdf,
                    "page": page_index + 1,
                    **metrics,
                }
                page_rows.append(row)
                if page_index in sample_indices:
                    samples.append((page_index + 1, image))
                if metrics["is_blank"]:
                    pdf_blank_count += 1
                    blank_pages.append(row)
                    flagged_dir.mkdir(parents=True, exist_ok=True)
                    image.save(flagged_dir / f"{pdf_path.stem}_page_{page_index + 1:04d}.png")
            except Exception as exc:
                render_errors.append({
                    "pdf": relative_pdf,
                    "page": page_index + 1,
                    "error": f"{type(exc).__name__}: {exc}",
                })
        make_contact_sheet(pdf_path, samples, contact_dir / f"{pdf_path.stem}.jpg")
        pdf_rows.append({
            "pdf": relative_pdf,
            "pages": len(document),
            "blank_pages": pdf_blank_count,
            "size_bytes": pdf_path.stat().st_size,
        })
        document.close()

    with (output_dir / "pdf_page_audit.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        fieldnames = [
            "pdf", "page", "text_chars", "text_blocks", "ink_ratio", "strong_ink_ratio",
            "is_blank", "width_px", "height_px"
        ]
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(page_rows)

    summary = {
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "catalog_dir": str(catalog_dir),
        "pdf_count": len(pdf_paths),
        "docx_count": len(docx_paths),
        "total_pages_rendered": len(page_rows),
        "blank_page_count": len(blank_pages),
        "render_error_count": len(render_errors),
        "invalid_docx_count": sum(1 for row in docx_results if not row["valid"]),
        "pdfs": pdf_rows,
        "blank_pages": blank_pages,
        "render_errors": render_errors,
        "docx_validation": docx_results,
    }
    (output_dir / "qa_summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    ok = not render_errors and not any(not row["valid"] for row in docx_results)
    if args.fail_on_blank and blank_pages:
        ok = False
    print(json.dumps({
        "ok": ok,
        "pdf_count": summary["pdf_count"],
        "docx_count": summary["docx_count"],
        "total_pages_rendered": summary["total_pages_rendered"],
        "blank_page_count": summary["blank_page_count"],
        "render_error_count": summary["render_error_count"],
        "invalid_docx_count": summary["invalid_docx_count"],
    }, ensure_ascii=False))
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
