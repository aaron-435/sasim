"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, BookOpen } from "lucide-react";
import LoadingReveal from "./LoadingReveal";
import ErrorNotice from "./ErrorNotice";
import { useStrings } from "@/lib/i18n";
import { trackReportViewed } from "@/lib/analytics";

/**
 * ReportScreen — GPT-generated deep report, dark mobile theme.
 * ------------------------------------------------------------------
 * 2026-09-09 rewrite: this used to hardcode the entire narrative body as
 * Module 3 (번아웃) copy — see git history — regardless of which of the
 * 11 modules the user actually ran, and two props (nickname, dimensions)
 * weren't even being passed by AppFlow.jsx, so the header always showed
 * the "OOO" placeholder and a dead MBI section always showed the same
 * fixed 78/22/71 sample numbers no matter what. Writing all 11 modules ×
 * outcome combinations by hand isn't practical, so the literary sections
 * (opening scene, case study, saju interpretation, cross-analysis,
 * strengths/weaknesses/fit/behavior/mindset, closing) are now generated
 * per-request by POST /api/report — see lib/reportPrompts.ts for the
 * prompt, which uses the original hand-written Module 3 report as a
 * style/quality anchor.
 *
 * Still NOT generated — these were already fully data-driven and stay
 * that way: the 오행 bars, the psych-test dimension bars (모든 모듈에서
 * 이미 정확히 동작), and the "직접 나눈 이야기" chat-quote block. The old
 * MBI section (하드코딩된 소진/냉소/효능감저하 라벨 + 안 쓰이던 dimensions
 * prop) is removed entirely — it was always module-3-specific and fully
 * redundant with the dimension-bar section above it.
 * ------------------------------------------------------------------
 */

const DEFAULT_ELEMENTS = { fire: 20, earth: 20, wood: 20, metal: 20, water: 20 };
const ELEMENT_COLOR = { wood: "#4E8368", fire: "#C1503B", earth: "#B98A4E", metal: "#C7CAD1", water: "#3E6EA0" };
const DIMENSION_BAR_COLORS = ["#C1503B", "#3E6EA0", "#B98A4E", "#4E8368", "#8B6BB0"];

export default function ReportScreen({ nickname = "OOO", track = "romance", elements, chatExtract, psychTestDiagnosis, sessionId }) {
  const t = useStrings();
  const [content, setContent] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const mountedRef = useRef(true);
  const firedRef = useRef(false);
  const resolvedElements = elements ?? DEFAULT_ELEMENTS;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchReport = useCallback(async () => {
    setErrorText(null);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          context: {
            nickname,
            track,
            elements: resolvedElements,
            moduleTitle: psychTestDiagnosis?.moduleTitle ?? "",
            psychTestTypeTitle: psychTestDiagnosis?.typeInfo?.title ?? "",
            psychTestTypeHook: psychTestDiagnosis?.typeInfo?.hook ?? "",
            dimensionResults: (psychTestDiagnosis?.dimensionResults ?? []).map((r) => ({
              dimension: r.dimension,
              direction: r.direction,
              percentOfMax: r.percentOfMax,
              intensity: r.intensity,
            })),
            dimensionShortNames: psychTestDiagnosis?.dimensionShortNames ?? {},
            nuancedSummary: psychTestDiagnosis?.nuancedSummary ?? "",
            chatExtract: chatExtract ?? null,
          },
        }),
      });
      const json = await res.json();
      if (!mountedRef.current) return;

      if (!res.ok) {
        const kind = res.status === 429 || res.status === 503 ? "network" : "server";
        setErrorText({ kind, message: json.error || t.report.errorDefault });
        return;
      }
      setContent(json);
      trackReportViewed();
    } catch {
      if (!mountedRef.current) return;
      setErrorText({ kind: "network", message: t.report.errorNetwork });
    }
  }, [sessionId, nickname, track, resolvedElements, psychTestDiagnosis, chatExtract, t]);

  // React 18 Strict Mode fires effects twice in dev — guard so we only
  // ever send one generation request per mount (same pattern as
  // ChatScreen's opener and QAChat's greeting).
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorText) {
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <ErrorNotice kind={errorText.kind} message={errorText.message} onRetry={fetchReport} />
        </div>
      </div>
    );
  }

  if (!content) {
    return <LoadingReveal messages={t.report.loadingMessages} />;
  }

  let sectionCounter = 0;
  const nextNum = () => String(++sectionCounter).padStart(2, "0");

  const sortedElements = Object.keys(resolvedElements).sort((a, b) => resolvedElements[b] - resolvedElements[a]);
  const dominantKey = sortedElements[0];

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .rp-root, .rp-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .rp-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .rp-section { padding: 34px 22px; border-bottom: 1px solid #17161D; }
        .rp-num { font-size: 11px; color: #C9A24B; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px; }
        .rp-h1 { font-family: 'Cormorant Garamond','Noto Sans KR',serif; font-size: 22px; color: #EDE7DA; margin: 0 0 14px; line-height: 1.4; }
        .rp-h2 { font-size: 13px; color: #C9A24B; margin: 18px 0 6px; font-weight: 700; }
        .rp-body { font-size: 14px; line-height: 1.85; color: #C7C3D1; margin: 0 0 12px; }
        .rp-quote { font-family: 'Cormorant Garamond','Noto Sans KR',serif; font-size: 15px; line-height: 1.8; color: #EDE7DA;
          border-left: 2px solid #C9A24B; padding-left: 14px; margin: 14px 0; }
        .rp-case { background: rgba(201,162,75,0.05); border: 1px solid #2A2833; border-radius: 8px; padding: 16px; margin: 14px 0; }
        .rp-case-tag { font-size: 10px; color: #C9A24B; letter-spacing: 0.08em; font-weight: 700; margin-bottom: 8px; }
        .rp-case p { font-size: 13px; color: #B7B2C0; line-height: 1.75; margin: 0 0 8px; }
        .rp-breather { border-top: 1px solid #4E8368; border-bottom: 1px solid #4E8368; padding: 16px 2px; margin: 16px 0; }
        .rp-takeaway { background: #14131A; border: 1px solid #2A2833; padding: 12px 14px; margin-top: 10px; border-radius: 6px; font-size: 12.5px; color: #C7C3D1; }
        .rp-takeaway b { color: #C9A24B; }
        .rp-bullet-title { font-weight: 700; color: #EDE7DA; font-size: 13.5px; margin: 12px 0 3px; }
        .rp-bullet-title::before { content: "· "; color: #C9A24B; }
        .rp-bullet-body { font-size: 13px; color: #B7B2C0; line-height: 1.7; margin: 0 0 4px 14px; }
        .rp-fitgood, .rp-fitbad { padding: 12px 14px; border-radius: 6px; margin-bottom: 8px; font-size: 12.5px; line-height: 1.7; }
        .rp-fitgood { background: rgba(78,131,104,0.1); border-left: 3px solid #4E8368; color: #C7C3D1; }
        .rp-fitbad { background: rgba(193,80,59,0.1); border-left: 3px solid #C1503B; color: #C7C3D1; }
        .rp-fit-label { display: block; font-weight: 700; font-size: 11px; margin-bottom: 4px; }
        .rp-bar-track { height: 7px; background: #1C1B24; border-radius: 999px; overflow: hidden; margin-top: 4px; }
        .rp-bar-fill { height: 100%; border-radius: 999px; }
        .rp-chatquote { background: rgba(62,110,160,0.08); border: 1px solid rgba(62,110,160,0.35); border-radius: 8px; padding: 16px; margin: 14px 0; }
      ` }} />

      <div className="rp-root" style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ padding: "48px 24px 40px", textAlign: "center", borderBottom: "1px solid #17161D" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10.5px", letterSpacing: "0.14em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "18px" }}>
            <Sparkles size={12} /> Fatesaid
          </div>
          <h1 className="rp-serif" style={{ fontSize: "26px", color: "#EDE7DA", lineHeight: 1.5, margin: "0 0 10px" }}>
            {content.title_line1}<br />{content.title_line2}
          </h1>
          <p style={{ fontSize: "12.5px", color: "#8B879A", margin: "0 0 26px" }}>{content.subtitle}</p>
          <p className="rp-serif" style={{ fontSize: "15px", color: "#EDE7DA", margin: 0 }}>{nickname} 님</p>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">어느 밤의 장면</h1>
          <p className="rp-body">{content.opening_scene}</p>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">닮은 이야기 하나</h1>
          <div className="rp-case">
            <div className="rp-case-tag">{content.case_tag}</div>
            {content.case_paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {psychTestDiagnosis && (
          <div className="rp-section">
            <div className="rp-num">{nextNum()}</div>
            <h1 className="rp-h1">{psychTestDiagnosis.typeInfo?.title} <span style={{ fontSize: "11px", color: "#847E90" }}>{psychTestDiagnosis.moduleTitle ?? "심리테스트"} 분석</span></h1>
            <p className="rp-body">{psychTestDiagnosis.typeInfo?.hook}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0" }}>
              {psychTestDiagnosis.dimensionResults?.map((r, i) => (
                <div key={r.dimension}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#9C97A6", marginBottom: "3px" }}>
                    <span>{psychTestDiagnosis.dimensionShortNames?.[r.dimension] ?? r.dimension}</span>
                    <span>{Math.round(r.percentOfMax)}% · {r.intensity}</span>
                  </div>
                  <div className="rp-bar-track">
                    <div className="rp-bar-fill" style={{ width: `${r.percentOfMax}%`, background: DIMENSION_BAR_COLORS[i % DIMENSION_BAR_COLORS.length] }} />
                  </div>
                </div>
              ))}
            </div>
            {psychTestDiagnosis.nuancedSummary && <p className="rp-body">{psychTestDiagnosis.nuancedSummary}</p>}
          </div>
        )}

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">무엇이 이 패턴을 만들었나 <span style={{ fontSize: "11px", color: "#847E90" }}>사주 원국 분석</span></h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {Object.entries(resolvedElements).map(([key, val]) => {
              const label = t.common.elementLabels[key];
              return (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#9C97A6", marginBottom: "3px" }}>
                    <span>{label}{key === dominantKey ? " ·" : ""}</span><span>{val}%</span>
                  </div>
                  <div className="rp-bar-track"><div className="rp-bar-fill" style={{ width: `${val}%`, background: ELEMENT_COLOR[key] }} /></div>
                </div>
              );
            })}
          </div>
          <h2 className="rp-h2">{content.saju_dominant_heading}</h2>
          <p className="rp-body">{content.saju_dominant_body}</p>
          <h2 className="rp-h2">{content.saju_weak_heading}</h2>
          <p className="rp-body">{content.saju_weak_body}</p>
        </div>

        {chatExtract && (
          <div className="rp-section">
            <div className="rp-num">{nextNum()}</div>
            <h1 className="rp-h1">직접 나눈 이야기</h1>
            <p className="rp-body">사주와 심리검사가 구조를 보여준다면, 방금 나눈 대화는 지금 이 순간의
            실제 결을 보여줍니다.</p>
            <div className="rp-chatquote">
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <BookOpen size={13} color="#7FA8D6" />
                <span style={{ fontSize: "10.5px", color: "#7FA8D6", letterSpacing: "0.06em", fontWeight: 700 }}>상담 중 나온 이야기</span>
              </div>
              <p className="rp-serif" style={{ fontSize: "14.5px", color: "#EDE7DA", lineHeight: 1.75, margin: 0 }}>
                &quot;{chatExtract.summary_quote || chatExtract.trigger_point}&quot;
              </p>
            </div>
            <p className="rp-body">
              직접 나눈 대화에서도 {chatExtract.primary_concern} 쪽 고민이 선명하게 드러났고, 그 안에
              담긴 감정은 {chatExtract.emotional_state}에 가까웠습니다.
            </p>
            {chatExtract.integrated_summary && (
              <p className="rp-body">{chatExtract.integrated_summary}</p>
            )}
          </div>
        )}

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">사주와 심리검사가 같은 이야기를 하는 지점</h1>
          {content.cross_analysis_quotes.map((q, i) => (
            <div key={i} className="rp-quote">{q}</div>
          ))}
        </div>

        <div className="rp-section">
          <div className="rp-breather">
            <h2 className="rp-h2" style={{ color: "#4E8368" }}>잠깐, 심리학 상식 하나</h2>
            <h1 className="rp-h1" style={{ fontSize: "16px", marginBottom: "6px" }}>{content.psychology_fact_heading}</h1>
            <p className="rp-body" style={{ margin: 0 }}>{content.psychology_fact_body}</p>
            <div className="rp-takeaway"><b>기억할 한 가지 · </b>{content.psychology_takeaway}</div>
          </div>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">강점</h1>
          {content.strengths.map((s) => (
            <React.Fragment key={s.title}>
              <div className="rp-bullet-title">{s.title}</div>
              <div className="rp-bullet-body">{s.body}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">취약점 및 주의할 점</h1>
          {content.weaknesses.map((w) => (
            <React.Fragment key={w.title}>
              <div className="rp-bullet-title">{w.title}</div>
              <div className="rp-bullet-body">{w.body}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">당신에게 맞는 일·환경</h1>
          <div className="rp-fitgood">
            <span className="rp-fit-label" style={{ color: "#4E8368" }}>이런 환경을 찾으세요</span>
            {content.fit_good}
          </div>
          <div className="rp-fitbad">
            <span className="rp-fit-label" style={{ color: "#CB6249" }}>이런 환경은 피하세요</span>
            {content.fit_bad}
          </div>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">어떻게 행동하면 좋을까</h1>
          {content.behavior_guides.map((g) => (
            <React.Fragment key={g.title}>
              <div className="rp-bullet-title">{g.title}</div>
              <div className="rp-bullet-body">{g.body}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">어떻게 생각하면 편해질까</h1>
          <p className="rp-body">{content.mindset_guide}</p>
        </div>

        <div className="rp-section" style={{ borderBottom: "none" }}>
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">{content.closing_title}</h1>
          <p className="rp-body">{content.closing_body}</p>
          <p style={{ fontSize: "11px", color: "#847E90", lineHeight: 1.6, marginTop: "22px", borderTop: "1px solid #1C1B24", paddingTop: "14px" }}>
            {t.report.generatedNote}
          </p>
          <p style={{ fontSize: "11px", color: "#847E90", lineHeight: 1.6, marginTop: "8px" }}>
            {t.report.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
