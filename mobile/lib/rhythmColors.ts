import type { CompatRelation } from "./compatibility";

// Month-calendar cell colors, one per rhythm (day relation). Built only from the Celadon & Hanji
// palette tones — never the element reds — so no day reads as a warning. The "pacing" rhythm
// (otherChallengesSelf) gets the quietest neutral: no red/orange, just a muted fill.
export const RHYTHM_COLORS: Record<CompatRelation, { fill: string; text: string }> = {
  mirror: { fill: "rgba(217,201,163,0.20)", text: "#D9C9A3" },
  selfNurturesOther: { fill: "rgba(111,169,139,0.34)", text: "#D9E8DE" },
  otherNurturesSelf: { fill: "rgba(62,110,160,0.32)", text: "#D3E0EE" },
  selfChallengesOther: { fill: "rgba(150,160,70,0.30)", text: "#E4E8C4" },
  otherChallengesSelf: { fill: "rgba(255,255,255,0.07)", text: "#A89D82" },
};
