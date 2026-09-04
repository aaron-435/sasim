"use client";

import React from "react";
import { ArrowLeft, MessageCircleQuestion } from "lucide-react";

/**
 * QAQuestionPage — full-screen scrollable question list for one 중분류
 * ------------------------------------------------------------------
 * Last step before a pick becomes a real chat message — see
 * QAChat.jsx's onSelect handler, which pushes the picked question's
 * text as a user bubble and fires /api/qa-answer. Subcategories run
 * ~20 questions each; a plain scrollable page reads much better than
 * the capped-height bubble this replaced.
 * ------------------------------------------------------------------
 */
export default function QAQuestionPage({ subcategory, onBack, onSelect }) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", backgroundImage: "radial-gradient(circle at 50% -10%, rgba(201,162,75,0.10), transparent 55%)", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .qq-root, .qq-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .qq-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .qq-card {
          width: 100%; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid #2A2833;
          border-radius: 12px; padding: 14px 16px; color: #EDE7DA; cursor: pointer;
          transition: border-color 0.18s ease, background 0.18s ease; display: flex; align-items: flex-start;
          gap: 10px; margin-bottom: 8px; font-size: 14px; line-height: 1.5;
        }
        .qq-card:hover { border-color: #C9A24B; background: rgba(201,162,75,0.05); }
        .qq-back { background: none; border: none; color: #8B879A; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 8px; margin: -8px 0 20px -8px; font-size: 13px; }
        .qq-root button:focus-visible { outline: 2px solid #C9A24B; outline-offset: 2px; }
      ` }} />
      <div className="qq-root" style={{ width: "100%", maxWidth: "460px", padding: "24px 22px 40px" }}>
        <button type="button" className="qq-back" onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={2} /> 이전
        </button>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "10px" }}>
            {subcategory.name_ko}
          </div>
          <h1 className="qq-serif" style={{ fontSize: "24px", fontWeight: 500, color: "#EDE7DA", margin: 0 }}>
            궁금한 질문을 골라주세요
          </h1>
        </div>

        <div>
          {subcategory.questions.map((q) => (
            <button key={q.id} type="button" className="qq-card" onClick={() => onSelect(q)}>
              <MessageCircleQuestion size={15} strokeWidth={1.75} color="#8B879A" style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>{q.text_ko}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
