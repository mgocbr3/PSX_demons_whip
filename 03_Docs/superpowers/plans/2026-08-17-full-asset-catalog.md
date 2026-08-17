# Demons Whip Full Asset Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a complete technical and visual inventory of every catalogable asset in the World of Claudecraft template and the new Demons Whip asset repository, publish Word/PDF volumes and structured data, and provide a downloadable ZIP.

**Architecture:** A Python orchestrator scans both repository checkouts, hashes and classifies every supported asset file, delegates 3D inspection/rendering to Blender, uses Pillow/fontTools/FFmpeg for other media, generates split Word/PDF volumes, validates every generated PDF page, and uploads the package through GitHub Actions. Generated outputs are copied back to an isolated documentation branch when each file is below GitHub’s regular file-size limit.

**Tech Stack:** Python 3.12, Blender, Pillow, python-docx, LibreOffice, FFmpeg/FFprobe, fontTools, PyMuPDF, GitHub Actions.

## Global Constraints

- Template and new assets must remain explicitly separated by `origin`.
- No technical field may be invented; unsupported fields must be marked `PARTIAL`, `UNSUPPORTED`, or `ERROR`.
- Every cataloged asset must have a preview image or an explicit technical placeholder.
- Exact duplicates must be detected by SHA-256 and listed without being silently discarded.
- Generated Word/PDF files must be split into volumes small enough for GitHub and normal desktop use.
- The replacement matrix is created empty; mapping decisions belong to the next project phase.
- Work occurs on `docs/full-asset-catalog-2026-08-17`, never directly on `main`.

---

### Task 1: Build asset discovery and classification

**Files:**
- Create: `tools/asset_catalog/catalog_lib.py`
- Test: `tools/asset_catalog/tests/test_catalog.py`

**Interfaces:**
- Produces: `build_base_records(specs: Sequence[SourceSpec]) -> list[dict]`
- Produces: stable fields `asset_id`, `origin`, `relative_path`, `kind`, `category`, `pack`, `size_bytes`, `sha256`.

- [ ] Discover only catalogable asset extensions from the approved roots.
- [ ] Calculate SHA-256 and duplicate groups.
- [ ] Detect nearby license evidence without treating it as legal approval.
- [ ] Verify discovery, origin separation, and duplicate grouping with synthetic fixtures.

### Task 2: Extract media and 3D technical metadata

**Files:**
- Create: `tools/asset_catalog/blender_batch.py`
- Modify: `tools/asset_catalog/catalog_lib.py`
- Test: `tools/asset_catalog/tests/test_catalog.py`

**Interfaces:**
- Produces: per-asset preview path and kind-specific metadata.
- Consumes: base asset records from Task 1.

- [ ] Inspect image dimensions, channels, alpha, power-of-two, memory estimate, and texture role.
- [ ] Inspect audio/video codec, duration, channels, sample rate, bitrate, FPS, and resolution.
- [ ] Inspect font names and glyph counts.
- [ ] Inspect model geometry, materials, UVs, armatures, bones, animation clips, bounds, LOD and collider names in Blender.
- [ ] Render neutral previews while preserving source materials when possible.
- [ ] Mark compiled containers and unsupported source formats explicitly.

### Task 3: Generate structured inventory and optimization baseline

**Files:**
- Modify: `tools/asset_catalog/catalog_lib.py`

**Interfaces:**
- Produces: `asset_inventory_full.csv`, `asset_inventory_full.json`, `duplicate_groups.csv`, `unsupported_or_partial_assets.csv`, `replacement_matrix_template.csv`.

- [ ] Emit all measured fields without runner-local absolute paths.
- [ ] Add technical warnings for excessive triangle/material/texture budgets and missing licenses.
- [ ] Create an empty template-to-new replacement matrix for the next phase.

### Task 4: Generate Word and PDF catalog volumes

**Files:**
- Modify: `tools/asset_catalog/catalog_lib.py`
- Create: `tools/asset_catalog/generate_catalog.py`

**Interfaces:**
- Produces: master Word/PDF plus detailed volumes with 100% asset coverage.

- [ ] Create master cover, methodology, counts, risks, status definitions, and volume index.
- [ ] Create one-page technical sheets for 3D models.
- [ ] Create compact visual sheets for textures, UI, audio, video, fonts, and containers.
- [ ] Split by origin, category, type, and maximum assets per volume.
- [ ] Convert every DOCX to PDF using LibreOffice.

### Task 5: Validate every output page and package delivery

**Files:**
- Create: `tools/asset_catalog/qa_catalog.py`
- Modify: `tools/asset_catalog/generate_catalog.py`

**Interfaces:**
- Produces: `qa_summary.json`, `pdf_page_audit.csv`, contact sheets, downloadable ZIP.

- [ ] Verify every DOCX ZIP structure.
- [ ] Render every PDF page and record ink/text metrics.
- [ ] Fail on render errors, corrupt documents, or blank pages.
- [ ] Verify the sum of volume asset counts equals the inventory asset count.
- [ ] Create the final ZIP without duplicating the raw preview folder.

### Task 6: Automate checkout, generation, repository copy, and artifact upload

**Files:**
- Create: `.github/workflows/build-full-asset-catalog.yml`
- Create: `tools/asset_catalog/requirements.txt`
- Create: `tools/asset_catalog/README.md`

**Interfaces:**
- Consumes: `mgocbr3/PSX_demons_whip` branch and sparse checkout of `mgocbr3/world-of-claudecraft`.
- Produces: repository files under `03_Docs/Asset_Catalog/` and Actions artifact `Demons_Whip_Asset_Catalog_FULL`.

- [ ] Checkout both repositories using partial clone/sparse checkout.
- [ ] Install Blender, LibreOffice, FFmpeg, and Python dependencies.
- [ ] Run tests before the full build.
- [ ] Generate and validate the catalog.
- [ ] Commit committable outputs back to the documentation branch.
- [ ] Upload the full ZIP and QA package as GitHub Actions artifacts.
