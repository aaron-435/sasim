import { Platform } from "react-native";

// 2026-10-20: dev-only switch for the choice-branching chat prototype
// (flowVersion 3, SPEC 2026-10-20). Like mobile/dev/qaMode.ts's getQaMode, this
// returns v2 everywhere except a DEV web session whose URL carries `?chat=3`,
// so release/OTA bundles and native builds never change. URL only — nothing
// is stored in localStorage.
export interface ChatFlowConfig {
  flowVersion: 2 | 3;
  totalTurns: 25 | 22;
  checkpointTurn: 10 | 9;
}

const V2: ChatFlowConfig = { flowVersion: 2, totalTurns: 25, checkpointTurn: 10 };
const V3: ChatFlowConfig = { flowVersion: 3, totalTurns: 22, checkpointTurn: 9 };

export function getChatFlow(): ChatFlowConfig {
  if (!__DEV__ || Platform.OS !== "web") return V2;
  try {
    return new URLSearchParams(window.location.search).get("chat") === "3" ? V3 : V2;
  } catch {
    return V2;
  }
}

// 2026-10-20: v3 header math — 4-turn sets (S1 1–4, S2 5–8, checkpoint 9,
// S3 10–13, S4 14–17, S5 18–21) per CHOICE_CHAT_DESIGN.md §2. Turn 9 belongs
// to set 2 (it closes it); turn 0 (before the opener) reads as set 1.
export function setNumberForTurnV3(turn: number): number {
  if (turn <= 4) return 1;
  if (turn <= 9) return 2;
  if (turn <= 13) return 3;
  if (turn <= 17) return 4;
  return 5;
}

