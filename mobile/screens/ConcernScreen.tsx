import { Pressable, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { useStrings } from "../lib/i18n";
import { ONBOARDING_STEP_INDEX } from "../lib/onboardingSteps";
import type { Track } from "../lib/userConcern";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// 2026-09-19: 온보딩 마지막 단계 — "지금 가장 궁금한 것"을 가볍게 물어, 이후
// ModuleSelectScreen이 추천 모듈을 보여줄 수 있게 한다(mobile/lib/userConcern.ts
// 헤더 참고). GenderScreen과 완전히 같은 2지선다 패턴을 그대로 재사용한다.
export default function ConcernScreen({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: Track | null;
  onChange: (v: Track) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  return (
    <OnboardingShell stepIndex={ONBOARDING_STEP_INDEX.concern} onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.concern.heading}</Text>
        <Text style={styles.subheading} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.concern.subheading}</Text>
        <View style={styles.column} accessibilityRole="radiogroup" accessibilityLabel={strings.concern.heading}>
          <Pressable
            style={[styles.option, value === "romance" && styles.optionActive]}
            onPress={() => onChange("romance")}
            accessibilityRole="radio"
            accessibilityLabel={`${strings.concern.romanceLabel}, ${strings.concern.romanceHint}`}
            accessibilityState={{ selected: value === "romance", checked: value === "romance" }}
            aria-selected={value === "romance"}
            aria-checked={value === "romance"}
          >
            <Text style={[styles.optionLabel, value === "romance" && styles.optionLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.concern.romanceLabel}</Text>
            <Text style={styles.optionHint} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.concern.romanceHint}</Text>
          </Pressable>
          <Pressable
            style={[styles.option, value === "career" && styles.optionActive]}
            onPress={() => onChange("career")}
            accessibilityRole="radio"
            accessibilityLabel={`${strings.concern.careerLabel}, ${strings.concern.careerHint}`}
            accessibilityState={{ selected: value === "career", checked: value === "career" }}
            aria-selected={value === "career"}
            aria-checked={value === "career"}
          >
            <Text style={[styles.optionLabel, value === "career" && styles.optionLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.concern.careerLabel}</Text>
            <Text style={styles.optionHint} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.concern.careerHint}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.middle}>
        <AuraNextButton disabled={value === null} onPress={onNext} size={190} />
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: "6%",
  },
  heading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 26,
    color: COLORS.headline,
  },
  subheading: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
    marginTop: 10,
  },
  column: {
    gap: 10,
    marginTop: 24,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  optionActive: {
    backgroundColor: "rgba(111,169,139,0.12)",
    borderColor: "rgba(111,169,139,0.4)",
  },
  optionLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.subheadline,
  },
  optionLabelActive: {
    color: COLORS.gold,
  },
  optionHint: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: COLORS.footer,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
