import { BookOpen, Lock, Sparkles } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { ELEMENT_LABELS_KO } from "../lib/elements";
import { isReportUnlocked, ownedReportCount } from "../lib/reportEntitlement";
import { formatUsd, REPORT_PRICE, remainingBundlePrice, TOTAL_MODULES } from "../lib/reportPricing";
import { COLORS } from "../theme/colors";
import type { ChatExtract } from "./ChatScreen";
import type { QuizDiagnosis } from "./QuizScreen";

const ELEMENT_COLOR: Record<string, string> = {
  wood: "#4E8368",
  fire: "#C1503B",
  earth: "#B98A4E",
  metal: "#C7CAD1",
  water: "#3E6EA0",
};
const DIMENSION_BAR_COLORS = ["#C1503B", "#3E6EA0", "#B98A4E", "#4E8368", "#8B6BB0"];
const DEFAULT_ELEMENTS: Record<string, number> = { fire: 20, earth: 20, wood: 20, metal: 20, water: 20 };
const LOADING_MESSAGES = ["사주와 심리검사를 통합하고 있어요...", "당신만의 이야기를 쓰고 있어요...", "거의 다 됐어요..."];

type ReportContent = {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  opening_scene: string;
  case_tag: string;
  case_paragraphs: string[];
  saju_dominant_heading: string;
  saju_dominant_body: string;
  saju_weak_heading: string;
  saju_weak_body: string;
  cross_analysis_quotes: string[];
  psychology_fact_heading: string;
  psychology_fact_body: string;
  psychology_takeaway: string;
  strengths: { title: string; body: string }[];
  weaknesses: { title: string; body: string }[];
  fit_good: string;
  fit_bad: string;
  behavior_guides: { title: string; body: string }[];
  mindset_guide: string;
  closing_title: string;
  closing_body: string;
};

// Ported from components/ReportScreen.jsx — the GPT-generated deep report. The literary
// sections are generated per-request by POST /api/report (lib/reportPrompts.ts, server
// side, not ported); everything already data-driven (오행 bars, dimension bars, chat
// quote) stays that way here too.
export default function ReportScreen({
  nickname,
  elements,
  quizDiagnosis,
  chatExtract,
  sessionId,
  onBack,
}: {
  nickname: string;
  elements: Record<string, number> | null;
  quizDiagnosis: QuizDiagnosis;
  chatExtract: ChatExtract | null;
  sessionId: string;
  onBack: () => void;
}) {
  const [content, setContent] = useState<ReportContent | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const mountedRef = useRef(true);
  const firedRef = useRef(false);
  const resolvedElements = elements ?? DEFAULT_ELEMENTS;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (content) return;
    const id = setInterval(() => setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length), 2200);
    return () => clearInterval(id);
  }, [content]);

  async function fetchReport() {
    setErrorText(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          context: {
            nickname,
            track: "romance",
            elements: resolvedElements,
            moduleTitle: quizDiagnosis.moduleTitle,
            psychTestTypeTitle: quizDiagnosis.typeInfo?.title ?? "",
            psychTestTypeHook: quizDiagnosis.typeInfo?.hook ?? "",
            dimensionResults: (quizDiagnosis.dimensionResults ?? []).map((r) => ({
              dimension: r.dimension,
              direction: r.direction,
              percentOfMax: r.percentOfMax,
              intensity: r.intensity,
            })),
            dimensionShortNames: quizDiagnosis.dimensionShortNames ?? {},
            nuancedSummary: quizDiagnosis.nuancedSummary ?? "",
            chatExtract: chatExtract ?? null,
          },
        }),
      });
      const json = await res.json();
      if (!mountedRef.current) return;
      if (!res.ok) {
        setErrorText(json.error || "리포트를 생성하지 못했습니다.");
        return;
      }
      setContent(json);
    } catch {
      if (!mountedRef.current) return;
      setErrorText("네트워크 오류로 리포트를 생성하지 못했습니다.");
    }
  }

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorText) {
    return (
      <SafeAreaView style={styles.centerRoot}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorText}</Text>
          <Pressable onPress={fetchReport} style={styles.retryButton}>
            <Text style={styles.retryLabel}>다시 시도</Text>
          </Pressable>
          <Pressable onPress={onBack} style={styles.retryButton}>
            <Text style={styles.backLabel}>홈으로</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!content) {
    return (
      <SafeAreaView style={styles.centerRoot}>
        <ActivityIndicator color={COLORS.gold} size="large" />
        <Text style={styles.loadingText}>{LOADING_MESSAGES[loadingMsgIndex]}</Text>
      </SafeAreaView>
    );
  }

  let sectionCounter = 0;
  const nextNum = () => String(++sectionCounter).padStart(2, "0");
  const sortedElements = Object.keys(resolvedElements).sort((a, b) => resolvedElements[b] - resolvedElements[a]);
  const dominantKey = sortedElements[0];
  const unlocked = isReportUnlocked(quizDiagnosis.moduleId);
  const ownedCount = ownedReportCount();

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={styles.brandRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.brandLabel}>FATESAID</Text>
          </View>
          <Text style={styles.heroTitle}>
            {content.title_line1}
            {"\n"}
            {content.title_line2}
          </Text>
          <Text style={styles.heroSubtitle}>{content.subtitle}</Text>
          <Text style={styles.heroNickname}>{nickname} 님</Text>
        </View>

        <Section num={nextNum()} title="어느 밤의 장면">
          <Body>{content.opening_scene}</Body>
        </Section>

        <Section num={nextNum()} title="닮은 이야기 하나">
          <View style={styles.caseBox}>
            <Text style={styles.caseTag}>{content.case_tag}</Text>
            {content.case_paragraphs.map((p, i) => (
              <Text key={i} style={styles.caseBody}>
                {p}
              </Text>
            ))}
          </View>
        </Section>

        <Section num={nextNum()} title={quizDiagnosis.typeInfo?.title ?? ""} subtitle={`${quizDiagnosis.moduleTitle ?? "심리테스트"} 분석`}>
          <Body>{quizDiagnosis.typeInfo?.hook}</Body>
          <View style={styles.barGroup}>
            {quizDiagnosis.dimensionResults?.map((r, i) => (
              <View key={r.dimension} style={styles.barRow}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>{quizDiagnosis.dimensionShortNames?.[r.dimension] ?? r.dimension}</Text>
                  <Text style={styles.barLabel}>
                    {Math.round(r.percentOfMax)}% · {r.intensity}
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${r.percentOfMax}%`, backgroundColor: DIMENSION_BAR_COLORS[i % DIMENSION_BAR_COLORS.length] }]} />
                </View>
              </View>
            ))}
          </View>
          {quizDiagnosis.nuancedSummary && <Body>{quizDiagnosis.nuancedSummary}</Body>}
        </Section>

        <Section num={nextNum()} title="무엇이 이 패턴을 만들었나" subtitle="사주 원국 분석">
          <View style={styles.barGroup}>
            {Object.entries(resolvedElements).map(([key, val]) => (
              <View key={key} style={styles.barRow}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>
                    {ELEMENT_LABELS_KO[key] ?? key}
                    {key === dominantKey ? " ·" : ""}
                  </Text>
                  <Text style={styles.barLabel}>{val}%</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${val}%`, backgroundColor: ELEMENT_COLOR[key] }]} />
                </View>
              </View>
            ))}
          </View>
          <SubHeading>{content.saju_dominant_heading}</SubHeading>
          <Body>{content.saju_dominant_body}</Body>
          <SubHeading>{content.saju_weak_heading}</SubHeading>
          <Body>{content.saju_weak_body}</Body>
        </Section>

        {unlocked ? (
          <>
            {chatExtract && (
              <Section num={nextNum()} title="직접 나눈 이야기">
                <Body>사주와 심리검사가 구조를 보여준다면, 방금 나눈 대화는 지금 이 순간의 실제 결을 보여줍니다.</Body>
                <View style={styles.chatQuoteBox}>
                  <View style={styles.chatQuoteHeader}>
                    <BookOpen size={13} strokeWidth={2} color="#7FA8D6" />
                    <Text style={styles.chatQuoteLabel}>상담 중 나온 이야기</Text>
                  </View>
                  <Text style={styles.chatQuoteText}>
                    &quot;{String(chatExtract.summary_quote || chatExtract.trigger_point || "")}&quot;
                  </Text>
                </View>
                <Body>
                  직접 나눈 대화에서도 {String(chatExtract.primary_concern ?? "")} 쪽 고민이 선명하게 드러났고, 그 안에 담긴 감정은{" "}
                  {String(chatExtract.emotional_state ?? "")}에 가까웠습니다.
                </Body>
                {!!chatExtract.integrated_summary && <Body>{String(chatExtract.integrated_summary)}</Body>}
              </Section>
            )}

            <Section num={nextNum()} title="사주와 심리검사가 같은 이야기를 하는 지점">
              {content.cross_analysis_quotes.map((q, i) => (
                <Text key={i} style={styles.quote}>
                  {q}
                </Text>
              ))}
            </Section>

            <Section num={nextNum()} title="">
              <View style={styles.breather}>
                <Text style={styles.breatherLabel}>잠깐, 심리학 상식 하나</Text>
                <Text style={styles.breatherTitle}>{content.psychology_fact_heading}</Text>
                <Body noMargin>{content.psychology_fact_body}</Body>
                <View style={styles.takeaway}>
                  <Text style={styles.takeawayText}>
                    <Text style={styles.takeawayBold}>기억할 한 가지 · </Text>
                    {content.psychology_takeaway}
                  </Text>
                </View>
              </View>
            </Section>

            <Section num={nextNum()} title="강점">
              {content.strengths.map((s) => (
                <BulletItem key={s.title} title={s.title} body={s.body} />
              ))}
            </Section>

            <Section num={nextNum()} title="취약점 및 주의할 점">
              {content.weaknesses.map((w) => (
                <BulletItem key={w.title} title={w.title} body={w.body} />
              ))}
            </Section>

            <Section num={nextNum()} title="당신에게 맞는 일·환경">
              <View style={styles.fitGood}>
                <Text style={[styles.fitLabel, { color: "#4E8368" }]}>이런 환경을 찾으세요</Text>
                <Text style={styles.fitBody}>{content.fit_good}</Text>
              </View>
              <View style={styles.fitBad}>
                <Text style={[styles.fitLabel, { color: "#CB6249" }]}>이런 환경은 피하세요</Text>
                <Text style={styles.fitBody}>{content.fit_bad}</Text>
              </View>
            </Section>

            <Section num={nextNum()} title="어떻게 행동하면 좋을까">
              {content.behavior_guides.map((g) => (
                <BulletItem key={g.title} title={g.title} body={g.body} />
              ))}
            </Section>

            <Section num={nextNum()} title="어떻게 생각하면 편해질까">
              <Body>{content.mindset_guide}</Body>
            </Section>

            <Section num={nextNum()} title={content.closing_title} noBorder>
              <Body>{content.closing_body}</Body>
              <Text style={styles.disclaimer}>이 리포트는 AI가 생성한 콘텐츠이며, 전문적인 심리 상담이나 의학적 진단을 대체하지 않습니다.</Text>
              <Text style={styles.disclaimer}>재미와 자기 이해를 위한 참고 자료로 봐주세요.</Text>
            </Section>
          </>
        ) : (
          <PaywallCard ownedCount={ownedCount} />
        )}

        <Pressable onPress={onBack} style={styles.homeButton}>
          <Text style={styles.homeButtonLabel}>홈으로 돌아가기</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  num,
  title,
  subtitle,
  noBorder,
  children,
}: {
  num: string;
  title: string;
  subtitle?: string;
  noBorder?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={[styles.section, noBorder && styles.sectionNoBorder]}>
      <Text style={styles.sectionNum}>{num}</Text>
      {!!title && (
        <Text style={styles.sectionTitle}>
          {title} {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </Text>
      )}
      {children}
    </View>
  );
}

function Body({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) {
  return <Text style={[styles.body, noMargin && { marginBottom: 0 }]}>{children}</Text>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <Text style={styles.subHeading}>{children}</Text>;
}

function BulletItem({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.bulletItem}>
      <Text style={styles.bulletTitle}>· {title}</Text>
      <Text style={styles.bulletBody}>{body}</Text>
    </View>
  );
}

// Gates everything past the free preview (opening scene, case study, quiz analysis, saju
// analysis) — the actionable half of the report (chat-quote analysis, cross-analysis,
// strengths/weaknesses, fit, behavior guides, closing). No working purchase button here
// on purpose: real IAP isn't wired yet (see lib/reportEntitlement.ts), and a button that
// looks functional but isn't would repeat the exact dead-affordance bug already found
// and fixed once this session on web's QAChat install button.
function PaywallCard({ ownedCount }: { ownedCount: number }) {
  const remainingCount = TOTAL_MODULES - ownedCount;
  return (
    <View style={styles.section}>
      <View style={styles.paywallCard}>
        <Lock size={22} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={styles.paywallTitle}>여기부터는 심층 리포트예요</Text>
        <Text style={styles.paywallBody}>
          대화 인용 분석, 사주×심리 교차분석, 강점·약점, 맞는 환경, 행동 지침까지 — 이 리포트의 핵심 조언이 이어집니다.
        </Text>
        <Text style={styles.paywallPrice}>{formatUsd(REPORT_PRICE)}에 전체 보기</Text>
        {ownedCount > 0 && (
          <Text style={styles.paywallBundle}>
            남은 {remainingCount}개 리포트를 한번에 보면 {formatUsd(remainingBundlePrice(ownedCount))} (25% 할인)
          </Text>
        )}
        <Text style={styles.paywallComingSoon}>결제 기능은 준비 중이에요</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerRoot: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  loadingText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
    textAlign: "center",
  },
  errorCard: {
    width: "100%",
    backgroundColor: "rgba(203,98,73,0.08)",
    borderWidth: 1,
    borderColor: "rgba(203,98,73,0.35)",
    borderRadius: 12,
    padding: 16,
    gap: 12,
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
  backLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    color: COLORS.subheadline,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#17161D",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 18,
  },
  brandLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10.5,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 24,
    lineHeight: 34,
    color: COLORS.headline,
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    color: COLORS.footer,
    textAlign: "center",
    marginBottom: 24,
  },
  heroNickname: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 15,
    color: COLORS.headline,
  },
  section: {
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#17161D",
  },
  sectionNoBorder: {
    borderBottomWidth: 0,
  },
  sectionNum: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: COLORS.gold,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 20,
    lineHeight: 28,
    color: COLORS.headline,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: COLORS.footer,
  },
  body: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#C7C3D1",
    marginBottom: 10,
  },
  subHeading: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: COLORS.gold,
    marginTop: 16,
    marginBottom: 6,
  },
  caseBox: {
    backgroundColor: "rgba(111,169,139,0.05)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 16,
  },
  caseTag: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 1,
    color: COLORS.gold,
    marginBottom: 8,
  },
  caseBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 22,
    color: "#B7B2C0",
    marginBottom: 8,
  },
  barGroup: {
    gap: 10,
    marginVertical: 14,
  },
  barRow: {
    gap: 4,
  },
  barLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11.5,
    color: COLORS.subheadline,
  },
  barTrack: {
    height: 7,
    backgroundColor: "#1C1B24",
    borderRadius: 999,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
  },
  chatQuoteBox: {
    backgroundColor: "rgba(62,110,160,0.08)",
    borderWidth: 1,
    borderColor: "rgba(62,110,160,0.35)",
    borderRadius: 10,
    padding: 16,
    marginVertical: 12,
  },
  chatQuoteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  chatQuoteLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10.5,
    letterSpacing: 1,
    color: "#7FA8D6",
  },
  chatQuoteText: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.headline,
  },
  quote: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 15,
    lineHeight: 26,
    color: COLORS.headline,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.gold,
    paddingLeft: 14,
    marginVertical: 8,
  },
  breather: {
    borderTopWidth: 1,
    borderTopColor: "#4E8368",
    borderBottomWidth: 1,
    borderBottomColor: "#4E8368",
    paddingVertical: 16,
  },
  breatherLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#4E8368",
    marginBottom: 8,
  },
  breatherTitle: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 16,
    color: COLORS.headline,
    marginBottom: 8,
  },
  takeaway: {
    backgroundColor: "#14131A",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
  },
  takeawayText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    lineHeight: 20,
    color: "#C7C3D1",
  },
  takeawayBold: {
    fontFamily: "Manrope_700Bold",
    color: COLORS.gold,
  },
  bulletItem: {
    marginBottom: 10,
  },
  bulletTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13.5,
    color: COLORS.headline,
    marginBottom: 3,
  },
  bulletBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "#B7B2C0",
    marginLeft: 14,
  },
  fitGood: {
    backgroundColor: "rgba(78,131,104,0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "#4E8368",
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
  },
  fitBad: {
    backgroundColor: "rgba(193,80,59,0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "#C1503B",
    borderRadius: 6,
    padding: 14,
  },
  fitLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    marginBottom: 4,
  },
  fitBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    lineHeight: 20,
    color: "#C7C3D1",
  },
  disclaimer: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    lineHeight: 18,
    color: COLORS.footer,
    marginTop: 12,
  },
  paywallCard: {
    alignItems: "center",
    backgroundColor: "rgba(111,169,139,0.06)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.3)",
    borderRadius: 16,
    padding: 26,
    gap: 10,
  },
  paywallTitle: {
    fontFamily: "CormorantGaramond_500Medium",
    fontSize: 19,
    color: COLORS.headline,
    textAlign: "center",
    marginTop: 4,
  },
  paywallBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 21,
    color: "#C7C3D1",
    textAlign: "center",
  },
  paywallPrice: {
    fontFamily: "Manrope_700Bold",
    fontSize: 17,
    color: COLORS.gold,
    marginTop: 6,
  },
  paywallBundle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: COLORS.subheadline,
    textAlign: "center",
  },
  paywallComingSoon: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: COLORS.footer,
    marginTop: 6,
  },
  homeButton: {
    marginHorizontal: 22,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  homeButtonLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13.5,
    color: COLORS.headline,
  },
});
