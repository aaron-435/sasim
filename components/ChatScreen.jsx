"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Send, ShieldCheck } from "lucide-react";
import ErrorNotice from "./ErrorNotice";

/**
 * ChatScreen — messenger-style version
 * ------------------------------------------------------------------
 * Turn 1 (the opener — greeting + a light nod to the psych-test result,
 * never a full explanation of it) now fires automatically on mount via
 * POST /api/chat, instead of a hardcoded static greeting. There's no
 * more Phase A / chip mechanic — every turn is open free-text, because
 * the user's own words make better report material than a forced pick
 * from 2-3 options.
 *
 * Every reply comes back as `{ lines: string[] }` — 2-4 short messages,
 * revealed one at a time with a brief "typing..." pause between each
 * (see revealLines), the same cadence as someone texting several short
 * messages in a row rather than one dense paragraph.
 *
 * `turnHistoryRef` tracks the actual one-entry-per-API-turn history sent
 * to the server (a bot turn's lines are rejoined into one string there),
 * kept separate from `messages` (the UI's one-bubble-per-line list) so
 * the model always sees "the assistant said X" as a single turn, not as
 * several unrelated turns.
 * ------------------------------------------------------------------
 */

const TOTAL_TURNS = 7;

export default function ChatScreen({ chatContext, sessionId, onComplete }) {
  const [messages, setMessages] = useState([]);
  const [turn, setTurn] = useState(0); // 0 = opener not back yet; 1-7 = completed AI turns
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const scrollRef = useRef(null);
  const sessionStartedAt = useRef(Date.now()).current;
  const doneRef = useRef(false);
  const turnHistoryRef = useRef([]);
  const mountedRef = useRef(true);
  const openerFiredRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, errorText]);

  const revealLines = useCallback(async (lines) => {
    for (const line of lines) {
      if (!mountedRef.current) return;
      setIsTyping(true);
      const delay = Math.min(1800, 450 + line.length * 18);
      await new Promise((r) => window.setTimeout(r, delay));
      if (!mountedRef.current) return;
      setIsTyping(false);
      setMessages((m) => [...m, { role: "bot", text: line }]);
      await new Promise((r) => window.setTimeout(r, 180));
    }
  }, []);

  const requestNextTurn = useCallback(
    async (nextTurn, apiHistory) => {
      setIsTyping(true);
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
            history: apiHistory,
            sessionId,
          }),
        });
        const json = await res.json();

        if (!res.ok) {
          setIsTyping(false);
          const kind = res.status === 429 || res.status === 503 ? "network" : "server";
          setErrorText({ kind, message: json.error || "챗봇 응답을 받아오지 못했습니다." });
          return;
        }

        const lines = Array.isArray(json.lines) ? json.lines : [];
        await revealLines(lines);
        if (!mountedRef.current) return;

        turnHistoryRef.current = [...apiHistory, { role: "assistant", content: lines.join(" ") }];
        setTurn(nextTurn);

        if (nextTurn >= TOTAL_TURNS && json.extract) {
          doneRef.current = true;
          window.setTimeout(() => onComplete?.(json.extract), 1200);
        }
      } catch {
        if (!mountedRef.current) return;
        setIsTyping(false);
        setErrorText({ kind: "network", message: "네트워크 오류로 챗봇 응답을 받지 못했습니다." });
      }
    },
    [chatContext, onComplete, revealLines, sessionStartedAt, sessionId]
  );

  // 턴1(오프닝)은 사용자 입력 없이 마운트 즉시 시작한다. React StrictMode가
  // 개발 모드에서 effect를 두 번 실행하므로, ref 가드로 실제 호출은 한 번만 나가게 한다.
  useEffect(() => {
    if (openerFiredRef.current) return;
    openerFiredRef.current = true;
    requestNextTurn(1, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSend() {
    const text = input.trim();
    if (!text || isTyping || doneRef.current) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    const nextHistory = [...turnHistoryRef.current, { role: "user", content: text }];
    turnHistoryRef.current = nextHistory;
    requestNextTurn(turn + 1, nextHistory);
  }

  function handleRetry() {
    requestNextTurn(turn + 1, turnHistoryRef.current);
  }

  const doneMax = turn >= TOTAL_TURNS;
  const showTextInput = !isTyping && !doneMax && !errorText;

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .ch-root, .ch-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .ch-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .ch-bubble-bot { background: rgba(255,255,255,0.05); border: 1px solid #2A2833; color: #EDE7DA; }
        .ch-bubble-user { background: #C9A24B; color: #100F16; }
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
              placeholder="편하게 이야기해주세요"
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
