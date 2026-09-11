import { useMemo, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { calculateAge, MIN_AGE } from "../lib/age";
import { COLORS } from "../theme/colors";
import { getZodiac, toISODateString, ZODIAC_LABELS_KO } from "../lib/zodiac";

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
  const monthRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);

  const iso = toISODateString(year, month, day);
  const age = useMemo(() => calculateAge(iso), [iso]);
  const isTooYoung = age !== null && age < MIN_AGE;
  const canProceed = iso !== "" && !isTooYoung;
  const zodiac = useMemo(() => (iso !== "" ? getZodiac(Number(month), Number(day)) : null), [iso, month, day]);

  function digitsOnly(v: string) {
    return v.replace(/[^0-9]/g, "");
  }

  return (
    <OnboardingShell stepIndex={2} onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading}>생년월일</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.yearInput]}
            placeholder="YYYY"
            placeholderTextColor={COLORS.disabledText}
            value={year}
            onChangeText={(v) => {
              const clean = digitsOnly(v).slice(0, 4);
              onChangeYear(clean);
              if (clean.length === 4) monthRef.current?.focus();
            }}
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
          />
          <Text style={styles.dot}>.</Text>
          <TextInput
            ref={monthRef}
            style={[styles.input, styles.shortInput]}
            placeholder="MM"
            placeholderTextColor={COLORS.disabledText}
            value={month}
            onChangeText={(v) => {
              const clean = digitsOnly(v).slice(0, 2);
              onChangeMonth(clean);
              if (clean.length === 2) dayRef.current?.focus();
            }}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Text style={styles.dot}>.</Text>
          <TextInput
            ref={dayRef}
            style={[styles.input, styles.shortInput]}
            placeholder="DD"
            placeholderTextColor={COLORS.disabledText}
            value={day}
            onChangeText={(v) => onChangeDay(digitsOnly(v).slice(0, 2))}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>

        {zodiac && (
          <View style={styles.zodiacCard}>
            <Text style={styles.zodiacSymbol}>{zodiac.symbol}</Text>
            <Text style={styles.zodiacLabel}>{ZODIAC_LABELS_KO[zodiac.nameKey]}</Text>
          </View>
        )}

        {isTooYoung && <Text style={styles.ageWarning}>죄송하지만 만 {MIN_AGE}세 이상만 이용할 수 있어요.</Text>}
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
  heading: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 26,
    color: COLORS.headline,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
  input: {
    fontFamily: "Manrope_500Medium",
    fontSize: 17,
    textAlign: "center",
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 14,
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
  zodiacCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    backgroundColor: "rgba(201,162,75,0.06)",
    borderWidth: 1,
    borderColor: "rgba(201,162,75,0.25)",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  zodiacSymbol: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 26,
    color: COLORS.gold,
  },
  zodiacLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: COLORS.headline,
  },
  ageWarning: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    color: "#CB6249",
    marginTop: 14,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
