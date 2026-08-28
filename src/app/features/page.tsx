import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Availability } from "@/components/sections/03-availability";
import { Concurrency } from "@/components/sections/04-concurrency";
import { Brand } from "@/components/sections/05-brand";
import { OwnerDay } from "@/components/sections/06-owner-day";
import { Engine } from "@/components/sections/09-engine";
import { FinalCta } from "@/components/sections/11-final-cta";
import { ProductTour } from "@/components/sections/13-product-tour";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/metadata";

/** One description of this route, read by both the <head> and the JSON-LD. */
const PAGE = {
  title: "Features | Booking, availability & owner dashboard",
  description:
    "Grooma's features: computed availability that never shows a fake slot, no double-bookings, an owner dashboard that runs the floor, your own brand, and an offline-capable app. Works in English and नेपाली.",
  path: "/features",
  keywords: [
    "barbershop booking features",
    "no double booking software",
    "barbershop owner dashboard",
    "barbershop availability engine",
    "salon booking software features",
  ],
  crumb: "Features",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function FeaturesPage() {
  return (
    <>
      <StructuredData page={PAGE} />
      <PageHero
        eyebrow="Features"
        title={
          <>
            Software that treats your floor like{" "}
            <span className="text-copper-bright">a real place.</span>
          </>
        }
        blurb="No fake slots, no double-bookings, no accounts. Grooma handles the shed, the schedule and the walk-ins, so the shop keeps being the shop."
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
            href="/pricing"
            className="press inline-flex h-12 items-center rounded-full border border-hairline-strong px-6 text-base font-medium text-paper hover:border-paper-dim hover:text-paper"
          >
            See pricing
          </Link>
        </div>
      </PageHero>

      <Availability />
      <Concurrency />

      {/* Product surfaces, drawn as the product, not as mockups. */}
      <ProductTour
        heading="The surfaces you actually work in."
        blurb="The owner's day, the booking app that survives a dead signal, and the code that lives on the counter."
      />

      <OwnerDay />
      <Brand />
      <Engine />
      <FinalCta />
    </>
  );
}
