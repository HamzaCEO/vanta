"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 768px)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Desktop complexity by default until the viewport can be measured.
function getServerSnapshot() {
  return false;
}

/**
 * Tracks whether the viewport is mobile-sized, so the 3D scene can reduce
 * geometry, particles, and pixel ratio accordingly.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
