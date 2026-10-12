"use client";

import React from "react";
import { getDictionary } from "@/lib/i18n";

/**
 * CoupleCode — the /p/<code> page. The app shares this link for couple mode instead of a bare
 * code: the page shows the code (copyable) and the three steps to enter it in the app. Nothing is
 * looked up or stored; `code` is already normalized on the server (null = unreadable).
 */
export default function CoupleCode({ locale, code }) {
  const c = getDictionary(locale).couple;
  const [copied, setCopied] = React.useState(false);
  const shown = code ? `${code.slice(0, 4)}-${code.slice(4)}` : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (in-app browsers); the code is on screen to read.
    }
  };

  return (
    <main className="cp-root" lang={locale}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cp-root, .cp-root * { box-sizing: border-box; }
        .cp-root { min-height: 100vh; background: #122019; color: #D9C9A3; font-family: 'Manrope', 'Noto Sans KR', sans-serif; padding-bottom: 64px; }
        .cp-wrap { width: 100%; max-width: 560px; margin: 0 auto; padding: 0 16px; }
        .cp-brand { display: inline-flex; align-items: center; min-height: 32px; margin-top: 22px; font-size: 12px; letter-spacing: 0.16em; color: #6FA98B; text-transform: uppercase; text-decoration: none; }
        .cp-eyebrow { font-size: 13px; font-weight: 700; color: #6FA98B; margin: 44px 0 0; }
        .cp-h1 { font-size: clamp(28px, 7vw, 40px); line-height: 1.2; margin: 8px 0 0; font-weight: 600; }
        .cp-lead { font-size: 16px; line-height: 1.7; color: #9C9277; margin: 14px 0 26px; }
        .cp-code-card { padding: 24px 20px; border-radius: 20px; border: 1px solid rgba(111,169,139,0.35); background: #16261d; text-align: center; }
        .cp-code-label { font-size: 13px; font-weight: 600; color: #9C9277; margin: 0; }
        .cp-code { font-size: clamp(30px, 9vw, 44px); letter-spacing: 0.12em; margin: 10px 0 0; font-weight: 700; color: #D9C9A3; font-variant-numeric: tabular-nums; }
        .cp-copy { margin-top: 18px; min-height: 44px; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(111,169,139,0.5); background: rgba(111,169,139,0.14); color: #6FA98B; font-size: 15px; font-weight: 600; cursor: pointer; }
        .cp-steps-title { font-size: 15px; font-weight: 700; margin: 32px 0 0; }
        .cp-steps { margin: 10px 0 0; padding-left: 22px; font-size: 15.5px; line-height: 1.8; color: #D9C9A3; }
        .cp-note { font-size: 12.5px; line-height: 1.7; color: #9C9277; margin: 22px 0 0; }
      ` }} />
      <div className="cp-wrap">
        <a className="cp-brand" href="/">Fatesaid</a>
        <p className="cp-eyebrow">{c.eyebrow}</p>
        {code ? (
          <>
            <h1 className="cp-h1">{c.title}</h1>
            <p className="cp-lead">{c.lead}</p>
            <div className="cp-code-card">
              <p className="cp-code-label">{c.codeLabel}</p>
              <p className="cp-code" aria-label={shown.split("").join(" ")}>{shown}</p>
              <button type="button" className="cp-copy" onClick={copy}>{copied ? c.copied : c.copy}</button>
            </div>
            <p className="cp-steps-title">{c.stepsTitle}</p>
            <ol className="cp-steps">
              {c.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="cp-note">{c.note}</p>
          </>
        ) : (
          <>
            <h1 className="cp-h1">{c.invalidTitle}</h1>
            <p className="cp-lead">{c.invalidBody}</p>
          </>
        )}
      </div>
    </main>
  );
}
