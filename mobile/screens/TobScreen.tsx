import { useRef } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { COLORS } from "../theme/colors";
import { to24HourString } from "../lib/zodiac";

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
  const minuteRef = useRef<TextInput>(null);
  const tob = to24HourString(hour, minute, period);
  const canProceed = timeUnknown || tob !== "";

  function digitsOnly(v: string) {
    return v.replace(/[^0-9]/g, "");
  }

  return (
    <OnboardingShell stepIndex={3} onBack={onBack}>
      <View style={styles.top}>
        <View style={styles.headerRow}>
          <Text style={styles.heading}>태어난 시간</Text>
          <Pressable onPress={onToggleUnknown} hitSlop={8} style={styles.unknownButton}>
            <Text style={[styles.unknownLabel, timeUnknown && styles.unknownLabelActive]}>모름</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.shortInput, timeUnknown && styles.inputDisabled]}
            placeholder="시"
            placeholderTextColor={COLORS.disabledText}
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
          <Text style={styles.colon}>:</Text>
          <TextInput
            ref={minuteRef}
            style={[styles.input, styles.shortInput, timeUnknown && styles.inputDisabled]}
            placeholder="분"
            placeholderTextColor={COLORS.disabledText}
            value={minute}
            editable={!timeUnknown}
            onChangeText={(v) => onChangeMinute(digitsOnly(v).slice(0, 2))}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Pressable
            style={[styles.periodButton, period === "AM" && styles.periodButtonActive, timeUnknown && styles.inputDisabled]}
            onPress={() => !timeUnknown && onChangePeriod("AM")}
          >
            <Text style={[styles.periodLabel, period === "AM" && styles.periodLabelActive]}>오전</Text>
          </Pressable>
          <Pressable
            style={[styles.periodButton, period === "PM" && styles.periodButtonActive, timeUnknown && styles.inputDisabled]}
            onPress={() => !timeUnknown && onChangePeriod("PM")}
          >
            <Text style={[styles.periodLabel, period === "PM" && styles.periodLabelActive]}>오후</Text>
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
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 26,
    color: COLORS.headline,
  },
  unknownButton: {
    padding: 6,
  },
  unknownLabel: {
    fontFamily: "Manrope_600SemiBold",
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
    fontFamily: "Manrope_600SemiBold",
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
