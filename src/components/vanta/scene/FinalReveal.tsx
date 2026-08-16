"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils, Object3D } from "three";
import {
  INTERIOR_CEILING_MATERIAL,
  INTERIOR_FLOOR_MATERIAL,
  INTERIOR_WALL_MATERIAL,
  METAL_MATERIAL,
  METAL_PANEL_MATERIAL,
  EMISSIVE_SEAM_MATERIAL,
} from "./materials";

/**
 * Phase 7 final reveal. The deep environment opens into a quiet monumental
 * chamber and the destination architecture separates only at the end of the
 * journey. The final state is deliberately spatial rather than effect-heavy.
 */
export function FinalReveal({
  isMobile,
  progressRef,
  reducedMotion,
}: {
  isMobile: boolean;
  progressRef: RefObject<number>;
  reducedMotion: boolean;
}) {
  const leftWallRef = useRef<Group>(null);
  const rightWallRef = useRef<Group>(null);
  const ceilingRef = useRef<Group>(null);
  const monumentRef = useRef<Group>(null);
  const monumentLeftRef = useRef<Group>(null);
  const monumentRightRef = useRef<Group>(null);
  const seamRef = useRef<Object3D>(null);
  const revealLightRef = useRef<Object3D>(null);
  const innerChamberRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const raw = MathUtils.clamp(progressRef.current ?? 0, 0, 1);
    const phase = MathUtils.clamp((raw - 0.89) / 0.11, 0, 1);
    const eased = phase * phase * (3 - 2 * phase);
    const motion = reducedMotion ? 1 : eased;
    const climax = MathUtils.clamp((raw - 0.955) / 0.045, 0, 1);
    const climaxEased = climax * climax * (3 - 2 * climax);
    const finalHold = MathUtils.clamp((raw - 0.985) / 0.015, 0, 1);
    const finalEased = finalHold * finalHold * (3 - 2 * finalHold);
    const damp = 1 - Math.exp(-5 * delta);

    const sideSpread = (isMobile ? 1.25 : 2.25) * motion;
    const ceilingLift = (isMobile ? 0.8 : 1.55) * motion;

    if (leftWallRef.current) {
      leftWallRef.current.position.x +=
        (-4.35 - sideSpread - leftWallRef.current.position.x) * damp;
    }
    if (rightWallRef.current) {
      rightWallRef.current.position.x +=
        (4.35 + sideSpread - rightWallRef.current.position.x) * damp;
    }
    if (ceilingRef.current) {
      ceilingRef.current.position.y +=
        (6.8 + ceilingLift - ceilingRef.current.position.y) * damp;
      ceilingRef.current.scale.x +=
        (1 - phase * 0.18 - ceilingRef.current.scale.x) * damp;
    }
    if (monumentRef.current) {
      const targetScale = 0.94 + 0.06 * motion;
      monumentRef.current.scale.x +=
        (targetScale - monumentRef.current.scale.x) * damp;
      monumentRef.current.scale.y +=
        (targetScale - monumentRef.current.scale.y) * damp;
      monumentRef.current.scale.z +=
        (targetScale - monumentRef.current.scale.z) * damp;
    }

    const monumentSplit = (isMobile ? 0.36 : 0.62) * climaxEased;
    if (monumentLeftRef.current) {
      monumentLeftRef.current.position.x +=
        (-0.7 - monumentSplit - monumentLeftRef.current.position.x) * damp;
    }
    if (monumentRightRef.current) {
      monumentRightRef.current.position.x +=
        (0.7 + monumentSplit - monumentRightRef.current.position.x) * damp;
    }
    if (seamRef.current) {
      seamRef.current.scale.y = 0.15 + 0.85 * motion;
      seamRef.current.scale.x = 1 - 0.82 * climaxEased;
    }
    if (revealLightRef.current) {
      revealLightRef.current.scale.y = 0.15 + 0.85 * climaxEased;
    }
    if (innerChamberRef.current) {
      const targetZ = -0.82 - 0.55 * finalEased;
      const targetScale = 0.72 + 0.28 * finalEased;
      innerChamberRef.current.position.z +=
        (targetZ - innerChamberRef.current.position.z) * damp;
      innerChamberRef.current.scale.x +=
        (targetScale - innerChamberRef.current.scale.x) * damp;
      innerChamberRef.current.scale.y +=
        (targetScale - innerChamberRef.current.scale.y) * damp;
    }
  });

  return (
    <group>
      <mesh position={[0, 0.47, -31]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[isMobile ? 7.5 : 10.5, 12]} />
        <meshStandardMaterial {...INTERIOR_FLOOR_MATERIAL} />
      </mesh>

      <group ref={leftWallRef} position={[-4.35, 3.6, -31]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.18, 6.4, 11]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>
        <mesh position={[0.2, 5.4, 0.3]} receiveShadow>
          <boxGeometry args={[0.42, 0.12, 8.5]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
      </group>

      <group ref={rightWallRef} position={[4.35, 3.6, -31]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.18, 6.4, 11]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>
        <mesh position={[-0.2, 5.4, 0.3]} receiveShadow>
          <boxGeometry args={[0.42, 0.12, 8.5]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
      </group>

      <group ref={ceilingRef} position={[0, 6.8, -31]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[isMobile ? 7.5 : 10.5, 11]} />
          <meshStandardMaterial {...INTERIOR_CEILING_MATERIAL} />
        </mesh>
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[isMobile ? 5.8 : 8.5, 0.08, 0.14]} />
          <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
        </mesh>
      </group>

      <group ref={monumentRef} position={[0, 3.9, -35.2]}>
        <group ref={monumentLeftRef}>
          <mesh position={[-0.7, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 7.1, 1.05]} />
            <meshStandardMaterial {...METAL_MATERIAL} />
          </mesh>
          <mesh position={[-0.35, 0, 0.56]}>
            <boxGeometry args={[0.8, 5.9, 0.045]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[-0.55, 3.58, 0.55]}>
            <boxGeometry args={[1.05, 0.08, 0.08]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[-0.55, -3.58, 0.55]}>
            <boxGeometry args={[1.05, 0.08, 0.08]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
        </group>

        <group ref={monumentRightRef}>
          <mesh position={[0.7, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 7.1, 1.05]} />
            <meshStandardMaterial {...METAL_MATERIAL} />
          </mesh>
          <mesh position={[0.35, 0, 0.56]}>
            <boxGeometry args={[0.8, 5.9, 0.045]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[0.55, 3.58, 0.55]}>
            <boxGeometry args={[1.05, 0.08, 0.08]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[0.55, -3.58, 0.55]}>
            <boxGeometry args={[1.05, 0.08, 0.08]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
        </group>

        <mesh ref={seamRef} position={[0, 0, 0.59]}>
          <boxGeometry args={[0.035, 5.3, 0.025]} />
          <meshStandardMaterial {...EMISSIVE_SEAM_MATERIAL} emissiveIntensity={0.28} />
        </mesh>

        <mesh position={[0, 0, -0.54]}>
          <boxGeometry args={[0.58, 5.75, 0.08]} />
          <meshStandardMaterial {...INTERIOR_WALL_MATERIAL} />
        </mesh>

        <group ref={innerChamberRef} position={[0, 0, -0.82]}>
          <mesh position={[0, -2.55, 0]} receiveShadow>
            <boxGeometry args={[0.92, 0.08, 1.5]} />
            <meshStandardMaterial {...INTERIOR_FLOOR_MATERIAL} />
          </mesh>
          <mesh position={[-0.42, 0.2, -0.38]}>
            <boxGeometry args={[0.055, 5.0, 0.72]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[0.42, 0.2, -0.38]}>
            <boxGeometry args={[0.055, 5.0, 0.72]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[0, 2.72, -0.38]}>
            <boxGeometry args={[0.9, 0.055, 0.72]} />
            <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
          </mesh>
          <mesh position={[0, 0.15, -0.78]}>
            <boxGeometry args={[0.022, 4.55, 0.018]} />
            <meshStandardMaterial
              color="#cdd8df"
              emissive="#cdd8df"
              emissiveIntensity={0.12}
            />
          </mesh>
        </group>

        <mesh ref={revealLightRef} position={[0, 0, -0.6]}>
          <boxGeometry args={[0.025, 5.15, 0.018]} />
          <meshStandardMaterial
            color="#cdd8df"
            emissive="#cdd8df"
            emissiveIntensity={0.18}
          />
        </mesh>
      </group>

      <mesh position={[-2.75, 0.65, -34.4]} receiveShadow>
        <boxGeometry args={[1.35, 0.35, 2.3]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>
      <mesh position={[2.75, 0.65, -34.4]} receiveShadow>
        <boxGeometry args={[1.35, 0.35, 2.3]} />
        <meshStandardMaterial {...METAL_PANEL_MATERIAL} />
      </mesh>
    </group>
  );
}
