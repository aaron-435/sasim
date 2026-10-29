import { Fragment, useMemo, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import Reveal from "../components/motion/Reveal";
import { calculateAge, MIN_AGE } from "../lib/age";
import { useLocale, useStrings } from "../lib/i18n";
import { dobFieldOrder, dobSeparator } from "../lib/dobOrder";
import { ONBOARDING_STEP_INDEX } from "../lib/onboardingSteps";
import { COLORS } from "../theme/colors";
import { toISODateString } from "../lib/zodiac";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SPACE, SURFACE } from "../theme/tokens";

export default function DobScreen({
  year,
  month,
  day,
  onChangeYear,
  onChangeMonth,
  onChangeDay,
  onNext,
  onBack,
}: {
  year: string;
  month: string;
  day: string;
  onChangeYear: (v: string) => void;
  onChangeMonth: (v: string) => void;
  onChangeDay: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const yearRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);
  const order = dobFieldOrder(locale);
  const refs = { year: yearRef, month: monthRef, day: dayRef };
  const values = { year, month, day };
  const setters = { year: onChangeYear, month: onChangeMonth, day: onChangeDay };
  const maxLens = { year: 4, month: 2, day: 2 };
  const labels = { year: strings.dob.yearLabel, month: strings.dob.monthLabel, day: strings.dob.dayLabel };
  const placeholders = { year: strings.dob.yearPlaceholder, month: strings.dob.monthPlaceholder, day: strings.dob.dayPlaceholder };

  const iso = toISODateString(year, month, day);
  const age = useMemo(() => calculateAge(iso), [iso]);
  const isTooYoung = age !== null && age < MIN_AGE;
  const canProceed = iso !== "" && !isTooYoung;

  function digitsOnly(v: string) {
    return v.replace(/[^0-9]/g, "");
  }

  return (
    <OnboardingShell stepIndex={ONBOARDING_STEP_INDEX.dob} onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.dob.heading}</Text>
        <Reveal index={0} style={styles.row}>
          {order.map((field, i) => (
            <Fragment key={field}>
              {i > 0 && <Text style={styles.dot} importantForAccessibility="no" accessibilityElementsHidden maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{dobSeparator(locale)}</Text>}
              <TextInput
                ref={refs[field]}
                style={[styles.input, field === "year" ? styles.yearInput : styles.shortInput]}
                placeholder={placeholders[field]}
                accessibilityLabel={labels[field]}
                maxFontSizeMultiplier={MAX_FONT_SCALE.control}
                placeholderTextColor={COLORS.placeholder}
                value={values[field]}
                onChangeText={(v) => {
                  const clean = digitsOnly(v).slice(0, maxLens[field]);
                  setters[field](clean);
                  const next = order[i + 1];
                  if (next && clean.length === maxLens[field]) refs[next].current?.focus();
                }}
                keyboardType="number-pad"
                maxLength={maxLens[field]}
                autoFocus={i === 0}
              />
            </Fragment>
          ))}
        </Reveal>


        {isTooYoung && <Text style={styles.ageWarning} accessibilityLiveRegion="polite" accessibilityRole="alert" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.dob.ageWarning(MIN_AGE)}</Text>}
      </View>

      <Reveal index={1} style={styles.middle}>
        <AuraNextButton disabled={!canProceed} onPress={onNext} size={170} />
      </Reveal>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginTop: SPACE.xl,
  },
  input: {
    fontFamily: FONTS.medium,
    fontSize: 17,
    textAlign: "center",
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACE.lg,
  },
  yearInput: {
    flex: 2.3,
    minWidth: 0, // react-native-web only: a bare <input>'s default intrinsic width
    // otherwise wins over flexBasis:0%, so the row overflows instead of sharing space.
  },
  shortInput: {
    flex: 1.4,
    minWidth: 0,
  },
  dot: {
    color: COLORS.footer,
    fontSize: 18,
  },
  ageWarning: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: COLORS.danger,
    marginTop: SPACE.lg,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
