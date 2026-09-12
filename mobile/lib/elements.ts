// Matches lib/i18n/ko.ts's `elements` namespace on web — keep both in sync.
export const ELEMENT_LABELS_KO: Record<string, string> = {
  wood: "목(木)",
  fire: "화(火)",
  earth: "토(土)",
  metal: "금(金)",
  water: "수(水)",
};

// Shared five-element colors — matches the shades already duplicated in
// ReportScreen.tsx/QuizScreen.tsx (semantic data-viz colors, independent of the
// Celadon & Hanji brand palette, so they weren't touched by that rebrand).
export const ELEMENT_COLORS: Record<string, string> = {
  wood: "#4E8368",
  fire: "#C1503B",
  earth: "#B98A4E",
  metal: "#C7CAD1",
  water: "#3E6EA0",
};

export const ELEMENT_ORDER = ["wood", "fire", "earth", "metal", "water"];

export function dominantElementFrom(elements: Record<string, number> | null | undefined): string | null {
  if (!elements) return null;
  const entries = Object.entries(elements);
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}
