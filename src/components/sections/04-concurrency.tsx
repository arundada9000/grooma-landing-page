import { ConcurrencyDemo } from "@/components/demo/concurrency-demo";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 04, Two people, same chair.
 * A race, told plainly. No shield icon, no "race-proof" boast, just one
 * accepted booking, and everyone told the truth.
 */
export function Concurrency() {
  return (
    <Section id="integrity" number="04" eyebrow="The final word is always the shop's">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-black tracking-tight text-paper sm:text-5xl">
              Two people, same chair. Same moment.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-paper-dim">
              Bookings race in all the time. Grooma never leaves it to chance,
              and never leaves anyone guessing: the slot is settled the moment
              it&apos;s booked, and the outcome is honest for whoever loses.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="mt-8 space-y-3 text-[15px] text-paper">
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                The slot is confirmed the instant it&apos;s taken, not later.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                Two customers can never be told the same time is theirs.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                The person who misses out is told plainly, and offered the next real slot.
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-hairline bg-ink-soft p-6 sm:p-8">
            <ConcurrencyDemo />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
