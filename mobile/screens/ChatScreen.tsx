import { ArrowLeft, Clock, Send, ShieldCheck, Sparkles } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
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
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { findTopAnswers } from "../lib/quiz/quizProfile";
import type { QuizDiagnosis } from "./QuizScreen";
import { COLORS } from "../theme/colors";

// TOTAL_TURNS/TIME_LIMIT_MINUTES/CHECKPOINT_TURN mirror lib/chatPrompts.ts's exports
// (web's server-side prompt builder) — that file isn't ported here since prompt building
// stays server-side; these are the only pieces the client needs, for the countdown display
// and for knowing which turn to show the continue/wrap-up choice after.
const TOTAL_TURNS = 20;
const TIME_LIMIT_MINUTES = 20;
const CHECKPOINT_TURN = 10;
const EARLY_FINISH_SECONDS = 7 * 60;

type Message = { role: "bot" | "user"; text: string };
type HistoryEntry = { role: "user" | "assistant"; content: string };

export type ChatExtract = Record<string, unknown>;

// Ported from components/ChatScreen.jsx (messenger style, 20-turn counseling chat after
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

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const revealLines = useCallback(async (lines: string[]) => {
    for (const line of lines) {
      if (!mountedRef.current) return;
      setIsTyping(true);
      const delay = Math.min(1800, 450 + line.length * 18);
      await new Promise((r) => setTimeout(r, delay));
      if (!mountedRef.current) return;
      setIsTyping(false);
      setMessages((m) => [...m, { role: "bot", text: line }]);
      await new Promise((r) => setTimeout(r, 180));
    }
  }, []);

  const requestNextTurn = useCallback(
    async (nextTurn: number, apiHistory: HistoryEntry[]) => {
      setIsTyping(true);
      setErrorText(null);

      const activeDimension = quizDiagnosis.classification.activeDimensions[0] ?? null;
      const headlineAnswerRaw = activeDimension ? findTopAnswers(quizDiagnosis.answers, activeDimension, 1)[0] : null;

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
              locale,
            },
            history: apiHistory,
            sessionId,
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
  const remainingSeconds = Math.max(0, TIME_LIMIT_MINUTES * 60 - elapsedSeconds);
  const timeUp = remainingSeconds <= 0;
  const countdownLabel = timeUp
    ? strings.chat.timeUpLabel
    : `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;
  const showCheckpoint = turn === CHECKPOINT_TURN && !checkpointDismissed && !done && !isTyping && !errorText;
  const canFinishEarly = !done && !isTyping && !errorText && !showCheckpoint && elapsedSeconds >= EARLY_FINISH_SECONDS;
  const showTextInput = !isTyping && !done && !errorText && !showCheckpoint;

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.header}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
            <ArrowLeft size={18} strokeWidth={2} color={COLORS.subheadline} />
          </Pressable>
          <Sparkles size={14} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={styles.headerLabel}>{strings.chat.headerLabel}</Text>
          {!done && (
            <View style={styles.countdown}>
              <Clock size={12} strokeWidth={2} color={remainingSeconds <= 60 ? "#CB6249" : COLORS.footer} />
              <Text style={[styles.countdownLabel, remainingSeconds <= 60 && styles.countdownLabelWarn]}>{countdownLabel}</Text>
            </View>
          )}
        </View>

        <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {messages.map((m, i) => (
            <View key={i} style={[styles.bubbleRow, m.role === "user" ? styles.bubbleRowUser : styles.bubbleRowBot]}>
              <View style={m.role === "user" ? styles.bubbleUser : styles.bubbleBot}>
                <Text style={m.role === "user" ? styles.bubbleTextUser : styles.bubbleTextBot}>{m.text}</Text>
              </View>
            </View>
          ))}

          {isTyping && <TypingDots />}

          {errorText && !isTyping && (
            <View style={styles.errorCard}>
              <Text style={styles.errorText}>{errorText}</Text>
              <Pressable onPress={handleRetry} style={styles.retryButton}>
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
            <Pressable style={styles.checkpointButtonSecondary} onPress={handleWrapUpAtCheckpoint}>
              <Text style={styles.checkpointButtonSecondaryLabel}>{strings.chat.checkpointFinishButton}</Text>
            </Pressable>
            <Pressable style={styles.checkpointButtonPrimary} onPress={handleContinueAtCheckpoint}>
              <Text style={styles.checkpointButtonPrimaryLabel}>{strings.chat.checkpointContinueButton}</Text>
            </Pressable>
          </View>
        )}

        {canFinishEarly && (
          <View style={styles.finishRow}>
            <Pressable style={styles.finishButton} onPress={handleFinishEarly}>
              <ShieldCheck size={13} strokeWidth={2} color={COLORS.gold} />
              <Text style={styles.finishLabel}>{strings.chat.finishEarlyButton}</Text>
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
              placeholderTextColor={COLORS.disabledText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable style={styles.sendButton} onPress={handleSend}>
              <Send size={16} strokeWidth={2} color={COLORS.ctaText} />
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
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
    borderBottomColor: "#1C1B24",
  },
  backButton: {
    padding: 4,
    marginRight: 2,
  },
  headerLabel: {
    flex: 1,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  countdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  countdownLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: COLORS.footer,
  },
  countdownLabelWarn: {
    color: "#CB6249",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 12,
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
    alignSelf: "flex-start",
  },
  retryLabel: {
    fontFamily: "Manrope_600SemiBold",
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
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: COLORS.footer,
  },
  finishRow: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
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
    fontFamily: "Manrope_600SemiBold",
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
    fontFamily: "Manrope_500Medium",
    fontSize: 13.5,
    color: "#C7C3D1",
  },
  finishButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  finishLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#C7C3D1",
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#1C1B24",
  },
  input: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
});
