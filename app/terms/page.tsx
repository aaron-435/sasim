import LegalPage from "@/components/LegalPage";
import LegalContentRenderer from "@/components/LegalContentRenderer";
import { getLegalContent } from "@/lib/legalContent";
import { getDictionary } from "@/lib/i18n";

export const metadata = {
  title: getDictionary().meta.termsPageTitle,
};

export default function TermsPage() {
  const doc = getLegalContent("terms");
  return (
    <LegalPage title={doc.title} updatedAt={doc.updatedAt}>
      <LegalContentRenderer doc={doc} />
    </LegalPage>
  );
}
