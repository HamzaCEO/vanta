"use client";

import type { RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

type VantaCanvasProps = {
  /** Raw 0–1 scroll progress, forwarded down to the CameraRig. */
  progressRef: RefObject<number>;
};

/**
 * Owns the WebGL canvas and all environment/device-aware settings
 * (pixel ratio cap, shadow toggle). Rendered via `next/dynamic` with SSR
 * disabled so Three.js never runs on the server.
 */
export function VantaCanvas({ progressRef }: VantaCanvasProps) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      shadows={!isMobile}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: true, powerPreference: "high-performance", toneMappingExposure: 1.35 }}
      camera={{ fov: 32 }}
    >
      <Scene isMobile={isMobile} reducedMotion={reducedMotion} progressRef={progressRef} />
    </Canvas>
  );
}
