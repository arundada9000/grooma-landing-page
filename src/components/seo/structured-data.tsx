import {
  faqSchema,
  organizationSchema,
  softwareSchema,
  webSiteSchema,
} from "@/config/seo";
import { site } from "@/config/site";

interface Crumb {
  label: string;
  path: string;
}

/**
 * Injects JSON-LD structured data for rich results and answer engines.
 *
 * Emits the global entity schemas (Organization, WebSite, SoftwareApplication)
 * plus, optionally, an FAQPage (on pages that actually show the FAQ) and a
 * BreadcrumbList for the given page. Rendered server-side so crawlers and AI
 * assistants read it without executing JavaScript.
 */
export function StructuredData({
  crumb,
  withFaq = false,
}: {
  /** Current page for the BreadcrumbList; omit to skip breadcrumbs. */
  crumb?: Crumb;
  /** Include the FAQPage schema (only on pages that render the FAQ). */
  withFaq?: boolean;
}) {
  const breadcrumbs = crumb
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: crumb.label,
            item: `${site.url}${crumb.path}`,
          },
        ],
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {withFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      )}
    </>
  );
}
