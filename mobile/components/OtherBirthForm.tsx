import { Fragment, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./AppText";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { dobFieldOrder, dobSeparator } from "../lib/dobOrder";
import { toISODateString } from "../lib/zodiac";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

// The other person's birth-data form — name (optional), gender, birth date, birth time and
// city. Lifted out of CompatibilityScreen (2026-10-05) so "그 사람에 대해 묻기" in Q&A asks for
// the other person the same way. The state lives in useOtherBirthForm() so the owning screen
// keeps it across sub-views; <OtherBirthFields> only renders it. Labels stay the
// compatibility strings ("Their birth date" …), which read right in both places.

type CityResult = { id: string; cityDisplay: string; countryDisplay: string };
type Field = "name" | "year" | "month" | "day" | "hour" | "minute" | "city";

/** Request shape both /api/compatibility and /api/qa-answer take as `other`. */
export type OtherBirthPayload = {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number | null;
  birthMinute: number;
  isFemale: boolean;
  birthCity?: string;
  birthCityId?: string;
};

function digitsOnly(v: string) {
  return v.replace(/[^0-9]/g, "");
}

export function useOtherBirthForm() {
  const { locale } = useLocale();
  const [otherName, setOtherName] = useState("");
  const [isFemale, setIsFemale] = useState<boolean | null>(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(true);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const citySearchSeq = useRef(0);
  const citySearchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (citySearchTimer.current) clearTimeout(citySearchTimer.current);
  }, []);

  const dobComplete = year.length === 4 && month.length > 0 && day.length > 0;
  // Same rule as onboarding: a real calendar day, not in the future.
  const dobInvalid = dobComplete && toISODateString(year, month, day) === "";
  const isComplete = isFemale !== null && dobComplete && !dobInvalid;

  function onChangeCityQuery(v: string) {
    setCityQuery(v);
    setSelectedCity(null);
    if (!v.trim()) {
      // Also cancel any search still pending for the text just erased — otherwise its
      // results would pop back in under an empty field.
      citySearchSeq.current++;
      if (citySearchTimer.current) clearTimeout(citySearchTimer.current);
      setCityResults([]);
      return;
    }
    // Real debounce: each keystroke cancels the previous pending search, so only the
    // query the user pauses on hits the API (the seq check below still drops a slow
    // response that lands after a newer one). Same behavior as CityScreen's search.
    const seq = ++citySearchSeq.current;
    if (citySearchTimer.current) clearTimeout(citySearchTimer.current);
    citySearchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cities/search?q=${encodeURIComponent(v)}&locale=${locale}`);
        const json = await res.json();
        if (citySearchSeq.current === seq) setCityResults(json.results ?? []);
      } catch {
        if (citySearchSeq.current === seq) setCityResults([]);
      }
    }, 300);
  }

  function pickCity(r: CityResult) {
    setSelectedCity(r);
    setCityQuery(`${r.cityDisplay}, ${r.countryDisplay}`);
    setCityResults([]);
  }

  function toPayload(): OtherBirthPayload {
    const birthHour = timeUnknown ? null : period === "PM" ? (Number(hour) % 12) + 12 : Number(hour) % 12;
    return {
      birthYear: Number(year),
      birthMonth: Number(month),
      birthDay: Number(day),
      birthHour,
      birthMinute: timeUnknown ? 0 : Number(minute) || 0,
      isFemale: !!isFemale,
      birthCity: selectedCity?.cityDisplay,
      birthCityId: selectedCity?.id,
    };
  }

  return {
    otherName, setOtherName,
    isFemale, setIsFemale,
    year, setYear, month, setMonth, day, setDay,
    timeUnknown, setTimeUnknown, hour, setHour, minute, setMinute, period, setPeriod,
    cityQuery, cityResults, onChangeCityQuery, pickCity,
    dobInvalid, isComplete, toPayload,
  };
}

export type OtherBirthForm = ReturnType<typeof useOtherBirthForm>;

export function OtherBirthFields({ form, showName = true }: { form: OtherBirthForm; showName?: boolean }) {
  const strings = useStrings();
  const { locale } = useLocale();
  const [focusedField, setFocusedField] = useState<Field | null>(null);

  const yearRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);
  const dobOrder = dobFieldOrder(locale);
  const dobRefs = { year: yearRef, month: monthRef, day: dayRef };
  const dobValues = { year: form.year, month: form.month, day: form.day };
  const dobSetters = { year: form.setYear, month: form.setMonth, day: form.setDay };
  const dobMaxLens = { year: 4, month: 2, day: 2 };
  const dobPlaceholders = { year: strings.dob.yearPlaceholder, month: strings.dob.monthPlaceholder, day: strings.dob.dayPlaceholder };
  const { isFemale, timeUnknown, period } = form;

  return (
    <>
      {showName && (
        <>
          <Text style={styles.fieldLabel}>{strings.compatibility.nameLabel}</Text>
          <TextInput
            style={[styles.input, focusedField === "name" && styles.inputFocused]}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            accessibilityLabel={strings.compatibility.nameLabel}
            placeholder={strings.compatibility.namePlaceholder}
            placeholderTextColor={COLORS.placeholder}
            value={form.otherName}
            onChangeText={form.setOtherName}
          />
        </>
      )}

      <Text style={styles.fieldLabel}>{strings.compatibility.genderLabel}</Text>
      <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={strings.compatibility.genderLabel}>
        <Pressable
          style={[styles.option, isFemale === false && styles.optionActive]}
          onPress={() => form.setIsFemale(false)}
          accessibilityRole="radio"
          accessibilityState={{ checked: isFemale === false }}
          aria-checked={isFemale === false}
          accessibilityLabel={strings.gender.male}
        >
          <Text style={[styles.optionLabel, isFemale === false && styles.optionLabelActive]}>{strings.gender.male}</Text>
        </Pressable>
        <Pressable
          style={[styles.option, isFemale === true && styles.optionActive]}
          onPress={() => form.setIsFemale(true)}
          accessibilityRole="radio"
          accessibilityState={{ checked: isFemale === true }}
          aria-checked={isFemale === true}
          accessibilityLabel={strings.gender.female}
        >
          <Text style={[styles.optionLabel, isFemale === true && styles.optionLabelActive]}>{strings.gender.female}</Text>
        </Pressable>
      </View>

      <Text style={styles.fieldLabel}>{strings.compatibility.dobHeading}</Text>
      <View style={styles.row}>
        {dobOrder.map((field, i) => (
          <Fragment key={field}>
            {i > 0 && <Text style={styles.dot}>{dobSeparator(locale)}</Text>}
            <TextInput
              ref={dobRefs[field]}
              style={[styles.input, field === "year" ? styles.yearInput : styles.shortInput, focusedField === field && styles.inputFocused]}
              onFocus={() => setFocusedField(field)}
              onBlur={() => setFocusedField(null)}
              accessibilityLabel={`${strings.compatibility.dobHeading}: ${dobPlaceholders[field]}`}
              placeholder={dobPlaceholders[field]}
              placeholderTextColor={COLORS.placeholder}
              value={dobValues[field]}
              onChangeText={(v) => {
                const clean = digitsOnly(v).slice(0, dobMaxLens[field]);
                dobSetters[field](clean);
                const next = dobOrder[i + 1];
                if (next && clean.length === dobMaxLens[field]) dobRefs[next].current?.focus();
              }}
              keyboardType="number-pad"
              maxLength={dobMaxLens[field]}
            />
          </Fragment>
        ))}
      </View>
      {form.dobInvalid && (
        <Text style={styles.fieldError} accessibilityLiveRegion="polite" aria-live="polite">
          {strings.compatibility.dobInvalid}
        </Text>
      )}

      <Text style={styles.fieldLabel}>{strings.compatibility.timeHeading}</Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.unknownToggle, timeUnknown && styles.optionActive]}
          onPress={() => form.setTimeUnknown((v) => !v)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: timeUnknown }}
          aria-checked={timeUnknown}
          accessibilityLabel={strings.tob.unknownTime}
        >
          <Text style={[styles.optionLabel, timeUnknown && styles.optionLabelActive]}>{strings.tob.unknownTime}</Text>
        </Pressable>
        {!timeUnknown && (
          <>
            <TextInput
              style={[styles.input, styles.shortInput, focusedField === "hour" && styles.inputFocused]}
              onFocus={() => setFocusedField("hour")}
              onBlur={() => setFocusedField(null)}
              accessibilityLabel={`${strings.compatibility.timeHeading}: ${strings.tob.hourPlaceholder}`}
              placeholder={strings.tob.hourPlaceholder}
              placeholderTextColor={COLORS.placeholder}
              value={form.hour}
              onChangeText={(v) => form.setHour(digitsOnly(v).slice(0, 2))}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.dot}>:</Text>
            <TextInput
              style={[styles.input, styles.shortInput, focusedField === "minute" && styles.inputFocused]}
              onFocus={() => setFocusedField("minute")}
              onBlur={() => setFocusedField(null)}
              accessibilityLabel={`${strings.compatibility.timeHeading}: ${strings.tob.minutePlaceholder}`}
              placeholder={strings.tob.minutePlaceholder}
              placeholderTextColor={COLORS.placeholder}
              value={form.minute}
              onChangeText={(v) => form.setMinute(digitsOnly(v).slice(0, 2))}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Pressable
              style={styles.periodToggle}
              onPress={() => form.setPeriod((p) => (p === "AM" ? "PM" : "AM"))}
              accessibilityRole="button"
              accessibilityLabel={period === "AM" ? strings.tob.periodAM : strings.tob.periodPM}
            >
              <Text style={styles.optionLabel}>{period === "AM" ? strings.tob.periodAM : strings.tob.periodPM}</Text>
            </Pressable>
          </>
        )}
      </View>

      <Text style={styles.fieldLabel}>{strings.compatibility.cityHeading}</Text>
      <TextInput
        style={[styles.input, focusedField === "city" && styles.inputFocused]}
        onFocus={() => setFocusedField("city")}
        onBlur={() => setFocusedField(null)}
        accessibilityLabel={strings.compatibility.cityHeading}
        placeholder={strings.compatibility.cityPlaceholder}
        placeholderTextColor={COLORS.placeholder}
        value={form.cityQuery}
        onChangeText={form.onChangeCityQuery}
      />
      {form.cityResults.length > 0 && (
        <View style={styles.resultsBox}>
          {form.cityResults.map((r) => (
            <Pressable
              key={r.id}
              style={styles.resultRow}
              accessibilityRole="button"
              accessibilityLabel={`${r.cityDisplay}, ${r.countryDisplay}`}
              onPress={() => form.pickCity(r)}
            >
              <Text style={styles.resultCity}>{r.cityDisplay}</Text>
              <Text style={styles.resultCountry}>{r.countryDisplay}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fieldLabel: { fontFamily: FONTS.semibold, fontSize: 12.5, color: COLORS.subheadline, marginTop: 18, marginBottom: 8 },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
    // Web only: drop the browser's default focus ring; the focused border below is the cue.
    outlineStyle: "solid",
    outlineWidth: 0,
  },
  inputFocused: { borderColor: COLORS.gold },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  yearInput: { flex: 2.3, minWidth: 0, textAlign: "center" },
  shortInput: { flex: 1.2, minWidth: 0, textAlign: "center" },
  dot: { color: COLORS.footer, fontSize: 18 },
  option: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  unknownToggle: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  periodToggle: {
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionActive: { backgroundColor: "rgba(111,169,139,0.12)", borderColor: "rgba(111,169,139,0.4)" },
  optionLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.subheadline },
  optionLabelActive: { color: COLORS.gold },
  resultsBox: { marginTop: 6, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, overflow: "hidden" },
  resultRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 13, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  resultCity: { fontFamily: FONTS.medium, fontSize: 14.5, color: COLORS.headline },
  resultCountry: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  fieldError: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.danger, marginTop: 8 },
});
