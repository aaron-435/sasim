import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CompatRelation } from "./compatibility";
import { ELEMENT_COLOR_CONTENT, type ElementColor } from "./elementColorContent";
import { ELEMENT_COLORS } from "./elements";
import type { Dictionary } from "./i18n";
import type { Locale } from "./i18n/types";
import { localDateKey } from "./lessonProgress";

// What the home screen widget shows (TODO 12, 2026-10-06), built on the app side so the two
// widget runtimes (iOS expo-widgets, Android headless task) only draw. Free scope only:
// today's rhythm name (Home's teaser line) and the balancing element color — never the
// subscriber overview. Kept in storage so the Android widget can redraw without the app
// running; `day` lets a widget fall back to "open the app" once the date rolls over.

export type TodayWidgetData = {
  /** Device-local date the rhythm was fetched for (localDateKey). */
  day: string;
  eyebrow: string;
  rhythm: string | null;
  colorLabel: string;
  colorName: string | null;
  swatch: string | null;
  /** Shown when there's no rhythm for today (first install / never opened). */
  fallbackLine: string;
  /** Shown once `day` is in the past. */
  staleLine: string;
};

const STORAGE_KEY = "fatesaid_today_widget";

export function buildTodayWidgetData(
  strings: Dictionary,
  locale: Locale,
  relation: CompatRelation | null,
  color: ElementColor | null
): TodayWidgetData {
  return {
    day: localDateKey(),
    eyebrow: strings.widget.eyebrow,
    rhythm: relation ? strings.fortune.rhythmNames[relation] : null,
    colorLabel: strings.elementColor.title,
    colorName: color ? ELEMENT_COLOR_CONTENT[locale].colorName[color.element] : null,
    swatch: color ? ELEMENT_COLORS[color.element] ?? null : null,
    fallbackLine: strings.widget.emptyLine,
    staleLine: strings.widget.staleLine,
  };
}

/** The data as it should look right now: past days lose their rhythm and color. */
export function widgetDataForNow(data: TodayWidgetData | null): TodayWidgetData | null {
  if (!data) return null;
  if (data.day === localDateKey()) return data;
  return { ...data, rhythm: null, colorName: null, swatch: null, fallbackLine: data.staleLine };
}

export async function saveTodayWidgetData(data: TodayWidgetData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // best-effort
  }
}

export async function loadTodayWidgetData(): Promise<TodayWidgetData | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TodayWidgetData) : null;
  } catch {
    return null;
  }
}

export async function clearStoredTodayWidgetData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}

/** Next local midnight — when today's rhythm stops being today's. */
export function nextLocalMidnight(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
}
