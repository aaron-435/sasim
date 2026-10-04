import { useReplyScroll } from "../lib/useReplyScroll";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Send from "lucide-react-native/icons/send";
import ShieldCheck from "lucide-react-native/icons/shield-check";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/AppText";
import { ChatBubble, TypingDots } from "../components/ChatBubbles";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { findTopAnswers, findTopAnswersOverall } from "../lib/quiz/quizProfile";
import type { QuizDiagnosis } from "./QuizScreen";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

// TOTAL_TURNS/TIME_LIMIT_MINUTES/CHECKPOINT_TURN mirror lib/chatPrompts.ts's exports
// (web's server-side prompt builder) — that file isn't ported here since prompt building
// stays server-side; these are the only pieces the client needs, for the set progress label
// and for knowing which turn to show the continue/wrap-up choice after.
// 2026-10-04: no visible clock. A ticking MM:SS that turned red in the last minute put
// pressure on an emotional conversation (PRODUCT: no fake urgency timers); the header shows
// which of the five sets the user is in instead. The server keeps its own time budget.
// 2026-10-02: the app always sends flowVersion 2 (5 sets × 5 turns), so these mirror
// TOTAL_TURNS_V2 / TIME_LIMIT_MINUTES_V2, not the 20/20 the web chat still uses.
const FLOW_VERSION = 2;
const TOTAL_TURNS = 25;
const TURNS_PER_SET = 5;
// The server still wraps a v2 chat up at 30 minutes and starts steering toward it at 27
// (lib/chatPrompts.ts buildTimeNoticeV2). From that point the header says so in words, so the
// ending isn't a surprise; no countdown, no warning colour.
const WRAP_UP_SECONDS = 27 * 60;
const CHECKPOINT_TURN = 10;
const EARLY_FINISH_SECONDS = 7 * 60;

type Message = { role: "bot" | "user"; text: string };
type HistoryEntry = { role: "user" | "assistant"; content: string };

export type ChatExtract = Record<string, unknown>;

// Ported from components/ChatScreen.jsx (messenger style, 25-turn counseling chat after
// a quiz module). The opener (turn 1) fires automatically on mount, same as web.
export default function ChatScreen({
  nickname,
  sessionId,
  quizDiagnosis,
  onComplete,
  onBack,
}: {
  nickname: string;
  sessionId: string;
  quizDiagnosis: QuizDiagnosis;
  onComplete: (extract: ChatExtract) => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [turn, setTurn] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [checkpointDismissed, setCheckpointDismissed] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const scrollRef = useRef<ScrollView>(null);
  const sessionStartedAt = useRef(Date.now()).current;
  const doneRef = useRef(false);
  const turnHistoryRef = useRef<HistoryEntry[]>([]);
  // The server's hidden counselor memo from the last successful reply (lib/chatPrompts.ts's
  // ChatFormulation, TODO Q1-c). Opaque here: never rendered, never saved, only echoed back on the
  // next request so the bot keeps building on one hypothesis. A failed request leaves it untouched,
  // so a retry resends the same memo.
  const formulationRef = useRef<unknown>(undefined);
  const mountedRef = useRef(true);
  const openerFiredRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [done]);

  // Opening the keyboard hides the bottom of the conversation — usually the bot's last question.
  // Bring the latest message back into view when the input is focused / the keyboard appears.
  const scrollToLatest = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 250);
  }, []);
  useEffect(() => {
    const sub = Keyboard.addListener("keyboardDidShow", scrollToLatest);
    return () => sub.remove();
  }, [scrollToLatest]);

  const onBubbleLayout = useReplyScroll(scrollRef, messages.map((m) => m.role));

  const revealLines = useCallback(async (lines: string[]) => {
    for (const line of lines) {
      if (!mountedRef.current) return;
      setIsTyping(true);
      const delay = Math.min(2600, 700 + line.length * 24);
      await new Promise((r) => setTimeout(r, delay));
      if (!mountedRef.current) return;
      setIsTyping(false);
      setMessages((m) => [...m, { role: "bot", text: line }]);
      await new Promise((r) => setTimeout(r, 300));
    }
  }, []);

  const requestNextTurn = useCallback(
    async (nextTurn: number, apiHistory: HistoryEntry[]) => {
      setIsTyping(true);
      setErrorText(null);

      const activeDimension = quizDiagnosis.classification.activeDimensions[0] ?? null;
      const headlineAnswerRaw = activeDimension ? findTopAnswers(quizDiagnosis.answers, activeDimension, 1)[0] : null;
      // 4개 턴(감정·반복패턴·의미·대처)에 나눠 인용할 재료 — 오프닝(headlineAnswerRaw)과
      // 문항이 겹치지 않는 것 중 점수 상위 최대 4개. lib/chatPrompts.ts의
      // QUIZ_QUOTE_TURN_INDEX가 이 배열의 순서를 턴 번호에 고정 배정한다.
      const quizAnswerPool = findTopAnswersOverall(quizDiagnosis.answers, 6)
        .filter((a) => a.qId !== headlineAnswerRaw?.qId)
        .slice(0, 4)
        .map((a) => ({ prompt: a.prompt, label: a.label }));
      // flowVersion 2: all 30 answers in the user's locale. The server picks each set's ① quote
      // from these (lib/chatSets.ts) and sanitizes them; quizAnswer/quizAnswerPool above stay
      // for its 20-turn fallback.
      const quizAnswers = quizDiagnosis.answers.map((a) => ({
        qId: a.qId,
        dimension: a.dimension,
        prompt: a.prompt,
        label: a.label,
        score: a.score,
      }));

      try {
        const res = await fetch(`${API_BASE_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            turnNumber: nextTurn,
            sessionStartedAt,
            context: {
              track: quizDiagnosis.track,
              sajuElements: quizDiagnosis.elements ?? { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 },
              dominantSajuElement: quizDiagnosis.dominantElement ?? "wood",
              psychTestType: quizDiagnosis.typeInfo?.title ?? "",
              psychTestSummary: quizDiagnosis.nuancedSummary ?? "",
              quizAnswer: headlineAnswerRaw ? { prompt: headlineAnswerRaw.prompt, label: headlineAnswerRaw.label } : null,
              quizAnswerPool,
              moduleId: quizDiagnosis.moduleId,
              locale,
              flowVersion: FLOW_VERSION,
              quizAnswers,
            },
            history: apiHistory,
            sessionId,
            formulation: formulationRef.current,
          }),
        });
        const json = await res.json();
        if (!mountedRef.current) return;

        if (!res.ok) {
          setIsTyping(false);
          setErrorText(json.error || strings.chat.errorDefault);
          return;
        }

        const lines: string[] = Array.isArray(json.lines) ? json.lines : [];
        await revealLines(lines);
        if (!mountedRef.current) return;

        turnHistoryRef.current = [...apiHistory, { role: "assistant", content: lines.join(" ") }];
        formulationRef.current = json.formulation ?? undefined;
        setTurn(nextTurn);

        if (json.extract) {
          doneRef.current = true;
          setDone(true);
          setTimeout(() => onComplete(json.extract), 1200);
        }
      } catch {
        if (!mountedRef.current) return;
        setIsTyping(false);
        setErrorText(strings.chat.errorNetwork);
      }
    },
    [quizDiagnosis, onComplete, revealLines, sessionStartedAt, sessionId, strings, locale]
  );

  useEffect(() => {
    if (openerFiredRef.current) return;
    openerFiredRef.current = true;
    requestNextTurn(1, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSend() {
    const text = input.trim();
    if (!text || isTyping || doneRef.current) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    const nextHistory: HistoryEntry[] = [...turnHistoryRef.current, { role: "user", content: text }];
    turnHistoryRef.current = nextHistory;
    requestNextTurn(turn + 1, nextHistory);
  }

  function handleRetry() {
    requestNextTurn(turn + 1, turnHistoryRef.current);
  }

  function handleFinishEarly() {
    if (isTyping || done) return;
    requestNextTurn(TOTAL_TURNS, turnHistoryRef.current);
  }

  // The mid-conversation checkpoint (see lib/chatPrompts.ts's CHECKPOINT_TURN doc comment)
  // — right after that turn's reply, offer an explicit choice instead of the normal text
  // input. "마무리" reuses the exact same requestNextTurn(TOTAL_TURNS, ...) path as the
  // pre-existing "다 얘기했어요" button, jumping straight to the closing turn. "계속" just
  // dismisses the choice so the normal input reappears — checkpointDismissed only ever
  // needs to flip true once, since CHECKPOINT_TURN is a single fixed turn number.
  function handleContinueAtCheckpoint() {
    setCheckpointDismissed(true);
  }

  function handleWrapUpAtCheckpoint() {
    if (isTyping || done) return;
    requestNextTurn(TOTAL_TURNS, turnHistoryRef.current);
  }

  const elapsedSeconds = Math.max(0, Math.floor((now - sessionStartedAt) / 1000));
  const totalSets = TOTAL_TURNS / TURNS_PER_SET;
  const wrappingUp = elapsedSeconds >= WRAP_UP_SECONDS;
  const currentSet = Math.min(totalSets, Math.max(1, Math.ceil(Math.max(turn, 1) / TURNS_PER_SET)));
  const showCheckpoint = turn === CHECKPOINT_TURN && !checkpointDismissed && !done && !isTyping && !errorText;
  const canFinishEarly =
    !done && !isTyping && !errorText && !showCheckpoint && (turn > CHECKPOINT_TURN || elapsedSeconds >= EARLY_FINISH_SECONDS);
  // Stays on screen while the bot is still writing (sending is blocked until it finishes): removing it
  // for every bubble made the input row flicker away and back several times per reply.
  const showTextInput = !done && !errorText && !showCheckpoint;

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <View style={styles.header}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
            <ArrowLeft size={18} strokeWidth={2} color={COLORS.subheadline} />
          </Pressable>
          <Sparkles size={14} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={styles.headerLabel} numberOfLines={1} ellipsizeMode="tail">
            {strings.chat.headerLabel}
          </Text>
          {!done && (
            <View
              style={styles.countdown}
              accessible
              accessibilityLabel={wrappingUp ? strings.chat.timeUpLabel : strings.chat.setProgressA11y(currentSet, totalSets)}
            >
              <Text style={styles.countdownLabel}>{wrappingUp ? strings.chat.timeUpLabel : strings.chat.setProgress(currentSet, totalSets)}</Text>
            </View>
          )}
          {canFinishEarly && (
            <Pressable
              onPress={handleFinishEarly}
              hitSlop={8}
              style={styles.headerFinishButton}
              accessibilityRole="button"
              accessibilityLabel={strings.chat.finishEarlyButton}
            >
              <ShieldCheck size={12} strokeWidth={2} color={COLORS.gold} />
              <Text style={styles.headerFinishLabel}>{strings.chat.finishEarlyButton}</Text>
            </Pressable>
          )}
        </View>

        <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {messages.map((m, i) => (
            <View key={i} onLayout={onBubbleLayout(i)}>
              <ChatBubble role={m.role} text={m.text} />
            </View>
          ))}

          {isTyping && <TypingDots />}

          {errorText && !isTyping && (
            <View style={styles.errorCard}>
              <Text style={styles.errorText}>{errorText}</Text>
              <Pressable onPress={handleRetry} style={styles.retryButton} accessibilityRole="button">
                <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
              </Pressable>
            </View>
          )}

          {done && (
            <View style={styles.doneBadge}>
              <ShieldCheck size={12} strokeWidth={2} color={COLORS.footer} />
              <Text style={styles.doneBadgeLabel}>{strings.chat.doneBadge}</Text>
            </View>
          )}
        </ScrollView>

        {showCheckpoint && (
          <View style={styles.checkpointRow}>
            <Pressable style={styles.checkpointButtonSecondary} onPress={handleWrapUpAtCheckpoint} accessibilityRole="button">
              <Text style={styles.checkpointButtonSecondaryLabel}>{strings.chat.checkpointFinishButton}</Text>
            </Pressable>
            <Pressable style={styles.checkpointButtonPrimary} onPress={handleContinueAtCheckpoint} accessibilityRole="button">
              <Text style={styles.checkpointButtonPrimaryLabel}>{strings.chat.checkpointContinueButton}</Text>
            </Pressable>
          </View>
        )}

        {showTextInput && (
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder={strings.chat.inputPlaceholder}
              placeholderTextColor={COLORS.placeholder}
              onSubmitEditing={handleSend}
              onFocus={scrollToLatest}
              returnKeyType="send"
            />
            <Pressable style={[styles.sendButton, isTyping && styles.sendButtonBusy]} onPress={handleSend} disabled={isTyping} accessibilityRole="button" accessibilityLabel={strings.chat.sendLabel} accessibilityState={{ disabled: isTyping }}>
              <Send size={16} strokeWidth={2} color={COLORS.ctaText} />
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
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
  headerLabel: {
    flex: 1,
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.gold,
  },
  countdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  countdownLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.footer,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 12,
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
    alignSelf: "flex-start",
  },
  retryLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12.5,
    color: COLORS.gold,
  },
  doneBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  doneBadgeLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.footer,
  },
  headerFinishButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerFinishLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    color: COLORS.headline,
  },
  checkpointRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  checkpointButtonPrimary: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: 999,
    paddingVertical: 13,
  },
  checkpointButtonPrimaryLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 13.5,
    color: COLORS.ctaText,
  },
  checkpointButtonSecondary: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 13,
  },
  checkpointButtonSecondaryLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13.5,
    color: COLORS.headline,
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sendButtonBusy: { opacity: 0.45 },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
});
