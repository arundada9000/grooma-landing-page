import { BookingFlow } from "@/components/demo/booking-flow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const STEPS = [
  { order: "01", label: "Choose a service" },
  { order: "02", label: "Pick a barber" },
  { order: "03", label: "A real, available time" },
  { order: "04", label: "Done. No account." },
];

/**
 * Section 02, No account. Just book.
 * The guest journey unfolds live: no paragraph to read, the demo walks itself
 * while the numbered steps keep rhythm beside it.
 */
export function GuestJourney() {
  return (
    <Section id="how" number="02" eyebrow="No account. Just book.">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="font-display text-4xl font-black tracking-tight text-paper sm:text-5xl">
              The whole booking, in about ten seconds.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-paper-dim">
              No signup. No app. No calling to ask if there's a slot. A customer
              picks what they want, when they want it, and walks in.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.order} delay={0.1 + i * 0.06}>
                <div className="flex items-center gap-4">
                  <span className="font-grotesk text-sm tracking-widest text-copper-bright">
                    {s.order}
                  </span>
                  <span className="text-paper">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-[13px] text-metal">
              <span className="inline-block size-1.5 rounded-full bg-copper" aria-hidden="true" />
              This demo plays itself. Try the live one at the top.
            </p>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal delay={0.1} y={20}>
            <div className="grain rounded-3xl border border-hairline p-3 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]">
              <BookingFlow auto />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
