# VANTA — CP8 Product Re-Architecture

## Status

CP8 is the product-direction reset after completion of the original 7-phase 3D implementation. The existing 3D work is retained as the technical foundation.

## Problem identified

The previous implementation successfully demonstrated a cinematic scroll-controlled architectural scene, but the page ended with the reveal. It demonstrated a technical capability without giving the visitor a meaningful product, information architecture, or next action.

That is not sufficient for a serious frontend portfolio project.

## New product

VANTA is now positioned as a fictional premium architecture studio website. Its signature feature is the immersive architectural journey, but the website continues beyond that journey into a real studio narrative.

### Product promise

**We design the sequence, not just the object.**

The experience communicates architecture through:

- light
- movement
- material
- threshold
- proportion
- spatial sequence

## Visitor journey

```text
ENTRY
  ↓
CINEMATIC ARCHITECTURAL JOURNEY
  ↓
POINT OF VIEW
  ↓
DESIGN PRINCIPLES
  ↓
SELECTED CONCEPT STUDIES
  ↓
STUDIO
  ↓
COMMISSION / CONTACT
```

## Content architecture

### 1. Cinematic entry

The existing 3D journey remains the first major experience. Scroll progress now exposes chapter-level architectural copy so each camera movement communicates an idea rather than functioning as an isolated visual demo.

Chapters:

- Arrival
- Approach
- Entrance
- Threshold
- Interior
- Transformation
- Depth
- Final Approach
- Reveal

### 2. Point of view

A concise statement explains what VANTA is and why movement matters to the architecture.

### 3. Principles

Three core principles provide a readable design framework:

- Light
- Movement
- Material

### 4. Selected studies

Three fictional concept projects demonstrate that the studio has a portfolio structure rather than a single 3D scene. They are explicitly labelled as concept studies and are not presented as real client work.

### 5. Studio

The studio section explains the relationship between architecture and technology without making technology the product.

### 6. Commission

The site ends with a clear action to begin a project. This is the conversion destination of the website.

## Technical decisions

- Existing R3F/Three.js architecture is preserved.
- Existing native-scroll system remains the single driver of the cinematic journey.
- Chapter copy is derived from the same normalized scroll progress.
- Chapter state changes only at chapter boundaries; React is not updated every scroll frame.
- The post-journey content is semantic HTML rather than additional 3D effects.
- No new dependency was introduced.
- Existing pnpm workflow is preserved.
- The 3D stage remains fixed because of the documented WebGL rendering issue with sticky positioning.

## Current implementation in CP8

Created:

- `src/content/site.ts`
- `src/lib/hooks/useScrollChapter.ts`
- `src/components/vanta/site/SiteContent.tsx`
- `src/components/vanta/site/SiteContent.module.css`

Modified:

- `src/app/page.tsx`
- `src/components/vanta/ui/Overlay.tsx`
- `src/components/vanta/ui/Overlay.module.css`
- `AGENTS.md`

## Explicitly not done yet

- individual project detail routes
- project imagery/art direction
- full commission form workflow
- case-study content
- mobile-specific editorial refinement
- final performance/QA pass
- deployment

Those belong to later checkpoints.

## Verification limitation

The current container does not have pnpm installed and cannot download pnpm 11.1.3 from the npm registry because outbound registry access is unavailable. Therefore TypeScript, ESLint, and production build verification cannot honestly be claimed from this environment.

The user's local environment remains the authoritative runtime verification environment.

## Next checkpoint

**CP9 — Editorial UX + Project System**

The next checkpoint should turn the concept-study list into a real project browsing experience, define project detail structure, and refine the editorial hierarchy before expanding implementation further.
