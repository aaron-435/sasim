# Google Play 개발자 페이지 입력값

Play Console > 개발자 페이지. 마지막 입력일: 2026-09-21.

| 항목 | 값 |
|---|---|
| 개발자 아이콘 (필수) | `../play-store-icon-512.png` (512x512, 24비트 PNG, 불투명, 69KB) |
| 헤더 이미지 (필수) | `developer-header-4096x2304.jpg` (4096x2304, JPEG, 불투명, 282KB) |
| 추천 앱 | 앱이 프로덕션에 게시된 뒤 선택 (선택 항목) |
| 개발자 웹사이트 | `https://www.fatesaidapp.com` |

## 광고 문구 (필수, 최대 140자)

랜딩 페이지(`lib/i18n/*.ts`의 `heroBody`)와 같은 어휘를 쓴다. 기본값은 en-US, 나머지는 번역 관리에서 추가.

- en-US (139자): A real saju calculation combined with psychology and AI conversation, to help you understand your temperament and the rhythm you're in now.
- ko-KR (56자): 실제 만세력 계산에 심리학과 AI 상담을 더해, 나의 성향과 지금 나의 리듬을 이해하도록 도와드려요.
- es-419 (136자): Un cálculo real de saju unido a la psicología y a la conversación con IA, para entender tu temperamento y el momento que estás viviendo.

## 헤더 이미지 다시 만들 때

로고 타일(`mobile/assets/icon.png`)의 배경이 앱 배경색 `#122019`와 같아서 같은 색 캔버스 위에 이음새 없이 올라간다. 가로 배치 로고+워드마크(Cormorant Garamond 500, 태그라인은 Manrope 700)를 세로 중앙 띠에 두어 넓게 잘려도 남는다. 스토어 문구는 `SAJU READINGS & SELF-DISCOVERY`로 피처 그래픽과 통일.
