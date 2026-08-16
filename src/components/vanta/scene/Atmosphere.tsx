"use client";

import { Sparkles } from "@react-three/drei";
import { VANTA_COLOR } from "./materials";

type AtmosphereProps = {
  /** Skip particle animation for reduced-motion users or constrained devices. */
  particlesEnabled: boolean;
  /** Render only the nearest haze layer on constrained devices. */
  isMobile: boolean;
};

/**
 * Linear fog plus a couple of large, static, low-opacity haze planes set at
 * different depths — a cheap stand-in for volumetric layering that gives
 * the midground and background distinct atmospheric separation without any
 * per-frame cost. A handful of slow-drifting dust motes sit near the
 * portal void as a minor accent, never the focal point, and are dropped
 * entirely when motion should be minimized.
 */
export function Atmosphere({ particlesEnabled, isMobile }: AtmosphereProps) {
  return (
    <>
      <fog attach="fog" args={[VANTA_COLOR.fog, 9, 26]} />

      <mesh position={[0, 5, -8]} rotation={[0, 0, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshBasicMaterial color={VANTA_COLOR.void} transparent opacity={0.35} depthWrite={false} />
      </mesh>

      {!isMobile && (
        <mesh position={[0, 6, -16]} rotation={[0, 0, 0]}>
          <planeGeometry args={[50, 24]} />
          <meshBasicMaterial color={VANTA_COLOR.void} transparent opacity={0.45} depthWrite={false} />
        </mesh>
      )}

      {particlesEnabled && (
        <Sparkles
          count={30}
          scale={[3, 5, 2]}
          position={[0.6, 4, 0.2]}
          size={1}
          speed={0.12}
          opacity={0.22}
          color={VANTA_COLOR.accentCool}
        />
      )}
    </>
  );
}
