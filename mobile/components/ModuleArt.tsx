// Module cover: the D-set illustration (IMAGE_PROMPTS_2026-10-14.md) when its key
// has an entry in ART_MANIFEST, otherwise the gradient + number below (ArtImage fallback).
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Text from "./AppText";
import ArtImage from "./ArtImage";
import type { ArtKey } from "../data/art/manifest";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

const GRADIENTS: Array<readonly [string, string]> = [
  ["#1F3327", "#2C4A3A"],
  ["#1C2E25", "#3A5A47"],
  ["#22352A", "#4A6B57"],
];

const MODULE_ART_KEYS: Partial<Record<number, ArtKey>> = {
  1: "module1-love",
  2: "module2-money",
  3: "module3-burnout",
  4: "module4-mask",
  5: "module5-followthrough",
  6: "module6-anger",
  7: "module7-sensitivity",
  8: "module8-sleep",
  9: "module9-family",
  10: "module10-focus",
  11: "module11-expression",
  12: "module12-freshstart",
};

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

  const fallback = (
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

  const artKey = MODULE_ART_KEYS[n];
  if (!artKey) return fallback;

  // contain: 표지 그림은 투명 컷아웃이라 cover로 채우면 위아래가 잘린다.
  return <ArtImage artKey={artKey} contentFit="contain" style={style} fallback={fallback} />;
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
