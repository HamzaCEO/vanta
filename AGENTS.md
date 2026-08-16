# VANTA — AI Coding Agent Instructions

## Project

VANTA is a fictional premium architecture studio website whose signature experience is an immersive 3D cinematic architectural journey. The 3D experience is the entry point and storytelling device; it is not the entire product.

Core direction:

- Futuristic
- Luxurious
- Dark
- Minimal
- Cinematic
- Mysterious
- 3D-first

The website should feel like a real architecture studio experience with a continuous architectural journey at its center. Supporting sections must give the journey meaning: design principles, selected concept studies, studio positioning, and a clear commission/contact path. Do not reduce the project to a conventional landing page with a 3D background, but also do not leave the 3D journey without a product purpose.

## Core Experience

The user progressively travels through a futuristic monolithic architectural environment.

The intended experience is approximately:

1. Distant structure / arrival
2. Approach
3. Entrance
4. Interior
5. Architectural transformation
6. Deep environment
7. Final reveal

Scrolling is the primary interaction.

Scroll progress should eventually control the cinematic timeline, including:

- Camera position
- Camera rotation
- Architecture transformation
- Lighting
- Environment
- Text transitions

The 3D environment is the core experience, not decorative background content.

## Visual Direction

Use a restrained premium visual language.

Preferred characteristics:

- Near-black / charcoal environment
- Soft white / warm-white typography
- Restrained cool metallic accent
- Large negative space
- Architectural typography
- Dark reflective materials
- Glass / metal / stone surfaces
- Atmospheric fog
- Controlled lighting
- Subtle particles where useful

Avoid:

- Generic cyberpunk aesthetics
- Excessive neon
- Gamer aesthetics
- Excessive gradients
- Excessive glassmorphism
- Random floating objects
- Over-animation
- Generic AI-generated landing-page layouts

The result should feel expensive and intentional rather than flashy.

## Technology

Current foundation:

- Next.js 16
- React
- TypeScript
- App Router
- React Three Fiber
- Three.js
- Drei
- CSS Modules / project styling system

Do not introduce a new framework or styling system without a clear technical reason.

Prefer existing dependencies and simple solutions.

## Architecture

Keep responsibilities separated.

3D scene code should remain separate from:

- Page structure
- Storytelling/content sections
- Navigation
- UI controls
- Shared utilities

Prefer small, focused components.

Avoid creating giant components that contain the entire experience.

## 3D Principles

The scene must be intentionally art-directed.

Do not create huge numbers of unnecessary objects.

Prioritize:

- Controlled geometry
- Efficient materials
- Reasonable texture sizes
- Limited draw calls
- Appropriate DPR
- Stable animation loops
- Reusable objects/components
- Performance-aware rendering

The environment should look sophisticated without unnecessary technical complexity.

## Responsive Design

Desktop is the primary cinematic experience.

Mobile must remain usable and visually coherent.

Do not simply scale the desktop scene down.

For mobile, reduce where necessary:

- Geometry complexity
- Particle count
- Lighting complexity
- Animation complexity
- Camera movement

Preserve the VANTA identity on smaller screens.

## Accessibility

Maintain:

- Semantic HTML
- Keyboard-accessible controls
- Accessible buttons and navigation
- Meaningful labels
- Visible focus states
- Appropriate contrast
- Reduced-motion support

For prefers-reduced-motion:

- Reduce or disable cinematic camera movement
- Reduce environmental animation
- Avoid rapid transitions
- Preserve all important content and navigation

## Motion

Motion should feel:

- Slow
- Smooth
- Cinematic
- Intentional
- Weighted

Avoid:

- Random movement
- Excessive bouncing
- Constant animation
- Fast distracting transitions
- Animation that exists only to look impressive

## Product Direction

The project was originally built through the 7-phase 3D journey roadmap. That roadmap is now considered the completed technical foundation, not the final product structure. The next work must turn VANTA into a coherent architecture-studio website.

The primary visitor journey is:

1. Enter the cinematic architectural experience.
2. Understand the architectural idea behind the journey.
3. Explore VANTA principles.
4. Review selected concept studies.
5. Understand the studio and its design philosophy.
6. Reach a commission/contact action.

The 3D scene remains the signature feature. Do not remove or replace it with decorative 3D. Instead, connect it to meaningful editorial content and a clear conversion path.

Do not invent real clients, awards, testimonials, statistics, or professional claims. Concept projects must be presented as concept studies.

## Scope Control

The project is being built in phases.

Agents MUST work only on the currently assigned phase.

Do not implement later phases early.

Do not add unrelated features.

Do not redesign completed work unless the current phase explicitly requires it.

If a later improvement is discovered, report it under "Future work" instead of silently implementing it.

## Existing Work

Before modifying the project:

1. Inspect the current repository.
2. Inspect relevant existing files.
3. Understand the current architecture.
4. Reuse existing systems where appropriate.
5. Do not rebuild existing work without a reason.

Never assume that a component or dependency is missing before checking.

## Verification

After implementation:

- Run TypeScript verification.
- Run ESLint.
- Run production build.
- Run `git diff --check`.
- Check imports and routes.
- Check responsive behavior where relevant.
- Check accessibility where relevant.
- Report any verification limitation honestly.

Do not claim something was tested if it was not tested.

## Git

The GitHub repository is the project's source of truth.

Repository:

https://github.com/HamzaCEO/vanta

Before starting a phase, inspect the current Git state.

Do not rewrite Git history.

Do not force-push.

Complete phases should be checkpointed with clear commits.

Recommended commit style:

- "Build VANTA foundation"
- "Build VANTA 3D environment"
- "Add VANTA cinematic scroll"
- "Build VANTA storytelling UI"
- "Optimize VANTA responsive experience"
- "Complete VANTA final QA"

## Agent Handoff

Another AI agent may continue this project at any time.

Therefore:

- Preserve understandable architecture.
- Keep important decisions documented.
- Do not rely on hidden agent memory.
- Do not store critical project information only in chat.
- Keep the repository buildable at phase checkpoints.

When finishing a phase, report:

1. What was already present
2. What was changed
3. Files created
4. Files modified
5. Technical decisions
6. Verification results
7. Known limitations
8. Exact next phase

## Important Rule

Do not turn VANTA into a generic website.

The defining characteristic of the project is:

"An immersive futuristic architectural journey controlled by cinematic scrolling."

Every major implementation decision should support that goal.
