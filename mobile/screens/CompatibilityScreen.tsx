import { useRef, useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react-native";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { COMPATIBILITY_CONTENT } from "../lib/compatibilityContent";
import type { CompatibilityResult } from "../lib/compatibility";
import { formatSajuTypeName } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";

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

  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const citySearchSeq = useRef(0);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [sharing, setSharing] = useState(false);
  const shareCardRef = useRef<View>(null);

  const monthRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);

  const canSubmit = !!selfDayMasterChar && isFemale !== null && year.length === 4 && month.length > 0 && day.length > 0;

  function onChangeCityQuery(v: string) {
    setCityQuery(v);
    setSelectedCity(null);
    if (!v.trim()) {
      setCityResults([]);
      return;
    }
    const seq = ++citySearchSeq.current;
    setTimeout(async () => {
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
    const otherDisplayName = otherName.trim() || strings.compatibility.namePlaceholder;

    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
            <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
            <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
          </Pressable>

          <View style={[styles.scoreCard, { borderColor: `${tint}55` }]}>
            <Text style={styles.scoreLabel}>{strings.compatibility.scoreLabel}</Text>
            <Text style={[styles.scoreValue, { color: tint }]}>{result.compatibility.score}</Text>
            <Text style={styles.relationHeadline}>{relationCopy.headline}</Text>
          </View>

          {result.other.sajuType && (
            <Text style={styles.otherTypeLine}>
              {strings.compatibility.otherTypeLabel(otherDisplayName, formatSajuTypeName(locale, result.other.sajuType))}
            </Text>
          )}

          <Text style={styles.relationBody}>{relationCopy.body}</Text>

          {result.compatibility.stemBond && <Text style={styles.bondNote}>{content.bondNote}</Text>}

          <View ref={shareCardRef} collapsable={false} style={styles.shareCard}>
            <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
            <View style={styles.shareCardInner}>
              <Text style={styles.shareBrandLabel}>FATESAID</Text>

              <View style={styles.shareCardMid}>
                <Text style={styles.shareEyebrow}>{strings.compatibility.shareCardEyebrow}</Text>
                <Text style={styles.shareNames}>
                  {selfNickname} · {otherDisplayName}
                </Text>
                <Text style={[styles.shareScore, { color: tint }]}>{result.compatibility.score}</Text>
                <Text style={styles.shareScoreLabel}>{strings.compatibility.scoreLabel}</Text>
                <Text style={styles.shareHeadline}>{relationCopy.headline}</Text>
                <Text style={styles.shareBody}>{relationCopy.body}</Text>

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

          <Pressable style={styles.shareButton} onPress={handleShare} disabled={sharing}>
            {sharing ? (
              <ActivityIndicator color={COLORS.ctaText} />
            ) : (
              <>
                <Share2 size={16} strokeWidth={2} color={COLORS.ctaText} />
                <Text style={styles.shareButtonLabel}>{strings.compatibility.shareButton}</Text>
              </>
            )}
          </Pressable>

          <Pressable style={styles.tryAgainButton} onPress={handleTryAgain}>
            <Text style={styles.tryAgainLabel}>{strings.compatibility.tryAgainButton}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading}>{strings.compatibility.heading}</Text>
        <Text style={styles.subtitle}>{strings.compatibility.subtitle}</Text>

        <Text style={styles.fieldLabel}>{strings.compatibility.nameLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder={strings.compatibility.namePlaceholder}
          placeholderTextColor={COLORS.disabledText}
          value={otherName}
          onChangeText={setOtherName}
        />

        <View style={styles.row}>
          <Pressable style={[styles.option, isFemale === false && styles.optionActive]} onPress={() => setIsFemale(false)}>
            <Text style={[styles.optionLabel, isFemale === false && styles.optionLabelActive]}>{strings.gender.male}</Text>
          </Pressable>
          <Pressable style={[styles.option, isFemale === true && styles.optionActive]} onPress={() => setIsFemale(true)}>
            <Text style={[styles.optionLabel, isFemale === true && styles.optionLabelActive]}>{strings.gender.female}</Text>
          </Pressable>
        </View>

        <Text style={styles.fieldLabel}>{strings.compatibility.dobHeading}</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.yearInput]}
            placeholder={strings.dob.yearPlaceholder}
            placeholderTextColor={COLORS.disabledText}
            value={year}
            onChangeText={(v) => {
              const clean = digitsOnly(v).slice(0, 4);
              setYear(clean);
              if (clean.length === 4) monthRef.current?.focus();
            }}
            keyboardType="number-pad"
            maxLength={4}
          />
          <Text style={styles.dot}>.</Text>
          <TextInput
            ref={monthRef}
            style={[styles.input, styles.shortInput]}
            placeholder={strings.dob.monthPlaceholder}
            placeholderTextColor={COLORS.disabledText}
            value={month}
            onChangeText={(v) => {
              const clean = digitsOnly(v).slice(0, 2);
              setMonth(clean);
              if (clean.length === 2) dayRef.current?.focus();
            }}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Text style={styles.dot}>.</Text>
          <TextInput
            ref={dayRef}
            style={[styles.input, styles.shortInput]}
            placeholder={strings.dob.dayPlaceholder}
            placeholderTextColor={COLORS.disabledText}
            value={day}
            onChangeText={(v) => setDay(digitsOnly(v).slice(0, 2))}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>

        <Text style={styles.fieldLabel}>{strings.compatibility.timeHeading}</Text>
        <View style={styles.row}>
          <Pressable style={[styles.unknownToggle, timeUnknown && styles.optionActive]} onPress={() => setTimeUnknown((v) => !v)}>
            <Text style={[styles.optionLabel, timeUnknown && styles.optionLabelActive]}>{strings.tob.unknownTime}</Text>
          </Pressable>
          {!timeUnknown && (
            <>
              <TextInput
                style={[styles.input, styles.shortInput]}
                placeholder={strings.tob.hourPlaceholder}
                placeholderTextColor={COLORS.disabledText}
                value={hour}
                onChangeText={(v) => setHour(digitsOnly(v).slice(0, 2))}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text style={styles.dot}>:</Text>
              <TextInput
                style={[styles.input, styles.shortInput]}
                placeholder={strings.tob.minutePlaceholder}
                placeholderTextColor={COLORS.disabledText}
                value={minute}
                onChangeText={(v) => setMinute(digitsOnly(v).slice(0, 2))}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Pressable style={styles.periodToggle} onPress={() => setPeriod((p) => (p === "AM" ? "PM" : "AM"))}>
                <Text style={styles.optionLabel}>{period === "AM" ? strings.tob.periodAM : strings.tob.periodPM}</Text>
              </Pressable>
            </>
          )}
        </View>

        <Text style={styles.fieldLabel}>{strings.compatibility.cityHeading}</Text>
        <TextInput
          style={styles.input}
          placeholder={strings.compatibility.cityPlaceholder}
          placeholderTextColor={COLORS.disabledText}
          value={cityQuery}
          onChangeText={onChangeCityQuery}
        />
        {cityResults.length > 0 && (
          <View style={styles.resultsBox}>
            {cityResults.map((r) => (
              <Pressable
                key={r.id}
                style={styles.resultRow}
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

        <Pressable style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]} onPress={handleSubmit} disabled={!canSubmit || submitting}>
          {submitting ? <ActivityIndicator color={COLORS.ctaText} /> : <Text style={styles.submitButtonLabel}>{strings.compatibility.submitButton}</Text>}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12 },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline },
  subtitle: { fontFamily: "Manrope_400Regular", fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: 8, marginBottom: 20 },
  fieldLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12.5, color: COLORS.subheadline, marginTop: 18, marginBottom: 8 },
  input: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
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
  optionLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.subheadline },
  optionLabelActive: { color: COLORS.gold },
  resultsBox: { marginTop: 6, backgroundColor: "#131219", borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, overflow: "hidden" },
  resultRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 13, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  resultCity: { fontFamily: "Manrope_500Medium", fontSize: 14.5, color: COLORS.headline },
  resultCountry: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  error: { fontFamily: "Manrope_400Regular", fontSize: 12.5, color: "#CB6249", marginTop: 14 },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 28,
  },
  submitButtonDisabled: { opacity: 0.4 },
  submitButtonLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 15, color: COLORS.ctaText },
  scoreCard: {
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 28,
    marginTop: 8,
    gap: 4,
  },
  scoreLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12.5, color: COLORS.subheadline, letterSpacing: 0.3 },
  scoreValue: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 48 },
  relationHeadline: { fontFamily: "Manrope_600SemiBold", fontSize: 15, color: COLORS.headline, marginTop: 4 },
  otherTypeLine: { fontFamily: "Manrope_500Medium", fontSize: 13.5, color: COLORS.gold, marginTop: 18, textAlign: "center" },
  relationBody: { fontFamily: "Manrope_400Regular", fontSize: 14.5, lineHeight: 22, color: COLORS.subheadline, marginTop: 12 },
  bondNote: { fontFamily: "Manrope_500Medium", fontSize: 13.5, lineHeight: 20, color: COLORS.gold, marginTop: 16 },
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
    marginTop: 28,
  },
  shareCardInner: {
    paddingHorizontal: "9%",
    paddingVertical: "9%",
    alignItems: "center",
  },
  shareBrandLabel: { fontFamily: "Manrope_700Bold", fontSize: 13, letterSpacing: 3, color: COLORS.gold, marginBottom: 28 },
  shareCardMid: { alignItems: "center", width: "100%" },
  shareEyebrow: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.gold, marginBottom: 4 },
  shareNames: { fontFamily: "Manrope_600SemiBold", fontSize: 17, color: COLORS.headline, textAlign: "center" },
  shareScore: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 88, lineHeight: 96, marginTop: 12 },
  shareScoreLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12, letterSpacing: 0.5, color: COLORS.subheadline },
  shareHeadline: { fontFamily: "Manrope_600SemiBold", fontSize: 18, color: COLORS.headline, textAlign: "center", marginTop: 22, lineHeight: 26 },
  shareBody: { fontFamily: "Manrope_400Regular", fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, textAlign: "center", marginTop: 14 },
  shareDetailBlock: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  shareDetailLabel: { fontFamily: "Manrope_700Bold", fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase" },
  shareDetailText: { fontFamily: "Manrope_400Regular", fontSize: 13, lineHeight: 20, color: COLORS.headline, marginTop: 6 },
  shareBondNote: { fontFamily: "Manrope_500Medium", fontSize: 12.5, lineHeight: 19, color: COLORS.gold, textAlign: "center", marginTop: 16 },
  shareFooter: { fontFamily: "Manrope_500Medium", fontSize: 12.5, color: COLORS.subheadline, textAlign: "center", marginTop: 30 },
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
  shareButtonLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 14.5, color: COLORS.ctaText },
  tryAgainButton: { alignItems: "center", paddingVertical: 14, marginTop: 10 },
  tryAgainLabel: { fontFamily: "Manrope_500Medium", fontSize: 13.5, color: COLORS.subheadline },
});
