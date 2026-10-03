import ArrowLeft from "lucide-react-native/icons/arrow-left";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "./PatternBackground";
import { COLORS } from "../theme/colors";
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
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View style={styles.header}>
            <Pressable
              onPress={onBack}
              hitSlop={12}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel={strings.common.backLabel}
            >
              <ArrowLeft size={20} strokeWidth={2} color={COLORS.subheadline} />
            </Pressable>
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
          </View>
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
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: -8,
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: "row",
    gap: 6,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },
  progressSegmentActive: {
    backgroundColor: COLORS.gold,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
