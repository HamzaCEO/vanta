"use client";

import { useEffect, useState, type RefObject } from "react";

const HIDE_THRESHOLD = 0.04;

/**
 * Makes the "Scroll to begin" cue functional: visible at the very top of
 * the journey, faded out once the user has actually started scrolling.
 * Polls the scroll-progress ref via requestAnimationFrame and only calls
 * `setState` on the single visible→hidden (or hidden→visible, if the
 * user scrolls back up) edge — not on every scroll event or frame — so
 * this never turns into a per-scroll React re-render.
 */
export function useScrollCueVisible(progressRef: RefObject<number>): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame: number;
    let hidden = false;

    const tick = () => {
      const past = progressRef.current > HIDE_THRESHOLD;
      if (past && !hidden) {
        hidden = true;
        setVisible(false);
      } else if (!past && hidden) {
        hidden = false;
        setVisible(true);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progressRef]);

  return visible;
}
