"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { feedback } from "@/lib/sound";

/**
 * Mobile bottom nav. A slim, sticky bar with the things a phone visitor
 * actually reaches for: try the demo, features, pricing, then a clear way to
 * talk after seeing the product. Page-aware highlighting, SVG icons only (no
 * emoji), 48px touch targets, safe-area safe.
 */

const icons = {
  home: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </svg>
  ),
  features: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  pricing: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M11 7.5a1.7 1.7 0 0 1 2 1.7 1.8 1.8 0 0 1-2 2 1.8 1.8 0 0 1-2 2 1.7 1.7 0 0 1 2 1.7" />
      <path d="M12 6v12" />
    </svg>
  ),
  start: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

const ITEMS = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/features", label: "Features", icon: "features" as const },
  { href: "/pricing", label: "Pricing", icon: "pricing" as const },
];

export function MobileNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-ink/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-[1fr_1fr_1fr_auto]">
        {ITEMS.map((it) => {
          const active = pathname === it.href.split("#")[0];
          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => feedback("click")}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex min-h-12 cursor-pointer touch-manipulation flex-col items-center justify-center gap-1 px-2 text-[11px] font-medium transition-colors duration-200",
                active ? "text-copper-bright" : "text-paper-dim hover:text-paper",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="mobile-nav-active"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 32 }
                  }
                  className="absolute inset-1.5 -z-10 rounded-2xl border border-copper/40 bg-copper-soft"
                />
              ) : null}
              <span
                className={cn(
                  "transition-transform duration-200",
                  active ? "-translate-y-0.5 scale-110" : "group-hover:scale-105",
                )}
              >
                {icons[it.icon]}
              </span>
              {it.label}
            </Link>
          );
        })}
        <Link
          href="/about"
          onClick={() => feedback("click")}
          className="flex min-h-12 cursor-pointer touch-manipulation items-center justify-center gap-1.5 px-4 text-xs font-semibold text-on-accent transition-opacity duration-200 active:opacity-85"
          style={{ background: "var(--color-copper)" }}
        >
          {icons.start}
          Start
        </Link>
      </div>
    </nav>
  );
}
