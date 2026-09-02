import json
from pathlib import Path
from pygltflib import GLTF2

root = Path('C:/Users/PCSP/Documents/doc/PSX_demons_whip/03_Docs/Previews_Entity_Map')
src = root / 'tmp_preview_tasks_missing.json'
out_tasks = []
with src.open('r', encoding='utf-8') as f:
    tasks = json.load(f)

for t in tasks:
    a = Path(t['asset'])
    out = a.with_name(a.stem + '_novis' + a.suffix)
    if not out.exists():
        g = GLTF2().load_binary(str(a))
        if g.extensionsUsed:
            g.extensionsUsed = [x for x in g.extensionsUsed if x != 'KHR_texture_basisu'] or None
        if g.extensionsRequired:
            g.extensionsRequired = [x for x in g.extensionsRequired if x != 'KHR_texture_basisu'] or None
        if g.materials:
            for m in g.materials:
                if m.pbrMetallicRoughness:
                    m.pbrMetallicRoughness.baseColorTexture = None
                    m.pbrMetallicRoughness.metallicRoughnessTexture = None
                m.normalTexture = None
                m.occlusionTexture = None
                m.emissiveTexture = None
        g.textures = []
        g.images = []
        g.save_binary(str(out))
        print(f'converted:{a.name}')
    else:
        print(f'exists:{a.name}')
    t['asset'] = str(out)
    out_tasks.append(t)

out_file = root / 'tmp_preview_tasks_missing_novis.json'
with out_file.open('w', encoding='utf-8') as f:
    json.dump(out_tasks, f, ensure_ascii=False, indent=2)
print(out_file)
