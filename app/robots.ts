import type { MetadataRoute } from "next";

// Crawlers may read the public pages; the API and per-user invite links are not for search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/c/"] },
    sitemap: "https://www.fatesaidapp.com/sitemap.xml",
  };
}
