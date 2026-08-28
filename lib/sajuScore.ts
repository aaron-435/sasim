/**
 * lib/sajuScore.ts
 * ------------------------------------------------------------------
 * The saju x psych-test "괴리" calibration that used to live here
 * (computeSajuBaseScore + calibrateWithQuiz, comparing fourPillars weights
 * against quiz element-tag frequency) was removed 2026-08-28: SAZU already
 * returns real oheng percentages directly (sajuResult.elements), so there
 * was nothing for a quiz-derived comparison to add. Saju data and the
 * psych-test (Module 1 attachment) result are now combined in the chatbot's
 * system prompt instead — see lib/chatPrompts.ts.
 * ------------------------------------------------------------------
 */

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";
