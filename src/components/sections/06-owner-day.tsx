import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 06, The owner's day.
 * Shown as moments, not a feature grid. Each moment is a small, purposeful
 * UI behaviour the owner actually lands in, never a dashboard screenshot.
 */

const MOMENTS = [
  {
    when: "Before opening",
    title: "Today, at a glance",
    body: "Who's booked, what's free, what needs your eye, before the first client sits down.",
    chip: ["09:00  Haircut, Suman", "10:00  Beard, Prakash", "11:30  Combo, Rahul"],
  },
  {
    when: "During the day",
    title: "Add a walk-in, change a schedule",
    body: "Someone walks in off the street. You enter them and the day stays honest.",
    chip: ["Walk-in  + Add", "Next free: 14:45"],
  },
  {
    when: "Between customers",
    title: "The calendar is never far",
    body: "Open, move, reschedule. The floor changes; the ledger keeps up.",
    chip: ["Week view", "Day timeline", "List"],
  },
  {
    when: "At the till",
    title: "The QR booking code",
    body: "Printed once, stays on the counter. Scans in whatever language the phone speaks.",
    chip: ["Scan to book", "QR  •  opens in EN or नेपाली"],
  },
  {
    when: "After a booking",
    title: "A reminder, once",
    body: "One push or one email ahead of the appointment. Not a flood, a single nudge.",
    chip: ["Reminder  +1 day before", "Sent once"],
  },
];

export function OwnerDay() {
  return (
    <Section id="for-owners" number="06" eyebrow="The owner's day">
      <Reveal>
        <h2 className="font-display max-w-3xl text-4xl font-black tracking-tight text-paper sm:text-5xl">
          A dashboard that runs the floor, not a wall of widgets.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper-dim">
          Every tool is where the owner actually reaches for it, between clients,
          one-handed, often standing.
        </p>
      </Reveal>

      <div className="mt-14">
        {MOMENTS.map((m, i) => (
          <Reveal key={m.when} delay={i * 0.05}>
            <div className="group grid gap-4 border-b border-hairline py-8 sm:grid-cols-[200px_1fr]">
              <div>
                <span className="font-grotesk text-sm tracking-[0.18em] text-copper-bright uppercase">
                  {m.when}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-paper">
                  {m.title}
                </h3>
                <p className="mt-1.5 max-w-lg text-paper-dim">{m.body}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {m.chip.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-hairline bg-ink-soft px-3 py-1.5 font-grotesk text-[13px] text-paper-dim"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
