import { StatusBar } from "expo-status-bar";
import { useFonts, Newsreader_500Medium, Newsreader_500Medium_Italic } from "@expo-google-fonts/newsreader";
import { PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen, { type ChatExtract } from "./screens/ChatScreen";
import CityScreen, { type SajuResult } from "./screens/CityScreen";
import CompatibilityScreen from "./screens/CompatibilityScreen";
import CompatReportScreen from "./screens/CompatReportScreen";
import ConcernScreen from "./screens/ConcernScreen";
import DobScreen from "./screens/DobScreen";
import FortuneScreen from "./screens/FortuneScreen";
import SajuLearnScreen from "./screens/SajuLearnScreen";
import GenderScreen from "./screens/GenderScreen";
import HomeScreen from "./screens/HomeScreen";
import IntroScreen from "./screens/IntroScreen";
import LanguageScreen from "./screens/LanguageScreen";
import ModuleSelectScreen from "./screens/ModuleSelectScreen";
import ShareCardsScreen from "./screens/ShareCardsScreen";
import YearReportScreen from "./screens/YearReportScreen";
import { getQaMode, qaDeepReport } from "./dev/qaMode";
import type { ReportContent } from "./screens/ReportScreen";
import { formatSajuTypeName } from "./lib/sajuTypeContent";
import MyReportsScreen from "./screens/MyReportsScreen";
import NicknameScreen from "./screens/NicknameScreen";
import QAScreen from "./screens/QAScreen";
import QuizScreen, { type QuizDiagnosis } from "./screens/QuizScreen";
import ReportScreen from "./screens/ReportScreen";
import TobScreen from "./screens/TobScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TypeScreen from "./screens/TypeScreen";
import TypeRevealScreen from "./screens/TypeRevealScreen";
import VerifyCodeScreen, { type VerifiedData } from "./screens/VerifyCodeScreen";
import * as Notifications from "expo-notifications";
import { scheduleDecadeTransitionNotification } from "./lib/decadeNotification";
import { setAnalyticsLocale, track } from "./lib/analytics";
import { DEFAULT_NOTIFICATION_PREFERENCE, getStoredNotificationPreference, setNotificationPreference } from "./lib/notificationPreference";
import { applyNotificationPreference } from "./lib/routineNotification";
import { dominantElementFrom } from "./lib/elements";
import { LocaleProvider, useLocale, useStrings } from "./lib/i18n";
import { configurePurchases, hasQaProEntitlement } from "./lib/purchases";
import { clearHomeData, getStoredHomeData, saveHomeData } from "./lib/homeDataStorage";
import { normalizeVerifyCodeSajuResult, type NormalizedSajuResult } from "./lib/saju";
import { clearSavedReports, type SavedReport } from "./lib/reportStorage";
import { clearSavedYearReports } from "./lib/yearReportStorage";
import { clearSavedCompatReports, type SavedCompatReport } from "./lib/compatReportStorage";
import { clearSavedInvites } from "./lib/invites";
import { clearPair } from "./lib/pairs";
import { clearJournal } from "./lib/journalStorage";
import { clearUserConcern, getStoredUserConcern, saveUserConcern, type Track } from "./lib/userConcern";

// Onboarding flow shell — mirrors components/AppFlow.jsx's step-switcher role on web,
// just with local state for now (no react-navigation/expo-router wired up yet; this is
// still the "does this feel high-quality" proof-of-concept phase, not the final wiring).
// STEP_IDS matches components/OnboardingWizard.jsx's list, plus "language" (the very
// first screen — manual locale picker, see lib/i18n/README), "verifyCode" (the
// web→app handoff screen), "home" (the hub landing screen reached from either path),
// "qa" (independently reachable), and moduleSelect→quiz→chat→report (the other
// pipeline — chained, not independently reachable from Home, since chat needs a quiz
// diagnosis and report needs both quiz+chat context — same dependency web's
// components/AppFlow.jsx has).
type StepId = "language" | "intro" | "verifyCode" | "nickname" | "gender" | "dob" | "tob" | "city" | "concern" | "typeReveal" | "home" | "qa" | "moduleSelect" | "quiz" | "chat" | "report" | "type" | "compatibility" | "fortune" | "sajuLearn" | "settings" | "myReports" | "shareCards" | "yearReport" | "qaReport" | "compatReport";

type HomeData = { nickname: string; sajuResult: NormalizedSajuResult };

// Onboarding screens whose entry is recorded as an `onboarding_step` event.
const ONBOARDING_STEPS: ReadonlySet<StepId> = new Set(["language", "intro", "verifyCode", "nickname", "gender", "dob", "tob", "city", "concern"]);

// Local notification ids (decadeNotification.ts, routineNotification.ts) → the `kind`
// recorded when one is tapped.
function notificationKind(identifier: string): string {
  if (identifier.includes("decade")) return "decade";
  if (identifier.includes("weekly")) return "weekly";
  if (identifier.includes("daily")) return "daily";
  return "other";
}

// Where Android's hardware back goes from each step — mirrors each screen's own onBack
// prop below. Steps missing here are roots, where back falls through to exiting the app.
const BACK_TARGET: Partial<Record<StepId, StepId>> = {
  verifyCode: "intro",
  nickname: "intro",
  gender: "nickname",
  dob: "gender",
  tob: "dob",
  city: "tob",
  concern: "city",
  typeReveal: "home",
  quiz: "moduleSelect",
  qa: "home",
  moduleSelect: "home",
  chat: "home",
  report: "home",
  type: "home",
  compatibility: "home",
  fortune: "home",
  sajuLearn: "home",
  settings: "home",
  myReports: "home",
  shareCards: "home",
  yearReport: "home",
  qaReport: "home",
  compatReport: "myReports",
};

// The day master (일간) char and day branch (일지) the fortune/compatibility APIs key on —
// pulled from the stored reading's loosely-typed summary/fourPillars.
function dayMasterCharOf(homeData: HomeData): string | null {
  return (homeData.sajuResult.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char ?? null;
}
const EL_KO_TO_KEY: Record<string, string> = { 목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water" };
/** The Day Master as the engine computed it, for the report (older stored readings may lack it). */
function dayMasterOf(homeData: HomeData): { char: string; element: string } | null {
  const dm = (homeData.sajuResult.summary as { dayMaster?: { char?: string; element?: string } } | undefined)?.dayMaster;
  const element = dm?.element ? EL_KO_TO_KEY[dm.element] : undefined;
  return dm?.char && element ? { char: dm.char, element } : null;
}
function dayBranchOf(homeData: HomeData): string | null {
  return (homeData.sajuResult.fourPillars as { day?: { earth?: string } } | undefined)?.day?.earth ?? null;
}

function makeSessionId() {
  // No expo-crypto installed for this POC — good enough for an opaque session key.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function App() {
  useEffect(() => {
    configurePurchases();
  }, []);

  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}

function AppContent() {
  const [fontsLoaded] = useFonts({
    Newsreader_500Medium,
    Newsreader_500Medium_Italic,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  const { ready: localeReady, hasStoredLocale, locale } = useLocale();
  const strings = useStrings();

  // Stays null until the persisted locale check resolves, so the very first render
  // already lands on the right starting screen — LanguageScreen for a first launch,
  // straight to "intro" for a returning session — instead of flashing the picker for
  // one frame before flipping away from it.
  const [step, setStep] = useState<StepId | null>(null);
  // Persona test mode only: which sample deep report "qaReport" opens (5-set flow or the older one).
  const [qaReportV2, setQaReportV2] = useState(false);
  const [sessionId] = useState(makeSessionId);
  const [nickname, setNickname] = useState("");
  const [isFemale, setIsFemale] = useState<boolean | null>(null);
  const [dobYear, setDobYear] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [tobHour, setTobHour] = useState("");
  const [tobMinute, setTobMinute] = useState("");
  const [tobPeriod, setTobPeriod] = useState<"AM" | "PM" | null>(null);
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [concern, setConcern] = useState<Track | null>(null);
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [quizDiagnosis, setQuizDiagnosis] = useState<QuizDiagnosis | null>(null);
  const [chatExtract, setChatExtract] = useState<ChatExtract | null>(null);
  // Set when a report is reopened from "My reports" (skips generation); null for a fresh one.
  const [savedReport, setSavedReport] = useState<SavedReport | null>(null);
  // A compatibility report reopened from "My reports".
  const [savedCompatReport, setSavedCompatReport] = useState<SavedCompatReport | null>(null);

  useEffect(() => {
    setAnalyticsLocale(locale);
  }, [locale]);

  useEffect(() => {
    if (step && ONBOARDING_STEPS.has(step)) track("onboarding_step", { step });
  }, [step]);

  // A tap on one of our local notifications (fortune routine, decade shift). Covers both
  // a tap while running and the tap that cold-started the app.
  useEffect(() => {
    if (Platform.OS === "web") return;
    const seen = new Set<string>();
    const record = (response: Notifications.NotificationResponse | null) => {
      if (!response) return;
      const id = response.notification.request.identifier;
      const key = `${id}:${response.notification.date}`;
      if (seen.has(key)) return;
      seen.add(key);
      track("notification_tap", { kind: notificationKind(id) });
    };
    Notifications.getLastNotificationResponseAsync().then(record).catch(() => {});
    const sub = Notifications.addNotificationResponseReceivedListener(record);
    return () => sub.remove();
  }, []);

  // Restores a previously-onboarded user straight to Home instead of making them
  // re-enter their birth info on every cold start (2026-09-15, caught in live device
  // testing — homeData used to be plain in-memory state with nothing backing it).
  useEffect(() => {
    if (!localeReady || step !== null) return;
    (async () => {
      const stored = await getStoredHomeData();
      if (stored) {
        setHomeData(stored);
        getStoredUserConcern().then(setConcern);
        setStep("home");
        return;
      }
      setStep(hasStoredLocale ? "intro" : "language");
    })();
  }, [localeReady, hasStoredLocale, step]);

  // (Re)schedules the one local "your decade fortune is about to shift" heads-up
  // whenever a saju reading becomes available (fresh onboarding or a verify-code
  // restore) — see lib/decadeNotification.ts for why this needs no push server.
  useEffect(() => {
    if (!homeData) return;
    scheduleDecadeTransitionNotification(
      strings,
      homeData.sajuResult.decadeFortune,
      homeData.sajuResult.currentAge,
      homeData.sajuResult.birthYear,
      homeData.sajuResult.birthMonth,
      homeData.sajuResult.birthDay
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeData]);

  // First time a user reaches Home, no explicit Settings choice exists yet — apply and
  // persist the default (see notificationPreference.ts) so it's actually scheduled, not
  // just what Settings would show if opened. A later explicit choice is never overwritten.
  useEffect(() => {
    if (!homeData) return;
    (async () => {
      const stored = await getStoredNotificationPreference();
      if (stored !== null) return;
      await setNotificationPreference(DEFAULT_NOTIFICATION_PREFERENCE);
      await applyNotificationPreference(DEFAULT_NOTIFICATION_PREFERENCE, strings, await hasQaProEntitlement());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeData]);

  // A report's closing page recommends another module: straight into that module's quiz.
  function openModuleQuiz(id: string) {
    setModuleId(id);
    setStep("quiz");
  }

  // Clears the persisted saju reading and every raw onboarding field, then drops the
  // user back at "intro" — the only way to re-onboard once a reading is auto-restored
  // on launch (see the effect above). Exposed from Settings.
  function handleLogout() {
    clearHomeData();
    clearUserConcern();
    clearSavedReports();
    clearSavedYearReports();
    clearSavedCompatReports();
    clearSavedInvites();
    clearPair();
    clearJournal();
    setSavedReport(null);
    setHomeData(null);
    setNickname("");
    setIsFemale(null);
    setDobYear("");
    setDobMonth("");
    setDobDay("");
    setTobHour("");
    setTobMinute("");
    setTobPeriod(null);
    setTimeUnknown(false);
    setConcern(null);
    setStep("intro");
  }

  // Android hardware back button — a plain BackHandler listener, unrelated to the
  // window.history/popstate approach that broke web's "이전" button (see
  // [[project-fatesaid-history-api-bug]]; that was a browser-history/App-Router
  // conflict specific to web, this is RN's own native key event, no such conflict
  // exists here). Steps back through the same transitions each screen's own onBack
  // prop already uses; "language", "intro" and "home" are treated as roots (default
  // Android behavior — exit the app — applies there, same as a back gesture on any
  // app's top-level screen).
  //
  // 2026-09-19: registered ONCE and reads the current step through a ref. It used to
  // re-register on every step change, which (a) put it after any listener a child
  // screen added on mount — RN calls the most recently added listener first, so a
  // screen could never intercept back for its own sub-views (QAScreen needs to) —
  // and (b) the switch was missing type/compatibility/fortune/sajuLearn/settings, so
  // back on any of those exited the app instead of returning Home.
  const stepRef = useRef(step);
  stepRef.current = step;
  const savedReportRef = useRef(savedReport);
  savedReportRef.current = savedReport;
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      // A report reopened from "My reports" goes back to that list, not straight Home.
      const prev = stepRef.current === "report" && savedReportRef.current ? "myReports" : BACK_TARGET[stepRef.current ?? "home"];
      if (!prev) return false;
      setStep(prev);
      return true;
    });
    return () => sub.remove();
  }, []);

  if (!fontsLoaded || step === null) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {step === "language" && <LanguageScreen onNext={() => setStep("intro")} />}

      {step === "intro" && <IntroScreen onNext={() => setStep("nickname")} onVerifyCode={() => setStep("verifyCode")} />}

      {step === "verifyCode" && (
        <VerifyCodeScreen
          onVerified={(data: VerifiedData) => {
            const row = data.sajuResult as Parameters<typeof normalizeVerifyCodeSajuResult>[0];
            const dominant = dominantElementFrom(row?.elements);
            const newHomeData: HomeData = { nickname: data.nickname, sajuResult: normalizeVerifyCodeSajuResult(row, dominant) };
            setHomeData(newHomeData);
            saveHomeData(newHomeData);
            track("onboarding_complete", { via: "verify_code" });
            setStep("home");
          }}
          onSkip={() => setStep("nickname")}
          onBack={() => setStep("intro")}
        />
      )}

      {step === "nickname" && (
        <NicknameScreen
          value={nickname}
          onChange={setNickname}
          onNext={() => setStep("gender")}
          onBack={() => setStep("intro")}
        />
      )}

      {step === "gender" && (
        <GenderScreen
          isFemale={isFemale}
          onChange={setIsFemale}
          onNext={() => setStep("dob")}
          onBack={() => setStep("nickname")}
        />
      )}

      {step === "dob" && (
        <DobScreen
          year={dobYear}
          month={dobMonth}
          day={dobDay}
          onChangeYear={setDobYear}
          onChangeMonth={setDobMonth}
          onChangeDay={setDobDay}
          onNext={() => setStep("tob")}
          onBack={() => setStep("gender")}
        />
      )}

      {step === "tob" && (
        <TobScreen
          hour={tobHour}
          minute={tobMinute}
          period={tobPeriod}
          timeUnknown={timeUnknown}
          onChangeHour={setTobHour}
          onChangeMinute={setTobMinute}
          onChangePeriod={setTobPeriod}
          onToggleUnknown={() => setTimeUnknown((v) => !v)}
          onNext={() => setStep("city")}
          onBack={() => setStep("dob")}
        />
      )}

      {step === "city" && isFemale !== null && (
        <CityScreen
          birthPayload={{
            birthYear: Number(dobYear),
            birthMonth: Number(dobMonth),
            birthDay: Number(dobDay),
            birthHour: timeUnknown ? null : tobPeriod === "PM" ? (Number(tobHour) % 12) + 12 : Number(tobHour) % 12,
            birthMinute: timeUnknown ? 0 : Number(tobMinute) || 0,
            isFemale,
            sessionId,
            nickname: nickname.trim(),
          }}
          onSubmitted={(result: SajuResult) => {
            const newHomeData: HomeData = {
              nickname: nickname.trim(),
              sajuResult: {
                elements: result.elements ?? {},
                dominantElement: result.dominantElement ?? null,
                fourPillars: result.fourPillars,
                decadeFortune: result.decadeFortune,
                currentAge: result.currentAge,
                sajuType: result.sajuType ?? null,
                // 2026-09-15: 이 필드가 빠져 있어서 selfDayMasterChar가 계속 null이
                // 되고, 궁합/오늘의 운세가 조용히 아무것도 안 뜨는 채로 멈춰 있었다.
                summary: result.summary,
                birthYear: result.birthYear,
                birthMonth: result.birthMonth,
                birthDay: result.birthDay,
              },
            };
            setHomeData(newHomeData);
            saveHomeData(newHomeData);
            setStep("concern");
          }}
          onBack={() => setStep("tob")}
        />
      )}

      {step === "concern" && (
        <ConcernScreen
          value={concern}
          onChange={setConcern}
          onNext={() => {
            if (concern) saveUserConcern(concern);
            track("onboarding_complete", { via: "app", ...(concern ? { topic: concern } : {}) });
            // New users see their type once before Home; a reading without a type goes straight Home.
            setStep(homeData?.sajuResult.sajuType ? "typeReveal" : "home");
          }}
          onBack={() => setStep("city")}
        />
      )}

      {step === "typeReveal" && homeData?.sajuResult.sajuType && (
        <TypeRevealScreen
          nickname={homeData.nickname}
          sajuType={homeData.sajuResult.sajuType}
          fourPillars={homeData.sajuResult.fourPillars}
          elements={homeData.sajuResult.elements ?? null}
          onDone={() => setStep("home")}
        />
      )}

      {step === "home" && homeData && (
        <HomeScreen
          nickname={homeData.nickname}
          elements={homeData.sajuResult.elements}
          fourPillars={homeData.sajuResult.fourPillars}
          sajuType={homeData.sajuResult.sajuType ?? null}
          selfDayMasterChar={dayMasterCharOf(homeData)}
          selfDayBranch={dayBranchOf(homeData)}
          preferredTrack={concern}
          onOpenQA={() => setStep("qa")}
          onOpenQuiz={() => setStep("moduleSelect")}
          onOpenType={() => setStep("type")}
          onOpenCompatibility={() => setStep("compatibility")}
          onOpenFortune={() => setStep("fortune")}
          onOpenMyReports={() => setStep("myReports")}
          onOpenShareCards={() => setStep("shareCards")}
          onOpenYearReport={() => setStep("yearReport")}
          qa={(() => {
            const mode = getQaMode();
            if (!mode) return null;
            const open = (v2: boolean) => () => {
              setQaReportV2(v2);
              setStep("qaReport");
            };
            const hasV2 = !!homeData && !!qaDeepReport(locale, homeData.nickname, true);
            return { level: mode.level, persona: mode.persona, onOpenSampleReport: open(false), onOpenSampleReportV2: hasV2 ? open(true) : undefined };
          })()}
          onOpenSajuLearn={() => setStep("sajuLearn")}
          onOpenSettings={() => setStep("settings")}
        />
      )}

      {step === "qaReport" && homeData && (() => {
        // Persona test mode only (dev web, opted in): a generated deep report opened directly,
        // skipping the paid quiz + chat flow. See dev/README.md.
        const fixture = qaDeepReport(locale, homeData.nickname, qaReportV2);
        if (!fixture) return null;
        return (
          <ReportScreen
            nickname={homeData.nickname}
            elements={homeData.sajuResult.elements}
            decadeFortune={homeData.sajuResult.decadeFortune}
            currentAge={homeData.sajuResult.currentAge}
            quizDiagnosis={fixture.quizDiagnosis as QuizDiagnosis}
            chatExtract={fixture.chatExtract as ChatExtract}
            sessionId={sessionId}
            savedContent={fixture.content as ReportContent}
            onBack={() => setStep("home")}
            onOpenModule={openModuleQuiz}
          />
        );
      })()}

      {step === "yearReport" && homeData && (
        <YearReportScreen
          nickname={homeData.nickname}
          selfDayMasterChar={dayMasterCharOf(homeData)}
          selfDayBranch={dayBranchOf(homeData)}
          elements={homeData.sajuResult.elements}
          sajuTypeName={homeData.sajuResult.sajuType ? formatSajuTypeName(locale, homeData.sajuResult.sajuType) : null}
          decadeFortune={homeData.sajuResult.decadeFortune}
          currentAge={homeData.sajuResult.currentAge}
          onBack={() => setStep("home")}
        />
      )}

      {step === "shareCards" && homeData?.sajuResult.sajuType && (
        <ShareCardsScreen
          nickname={homeData.nickname}
          sajuType={homeData.sajuResult.sajuType}
          selfDayMasterChar={dayMasterCharOf(homeData)}
          selfDayBranch={dayBranchOf(homeData)}
          onOpenFortune={() => setStep("fortune")}
          onBack={() => setStep("home")}
        />
      )}

      {step === "myReports" && (
        <MyReportsScreen
          onOpen={(report) => {
            setQuizDiagnosis(report.quizDiagnosis);
            setChatExtract(report.chatExtract);
            setSavedReport(report);
            setStep("report");
          }}
          onOpenCompat={(report) => {
            setSavedCompatReport(report);
            setStep("compatReport");
          }}
          onBack={() => setStep("home")}
        />
      )}

      {step === "compatReport" && savedCompatReport && homeData && dayMasterCharOf(homeData) && (
        <CompatReportScreen
          nickname={homeData.nickname}
          otherName={savedCompatReport.otherName}
          other={savedCompatReport.other}
          selfDayMasterChar={dayMasterCharOf(homeData)!}
          selfDayBranch={dayBranchOf(homeData)}
          selfElements={homeData.sajuResult.elements ?? null}
          sessionId={sessionId}
          onBack={() => setStep("myReports")}
        />
      )}

      {step === "sajuLearn" && <SajuLearnScreen onBack={() => setStep("home")} />}

      {step === "settings" && <SettingsScreen onBack={() => setStep("home")} onLogout={handleLogout} />}

      {step === "type" && homeData?.sajuResult.sajuType && (
        <TypeScreen
          nickname={homeData.nickname}
          sajuType={homeData.sajuResult.sajuType}
          fourPillars={homeData.sajuResult.fourPillars}
          elements={homeData.sajuResult.elements ?? null}
          onBack={() => setStep("home")}
        />
      )}

      {step === "compatibility" && homeData && (
        <CompatibilityScreen
          selfNickname={homeData.nickname}
          selfDayMasterChar={dayMasterCharOf(homeData)}
          selfDayBranch={dayBranchOf(homeData)}
          selfElements={homeData.sajuResult.elements ?? null}
          selfSajuType={homeData.sajuResult.sajuType ?? null}
          sessionId={sessionId}
          onBack={() => setStep("home")}
        />
      )}

      {step === "fortune" && homeData && (
        <FortuneScreen
          selfDayMasterChar={dayMasterCharOf(homeData)}
          selfDayBranch={dayBranchOf(homeData)}
          onOpenYearReport={() => setStep("yearReport")}
          onBack={() => setStep("home")}
        />
      )}

      {step === "qa" && homeData && (
        <QAScreen
          nickname={homeData.nickname}
          sessionId={sessionId}
          sajuResult={homeData.sajuResult}
          onBack={() => setStep("home")}
        />
      )}

      {step === "moduleSelect" && (
        <ModuleSelectScreen
          preferredTrack={concern}
          onSelect={(id) => {
            setModuleId(id);
            setStep("quiz");
          }}
          onBack={() => setStep("home")}
        />
      )}

      {step === "quiz" && moduleId && homeData && (
        <QuizScreen
          moduleId={moduleId}
          sajuElements={homeData.sajuResult.elements}
          sessionId={sessionId}
          onComplete={(diagnosis) => {
            setQuizDiagnosis(diagnosis);
            setStep("chat");
          }}
          onBack={() => setStep("moduleSelect")}
        />
      )}

      {step === "chat" && quizDiagnosis && homeData && (
        <ChatScreen
          nickname={homeData.nickname}
          sessionId={sessionId}
          quizDiagnosis={quizDiagnosis}
          onComplete={(extract) => {
            setChatExtract(extract);
            setSavedReport(null);
            setStep("report");
          }}
          onBack={() => setStep("home")}
        />
      )}

      {step === "report" && quizDiagnosis && homeData && (
        <ReportScreen
          nickname={homeData.nickname}
          elements={homeData.sajuResult.elements}
          decadeFortune={homeData.sajuResult.decadeFortune}
          currentAge={homeData.sajuResult.currentAge}
          dayMaster={dayMasterOf(homeData)}
          quizDiagnosis={quizDiagnosis}
          chatExtract={chatExtract}
          sessionId={sessionId}
          savedContent={savedReport?.content ?? null}
          onBack={() => setStep(savedReport ? "myReports" : "home")}
          onOpenModule={openModuleQuiz}
        />
      )}
    </SafeAreaProvider>
  );
}
