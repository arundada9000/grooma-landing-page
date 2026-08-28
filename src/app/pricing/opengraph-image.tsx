import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Grooma pricing: one transparent plan per barbershop";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Page-specific social / search preview. See src/lib/og.tsx for the template. */
export default function Image() {
  return renderOgCard({
    eyebrow: "Pricing",
    title: "One price. Shown in your currency.",
    blurb:
      "One transparent plan per shop. No per-booking fees, no forced contracts, no feature paywalls.",
    points: [
      "NPR 2,999 per shop / month",
      "Or NPR 15,000 once, pay outright",
      "Every feature in one plan",
      "No per-booking commission",
    ],
  });
}
