"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, ShieldCheck, Copy, Check } from "lucide-react";
import ErrorNotice from "./ErrorNotice";
import QASubcategoryPage from "./QASubcategoryPage";
import QAQuestionPage from "./QAQuestionPage";
import questionBank from "@/lib/questionBank.json";
import { useStrings } from "@/lib/i18n";
import { trackQaQuestionAsked, trackQaInstallPitchShown } from "@/lib/analytics";

/**
 * QAChat — Yodha-inspired question-bank chat, replacing moduleSelect as
 * the screen right after onboarding (2026-09-04, revised twice same day
 * after review — see the two notes below).
 * ------------------------------------------------------------------
 * The 대분류 picker is a normal chat bubble in `messages` (pushed right
 * after the greeting, and again after each "질문 1개 더" prompt) — NOT
 * a persistent panel anymore. It was a fixed bottom panel briefly; on a
 * real phone that permanently ate ~1/3 of the screen and covered the
 * answer text while it was still being read, so it moved back into the
 * message flow, appearing only once the previous turn is fully done —
 * closer to the actual Yodha reference screens.
 *
 * Picking a category navigates to a full-screen QASubcategoryPage;
 * picking a subcategory navigates to a full-screen QAQuestionPage
 * (lib/questionBank.json subcategories have no third tier today, so
 * this is always the next screen — see QASubcategoryPage's docstring
 * for the one-line branch point if a 소분류 level is ever added). Only
 * the FINAL question pick becomes a real chat message — category/
 * subcategory taps are pure navigation, nothing is "sent" until an
 * actual question is chosen.
 *
 * Hardware/gesture back button fix (2026-09-04 real-device report,
 * same root cause as OnboardingWizard.jsx): every forward navigation
 * (category pick, subcategory pick, question pick returning to chat)
 * pushes a history entry, and a single popstate handler drives `view`
 * for both the phone's back button/gesture AND the in-page "이전"
 * buttons (which just call history.back()) — without this, tapping
 * back on QASubcategoryPage/QAQuestionPage exited the whole site
 * instead of navigating up one level.
 *
 * From there: picked question pushed as a user bubble → "잠시만
 * 기다려주세요..." placeholder → POST /api/qa-answer (grounds the
 * answer in the user's real saju data, see lib/qaPrompts.ts) → 3-4
 * paragraph answer revealed as sequential bot bubbles. Free questions:
 * FREE_QUESTIONS (2). After the 2nd answer, generates a verification
 * code (POST /api/verification-code) and shows the "install the app,
 * enter this code" pitch — see that route's docstring for what it
 * does and doesn't do yet (no native app exists to redeem it).
 *
 * Separate from ChatScreen.jsx (the Layer 3 open-text 상담 챗봇 after a
 * psych-test module) — this one is entirely button/page-driven, no
 * free text input at all.
 * ------------------------------------------------------------------
 */

const FREE_QUESTIONS = 2;

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export default function QAChat({ nickname, sajuResult, sessionId }) {
  const t = useStrings();
  const [messages, setMessages] = useState([]); // {role:'bot'|'user', text} | {role:'picker', options}
  const [view, setView] = useState("chat"); // 'chat' | 'subcategory' | 'question'
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [busy, setBusy] = useState(false); // true while awaiting an API call
  const [errorText, setErrorText] = useState(null);
  const [retryQuestion, setRetryQuestion] = useState(null);
  const [copied, setCopied] = useState(false);
  const [verifyCode, setVerifyCode] = useState(null);
  const scrollRef = useRef(null);
  const mountedRef = useRef(true);
  const greetedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, view]);

  const pushBot = useCallback((text) => setMessages((m) => [...m, { role: "bot", text }]), []);
  const pushUser = useCallback((text) => setMessages((m) => [...m, { role: "user", text }]), []);
  const pushCategoryPicker = useCallback(() => {
    setMessages((m) => [...m, { role: "picker", options: questionBank.categories }]);
  }, []);

  // Greeting sequence on mount.
  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    (async () => {
      await wait(350);
      if (!mountedRef.current) return;
      pushBot(t.qa.greeting1(nickname || t.qa.defaultNickname));
      await wait(850);
      if (!mountedRef.current) return;
      pushBot(t.qa.greeting2);
      await wait(700);
      if (!mountedRef.current) return;
      pushBot(t.qa.promptCategory);
      pushCategoryPicker();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2026-09-04 fix attempt (REVERTED 2026-09-11): this used to drive view
  // transitions through window.history.pushState()/back() + a popstate
  // listener (see git history), to unify the in-page "이전" buttons with
  // the phone's hardware back gesture. Live testing found this actively
  // broke the in-page buttons: manually-pushed history entries aren't
  // recognized by Next.js App Router's own popstate listener, so clicking
  // "이전" anywhere made Next fall back to a full hard reload of "/" —
  // wiping the whole session (nickname, saju data, everything) and
  // dropping the user back on the onboarding intro screen instead of one
  // view back. Back to plain in-memory view state; hardware back exiting
  // mid-flow is an accepted trade-off for now, same as OnboardingWizard.jsx.
  function handlePickCategory(cat) {
    setActiveCategory(cat);
    setView("subcategory");
  }

  function handleBackFromSubcategory() {
    setView("chat");
  }

  function handlePickSubcategory(sub) {
    setActiveSubcategory(sub);
    setView("question");
  }

  function handleBackFromQuestions() {
    setView("subcategory");
  }

  async function requestAnswer(questionText) {
    setBusy(true);
    setErrorText(null);
    pushBot(t.qa.analyzing);
    try {
      const res = await fetch("/api/qa-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, question: questionText, sajuResult, sessionId }),
      });
      const json = await res.json();
      if (!mountedRef.current) return;

      if (!res.ok) {
        setMessages((m) => m.slice(0, -1)); // drop the "잠시만 기다려주세요" placeholder
        const kind = res.status === 429 || res.status === 503 ? "network" : "server";
        setErrorText({ kind, message: json.error || t.qa.errorDefault });
        setRetryQuestion(questionText);
        setBusy(false);
        return;
      }

      setMessages((m) => m.slice(0, -1));
      trackQaQuestionAsked();
      for (const line of json.lines) {
        await wait(500);
        if (!mountedRef.current) return;
        pushBot(line);
      }

      const nextCount = answeredCount + 1;
      setAnsweredCount(nextCount);
      await wait(700);
      if (!mountedRef.current) return;

      if (nextCount < FREE_QUESTIONS) {
        pushBot(t.qa.askOneMore);
        pushCategoryPicker();
        setBusy(false);
      } else {
        pushBot(t.qa.installPitch);
        trackQaInstallPitchShown();
        await generateAndShowCode();
      }
    } catch {
      if (!mountedRef.current) return;
      setMessages((m) => m.slice(0, -1));
      setErrorText({ kind: "network", message: t.qa.errorNetwork });
      setRetryQuestion(questionText);
      setBusy(false);
    }
  }

  function handleSelectQuestion(q) {
    setView("chat");
    window.history.pushState({ view: "chat" }, "");
    pushUser(q.text_ko);
    requestAnswer(q.text_ko);
  }

  function handleRetry() {
    setErrorText(null);
    if (retryQuestion) requestAnswer(retryQuestion);
  }

  async function generateAndShowCode() {
    try {
      const res = await fetch("/api/verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const json = await res.json();
      await wait(500);
      if (!mountedRef.current) return;
      if (res.ok && json.code) {
        setVerifyCode(json.code);
        pushBot(t.qa.codeMessage(json.code));
      } else {
        pushBot(t.qa.codeErrorFallback);
      }
    } catch {
      if (!mountedRef.current) return;
      pushBot(t.qa.codeErrorFallback);
    } finally {
      if (mountedRef.current) setBusy(false);
    }
  }

  function handleCopyCode(code) {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }

  if (view === "subcategory" && activeCategory) {
    return <QASubcategoryPage category={activeCategory} onBack={handleBackFromSubcategory} onSelect={handlePickSubcategory} />;
  }
  if (view === "question" && activeSubcategory) {
    return <QAQuestionPage subcategory={activeSubcategory} onBack={handleBackFromQuestions} onSelect={handleSelectQuestion} />;
  }

  const done = answeredCount >= FREE_QUESTIONS && !busy;

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#122019", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .qa-root, .qa-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .qa-mono { font-family: 'JetBrains Mono', monospace; }
        .qa-bubble-bot { background: rgba(255,255,255,0.05); border: 1px solid #26332B; color: #D9C9A3; }
        .qa-bubble-user { background: #6FA98B; color: #0F1A15; }
        .qa-fade { animation: qaFade 0.28s ease both; }
        @keyframes qaFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .qa-dot { animation: qaBlink 1.2s infinite ease-in-out; }
        .qa-dot:nth-child(2) { animation-delay: 0.15s; }
        .qa-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes qaBlink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }
        .qa-option-btn {
          width: 100%; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid #26332B;
          border-radius: 10px; padding: 12px 14px; color: #D9C9A3; font-size: 14px; cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease; margin-bottom: 8px;
        }
        .qa-option-btn:last-child { margin-bottom: 0; }
        .qa-option-btn:hover { border-color: #6FA98B; background: rgba(111,169,139,0.06); }
        .qa-root button:focus-visible, .qa-root input:focus-visible { outline: 2px solid #6FA98B; outline-offset: 2px; }
      ` }} />

      <div className="qa-root" style={{ width: "100%", maxWidth: "460px", display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid #1C2A22", display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={14} color="#6FA98B" />
          <span style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#6FA98B", textTransform: "uppercase" }}>
            {t.qa.headerLabel}
          </span>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "18px 18px 8px" }}>
          {messages.map((m, i) => {
            if (m.role === "picker") {
              return (
                <div key={i} className="qa-fade" style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
                  <div className="qa-bubble-bot" style={{ maxWidth: "88%", width: "88%", padding: "12px", borderRadius: "16px 16px 16px 4px" }}>
                    {m.options.map((cat) => (
                      <button key={cat.id} type="button" className="qa-option-btn" onClick={() => handlePickCategory(cat)}>
                        {cat.name_ko}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="qa-fade" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
                <div
                  className={m.role === "user" ? "qa-bubble-user" : "qa-bubble-bot"}
                  style={{ maxWidth: "82%", padding: "12px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", fontSize: "14.5px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}
                >
                  {m.text}
                </div>
              </div>
            );
          })}

          {busy && !errorText && (
            <div className="qa-fade" style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
              <div className="qa-bubble-bot" style={{ padding: "14px 16px", borderRadius: "16px 16px 16px 4px", display: "flex", gap: "4px" }}>
                <span className="qa-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C9277", display: "inline-block" }} />
                <span className="qa-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C9277", display: "inline-block" }} />
                <span className="qa-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C9277", display: "inline-block" }} />
              </div>
            </div>
          )}

          {errorText && (
            <div className="qa-fade" style={{ marginBottom: "10px" }}>
              <ErrorNotice kind={errorText.kind} message={errorText.message} onRetry={handleRetry} />
            </div>
          )}

          {done && (
            <div className="qa-fade" style={{ textAlign: "center", marginTop: "16px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#756B54", background: "rgba(255,255,255,0.03)", border: "1px solid #26332B", borderRadius: "999px", padding: "6px 12px", marginBottom: "12px" }}>
                <ShieldCheck size={12} /> {t.qa.doneBadge}
              </div>
              {verifyCode && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                  <button type="button" onClick={() => handleCopyCode(verifyCode)}
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(111,169,139,0.1)", border: "1px solid rgba(111,169,139,0.4)", borderRadius: "10px", padding: "10px 16px", cursor: "pointer" }}>
                    <span className="qa-mono" style={{ fontSize: "20px", fontWeight: 700, color: "#6FA98B", letterSpacing: "0.1em" }}>{verifyCode}</span>
                    {copied ? <Check size={15} color="#6FA98B" /> : <Copy size={15} color="#6FA98B" />}
                  </button>
                  {/* 앱스토어 링크가 실제로 생기면 이 배지를 클릭 가능한 <a> 버튼으로 교체할 것 —
                      그 전까지는 존재하지 않는 링크를 가리키는 가짜 CTA를 보여주지 않는다. */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", padding: "14px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)", border: "1px dashed #26332B", color: "#7C8A82",
                    fontSize: "13.5px", fontWeight: 600,
                  }}>
                    {t.qa.appComingSoonLabel}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
