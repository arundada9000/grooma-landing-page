"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
                "flex min-h-12 cursor-pointer flex-col items-center justify-center gap-1 px-2 text-[11px] font-medium transition-colors",
                active ? "text-copper-bright" : "text-paper-dim hover:text-paper",
              )}
            >
              {icons[it.icon]}
              {it.label}
            </Link>
          );
        })}
        <Link
          href="/about"
          onClick={() => feedback("click")}
          className="flex min-h-12 cursor-pointer items-center justify-center gap-1.5 px-4 text-xs font-semibold text-on-accent"
          style={{ background: "var(--color-copper)" }}
        >
          {icons.start}
          Start
        </Link>
      </div>
    </nav>
  );
}
