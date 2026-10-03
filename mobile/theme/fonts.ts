// Font tokens. Screens reference these instead of family names so the fonts can be
// swapped in one place. Picked 2026-10-04 (SPEC 2026-10-03 item 7): Newsreader for
// display, Plus Jakarta Sans for UI. Neither has Hangul, so Korean falls back to the
// system font on purpose (no Korean webfont shipped).
// Values must match the faces loaded by `useFonts` in App.tsx.
export const FONTS = {
  // Display moments: greetings, report titles, hero headlines.
  display: "Newsreader_500Medium",
  // Real italic cut for pull quotes and subtitles. Use this instead of `fontStyle: "italic"`,
  // which only slants the upright face (and Android ignores it for custom fonts).
  displayItalic: "Newsreader_500Medium_Italic",
  // UI text by weight.
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
} as const;

// Caps for `maxFontSizeMultiplier` so text follows the system text size without
// breaking fixed layouts (SPEC 2026-10-03 item 2). Large display headings grow less;
// labels inside side-by-side controls (gender, AM/PM, inputs) sit in between.
export const MAX_FONT_SCALE = {
  display: 1.3,
  control: 1.4,
  body: 1.6,
} as const;
