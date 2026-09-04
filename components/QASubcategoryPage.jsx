"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

/**
 * QASubcategoryPage — full-screen 중분류 picker for one 대분류
 * ------------------------------------------------------------------
 * Navigated to from QAChat.jsx when a major category is tapped in the
 * chat (2026-09-04: moved out of an inline chat bubble into its own
 * page — a 20-question scrollable bubble was cramped, and this matches
 * the Yodha reference screens closer, which used real navigation
 * screens rather than inline chat pickers).
 *
 * lib/questionBank.json subcategories have no third tier today (every
 * subcategory goes straight to its `questions` array) — see
 * onSelect's caller in QAChat.jsx for the one-line branch point if a
 * 소분류 level is ever added later.
 * ------------------------------------------------------------------
 */
export default function QASubcategoryPage({ category, onBack, onSelect }) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", backgroundImage: "radial-gradient(circle at 50% -10%, rgba(201,162,75,0.10), transparent 55%)", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .qsc-root, .qsc-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .qsc-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .qsc-card {
          width: 100%; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid #2A2833;
          border-radius: 14px; padding: 16px 18px; color: #EDE7DA; cursor: pointer;
          transition: border-color 0.18s ease, background 0.18s ease; display: flex; align-items: center;
          justify-content: space-between; gap: 12px; margin-bottom: 10px; font-size: 14.5px;
        }
        .qsc-card:hover { border-color: #C9A24B; background: rgba(201,162,75,0.05); }
        .qsc-back { background: none; border: none; color: #8B879A; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 8px; margin: -8px 0 20px -8px; font-size: 13px; }
        .qsc-root button:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
      ` }} />
      <div className="qsc-root" style={{ width: "100%", maxWidth: "460px", padding: "24px 22px 40px" }}>
        <button type="button" className="qsc-back" onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={2} /> 이전
        </button>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.16em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "10px" }}>
            <Sparkles size={12} strokeWidth={1.75} /> {category.name_ko}
          </div>
          <h1 className="qsc-serif" style={{ fontSize: "24px", fontWeight: 500, color: "#EDE7DA", margin: 0 }}>
            더 자세히 골라주세요
          </h1>
        </div>

        <div>
          {category.subcategories.map((sub) => (
            <button key={sub.id} type="button" className="qsc-card" onClick={() => onSelect(sub)}>
              <span>{sub.name_ko}</span>
              <ArrowRight size={16} strokeWidth={2.25} color="#C9A24B" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
