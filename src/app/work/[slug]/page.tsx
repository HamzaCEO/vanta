import Link from "next/link";
import { notFound } from "next/navigation";
import { VANTA_PROJECTS } from "@/content/site";
import styles from "./project.module.css";
import { ProjectPlate } from "@/components/vanta/site/ProjectPlate";
import { SiteHeader } from "@/components/vanta/site/SiteHeader";
import { SiteFooter } from "@/components/vanta/site/SiteFooter";

export function generateStaticParams() {
  return VANTA_PROJECTS.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = VANTA_PROJECTS.find((item) => item.slug === slug);

  if (!project) notFound();

  const currentIndex = VANTA_PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = VANTA_PROJECTS[(currentIndex + 1) % VANTA_PROJECTS.length];

  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroMeta}>
          <span>{project.index} / {project.status}</span>
          <span>{project.location} / {project.year}</span>
        </div>
        <p className={styles.category}>{project.category}</p>
        <h1>{project.title}</h1>
        <p className={styles.statement}>{project.statement}</p>
        <div className={styles.facts} aria-label="Project facts">
          <div><span>TYPE</span><strong>{project.category.split(" /")[0]}</strong></div>
          <div><span>LOCATION</span><strong>{project.location}</strong></div>
          <div><span>YEAR</span><strong>{project.year}</strong></div>
          <div><span>STATUS</span><strong>{project.status}</strong></div>
        </div>
        <ProjectPlate variant={project.slug as "noir-house" | "monolith-01" | "afterlight"} />
      </section>

      <section className={styles.body}>
        <div>
          <span className={styles.label}>The question</span>
          <h2>{project.challenge}</h2>
        </div>
        <div>
          <span className={styles.label}>Spatial sequence</span>
          <ol className={styles.sequence}>
            {project.spatialSequence.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.materials}>
        <span className={styles.label}>Material language</span>
        <div className={styles.materialGrid}>
          {project.materials.map((material) => (
            <div className={styles.material} key={material}>
              <span />
              <strong>{material}</strong>
              <small>Selected for atmosphere, scale, and ageing.</small>
            </div>
          ))}
        </div>
      </section>


      <section className={styles.lens}>
        <div>
          <span className={styles.label}>Design lens</span>
          <h2>The project is read through the same principles that shape the VANTA journey.</h2>
        </div>
        <div className={styles.lensList}>
          {project.principles.map((principle, index) => (
            <div key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{principle}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.nextStudy}>
        <span className={styles.label}>NEXT STUDY / {nextProject.index}</span>
        <Link href={`/work/${nextProject.slug}`}>
          <strong>{nextProject.title}</strong>
          <span>Explore the next architectural question ↗</span>
        </Link>
      </section>

      <section className={styles.note}>
        <span>CONCEPT STUDY / NOT CLIENT WORK</span>
        <p>This project is a fictional VANTA design study created for the portfolio. It is intentionally presented as a concept, not as a real commission or completed building.</p>
      </section>

      <section className={styles.commission}>
        <span className={styles.label}>THE NEXT BRIEF</span>
        <h2>Have a spatial question worth testing?</h2>
        <Link href="/#contact">Start a commission inquiry ↗</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
