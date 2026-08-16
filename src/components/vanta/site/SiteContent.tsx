import Link from "next/link";
import { VANTA_PRINCIPLES, VANTA_STUDIO_METHOD } from "@/content/site";
import { CommissionForm } from "./CommissionForm";
import { JourneyIndex } from "./JourneyIndex";
import { WorkGallery } from "./WorkGallery";
import { ExperienceExit } from "./ExperienceExit";
import styles from "./SiteContent.module.css";

export function SiteContent() {
  return (
    <main className={styles.siteContent}>
      <ExperienceExit />
      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.sectionMeta}>VANTA / POINT OF VIEW</div>
        <div>
          <p className={styles.kicker}>A studio for spaces that stay with you.</p>
          <h2 id="manifesto-title">We design the sequence, not just the object.</h2>
          <p className={styles.lede}>
            VANTA is a fictional architecture studio concept built around one idea: the quality of a space is shaped by what happens between arrival and destination. Light, material, proportion, and movement are designed as one continuous experience.
          </p>
        </div>
      </section>

      <JourneyIndex />

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.sectionHeading}>
          <span>01 — 03</span>
          <h2 id="principles-title">The principles</h2>
        </div>
        <div className={styles.principleGrid}>
          {VANTA_PRINCIPLES.map((principle) => (
            <article className={styles.principle} key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.work} id="work" aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <span>SELECTED STUDIES</span>
          <h2 id="work-title">Projects built from an idea first.</h2>
        </div>
        <WorkGallery />
        <div className={styles.sectionLink}><Link href="/work">View all studies ↗</Link></div>
      </section>

      <section className={styles.studio} id="studio" aria-labelledby="studio-title">
        <div className={styles.sectionMeta}>VANTA / STUDIO</div>
        <div className={styles.studioCopy}>
          <p className={styles.kicker}>Quiet by design.</p>
          <h2 id="studio-title">Less spectacle. More spatial intelligence.</h2>
          <p className={styles.lede}>
            We use technology where it helps the architecture communicate: simulation, digital modelling, interactive presentation, and carefully controlled motion. The tools stay behind the experience.
          </p>
          <div className={styles.method}>
            {VANTA_STUDIO_METHOD.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <Link className={styles.sectionLink} href="/studio">Read the studio approach ↗</Link>
        </div>
      </section>

      <section className={styles.commission} id="contact" aria-labelledby="contact-title">
        <div>
          <span className={styles.sectionMeta}>VANTA / COMMISSION</span>
          <h2 id="contact-title">Have a space in mind?</h2>
          <CommissionForm />
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <span>VANTA / ARCHITECTURAL CONCEPT</span>
          <span>© 2026</span>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#journey">Journey</a>
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#contact">Commission</a>
        </nav>
      </footer>
    </main>
  );
}
