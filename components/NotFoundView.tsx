"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { localizedPath, splitLocalePath } from "@/lib/i18n/paths";

// Shared 404 body. The (legal) group passes the locale it resolved from the request; the prerendered
// (site)/[locale] group passes none (reading headers there would make every page dynamic) and the
// language comes from the URL prefix instead.
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

export default function NotFoundView({ locale }: { locale?: Locale }) {
  const pathname = usePathname();
  const lang = locale ?? splitLocalePath(pathname ?? "/").locale;
  const c = COPY[lang];
  return (
    <main
      lang={lang}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "0 24px", background: "#122019", color: "#D9C9A3", textAlign: "center" }}
    >
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{c.title}</h1>
      <p style={{ margin: 0, fontSize: 14, color: "#C4BCA0" }}>{c.body}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href={localizedPath("/", lang)} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1px solid #6FA98B", color: "#6FA98B", textDecoration: "none", fontSize: 14 }}>{c.home}</Link>
        <Link href={localizedPath("/saju-calculator", lang)} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1px solid #26332B", color: "#C4BCA0", textDecoration: "none", fontSize: 14 }}>{c.calc}</Link>
      </div>
    </main>
  );
}
