import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { LANDING_HEADER, LOCALE_HEADER } from "@/lib/i18n/serverLocale";
import "./globals.css";

const t = getDictionary();

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only "/" and /day-master… get the header from middleware; every other route keeps its old default (ko).
  const requested = headers().get(LOCALE_HEADER);
  const isLanding = headers().get(LANDING_HEADER) === "1";
  const lang: Locale = (LOCALES as string[]).includes(requested ?? "") ? (requested as Locale) : "ko";
  const origin = "https://www.fatesaidapp.com";
  const landingUrl = (l: Locale) => (l === "en" ? `${origin}/` : `${origin}/?lang=${l}`);
  return (
    <html lang={lang}>
      {isLanding && (
        <head>
          <link rel="canonical" href={landingUrl(lang)} />
          {LOCALES.map((l) => (
            <link key={l} rel="alternate" hrefLang={l} href={landingUrl(l)} />
          ))}
          <link rel="alternate" hrefLang="x-default" href={landingUrl("en")} />
        </head>
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
