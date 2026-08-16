/**
 * Shared color tokens and material presets for the VANTA 3D environment.
 *
 * Centralizing these avoids scattering the same hex values and material
 * settings across scene components, and keeps the restrained material
 * palette (stone / metal / reflective / emissive) easy to audit in one
 * place as the environment grows more detailed.
 */

export const VANTA_COLOR = {
  void: "#07080a",
  fog: "#07080a",
  ambientCoolFill: "#3a4148",
  ambientDeepShadow: "#050506",
  keyLight: "#e7ecef",
  rimLight: "#7f96a6",
  portalGlow: "#5f7482",
  accentCool: "#a9b7c2",
  emissiveSeam: "#cdd8df",
  interiorGlow: "#d8d0c4",
} as const;

/** Dark stone/concrete — the plinth and base platform. */
export const STONE_MATERIAL = {
  color: "#191b1f",
  roughness: 0.92,
  metalness: 0.06,
} as const;

/** Dark, tightly finished metal — the primary tower mass. Bright enough to
 *  catch the key/rim lights so its form reads against the void; still
 *  clearly a dark material once lit. */
export const METAL_MATERIAL = {
  color: "#2b3039",
  roughness: 0.32,
  metalness: 0.82,
} as const;

/** A slightly rougher, less reflective metal — frames and recessed panels,
 *  reading as structurally distinct from the primary mass. */
export const METAL_PANEL_MATERIAL = {
  color: "#363c46",
  roughness: 0.5,
  metalness: 0.55,
} as const;

/** Distant background masses — kept flatter/matte so they recede into fog. */
export const SLAB_MATERIAL = {
  color: "#14171c",
  roughness: 0.82,
  metalness: 0.18,
} as const;

/** Near-black foreground framing elements — read mostly as silhouette. */
export const FOREGROUND_MATERIAL = {
  color: "#050607",
  roughness: 0.96,
  metalness: 0.02,
} as const;

/** A restrained emissive architectural seam. */
export const EMISSIVE_SEAM_MATERIAL = {
  color: VANTA_COLOR.emissiveSeam,
  emissive: VANTA_COLOR.emissiveSeam,
  roughness: 0.4,
  metalness: 0,
} as const;

/** Interior wall surface — slightly warmer than exterior metal, reads
 *  as a finished architectural surface rather than raw structure. */
export const INTERIOR_WALL_MATERIAL = {
  color: "#1c1f24",
  roughness: 0.78,
  metalness: 0.22,
} as const;

/** Interior floor — darker and more reflective than the exterior ground,
 *  giving the interior hall a distinct surface quality. */
export const INTERIOR_FLOOR_MATERIAL = {
  color: "#0d0f12",
  roughness: 0.45,
  metalness: 0.5,
} as const;

/** Interior ceiling — the darkest surface, so the eye reads the space
 *  as enclosed without the ceiling competing for attention. */
export const INTERIOR_CEILING_MATERIAL = {
  color: "#0a0b0d",
  roughness: 0.88,
  metalness: 0.1,
} as const;

/** Interior focal strip — the controlled visual destination at the back
 *  of the hall. A restrained warm-white emissive, dimmer than the
 *  exterior seams, suggesting depth and destination. */
export const INTERIOR_FOCAL_MATERIAL = {
  color: VANTA_COLOR.interiorGlow,
  emissive: VANTA_COLOR.interiorGlow,
  roughness: 0.5,
  metalness: 0,
} as const;
