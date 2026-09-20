/**
 * lib/pdf/reportPdf.tsx
 * ------------------------------------------------------------------
 * Magazine-style PDF of a finished report (server-only: reads font files from node_modules and
 * renders with @react-pdf/renderer). Two documents share one set of building blocks:
 *   - the year-ahead report (lib/yearReport.ts's YearReportContent)
 *   - the deep, module-based report (lib/report.ts's ReportContent + the pieces the app renders
 *     around it: psych-test summary, element bars, chat story, top answers)
 *
 * Layout: a dark cover page in the app's celadon, then paper-toned pages (the same #EFE7D8 family
 * the in-app report's table-of-contents page uses) with generous margins, a running header and
 * page numbers. Hangul needs a Hangul font, so ko uses Noto Sans KR; en/es use Manrope for text
 * and Cormorant Garamond for display type — the same faces as the app.
 * ------------------------------------------------------------------
 */

import path from "path";
import React from "react";
import { Document, Font, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import type { Locale } from "../i18n/types";

// ---- fonts ---------------------------------------------------------------------------------

const fontDir = (pkg: string, weight: string, file: string) => path.join(process.cwd(), "node_modules", "@expo-google-fonts", pkg, weight, file);

let fontsRegistered = false;
function registerFonts() {
  if (fontsRegistered) return;
  fontsRegistered = true;
  Font.register({
    family: "NotoSansKR",
    fonts: [
      { src: fontDir("noto-sans-kr", "400Regular", "NotoSansKR_400Regular.ttf"), fontWeight: 400 },
      { src: fontDir("noto-sans-kr", "700Bold", "NotoSansKR_700Bold.ttf"), fontWeight: 700 },
    ],
  });
  Font.register({
    family: "Manrope",
    fonts: [
      { src: fontDir("manrope", "400Regular", "Manrope_400Regular.ttf"), fontWeight: 400 },
      { src: fontDir("manrope", "600SemiBold", "Manrope_600SemiBold.ttf"), fontWeight: 600 },
    ],
  });
  Font.register({ family: "Cormorant", src: fontDir("cormorant-garamond", "500Medium", "CormorantGaramond_500Medium.ttf"), fontWeight: 500 });
  // No hyphenation: it mangles Korean and adds nothing for the short paragraphs used here.
  Font.registerHyphenationCallback((word) => [word]);
}

// ---- palette ---------------------------------------------------------------------------------

const C = {
  coverBg: "#122019",
  coverInk: "#D9C9A3",
  coverMuted: "#9C9277",
  jade: "#6FA98B",
  paper: "#F4EEDF",
  ink: "#22301F",
  muted: "#665D43", // 5.6:1 on paper
  accent: "#2F6A4C", // 5.7:1 on paper
  rule: "#D6CBB0",
  card: "#EBE3CF",
  track: "#DDD3B8",
};

const ELEMENT_COLOR: Record<string, string> = { wood: "#4E8368", fire: "#C1503B", earth: "#B98A4E", metal: "#8E939B", water: "#3E6EA0" };
const ELEMENT_KEYS = ["wood", "fire", "earth", "metal", "water"] as const;

// ---- labels ----------------------------------------------------------------------------------

interface Labels {
  by: (name: string) => string;
  issued: (date: string) => string;
  page: (n: number, total: number) => string;
  disclaimer: string;
  overview: string;
  timeline: string;
  plan: string;
  closing: string;
  months: string[]; // Feb..Jan, saju order
  elements: Record<(typeof ELEMENT_KEYS)[number], string>;
  deep: {
    opening: string;
    caseStudy: string;
    quiz: string;
    oheng: string;
    upcoming: string;
    chat: string;
    concern: string;
    emotion: string;
    trigger: string;
    pattern: string;
    fear: string;
    answers: string;
    cross: string;
    breather: string;
    takeaway: string;
    strengths: string;
    weaknesses: string;
    fitGood: string;
    fitBad: string;
    guides: string;
    mindset: string;
  };
}

const LABELS: Record<Locale, Labels> = {
  ko: {
    by: (n) => `${n}님을 위한`,
    issued: (d) => `${d} 발행`,
    page: (n, t) => `${n} / ${t}`,
    disclaimer: "이 리포트는 자체 구축한 만세력 엔진의 사주 계산을 바탕으로 AI가 해석·작성한 읽을거리이며, 전문적인 심리 상담이나 의학적 진단을 대체하지 않습니다.",
    overview: "한 해의 총론",
    timeline: "12개월 타임라인",
    plan: "실행 계획",
    closing: "마무리",
    months: ["2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", "1월"],
    elements: { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" },
    deep: { opening: "어느 밤의 장면", caseStudy: "닮은 사례", quiz: "심리테스트 분석", oheng: "나의 오행", upcoming: "다가오는 시기", chat: "직접 나눈 이야기", concern: "핵심 고민", emotion: "요즘의 마음", trigger: "흔들리는 순간", pattern: "반복되는 패턴", fear: "마음 깊은 곳", answers: "내가 고른 답", cross: "사주 × 심리 교차 분석", breather: "잠깐 숨 고르기", takeaway: "한 줄 정리", strengths: "강점", weaknesses: "약점", fitGood: "잘 맞는 환경", fitBad: "피하면 좋은 환경", guides: "행동 지침", mindset: "마음가짐" },
  },
  en: {
    by: (n) => `Prepared for ${n}`,
    issued: (d) => `Issued ${d}`,
    page: (n, t) => `${n} / ${t}`,
    disclaimer: "This report is AI-interpreted reading material built on precise saju calculations from our own engine. It does not replace professional counseling or a medical or psychological diagnosis.",
    overview: "The year at a glance",
    timeline: "12-month timeline",
    plan: "Action plan",
    closing: "Closing",
    months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    elements: { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" },
    deep: { opening: "A scene from one night", caseStudy: "A similar case", quiz: "Psych test analysis", oheng: "Your five elements", upcoming: "The period ahead", chat: "What we talked about", concern: "Core concern", emotion: "How you've been feeling", trigger: "Where it shakes you", pattern: "A repeating pattern", fear: "Deeper down", answers: "Answers you chose", cross: "Saju × psychology", breather: "A moment to breathe", takeaway: "In one line", strengths: "Strengths", weaknesses: "Weaknesses", fitGood: "Environments that fit you", fitBad: "Environments to avoid", guides: "Behavior guides", mindset: "Mindset" },
  },
  es: {
    by: (n) => `Preparado para ${n}`,
    issued: (d) => `Emitido el ${d}`,
    page: (n, t) => `${n} / ${t}`,
    disclaimer: "Este informe es una lectura interpretada por IA a partir de cálculos precisos de saju de nuestro propio motor. No sustituye la consejería profesional ni un diagnóstico médico o psicológico.",
    overview: "El año de un vistazo",
    timeline: "Línea de tiempo de 12 meses",
    plan: "Plan de acción",
    closing: "Cierre",
    months: ["Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene"],
    elements: { wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua" },
    deep: { opening: "Una escena de una noche", caseStudy: "Un caso parecido", quiz: "Análisis del test psicológico", oheng: "Tus cinco elementos", upcoming: "El período que viene", chat: "Lo que conversamos", concern: "Preocupación central", emotion: "Cómo te has sentido", trigger: "Donde te sacude", pattern: "Un patrón que se repite", fear: "Más adentro", answers: "Respuestas que elegiste", cross: "Saju × psicología", breather: "Un momento para respirar", takeaway: "En una línea", strengths: "Fortalezas", weaknesses: "Debilidades", fitGood: "Entornos que encajan contigo", fitBad: "Entornos que conviene evitar", guides: "Guías de comportamiento", mindset: "Actitud" },
  },
};

// ---- styles ----------------------------------------------------------------------------------

function makeStyles(locale: Locale) {
  const body = locale === "ko" ? "NotoSansKR" : "Manrope";
  const display = locale === "ko" ? "NotoSansKR" : "Cormorant";
  const displayWeight = locale === "ko" ? 700 : 500;
  return StyleSheet.create({
    coverPage: { backgroundColor: C.coverBg, padding: 64, justifyContent: "space-between", fontFamily: body },
    coverBrand: { fontSize: 11, letterSpacing: 4, color: C.jade, fontFamily: body, fontWeight: locale === "ko" ? 700 : 600 },
    coverTitle: { fontFamily: display, fontWeight: displayWeight, fontSize: locale === "ko" ? 34 : 44, lineHeight: 1.25, color: C.coverInk },
    coverSubtitle: { fontSize: 13, lineHeight: 1.7, color: C.coverMuted, marginTop: 18 },
    coverBy: { fontSize: 12, color: C.coverInk },
    coverDate: { fontSize: 10, color: C.coverMuted, marginTop: 4 },
    coverDisclaimer: { fontSize: 8.5, lineHeight: 1.6, color: C.coverMuted, marginTop: 28 },
    page: { backgroundColor: C.paper, paddingTop: 64, paddingBottom: 64, paddingHorizontal: 60, fontFamily: body, color: C.ink },
    header: { position: "absolute", top: 26, left: 60, right: 60, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 0.5, borderBottomColor: C.rule, paddingBottom: 8 },
    headerText: { fontSize: 8, letterSpacing: 2, color: C.muted },
    footer: { position: "absolute", bottom: 26, left: 60, right: 60, textAlign: "center", fontSize: 8, color: C.muted },
    label: { fontSize: 8.5, letterSpacing: 1.6, color: C.accent, fontFamily: body, fontWeight: locale === "ko" ? 700 : 600, marginBottom: 8 },
    h2: { fontFamily: display, fontWeight: displayWeight, fontSize: locale === "ko" ? 18 : 24, lineHeight: 1.3, color: C.ink, marginBottom: 12 },
    section: { marginBottom: 26 },
    p: { fontSize: 10.5, lineHeight: 1.75, color: C.ink, marginBottom: 9 },
    pMuted: { fontSize: 9.5, lineHeight: 1.7, color: C.muted, marginBottom: 6 },
    quote: { fontFamily: display, fontWeight: displayWeight, fontSize: locale === "ko" ? 13 : 17, lineHeight: 1.6, color: C.ink, paddingLeft: 14, borderLeftWidth: 1, borderLeftColor: C.accent, marginBottom: 14 },
    card: { backgroundColor: C.card, borderRadius: 6, padding: 14, marginBottom: 10 },
    cardTitle: { fontSize: 11, fontFamily: body, fontWeight: locale === "ko" ? 700 : 600, color: C.accent, marginBottom: 5 },
    cardBody: { fontSize: 10, lineHeight: 1.7, color: C.ink },
    monthRow: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: C.rule },
    monthName: { width: 44, fontSize: 10, fontFamily: body, fontWeight: locale === "ko" ? 700 : 600, color: C.accent },
    monthText: { flex: 1 },
    monthHeadline: { fontSize: 10.5, fontFamily: body, fontWeight: locale === "ko" ? 700 : 600, color: C.ink, marginBottom: 2 },
    monthBody: { fontSize: 9.5, lineHeight: 1.6, color: C.muted },
    barRow: { flexDirection: "row", alignItems: "center", marginBottom: 7 },
    barName: { width: 56, fontSize: 9.5, color: C.ink },
    barTrack: { flex: 1, height: 7, borderRadius: 3.5, backgroundColor: C.track },
    barFill: { height: 7, borderRadius: 3.5 },
    barValue: { width: 36, textAlign: "right", fontSize: 9.5, color: C.muted },
    disclaimerBox: { marginTop: 8, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: C.rule },
  });
}
type S = ReturnType<typeof makeStyles>;

// ---- building blocks -------------------------------------------------------------------------

const paras = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

function Paragraphs({ s, text }: { s: S; text: string }) {
  return (
    <>
      {paras(text).map((p, i) => (
        <Text key={i} style={s.p}>
          {p}
        </Text>
      ))}
    </>
  );
}

function Section({ s, label, title, text, children }: { s: S; label?: string; title?: string; text?: string; children?: React.ReactNode }) {
  // A heading is kept together with the first paragraph that follows it (wrap={false}), so a
  // heading is never stranded alone at the bottom of a page.
  const [first, ...rest] = text ? paras(text) : [];
  const head = (
    <>
      {label ? <Text style={s.label}>{label.toUpperCase()}</Text> : null}
      {title ? <Text style={s.h2}>{title}</Text> : null}
    </>
  );
  return (
    <View style={s.section}>
      {first ? (
        <View wrap={false}>
          {head}
          <Text style={s.p}>{first}</Text>
        </View>
      ) : (
        <View wrap={false} minPresenceAhead={90}>
          {head}
        </View>
      )}
      {rest.map((p, i) => (
        <Text key={i} style={s.p}>
          {p}
        </Text>
      ))}
      {children}
    </View>
  );
}

function Card({ s, title, body }: { s: S; title: string; body: string }) {
  return (
    <View style={s.card} wrap={false}>
      <Text style={s.cardTitle}>{title}</Text>
      <Text style={s.cardBody}>{body}</Text>
    </View>
  );
}

function Bars({ s, labels, elements }: { s: S; labels: Labels; elements: Record<string, number> }) {
  return (
    <View>
      {ELEMENT_KEYS.map((key) => {
        const value = Math.max(0, Math.min(100, Number(elements[key] ?? 0)));
        return (
          <View key={key} style={s.barRow} wrap={false}>
            <Text style={s.barName}>{labels.elements[key]}</Text>
            <View style={s.barTrack}>
              <View style={[s.barFill, { width: `${Math.max(value, 3)}%`, backgroundColor: ELEMENT_COLOR[key] }]} />
            </View>
            <Text style={s.barValue}>{Math.round(value)}%</Text>
          </View>
        );
      })}
    </View>
  );
}

function Cover({ s, labels, title, subtitle, nickname, date }: { s: S; labels: Labels; title: string; subtitle: string; nickname: string; date: string }) {
  return (
    <Page size="A4" style={s.coverPage}>
      <Text style={s.coverBrand}>FATESAID</Text>
      <View>
        <Text style={s.coverTitle}>{title}</Text>
        {subtitle ? <Text style={s.coverSubtitle}>{subtitle}</Text> : null}
      </View>
      <View>
        <Text style={s.coverBy}>{labels.by(nickname)}</Text>
        <Text style={s.coverDate}>{labels.issued(date)}</Text>
        <Text style={s.coverDisclaimer}>{labels.disclaimer}</Text>
      </View>
    </Page>
  );
}

function Body({ s, labels, running, children }: { s: S; labels: Labels; running: string; children: React.ReactNode }) {
  return (
    <Page size="A4" style={s.page} wrap>
      <View style={s.header} fixed>
        <Text style={s.headerText}>FATESAID</Text>
        <Text style={s.headerText}>{running}</Text>
      </View>
      {children}
      <Text style={s.footer} fixed render={({ pageNumber, totalPages }) => labels.page(pageNumber, totalPages)} />
    </Page>
  );
}

// ---- year report -----------------------------------------------------------------------------

export interface YearPdfContent {
  year: number;
  title: string;
  subtitle: string;
  overview: string;
  chapters: Record<"wealth" | "love" | "career" | "study" | "health", { heading: string; body: string }>;
  months: { headline: string; body: string }[];
  action_plan: { title: string; body: string }[];
  closing: string;
}

function YearDocument({ locale, nickname, date, content }: { locale: Locale; nickname: string; date: string; content: YearPdfContent }) {
  const s = makeStyles(locale);
  const labels = LABELS[locale];
  const running = `${content.year}`;
  return (
    <Document title={content.title} author="Fatesaid" subject={content.subtitle}>
      <Cover s={s} labels={labels} title={content.title} subtitle={content.subtitle} nickname={nickname} date={date} />
      <Body s={s} labels={labels} running={running}>
        <Section s={s} label={labels.overview} title={content.title} text={content.overview} />
        {(["wealth", "love", "career", "study", "health"] as const).map((key) => (
          <Section key={key} s={s} title={content.chapters[key].heading} text={content.chapters[key].body} />
        ))}
        <Section s={s} label={labels.timeline} title={labels.timeline}>
          {content.months.map((m, i) => (
            <View key={i} style={s.monthRow} wrap={false}>
              <Text style={s.monthName}>{labels.months[i] ?? ""}</Text>
              <View style={s.monthText}>
                <Text style={s.monthHeadline}>{m.headline}</Text>
                <Text style={s.monthBody}>{m.body}</Text>
              </View>
            </View>
          ))}
        </Section>
        <Section s={s} label={labels.plan} title={labels.plan}>
          {content.action_plan.map((a, i) => (
            <Card key={i} s={s} title={a.title} body={a.body} />
          ))}
        </Section>
        <Section s={s} label={labels.closing}>
          <Text style={s.quote}>{content.closing}</Text>
          <View style={s.disclaimerBox}>
            <Text style={s.pMuted}>{labels.disclaimer}</Text>
          </View>
        </Section>
      </Body>
    </Document>
  );
}

// ---- deep report -----------------------------------------------------------------------------

export interface DeepPdfContent {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  opening_scene: string;
  case_tag: string;
  case_paragraphs: string[];
  oheng_intro?: string;
  element_readings: Record<string, { heading: string; body: string }>;
  upcoming_period_heading: string;
  upcoming_period_body: string;
  cross_analysis_quotes: string[];
  answer_notes: string[];
  chat_snapshot_note?: string;
  chat_trigger_note?: string;
  chat_repeat_note?: string;
  chat_fear_note?: string;
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
}

export interface DeepPdfExtras {
  moduleTitle: string;
  typeTitle: string;
  typeHook: string;
  nuancedSummary: string;
  dimensions: { name: string; percent: number }[];
  elements: Record<string, number> | null;
  topAnswers: { dimensionLabel: string; prompt: string; answer: string }[];
  chat: { primary_concern?: string; emotional_state?: string; trigger_point?: string; repeat_pattern?: string; core_fear_or_meaning?: string } | null;
}

function DeepDocument({ locale, nickname, date, content, extras }: { locale: Locale; nickname: string; date: string; content: DeepPdfContent; extras: DeepPdfExtras }) {
  const s = makeStyles(locale);
  const labels = LABELS[locale];
  const d = labels.deep;
  const title = [content.title_line1, content.title_line2].filter(Boolean).join(" ");
  const chatItems: [string, string | undefined][] = [
    [d.concern, extras.chat?.primary_concern],
    [d.emotion, extras.chat?.emotional_state],
    [d.trigger, extras.chat?.trigger_point],
    [d.pattern, extras.chat?.repeat_pattern],
    [d.fear, extras.chat?.core_fear_or_meaning],
  ];
  const sortedElements = extras.elements
    ? [...ELEMENT_KEYS].sort((a, b) => (extras.elements![b] ?? 0) - (extras.elements![a] ?? 0))
    : [...ELEMENT_KEYS];

  return (
    <Document title={title} author="Fatesaid" subject={content.subtitle}>
      <Cover s={s} labels={labels} title={title} subtitle={content.subtitle} nickname={nickname} date={date} />
      <Body s={s} labels={labels} running={extras.moduleTitle}>
        <Section s={s} label={d.opening}>
          <Text style={s.quote}>{content.opening_scene}</Text>
        </Section>

        <Section s={s} label={d.quiz} title={extras.typeTitle}>
          {extras.typeHook ? <Text style={s.pMuted}>{extras.typeHook}</Text> : null}
          <Paragraphs s={s} text={extras.nuancedSummary} />
          {extras.dimensions.map((dim) => (
            <View key={dim.name} style={s.barRow} wrap={false}>
              <Text style={[s.barName, { width: 90 }]}>{dim.name}</Text>
              <View style={s.barTrack}>
                <View style={[s.barFill, { width: `${Math.max(3, Math.min(100, dim.percent))}%`, backgroundColor: C.accent }]} />
              </View>
              <Text style={s.barValue}>{Math.round(dim.percent)}%</Text>
            </View>
          ))}
        </Section>

        {content.case_paragraphs.length > 0 && (
          <Section s={s} label={d.caseStudy} title={content.case_tag || d.caseStudy}>
            {content.case_paragraphs.map((p, i) => (
              <Text key={i} style={s.p}>
                {p}
              </Text>
            ))}
          </Section>
        )}

        {extras.elements && (
          <Section s={s} label={d.oheng} title={d.oheng}>
            <Bars s={s} labels={labels} elements={extras.elements} />
            {content.oheng_intro ? <Paragraphs s={s} text={content.oheng_intro} /> : null}
          </Section>
        )}
        {sortedElements.map((key) => {
          const reading = content.element_readings[key];
          if (!reading?.body) return null;
          return (
            <Section key={key} s={s} title={reading.heading || labels.elements[key]} text={reading.body} />
          );
        })}

        {content.upcoming_period_body && (
          <Section s={s} label={d.upcoming} title={content.upcoming_period_heading || d.upcoming} text={content.upcoming_period_body} />
        )}

        {chatItems.some(([, v]) => v && v.trim()) && (
          <Section s={s} label={d.chat}>
            {chatItems.map(([label, value]) =>
              value && value.trim() ? (
                <Card key={label} s={s} title={label} body={value} />
              ) : null,
            )}
            {[content.chat_snapshot_note, content.chat_trigger_note, content.chat_repeat_note, content.chat_fear_note].map((note, i) =>
              note && note.trim() ? <Paragraphs key={`note-${i}`} s={s} text={note} /> : null,
            )}
          </Section>
        )}

        {extras.topAnswers.length > 0 && (
          <Section s={s} label={d.answers}>
            {extras.topAnswers.map((a, i) => (
              <Card key={i} s={s} title={a.dimensionLabel} body={`${a.prompt}\n→ ${a.answer}${content.answer_notes[i] ? `\n\n${content.answer_notes[i]}` : ""}`} />
            ))}
          </Section>
        )}

        {content.cross_analysis_quotes.length > 0 && (
          <Section s={s} label={d.cross}>
            {content.cross_analysis_quotes.map((q, i) => (
              <Text key={i} style={s.quote}>
                {q}
              </Text>
            ))}
          </Section>
        )}

        {content.psychology_fact_body && (
          <Section s={s} label={d.breather} title={content.psychology_fact_heading}>
            <Paragraphs s={s} text={content.psychology_fact_body} />
            {content.psychology_takeaway ? (
              <Text style={s.cardTitle}>
                {d.takeaway}: {content.psychology_takeaway}
              </Text>
            ) : null}
          </Section>
        )}

        <Section s={s} label={d.strengths}>
          {content.strengths.map((b, i) => (
            <Card key={i} s={s} title={b.title} body={b.body} />
          ))}
        </Section>
        <Section s={s} label={d.weaknesses}>
          {content.weaknesses.map((b, i) => (
            <Card key={i} s={s} title={b.title} body={b.body} />
          ))}
        </Section>

        <Section s={s} label={d.fitGood} text={content.fit_good} />
        <Section s={s} label={d.fitBad} text={content.fit_bad} />

        <Section s={s} label={d.guides}>
          {content.behavior_guides.map((b, i) => (
            <Card key={i} s={s} title={b.title} body={b.body} />
          ))}
        </Section>
        <Section s={s} label={d.mindset} text={content.mindset_guide} />

        <Section s={s} label={labels.closing} title={content.closing_title}>
          <Text style={s.quote}>{content.closing_body}</Text>
          <View style={s.disclaimerBox}>
            <Text style={s.pMuted}>{labels.disclaimer}</Text>
          </View>
        </Section>
      </Body>
    </Document>
  );
}

// ---- entry points ----------------------------------------------------------------------------

function todayLabel(locale: Locale): string {
  return new Date().toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export async function renderYearReportPdf(input: { locale: Locale; nickname: string; content: YearPdfContent }): Promise<Buffer> {
  registerFonts();
  return renderToBuffer(<YearDocument locale={input.locale} nickname={input.nickname} date={todayLabel(input.locale)} content={input.content} />);
}

export async function renderDeepReportPdf(input: { locale: Locale; nickname: string; content: DeepPdfContent; extras: DeepPdfExtras }): Promise<Buffer> {
  registerFonts();
  return renderToBuffer(<DeepDocument locale={input.locale} nickname={input.nickname} date={todayLabel(input.locale)} content={input.content} extras={input.extras} />);
}
