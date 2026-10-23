import { notFound } from "next/navigation";
import RootShell, { rootMetadata } from "@/components/RootShell";
import { LOCALES, type Locale } from "@/lib/i18n";

// Public SEO pages: the language is the first path segment (English is rewritten to /en by middleware),
// so nothing here reads headers or cookies and every page can be prerendered and cached.
export const metadata = rootMetadata;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function SiteLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!(LOCALES as string[]).includes(params.locale)) notFound();
  return <RootShell lang={params.locale as Locale}>{children}</RootShell>;
}
