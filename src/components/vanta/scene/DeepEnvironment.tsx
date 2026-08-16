"use client";

import { useRef, useLayoutEffect, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, InstancedMesh as ThreeInstancedMesh } from "three";
import { INTERIOR_CEILING_MATERIAL, INTERIOR_FLOOR_MATERIAL, INTERIOR_WALL_MATERIAL, METAL_PANEL_MATERIAL } from "./materials";

type FramePlacement = { z: number; width: number; height: number };

const FRAMES_DESKTOP: FramePlacement[] = [
  { z: -10.2, width: 3.8, height: 6.4 },
  { z: -12.8, width: 3.45, height: 6.0 },
  { z: -15.6, width: 3.15, height: 5.6 },
  { z: -18.5, width: 2.9, height: 5.2 },
  { z: -21.4, width: 2.65, height: 4.8 },
];

const FRAMES_MOBILE: FramePlacement[] = [
  { z: -10.8, width: 3.25, height: 5.8 },
  { z: -14.2, width: 2.9, height: 5.3 },
  { z: -17.8, width: 2.55, height: 4.9 },
];

function StructuralFrames({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<ThreeInstancedMesh>(null);
  const frames = isMobile ? FRAMES_MOBILE : FRAMES_DESKTOP;

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new Object3D();
    frames.forEach((frame, index) => {
      dummy.position.set(-frame.width / 2, frame.height / 2, frame.z);
      dummy.scale.set(1, frame.height, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(index * 2, dummy.matrix);

      dummy.position.set(frame.width / 2, frame.height / 2, frame.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(index * 2 + 1, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [frames]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, frames.length * 2]} receiveShadow>
      <boxGeometry args={[0.14, 1, 0.22]} />
      <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
    </instancedMesh>
  );
}

export function DeepEnvironment({
  isMobile,
  progressRef,
}: {
  isMobile: boolean;
  progressRef: RefObject<number>;
}) {
  const frames = isMobile ? FRAMES_MOBILE : FRAMES_DESKTOP;
  const terminalRef = useRef<Object3D>(null);
  const terminalLightRef = useRef<Object3D>(null);

  useFrame((_, delta) => {
    const raw = Math.min(1, Math.max(0, progressRef.current ?? 0));
    const phase = Math.min(1, Math.max(0, (raw - 0.84) / 0.16));
    const eased = phase * phase * (3 - 2 * phase);
    const damp = 1 - Math.exp(-4 * delta);

    if (terminalRef.current) {
      const targetZ = -25.25 - 0.18 * eased;
      terminalRef.current.position.z += (targetZ - terminalRef.current.position.z) * damp;
      const targetScale = 0.94 + 0.06 * eased;
      terminalRef.current.scale.x += (targetScale - terminalRef.current.scale.x) * damp;
      terminalRef.current.scale.y += (targetScale - terminalRef.current.scale.y) * damp;
    }

    if (terminalLightRef.current) {
      const targetScale = 0.25 + 0.75 * eased;
      terminalLightRef.current.scale.setScalar(targetScale);
    }
  });

  return (
    <group>
      {/* A long, quiet floor plane gives the camera a believable continuation
          beyond the transformed threshold without creating a new room. */}
      <mesh position={[0, 0.48, -15]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[isMobile ? 2.5 : 3.2, 17]} />
        <meshStandardMaterial {...INTERIOR_FLOOR_MATERIAL} />
      </mesh>

      {/* The ceiling deliberately narrows with distance. This creates spatial
          compression and gives the deep environment a measurable architectural
          scale instead of reading as an infinite black void. */}
      <mesh position={[0, 7.1, -15]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[isMobile ? 2.5 : 3.2, 17]} />
        <meshStandardMaterial {...INTERIOR_CEILING_MATERIAL} />
      </mesh>

      <mesh position={[-1.55, 3.75, -15]} receiveShadow>
        <boxGeometry args={[0.14, 6.5, 17]} />
        <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
      </mesh>
      <mesh position={[1.55, 3.75, -15]} receiveShadow>
        <boxGeometry args={[0.14, 6.5, 17]} />
        <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
      </mesh>

      {/* Repeating portal-like frames establish depth. They are structural
          markers, not decorative neon arches. */}
      <StructuralFrames isMobile={isMobile} />

      {/* A restrained central spine gives the eye a physical destination. */}
      <mesh position={[0, 0.56, -15]}>
        <boxGeometry args={[0.08, 0.04, 16.5]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>

      {/* Side ledges create secondary horizontal depth layers. */}
      {frames.map((frame, index) => (
        <group key={frame.z}>
          <mesh position={[-frame.width / 2 - 0.12, 0.85, frame.z]} receiveShadow>
            <boxGeometry args={[0.65, 0.12, 0.7]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[frame.width / 2 + 0.12, 0.85, frame.z]} receiveShadow>
            <boxGeometry args={[0.65, 0.12, 0.7]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          {index < frames.length - 1 && (
            <mesh position={[0, 6.25 - index * 0.22, frame.z + 0.9]}>
              <boxGeometry args={[frame.width * 0.82, 0.08, 0.12]} />
              <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
            </mesh>
          )}
        </group>
      ))}

      {/* Recessed side bays interrupt the repetition so the deep environment
          reads as a sequence of designed spaces rather than a tunnel. */}
      {frames.slice(1).map((frame, index) => {
        const depth = frame.z - 0.72;
        const bayWidth = Math.max(0.62, frame.width * 0.28);
        const bayHeight = 2.7 - index * 0.18;
        return (
          <group key={`bay-${frame.z}`}>
            <mesh position={[-1.47, 2.05, depth]} receiveShadow>
              <boxGeometry args={[0.12, bayHeight, bayWidth]} />
              <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
            </mesh>
            <mesh position={[1.47, 2.05, depth]} receiveShadow>
              <boxGeometry args={[0.12, bayHeight, bayWidth]} />
              <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
            </mesh>
            <mesh position={[-1.26, 2.05, depth]} receiveShadow>
              <boxGeometry args={[0.08, bayHeight * 0.82, 0.06]} />
              <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
            </mesh>
            <mesh position={[1.26, 2.05, depth]} receiveShadow>
              <boxGeometry args={[0.08, bayHeight * 0.82, 0.06]} />
              <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
            </mesh>
          </group>
        );
      })}

      {/* Ceiling baffles progressively shorten with distance, creating a
          measured rhythm and making the ceiling feel constructed rather
          than like a single infinite plane. */}
      {frames.map((frame, index) => (
        <mesh
          key={`baffle-${frame.z}`}
          position={[0, 6.65 - index * 0.12, frame.z - 0.58]}
          receiveShadow
        >
          <boxGeometry args={[frame.width * 0.74, 0.1, 0.52]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
      ))}

      {/* The far chamber is intentionally quiet: a framed wall and a narrow
          vertical reveal establish a destination without turning the end
          of the space into a glowing portal. */}
      <group ref={terminalRef} position={[0, 0, -25.25]}>
        <mesh position={[0, 3.55, 0]} receiveShadow>
          <boxGeometry args={[2.55, 6.6, 0.16]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>
        <mesh position={[-1.18, 3.55, -0.18]} receiveShadow>
          <boxGeometry args={[0.14, 6.4, 1.25]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>
        <mesh position={[1.18, 3.55, -0.18]} receiveShadow>
          <boxGeometry args={[0.14, 6.4, 1.25]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>
        <mesh position={[0, 6.45, -0.18]} receiveShadow>
          <boxGeometry args={[2.45, 0.14, 1.25]} />
          <meshStandardMaterial {...INTERIOR_CEILING_MATERIAL} />
        </mesh>
        <mesh position={[0, 3.35, 0.12]}>
          <boxGeometry args={[0.18, 4.2, 0.05]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
        <mesh position={[0, 0.68, 0.08]} receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.48]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
        <mesh position={[0, 0.72, -0.42]} receiveShadow>
          <boxGeometry args={[1.9, 0.05, 0.9]} />
          <meshStandardMaterial {...INTERIOR_FLOOR_MATERIAL} />
        </mesh>

        {/* A secondary threshold keeps the deep environment architectural
            while leaving a clear visual handoff for Phase 7's final reveal. */}
        <mesh position={[0, 5.95, -0.9]}>
          <boxGeometry args={[1.65, 0.1, 0.12]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
        <mesh position={[-0.78, 3.45, -0.9]}>
          <boxGeometry args={[0.08, 5.0, 0.12]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
        <mesh position={[0.78, 3.45, -0.9]}>
          <boxGeometry args={[0.08, 5.0, 0.12]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>

        <group ref={terminalLightRef}>
          <mesh position={[0, 3.4, -0.96]}>
            <boxGeometry args={[0.035, 3.6, 0.025]} />
            <meshStandardMaterial
              color="#cdd8df"
              emissive="#cdd8df"
              emissiveIntensity={0.22}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
