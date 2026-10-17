import type { Metadata } from "next";
import { legalMetadata } from "@/lib/legalMeta";
import LegalPage from "@/components/LegalPage";
import LegalContentRenderer from "@/components/LegalContentRenderer";
import { getLegalContent } from "@/lib/legalContent";
import { LOCALES, type Locale } from "@/lib/i18n";

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  return legalMetadata("/terms", searchParams?.lang);
}

// 2026-09-13: reads `?lang=` — see app/privacy/page.tsx's identical comment.
export default function TermsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale: Locale = (LOCALES as string[]).includes(searchParams?.lang ?? "") ? (searchParams!.lang as Locale) : "ko";
  const doc = getLegalContent("terms", locale);
  return (
    <LegalPage title={doc.title} updatedAt={doc.updatedAt} locale={locale} path="/terms">
      <LegalContentRenderer doc={doc} />
    </LegalPage>
  );
}
