import { useEffect } from "react";
import { track } from "../lib/analytics";
import type { SajuType } from "../lib/sajuType";
import TypeScreen from "./TypeScreen";

// One-time reveal right after onboarding's last step (concern) and before Home, so a new
// user's first payoff is their type, not a dashboard. Same parts as TypeScreen in its
// "reveal" variant; users restored from storage or a web verify code never pass through it.
export default function TypeRevealScreen({
  nickname,
  sajuType,
  fourPillars,
  elements,
  onDone,
}: {
  nickname: string;
  sajuType: SajuType;
  fourPillars: unknown;
  elements: Record<string, number> | null;
  onDone: () => void;
}) {
  useEffect(() => {
    track("type_reveal_view", { kind: sajuType.code });
  }, [sajuType.code]);

  return <TypeScreen variant="reveal" nickname={nickname} sajuType={sajuType} fourPillars={fourPillars} elements={elements} onBack={onDone} />;
}
