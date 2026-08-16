"use client";

import { useRef, useLayoutEffect } from "react";
import { Object3D, InstancedMesh as ThreeInstancedMesh } from "three";
import { SLAB_MATERIAL } from "./materials";

type Slab = {
  position: [number, number, number];
  size: [number, number, number];
  rotationY: number;
};

const SLABS_DESKTOP: Slab[] = [
  { position: [-5.4, 0, -7.2], size: [1.4, 4.6, 1.4], rotationY: -0.2 },
  { position: [-3.1, 0, -10.4], size: [1.1, 3.1, 1.1], rotationY: 0.12 },
  { position: [6.6, 0, -11.5], size: [1.3, 5.4, 1.3], rotationY: -0.15 },
  { position: [4.4, 0, -14.8], size: [1.0, 3.6, 1.0], rotationY: 0.22 },
  { position: [-8.2, 0, -13.6], size: [1.2, 6.1, 1.2], rotationY: 0.08 },
];

const SLABS_MOBILE: Slab[] = [
  { position: [-5.4, 0, -7.2], size: [1.4, 4.6, 1.4], rotationY: -0.2 },
  { position: [6.6, 0, -11.5], size: [1.3, 5.4, 1.3], rotationY: -0.15 },
  { position: [-8.2, 0, -13.6], size: [1.2, 6.1, 1.2], rotationY: 0.08 },
];

type StructuresProps = {
  isMobile: boolean;
};

/**
 * A small set of distant structural masses, rendered as a single
 * InstancedMesh so the background reads as a world beyond the monolith
 * without adding draw calls. A thin bridge connects two of the taller
 * masses to hint at a larger connected complex; it's dropped on mobile
 * along with two of the five masses to keep the background lean.
 */
export function Structures({ isMobile }: StructuresProps) {
  const meshRef = useRef<ThreeInstancedMesh>(null);
  const slabs = isMobile ? SLABS_MOBILE : SLABS_DESKTOP;

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new Object3D();
    slabs.forEach((slab, index) => {
      dummy.position.set(slab.position[0], slab.size[1] / 2, slab.position[2]);
      dummy.rotation.set(0, slab.rotationY, 0);
      dummy.scale.set(slab.size[0], 1, slab.size[2]);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [slabs]);

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, slabs.length]} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...SLAB_MATERIAL} />
      </instancedMesh>

      {!isMobile && (
        <mesh position={[0.6, 4.6, -9.3]} rotation={[0, -0.32, 0]} receiveShadow>
          <boxGeometry args={[0.22, 0.22, 6.4]} />
          <meshStandardMaterial {...SLAB_MATERIAL} />
        </mesh>
      )}
    </>
  );
}
