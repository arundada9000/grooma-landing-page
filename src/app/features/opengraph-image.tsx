import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Grooma features: computed availability, no double-bookings, owner dashboard";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Page-specific social / search preview. See src/lib/og.tsx for the template. */
export default function Image() {
  return renderOgCard({
    eyebrow: "Features",
    title: "Software that treats your floor like a real place.",
    blurb:
      "Computed availability, no double-bookings, no customer accounts, and a dashboard that runs the day.",
    points: [
      "Honest, computed availability",
      "No double-bookings, ever",
      "Owner dashboard for the day",
      "Your own brand, front to back",
    ],
  });
}
