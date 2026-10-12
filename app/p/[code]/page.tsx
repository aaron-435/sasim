import type { Metadata } from "next";
import CoupleCode from "@/components/CoupleCode";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { normalizePairCode } from "@/lib/pairs";

// Couple-mode code page. The app shares this link instead of a bare code. The code is the URL
// itself, so nothing is looked up or stored here; the page only shows it with the steps to enter
// it in the app. Personal link: not indexed. Language: `?lang=` (the app adds it), else English.

type Props = { params: { code: string }; searchParams?: { lang?: string } };

function pick(lang: string | undefined): Locale {
  return (LOCALES as string[]).includes(lang ?? "") ? (lang as Locale) : "en";
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const c = getDictionary(pick(searchParams?.lang)).couple;
  return { title: c.metaTitle, description: c.metaDescription, robots: { index: false, follow: false } };
}

export default function CouplePage({ params, searchParams }: Props) {
  const code = normalizePairCode(params.code);
  return <CoupleCode locale={pick(searchParams?.lang)} code={code} />;
}
