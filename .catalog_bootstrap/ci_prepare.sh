#!/usr/bin/env bash
set -euo pipefail

DEMONS="workspace/demons"
TEMPLATE="workspace/template"
ARCHIVE="/tmp/asset_catalog_bootstrap.tar.xz"

cat "$DEMONS"/.catalog_bootstrap/part_*.b64 | base64 --decode > "$ARCHIVE"
EXPECTED="$(tr -d '[:space:]' < "$DEMONS/.catalog_bootstrap/archive.sha256")"
echo "$EXPECTED  $ARCHIVE" | sha256sum -c -
tar -xJf "$ARCHIVE" -C "$DEMONS"
test -f "$DEMONS/tools/asset_catalog/generate_catalog.py"
test -f "$DEMONS/tools/asset_catalog/requirements.txt"

# Blender 3.x exposes dynamic operators in a way that can make hasattr() return
# true even when wm.obj_import is unavailable. Use an actual call with a
# fallback to the legacy OBJ importer so OBJ files are measured instead of
# being cataloged as errors.
python - "$DEMONS/tools/asset_catalog/blender_batch.py" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text(encoding="utf-8")
old = '''    if ext == ".obj":
        if hasattr(bpy.ops.wm, "obj_import"):
            bpy.ops.wm.obj_import(filepath=str(path))
        else:
            bpy.ops.import_scene.obj(filepath=str(path))
        return
'''
new = '''    if ext == ".obj":
        try:
            bpy.ops.wm.obj_import(filepath=str(path))
        except Exception:
            bpy.ops.import_scene.obj(filepath=str(path))
        return
'''
if old in text:
    path.write_text(text.replace(old, new), encoding="utf-8")
elif new not in text:
    raise SystemExit("OBJ importer patch target was not found")
PY

git clone --depth 1 --filter=blob:none --no-checkout \
  https://github.com/mgocbr3/world-of-claudecraft.git "$TEMPLATE"
git -C "$TEMPLATE" sparse-checkout init --no-cone
cat > "$TEMPLATE/.git/info/sparse-checkout" <<'PATTERNS'
/public/
/CREDITS.md
/LICENSE
/THIRD_PARTY_NOTICES.md
PATTERNS
git -C "$TEMPLATE" checkout main

echo "DEMONS_COMMIT=$(git -C "$DEMONS" rev-parse HEAD)" >> "$GITHUB_ENV"
echo "TEMPLATE_COMMIT=$(git -C "$TEMPLATE" rev-parse HEAD)" >> "$GITHUB_ENV"
echo "CATALOG_BRANCH=${GITHUB_REF_NAME}" >> "$GITHUB_ENV"
echo "Demons checkout:" && du -sh "$DEMONS"
echo "Template checkout:" && du -sh "$TEMPLATE"
df -h
rm -rf "$TEMPLATE/.git"
