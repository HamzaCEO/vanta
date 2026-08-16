"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Tracks normalized 0–1 scroll progress through a tall track element that
 * sits behind a fixed viewport stage (see VantaExperience). The
 * value is written to a ref on scroll/resize — never React state — so
 * the R3F render loop (CameraRig) can read it every frame without
 * triggering a React re-render on every scroll event.
 *
 * The track's document-relative top offset and scrollable range are
 * cached on mount/resize rather than re-measured on every scroll event,
 * so steady scrolling only costs a `window.scrollY` read and a clamp.
 */
export function useScrollProgress(trackRef: RefObject<HTMLElement | null>): RefObject<number> {
  const progressRef = useRef(0);
  const trackTopRef = useRef(0);
  const scrollRangeRef = useRef(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateProgress = () => {
      const raw = (window.scrollY - trackTopRef.current) / scrollRangeRef.current;
      progressRef.current = Math.min(1, Math.max(0, raw));
    };

    const measure = () => {
      const rect = track.getBoundingClientRect();
      trackTopRef.current = rect.top + window.scrollY;
      scrollRangeRef.current = Math.max(track.offsetHeight - window.innerHeight, 1);
      updateProgress();
    };

    measure();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", measure);
    };
  }, [trackRef]);

  return progressRef;
}
