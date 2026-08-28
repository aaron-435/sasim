"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { MODULES } from "@/lib/modules";

/**
 * ModuleSelect — lets a tester pick which of the 5 wired-up 30-question
 * modules to run next. The production app doesn't have a real "module
 * picker" UX designed yet (each module will likely map to its own paid
 * unlock flow eventually) — this is the minimal screen needed to
 * exercise modules 1-5 end-to-end through the same Quiz→Chat→Report
 * pipeline until that's designed.
 * ------------------------------------------------------------------
 */

export default function ModuleSelect({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", backgroundImage: "radial-gradient(circle at 50% -10%, rgba(201,162,75,0.10), transparent 55%)", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .ms-root, .ms-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .ms-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .ms-card { width: 100%; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid #2A2833; border-radius: 14px; padding: 18px 20px; color: #EDE7DA; cursor: pointer; transition: border-color 0.18s ease, background 0.18s ease; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .ms-card:hover { border-color: #C9A24B; background: rgba(201,162,75,0.05); }
      ` }} />
      <div className="ms-root" style={{ width: "100%", maxWidth: "460px", padding: "56px 22px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.16em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "14px" }}>
            <Sparkles size={12} strokeWidth={1.75} />
            테스트용 모듈 선택
          </div>
          <h1 className="ms-serif" style={{ fontSize: "26px", fontWeight: 500, color: "#EDE7DA", margin: 0, lineHeight: 1.4 }}>
            어떤 심리테스트를 진행할까요?
          </h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {MODULES.map((m) => (
            <button key={m.id} type="button" className="ms-card" onClick={() => onSelect?.(m.id)}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>{m.title}</div>
                <div style={{ fontSize: "12.5px", color: "#9C97A6" }}>{m.subtitle}</div>
              </div>
              <ArrowRight size={17} strokeWidth={2.25} color="#C9A24B" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
