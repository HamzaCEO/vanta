import Link from "next/link";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <span className={styles.kicker}>VANTA / ARCHITECTURAL CONCEPT</span>
          <p className={styles.statement}>A fictional studio exploring how space is experienced through light, movement, material, and sequence.</p>
        </div>
        <Link className={styles.wordmark} href="/" aria-label="VANTA home">VANTA</Link>
      </div>
      <div className={styles.bottom}>
        <span>CONCEPT WORK / 2026</span>
        <nav aria-label="Footer navigation">
          <Link href="/#journey">Journey</Link>
          <Link href="/work">Work</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/#contact">Commission</Link>
        </nav>
        <Link href="#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
