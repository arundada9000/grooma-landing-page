"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Page-scroll tracker + scroll-to-top.
 *
 * A hairline progress bar along the top edge shows how far down the page the
 * reader has travelled (gestalt "you're X% through the story"), and once
 * they've scroll far enough a small scroll-to-top affordance floats in to get
 * them back to the start (e.g. to reopen the demo). Disabled under reduced
 * motion, where the button still works but the bar is static.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        setShowTop(window.scrollY > window.innerHeight * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Progress hairline */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-copper"
        style={{ transform: `scaleX(${progress})` }}
      />
      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            title="Back to top"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="press fixed bottom-20 left-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-hairline-strong bg-ink-soft/90 text-paper-dim backdrop-blur-md hover:border-paper-dim hover:text-paper md:bottom-24 md:left-auto md:right-6"
            style={{ marginBottom: "env(safe-area-inset-bottom)" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
