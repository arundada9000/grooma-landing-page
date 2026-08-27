import { cn } from "@/lib/cn";

/**
 * Product "render" components.
 *
 * These read as the actual product surfaces (the owner's dashboard, the
 * offline-capable app shell) drawn purely with the site's own tokens, not as
 * screenshots or stock mockups. They are clearly labelled as a preview of the
 * interface, consistent with the site's "availability is computed, not
 * promised" framing, and never show invented analytics or counts.
 */

/** Owner's day dashboard preview. */
export function ProductDashboard() {
  const timeline = [
    { t: "09:00", who: "Haircut", note: "Bikash", state: "done" },
    { t: "10:30", who: "Haircut + Beard", note: "Anil", state: "next" },
    { t: "11:15", who: "Beard trim", note: "Walk-in", state: "open" },
    { t: "14:00", who: "Styling", note: "Online", state: "open" },
  ] as const;
  return (
    <div className="rounded-2xl border border-hairline bg-ink-soft p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div>
          <p className="font-grotesk text-[12px] tracking-[0.18em] text-metal uppercase">
            Today's floor
          </p>
          <p className="mt-0.5 font-display text-lg font-bold text-paper">27 Aug 2026</p>
        </div>
        <span className="rounded-full border border-hairline px-3 py-1 text-[12px] text-paper-dim">
          Day view
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {timeline.map((row) => (
          <li
            key={row.t}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3 py-2.5",
              row.state === "next"
                ? "border-copper bg-copper-soft/40"
                : "border-hairline bg-ink",
            )}
          >
            <span className="w-12 shrink-0 font-grotesk text-[13px] text-copper-bright">{row.t}</span>
            <span className="flex-1 text-sm text-paper">{row.who}</span>
            <span className="text-[12px] text-paper-dim">{row.note}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-hairline bg-ink px-3 py-2.5">
        <span className="text-sm text-paper">Walk-in</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-full bg-copper" aria-hidden="true" />
          <span className="text-[12px] text-paper-dim">Next free 14:45</span>
        </span>
      </div>
    </div>
  );
}

/** Offline-capable mobile app shell preview. */
export function ProductOffline() {
  return (
    <div className="rounded-2xl border border-hairline bg-ink-soft p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="font-grotesk text-[12px] tracking-[0.18em] text-metal uppercase">
          Your booking app
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 text-[11px] text-paper-dim">
          <span className="inline-block size-1.5 rounded-full bg-copper" aria-hidden="true" />
          Works offline
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["09:30", "10:00", "11:00", "11:30", "12:00", "14:30"].map((t, i) => (
          <div
            key={t}
            className={cn(
              "flex items-center justify-center rounded-lg border py-3 text-sm",
              i === 3 ? "border-copper bg-copper text-on-accent" : "border-hairline bg-ink text-paper-dim",
            )}
          >
            {t}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-metal">
        Installed to the home screen, bookings still work when the data signal
        drops. English & नेपाली.
      </p>
    </div>
  );
}

/** QR booking code preview. */
export function ProductQr() {
  const cells: boolean[] = [];
  const seed = 7;
  for (let i = 0; i < 49; i++) {
    cells.push((i * 13 + seed * i * i) % 3 !== 0);
  }
  return (
    <div className="rounded-2xl border border-hairline bg-ink-soft p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="font-grotesk text-[12px] tracking-[0.18em] text-metal uppercase">
          Scan to book
        </span>
        <span className="text-[11px] text-paper-dim">QR · EN / नेपाली</span>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="grid grid-cols-7 gap-1 rounded-xl border border-hairline bg-ink p-3" aria-hidden="true">
          {cells.map((c, i) => (
            <span
              key={i}
              className={cn("size-2 rounded-[2px]", c ? "bg-copper" : "bg-ink-soft")}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-[12px] text-metal">
        Printed once, stays on the counter. Guests scan and book in seconds.
      </p>
    </div>
  );
}
