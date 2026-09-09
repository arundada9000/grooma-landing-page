"use client";

import { useEffect, useState } from "react";

/**
 * Is IntersectionObserver actually delivering callbacks?
 *
 * The scroll reveals hide content and rely on the observer to bring it back.
 * That is a fine bet in a browser, but not everything that renders this page
 * is one: screenshot and link-preview services, PDF renderers and some
 * embedded webviews construct an IntersectionObserver happily and then never
 * fire it. In those, every armed reveal would stay hidden forever and the
 * page would be blank.
 *
 * So we ask once. The observer always emits an initial callback for a target
 * it starts observing, whatever the intersection state, so silence past a
 * grace period means the API is present but inert - and every reveal gives up
 * on hiding.
 *
 * One probe and one timer for the whole app, not one per revealed element.
 */

type Health = "probing" | "working" | "inert";

let health: Health = "probing";
let started = false;
const listeners = new Set<(h: Health) => void>();

function settle(next: Health) {
  if (health !== "probing") return;
  health = next;
  for (const l of listeners) l(next);
}

function probe() {
  if (started) return;
  started = true;

  if (typeof IntersectionObserver === "undefined") {
    settle("inert");
    return;
  }

  try {
    const observer = new IntersectionObserver(() => {
      settle("working");
      observer.disconnect();
    });
    observer.observe(document.body);
    window.setTimeout(() => {
      if (health === "probing") {
        observer.disconnect();
        settle("inert");
      }
    }, 600);
  } catch {
    settle("inert");
  }
}

/**
 * False once the observer is known not to fire. Optimistic until then, so the
 * reveal still runs from the first frame in the overwhelmingly common case.
 */
export function useInViewWorks(): boolean {
  const [state, setState] = useState<Health>(health);

  useEffect(() => {
    probe();
    if (health !== "probing") {
      setState(health);
      return;
    }
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state !== "inert";
}
