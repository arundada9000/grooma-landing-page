import { pricing, site } from "./site";

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

  /** Routes across the site. Read by app/sitemap.ts, the only consumer. */
  pages: [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/features", changeFrequency: "monthly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/for-barbershops", changeFrequency: "monthly", priority: 0.8 },
    { path: "/demo", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  ] as const,
};

/* ============================================================
   Structured data
   ------------------------------------------------------------
   Emitted as a single linked @graph rather than a pile of loose objects:
   cross-referenced @id nodes are what let a crawler (and an answer engine)
   understand that the Organization, the WebSite, the product and this page
   are one entity, instead of four unrelated claims on a page.

   Deliberately absent: aggregateRating, reviewCount, userInteractionCount.
   Grooma has one live shop. Inventing those would win a star rating in
   search at the cost of the honesty the product is sold on.
   ============================================================ */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const SOFTWARE_ID = `${site.url}/#software`;
const LOGO_ID = `${site.url}/#logo`;

/** Every route generates its preview image at `<path>/opengraph-image`. */
export function ogImageUrl(path: string): string {
  const base = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${site.url}${base}/opengraph-image`;
}

function imageObject(url: string, caption: string) {
  return {
    "@type": "ImageObject",
    url,
    contentUrl: url,
    width: 1200,
    height: 630,
    caption,
  };
}

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: seo.entity.name,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${site.url}/icon.svg`,
    contentUrl: `${site.url}/icon.svg`,
    caption: seo.entity.name,
  },
  image: { "@id": LOGO_ID },
  slogan: seo.entity.slogan,
  description: seo.entity.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  foundingDate: seo.provider.foundingDate,
  knowsLanguage: ["en", "ne"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Butwal",
    addressRegion: "Lumbini",
    addressCountry: "NP",
  },
  areaServed: { "@type": "Country", name: "Nepal" },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.contact.email,
      telephone: site.contact.phone,
      areaServed: "NP",
      availableLanguage: ["English", "Nepali"],
    },
  ],
  founder: {
    "@type": "Person",
    name: seo.provider.name,
    url: seo.provider.url,
    jobTitle: site.creator.role,
  },
  sameAs: site.social.filter((s) => s.url.startsWith("http")).map((s) => s.url),
};

export const webSiteNode = {
  "@type": "WebSite",
  "@id": SITE_ID,
  name: seo.entity.name,
  alternateName: `${seo.entity.name} - ${site.brand.statement}`,
  url: site.url,
  description: seo.entity.description,
  inLanguage: ["en", "ne"],
  publisher: { "@id": ORG_ID },
};

/**
 * The product itself. Both real price points are listed, so a search result
 * can quote either one without a visitor finding a third number on arrival.
 */
export const softwareNode = {
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: seo.entity.name,
  applicationCategory: seo.entity.applicationCategory,
  applicationSubCategory: "Appointment Scheduling Software",
  operatingSystem: seo.entity.operatingSystem,
  softwareVersion: seo.entity.softwareVersion,
  url: site.url,
  inLanguage: seo.entity.inLanguage,
  description: seo.entity.description,
  slogan: seo.entity.slogan,
  featureList: seo.entity.features,
  screenshot: [
    imageObject(
      ogImageUrl("/"),
      "The Grooma booking surface and a confirmed appointment",
    ),
    imageObject(ogImageUrl("/demo"), "The Grooma interactive booking demo"),
    imageObject(ogImageUrl("/features"), "Grooma's features and owner dashboard"),
  ],
  image: { "@id": LOGO_ID },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Barbershops and salons",
    geographicArea: { "@type": "Country", name: "Nepal" },
  },
  offers: [
    {
      "@type": "Offer",
      "@id": `${site.url}/pricing#monthly`,
      name: "One shop, monthly",
      price: String(pricing.plans[0].base.NPR),
      priceCurrency: "NPR",
      description: "One shop, one plan, per month. No per-booking fees.",
      url: `${site.url}/pricing`,
      availability: "https://schema.org/InStock",
      category: "subscription",
    },
    ...(pricing.plans[0].buyout
      ? [
          {
            "@type": "Offer",
            "@id": `${site.url}/pricing#one-time`,
            name: "One shop, paid once",
            price: String(pricing.plans[0].buyout.NPR),
            priceCurrency: "NPR",
            description:
              "Pay once and own the software. Domain and deployment are billed separately.",
            url: `${site.url}/pricing`,
            availability: "https://schema.org/InStock",
            category: "one-time",
          },
        ]
      : []),
  ],
  provider: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  isPartOf: { "@id": SITE_ID },
};

export const faqNode = {
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  inLanguage: "en",
  mainEntity: seo.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

/**
 * The guest booking journey as an answerable procedure. This is the shape an
 * assistant reaches for when a reader asks "how do I book with Grooma", and
 * it mirrors the four steps the site actually shows.
 */
export const howToBookNode = {
  "@type": "HowTo",
  "@id": `${site.url}/#how-to-book`,
  name: "How to book a barbershop appointment with Grooma",
  description:
    "Book a chair as a guest, in about ten seconds, without creating an account.",
  totalTime: "PT1M",
  inLanguage: "en",
  image: imageObject(ogImageUrl("/demo"), "The Grooma booking flow"),
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose a service",
      text: "Open the shop's booking page and pick the service you want, with its real duration and price.",
      url: `${site.url}/demo`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Pick a barber",
      text: "Choose a specific barber, or let Grooma find whoever is free first.",
      url: `${site.url}/demo`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Pick an available time",
      text: "Grooma computes the open slots from the shop's hours, breaks, closures and existing appointments, so every time shown can actually happen.",
      url: `${site.url}/demo`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm as a guest",
      text: "Leave a name and a phone number. No account, no app, no password. The slot is settled the moment it is booked.",
      url: `${site.url}/demo`,
    },
  ],
};

export interface PageNodeInput {
  title: string;
  description: string;
  path: string;
  /** Breadcrumb label. Omitted on the home page. */
  crumb?: string;
}

/**
 * A WebPage node for the current route, linked into the graph and carrying
 * the page's own preview image so a rich result has something to show.
 */
export function webPageNode({ title, description, path, crumb }: PageNodeInput) {
  const url = new URL(path, site.url).toString();
  const imageId = `${url}#primaryimage`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": SOFTWARE_ID },
    primaryImageOfPage: {
      ...imageObject(ogImageUrl(path), title),
      "@id": imageId,
    },
    image: { "@id": imageId },
    inLanguage: "en",
    ...(crumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    /* Tells answer engines and voice results which part of the page is worth
       reading aloud. */
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2"],
    },
  };
}

export function breadcrumbNode({
  crumb,
  path,
}: {
  crumb: string;
  path: string;
}) {
  const url = new URL(path, site.url).toString();
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: crumb, item: url },
    ],
  };
}
