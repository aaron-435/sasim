"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft, HelpCircle, Sparkles, FlaskConical } from "lucide-react";
import LoadingReveal from "./LoadingReveal";
import ErrorNotice from "./ErrorNotice";
import { useStrings } from "@/lib/i18n";

const MIN_LOADING_MS = 2400;

/**
 * OnboardingWizard — one-field-per-screen onboarding, replacing the old
 * single-page OnboardingBirthChart form (2026-09-04 redesign).
 * ------------------------------------------------------------------
 * Rationale: benchmarking Co-Star/Wysa/디스턴싱 showed the same lesson —
 * splitting a form into one topic per screen lowers perceived effort
 * even when the total input is identical. Steps:
 *
 *   0 intro    — hook + small ToS/age notice tucked under the CTA
 *                (Wysa pattern: put legal text on the screen people
 *                tap through on autopilot, not a separate "I agree" gate)
 *   1 nickname — new field, not persisted to Supabase yet (no column
 *                on `sessions` for it) — carried client-side in
 *                birthInput for future personalization (chat/report
 *                greetings) once that's wired up.
 *   2 gender   — was inline on the old single page; split out because
 *                the calc genuinely needs it (대운 순행/역행), even
 *                though it wasn't in the 5-step list this replaces —
 *                there's no way to drop it.
 *   3 dob
 *   4 tob      — 12h hour/minute text inputs + explicit 오전/오후
 *                buttons (2026-09-04: replaced the native
 *                <input type="time">, whose AM/PM handling is
 *                inconsistent across browsers/locales) plus the
 *                "모름" escape hatch. to24HourString() converts to
 *                the "HH:MM" 24h string /api/saju expects.
 *   5 city     — same Skyscanner-style ~4800-city autocomplete as
 *                before, now with a small OpenStreetMap embed (no
 *                API key needed) confirming the pin once a result is
 *                picked — /api/cities/search started returning
 *                lat/lng for this. This step also fires the actual
 *                /api/saju call and both submit buttons (real + QA
 *                test).
 *
 * Steps 1-5 share a StepShell (back arrow + thin progress bar); step 0
 * is a distinct cover screen with no chrome, matching Wysa's actual
 * first screen.
 *
 * NOTE — track (romance/career) toggle from the old single page is
 * dropped from this shared wizard on purpose: it wasn't part of the
 * 5-step spec this replaces, and post-city routing is meant to split
 * by which web funnel (ad campaign) the user arrived through, not by
 * a manual toggle. Defaulted to "romance" below until that dual-funnel
 * branching is actually built — see AppFlow.jsx.
 *
 * Props / callback shapes are UNCHANGED from OnboardingBirthChart so
 * AppFlow.jsx only needed a one-line swap:
 *   onComplete({ birthInput, sajuResult, track })
 *   onTestSaju({ birthInput, sajuResult })
 * ------------------------------------------------------------------
 */

const TRACK_DEFAULT = "romance";

const ZODIAC = [
  { nameKey: "capricorn", symbol: "♑", from: [12, 22], to: [1, 19] },
  { nameKey: "aquarius", symbol: "♒", from: [1, 20], to: [2, 18] },
  { nameKey: "pisces", symbol: "♓", from: [2, 19], to: [3, 20] },
  { nameKey: "aries", symbol: "♈", from: [3, 21], to: [4, 19] },
  { nameKey: "taurus", symbol: "♉", from: [4, 20], to: [5, 20] },
  { nameKey: "gemini", symbol: "♊", from: [5, 21], to: [6, 20] },
  { nameKey: "cancer", symbol: "♋", from: [6, 21], to: [7, 22] },
  { nameKey: "leo", symbol: "♌", from: [7, 23], to: [8, 22] },
  { nameKey: "virgo", symbol: "♍", from: [8, 23], to: [9, 22] },
  { nameKey: "libra", symbol: "♎", from: [9, 23], to: [10, 22] },
  { nameKey: "scorpio", symbol: "♏", from: [10, 23], to: [11, 21] },
  { nameKey: "sagittarius", symbol: "♐", from: [11, 22], to: [12, 21] },
];

// 12h (hour/minute/AM·PM buttons) -> "HH:MM" 24h string the API expects.
function to24HourString(hour12, minuteInput, period) {
  const h = parseInt(hour12, 10);
  const m = parseInt(minuteInput, 10);
  if (!Number.isInteger(h) || h < 1 || h > 12 || !Number.isInteger(m) || m < 0 || m > 59 || !period) return "";
  const h24 = period === "PM" ? (h % 12) + 12 : h % 12;
  return `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

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

const STEP_IDS = ["intro", "nickname", "gender", "dob", "tob", "city"];
const PROGRESS_STEP_IDS = STEP_IDS.slice(1); // intro has no progress chrome

export default function OnboardingWizard({ sessionId, onComplete, onTestSaju }) {
  const t = useStrings();
  const [stepIndex, setStepIndex] = useState(0);
  const stepId = STEP_IDS[stepIndex];

  const [nickname, setNickname] = useState("");
  const [isFemale, setIsFemale] = useState(null);
  const [dob, setDob] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [hour12, setHour12] = useState("");
  const [minuteInput, setMinuteInput] = useState("");
  const [period, setPeriod] = useState(null); // "AM" | "PM" | null
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityResults, setCityResults] = useState([]);
  const [cityFocused, setCityFocused] = useState(false);
  const [citySearching, setCitySearching] = useState(false);
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
  const tob = useMemo(() => to24HourString(hour12, minuteInput, period), [hour12, minuteInput, period]);

  useEffect(() => {
    if (stepId !== "city") return;
    if (selectedCity && cityInput === `${selectedCity.cityDisplay}, ${selectedCity.countryDisplay}`) return;
    const seq = ++citySearchSeq.current;
    setCitySearching(true);
    const timer = setTimeout(async () => {
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
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityInput, stepId]);

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
        track: TRACK_DEFAULT,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      const kind = res.status === 429 || res.status === 503 ? "network" : "server";
      throw Object.assign(new Error(json.error || t.onboarding.errorDefault), { kind });
    }
    return json;
  }, [parsedDate, selectedCity, isFemale, tob, timeUnknown, sessionId, t]);

  const birthInputPayload = () => ({
    nickname: nickname.trim(),
    dob,
    tob: timeUnknown ? null : tob,
    city: selectedCity,
    isFemale,
    track: TRACK_DEFAULT,
  });

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
      onComplete?.({ birthInput: birthInputPayload(), sajuResult: json, track: TRACK_DEFAULT });
    } catch (err) {
      setApiError({ kind: err?.kind ?? "network", message: err?.message || t.onboarding.errorNetwork });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSajuCalculation, onComplete, t]);

  const handleTestSaju = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const json = await runSajuCalculation();
      if (!json) return;
      onTestSaju?.({ birthInput: birthInputPayload(), sajuResult: json });
    } catch (err) {
      setApiError({ kind: err?.kind ?? "network", message: err?.message || t.onboarding.errorNetwork });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSajuCalculation, onTestSaju, t]);

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEP_IDS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const canProceed = {
    nickname: nickname.trim().length > 0,
    gender: isFemale !== null,
    dob: Boolean(dob),
    tob: timeUnknown || Boolean(tob),
    city: Boolean(selectedCity) && !loading,
  }[stepId];

  const handleEnter = (e) => {
    if (e.key === "Enter" && canProceed) goNext();
  };

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
        .ob-gender-btn { flex: 1; padding: 15px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; min-height: 52px; }
        .ob-fade-in { animation: obFade 0.32s ease both; }
        @keyframes obFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .ob-root button:focus-visible, .ob-root input:focus-visible, .ob-root a:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
        .ob-cta { width: 100%; padding: 16px; border-radius: 12px; border: none; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px; }
        .ob-back { background: none; border: none; color: #8B879A; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 8px; margin: -8px 0 0 -8px; font-size: 13px; }
      ` }} />

      <div className="ob-root" style={{ width: "100%", maxWidth: "460px", padding: "40px 22px 64px", display: "flex", flexDirection: "column" }}>
        {stepId !== "intro" && (
          <div style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <button type="button" className="ob-back" onClick={goBack} aria-label={t.onboarding.backButton}>
                <ArrowLeft size={16} strokeWidth={2} /> {t.onboarding.backButton}
              </button>
              <span className="ob-mono" style={{ fontSize: "11px", color: "#6B6775", letterSpacing: "0.08em" }}>
                {t.onboarding.stepOf(PROGRESS_STEP_IDS.indexOf(stepId) + 1, PROGRESS_STEP_IDS.length)}
              </span>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {PROGRESS_STEP_IDS.map((id, i) => (
                <div key={id} style={{
                  flex: 1, height: "3px", borderRadius: "2px",
                  background: i <= PROGRESS_STEP_IDS.indexOf(stepId) ? "#C9A24B" : "#201F28",
                  transition: "background 0.25s ease",
                }} />
              ))}
            </div>
          </div>
        )}

        {stepId === "intro" && (
          <div className="ob-fade-in" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ textAlign: "center", marginTop: "12vh" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.16em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "16px" }}>
                <Sparkles size={12} strokeWidth={1.75} />
                {t.common.brand}
              </div>
              <h1 className="ob-serif" style={{ fontSize: "34px", fontWeight: 500, color: "#EDE7DA", margin: 0, lineHeight: 1.25 }}>
                {t.onboarding.headlineLine1}<br />{t.onboarding.headlineLine2}
              </h1>
              <p style={{ fontSize: "14.5px", color: "#9C97A6", margin: "16px 0 0", lineHeight: 1.65 }}>
                {t.onboarding.subheadline}
              </p>
            </div>

            <div style={{ flex: 1, minHeight: "8vh" }} />

            <button type="button" className="ob-cta" onClick={goNext}
              style={{ background: "#C9A24B", color: "#100F16" }}>
              {t.onboarding.introStartButton} <ArrowRight size={17} strokeWidth={2.25} />
            </button>

            <p style={{ textAlign: "center", fontSize: "11px", color: "#847E90", marginTop: "14px", lineHeight: 1.7 }}>
              {t.onboarding.freeNote}
              <br />
              {t.onboarding.ageNoticePrefix}{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#847E90", textDecoration: "underline" }}>{t.onboarding.termsLinkLabel}</a>
              {" "}{t.onboarding.ageNoticeAnd}{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#847E90", textDecoration: "underline" }}>{t.onboarding.privacyLinkLabel}</a>
              {t.onboarding.ageNoticeSuffix}
            </p>
          </div>
        )}

        {stepId === "nickname" && (
          <div className="ob-fade-in" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ marginTop: "6vh" }}>
              <h2 className="ob-serif" style={{ fontSize: "26px", fontWeight: 500, color: "#EDE7DA", margin: 0 }}>{t.onboarding.labelNickname}</h2>
              <p style={{ fontSize: "13.5px", color: "#9C97A6", margin: "10px 0 24px" }}>{t.onboarding.nicknameSubtext}</p>
              <input type="text" className="ob-input" style={{ paddingLeft: "16px" }} autoFocus
                placeholder={t.onboarding.nicknamePlaceholder} value={nickname}
                onChange={(e) => setNickname(e.target.value)} onKeyDown={handleEnter} maxLength={20} />
            </div>
            <div style={{ flex: 1, minHeight: "6vh" }} />
            <NextButton disabled={!canProceed} onClick={goNext} label={t.onboarding.nextButton} />
          </div>
        )}

        {stepId === "gender" && (
          <div className="ob-fade-in" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ marginTop: "6vh" }}>
              <h2 className="ob-serif" style={{ fontSize: "26px", fontWeight: 500, color: "#EDE7DA", margin: 0 }}>{t.onboarding.labelGender}</h2>
              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
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
            <div style={{ flex: 1, minHeight: "6vh" }} />
            <NextButton disabled={!canProceed} onClick={goNext} label={t.onboarding.nextButton} />
          </div>
        )}

        {stepId === "dob" && (
          <div className="ob-fade-in" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ marginTop: "6vh" }}>
              <h2 className="ob-serif" style={{ fontSize: "26px", fontWeight: 500, color: "#EDE7DA", margin: 0 }}>{t.onboarding.labelDob}</h2>
              <div style={{ position: "relative", marginTop: "24px" }}>
                <Calendar size={17} strokeWidth={1.75} className="ob-field-icon" />
                <input type="date" className="ob-input ob-mono" autoFocus value={dob}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDob(e.target.value)} onKeyDown={handleEnter} />
              </div>
              {zodiac && (
                <div className="ob-fade-in" style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "12px", background: "rgba(201,162,75,0.06)", border: "1px solid rgba(201,162,75,0.25)", borderRadius: "12px", padding: "13px 16px" }}>
                  <span className="ob-serif" style={{ fontSize: "26px", color: "#C9A24B", lineHeight: 1 }}>{zodiac.symbol}</span>
                  <p style={{ fontSize: "13px", color: "#EDE7DA", margin: 0, fontWeight: 600 }}>{t.onboarding.zodiac[zodiac.nameKey]}</p>
                </div>
              )}
            </div>
            <div style={{ flex: 1, minHeight: "6vh" }} />
            <NextButton disabled={!canProceed} onClick={goNext} label={t.onboarding.nextButton} />
          </div>
        )}

        {stepId === "tob" && (
          <div className="ob-fade-in" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ marginTop: "6vh" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="ob-serif" style={{ fontSize: "26px", fontWeight: 500, color: "#EDE7DA", margin: 0 }}>{t.onboarding.labelTob}</h2>
                <button type="button" onClick={() => {
                  setTimeUnknown((v) => !v);
                  if (!timeUnknown) { setHour12(""); setMinuteInput(""); setPeriod(null); }
                }}
                  style={{ background: "none", border: "none", color: timeUnknown ? "#C9A24B" : "#847E90", fontSize: "12.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: "6px 4px" }}>
                  <HelpCircle size={13} strokeWidth={1.75} /> {t.onboarding.unknownTime}
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "24px", opacity: timeUnknown ? 0.35 : 1 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Clock size={17} strokeWidth={1.75} className="ob-field-icon" />
                  <input type="text" inputMode="numeric" className="ob-input ob-mono" autoFocus
                    placeholder={t.onboarding.hourPlaceholder} disabled={timeUnknown}
                    value={hour12} maxLength={2}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, "");
                      if (v === "" || (Number(v) >= 1 && Number(v) <= 12) || v.length < 2) setHour12(v);
                    }}
                    onKeyDown={handleEnter}
                    style={{ textAlign: "center", paddingLeft: "42px", cursor: timeUnknown ? "not-allowed" : "text" }} />
                </div>
                <span className="ob-mono" style={{ color: "#847E90", fontSize: "18px" }}>:</span>
                <input type="text" inputMode="numeric" className="ob-input ob-mono" disabled={timeUnknown}
                  placeholder={t.onboarding.minutePlaceholder} value={minuteInput} maxLength={2}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, "");
                    if (v === "" || (Number(v) >= 0 && Number(v) <= 59) || v.length < 2) setMinuteInput(v);
                  }}
                  onKeyDown={handleEnter}
                  style={{ flex: 1, textAlign: "center", paddingLeft: "14px", cursor: timeUnknown ? "not-allowed" : "text" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px", opacity: timeUnknown ? 0.35 : 1 }}>
                <button type="button" className="ob-gender-btn" disabled={timeUnknown} onClick={() => setPeriod("AM")}
                  style={{ background: period === "AM" ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.03)", color: period === "AM" ? "#C9A24B" : "#8B879A", border: period === "AM" ? "1px solid rgba(201,162,75,0.4)" : "1px solid #2A2833", cursor: timeUnknown ? "not-allowed" : "pointer" }}>
                  {t.onboarding.periodAM}
                </button>
                <button type="button" className="ob-gender-btn" disabled={timeUnknown} onClick={() => setPeriod("PM")}
                  style={{ background: period === "PM" ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.03)", color: period === "PM" ? "#C9A24B" : "#8B879A", border: period === "PM" ? "1px solid rgba(201,162,75,0.4)" : "1px solid #2A2833", cursor: timeUnknown ? "not-allowed" : "pointer" }}>
                  {t.onboarding.periodPM}
                </button>
              </div>
            </div>
            <div style={{ flex: 1, minHeight: "6vh" }} />
            <NextButton disabled={!canProceed} onClick={goNext} label={t.onboarding.nextButton} />
          </div>
        )}

        {stepId === "city" && (
          <div className="ob-fade-in" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ marginTop: "6vh", position: "relative" }}>
              <h2 className="ob-serif" style={{ fontSize: "26px", fontWeight: 500, color: "#EDE7DA", margin: 0 }}>{t.onboarding.labelCity}</h2>
              <div style={{ position: "relative", marginTop: "24px" }}>
                <MapPin size={17} strokeWidth={1.75} className="ob-field-icon" />
                <input type="text" className="ob-input" autoFocus placeholder={t.onboarding.cityPlaceholder} value={cityInput}
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

            {selectedCity && Number.isFinite(selectedCity.lat) && Number.isFinite(selectedCity.lng) && (
              <div className="ob-fade-in" style={{ marginTop: "18px", borderRadius: "12px", overflow: "hidden", border: "1px solid #2A2833" }}>
                <iframe
                  key={selectedCity.id}
                  title={t.onboarding.cityConfirmedPrefix}
                  width="100%" height="180" style={{ display: "block", border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.7)" }}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedCity.lng - 0.35}%2C${selectedCity.lat - 0.2}%2C${selectedCity.lng + 0.35}%2C${selectedCity.lat + 0.2}&layer=mapnik&marker=${selectedCity.lat}%2C${selectedCity.lng}`}
                />
                <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#8B879A" }}>{t.onboarding.cityConfirmedPrefix}</span>
                  <span style={{ fontSize: "13px", color: "#EDE7DA", fontWeight: 600 }}>{selectedCity.cityDisplay}, {selectedCity.countryDisplay}</span>
                </div>
              </div>
            )}

            {apiError && (
              <div className="ob-fade-in" style={{ marginTop: "18px" }}>
                <ErrorNotice kind={apiError.kind} message={apiError.message} onRetry={handleSubmit} />
              </div>
            )}

            <div style={{ flex: 1, minHeight: "6vh" }} />
            <button type="button" disabled={!canProceed} className="ob-cta" onClick={handleSubmit}
              style={{ background: canProceed ? "#C9A24B" : "rgba(255,255,255,0.06)", color: canProceed ? "#100F16" : "#6B6775", cursor: canProceed ? "pointer" : "not-allowed" }}>
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
          </div>
        )}
      </div>
    </div>
  );
}

function NextButton({ disabled, onClick, label }) {
  return (
    <button type="button" disabled={disabled} className="ob-cta" onClick={onClick}
      style={{ background: disabled ? "rgba(255,255,255,0.06)" : "#C9A24B", color: disabled ? "#6B6775" : "#100F16", cursor: disabled ? "not-allowed" : "pointer" }}>
      {label} <ArrowRight size={17} strokeWidth={2.25} />
    </button>
  );
}
