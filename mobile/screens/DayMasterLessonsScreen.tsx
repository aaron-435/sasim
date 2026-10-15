import { useEffect, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Check from "lucide-react-native/icons/check";
import Lock from "lucide-react-native/icons/lock";
import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
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
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";

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
    <PressableScale onPress={onPress} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={label} haptic="none">
      <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
      <Text style={styles.backLabel}>{label}</Text>
    </PressableScale>
  );

  if (openIndex !== null) {
    const lesson = lessons[openIndex];
    const isNew = openIndex === progress.readCount;
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          {back(() => setOpenIndex(null), s.backToList)}
          <Reveal index={0}>
            <Text style={styles.eyebrow}>{`${s.dayLabel(openIndex + 1)} · ${archetypeName}`}</Text>
            <Text style={styles.lessonTitle} accessibilityRole="header">{lesson.title}</Text>
          </Reveal>
          <Reveal index={1}>
            {lesson.body.split("\n\n").map((p, i) => (
              <Text key={i} style={styles.lessonBody}>{p}</Text>
            ))}
          </Reveal>
          <Reveal index={2}>
            <View style={styles.tryBox}>
              <Text style={styles.tryLabel}>{s.tryTodayLabel}</Text>
              <Text style={styles.tryBody}>{lesson.tryToday}</Text>
            </View>
          </Reveal>
          <Reveal index={3}>
            {isNew ? (
              <PressableScale style={styles.primaryButton} onPress={() => handleMarkRead(openIndex)} accessibilityRole="button">
                <Text style={styles.primaryButtonLabel}>{s.markRead}</Text>
              </PressableScale>
            ) : (
              <PressableScale style={styles.secondaryButton} onPress={() => setOpenIndex(null)} accessibilityRole="button">
                <Text style={styles.secondaryButtonLabel}>{s.backToList}</Text>
              </PressableScale>
            )}
          </Reveal>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        {back(onBack, strings.common.backLabel)}
        <Reveal index={0}>
          <Text style={styles.pageTitle} accessibilityRole="header">{s.pageTitle}</Text>
          <Text style={styles.subtitle}>{`${archetypeName} · ${s.progress(progress.readCount, LESSON_COUNT)}`}</Text>
        </Reveal>
        <Reveal index={1}>
          <View style={styles.dots} accessible accessibilityLabel={s.progress(progress.readCount, LESSON_COUNT)}>
            {lessons.map((_, i) => (
              <View key={i} style={[styles.dot, i < progress.readCount && { backgroundColor: accent, borderColor: accent }]} />
            ))}
          </View>
        </Reveal>

        <Reveal index={2}>
          <View style={styles.list}>
            {lessons.map((lesson, i) => {
              const read = i < progress.readCount;
              const today = i === progress.readCount && nextOpen;
              const locked = !read && !today;
              const status = read ? s.readBadge : today ? s.todayBadge : i === progress.readCount ? s.lockedTomorrow : s.lockedLater;
              return (
                <PressableScale
                  key={i}
                  style={[styles.row, today && { borderWidth: 1, borderColor: `${accent}88` }, locked && styles.rowLocked]}
                  onPress={() => setOpenIndex(i)}
                  disabled={locked}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: locked }}
                  accessibilityLabel={`${s.dayLabel(i + 1)}. ${locked ? status : `${lesson.title}. ${status}`}`}
                  pressedScale={0.98}
                >
                  <Text style={styles.rowDay}>{s.dayLabel(i + 1)}</Text>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowTitle, locked && styles.rowTitleLocked]} numberOfLines={2}>
                      {locked ? status : lesson.title}
                    </Text>
                    {!locked && <Text style={[styles.rowStatus, today && styles.rowStatusToday]}>{status}</Text>}
                  </View>
                  {read ? <Check size={16} strokeWidth={2.25} color={accent} /> : locked ? <Lock size={14} strokeWidth={2} color={COLORS.disabledText} /> : null}
                </PressableScale>
              );
            })}
          </View>
        </Reveal>

        {(progress.readCount >= LESSON_COUNT || !nextOpen) && (
          <Reveal index={3}>
            {progress.readCount >= LESSON_COUNT ? (
              <Text style={styles.footnote}>{s.allDone}</Text>
            ) : (
              <Text style={styles.footnote}>{s.nextTomorrow}</Text>
            )}
          </Reveal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACE.xl, paddingTop: SPACE.sm, paddingBottom: SPACE.xxxl, ...readableColumn },
  backButton: { flexDirection: "row", alignItems: "center", gap: SPACE.xs, alignSelf: "flex-start", padding: SPACE.sm, marginLeft: -SPACE.sm, marginBottom: SPACE.md, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  pageTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 24, lineHeight: 31, color: COLORS.headline },
  subtitle: { fontFamily: FONTS.regular, fontSize: 13.5, color: COLORS.subheadline, marginTop: SPACE.sm },
  dots: { flexDirection: "row", gap: SPACE.sm, marginTop: SPACE.lg, marginBottom: SPACE.xl },
  dot: { flex: 1, height: 4, borderRadius: RADIUS.sm, backgroundColor: COLORS.border, borderWidth: 0 },
  list: { gap: SPACE.md },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.lg,
    minHeight: 60,
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.lg,
    borderRadius: RADIUS.md,
    backgroundColor: SURFACE.raised,
    ...SHADOW.raised,
  },
  rowLocked: { backgroundColor: "transparent" },
  rowDay: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline, minWidth: 48 },
  rowText: { flex: 1, gap: SPACE.xs },
  rowTitle: { fontFamily: FONTS.semibold, fontSize: 14.5, lineHeight: 20, color: COLORS.headline },
  rowTitleLocked: { fontFamily: FONTS.regular, color: COLORS.disabledText },
  rowStatus: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.footer },
  rowStatusToday: { color: COLORS.gold },
  footnote: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.footer, marginTop: SPACE.lg, textAlign: "center" },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold },
  lessonTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, lineHeight: 34, color: COLORS.headline, marginTop: SPACE.sm, marginBottom: SPACE.lg },
  lessonBody: { fontFamily: FONTS.regular, fontSize: 15.5, lineHeight: 25, color: COLORS.headline, marginBottom: SPACE.lg },
  tryBox: { borderLeftWidth: 2, borderLeftColor: COLORS.gold, paddingLeft: SPACE.lg, paddingVertical: SPACE.xs, marginTop: SPACE.sm },
  tryLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.gold },
  tryBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 22, color: COLORS.subheadline, marginTop: SPACE.xs },
  primaryButton: { backgroundColor: COLORS.gold, borderRadius: RADIUS.sm, minHeight: 50, alignItems: "center", justifyContent: "center", marginTop: SPACE.xxl },
  primaryButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
  secondaryButton: { borderRadius: RADIUS.sm, borderWidth: 1, borderColor: SURFACE.hairline, minHeight: 50, alignItems: "center", justifyContent: "center", marginTop: SPACE.xxl },
  secondaryButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline },
});
