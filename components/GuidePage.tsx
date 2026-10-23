import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/DayMasterPage";
import JsonLd from "@/components/JsonLd";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/paths";
import { breadcrumbLd } from "@/lib/jsonLd";
import { ARTICLE_UI, LOCALE_LABELS, calculatorPath } from "@/lib/seoArticles/ui";
import { SITE_ORIGIN, archetypeName, articlePath, dayMasterLabel, findDayMaster } from "@/lib/seoArticles";
import { GUIDES, GUIDES_UI, findGuide, getGuide, guideLocales, guidePath, guidesIndexLocales, guidesListPath } from "@/lib/seoGuides";

/** Server-rendered guide pages: same shell and look as the Day Master articles. */

export function GuideArticlePage({ slug, locale }: { slug: string; locale: Locale }) {
  const def = findGuide(slug);
  const guide = getGuide(slug, locale);
  const ui = GUIDES_UI[locale];
  if (!def || !guide || !ui) return null;
  const dm = ARTICLE_UI[locale];
  const locales = guideLocales(slug);
  const url = `${SITE_ORIGIN}${guidePath(slug, locale)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    inLanguage: locale,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Fatesaid" },
    publisher: { "@type": "Organization", name: "Fatesaid", url: SITE_ORIGIN },
  };
  return (
    <Shell locale={locale} langHref={(l) => guidePath(slug, l)} locales={locales}>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbLd([
            { name: getDictionary(locale).common.brand, path: localizedPath("/", locale) },
            { name: ui.listTitle, path: guidesListPath(locale) },
            { name: guide.h1, path: guidePath(slug, locale) },
          ]),
        ]}
      />
      <article>
        <p className="dm-crumb"><a href={guidesListPath(locale)}>{ui.backToList}</a></p>
        <h1 className="dm-serif dm-h1">{guide.h1}</h1>
        <p className="dm-lead">{guide.lead}</p>
        {guide.sections.map((s) => (
          <section className="dm-section" key={s.heading}>
            <h2 className="dm-serif dm-h2">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p className="dm-p" key={i}>{p}</p>
            ))}
          </section>
        ))}
        <div className="dm-try">
          <p className="dm-eyebrow">{locale === "es" ? "Algo para probar" : "One thing to try"}</p>
          <p>{guide.tryThis}</p>
        </div>
      </article>

      <section className="dm-box" aria-labelledby="dm-calc-title">
        <h2 id="dm-calc-title">{dm.calcTitle}</h2>
        <p>{dm.calcBody}</p>
        <a className="dm-cta" href={calculatorPath(locale)}>{dm.calcCta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></a>
      </section>

      <section className="dm-section" aria-labelledby="dm-related">
        <h2 id="dm-related" className="dm-serif dm-h2">{ui.relatedTitle}</h2>
        <div className="dm-links">
          {def.related.map((r) => {
            const info = findDayMaster(r);
            if (!info) return null;
            return <a key={r} className="dm-link" href={articlePath(r, locale)}>{archetypeName(r, locale)} · {dayMasterLabel(info, locale)}</a>;
          })}
        </div>
      </section>

      {locales.length > 1 && (
        <section className="dm-section" aria-labelledby="dm-langs">
          <h2 id="dm-langs" className="dm-serif dm-h2">{dm.readLanguages}</h2>
          <div className="dm-links">
            {locales.filter((l) => l !== locale).map((l) => (
              <a key={l} className="dm-link" href={guidePath(slug, l)} hrefLang={l}>{LOCALE_LABELS[l]}</a>
            ))}
          </div>
        </section>
      )}
    </Shell>
  );
}

export function GuidesListPage({ locale }: { locale: Locale }) {
  const ui = GUIDES_UI[locale];
  const dm = ARTICLE_UI[locale];
  if (!ui) return null;
  return (
    <Shell locale={locale} langHref={guidesListPath} locales={guidesIndexLocales()}>
      <h1 className="dm-serif dm-h1">{ui.listTitle}</h1>
      <p className="dm-lead">{ui.listLead}</p>
      <ul className="dm-list">
        {GUIDES.filter((g) => g.content[locale]).map((g) => (
          <li key={g.slug}>
            <a className="dm-card" href={guidePath(g.slug, locale)}>
              <strong>{g.content[locale]!.h1}</strong>
            </a>
          </li>
        ))}
      </ul>
      <section className="dm-box" aria-labelledby="dm-calc-title">
        <h2 id="dm-calc-title">{dm.calcTitle}</h2>
        <p>{dm.calcBody}</p>
        <a className="dm-cta" href={calculatorPath(locale)}>{dm.calcCta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></a>
      </section>
    </Shell>
  );
}
