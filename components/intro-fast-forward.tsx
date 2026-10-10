"use client";

import { useEffect } from "react";
import { FF_SCALE } from "@/lib/motion";

/**
 * ArtCraft intro principle (spec §0): the first user input fast-forwards
 * the load intro — accelerate, never jump-cut.
 *
 * Sets `data-intro-fast="<scale>"` on `<html>`; the hero CSS animations
 * shorten to 1/FF_SCALE of their duration with delays cleared (see
 * globals.css). One-shot passive listeners; harmless under reduced motion
 * (durations are already ~0 there).
 */
export function IntroFastForward() {
  useEffect(() => {
    if (document.documentElement.hasAttribute("data-intro-fast")) return;
    const fire = () => {
      document.documentElement.setAttribute(
        "data-intro-fast",
        String(FF_SCALE),
      );
    };
    window.addEventListener("wheel", fire, { once: true, passive: true });
    window.addEventListener("pointerdown", fire, { once: true, passive: true });
    window.addEventListener("touchstart", fire, { once: true, passive: true });
    window.addEventListener("keydown", fire, { once: true });
    return () => {
      window.removeEventListener("wheel", fire);
      window.removeEventListener("pointerdown", fire);
      window.removeEventListener("touchstart", fire);
      window.removeEventListener("keydown", fire);
    };
  }, []);
  return null;
}
