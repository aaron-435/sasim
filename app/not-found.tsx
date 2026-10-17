import type { Metadata } from "next";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { LOCALE_COOKIE, LOCALE_HEADER, resolveLocale } from "@/lib/i18n/serverLocale";

// Unknown URLs: the language is resolved like every other public page (?lang= -> cookie ->
// Accept-Language -> en). middleware.ts runs for unmatched paths too and sets the locale header
// (it can see ?lang=); app/layout.tsx uses it for <html lang>. The cookie/Accept-Language fallback
// here covers the case where the header is missing.
const COPY: Record<Locale, { description: string; title: string; body: string; home: string; calc: string }> = {
  en: {
    description: "The page you were looking for does not exist. Go back to Fatesaid or try the free Four Pillars calculator.",
    title: "Page not found",
    body: "That link doesn't lead anywhere. Try the home page or the free calculator.",
    home: "Go to Fatesaid",
    calc: "Four Pillars calculator",
  },
  es: {
    description: "La página que buscas no existe. Vuelve a Fatesaid o prueba la calculadora gratuita de los Cuatro Pilares.",
    title: "Página no encontrada",
    body: "Este enlace no lleva a ninguna parte. Prueba con la página de inicio o con la calculadora gratuita.",
    home: "Ir a Fatesaid",
    calc: "Calculadora de los Cuatro Pilares",
  },
  ko: {
    description: "찾으시는 페이지가 없어요. Fatesaid 홈으로 돌아가거나 무료 사주 계산기를 이용해 보세요.",
    title: "페이지를 찾을 수 없어요",
    body: "이 링크는 어디로도 이어지지 않아요. 홈이나 무료 계산기로 가 보세요.",
    home: "Fatesaid 홈으로",
    calc: "사주 계산기",
  },
};

function currentLocale(): Locale {
  const requested = headers().get(LOCALE_HEADER);
  if ((LOCALES as string[]).includes(requested ?? "")) return requested as Locale;
  return resolveLocale({ cookie: cookies().get(LOCALE_COOKIE)?.value, acceptLanguage: headers().get("accept-language") });
}

export function generateMetadata(): Metadata {
  const locale = currentLocale();
  return {
    title: getDictionary(locale).meta.notFoundTitle,
    description: COPY[locale].description,
    robots: { index: false },
  };
}

export default function NotFound() {
  const locale = currentLocale();
  const c = COPY[locale];
  const q = locale === "en" ? "" : `?lang=${locale}`;
  return (
    <main
      lang={locale}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "0 24px", background: "#122019", color: "#D9C9A3", textAlign: "center" }}
    >
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{c.title}</h1>
      <p style={{ margin: 0, fontSize: 14, color: "#C4BCA0" }}>{c.body}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href={`/${q}`} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1px solid #6FA98B", color: "#6FA98B", textDecoration: "none", fontSize: 14 }}>{c.home}</Link>
        <Link href={`/saju-calculator${q}`} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1px solid #26332B", color: "#C4BCA0", textDecoration: "none", fontSize: 14 }}>{c.calc}</Link>
      </div>
    </main>
  );
}
