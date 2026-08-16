"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { VANTA_PROJECTS } from "@/content/site";
import { ProjectPlate } from "./ProjectPlate";
import styles from "./WorkGallery.module.css";

const FILTERS = ["ALL", "RESIDENTIAL", "CULTURAL", "HOSPITALITY"] as const;
type Filter = (typeof FILTERS)[number];

function matches(project: (typeof VANTA_PROJECTS)[number], filter: Filter) {
  if (filter === "ALL") return true;
  return project.category.toUpperCase().startsWith(filter);
}

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const projects = useMemo(() => VANTA_PROJECTS.filter((project) => matches(project, filter)), [filter]);

  return (
    <div className={styles.gallery}>
      <div className={styles.toolbar} aria-label="Filter concept studies">
        <span>FILTER</span>
        <div className={styles.filters}>
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? styles.active : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span>{String(projects.length).padStart(2, "0")} STUDIES</span>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <article className={`${styles.card} ${index === 0 ? styles.featured : ""}`} key={project.slug}>
            <Link href={`/work/${project.slug}`} className={styles.visual} aria-label={`Open ${project.title}`}>
              <ProjectPlate variant={project.slug as "noir-house" | "monolith-01" | "afterlight"} />
              <span className={styles.view}>VIEW STUDY ↗</span>
            </Link>
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <span>{project.index} / {project.category}</span>
                <span>{project.location}</span>
              </div>
              <h2><Link href={`/work/${project.slug}`}>{project.title}</Link></h2>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.principles.map((principle) => <span key={principle}>{principle}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
