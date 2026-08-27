import Link from "next/link";
import { site } from "@/config/site";

/**
 * Footer, the "buy / contact" anchor.
 * Everything here is driven by src/config/site.ts so a real value can be
 * changed in one place without touching this markup.
 */
export function Footer() {
  return (
    <footer className="border-hairline-top bg-ink">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-5 w-5 rounded-sm"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, var(--color-copper) 0 5px, var(--color-ink-soft) 5px 10px)",
                }}
                aria-hidden="true"
              />
              <span className="font-display text-lg font-bold tracking-tight text-paper">
                {site.brand.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-paper-dim">
              {site.brand.tagline}. {site.brand.statement}.
            </p>
            <p className="mt-4 text-sm text-metal">
              Made by{" "}
              <a
                href={site.creator.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-paper"
              >
                {site.creator.name}
              </a>
              , {site.creator.role}.
            </p>
          </div>

          {/* Site */}
          <div>
            <p className="font-grotesk text-xs tracking-[0.2em] text-metal uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-3 text-paper-dim">
              {[
                { href: "/", label: "Home" },
                { href: "/features", label: "Features" },
                { href: "/demo", label: "Demo" },
                { href: "/pricing", label: "Pricing" },
                { href: "/for-barbershops", label: "For barbershops" },
                { href: "/about", label: "About" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buy / contact */}
          <div>
            <p className="font-grotesk text-xs tracking-[0.2em] text-metal uppercase">
              Buy Grooma
            </p>
            <ul className="mt-4 space-y-3 text-paper-dim">
              <li>
                <a
                  href={`mailto:${site.contact.email}?subject=Buying%20Grooma%20for%20my%20barbershop`}
                  className="transition-colors hover:text-paper"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                >
                  WhatsApp · {site.contact.phone}
                </a>
              </li>
              <li className="text-metal">{site.contact.location}</li>
              <li className="text-metal">{site.contact.timezone}</li>
            </ul>
          </div>

          {/* Extras */}
          <div>
            <p className="font-grotesk text-xs tracking-[0.2em] text-metal uppercase">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper-dim transition-colors hover:text-paper"
                  >
                    {s.label} · <span className="text-metal">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 text-sm text-metal sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.brand.name}. The shop is the brand. Grooma is the plumbing.</p>
          <p className="font-grotesk text-[13px]">
            {site.contact.timezone}
          </p>
        </div>
      </div>
    </footer>
  );
}
