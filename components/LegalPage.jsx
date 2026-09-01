import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useStrings } from "@/lib/i18n";

/**
 * LegalPage — shared chrome for /privacy and /terms. Full-width article
 * layout (wider than the 460px app-shell screens) since long-form legal
 * text reads better at a normal article line-length than in the phone
 * card layout the rest of the app uses.
 */
export default function LegalPage({ title, updatedAt, children }) {
  const t = useStrings();
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .lg-root, .lg-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .lg-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .lg-root h2 { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; font-weight: 600; font-size: 19px; color: #EDE7DA; margin: 34px 0 10px; }
        .lg-root h2:first-of-type { margin-top: 0; }
        .lg-root p { font-size: 14px; line-height: 1.8; color: #C7C3D1; margin: 0 0 12px; }
        .lg-root ul { margin: 0 0 12px; padding-left: 20px; }
        .lg-root li { font-size: 14px; line-height: 1.8; color: #C7C3D1; margin-bottom: 6px; }
        .lg-root strong { color: #EDE7DA; font-weight: 700; }
        .lg-root a { color: #C9A24B; }
        .lg-back:focus-visible, .lg-root a:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
      ` }} />
      <div className="lg-root" style={{ width: "100%", maxWidth: "640px", padding: "40px 24px 80px" }}>
        <Link href="/" className="lg-back" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#847E90", fontSize: "13px", textDecoration: "none", marginBottom: "28px" }}>
          <ArrowLeft size={14} strokeWidth={2} /> {t.legal.backLink}
        </Link>
        <h1 className="lg-serif" style={{ fontSize: "28px", fontWeight: 600, color: "#EDE7DA", margin: "0 0 6px" }}>{title}</h1>
        <p style={{ fontSize: "12px", color: "#847E90", margin: "0 0 32px" }}>{t.legal.effectiveDatePrefix} {updatedAt}</p>
        {children}
      </div>
    </div>
  );
}
