import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 09, What Grooma guarantees.
 *
 * Sold as promises the shop owner can trust, not as engineering internals.
 * No schema talk, no "multi-tenant" language, nothing that reads as selling
 * code. These are the outcomes the product stands behind.
 */

const GUARDS = [
  {
    label: "No double-bookings",
    title: "A chair can never be booked twice",
    body: "Two people can't get the same chair at the same time, even when bookings arrive at the same moment. It's a guarantee, not a hope.",
    mark: "01",
  },
  {
    label: "Honest availability",
    title: "What customers see is what's real",
    body: "Slots come from your hours, your breaks, your closures and who's already booked. If it's shown, it's open.",
    mark: "02",
  },
  {
    label: "Private by design",
    title: "Your shop's data is yours alone",
    body: "Your appointments, your customers, your schedule. Kept private, and never shared or resold.",
    mark: "03",
  },
  {
    label: "Works everywhere",
    title: "Runs on patchy data, stays available",
    body: "An installable mobile app that keeps working offline, plus reminders by email and push. The shop never stops taking bookings.",
    mark: "04",
  },
];

export function Engine() {
  return (
    <Section id="guarantees" number="09" eyebrow="What Grooma guarantees">
      <Reveal>
        <h2 className="font-display max-w-3xl text-4xl font-black tracking-tight text-paper sm:text-5xl">
          Promises we can back up.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper-dim">
          Not marketing fluff. These are the things Grooma is built around, so
          you never have to wonder if a booking is real.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
        {GUARDS.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06}>
            <div className="flex h-full flex-col bg-ink-soft p-7">
              <div className="flex items-center justify-between">
                <span className="font-grotesk text-xs tracking-[0.2em] text-copper-bright uppercase">
                  {g.label}
                </span>
                <span className="font-display text-2xl font-black text-hairline-strong">
                  {g.mark}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-paper">
                {g.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-paper-dim">{g.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
