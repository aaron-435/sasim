import { ArrowRight } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";
import GoldAura from "./GoldAura";

// The one "next" affordance for every onboarding step: a round arrow button centered
// inside the breathing gold aura. Replaces the earlier bottom-pinned "다음" pill —
// real-device feedback found that pattern (a) left the middle of the screen empty
// anyway and (b) on Android with gesture nav, sat close enough to the bottom edge to
// visually collide with the system nav bar. Centering it in the aura fixes both.
export default function AuraNextButton({
  disabled,
  onPress,
  size = 170,
}: {
  disabled?: boolean;
  onPress: () => void;
  size?: number;
}) {
  return (
    <GoldAura size={size}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        style={({ pressed }) => [styles.circle, disabled && styles.circleDisabled, pressed && !disabled && styles.pressed]}
      >
        <ArrowRight size={26} strokeWidth={2.25} color={disabled ? COLORS.disabledText : COLORS.ctaText} />
      </Pressable>
    </GoldAura>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  circleDisabled: {
    backgroundColor: COLORS.disabledBg,
  },
  pressed: {
    opacity: 0.85,
  },
});
