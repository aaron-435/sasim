import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, resolveLocale } from "@/lib/i18n/serverLocale";
import type { Locale } from "@/lib/i18n/types";

/** Same order as the landing (SPEC C0): ?lang= → cookie → Accept-Language → en. Makes the page dynamic. */
export function requestLocale(lang: string | string[] | undefined): Locale {
  return resolveLocale({
    lang: typeof lang === "string" ? lang : null,
    cookie: cookies().get(LOCALE_COOKIE)?.value,
    acceptLanguage: headers().get("accept-language"),
  });
}
