from pathlib import Path
import json
import re
import subprocess

REPO = Path(r'C:\Users\PCSP\Documents\doc\PSX_demons_whip')
TABLE_PATH = REPO / '03_Docs' / 'TABELA_DECISAO_SUBSTITUICAO_ENTIDADES.md'
ASSET_ROOT = REPO / '01_Assets_Organizados'
OUT_DIR = REPO / '03_Docs' / 'Previews_Entity_Map'
OUT_DIR.mkdir(parents=True, exist_ok=True)
CONVERTED_DIR = OUT_DIR / 'converted'
CONVERTED_DIR.mkdir(parents=True, exist_ok=True)
BLENDER_EXE = Path(r'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe')
NPX_CMD = Path(r'C:\Program Files\nodejs\npx.cmd')

PREFIX_MAP = {'chars': 'Characters', 'creatures': 'Enemies', 'mounts': 'Mounts'}
MESHOPT_MARKER = b'EXT_meshopt_compression'


def clean_cell(value: str) -> str:
    return value.strip().strip('`').strip()


def normalize_path(rel_path: str) -> Path | None:
    rel_path = clean_cell(rel_path)
    if not rel_path:
        return None

    rel = rel_path.replace('/', '\\').split('\\')
    if not rel:
        return None

    if rel[0] in PREFIX_MAP:
        rel[0] = PREFIX_MAP[rel[0]]
    if len(rel) > 1 and rel[1] == 'players':
        rel = [rel[0]] + rel[2:]

    candidate = ASSET_ROOT.joinpath(*rel)
    if candidate.exists():
        return candidate

    stem = candidate.stem
    folder = ASSET_ROOT / rel[0] if rel else ASSET_ROOT

    fallback_names = [
        f'{stem}_ability_anims.glb',
        f'{stem}_hit_variety_anims.glb',
        f'{stem}_classic.glb',
        f'ps1_psx_{stem}.glb',
        f'ps1_{stem}.glb',
        f'psx_{stem}.glb',
    ]
    for name in fallback_names:
        alt = folder / name
        if alt.exists():
            return alt

    for alt in sorted(folder.rglob(f'{stem}*.glb')):
        if alt.is_file():
            return alt

    return None


def slugify(text: str) -> str:
    text = re.sub(r'\*\*', '', text)
    text = text.strip().lower()
    text = re.sub(r'[^0-9a-zA-Z]+', '_', text)
    return text.strip('_') or 'item'


def requires_uncompress(path: Path) -> bool:
    return MESHOPT_MARKER in path.read_bytes()


def ensure_uncompressed(path: Path) -> Path:
    if not requires_uncompress(path):
        return path

    out = CONVERTED_DIR / (path.stem + '_uncompressed.glb')
    if out.exists():
        return out

    cmd = [
        str(NPX_CMD),
        '--yes',
        '@gltf-transform/cli@latest',
        'copy',
        str(path),
        str(out),
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        log = OUT_DIR / 'meshopt_convert_log.txt'
        log.write_text((r.stdout or '') + '\n' + (r.stderr or ''), encoding='utf-8')
        raise RuntimeError(f'Falha ao converter {path}')
    return out


def parse_markdown_row(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip('|').split('|')]


lines = TABLE_PATH.read_text(encoding='utf-8').splitlines()
updates: dict[int, tuple[Path, list[str]]] = {}
tasks = []

for idx, line in enumerate(lines):
    if not line.startswith('|'):
        continue

    cols = parse_markdown_row(line)
    if len(cols) < 8:
        continue

    preview = cols[7]
    if 'Gerar preview (Blender)' not in preview:
        continue

    base = normalize_path(cols[4])
    proposed = normalize_path(cols[5])
    source = proposed or base
    if source is None:
        continue

    try:
        render_source = ensure_uncompressed(source)
    except Exception:
        continue

    out_name = f"{idx + 1:03d}_{slugify(cols[3])}_{slugify(cols[2])}.png"
    out_path = OUT_DIR / out_name

    tasks.append({
        'asset': str(render_source),
        'out': str(out_path),
        'entity': cols[2],
    })
    updates[idx] = (out_path, cols)

# JSON for Blender
tasks_json = OUT_DIR / 'tmp_preview_tasks.json'
tasks_json.write_text(json.dumps(tasks, indent=2), encoding='utf-8')

# Blender batch script
blend_script = OUT_DIR / 'tmp_render_previews_blender.py'
blend_script.write_text(r'''
import bpy
import json
import os
import sys
from mathutils import Vector


def parse_args():
    if '--' not in sys.argv:
        return []
    return sys.argv[sys.argv.index('--') + 1 :]


def render_task(task):
    asset = task['asset']
    out = task['out']

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=asset)

    mesh_objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    if not mesh_objs:
        print(f'Sem malha para render: {asset}')
        return

    points = []
    for o in mesh_objs:
        for corner in o.bound_box:
            points.append(o.matrix_world @ Vector(corner))

    if not points:
        print(f'Bounds não encontrado: {asset}')
        return

    min_v = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    max_v = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    center = (min_v + max_v) * 0.5
    size = max(max_v - min_v)
    if size <= 0:
        size = 1.0

    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE'
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.resolution_x = 768
    scene.render.resolution_y = 768
    scene.render.filepath = out

    bpy.ops.object.light_add(type='SUN', location=(center.x + size, center.y + size, center.z + size * 1.6))
    light = bpy.context.object
    light.data.energy = 6.0

    bpy.ops.object.light_add(type='AREA', location=(center.x - size, center.y + size, center.z + size * 1.1))
    fill = bpy.context.object
    fill.data.energy = 1000
    fill.data.size = size * 1.2

    bpy.ops.object.camera_add(location=(center.x, center.y - size * 3.0, center.z + size * 1.4))
    camera = bpy.context.object
    camera.data.lens = 35
    camera.data.clip_start = 0.05
    camera.data.clip_end = max(size * 20.0, 100.0)

    pivot = bpy.data.objects.new('PreviewPivot', None)
    pivot.location = center
    scene.collection.objects.link(pivot)

    con = camera.constraints.new('TRACK_TO')
    con.track_axis = 'TRACK_NEGATIVE_Z'
    con.up_axis = 'UP_Y'
    con.target = pivot

    scene.camera = camera
    bpy.ops.render.render(write_still=True)


def main():
    args = parse_args()
    if not args:
        return
    with open(args[0], 'r', encoding='utf-8') as f:
        tasks = json.load(f)

    for task in tasks:
        try:
            render_task(task)
        except Exception as e:
            print(f'Erro no render {task.get("asset")}: {e}')


if __name__ == '__main__':
    main()
''', encoding='utf-8')

if tasks:
    cmd = [
        str(BLENDER_EXE),
        '--background',
        '--python',
        str(blend_script),
        '--',
        str(tasks_json),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        (OUT_DIR / 'blender_render_log.txt').write_text((result.stdout or '') + '\n' + (result.stderr or ''), encoding='utf-8')

# Update markdown
new_lines = []
for i, line in enumerate(lines):
    if i not in updates:
        new_lines.append(line)
        continue

    out_path, cols = updates[i]
    if Path(out_path).exists():
        cols[7] = f"![{cols[3]}]({out_path})"
        new_lines.append('| ' + ' | '.join(cols) + ' |')
    else:
        new_lines.append(line)

TABLE_PATH.write_text('\n'.join(new_lines) + '\n', encoding='utf-8')

print(json.dumps({'tasks': len(tasks), 'updates': len(updates)}))
