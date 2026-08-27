"use client";

import { useEffect, useState } from "react";
import {
  isFeedbackEnabled,
  setFeedbackEnabled,
  feedback,
} from "@/lib/sound";

/**
 * Floating feedback toggle. Lets the visitor turn subtle sound + haptics on
 * or off. Sound is off by default (polite), so this is the entry point.
 */
export function FeedbackToggle() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOn(isFeedbackEnabled());
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    setFeedbackEnabled(next);
    if (next) feedback("toggle");
  };

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn sound effects off" : "Turn sound effects on"}
      title="Sound effects"
      className="group fixed bottom-20 right-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-hairline bg-ink-soft/90 text-paper-dim backdrop-blur-md transition-colors hover:border-hairline-strong hover:text-paper md:bottom-6 md:right-6"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        {on ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18 6a8.5 8.5 0 0 1 0 12" />
          </>
        ) : (
          <path d="m16 9 5 6M21 9l-5 6" />
        )}
      </svg>
    </button>
  );
}
