import { useCallback, useEffect, useRef, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Check from "lucide-react-native/icons/check";
import ChevronDown from "lucide-react-native/icons/chevron-down";
import ChevronUp from "lucide-react-native/icons/chevron-up";
import Share2 from "lucide-react-native/icons/share-2";
import Sparkles from "lucide-react-native/icons/sparkles";
import { AccessibilityInfo, ActivityIndicator, Animated, Easing, Linking, Pressable, ScrollView, Share, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import type { Locale } from "../lib/i18n/types";
import { DAILY_FORTUNE_CONTENT, LUCKY_NUMBERS, LUCKY_POINTS, getOverview } from "../lib/dailyFortuneContent";
import { TWELVE_STAGES_CONTENT } from "../lib/twelveStagesContent";
import { reconciledBody } from "../lib/reconciledCards";
import { YEAR_FORTUNE_CONTENT } from "../lib/yearFortuneContent";
import type { CompatibilityResult } from "../lib/compatibility";
import { getFortuneStreak, isFortuneOpened, markFortuneOpened } from "../lib/fortuneOpenState";
import { hasQaProEntitlement, isUnavailableMessage, purchaseIssueDetail, purchaseQaPro, restoreQaPro } from "../lib/purchases";
import { useMonthlyPrice } from "../lib/useMonthlyPrice";
import { comingSajuYear } from "../lib/sajuYear";
import { refreshRoutineNotification } from "../lib/routineNotification";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// Daily content blocks that fade/slide in, one after another, once the seal card below
// is opened — the rhythm + overview hero, the by-area list, lucky points, the details.
const DAILY_SECTION_COUNT = 4;

type FortuneTab = "daily" | "weekly" | "month" | "yearly";

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

// Wealth / love / health (and career / study for the year) used to be one identical card
// each — eight same-shaped cards in a row. They are two-sentence notes, so one card with
// a row per area is easier to skim and leaves the overview as the one big block.
function AreaList({ title, items }: { title: string; items: { key: string; label: string; body: string }[] }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionLabel} accessibilityRole="header">{title}</Text>
      {items.map((item, i) => (
        <View key={item.key} style={[styles.areaRow, i > 0 && styles.rowDivider]}>
          <Text style={styles.areaLabel}>{item.label}</Text>
          <Text style={styles.areaBody}>{item.body}</Text>
        </View>
      ))}
    </View>
  );
}

// The 12-stage and 12-sinsal notes are background, not the day's headline — folded by
// default so the screen leads with the overview, opened row by row when wanted.
function DetailRow({ label, name, body, first }: { label: string; name: string; body: string; first: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={!first && styles.rowDivider}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={({ pressed }) => [styles.detailHeader, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        aria-expanded={open}
        accessibilityLabel={`${label}: ${name}`}
      >
        <View style={styles.detailHeaderText}>
          <Text style={styles.detailLabel}>{label}</Text>
          <Text style={styles.detailName}>{name}</Text>
        </View>
        {open ? <ChevronUp size={18} strokeWidth={2} color={COLORS.subheadline} /> : <ChevronDown size={18} strokeWidth={2} color={COLORS.subheadline} />}
      </Pressable>
      {open && <Text style={styles.detailBody}>{body}</Text>}
    </View>
  );
}

function DetailList({ title, items }: { title: string; items: { key: string; label: string; name: string; body: string }[] }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionLabel} accessibilityRole="header">{title}</Text>
      {items.map((item, i) => (
        <DetailRow key={item.key} label={item.label} name={item.name} body={item.body} first={i === 0} />
      ))}
    </View>
  );
}

/** Splits a long overview into short paragraphs (three sentences each) so it isn't one wall of text. */
function toParagraphs(text: string | undefined, perParagraph = 3): string {
  if (!text) return "";
  const sentences = text.split(/(?<=[.!?…。])\s+/).filter(Boolean);
  const groups: string[] = [];
  for (let i = 0; i < sentences.length; i += perParagraph) groups.push(sentences.slice(i, i + perParagraph).join(" "));
  return groups.join("\n\n");
}

/** Shares the day's overview as plain text — the first two sentences plus the app's address. */
async function shareOverview(title: string, rhythm: string, headline: string, body: string) {
  const sentences = body.split(/(?<=[.!?…。])\s+/).filter(Boolean);
  const excerpt = sentences.slice(0, 2).join(" ");
  try {
    await Share.share({ title, message: `${rhythm} · ${headline}\n\n${excerpt}\n\n${API_BASE_URL}` });
  } catch {
    // Sharing is a bonus action — a dismissed or failed sheet needs no error screen.
  }
}

export default function FortuneScreen({
  selfDayMasterChar,
  selfDayBranch,
  onOpenYearReport,
  onBack,
}: {
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  onOpenYearReport: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const content = DAILY_FORTUNE_CONTENT[locale] ?? DAILY_FORTUNE_CONTENT.ko;
  const stagesContent = TWELVE_STAGES_CONTENT[locale] ?? TWELVE_STAGES_CONTENT.ko;
  const yearContent = YEAR_FORTUNE_CONTENT[locale] ?? YEAR_FORTUNE_CONTENT.ko;

  const [entitled, setEntitled] = useState<boolean | null>(null);
  const [tab, setTab] = useState<FortuneTab>("daily");

  const { data: daily, loading: dailyLoading, error: dailyError, load: fetchDaily, retry: retryDaily } = useLazyFetch<DayFortune>(strings.fortune.loadErrorText);
  const { data: weekly, loading: weeklyLoading, error: weeklyError, load: fetchWeekly, retry: retryWeekly } = useLazyFetch<DayFortune[]>(strings.fortune.loadErrorText);
  // "이달의 길흉일 캘린더" — weekly와 완전히 같은 하루치 엔진/화면 패턴을
  // 범위만 이번 달 전체로 넓힌 것 (lib/dailyFortune.ts의 getMonthFortune 참고).
  const { data: monthDays, loading: monthDaysLoading, error: monthDaysError, load: fetchMonthDays, retry: retryMonthDays } = useLazyFetch<DayFortune[]>(strings.fortune.loadErrorText);
  const { data: yearly, loading: yearlyLoading, error: yearlyError, load: fetchYearly, retry: retryYearly } = useLazyFetch<YearFortune>(strings.fortune.loadErrorText);
  const { data: monthly, loading: monthlyLoading, error: monthlyError, load: fetchMonthly, retry: retryMonthly } = useLazyFetch<MonthFortune[]>(strings.fortune.loadErrorText);
  const [monthlyDomain, setMonthlyDomain] = useState<YearDomain>("overview");

  const [purchasing, setPurchasing] = useState(false);
  const monthlyPrice = useMonthlyPrice();
  const priceLabel = monthlyPrice ? strings.qa.subscriptionPriceFor(monthlyPrice) : strings.qa.subscriptionPriceLabel;
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
    // Free users load today's reading too: they get the overview (see the free preview below).
    if (entitled === null || !selfDayMasterChar || daily || dailyLoading) return;
    (async () => {
      const result = await fetchDaily(fortuneUrl("dailyFortune", "daily"), "daily");
      if (!result || !entitled) return;
      const [opened, currentStreak] = await Promise.all([isFortuneOpened(result.date), getFortuneStreak(result.date)]);
      if (!mountedRef.current) return;
      setRevealed(opened);
      setStreak(currentStreak);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitled, selfDayMasterChar, selfDayBranch]);

  function handleSelectTab(next: FortuneTab) {
    setTab(next);
    if (!selfDayMasterChar) return;
    if (next === "weekly" && !weekly && !weeklyLoading) fetchWeekly(fortuneUrl("dailyFortune", "weekly"), "weekly");
    if (next === "month" && !monthDays && !monthDaysLoading) fetchMonthDays(fortuneUrl("dailyFortune", "month"), "month");
    if (next === "yearly" && !yearly && !yearlyLoading) fetchYearly(fortuneUrl("yearFortune"), "yearFortune");
    if (next === "yearly" && !monthly && !monthlyLoading) fetchMonthly(fortuneUrl("yearFortune", "monthly"), "monthly");
  }

  function domainLabel(domain: YearDomain): string {
    const f = strings.fortune;
    return { overview: f.overviewLabel, wealth: f.wealthLabel, love: f.loveLabel, career: f.careerLabel, study: f.studyLabel, health: f.healthLabel }[domain];
  }

  // Month rows use the month-worded copy (yearContent.monthRelations), not the whole-year
  // copy — that one says "this year" and reads wrong on a single month.
  function domainText(relation: CompatibilityResult["relation"], domain: YearDomain): string {
    const r = yearContent.monthRelations[relation];
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
      setPurchaseNotice(`${strings.qa.purchaseErrorDefault}${(isUnavailableMessage(outcome.message) ? purchaseIssueDetail(outcome.message) : outcome.message) ? `\n(${(isUnavailableMessage(outcome.message) ? purchaseIssueDetail(outcome.message) : outcome.message).slice(0, 200)})` : ""}`);
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
    // The free half of "today": the overview is open to everyone; wealth, love, health, lucky
    // points, the week, the month and the year stay with Pro.
    const freeOverview = daily?.compatibility ? getOverview(content, daily.compatibility.relation, daily.dayMaster.pillarIndex) : null;
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
            <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
            <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
          </Pressable>

          {dailyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
          {freeOverview && daily?.compatibility && (
            <View style={[styles.sectionCard, styles.freeReadingCard]}>
              <Text style={styles.sectionLabel} accessibilityRole="header">{strings.fortune.freeReadingLabel}</Text>
              <Text style={styles.rhythmValue}>{strings.fortune.rhythmNames[daily.compatibility.relation]}</Text>
              <Text style={styles.sectionHeadline}>{freeOverview.headline}</Text>
              <Text style={styles.sectionBody}>{toParagraphs(freeOverview.body)}</Text>
              <Pressable
                style={styles.shareRow}
                onPress={() => shareOverview(strings.fortune.shareOverviewTitle, strings.fortune.rhythmNames[daily.compatibility!.relation], freeOverview.headline, freeOverview.body)}
                accessibilityRole="button"
                accessibilityLabel={strings.fortune.shareOverviewButton}
              >
                <Share2 size={16} strokeWidth={1.75} color={COLORS.gold} />
                <Text style={styles.shareLabel}>{strings.fortune.shareOverviewButton}</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.lockedCard}>
            <Text style={styles.lockedHeading} accessibilityRole="header">{strings.fortune.lockedHeading}</Text>
            <Text style={styles.lockedBody}>{strings.fortune.lockedBody}</Text>
            <View style={styles.benefitList}>
              {strings.fortune.lockedBenefits.map((benefit) => (
                <View key={benefit.title} style={styles.benefitRow}>
                  <Check size={16} strokeWidth={2.25} color={COLORS.gold} style={styles.benefitCheck} />
                  <View style={styles.benefitText}>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    <Text style={styles.benefitBody}>{benefit.body}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Pressable style={[styles.subscribeButton, purchasing && styles.buttonDisabled]} disabled={purchasing || restoring} onPress={handleSubscribe}>
              <Text style={styles.subscribeButtonText}>
                {purchasing ? strings.qa.subscribing : `${strings.qa.subscribeButton} · ${priceLabel}`}
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
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading} accessibilityRole="header">{strings.fortune.tabHeadings[tab]}</Text>

        <View style={styles.tabRow} accessibilityRole="tablist">
          {(["daily", "weekly", "month", "yearly"] as FortuneTab[]).map((t) => (
            <Pressable
              key={t}
              style={[styles.tabButton, tab === t && styles.tabButtonActive]}
              onPress={() => handleSelectTab(t)}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === t }}
              aria-selected={tab === t}
            >
              <Text style={[styles.tabLabel, tab === t && styles.tabLabelActive]} numberOfLines={1} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                {t === "daily" ? strings.fortune.dailyTab : t === "weekly" ? strings.fortune.weeklyTab : t === "month" ? strings.fortune.monthTab : strings.fortune.yearlyTab}
              </Text>
            </Pressable>
          ))}
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
            {/* The overview is the day's one big block: rhythm name and overview share a card
                instead of a score card followed by an overview card of the same weight. */}
            <Animated.View style={[styles.heroCard, sectionStyle(0), { borderColor: `${ELEMENT_COLORS[daily.compatibility.otherDayMasterElement] ?? COLORS.gold}55` }]}>
              <Text style={styles.heroKicker}>{strings.fortune.scoreLabel}</Text>
              <Text style={styles.heroRhythm} accessibilityRole="header">{strings.fortune.rhythmNames[daily.compatibility.relation]}</Text>
              {streak > 1 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakBadgeText}>{strings.fortune.streakBadge(streak)}</Text>
                </View>
              )}
              <View style={styles.heroDivider} />
              <Text style={styles.heroHeadline}>{dailyOverview?.headline}</Text>
              <Text style={styles.sectionBody}>{toParagraphs(dailyOverview?.body)}</Text>
              {!!dailyOverview && (
                <Pressable
                  style={styles.shareRow}
                  onPress={() => shareOverview(strings.fortune.shareOverviewTitle, strings.fortune.rhythmNames[daily.compatibility!.relation], dailyOverview.headline, dailyOverview.body)}
                  accessibilityRole="button"
                  accessibilityLabel={strings.fortune.shareOverviewButton}
                >
                  <Share2 size={16} strokeWidth={1.75} color={COLORS.gold} />
                  <Text style={styles.shareLabel}>{strings.fortune.shareOverviewButton}</Text>
                </Pressable>
              )}
            </Animated.View>

            <Animated.View style={sectionStyle(1)}>
              <AreaList
                title={strings.fortune.areasLabel}
                items={[
                  { key: "wealth", label: strings.fortune.wealthLabel, body: content.relations[daily.compatibility.relation].wealth },
                  { key: "love", label: strings.fortune.loveLabel, body: content.relations[daily.compatibility.relation].love },
                  { key: "health", label: strings.fortune.healthLabel, body: content.relations[daily.compatibility.relation].health },
                ]}
              />
            </Animated.View>

            {luckyPoint && luckyNumber && (
              <Animated.View style={[styles.sectionCard, sectionStyle(2)]}>
                <Text style={styles.sectionLabel} accessibilityRole="header">{strings.fortune.luckyPointLabel}</Text>
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

            <Animated.View style={sectionStyle(3)}>
              <DetailList
                title={strings.fortune.detailsLabel}
                items={[
                  {
                    key: "stage",
                    label: strings.fortune.lifeStageLabel,
                    name: stagesContent.lifeStages[daily.lifeStageIndex]?.name ?? "",
                    body: reconciledBody(locale, "stage", daily.lifeStageIndex, daily.compatibility.relation) ?? stagesContent.lifeStages[daily.lifeStageIndex]?.body ?? "",
                  },
                  ...(daily.sinsalIndex !== null
                    ? [
                        {
                          key: "sinsal",
                          label: strings.fortune.sinsalLabel,
                          name: stagesContent.sinsal[daily.sinsalIndex]?.name ?? "",
                          body: reconciledBody(locale, "sinsal", daily.sinsalIndex, daily.compatibility.relation) ?? stagesContent.sinsal[daily.sinsalIndex]?.body ?? "",
                        },
                      ]
                    : []),
                ]}
              />
            </Animated.View>
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

        {tab === "yearly" && (
          // The paid deep read of this same year (a separate one-time purchase, not part of
          // the subscription) — the natural next step from the year tab.
          <Pressable style={styles.yearReportCard} onPress={onOpenYearReport} accessibilityRole="button">
            <View style={styles.yearReportText}>
              <Text style={styles.yearReportTitle}>{strings.yearReport.tabCardTitle(yearly?.year ?? comingSajuYear())}</Text>
              <Text style={styles.yearReportBody}>{strings.yearReport.tabCardBody}</Text>
              <Text style={styles.yearReportCta}>{strings.yearReport.tabCardCta}</Text>
            </View>
          </Pressable>
        )}

        {tab === "yearly" && yearlyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
        {tab === "yearly" && !yearlyLoading && yearlyError && <ErrorNotice text={yearlyError} retryLabel={strings.common.retryLabel} onRetry={retryYearly} />}
        {tab === "yearly" && !yearlyLoading && !yearlyError && yearly?.compatibility && (
          <>
            <View style={[styles.heroCard, { borderColor: `${ELEMENT_COLORS[yearly.compatibility.otherDayMasterElement] ?? COLORS.gold}55` }]}>
              <Text style={styles.heroKicker}>{strings.fortune.yearHeading(yearly.year)}</Text>
              <Text style={styles.heroRhythm} accessibilityRole="header">{strings.fortune.rhythmNames[yearly.compatibility.relation]}</Text>
              <View style={styles.heroDivider} />
              <Text style={styles.heroHeadline}>{yearContent.relations[yearly.compatibility.relation].headline}</Text>
              <Text style={styles.sectionBody}>{toParagraphs(yearContent.relations[yearly.compatibility.relation].overview)}</Text>
              {yearly.branchRelation !== "none" && (
                <Text style={styles.heroNote}>{yearly.branchRelation === "hap" ? yearContent.hapNote : yearContent.chungNote}</Text>
              )}
            </View>

            <AreaList
              title={strings.fortune.areasLabel}
              items={(["wealth", "love", "career", "study", "health"] as const).map((d) => ({
                key: d,
                label: domainLabel(d),
                body: yearContent.relations[yearly.compatibility!.relation][d],
              }))}
            />

            <DetailList
              title={strings.fortune.yearDetailsLabel}
              items={[
                {
                  key: "stage",
                  label: strings.fortune.yearLifeStageLabel,
                  name: stagesContent.lifeStages[yearly.lifeStageIndex]?.name ?? "",
                  body: stagesContent.yearLifeStageBodies[yearly.lifeStageIndex] ?? "",
                },
                ...(yearly.sinsalIndex !== null
                  ? [
                      {
                        key: "sinsal",
                        label: strings.fortune.yearSinsalLabel,
                        name: stagesContent.sinsal[yearly.sinsalIndex]?.name ?? "",
                        body: stagesContent.yearSinsalBodies[yearly.sinsalIndex] ?? "",
                      },
                    ]
                  : []),
              ]}
            />
          </>
        )}

        {tab === "yearly" && (
          <View style={styles.monthlySection}>
            <Text style={styles.sectionLabel} accessibilityRole="header">{strings.fortune.monthlyFlowLabel}</Text>

            <View style={styles.domainPickerRow}>
              {(["overview", "wealth", "love", "career", "study", "health"] as YearDomain[]).map((d) => (
                <Pressable
                  key={d}
                  style={[styles.domainChip, monthlyDomain === d && styles.domainChipActive]}
                  onPress={() => setMonthlyDomain(d)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: monthlyDomain === d }}
                  aria-pressed={monthlyDomain === d}
                >
                  <Text style={[styles.domainChipLabel, monthlyDomain === d && styles.domainChipLabelActive]}>{domainLabel(d)}</Text>
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
                          {locale === "ko"
                            ? `${m.calendarYear}.${String(m.calendarMonth).padStart(2, "0")}`
                            : `${strings.yearReport.monthName(m.calendarMonth)} ${m.calendarYear}`}
                        </Text>
                        <View style={styles.monthRowRight}>
                          {/* Each month has its own 12-stage name, so two months that share the
                              same relation copy still read differently. */}
                          <Text style={styles.monthRowStage}>{stagesContent.lifeStages[m.lifeStageIndex]?.name}</Text>
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
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline, marginBottom: 16 },
  shareRow: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start", minHeight: 44, marginTop: 6 },
  shareLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold },
  freeReadingCard: { marginBottom: 18, gap: 8 },
  lockedCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 22,
    marginTop: 8,
    gap: 10,
  },
  lockedHeading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 22, color: COLORS.headline },
  yearReportCard: { backgroundColor: "rgba(111,169,139,0.08)", borderWidth: 1, borderColor: "rgba(111,169,139,0.35)", borderRadius: 16, padding: 18, marginBottom: 14 },
  yearReportText: { gap: 6 },
  yearReportTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 20, color: COLORS.headline },
  yearReportBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline },
  yearReportCta: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold, marginTop: 4 },
  benefitList: { gap: 14, marginBottom: 10 },
  benefitRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  benefitCheck: { marginTop: 2 },
  benefitText: { flex: 1, gap: 2 },
  benefitTitle: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.headline },
  benefitBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19, color: COLORS.subheadline },
  lockedBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginBottom: 8 },
  subscribeButton: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 15, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  subscribeButtonText: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  restoreLink: { alignItems: "center", justifyContent: "center", minHeight: 44 },
  renewNote: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.subheadline, textAlign: "center" },
  legalRow: { flexDirection: "row", justifyContent: "center", gap: 20 },
  legalLink: { minHeight: 44, justifyContent: "center" },
  legalLinkText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline, textDecorationLine: "underline" },
  restoreLinkText: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline },
  noticeText: { fontFamily: FONTS.regular, fontSize: 12, color: "#E0A296", textAlign: "center" },
  // One segmented control instead of four bordered boxes; short labels so es fits.
  tabRow: {
    flexDirection: "row",
    padding: 4,
    gap: 4,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabButton: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 40, paddingHorizontal: 4, borderRadius: 9 },
  tabButtonActive: { backgroundColor: "rgba(111,169,139,0.14)" },
  tabLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.subheadline },
  tabLabelActive: { color: COLORS.gold },
  // #E0A296 (was #CB6249, 4.3:1) — the same soft coral as noticeText, 7:1 on the background.
  errorText: { fontFamily: FONTS.regular, fontSize: 13, color: "#E0A296", marginTop: 20 },
  errorBlock: { marginTop: 20, alignItems: "flex-start" },
  errorBlockText: { fontFamily: FONTS.regular, fontSize: 13, color: "#E0A296" },
  retryButton: { minHeight: 44, justifyContent: "center" },
  retryLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold },
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
  sealHeading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 20, color: COLORS.headline, textAlign: "center" },
  sealBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline, textAlign: "center", marginBottom: 10 },
  sealButton: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 22 },
  sealButtonLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.ctaText },
  streakContinueText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.gold, marginTop: 4 },
  streakBadge: {
    marginTop: 10,
    backgroundColor: "rgba(111,169,139,0.1)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.3)",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  streakBadgeText: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.gold },
  heroCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  heroKicker: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline },
  heroRhythm: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, marginTop: 6 },
  heroDivider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginTop: 18, marginBottom: 14 },
  heroHeadline: { fontFamily: FONTS.semibold, fontSize: 17, lineHeight: 24, color: COLORS.headline },
  heroNote: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline, marginTop: 14, paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: "rgba(111,169,139,0.4)" },
  rhythmValue: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center", marginTop: 4 },
  sectionCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 18,
    marginTop: 14,
  },
  sectionLabel: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.border },
  areaRow: { paddingVertical: 12, gap: 4 },
  areaLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.headline },
  areaBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline },
  detailHeader: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 56, paddingVertical: 10 },
  detailHeaderText: { flex: 1, gap: 2 },
  detailLabel: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.subheadline },
  detailName: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline },
  detailBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, paddingBottom: 12 },
  pressed: { opacity: 0.7 },
  sectionHeadline: { fontFamily: FONTS.semibold, fontSize: 16, color: COLORS.headline, marginTop: 8 },
  sectionBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginTop: 8 },
  luckyRow: { flexDirection: "row", marginTop: 12, gap: 8 },
  luckyItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    paddingVertical: 12,
    gap: 4,
  },
  luckyItemLabel: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.subheadline },
  luckyItemValue: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.headline },
  highlightCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  highlightLabel: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold },
  highlightDate: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline, marginTop: 6 },
  highlightHeadline: { fontFamily: FONTS.regular, fontSize: 13.5, color: COLORS.subheadline, marginTop: 4 },
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
  weekRowDate: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.headline, width: 78 },
  weekRowHeadline: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.subheadline, flex: 1 },
  weekRowToday: { borderColor: "rgba(111,169,139,0.45)", backgroundColor: "rgba(111,169,139,0.06)" },
  todayBadge: {
    backgroundColor: "rgba(111,169,139,0.14)",
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  todayBadgeText: { fontFamily: FONTS.bold, fontSize: 12, color: COLORS.headline },
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
  domainChipLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline },
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
  monthRowDate: { fontFamily: FONTS.semibold, fontSize: 12.5, color: COLORS.headline },
  monthRowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  monthRowStage: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline },
  monthRowText: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline },
  branchBadge: { borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 },
  branchBadgeHap: { backgroundColor: "rgba(111,169,139,0.15)" },
  branchBadgeChung: { borderWidth: 1, borderColor: "rgba(217,201,163,0.35)" },
  branchBadgeText: { fontFamily: FONTS.bold, fontSize: 12, color: COLORS.headline },
});
