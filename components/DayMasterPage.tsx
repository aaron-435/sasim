import { Sparkles, ArrowRight } from "lucide-react";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { ARTICLE_UI, LOCALE_LABELS, calculatorPath } from "@/lib/seoArticles/ui";
import {
  DAY_MASTERS,
  SITE_ORIGIN,
  archetypeName,
  articlePath,
  dayMasterLabel,
  findDayMaster,
  getArticle,
  listPath,
  publishedDayMasters,
  type DayMasterInfo,
} from "@/lib/seoArticles";

/**
 * Server-rendered shell for the /day-master pages (SPEC C1): same look as the calculator page
 * (green/gold, Cormorant + Manrope) so the site reads as one. No client JS and no tracking.
 */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
  .dm-root, .dm-root * { box-sizing: border-box; }
  .dm-root { min-height: 100vh; background: #122019; color: #D9C9A3; font-family: 'Manrope', 'Noto Sans KR', sans-serif; padding-bottom: 64px; }
  .dm-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; font-weight: 500; }
  .dm-wrap { width: 100%; max-width: 720px; margin: 0 auto; padding: 0 16px; }
  .dm-header { display: flex; align-items: center; justify-content: space-between; padding-top: 22px; gap: 12px; flex-wrap: wrap; }
  .dm-brand { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; letter-spacing: 0.16em; color: #6FA98B; text-transform: uppercase; text-decoration: none; min-height: 32px; }
  .dm-langs { display: flex; gap: 6px; }
  .dm-lang { border: 1px solid #26332B; color: #9C9277; border-radius: 999px; padding: 6px 12px; font-size: 12px; min-height: 32px; display: inline-flex; align-items: center; text-decoration: none; }
  .dm-lang[aria-current="page"] { background: rgba(111,169,139,0.14); border-color: rgba(111,169,139,0.4); color: #6FA98B; }
  .dm-crumb { margin: 36px 0 0; font-size: 13px; }
  .dm-crumb a { color: #6FA98B; text-decoration: none; }
  .dm-h1 { font-size: clamp(34px, 6.4vw, 52px); line-height: 1.12; margin: 14px 0 0; }
  .dm-lead { font-size: 16.5px; line-height: 1.75; color: #9C9277; margin: 16px 0 0; }
  .dm-section { margin-top: 36px; padding-top: 28px; border-top: 1px solid #26332B; }
  .dm-h2 { font-size: clamp(24px, 4vw, 30px); line-height: 1.2; margin: 0 0 14px; }
  .dm-p { font-size: 16px; line-height: 1.8; color: #C9BC99; margin: 0 0 14px; }
  .dm-try { margin-top: 36px; padding: 20px; border-radius: 16px; border: 1px solid #26332B; background: #16261d; }
  .dm-try p { margin: 0; font-size: 15.5px; line-height: 1.75; }
  .dm-try .dm-eyebrow { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6FA98B; margin-bottom: 8px; }
  .dm-list { list-style: none; margin: 24px 0 0; padding: 0; display: grid; gap: 10px; }
  .dm-card { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 18px; border-radius: 14px; border: 1px solid #26332B; background: #16261d; color: #D9C9A3; text-decoration: none; min-height: 56px; }
  .dm-card strong { font-size: 17px; font-weight: 600; }
  .dm-card span { font-size: 13px; color: #9C9277; }
  .dm-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
  .dm-link { border: 1px solid #26332B; border-radius: 999px; padding: 8px 14px; font-size: 14px; color: #D9C9A3; text-decoration: none; min-height: 40px; display: inline-flex; align-items: center; }
  .dm-box { margin-top: 36px; padding: 20px; border-radius: 16px; background: rgba(111,169,139,0.08); border: 1px solid rgba(111,169,139,0.25); }
  .dm-box h2 { margin: 0; font-size: 18px; font-weight: 600; }
  .dm-box p { margin: 8px 0 0; font-size: 14.5px; line-height: 1.7; color: #9C9277; }
  .dm-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; background: #6FA98B; color: #0F1A15; border-radius: 12px; padding: 0 22px; min-height: 48px; font-size: 15px; font-weight: 700; text-decoration: none; }
  .dm-root a:focus-visible { outline: 2px solid #6FA98B; outline-offset: 3px; }
`;

function Shell({ locale, langHref, children }: { locale: Locale; langHref: (l: Locale) => string; children: React.ReactNode }) {
  const t = getDictionary(locale);
  return (
    <main className="dm-root" lang={locale}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="dm-wrap">
        <header className="dm-header">
          <a className="dm-brand" href="/"><Sparkles size={13} strokeWidth={1.75} aria-hidden="true" />{t.common.brand}</a>
          <nav className="dm-langs" aria-label={t.landing.langLabel}>
            {LOCALES.map((code) => (
              <a key={code} className="dm-lang" href={langHref(code)} hrefLang={code} aria-current={code === locale ? "page" : undefined}>
                {LOCALE_LABELS[code]}
              </a>
            ))}
          </nav>
        </header>
        {children}
        <section className="dm-box" aria-labelledby="dm-app-title">
          <h2 id="dm-app-title">{t.calculator.appTitle}</h2>
          <p>{t.calculator.appBody}</p>
          <a className="dm-cta" href="/">{t.calculator.homeCta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></a>
        </section>
      </div>
    </main>
  );
}

export function DayMasterArticlePage({ slug, locale }: { slug: string; locale: Locale }) {
  const info = findDayMaster(slug);
  const article = getArticle(slug, locale);
  if (!info || !article) return null;
  const ui = ARTICLE_UI[locale];
  const others = publishedDayMasters().filter((d) => d.slug !== slug);
  // Up to three other Day Masters, starting with the ones after this one in stem order.
  const order = (d: DayMasterInfo) => DAY_MASTERS.indexOf(d);
  const after = others.filter((d) => order(d) > order(info));
  const picked = [...after, ...others.filter((d) => !after.includes(d))].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.description,
    inLanguage: locale,
    url: `${SITE_ORIGIN}${articlePath(slug, locale)}`,
    mainEntityOfPage: `${SITE_ORIGIN}${articlePath(slug, locale)}`,
    author: { "@type": "Organization", name: "Fatesaid" },
    publisher: { "@type": "Organization", name: "Fatesaid", url: SITE_ORIGIN },
  };

  return (
    <Shell locale={locale} langHref={(l) => articlePath(slug, l)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article>
        <p className="dm-crumb"><a href={listPath(locale)}>{ui.backToList}</a></p>
        <h1 className="dm-serif dm-h1">{article.h1}</h1>
        <p className="dm-lead">{article.lead}</p>
        {article.sections.map((s) => (
          <section className="dm-section" key={s.heading}>
            <h2 className="dm-serif dm-h2">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p className="dm-p" key={i}>{p}</p>
            ))}
          </section>
        ))}
        <div className="dm-try">
          <p className="dm-eyebrow">{locale === "ko" ? "이번 주에 해 볼 것" : locale === "es" ? "Algo para probar" : "One thing to try"}</p>
          <p>{article.tryThis}</p>
        </div>
      </article>

      <section className="dm-box" aria-labelledby="dm-calc-title">
        <h2 id="dm-calc-title">{ui.calcTitle}</h2>
        <p>{ui.calcBody}</p>
        <a className="dm-cta" href={calculatorPath(locale)}>{ui.calcCta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></a>
      </section>

      {picked.length > 0 && (
        <section className="dm-section" aria-labelledby="dm-others">
          <h2 id="dm-others" className="dm-serif dm-h2">{ui.otherTitle}</h2>
          <div className="dm-links">
            {picked.map((d) => (
              <a key={d.slug} className="dm-link" href={articlePath(d.slug, locale)}>{archetypeName(d.slug, locale)} · {dayMasterLabel(d, locale)}</a>
            ))}
          </div>
        </section>
      )}

      <section className="dm-section" aria-labelledby="dm-langs">
        <h2 id="dm-langs" className="dm-serif dm-h2">{ui.readLanguages}</h2>
        <div className="dm-links">
          {LOCALES.filter((l) => l !== locale).map((l) => (
            <a key={l} className="dm-link" href={articlePath(slug, l)} hrefLang={l}>{LOCALE_LABELS[l]}</a>
          ))}
        </div>
      </section>
    </Shell>
  );
}

export function DayMasterListPage({ locale }: { locale: Locale }) {
  const ui = ARTICLE_UI[locale];
  const items: DayMasterInfo[] = publishedDayMasters();
  return (
    <Shell locale={locale} langHref={listPath}>
      <h1 className="dm-serif dm-h1">{ui.listTitle}</h1>
      <p className="dm-lead">{ui.listLead}</p>
      <ul className="dm-list">
        {items.map((d) => (
          <li key={d.slug}>
            <a className="dm-card" href={articlePath(d.slug, locale)}>
              <strong>{archetypeName(d.slug, locale)}</strong>
              <span>{dayMasterLabel(d, locale)}</span>
            </a>
          </li>
        ))}
      </ul>
      <section className="dm-box" aria-labelledby="dm-calc-title">
        <h2 id="dm-calc-title">{ui.calcTitle}</h2>
        <p>{ui.calcBody}</p>
        <a className="dm-cta" href={calculatorPath(locale)}>{ui.calcCta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></a>
      </section>
    </Shell>
  );
}
