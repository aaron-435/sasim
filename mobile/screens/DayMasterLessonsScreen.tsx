import { useEffect, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Check from "lucide-react-native/icons/check";
import Lock from "lucide-react-native/icons/lock";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { LESSON_COUNT, getLessons } from "../lib/dayMasterLessons";
import { getLessonProgress, isNextLessonOpen, markLessonRead, type LessonProgress } from "../lib/lessonProgress";
import { useLocale, useStrings } from "../lib/i18n";
import { ELEMENT_COLORS } from "../lib/elements";
import { SAJU_TYPE_CONTENT } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import { track } from "../lib/analytics";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS } from "../theme/fonts";

// "Your Day Master in 10 days" (2026-10-06): opened from SajuLearnScreen. A list of the ten
// lessons (read / today's / locked) and a reader for one lesson. One new lesson opens per
// calendar day (lib/lessonProgress.ts); read ones can be reopened any time. The Day Master's
// element color marks progress (dots, check marks) only — never small text, where the darker
// element colors fall under 4.5:1 on the background.
export default function DayMasterLessonsScreen({ sajuType, onBack }: { sajuType: SajuType; onBack: () => void }) {
  const strings = useStrings();
  const s = strings.lessons;
  const { locale } = useLocale();
  const lessons = getLessons(sajuType.archetype, locale);
  const typeContent = SAJU_TYPE_CONTENT[locale] ?? SAJU_TYPE_CONTENT.en;
  const archetypeName = typeContent.archetypes[sajuType.archetype]?.name ?? "";
  const accent = ELEMENT_COLORS[sajuType.dayMasterElement] ?? COLORS.gold;

  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    getLessonProgress(sajuType.archetype).then(setProgress);
  }, [sajuType.archetype]);

  if (!progress || lessons.length !== LESSON_COUNT) return <SafeAreaView style={styles.root} />;

  const nextOpen = isNextLessonOpen(progress);

  async function handleMarkRead(index: number) {
    if (!progress) return;
    const next = await markLessonRead(progress, index);
    if (next !== progress) track("lesson_read", { kind: sajuType.archetype, value: index + 1 });
    setProgress(next);
    setOpenIndex(null);
  }

  const back = (onPress: () => void, label: string) => (
    <Pressable onPress={onPress} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={label}>
      <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
      <Text style={styles.backLabel}>{label}</Text>
    </Pressable>
  );

  if (openIndex !== null) {
    const lesson = lessons[openIndex];
    const isNew = openIndex === progress.readCount;
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          {back(() => setOpenIndex(null), s.backToList)}
          <Text style={styles.eyebrow}>{`${s.dayLabel(openIndex + 1)} · ${archetypeName}`}</Text>
          <Text style={styles.lessonTitle} accessibilityRole="header">{lesson.title}</Text>
          {lesson.body.split("\n\n").map((p, i) => (
            <Text key={i} style={styles.lessonBody}>{p}</Text>
          ))}
          <View style={styles.tryBox}>
            <Text style={styles.tryLabel}>{s.tryTodayLabel}</Text>
            <Text style={styles.tryBody}>{lesson.tryToday}</Text>
          </View>
          {isNew ? (
            <Pressable style={styles.primaryButton} onPress={() => handleMarkRead(openIndex)} accessibilityRole="button">
              <Text style={styles.primaryButtonLabel}>{s.markRead}</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.secondaryButton} onPress={() => setOpenIndex(null)} accessibilityRole="button">
              <Text style={styles.secondaryButtonLabel}>{s.backToList}</Text>
            </Pressable>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        {back(onBack, strings.common.backLabel)}
        <Text style={styles.pageTitle} accessibilityRole="header">{s.pageTitle}</Text>
        <Text style={styles.subtitle}>{`${archetypeName} · ${s.progress(progress.readCount, LESSON_COUNT)}`}</Text>
        <View style={styles.dots} accessible accessibilityLabel={s.progress(progress.readCount, LESSON_COUNT)}>
          {lessons.map((_, i) => (
            <View key={i} style={[styles.dot, i < progress.readCount && { backgroundColor: accent, borderColor: accent }]} />
          ))}
        </View>

        <View style={styles.list}>
          {lessons.map((lesson, i) => {
            const read = i < progress.readCount;
            const today = i === progress.readCount && nextOpen;
            const locked = !read && !today;
            const status = read ? s.readBadge : today ? s.todayBadge : i === progress.readCount ? s.lockedTomorrow : s.lockedLater;
            return (
              <Pressable
                key={i}
                style={[styles.row, today && { borderColor: `${accent}88` }, locked && styles.rowLocked]}
                onPress={() => setOpenIndex(i)}
                disabled={locked}
                accessibilityRole="button"
                accessibilityState={{ disabled: locked }}
                accessibilityLabel={`${s.dayLabel(i + 1)}. ${locked ? status : `${lesson.title}. ${status}`}`}
              >
                <Text style={styles.rowDay}>{s.dayLabel(i + 1)}</Text>
                <View style={styles.rowText}>
                  <Text style={[styles.rowTitle, locked && styles.rowTitleLocked]} numberOfLines={2}>
                    {locked ? status : lesson.title}
                  </Text>
                  {!locked && <Text style={[styles.rowStatus, today && styles.rowStatusToday]}>{status}</Text>}
                </View>
                {read ? <Check size={16} strokeWidth={2.25} color={accent} /> : locked ? <Lock size={14} strokeWidth={2} color={COLORS.disabledText} /> : null}
              </Pressable>
            );
          })}
        </View>

        {progress.readCount >= LESSON_COUNT ? (
          <Text style={styles.footnote}>{s.allDone}</Text>
        ) : !nextOpen ? (
          <Text style={styles.footnote}>{s.nextTomorrow}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40, ...readableColumn },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  pageTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 24, lineHeight: 31, color: COLORS.headline },
  subtitle: { fontFamily: FONTS.regular, fontSize: 13.5, color: COLORS.subheadline, marginTop: 6 },
  dots: { flexDirection: "row", gap: 6, marginTop: 14, marginBottom: 20 },
  dot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: COLORS.border, borderWidth: 0 },
  list: { gap: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
  },
  rowLocked: { backgroundColor: "transparent" },
  rowDay: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline, minWidth: 48 },
  rowText: { flex: 1, gap: 2 },
  rowTitle: { fontFamily: FONTS.semibold, fontSize: 14.5, lineHeight: 20, color: COLORS.headline },
  rowTitleLocked: { fontFamily: FONTS.regular, color: COLORS.disabledText },
  rowStatus: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.footer },
  rowStatusToday: { color: COLORS.gold },
  footnote: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.footer, marginTop: 18, textAlign: "center" },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold },
  lessonTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, lineHeight: 34, color: COLORS.headline, marginTop: 8, marginBottom: 14 },
  lessonBody: { fontFamily: FONTS.regular, fontSize: 15.5, lineHeight: 25, color: COLORS.headline, marginBottom: 14 },
  tryBox: { borderLeftWidth: 2, borderLeftColor: COLORS.gold, paddingLeft: 14, paddingVertical: 4, marginTop: 6 },
  tryLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.gold },
  tryBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 22, color: COLORS.subheadline, marginTop: 4 },
  primaryButton: { backgroundColor: COLORS.gold, borderRadius: 12, minHeight: 50, alignItems: "center", justifyContent: "center", marginTop: 28 },
  primaryButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
  secondaryButton: { borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, minHeight: 50, alignItems: "center", justifyContent: "center", marginTop: 28 },
  secondaryButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline },
});
