"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, PointLight } from "three";
import {
  INTERIOR_FOCAL_MATERIAL,
  INTERIOR_WALL_MATERIAL,
  METAL_PANEL_MATERIAL,
  VANTA_COLOR,
} from "./materials";

const TRANSFORMATION_START = 0.66;
const TRANSFORMATION_END = 0.94;

function smoothstep(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped * clamped * (3 - 2 * clamped);
}

type ArchitecturalTransformationProps = {
  progressRef: RefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
};

/**
 * Phase 5 transformation: the interior destination becomes a real
 * architectural threshold. The existing hall does not disappear or swap
 * scenes; its rear construction physically opens, recedes, and reveals a
 * deeper structural bay.
 *
 * All motion is driven by the same native-scroll progress used by the
 * camera. This keeps the transformation spatially synchronized with the
 * visitor's movement and avoids a second animation system.
 */
export function ArchitecturalTransformation({
  progressRef,
  isMobile,
  reducedMotion,
}: ArchitecturalTransformationProps) {
  const leftDoorRef = useRef<Group>(null);
  const rightDoorRef = useRef<Group>(null);
  const apertureRef = useRef<Group>(null);
  const innerFrameRef = useRef<Group>(null);
  const focalRef = useRef<Group>(null);
  const revealLightRef = useRef<PointLight>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    const raw = progressRef.current ?? 0;
    const phase = smoothstep(
      (raw - TRANSFORMATION_START) / (TRANSFORMATION_END - TRANSFORMATION_START),
    );
    const target = reducedMotion ? 0 : phase;
    const damp = 1 - Math.exp(-4.5 * delta);

    progress.current += (target - progress.current) * damp;

    const t = progress.current;
    const doorAngle = (isMobile ? 0.2 : 0.3) * t;

    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = doorAngle;
    }

    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = -doorAngle;
    }

    if (apertureRef.current) {
      apertureRef.current.scale.set(
        0.78 + 0.22 * t,
        0.9 + 0.1 * t,
        1,
      );
      apertureRef.current.position.z = -8.08 - 0.42 * t;
    }

    if (innerFrameRef.current) {
      innerFrameRef.current.position.z = -8.24 - 0.18 * t;
      innerFrameRef.current.scale.set(
        0.72 + 0.28 * t,
        0.84 + 0.16 * t,
        1,
      );
    }

    if (focalRef.current) {
      focalRef.current.scale.y = 1 - 0.9 * t;
      focalRef.current.position.z = -7.94 + 0.08 * t;
    }

    if (revealLightRef.current) {
      revealLightRef.current.intensity = 0.25 + 1.7 * t;
      revealLightRef.current.distance = isMobile ? 3.8 : 5.5;
    }
  });

  const panelDepth = 0.16;
  const panelHeight = 7.0;
  const panelWidth = isMobile ? 1.24 : 1.3;
  const pivotX = isMobile ? 1.22 : 1.3;

  return (
    <group>
      {/* A darker secondary bay establishes real depth behind the moving
          panels. It is deliberately restrained so the reveal is discovered
          rather than announced. */}
      <group ref={apertureRef} position={[0, 3.95, -8.08]}>
        <mesh receiveShadow>
          <boxGeometry args={[1.05, 5.8, 0.18]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>

        <mesh position={[0, 0.2, 0.11]}>
          <boxGeometry args={[0.055, 4.7, 0.025]} />
          <meshStandardMaterial
            {...INTERIOR_FOCAL_MATERIAL}
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh position={[0, -2.85, 0]}>
          <boxGeometry args={[1.05, 0.08, 0.42]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
      </group>

      {/* The new structural frame sits behind the opening. Its controlled
          recession makes the reveal read as spatial depth rather than a
          flat wall changing scale. */}
      <group ref={innerFrameRef} position={[0, 3.95, -8.24]}>
        <mesh position={[-0.66, 0, 0]}>
          <boxGeometry args={[0.12, 6.1, 0.22]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>

        <mesh position={[0.66, 0, 0]}>
          <boxGeometry args={[0.12, 6.1, 0.22]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>

        <mesh position={[0, 3.0, 0]}>
          <boxGeometry args={[1.44, 0.12, 0.22]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>

        <mesh position={[0, -3.0, 0]}>
          <boxGeometry args={[1.44, 0.1, 0.22]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>

        <mesh position={[-0.66, 0, 0.13]}>
          <boxGeometry args={[0.025, 4.9, 0.025]} />
          <meshStandardMaterial
            color={VANTA_COLOR.emissiveSeam}
            emissive={VANTA_COLOR.emissiveSeam}
            emissiveIntensity={0.18}
          />
        </mesh>

        <mesh position={[0.66, 0, 0.13]}>
          <boxGeometry args={[0.025, 4.9, 0.025]} />
          <meshStandardMaterial
            color={VANTA_COLOR.emissiveSeam}
            emissive={VANTA_COLOR.emissiveSeam}
            emissiveIntensity={0.18}
          />
        </mesh>
      </group>

      {/* Outer pivots preserve the architectural logic: the heavy panels
          open around their structural edges instead of translating freely. */}
      <group ref={leftDoorRef} position={[-pivotX, 3.95, -8]}>
        <mesh position={[panelWidth / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[panelWidth, panelHeight, panelDepth]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>

        <mesh position={[panelWidth - 0.08, 0, 0.09]}>
          <boxGeometry args={[0.035, 5.5, 0.025]} />
          <meshStandardMaterial
            {...INTERIOR_FOCAL_MATERIAL}
            emissiveIntensity={0.18}
          />
        </mesh>
      </group>

      <group ref={rightDoorRef} position={[pivotX, 3.95, -8]}>
        <mesh position={[-panelWidth / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[panelWidth, panelHeight, panelDepth]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>

        <mesh position={[-panelWidth + 0.08, 0, 0.09]}>
          <boxGeometry args={[0.035, 5.5, 0.025]} />
          <meshStandardMaterial
            {...INTERIOR_FOCAL_MATERIAL}
            emissiveIntensity={0.18}
          />
        </mesh>
      </group>

      {/* The old focal strip recedes visually as the new bay becomes the
          destination. It never abruptly disappears. */}
      <group ref={focalRef} position={[0, 3.9, -7.94]}>
        <mesh>
          <planeGeometry args={[0.18, 5]} />
          <meshStandardMaterial
            {...INTERIOR_FOCAL_MATERIAL}
            emissiveIntensity={0.7}
          />
        </mesh>
      </group>

      <pointLight
        ref={revealLightRef}
        position={[0, 3.6, -8.8]}
        intensity={0.25}
        color={VANTA_COLOR.interiorGlow}
        distance={5.5}
        decay={2}
      />

      {/* A narrow upper reveal ties the moving panels into the existing
          interior structure instead of making them read as doors. */}
      <mesh position={[0, 7.35, -8.02]}>
        <boxGeometry args={[2.6, 0.14, 0.18]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>

      {/* Subtle seams identify the threshold without turning it into a
          neon effect. */}
      <mesh position={[-0.56, 3.95, -8.19]}>
        <boxGeometry args={[0.025, 5.1, 0.02]} />
        <meshStandardMaterial
          color={VANTA_COLOR.emissiveSeam}
          emissive={VANTA_COLOR.emissiveSeam}
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[0.56, 3.95, -8.19]}>
        <boxGeometry args={[0.025, 5.1, 0.02]} />
        <meshStandardMaterial
          color={VANTA_COLOR.emissiveSeam}
          emissive={VANTA_COLOR.emissiveSeam}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}
