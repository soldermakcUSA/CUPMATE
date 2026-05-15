import type { MetadataRoute } from "next";
import { getSiteUrl, splitSitemaps } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"]
    },
    sitemap: [`${siteUrl}/sitemap.xml`, ...splitSitemaps.map((sitemap) => `${siteUrl}${sitemap.path}`)],
    host: siteUrl
  };
}
