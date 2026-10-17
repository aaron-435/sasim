import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, resolveLocale } from "@/lib/i18n/serverLocale";
import { LOCALES, type Locale } from "@/lib/i18n/types";

/** Same order as the landing (SPEC C0): ?lang= → cookie → Accept-Language → en. Makes the page dynamic. */
export function requestLocale(lang: string | string[] | undefined): Locale {
  return resolveLocale({
    lang: typeof lang === "string" ? lang : null,
    cookie: cookies().get(LOCALE_COOKIE)?.value,
    acceptLanguage: headers().get("accept-language"),
  });
}

/** The language the URL itself names (`?lang=`); a bare URL is English. Used for canonical, which must match the sitemap. */
export function explicitLocale(lang: string | string[] | undefined): Locale {
  return typeof lang === "string" && (LOCALES as string[]).includes(lang) ? (lang as Locale) : "en";
}
