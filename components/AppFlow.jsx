"use client";

import React, { useState } from "react";
import OnboardingWizard from "./OnboardingWizard";
import QAChat from "./QAChat";
import ModuleSelect from "./ModuleSelect";
import QuizScreen from "./QuizScreen";
import ChatScreen from "./ChatScreen";
import ReportScreen from "./ReportScreen";
import { findTopAnswers } from "@/lib/quizProfile";
import { getModuleById } from "@/lib/modules";

/**
 * AppFlow — full pipeline
 * ------------------------------------------------------------------
 * Onboarding → QAChat (question-bank Q&A, see components/QAChat.jsx —
 * replaced Module select as the screen right after onboarding on
 * 2026-09-04) → Module select (test harness — see ModuleSelect.jsx,
 * still reachable, just not the default path anymore) → Quiz (30문항,
 * whichever module was picked) → Chat (real GPT-4o) → Report.
 *
 * moduleSelect/quiz/chat/report is the OTHER monetization line (ingan.ai-
 * style individual deep-report purchase) from the benchmarking-proposal
 * hybrid model — it isn't gone, QAChat just now sits in front of it as
 * the immediate post-onboarding screen (the Yodha-style subscription
 * Q&A line). Nothing currently navigates from QAChat into moduleSelect;
 * that link (e.g. "심리테스트 해보기" after a Q&A answer) is a natural
 * next step once this is live, not built yet.
 *
 * Saju x psych-test combination (2026-08-28 redesign): oheng data comes
 * straight from SAZU (sajuResult.elements) — the quiz no longer infers
 * elements from answers, it's purely whichever module's 30-item test.
 * Both facts (saju elements + psych-test diagnosis) are handed to the
 * chatbot directly; the chatbot is where the two get narratively
 * connected (see lib/chatPrompts.ts).
 *
 * Report renders the Module 3 (번아웃) sample narrative copy regardless
 * of which module/track was actually run, since writing full narrative
 * copy per module × outcome is a separate content task, not a wiring
 * task. Real saju elements, the real psych-test diagnosis (whichever
 * module ran), AND the chat's integrated_summary (saju + quiz +
 * conversation synthesis) ARE passed through and rendered with real data.
 * ------------------------------------------------------------------
 */

export default function AppFlow() {
  // 익명 세션 ID — 로그인 없이도 온보딩→퀴즈→챗봇 결과를 하나의 세션으로 묶어
  // DB에 저장하기 위한 값. 나중에 로그인을 붙이면 이 세션을 계정에 연결하면 되고,
  // 지금은 계속 null user_id로 저장된다 (supabase/schema.sql 참고).
  const [sessionId] = useState(() => (typeof crypto !== "undefined" ? crypto.randomUUID() : ""));
  const [step, setStep] = useState("onboarding"); // 'onboarding' | 'qaChat' | 'moduleSelect' | 'quiz' | 'chat' | 'report'
  const [sajuResult, setSajuResult] = useState(null);
  const [nickname, setNickname] = useState("");
  const [track, setTrack] = useState("romance");
  const [moduleId, setModuleId] = useState(null);
  const [chatContextForChat, setChatContextForChat] = useState(null);
  const [chatExtract, setChatExtract] = useState(null);
  const [psychTestDiagnosis, setPsychTestDiagnosis] = useState(null);

  const handleOnboardingComplete = ({ birthInput, sajuResult, track }) => {
    setSajuResult(sajuResult);
    setNickname(birthInput?.nickname ?? "");
    setTrack(track);
    setStep("qaChat");
  };

  const handleModuleSelect = (id) => {
    setModuleId(id);
    setStep("quiz");
  };

  const handleQuizComplete = ({ moduleTitle, answers, dimensionResults, classification, typeInfo, nuancedSummary, elements, dominantElement, track }) => {
    const activeDimension = classification?.activeDimensions?.[0] ?? null;
    const headlineAnswerRaw = activeDimension ? findTopAnswers(answers, activeDimension, 1)[0] : null;
    const headlineAnswer = headlineAnswerRaw ? { prompt: headlineAnswerRaw.prompt, label: headlineAnswerRaw.label } : null;

    const dimensionShortNames = getModuleById(moduleId)?.dimensionShortNames ?? {};
    setPsychTestDiagnosis({ moduleTitle, typeInfo, dimensionResults, nuancedSummary, dimensionShortNames });

    setChatContextForChat({
      track,
      sajuElements: elements,
      dominantSajuElement: dominantElement,
      psychTestType: typeInfo?.title ?? "",
      psychTestSummary: nuancedSummary ?? "",
      headlineAnswer,
    });
    setStep("chat");
  };

  const handleChatComplete = (extract) => {
    setChatExtract(extract);
    setStep("report");
  };

  if (step === "report") {
    return (
      <ReportScreen
        elements={sajuResult?.elements}
        chatExtract={chatExtract}
        psychTestDiagnosis={psychTestDiagnosis}
      />
    );
  }

  if (step === "chat") {
    return <ChatScreen chatContext={chatContextForChat} sessionId={sessionId} onComplete={handleChatComplete} />;
  }

  if (step === "quiz") {
    return (
      <QuizScreen
        track={track}
        moduleId={moduleId}
        sajuElements={sajuResult?.elements}
        isSandboxSample={sajuResult?.isSandboxSample}
        sessionId={sessionId}
        onComplete={handleQuizComplete}
      />
    );
  }

  if (step === "moduleSelect") {
    return <ModuleSelect onSelect={handleModuleSelect} />;
  }

  if (step === "qaChat") {
    return <QAChat nickname={nickname} sajuResult={sajuResult} sessionId={sessionId} />;
  }

  return <OnboardingWizard sessionId={sessionId} onComplete={handleOnboardingComplete} />;
}
