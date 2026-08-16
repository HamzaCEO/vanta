import Link from "next/link";
import styles from "./ExperienceExit.module.css";

export function ExperienceExit() {
  return (
    <section className={styles.section} aria-labelledby="exit-title">
      <div className={styles.rule} aria-hidden="true" />
      <div className={styles.metaRow}>
        <span>VANTA / AFTER THE JOURNEY</span>
        <span>THE SPACE CONTINUES</span>
      </div>

      <div className={styles.grid}>
        <p className={styles.index}>09</p>
        <div className={styles.copy}>
          <p className={styles.kicker}>From experience to intention.</p>
          <h2 id="exit-title">
            What you just moved through is the point of view.
          </h2>
          <p className={styles.body}>
            VANTA treats architecture as a sequence of decisions: where light lands,
            how a threshold compresses the body, what a material does to scale, and
            what the next space is allowed to reveal. The work begins where the
            journey ends.
          </p>
          <div className={styles.actions}>
            <Link href="#work">Explore the studies <span aria-hidden="true">↗</span></Link>
            <Link href="#studio">How the studio works <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>

      <div className={styles.footerLine}>
        <span>LIGHT / MOVEMENT / MATERIAL</span>
        <span>01 — 03</span>
      </div>
    </section>
  );
}
