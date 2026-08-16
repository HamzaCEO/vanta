"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";
import type { PerspectiveCamera as ThreePerspectiveCamera } from "three";
import type { RefObject } from "react";
import { DESKTOP_TIMELINE, MOBILE_TIMELINE, easeInOutCubic, sampleFov } from "./cameraTimeline";

/** Higher = the camera catches up to the scroll target faster (snappier);
 *  lower = more lag/inertia (heavier). Applied via delta-time damping so
 *  it holds up across refresh rates rather than being tuned to 60fps. */
const DAMPING = 3.2;

/** Index of the keyframe used as the static reduced-motion composition.
 *  APPROACH (index 1) gives reduced-motion users a stable exterior view
 *  with the portal visible, without the cinematic traversal. */
const REDUCED_MOTION_KEYFRAME = 1;

type CameraRigProps = {
  /** Raw 0–1 scroll progress. Mutated by useScrollProgress outside React
   *  state — read here once per frame, never subscribed to. */
  progressRef: RefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
};

/**
 * Drives the camera along the ARRIVAL → APPROACH → ENTRANCE → THRESHOLD
 * → INTERIOR → TRANSFORMATION journey (see cameraTimeline.ts) using scroll progress as the
 * input. Position and look-at are sampled from Catmull-Rom splines so the
 * path reads as one continuous dolly move, and the raw scroll value is
 * damped every frame before sampling so the motion has physical weight
 * instead of tracking the scrollbar 1:1.
 *
 * With `reducedMotion`, the camera is posed once at the APPROACH frame —
 * a stable exterior composition that keeps the portal and entrance
 * visible without the cinematic traversal — and the per-frame work is
 * skipped entirely; scrolling the page still works normally.
 */
export function CameraRig({ progressRef, isMobile, reducedMotion }: CameraRigProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const smoothedProgress = useRef(0);
  const positionTarget = useRef(new Vector3());
  const lookAtTarget = useRef(new Vector3());

  const timeline = useMemo(() => (isMobile ? MOBILE_TIMELINE : DESKTOP_TIMELINE), [isMobile]);
  const reducedKeyframe = useMemo(() => {
    const t = REDUCED_MOTION_KEYFRAME / (timeline.fovKeyframes.length - 1);
    return t;
  }, [timeline]);

  useEffect(() => {
    smoothedProgress.current = 0;
    if (!reducedMotion) return;
    const camera = cameraRef.current;
    if (!camera) return;

    timeline.positionCurve.getPoint(reducedKeyframe, positionTarget.current);
    timeline.lookAtCurve.getPoint(reducedKeyframe, lookAtTarget.current);
    camera.position.copy(positionTarget.current);
    camera.lookAt(lookAtTarget.current);
    camera.fov = sampleFov(timeline.fovKeyframes, reducedKeyframe);
    camera.updateProjectionMatrix();
  }, [reducedMotion, timeline, reducedKeyframe]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const camera = cameraRef.current;
    if (!camera) return;

    const raw = progressRef.current ?? 0;
    const damp = 1 - Math.exp(-DAMPING * delta);
    smoothedProgress.current += (raw - smoothedProgress.current) * damp;

    const eased = easeInOutCubic(smoothedProgress.current);

    timeline.positionCurve.getPoint(eased, positionTarget.current);
    timeline.lookAtCurve.getPoint(eased, lookAtTarget.current);

    camera.position.copy(positionTarget.current);
    camera.lookAt(lookAtTarget.current);

    const fov = sampleFov(timeline.fovKeyframes, eased);
    if (Math.abs(camera.fov - fov) > 0.005) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={timeline.fovKeyframes[0]}
      near={0.1}
      far={60}
      position={timeline.positionCurve.getPoint(0)}
    />
  );
}
