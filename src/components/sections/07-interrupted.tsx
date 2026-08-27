import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 07, Built for interrupted humans.
 * A scene, not a feature announcement. The philosophy behind guest-first
 * booking, told as the moment it exists for.
 */
export function Interrupted() {
  return (
    <Section number="07" eyebrow="Built for interrupted humans" bleed>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-grotesk text-sm tracking-[0.2em] text-metal uppercase">
            Meet the customer
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-3xl font-black leading-tight tracking-tight text-paper sm:text-5xl">
            You&apos;re outside the shop.
            <br />
            One hand is holding your phone.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">
            You don&apos;t want to make an account. You don&apos;t want to download
            an app. You don&apos;t want to call and ask if there&apos;s a free chair.
            You just want a haircut.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-copper/40 bg-ink-soft p-6">
            <p className="font-display text-2xl font-bold tracking-tight text-paper">
              Two minutes. One hand.
              <br />
              No account.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="rounded-full border border-hairline px-4 py-1.5 text-sm text-paper-dim">
                Service
              </span>
              <span className="rounded-full border border-hairline px-4 py-1.5 text-sm text-paper-dim">
                Time
              </span>
              <span className="rounded-full bg-copper px-4 py-1.5 text-sm text-ink-soft">
                Booked
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mx-auto mt-10 max-w-md text-paper-dim">
            That&apos;s it. Booking has no business getting in your way, it&apos;s
            the one step between "I need a haircut" and walking in.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
