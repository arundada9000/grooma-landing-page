"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Section 03, "Availability isn't a guess."
 *
 * A live visual of the scheduling engine: raw constraints on the left animate
 * into the ACTUALLY available slots on the right. Nothing here is a "slot
 * because it looks nice", the available times are derived from the same
 * rules the product uses.
 */

interface ConstraintLine {
  label: string;
  value: string;
}

const CONSTRAINTS: ConstraintLine[] = [
  { label: "Shop hours", value: "09:00 - 19:00" },
  { label: "Lunch break", value: "13:00 - 14:00" },
  { label: "Service", value: "45 minutes" },
  { label: "Already booked", value: "10:00 · 14:30 · 16:00" },
];

const BREAK_RANGE = [60 * 13, 60 * 14]; // 13:00-14:00 in minutes
const OPEN = 9 * 60;
const CLOSE = 19 * 60;
const DURATION = 45;

// Slots computed the same way the engine does: 45-min windows inside open
// hours, never crossing lunch, starting on the quarter hour.
function computedSlots(): string[] {
  const out: string[] = [];
  const taken = [600, 870, 960]; // 10:00, 14:30, 16:00
  let m = OPEN;
  while (m + DURATION <= CLOSE) {
    const end = m + DURATION;
    const inBreakRange = m < BREAK_RANGE[1] && end > BREAK_RANGE[0];
    const collides = taken.some((t) => m < t + DURATION && t < end);
    if (!inBreakRange && !collides) {
      const h = Math.floor(m / 60);
      const mm = m % 60;
      out.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
    }
    m += 15;
  }
  return out;
}

export function AvailabilityEngine() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [showMechanism, setShowMechanism] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-20% 0px" });

  const slots = useMemo(computedSlots, []);

  // Walk the reveal when it first scrolls into view.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setDone(true), reduce ? 0 : 500);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  const replayTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => () => clearTimeout(replayTimer.current), []);

  const replay = () => {
    setDone(false);
    clearTimeout(replayTimer.current);
    replayTimer.current = setTimeout(() => setDone(true), reduce ? 0 : 60);
  };
  const revealMechanism = () => setShowMechanism(true);

  return (
    <div ref={wrapRef}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Constraints in */}
        <div>
          <p className="font-grotesk mb-4 text-xs tracking-[0.2em] text-metal uppercase">
            What the shop tells Grooma
          </p>
          <div className="space-y-2">
            {CONSTRAINTS.map((c, i) => (
              <div
                key={c.label}
                className="flex items-center justify-between gap-4 border-b py-3 border-hairline"
              >
                <span className="text-paper-dim">{c.label}</span>
                <span className="font-grotesk text-sm text-paper">{c.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span
              className={cn(
                "inline-block h-px flex-1 bg-hairline-strong transition-colors",
                done && "bg-copper",
              )}
              aria-hidden="true"
            />
            <span className="font-grotesk text-xs tracking-[0.2em] text-copper-bright uppercase">
              computed
            </span>
          </div>
        </div>

        {/* Available out */}
        <div>
          <p className="font-grotesk mb-4 text-xs tracking-[0.2em] text-metal uppercase">
            What a customer can actually book
          </p>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((label, i) => (
              // Every computed slot lands, staggered. Capping the reveal at a
              // fixed count left most of the day permanently ghosted, which
              // read as "these times are unavailable" - the opposite of the
              // point this section is making.
              <motion.div
                key={label}
                initial={false}
                animate={
                  done
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0.28, scale: 0.96 }
                }
                transition={{
                  delay: done && !reduce ? Math.min(0.06 * i, 0.9) : 0,
                  duration: reduce ? 0 : 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex h-14 items-center justify-center rounded-xl border border-hairline text-center font-grotesk text-lg text-copper-bright"
              >
                {label}
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={replay}
              className="rounded-full border border-hairline px-4 py-2 text-sm text-paper-dim transition-colors hover:border-hairline-strong hover:text-paper"
            >
              Re-run
            </button>
            <p className="text-sm text-paper-dim">
              A slot is offered only when the full {DURATION} minutes fit.
            </p>
          </div>
        </div>
      </div>

      {!showMechanism && (
        <button
          type="button"
          onClick={revealMechanism}
          className="mt-12 text-sm text-copper-bright underline underline-offset-4 hover:text-copper"
        >
          What keeps this honest on the inside →
        </button>
      )}

      <AnimatePresence>
        {showMechanism && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            <Mechanism
              index="01"
              title="Honest by default"
              body="Slots come from your real hours, breaks, closures and existing bookings. If Grooma shows it, it's open."
            />
            <Mechanism
              index="02"
              title="Claimed instantly"
              body="The moment a time is chosen, it's taken and stops appearing for everyone else. No waiting to find out."
            />
            <Mechanism
              index="03"
              title="Guaranteed no overlap"
              body="Two customers can never be told the same time is theirs, even when bookings arrive at the same moment."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Mechanism({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-hairline p-5">
      <div className="font-grotesk text-sm text-copper-bright">{index}</div>
      <h3 className="mt-2 font-semibold text-paper">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-paper-dim">{body}</p>
    </div>
  );
}
