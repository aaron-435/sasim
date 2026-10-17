import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

// Only Next's default 404 existed before (title "404: This page could not be found"). The layout
// can't tell the visitor's language on an unknown URL, so this page is written in English and marks
// itself `lang="en"` so a Korean <html lang> doesn't mislabel it.
export const metadata: Metadata = {
  title: getDictionary("en").meta.notFoundTitle,
  description: "The page you were looking for does not exist. Go back to Fatesaid or try the free Four Pillars calculator.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      lang="en"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "0 24px", background: "#122019", color: "#D9C9A3", textAlign: "center" }}
    >
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Page not found</h1>
      <p style={{ margin: 0, fontSize: 14, color: "#C4BCA0" }}>That link doesn&apos;t lead anywhere. Try the home page or the free calculator.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1px solid #6FA98B", color: "#6FA98B", textDecoration: "none", fontSize: 14 }}>Go to Fatesaid</Link>
        <Link href="/saju-calculator" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1px solid #26332B", color: "#C4BCA0", textDecoration: "none", fontSize: 14 }}>Four Pillars calculator</Link>
      </div>
    </main>
  );
}
