"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import QuickBirthForm from "@/components/QuickBirthForm";
import { getDictionary, LOCALES } from "@/lib/i18n";
import { COMPATIBILITY_CONTENT } from "@/lib/compatibilityContent";
import { logEvent } from "@/lib/analytics";

/**
 * InviteAccept — the /c/<code> page (SPEC 2026-10-05 §6). A friend who got a link from the app
 * enters their birth date (and, if they like, a name and birth hour), agrees to the result
 * being passed back to the sender, and sees the relation name plus one line. The answer goes to
 * /api/invites/<code>; the birth date is used there and not stored. No signup, no payment.
 *
 * `state` comes from the server render: "open" shows the form, the others a short notice.
 */

const LOCALE_LABELS = { ko: "한국어", en: "English", es: "Español" };

/** The first sentence of a relation body — the page shows a taste, the app has the rest. */
function firstSentence(text) {
  const m = text.match(/^.+?[.!?。](?=\s|$)/);
  return m ? m[0] : text;
}

export default function InviteAccept({ code, locale, state, senderName }) {
  const t = getDictionary(locale);
  const c = t.invite;
  const [hour, setHour] = React.useState("");
  const [friendName, setFriendName] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [closed, setClosed] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const resultRef = React.useRef(null);

  const hasSender = senderName.trim().length > 0;
  const view = closed ?? state;

  const submit = async (dob) => {
    if (!consent) {
      setError(c.consentRequired);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/invites/${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthYear: dob.year,
          birthMonth: dob.month,
          birthDay: dob.day,
          birthHour: hour === "" ? null : Number(hour),
          friendName: friendName.trim() || undefined,
          consent: true,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 410) return setClosed("expired");
      if (res.status === 409) return setClosed("answered");
      if (res.status === 404) return setClosed("notFound");
      if (!res.ok || !json.compatibility) throw new Error(String(res.status));
      setResult({ compatibility: json.compatibility, friendName: friendName.trim() });
      logEvent("invite_accept", { surface: "web" }, locale);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setError(t.typeCard.error);
    } finally {
      setSubmitting(false);
    }
  };

  const extraFields = (
    <>
      <div>
        <label className="qb-label" htmlFor="inv-name">{c.nameLabel}</label>
        <input id="inv-name" className="qb-select iv-name" maxLength={24} autoComplete="nickname" placeholder={c.namePlaceholder} value={friendName} onChange={(e) => setFriendName(e.target.value)} />
      </div>
      <div>
        <label className="qb-label" htmlFor="inv-hour">{t.calculator.hourLabel}</label>
        <select id="inv-hour" className="qb-select" value={hour} onChange={(e) => setHour(e.target.value)}>
          <option value="">{t.calculator.hourUnknown}</option>
          {Array.from({ length: 24 }, (_, h) => (
            <option key={h} value={String(h)}>{t.calculator.hourOption(h)}</option>
          ))}
        </select>
      </div>
      <label className="iv-consent">
        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setError(null); }} />
        <span>
          {hasSender ? c.consent(senderName) : c.consentNoName}{" "}
          <a href={`/privacy?lang=${locale}`} target="_blank" rel="noopener noreferrer">{c.privacyLink}</a>
        </span>
      </label>
    </>
  );

  const notice = {
    expired: [c.expiredTitle, c.expiredBody],
    answered: [c.answeredTitle, c.answeredBody],
    notFound: [c.notFoundTitle, c.notFoundBody],
    unavailable: [c.unavailableTitle, c.unavailableBody],
  }[view];

  const relation = result?.compatibility ? (COMPATIBILITY_CONTENT[locale] ?? COMPATIBILITY_CONTENT.en).relations[result.compatibility.relation] : null;

  return (
    <main className="iv-root" lang={locale}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .iv-root, .iv-root * { box-sizing: border-box; }
        .iv-root { min-height: 100vh; background: #122019; color: #D9C9A3; font-family: 'Manrope', 'Noto Sans KR', sans-serif; padding-bottom: 64px; }
        .iv-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; font-weight: 500; }
        .iv-wrap { width: 100%; max-width: 560px; margin: 0 auto; padding: 0 16px; }
        .iv-header { display: flex; align-items: center; justify-content: space-between; padding-top: 22px; gap: 12px; flex-wrap: wrap; }
        .iv-brand { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; letter-spacing: 0.16em; color: #6FA98B; text-transform: uppercase; text-decoration: none; min-height: 32px; }
        .iv-langs { display: flex; gap: 6px; }
        .iv-lang { border: 1px solid #26332B; color: #9C9277; border-radius: 999px; padding: 6px 12px; font-size: 12px; min-height: 32px; display: inline-flex; align-items: center; text-decoration: none; }
        .iv-lang[aria-current="page"] { background: rgba(111,169,139,0.14); border-color: rgba(111,169,139,0.4); color: #6FA98B; }
        .iv-eyebrow { font-size: 13px; font-weight: 700; color: #6FA98B; margin: 44px 0 0; }
        .iv-h1 { font-size: clamp(32px, 7vw, 46px); line-height: 1.14; margin: 8px 0 0; }
        .iv-lead { font-size: 16px; line-height: 1.7; color: #9C9277; margin: 14px 0 26px; }
        .iv-name { max-width: 280px; }
        .iv-consent { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; line-height: 1.6; color: #9C9277; cursor: pointer; }
        .iv-consent input { width: 20px; height: 20px; margin: 2px 0 0; flex: none; accent-color: #6FA98B; }
        .iv-consent a { color: #6FA98B; }
        .iv-expiry { font-size: 12.5px; color: #9C9277; margin: 14px 0 0; }
        .iv-result { margin-top: 36px; padding: 28px 20px; border-radius: 20px; border: 1px solid rgba(111,169,139,0.35); background: #16261d; text-align: center; }
        .iv-result:focus { outline: none; }
        .iv-names { font-size: 13px; font-weight: 600; color: #9C9277; margin: 8px 0 0; }
        .iv-headline { font-size: clamp(28px, 6vw, 36px); line-height: 1.2; margin: 12px 0 0; }
        .iv-line { font-size: 15.5px; line-height: 1.7; color: #D9C9A3; margin: 14px 0 0; }
        .iv-sent { font-size: 13px; color: #9C9277; margin: 18px 0 0; }
        .iv-notice { margin-top: 44px; }
        .iv-notice p { font-size: 15.5px; line-height: 1.7; color: #9C9277; margin: 12px 0 0; }
        .iv-app { margin-top: 36px; padding: 20px; border-radius: 16px; background: rgba(111,169,139,0.08); border: 1px solid rgba(111,169,139,0.25); }
        .iv-app h2 { margin: 0; font-size: 18px; font-weight: 600; }
        .iv-app p { margin: 8px 0 0; font-size: 14.5px; line-height: 1.7; color: #9C9277; }
        .iv-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; background: #6FA98B; color: #0F1A15; border-radius: 12px; padding: 0 22px; min-height: 48px; font-size: 15px; font-weight: 700; text-decoration: none; }
        .iv-root a:focus-visible, .iv-root input:focus-visible { outline: 2px solid #6FA98B; outline-offset: 3px; }
      ` }} />
      <div className="iv-wrap">
        <header className="iv-header">
          <a className="iv-brand" href="/"><Sparkles size={13} strokeWidth={1.75} aria-hidden="true" />{t.common.brand}</a>
          <nav className="iv-langs" aria-label={t.landing.langLabel}>
            {LOCALES.map((l) => (
              <a key={l} className="iv-lang" href={`/c/${code}?lang=${l}`} hrefLang={l} aria-current={l === locale ? "page" : undefined}>
                {LOCALE_LABELS[l]}
              </a>
            ))}
          </nav>
        </header>

        {notice ? (
          <section className="iv-notice">
            <h1 className="iv-serif iv-h1">{notice[0]}</h1>
            <p>{notice[1]}</p>
          </section>
        ) : result && relation ? (
          <div ref={resultRef} tabIndex={-1} className="iv-result" aria-live="polite">
            <p className="iv-eyebrow" style={{ margin: 0 }}>{c.resultEyebrow}</p>
            <p className="iv-names">{result.friendName || c.me} · {hasSender ? senderName : "—"}</p>
            <h1 className="iv-serif iv-headline">{relation.headline}</h1>
            <p className="iv-line">{firstSentence(relation.body)}</p>
            <p className="iv-sent">{hasSender ? c.sentNote(senderName) : c.sentNoteNoName}</p>
          </div>
        ) : (
          <>
            <p className="iv-eyebrow">{c.eyebrow}</p>
            <h1 className="iv-serif iv-h1">{hasSender ? c.title(senderName) : c.titleNoName}</h1>
            <p className="iv-lead">{c.lead}</p>
            <QuickBirthForm locale={locale} t={t} labels={{ ...t.typeCard, submit: c.submit }} submitting={submitting} error={error} onSubmit={submit} hourField={extraFields} idPrefix="inv" />
            <p className="iv-expiry">{c.expiryNote}</p>
          </>
        )}

        <section className="iv-app" aria-labelledby="iv-app-title">
          <h2 id="iv-app-title">{c.appTitle}</h2>
          <p>{c.appBody}</p>
          <a className="iv-cta" href="/">{t.calculator.homeCta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></a>
        </section>
      </div>
    </main>
  );
}
