// Font tokens. Screens reference these instead of family names so the fonts can be
// swapped in one place (SPEC 2026-10-03 item 7: fonts are being re-selected).
// Values must match the faces loaded by `useFonts` in App.tsx.
export const FONTS = {
  // Display moments: greetings, report titles, hero headlines.
  display: "CormorantGaramond_500Medium",
  // UI text by weight.
  regular: "Manrope_400Regular",
  medium: "Manrope_500Medium",
  semibold: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
} as const;

// Caps for `maxFontSizeMultiplier` so text follows the system text size without
// breaking fixed layouts (SPEC 2026-10-03 item 2). Large display headings grow less;
// labels inside side-by-side controls (gender, AM/PM, inputs) sit in between.
export const MAX_FONT_SCALE = {
  display: 1.3,
  control: 1.4,
  body: 1.6,
} as const;
