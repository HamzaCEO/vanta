import styles from "./ProjectPlate.module.css";

type ProjectPlateProps = {
  variant: "noir-house" | "monolith-01" | "afterlight";
};

const layouts = {
  "noir-house": { offset: 0, width: 58, height: 76, accent: 2, rhythm: 4 },
  "monolith-01": { offset: 10, width: 74, height: 62, accent: 5, rhythm: 3 },
  afterlight: { offset: -4, width: 64, height: 70, accent: 9, rhythm: 5 },
};

export function ProjectPlate({ variant }: ProjectPlateProps) {
  const layout = layouts[variant];

  return (
    <div className={styles.plate} aria-label="Abstract architectural study drawing" role="img">
      <svg viewBox="0 0 120 72" preserveAspectRatio="xMidYMid slice">
        <rect width="120" height="72" fill="#08090b" />
        <g fill="none" stroke="#a9b7c2" strokeWidth="0.22" opacity="0.65">
          {Array.from({ length: 9 }).map((_, index) => (
            <line key={`v-${index}`} x1={8 + index * 13} y1="5" x2={8 + index * 13} y2="67" />
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <line key={`h-${index}`} x1="5" y1={10 + index * 13} x2="115" y2={10 + index * 13} />
          ))}
        </g>
        <g transform={`translate(${layout.offset} 0)`}>
          <rect x="26" y="12" width={layout.width} height={layout.height} fill="#111419" stroke="#ece7de" strokeWidth="0.45" />
          <rect x="36" y="18" width={layout.width - 20} height={layout.height - 12} fill="#07080a" stroke="#3b4249" strokeWidth="0.3" />
          {Array.from({ length: 12 }).map((_, index) => {
            const x = 31 + index * layout.rhythm;
            return <line key={`frame-${index}`} x1={x} y1="13" x2={x + layout.accent} y2="64" stroke="#ece7de" strokeWidth={index % 4 === 0 ? 0.55 : 0.2} opacity={index % 4 === 0 ? 0.7 : 0.25} />;
          })}
          <path d="M28 59 L54 38 L92 53 L106 30" fill="none" stroke="#a9b7c2" strokeWidth="0.55" opacity="0.8" />
          <circle cx="82" cy="24" r="1.1" fill="#a9b7c2" opacity="0.85" />
        </g>
        <text x="7" y="66" fill="#83868c" fontSize="2.4" letterSpacing="0.7">VANTA / SPATIAL STUDY</text>
      </svg>
    </div>
  );
}
