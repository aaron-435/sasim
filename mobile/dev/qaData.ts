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
 "jordan": {
  "content": {
   "title_line1": "You finish the work, but your mind keeps the ledger open.",
   "title_line2": "That is why rest keeps feeling unfinished.",
   "subtitle": "Burnout deep dive report — five elements × psychology × counseling, module 1",
   "opening_scene": "It is late enough that your body is asking for sleep, but your mind is still reading Monday morning messages as if they just arrived. You put the work down, then reach back for it again, checking one more thing and then one more after that. By the time you finally stop, the relief never quite lands, because the next round of checking is already waiting in your head. Jordan, does this feel like the kind of night your mind keeps trying to create?",
   "case_tag": "CASE — Evan, early 30s, a work rhythm that never fully clocks out",
   "case_paragraphs": [
    "Evan clears the last task on his list, then spends another twenty minutes reopening files and rereading the same lines. He tells himself it is only to be safe, but the real cost shows up later, when the crash hits all at once. His chart also leans heavily on Earth and Metal, with Wood left at zero, so the pressure to hold shape outruns the ease of growth. You can see yourself in that loop too."
   ],
   "oheng_intro": "Your Earth and Metal are both at 38 percent, while Wood sits at 0 percent. In a Burnout pattern, that often looks like holding, sorting, and refining so hard that there is little room left for fresh movement. The result is a workday that keeps its shape, but does not release you when the work is done.",
   "quiz_reading": "Your Perfectionism score sits at 82 percent, and your Recovery score sits at 34 percent. That combination explains why finishing something does not let your nervous system stand down; it sends you back to check, tighten, and polish instead. In a Burnout profile called Finisher's Drain, you are not short on effort — you are spending it faster than rest can replenish it.",
   "element_readings": {
    "wood": {
     "heading": "Wood at 0% — the branch that never got to stretch",
     "body": "Wood is missing here, so forward motion does not come easily on its own. That shows up in the way you keep circling back after a task is finished, as if starting the next step needs a bigger internal push than you naturally get. Water is the one element that can nourish Wood, and that makes quiet recovery matter more than another round of self-editing. When rest feels uneasy even on a day off, that is Wood asking for room to grow instead of another checkmark."
    },
    "fire": {
     "heading": "Fire at 13% — a brief flare that burns through the day",
     "body": "Fire is present, but only in a lighter amount, so your energy does not stay bright for long. It helps explain the Monday-morning jolt: a message comes in, the system lights up, and your whole pace shifts at once. Then, because the flame is not large enough to sustain itself, you crash after the push instead of easing out of it. That is not laziness; it is what short, sharp effort looks like when recovery is thin."
    },
    "earth": {
     "heading": "Earth at 38% — the weight that keeps everything in place",
     "body": "Earth is one of your strongest elements, and it shows in how hard you hold responsibility once you have it in your hands. You do not leave things half-finished, and even after the work is technically done, you keep weighing whether it is solid enough. In a Burnout pattern, that becomes the habit of cramming until the deadline and then sinking afterward. Earth gives you reliability, but right now it also makes it hard to set the load down."
    },
    "metal": {
     "heading": "Metal at 38% — the sharp edge that keeps checking",
     "body": "Metal is also strong, which fits the way you return to the same task and inspect it again. There is precision in that, and there is also strain, because precision becomes expensive when it never gets a stopping point. Monday morning messages hit this part of you hard, because they reactivate the part that wants to be certain before it can relax. Metal helps you refine, but here it also keeps the door to rest only half open."
    },
    "water": {
     "heading": "Water at 13% — the quiet reserve that should refill you",
     "body": "Water is present, but not in a way that naturally restores you for long. That matters because Water is the element that can feed Wood, and your chart needs that support more than another burst of force. Your body wants stillness, but your mind keeps treating stillness like a threat, so recovery never fully takes hold. The more you let yourself pause without immediately checking again, the more this part can start doing its real work."
    }
   },
   "upcoming_period_heading": "From age 31 to 40, a stronger Fire cycle arrives",
   "upcoming_period_body": "That coming period is likely to make your pace more visible. Fire brings momentum, urgency, and the sense that you want to act before the moment passes. For you, that can turn into clearer leadership and faster decisions, but only if you are not already running on empty. The best preparation now is to practice stopping before exhaustion makes the decision for you.",
   "cross_analysis_quotes": [
    "Your strong Earth and Metal show why perfectionism feels so automatic. You hold, sort, and recheck because those elements want things stable, exact, and complete. In a Burnout pattern, that becomes the habit of doing one more pass even after the work is already done.",
    "Your weak Wood helps explain why recovery feels uneasy. Wood needs room to move forward, and when it is low, rest can feel less like replenishment and more like a pause that should be filled immediately. That is why low recovery and a zero Wood reading point to the same inner pressure from two different angles."
   ],
   "answer_notes": [
    "Going back and rechecking everything shows that you trust precision more than relief. It means your confidence arrives after the work, not before it. You do not need to become careless; you need a point where enough is actually enough.",
    "Feeling uneasy even when you rest shows that your system has trouble recognizing pause as safety. On a day off, your mind still keeps a hand on the task list, which is why rest does not land cleanly. You are allowed to let quiet stay quiet without earning it first."
   ],
   "chat_snapshot_note": "You said you rest, but it never feels like resting, and that matches the tired, slightly anxious feeling you brought into the room. The work may be done, but your mind keeps checking anyway, so the body never gets the message that the shift is over. That is the line I would save for you: you are not failing to rest, you are being interrupted inside the rest.",
   "chat_trigger_note": "Monday morning messages hit you so hard because they do not just bring information; they switch your whole internal alarm back on. For a person with high perfectionism, that kind of message feels like a test you have not finished studying for. The moment the alert appears, your nervous system acts as if falling behind is already happening.",
   "chat_repeat_note": "The cramming-then-crashing cycle shows that you can push hard enough to get through, but not gently enough to stay steady. You choose speed when pressure rises, then pay for it when the pressure drops. A smaller step before the pile-up would change the shape of the whole day.",
   "chat_fear_note": "Your fear is not really about being busy. It is about what stopping might mean to you. Under that fear is a very plain wish: you want to keep your place without having to run yourself into the ground to prove it.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "Your scores point to a simple report-specific pattern: 82 percent perfectionism keeps you reaching for one more check, while 34 percent recovery leaves too little internal reset after the work is done. That is why completion does not feel like completion for you. The task ends on paper, but your attention keeps auditing it. In your case, the mismatch between those two scores is exactly what keeps rest from landing.",
   "psychology_takeaway": "If stopping feels risky, your system will keep treating rest like unfinished work. Your job is not to do less carelessly; it is to let completion count the first time.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not abandon a task halfway through. That is clear in the way you keep checking after the work is done, even when your energy is already thin. In a busy week, that makes you the person who notices what others miss and closes the loop."
    },
    {
     "title": "Standards",
     "body": "Your 82 percent perfectionism shows that you care about the quality of what leaves your hands. You are not satisfied with a quick finish if it leaves loose ends behind. That same standard is why Monday morning messages can hook you so fast."
    },
    {
     "title": "Endurance",
     "body": "You can push through a heavy stretch and still keep going until the work is complete. The cramming part of your pattern proves that you have stamina, even if it costs you later. The challenge is not effort; it is pacing."
    },
    {
     "title": "Responsibility",
     "body": "Earth at 38 percent shows up as a strong instinct to hold what is yours. You take the load seriously, and that is why unfinished work does not sit lightly with you. In practice, that means you often become the person who carries the last mile."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "You return to the same task because certainty feels safer than relief. That is why finished work can still keep you mentally occupied long after the screen is closed. The cost is that your attention never fully gets to come home."
    },
    {
     "title": "Poor recovery",
     "body": "Your recovery score of 34 percent explains why rest does not register as rest. Even on a day off, some part of you stays uneasy and ready to resume. That leaves you tired in a way that sleep alone does not fix."
    },
    {
     "title": "Crash pattern",
     "body": "You can hold it together through the push, then drop hard once the pressure lifts. The pattern is visible in your own words: cramming, then crashing. It is not a lack of discipline; it is a system that spends itself too fast."
    },
    {
     "title": "Fear of delay",
     "body": "You are afraid that if you stop, you will fall behind. That fear keeps you moving even when the better choice would be to pause. It also makes ordinary messages feel bigger than they are, because they seem to confirm the fear."
    }
   ],
   "fit_good": "You fit best in work that has clear finish lines and fewer surprise interruptions. A day with one main deliverable, a quiet block for deep focus, and a real stop time will suit you better than a stream of pings that keeps resetting your nervous system. You do best when the end of the workday can actually stay ended.",
   "fit_bad": "You struggle most when a Monday morning message opens the door to immediate rechecking. If the day starts with one alert that keeps pulling you back into the same file, your attention never gets a clean stop. You do better when the first message can be triaged once, then left alone.",
   "behavior_guides": [
    {
     "title": "One more pass",
     "body": "When you finish a task, wait ten minutes before reviewing it again. If it still needs attention after that, make only one more pass and stop there. Use a timer so the check has a boundary, not an open door."
    },
    {
     "title": "Hard stop",
     "body": "Pick one end time each workday and protect it for five days in a row. At that time, close the laptop, silence the inbox, and do not reopen work messages until the next scheduled block. This trains your system to recognize that stopping is allowed."
    },
    {
     "title": "Recovery block",
     "body": "Schedule twenty minutes after work with no output at all. No polishing, no planning, no extra reading. Let that time be plain recovery, because your 34 percent recovery score needs practice, not permission."
    },
    {
     "title": "Monday buffer",
     "body": "On Monday mornings, begin with fifteen minutes of inbox triage before answering anything. Sort messages into urgent, later, and done, then stop. That small buffer keeps one alert from taking over your whole day."
    }
   ],
   "mindset_guide": "Think of your day as a workbench, not a conveyor belt. A workbench lets you set something down, look at it, and then stop when the piece is finished. A conveyor belt keeps moving whether you are ready or not, and that is what exhausts you. You need more workbench and less belt so your effort can end where it should.",
   "closing_title": "When enough can stay enough",
   "closing_body": "You are not short on commitment. You are carrying too much of it past the point where your body can return the favor. The shift starts when you let one finished task stay finished, and that can begin today."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Burnout",
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
 "mia": {
  "content": {
   "title_line1": "You keep finishing the day before your mind does.",
   "title_line2": "Then Monday messages pull you back into the loop.",
   "subtitle": "Burnout deep dive — Saju x psychology x counseling integration",
   "opening_scene": "It is late, and your phone is still close enough to reach without thinking. You have already finished what needed finishing, but your mind goes back to check the edges again. The next morning, Monday messages land, and the whole tension snaps back on as if rest never happened. By the time you notice how tired you are, you are already bracing for the next round. Mia, isn't this what your recent nights have been looking like?",
   "case_tag": "CASE — Nora, early 30s, always rechecking work before she can let herself stop",
   "case_paragraphs": [
    "Nora clears her desk at night, then opens the same files again to make sure nothing was missed. She tells herself it will only take a minute, but the minute stretches until her shoulders are tight and the room feels smaller. Her Five Elements pattern is also weighted toward Wood, with Water running low, so her energy keeps pushing forward while recovery stays thin. You can hear your own rhythm in hers, can't you?"
   ],
   "oheng_intro": "Your Wood is the dominant element at 38%, and your Water sits at 13%. In a burnout pattern, that means the push to keep going is louder than the part that knows how to settle. So even when the work is done, the system can still feel like it is on alert.",
   "quiz_reading": "Your 82% Perfectionism shows up as the urge to go back and inspect what is already done. Your 34% Recovery means the break itself does not fully register as safe, so even a day off can feel unfinished. That is why the Finisher's Drain pattern looks like cramming hard, then crashing hard, with no clean landing in between.",
   "element_readings": {
    "wood": {
     "heading": "Wood overfull — always reaching for the next branch",
     "body": "Your Wood at 38% points to a strong forward pull in the chart. In burnout, that can look like finishing the task and then immediately looking for the flaw, the gap, or the part that could still be improved. When Monday messages arrive, that same forward pull can turn one more reply into a whole new round of mental momentum. You are not short on drive; you are living with a drive that has trouble stopping at the edge."
    },
    "fire": {
     "heading": "Fire moderate — bright enough to burn, not wide enough to warm for long",
     "body": "Your Fire at 13% is not absent, but it is not the element carrying the room. That matters in burnout, because you can still sprint when the pressure spikes, but the heat does not spread evenly across the day. The result is a quick flare of effort, then a sudden drop when the body finally collects the bill. You may look energized from the outside while feeling hollow by the time the work is done."
    },
    "earth": {
     "heading": "Earth moderate — enough structure to hold, not enough to fully soften the pace",
     "body": "Your Earth at 13% gives you some capacity to organize, contain, and make sense of what needs to be done. But in a burnout rhythm, that structure can become a container for overpacking rather than for resting. You cram the day full, then wonder why the evening still feels unstable. The shape is there, but it is being used to carry too much too fast."
    },
    "metal": {
     "heading": "Metal strong — sharp standards, clean boundaries, exacting eyes",
     "body": "Your Metal at 25% gives you a strong instinct for precision, and that shows up in the way you go back to check everything after finishing a task. In a burnout week, that sharpness can be useful at first, then turn into a second job of reviewing the first job. It is also the part of you that can notice what is off before anyone else does. But when it keeps running after the work is already done, it turns rest into another review cycle."
    },
    "water": {
     "heading": "Water low — the basin runs thin, so rest does not hold as long as work",
     "body": "Your Water at 13% is the weak point in the chart, and that shows up as a harder time letting recovery sink in. The only relationship that directly helps Water here is Metal supporting it, so your precision can help refill you only when it is used to protect rest instead of police it. That is why a day off can still feel uneasy, even when nothing is being asked of you. You are not failing to rest; your system is simply not holding the rest for long enough."
    }
   },
   "upcoming_period_heading": "From age 33 to 42, the Water years arrive",
   "upcoming_period_body": "That later stretch should feel less like constant pushing and more like learning how to keep what you have already built. With Water strengthening, the pace can become more sustainable, and emotional recovery may stop feeling like such a fragile afterthought. This is a good time to practice pausing before exhaustion does it for you. If you start now, you will be meeting that period with habits that know how to land.",
   "cross_analysis_quotes": [
    "Your 38% Wood and 82% Perfectionism are speaking the same language. Both keep you reaching past the finish line, as if the real safety comes only after one more check. That is why your mind stays awake even when the work is done.",
    "Your 13% Water and 34% Recovery explain the uneasy rest. The problem is not that you never stop; it is that stopping does not yet feel stable inside you. So the body sits down while the mind keeps standing guard."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you trust accuracy more than completion. In daily life, that can look like reopening a finished task just to quiet the doubt for a few more minutes. You are allowed to notice the urge without obeying it every time.",
    "Feeling uneasy even when you rest shows that your system reads stillness as unfinished business. That can turn a quiet day into a restless one, even when nothing urgent is happening. You do not need to earn the right to be at ease."
   ],
   "chat_snapshot_note": "You said you rest, but it never feels like resting. That sits right next to feeling tired and a little anxious, which tells me this is not simple laziness or a lack of effort. It is the strain of a mind that keeps checking even after the body has already sat down.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they reactivate the part of you that believes the pause was never fully safe. For a mind shaped by high perfectionism, a message on Monday can feel like proof that the work is already waiting again. Your system does not just read the message; it reads the pressure behind it.",
   "chat_repeat_note": "Cramming, then crashing means you are spending energy in one long burst instead of distributing it across the week. In that cycle, you push through until your reserves are thin, then the drop feels sudden and total. A smaller step before the pile-up can interrupt the pattern before it turns into collapse.",
   "chat_fear_note": "The fear of falling behind is really a fear of losing your place. Under that fear is a very understandable wish to stay steady, valued, and ahead enough to feel safe. You are not asking for less meaning; you are asking for a pace that does not punish you for stopping.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout research",
   "psychology_fact_body": "Perfectionism is often linked to setting standards so high that finishing does not end the inner evaluation. Recovery is the process by which stress leaves the system and the person feels restored rather than merely paused. When perfectionism stays high and recovery stays low, the mind can keep auditing the day long after the body has tried to rest. That is exactly the shape your results describe.",
   "psychology_takeaway": "You are not just tired; you are still checking. The work ends, but your mind keeps asking whether it was enough.",
   "strengths": [
    {
     "title": "Precision",
     "body": "Your 25% Metal gives you a sharp eye for what needs fixing, and that is why you notice the loose end before it grows into a bigger problem. In practice, that can look like reopening a task after dinner because one detail still feels unsteady. Used well, this keeps your work clean and your standards clear."
    },
    {
     "title": "Drive",
     "body": "Your 38% Wood keeps you moving even when the day is already full. That is the part of you that can power through a heavy Monday and still keep the next step in view. It is a real strength, as long as it is not asked to carry every hour by itself."
    },
    {
     "title": "Containment",
     "body": "Your 13% Earth gives you enough structure to hold a plan together when the pressure rises. That matters on days when the inbox starts stacking and you need a shape to work inside. Even if it is not effortless, you do have some ability to make order out of noise."
    },
    {
     "title": "Endurance",
     "body": "Your Water is only 13%, so it does not give you an easy reservoir to lean on. That matches the low 34% Recovery score and the way you said a day off still feels uneasy. What this shows is not a lack of effort, but a system that does not settle quickly after it has been asked to keep going."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "Your perfectionism makes it hard to let a finished task stay finished. That can turn one completed piece of work into another round of review, especially when you are already tired. The cost is not carelessness; it is the extra drain from never really exiting the task."
    },
    {
     "title": "Thin Recovery",
     "body": "Your low Water means rest does not settle in quickly. A day off can still feel slightly tense, as if something important is waiting just outside the frame. That makes recovery feel like a task instead of a release."
    },
    {
     "title": "Crash After Push",
     "body": "Your pattern of cramming, then crashing shows a body that can spend a lot in a short burst. You may look composed while the work is happening, then feel the drop all at once afterward. The swing itself is exhausting, even when the output is good."
    },
    {
     "title": "Monday Alarm",
     "body": "Monday-morning messages do more than interrupt your schedule; they restart your nervous system. That is why one notification can feel bigger than it should, especially when you were just beginning to rest. The alarm is not the message itself, but the pressure it carries for you."
    }
   ],
   "fit_good": "You do best in a relationship rhythm that does not demand instant replies every minute of the day. A partner who is calm about response times gives your mind room to stop scanning the phone and start actually being present. Shared routines that include clear start and stop points will feel safer than vague, always-on availability.",
   "fit_bad": "You will struggle in a relationship culture that treats constant checking as proof of care. If every pause gets interpreted as distance, your mind will never get to power down. A weekend that turns into repeated message monitoring will leave you more tired, not more connected.",
   "behavior_guides": [
    {
     "title": "Stop once",
     "body": "When you finish a task, set one 2-minute review and then close the file. Do it at the same time every day so your mind learns that checking has a boundary. After that, write down the next action instead of reopening the whole task."
    },
    {
     "title": "Protect rest",
     "body": "Choose one off-hour block, even 30 minutes, with notifications off and no reply window. Use that block for something that does not produce a result, like sitting outside or stretching. The point is to let rest be unproductive on purpose."
    },
    {
     "title": "Slow the Monday",
     "body": "On Monday mornings, read messages only after you have finished one grounding action, such as coffee, water, or a short walk. That creates a small buffer before the pressure gets in. You are teaching your system that a message is not the same as an emergency."
    },
    {
     "title": "Name the finish",
     "body": "At the end of the workday, say out loud that the task is done. Then write one sentence about what is complete and one sentence about what can wait. This gives your mind a clear ending instead of letting it keep searching for a loose thread."
    }
   ],
   "mindset_guide": "Think of your energy like a battery that keeps being charged and drained in the same hour. If you never let it rest at full stop, it starts to feel like the charger is part of the problem. You do not need to prove worth by staying plugged in all the time. You need a clean disconnection long enough for the system to recognize that nothing is chasing you.",
   "closing_title": "The work can end before the worry does",
   "closing_body": "You are already carrying enough by finishing what you finish and still caring this much about the result. The next step is not becoming less exact; it is letting your exactness stop before it eats the rest of your day. Keep the part of you that cares, but give it a door it can close."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Burnout",
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
 "riley": {
  "content": {
   "title_line1": "You keep finishing, but your mind never clocks out.",
   "title_line2": "The work ends before the checking does.",
   "subtitle": "Burnout deep dive report - saju x psychological test x counseling integration",
   "opening_scene": "It is late, and your phone lights up with Monday-morning messages before the week has even properly begun. You have already worked hard enough to feel tired, but your mind is still replaying what was done, what was missed, and what might need one more check. Even on the nights when you lie down, rest does not arrive cleanly; it comes with a hand still hovering over the screen. Riley, doesn't your recent life look exactly like this?",
   "case_tag": "CASE - Nora, early 30s, always double-checking after work",
   "case_paragraphs": [
    "Nora finishes her day late, then opens the same file again because she cannot trust the version she already closed. Her schedule looks full, but the real strain comes from the extra round of checking she does after everyone else has already logged off. Her Five Elements pattern also leans heavily toward wood with very little metal, so the urge to push ahead arrives faster than the sense of clean closure. You may recognize yourself in that same loop."
   ],
   "oheng_intro": "Your Five Elements spread is not evenly settled: wood is 50 percent, while metal is only 0 percent. In a burnout pattern, that often looks like pushing, deciding, and moving before there is any natural pause or clean boundary. The result is a mind that keeps going after the body has already started asking for a stop.",
   "quiz_reading": "Your score pattern is not subtle: perfectionism sits at 82 percent, while recovery stays at 34 percent. That is the shape of Finisher's Drain, where getting things done and letting yourself recover never seem to happen at the same speed. It shows up in your life as cramming hard, then crashing, with Monday-morning messages flipping the switch back on before you have fully come down.",
   "element_readings": {
    "wood": {
     "heading": "Wood - dominant, like a branch that keeps reaching",
     "body": "Wood at 50 percent is the part of you that keeps moving even when you are already tired. In your burnout pattern, that becomes the person who says, 'I'll just fix one more thing,' and then checks the work again after it is supposedly done. That same force is why Monday-morning messages can pull your nervous system back online so quickly. You do not lack drive; you have too much forward motion for your own recovery."
    },
    "fire": {
     "heading": "Fire - absent, like a lamp that never fully catches",
     "body": "Fire is at 0 percent, so the quick spark that helps a day feel warm and finished is not the part leading here. In your burnout pattern, that can look like working hard without the emotional reward that usually says, 'Enough for today.' You can keep pushing through the task, but the inner glow that makes rest feel real is hard to access. That is why even a break can still feel unfinished in your hands."
    },
    "earth": {
     "heading": "Earth - steady, but still waiting to be trusted",
     "body": "Earth sits at 25 percent, and it is the part of you that could hold things more slowly if you let it set the pace. Right now, though, it often gets recruited only after the rush is already over, when you are trying to patch yourself back together after a crash. Your upcoming 10-year cycle from age 46 to 55 may be a time when Earth grows stronger, which suggests a future period with more structure, steadier pacing, and less need to force every ending by sheer effort. If you start practicing cleaner stopping now, you will be ready to use that steadier ground when it arrives."
    },
    "metal": {
     "heading": "Metal - weak, like a boundary that has not been drawn yet",
     "body": "Metal is at 0 percent, and that shows up as a difficulty with clean edges, clean endings, and clean permission to stop. Earth can support Metal, so your steadiness has to come from slower structure rather than from pressure. In your burnout pattern, that is the difference between finishing a task and truly closing it. You keep re-checking because the line that says 'done' does not feel solid yet."
    },
    "water": {
     "heading": "Water - present, but used up by the end of the day",
     "body": "Water is at 25 percent, so there is some capacity for rest, reflection, and inward movement. But in your current pattern, that capacity gets drained by cramming until the crash arrives all at once. Water should soften the system, yet here it is often the part that feels tired and a little anxious after the work is over. That is why rest can happen on the outside without landing on the inside."
    }
   },
   "upcoming_period_heading": "From age 46 to 55, Earth gets louder",
   "upcoming_period_body": "From age 46 to 55, the stronger Earth period can make your days feel more organized and less frantic. That kind of timing often supports steadier pacing, better boundaries, and a clearer sense of when enough is enough. For you, the best preparation is to practice ending work without reopening it, so your system learns that closure can be safe. If you build that habit now, the later Earth period will feel less like pressure and more like support.",
   "cross_analysis_quotes": [
    "Your 50 percent wood and 82 percent perfectionism are speaking the same language. You keep reaching for one more correction because forward motion feels safer than leaving something imperfect. That is why the work gets finished, but your mind does not.",
    "Your 0 percent metal and 34 percent recovery also line up too neatly to ignore. When boundaries are thin, rest turns into a room you sit in without truly entering it. That is why even a day off can still feel uneasy."
   ],
   "answer_notes": [
    "Going back to check everything shows that your inner standard stays active after the task is already complete. In daily life, that can look like reopening a file, rereading a message, or mentally reviewing a conversation long after it ended. You are not careless; you are trying to feel safe through certainty.",
    "Feeling uneasy even when you rest shows that recovery does not automatically register as recovery for you. In practice, that can look like lying down while still scanning your phone or thinking about what should have been done instead. You are allowed to let rest count even before it feels perfect."
   ],
   "chat_snapshot_note": "You said you rest, but it never feels like resting, and that matches the tired, a little anxious feeling you named. The problem is not that you never stop; it is that stopping does not switch your mind off. That is why the fatigue feels mental as much as physical. Your quietest line is the one that says the most.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they do not just bring tasks; they restart the whole internal pressure system. For you, that kind of message acts like a trigger for perfectionism, and the body reacts before the week has even begun. It makes sense that your tension returns so fast when the signal arrives early and without warning. Your mind hears 'begin again' as 'catch up now.'",
   "chat_repeat_note": "You cram, then crash, and that pattern has a very specific rhythm. First you override your own limits, then the body collects the bill all at once. A smaller step would be to stop once before the finish line and leave one thing unpolished on purpose. That is not sloppiness; it is practice for recovery.",
   "chat_fear_note": "The fear that stopping will make you fall behind is not laziness in disguise. It is the fear of losing momentum in a life where momentum has become your proof that you are doing enough. Under that fear is a simple wish: you want to rest without feeling punished for it. That wish is already a good place to begin.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "In burnout research, perfectionism is often linked with overcontrol, self-criticism, and difficulty disengaging after work ends. Low recovery means the body and mind do not get enough time to reset between demands, so fatigue keeps accumulating instead of clearing out. Your pattern fits that combination closely: you keep checking because stopping does not yet feel metabolically or emotionally safe. The result is not just hard work, but hard work that never fully releases its grip.",
   "psychology_takeaway": "You are not bad at resting; your system has learned to treat stopping like a risk. Recovery gets easier when closure feels real.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half-built, and that shows up in the way you keep going until the task is truly complete. Even when you are tired, you still return to the work and make sure it holds. That is a real strength, especially when Monday-morning messages try to shake your focus."
    },
    {
     "title": "High standards",
     "body": "Your 82 percent perfectionism means you notice details most people would let slide. In daily life, that can look like re-checking one last time because you care about the result, not because you enjoy the stress. The same standard that drains you also explains why your work so often feels carefully made."
    },
    {
     "title": "Persistence",
     "body": "When pressure rises, you do not disappear; you push through, sometimes too hard, but still with real determination. That persistence is part of why the cramming phase happens at all. It means you have a strong engine, even if the brakes need help."
    },
    {
     "title": "Sensitivity to signals",
     "body": "You pick up on Monday-morning messages immediately, and your system reacts fast. That sensitivity can be exhausting, but it also means you are highly responsive to what is happening around you. With the right boundaries, that responsiveness could become an advantage instead of a drain."
    }
   ],
   "weaknesses": [
    {
     "title": "No off switch",
     "body": "Your mind keeps checking even after the work is done, so the ending does not feel like an ending. That can turn one finished task into several extra rounds of mental labor. The weakness is not effort; it is the inability to let completion stand on its own."
    },
    {
     "title": "Thin recovery",
     "body": "With recovery at 34 percent, rest does not restore you as fully as it should right now. You may sit down, but the inside of you still feels unfinished and alert. That is why a day off can still leave you uneasy."
    },
    {
     "title": "Crash cycle",
     "body": "You tend to cram first and pay for it later, which makes your energy feel uneven across the week. The hard part is that the crash arrives after you have already spent too much. The pattern is understandable, but it is also wearing you down."
    },
    {
     "title": "Fear of falling behind",
     "body": "The idea of stopping can feel dangerous because it sounds like losing ground. That fear keeps you moving, but it also keeps you from noticing when enough has already been done. The worry is real, yet it is not the same thing as a fact."
    }
   ],
   "fit_good": "You do better in a relationship rhythm that does not punish pauses, where messages do not have to be answered instantly to feel safe. A partner who respects your need to finish one thing before starting the next will help your system settle. Quiet evenings, clear plans, and less surprise pressure will let you stay present without feeling chased.",
   "fit_bad": "If a relationship runs on urgency, constant check-ins, or the expectation that you should always be available, your body may stay on alert longer than you want. Fast back-and-forth contact, last-minute demands, and emotional tests can make your rest feel even less like rest. In that kind of setting, your burnout pattern would have less room to cool down.",
   "behavior_guides": [
    {
     "title": "One final check",
     "body": "Pick one task each evening and allow yourself exactly one review before you close it. Do this at the same time every day, even if the urge to re-open it comes back later. The point is to teach your system that completion can survive without repeated proof."
    },
    {
     "title": "Protected pause",
     "body": "Set a 20-minute break after work where you do not answer Monday-morning-style messages or re-read old ones. Keep the phone face down and stay with one simple activity, like tea or a short walk. That small boundary gives your mind a place to land."
    },
    {
     "title": "Stop before collapse",
     "body": "Choose one point in the day where you stop while you still have a little energy left. Do it before you feel empty, not after. This helps break the cramming-then-crashing cycle by making stopping less dramatic."
    },
    {
     "title": "Closed-loop list",
     "body": "At the end of the day, write down the three things that are actually done. Read them once, then put the list away. This gives your brain evidence that the day has an ending, not just more room for checking."
    }
   ],
   "mindset_guide": "Think of your energy like a tab that keeps reopening itself. The goal is not to force more speed; it is to close the tab cleanly. Earth will help more than force here, because structure makes endings feel real. When rest feels unfinished, that is not a failure; it is just a sign that the closing ritual needs to be stronger.",
   "closing_title": "Let the day end",
   "closing_body": "You do not need to prove your care by checking forever. You need a way to let completion stay completed, even when your mind wants one more pass. The line worth keeping is this: done can be done, and you can still be safe."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Burnout",
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
 "sam": {
  "content": {
   "title_line1": "Your work gets finished,",
   "title_line2": "but your mind keeps the tab open.",
   "subtitle": "Burnout deep report — Five Elements x psych test x counseling integration, module Burnout",
   "opening_scene": "It is late, and your phone lights up again with Monday-morning messages before Monday has even arrived. You have already finished the work, but your hand still reaches for the screen as if one more check could quiet the ache. The thought in the room is simple and sharp: if you stop now, you might fall behind. Sam, isn't this what your nights have been looking like lately?",
   "case_tag": "CASE — Mina, early 30s, stuck in overchecking after the work is done",
   "case_paragraphs": [
    "Mina closes her laptop, then opens it again ten minutes later to re-read the same file. She is tired in a way that never fully turns into rest, and her Monday mornings start before sunrise because messages pull her back into the job in her head. Her Five Elements chart also leans heavily toward Wood, with Fire completely absent, so her effort keeps moving before warmth and ease can catch up. You would recognize yourself in her before the day is halfway through."
   ],
   "oheng_intro": "Your Five Elements chart is balanced at 25 percent each in Wood, Earth, Metal, and Water, but Fire is at 0 percent. That gap matters in a Burnout reading, because the module is not asking only how hard you work, but whether your effort ever turns into warmth, ease, and visible recovery. In your case, the structure is there, yet the spark that says 'enough for today' is missing.",
   "quiz_reading": "Your Burnout result is Finisher's Drain, and that name fits the pattern shown by your scores. Perfectionism is at 82 percent, while Recovery sits at 34 percent, so the part of you that checks and refines is much louder than the part that lets the day end. That is why finishing something does not feel like finishing it for you; it feels like the start of another round of inspection.",
   "element_readings": {
    "wood": {
     "heading": "Wood — strong, like a branch that keeps stretching",
     "body": "Your Wood is at 25 percent, and in your case it shows up as forward motion that does not like to stop. In Burnout, that can look like cramming hard, then pushing again even after you are already tired, because the next task feels more urgent than your own recovery. It also fits the way you keep going back to check after finishing, as if growth only counts when it is still moving. The problem is not that you lack drive; it is that your drive keeps outrunning your rest."
    },
    "fire": {
     "heading": "Fire — absent, like a room with the lights on but no warmth",
     "body": "Your Fire is at 0 percent, so the part of the system that normally softens effort and makes it feel alive has very little room here. In this Burnout pattern, that shows up as work being done without the feeling of completion, and rest happening without the feeling of rest. Wood is the only element here that naturally feeds Fire, and that matters because your chart leans on movement to create the warmth it is missing. When Monday-morning messages arrive, they do not just interrupt you; they switch the whole inner room back on before it has cooled."
    },
    "earth": {
     "heading": "Earth — steady, but asked to hold too much",
     "body": "Your Earth is at 25 percent, so there is enough steadiness in you to keep tasks organized and carried through. But in a week shaped by cramming and crashing, Earth gets turned into a holding tank for unfinished tension instead of a place to settle. That is why even on a day off, you can feel uneasy; the body is technically still, but the mind has not agreed to stay put. You are not short on structure — you are asking structure to do the work of recovery."
    },
    "metal": {
     "heading": "Metal — precise, and hard to put down",
     "body": "Your Metal is also at 25 percent, and it shows in the sharpness of your checking. After a task is finished, you do not simply move on; you go back and review, as if precision itself could protect you from falling behind. In Burnout, that can look efficient from the outside while quietly draining you on the inside. You are the kind of person who can notice one loose thread and spend an extra hour making sure it is tied off."
    },
    "water": {
     "heading": "Water — calm on the surface, but still listening",
     "body": "Your Water sits at 25 percent, and it gives you the capacity to sense risk before it becomes visible. That sensitivity is part of why the fear of stopping lands so strongly for you; you can already feel the drop that might follow if you let go too soon. In this Burnout pattern, Water does not look like laziness or drifting — it looks like vigilance that never fully powers down. Even when you are trying to rest, some part of you is still listening for the next message."
    }
   },
   "upcoming_period_heading": "From 40 to 49, Earth rises",
   "upcoming_period_body": "Your next 10-year cycle brings stronger Earth energy, and that usually favors steadier pacing, clearer boundaries, and a more grounded way of carrying responsibility. For you, that can become the first stretch where finishing something does not have to be followed by immediate rechecking. It will help to practice stopping on purpose now, so that when that steadier period arrives, your body is already familiar with not bracing for the next thing. The more you learn to let one task end cleanly, the easier it will be to use that future stability well.",
   "cross_analysis_quotes": [
    "Your Wood is the part of you that keeps moving, and your Perfectionism score shows exactly that same push. At 82 percent, your checking is not random; it is your forward drive turned inward on itself. That is why you can finish the work and still not feel finished.",
    "Your Wood keeps the process alive, but your low Recovery score shows what gets left behind. At 34 percent, rest does not yet have enough weight to hold the day closed. So the same energy that helps you get through the task also keeps you from fully stepping out of it."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you trust precision more than relief. It means your mind treats completion as a point for audit, not as a place to breathe. You are allowed to finish without reopening the file.",
    "Feeling uneasy even when you rest shows that your body has not yet learned to recognize stillness as safe. That is why a day off can feel strangely active inside, even when nothing is being asked of you. Start by letting rest be imperfect instead of trying to make it impressive.",
    "Even when the work is done, your mind keeps checking, and Monday-morning messages switch that tension back on. You push through, then crash all at once, and underneath sits the fear that stopping means falling behind. That answer shows a system that treats relief as risky, so even quiet time gets monitored. You are not weak for that; you are carrying a habit of vigilance that has become too heavy.",
    "Your fear is not about comfort; it is about momentum. The deeper wish is to stay in step with your own standards without having to pay for it with collapse. That is a real, understandable wish, and it can be worked with gently. You want to keep your place without living on the edge of a crash, and that is exactly the tension your pattern reveals.",
    "You do not need a bigger push. You need a cleaner ending to the day.",
    "When the workday is over, close the loop once and let the last check be the last check. Put a five-minute boundary around it, then stop touching the task and move to something physically different, like washing your hands or stepping outside. On a day off, let yourself rest before you feel fully ready, because recovery often starts earlier than comfort does.",
    "Set one fixed time for Monday-morning messages and do not open them outside that window. Your nervous system is reacting before the week even starts, so the boundary has to come before the feeling does. Keep it small and repeatable, not heroic.",
    "After finishing a task, write one sentence that says what is done, then leave the rest for tomorrow. That gives your checking mind a place to land without reopening everything. The goal is not to stop caring; it is to stop paying twice.",
    "Notice the moment right before you crash. That is usually the point where you have been running on effort alone for too long. Put a recovery break there on purpose, even if it is only ten minutes, so the crash does not have to do the scheduling for you."
   ],
   "chat_snapshot_note": "You said you rest, but it never feels like resting, and that lines up with the tired, slightly anxious state you brought into the room. The problem is not only fatigue; it is fatigue with your attention still stuck on the work. That is why even your quiet time feels watched.",
   "chat_trigger_note": "Monday-morning messages hit you hard because they do not feel like ordinary communication; they feel like the week grabbing you by the collar before you have even stood up. That trigger matches your low Recovery score, because your system does not get much time to settle before it is asked to move again. In a Burnout pattern, even one message can restart the whole inner alarm.",
   "chat_repeat_note": "Your cramming-then-crashing rhythm shows a very specific way of surviving pressure. You gather everything into one hard push, then your system demands the bill all at once. The smallest break you can make is to stop treating recovery as something you earn only after collapse.",
   "chat_fear_note": "The fear that stopping means falling behind is really a fear of losing your place. It makes sense that you keep moving if you believe the cost of pausing is being left out of the race. What you seem to want underneath that fear is not more speed, but enough safety to stop without panic.",
   "psychology_fact_heading": "Perfectionism and recovery balance",
   "psychology_fact_body": "In psychology, perfectionism often means setting standards so high that even success fails to feel complete. Recovery, by contrast, is the capacity to downshift after effort and let the system settle. When perfectionism stays high and recovery stays low, people often look productive while privately feeling unable to stand down, which fits your task-checking and your uneasy rest. Your scores show that the issue is not just working hard; it is having too little internal permission to stop.",
   "psychology_takeaway": "You are not failing to rest; you are failing to feel safe while resting. That can be learned, one clean ending at a time.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half done, and that matters in a career where details can slip. Your pattern of checking after completion shows how seriously you take the final result. The task may be finished, but you still care enough to make sure it is solid."
    },
    {
     "title": "Standards",
     "body": "An 82 percent perfectionism score means your standards are not casual. You can see flaws quickly, and that sharpness helps you catch what others miss. The same quality can wear you down, but it also means you know what good work looks like."
    },
    {
     "title": "Persistence",
     "body": "Your Wood at 25 percent gives you staying power, even when you are tired. That is the part of you that keeps going through Monday-morning messages and still gets the job done. You can carry a lot before anyone else notices the strain."
    },
    {
     "title": "Sensitivity",
     "body": "Your Water at 25 percent makes you alert to pressure before it fully shows. That is why the fear of falling behind lands so fast in you. You sense the cost early, which gives you a chance to change the pattern before it hardens."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "You keep returning to finished work because your mind does not fully accept the first close. That makes simple completion into another round of labor. The strain is not laziness; it is the cost of never trusting the first pass."
    },
    {
     "title": "Uneasy rest",
     "body": "Your Recovery score at 34 percent shows why downtime does not always register as downtime. Even on a day off, part of you stays on watch. That makes rest feel like a pause in motion, not a real release."
    },
    {
     "title": "Crash cycle",
     "body": "Cramming and then crashing is a costly way to stay on top of things. You can push hard enough to keep pace for a while, but the system collects the debt later. The result is not a lack of discipline; it is a rhythm that asks too much at once."
    },
    {
     "title": "Fear of delay",
     "body": "The thought that stopping means falling behind keeps your nervous system pressed forward. It makes every pause feel dangerous, even when the work is already done. That fear can keep you productive, but it can also keep you from recovering."
    }
   ],
   "fit_good": "You do best in a role where deadlines are clear, output is visible, and the end of a task is truly the end. A day with one focused block, one review window, and then a clean shutdown will suit you better than a stream of interruptions. You also need a team that respects off-hours, so Monday-morning messages do not become a nightly reflex.",
   "fit_bad": "You will struggle in a setting where messages keep arriving without boundaries and everything feels urgent all the time. A job that rewards constant availability will feed your checking habit and make rest feel suspicious. You should avoid days that end with open loops, because your mind will keep carrying them home.",
   "behavior_guides": [
    {
     "title": "One close",
     "body": "At the end of each workday, set a five-minute closing ritual. Use that time to check the final item once, write down what is done, and then stop. Do it every weekday, not only when you feel tired."
    },
    {
     "title": "Message window",
     "body": "Choose one fixed time in the morning to read Monday messages. Keep it to ten minutes, and do not reopen the thread later unless it is truly urgent. This gives your body a predictable start instead of a surprise alarm."
    },
    {
     "title": "Recovery block",
     "body": "On your next day off, schedule one hour that is not for productivity. Put your phone in another room, sit or walk, and do not turn the time into a task. The point is to let rest happen before you feel perfectly ready for it."
    },
    {
     "title": "Stop rule",
     "body": "When you catch yourself re-checking after finishing, count to twenty and leave the screen. Repeat that every time you want one more look. You are training the part of you that confuses extra effort with safety."
    }
   ],
   "mindset_guide": "Think of your energy like a desk that keeps filling with papers. If you never clear one stack before adding the next, everything starts to look urgent. Your Burnout pattern is asking you to file the work, not keep holding it in your hands. Let one task end so the next one has a place to land.",
   "closing_title": "Leave room for the finish",
   "closing_body": "You do not need to become less capable to feel better; you need your effort to have an ending. Your chart shows strong movement, and your test results show how easily that movement turns into strain when recovery is too low. The sentence to keep is this: finishing is not the same as staying on call."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Burnout",
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
 "casey": {
  "content": {
   "title_line1": "Tu mente no apaga el lunes.",
   "title_line2": "Y tu energía se va revisando lo que ya estaba terminado.",
   "subtitle": "Informe profundo de agotamiento — saju x psicología x acompañamiento integrado",
   "opening_scene": "A veces el día termina, pero tu cabeza sigue en la mesa de trabajo como si aún faltara una última revisión. Son las noches en que el cuerpo pide pausa, pero tú vuelves a abrir lo ya cerrado, como si una pequeña falla pudiera esconderse en el borde. Luego llega el lunes por la mañana y los mensajes vuelven a encender esa tensión desde el primer minuto. No es que no quieras descansar; es que el descanso no se siente como descanso. Casey, tus días recientes se parecen mucho a eso, ¿no es así?",
   "case_tag": "CASO — Martín, 30 y tantos, trabajo con presión constante",
   "case_paragraphs": [
    "Martín termina tareas a tiempo, pero después vuelve a revisarlas desde el principio y pierde la calma justo cuando parecía haber cerrado el día. En su mapa, madera y metal están muy altos, y el agua casi no aparece, así que su mente empuja mucho pero le cuesta soltar. En un lunes cualquiera, mira el teléfono, ve nuevos mensajes y siente que otra vez empieza la carrera. Tú también podrías reconocerte en ese bucle."
   ],
   "oheng_intro": "Tu madera en 38% y tu metal en 38% dominan el mapa, mientras el agua queda en 0%. En Agotamiento, esa mezcla se nota como una mente que empuja, corrige y vuelve a medir, pero que tarda en humedecerse por dentro. Por eso el trabajo termina y, aun así, la tensión sigue activa.",
   "quiz_reading": "Tu 82% en Perfeccionismo y tu 34% en Recuperación dibujan un patrón muy claro. Quien termina todo y se agota no solo hace mucho; también sigue por dentro cuando ya debería haber parado. En tu día a día eso se ve en una revisión que no se apaga y en un descanso que deja inquietud en lugar de alivio.",
   "element_readings": {
    "wood": {
     "heading": "madera alta — empujar hasta el borde",
     "body": "Tu madera está en 38%, y eso se siente como impulso que no se queda quieto ni cuando ya terminaste. En Agotamiento, esa fuerza te lleva a volver a revisar todo desde el principio, como si soltar fuera más difícil que seguir. El problema no es falta de capacidad; es que tu empuje no siempre sabe cuándo bajar el ritmo. Y cuando llega el lunes por la mañana, esa misma madera vuelve a activar la marcha antes de que tú hayas recuperado el cuerpo."
    },
    "fire": {
     "heading": "fuego medio — chispa breve",
     "body": "Tu fuego está en 13%, así que la intensidad aparece, pero no se sostiene mucho tiempo. En un día como el tuyo, eso puede sentirse como un arranque claro para resolver algo y luego una caída rápida cuando la revisión se alarga demasiado. No hay un incendio permanente; hay chispazos que se gastan pronto si el perfeccionismo toma el mando. Por eso a veces el cansancio llega antes de que notes que ya llevabas demasiada energía encendida."
    },
    "earth": {
     "heading": "tierra media — sostener el peso",
     "body": "Tu tierra está en 13%, y eso habla de una base que existe, pero que no alcanza para contener todo lo que te cargas. En tu caso, el descanso no cae como un suelo firme; se parece más a una pausa vigilada, siempre a punto de ser interrumpida por otra comprobación. Esa mezcla encaja con el patrón de acumular y luego derrumbarte, porque la tierra no está tomando todo el peso de la revisión. Cuando faltan apoyos internos, cada tarea cerrada sigue ocupando espacio mental."
    },
    "metal": {
     "heading": "metal alto — corregir sin parar",
     "body": "Tu metal también está en 38%, y eso se nota en la precisión con la que miras lo que ya hiciste. En Agotamiento, el metal alto puede volverse una voz que ordena, corrige y no deja pasar un detalle, justo como cuando vuelves a revisar todo desde el principio. Esa cualidad te ayuda a dejar las cosas bien hechas, pero también te deja más tiempo del necesario frente a la misma pantalla. El lunes por la mañana, los mensajes no solo llegan: también activan ese juez interno que no da por cerrado nada."
    },
    "water": {
     "heading": "agua ausente — no aflojar",
     "body": "Tu agua está en 0%, y eso vuelve muy difícil que el sistema baje de verdad. Aquí el agua no es una idea abstracta: es la parte que enfría, afloja y permite que el descanso se sienta como descanso. Como no está disponible, aparece inquietud incluso en un día libre, tal como marcaste en tu respuesta. La única vía que se describe aquí para nutrir ese vacío es el metal que alimenta al agua, así que la precisión de tu metal necesita volverse menos dura y más reparadora."
    }
   },
   "upcoming_period_heading": "De los 41 a los 50 años, el metal toma más fuerza",
   "upcoming_period_body": "Entre los 41 y los 50 años, tu metal tendrá más peso y eso puede volver más visible todo lo que hoy ya haces en silencio: ordenar, depurar, decidir con más nitidez. Si ahora tu mente revisa sin parar, en ese tramo puedes aprender a usar esa misma precisión para cerrar mejor, no para castigarte más. Conviene llegar a esa etapa con descansos que sí recuperen, porque así la claridad no vendrá acompañada de más desgaste. Lo que hoy se siente como presión puede convertirse después en criterio, si le das espacio al aire que ahora le falta a tu agua.",
   "cross_analysis_quotes": [
    "Tu 38% de madera no solo empuja; también aprieta la meta hasta que te deja sin margen. Eso se nota justo cuando quieres dejar algo bien hecho y terminas exigiéndote una vuelta más. En Agotamiento, ese impulso no te falta: te sobra hasta el punto de vaciarte.",
    "Eso encaja con tu 82% en Perfeccionismo. Terminas, pero tu mente no suelta el control y vuelve a empezar por dentro. Por eso el cierre te cuesta más que la tarea misma.",
    "Por eso el lunes por la mañana no te encuentra descansando. Te encuentra reactivando la misma exigencia que ya te había vaciado. Y mientras sigas entrando así al día, tu energía seguirá saliendo antes de tiempo."
   ],
   "answer_notes": [
    "Volver a revisar desde el principio muestra que confías mucho en la calidad de tu trabajo, pero menos en el cierre. En la práctica, eso te deja frente a una tarea terminada como si aún faltara una prueba final. A ti te sirve más aprender a reconocer cuándo ya está bien que seguir buscando el último ajuste.",
    "Sentir inquietud aunque descanses revela que tu cuerpo puede parar antes que tu mente. Por eso un día libre no siempre baja la carga, aunque por fuera parezca tranquilo. A ti te ayuda más un descanso con límites claros que una pausa vacía."
   ],
   "chat_snapshot_note": "Lo que llamas descanso, pero nunca se siente como descanso, muestra que tu problema no es solo el cansancio. También aparece una ansiedad pequeña, constante, que se cuela justo cuando el cuerpo debería aflojar. La frase que mejor te describe hoy es esta: tu cuerpo se detiene antes que tu cabeza.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te pegan tan fuerte porque llegan justo donde tu sistema ya está sensible. No solo interrumpen tu ritmo; también reactivan tu perfeccionismo y la sensación de que no puedes quedarte atrás si paras. Ahí se enciende la urgencia de responder, corregir y seguir.",
   "chat_repeat_note": "Primero acumulas mucha tensión y luego el cuerpo te cobra todo de golpe. En ese ciclo, tú sigues sosteniendo hasta que ya no queda margen para sostener nada. Un cambio pequeño sería cortar antes el circuito, aunque la sensación sea que todavía faltan cosas por revisar.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de debilidad; habla de cuánto valor le das a seguir siendo fiable. Debajo de ese miedo hay una necesidad muy clara de no perder el lugar que has construido con esfuerzo. Lo que pide atención no es más empuje, sino una forma de avanzar sin vaciarte.",
   "psychology_fact_heading": "Perfeccionismo y recuperación según el modelo de desajuste entre exigencia y descanso",
   "psychology_fact_body": "Tu respuesta de volver a revisarlo todo desde el principio muestra un perfeccionismo que no se conforma con terminar; necesita comprobar otra vez para poder cerrar. Cuando eso se combina con una recuperación baja, como tu 34%, el descanso no corta la activación y la mente sigue trabajando después de apagar la tarea. En tu patrón, esa distancia entre terminar y soltar es justo lo que convierte una revisión útil en un desgaste repetido. No hace falta ponerle una etiqueta clínica para ver que el problema no está en hacer menos, sino en no poder dejar de mirar lo hecho.",
   "psychology_takeaway": "Terminar no siempre significa soltar. En tu caso, aprender a cerrar también es una forma de cuidar tu energía.",
   "strengths": [
    {
     "title": "Precisión",
     "body": "Tu 38% de metal y tu 82% en Perfeccionismo muestran una capacidad real para detectar fallos antes de que se conviertan en problemas. Eso se ve cuando vuelves a revisar todo desde el principio y aun así mantienes el orden. Bien usada, esa precisión te hace fiable y muy difícil de descolocar."
    },
    {
     "title": "Empuje",
     "body": "Tu 38% de madera sostiene un ritmo que no se rinde a la primera. En el trabajo, eso se nota cuando acumulas y sigues tirando hasta terminar. Esa fuerza te permite avanzar incluso en semanas pesadas."
    },
    {
     "title": "Exigencia útil",
     "body": "Tu perfil no se conforma con salir del paso, y eso también tiene valor. Cuando el lunes por la mañana llega con mensajes nuevos, tú entiendes enseguida dónde está la fricción. Esa lectura rápida puede convertirse en criterio si no se vuelve castigo."
    },
    {
     "title": "Resistencia",
     "body": "Tu 34% en Recuperación muestra que la pausa todavía no alcanza para bajar del todo la activación. Eso explica por qué el descanso no termina de sentirse como descanso, aunque el cuerpo ya esté lejos de la tarea. Si esa recuperación gana espacio, tu energía podrá dejar de irse en cada revisión."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión",
     "body": "Volver a revisar todo desde el principio te roba más energía de la que parece. Un trabajo terminado sigue vivo en tu cabeza como si pidiera otra vuelta. Eso hace que el cierre llegue tarde y con gasto extra."
    },
    {
     "title": "Sobrecarga",
     "body": "Tu patrón de acumular y luego derrumbarte no aparece por azar. Primero sostienes demasiado y después el cuerpo pasa la factura de golpe. Ese vaivén te deja con menos margen justo cuando más lo necesitas."
    },
    {
     "title": "Inquietud",
     "body": "Sentir inquietud aunque descanses muestra que tu descanso todavía no consigue bajar el ruido interno. No es falta de voluntad; es que tu sistema sigue encendido. Por eso incluso un día libre puede parecer una tarea pendiente."
    },
    {
     "title": "Miedo a parar",
     "body": "Tu temor a quedarte atrás si paras hace que cualquier pausa se sienta arriesgada. Entonces sigues un poco más de lo necesario y pospones la recuperación. Ese miedo merece cuidado, no pelea."
    }
   ],
   "fit_good": "Te convienen entornos donde el trabajo tenga prioridades claras y cierres definidos. Un día con menos interrupciones y menos mensajes inesperados te ayuda a no reabrir todo una y otra vez. También te va mejor cuando puedes revisar una vez con calma y luego pasar de página sin sentir culpa.",
   "fit_bad": "Te desgastan los contextos donde todo cambia por mensajes constantes y urgencias de último minuto. Un día así te empuja a acumular tensión desde temprano y a perder el descanso antes de que empiece. También te hace caer en la revisión infinita, porque nunca sientes que el cierre sea suficiente.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Cuando termines una tarea, date solo una revisión final de diez minutos. Hazla en un momento fijo, no cada vez que vuelva la duda. Después cierra el archivo y, si hace falta volver sobre eso, déjalo para otro momento del día."
    },
    {
     "title": "Pausa real",
     "body": "En tu día libre, reserva dos bloques de veinte minutos sin mensajes ni trabajo. Durante ese tiempo, deja el teléfono lejos y no uses la pausa para repasar pendientes. Si aparece inquietud, puedes notarla sin pelear con ella y seguir con la pausa."
    },
    {
     "title": "Límite de lunes",
     "body": "Los lunes por la mañana, espera quince minutos antes de responder mensajes que te disparan. Usa ese margen para ordenar tres prioridades y no más. Así reduces el arranque automático que te vacía demasiado pronto."
    },
    {
     "title": "Bajada gradual",
     "body": "Al final del día, baja la intensidad en dos pasos: primero cierra tareas, luego cambia de actividad durante al menos media hora. No saltes directo del trabajo al intento de dormir. Esa transición corta ayuda a que tu cuerpo no tenga que caer de golpe."
    }
   ],
   "mindset_guide": "Piensa en tu energía como en una cuenta que no se repone sola por mirar el saldo. Si sigues retirando sin hacer depósitos, el perfeccionismo te deja en números rojos. Tu trabajo no mejora por exprimir cada minuto, mejora cuando sabes detenerte a tiempo. Descansar no es perder terreno; es evitar que el lunes te encuentre sin reserva.",
   "closing_title": "Lo que no se ve",
   "closing_body": "No te falta capacidad; te sobra tensión retenida. Y cuando aprendas a cerrar sin volver a abrir, tu energía va a dejar de irse en cada revisión. Lo más importante que puedes llevarte hoy es esta frase: terminar también significa permitirte descansar."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Agotamiento",
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
 },
 "jisoo": {
  "content": {
   "title_line1": "멈추지 못한 채 지치는 마음",
   "title_line2": "끝내는 힘보다 계속 점검하는 힘이 더 빨리 닳습니다",
   "subtitle": "번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침 메신저 알림이 울리면, 아직 커피도 다 식기 전에 머릿속이 먼저 바빠집니다. 이미 끝낸 일도 다시 처음부터 훑어보고, 손은 멈췄는데 생각은 끝나지 않습니다. 쉬는 날에도 마음이 편하지 않아서, 쉬고 있는 동안에도 뒤처질까 봐 불안해집니다. 지수님은 요즘 이런 모습이지 않으신가요.",
   "case_tag": "사례 — 민서, 30대 초반, 마감이 끝나도 마음이 남는 사람",
   "case_paragraphs": [
    "민서는 퇴근 후에도 노트북을 닫지 못하고, 방금 끝낸 일을 다시 처음부터 훑어보는 사람이었습니다. 회의가 끝나도 머릿속에서는 부족한 부분만 계속 크게 보였고, 쉬는 시간조차 온전히 쉬는 느낌이 들지 않았습니다. 사주에서 토 기운이 강하고 수 기운이 약한 흐름은 이런 식으로 버티는 힘은 크지만 풀어내는 힘이 늦게 오는 모습과 닮아 있습니다. 당신도 끝낸 뒤에야 더 지치는 편이라면, 그 사람의 하루가 낯설지 않을 것입니다."
   ],
   "oheng_intro": "토 기운이 50퍼센트로 가장 크고, 수 기운은 0퍼센트로 비어 있습니다. 이 분포는 번아웃에서 지수님이 느끼는 몰아서 버티기와 쉬어도 쉬는 것 같지 않음으로 이어집니다. 밀어붙이는 힘은 강한데, 긴장을 풀고 회복하는 흐름은 쉽게 붙지 않습니다.",
   "quiz_reading": "완벽주의가 82퍼센트로 높고 회복이 34퍼센트로 낮게 나온 조합은, 일을 끝내는 능력보다 끝난 뒤에도 놓지 못하는 힘이 더 크다는 뜻으로 읽힙니다. 완주형 소진이라는 이름이 붙은 것도 그래서입니다. 하루가 끝나도 머릿속에서는 검토가 계속되고, 쉬는 날에도 마음이 불편한 장면으로 그대로 이어집니다.",
   "element_readings": {
    "wood": {
     "heading": "목(木) 보통 — 멈추지 못하게 미는 줄기",
     "body": "목 기운은 33퍼센트라서, 밀어붙이는 힘이 아예 약한 편은 아닙니다. 그래서 지수님은 일이 쌓이면 먼저 방향을 잡고, 끝까지 해보려는 쪽으로 몸이 움직입니다. 다만 토가 더 크기 때문에, 이 추진력은 자주 부담을 안고 달립니다. 번아웃에서는 그 힘이 ‘조금만 더’라는 생각으로 이어져, 쉬는 순간까지 다음 일을 떠올리게 합니다."
    },
    "fire": {
     "heading": "화(火) 결핍 — 켜지지 못한 열",
     "body": "화 기운은 0퍼센트라서, 겉으로 드러나는 가벼운 회복감이나 즉시 풀리는 열기가 잘 붙지 않습니다. 그래서 월요일 아침 알림처럼 긴장을 다시 켜는 자극이 오면, 마음이 바로 달아오르기보다 먼저 굳어 버리기 쉽습니다. 번아웃 모듈에서는 이 비어 있는 화가, 쉬는 법보다 긴장을 유지하는 법을 먼저 익힌 사람의 표정으로 보입니다."
    },
    "earth": {
     "heading": "토(土) 과다 — 버티는 쪽으로만 쌓이는 무게",
     "body": "토 기운이 50퍼센트라서, 지수님은 쉽게 무너지지 않으려고 끝까지 버티는 쪽에 강합니다. 그래서 몰아서 하고 무너지는 패턴도, 사실은 중간에 내려놓기보다 끝까지 쌓아 두는 습관에서 나옵니다. 월요일 아침 메신저 알림이 들어오면 그 무게가 다시 올라오고, 머릿속 점검은 더 촘촘해집니다. 번아웃에서는 이 토가 ‘조금 쉬면 되지’가 아니라 ‘조금만 더 쌓자’로 작동해, 지친 뒤에도 계속 일을 붙들게 만듭니다."
    },
    "metal": {
     "heading": "금(金) 보통 — 끝난 뒤에도 남는 점검선",
     "body": "금 기운은 17퍼센트라서, 정리하고 확인하는 감각은 분명히 있습니다. 그래서 일을 끝낸 뒤에도 다시 처음부터 훑어보는 습관이 자연스럽게 붙습니다. 이건 허술함을 두려워하는 쪽으로도, 완성도를 챙기는 쪽으로도 읽힙니다. 번아웃에서는 이 금이 마지막 확인을 오래 붙잡아 두면서, 쉬는 시간까지 검토 모드로 끌고 갑니다."
    },
    "water": {
     "heading": "수(水) 결핍 — 식지 못한 마음",
     "body": "수 기운은 0퍼센트라서, 마음을 식히고 흘려보내는 힘이 거의 비어 있습니다. 그래서 쉬는 날에도 마음이 불편하고, 쉬어도 쉬는 것 같지 않은 감각이 남습니다. 금생수의 흐름이 회복에 도움이 될 수 있습니다. 지수님에게는 확인하고 정리하는 습관이 결국 마음을 식히는 쪽으로 이어질 때, 비로소 회복이 시작됩니다."
    }
   },
   "upcoming_period_heading": "36세부터 45세, 물의 계절이 옵니다",
   "upcoming_period_body": "36세부터 45세까지는 수 기운이 강해지면서, 지금보다 마음을 식히고 흐름을 조절하는 감각이 자연스럽게 살아날 수 있습니다. 지금까지는 몰아서 버티는 힘이 앞섰다면, 그 시기에는 속도를 조절하는 선택이 더 큰 힘이 됩니다. 그래서 미리 해두면 좋은 것은 일의 기준을 더 촘촘히 잡는 것보다, 멈췄을 때도 불안이 덜한 구조를 익히는 일입니다. 지금부터는 끝내는 습관만큼, 다시 쉬는 습관을 함께 연습해 두는 편이 좋습니다.",
   "cross_analysis_quotes": [
    "토가 50퍼센트인 사람은, 버티는 힘이 강한 만큼 멈추는 순간도 어렵습니다. 완벽주의 82퍼센트는 그 무게를 더 단단하게 만들고, 끝난 뒤에도 머릿속 점검을 멈추지 못하게 합니다. 그래서 지수님은 쉬는 시간보다 확인하는 시간이 더 익숙한 하루를 살고 있습니다.",
    "수 기운이 0퍼센트라는 건, 회복을 자연스럽게 끌어오는 힘이 약하다는 뜻으로 읽힙니다. 회복이 34퍼센트로 낮게 나온 결과와 겹치면, 쉬는 날에도 마음이 편하지 않은 이유가 분명해집니다. 몸은 멈췄는데 마음은 계속 일을 하고 있는 셈입니다."
   ],
   "answer_notes": [
    "일을 끝낸 뒤에도 다시 훑어보는 선택은, 결과보다 과정의 빈틈에 더 민감하다는 뜻입니다. 그래서 지수님은 마감이 끝나도 안심보다 재확인을 먼저 떠올립니다. 완벽주의가 높은 사람에게는 이 습관이 실수 방지이면서 동시에 소진의 시작점이 되기도 합니다.",
    "쉬는 날에도 마음이 불편하다는 답은, 휴식 자체를 싫어한다기보다 쉬는 동안 놓치는 것이 생길까 봐 긴장한다는 뜻입니다. 그래서 몸은 쉬어도 머리는 계속 일정을 훑고, 편안함보다 경계심이 먼저 앞섭니다. 회복이 낮은 사람에게는 이런 불편함을 줄이는 작은 정지 연습이 필요합니다."
   ],
   "chat_snapshot_note": "지수님이 실제로 꺼낸 핵심 고민은 쉬어도 쉬는 것 같지 않다는 감각입니다. 그 말은 단순한 피곤함보다, 쉬는 동안에도 마음이 완전히 내려오지 않는 불안과 붙어 있습니다. 지쳤고 조금 불안한 상태에서 나온 말이라서, 이 고민은 몸의 피로와 마음의 긴장을 함께 보여 줍니다.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 그냥 알림이 아니라, 다시 긴장을 켜는 스위치처럼 작동합니다. 완벽주의가 높은 사람에게 이런 자극은 아직 끝나지 않은 일처럼 느껴지기 쉽습니다. 토 기운이 강한 흐름에서는 한 번 올라간 긴장을 쉽게 내려놓지 못해서, 작은 알림도 크게 남습니다.",
   "chat_repeat_note": "몰아서 하고 무너지는 패턴은, 버티는 힘이 먼저 앞서고 회복이 뒤따라오는 순서에서 생깁니다. 그래서 지수님은 힘이 남을 때는 끝까지 밀어붙이고, 한 번 무너지면 그제야 멈춥니다. 중간에 숨을 고르는 시간을 미리 넣는 것이 이 패턴을 조금 비켜 가는 첫걸음입니다.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 말은, 경쟁심보다 불안이 더 앞에 있다는 뜻입니다. 멈추는 순간 손해를 보는 사람처럼 느끼기 때문에, 쉬는 시간도 쉽게 죄책감으로 바뀝니다. 사실 그 아래에는 뒤처지지 않으려는 욕심보다, 지금의 자리를 지키고 싶은 마음이 더 크게 있습니다.",
   "psychology_fact_heading": "완벽주의와 소진",
   "psychology_fact_body": "완벽주의는 기준을 높게 세우고, 그 기준에서 벗어날 가능성을 오래 붙들게 만듭니다. 그래서 일은 끝나도 마음은 끝나지 않고, 검토와 재확인이 반복되기 쉽습니다. 여기에 회복이 낮으면, 쉬는 시간이 회복보다 불안으로 느껴질 수 있습니다. 지수님의 결과는 바로 그 조합을 보여 줍니다.",
   "psychology_takeaway": "끝낸 뒤에도 못 놓는 마음이, 지수를 더 빨리 지치게 합니다. 쉬는 연습은 게으름이 아니라 회복의 기술입니다.",
   "strengths": [
    {
     "title": "완주력",
     "body": "지수님은 일을 시작하면 끝까지 가져가는 힘이 분명합니다. 월요일 아침 알림이 와도 바로 손을 놓기보다, 해야 할 일을 다시 정리하고 이어 가는 쪽에 가깝습니다. 이 힘 덕분에 중간에 흐트러지기 쉬운 일도 결국 마무리까지 끌고 갑니다."
    },
    {
     "title": "정리감",
     "body": "일을 끝낸 뒤 다시 처음부터 훑어보는 습관은, 결과를 허투루 넘기지 않는 태도입니다. 회의나 마감 뒤에도 확인할 부분을 찾는 덕분에 빈틈이 적어집니다. 다만 그 꼼꼼함이 지나치면 쉬는 시간까지 점검이 이어질 수 있습니다."
    },
    {
     "title": "버팀목",
     "body": "토 기운이 50퍼센트인 사람은 쉽게 무너지지 않으려는 힘이 큽니다. 지수님도 몰아서 하고 버티는 쪽으로 하루를 끌고 가는 편입니다. 그래서 겉으로는 버틸 수 있지만, 안에서는 피로가 더 늦게 드러날 수 있습니다."
    },
    {
     "title": "신호감지",
     "body": "메신저 알림 하나에도 바로 긴장을 알아차리는 감각이 있습니다. 이건 예민함이 아니라, 해야 할 일을 빠르게 포착하는 능력으로도 읽힙니다. 다만 그 신호를 너무 빨리 받으면 몸이 쉴 틈을 놓치기 쉽습니다."
    }
   ],
   "weaknesses": [
    {
     "title": "재점검",
     "body": "끝난 일을 다시 훑는 습관은 안심을 얻기보다 긴장을 연장시키기 쉽습니다. 지수님은 이미 끝난 뒤에도 머릿속에서 검토를 멈추지 못합니다. 그래서 하루가 지나도 마음은 아직 마감 전처럼 남아 있습니다."
    },
    {
     "title": "휴식불편",
     "body": "쉬는 날에도 마음이 불편하다는 건, 몸의 멈춤과 마음의 멈춤이 따로 놀고 있다는 뜻입니다. 지수님은 쉬고 있어도 제대로 쉬고 있다는 감각을 얻기 어렵습니다. 이 불편함이 쌓이면 휴식이 회복이 아니라 또 다른 과제가 됩니다."
    },
    {
     "title": "과부하",
     "body": "몰아서 하고 무너지는 패턴은 한 번에 많은 것을 견디려는 방식에서 생깁니다. 지수님은 중간 조절보다 끝까지 버티는 쪽을 택하기 쉽습니다. 그래서 어느 순간에는 버틴 양만큼 크게 지칠 수 있습니다."
    },
    {
     "title": "불안기동",
     "body": "뒤처질까 봐 멈출 수 없다는 마음은, 쉬는 시간까지 계속 앞으로만 밀어붙이게 만듭니다. 지수님은 불안이 올라오면 속도를 줄이기보다 더 붙잡는 쪽으로 움직입니다. 그 결과 마음은 잠깐도 제자리에 머물지 못합니다."
    }
   ],
   "fit_good": "하루의 시작과 끝이 비교적 분명한 환경이 잘 맞습니다. 일이 끝나면 다음 날로 넘길 수 있는 구조가 있어야, 지수님은 밤까지 검토를 끌고 가지 않습니다. 월요일 아침 알림처럼 갑작스러운 자극이 적고, 마감 기준이 분명한 자리에서 힘이 더 안정적으로 쓰입니다.",
   "fit_bad": "하루 종일 메시지가 끊기지 않고, 끝난 일도 계속 다시 확인해야 하는 환경은 지수님을 빨리 소진시킵니다. 쉬는 시간이 있어도 마음이 편하지 않으니, 늘 대기 상태로 있는 일은 부담이 큽니다. 몰아서 처리한 뒤 바로 다음 일을 붙이는 흐름은, 현재의 소진 패턴을 더 또렷하게 드러내기 쉽습니다.",
   "behavior_guides": [
    {
     "title": "종료의식",
     "body": "일이 끝났을 때 바로 책상을 비우는 동작을 하나 정해 두세요. 퇴근 전 5분 동안 오늘 한 일과 내일 할 일을 딱 한 번만 적고, 그 뒤에는 화면을 닫는 순서를 고정하면 좋습니다. 이 작은 종료 동작이 머릿속 재점검을 줄이는 첫 장치가 됩니다."
    },
    {
     "title": "쉬는단위",
     "body": "쉬는 날에는 큰 휴식보다 짧은 휴식을 여러 번 넣어 보세요. 오전, 오후, 저녁에 각각 10분씩만 완전히 손을 놓는 시간을 두면 마음이 덜 불편합니다. 한 번에 오래 쉬려 하기보다, 자주 쉬는 방식이 지수님에게 더 잘 맞습니다."
    },
    {
     "title": "알림차단",
     "body": "월요일 아침처럼 긴장을 여는 시간에는 알림을 바로 보지 않는 규칙을 두는 것이 좋습니다. 출근 후 15분은 메신저를 열지 않고, 먼저 오늘의 우선순위만 적어 두세요. 알림이 일을 시작시키는 구조를 조금 늦추면 불안도 같이 늦춰집니다."
    },
    {
     "title": "재확인멈춤",
     "body": "일을 끝낸 뒤 다시 훑고 싶어질 때는, 두 번째 점검은 하지 않겠다고 미리 정해 두세요. 대신 첫 점검에서 놓친 것이 있으면 다음 날 아침 한 번만 확인하는 식으로 시간을 미룹니다. 재확인의 횟수를 줄이는 것이 지수님에게는 회복의 연습이 됩니다."
    }
   ],
   "mindset_guide": "지금 지수님에게 필요한 건 더 세게 달리는 힘이 아니라, 멈춰도 무너지지 않는 구조입니다. 번아웃은 엔진이 약해서가 아니라, 계속 밟은 뒤에 식힐 틈이 없을 때 더 크게 옵니다. 월요일 알림이 울려도 바로 뛰지 말고, 시동을 천천히 거는 쪽이 오래 갑니다. 쉬는 것은 멈춤이 아니라 다음 일을 견디게 하는 냉각입니다.",
   "closing_title": "멈춤도 기술입니다",
   "closing_body": "지수님은 이미 끝까지 해내는 힘을 갖고 있습니다. 이제는 그 힘을 다 쓰고 무너지기보다, 중간에 식히는 법을 익히면 됩니다. 오늘 가장 저장할 문장은 이겁니다. 쉬는 연습이 있어야, 끝내는 힘도 오래 갑니다."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "번아웃",
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
   "title_line1": "Termina todo,",
   "title_line2": "y su energía termina antes que el día.",
   "subtitle": "Informe profundo de Agotamiento, módulo 1 — saju × psicología × acompañamiento integrado",
   "opening_scene": "Es casi lunes por la mañana y el teléfono vuelve a encenderse antes que tú. Lees los mensajes con la mano todavía quieta, pero la cabeza ya está repasando lo que falta, lo que podría fallar y lo que no conviene dejar para después. Aunque descanses, el descanso no termina de sentirse como descanso; se queda a medio camino, como si tu mente siguiera de guardia. Lucía, tus días últimamente se ven así, ¿no es cierto?",
   "case_tag": "CASO — Martina, treintañera, termina todo pero no logra soltarlo",
   "case_paragraphs": [
    "Martina revisa un informe por tercera vez cuando ya debería estar cerrando la computadora. Afuera, el día avanza, pero ella sigue midiendo si quedó algo mal antes de responder el siguiente mensaje. Su tierra domina demasiado y su metal casi no aparece, así que le cuesta poner un borde claro entre terminar y seguir cargando. Tú también podrías reconocerte en esa forma de no soltar del todo."
   ],
   "oheng_intro": "Tu tierra está en 38% y domina el mapa, mientras el metal queda en 0%; no es un detalle menor, es la forma en que sostienes y luego te cuesta poner límite. En Agotamiento, eso se nota como alguien que aguanta mucho, ordena mucho y luego se vacía de golpe. El fuego y el agua, ambos en 25%, le ponen intensidad y sensibilidad a ese esfuerzo, así que la tensión no se queda quieta, se enciende. Lo que parece solo cansancio también trae la sensación de estar siempre a un paso de volver a revisar.",
   "quiz_reading": "Tu perfeccionismo está en 82% y tu recuperación en 34%, y esa combinación no deja mucho espacio para apagar el impulso. No solo terminas las cosas; también las vuelves a abrir por dentro, como si el cierre nunca fuera suficiente. Por eso un día libre puede seguir sintiéndose tenso, incluso cuando el cuerpo ya se detuvo.",
   "element_readings": {
    "wood": {
     "heading": "madera baja — el impulso que no encuentra espacio",
     "body": "Tu madera está en 13%, y eso se nota menos como falta de deseo que como un arranque que no termina de abrir camino. En Agotamiento, quieres avanzar, pero la revisión constante te devuelve al inicio antes de que la idea respire. Esa poca madera hace que el movimiento dependa demasiado de la presión del momento, no de un ritmo que se sostenga solo. Y cuando el lunes trae mensajes nuevos, tú notas enseguida cuánto cuesta empezar sin mirar atrás."
    },
    "fire": {
     "heading": "fuego alto — la chispa que se gasta rápido",
     "body": "Tu fuego está en 25%, y en este módulo se ve como una energía que se enciende con facilidad cuando llegan los mensajes del lunes por la mañana. No te falta intensidad; te falta margen para que esa intensidad no se consuma en una sola pasada. Por eso puedes acumular durante días y luego derrumbarte de golpe, como si la llama hubiera trabajado sin pausa. El problema no es sentir mucho, sino que tu impulso no siempre alcanza a descansar entre una exigencia y la siguiente."
    },
    "earth": {
     "heading": "tierra dominante — sostener hasta el borde",
     "body": "Tu tierra está en 38%, y esa es la base que hace que no dejes nada a medias. En el tema de agotamiento, eso se ve en tu necesidad de cerrar, revisar y dejar todo en orden antes de soltarte. La tierra te da sostén, pero también te deja pegado a lo que todavía consideras pendiente. Por eso terminar una tarea no siempre te alivia; a veces solo abre otra vuelta de control."
    },
    "metal": {
     "heading": "metal ausente — el límite que no entra solo",
     "body": "Tu metal está en 0%, y esa ausencia se siente justo donde más lo necesitas: en el borde que separa hacer de seguir cargando. La única relación que lo puede nutrir aquí viene de la tierra que alimenta al metal, así que tu sostén no nace del corte, sino de aprender a ordenar mejor lo que ya estás sosteniendo. En Agotamiento, eso explica por qué descansar no siempre se traduce en recuperación. Sin ese límite claro, tu mente vuelve a revisar aunque el día ya terminó."
    },
    "water": {
     "heading": "agua media — la inquietud que sigue corriendo",
     "body": "Tu agua está en 25%, y no baja la guardia aunque el cuerpo quiera parar. En este módulo, eso aparece como la inquietud que sientes incluso en un día libre. El agua mantiene la alerta viva, y por eso el descanso puede sentirse incompleto, como si algo siguiera moviéndose debajo de la superficie. No es que no sepas parar; es que tu interior no se convence de que parar sea seguro."
    }
   },
   "upcoming_period_heading": "De los 38 a los 47 años, llega un ciclo de diez años con más fuego",
   "upcoming_period_body": "Ese tramo puede traerte más visibilidad, más iniciativa y también una demanda mayor de responder con rapidez. Si hoy ya tiendes a revisar todo dos veces, conviene cuidar que ese impulso no te quite margen para cerrar con calma. Lo más útil será practicar cierres claros, porque lo que no se cierra a tiempo te roba energía antes de que el ciclo se acelere. Si aprendes a apagar una cosa antes de encender la siguiente, ese periodo puede darte avance sin dejarte tan expuesto al desgaste.",
   "cross_analysis_quotes": [
    "Tu tierra manda, y tu perfeccionismo le sigue el paso. Lo que sostienes con tanta firmeza luego te cuesta soltarlo, y por eso terminas una tarea para volver a mirarla desde el principio. Esa combinación no te deja descansar del todo, porque el cierre llega, pero la mente sigue buscando una última revisión.",
    "No es casual que el metal esté en 0% mientras tu recuperación está en 34%. Cuando falta límite, el descanso no entra limpio y la inquietud sigue encendida aunque el cuerpo ya se haya detenido. Eso explica por qué un día libre puede sentirse como una pausa con la puerta entreabierta, no como una salida real."
   ],
   "answer_notes": [
    "Volver a revisar desde el principio muestra que confías más en corregir que en cerrar. En tu día a día, eso se nota cuando una tarea ya entregada sigue ocupando espacio mental como si siguiera abierta. A ti te conviene recordar que terminar no siempre exige una segunda pasada.",
    "Sentir inquietud aunque descanses revela que tu descanso todavía está demasiado vigilado. En la práctica, eso puede aparecer en un día libre en el que no haces mucho, pero tampoco logras aflojar del todo. A ti te ayuda más una pausa con borde claro que una pausa larga pero difusa."
   ],
   "chat_snapshot_note": "Tu duda sobre descansar, pero no sentirlo como descanso, está pegada a un cansancio real y también a un poco de ansiedad. No estás describiendo solo fatiga; estás describiendo una mente que no acepta fácilmente bajar la guardia. Esa mezcla explica por qué el alivio te cuesta entrar aunque el trabajo ya haya terminado.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te tocan tan fuerte porque reactivan de inmediato la alerta de tu fuego y tu agua. No hace falta que sean mensajes difíciles para que el cuerpo entienda que otra vez toca responder, revisar y sostener. Para ti, ese momento no es solo una notificación; es la señal de que el día ya empezó a pedir más.",
   "chat_repeat_note": "Acumular y luego derrumbarte muestra que aguantas mucho tiempo en silencio antes de soltar de golpe. En ese patrón, tú sigues sumando exigencias hasta que la energía ya no da más. Un corte pequeño antes del colapso, como parar diez minutos antes de seguir, puede cambiar el final del día.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de debilidad, sino de cuánto valor le das a no perder el ritmo. Debajo de ese miedo hay una necesidad muy clara de seguir siendo fiable, de no fallar justo cuando más importa. Lo que buscas no es correr más; es sentir que detenerte un momento no te borra del camino.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "En psicología, el perfeccionismo alto suele ir de la mano con una vigilancia constante sobre el propio resultado. Cuando además la recuperación es baja, el cuerpo y la mente tardan más en registrar que la tarea ya terminó. En tu caso, eso ayuda a entender por qué el cierre no se siente como cierre y por qué el descanso no llega limpio. No es solo exigencia; es dificultad para salir del modo de revisión.",
   "psychology_takeaway": "Terminar no es lo mismo que soltar. En ti, la recuperación necesita un borde claro para que el día no siga abierto por dentro.",
   "strengths": [
    {
     "title": "Constancia",
     "body": "Tu tierra en 38% te da una capacidad real para sostener lo que otros dejarían a medias. Eso se ve cuando sigues con una tarea aunque ya estés sin energía y aun así buscas dejarla bien hecha. Esa misma fuerza es valiosa, siempre que no te obligue a cargar más de la cuenta."
    },
    {
     "title": "Detalle",
     "body": "Tu perfeccionismo de 82% hace que notes fallos que otros pasan por alto. En la práctica, eso puede ser útil cuando revisas un trabajo y detectas lo que todavía no encaja. El punto es que tu ojo fino no se convierta en una puerta giratoria que nunca deja salir el cierre."
    },
    {
     "title": "Resistencia",
     "body": "Aguantas mucho antes de derrumbarte, y eso habla de una resistencia que no es pequeña. Se nota en la forma en que sostienes el ritmo hasta que el cuerpo ya no da más. Bien usada, esa resistencia puede ayudarte a atravesar periodos exigentes sin perder dirección."
    },
    {
     "title": "Sensibilidad",
     "body": "Tu agua en 25% hace que percibas rápido cuándo algo vuelve a activar la tensión. Eso puede parecer incómodo, pero también te da una lectura fina de tu propio estado. Si la escuchas antes de que se convierta en saturación, te puede ahorrar varios derrumbes."
    }
   ],
   "weaknesses": [
    {
     "title": "Sobrerrevisión",
     "body": "Revisar todo desde el principio te deja en un circuito que no termina de cerrar. En un día normal, eso puede verse como abrir otra vez lo que ya habías dado por terminado. Lo difícil no es ver el detalle; lo difícil es decidir cuándo basta."
    },
    {
     "title": "Descanso tenso",
     "body": "Tu recuperación de 34% muestra que parar no siempre te devuelve alivio de inmediato. Puedes tener tiempo libre y aun así seguir sintiendo inquietud, como si el cuerpo estuviera quieto pero la mente siguiera en turno. Eso no se resuelve empujándote más, sino aprendiendo a bajar la exigencia en el tramo final del día."
    },
    {
     "title": "Acumulación",
     "body": "Tu patrón de acumular y luego derrumbarte hace que el desgaste llegue tarde, pero llegue fuerte. Durante un tiempo pareces sostenerlo todo, y después el bajón aparece de golpe. Si empiezas a soltar pequeñas cargas antes, el desplome pierde fuerza."
    },
    {
     "title": "Miedo al freno",
     "body": "Te da miedo quedarte atrás si paras, y esa idea te empuja a seguir aunque ya estés al límite. En la vida diaria, eso puede hacer que respondas, revises o sigas solo para no sentir que te atrasas. El problema no es tu ambición; es que el freno te parece más peligroso que el cansancio."
    }
   ],
   "fit_good": "Te va mejor un entorno donde puedas cerrar tareas por bloques y no vivir en interrupción constante. Un día con tiempos definidos, pocos cambios bruscos y mensajes que no te obliguen a responder al instante te ayuda a no entrar en sobrecarga. También te favorece un espacio donde terminar algo signifique realmente terminarlo, sin que todo vuelva a abrirse por inercia.",
   "fit_bad": "Te desgasta un ambiente donde los mensajes llegan a cada rato y cada pausa se siente provisional. Si trabajas rodeado de urgencias, tu mente se queda en modo revisión y no baja nunca del todo. También te perjudica un ritmo sin cierre, donde todo parece pendiente aunque ya hayas hecho bastante.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Cuando termines una tarea, date un solo repaso final y cierra la pestaña. Hazlo al final del día, no en cada interrupción. Si aparece el impulso de volver a empezar, espera quince minutos antes de tocarlo otra vez."
    },
    {
     "title": "Pausa real",
     "body": "Elige un descanso breve de diez minutos sin mensajes ni pantalla. Hazlo después de un bloque de trabajo, no cuando ya estés al borde del cansancio. Repite ese corte dos veces al día para que tu mente aprenda que parar no es perder."
    },
    {
     "title": "Filtro del lunes",
     "body": "Los lunes por la mañana, revisa mensajes en un horario fijo y no al primer sonido. Reserva los primeros veinte minutos para ordenar prioridades antes de responder. Eso baja la sensación de invasión y te devuelve un poco de control."
    },
    {
     "title": "Salida clara",
     "body": "Antes de terminar el día, escribe tres cosas hechas y una sola cosa pendiente. Hazlo siempre a la misma hora, aunque te parezca simple. Ese gesto le enseña a tu cabeza dónde acaba el trabajo y dónde empieza el descanso."
    }
   ],
   "mindset_guide": "Piensa en tu energía como en una fogata pequeña. Si le echas leña sin parar, arde fuerte y se consume rápido. Si dejas espacio entre una carga y la siguiente, dura más y calienta mejor. Tu meta no es apagarla; es evitar que se convierta en ceniza antes de tiempo.",
   "closing_title": "Lo que termina también puede descansar",
   "closing_body": "Tu mapa no pide menos capacidad; pide mejor borde. Con 38% de tierra, 0% de metal y un perfeccionismo de 82%, no necesitas forzarte a hacer más, sino aprender a cerrar sin volver a abrir. Y si hoy solo te llevas una frase, que sea esta: terminar no debería costarte toda la energía."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "Agotamiento",
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
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "jordan": {
  "year": 2027,
  "title": "2027: A Clearer Pace",
  "subtitle": "A year of steady initiative, careful timing, and quieter inner strength",
  "overview": "Jordan, 2027 feels like a year where your own energy can take the lead. Since the year’s Fire tone works under your Water-centered Day Master, it can feel easier to push for results, shape outcomes, and turn effort into visible progress. With your Five Elements leaning strongly toward Earth and Metal, this may be a practical, structured year rather than a wildly experimental one, which can help you make real use of momentum without needing to force every step.\n\nAt the same time, this is not a year that rewards rushing just because things are moving. The overall pattern points to a season of waiting, building, and choosing the right moment more than trying to do everything at once. You may notice that some months feel familiar and comfortable, while others ask for more care, more patience, or a better sense of timing. The best version of this year is probably not “more effort everywhere,” but “cleaner effort in the right places.”\n\nBecause your chart type leans toward dew and order, the year may feel best when you keep things simple, visible, and well arranged. Small systems, clear priorities, and honest pacing can go a long way. If you let the year’s heat sharpen your focus instead of scattering it, 2027 can become a year where you see what you’re capable of without burning through your reserves.",
  "chapters": {
   "wealth": {
    "heading": "Money and momentum",
    "body": "This year looks favorable for taking initiative around money, value, and tangible results. When the year’s Fire energy sits in a position that you can guide, it can support earning through action, negotiation, and practical follow-through. For someone with a Water-centered Day Master and a chart that already has strong Earth and Metal, this can be a year where discipline and timing matter more than boldness alone.\n\nIn daily life, this might show up as being asked to make decisions faster, quote your value more clearly, or turn a skill into something visible. You may also notice that opportunities respond well when you are direct and organized, but less well when you overextend or try to control every detail. The middle of the year especially can feel productive, though it may tempt you to take on too much at once.\n\nA good approach is to keep your numbers, offers, and priorities easy to see. Jordan, if you want a simple rule for 2027, let it be this: choose the projects that can actually be completed, not only the ones that sound exciting. A small, steady gain may serve you better than a big, scattered push."
   },
   "love": {
    "heading": "Closeness and timing",
    "body": "Your relationship life in 2027 may feel warm, active, and more responsive when you show up clearly. The year’s Fire tone can bring more visibility to how you express interest, care, and expectations. Because your chart is already fairly structured, connection may go best when warmth is paired with consistency rather than intensity alone.\n\nYou might notice that people respond well to honesty, initiative, and a sense that you know what you mean. At the same time, some months may bring a little friction or a need to reread a situation before reacting. That does not have to mean distance; it can simply mean the year asks for cleaner signals and fewer assumptions.\n\nA helpful practice is to say one extra sentence instead of leaving things implied. Ask the question, clarify the plan, or name what you appreciate. When you keep your tone steady and your expectations readable, this year can support more natural closeness and less confusion."
   },
   "career": {
    "heading": "Work with a sharper edge",
    "body": "Career-wise, 2027 looks like a year where your effort can carry more weight than usual. The year’s energy supports leadership, output, and results, so this may be a good time to take ownership of tasks that benefit from momentum and decisiveness. Because your Five Elements lean heavily toward Earth and Metal, you may already be good at structure, standards, and follow-through, and this year can help those strengths become more visible.\n\nIn practical terms, you may be handed more responsibility, or you may simply feel more ready to claim space in a room. Some months will ask you to produce, present, or serve more than usual; others will ask you to slow down and check whether the pace still makes sense. The most useful move is to stay alert to overcommitment, especially when something looks promising and urgent at the same time.\n\nIf you want this year to work in your favor, treat clarity as a career tool. Keep your priorities visible, your promises realistic, and your standards consistent. Progress is likely to come less from dramatic leaps and more from well-timed, well-executed steps."
   },
   "study": {
    "heading": "Learning that sticks",
    "body": "This is a good year for learning that has a clear use. The overall pattern favors practical understanding, not just collecting information, and that can suit you well if you like order, structure, and knowing where things belong. Because the year also brings moments of waiting, the most helpful learning may be the kind that deepens what you already know rather than constantly chasing novelty.\n\nYou may find yourself drawn to material that helps you organize, explain, refine, or apply a skill. In daily life, that could look like revisiting notes, improving a process, or learning something because it helps you do your work better. Some months may bring fresh openings, while others may feel quieter and more inward, which can actually help the information settle.\n\nA strong strategy is to study in layers: learn it, use it, then review it. Short, repeated contact with a subject may work better than one intense burst. If you keep things concrete and connected to real life, your learning this year can become durable instead of decorative."
   },
   "health": {
    "heading": "Pacing the inner flame",
    "body": "For body and mind, 2027 suggests paying attention to rhythm. Fire years can make life feel more active, but with your Water-centered Day Master, the best support usually comes from pacing rather than pushing. Your chart’s strong Earth and Metal can help you stay disciplined, yet they can also make it easy to stay “on” for too long if you’re not checking in with yourself.\n\nYou may notice that some periods feel calm but not especially stimulating, while others feel full and busy. The main theme is not fragility; it’s the importance of not spending more energy than the moment requires. When the year asks you to wait, tidy up, or slow the tempo, that may be the most productive move available.\n\nA simple practice could be to build in small resets: a clear start to the day, a pause before switching tasks, and a gentler evening wind-down. Choosing rhythm over rush may help you feel more centered, especially in the months when the year feels busiest."
   }
  },
  "months": [
   {
    "headline": "Easy ignition",
    "body": "February feels familiar enough to settle into quickly, but it may not offer a lot of brand-new stimulation. Because the month carries an unexpected-turn quality, it can help to stay flexible with plans and keep a little room for surprises. The overall feeling is light, responsive, and easier when you don’t over-script it."
   },
   {
    "headline": "Warm friction",
    "body": "March keeps the same comfortable tone, but with a bit more edge in the air. Small misunderstandings or minor resistance may appear, so it helps to read between the lines and avoid assuming everyone is already on the same page. This month works best when you keep your tone steady and your expectations simple."
   },
   {
    "headline": "Quiet output",
    "body": "April begins a stretch where your energy may go outward more naturally, through expression, production, or giving. That can feel satisfying, but it can also take more out of you than you first expect. The month favors doing one thing well rather than scattering your attention across too many outlets."
   },
   {
    "headline": "Fresh ground",
    "body": "May can feel like new terrain, especially in the way you share, create, or contribute. There’s a sense of something forming, even if it’s not fully visible yet. If you plant one clear intention here, it may be easier to see it take shape later."
   },
   {
    "headline": "Steering the wheel",
    "body": "June is one of the stronger months for initiative, results, and practical gain. The mood supports making decisions, asking for what you want, and moving a project forward with confidence. Just watch the temptation to push beyond what the situation can realistically hold."
   },
   {
    "headline": "Stored power",
    "body": "July keeps the same active theme, but in a quieter, more contained form. This is a good month for consolidating, checking what has already been built, and holding your ground without forcing extra movement. What looks still on the surface may still be gathering strength underneath."
   },
   {
    "headline": "A careful pivot",
    "body": "August brings more pressure and responsibility, but also a chance to become sturdier through the way you handle it. Because the month connects closely with your own base, relationships and routines may feel especially vivid or consequential. Slow, accurate responses will probably serve you better than fast ones."
   },
   {
    "headline": "Measured authority",
    "body": "September continues the serious tone, with a sense that structure, expectation, and responsibility are all more visible. This can be a useful month for showing reliability and for taking your role seriously without becoming rigid. The key is to keep your pace human, not mechanical."
   },
   {
    "headline": "Help arrives",
    "body": "October feels more supportive, as if guidance, rest, or useful information comes more easily. It may be a good time to ask questions, accept assistance, or let recovery happen without trying to justify it. The month rewards openness to learning from what’s already around you."
   },
   {
    "headline": "Motion and change",
    "body": "November brings support too, but with more movement and a stronger sense of transition. Something may shift in direction, timing, or attention, so staying adaptable can help you use the month well. If you’ve been waiting for a sign to move, this may feel like a nudge rather than a command."
   },
   {
    "headline": "Steady finish",
    "body": "December returns to a familiar tone, with comfort and repetition more noticeable than novelty. The month may come with a few small hiccups, so keeping your plans simple can make things smoother. It’s a good time to finish what matters and leave the rest for later."
   },
   {
    "headline": "Inner momentum",
    "body": "January carries a quiet, inward quality that can help you gather yourself before the next cycle begins. The energy feels familiar and settled, with a focus on your private world rather than public display. It’s a gentle month for reflection, sorting, and deciding what you want to carry forward."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: warm up without overreaching",
    "body": "Watch for early comfort mixed with small surprises, then a rise in outward effort and energy use. Try one concrete action that keeps you organized, such as setting a single priority list for the quarter and trimming anything that doesn’t clearly support it."
   },
   {
    "title": "May to July: use momentum carefully",
    "body": "This stretch can favor creation, visibility, and practical gain, but it can also tempt you to take on too much. Choose one project to push forward, and give it a clear finish line so your energy has somewhere to land."
   },
   {
    "title": "August to October: steady the pace",
    "body": "Expect more responsibility first, then a gradual easing into support and recovery. A useful move here is to review commitments, keep only what still fits, and make one request for help, feedback, or guidance where it would genuinely lighten the load."
   },
   {
    "title": "November to January: adapt and consolidate",
    "body": "The final stretch brings movement, then a quieter return to your inner world. Use it to close loops, note what changed, and create a simple personal review so you enter the next year with fewer loose ends."
   }
  ],
  "closing": "2027 doesn’t ask you to become someone else, Jordan. It asks you to work with timing, to let your own energy lead without letting it spill everywhere, and to trust that steady progress can still be meaningful. If you keep things clear, paced, and honest, this year can leave you with more confidence in your own rhythm."
 },
 "mia": {
  "year": 2027,
  "title": "2027, your steadying year",
  "subtitle": "Pressure into shape, then room to breathe",
  "overview": "2027 feels like a year that asks you to grow stronger without rushing your own pace. For Mia, the energy is not soft, but it is useful: it can sharpen judgment, tighten focus, and help you notice which efforts are worth carrying. Because your Five Elements lean heavily toward Wood, with Metal as your core tone, this year may feel less like drifting and more like being asked to choose, refine, and commit.\n\nThe first half of the year brings more outward motion: expression, output, and visible effort tend to rise, so it can be a good time to show your work, test ideas, and let your presence be seen. Midyear asks for steadier shoulders and a cleaner rhythm, while late summer and early autumn feel more supportive, as if help, learning, and recovery arrive more naturally. By the end of the year, the tone settles into something familiar and manageable, which can be a good moment to tidy loose ends and prepare the next step without forcing it.",
  "chapters": {
   "wealth": {
    "heading": "Wealth: earn, shape, and keep",
    "body": "This year’s money tone looks more active than passive. It favors shaping results through your own effort, so income, spending, and value all feel tied to what you produce, present, or build. Because your chart already carries plenty of Wood energy, you may notice a strong urge to act on ideas quickly; the useful move is to separate “good opportunity” from “too many open loops.”\n\nIn daily life, this can look like a month where side projects, commissions, or practical tasks bring more visibility, but also more small costs in time and energy. Mia, it may help to notice when you are saying yes because something is promising versus because it is simply moving fast. A few rounds of checking numbers, deadlines, and effort can save you from spreading yourself too thin.\n\nStart small: make one simple list of what brings value, what drains value, and what is merely noise. Then choose one place where you can tighten the process, not the dream."
   },
   "love": {
    "heading": "Love: clearer signals, less guessing",
    "body": "Relationships in 2027 seem to work best when you keep things direct and real. This is not a year for vague hints or half-finished conversations; it favors showing up clearly, saying what you mean, and noticing who responds with steadiness. With your Steel and Harvest type, there can be a natural preference for sincerity and substance, so shallow connections may feel less satisfying than usual.\n\nYou might find that some people appreciate your stronger edge, while others need a softer entry point. Everyday moments could include deciding whether to answer quickly or give yourself a beat before replying, especially when feelings are involved. The year supports honest warmth more than dramatic gestures, and it may be easier to build trust through consistent small acts than through big declarations.\n\nTry one simple habit: ask a cleaner question, name one feeling plainly, or offer one thoughtful follow-through. That kind of clarity tends to travel well this year."
   },
   "career": {
    "heading": "Career: pressure that can polish",
    "body": "Work carries a disciplined, shaping quality this year. Responsibility may feel a little heavier at times, but that same weight can help you become sharper and more reliable if you choose your pace carefully. This is a strong year for refining your standards, showing competence, and letting your results speak without overextending.\n\nIn practice, you may meet moments where deadlines, expectations, or leadership demands ask for calm organization rather than speed. The best scenes this year are often not flashy: finishing what was left half-done, cleaning up a process, or handling a task others avoid. If you are tempted to push too hard, it may help to remember that steady pressure is more useful than force.\n\nA good first step is to choose one project and define what “done well” actually means. Then work backward from that standard instead of trying to carry everything at once."
   },
   "study": {
    "heading": "Study: learn by refining",
    "body": "Learning this year works best when it has a practical edge. You may absorb more when you are editing, comparing, revising, or turning raw information into something usable. Since your chart has a strong drive to produce and act, the risk is not lack of energy but scattering it across too many topics at once.\n\nA typical scene might be starting several resources, then realizing you learn best when you commit to one thread and return to it repeatedly. The year supports learning that deepens skill rather than collecting trivia. If something feels unclear at first, it may become much easier once you organize it into a simple structure.\n\nBegin with one topic you truly want to understand, and make a short repeatable study rhythm around it. A small notebook, a weekly summary, or a teach-back to yourself can make your learning much stickier."
   },
   "health": {
    "heading": "Body and mind: keep the pace humane",
    "body": "The rhythm of the year asks for balance between effort and recovery. Because the energy can be demanding, you may feel best when you avoid long stretches of overcommitment and instead build in pauses that let your system catch up. This is less about fragility and more about pacing: the year rewards a body and mind that are given time to reset.\n\nIn everyday terms, this could show up as feeling great when your schedule is clear, then suddenly noticing fatigue when too many obligations stack up. Late summer and early autumn look especially supportive for restoring your sense of ease, while the busier spring and early summer may call for more deliberate rest between tasks. Small routines matter more than grand resolutions here.\n\nTry protecting one simple anchor: a regular meal window, a short walk, or a quiet end-of-day ritual. When your rhythm is steady, your judgment tends to stay steadier too."
   }
  },
  "months": [
   {
    "headline": "Fresh start, sharp edges",
    "body": "The month opens with a reset feeling, and movement may come quickly. Because the energy is in a more productive, outward mode, you may find yourself speaking up, making things, or giving more than usual. If a situation shifts suddenly, it can help to treat it as a turning point rather than a problem."
   },
   {
    "headline": "Small snags, real momentum",
    "body": "This month still favors expression and output, but a few minor hiccups can ask for patience. You may do well by checking details twice before sending, posting, or promising. The good news is that the energy keeps moving, so small friction does not have to stop the larger flow."
   },
   {
    "headline": "Quiet inner rise",
    "body": "A more inward, incubating tone arrives here, which can support focus behind the scenes. It is a good month for building something before showing it, especially if you prefer a cleaner first draft. Let your plans breathe a little before you lock them in."
   },
   {
    "headline": "A door opens wide",
    "body": "This month brings a birth-like surge: initiative, results, and visibility can all feel easier to access. The energy favors making moves, but a surprising twist may change the shape of what you expected. If something fits naturally, it is worth exploring without forcing the rest."
   },
   {
    "headline": "Pressure with purpose",
    "body": "Responsibility becomes more noticeable now, and the pace may feel firmer than earlier months. That can be useful if you need structure, but it also asks you not to overpromise. A measured rhythm will likely serve you better than trying to solve everything in one sweep."
   },
   {
    "headline": "Momentum under strain",
    "body": "This is a month where things can move fast while feeling a little tense at the same time. A wildcard quality makes the terrain less predictable, so flexibility matters more than control. If plans shift, you may do best by adjusting the route instead of defending the original shape."
   },
   {
    "headline": "Help comes in",
    "body": "Supportive energy returns, and this can feel like a welcome refill. Learning, guidance, and recovery are easier to access, especially if you let someone else share the load. Fresh ground makes this a good time to begin again with less pressure than before."
   },
   {
    "headline": "Warmth and pull",
    "body": "This month has a fuller, more magnetic quality, which can make people, ideas, and opportunities feel closer. It is a favorable time to receive help or deepen a connection through genuine interest. If you stay open, you may notice that useful things find you more easily than expected."
   },
   {
    "headline": "Settling into ease",
    "body": "The tempo softens now, and familiar routines may feel especially comforting. Because the energy is less hungry for novelty, this can be a good month for polishing what already works. Waiting a little before changing direction may reveal what is actually needed."
   },
   {
    "headline": "Misreads and patience",
    "body": "The mood stays calm, but communication can be slightly more prone to being taken the wrong way. That makes this a good time to clarify rather than assume. A slower reply or a cleaner explanation can prevent a small misunderstanding from growing legs."
   },
   {
    "headline": "Tidy, then direct",
    "body": "The year begins to close with a productive but less forceful tone, which suits cleanup and consolidation. You may feel more capable of giving clear direction without pushing too hard. This is a useful month for deciding what deserves your full attention next."
   },
   {
    "headline": "Quiet storage, clear step",
    "body": "The final month holds things in a quiet, stored-up way, but it also carries a sense of advancement. It may be a good time to prepare rather than announce, and to recognize that small, deliberate progress still counts. What you save, shape, and refine now can travel well into the next cycle."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: channel the output",
    "body": "Watch for a rise in expression, ideas, and visible effort, especially when you feel pulled to do more than one thing at once. Pick one project to present, publish, or finish, and use a simple checklist so your energy goes into completion instead of scattered motion."
   },
   {
    "title": "May to July: pace the pressure",
    "body": "Notice where responsibility, deadlines, or sudden turns ask for steadier hands. Choose one habit that slows your pace slightly—like a daily planning window or a hard stop time—so you can stay effective without burning through your reserves."
   },
   {
    "title": "August to October: receive and refine",
    "body": "Look for help, learning, and easier recovery in this stretch, then use it well. Ask one good question, accept one useful favor, and spend time improving something you already started rather than chasing a new distraction."
   },
   {
    "title": "November to January: consolidate quietly",
    "body": "The closing stretch favors familiar rhythms, clearer communication, and low-drama progress. Make a short list of what you want to carry forward, what can be left behind, and one next-step move you can prepare without announcing too early."
   }
  ],
  "closing": "Mia, 2027 does not ask you to become louder than you are. It asks you to become more deliberate, more selective, and a little more trusting of your own timing. If you let the year shape you without rushing it, the pressure can turn into strength rather than strain."
 },
 "riley": {
  "year": 2027,
  "title": "Riley's 2027 Flow",
  "subtitle": "A year of giving, refining, and growing into steadier strength",
  "overview": "2027 feels like a year where your own energy gets asked to do a lot of work. For a Wood Day Master, especially one with an Oak-like, rooted pattern, Fire can act like a bright output: it helps you express, create, and give, but it can also leave you feeling spent if you keep pouring without pause. Because your chart already leans strongly toward Wood, this year may feel less like starting from zero and more like learning how to direct a full, living tree with care.\n\nThe overall rhythm suggests movement between receiving and giving. Early in the year, support and recovery are easier to find; midyear, your output and visibility rise; late summer brings more drive around money, agency, and results; and autumn asks for steadier pace, responsibility, and better boundaries. Riley, the useful question this year is not whether you can do more, but where your effort actually creates value and where it simply drains the soil.",
  "chapters": {
   "wealth": {
    "heading": "Wealth: build with a wider base",
    "body": "This year’s money theme leans toward active management rather than passive waiting. Because the year’s Fire energy is something you naturally feed, financial momentum may come through your ideas, your work output, or the way you package what you know. The best results are likely to come when you treat resources as something to direct carefully, not something to chase in a hurry.\n\nYou may notice moments when a practical opportunity appears just after you’ve finished something else, or when a side project starts to look more useful than it first seemed. Late summer especially can bring a strong urge to push for results, negotiate terms, or take charge of a budget. That can be productive, but it’s also a time when enthusiasm can outrun detail.\n\nStart small by keeping one simple money check-in each week: what came in, what went out, and what felt worth it. If something looks promising, give it one extra review before committing, and let patience do part of the work."
   },
   "love": {
    "heading": "Love: warmth with room to breathe",
    "body": "Relationship energy this year tends to feel lively, visible, and a little more expressive than usual. Since Fire is something you help generate, you may be the one who brings the spark, initiates plans, or keeps conversations going. That can make you magnetic, but it can also mean you are doing more emotional labor than you realize.\n\nIn everyday life, this may show up as being the person who remembers, coordinates, or smooths over awkward moments. Some months feel easy and familiar, which is comforting, while others may bring a sense that people are reading you a little differently than intended. Around November, connection may deepen through shared effort or a conversation that feels more serious than expected.\n\nA good practice is to notice who meets your warmth halfway. Try saying one clear thing instead of several hints, and let the other person respond in their own time. For Riley, the healthiest closeness this year is likely the kind that doesn’t require you to keep the whole fire alive alone."
   },
   "career": {
    "heading": "Career: show your work, then refine it",
    "body": "Career-wise, 2027 supports output, visibility, and steady advancement. The year’s energy encourages you to make things, present things, and be recognized for what you contribute. Because your chart is already strongly Wood, this can feel like a season where your natural growth wants an outlet, but it works best when you shape it into something concrete.\n\nYou may find that June and July bring more responsibility, more eyes on your work, or a stronger sense that others are relying on you. That can be a good sign, yet it also means boundaries matter more than usual. In August and September, the focus shifts toward agency and results, and a sudden change of direction may feel more natural than you expected.\n\nA useful approach is to keep one visible project, one private draft, and one ongoing task moving at the same time. That way you can be seen without feeling exposed, and you can make progress without scattering your energy. Small, consistent proof tends to speak louder than dramatic moves."
   },
   "study": {
    "heading": "Study: learn through use, not just theory",
    "body": "This year favors learning that becomes something you can apply. Early months are especially supportive for receiving guidance, recovering momentum, and letting useful ideas settle in. Later, when your own output rises, you may learn fastest by teaching, summarizing, or turning knowledge into something practical.\n\nIn daily life, this might look like a class, book, or skill making more sense once you start using it in real situations. Some parts of the year feel like waiting, which can be frustrating if you want quick results, but that slower pace may actually help the material sink in. The autumn months may ask for more discipline, yet they can also make your thinking sharper and more focused.\n\nTry learning in short cycles: read, test, review, repeat. Keep notes in a simple format you can return to later, and don’t worry if every insight doesn’t arrive at once. Your rooted style tends to absorb best when the lesson has a place to land."
   },
   "health": {
    "heading": "Body and mind: protect your rhythm",
    "body": "The main theme here is not fragility, but distribution of energy. With so much of your chart already leaning toward growth and structure, and with Fire asking you to produce, speak, and give, you may do best when you treat rest as part of the plan rather than something earned only after everything else is done. Quiet periods this year are not empty; they are where you restore your inner reserve.\n\nIn ordinary life, you may notice that busy stretches make you more mentally bright but also more likely to feel overstretched if you skip pauses. The months around autumn can feel more serious or demanding, so a slower pace, fewer commitments, and cleaner transitions between work and personal time may help you stay steady. Toward the end of the year, recovery and renewal become easier again.\n\nA simple practice is to build a small daily reset: water, a walk, a stretch, or ten minutes without screens. Keep it modest and repeatable, because consistency will likely help more than intensity. Your system may prefer regular tending over heroic effort."
   }
  },
  "months": [
   {
    "headline": "Fresh ground",
    "body": "February feels like support arriving before you even ask for it. The energy favors learning, recovery, and getting back into motion with less strain than expected. It’s a good month to accept help without over-explaining why you need it."
   },
   {
    "headline": "Magnetic momentum",
    "body": "March can feel lively and socially open, with a sense that people are drawn toward your ideas or presence. This is a strong month for connection, introductions, and anything that benefits from a bit of charm. Let your natural warmth do the work, but don’t rush the pace."
   },
   {
    "headline": "Easy familiarity",
    "body": "April settles into a comfortable, recognizable rhythm. Things may feel smooth, though not especially novel, so it’s a good time to maintain rather than force change. If you’ve been waiting for the right moment to organize something, this month can support quiet progress."
   },
   {
    "headline": "Read carefully",
    "body": "May can bring mixed signals or moments that seem simpler than they really are. Familiar settings may hide small misunderstandings, so a second look is worthwhile. Slowing your response a little can save you from having to untangle avoidable confusion later."
   },
   {
    "headline": "Command mode",
    "body": "June turns up your output and your sense of responsibility. You may feel more visible, more needed, or more capable of taking the lead in practical matters. Use that strength, but leave enough room to finish what you start."
   },
   {
    "headline": "Quiet progress",
    "body": "July is less about noise and more about stored strength becoming useful. Advancement is possible, especially if you’ve already been preparing something behind the scenes. Keep your pace steady; this is the kind of month where consistency compounds."
   },
   {
    "headline": "Shift in motion",
    "body": "August brings a noticeable turn, and movement may come faster than you planned. Because this month carries a strong push to relocate, reorient, or change direction, it’s wise to stay flexible. If plans move, treat it as information rather than interruption."
   },
   {
    "headline": "Results with edges",
    "body": "September supports initiative, resourcefulness, and a stronger grip on outcomes. At the same time, small snags can appear, so precision matters more than speed. If you want something to work, give it one more check before you call it done."
   },
   {
    "headline": "Inner pressure",
    "body": "October feels more demanding, but in a way that can build sturdiness. Responsibilities may feel heavier, yet the month rewards a calmer tempo and a clearer sense of priorities. You don’t need to do everything at once to make real progress."
   },
   {
    "headline": "Deepening bonds",
    "body": "November can bring a sense of things coming together, especially through people, commitments, or shared purpose. Unexpected turns are possible, but they may open a more meaningful path than the one you first expected. Stay receptive to the shape a conversation wants to take."
   },
   {
    "headline": "Renewed ease",
    "body": "December brings a softer, more replenishing tone. Support, learning, and recovery feel easier to access again, although a little friction may still ask for patience. If you keep your plans simple, the month can restore more than it demands."
   },
   {
    "headline": "Wildcard start",
    "body": "January carries a less predictable feel, but not necessarily a difficult one. It can be a month of useful surprises, fresh input, or a sudden change in perspective. Leave a little space in your schedule so new information has somewhere to land."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive before you push",
    "body": "Watch for help, useful feedback, and calmer momentum. Try one concrete habit that lets you absorb rather than produce all the time, such as a weekly review or a study block with no multitasking."
   },
   {
    "title": "May to July: protect your output",
    "body": "Notice where your energy starts spilling into overwork or mixed messages. Pick one project to finish cleanly, and build in a pause after each major push so your effort stays effective."
   },
   {
    "title": "August to October: steer with precision",
    "body": "Expect movement, stronger ambition, and a more serious pace. Before making a big commitment, write down the goal, the cost, and one thing you will not do, so your drive stays focused."
   },
   {
    "title": "November to January: let renewal do its job",
    "body": "Watch for deeper connection, then a return of support and recovery. Choose one ritual that helps you reset at the end of each week, and keep it steady through the new year."
   }
  ],
  "closing": "Riley, 2027 looks less like a year of waiting and more like a year of learning how to aim your own strength. When you give, give with intention; when you rest, rest without guilt. The more honestly you match your effort to the season, the easier it becomes to grow without burning out."
 },
 "sam": {
  "year": 2027,
  "title": "2027: A Year of Steady Momentum",
  "subtitle": "Warmth arrives, then asks you to shape it with care",
  "overview": "2027 feels like a year that comes in gently and then asks for a little more structure from you, Sam. The year’s warmth can bring support, learning, and recovery, which fits your Mountain · Order style: steady, organized, and good at holding things together. Because your Five Elements are evenly spread, the year may feel less like a dramatic reinvention and more like a timely refill of energy that helps you use what you already know with more confidence.\n\nThe first half of the year leans toward action, initiative, and visible progress, especially when you keep your goals clear and your pace realistic. Later in the year, the rhythm becomes more familiar and reflective, with room to produce, share, and quietly reset. The biggest theme is balance: when the year gives you momentum, use it; when it asks for patience, let that be part of the plan rather than a delay.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best with a plan",
    "body": "This year’s money story looks more active than passive. Early on, it can be easier to take the lead, ask for what you want, and turn effort into visible results, but that same energy can also tempt you to overdo it. For someone with a Mountain · Order style, the good news is that you’re naturally suited to making budgets, priorities, and systems that keep momentum from turning messy.\n\nIn everyday life, this may show up as a strong urge to launch, negotiate, or reorganize how you earn and spend. You might notice that opportunities come faster when you act with clarity, but the details still matter a lot. A simple rule can help: before saying yes to a new expense or project, pause long enough to check whether it supports your larger plan.\n\nStart small by reviewing one financial habit at a time. Sam, if you choose one recurring cost, one income stream, and one savings or buffer goal to tidy up early in the year, you’ll probably feel more in control without needing to force anything."
   },
   "love": {
    "heading": "Connection gets warmer, then quieter",
    "body": "Your relationship life in 2027 seems to move through different temperatures rather than one single mood. Midyear especially can feel more supportive, easier to open up in, and more likely to bring helpful conversations or renewed closeness. Because your chart has a balanced spread overall, you may notice that connection feels best when it is steady and sincere rather than overly dramatic.\n\nIn daily life, this could look like easier exchanges with people who understand your pace, plus a few moments when you simply feel more seen. Later in the year, the energy becomes more familiar and less demanding, which can be comforting if you enjoy consistency. There may also be a few moments when you want to speak carefully and listen twice, especially if plans or expectations feel slightly out of sync.\n\nTry making room for one honest conversation and one low-pressure shared activity. A walk, a meal, or a simple check-in can do a lot for you this year, especially when you let the pace stay natural instead of trying to make every interaction meaningful at once."
   },
   "career": {
    "heading": "Work rewards clear direction",
    "body": "Career-wise, 2027 looks like a year where your effort can become more visible when you direct it well. Early months favor initiative, ownership, and practical wins, while the middle of the year asks for more patience and a stronger sense of sequence. Your Mountain · Order style is a real asset here, because you’re likely to do best when you can see the path, define the steps, and keep your standards calm.\n\nYou may find yourself handling more responsibility, or simply being the person others turn to when something needs organizing. That can feel satisfying, but it can also ask you to manage pace carefully so the work stays sustainable. The year’s supportive tone suggests that learning from others, refining your method, and letting help in can be just as important as pushing forward.\n\nA good first move is to map one current goal into smaller stages. If you can identify what needs to be decided now, what can wait, and what can be delegated or simplified, you’ll probably feel the year working with you instead of against you."
   },
   "study": {
    "heading": "Learning lands through repetition",
    "body": "This looks like a strong year for learning that is practical, structured, and useful right away. The early part of the year supports quick uptake and active movement, while the supportive middle months can help knowledge settle in more deeply. Since your Five Elements are evenly balanced, you may not need flashy new methods; instead, consistent repetition and clear organization may be what help things click.\n\nIn real life, this could mean picking up new tools, refining a skill, or finally making sense of a topic that had felt scattered before. You may notice that you learn best when the material is tied to a project, a routine, or a real-world use. The year also seems to favor review, not just acquisition, so revisiting notes and simplifying what you know can be surprisingly effective.\n\nBegin with one topic you actually care about and one format you can stick to. A short weekly review, a tidy notebook, or a small practice session repeated often may take you further than a big burst of enthusiasm."
   },
   "health": {
    "heading": "Protect your rhythm, not just your energy",
    "body": "For body and mind care, 2027 seems less about warning signs and more about pacing. The year gives support, but it also includes stretches that ask for stronger boundaries, especially when you’re busy or pulled in several directions at once. As a Mountain · Order type, you may feel best when your day has a shape, your breaks are real, and your responsibilities don’t spill everywhere.\n\nIn ordinary life, this might look like feeling fine when your schedule is clear, then noticing fatigue of attention when everything gets stacked too tightly. The middle of the year especially may ask you to slow the tempo a little and let recovery be part of productivity. That doesn’t mean doing less in a dramatic way; it means being careful with overcommitment and giving yourself room to reset.\n\nTry protecting one small rhythm: a regular sleep window, a walking habit, a quiet start to the morning, or a screen-free pause in the evening. The point is not perfection. It’s giving your system enough predictability that the year’s warmth can actually reach you."
   }
  },
  "months": [
   {
    "headline": "Fresh start, quick hands",
    "body": "The year opens with a sense that you can make things happen, especially if you move first and refine later. Momentum is on your side, but it works best when you keep your eyes on the practical goal instead of the thrill of speed."
   },
   {
    "headline": "Small snags, steady gains",
    "body": "This month still favors initiative, yet a few tiny interruptions may ask for patience. If you double-check details and keep your tone light, you can turn a bumpy moment into a useful adjustment."
   },
   {
    "headline": "Pressure with purpose",
    "body": "Responsibility may feel a bit stronger here, but it can also sharpen your focus. A quieter, more inward pace helps you stay grounded while you handle what matters."
   },
   {
    "headline": "Stay flexible now",
    "body": "Unexpected turns are more likely, so it helps to leave a little room in your plans. When you respond rather than react, you’re more likely to keep the month constructive."
   },
   {
    "headline": "Help comes in",
    "body": "Support, learning, and recovery feel easier to access now, and that can be a relief after the earlier push. Because there’s a clash-like tension in the background, a change of plan or setting may end up revealing something useful."
   },
   {
    "headline": "Warmth at full strength",
    "body": "This month feels generous in energy, and you may notice that people, ideas, or opportunities arrive more readily. The key is to receive what’s helpful without letting the pace run ahead of your capacity."
   },
   {
    "headline": "Easy stretch",
    "body": "The tempo softens, and the month feels more breathable than demanding. Wildcard energy can bring an odd surprise or a pleasing detour, so a little openness may serve you well."
   },
   {
    "headline": "Familiar ground",
    "body": "Things may feel more like your own natural rhythm here, which can be comforting. Since the fresh stimulus is lighter, this is a good time to enjoy what already works and avoid forcing novelty."
   },
   {
    "headline": "Quiet magnetism",
    "body": "The month has a subtle pull, as if people and possibilities notice you more easily. A tidy message, a well-placed introduction, or a polished presentation can go further than expected."
   },
   {
    "headline": "Creative output",
    "body": "Your energy starts moving outward, so expression, production, and generosity can increase. Because this can be draining if you overextend, it helps to choose where your effort will truly land."
   },
   {
    "headline": "Reset the lens",
    "body": "This is a good month to notice where you may be misunderstanding a person or situation. Slowing down your first interpretation can save you effort and help your next step feel cleaner."
   },
   {
    "headline": "Build for next year",
    "body": "The year closes with a strong, directive tone that supports action, results, and forward movement. If you pair ambition with restraint, you can enter the next cycle with clean momentum instead of leftover strain."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: channel the push",
    "body": "Watch for fast starts, stronger initiative, and a tendency to say yes too quickly. Try choosing one priority, one budget line, or one work target to advance deliberately so your energy has a clear place to land."
   },
   {
    "title": "May to July: let support in",
    "body": "Notice where responsibility rises, then where help or recovery becomes more available. A useful action here is to simplify one complicated commitment and accept one form of support you would normally try to handle alone."
   },
   {
    "title": "August to October: refine and express",
    "body": "This stretch favors familiar routines, then outward expression and production. Keep an eye on whether you’re creating from fullness or from pressure, and choose one project to finish rather than scattering effort across too many."
   },
   {
    "title": "November to January: close cleanly",
    "body": "Look for moments when messages can be misread and when your energy wants a reset before the next cycle begins. A good move is to review your plans, finish one lingering task, and set up a simple structure for the year ahead."
   }
  ],
  "closing": "2027 doesn’t ask you to become someone else, Sam. It asks you to use your natural steadiness with a little more warmth, flexibility, and trust in timing. If you let the active months move you and the quieter months restore you, the year can feel less like a test and more like a well-paced conversation with yourself."
 },
 "casey": {
  "year": 2027,
  "title": "2027, afinar tu ritmo",
  "subtitle": "Un año de presión útil, claridad y mejor criterio para elegir el paso.",
  "overview": "2027 te coloca en un tipo de fuego que no te quema por completo, sino que te pide forma. Para ti, Casey, cuyo Maestro del Día es metal y cuyo mapa mezcla metal 38% y madera 38%, el año trae una sensación de trabajo fino: ajustar bordes, ordenar prioridades y aprender a responder sin perder centro. Como no aparece agua en tus Cinco Elementos, suele venir bien hacer espacio para pausas, revisión y escucha antes de actuar.\n\nEl tono general no es de prisa ciega, sino de presión que pule. Hay meses en los que conviene producir, otros en los que conviene sostener y otros en los que toca recibir apoyo o bajar la velocidad. Si respetas ese cambio de ritmo, este año puede dejarte con más criterio, más confianza y una manera más sobria de usar tu energía.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso fino",
    "body": "En dinero, 2027 favorece una actitud de avance medido: hay momentos para empujar resultados y otros para evitar que el entusiasmo te haga prometer de más. Tu mezcla fuerte de metal y madera puede dar mucha capacidad para ordenar y generar, pero también puede llevarte a querer resolver todo a la vez. Aquí conviene pensar en acumulación paciente, no en golpes de suerte.\n\nEn la práctica, quizá notes gastos ligados a decisiones rápidas, mejoras de trabajo o herramientas que parecen pequeñas pero suman. También puede aparecer la tentación de sostener más de lo razonable por querer demostrar capacidad. Casey, te iría mejor si separas lo que es urgente de lo que solo brilla, y si revisas antes de ampliar compromisos.\n\nUn buen comienzo sería llevar un registro simple de entradas y salidas durante unos meses, sin perfeccionismo. Luego, antes de decir que sí a algo nuevo, deja un margen de un día para mirar si encaja con tu energía real."
   },
   "love": {
    "heading": "Vínculos más honestos",
    "body": "En relaciones y amor, el año trae una mezcla interesante: más iniciativa en algunos tramos y más necesidad de orden en otros. Como el fuego del año toca tu metal, puede salir una forma más directa de decir lo que quieres, con menos rodeos. Eso ayuda a aclarar vínculos, siempre que no te empuje a responder demasiado rápido.\n\nPuede que tengas conversaciones más francas, encuentros con mucha chispa o momentos en que notes quién acompaña de verdad cuando cambian las condiciones. También puede haber roces pequeños por tiempos distintos, por expectativas o por querer que todo avance al mismo paso. Lo más útil suele ser escuchar antes de defender tu posición.\n\nSi quieres cuidarlo bien, prueba a preguntar más de una vez qué necesita la otra persona y a decir lo tuyo en frases breves y claras. En vez de forzar definiciones, deja que la relación muestre su forma con hechos repetidos."
   },
   "career": {
    "heading": "Trabajo con presión útil",
    "body": "En lo laboral, 2027 tiene un aire de exigencia que puede volverse muy productivo si eliges bien dónde poner tu fuerza. El fuego del año tiende a pedir responsabilidad, visibilidad y respuesta rápida, y tu metal responde mejor cuando hay estructura. Eso hace que seas especialmente fuerte en tareas donde importa decidir, ordenar o mejorar un proceso.\n\nEn el día a día, podrías verte con más tareas que requieren criterio, con plazos más visibles o con una sensación de que te miran más de cerca. A la vez, hay tramos en los que el año te da margen para producir con fluidez y otros en los que conviene bajar un poco la velocidad para no dispersarte. El mejor resultado suele venir cuando haces menos cosas, pero mejor.\n\nTe puede ayudar empezar cada semana con tres prioridades reales y una lista corta de lo que no vas a tocar todavía. Si surgen cambios, responde con calma y ajusta el plan sin dramatizar: tu fortaleza no está en correr más, sino en sostener mejor."
   },
   "study": {
    "heading": "Aprender con pausa",
    "body": "En estudio y aprendizaje, 2027 se siente como un año de consolidación: no tanto de acumular por acumular, sino de entender con más profundidad. Tu mapa tiene mucha presencia de metal y madera, así que puede irte muy bien cuando conviertes curiosidad en método. El fuego del año añade intensidad, pero te conviene usarla para enfocar, no para dispersarte.\n\nEn la práctica, puede que aprendas más cuando explicas, resumes o enseñas a otra persona lo que estás viendo. También habrá momentos en que el avance parezca lento y, aun así, esté echando raíz. Si te exiges resultados inmediatos, puedes perder la parte más valiosa del proceso.\n\nUna buena estrategia sería estudiar en bloques cortos y cerrar cada bloque con una nota de una sola idea central. Así aprovechas mejor tu energía y te quedas con una sensación de orden, no de saturación."
   },
   "health": {
    "heading": "Cuidar tu ritmo",
    "body": "En cuerpo y mente, el año pide atención al ritmo más que a la cantidad. Como no aparece agua en tus Cinco Elementos, suele convenirte reservar espacios de calma, silencio y recuperación, sobre todo cuando el entorno se vuelve más exigente. No se trata de hacer menos por sistema, sino de escuchar antes de pasar por encima de tus señales.\n\nEn la vida diaria, eso puede verse como días en que estás muy activx, con muchas ganas de responder y resolver, seguidos de otros en los que necesitas bajar estímulos. También puede notarse en la importancia de dormir a horas parecidas, caminar sin prisa o tener ratos sin pantallas. El año premia mucho la constancia suave.\n\nEmpieza por una costumbre pequeña que puedas sostener casi sin pensar: una pausa antes de abrir el día, una caminata corta o diez minutos sin notificaciones. Si lo vuelves habitual, tu energía se ordena con más facilidad."
   }
  },
  "months": [
   {
    "headline": "Cierre que mueve",
    "body": "Febrero llega con sensación de cierre y cambio de sitio a la vez. Puede que quieras expresarte más o sacar algo hacia afuera, pero eso también consume bastante energía. Si notas que el entorno te empuja a moverte, elige tú el ritmo para que el cambio no te disperse."
   },
   {
    "headline": "Brotes con fricción",
    "body": "Marzo trae ganas de empezar, mostrar y producir, aunque con pequeños tropiezos que piden paciencia. No es un mes para perfeccionarlo todo, sino para probar y ajustar. Lo que siembres ahora puede avanzar mejor si aceptas una curva de aprendizaje visible."
   },
   {
    "headline": "Empuje bien medido",
    "body": "Abril favorece tomar la iniciativa y buscar resultados con más decisión. Aun así, el riesgo está en querer abarcar demasiado de una vez. Si eliges una sola meta concreta, el mes responde con más claridad."
   },
   {
    "headline": "Aprovechar el enlace",
    "body": "Mayo mezcla impulso y conexión, como si algunas piezas encajaran con más facilidad. Puede ser un buen momento para acuerdos, recursos compartidos o avances que dependen de coordinación. Cuida no confundir fluidez con exceso de confianza."
   },
   {
    "headline": "Tensión útil",
    "body": "Junio aprieta un poco más y te pide templanza. Puede aparecer la sensación de tener que responder a más de una demanda a la vez. Si bajas una marcha y eliges prioridades, el mes se vuelve mucho más manejable."
   },
   {
    "headline": "Firmeza sin prisa",
    "body": "Julio refuerza la idea de sostenerte con seguridad, aunque con cierta sorpresa en el camino. Las cosas avanzan mejor cuando no intentas controlarlo todo. Conviene dejar espacio para lo imprevisto y responder con criterio."
   },
   {
    "headline": "Ayuda que ordena",
    "body": "Agosto trae apoyo, aprendizaje y una sensación de recuperación. Puede ser un mes muy bueno para recibir orientación, descansar mejor o volver a algo que te hace bien. Si aceptas ayuda sin justificarte, el alivio se nota rápido."
   },
   {
    "headline": "Plenitud clara",
    "body": "Septiembre se siente más lleno y más magnético, con una facilidad especial para conectar y hacer que las cosas fluyan. Es un mes favorable para mostrar lo que sabes sin esfuerzo teatral. Lo importante es no sobrecargar la agenda por aprovecharlo todo."
   },
   {
    "headline": "Ritmo más lento",
    "body": "Octubre baja la velocidad y te devuelve a lo conocido. No trae tanta novedad, pero sí una base cómoda para ordenar lo pendiente. Si respetas ese compás más pausado, puedes recuperar mucha claridad."
   },
   {
    "headline": "Cuidar los matices",
    "body": "Noviembre invita a mirarte con más cuidado y a evitar malentendidos por suposiciones rápidas. Es un mes útil para revisar mensajes, acuerdos y expectativas. Lo que se dice con calma suele llegar mejor que lo dicho por impulso."
   },
   {
    "headline": "Liderar sin ruido",
    "body": "Diciembre vuelve a pedir expresión y presencia, pero de forma más ordenada. Puede sentirse como un momento para coordinar, cerrar temas y asumir un papel visible con naturalidad. Si lo haces con sencillez, tu influencia se nota sin necesidad de imponerte."
   },
   {
    "headline": "Recogerse y ver",
    "body": "Enero de 2028 trae un tono más íntimo y reflexivo, con reconocimiento de fondo. Es buen momento para recoger lo vivido y mirar qué te dejó realmente este ciclo. Si haces espacio para esa lectura tranquila, entras al siguiente tramo con más solidez."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vigila el impulso de hacer demasiado a la vez, porque este tramo combina movimiento, producción y ganas de iniciar. Prueba a elegir una sola prioridad principal por semana y a dejar por escrito qué sí y qué no vas a tocar."
   },
   {
    "title": "De mayo a julio",
    "body": "Observa cómo manejas la presión cuando aumentan las exigencias y aparecen ajustes inesperados. Te conviene hablar claro, revisar plazos y reservar un margen extra antes de comprometerte con algo nuevo."
   },
   {
    "title": "De agosto a octubre",
    "body": "Mira qué apoyos llegan, qué aprendizaje se consolida y en qué momento te sientes con más calma. Aprovecha este tramo para ordenar métodos, cerrar pendientes y repetir lo que de verdad te funciona."
   },
   {
    "title": "De noviembre a enero",
    "body": "Pon atención a los malentendidos, a la necesidad de cuidado y a la forma en que expresas tu liderazgo. Haz una revisión sencilla de lo vivido y termina el ciclo con una lista breve de lo que quieres conservar."
   }
  ],
  "closing": "Casey, 2027 parece pedirte menos prisa y más precisión. No es un año para forzarte, sino para aprender a usar mejor tu fuerza: cuando eliges el ritmo correcto, el metal se vuelve más limpio y más útil. Si avanzas con atención, este ciclo puede dejarte más firme, más claro y con una confianza que no necesita ruido."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027, 지수님의 리듬을 읽는 해",
  "subtitle": "채우고, 비우고, 다시 단단해지는 흐름",
  "overview": "2027년은 지수님에게 ‘내 안의 것을 밖으로 내보내는 힘’이 커지기 쉬운 해예요. 중심 기운이 갑목이라면 원래도 곧게 자라는 나무 같은 면이 있는데, 올해는 그 나무가 열매를 맺고 그늘을 내어주는 쪽으로 기울기 쉽습니다. 오행 분포를 보면 토의 비중이 높은 편이라 현실 감각과 버티는 힘은 이미 충분한데, 화와 수가 비어 있어 열기와 유연한 순환은 의식적으로 보태 주면 더 편했을 수 있어요.\n\n그래서 올해는 ‘더 많이 하느냐’보다 ‘어떤 속도로, 어떤 방식으로 주고받느냐’가 중요해 보입니다. 초반에는 도움과 회복이 들어오고, 중반에는 익숙함과 전환이 섞이며, 여름 이후에는 성과를 밀어붙이고 책임을 정리하는 흐름이 이어져요. 지수님처럼 성취 지향이 강한 사람에게는, 한 번에 크게 바꾸기보다 구간별로 역할을 나누어 움직이는 편이 덜 소모적이었을 가능성이 큽니다.\n\n올해의 핵심은 과하게 증명하려 하기보다, 이미 가진 힘을 어디에 쓰면 좋은지 고르는 일이에요. 반안살의 기운은 이동과 자리잡기의 감각을 함께 주기 쉬워서, 새로운 위치에 적응하거나 내 자리를 재정비하는 장면도 어울립니다. 다만 2027년은 전반적으로 ‘에너지가 새는 구간’과 ‘다시 채워지는 구간’의 차이가 분명해 보이니, 작은 회복 루틴과 일정 정리만 잘해도 한 해의 체감이 꽤 달라졌을 거예요.",
  "chapters": {
   "wealth": {
    "heading": "성과를 고르는 돈의 감각",
    "body": "재물이나 성과와 관련해서는, 2027년이 ‘내가 밀어붙이면 결과가 보이기 쉬운 해’처럼 느껴지기 좋은 흐름이에요. 특히 여름 무렵부터는 주도권을 잡고 숫자나 실적을 정리하는 감각이 살아나기 쉬운데, 갑목의 성향상 한 번 방향을 잡으면 꾸준히 밀어붙이는 힘이 있어요. 다만 토가 많은 편이라 이미 책임과 기준이 많을 수 있으니, 올해는 더 벌기보다 어디에 힘을 집중할지 골라내는 쪽이 더 편했을 수 있습니다.\n\n일상에서는 ‘이건 지금 해도 되는 일’과 ‘조금 뒤로 미뤄도 되는 일’이 섞여 들어오는 장면이 떠오릅니다. 예를 들면 지출이나 성과를 따지는 자리에서, 누군가의 제안이 좋아 보여도 바로 다 받아들이기보다 조건을 한 번 더 보고 싶어질 수 있어요. 8월경에는 이동이 많아지거나 계획이 바뀌면서 돈의 흐름도 들쭉날쭉하게 느껴질 수 있으니, 급한 결정보다는 메모해 두고 비교하는 방식이 잘 맞습니다.\n\n작게 시작한다면, 올해는 ‘목표 1개, 보류 1개’처럼 우선순위를 눈에 보이게 적어두는 방법이 좋아요. 들어오는 기회를 다 잡기보다, 내 체력과 시간에 맞는 것부터 선택해 보는 거죠. 지수님에게는 이 방식이 성과를 지키면서도 과열을 줄이는 데 꽤 도움이 되었을 가능성이 큽니다."
   },
   "love": {
    "heading": "가까워졌다 멀어졌다의 리듬",
    "body": "관계와 연애에서는 초봄의 도움과 연결감, 그리고 4월의 작은 충돌감이 함께 보이는 해예요. 3월경에는 누군가와 마음이 잘 맞거나, 기존 관계가 한층 부드럽게 붙는 느낌이 들어오기 쉽고, 반대로 4월에는 익숙한 사이일수록 말의 결이 살짝 어긋나며 전환점이 생기기 좋습니다. 지수님처럼 성취를 중시하는 사람은 관계에서도 답을 빨리 내고 싶어질 수 있는데, 올해는 속도를 조절할수록 오해가 덜했을 거예요.\n\n구체적으로는 연락이 자주 오가는 시기와, 혼자 정리하고 싶은 시기가 번갈아 나타나기 쉬워요. 누군가와의 약속이 갑자기 바뀌거나, 오래 알고 지낸 사람과도 예상 밖 주제로 대화가 깊어질 수 있습니다. 5월에는 익숙해서 편한 대신 새 자극이 적어, 관계를 ‘유지’하는 감각이 강해질 수 있고, 7월에는 반안살의 분위기처럼 자리와 역할을 다시 맞춰 보는 장면이 어울려요.\n\n실행은 단순하게 가는 편이 좋습니다. 보고 싶은 사람에게는 길게 설명하기보다 핵심을 짧게 전하고, 서운함이 생기면 바로 결론을 내리기보다 하루쯤 두고 말해 보세요. 올해의 관계운은 뜨겁게 밀어붙이기보다, 온도를 맞추며 오래 가는 쪽에 더 힘이 실렸습니다."
   },
   "career": {
    "heading": "일의 판을 다시 짜는 해",
    "body": "일과 커리어에서는 2027년이 꽤 입체적으로 느껴질 수 있어요. 봄에는 도움을 받으며 자리를 잡고, 여름에는 내가 가진 것을 밖으로 내보내며 존재감을 키우고, 가을에는 책임과 압박 속에서 속도를 조절하는 흐름이 이어집니다. 거목·성취형이라는 유형답게, 지수님은 스스로 기준을 세우고 끝까지 밀어붙이는 데 강점이 있는데, 올해는 그 강점을 ‘지속 가능한 방식’으로 바꾸는 것이 관건이에요.\n\n현실에서는 새로운 역할을 맡거나, 기존 역할의 폭이 넓어지는 장면이 떠오릅니다. 6~7월에는 결과물을 보여주거나 발표하는 일, 누군가에게 설명하고 설득하는 일이 잦아질 수 있고, 10~11월에는 책임이 늘면서 일정 관리가 더 중요해질 수 있어요. 이때는 한 번에 다 처리하려 하기보다, 먼저 해야 할 일과 나중에 해도 되는 일을 나누는 편이 훨씬 편했을 겁니다.\n\n작은 실행으로는 주간 단위의 정리 습관이 잘 맞아요. 월요일에 할 일 3개만 정하고, 금요일에는 ‘이번 주에 잘된 점 1개’만 적어보는 식이죠. 올해 커리어의 핵심은 더 빠르게 달리는 것이 아니라, 지치지 않고 오래 가는 구조를 만드는 데 있었습니다."
   },
   "study": {
    "heading": "배움이 채워 주는 구간",
    "body": "배움과 공부에서는 초반과 연말의 ‘채워짐’이 분명해 보이는 해예요. 2~3월경에는 도움을 받거나 새로운 지식을 받아들이기 쉬워지고, 12월~다음 해 1월에는 다시 정리하고 흡수하는 흐름이 살아납니다. 화와 수가 비어 있는 편이라 처음엔 열정만으로 밀기보다, 설명을 듣고 구조를 잡아 주는 방식이 더 잘 맞았을 수 있어요.\n\n일상 장면으로는 누군가의 조언이 생각보다 오래 남는다거나, 혼자 끙끙대던 부분이 책 한 권이나 강의 한 번으로 풀리는 식이 떠오릅니다. 3월의 합처럼 어떤 사람과 함께 배우면 속도가 붙기 쉽고, 11월에는 겁살의 분위기처럼 비교나 압박이 느껴져도 그 긴장 덕분에 집중력이 생길 수 있어요. 중요한 건 ‘빨리 이해했다’보다 ‘제대로 쌓였다’는 감각입니다.\n\n실행은 얇고 길게 가는 편이 좋아요. 한 번에 큰 계획을 세우기보다, 매주 같은 시간에 짧게 읽고 적는 루틴을 두면 좋습니다. 지수님에게는 공부를 성과로만 보지 않고, 생각을 정리하는 도구로 쓰는 방식이 더 편안했을 가능성이 큽니다."
   },
   "health": {
    "heading": "몸과 마음의 속도 조절",
    "body": "몸과 마음의 리듬은 올해 특히 속도 조절이 중요해 보여요. 원래 목의 기운은 앞으로 뻗는 힘이 있는데, 2027년은 그 힘을 바깥으로 많이 쓰는 해라서 에너지가 새기 쉬운 편입니다. 토가 많은 구조는 버티는 힘을 주지만, 동시에 책임감과 긴장감을 오래 붙들 수 있어서, ‘괜찮아 보이는데 은근히 피곤한 상태’를 스스로 알아차리는 것이 중요해요.\n\n일상에서는 일정이 빽빽해질수록 식사, 수면, 휴식의 리듬이 흐트러지기 쉬운 장면이 떠오릅니다. 10~11월에는 책임이 늘면서 마음이 묵직해질 수 있고, 12월~1월에는 다시 채워지는 흐름이 오니 그때는 회복 쪽에 조금 더 마음을 두는 편이 좋습니다. 거창한 관리보다, 하루의 시작과 끝을 비슷한 순서로 보내는 것만으로도 체감이 달라질 수 있어요.\n\n작게 해볼 수 있는 건 아주 단순합니다. 물 마시는 타이밍, 걷는 시간, 잠들기 전 화면 끄는 시간을 하나만 정해 보세요. 지수님에게 올해의 돌봄은 특별한 이벤트가 아니라, 에너지가 빠져나가는 구멍을 조금씩 줄이는 일에 가까웠습니다."
   }
  },
  "months": [
   {
    "headline": "들어오는 도움",
    "body": "2월경에는 도움과 회복이 자연스럽게 들어와서 마음이 한결 가벼워지기 좋은 흐름이에요. 건록의 기운답게 새로 시작하는 힘도 붙으니, 급하게 달리기보다 기본기를 다시 잡아두면 좋습니다."
   },
   {
    "headline": "붙는 인연",
    "body": "3월경에는 사람 사이가 부드럽게 붙는 장면이 생기기 쉬워요. 제왕의 힘이 있어 존재감이 살아나고, 일지와 어울리는 흐름 덕분에 누군가와의 협력이 생각보다 잘 맞을 수 있습니다."
   },
   {
    "headline": "익숙함의 흔들림",
    "body": "4월경에는 편안한 익숙함 속에 살짝 부딪힘이 들어오기 쉬워요. 쇠의 분위기라 속도를 줄여 점검하는 편이 좋고, 관계나 일정에서 작은 전환이 생겨도 너무 서두르지 않는 쪽이 편했습니다."
   },
   {
    "headline": "편안한 반복",
    "body": "5월경에는 큰 자극보다 익숙한 패턴이 더 눈에 띄어요. 병의 흐름이라 무난하게 지나가기 좋지만, 망신살의 영향으로 말과 태도는 조금 더 또렷하게 챙기면 오해를 줄일 수 있습니다."
   },
   {
    "headline": "밖으로 나가는 힘",
    "body": "6월경에는 내가 가진 것을 밖으로 내보내는 힘이 커집니다. 사의 흐름이라 표현과 생산이 늘기 쉽고, 장성살의 기운이 있어 책임감 있게 밀어붙이면 결과가 보이기 좋은 시기예요."
   },
   {
    "headline": "자리 잡는 시간",
    "body": "7월경에는 반안살의 분위기처럼 내 자리와 역할을 다시 정돈하기 좋습니다. 묘의 흐름은 조용히 뿌리를 내리는 느낌이라, 사람들과의 거리와 내 페이스를 함께 맞춰보면 편했을 거예요."
   },
   {
    "headline": "움직이며 잡기",
    "body": "8월경에는 역마살의 영향으로 이동, 변경, 재조정이 잦아지기 쉬워요. 절의 흐름이라 판을 새로 짜는 감각이 강하고, 주도권을 잡는 일은 좋지만 욕심을 한꺼번에 키우지는 않는 편이 안정적입니다."
   },
   {
    "headline": "성과를 다듬기",
    "body": "9월경에는 육해살의 영향이 있어, 겉으로는 진행되는데 안쪽에서 손볼 부분이 보일 수 있어요. 태의 흐름이라 시작과 마무리 사이가 유연하니, 결과를 더 키우기보다 틀을 정리하는 데 집중하면 좋습니다."
   },
   {
    "headline": "무게가 실리는 달",
    "body": "10월경에는 책임이 또렷해지고 속도를 고르는 감각이 중요해집니다. 양의 흐름과 화개살의 분위기가 겹쳐, 혼자 정리하고 생각을 가다듬는 시간이 오히려 힘이 되어 줄 수 있어요."
   },
   {
    "headline": "압박 속의 단단함",
    "body": "11월경에는 해야 할 일이 늘며 마음이 쉽게 바빠질 수 있습니다. 장생의 흐름은 오래 가는 힘을 주고, 겁살의 긴장은 집중력을 키우니, 비교보다 기준을 지키는 쪽이 더 도움이 됩니다."
   },
   {
    "headline": "다시 채워짐",
    "body": "12월경에는 도움과 회복이 다시 들어와 숨을 고르기 좋아요. 목욕의 흐름이라 정리와 비움이 함께 일어나고, 재살의 기운은 남은 과제를 조심스럽게 마무리하도록 이끕니다."
   },
   {
    "headline": "새해 앞의 정돈",
    "body": "2028년 1월경에는 다시 한 번 채워지고 준비하는 감각이 살아납니다. 관대의 흐름은 태도를 넓혀 주고, 천살의 분위기는 계획을 너무 크게 벌리기보다 기본을 다지는 쪽이 편하다고 말해 줍니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경",
    "body": "지켜볼 흐름: 도움을 받는 일과 작은 충돌이 함께 들어와, 관계와 일정의 균형이 중요해 보여요. 해볼 행동: 중요한 약속은 바로 확답하기보다 하루 안에 다시 확인하고, 메모로 정리해 두세요."
   },
   {
    "title": "5~7월경",
    "body": "지켜볼 흐름: 익숙함 속에서 표현과 생산이 늘어나며 에너지가 빨리 소모되기 쉬워요. 해볼 행동: 한 주에 꼭 해야 할 일 3개만 남기고, 나머지는 다음 주로 넘겨도 되는지 구분해 보세요."
   },
   {
    "title": "8~10월경",
    "body": "지켜볼 흐름: 주도권을 잡고 성과를 밀어붙이기 좋지만, 이동과 재조정이 잦아질 수 있어요. 해볼 행동: 계획을 두 칸으로 나눠 ‘지금 처리’와 ‘보류’로 적어두면 과욕을 줄이는 데 도움이 됩니다."
   },
   {
    "title": "11월~다음해 1월경",
    "body": "지켜볼 흐름: 책임이 늘었다가 다시 채워지는 흐름이 이어져, 마무리와 회복을 함께 챙기는 편이 좋아요. 해볼 행동: 하루 끝에 10분만 써서 일정, 지출, 감정 중 하나를 가볍게 정리해 보세요."
   }
  ],
  "closing": "지수님, 2027년은 크게 한 번에 바꾸는 해라기보다, 흐름을 읽으며 힘을 나누어 쓰는 해에 가까워 보여요. 잘 밀어붙여야 할 때와 잠깐 물러서야 할 때를 구분할수록, 올해의 성과와 관계는 더 편안하게 자리를 잡았을 가능성이 큽니다. 무엇보다 이미 가진 단단함이 충분하니, 거기에 회복의 리듬만 조금 보태 보세요."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, un año para afinar tu ritmo",
  "subtitle": "Lucía, un ciclo de fuego que pide iniciativa, cuidado y buen criterio",
  "overview": "2027 trae una energía de fuego que no te empuja a esconderte, sino a tomar la iniciativa con más decisión. Como tu Maestro del Día es agua y en tu mapa hay mucho tierra y también bastante agua, este año puede sentirse como una mezcla muy interesante: por un lado, ganas de mover recursos, ordenar resultados y hacer que las cosas rindan; por otro, necesidad de no ir demasiado rápido ni cargar con más de lo necesario. Para ti, Lucía, el tono general favorece el avance con propósito, pero premia mucho más la claridad que la prisa.\n\nTu tipo de mapa, El rocío · Orden, sugiere que te sientan bien los procesos limpios, los pasos medidos y las ideas que se convierten en forma concreta. En 2027 eso puede verse como un año útil para dar estructura a lo que ya sabes hacer, mostrar tu valor sin exagerarlo y elegir bien dónde pones tu energía. Cuando el fuego se active, conviene observar si estás construyendo algo sólido o solo acelerando por impulso; cuando aparezca más recogimiento, te ayudará volver a tu centro y revisar lo que de verdad quieres sostener.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso claro",
    "body": "En lo material, 2027 se ve como un año favorable para mover recursos con iniciativa y buscar resultados visibles. Como el fuego de este ciclo te favorece para tomar el control de lo que produces, puede haber más facilidad para negociar, impulsar proyectos propios o darles forma a ingresos que dependan de tu criterio. La parte a cuidar es el exceso de empuje: con tanta tierra en tu mapa, a veces conviene distinguir entre construir y acumular por inercia.\n\nEn la vida diaria, esto puede verse en decisiones como ordenar gastos con más intención, revisar qué esfuerzos sí te devuelven valor y cuáles solo te consumen tiempo. También puedes notar que algunas oportunidades aparecen cuando muestras con más nitidez lo que sabes hacer, sin esperar a que todo esté perfecto. Si te sirve, Lucía, piensa en este año como uno para hacer rendir mejor lo que ya tienes antes de buscar más cantidad.\n\nUn buen comienzo sería anotar durante unas semanas en qué se te va el dinero y en qué se te va la energía, porque a veces son la misma cosa. Luego, elige una sola mejora concreta: una forma de cobrar mejor, un gasto que simplificar o una tarea que puedas convertir en algo más útil."
   },
   "love": {
    "heading": "Vínculos que se encienden",
    "body": "En relaciones, 2027 puede traer más presencia, más iniciativa y también más necesidad de hablar claro. El fuego tiende a sacar a la superficie lo que estaba contenido, así que los vínculos pueden volverse más directos, más visibles y, en algunos momentos, más exigentes con tu tiempo y tu atención. Para tu naturaleza de agua, eso puede sentirse estimulante si hay sinceridad, pero pesado si todo se vuelve demasiado intenso.\n\nEn lo cotidiano, podrías notar conversaciones que aclaran expectativas, planes que se mueven con rapidez o personas que responden mejor cuando tú marcas con naturalidad lo que quieres. También puede haber etapas en las que te convenga escuchar más de lo que explicas, para no convertir una buena conexión en un intercambio agotador. El año favorece los lazos que respetan tu ritmo y no te obligan a estar en guardia todo el tiempo.\n\nTe ayudará mucho empezar por gestos simples: responder con honestidad, no prometer más de lo que puedes sostener y reservar espacios donde puedas estar sin actuar. Si una relación pide más cuidado, puedes mostrarlo con constancia pequeña, no con grandes declaraciones."
   },
   "career": {
    "heading": "Trabajo con más visibilidad",
    "body": "En trabajo y carrera, este año favorece tomar la delantera, mostrar resultados y dar forma concreta a lo que haces. La relación entre tu energía y la del año sugiere que puedes mover asuntos con bastante eficacia, sobre todo si te apoyas en tu capacidad de ordenar y en tu sentido práctico. A la vez, tu mapa tiene poco metal, así que conviene sostener el criterio y la revisión: no todo lo que avanza rápido merece tu sí inmediato.\n\nEn la vida diaria, eso puede traducirse en más tareas que dependen de tu iniciativa, más ojos puestos en tu manera de resolver y más ocasiones para demostrar solvencia. Puede ser un buen momento para presentar ideas, asumir responsabilidades que sí te interesan o simplificar procesos que antes estaban dispersos. Lo importante será no confundir visibilidad con sobrecarga; brillar no tiene por qué significar cargar con todo.\n\nPara empezar, elige una sola área profesional donde quieras dejar huella este año y define cómo se verá un avance real allí. Después, revisa cada propuesta con una pregunta sencilla: ¿esto suma a lo que quiero construir o solo me mantiene ocupada con ruido?"
   },
   "study": {
    "heading": "Aprender con foco",
    "body": "En aprendizaje, 2027 favorece estudiar con intención práctica, no solo acumular información. Tu tipo de mapa, ligado al orden, suele agradecer métodos claros, y este ciclo puede ayudarte a convertir ideas dispersas en conocimientos útiles. Como el fuego empuja a actuar, aprenderás mejor cuando veas enseguida para qué sirve lo que estás incorporando.\n\nEn el día a día, esto puede aparecer como interés por cursos breves, lecturas aplicadas o conversaciones que te dejan una idea concreta para usar. También podrías notar que aprendes más cuando enseñas, resumes o conviertes lo leído en una nota propia. Si intentas abarcar demasiado a la vez, el interés puede diluirse; en cambio, con un objetivo pequeño y bien elegido, la mente responde mejor.\n\nUna forma amable de aprovecharlo es escoger un tema central por temporada y darle continuidad en lugar de abrir demasiados frentes. Puedes subrayar, resumir y repetir con tus palabras; eso te ayudará a fijar mejor lo que importa y a sentir que estudias con dirección."
   },
   "health": {
    "heading": "Cuidarte sin exceso",
    "body": "En bienestar cotidiano, 2027 pide equilibrio entre impulso y pausa. Con tu combinación de agua y tierra, a veces sostienes mucho sin darte cuenta, y este año puede mostrarte con más claridad cuándo te conviene bajar un cambio para no vivir solo desde la exigencia. El tono general no habla de fragilidad, sino de la importancia de administrar bien tu energía y de no convertir la productividad en costumbre automática.\n\nEn lo diario, esto puede verse en momentos en que tu cuerpo y tu ánimo te piden orden: dormir con más regularidad, comer con horarios más estables, hacer pausas reales o dejar de llenar cada espacio libre. También puede aparecer una necesidad fuerte de silencio, de estar a solas un rato o de tener un mundo interior más protegido, y eso no es aislamiento: es recarga. Si respetas esos momentos, el resto del año se vuelve más llevadero.\n\nTe conviene empezar con algo sencillo y sostenible, como una rutina breve al despertar o al cerrar el día. No busques hacerlo perfecto; busca que te devuelva centro. En este año, cuidarte también es elegir menos ruido."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "Este mes se siente cercano a tu propio tono, pero con más sensibilidad a los malentendidos. Puede ser un buen inicio para observar qué te toca de cerca y qué te conviene aclarar con calma. Las cosas pequeñas pesan más de lo normal, así que conviene leer dos veces antes de responder."
   },
   {
    "headline": "Marzo despierto",
    "body": "Aquí el movimiento sigue siendo familiar, pero con un impulso de brote y liderazgo. Es un mes útil para tomar una pequeña iniciativa que venías postergando, aunque todavía no haga mucho ruido. Si das un paso concreto, el entorno tiende a notarlo."
   },
   {
    "headline": "Abril visible",
    "body": "La energía del mes te pide producir, expresar y dar algo de ti, con un costo de energía que conviene medir. El reconocimiento puede aparecer cuando haces algo útil sin adornarlo demasiado. Mejor poco y bien que mucho y disperso."
   },
   {
    "headline": "Mayo en marcha",
    "body": "Este mes favorece sembrar ideas, movimientos y deseos de cambio. Puede darte ganas de moverte más, probar otra ruta o iniciar algo que estaba dormido. Si eliges un solo frente, la energía trabaja a tu favor con más claridad."
   },
   {
    "headline": "Junio de mando",
    "body": "Aquí el año se vuelve más favorable para tomar decisiones, buscar resultados y empujar asuntos materiales. Al mismo tiempo, los pequeños tropiezos aparecen si te apresuras demasiado. Te conviene revisar detalles antes de cerrar cualquier paso importante."
   },
   {
    "headline": "Julio interior",
    "body": "El mes invita a mirar hacia dentro mientras sigues con capacidad de dirigir lo que te importa. Puede ser un buen momento para ordenar prioridades y decidir desde un lugar más sereno. Lo que no necesita urgencia gana calidad si lo dejas madurar un poco."
   },
   {
    "headline": "Agosto exigente",
    "body": "La energía del mes te pone frente a más responsabilidad y más atención sobre lo que administras. Si marcas tu ritmo con cuidado, puedes salir más firme de esta etapa. Conviene vigilar recursos, tiempos y compromisos para no dispersarte."
   },
   {
    "headline": "Septiembre de giro",
    "body": "Este mes aprieta un poco más y puede traer roces o tensiones que te obligan a cambiar de enfoque. No hace falta forzar una solución inmediata; a veces el giro útil nace de ajustar la forma de responder. El cuerpo y la agenda agradecen una marcha más prudente."
   },
   {
    "headline": "Octubre aliado",
    "body": "Aquí entra ayuda, aprendizaje y una sensación de recuperación que suaviza lo anterior. Además, hay una facilidad especial para que algo encaje con naturalidad, como si una pieza encontrara su lugar. Aprovecha para escuchar consejos y aceptar apoyos sin complicarte."
   },
   {
    "headline": "Noviembre amplio",
    "body": "El mes trae más plenitud y un cambio de aire que renueva la perspectiva. Puede ayudarte a ver opciones donde antes veías solo continuidad. Si buscas un nuevo ángulo, este periodo suele responder bien a la curiosidad tranquila."
   },
   {
    "headline": "Diciembre magnético",
    "body": "La energía vuelve a parecerse a la tuya, con un efecto de fruto después del esfuerzo. También puede notarse más magnetismo en la forma en que te expresas o te presentas. Es buen momento para sostener lo logrado sin querer abarcar más de lo necesario."
   },
   {
    "headline": "Enero paciente",
    "body": "El cierre del ciclo se siente conocido, con más confianza y una espera que no incomoda tanto si la tomas como preparación. Es un mes para afinar lo que ya funciona y dejar que el siguiente movimiento madure. Lo que hagas con calma aquí puede darte una base más limpia para empezar de nuevo."
   }
  ],
  "action_plan": [
   {
    "title": "Febrero a abril: afinar el inicio",
    "body": "Vigila si la sensibilidad te lleva a reaccionar rápido o a leer demasiado entre líneas. Prueba con una acción pequeña y concreta: escribir lo que quieres aclarar antes de hablarlo, o definir un objetivo simple para el primer trimestre."
   },
   {
    "title": "Mayo a julio: empujar con medida",
    "body": "Observa dónde se abre una oportunidad para producir más o dirigir mejor, y dónde el impulso puede volverse exceso. Haz una sola apuesta práctica: ordenar un proyecto, negociar una mejora o poner límites a una carga que ya no conviene."
   },
   {
    "title": "Agosto a octubre: sostener el cambio",
    "body": "Fíjate en qué responsabilidades te fortalecen y cuáles solo te tensan. Elige una rutina de apoyo concreta, como revisar agenda cada semana o reservar un espacio fijo para descansar la mente, y úsala como base mientras pasan los ajustes."
   },
   {
    "title": "Noviembre a enero: cerrar y preparar",
    "body": "Mira qué aprendiste de este año y qué merece seguir contigo sin ruido. Haz un cierre simple: anota tres cosas que sí funcionaron y una sola intención para el nuevo ciclo, para entrar en él con más claridad."
   }
  ],
  "closing": "Lucía, 2027 no se siente como un año para correr sin mapa, sino para avanzar con intención y buen pulso. Cuando uses tu claridad para ordenar, tu energía para construir y tu sensibilidad para no sobrecargarte, este ciclo puede dejarte resultados muy sólidos. Lo más valioso estará en elegir bien dónde poner tu fuego."
 }
};
