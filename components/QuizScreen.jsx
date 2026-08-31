"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Sparkles, ArrowRight, RotateCcw, ShieldCheck, Share2 } from "lucide-react";
import { getModuleById } from "@/lib/modules";
import { scoreSliderValue, computeAllDimensionResults, classifyProfile, resolveTypeName, generateNuancedSummary } from "@/lib/quizProfile";

const ELEMENT_INFO = {
  wood: { label: "목(木)", color: "#4E8368" },
  fire: { label: "화(火)", color: "#CB6249" },
  earth: { label: "토(土)", color: "#B98A4E" },
  metal: { label: "금(金)", color: "#C7C3D1" },
  water: { label: "수(水)", color: "#3E6EA0" },
};

/**
 * QuizScreen — generic 30-question deep-test runner
 * ------------------------------------------------------------------
 * Renders whichever module lib/modules.ts's `moduleId` resolves to —
 * this component has no module-specific content of its own. Pure
 * psychology test — no element(오행) tagging happens here. SAZU already
 * returns real oheng percentages at onboarding (sajuElements prop), so
 * the saju x psych-test combination happens downstream, in the
 * chatbot's system prompt (see lib/chatPrompts.ts), not here.
 *
 * Supports all three item formats found across modules 1-5 (see
 * lib/quizProfile.ts): "choice" (2 or 4 options), "slider", and
 * "slider-reverse" (low end of the slider scores high).
 * ------------------------------------------------------------------
 */

export default function QuizScreen({ track: trackProp, moduleId, sajuElements, isSandboxSample, sessionId, onComplete }) {
  const [track] = useState(trackProp || "romance");
  const moduleDef = useMemo(() => getModuleById(moduleId) ?? getModuleById("module1"), [moduleId]);
  const questions = moduleDef.questions;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sliderValue, setSliderValue] = useState(5);
  const [transitioning, setTransitioning] = useState(false);
  const [done, setDone] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const current = questions[index];
  const progress = done ? 1 : index / questions.length;

  const recordAnswer = useCallback(
    (label, score) => {
      if (transitioning) return;
      setTransitioning(true);
      setAnswers((prev) => [
        ...prev,
        { qId: current.id, prompt: current.prompt, label, dimension: current.dimension, score },
      ]);
      window.setTimeout(() => {
        setSliderValue(5);
        if (index + 1 < questions.length) {
          setIndex((i) => i + 1);
          setTransitioning(false);
        } else {
          setDone(true);
          setTransitioning(false);
        }
      }, 280);
    },
    [current, index, questions.length, transitioning]
  );

  const handleChoiceSelect = useCallback(
    (opt) => recordAnswer(opt.label, opt.score),
    [recordAnswer]
  );

  const handleSliderSubmit = useCallback(() => {
    recordAnswer(`${sliderValue}/10`, scoreSliderValue(current.format, sliderValue));
  }, [recordAnswer, sliderValue, current]);

  const handleRestart = useCallback(() => {
    setIndex(0);
    setAnswers([]);
    setSliderValue(5);
    setDone(false);
  }, []);

  const diagnosis = useMemo(() => {
    if (!done) return null;
    const dimensionResults = computeAllDimensionResults(answers, moduleDef.dimensionItemCounts);
    const classification = classifyProfile(dimensionResults);
    const typeInfo = resolveTypeName(classification, moduleDef.typeNames, (dims) => ({
      title: dims.map((d) => moduleDef.dimensionShortNames[d] ?? d).join("+") + " 혼합형",
      hook: "여러 성향이 함께 나타나는 패턴입니다.",
    }));
    const nuancedSummary = generateNuancedSummary(dimensionResults, moduleDef.dimensionLabels);
    return { dimensionResults, classification, typeInfo, nuancedSummary };
  }, [answers, done, moduleDef]);

  const elements = sajuElements ?? null;
  const dominantElement = elements ? Object.entries(elements).sort((a, b) => b[1] - a[1])[0]?.[0] : null;

  const handleShare = useCallback(async () => {
    if (!diagnosis) return;
    const shareText = `${diagnosis.typeInfo.title} — ${moduleDef.title} 블루프린트가 나왔어요`;
    const url = typeof window !== "undefined" ? window.location.origin : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Fatesaid", text: shareText, url });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText}\n${url}`);
        setShareCopied(true);
        window.setTimeout(() => setShareCopied(false), 2000);
      }
    } catch {
      // 사용자가 공유 시트를 취소한 경우 — 별도 처리 없음
    }
  }, [diagnosis, moduleDef]);

  const handleContinueToChat = useCallback(() => {
    if (!diagnosis) return;
    // 저장 실패해도 다음 단계(챗봇)로 넘어가는 걸 막지 않는다 — fire-and-forget.
    if (sessionId) {
      fetch("/api/quiz-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          moduleId: moduleDef.id,
          moduleTitle: moduleDef.title,
          answers,
          dimensionResults: diagnosis.dimensionResults,
          typeInfo: diagnosis.typeInfo,
          nuancedSummary: diagnosis.nuancedSummary,
        }),
      }).catch(() => {});
    }
    onComplete?.({
      moduleId: moduleDef.id,
      moduleTitle: moduleDef.title,
      answers,
      dimensionResults: diagnosis.dimensionResults,
      classification: diagnosis.classification,
      typeInfo: diagnosis.typeInfo,
      nuancedSummary: diagnosis.nuancedSummary,
      elements,
      dominantElement,
      track,
    });
  }, [diagnosis, moduleDef, answers, elements, dominantElement, track, sessionId, onComplete]);

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", backgroundImage: "radial-gradient(circle at 50% -10%, rgba(201,162,75,0.10), transparent 55%)", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .qz-root, .qz-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .qz-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .qz-fade { animation: qzFade 0.32s ease both; }
        @keyframes qzFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .qz-option { width: 100%; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid #2A2833; border-radius: 12px; padding: 16px 18px; color: #EDE7DA; font-size: 15px; cursor: pointer; transition: border-color 0.18s ease, background 0.18s ease; }
        .qz-option:hover { border-color: #C9A24B; background: rgba(201,162,75,0.05); }
        .qz-bar-track { height: 8px; background: #1C1B24; border-radius: 999px; overflow: hidden; }
        .qz-bar-fill { height: 100%; border-radius: 999px; transition: width 0.6s ease; }
        .qz-slider { width: 100%; accent-color: #C9A24B; height: 6px; }
        .qz-slider-btn { width: 100%; margin-top: 18px; padding: 14px; border-radius: 12px; border: none; background: #C9A24B; color: #100F16; font-size: 14px; font-weight: 700; cursor: pointer; min-height: 48px; }
        .qz-root button:focus-visible, .qz-root input:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
      ` }} />

      <div className="qz-root" style={{ width: "100%", maxWidth: "460px", padding: "40px 22px 64px" }}>
        {isSandboxSample && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "11px", color: "#8B879A", background: "rgba(255,255,255,0.03)", border: "1px solid #2A2833", borderRadius: "999px", padding: "6px 12px", marginBottom: "18px" }}>
            <ShieldCheck size={12} strokeWidth={1.75} />
            개발 모드 — SAZU 샌드박스 고정 샘플 데이터
          </div>
        )}

        <div style={{ marginBottom: "28px" }}>
          <div style={{ height: "3px", background: "#1C1B24", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(progress * 100, 100)}%`, background: "#C9A24B", borderRadius: "999px", transition: "width 0.35s ease" }} />
          </div>
          <p style={{ fontSize: "11px", color: "#847E90", marginTop: "8px", textAlign: "right" }}>{done ? questions.length : index + 1} / {questions.length}</p>
        </div>

        {!done && current && (
          <div key={current.id} className="qz-fade">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.14em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "14px" }}>
              <Sparkles size={12} strokeWidth={1.75} />
              {moduleDef.title}
            </div>
            <h2 className="qz-serif" style={{ fontSize: "24px", fontWeight: 500, color: "#EDE7DA", margin: "0 0 22px", lineHeight: 1.4 }}>{current.prompt}</h2>

            {current.format === "choice" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {current.options.map((opt) => (
                  <button key={opt.label} type="button" className="qz-option" onClick={() => handleChoiceSelect(opt)} disabled={transitioning}>{opt.label}</button>
                ))}
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9C97A6", marginBottom: "10px" }}>
                  <span>{current.options.minLabel}</span>
                  <span>{current.options.maxLabel}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="qz-slider"
                  disabled={transitioning}
                />
                <p className="qz-serif" style={{ textAlign: "center", fontSize: "28px", color: "#C9A24B", margin: "10px 0 0" }}>{sliderValue}</p>
                <button type="button" className="qz-slider-btn" onClick={handleSliderSubmit} disabled={transitioning}>다음</button>
              </div>
            )}
          </div>
        )}

        {done && diagnosis && (
          <div className="qz-fade" style={{ textAlign: "center", paddingTop: "32px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.14em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "18px" }}>
              <Sparkles size={12} strokeWidth={1.75} />
              첫 블루프린트가 완성됐어요
            </div>

            {/* 공유 카드 — 사주 우세 오행 + 심리테스트 타입만 티저로 보여주고,
               세부 진단(축별 강도, 대화 연동 분석)은 리포트에서만 공개한다. */}
            <div style={{
              position: "relative", textAlign: "left", borderRadius: "20px", padding: "30px 26px",
              background: "linear-gradient(165deg, rgba(201,162,75,0.10), rgba(255,255,255,0.02))",
              border: "1px solid rgba(201,162,75,0.28)", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: "-40%", right: "-25%", width: "70%", height: "140%", background: "radial-gradient(circle, rgba(201,162,75,0.14), transparent 65%)", pointerEvents: "none" }} />

              {dominantElement && ELEMENT_INFO[dominantElement] && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.05)", border: "1px solid #2A2833", borderRadius: "999px", padding: "6px 13px", marginBottom: "18px" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: ELEMENT_INFO[dominantElement].color, flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: "#C7C3D1", fontWeight: 600 }}>사주 우세 오행 · {ELEMENT_INFO[dominantElement].label}</span>
                </div>
              )}

              <h2 className="qz-serif" style={{ fontSize: "30px", fontWeight: 600, color: "#EDE7DA", margin: "0 0 10px", lineHeight: 1.3 }}>
                {diagnosis.typeInfo.title}
              </h2>
              <p style={{ fontSize: "13.5px", color: "#C7C3D1", lineHeight: 1.7, margin: "0 0 20px" }}>
                {diagnosis.typeInfo.hook}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid rgba(201,162,75,0.18)" }}>
                <span style={{ fontSize: "11px", color: "#847E90" }}>{moduleDef.title}</span>
                <span className="qz-serif" style={{ fontSize: "13px", color: "#C9A24B" }}>Fatesaid</span>
              </div>
            </div>

            <p style={{ fontSize: "12.5px", color: "#847E90", margin: "16px 0 22px", lineHeight: 1.65 }}>
              더 자세한 분석(오행 궁합, 성향 상세, 상담 대화 기반 인사이트)은 AI 상담을 마친 뒤 리포트에서 확인하실 수 있어요.
            </p>

            <button
              type="button"
              onClick={handleShare}
              style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #2A2833", background: "rgba(255,255,255,0.03)", color: "#EDE7DA", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", minHeight: "48px", marginBottom: "10px" }}
            >
              <Share2 size={15} strokeWidth={2} /> {shareCopied ? "복사됐어요" : "공유하기"}
            </button>

            <button
              type="button"
              onClick={handleContinueToChat}
              style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "#C9A24B", color: "#100F16", fontSize: "15px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "52px" }}
            >
              AI 상담으로 이어가기 <ArrowRight size={17} strokeWidth={2.25} />
            </button>
            <button type="button" onClick={handleRestart} style={{ marginTop: "14px", background: "none", border: "none", color: "#847E90", fontSize: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px" }}>
              <RotateCcw size={12} strokeWidth={1.75} /> 다시 풀기 (데모용)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
