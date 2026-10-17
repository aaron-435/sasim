import ArrowLeft from "lucide-react-native/icons/arrow-left";
import MessageCircleQuestion from "lucide-react-native/icons/message-circle-question-mark";
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import useReducedMotion from "../lib/useReducedMotion";
import { localizedText } from "../lib/qaBankLocale";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SCRIM, SHADOW, SPACE, SURFACE } from "../theme/tokens";

type Question = { id: string; text_ko: string; text_en?: string; text_es?: string };
type Subcategory = { id: string; name_ko: string; name_en?: string; name_es?: string; questions: Question[] };

// Ported from components/QAQuestionPage.jsx — scrollable question list for one 중분류
// (~20 questions each). Picking one is the only action here; it's handed back to
// QAScreen, which pushes it as a chat message and fires the actual answer request.
const INITIAL_QUESTIONS = 6;

export default function QAQuestionScreen({
  subcategory,
  onBack,
  onSelect,
  quota,
}: {
  subcategory: Subcategory;
  onBack: () => void;
  onSelect: (q: Question) => void;
  /** Today's usage; null while it is still loading. */
  quota: { used: number; limit: number } | null;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  // ~20 questions per subcategory is a wall when a free user gets one a day: show the first
  // few, the rest behind one tap.
  const [expanded, setExpanded] = useState(false);
  // One tap must not spend a free question: a pick opens a confirm sheet first.
  const [pending, setPending] = useState<Question | null>(null);
  const reduceMotion = useReducedMotion();
  const left = quota ? Math.max(0, quota.limit - quota.used) : null;
  const visible = expanded ? subcategory.questions : subcategory.questions.slice(0, INITIAL_QUESTIONS);
  const hiddenCount = subcategory.questions.length - visible.length;
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </PressableScale>

        <Reveal index={0}>
          <View style={styles.header}>
            <Text style={styles.subcategoryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{localizedText(subcategory.name_ko, subcategory.name_en, subcategory.name_es, locale)}</Text>
            <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.qa.subcategoryHeading}</Text>
          </View>
        </Reveal>

        <Reveal index={1}>
        {quota && left !== null && (
          <Text style={styles.remaining} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.remainingToday(left, quota.limit)}</Text>
        )}
        {visible.map((q) => (
          <PressableScale
            key={q.id}
            style={styles.card}
            onPress={() => setPending(q)}
            accessibilityRole="button"
            accessibilityLabel={localizedText(q.text_ko, q.text_en, q.text_es, locale)}
            pressedScale={0.98}
          >
            <MessageCircleQuestion size={15} strokeWidth={1.75} color={COLORS.subheadline} style={styles.cardIcon} />
            <Text style={styles.cardLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{localizedText(q.text_ko, q.text_en, q.text_es, locale)}</Text>
          </PressableScale>
        ))}
        {hiddenCount > 0 && (
          <PressableScale onPress={() => setExpanded(true)} style={styles.moreButton} accessibilityRole="button" accessibilityLabel={strings.qa.moreQuestions(hiddenCount)} haptic="none">
            <Text style={styles.moreLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.moreQuestions(hiddenCount)}</Text>
          </PressableScale>
        )}
        </Reveal>
      </ScrollView>
      <Modal
        visible={pending !== null}
        transparent
        animationType={reduceMotion ? "none" : "fade"}
        onRequestClose={() => setPending(null)}
      >
        <View style={styles.backdrop}>
          <View style={styles.sheet} accessibilityViewIsModal>
            <Text style={styles.sheetTitle} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.qa.confirmTitle}</Text>
            {pending && (
              <Text style={styles.sheetQuestion} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{localizedText(pending.text_ko, pending.text_en, pending.text_es, locale)}</Text>
            )}
            {quota && left !== null && (
              <Text style={styles.sheetBody} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.qa.confirmBody(left, quota.limit)}</Text>
            )}
            <PressableScale
              style={styles.sheetPrimary}
              accessibilityRole="button"
              accessibilityLabel={strings.qa.confirmAsk}
              onPress={() => {
                const q = pending;
                setPending(null);
                if (q) onSelect(q);
              }}
            >
              <Text style={styles.sheetPrimaryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.confirmAsk}</Text>
            </PressableScale>
            <PressableScale
              style={styles.sheetSecondary}
              accessibilityRole="button"
              accessibilityLabel={strings.qa.confirmCancel}
              haptic="none"
              onPress={() => setPending(null)}
            >
              <Text style={styles.sheetSecondaryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.confirmCancel}</Text>
            </PressableScale>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.xxxl,
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
    marginBottom: SPACE.xl,
  },
  subcategoryLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.gold,
    marginBottom: SPACE.md,
  },
  heading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 24,
    color: COLORS.headline,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACE.md,
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg,
    marginBottom: SPACE.sm,
    ...SHADOW.raised,
  },
  cardIcon: {
    marginTop: SPACE.xs,
  },
  cardLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.headline,
    flex: 1,
  },
  remaining: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.subheadline,
    marginBottom: SPACE.md,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: SCRIM,
  },
  sheet: {
    backgroundColor: SURFACE.raised,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.xl,
    paddingBottom: SPACE.xxl,
  },
  sheetTitle: {
    fontFamily: FONTS.display,
    fontSize: 20,
    color: COLORS.headline,
    marginBottom: SPACE.md,
  },
  sheetQuestion: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.headline,
    marginBottom: SPACE.md,
  },
  sheetBody: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.subheadline,
    marginBottom: SPACE.lg,
  },
  sheetPrimary: {
    minHeight: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetPrimaryLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.ctaText,
  },
  sheetSecondary: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACE.xs,
  },
  sheetSecondaryLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.subheadline,
  },
  moreButton: {
    minHeight: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingHorizontal: SPACE.xs,
    marginTop: SPACE.xs,
  },
  moreLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.gold,
  },
});
