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
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/AppText";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { ChatBubble, TypingDots } from "../components/ChatBubbles";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import { getChatFlow, setNumberForTurnV3, SKIP_ANSWER_TEXT } from "../lib/chatFlow";
import { useLocale, useStrings } from "../lib/i18n";
import { findTopAnswers, findTopAnswersOverall } from "../lib/quiz/quizProfile";
import type { QuizDiagnosis } from "./QuizScreen";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { RADIUS, SPACE, SURFACE } from "../theme/tokens";

// TOTAL_TURNS/TIME_LIMIT_MINUTES/CHECKPOINT_TURN mirror lib/chatPrompts.ts's exports
// (web's server-side prompt builder) — that file isn't ported here since prompt building
// stays server-side; these are the only pieces the client needs, for the set progress label
// and for knowing which turn to show the continue/wrap-up choice after.
// 2026-10-04: no visible clock. A ticking MM:SS that turned red in the last minute put
// pressure on an emotional conversation (PRODUCT: no fake urgency timers); the header shows
// which of the five sets the user is in instead. The server keeps its own time budget.
// 2026-10-02: the app always sends flowVersion 2 (5 sets × 5 turns), so these mirror
// TOTAL_TURNS_V2 / TIME_LIMIT_MINUTES_V2, not the 20/20 the web chat still uses.
// 2026-10-20: FLOW_VERSION / TOTAL_TURNS / CHECKPOINT_TURN now come from
// lib/chatFlow.ts (dev-only `?chat=3` switch for the flowVersion 3 prototype);
// TURNS_PER_SET stays 5 for the v2 header math, v3 uses setNumberForTurnV3.
const TURNS_PER_SET = 5;
// The server still wraps a v2 chat up at 30 minutes and starts steering toward it at 27
// (lib/chatPrompts.ts buildTimeNoticeV2). From that point the header says so in words, so the
// ending isn't a surprise; no countdown, no warning colour.
const WRAP_UP_SECONDS = 27 * 60;
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
  // 2026-10-20: v3 answer options for the last bot turn. Read once per mount so the
  // flow can't flip mid-conversation if the URL changes.
  const flow = useRef(getChatFlow()).current;
  const FLOW_VERSION = flow.flowVersion;
  const TOTAL_TURNS = flow.totalTurns;
  const CHECKPOINT_TURN = flow.checkpointTurn;
  const [choices, setChoices] = useState<string[] | null>(null);
  const [ownInputOpen, setOwnInputOpen] = useState(false);
  // 2026-10-21: v4 turn 21 — server sets `inputOnly`; input box + a small skip link, no chips.
  const [inputOnly, setInputOnly] = useState(false);
  const choicePicksRef = useRef<number[]>([]);
  const inputRef = useRef<TextInput>(null);
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
  // Set when the user wraps up before the last turn (button or checkpoint), for the chat_complete kind.
  const finishedEarlyRef = useRef(false);
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
      // 2026-10-20: a new turn in flight hides the old options until its own reply lands.
      setChoices(null);
      setOwnInputOpen(false);
      setInputOnly(false);

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
            // 2026-10-20: bot turn numbers answered by tapping a choice chip
            // (deduped, ascending). Top-level on purpose — the server forwards
            // history to OpenAI untouched. Always [] on v2.
            choicePicks: choicePicksRef.current,
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
        // 2026-10-12 device test: after "여기서 마무리할게요" the closing lines were typed out one
        // by one before the report, which read as a delay with nothing to do. The closing turn
        // (the one that carries `extract`) now hands over immediately.
        if (json.extract) {
          setIsTyping(false);
          turnHistoryRef.current = [...apiHistory, { role: "assistant", content: lines.join(" ") }];
          formulationRef.current = json.formulation ?? undefined;
          setTurn(nextTurn);
          doneRef.current = true;
          setDone(true);
          // kind: full = ran to the last turn on its own, early = the user chose to wrap up before it.
          track("chat_complete", { module: quizDiagnosis.moduleId, kind: nextTurn >= TOTAL_TURNS && !finishedEarlyRef.current ? "full" : "early" });
          onComplete(json.extract);
          return;
        }
        await revealLines(lines);
        if (!mountedRef.current) return;

        turnHistoryRef.current = [...apiHistory, { role: "assistant", content: lines.join(" ") }];
        formulationRef.current = json.formulation ?? undefined;
        setTurn(nextTurn);
        // 2026-10-20: v3 answer options, shown only after the last bot bubble is
        // out. 2–3 strings or nothing; none on the checkpoint turn (its two
        // buttons are the options) — closing and error turns return above.
        const rawChoices: unknown = json.choices;
        setInputOnly(FLOW_VERSION === 4 && json.inputOnly === true);
        setChoices(
          nextTurn === CHECKPOINT_TURN ||
            !Array.isArray(rawChoices) ||
            rawChoices.length < 2 ||
            rawChoices.length > 3 ||
            !rawChoices.every((c): c is string => typeof c === "string")
            ? null
            : rawChoices
        );
      } catch {
        if (!mountedRef.current) return;
        setIsTyping(false);
        setErrorText(strings.chat.errorNetwork);
      }
    },
    [quizDiagnosis, onComplete, revealLines, sessionStartedAt, sessionId, strings, locale, FLOW_VERSION, TOTAL_TURNS, CHECKPOINT_TURN]
  );

  useEffect(() => {
    if (openerFiredRef.current) return;
    openerFiredRef.current = true;
    track("chat_start", { module: quizDiagnosis.moduleId });
    requestNextTurn(1, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSend() {
    const text = input.trim();
    if (!text || isTyping || doneRef.current) return;
    // 2026-10-12 device test: with the keyboard still open the bot's answer arrived behind it and
    // the user had to close the keyboard by hand to read it. Sending now closes the keyboard.
    Keyboard.dismiss();
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    const nextHistory: HistoryEntry[] = [...turnHistoryRef.current, { role: "user", content: text }];
    turnHistoryRef.current = nextHistory;
    // 2026-10-20: typed answers clear the chips without recording a pick.
    setChoices(null);
    setOwnInputOpen(false);
    requestNextTurn(turn + 1, nextHistory);
  }

  function handleRetry() {
    requestNextTurn(turn + 1, turnHistoryRef.current);
  }

  function handleFinishEarly() {
    if (isTyping || done) return;
    finishedEarlyRef.current = true;
    requestNextTurn(TOTAL_TURNS, turnHistoryRef.current);
  }

  // The mid-conversation checkpoint (see lib/chatPrompts.ts's CHECKPOINT_TURN doc comment)
  // — right after that turn's reply, offer an explicit choice instead of the normal text
  // input. "마무리" reuses the exact same requestNextTurn(TOTAL_TURNS, ...) path as the
  // pre-existing "다 얘기했어요" button, jumping straight to the closing turn. "계속" sends the
  // button's words as the user's reply and asks for the next turn right away: the server's
  // turn-11 instruction takes a short "let's continue" and opens the next set with a quiz-answer
  // question. (It used to only hide the buttons, leaving the user to answer "keep going or
  // stop?" by typing, with nothing new to talk about — 2026-10-04 device test.)
  function handleContinueAtCheckpoint() {
    if (isTyping || doneRef.current) return;
    setCheckpointDismissed(true);
    const text = strings.chat.checkpointContinueButton;
    setMessages((m) => [...m, { role: "user", text }]);
    const nextHistory: HistoryEntry[] = [...turnHistoryRef.current, { role: "user", content: text }];
    turnHistoryRef.current = nextHistory;
    requestNextTurn(turn + 1, nextHistory);
  }

  function handleWrapUpAtCheckpoint() {
    if (isTyping || done) return;
    finishedEarlyRef.current = true;
    requestNextTurn(TOTAL_TURNS, turnHistoryRef.current);
  }

  // 2026-10-20: v3 choice tap — same shape as handleContinueAtCheckpoint: the
  // tapped phrase becomes the user's bubble and the next turn is requested.
  // Records the answered bot turn so the server knows which turns were taps.
  function handleChoicePick(choice: string) {
    if (isTyping || doneRef.current) return;
    Keyboard.dismiss();
    setMessages((m) => [...m, { role: "user", text: choice }]);
    const nextHistory: HistoryEntry[] = [...turnHistoryRef.current, { role: "user", content: choice }];
    turnHistoryRef.current = nextHistory;
    if (!choicePicksRef.current.includes(turn)) {
      choicePicksRef.current = [...choicePicksRef.current, turn].sort((a, b) => a - b);
    }
    setChoices(null);
    setOwnInputOpen(false);
    requestNextTurn(turn + 1, nextHistory);
  }

  // 2026-10-21: skip on the input-only turn — sends the sentinel the server expects.
  function handleSkip() {
    if (isTyping || doneRef.current) return;
    Keyboard.dismiss();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: strings.chat.skipAnswer }]);
    const nextHistory: HistoryEntry[] = [...turnHistoryRef.current, { role: "user", content: SKIP_ANSWER_TEXT }];
    turnHistoryRef.current = nextHistory;
    setInputOnly(false);
    requestNextTurn(turn + 1, nextHistory);
  }

  // 2026-10-20: folds the chips away and focuses the text input instead.
  function handleWriteOwn() {
    if (isTyping || doneRef.current) return;
    setOwnInputOpen(true);
    inputRef.current?.focus();
  }

  const elapsedSeconds = Math.max(0, Math.floor((now - sessionStartedAt) / 1000));
  // 2026-10-20: v2 math untouched; v3 has 4-turn sets (see chatFlow.ts).
  const totalSets = FLOW_VERSION >= 3 ? 5 : TOTAL_TURNS / TURNS_PER_SET;
  const wrappingUp = elapsedSeconds >= WRAP_UP_SECONDS;
  const currentSet =
    FLOW_VERSION >= 3 ? setNumberForTurnV3(turn) : Math.min(totalSets, Math.max(1, Math.ceil(Math.max(turn, 1) / TURNS_PER_SET)));
  const showCheckpoint = turn === CHECKPOINT_TURN && !checkpointDismissed && !done && !isTyping && !errorText;
  const showChoices = choices !== null && !ownInputOpen && !isTyping && !done && !errorText && !showCheckpoint;
  const showSkip = inputOnly && !isTyping && !done && !errorText && !showCheckpoint;
  const canFinishEarly =
    !done && !isTyping && !errorText && !showCheckpoint && (turn > CHECKPOINT_TURN || elapsedSeconds >= EARLY_FINISH_SECONDS);
  // Stays on screen while the bot is still writing (sending is blocked until it finishes): removing it
  // for every bubble made the input row flicker away and back several times per reply.
  const showTextInput = !done && !errorText && !showCheckpoint;

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <Reveal index={0} style={styles.header}>
          <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
            <ArrowLeft size={18} strokeWidth={2} color={COLORS.subheadline} />
          </PressableScale>
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
            <PressableScale
              onPress={handleFinishEarly}
              hitSlop={8}
              style={styles.headerFinishButton}
              accessibilityRole="button"
              accessibilityLabel={strings.chat.finishEarlyButton}
            >
              <ShieldCheck size={12} strokeWidth={2} color={COLORS.gold} />
              <Text style={styles.headerFinishLabel}>{strings.chat.finishEarlyButton}</Text>
            </PressableScale>
          )}
        </Reveal>

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
              <PressableScale onPress={handleRetry} style={styles.retryButton} accessibilityRole="button" haptic="none">
                <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
              </PressableScale>
            </View>
          )}

          {done && (
            <View style={styles.doneBadge}>
              <ShieldCheck size={12} strokeWidth={2} color={COLORS.footer} />
              <Text style={styles.doneBadgeLabel}>{strings.chat.doneBadge}</Text>
            </View>
          )}
        </ScrollView>

        {showChoices && choices && (
          <Reveal index={1} style={styles.choiceRow}>
            <View style={styles.choiceChips} accessible accessibilityLabel={strings.chat.choicesA11y}>
              {choices.map((choice) => (
                <PressableScale key={choice} style={styles.choiceChip} onPress={() => handleChoicePick(choice)} accessibilityRole="button">
                  <Text style={styles.choiceChipLabel}>{choice}</Text>
                </PressableScale>
              ))}
              <PressableScale
                style={[styles.choiceChip, styles.choiceChipOwn]}
                onPress={handleWriteOwn}
                accessibilityRole="button"
                accessibilityLabel={strings.chat.writeOwnChoice}
              >
                <Text style={styles.choiceChipLabel}>{strings.chat.writeOwnChoice}</Text>
              </PressableScale>
            </View>
          </Reveal>
        )}

        {showCheckpoint && (
          <Reveal index={1} style={styles.checkpointRow}>
            <PressableScale style={styles.checkpointButtonSecondary} onPress={handleWrapUpAtCheckpoint} accessibilityRole="button">
              <Text style={styles.checkpointButtonSecondaryLabel}>{strings.chat.checkpointFinishButton}</Text>
            </PressableScale>
            <PressableScale style={styles.checkpointButtonPrimary} onPress={handleContinueAtCheckpoint} accessibilityRole="button">
              <Text style={styles.checkpointButtonPrimaryLabel}>{strings.chat.checkpointContinueButton}</Text>
            </PressableScale>
          </Reveal>
        )}

        {showSkip && (
          <View style={styles.skipRow}>
            <PressableScale onPress={handleSkip} hitSlop={8} accessibilityRole="button" accessibilityLabel={strings.chat.skipAnswer}>
              <Text style={styles.skipLabel}>{strings.chat.skipAnswer}</Text>
            </PressableScale>
          </View>
        )}

        {showTextInput && (
          <Reveal index={1} style={styles.inputRow}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder={strings.chat.inputPlaceholder}
              placeholderTextColor={COLORS.placeholder}
              onSubmitEditing={handleSend}
              onFocus={scrollToLatest}
              returnKeyType="send"
            />
            <PressableScale style={[styles.sendButton, isTyping && styles.sendButtonBusy]} onPress={handleSend} disabled={isTyping} accessibilityRole="button" accessibilityLabel={strings.chat.sendLabel} accessibilityState={{ disabled: isTyping }}>
              <Send size={16} strokeWidth={2} color={COLORS.ctaText} />
            </PressableScale>
          </Reveal>
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
    gap: SPACE.sm,
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.lg,
    borderBottomWidth: 1,
    borderBottomColor: SURFACE.hairline,
  },
  backButton: {
    minHeight: 44,
    padding: SPACE.xs,
    marginRight: SPACE.xs,
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
    gap: SPACE.xs,
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
    padding: SPACE.lg,
    paddingBottom: SPACE.md,
  },
  errorCard: {
    backgroundColor: "rgba(203,98,73,0.08)",
    borderWidth: 1,
    borderColor: "rgba(203,98,73,0.35)",
    borderRadius: RADIUS.sm,
    padding: SPACE.lg,
    gap: SPACE.md,
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
    gap: SPACE.sm,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.md,
    marginTop: SPACE.xl,
  },
  doneBadgeLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.footer,
  },
  headerFinishButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.xs,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.xs,
    paddingHorizontal: SPACE.md,
  },
  headerFinishLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    color: COLORS.headline,
  },
  checkpointRow: {
    flexDirection: "row",
    gap: SPACE.md,
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.md,
    paddingBottom: SPACE.xl,
    borderTopWidth: 1,
    borderTopColor: SURFACE.hairline,
  },
  checkpointButtonPrimary: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.md,
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
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.md,
  },
  checkpointButtonSecondaryLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13.5,
    color: COLORS.headline,
  },
  // 2026-10-20: v3 answer-option chips — same tone as checkpointButtonSecondary.
  choiceRow: {
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.md,
    paddingBottom: SPACE.xl,
    borderTopWidth: 1,
    borderTopColor: SURFACE.hairline,
  },
  choiceChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.sm,
  },
  choiceChip: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.lg,
  },
  skipRow: {
    alignItems: "flex-end",
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.sm,
  },
  skipLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.subheadline,
    textDecorationLine: "underline",
  },
  choiceChipOwn: {
    borderStyle: "dashed",
  },
  choiceChipLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13.5,
    color: COLORS.headline,
  },
  inputRow: {
    flexDirection: "row",
    gap: SPACE.sm,
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.md,
    paddingBottom: SPACE.xl,
    borderTopWidth: 1,
    borderTopColor: SURFACE.hairline,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.md,
  },
  sendButtonBusy: { opacity: 0.45 },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
});
