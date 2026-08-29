"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Calendar, Clock, MapPin, Heart, Briefcase, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { BIRTH_CITIES, resolveBirthCity } from "@/lib/birthCities";
import LoadingReveal from "./LoadingReveal";
import ErrorNotice from "./ErrorNotice";

const MIN_LOADING_MS = 2400;

/**
 * OnboardingBirthChart — CONNECTED version
 * ------------------------------------------------------------------
 * Builds on the earlier i18n version. What's new:
 *   1. Real 71-city list (from lib/birthCities.ts) replaces the old
 *      12-city dummy CITY_SUGGESTIONS, grouped by region.
 *   2. resolveBirthCity() imported from lib/birthCities.ts (shared with
 *      the server-side onboarding logic) instead of a local inline copy.
 *   3. On submit, calls POST /api/saju with the resolved city and
 *      shows a loading state, then calls onComplete(result) so a
 *      parent flow component can hand the data to QuizScreen.
 *
 * Props:
 *   onComplete({ birthInput, sajuResult, track }) — called after a
 *   successful /api/saju call. sajuResult is what api/saju/route.ts
 *   returns: { elements, dominantElement, fourPillars, decadeFortune,
 *              timezoneNote, isSandboxSample }.
 * ------------------------------------------------------------------
 */

const ZODIAC = [
  { name: { ko: "염소자리", en: "Capricorn", es: "Capricornio" }, symbol: "♑", from: [12, 22], to: [1, 19], element: "earth" },
  { name: { ko: "물병자리", en: "Aquarius", es: "Acuario" }, symbol: "♒", from: [1, 20], to: [2, 18], element: "metal" },
  { name: { ko: "물고기자리", en: "Pisces", es: "Piscis" }, symbol: "♓", from: [2, 19], to: [3, 20], element: "water" },
  { name: { ko: "양자리", en: "Aries", es: "Aries" }, symbol: "♈", from: [3, 21], to: [4, 19], element: "fire" },
  { name: { ko: "황소자리", en: "Taurus", es: "Tauro" }, symbol: "♉", from: [4, 20], to: [5, 20], element: "earth" },
  { name: { ko: "쌍둥이자리", en: "Gemini", es: "Géminis" }, symbol: "♊", from: [5, 21], to: [6, 20], element: "metal" },
  { name: { ko: "게자리", en: "Cancer", es: "Cáncer" }, symbol: "♋", from: [6, 21], to: [7, 22], element: "water" },
  { name: { ko: "사자자리", en: "Leo", es: "Leo" }, symbol: "♌", from: [7, 23], to: [8, 22], element: "fire" },
  { name: { ko: "처녀자리", en: "Virgo", es: "Virgo" }, symbol: "♍", from: [8, 23], to: [9, 22], element: "earth" },
  { name: { ko: "천칭자리", en: "Libra", es: "Libra" }, symbol: "♎", from: [9, 23], to: [10, 22], element: "metal" },
  { name: { ko: "전갈자리", en: "Scorpio", es: "Escorpio" }, symbol: "♏", from: [10, 23], to: [11, 21], element: "water" },
  { name: { ko: "사수자리", en: "Sagittarius", es: "Sagitario" }, symbol: "♐", from: [11, 22], to: [12, 21], element: "fire" },
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

export default function OnboardingBirthChart({ onComplete }) {
  const locale = "ko";
  const [track, setTrack] = useState("romance");
  const [dob, setDob] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [tob, setTob] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [cityFocused, setCityFocused] = useState(false);
  const [isFemale, setIsFemale] = useState(null); // null = not chosen yet
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const parsedDate = useMemo(() => {
    if (!dob) return null;
    const [y, m, d] = dob.split("-").map(Number);
    if (!y || !m || !d) return null;
    return { month: m, day: d, year: y };
  }, [dob]);

  const zodiac = useMemo(() => (parsedDate ? getZodiac(parsedDate.month, parsedDate.day) : null), [parsedDate]);

  const filteredCities = useMemo(() => {
    if (!cityInput) return BIRTH_CITIES.slice(0, 6);
    const needle = cityInput.toLowerCase();
    return BIRTH_CITIES.filter((c) => c.ko.includes(cityInput) || c.en.toLowerCase().includes(needle)).slice(0, 6);
  }, [cityInput]);

  const canProceed = Boolean(dob && cityInput && isFemale !== null) && !loading;

  const handleSubmit = useCallback(async () => {
    if (!parsedDate || !cityInput || isFemale === null) return;
    setLoading(true);
    setApiError(null);

    const resolvedCity = resolveBirthCity(cityInput);
    const [hh, mm] = tob ? tob.split(":").map(Number) : [null, 0];
    const startedAt = Date.now();

    try {
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
          birthCity: resolvedCity,
          isLunar: false,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        // 429/503 = 일시적 장애(새로고침이 실제로 도움됨). 그 외(422 베타 샘플 제한 등)는
        // 재시도해도 결과가 안 바뀌므로 메시지를 있는 그대로 보여준다.
        const kind = res.status === 429 || res.status === 503 ? "network" : "server";
        setApiError({ kind, message: json.error || "사주 계산에 실패했습니다." });
        setLoading(false);
        return;
      }
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((resolve) => window.setTimeout(resolve, MIN_LOADING_MS - elapsed));
      }
      onComplete?.({
        birthInput: { dob, tob: timeUnknown ? null : tob, cityInput, resolvedCity, isFemale, track },
        sajuResult: json,
        track,
      });
    } catch {
      setApiError({ kind: "network", message: "네트워크 오류로 사주 계산에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  }, [parsedDate, cityInput, isFemale, tob, timeUnknown, dob, track, onComplete]);

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
            Fatesaid
          </div>
          <h1 className="ob-serif" style={{ fontSize: "32px", fontWeight: 500, color: "#EDE7DA", margin: 0, lineHeight: 1.25 }}>
            운명은 이미 말했습니다.<br />이제, 답할 차례는 당신입니다.
          </h1>
          <p style={{ fontSize: "14px", color: "#9C97A6", margin: "14px 0 0", lineHeight: 1.6 }}>
            운명을 바꾸고 싶나요? 사주를 분석하고 지금 시작하세요.
          </p>
        </div>

        {/* Track toggle */}
        <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.02)", border: "1px solid #201F28", borderRadius: "12px", padding: "5px", marginBottom: "20px" }}>
          <button type="button" className="ob-track-btn" onClick={() => setTrack("romance")}
            style={{ background: track === "romance" ? "rgba(193,80,59,0.14)" : "transparent", color: track === "romance" ? "#E08A76" : "#8B879A", border: track === "romance" ? "1px solid rgba(193,80,59,0.4)" : "1px solid transparent" }}>
            <Heart size={15} strokeWidth={2} /> 연애 &amp; 애착
          </button>
          <button type="button" className="ob-track-btn" onClick={() => setTrack("career")}
            style={{ background: track === "career" ? "rgba(62,110,160,0.16)" : "transparent", color: track === "career" ? "#7FA8D6" : "#8B879A", border: track === "career" ? "1px solid rgba(62,110,160,0.4)" : "1px solid transparent" }}>
            <Briefcase size={15} strokeWidth={2} /> 커리어 &amp; 번아웃
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={labelStyle}>생년월일</label>
            <div style={{ position: "relative" }}>
              <Calendar size={17} strokeWidth={1.75} className="ob-field-icon" />
              <input type="date" className="ob-input ob-mono" value={dob} max={new Date().toISOString().split("T")[0]} onChange={(e) => setDob(e.target.value)} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={labelStyle}>태어난 시간</label>
              <button type="button" onClick={() => { setTimeUnknown((v) => !v); if (!timeUnknown) setTob(""); }}
                style={{ background: "none", border: "none", color: timeUnknown ? "#C9A24B" : "#847E90", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: "6px 4px", margin: "-6px -4px" }}>
                <HelpCircle size={12} strokeWidth={1.75} /> 모름
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <Clock size={17} strokeWidth={1.75} className="ob-field-icon" />
              <input type="time" className="ob-input ob-mono" value={tob} disabled={timeUnknown} onChange={(e) => setTob(e.target.value)} style={timeUnknown ? { opacity: 0.35, cursor: "not-allowed" } : undefined} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>성별</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="button" className="ob-gender-btn" onClick={() => setIsFemale(false)}
                style={{ background: isFemale === false ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.03)", color: isFemale === false ? "#C9A24B" : "#8B879A", border: isFemale === false ? "1px solid rgba(201,162,75,0.4)" : "1px solid #2A2833" }}>
                남성
              </button>
              <button type="button" className="ob-gender-btn" onClick={() => setIsFemale(true)}
                style={{ background: isFemale === true ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.03)", color: isFemale === true ? "#C9A24B" : "#8B879A", border: isFemale === true ? "1px solid rgba(201,162,75,0.4)" : "1px solid #2A2833" }}>
                여성
              </button>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <label style={labelStyle}>출생 도시 (71개 도시 지원)</label>
            <div style={{ position: "relative" }}>
              <MapPin size={17} strokeWidth={1.75} className="ob-field-icon" />
              <input type="text" className="ob-input" placeholder="도시 이름을 입력하세요" value={cityInput}
                onChange={(e) => setCityInput(e.target.value)} onFocus={() => setCityFocused(true)}
                onBlur={() => setTimeout(() => setCityFocused(false), 120)} />
            </div>
            {cityFocused && filteredCities.length > 0 && (
              <div className="ob-fade-in" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#131219", border: "1px solid #2A2833", borderRadius: "10px", overflow: "hidden", zIndex: 10, maxHeight: "220px", overflowY: "auto" }}>
                {filteredCities.map((c) => (
                  <div key={c.en} onMouseDown={() => { setCityInput(c.ko); setCityFocused(false); }}
                    style={{ padding: "11px 14px", fontSize: "14px", color: "#C7C3D1", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <span>{c.ko}</span>
                    <span style={{ color: "#847E90", fontSize: "12px" }}>{c.region}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {zodiac && (
          <div className="ob-fade-in" style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "12px", background: "rgba(201,162,75,0.06)", border: "1px solid rgba(201,162,75,0.25)", borderRadius: "12px", padding: "13px 16px" }}>
            <span className="ob-serif" style={{ fontSize: "26px", color: "#C9A24B", lineHeight: 1 }}>{zodiac.symbol}</span>
            <p style={{ fontSize: "13px", color: "#EDE7DA", margin: 0, fontWeight: 600 }}>{zodiac.name[locale]}</p>
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
          내 블루프린트 확인하기 <ArrowRight size={17} strokeWidth={2.25} />
        </button>
        <p style={{ textAlign: "center", fontSize: "11.5px", color: "#847E90", marginTop: "12px" }}>
          무료 10분 리딩 · 신용카드 불필요
        </p>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#847E90", marginTop: "8px", lineHeight: 1.7 }}>
          만 14세 이상만 이용할 수 있으며, 계속 진행 시{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#847E90", textDecoration: "underline" }}>이용약관</a>
          {" "}및{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#847E90", textDecoration: "underline" }}>개인정보처리방침</a>
          에 동의하는 것으로 간주됩니다.
          <br />
          사주 풀이와 심리테스트 결과는 참고용이며, 의학적·심리학적 진단이 아닙니다.
        </p>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "12px", color: "#8B879A", marginBottom: "7px", fontWeight: 600 };
