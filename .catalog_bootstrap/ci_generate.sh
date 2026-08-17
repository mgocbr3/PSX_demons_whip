#!/usr/bin/env bash
set -euo pipefail

DEMONS="workspace/demons"
TEMPLATE="workspace/template"

cd "$DEMONS"
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add tools/asset_catalog 03_Docs/superpowers
if ! git diff --cached --quiet; then
  git commit -m "chore: add full asset catalog generator and specifications [skip ci]"
  git push origin "HEAD:${CATALOG_BRANCH}"
fi
cd "$GITHUB_WORKSPACE"

rm -rf "$DEMONS/03_Docs/Asset_Catalog" "$CATALOG_OUTPUT" "$DELIVERY_ZIP"
mkdir -p "$CATALOG_OUTPUT"
python "$DEMONS/tools/asset_catalog/generate_catalog.py" \
  --demons-root "$DEMONS" \
  --template-root "$TEMPLATE" \
  --output-dir "$CATALOG_OUTPUT" \
  --repository-output-dir "$DEMONS/03_Docs/Asset_Catalog" \
  --delivery-zip "$DELIVERY_ZIP" \
  --preview-size 448 \
  --blender-chunk-size 30 \
  --max-model-assets-per-volume 70 \
  --max-image-assets-per-volume 220 \
  --max-generic-assets-per-volume 140 \
  --max-committable-file-mb 92 \
  --template-commit "$TEMPLATE_COMMIT" \
  --demons-commit "$DEMONS_COMMIT"

# A structurally valid document is not enough: the user explicitly needs
# polygons, rigs and animation data. Refuse to publish if Blender failed to
# inspect almost all model files or if previews/volume coverage are incomplete.
python - "$CATALOG_OUTPUT/data/asset_inventory_full.csv" <<'PY'
import csv
import sys
from collections import Counter
from pathlib import Path

inventory = Path(sys.argv[1])
with inventory.open(newline="", encoding="utf-8-sig") as handle:
    rows = list(csv.DictReader(handle))

models = [row for row in rows if row.get("kind") == "MODEL_3D"]
analyzed = [
    row for row in models
    if row.get("technical_status") == "OK"
    and row.get("model_triangles", "") not in {"", None}
    and row.get("model_vertices", "") not in {"", None}
]
coverage = len(analyzed) / max(1, len(models))
missing_previews = sum(1 for row in rows if not row.get("preview_path"))
image_errors = sum(
    1 for row in rows
    if row.get("kind") == "IMAGE_TEXTURE" and row.get("technical_status") == "ERROR"
)
status_counts = Counter(row.get("technical_status", "") for row in rows)

print(f"Technical status: {dict(status_counts)}")
print(f"Model inspection coverage: {len(analyzed)}/{len(models)} ({coverage:.2%})")
print(f"Image inspection errors: {image_errors}")
print(f"Missing preview references: {missing_previews}")

errors = []
if not models:
    errors.append("No 3D models were discovered.")
if coverage < 0.95:
    errors.append(f"3D technical coverage below 95%: {coverage:.2%}.")
if missing_previews:
    errors.append(f"{missing_previews} assets have no preview reference.")
if image_errors > 150:
    errors.append(f"Too many image/texture inspection errors: {image_errors}.")
if errors:
    raise SystemExit("\n".join(errors))
PY

python "$DEMONS/tools/asset_catalog/qa_catalog.py" \
  --catalog-dir "$CATALOG_OUTPUT" \
  --output-dir "$CATALOG_OUTPUT/qa" \
  --render-dpi 54 \
  --fail-on-blank

PYTHONPATH="$DEMONS/tools/asset_catalog" python - <<'PY'
from pathlib import Path
from catalog_lib import copy_committable_outputs, create_delivery_zip

output = Path("/tmp/demons-whip-asset-catalog")
repo_output = Path("workspace/demons/03_Docs/Asset_Catalog")
copy_committable_outputs(output, repo_output, max_file_mb=92)
create_delivery_zip(output, Path("/tmp/Demons_Whip_Asset_Catalog_FULL.zip"), include_previews=False)
PY

rm -rf "$CATALOG_OUTPUT/previews" "$CATALOG_OUTPUT/.work"
du -sh "$DEMONS/03_Docs/Asset_Catalog" "$DELIVERY_ZIP"
df -h
