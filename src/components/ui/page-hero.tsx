import { Reveal } from "./reveal";

/**
 * Shared header for interior pages (Features, Pricing, For barbershops,
 * About). Gives each route a distinct, keyword-anchored intro: eyebrow, a
 * single strong headline, and a short paragraph. Content is supplied per page
 * so every page reads as its own story rather than a template.
 */
export function PageHero({
  eyebrow,
  title,
  blurb,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  blurb?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--color-ink) 86%, var(--color-accent)) 0%, var(--color-ink) 62%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-14 sm:px-8 sm:pt-40 sm:pb-20">
        <Reveal>
          <p className="font-grotesk mb-5 flex items-center gap-3 text-sm tracking-[0.22em] text-copper-bright uppercase">
            <span className="inline-block h-px w-8 bg-copper" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {blurb && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-dim">{blurb}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
