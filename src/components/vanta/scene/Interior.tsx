"use client";

import { useRef, useLayoutEffect } from "react";
import { Object3D, InstancedMesh as ThreeInstancedMesh } from "three";
import {
  INTERIOR_WALL_MATERIAL,
  INTERIOR_FLOOR_MATERIAL,
  INTERIOR_CEILING_MATERIAL,
} from "./materials";

/**
 * The interior hall, placed inside the monolith's local coordinate
 * space (the monolith group is at [0.6, 0, -0.4] with Y-rotation 0.35).
 * All interior geometry uses local coordinates so it inherits the
 * monolith's transform — the interior is literally inside the same
 * monument, ensuring continuity as the camera crosses the threshold.
 *
 * Layout (local space):
 *   z = -1.0  → threshold (just behind the rear mass pillars at z=-0.4)
 *   z = -8.0  → back wall with focal strip
 *
 * The hall is ~2.6 wide (walls at x = ±1.3), matching the portal frame
 * opening (~2.35 between jambs at x = ±1.175) so the transition reads
 * as passing through the same architectural opening.
 */

const HALL_WIDTH = 2.6;
const HALL_DEPTH_START = -1.0;
const HALL_DEPTH_END = -8.0;
const HALL_CENTER_Z = (HALL_DEPTH_START + HALL_DEPTH_END) / 2;
const HALL_LENGTH = HALL_DEPTH_START - HALL_DEPTH_END;
const FLOOR_Y = 0.5;
const CEILING_Y = 7.5;
const WALL_CENTER_Y = (FLOOR_Y + CEILING_Y) / 2;
const WALL_HEIGHT = CEILING_Y - FLOOR_Y;

type FinPlacement = {
  x: number;
  z: number;
};

const FIN_SIZE: [number, number, number] = [0.06, 5.2, 0.12];
const FIN_Y = 3.9;

const FINS_DESKTOP: FinPlacement[] = [
  { x: -1.24, z: -1.8 },
  { x: -1.24, z: -3.0 },
  { x: -1.24, z: -4.2 },
  { x: -1.24, z: -5.4 },
  { x: -1.24, z: -6.6 },
  { x: 1.24, z: -1.8 },
  { x: 1.24, z: -3.0 },
  { x: 1.24, z: -4.2 },
  { x: 1.24, z: -5.4 },
  { x: 1.24, z: -6.6 },
];

const FINS_MOBILE: FinPlacement[] = [
  { x: -1.24, z: -2.2 },
  { x: -1.24, z: -5.0 },
  { x: 1.24, z: -2.2 },
  { x: 1.24, z: -5.0 },
];

function WallFins({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<ThreeInstancedMesh>(null);
  const placements = isMobile ? FINS_MOBILE : FINS_DESKTOP;

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new Object3D();
    placements.forEach((placement, index) => {
      dummy.position.set(placement.x, FIN_Y, placement.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [placements]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, placements.length]}>
      <boxGeometry args={FIN_SIZE} />
      <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
    </instancedMesh>
  );
}

type InteriorProps = {
  isMobile: boolean;
};

export function Interior({ isMobile }: InteriorProps) {
  return (
    <group>
      {/* Floor — distinct from the exterior ground, slightly more
          reflective to give the interior its own surface quality. */}
      <mesh position={[0, FLOOR_Y, HALL_CENTER_Z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[HALL_WIDTH, HALL_LENGTH]} />
        <meshStandardMaterial {...INTERIOR_FLOOR_MATERIAL} />
      </mesh>

      {/* Ceiling — darkest surface so the space reads as enclosed. */}
      <mesh position={[0, CEILING_Y, HALL_CENTER_Z]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[HALL_WIDTH, HALL_LENGTH]} />
        <meshStandardMaterial {...INTERIOR_CEILING_MATERIAL} />
      </mesh>

      {/* Left wall. */}
      <mesh position={[-HALL_WIDTH / 2, WALL_CENTER_Y, HALL_CENTER_Z]} receiveShadow>
        <boxGeometry args={[0.12, WALL_HEIGHT, HALL_LENGTH]} />
        <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
      </mesh>

      {/* Right wall. */}
      <mesh position={[HALL_WIDTH / 2, WALL_CENTER_Y, HALL_CENTER_Z]} receiveShadow>
        <boxGeometry args={[0.12, WALL_HEIGHT, HALL_LENGTH]} />
        <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
      </mesh>

      {/* The rear wall is intentionally left to ArchitecturalTransformation.
          Phase 5 turns this destination into a physical threshold instead
          of replacing the interior with a separate scene. */}

      {/* A thin horizontal recess line on each side wall at mid-height —
          suggests architectural paneling without filling the space. */}
      <mesh position={[-HALL_WIDTH / 2 + 0.07, 3.9, HALL_CENTER_Z]}>
        <boxGeometry args={[0.02, 0.04, HALL_LENGTH - 0.4]} />
        <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
      </mesh>
      <mesh position={[HALL_WIDTH / 2 - 0.07, 3.9, HALL_CENTER_Z]}>
        <boxGeometry args={[0.02, 0.04, HALL_LENGTH - 0.4]} />
        <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
      </mesh>

      <WallFins isMobile={isMobile} />
    </group>
  );
}
