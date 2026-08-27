import { pricing } from "@/config/site";
import { Pricing } from "./10-pricing";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Pricing, wrapped in the shared narrative section shell.
 */
export function PricingSection() {
  return (
    <Section id="pricing" number="10" eyebrow="Pricing">
      <Reveal>
        <h2 className="font-display max-w-3xl text-4xl font-black tracking-tight text-paper sm:text-5xl">
          One price, shown in your currency.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper-dim">
          {pricing.note}
        </p>
      </Reveal>

      <div className="mt-14">
        <Pricing />
      </div>
    </Section>
  );
}
