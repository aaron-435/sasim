import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import ChevronDown from "lucide-react-native/icons/chevron-down";
import ChevronUp from "lucide-react-native/icons/chevron-up";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { MODULES, moduleDisplayTitle, type ModuleDefinition } from "../lib/quiz/modules";
import type { Track } from "../lib/userConcern";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// Ported from components/ModuleSelect.jsx — picks which of the 11 30-question modules
// to run. Same list web uses (lib/modules.ts, copied verbatim into mobile/lib/quiz/).
//
// 2026-10-04 (SPEC item 5): eleven same-looking cards with clinical subtitles was too much to
// choose from. Three recommended tests sit on top with a plain one-liner and the time it takes;
// the other eight fold under "All tests". preferredTrack comes from ConcernScreen ("what's on
// your mind"); without it the screen falls back to a general starter set.
const RECOMMENDED_IDS: Record<Track | "none", string[]> = {
  romance: ["module1", "module9", "module4"],
  career: ["module3", "module2", "module5"],
  none: ["module1", "module2", "module3"],
};

export default function ModuleSelectScreen({
  preferredTrack,
  onSelect,
  onBack,
}: {
  preferredTrack?: Track | null;
  onSelect: (moduleId: string) => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const [showAll, setShowAll] = useState(false);
  const t = strings.moduleSelect;

  const recommendedIds = RECOMMENDED_IDS[preferredTrack ?? "none"];
  const recommended = recommendedIds
    .map((id) => MODULES.find((m) => m.id === id))
    .filter((m): m is ModuleDefinition => !!m);
  const rest = MODULES.filter((m) => !recommendedIds.includes(m.id));
  const reason = preferredTrack
    ? t.recommendedReasonForConcern(
        preferredTrack === "romance" ? strings.concern.romanceLabel : strings.concern.careerLabel
      )
    : t.recommendedReasonDefault;

  const titleOf = (m: ModuleDefinition) => moduleDisplayTitle(m.title[locale] ?? m.title.ko);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.badgeLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{t.badge}</Text>
          </View>
          <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{t.heading}</Text>
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.recommendedTitle}</Text>
        <Text style={styles.reason} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{reason}</Text>

        {recommended.map((m) => (
          <Pressable
            key={m.id}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => onSelect(m.id)}
            accessibilityRole="button"
            accessibilityLabel={`${titleOf(m)}. ${t.blurbs[m.id] ?? ""} ${t.meta}`}
          >
            <View style={styles.cardText}>
              <Text style={styles.cardTitle} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{titleOf(m)}</Text>
              <Text style={styles.cardBlurb} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.blurbs[m.id]}</Text>
              <Text style={styles.cardMeta} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.meta}</Text>
            </View>
            <ArrowRight size={18} strokeWidth={2.25} color={COLORS.gold} />
          </Pressable>
        ))}

        <Pressable
          style={({ pressed }) => [styles.toggle, pressed && styles.pressed]}
          onPress={() => setShowAll((v) => !v)}
          accessibilityRole="button"
          accessibilityState={{ expanded: showAll }}
          aria-expanded={showAll}
          accessibilityLabel={showAll ? t.showLess : t.showAll(rest.length)}
        >
          <Text style={styles.toggleLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
            {showAll ? t.showLess : t.showAll(rest.length)}
          </Text>
          {showAll ? (
            <ChevronUp size={16} strokeWidth={2} color={COLORS.subheadline} />
          ) : (
            <ChevronDown size={16} strokeWidth={2} color={COLORS.subheadline} />
          )}
        </Pressable>

        {showAll &&
          rest.map((m) => (
            <Pressable
              key={m.id}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
              onPress={() => onSelect(m.id)}
              accessibilityRole="button"
              accessibilityLabel={`${titleOf(m)}. ${t.blurbs[m.id] ?? ""}`}
            >
              <View style={styles.cardText}>
                <Text style={styles.rowTitle} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{titleOf(m)}</Text>
                <Text style={styles.rowBlurb} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.blurbs[m.id]}</Text>
              </View>
              <ArrowRight size={16} strokeWidth={2} color={COLORS.subheadline} />
            </Pressable>
          ))}
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
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.subheadline,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  badgeLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 24,
    color: COLORS.headline,
    textAlign: "center",
  },
  sectionTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.headline,
    marginBottom: 4,
  },
  reason: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.subheadline,
    marginBottom: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.headline,
    marginBottom: 6,
  },
  cardBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.headline,
    opacity: 0.85,
    marginBottom: 10,
  },
  cardMeta: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.footer,
  },
  toggle: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
    marginBottom: 8,
  },
  toggleLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.subheadline,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  rowTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.headline,
    marginBottom: 3,
  },
  rowBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subheadline,
  },
});
