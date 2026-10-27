import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import ElementsLoader from "../components/motion/ElementsLoader";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { ONBOARDING_STEP_INDEX } from "../lib/onboardingSteps";
import type { SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";

type CityResult = { id: string; cityDisplay: string; countryDisplay: string };

// A city carried over from the web has no country label; it shows as the city alone.
const cityLabel = (c: CityResult) => (c.countryDisplay ? `${c.cityDisplay}, ${c.countryDisplay}` : c.cityDisplay);

export type SajuResult = {
  elements: Record<string, number>;
  dominantElement: string;
  fourPillars: unknown;
  decadeFortune: unknown;
  // dayMaster.char 등 — 궁합/오늘의 운세가 필요로 하는 값 (App.tsx가 homeData로
  // 옮길 때 이 필드를 빠뜨리면 두 기능 다 selfDayMasterChar가 null이 되어 조용히
  // 아무것도 안 뜨는 채로 멈춘다, 2026-09-15에 실기기 테스트로 발견).
  summary: unknown;
  currentAge: number;
  sajuType: SajuType | null;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
};

export default function CityScreen({
  birthPayload,
  initialCity,
  onSubmitted,
  onBack,
}: {
  // Everything /api/saju needs except city — collected across the earlier steps.
  birthPayload: {
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    birthHour: number | null;
    birthMinute: number;
    isFemale: boolean;
    sessionId: string;
    nickname: string;
  };
  /** Preselected from a web→app handoff (lib/handoff.ts); the step still shows so the calculation runs here. */
  initialCity?: { id: string; cityDisplay: string } | null;
  onSubmitted: (result: SajuResult) => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const [query, setQuery] = useState(initialCity ? initialCity.cityDisplay : "");
  const [results, setResults] = useState<CityResult[]>([]);
  const [selected, setSelected] = useState<CityResult | null>(initialCity ? { ...initialCity, countryDisplay: "" } : null);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchSeq = useRef(0);

  useEffect(() => {
    if (selected && query === cityLabel(selected)) return;
    setSelected(null);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const seq = ++searchSeq.current;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cities/search?q=${encodeURIComponent(query)}&locale=${locale}`);
        const json = await res.json();
        if (searchSeq.current === seq) setResults(json.results ?? []);
      } catch {
        if (searchSeq.current === seq) setResults([]);
      } finally {
        if (searchSeq.current === seq) setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, locale]);

  function handlePick(city: CityResult) {
    setSelected(city);
    setQuery(cityLabel(city));
    setResults([]);
  }

  async function handleSubmit() {
    if (!selected || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/saju`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...birthPayload,
          birthCity: selected.cityDisplay,
          birthCityId: selected.id,
          isLunar: false,
          // No track here — this step runs before the user has picked a psych module
          // (see mobile/lib/quiz/modules.ts's ModuleDefinition.track), so it's genuinely
          // unknown yet. /api/saju's track is optional and only used for a best-effort
          // session-row save (see app/api/saju/route.ts) — sending nothing is more honest
          // than a hardcoded guess, and doesn't affect the saju calculation itself.
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || strings.city.errorDefault);
        return;
      }
      onSubmitted({ ...json, birthYear: birthPayload.birthYear, birthMonth: birthPayload.birthMonth, birthDay: birthPayload.birthDay });
    } catch {
      setError(strings.city.errorNetwork);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <OnboardingShell stepIndex={ONBOARDING_STEP_INDEX.city} onBack={onBack}>
      <View style={styles.top}>
        <Reveal index={0}>
          <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.city.heading}</Text>
        </Reveal>
        <TextInput
          style={styles.input}
          placeholder={strings.city.placeholder}
          accessibilityLabel={strings.city.heading}
          maxFontSizeMultiplier={MAX_FONT_SCALE.control}
          placeholderTextColor={COLORS.placeholder}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {searching && <ActivityIndicator style={styles.searchSpinner} color={COLORS.gold} />}
        {!searching && !selected && query.trim().length > 0 && results.length === 0 && (
          // Korea sits in one timezone (Asia/Seoul), and that timezone is what actually
          // drives the manseryeok calculation — the exact city only fine-tunes the
          // true-solar-time correction by a few minutes. Small Korean towns are absent
          // from the underlying city-timezones dataset (see lib/worldCities.ts), so
          // pointing people to a same-timezone major city is a real, correct fallback,
          // not just a UX band-aid.
          <Text style={styles.noResultsHint} accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.city.noResultsHint}</Text>
        )}
        {results.length > 0 && (
          <View style={styles.resultsBox}>
            {results.map((r) => (
              <PressableScale
                key={r.id}
                style={styles.resultRow}
                onPress={() => handlePick(r)}
                accessibilityRole="button"
                accessibilityLabel={`${r.cityDisplay}, ${r.countryDisplay}`}
                haptic="select"
              >
                <Text style={styles.resultCity} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{r.cityDisplay}</Text>
                <Text style={styles.resultCountry} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{r.countryDisplay}</Text>
              </PressableScale>
            ))}
          </View>
        )}
        {error && <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{error}</Text>}
      </View>

      <View style={styles.middle}>
        {submitting ? (
          <ElementsLoader size="large" />
        ) : (
          <AuraNextButton disabled={!selected} onPress={handleSubmit} size={190} />
        )}
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
    fontSize: 22,
    color: COLORS.headline,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.lg,
    marginTop: SPACE.xl,
  },
  searchSpinner: {
    marginTop: SPACE.md,
  },
  resultsBox: {
    marginTop: SPACE.sm,
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    ...SHADOW.raised,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.lg,
    borderBottomWidth: 1,
    borderBottomColor: SURFACE.hairline,
  },
  resultCity: {
    fontFamily: FONTS.medium,
    fontSize: 14.5,
    color: COLORS.headline,
  },
  resultCountry: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.subheadline,
  },
  noResultsHint: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 19,
    color: COLORS.subheadline,
    marginTop: SPACE.md,
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: COLORS.danger,
    marginTop: SPACE.md,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
