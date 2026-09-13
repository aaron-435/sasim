import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/lib/i18n";

/**
 * LegalPage — shared chrome for /privacy and /terms. Full-width article
 * layout (wider than the 460px app-shell screens) since long-form legal
 * text reads better at a normal article line-length than in the phone
 * card layout the rest of the app uses.
 *
 * Takes an explicit `locale` prop rather than useStrings()/useLocale()
 * on purpose (2026-09-13) — these pages render outside AppFlow's
 * LocaleProvider tree (a separate route, not a separate step within the
 * same app), so there's no context to read from. The caller (app/privacy
 * or app/terms's page.tsx) resolves locale from the `?lang=` query
 * param and passes it straight down; getDictionary() is a plain
 * function, so this stays a normal Server Component.
 */
export default function LegalPage({ title, updatedAt, locale = "ko", children }) {
  const t = getDictionary(locale);
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#122019", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .lg-root, .lg-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .lg-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .lg-root h2 { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; font-weight: 600; font-size: 19px; color: #D9C9A3; margin: 34px 0 10px; }
        .lg-root h2:first-of-type { margin-top: 0; }
        .lg-root p { font-size: 14px; line-height: 1.8; color: #C4BCA0; margin: 0 0 12px; }
        .lg-root ul { margin: 0 0 12px; padding-left: 20px; }
        .lg-root li { font-size: 14px; line-height: 1.8; color: #C4BCA0; margin-bottom: 6px; }
        .lg-root strong { color: #D9C9A3; font-weight: 700; }
        .lg-root a { color: #6FA98B; }
        .lg-back:focus-visible, .lg-root a:focus-visible { outline: 2px solid #6FA98B; outline-offset: 2px; }
      ` }} />
      <div className="lg-root" style={{ width: "100%", maxWidth: "640px", padding: "40px 24px 80px" }}>
        <Link href="/" className="lg-back" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#756B54", fontSize: "13px", textDecoration: "none", marginBottom: "28px" }}>
          <ArrowLeft size={14} strokeWidth={2} /> {t.legal.backLink}
        </Link>
        <h1 className="lg-serif" style={{ fontSize: "28px", fontWeight: 600, color: "#D9C9A3", margin: "0 0 6px" }}>{title}</h1>
        <p style={{ fontSize: "12px", color: "#756B54", margin: "0 0 32px" }}>{t.legal.effectiveDatePrefix} {updatedAt}</p>
        {children}
      </div>
    </div>
  );
}
