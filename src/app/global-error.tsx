"use client";

/**
 * Global error boundary, the barber who dropped the clippers.
 * On-brand, funny, and with a working retry that actually reloads.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-ink text-paper">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="font-grotesk inline-block rounded-full border border-hairline px-4 py-1.5 text-xs tracking-[0.25em] text-copper-bright uppercase">
            error · clippers dropped
          </p>
          <h1 className="mt-8 font-display text-5xl font-black tracking-tight text-paper sm:text-6xl">
            Something got nicked.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-paper-dim">
            We&apos;re reaching for a fresh blade. The page caught an unexpected slip
           , here&apos;s the best part: you can help by giving it one more try.
          </p>
          <p className="mt-3 text-sm text-metal">
            {error.digest ? `Diagnostics: #${error.digest}` : "No trim required to retry."}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex h-13 items-center rounded-full bg-copper px-7 text-base font-semibold text-on-accent transition-colors hover:bg-copper-bright"
            >
              Try that again
            </button>
            <a
              href="/"
              className="inline-flex h-13 items-center rounded-full border border-hairline-strong px-7 text-base font-medium text-paper transition-colors hover:border-paper-dim"
            >
              Back to the shop
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
