import { CatmullRomCurve3, Vector3 } from "three";

export type CameraKeyframe = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
};

export type CameraTimeline = {
  /** ARRIVAL → APPROACH → ENTRANCE → THRESHOLD → INTERIOR → TRANSFORMATION → DEEP ENVIRONMENT, as a single
   *  smooth spline rather than independent straight-line segments — this
   *  is what keeps the motion reading as one continuous dolly instead of
   *  a route with visible corners. */
  positionCurve: CatmullRomCurve3;
  lookAtCurve: CatmullRomCurve3;
  fovKeyframes: number[];
};

function buildTimeline(keyframes: CameraKeyframe[]): CameraTimeline {
  return {
    positionCurve: new CatmullRomCurve3(
      keyframes.map((k) => new Vector3(...k.position)),
      false,
      "catmullrom",
      0.5,
    ),
    lookAtCurve: new CatmullRomCurve3(
      keyframes.map((k) => new Vector3(...k.lookAt)),
      false,
      "catmullrom",
      0.5,
    ),
    fovKeyframes: keyframes.map((k) => k.fov),
  };
}

/**
 * Desktop journey. Phases 1–3 (ARRIVAL → APPROACH → ENTRANCE) are
 * unchanged. Phase 4 continues through the portal:
 *
 * THRESHOLD — camera settles between the portal frame and the rear mass,
 * looking straight through the doorway into the interior depth. The
 * portal opening becomes the dominant frame.
 *
 * INTERIOR — camera has crossed the threshold and sits inside the
 * interior hall, centered on the back-wall focal strip. The exterior
 * is now behind the camera; the interior is the primary composition.
 *
 * Keyframe positions are in world space. The interior keyframes are
 * placed along the monolith's local -z axis (the monolith group is at
 * [0.6, 0, -0.4] with Y-rotation 0.35 rad), so world-space x decreases
 * and z decreases as the camera travels deeper.
 */
export const DESKTOP_KEYFRAMES: CameraKeyframe[] = [
  { position: [7.6, 3.1, 10.8], lookAt: [0.2, 3.8, -0.3], fov: 32 },   // ARRIVAL
  { position: [4.1, 3.6, 6.0], lookAt: [0.5, 3.9, 0.05], fov: 31 },    // APPROACH
  { position: [1.5, 3.3, 2.3], lookAt: [0.77, 4.05, 0.1], fov: 29 },   // ENTRANCE
  { position: [0.7, 3.6, -0.1], lookAt: [-1.0, 3.8, -5.0], fov: 28 },  // THRESHOLD
  { position: [-0.6, 3.3, -3.7], lookAt: [-1.5, 3.5, -6.3], fov: 31 }, // INTERIOR
  { position: [-0.15, 3.35, -5.8], lookAt: [-0.05, 3.65, -8.0], fov: 29 }, // TRANSFORMATION
  { position: [-0.05, 3.2, -14.6], lookAt: [0, 3.45, -20.2], fov: 30 }, // DEEP ENVIRONMENT
  { position: [0, 3.25, -22.2], lookAt: [0, 3.55, -29.5], fov: 31 }, // FINAL APPROACH
  { position: [0, 3.55, -28.8], lookAt: [0, 3.85, -35.0], fov: 34 }, // FINAL REVEAL
];

/**
 * Mobile journey — not a scaled-down copy of the desktop path. The
 * mobile camera starts further back, on-axis, with a wider FOV. The
 * Phase 4 THRESHOLD and INTERIOR keyframes stay centered on the
 * monolith's local axis (world x ≈ 0.6–0.65) so the narrower viewport
 * never loses the portal opening, and the INTERIOR pose sits closer to
 * the threshold than desktop (z ≈ -3.2 vs -3.7) with a wider FOV (33 vs
 * 31) so the back-wall focal strip stays legible on a tall-narrow screen
 * without the side walls crowding in.
 */
export const MOBILE_KEYFRAMES: CameraKeyframe[] = [
  { position: [0.6, 3.4, 13.5], lookAt: [0.4, 3.8, -0.3], fov: 36 },    // ARRIVAL
  { position: [0.9, 3.6, 8.0], lookAt: [0.6, 3.9, 0.05], fov: 34 },     // APPROACH
  { position: [1.1, 3.2, 3.4], lookAt: [0.77, 4.0, 0.1], fov: 31 },    // ENTRANCE
  { position: [0.65, 3.4, -0.1], lookAt: [-0.9, 3.6, -4.5], fov: 30 },  // THRESHOLD
  { position: [-0.4, 3.2, -3.2], lookAt: [-1.2, 3.4, -5.8], fov: 33 },  // INTERIOR
  { position: [0, 3.2, -5.35], lookAt: [0, 3.45, -7.95], fov: 34 },  // TRANSFORMATION
  { position: [0, 3.1, -12.8], lookAt: [0, 3.35, -18.4], fov: 35 },  // DEEP ENVIRONMENT
  { position: [0, 3.15, -19.2], lookAt: [0, 3.45, -26.8], fov: 36 },  // FINAL APPROACH
  { position: [0, 3.45, -25.0], lookAt: [0, 3.8, -34.0], fov: 38 },  // FINAL REVEAL
];

export const DESKTOP_TIMELINE: CameraTimeline = buildTimeline(DESKTOP_KEYFRAMES);
export const MOBILE_TIMELINE: CameraTimeline = buildTimeline(MOBILE_KEYFRAMES);

/** Standard ease-in-out cubic — used to remap linear scroll progress so
 *  the camera lingers slightly at the endpoints and moves through the
 *  middle with more weight, rather than a robotic constant velocity. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** FOV is a simple piecewise-linear lerp across N keyframes, so it stays
 *  in sync with the spline curves that use the same keyframes. */
export function sampleFov(fovKeyframes: number[], t: number): number {
  if (fovKeyframes.length < 2) return fovKeyframes[0] ?? 30;
  const segments = fovKeyframes.length - 1;
  const scaled = t * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - index;
  return lerp(fovKeyframes[index], fovKeyframes[index + 1], localT);
}
