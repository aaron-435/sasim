/**
 * lib/journalReport.ts
 * ------------------------------------------------------------------
 * Month-end pattern report (subscriber, 2026-10-06). Crosses one month of the user's one-line
 * journal (mood + optional line, sent from the device) with that month's day rhythms from the
 * same day engine the fortune tabs use (lib/dailyFortune.ts), and asks the model for 3-5
 * observations grounded in code-made tallies. Pure parsing/checks live in lib/journal.ts.
 *
 * Nothing is stored: the entries exist only inside this request, and llm_usage_log gets token
 * counts only. Logs here never print entry text.
 * NEVER import in a client component (reads OPENAI_API_KEY).
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import { logLlmUsage } from "./llmUsage";
import type { Locale } from "./i18n/types";
import { getDailyFortune } from "./dailyFortune";
import { checkLanguageSlips, makeRewriter, repairStringFindings, stripHanja } from "./reportQuality";
import { FIELD_LANGUAGE_NAME, outputLanguageDirective } from "./promptLocale";
import {
  allowedNumbers,
  checkJournalReport,
  IncompleteJournalReport,
  MIN_JOURNAL_ENTRIES,
  MOOD_NAMES,
  parseJournalReport,
  RHYTHM_NAMES,
  tallyJournal,
  type JournalDay,
  type JournalReport,
  type JournalReportRequest,
  type JournalTallies,
} from "./journal";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const JOURNAL_REPORT_MODEL = "gpt-5.4-mini";

function daysFromKstToday(iso: string): number {
  const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
  return Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);
}

/** Each entry's day rhythm. A day whose lookup fails is dropped (same as the month tab); if that
 * leaves too few to read a pattern, the caller treats it as a failure. */
export async function attachRhythms(req: JournalReportRequest): Promise<JournalDay[]> {
  const settled = await Promise.allSettled(
    req.entries.map((e) => getDailyFortune(req.selfDayMasterChar, req.selfDayBranch, daysFromKstToday(e.date))),
  );
  const days: JournalDay[] = [];
  settled.forEach((r, i) => {
    const relation = r.status === "fulfilled" ? r.value.compatibility?.relation : undefined;
    if (relation) days.push({ ...req.entries[i], relation });
  });
  return days;
}

// ---- Prompt ---------------------------------------------------------------------------------

function describeData(locale: Locale, days: JournalDay[], t: JournalTallies): string {
  const rhythm = RHYTHM_NAMES[locale];
  const mood = MOOD_NAMES[locale];
  const moodList = (m: JournalTallies["moods"]) =>
    Object.entries(m)
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .map(([k, n]) => `${mood[k as keyof typeof mood]} ${n}`)
      .join(", ");
  const lines = [
    `- 기록한 날: ${t.total}일 (그중 한 줄을 남긴 날 ${t.withNotes}일)`,
    `- 한 달 전체 기분: ${moodList(t.moods)}`,
    `- 리듬별 (그 리듬이었던 기록일 수 → 그날 고른 기분):`,
    ...t.rhythms.map((r) => `  - "${rhythm[r.relation]}" ${r.days}일 → ${moodList(r.moods)}`),
    ``,
    `## 날짜별 기록 (사용자가 직접 쓴 한 줄은 «» 안. 인용할 때는 짧게, 그대로)`,
    ...days.map((d) => `- ${d.date.slice(5)} · ${rhythm[d.relation]} · ${mood[d.mood]}${d.note ? ` · «${d.note}»` : ""}`),
  ];
  return lines.join("\n");
}

export function buildJournalReportPrompt(req: JournalReportRequest, days: JournalDay[], t: JournalTallies): string {
  const locale = req.locale;
  const outLang = FIELD_LANGUAGE_NAME[locale];
  const prompt = `당신은 사주의 하루 리듬을 자기관찰의 도구로 쓰는 따뜻하고 차분한 작가입니다. 사용자가 한 달 동안 남긴 "오늘 한 줄"(기분 + 선택 한 줄)과, 그날그날의 리듬(앱의 오늘 운세 화면에 나온 이름)을 나란히 놓고 이 달의 패턴 리포트를 씁니다.

## 이번 달 데이터 (${req.month}, 코드가 센 값 — 이 밖의 사실을 만들지 말 것)
${describeData(locale, days, t)}

## 리듬 이름의 뜻 (설명용, 그대로 나열하지 말 것)
- ${RHYTHM_NAMES[locale].mirror}: 나와 같은 기운이 도는 날, 내 방식대로 움직이기 쉬운 날
- ${RHYTHM_NAMES[locale].selfNurturesOther}: 내 기운을 밖으로 내어 주는 날, 표현하고 챙기는 쪽
- ${RHYTHM_NAMES[locale].otherNurturesSelf}: 기운을 받는 날, 도움과 쉼이 들어오는 쪽
- ${RHYTHM_NAMES[locale].selfChallengesOther}: 내가 다루고 이끄는 날, 결정하고 정리하는 쪽
- ${RHYTHM_NAMES[locale].otherChallengesSelf}: 속도를 고르는 날, 밖의 요구가 커서 페이스를 조절하는 쪽

## 쓰는 법
1. observations는 3~5개. 각각 1~2문장(길어도 3문장). 하나의 관찰은 "어떤 리듬의 날(또는 한 달 전체)에 어떤 기분·말이 자주 나왔는지"처럼 데이터에서 실제로 보이는 짝 하나를 짚습니다. 예: "베푸는 리듬이었던 날, 당신은 '들뜸'을 자주 골랐어요."
2. 데이터에 근거가 약하면(한두 날뿐) "이번 달에는 ~한 날도 있었어요"처럼 가볍게 말하고 패턴이라고 부르지 마세요. 숫자는 위 데이터에 있는 값만 쓰고, 꼭 필요할 때 한두 번만.
3. 사용자가 쓴 한 줄은 관찰을 받쳐 줄 때만 짧게 인용합니다. 지어내거나 바꾸지 마세요.
4. 진단·처방 말투 금지: 병명, 증상, 치료·상담 권유, "~해야 해요", 명령형. 감정을 판정하지 말고(예: "당신은 불안한 사람") 기록에 보인 그대로 말합니다. 제안은 "~해 보면 어떨까요" 정도로 마지막 관찰이나 closing에 한 번만.
5. 앞날 예언, 운의 좋고 나쁨 판정, 건강·금전 예측 금지. 사주 전문용어(일간, 천간, 지지, 십성 등)는 쓰지 말고 리듬 이름만 씁니다.
6. 독자는 2인칭. 성별을 가정하지 마세요. 한국어는 "~해요"체로 끝까지 통일합니다("~습니다" 섞지 않기).
7. 리듬·기분은 데이터에 나온 이름으로 부르되, 문장 안에서는 관사와 대소문자를 그 언어답게 맞춥니다(영어 예: "on your giving-rhythm days", "you often chose calm"; 스페인어 예: "en los días de ritmo generoso", "elegiste calma"). 제목은 문장형 대소문자(첫 단어만 대문자)로 씁니다.
8. 날짜는 쓰지 말고("어느 날", "그런 날") 같은 날을 여러 관찰에서 되풀이해 인용하지 말고, 숫자 나열(각각 몇 번씩)로 관찰을 채우지 마세요.

## 출력 형식 — 아래 키만 가진 JSON 객체 하나. 모든 문자열 값은 ${outLang}로 씁니다.
{
  "title": "이 달을 한 이미지로 담은 제목 한 줄(10~24자, 판정 없이)",
  "observations": ["관찰 1", "관찰 2", "관찰 3"],
  "closing": "다음 달 기록을 이어 갈 마음이 드는 담백한 맺음 1~2문장(예언 없이)"
}`;
  return (
    prompt +
    outputLanguageDirective(locale, {
      en: `JSON object (title, every observation, closing). Use the rhythm and mood names from the data, lowercased and with natural articles inside a sentence`,
      es: `objeto JSON (title, cada observación, closing). Usa los nombres de ritmo y de estado de ánimo de los datos, en minúscula y con artículos naturales dentro de la frase ("en los días de ritmo generoso", nunca "de Un ritmo generoso")`,
    })
  );
}

// ---- Generation -----------------------------------------------------------------------------

async function callModel(prompt: string): Promise<unknown> {
  const completion = await client.chat.completions.create({
    model: JOURNAL_REPORT_MODEL,
    temperature: 0.7,
    messages: [{ role: "system", content: prompt }],
    response_format: { type: "json_object" },
  });
  if (completion.usage) {
    await logLlmUsage({
      endpoint: "journal_report",
      model: JOURNAL_REPORT_MODEL,
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
    });
  }
  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new IncompleteJournalReport("empty response");
  try {
    return JSON.parse(content);
  } catch {
    throw new IncompleteJournalReport("not JSON");
  }
}

export function journalProblems(report: JournalReport, req: JournalReportRequest, t: JournalTallies): string[] {
  const numbers = allowedNumbers(t);
  numbers.add(Number(req.month.slice(5))); // "10월" / "October" style mentions of the month itself
  return Array.from(new Set([...checkLanguageSlips(report, req.locale), ...checkJournalReport(report, req.locale, numbers)]));
}

async function polish(report: JournalReport, req: JournalReportRequest, t: JournalTallies): Promise<JournalReport> {
  const problems = journalProblems(report, req, t);
  if (problems.length === 0) return req.locale === "ko" ? stripHanja(report) : report;
  console.info(`[journalReport] ${problems.length} finding(s)`); // no text: findings can quote the user's lines
  const repaired = await repairStringFindings(report, problems, makeRewriter(client, JOURNAL_REPORT_MODEL, req.locale));
  const result = journalProblems(repaired, req, t).length <= problems.length ? repaired : report;
  return req.locale === "ko" ? stripHanja(result) : result;
}

export async function generateJournalReport(req: JournalReportRequest, days: JournalDay[]): Promise<JournalReport> {
  // Too few days with a known rhythm leaves nothing to read (the model then writes about an empty month).
  if (days.length < MIN_JOURNAL_ENTRIES) throw new Error(`only ${days.length} day(s) with a rhythm`);
  const tallies = tallyJournal(days);
  const prompt = buildJournalReportPrompt(req, days, tallies);
  let last: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await polish(parseJournalReport(await callModel(prompt)), req, tallies);
    } catch (err) {
      if (!(err instanceof IncompleteJournalReport)) throw err;
      last = err;
    }
  }
  throw last;
}

