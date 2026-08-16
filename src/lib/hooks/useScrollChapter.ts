"use client";

import { useEffect, useState, type RefObject } from "react";

import { VANTA_CHAPTERS, type VantaChapter } from "@/content/site";

export type ScrollChapter = VantaChapter;

export function useScrollChapter(progressRef: RefObject<number>): number {
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    let frame = 0;
    let last = -1;

    const tick = () => {
      const progress = progressRef.current ?? 0;
      const next = VANTA_CHAPTERS.findIndex(({ range }, index) => {
        const isLast = index === VANTA_CHAPTERS.length - 1;
        return progress >= range[0] && (progress < range[1] || isLast);
      });

      const resolved = next === -1 ? 0 : next;
      if (resolved !== last) {
        last = resolved;
        setChapter(resolved);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progressRef]);

  return chapter;
}
