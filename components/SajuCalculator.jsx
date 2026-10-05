"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import QuickBirthForm, { fetchQuickSaju } from "@/components/QuickBirthForm";
import { getDictionary, LOCALES } from "@/lib/i18n";
import { logEvent } from "@/lib/analytics";

/**
 * SajuCalculator — the /saju-calculator tool (SPEC 2026-10-05 §2): birth date + optional hour
 * → the four pillars, the Day Master and the Five Elements balance, computed by the same
 * engine as the app through /api/saju. Everything shown is the engine's output; nothing is
 * interpreted here. The intro and "how it's calculated" copy render on the server so the
 * page has real text for search engines before any input.
 *
 * Language comes from the page's `?lang=` (server), and switching is a plain link so each
 * language has its own crawlable URL.
 */

const LOCALE_LABELS = { ko: "한국어", en: "English", es: "Español" };
const PILLARS = ["year", "month", "day", "hour"];
const ELEMENTS = ["wood", "fire", "earth", "metal", "water"];
const ELEMENT_COLORS = { wood: "#4E8368", fire: "#C1503B", earth: "#B98A4E", metal: "#C7CAD1", water: "#3E6EA0" };
const KO_EL = { 목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water" };
const STEM_HANJA = { 갑: "甲", 을: "乙", 병: "丙", 정: "丁", 무: "戊", 기: "己", 경: "庚", 신: "辛", 임: "壬", 계: "癸" };
const BRANCH_HANJA = { 자: "子", 축: "丑", 인: "寅", 묘: "卯", 진: "辰", 사: "巳", 오: "午", 미: "未", 신: "申", 유: "酉", 술: "戌", 해: "亥" };
const YANG_STEMS = new Set(["갑", "병", "무", "경", "임"]);

function asPillar(p) {
  return p && typeof p.sky === "string" && typeof p.earth === "string" && KO_EL[p.skyElement] && KO_EL[p.earthElement] ? p : null;
}

/** The engine's ElementsResult ({ wood: { total: { percentage } } }) or a flat { wood: 25 } map. */
function percentOf(elements, key) {
  const v = elements?.[key];
  const n = typeof v === "number" ? v : v?.total?.percentage;
  return typeof n === "number" ? n : 0;
}

export default function SajuCalculator({ locale }) {
  const t = getDictionary(locale);
  const c = t.calculator;
  const [hour, setHour] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const resultRef = React.useRef(null);

  const submit = async (dob) => {
    setSubmitting(true);
    setError(null);
    try {
      const data = await fetchQuickSaju({ ...dob, hour: hour === "" ? null : Number(hour) });
      const pillars = data?.fourPillars;
      if (!asPillar(pillars?.year) || !asPillar(pillars?.month) || !asPillar(pillars?.day)) throw new Error("shape");
      setResult({ pillars, elements: data.elements, hourKnown: hour !== "" });
      logEvent("type_reveal_view", { surface: "calculator", ...(data.sajuType?.code ? { kind: data.sajuType.code } : {}) }, locale);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setError(t.typeCard.error);
    } finally {
      setSubmitting(false);
    }
  };

  const hourField = (
    <div>
      <label className="qb-label" htmlFor="calc-hour">{c.hourLabel}</label>
      <select id="calc-hour" className="qb-select" value={hour} onChange={(e) => setHour(e.target.value)}>
        <option value="">{c.hourUnknown}</option>
        {Array.from({ length: 24 }, (_, h) => (
          <option key={h} value={String(h)}>{c.hourOption(h)}</option>
        ))}
      </select>
    </div>
  );

  const dayStem = result ? result.pillars.day.sky : null;
  const dayElement = result ? KO_EL[result.pillars.day.skyElement] : null;
  const maxPercent = result ? Math.max(...ELEMENTS.map((k) => percentOf(result.elements, k))) : 0;

  return (
    <main className="sc-root" lang={locale}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=Noto+Serif+TC:wght@500&display=swap');
        .sc-root, .sc-root * { box-sizing: border-box; }
        .sc-root { min-height: 100vh; background: #122019; color: #D9C9A3; font-family: 'Manrope', 'Noto Sans KR', sans-serif; padding-bottom: 64px; }
        .sc-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; font-weight: 500; }
        .sc-wrap { width: 100%; max-width: 720px; margin: 0 auto; padding: 0 16px; }
        .sc-header { display: flex; align-items: center; justify-content: space-between; padding-top: 22px; gap: 12px; flex-wrap: wrap; }
        .sc-brand { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; letter-spacing: 0.16em; color: #6FA98B; text-transform: uppercase; text-decoration: none; min-height: 32px; }
        .sc-langs { display: flex; gap: 6px; }
        .sc-lang { border: 1px solid #26332B; color: #9C9277; border-radius: 999px; padding: 6px 12px; font-size: 12px; min-height: 32px; display: inline-flex; align-items: center; text-decoration: none; }
        .sc-lang[aria-current="page"] { background: rgba(111,169,139,0.14); border-color: rgba(111,169,139,0.4); color: #6FA98B; }
        .sc-h1 { font-size: clamp(34px, 6.4vw, 52px); line-height: 1.12; margin: 48px 0 0; }
        .sc-lead { font-size: 16.5px; line-height: 1.7; color: #9C9277; margin: 16px 0 28px; }
        .sc-section { margin-top: 36px; padding-top: 28px; border-top: 1px solid #26332B; }
        .sc-section:focus { outline: none; }
        .sc-h2 { font-size: clamp(24px, 4vw, 30px); line-height: 1.2; margin: 0 0 18px; }
        .sc-pillars { width: 100%; border-collapse: separate; border-spacing: 8px 8px; table-layout: fixed; margin: 0 -8px; width: calc(100% + 16px); }
        .sc-pillars th { font-size: 12.5px; font-weight: 600; color: #9C9277; text-align: center; padding-bottom: 2px; }
        .sc-cell { background: #16261d; border: 1px solid #26332B; border-radius: 12px; text-align: center; padding: 12px 4px; vertical-align: middle; }
        .sc-cell.sc-me { border-color: #6FA98B; }
        .sc-hanja { font-family: 'Noto Serif TC', serif; font-size: clamp(26px, 7vw, 34px); line-height: 1.1; display: block; }
        .sc-reading { font-size: 12px; color: #9C9277; display: block; margin-top: 4px; }
        .sc-el { font-size: 12.5px; font-weight: 600; display: block; margin-top: 4px; }
        .sc-empty { font-size: 12px; color: #9C9277; }
        .sc-me-tag { display: inline-block; font-size: 11px; font-weight: 700; color: #0F1A15; background: #6FA98B; border-radius: 999px; padding: 1px 8px; margin-top: 6px; }
        .sc-rowlabels { font-size: 12.5px; color: #9C9277; margin: 4px 0 0; }
        .sc-dm { display: flex; align-items: center; gap: 16px; }
        .sc-dm-hanja { font-family: 'Noto Serif TC', serif; font-size: 44px; line-height: 1; width: 72px; height: 72px; border-radius: 50%; border: 1px solid #6FA98B; display: flex; align-items: center; justify-content: center; flex: none; }
        .sc-dm-line { font-size: 20px; font-weight: 600; margin: 0; }
        .sc-dm-note { font-size: 14px; line-height: 1.65; color: #9C9277; margin: 6px 0 0; }
        .sc-bar-row { display: flex; align-items: center; gap: 10px; margin-top: 12px; font-size: 14px; }
        .sc-bar-name { width: 64px; }
        .sc-bar-track { flex: 1; height: 10px; border-radius: 5px; background: rgba(217,201,163,0.12); overflow: hidden; }
        .sc-bar-fill { display: block; height: 100%; border-radius: 5px; }
        .sc-bar-val { width: 52px; text-align: right; color: #9C9277; font-variant-numeric: tabular-nums; }
        .sc-bar-row.sc-top .sc-bar-name, .sc-bar-row.sc-top .sc-bar-val { color: #D9C9A3; font-weight: 700; }
        .sc-note { font-size: 13px; line-height: 1.65; color: #9C9277; margin: 18px 0 0; }
        .sc-text { font-size: 15px; line-height: 1.75; color: #9C9277; margin: 0; }
        .sc-app { margin-top: 36px; padding: 20px; border-radius: 16px; background: rgba(111,169,139,0.08); border: 1px solid rgba(111,169,139,0.25); }
        .sc-app h2 { margin: 0; font-size: 18px; font-weight: 600; }
        .sc-app p { margin: 8px 0 0; font-size: 14.5px; line-height: 1.7; color: #9C9277; }
        .sc-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; background: #6FA98B; color: #0F1A15; border-radius: 12px; padding: 0 22px; min-height: 48px; font-size: 15px; font-weight: 700; text-decoration: none; }
        .sc-root a:focus-visible, .sc-root select:focus-visible { outline: 2px solid #6FA98B; outline-offset: 3px; }
      ` }} />
      <div className="sc-wrap">
        <header className="sc-header">
          <a className="sc-brand" href="/"><Sparkles size={13} strokeWidth={1.75} aria-hidden="true" />{t.common.brand}</a>
          <nav className="sc-langs" aria-label={t.landing.langLabel}>
            {LOCALES.map((code) => (
              <a key={code} className="sc-lang" href={code === "en" ? "/saju-calculator" : `/saju-calculator?lang=${code}`} hrefLang={code} aria-current={code === locale ? "page" : undefined}>
                {LOCALE_LABELS[code]}
              </a>
            ))}
          </nav>
        </header>

        <h1 className="sc-serif sc-h1">{c.title}</h1>
        <p className="sc-lead">{c.lead}</p>

        <QuickBirthForm locale={locale} t={t} labels={{ ...t.typeCard, submit: c.submit }} submitting={submitting} error={error} onSubmit={submit} hourField={hourField} idPrefix="calc" />

        {result && (
          <div ref={resultRef} tabIndex={-1} className="sc-section" aria-live="polite">
            <h2 className="sc-serif sc-h2">{c.pillarsTitle}</h2>
            <table className="sc-pillars">
              <thead>
                <tr>
                  {PILLARS.map((key) => (
                    <th key={key} scope="col">{c.pillarNames[key]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { row: "stem" },
                  { row: "branch" },
                ].map(({ row }) => (
                  <tr key={row}>
                    {PILLARS.map((key) => {
                      const p = asPillar(result.pillars[key]);
                      if (!p) {
                        return (
                          <td key={key} className="sc-cell">
                            <span className="sc-empty">{row === "stem" ? c.unknownHour : "—"}</span>
                          </td>
                        );
                      }
                      const char = row === "stem" ? p.sky : p.earth;
                      const el = KO_EL[row === "stem" ? p.skyElement : p.earthElement];
                      const me = key === "day" && row === "stem";
                      return (
                        <td key={key} className={`sc-cell${me ? " sc-me" : ""}`}>
                          <span className="sc-hanja" lang="zh-Hant">{row === "stem" ? STEM_HANJA[char] : BRANCH_HANJA[char]}</span>
                          {locale === "ko" && <span className="sc-reading">{char}</span>}
                          <span className="sc-el" style={{ color: ELEMENT_COLORS[el] }}>{c.elementNames[el]}</span>
                          {me && <span className="sc-me-tag">{c.dayMasterTitle}</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="sc-rowlabels">{c.rowsLegend}</p>

            <div className="sc-section">
              <h2 className="sc-serif sc-h2">{c.dayMasterTitle}</h2>
              <div className="sc-dm">
                <span className="sc-dm-hanja" lang="zh-Hant" style={{ color: ELEMENT_COLORS[dayElement] }}>{STEM_HANJA[dayStem]}</span>
                <div>
                  <p className="sc-dm-line">{c.dayMasterLine(YANG_STEMS.has(dayStem) ? c.yang : c.yin, c.elementNames[dayElement])}</p>
                  <p className="sc-dm-note">{c.dayMasterNote}</p>
                </div>
              </div>
            </div>

            <div className="sc-section">
              <h2 className="sc-serif sc-h2">{c.elementsTitle}</h2>
              {ELEMENTS.map((k) => {
                const pct = percentOf(result.elements, k);
                return (
                  <div className={`sc-bar-row${pct === maxPercent && pct > 0 ? " sc-top" : ""}`} key={k}>
                    <span className="sc-bar-name">{c.elementNames[k]}</span>
                    <span className="sc-bar-track"><span className="sc-bar-fill" style={{ width: `${pct}%`, background: ELEMENT_COLORS[k] }} /></span>
                    <span className="sc-bar-val">{Math.round(pct)}%</span>
                  </div>
                );
              })}
              {result.hourKnown && <p className="sc-note">{c.cityNote}</p>}
            </div>
          </div>
        )}

        <section className="sc-app" aria-labelledby="sc-app-title">
          <h2 id="sc-app-title">{c.appTitle}</h2>
          <p>{c.appBody}</p>
          <a className="sc-cta" href="/">{c.homeCta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></a>
        </section>

        <section className="sc-section" aria-labelledby="sc-how">
          <h2 id="sc-how" className="sc-serif sc-h2">{c.howTitle}</h2>
          <p className="sc-text">{c.howBody}</p>
        </section>
      </div>
    </main>
  );
}
