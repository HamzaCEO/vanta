"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight as ThreePointLight } from "three";
import { VANTA_COLOR } from "./materials";

type LightingProps = {
  /** Disable shadow casting on constrained devices. */
  shadowsEnabled: boolean;
  /** Shared native-scroll progress used to shift emphasis during Phase 5. */
  progressRef: RefObject<number>;
};

/**
 * A restrained light rig built to reveal the monument's architecture rather
 * than flatten it. During Phase 5 the existing interior lights slowly yield
 * visual emphasis to the newly revealed rear bay, so the lighting follows
 * the architectural transformation instead of behaving like a separate
 * visual effect.
 */
export function Lighting({ shadowsEnabled, progressRef }: LightingProps) {
  const portalGlowRef = useRef<ThreePointLight>(null);
  const interiorMidRef = useRef<ThreePointLight>(null);
  const interiorFocalRef = useRef<ThreePointLight>(null);
  const deepRef = useRef<ThreePointLight>(null);
  const deepAccentRef = useRef<ThreePointLight>(null);
  const revealRef = useRef<ThreePointLight>(null);

  useFrame(() => {
    const progress = Math.min(1, Math.max(0, progressRef.current ?? 0));
    const transformation = Math.min(1, Math.max(0, (progress - 0.66) / 0.28));
    const deep = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));
    const eased = transformation * transformation * (3 - 2 * transformation);
    const deepEased = deep * deep * (3 - 2 * deep);
    const reveal = Math.min(1, Math.max(0, (progress - 0.89) / 0.11));
    const revealEased = reveal * reveal * (3 - 2 * reveal);

    if (portalGlowRef.current) {
      portalGlowRef.current.intensity = 5 - 2.2 * eased;
    }

    if (interiorMidRef.current) {
      interiorMidRef.current.intensity = 3.5 - 1.1 * eased;
    }

    if (interiorFocalRef.current) {
      interiorFocalRef.current.intensity = 2.5 - 1.35 * eased;
    }

    if (deepRef.current) {
      deepRef.current.intensity = 0.15 + 1.15 * deepEased;
      deepRef.current.distance = 8 + 5 * deepEased;
    }

    if (deepAccentRef.current) {
      deepAccentRef.current.intensity = 0.02 + 0.42 * deepEased - 0.12 * revealEased;
      deepAccentRef.current.distance = 4 + 3 * deepEased;
    }

    if (revealRef.current) {
      revealRef.current.intensity = 0.02 + 2.4 * revealEased;
      revealRef.current.distance = 9 + 8 * revealEased;
    }
  });

  return (
    <>
      <hemisphereLight
        args={[
          VANTA_COLOR.ambientCoolFill,
          VANTA_COLOR.ambientDeepShadow,
          0.5,
        ]}
      />

      <directionalLight
        position={[7, 6, 5]}
        intensity={2.6}
        color={VANTA_COLOR.keyLight}
        castShadow={shadowsEnabled}
        shadow-mapSize-width={shadowsEnabled ? 1024 : 0}
        shadow-mapSize-height={shadowsEnabled ? 1024 : 0}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0015}
      />

      <pointLight
        position={[-5.4, 5.2, -1.4]}
        intensity={14}
        color={VANTA_COLOR.rimLight}
        distance={16}
        decay={2}
      />

      <pointLight
        ref={portalGlowRef}
        position={[0.6, 3.6, -0.55]}
        intensity={5}
        color={VANTA_COLOR.portalGlow}
        distance={5}
        decay={2.2}
      />

      <pointLight
        ref={interiorMidRef}
        position={[-0.5, 6.2, -4.5]}
        intensity={3.5}
        color={VANTA_COLOR.interiorGlow}
        distance={9}
        decay={2}
      />

      <pointLight
        ref={interiorFocalRef}
        position={[-1.5, 3.5, -7.6]}
        intensity={2.5}
        color={VANTA_COLOR.interiorGlow}
        distance={4}
        decay={2}
      />

      <pointLight
        ref={deepRef}
        position={[0, 4.2, -15.5]}
        intensity={0.15}
        color={VANTA_COLOR.ambientCoolFill}
        distance={8}
        decay={2}
      />

      <pointLight
        ref={deepAccentRef}
        position={[0, 3.4, -22.2]}
        intensity={0.02}
        color={VANTA_COLOR.interiorGlow}
        distance={4}
        decay={2}
      />

      <pointLight
        ref={revealRef}
        position={[0, 4.8, -33.2]}
        intensity={0.02}
        color={VANTA_COLOR.keyLight}
        distance={9}
        decay={2}
      />
    </>
  );
}
