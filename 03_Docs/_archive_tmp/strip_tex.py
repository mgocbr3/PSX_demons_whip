from pygltflib import GLTF2
from pathlib import Path

src = Path(r"C:\\Users\\PCSP\\Documents\\doc\\PSX_demons_whip\\03_Docs\\Previews_Entity_Map\\converted\\paladin_uncompressed.glb")
out = src.with_name(src.stem + '_novis.glb')

g = GLTF2().load(str(src))

# remove basisU extension refs
for attr in ['extensionsUsed', 'extensionsRequired']:
    arr = getattr(g, attr, None)
    if arr:
        setattr(g, attr, [x for x in arr if x != 'KHR_texture_basisu'])
        if getattr(g, attr) == []:
            setattr(g, attr, None)

# remove all texture references from materials
if g.materials:
    for m in g.materials:
        if m.pbrMetallicRoughness:
            m.pbrMetallicRoughness.baseColorTexture = None
            m.pbrMetallicRoughness.metallicRoughnessTexture = None
        m.normalTexture = None
        m.occlusionTexture = None
        m.emissiveTexture = None

# remove textures/images
g.textures = []
g.images = []

g.save_binary(str(out))
print(out)
