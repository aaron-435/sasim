// year/month/day text fields -> "YYYY-MM-DD", or "" while incomplete/invalid.
export function toISODateString(year: string, month: string, day: string): string {
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  if (!Number.isInteger(y) || y < 1900 || y > 9999) return "";
  if (!Number.isInteger(m) || m < 1 || m > 12) return "";
  if (!Number.isInteger(d) || d < 1 || d > 31) return "";
  // Reject days the month doesn't have (02-31, 04-31, 02-29 outside leap years).
  if (new Date(Date.UTC(y, m - 1, d)).getUTCDate() !== d) return "";
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
