import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { MODULES } from "../lib/quiz/modules";
import type { Track } from "../lib/userConcern";
import { COLORS } from "../theme/colors";

// Ported from components/ModuleSelect.jsx — picks which of the 11 30-question modules
// to run. Same list web uses (lib/modules.ts, copied verbatim into mobile/lib/quiz/).
//
// 2026-09-19: preferredTrack — 온보딩의 "지금 가장 궁금한 것"(ConcernScreen)에서
// 고른 값. 원래 순서를 다 갈아엎지 않고, 그 track과 맞는 모듈만 위로 끌어올리고
// "추천" 배지를 붙인다 — 안 골랐거나(null) 저장 실패면 기존과 완전히 동일하게 동작.
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
  const orderedModules = preferredTrack
    ? [...MODULES].sort((a, b) => Number(b.track === preferredTrack) - Number(a.track === preferredTrack))
    : MODULES;
  // "Recommended" only means something if it isn't on nearly every card: flag the top three
  // modules of the user's own track.
  const recommendedIds = new Set(
    orderedModules.filter((m) => preferredTrack && m.track === preferredTrack).slice(0, 3).map((m) => m.id)
  );
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.badgeLabel}>{strings.moduleSelect.badge}</Text>
          </View>
          <Text style={styles.heading}>{strings.moduleSelect.heading}</Text>
        </View>

        {orderedModules.map((m) => (
          <Pressable key={m.id} style={styles.card} onPress={() => onSelect(m.id)}>
            <View style={styles.cardText}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{m.title[locale] ?? m.title.ko}</Text>
                {recommendedIds.has(m.id) && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedBadgeText}>{strings.moduleSelect.recommendedBadge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardSubtitle}>{m.subtitle[locale] ?? m.subtitle.ko}</Text>
            </View>
            <ArrowRight size={17} strokeWidth={2.25} color={COLORS.gold} />
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
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  badgeLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 24,
    color: COLORS.headline,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  cardText: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: COLORS.headline,
  },
  recommendedBadge: {
    backgroundColor: "rgba(111,169,139,0.16)",
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  recommendedBadgeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: COLORS.gold,
  },
  cardSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    color: COLORS.subheadline,
  },
});
