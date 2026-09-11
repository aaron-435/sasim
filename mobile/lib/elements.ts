// Matches lib/i18n/ko.ts's `elements` namespace on web — keep both in sync.
export const ELEMENT_LABELS_KO: Record<string, string> = {
  wood: "목(木)",
  fire: "화(火)",
  earth: "토(土)",
  metal: "금(金)",
  water: "수(水)",
};

export function dominantElementFrom(elements: Record<string, number> | null | undefined): string | null {
  if (!elements) return null;
  const entries = Object.entries(elements);
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}
