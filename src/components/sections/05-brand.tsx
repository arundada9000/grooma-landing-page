import { ThemeSwitcher } from "@/components/demo/theme-switcher";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 05, Your shop. Your brand.
 * The signature statement. One booking surface restyles across Grooma's real
 * theme presets; the product underneath never changes.
 */
export function Brand() {
  return (
    <Section id="brand" number="05" eyebrow="Your shop. Your brand." bleed>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-black tracking-tight text-paper sm:text-5xl">
              The shop is the brand.
              <br />
              <span className="text-copper-bright">Grooma is the plumbing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-paper-dim">
              Grooma doesn&apos;t make every barbershop look like Grooma. Your
              customers see <em className="not-italic text-paper">your</em> shop:
              its name, its colours, its look. Chosen in settings, reflected
              everywhere, with zero deploys.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-metal">
              Below, you&apos;re switching between Grooma&apos;s real theme presets.
              Probably feels familiar, this is the same surface your customers
              book through.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-hairline bg-ink p-5 sm:p-6">
            <ThemeSwitcher />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
