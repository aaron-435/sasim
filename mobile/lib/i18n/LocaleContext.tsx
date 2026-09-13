import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "./dictionaries";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

const STORAGE_KEY = "fatesaid_locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // undefined while the persisted choice is still loading — App.tsx uses this to hold
  // off rendering LanguageScreen vs. skipping straight past it, same gating pattern as
  // fontsLoaded.
  ready: boolean;
  hasStoredLocale: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return !!value && (LOCALES as string[]).includes(value);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);
  const [hasStoredLocale, setHasStoredLocale] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!mounted) return;
        if (isLocale(stored)) {
          setLocaleState(stored);
          setHasStoredLocale(true);
        }
      })
      .catch(() => {
        // best-effort — falls back to showing LanguageScreen, same as a first launch
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setHasStoredLocale(true);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
      // best-effort — the picker still works for this session even if it can't persist
    });
  }, []);

  const value = useMemo(() => ({ locale, setLocale, ready, hasStoredLocale }), [locale, setLocale, ready, hasStoredLocale]);

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
