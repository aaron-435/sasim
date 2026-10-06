import type { Locale } from "./i18n/types";

export const WEEKDAY_SHORT: Record<Locale, string[]> = {
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

const MONTH_NAMES: Record<Exclude<Locale, "ko">, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
};

/** "2026년 10월" / "October 2026" / "octubre de 2026" for a YYYY-MM month. */
export function formatMonthLabel(month: string, locale: Locale): string {
  const [y, m] = month.split("-").map(Number);
  if (locale === "ko") return `${y}년 ${m}월`;
  if (locale === "es") return `${MONTH_NAMES.es[m - 1]} de ${y}`;
  return `${MONTH_NAMES.en[m - 1]} ${y}`;
}
