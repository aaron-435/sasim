import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/paths";
import { publishedDayMasters } from "@/lib/seoArticles";
import { GUIDES, guidesIndexLocales } from "@/lib/seoGuides";

const ORIGIN = "https://www.fatesaidapp.com";

/** One URL per language, each listing all three plus x-default (same rule as the pages' own hreflang). */
function localized(path: string, only: readonly Locale[] = LOCALES): MetadataRoute.Sitemap {
  // The English landing is the bare origin: that is how Next prints its canonical (no trailing slash).
  const url = (l: Locale) => (path === "/" && l === "en" ? ORIGIN : `${ORIGIN}${localizedPath(path, l)}`);
  const languages: Record<string, string> = Object.fromEntries(only.map((l) => [l, url(l)]));
  languages["x-default"] = url("en");
  return only.map((l) => ({ url: url(l), alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized("/"),
    ...localized("/saju-calculator"),
    ...localized("/day-master"),
    ...publishedDayMasters().flatMap((d) => localized(`/day-master/${d.slug}`)),
    // Guides are written en/es first: each URL lists only the languages it exists in.
    ...localized("/guides", guidesIndexLocales()),
    ...GUIDES.flatMap((g) => localized(`/guides/${g.slug}`, Object.keys(g.content) as Locale[])),
  ];
}
