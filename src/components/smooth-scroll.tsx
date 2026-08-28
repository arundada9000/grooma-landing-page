"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Lenis smooth scrolling for the marketing site. Neutralised when the user
 * prefers reduced motion, hierarchy and reachability survive without it.
 *
 * The provider stays mounted either way. With `root` it renders its children
 * directly (no wrapper element), so toggling behaviour through options avoids
 * swapping the component that wraps the entire app, which would otherwise
 * remount every page on the client's first render.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<LenisRef>(null);

  /**
   * Lenis caches the scroll limit and only refreshes it when its own
   * ResizeObserver fires, on a 250ms debounce. Anything that makes the page
   * taller after that measurement - an FAQ answer opening, the booking demo
   * reaching its taller confirmation step, a late-loading font - leaves the
   * limit short, and the page appears to jam partway down until a reload.
   *
   * Watching the body (which actually grows, unlike a viewport-height <html>)
   * and re-measuring on the next frame keeps the limit honest immediately.
   */
  useEffect(() => {
    const body = document.body;
    let frame = 0;
    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ref.current?.lenis?.resize());
    };

    const observer = new ResizeObserver(remeasure);
    observer.observe(body);
    window.addEventListener("load", remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("load", remeasure);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={ref}
      options={{
        duration: 1.05,
        smoothWheel: !reduce,
        syncTouch: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
