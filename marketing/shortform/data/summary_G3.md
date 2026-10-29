# G3 요약 (olivelyapp, psych.2.grow, zenfulnote), 60편

근거: `coded_G3.csv`(코딩) + `videos_raw.csv`. 프레임은 0초·2초를 봤다. zenfulnote 7685890861967756574는 프레임이 없어 설명만으로 추정했다(note에 "no frames"). `score_install`은 비워 뒀다.

## 계정별 숫자
| 계정 | 계정 중앙값 조회수 | 표본 20편 중앙값 | 최고 이상치 |
|---|---|---|---|
| olivelyapp | 1,014 | 29,815 | 420만 (4,142배) |
| psych.2.grow | 39,600 | 543,150 | 220만 (55배) |
| zenfulnote | 571 | 60,105 | 62만 (1,087배) |

- Olively의 중앙값이 약 1천이라 배수가 크게 나온다. 1,000배는 "조회수 100만 안팎"이라는 뜻이지 영상이 1,000배 특별하다는 뜻은 아니다.
- 표본은 최근 10편(조회 1천 안팎)과 상위 10편(5만~420만)으로 나뉜다. 그래서 표본 중앙값은 계정 실제 중앙값보다 훨씬 높다.
- Zenfulnote도 같은 구조다(중앙값 571, 상위 10편은 13만~62만).

## hook_type 단독 (이상치 배수와 공유율은 중앙값, n 작으면 주의)
| hook_type | n | 중앙값 outlier_x | 중앙값 share_rate |
|---|---|---|---|
| pov_situation | 7 | 986 | 0.018 |
| tool_demo | 2 (작음) | 312 | 0.035 |
| trend_meme | 1 (작음) | 859 | 0.034 |
| series_partN | 6 | 226 | 0.136 |
| list | 10 | 3.7 | 0.150 |
| other | 7 | 48 | 0.047 |
| question_to_viewer | 4 (작음) | 1.0 | 0.207 |
| explainer | 23 | 1.1 | 0.329 |

## hook_type x format 조합 (n 3 이상만)
| 조합 | n | 중앙값 outlier_x | 중앙값 share_rate |
|---|---|---|---|
| explainer x other (psych.2.grow 긴 만화) | 16 | 3.3 | 0.41 |
| explainer x image_text (Olively 글자 카드) | 7 | 1.0 | 0.00 |
| pov_situation x screen_recording (Olively 앱 화면) | 6 | 1,036 | 0.019 |
| other x other | 5 | 35 | 0.275 |
| list x other (Zenfulnote 일지) | 4 | 130 | 0.157 |
| series_partN x other (Zenfulnote 일지) | 4 | 417 | 0.136 |
| list x image_text | 3 | 1.0 | 0.048 |
| list x greenscreen | 3 | 0.5 | 0.233 |

- 이상치 배수는 계정 중앙값에 좌우되므로 계정을 섞은 비교는 거칠다. 조합별 n이 작고 한 계정이 대부분이라 조합 효과인지 계정 효과인지 가를 수 없다.
- 공유율은 psych.2.grow가 가장 높고(0.2~0.8) Olively가 낮다(0~0.09, 대부분 0.02 안팎). 조회수는 Olively가 더 크게 터져도 공유율은 낮다.

## 이상치 상위 5
1. olivelyapp 7588413996517084429, 4,142배, 420만. https://www.tiktok.com/@olivelyapp/video/7588413996517084429 . 첫 화면부터 앱 입력 화면(Translate)과 "pov: you're trying not to sound unhinged before you hit send". 댓글 50개 중 "what app" 0, 회의적 7.
2. olivelyapp 7622608608773065998, 1,676배, 170만. https://www.tiktok.com/@olivelyapp/video/7622608608773065998 . 문자 캡처 "pov: he said I'm overthinking"에서 2초에 Decode 화면. 댓글 32개 중 what_app 0, 회의적 10.
3. zenfulnote 7516693175990340894, 1,087배, 62만. https://www.tiktok.com/@zenfulnote/video/7516693175990340894 . 70초, 컷 15, 일지 쓰는 손 + 촛불, "Do you have the neglect wound?". 공유율 0.17로 계정 최고. 홍보 대상은 앱이 아니라 책(The Shadow Work Journal).
4. olivelyapp 7614769905027665165, 1,085배, 110만. https://www.tiktok.com/@olivelyapp/video/7614769905027665165 . Translate 화면 + "pov: it's 1am and you're typing a paragraph that will ruin your relationship".
5. olivelyapp 7599115140906175758, 986배, 100만. https://www.tiktok.com/@olivelyapp/video/7599115140906175758 . "pov: anxious attachment" 짧은 라벨 + Translate 화면.

## 앱 화면 사용: 같은 계정 안 승자 vs 패자
- Olively 패자(이상치 1.1배 이하 8편, 최근 10일): 8~15초 글자 카드 + 어두운 영상 배경, 앱 화면 없음. 승자 중 앱 화면(Translate) 0초 시작인 편이 대부분(11~15, 17, 18, 20번).
- 예외로 얼굴 출연에 앱 없는 "DO NOT send that text"가 71k(70배), 글자 카드 9번이 4.7배다. 앱 화면이 유일한 원인이라고 말하긴 어렵다.
- 시간 교란: 패자는 모두 10월 말 게시라 조회가 아직 쌓이는 중일 수 있다. 승자는 12월~4월 게시다.
- psych.2.grow는 앱 자체가 없다(만화 + AI 내레이션). 이상치 차이는 주제 문구(No contact, 안 쫓음 등)에서 난다.
- Zenfulnote 승자(2025년 6~10월)는 앱이 아니라 일지 쓰는 손 + 책 홍보다. 최근 10편은 6~9초 카드이고 캡션에만 "Download the Zenfulnote app"이 있다(화면에는 안 나옴). 가장 큰 5.3배는 "Save this for when you need it" 카드다.
- Olively 댓글 표본 두 건 모두 "what app" 댓글 0이다. 앱 화면이 보여도 앱 질문이 안 달린다는 뜻이며, 설치 연결 신호는 약하다.

## 규칙 점수 1 이상 + 재현 점수 2
없다. 재현 점수 2는 한 편도 주지 않았다(얼굴·새 촬영·만화·스톡 영상·없는 기능이 하나씩 필요).
- 가장 가까운 것: Olively 7602059137559711031("the text I wanted to send vs the text that actually keeps me..."), 규칙 2, 확산 2, 재현 1. 우리에겐 문자 변환 기능이 없다. 성격 검사 결과 화면 전후 비교로 바꾸면 재현이 올라갈 수 있다.
- 규칙 2 + 확산 2 + 재현 1: psych.2.grow 7652673666211253537("Who suffers more during no contact? anxious or avoidant"), 7650846377165081889(둘 다 침묵하면). 둘 다 애착 모듈로 대체 가능하지만 8~9분 만화는 안 맞다.
- 규칙 0: psych.2.grow 7567636233917074710와 7594425258434661654(조종/보복 조언 틀).
- Olively의 상황 POV는 시청자 감정을 단정하므로 최대 1점. 중립 라벨형("pov: anxious attachment")만 문장 변경으로 가능.

## 한계
- 프레임은 0초·2초만 봤고 앱이 뒤늦게 나오는지는 못 봤다. 말없이 AI 음성인지도 전사 기준 추정이다.
- 댓글 표본은 영상당 상위 약 50개이며 olivelyapp 2편과 psych.2.grow 1편만 있다.
