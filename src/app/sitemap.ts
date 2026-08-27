import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/features", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/for-barbershops", priority: 0.8, changeFrequency: "monthly" },
  { path: "/demo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: today,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
