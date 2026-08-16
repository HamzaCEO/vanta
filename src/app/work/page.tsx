import Link from "next/link";
import { SiteHeader } from "@/components/vanta/site/SiteHeader";
import { WorkGallery } from "./WorkGallery";
import { SiteFooter } from "@/components/vanta/site/SiteFooter";
import styles from "./work.module.css";

export default function WorkPage() {
  return (
    <main className={styles.page}>
      <SiteHeader current="work" />

      <section className={styles.intro}>
        <span>VANTA / WORK</span>
        <h1>Studies in light, movement, and material.</h1>
        <p>Concept studies are where the studio tests an architectural question before it becomes a finished proposition. Each one starts with a constraint and resolves it through space.</p>
      </section>

      <WorkGallery />

      <section className={styles.closing}>
        <span>THE NEXT QUESTION</span>
        <h2>Have a different condition to solve?</h2>
        <Link href="/#contact">Start a commission inquiry ↗</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
