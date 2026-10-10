"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  EASE_REVEAL,
  REVEAL_BLUR,
  REVEAL_DURATION,
  REVEAL_Y,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Scroll-triggered reveal implementing the `artcraft-motion-language` skill
 * (spec §1) on framer-motion instead of GSAP ScrollTrigger.
 *
 * ArtCraft token: `autoAlpha 0 / y 28 / blur 8px → 1 / 0 / 0`,
 * `.9s power3.out`, `once: true`, inline styles cleared on finish.
 * `viewport.once` gives the run-once behavior; scroll-back never replays.
 * Under reduced motion this renders a static div so content is fully
 * visible (spec §11) — CSS alone cannot stop a JS-driven tween.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  // Reduced motion: opacity cross-fade instead of movement/blur/scale,
  // per better-ui (never remove the element instantly).
  if (reduce)
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.2, delay: Math.min(delay, 0.1) }}
      >
        {children}
      </motion.div>
    );
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: REVEAL_Y, filter: REVEAL_BLUR }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: REVEAL_DURATION, delay, ease: EASE_REVEAL }}
    >
      {children}
    </motion.div>
  );
}
