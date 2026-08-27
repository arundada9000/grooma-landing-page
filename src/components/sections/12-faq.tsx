import { seo } from "@/config/seo";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * FAQ / AEO block. Direct, quotable answers that search engines and AI
 * assistants can lift into featured snippets. Pairs one-to-one with the
 * FAQPage JSON-LD so humans and crawlers read the same facts.
 */
export function Faq() {
  return (
    <Section id="faq" number="FAQ" eyebrow="Straight answers">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
              Questions worth asking before you book us.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-lg leading-relaxed text-paper-dim">
              Short answers, no fine print hidden behind a support ticket. If
              something&apos;s not here, ask directly.
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-hairline border-y border-hairline">
          {seo.faqs.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 text-[17px] font-semibold text-paper marker:content-none">
                {f.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-grotesk text-copper-bright transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-paper-dim">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
