import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { getDictionary } from "@/lib/i18n";
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
  title: t.meta.siteTitle,
  description: t.meta.siteDescription,
  // og-image.png doesn't exist yet — public/og-template.html is the design
  // source, screenshotted/cropped to exactly 1200x630 and saved at this
  // path. Once that file exists, KakaoTalk/Instagram/Twitter previews
  // pick it up automatically, no further code change needed.
  openGraph: {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
