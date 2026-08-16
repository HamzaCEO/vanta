# VANTA CP15 — Responsive / Interaction / Experience Polish

## Purpose
Make the product feel like one intentional interface across the cinematic homepage and editorial pages, with particular attention to mobile navigation, keyboard access, anchor behavior, and responsive spacing.

## Changes
- Added reusable responsive `SiteHeader` with desktop navigation and accessible mobile menu.
- Added Escape-to-close behavior and body scroll locking while the mobile navigation is open.
- Added current-page navigation state on standalone Work and Studio pages.
- Added smooth anchor scrolling with reduced-motion fallback and section scroll margins.
- Added global text selection treatment consistent with the visual system.
- Tightened mobile top spacing on Work, Studio, and Project pages.
- Kept existing Three.js/R3F architecture and all dependencies unchanged.

## Intent
The 3D experience remains the signature interaction. The editorial site now has a coherent navigation system instead of separate page-specific header implementations.
