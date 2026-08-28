/**
 * lib/quizProfile.ts
 * ------------------------------------------------------------------
 * Generic engine shared by ALL 12 modules' 30-question deep tests.
 * A module defines its dimensions (2 for attachment, 3 for burnout,
 * etc.) and this engine handles: scoring, intensity tiers, nuanced
 * natural-language summaries, top-answer extraction for the chatbot,
 * and ready-made chatbot follow-up questions that quote the user's
 * actual answer — exactly the "아까 이 질문에서 이 답을 하셨는데..."
 * pattern requested.
 *
 * Each module (module1_attachment.ts, module3_burnout.ts, ...) only
 * needs to supply: its question bank (with per-item dimension+score)
 * and a small "type map" describing how dimension combinations map to
 * a headline concept name. Everything else is shared.
 * ------------------------------------------------------------------
 */

export interface QuizAnswerRecord {
  qId: string;
  prompt: string; // the question text
  label: string; // the exact option text OR slider value shown to the user, e.g. "8/10"
  dimension: string; // e.g. "anxiety" | "avoidance" | "exhaustion" | "cynicism" | "efficacyLoss"
  score: number; // 0-3 contribution. Four-choice items: integer 0|1|2|3. Slider items: decimal via scaleToScore().
}

/**
 * Converts a raw slider pick (e.g. 1-10) into the same 0-3 contribution
 * range used by four-choice items, so the two item types can be mixed
 * in one dimension's total without distorting it. Returns a continuous
 * decimal (not rounded to an integer) — this is exactly what reduces
 * tie frequency: two people who'd both land on "score 2" out of a
 * 4-choice item can still differ (e.g. 1.89 vs 2.11) on a slider item.
 *
 * @example scaleToScore(8, 1, 10) → 2.33...  (8th of 10 steps, mapped to 0-3)
 */
export function scaleToScore(rawValue: number, rawMin: number = 1, rawMax: number = 10): number {
  const clamped = Math.min(Math.max(rawValue, rawMin), rawMax);
  return ((clamped - rawMin) / (rawMax - rawMin)) * 3;
}

// ------------------------------------------------------------------
// Shared module-authoring types — every module file (module1Attachment.ts,
// module2Money.ts, ...) declares its 30-question bank using these, so
// QuizScreen can render any module generically without per-module UI code.
// ------------------------------------------------------------------

export interface ModuleChoiceOption {
  label: string;
  score: 0 | 1 | 2 | 3;
}

/**
 * - "choice": standard 4-option item (0-3점). A 2-option "극단형(0/3)" item
 *   (no middle options) is also encoded as "choice" — the UI just renders
 *   however many options are given, so 2 works the same as 4.
 * - "slider": 1-10 slider, scored via scaleToScore(value, 1, 10) — low end = 0점.
 * - "slider-reverse": 1-10 slider where the LOW end scores high (3점) — e.g.
 *   "누군가는 완전히 안다" at 10 means low concealment (0점), so 1 must score
 *   3점. Scored via scaleToScore(11 - value, 1, 10).
 */
export type ModuleQuestionFormat = "choice" | "slider" | "slider-reverse";

export interface ModuleQuestion {
  id: string; // matches the original expert-review numbering, e.g. "S1", "IM3"
  dimension: string;
  format: ModuleQuestionFormat;
  prompt: string;
  options: ModuleChoiceOption[] | { minLabel: string; maxLabel: string };
}

/** Computes a QuizAnswerRecord's score for whichever slider direction a question uses. */
export function scoreSliderValue(format: "slider" | "slider-reverse", value: number): number {
  return format === "slider-reverse" ? scaleToScore(11 - value, 1, 10) : scaleToScore(value, 1, 10);
}

export type IntensityTier = "약함" | "보통" | "강함" | "매우 강함";

export interface DimensionResult {
  dimension: string;
  rawScore: number;
  maxScore: number; // = itemCount * 3
  percentOfMax: number; // 0-100, raw position on the scale
  distanceFromMid: number; // 0-100, |percentOfMax - 50| / 50 * 100 — how far from the midpoint
  direction: "high" | "low"; // which side of the midpoint
  intensity: IntensityTier;
}

const INTENSITY_THRESHOLDS: [number, IntensityTier][] = [
  [75, "매우 강함"],
  [50, "강함"],
  [25, "보통"],
  [0, "약함"],
];

function intensityFromDistance(distancePercent: number): IntensityTier {
  for (const [min, tier] of INTENSITY_THRESHOLDS) {
    if (distancePercent >= min) return tier;
  }
  return "약함";
}

/**
 * Computes score, percent, direction, and intensity for one dimension.
 * @param itemCount how many questions belong to this dimension (e.g. 15
 *   for a 30-item 2-dimension test, 10 for a 30-item 3-dimension test)
 */
export function computeDimensionResult(
  answers: QuizAnswerRecord[],
  dimension: string,
  itemCount: number
): DimensionResult {
  const relevant = answers.filter((a) => a.dimension === dimension);
  const rawScore = relevant.reduce((sum, a) => sum + a.score, 0);
  const maxScore = itemCount * 3;
  const percentOfMax = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
  const distanceFromMid = Math.abs(percentOfMax - 50) / 50 * 100;
  const direction: "high" | "low" = percentOfMax >= 50 ? "high" : "low";
  return {
    dimension,
    rawScore,
    maxScore,
    percentOfMax: Math.round(percentOfMax * 10) / 10,
    distanceFromMid: Math.round(distanceFromMid * 10) / 10,
    direction,
    intensity: intensityFromDistance(distanceFromMid),
  };
}

export function computeAllDimensionResults(
  answers: QuizAnswerRecord[],
  dimensionItemCounts: Record<string, number>
): DimensionResult[] {
  return Object.entries(dimensionItemCounts).map(([dim, count]) =>
    computeDimensionResult(answers, dim, count)
  );
}

// ------------------------------------------------------------------
// Top-answer extraction — for chatbot quoting & report "정밀 타격"
// ------------------------------------------------------------------

/**
 * Returns the top N highest-scoring answers for a given dimension —
 * these are the ones worth quoting back to the user, since a score of
 * 3 means they picked the most extreme option on that item.
 */
export function findTopAnswers(
  answers: QuizAnswerRecord[],
  dimension: string,
  topN: number = 2
): QuizAnswerRecord[] {
  return [...answers]
    .filter((a) => a.dimension === dimension)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

/** Same, but across ALL dimensions — useful for "overall most extreme answers". */
export function findTopAnswersOverall(
  answers: QuizAnswerRecord[],
  topN: number = 3
): QuizAnswerRecord[] {
  return [...answers].sort((a, b) => b.score - a.score).slice(0, topN);
}

// ------------------------------------------------------------------
// Chatbot follow-up question generator — quotes the exact answer
// ------------------------------------------------------------------

/**
 * Produces the literal "아까 이 질문에서 이 답을 하셨는데..." follow-up,
 * matching the requested pattern:
 *   "관계가 깊어질수록? → 도망치고 싶은 충동이 든다고 답변해주셨는데,
 *    혹시 관계가 깊어졌을 때 안 좋은 경험을 했거나 현재 그런 심리를
 *    겪고 있나요?"
 *
 * This is a TEMPLATE the chatbot's Phase A prompt should use — not a
 * fixed string for every case, since the probe question should vary
 * by module/dimension. `probeHint` lets each module supply a dimension-
 * appropriate closing question; if omitted, a generic one is used.
 */
export function generateFollowUpPrompt(
  answer: QuizAnswerRecord,
  probeHint?: string
): string {
  const hint =
    probeHint ??
    "혹시 실제로 그런 경험을 하셨거나, 지금도 비슷한 마음이 드시나요?";
  return `아까 '${answer.prompt}'라는 질문에서 '${answer.label}'라고 답변해주셨는데, ${hint}`;
}

// ------------------------------------------------------------------
// Nuanced natural-language summary — avoids flattening into a rigid box
// ------------------------------------------------------------------

const INTENSITY_PHRASE: Record<IntensityTier, string> = {
  "약함": "약간",
  "보통": "다소",
  "강함": "꽤",
  "매우 강함": "매우",
};

export interface DimensionLabelMap {
  // e.g. { anxiety: { high: "불안", low: "안정적인 마음" }, avoidance: { high: "회피", low: "개방적인 태도" } }
  [dimension: string]: { high: string; low: string };
}

/**
 * Builds a hedged, nuanced sentence from dimension results instead of
 * forcing a rigid 4-box label — matches the requested style:
 *   "불안은 약간 높지만 회피형처럼 보이지는 않는 편입니다."
 *
 * Logic: dimensions with intensity "약함"/"보통" get hedged phrasing
 * ("~한 편", "~인 것 같은"); dimensions with "강함"/"매우 강함" get
 * assertive phrasing ("~이 뚜렷합니다", "~가 거의 없으시네요").
 */
export function generateNuancedSummary(
  results: DimensionResult[],
  labels: DimensionLabelMap
): string {
  const clauses = results.map((r) => {
    const label = labels[r.dimension];
    if (!label) return "";
    const sideLabel = r.direction === "high" ? label.high : label.low;
    const intensityWord = INTENSITY_PHRASE[r.intensity];

    if (r.intensity === "약함") {
      return `${sideLabel}은(는) ${intensityWord} 있는 편이지만 뚜렷하지는 않고`;
    }
    if (r.intensity === "보통") {
      return `${sideLabel}이(가) ${intensityWord} 나타나고`;
    }
    if (r.intensity === "강함") {
      return `${sideLabel}이(가) ${intensityWord} 뚜렷하고`;
    }
    // 매우 강함
    return `${sideLabel}이(가) 거의 극단적으로 나타나고`;
  }).filter(Boolean);

  if (clauses.length === 0) return "";
  const joined = clauses.join(", ");
  return joined.replace(/,\s*$/, "") + "요.";
}

/**
 * Example usage (Module 1, attachment):
 *
 * const results = computeAllDimensionResults(answers, { anxiety: 15, avoidance: 15 });
 * const summary = generateNuancedSummary(results, {
 *   anxiety: { high: "불안", low: "정서적 안정감" },
 *   avoidance: { high: "회피 성향", low: "개방적인 태도" },
 * });
 * // → "불안은 약간 있는 편이지만 뚜렷하지는 않고, 개방적인 태도이(가) 거의
 * //    극단적으로 나타나고요."
 * // (anxiety=24점→약함, avoidance=3점→매우 강함이지만 low방향이라 "개방적 태도"로 표현)
 */

// ------------------------------------------------------------------
// Headline type classification — handles the "all dimensions high"
// and "near-tie" cases that naive argmax (sort()[0]) gets wrong
// ------------------------------------------------------------------

export interface ProfileClassification {
  activeDimensions: string[]; // dimensions that are meaningfully elevated (direction=high, intensity>=강함)
  kind: "baseline" | "single" | "combined"; // 0 active / exactly 1 / 2+
  typeKey: string; // for "single": the dimension name. for "combined": dimensions joined by "+". for "baseline": "baseline"
}

/**
 * Replaces naive `sort(results, byScore)[0]` type-picking. Instead of
 * always forcing exactly one winner, this counts how many dimensions
 * are SIMULTANEOUSLY and meaningfully elevated (intensity 강함 or
 * 매우 강함, direction high):
 *   - 0 active → "baseline" (matches e.g. module 3's "제 페이스 유지형")
 *   - 1 active → "single" — the one clearly dominant dimension (this is
 *     the only case where a single dimension is picked, and it's picked
 *     because nothing else is close, not because of an arbitrary sort)
 *   - 2+ active → "combined" — a genuinely combined profile (e.g. MBI's
 *     "full burnout syndrome" = exhaustion + cynicism + efficacyLoss all
 *     elevated together). This also naturally absorbs near-ties: if two
 *     dimensions are both strongly elevated, sorting them arbitrarily is
 *     never the answer — they're BOTH reported as active.
 *
 * The `activeThreshold` param controls how "elevated" counts as active;
 * default only counts 강함/매우 강함 (i.e. distanceFromMid >= 50%),
 * so borderline/weak elevations don't trigger a false combined reading.
 */
export function classifyProfile(
  results: DimensionResult[],
  activeThreshold: IntensityTier = "강함"
): ProfileClassification {
  const tierRank: Record<IntensityTier, number> = { "약함": 0, "보통": 1, "강함": 2, "매우 강함": 3 };
  const minRank = tierRank[activeThreshold];

  const active = results.filter((r) => r.direction === "high" && tierRank[r.intensity] >= minRank);

  if (active.length === 0) {
    return { activeDimensions: [], kind: "baseline", typeKey: "baseline" };
  }
  if (active.length === 1) {
    return { activeDimensions: [active[0].dimension], kind: "single", typeKey: active[0].dimension };
  }
  // 2+ active — sort by score for a stable, deterministic key ordering
  // (doesn't matter which is "first" since ALL are reported, not just one)
  const sorted = [...active].sort((a, b) => b.percentOfMax - a.percentOfMax);
  return {
    activeDimensions: sorted.map((r) => r.dimension),
    kind: "combined",
    typeKey: sorted.map((r) => r.dimension).join("+"),
  };
}

/**
 * Each module supplies a lookup table for known combos (so "exhaustion+
 * cynicism" gets a designed concept name, not just a generic mashup).
 * `fallback` is used for combos the module didn't explicitly design for
 * (e.g. an unusual 2-of-3 pairing that wasn't worth a bespoke name) —
 * it should generically stitch the individual dimension labels together
 * rather than silently picking just one.
 */
export function resolveTypeName(
  classification: ProfileClassification,
  typeNames: Record<string, { title: string; hook: string }>,
  fallback: (dims: string[]) => { title: string; hook: string }
): { title: string; hook: string } {
  const known = typeNames[classification.typeKey];
  if (known) return known;
  if (classification.kind === "combined") return fallback(classification.activeDimensions);
  return typeNames["baseline"] ?? fallback(classification.activeDimensions);
}
