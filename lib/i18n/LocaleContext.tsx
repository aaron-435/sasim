"use client";

/**
 * lib/i18n/LocaleContext.tsx
 * ------------------------------------------------------------------
 * 2026-09-13: real locale switching for web, added once ads targeting
 * non-Korean audiences were planned — before this, useStrings() always
 * returned ko regardless of the visitor (see git history on index.ts
 * for the old placeholder). Mirrors mobile/lib/i18n/LocaleContext.tsx's
 * shape exactly (same STORAGE_KEY even) for consistency, swapping
 * AsyncStorage for localStorage since this runs in a browser.
 *
 * No stored preference yet (first visit) -> guess from navigator.language:
 * "ko" stays ko, "es" stays es, anything else defaults to "en" rather
 * than "ko" — a French or German visitor from a foreign ad campaign has
 * no reason to see Korean, and English is the more useful universal
 * fallback for this app's actual target markets.
 *
 * Known limitation: AppFlow's tree is entirely client-rendered, so the
 * very first paint (before this effect runs) still shows DEFAULT_LOCALE
 * ("ko") momentarily. Fixing that needs server-side detection (a cookie
 * + middleware reading Accept-Language) which is a bigger, separate
 * piece of infra — not built here; the flash is a brief, one-time cost
 * on first visit, not on every navigation within the app.
 * ------------------------------------------------------------------
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "./dictionaries";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

const STORAGE_KEY = "fatesaid_locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return !!value && (LOCALES as string[]).includes(value);
}

function detectBrowserLocale(): Locale {
  const lang = (typeof navigator !== "undefined" ? navigator.language : "")?.toLowerCase() ?? "";
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("es")) return "es";
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // private browsing / storage disabled — fall through to detection
    }
    setLocaleState(isLocale(stored) ? stored : detectBrowserLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // best-effort — the picker still works for this tab even if it can't persist
    }
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}

export function useStrings(): Dictionary {
  const { locale } = useLocale();
  return getDictionary(locale);
}
