import ArrowLeft from "lucide-react-native/icons/arrow-left";
import RefreshCw from "lucide-react-native/icons/refresh-cw";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { ChatBubble, TypingDots } from "../components/ChatBubbles";
import { SafeAreaView } from "react-native-safe-area-context";
import questionBank from "../data/questionBank.json";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { localizedText } from "../lib/qaBankLocale";
import { getDailyLimit, getUsageToday, incrementUsageToday, PAID_DAILY_LIMIT } from "../lib/qaQuota";
import { purchaseQaPro, restoreQaPro } from "../lib/purchases";
import { useMonthlyPrice } from "../lib/useMonthlyPrice";
import { refreshRoutineNotification } from "../lib/routineNotification";
import { saveLastQuestion } from "../lib/qaHistory";
import type { NormalizedSajuResult } from "../lib/saju";
import { COLORS } from "../theme/colors";
import QAQuestionScreen from "./QAQuestionScreen";
import QASubcategoryScreen from "./QASubcategoryScreen";

type Question = { id: string; text_ko: string; text_en?: string; text_es?: string };
type Subcategory = { id: string; name_ko: string; name_en?: string; name_es?: string; questions: Question[] };
type Category = { id: string; name_ko: string; name_en?: string; name_es?: string; subcategories: Subcategory[] };

type Message = { role: "bot" | "user"; text: string } | { role: "picker" } | { role: "subscribe" };

const CATEGORIES = questionBank.categories as Category[];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Ported from components/QAChat.jsx, with two deliberate product changes:
//  1. Web capped this at FREE_QUESTIONS=2 and then pushed a "install the app"
//     verification code, because web's whole job is a lead-gen funnel into the native
//     app (see project_fatesaid_web_app_handoff memory). That funnel doesn't make
//     sense once you're already inside the native app.
//  2. 2026-09-11: replaced with a daily quota instead — 1 free question/day, 10/day
//     for a paid subscriber (see strings.qa.subscriptionPriceLabel for the price shown
//     in the UI). 2026-09-14: the paid side became a real,
//     working purchase flow (see handleSubscribe/handleRestore below and lib/purchases.ts)
//     once a real App Store subscription product existed behind it.
export default function QAScreen({
  nickname,
  sessionId,
  sajuResult,
  onBack,
}: {
  nickname: string;
  sessionId: string;
  sajuResult: NormalizedSajuResult;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [view, setView] = useState<"chat" | "subcategory" | "question">("chat");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [retryQuestion, setRetryQuestion] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);
  const monthlyPrice = useMonthlyPrice();
  const priceLabel = monthlyPrice ? strings.qa.subscriptionPriceFor(monthlyPrice) : strings.qa.subscriptionPriceLabel;
  const scrollRef = useRef<ScrollView>(null);
  const mountedRef = useRef(true);
  const greetedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const pushBot = useCallback((text: string) => setMessages((m) => [...m, { role: "bot", text }]), []);
  const pushUser = useCallback((text: string) => setMessages((m) => [...m, { role: "user", text }]), []);
  const pushCategoryPicker = useCallback(() => setMessages((m) => [...m, { role: "picker" }]), []);
  const pushLimitReachedMessage = useCallback(() => {
    pushBot(strings.qa.limitReached1);
    pushBot(strings.qa.limitReached2(priceLabel, PAID_DAILY_LIMIT));
    setMessages((m) => [...m, { role: "subscribe" }]);
  }, [pushBot, strings, priceLabel]);

  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    (async () => {
      await wait(350);
      if (!mountedRef.current) return;
      pushBot(strings.qa.greeting1(nickname || strings.qa.defaultNickname));

      const [usage, dailyLimit] = await Promise.all([getUsageToday(), getDailyLimit()]);
      if (!mountedRef.current) return;
      if (usage >= dailyLimit) {
        await wait(700);
        if (!mountedRef.current) return;
        pushLimitReachedMessage();
        return;
      }

      await wait(850);
      if (!mountedRef.current) return;
      pushBot(strings.qa.greeting2);
      await wait(700);
      if (!mountedRef.current) return;
      pushBot(strings.qa.promptCategory);
      pushCategoryPicker();
    })();
  }, [nickname, pushBot, pushCategoryPicker, pushLimitReachedMessage, strings]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, busy, view]);

  // Android hardware back inside the category/question pickers steps back one level,
  // same as their on-screen back buttons, instead of App.tsx's handler dropping the
  // user all the way to Home. Added after App's listener, so RN asks this one first.
  useEffect(() => {
    if (view === "chat") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      setView(view === "question" ? "subcategory" : "chat");
      return true;
    });
    return () => sub.remove();
  }, [view]);

  async function requestAnswer(questionText: string) {
    setBusy(true);
    setErrorText(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/qa-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, question: questionText, sajuResult, sessionId, locale, platform: "mobile" }),
      });
      const json = await res.json();
      if (!mountedRef.current) return;

      if (!res.ok) {
        setErrorText(json.error || strings.qa.errorDefault);
        setRetryQuestion(questionText);
        setBusy(false);
        return;
      }

      for (const line of json.lines as string[]) {
        await wait(500);
        if (!mountedRef.current) return;
        pushBot(line);
      }
      saveLastQuestion(questionText, json.lines as string[]);

      const [usageAfter, dailyLimit] = await Promise.all([incrementUsageToday(), getDailyLimit()]);
      await wait(700);
      if (!mountedRef.current) return;

      if (usageAfter >= dailyLimit) {
        pushLimitReachedMessage();
      } else {
        pushBot(strings.qa.askOneMore);
        pushCategoryPicker();
      }
      setBusy(false);
    } catch {
      if (!mountedRef.current) return;
      setErrorText(strings.qa.errorNetwork);
      setRetryQuestion(questionText);
      setBusy(false);
    }
  }

  function handlePickCategory(cat: Category) {
    setActiveCategory(cat);
    setView("subcategory");
  }

  function handlePickSubcategory(sub: Subcategory) {
    setActiveSubcategory(sub);
    setView("question");
  }

  function handleSelectQuestion(q: Question) {
    const questionText = localizedText(q.text_ko, q.text_en, q.text_es, locale);
    setView("chat");
    pushUser(questionText);
    requestAnswer(questionText);
  }

  function handleRetry() {
    setErrorText(null);
    if (retryQuestion) requestAnswer(retryQuestion);
  }

  async function unlockAfterEntitlementChange() {
    refreshRoutineNotification(strings).catch(() => {});
    await wait(500);
    if (!mountedRef.current) return;
    pushBot(strings.qa.promptCategory);
    pushCategoryPicker();
  }

  async function handleSubscribe() {
    if (purchasing || restoring) return;
    setPurchasing(true);
    setPurchaseNotice(null);
    const outcome = await purchaseQaPro();
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      pushBot(strings.qa.subscribeSuccess(PAID_DAILY_LIMIT));
      await unlockAfterEntitlementChange();
    } else if (outcome.status === "error") {
      setPurchaseNotice(strings.qa.purchaseErrorDefault);
    }
    // "cancelled" — the user backed out of the store sheet, nothing to say.
  }

  async function handleRestore() {
    if (purchasing || restoring) return;
    setRestoring(true);
    setPurchaseNotice(null);
    const restored = await restoreQaPro();
    if (!mountedRef.current) return;
    setRestoring(false);
    if (restored) {
      pushBot(strings.qa.restoreSuccess(PAID_DAILY_LIMIT));
      await unlockAfterEntitlementChange();
    } else {
      setPurchaseNotice(strings.qa.restoreNotFound);
    }
  }

  if (view === "subcategory" && activeCategory) {
    return <QASubcategoryScreen category={activeCategory} onBack={() => setView("chat")} onSelect={handlePickSubcategory} />;
  }
  if (view === "question" && activeSubcategory) {
    return <QAQuestionScreen subcategory={activeSubcategory} onBack={() => setView("subcategory")} onSelect={handleSelectQuestion} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={18} strokeWidth={2} color={COLORS.subheadline} />
        </Pressable>
        <Sparkles size={14} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={styles.headerLabel}>{strings.qa.headerLabel}</Text>
      </View>

      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {messages.map((m, i) => {
          if (m.role === "picker") {
            return (
              <View key={i} style={styles.pickerRow}>
                <View style={styles.pickerBubble}>
                  {CATEGORIES.map((cat) => (
                    <Pressable key={cat.id} style={styles.optionButton} onPress={() => handlePickCategory(cat)}>
                      <Text style={styles.optionLabel}>{localizedText(cat.name_ko, cat.name_en, cat.name_es, locale)}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            );
          }
          if (m.role === "subscribe") {
            return (
              <View key={i} style={styles.pickerRow}>
                <View style={styles.subscribeCard}>
                  <Pressable
                    style={[styles.subscribeButton, purchasing && styles.subscribeButtonDisabled]}
                    disabled={purchasing || restoring}
                    onPress={handleSubscribe}
                  >
                    <Text style={styles.subscribeButtonText}>
                      {purchasing ? strings.qa.subscribing : `${strings.qa.subscribeButton} · ${priceLabel}`}
                    </Text>
                  </Pressable>
                  <Pressable style={styles.restoreLink} disabled={purchasing || restoring} onPress={handleRestore}>
                    <Text style={styles.restoreLinkText}>{restoring ? strings.qa.restoring : strings.qa.restoreButton}</Text>
                  </Pressable>
                  {purchaseNotice && <Text style={styles.subscribeNoticeText}>{purchaseNotice}</Text>}
                </View>
              </View>
            );
          }
          return <ChatBubble key={i} role={m.role} text={m.text} />;
        })}

        {busy && !errorText && <TypingDots />}

        {errorText && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{errorText}</Text>
            <Pressable onPress={handleRetry} style={styles.retryButton}>
              <RefreshCw size={13} strokeWidth={2} color={COLORS.gold} />
              <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1C1B24",
  },
  backButton: {
    minHeight: 44,
    padding: 4,
    marginRight: 2,
  },
  headerLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 24,
  },
  pickerRow: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  pickerBubble: {
    width: "88%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
  },
  optionButton: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  optionLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: COLORS.headline,
  },
  subscribeCard: {
    width: "88%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 14,
    gap: 10,
  },
  subscribeButton: {
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },
  subscribeButtonDisabled: {
    opacity: 0.6,
  },
  subscribeButtonText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14.5,
    color: COLORS.ctaText,
  },
  restoreLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  restoreLinkText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12.5,
    color: COLORS.subheadline,
  },
  subscribeNoticeText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "#E0A296",
    textAlign: "center",
  },
  errorCard: {
    backgroundColor: "rgba(203,98,73,0.08)",
    borderWidth: 1,
    borderColor: "rgba(203,98,73,0.35)",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  errorText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: "#E0A296",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  retryLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12.5,
    color: COLORS.gold,
  },
});
