"use client";

import { useRef, useLayoutEffect } from "react";
import { Object3D, InstancedMesh as ThreeInstancedMesh } from "three";
import {
  STONE_MATERIAL,
  METAL_MATERIAL,
  METAL_PANEL_MATERIAL,
  EMISSIVE_SEAM_MATERIAL,
} from "./materials";

type RibPlacement = {
  x: number;
  z: number;
};

const RIB_SIZE: [number, number, number] = [0.07, 6.6, 0.14];
const RIB_Y = 4.1;

const RIB_PLACEMENTS_DESKTOP: RibPlacement[] = [
  { x: -1.22, z: -0.72 },
  { x: -1.22, z: -0.42 },
  { x: -1.22, z: -0.12 },
  { x: 1.22, z: -0.72 },
  { x: 1.22, z: -0.42 },
  { x: 1.22, z: -0.12 },
];

const RIB_PLACEMENTS_MOBILE: RibPlacement[] = [
  { x: -1.22, z: -0.42 },
  { x: 1.22, z: -0.42 },
];

/**
 * Thin vertical fins fluted along the outer faces of the rear mass's side
 * pillars — controlled geometric repetition, rendered as a single
 * InstancedMesh so the detail costs one draw call regardless of count.
 */
function StructuralRibs({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<ThreeInstancedMesh>(null);
  const placements = isMobile ? RIB_PLACEMENTS_MOBILE : RIB_PLACEMENTS_DESKTOP;

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new Object3D();
    placements.forEach((placement, index) => {
      dummy.position.set(placement.x, RIB_Y, placement.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [placements]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, placements.length]} castShadow>
      <boxGeometry args={RIB_SIZE} />
      <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
    </instancedMesh>
  );
}

type MonolithProps = {
  isMobile: boolean;
};

/**
 * The central architectural monument — a monumental portal frame standing
 * proud of a recessed rear mass, on a raised plinth. Composed entirely from
 * primitive boxes (no CSG dependency): the "recess" and "portal void" are
 * built by leaving deliberate gaps between separately placed forms rather
 * than cutting holes, and the deep gap between the frame and the rear mass
 * is where the two emissive seams read as something glimpsed rather than
 * fully revealed.
 */
export function Monolith({ isMobile }: MonolithProps) {
  return (
    <group position={[0.6, 0, -0.4]} rotation={[0, 0.35, 0]}>
      {/* Plinth — the raised platform the monument stands on. */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.5, 3.6]} />
        <meshStandardMaterial {...STONE_MATERIAL} />
      </mesh>

      {/* Rear mass, composed of two full-depth pillars flanking a
          recessed center panel — a real geometric recess, not a decal. */}
      <mesh position={[-0.85, 4.1, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 7.2, 1.2]} />
        <meshStandardMaterial {...METAL_MATERIAL} />
      </mesh>
      <mesh position={[0.85, 4.1, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 7.2, 1.2]} />
        <meshStandardMaterial {...METAL_MATERIAL} />
      </mesh>
      {/* Doorway lintel — the top portion of the former solid center
          panel, leaving a ~5m tall opening below for the camera to pass
          through into the interior. The opening reads as a deliberate
          architectural threshold, not a missing wall. */}
      <mesh position={[0, 6.6, -0.65]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 2.2, 0.7]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>

      {/* A thin emissive reveal on the inner edge of each rear mass
          pillar, facing the doorway opening — suggests interior light
          spilling forward through the threshold. */}
      <mesh position={[0.505, 3.6, -0.29]}>
        <boxGeometry args={[0.015, 5.0, 0.01]} />
        <meshStandardMaterial {...EMISSIVE_SEAM_MATERIAL} emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[-0.505, 3.6, -0.29]}>
        <boxGeometry args={[0.015, 5.0, 0.01]} />
        <meshStandardMaterial {...EMISSIVE_SEAM_MATERIAL} emissiveIntensity={0.45} />
      </mesh>

      {/* Emissive seams on the pillars' inner edges, glimpsed through the
          portal opening rather than fully exposed. */}
      <mesh position={[0.505, 4.1, 0.205]}>
        <boxGeometry args={[0.03, 6.0, 0.01]} />
        <meshStandardMaterial {...EMISSIVE_SEAM_MATERIAL} emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[-0.505, 4.1, 0.205]}>
        <boxGeometry args={[0.03, 6.0, 0.01]} />
        <meshStandardMaterial {...EMISSIVE_SEAM_MATERIAL} emissiveIntensity={1.1} />
      </mesh>

      {/* Portal frame — a monumental door/threshold form standing forward
          of the rear mass, with a deep void between the two. */}
      <mesh position={[-1.175, 4.1, 0.75]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 7.2, 0.45]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>
      <mesh position={[1.175, 4.1, 0.75]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 7.2, 0.45]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>
      <mesh position={[0, 6.7, 0.75]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 2.0, 0.45]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>

      <StructuralRibs isMobile={isMobile} />
    </group>
  );
}
