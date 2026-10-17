import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import ChevronDown from "lucide-react-native/icons/chevron-down";
import ChevronUp from "lucide-react-native/icons/chevron-up";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import ModuleArt from "../components/ModuleArt";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { useLocale, useStrings } from "../lib/i18n";
import { MODULES, moduleDisplayTitle, type ModuleDefinition } from "../lib/quiz/modules";
import { loadAllQuizProgress } from "../lib/quizProgressStorage";
import type { Track } from "../lib/userConcern";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";
import { FONTS, MAX_FONT_SCALE, koDisplay } from "../theme/fonts";

// Ported from components/ModuleSelect.jsx — picks which of the 30-question modules (12 since 2026-10-06)
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
  // moduleId -> questions already answered (unfinished runs), so a card can say "continue".
  const [progress, setProgress] = useState<Record<string, number>>({});
  useEffect(() => {
    let cancelled = false;
    loadAllQuizProgress(MODULES.map((m) => m.id), locale).then((p) => {
      if (!cancelled) setProgress(p);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);
  const metaOf = (id: string) => (progress[id] ? t.resumeMeta(progress[id] + 1) : t.meta);

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
  const [featured, ...halfRecommended] = recommended;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </PressableScale>

        <Reveal index={0}>
          <View style={styles.header}>
            <View style={styles.badgeRow}>
              <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
              <Text style={styles.badgeLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{t.badge}</Text>
            </View>
            <Text style={[styles.heading, locale === "ko" && styles.headingKo]} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{t.heading}</Text>
          </View>
        </Reveal>

        <Reveal index={1}>
          <Text style={styles.sectionTitle} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.recommendedTitle}</Text>
          <Text style={styles.reason} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{reason}</Text>
        </Reveal>

        {featured && (
          <Reveal index={2}>
            <PressableScale
              style={styles.featured}
              onPress={() => onSelect(featured.id)}
              pressedScale={0.97}
              accessibilityRole="button"
              accessibilityLabel={`${titleOf(featured)}. ${t.blurbs[featured.id] ?? ""} ${metaOf(featured.id)}`}
            >
              <ModuleArt moduleId={featured.id} size="large" style={styles.featuredArt} />
              <View style={styles.featuredBody}>
                <View style={styles.featuredText}>
                  <Text style={styles.featuredTitle} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{titleOf(featured)}</Text>
                  <Text style={styles.featuredBlurb} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.blurbs[featured.id]}</Text>
                  <Text style={styles.featuredMeta} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{metaOf(featured.id)}</Text>
                </View>
                <ArrowRight size={18} strokeWidth={2.25} color={COLORS.gold} />
              </View>
            </PressableScale>
          </Reveal>
        )}

        {halfRecommended.length > 0 && (
          <View style={styles.halfRow}>
            {halfRecommended.map((m, i) => (
              <Reveal key={m.id} index={3 + i} style={styles.halfReveal}>
                <PressableScale
                  style={styles.half}
                  onPress={() => onSelect(m.id)}
                  pressedScale={0.97}
                  accessibilityRole="button"
                  accessibilityLabel={`${titleOf(m)}. ${t.blurbs[m.id] ?? ""} ${metaOf(m.id)}`}
                >
                  <ModuleArt moduleId={m.id} size="small" style={styles.halfArt} />
                  <View style={styles.halfBody}>
                    <Text style={styles.halfTitle} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{titleOf(m)}</Text>
                    <Text style={styles.halfBlurb} numberOfLines={2} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.blurbs[m.id]}</Text>
                    <Text style={styles.halfMeta} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{metaOf(m.id)}</Text>
                  </View>
                </PressableScale>
              </Reveal>
            ))}
          </View>
        )}

        <PressableScale
          style={styles.toggle}
          onPress={() => setShowAll((v) => !v)}
          haptic="select"
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
        </PressableScale>

        {showAll && (
          <View style={styles.grid}>
            {rest.map((m, i) => {
              const fullWidth = rest.length % 2 === 1 && i === rest.length - 1;
              return (
                <Reveal key={m.id} delay={i * 40} style={fullWidth ? styles.gridFullReveal : styles.gridReveal}>
                  <PressableScale
                    style={styles.gridTile}
                    onPress={() => onSelect(m.id)}
                    pressedScale={0.97}
                    accessibilityRole="button"
                    accessibilityLabel={`${titleOf(m)}. ${t.blurbs[m.id] ?? ""}${progress[m.id] ? ` ${t.resumeMeta(progress[m.id] + 1)}` : ""}`}
                  >
                    <ModuleArt moduleId={m.id} size="small" style={styles.gridArt} />
                    <View style={styles.gridBody}>
                      <Text style={styles.gridTitle} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{titleOf(m)}</Text>
                      <Text style={styles.gridBlurb} numberOfLines={2} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.blurbs[m.id]}</Text>
                      {progress[m.id] ? <Text style={styles.halfMeta} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{t.resumeMeta(progress[m.id] + 1)}</Text> : null}
                    </View>
                  </PressableScale>
                </Reveal>
              );
            })}
          </View>
        )}
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
    ...readableColumn,
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.xxl,
  },
  backButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.xs,
    alignSelf: "flex-start",
    padding: SPACE.sm,
    marginLeft: -SPACE.sm,
    marginBottom: SPACE.md,
  },
  backLabel: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.subheadline,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: SPACE.xl,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.md,
  },
  badgeLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.gold,
  },
  heading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.6,
    color: COLORS.headline,
  },
  headingKo: koDisplay(-0.8),
  sectionTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.headline,
    marginBottom: SPACE.xs,
  },
  reason: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.subheadline,
    marginBottom: SPACE.md,
  },
  featured: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACE.md,
    ...SHADOW.raised,
  },
  featuredArt: {
    height: 168,
  },
  featuredBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: SPACE.md,
    padding: SPACE.lg,
  },
  featuredText: {
    flex: 1,
  },
  featuredTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 20,
    color: COLORS.headline,
    marginBottom: SPACE.sm,
  },
  featuredBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.headline,
    opacity: 0.85,
    marginBottom: SPACE.md,
  },
  featuredMeta: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.subheadline,
  },
  halfRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.md,
    marginBottom: SPACE.xl,
  },
  halfReveal: {
    width: "48%",
  },
  half: {
    flex: 1,
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    ...SHADOW.raised,
  },
  halfArt: {
    height: 96,
  },
  halfBody: {
    padding: SPACE.md,
  },
  halfTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 16,
    color: COLORS.headline,
    marginBottom: SPACE.xs,
  },
  halfBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.headline,
    opacity: 0.85,
    marginBottom: SPACE.sm,
  },
  halfMeta: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.subheadline,
  },
  toggle: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.md,
  },
  toggleLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.subheadline,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.md,
  },
  gridReveal: {
    width: "48%",
  },
  gridFullReveal: {
    width: "100%",
  },
  gridTile: {
    flex: 1,
    minHeight: 120,
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    overflow: "hidden",
  },
  gridArt: {
    height: 64,
  },
  gridBody: {
    padding: SPACE.md,
  },
  gridTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.headline,
    marginBottom: SPACE.xs,
  },
  gridBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.subheadline,
  },
});
