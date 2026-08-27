import { AvailabilityEngine } from "@/components/demo/availability-engine";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 03, Availability isn't a guess.
 * The scheduling engine, animated. Constraints become honest slots, and only
 * afterwards the mechanism that keeps them honest.
 */
export function Availability() {
  return (
    <Section id="availability" number="03" eyebrow="Availability isn't a guess">
      <Reveal>
        <h2 className="font-display max-w-3xl text-4xl font-black tracking-tight text-paper sm:text-5xl lg:text-6xl">
          Grooma doesn&apos;t show a slot because it <em className="not-italic text-copper-bright">looks</em> available.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper-dim">
          It calculates whether the appointment can actually happen, around your
          hours, your breaks, your closures, and the chairs that are already full.
        </p>
      </Reveal>

      <div className="mt-16">
        <AvailabilityEngine />
      </div>
    </Section>
  );
}
