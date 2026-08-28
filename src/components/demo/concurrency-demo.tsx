"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Section 04, "Two people, same chair."
 *
 * A narrative of a race: Customer A and Customer B both reach for 10:30. Both
 * requests arrive at Grooma. Only one booking is accepted, the other is told
 * the honest truth. The point is that integrity lives in the database, not
 * the interface.
 */

type Phase =
  | "idle"
  | "both-select"
  | "requests"
  | "engine"
  | "accepted"
  | "rejected";

const PHASE_DURATIONS: Record<Exclude<Phase, "idle">, number> = {
  "both-select": 900,
  requests: 800,
  engine: 1200,
  accepted: 2600,
  rejected: 2000,
};

export function ConcurrencyDemo() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (phase === "idle") {
      const t = setTimeout(() => setPhase("both-select"), reduce ? 0 : 700);
      return () => clearTimeout(t);
    }
    if (phase === "rejected") return; // hold the end state
    const t = setTimeout(() => {
      const order: Phase[] = [
        "both-select",
        "requests",
        "engine",
        "accepted",
        "rejected",
      ];
      const idx = order.indexOf(phase);
      setPhase(order[idx + 1] ?? "rejected");
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  const replay = () => setPhase("idle");

  /** The requests are in flight; nobody has an answer yet. */
  const inFlight = phase === "requests" || phase === "engine";
  /** The engine has settled the slot, so both actors can be told the truth. */
  const decided = phase === "accepted" || phase === "rejected";

  /**
   * A wins, always, and stays the winner for the rest of the story. The
   * "accepted"/"rejected" phases narrate the two halves of the SAME outcome
   * (one booking confirmed, one honestly turned away), they are not two
   * different results.
   */
  return (
    <div className="my-6">
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        {/* A */}
        <CustomerActor
          name="Customer A"
          arrived={decided}
          accepted={decided}
          inFlight={inFlight}
          reduce={!!reduce}
        />
        {/* Engine */}
        <div className="mx-auto flex flex-col items-center gap-2 py-4 sm:py-0">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full border transition-colors duration-300",
              decided
                ? "border-copper bg-copper-soft text-copper-bright"
                : "border-hairline text-metal",
            )}
          >
            <span className="font-display text-xl">G</span>
          </div>
          <span className="font-grotesk text-xs tracking-[0.2em] text-metal uppercase">
            Grooma
          </span>
        </div>
        {/* B */}
        <CustomerActor
          name="Customer B"
          arrived={decided}
          accepted={false}
          inFlight={inFlight}
          reduce={!!reduce}
        />
      </div>

      {/* Verdict */}
      <div className="mt-8 min-h-[120px]">
        <AnimatePresence mode="wait">
          {phase === "engine" && (
            <motion.p
              key="engine"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center font-grotesk text-sm tracking-wide text-metal"
            >
              Two requests, one chair, ~the same instant…
            </motion.p>
          )}
          {phase === "accepted" && (
            <motion.div
              key="accepted"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-md text-center"
            >
              <p className="font-display text-2xl text-ok">One booking. The right one.</p>
              <p className="mt-2 text-paper-dim">
                The other customer is told the slot just went, honestly, not left to
                wonder whether it went through.
              </p>
            </motion.div>
          )}
          {phase === "rejected" && (
            <motion.div
              key="rejected"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md text-center"
            >
              <p className="font-grotesk text-sm tracking-[0.2em] text-copper-bright uppercase">
                One chair. One winner.
              </p>
              <p className="mt-3 text-paper-dim">
                Grooma settles the slot the moment it&apos;s booked, so two customers
                can never both be told the same time is theirs.
              </p>
              <button
                onClick={replay}
                className="mt-5 rounded-full border border-hairline px-4 py-2 text-sm text-paper-dim transition-colors hover:border-hairline-strong hover:text-paper"
              >
                Watch again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CustomerActor({
  name,
  arrived,
  accepted,
  inFlight,
  reduce,
}: {
  name: string;
  /** The verdict is in and can be shown to this customer. */
  arrived: boolean;
  /** This customer got the chair. */
  accepted: boolean;
  /** The request is on its way, no answer yet. */
  inFlight: boolean;
  reduce: boolean;
}) {
  return (
    // Border state lives in classes, not an animated inline style: an
    // `animate={{}}` fallback never restores the original colour, so replaying
    // the race left the previous winner's card outlined in green.
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-colors duration-500",
        arrived && accepted ? "border-ok/50" : "border-hairline",
      )}
    >
      <span className="text-paper-dim text-sm">{name}</span>
      <span
        className={cn(
          "rounded-xl border px-4 py-2 font-grotesk text-lg transition-colors duration-300",
          arrived && accepted && "border-ok/50 bg-ok-soft text-ok",
          arrived && !accepted && "border-hairline text-metal line-through",
          !arrived && "border-hairline text-paper",
          inFlight && "border-hairline-strong",
        )}
      >
        10:30
      </span>
      <AnimatePresence>
        {arrived && (
          <motion.span
            key={name}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs"
            style={{ color: accepted ? "var(--color-ok)" : "var(--color-bad)" }}
          >
            {accepted ? "Booked ✓" : "Just taken"}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
