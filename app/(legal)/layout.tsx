import { headers } from "next/headers";
import RootShell, { rootMetadata } from "@/components/RootShell";
import { LOCALES, type Locale } from "@/lib/i18n";
import { LOCALE_HEADER } from "@/lib/i18n/serverLocale";

// Legal pages, invite links and unknown URLs: language comes from the request (middleware sets the
// header), so these stay dynamic. The public SEO pages live in app/(site)/[locale].
export const metadata = rootMetadata;

export default function LegalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // middleware sets it for every page route (incl. unknown URLs); en is only a safety fallback.
  const requested = headers().get(LOCALE_HEADER);
  const lang: Locale = (LOCALES as string[]).includes(requested ?? "") ? (requested as Locale) : "en";
  return <RootShell lang={lang}>{children}</RootShell>;
}
