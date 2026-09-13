import AppFlow from "@/components/AppFlow";
import { LocaleProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LocaleProvider>
      <AppFlow />
    </LocaleProvider>
  );
}
