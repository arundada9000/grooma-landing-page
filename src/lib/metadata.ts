import type { Metadata } from "next";
import { site } from "@/config/site";

export interface PageMetaInput {
  /** SEO title (site suffix is added by the root template). */
  title: string;
  description: string;
  /** Route path, e.g. "/features". */
  path: string;
  /** Optional extra keywords specific to the page. */
  keywords?: string[];
  /** JSON-LD types this page should carry in addition to the shared ones. */
  structuredData?: "BreadcrumbList"[];
}

/**
 * Build a page-level Metadata object. Keeps canonical, OG, Twitter and robots
 * consistent across the site and anchored to the single site.url base, so any
 * page can be authored by supplying copy plus a path only.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Grooma",
      locale: "en_US",
      alternateLocale: ["ne_NP"],
      url,
      title: `${title} | Grooma`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: "@arundada9000",
      title: `${title} | Grooma`,
      description,
    },
  };
}
