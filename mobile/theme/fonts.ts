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
