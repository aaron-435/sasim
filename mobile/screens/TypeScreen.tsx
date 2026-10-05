import { useRef, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Droplets from "lucide-react-native/icons/droplets";
import Flame from "lucide-react-native/icons/flame";
import Gem from "lucide-react-native/icons/gem";
import Mountain from "lucide-react-native/icons/mountain";
import Share2 from "lucide-react-native/icons/share-2";
import TreePine from "lucide-react-native/icons/tree-pine";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import CalcSourceBadge from "../components/CalcSourceBadge";
import FourPillarsChart, { parseFourPillars } from "../components/FourPillarsChart";
import { SafeAreaView } from "react-native-safe-area-context";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { celebrityDisplayName, getCelebritiesForType } from "../lib/sajuTypeCelebrities";
import { formatSajuTypeName, getTypePieces } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";
import { track } from "../lib/analytics";
import { readableColumn } from "../theme/layout";
import { FONTS } from "../theme/fonts";

const ELEMENT_ICON = { wood: TreePine, fire: Flame, earth: Mountain, metal: Gem, water: Droplets } as const;

export default function TypeScreen({
  nickname,
  sajuType,
  fourPillars,
  elements,
  onBack,
  variant = "full",
}: {
  nickname: string;
  sajuType: SajuType;
  /** The stored reading's `fourPillars` / `elements`, drawn by FourPillarsChart (hidden for odd shapes). */
  fourPillars: unknown;
  elements: Record<string, number> | null;
  /** "full" = the Home → type screen; "reveal" = the one-time post-onboarding reveal
   *  (TypeRevealScreen): no back link, chart and mode sections left for the full screen,
   *  and `onBack` becomes the pinned "Go to home" button. */
  onBack: () => void;
  variant?: "full" | "reveal";
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const cardRef = useRef<View>(null);
  const [sharing, setSharing] = useState(false);

  const { archetype, mode } = getTypePieces(locale, sajuType);
  const typeName = formatSajuTypeName(locale, sajuType);
  const celebrities = getCelebritiesForType(sajuType.code, locale);
  const ArchetypeIcon = ELEMENT_ICON[sajuType.dayMasterElement];
  const ModeIcon = ELEMENT_ICON[sajuType.dominantElement];
  const tint = ELEMENT_COLORS[sajuType.dayMasterElement] ?? COLORS.gold;
  const showChart = !!elements && parseFourPillars(fourPillars) !== null;
  const reveal = variant === "reveal";

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    try {
      // width-only: consistent 1080px-wide export regardless of on-screen size/device
      // pixel ratio, height following this card's actual (content-driven) aspect ratio —
      // same approach as CompatibilityScreen's share card, for the same reason (the
      // mode copy's length varies enough across types/locales that a hardcoded aspect
      // ratio risks clipping it).
      const uri = await captureRef(cardRef, { format: "png", quality: 1, width: 1080 });
      if (await Sharing.isAvailableAsync()) {
        track("share", { kind: "type_card" });
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best-effort — sharing is a bonus action, not something worth surfacing an error screen for.
    } finally {
      setSharing(false);
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={reveal ? ["top", "left", "right"] : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        {reveal ? (
          <Text style={styles.revealEyebrow} accessibilityRole="header">
            {strings.sajuType.revealEyebrow}
          </Text>
        ) : (
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
            <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
            <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
          </Pressable>
        )}

        <View style={[styles.card, { borderColor: `${tint}55` }]}>
          <Text style={styles.brandLabel}>FATESAID</Text>
          <View style={[styles.iconRow]}>
            <View style={[styles.iconBubble, { backgroundColor: `${tint}22` }]}>
              <ArchetypeIcon size={26} strokeWidth={1.75} color={tint} />
            </View>
          </View>
          <Text style={styles.typeName}>{typeName}</Text>
          <Text style={styles.typeGloss}>{strings.sajuType.typeGloss}</Text>
          <Text style={styles.greeting}>{strings.home.greeting(nickname)}</Text>
          <View style={styles.sourceRow}>
            <CalcSourceBadge />
          </View>
        </View>

        {!reveal && showChart && elements && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, styles.chartLabel]} accessibilityRole="header">
              {strings.home.myChartTitle}
            </Text>
            {/* The archetype below reads the day stem ("your core") and the mode reads the
                chart's majority ("most present"); the chart's two captions keep them apart. */}
            <FourPillarsChart fourPillars={fourPillars} elements={elements} />
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ArchetypeIcon size={16} strokeWidth={2} color={tint} />
            <Text style={styles.sectionLabel}>{strings.sajuType.archetypeLabel}</Text>
          </View>
          <Text style={styles.pieceName}>{archetype.name}</Text>
          <Text style={styles.pieceTagline}>{archetype.tagline}</Text>
          <Text style={styles.pieceBody}>{archetype.body}</Text>
        </View>

        {!reveal && (
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ModeIcon size={16} strokeWidth={2} color={ELEMENT_COLORS[sajuType.dominantElement]} />
            <Text style={styles.sectionLabel}>{strings.sajuType.modeLabel}</Text>
          </View>
          <Text style={styles.pieceName}>{mode.name}</Text>
          <Text style={styles.pieceTagline}>{mode.tagline}</Text>
          <Text style={styles.pieceBody}>{mode.body}</Text>
        </View>
        )}

        {celebrities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{strings.sajuType.celebritiesLabel}</Text>
            <View style={styles.celebrityList}>
              {celebrities.map((c) => (
                <View key={c.name} style={[styles.celebrityCard, { borderColor: `${tint}33` }]}>
                  <Text style={styles.celebrityName}>{celebrityDisplayName(c, locale)}</Text>
                  <Text style={styles.celebrityMeta}>
                    {c.field[locale]} · {strings.sajuType.celebrityBirthYear(c.birthYear)}
                  </Text>
                  <Text style={styles.celebrityBlurb}>{c.blurb[locale]}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Same labelled frame as the compatibility share card: the image repeats this screen, so
            it must read as a preview of what gets shared, and screen readers skip its copy. */}
        <View style={styles.previewFrame}>
          <Text style={styles.previewLabel}>{strings.sajuType.sharePreviewLabel}</Text>
          <View ref={cardRef} collapsable={false} style={styles.shareCard} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
            <View style={styles.shareCardInner}>
              <Text style={styles.shareBrandLabel}>FATESAID</Text>

              {showChart && elements && (
                <>
                  <View style={styles.shareChart}>
                    <FourPillarsChart fourPillars={fourPillars} elements={elements} centered />
                  </View>
                  <View style={styles.shareDivider} />
                </>
              )}

              <View style={styles.shareCardMid}>
                <View style={[styles.shareIconBubble, { backgroundColor: `${tint}22` }]}>
                  <ArchetypeIcon size={22} strokeWidth={1.75} color={tint} />
                </View>
                <Text style={styles.shareEyebrow}>{strings.sajuType.archetypeLabel}</Text>
                <Text style={styles.shareTitle}>{archetype.name}</Text>
                <Text style={styles.shareTagline}>{archetype.tagline}</Text>
                <Text style={styles.shareBody}>{archetype.body}</Text>
              </View>

              <View style={styles.shareDivider} />

              <View style={styles.shareCardMid}>
                <View style={[styles.shareIconBubble, { backgroundColor: `${ELEMENT_COLORS[sajuType.dominantElement]}22` }]}>
                  <ModeIcon size={22} strokeWidth={1.75} color={ELEMENT_COLORS[sajuType.dominantElement]} />
                </View>
                <Text style={styles.shareEyebrow}>{strings.sajuType.modeLabel}</Text>
                <Text style={styles.shareTitle}>{mode.name}</Text>
                <Text style={styles.shareTagline}>{mode.tagline}</Text>
                <Text style={styles.shareBody}>{mode.body}</Text>
              </View>

              {celebrities.length > 0 && (
                <>
                  <View style={styles.shareDivider} />
                  <View style={styles.shareCardMid}>
                    <Text style={styles.shareEyebrow}>{strings.sajuType.celebritiesLabel}</Text>
                    {/* Share card keeps its original two-person height; the screen above shows up to three. */}
                    {celebrities.slice(0, 2).map((c) => (
                      <View key={c.name} style={styles.shareCelebRow}>
                        <Text style={styles.shareCelebName}>{celebrityDisplayName(c, locale)}</Text>
                        <Text style={styles.shareCelebMeta}>
                          {c.field[locale]} · {strings.sajuType.celebrityBirthYear(c.birthYear)}
                        </Text>
                        <Text style={styles.shareCelebBlurb}>{c.blurb[locale]}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              <Text style={styles.shareTypeLine}>{strings.sajuType.shareCardTypeLine(nickname, typeName)}</Text>
              <Text style={styles.shareFooter}>{strings.sajuType.shareCardFooter}</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.shareButton, reveal && styles.shareButtonSecondary]}
          onPress={handleShare}
          disabled={sharing}
          accessibilityRole="button"
          accessibilityLabel={strings.sajuType.shareButton}
          accessibilityState={{ disabled: sharing, busy: sharing }}
        >
          {sharing ? (
            <ActivityIndicator color={reveal ? COLORS.gold : COLORS.ctaText} />
          ) : (
            <>
              <Share2 size={16} strokeWidth={2} color={reveal ? COLORS.gold : COLORS.ctaText} />
              <Text style={[styles.shareButtonLabel, reveal && styles.shareButtonLabelSecondary]}>{strings.sajuType.shareButton}</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
      {reveal && (
        <SafeAreaView edges={["bottom"]} style={styles.homeBar}>
          <Pressable
            style={({ pressed }) => [styles.homeButton, pressed && styles.pressed]}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={strings.sajuType.revealGoHome}
          >
            <Text style={styles.homeButtonLabel}>{strings.sajuType.revealGoHome}</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    ...readableColumn,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
  },
  backButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: -8,
    marginBottom: 12,
  },
  backLabel: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.subheadline,
  },
  card: {
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 20,
    gap: 10,
  },
  brandLabel: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.gold,
  },
  iconRow: {
    marginTop: 6,
  },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  typeName: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 28,
    color: COLORS.headline,
    marginTop: 4,
  },
  typeGloss: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.subheadline,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  greeting: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.subheadline,
  },
  sourceRow: {
    marginTop: 8,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    alignSelf: "stretch",
  },
  section: {
    marginTop: 26,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  sectionLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12.5,
    letterSpacing: 0.3,
    color: COLORS.subheadline,
  },
  pieceName: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 22,
    color: COLORS.headline,
  },
  pieceTagline: {
    fontFamily: FONTS.medium,
    fontSize: 13.5,
    color: COLORS.gold,
    marginTop: 4,
  },
  pieceBody: {
    fontFamily: FONTS.regular,
    fontSize: 14.5,
    lineHeight: 22,
    color: COLORS.subheadline,
    marginTop: 10,
  },
  chartLabel: {
    marginBottom: 12,
  },
  celebrityList: {
    gap: 12,
  },
  celebrityCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  celebrityName: {
    fontFamily: FONTS.semibold,
    fontSize: 14.5,
    color: COLORS.headline,
  },
  celebrityMeta: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.gold,
    marginTop: 2,
  },
  celebrityBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
    marginTop: 8,
  },
  // Deliberately no fixed aspectRatio, same reasoning as CompatibilityScreen's share
  // card — the mode copy's length varies across types/locales, so the card grows to
  // fit its content instead of risking a clipped fixed-height box.
  previewFrame: {
    marginTop: 32,
    padding: 14,
    paddingTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.disabledText,
    backgroundColor: COLORS.inputBg,
  },
  previewLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.footer, textAlign: "center", marginBottom: 10 },
  shareCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.background,
  },
  shareCardInner: {
    paddingHorizontal: "9%",
    paddingVertical: "9%",
    alignItems: "center",
  },
  shareBrandLabel: { fontFamily: FONTS.bold, fontSize: 13, letterSpacing: 3, color: COLORS.gold, marginBottom: 28 },
  shareCardMid: { alignItems: "center", width: "100%" },
  shareChart: { width: "100%" },
  shareDivider: { width: "60%", height: 1, backgroundColor: COLORS.border, marginVertical: 26 },
  shareCelebRow: { width: "100%", alignItems: "center", marginTop: 16 },
  shareCelebName: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.headline, marginTop: 4 },
  shareCelebMeta: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.gold, marginTop: 2 },
  shareCelebBlurb: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: 6 },
  shareIconBubble: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  shareEyebrow: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold, marginBottom: 6 },
  shareTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 34, color: COLORS.headline },
  shareTagline: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.gold, textAlign: "center", marginTop: 8 },
  shareBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, textAlign: "center", marginTop: 14 },
  shareTypeLine: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.headline, marginTop: 26 },
  shareFooter: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, textAlign: "center", marginTop: 30 },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 32,
  },
  shareButtonLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14.5,
    color: COLORS.ctaText,
  },
  // Reveal variant: sharing steps back to an outline button so "Go to home" stays the one primary action.
  shareButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  shareButtonLabelSecondary: {
    color: COLORS.gold,
  },
  revealEyebrow: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    letterSpacing: 0.3,
    color: COLORS.gold,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  homeBar: {
    ...readableColumn,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  homeButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: 12,
  },
  homeButtonLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.ctaText,
  },
  pressed: {
    opacity: 0.85,
  },
});
