import { Text as RNText, type TextProps } from "react-native";

// Korean line-breaking defaults to allowing a break between ANY two syllable
// blocks (the RN/iOS equivalent of CSS `word-break: normal`), which orphans a
// single morpheme onto its own line — confirmed live on the iOS Simulator:
// "차례입니다." wrapped as "차례입니" / "다.". `lineBreakStrategyIOS="hangul-word"`
// keeps Korean word boundaries intact, matching the `word-break: keep-all` fix
// already applied to the web app (see app/globals.css). iOS-only prop — no RN
// equivalent exists for Android, and it's unverified whether Android's text
// layout has the same problem.
export default function AppText(props: TextProps) {
  return <RNText lineBreakStrategyIOS="hangul-word" {...props} />;
}
