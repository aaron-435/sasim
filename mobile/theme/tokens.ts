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
