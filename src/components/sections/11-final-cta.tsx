import { site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Section 10, The close. One honest invitation. No manufactured urgency,
 * no invented numbers, just "put your shop online."
 */
export function FinalCta() {
  return (
    <Section id="start" number="10" eyebrow="Start with your shop" bleed>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-grotesk text-sm tracking-[0.2em] text-copper-bright uppercase">
            {site.brand.statement}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-black leading-tight tracking-tight text-paper sm:text-6xl">
            Ready to put your shop online?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">
            One real shop goes live first, yours can be it. We&apos;ll set it up
            together, on your brand, with your services and your hours.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/9779811420975?text=Hi%20Grooma%2C%20let%27s%20put%20my%20shop%20online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-copper px-8 text-lg font-semibold text-ink-soft transition-colors hover:bg-copper-bright"
            >
              Start your shop
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={`mailto:${site.contact.email}?subject=Live%20demo%20for%20my%20barbershop`}
              className="inline-flex h-14 items-center rounded-full border border-hairline-strong px-8 text-lg font-medium text-paper transition-colors hover:border-paper-dim"
            >
              Book a live demo
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-8 text-sm text-metal">
            {site.contact.email} · {site.contact.phone} · {site.contact.location}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
