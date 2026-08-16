"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./VantaExperience.module.css";
import { Overlay } from "./ui/Overlay";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";

const VantaCanvas = dynamic(
  () => import("./VantaCanvas").then((mod) => mod.VantaCanvas),
  {
    ssr: false,
    loading: () => <div className={styles.fallback} />,
  },
);

/**
 * The VANTA page shell. `scrollTrack` is a tall native-scroll element
 * (see VantaExperience.module.css) that provides the room for the
 * ARRIVAL → APPROACH → ENTRANCE → THRESHOLD → INTERIOR → TRANSFORMATION → DEEP ENVIRONMENT → FINAL APPROACH → FINAL REVEAL journey; `stage` is fixed to the viewport
 * inside it so the canvas and overlay share one fixed-in-place stacking
 * context while the page scrolls normally underneath — no scroll
 * hijacking, no `preventDefault`. Scroll position is read into a ref via
 * useScrollProgress and passed down to the 3D scene's CameraRig.
 */
export function VantaExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useScrollProgress(trackRef);

  return (
    <div ref={trackRef} className={styles.scrollTrack} data-vanta-track>
      <div className={styles.stage}>
        <div className={styles.canvasMount}>
          <VantaCanvas progressRef={progressRef} />
        </div>
        <Overlay progressRef={progressRef} />
      </div>
    </div>
  );
}
