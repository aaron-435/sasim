# 숏폼 예약 게시 안내

게시는 사용자가 직접 한다(SPEC: 자동 게시 제외). 스토어 공개 전에는 올리지 않는다(결정 17번).
플랫폼 화면은 자주 바뀐다. 아래 메뉴 이름이 다르면 화면을 따르고 이 파일을 고친다. "(확인 필요)"는 아직 실제 화면에서 확인하지 않은 부분이다.

## 0. 공개일에 한 번

1. 스토어 공개(iOS·Android)를 확인하고 그 날을 D0로 캘린더를 다시 만든다.
   ```bash
   npx tsx scripts/shortform/calendar.mts --d0 YYYY-MM-DD --write
   ```
   `--provisional` 없이 만들면 "임시" 표시가 빠진다. 끝 줄 "남은 일"에 기한 지난 F3(예: V19 입동)이나 제작 필요 개수가 나온다.
2. 손으로 고쳤으면 점검을 다시 돌린다.
   ```bash
   npx tsx scripts/shortform/calendar.mts --check
   ```
3. 웹 "coming soon"이 스토어 링크로 바뀌었는지, 프로필 링크가 `marketing/video-kit.md` 4장의 플랫폼별 UTM인지 확인한다.
4. 대본에 "link in bio"가 있는 영상은 스토어 공개 뒤에도 그대로 써도 된다(프로필 링크가 웹 유형 카드 → 스토어로 이어진다).

## 1. 파일 위치

영상 키 `V<NN>-<F>` 하나에 파일이 하나씩 있다(`marketing/video/`, git 제외).

| 형식 | TikTok | Instagram | YouTube |
|---|---|---|---|
| F1·F3·F4·F6 | `V<NN>-<F>.mp4` | 같은 mp4 (릴스) | 같은 mp4 (Shorts) |
| F2 | `V<NN>-F2/tt-*.png` 사진 게시물 | `V<NN>-F2/ig-*.png` 캐러셀 | `V<NN>-F2.mp4` 슬라이드 영상 |

캡션과 해시태그는 `marketing/shortform/produce/V<NN>-<F>.json`의 `caption`, `hashtags`를 그대로 붙인다. `aiVoice: true`인 영상은 캡션에 "Voiceover is AI-generated."가 들어 있는지 한 번 더 본다.

## 2. 한 주 예약 순서

캘린더 한 주(10개)를 한 번에 예약한다. 같은 영상은 TikTok과 Instagram에 **같은 날 같은 시간**으로, YouTube는 같은 날 복사로 건다.

### TikTok Studio (웹)
1. 컴퓨터 브라우저에서 TikTok Studio → 업로드.
2. mp4(F2는 `tt-*.png` 사진들)를 올리고 캡션·해시태그를 붙인다.
3. 게시 시간에서 "예약"을 고르고 캘린더의 날짜·시간(미 동부)을 넣는다. 화면 시간대가 한국이면 미 동부 12:00 = 한국 다음 날 02:00(서머타임 끝난 11월 기준, 14시간 차이)으로 바꿔 넣는다.
4. AI 음성 영상은 "AI 생성 콘텐츠" 표시 설정이 보이면 켠다(확인 필요: 메뉴 위치).
5. 예약 가능 기간은 짧다(약 10일, 확인 필요). 한 주씩 거는 이유다.
6. 사진 게시물(F2) 예약이 웹에서 안 되면 그날 앱에서 직접 올린다(확인 필요).

### Instagram (Meta Business Suite 또는 Instagram 앱)
1. Business Suite → 만들기 → 릴스(F2는 게시물, 캐러셀로 `ig-*.png` 여러 장).
2. 캡션·해시태그를 붙이고 "예약"으로 TikTok과 같은 날짜·시간을 넣는다.
3. Business Suite는 Instagram이 Facebook 페이지에 연결돼 있어야 보인다. 연결이 없으면 Instagram 앱의 고급 설정 → 게시물 예약을 쓴다(프로페셔널 계정, 확인 필요).
4. F6처럼 음원을 플랫폼에서 고르는 영상은 앱에서 음원을 붙여야 한다. Business Suite에서 음원 선택이 안 되면 앱으로 예약한다. 음원은 상업 이용 가능 표시가 있는 것만 고른다(`marketing/video-kit.md` 5-1절).

### YouTube Studio (복사 게시)
1. YouTube Studio → 만들기 → 동영상 업로드. 세로 mp4(3분 이하)는 Shorts로 분류된다.
2. 제목은 훅(`hook`), 설명은 캡션을 붙인다.
3. 공개 상태 → 예약 → 같은 날짜·시간.
4. "변경되거나 합성된 콘텐츠" 질문은 사실처럼 보이는 합성 인물·장면이 대상이다. 우리 영상(앱 화면 + AI 내레이션)은 해당 없을 가능성이 높지만, 화면 설명을 읽고 정한다(확인 필요).

## 3. 게시 뒤

- 게시되면 `marketing/shortform/tracker.csv`의 그 행에 `post_date`, `post_url`을 적는다(플랫폼마다 한 행).
- 48시간·7일 뒤 조회·공유·저장·프로필 방문·링크 클릭을 같은 행에 적는다(TODO 11). Aside로 읽게 할 때는 읽기만 한다.
- 댓글에 생년월일을 남기라는 답글, 유명인 언급, 정확도 장담은 하지 않는다(`video-kit.md` 규칙).
- 3~4주차 영상(캘린더의 "제작 필요")은 2주 리뷰(TODO 12) 뒤 형식 구성을 정하고 만든다. 새로 만들면 tracker.csv에 행을 더한다.
