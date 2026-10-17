// Module cover: the D-set illustration (IMAGE_PROMPTS_2026-10-14.md) when its key
// has an entry in ART_MANIFEST, otherwise the element-tinted gradient + number below (ArtImage fallback).
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Text from "./AppText";
import ArtImage from "./ArtImage";
import type { ArtKey } from "../data/art/manifest";
import { elementBackdropColor } from "./ReportCover";
import { ELEMENT_COLORS } from "../lib/elements";
import { COLORS } from "../theme/colors";
import { SURFACE } from "../theme/tokens";
import { FONTS } from "../theme/fonts";

// Offline / failed-download fallback: one element tint per module (cycling wood to water), so
// twelve covers never look like twelve copies of the same green tile. The number stays quiet.
const COVER_ELEMENTS = ["wood", "fire", "earth", "metal", "water"] as const;

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
  const element = COVER_ELEMENTS[(((n - 1) % 5) + 5) % 5];
  const colors = [SURFACE.raised, elementBackdropColor(element, 0.3)] as const;
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
      <View style={[styles.dot, { backgroundColor: ELEMENT_COLORS[element] }]} />
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
  },
  number: {
    position: "absolute",
    right: 14,
    bottom: 6,
    fontFamily: FONTS.displayItalic,
    color: COLORS.headline,
    opacity: 0.55,
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
