// Shared cover for the paid readers (year-ahead, compatibility) and the element medallion
// for Wrapped. Same approach as the deep report's cover: the dominant element tints the
// backdrop, its illustration (E-set, ART_MANIFEST) or — when there is no entry or the file
// fails — the computed ElementMap / plain rings sit behind the title, and the text lines
// unfold with Reveal. Reduced motion is honored by Reveal, ElementMap and the decor fade.
import Sparkles from "lucide-react-native/icons/sparkles";
import { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Reanimated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import Text from "./AppText";
import ArtImage from "./ArtImage";
import CalcSourceBadge from "./CalcSourceBadge";
import ElementMap from "./art/ElementMap";
import Reveal from "./motion/Reveal";
import type { ArtKey } from "../data/art/manifest";
import { dominantElementFrom, ELEMENT_COLORS } from "../lib/elements";
import { useLocale } from "../lib/i18n";
import useReducedMotion from "../lib/useReducedMotion";
import { COLORS } from "../theme/colors";
import { FONTS, koDisplay } from "../theme/fonts";
import { DURATION, EASING } from "../theme/motion";
import { SPACE } from "../theme/tokens";

const ELEMENT_ART: Record<string, ArtKey> = {
  wood: "element-wood",
  fire: "element-fire",
  earth: "element-earth",
  metal: "element-metal",
  water: "element-water",
};

/** The E-set art key for an element, or null when it can't be determined. */
export function elementArtKey(element: string | null | undefined): ArtKey | null {
  return (element && ELEMENT_ART[element]) || null;
}

/** Dark page backdrop with `element`'s color mixed in lightly (body text keeps its contrast).
 * Same mix as the deep report's element pages; the app background when there is no element. */
export function elementBackdropColor(element: string | null | undefined, amount = 0.14): string {
  const base = COLORS.background;
  const color = element ? ELEMENT_COLORS[element] : undefined;
  if (!color || !/^#[0-9a-f]{6}$/i.test(color) || !/^#[0-9a-f]{6}$/i.test(base)) return base;
  const mix = (i: number) => {
    const a = parseInt(base.slice(i, i + 2), 16);
    const b = parseInt(color.slice(i, i + 2), 16);
    return Math.round(a + (b - a) * amount).toString(16).padStart(2, "0");
  };
  return `#${mix(1)}${mix(3)}${mix(5)}`;
}

/** Element to tint a cover with: the dominant one of `elements`, if any. */
export function coverElement(elements: Record<string, number> | null | undefined): string | null {
  return dominantElementFrom(elements);
}

/** Small round element mark for Wrapped cards: the element illustration, or the plain colored
 * disc it used to be when there is no entry for it. */
export function ElementMedallion({ element, size = 84 }: { element: string; size?: number }) {
  const tint = ELEMENT_COLORS[element] ?? COLORS.gold;
  const artKey = elementArtKey(element);
  const disc = <View style={[styles.disc, { width: size * 0.8, height: size * 0.8, backgroundColor: tint }]} />;
  return (
    <View style={[styles.medallion, { width: size, height: size }]} accessible={false} importantForAccessibility="no-hide-descendants" aria-hidden>
      {artKey ? <ArtImage artKey={artKey} contentFit="cover" style={[styles.medallionArt, { width: size, height: size, borderRadius: size / 2 }]} fallback={disc} /> : disc}
    </View>
  );
}

export default function ReportCover({
  kicker,
  title,
  aboveTitle,
  subtitle,
  byline,
  footLabel,
  element,
  elements,
  seed,
}: {
  /** Small line above the title (e.g. "2027 year-ahead report"). */
  kicker: string;
  title: string;
  /** Quiet line between kicker and title (e.g. the two names on a compatibility report). */
  aboveTitle?: string;
  subtitle?: string;
  /** Reader's name, under the subtitle. */
  byline?: string;
  /** Bottom-left note (page count). */
  footLabel?: string;
  element?: string | null;
  /** Null keeps the plain ring decor when the illustration is missing. */
  elements?: Record<string, number> | null;
  seed: string;
}) {
  const { width } = useWindowDimensions();
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const tint = element ? ELEMENT_COLORS[element] ?? COLORS.gold : COLORS.gold;
  const decor = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      decor.value = 1;
      return;
    }
    decor.value = withTiming(1, { duration: DURATION.slow * 2, easing: EASING.enter });
  }, [reduceMotion, decor]);

  const decorStyle = useAnimatedStyle(() => ({
    opacity: decor.value,
    transform: [{ scale: 0.92 + 0.08 * decor.value }],
  }));

  const ring = width * 1.1;
  const hasMap = !!elements && Object.values(elements).some((v) => v > 0);
  const fallbackDecor = hasMap ? (
    // Own View for the opacity: ElementMap animates opacity on its root, which would override a style prop.
    <View style={styles.mapDim}>
      <ElementMap elements={elements!} seed={seed} size={ring} animated />
    </View>
  ) : (
    <Svg width={ring} height={ring}>
      <Circle cx={ring / 2} cy={ring / 2} r={ring / 2} stroke={tint} strokeOpacity={0.35} strokeWidth={1} fill="none" />
      <Circle cx={ring / 2} cy={ring / 2} r={(ring / 2) * 0.72} stroke={tint} strokeOpacity={0.2} strokeWidth={1} fill="none" />
    </Svg>
  );
  const artKey = elementArtKey(element);

  return (
    <View style={styles.cover}>
      <View style={[StyleSheet.absoluteFill, styles.decorClip]} pointerEvents="none">
        <LinearGradient colors={[`${tint}33`, "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 0.6, y: 0.7 }} style={StyleSheet.absoluteFill} />
        <Reanimated.View
          style={[styles.rings, { width: ring, height: ring, right: hasMap ? -width * 0.5 : -width * 0.35, top: hasMap ? -width * 0.42 : -width * 0.2 }, decorStyle]}
          pointerEvents="none"
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          {artKey ? (
            // Dimmed so the title keeps its contrast where it crosses the illustration.
            <View style={styles.artDim}>
              <ArtImage artKey={artKey} contentFit="cover" style={{ width: ring, height: ring }} fallback={fallbackDecor} />
            </View>
          ) : (
            fallbackDecor
          )}
        </Reanimated.View>
      </View>

      <View style={styles.brandRow}>
        <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={styles.brandLabel}>Fatesaid</Text>
      </View>
      <View style={styles.mid}>
        <Reveal index={0}>
          <Text style={styles.kicker}>{kicker}</Text>
        </Reveal>
        <Reveal index={1}>
          {!!aboveTitle && <Text style={styles.aboveTitle}>{aboveTitle}</Text>}
          <Text style={[styles.title, locale === "ko" && styles.titleKo]} accessibilityRole="header">
            {title}
          </Text>
        </Reveal>
        <Reveal index={2}>
          <View style={[styles.rule, { backgroundColor: tint }]} />
          {!!subtitle && <Text style={styles.sub}>{subtitle}</Text>}
          {!!byline && <Text style={styles.byline}>{byline}</Text>}
        </Reveal>
        <Reveal index={3} style={styles.source}>
          <CalcSourceBadge align="start" />
        </Reveal>
      </View>
      {!!footLabel && <Text style={styles.foot}>{footLabel}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  // Transparent: the pager's backdrop (pageColors) shows through.
  cover: { flex: 1, paddingHorizontal: SPACE.xl, paddingTop: SPACE.xl, paddingBottom: SPACE.xl },
  decorClip: { overflow: "hidden" },
  rings: { position: "absolute" },
  mapDim: { opacity: 0.2 },
  artDim: { opacity: 0.5 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: SPACE.sm, marginBottom: SPACE.lg },
  brandLabel: { fontFamily: FONTS.bold, fontSize: 13, letterSpacing: 0.4, color: COLORS.gold },
  mid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  kicker: { fontFamily: FONTS.semibold, fontSize: 13, letterSpacing: 0.2, color: COLORS.gold, marginBottom: SPACE.lg },
  aboveTitle: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline, marginBottom: SPACE.md },
  title: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 34, lineHeight: 42, letterSpacing: -0.6, color: COLORS.headline },
  titleKo: koDisplay(-0.8),
  rule: { width: 40, height: 1, marginVertical: SPACE.lg },
  sub: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23, color: COLORS.subheadline },
  byline: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.headline, marginTop: SPACE.xl },
  source: { marginTop: SPACE.xl },
  foot: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.footer },

  medallion: { alignItems: "center", justifyContent: "center", marginTop: SPACE.xl },
  medallionArt: { overflow: "hidden" },
  disc: { borderRadius: 999, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
});
