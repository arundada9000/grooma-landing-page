import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { BookingFlow } from "@/components/demo/booking-flow";
import { AvailabilityEngine } from "@/components/demo/availability-engine";
import { ThemeSwitcher } from "@/components/demo/theme-switcher";
import { ConcurrencyDemo } from "@/components/demo/concurrency-demo";
import { Reveal } from "@/components/ui/reveal";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/metadata";
import { demoNotice } from "@/config/site";

/** One description of this route, read by both the <head> and the JSON-LD. */
const PAGE = {
  title: "Demo | Try the booking flow live",
  description:
    "Try Grooma's real booking flow, availability engine and theme switcher in your browser. No account, no sign-up, no database. See how guest booking and no double-bookings actually work.",
  path: "/demo",
  keywords: [
    "barbershop booking demo",
    "try barbershop booking software",
    "barbershop scheduling demo",
    "live barbershop booking demo",
  ],
  crumb: "Demo",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function DemoPage() {
  return (
    <>
      <StructuredData page={PAGE} withHowTo />

      <PageHero
        eyebrow="Interactive demo"
        title={
          <>
            Book a demo haircut,{" "}
            <span className="text-copper-bright">right now.</span>
          </>
        }
        blurb="This is the real booking surface, simulated entirely in your browser. Pick a service, a barber and an available time. No account, no sign-up, no database."
      />

      {/* The live booking flow, the centerpiece. */}
      <section className="relative pb-14 sm:pb-20">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="grain rounded-[24px] border border-hairline p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <BookingFlow showHeader />
            </div>
          </Reveal>
          <p className="mt-5 text-center text-sm text-metal">{demoNotice}</p>
        </div>
      </section>

      {/* Availability + concurrency, explained by doing. */}
      <section className="relative border-hairline-top bg-ink-soft py-14 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
                  Availability, shown as it&apos;s really made.
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-3 max-w-md text-paper-dim">
                  Slots come from real hours, breaks and closures, never a guess.
                  The demo below shows the engine thinking out loud.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-6 rounded-3xl border border-hairline bg-ink p-5 sm:p-6">
                  <AvailabilityEngine />
                </div>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
                  Two people, one chair.
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-3 max-w-md text-paper-dim">
                  Watch what happens when two bookings land on the same slot at
                  the same moment. One wins, honestly.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-6 rounded-3xl border border-hairline bg-ink-soft p-5 sm:p-6">
                  <ConcurrencyDemo />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Theming */}
      <section className="relative py-14 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
              Your shop, any look. Same product underneath.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 max-w-xl text-lg text-paper-dim">
              Switch Grooma&apos;s real theme presets below. The booking surface
              you just used restyles instantly, because your customers see your
              shop, not ours.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 rounded-3xl border border-hairline bg-ink-soft p-5 sm:p-8">
              <ThemeSwitcher />
            </div>
          </Reveal>
        </div>
      </section>

      {/* From demo to your shop */}
      <section className="border-hairline-top bg-ink-soft py-14 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
              Like what you see? Put your own shop on it.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-paper-dim">
              One real shop goes live first, yours can be it. The demo runs in
              your browser; a live shop runs on your brand, with your services,
              your people and your hours.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="press inline-flex h-13 items-center gap-2 rounded-full bg-copper px-7 text-base font-semibold text-on-accent hover:bg-copper-bright"
              >
                See pricing
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/about"
                className="press inline-flex h-13 items-center rounded-full border border-hairline-strong px-7 text-base font-medium text-paper hover:border-paper-dim hover:text-paper"
              >
                Talk to the maker
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
