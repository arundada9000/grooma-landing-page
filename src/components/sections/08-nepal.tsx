import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 08, Built for Nepal.
 * The product behaving like it understands where it's used: the date in both
 * calendars, the language toggle, NPR, the QR. Not a flag-waving montage.
 */
export function Nepal() {
  return (
    <Section id="nepal" number="08" eyebrow="Built for Nepal">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-black tracking-tight text-paper sm:text-5xl">
              A date both markets can read.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-paper-dim">
              For customers who think in Nepali, the date arrives in Bikram
              Sambat. For everyone else, it&apos;s Gregorian. Same appointment,
              shown in the reading it makes sense in.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-8 space-y-3 text-[15px] text-paper">
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                English & नेपाली, every screen, first-class
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                Prices in NPR, in the digits customers expect
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                Works offline, the shop survives patchy data
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Reveal delay={0.1} y={16}>
            <div className="rounded-2xl border border-hairline bg-ink-soft p-5">
              <p className="font-grotesk text-[13px] tracking-[0.2em] text-metal uppercase">
                Your appointment
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 border-b border-hairline pb-4">
                <span className="text-paper">27 Aug 2026</span>
                <span className="font-grotesk text-lg text-copper-bright" lang="ne">
                  ११ भदौ २०८३
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-paper-dim">Service</span>
                <span className="text-paper">Haircut + Beard · 50 min</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-paper-dim">Price</span>
                <span className="text-paper">रू 400</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16} y={16}>
            <div className="rounded-2xl border border-hairline bg-ink-soft p-5">
              <div className="flex items-center justify-between">
                <span className="text-paper">Language</span>
                <div className="flex rounded-full border border-hairline p-0.5">
                  <span className="rounded-full bg-copper px-3 py-1 text-sm text-on-accent">EN</span>
                  <span className="rounded-full px-3 py-1 text-sm text-paper-dim" lang="ne">
                    नेपाली
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-paper-dim">Book from the shop counter</span>
                <span className="inline-flex items-center gap-2 text-sm text-paper-dim">
                  <span aria-hidden="true" className="inline-block">
                    ▦
                  </span>
                  QR code
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
