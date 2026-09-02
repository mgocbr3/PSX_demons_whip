import { ZoneId, ZONES } from "./types";

// Determ deterministic world seed positions - preserves coords per GDD 12.1
export const ZONE_SPAWNS: Record<ZoneId, { x:number, z:number }> = {
  vale_of_cinders: { x:0, z:0 },
  drowned_mire: { x:42, z:-8 },
  thornpeak_gallows: { x:-38, z:-34 },
  forsaken_shore: { x:38, z:32 },
  veiled_hollow: { x:-22, z:28 },
  cinder_drakelands: { x:0, z:-48 },
  frostveil_wastes: { x:-46, z:12 },
};

export function getZonePalette(zone:ZoneId){
  return ZONES[zone];
}

export function zoneFogFor(zone:ZoneId){
  const z=ZONES[zone];
  return { color: z.fogColor, near: 16, far: zone==="veiled_hollow"? 48 : 58 };
}
