import struct
from pathlib import Path
import numpy as np
from pygltflib import GLTF2

glb=Path(r'C:\Users\PCSP\Documents\doc\PSX_demons_whip\03_Docs\Previews_Entity_Map\converted\warrior_ability_anims_uncompressed.glb')
gltf=GLTF2().load(str(glb))
bin_blob=gltf.binary_blob()

comp_map={5120: ('b', np.int8),5121: ('B', np.uint8),5122: ('h', np.int16),5123: ('H', np.uint16),5125: ('I', np.uint32),5126: ('f', np.float32)}

type_count={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT4':16}

def accessor_data(acc):
    bv=gltf.bufferViews[acc.bufferView]
    buf=gltf.buffers[bv.buffer].data()
    raw=buf
    if bv.byteOffset: off=bv.byteOffset
    else: off=0
    if acc.byteOffset: off+=acc.byteOffset
    comp=comp_map[acc.componentType]
    dtype=np.dtype(comp[1])
    count=acc.count*type_count[acc.type]
    size=dtype.itemsize*count
    data=np.frombuffer(raw[off:off+size], dtype=dtype, count=count)
    data=data.astype(np.float32) if dtype==np.float32 else data
    if acc.normalized:
        if dtype==np.uint16:
            data=data/65535.0
        elif dtype==np.int16:
            data=np.maximum(data/32767.0,-1.0)
    return data.reshape((-1,type_count[acc.type]))

mesh=gltf.meshes[0]
prim=mesh.primitives[0]
pos=accessor_data(gltf.accessors[prim.attributes['POSITION']])
if prim.indices is None:
    idx=np.arange(len(pos),dtype=np.uint32)
else:
    idx=accessor_data(gltf.accessors[prim.indices]).astype(np.uint32).reshape(-1)
faces=idx.reshape(-1,3)+1
print(pos.shape, faces.shape)
