import { useRef } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { useStrings } from "../lib/i18n";
import { ONBOARDING_STEP_INDEX } from "../lib/onboardingSteps";
import { COLORS } from "../theme/colors";
import { to24HourString } from "../lib/zodiac";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

export default function TobScreen({
  hour,
  minute,
  period,
  timeUnknown,
  onChangeHour,
  onChangeMinute,
  onChangePeriod,
  onToggleUnknown,
  onNext,
  onBack,
}: {
  hour: string;
  minute: string;
  period: "AM" | "PM" | null;
  timeUnknown: boolean;
  onChangeHour: (v: string) => void;
  onChangeMinute: (v: string) => void;
  onChangePeriod: (v: "AM" | "PM") => void;
  onToggleUnknown: () => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const minuteRef = useRef<TextInput>(null);
  const tob = to24HourString(hour, minute, period);
  const canProceed = timeUnknown || tob !== "";

  function digitsOnly(v: string) {
    return v.replace(/[^0-9]/g, "");
  }

  return (
    <OnboardingShell stepIndex={ONBOARDING_STEP_INDEX.tob} onBack={onBack}>
      <View style={styles.top}>
        <View style={styles.headerRow}>
          <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.tob.heading}</Text>
          <Pressable
            onPress={onToggleUnknown}
            hitSlop={8}
            style={styles.unknownButton}
            accessibilityRole="checkbox"
            accessibilityLabel={strings.tob.unknownTimeA11y}
            accessibilityState={{ checked: timeUnknown }}
            aria-checked={timeUnknown}
          >
            <Text style={[styles.unknownLabel, timeUnknown && styles.unknownLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.tob.unknownTime}</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.shortInput, timeUnknown && styles.inputDisabled]}
            placeholder={strings.tob.hourPlaceholder}
            accessibilityLabel={strings.tob.hourLabel}
            accessibilityState={{ disabled: timeUnknown }}
            aria-disabled={timeUnknown}
            maxFontSizeMultiplier={MAX_FONT_SCALE.control}
            placeholderTextColor={COLORS.placeholder}
            value={hour}
            editable={!timeUnknown}
            onChangeText={(v) => {
              const clean = digitsOnly(v).slice(0, 2);
              onChangeHour(clean);
              if (clean.length === 2) minuteRef.current?.focus();
            }}
            keyboardType="number-pad"
            maxLength={2}
            autoFocus={!timeUnknown}
          />
          <Text style={styles.colon} importantForAccessibility="no" accessibilityElementsHidden maxFontSizeMultiplier={MAX_FONT_SCALE.control}>:</Text>
          <TextInput
            ref={minuteRef}
            style={[styles.input, styles.shortInput, timeUnknown && styles.inputDisabled]}
            placeholder={strings.tob.minutePlaceholder}
            accessibilityLabel={strings.tob.minuteLabel}
            accessibilityState={{ disabled: timeUnknown }}
            aria-disabled={timeUnknown}
            maxFontSizeMultiplier={MAX_FONT_SCALE.control}
            placeholderTextColor={COLORS.placeholder}
            value={minute}
            editable={!timeUnknown}
            onChangeText={(v) => onChangeMinute(digitsOnly(v).slice(0, 2))}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Pressable
            style={[styles.periodButton, period === "AM" && styles.periodButtonActive, timeUnknown && styles.inputDisabled]}
            onPress={() => onChangePeriod("AM")}
            disabled={timeUnknown}
            accessibilityRole="radio"
            accessibilityLabel={strings.tob.periodAM}
            accessibilityState={{ selected: period === "AM", checked: period === "AM" }}
            aria-selected={period === "AM"}
            aria-checked={period === "AM"}
          >
            <Text style={[styles.periodLabel, period === "AM" && styles.periodLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.tob.periodAM}</Text>
          </Pressable>
          <Pressable
            style={[styles.periodButton, period === "PM" && styles.periodButtonActive, timeUnknown && styles.inputDisabled]}
            onPress={() => onChangePeriod("PM")}
            disabled={timeUnknown}
            accessibilityRole="radio"
            accessibilityLabel={strings.tob.periodPM}
            accessibilityState={{ selected: period === "PM", checked: period === "PM" }}
            aria-selected={period === "PM"}
            aria-checked={period === "PM"}
          >
            <Text style={[styles.periodLabel, period === "PM" && styles.periodLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.tob.periodPM}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.middle}>
        <AuraNextButton disabled={!canProceed} onPress={onNext} size={170} />
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: "6%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 26,
    color: COLORS.headline,
  },
  unknownButton: {
    padding: 6,
  },
  unknownLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12.5,
    color: COLORS.footer,
  },
  unknownLabelActive: {
    color: COLORS.gold,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
  input: {
    fontFamily: FONTS.medium,
    fontSize: 17,
    textAlign: "center",
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 14,
  },
  shortInput: {
    flex: 1,
    minWidth: 0, // see DobScreen.tsx's note — react-native-web-only <input> flex quirk
  },
  inputDisabled: {
    opacity: 0.4,
  },
  colon: {
    color: COLORS.footer,
    fontSize: 18,
  },
  periodButton: {
    flex: 1.2,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  periodButtonActive: {
    backgroundColor: "rgba(111,169,139,0.12)",
    borderColor: "rgba(111,169,139,0.4)",
  },
  periodLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    color: COLORS.subheadline,
  },
  periodLabelActive: {
    color: COLORS.gold,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
