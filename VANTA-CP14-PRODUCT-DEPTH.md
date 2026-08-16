# VANTA — CP14 Product Depth / Editorial Experience

## Purpose

CP14 makes the non-3D side of VANTA worth exploring on its own. The cinematic journey remains the signature experience, but the project system, studio story, and commission path now form a coherent product around it.

## Implemented

- Rebuilt the homepage selected-studies area around visual project cards using shared architectural study plates.
- Added project filtering for All / Residential / Cultural / Hospitality.
- Added principle tags to projects so each study is connected to the VANTA design language.
- Added a dedicated `/studio` editorial page with position, principles, method, boundaries, and commission CTA.
- Added a deeper project-detail "Design lens" section and next-study navigation.
- Added a stronger work-page closing CTA that leads into the commission flow.
- Moved `ProjectPlate` into the shared VANTA site component layer instead of importing it from an app route.
- Kept the existing fictional/concept-study disclosure.
- Kept pnpm as the package manager and did not add `package-lock.json`.
- Added no new dependencies.

## Product flow

3D Journey → Point of View → Principles → Studies → Studio → Commission

Project detail → Design lens → Next study → Commission

## Verification limitations

The checkpoint environment does not have project dependencies installed and does not have pnpm available, so a real `pnpm typecheck`, `pnpm lint`, and `pnpm build` could not be executed here. A global TypeScript invocation was attempted but only reported missing installed dependencies/types; it did not provide a meaningful project compile result.

The local machine remains the authoritative verification environment for this checkpoint.
