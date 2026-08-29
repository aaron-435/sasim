"use client";

import React from "react";
import { AlertCircle, WifiOff, RotateCcw } from "lucide-react";

/**
 * ErrorNotice — shared error presentation used by OnboardingBirthChart
 * and ChatScreen. kind="network" covers transient/connection failures
 * (browser fetch throw, 429/503 responses) where "새로고침 해주세요" /
 * retry is the right call to action. kind="server" covers everything
 * else (validation, beta-sandbox limits, etc.) where the message itself
 * already explains what happened and retrying the same input won't
 * necessarily help.
 * ------------------------------------------------------------------
 */
export default function ErrorNotice({ kind = "server", message, onRetry }) {
  const Icon = kind === "network" ? WifiOff : AlertCircle;
  const title = kind === "network" ? "연결이 원활하지 않아요" : "문제가 발생했어요";
  const retryLabel = kind === "network" ? "새로고침 해주세요" : "다시 시도";

  return (
    <div
      className="en-fade"
      style={{
        display: "flex", flexDirection: "column", gap: "12px",
        background: "rgba(203,98,73,0.07)", border: "1px solid rgba(203,98,73,0.28)",
        borderRadius: "12px", padding: "14px 16px",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes enFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .en-fade { animation: enFade 0.28s ease both; }
      ` }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <Icon size={17} strokeWidth={1.75} color="#CB6249" style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "#EDE7DA" }}>{title}</p>
          <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#C7C3D1", lineHeight: 1.55 }}>{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.05)", border: "1px solid #2A2833", borderRadius: "999px",
            padding: "9px 15px", color: "#EDE7DA", fontSize: "12.5px", fontWeight: 600, cursor: "pointer",
            minHeight: "36px",
          }}
        >
          <RotateCcw size={13} strokeWidth={2} /> {retryLabel}
        </button>
      )}
    </div>
  );
}
