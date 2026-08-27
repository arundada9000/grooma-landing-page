import { site } from "./site";

/**
 * SEO / AEO / GEO content.
 *
 * Everything search engines and answer engines (AI assistants, featured
 * snippets, rich results) read comes from here. Structured data is generated
 * in the pages from this config so there is one source of truth for every
 * productive fact about Grooma.
 *
 * All facts here are true and verifiable. No invented metrics, ratings,
 * review counts, or customer counts are put in machine-readable markup.
 */

export const seo = {
  /** Primary keyword-anchored title / description (classic SEO). */
  title: "Grooma | Barbershop booking & shop management software",
  description:
    "Grooma is barbershop booking software that computes real availability, prevents double-bookings, and keeps your own shop the brand. No account for your customers. Works in English and नेपाली.",

  /** Entity facts (used by GEO / answer engines + structured data). */
  entity: {
    name: "Grooma",
    type: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    softwareVersion: "1.0",
    inLanguage: ["en", "ne"],
    priceCurrency: ["NPR", "USD"],
    slogan: site.brand.statement,
    description:
      "Barbershop booking and shop management software. Availability is computed from your hours, breaks, closures and appointments; it is never shown as a guess. Customers book as guests, without an account. Works offline as a PWA, in English and Nepali.",
    features: [
      "No double-bookings, guaranteed",
      "Honest availability from your real hours, breaks and closures",
      "Guest booking with no customer accounts",
      "Your own booking page on your own brand",
      "Services, barbers, schedules and breaks",
      "Owner dashboard: the day, appointments, walk-ins",
      "QR booking code",
      "English and नेपाली with Bikram Sambat dates",
      "Email and push reminders",
      "Offline-capable app for patchy data",
    ],
  },

  /** Owner / maker entity. */
  provider: {
    name: site.creator.name,
    type: "Organization",
    url: site.creator.portfolio,
    email: site.contact.email,
    phone: site.contact.phone,
    areaServed: "Nepal",
    location: site.contact.location,
    foundingDate: "2024",
  },

  /** Yielded rich results via FAQPage schema (AEO). */
  faqs: [
    {
      question: "What is Grooma?",
      answer:
        "Grooma is booking and shop-management software for barbershops. It gives customers a booking page while the owner keeps full control of services, barbers, hours and breaks. Everything is guest-friendly: customers never need an account.",
    },
    {
      question: "How much does Grooma cost?",
      answer:
        "One transparent plan per shop. There are no per-booking fees and no forced contracts. Contact the maker directly to go live: arunneupane0000@gmail.com or WhatsApp +977 9811420975.",
    },
    {
      question: "Does Grooma prevent double-bookings?",
      answer:
        "Yes. Availability comes from your real hours, breaks, closures and existing appointments, and a slot is settled the moment it is booked. Two customers can never be told the same time is theirs, even when bookings arrive at the same moment.",
    },
    {
      question: "Do my customers need an account to book?",
      answer:
        "No. Customers book as guests, in a few taps, with no sign-up. Your shop and your brand stay the product the customer sees.",
    },
    {
      question: "Does Grooma work in Nepal?",
      answer:
        "Grooma is built Nepal-first: it works in English and नेपाली, shows Bikram Sambat dates, uses 12-hour times, and works offline as a PWA for patchy data connections. Pricing is shown in Nepalese Rupees by default.",
    },
    {
      question: "Where is Grooma built and who makes it?",
      answer:
        "Grooma is built in Butwal, Lumbini, Nepal, by Arun Neupane, lead architect at Sajilo Digital Pvt. Ltd. The first live shop is onboarded personally before a customer is asked to self-serve.",
    },
  ],

  /** Frequently-asked-answer snippets for AEO (concise, quotable). */
  snippets: {
    what: "Grooma is booking and shop-management software for barbershops, built Nepal-first.",
    doubleBooking:
      "Grooma computes availability from your real hours, breaks, closures and appointments, and settles each slot the moment it is booked, so two customers can never be told the same time is theirs.",
    price: "One transparent plan per shop, no per-booking fees, no forced contracts. Contact the maker at arunneupane0000@gmail.com to go live.",
  },

  /** Routes across the site (sitemap set). */
  pages: [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/features", changeFrequency: "monthly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/for-barbershops", changeFrequency: "monthly", priority: 0.8 },
    { path: "/demo", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: seo.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: seo.entity.name,
  applicationCategory: seo.entity.applicationCategory,
  operatingSystem: seo.entity.operatingSystem,
  softwareVersion: seo.entity.softwareVersion,
  inLanguage: seo.entity.inLanguage,
  description: seo.entity.description,
  slogan: seo.entity.slogan,
  offers: {
    "@type": "Offer",
    price: "2999",
    priceCurrency: "NPR",
    description: "One shop, one plan, per month.",
    url: `${site.url}/#pricing`,
  },
  featureList: seo.entity.features,
  publisher: {
    "@type": "Organization",
    name: seo.entity.name,
    url: site.url,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Butwal",
      addressRegion: "Lumbini",
      addressCountry: "NP",
    },
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seo.entity.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: seo.entity.slogan,
  email: site.contact.email,
  telephone: site.contact.phone,
  foundingDate: seo.provider.foundingDate,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Butwal",
    addressRegion: "Lumbini",
    addressCountry: "NP",
  },
  areaServed: { "@type": "Country", name: "Nepal" },
  founder: {
    "@type": "Person",
    name: seo.provider.name,
    url: seo.provider.url,
  },
  sameAs: [
    "https://github.com/arundada9000",
    "https://www.linkedin.com/in/arundada9000",
    "https://x.com/arundada9000",
  ],
};

/**
 * WebSite schema. Gives search engines and AI assistants a canonical
 * definition of the product's landing page and what it's for.
 */
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: seo.entity.name,
  url: site.url,
  description: seo.entity.description,
  inLanguage: ["en", "ne"],
  publisher: {
    "@type": "Organization",
    name: seo.entity.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
  },
};
