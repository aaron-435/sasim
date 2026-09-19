"use client";

import React from "react";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { useStrings, useLocale, LOCALES } from "@/lib/i18n";
import { trackLandingCtaClick } from "@/lib/analytics";

/**
 * Landing — the first thing an ad visitor sees (added 2026-09-19). Web's job is lead-gen:
 * get a visitor from an ad to "see my chart" in as few steps as possible, then hand off to
 * the app. So: one primary action repeated (top, bottom, sticky on phones), a sample of
 * what they'd get, the answer to "is this real / is it free / what happens to my data",
 * and nothing that can't be backed up.
 *
 * Deliberately NOT here (see PRODUCT.md): testimonials, user counts, ratings or awards —
 * none exist, and we don't invent them. The report sample is labelled as a fictional
 * person's. No countdowns, no scarcity. No payment surface (purchases live in the app).
 */

const LOCALE_LABELS = { ko: "한국어", en: "English", es: "Español" };
const ELEMENT_COLORS = ["#4E8368", "#C1503B", "#B98A4E", "#C7CAD1", "#3E6EA0"];
const SAMPLE_PERCENT = [30, 10, 15, 25, 20];

export default function Landing({ onStart }) {
  const t = useStrings();
  const { locale, setLocale } = useLocale();
  const l = t.landing;

  const start = (position) => {
    trackLandingCtaClick(position);
    onStart();
  };

  const legalNotice = (
    <p className="lp-legal">
      {t.onboarding.freeNote}
      <br />
      {t.onboarding.ageNoticePrefix}{" "}
      <a href={`/terms?lang=${locale}`} target="_blank" rel="noopener noreferrer">{t.onboarding.termsLinkLabel}</a>
      {" "}{t.onboarding.ageNoticeAnd}{" "}
      <a href={`/privacy?lang=${locale}`} target="_blank" rel="noopener noreferrer">{t.onboarding.privacyLinkLabel}</a>
      {t.onboarding.ageNoticeSuffix}
    </p>
  );

  return (
    <div className="lp-root">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .lp-root, .lp-root * { box-sizing: border-box; }
        .lp-root { min-height: 100vh; background: #122019; color: #D9C9A3; font-family: 'Manrope', 'Noto Sans KR', sans-serif; padding-bottom: 96px; }
        .lp-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; font-weight: 500; }
        .lp-wrap { width: 100%; max-width: 1040px; margin: 0 auto; padding: 0 22px; }
        .lp-header { display: flex; align-items: center; justify-content: space-between; padding-top: 22px; gap: 12px; flex-wrap: wrap; }
        .lp-brand { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; letter-spacing: 0.16em; color: #6FA98B; text-transform: uppercase; }
        .lp-langs { display: flex; gap: 6px; }
        .lp-lang { background: transparent; border: 1px solid #26332B; color: #9C9277; border-radius: 999px; padding: 6px 12px; font-size: 12px; cursor: pointer; min-height: 32px; }
        .lp-lang[aria-pressed="true"] { background: rgba(111,169,139,0.14); border-color: rgba(111,169,139,0.4); color: #6FA98B; }
        .lp-hero { padding: 72px 0 56px; max-width: 720px; }
        .lp-h1 { font-size: clamp(34px, 6.4vw, 56px); line-height: 1.12; margin: 0; }
        .lp-lead { font-size: 17px; line-height: 1.7; color: #9C9277; margin: 22px 0 0; max-width: 560px; }
        .lp-cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #6FA98B; color: #0F1A15; border: none; border-radius: 12px; padding: 0 26px; min-height: 56px; font-size: 16px; font-weight: 700; cursor: pointer; margin-top: 32px; font-family: inherit; }
        .lp-cta:hover { background: #7db89a; }
        .lp-note { font-size: 13.5px; color: #9C9277; margin: 14px 0 0; }
        .lp-trust { font-size: 13.5px; color: #6FA98B; margin: 10px 0 0; }
        .lp-section { padding: 48px 0; border-top: 1px solid #26332B; }
        .lp-h2 { font-size: clamp(26px, 4vw, 34px); line-height: 1.2; margin: 0 0 24px; }
        .lp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
        .lp-card { background: rgba(255,255,255,0.03); border: 1px solid #26332B; border-radius: 16px; padding: 22px; }
        .lp-card h3 { margin: 0 0 8px; font-size: 17px; font-weight: 600; color: #D9C9A3; }
        .lp-card p { margin: 0; font-size: 14.5px; line-height: 1.65; color: #9C9277; }
        .lp-small { font-size: 13px; color: #9C9277; margin: 16px 0 0; }
        .lp-pages { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; }
        .lp-page { background: #16261d; border: 1px solid #26332B; border-radius: 14px; padding: 20px; min-height: 280px; position: relative; overflow: hidden; }
        .lp-page-label { font-size: 12px; font-weight: 600; color: #6FA98B; margin: 0 0 12px; }
        .lp-page-text { font-size: 15px; line-height: 1.75; color: #D9C9A3; margin: 0; }
        .lp-bar-row { display: flex; align-items: center; gap: 10px; margin-top: 12px; font-size: 13px; color: #D9C9A3; }
        .lp-bar-name { width: 52px; }
        .lp-bar-track { flex: 1; height: 8px; border-radius: 4px; background: rgba(217,201,163,0.14); overflow: hidden; }
        .lp-bar-fill { height: 100%; border-radius: 4px; }
        .lp-bar-val { width: 36px; text-align: right; color: #9C9277; font-variant-numeric: tabular-nums; }
        .lp-skel { height: 10px; border-radius: 5px; background: rgba(217,201,163,0.12); margin-top: 12px; }
        .lp-locked { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: rgba(18,32,25,0.72); color: #D9C9A3; font-size: 14px; font-weight: 600; }
        .lp-steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; counter-reset: step; }
        .lp-step { display: flex; gap: 14px; align-items: flex-start; font-size: 16px; line-height: 1.6; }
        .lp-step-n { flex: none; width: 30px; height: 30px; border-radius: 50%; border: 1px solid rgba(111,169,139,0.5); color: #6FA98B; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; }
        .lp-faq details { border-top: 1px solid #26332B; padding: 16px 0; }
        .lp-faq details:last-child { border-bottom: 1px solid #26332B; }
        .lp-faq summary { cursor: pointer; font-size: 16px; font-weight: 600; color: #D9C9A3; list-style: none; min-height: 32px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .lp-faq summary::-webkit-details-marker { display: none; }
        .lp-faq summary::after { content: "+"; color: #6FA98B; font-size: 22px; line-height: 1; }
        .lp-faq details[open] summary::after { content: "−"; }
        .lp-faq p { margin: 10px 0 0; font-size: 14.5px; line-height: 1.7; color: #9C9277; max-width: 680px; }
        .lp-bottom { text-align: left; }
        .lp-legal { font-size: 12px; line-height: 1.8; color: #9C9277; margin: 20px 0 0; }
        .lp-legal a { color: #9C9277; text-decoration: underline; }
        .lp-sticky { position: fixed; left: 0; right: 0; bottom: 0; padding: 12px 22px calc(12px + env(safe-area-inset-bottom)); background: rgba(18,32,25,0.94); border-top: 1px solid #26332B; display: none; z-index: 20; }
        .lp-sticky .lp-cta { width: 100%; margin: 0; }
        @media (max-width: 640px) { .lp-sticky { display: block; } .lp-hero { padding: 44px 0 40px; } }
        .lp-root button:focus-visible, .lp-root a:focus-visible, .lp-root summary:focus-visible { outline: 2px solid #6FA98B; outline-offset: 3px; }
      ` }} />

      <div className="lp-wrap">
        <header className="lp-header">
          <span className="lp-brand"><Sparkles size={13} strokeWidth={1.75} aria-hidden="true" />{t.common.brand}</span>
          <div className="lp-langs" role="group" aria-label={l.langLabel}>
            {LOCALES.map((code) => (
              <button key={code} type="button" className="lp-lang" aria-pressed={code === locale} onClick={() => setLocale(code)}>
                {LOCALE_LABELS[code]}
              </button>
            ))}
          </div>
        </header>

        <section className="lp-hero">
          <h1 className="lp-serif lp-h1">
            {l.heroTitle.split("\n").map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h1>
          <p className="lp-lead">{l.heroBody}</p>
          <button type="button" className="lp-cta" onClick={() => start("hero")}>
            {l.cta} <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </button>
          <p className="lp-note">{l.ctaNote}</p>
          <p className="lp-trust">{l.trust}</p>
        </section>

        <section className="lp-section" aria-labelledby="lp-features">
          <h2 id="lp-features" className="lp-serif lp-h2">{l.featuresTitle}</h2>
          <div className="lp-grid">
            {l.features.map((f) => (
              <div className="lp-card" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <p className="lp-small">{l.featuresAppNote}</p>
        </section>

        <section className="lp-section" aria-labelledby="lp-sample">
          <h2 id="lp-sample" className="lp-serif lp-h2">{l.sampleTitle}</h2>
          <div className="lp-pages">
            <div className="lp-page">
              <p className="lp-page-label">{l.samplePage1Label}</p>
              <p className="lp-page-text lp-serif" style={{ fontSize: "18px" }}>{l.samplePage1Body}</p>
            </div>
            <div className="lp-page">
              <p className="lp-page-label">{l.samplePage2Label}</p>
              {l.elementNames.map((name, i) => (
                <div className="lp-bar-row" key={name}>
                  <span className="lp-bar-name">{name}</span>
                  <span className="lp-bar-track"><span className="lp-bar-fill" style={{ display: "block", width: `${SAMPLE_PERCENT[i]}%`, background: ELEMENT_COLORS[i] }} /></span>
                  <span className="lp-bar-val">{SAMPLE_PERCENT[i]}%</span>
                </div>
              ))}
            </div>
            <div className="lp-page">
              <p className="lp-page-label">{l.samplePage3Label}</p>
              <div className="lp-skel" style={{ width: "92%" }} />
              <div className="lp-skel" style={{ width: "84%" }} />
              <div className="lp-skel" style={{ width: "90%" }} />
              <div className="lp-skel" style={{ width: "62%" }} />
              <div className="lp-locked"><Lock size={20} strokeWidth={1.75} aria-hidden="true" />{l.samplePage3Locked}</div>
            </div>
          </div>
          <p className="lp-small">{l.sampleNote}</p>
        </section>

        <section className="lp-section" aria-labelledby="lp-steps">
          <h2 id="lp-steps" className="lp-serif lp-h2">{l.stepsTitle}</h2>
          <ol className="lp-steps">
            {l.steps.map((s, i) => (
              <li className="lp-step" key={i}><span className="lp-step-n" aria-hidden="true">{i + 1}</span><span>{s}</span></li>
            ))}
          </ol>
        </section>

        <section className="lp-section lp-faq" aria-labelledby="lp-faq">
          <h2 id="lp-faq" className="lp-serif lp-h2">{l.faqTitle}</h2>
          {l.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className="lp-section lp-bottom">
          <h2 className="lp-serif lp-h2">{l.bottomTitle}</h2>
          <button type="button" className="lp-cta" style={{ marginTop: 0 }} onClick={() => start("bottom")}>
            {l.cta} <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </button>
          <p className="lp-note">{l.ctaNote}</p>
          {legalNotice}
          <p className="lp-small">{l.appNote}</p>
        </section>
      </div>

      <div className="lp-sticky">
        <button type="button" className="lp-cta" onClick={() => start("sticky")}>
          {l.cta} <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
