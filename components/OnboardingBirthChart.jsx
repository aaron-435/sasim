"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Calendar, Clock, MapPin, Heart, Briefcase, ArrowRight, HelpCircle, Sparkles, FlaskConical } from "lucide-react";
import LoadingReveal from "./LoadingReveal";
import ErrorNotice from "./ErrorNotice";
import { useStrings } from "@/lib/i18n";

const MIN_LOADING_MS = 2400;

/**
 * OnboardingBirthChart — CONNECTED version
 * ------------------------------------------------------------------
 * On submit, calls POST /api/saju with the resolved city and shows a
 * loading state, then calls onComplete(result) so a parent flow
 * component can hand the data to QuizScreen.
 *
 * UPDATE 2026-09-01: city field is now a Skyscanner/Agoda-style
 * autocomplete backed by GET /api/cities/search (lib/worldCities.ts,
 * ~4800 cities worldwide with "City, Country" results) instead of the
 * old static 71-city list SAZU happened to support — the self-hosted
 * engine has no reason to inherit that cap. Selecting a result sends
 * its `birthCityId` to /api/saju for a precise lat/lng+timezone lookup;
 * `birthCity` is still sent as a plain display-name fallback.
 *
 * Also added a second "사주 테스트용" button (QA only) that runs the
 * same /api/saju call but routes to SajuTestResult instead of the quiz
 * flow, so pillar/element accuracy can be eyeballed without a live
 * SAZU key or an unrelated dev script.
 *
 * Props:
 *   onComplete({ birthInput, sajuResult, track }) — called after a
 *   successful /api/saju call. sajuResult is what api/saju/route.ts
 *   returns: { elements, dominantElement, fourPillars, decadeFortune,
 *              timezoneNote, isSandboxSample, resolvedLocation }.
 *   onTestSaju({ birthInput, sajuResult }) — same shape, routes to the
 *   QA results screen instead.
 * ------------------------------------------------------------------
 */

// nameKey looks up lib/i18n's onboarding.zodiac dictionary — display name comes
// from useStrings() in the component, not stored here (see ZODIAC's old inline
// ko/en/es object, replaced 2026-09-02 so there's one dictionary, not two).
const ZODIAC = [
  { nameKey: "capricorn", symbol: "♑", from: [12, 22], to: [1, 19], element: "earth" },
  { nameKey: "aquarius", symbol: "♒", from: [1, 20], to: [2, 18], element: "metal" },
  { nameKey: "pisces", symbol: "♓", from: [2, 19], to: [3, 20], element: "water" },
  { nameKey: "aries", symbol: "♈", from: [3, 21], to: [4, 19], element: "fire" },
  { nameKey: "taurus", symbol: "♉", from: [4, 20], to: [5, 20], element: "earth" },
  { nameKey: "gemini", symbol: "♊", from: [5, 21], to: [6, 20], element: "metal" },
  { nameKey: "cancer", symbol: "♋", from: [6, 21], to: [7, 22], element: "water" },
  { nameKey: "leo", symbol: "♌", from: [7, 23], to: [8, 22], element: "fire" },
  { nameKey: "virgo", symbol: "♍", from: [8, 23], to: [9, 22], element: "earth" },
  { nameKey: "libra", symbol: "♎", from: [9, 23], to: [10, 22], element: "metal" },
  { nameKey: "scorpio", symbol: "♏", from: [10, 23], to: [11, 21], element: "water" },
  { nameKey: "sagittarius", symbol: "♐", from: [11, 22], to: [12, 21], element: "fire" },
];

function getZodiac(month, day) {
  if (!month || !day) return null;
  return (
    ZODIAC.find(({ from, to }) => {
      const afterStart = month === from[0] ? day >= from[1] : month > from[0];
      const beforeEnd = month === to[0] ? day <= to[1] : month < to[0];
      if (from[0] > to[0]) return afterStart || beforeEnd;
      return afterStart && beforeEnd;
    }) || null
  );
}

export default function OnboardingBirthChart({ sessionId, onComplete, onTestSaju }) {
  const t = useStrings();
  const [track, setTrack] = useState("romance");
  const [dob, setDob] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [tob, setTob] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState(null); // { id, cityDisplay, countryDisplay } from /api/cities/search
  const [cityResults, setCityResults] = useState([]);
  const [cityFocused, setCityFocused] = useState(false);
  const [citySearching, setCitySearching] = useState(false);
  const [isFemale, setIsFemale] = useState(null); // null = not chosen yet
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const citySearchSeq = useRef(0);

  const parsedDate = useMemo(() => {
    if (!dob) return null;
    const [y, m, d] = dob.split("-").map(Number);
    if (!y || !m || !d) return null;
    return { month: m, day: d, year: y };
  }, [dob]);

  const zodiac = useMemo(() => (parsedDate ? getZodiac(parsedDate.month, parsedDate.day) : null), [parsedDate]);

  // Skyscanner/Agoda 스타일 — 입력 300ms 후 서버에 도시 검색 (전세계 ~4800개, lib/worldCities.ts)
  useEffect(() => {
    if (selectedCity && cityInput === `${selectedCity.cityDisplay}, ${selectedCity.countryDisplay}`) return;
    const seq = ++citySearchSeq.current;
    setCitySearching(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities/search?q=${encodeURIComponent(cityInput)}`);
        const json = await res.json();
        if (citySearchSeq.current === seq) setCityResults(json.results ?? []);
      } catch {
        if (citySearchSeq.current === seq) setCityResults([]);
      } finally {
        if (citySearchSeq.current === seq) setCitySearching(false);
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityInput]);

  const canProceed = Boolean(dob && selectedCity && isFemale !== null) && !loading;

  const runSajuCalculation = useCallback(async () => {
    if (!parsedDate || !selectedCity || isFemale === null) return null;
    const [hh, mm] = tob ? tob.split(":").map(Number) : [null, 0];

    const res = await fetch("/api/saju", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        birthYear: parsedDate.year,
        birthMonth: parsedDate.month,
        birthDay: parsedDate.day,
        birthHour: timeUnknown ? null : hh,
        birthMinute: timeUnknown ? 0 : mm ?? 0,
        isFemale,
        birthCity: selectedCity.cityDisplay,
        birthCityId: selectedCity.id,
        isLunar: false,
        sessionId,
        track,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      const kind = res.status === 429 || res.status === 503 ? "network" : "server";
      throw Object.assign(new Error(json.error || t.onboarding.errorDefault), { kind });
    }
    return json;
  }, [parsedDate, selectedCity, isFemale, tob, timeUnknown, sessionId, track, t]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    const startedAt = Date.now();
    try {
      const json = await runSajuCalculation();
      if (!json) return;
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((resolve) => window.setTimeout(resolve, MIN_LOADING_MS - elapsed));
      }
      onComplete?.({
        birthInput: { dob, tob: timeUnknown ? null : tob, city: selectedCity, isFemale, track },
        sajuResult: json,
        track,
      });
    } catch (err) {
      setApiError({ kind: err?.kind ?? "network", message: err?.message || t.onboarding.errorNetwork });
    } finally {
      setLoading(false);
    }
  }, [runSajuCalculation, dob, tob, timeUnknown, selectedCity, isFemale, track, onComplete, t]);

  const handleTestSaju = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const json = await runSajuCalculation();
      if (!json) return;
      onTestSaju?.({
        birthInput: { dob, tob: timeUnknown ? null : tob, city: selectedCity, isFemale, track },
        sajuResult: json,
      });
    } catch (err) {
      setApiError({ kind: err?.kind ?? "network", message: err?.message || t.onboarding.errorNetwork });
    } finally {
      setLoading(false);
    }
  }, [runSajuCalculation, dob, tob, timeUnknown, selectedCity, isFemale, track, onTestSaju, t]);

  if (loading) return <LoadingReveal />;

  return (
    <div
      style={{
        minHeight: "100vh", width: "100%", background: "#08080C",
        backgroundImage: "radial-gradient(circle at 50% -10%, rgba(201,162,75,0.10), transparent 55%)",
        display: "flex", justifyContent: "center",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .ob-root, .ob-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .ob-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .ob-mono { font-family: 'JetBrains Mono', monospace; }
        .ob-input {
          width: 100%; background: rgba(255,255,255,0.03); border: 1px solid #2A2833; border-radius: 10px;
          color: #EDE7DA; padding: 13px 14px 13px 42px; font-size: 16px; outline: none;
          transition: border-color 0.2s ease, background 0.2s ease; -webkit-appearance: none; appearance: none;
        }
        .ob-input::placeholder { color: #847E90; }
        .ob-input:focus { border-color: #C9A24B; background: rgba(201,162,75,0.05); }
        .ob-field-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #8B879A; pointer-events: none; }
        .ob-track-btn { flex: 1; border: none; background: transparent; padding: 14px 12px; border-radius: 10px; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; font-weight: 600; min-height: 44px; }
        .ob-fade-in { animation: obFade 0.32s ease both; }
        @keyframes obFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .ob-gender-btn { flex: 1; padding: 13px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; min-height: 44px; }
        .ob-root button:focus-visible, .ob-root input:focus-visible, .ob-root a:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
      ` }} />

      <div className="ob-root" style={{ width: "100%", maxWidth: "460px", padding: "40px 22px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.16em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "14px" }}>
            <Sparkles size={12} strokeWidth={1.75} />
            {t.common.brand}
          </div>
          <h1 className="ob-serif" style={{ fontSize: "32px", fontWeight: 500, color: "#EDE7DA", margin: 0, lineHeight: 1.25 }}>
            {t.onboarding.headlineLine1}<br />{t.onboarding.headlineLine2}
          </h1>
          <p style={{ fontSize: "14px", color: "#9C97A6", margin: "14px 0 0", lineHeight: 1.6 }}>
            {t.onboarding.subheadline}
          </p>
        </div>

        {/* Track toggle */}
        <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.02)", border: "1px solid #201F28", borderRadius: "12px", padding: "5px", marginBottom: "20px" }}>
          <button type="button" className="ob-track-btn" onClick={() => setTrack("romance")}
            style={{ background: track === "romance" ? "rgba(193,80,59,0.14)" : "transparent", color: track === "romance" ? "#E08A76" : "#8B879A", border: track === "romance" ? "1px solid rgba(193,80,59,0.4)" : "1px solid transparent" }}>
            <Heart size={15} strokeWidth={2} /> {t.onboarding.trackRomance}
          </button>
          <button type="button" className="ob-track-btn" onClick={() => setTrack("career")}
            style={{ background: track === "career" ? "rgba(62,110,160,0.16)" : "transparent", color: track === "career" ? "#7FA8D6" : "#8B879A", border: track === "career" ? "1px solid rgba(62,110,160,0.4)" : "1px solid transparent" }}>
            <Briefcase size={15} strokeWidth={2} /> {t.onboarding.trackCareer}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={labelStyle}>{t.onboarding.labelDob}</label>
            <div style={{ position: "relative" }}>
              <Calendar size={17} strokeWidth={1.75} className="ob-field-icon" />
              <input type="date" className="ob-input ob-mono" value={dob} max={new Date().toISOString().split("T")[0]} onChange={(e) => setDob(e.target.value)} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={labelStyle}>{t.onboarding.labelTob}</label>
              <button type="button" onClick={() => { setTimeUnknown((v) => !v); if (!timeUnknown) setTob(""); }}
                style={{ background: "none", border: "none", color: timeUnknown ? "#C9A24B" : "#847E90", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: "6px 4px", margin: "-6px -4px" }}>
                <HelpCircle size={12} strokeWidth={1.75} /> {t.onboarding.unknownTime}
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <Clock size={17} strokeWidth={1.75} className="ob-field-icon" />
              <input type="time" className="ob-input ob-mono" value={tob} disabled={timeUnknown} onChange={(e) => setTob(e.target.value)} style={timeUnknown ? { opacity: 0.35, cursor: "not-allowed" } : undefined} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{t.onboarding.labelGender}</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="button" className="ob-gender-btn" onClick={() => setIsFemale(false)}
                style={{ background: isFemale === false ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.03)", color: isFemale === false ? "#C9A24B" : "#8B879A", border: isFemale === false ? "1px solid rgba(201,162,75,0.4)" : "1px solid #2A2833" }}>
                {t.onboarding.male}
              </button>
              <button type="button" className="ob-gender-btn" onClick={() => setIsFemale(true)}
                style={{ background: isFemale === true ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.03)", color: isFemale === true ? "#C9A24B" : "#8B879A", border: isFemale === true ? "1px solid rgba(201,162,75,0.4)" : "1px solid #2A2833" }}>
                {t.onboarding.female}
              </button>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <label style={labelStyle}>{t.onboarding.labelCity}</label>
            <div style={{ position: "relative" }}>
              <MapPin size={17} strokeWidth={1.75} className="ob-field-icon" />
              <input type="text" className="ob-input" placeholder={t.onboarding.cityPlaceholder} value={cityInput}
                onChange={(e) => { setCityInput(e.target.value); setSelectedCity(null); }}
                onFocus={() => setCityFocused(true)}
                onBlur={() => setTimeout(() => setCityFocused(false), 120)} />
            </div>
            {cityFocused && (citySearching || cityResults.length > 0) && (
              <div className="ob-fade-in" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#131219", border: "1px solid #2A2833", borderRadius: "10px", overflow: "hidden", zIndex: 10, maxHeight: "260px", overflowY: "auto" }}>
                {citySearching && cityResults.length === 0 ? (
                  <div style={{ padding: "12px 14px", fontSize: "13px", color: "#847E90" }}>{t.onboarding.citySearching}</div>
                ) : (
                  cityResults.map((c) => (
                    <div key={c.id} onMouseDown={() => { setSelectedCity(c); setCityInput(`${c.cityDisplay}, ${c.countryDisplay}`); setCityFocused(false); }}
                      style={{ padding: "11px 14px", fontSize: "14px", color: "#C7C3D1", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <span>{c.cityDisplay}</span>
                      <span style={{ color: "#847E90", fontSize: "12px" }}>{c.countryDisplay}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {zodiac && (
          <div className="ob-fade-in" style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "12px", background: "rgba(201,162,75,0.06)", border: "1px solid rgba(201,162,75,0.25)", borderRadius: "12px", padding: "13px 16px" }}>
            <span className="ob-serif" style={{ fontSize: "26px", color: "#C9A24B", lineHeight: 1 }}>{zodiac.symbol}</span>
            <p style={{ fontSize: "13px", color: "#EDE7DA", margin: 0, fontWeight: 600 }}>{t.onboarding.zodiac[zodiac.nameKey]}</p>
          </div>
        )}

        {apiError && (
          <div className="ob-fade-in" style={{ marginTop: "14px" }}>
            <ErrorNotice kind={apiError.kind} message={apiError.message} onRetry={handleSubmit} />
          </div>
        )}

        <button type="button" disabled={!canProceed} onClick={handleSubmit}
          style={{
            width: "100%", marginTop: "22px", padding: "16px", borderRadius: "12px", border: "none",
            background: canProceed ? "#C9A24B" : "rgba(255,255,255,0.06)", color: canProceed ? "#100F16" : "#6B6775",
            fontSize: "15px", fontWeight: 700, cursor: canProceed ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "52px",
          }}>
          {t.onboarding.submitButton} <ArrowRight size={17} strokeWidth={2.25} />
        </button>

        {onTestSaju && (
          <button type="button" disabled={!canProceed} onClick={handleTestSaju}
            style={{
              width: "100%", marginTop: "10px", padding: "12px", borderRadius: "10px",
              border: "1px dashed #3A3745", background: "transparent",
              color: canProceed ? "#8B879A" : "#4A4854",
              fontSize: "13px", fontWeight: 600, cursor: canProceed ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", minHeight: "40px",
            }}>
            <FlaskConical size={14} strokeWidth={1.75} /> {t.onboarding.testButton}
          </button>
        )}

        <p style={{ textAlign: "center", fontSize: "11.5px", color: "#847E90", marginTop: "12px" }}>
          {t.onboarding.freeNote}
        </p>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#847E90", marginTop: "8px", lineHeight: 1.7 }}>
          {t.onboarding.ageNoticePrefix}{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#847E90", textDecoration: "underline" }}>{t.onboarding.termsLinkLabel}</a>
          {" "}{t.onboarding.ageNoticeAnd}{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#847E90", textDecoration: "underline" }}>{t.onboarding.privacyLinkLabel}</a>
          {t.onboarding.ageNoticeSuffix}
          <br />
          {t.onboarding.disclaimerNotDiagnosis}
        </p>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "12px", color: "#8B879A", marginBottom: "7px", fontWeight: 600 };
