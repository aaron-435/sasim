import { useRef, useState } from "react";
import { ArrowLeft, Droplets, Flame, Gem, Mountain, Share2, TreePine } from "lucide-react-native";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { getCelebritiesForType } from "../lib/sajuTypeCelebrities";
import { formatSajuTypeName, getTypePieces } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";

const ELEMENT_ICON = { wood: TreePine, fire: Flame, earth: Mountain, metal: Gem, water: Droplets } as const;

export default function TypeScreen({
  nickname,
  sajuType,
  onBack,
}: {
  nickname: string;
  sajuType: SajuType;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const cardRef = useRef<View>(null);
  const [sharing, setSharing] = useState(false);

  const { archetype, mode } = getTypePieces(locale, sajuType);
  const typeName = formatSajuTypeName(locale, sajuType);
  const celebrities = getCelebritiesForType(sajuType.code);
  const ArchetypeIcon = ELEMENT_ICON[sajuType.dayMasterElement];
  const ModeIcon = ELEMENT_ICON[sajuType.dominantElement];
  const tint = ELEMENT_COLORS[sajuType.dayMasterElement] ?? COLORS.gold;

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
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best-effort — sharing is a bonus action, not something worth surfacing an error screen for.
    } finally {
      setSharing(false);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <View style={[styles.card, { borderColor: `${tint}55` }]}>
          <Text style={styles.brandLabel}>FATESAID</Text>
          <View style={[styles.iconRow]}>
            <View style={[styles.iconBubble, { backgroundColor: `${tint}22` }]}>
              <ArchetypeIcon size={26} strokeWidth={1.75} color={tint} />
            </View>
          </View>
          <Text style={styles.typeName}>{typeName}</Text>
          <Text style={styles.greeting}>{strings.home.greeting(nickname)}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ArchetypeIcon size={16} strokeWidth={2} color={tint} />
            <Text style={styles.sectionLabel}>{strings.sajuType.archetypeLabel}</Text>
          </View>
          <Text style={styles.pieceName}>{archetype.name}</Text>
          <Text style={styles.pieceTagline}>{archetype.tagline}</Text>
          <Text style={styles.pieceBody}>{archetype.body}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ModeIcon size={16} strokeWidth={2} color={ELEMENT_COLORS[sajuType.dominantElement]} />
            <Text style={styles.sectionLabel}>{strings.sajuType.modeLabel}</Text>
          </View>
          <Text style={styles.pieceName}>{mode.name}</Text>
          <Text style={styles.pieceTagline}>{mode.tagline}</Text>
          <Text style={styles.pieceBody}>{mode.body}</Text>
        </View>

        {celebrities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{strings.sajuType.celebritiesLabel}</Text>
            <View style={styles.celebrityList}>
              {celebrities.map((c) => (
                <View key={c.name} style={[styles.celebrityCard, { borderColor: `${tint}33` }]}>
                  <Text style={styles.celebrityName}>{c.name}</Text>
                  <Text style={styles.celebrityMeta}>
                    {c.field[locale]} · {strings.sajuType.celebrityBirthYear(c.birthYear)}
                  </Text>
                  <Text style={styles.celebrityBlurb}>{c.blurb[locale]}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View ref={cardRef} collapsable={false} style={styles.shareCard}>
          <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
          <View style={styles.shareCardInner}>
            <Text style={styles.shareBrandLabel}>FATESAID</Text>

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
                  {celebrities.map((c) => (
                    <View key={c.name} style={styles.shareCelebRow}>
                      <Text style={styles.shareCelebName}>{c.name}</Text>
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

        <Pressable style={styles.shareButton} onPress={handleShare} disabled={sharing}>
          {sharing ? (
            <ActivityIndicator color={COLORS.ctaText} />
          ) : (
            <>
              <Share2 size={16} strokeWidth={2} color={COLORS.ctaText} />
              <Text style={styles.shareButtonLabel}>{strings.sajuType.shareButton}</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
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
    fontFamily: "Manrope_400Regular",
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
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
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
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 28,
    color: COLORS.headline,
    marginTop: 4,
  },
  greeting: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
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
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12.5,
    letterSpacing: 0.3,
    color: COLORS.subheadline,
  },
  pieceName: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 22,
    color: COLORS.headline,
  },
  pieceTagline: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13.5,
    color: COLORS.gold,
    marginTop: 4,
  },
  pieceBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14.5,
    lineHeight: 22,
    color: COLORS.subheadline,
    marginTop: 10,
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
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14.5,
    color: COLORS.headline,
  },
  celebrityMeta: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: COLORS.gold,
    marginTop: 2,
  },
  celebrityBlurb: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
    marginTop: 8,
  },
  // Deliberately no fixed aspectRatio, same reasoning as CompatibilityScreen's share
  // card — the mode copy's length varies across types/locales, so the card grows to
  // fit its content instead of risking a clipped fixed-height box.
  shareCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.background,
    marginTop: 32,
  },
  shareCardInner: {
    paddingHorizontal: "9%",
    paddingVertical: "9%",
    alignItems: "center",
  },
  shareBrandLabel: { fontFamily: "Manrope_700Bold", fontSize: 13, letterSpacing: 3, color: COLORS.gold, marginBottom: 28 },
  shareCardMid: { alignItems: "center", width: "100%" },
  shareDivider: { width: "60%", height: 1, backgroundColor: COLORS.border, marginVertical: 26 },
  shareCelebRow: { width: "100%", alignItems: "center", marginTop: 16 },
  shareCelebName: { fontFamily: "Manrope_600SemiBold", fontSize: 14, color: COLORS.headline, marginTop: 4 },
  shareCelebMeta: { fontFamily: "Manrope_500Medium", fontSize: 11.5, color: COLORS.gold, marginTop: 2 },
  shareCelebBlurb: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: 6 },
  shareIconBubble: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  shareEyebrow: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.gold, marginBottom: 6 },
  shareTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 34, color: COLORS.headline },
  shareTagline: { fontFamily: "Manrope_500Medium", fontSize: 14, color: COLORS.gold, textAlign: "center", marginTop: 8 },
  shareBody: { fontFamily: "Manrope_400Regular", fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, textAlign: "center", marginTop: 14 },
  shareTypeLine: { fontFamily: "Manrope_500Medium", fontSize: 12, color: COLORS.headline, marginTop: 26 },
  shareFooter: { fontFamily: "Manrope_500Medium", fontSize: 12.5, color: COLORS.subheadline, textAlign: "center", marginTop: 30 },
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
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14.5,
    color: COLORS.ctaText,
  },
});
