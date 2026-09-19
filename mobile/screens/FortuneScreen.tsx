import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react-native";
import { AccessibilityInfo, ActivityIndicator, Animated, Easing, Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import type { Locale } from "../lib/i18n/types";
import { DAILY_FORTUNE_CONTENT, LUCKY_NUMBERS, LUCKY_POINTS, getOverview } from "../lib/dailyFortuneContent";
import { TWELVE_STAGES_CONTENT } from "../lib/twelveStagesContent";
import { YEAR_FORTUNE_CONTENT } from "../lib/yearFortuneContent";
import type { CompatibilityResult } from "../lib/compatibility";
import { getFortuneStreak, isFortuneOpened, markFortuneOpened } from "../lib/fortuneOpenState";
import { hasQaProEntitlement, purchaseQaPro, restoreQaPro } from "../lib/purchases";
import { refreshRoutineNotification } from "../lib/routineNotification";
import { COLORS } from "../theme/colors";

// Daily content sections that fade/slide in, one after another, once the seal card below
// is opened — score, overview, wealth, love, health, life stage, sinsal, lucky points.
const DAILY_SECTION_COUNT = 8;

// "오늘의 운세" / "이번주 운세" — 화면은 순전히 프레젠테이션이다. relation 분류·
// 점수는 lib/compatibility.ts를 그대로 재사용해 만든 app/api/dailyFortune가
// 계산하고(선택된 "다른 쪽"이 사람이 아니라 오늘의 일진일 뿐), 이 화면은 relation
// 값을 받아 lib/dailyFortuneContent.ts의 카피를 입힌다 — CompatibilityScreen과
// 같은 분리. 구독 게이트는 QAScreen과 같은 qa_premium 엔타이틀먼트를 재사용한다
// (2026-09-15: "질문 10개"뿐이던 구독 혜택이 빈약하다는 피드백으로 추가된 기능).
//
// 2026-09-16: lifeStageIndex/sinsalIndex 추가 — 경쟁 앱(포스텔러 등) 대비
// 콘텐츠 깊이 격차를 좁히려고 실제 명리학 계산(lib/twelveStages.ts, 서버 쪽)을
// 하나 더 얹었다. 이 화면은 인덱스만 받아 twelveStagesContent.ts로 카피를
// 입히는 동일한 분리 원칙을 그대로 따른다.
type DayFortune = {
  date: string;
  dayMaster: { char: string; element: string; pillarIndex: number; branch: string };
  compatibility: CompatibilityResult | null;
  lifeStageIndex: number;
  sinsalIndex: number | null;
};

// 2026-09-16: "신년운세" Phase 1 — a third tab reusing the exact same subscription
// gate/chrome/styles as daily/weekly (see lib/yearFortune.ts for why this needed no
// new async KASI plumbing: year pillars are a closed-form 60갑자 formula).
type YearFortune = {
  year: number;
  yearMaster: { char: string; element: string; branch: string };
  compatibility: CompatibilityResult | null;
  lifeStageIndex: number;
  sinsalIndex: number | null;
  branchRelation: "hap" | "chung" | "none";
};

// 2026-09-16: Phase 2 — the same year's 12 saju-months, same fields as YearFortune.
// No new content: the domain picker below just re-indexes yearContent's existing
// 5-relation copy per month instead of once for the whole year.
type MonthFortune = {
  monthIndex: number;
  calendarYear: number;
  calendarMonth: number;
  monthMaster: { char: string; element: string; branch: string };
  compatibility: CompatibilityResult | null;
  lifeStageIndex: number;
  sinsalIndex: number | null;
  branchRelation: "hap" | "chung" | "none";
};

type YearDomain = "overview" | "wealth" | "love" | "career" | "study" | "health";

const WEEKDAY_SHORT: Record<Locale, string[]> = {
  ko: ["일", "월", "화", "수", "목", "금", "토"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  es: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
};

function formatShortDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = WEEKDAY_SHORT[locale][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  if (locale === "ko") return `${m}월 ${d}일 (${weekday})`;
  if (locale === "es") return `${d}/${m} (${weekday})`;
  return `${m}/${d} (${weekday})`;
}

function pickExtreme(list: DayFortune[], mode: "max" | "min"): DayFortune {
  return list.reduce((acc, item) => {
    const accScore = acc.compatibility!.score;
    const itemScore = item.compatibility!.score;
    return (mode === "max" ? itemScore > accScore : itemScore < accScore) ? item : acc;
  }, list[0]);
}

// One lazily-triggered GET per tab — replaces five hand-copied loader functions that
// each carried their own data/loading/error state trio. `load` resolves to the payload
// (or null on failure) so a caller can chain follow-up work, like the daily tab's
// open-state/streak lookup.
function useLazyFetch<T>(errorText: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const lastRequest = useRef<{ url: string; key: string } | null>(null);
  const load = useCallback(
    async (url: string, key: string): Promise<T | null> => {
      lastRequest.current = { url, key };
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "failed");
        if (!mountedRef.current) return null;
        setData(json[key]);
        return json[key] as T;
      } catch {
        if (mountedRef.current) setError(errorText);
        return null;
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [errorText],
  );

  const retry = useCallback(() => {
    if (lastRequest.current) return load(lastRequest.current.url, lastRequest.current.key);
    return Promise.resolve(null);
  }, [load]);

  return { data, loading, error, load, retry };
}

// Error with a way out — every tab used to show a bare red line and no retry, so one
// failed request stranded a paying subscriber until they left the screen.
function ErrorNotice({ text, retryLabel, onRetry }: { text: string; retryLabel: string; onRetry: () => void }) {
  return (
    <View style={styles.errorBlock}>
      <Text style={styles.errorBlockText}>{text}</Text>
      <Pressable onPress={onRetry} style={styles.retryButton} accessibilityRole="button">
        <Text style={styles.retryLabel}>{retryLabel}</Text>
      </Pressable>
    </View>
  );
}

export default function FortuneScreen({
  selfDayMasterChar,
  selfDayBranch,
  onBack,
}: {
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const content = DAILY_FORTUNE_CONTENT[locale] ?? DAILY_FORTUNE_CONTENT.ko;
  const stagesContent = TWELVE_STAGES_CONTENT[locale] ?? TWELVE_STAGES_CONTENT.ko;
  const yearContent = YEAR_FORTUNE_CONTENT[locale] ?? YEAR_FORTUNE_CONTENT.ko;

  const [entitled, setEntitled] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"daily" | "weekly" | "month" | "yearly">("daily");

  const { data: daily, loading: dailyLoading, error: dailyError, load: fetchDaily, retry: retryDaily } = useLazyFetch<DayFortune>(strings.fortune.loadErrorText);
  const { data: weekly, loading: weeklyLoading, error: weeklyError, load: fetchWeekly, retry: retryWeekly } = useLazyFetch<DayFortune[]>(strings.fortune.loadErrorText);
  // "이달의 길흉일 캘린더" — weekly와 완전히 같은 하루치 엔진/화면 패턴을
  // 범위만 이번 달 전체로 넓힌 것 (lib/dailyFortune.ts의 getMonthFortune 참고).
  const { data: monthDays, loading: monthDaysLoading, error: monthDaysError, load: fetchMonthDays, retry: retryMonthDays } = useLazyFetch<DayFortune[]>(strings.fortune.loadErrorText);
  const { data: yearly, loading: yearlyLoading, error: yearlyError, load: fetchYearly, retry: retryYearly } = useLazyFetch<YearFortune>(strings.fortune.loadErrorText);
  const { data: monthly, loading: monthlyLoading, error: monthlyError, load: fetchMonthly, retry: retryMonthly } = useLazyFetch<MonthFortune[]>(strings.fortune.loadErrorText);
  const [monthlyDomain, setMonthlyDomain] = useState<YearDomain>("overview");

  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);

  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const sealScale = useRef(new Animated.Value(1)).current;
  const sectionAnims = useRef([...Array(DAILY_SECTION_COUNT)].map(() => new Animated.Value(0))).current;

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    hasQaProEntitlement().then((v) => {
      if (mountedRef.current) setEntitled(v);
    });
  }, []);

  // 2026-09-19: selfDayBranch is optional here, matching the API (see
  // app/api/dailyFortune/route.ts) — only the 신살 section needs it, and the server
  // returns sinsalIndex: null without it, which the daily view already handles. These
  // loaders used to bail out entirely when it was missing, leaving a subscriber whose
  // stored reading lacked a day branch staring at a permanently blank screen.
  function fortuneUrl(path: "dailyFortune" | "yearFortune", mode?: string): string {
    const params = new URLSearchParams({ selfDayMasterChar: selfDayMasterChar ?? "" });
    if (mode) params.set("mode", mode);
    if (selfDayBranch) params.set("selfDayBranch", selfDayBranch);
    return `${API_BASE_URL}/api/${path}?${params.toString()}`;
  }

  useEffect(() => {
    if (!entitled || !selfDayMasterChar || daily || dailyLoading) return;
    (async () => {
      const result = await fetchDaily(fortuneUrl("dailyFortune", "daily"), "daily");
      if (!result) return;
      const [opened, currentStreak] = await Promise.all([isFortuneOpened(result.date), getFortuneStreak(result.date)]);
      if (!mountedRef.current) return;
      setRevealed(opened);
      setStreak(currentStreak);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitled, selfDayMasterChar, selfDayBranch]);

  function handleSelectTab(next: "daily" | "weekly" | "month" | "yearly") {
    setTab(next);
    if (!selfDayMasterChar) return;
    if (next === "weekly" && !weekly && !weeklyLoading) fetchWeekly(fortuneUrl("dailyFortune", "weekly"), "weekly");
    if (next === "month" && !monthDays && !monthDaysLoading) fetchMonthDays(fortuneUrl("dailyFortune", "month"), "month");
    if (next === "yearly" && !yearly && !yearlyLoading) fetchYearly(fortuneUrl("yearFortune"), "yearFortune");
    if (next === "yearly" && !monthly && !monthlyLoading) fetchMonthly(fortuneUrl("yearFortune", "monthly"), "monthly");
  }

  function domainText(relation: CompatibilityResult["relation"], domain: YearDomain): string {
    const r = yearContent.relations[relation];
    return domain === "overview" ? r.overview : r[domain];
  }

  useEffect(() => {
    if (!revealed) return;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduceMotion) => {
        if (cancelled) return;
        if (reduceMotion) {
          sectionAnims.forEach((anim) => anim.setValue(1));
          return;
        }
        Animated.stagger(
          80,
          sectionAnims.map((anim) => Animated.timing(anim, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true })),
        ).start();
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  function sectionStyle(index: number) {
    const anim = sectionAnims[index];
    return {
      opacity: anim,
      transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
    };
  }

  function handleSealPressIn() {
    Animated.spring(sealScale, { toValue: 0.97, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  }
  function handleSealPressOut() {
    Animated.spring(sealScale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  }

  function handleOpenDaily() {
    if (!daily) return;
    setRevealed(true);
    markFortuneOpened(daily.date)
      .then(setStreak)
      .catch(() => {});
  }

  async function handleSubscribe() {
    if (purchasing || restoring) return;
    setPurchasing(true);
    setPurchaseNotice(null);
    const outcome = await purchaseQaPro();
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      setEntitled(true);
      refreshRoutineNotification(strings).catch(() => {});
    } else if (outcome.status === "error") {
      setPurchaseNotice(strings.qa.purchaseErrorDefault);
    }
  }

  async function handleRestore() {
    if (purchasing || restoring) return;
    setRestoring(true);
    setPurchaseNotice(null);
    const restored = await restoreQaPro();
    if (!mountedRef.current) return;
    setRestoring(false);
    if (restored) {
      setEntitled(true);
      refreshRoutineNotification(strings).catch(() => {});
    } else {
      setPurchaseNotice(strings.qa.restoreNotFound);
    }
  }

  if (entitled === null) {
    return (
      <SafeAreaView style={styles.root}>
        <ActivityIndicator color={COLORS.gold} style={styles.centerSpinner} />
      </SafeAreaView>
    );
  }

  if (!entitled) {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
            <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
            <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
          </Pressable>

          <View style={styles.lockedCard}>
            <Text style={styles.lockedHeading}>{strings.fortune.lockedHeading}</Text>
            <Text style={styles.lockedBody}>{strings.fortune.lockedBody}</Text>
            <Pressable style={[styles.subscribeButton, purchasing && styles.buttonDisabled]} disabled={purchasing || restoring} onPress={handleSubscribe}>
              <Text style={styles.subscribeButtonText}>
                {purchasing ? strings.qa.subscribing : `${strings.qa.subscribeButton} · ${strings.qa.subscriptionPriceLabel}`}
              </Text>
            </Pressable>
            <Pressable style={styles.restoreLink} disabled={purchasing || restoring} onPress={handleRestore}>
              <Text style={styles.restoreLinkText}>{restoring ? strings.qa.restoring : strings.qa.restoreButton}</Text>
            </Pressable>
            <Text style={styles.renewNote}>{strings.fortune.autoRenewNote}</Text>
            <View style={styles.legalRow}>
              <Pressable onPress={() => Linking.openURL(`${API_BASE_URL}/terms`)} accessibilityRole="link" style={styles.legalLink}>
                <Text style={styles.legalLinkText}>{strings.fortune.termsLink}</Text>
              </Pressable>
              <Pressable onPress={() => Linking.openURL(`${API_BASE_URL}/privacy`)} accessibilityRole="link" style={styles.legalLink}>
                <Text style={styles.legalLinkText}>{strings.fortune.privacyLink}</Text>
              </Pressable>
            </View>
            {purchaseNotice && <Text style={styles.noticeText}>{purchaseNotice}</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const weeklyWithScore = (weekly ?? []).filter((d) => d.compatibility);
  const weeklyBest = weeklyWithScore.length ? pickExtreme(weeklyWithScore, "max") : null;
  const weeklyCaution = weeklyWithScore.length ? pickExtreme(weeklyWithScore, "min") : null;

  // 이미 지난 날짜는 목록엔 그대로 보여주되(이번 달 전체 흐름을 보여주는 게
  // 목적), "가장 좋은 날/조절이 필요한 날" 하이라이트는 앞으로 남은 날짜
  // 중에서만 고른다 — 지난 날짜를 추천해봐야 쓸모가 없다.
  const monthWithScore = (monthDays ?? []).filter((d) => d.compatibility);
  const monthUpcoming = daily ? monthWithScore.filter((d) => d.date >= daily.date) : monthWithScore;
  const monthPool = monthUpcoming.length ? monthUpcoming : monthWithScore;
  const monthBest = monthPool.length ? pickExtreme(monthPool, "max") : null;
  const monthCaution = monthPool.length ? pickExtreme(monthPool, "min") : null;

  const dailyOverview = daily?.compatibility ? getOverview(content, daily.compatibility.relation, daily.dayMaster.pillarIndex) : null;

  // 오늘의 행운 포인트 — 그날의 오행 하나로만 정해지는 값이라 relation과 무관.
  const todayElementKey = daily?.compatibility?.otherDayMasterElement;
  const luckyPoint = todayElementKey ? (LUCKY_POINTS[locale] ?? LUCKY_POINTS.ko)[todayElementKey] : null;
  const luckyNumber = todayElementKey ? LUCKY_NUMBERS[todayElementKey] : null;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading}>{strings.fortune.headerLabel}</Text>

        <View style={styles.tabRow}>
          <Pressable style={[styles.tabButton, tab === "daily" && styles.tabButtonActive]} onPress={() => handleSelectTab("daily")} accessibilityRole="tab" accessibilityState={{ selected: tab === "daily" }}>
            <Text style={[styles.tabLabel, tab === "daily" && styles.tabLabelActive]}>{strings.fortune.dailyTab}</Text>
          </Pressable>
          <Pressable style={[styles.tabButton, tab === "weekly" && styles.tabButtonActive]} onPress={() => handleSelectTab("weekly")} accessibilityRole="tab" accessibilityState={{ selected: tab === "weekly" }}>
            <Text style={[styles.tabLabel, tab === "weekly" && styles.tabLabelActive]}>{strings.fortune.weeklyTab}</Text>
          </Pressable>
          <Pressable style={[styles.tabButton, tab === "month" && styles.tabButtonActive]} onPress={() => handleSelectTab("month")} accessibilityRole="tab" accessibilityState={{ selected: tab === "month" }}>
            <Text style={[styles.tabLabel, tab === "month" && styles.tabLabelActive]}>{strings.fortune.monthTab}</Text>
          </Pressable>
          <Pressable style={[styles.tabButton, tab === "yearly" && styles.tabButtonActive]} onPress={() => handleSelectTab("yearly")} accessibilityRole="tab" accessibilityState={{ selected: tab === "yearly" }}>
            <Text style={[styles.tabLabel, tab === "yearly" && styles.tabLabelActive]}>{strings.fortune.yearlyTab}</Text>
          </Pressable>
        </View>

        {!selfDayMasterChar && <Text style={styles.errorText}>{strings.fortune.loadErrorText}</Text>}

        {tab === "daily" && dailyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
        {tab === "daily" && !dailyLoading && dailyError && <ErrorNotice text={dailyError} retryLabel={strings.common.retryLabel} onRetry={retryDaily} />}

        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && !revealed && (
          <Pressable onPress={handleOpenDaily} onPressIn={handleSealPressIn} onPressOut={handleSealPressOut}>
            <Animated.View style={[styles.sealCard, { transform: [{ scale: sealScale }] }]}>
              <View style={styles.sealIconRing}>
                <Sparkles size={20} strokeWidth={1.75} color={COLORS.gold} />
              </View>
              <Text style={styles.sealHeading}>{strings.fortune.sealHeading}</Text>
              <Text style={styles.sealBody}>{strings.fortune.sealBody}</Text>
              <View style={styles.sealButton}>
                <Text style={styles.sealButtonLabel}>{strings.fortune.sealButtonLabel}</Text>
              </View>
              {streak > 0 && <Text style={styles.streakContinueText}>{strings.fortune.streakContinue(streak)}</Text>}
            </Animated.View>
          </Pressable>
        )}

        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && revealed && (
          <>
            <Animated.View style={[styles.scoreCard, sectionStyle(0), { borderColor: `${ELEMENT_COLORS[daily.compatibility.otherDayMasterElement] ?? COLORS.gold}55` }]}>
              <Text style={styles.scoreLabel}>{strings.fortune.scoreLabel}</Text>
              <Text style={styles.rhythmValue}>{strings.fortune.rhythmNames[daily.compatibility.relation]}</Text>
              {streak > 1 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakBadgeText}>{strings.fortune.streakBadge(streak)}</Text>
                </View>
              )}
            </Animated.View>

            <Animated.View style={[styles.sectionCard, sectionStyle(1)]}>
              <Text style={styles.sectionLabel}>{strings.fortune.overviewLabel}</Text>
              <Text style={styles.sectionHeadline}>{dailyOverview?.headline}</Text>
              <Text style={styles.sectionBody}>{dailyOverview?.body}</Text>
            </Animated.View>

            <Animated.View style={[styles.sectionCard, sectionStyle(2)]}>
              <Text style={styles.sectionLabel}>{strings.fortune.wealthLabel}</Text>
              <Text style={styles.sectionBody}>{content.relations[daily.compatibility.relation].wealth}</Text>
            </Animated.View>

            <Animated.View style={[styles.sectionCard, sectionStyle(3)]}>
              <Text style={styles.sectionLabel}>{strings.fortune.loveLabel}</Text>
              <Text style={styles.sectionBody}>{content.relations[daily.compatibility.relation].love}</Text>
            </Animated.View>

            <Animated.View style={[styles.sectionCard, sectionStyle(4)]}>
              <Text style={styles.sectionLabel}>{strings.fortune.healthLabel}</Text>
              <Text style={styles.sectionBody}>{content.relations[daily.compatibility.relation].health}</Text>
            </Animated.View>

            <Animated.View style={[styles.sectionCard, sectionStyle(5)]}>
              <Text style={styles.sectionLabel}>{strings.fortune.lifeStageLabel}</Text>
              <Text style={styles.sectionHeadline}>{stagesContent.lifeStages[daily.lifeStageIndex]?.name}</Text>
              <Text style={styles.sectionBody}>{stagesContent.lifeStages[daily.lifeStageIndex]?.body}</Text>
            </Animated.View>

            {daily.sinsalIndex !== null && (
              <Animated.View style={[styles.sectionCard, sectionStyle(6)]}>
                <Text style={styles.sectionLabel}>{strings.fortune.sinsalLabel}</Text>
                <Text style={styles.sectionHeadline}>{stagesContent.sinsal[daily.sinsalIndex]?.name}</Text>
                <Text style={styles.sectionBody}>{stagesContent.sinsal[daily.sinsalIndex]?.body}</Text>
              </Animated.View>
            )}

            {luckyPoint && luckyNumber && (
              <Animated.View style={[styles.sectionCard, sectionStyle(7)]}>
                <Text style={styles.sectionLabel}>{strings.fortune.luckyPointLabel}</Text>
                <View style={styles.luckyRow}>
                  <View style={styles.luckyItem}>
                    <Text style={styles.luckyItemLabel}>{strings.fortune.luckyColorLabel}</Text>
                    <Text style={styles.luckyItemValue}>{luckyPoint.color}</Text>
                  </View>
                  <View style={styles.luckyItem}>
                    <Text style={styles.luckyItemLabel}>{strings.fortune.luckyNumberLabel}</Text>
                    <Text style={styles.luckyItemValue}>{luckyNumber}</Text>
                  </View>
                  <View style={styles.luckyItem}>
                    <Text style={styles.luckyItemLabel}>{strings.fortune.luckyDirectionLabel}</Text>
                    <Text style={styles.luckyItemValue}>{luckyPoint.direction}</Text>
                  </View>
                </View>
              </Animated.View>
            )}
          </>
        )}

        {tab === "weekly" && weeklyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
        {tab === "weekly" && !weeklyLoading && weeklyError && <ErrorNotice text={weeklyError} retryLabel={strings.common.retryLabel} onRetry={retryWeekly} />}
        {tab === "weekly" && !weeklyLoading && !weeklyError && weekly && !weeklyBest && (
          <Text style={styles.errorText}>{strings.fortune.loadErrorText}</Text>
        )}
        {tab === "weekly" && !weeklyLoading && !weeklyError && weeklyBest && weeklyCaution && (
          <>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightLabel}>{strings.fortune.weeklyBestDayLabel}</Text>
              <Text style={styles.highlightDate}>{formatShortDate(weeklyBest.date, locale)}</Text>
              <Text style={styles.highlightHeadline}>{getOverview(content, weeklyBest.compatibility!.relation, weeklyBest.dayMaster.pillarIndex).headline}</Text>
            </View>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightLabel}>{strings.fortune.weeklyCautionDayLabel}</Text>
              <Text style={styles.highlightDate}>{formatShortDate(weeklyCaution.date, locale)}</Text>
              <Text style={styles.highlightHeadline}>{getOverview(content, weeklyCaution.compatibility!.relation, weeklyCaution.dayMaster.pillarIndex).headline}</Text>
            </View>
            <View style={styles.weekList}>
              {weeklyWithScore.map((d) => (
                <View key={d.date} style={styles.weekRow}>
                  <Text style={styles.weekRowDate}>{formatShortDate(d.date, locale)}</Text>
                  <Text style={styles.weekRowHeadline} numberOfLines={1}>
                    {getOverview(content, d.compatibility!.relation, d.dayMaster.pillarIndex).headline}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {tab === "month" && monthDaysLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
        {tab === "month" && !monthDaysLoading && monthDaysError && <ErrorNotice text={monthDaysError} retryLabel={strings.common.retryLabel} onRetry={retryMonthDays} />}
        {tab === "month" && !monthDaysLoading && !monthDaysError && monthDays && !monthBest && (
          <Text style={styles.errorText}>{strings.fortune.loadErrorText}</Text>
        )}
        {tab === "month" && !monthDaysLoading && !monthDaysError && monthBest && monthCaution && (
          <>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightLabel}>{strings.fortune.monthBestDayLabel}</Text>
              <Text style={styles.highlightDate}>{formatShortDate(monthBest.date, locale)}</Text>
              <Text style={styles.highlightHeadline}>{getOverview(content, monthBest.compatibility!.relation, monthBest.dayMaster.pillarIndex).headline}</Text>
            </View>
            {/* Late in the month only a day or two are left, so best and pace-yourself can be the
                same date — showing it twice under opposite labels is contradictory. */}
            {monthCaution.date !== monthBest.date && (
            <View style={styles.highlightCard}>
              <Text style={styles.highlightLabel}>{strings.fortune.monthCautionDayLabel}</Text>
              <Text style={styles.highlightDate}>{formatShortDate(monthCaution.date, locale)}</Text>
              <Text style={styles.highlightHeadline}>{getOverview(content, monthCaution.compatibility!.relation, monthCaution.dayMaster.pillarIndex).headline}</Text>
            </View>
            )}
            <View style={styles.weekList}>
              {monthWithScore.map((d) => {
                const isToday = daily?.date === d.date;
                return (
                  <View key={d.date} style={[styles.weekRow, isToday && styles.weekRowToday]}>
                    <Text style={styles.weekRowDate}>{formatShortDate(d.date, locale)}</Text>
                    <Text style={styles.weekRowHeadline} numberOfLines={1}>
                      {getOverview(content, d.compatibility!.relation, d.dayMaster.pillarIndex).headline}
                    </Text>
                    {isToday && (
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>{strings.fortune.todayBadge}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        )}

        {tab === "yearly" && yearlyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
        {tab === "yearly" && !yearlyLoading && yearlyError && <ErrorNotice text={yearlyError} retryLabel={strings.common.retryLabel} onRetry={retryYearly} />}
        {tab === "yearly" && !yearlyLoading && !yearlyError && yearly?.compatibility && (
          <>
            <View style={[styles.scoreCard, { borderColor: `${ELEMENT_COLORS[yearly.compatibility.otherDayMasterElement] ?? COLORS.gold}55` }]}>
              <Text style={styles.scoreLabel}>{strings.fortune.yearHeading(yearly.year)}</Text>
              <Text style={styles.rhythmValue}>{strings.fortune.rhythmNames[yearly.compatibility.relation]}</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionLabel}>{strings.fortune.overviewLabel}</Text>
              <Text style={styles.sectionHeadline}>{yearContent.relations[yearly.compatibility.relation].headline}</Text>
              <Text style={styles.sectionBody}>{yearContent.relations[yearly.compatibility.relation].overview}</Text>
            </View>

            {yearly.branchRelation !== "none" && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionBody}>{yearly.branchRelation === "hap" ? yearContent.hapNote : yearContent.chungNote}</Text>
              </View>
            )}

            <View style={styles.sectionCard}>
              <Text style={styles.sectionLabel}>{strings.fortune.wealthLabel}</Text>
              <Text style={styles.sectionBody}>{yearContent.relations[yearly.compatibility.relation].wealth}</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionLabel}>{strings.fortune.loveLabel}</Text>
              <Text style={styles.sectionBody}>{yearContent.relations[yearly.compatibility.relation].love}</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionLabel}>{strings.fortune.careerLabel}</Text>
              <Text style={styles.sectionBody}>{yearContent.relations[yearly.compatibility.relation].career}</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionLabel}>{strings.fortune.studyLabel}</Text>
              <Text style={styles.sectionBody}>{yearContent.relations[yearly.compatibility.relation].study}</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionLabel}>{strings.fortune.healthLabel}</Text>
              <Text style={styles.sectionBody}>{yearContent.relations[yearly.compatibility.relation].health}</Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionLabel}>{strings.fortune.yearLifeStageLabel}</Text>
              <Text style={styles.sectionHeadline}>{stagesContent.lifeStages[yearly.lifeStageIndex]?.name}</Text>
              <Text style={styles.sectionBody}>{stagesContent.lifeStages[yearly.lifeStageIndex]?.body}</Text>
            </View>

            {yearly.sinsalIndex !== null && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionLabel}>{strings.fortune.yearSinsalLabel}</Text>
                <Text style={styles.sectionHeadline}>{stagesContent.sinsal[yearly.sinsalIndex]?.name}</Text>
                <Text style={styles.sectionBody}>{stagesContent.sinsal[yearly.sinsalIndex]?.body}</Text>
              </View>
            )}
          </>
        )}

        {tab === "yearly" && (
          <View style={styles.monthlySection}>
            <Text style={styles.sectionLabel}>{strings.fortune.monthlyFlowLabel}</Text>

            <View style={styles.domainPickerRow}>
              {(["overview", "wealth", "love", "career", "study", "health"] as YearDomain[]).map((d) => (
                <Pressable
                  key={d}
                  style={[styles.domainChip, monthlyDomain === d && styles.domainChipActive]}
                  onPress={() => setMonthlyDomain(d)}
                >
                  <Text style={[styles.domainChipLabel, monthlyDomain === d && styles.domainChipLabelActive]}>
                    {d === "overview"
                      ? strings.fortune.overviewLabel
                      : d === "wealth"
                        ? strings.fortune.wealthLabel
                        : d === "love"
                          ? strings.fortune.loveLabel
                          : d === "career"
                            ? strings.fortune.careerLabel
                            : d === "study"
                              ? strings.fortune.studyLabel
                              : strings.fortune.healthLabel}
                  </Text>
                </Pressable>
              ))}
            </View>

            {monthlyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
            {!monthlyLoading && monthlyError && <ErrorNotice text={monthlyError} retryLabel={strings.common.retryLabel} onRetry={retryMonthly} />}
            {!monthlyLoading && !monthlyError && monthly && (
              <View style={styles.weekList}>
                {monthly
                  .filter((m) => m.compatibility)
                  .map((m) => (
                    <View key={m.monthIndex} style={styles.monthRow}>
                      <View style={styles.monthRowHeader}>
                        <Text style={styles.monthRowDate}>
                          {m.calendarYear}.{String(m.calendarMonth).padStart(2, "0")}
                        </Text>
                        <View style={styles.monthRowRight}>
                          {m.branchRelation !== "none" && (
                            <View style={[styles.branchBadge, m.branchRelation === "hap" ? styles.branchBadgeHap : styles.branchBadgeChung]}>
                              <Text style={styles.branchBadgeText}>{m.branchRelation === "hap" ? strings.fortune.hapBadge : strings.fortune.chungBadge}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <Text style={styles.monthRowText} numberOfLines={2}>
                        {domainText(m.compatibility!.relation, monthlyDomain)}
                      </Text>
                    </View>
                  ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  centerSpinner: { flex: 1, justifyContent: "center" },
  sectionSpinner: { marginTop: 32 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12 },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline, marginBottom: 16 },
  lockedCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 22,
    marginTop: 8,
    gap: 10,
  },
  lockedHeading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 22, color: COLORS.headline },
  lockedBody: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginBottom: 8 },
  subscribeButton: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 15, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  subscribeButtonText: { fontFamily: "Manrope_600SemiBold", fontSize: 14.5, color: COLORS.ctaText },
  restoreLink: { alignItems: "center", justifyContent: "center", minHeight: 44 },
  renewNote: { fontFamily: "Manrope_400Regular", fontSize: 12, lineHeight: 18, color: COLORS.subheadline, textAlign: "center" },
  legalRow: { flexDirection: "row", justifyContent: "center", gap: 20 },
  legalLink: { minHeight: 44, justifyContent: "center" },
  legalLinkText: { fontFamily: "Manrope_500Medium", fontSize: 12, color: COLORS.subheadline, textDecorationLine: "underline" },
  restoreLinkText: { fontFamily: "Manrope_500Medium", fontSize: 12.5, color: COLORS.subheadline },
  noticeText: { fontFamily: "Manrope_400Regular", fontSize: 12, color: "#E0A296", textAlign: "center" },
  tabRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabButtonActive: { backgroundColor: "rgba(111,169,139,0.12)", borderColor: "rgba(111,169,139,0.4)" },
  tabLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.subheadline },
  tabLabelActive: { color: COLORS.gold },
  // #E0A296 (was #CB6249, 4.3:1) — the same soft coral as noticeText, 7:1 on the background.
  errorText: { fontFamily: "Manrope_400Regular", fontSize: 13, color: "#E0A296", marginTop: 20 },
  errorBlock: { marginTop: 20, alignItems: "flex-start" },
  errorBlockText: { fontFamily: "Manrope_400Regular", fontSize: 13, color: "#E0A296" },
  retryButton: { minHeight: 44, justifyContent: "center" },
  retryLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.gold },
  sealCard: {
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.35)",
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 24,
    marginTop: 12,
    gap: 8,
  },
  sealIconRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(111,169,139,0.1)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.3)",
    marginBottom: 6,
  },
  sealHeading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 20, color: COLORS.headline, textAlign: "center" },
  sealBody: { fontFamily: "Manrope_400Regular", fontSize: 13, lineHeight: 20, color: COLORS.subheadline, textAlign: "center", marginBottom: 10 },
  sealButton: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 22 },
  sealButtonLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.ctaText },
  streakContinueText: { fontFamily: "Manrope_500Medium", fontSize: 12, color: COLORS.gold, marginTop: 4 },
  streakBadge: {
    marginTop: 10,
    backgroundColor: "rgba(111,169,139,0.1)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.3)",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  streakBadgeText: { fontFamily: "Manrope_600SemiBold", fontSize: 11.5, color: COLORS.gold },
  scoreCard: {
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    gap: 4,
  },
  scoreLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12.5, color: COLORS.subheadline, letterSpacing: 0.3 },
  rhythmValue: { fontFamily: "CormorantGaramond_500Medium", fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center", marginTop: 4 },
  sectionCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 18,
    marginTop: 14,
  },
  sectionLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 11, letterSpacing: 1.5, color: COLORS.gold, textTransform: "uppercase" },
  sectionHeadline: { fontFamily: "Manrope_600SemiBold", fontSize: 16, color: COLORS.headline, marginTop: 8 },
  sectionBody: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginTop: 8 },
  luckyRow: { flexDirection: "row", marginTop: 12, gap: 8 },
  luckyItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    paddingVertical: 12,
    gap: 4,
  },
  luckyItemLabel: { fontFamily: "Manrope_400Regular", fontSize: 11.5, color: COLORS.subheadline },
  luckyItemValue: { fontFamily: "Manrope_600SemiBold", fontSize: 14, color: COLORS.headline },
  highlightCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  highlightLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 11, letterSpacing: 1, color: COLORS.gold, textTransform: "uppercase" },
  highlightDate: { fontFamily: "Manrope_600SemiBold", fontSize: 15, color: COLORS.headline, marginTop: 6 },
  highlightHeadline: { fontFamily: "Manrope_400Regular", fontSize: 13.5, color: COLORS.subheadline, marginTop: 4 },
  weekList: { marginTop: 8, gap: 8 },
  weekRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  weekRowDate: { fontFamily: "Manrope_500Medium", fontSize: 12.5, color: COLORS.headline, width: 78 },
  weekRowHeadline: { fontFamily: "Manrope_400Regular", fontSize: 12.5, color: COLORS.subheadline, flex: 1 },
  weekRowToday: { borderColor: "rgba(111,169,139,0.45)", backgroundColor: "rgba(111,169,139,0.06)" },
  todayBadge: {
    backgroundColor: "rgba(111,169,139,0.14)",
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  todayBadgeText: { fontFamily: "Manrope_700Bold", fontSize: 11, color: COLORS.headline },
  monthlySection: { marginTop: 22 },
  domainPickerRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10, marginBottom: 14 },
  domainChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  domainChipActive: { backgroundColor: "rgba(111,169,139,0.14)", borderColor: "rgba(111,169,139,0.4)" },
  domainChipLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 11.5, color: COLORS.subheadline },
  domainChipLabelActive: { color: COLORS.gold },
  monthRow: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  monthRowHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  monthRowDate: { fontFamily: "Manrope_600SemiBold", fontSize: 12.5, color: COLORS.headline },
  monthRowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  monthRowText: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline },
  branchBadge: { borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 },
  branchBadgeHap: { backgroundColor: "rgba(111,169,139,0.15)" },
  branchBadgeChung: { borderWidth: 1, borderColor: "rgba(217,201,163,0.35)" },
  branchBadgeText: { fontFamily: "Manrope_700Bold", fontSize: 10.5, color: COLORS.headline },
});
