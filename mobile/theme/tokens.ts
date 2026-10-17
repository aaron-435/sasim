// 2026-10-14 UI overhaul tokens — these replace per-screen hardcoded spacing/radius/surface numbers.
import { COLORS } from "./colors";

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const RADIUS = {
  sm: 10, // chips, inside of inputs
  md: 16, // cards
  lg: 24, // heroes, sheets
  pill: 999,
} as const;

// Three surface steps over the background, plus a hairline for the rare case where
// a border is truly needed — depth comes from surface steps, not outlines.
export const SURFACE = {
  base: COLORS.background,
  raised: "#18291F",
  floating: "#1F3327",
  hairline: "rgba(217,201,163,0.08)",
} as const;

// Tinted shadows (deep green-black, not pure black) so depth reads warm on the
// celadon background. iOS shadow props and Android elevation travel together.
export const SHADOW = {
  raised: {
    shadowColor: "#06100B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  floating: {
    shadowColor: "#06100B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// 2026-10-17: values that used to be hardcoded hex in screens. Celadon tints are the
// COLORS.gold (#6FA98B) channel values at fixed alphas.
export const TINT = {
  gold12: "rgba(111,169,139,0.12)",
  gold40: "rgba(111,169,139,0.4)",
} as const;

// Dim layer behind a bottom sheet / modal.
export const SCRIM = "rgba(0,0,0,0.55)";

// The report's "paper" pages (table of contents): ink on warm hanji.
export const PAPER = {
  bg: "#EFE7D8",
  ink: "#22301F",
  inkSoft: "#5C5237",
  rule: "#B7A97D",
} as const;

// Secondary data-viz / label accents, kept clear of the red-orange range so a high number
// reads as a tendency, not a warning. Independent of the brand palette like ELEMENT_COLORS.
export const ACCENT = {
  sky: "#7FA8D6",
  sand: "#C2A86B",
  lilac: "#9C8FBF",
  sage: "#8FB09B",
  clay: "#C1846A",
  mint: "#8FBF9E",
  amber: "#D9A26C",
  // Lighter tint of the fire element, for text (the bar color is 3.6:1 as text).
  coral: "#D9917A",
} as const;
