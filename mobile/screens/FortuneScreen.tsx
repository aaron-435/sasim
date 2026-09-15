import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react-native";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import type { Locale } from "../lib/i18n/types";
import { DAILY_FORTUNE_CONTENT } from "../lib/dailyFortuneContent";
import type { CompatibilityResult } from "../lib/compatibility";
import { hasQaProEntitlement, purchaseQaPro, restoreQaPro } from "../lib/purchases";
import { refreshRoutineNotification } from "../lib/routineNotification";
import { COLORS } from "../theme/colors";

// "오늘의 운세" / "이번주 운세" — 화면은 순전히 프레젠테이션이다. relation 분류·
// 점수는 lib/compatibility.ts를 그대로 재사용해 만든 app/api/dailyFortune가
// 계산하고(선택된 "다른 쪽"이 사람이 아니라 오늘의 일진일 뿐), 이 화면은 relation
// 값을 받아 lib/dailyFortuneContent.ts의 카피를 입힌다 — CompatibilityScreen과
// 같은 분리. 구독 게이트는 QAScreen과 같은 qa_premium 엔타이틀먼트를 재사용한다
// (2026-09-15: "질문 10개"뿐이던 구독 혜택이 빈약하다는 피드백으로 추가된 기능).
type DayFortune = {
  date: string;
  dayMaster: { char: string; element: string };
  compatibility: CompatibilityResult | null;
};

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

export default function FortuneScreen({
  selfDayMasterChar,
  onBack,
}: {
  selfDayMasterChar: string | null;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const content = DAILY_FORTUNE_CONTENT[locale] ?? DAILY_FORTUNE_CONTENT.ko;

  const [entitled, setEntitled] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"daily" | "weekly">("daily");

  const [daily, setDaily] = useState<DayFortune | null>(null);
  const [dailyLoading, setDailyLoading] = useState(false);
  const [dailyError, setDailyError] = useState<string | null>(null);

  const [weekly, setWeekly] = useState<DayFortune[] | null>(null);
  const [weeklyLoading, setWeeklyLoading] = useState(false);
  const [weeklyError, setWeeklyError] = useState<string | null>(null);

  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);
  const [purchaseSuccessNotice, setPurchaseSuccessNotice] = useState<string | null>(null);

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

  useEffect(() => {
    if (entitled && selfDayMasterChar && !daily && !dailyLoading) loadDaily();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitled, selfDayMasterChar]);

  async function loadDaily() {
    if (!selfDayMasterChar) return;
    setDailyLoading(true);
    setDailyError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/dailyFortune?mode=daily&selfDayMasterChar=${encodeURIComponent(selfDayMasterChar)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "failed");
      if (mountedRef.current) setDaily(json.daily);
    } catch {
      if (mountedRef.current) setDailyError(strings.fortune.loadErrorText);
    } finally {
      if (mountedRef.current) setDailyLoading(false);
    }
  }

  async function loadWeekly() {
    if (!selfDayMasterChar) return;
    setWeeklyLoading(true);
    setWeeklyError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/dailyFortune?mode=weekly&selfDayMasterChar=${encodeURIComponent(selfDayMasterChar)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "failed");
      if (mountedRef.current) setWeekly(json.weekly);
    } catch {
      if (mountedRef.current) setWeeklyError(strings.fortune.loadErrorText);
    } finally {
      if (mountedRef.current) setWeeklyLoading(false);
    }
  }

  function handleSelectTab(next: "daily" | "weekly") {
    setTab(next);
    if (next === "weekly" && !weekly && !weeklyLoading) loadWeekly();
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
      setPurchaseSuccessNotice(strings.fortune.subscribeSuccess);
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
      setPurchaseSuccessNotice(strings.fortune.restoreSuccess);
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
            {purchaseNotice && <Text style={styles.noticeText}>{purchaseNotice}</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const weeklyWithScore = (weekly ?? []).filter((d) => d.compatibility);
  const weeklyBest = weeklyWithScore.length ? pickExtreme(weeklyWithScore, "max") : null;
  const weeklyCaution = weeklyWithScore.length ? pickExtreme(weeklyWithScore, "min") : null;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading}>{strings.fortune.headerLabel}</Text>
        {purchaseSuccessNotice && <Text style={styles.successText}>{purchaseSuccessNotice}</Text>}

        <View style={styles.tabRow}>
          <Pressable style={[styles.tabButton, tab === "daily" && styles.tabButtonActive]} onPress={() => handleSelectTab("daily")}>
            <Text style={[styles.tabLabel, tab === "daily" && styles.tabLabelActive]}>{strings.fortune.dailyTab}</Text>
          </Pressable>
          <Pressable style={[styles.tabButton, tab === "weekly" && styles.tabButtonActive]} onPress={() => handleSelectTab("weekly")}>
            <Text style={[styles.tabLabel, tab === "weekly" && styles.tabLabelActive]}>{strings.fortune.weeklyTab}</Text>
          </Pressable>
        </View>

        {tab === "daily" && dailyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
        {tab === "daily" && !dailyLoading && dailyError && <Text style={styles.errorText}>{dailyError}</Text>}
        {tab === "daily" && !dailyLoading && !dailyError && daily?.compatibility && (
          <View style={[styles.scoreCard, { borderColor: `${ELEMENT_COLORS[daily.compatibility.otherDayMasterElement] ?? COLORS.gold}55` }]}>
            <Text style={styles.scoreLabel}>{strings.fortune.scoreLabel}</Text>
            <Text style={[styles.scoreValue, { color: ELEMENT_COLORS[daily.compatibility.otherDayMasterElement] ?? COLORS.gold }]}>
              {daily.compatibility.score}
            </Text>
            <Text style={styles.relationHeadline}>{content.relations[daily.compatibility.relation].headline}</Text>
            <Text style={styles.relationBody}>{content.relations[daily.compatibility.relation].body}</Text>
          </View>
        )}

        {tab === "weekly" && weeklyLoading && <ActivityIndicator color={COLORS.gold} style={styles.sectionSpinner} />}
        {tab === "weekly" && !weeklyLoading && weeklyError && <Text style={styles.errorText}>{weeklyError}</Text>}
        {tab === "weekly" && !weeklyLoading && !weeklyError && weekly && !weeklyBest && (
          <Text style={styles.errorText}>{strings.fortune.loadErrorText}</Text>
        )}
        {tab === "weekly" && !weeklyLoading && !weeklyError && weeklyBest && weeklyCaution && (
          <>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightLabel}>{strings.fortune.weeklyBestDayLabel}</Text>
              <Text style={styles.highlightDate}>{formatShortDate(weeklyBest.date, locale)}</Text>
              <Text style={styles.highlightHeadline}>{content.relations[weeklyBest.compatibility!.relation].headline}</Text>
            </View>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightLabel}>{strings.fortune.weeklyCautionDayLabel}</Text>
              <Text style={styles.highlightDate}>{formatShortDate(weeklyCaution.date, locale)}</Text>
              <Text style={styles.highlightHeadline}>{content.relations[weeklyCaution.compatibility!.relation].headline}</Text>
            </View>
            <View style={styles.weekList}>
              {weeklyWithScore.map((d) => (
                <View key={d.date} style={styles.weekRow}>
                  <Text style={styles.weekRowDate}>{formatShortDate(d.date, locale)}</Text>
                  <Text style={styles.weekRowHeadline} numberOfLines={1}>
                    {content.relations[d.compatibility!.relation].headline}
                  </Text>
                  <Text style={styles.weekRowScore}>{d.compatibility!.score}</Text>
                </View>
              ))}
            </View>
          </>
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
  successText: { fontFamily: "Manrope_500Medium", fontSize: 13, color: COLORS.gold, marginBottom: 16 },
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
  restoreLink: { alignItems: "center", paddingVertical: 6 },
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
  errorText: { fontFamily: "Manrope_400Regular", fontSize: 13, color: "#CB6249", marginTop: 20 },
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
  scoreValue: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 48 },
  relationHeadline: { fontFamily: "Manrope_600SemiBold", fontSize: 15, color: COLORS.headline, marginTop: 4 },
  relationBody: { fontFamily: "Manrope_400Regular", fontSize: 14.5, lineHeight: 22, color: COLORS.subheadline, marginTop: 12, textAlign: "center" },
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
  weekRowScore: { fontFamily: "Manrope_600SemiBold", fontSize: 13, color: COLORS.gold },
});
