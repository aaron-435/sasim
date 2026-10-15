import ArrowLeft from "lucide-react-native/icons/arrow-left";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "./PatternBackground";
import PressableScale from "./motion/PressableScale";
import Reveal from "./motion/Reveal";
import { COLORS } from "../theme/colors";
import { RADIUS, SPACE } from "../theme/tokens";
import { ONBOARDING_STEP_IDS } from "../lib/onboardingSteps";
import { useStrings } from "../lib/i18n";

const TOTAL_STEPS = ONBOARDING_STEP_IDS.length;

export default function OnboardingShell({
  stepIndex,
  onBack,
  children,
}: {
  stepIndex?: number; // 0-based index into ONBOARDING_STEP_IDS; omit to hide the bar (e.g. the verify-code screen, which sits before step 1)
  onBack: () => void;
  children: React.ReactNode;
}) {
  const strings = useStrings();
  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
        {/* Android is edge-to-edge here, so the window no longer resizes for the keyboard on its own:
            without "padding" the primary button under a text field stayed hidden (2026-10-12 device test). */}
        <KeyboardAvoidingView style={styles.flex} behavior="padding">
          <Reveal index={0} style={styles.header}>
            <PressableScale
              onPress={onBack}
              hitSlop={12}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel={strings.common.backLabel}
              haptic="none"
            >
              <ArrowLeft size={20} strokeWidth={2} color={COLORS.subheadline} />
            </PressableScale>
            {stepIndex !== undefined && (
              <View
                style={styles.progressRow}
                accessible
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 1, max: TOTAL_STEPS, now: stepIndex + 1 }}
                aria-valuemin={1}
                aria-valuemax={TOTAL_STEPS}
                aria-valuenow={stepIndex + 1}
              >
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <View key={i} style={[styles.progressSegment, i <= stepIndex && styles.progressSegmentActive]} />
                ))}
              </View>
            )}
          </Reveal>
          <View style={styles.body}>{children}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PatternBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.sm,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: SPACE.sm,
    marginLeft: -SPACE.sm,
    marginBottom: SPACE.lg,
  },
  progressRow: {
    flexDirection: "row",
    gap: SPACE.sm,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border,
  },
  progressSegmentActive: {
    backgroundColor: COLORS.gold,
  },
  body: {
    flex: 1,
    paddingHorizontal: SPACE.xl,
  },
});
