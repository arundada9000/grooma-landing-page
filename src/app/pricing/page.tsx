import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { PricingSection } from "@/components/sections/10-pricing-section";
import { Faq } from "@/components/sections/12-faq";
import { FinalCta } from "@/components/sections/11-final-cta";
import { Photo } from "@/components/ui/photo";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/metadata";
import { pricing } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing | One transparent plan per shop",
  description:
    "Grooma costs one transparent plan per barbershop, shown in your currency. No per-booking fees, no forced contracts. See exactly what's included and how to go live.",
  path: "/pricing",
  keywords: [
    "barbershop booking software cost",
    "barbershop booking software price",
    "salon booking software pricing",
    "barbershop software per month",
  ],
});

const INCLUDED = (pricing.plans[0]?.includes ?? []).filter(Boolean);

export default function PricingPage() {
  return (
    <>
      <StructuredData crumb={{ label: "Pricing", path: "/pricing" }} withFaq />

      <PageHero
        eyebrow="Pricing"
        title={
          <>
            One price.{" "}
            <span className="text-copper-bright">Shown in your currency.</span>
          </>
        }
        blurb={pricing.note}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/demo"
            className="press inline-flex h-12 items-center gap-2 rounded-full bg-copper px-6 text-base font-semibold text-on-accent hover:bg-copper-bright"
          >
            Try the demo
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/features"
            className="press inline-flex h-12 items-center rounded-full border border-hairline-strong px-6 text-base font-medium text-paper hover:border-paper-dim hover:text-paper"
          >
            What you get
          </Link>
        </div>
      </PageHero>

      <PricingSection />

      {/* What's included */}
      <section className="border-hairline-top bg-ink-soft py-14 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight text-paper sm:text-4xl">
                Everything a single barbershop needs, in one plan.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-paper-dim">
                No tiers, no seat licenses, no feature paywalls. One plan covers
                the whole shop. If something is missing, you ask us directly.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-hairline bg-ink px-4 py-3 text-[15px] text-paper"
                >
                  <span className="mt-0.5 text-copper-bright" aria-hidden="true">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq />

      <Photo
        src="/images/barbershop-1.jpg"
        alt="A barber at work in a busy barbershop"
        ratio="21 / 9"
        className="mx-auto my-14 w-full max-w-6xl"
        priority={false}
      />

      <FinalCta />
    </>
  );
}
