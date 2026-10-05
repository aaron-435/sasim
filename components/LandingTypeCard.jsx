"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import QuickBirthForm, { fetchQuickSaju } from "@/components/QuickBirthForm";
import { formatSajuTypeName, getTypePieces } from "@/lib/sajuTypeContent";
import { logEvent } from "@/lib/analytics";

/**
 * LandingTypeCard — the landing's "first wow" (SPEC 2026-10-05 §2): a birth date alone gives
 * the visitor their saju type in a few seconds, then the card points to the app for the full
 * chart and to the existing flow (time + city + Q&A) for more. The type comes straight from
 * /api/saju's `sajuType`, the same server classification the app shows.
 *
 * The celebrity list is ~2,000 lines of data, so it's loaded only once a card is shown
 * instead of weighing on every landing visit.
 */
export default function LandingTypeCard({ t, locale, onContinue }) {
  const c = t.typeCard;
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [celebs, setCelebs] = React.useState([]);
  const [celebModule, setCelebModule] = React.useState(null);
  const resultRef = React.useRef(null);

  React.useEffect(() => {
    if (!type) return;
    let cancelled = false;
    import("@/lib/sajuTypeCelebrities")
      .then((m) => {
        if (!cancelled) setCelebModule(m);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [type]);

  React.useEffect(() => {
    setCelebs(type && celebModule ? celebModule.getCelebritiesForType(type.code, locale).slice(0, 2) : []);
  }, [type, celebModule, locale]);

  const submit = async (dob) => {
    setSubmitting(true);
    setError(null);
    try {
      const result = await fetchQuickSaju(dob);
      if (!result?.sajuType) throw new Error("no type");
      setType(result.sajuType);
      logEvent("type_reveal_view", { surface: "landing", kind: result.sajuType.code }, locale);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setError(c.error);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setType(null);
    setError(null);
  };

  const pieces = type ? getTypePieces(locale, type) : null;

  return (
    <section className="lp-section" aria-labelledby="lp-typecard">
      <style dangerouslySetInnerHTML={{ __html: `
        .tc-wrap { max-width: 640px; }
        .tc-body { font-size: 15px; line-height: 1.7; color: #9C9277; margin: -12px 0 22px; }
        .tc-card { background: #16261d; border: 1px solid rgba(111,169,139,0.35); border-radius: 18px; padding: 26px 22px; }
        .tc-card:focus { outline: none; }
        .tc-card:focus-visible { outline: 2px solid #6FA98B; outline-offset: 3px; }
        .tc-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #6FA98B; margin: 0; }
        .tc-name { font-size: clamp(30px, 6vw, 40px); line-height: 1.15; margin: 10px 0 0; color: #D9C9A3; }
        .tc-gloss { font-size: 13px; line-height: 1.6; color: #9C9277; margin: 10px 0 0; }
        .tc-piece { border-top: 1px solid #26332B; margin-top: 20px; padding-top: 18px; }
        .tc-piece-label { font-size: 12.5px; font-weight: 600; color: #9C9277; margin: 0; }
        .tc-piece-name { font-size: 22px; margin: 6px 0 0; color: #D9C9A3; }
        .tc-piece-tag { font-size: 14px; font-weight: 500; color: #6FA98B; margin: 4px 0 0; }
        .tc-piece-text { font-size: 14.5px; line-height: 1.7; color: #9C9277; margin: 10px 0 0; }
        .tc-celeb { margin: 12px 0 0; }
        .tc-celeb-name { font-size: 14.5px; font-weight: 600; color: #D9C9A3; margin: 0; }
        .tc-celeb-meta { font-size: 12.5px; color: #6FA98B; margin: 2px 0 0; }
        .tc-note { font-size: 12.5px; line-height: 1.6; color: #9C9277; margin: 18px 0 0; }
        .tc-app { margin-top: 22px; padding: 18px; border-radius: 14px; background: rgba(111,169,139,0.08); border: 1px solid rgba(111,169,139,0.25); }
        .tc-app h3 { margin: 0; font-size: 16px; font-weight: 600; color: #D9C9A3; }
        .tc-app p { margin: 6px 0 0; font-size: 14px; line-height: 1.65; color: #9C9277; }
        .tc-actions { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center; margin-top: 18px; }
        .tc-actions .lp-cta { margin-top: 0; }
        .tc-link { background: none; border: none; padding: 8px 0; min-height: 44px; color: #9C9277; font-size: 14px; text-decoration: underline; cursor: pointer; font-family: inherit; }
      ` }} />
      <div className="tc-wrap">
        <h2 id="lp-typecard" className="lp-serif lp-h2">{c.title}</h2>
        <p className="tc-body">{c.body}</p>

        {!type && <QuickBirthForm locale={locale} t={t} labels={c} submitting={submitting} error={error} onSubmit={submit} idPrefix="lp-tc" />}

        {type && pieces && (
          <div className="tc-card" ref={resultRef} tabIndex={-1} aria-live="polite">
            <p className="tc-eyebrow">{c.resultEyebrow}</p>
            <p className="lp-serif tc-name">{formatSajuTypeName(locale, type)}</p>
            <p className="tc-gloss">{c.gloss}</p>

            <div className="tc-piece">
              <p className="tc-piece-label">{c.archetypeLabel}</p>
              <p className="lp-serif tc-piece-name">{pieces.archetype.name}</p>
              <p className="tc-piece-tag">{pieces.archetype.tagline}</p>
              <p className="tc-piece-text">{pieces.archetype.body}</p>
            </div>

            <div className="tc-piece">
              <p className="tc-piece-label">{c.modeLabel}</p>
              <p className="lp-serif tc-piece-name">{pieces.mode.name}</p>
              <p className="tc-piece-tag">{pieces.mode.tagline}</p>
            </div>

            {celebs.length > 0 && (
              <div className="tc-piece">
                <p className="tc-piece-label">{c.celebritiesLabel}</p>
                {celebs.map((p) => (
                  <div className="tc-celeb" key={p.name}>
                    <p className="tc-celeb-name">{celebModule.celebrityDisplayName(p, locale)}</p>
                    <p className="tc-celeb-meta">{p.field[locale]} · {c.celebrityBirthYear(p.birthYear)}</p>
                  </div>
                ))}
              </div>
            )}

            <p className="tc-note">{c.noTimeNote}</p>

            <div className="tc-app">
              <h3>{c.appTitle}</h3>
              <p>{c.appBody}</p>
            </div>

            <div className="tc-actions">
              <button type="button" className="lp-cta" onClick={onContinue}>
                {c.continueCta} <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </button>
              <button type="button" className="tc-link" onClick={reset}>{c.again}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
