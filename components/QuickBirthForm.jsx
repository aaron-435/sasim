"use client";

import React from "react";
import { dobFieldOrder, dobSeparator } from "@/lib/dobOrder";

/**
 * QuickBirthForm — the short birth-date form behind the landing type card and the
 * /saju-calculator page (2026-10-05). Unlike OnboardingWizard it asks for no name, gender or
 * city and saves nothing: it posts to /api/saju without a sessionId, so the route computes
 * and returns but never writes a `sessions` / `saju_results` row.
 *
 * The date fields follow the visitor's own date order (lib/dobOrder.ts). That order reads
 * the device region through Intl, which differs between the server render and the browser,
 * so it starts at the language default and is corrected after mount.
 */

const FALLBACK_ORDER = { ko: ["year", "month", "day"], en: ["month", "day", "year"], es: ["day", "month", "year"] };

export function isValidBirthDate(year, month, day) {
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return false;
  if (y < 1900 || m < 1 || m > 12 || d < 1) return false;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return false;
  return date.getTime() <= Date.now();
}

/**
 * Calls /api/saju with only a birth date (and an optional hour). Gender only steers the
 * 10-year cycle direction, which neither the type nor the four pillars use, so a fixed value
 * is sent to satisfy the route's required field. Resolves to the route's JSON or throws.
 */
export async function fetchQuickSaju({ year, month, day, hour = null }) {
  const res = await fetch("/api/saju", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      birthYear: Number(year),
      birthMonth: Number(month),
      birthDay: Number(day),
      birthHour: hour,
      birthMinute: 0,
      isFemale: false,
    }),
  });
  if (!res.ok) throw new Error(`saju ${res.status}`);
  return res.json();
}

export default function QuickBirthForm({ locale, t, labels, submitting, error, onSubmit, hourField = null, idPrefix = "qb" }) {
  const [order, setOrder] = React.useState(FALLBACK_ORDER[locale] ?? FALLBACK_ORDER.en);
  const [values, setValues] = React.useState({ year: "", month: "", day: "" });
  const [invalid, setInvalid] = React.useState(false);
  const refs = { year: React.useRef(null), month: React.useRef(null), day: React.useRef(null) };

  React.useEffect(() => {
    setOrder(dobFieldOrder(locale));
  }, [locale]);

  const placeholders = { year: t.onboarding.yearPlaceholder, month: t.onboarding.monthPlaceholder, day: t.onboarding.dayPlaceholder };
  const maxLen = { year: 4, month: 2, day: 2 };

  const change = (field, i) => (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, maxLen[field]);
    setValues((prev) => ({ ...prev, [field]: v }));
    setInvalid(false);
    const next = order[i + 1];
    if (next && v.length === maxLen[field]) refs[next].current?.focus();
  };

  const submit = (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!isValidBirthDate(values.year, values.month, values.day)) {
      setInvalid(true);
      return;
    }
    onSubmit({ year: Number(values.year), month: Number(values.month), day: Number(values.day) });
  };

  const message = invalid ? labels.invalidDate : error;

  return (
    <form className="qb-form" onSubmit={submit} noValidate>
      <style dangerouslySetInnerHTML={{ __html: `
        .qb-form { display: flex; flex-direction: column; gap: 14px; }
        .qb-label { font-size: 13px; font-weight: 600; color: #9C9277; margin: 0 0 8px; display: block; }
        .qb-dob { display: flex; align-items: center; gap: 8px; }
        .qb-sep { color: #9C9277; }
        .qb-input, .qb-select { background: rgba(255,255,255,0.04); border: 1px solid #26332B; color: #D9C9A3; border-radius: 10px; min-height: 48px; font-size: 16px; font-family: inherit; padding: 0 12px; }
        .qb-input { width: 72px; text-align: center; font-variant-numeric: tabular-nums; }
        .qb-input.qb-year { width: 92px; }
        .qb-select { width: 100%; max-width: 280px; }
        .qb-input:focus, .qb-select:focus { outline: 2px solid #6FA98B; outline-offset: 1px; border-color: transparent; }
        .qb-input[aria-invalid="true"] { border-color: #C1503B; }
        .qb-submit { align-self: flex-start; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #6FA98B; color: #0F1A15; border: none; border-radius: 12px; padding: 0 24px; min-height: 52px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: inherit; }
        .qb-submit:hover { background: #7db89a; }
        .qb-submit[disabled] { opacity: 0.6; cursor: default; }
        .qb-submit:focus-visible { outline: 2px solid #6FA98B; outline-offset: 3px; }
        .qb-error { font-size: 13.5px; color: #E08B78; margin: 0; }
      ` }} />
      <div>
        <span className="qb-label" id={`${idPrefix}-dob-label`}>{labels.dateLabel}</span>
        <div className="qb-dob" role="group" aria-labelledby={`${idPrefix}-dob-label`}>
          {order.map((field, i) => (
            <React.Fragment key={field}>
              {i > 0 && <span className="qb-sep" aria-hidden="true">{dobSeparator(locale)}</span>}
              <input
                ref={refs[field]}
                className={`qb-input${field === "year" ? " qb-year" : ""}`}
                inputMode="numeric"
                autoComplete={`bday-${field}`}
                placeholder={placeholders[field]}
                aria-label={labels.fieldLabels[field]}
                aria-invalid={invalid}
                value={values[field]}
                onChange={change(field, i)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      {hourField}
      <button type="submit" className="qb-submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? labels.loading : labels.submit}
      </button>
      {message && <p className="qb-error" role="alert">{message}</p>}
    </form>
  );
}
