import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Grooma for barbershops: built Nepal-first for shop owners";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Page-specific social / search preview. See src/lib/og.tsx for the template. */
export default function Image() {
  return renderOgCard({
    eyebrow: "For barbershops",
    title: "Built for the owner who works the floor.",
    blurb:
      "Booking is the front door of your shop. Grooma keeps the day honest without making you a computer operator.",
    points: [
      "English and Nepali, first-class",
      "Bikram Sambat dates",
      "Works offline on patchy data",
      "Walk-ins and reschedules in a tap",
    ],
  });
}
