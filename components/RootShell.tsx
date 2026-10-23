import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { getDictionary, type Locale } from "@/lib/i18n";
import "../app/globals.css";

// Shared by the two root layouts: app/(site)/[locale]/layout.tsx (public SEO pages, language from the
// path, statically rendered) and app/(legal)/layout.tsx (legal pages, invite links, 404: language from
// the request). Next needs a <html> in each root layout, so the shell lives here once.

const t = getDictionary();

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const rootMetadata: Metadata = {
  // Absolute base for og:image / twitter:image (Next otherwise falls back to localhost:3000).
  metadataBase: new URL("https://www.fatesaidapp.com"),
  title: t.meta.siteTitle,
  description: t.meta.siteDescription,
  // The preview image comes from app/opengraph-image.tsx (Next attaches it to og:image
  // automatically). The old "/og-image.png" pointed at a file that never existed.
  openGraph: {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
