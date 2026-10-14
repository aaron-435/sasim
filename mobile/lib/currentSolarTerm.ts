import type { ArtKey } from "../data/art/manifest";

// 기기 로컬 날짜 기준, 지난 가장 가까운 절기의 그림 키. 정확한 천문 시각 계산 없이
// 고정 월/일 표를 쓰므로 실제 절기 시각과 ±1일 오차가 날 수 있다.
const SOLAR_TERMS: Array<{ month: number; day: number; key: ArtKey }> = [
  { month: 1, day: 6, key: "term-23-sohan" },
  { month: 1, day: 20, key: "term-24-daehan" },
  { month: 2, day: 4, key: "term-01-ipchun" },
  { month: 2, day: 19, key: "term-02-usu" },
  { month: 3, day: 6, key: "term-03-gyeongchip" },
  { month: 3, day: 21, key: "term-04-chunbun" },
  { month: 4, day: 5, key: "term-05-cheongmyeong" },
  { month: 4, day: 20, key: "term-06-gogu" },
  { month: 5, day: 6, key: "term-07-ipha" },
  { month: 5, day: 21, key: "term-08-soman" },
  { month: 6, day: 6, key: "term-09-mangjong" },
  { month: 6, day: 21, key: "term-10-haji" },
  { month: 7, day: 7, key: "term-11-soseo" },
  { month: 7, day: 23, key: "term-12-daeseo" },
  { month: 8, day: 8, key: "term-13-ipchu" },
  { month: 8, day: 23, key: "term-14-cheoseo" },
  { month: 9, day: 8, key: "term-15-baengno" },
  { month: 9, day: 23, key: "term-16-chubun" },
  { month: 10, day: 8, key: "term-17-hallo" },
  { month: 10, day: 23, key: "term-18-sanggang" },
  { month: 11, day: 7, key: "term-19-ipdong" },
  { month: 11, day: 22, key: "term-20-soseol" },
  { month: 12, day: 7, key: "term-21-daeseol" },
  { month: 12, day: 22, key: "term-22-dongji" },
];

export function currentSolarTermArtKey(date: Date): ArtKey {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const value = month * 100 + day;
  let current: ArtKey = "term-22-dongji"; // 1/1~1/5는 전해 동지
  for (const term of SOLAR_TERMS) {
    if (term.month * 100 + term.day > value) break;
    current = term.key;
  }
  return current;
}
