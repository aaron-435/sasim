// Ported from components/OnboardingWizard.jsx's ZODIAC/getZodiac — keep both in sync if
// the date ranges ever change.
export const ZODIAC = [
  { nameKey: "capricorn", symbol: "♑", from: [12, 22], to: [1, 19] },
  { nameKey: "aquarius", symbol: "♒", from: [1, 20], to: [2, 18] },
  { nameKey: "pisces", symbol: "♓", from: [2, 19], to: [3, 20] },
  { nameKey: "aries", symbol: "♈", from: [3, 21], to: [4, 19] },
  { nameKey: "taurus", symbol: "♉", from: [4, 20], to: [5, 20] },
  { nameKey: "gemini", symbol: "♊", from: [5, 21], to: [6, 20] },
  { nameKey: "cancer", symbol: "♋", from: [6, 21], to: [7, 22] },
  { nameKey: "leo", symbol: "♌", from: [7, 23], to: [8, 22] },
  { nameKey: "virgo", symbol: "♍", from: [8, 23], to: [9, 22] },
  { nameKey: "libra", symbol: "♎", from: [9, 23], to: [10, 22] },
  { nameKey: "scorpio", symbol: "♏", from: [10, 23], to: [11, 21] },
  { nameKey: "sagittarius", symbol: "♐", from: [11, 22], to: [12, 21] },
] as const;

export const ZODIAC_LABELS_KO: Record<string, string> = {
  capricorn: "염소자리",
  aquarius: "물병자리",
  pisces: "물고기자리",
  aries: "양자리",
  taurus: "황소자리",
  gemini: "쌍둥이자리",
  cancer: "게자리",
  leo: "사자자리",
  virgo: "처녀자리",
  libra: "천칭자리",
  scorpio: "전갈자리",
  sagittarius: "사수자리",
};

export function getZodiac(month: number, day: number) {
  if (!month || !day) return null;
  return (
    ZODIAC.find(({ from, to }) => {
      const afterStart = month === from[0] ? day >= from[1] : month > from[0];
      const beforeEnd = month === to[0] ? day <= to[1] : month < to[0];
      if (from[0] > to[0]) return afterStart || beforeEnd;
      return afterStart && beforeEnd;
    }) ?? null
  );
}

// year/month/day text fields -> "YYYY-MM-DD", or "" while incomplete/invalid.
export function toISODateString(year: string, month: string, day: string): string {
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  if (!Number.isInteger(y) || y < 1900 || y > 9999) return "";
  if (!Number.isInteger(m) || m < 1 || m > 12) return "";
  if (!Number.isInteger(d) || d < 1 || d > 31) return "";
  const iso = `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  if (iso > new Date().toISOString().split("T")[0]) return "";
  return iso;
}

// 12h (hour/minute/AM·PM buttons) -> "HH:MM" 24h string /api/saju expects.
export function to24HourString(hour12: string, minuteInput: string, period: "AM" | "PM" | null): string {
  const h = parseInt(hour12, 10);
  const m = parseInt(minuteInput, 10);
  if (!Number.isInteger(h) || h < 1 || h > 12 || !Number.isInteger(m) || m < 0 || m > 59 || !period) return "";
  const h24 = period === "PM" ? (h % 12) + 12 : h % 12;
  return `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
