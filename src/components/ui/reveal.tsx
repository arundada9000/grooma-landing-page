"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useInViewWorks } from "@/lib/in-view-health";

/** useLayoutEffect warns when React renders on the server. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Scroll-based reveal used to control narrative pacing.
 *
 * Motion is a specific tool here, not decoration: elements rise and settle in
 * the order the story wants them read. Under reduced motion everything is
 * present immediately, preserving hierarchy without movement.
 *
 * IMPORTANT, and the reason this is not simply `initial` + `whileInView`:
 * that pairing renders `opacity: 0` into the SERVER HTML. Over half of a
 * page's text then depends on a ~900KB bundle downloading, parsing and
 * hydrating before it becomes visible - on the patchy connections this
 * product is sold for, that is a blank page. It also prints blank and shows
 * nothing at all if the bundle fails.
 *
 * So the settled state is the default, and the reveal is armed afterwards,
 * only for content below the fold. Anything already on screen when the page
 * hydrates simply stays put: re-hiding it to animate it in would undo the
 * very problem this solves, and would blink for any reader who got the HTML
 * before the JavaScript.
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
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once, margin: "-8% 0px -8% 0px" });
  // If the observer turns out never to fire, stop hiding anything.
  const observerWorks = useInViewWorks();

  useIsoLayoutEffect(() => {
    if (reduce) return;
    // No observer, no reveal. Never leave content hidden with nothing left to
    // bring it back.
    if (typeof IntersectionObserver === "undefined") return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let attempts = 0;

    // Arming is always safe to defer and never applied to something on
    // screen: the test itself is "is this below the fold", so a late arm
    // still only touches content the reader cannot see.
    const arm = () => {
      // A zero-height viewport means the page has not been laid out yet (a
      // collapsed frame, some embedders, a tab restored in the background).
      // Measuring against it would call every element below the fold and hide
      // the whole page, so wait for a real one rather than guess.
      const viewport = window.innerHeight;
      if (!viewport) {
        if (attempts++ < 60) frame = requestAnimationFrame(arm);
        return;
      }
      if (el.getBoundingClientRect().top >= viewport) setArmed(true);
    };

    // The first attempt runs before paint, so the common case never flickers.
    arm();
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  const hidden = armed && !inView && observerWorks;

  return (
    <motion.div
      ref={ref}
      className={className}
      // `false` means "start from the animate values", which is what keeps
      // opacity:0 out of the server HTML.
      initial={false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={
        hidden
          ? { duration: 0 }
          : { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }
      }
    >
      {children}
    </motion.div>
  );
}
