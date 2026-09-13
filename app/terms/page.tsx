import LegalPage from "@/components/LegalPage";
import LegalContentRenderer from "@/components/LegalContentRenderer";
import { getLegalContent } from "@/lib/legalContent";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";

export const metadata = {
  title: getDictionary().meta.termsPageTitle,
};

// 2026-09-13: reads `?lang=` — see app/privacy/page.tsx's identical comment.
export default function TermsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale: Locale = (LOCALES as string[]).includes(searchParams?.lang ?? "") ? (searchParams!.lang as Locale) : "ko";
  const doc = getLegalContent("terms", locale);
  return (
    <LegalPage title={doc.title} updatedAt={doc.updatedAt} locale={locale}>
      <LegalContentRenderer doc={doc} />
    </LegalPage>
  );
}
