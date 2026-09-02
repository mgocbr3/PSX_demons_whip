import * as THREE from "three";

// PSX affine + vertex jitter + fog - render only, nao toca sim (GDD 8.5)
export function createPSXMaterial(baseColor: number, opts: { roughness?: number, map?: THREE.Texture } = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: opts.roughness ?? 0.85,
    metalness: 0.08,
    map: opts.map ?? null,
  });
  if (mat.map) {
    mat.map.magFilter = THREE.NearestFilter;
    mat.map.minFilter = THREE.NearestFilter;
    mat.map.colorSpace = THREE.SRGBColorSpace;
  }
  mat.onBeforeCompile = (shader: any) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uJitter;")
      .replace("#include <begin_vertex>", `
        #include <begin_vertex>
        // PSX vertex snap + jitter (Style Bible 4)
        float snap = 32.0;
        transformed.x = floor(transformed.x * snap) / snap;
        transformed.y = floor(transformed.y * snap) / snap;
        transformed.z = floor(transformed.z * snap) / snap;
        transformed += (fract(sin(dot(position.xy, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * uJitter;
      `);
    shader.uniforms.uJitter = { value: 0.02 };
  };
  return mat;
}

export function makeDitherTexture() {
  const size = 4;
  const data = new Uint8Array(size * size * 4);
  const pattern = [0,8,2,10, 12,4,14,6, 3,11,1,9, 15,7,13,5];
  for (let i=0;i<size*size;i++) {
    const v = (pattern[i] / 16) * 255;
    data[i*4+0]=v; data[i*4+1]=v; data[i*4+2]=v; data[i*4+3]=255;
  }
  const tex = new THREE.DataTexture(data, size, size);
  tex.magFilter = THREE.NearestFilter; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.needsUpdate=true;
  return tex;
}

// GDD 12.2 - terreno por paleta, fog PSX
export function createGroundForZone(groundColor:number){
  const mat = createPSXMaterial(groundColor, { roughness: 0.95 });
  const geo = new THREE.PlaneGeometry(120,120, 12,12);
  const pos = geo.attributes.position;
  for(let i=0;i<pos.count;i++){ pos.setZ(i, pos.getZ(i) + (Math.random()-0.5)*0.18 ); }
  pos.needsUpdate=true;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x=-Math.PI/2;
  return mesh;
}

export function telegraphRing(color:number = 0xff2a2a){
  const geo = new THREE.RingGeometry(1.2, 1.45, 16);
  const mat = new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0.65, side:THREE.DoubleSide });
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x=-Math.PI/2;
  m.position.y=0.02;
  return m;
}
