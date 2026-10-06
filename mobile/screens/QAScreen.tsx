import { useReplyScroll } from "../lib/useReplyScroll";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import RefreshCw from "lucide-react-native/icons/refresh-cw";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { ChatBubble, TypingDots } from "../components/ChatBubbles";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { localizedText } from "../lib/qaBankLocale";
import { getDailyLimit, getUsageToday, incrementUsageToday, isSubscribed, PAID_DAILY_LIMIT } from "../lib/qaQuota";
import { getRevenueCatUserId, isUnavailableMessage, purchaseIssueDetail, purchaseQaPro, restoreQaPro } from "../lib/purchases";
import { useSubscriptionOffer } from "../lib/useSubscriptionOffer";
import PlanPicker from "../components/PlanPicker";
import { refreshRoutineNotification } from "../lib/routineNotification";
import { recordQaTopic, saveLastQuestion } from "../lib/qaHistory";
import { onlySubcategory, PERSON_SUBCATEGORY, QA_TOPIC_GROUPS, type QaQuestion, type QaSubcategory, type QaTopicGroup } from "../lib/qaTopicGroups";
import type { NormalizedSajuResult } from "../lib/saju";
import { COLORS } from "../theme/colors";
import QAQuestionScreen from "./QAQuestionScreen";
import QASubcategoryScreen from "./QASubcategoryScreen";
import QAPersonFormScreen from "./QAPersonFormScreen";
import { useOtherBirthForm, type OtherBirthPayload } from "../components/OtherBirthForm";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import FeedbackRow from "../components/FeedbackRow";
import { track } from "../lib/analytics";

// "그 사람에 대해 묻기": which fixed question, and the other person's birth data for this answer.
type PersonAsk = { questionId: string; other: OtherBirthPayload };

type Message = { role: "bot" | "user"; text: string } | { role: "picker" } | { role: "subscribe" } | { role: "feedback"; topic?: string };

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
  const [view, setView] = useState<"chat" | "subcategory" | "question" | "person">("chat");
  const [activeGroup, setActiveGroup] = useState<QaTopicGroup | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<QaSubcategory | null>(null);
  // Today's count for the header ("N of M left today"); null until storage has answered.
  const [quota, setQuota] = useState<{ used: number; limit: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [retryQuestion, setRetryQuestion] = useState<{ text: string; person?: PersonAsk } | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);
  const offer = useSubscriptionOffer();
  // The other person's birth data — kept here (not in the form screen) so it survives
  // going to the question list and back, and a second question about the same person.
  const personForm = useOtherBirthForm();
  const priceLabel = offer.priceLabel;
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
    track("paywall_view", { surface: "qa" });
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
      setQuota({ used: usage, limit: dailyLimit });
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

  const onBubbleLayout = useReplyScroll(scrollRef, messages.map((m) => m.role));

  // A group with a single subcategory (today) skips the subcategory screen, so its
  // question list steps back straight to the chat. The person topic steps back to its form.
  const questionBackView = activeGroup?.id === "person" ? "person" : activeGroup && onlySubcategory(activeGroup) ? "chat" : "subcategory";

  // Android hardware back inside the category/question pickers steps back one level,
  // same as their on-screen back buttons, instead of App.tsx's handler dropping the
  // user all the way to Home. Added after App's listener, so RN asks this one first.
  useEffect(() => {
    if (view === "chat") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      setView(view === "question" ? questionBackView : "chat");
      return true;
    });
    return () => sub.remove();
  }, [view, questionBackView]);

  async function requestAnswer(questionText: string, topic?: string, person?: PersonAsk) {
    setBusy(true);
    setErrorText(null);
    try {
      // The person path is subscriber-only and the server checks that itself (RevenueCat).
      const personFields = person ? { ...person, appUserId: await getRevenueCatUserId() } : {};
      const res = await fetch(`${API_BASE_URL}/api/qa-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, question: questionText, sajuResult, sessionId, locale, platform: "mobile", ...personFields }),
      });
      const json = await res.json();
      if (!mountedRef.current) return;

      if (!res.ok) {
        const verifyFailed = person && (json.code === "no_user" || json.code === "not_subscribed" || json.code === "unavailable");
        setErrorText(verifyFailed ? strings.qa.personVerifyError : json.error || strings.qa.errorDefault);
        setRetryQuestion({ text: questionText, person });
        setBusy(false);
        return;
      }

      for (const line of json.lines as string[]) {
        await wait(500);
        if (!mountedRef.current) return;
        pushBot(line);
      }
      saveLastQuestion(questionText, json.lines as string[]);
      if (topic) recordQaTopic(topic);
      setMessages((m) => [...m, { role: "feedback", topic }]);

      const [usageAfter, dailyLimit] = await Promise.all([incrementUsageToday(), getDailyLimit()]);
      if (!mountedRef.current) return;
      setQuota({ used: usageAfter, limit: dailyLimit });
      await wait(700);
      if (!mountedRef.current) return;

      if (usageAfter >= dailyLimit) {
        track("qa_limit_reached");
        pushLimitReachedMessage();
      } else {
        pushBot(strings.qa.askOneMore);
        pushCategoryPicker();
      }
      setBusy(false);
    } catch {
      if (!mountedRef.current) return;
      setErrorText(strings.qa.errorNetwork);
      setRetryQuestion({ text: questionText, person });
      setBusy(false);
    }
  }

  async function handlePickPerson(group: QaTopicGroup) {
    if (await isSubscribed()) {
      if (!mountedRef.current) return;
      setActiveGroup(group);
      setActiveSubcategory(PERSON_SUBCATEGORY);
      setView("person");
      return;
    }
    if (!mountedRef.current) return;
    // Not subscribed: say what it is and show the same subscribe card, once in a row.
    setMessages((m) => {
      if (m[m.length - 1]?.role === "subscribe") return m;
      return [...m, { role: "bot", text: strings.qa.personLocked }, { role: "subscribe" }];
    });
    track("paywall_view", { surface: "qa_person" });
  }

  function handlePickGroup(group: QaTopicGroup) {
    if (group.id === "person") {
      handlePickPerson(group);
      return;
    }
    setActiveGroup(group);
    const only = onlySubcategory(group);
    if (only) {
      setActiveSubcategory(only);
      setView("question");
    } else {
      setView("subcategory");
    }
  }

  function handlePickSubcategory(sub: QaSubcategory) {
    setActiveSubcategory(sub);
    setView("question");
  }

  function handleSelectQuestion(q: QaQuestion) {
    const questionText = localizedText(q.text_ko, q.text_en, q.text_es, locale);
    setView("chat");
    pushUser(questionText);
    track("qa_ask", activeGroup ? { topic: activeGroup.id } : undefined);
    const person = activeGroup?.id === "person" ? { questionId: q.id, other: personForm.toPayload() } : undefined;
    requestAnswer(questionText, activeGroup?.id, person);
  }

  function handleRetry() {
    setErrorText(null);
    if (retryQuestion) requestAnswer(retryQuestion.text, activeGroup?.id, retryQuestion.person);
  }

  async function unlockAfterEntitlementChange() {
    refreshRoutineNotification(strings).catch(() => {});
    Promise.all([getUsageToday(), getDailyLimit()]).then(([used, limit]) => {
      if (mountedRef.current) setQuota({ used, limit });
    });
    await wait(500);
    if (!mountedRef.current) return;
    pushBot(strings.qa.promptCategory);
    pushCategoryPicker();
  }

  async function handleSubscribe() {
    if (purchasing || restoring) return;
    setPurchasing(true);
    setPurchaseNotice(null);
    const outcome = await purchaseQaPro(offer.selectedId);
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      pushBot(strings.qa.subscribeSuccess(PAID_DAILY_LIMIT));
      await unlockAfterEntitlementChange();
    } else if (outcome.status === "error") {
      setPurchaseNotice(`${strings.qa.purchaseErrorDefault}${(isUnavailableMessage(outcome.message) ? purchaseIssueDetail(outcome.message) : outcome.message) ? `\n(${(isUnavailableMessage(outcome.message) ? purchaseIssueDetail(outcome.message) : outcome.message).slice(0, 200)})` : ""}`);
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

  if (view === "person") {
    return <QAPersonFormScreen form={personForm} onBack={() => setView("chat")} onNext={() => setView("question")} />;
  }
  if (view === "subcategory" && activeGroup) {
    return <QASubcategoryScreen group={activeGroup} onBack={() => setView("chat")} onSelect={handlePickSubcategory} />;
  }
  if (view === "question" && activeSubcategory) {
    return <QAQuestionScreen subcategory={activeSubcategory} onBack={() => setView(questionBackView)} onSelect={handleSelectQuestion} />;
  }

  // The paid cap doubles as "is subscribed" here, so the person topic's badge needs no extra lookup.
  const isSubscriber = quota?.limit === PAID_DAILY_LIMIT;
  const remainingLabel = quota ? strings.qa.remainingToday(Math.max(0, quota.limit - quota.used), quota.limit) : null;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={18} strokeWidth={2} color={COLORS.subheadline} />
        </Pressable>
        <View style={styles.headerText}>
          <View style={styles.headerTitleRow}>
            <Sparkles size={14} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.headerLabel} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.headerLabel}</Text>
          </View>
          {remainingLabel && (
            <Text style={styles.remaining} accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
              {remainingLabel}
            </Text>
          )}
        </View>
      </View>

      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {messages.map((m, i) => {
          if (m.role === "picker") {
            return (
              <View key={i} style={styles.pickerRow}>
                <View style={styles.pickerBubble}>
                  {QA_TOPIC_GROUPS.map((group) => (
                    <Pressable
                      key={group.id}
                      style={styles.optionButton}
                      onPress={() => handlePickGroup(group)}
                      accessibilityRole="button"
                      accessibilityLabel={group.id === "person" && !isSubscriber ? `${strings.qa.topicGroups[group.id]}, ${strings.qa.personBadge}` : strings.qa.topicGroups[group.id]}
                    >
                      <View style={styles.optionRow}>
                        <Text style={styles.optionLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.topicGroups[group.id]}</Text>
                        {group.id === "person" && !isSubscriber && (
                          <Text style={styles.optionBadge} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.personBadge}</Text>
                        )}
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            );
          }
          if (m.role === "feedback") {
            return (
              <View key={i} style={styles.feedbackRow}>
                <FeedbackRow surface="qa" topic={m.topic} />
              </View>
            );
          }
          if (m.role === "subscribe") {
            return (
              <View key={i} style={styles.pickerRow}>
                <View style={styles.subscribeCard}>
                  <PlanPicker offer={offer} disabled={purchasing || restoring} />
                  <Pressable
                    style={[styles.subscribeButton, purchasing && styles.subscribeButtonDisabled]}
                    disabled={purchasing || restoring}
                    onPress={handleSubscribe}
                    accessibilityRole="button"
                    accessibilityLabel={purchasing ? strings.qa.subscribing : offer.buttonLabel}
                    accessibilityState={{ disabled: purchasing || restoring, busy: purchasing }}
                  >
                    <Text style={styles.subscribeButtonText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                      {purchasing ? strings.qa.subscribing : offer.buttonLabel}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.restoreLink}
                    disabled={purchasing || restoring}
                    onPress={handleRestore}
                    accessibilityRole="button"
                    accessibilityLabel={restoring ? strings.qa.restoring : strings.qa.restoreButton}
                  >
                    <Text style={styles.restoreLinkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{restoring ? strings.qa.restoring : strings.qa.restoreButton}</Text>
                  </Pressable>
                  {!!offer.trialLine && <Text style={styles.renewNoteText} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{offer.renewNote}</Text>}
                  {purchaseNotice && <Text style={styles.subscribeNoticeText} accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{purchaseNotice}</Text>}
                </View>
              </View>
            );
          }
          return (
            <View key={i} onLayout={onBubbleLayout(i)}>
              <ChatBubble role={m.role} text={m.text} />
            </View>
          );
        })}

        {busy && !errorText && <TypingDots />}

        {errorText && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText} accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{errorText}</Text>
            <Pressable onPress={handleRetry} style={styles.retryButton} accessibilityRole="button" accessibilityLabel={strings.common.retryLabel}>
              <RefreshCw size={13} strokeWidth={2} color={COLORS.gold} />
              <Text style={styles.retryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.retryLabel}</Text>
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
    borderBottomColor: COLORS.border,
  },
  backButton: {
    minHeight: 44,
    padding: 4,
    marginRight: 2,
  },
  headerText: {
    flex: 1,
    gap: 3,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerLabel: {
    flexShrink: 1,
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.gold,
  },
  remaining: {
    paddingLeft: 22,
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.subheadline,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 24,
  },
  feedbackRow: {
    width: "88%",
    marginTop: -2,
    marginBottom: 10,
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
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  optionLabel: {
    flexShrink: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.headline,
  },
  optionBadge: {
    fontFamily: FONTS.semibold,
    fontSize: 11,
    letterSpacing: 0.2,
    color: COLORS.gold,
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
    fontFamily: FONTS.semibold,
    fontSize: 14.5,
    color: COLORS.ctaText,
  },
  restoreLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  restoreLinkText: {
    fontFamily: FONTS.medium,
    fontSize: 12.5,
    color: COLORS.subheadline,
  },
  renewNoteText: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    lineHeight: 17,
    color: COLORS.subheadline,
    textAlign: "center",
  },
  subscribeNoticeText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.danger,
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
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.danger,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  retryLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12.5,
    color: COLORS.gold,
  },
});
