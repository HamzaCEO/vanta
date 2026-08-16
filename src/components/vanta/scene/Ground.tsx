"use client";

import { MeshReflectorMaterial } from "@react-three/drei";
import { VANTA_COLOR } from "./materials";

type GroundProps = {
  /** Lower resolution/quality on constrained devices. */
  highQuality: boolean;
};

/**
 * A large dark floor plane with a restrained, blurred reflection, plus a
 * couple of thin seam grooves converging toward the monolith's plinth —
 * enough to suggest architectural floor divisions without turning the
 * ground into a decorative pattern.
 */
export function Ground({ highQuality }: GroundProps) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <MeshReflectorMaterial
          blur={highQuality ? [300, 100] : [0, 0]}
          resolution={highQuality ? 1024 : 256}
          mixBlur={1}
          mixStrength={2.2}
          roughness={0.92}
          depthScale={0.4}
          minDepthThreshold={0.85}
          maxDepthThreshold={1.2}
          color="#050607"
          metalness={0.3}
          mirror={0}
        />
      </mesh>

      <mesh position={[-1.3, 0.006, 4.5]} rotation={[-Math.PI / 2, 0, -0.18]}>
        <planeGeometry args={[0.05, 14]} />
        <meshBasicMaterial color={VANTA_COLOR.void} transparent opacity={0.6} />
      </mesh>
      <mesh position={[2.2, 0.006, 4.5]} rotation={[-Math.PI / 2, 0, 0.16]}>
        <planeGeometry args={[0.05, 14]} />
        <meshBasicMaterial color={VANTA_COLOR.void} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
