"use client";

/**
 * Segment error boundary, the razor slipped mid-trim.
 * Lighter than global-error since it renders inside the layout.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grain relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-grotesk inline-block rounded-full border border-hairline px-4 py-1.5 text-xs tracking-[0.25em] text-copper-bright uppercase">
        error · razor slipped
      </p>
      <h1 className="mt-8 font-display text-5xl font-black tracking-tight text-paper sm:text-6xl">
        That trim went sideways.
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-paper-dim">
        The page hit a snag before we could finish the fade. Give it another
        pass, the chair is still warm.
      </p>
      <p className="mt-3 text-sm text-metal">
        {error.digest ? `Diagnostics: #${error.digest}` : "No product was harmed in this error."}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex h-13 items-center rounded-full bg-copper px-7 text-base font-semibold text-ink-soft transition-colors hover:bg-copper-bright"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex h-13 items-center rounded-full border border-hairline-strong px-7 text-base font-medium text-paper transition-colors hover:border-paper-dim"
        >
          Back to the shop
        </a>
      </div>
    </main>
  );
}
