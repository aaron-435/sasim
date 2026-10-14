// AI 그림 매니페스트. 키 = IMAGE_PROMPTS_2026-10-14.md의 파일 이름(확장자 제외).
// 그림이 없는 키는 비워 두고, ArtImage가 코드 그림(fallback)을 그린다.
// ENTRIES 블록은 scripts/art-process.mts가 다시 쓴다. 손으로 고치지 않는다.

export const ART_KEYS = [
  // A. 일간 10 (큰 그림, 서버)
  "daymaster-gap", "daymaster-eul", "daymaster-byeong", "daymaster-jeong", "daymaster-mu",
  "daymaster-gi", "daymaster-gyeong", "daymaster-sin", "daymaster-im", "daymaster-gye",
  // B. 오행 5 (번들)
  "element-wood", "element-fire", "element-earth", "element-metal", "element-water",
  // C. 12지 12 (번들)
  "zodiac-rat", "zodiac-ox", "zodiac-tiger", "zodiac-rabbit", "zodiac-dragon", "zodiac-snake",
  "zodiac-horse", "zodiac-goat", "zodiac-monkey", "zodiac-rooster", "zodiac-dog", "zodiac-pig",
  // D. 모듈 표지 12 (서버)
  "module1-love", "module2-money", "module3-burnout", "module4-mask", "module5-followthrough",
  "module6-anger", "module7-sensitivity", "module8-sleep", "module9-family", "module10-focus",
  "module11-expression", "module12-freshstart",
  // E. 24절기 (서버)
  "term-01-ipchun", "term-02-usu", "term-03-gyeongchip", "term-04-chunbun", "term-05-cheongmyeong",
  "term-06-gogu", "term-07-ipha", "term-08-soman", "term-09-mangjong", "term-10-haji",
  "term-11-soseo", "term-12-daeseo", "term-13-ipchu", "term-14-cheoseo", "term-15-baengno",
  "term-16-chubun", "term-17-hallo", "term-18-sanggang", "term-19-ipdong", "term-20-soseol",
  "term-21-daeseol", "term-22-dongji", "term-23-sohan", "term-24-daehan",
  // F. 빈 화면·오류·로딩 (번들)
  "empty-journal", "empty-compat", "empty-reports", "error-network", "error-generic", "loading-calc",
  // G. 질감 (번들)
  "texture-hanji", "texture-celadon", "texture-ink",
] as const;

export type ArtKey = (typeof ART_KEYS)[number];

export type ArtEntry = {
  /** 번들이면 require() 결과(number), 서버면 { uri }. */
  source: number | { uri: string };
  width: number;
  height: number;
  blurhash?: string;
};

// ENTRIES-START
export const ART_MANIFEST: Partial<Record<ArtKey, ArtEntry>> = {};
// ENTRIES-END
