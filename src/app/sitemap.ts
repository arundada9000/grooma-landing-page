import type { MetadataRoute } from "next";
import { seo } from "@/config/seo";
import { site } from "@/config/site";

/**
 * The route set lives in `seo.pages` so the sitemap can never drift from the
 * list the rest of the SEO config is written against.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return seo.pages.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified,
    changeFrequency:
      r.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: r.priority,
  }));
}
