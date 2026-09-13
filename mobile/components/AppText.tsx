import { Platform, Text as RNText, type TextProps } from "react-native";

// Korean line-breaking defaults to allowing a break between ANY two syllable
// blocks (the RN/iOS equivalent of CSS `word-break: normal`), which orphans a
// single morpheme onto its own line — confirmed live on the iOS Simulator:
// "차례입니다." wrapped as "차례입니" / "다.". `lineBreakStrategyIOS="hangul-word"`
// keeps Korean word boundaries intact on iOS, matching the `word-break: keep-all`
// fix already applied to the web app (see app/globals.css) — that same CSS
// property is what actually fixes it on web too (this app's Android/web target
// is Expo's react-native-web, so `style.wordBreak` reaches real DOM CSS there;
// confirmed live in the mobile-web preview: "여기부터는 심층리포트예요" was
// fragmenting into "여기" / "부터" / "는 심" / "층 리" / ... before this).
// `lineBreakStrategyIOS` has no native-Android equivalent and is a no-op on
// web, so both properties are needed together to cover all three targets.
const webStyle = Platform.OS === "web" ? ({ wordBreak: "keep-all", overflowWrap: "break-word" } as const) : undefined;

export default function AppText({ style, ...rest }: TextProps) {
  return <RNText lineBreakStrategyIOS="hangul-word" style={[webStyle as never, style]} {...rest} />;
}
