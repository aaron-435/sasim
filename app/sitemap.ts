import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/lib/i18n";
import { publishedDayMasters } from "@/lib/seoArticles";

const ORIGIN = "https://www.fatesaidapp.com";

/** One URL per language, each listing all three plus x-default (same rule as the pages' own hreflang). */
function localized(path: string): MetadataRoute.Sitemap {
  const url = (l: Locale) => (l === "en" ? `${ORIGIN}${path}` : `${ORIGIN}${path}?lang=${l}`);
  const languages: Record<string, string> = Object.fromEntries(LOCALES.map((l) => [l, url(l)]));
  languages["x-default"] = url("en");
  return LOCALES.map((l) => ({ url: url(l), alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized("/"),
    ...localized("/saju-calculator"),
    ...localized("/day-master"),
    ...publishedDayMasters().flatMap((d) => localized(`/day-master/${d.slug}`)),
  ];
}
