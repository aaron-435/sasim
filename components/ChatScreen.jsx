"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, ShieldCheck } from "lucide-react";
import ErrorNotice from "./ErrorNotice";

/**
 * ChatScreen — CONNECTED version
 * ------------------------------------------------------------------
 * Real GPT-4o backed chat via POST /api/chat, one call per bot turn
 * (1-7), per 챗봇_3턴시나리오_5.md. The bot's opening greeting stays a
 * static line (no API call needed for it) — the first real API call
 * happens once the user replies to that greeting.
 *
 * Phase A (turns 1-2) requests structured `{ text, chips }` JSON from
 * the server so real clickable chips can be rendered — see
 * lib/chat.ts / lib/chatPrompts.ts for why. Phase B (turns 3-6) and
 * Phase C (turn 7) are plain text with a free-text input only.
 *
 * On turn 7, the API also returns `extract` (the structured summary
 * ReportScreen needs) — computed server-side via a second, separate
 * LLM call right after the turn-7 reply (see lib/chat.ts).
 * ------------------------------------------------------------------
 */

const TOTAL_TURNS = 7;

export default function ChatScreen({ chatContext, onComplete }) {
  const [messages, setMessages] = useState([]);
  const [turn, setTurn] = useState(0); // 0 = only the static greeting shown so far; 1-7 = completed AI turns
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chips, setChips] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const scrollRef = useRef(null);
  const sessionStartedAt = useRef(Date.now()).current;
  const doneRef = useRef(false);

  useEffect(() => {
    setMessages([{ role: "bot", text: "안녕하세요! 오늘 어떤 이야기를 나누고 싶으신가요?" }]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, chips, errorText]);

  async function requestNextTurn(nextTurn, historyMessages) {
    setIsTyping(true);
    setChips(null);
    setErrorText(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnNumber: nextTurn,
          sessionStartedAt,
          context: {
            track: chatContext?.track ?? "romance",
            sajuElements: chatContext?.sajuElements ?? { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 },
            dominantSajuElement: chatContext?.dominantSajuElement ?? "wood",
            psychTestType: chatContext?.psychTestType ?? "",
            psychTestSummary: chatContext?.psychTestSummary ?? "",
            quizAnswer: chatContext?.headlineAnswer
              ? { prompt: chatContext.headlineAnswer.prompt, label: chatContext.headlineAnswer.label }
              : null,
          },
          history: historyMessages.map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setIsTyping(false);
        const kind = res.status === 429 || res.status === 503 ? "network" : "server";
        setErrorText({ kind, message: json.error || "챗봇 응답을 받아오지 못했습니다." });
        return;
      }

      setIsTyping(false);
      setMessages((m) => [...m, { role: "bot", text: json.reply }]);
      if (json.chips?.length) setChips(json.chips);
      setTurn(nextTurn);

      if (nextTurn >= TOTAL_TURNS && json.extract) {
        doneRef.current = true;
        window.setTimeout(() => onComplete?.(json.extract), 1200);
      }
    } catch {
      setIsTyping(false);
      setErrorText({ kind: "network", message: "네트워크 오류로 챗봇 응답을 받지 못했습니다." });
    }
  }

  function advance(userText) {
    if (doneRef.current || isTyping) return;
    const updated = [...messages, { role: "user", text: userText }];
    setMessages(updated);
    requestNextTurn(turn + 1, updated);
  }

  function handleChip(label) {
    if (isTyping) return;
    advance(label);
  }

  function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");
    advance(text);
  }

  function handleRetry() {
    requestNextTurn(turn + 1, messages);
  }

  const doneMax = turn >= TOTAL_TURNS;
  const showTextInput = !isTyping && !chips && !doneMax && !errorText;

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .ch-root, .ch-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .ch-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .ch-bubble-bot { background: rgba(255,255,255,0.05); border: 1px solid #2A2833; color: #EDE7DA; }
        .ch-bubble-user { background: #C9A24B; color: #100F16; }
        .ch-chip { background: rgba(201,162,75,0.08); border: 1px solid rgba(201,162,75,0.4); color: #C9A24B; min-height: 44px; }
        .ch-chip:active { background: rgba(201,162,75,0.2); }
        .ch-fade { animation: chFade 0.28s ease both; }
        @keyframes chFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .ch-dot { animation: chBlink 1.2s infinite ease-in-out; }
        .ch-dot:nth-child(2) { animation-delay: 0.15s; }
        .ch-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes chBlink { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }
        .ch-root button:focus-visible, .ch-root input:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
      ` }} />

      <div className="ch-root" style={{ width: "100%", maxWidth: "460px", display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid #1C1B24", display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={14} color="#C9A24B" />
          <span style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#C9A24B", textTransform: "uppercase" }}>
            무료 AI 상담
          </span>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "18px 18px 8px" }}>
          {messages.map((m, i) => (
            <div key={i} className="ch-fade" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
              <div
                className={m.role === "user" ? "ch-bubble-user" : "ch-bubble-bot"}
                style={{ maxWidth: "82%", padding: "12px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", fontSize: "14.5px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="ch-fade" style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
              <div className="ch-bubble-bot" style={{ padding: "14px 16px", borderRadius: "16px 16px 16px 4px", display: "flex", gap: "4px" }}>
                <span className="ch-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C97A6", display: "inline-block" }} />
                <span className="ch-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C97A6", display: "inline-block" }} />
                <span className="ch-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9C97A6", display: "inline-block" }} />
              </div>
            </div>
          )}

          {chips && !isTyping && (
            <div className="ch-fade" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px", marginBottom: "10px" }}>
              {chips.map((c) => (
                <button key={c} className="ch-chip" onClick={() => handleChip(c)} style={{ padding: "11px 16px", borderRadius: "999px", fontSize: "13px", cursor: "pointer" }}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {errorText && !isTyping && (
            <div className="ch-fade" style={{ marginBottom: "10px" }}>
              <ErrorNotice kind={errorText.kind} message={errorText.message} onRetry={handleRetry} />
            </div>
          )}

          {doneMax && (
            <div className="ch-fade" style={{ textAlign: "center", marginTop: "20px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#847E90", background: "rgba(255,255,255,0.03)", border: "1px solid #2A2833", borderRadius: "999px", padding: "6px 12px" }}>
                <ShieldCheck size={12} /> 상담 종료 — 리포트를 준비하고 있어요
              </div>
            </div>
          )}
        </div>

        {showTextInput && (
          <div className="ch-fade" style={{ padding: "12px 16px 20px", borderTop: "1px solid #1C1B24", display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={turn === 0 ? "안녕하세요 :)" : "편하게 이야기해주세요"}
              style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid #2A2833", borderRadius: "999px", padding: "12px 16px", color: "#EDE7DA", fontSize: "16px", outline: "none" }}
            />
            <button onClick={handleSend} aria-label="메시지 보내기" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#C9A24B", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Send size={16} color="#100F16" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
