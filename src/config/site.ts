/**
 * Single source of truth for the whole marketing site.
 *
 * Edit these values to change content, nothing product-critical is
 * hardcoded in components. Real figures (contact, pricing) live here so a
 * deploy can update them without code archaeology.
 *
 * PRICING NOTE: These are suggestions the owner should review before going
 * live. Base prices are stored in NPR (the primary market) and USD (for
 * international customers). Currency conversion uses a small editable FX
 * table; when a real exchange-rate feed is wired up, swap `fxRate` for it.
 */

export const site = {
  /**
   * Canonical base URL for the live site. Change this ONE value to relocate
   * the site, and every absolute URL (canonical, sitemap, robots, OG image,
   * structured data, social/SEO tags) follows automatically.
   */
  url: "https://grooma.vercel.app",
  brand: {
    name: "Grooma",
    tagline: "Your grooming, made simple.",
    statement: "The barber's floor, digitized.",
    domain: "grooma.vercel.app",
  },

  contact: {
    email: "arunneupane0000@gmail.com",
    phone: "+977 9811420975",
    whatsapp: "9779811420975",
    whatsappLink: "https://wa.me/9779811420975",
    location: "Butwal, Lumbini, Nepal",
    timezone: "Asia/Kathmandu (UTC+5:45)",
  },

  social: [
    { label: "GitHub", handle: "@arundada9000", url: "https://github.com/arundada9000" },
    { label: "LinkedIn", handle: "in/arundada9000", url: "https://www.linkedin.com/in/arundada9000" },
    { label: "X", handle: "@arundada9000", url: "https://x.com/arundada9000" },
    { label: "Email", handle: "arunneupane0000@gmail.com", url: "mailto:arunneupane0000@gmail.com" },
  ],

  creator: {
    name: "Arun Neupane",
    role: "CTO & Lead Architect, Sajilo Digital Pvt. Ltd.",
    portfolio: "https://arunneupane.vercel.app",
  },

  nav: [
    { href: "#book", label: "Book" },
    { href: "#availability", label: "Availability" },
    { href: "#brand", label: "Your brand" },
    { href: "#for-owners", label: "For owners" },
    { href: "#nepal", label: "Nepal" },
    { href: "#pricing", label: "Pricing" },
    { href: "#guarantees", label: "Guarantees" },
  ],
};

/**
 * Pricing, the suggested model.
 *
 * Grooma runs one real shop today on infrastructure designed to scale to more.
 * Rather than hide complexity behind tiers nobody asked for, pricing is a
 * single transparent plan per shop. A "Book a live demo" path stays in front
 * of commitment, because onboarding one real shop is worth more than a
 * self-serve signup from a stranger.
 *
 * Amounts below are editable suggestions.
 */
export type CurrencyCode = "NPR" | "USD";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** NPR base, per place value. */
  npr: number;
  /** USD base. */
  usd: number;
}

export interface PricePoint {
  id: string;
  name: string;
  vibe: string;
  description: string;
  /** What the customer gets, concrete, not "transformative". */
  includes: string[];
  /** Base prices per currency. */
  base: Record<CurrencyCode, number>;
  /** Billing note shown next to the price (annual discount etc.). */
  billing: string;
  /** Optional one-time-pay price (you buy the software once). */
  buyout?: Record<CurrencyCode, number>;
  /** Note that domain/deployment are not included in either option. */
  buyoutNote?: string;
  cta: string;
  featured?: boolean;
}

/** Editable FX, controls how any third currency converts from USD/NPR. */
export const fx = {
  usdPerNpr: 1 / 135.0, // ~NPR 135 = 1 USD (edit as rates move)
  currencies: [
    { code: "NPR", symbol: "रू", name: "Nepalese Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "INR", symbol: "₹", name: "Indian Rupee", usd: 0.012 },
    { code: "GBP", symbol: "£", name: "British Pound", usd: 1.31 },
    { code: "EUR", symbol: "€", name: "Euro", usd: 1.12 },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", usd: 0.27 },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", usd: 0.68 },
  ] as Array<{ code: string; symbol: string; name: string; usd: number }>,
};

export const pricing: {
  note: string;
  plans: PricePoint[];
} = {
  note:
    "One transparent plan per shop. No per-booking fees, no forced contracts. Prices shown in your currency, the same amount, wherever you are.",
  plans: [
    {
      id: "shop",
      name: "One shop",
      vibe: "Everything a single barbershop needs",
      description:
        "Your own booking site, the availability engine, and the full owner dashboard, for one shop.",
      includes: [
        "Booking site on your own brand",
        "Real computed availability, no double-booking",
        "Services, barbers, schedules & breaks",
        "Owner dashboard: the day, appointments, walk-ins",
        "Guest booking, no accounts for customers",
        "QR booking code",
        "English & नेपाली, Bikram Sambat dates",
        "Email + push reminders",
        "Works offline (PWA)",
      ],
      base: { NPR: 2999, USD: 22 },
      billing: "per shop / month",
      buyout: { NPR: 15000, USD: 110 },
      buyoutNote: "Domain and deployment are not included in either option.",
      cta: "Start your shop",
      featured: true,
    },
  ],
};

export const demoNotice =
  "Interactive demo, no real shop, no database. Simulated locally in your browser.";
