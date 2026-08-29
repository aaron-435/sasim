"use client";

import React, { useEffect, useState } from "react";

/**
 * LoadingReveal — full-screen takeover shown while calculateSaju() is
 * in flight. Two things worth knowing:
 *
 * 1. The five dots are the 오행 (wood/fire/earth/metal/water) — a motif
 *    specific to this product rather than a generic spinner.
 * 2. Messages are staged PROCESS narration ("계산하고 있어요" /
 *    "분석하고 있어요"), not testimonials. There's no real user-review
 *    copy yet, and presenting invented quotes as genuine reviews would
 *    be misleading — swap MESSAGES below for real ones once the beta
 *    produces some worth featuring.
 * ------------------------------------------------------------------
 */

const ELEMENTS = [
  { key: "wood", color: "#4E8368" },
  { key: "fire", color: "#CB6249" },
  { key: "earth", color: "#B98A4E" },
  { key: "metal", color: "#C7C3D1" },
  { key: "water", color: "#3E6EA0" },
];

const DEFAULT_MESSAGES = [
  "생년월일시를 만세력에 대입하고 있어요",
  "오행 분포를 계산하고 있어요",
  "사주 원국을 그리고 있어요",
  "거의 다 됐어요",
];

export default function LoadingReveal({ messages = DEFAULT_MESSAGES }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % messages.length), 1500);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed", inset: 0, zIndex: 50, background: "#08080C",
        backgroundImage: "radial-gradient(circle at 50% -10%, rgba(201,162,75,0.12), transparent 55%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lrPulse { 0%, 100% { opacity: .28; transform: scale(0.82); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes lrFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .lr-dot { animation: lrPulse 1.6s ease-in-out infinite; }
        .lr-msg { animation: lrFade 0.4s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .lr-dot, .lr-msg { animation: none; }
        }
      ` }} />
      <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
        {ELEMENTS.map((el, i) => (
          <span
            key={el.key}
            className="lr-dot"
            style={{ width: 9, height: 9, borderRadius: "50%", background: el.color, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
      <p
        key={step}
        className="lr-msg"
        style={{
          fontFamily: "'Cormorant Garamond','Noto Serif KR',serif", fontWeight: 500,
          fontSize: "18px", color: "#EDE7DA", textAlign: "center", margin: 0, minHeight: "28px",
        }}
      >
        {messages[step]}
      </p>
    </div>
  );
}
