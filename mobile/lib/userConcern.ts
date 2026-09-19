import AsyncStorage from "@react-native-async-storage/async-storage";

// 2026-09-19: "지금 가장 궁금한 것" 온보딩 태깅 — 지금까지 track("romance"|"career")은
// ModuleSelectScreen에서 모듈을 고른 "이후"에만 알 수 있었다(그 모듈의 고정 속성이라서).
// 이 값은 그보다 훨씬 이르게, 온보딩 마지막 단계에서 유저가 직접 고른 정직한 선호도다.
// 같은 두 값을 재사용하는 이유: 소비처(챗봇/리포트 프레이밍)가 이미 이 타입 하나뿐이고,
// 새 taxonomy를 만들면 오히려 어느 쪽에도 정확히 안 맞는 값이 생긴다(mobile/lib/quiz/modules.ts의
// ModuleDefinition.track 주석 참고). 그 파일이 별도 Track 타입을 export하지 않아 여기서 같은
// 유니온을 그대로 다시 적는다.
export type Track = "romance" | "career";

const STORAGE_KEY = "fatesaid_user_concern";

export async function saveUserConcern(track: Track): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, track);
  } catch {
    // best-effort — worst case ModuleSelectScreen just shows no "추천" highlight
  }
}

export async function getStoredUserConcern(): Promise<Track | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw === "romance" || raw === "career" ? raw : null;
  } catch {
    return null;
  }
}

export async function clearUserConcern(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}
