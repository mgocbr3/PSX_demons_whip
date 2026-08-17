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
