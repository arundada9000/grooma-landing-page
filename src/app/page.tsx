import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/01-hero";
import { GuestJourney } from "@/components/sections/02-guest-journey";
import { Availability } from "@/components/sections/03-availability";
import { OwnerDay } from "@/components/sections/06-owner-day";
import { Engine } from "@/components/sections/09-engine";
import { ProductTour } from "@/components/sections/13-product-tour";
import { PricingSection } from "@/components/sections/10-pricing-section";
import { Faq } from "@/components/sections/12-faq";
import { FinalCta } from "@/components/sections/11-final-cta";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/metadata";

/** One description of this route, read by both the <head> and the JSON-LD. */
const PAGE = {
  title: "Grooma | Barbershop booking & shop management software",
  description:
    "Grooma is barbershop booking software that computes real availability, prevents double-bookings, and keeps your own shop the brand. No account for your customers. Works in English and नेपाली.",
  path: "/",
  keywords: [
    "barbershop booking software",
    "barbershop appointment app",
    "barber booking system Nepal",
    "salon booking software",
    "no double booking software",
    "Nepali barbershop app",
    "barbershop management",
    "guest booking no account",
    "Grooma",
  ],
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function HomePage() {
  return (
    <>
      <StructuredData page={PAGE} withFaq withHowTo />
      <Hero />

      <div id="book" className="scroll-mt-20" aria-hidden="true" />
      <GuestJourney />

      {/* A tight bridge to the deeper stories. */}
      <section className="relative py-6 sm:py-10">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  href: "/features",
                  k: "Features",
                  v: "Availability, no double-bookings, the owner dashboard. See it all.",
                },
                {
                  href: "/for-barbershops",
                  k: "For barbershops",
                  v: "Built Nepal-first: English & नेपाली, Bikram Sambat, offline app.",
                },
                {
                  href: "/demo",
                  k: "Live demo",
                  v: "Book a demo haircut in your browser. No account, no sign-up.",
                },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="press group rounded-2xl border border-hairline bg-ink-soft p-6 transition-colors hover:border-hairline-strong"
                >
                  <p className="font-grotesk text-xs tracking-[0.18em] text-copper-bright uppercase">
                    {c.k}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-paper-dim">
                    {c.v}
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block text-copper-bright transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Availability />
      <OwnerDay />

      <ProductTour
        heading="What the shop actually sees."
        blurb="Three surfaces, drawn as the product: the day at a glance, the app that keeps working offline, and the QR code on the counter."
      />

      <Engine />

      <Photo
        src="/images/barbershop-5.jpg"
        alt="A barber finishing a customer's haircut in a busy shop"
        ratio="21 / 9"
        sizes="(max-width: 1152px) 100vw, 1152px"
        className="mx-auto my-14 w-full max-w-6xl"
      />

      <PricingSection />
      <Faq />
      <FinalCta />
    </>
  );
}
