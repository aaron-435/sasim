// Persona-analysis test mode data — DEV ONLY (see dev/qaMode.ts and dev/README.md).
//
// Never imported by production code: dev/qaMode.ts loads this file through `require` inside an
// `if (__DEV__)` branch, which Metro removes from release/OTA bundles.
//
// Contents were produced by the real engine and the real GPT prompts (2026-09-20), so the
// screens show realistic, full-length content without calling paid endpoints:
//   - QA_PERSONAS: saju results from POST /api/saju (no sessionId → nothing persisted)
//   - QA_DEEP_REPORT / QA_YEAR_REPORT: one generated deep report (+ the diagnosis / chat extract it
//     was written from) and one year-ahead report PER PERSONA, written from that persona's own chart
//     so the numbers on the home screen and in the report agree. Regenerate after changing the
//     report prompts (see the gen-fixtures script recipe in dev/README.md).
/* eslint-disable */
export const QA_PERSONAS: Record<string, { nickname: string; locale: "ko" | "en" | "es"; concern: "romance" | "career"; sajuResult: any }> = {
 "mia": {
  "nickname": "Mia",
  "locale": "en",
  "concern": "romance",
  "sajuResult": {
   "elements": {
    "wood": 37.5,
    "fire": 12.5,
    "earth": 12.5,
    "metal": 25,
    "water": 12.5
   },
   "dominantElement": "wood",
   "fourPillars": {
    "year": {
     "full": "무인",
     "sky": "무",
     "earth": "인",
     "skyElement": "토",
     "earthElement": "목",
     "skyFull": "무토",
     "earthFull": "인목"
    },
    "month": {
     "full": "을묘",
     "sky": "을",
     "earth": "묘",
     "skyElement": "목",
     "earthElement": "목",
     "skyFull": "을목",
     "earthFull": "묘목"
    },
    "day": {
     "full": "경신",
     "sky": "경",
     "earth": "신",
     "skyElement": "금",
     "earthElement": "금",
     "skyFull": "경금",
     "earthFull": "신금"
    },
    "hour": {
     "full": "임오",
     "sky": "임",
     "earth": "오",
     "skyElement": "수",
     "earthElement": "화",
     "skyFull": "임수",
     "earthFull": "오화"
    }
   },
   "decadeFortune": {
    "direction": "역행",
    "startAge": 3,
    "list": [
     {
      "index": 0,
      "startAge": 3,
      "full": "갑인",
      "sky": "갑",
      "earth": "인",
      "skyElement": "목",
      "earthElement": "목",
      "skyFull": "갑목",
      "earthFull": "인목"
     },
     {
      "index": 1,
      "startAge": 13,
      "full": "계축",
      "sky": "계",
      "earth": "축",
      "skyElement": "수",
      "earthElement": "토",
      "skyFull": "계수",
      "earthFull": "축토"
     },
     {
      "index": 2,
      "startAge": 23,
      "full": "임자",
      "sky": "임",
      "earth": "자",
      "skyElement": "수",
      "earthElement": "수",
      "skyFull": "임수",
      "earthFull": "자수"
     },
     {
      "index": 3,
      "startAge": 33,
      "full": "신해",
      "sky": "신",
      "earth": "해",
      "skyElement": "금",
      "earthElement": "수",
      "skyFull": "신금",
      "earthFull": "해수"
     },
     {
      "index": 4,
      "startAge": 43,
      "full": "경술",
      "sky": "경",
      "earth": "술",
      "skyElement": "금",
      "earthElement": "토",
      "skyFull": "경금",
      "earthFull": "술토"
     },
     {
      "index": 5,
      "startAge": 53,
      "full": "기유",
      "sky": "기",
      "earth": "유",
      "skyElement": "토",
      "earthElement": "금",
      "skyFull": "기토",
      "earthFull": "유금"
     },
     {
      "index": 6,
      "startAge": 63,
      "full": "무신",
      "sky": "무",
      "earth": "신",
      "skyElement": "토",
      "earthElement": "금",
      "skyFull": "무토",
      "earthFull": "신금"
     },
     {
      "index": 7,
      "startAge": 73,
      "full": "정미",
      "sky": "정",
      "earth": "미",
      "skyElement": "화",
      "earthElement": "토",
      "skyFull": "정화",
      "earthFull": "미토"
     },
     {
      "index": 8,
      "startAge": 83,
      "full": "병오",
      "sky": "병",
      "earth": "오",
      "skyElement": "화",
      "earthElement": "화",
      "skyFull": "병화",
      "earthFull": "오화"
     }
    ]
   },
   "currentAge": 28,
   "sajuType": {
    "archetype": "steel",
    "mode": "harvest",
    "code": "STL-H",
    "dayMasterElement": "metal",
    "dominantElement": "wood"
   },
   "summary": {
    "dayMaster": {
     "char": "경",
     "element": "금"
    },
    "elementBalance": {
     "dominant": "목",
     "lacking": "-",
     "score": 55
    }
   },
   "birthYear": 1998,
   "birthMonth": 3,
   "birthDay": 14
  }
 },
 "lucia": {
  "nickname": "Lucía",
  "locale": "es",
  "concern": "romance",
  "sajuResult": {
   "elements": {
    "wood": 12.5,
    "fire": 25,
    "earth": 37.5,
    "metal": 0,
    "water": 25
   },
   "dominantElement": "earth",
   "fourPillars": {
    "year": {
     "full": "병자",
     "sky": "병",
     "earth": "자",
     "skyElement": "화",
     "earthElement": "수",
     "skyFull": "병화",
     "earthFull": "자수"
    },
    "month": {
     "full": "무술",
     "sky": "무",
     "earth": "술",
     "skyElement": "토",
     "earthElement": "토",
     "skyFull": "무토",
     "earthFull": "술토"
    },
    "day": {
     "full": "계묘",
     "sky": "계",
     "earth": "묘",
     "skyElement": "수",
     "earthElement": "목",
     "skyFull": "계수",
     "earthFull": "묘목"
    },
    "hour": {
     "full": "병진",
     "sky": "병",
     "earth": "진",
     "skyElement": "화",
     "earthElement": "토",
     "skyFull": "병화",
     "earthFull": "진토"
    }
   },
   "decadeFortune": {
    "direction": "역행",
    "startAge": 8,
    "list": [
     {
      "index": 0,
      "startAge": 8,
      "full": "정유",
      "sky": "정",
      "earth": "유",
      "skyElement": "화",
      "earthElement": "금",
      "skyFull": "정화",
      "earthFull": "유금"
     },
     {
      "index": 1,
      "startAge": 18,
      "full": "병신",
      "sky": "병",
      "earth": "신",
      "skyElement": "화",
      "earthElement": "금",
      "skyFull": "병화",
      "earthFull": "신금"
     },
     {
      "index": 2,
      "startAge": 28,
      "full": "을미",
      "sky": "을",
      "earth": "미",
      "skyElement": "목",
      "earthElement": "토",
      "skyFull": "을목",
      "earthFull": "미토"
     },
     {
      "index": 3,
      "startAge": 38,
      "full": "갑오",
      "sky": "갑",
      "earth": "오",
      "skyElement": "목",
      "earthElement": "화",
      "skyFull": "갑목",
      "earthFull": "오화"
     },
     {
      "index": 4,
      "startAge": 48,
      "full": "계사",
      "sky": "계",
      "earth": "사",
      "skyElement": "수",
      "earthElement": "화",
      "skyFull": "계수",
      "earthFull": "사화"
     },
     {
      "index": 5,
      "startAge": 58,
      "full": "임진",
      "sky": "임",
      "earth": "진",
      "skyElement": "수",
      "earthElement": "토",
      "skyFull": "임수",
      "earthFull": "진토"
     },
     {
      "index": 6,
      "startAge": 68,
      "full": "신묘",
      "sky": "신",
      "earth": "묘",
      "skyElement": "금",
      "earthElement": "목",
      "skyFull": "신금",
      "earthFull": "묘목"
     },
     {
      "index": 7,
      "startAge": 78,
      "full": "경인",
      "sky": "경",
      "earth": "인",
      "skyElement": "금",
      "earthElement": "목",
      "skyFull": "경금",
      "earthFull": "인목"
     },
     {
      "index": 8,
      "startAge": 88,
      "full": "기축",
      "sky": "기",
      "earth": "축",
      "skyElement": "토",
      "earthElement": "토",
      "skyFull": "기토",
      "earthFull": "축토"
     }
    ]
   },
   "currentAge": 29,
   "sajuType": {
    "archetype": "dew",
    "mode": "order",
    "code": "DEW-O",
    "dayMasterElement": "water",
    "dominantElement": "earth"
   },
   "summary": {
    "dayMaster": {
     "char": "계",
     "element": "수"
    },
    "elementBalance": {
     "dominant": "토",
     "lacking": "금",
     "score": 45
    }
   },
   "birthYear": 1996,
   "birthMonth": 11,
   "birthDay": 2
  }
 },
 "jisoo": {
  "nickname": "지수",
  "locale": "ko",
  "concern": "career",
  "sajuResult": {
   "elements": {
    "wood": 33.3,
    "fire": 0,
    "earth": 50,
    "metal": 16.7,
    "water": 0
   },
   "dominantElement": "earth",
   "fourPillars": {
    "year": {
     "full": "기묘",
     "sky": "기",
     "earth": "묘",
     "skyElement": "토",
     "earthElement": "목",
     "skyFull": "기토",
     "earthFull": "묘목"
    },
    "month": {
     "full": "신미",
     "sky": "신",
     "earth": "미",
     "skyElement": "금",
     "earthElement": "토",
     "skyFull": "신금",
     "earthFull": "미토"
    },
    "day": {
     "full": "갑술",
     "sky": "갑",
     "earth": "술",
     "skyElement": "목",
     "earthElement": "토",
     "skyFull": "갑목",
     "earthFull": "술토"
    },
    "hour": null
   },
   "decadeFortune": {
    "direction": "순행",
    "startAge": 6,
    "list": [
     {
      "index": 0,
      "startAge": 6,
      "full": "임신",
      "sky": "임",
      "earth": "신",
      "skyElement": "수",
      "earthElement": "금",
      "skyFull": "임수",
      "earthFull": "신금"
     },
     {
      "index": 1,
      "startAge": 16,
      "full": "계유",
      "sky": "계",
      "earth": "유",
      "skyElement": "수",
      "earthElement": "금",
      "skyFull": "계수",
      "earthFull": "유금"
     },
     {
      "index": 2,
      "startAge": 26,
      "full": "갑술",
      "sky": "갑",
      "earth": "술",
      "skyElement": "목",
      "earthElement": "토",
      "skyFull": "갑목",
      "earthFull": "술토"
     },
     {
      "index": 3,
      "startAge": 36,
      "full": "을해",
      "sky": "을",
      "earth": "해",
      "skyElement": "목",
      "earthElement": "수",
      "skyFull": "을목",
      "earthFull": "해수"
     },
     {
      "index": 4,
      "startAge": 46,
      "full": "병자",
      "sky": "병",
      "earth": "자",
      "skyElement": "화",
      "earthElement": "수",
      "skyFull": "병화",
      "earthFull": "자수"
     },
     {
      "index": 5,
      "startAge": 56,
      "full": "정축",
      "sky": "정",
      "earth": "축",
      "skyElement": "화",
      "earthElement": "토",
      "skyFull": "정화",
      "earthFull": "축토"
     },
     {
      "index": 6,
      "startAge": 66,
      "full": "무인",
      "sky": "무",
      "earth": "인",
      "skyElement": "토",
      "earthElement": "목",
      "skyFull": "무토",
      "earthFull": "인목"
     },
     {
      "index": 7,
      "startAge": 76,
      "full": "기묘",
      "sky": "기",
      "earth": "묘",
      "skyElement": "토",
      "earthElement": "목",
      "skyFull": "기토",
      "earthFull": "묘목"
     },
     {
      "index": 8,
      "startAge": 86,
      "full": "경진",
      "sky": "경",
      "earth": "진",
      "skyElement": "금",
      "earthElement": "토",
      "skyFull": "경금",
      "earthFull": "진토"
     }
    ]
   },
   "currentAge": 27,
   "sajuType": {
    "archetype": "oak",
    "mode": "harvest",
    "code": "OAK-H",
    "dayMasterElement": "wood",
    "dominantElement": "earth"
   },
   "summary": {
    "dayMaster": {
     "char": "갑",
     "element": "목"
    },
    "elementBalance": {
     "dominant": "토",
     "lacking": "수",
     "score": 13
    }
   },
   "birthYear": 1999,
   "birthMonth": 7,
   "birthDay": 21
  }
 },
 "jordan": {
  "nickname": "Jordan",
  "locale": "en",
  "concern": "career",
  "sajuResult": {
   "elements": {
    "wood": 0,
    "fire": 12.5,
    "earth": 37.5,
    "metal": 37.5,
    "water": 12.5
   },
   "dominantElement": "earth",
   "fourPillars": {
    "year": {
     "full": "경진",
     "sky": "경",
     "earth": "진",
     "skyElement": "금",
     "earthElement": "토",
     "skyFull": "경금",
     "earthFull": "진토"
    },
    "month": {
     "full": "기축",
     "sky": "기",
     "earth": "축",
     "skyElement": "토",
     "earthElement": "토",
     "skyFull": "기토",
     "earthFull": "축토"
    },
    "day": {
     "full": "계사",
     "sky": "계",
     "earth": "사",
     "skyElement": "수",
     "earthElement": "화",
     "skyFull": "계수",
     "earthFull": "사화"
    },
    "hour": {
     "full": "신유",
     "sky": "신",
     "earth": "유",
     "skyElement": "금",
     "earthElement": "금",
     "skyFull": "신금",
     "earthFull": "유금"
    }
   },
   "decadeFortune": {
    "direction": "순행",
    "startAge": 1,
    "list": [
     {
      "index": 0,
      "startAge": 1,
      "full": "경인",
      "sky": "경",
      "earth": "인",
      "skyElement": "금",
      "earthElement": "목",
      "skyFull": "경금",
      "earthFull": "인목"
     },
     {
      "index": 1,
      "startAge": 11,
      "full": "신묘",
      "sky": "신",
      "earth": "묘",
      "skyElement": "금",
      "earthElement": "목",
      "skyFull": "신금",
      "earthFull": "묘목"
     },
     {
      "index": 2,
      "startAge": 21,
      "full": "임진",
      "sky": "임",
      "earth": "진",
      "skyElement": "수",
      "earthElement": "토",
      "skyFull": "임수",
      "earthFull": "진토"
     },
     {
      "index": 3,
      "startAge": 31,
      "full": "계사",
      "sky": "계",
      "earth": "사",
      "skyElement": "수",
      "earthElement": "화",
      "skyFull": "계수",
      "earthFull": "사화"
     },
     {
      "index": 4,
      "startAge": 41,
      "full": "갑오",
      "sky": "갑",
      "earth": "오",
      "skyElement": "목",
      "earthElement": "화",
      "skyFull": "갑목",
      "earthFull": "오화"
     },
     {
      "index": 5,
      "startAge": 51,
      "full": "을미",
      "sky": "을",
      "earth": "미",
      "skyElement": "목",
      "earthElement": "토",
      "skyFull": "을목",
      "earthFull": "미토"
     },
     {
      "index": 6,
      "startAge": 61,
      "full": "병신",
      "sky": "병",
      "earth": "신",
      "skyElement": "화",
      "earthElement": "금",
      "skyFull": "병화",
      "earthFull": "신금"
     },
     {
      "index": 7,
      "startAge": 71,
      "full": "정유",
      "sky": "정",
      "earth": "유",
      "skyElement": "화",
      "earthElement": "금",
      "skyFull": "정화",
      "earthFull": "유금"
     },
     {
      "index": 8,
      "startAge": 81,
      "full": "무술",
      "sky": "무",
      "earth": "술",
      "skyElement": "토",
      "earthElement": "토",
      "skyFull": "무토",
      "earthFull": "술토"
     }
    ]
   },
   "currentAge": 25,
   "sajuType": {
    "archetype": "dew",
    "mode": "order",
    "code": "DEW-O",
    "dayMasterElement": "water",
    "dominantElement": "earth"
   },
   "summary": {
    "dayMaster": {
     "char": "계",
     "element": "수"
    },
    "elementBalance": {
     "dominant": "토",
     "lacking": "목",
     "score": 30
    }
   },
   "birthYear": 2001,
   "birthMonth": 1,
   "birthDay": 30
  }
 },
 "sam": {
  "nickname": "Sam",
  "locale": "en",
  "concern": "career",
  "sajuResult": {
   "elements": {
    "wood": 25,
    "fire": 0,
    "earth": 25,
    "metal": 25,
    "water": 25
   },
   "dominantElement": "wood",
   "fourPillars": {
    "year": {
     "full": "임신",
     "sky": "임",
     "earth": "신",
     "skyElement": "수",
     "earthElement": "금",
     "skyFull": "임수",
     "earthFull": "신금"
    },
    "month": {
     "full": "기유",
     "sky": "기",
     "earth": "유",
     "skyElement": "토",
     "earthElement": "금",
     "skyFull": "기토",
     "earthFull": "유금"
    },
    "day": {
     "full": "무자",
     "sky": "무",
     "earth": "자",
     "skyElement": "토",
     "earthElement": "수",
     "skyFull": "무토",
     "earthFull": "자수"
    },
    "hour": {
     "full": "을묘",
     "sky": "을",
     "earth": "묘",
     "skyElement": "목",
     "earthElement": "목",
     "skyFull": "을목",
     "earthFull": "묘목"
    }
   },
   "decadeFortune": {
    "direction": "순행",
    "startAge": 10,
    "list": [
     {
      "index": 0,
      "startAge": 10,
      "full": "경술",
      "sky": "경",
      "earth": "술",
      "skyElement": "금",
      "earthElement": "토",
      "skyFull": "경금",
      "earthFull": "술토"
     },
     {
      "index": 1,
      "startAge": 20,
      "full": "신해",
      "sky": "신",
      "earth": "해",
      "skyElement": "금",
      "earthElement": "수",
      "skyFull": "신금",
      "earthFull": "해수"
     },
     {
      "index": 2,
      "startAge": 30,
      "full": "임자",
      "sky": "임",
      "earth": "자",
      "skyElement": "수",
      "earthElement": "수",
      "skyFull": "임수",
      "earthFull": "자수"
     },
     {
      "index": 3,
      "startAge": 40,
      "full": "계축",
      "sky": "계",
      "earth": "축",
      "skyElement": "수",
      "earthElement": "토",
      "skyFull": "계수",
      "earthFull": "축토"
     },
     {
      "index": 4,
      "startAge": 50,
      "full": "갑인",
      "sky": "갑",
      "earth": "인",
      "skyElement": "목",
      "earthElement": "목",
      "skyFull": "갑목",
      "earthFull": "인목"
     },
     {
      "index": 5,
      "startAge": 60,
      "full": "을묘",
      "sky": "을",
      "earth": "묘",
      "skyElement": "목",
      "earthElement": "목",
      "skyFull": "을목",
      "earthFull": "묘목"
     },
     {
      "index": 6,
      "startAge": 70,
      "full": "병진",
      "sky": "병",
      "earth": "진",
      "skyElement": "화",
      "earthElement": "토",
      "skyFull": "병화",
      "earthFull": "진토"
     },
     {
      "index": 7,
      "startAge": 80,
      "full": "정사",
      "sky": "정",
      "earth": "사",
      "skyElement": "화",
      "earthElement": "화",
      "skyFull": "정화",
      "earthFull": "사화"
     },
     {
      "index": 8,
      "startAge": 90,
      "full": "무오",
      "sky": "무",
      "earth": "오",
      "skyElement": "토",
      "earthElement": "화",
      "skyFull": "무토",
      "earthFull": "오화"
     }
    ]
   },
   "currentAge": 34,
   "sajuType": {
    "archetype": "mountain",
    "mode": "order",
    "code": "MTN-O",
    "dayMasterElement": "earth",
    "dominantElement": "wood"
   },
   "summary": {
    "dayMaster": {
     "char": "무",
     "element": "토"
    },
    "elementBalance": {
     "dominant": "목",
     "lacking": "화",
     "score": 60
    }
   },
   "birthYear": 1992,
   "birthMonth": 9,
   "birthDay": 9
  }
 },
 "riley": {
  "nickname": "Riley",
  "locale": "en",
  "concern": "romance",
  "sajuResult": {
   "elements": {
    "wood": 50,
    "fire": 0,
    "earth": 25,
    "metal": 0,
    "water": 25
   },
   "dominantElement": "wood",
   "fourPillars": {
    "year": {
     "full": "무진",
     "sky": "무",
     "earth": "진",
     "skyElement": "토",
     "earthElement": "토",
     "skyFull": "무토",
     "earthFull": "진토"
    },
    "month": {
     "full": "갑자",
     "sky": "갑",
     "earth": "자",
     "skyElement": "목",
     "earthElement": "수",
     "skyFull": "갑목",
     "earthFull": "자수"
    },
    "day": {
     "full": "갑인",
     "sky": "갑",
     "earth": "인",
     "skyElement": "목",
     "earthElement": "목",
     "skyFull": "갑목",
     "earthFull": "인목"
    },
    "hour": {
     "full": "갑자",
     "sky": "갑",
     "earth": "자",
     "skyElement": "목",
     "earthElement": "수",
     "skyFull": "갑목",
     "earthFull": "자수"
    }
   },
   "decadeFortune": {
    "direction": "역행",
    "startAge": 6,
    "list": [
     {
      "index": 0,
      "startAge": 6,
      "full": "계해",
      "sky": "계",
      "earth": "해",
      "skyElement": "수",
      "earthElement": "수",
      "skyFull": "계수",
      "earthFull": "해수"
     },
     {
      "index": 1,
      "startAge": 16,
      "full": "임술",
      "sky": "임",
      "earth": "술",
      "skyElement": "수",
      "earthElement": "토",
      "skyFull": "임수",
      "earthFull": "술토"
     },
     {
      "index": 2,
      "startAge": 26,
      "full": "신유",
      "sky": "신",
      "earth": "유",
      "skyElement": "금",
      "earthElement": "금",
      "skyFull": "신금",
      "earthFull": "유금"
     },
     {
      "index": 3,
      "startAge": 36,
      "full": "경신",
      "sky": "경",
      "earth": "신",
      "skyElement": "금",
      "earthElement": "금",
      "skyFull": "경금",
      "earthFull": "신금"
     },
     {
      "index": 4,
      "startAge": 46,
      "full": "기미",
      "sky": "기",
      "earth": "미",
      "skyElement": "토",
      "earthElement": "토",
      "skyFull": "기토",
      "earthFull": "미토"
     },
     {
      "index": 5,
      "startAge": 56,
      "full": "무오",
      "sky": "무",
      "earth": "오",
      "skyElement": "토",
      "earthElement": "화",
      "skyFull": "무토",
      "earthFull": "오화"
     },
     {
      "index": 6,
      "startAge": 66,
      "full": "정사",
      "sky": "정",
      "earth": "사",
      "skyElement": "화",
      "earthElement": "화",
      "skyFull": "정화",
      "earthFull": "사화"
     },
     {
      "index": 7,
      "startAge": 76,
      "full": "병진",
      "sky": "병",
      "earth": "진",
      "skyElement": "화",
      "earthElement": "토",
      "skyFull": "병화",
      "earthFull": "진토"
     },
     {
      "index": 8,
      "startAge": 86,
      "full": "을묘",
      "sky": "을",
      "earth": "묘",
      "skyElement": "목",
      "earthElement": "목",
      "skyFull": "을목",
      "earthFull": "묘목"
     }
    ]
   },
   "currentAge": 37,
   "sajuType": {
    "archetype": "oak",
    "mode": "rooted",
    "code": "OAK-R",
    "dayMasterElement": "wood",
    "dominantElement": "wood"
   },
   "summary": {
    "dayMaster": {
     "char": "갑",
     "element": "목"
    },
    "elementBalance": {
     "dominant": "목",
     "lacking": "금",
     "score": 20
    }
   },
   "birthYear": 1988,
   "birthMonth": 12,
   "birthDay": 25
  }
 },
 "casey": {
  "nickname": "Casey",
  "locale": "es",
  "concern": "career",
  "sajuResult": {
   "elements": {
    "wood": 37.5,
    "fire": 12.5,
    "earth": 12.5,
    "metal": 37.5,
    "water": 0
   },
   "dominantElement": "wood",
   "fourPillars": {
    "year": {
     "full": "갑술",
     "sky": "갑",
     "earth": "술",
     "skyElement": "목",
     "earthElement": "토",
     "skyFull": "갑목",
     "earthFull": "술토"
    },
    "month": {
     "full": "정묘",
     "sky": "정",
     "earth": "묘",
     "skyElement": "화",
     "earthElement": "목",
     "skyFull": "정화",
     "earthFull": "묘목"
    },
    "day": {
     "full": "경신",
     "sky": "경",
     "earth": "신",
     "skyElement": "금",
     "earthElement": "금",
     "skyFull": "경금",
     "earthFull": "신금"
    },
    "hour": {
     "full": "갑신",
     "sky": "갑",
     "earth": "신",
     "skyElement": "목",
     "earthElement": "금",
     "skyFull": "갑목",
     "earthFull": "신금"
    }
   },
   "decadeFortune": {
    "direction": "순행",
    "startAge": 1,
    "list": [
     {
      "index": 0,
      "startAge": 1,
      "full": "무진",
      "sky": "무",
      "earth": "진",
      "skyElement": "토",
      "earthElement": "토",
      "skyFull": "무토",
      "earthFull": "진토"
     },
     {
      "index": 1,
      "startAge": 11,
      "full": "기사",
      "sky": "기",
      "earth": "사",
      "skyElement": "토",
      "earthElement": "화",
      "skyFull": "기토",
      "earthFull": "사화"
     },
     {
      "index": 2,
      "startAge": 21,
      "full": "경오",
      "sky": "경",
      "earth": "오",
      "skyElement": "금",
      "earthElement": "화",
      "skyFull": "경금",
      "earthFull": "오화"
     },
     {
      "index": 3,
      "startAge": 31,
      "full": "신미",
      "sky": "신",
      "earth": "미",
      "skyElement": "금",
      "earthElement": "토",
      "skyFull": "신금",
      "earthFull": "미토"
     },
     {
      "index": 4,
      "startAge": 41,
      "full": "임신",
      "sky": "임",
      "earth": "신",
      "skyElement": "수",
      "earthElement": "금",
      "skyFull": "임수",
      "earthFull": "신금"
     },
     {
      "index": 5,
      "startAge": 51,
      "full": "계유",
      "sky": "계",
      "earth": "유",
      "skyElement": "수",
      "earthElement": "금",
      "skyFull": "계수",
      "earthFull": "유금"
     },
     {
      "index": 6,
      "startAge": 61,
      "full": "갑술",
      "sky": "갑",
      "earth": "술",
      "skyElement": "목",
      "earthElement": "토",
      "skyFull": "갑목",
      "earthFull": "술토"
     },
     {
      "index": 7,
      "startAge": 71,
      "full": "을해",
      "sky": "을",
      "earth": "해",
      "skyElement": "목",
      "earthElement": "수",
      "skyFull": "을목",
      "earthFull": "해수"
     },
     {
      "index": 8,
      "startAge": 81,
      "full": "병자",
      "sky": "병",
      "earth": "자",
      "skyElement": "화",
      "earthElement": "수",
      "skyFull": "병화",
      "earthFull": "자수"
     }
    ]
   },
   "currentAge": 32,
   "sajuType": {
    "archetype": "steel",
    "mode": "harvest",
    "code": "STL-H",
    "dayMasterElement": "metal",
    "dominantElement": "wood"
   },
   "summary": {
    "dayMaster": {
     "char": "경",
     "element": "금"
    },
    "elementBalance": {
     "dominant": "목",
     "lacking": "수",
     "score": 30
    }
   },
   "birthYear": 1994,
   "birthMonth": 4,
   "birthDay": 4
  }
 }
};

export const QA_DEEP_REPORT: Record<string, { content: any; quizDiagnosis: any; chatExtract: any }> = {
 "sam": {
  "content": {
   "title_line1": "The task is done, but your mind keeps reopening it",
   "title_line2": "And the part of you that should be resting is still standing guard",
   "subtitle": "Module 3 Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late, and the work is already closed on the screen, but your hand still reaches back to the same file. You read one more line, then one more, as if the answer might change if you check it again. In the quiet after that, Monday-morning messages are already waiting in your head, and your body feels tired while your mind stays a little tense. Sam, doesn’t this feel exactly like you lately?",
   "case_tag": "Example case — Mina, early 30s, work pressure",
   "case_paragraphs": [
    "Mina finishes her work, but she cannot leave it alone. She reopens the document, checks a number twice, and stays at her desk while everyone else has already moved on. Her Five Elements pattern also leans on Wood and leaves Fire absent, so the pressure is strong and the warmth that would soften it is thin. You can see the same shape in your own day, too."
   ],
   "oheng_intro": "Your Five Elements are Wood 25%, Fire 0%, Earth 25%, Metal 25%, and Water 25%, so the chart is balanced except for the missing Fire. Because your Day Master is Earth, the Wood in your chart feels like pressure, rules, and responsibility pushing on you, while Fire would be the support and protection that helps you breathe easier. That is why this burnout module shows up as a person who keeps going by force, then feels the heat disappear the moment the checking begins.",
   "quiz_reading": "Your highest score is Perfectionism at 82%, and your lower score is Recovery at 34%, which fits the Finisher's Drain type. That combination shows up when you keep scanning for mistakes even after the task is finished, then feel uneasy when the day finally asks you to stop. The result is not laziness or lack of effort; it is a mind that keeps the work alive long after the work is over.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood balanced — pressure that keeps asking for one more pass",
     "body": "Wood at 25% is strong enough to feel like a standing order in your day. Because your Day Master is Earth, this Wood lands as pressure, rules, and responsibility, not as something soft or optional. That is why you can finish the task and still feel pulled back to it, as if the page itself is asking for one more correction. In your case, strong Wood does not just organize the day — it keeps the day from ending cleanly."
    },
    "fire": {
     "heading": "🔥 Fire weak — the warmth that should help you rest",
     "body": "Fire is at 0%, so this points to a missing warmth in your pattern. Your chart says Wood can feed Fire, which means the pressure and effort in your day are meant to become support, encouragement, and relief, but that bridge feels thin here. So when Monday-morning messages hit, you do not just wake up to work — you wake up without much inner warmth to carry you through it. That is why resting can feel uneasy instead of restoring."
    },
    "earth": {
     "heading": "⛰️ Earth balanced — the part of you that keeps holding the line",
     "body": "Earth at 25% gives you a steady center, not a loud one. It is the part that keeps you showing up, even when you are already tired and a little anxious. In a burnout pattern, that balance can look like finishing the job before you let yourself feel how much it cost. You are not short on commitment; you are carrying it with a very even face."
    },
    "metal": {
     "heading": "💎 Metal balanced — the habit of checking for what still needs fixing",
     "body": "Metal at 25% shows up as a clean eye for what is precise and what is not. That is the part of you that notices the one line that still feels off and sends you back to it after you thought you were done. In a Monday-morning rhythm, this can make messages feel sharper than they are, because your mind is already looking for what might need tightening. The result is a tidy standard that can keep you from closing the file in peace."
    },
    "water": {
     "heading": "💧 Water balanced — the mind that keeps flowing toward the next thing",
     "body": "Water at 25% gives you enough movement to keep thinking ahead. That is useful when work needs planning, but in your case it also means your mind can drift straight from today’s task to tomorrow’s messages without a real stop in between. You do not sit in one moment for long; you move through it, then look back and wonder why rest did not feel like rest. That quick flow is part of why your fatigue arrives all at once."
    }
   },
   "upcoming_period_heading": "40 to 49: Earth takes the lead",
   "upcoming_period_body": "From age 40 to 49, Earth becomes the stronger 10-year cycle, and the ground under your work life changes shape. The pace turns less about pushing through by sheer checking, and more about building something that can actually hold your energy without draining it so fast. For you, that means the pressure loop gets less sharp, and the way you measure a good day becomes more grounded. What helps most now is learning to leave a task when it is done, not when your anxiety finally gets tired.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism is the same engine that keeps you reopening finished work. It matches the strong Wood in your chart, because Wood lands on an Earth Day Master as pressure, rules, and responsibility. That is why the checking does not feel optional to you, even when the task is already complete.",
    "Your 34% Recovery explains why a day off still feels uneasy. With Fire at 0%, the support that should soften the edge of your effort is thin, so your nervous system does not easily switch from doing to resting. The result is a body that stops before the mind does."
   ],
   "answer_notes": [
    "Going back to re-check everything shows a mind that trusts precision more than closure. In daily life, that becomes the extra glance at the draft, the reopened tab, and the sense that the work is not allowed to stay finished. The part of you that chose that answer is trying to protect you from regret, and it deserves respect, not shame.",
    "Feeling uneasy even when you rest shows that recovery is not automatic for you. It means your off-time still carries a trace of alertness, so the chair, the couch, or the quiet room never fully turn off the work inside your head. If that sounds familiar, your system is asking for gentler transitions, not more discipline."
   ],
   "chat_snapshot_note": "Your core concern is that you rest but it never feels like resting, and that sits right next to tiredness and a little anxiety. In the background, Monday-morning messages keep switching the tension back on before you’ve fully come down from the last round. The line to keep is this: you are not failing to rest; your mind is staying on duty too long.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they do not arrive as simple information for you. They land on top of a system that is already scanning, so the message becomes a signal to start holding everything again. That is exactly where your strong Wood and high Perfectionism meet: pressure comes in, and your mind answers by tightening its grip.",
   "chat_repeat_note": "The loop is clear: you cram, then you crash. First you push past what feels sustainable, then your energy drops all at once, and the fall feels bigger because you spent so long pretending you were still fine. The smallest way out is not to wait for collapse; it is to stop one step earlier, while you still have enough room to choose.",
   "chat_fear_note": "Your fear is not really about being lazy; it is about falling behind if you stop. That tells me rest has started to feel like risk, not relief. Underneath that fear is a wish to stay responsible and keep your place, and that wish is much more understandable than it first sounds.",
   "psychology_fact_heading": "Perfectionism and recovery",
   "psychology_fact_body": "In psychology, perfectionism is often described as a pattern of setting very high standards and then judging yourself harshly when they are not fully met. Recovery is the capacity to come down from effort, emotionally and physically, so your system can return to baseline. When perfectionism stays high and recovery stays low, people often keep checking after the task is done and feel uneasy when they finally pause. That is exactly the shape your results and your daily scenes are drawing together.",
   "psychology_takeaway": "Finished work is not the same as finished worry. Your chart and your test both show a mind that needs permission to stop before it believes stop is safe.",
   "strengths": [
    {
     "title": "Steady follow-through",
     "body": "You do not leave things half-open. The fact that you go back and re-check everything means you catch what others might miss, and that is a real strength in work that depends on precision. In your day, that shows up as the person who notices the missing detail before it becomes a bigger problem."
    },
    {
     "title": "Strong standards",
     "body": "An 82% perfectionism score means your internal bar is high and unmistakable. That can show up as going back to re-check everything after finishing a task, and it can make your work careful and exact. You are someone who takes your own output seriously, and that seriousness is part of your value."
    },
    {
     "title": "Reliable endurance",
     "body": "The pattern of cramming and then crashing also tells me you can keep going for a long stretch when it matters. Even when you are tired and a little anxious, you still get the thing done. That kind of endurance is useful, especially in seasons where others might give up earlier."
    },
    {
     "title": "Alert self-monitoring",
     "body": "You notice your state quickly, even when the feeling is not pleasant. The line 'I rest but it never feels like resting' shows a person who can track the gap between what is happening outside and what is happening inside. That awareness is the first place real change can begin."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard stopping",
     "body": "Once you start, it is difficult for you to feel done. That is why the work can be complete on paper while your mind still circles it, checking for what might be off. The cost is not lack of effort; it is the extra effort you keep spending after the job is already finished."
    },
    {
     "title": "Low recovery",
     "body": "A 34% recovery score means rest does not automatically turn into restoration for you. You can sit down, but part of you stays on alert, waiting for the next message or the next problem. That makes breaks feel thin, even when you are physically out of the work."
    },
    {
     "title": "Pressure rebound",
     "body": "Monday-morning messages can flip your system back on very fast. You go from quiet to tightened in a single step, which suggests your body has learned to treat incoming work as a trigger rather than just a notification. That rebound is exhausting because it makes every restart feel urgent."
    },
    {
     "title": "All-or-nothing pacing",
     "body": "Cramming, then crashing is a clear rhythm in your pattern. You spend too much energy trying to stay ahead, then pay for it when the system drops out. The problem is not that you do nothing; it is that you do too much before you let yourself slow down."
    }
   ],
   "fit_good": "You do best in work with clear deliverables, clear endings, and enough autonomy to close the loop yourself. A day that lets you define when something is truly done will suit you better than one that keeps reopening the same task through endless pings. Quiet focus blocks and predictable handoffs will help you finish without having to keep guarding the result.",
   "fit_bad": "You may struggle in a setting that rewards constant availability and treats after-hours messages as normal. If Monday starts with a flood of check-ins, your mind may have a hard time fully standing down, and the checking loop can keep feeding itself. Environments that blur the end of the workday can make your recovery feel even farther away.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "When you finish a task, write down the one sentence that says it is done. Do this before you open anything else, so your mind has a clear marker to hold onto. Keep that note visible until the workday ends."
    },
    {
     "title": "Delay the check",
     "body": "When you feel the urge to re-check, wait ten minutes first. Use that time to stand up, drink water, or look away from the screen without adding new work. The goal is not to suppress the impulse, but to teach your body that urgency can pass without action."
    },
    {
     "title": "Protect the first hour",
     "body": "On Monday mornings, do not start with messages if you can avoid it. Give yourself one full hour to settle into the day before you read the noise that tends to switch your tension back on. That small buffer can change the whole tone of the morning."
    },
    {
     "title": "Schedule recovery",
     "body": "Put recovery on the calendar as a real block, not a leftover gap. Choose one repeatable time in the week and keep it light, simple, and non-negotiable. You need a routine that tells your system rest is part of the job, not a reward after it."
    }
   ],
   "mindset_guide": "Think of your day like a workbench, not a verdict. A workbench is useful because it holds the task while you shape it, but it does not need to keep holding it after the tool is down. You do not have to keep standing over the finished piece to prove you cared. Let the task stay finished, and let your attention return to you.",
   "closing_title": "When the file closes, so can you",
   "closing_body": "From age 40 to 49, Earth becomes the stronger 10-year cycle, and that shift brings a steadier way of carrying work. For this burnout pattern, that can mean the endless checking has less room to run, and the body can feel less pinned to the next message. The pressure that used to keep you braced can begin to soften into something more usable. Sam, at age 40 to 49, this is the part of the road where rest starts to feel like rest."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Module 3 · Burnout",
   "track": "career",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "After finishing a task I…",
     "label": "Go back and re-check everything",
     "dimension": "perfectionism",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "On a day off I…",
     "label": "Feel uneasy even when I rest",
     "dimension": "recovery",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "perfectionism",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "recovery",
     "rawScore": 10.2,
     "maxScore": 30,
     "percentOfMax": 34,
     "distanceFromMid": 32,
     "direction": "low",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "perfectionism"
    ],
    "kind": "single",
    "typeKey": "perfectionism"
   },
   "typeInfo": {
    "title": "Finisher's Drain",
    "hook": "Finishes everything, and is finished by it"
   },
   "nuancedSummary": "Perfectionism runs high and recovery runs low.",
   "dimensionShortNames": {
    "perfectionism": "Perfectionism",
    "recovery": "Recovery"
   },
   "elements": {
    "wood": 25,
    "fire": 0,
    "earth": 25,
    "metal": 25,
    "water": 25
   },
   "dominantElement": "wood"
  },
  "chatExtract": {
   "primary_concern": "I rest but it never feels like resting",
   "emotional_state": "Tired and a little anxious",
   "trigger_point": "Monday-morning messages",
   "repeat_pattern": "Cramming, then crashing",
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind",
   "summary_quote": "I rest but it never feels like resting",
   "integrated_summary": "Even when the work is done, your mind keeps checking, and Monday-morning messages switch that tension back on. You push through, then crash all at once, and underneath sits the fear that stopping means falling behind."
  }
 },
 "mia": {
  "content": {
   "title_line1": "You finish it all, and your mind keeps the receipt.",
   "title_line2": "Even rest turns into one more thing to verify.",
   "subtitle": "Module 3 Burnout deep report — Saju × psychology × counseling integration",
   "opening_scene": "It’s late, and your phone lights up with a Monday-morning message before the day has even started. You’ve already finished the work, but your hand still reaches back to check, as if the task might have changed while you blinked. Rest is there on the calendar, yet your body doesn’t quite accept it as rest; it stays alert, tired, and a little anxious. Mia, doesn’t this feel like you lately?",
   "case_tag": "EXAMPLE CASE — Daniel, early 30s, caught in the after-hours check",
   "case_paragraphs": [
    "Daniel closes his laptop, then opens it again ten minutes later to re-read the same finished file. His day looks productive from the outside, but his mind keeps circling back to what could still be improved. His Five Elements are also lopsided in a way that makes that loop hard to quiet, with more pushing energy than release. You can see your own rhythm in that pattern, even before the day is over."
   ],
   "oheng_intro": "Wood is strong at 38%, while Water is low at 13%, and that split matters in a burnout pattern like this. In Day Master terms, Wood is the force you use to hold and manage reality, while Water is the force you pour out as expression, talent, and energy. Here, the holding side keeps extending the work, and the pouring-out side does not refill fast enough, so the pressure shows up as checking, not just doing.",
   "quiz_reading": "Your perfectionism is high at 82%, while recovery sits much lower at 34%, and that gap shows up before you ever call it burnout. The Finisher's Drain pattern means you tend to keep tightening the screws after the work is already done. That is why a day off can still feel uneasy, with no real landing point for your mind.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — the hand that keeps gripping one more branch",
     "body": "Your Wood is strong at 38%, so the urge to keep shaping, fixing, and holding on does not switch off cleanly. In this burnout pattern, that looks like reopening a task after it is done, just to make sure every edge is still in place. Because Wood is the force you use to manage reality, you keep pushing the structure forward even when your body is asking for a stop. That is why your mind can feel busy long after the work itself is over."
    },
    "fire": {
     "heading": "🔥 Fire low — the spark that does not stay lit for long",
     "body": "Fire is low at 13%, so your energy comes in short bursts rather than a steady glow. That fits the cram-then-crash rhythm you described in counseling: you can drive hard for a stretch, then drop sharply once the push is spent. In a burnout module, that means the emotional heat shows up quickly, but it does not stay available for recovery. You are not lacking effort; you are spending it too fast."
    },
    "earth": {
     "heading": "⛰️ Earth low — the ground that should help you land",
     "body": "Earth is low at 13%, so the part that makes time feel settled and usable is thin here. That is why even a day off can feel uneasy, because resting does not quite become a place your mind trusts. When you go from cramming to crashing, there is not much soft middle ground to catch you. You keep moving, but the landing feels incomplete."
    },
    "metal": {
     "heading": "💎 Metal moderate — the part that notices what is still unfinished",
     "body": "Metal sits at 25%, which gives you a clear eye for what is precise and what is not. In practice, that can help you catch small errors before they spread, especially when you are checking your own work again after finishing. But in a burnout frame, that same clarity can stay turned toward the task too long, so completion never quite feels final. You notice the loose thread immediately, and your hand wants to pull it."
    },
    "water": {
     "heading": "💧 Water low — the stream that should carry things back out of your system",
     "body": "Your Water is low at 13%, so the part that releases energy, expression, and talent does not refill easily. Metal helps Water, and that matters here because your sharper, more exact side can support the flow that feels weak. Still, the low Water shows up as that uneasy feeling even when you rest, as if nothing has fully left your system yet. You keep giving, but the return flow is slow."
    }
   },
   "upcoming_period_heading": "33 to 42, the Water season opens",
   "upcoming_period_body": "33 to 42 brings a Water cycle, and that shift is already built into your path. The period that runs on constant pushing gives way to one where release, expression, and inner refill become easier to access. For you, that means the mind can stop treating every pause like a threat, and the body can begin to accept rest without immediately turning it into a check-list. It helps to protect space for recovery before that cycle arrives, so your system is not trying to relearn softness from zero.",
   "cross_analysis_quotes": [
    "You do not just work hard; you keep auditing the finished work, and that is what drains you. Your 82% perfectionism keeps the checking loop alive even after the task is complete. After you finish something, you go back and re-check everything.",
    "The 34% recovery score explains why rest feels uneasy instead of restorative. When recovery stays low, the body is in the room, but the mind never fully sits down. On a day off, you still feel uneasy even when you rest."
   ],
   "answer_notes": [
    "Going back to re-check everything shows a mind that does not trust completion to hold on its own. In daily life, that becomes the habit of reopening a file, a message, or a decision just to make sure the edges still look right. For you, that answer points to vigilance that keeps working even after the work is over.",
    "Feeling uneasy even when you rest shows that recovery is not just about time off, but about whether your system believes it is allowed to stop. That can look like a day off that still feels interrupted, even with nothing on the calendar. For you, that answer says the nervous system is still on guard."
   ],
   "chat_snapshot_note": "You said, 'I rest but it never feels like resting,' and the feeling underneath it is tiredness with a thread of anxiety. That is not laziness or indifference; it is what happens when your mind keeps standing watch while your body tries to sit down. The line to keep is this: you are not failing to rest because you do not care enough.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they bring the unfinished world back into the room before you have settled. They reactivate the perfectionism loop and make your attention snap back to the task, which fits the strong checking pattern in your profile. For you, that message is not just a message; it is a switch.",
   "chat_repeat_note": "The pattern is cram, then crash, and it keeps repeating because the push feels safer than the pause. You choose one more round of effort, then pay for it later when the system drops all at once. A small way out is to build a pause before the final push, so finishing does not have to mean emptying yourself.",
   "chat_fear_note": "The fear underneath this is simple and very human: if you stop, you might fall behind. That fear is carrying a wish to stay safe, stay competent, and not lose your place. You do not need to argue with that wish; you need to hear how hard it is trying to protect you.",
   "psychology_fact_heading": "Hewitt and Flett's multidimensional perfectionism",
   "psychology_fact_body": "Hewitt and Flett described perfectionism as having different forms, including self-oriented perfectionism, where a person sets very high standards for themselves and keeps pressing to meet them. In your case, the 82% perfectionism score fits that self-directed pressure closely. It helps explain why finishing does not always feel finished: the standard moves again as soon as you reach it. That is why the checking habit shows up even after the task is technically done.",
   "psychology_takeaway": "Perfectionism can keep a task alive long after it should have closed. Your system is treating completion like a checkpoint, not a finish line.",
   "strengths": [
    {
     "title": "Sharp finish",
     "body": "You do not let sloppy edges slide, and your 82% perfectionism gives you real precision. That can look like going back to re-check everything after a task, which is exhausting, but it also means you catch what others miss. In the middle of a busy day, that kind of exactness is a strong engine for clean work."
    },
    {
     "title": "Endurance burst",
     "body": "Your cram-then-crash pattern still shows a lot of force; you can push through a heavy stretch when something matters. The problem is not that the effort is absent, but that it arrives in a surge. You know how to get across the finish line, and that matters."
    },
    {
     "title": "Fine radar",
     "body": "Your lower Water does not erase talent; it means the release side needs more support. Because of that, you notice tension early, even when you are trying to rest and feeling uneasy. That awareness is useful, because it tells you when your system is slipping back into alert mode."
    },
    {
     "title": "Clear standards",
     "body": "Your strong Wood gives you the drive to organize, shape, and keep things moving. That is why unfinished details bother you so much, especially after a task is complete. The same standard that wears you down is also what makes your work dependable."
    }
   ],
   "weaknesses": [
    {
     "title": "Endless checking",
     "body": "You can finish something and still not let it go, because your mind goes back to verify it again. That keeps the task emotionally open, even when it is already closed on paper. In practice, that means your evening can disappear into one more review."
    },
    {
     "title": "Rest tension",
     "body": "A day off does not automatically feel restful for you, because recovery is running low at 34%. Instead of settling, your mind keeps scanning for what it should be doing next. That tension makes rest feel like a performance instead of a pause."
    },
    {
     "title": "Crash cycle",
     "body": "When you cram for too long, the drop afterward feels sudden and heavy. You can keep going on force for a while, but the bill arrives all at once. That rhythm is hard on your sense of stability."
    },
    {
     "title": "Fear of falling behind",
     "body": "The thought of stopping carries too much meaning, because it feels like losing your place. That fear makes every pause feel risky, especially when Monday-morning messages bring the pressure back. You are not afraid of rest itself; you are afraid of what you imagine rest might cost."
    }
   ],
   "fit_good": "You do best in a schedule with clear finish lines, small closure rituals, and enough time to step away after a task ends. A workday that lets you send the last message, close the tab, and actually leave the desk helps your mind believe the day is over. Quiet, predictable pacing suits you more than constant interruption.",
   "fit_bad": "You struggle most in a setting where messages keep arriving after the work is done and nothing ever feels sealed. Open-ended days, shifting priorities, and last-minute check-ins keep your checking loop alive. When the environment never signals completion, your mind keeps doing the job of the signal itself.",
   "behavior_guides": [
    {
     "title": "Close once",
     "body": "After you finish a task, give yourself one scheduled review and stop there. Set a 10-minute window for checking, then close the file and move on to something physical, like standing up or making tea. This keeps your perfectionism from spreading into the whole evening."
    },
    {
     "title": "Protect rest",
     "body": "On your day off, choose one hour that is only for recovery, with no messages and no task-list. Put the phone in another room during that hour so your attention does not keep snapping back. That one protected block helps your system practice what rest feels like."
    },
    {
     "title": "Break the surge",
     "body": "Instead of working until you crash, stop once in the middle of the stretch and take a real pause. Even five minutes away from the screen can soften the drop that usually comes later. The goal is not less effort; it is less all-or-nothing effort."
    },
    {
     "title": "Delay the reply",
     "body": "When Monday-morning messages trigger you, wait 15 minutes before answering unless the message is truly urgent. Use that gap to breathe, stretch, or write one sentence about what the message is actually asking. That pause keeps the message from taking over your whole nervous system."
    }
   ],
   "mindset_guide": "Think of your energy like a studio light, not a spotlight that has to stay at full blast. A studio light can be dimmed, angled, and turned off without losing its purpose. Your burnout pattern gets worse when you act as if every task needs the full beam. Let completion be the switch, not another inspection pass. That is how you make room for recovery without feeling like you are disappearing.",
   "closing_title": "When the checkmark can finally stay checked",
   "closing_body": "33 to 42 is when the Water cycle opens for you, and that shift changes the feel of this whole pattern. The checking loop loosens, and the heavy sense that rest is unsafe starts to fade from the day-to-day experience. In this burnout module, that means the body stops bracing so hard, and the mind no longer treats every pause like a threat. What used to feel like one more round of proving yourself begins to feel finished."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Module 3 · Burnout",
   "track": "romance",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "After finishing a task I…",
     "label": "Go back and re-check everything",
     "dimension": "perfectionism",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "On a day off I…",
     "label": "Feel uneasy even when I rest",
     "dimension": "recovery",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "perfectionism",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "recovery",
     "rawScore": 10.2,
     "maxScore": 30,
     "percentOfMax": 34,
     "distanceFromMid": 32,
     "direction": "low",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "perfectionism"
    ],
    "kind": "single",
    "typeKey": "perfectionism"
   },
   "typeInfo": {
    "title": "Finisher's Drain",
    "hook": "Finishes everything, and is finished by it"
   },
   "nuancedSummary": "Perfectionism runs high and recovery runs low.",
   "dimensionShortNames": {
    "perfectionism": "Perfectionism",
    "recovery": "Recovery"
   },
   "elements": {
    "wood": 37.5,
    "fire": 12.5,
    "earth": 12.5,
    "metal": 25,
    "water": 12.5
   },
   "dominantElement": "wood"
  },
  "chatExtract": {
   "primary_concern": "I rest but it never feels like resting",
   "emotional_state": "Tired and a little anxious",
   "trigger_point": "Monday-morning messages",
   "repeat_pattern": "Cramming, then crashing",
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind",
   "summary_quote": "I rest but it never feels like resting",
   "integrated_summary": "Even when the work is done, your mind keeps checking, and Monday-morning messages switch that tension back on. You push through, then crash all at once, and underneath sits the fear that stopping means falling behind."
  }
 },
 "jisoo": {
  "content": {
   "title_line1": "끝낸 자리에서 다시 시작되는 사람",
   "title_line2": "멈추지 못해서가 아니라, 멈춘 뒤가 더 불편한 사람",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "밤이 깊어질수록 화면은 닫혔는데 머리는 계속 켜져 있어요. 일을 끝낸 뒤에도 다시 처음부터 훑어보는 마음이 남아 있어서, 손은 멈췄는데 시선은 아직 문서 위에 머물러 있습니다. 월요일 아침 메신저 알림이 울릴 때마다, 그날의 긴장이 미리 몸에 올라오는 느낌이 들고요. 지수님, 요즘 이런 모습 아니세요?",
   "case_tag": "가상 사례 — 민서, 30대 초반, 기획 업무",
   "case_paragraphs": [
    "민서는 마감이 끝난 뒤에도 노트를 다시 펴고, 보낸 메일 제목까지 한 번 더 확인하는 사람이에요. 토 기운이 강해서 현실을 붙잡는 힘은 좋은데, 쉬는 순간에도 머릿속이 일을 놓지 못합니다. 월요일 아침 알림만 떠도 어깨가 먼저 굳고, 쉬고 있어도 쉬는 것 같지 않다고 느껴요. 지수님도 결국 같은 자리에서 계속 점검하고 있지 않나요?"
   ],
   "oheng_intro": "토 50%가 우세하고 수 0%가 약한 분포예요. 갑목인 지수님에게 토는 내가 다루는 기운, 현실과 일을 붙잡는 기운으로 읽히고, 수는 나를 살려 주는 기운으로 읽혀요. 이번 번아웃 모듈에서는 일이 손에서 놓이지 않고 쉬는 감각이 잘 들어오지 않는 장면으로 이 분포가 그대로 드러납니다.",
   "quiz_reading": "완벽주의 82%가 높고 회복 34%가 낮은 조합이라, 끝내는 힘이 먼저 움직이고 쉬는 힘은 뒤로 밀려 있어요. ‘완주형 소진’이라는 이름이 딱 맞는 건, 하루를 마무리한 뒤에도 마음속 검토가 끝나지 않기 때문이에요. 그래서 겉으로는 일을 마쳤는데도, 안에서는 아직 퇴근하지 못한 상태가 이어집니다.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 보통 — 시작은 빠르고, 끝난 뒤에도 방향을 잡아요",
     "body": "목 33%는 보통이라서, 지수님 안에는 시작을 밀어붙이는 힘이 분명히 있어요. 일을 마친 뒤에도 다시 처음부터 훑어보는 습관은 이 목 기운의 추진력이 아직 꺼지지 않았다는 뜻이에요. 다만 번아웃 모듈에서는 그 추진력이 쉬는 쪽으로 잘 돌아서지 않아서, 멈춘 뒤에도 머리가 다음 장면을 먼저 열어 버립니다."
    },
    "fire": {
     "heading": "🔥 화 약하다 — 속도를 올리는 불씨가 거의 꺼져 있어요",
     "body": "화 0%는 적은 편이라서, 순간적으로 달아오르는 열기가 오래 남지 않아요. 지수님은 일을 끝내도 마음이 환하게 풀리기보다, 바로 다음 점검으로 넘어가는 쪽에 더 익숙해 보여요. 번아웃 모듈에서는 이 부족한 화가 ‘다 끝났다’는 체감 대신 ‘아직 뭔가 남았다’는 감각으로 나타납니다."
    },
    "earth": {
     "heading": "⛰️ 토 강하다 — 붙잡는 힘이 생활의 기본값이에요",
     "body": "토 50%는 강해서, 지수님은 현실을 손에서 놓지 않는 힘이 아주 분명해요. 마감이 끝나도 다시 처음부터 훑어보는 행동은, 토가 일을 끝낸 뒤에도 결과를 단단히 붙들고 있으려 하기 때문이에요. 번아웃 주제에서는 이 힘이 성실함으로 보이지만, 동시에 쉬는 시간까지 일의 연장선으로 만들어 버리기도 해요."
    },
    "metal": {
     "heading": "💎 금 보통 — 기준을 세우고 점검하는 눈이 살아 있어요",
     "body": "금 17%는 보통이라서, 지수님은 결과를 대충 넘기기보다 기준을 확인하는 쪽에 익숙해요. 일을 끝낸 뒤 다시 처음부터 훑어보는 습관도 이 금 기운의 점검 습관과 잘 맞아요. 다만 번아웃 상황에서는 그 점검이 안심보다 재점검으로 길어져서, 쉬는 날에도 마음이 편해지기 어렵게 만듭니다."
    },
    "water": {
     "heading": "💧 수 약하다 — 쉬게 해 주는 결이 얇아요",
     "body": "수 0%는 약해서, 지수님에게는 멈춤 뒤의 완충감이 얇게 느껴져요. 그래서 쉬는 날에도 마음이 불편하고, 알림 하나만 떠도 긴장이 다시 올라옵니다. 금이 수를 살려 주는 흐름이 있어서, 기준을 잘 정리해 두면 쉬는 감각이 조금씩 붙을 수 있어요."
    }
   },
   "upcoming_period_heading": "36세부터, 물의 계절이 열립니다",
   "upcoming_period_body": "36세부터 45세까지 수 기운이 강해지는 시기가 들어옵니다. 지금까지 지수님을 붙잡고 있던 토의 긴장감이 한 번 내려가고, 일과 휴식 사이의 간격이 더 또렷해져요. 그때부터는 끝까지 버티는 방식보다, 중간에 숨을 고르는 방식이 더 자연스러워집니다. 지금은 점검을 줄이는 연습을 미리 익혀 두면 좋아요.",
   "cross_analysis_quotes": [
    "토 50%와 완벽주의 82%는 같은 방향을 보고 있어요. 지수님은 일을 대충 끝내는 쪽보다 끝까지 붙잡는 쪽에 더 익숙하고, 그래서 결과가 나와도 마음은 바로 놓이지 않아요. 이 조합은 ‘잘했다’보다 ‘혹시 빠진 건 없나’를 먼저 떠올리게 만듭니다.",
    "수 0%와 회복 34%는 쉬는 감각이 잘 붙지 않는 상태를 같이 보여 줘요. 몸은 멈췄는데 마음은 아직 확인을 계속하고 있어서, 쉬는 날에도 불편함이 남습니다. 그래서 번아웃은 게으름이 아니라, 멈추는 쪽의 감각이 부족해서 생기는 소진으로 읽혀요."
   ],
   "answer_notes": [
    "‘일을 끝낸 뒤 나는?’에 다시 처음부터 훑어본다고 답한 건, 지수님이 결과보다 누락을 더 빨리 알아채는 사람이라는 뜻이에요. 그래서 하루를 닫는 순간에도 마음은 문서의 빈칸을 찾고, 작은 실수 하나까지 붙들고 있어요. 그 답을 고른 지수님은 이미 충분히 꼼꼼한 사람이에요.",
    "‘쉬는 날 나는?’에 쉬어도 마음이 불편하다고 답한 건, 지수님에게 휴식이 단순한 멈춤이 아니라 적응이 필요한 상태라는 뜻이에요. 겉으로는 쉬고 있어도 안쪽에서는 다음 일을 대비하는 긴장이 남아 있어요. 그 답은 지수님이 휴식을 못 배우는 사람이 아니라, 휴식에 들어가는 문턱이 높은 사람이라는 걸 보여 줘요."
   ],
   "chat_snapshot_note": "지수님이 실제로 꺼낸 고민은 쉬어도 쉬는 것 같지 않다는 말이에요. 그 말 뒤에는 지쳤고 조금 불안한 감정이 붙어 있어서, 멈춘 뒤에도 마음이 계속 일을 확인하고 있어요. 저장할 문장은 이거예요: 멈춘 뒤가 더 불편해서, 쉬는 마음까지 일처럼 점검하고 있어요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 단순한 알림이 아니에요. 그 한 번의 울림이, 아직 시작도 안 한 하루를 미리 긴장하게 만들어요. 완벽주의가 높은 축과 토 50%가 만나면, 그런 신호 하나가 바로 몸의 경계로 바뀝니다.",
   "chat_repeat_note": "몰아서 하고 무너지기 패턴은, 해야 할 일을 한 번에 다 끌어안는 방식으로 굴러가요. 지수님은 중간에 나누기보다 끝까지 버티는 쪽을 먼저 선택하고, 그래서 한 번 무너지면 회복감이 더 늦게 와요. 아주 작게는, 마감 뒤에 확인 한 번을 줄이는 것부터 이 패턴을 조금 비틀 수 있어요.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 두려움 아래에는, 놓치고 싶지 않은 마음이 있어요. 지수님은 게으르고 싶어서 못 멈추는 게 아니라, 지금 속도를 놓치면 흐름이 끊길까 봐 긴장하고 있어요. 그래서 이 두려움은 사실 더 잘 해내고 싶은 마음의 다른 얼굴이에요.",
   "psychology_fact_heading": "완벽주의와 번아웃",
   "psychology_fact_body": "완벽주의는 기준을 높게 두고 결과를 계속 점검하게 만드는 경향이에요. 번아웃 연구에서는 이런 경향이 휴식의 만족감을 낮추고, 일을 끝낸 뒤에도 마음이 완전히 내려오지 않게 만들 수 있다고 봐요. 지수님은 82%의 완벽주의와 34%의 회복이 같이 있어서, 끝낸 뒤 다시 훑어보는 장면이 아주 자연스럽게 이어집니다. 그래서 문제는 게으름이 아니라, 끝맺음과 회복이 서로 다른 속도로 움직인다는 데 있어요.",
   "psychology_takeaway": "끝낸 뒤에도 마음이 일을 놓지 않아요. 지수님은 쉬는 법이 부족한 게 아니라, 쉬어도 안심하는 속도가 조금 느린 사람이에요.",
   "strengths": [
    {
     "title": "끝까지 붙듦",
     "body": "지수님은 토 50%가 보여 주듯, 일을 끝까지 붙잡는 힘이 분명해요. 마감이 끝난 뒤에도 다시 처음부터 훑어보는 습관은 그 힘이 실제로 작동하는 장면이에요. 번아웃 상황에서도 쉽게 놓지 않는 성실함이, 지수님한테는 아주 분명한 자산이에요."
    },
    {
     "title": "점검 감각",
     "body": "완벽주의 82%는 지수님이 작은 누락을 빨리 알아채는 사람이라는 뜻이에요. 월요일 아침 메신저 알림 하나에도 긴장이 먼저 올라오는 건, 그 감각이 이미 예민하게 켜져 있기 때문이에요. 일을 대충 넘기지 않는 눈이 있어서, 결과를 다듬는 힘이 좋습니다."
    },
    {
     "title": "현실 감각",
     "body": "갑목인 지수님에게 토는 현실과 일을 붙잡는 기운이에요. 그래서 머릿속이 복잡해도, 결국 손에 잡히는 기준으로 다시 돌아오는 힘이 있어요. 이 힘 덕분에 바쁜 날에도 해야 할 것의 순서를 다시 세울 수 있어요."
    },
    {
     "title": "버티는 집중",
     "body": "몰아서 하고 무너지는 패턴 안에도, 지수님은 한 번 시작하면 끝까지 밀고 가는 집중이 있어요. 쉬는 날에도 마음이 불편한 건 그 집중이 아직 꺼지지 않았다는 뜻이기도 해요. 아주 지친 상태에서도 흐름을 놓치지 않는 점은 분명한 강점이에요."
    }
   ],
   "weaknesses": [
    {
     "title": "멈춤 불편",
     "body": "수 0%는 멈춘 뒤의 편안함이 잘 들어오지 않는 상태예요. 지수님은 쉬는 날에도 마음이 불편해서, 몸이 쉬어도 생각은 계속 일을 확인해요. 그래서 휴식이 휴식답게 느껴지기까지 시간이 더 걸립니다."
    },
    {
     "title": "과도한 점검",
     "body": "일을 끝낸 뒤 다시 처음부터 훑어보는 습관은 꼼꼼함이지만, 번아웃 모듈에서는 과도한 점검으로도 보여요. 확인이 길어질수록 쉬는 시간은 짧아지고, 마음은 더 늦게 내려와요. 지수님은 놓치지 않으려는 마음이 너무 커서, 스스로를 쉬게 하는 타이밍을 자주 놓칩니다."
    },
    {
     "title": "몰아치기",
     "body": "몰아서 하고 무너지기 패턴은 한 번에 많이 해내는 대신 한 번에 많이 지치는 구조예요. 지수님은 멈추면 뒤처질까 봐 계속 달리다가, 어느 순간 한꺼번에 지쳐 버릴 수 있어요. 그래서 속도를 나누는 연습이 꼭 필요합니다."
    },
    {
     "title": "불안한 휴식",
     "body": "회복 34%는 쉬는 동안에도 마음이 잘 내려앉지 않는다는 뜻이에요. 지수님은 쉬는 날에도 다음 일을 떠올리면서, 휴식의 끝까지 업무의 그림자를 데려가요. 이 불편함은 휴식이 필요 없다는 신호가 아니라, 휴식에 익숙해질 시간이 더 필요하다는 신호예요."
    }
   ],
   "fit_good": "지수님에게는 하루가 끊어지는 지점이 분명한 환경이 잘 맞아요. 일을 마치고 나면 결과를 다시 확인할 수 있는 시간보다, 다음 시작까지의 간격이 있는 일정이 더 좋아요. 중간에 잠깐 숨을 고를 수 있는 업무 리듬이면, 완벽주의가 번아웃으로 바로 넘어가지 않아요.",
   "fit_bad": "알림이 계속 울리고, 끝난 일도 바로 다시 열어봐야 하는 환경은 지수님을 더 지치게 해요. 월요일 아침 메신저 알림처럼 긴장을 반복해서 건드리는 하루는 회복을 더 늦춥니다. 마감이 겹치고 확인이 끊이지 않는 구조에서는 몰아서 하고 무너지는 패턴이 더 쉽게 커져요.",
   "behavior_guides": [
    {
     "title": "마감 분리",
     "body": "일이 끝난 뒤 10분만 따로 잡아서 확인을 한 번만 하세요. 그다음에는 메모장에 남긴 뒤 화면을 닫는 습관을 만들어 보세요. 퇴근 전에 반복 확인을 한 번 줄이는 것만으로도 머리의 점검이 길어지는 걸 줄일 수 있어요."
    },
    {
     "title": "알림 지연",
     "body": "월요일 아침처럼 긴장이 올라오는 시간대에는 메신저 알림을 바로 열지 말고 15분 늦게 보세요. 그 사이 물 한 잔을 마시고, 손을 먼저 쉬게 해 주세요. 알림과 반응 사이에 짧은 틈을 두면 몸이 덜 놀라요."
    },
    {
     "title": "휴식 예약",
     "body": "쉬는 날에도 마음이 불편하다면, 휴식을 ‘아무것도 안 하기’로 두지 말고 시간표에 넣어 보세요. 30분 산책, 20분 낮잠처럼 길이를 정하면 불안이 덜 커져요. 지수님은 계획된 휴식에서 더 잘 쉬는 편이에요."
    },
    {
     "title": "작업 쪼개기",
     "body": "몰아서 하고 무너지는 패턴이 보이면 일을 3덩어리로 나누세요. 한 덩어리 끝날 때마다 5분씩만 손을 떼고, 다시 시작하세요. 이렇게 나누면 끝까지 버티는 힘이 지치지 않게 흘러요."
    }
   ],
   "mindset_guide": "지수님은 일을 끝내는 사람이에요. 다만 지금은 끝낸 뒤에도 손이 오래 남아 있어요. 대운이 바뀌는 시기에는 바닥에 물이 스며들듯, 쉬는 감각이 천천히 퍼져요. 지금은 바쁘게 달리는 엔진보다, 멈춘 뒤에도 과열되지 않게 식히는 장치를 먼저 만드는 때예요.",
   "closing_title": "멈춤이 편해지는 쪽으로",
   "closing_body": "36세부터 45세까지 수 기운이 강해지는 시기가 열리면, 지수님을 오래 붙잡던 토의 긴장이 풀립니다. 그 뒤에는 쉬어도 마음이 불편한 감각이 옅어지고, 일을 끝낸 뒤 다시 처음부터 훑어보는 습관도 덜 거칠어져요. 번아웃 모듈에서 이 변화는 대단한 반전이 아니라, 몸이 쉬는 걸 다시 받아들이는 쪽으로 자연스럽게 기울어지는 모습으로 나타납니다. 지수님은 그때부터 끝까지 버티는 사람에서, 끝낸 뒤 놓아주는 사람으로 바뀝니다."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "모듈 3 · 번아웃",
   "track": "career",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "일을 끝낸 뒤 나는?",
     "label": "다시 처음부터 훑어본다",
     "dimension": "perfectionism",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "쉬는 날 나는?",
     "label": "쉬어도 마음이 불편하다",
     "dimension": "recovery",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "perfectionism",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "recovery",
     "rawScore": 10.2,
     "maxScore": 30,
     "percentOfMax": 34,
     "distanceFromMid": 32,
     "direction": "low",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "perfectionism"
    ],
    "kind": "single",
    "typeKey": "perfectionism"
   },
   "typeInfo": {
    "title": "완주형 소진",
    "hook": "끝까지 해내는 대신 끝까지 지친다"
   },
   "nuancedSummary": "완벽주의가 높고 회복이 낮은 편이에요.",
   "dimensionShortNames": {
    "perfectionism": "완벽주의",
    "recovery": "회복"
   },
   "elements": {
    "wood": 33.3,
    "fire": 0,
    "earth": 50,
    "metal": 16.7,
    "water": 0
   },
   "dominantElement": "earth"
  },
  "chatExtract": {
   "primary_concern": "쉬어도 쉬는 것 같지 않아요",
   "emotional_state": "지쳤고 조금 불안함",
   "trigger_point": "월요일 아침 메신저 알림",
   "repeat_pattern": "몰아서 하고 무너지기",
   "core_fear_or_meaning": "뒤처질까 봐 멈출 수 없어요",
   "summary_quote": "쉬어도 쉬는 것 같지 않아요",
   "integrated_summary": "일이 끝나도 머릿속에서는 계속 점검이 이어지고, 월요일 아침 알림이 그 긴장을 다시 켭니다. 몰아서 버티다 한 번에 무너지는 패턴이 반복되고, 그 밑에는 멈추면 뒤처진다는 두려움이 있습니다."
  }
 },
 "lucia": {
  "content": {
   "title_line1": "Cuando todo queda perfecto, tu energía se queda sin sitio",
   "title_line2": "Y lo que parecía descanso vuelve a sentirse como revisión",
   "subtitle": "Módulo 3 · Agotamiento — informe profundo · saju × psicología × acompañamiento integrado",
   "opening_scene": "Por la noche, cuando el día ya terminó, tú sigues con la mente encendida. Hay una tarea cerrada, pero tus manos vuelven a abrirla en la cabeza; primero miras una vez más, luego otra, como si algo todavía faltara. Y cuando llegan los mensajes del lunes por la mañana, esa tensión vuelve a prenderse casi sola. Descansas, pero por dentro no termina de sentirse como descanso. Lucía, ¿te pasa que tu cuerpo se queda quieto y tu mente sigue revisando?",
   "case_tag": "CASO DE EJEMPLO — Marta, 30 y tantos, con el descanso en duda",
   "case_paragraphs": [
    "Marta termina su día temprano, pero antes de cerrar la computadora vuelve a mirar lo mismo tres veces, como si el cierre nunca fuera suficiente. Sale a caminar para descansar, y aun así siente inquietud en el pecho porque la tarea quedó demasiado pulida y no se permite soltarla. En su mapa, la tierra domina y el metal casi no aparece, así que la presión por sostenerlo todo pesa más que la sensación de apoyo. Tú también podrías estar sosteniendo mucho más de lo que luego te dejas admitir.",
    "Marta vive con la idea de que parar un momento la deja atrás, y por eso acumula hasta que el cuerpo le pide una pausa brusca. Ese patrón encaja con una base muy cargada de tierra y una falta casi total de metal: mucho peso, poca ayuda que ordene y alivie. En su día, la revisión se convierte en costumbre y el cansancio en golpe. Tú también puedes estar funcionando así, sin darte permiso para aflojar a tiempo."
   ],
   "oheng_intro": "Tu tierra está en 38% y domina el mapa, mientras el metal queda en 0% y casi no tiene espacio. En tu Maestro del Día agua, la tierra se siente como presión, reglas y peso sobre lo que haces, y el metal sería la ayuda que te ordena y te protege. Por eso, en este módulo, el agotamiento no nace de falta de esfuerzo, sino de llevar demasiado encima sin una base que lo limpie y lo alivie.",
   "quiz_reading": "Tu 82% en perfeccionismo y tu 34% en recuperación dibujan a alguien que no se calma solo por terminar. El tipo Quien termina todo y se agota aparece justo ahí: terminas, pero tu mente sigue buscando una versión mejor, y el descanso se queda sin entrar del todo. Eso se nota en escenas pequeñas, como volver a revisar desde el principio o sentir inquietud incluso en un día libre.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera débil — lo que crece antes de ordenarse",
     "body": "Tu madera está en 13%, y eso la deja en zona baja. Se nota en que el impulso inicial aparece, pero no siempre alcanza para sostener el ritmo cuando ya llevas mucho encima. En un día como el tuyo, la madera es ese arranque que abre la tarea, pero luego necesita que otra parte del mapa la acompañe para no quedarse sola."
    },
    "fire": {
     "heading": "🔥 fuego medio — la chispa que sí aparece",
     "body": "Tu fuego está en 25%, así que no falta del todo, pero tampoco domina. Se ve en la energía con la que entras en una tarea y en la intensidad con la que quieres dejarla bien cerrada. En este módulo, ese fuego explica por qué puedes empezar con fuerza y terminar con la sensación de que todavía falta una vuelta más."
    },
    "earth": {
     "heading": "⛰️ tierra fuerte — el peso que no suelta",
     "body": "Tu tierra está en 38%, y ese es el centro más fuerte de tu mapa. Como tu Maestro del Día es agua, esta tierra se siente como presión, responsabilidad y una especie de peso que te pide sostener más de lo que tu mente quiere admitir. En el agotamiento, eso se nota cuando terminaste una tarea pero sigues revisando, como si el cierre todavía te exigiera otra prueba."
    },
    "metal": {
     "heading": "💎 metal débil — el apoyo que hace falta",
     "body": "Tu metal está en 0%, así que esta parte casi no aparece en tu mapa. La tierra es la que puede alimentar al metal, y aquí eso importa porque el apoyo, el orden y la protección no se están sintiendo con facilidad. Por eso el descanso no entra limpio: no te falta voluntad, te falta esa estructura que te ayude a parar sin culpa."
    },
    "water": {
     "heading": "💧 agua media — la mente que sigue moviéndose",
     "body": "Tu agua está en 25%, y en ti se nota como una mente que no se apaga del todo aunque el día ya terminó. Esa agua ve lo que falta, recuerda lo pendiente y vuelve a encender la revisión cuando aparece un mensaje del lunes por la mañana. En tu caso, la recuperación necesita más que parar: necesita que la cabeza deje de tratar cada cierre como una prueba nueva."
    }
   },
   "upcoming_period_heading": "A los 38 años, el fuego toma fuerza",
   "upcoming_period_body": "De los 38 a los 47 años, comienza un ciclo de diez años en el que el fuego se vuelve más fuerte. En ese tramo, lo que antes te empujaba a revisar y a sostener todo cambia de forma y te obliga a mirar con más claridad dónde pones tu energía. Para ti, será una etapa en la que conviene llegar con hábitos de cierre más limpios, porque lo que no se ordene antes tenderá a sentirse todavía más intenso después.",
   "cross_analysis_quotes": [
    "Tu tierra fuerte y tu perfeccionismo alto van en la misma dirección: te empujan a dejar todo cerrado, completo y sin grietas. Por eso una tarea terminada no siempre se siente terminada en tu cuerpo. Lo que para otras personas sería un cierre, en ti sigue pidiendo una última revisión.",
    "Tu metal en 0% y tu recuperación baja se entienden entre sí: te cuesta encontrar el punto interno que diga 'ya basta' sin sentir inquietud. Esa falta de apoyo se nota cuando descansas y, aun así, sigues esperando una señal para volver a revisar. Ahí el cansancio no es solo físico: también es la mente quedándose sin borde."
   ],
   "answer_notes": [
    "Responder que vuelves a revisarlo todo desde el principio muestra que tu mente no se conforma con cerrar, quiere asegurarse de que nada quede suelto. En la vida diaria eso aparece cuando una tarea ya terminó, pero tú vuelves a abrirla mentalmente antes incluso de pasar a la siguiente. Esa respuesta dice que tu perfeccionismo no busca brillo: busca control.",
    "Sentir inquietud aunque descanses muestra que tu recuperación no se activa solo con pausa externa. En un día libre, tu cuerpo puede estar quieto mientras la cabeza sigue buscando pendientes, señales o correcciones. Esa respuesta te recuerda que descansar para ti también implica bajar la vigilancia, no solo parar."
   ],
   "chat_snapshot_note": "Tu preocupación central no es solo descansar; es que el descanso no se siente como descanso. Eso viene acompañado de cansancio y un poco de ansiedad, así que el cuerpo pide pausa mientras la mente sigue midiendo lo que falta. La frase que se queda contigo es esta: puedes parar sin perderte.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te activan porque llegan justo donde tu mente sigue vigilando. No solo interrumpen la calma; reabren la sensación de que todavía hay que estar listo, rápido y pendiente. Con tu tierra fuerte y tu recuperación baja, ese golpe entra directo en la parte de ti que no quiere quedarse atrás.",
   "chat_repeat_note": "Primero acumulas, luego te derrumbas de golpe: así se va armando el ciclo. Tú sostienes más de la cuenta porque parar te da miedo, y cuando por fin aflojas ya estás demasiado al límite. Un paso pequeño para salir de ahí es poner un cierre breve antes de seguir, en vez de esperar a que el cuerpo te obligue a detenerte.",
   "chat_fear_note": "Te da miedo quedarte atrás si paras, y ese miedo no habla de debilidad, habla de cuánto valor le das a seguir presente. Debajo de esa alarma hay una necesidad muy clara de no perder el hilo, de no quedarte fuera de algo importante. Lo que en el fondo estás pidiendo es seguir avanzando sin sentir que cada pausa te borra.",
   "psychology_fact_heading": "Perfeccionismo clínico y recuperación insuficiente",
   "psychology_fact_body": "El perfeccionismo clínico describe una tendencia a medir el valor propio por estándares muy altos y por la revisión constante del resultado. Cuando esa lógica se combina con una recuperación baja, el descanso deja de sentirse reparador y se convierte en otro espacio de control. En tu caso, eso encaja con lo que cuentas: terminas, pero sigues revisando, y descansar no apaga la inquietud.",
   "psychology_takeaway": "No te falta pausa; te sobra vigilancia. Cuando aflojas la exigencia de cerrar perfecto, el descanso empieza a entrar de verdad.",
   "strengths": [
    {
     "title": "Cierre fino",
     "body": "Tu 82% en perfeccionismo no solo habla de exigencia; también habla de una capacidad real para ver detalles que otros pasan por alto. Se nota cuando vuelves a revisar desde el principio y detectas lo que todavía no quedó como querías. Esa precisión, bien cuidada, te da un nivel de acabado muy alto."
    },
    {
     "title": "Resistencia alta",
     "body": "Tu tierra en 38% muestra una fuerza para sostener carga durante mucho tiempo. En la práctica, eso se ve cuando acumulas trabajo, emoción y atención hasta que el día ya está lleno. Hay una resistencia en ti que aguanta mucho más de lo que desde fuera se nota."
    },
    {
     "title": "Alerta fina",
     "body": "Tu agua en 25% mantiene una lectura constante del entorno y de lo que falta. Por eso los mensajes del lunes por la mañana no pasan desapercibidos: te cambian el estado interno con rapidez. Esa alerta, bien encauzada, puede ayudarte a detectar antes cuándo ya estás llegando al límite."
    },
    {
     "title": "Impulso inicial",
     "body": "Tu fuego en 25% te da un arranque que sí se enciende cuando hay que empezar. Aunque luego el cansancio aparezca, esa chispa inicial sigue estando ahí. En un día bueno, te ayuda a entrar con decisión antes de que la revisión te frene."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión sin pausa",
     "body": "Tu perfeccionismo alto hace que terminar no siempre signifique soltar. Se ve en la escena de volver a mirar desde el inicio, como si el cierre no fuera confiable por sí solo. Eso te deja gastando energía justo cuando ya habías terminado."
    },
    {
     "title": "Descanso sin calma",
     "body": "Tu recuperación baja hace que parar no se sienta del todo reparador. Incluso en un día libre aparece inquietud, como si el cuerpo descansara pero la mente siguiera de guardia. Esa mezcla te deja sin la sensación de haber recuperado de verdad."
    },
    {
     "title": "Peso interno",
     "body": "Tu tierra fuerte empuja a sostener más de la cuenta. Como tu Maestro del Día es agua, esa tierra se vive como presión y responsabilidad, no como simple estabilidad. El resultado es una sensación de carga que cuesta soltar incluso cuando ya no hace falta."
    },
    {
     "title": "Apoyo escaso",
     "body": "Tu metal en 0% deja muy poco espacio para la estructura que ordena y protege. Por eso a veces no encuentras un borde claro entre seguir y parar. Esa falta de soporte interno vuelve más difícil cerrar el día sin llevarte trabajo mental a la cama."
    }
   ],
   "fit_good": "Te va mejor un entorno donde puedas cerrar tareas con criterios claros y sin interrupciones constantes. Un día así te permite revisar una vez, dejarlo asentado y pasar a otra cosa sin volver a abrirlo diez veces en tu cabeza. También te ayuda trabajar con espacios de pausa definidos, porque tu mente responde mejor cuando sabe cuándo termina cada tramo.",
   "fit_bad": "Te pesa un entorno que te escribe sobre la marcha y te cambia el foco antes de que cierres lo anterior. Un día lleno de mensajes, urgencias y correcciones te empuja a revisar sin parar y te deja sin sensación de fin. También te desgasta mucho un contexto donde el descanso se siente vigilado, porque ahí tu recuperación baja se nota más.",
   "behavior_guides": [
    {
     "title": "Cierre breve",
     "body": "Cuando termines una tarea, dedica 5 minutos a una sola revisión final y luego cierra la pantalla. Hazlo siempre a la misma hora, para que tu mente aprenda que el cierre también cuenta. Si vuelves a mirar después, anótalo para el día siguiente en vez de reabrirlo de inmediato."
    },
    {
     "title": "Pausa con borde",
     "body": "En cada bloque de trabajo, deja 10 minutos de pausa sin mensajes ni revisión. Usa ese rato para moverte, beber agua o mirar por la ventana, pero no para volver a pensar el problema. Así tu cuerpo empieza a distinguir entre parar y seguir de guardia."
    },
    {
     "title": "Lista cerrada",
     "body": "Antes de dormir, escribe solo tres cosas pendientes para el día siguiente. No amplíes la lista después de eso, aunque aparezcan más ideas. Esa pequeña frontera ayuda a que tu mente no siga acumulando cuando ya necesita bajar."
    },
    {
     "title": "Mensaje diferido",
     "body": "Si los mensajes del lunes por la mañana te alteran, espera 15 minutos antes de responder. En ese tiempo, respira, lee una vez y decide qué sí necesita respuesta inmediata. Ese margen corta la reacción automática y te devuelve un poco de control."
    }
   ],
   "mindset_guide": "Tu mente funciona como una mesa que nunca se vacía del todo. Si dejas cada cosa en su sitio antes de empezar la siguiente, la superficie vuelve a quedar habitable. No necesitas revisar todo para demostrar valor. Necesitas aprender que terminar también puede ser una forma de cuidar tu energía.",
   "closing_title": "Lo que deja de pesar",
   "closing_body": "38 años abren un ciclo de diez años en el que el fuego toma más fuerza, y ese cambio ya queda marcado en tu mapa. En este módulo, eso significa que la sensación de arrastre empieza a aflojar y que el descanso deja de sentirse como una tarea más. Los mensajes, la revisión y el miedo a quedarte atrás pierden peso cuando aprendes a cerrar sin volver a abrirlo todo. Lo que más quiero que te quede hoy es esto: no estás hecho para vivir revisando tu energía hasta vaciarla."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Módulo 3 · Agotamiento",
   "track": "romance",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "Después de terminar una tarea…",
     "label": "Vuelvo a revisarlo todo desde el principio",
     "dimension": "perfectionism",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "En un día libre…",
     "label": "Siento inquietud aunque descanse",
     "dimension": "recovery",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "perfectionism",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "recovery",
     "rawScore": 10.2,
     "maxScore": 30,
     "percentOfMax": 34,
     "distanceFromMid": 32,
     "direction": "low",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "perfectionism"
    ],
    "kind": "single",
    "typeKey": "perfectionism"
   },
   "typeInfo": {
    "title": "Quien termina todo y se agota",
    "hook": "Termina todo, y todo termina con su energía"
   },
   "nuancedSummary": "El perfeccionismo es alto y la recuperación es baja.",
   "dimensionShortNames": {
    "perfectionism": "Perfeccionismo",
    "recovery": "Recuperación"
   },
   "elements": {
    "wood": 12.5,
    "fire": 25,
    "earth": 37.5,
    "metal": 0,
    "water": 25
   },
   "dominantElement": "earth"
  },
  "chatExtract": {
   "primary_concern": "Descanso, pero nunca se siente como descanso",
   "emotional_state": "Cansancio y un poco de ansiedad",
   "trigger_point": "Los mensajes del lunes por la mañana",
   "repeat_pattern": "Acumular y luego derrumbarme",
   "core_fear_or_meaning": "Me da miedo quedarme atrás si paro",
   "summary_quote": "Descanso, pero nunca se siente como descanso",
   "integrated_summary": "Aunque el trabajo termine, tu mente sigue revisando, y los mensajes del lunes por la mañana vuelven a encender esa tensión. Aguantas y luego te derrumbas de golpe, y debajo está el miedo a quedarte atrás si paras."
  }
 },
 "jordan": {
  "content": {
   "title_line1": "You finish the day, but your mind keeps the receipt.",
   "title_line2": "And when rest arrives, it still feels like work in your hands.",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychology × counseling integration",
   "opening_scene": "It’s late, the work is already done, and your hand is still hovering over the screen like there’s one more thing to check. Monday-morning messages light up before the day has even begun, and the tension returns faster than your body can settle. You tell yourself you’re resting, but your mind keeps scanning for what might be missing. Jordan, doesn’t this feel like you’re never fully off, even when nothing is asking for you?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, work pressure",
   "case_paragraphs": [
    "Mina finishes her tasks before everyone else, then spends another half hour reopening the same file and checking the same lines again. By the time she finally stands up, her shoulders are already tight, and the break she planned feels too small to hold her. Her Five Elements show the same imbalance you have: Earth is heavy, and Wood is almost absent, so pressure stays strong while expression has little room to move. You can see yourself in her, because the body is already leaving the desk while the mind is still staying behind."
   ],
   "oheng_intro": "Your Five Elements are led by Earth at 38%, with Wood at 0% on the low end. In this chart, Earth sits in the place that presses on you with rules, responsibility, and pressure, while Wood is the energy you usually release outward through expression and momentum. That is why this burnout module shows up for you as overholding, not underdoing.",
   "quiz_reading": "Your profile shows Perfectionism at 82% and Recovery at 34%, and that combination fits the Finisher's Drain pattern exactly. You don’t just want to do things well; you keep circling back after the task is finished, as if the answer might change if you look one more time. That is why a day off can still feel uneasy for you, with the body resting while the mind keeps its shoes on.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood weak — the part that wants to move has almost no room",
     "body": "Wood is at 0%, so the part of you that pushes ideas outward has almost no space to breathe. In your Day Master pattern, Wood is the energy you pour out, and right now it is so thin that even a finished task can still feel unfinished. That is why you can keep re-checking after the work is already done, as if the next pass might finally make the whole thing feel settled. Water supports Wood, so anything that restores your inner calm also helps the part of you speak, draft, and move again."
    },
    "fire": {
     "heading": "🔥 Fire low — warmth appears, then burns out fast",
     "body": "Fire is at 13%, which sits low and gives your output a short, sharp flash rather than a steady glow. In a burnout pattern like yours, that can look like getting through a push with a lot of heat, then feeling flat the moment the task ends. You may look fine on the outside while the inside has already spent itself. That is why the Monday-morning message can hit so hard: it relights tension before your system has finished cooling."
    },
    "earth": {
     "heading": "⛰️ Earth strong — the weight that keeps asking for more",
     "body": "Earth is at 38%, so it is a strong force in your chart. For your Day Master, that means rules, responsibility, and pressure land directly on you, and you feel them as something you have to carry rather than something you can ignore. That is the part of you that says one more check, one more pass, one more correction. It is also why your rest can feel crowded, even when nothing is officially happening."
    },
    "metal": {
     "heading": "💎 Metal strong — the line that keeps things exact",
     "body": "Metal is also at 38%, so precision is not a side note for you; it is part of the structure you live inside. In a burnout week, that can show up as wanting the send button to feel perfectly clean before you press it. You don’t just notice what is there; you notice what could still be sharpened. That sharpness helps you finish, but it also makes it hard to let a task remain simply done."
    },
    "water": {
     "heading": "💧 Water low — the reserve that should help you reset",
     "body": "Water is at 13%, which keeps your inner reserve modest rather than abundant. Because Water supports Wood, this also means the part that would normally help your expression and momentum recover has less to draw from. You can see that in the way a day off still doesn’t feel like rest, even when you are sitting still. The body pauses, but the deeper current stays alert."
    }
   },
   "upcoming_period_heading": "31 to 40, the Fire years begin",
   "upcoming_period_body": "31 to 40 brings a Fire-heavy 10-year cycle, and that shift is already set in your chart. The older pattern of carrying pressure and checking everything does not stay in the same shape once this new stretch opens. Fire brings more visible drive, faster movement, and a clearer urge to act before doubt gets too loud. For you, that means it helps to build recovery habits now, before your pace gets even hotter.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism and 38% Earth are speaking the same language: both keep asking you to hold the line a little longer. That is why you go back and re-check after finishing, not because you lack ability, but because pressure feels safer when it is contained. The result is a day that looks complete from the outside and still feels unfinished in your chest.",
    "Your low Recovery and 0% Wood also fit together: when the part that helps you release energy is so thin, rest does not easily turn into recovery. You can stop moving and still feel mentally on duty, especially after Monday-morning messages. The body pauses, but the mind keeps preparing for the next demand."
   ],
   "answer_notes": [
    "Choosing to go back and re-check everything shows a mind that trusts precision more than relief. In daily life, that can look like reopening a file after you’ve already closed it, just to be sure the edges are clean. What you’re really protecting there is your own sense of safety, not just the task.",
    "Feeling uneasy even when you rest shows that your nervous system does not automatically accept downtime as safe. On a day off, you may still keep one part of yourself on watch, waiting for the next message or the next request. The important thing is that this answer names the tension honestly, which means it can be worked with instead of hidden."
   ],
   "chat_snapshot_note": "You came in with one clear pain point: you rest, but it never feels like resting. Under that sits tiredness with a little anxiety, which makes the whole day feel like it has a second invisible shift. The line to save is this: your body stops before your mind does.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they do not just bring information; they restart the whole pressure loop. That kind of trigger lands directly on your high Perfectionism and your strong Earth, so the tension comes back fast and feels earned. It is not that the message is too big; it is that it wakes up the part of you that never fully put the work down.",
   "chat_repeat_note": "Your cycle is clear: you cram, then you crash. In the middle, you choose to keep pushing because stopping feels like falling behind, so the break arrives only after the energy has already been spent. A small way out is to stop once before the crash, when the work is done but before the checking starts again.",
   "chat_fear_note": "You are not really afraid of rest itself; you are afraid of what rest might mean. Under the fear of falling behind is a much more vulnerable wish: to stay in step without having to run yourself raw to do it. That is a very human fear, and it makes sense in a chart that carries so much pressure and so little Wood.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "Burnout research often treats perfectionism as a maintenance factor, because the standard keeps moving even after the task is done. Recovery is not just taking time off; it is the mind’s ability to actually let the work end. In your pattern, those two ideas sit right on top of each other: high perfectionism keeps the checking alive, and low recovery keeps rest from landing fully. That is why the problem is not laziness at all; it is an overactive finish line that never quite lets you cross it.",
   "psychology_takeaway": "You are not failing to rest; your system is failing to believe rest is finished. Once that belief softens, the same break starts to feel real instead of suspect.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not let loose ends stay loose, and that is a real strength in work that needs care. Your 82% Perfectionism means you catch things other people might miss, especially when a task has already been handed in and you still notice one more detail. The same habit that makes you re-check also makes you reliable when the stakes feel high."
    },
    {
     "title": "Pressure tolerance",
     "body": "Your strong Earth at 38% gives you a way of carrying responsibility without collapsing the moment the load appears. You can keep going through a busy Monday and still get the job done before anyone else notices the strain. That ability to hold pressure is part of why people trust you with important things."
    },
    {
     "title": "Sharp standards",
     "body": "Your strong Metal at 38% gives you an eye for what is clean, accurate, and incomplete in the best possible sense. You know when a line is off, and you know when a final version still needs one more pass. That precision is a strength, especially in work that rewards exactness."
    },
    {
     "title": "Silent endurance",
     "body": "Even with Recovery at 34%, you keep showing up, which means your system has learned how to push through before it knows how to unwind. That shows up in the way you can keep functioning while feeling tired and a little anxious. The strength here is not that you never strain; it is that you keep moving even while strain is already present."
    }
   ],
   "weaknesses": [
    {
     "title": "Endless checking",
     "body": "When something is finished, your mind does not always accept the ending. With Perfectionism at 82%, you can reopen the same file, reread the same line, and still feel unsure. The problem is not the care itself; it is how hard it becomes to let care stop."
    },
    {
     "title": "Thin recovery",
     "body": "Recovery at 34% means rest can happen without fully landing. You may sit down, put the phone aside, and still feel as if part of you is waiting for the next request. That makes downtime look available while feeling strangely unavailable."
    },
    {
     "title": "Crash after push",
     "body": "Your repeated pattern is to cram first and then crash later. That means your energy gets spent in one heavy burst instead of being spread across the day, so the collapse arrives all at once. The weakness is not a lack of effort; it is the shape of the effort."
    },
    {
     "title": "Fear of slipping",
     "body": "The thought that stopping might make you fall behind keeps a lot of tension alive. It can make even a real break feel risky, as if rest has to be earned again and again. That fear keeps you moving, but it also keeps you from fully feeling the ground under you."
    }
   ],
   "fit_good": "You do best in work where the day has clear handoff points and the finish line is visible. A role with defined deliverables, short review windows, and a clean end to the workday helps you stop checking once the task is done. You also benefit from environments where Monday messages are not treated like an emergency siren.",
   "fit_bad": "You struggle in settings where every message feels urgent and the work never really closes. If you are expected to stay mentally open all evening, your checking habit has nowhere to land, and the crash comes later. Constant interruptions and vague expectations make your recovery feel even thinner.",
   "behavior_guides": [
    {
     "title": "One pass",
     "body": "After you finish a task, give yourself one scheduled re-check and then close it for the day. Do it at the same time each time, so your mind learns there is a boundary and not an endless loop. If the urge returns later, write the concern down instead of reopening the task."
    },
    {
     "title": "Message buffer",
     "body": "Keep Monday-morning messages out of your first five minutes by not opening them immediately when you sit down. Use that short buffer to settle your body before your brain gets pulled into pressure. A small delay here can keep the whole morning from snapping back on too fast."
    },
    {
     "title": "Recovery block",
     "body": "Schedule one real recovery block after a heavy push, and protect it like a meeting. During that block, do not turn rest into another performance by checking progress or planning the next correction. Give your system a full pause, not a polite one."
    },
    {
     "title": "Stop cue",
     "body": "Choose one visible cue that means work is over, like closing the laptop and putting the charger away. Use it every evening so your body sees the end before your mind starts searching for one more task. Repetition matters here because your pattern learns through signals, not speeches."
    }
   ],
   "mindset_guide": "Think of your energy like a ledger, not a floodlight. Right now, your mind keeps trying to balance the books by checking one more line, but the book never closes if you never allow a final entry. The point is not to stop caring; it is to let care have an ending. When you do that, rest starts to count as rest instead of another task.",
   "closing_title": "When the shift ends",
   "closing_body": "31 to 40 opens your Fire-heavy 10-year cycle, and that new current is already part of your path. In this burnout pattern, the change shows up as more movement and less tolerance for carrying unfinished tension around all day. The heavy feeling that now follows your checking and your cramming starts to loosen, and rest begins to feel like rest. Jordan, the work can end without you staying behind with it."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Module 3 · Burnout",
   "track": "career",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "After finishing a task I…",
     "label": "Go back and re-check everything",
     "dimension": "perfectionism",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "On a day off I…",
     "label": "Feel uneasy even when I rest",
     "dimension": "recovery",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "perfectionism",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "recovery",
     "rawScore": 10.2,
     "maxScore": 30,
     "percentOfMax": 34,
     "distanceFromMid": 32,
     "direction": "low",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "perfectionism"
    ],
    "kind": "single",
    "typeKey": "perfectionism"
   },
   "typeInfo": {
    "title": "Finisher's Drain",
    "hook": "Finishes everything, and is finished by it"
   },
   "nuancedSummary": "Perfectionism runs high and recovery runs low.",
   "dimensionShortNames": {
    "perfectionism": "Perfectionism",
    "recovery": "Recovery"
   },
   "elements": {
    "wood": 0,
    "fire": 12.5,
    "earth": 37.5,
    "metal": 37.5,
    "water": 12.5
   },
   "dominantElement": "earth"
  },
  "chatExtract": {
   "primary_concern": "I rest but it never feels like resting",
   "emotional_state": "Tired and a little anxious",
   "trigger_point": "Monday-morning messages",
   "repeat_pattern": "Cramming, then crashing",
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind",
   "summary_quote": "I rest but it never feels like resting",
   "integrated_summary": "Even when the work is done, your mind keeps checking, and Monday-morning messages switch that tension back on. You push through, then crash all at once, and underneath sits the fear that stopping means falling behind."
  }
 },
 "riley": {
  "content": {
   "title_line1": "You keep finishing the thing, then carrying the task home with you.",
   "title_line2": "The work ends, but your mind keeps the checkpoint lit.",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late, and your phone lights up with Monday-morning messages before your body has fully settled into the night. You’ve already checked the task once, maybe twice, but your mind still says, \"One more look.\" The work is done, yet your attention keeps circling back as if the finish line were a question mark. Riley, doesn’t this look like you lately?",
   "case_tag": "EXAMPLE CASE — Maya, early 30s, relationship strain",
   "case_paragraphs": [
    "Maya finishes her day, but she still opens the thread again and rereads what she sent, then checks the tone one more time before letting her phone rest. Her Five Elements are also uneven in the same way yours are: strong Wood and no Metal, so effort keeps expanding while the boundary that says \"enough\" stays thin. By the time night comes, she is tired, wired, and still not convinced she has done it right. You would recognize yourself in her very quickly.",
    "She is the kind of person who says she is resting while her mind is still auditing the day. That makes her evenings look calm from the outside and restless from the inside. Her pattern mirrors yours closely, because the pressure to keep going is stronger than the permission to stop. And yes, you would feel that tug too."
   ],
   "oheng_intro": "Your Five Elements are led by Wood at 50%, with Earth and Water both at 25%, while Fire and Metal are absent. Because your Day Master is Wood, that strong Wood is the same kind of energy as you—self-driven, close to your own will—while missing Metal means the pressure of rules, duties, and external demands can land on you without much internal buffer. In a burnout module, that combination shows up as overextension first and recovery second.",
   "quiz_reading": "Your 82% Perfectionism and 34% Recovery create a very specific kind of exhaustion: you don’t only do the task, you keep checking whether it was done well enough. That is exactly what Finisher's Drain looks like in a real day, especially when Monday-morning messages bring the tension back before you’ve recovered from the last push. The low Recovery score shows why rest can feel incomplete even when nothing is actively demanding you.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — the branch that keeps reaching",
     "body": "Wood is your strongest element at 50%, and because your Day Master is Wood, this is energy that feels like your own momentum. It’s the part of you that says, \"I can fix it,\" even after the work is technically finished. In your burnout pattern, that shows up as going back to re-check everything and keeping the task mentally alive after everyone else has moved on. The strength is real, but it can keep stretching long after the body has asked to stop."
    },
    "fire": {
     "heading": "🔥 Fire weak — the spark that doesn’t stay lit",
     "body": "Fire is at 0%, so the quick lift that makes a day feel warm, light, or visibly energized is missing from the chart. In your burnout pattern, that looks like having the task done but not feeling any inner celebration when it is over. The day closes, but the mood does not open. That makes it harder to shift from output into genuine rest."
    },
    "earth": {
     "heading": "⛰️ Earth moderate — the place that holds what you’ve carried",
     "body": "Earth is at 25%, so there is some steadiness here, but it is not the loudest part of your chart. In your current burnout pattern, Earth shows up as the part of you that tries to keep things contained after a long push, even when the mind keeps moving. It’s the quiet effort to stay organized while you are already tired. That gives you structure, but it doesn’t automatically give you relief."
    },
    "metal": {
     "heading": "💎 Metal weak — the edge that says enough",
     "body": "Metal is at 0%, and that matters because your Wood has little built-in counterweight from the side that draws lines and closes the file. Earth helps Metal, so the steadier ground in your chart is what can slowly support that missing boundary. Without much Metal, Monday-morning messages can reach you too easily and reopen the loop before you’ve had time to recover. That is why stopping can feel like falling behind instead of simply ending."
    },
    "water": {
     "heading": "💧 Water moderate — the current that keeps the mind moving",
     "body": "Water is at 25%, so your inner current is present, but it isn’t overpowering the rest of the chart. In your burnout pattern, that often feels like the mind staying active after the work is done, still checking, still comparing, still running one more pass. It also helps explain why rest can feel uneasy rather than empty. Your attention keeps flowing back to the unfinished feeling, even when the task itself is already closed."
    }
   },
   "upcoming_period_heading": "46 to 55: Earth begins to take the lead",
   "upcoming_period_body": "From age 46 to 55, Earth becomes stronger, and that changes the shape of your next chapter. The pace stops being ruled so much by sheer Wood momentum, and steadier boundaries start to matter more in how you love, wait, and recover. For you, that means the loop of over-checking can loosen, because the ground under your choices becomes more defined. It helps to build habits now that respect stopping, not just finishing.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism is why \"one more check\" feels reasonable even when the task is already done. The strong Wood at 50% explains the push behind that loop. You keep extending the branch after the fruit has already been picked.",
    "Your 34% Recovery matches the weak Metal in your chart: the part that says \"enough\" is underpowered. Earth can support Metal, so steadier routines and clearer endings are what help your recovery score show up more fully in daily life."
   ],
   "answer_notes": [
    "Going back to re-check everything shows a mind that trusts accuracy more than closure. In daily life, that can look like reopening a sent message or rereading a finished file after everyone else has moved on. The person who chose this answer is telling you they feel safer with one more pass.",
    "Feeling uneasy even when you rest shows that rest is not yet landing as a full stop. That often appears as lying down while still scanning for what should be done next. The person who chose this answer is admitting that stillness has not fully turned into relief."
   ],
   "chat_snapshot_note": "Your core worry is not laziness; it’s that rest never feels like rest. The tiredness is real, and the anxiety sits right beside it, so even downtime gets tagged by the mind as unfinished business. The line worth saving is this: you are not failing to rest because you do not care; you are struggling to rest because you care too much.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they do not just bring information; they restart the inner monitor. That is why the moment can feel much bigger than the content itself, especially with your strong Perfectionism and weak Recovery. In your chart, it lands right on the place where Wood keeps reaching and Metal should have set the edge.",
   "chat_repeat_note": "The loop is simple and costly: you cram, then you crash. In the middle, you choose to push through because stopping feels risky, so the pattern gets rewarded by short-term completion and punished by later depletion. A small way out is to set a real ending before the crash, even if it feels unfinished at first.",
   "chat_fear_note": "Your fear is not really about being left behind in a dramatic way. It’s about losing your place if you stop for too long. Under that fear is a very practical wish: to rest without having to pay for it later.",
   "psychology_fact_heading": "Hewitt and Flett’s multidimensional perfectionism",
   "psychology_fact_body": "Hewitt and Flett describe perfectionism as more than simply wanting to do well; it can include self-oriented pressure, social expectations, and the sense that mistakes carry extra weight. In your case, the self-checking after a task fits especially well with the self-oriented side of that model. When perfectionism stays high, rest can start to feel like negligence instead of recovery. That is why your mind keeps auditing the work even after the work is done.",
   "psychology_takeaway": "You are not short on effort; you are overusing it past the finish line. The real shift is learning that a closed task can stay closed without you losing your place.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half-seen. Your 82% Perfectionism means you notice what still needs a second look, and that can protect the quality of your work when others would miss the detail. It also shows up in the way you go back and re-check everything instead of pretending a rough edge is good enough."
    },
    {
     "title": "Early alertness",
     "body": "You catch tension early, before it fully turns into a visible problem. The Monday-morning messages in your story do not surprise you; you feel them in advance, which means you are already tracking pressure before it spills over. That kind of alertness can be tiring, but it also means you rarely drift through your own limits without noticing."
    },
    {
     "title": "High standards",
     "body": "You care about how things land, not just whether they are technically finished. That is why a completed task can still feel incomplete to you if the tone, timing, or detail is off. In daily life, this often looks like refining one message again before sending it, because you want the result to match your intent."
    },
    {
     "title": "Persistent drive",
     "body": "Your strong Wood at 50% gives you a steady push that does not disappear just because you are tired. Even when you feel drained, you still keep moving toward the finish. That persistence is one reason you can carry demanding periods farther than many people expect."
    }
   ],
   "weaknesses": [
    {
     "title": "Restless closure",
     "body": "You have trouble letting a finished thing stay finished. That shows up when you keep checking work after it has already crossed the line, as if closure itself needs one more approval. It is not a lack of discipline; it is a mind that has not learned how to stand down."
    },
    {
     "title": "Uneasy pause",
     "body": "Your 34% Recovery means the pause does not automatically register as safe. Even on a day off, the body may stop while the mind keeps scanning for what comes next. That is why rest can feel like a room with the lights off but the alarm still on."
    },
    {
     "title": "Crash cycle",
     "body": "You push hard, then drop hard. The pattern of cramming, then crashing makes sense with your strong output and low recovery, because the system keeps borrowing from tomorrow. In practice, that can mean a burst of intense focus followed by a stretch where everything feels heavier than it should."
    },
    {
     "title": "Fear of lagging",
     "body": "A part of you believes stopping means losing ground. That fear makes it hard to accept a clean ending, because rest starts to look like a delay instead of maintenance. It’s a quiet fear, but it has a big effect on how long you keep yourself in motion."
    }
   ],
   "fit_good": "You do best in a day that has clear endings and visible handoffs. A role or relationship rhythm with defined check-in times, clean handovers, and a real off-switch will let your strong Wood move without turning into endless self-checking. You need enough structure to know when the work is truly done.",
   "fit_bad": "You struggle in environments where messages keep arriving without boundaries. A day full of open-ended follow-ups, last-minute edits, and no clear end point will keep your mind on alert long after the task is finished. That kind of setup feeds the exact loop that drains you.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "Choose one time each day when you do the final check and stop there. Make it the same window for three days in a row, even if the urge to reopen the task shows up later. The goal is not to feel finished immediately, but to teach your mind that done can stay done."
    },
    {
     "title": "Protect recovery",
     "body": "After a demanding block, take fifteen minutes with no messages, no edits, and no review. Put the phone out of reach so Monday-morning style triggers cannot restart the loop by accident. Do this once after work and once after a heavy task, so recovery has a real container."
    },
    {
     "title": "Name the stop",
     "body": "Say out loud when the work is over, even if no one else is in the room. Use one sentence, the same sentence, and let it mark the end before you move on. That tiny ritual helps your mind notice the boundary your body already wants."
    },
    {
     "title": "Delay the recheck",
     "body": "When the urge to go back appears, wait ten minutes before opening anything again. Use that gap to drink water, stretch, or sit without looking at the screen. If the urge is still there after ten minutes, you can decide again, but the pause itself matters."
    }
   ],
   "mindset_guide": "Think of your energy like a workbench, not an endless draft. A bench is useful because it gives the task a place to sit, and it also gives you a place to stop touching it. Right now, your mind keeps sanding the same edge after the shape is already clear. The shift is not to care less; it is to let the piece leave the bench when it is finished.",
   "closing_title": "When the line holds",
   "closing_body": "From age 46 to 55, Earth takes on more weight, and that steadier ground changes how your burnout pattern feels. The constant re-checking loosens, and the heavy edge around rest softens into something more settled. In this module’s terms, the day no longer ends with your mind still standing guard over it. You start to feel the stop as a stop."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Module 3 · Burnout",
   "track": "romance",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "After finishing a task I…",
     "label": "Go back and re-check everything",
     "dimension": "perfectionism",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "On a day off I…",
     "label": "Feel uneasy even when I rest",
     "dimension": "recovery",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "perfectionism",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "recovery",
     "rawScore": 10.2,
     "maxScore": 30,
     "percentOfMax": 34,
     "distanceFromMid": 32,
     "direction": "low",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "perfectionism"
    ],
    "kind": "single",
    "typeKey": "perfectionism"
   },
   "typeInfo": {
    "title": "Finisher's Drain",
    "hook": "Finishes everything, and is finished by it"
   },
   "nuancedSummary": "Perfectionism runs high and recovery runs low.",
   "dimensionShortNames": {
    "perfectionism": "Perfectionism",
    "recovery": "Recovery"
   },
   "elements": {
    "wood": 50,
    "fire": 0,
    "earth": 25,
    "metal": 0,
    "water": 25
   },
   "dominantElement": "wood"
  },
  "chatExtract": {
   "primary_concern": "I rest but it never feels like resting",
   "emotional_state": "Tired and a little anxious",
   "trigger_point": "Monday-morning messages",
   "repeat_pattern": "Cramming, then crashing",
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind",
   "summary_quote": "I rest but it never feels like resting",
   "integrated_summary": "Even when the work is done, your mind keeps checking, and Monday-morning messages switch that tension back on. You push through, then crash all at once, and underneath sits the fear that stopping means falling behind."
  }
 },
 "casey": {
  "content": {
   "title_line1": "Cuando el trabajo termina, tu mente sigue de guardia",
   "title_line2": "Y cada revisión le vuelve a pedir energía a Casey",
   "subtitle": "Módulo 3 · Agotamiento — informe profundo de los Cinco Elementos y psicotest con acompañamiento",
   "opening_scene": "Son las mañanas en que el día todavía no arrancó del todo, y ya tienes el teléfono en la mano. Ves los mensajes del lunes por la mañana y algo en el pecho se tensa antes incluso de leerlos completos. Terminas una tarea, pero la cabeza vuelve al inicio, como si todavía faltara una vuelta más. Casey, ¿no te está pasando últimamente que descansas y, aun así, no sientes descanso?",
   "case_tag": "CASO DE EJEMPLO — Mateo, 30 y tantos, agotamiento por perfeccionismo",
   "case_paragraphs": [
    "Mateo deja una entrega cerrada y, en vez de soltarla, la abre otra vez para revisar un detalle que ya estaba bien. Su día parece normal por fuera, pero por dentro va acumulando tensión hasta que se le cae todo de golpe al final de la tarde. En su mapa también aparece una madera fuerte y un agua muy baja, así que empuja mucho más de lo que logra recuperar. Y tú también podrías verte en ese mismo gesto de seguir revisando cuando ya no queda energía."
   ],
   "oheng_intro": "Tu madera está fuerte en 38% y tu agua está en 0%, y esa combinación se nota justo en este módulo: empujas, sostienes y luego te quedas sin margen para bajar del todo. En tu mapa, la madera es la energía que toma el trabajo y lo hace avanzar; el agua es la energía que suelta, expresa y recupera. Aquí no falta voluntad: falta espacio interno para que lo vivido se asiente.",
   "quiz_reading": "Tu 82% en Perfeccionismo y tu 34% en Recuperación dibujan una escena muy concreta: acabas una tarea y tu mente no acepta cerrarla del todo. El tipo “Quien termina todo y se agota” no habla solo de hacer mucho, sino de dejar una parte de ti vigilando después de cada cierre. Por eso, incluso en un día libre, la inquietud se queda cerca y el descanso no termina de asentarse.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Madera fuerte — empujar hasta el borde",
     "body": "La madera en 38% te pone en modo de avance casi automático. Se nota cuando terminas algo y, en lugar de cerrar, ya estás buscando qué más revisar. En este módulo de agotamiento, esa fuerza se ve como la costumbre de sostener demasiado tiempo el mismo esfuerzo. Casey, tu impulso no es pequeño; por eso también te pide aprender a frenar antes de quedarte vacío."
    },
    "fire": {
     "heading": "🔥 Fuego bajo — chispa breve, poco margen",
     "body": "El fuego en 13% aparece con menos presencia que la madera, y eso se siente como una chispa que enciende rápido pero no se queda mucho rato. En tu día, eso puede verse en un momento de impulso seguido de una bajada brusca. En este módulo, el contraste importa porque no te falta intensidad; te falta duración para sostenerla sin quemarte. Casey, cuando la energía sube y baja así, el cuerpo acaba pidiendo una pausa que la mente no entrega."
    },
    "earth": {
     "heading": "⛰️ Tierra baja — sostener sin base amplia",
     "body": "La tierra en 13% deja poco espacio para asentarte después de tanto hacer. Por eso el cierre de una tarea no se siente completo de inmediato, aunque ya esté terminada. En agotamiento, eso se nota como una base que no alcanza para poner todo en su sitio antes de seguir. Casey, tu mapa pide más suelo entre un esfuerzo y el siguiente."
    },
    "metal": {
     "heading": "💎 Metal fuerte — cortar, ordenar y seguir",
     "body": "El metal en 38% te da una mirada que quiere dejar todo limpio, claro y bien resuelto. Ese impulso encaja con el perfeccionismo de 82%: no te basta con terminar, necesitas que quede exacto. En el trabajo, eso puede hacer que revises un detalle una vez más aunque ya no cambie nada importante. Casey, tu precisión es una herramienta fuerte, pero aquí también te lleva a seguir trabajando cuando ya tocaba soltar."
    },
    "water": {
     "heading": "💧 Agua muy baja — poco margen para recuperar",
     "body": "El agua en 0% es la parte más silenciosa de tu mapa y, en este módulo, la más visible. Como tu Maestro del Día es metal, el metal apoya al agua, así que tu fuerza para ordenar y cerrar también necesita sostener la recuperación que te falta. Sin ese apoyo, la mente sigue activa cuando el cuerpo ya pidió pausa. Casey, por eso un día libre puede sentirse inquietante en lugar de reparador."
    }
   },
   "upcoming_period_heading": "41 años: empieza un ciclo de metal",
   "upcoming_period_body": "A los 41 años empieza un ciclo de diez años con metal más fuerte, y esa etapa cambia el tono de tu mapa. Lo que hoy se vive como revisión infinita empieza a volverse más claro, más delimitado y menos disperso. En ese tramo, te resulta más fácil poner orden sin quedarte en la sobrecarga, así que conviene llegar con hábitos de pausa ya practicados. Casey, ese cambio no pide más presión: pide estructura para que tu energía no se vaya toda en el mismo gesto.",
   "cross_analysis_quotes": [
    "Tu 38% de madera y tu 82% en Perfeccionismo dicen lo mismo con dos lenguajes distintos: avanzas tanto que luego te cuesta dar por terminado lo que ya está hecho. Esa combinación hace que la revisión se vuelva casi un reflejo, no una decisión. Casey, tu fuerza para empujar también explica por qué te resulta tan difícil dejar de mirar.",
    "Tu 0% de agua y tu 34% en Recuperación se tocan de frente: hay muy poco espacio para volver a llenarte después de dar tanto. Por eso el descanso no se instala y la inquietud se queda cerca incluso en un día libre. Casey, no es falta de pausa; es que tu sistema todavía no encuentra cómo absorberla."
   ],
   "answer_notes": [
    "Revisar todo desde el principio muestra que tu mente no da por cerrado un trabajo solo porque ya terminó. En el día a día, eso aparece cuando vuelves sobre un detalle que ya estaba resuelto y le quitas descanso al final de la tarea. Casey, tu respuesta habla de una exigencia interna que quiere dejar todo impecable antes de soltar.",
    "Sentir inquietud aunque descanses muestra que tu recuperación no arranca solo con parar. En la práctica, eso se nota cuando tienes un día libre pero sigues con el cuerpo atento, como si algo quedara pendiente. Casey, tu respuesta deja ver que el descanso para ti necesita bajar también la vigilancia, no solo vaciar la agenda."
   ],
   "chat_snapshot_note": "Tu duda central no es solo descansar, sino que ese descanso nunca se siente como descanso. Debajo de eso aparece cansancio y un poco de ansiedad, y por eso cualquier pausa se mezcla con la sensación de estar perdiendo tiempo. Casey, lo que más te pesa no es parar: es no saber parar sin quedar en alerta.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque reactivan una tensión que ya venía encendida. No es solo el contenido del mensaje; es la sensación de que el día te pide volver a rendir antes de haber bajado del todo. Eso encaja con tu perfeccionismo alto: una señal pequeña basta para volver a poner a trabajar la cabeza.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte funciona como una cuerda demasiado tensa: aguantas, aguantas y después sueltas de golpe. En medio de eso, eliges seguir sosteniendo un poco más en vez de aflojar antes. Un cambio pequeño sería revisar menos al final y poner un corte claro antes de llegar al borde. ",
   "chat_fear_note": "Te da miedo quedarte atrás si paras, y debajo de ese miedo hay una necesidad muy clara de seguir siendo útil y no perder ritmo. No estás pidiendo vivir sin exigencia; estás pidiendo no desaparecer si bajas la marcha. Casey, ese miedo habla de cuánto te importa mantenerte al día.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "En tu caso, el perfeccionismo alto y la recuperación baja hacen que el descanso no se sienta como descanso: aunque pares, tu mente sigue revisando lo que quedó pendiente. Eso encaja con tus respuestas, porque después de terminar una tarea vuelves a revisarlo todo desde el principio y, en un día libre, sientes inquietud aunque descanses. Casey, por eso los mensajes del lunes por la mañana vuelven a activar esa tensión.",
   "psychology_takeaway": "No te falta descanso; te sobra vigilancia. Cuando la mente aprende a soltar antes, el cierre pesa menos y el día deja de acabar dentro de tu cabeza.",
   "strengths": [
    {
     "title": "Precisión",
     "body": "Tu 38% de metal y tu 82% en Perfeccionismo muestran una mirada que detecta detalles que otros dejan pasar. En el trabajo, eso te permite revisar una entrega y ver exactamente qué parte todavía necesita ajuste. Casey, esa precisión bien usada te da calidad real, no solo esfuerzo."
    },
    {
     "title": "Resistencia",
     "body": "Tu patrón de acumular y luego derrumbarte muestra que puedes sostener mucho durante un tiempo antes de soltar de golpe. Eso habla de una resistencia real, ligada a cómo aguantas hasta que la tensión te supera. Casey, esa fuerza está ahí, aunque hoy te cueste medir dónde empieza tu límite."
    },
    {
     "title": "Lectura fina",
     "body": "Con 0% de agua y 34% en Recuperación, notas el descanso más por su ausencia que por su presencia. Esa sensibilidad te hace captar rápido cuándo algo no termina de bajar, incluso si por fuera todo parece en orden. Casey, esa lectura fina puede ayudarte a detectar antes el momento de parar."
    },
    {
     "title": "Empuje",
     "body": "La madera en 38% te da un impulso fuerte para avanzar y cerrar cosas. Eso se nota en días de trabajo donde no te quedas mirando el problema, sino que lo tomas y lo llevas hasta el final. Casey, ese empuje es una fuerza útil cuando no se vuelve una carrera sin salida."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión infinita",
     "body": "Tu perfeccionismo alto hace que una tarea terminada siga viva en tu cabeza. Eso se ve en que, después de terminar algo, vuelves a revisarlo todo desde el principio, como si el cierre todavía no mereciera confianza. Casey, esa vuelta extra te quita más energía de la que parece."
    },
    {
     "title": "Descanso tenso",
     "body": "Tu 34% en Recuperación muestra que parar no siempre se siente como bajar. Puedes tener tiempo libre y seguir con una inquietud de fondo que no te deja aflojar del todo. Casey, ahí el cuerpo descansa menos de lo que la agenda promete."
    },
    {
     "title": "Acumulación",
     "body": "Tu propio relato de acumular y luego derrumbarte describe un patrón muy claro. Primero aguantas, después juntas tensión y al final todo cae junto. Casey, ese vaivén hace que el cansancio llegue de golpe en lugar de bajar por partes."
    },
    {
     "title": "Alerta al pararte",
     "body": "Tu miedo a quedarte atrás si paras mantiene una parte de ti en guardia. Por eso incluso un mensaje del lunes por la mañana puede reactivar el día entero. Casey, cuando parar se siente riesgoso, descansar se vuelve una tarea más."
    }
   ],
   "fit_good": "Te va mejor un día con bloques cerrados y un corte claro entre tareas. Si trabajas con entregas definidas y sin interrupciones constantes, tu metal y tu madera se ordenan mejor. Casey, tu energía rinde más cuando sabes exactamente dónde termina cada cosa.",
   "fit_bad": "Te pesa un entorno donde los mensajes entran sin aviso y todo parece urgente a la vez. Si saltas de una cosa a otra, tu perfeccionismo vuelve a revisar y tu recuperación se queda atrás. Casey, los días sin límites claros te dejan en alerta demasiado tiempo.",
   "behavior_guides": [
    {
     "title": "Cierre claro",
     "body": "Elige una hora fija para dar por terminada una tarea, aunque no sientas que quedó perfecta. Al llegar ese momento, guarda lo hecho y no lo abras de nuevo hasta el día siguiente. Casey, ese corte sencillo le enseña a tu mente que terminar también cuenta."
    },
    {
     "title": "Pausa real",
     "body": "Haz una pausa breve sin pantalla tres veces al día, aunque sea de cinco minutos. En ese rato, solo respira y deja de revisar mensajes o pendientes. Casey, tu recuperación necesita un descanso que no siga pidiendo atención."
    },
    {
     "title": "Menos vueltas",
     "body": "Cuando termines algo, permite solo una revisión final. Después de eso, escribe una frase de cierre y pasa al siguiente bloque. Casey, poner un límite numérico a la revisión ayuda a que tu perfeccionismo no se coma el día."
    },
    {
     "title": "Lunes más suave",
     "body": "El domingo por la noche deja preparado lo básico para el lunes y revisa los mensajes solo en dos momentos. Así reduces el golpe de la mañana y no entras de golpe en tensión. Casey, ese margen pequeño puede cambiar mucho cómo empieza tu semana."
    }
   ],
   "mindset_guide": "Piensa tu energía como una mesa de trabajo: si la llenas de cosas sin dejar un hueco libre, cualquier revisión se vuelve más pesada. No necesitas apretar más fuerte; necesitas dejar espacio entre una tarea y la siguiente. Tu metal ordena mejor cuando no está peleando con una mesa llena. Casey, cuando dejas un espacio vacío, el día deja de sentirse como una carrera continua.",
   "closing_title": "Lo que ya empieza a aflojar",
   "closing_body": "A los 41 años empieza un ciclo de diez años con metal más fuerte, y ese cambio ya está marcado en tu mapa. En ese tramo, la revisión deja de dominar tanto y tu energía encuentra una forma más ordenada de salir del trabajo sin quedarse ahí dentro. En este módulo de agotamiento, eso se traduce en menos tensión al terminar y más alivio al descansar. Casey, lo que hoy te aprieta no se queda igual para siempre: la etapa que viene te da más borde y menos ruido."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Módulo 3 · Agotamiento",
   "track": "career",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "Después de terminar una tarea…",
     "label": "Vuelvo a revisarlo todo desde el principio",
     "dimension": "perfectionism",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "En un día libre…",
     "label": "Siento inquietud aunque descanse",
     "dimension": "recovery",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "perfectionism",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "recovery",
     "rawScore": 10.2,
     "maxScore": 30,
     "percentOfMax": 34,
     "distanceFromMid": 32,
     "direction": "low",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "perfectionism"
    ],
    "kind": "single",
    "typeKey": "perfectionism"
   },
   "typeInfo": {
    "title": "Quien termina todo y se agota",
    "hook": "Termina todo, y todo termina con su energía"
   },
   "nuancedSummary": "El perfeccionismo es alto y la recuperación es baja.",
   "dimensionShortNames": {
    "perfectionism": "Perfeccionismo",
    "recovery": "Recuperación"
   },
   "elements": {
    "wood": 37.5,
    "fire": 12.5,
    "earth": 12.5,
    "metal": 37.5,
    "water": 0
   },
   "dominantElement": "wood"
  },
  "chatExtract": {
   "primary_concern": "Descanso, pero nunca se siente como descanso",
   "emotional_state": "Cansancio y un poco de ansiedad",
   "trigger_point": "Los mensajes del lunes por la mañana",
   "repeat_pattern": "Acumular y luego derrumbarme",
   "core_fear_or_meaning": "Me da miedo quedarme atrás si paro",
   "summary_quote": "Descanso, pero nunca se siente como descanso",
   "integrated_summary": "Aunque el trabajo termine, tu mente sigue revisando, y los mensajes del lunes por la mañana vuelven a encender esa tensión. Aguantas y luego te derrumbas de golpe, y debajo está el miedo a quedarte atrás si paras."
  }
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "sam": {
  "year": 2027,
  "title": "2027: Your rhythm, gently read",
  "subtitle": "A year of help, steady pressure, and useful momentum for Sam",
  "overview": "2027 looks like a year that fills you up before it asks anything back. The Fire tone of the year sits in a supportive relation to your Earth Day Master, which often feels like help, learning, and recovery arriving in practical ways. For someone with a Mountain · Order type, that can mean you feel most at ease when there is a clear shape to the year: a plan, a role, a container, a place where effort can settle and become useful.\n\nBecause your Five Elements are balanced in a broad, even way, 2027 may not push only in one direction; instead, it may highlight where you can choose your pace. Early in the year, there is more drive and appetite for results. Midyear brings more support and a few moments of friction that can redirect you. Later in the year, the energy becomes more expressive and outward, so Sam, it may help to think in terms of pacing, timing, and clean follow-through rather than trying to force every result at once.\n\nWhat stands out most is the alternation between push, support, and release. That kind of rhythm can be very workable for you if you give each phase a different job. When the year feels hot and active, you can aim; when it feels supportive, you can learn and restore; when it feels expressive, you can share and finish. In 2027, progress may come less from intensity alone and more from matching your action to the season of the year.",
  "chapters": {
   "wealth": {
    "heading": "Money likes clean timing",
    "body": "In 2027, money matters look most responsive when you take initiative with care. Early and late in the year, the flow leans toward direction, results, and practical gain, which can make it a good time to set prices, ask for fair value, or shape a clear budget. The caution is simple: when momentum feels strong, it can be easy to overcommit or chase too many gains at once.\n\nA likely scene is this: you notice a chance to tighten a plan, organize a payment, or make a choice that improves your sense of control. The useful move is not dramatic; it is the kind that makes later decisions easier. If a purchase, agreement, or financial promise starts to feel crowded, a short pause and one more review may save you from avoidable strain.\n\nFor Sam, a helpful rule in 2027 is to prefer visible structure over impulse. Write things down, compare options, and keep your commitments simple enough to manage comfortably. That way, the year’s stronger money rhythm can support you without pulling you into excess."
   },
   "love": {
    "heading": "Closer when life has shape",
    "body": "Relationships in 2027 may feel easiest when there is a shared rhythm and a clear sense of place. Your Mountain · Order nature tends to value steadiness, and the year’s supportive middle months can make warmth, trust, and mutual help feel more available. At the same time, the energetic early and late stretches may bring a stronger sense of self-direction, so connection works best when it leaves room for both people to breathe.\n\nA common scene could be a conversation that starts practical and slowly becomes more personal. You may find that a small act of reliability says more than a big declaration: remembering details, showing up on time, or making plans that actually fit real life. In the months with more friction, the main challenge may be not distance, but mixed timing—one person wants speed while the other wants structure.\n\nA gentle approach in 2027 is to let relationships grow through consistency rather than pressure. If something feels promising, keep it simple and repeatable. If something feels unclear, ask one clean question instead of trying to solve the whole pattern at once."
   },
   "career": {
    "heading": "Work grows through momentum",
    "body": "Career-wise, 2027 has a strong sense of movement: first initiative, then pressure, then support, then expression. That makes it a useful year for work that rewards structure, timing, and follow-through. The Mountain · Order quality in you can be an advantage here, because the year seems to prefer people who can hold a shape while energy changes around them.\n\nYou may notice periods where responsibility rises and the pace gets sharper. In those moments, the best outcome may come from choosing one clear priority and letting the rest wait. Later, when support becomes more visible, you might feel that the right people, information, or conditions arrive in a way that helps you stabilize what you’ve already started.\n\nFor Sam, 2027 is not about forcing a single leap. It’s more like building a strong path across several kinds of weather. Keep your standards clear, your workload visible, and your goals realistic enough to finish well."
   },
   "study": {
    "heading": "Learning lands best in layers",
    "body": "Learning in 2027 looks especially promising when you treat it as something that accumulates rather than something you conquer in one burst. The year brings both drive and replenishment, so you may do well with study that alternates between focused effort and quieter review. Because your Five Elements are evenly spread, you may find that you learn best when the material is organized, not scattered.\n\nA likely scene is that you start with a practical question and end up wanting a broader method. That’s a good sign for 2027: the year can reward learning that gives you a structure you can reuse. If a topic feels dense, breaking it into stages may work better than trying to absorb everything at once.\n\nA simple strategy is to choose one subject to deepen, one note system to keep tidy, and one weekly review to maintain momentum. That kind of rhythm may let knowledge settle in a way that feels durable instead of rushed."
   },
   "health": {
    "heading": "Protect your rhythm, not just your energy",
    "body": "For body and mind care, 2027 seems to ask for pacing more than perfection. The year’s active stretches can make you feel more alert and capable, but they can also tempt you to keep going past the point where your system wants a pause. A Mountain · Order type often does well with routine, and this year may reward regular meals, regular sleep windows, and regular time to reset.\n\nA familiar scene may be that you feel productive enough to keep adding one more task, then later realize that a short break would have made the day smoother. That doesn’t mean you need to slow everything down; it means your best pace may come from built-in pauses. The supportive middle of the year can be especially good for restoring habits that make daily life feel less noisy.\n\nTry making one small rhythm non-negotiable, such as a morning check-in, an evening wind-down, or a brief walk after work. In 2027, the goal is less about pushing harder and more about staying evenly resourced so your energy remains usable."
   }
  },
  "months": [
   {
    "headline": "A running start",
    "body": "February may feel like a month where initiative comes naturally. The year’s energy is something you can direct, so it can be a good time to begin, ask, and set things in motion. Just keep an eye on overreach; the strongest first step is the one you can actually sustain."
   },
   {
    "headline": "Small detours",
    "body": "March looks lively, but a few minor hiccups may ask for patience with details. You can still move forward, especially if you leave room for adjustments. A quick review before you commit may save time later."
   },
   {
    "headline": "Quiet pressure",
    "body": "April may bring a more inward kind of seriousness, with responsibilities becoming harder to ignore. This can be a good month for refining your approach and staying close to what matters most. If you slow the pace slightly, the work may become sturdier."
   },
   {
    "headline": "A sharper edge",
    "body": "May can feel more intense, with momentum rising and surprises appearing more easily. The best use of the month may be focused effort rather than scattered enthusiasm. If something shifts, respond cleanly instead of trying to control every outcome."
   },
   {
    "headline": "Support arrives",
    "body": "June looks like one of the most restorative months in the year. Help, learning, and useful backing may show up in ways that make your path clearer. A change in direction could be part of the month’s value, especially if it helps you work with less strain."
   },
   {
    "headline": "Open-handed ease",
    "body": "July keeps the supportive tone, but in a looser, less predictable way. You may benefit from staying flexible and noticing what shows up rather than forcing a plan too tightly. A good conversation or timely opening may come from being available."
   },
   {
    "headline": "Familiar ground",
    "body": "August may feel comfortable, even if it doesn’t bring many new sparks. This is a good month to use what already works and to trust your habits. Progress can be steady here, especially when you avoid complicating simple things."
   },
   {
    "headline": "Easy magnetism",
    "body": "September can bring a pleasant pull toward people, ideas, or situations that feel naturally aligned. Because the energy is familiar, it may be easier to attract what suits you than to chase what doesn’t. Let resonance guide your choices."
   },
   {
    "headline": "Give and use",
    "body": "October may be more expressive, with output, sharing, and contribution taking center stage. You might feel useful, but also a bit more drained if you spread yourself too widely. Choose where your effort counts most, and let the rest wait."
   },
   {
    "headline": "Mind the message",
    "body": "November continues the outward rhythm, though misunderstandings may be easier to create if things move too quickly. Clear wording and simple expectations can help more than long explanations. If something feels off, restating it plainly may bring relief."
   },
   {
    "headline": "Steering season",
    "body": "December returns to a more directive current, which can support decisions, results, and practical progress. It may be tempting to push hard, but the month may work better when you keep your aim specific. A focused choice now can set up a smoother transition."
   },
   {
    "headline": "Locking in",
    "body": "January may feel like a quiet incubation period, with potential gathering under the surface. There is also a sense of alignment that can make agreements, plans, or commitments feel easier to hold. It’s a good month to prepare carefully and let momentum build beneath the surface."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: start with shape",
    "body": "Watch for the rise in initiative and the first signs of pressure. Try one concrete action that gives the year a frame, such as setting a schedule, defining a budget, or organizing a work plan you can actually keep."
   },
   {
    "title": "May to July: stay flexible under heat",
    "body": "Notice where intensity, surprise, and support arrive close together. Choose one priority at a time, accept help when it appears, and leave a little room in your calendar so adjustments don’t become stressful."
   },
   {
    "title": "August to October: use what already works",
    "body": "This stretch may favor familiarity, resonance, and practical output. Lean on routines, protect your energy, and pick one project or relationship area where steady follow-through can create visible results."
   },
   {
    "title": "November to January: clarify and prepare",
    "body": "Watch for mixed messages, then for a return to clearer direction. Keep communication plain, review agreements carefully, and use the quieter end of the cycle to set up the next phase with less friction."
   }
  ],
  "closing": "2027 looks kind to effort that is shaped well. You do not need to chase every opening; the year seems more interested in what you can hold, refine, and complete with care. Sam, if you let timing matter as much as ambition, the year may feel not only productive, but quietly supportive too."
 },
 "mia": {
  "year": 2027,
  "title": "2027, a Year of Steady Tempering",
  "subtitle": "Mia, a year that asks for pace, shape, and a little more trust in your own timing.",
  "overview": "2027 feels like a year that tempers you rather than simply comforts you. Your Day Master is Metal, and the Fire-led tone of the year tends to press on Metal in a way that can sharpen focus, raise responsibility, and make your choices feel more visible. That doesn't mean you need to force anything; it means your best results are likely to come from choosing pace carefully and letting pressure turn into structure instead of strain.\n\nYour Five Elements mix is already fairly balanced, with Wood standing out more strongly while Fire, Earth, and Water are lighter and Metal sits in the middle. That combination often likes clear priorities, clean boundaries, and practical follow-through. In 2027, Mia, you may find that life rewards you most when you keep your plans simple enough to finish and your standards firm enough to trust. There’s also a Harvest-like quality in your chart type: what you plant, refine, and gather tends to matter more than what looks flashy at first.\n\nThe year’s movement is not flat. Early months lean toward output and expression, midyear asks for discipline and steady effort, late summer brings support and recovery, and the final stretch quiets down into review and consolidation. If you treat 2027 as a year for shaping rather than proving, it can feel less like a test and more like a forge with a useful rhythm.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best through shape",
    "body": "In 2027, money matters look most promising when they’re tied to clear decisions, useful output, and a sensible sense of timing. The year doesn’t read like a push for reckless expansion; it reads more like a chance to organize what you already have, price your time more carefully, and let results come from structure. Because your chart already carries a strong Wood note, there may be a natural pull toward growth, ideas, and giving, but the Fire tone of the year can make that feel more active and more demanding.\n\nYou may notice practical moments like taking on a project that pays through visible effort, being asked to explain the value of your work more directly, or realizing that a small system change helps money feel less scattered. Spring can be especially lively, with output increasing and spending energy rising alongside it, while midyear may ask for more restraint and a cleaner sense of what is worth continuing. The steadier months near autumn can feel more supportive for reviewing what is already working.\n\nA useful start would be to pick one money habit to simplify in 2027: one invoice routine, one spending category, or one way of tracking what comes in and goes out. Small clarity now is likely to feel more valuable than dramatic moves later, and it can help you keep your energy for the places where it really counts."
   },
   "love": {
    "heading": "Connection asks for timing",
    "body": "Relationships in 2027 may feel more active, more visible, and at times a little less predictable than usual. The year’s Fire tone can bring warmth, initiative, and a stronger desire to say what you mean, but it can also make reactions come quickly. For a Metal-centered person, that often works best when honesty stays paired with tact, so that directness becomes clarity rather than sharpness.\n\nYou might see this in ordinary moments: a conversation that moves faster than expected, a plan changing at the last minute, or a meeting that feels surprisingly significant because the timing is right. Early in the year, expression and giving may be more obvious, so you could find yourself reaching out more often or showing care in practical ways. Later, especially around May, the energy can feel more magnetic and a bit more surprising, which may bring pleasant turns in how people notice you.\n\nTry one small practice in 2027: pause before answering when a conversation feels important. That tiny delay can help you choose words that keep closeness intact, and it may make your presence feel steadier to others. Mia, you don’t need to become less direct; you may simply benefit from letting your warmth arrive with a little more shape."
   },
   "career": {
    "heading": "Work rewards disciplined heat",
    "body": "Career-wise, 2027 looks like a year where responsibility grows, but so does your chance to become unmistakably competent. The Fire tone presses on your Metal nature, which can feel like deadlines, expectations, or visibility rising together. Used well, that pressure can sharpen your judgment and help you build a reputation for being reliable under load.\n\nIn daily life, this might look like being asked to handle more at once, stepping into work that needs faster decisions, or finding that your output becomes more noticeable to others. Spring may bring a burst of production, while midyear can feel more demanding and may ask you to slow down just enough to avoid scattering your effort. By late summer, support and learning are more likely to show up, which can make a good moment for mentorship, training, or simply getting better at the systems around you.\n\nOne strong move in 2027 would be to define your top three priorities for any busy stretch before the stretch begins. That way, when pressure rises, you’ll have a map instead of a mood. Your chart suggests that steady structure will serve you better than heroic speed, and that’s especially true in a year like this."
   },
   "study": {
    "heading": "Learning comes through repetition",
    "body": "Study in 2027 looks less like a sudden breakthrough and more like a sequence of useful refinements. Your chart type favors gathering, organizing, and making sense of what has been grown over time, so learning may work best when it is practical, repeated, and closely tied to something you actually use. The year’s early months can be especially generative, with ideas flowing outward, while the middle of the year may ask you to choose one path and keep returning to it.\n\nYou might notice yourself learning in real-life fragments: a conversation that teaches you a better wording, a project that reveals a skill gap, or a new method that sticks because it solves a concrete problem. August and September may feel especially supportive for receiving help, finding good explanations, or recovering confidence in a subject that once felt tiring. Later in the year, quieter months can be excellent for review rather than starting from zero.\n\nA simple experiment for 2027 is to keep one short note file for “things worth repeating.” When something works, write it down; when something confuses you, rewrite it in plain language. That kind of steady capture fits your chart well and can help learning turn into lasting skill instead of passing interest."
   },
   "health": {
    "heading": "Energy likes a clear rhythm",
    "body": "For body and mind care, 2027 seems to favor rhythm over intensity. The year’s Fire tone can bring momentum, but it may also make you feel more easily stretched if you keep saying yes too quickly. Because your Five Elements mix already carries a good amount of Wood, you may benefit from routines that let energy move without spilling everywhere: regular meals, steady sleep timing, and breaks that are real breaks.\n\nIn everyday life, this could show up as feeling better when your schedule is predictable, noticing that busy weeks are easier when you protect a few quiet hours, or realizing that your mind settles when your environment is less cluttered. Midyear may ask for more caution around overcommitment, while late summer and early autumn can feel more restorative and easier to recover in. Even small pauses may do a lot of work for you.\n\nOne gentle practice to try is to build a short daily reset into your day: a walk, a stretch, a shower, or ten minutes without screens. It doesn’t need to be dramatic to be effective. In 2027, your system may respond especially well to consistent, modest care that helps you stay warm without running hot all the time."
   }
  },
  "months": [
   {
    "headline": "A fresh reset",
    "body": "February feels like a month of output and movement, with your energy going outward more than usual. Because the month also brings a turning-point feeling, you may notice plans changing shape quickly or old routines needing a rewrite. It’s a good time to let the shift happen instead of resisting the new direction."
   },
   {
    "headline": "Small sparks",
    "body": "March keeps the productive tone going, but with a slightly more delicate touch. Little interruptions or delays may appear, yet they’re more likely to ask for patience than create real trouble. A clean list and a calm pace can help you stay pleasantly on track."
   },
   {
    "headline": "Quiet leverage",
    "body": "April leans toward strategy, leverage, and a stronger sense of personal control. You may feel more able to steer outcomes, especially in work or money matters, as long as you don’t push past what’s realistic. This is a useful month for choosing what deserves your effort."
   },
   {
    "headline": "Unexpected openings",
    "body": "May carries a mix of momentum and surprise, which can make it feel lively and hard to predict in a good way. Connections, opportunities, or practical outcomes may come together more easily than expected. Stay open to being pleasantly redirected."
   },
   {
    "headline": "Pressure with purpose",
    "body": "June brings a more disciplined tone, and that can feel like responsibility arriving all at once. The month works best when you keep your pace steady and avoid taking on more than you can shape well. Think progress, not performance."
   },
   {
    "headline": "Wildcard weather",
    "body": "July may feel changeable, with a little more unpredictability in the air. That doesn’t have to mean chaos; it can simply mean plans benefit from flexibility and backup options. If something shifts, your advantage is staying adaptable rather than rigid."
   },
   {
    "headline": "Fresh ground",
    "body": "August feels supportive and restorative, with a better chance of receiving help, useful feedback, or a renewed sense of confidence. Learning and recovery both look stronger here, so it may be easier to absorb what you’ve been working toward. Let support count for more than self-push."
   },
   {
    "headline": "Strong pull",
    "body": "September brings a magnetic quality that can draw useful attention, resources, or meaningful conversations toward you. It’s a good month for being visible in a grounded way, not a flashy one. When you show up clearly, people are more likely to notice the substance."
   },
   {
    "headline": "Gentle easing",
    "body": "October softens the pace and feels more familiar than fiery. The tone is comfortable, but it may not offer much new stimulation, so it works well for finishing tasks and enjoying stable routines. Let the calm be useful rather than boring."
   },
   {
    "headline": "Misread moments",
    "body": "November can bring small misunderstandings or timing slips, especially if people assume rather than ask. This is a good month for clearer wording and slower reactions. A little extra precision can save you from unnecessary confusion."
   },
   {
    "headline": "A tidy pause",
    "body": "December feels like a month for wrapping, sorting, and quietly bringing things into order. You may be asked to take a more directive role or simply to organize what’s already in motion. Finishing cleanly now can make the next stretch feel much lighter."
   },
   {
    "headline": "Quiet storage",
    "body": "January moves inward and feels more private, as if the year’s energy is being tucked away for later use. Progress may be less visible, but that doesn’t mean it’s absent. This is a good time to store lessons, rest your attention, and prepare for the next cycle with care."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: shape the new momentum",
    "body": "Watch for rising output, quick turns, and moments when your energy wants to go in several directions at once. Choose one priority lane and one simple tracking method so the early-year movement stays useful instead of scattered."
   },
   {
    "title": "May to July: steer pressure gently",
    "body": "Notice where opportunities and responsibilities start arriving together. Take one extra beat before committing, and use that pause to decide whether the request fits your real capacity."
   },
   {
    "title": "August to October: accept support and refine",
    "body": "Pay attention to who offers help, useful feedback, or a better way of doing things. Say yes to learning that makes your work lighter, and use the calmer autumn tone to tighten your systems."
   },
   {
    "title": "November to January: close loops and store strength",
    "body": "Watch for confusion, slowdowns, or the urge to overexplain. Keep your communication plain, finish what can be finished, and save your best ideas for the next round rather than forcing them into the present."
   }
  ],
  "closing": "2027 asks for a steady kind of strength, not a loud one. If you let the year teach you pace, shape, and follow-through, it can leave you feeling more grounded in your own abilities. Mia, the quiet victories in this cycle may matter more than they first appear, and they may stay with you for a long time."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027, 지수님의 리듬을 읽는 해",
  "subtitle": "채움과 소모가 함께 커지는 해, 속도 조절이 힘이 되는 해",
  "overview": "2027년은 지수님에게 표현과 생산이 자연스럽게 늘어나는 해로 읽혀요. 중심 기운이 큰 나무처럼 뻗는 성향이라면, 이 해의 불은 그 나무를 더 드러내고 밖으로 펼치게 하는 쪽에 가까워서, 결과물이 보이기 쉬운 대신 에너지도 함께 많이 쓰이기 쉬워요. 그래서 ‘더 많이 해내는 해’라기보다 ‘무엇에 힘을 줄지 고르는 해’로 받아들이면 한결 편할 거예요.\n\n다만 2027년에는 들어오는 도움과 스스로 밀어붙이는 구간이 번갈아 나타나서, 모든 달을 같은 속도로 보내기보다는 흐름에 맞춰 호흡을 바꾸는 감각이 중요해 보여요. 지수님은 토의 비중이 큰 편이라, 생각을 현실로 옮기고 정리하는 힘이 이미 충분한 편이에요. 여기에 2027년의 화 기운이 더해지면 말, 글, 발표, 제작, 돌봄처럼 바깥으로 나가는 일이 활발해지기 쉬우니, ‘확장’과 ‘정리’를 같이 챙기는 쪽이 좋습니다.\n\n또 이 해는 반안살의 분위기처럼 사람들 사이에서 존재감이 보이기 쉬운 편이라, 작은 성과도 의외로 눈에 띄기 쉬워요. 지수님, 그래서 남들이 보기에 괜찮아 보여도 안에서는 피로가 쌓일 수 있으니, 결과를 키우는 만큼 회복 시간을 의식적으로 넣어 두면 훨씬 안정적일 거예요.",
  "chapters": {
   "wealth": {
    "heading": "성과를 고르는 재물의 해",
    "body": "2027년의 재물 흐름은 ‘무언가를 벌기 위해 무리한다’기보다, 내가 가진 힘을 어디에 집중하느냐에 따라 성과의 결이 달라지는 쪽에 가까워요. 지수님은 원래 큰 줄기를 세우고 오래 붙드는 힘이 있는 편인데, 2027년에는 그 힘이 바깥으로 새어 나가기 쉬워서, 돈과 자원을 다루는 일도 넓게 벌이기보다 우선순위를 세우는 편이 더 편할 수 있어요.\n\n일상에서는 구입 목록이 길어지거나, 사람을 돕는 일, 프로젝트를 확장하는 일에서 ‘이 정도면 충분한가?’를 한 번 더 묻게 되는 장면이 생기기 쉬워 보여요. 특히 8~9월경에는 주도권을 잡고 성과를 밀어붙이기 좋은 감각이 살아나지만, 동시에 과하게 넓히면 손이 분산될 수 있어요. 그래서 지수님에게는 ‘더 벌기’보다 ‘덜 흩어지기’가 더 큰 힘이 될 수 있습니다.\n\n작게 시작한다면, 고정 지출과 선택 지출을 분리해 적어 보는 방식이 잘 맞아요. 한 달에 한 번, 꼭 필요한 것과 기분으로 고르는 것을 나눠 보면 2027년의 흐름이 훨씬 또렷하게 느껴질 거예요."
   },
   "love": {
    "heading": "관계가 밝아지는 결",
    "body": "관계와 연애에서는 2027년의 화 기운이 지수님의 표현력을 살려서, 마음을 드러내고 분위기를 만드는 힘이 커지기 쉬워요. 다만 지수님은 깊게 책임지는 쪽의 감각도 함께 강한 편이라, 가볍게 넘기기보다 ‘어디까지가 편안한 관계인지’를 분명히 하는 것이 중요해 보여요.\n\n3월경에는 어울려 붙는 느낌이 살아서, 가까운 사람과의 대화가 자연스럽게 이어지거나 도움을 주고받는 장면이 생기기 쉬워요. 반대로 4월경에는 부딪힘이 조금 더 도드라져서, 익숙한 관계일수록 말의 속도를 조절하면 좋습니다. 6~7월경에는 지수님의 배려가 더 드러나기 쉬우니, 상대를 챙기느라 자신이 비지 않도록 리듬을 같이 살피는 편이 좋아요.\n\n작게 해볼 수 있는 일은 ‘먼저 묻기’예요. 상대의 생각을 추측하기보다, 한 번 더 확인하고 듣는 방식으로 관계를 다루면 2027년의 밝은 기운이 훨씬 편안하게 흘러갈 거예요."
   },
   "career": {
    "heading": "보이는 성과를 만드는 일",
    "body": "일과 커리어에서는 2027년이 지수님에게 결과물을 바깥으로 드러내기 좋은 해처럼 보여요. 중심 기운이 나무라면, 이 해의 불은 그 나무가 꽃과 열매를 보이게 하는 쪽에 가까워서, 말하기·기획하기·만들어 내기·정리해 보여 주는 일에 힘이 실리기 쉬워요. 다만 그만큼 체력과 집중력이 함께 쓰이니, ‘많이 하는 것’보다 ‘잘 보이게 하는 것’이 중요해요.\n\n2~3월경에는 도움을 받거나 배움을 흡수하기 쉬워서, 새 업무의 감을 익히거나 주변의 조언을 받아들이기 좋습니다. 10~11월경에는 책임감과 압박이 함께 올라오지만, 속도를 적절히 고르면 오히려 기반이 단단해지는 구간으로 읽혀요. 이때는 한 번에 크게 밀기보다, 우선순위를 정해 차례대로 처리하는 방식이 잘 맞습니다.\n\n작은 실행으로는, 매주 ‘가장 보여 주고 싶은 일 1개’를 정해 두는 방법이 좋아요. 지수님에게는 일을 많이 벌이는 것보다, 핵심을 선명하게 드러내는 습관이 2027년의 성과를 더 안정적으로 만들어 줄 거예요."
   },
   "study": {
    "heading": "배움이 실전으로 이어지는 해",
    "body": "배움의 흐름은 2027년에 꽤 살아 있어요. 특히 2~3월경과 12월~다음해 1월경에는 도움, 회복, 정리, 재충전의 기운이 들어와서, 새 내용을 받아들이거나 이미 배운 것을 다시 묶어 보기에 좋아 보여요. 지수님은 토의 비중이 큰 편이라, 머릿속에서만 머무는 지식보다 실제로 정리해 남기는 방식이 더 잘 맞을 가능성이 커요.\n\n일상에서는 강의, 책, 자료, 대화가 한꺼번에 들어오면서 ‘지금은 무엇부터 잡아야 하지?’라는 느낌이 들 수 있어요. 그럴 때는 4월경처럼 익숙한 감각이 강한 시기보다, 2~3월경의 받는 흐름을 잘 활용해 기초를 다져 두는 편이 편합니다. 또한 10월 이후에는 책임이 늘어 배움이 실전 과제로 바뀌기 쉬우니, 읽고 끝내기보다 바로 적용할 작은 과제를 붙이면 좋습니다.\n\n작게 시작한다면, 배운 내용을 한 줄로 요약해 두는 습관이 좋아요. 지수님에게 2027년의 공부는 ‘더 많이 아는 것’보다 ‘쓸 수 있게 정리하는 것’에서 힘이 커질 거예요."
   },
   "health": {
    "heading": "리듬을 지키는 돌봄",
    "body": "몸과 마음의 리듬에서는 2027년이 ‘활동량은 늘고, 휴식도 의식해야 하는 해’로 읽혀요. 불의 기운이 강해지면 바깥으로 나가는 힘이 커지기 쉬워서, 기분도 일정하게 달아오르거나 바빠지는 쪽으로 흐를 수 있어요. 지수님은 원래 오래 버티는 힘이 있는 편이지만, 이 해에는 버티기보다 조절하는 쪽이 더 편할 수 있습니다.\n\n5~7월경에는 표현과 생산이 늘면서 일정이 빽빽해지기 쉬워요. 반대로 2~3월경과 12월경에는 들어오는 도움과 회복의 기운이 있어, 생활 습관을 다시 맞추기 좋습니다. 잠깐 산책을 늘리거나, 식사와 수면의 시간을 대충 넘기지 않는 것만으로도 2027년의 흐름이 한결 부드러워질 수 있어요.\n\n실행은 아주 작게 시작해도 좋아요. 하루 중 한 번은 화면과 속도를 내려놓는 시간을 정해 두고, 몸이 먼저 편한지 살피는 습관을 들이면 지수님의 2027년이 훨씬 안정적으로 흘러갈 거예요."
   }
  },
  "months": [
   {
    "headline": "채움의 시동",
    "body": "2월경에는 도움과 배움이 자연스럽게 들어와서, 새로 시작하는 일의 바탕을 깔기 좋은 흐름이에요. 움직임이 조금 많아도 흐름이 막히기보다 길이 열리는 쪽에 가까워 보여요."
   },
   {
    "headline": "붙는 인연",
    "body": "3월경에는 사람과 일, 배움이 서로 잘 맞물리는 느낌이 살아나요. 가까운 관계에서 도움을 주고받거나, 익숙하지 않던 일이 의외로 빨리 익숙해질 수 있어요."
   },
   {
    "headline": "전환의 충돌",
    "body": "4월경에는 익숙한 것과 새로운 것이 맞부딪히며 방향을 바꾸기 쉬워요. 한 번에 결론을 내기보다, 상황을 다시 보는 시간이 도움이 됩니다."
   },
   {
    "headline": "익숙한 온도",
    "body": "5월경에는 편안하고 익숙한 결이 강해서, 큰 자극보다 안정감이 앞서기 쉬워요. 다만 너무 익숙한 방식만 반복하면 새로움이 덜 느껴질 수 있습니다."
   },
   {
    "headline": "표현이 커지는 달",
    "body": "6월경에는 만들고, 말하고, 내보내는 힘이 커지기 쉬워요. 손이 많이 가는 일일수록 성취감도 함께 오지만, 에너지를 고르게 쓰는 감각이 중요합니다."
   },
   {
    "headline": "반짝 드러남",
    "body": "7월경에는 지수님의 배려와 생산성이 눈에 띄기 쉬운 흐름이에요. 주변의 기대가 커질 수 있으니, 할 수 있는 범위를 분명히 해 두면 더 편합니다."
   },
   {
    "headline": "밀어붙일 수월함",
    "body": "8월경에는 주도권을 잡고 성과를 향해 나아가기 좋은 기운이 들어와요. 다만 욕심이 커지면 분산되기 쉬우니, 한 가지에 힘을 모으는 편이 좋습니다."
   },
   {
    "headline": "속도 조절",
    "body": "9월경에는 성과를 향한 추진력이 계속되지만, 과정의 균형도 함께 살펴야 해요. 빠르게 가는 것보다 방향이 맞는지가 더 중요해 보입니다."
   },
   {
    "headline": "책임의 무게",
    "body": "10월경에는 책임과 압박이 늘어날 수 있지만, 그만큼 구조를 단단히 잡기 좋은 시기예요. 속도를 낮추고 순서를 세우면 훨씬 안정적입니다."
   },
   {
    "headline": "단단해지는 시간",
    "body": "11월경에는 버티는 힘과 정리하는 힘이 함께 작동하기 쉬워요. 겉으로는 조용해 보여도 안에서는 실력이 쌓이는 흐름으로 볼 수 있습니다."
   },
   {
    "headline": "회복의 틈",
    "body": "12월경에는 도움과 회복의 기운이 다시 들어와 숨을 고르기 좋아요. 한 해를 정리하며 다음 단계의 기준을 세우기에 적당한 분위기입니다."
   },
   {
    "headline": "정리와 준비",
    "body": "다음해 1월경에는 배움과 회복이 이어지면서, 새 출발을 위한 정돈이 잘 되는 편이에요. 서두르기보다 흐름을 가볍게 정리하면 좋습니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 받는 힘 정리하기",
    "body": "이 구간에는 도움과 배움이 들어오고, 4월경에는 방향 전환의 느낌이 함께 와요. 받은 정보와 약속을 메모로 정리하고, 한 번 더 확인하는 습관을 들여 보면 흐름을 놓치지 않기 좋습니다."
   },
   {
    "title": "5~7월경: 표현의 양 조절하기",
    "body": "이 시기에는 만들고 내보내는 일이 늘어나기 쉬워요. 하고 싶은 일을 모두 펼치기보다, 가장 중요한 1~2개만 남겨 두고 나머지는 속도를 늦추는 쪽이 편합니다."
   },
   {
    "title": "8~10월경: 성과와 책임 맞추기",
    "body": "8~9월경의 추진력과 10월경의 압박감이 이어질 수 있어요. 목표를 하나로 좁히고, 중간 점검 날짜를 미리 정해 두면 과욕을 줄이면서도 성과를 챙기기 좋습니다."
   },
   {
    "title": "11월~다음해 1월경: 회복을 다음 준비로",
    "body": "이 구간은 정리와 회복, 재충전의 흐름이 들어와요. 쉬는 시간을 죄책감 없이 확보하고, 배운 것과 남은 일을 목록으로 나누어 두면 다음 흐름이 한결 가벼워집니다."
   }
  ],
  "closing": "지수님에게 2027년은 많이 비우는 해라기보다, 많이 빛나고 많이 쓰는 해에 더 가까워 보여요. 그래서 성과가 보일수록 스스로의 리듬을 챙기는 일이 중요해집니다. 흐름을 잘 읽고 속도를 고르면, 이 해는 분명 지수님답게 단단한 흔적을 남겨 줄 거예요."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, un año para afinar",
  "subtitle": "Lucía, un ciclo de fuego que te pide foco, medida y buen ritmo",
  "overview": "En 2027, el fuego marca el tono general y, con centro de agua, se entra en una relación de control y dirección: hay empuje para tomar decisiones, mover recursos y buscar resultados con más intención. Como en los Cinco Elementos hay tierra fuerte y metal ausente, conviene que el impulso no se vuelva exceso; irá mejor cuando se combine iniciativa con pausas breves, orden claro y una mirada práctica. El tipo de mapa, el rocío con orden, sugiere sensibilidad fina para notar lo que cambia y también gusto por poner cada cosa en su sitio.\n\nEl año se siente bastante dividido en tramos. Entre febrero y marzo hay una base conocida, cómoda, pero con poca novedad; de abril a julio crece la expresión y también el gasto de energía; en agosto y septiembre aparecen más exigencia y responsabilidad; y entre octubre y enero llega un sostén más amable, con ayuda, aprendizaje y recuperación. Si se lee 2027 como un año de ritmo, no de prisa, se va a encontrar más margen para elegir bien dónde poner la atención.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso firme",
    "body": "En 2027, el área del dinero se mueve con fuerza porque el fuego te pide decidir, dirigir y buscar resultados concretos. Eso puede favorecer ingresos, cobros o proyectos que dependen de tu empuje, pero también te invita a vigilar el impulso de querer abarcar demasiado a la vez. Con tanta tierra en tu mapa, lo que más te conviene es convertir la intuición en números simples: qué entra, qué sale y qué merece seguir creciendo.\n\nEs posible que notes momentos en los que una idea comercial, un encargo o una negociación se aceleren, sobre todo entre junio y julio. También puede aparecer la tentación de gastar por entusiasmo o de asumir más de la cuenta solo porque algo parece prometedor. Un ejemplo cotidiano: revisar una compra, un presupuesto o una propuesta un día después suele darte más claridad que decidir en caliente.\n\nTe ayuda empezar por una regla pequeña: antes de comprometer dinero, espera una noche y vuelve a mirar la cifra con calma. Si Lucía, en 2027, mantienes un margen de reserva y priorizas lo útil sobre lo llamativo, el año se vuelve más favorable para construir base que para perseguir fuegos artificiales."
   },
   "love": {
    "heading": "Vínculos con más tacto",
    "body": "En relaciones y amor, 2027 trae un tono directo: dices más, muestras más y también esperas respuestas más claras. Como el fuego toca tu agua, puede subir la intensidad emocional, así que los vínculos se benefician cuando hay sinceridad sin prisa y cuando no conviertes cada señal en una conclusión inmediata. Tu mapa, con sensibilidad de rocío y gusto por el orden, puede leer muy bien los matices si te das tiempo para observarlos.\n\nEn febrero y marzo tal vez te sientas cómodo con personas y rutinas conocidas, aunque no surja mucho movimiento nuevo. En septiembre, con una energía de roce y cambio, una conversación puede pedir más paciencia de la habitual; en octubre, en cambio, puede entrar un aire más cercano y colaborativo, como si una puerta se abriera con menos esfuerzo. Un gesto simple, como preguntar con claridad qué necesita la otra persona o decir qué necesitas tú sin rodeos, puede evitar confusiones innecesarias.\n\nPara que 2027 te trate bien en este terreno, conviene que no respondas solo desde la intensidad del momento. Escuchar, pausar y devolver la pregunta con calma te ayudará a distinguir entre una emoción pasajera y un vínculo que realmente merece espacio."
   },
   "career": {
    "heading": "Trabajo con dirección",
    "body": "En trabajo y carrera, 2027 te da una mezcla interesante: primero puedes mostrar más producción y presencia, y después el año te pide asumir presión con inteligencia. Como el fuego está en una relación de control respecto de tu agua, hay oportunidad de tomar el mando de procesos, ordenar prioridades y empujar resultados; la clave está en no confundir velocidad con eficacia. Con tierra fuerte en tu mapa, tienes base para sostener tareas largas si mantienes el foco.\n\nEntre abril y julio, el entorno puede reconocer tu esfuerzo y darte más visibilidad, pero también pedirte más entrega de la que pensabas. En agosto y septiembre, la carga puede subir y será mejor elegir bien dónde poner energía; una semana con demasiadas interrupciones podría hacerte sentir que todo avanza más lento. Un escenario típico: una reunión, un informe o una coordinación que parece simple al principio y luego exige más revisión de la esperada.\n\nLa mejor estrategia es dividir el trabajo en tramos pequeños y cerrar cada uno antes de abrir otro. Si en 2027 te apoyas en listas cortas, prioridades reales y revisiones breves, tendrás más facilidad para convertir presión en resultado sin perder serenidad."
   },
   "study": {
    "heading": "Aprender con pausa",
    "body": "El aprendizaje en 2027 se beneficia de un enfoque sobrio y constante, más que de una búsqueda frenética de novedades. Tu mezcla de agua y tierra favorece la comprensión profunda cuando el tema tiene estructura, y el tramo final del año aporta ayuda, recuperación y una sensación de base más tranquila para estudiar. No parece un año para dispersarte; parece un año para elegir bien qué quieres entender de verdad.\n\nEntre octubre y enero, la energía se vuelve más receptiva y puede entrar mejor la información que llega por personas, lecturas o experiencias compartidas. También es un período útil para retomar algo que dejaste a medias o para ordenar apuntes, ideas y materiales con menos presión. Un ejemplo cotidiano: releer una nota, resumir un texto o explicar en voz alta lo aprendido puede ayudarte más que acumular contenido sin procesarlo.\n\nTe conviene estudiar por bloques cortos y con una meta concreta en cada bloque. Si eliges una sola pregunta por vez y la trabajas con paciencia, 2027 te deja una sensación muy valiosa: no saberlo todo, pero sí saber dónde estás afinando tu criterio."
   },
   "health": {
    "heading": "Cuerpo y ánimo en ritmo amable",
    "body": "En cuerpo y ánimo, 2027 pide más atención al ritmo que a la fuerza. Con un fuego que activa mucho y una base de agua que necesita espacio, te irá mejor cuando alternes actividad con pausas reales y cuando no llenes todos los huecos del día. El tramo de recogimiento del año sugiere que el descanso silencioso, la rutina simple y los momentos a solas pueden ayudarte a ordenar por dentro sin forzarte.\n\nEntre agosto y septiembre, la exigencia externa puede hacerte sentir que todo pide respuesta al mismo tiempo; ahí conviene bajar un cambio antes de que el cuerpo y la mente se saturen. Entre octubre y enero, el tono se suaviza y podrías notar que recuperas mejor con hábitos regulares, sueño suficiente y menos sobrecarga visual o mental. Un ejemplo sencillo: dejar una franja sin pantallas, caminar sin prisa o comer con más atención puede cambiarte el día más de lo que parece.\n\nEmpieza por una sola costumbre pequeña y repetible, como cerrar el día a la misma hora o reservar diez minutos de silencio. Si mantienes ese gesto con constancia, 2027 te resultará más llevadero y mucho más claro."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "La energía se siente muy cercana a tu tono y eso puede hacer que notes todo con más intensidad. Como el clima interno está sensible, una frase ambigua puede confundirte más de lo normal; conviene leer despacio y preguntar una vez más antes de sacar conclusiones."
   },
   {
    "headline": "Marzo con impulso",
    "body": "Aquí aparece una sensación de brote: algo quiere salir a la luz, tomar forma o hacerse visible. Si tomas una iniciativa pequeña, el ambiente puede responder con más facilidad de la esperada y darte un primer signo de dirección."
   },
   {
    "headline": "Abril que habla",
    "body": "La energía favorece expresar, producir y ofrecer, aunque eso también te pida más gasto de tiempo y concentración. Un reconocimiento puede llegar por una tarea bien hecha, así que te conviene mostrar lo que sabes sin esperar a que alguien lo adivine."
   },
   {
    "headline": "Mayo en semilla",
    "body": "Este mes se parece a plantar: lo que hagas ahora quizá no se vea de inmediato, pero sí deja base. Si sientes ganas de moverte, canalízalas en una acción concreta, porque dispersarte te quitaría más de lo que te da."
   },
   {
    "headline": "Junio decisivo",
    "body": "Aquí el fuego se vuelve más útil para dirigir recursos y buscar resultados. A la vez, pequeños tropiezos pueden pedirte una segunda revisión, así que una comprobación extra antes de cerrar algo te ahorra vueltas."
   },
   {
    "headline": "Julio interior",
    "body": "La energía se recoge hacia dentro y te ayuda a actuar con más estrategia que exhibición. Es un mes bueno para mirar tus motivaciones con calma y decidir qué vale la pena sostener sin hacer ruido."
   },
   {
    "headline": "Agosto exigente",
    "body": "Aumentan las responsabilidades y el ritmo puede apretarse, pero no todo necesita hacerse al mismo tiempo. Si ordenas prioridades y cuidas tus recursos, el mes te vuelve más sólido en vez de más pesado."
   },
   {
    "headline": "Septiembre de giro",
    "body": "Este mes trae tensión de choque y puede mover acuerdos, planes o conversaciones que parecían estables. No hace falta forzar nada: una respuesta más serena puede convertir la fricción en un cambio útil."
   },
   {
    "headline": "Octubre que ayuda",
    "body": "Entra una energía de apoyo y aprendizaje que suaviza el paso. Un encuentro, una lectura o una colaboración puede darte justo la pieza que faltaba, sobre todo si bajas la velocidad y escuchas con atención."
   },
   {
    "headline": "Noviembre amplio",
    "body": "La sensación es de plenitud y de aire más abierto, con margen para ordenar mejor lo que ya tenías en marcha. Si cambias de entorno, de método o de rutina, puede entrar claridad sin demasiada resistencia."
   },
   {
    "headline": "Diciembre con fruto",
    "body": "Lo que sostuviste con constancia empieza a mostrar resultado visible. No es un mes de estruendo, sino de confirmación tranquila; un gesto simple puede recordarte que el esfuerzo bien dirigido sí deja huella."
   },
   {
    "headline": "Enero paciente",
    "body": "La confianza sube poco a poco y el tiempo de espera se vuelve más fácil de llevar. Si no apuras respuestas, encontrarás una calma útil para preparar el siguiente tramo sin ansiedad ni exceso de ruido."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Observa cómo te afecta una energía conocida pero poco novedosa, y aprovecha la claridad emocional de febrero para poner nombre a lo que te importa. Haz una lista corta de tres prioridades y prueba una iniciativa pequeña en marzo o abril para ver dónde hay verdadera respuesta."
   },
   {
    "title": "De mayo a julio",
    "body": "Vigila el gasto de energía, porque aquí crecen la expresión y la producción. Elige un proyecto principal y llévalo por etapas, con una revisión antes de cada decisión que implique dinero, tiempo o promesas."
   },
   {
    "title": "De agosto a octubre",
    "body": "Mira de cerca cómo se combinan presión, roce y ayuda. En agosto y septiembre, reduce el ritmo cuando notes demasiadas demandas; en octubre, acepta apoyo, aprende de una conversación útil y deja que una colaboración te ordene el panorama."
   },
   {
    "title": "De noviembre a enero",
    "body": "Aprovecha el tramo más receptivo para consolidar hábitos y recuperar base. Elige una práctica simple —estudio breve, orden semanal o pausa diaria— y repítela hasta que se vuelva natural, sin pedirle perfección."
   }
  ],
  "closing": "Lucía, 2027 no te pide correr todo el tiempo; te pide elegir bien cuándo empujar y cuándo escuchar. Si respetas tu ritmo y dejas que el fuego te dé dirección sin invadirlo todo, el año puede sentirse más claro, más útil y más tuyo."
 },
 "jordan": {
  "year": 2027,
  "title": "2027, Your Steady Spark",
  "subtitle": "A year for guiding energy, not forcing it",
  "overview": "2027 feels like a year where you can lead with more clarity than usual, Jordan. The fire of the year tends to push momentum, results, and visible progress, and your Water Day Master gives you a natural sense for when to steer, when to wait, and when to keep things from running too hot. Because your chart leans strongly toward Earth and Metal, with less Wood and a modest amount of Fire and Water, the year may feel more effective when you choose a few priorities and protect your energy instead of scattering it.\n\nThe first half of 2027 can feel easier to recognize and more familiar in tone, then the middle months ask for more output, more responsibility, and more careful pacing. Later in the year, support and learning tend to come back in, especially if you stay open to help instead of trying to carry everything alone. The overall mood is not about chasing constant novelty; it is more about using a stable inner structure to turn opportunity into something usable, practical, and real.",
  "chapters": {
   "wealth": {
    "heading": "Money that responds to direction",
    "body": "In 2027, money matters may feel more responsive when you take the lead clearly and keep your goals simple. Because the year’s energy leans toward results and your chart already has a strong sense of structure, this can be a good time to notice where effort becomes tangible value. The caution is not lack, but overreach: trying to do too much at once may blur the very progress you’re trying to create.\n\nIn daily life, this might look like wanting to refine a budget, renegotiate a fee, or finally give a project a cleaner shape. June and July especially can bring a sense of momentum around earning, spending, or making something more profitable, while late summer may ask you to slow down and check the fine print before committing. You may notice that small, practical decisions matter more than dramatic moves.\n\nA useful approach is to pick one financial priority for the spring, one for the summer, and one for the fall, instead of trying to fix everything at once. Keep a simple record of what brings return, what drains time, and what only looks attractive in the moment. Jordan, the year tends to reward steady steering more than bold guessing."
   },
   "love": {
    "heading": "Connection that grows by pacing",
    "body": "Relationships in 2027 may feel most natural when you let them unfold at a manageable speed. The first months of the year can feel familiar and comfortable, which is lovely for trust, but not always exciting; that can be a strength if you value consistency. Later, when the year becomes more active and demanding, relationships may benefit from more honesty about timing, energy, and what you can realistically offer.\n\nYou might find yourself in conversations that move from casual to meaningful, or in moments where someone’s expectations feel a little sharper than usual. That doesn’t have to become a problem; it may simply mean the year asks for clearer boundaries and better listening. Around August and November, changes in pace or setting may bring a fresh angle to an existing bond, or help you see a connection in a new light.\n\nIf you want to make the most of 2027, try saying what you mean earlier rather than later, especially when plans are shifting. Small gestures, consistent follow-through, and a willingness to adjust the rhythm can go a long way. This is a year to build trust through reliability, not through intensity alone."
   },
   "career": {
    "heading": "Work that benefits from timing",
    "body": "Career energy in 2027 looks like a mix of output, pressure, and eventual support. The middle of the year may be especially active: you may feel more able to drive projects forward, claim ownership, or turn effort into visible results. Because your chart has a strong sense of order, you may do especially well when the work is organized, measurable, and tied to a clear purpose.\n\nAt work, this can show up as a period when people notice your initiative, but also when expectations rise. August and September may ask you to move carefully, because the pace can feel heavier and communication may need an extra check. Then October and November can bring helpful guidance, learning, or a chance to recover momentum with support from others.\n\nThe best strategy is to treat 2027 as a year for clean execution rather than constant expansion. Choose projects that let you show competence, and leave room for revision before you lock anything in. If something gets busier than expected, it may help to ask what can be simplified instead of pushing harder by default."
   },
   "study": {
    "heading": "Learning that settles in",
    "body": "Learning in 2027 may work best when it is practical, structured, and directly useful. Your strong Earth and Metal pattern tends to favor systems, methods, and clear organization, so you may feel more satisfied studying things that can be applied rather than collected for their own sake. The year also seems to support learning through doing, especially when you can test ideas in real situations.\n\nYou might notice that the spring is more about absorbing familiar material, while the late year brings a better chance to receive guidance or rebuild confidence in a subject. October and November especially can feel like a helpful window for study groups, mentoring, review, or returning to something you already know and seeing it with fresh eyes. The challenge may be that the year’s pace can make you want quick results before the material has fully settled.\n\nA good move is to keep your learning small and consistent: one course, one skill, one reading track, one note system. Review what you learn in short cycles instead of waiting for a perfect block of free time. That approach fits your chart’s orderly side and helps the year’s energy become usable instead of scattered."
   },
   "health": {
    "heading": "Energy that likes a clean rhythm",
    "body": "For body and mind, 2027 seems to favor rhythm, not extremes. With a Water Day Master and a year that brings strong Fire influence, you may do best when you protect rest, hydration, and quiet transitions between busy periods. This is less about pushing through and more about noticing when your energy becomes noisy, then giving it a cleaner shape.\n\nIn everyday life, that could mean feeling fine when you have a clear routine, then a little frayed when days become too packed or too reactive. Late summer may especially ask for pacing, because responsibility and pressure can crowd the schedule if you let them. Later in the year, you may find it easier to restore yourself through simpler habits, calmer spaces, and less mental clutter.\n\nTry building a repeatable reset: a short walk, a slower morning, a tidy desk, or a few minutes with no screens before bed. None of that needs to be dramatic to help. The year responds well when you make room for quiet recovery before you feel depleted."
   }
  },
  "months": [
   {
    "headline": "Soft restart",
    "body": "February may feel familiar in a comforting way, like stepping back into a rhythm you already know. At the same time, a few unexpected turns can keep things from becoming too predictable, so it helps to stay flexible with plans."
   },
   {
    "headline": "Warm beginnings",
    "body": "March can bring a sense of fresh start and natural growth, even if the pace is still gentle. There may also be a little friction around timing or expectations, so simple communication can save effort later."
   },
   {
    "headline": "Quiet output",
    "body": "April may ask you to give more than you receive, especially through speaking up, creating, or helping others. Because the energy is still building, it can be wise to choose where your effort matters most."
   },
   {
    "headline": "New ground",
    "body": "May can feel like a month for trying something that hasn’t been fully mapped out yet. The mood supports fresh work and practical experimentation, though it may ask you to keep your feet on the ground while you explore."
   },
   {
    "headline": "Steer the flow",
    "body": "June may feel more direct and productive, with a stronger chance to shape outcomes in your favor. Attraction, momentum, and results can all feel stronger here, so the key is to stay focused instead of overloading the month."
   },
   {
    "headline": "Hold the center",
    "body": "July may still support progress, but in a quieter, more contained way. It can be a good month for protecting what you’ve built, waiting for the right opening, and avoiding the urge to force a bigger move than the moment wants."
   },
   {
    "headline": "Careful adjustments",
    "body": "August may bring more responsibility and a stronger need to pace yourself. Because the month can blur signals a little, it helps to double-check assumptions and keep your schedule a bit looser than usual."
   },
   {
    "headline": "Measured resolve",
    "body": "September can feel serious, with a stronger sense of duty and a need to move deliberately. This is a good month for clear priorities, because steady action is likely to work better than rushing."
   },
   {
    "headline": "Support returns",
    "body": "October may bring help, learning, or a sense of relief after the heavier stretch. You may feel more able to recover your footing, and small improvements can start to feel surprisingly meaningful."
   },
   {
    "headline": "Turn in motion",
    "body": "November can open the door to movement, change, or a useful shift in direction. Because the month also carries a stronger sense of collision with the familiar, it may help to stay open-minded when plans move suddenly."
   },
   {
    "headline": "Steady again",
    "body": "December may return you to a more familiar rhythm, with fewer surprises and a clearer sense of what works. Small interruptions may appear, but they are more likely to be manageable than disruptive."
   },
   {
    "headline": "Inner calm",
    "body": "January can feel inward and reflective, like a quiet stretch that favors private thinking over public display. It may be a good time to gather your thoughts, refine your intentions, and let the year close with less noise."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: set the frame",
    "body": "Watch for the difference between comfortable routine and quiet stagnation. Try one practical action: choose a single priority for work, money, or study, and make a simple weekly check-in to keep it moving."
   },
   {
    "title": "May to July: use momentum carefully",
    "body": "Watch for a stronger flow of output, visibility, and opportunity. Try one practical action: before saying yes to a new task or expense, pause long enough to ask whether it supports your main goal or only adds heat."
   },
   {
    "title": "August to October: pace and recover",
    "body": "Watch for heavier expectations followed by a gradual return of support. Try one practical action: build one protected recovery block into your week so you can think clearly before making the next commitment."
   },
   {
    "title": "November to January: accept the turn",
    "body": "Watch for shifts in direction, helpful input, and a quieter inner life. Try one practical action: review what worked in 2027, keep the useful parts, and write down one intention you want to carry into the next cycle."
   }
  ],
  "closing": "Jordan, 2027 looks less like a year of random surprises and more like a year of learning how to direct heat without losing your shape. If you trust your own timing, keep your priorities simple, and let support arrive when it does, the year can feel both productive and surprisingly steady. The best results may come from calm control, not constant force."
 },
 "riley": {
  "year": 2027,
  "title": "2027, Riley's Steady Flame",
  "subtitle": "A year of giving, refining, and choosing your pace",
  "overview": "2027 carries a warm, outward-moving tone for you, Riley. Your core nature is strongly Wood, with plenty of room for Fire to show up as expression, output, and visible effort. Since the year’s energy feeds what you naturally produce, it can feel like a season where your ideas, words, and care flow more easily, but your energy may also be spent faster than usual.\n\nBecause you’re an Oak-Rooted type, you tend to do best when growth has both direction and structure. In 2027, that means you may feel most comfortable when you give generously without scattering yourself too thin. Early in the year, support and replenishment look easier to receive; midyear, your output may become more active and noticeable; later in the year, the pace may ask for firmer choices, clearer priorities, and a calmer inner rhythm.\n\nThe strongest thread through 2027 is not urgency, but refinement. If you keep returning to what is worth your time, what deserves your effort, and what can be done in a simpler way, the year can feel surprisingly workable. You don’t need to force every opening; in many moments, it may be enough to meet the year with steady warmth and a practical sense of measure.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best with shape",
    "body": "For finances, 2027 looks like a year where your effort and output may matter more than pure luck. Because the year supports expression and production, money-related progress may come through what you make, share, teach, or deliver. At the same time, that same flow can tempt you to spend energy, time, or resources too quickly, so a simple structure may help more than a bold leap.\n\nYou may notice this in everyday moments like agreeing to extra work, buying tools for a project, or feeling drawn to improve something that already works. In late summer, especially, the urge to push for results may feel stronger, and it could be easy to say yes before you’ve checked the full shape of the commitment. A slower glance at the details may save you from feeling stretched.\n\nA good starting point is to keep one clear list: what brings value in, what quietly leaks value out, and what deserves a pause. If you revisit that list each month, Riley, you may find it easier to make practical choices without losing your generous momentum."
   },
   "love": {
    "heading": "Warmth, timing, and honest signals",
    "body": "In relationships, 2027 may feel especially active in the first half of the year. Support, ease, and a sense of being met can come through more naturally, which makes it a good time to reconnect, ask better questions, or let someone see a more open side of you. Your Wood nature tends to value growth, and this year’s Fire tone may help feelings become more visible and easier to name.\n\nYou might notice this in group plans that suddenly feel lively, in a conversation that deepens faster than expected, or in moments when people seem drawn to your presence. Around early spring, the tone may feel especially magnetic; later, a few months may feel more ordinary and less dramatic, which can actually be useful for noticing what is steady rather than exciting. If a misunderstanding appears in the background, it may be best handled through simple clarification instead of reading too much into it.\n\nA gentle approach would be to speak plainly, check what the other person actually meant, and let closeness grow at a natural pace. The year favors honest warmth over performance, and that can make your connections feel more trustworthy over time."
   },
   "career": {
    "heading": "Visible work, careful pacing",
    "body": "Career-wise, 2027 looks like a year where your output may become easier to see. That can be excellent for projects that need voice, creativity, leadership, or clear delivery, because the year supports showing what you can do. Still, since you’re naturally more rooted than flashy, the challenge may be to stay visible without overextending yourself.\n\nIn practical life, this could show up as more requests for your input, more chances to present ideas, or a feeling that people are finally noticing your consistency. Midyear may bring a stronger sense of momentum, while late summer could push you to take the lead on something that changes direction quickly. That kind of turning point can be useful, but it may work best when you leave room for adjustment.\n\nA steady strategy would be to choose one or two places where you want to be clearly seen, then build your presence there instead of scattering attention everywhere. If you let your work speak with structure and clarity, 2027 may reward you with more recognition than noise."
   },
   "study": {
    "heading": "Learning through contact and repetition",
    "body": "For study and learning, 2027 may be strongest when you learn by doing, explaining, or creating something tangible. Your strong Wood nature often prefers growth that feels alive, and this year’s Fire tone can help you digest ideas by turning them into words, examples, or practice. Quiet reading alone may still help, but active use of knowledge may help it stick better.\n\nYou may notice that some months feel especially easy for asking questions, finding mentors, or picking up useful guidance, while other months feel more routine and less inspired. That contrast can be useful: support early in the year may help you gather material, while the middle of the year may ask you to organize and repeat what you’ve learned. If a topic feels fuzzy, it may be a sign to teach it back to yourself in simpler language.\n\nA helpful move would be to keep a small notebook or digital file for “things I can use soon.” Put examples, summaries, and next steps there instead of saving everything in your head. That way, your learning can become practical without feeling heavy."
   },
   "health": {
    "heading": "Keep the flame even",
    "body": "For body and mind care, 2027 points toward balance more than intensity. Because the year encourages giving, producing, and showing up, it may also quietly ask for better recovery habits so your energy doesn’t run hot and thin at the same time. With your Wood-heavy nature, you may feel best when movement, rest, and mental space all have a place in the week.\n\nIn daily life, this might look like feeling especially full of plans in some months, then noticing a drop in focus when too many commitments stack up. Spring and early summer may feel more energizing, while later months may ask for slower mornings, simpler schedules, and less multitasking. A calmer rhythm can make your energy feel more even and your thoughts easier to sort.\n\nTry building one small reset into your routine: a walk, a quiet cup of tea, a screen break, or ten minutes of tidying before bed. Riley, the goal isn’t perfection; it’s giving your system enough room to recover between bursts of effort."
   }
  },
  "months": [
   {
    "headline": "Fresh ground",
    "body": "February may feel like a month where support arrives more easily than expected. The pace can still ask for effort, but the effort may feel worthwhile because new ground is opening under your feet. If something feels promising, start by testing it gently rather than trying to finish it all at once."
   },
   {
    "headline": "Magnetic spring",
    "body": "March may bring a fuller, more noticeable kind of energy, especially around people and shared plans. You could feel more seen, more invited, or more able to gather momentum from the right conversations. If you want to make progress, this is a good month to follow the pull of what feels alive."
   },
   {
    "headline": "Easy rhythm",
    "body": "April may feel comfortable and familiar, with less pressure to prove anything. That can be useful for organizing, settling, and enjoying a steadier pace. Since the month may be less stirred up, you may want to use it for maintenance rather than big declarations."
   },
   {
    "headline": "Quiet adjustments",
    "body": "May may favor patience, because things could look settled on the surface while still needing a second look. Misreading a detail is easier here, so checking assumptions may save time later. If a plan feels slightly off, small corrections may work better than a complete restart."
   },
   {
    "headline": "Leading by doing",
    "body": "June may highlight your ability to produce, organize, and take the lead through action rather than talk. The month can feel busy, but also useful, especially if you keep your priorities simple. A clear role or responsibility may help you feel more grounded in the middle of the motion."
   },
   {
    "headline": "Stored strength",
    "body": "July may look quieter on the outside, even if you’re doing a lot behind the scenes. That makes it a good time to sort, refine, and decide what deserves to stay with you. Advancement may come through careful preparation rather than visible speed."
   },
   {
    "headline": "Turning point",
    "body": "August may feel decisive, with a strong urge to move, shift, or take control of a situation. Because the month can bring a strong push in a different direction, flexibility may matter more than stubbornness. If plans change suddenly, it may help to treat that as a signal to adapt rather than a setback."
   },
   {
    "headline": "Practical push",
    "body": "September may support ambition, results, and a sharper focus on what you want to build. The energy can be useful for business, money, or concrete outcomes, as long as you keep your expectations realistic. One well-chosen goal may be more effective than chasing several at once."
   },
   {
    "headline": "Inner pressure",
    "body": "October may feel more serious, with added responsibility or a sense that you need to be disciplined. That can be productive if you pace yourself and avoid rushing through what needs care. A quieter, more inward approach may help you stay steady while the pressure builds."
   },
   {
    "headline": "A new shape",
    "body": "November may bring a meeting of forces that feels surprisingly cohesive, even if it also shifts your direction. The month can support growth through connection, agreement, or a new structure forming around you. If something changes form, you may benefit from seeing what it’s trying to make possible."
   },
   {
    "headline": "Gentle renewal",
    "body": "December may soften the pace again and invite learning, support, or recovery. It can be a good month for returning to people and practices that help you reset. If the year has felt full, this is a useful time to simplify and let your energy settle."
   },
   {
    "headline": "Wildcard opening",
    "body": "January may feel a little unpredictable, but not necessarily in a bad way. Small surprises or sudden openings could appear, especially if you stay willing to adapt. A flexible plan will probably serve you better than a rigid one."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: gather and sort",
    "body": "Watch for support, easier conversations, and a steadier learning pace. Try collecting ideas, building notes, and making one simple system for what you want to develop."
   },
   {
    "title": "May to July: refine your output",
    "body": "Notice where your energy starts going outward more strongly and where details need a second look. Choose one project or responsibility to shape carefully, and trim away anything that feels unnecessary."
   },
   {
    "title": "August to October: move, but measure",
    "body": "Pay attention to sudden turns, stronger ambition, and rising responsibility. Take action where needed, but keep one extra checkpoint in place so speed doesn’t outrun clarity."
   },
   {
    "title": "November to January: rebuild the rhythm",
    "body": "Look for moments of alignment, support, and renewal after the earlier push. Let yourself simplify, revisit your priorities, and choose one small practice that helps you enter the next cycle with more ease."
   }
  ],
  "closing": "2027 doesn’t ask you to become someone else; it asks you to use your own nature with more care. If you let your warmth be deliberate and your effort be focused, the year can feel less like a race and more like a well-tended path. Riley, there’s real value in moving steadily when the season itself is already asking you to give."
 },
 "casey": {
  "year": 2027,
  "title": "2027, tu ritmo se afina",
  "subtitle": "Un año de presión útil, avances medidos y apoyos que llegan a tiempo",
  "overview": "En 2027, Casey, tu energía central de metal encaja con un año de fuego: no es una combinación cómoda todo el tiempo, pero sí muy formativa. Se siente como una etapa de presión útil, donde conviene escoger bien el ritmo para que la exigencia no te disperse y, en cambio, te deje más firme. Como tu mapa ya muestra mucho madera y metal, con agua ausente, puede venirte bien cuidar los momentos de pausa, porque así lo que produces y lo que decides gana forma sin agotarte de más.\n\nLa imagen general de 2027 es la de un metal que se templa. Hay meses en los que das mucho hacia afuera, otros en los que avanzas con más control, y también tramos en los que el apoyo, el aprendizaje y la recuperación se vuelven más visibles. No parece un año para forzar todo al mismo tiempo, sino para ordenar prioridades, aceptar correcciones pequeñas y dejar que la confianza crezca con hechos concretos. Si eliges bien dónde poner energía, el año puede sentirse exigente, sí, pero también muy sólido.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso firme",
    "body": "En 2027, el dinero se mueve mejor cuando tú marcas el paso y no cuando intentas abarcarlo todo. Hay una franja del año en la que tu capacidad de producir, negociar y hacer rendir recursos se activa con más fuerza, sobre todo en abril y mayo; ahí conviene pensar en resultados concretos, pero sin apurarte por cerrar demasiado rápido. La combinación de mucho madera y metal en tu mapa sugiere que sabes construir y corregir, aunque el fuego del año te pide evitar el exceso de impulso.\n\nEn la vida diaria, esto puede verse en decisiones como revisar precios, ordenar ingresos y gastos, o dar forma a algo que ya venías preparando y que por fin empieza a mostrar valor. También puede aparecer una sensación de “si hago un poco más, llega más”, pero no todo esfuerzo rinde igual, así que te conviene distinguir entre movimiento útil y sobreesfuerzo. Casey, si notas que algo te entusiasma pero te deja sin margen, quizá sea momento de ajustar el tamaño del plan.\n\nEmpieza por una acción simple: elegir una meta económica concreta para cada trimestre y revisarla con calma al final del mes. Si mantienes el foco, 2027 favorece más la constancia que la prisa; y cuando ordenas bien tus recursos, el resultado suele sentirse más estable que espectacular, pero también más confiable."
   },
   "love": {
    "heading": "Vínculos que se afinan",
    "body": "En relaciones y amor, 2027 tiende a mostrarte con más claridad qué vínculos te nutren y cuáles te piden demasiado. Hay meses en los que tu energía sale hacia afuera con fuerza, y eso puede volver tus gestos más visibles, más generosos y también más intensos; por eso, la clave no parece ser “dar menos”, sino dar con mejor medida. Si sueles resolver rápido o tomar la iniciativa, este año te invita a escuchar un poco más antes de acelerar.\n\nEn lo cotidiano, puede haber conversaciones que empiezan por algo pequeño y terminan revelando necesidades más hondas, o encuentros que se sienten naturales, pero te obligan a ajustar expectativas. También puede haber momentos en que la cercanía crece porque alguien nota tu constancia, no porque hagas un gran gesto. Tu mezcla de metal y madera puede ayudarte a ser claro y sensible a la vez, siempre que no conviertas la franqueza en prisa.\n\nUna forma sencilla de cuidarlo es dejar espacio para preguntas abiertas y respuestas sin apuro. Si un vínculo se siente más fuerte cuando baja el ruido, ese dato vale mucho. Y si algo necesita más tiempo para tomar forma, 2027 favorece precisamente ese tipo de maduración tranquila."
   },
   "career": {
    "heading": "Trabajo con autoridad serena",
    "body": "En trabajo y carrera, 2027 se ve como un año de responsabilidad creciente, pero también de consolidación interna. El fuego del año te pide decidir, sostener y responder, y eso puede darte una presencia más firme si eliges bien tus batallas. No parece un periodo para improvisar sin red, sino para avanzar con criterio, revisar dos veces y construir confianza a partir de resultados visibles.\n\nEn la práctica, esto puede traer días con más presión de lo habitual, cambios de prioridad o tareas que exigen cabeza fría. A la vez, hay tramos en los que tu reputación puede crecer por la forma en que ordenas, resuelves y mantienes el rumbo, incluso cuando el entorno cambia. Si el trabajo se vuelve más demandante, no necesariamente significa que vas mal; a veces solo indica que tu capacidad de sostener más empieza a ser reconocida.\n\nTe conviene empezar por una lista corta: qué es urgente, qué es importante y qué puede esperar. Cuando trabajas así, 2027 favorece una autoridad tranquila, de esas que no necesitan ruido para notarse. Y si un día todo pide demasiado, volver al siguiente paso útil suele ser más valioso que intentar resolverlo todo de una vez."
   },
   "study": {
    "heading": "Aprender para ordenar",
    "body": "En aprendizaje, 2027 puede sentirse muy fértil si aceptas que no todo conocimiento entra por velocidad. Tu mapa muestra mucha madera y metal, una combinación que suele favorecer tanto la curiosidad como la capacidad de afinar criterios; por eso, estudiar en este año puede servirte no solo para saber más, sino para pensar mejor y decidir con más limpieza. La falta de agua sugiere que te conviene aprender también desde la pausa, dejando que las ideas reposen antes de darles forma final.\n\nEn la vida diaria, esto puede verse en lecturas que te abren una perspectiva nueva, en cursos o conversaciones que te ayudan a ordenar lo que ya intuías, o en momentos en que una duda se aclara justo cuando dejas de empujarla. Los meses de agosto y septiembre se ven especialmente buenos para recibir apoyo, integrar información y sentir que lo aprendido empieza a dar fruto. No necesitas convertir cada semana en una carrera; en 2027, el aprendizaje que se asienta despacio puede volverse el más útil.\n\nPrueba con una rutina pequeña y constante: un tema, un cuaderno o equipo, y un cierre breve al final de cada semana. Si anotas lo esencial con tus propias palabras, te resultará más fácil recuperar el hilo cuando el año se acelere. Ese tipo de orden suave puede darte mucha ventaja."
   },
   "health": {
    "heading": "Ritmo para cuidar el cuerpo y la mente",
    "body": "En 2027, el cuidado personal parece pedirte ritmo antes que intensidad. Como tu energía central de metal entra en contacto con un año de fuego, puede haber momentos en los que te sientas empujado a responder rápido, y ahí conviene recordar que tu fuerza crece más cuando no se dispersa. Con mucha madera en el mapa y agua ausente, descansar, hidratar tus pausas y bajar el ruido mental puede ayudarte a mantenerte más entero a lo largo del año.\n\nEn lo cotidiano, esto puede verse en días en los que todo parece pedirte decisión inmediata, mientras tu cuerpo y tu mente agradecen una transición más suave. También puede notarse en la diferencia entre un día bien organizado y otro en el que acumulas demasiadas cosas sin cerrar. 2027 favorece que escuches señales pequeñas: sueño irregular, tensión por exceso de tareas, o simple necesidad de silencio. No hace falta dramatizar nada; basta con afinar la atención.\n\nEmpieza con un gesto simple: reservar un espacio fijo para bajar revoluciones, aunque sean quince minutos, y protegerlo como si fuera una cita importante. Cuando el año se pone exigente, ese pequeño hábito puede sostener mucho más de lo que parece. Y si lo conviertes en parte de tu día, tu energía tendrá un lugar donde volver."
   }
  },
  "months": [
   {
    "headline": "Febrero que mueve",
    "body": "Empiezas el año con una sensación de giro y cambio de escena. Hay impulso para expresarte y dar más de ti, pero también una incomodidad útil que te saca de la inercia. Si algo se mueve de forma inesperada, puede abrir una dirección nueva."
   },
   {
    "headline": "Marzo sembrado",
    "body": "Marzo favorece lo que apenas empieza a tomar forma. Te conviene atender detalles pequeños y no pedirle velocidad a todo, porque lo nuevo crece mejor cuando lo dejas asentarse. Un pequeño contratiempo puede enseñarte dónde conviene ajustar."
   },
   {
    "headline": "Abril con mando",
    "body": "Abril te da más margen para tomar la iniciativa y empujar resultados. La sensación es de avance silencioso: menos ruido, más efecto. Si cuidas el exceso de ambición, puedes notar una satisfacción muy concreta al ver progreso real."
   },
   {
    "headline": "Mayo que se adhiere",
    "body": "Mayo mezcla empuje con unión, y eso puede volver más fácil que una idea, un acuerdo o una oportunidad se peguen a tu vida. El tema es cuidar recursos y no mezclarlo todo por entusiasmo. Lo que eliges con calma tiende a quedarse mejor."
   },
   {
    "headline": "Junio sensible",
    "body": "Junio trae más sensibilidad y una presión que se nota en el ambiente. Conviene responder sin acelerar de más, porque la fricción pequeña puede crecer si intentas resolverla todo en el mismo momento. Un paso claro y breve te deja mejor posicionado."
   },
   {
    "headline": "Julio firme",
    "body": "Julio fortalece tu confianza, aunque también puede traer sorpresas que te obliguen a ajustar el plan. Si mantienes la calma, lo imprevisto no te saca del centro; más bien te enseña a leer mejor el terreno. La clave está en no confundir rapidez con eficacia."
   },
   {
    "headline": "Agosto de apoyo",
    "body": "Agosto se siente como un mes que te devuelve aire. Puede llegar ayuda, aprendizaje o una recuperación muy práctica, y eso ayuda a que recuperes perspectiva. Lo que haces aquí no solo avanza: también empieza a dar fruto."
   },
   {
    "headline": "Septiembre pleno",
    "body": "Septiembre trae una sensación de plenitud y de buen encaje con lo que necesitas. Hay magnetismo en tus gestos y más facilidad para atraer atención útil o personas que suman. Si aprovechas el momento con sencillez, puedes notar que todo fluye con más naturalidad."
   },
   {
    "headline": "Octubre más lento",
    "body": "Octubre baja el ritmo y te devuelve a una cadencia conocida. No es un mes para forzar novedades, sino para moverte con lo familiar y dejar que el cuerpo del año descanse un poco. Lo esperado puede darte más estabilidad que emoción."
   },
   {
    "headline": "Noviembre cuidadoso",
    "body": "Noviembre pide más cuidado en las palabras y en los acuerdos. Puede haber malentendidos pequeños, así que conviene decir lo necesario con claridad y dejar menos espacio a suposiciones. Si escuchas con paciencia, el mes se vuelve mucho más amable."
   },
   {
    "headline": "Diciembre que ordena",
    "body": "Diciembre te empuja a ordenar lo acumulado y a decidir qué merece seguir contigo. Hay un tono de liderazgo tranquilo, como si tocaran cierres prácticos y una revisión honesta de lo hecho. Lo que organices ahora te deja mejor preparado para entrar en el siguiente tramo."
   },
   {
    "headline": "Enero de recogida",
    "body": "Enero invita a recoger energía y a reconocer lo que sí dio forma durante 2027. Puede llegar una sensación de cierre sereno, con señales de reconocimiento por tu constancia. Si miras el camino recorrido sin apurarte, verás con más claridad lo que quieres llevar adelante."
   }
  ],
  "action_plan": [
   {
    "title": "2 a 4 meses: encauzar el impulso",
    "body": "Observa cómo se mueve tu energía cuando aparecen cambios, tareas nuevas o ganas de hacer más de lo habitual. El mejor gesto aquí es elegir una sola prioridad por vez y convertirla en un avance visible, aunque sea pequeño."
   },
   {
    "title": "5 a 7 meses: sostener la presión",
    "body": "Fíjate en dónde el año te pide más responsabilidad y dónde conviene bajar un poco la velocidad para no desgastarte. Te ayudará definir límites simples: qué respondes hoy, qué revisas mañana y qué no hace falta resolver de inmediato."
   },
   {
    "title": "8 a 10 meses: recibir y afinar",
    "body": "Atiende las ayudas, aprendizajes y momentos de alivio que aparecen con más facilidad en este tramo. Es buen momento para mejorar un método, ordenar información y quedarte con lo que realmente te sirve."
   },
   {
    "title": "11 a 1 meses: cerrar y preparar",
    "body": "Mira qué conversaciones, tareas o compromisos conviene dejar bien acomodados antes de entrar al siguiente ciclo. Una acción útil es hacer una revisión breve de lo que funcionó, lo que no y lo que merece seguir."
   }
  ],
  "closing": "2027 no parece pedirte prisa, sino precisión. Si eliges bien el ritmo, lo que al inicio se siente exigente puede convertirse en una base mucho más sólida de la que imaginas.\n\nCasey, tómate este año como una oportunidad para templarte sin endurecerte. Lo valioso no será hacerlo todo, sino hacer bien lo esencial y dejar que el resto encuentre su lugar."
 }
};
