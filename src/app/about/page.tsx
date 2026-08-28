import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Faq } from "@/components/sections/12-faq";
import { FinalCta } from "@/components/sections/11-final-cta";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

/** One description of this route, read by both the <head> and the JSON-LD. */
const PAGE = {
  title: "About | Who makes Grooma & how to go live",
  description:
    "Grooma is built Nepal-first by Arun Neupane in Butwal, Lumbini. One real barbershop goes live at a time, onboarded personally. The shop is the brand; Grooma is the plumbing.",
  path: "/about",
  keywords: [
    "about Grooma",
    "Grooma barbershop software maker",
    "barbershop booking software Nepal",
    "Sajilo Digital barbershop",
    "who makes Grooma",
  ],
  crumb: "About",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function AboutPage() {
  return (
    <>
      <StructuredData page={PAGE} withFaq />

      <PageHero
        eyebrow="About"
        title={
          <>
            Software built for one real shop.
            <br />
            <span className="text-copper-bright">Then the next.</span>
          </>
        }
        blurb="Grooma isn't a faceless SaaS. It's built in Nepal, for the barbershop down the road, one careful go-live at a time. No fake metrics, no invented numbers, just a product that keeps its word."
      />

      {/* The story */}
      <section className="relative pb-14 sm:pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <Photo
            src="/images/barbershop-4.jpg"
            alt="A barber shaping a customer's haircut"
            ratio="3 / 4"
            priority
          />
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
                The barber&apos;s floor, digitized.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-paper-dim">
                Grooma started from a simple observation: a barbershop&apos;s
                schedule lives in one person&apos;s head, and the moment that
                person is busy, booking is a phone call and a hope. So the
                product was built to make availability honest, keep the shop the
                brand, and never get in the way of a haircut.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-paper-dim">
                It is built Nepal-first: English and नेपाली, Bikram Sambat dates,
                prices in NPR, and an app that keeps working on patchy data. The
                default language is the one the customer really thinks in.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The maker + how we work */}
      <section className="border-hairline-top bg-ink-soft py-14 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="font-grotesk text-sm tracking-[0.2em] text-copper-bright uppercase">
                  The maker
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
                  {site.creator.name}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-paper-dim">
                  {site.creator.role}, building products out of {site.contact.location}.
                  Grooma is hand-built and personally onboarded, one shop at a
                  time, so every go-live works before anyone is asked to pay.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-6 flex flex-wrap gap-4">
                  {site.social.slice(0, 3).map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-paper-dim underline underline-offset-4 transition-colors hover:text-paper"
                    >
                      {s.label} · <span className="text-metal">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="space-y-4">
              {[
                {
                  k: "One shop at a time",
                  v: "Each go-live is individual, not a self-serve funnel. A real shop is set up properly before a stranger signs up on their own.",
                },
                {
                  k: "The shop is the brand",
                  v: "Customers see your name, your colours, your look. Grooma is the plumbing underneath, deliberately invisible.",
                },
                {
                  k: "Honest by default",
                  v: "Availability is computed from your real hours and bookings, never presented as a guess. The product refuses to lie to a customer.",
                },
              ].map((row, i) => (
                <Reveal key={row.k} delay={i * 0.06}>
                  <div className="rounded-xl border border-hairline bg-ink p-5">
                    <h3 className="font-display text-lg font-bold text-paper">{row.k}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-paper-dim">{row.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative py-14 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                k: "Email",
                v: site.contact.email,
                href: `mailto:${site.contact.email}?subject=Grooma%20for%20my%20barbershop`,
              },
              {
                k: "WhatsApp",
                v: site.contact.phone,
                href: site.contact.whatsappLink,
              },
              {
                k: "Based in",
                v: `${site.contact.location} · ${site.contact.timezone}`,
                href: undefined,
              },
            ].map((c) => (
              <Reveal key={c.k}>
                <div className="rounded-2xl border border-hairline bg-ink-soft p-6">
                  <p className="font-grotesk text-xs tracking-[0.2em] text-metal uppercase">
                    {c.k}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-2 block break-words text-lg font-semibold text-copper-bright transition-colors hover:text-copper"
                    >
                      {c.v}
                    </a>
                  ) : (
                    <p className="mt-2 text-lg text-paper">{c.v}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/demo"
              className="press inline-flex h-13 items-center gap-2 rounded-full bg-copper px-7 text-base font-semibold text-on-accent hover:bg-copper-bright"
            >
              Try the demo first
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </>
  );
}
