import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import questionBank from "../data/questionBank.json";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { localizedText } from "../lib/qaBankLocale";
import { getDailyLimit, getUsageToday, incrementUsageToday, PAID_DAILY_LIMIT } from "../lib/qaQuota";
import { saveLastQuestion } from "../lib/qaHistory";
import type { NormalizedSajuResult } from "../lib/saju";
import { COLORS } from "../theme/colors";
import QAQuestionScreen from "./QAQuestionScreen";
import QASubcategoryScreen from "./QASubcategoryScreen";

type Question = { id: string; text_ko: string; text_en?: string; text_es?: string };
type Subcategory = { id: string; name_ko: string; name_en?: string; name_es?: string; questions: Question[] };
type Category = { id: string; name_ko: string; name_en?: string; name_es?: string; subcategories: Subcategory[] };

type Message = { role: "bot" | "user"; text: string } | { role: "picker" };

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
//     for a SUBSCRIPTION_PRICE_LABEL subscriber (see lib/qaQuota.ts for why the paid
//     side is a documented target, not a working purchase flow yet).
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
    pushBot(strings.qa.limitReached2(strings.qa.subscriptionPriceLabel, PAID_DAILY_LIMIT));
  }, [pushBot, strings]);

  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    (async () => {
      await wait(350);
      if (!mountedRef.current) return;
      pushBot(strings.qa.greeting1(nickname || strings.qa.defaultNickname));

      const usage = await getUsageToday();
      if (!mountedRef.current) return;
      if (usage >= getDailyLimit()) {
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

  async function requestAnswer(questionText: string) {
    setBusy(true);
    setErrorText(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/qa-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, question: questionText, sajuResult, sessionId, locale }),
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

      const usageAfter = await incrementUsageToday();
      await wait(700);
      if (!mountedRef.current) return;

      if (usageAfter >= getDailyLimit()) {
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

  if (view === "subcategory" && activeCategory) {
    return <QASubcategoryScreen category={activeCategory} onBack={() => setView("chat")} onSelect={handlePickSubcategory} />;
  }
  if (view === "question" && activeSubcategory) {
    return <QAQuestionScreen subcategory={activeSubcategory} onBack={() => setView("subcategory")} onSelect={handleSelectQuestion} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
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
          return (
            <View key={i} style={[styles.bubbleRow, m.role === "user" ? styles.bubbleRowUser : styles.bubbleRowBot]}>
              <View style={m.role === "user" ? styles.bubbleUser : styles.bubbleBot}>
                <Text style={m.role === "user" ? styles.bubbleTextUser : styles.bubbleTextBot}>{m.text}</Text>
              </View>
            </View>
          );
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

function TypingDots() {
  const anims = useRef([0, 1, 2].map(() => new Animated.Value(0.2))).current;

  useEffect(() => {
    const loops = anims.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(v, { toValue: 1, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0.2, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.delay((2 - i) * 150),
        ])
      )
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [anims]);

  return (
    <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
      <View style={[styles.bubbleBot, styles.typingBubble]}>
        {anims.map((v, i) => (
          <Animated.View key={i} style={[styles.typingDot, { opacity: v }]} />
        ))}
      </View>
    </View>
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
  bubbleRow: {
    marginBottom: 10,
    flexDirection: "row",
  },
  bubbleRowUser: {
    justifyContent: "flex-end",
  },
  bubbleRowBot: {
    justifyContent: "flex-start",
  },
  bubbleBot: {
    maxWidth: "82%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  bubbleUser: {
    maxWidth: "82%",
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  bubbleTextBot: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14.5,
    lineHeight: 22,
    color: COLORS.headline,
  },
  bubbleTextUser: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14.5,
    lineHeight: 22,
    color: COLORS.ctaText,
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
  typingBubble: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  typingDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.subheadline,
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
