import LegalPage from "@/components/LegalPage";
import LegalContentRenderer from "@/components/LegalContentRenderer";
import { getLegalContent } from "@/lib/legalContent";
import { getDictionary } from "@/lib/i18n";

export const metadata = {
  title: getDictionary().meta.privacyPageTitle,
};

export default function PrivacyPage() {
  const doc = getLegalContent("privacy");
  return (
    <LegalPage title={doc.title} updatedAt={doc.updatedAt}>
      <LegalContentRenderer doc={doc} />
    </LegalPage>
  );
}
