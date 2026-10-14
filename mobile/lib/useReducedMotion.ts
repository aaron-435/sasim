// Live Reduce Motion flag — motion components read this hook instead of each
// wiring their own AccessibilityInfo subscription (same pattern as GoldAura).
import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

export default function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(setReduced);
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduced);
    return () => sub.remove();
  }, []);

  return reduced;
}
