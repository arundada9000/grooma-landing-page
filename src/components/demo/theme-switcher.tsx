"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { THEME_PRESETS, type ThemePreset, themeCssVars } from "@/lib/themes";
import { cn } from "@/lib/cn";
import { feedback } from "@/lib/sound";
import { BookingFlow } from "./booking-flow";

/**
 * "Your shop. Your brand.", demonstrates the theming engine by restyling ONE
 * booking surface across Grooma's real theme presets. The underlying product
 * never changes; only the shop identity does.
 */
export function ThemeSwitcher() {
  const [current, setCurrent] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [scheme, setScheme] = useState<"light" | "dark">("dark");

  const vars = themeCssVars(current[scheme]);

  const pick = useCallback((p: ThemePreset) => {
    setCurrent(p);
    feedback("select", { haptic: true });
  }, []);
  const flip = useCallback(() => {
    setScheme((s) => (s === "dark" ? "light" : "dark"));
    feedback("toggle");
  }, []);

  return (
    <div>
      {/* Preset switcher, the owner's theme editor in miniature */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {THEME_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pick(p)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors duration-150",
              current.id === p.id
                ? "border-copper-bright bg-copper-soft text-copper-bright"
                : "border-hairline text-paper-dim hover:border-hairline-strong hover:text-paper",
            )}
          >
            {p.name}
          </button>
        ))}
        <span className="mx-1 h-6 w-px bg-hairline" aria-hidden="true" />
        <button
          type="button"
          onClick={flip}
          className="rounded-full border border-hairline px-4 py-2 text-sm text-paper-dim transition-colors duration-150 hover:border-hairline-strong hover:text-paper"
        >
          {scheme === "dark" ? "Dark" : "Light"}
        </button>
      </div>

      <div
        className="grid items-center gap-8 lg:grid-cols-[1fr_420px]"
        style={vars as React.CSSProperties}
      >
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
            {current.name}
          </h3>
          <p className="mt-2 max-w-md text-paper-dim">{current.flavor}</p>
          <ul className="mt-6 space-y-3 text-sm text-paper-dim">
            <li className="flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: current[scheme].accent }}
              />
              Accent · everything interactive
            </li>
            <li className="flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: current[scheme].background }}
              />
              Surface · the booking floor
            </li>
            <li className="flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: current[scheme].card }}
              />
              Card · panels and slots
            </li>
          </ul>
        </div>

        <motion.div
          key={current.id + scheme}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="transition-all duration-300"
        >
          <BookingFlow showHeader />
        </motion.div>
      </div>
    </div>
  );
}
