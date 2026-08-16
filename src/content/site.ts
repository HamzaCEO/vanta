export type VantaChapter = {
  eyebrow: string;
  title: string;
  body: string;
  range: [number, number];
};

export const VANTA_CHAPTERS: VantaChapter[] = [
  { eyebrow: "00 / ARRIVAL", title: "Architecture begins before the entrance.", body: "Distance creates anticipation. The first view is deliberately incomplete.", range: [0, 0.09] },
  { eyebrow: "01 / APPROACH", title: "The building reveals its weight.", body: "A controlled procession brings structure, shadow, and proportion into focus.", range: [0.09, 0.2] },
  { eyebrow: "02 / ENTRANCE", title: "A threshold changes the scale of the world.", body: "The exterior compresses around a single opening. Movement becomes the guide.", range: [0.2, 0.31] },
  { eyebrow: "03 / THRESHOLD", title: "Light becomes the first interior material.", body: "The camera crosses the boundary without a scene cut. Exterior and interior remain one continuous space.", range: [0.31, 0.42] },
  { eyebrow: "04 / INTERIOR", title: "Space is experienced through movement.", body: "Walls, fins, ceiling planes, and distant light establish a measured architectural rhythm.", range: [0.42, 0.56] },
  { eyebrow: "05 / TRANSFORMATION", title: "The architecture changes with you.", body: "Structural planes recede and rotate to expose a deeper layer of the building.", range: [0.56, 0.67] },
  { eyebrow: "06 / DEPTH", title: "The building continues beyond the first room.", body: "Repeating frames and recessed bays stretch the experience into a larger architectural sequence.", range: [0.67, 0.84] },
  { eyebrow: "07 / FINAL APPROACH", title: "The noise falls away.", body: "The final chamber is approached slowly, with more negative space and less visual information.", range: [0.84, 0.94] },
  { eyebrow: "08 / REVEAL", title: "The void becomes the destination.", body: "The monument opens onto a quieter volume. The journey ends by expanding the space rather than filling it.", range: [0.94, 1] },
];

export type VantaProject = {
  index: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  materials: string[];
  status: string;
  slug: string;
  statement: string;
  spatialSequence: string[];
  challenge: string;
  principles: string[];
};

export const VANTA_PROJECTS: VantaProject[] = [
  {
    index: "01",
    title: "NOIR HOUSE",
    category: "Private residence / concept",
    location: "Cairo, Egypt",
    year: "2026",
    description:
      "A compact residence organised around compression, controlled daylight, and a sequence of thresholds rather than a conventional corridor plan.",
    materials: ["Dark stone", "Brushed steel", "Low-iron glass"],
    status: "Concept study",
    slug: "noir-house",
    statement: "A residence organised around the tension between compression and release.",
    spatialSequence: ["Compressed arrival", "Filtered threshold", "Central void", "Private garden room"],
    challenge: "How can a small footprint feel expansive without relying on a large open-plan room?",
    principles: ["LIGHT", "MOVEMENT"],
  },
  {
    index: "02",
    title: "MONOLITH / 01",
    category: "Cultural space / concept",
    location: "Dubai, UAE",
    year: "2026",
    description:
      "A civic volume that turns movement into the organising principle, using a heavy exterior shell and a deliberately quiet interior void.",
    materials: ["Architectural concrete", "Aluminium", "Textured glass"],
    status: "Concept study",
    slug: "monolith-01",
    statement: "A civic volume that makes movement the organising principle of the building.",
    spatialSequence: ["Public forecourt", "Heavy threshold", "Central hall", "Quiet gallery"],
    challenge: "How can a monumental exterior remain welcoming and legible at a pedestrian scale?",
    principles: ["MOVEMENT", "MATERIAL"],
  },
  {
    index: "03",
    title: "AFTERLIGHT",
    category: "Hospitality / concept",
    location: "Reykjavík, Iceland",
    year: "2026",
    description:
      "A retreat shaped around changing light conditions, with deep openings and long interior perspectives designed to slow the visitor down.",
    materials: ["Basalt", "Oak", "Satin metal"],
    status: "Concept study",
    slug: "afterlight",
    statement: "A retreat designed around changing light rather than a fixed visual centre.",
    spatialSequence: ["Dark arrival", "Long aperture", "Shared hearth", "Private retreat"],
    challenge: "How can daylight become a changing spatial material throughout the day?",
    principles: ["LIGHT", "MATERIAL"],
  },
];

export const VANTA_PRINCIPLES = [
  {
    number: "01",
    title: "LIGHT",
    text: "Light is treated as structure. Openings, shadow lines, and reflective surfaces determine how a space is read before furniture ever enters it.",
  },
  {
    number: "02",
    title: "MOVEMENT",
    text: "A building is experienced in sequence. Compression, release, threshold, and reveal become part of the architecture rather than decoration around it.",
  },
  {
    number: "03",
    title: "MATERIAL",
    text: "Materials are selected for how they age, absorb light, and define scale. The palette stays restrained so proportion and atmosphere remain visible.",
  },
];

export const VANTA_STUDIO_METHOD = [
  {
    number: "01",
    title: "OBSERVE",
    text: "Start with the site, the movement around it, and the conditions that cannot be designed away.",
  },
  {
    number: "02",
    title: "SEQUENCE",
    text: "Translate those conditions into a spatial progression: arrival, threshold, compression, release, and destination.",
  },
  {
    number: "03",
    title: "RESOLVE",
    text: "Refine proportion, material, daylight, and detail until the architecture communicates without explanation.",
  },
];

