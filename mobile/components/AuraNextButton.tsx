import ArrowRight from "lucide-react-native/icons/arrow-right";
import { Pressable, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";
import GoldAura from "./GoldAura";
import { useStrings } from "../lib/i18n";

// The one "next" affordance for every onboarding step: a round arrow button centered
// inside the breathing gold aura. Replaces the earlier bottom-pinned "다음" pill —
// real-device feedback found that pattern (a) left the middle of the screen empty
// anyway and (b) on Android with gesture nav, sat close enough to the bottom edge to
// visually collide with the system nav bar. Centering it in the aura fixes both.
export default function AuraNextButton({
  disabled,
  onPress,
  size = 170,
  accessibilityLabel,
}: {
  disabled?: boolean;
  onPress: () => void;
  size?: number;
  accessibilityLabel?: string; // defaults to "Next"
}) {
  const strings = useStrings();
  return (
    <GoldAura size={size}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        // `disabled` (not just a missing onPress) is what announces "dimmed" on
        // native and sets aria-disabled on web; react-native-web overwrites a
        // hand-set aria-disabled with this prop.
        disabled={!!disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? strings.common.nextLabel}
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
