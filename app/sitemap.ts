import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/lib/i18n";

const ORIGIN = "https://www.fatesaidapp.com";

/** One URL per language, each listing all three plus x-default (same rule as the pages' own hreflang). */
function localized(path: string): MetadataRoute.Sitemap {
  const url = (l: Locale) => (l === "en" ? `${ORIGIN}${path}` : `${ORIGIN}${path}?lang=${l}`);
  const languages: Record<string, string> = Object.fromEntries(LOCALES.map((l) => [l, url(l)]));
  languages["x-default"] = url("en");
  return LOCALES.map((l) => ({ url: url(l), alternates: { languages } }));
}

// Article URLs (/day-master/<type>) join this list in TODO 11.
export default function sitemap(): MetadataRoute.Sitemap {
  return [...localized("/"), ...localized("/saju-calculator")];
}
