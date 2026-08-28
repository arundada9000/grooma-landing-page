import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "About Grooma: built in Butwal, Nepal, one shop at a time";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Page-specific social / search preview. See src/lib/og.tsx for the template. */
export default function Image() {
  return renderOgCard({
    eyebrow: "About",
    title: "Software built for one real shop. Then the next.",
    blurb:
      "Built in Butwal, Lumbini by Arun Neupane. Every go-live is set up personally before anyone is asked to pay.",
    points: [
      "One shop at a time",
      "The shop is the brand",
      "Honest by default",
      "Made in Nepal",
    ],
  });
}
