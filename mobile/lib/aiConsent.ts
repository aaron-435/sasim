// One-time in-app consent for sending personal data to the third-party AI provider
// (App Store guideline 5.1.2(i), rev. 2025-11: disclose where the data goes and what is
// sent, and get explicit permission first — the privacy-policy mention alone is not
// enough). Every server call that reaches OpenAI awaits requestAiConsent() before its
// fetch; the grant is kept under the key below so it is asked once, and Settings can
// withdraw it. Key readers: screens/QAScreen, ChatScreen, ReportScreen,
// CompatReportScreen, YearReportScreen, JournalScreen (gates), screens/SettingsScreen
// (status + withdraw), App.tsx (cleared on logout).
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "fatesaid_ai_consent_v1";
const GRANTED = "granted";

type Presenter = () => Promise<boolean>;

// Set by <AiConsentHost/> while it is mounted; screens never touch the host directly.
let presenter: Presenter | null = null;
// The in-flight prompt, shared so two gates at once still show a single sheet.
let pending: Promise<boolean> | null = null;

export function registerAiConsentPresenter(fn: Presenter | null): void {
  presenter = fn;
}

export async function hasAiConsent(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(STORAGE_KEY)) === GRANTED;
  } catch {
    return false;
  }
}

export async function setAiConsent(granted: boolean): Promise<void> {
  try {
    if (granted) await AsyncStorage.setItem(STORAGE_KEY, GRANTED);
    else await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort — a failed write just means asking again next time
  }
}

export async function requestAiConsent(): Promise<boolean> {
  if (await hasAiConsent()) return true;
  if (pending) return pending;
  const show = presenter;
  if (!show) return false;
  let shown: Promise<boolean>;
  try {
    shown = show();
  } catch {
    return false;
  }
  pending = shown
    .catch(() => false)
    .then(async (allowed) => {
      pending = null;
      if (allowed) await setAiConsent(true);
      return allowed;
    });
  return pending;
}
