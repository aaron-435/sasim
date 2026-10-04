import { Fragment, useEffect, useRef, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Share2 from "lucide-react-native/icons/share-2";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { dobFieldOrder, dobSeparator } from "../lib/dobOrder";
import { toISODateString } from "../lib/zodiac";
import { COMPATIBILITY_CONTENT } from "../lib/compatibilityContent";
import type { CompatibilityResult } from "../lib/compatibility";
import { formatSajuTypeName } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS } from "../theme/fonts";

type CityResult = { id: string; cityDisplay: string; countryDisplay: string };

type ApiResult = {
  other: { sajuType: SajuType | null; dominantElement: string | null; elements: Record<string, number> };
  compatibility: CompatibilityResult | null;
};

function digitsOnly(v: string) {
  return v.replace(/[^0-9]/g, "");
}

export default function CompatibilityScreen({
  selfNickname,
  selfDayMasterChar,
  onBack,
}: {
  selfNickname: string;
  selfDayMasterChar: string | null;
  onBack: () => void;
}) {
  const strings = useStrings();
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
  const [focusedField, setFocusedField] = useState<"name" | "year" | "month" | "day" | "hour" | "minute" | "city" | null>(null);

  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const citySearchSeq = useRef(0);
  const citySearchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (citySearchTimer.current) clearTimeout(citySearchTimer.current);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [sharing, setSharing] = useState(false);
  const shareCardRef = useRef<View>(null);

  const yearRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);
  const dobOrder = dobFieldOrder(locale);
  const dobRefs = { year: yearRef, month: monthRef, day: dayRef };
  const dobValues = { year, month, day };
  const dobSetters = { year: setYear, month: setMonth, day: setDay };
  const dobMaxLens = { year: 4, month: 2, day: 2 };
  const dobPlaceholders = { year: strings.dob.yearPlaceholder, month: strings.dob.monthPlaceholder, day: strings.dob.dayPlaceholder };

  const dobComplete = year.length === 4 && month.length > 0 && day.length > 0;
  // Same rule as onboarding: a real calendar day, not in the future.
  const dobInvalid = dobComplete && toISODateString(year, month, day) === "";
  const canSubmit = !!selfDayMasterChar && isFemale !== null && dobComplete && !dobInvalid;

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

  async function handleSubmit() {
    if (!canSubmit || submitting || !selfDayMasterChar) {
      if (!canSubmit) setError(strings.compatibility.errorMissing);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const birthHour = timeUnknown ? null : period === "PM" ? (Number(hour) % 12) + 12 : Number(hour) % 12;
      const res = await fetch(`${API_BASE_URL}/api/compatibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selfDayMasterChar,
          other: {
            birthYear: Number(year),
            birthMonth: Number(month),
            birthDay: Number(day),
            birthHour,
            birthMinute: timeUnknown ? 0 : Number(minute) || 0,
            isFemale,
            birthCity: selectedCity?.cityDisplay,
            birthCityId: selectedCity?.id,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || strings.compatibility.errorDefault);
        return;
      }
      setResult(json);
    } catch {
      setError(strings.compatibility.errorNetwork);
    } finally {
      setSubmitting(false);
    }
  }

  function handleTryAgain() {
    setResult(null);
    setError(null);
  }

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    try {
      // width-only: forces a consistent 1080px-wide export regardless of the on-screen
      // preview's rendered size or device pixel ratio, while height scales to match
      // whatever this card's actual (content-driven) aspect ratio turns out to be — see
      // the shareCard style comment for why that's not a hardcoded 1080x1920.
      const uri = await captureRef(shareCardRef, { format: "png", quality: 1, width: 1080 });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best-effort — sharing is a bonus action, not something worth surfacing an error screen for.
    } finally {
      setSharing(false);
    }
  }

  if (result?.compatibility) {
    const content = COMPATIBILITY_CONTENT[locale] ?? COMPATIBILITY_CONTENT.ko;
    const relationCopy = content.relations[result.compatibility.relation];
    const tint = ELEMENT_COLORS[result.compatibility.selfDayMasterElement] ?? COLORS.gold;
    // A blank name must not fall back to the input's example text ("e.g. Jamie").
    const hasOtherName = otherName.trim().length > 0;
    const otherDisplayName = hasOtherName ? otherName.trim() : strings.compatibility.unnamedOther;

    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
            <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
            <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
          </Pressable>

          <View style={[styles.resultHero, { borderColor: `${tint}55` }]}>
            <Text style={styles.resultNames}>
              {selfNickname} · {otherDisplayName}
            </Text>
            <Text style={styles.relationHeadline} accessibilityRole="header">
              {relationCopy.headline}
            </Text>
            <Text style={styles.scoreLine}>
              {strings.compatibility.scoreLabel} · <Text style={[styles.scoreValue, { color: tint }]}>{result.compatibility.score}</Text>
            </Text>
          </View>

          {result.other.sajuType && (
            <Text style={styles.otherTypeLine}>
              {hasOtherName
                ? strings.compatibility.otherTypeLabel(otherDisplayName, formatSajuTypeName(locale, result.other.sajuType))
                : strings.compatibility.otherTypeLabelUnnamed(formatSajuTypeName(locale, result.other.sajuType))}
            </Text>
          )}

          <Text style={styles.relationBody}>{relationCopy.body}</Text>

          {result.compatibility.stemBond && <Text style={styles.bondNote}>{content.bondNote}</Text>}

          {/* The image is a separate artifact from the reading above, so it gets a labelled
              frame and carries the good-point / caution split instead of repeating the body. */}
          <View style={styles.previewFrame}>
            <Text style={styles.previewLabel}>{strings.compatibility.sharePreviewLabel}</Text>
            <View ref={shareCardRef} collapsable={false} style={styles.shareCard}>
              <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
              <View style={styles.shareCardInner}>
                <Text style={styles.shareBrandLabel}>FATESAID</Text>

                <View style={styles.shareCardMid}>
                  <Text style={styles.shareEyebrow}>{strings.compatibility.shareCardEyebrow}</Text>
                  <Text style={styles.shareNames}>
                    {selfNickname} · {otherDisplayName}
                  </Text>
                  <Text style={styles.shareHeadline}>{relationCopy.headline}</Text>
                  <Text style={styles.shareScoreLine}>
                    {strings.compatibility.scoreLabel} · <Text style={{ color: tint }}>{result.compatibility.score}</Text>
                  </Text>

                  <View style={styles.shareDetailBlock}>
                    <Text style={[styles.shareDetailLabel, { color: "#8FBF9E" }]}>{strings.compatibility.shareCardGoodPointLabel}</Text>
                    <Text style={styles.shareDetailText}>{relationCopy.goodPoint}</Text>
                  </View>

                  <View style={styles.shareDetailBlock}>
                    <Text style={[styles.shareDetailLabel, { color: "#D9A26C" }]}>{strings.compatibility.shareCardCautionLabel}</Text>
                    <Text style={styles.shareDetailText}>{relationCopy.caution}</Text>
                  </View>

                  {result.compatibility.stemBond && <Text style={styles.shareBondNote}>{content.bondNote}</Text>}
                </View>

                <Text style={styles.shareFooter}>{strings.compatibility.shareCardFooter}</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.shareButton}
            onPress={handleShare}
            disabled={sharing}
            accessibilityRole="button"
            accessibilityLabel={strings.compatibility.shareButton}
          >
            {sharing ? (
              <ActivityIndicator color={COLORS.ctaText} />
            ) : (
              <>
                <Share2 size={16} strokeWidth={2} color={COLORS.ctaText} />
                <Text style={styles.shareButtonLabel}>{strings.compatibility.shareButton}</Text>
              </>
            )}
          </Pressable>

          <Pressable style={styles.tryAgainButton} onPress={handleTryAgain} accessibilityRole="button">
            <Text style={styles.tryAgainLabel}>{strings.compatibility.tryAgainButton}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading}>{strings.compatibility.heading}</Text>
        <Text style={styles.subtitle}>{strings.compatibility.subtitle}</Text>

        <Text style={styles.fieldLabel}>{strings.compatibility.nameLabel}</Text>
        <TextInput
          style={[styles.input, focusedField === "name" && styles.inputFocused]}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
          accessibilityLabel={strings.compatibility.nameLabel}
          placeholder={strings.compatibility.namePlaceholder}
          placeholderTextColor={COLORS.placeholder}
          value={otherName}
          onChangeText={setOtherName}
        />

        <Text style={styles.fieldLabel}>{strings.compatibility.genderLabel}</Text>
        <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={strings.compatibility.genderLabel}>
          <Pressable
            style={[styles.option, isFemale === false && styles.optionActive]}
            onPress={() => setIsFemale(false)}
            accessibilityRole="radio"
            accessibilityState={{ checked: isFemale === false }}
            aria-checked={isFemale === false}
            accessibilityLabel={strings.gender.male}
          >
            <Text style={[styles.optionLabel, isFemale === false && styles.optionLabelActive]}>{strings.gender.male}</Text>
          </Pressable>
          <Pressable
            style={[styles.option, isFemale === true && styles.optionActive]}
            onPress={() => setIsFemale(true)}
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
        {dobInvalid && (
          <Text style={styles.fieldError} accessibilityLiveRegion="polite" aria-live="polite">
            {strings.compatibility.dobInvalid}
          </Text>
        )}

        <Text style={styles.fieldLabel}>{strings.compatibility.timeHeading}</Text>
        <View style={styles.row}>
          <Pressable
            style={[styles.unknownToggle, timeUnknown && styles.optionActive]}
            onPress={() => setTimeUnknown((v) => !v)}
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
                value={hour}
                onChangeText={(v) => setHour(digitsOnly(v).slice(0, 2))}
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
                value={minute}
                onChangeText={(v) => setMinute(digitsOnly(v).slice(0, 2))}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Pressable
                style={styles.periodToggle}
                onPress={() => setPeriod((p) => (p === "AM" ? "PM" : "AM"))}
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
          value={cityQuery}
          onChangeText={onChangeCityQuery}
        />
        {cityResults.length > 0 && (
          <View style={styles.resultsBox}>
            {cityResults.map((r) => (
              <Pressable
                key={r.id}
                style={styles.resultRow}
                accessibilityRole="button"
                accessibilityLabel={`${r.cityDisplay}, ${r.countryDisplay}`}
                onPress={() => {
                  setSelectedCity(r);
                  setCityQuery(`${r.cityDisplay}, ${r.countryDisplay}`);
                  setCityResults([]);
                }}
              >
                <Text style={styles.resultCity}>{r.cityDisplay}</Text>
                <Text style={styles.resultCountry}>{r.countryDisplay}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {error && <Text style={styles.error}>{error}</Text>}
        {/* Say why the button is dimmed instead of leaving a silent disabled state. */}
        {!error && !canSubmit && !dobInvalid && <Text style={styles.submitHint}>{strings.compatibility.errorMissing}</Text>}

        <Pressable
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit || submitting}
          accessibilityRole="button"
          accessibilityLabel={strings.compatibility.submitButton}
        >
          {submitting ? <ActivityIndicator color={COLORS.ctaText} /> : <Text style={styles.submitButtonLabel}>{strings.compatibility.submitButton}</Text>}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline },
  subtitle: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: 8, marginBottom: 20 },
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
  error: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.danger, marginTop: 14 },
  fieldError: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.danger, marginTop: 8 },
  submitHint: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, marginTop: 14 },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 28,
  },
  submitButtonDisabled: { opacity: 0.4 },
  submitButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
  resultHero: {
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  resultNames: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline, textAlign: "center" },
  relationHeadline: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center", marginTop: 10 },
  scoreLine: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, marginTop: 12 },
  scoreValue: { fontFamily: FONTS.semibold, fontVariant: ["lining-nums"] },
  otherTypeLine: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.gold, marginTop: 18, textAlign: "center" },
  relationBody: { fontFamily: FONTS.regular, fontSize: 14.5, lineHeight: 22, color: COLORS.subheadline, marginTop: 12 },
  bondNote: { fontFamily: FONTS.medium, fontSize: 13.5, lineHeight: 20, color: COLORS.gold, marginTop: 16 },
  previewFrame: {
    marginTop: 32,
    padding: 14,
    paddingTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.disabledText,
    backgroundColor: COLORS.inputBg,
  },
  previewLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.footer, textAlign: "center", marginBottom: 10 },
  shareCard: {
    // Deliberately no fixed aspectRatio — the content below (body + good-point + caution,
    // and sometimes a bond note) varies in length across relations/locales, and a hard
    // 9:16 box would clip or overflow whichever combination runs long. Natural,
    // content-driven height instead; handleShare captures at width:1080 only (no forced
    // height) so the exported image keeps this same vertical proportion, uncut.
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.background,
  },
  shareCardInner: {
    paddingHorizontal: "9%",
    paddingVertical: "9%",
    alignItems: "center",
  },
  shareBrandLabel: { fontFamily: FONTS.bold, fontSize: 13, letterSpacing: 3, color: COLORS.gold, marginBottom: 28 },
  shareCardMid: { alignItems: "center", width: "100%" },
  shareEyebrow: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold, marginBottom: 4 },
  shareNames: { fontFamily: FONTS.semibold, fontSize: 17, color: COLORS.headline, textAlign: "center" },
  shareHeadline: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center", marginTop: 18 },
  shareScoreLine: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline, textAlign: "center", marginTop: 10, marginBottom: 8 },
  shareDetailBlock: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  shareDetailLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2 },
  shareDetailText: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.headline, marginTop: 6 },
  shareBondNote: { fontFamily: FONTS.medium, fontSize: 12.5, lineHeight: 19, color: COLORS.gold, textAlign: "center", marginTop: 16 },
  shareFooter: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, textAlign: "center", marginTop: 30 },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 28,
  },
  shareButtonLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  tryAgainButton: { alignItems: "center", paddingVertical: 14, marginTop: 10 },
  tryAgainLabel: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.subheadline },
});
