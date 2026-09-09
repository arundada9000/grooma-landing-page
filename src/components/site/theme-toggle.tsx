"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";
import type { ThemePreset } from "@/lib/themes";
import { cn } from "@/lib/cn";
import { feedback } from "@/lib/sound";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-.6-.3-1-.7-1.4-.5-.4-.8-.8-.8-1.4 0-1 .8-1.9 2-1.9h1.8A4.7 4.7 0 0 0 21 9.8C21 6 17 3 12 3Z" />
      <circle cx="7.5" cy="11" r="1.1" />
      <circle cx="10" cy="7.5" r="1.1" />
      <circle cx="14.5" cy="7.2" r="1.1" />
    </svg>
  );
}

/**
 * Header theme control: a palette button that opens a preset picker plus a
 * light/dark toggle. Restyles the entire marketing site, persisted to
 * localStorage, exactly like Grooma's product theming engine.
 */
export function ThemeToggle() {
  const { theme, scheme, presets, setTheme, setScheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id: ThemePreset["id"]) => {
    setTheme(id);
    feedback("select", { haptic: true });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Site theme"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          feedback("click");
        }}
        className={cn(
          "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-colors",
          open
            ? "border-copper-bright bg-copper-soft text-copper-bright"
            : "border-hairline-strong text-paper-dim hover:border-paper-dim hover:text-paper",
        )}
      >
        <PaletteIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-64 rounded-2xl border border-hairline-strong bg-ink-soft p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
          {/* scheme toggle */}
          <div
            className="mb-1 grid grid-cols-2 gap-1 rounded-xl border border-hairline p-1"
            role="group"
            aria-label="Colour scheme"
          >
            {(["light", "dark"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setScheme(s);
                  feedback("toggle");
                }}
                aria-pressed={scheme === s}
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  scheme === s
                    ? "bg-copper text-on-accent"
                    : "text-paper-dim hover:text-paper",
                )}
              >
                {s === "light" ? <SunIcon /> : <MoonIcon />}
                <span className="capitalize">{s}</span>
              </button>
            ))}
          </div>

          {/* presets */}
          <p className="px-2 pt-1 pb-1.5 font-grotesk text-[10px] tracking-[0.18em] text-metal uppercase">
            Your shop, your brand
          </p>
          <div className="flex max-h-56 flex-col gap-0.5 overflow-y-auto pr-0.5">
            {presets.map((p) => {
              const active = p.id === theme;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => pick(p.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors",
                    active ? "bg-copper-soft" : "hover:bg-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 rounded-full ring-1 ring-white/15"
                    style={{ backgroundColor: p.siteAccent ?? p.dark.accent }}
                  />
                  <span className="flex-1">
                    <span className={cn("block text-sm leading-tight", active ? "text-paper" : "text-paper-dim")}>
                      {p.name}
                    </span>
                    <span className="block text-[11px] leading-tight text-metal">{p.flavor}</span>
                  </span>
                  {active && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-copper-bright" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
