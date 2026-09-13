// Type shape only — the actual comparison runs server-side (web's
// lib/compatibility.ts, wired into POST /api/compatibility). Keep in sync.
export type CompatRelation = "mirror" | "selfNurturesOther" | "otherNurturesSelf" | "selfChallengesOther" | "otherChallengesSelf";

export interface CompatibilityResult {
  relation: CompatRelation;
  stemBond: { self: string; other: string } | null;
  score: number;
  selfDayMasterElement: string;
  otherDayMasterElement: string;
}
