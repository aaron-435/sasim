import { StatusBar } from "expo-status-bar";
import { useFonts, CormorantGaramond_500Medium } from "@expo-google-fonts/cormorant-garamond";
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen, { type ChatExtract } from "./screens/ChatScreen";
import CityScreen, { type SajuResult } from "./screens/CityScreen";
import DobScreen from "./screens/DobScreen";
import GenderScreen from "./screens/GenderScreen";
import HomeScreen from "./screens/HomeScreen";
import IntroScreen from "./screens/IntroScreen";
import LanguageScreen from "./screens/LanguageScreen";
import ModuleSelectScreen from "./screens/ModuleSelectScreen";
import NicknameScreen from "./screens/NicknameScreen";
import QAScreen from "./screens/QAScreen";
import QuizScreen, { type QuizDiagnosis } from "./screens/QuizScreen";
import ReportScreen from "./screens/ReportScreen";
import TobScreen from "./screens/TobScreen";
import VerifyCodeScreen, { type VerifiedData } from "./screens/VerifyCodeScreen";
import { dominantElementFrom } from "./lib/elements";
import { LocaleProvider, useLocale } from "./lib/i18n";
import { configurePurchases } from "./lib/purchases";
import { normalizeVerifyCodeSajuResult, type NormalizedSajuResult } from "./lib/saju";

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
type StepId = "language" | "intro" | "verifyCode" | "nickname" | "gender" | "dob" | "tob" | "city" | "home" | "qa" | "moduleSelect" | "quiz" | "chat" | "report";

type HomeData = { nickname: string; sajuResult: NormalizedSajuResult };

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
  const { ready: localeReady, hasStoredLocale } = useLocale();

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
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [quizDiagnosis, setQuizDiagnosis] = useState<QuizDiagnosis | null>(null);
  const [chatExtract, setChatExtract] = useState<ChatExtract | null>(null);

  useEffect(() => {
    if (localeReady && step === null) {
      setStep(hasStoredLocale ? "intro" : "language");
    }
  }, [localeReady, hasStoredLocale, step]);

  // Android hardware back button — a plain BackHandler listener, unrelated to the
  // window.history/popstate approach that broke web's "이전" button (see
  // [[project-fatesaid-history-api-bug]]; that was a browser-history/App-Router
  // conflict specific to web, this is RN's own native key event, no such conflict
  // exists here). Steps back through the same transitions each screen's own onBack
  // prop already uses; "intro" and "home" are treated as roots (default Android
  // behavior — exit the app — applies there, same as a back gesture on any app's
  // top-level screen).
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      switch (step) {
        case "verifyCode":
          setStep("intro");
          return true;
        case "nickname":
          setStep("verifyCode");
          return true;
        case "gender":
          setStep("nickname");
          return true;
        case "dob":
          setStep("gender");
          return true;
        case "tob":
          setStep("dob");
          return true;
        case "city":
          setStep("tob");
          return true;
        case "qa":
        case "moduleSelect":
        case "chat":
        case "report":
          setStep("home");
          return true;
        case "quiz":
          setStep("moduleSelect");
          return true;
        default:
          return false; // "intro" / "home" — let Android's default back (exit app) happen
      }
    });
    return () => sub.remove();
  }, [step]);

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
            setHomeData({ nickname: data.nickname, sajuResult: normalizeVerifyCodeSajuResult(row, dominant) });
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
            setHomeData({
              nickname: nickname.trim(),
              sajuResult: {
                elements: result.elements ?? {},
                dominantElement: result.dominantElement ?? null,
                fourPillars: result.fourPillars,
                decadeFortune: result.decadeFortune,
                currentAge: result.currentAge,
              },
            });
            setStep("home");
          }}
          onBack={() => setStep("tob")}
        />
      )}

      {step === "home" && homeData && (
        <HomeScreen
          nickname={homeData.nickname}
          dominantElement={homeData.sajuResult.dominantElement}
          elements={homeData.sajuResult.elements}
          onOpenQA={() => setStep("qa")}
          onOpenQuiz={() => setStep("moduleSelect")}
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
            setStep("report");
          }}
          onBack={() => setStep("home")}
        />
      )}

      {step === "report" && quizDiagnosis && homeData && (
        <ReportScreen
          nickname={homeData.nickname}
          elements={homeData.sajuResult.elements}
          quizDiagnosis={quizDiagnosis}
          chatExtract={chatExtract}
          sessionId={sessionId}
          onBack={() => setStep("home")}
        />
      )}
    </SafeAreaProvider>
  );
}
