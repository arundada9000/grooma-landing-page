import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Interrupted } from "@/components/sections/07-interrupted";
import { GuestJourney } from "@/components/sections/02-guest-journey";
import { OwnerDay } from "@/components/sections/06-owner-day";
import { Concurrency } from "@/components/sections/04-concurrency";
import { Nepal } from "@/components/sections/08-nepal";
import { Engine } from "@/components/sections/09-engine";
import { FinalCta } from "@/components/sections/11-final-cta";
import { Photo } from "@/components/ui/photo";
import { StructuredData } from "@/components/seo/structured-data";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "For barbershops | Built for shop owners in Nepal",
  description:
    "Grooma for barbershops: a booking page for your customers, a calm dashboard for your day, honest availability, no double-bookings, and an offline app that survives patchy data. Built Nepal-first in English and नेपाली.",
  path: "/for-barbershops",
  keywords: [
    "barbershop booking software for owners",
    "barbershop appointment app Nepal",
    "salon booking for barbers",
    "barbershop management dashboard",
    "Nepali barbershop app",
  ],
});

export default function ForBarbershopsPage() {
  return (
    <>
      <StructuredData crumb={{ label: "For barbershops", path: "/for-barbershops" }} />

      <PageHero
        eyebrow="For barbershops"
        title={
          <>
            Built for the owner who{" "}
            <span className="text-copper-bright">works the floor.</span>
          </>
        }
        blurb="Booking is the front door of your shop, and it should never take you away from a client or a the till. Grooma keeps the day honest without turning you into a computer operator."
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

      <Photo
        src="/images/barbershop-2.jpg"
        alt="A barber trimming a customer's beard in the chair"
        ratio="21 / 9"
        className="mx-auto mb-14 w-full max-w-6xl"
        priority
      />

      <Interrupted />
      <GuestJourney />
      <OwnerDay />
      <Concurrency />

      <Photo
        src="/images/barbershop-4.jpg"
        alt="Barber tools laid out on a counter"
        ratio="21 / 9"
        className="mx-auto my-14 w-full max-w-6xl"
      />

      <Nepal />
      <Engine />
      <FinalCta />
    </>
  );
}
