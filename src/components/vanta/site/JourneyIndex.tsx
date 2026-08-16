"use client";

import { VANTA_CHAPTERS } from "@/content/site";
import styles from "./JourneyIndex.module.css";

function jumpToChapter(index: number) {
  const track = document.querySelector<HTMLElement>("[data-vanta-track]");
  if (!track) return;

  const chapter = VANTA_CHAPTERS[index];
  const targetProgress = (chapter.range[0] + chapter.range[1]) / 2;
  const maxScroll = Math.max(track.offsetHeight - window.innerHeight, 0);
  const target = track.offsetTop + maxScroll * targetProgress;

  window.scrollTo({ top: target, behavior: "smooth" });
}

export function JourneyIndex() {
  return (
    <section className={styles.section} id="journey" aria-labelledby="journey-title">
      <div className={styles.heading}>
        <div>
          <span className={styles.meta}>VANTA / THE JOURNEY</span>
          <h2 id="journey-title">Nine moments. One continuous space.</h2>
        </div>
        <p>
          The 3D experience is structured as an architectural sequence. Jump to a moment below,
          or continue scrolling and let the space reveal itself at its own pace.
        </p>
      </div>

      <ol className={styles.list}>
        {VANTA_CHAPTERS.map((chapter, index) => (
          <li key={chapter.eyebrow}>
            <button type="button" onClick={() => jumpToChapter(index)}>
              <span className={styles.index}>{chapter.eyebrow.split(" /")[0]}</span>
              <span className={styles.copy}>
                <strong>{chapter.eyebrow.split(" /")[1]?.trim()}</strong>
                <span>{chapter.title}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
