import type { MetadataRoute } from "next";
import { sitemapIndexEntries } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapIndexEntries();
}
