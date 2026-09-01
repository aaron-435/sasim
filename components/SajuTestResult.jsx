"use client";

import React from "react";
import { ArrowLeft, FlaskConical, AlertTriangle } from "lucide-react";

/**
 * SajuTestResult — QA-only screen (components/OnboardingBirthChart.jsx's
 * "사주 테스트용" button routes here via AppFlow.jsx instead of the quiz
 * flow). Dumps everything /api/saju computed, cleanly laid out, so pillar/
 * element accuracy can be eyeballed against a real manseryeok reference
 * without reading raw JSON or running scripts/validate-manseryeok.mts.
 *
 * Props: { birthInput, sajuResult, onBack }
 *   birthInput: { dob, tob, city: {cityDisplay, countryDisplay} | null, isFemale, track }
 *   sajuResult: the full /api/saju response — { elements, dominantElement,
 *     fourPillars, decadeFortune, summary, isSandboxSample, resolvedLocation }
 */

const ELEMENT_LABEL = { wood: "목(木)", fire: "화(火)", earth: "토(土)", metal: "금(金)", water: "수(水)" };
const ELEMENT_COLOR = { wood: "#6FA85C", fire: "#D6714F", earth: "#C9A24B", metal: "#B9B4C4", water: "#5B8FC7" };

function Pillar({ label, pillar }) {
  return (
    <div style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.03)", border: "1px solid #2A2833", borderRadius: "10px", padding: "14px 8px" }}>
      <div style={{ fontSize: "11px", color: "#8B879A", marginBottom: "8px" }}>{label}</div>
      {pillar ? (
        <>
          <div className="ob-serif" style={{ fontSize: "24px", color: "#EDE7DA", fontWeight: 600, marginBottom: "4px" }}>{pillar.full}</div>
          <div style={{ fontSize: "11px", color: "#847E90" }}>{pillar.skyFull} / {pillar.earthFull}</div>
        </>
      ) : (
        <div style={{ fontSize: "13px", color: "#4A4854", marginTop: "10px" }}>모름</div>
      )}
    </div>
  );
}

export default function SajuTestResult({ birthInput, sajuResult, onBack }) {
  if (!sajuResult) return null;
  const { elements, dominantElement, fourPillars, decadeFortune, summary, isSandboxSample, resolvedLocation } = sajuResult;

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .stg-root, .stg-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .ob-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .ob-mono { font-family: 'JetBrains Mono', monospace; }
      `}} />
      <div className="stg-root" style={{ width: "100%", maxWidth: "560px", padding: "28px 20px 64px" }}>
        <button type="button" onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#8B879A", fontSize: "13px", cursor: "pointer", padding: "6px 0", marginBottom: "16px" }}>
          <ArrowLeft size={15} strokeWidth={2} /> 입력 화면으로
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <FlaskConical size={16} strokeWidth={1.75} color="#C9A24B" />
          <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#C9A24B", textTransform: "uppercase" }}>QA / 사주 테스트</span>
        </div>
        <h1 className="ob-serif" style={{ fontSize: "24px", color: "#EDE7DA", margin: "4px 0 18px", fontWeight: 600 }}>
          계산 결과 전체 보기
        </h1>

        {isSandboxSample && (
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", background: "rgba(214,113,79,0.1)", border: "1px solid rgba(214,113,79,0.35)", borderRadius: "10px", padding: "10px 12px", marginBottom: "14px", fontSize: "12.5px", color: "#E0A08D" }}>
            <AlertTriangle size={15} strokeWidth={1.75} style={{ flexShrink: 0, marginTop: "1px" }} />
            이 결과는 SAZU 샌드박스 응답입니다 (자체 엔진이 아니라 폴백 경로를 탔습니다).
          </div>
        )}

        {/* 입력값 + 위치 보정 정보 echo */}
        <Section title="입력값 / 위치 보정">
          <Row label="생년월일" value={birthInput?.dob || "-"} />
          <Row label="태어난 시간" value={birthInput?.tob || "모름"} />
          <Row label="성별" value={birthInput?.isFemale ? "여성" : "남성"} />
          <Row label="출생 도시" value={birthInput?.city ? `${birthInput.city.cityDisplay}, ${birthInput.city.countryDisplay}` : "-"} />
          {resolvedLocation && (
            <>
              <Row label="보정 소스" value={resolvedLocation.source === "worldCity" ? "전세계 도시 DB (정밀)" : "한국 근사 목록 (폴백)"} />
              <Row label="실제 사용된 지점" value={resolvedLocation.cityLabel} />
              <Row label="경도" value={`${resolvedLocation.longitude.toFixed(4)}°`} />
              <Row label="현지 UTC 오프셋(DST 반영)" value={`${resolvedLocation.civilOffsetMinutes >= 0 ? "+" : ""}${resolvedLocation.civilOffsetMinutes}분`} />
            </>
          )}
        </Section>

        {/* 사주 명식 */}
        <Section title="사주 명식 (연/월/일/시주)">
          <div style={{ display: "flex", gap: "8px" }}>
            <Pillar label="연주" pillar={fourPillars?.year} />
            <Pillar label="월주" pillar={fourPillars?.month} />
            <Pillar label="일주" pillar={fourPillars?.day} />
            <Pillar label="시주" pillar={fourPillars?.hour} />
          </div>
        </Section>

        {/* 오행 */}
        <Section title="오행 분포">
          {elements && Object.entries(elements).map(([key, pct]) => (
            <div key={key} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "#C7C3D1", marginBottom: "3px" }}>
                <span>{ELEMENT_LABEL[key]}</span>
                <span className="ob-mono">{pct}%</span>
              </div>
              <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: ELEMENT_COLOR[key] }} />
              </div>
            </div>
          ))}
          <Row label="우세 오행" value={dominantElement ? ELEMENT_LABEL[dominantElement] : "-"} />
        </Section>

        {/* 요약 */}
        {summary && (
          <Section title="요약 (자체 산출 — SAZU 공식과 다름, 참고용)">
            <Row label="일간(日干)" value={`${summary.dayMaster?.char ?? "-"} (${summary.dayMaster?.element ?? "-"})`} />
            <Row label="우세 오행" value={summary.elementBalance?.dominant ?? "-"} />
            <Row label="부족 오행" value={summary.elementBalance?.lacking ?? "-"} />
            <Row label="균형 점수" value={`${summary.elementBalance?.score ?? "-"} / 100`} />
          </Section>
        )}

        {/* 대운 */}
        {decadeFortune && (
          <Section title={`대운 (${decadeFortune.direction}, ${decadeFortune.startAge}세부터)`}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {decadeFortune.list?.map((d) => (
                <div key={d.index} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #2A2833", borderRadius: "8px", padding: "6px 10px", fontSize: "12px", color: "#C7C3D1", textAlign: "center" }}>
                  <div className="ob-mono" style={{ color: "#847E90", fontSize: "10.5px" }}>{d.startAge}세~</div>
                  <div style={{ fontWeight: 600 }}>{d.full}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <p style={{ textAlign: "center", fontSize: "11px", color: "#4A4854", marginTop: "20px" }}>
          이 화면은 QA 전용입니다. 실제 사용자에게는 노출되지 않습니다.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontSize: "11px", color: "#8B879A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1C1B23", fontSize: "13px" }}>
      <span style={{ color: "#847E90" }}>{label}</span>
      <span style={{ color: "#EDE7DA", fontWeight: 500, textAlign: "right" }}>{value}</span>
    </div>
  );
}
