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
 * 2026-10-08: the server now decides the first language (?lang= -> cookie ->
 * Accept-Language -> en, lib/i18n/serverLocale.ts) and passes it as
 * `initialLocale`, so there is no Korean flash and nothing here overrides it
 * after mount. The picker writes the `fatesaid_locale` cookie (the server's
 * source of truth) as well as localStorage (kept for lib/analytics.ts).
 * ------------------------------------------------------------------
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "./dictionaries";
import { DEFAULT_LOCALE, type Locale } from "./types";

const STORAGE_KEY = "fatesaid_locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale = DEFAULT_LOCALE }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      document.cookie = `fatesaid_locale=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // cookies disabled — the picker still works for this page view
    }
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
