import { useCallback, useEffect, useRef, useState } from "react";
import Activity from "lucide-react-native/icons/activity";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import BookOpen from "lucide-react-native/icons/book-open";
import Briefcase from "lucide-react-native/icons/briefcase";
import Check from "lucide-react-native/icons/check";
import ChevronDown from "lucide-react-native/icons/chevron-down";
import ChevronUp from "lucide-react-native/icons/chevron-up";
import Coins from "lucide-react-native/icons/coins";
import Heart from "lucide-react-native/icons/heart";
import Share2 from "lucide-react-native/icons/share-2";
import Sparkles from "lucide-react-native/icons/sparkles";
import { ActivityIndicator, Animated, Easing, Linking, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Text from "../components/AppText";
import ElementsLoader from "../components/motion/ElementsLoader";
import FrostedSurface from "../components/FrostedSurface";
import PressableScale from "../components/motion/PressableScale";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { playPurchaseSuccess } from "../components/motion/PurchaseSuccess";
import { DAILY_FORTUNE_CONTENT, LUCKY_NUMBERS, LUCKY_POINTS, getOverview } from "../lib/dailyFortuneContent";
import { TWELVE_STAGES_CONTENT } from "../lib/twelveStagesContent";
import { reconciledBody } from "../lib/reconciledCards";
import { YEAR_FORTUNE_CONTENT } from "../lib/yearFortuneContent";
import type { CompatibilityResult } from "../lib/compatibility";
import { getFortuneStreak, isFortuneOpened, markFortuneOpened } from "../lib/fortuneOpenState";
import { getRevenueCatUserId, hasQaProEntitlement, isUnavailableMessage, purchaseIssueDetail, purchaseQaPro, restoreQaPro } from "../lib/purchases";
import { useSubscriptionOffer } from "../lib/useSubscriptionOffer";
import useReducedMotion from "../lib/useReducedMotion";
import PlanPicker from "../components/PlanPicker";
import GoodDaysScreen from "./GoodDaysScreen";
import { GOOD_DAY_PURPOSES, GOOD_DAYS_CONTENT, goodDayReason, type GoodDayPurpose, type GoodDayRelation } from "../lib/goodDaysContent";
import JournalScreen from "./JournalScreen";
import JournalEntryCard from "../components/JournalEntryCard";
import { comingSajuYear } from "../lib/sajuYear";
import { formatMonthLabel, formatShortDate } from "../lib/shortDate";
import MonthGrid from "../components/MonthGrid";
import { refreshRoutineNotification } from "../lib/routineNotification";
import { COLORS } from "../theme/colors";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";
import Reveal from "../components/motion/Reveal";
import { readableColumn } from "../theme/layout";
import { FONTS, MAX_FONT_SCALE, koDisplay } from "../theme/fonts";
import { SPRING } from "../theme/motion";
import TextShareCard, { shareCardImage } from "../components/TextShareCard";
import FeedbackRow from "../components/FeedbackRow";
import ElementColorCard from "../components/ElementColorCard";
import RhythmWave, { type RhythmRelation } from "../components/art/RhythmWave";
import ArtImage from "../components/ArtImage";
import { currentSolarTermArtKey } from "../lib/currentSolarTerm";
import { elementsParam, type ElementColor } from "../lib/elementColorContent";
import { track, trackOnce } from "../lib/analytics";

// Daily content blocks that fade/slide in, one after another, once the seal card below
// is opened — the rhythm + overview hero, the by-area list, lucky points, the details.
const DAILY_SECTION_COUNT = 4;

type FortuneTab = "daily" | "weekly" | "month" | "yearly";

const TABS: FortuneTab[] = ["daily", "weekly", "month", "yearly"];

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
  /** Only on the daily payload, when the chart's element shares were sent (2026-10-06). */
  elementColor?: ElementColor;
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
      <PressableScale onPress={onRetry} style={styles.retryButton} accessibilityRole="button" haptic="none">
        <Text style={styles.retryLabel}>{retryLabel}</Text>
      </PressableScale>
    </View>
  );
}

// Wealth / love / health (and career / study for the year) used to be one identical card
// each — eight same-shaped cards in a row. They are two-sentence notes, so one card with
// a row per area is easier to skim and leaves the overview as the one big block.
function areaIconFor(key: string) {
  switch (key) {
    case "wealth":
      return Coins;
    case "love":
      return Heart;
    case "health":
      return Activity;
    case "career":
      return Briefcase;
    case "study":
      return BookOpen;
    default:
      return Sparkles;
  }
}

function AreaList({ title, items }: { title: string; items: { key: string; label: string; body: string }[] }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionLabel} accessibilityRole="header">{title}</Text>
      {items.map((item) => {
        const Icon = areaIconFor(item.key);
        return (
          <View key={item.key} style={styles.areaRow}>
            <View style={styles.areaIcon}>
              <Icon size={18} strokeWidth={2} color={COLORS.gold} />
            </View>
            <View style={styles.areaText}>
              <Text style={styles.areaLabel}>{item.label}</Text>
              <Text style={styles.areaBody}>{item.body}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

// The 12-stage and 12-sinsal notes are background, not the day's headline — folded by
// default so the screen leads with the overview, opened row by row when wanted.
function DetailRow({ label, name, body, first }: { label: string; name: string; body: string; first: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={!first && styles.rowDivider}>
      <PressableScale
        onPress={() => setOpen((v) => !v)}
        style={styles.detailHeader}
        haptic="select"
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
      </PressableScale>
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

/** Narrows a server-sent relation to what RhythmWave draws; unknown values fall back to a calm wave. */
function toRhythmRelation(value: string): RhythmRelation {
  switch (value) {
    case "mirror":
    case "selfNurturesOther":
    case "otherNurturesSelf":
    case "selfChallengesOther":
    case "otherChallengesSelf":
      return value;
    default:
      return "mirror";
  }
}

/**
 * Image share for the day's overview: a labelled preview of the card plus the share button.
 * The card carries the rhythm, the headline and the first two sentences — and on a pace-yourself
 * day only the neutral pacing copy, since the image outlives the screen.
 */
function OverviewShare({ relation, headline, body }: { relation: string; headline: string; body: string }) {
  const strings = useStrings();
  const cardRef = useRef<View>(null);
  const [sharing, setSharing] = useState(false);
  const pace = relation === "otherChallengesSelf";
  const cardHeadline = pace ? strings.fortune.paceFreeHeadline : headline;
  const cardBody = (pace ? strings.fortune.paceFreeBody : body).split(/(?<=[.!?…。])\s+/).filter(Boolean).slice(0, 2).join(" ");
  const rhythm = (strings.fortune.rhythmNames as Record<string, string>)[relation];

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    if (await shareCardImage(cardRef)) track("share", { kind: "fortune_overview" });
    setSharing(false);
  }

  return (
    <>
      <TextShareCard cardRef={cardRef} eyebrow={`${strings.fortune.shareCardEyebrow} · ${rhythm}`} headline={cardHeadline} body={cardBody} />
      <PressableScale
        style={styles.shareRow}
        onPress={handleShare}
        disabled={sharing}
        accessibilityRole="button"
        accessibilityLabel={strings.fortune.shareOverviewButton}
        accessibilityState={{ disabled: sharing }}
      >
        <Share2 size={16} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={styles.shareLabel}>{strings.fortune.shareOverviewButton}</Text>
      </PressableScale>
    </>
  );
}

export default function FortuneScreen({
  selfDayMasterChar,
  selfDayBranch,
  elements,
  onOpenYearReport,
  onBack,
}: {
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  /** The chart's element shares, for today's element color. */
  elements?: Record<string, number> | null;
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
  const reduceMotion = useReducedMotion();
  const [tabRowWidth, setTabRowWidth] = useState(0);
  const tabIndicatorX = useSharedValue(0);
  const tabIndex = TABS.indexOf(tab);
  const tabIndicatorStyle = useAnimatedStyle(() => ({ transform: [{ translateX: tabIndicatorX.value }] }));

  // The tab indicator glides between tabs on a spring; with Reduce Motion it jumps instantly.
  useEffect(() => {
    const target = tabRowWidth > 0 ? tabIndex * ((tabRowWidth - 8) / 4) : 0;
    tabIndicatorX.value = reduceMotion ? withTiming(target, { duration: 0 }) : withSpring(target, SPRING.gentle);
  }, [tabIndex, tabRowWidth, reduceMotion, tabIndicatorX]);

  const { data: daily, loading: dailyLoading, error: dailyError, load: fetchDaily, retry: retryDaily } = useLazyFetch<DayFortune>(strings.fortune.loadErrorText);
  const { data: weekly, loading: weeklyLoading, error: weeklyError, load: fetchWeekly, retry: retryWeekly } = useLazyFetch<DayFortune[]>(strings.fortune.loadErrorText);
  // "이달의 길흉일 캘린더" — weekly와 완전히 같은 하루치 엔진/화면 패턴을
  // 범위만 이번 달 전체로 넓힌 것 (lib/dailyFortune.ts의 getMonthFortune 참고).
  const { data: monthDays, loading: monthDaysLoading, error: monthDaysError, load: fetchMonthDays, retry: retryMonthDays } = useLazyFetch<DayFortune[]>(strings.fortune.loadErrorText);
  const { data: yearly, loading: yearlyLoading, error: yearlyError, load: fetchYearly, retry: retryYearly } = useLazyFetch<YearFortune>(strings.fortune.loadErrorText);
  const { data: monthly, loading: monthlyLoading, error: monthlyError, load: fetchMonthly, retry: retryMonthly } = useLazyFetch<MonthFortune[]>(strings.fortune.loadErrorText);
  const [monthlyDomain, setMonthlyDomain] = useState<YearDomain>("overview");
  const [showGoodDays, setShowGoodDays] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [selectedMonthDate, setSelectedMonthDate] = useState<string | null>(null);
  // 이달 달력의 목적 칩: 한 번에 하나, 칩을 누를 때만 /api/goodDays(scope "month")를 부르고
  // 받은 결과는 화면이 떠 있는 동안 보관한다(같은 칩 재선택은 재호출 없음).
  type CalendarGoodDay = { date: string; relation: GoodDayRelation };
  const [calPurpose, setCalPurpose] = useState<GoodDayPurpose | null>(null);
  const [calResults, setCalResults] = useState<Partial<Record<GoodDayPurpose, CalendarGoodDay[]>>>({});
  const [calLoading, setCalLoading] = useState(false);
  const [calError, setCalError] = useState<string | null>(null);
  const calRequestRef = useRef(0);

  const [purchasing, setPurchasing] = useState(false);
  const offer = useSubscriptionOffer();
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
    const elementsValue = path === "dailyFortune" && mode === "daily" ? elementsParam(elements) : null;
    if (elementsValue) params.set("elements", elementsValue);
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

  useEffect(() => {
    if (entitled === false) track("paywall_view", { surface: "fortune" });
  }, [entitled]);

  // First time today's reading is actually on screen on this device: free users see the
  // overview as soon as it loads, subscribers after they open the seal.
  useEffect(() => {
    if (!daily?.compatibility || entitled === null) return;
    if (entitled && !revealed) return;
    trackOnce("fortune_first_view", { kind: entitled ? "pro" : "free" });
  }, [daily, entitled, revealed]);

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
    if (reduceMotion) {
      sectionAnims.forEach((anim) => anim.setValue(1));
      return;
    }
    const run = Animated.stagger(
      80,
      sectionAnims.map((anim) => Animated.timing(anim, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true })),
    );
    run.start();
    return () => run.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, reduceMotion]);

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
    const outcome = await purchaseQaPro(offer.selectedId);
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      playPurchaseSuccess();
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

  // "한 줄 저널" — free and subscribed users both keep the journal; the month report inside checks the subscription.
  if (showJournal && selfDayMasterChar && daily) {
    return (
      <JournalScreen
        selfDayMasterChar={selfDayMasterChar}
        selfDayBranch={selfDayBranch}
        todayIso={daily.date}
        entitled={!!entitled}
        onBack={() => setShowJournal(false)}
      />
    );
  }

  if (!entitled) {
    // The free half of "today": the overview is open to everyone; wealth, love, health, lucky
    // points, the week, the month and the year stay with Pro.
    // On a pace-yourself day the full overview stays with Pro, so a warning-toned reading never
    // sits directly above the subscribe card (pressure rule); free users get a neutral pacing line.
    const freeOverview = !daily?.compatibility
      ? null
      : daily.compatibility.relation === "otherChallengesSelf"
        ? { headline: strings.fortune.paceFreeHeadline, body: strings.fortune.paceFreeBody }
        : getOverview(content, daily.compatibility.relation, daily.dayMaster.pillarIndex);
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
            <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
            <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
          </PressableScale>

          {dailyLoading && <ElementsLoader size="medium" style={styles.sectionSpinner} />}
          {freeOverview && daily?.compatibility && (
            <View style={[styles.sectionCard, styles.freeReadingCard]}>
              <Text style={styles.sectionLabel} accessibilityRole="header">{strings.fortune.freeReadingLabel}</Text>
              <Text style={styles.rhythmValue}>{strings.fortune.rhythmNames[daily.compatibility.relation]}</Text>
              <Text style={styles.sectionHeadline}>{freeOverview.headline}</Text>
              <Text style={styles.sectionBody}>{toParagraphs(freeOverview.body)}</Text>
              <OverviewShare relation={daily.compatibility.relation} headline={freeOverview.headline} body={freeOverview.body} />
              <FeedbackRow surface="fortune" topic="free" />
            </View>
          )}
          {freeOverview && daily?.elementColor && <ElementColorCard color={daily.elementColor} dateIso={daily.date} />}
          {freeOverview && daily && <JournalEntryCard dateIso={daily.date} onOpenJournal={() => setShowJournal(true)} />}

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
            <PlanPicker offer={offer} disabled={purchasing || restoring} />
            <PressableScale
              style={[styles.subscribeButton, purchasing && styles.buttonDisabled]}
              disabled={purchasing || restoring}
              onPress={handleSubscribe}
              accessibilityRole="button"
              accessibilityState={{ disabled: purchasing || restoring, busy: purchasing }}
            >
              <Text style={styles.subscribeButtonText}>
                {purchasing ? strings.qa.subscribing : offer.buttonLabel}
              </Text>
            </PressableScale>
            <PressableScale style={styles.restoreLink} disabled={purchasing || restoring} onPress={handleRestore} accessibilityRole="button" accessibilityState={{ disabled: purchasing || restoring, busy: restoring }} haptic="none">
              <Text style={styles.restoreLinkText}>{restoring ? strings.qa.restoring : strings.qa.restoreButton}</Text>
            </PressableScale>
            <Text style={styles.renewNote}>{offer.renewNote}</Text>
            <View style={styles.legalRow}>
              <PressableScale onPress={() => Linking.openURL(`${API_BASE_URL}/terms`)} accessibilityRole="link" style={styles.legalLink} haptic="none">
                <Text style={styles.legalLinkText}>{strings.fortune.termsLink}</Text>
              </PressableScale>
              <PressableScale onPress={() => Linking.openURL(`${API_BASE_URL}/privacy`)} accessibilityRole="link" style={styles.legalLink} haptic="none">
                <Text style={styles.legalLinkText}>{strings.fortune.privacyLink}</Text>
              </PressableScale>
            </View>
            {purchaseNotice && <Text style={styles.noticeText}>{purchaseNotice}</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (showGoodDays && selfDayMasterChar) {
    return <GoodDaysScreen selfDayMasterChar={selfDayMasterChar} selfDayBranch={selfDayBranch} todayIso={daily?.date ?? null} onBack={() => setShowGoodDays(false)} />;
  }

  // Subscriber entry to "좋은 날 찾기" — at the end of today's reading and at the top of the month calendar.
  const goodDaysEntry = selfDayMasterChar ? (
    <PressableScale style={styles.yearReportCard} onPress={() => setShowGoodDays(true)} accessibilityRole="button" accessibilityLabel={strings.goodDays.entryTitle} pressedScale={0.98}>
      <View style={styles.yearReportText}>
        <Text style={styles.yearReportTitle}>{strings.goodDays.entryTitle}</Text>
        <Text style={styles.yearReportBody}>{strings.goodDays.entryBody}</Text>
      </View>
    </PressableScale>
  ) : null;

  async function loadCalendarPurpose(purpose: GoodDayPurpose) {
    const request = ++calRequestRef.current;
    setCalLoading(true);
    setCalError(null);
    try {
      const appUserId = await getRevenueCatUserId();
      const res = await fetch(`${API_BASE_URL}/api/goodDays`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appUserId, selfDayMasterChar, selfDayBranch, purpose, scope: "month" }),
      });
      const json = await res.json().catch(() => ({}));
      if (request !== calRequestRef.current || !mountedRef.current) return;
      if (!res.ok) {
        setCalError(res.status === 401 || res.status === 403 || res.status === 503 ? strings.goodDays.verifyError : strings.fortune.loadErrorText);
        return;
      }
      setCalResults((prev) => ({ ...prev, [purpose]: json.goodDays?.days ?? [] }));
    } catch {
      if (request === calRequestRef.current && mountedRef.current) setCalError(strings.fortune.loadErrorText);
    } finally {
      if (request === calRequestRef.current && mountedRef.current) setCalLoading(false);
    }
  }

  function handleCalendarChip(purpose: GoodDayPurpose) {
    calRequestRef.current++;
    setCalError(null);
    setCalLoading(false);
    if (calPurpose === purpose) {
      setCalPurpose(null);
      return;
    }
    setCalPurpose(purpose);
    track("calendar_purpose", { kind: purpose });
    if (!calResults[purpose]) loadCalendarPurpose(purpose);
  }

  const weeklyWithScore = (weekly ?? []).filter((d) => d.compatibility);
  const weeklyBest = weeklyWithScore.length ? pickExtreme(weeklyWithScore, "max") : null;
  const weeklyCaution = weeklyWithScore.length ? pickExtreme(weeklyWithScore, "min") : null;

  // 이달 달력: 칸마다 그날의 리듬 색. 선택한 날(처음엔 오늘)의 리듬 이름 + 한 줄은 아래 카드에.
  const monthByDate = new Map((monthDays ?? []).filter((d) => d.compatibility).map((d) => [d.date, d]));
  const monthKey = monthDays?.[0]?.date.slice(0, 7) ?? null;
  const monthSelectedDate = selectedMonthDate ?? daily?.date ?? monthDays?.[0]?.date ?? null;
  const monthSelected = monthSelectedDate ? monthByDate.get(monthSelectedDate) ?? null : null;
  // 강조일: 선택한 목적의 결과 중 이번 달 달력 안의 날. 같은 리듬 두 번째 날은 두 번째 이유 문구.
  const calPurposeLabel = calPurpose ? (GOOD_DAYS_CONTENT[locale] ?? GOOD_DAYS_CONTENT.en).purposes[calPurpose].label : null;
  const calHighlights = new Map<string, string>();
  if (calPurpose && monthKey) {
    const seen = new Map<GoodDayRelation, number>();
    for (const day of calResults[calPurpose] ?? []) {
      if (!day.date.startsWith(monthKey)) continue;
      const occurrence = seen.get(day.relation) ?? 0;
      seen.set(day.relation, occurrence + 1);
      calHighlights.set(day.date, goodDayReason(locale, calPurpose, day.relation, occurrence));
    }
  }
  const calLoaded = !!calPurpose && !!calResults[calPurpose];

  const dailyOverview = daily?.compatibility ? getOverview(content, daily.compatibility.relation, daily.dayMaster.pillarIndex) : null;

  // 오늘의 행운 포인트 — 그날의 오행 하나로만 정해지는 값이라 relation과 무관.
  const todayElementKey = daily?.compatibility?.otherDayMasterElement;
  const luckyPoint = todayElementKey ? (LUCKY_POINTS[locale] ?? LUCKY_POINTS.ko)[todayElementKey] : null;
  const luckyNumber = todayElementKey ? LUCKY_NUMBERS[todayElementKey] : null;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </PressableScale>

        <Text style={[styles.heading, locale === "ko" && styles.headingKo]} accessibilityRole="header">{strings.fortune.tabHeadings[tab]}</Text>

        <FrostedSurface style={styles.tabRow} accessibilityRole="tablist" onLayout={(e) => setTabRowWidth(e.nativeEvent.layout.width)}>
          {tabRowWidth > 0 && (
            <Reanimated.View style={[styles.tabIndicator, { width: (tabRowWidth - 8) / 4 }, tabIndicatorStyle]} />
          )}
          {TABS.map((t) => (
            <PressableScale
              key={t}
              style={styles.tabButton}
              onPress={() => handleSelectTab(t)}
              haptic="select"
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === t }}
              aria-selected={tab === t}
            >
              <Text style={[styles.tabLabel, tab === t && styles.tabLabelActive]} numberOfLines={1} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                {t === "daily" ? strings.fortune.dailyTab : t === "weekly" ? strings.fortune.weeklyTab : t === "month" ? strings.fortune.monthTab : strings.fortune.yearlyTab}
              </Text>
            </PressableScale>
          ))}
        </FrostedSurface>

        {!selfDayMasterChar && <Text style={styles.errorText}>{strings.fortune.loadErrorText}</Text>}

        {tab === "daily" && dailyLoading && <ElementsLoader size="medium" style={styles.sectionSpinner} />}
        {tab === "daily" && !dailyLoading && dailyError && <ErrorNotice text={dailyError} retryLabel={strings.common.retryLabel} onRetry={retryDaily} />}

        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && !revealed && (
          // pressedScale=1: the custom seal spring (pressIn/pressOut) already handles the shrink.
          <PressableScale
            onPress={handleOpenDaily}
            onPressIn={handleSealPressIn}
            onPressOut={handleSealPressOut}
            pressedScale={1}
            accessibilityRole="button"
            accessibilityLabel={`${strings.fortune.sealHeading}. ${strings.fortune.sealButtonLabel}`}
          >
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
          </PressableScale>
        )}

        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && revealed && (
          <>
            {/* The overview is the day's one big block: rhythm name and overview share a card
                instead of a score card followed by an overview card of the same weight. */}
            <Animated.View style={[styles.heroCard, styles.heroCardToday, sectionStyle(0)]}>
              <LinearGradient colors={["#1F3327", "#18291F"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />
              <ArtImage artKey={currentSolarTermArtKey(new Date())} contentFit="cover" style={styles.heroTermBand} />
              {/* The band ends right where the kicker starts; fade it into the card so the kicker stays readable. */}
              <LinearGradient
                colors={["rgba(30,49,37,0)", "#1E3125"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.heroTermFade}
                pointerEvents="none"
              />
              <RhythmWave relation={toRhythmRelation(daily.compatibility.relation)} height={64} color={COLORS.gold} style={styles.heroWaveToday} />
              <Text style={styles.heroKickerToday}>{strings.fortune.scoreLabel}</Text>
              <Text style={[styles.heroRhythmToday, locale === "ko" && styles.heroRhythmTodayKo]} accessibilityRole="header">{strings.fortune.rhythmNames[daily.compatibility.relation]}</Text>
              {streak > 1 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakBadgeText}>{strings.fortune.streakBadge(streak)}</Text>
                </View>
              )}
              <View style={styles.heroDivider} />
              <Text style={[styles.heroHeadlineToday, locale === "ko" ? styles.heroHeadlineTodayKo : styles.heroHeadlineTodayItalic]}>{dailyOverview?.headline}</Text>
              <Text style={styles.heroBodyToday}>{toParagraphs(dailyOverview?.body)}</Text>
              {!!dailyOverview && <OverviewShare relation={daily.compatibility.relation} headline={dailyOverview.headline} body={dailyOverview.body} />}
              {!!dailyOverview && <FeedbackRow surface="fortune" topic="pro" />}
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

            <Animated.View style={sectionStyle(2)}>
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

            {luckyPoint && luckyNumber && (
              <Animated.View style={[styles.sectionCard, sectionStyle(3)]}>
                <Text style={styles.sectionLabel} accessibilityRole="header">{strings.fortune.luckyPointLabel}</Text>
                <View style={styles.luckyRow}>
                  <View style={styles.luckyBlock}>
                    <Text style={styles.luckyBlockLabel}>{strings.fortune.luckyColorLabel}</Text>
                    <View style={styles.luckyColorRow}>
                      <View style={styles.luckyColorDot} />
                      <Text style={styles.luckyColorValue}>{luckyPoint.color}</Text>
                    </View>
                  </View>
                  <View style={styles.luckyDivider} />
                  <View style={styles.luckyBlock}>
                    <Text style={styles.luckyBlockLabel}>{strings.fortune.luckyNumberLabel}</Text>
                    <Text style={styles.luckyNumberValue}>{luckyNumber}</Text>
                  </View>
                  {/* Cardinal directions only carry meaning in Korean fortune culture; en/es show color + number. */}
                  {locale === "ko" && (
                    <>
                      <View style={styles.luckyDivider} />
                      <View style={styles.luckyBlock}>
                        <Text style={styles.luckyBlockLabel}>{strings.fortune.luckyDirectionLabel}</Text>
                        <Text style={styles.luckyDirectionValue}>{luckyPoint.direction}</Text>
                      </View>
                    </>
                  )}
                </View>
              </Animated.View>
            )}
          </>
        )}

        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && revealed && daily.elementColor && (
          <ElementColorCard color={daily.elementColor} dateIso={daily.date} />
        )}
        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && revealed && (
          <JournalEntryCard dateIso={daily.date} onOpenJournal={() => setShowJournal(true)} />
        )}
        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && revealed && goodDaysEntry}

        {tab === "weekly" && weeklyLoading && <ElementsLoader size="medium" style={styles.sectionSpinner} />}
        {tab === "weekly" && !weeklyLoading && weeklyError && <ErrorNotice text={weeklyError} retryLabel={strings.common.retryLabel} onRetry={retryWeekly} />}
        {tab === "weekly" && !weeklyLoading && !weeklyError && weekly && !weeklyBest && (
          <Text style={styles.errorText}>{strings.fortune.loadErrorText}</Text>
        )}
        {tab === "weekly" && !weeklyLoading && !weeklyError && weeklyBest && weeklyCaution && (
          <>
            <Reveal index={0}>
              <View style={styles.highlightCard}>
                <Text style={styles.highlightLabel}>{strings.fortune.weeklyBestDayLabel}</Text>
                <Text style={styles.highlightDate}>{formatShortDate(weeklyBest.date, locale)}</Text>
                <Text style={styles.highlightHeadline}>{getOverview(content, weeklyBest.compatibility!.relation, weeklyBest.dayMaster.pillarIndex).headline}</Text>
              </View>
            </Reveal>
            <Reveal index={1}>
              <View style={styles.highlightCard}>
                <Text style={styles.highlightLabel}>{strings.fortune.weeklyCautionDayLabel}</Text>
                <Text style={styles.highlightDate}>{formatShortDate(weeklyCaution.date, locale)}</Text>
                <Text style={styles.highlightHeadline}>{getOverview(content, weeklyCaution.compatibility!.relation, weeklyCaution.dayMaster.pillarIndex).headline}</Text>
              </View>
            </Reveal>
            <Reveal index={2}>
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
            </Reveal>
          </>
        )}

        {tab === "month" && goodDaysEntry}
        {tab === "month" && monthDaysLoading && <ElementsLoader size="medium" style={styles.sectionSpinner} />}
        {tab === "month" && !monthDaysLoading && monthDaysError && <ErrorNotice text={monthDaysError} retryLabel={strings.common.retryLabel} onRetry={retryMonthDays} />}
        {tab === "month" && !monthDaysLoading && !monthDaysError && monthDays && !monthKey && (
          <Text style={styles.errorText}>{strings.fortune.loadErrorText}</Text>
        )}
        {tab === "month" && !monthDaysLoading && !monthDaysError && monthKey && (
          <>
            <Reveal index={0}>
            <Text style={styles.sectionLabel} accessibilityRole="header">{strings.goodDays.calendarChipsLabel}</Text>
            <Text style={styles.calendarHint}>{strings.goodDays.calendarChipsHint}</Text>
            <View style={styles.domainPickerRow} accessibilityRole="radiogroup">
              {GOOD_DAY_PURPOSES.map((p) => {
                const active = calPurpose === p;
                const label = (GOOD_DAYS_CONTENT[locale] ?? GOOD_DAYS_CONTENT.en).purposes[p].label;
                return (
                  <PressableScale
                    key={p}
                    style={[styles.domainChip, active && styles.domainChipActive]}
                    onPress={() => handleCalendarChip(p)}
                    haptic="select"
                    accessibilityRole="button"
                    accessibilityLabel={label}
                    accessibilityState={{ selected: active }}
                    aria-pressed={active}
                  >
                    <Text style={[styles.domainChipLabel, active && styles.domainChipLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{label}</Text>
                  </PressableScale>
                );
              })}
              {calLoading && <ActivityIndicator color={COLORS.gold} style={styles.chipSpinner} />}
            </View>
            {calError && <ErrorNotice text={calError} retryLabel={strings.common.retryLabel} onRetry={() => calPurpose && loadCalendarPurpose(calPurpose)} />}
            {calLoaded && !calLoading && !calError && calHighlights.size === 0 && <Text style={styles.calendarHint}>{strings.goodDays.calendarFewDays}</Text>}
            </Reveal>
            <Reveal index={1}>
            <Text style={styles.calendarTitle} accessibilityRole="header">{formatMonthLabel(monthKey, locale)}</Text>
            <MonthGrid
              month={monthKey}
              renderDay={(date) => {
                const d = monthByDate.get(date);
                if (!d?.compatibility) return <View style={styles.dayCell} />;
                const relation = d.compatibility.relation;
                const isToday = daily?.date === date;
                const isPast = !!daily && date < daily.date;
                const isSelected = monthSelectedDate === date;
                const isGood = calHighlights.has(date);
                return (
                  <PressableScale
                    onPress={() => setSelectedMonthDate(date)}
                    style={[styles.dayCell, isPast && styles.dayCellPast, isToday && styles.dayCellToday, isSelected && styles.dayCellSelected, isGood && styles.dayCellGood]}
                    haptic="select"
                    accessibilityRole="button"
                    accessibilityLabel={strings.fortune.monthCellLabel(formatShortDate(date, locale), strings.fortune.rhythmNames[relation], isToday) + (isGood && calPurposeLabel ? `, ${strings.goodDays.calendarGoodDay(calPurposeLabel)}` : "")}
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text style={[styles.dayNumber, isGood && styles.dayNumberGood]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{Number(date.slice(8))}</Text>
                    {isGood && <View style={styles.dayGoodDot} />}
                  </PressableScale>
                );
              }}
            />
            </Reveal>
            {monthSelected?.compatibility && (
              <View style={styles.dayDetailCard}>
                <Text style={styles.highlightDate}>
                  {formatShortDate(monthSelected.date, locale)}
                  {daily?.date === monthSelected.date ? ` · ${strings.fortune.todayBadge}` : ""}
                </Text>
                <Text style={styles.dayDetailRhythm}>{strings.fortune.rhythmNames[monthSelected.compatibility.relation]}</Text>
                <Text style={styles.highlightHeadline}>
                  {monthSelected.compatibility.relation === "otherChallengesSelf"
                    ? strings.fortune.paceFreeHeadline
                    : getOverview(content, monthSelected.compatibility.relation, monthSelected.dayMaster.pillarIndex).headline}
                </Text>
                {calPurposeLabel && calHighlights.has(monthSelected.date) && (
                  <>
                    <Text style={styles.dayDetailGoodLabel}>{strings.goodDays.calendarGoodDay(calPurposeLabel)}</Text>
                    <Text style={styles.highlightHeadline}>{calHighlights.get(monthSelected.date)}</Text>
                  </>
                )}
              </View>
            )}
          </>
        )}

        {tab === "yearly" && (
          // The paid deep read of this same year (a separate one-time purchase, not part of
          // the subscription) — the natural next step from the year tab.
          <Reveal index={0}>
            <PressableScale style={styles.yearReportCard} onPress={onOpenYearReport} accessibilityRole="button" pressedScale={0.98}>
              <View style={styles.yearReportText}>
                <Text style={styles.yearReportTitle}>{strings.yearReport.tabCardTitle(yearly?.year ?? comingSajuYear())}</Text>
                <Text style={styles.yearReportBody}>{strings.yearReport.tabCardBody}</Text>
                <Text style={styles.yearReportCta}>{strings.yearReport.tabCardCta}</Text>
              </View>
            </PressableScale>
          </Reveal>
        )}

        {tab === "yearly" && yearlyLoading && <ElementsLoader size="medium" style={styles.sectionSpinner} />}
        {tab === "yearly" && !yearlyLoading && yearlyError && <ErrorNotice text={yearlyError} retryLabel={strings.common.retryLabel} onRetry={retryYearly} />}
        {tab === "yearly" && !yearlyLoading && !yearlyError && yearly?.compatibility && (
          <>
            <Reveal index={1}>
            <View style={styles.heroCard}>
              <Text style={styles.heroKicker}>{strings.fortune.yearHeading(yearly.year)}</Text>
              <Text style={styles.heroRhythm} accessibilityRole="header">{strings.fortune.rhythmNames[yearly.compatibility.relation]}</Text>
              <View style={styles.heroDivider} />
              <Text style={styles.heroHeadline}>{yearContent.relations[yearly.compatibility.relation].headline}</Text>
              <Text style={styles.sectionBody}>{toParagraphs(yearContent.relations[yearly.compatibility.relation].overview)}</Text>
              {yearly.branchRelation !== "none" && (
                <Text style={styles.heroNote}>{yearly.branchRelation === "hap" ? yearContent.hapNote : yearContent.chungNote}</Text>
              )}
            </View>
            </Reveal>

            <Reveal index={2}>
            <AreaList
              title={strings.fortune.areasLabel}
              items={(["wealth", "love", "career", "study", "health"] as const).map((d) => ({
                key: d,
                label: domainLabel(d),
                body: yearContent.relations[yearly.compatibility!.relation][d],
              }))}
            />
            </Reveal>

            <Reveal index={3}>
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
            </Reveal>
          </>
        )}

        {tab === "yearly" && (
          <Reveal index={4} style={styles.monthlySection}>
            <Text style={styles.sectionLabel} accessibilityRole="header">{strings.fortune.monthlyFlowLabel}</Text>

            <View style={styles.domainPickerRow}>
              {(["overview", "wealth", "love", "career", "study", "health"] as YearDomain[]).map((d) => (
                <PressableScale
                  key={d}
                  style={[styles.domainChip, monthlyDomain === d && styles.domainChipActive]}
                  onPress={() => setMonthlyDomain(d)}
                  haptic="select"
                  accessibilityRole="button"
                  accessibilityState={{ selected: monthlyDomain === d }}
                  aria-pressed={monthlyDomain === d}
                >
                  <Text style={[styles.domainChipLabel, monthlyDomain === d && styles.domainChipLabelActive]}>{domainLabel(d)}</Text>
                </PressableScale>
              ))}
            </View>

            {monthlyLoading && <ElementsLoader size="medium" style={styles.sectionSpinner} />}
            {!monthlyLoading && monthlyError && <ErrorNotice text={monthlyError} retryLabel={strings.common.retryLabel} onRetry={retryMonthly} />}
            {/* The Bond/Shift badges below mean nothing without a key. */}
            {!monthlyLoading && !monthlyError && monthly?.some((m) => m.compatibility && m.branchRelation !== "none") && (
              <Text style={styles.branchLegend}>{strings.fortune.branchLegend}</Text>
            )}
            {!monthlyLoading && !monthlyError && monthly && (
              <View style={styles.weekList}>
                {monthly
                  .filter((m) => m.compatibility)
                  .map((m, i, rows) => (
                    // Neighbouring months often share the same relation copy; say "same flow" instead
                    // of printing the identical paragraph twice. Full text, no 2-line cut-off.
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
                      {i > 0 && domainText(rows[i - 1].compatibility!.relation, monthlyDomain) === domainText(m.compatibility!.relation, monthlyDomain) ? (
                        <Text style={styles.monthRowSame}>{strings.fortune.monthSameAsPrevious}</Text>
                      ) : (
                        <Text style={styles.monthRowText}>{domainText(m.compatibility!.relation, monthlyDomain)}</Text>
                      )}
                    </View>
                  ))}
              </View>
            )}
          </Reveal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: SPACE.xl, paddingTop: SPACE.sm, paddingBottom: SPACE.xxl },
  centerSpinner: { flex: 1, justifyContent: "center" },
  sectionSpinner: { marginTop: SPACE.xxl },
  backButton: { flexDirection: "row", alignItems: "center", gap: SPACE.xs, alignSelf: "flex-start", padding: SPACE.sm, marginLeft: -SPACE.sm, marginBottom: SPACE.md, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 32, lineHeight: 40, letterSpacing: -0.6, color: COLORS.headline, marginBottom: SPACE.lg },
  headingKo: koDisplay(-0.8),
  shareRow: { flexDirection: "row", alignItems: "center", gap: SPACE.sm, alignSelf: "flex-start", minHeight: 44, marginTop: SPACE.sm },
  shareLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold },
  freeReadingCard: { marginBottom: SPACE.lg, gap: SPACE.sm },
  lockedCard: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    padding: SPACE.xl,
    marginTop: SPACE.sm,
    gap: SPACE.md,
    ...SHADOW.raised,
  },
  lockedHeading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 22, color: COLORS.headline },
  yearReportCard: { backgroundColor: SURFACE.raised, borderRadius: RADIUS.md, padding: SPACE.lg, marginBottom: SPACE.md, ...SHADOW.raised },
  yearReportText: { gap: SPACE.sm },
  yearReportTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 20, color: COLORS.headline },
  yearReportBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline },
  yearReportCta: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold, marginTop: SPACE.xs },
  benefitList: { gap: SPACE.lg, marginBottom: SPACE.md },
  benefitRow: { flexDirection: "row", gap: SPACE.md, alignItems: "flex-start" },
  benefitCheck: { marginTop: SPACE.xs },
  benefitText: { flex: 1, gap: SPACE.xs },
  benefitTitle: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.headline },
  benefitBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19, color: COLORS.subheadline },
  lockedBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginBottom: SPACE.sm },
  subscribeButton: { backgroundColor: COLORS.gold, borderRadius: RADIUS.sm, paddingVertical: SPACE.lg, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  subscribeButtonText: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  restoreLink: { alignItems: "center", justifyContent: "center", minHeight: 44 },
  renewNote: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.subheadline, textAlign: "center" },
  legalRow: { flexDirection: "row", justifyContent: "center", gap: SPACE.xl },
  legalLink: { minHeight: 44, justifyContent: "center" },
  legalLinkText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline, textDecorationLine: "underline" },
  restoreLinkText: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline },
  noticeText: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.danger, textAlign: "center" },
  // One segmented control instead of four bordered boxes; short labels so es fits.
  tabRow: {
    flexDirection: "row",
    padding: SPACE.xs,
    marginBottom: SPACE.xl,
    borderRadius: RADIUS.md,
    ...SHADOW.raised,
  },
  tabButton: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 40, paddingHorizontal: SPACE.xs, borderRadius: RADIUS.sm },
  tabIndicator: { position: "absolute", top: 4, bottom: 4, left: 4, backgroundColor: "rgba(111,169,139,0.18)", borderRadius: RADIUS.sm },
  tabLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.subheadline },
  tabLabelActive: { color: COLORS.gold },
  // COLORS.danger (was #CB6249, 4.3:1 — then a one-off #E0A296): the palette error color, passes 4.5:1.
  errorText: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.danger, marginTop: SPACE.xl },
  errorBlock: { marginTop: SPACE.xl, alignItems: "flex-start" },
  errorBlockText: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.danger },
  retryButton: { minHeight: 44, justifyContent: "center" },
  retryLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold },
  sealCard: {
    alignItems: "center",
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACE.xxl,
    paddingHorizontal: SPACE.xl,
    marginTop: SPACE.md,
    gap: SPACE.sm,
    ...SHADOW.raised,
  },
  sealIconRing: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(111,169,139,0.1)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.3)",
    marginBottom: SPACE.sm,
  },
  sealHeading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 20, color: COLORS.headline, textAlign: "center" },
  sealBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline, textAlign: "center", marginBottom: SPACE.md },
  sealButton: { backgroundColor: COLORS.gold, borderRadius: RADIUS.sm, paddingVertical: SPACE.md, paddingHorizontal: SPACE.xl },
  sealButtonLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.ctaText },
  streakContinueText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.gold, marginTop: SPACE.xs },
  streakBadge: {
    marginTop: SPACE.md,
    backgroundColor: "rgba(111,169,139,0.1)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.3)",
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.md,
  },
  streakBadgeText: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.gold },
  heroCard: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACE.xl,
    paddingHorizontal: SPACE.xl,
    ...SHADOW.raised,
  },
  heroKicker: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline },
  heroRhythm: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, marginTop: SPACE.sm },
  heroDivider: { height: StyleSheet.hairlineWidth, backgroundColor: SURFACE.hairline, marginTop: SPACE.lg, marginBottom: SPACE.lg },
  heroHeadline: { fontFamily: FONTS.semibold, fontSize: 17, lineHeight: 24, color: COLORS.headline },
  heroNote: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline, marginTop: SPACE.lg, paddingLeft: SPACE.md, borderLeftWidth: 2, borderLeftColor: "rgba(111,169,139,0.4)" },
  // Magazine-style "today" hero — the year tab keeps the original heroKicker/heroRhythm/heroHeadline above.
  heroCardToday: { overflow: "hidden" },
  // Solar-term art band behind the wave; draws nothing until its key has an entry.
  heroTermBand: { position: "absolute", top: 0, left: 0, right: 0, height: 96, opacity: 0.55 },
  heroTermFade: { position: "absolute", top: 40, left: 0, right: 0, height: 64 },
  // Cancels the hero card's own padding (20 horizontal, 24 top) so the wave touches its edges.
  // width "auto" overrides RhythmWave's 100% so the negative margins widen it to the card edges
  // (with 100% it kept the inner width and stopped 40px short on the right).
  heroWaveToday: { width: "auto", alignSelf: "stretch", marginHorizontal: -SPACE.xl, marginTop: -SPACE.xl, marginBottom: SPACE.md },
  heroKickerToday: { fontFamily: FONTS.medium, fontSize: 12, letterSpacing: 1.2, color: COLORS.subheadline },
  heroRhythmToday: { fontFamily: FONTS.display, fontSize: 44, lineHeight: 50, letterSpacing: -1, color: COLORS.headline, marginTop: SPACE.sm },
  heroRhythmTodayKo: koDisplay(-1.2),
  heroHeadlineToday: { borderLeftWidth: 3, borderLeftColor: COLORS.gold, paddingLeft: SPACE.lg, color: COLORS.headline },
  heroHeadlineTodayItalic: { fontFamily: FONTS.displayItalic, fontSize: 20, lineHeight: 28 },
  heroHeadlineTodayKo: { fontSize: 18, lineHeight: 28, fontWeight: "600" },
  heroBodyToday: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 26, color: COLORS.subheadline, marginTop: SPACE.sm },
  rhythmValue: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center", marginTop: SPACE.xs },
  sectionCard: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    padding: SPACE.lg,
    marginTop: SPACE.lg,
    ...SHADOW.raised,
  },
  sectionLabel: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: SURFACE.hairline },
  areaRow: { flexDirection: "row", gap: SPACE.md, marginTop: SPACE.lg },
  areaIcon: { width: 36, height: 36, borderRadius: RADIUS.pill, backgroundColor: "rgba(111,169,139,0.12)", alignItems: "center", justifyContent: "center" },
  areaText: { flex: 1, gap: SPACE.xs },
  areaLabel: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.headline },
  areaBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 22, color: COLORS.subheadline },
  detailHeader: { flexDirection: "row", alignItems: "center", gap: SPACE.md, minHeight: 56, paddingVertical: SPACE.md },
  detailHeaderText: { flex: 1, gap: SPACE.xs },
  detailLabel: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.subheadline },
  detailName: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline },
  detailBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, paddingBottom: SPACE.md },
  sectionHeadline: { fontFamily: FONTS.semibold, fontSize: 16, color: COLORS.headline, marginTop: SPACE.sm },
  sectionBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginTop: SPACE.sm },
  luckyRow: { flexDirection: "row", marginTop: SPACE.md },
  luckyBlock: { flex: 1, alignItems: "center", gap: SPACE.sm },
  luckyBlockLabel: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.subheadline },
  luckyNumberValue: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 40, lineHeight: 44, color: COLORS.headline },
  luckyColorRow: { flexDirection: "row", alignItems: "center", gap: SPACE.sm },
  luckyColorDot: { width: 12, height: 12, borderRadius: RADIUS.pill, borderWidth: 1.5, borderColor: COLORS.gold, backgroundColor: "transparent" },
  luckyColorValue: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.headline },
  luckyDirectionValue: { fontFamily: FONTS.semibold, fontSize: 18, color: COLORS.headline },
  luckyDivider: { width: 1, backgroundColor: SURFACE.hairline, marginHorizontal: SPACE.sm },
  highlightCard: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    padding: SPACE.lg,
    marginBottom: SPACE.md,
    ...SHADOW.raised,
  },
  highlightLabel: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold },
  highlightDate: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline, marginTop: SPACE.sm },
  highlightHeadline: { fontFamily: FONTS.regular, fontSize: 13.5, color: COLORS.subheadline, marginTop: SPACE.xs },
  weekList: { marginTop: SPACE.sm, gap: SPACE.sm },
  weekRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.md,
    backgroundColor: SURFACE.floating,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.lg,
  },
  weekRowDate: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.headline, width: 78 },
  weekRowHeadline: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.subheadline, flex: 1 },
  calendarTitle: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline, marginTop: SPACE.md, marginBottom: SPACE.sm, textAlign: "center" },
  // 2026-10-12 device test: the five per-rhythm fills were unreadable on a phone and nobody could say
  // what they meant, so cells are one neutral surface. The rhythm name is in the detail card on tap.
  // Only state is drawn on the grid: today (outline), purpose-picked days (filled + thick outline),
  // the selected day (lighter surface).
  dayCell: { flex: 1, borderRadius: RADIUS.sm, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "transparent", backgroundColor: COLORS.inputBg },
  dayCellPast: { opacity: 0.55 },
  dayCellToday: { borderColor: COLORS.headline },
  dayCellGood: { borderColor: COLORS.gold, borderWidth: 3, backgroundColor: "rgba(111,169,139,0.28)" },
  dayGoodDot: { position: "absolute", bottom: 4, width: 5, height: 5, borderRadius: RADIUS.pill, backgroundColor: COLORS.gold },
  dayCellSelected: { backgroundColor: COLORS.border },
  dayNumber: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.headline },
  dayNumberGood: { color: COLORS.headline, fontFamily: FONTS.bold },
  dayDetailCard: { marginTop: SPACE.md, backgroundColor: SURFACE.raised, borderRadius: RADIUS.md, padding: SPACE.lg, ...SHADOW.raised },
  dayDetailGoodLabel: { fontFamily: FONTS.semibold, fontSize: 12.5, color: COLORS.gold, marginTop: SPACE.md },
  calendarHint: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.footer, marginTop: SPACE.xs },
  chipSpinner: { alignSelf: "center", marginLeft: SPACE.xs },
  dayDetailRhythm: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.gold, marginTop: SPACE.xs },
  monthlySection: { marginTop: SPACE.xl },
  domainPickerRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm, marginTop: SPACE.sm, marginBottom: SPACE.md },
  domainChip: {
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.md,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
  },
  domainChipActive: { backgroundColor: "rgba(111,169,139,0.14)", borderColor: "rgba(111,169,139,0.4)" },
  domainChipLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline },
  domainChipLabelActive: { color: COLORS.gold },
  monthRow: {
    backgroundColor: SURFACE.floating,
    borderRadius: RADIUS.sm,
    padding: SPACE.md,
    gap: SPACE.sm,
  },
  monthRowHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  monthRowDate: { fontFamily: FONTS.semibold, fontSize: 12.5, color: COLORS.headline },
  monthRowRight: { flexDirection: "row", alignItems: "center", gap: SPACE.sm },
  monthRowStage: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline },
  branchLegend: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.footer, marginTop: SPACE.sm },
  monthRowText: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline },
  monthRowSame: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.footer },
  branchBadge: { borderRadius: RADIUS.pill, paddingVertical: SPACE.xs, paddingHorizontal: SPACE.sm },
  branchBadgeHap: { backgroundColor: "rgba(111,169,139,0.15)" },
  branchBadgeChung: { borderWidth: 1, borderColor: "rgba(217,201,163,0.35)" },
  branchBadgeText: { fontFamily: FONTS.bold, fontSize: 12, color: COLORS.headline },
});
