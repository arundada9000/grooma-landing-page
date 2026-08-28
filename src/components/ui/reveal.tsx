"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-based reveal used to control narrative pacing.
 *
 * Motion is a <specific> tool here, not decoration: elements rise and settle
 * in the order the story wants them read. Under reduced motion everything is
 * present immediately, preserving hierarchy without movement.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  // Always the same element, animated or not. Swapping motion.div for a plain
  // div under reduced motion changed the rendered component between the server
  // and the client's first paint, which tore down and rebuilt the subtree.
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
