"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, ShieldCheck, Copy, Check, ArrowRight } from "lucide-react";
import ErrorNotice from "./ErrorNotice";
import QASubcategoryPage from "./QASubcategoryPage";
import QAQuestionPage from "./QAQuestionPage";
import questionBank from "@/lib/questionBank.json";
import { useStrings } from "@/lib/i18n";

/**
 * QAChat — Yodha-inspired question-bank chat, replacing moduleSelect as
 * the screen right after onboarding (2026-09-04, page-based nav added
 * same day after review).
 * ------------------------------------------------------------------
 * Only the 대분류 picker lives inline in the chat itself (a persistent
 * panel under the message list, the same slot ChatScreen.jsx uses for
 * its text input — not a chat bubble). Picking a category navigates to
 * a full-screen QASubcategoryPage; picking a subcategory navigates to
 * a full-screen QAQuestionPage (lib/questionBank.json subcategories
 * have no third tier today, so this is always the next screen — see
 * QASubcategoryPage's docstring for the one-line branch point if a
 * 소분류 level is ever added). Only the FINAL question pick becomes a
 * real chat message — the category/subcategory taps are pure
 * navigation, nothing is "sent" until an actual question is chosen.
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
  const [messages, setMessages] = useState([]); // {role:'bot'|'user', text}
  const [view, setView] = useState("chat"); // 'chat' | 'subcategory' | 'question'
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [greeted, setGreeted] = useState(false);
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
      setGreeted(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePickCategory(cat) {
    setActiveCategory(cat);
    setView("subcategory");
  }

  function handleBackFromSubcategory() {
    setActiveCategory(null);
    setView("chat");
  }

  function handlePickSubcategory(sub) {
    setActiveSubcategory(sub);
    setView("question");
  }

  function handleBackFromQuestions() {
    setActiveSubcategory(null);
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
        body: JSON.stringify({ nickname, question: questionText, sajuResult }),
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
        setBusy(false);
      } else {
        pushBot(t.qa.installPitch);
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
    setActiveCategory(null);
    setActiveSubcategory(null);
    setView("chat");
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
  const showCategoryPanel = greeted && !busy && !errorText && answeredCount < FREE_QUESTIONS;

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .qa-root, .qa-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .qa-mono { font-family: 'JetBrains Mono', monospace; }
        .qa-bubble-bot { background: rgba(255,255,255,0.05); border: 1px solid #2A2833; color: #EDE7DA; }
        .qa-bubble-user { background: #C9A24B; color: #100F16; }
        .qa-fade { animation: qaFade 0.28s ease both; }
        @keyframes qaFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .qa-dot { animation: qaBlink 1.2s infinite ease-in-out; }
        .qa-dot:nth-child(2) { animation-delay: 0.15s; }
        .qa-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes qaBlink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }
        .qa-cat-btn {
          width: 100%; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid #2A2833;
          border-radius: 10px; padding: 12px 14px; color: #EDE7DA; font-size: 14px; cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease; margin-bottom: 8px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .qa-cat-btn:last-child { margin-bottom: 0; }
        .qa-cat-btn:hover { border-color: #C9A24B; background: rgba(201,162,75,0.06); }
        .qa-cat-scroll { max-height: 260px; overflow-y: auto; padding-right: 2px; }
        .qa-root button:focus-visible, .qa-root input:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
      ` }} />

      <div className="qa-root" style={{ width: "100%", maxWidth: "460px", display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid #1C1B24", display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={14} color="#C9A24B" />
          <span style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#C9A24B", textTransform: "uppercase" }}>
            {t.qa.headerLabel}
          </span>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "18px 18px 8px" }}>
          {messages.map((m, i) => (
            <div key={i} className="qa-fade" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
              <div
                className={m.role === "user" ? "qa-bubble-user" : "qa-bubble-bot"}
                style={{ maxWidth: "82%", padding: "12px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", fontSize: "14.5px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {busy && !errorText && (
            <div className="qa-fade" style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
              <div className="qa-bubble-bot" style={{ padding: "14px 16px", borderRadius: "16px 16px 16px 4px", display: "flex", gap: "4px" }}>
                <span className="qa-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C97A6", display: "inline-block" }} />
                <span className="qa-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C97A6", display: "inline-block" }} />
                <span className="qa-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C97A6", display: "inline-block" }} />
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
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#847E90", background: "rgba(255,255,255,0.03)", border: "1px solid #2A2833", borderRadius: "999px", padding: "6px 12px", marginBottom: "12px" }}>
                <ShieldCheck size={12} /> {t.qa.doneBadge}
              </div>
              {verifyCode && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                  <button type="button" onClick={() => handleCopyCode(verifyCode)}
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201,162,75,0.1)", border: "1px solid rgba(201,162,75,0.4)", borderRadius: "10px", padding: "10px 16px", cursor: "pointer" }}>
                    <span className="qa-mono" style={{ fontSize: "20px", fontWeight: 700, color: "#C9A24B", letterSpacing: "0.1em" }}>{verifyCode}</span>
                    {copied ? <Check size={15} color="#C9A24B" /> : <Copy size={15} color="#C9A24B" />}
                  </button>
                  {/* TODO: replace href="#" with the real App Store / Play Store link once the app ships */}
                  <a href="#" style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", padding: "14px", borderRadius: "12px", background: "#C9A24B", color: "#100F16",
                    fontSize: "14px", fontWeight: 700, textDecoration: "none",
                  }}>
                    {t.qa.appStoreButton}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {showCategoryPanel && (
          <div className="qa-fade" style={{ padding: "12px 16px 20px", borderTop: "1px solid #1C1B24" }}>
            <div className="qa-cat-scroll">
              {questionBank.categories.map((cat) => (
                <button key={cat.id} type="button" className="qa-cat-btn" onClick={() => handlePickCategory(cat)}>
                  {cat.name_ko} <ArrowRight size={14} strokeWidth={2.25} color="#C9A24B" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
