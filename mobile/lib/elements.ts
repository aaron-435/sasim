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

// Emoji shown next to each element instead of the hanja (목(木) etc.). Kept in one place
// so swapping to drawn icons later is a one-file change. Metal is 💎 rather than 🪙: the
// coin emoji only exists on Android 11+ / iOS 14+ and would render as a blank box on older
// devices.
export const ELEMENT_EMOJI: Record<string, string> = {
  wood: "🌳",
  fire: "🔥",
  earth: "⛰️",
  metal: "💎",
  water: "💧",
};

/** "🌳 Wood" — the element's emoji followed by its localized name. */
export function elementWithEmoji(key: string, label: string): string {
  const emoji = ELEMENT_EMOJI[key];
  return emoji ? `${emoji} ${label}` : label;
}

export function dominantElementFrom(elements: Record<string, number> | null | undefined): string | null {
  if (!elements) return null;
  const entries = Object.entries(elements);
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}
