"use client";

import type { RefObject } from "react";
import Link from "next/link";
import styles from "./Overlay.module.css";
import { VANTA_CHAPTERS } from "@/content/site";
import { useScrollChapter } from "@/lib/hooks/useScrollChapter";

type OverlayProps = {
  progressRef: RefObject<number>;
};

export function Overlay({ progressRef }: OverlayProps) {
  const chapterIndex = useScrollChapter(progressRef);
  const chapter = VANTA_CHAPTERS[chapterIndex];
  const isFirst = chapterIndex === 0;

  return (
    <div className={styles.overlay}>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top" aria-label="VANTA home">
          VANTA
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#journey">Journey</a>
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#contact">Commission</a>
        </nav>
      </header>

      <div key={chapterIndex} className={styles.chapter} aria-live="polite">
        <span className={styles.eyebrow}>{chapter.eyebrow}</span>
        <h1>{isFirst ? "The future of space." : chapter.title}</h1>
        <p>{isFirst ? "Architecture shaped by light, movement, and material." : chapter.body}</p>
      </div>

      <footer className={styles.footer}>
        <div className={styles.progressLabel} aria-hidden="true">
          <span>VANTA / 2026</span>
          <span>{String(chapterIndex).padStart(2, "0")} — 08</span>
        </div>
        <div className={styles.footerActions}>
          <div className={styles.scrollCue} data-visible={isFirst} aria-hidden="true">
            <span className={styles.scrollLine} />
            Scroll to enter
          </div>
          {chapterIndex >= 7 && (
            <div className={styles.revealActions} aria-label="Next steps">
              <Link href="/work">Explore studies ↗</Link>
              <a href="#contact">Discuss a project ↗</a>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
