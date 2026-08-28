import {
  ProductDashboard,
  ProductOffline,
  ProductQr,
} from "@/components/product/product-screens";
import { Reveal } from "@/components/ui/reveal";

/**
 * The three product surfaces, side by side: the owner's day, the offline
 * booking app, and the counter QR code.
 *
 * Shared by the home page and Features so the interfaces are visible without
 * a click, and so the band is authored once rather than copied per route.
 * These are drawn with the site's own tokens, not screenshots of a live shop,
 * and the caption says so.
 */
export function ProductTour({
  heading,
  blurb,
}: {
  heading?: string;
  blurb?: string;
}) {
  return (
    <section className="relative border-hairline-top bg-ink-soft py-14 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {heading && (
          <div className="mb-10 sm:mb-14">
            <Reveal>
              <h2 className="font-display max-w-3xl text-3xl font-black tracking-tight text-paper sm:text-4xl">
                {heading}
              </h2>
            </Reveal>
            {blurb && (
              <Reveal delay={0.08}>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper-dim">
                  {blurb}
                </p>
              </Reveal>
            )}
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <Reveal>
            <ProductDashboard />
          </Reveal>
          <Reveal delay={0.06} className="lg:mt-8">
            <ProductOffline />
          </Reveal>
          <Reveal delay={0.12}>
            <ProductQr />
          </Reveal>
        </div>

        <p className="mt-8 text-center text-sm text-metal">
          Pixel previews of the interfaces, not screenshots of a live shop.
          Nothing shown here promises real appointments.
        </p>
      </div>
    </section>
  );
}
