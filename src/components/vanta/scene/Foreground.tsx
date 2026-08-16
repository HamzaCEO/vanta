"use client";

import { FOREGROUND_MATERIAL } from "./materials";

/**
 * Two large dark pylon fragments placed close to the camera at the frame
 * edges. They read mostly as silhouette and exist purely to give the shot
 * a foreground layer — a classic architectural-photography framing device
 * — separate from the monolith (midground) and distant masses
 * (background). Skipped on mobile, where the narrower viewport leaves no
 * room for edge framing without crowding the UI.
 */
export function Foreground() {
  return (
    <>
      <mesh position={[-8.6, 4, 7.4]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[1.6, 9, 1.6]} />
        <meshStandardMaterial {...FOREGROUND_MATERIAL} />
      </mesh>
      <mesh position={[9.4, 3.4, 6.6]} rotation={[0, -0.42, 0]}>
        <boxGeometry args={[1.4, 8, 1.4]} />
        <meshStandardMaterial {...FOREGROUND_MATERIAL} />
      </mesh>
    </>
  );
}
