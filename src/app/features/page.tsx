import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Availability } from "@/components/sections/03-availability";
import { Concurrency } from "@/components/sections/04-concurrency";
import { Brand } from "@/components/sections/05-brand";
import { OwnerDay } from "@/components/sections/06-owner-day";
import { Engine } from "@/components/sections/09-engine";
import { FinalCta } from "@/components/sections/11-final-cta";
import {
  ProductDashboard,
  ProductOffline,
  ProductQr,
} from "@/components/product/product-screens";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
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
});

export default function FeaturesPage() {
  return (
    <>
      <StructuredData crumb={{ label: "Features", path: "/features" }} />
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
            className="press inline-flex h-12 items-center gap-2 rounded-full bg-copper px-6 text-base font-semibold text-ink-soft hover:bg-copper-bright"
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
      <section className="relative border-hairline-top bg-ink-soft py-14 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid items-start gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <ProductDashboard />
            </div>
            <div className="space-y-4 lg:mt-8">
              <ProductOffline />
            </div>
            <div className="space-y-4">
              <ProductQr />
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-metal">
            Pixel previews of the interfaces, not screenshots of a live shop.
            Nothing shown here promises real appointments.
          </p>
        </div>
      </section>

      <OwnerDay />
      <Brand />
      <Engine />
      <FinalCta />
    </>
  );
}
