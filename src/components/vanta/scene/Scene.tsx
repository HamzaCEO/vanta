"use client";

import type { RefObject } from "react";
import { CameraRig } from "./CameraRig";
import { Lighting } from "./Lighting";
import { Monolith } from "./Monolith";
import { Structures } from "./Structures";
import { Foreground } from "./Foreground";
import { Ground } from "./Ground";
import { Atmosphere } from "./Atmosphere";
import { Interior } from "./Interior";
import { ArchitecturalTransformation } from "./ArchitecturalTransformation";
import { DeepEnvironment } from "./DeepEnvironment";
import { FinalReveal } from "./FinalReveal";
import { VANTA_COLOR } from "./materials";

type SceneProps = {
  isMobile: boolean;
  reducedMotion: boolean;
  /** Raw 0–1 scroll progress driving the CameraRig's journey. */
  progressRef: RefObject<number>;
};

/**
 * The full 3D environment, layered foreground → midground → background:
 * the Foreground pylons frame the shot, the Monolith is the primary
 * midground monument, and Structures recede into fog as the background.
 * Kept free of page/UI concerns — the scroll-progress value is owned by
 * VantaExperience and just passed through to CameraRig here.
 */
export function Scene({ isMobile, reducedMotion, progressRef }: SceneProps) {
  const highQuality = !isMobile;
  const particlesEnabled = !isMobile && !reducedMotion;

  return (
    <>
      <color attach="background" args={[VANTA_COLOR.void]} />
      <CameraRig progressRef={progressRef} isMobile={isMobile} reducedMotion={reducedMotion} />
      <Lighting shadowsEnabled={highQuality} progressRef={progressRef} />
      {!isMobile && <Foreground />}
      <Monolith isMobile={isMobile} />
      <Interior isMobile={isMobile} />
      <ArchitecturalTransformation progressRef={progressRef} isMobile={isMobile} reducedMotion={reducedMotion} />
      <DeepEnvironment isMobile={isMobile} progressRef={progressRef} />
      <FinalReveal isMobile={isMobile} progressRef={progressRef} reducedMotion={reducedMotion} />
      <Structures isMobile={isMobile} />
      <Ground highQuality={highQuality} />
      <Atmosphere particlesEnabled={particlesEnabled} isMobile={isMobile} />
    </>
  );
}
