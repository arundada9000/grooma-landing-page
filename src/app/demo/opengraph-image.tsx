import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Try the Grooma booking demo live in your browser";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Page-specific social / search preview. See src/lib/og.tsx for the template. */
export default function Image() {
  return renderOgCard({
    eyebrow: "Interactive demo",
    title: "Book a demo haircut, right now.",
    blurb:
      "The real booking surface, simulated entirely in your browser. No account, no sign-up, no database.",
    points: [
      "Pick a service, barber and time",
      "Watch availability get computed",
      "See two bookings race for a chair",
      "Restyle it with real theme presets",
    ],
  });
}
