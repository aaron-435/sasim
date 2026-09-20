import { StatusBar } from "expo-status-bar";
import { useFonts, CormorantGaramond_500Medium } from "@expo-google-fonts/cormorant-garamond";
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen, { type ChatExtract } from "./screens/ChatScreen";
import CityScreen, { type SajuResult } from "./screens/CityScreen";
import CompatibilityScreen from "./screens/CompatibilityScreen";
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
import VerifyCodeScreen, { type VerifiedData } from "./screens/VerifyCodeScreen";
import { scheduleDecadeTransitionNotification } from "./lib/decadeNotification";
import { DEFAULT_NOTIFICATION_PREFERENCE, getStoredNotificationPreference, setNotificationPreference } from "./lib/notificationPreference";
import { applyNotificationPreference } from "./lib/routineNotification";
import { dominantElementFrom } from "./lib/elements";
import { LocaleProvider, useLocale, useStrings } from "./lib/i18n";
import { configurePurchases, hasQaProEntitlement } from "./lib/purchases";
import { clearHomeData, getStoredHomeData, saveHomeData } from "./lib/homeDataStorage";
import { normalizeVerifyCodeSajuResult, type NormalizedSajuResult } from "./lib/saju";
import { clearSavedReports, type SavedReport } from "./lib/reportStorage";
import { clearSavedYearReports } from "./lib/yearReportStorage";
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
type StepId = "language" | "intro" | "verifyCode" | "nickname" | "gender" | "dob" | "tob" | "city" | "concern" | "home" | "qa" | "moduleSelect" | "quiz" | "chat" | "report" | "type" | "compatibility" | "fortune" | "sajuLearn" | "settings" | "myReports" | "shareCards" | "yearReport" | "qaReport";

type HomeData = { nickname: string; sajuResult: NormalizedSajuResult };

// Where Android's hardware back goes from each step — mirrors each screen's own onBack
// prop below. Steps missing here are roots, where back falls through to exiting the app.
const BACK_TARGET: Partial<Record<StepId, StepId>> = {
  verifyCode: "intro",
  nickname: "verifyCode",
  gender: "nickname",
  dob: "gender",
  tob: "dob",
  city: "tob",
  concern: "city",
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
};

// The day master (일간) char and day branch (일지) the fortune/compatibility APIs key on —
// pulled from the stored reading's loosely-typed summary/fourPillars.
function dayMasterCharOf(homeData: HomeData): string | null {
  return (homeData.sajuResult.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char ?? null;
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
    CormorantGaramond_500Medium,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  const { ready: localeReady, hasStoredLocale, locale } = useLocale();
  const strings = useStrings();

  // Stays null until the persisted locale check resolves, so the very first render
  // already lands on the right starting screen — LanguageScreen for a first launch,
  // straight to "intro" for a returning session — instead of flashing the picker for
  // one frame before flipping away from it.
  const [step, setStep] = useState<StepId | null>(null);
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

  // Clears the persisted saju reading and every raw onboarding field, then drops the
  // user back at "intro" — the only way to re-onboard once a reading is auto-restored
  // on launch (see the effect above). Exposed from Settings.
  function handleLogout() {
    clearHomeData();
    clearUserConcern();
    clearSavedReports();
    clearSavedYearReports();
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

      {step === "intro" && <IntroScreen onNext={() => setStep("verifyCode")} />}

      {step === "verifyCode" && (
        <VerifyCodeScreen
          onVerified={(data: VerifiedData) => {
            const row = data.sajuResult as Parameters<typeof normalizeVerifyCodeSajuResult>[0];
            const dominant = dominantElementFrom(row?.elements);
            const newHomeData: HomeData = { nickname: data.nickname, sajuResult: normalizeVerifyCodeSajuResult(row, dominant) };
            setHomeData(newHomeData);
            saveHomeData(newHomeData);
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
          onBack={() => setStep("verifyCode")}
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
            setStep("home");
          }}
          onBack={() => setStep("city")}
        />
      )}

      {step === "home" && homeData && (
        <HomeScreen
          nickname={homeData.nickname}
          dominantElement={homeData.sajuResult.dominantElement}
          elements={homeData.sajuResult.elements}
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
            return mode ? { level: mode.level, persona: mode.persona, onOpenSampleReport: () => setStep("qaReport") } : null;
          })()}
          onOpenSajuLearn={() => setStep("sajuLearn")}
          onOpenSettings={() => setStep("settings")}
        />
      )}

      {step === "qaReport" && homeData && (() => {
        // Persona test mode only (dev web, opted in): a generated deep report opened directly,
        // skipping the paid quiz + chat flow. See dev/README.md.
        const fixture = qaDeepReport(locale, homeData.nickname);
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
          onBack={() => setStep("home")}
        />
      )}

      {step === "sajuLearn" && <SajuLearnScreen onBack={() => setStep("home")} />}

      {step === "settings" && <SettingsScreen onBack={() => setStep("home")} onLogout={handleLogout} />}

      {step === "type" && homeData?.sajuResult.sajuType && (
        <TypeScreen
          nickname={homeData.nickname}
          sajuType={homeData.sajuResult.sajuType}
          onBack={() => setStep("home")}
        />
      )}

      {step === "compatibility" && homeData && (
        <CompatibilityScreen
          selfNickname={homeData.nickname}
          selfDayMasterChar={dayMasterCharOf(homeData)}
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
          quizDiagnosis={quizDiagnosis}
          chatExtract={chatExtract}
          sessionId={sessionId}
          savedContent={savedReport?.content ?? null}
          onBack={() => setStep(savedReport ? "myReports" : "home")}
        />
      )}
    </SafeAreaProvider>
  );
}
