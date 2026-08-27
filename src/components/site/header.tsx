"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { feedback } from "@/lib/sound";
import { ThemeToggle } from "./theme-toggle";

export const NAV_PAGES = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/for-barbershops", label: "For barbershops" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink/85 backdrop-blur-md" : "bg-transparent",
      )}
      style={{
        borderBottom: scrolled ? "1px solid var(--color-hairline)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => feedback("click")}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-paper"
        >
          <span
            className="inline-block h-5 w-5 rounded-sm"
            style={{
              background:
                "repeating-linear-gradient(135deg, var(--color-copper) 0 5px, var(--color-ink-soft) 5px 10px)",
            }}
            aria-hidden="true"
          />
          Grooma
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_PAGES.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => feedback("click")}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors",
                  active ? "text-paper" : "text-paper-dim hover:text-paper",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/about"
            onClick={() => feedback("click")}
            className="hidden rounded-full border border-copper text-copper-bright px-4 py-2 text-sm font-medium transition-colors hover:bg-copper-soft sm:inline-flex"
          >
            Start your shop
          </Link>
          <Link
            href="/demo"
            onClick={() => feedback("click")}
            className="rounded-full border border-copper bg-copper text-sm font-medium text-on-accent px-4 py-2 transition-opacity hover:opacity-90"
          >
            Try the demo
          </Link>
        </div>
      </div>
    </header>
  );
}
