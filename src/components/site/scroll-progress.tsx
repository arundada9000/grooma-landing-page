"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";

/**
 * Page-scroll tracker + scroll-to-top.
 *
 * A hairline along the top edge and a ring around the back-to-top button both
 * show how far through the page the reader is.
 *
 * Progress is written straight to the DOM through refs rather than held in
 * React state. Storing it in state re-rendered this component (and everything
 * it returns) on every single scroll frame, which is what made the indicator
 * trail behind the page. Now the scroll callback touches two style properties
 * and nothing re-renders; only crossing the show/hide threshold does.
 */

const RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollProgress() {
  const [showTop, setShowTop] = useState(false);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const barRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const shownRef = useRef(false);

  const paint = useCallback(() => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress})`;
    }
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(
        CIRCUMFERENCE * (1 - progress),
      );
    }

    const next = y > window.innerHeight * 0.6;
    if (next !== shownRef.current) {
      shownRef.current = next;
      setShowTop(next);
    }
  }, []);

  // Lenis drives the scroll position, so its callback is the frame-accurate
  // source. `useLenis` re-subscribes if the instance changes.
  useLenis(paint);

  // Cover the cases Lenis does not emit for: first paint, resizes, and any
  // environment where Lenis is unavailable.
  useEffect(() => {
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint, { passive: true });
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, [paint]);

  const toTop = () => {
    // Lenis owns the scroll position while it is running; a native smooth
    // scrollTo runs against it and stutters. Fall back only when it is absent.
    if (lenis) {
      lenis.scrollTo(0, { immediate: !!reduce });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Progress hairline */}
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-copper"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Scroll to top, with the same progress drawn as a ring */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        title="Back to top"
        // Kept mounted and faded out rather than unmounted, so the ring never
        // has to re-enter mid-scroll.
        className={[
          "press fixed bottom-20 left-4 z-50 flex h-11 w-11 items-center justify-center",
          "rounded-full border border-hairline-strong bg-ink-soft/90 text-paper-dim",
          "backdrop-blur-md transition-[opacity,transform,color,border-color] duration-200",
          "hover:border-paper-dim hover:text-paper md:bottom-24 md:left-auto md:right-6",
          showTop
            ? "cursor-pointer opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        ].join(" ")}
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <svg
          viewBox="0 0 44 44"
          className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            ref={ringRef}
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset: CIRCUMFERENCE }}
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="relative h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
