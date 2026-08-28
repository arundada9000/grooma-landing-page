"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { BookingFlow } from "@/components/demo/booking-flow";
import { Reveal } from "@/components/ui/reveal";
import { feedback } from "@/lib/sound";

/**
 * Section 01, The haircut.
 * The product is visible above the fold: an actual booking interaction, not
 * a phone mockup beside marketing copy. "Your chair has a schedule. Now your
 * website does too."
 *
 * Marked "use client" because the hero carries the two in-page CTAs that
 * smooth-scroll through Lenis, plus the entrance + idle micro-motion.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    feedback("click");
    const target = document.querySelector(href);
    if (!target) return;
    // offset clears the fixed 4rem header; scrollIntoView would tuck the
    // section heading underneath it.
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        offset: -80,
        immediate: !!reduce,
      });
      return;
    }
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Atmospheric warm vignette, tactile floor, not a gradient blob. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--color-ink) 86%, var(--color-accent)) 0%, var(--color-ink) 62%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-8 sm:pt-40 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <p className="font-grotesk mb-5 flex items-center gap-3 text-sm tracking-[0.22em] text-copper-bright uppercase">
                <span className="inline-block h-px w-8 bg-copper" aria-hidden="true" />
                Your barbershop, on the web
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display text-5xl font-black leading-[1.02] tracking-tight text-paper sm:text-6xl lg:text-7xl">
                Your chair has a schedule.
                <br />
                <span className="text-copper-bright">Now your website does too.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-dim">
                Customers book a real, available time, no account, no call, no
                waiting to hear back. You run the day from one calm dashboard.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/demo"
                  onClick={() => feedback("click")}
                  className="press inline-flex h-13 items-center gap-2 rounded-full bg-copper px-7 text-base font-semibold text-on-accent hover:bg-copper-bright"
                >
                  Try the demo
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="#how"
                  onClick={go("#how")}
                  className="press inline-flex h-13 items-center rounded-full border border-hairline-strong px-7 text-base font-medium text-paper hover:border-paper-dim hover:text-paper"
                >
                  See how Grooma works
                </a>
              </div>
            </Reveal>
          </div>

          {/* The product, alive, not a screenshot, not a phone. */}
          <Reveal delay={0.15} y={24} className="lg:justify-self-end lg:w-full lg:max-w-md">
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
              className="grain rounded-[24px] border border-hairline p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <BookingFlow />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
