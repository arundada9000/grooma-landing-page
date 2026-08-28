import {
  breadcrumbNode,
  faqNode,
  howToBookNode,
  organizationNode,
  softwareNode,
  webPageNode,
  webSiteNode,
  type PageNodeInput,
} from "@/config/seo";

/**
 * Injects JSON-LD structured data for rich results and answer engines.
 *
 * One `@graph` per page rather than several standalone scripts: the nodes
 * reference each other by `@id`, which is what tells a crawler the
 * Organization, the WebSite, the product and this page are one entity. The
 * page's own preview image rides along as `primaryImageOfPage`, so a rich
 * result has an image to show.
 *
 * Rendered server-side, so crawlers and AI assistants read it without
 * executing JavaScript.
 */
export function StructuredData({
  page,
  withFaq = false,
  withHowTo = false,
}: {
  /** The current route. Reuse the object passed to `buildPageMetadata`. */
  page: PageNodeInput;
  /** Include FAQPage. Only on pages that actually render the FAQ. */
  withFaq?: boolean;
  /** Include the booking HowTo. Only where the journey is shown. */
  withHowTo?: boolean;
}) {
  const graph = [
    organizationNode,
    webSiteNode,
    softwareNode,
    webPageNode(page),
    ...(page.crumb
      ? [breadcrumbNode({ crumb: page.crumb, path: page.path })]
      : []),
    ...(withFaq ? [faqNode] : []),
    ...(withHowTo ? [howToBookNode] : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
