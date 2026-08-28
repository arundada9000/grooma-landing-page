import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

/**
 * Shared narrative section shell. Each section carries a small number
 * ("01, The haircut") and an eyebrow, reinforcing that the page is told
 * as a story, never as a "features → logos → pricing" template.
 */
export function Section({
  id,
  number,
  eyebrow,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  number?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  /** Full-bleed dark band; content is constrained inside. */
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        // scroll-mt keeps an anchored section clear of the fixed header.
        "relative scroll-mt-20",
        bleed
          ? "border-hairline-top bg-ink-soft py-14 sm:py-28"
          : "py-14 sm:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {(number || eyebrow) && (
          <Reveal className="mb-7 flex items-center gap-4 sm:mb-14">
            {number && (
              <span className="font-grotesk text-sm tracking-[0.2em] text-copper-bright">
                {number}
              </span>
            )}
            {number && eyebrow && <span className="h-px w-8 bg-hairline-strong" aria-hidden="true" />}
            {eyebrow && (
              <span className="font-grotesk text-sm tracking-[0.2em] text-metal uppercase">
                {eyebrow}
              </span>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
