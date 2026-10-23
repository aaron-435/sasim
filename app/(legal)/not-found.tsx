import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import NotFoundView from "@/components/NotFoundView";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { LOCALE_COOKIE, LOCALE_HEADER, resolveLocale } from "@/lib/i18n/serverLocale";

// Unknown URLs and the legal pages' 404: the language is resolved like every other request-based page
// (?lang= -> cookie -> Accept-Language -> en). middleware.ts runs for unmatched paths too and sets the
// locale header (it can see ?lang=); app/(legal)/layout.tsx uses it for <html lang>. The
// cookie/Accept-Language fallback here covers the case where the header is missing.
function currentLocale(): Locale {
  const requested = headers().get(LOCALE_HEADER);
  if ((LOCALES as string[]).includes(requested ?? "")) return requested as Locale;
  return resolveLocale({ cookie: cookies().get(LOCALE_COOKIE)?.value, acceptLanguage: headers().get("accept-language") });
}

export function generateMetadata(): Metadata {
  const locale = currentLocale();
  return {
    title: getDictionary(locale).meta.notFoundTitle,
    robots: { index: false },
  };
}

export default function NotFound() {
  return <NotFoundView locale={currentLocale()} />;
}
