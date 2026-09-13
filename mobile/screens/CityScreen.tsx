import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { API_BASE_URL } from "../config";
import { COLORS } from "../theme/colors";

type CityResult = { id: string; cityDisplay: string; countryDisplay: string };

export type SajuResult = {
  elements: Record<string, number>;
  dominantElement: string;
  fourPillars: unknown;
  decadeFortune: unknown;
};

export default function CityScreen({
  birthPayload,
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
  onSubmitted: (result: SajuResult) => void;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [selected, setSelected] = useState<CityResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchSeq = useRef(0);

  useEffect(() => {
    if (selected && query === `${selected.cityDisplay}, ${selected.countryDisplay}`) return;
    setSelected(null);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const seq = ++searchSeq.current;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cities/search?q=${encodeURIComponent(query)}`);
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
  }, [query]);

  function handlePick(city: CityResult) {
    setSelected(city);
    setQuery(`${city.cityDisplay}, ${city.countryDisplay}`);
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
          track: "romance",
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "사주 계산에 실패했습니다.");
        return;
      }
      onSubmitted(json);
    } catch {
      setError("네트워크 오류로 사주 계산에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <OnboardingShell stepIndex={4} onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading}>출생 도시 (전세계 검색 가능)</Text>
        <TextInput
          style={styles.input}
          placeholder="도시 이름을 입력하세요"
          placeholderTextColor={COLORS.disabledText}
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
          <Text style={styles.noResultsHint}>
            검색 결과가 없어요. 사주 계산에는 태어난 시간대가 가장 중요해서, 같은 시간대의 가까운 대도시(예: 서울, 부산, 대구)로
            검색해보셔도 괜찮아요.
          </Text>
        )}
        {results.length > 0 && (
          <View style={styles.resultsBox}>
            {results.map((r) => (
              <Pressable key={r.id} style={styles.resultRow} onPress={() => handlePick(r)}>
                <Text style={styles.resultCity}>{r.cityDisplay}</Text>
                <Text style={styles.resultCountry}>{r.countryDisplay}</Text>
              </Pressable>
            ))}
          </View>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.middle}>
        {submitting ? (
          <ActivityIndicator color={COLORS.gold} size="large" />
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
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 22,
    color: COLORS.headline,
  },
  input: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 24,
  },
  searchSpinner: {
    marginTop: 12,
  },
  resultsBox: {
    marginTop: 6,
    backgroundColor: "#131219",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultCity: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14.5,
    color: COLORS.headline,
  },
  resultCountry: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
  },
  noResultsHint: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    lineHeight: 19,
    color: COLORS.subheadline,
    marginTop: 10,
  },
  error: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    color: "#CB6249",
    marginTop: 10,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
