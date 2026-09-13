import LegalPage from "@/components/LegalPage";
import LegalContentRenderer from "@/components/LegalContentRenderer";
import { getLegalContent } from "@/lib/legalContent";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";

export const metadata = {
  title: getDictionary().meta.privacyPageTitle,
};

// 2026-09-13: reads `?lang=` since this page renders outside AppFlow's
// LocaleProvider (a separate route, no shared React tree) — see
// components/LegalPage.jsx's header comment. OnboardingWizard's footer
// links pass the visitor's current locale explicitly; a direct visit
// with no param falls back to Korean, same as before this change.
export default function PrivacyPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale: Locale = (LOCALES as string[]).includes(searchParams?.lang ?? "") ? (searchParams!.lang as Locale) : "ko";
  const doc = getLegalContent("privacy", locale);
  return (
    <LegalPage title={doc.title} updatedAt={doc.updatedAt} locale={locale}>
      <LegalContentRenderer doc={doc} />
    </LegalPage>
  );
}
