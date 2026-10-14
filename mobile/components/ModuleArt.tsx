// Placeholder cover until the D-set illustrations (IMAGE_PROMPTS_2026-10-14.md) arrive.
// Swap the gradient + number for an expo-image cover inside this component only.
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Text from "./AppText";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

const GRADIENTS: Array<readonly [string, string]> = [
  ["#1F3327", "#2C4A3A"],
  ["#1C2E25", "#3A5A47"],
  ["#22352A", "#4A6B57"],
];

export default function ModuleArt({
  moduleId,
  size,
  style,
}: {
  moduleId: string;
  size: "large" | "small";
  style?: StyleProp<ViewStyle>;
}) {
  const n = Number.parseInt(moduleId.replace(/\D/g, ""), 10) || 0;
  const colors = GRADIENTS[(((n - 1) % 3) + 3) % 3];
  const number = String(n).padStart(2, "0");

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      aria-hidden
    >
      <View style={styles.dot} />
      <Text style={[styles.number, size === "large" ? styles.large : styles.small]}>{number}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
    left: 14,
    top: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
  },
  number: {
    position: "absolute",
    right: 14,
    bottom: 6,
    fontFamily: FONTS.displayItalic,
    color: COLORS.headline,
    opacity: 0.9,
    letterSpacing: -1,
    includeFontPadding: false,
  },
  large: {
    fontSize: 72,
  },
  small: {
    fontSize: 40,
  },
});
