// Shared motion vocabulary for the 2026-10-14 UI overhaul — one place for
// durations, easings and springs so every screen moves the same way.
import { Easing } from "react-native-reanimated";

export const DURATION = {
  fast: 160,
  base: 240,
  slow: 360,
  reveal: 480,
} as const;

export const EASING = {
  standard: Easing.bezier(0.2, 0, 0, 1),
  enter: Easing.bezier(0.05, 0.7, 0.1, 1),
  exit: Easing.bezier(0.3, 0, 0.8, 0.15),
} as const;

export const SPRING = {
  press: { damping: 18, stiffness: 320, mass: 0.6 },
  gentle: { damping: 20, stiffness: 180 },
} as const;

// Delay between consecutive Reveal children (multiplied by `index`).
export const STAGGER_MS = 50;
