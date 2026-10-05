import type { Locale } from "./i18n/types";

const WEEKDAY_SHORT: Record<Locale, string[]> = {
  ko: ["일", "월", "화", "수", "목", "금", "토"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  es: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
};

/** "10월 5일 (월)" / "10/5 (Mon)" / "5/10 (lun)" for a YYYY-MM-DD date. */
export function formatShortDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = WEEKDAY_SHORT[locale][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  if (locale === "ko") return `${m}월 ${d}일 (${weekday})`;
  if (locale === "es") return `${d}/${m} (${weekday})`;
  return `${m}/${d} (${weekday})`;
}
