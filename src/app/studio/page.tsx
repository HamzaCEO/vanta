import Link from "next/link";
import { SiteHeader } from "@/components/vanta/site/SiteHeader";
import { SiteFooter } from "@/components/vanta/site/SiteFooter";
import { VANTA_PRINCIPLES, VANTA_STUDIO_METHOD } from "@/content/site";
import styles from "./studio.module.css";

export default function StudioPage() {
  return (
    <main className={styles.page}>
      <SiteHeader current="studio" />

      <section className={styles.hero}>
        <span>VANTA / STUDIO</span>
        <h1>A small studio thinking about the space between things.</h1>
        <p>VANTA is a fictional architecture studio concept. Its work is an exploration of how light, movement, material, and proportion can turn a building into a sequence rather than a static object.</p>
      </section>

      <section className={styles.statement}>
        <span>01 / POSITION</span>
        <div>
          <h2>Technology is useful when it makes the architecture easier to understand.</h2>
          <p>Digital modelling, interactive presentation, and real-time 3D are treated as design instruments. They are not the subject of the work; they make decisions about space, light, and movement visible.</p>
        </div>
      </section>

      <section className={styles.principles}>
        <div className={styles.sectionLabel}>02 / PRINCIPLES</div>
        <div className={styles.principleList}>
          {VANTA_PRINCIPLES.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.method}>
        <div className={styles.sectionLabel}>03 / METHOD</div>
        <div className={styles.methodList}>
          {VANTA_STUDIO_METHOD.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <div><h2>{item.title}</h2><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.boundary}>
        <span>04 / THE BOUNDARY</span>
        <h2>Not every project needs a cinematic interface.</h2>
        <p>VANTA uses immersive interaction when it clarifies a spatial idea. When it does not, the work should become quieter: strong typography, precise information, useful diagrams, and direct navigation.</p>
      </section>

      <section className={styles.cta}>
        <span>05 / COMMISSION</span>
        <h2>Bring a difficult spatial question.</h2>
        <Link href="/#contact">Start an inquiry ↗</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
