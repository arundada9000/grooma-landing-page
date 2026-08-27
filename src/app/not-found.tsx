import Link from "next/link";

/**
 * 404, the page that walked out mid-haircut.
 * Satirical on-brand copy: this is a page that left without being booked.
 */
export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--color-ink) 86%, var(--color-accent)) 0%, var(--color-ink) 62%)",
        }}
      />
      <div className="relative">
        <p
          className="font-grotesk mx-auto inline-block rounded-full border border-hairline px-4 py-1.5 text-xs tracking-[0.25em] text-copper-bright uppercase"
        >
          404 · no-show
        </p>
        <h1 className="mt-8 font-display text-6xl font-black tracking-tight text-paper sm:text-7xl">
          This chair is empty.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-paper-dim">
          The page you wanted never showed up for its appointment. It might&apos;ve
          been rescheduled, cancelled, or it just walked out without telling the
          front desk.
        </p>
        <p className="mt-3 text-sm text-metal">
          We&apos;d say &ldquo;we&apos;ll book it again&rdquo;, but some things
          aren&apos;t meant to be.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-13 items-center gap-2 rounded-full bg-copper px-7 text-base font-semibold text-on-accent transition-colors hover:bg-copper-bright"
          >
            Book the front page → Back to Grooma
          </Link>
          <Link
            href="/"
            className="inline-flex h-13 items-center rounded-full border border-hairline-strong px-7 text-base font-medium text-paper transition-colors hover:border-paper-dim"
          >
            Find a real appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
