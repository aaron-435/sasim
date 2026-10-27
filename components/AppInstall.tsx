"use client";

import React from "react";
import qrcode from "qrcode-generator";
import { Check, Copy } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/jsonLd";
import { getDictionary, type Locale } from "@/lib/i18n";
import { trackHandoffCreate, trackStoreClick } from "@/lib/analytics";
import type { HandoffData, HandoffSource } from "@/lib/handoff";

/**
 * The web's way into the app (SPEC 2026-10-27 B2·B4).
 *
 * Without `handoff` it is the plain install line: the store button for this device (Android →
 * Google Play, iPhone → App Store once APP_STORE_URL is set, else an honest "iOS soon";
 * desktop → both).
 *
 * With `handoff` the main button is "Continue in the app". Nothing is sent before that tap.
 * The tap stores what the visitor typed on this page (POST /api/handoff, 7 days, one use) and
 * shows the 6-digit code with the store button. On Android the page also tries the
 * fatesaid://handoff link once — if the app is there it opens and picks the data up, if not
 * nothing happens and the code is on screen. iPhone gets the same link as a button instead,
 * since Safari shows an error dialog for a link no app handles. Desktop gets a QR of the link.
 *
 * `showCode={false}` is for the Q&A page, which already shows its older code (still the one
 * installed 1.2.0 apps can redeem); there the tap only makes the link.
 */

type Device = "android" | "ios" | "desktop";
type Created = { code: string; deepLink: string };

function detectDevice(): Device {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "android";
  // iPadOS reports itself as a Mac; touch points tell them apart.
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  return "desktop";
}

function QrCode({ text, label }: { text: string; label: string }) {
  const { d, size } = React.useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    let path = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) path += `M${c + 4} ${r + 4}h1v1h-1z`;
    return { d: path, size: n + 8 };
  }, [text]);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={168} height={168} role="img" aria-label={label} shapeRendering="crispEdges" style={{ display: "block", background: "#FFFFFF", borderRadius: 8 }}>
      <path d={d} fill="#0F1A15" />
    </svg>
  );
}

export default function AppInstall({
  locale,
  align = "start",
  handoff,
  showCode = true,
}: {
  locale: Locale;
  align?: "start" | "center";
  handoff?: { source: HandoffSource; data?: HandoffData | null };
  showCode?: boolean;
}) {
  const t = getDictionary(locale);
  const h = t.common.handoff;
  // Unknown until mounted, so the server HTML and the first client render agree.
  const [device, setDevice] = React.useState<Device | null>(null);
  const [created, setCreated] = React.useState<Created | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => setDevice(detectDevice()), []);

  const hasData = Boolean(handoff?.data && Object.keys(handoff.data).length > 0);

  const create = async () => {
    if (!handoff || busy) return;
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch("/api/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: handoff.source, locale, data: handoff.data ?? {} }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || typeof json.code !== "string" || typeof json.deepLink !== "string") throw new Error(String(res.status));
      setCreated({ code: json.code, deepLink: json.deepLink });
      trackHandoffCreate(handoff.source, device ?? "desktop", Object.keys(handoff.data ?? {}).length, locale);
      if (device === "android") window.location.href = json.deepLink;
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  };

  // In the plain install line the first store link is the main button; in the handoff panel all are secondary.
  const storeLinks = (primary: boolean) => {
    const cls = primary ? "ai-btn" : "ai-store";
    const surface = handoff?.source ?? "landing";
    const play = <a key="play" className={cls} href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackStoreClick(surface, "play", locale)}>{t.common.playCta}</a>;
    const ios = APP_STORE_URL ? (
      <a key="ios" className={device === "ios" ? cls : "ai-store"} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackStoreClick(surface, "app_store", locale)}>{h.appStoreCta}</a>
    ) : (
      <span key="ios" className="ai-note">{t.common.iosSoon}</span>
    );
    // Before the device is known (server render, first paint) both are offered, like desktop.
    return device === "android" ? [play] : device === "ios" ? [ios] : [play, ios];
  };

  const css = `
    .ai-root { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
    .ai-root.ai-center { align-items: center; text-align: center; }
    .ai-root.ai-start { align-items: flex-start; }
    .ai-btn { display: inline-flex; align-items: center; justify-content: center; background: #6FA98B; color: #0F1A15; border: none; border-radius: 12px; padding: 0 22px; min-height: 48px; font-size: 15px; font-weight: 700; text-decoration: none; cursor: pointer; font-family: inherit; }
    .ai-btn:disabled { opacity: 0.6; cursor: default; }
    .ai-store { display: inline-flex; align-items: center; background: transparent; color: #D9C9A3; border: 1px solid rgba(111,169,139,0.5); border-radius: 12px; padding: 0 18px; min-height: 44px; font-size: 14px; font-weight: 600; text-decoration: none; }
    .ai-stores { display: flex; flex-wrap: wrap; gap: 10px 14px; align-items: center; }
    .ai-center .ai-stores { justify-content: center; }
    .ai-note { font-size: 13px; line-height: 1.6; color: inherit; opacity: 0.75; margin: 0; }
    .ai-panel { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 420px; padding: 16px; border-radius: 14px; border: 1px solid rgba(111,169,139,0.35); background: rgba(111,169,139,0.06); }
    .ai-center .ai-panel { align-items: center; }
    .ai-code { display: inline-flex; align-items: center; gap: 10px; align-self: flex-start; background: rgba(111,169,139,0.1); border: 1px solid rgba(111,169,139,0.4); border-radius: 10px; padding: 8px 14px; min-height: 44px; cursor: pointer; font-family: inherit; color: #6FA98B; }
    .ai-center .ai-code { align-self: center; }
    .ai-code-num { font-size: 22px; font-weight: 700; letter-spacing: 0.12em; font-variant-numeric: tabular-nums; }
    .ai-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6FA98B; margin: 0; }
    .ai-link { color: #6FA98B; font-size: 14px; text-decoration: underline; min-height: 44px; display: inline-flex; align-items: center; }
    .ai-qr { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
    .ai-error { font-size: 13px; color: #E08A73; margin: 0; }
  `;

  if (!handoff) {
    return (
      <div className={`ai-root ai-${align}`}>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {storeLinks(true)}
      </div>
    );
  }

  return (
    <div className={`ai-root ai-${align}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {!created ? (
        <>
          <button type="button" className="ai-btn" onClick={create} disabled={busy} aria-busy={busy}>
            {busy ? h.busy : h.cta}
          </button>
          {hasData && <p className="ai-note">{h.note}</p>}
          {failed && <p className="ai-error" role="alert">{h.error}</p>}
        </>
      ) : (
        <div className="ai-panel" aria-live="polite">
          {showCode && (
            <>
              <p className="ai-label">{h.codeLabel}</p>
              <button type="button" className="ai-code" onClick={() => copy(created.code)} aria-label={`${h.codeLabel} ${created.code.split("").join(" ")}. ${copied ? h.copied : h.copy}`}>
                <span className="ai-code-num">{created.code}</span>
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              </button>
              <p className="ai-note">{h.codeHelp}</p>
            </>
          )}
          {device === "desktop" || device === null ? (
            <div className="ai-qr">
              <QrCode text={created.deepLink} label={h.qrLabel} />
              <p className="ai-note" style={{ maxWidth: 200 }}>{h.qrHelp}</p>
            </div>
          ) : (
            <a className="ai-link" href={created.deepLink}>{h.openApp}</a>
          )}
          <div className="ai-stores">{storeLinks(false)}</div>
        </div>
      )}
    </div>
  );
}
