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
   "title_line1": "When the work is done, your mind keeps the door open",
   "title_line2": "You finish it all, then keep checking for what could still go wrong",
   "subtitle": "Module 3 Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late enough that the room has gone quiet, but your phone still feels loud in your hand. You’ve already finished the task, and yet your eyes keep going back over the same lines, as if one more check could finally let your body relax. Then a Monday-morning message appears, and the tension snaps back on before you’ve even stood up from the chair. By the time you finally stop, you’re tired and a little anxious, with the thought still running that resting means falling behind. Sam, doesn’t this sound like you lately?",
   "case_tag": "EXAMPLE CASE — Daniel, early 30s, office deadlines",
   "case_paragraphs": [
    "Daniel finishes his deliverable at night, but instead of closing the laptop, he opens the file again to scan for tiny errors he already fixed twice. His Five Elements pattern has a strong Wood presence and no Fire, so his energy keeps pushing forward while warmth and ease never quite catch up. By Monday morning, he is already bracing for the next message before the first one even lands. That kind of loop is exactly where you may recognize yourself too."
   ],
   "oheng_intro": "Your Five Elements are Wood 25%, Fire 0%, Earth 25%, Metal 25%, and Water 25%, so the chart is balanced everywhere except for Fire, which is absent. With a Day Master of Earth, your strong Wood shows up as pressure, rules, and responsibility pressing on you, while your missing Fire is the support, learning, and protection that would help soften the edge. In a burnout report, that split shows up exactly where you feel it most: you keep going by force, but the part that should help you recover is too quiet.",
   "quiz_reading": "Your burnout profile shows Perfectionism at 82% and Recovery at 34%, and that combination fits the Finisher's Drain type. You don’t just want the work done; you want it sealed, checked, and checked again, so even a finished task keeps living in your head. Then rest arrives, but it doesn’t land as rest, which is why a day off can still feel uneasy rather than empty.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — the pressure that keeps reaching for one more thing",
     "body": "Your Wood sits at 25%, which is strong enough to shape the whole room, even if it isn’t the largest number on the page. With an Earth Day Master, that Wood feels like pressure, responsibility, and a constant sense that something still needs to be handled. That is why a Monday-morning message can hit so hard for you; it doesn’t just arrive, it asks you to stand back up inside your own mind. You can carry a lot, but you also feel carried by what’s waiting for you."
    },
    "fire": {
     "heading": "🔥 Fire weak — the warmth that should help you breathe again",
     "body": "Your Fire is 0%, so the part of the chart that should bring warmth and ease is completely absent. The Wood that feeds Fire is the one relationship your chart gives here, which means your drive can generate the need for relief, but the relief itself does not show up on its own. That matches the line you gave in counseling: you rest, but it never feels like resting. You’re not lacking effort; you’re lacking the felt permission to let effort cool down."
    },
    "earth": {
     "heading": "⛰️ Earth even — the part of you that holds steady under load",
     "body": "Your Earth is 25%, so steadiness is present, not missing, but it has to share the stage with the pressure around it. Because you are an Earth Day Master, this is the part of you that wants things to be solid, complete, and dependable before you let them go. In burnout, that can look like staying with a task long after the useful part is done, just to make sure nothing wobbles. You are built to hold things together, and that makes unfinished certainty feel harder to tolerate."
    },
    "metal": {
     "heading": "💎 Metal even — the eye that notices what still isn’t right",
     "body": "Your Metal is 25%, so your mind has enough precision to spot small gaps without needing to be told they are there. That helps explain why you go back and re-check everything after finishing a task. In the same way, a message arriving on Monday morning can feel less like information and more like a test of whether every detail was truly under control. You notice what is off, and that noticing keeps the loop alive."
    },
    "water": {
     "heading": "💧 Water even — the part that keeps your thoughts moving after the work is done",
     "body": "Your Water is 25%, so reflection and mental movement are steady features of your chart. That is the side that keeps replaying the task after it is complete, looking for what could have been missed or what comes next. In a burnout pattern, that means your mind does not shut the door just because the job is done. You keep thinking, and that thinking is part of why rest feels thin instead of full."
    }
   },
   "upcoming_period_heading": "40 years onward, Earth takes the lead",
   "upcoming_period_body": "At 40 years old, your next 10-year cycle begins, and Earth becomes stronger than it is now. The pace changes from pushing and checking to building something that can actually hold your energy without draining it so fast. For you, that means the work stops demanding constant re-verification and starts asking for structure that lasts. What helps now is not more force, but cleaner boundaries and a way to let completion stay complete.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism is not just high effort; it is the exact reason the task stays open in your head after it is done. The Wood pressure in your chart keeps asking for one more correction, and that is why finishing does not feel finished. When your mind goes back to the file, it is trying to buy certainty with another check.",
    "Your 34% Recovery explains why the uneasy feeling stays even on a day off. With Fire at 0%, the chart gives you drive and precision, but not enough warmth to make rest land as rest. So the body pauses, while the mind keeps listening for the next Monday-morning message."
   ],
   "answer_notes": [
    "Your choice to go back and re-check everything shows a mind that treats closure as something earned, not assumed. In daily life, that can look like reopening a task right after you’ve sent it, just to make sure nothing slipped past you. The strength in that answer is care, but you’ll want to notice when care has turned into self-overwatch.",
    "Your answer about feeling uneasy even when you rest shows that recovery is not just about time off for you; it is about permission. That can show up as a quiet day that still feels tense, because part of you is waiting to be called back in. If that is your pattern, the useful move is not to force relaxation, but to make rest feel allowed."
   ],
   "chat_snapshot_note": "You said the central problem clearly: you rest, but it never feels like resting. That sits right next to the tired, a little anxious feeling you named, which tells me this is not laziness or lack of discipline but a body that never fully gets the signal to stand down. The line to keep is this: you are not failing to rest; your system is still waiting for permission.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they don’t just bring tasks back — they reactivate the whole internal check-and-recheck loop. That fits your high Perfectionism, and it also fits your strong Wood, which turns pressure into movement before your body has caught up. So the message is small, but what it wakes up in you is already large.",
   "chat_repeat_note": "Cramming, then crashing is the shape of the loop you described. You push until the work is finally done, then your system drops all at once instead of easing down gradually. A small way to step out of it is to stop one stage earlier than you usually do and leave a deliberate handoff, so the ending is not only inside your head.",
   "chat_fear_note": "The fear that stopping means falling behind makes perfect sense in a chart and a life that both lean toward pressure. Under that fear is a real wish: you want to stay responsible without becoming trapped by responsibility. You do not want less care; you want care that does not cost you the whole night.",
   "psychology_fact_heading": "Perfectionism and recovery imbalance",
   "psychology_fact_body": "Perfectionism is the tendency to set very high standards and keep evaluating whether the result is good enough, even after the task is already complete. Low recovery means the mind and body do not easily shift into a state that feels restored, so downtime can stay tense instead of settling. In your case, the high checking after completion and the uneasy feeling on days off fit that pattern closely. The result is not just hard work, but work that keeps living on after the work itself is done.",
   "psychology_takeaway": "You are not short on effort; you are stuck in the aftertaste of effort. What needs help is not your willingness to work, but your ability to let completion stay closed.",
   "strengths": [
    {
     "title": "Strong follow-through",
     "body": "You do not leave things half-finished, and your 82% Perfectionism shows how seriously you take completion. That is why you go back and re-check everything after a task; you want the result to be solid, not merely sent. In the right setting, that makes you the person who catches what others miss."
    },
    {
     "title": "Sharp noticing",
     "body": "Your 25% Metal gives you a clean eye for what still feels off, even when everyone else has moved on. That is part of why Monday-morning messages can snap your attention back so quickly; you register the shift before you can talk yourself out of it. The strength here is accuracy, because you know when something still needs care."
    },
    {
     "title": "Steady endurance",
     "body": "Your 25% Earth gives you enough steadiness to keep holding the line when the day gets heavy. Even when you feel tired and a little anxious, you still keep the work moving until it is done. That endurance is real, and it is one reason people can rely on you."
    },
    {
     "title": "Persistent thought",
     "body": "Your 25% Water keeps your mind active after the task is over, which can be draining, but it also means you rarely miss the thread. You remember what happened, what might happen next, and what still needs attention. In a better rhythm, that same persistence becomes foresight."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard closure",
     "body": "With 82% Perfectionism, it is difficult for you to trust that a task is done once it is done. That is why you reopen files, reread messages, and keep looking for the tiny thing that might still be wrong. The cost is not only extra time; it is the way your mind stays in the job long after your hands have left it."
    },
    {
     "title": "Thin recovery",
     "body": "Your 34% Recovery means rest does not automatically feel restorative. A day off can still feel uneasy, because the body is pausing while the mind keeps listening for work. That makes true downtime hard to recognize in the moment."
    },
    {
     "title": "Pressure rebound",
     "body": "Your strong Wood makes external demands land as internal pressure very quickly. A Monday-morning message can flip the switch from quiet to alert in one step. Once that happens, it is easy for you to move from careful work into overdrive."
    },
    {
     "title": "Crash after push",
     "body": "Cramming, then crashing is the shape your energy tends to take when you keep going too long. You can stay productive for a stretch, but the drop afterward comes all at once. The hard part is that the crash often arrives after the job is already finished, when you expected relief instead."
    }
   ],
   "fit_good": "You do best in a workplace where deadlines are clear, but the ending is allowed to stay ended. A calm handoff, a defined checklist, and fewer surprise pings after hours will help your mind stop reopening the same task. You are at your best when your effort has structure, not constant emergency.",
   "fit_bad": "You will struggle in a setting where messages keep arriving without boundaries and every finished task gets treated like a draft. Work that depends on instant replies, constant re-checking, and unclear priorities will keep your nervous system on alert. A Monday that starts with scattered pings can drain you before the day has really begun.",
   "behavior_guides": [
    {
     "title": "One final check",
     "body": "When you finish a task, give yourself one planned re-check only, and do it right away. Set a 10-minute timer, review the work once, and then close the file for the day. That turns checking from a loop into a boundary."
    },
    {
     "title": "Rest with proof",
     "body": "On a day off, write down the exact time you stopped working and the first thing you did that was not work-related. Keep that note visible for the rest of the day. It helps your mind see that rest happened, even if it did not feel dramatic."
    },
    {
     "title": "Message buffer",
     "body": "Before Monday starts, leave a short note for yourself with the first three tasks and the first reply you do not need to send yet. Read it once in the morning instead of checking every thread. That gives your mind a container before the messages start pulling at it."
    },
    {
     "title": "Stop point",
     "body": "Pick a daily stop time and protect it for five days in a row. When that time arrives, write one line about what is done and one line about what can wait. The point is not to relax perfectly; it is to teach your system that work can end without a second ending."
    }
   ],
   "mindset_guide": "Think of your energy like a desk lamp, not a spotlight. A spotlight keeps demanding a wider and wider beam, while a desk lamp does its job and then can be switched off. Right now, your mind keeps trying to light the whole room after the task is finished. The shift for you is learning that a finished task can stay finished even when the light is no longer on it.",
   "closing_title": "What can finally stay closed",
   "closing_body": "At 40 years old, your next 10-year cycle brings stronger Earth, and that steadier ground changes the shape of your days. The work becomes less about proving you did enough and more about building a rhythm that does not keep draining you after hours. In this burnout pattern, the feeling that used to stay tight starts to loosen, and rest begins to feel like rest rather than a second job. What you will want to keep is simple: finish the task, close the file, and let the ending count."
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
 "riley": {
  "content": {
   "title_line1": "When the work is done, your mind keeps the ledger open",
   "title_line2": "And even rest starts to feel like another task you have to finish",
   "subtitle": "Module 3: Burnout deep report — Saju × psychology × counseling integration",
   "opening_scene": "It’s late, the room is quiet, and your phone lights up with Monday-morning messages before the day has even started. You’ve already finished the task, but your hand still drifts back to the screen to check one more detail, then one more. The body is trying to rest, while the mind keeps asking whether something was missed. Riley, isn’t this the kind of night where you’re lying still, but nothing inside you has actually clocked out?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, a relationship that never fully switches off",
   "case_paragraphs": [
    "Mina finishes her work, puts her phone down, and still circles back to re-check the same message thread before bed. Her day looks done from the outside, but her mind keeps editing the ending. Her Five Elements are also tilted in a way that keeps her pushing with the same self-driven energy and not enough release. You would recognize yourself in the way she never fully lets the day end."
   ],
   "oheng_intro": "Your Five Elements are strongly Wood at 50%, with Earth and Water both at 25%, while Fire and Metal are both at 0%. As the Day Master is Wood, that means the strongest current in you is the same kind of energy as your own center: self-driven, active, and hard to put down. Metal is weak here, so the pressure of rules, duty, and outside demands does not get much natural support, and that is why this burnout module shows up as checking, bracing, and never fully letting go.",
   "quiz_reading": "Your result, Finisher's Drain, fits the 82% perfectionism peak and the 34% recovery dip almost too neatly. That combination shows up as the habit of re-opening what you already completed, not because the work is bad, but because your mind refuses to trust closure. On a day off, that can look exactly like you said it: you rest, but it never feels like resting.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — the branch that keeps reaching after the fruit is picked",
     "body": "At 50%, Wood is the loudest part of your chart, and as the Day Master it feels like the same force that keeps you moving from the inside. In your burnout pattern, that shows up as finishing a task and then going back to re-check everything, as if closure only counts after one more pass. It also explains why your own drive can become the thing that keeps you from feeling done. You don't just work hard, Riley — you keep carrying the work after it should have been put down."
    },
    "fire": {
     "heading": "🔥 Fire weak — the spark that never gets a full turn",
     "body": "Fire sits at 0%, so the visible flash of ease, release, and clear outward warmth is not doing much of the lifting here. That can make your effort feel very internal: a lot of pushing, a lot of thinking, and not much natural exhale after the task is over. In a week like yours, the result is simple and familiar: the work may be finished, but the feeling of being finished does not arrive with it. Riley, this is why even good progress can still leave you tense."
    },
    "earth": {
     "heading": "⛰️ Earth solid — the ground that holds the load in place",
     "body": "Earth makes up 25% of your Five Elements, so you do have some steadiness, but it is not the force that takes over the room. In a burnout week, that can look like holding a lot together long enough to get through the day, then feeling the weight all at once when the pace stops. Earth also matters later, because the 10-year cycle from age 46 to 55 brings stronger Earth energy, and that can make structure feel more natural than it does now."
    },
    "metal": {
     "heading": "💎 Metal weak — the edge that feels heavy when it finally shows up",
     "body": "Metal is 0%, so the energy of rules, boundaries, and clean separation does not come easily on its own. Because Earth helps feed Metal, the chart shows that this is something that needs support rather than something that arrives automatically. In daily life, that can look like reading Monday messages and immediately treating them like a demand you must answer with perfect care. Riley, this is why stopping can feel less like rest and more like risking a mistake."
    },
    "water": {
     "heading": "💧 Water moderate — the current that keeps running underneath the surface",
     "body": "Water is 25%, which gives your chart a quieter inner flow than the louder Wood energy above it. In burnout terms, that can look like the tiredness and uneasiness you named: the body wants to settle, but the mind keeps moving under the surface. It is the part of you that notices the drift in your energy before anyone else does. Riley, that is why you can look fine while already feeling worn down inside."
    }
   },
   "upcoming_period_heading": "46 years old: Earth begins to take the lead",
   "upcoming_period_body": "46 years old marks the start of a 10-year cycle where Earth grows stronger. The pace shifts from pure pushing to something more grounded, more structured, and less dependent on constant mental re-checking. For you, that means the way you handle closeness, work, and recovery starts to change in a way that feels more contained and less scattered. Riley, this is the period where building steadier rhythms will matter more than forcing another round of effort.",
   "cross_analysis_quotes": [
    "Your 82% perfectionism and 50% Wood are speaking the same language: you don't just want the job done, you want it sealed properly. That is why your mind goes back to re-checking after completion, as if the final mark still needs your hand on it. Riley, the work is finished, but your inner standard keeps asking for one more pass.",
    "Your 34% recovery and 0% Metal line up around the same tension: rest exists, but it does not feel cleanly separated from duty. That is why Monday-morning messages can cut straight through your day off and pull you back into vigilance. Riley, the part that needs recovery is also the part that keeps bracing for the next demand."
   ],
   "answer_notes": [
    "Going back to re-check everything shows how tightly you tie completion to certainty. In daily life, that can look like reopening a finished message, a closed file, or a task you already sent because your mind wants one more proof. Riley, the next time you notice that pull, treat it as a sign that your standards are active, not that the work is still unfinished.",
    "Feeling uneasy even when you rest shows that rest has been landing in the same mental space as effort, not outside it. That is why a day off can still feel populated by unfinished thoughts, notifications, and the sense that you should be ready. Riley, you chose the answer that admits your body is pausing while your vigilance keeps standing guard."
   ],
   "chat_snapshot_note": "Your core complaint is not that you never stop; it’s that stopping does not feel like stopping. That lands right beside the tired, a little anxious state you described, where the body is off-duty but the mind keeps checking the door. Riley, the line worth saving is this: you are not failing to rest, you are resting under surveillance.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they turn private recovery time back into public readiness in one second. They also fit the shape of your high-perfectionism, low-recovery pattern: the message itself may be ordinary, but your system reads it as a call to re-engage. Riley, that is why a simple notification can feel bigger than the message it carries.",
   "chat_repeat_note": "Your pattern is cram, then crash, and the crash does not come from laziness — it comes from how much you packed into the first part. In the middle of that cycle, you keep choosing one more push, one more check, one more hour, until the system drops out all at once. A smaller exit helps here: stop one step earlier, while the day is still yours.",
   "chat_fear_note": "The fear underneath this is not just falling behind; it is what falling behind would mean about you. That means the anxiety is carrying a need to stay worthy, not just a need to stay on schedule. Riley, the wish under the fear is simpler than it sounds: you want to rest without losing your place.",
   "psychology_fact_heading": "Perfectionism and recovery research",
   "psychology_fact_body": "In psychology, perfectionism is often linked to self-monitoring that stays active even after a task is complete, while low recovery means the system does not fully downshift after effort. That combination fits your result well: a high need to check and a low ease in switching off. It helps explain why a finished task can still feel mentally open, and why rest can feel unfinished too. Riley, the pattern is not that you lack effort — it is that effort has trouble ending.",
   "psychology_takeaway": "Your mind is treating completion like a checkpoint, not a finish line. That is why rest keeps getting interrupted by your own standards.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half-done, and your 82% perfectionism shows how carefully you protect the quality of what you finish. In real life, that means you are the person who notices the detail others miss and goes back to make it right. Riley, the same trait that wears you out is also the one that keeps your work solid."
    },
    {
     "title": "Self-awareness",
     "body": "You can already name the exact shape of your strain: you rest, but it never feels like resting. That level of recognition matters because it means the problem is not hidden from you anymore. Riley, when you can say the pattern that clearly, you are already one step closer to changing it."
    },
    {
     "title": "Persistent drive",
     "body": "Your 50% Wood gives you a strong inner push that does not need much external pressure to keep going. In a normal day, that can look like carrying a project through the last mile even when your energy is thin. Riley, your drive is not small — it just needs a place to stop."
    },
    {
     "title": "Quiet stamina",
     "body": "Your 25% Water gives you a quieter kind of endurance under the surface, even when you feel tired and a little anxious. That is the part of you that keeps functioning while the rest of you is already asking for a pause. Riley, this is why you can look composed while feeling worn down inside."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "The habit of going back to re-check everything keeps your mind attached to work after the work is done. It can make a finished task feel unfinished for hours. Riley, this is not carelessness — it is care stretched past its useful point."
    },
    {
     "title": "Hard stops",
     "body": "Your recovery score at 34% shows that stopping does not come with a clean internal switch. That is why a day off can still feel like you are half on duty. Riley, the pause is there, but it does not yet feel sealed."
    },
    {
     "title": "Monday reactivation",
     "body": "Monday-morning messages switch your nervous system back on fast, even before the day has really started. The message itself is small, but the meaning you attach to it is large. Riley, that is why the week can restart inside your chest before it restarts on the calendar."
    },
    {
     "title": "Crash after push",
     "body": "You cram, then crash, which means the cost of getting through the first phase shows up all at once in the second. The pattern is efficient in the short term and punishing in the longer one. Riley, the hard part is not that you work too little — it is that you wait too long to let yourself stop."
    }
   ],
   "fit_good": "You do best in a relationship rhythm where messages are not treated like instant tests. A partner who can leave space between contact and response helps your system stay softer, especially on Mondays. Riley, you need a connection that does not turn every pause into a problem.",
   "fit_bad": "You struggle in a relationship style where every unread message feels like a silent verdict. Environments that reward constant availability will keep your mind on alert even when you are trying to rest. Riley, a relationship should not make your off-hours feel like a performance review.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "When you finish a task, spend two minutes writing down the one thing that is truly done and stop there. Do this once at the end of the workday, not every time a message arrives. Riley, the goal is to teach your mind that closure can be recorded without being re-opened."
    },
    {
     "title": "Protect recovery",
     "body": "Choose one off-hour block each week and keep it free from checking, even if the urge arrives. Start with 30 minutes, then stretch it only after that feels stable. Riley, recovery gets stronger when it is treated like part of the plan, not a reward."
    },
    {
     "title": "Delay the reply",
     "body": "When Monday-morning messages come in, wait ten minutes before answering unless something is truly urgent. Use that gap to breathe, stand up, and let your body learn that not every ping needs immediate action. Riley, the space between message and reply is where your nervous system starts to soften."
    },
    {
     "title": "Stop one step earlier",
     "body": "At the point where you usually begin one more check, stop and close the screen instead. Try this at least once a day, especially after a task is already completed. Riley, the smallest clean stop is often the one that changes the whole pattern."
    }
   ],
   "mindset_guide": "Think of your energy like a workbench, not a conveyor belt. A conveyor belt keeps moving because it has to, and that is how your mind has been treating completion. A workbench lets you set something down, step back, and return only if it still needs attention. Riley, that is the shift: not less care, but care with a place to rest.",
   "closing_title": "What can finally stay finished",
   "closing_body": "From age 46, Earth takes a stronger place in your 10-year cycle, and that changes the feel of your days. The part of you that now keeps re-checking and bracing can meet more structure, so the workday may not leak as easily into everything else. In this burnout pattern, that could make the tight, exhausted feeling ease a little, and rest may start to feel more like rest instead of a task you have to earn. Riley, the part of you that is always trying to stay ahead can learn how to stay put."
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
 "lucia": {
  "content": {
   "title_line1": "Cuando todo se revisa dos veces",
   "title_line2": "y la energía se te escapa en silencio",
   "subtitle": "Módulo 3 · Agotamiento — informe profundo — saju, psicología y acompañamiento integrado",
   "opening_scene": "Son las primeras horas del lunes y el teléfono vibra con mensajes antes de que el día despierte del todo. Tú miras la pantalla y, aunque todavía no hiciste nada, ya sientes que algo dentro se puso en guardia. En la mesa queda el descanso, pero tu mente ya vuelve a revisar lo que acabas de cerrar. Lucía, ¿no te está pasando últimamente que incluso cuando paras, por dentro sigues trabajando?",
   "case_tag": "CASO DE EJEMPLO — Marina, finales de los 20, relación exigente",
   "case_paragraphs": [
    "Marina termina una tarea y, en vez de soltarla, vuelve al principio para mirar cada detalle otra vez. Vive con la sensación de que descansar también pide vigilancia, así que el cuerpo se queda quieto mientras la cabeza sigue en marcha. En su mapa, tierra pesa más que metal, y esa diferencia se nota en la forma en que la exigencia empuja más fuerte que el apoyo. Tú también podrías reconocerte en esa manera de sostener demasiado tiempo lo que ya estaba listo."
   ],
   "oheng_intro": "Tierra aparece en 38% y domina tu distribución, mientras metal está en 0%. En tu Maestro del Día agua, eso se siente como una presión de reglas, responsabilidad y exigencia que pesa más que el apoyo que podría ayudarte a aflojar. En este módulo de agotamiento, esa mezcla se nota en la forma en que sigues sosteniendo incluso cuando ya deberías bajar el ritmo.",
   "quiz_reading": "Tu perfeccionismo está en 82% y tu recuperación en 34%, y esa combinación dibuja a alguien que no se conforma con cerrar una tarea si todavía puede afinarla más. El tipo Quien termina todo y se agota no habla de falta de capacidad, sino de una mente que no suelta la revisión cuando el día ya pidió pausa. En tu rutina eso se ve en el momento en que acabas algo y, aun así, te quedas mirando el resultado como si faltara corregirlo una vez más.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera — poco espacio para aflojar",
     "body": "Madera está en 13%, así que aparece como una presencia baja en tu mapa. En tu día a día, eso se nota cuando la iniciativa nace, pero no logra abrir suficiente espacio para cortar la inercia de la revisión. En un módulo de agotamiento, esta madera tan discreta hace que empezar algo nuevo no sea el problema; soltar lo anterior sí lo es."
    },
    "fire": {
     "heading": "🔥 fuego — energía que sube y pide salida",
     "body": "Fuego está en 25%, en un nivel medio, y no te falta impulso. El problema es que esa energía no se queda quieta: en un lunes por la mañana puede encenderse con un mensaje y poner tu atención en alerta antes de que termines de acomodarte. En tu caso, el fuego no se ve como dramatismo, sino como una chispa que acelera la mente y te deja con menos margen para bajar la intensidad."
    },
    "earth": {
     "heading": "⛰️ tierra — el peso que sostiene y aprieta",
     "body": "Tierra está en 38%, y aquí sí hay fuerza de sobra. En tu Maestro del Día agua, esta tierra se siente como presión, norma y obligación; es la parte que te hace sostener, cumplir y seguir aunque ya estés al límite. Por eso puedes acumular mucho y luego derrumbarte de golpe, como dijiste en consulta. La escena se ve clara: cierras algo, aparece otra demanda, y tú sigues cargando el día con una seriedad que no deja descansar del todo."
    },
    "metal": {
     "heading": "💎 metal — apoyo que falta y que te ordena",
     "body": "Metal está en 0%, así que su ausencia se nota de inmediato. En tu mapa, la tierra puede nutrir el metal, y ese apoyo debería ayudarte a encontrar estructura, protección y aprendizaje para bajar el esfuerzo. Aquí, al faltar metal, cuesta más convertir la exigencia en un orden amable; por eso terminas revisando sin sentir alivio real. Cuando aparece un descanso, la sensación no termina de asentarse, y tú sigues con inquietud por dentro."
    },
    "water": {
     "heading": "💧 agua — corriente que piensa incluso al parar",
     "body": "Agua está en 25%, en un nivel medio, y en tu caso no se apaga cuando termina el trabajo. Como Maestro del Día, esta agua sigue moviéndose en la cabeza aunque el cuerpo ya quiera detenerse. Por eso el descanso no se siente como descanso: la mente sigue tocando el mismo borde una y otra vez. La imagen es muy tuya: te sientas, respiras un poco, y aun así la atención vuelve a revisar lo que ya estaba hecho."
    }
   },
   "upcoming_period_heading": "38 años, se abre la etapa del fuego",
   "upcoming_period_body": "38 años marcan el inicio de una etapa en la que el fuego gana fuerza. Lo que hoy se vive como revisión y tensión cambia de tono, porque la energía deja de quedarse solo en la exigencia y empieza a empujar con más claridad hacia la acción. En ese tramo, conviene preparar hábitos que no alimenten la prisa, para que el impulso no te arrastre más de la cuenta. Si hoy te cuesta soltar, esa preparación será la base para entrar en ese ciclo con más margen.",
   "cross_analysis_quotes": [
    "Tu perfeccionismo alto encaja con la tierra dominante: revisas porque sientes peso, no porque te falte criterio. Eso explica por qué una tarea terminada todavía te deja con la mano sobre el botón de volver atrás. En tu caso, la mente no busca más perfección; busca alivio.",
    "Tu recuperación baja encaja con metal en 0%: falta ese apoyo interno que ordena y protege el cierre. Por eso, aunque descanses, sigues con inquietud y vuelves a mirar lo mismo. No es que no quieras parar; es que te cuesta sentir que parar sea seguro."
   ],
   "answer_notes": [
    "Cuando respondes que vuelves a revisar todo desde el principio, muestras una mente que no acepta el cierre a medias. En tu día, eso se ve cuando una tarea ya terminó pero tú sigues frente a la pantalla, repasando detalles que nadie más está mirando. Esa respuesta te dice algo importante: te cuesta dejar que lo hecho repose.",
    "Cuando dices que sientes inquietud incluso al descansar, aparece una recuperación que todavía no logra sostener el silencio. En tu rutina, eso se nota en un rato libre que no termina de sentirse libre, porque la atención sigue buscando qué falta. Esa respuesta muestra que tu descanso pide más permiso que tiempo."
   ],
   "chat_snapshot_note": "Tu preocupación central no es solo descansar, sino que ese descanso nunca se siente como descanso. Debajo de eso aparece cansancio y un poco de ansiedad, y esa mezcla hace que incluso un momento quieto siga teniendo ruido por dentro. La frase que te deja más claro esto es simple: tu cuerpo para, pero tu mente sigue en guardia.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana alteran esa tensión porque llegan justo cuando tu mente todavía está sensible al arranque. En tu caso, ese golpe encaja con el fuego que se activa rápido y con la tierra que te empuja a responder y sostener. Por eso un mensaje temprano puede sentir más peso del que parece tener.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte funciona como una marea que sube sin aviso visible y cae de golpe cuando ya no queda margen. Primero sostienes, luego empujas un poco más, y al final el cuerpo pide parar de una vez. Un ajuste pequeño sería cortar antes, no cuando ya estás al límite, sino cuando todavía te queda una parte de energía intacta.",
   "chat_fear_note": "Tu miedo no habla de debilidad; habla de la importancia que tiene para ti no quedarte atrás si paras. Debajo de esa inquietud hay una necesidad muy concreta de seguir siendo fiable, presente y capaz. Lo que pides en el fondo no es correr más, sino sentir que detenerte no te deja fuera.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "El perfeccionismo alto suele ir de la mano con una vigilancia constante sobre el resultado, incluso después de terminar algo. La recuperación baja, en cambio, hace que el descanso no se sienta de verdad reparador, porque la mente no cambia de marcha con facilidad. En tu caso, esas dos piezas encajan con mucha precisión: terminas, revisas y luego sigues con inquietud aunque el trabajo ya no esté delante. No es un problema de voluntad; es una forma de funcionar que mantiene la atención encendida más tiempo del necesario.",
   "psychology_takeaway": "No te falta pausa; te falta permiso para sentirla. Cuando el cierre llega, tu mente todavía quiere comprobarlo todo.",
   "strengths": [
    {
     "title": "Doble revisión",
     "body": "Tienes una capacidad muy fina para detectar lo que otros pasarían por alto, y eso se ve en tu impulso de volver a revisar desde el principio. En un día real, esa precisión puede salvar detalles importantes antes de entregar algo. Tu fuerza está en que no dejas pasar fácil lo que para ti todavía merece atención."
    },
    {
     "title": "Resistencia alta",
     "body": "Aguantas mucho antes de aflojar, y eso te permite sostener tareas largas sin abandonar a la primera. En consulta apareció claro en ese patrón de acumular y luego derrumbarte, que muestra cuánto tiempo resistes antes de pedir pausa. Tu resistencia no es fría; es una forma intensa de sostener lo que te importa."
    },
    {
     "title": "Sensibilidad al inicio",
     "body": "Los mensajes del lunes por la mañana te activan rápido, y eso también significa que captas enseguida cuándo algo cambia el tono del día. Esa sensibilidad te permite leer el ambiente antes de que todo se desordene. Bien usada, te ayuda a prepararte con tiempo en lugar de reaccionar tarde."
    },
    {
     "title": "Fondo de agua",
     "body": "Tu Maestro del Día agua da una mente que sigue moviéndose incluso cuando el trabajo ya terminó. Eso te permite sostener pensamiento continuo, memoria activa y mucha conciencia de lo que queda pendiente. En tu caso, esa continuidad puede volverse agotadora, pero también explica por qué notas tan rápido cuándo algo no cerró bien."
    }
   ],
   "weaknesses": [
    {
     "title": "Cierre difícil",
     "body": "Te cuesta sentir que algo terminó de verdad, y por eso vuelves a mirar lo que ya estaba listo. En la práctica, eso puede convertir un descanso corto en una ronda más de revisión. No es falta de capacidad; es una dificultad para dejar que el cierre repose."
    },
    {
     "title": "Descanso con inquietud",
     "body": "Incluso cuando paras, aparece inquietud y el cuerpo no consigue acomodarse del todo. En tu día, eso puede verse como sentarte un rato y seguir pensando en lo mismo, sin que el tiempo libre baje la tensión. Lo difícil no es descansar, sino creer que descansar es seguro."
    },
    {
     "title": "Carga acumulada",
     "body": "Tu patrón de acumular y luego derrumbarte muestra que sostienes demasiado durante demasiado tiempo. Eso se nota cuando sigues respondiendo, ordenando y resolviendo hasta que de pronto ya no puedes con más. La carga se vuelve más liviana si la sueltas antes de llegar al borde."
    },
    {
     "title": "Miedo a frenar",
     "body": "La idea de quedarte atrás si paras te empuja a seguir incluso cuando ya sientes cansancio. En la vida diaria, ese miedo puede hacerte contestar mensajes o revisar pendientes antes de recuperar el aire. Lo que necesita atención no es la prisa, sino la confianza en que detenerte no te borra del mapa."
    }
   ],
   "fit_good": "Te favorecen entornos donde el cierre sea claro y el ritmo no dependa de responder al instante. Un día con bloques definidos, pocas interrupciones y margen real para terminar una cosa antes de abrir la siguiente te permite gastar menos energía en vigilancia. También te ayuda trabajar con instrucciones precisas, porque así no llenas los huecos con revisiones infinitas.",
   "fit_bad": "Te desgastan mucho los espacios donde los mensajes llegan a deshora y todo parece urgente antes de empezar. Un lunes lleno de interrupciones te deja repasando mentalmente lo mismo mientras intentas seguir con otra cosa. También te pesa un ambiente donde nunca queda claro cuándo algo está realmente terminado.",
   "behavior_guides": [
    {
     "title": "Corte temprano",
     "body": "Antes de cerrar una tarea, detente dos minutos y decide qué no vas a volver a revisar hoy. Hazlo justo al terminar, no cuando ya llevas media hora mirando lo mismo. Ese pequeño corte le da a tu mente una señal clara de cierre."
    },
    {
     "title": "Pausa visible",
     "body": "Pon una pausa concreta después de un bloque de trabajo: cinco minutos sin pantalla, sin mensajes y sin volver al tema. Hazlo en cuanto termines, no cuando ya estés al borde. Esa pausa breve ayuda a que el descanso empiece a sentirse real."
    },
    {
     "title": "Mensaje retrasado",
     "body": "Si un mensaje del lunes te activa, espera unos minutos antes de responder y mira primero si realmente requiere acción inmediata. Usa ese tiempo para respirar, no para repasar la conversación en tu cabeza. Así evitas que la primera vibración decida el tono de toda la mañana."
    },
    {
     "title": "Límite de revisión",
     "body": "Elige una sola pasada final para cada tarea y respétala como cierre. Cuando ya hiciste esa vuelta, pasa a otra cosa sin volver atrás. Con práctica, ese límite le enseña a tu energía que terminar también es soltar."
    }
   ],
   "mindset_guide": "No necesitas convertir cada cierre en un examen final. Tu mente funciona como una mesa llena de papeles: si no decides cuál va al frente, todo se queda abierto a la vez. Cuando dejas un documento en su sitio, no pierdes control; ganas aire. En tu caso, descansar no es abandonar el trabajo, es dejar de sostenerlo con la mano.",
   "closing_title": "Cuando el cierre por fin pesa menos",
   "closing_body": "38 años marcan la entrada de un ciclo de fuego, y ese cambio ya está escrito en tu mapa. Hoy todavía sientes el peso de tierra y la inquietud de un metal ausente, pero ese nuevo tramo no llega para borrarte, sino para mover la energía hacia otra forma de estar en el mundo. En este módulo de agotamiento, eso significa que dejas de revisar todo una y otra vez y el día se siente menos pesado por dentro. La frase que conviene guardar es esta: no tienes que ganarle al cansancio, solo dejar de alimentarlo con cada vuelta extra."
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
 "jisoo": {
  "content": {
   "title_line1": "끝낸 뒤 더 바빠지는 마음",
   "title_line2": "멈추지 못하는 완주가 지수님을 지치게 해요",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "밤이 깊어지면 지수님은 일을 끝냈는데도 손을 놓지 못해요. 화면은 이미 닫았는데 머릿속에서는 방금 마친 일을 다시 처음부터 훑고 있어요. 쉬는 날인데도 마음 한쪽이 계속 불편해서, 몸은 멈췄는데 생각만 다시 달리기 시작해요. 월요일 아침 메신저 알림이 울리기 전부터 긴장이 먼저 올라오고, 지수님은 오늘도 끝난 일을 끝난 일로 두지 못하고 있지 않나요?",
   "case_tag": "가상 사례 — 민지, 30대 초반, 마감이 몰린 직장인",
   "case_paragraphs": [
    "민지는 퇴근 후에도 노트북을 한 번 더 열어 보고, 방금 보낸 문장을 다시 읽다가 자정이 넘어가요. 완벽주의가 높고 회복이 낮은 편이라, 끝낸 일보다 놓친 한 줄이 더 크게 남아요. 사주에서도 토가 강해 현실을 붙잡는 힘은 큰데, 수가 약해 쉬어도 마음이 잘 적셔지지 않아요. 당신도 이렇게 끝내고도 끝내지 못한 채 앉아 있나요?"
   ],
   "oheng_intro": "토가 50%로 가장 강하고, 수는 0%예요. 지수님은 갑일 때 현실과 결과를 붙잡는 힘이 몸에 먼저 걸리고, 나를 살려 주는 기운은 비어 있어서 쉬는 순간까지도 일의 감각이 남아 있어요. 이번 모듈에서는 그 분포가 몰아서 버티고 한 번에 지치는 장면으로 또렷하게 드러나요.",
   "quiz_reading": "완벽주의 82%와 회복 34%가 함께 보이면, 지수님은 일을 대충 넘기기보다 끝까지 다듬는 쪽으로 움직여요. 완주형 소진이라는 이름이 붙는 이유도 여기에 있어요. 해낸 뒤에 쉬는 장면보다, 해낸 뒤 다시 확인하는 장면이 더 익숙하게 붙어 있거든요.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 보통 — 시작은 빠르지만 끝에서 더 조여요",
     "body": "목 33%는 지수님이 일을 시작할 때 방향을 잡는 감각이 꽤 분명하다는 뜻이에요. 새 과제가 들어오면 바로 구조를 그려 두고, 어떤 순서로 끝낼지 먼저 떠올리는 편이에요. 다만 토가 더 강해서, 그 계획이 실행으로 넘어가면 스스로에게 기준을 더 높게 얹기 쉬워요."
    },
    "fire": {
     "heading": "🔥 화 약하다 — 속도를 붙이는 열이 잠깐 꺼져 있어요",
     "body": "화 0%는 지수님이 바쁠 때도 흥분감이나 가벼운 추진력으로 버티기보다, 의지로 밀어붙이는 쪽에 가깝게 보인다는 뜻이에요. 일이 끝나도 몸이 금방 ‘끝났다’고 느끼지 못하고, 머리만 계속 돌아가는 장면과 잘 맞아요. 번아웃 모듈에서는 이 낮은 화가 쉬는 날의 생기를 바로 올려 주지 못하는 느낌으로 드러나요."
    },
    "earth": {
     "heading": "⛰️ 토 강하다 — 붙잡는 손이 너무 오래 힘을 줘요",
     "body": "토 50%는 지수님이 일을 현실로 붙들어 두는 힘이 강하다는 뜻이에요. 맡은 일을 끝까지 끌고 가고, 결과가 눈에 보일 때까지 손을 놓지 않아요. 하지만 이 강한 토는 ‘이 정도면 됐다’보다 ‘한 번만 더 확인하자’로 이어지기 쉬워요."
    },
    "metal": {
     "heading": "💎 금 보통 — 기준은 또렷한데, 너무 오래 날이 서 있어요",
     "body": "금 17%는 지수님 안에 기준과 점검의 감각이 분명히 있다는 뜻이에요. 그래서 일이 끝나도 “이 부분은 더 나아질 수 있지 않았나” 하고 다시 훑게 돼요. 완벽주의 82%와도 잘 맞아서, 멈추는 순간보다 다듬는 순간이 더 길어지기 쉬워요."
    },
    "water": {
     "heading": "💧 수 약하다 — 쉬어도 마음이 젖어들 틈이 적어요",
     "body": "수 0%는 지수님에게 쉬는 시간이 곧바로 회복의 감각으로 바뀌지 않는다는 뜻이에요. 이 부족함은 금이 수를 살려 주는 흐름으로만 천천히 채워져요. 그래서 휴식이 들어와도 마음은 바로 편해지지 않고, 월요일 알림 하나에 다시 긴장이 먼저 올라와요."
    }
   },
   "upcoming_period_heading": "36세부터, 수의 장이 열립니다",
   "upcoming_period_body": "36세부터 45세까지는 수 기운이 강해지는 시기예요. 지금까지 지수님을 몰아붙이던 방식은 서서히 뒤로 물러나고, 생각을 바로 밀어붙이기보다 잠깐 멈춰 보는 흐름이 자리 잡아요. 그 뒤에는 쉬는 시간도 일의 일부로 받아들이는 감각이 붙고, 일을 몰아서 버티는 힘보다 흐름을 나눠 쓰는 쪽이 더 자연스러워져요. 지금은 확인과 점검을 줄여 두는 습관을 먼저 만들어 두면 좋아요.",
   "cross_analysis_quotes": [
    "토 50%와 완벽주의 82%가 만나면, 지수님은 끝내는 힘보다 끝까지 붙드는 힘이 더 앞서요. 그래서 일이 끝나도 손은 멈췄는데 머리는 다시 처음부터 훑어요. 이 조합은 ‘끝냈다’보다 ‘더 다듬을 수 있다’가 먼저 떠오르는 하루를 만들어요.",
    "수 0%와 회복 34%는 쉬는 장면에서 바로 드러나요. 몸은 잠깐 멈춰도 마음이 편해지지 않아서, 쉬는 날에도 메신저 알림처럼 작은 자극이 긴장을 다시 켜요. 지수님은 쉬는 기술보다 풀어 놓는 감각이 먼저 필요해요."
   ],
   "answer_notes": [
    "다시 처음부터 훑어본다는 답은 지수님이 결과를 넘기기보다 과정을 붙잡아 두는 사람이라는 걸 보여줘요. 그래서 하루가 끝나도 머릿속에서는 검토가 계속 이어져요. 그런 방식으로 일하는 사람에게는 완성보다 종료 신호를 따로 만들어 주는 연습이 잘 맞아요.",
    "쉬어도 마음이 불편하다는 답은 지수님이 휴식을 게을리해서가 아니라, 쉬는 상태를 바로 믿기 어려워한다는 뜻이에요. 겉으로는 멈춘 것 같아도 안쪽에서는 계속 일의 감각이 남아 있어요. 이런 답을 고른 사람은 쉬는 동안에도 죄책감이 붙기 쉬우니, 쉬는 시간을 짧게 쪼개 시작하는 편이 좋아요."
   ],
   "chat_snapshot_note": "지수님은 쉬어도 쉬는 것 같지 않다는 고민을 꺼냈고, 그 아래에는 지쳤고 조금 불안한 감정이 붙어 있어요. 월요일 아침 메신저 알림이 오면 몸보다 먼저 마음이 긴장하고, 그 상태가 계속 이어져요. 쉬는 시간이 불편하게 느껴질수록, 지수님은 더 혼자 버티려 하게 돼요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 단순한 알림이 아니에요. 멈춰 있던 긴장을 다시 켜는 신호처럼 작동하고, 완벽주의가 높은 축과 바로 맞물려요. 그래서 알림 한 번에 마음이 바로 일 모드로 돌아가요.",
   "chat_repeat_note": "몰아서 하고 무너지기라는 패턴은, 한동안은 버티는 것처럼 보여도 안쪽에서는 피로가 계속 쌓이는 방식이에요. 지수님은 중간에 쉬기보다 조금 더 밀어붙이는 쪽을 택하고, 그 선택이 반복되는 지침으로 이어지곤 해요. 중간 점검을 짧게 넣는 습관이 이 흐름을 가장 먼저 느슨하게 만들어요.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 두려움은, 지수님이 게으름을 두려워한다기보다 자리를 놓칠까 봐 긴장하고 있다는 뜻이에요. 그 아래에는 놓치고 싶지 않은 책임감이 있어요. 멈추는 시간을 죄책감이 아니라 조절로 받아들이는 순간, 지수님은 조금 덜 몰아붙여도 돼요.",
   "psychology_fact_heading": "완벽주의와 회복 탄력성",
   "psychology_fact_body": "완벽주의는 결과의 기준을 높이는 대신, 과정 전체를 더 오래 점검하게 만들 수 있어요. 회복 탄력성은 스트레스를 받았을 때 다시 평상시의 감각으로 돌아오는 능력인데, 지수님은 이 부분이 낮게 나와서 쉬는 시간이 곧바로 편안함으로 이어지지 않아요. 그래서 일은 끝났는데도 마음은 계속 검토를 반복하고, 그 반복이 번아웃의 체감으로 남아요. 이 조합은 ‘더 잘하고 싶다’는 마음이 ‘그만두기 어렵다’는 상태로 바뀌기 쉬운 패턴과 닿아 있어요.",
   "psychology_takeaway": "끝내는 힘이 강한 사람은, 멈추는 연습도 따로 필요해요. 지수님은 일을 줄이는 것보다 종료 신호를 배우는 쪽에서 더 빨리 편해져요.",
   "strengths": [
    {
     "title": "끝까지 붙잡기",
     "body": "지수님은 맡은 일을 중간에 놓지 않고 끝까지 붙드는 힘이 있어요. 월요일 아침 메신저 알림이 와도 바로 반응할 만큼 책임감이 빠르게 붙어요. 이 힘은 지칠 때도 일의 맥을 놓지 않게 해주는 버팀목이에요."
    },
    {
     "title": "기준 감각",
     "body": "완벽주의 82%는 지수님이 결과를 대충 넘기지 않는다는 뜻이에요. 일을 끝낸 뒤 다시 처음부터 훑어보는 습관도, 이 기준 감각이 살아 있다는 증거예요. 덕분에 지수님은 놓친 부분을 빨리 알아채요."
    },
    {
     "title": "현실 감각",
     "body": "토 50%는 지수님이 생각만 하는 사람보다 현실을 만지는 쪽에 더 가깝다는 뜻이에요. 해야 할 일을 표로 정리하고, 쌓인 업무를 실제로 처리해 내는 장면에서 이 힘이 보여요. 바쁠수록 이 감각이 지수님을 앞으로 끌고 가요."
    },
    {
     "title": "버티는 힘",
     "body": "몰아서 하고 무너지기 패턴이 있어도, 그 전에 꽤 오래 버틴다는 점이 지수님의 힘이에요. 겉으로는 지쳐 보여도 끝까지 책임을 놓지 않아요. 이 버티는 힘은 방향만 잘 잡히면 큰 성과로 이어져요."
    }
   ],
   "weaknesses": [
    {
     "title": "과점검",
     "body": "지수님은 일이 끝나도 손보다 눈이 먼저 쉬지 못해요. 다시 처음부터 훑어보는 습관이 계속되면, 완료보다 수정이 더 길어져요. 이때는 ‘한 번 더’보다 ‘여기까지’라는 문장을 일부러 남겨 두는 게 필요해요."
    },
    {
     "title": "휴식 불편",
     "body": "쉬는 날에도 마음이 불편한 건, 멈춤이 곧 안전한 상태로 느껴지지 않기 때문이에요. 그래서 겉으로는 쉬어도 안쪽에서는 계속 일을 돌보게 돼요. 이런 상태에서는 긴 휴식보다 짧고 확실한 끊김이 먼저 맞아요."
    },
    {
     "title": "몰아붙임",
     "body": "지수님은 조금씩 나눠 가기보다 몰아서 처리하는 쪽으로 기울기 쉬워요. 그때는 속도가 붙지만, 뒤에는 한 번에 무너지는 피로가 따라와요. 중간에 10분이라도 멈춰 보는 습관이 이 흐름을 누그러뜨려요."
    },
    {
     "title": "불안 점화",
     "body": "월요일 아침 메신저 알림처럼 작은 신호가 긴장을 크게 키워요. 그 순간 뒤처질까 봐 멈출 수 없다는 생각이 붙으면서 몸이 먼저 굳어요. 알림을 보자마자 바로 답하지 않고 3분만 숨을 고르는 방식이 도움이 돼요."
    }
   ],
   "fit_good": "지수님에게는 해야 할 일이 분명하고, 시작과 마감이 또렷한 환경이 잘 맞아요. 오전에 업무를 한 번에 몰지 않고 중간 점검 시간이 정해진 하루가 좋아요. 끝난 일을 다시 붙잡기보다 다음 단계가 바로 보이는 구조가 지수님을 덜 지치게 해요.",
   "fit_bad": "모든 답을 즉시 요구하고, 메신저 알림이 곧 업무 지시처럼 굴러가는 환경은 지수님을 더 지치게 해요. 마감이 계속 바뀌고 검토가 끝없이 이어지는 하루는 회복을 더 어렵게 만들어요. 몰아서 하고 무너지기 패턴이 반복되면 지수님은 불안과 피로를 더 크게 느끼기 쉬워요.",
   "behavior_guides": [
    {
     "title": "종료 신호",
     "body": "일이 끝난 뒤에는 문서와 메신저를 바로 닫아 두는 흐름을 한 번 정해 두면 좋아요. 저녁에 잠깐 ‘여기까지’라고 적어 두는 습관도 머리가 다시 훑는 시간을 줄이는 데 도움이 돼요. 이 습관은 지수님이 끝난 일을 끝난 일로 남겨 두는 연습이에요."
    },
    {
     "title": "짧은 휴식",
     "body": "쉬는 시간을 30분 단위로 길게 잡기보다 10분씩 끊어 써 보세요. 알림을 끄고 물을 마시고 창밖을 보는 식으로, 몸이 먼저 멈추는 신호를 주는 게 좋아요. 회복 34%인 지수님에게는 길게 버티는 휴식보다 짧게 자주 쉬는 방식이 맞아요."
    },
    {
     "title": "중간 점검",
     "body": "일을 몰아서 하기 전에 오전과 오후에 각각 1번씩만 점검 시간을 넣어 보세요. 그때는 새로 시작하지 말고, 지금 하는 일의 한 줄만 확인하면 돼요. 이렇게 하면 한 번에 무너지는 흐름을 조금씩 잘게 나눌 수 있어요."
    },
    {
     "title": "알림 거리두기",
     "body": "월요일 아침에는 메신저를 켜기 전 5분을 따로 확보하세요. 그 5분 동안은 바로 답하지 않고 오늘 할 일만 적어 두면 긴장이 덜 올라와요. 알림과 반응 사이의 짧은 틈이 지수님을 지켜줘요."
    }
   ],
   "mindset_guide": "지수님은 일을 접는 사람이 아니라, 끝까지 다 펴 놓는 사람에 가까워요. 그래서 마음도 접는 법보다 멈추는 법을 배워야 해요. 완벽주의는 번개처럼 빠르게 기준을 세우고, 회복은 젖은 수건처럼 천천히 원래 상태로 돌아와요. 둘의 속도가 다르다는 걸 인정하면, 지수님은 덜 몰아붙여도 돼요.",
   "closing_title": "끝난 뒤의 숨",
   "closing_body": "36세부터 45세까지는 수 기운이 강해지는 시기예요. 그 전에는 끝내고도 다시 훑던 하루가 길었지만, 그 뒤에는 일과 쉼 사이에 한 번 숨을 고르는 틈이 생길 수 있어요. 지수님은 그 시기부터 월요일 아침 알림에 바로 끌려가지 않고, 몸이 먼저 덜 굳는 느낌을 받을 수 있어요. 번아웃의 무거운 감각도 조금씩 달라질 가능성이 있어요."
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
 "casey": {
  "content": {
   "title_line1": "Cuando la mente no suelta el trabajo",
   "title_line2": "y la energía se va justo después de terminarlo",
   "subtitle": "Módulo 3 · Agotamiento — informe profundo de tus Cuatro Pilares y acompañamiento psicológico integrado",
   "opening_scene": "Por la noche, cuando ya terminaste lo que tenías entre manos, sigues con la pantalla encendida y vuelves a mirar lo mismo desde el principio. En tu cabeza, la frase no es “ya acabó”, sino “revisa una vez más”. Y luego llega el lunes por la mañana, con los mensajes, y esa tensión vuelve a activarse sola. Casey, ¿no te está pasando que incluso el descanso se siente como otra tarea?",
   "case_tag": "CASO DE EJEMPLO — Martín, treintañero, trabajo exigente",
   "case_paragraphs": [
    "Martín apaga la computadora después de cerrar un informe, pero a los pocos minutos la vuelve a abrir para comprobar una línea, luego otra, y al final ya no sabe si terminó o si solo empezó otra ronda. Su madera fuerte empuja a seguir sosteniendo resultados, y su agua muy baja deja poco espacio para soltar lo que ya quedó hecho. En su mapa, esa misma tensión se ve como una mente que no acepta bajar el ritmo aunque el cuerpo ya pidió pausa. Y tú también puedes reconocerte en ese gesto de seguir un poco más cuando ya no queda margen.",
    "Martín almuerza mirando el teléfono porque teme perder un mensaje importante, y cuando por fin llega un día libre siente inquietud en vez de alivio. Esa combinación de madera alta y agua ausente hace que el cierre nunca se sienta del todo cerrado. El perfeccionismo le pide dejar todo impecable y la falta de recuperación le quita el aire para bajar de marcha. Y tú también podrías estar viviendo ese mismo bucle."
   ],
   "oheng_intro": "Tu madera está en 38% y tu metal también en 38%, así que lo que sostienes por fuera tiene mucha fuerza y mucha forma. Tu agua está en 0%, y eso hace que en este módulo el descanso no entre con facilidad en tu ritmo. Como tu Maestro del Día es metal, la madera es lo que tú manejas para concretar trabajo y dinero, y la ausencia de agua se nota justo en la parte que debería ayudarte a expresar y soltar energía.",
   "quiz_reading": "Tu 82% en Perfeccionismo y tu 34% en Recuperación dibujan una rutina muy clara: terminas algo y enseguida aparece la necesidad de revisarlo otra vez. El tipo Quien termina todo y se agota no habla de falta de capacidad, sino de una exigencia que no deja descansar ni cuando el trabajo ya salió. Por eso tu día puede verse como una lista cerrada por fuera y todavía abierta por dentro.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera fuerte — sostener también puede agotar",
     "body": "Tu madera está en 38%, y eso la vuelve fuerte en tu mapa. Como tu Maestro del Día es metal, esta madera es la energía que tú manejas para concretar trabajo y dinero, y se nota en cómo empujas hasta dejar todo bien cerrado. En un día normal, eso te ayuda a avanzar sin aflojar; en un día pesado, te deja con la sensación de que siempre falta una pasada más. La frase que te deja esta madera es simple: tú sabes sostener mucho, pero no siempre sabes cuándo parar."
    },
    "fire": {
     "heading": "🔥 fuego moderado — el impulso aparece, pero no se queda",
     "body": "Tu fuego está en 13%, así que no domina la escena, pero sí deja una marca breve de impulso. En tu módulo de agotamiento, eso se ve como el momento en que te activas para resolver algo rápido y luego el cuerpo pide bajar el volumen. No es un fuego que te arrastre todo el día; es más bien una chispa corta que te ayuda a arrancar. Y en ti esa chispa sirve, pero no alcanza para sostener el descanso después."
    },
    "earth": {
     "heading": "⛰️ tierra moderada — el suelo está, pero no pesa más de la cuenta",
     "body": "Tu tierra está en 13%, así que aporta cierta base sin volverse rígida. En este módulo, eso se siente en la parte de ti que intenta organizar el día para que nada se desordene demasiado. Te ayuda a poner límites prácticos, pero no llega a frenar la revisión constante cuando ya terminaste. La imagen es clara: hay suelo, pero no hay suficiente descanso apoyado sobre él."
    },
    "metal": {
     "heading": "💎 metal fuerte — revisar, pulir y no soltar del todo",
     "body": "Tu metal está en 38%, y esa fuerza se nota en tu manera de revisar lo hecho una y otra vez. Como tu Maestro del Día es metal, esta energía es tu forma de poner orden, cerrar y afinar trabajo y dinero. En un día con mensajes desde temprano, tu metal se enciende rápido y te lleva a volver sobre lo mismo para dejarlo impecable. La ventaja es que ves fallos donde otros pasan de largo; el costo es que te cuesta reconocer el punto en que ya basta."
    },
    "water": {
     "heading": "💧 agua baja — el descanso no encuentra salida",
     "body": "Tu agua está en 0%, y eso la vuelve la parte más frágil de tu mapa en este módulo. Como en tu caso el agua es la energía que tú sacas hacia fuera —expresión, talento, energía que sale—, su ausencia se nota cuando terminas algo y aun así sigues revisando. Aquí el metal puede ayudarte a dar forma al descanso, porque el metal nutre al agua y le abre camino. Pero mientras esa corriente siga tan baja, terminar algo no se traducirá enseguida en soltarlo."
    }
   },
   "upcoming_period_heading": "De los 41 a los 50 años, el metal toma fuerza",
   "upcoming_period_body": "De los 41 a los 50 años, el metal se vuelve más fuerte en tu ciclo de diez años. Esa etapa cierra una forma de sostener las cosas y abre otra más clara para ordenar, decidir y poner límites con menos fricción. Para ti, eso significa que lo que hoy te consume por dentro puede empezar a encontrar una forma más limpia de encaminarse. Conviene llegar a ese tramo con hábitos de cierre más simples, porque allí la precisión pesa más que el esfuerzo bruto.",
   "cross_analysis_quotes": [
    "Tu metal fuerte y tu 82% en Perfeccionismo dicen lo mismo con dos lenguajes distintos: no te basta terminar, también necesitas dejarlo impecable. Por eso una tarea cerrada todavía sigue viva en tu cabeza, como si el resultado final no fuera suficiente sin una revisión extra. En tu día, eso se nota en el momento en que ya podrías apagar todo y, sin embargo, vuelves a abrirlo.",
    "Tu agua en 0% y tu 34% en Recuperación se apoyan entre sí de una forma muy clara: descansar no te devuelve energía con facilidad. El cuerpo baja un poco, pero la inquietud sigue ahí y no te deja sentir que realmente paraste. Por eso el cansancio no viene solo del trabajo, sino de no encontrar un regreso real al reposo."
   ],
   "answer_notes": [
    "Volver a revisar todo desde el principio muestra que tu mente no confía del todo en el cierre inicial. En tu día, eso aparece cuando terminas una tarea y todavía sientes la necesidad de pasar otra vez por cada detalle. La frase que deja este patrón es esta: tú no abandonas el trabajo, lo sigues acompañando después de entregarlo.",
    "Sentir inquietud aunque descanses muestra que tu recuperación no se activa solo por detenerte. En tu rutina, eso se ve cuando tienes un día libre y aun así el cuerpo no interpreta ese espacio como alivio. Lo que te conviene recordar es que parar no siempre se siente seguro al principio, pero sí puede aprenderse."
   ],
   "chat_snapshot_note": "Tu problema central no es solo descansar, sino que ese descanso nunca se siente como descanso. Debajo de eso aparece cansancio y un poco de ansiedad, y esa mezcla hace que incluso una pausa breve se parezca a otra obligación. La frase que mejor te describe hoy es esta: tu cuerpo se detiene antes que tu mente.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque llegan justo al lugar donde tu mente ya estaba en guardia. Con tu metal fuerte y tu perfeccionismo alto, ese aviso no entra como un dato más, sino como una señal de que hay que volver a revisar. Por eso ese momento enciende tensión tan rápido: toca tu necesidad de dejar todo cerrado.",
   "chat_repeat_note": "El patrón de acumular y luego derrumbarte se arma paso a paso, sin ruido al principio. Primero sostienes, corriges y sigues; luego el cuerpo pide una caída de golpe porque ya no queda margen para aflojar antes. Un cambio pequeño para ti es cortar la revisión en un punto fijo, aunque sientas que todavía podrías mirar una vez más.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de pereza ni de falta de ganas. Habla de una parte de ti que siente que detenerse tiene costo, y por eso aprieta más de la cuenta. Debajo de ese miedo hay una necesidad muy concreta: seguir sintiendo que avanzas sin perder tu lugar.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "En psicología, el perfeccionismo describe la tendencia a poner el estándar tan alto que cerrar algo nunca se siente del todo suficiente. La recuperación, en cambio, se refiere a la capacidad de salir del esfuerzo y volver a un estado de descanso real. En tu caso, el 82% en Perfeccionismo y el 34% en Recuperación muestran una combinación muy coherente con lo que cuentas: terminas, revisas y te cuesta sentir que ya basta. No es que no puedas parar; es que tu sistema sigue midiendo el resultado cuando el trabajo ya terminó.",
   "psychology_takeaway": "Terminar no te apaga, solo te deja en una pausa incompleta. Tu reto no es hacer menos, sino aprender a reconocer el momento exacto en que ya cerraste.",
   "strengths": [
    {
     "title": "Ojo fino",
     "body": "Tu 82% en Perfeccionismo te da una capacidad muy clara para detectar lo que otros dejarían pasar. En tu día, eso se ve cuando revisas un trabajo y encuentras el detalle que todavía no encaja. Esa mirada te vuelve fiable, porque sabes sostener el estándar incluso cuando ya te queda poca energía."
    },
    {
     "title": "Impulso de cierre",
     "body": "Tu madera fuerte te empuja a terminar lo que empezaste y a sostener resultados concretos. Como tu Maestro del Día es metal, esa fuerza se traduce en una forma muy directa de ordenar trabajo y dinero. La escena es conocida: cierras una tarea y todavía quieres dejarla mejor antes de soltarla."
    },
    {
     "title": "Resistencia silenciosa",
     "body": "Tu patrón de aguantar y luego derrumbarte muestra que puedes sostener mucho más tiempo del que parece. En tu rutina, eso hace que sigas funcionando incluso cuando el cansancio ya se notó. Esa resistencia no es pequeña; solo necesita una salida más gradual para no vaciarte de golpe."
    },
    {
     "title": "Lectura precisa",
     "body": "Tu metal fuerte te ayuda a ver estructuras, errores y necesidades con mucha nitidez. En un lunes con mensajes desde temprano, esa lectura rápida te permite entender enseguida qué requiere atención. Bien usada, esa precisión te ahorra tiempo y te evita perseguir problemas innecesarios."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión infinita",
     "body": "Tu 82% en Perfeccionismo puede llevarte a volver sobre lo mismo incluso después de terminar. En la práctica, eso se ve cuando cierras una tarea y tu cabeza busca otra pasada. No es falta de capacidad; es una exigencia que no sabe retirarse a tiempo."
    },
    {
     "title": "Reposo sin calma",
     "body": "Tu 34% en Recuperación explica por qué un día libre no siempre se siente libre por dentro. Puedes estar sentado, pero tu mente sigue midiendo pendientes. Esa distancia entre parar y descansar te deja sin verdadera bajada de ritmo."
    },
    {
     "title": "Sobrecarga acumulada",
     "body": "Tu patrón de acumular y luego derrumbarte hace que el esfuerzo se junte demasiado antes de aflojar. En tu día, eso puede aparecer como una semana que parece aguantar bien y luego cae de golpe. La salida está en repartir el cierre antes de llegar al borde."
    },
    {
     "title": "Alerta constante",
     "body": "Los mensajes del lunes por la mañana te activan porque tu mente ya está predispuesta a volver a revisar. Esa alerta continua te mantiene cerca del trabajo aunque ya hayas terminado. El costo es claro: no descansas del todo porque una parte de ti sigue de guardia."
    }
   ],
   "fit_good": "Te convienen días con tareas cerradas por bloques cortos y pausas visibles entre uno y otro. Si tu trabajo te deja marcar un final claro, tu mente suelta mejor la necesidad de revisar. También te ayuda tener horas sin mensajes nuevos, porque así el cierre deja de reabrirse solo.",
   "fit_bad": "Te desgastan los entornos donde todo queda abierto y cada respuesta puede volver a poner en marcha la tarea. Si empiezas el día con mensajes apenas despiertas, tu tensión sube antes de que puedas ordenar nada. También te pesa trabajar en espacios donde nunca queda claro qué cuenta como terminado.",
   "behavior_guides": [
    {
     "title": "Cierre fijo",
     "body": "Elige una hora exacta para cerrar una tarea y respétala aunque sientas que podrías revisar más. Durante 10 minutos, haz una sola pasada final y deja de tocar ese archivo o ese mensaje después. Repite este corte al menos una vez al día para entrenar a tu mente a reconocer el final."
    },
    {
     "title": "Pausa visible",
     "body": "Después de terminar algo, levántate de la silla y cambia de habitación durante 5 minutos. No mires mensajes ni vuelvas al mismo tema en ese tramo. Esa pausa corta ayuda a que tu cuerpo entienda que no todo cierre necesita otra revisión."
    },
    {
     "title": "Límite de mensajes",
     "body": "Los lunes, retrasa la primera revisión de mensajes 20 minutos si puedes. Empieza por una tarea pequeña ya cerrada antes de entrar en lo nuevo. Así evitas que el día arranque directamente desde la alarma interna."
    },
    {
     "title": "Descanso contado",
     "body": "Marca un descanso de 15 minutos con hora de inicio y de fin, no como un rato suelto. Durante ese tiempo, no te pidas que “se sienta” como descanso; solo cumple la pausa. Con esa estructura, tu recuperación empieza a tener una forma más reconocible."
    }
   ],
   "mindset_guide": "Tu mente funciona como un taller que no apaga la luz aunque la pieza ya salió perfecta. Si sigues puliendo el mismo borde, no es porque falte trabajo; es porque tu sistema todavía no reconoce la salida. Para ti, descansar no es abandonar el estándar, sino aceptar que una pieza bien hecha también puede dejarse en la mesa. Cuando entiendas eso, el lunes dejará de sonar como una alarma y empezará a sonar como un día más.",
   "closing_title": "Cuando por fin se cierra",
   "closing_body": "De los 41 a los 50 años, el metal se vuelve más fuerte en tu ciclo de diez años, y eso te deja en mejor posición para ordenar sin quedarte enganchado en la revisión. Hoy la tensión aparece cuando terminas algo y tu mente sigue tocándolo; más adelante, esa misma energía puede volverse una forma más limpia de cerrar. En este módulo, eso se nota como menos ruido interno y una sensación más clara de descanso después de trabajar. Lo que hoy te deja al borde, entonces se vuelve un cierre que por fin se siente cerrado."
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
 },
 "jordan": {
  "content": {
   "title_line1": "You finish the day, but your mind keeps reopening it.",
   "title_line2": "The work ends before the checking does.",
   "subtitle": "Module 3 Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late, and the screen is still lit with Monday-morning messages you didn’t need to answer yet. Your hand hovers over the same task you already finished, as if one more check could make the result feel real. The body is tired, but the mind keeps pulling the file back open and asking whether something slipped through. Even when you try to rest, the feeling doesn’t land, and you end up looking more alert than you feel. Jordan, isn’t this the exact shape of your recent nights?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, a project lead under constant deadlines",
   "case_paragraphs": [
    "Mina closes her laptop at 11 p.m., then opens it again because one line in the deck still feels unfinished. Her day is full of re-checking, and her rest never quite becomes rest because her mind keeps returning to the same task. Her Five Elements are also lopsided in a similar way, with too much earth-like pressure and almost no wood-like release, so the day feels heavier than it should. You can probably see how this maps back to you."
   ],
   "oheng_intro": "Your Earth is 38% and your Metal is 38%, while Wood is only 0%. In this chart, Earth presses on you like rules, responsibility, and pressure, and Wood is the energy you usually let out through expression and momentum. That balance fits a burnout pattern: you keep holding structure in place, but the release valve is almost absent.",
   "quiz_reading": "Your Perfectionism score is 82% and your Recovery score is 34%, and that pairing matches Finisher's Drain exactly. You don’t just care about doing things well; you keep mentally reopening finished work, then feel uneasy even on a day off. That’s why your tiredness shows up as checking, not just as sleepiness.",
   "element_readings": {
    "wood": {
     "heading": "🌳 wood weak — your outlet has gone quiet",
     "body": "Your Wood is 0%, so the part that normally lets you express, move, and release has very little room here. In the Five Elements cycle, Water supports Wood, so when your inner Water is steadier, your output has something to grow from. In a burnout week, that can look like finishing the task and still not feeling the clean drop into relief. The sentence to keep is simple: when Wood is empty, even success can feel sealed shut."
    },
    "fire": {
     "heading": "🔥 fire low — warmth arrives, then disappears fast",
     "body": "Your Fire is 13%, which is low, so the sense of warmth and visible spark doesn’t stay up for long. On a Monday morning, that can feel like a short burst of readiness that gets swallowed as soon as the messages start coming in. You may look productive from the outside, but the inner heat burns off quickly and leaves you wanting a break that actually lands. The sharp part is that the effort is there; the staying power is what keeps slipping away."
    },
    "earth": {
     "heading": "⛰️ earth strong — pressure that keeps the room held together",
     "body": "Your Earth is 38%, and that is strong, so responsibility and structure sit at the center of your pattern. For a Water Day Master, Earth is the force that presses on you, so this doesn’t feel neutral; it feels like being held to the desk even after the work is done. That is why you can finish a task and still not feel finished. The line worth keeping is this: you are not lacking effort, you are carrying too much weight for too long."
    },
    "metal": {
     "heading": "💎 metal strong — the part that checks, sorts, and refuses to let go",
     "body": "Your Metal is 38%, so the need for precision is also strong and very active here. That shows up in the urge to go back and re-check everything after a task is already complete. In a burnout pattern, that kind of sharpness can keep you from dropping out of work mode, because one more review always feels reasonable. You don’t need less care; you need a way to let care stop before it turns into looping."
    },
    "water": {
     "heading": "💧 water low — the part that should recover is running thin",
     "body": "Your Water is 13%, so the layer that should soften pressure and restore you is low. That fits the way rest feels uneasy instead of restful, even when nothing urgent is happening. When Monday-morning messages arrive, they hit that thin layer fast and bring the tension back online. The clearest line here is that your tiredness is not empty; it is under-recovered."
    }
   },
   "upcoming_period_heading": "31 to 40, fire becomes stronger",
   "upcoming_period_body": "31 to 40, Fire becomes stronger, and that marks the start of a new chapter in how your energy shows up at work. The current pattern of heavy holding and constant checking gives way to a phase where motion, visibility, and speed naturally rise. For you, that means the pressure to finish everything perfectly will no longer be the whole story; the pace itself becomes more active. What helps most now is learning to leave a task while it is still good enough, because the next chapter will not reward endless re-checking in the same way.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism is not just a style choice; it is the reason finished work still feels unfinished. You go back and re-check everything because your mind treats completion as a moment to inspect, not to release. That is exactly why the task can be done while your body still feels on duty.",
    "Your 34% Recovery explains why rest does not register as rest. When you feel uneasy even on a day off, the low recovery score is showing you a system that does not fully downshift. That is why a quiet day can still carry the same tension as a workday."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows how tightly your perfectionism is tied to safety. In daily life, it can look like reopening a finished file, rereading an email, or checking one more detail long after the deadline is over. If that is your move, you’re not being difficult — you’re trying to make certainty last a little longer.",
    "Feeling uneasy even when you rest shows that recovery is not landing fully for you yet. That can show up as sitting on the couch but still thinking about the next message, the next task, or the next thing you should be doing. The useful shift is not to force rest harder, but to let rest be imperfect enough to count."
   ],
   "chat_snapshot_note": "Your core concern is that you rest but it never feels like resting, and that lands right on top of tiredness with a little anxiety. The work may be done, but your mind keeps checking, so the body never gets the signal that it can stand down. The line to keep is this: you are not failing to rest; your system is having trouble believing it is safe to stop.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they switch the whole system back on before you have fully come down. That fits your strong Metal and high Perfectionism: one new message is enough to reopen the file in your head. The trigger is small, but it lands on a pattern that is already wired to keep checking.",
   "chat_repeat_note": "You cram, then crash, because the push keeps going until the body finally takes over. In the middle, you choose one more check, one more push, one more stretch of effort, because stopping feels like falling behind. A smaller move would be to stop at a clean stopping point on purpose, before the crash decides for you.",
   "chat_fear_note": "The fear underneath this is not laziness or weakness; it is the fear that stopping means falling behind. That tells me you care deeply about staying in motion and staying reliable. What you want most is not endless work — it is the sense that pausing will not cost you your place.",
   "psychology_fact_heading": "Frost's multidimensional perfectionism theory",
   "psychology_fact_body": "Frost and colleagues described perfectionism as more than high standards; it also includes concern over mistakes, personal standards, doubts about actions, and the feeling that others expect perfection from you. Your 82% Perfectionism fits especially well with the doubt-and-checking side of that model. The 34% Recovery score adds the missing counterweight, which is why finishing a task does not automatically let your mind stand down. In your pattern, standards stay loud, but recovery does not get enough room to answer back.",
   "psychology_takeaway": "When checking becomes the way you feel safe, rest starts to feel unfinished. Your pattern is not a lack of discipline; it is a system that has trouble trusting completion.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not let loose ends stay loose, and that shows up in the way you go back and re-check everything after finishing a task. In a workday, that means you catch the detail others would miss. The strength here is not just accuracy; it is the ability to stay with responsibility until it is truly closed."
    },
    {
     "title": "High standards",
     "body": "Your 82% Perfectionism means you care about quality in a very real way. That can make you the person who notices when the draft is off by one line or when the handoff needs one more pass. The useful part is that your standards are not vague; they are active and visible in what you choose to verify."
    },
    {
     "title": "Pressure tolerance",
     "body": "With Earth at 38%, you can hold a lot of structure without falling apart on the spot. That is why you can keep moving even when the week feels dense and the messages start early on Monday. The strength is steadiness under load, even if it currently costs more than it should."
    },
    {
     "title": "Alert recovery",
     "body": "Even though Recovery is low at 34%, you still notice when rest is not actually resting. That awareness matters, because it means the mismatch is visible to you, not hidden. In practice, that can be the first step toward choosing a different stopping point before the body has to crash first."
    }
   ],
   "weaknesses": [
    {
     "title": "Looping checks",
     "body": "Your strongest habit is also the one that keeps the day from ending cleanly: after a task is done, you go back and re-check everything. That can steal the relief that should come after completion and keep your nervous system on call. The scene is easy to picture: the document is sent, but the tab stays open."
    },
    {
     "title": "Thin recovery",
     "body": "With Recovery at 34%, rest does not fully register as a reset. You can sit down, but the mind keeps leaning forward, which is why a day off can still feel uneasy. The issue is not that you refuse to rest; it is that rest has a hard time getting in."
    },
    {
     "title": "Crash cycle",
     "body": "Cramming, then crashing is a pattern with momentum, not a one-off bad day. You push hard enough to get through, and then the drop comes all at once. The danger is not the effort itself; it is the way the effort is being spent in bursts instead of in a steadier line."
    },
    {
     "title": "Stop fear",
     "body": "The fear that stopping means falling behind keeps a lot of your decisions tied to motion. That makes it hard to leave a task alone, even when it is already good enough. The result is a kind of vigilance that looks productive from the outside and exhausting from the inside."
    }
   ],
   "fit_good": "You do best when your day has a clear finish line, written priorities, and a clean handoff, because that gives your mind fewer chances to keep re-checking after the work is done. A setup that limits late-night message traffic, especially before Monday, will help because that trigger tends to switch your tension back on. You’ll feel better when the day has one main target instead of endless open loops, so you can stop without feeling like you have to keep proving the result.",
   "fit_bad": "You struggle in a setting where messages keep arriving after the work should be over. A day built on constant interruptions, vague urgency, and open-ended rework will keep your checking habit alive. If the environment rewards always being available, your recovery will keep getting squeezed out.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "At the end of each work block, spend five minutes writing down what is finished and what is intentionally left for later. Do this once before you shut the laptop, not after you’ve already drifted back into checking. The goal is to give your mind one clean stopping point it can return to."
    },
    {
     "title": "Delay the check",
     "body": "When you feel the urge to re-open a finished task, wait ten minutes before touching it again. Use that time to stand up, get water, or step away from the screen. If the urge is still there after ten minutes, you can decide more clearly whether the check is real or just habit."
    },
    {
     "title": "Protect the off hour",
     "body": "Choose one hour in the evening where work messages stay unread unless they are truly urgent. Keep the phone out of reach during that hour so your body gets a real signal that the day is ending. This is less about discipline and more about giving Recovery a chance to show up."
    },
    {
     "title": "One-pass rule",
     "body": "For one routine task a day, allow yourself only one review before you send it or close it. Pick something small enough that the rule feels possible, like a brief update or a simple file check. The point is to practice ending on purpose, not to prove that everything is perfect."
    }
   ],
   "mindset_guide": "Think of your workday like a desk with one drawer that never quite closes. If you keep tugging it after every task, the whole desk starts to feel unstable. Your job is not to stop caring; it is to close the drawer once and trust the shape you already made. When the next message arrives, you can open it again by choice, not by reflex. That is how effort starts to feel finished instead of endless.",
   "closing_title": "When the checking stops",
   "closing_body": "31 to 40, Fire becomes stronger, and that changes the shape of your workday in a very specific way. The long, heavy stretch of holding everything together gives way to more movement, more visibility, and less room for endless re-checking. For a burnout pattern like yours, that means the body feels less pinned down, and the mind gets a little more permission to leave a task where it is. What you keep from this report is simple: your standards are real, but so is your need to stop before the work starts using you back."
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
 "mia": {
  "content": {
   "title_line1": "When the checklist never closes, your heart stays on duty",
   "title_line2": "And the part of you that wants rest keeps getting pulled back to the screen",
   "subtitle": "Module 3 Burnout deep report — saju × psych test × counseling integration",
   "opening_scene": "It’s late at night, and your phone lights up again with Monday-morning messages before the weekend even feels finished. You’ve already put the work down, but your mind is still holding the last task like it might slip away if you stop watching it. You re-open what you just finished, scan it one more time, and tell yourself you’re only being careful. But the body is tired, the mind is uneasy, and rest never quite lands as rest. Mia, doesn’t this feel exactly like your nights lately?",
   "case_tag": "EXAMPLE CASE — Hana, early 30s, trying to rest after work",
   "case_paragraphs": [
    "Hana finishes her tasks on time, but she never leaves them alone. After dinner, she opens the same file again, checks the details twice, and then checks the checking. Her Five Elements are also skewed in a way that makes the part of her that holds and organizes life run much hotter than the part that releases and restores. You’d recognize yourself in her before the night is over.",
    "By the time she sits down, her mind is already rehearsing the next message, the next correction, the next thing she might have missed. She looks calm from the outside, but the inside keeps moving like it can’t afford a pause. Her day becomes a cycle of cramming, then crashing, and the crash always arrives after the effort has already been spent. You do that too."
   ],
   "oheng_intro": "Your Five Elements are led by Wood at 38%, while Water sits at 13%. In your Day Master framework, Wood is the energy you work with to hold onto reality, money, and work, and Water is the energy you pour out through expression, talent, and release. In a burnout module, that mix shows up as someone who keeps gripping the task hard and then struggles to let the day soften afterward.",
   "quiz_reading": "Your 82% Perfectionism and 34% Recovery fit the Finisher's Drain pattern exactly: you keep tightening the last screw long after the job is done, then feel strangely unsteady when nothing is asking for your attention. That’s why a day off can still feel unfinished, even when you’ve done nothing wrong. The low Recovery score doesn’t mean you don’t want to rest; it means your mind doesn’t fully trust the pause yet.",
   "element_readings": {
    "wood": {
     "heading": "🌳 wood strong — the branch that keeps holding on",
     "body": "Your Wood is strong at 38%, so you don’t just notice what still needs doing — you feel responsible for it. That’s why a finished task can still pull your eyes back to the screen, even after you’ve already closed the laptop once. In your Day Master terms, this is the energy you use to hold onto work and practical reality, and it stays active even when the day is technically over. In burnout, that can look like someone who can’t fully release a job once it has entered their hands."
    },
    "fire": {
     "heading": "🔥 fire weak — heat that burns fast and disappears fast",
     "body": "Your Fire is 13%, so the burst of drive is there, but it doesn’t stay warm for long. You can power through a stretch of work with real intensity, then feel the drop all at once when the push is over. In a burnout pattern, that makes the first half of the day look sharper than the second half, as if the flame spent itself before the evening arrived. You don’t lack energy so much as you spend it in a concentrated way."
    },
    "earth": {
     "heading": "⛰️ earth weak — the ground that doesn’t get enough time to settle",
     "body": "Your Earth is 13%, so the part that normally helps a day feel settled and contained doesn’t stay heavy for long. That makes it harder for rest to feel like a real container, which is why even a quiet stretch can feel unfinished. In your burnout module, that shows up as the uneasy feeling that sitting still is somehow delaying something. You’re not refusing rest; your system just doesn’t sink into it easily."
    },
    "metal": {
     "heading": "💎 metal moderate — the edge that keeps the standard sharp",
     "body": "Your Metal is 25%, so there’s enough precision in you to notice what is off before anyone else does. That’s part of why you go back and re-check everything after finishing a task. In a burnout pattern, this kind of mid-range Metal keeps the standard clean but also keeps the pressure visible, especially when the work is already done. You carry a quiet insistence that if it’s worth doing, it’s worth getting exactly right."
    },
    "water": {
     "heading": "💧 water weak — the stream that needs room to move",
     "body": "Your Water is 13%, and your Metal helps support it, which means your ability to release and express doesn’t come from force; it comes from structure that lets it flow. Right now, that flow gets interrupted by re-checking, by Monday-morning messages, and by the feeling that rest still counts as a task. In burnout, that makes the mind keep circling after the work is done, instead of letting the day empty out. The good news is that your system responds when the pressure to prove everything is lowered."
    }
   },
   "upcoming_period_heading": "33 to 42 years old, Water takes the lead",
   "upcoming_period_body": "From age 33 to 42, Water becomes the stronger current in your 10-year cycle, and the pace of your inner life changes with it. The part of you that keeps holding the line starts to meet a softer flow, so your days no longer have to be carried only by grip and precision. That shift makes a different kind of recovery easier to reach, because expression, release, and relief are no longer so easy to crowd out. During this period, it helps to let one task end without sending it back through your hands again.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism is why one finished task still feels open in your head. You go back to check because Wood at 38% keeps holding the work, even after the work is done. That is why the mind stays active long after the screen goes dark.",
    "Your 34% Recovery explains why a day off can still feel uneasy. Water at 13% makes it hard to let the system fully empty, so rest arrives with a question mark instead of a landing. The body pauses, but the mind keeps listening for the next message."
   ],
   "answer_notes": [
    "Going back to re-check everything shows a mind that trusts precision more than completion. In daily life, that can look like reopening a sent message, rereading a finished draft, or checking one more detail before you let yourself move on. You chose the answer of someone who values accuracy, but pays for it with extra mental load.",
    "Feeling uneasy even when you rest shows that pause does not yet feel safe in your system. In real life, that can look like sitting on the couch while still scanning for what should be done next. You chose the answer of someone who wants rest, but doesn’t fully believe it can stay untouched."
   ],
   "chat_snapshot_note": "The core problem you named is that you rest, but it never feels like resting, and that sits right on top of being tired and a little anxious. What’s striking is how the fatigue and the anxiety don’t cancel each other out; they travel together, so even free time feels loaded. The line to keep is this: you’re not failing to rest — you’re resting under tension.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they don’t just bring information; they switch the whole system back on. They reactivate the part of you that already believes stopping means falling behind, which is why your nerves answer before your schedule does. That trigger matches your high Perfectionism and your strong Wood: once the work calls, your mind stands up immediately.",
   "chat_repeat_note": "The pattern is cramming, then crashing: you push hard, squeeze everything into a narrow stretch, and only notice the cost when the energy drops. In that loop, you choose effort first and recovery later, which makes the later part feel too late. A smaller way out is to stop one step earlier and leave the last check for tomorrow morning, not tonight.",
   "chat_fear_note": "You’re not just afraid of slowing down; you’re afraid of what slowing down might mean about your place in the race. Under that fear is a very plain wish: to keep up, to stay safe, and not to wake up feeling behind. That’s a tender wish, not a flaw.",
   "psychology_fact_heading": "The Zeigarnik effect",
   "psychology_fact_body": "The Zeigarnik effect describes how unfinished tasks stay more mentally active than completed ones. That’s a good fit for you, because even when the work is done, your attention keeps returning to what was just handled. With high Perfectionism, the task doesn’t feel closed until it has been rechecked, which keeps the mind attached to the job longer than the job itself lasts. In burnout, that means the evening can stay mentally open even after the work is technically over.",
   "psychology_takeaway": "Completion is not the same as release. For you, the next step is learning to let a finished thing stay finished.",
   "strengths": [
    {
     "title": "Careful finish",
     "body": "You don’t let sloppy work slip by, and that shows in the way you go back and re-check everything after finishing a task. In practice, that means your work is less likely to carry avoidable mistakes, even when you’re tired. The strength here is not just accuracy — it’s the seriousness you bring to what you touch."
    },
    {
     "title": "High follow-through",
     "body": "Your Wood at 38% gives you the stamina to keep a task in your hands until it is truly done. That can be seen in the way you push through and finish even when the day feels heavy. The good side of that is reliability: people can count on you to carry things through."
    },
    {
     "title": "Sensitive alarm",
     "body": "Your uneasiness on a day off shows that your system notices tension quickly, before it fully hardens. That means you catch pressure early, even if you don’t always know how to let it go. In your case, the alarm is not the problem — it’s a sign that your mind is paying close attention."
    },
    {
     "title": "Precision under pressure",
     "body": "Your 25% Metal keeps your standards visible even when you’re tired. That’s why you can still spot what needs another pass, even after a long stretch of effort. The strength is the clean edge: you know when something still needs care."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "Once a task is done, your mind doesn’t always let it stay done. You reopen, reread, and re-evaluate, which turns a finished thing into extra mental work. The cost is that your attention keeps paying for the same job twice."
    },
    {
     "title": "Delayed rest",
     "body": "A break doesn’t fully feel like a break for you, especially when Monday-morning messages are waiting in the background. Your body may stop, but your mind keeps standing guard. That makes recovery feel postponed even when the schedule has opened up."
    },
    {
     "title": "Pressure stacking",
     "body": "You cram first and crash later, which means your energy gets spent in a tight burst instead of in a steadier rhythm. The day can look productive from the outside while feeling increasingly strained on the inside. The pattern isn’t laziness; it’s overload arriving all at once."
    },
    {
     "title": "Fear of falling behind",
     "body": "A quiet fear sits underneath your pace: if you stop, you might lose your place. That thought makes rest feel risky, even when nothing urgent is actually happening. The result is that your mind keeps moving just to avoid the feeling of being left behind."
    }
   ],
   "fit_good": "You do best in a setting where tasks have a clear ending and you’re not asked to stay mentally on-call after the job is done. A day with clean handoffs, one defined check-in, and no endless message loop will help you breathe more evenly. You’ll feel better when your work can close at a real stopping point.",
   "fit_bad": "You struggle in a setting where messages arrive without warning and every finished task can be reopened at any time. A day built on constant pings, vague expectations, and last-minute corrections will keep your mind braced all evening. That kind of environment feeds your overchecking and makes rest feel impossible to trust.",
   "behavior_guides": [
    {
     "title": "Stop one pass earlier",
     "body": "When you finish a task, allow yourself exactly one review and then stop. Do it at the desk, not in bed, so your body learns that closure belongs to the workday. If the urge comes back later, write the note down and leave it for the next morning."
    },
    {
     "title": "Protect the first hour",
     "body": "Keep the first hour after work free of message checking, especially if Monday-morning messages are a trigger for you. Use that hour for a shower, a meal, or a quiet walk so your nervous system gets a real transition. One protected hour can make the evening feel less like a continuation of the job."
    },
    {
     "title": "Name the ending",
     "body": "Say out loud when a task is finished, even if no one else is there to hear it. Keep the sentence short: 'This is done for today.' Then close the file, move on, and let your mind learn that the work is complete instead of reopening it again."
    },
    {
     "title": "Schedule clean recovery",
     "body": "Put one small recovery block on your calendar and treat it like a real appointment. It can be 20 minutes of no checking, no fixing, and no planning. The point is not to do more rest; it’s to let rest be separate from performance."
    }
   ],
   "mindset_guide": "Think of your mind like a desk with one drawer that keeps sticking open. If you keep tugging at it, the drawer feels worse, not better. Your job is not to force the drawer shut by strength, but to oil the hinge by ending one thing cleanly and leaving it alone. When you do that, rest starts to feel like a place you can actually sit down in.",
   "closing_title": "When the work ends, you can too",
   "closing_body": "From age 33 to 42, Water becomes the stronger current in your 10-year cycle, and that changes the way your days are held. The tight, checking part of you does not disappear, but it no longer has to run the whole evening by itself. For this burnout pattern, that means the heavy, keyed-up feeling loosens, and rest starts to feel like rest instead of another task. What you’ll remember most from this report is simple: you are allowed to finish once."
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
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "sam": {
  "year": 2027,
  "title": "2027: a steadier fire",
  "subtitle": "A year of support, practice, and timely momentum",
  "overview": "In 2027, the year’s Fire tone meets your Earth Day Master in a way that feels supportive rather than demanding. That often reads like help arriving, learning becoming easier to absorb, and recovery happening through steady routines instead of dramatic shifts. With your Five Elements spread evenly across Wood, Earth, Metal, and Water, and no Fire in the mix, this can feel like a year that warms the whole system without overheating it.\n\nYour Mountain · Order nature suggests that you do well when life has structure, clear priorities, and a sense of grounded progress. In 2027, the first half of the year leans toward initiative and visible results, while the middle of the year asks for more patience and careful pacing. Later in the year, the rhythm softens into familiar territory, which can be useful for sorting, refining, and letting your energy settle into something more workable. Sam, this looks less like a year of dramatic reinvention and more like a year of better timing.",
  "chapters": {
   "wealth": {
    "heading": "Money and results with a light touch",
    "body": "In 2027, money and results look more active for you in the parts of the year when the Fire energy is something you can guide. That can feel like a good time to take the lead, ask for fair exchange, and turn effort into visible output. Because the impulse to push can get strong, the best gains are likely to come from clear limits rather than from doing everything at once.\n\nYou may notice practical situations where someone asks for your judgment, or where a project becomes easier to monetize once you narrow the scope. A purchase, a pricing conversation, or a shared expense may go more smoothly when you pause long enough to check the details. If you keep your Mountain-style order in view, you can make your resources work without scattering them.\n\nA useful starting point is to choose one financial priority at a time and let the rest wait their turn. Simple tracking, a calm review of recurring costs, or a smaller but cleaner commitment can feel more satisfying than a bigger but messy one. The year supports results best when your effort has a shape."
   },
   "love": {
    "heading": "Closer ties, gentler timing",
    "body": "In 2027, relationships can feel easier when the year’s Fire brings warmth and visibility without asking you to force closeness. Early in the year, you may come across as more direct, more decisive, or simply more willing to name what you want. Later, the mood softens, and connection may grow through steadier presence rather than through big declarations.\n\nYou might find yourself in conversations where a small misunderstanding clears quickly, or where someone responds well once you slow down and say what you mean plainly. Midyear, there can be a little more friction in the background, so it helps to avoid reading too much into a single moment. A familiar rhythm, a shared routine, or a simple invitation can do more than a dramatic gesture.\n\nTry letting one relationship breathe instead of trying to shape every detail. A thoughtful message, a patient reply, or a quieter plan together can open space for trust. In 2027, warmth seems to grow best when it’s steady, not hurried."
   },
   "career": {
    "heading": "Work that rewards clear direction",
    "body": "In 2027, your work life looks strongest when you choose direction early and then keep refining it. The year’s Fire can support leadership, output, and visible contribution, especially when you’re willing to set a pace instead of chasing every opportunity. Your Earth center tends to like dependable progress, so this can be a good year for making your work more legible to others.\n\nYou may find yourself being asked to take the lead, organize a moving part, or turn a rough idea into something practical. Midyear can bring more pressure, but it may also sharpen your focus if you give yourself a realistic sequence instead of trying to solve everything at once. Later in the year, the energy turns more expressive, which can be useful for presenting, teaching, or packaging what you know.\n\nA good first move is to define what “done” looks like before you begin. That one habit can save energy, reduce second-guessing, and make your output look cleaner. In 2027, your career tends to move best when your effort has a clear boundary."
   },
   "study": {
    "heading": "Learning that settles in",
    "body": "In 2027, learning looks like something that can finally land in your hands and stay there. The year’s supportive Fire can make it easier to absorb guidance, connect ideas, and build confidence through practice instead of pressure. For a Mountain · Order type, that often means you learn best when the material is organized and the path is visible.\n\nYou may notice that you remember things better when they are tied to a real task, a repeatable routine, or a clear outcome. Some months feel especially good for starting, while others are better for reviewing and integrating what you already know. If you try to learn everything at once, the year may feel noisy; if you pace yourself, it can feel surprisingly productive.\n\nStart with one topic that genuinely matters to your daily life. A short study block, a cleaner note system, or a regular review time can make the process feel much more natural. In 2027, understanding grows most easily when it has somewhere practical to go."
   },
   "health": {
    "heading": "Energy that benefits from rhythm",
    "body": "In 2027, your body and mind seem to respond well to warmth, routine, and a pace that doesn’t swing too wildly. Because your chart has no Fire, the year’s Fire can feel like a welcome addition, but too much speed may still leave you feeling scattered rather than refreshed. The sweet spot is likely to be steady movement, regular rest, and a rhythm that gives your system time to settle.\n\nYou may notice that busy stretches feel easier when you keep meals, sleep, and transitions fairly consistent. When the year gets louder, returning to familiar habits can help you feel more collected. A calm walk, a tidy workspace, or a brief pause between tasks may do more for you than trying to power through on will alone.\n\nPick one small rhythm to protect and let it anchor the rest of your day. Even a simple start-and-stop routine can make the year feel less fragmented. In 2027, balance seems to come from repetition that supports you, not from forcing extra intensity."
   }
  },
  "months": [
   {
    "headline": "A strong opening",
    "body": "February brings a push of initiative, and it may feel easier to steer money, plans, or priorities in a direction you choose. The Birth-like tone supports starting cleanly, while the sense of being on the move favors quick adjustments. Just keep the pace purposeful so enthusiasm doesn’t outrun your method."
   },
   {
    "headline": "Early momentum",
    "body": "March keeps the same active feel, but with a slightly more renewing edge, so a fresh version of a plan can take shape. Small hiccups may appear in the details, which makes this a good month for checking what you’ve assumed rather than rushing ahead. A modest correction now can save you from a bigger detour later."
   },
   {
    "headline": "Pressure with depth",
    "body": "April asks for more responsibility, and the momentum can be useful if you stay realistic about your limits. The inward, private tone may make you more reflective than usual, which is helpful for sorting priorities. It’s a good month to choose depth over speed."
   },
   {
    "headline": "Steady under strain",
    "body": "May can feel like a peak-effort month, with more demand and a few unexpected turns mixed in. Your best move is to keep your structure simple so you can respond without getting pulled off center. If you leave a little room in your schedule, the month becomes much easier to navigate."
   },
   {
    "headline": "Help arrives",
    "body": "June brings a fuller, more supportive current, and that can make learning, repair, or recovery feel more available. Because the energy also carries a clash-like tension with your inner foundation, change may come through a bump rather than a smooth glide. Treat that as a cue to adjust rather than to resist."
   },
   {
    "headline": "Useful surprise",
    "body": "July feels supportive but less predictable, so a flexible attitude helps you make the most of it. The wildcard quality can open a door you didn’t plan on, especially if you stay curious. This is a good month for trying a different route without insisting on perfect control."
   },
   {
    "headline": "Comfortable pace",
    "body": "August settles into familiar territory, which may feel restful after the earlier push. The energy winds down, so it’s easier to maintain than to initiate. Fresh ground is nearby, though, so even a small change in routine can feel pleasantly refreshing."
   },
   {
    "headline": "Quiet attraction",
    "body": "September keeps the gentle pace and adds a magnetic quality that can draw attention without much effort. A pause to tidy up fits the month well, especially if you want your space, schedule, or message to feel cleaner. What you polish now may quietly work in your favor later."
   },
   {
    "headline": "A productive spill",
    "body": "October turns expressive, and you may feel more like producing, sharing, or giving than storing energy. That can be rewarding, but it may also ask for more from you than you first expect. Waiting a little before committing can help you choose where your effort matters most."
   },
   {
    "headline": "Say it carefully",
    "body": "November still wants output, but the reset tone suggests a useful pause before the next move. Misread moments are possible, so it helps to check assumptions and make your meaning plain. A slower reply can be more effective than a fast one."
   },
   {
    "headline": "A controlled finish",
    "body": "December returns to a more directive rhythm, making it easier to take charge of outcomes and shape results. The commanding tone supports firm decisions, as long as you don’t overreach. A clear plan now can set up a cleaner transition into the next month."
   },
   {
    "headline": "Closing the loop",
    "body": "January feels like a quiet incubation period, with progress happening beneath the surface rather than in public view. The joining energy can bring people, ideas, or plans into alignment in a way that feels natural. It’s a good month to prepare, gather, and let the next step mature."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: define the target",
    "body": "Watch for a rise in initiative, stronger results, and a few moments that ask you to slow down and think. Choose one goal, make the steps visible, and keep your scope narrow enough that you can finish what you start."
   },
   {
    "title": "May to July: stay flexible under pressure",
    "body": "Notice where responsibility increases, where the pace gets uneven, and where help appears in unexpected ways. Leave buffer time, ask one clarifying question before you act, and use small adjustments instead of large corrections."
   },
   {
    "title": "August to October: refine and share",
    "body": "Look for a calmer rhythm, a more magnetic presence, and a stronger urge to express or produce. Tidy your systems, release what you no longer need, and choose one thing to present, publish, or complete with care."
   },
   {
    "title": "November to next January: close cleanly",
    "body": "Watch for moments of misunderstanding, the need to reset, and a quieter phase of preparation. Confirm details in writing, slow your replies when something feels fuzzy, and use the final months to gather energy for what comes next."
   }
  ],
  "closing": "From age 40 to 49, your 10-year cycle turns more Earth-heavy, and that is a real shift into a steadier chapter. In 2027, though, the story is still about support arriving, effort finding form, and your natural order helping you make good use of the year’s warmth.\n\nIf you let the pace be deliberate, Sam, 2027 can feel less like a test and more like a well-timed season of growth. The gains here are not loud; they’re the kind that settle in, hold shape, and make the next step easier to trust."
 },
 "riley": {
  "year": 2027,
  "title": "2027: a steadier bloom",
  "subtitle": "Riley, a year of giving shape to what you carry",
  "overview": "2027 feels like a year where your own energy is asked to move outward. Because your core nature is Wood and your chart is already rich in Wood, the Fire of 2027 can feel like a bright extension of what you already do well: express, produce, and give. That can be energizing, but it can also ask more from your attention and stamina than you may expect, so pacing matters.\n\nFor an Oak · Rooted type, the theme is not speed for its own sake. It is more like growing a strong trunk while letting the branches reach farther. The first half of the year leans toward support, learning, and momentum; the middle asks for clearer output and practical choices; the later months bring more structure, responsibility, and a chance to refine what really deserves your time. Riley, if you treat 2027 as a year of shaping rather than forcing, it can feel much more usable.",
  "chapters": {
   "wealth": {
    "heading": "Money follows clear motion",
    "body": "In 2027, money matters are best approached through active management rather than passive waiting. Your chart suggests a year where you can do well when you are intentional about what you create, what you charge for, and what you keep. Because Fire is something you feed, the more scattered your effort becomes, the easier it is to feel like resources are slipping through your fingers.\n\nIn daily life, this can show up as several small opportunities rather than one dramatic windfall: a side project, a clearer pricing conversation, or a chance to turn a skill into something visible. August and September especially may make it easier to push for results, but they can also tempt you to overdo it. A simple budget check, a written list of priorities, or one careful decision at a time can keep the year feeling grounded."
   },
   "love": {
    "heading": "Closeness through shared warmth",
    "body": "Relationships in 2027 may feel warmer when you are actively offering something real: time, attention, encouragement, or a practical helping hand. The year’s Fire energy can make your presence more noticeable, which helps connection grow, but it can also make you feel more visible than usual. That means honest, simple communication is likely to work better than dramatic gestures.\n\nYou may notice that February and March feel especially open to meeting support, while November can bring a more surprising turn in how people respond to you. For Riley, the most helpful move is to let connection build through small, repeatable acts instead of trying to define everything at once. If a conversation matters, ask one clean question and listen for the answer before deciding what it means."
   },
   "career": {
    "heading": "Work gains shape and weight",
    "body": "Career themes in 2027 point toward visible output and greater responsibility. Since your energy is already strong in Wood, the Fire of the year can help your ideas become more legible to other people: you may find it easier to present, explain, teach, or lead. The tradeoff is that your effort may be more noticeable too, so clarity and follow-through matter.\n\nIn practical terms, this can look like being trusted with a bigger task, being asked to organize a process, or needing to choose what to finish before adding anything new. October and November lean toward discipline and pressure, but in a way that can strengthen your structure if you keep the pace humane. A useful strategy is to separate what needs polish from what simply needs completion."
   },
   "study": {
    "heading": "Learning that feeds action",
    "body": "Study and skill-building in 2027 look especially helpful when they connect directly to what you want to express. Your chart has enough Wood to learn quickly when the material feels alive, and the year’s Fire can help you turn knowledge into something visible. That makes this a good year for learning by doing, not just collecting information.\n\nYou may find that February, March, and December are friendlier for absorbing support, reviewing notes, or recovering confidence in a subject. Later, especially around midyear, you might prefer shorter study bursts that lead to immediate use. A small, consistent practice — one page, one lesson, one repurposed note — can be more effective than waiting for the perfect block of time."
   },
   "health": {
    "heading": "Keep your rhythm breathable",
    "body": "For body and mind, 2027 asks for rhythm more than force. Because you are likely to be giving a lot outward, the main question is not whether you can keep going, but how you can keep your energy breathable while you do it. Quiet storage periods in the year suggest that rest, retreat, and simple routines are not a luxury; they are part of how you stay steady.\n\nIn ordinary life, that may mean noticing when your schedule gets too full of talking, planning, and producing. The middle of the year can feel especially active, so small resets — a slower morning, an earlier stop, a walk without input — may help you stay clear. If you keep returning to basic routines that feel natural, your energy is more likely to stay usable instead of frayed."
   }
  },
  "months": [
   {
    "headline": "February: open hands",
    "body": "Help, learning, and recovery are easier to receive now, so let support arrive without overexplaining it. Fresh starts can feel practical rather than flashy, which makes this a good month for taking the first step on something simple."
   },
   {
    "headline": "March: magnetic lift",
    "body": "This month carries a stronger pull toward connection and momentum, so people may notice you more readily. Full power is available, but it works best when you choose one direction instead of scattering your attention."
   },
   {
    "headline": "April: familiar ground",
    "body": "The energy here feels comfortable and known, with less surprise and less pressure to reinvent anything. If you want a new spark, you may need to create it yourself through a small change in routine."
   },
   {
    "headline": "May: slow read",
    "body": "Things may feel steady, but also a little easier to misread if you move too quickly. Winding down is the key note here, so double-checking messages and timing can save you from avoidable confusion."
   },
   {
    "headline": "June: speak and shape",
    "body": "Your output wants to become visible now, and this can be a strong month for presenting, sharing, or taking the lead in a practical way. Because the energy is active, it helps to leave room for recovery after you finish the important part."
   },
   {
    "headline": "July: quiet storage",
    "body": "This is a good month to keep what matters close and build from within rather than announcing everything. Advancement is possible, but it may come through patient preparation rather than immediate applause."
   },
   {
    "headline": "August: moving pivot",
    "body": "A shift in place, plans, or priorities may feel more likely here, and the movement itself can open useful doors. Since your chart shows a stronger push to manage resources, this is a month to stay alert to overreach while still acting decisively."
   },
   {
    "headline": "September: steady gain",
    "body": "Results can be easier to pursue now, especially if you keep your eye on what is concrete and measurable. Small hiccups may appear, so a bit of extra checking before you send, buy, or commit can keep the month smooth."
   },
   {
    "headline": "October: inner pressure",
    "body": "Responsibility may feel heavier, but the good news is that a slower pace can make you stronger rather than weaker. This is a month for private focus, careful order, and choosing what truly deserves your effort."
   },
   {
    "headline": "November: turning point",
    "body": "Unexpected turns are more likely to come through people or situations that suddenly align with you in a new way. Because the month supports a sense of joining and connection, staying flexible may help you use the change instead of resisting it."
   },
   {
    "headline": "December: renewed breath",
    "body": "Support returns more clearly now, and that can make it easier to recover confidence or revisit something with fresh eyes. Friction may still appear, but it can be useful if it helps you notice what is worth refining."
   },
   {
    "headline": "January: forward spark",
    "body": "The year closes with renewed momentum, which can make it easier to begin again without forcing a grand plan. Wildcard energy means the best move may be to stay open, respond quickly, and let the next useful step reveal itself."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive and refine",
    "body": "Watch for help that arrives through people, timing, or a welcome sense of ease. A good action is to choose one area where you can accept support, then turn that support into a small, repeatable routine."
   },
   {
    "title": "May to July: express with care",
    "body": "Notice where your output starts to increase and where your energy begins to feel more spent. Try one focused project, one clear message, or one practical offering so your effort has a shape instead of spreading thin."
   },
   {
    "title": "August to October: manage the push",
    "body": "Pay attention to momentum, movement, and the urge to push for results. The most helpful action is to set one limit before you begin, so ambition stays useful rather than tipping into overextension."
   },
   {
    "title": "November to January: adapt and reset",
    "body": "Look for surprising openings, new alignments, and moments when a fresh approach feels easier than the old one. A good move is to review what worked, keep the parts that still fit, and start the next cycle with a lighter plan."
   }
  ],
  "closing": "At 46 years old, the stronger Earth phase is a real upcoming shift, and it marks the closing of one chapter and the opening of another with more structure. In 2027, that makes it especially worthwhile to practice clear priorities, gentle pacing, and honest follow-through so the year can support you instead of draining you. Riley, if you let the year stay practical and alive, it can become a very usable stretch of growth."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, tu pulso interior",
  "subtitle": "Un año de ritmo claro, impulso medido y retornos útiles",
  "overview": "Lucía, en 2027 tu Agua central se encuentra con un año de fuego, y eso suele sentirse como una relación de fuerza y dirección: hay margen para tomar la iniciativa, mover dinero, ordenar prioridades y empujar resultados. Con tu mezcla de tierra alta y metal ausente, el año pide criterio, no solo entusiasmo; cuando eliges bien el foco, el movimiento se vuelve productivo, y cuando te exiges de más, el mismo impulso puede volverse disperso.\n\nTu tipo de mapa, El rocío · Orden, encaja con una forma de avanzar que prefiere la claridad, la utilidad y los pasos que dejan algo concreto. En 2027 conviene pensar en términos de ritmo: primero observar, luego actuar, y después revisar. No es un año para hacer ruido por hacer ruido, sino para usar bien la energía disponible, cuidar tus recursos y dejar que la intención tenga forma.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con dirección",
    "body": "En 2027 el tema del dinero aparece con fuerza porque el fuego te da margen para dirigir, negociar y buscar resultados. Como tu mapa ya trae mucha tierra, la clave no será solo producir, sino decidir con qué te quedas y qué dejas pasar para no dispersar esfuerzo.\n\nEn la práctica, este año puede mostrarte momentos en los que te conviene revisar precios, prioridades o acuerdos antes de mover una pieza importante. También pueden aparecer oportunidades de generar valor a partir de lo que ya sabes hacer, especialmente si conviertes ideas sueltas en algo claro y útil. Lucía, si algo promete mucho pero exige demasiado desorden, te conviene mirarlo dos veces.\n\nEmpieza por una acción simple: ordenar tus entradas y salidas, y elegir una meta concreta para cada tramo del año. Si tu energía se concentra, el dinero tiende a responder mejor que si intentas abarcarlo todo a la vez."
   },
   "love": {
    "heading": "Vínculos más claros",
    "body": "En relaciones y amor, 2027 favorece los vínculos donde hay presencia, iniciativa y conversación directa. Tu Agua busca profundidad, pero el fuego del año puede pedir más visibilidad y menos silencios largos; eso hace que algunas conexiones se sientan más vivas, aunque también más sensibles a malentendidos si no nombras lo que necesitas.\n\nPuedes notar escenas muy cotidianas: una respuesta que llega con tono ambiguo, una propuesta que te anima a moverte, o una charla que aclara algo que venía flotando desde hace tiempo. Este año conviene escuchar con atención y responder con sencillez; no hace falta adornar tanto si el mensaje real ya está claro. Cuando el vínculo es bueno, la franqueza lo fortalece; cuando no lo es, te ayuda a ver límites.\n\nTe puede servir empezar por frases breves y honestas, sin explicar de más. Si cuidas el tono y no saltas a conclusiones, las relaciones ganan espacio para crecer con más calma."
   },
   "career": {
    "heading": "Trabajo con foco",
    "body": "En trabajo y carrera, 2027 se siente como un año para tomar dirección y mostrar capacidad de decisión. El fuego te pone al frente de tareas, objetivos o responsabilidades, y eso puede darte visibilidad si mantienes el orden; con tu perfil de Orden, el avance suele llegar cuando conviertes presión en método.\n\nEl día a día puede traerte encargos con plazos ajustados, momentos en que te toque coordinar a otras personas o situaciones en las que tu criterio tenga más peso que tu velocidad. También puede haber reconocimiento cuando tu forma de resolver problemas deja resultados visibles. Lo importante será no confundir movimiento con efectividad: avanzar mucho no siempre significa avanzar bien.\n\nUna buena puerta de entrada es revisar qué tarea merece tu atención más fina y cuál puedes simplificar. Si eliges un frente principal y sostienes el ritmo, 2027 puede dejarte una sensación sólida de logro."
   },
   "study": {
    "heading": "Aprender con orden",
    "body": "La parte de aprendizaje en 2027 tiene un tono muy útil: no se trata tanto de acumular datos como de darles forma. Tu mapa responde bien a los procesos que ordenan, clasifican y vuelven práctica una idea, y el año favorece justamente ese tipo de estudio aplicado.\n\nPuedes encontrarte con temas que al principio parecen lentos, pero que después encajan mejor de lo esperado. También puede ser un buen momento para retomar un curso, profundizar en una habilidad o convertir una curiosidad en algo más estable. La sensación no será de desborde, sino de progresión silenciosa, como si cada paso pequeño dejara una base más firme.\n\nPrueba a estudiar con objetivos cortos y concretos, en vez de querer dominarlo todo de golpe. Si registras avances visibles, tu motivación se mantiene mejor y el aprendizaje se vuelve más amable."
   },
   "health": {
    "heading": "Ritmo y descanso",
    "body": "En cuerpo y mente, 2027 pide cuidar el ritmo más que apretar el paso. Con fuego fuerte alrededor de tu Agua, puedes sentir más intensidad interna, más ganas de hacer y también más facilidad para agotarte si no alternas esfuerzo con pausa; aquí la clave está en regular, no en forzar.\n\nEn el día a día eso puede verse como semanas muy activas seguidas de momentos en los que necesitas silencio, orden o una tarde sin demasiadas demandas. Tu 12ª energía del año habla de recogimiento y de mundo interior, así que no extrañaría que te siente bien reservar espacios sin estímulo para pensar, bajar revoluciones y escuchar lo que de verdad te pide el cuerpo.\n\nEmpieza por algo muy simple: dormir con más regularidad, dejar huecos entre compromisos y no llenar todos los espacios libres. Cuando tu agenda respira, tú también respiras mejor."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "En febrero de 2027 conviene prestar atención a lo que sientes antes de hablar, porque el mes puede traer emociones a flor de piel y algunos malentendidos. Si bajas un poco la velocidad, te resultará más fácil distinguir entre una impresión momentánea y un tema que de verdad necesita respuesta."
   },
   {
    "headline": "Marzo con impulso",
    "body": "Marzo trae una sensación de brote: algo empieza a moverse con más naturalidad y te pide tomar un poco más de iniciativa. También aparece un tono de liderazgo que favorece coordinar, proponer o dar el primer paso sin esperar tanto permiso externo."
   },
   {
    "headline": "Abril que crece",
    "body": "En abril la energía se parece a un crecimiento silencioso: se nota menos desde fuera, pero por dentro hay trabajo real. El reconocimiento puede llegar por algo que vienes sosteniendo desde hace tiempo, así que te conviene seguir con constancia aunque el aplauso todavía no sea inmediato."
   },
   {
    "headline": "Mayo en movimiento",
    "body": "Mayo favorece la semilla que busca sitio: hay ganas de moverte, probar y abrir una ruta nueva. Si canalizas ese impulso en una sola dirección, el mes te deja más avance que dispersión."
   },
   {
    "headline": "Junio de cierre",
    "body": "Junio se mueve como un cierre de ciclo y puede ayudarte a tomar decisiones con más firmeza. Eso sí, pequeños contratiempos pueden pedirte paciencia con detalles prácticos, así que te conviene revisar antes de dar algo por terminado."
   },
   {
    "headline": "Julio hacia dentro",
    "body": "Julio invita al recogimiento y a una mirada más privada de lo que estás viviendo. Es un mes útil para revisar deseos, ordenar ideas y cuidar tu mundo interior sin necesidad de explicarlo todo."
   },
   {
    "headline": "Agosto con peso",
    "body": "Agosto trae pausa para ordenar, junto con atención a los recursos. La presión puede subir un poco, pero si eliges un ritmo medido y miras bien dónde se va tu energía, el mes te ayuda a sostenerte con más solidez."
   },
   {
    "headline": "Septiembre tenso",
    "body": "En septiembre la energía aprieta más y puede tocarte ajustar la forma en que respondes a responsabilidades y roces. Como la rama terrestre del mes choca con la de tu día de nacimiento, algo puede cambiar de forma visible; te conviene no reaccionar en automático y dar espacio a la transición."
   },
   {
    "headline": "Octubre aliado",
    "body": "Octubre se siente como un apoyo que entra de forma más suave, con ritmo más lento y ayuda concreta. La combinación favorece el aprendizaje, la recuperación y los acuerdos que encajan mejor de lo previsto."
   },
   {
    "headline": "Noviembre abierto",
    "body": "En noviembre hay plenitud y también cambio de aire, así que el mes puede traerte una sensación de renovación amable. Si aprovechas cualquier ayuda o información que aparezca, tendrás más margen para afinar tus decisiones."
   },
   {
    "headline": "Diciembre fértil",
    "body": "Diciembre vuelve a un tono parecido al inicio del año, pero con más fruto visible por el esfuerzo sostenido. El magnetismo del mes puede hacer que otros noten más tu presencia; úsalo para mostrar resultados, no para forzarlos."
   },
   {
    "headline": "Enero paciente",
    "body": "En enero de 2028 el clima sigue siendo familiar y cómodo, aunque con menos estímulo nuevo. La confianza sube poco a poco y el tiempo de espera te favorece si dejas que las cosas maduren sin apurar demasiado."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vigila cómo pasan de la sensibilidad inicial al crecimiento silencioso. En este tramo, te conviene anotar qué temas te mueven de verdad y empezar una sola prioridad pequeña para no dispersar energía."
   },
   {
    "title": "De mayo a julio",
    "body": "Observa el aumento de movimiento, el cierre de ciclo y el giro hacia dentro. En estos meses, el mejor paso suele ser elegir una meta concreta, terminar lo que ya está listo y reservar un espacio semanal para ordenar tus ideas."
   },
   {
    "title": "De agosto a octubre",
    "body": "Mira con cuidado la presión de agosto, los roces de septiembre y la ayuda que llega en octubre. Te puede servir revisar recursos, bajar un poco el ritmo cuando haga falta y aceptar apoyo sin querer resolver todo por tu cuenta."
   },
   {
    "title": "De noviembre a enero",
    "body": "Sigue la mezcla de plenitud, magnetismo y espera tranquila. Aquí funciona bien cerrar pendientes, mostrar lo que ya quedó sólido y dejar una lista corta de prioridades para entrar en 2028 con más claridad."
   }
  ],
  "closing": "A los 38 años, desde ahora se abre un ciclo de diez años con fuego más fuerte, y eso marca un cambio real de fondo en tu mapa. En 2027, sin embargo, la clave sigue siendo la misma: usar bien la energía, elegir el foco y dejar que la claridad pese más que la prisa. Si haces eso, Lucía, el año puede sentirse menos como una carrera y más como una construcción firme, con resultados que sí te representan."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027년, 지수님의 흐름을 읽는 해",
  "subtitle": "채워짐과 소모가 함께 오는 해, 속도 조절이 열쇠예요",
  "overview": "지수님, 2027년은 에너지가 바깥으로 많이 흘러나가는 한 해로 읽혀요. 표현, 생산, 베풂 같은 움직임이 자연스럽게 늘어나는 대신, 그만큼 체력과 마음의 여유를 의식적으로 챙겨야 편한 흐름이에요. 지수님의 중심 기운이 나무라면, 이 해의 불기운은 그 나무를 자라게도 하지만 열을 더하기도 하니, “무엇을 더할지”보다 “어디서 덜어낼지”를 잘 고르면 한결 안정적일 거예요.\n\n또 한편으로는 지수님 사주의 바탕에 흙의 비중이 큰 편이라, 2027년에는 결과를 빨리 내기보다 구조를 단단히 만드는 방식이 잘 맞아요. 거목 · 성취 유형답게 한 번 방향이 잡히면 꾸준히 밀고 가는 힘이 있으니, 급한 자극보다 오래 쓸 수 있는 리듬을 고르는 편이 좋아요. 반대로 2027년에는 도움과 배움이 들어오는 시기와, 주도권을 잡아 성과를 밀어붙이기 좋은 시기가 번갈아 나타나니, 흐름을 나눠서 쓰는 감각이 중요합니다.",
  "chapters": {
   "wealth": {
    "heading": "성과를 다루는 법",
    "body": "2027년의 재물 흐름은 ‘더 벌기’보다 ‘내가 만든 결과를 어떻게 다룰지’에 가까워 보여요. 특히 8월경과 9월경에는 주도권이 살아나고 성과를 밀어붙이기 좋은 기운이 들어와서, 지수님이 직접 결정하고 움직일수록 손에 잡히는 느낌이 생기기 쉬워요. 다만 과욕이 붙으면 힘이 분산될 수 있으니, 숫자보다 우선순위를 먼저 정해 두면 편합니다.\n\n일상에서는 한 번에 여러 갈래를 벌리기보다, 눈에 보이는 하나를 정리하는 장면이 잘 맞아요. 예를 들어 지출·수입·받을 것들을 한 번에 점검하거나, 미뤄 둔 정산을 짧게 끊어 처리하면 흐름이 가벼워질 수 있어요. 지수님에게는 “크게 한 번”보다 “작게 여러 번” 손보는 방식이 더 안정적입니다.\n\n작게 시작하려면 8~10월경에 목표를 두 개만 정해 보세요. 하나는 지키는 것, 하나는 줄이는 것으로 나누면, 성과를 밀어붙이는 힘이 과하게 새지 않고 오래 이어지기 좋아요."
   },
   "love": {
    "heading": "가까워지는 속도",
    "body": "관계와 연애 쪽에서는 2027년 초반의 2월경, 3월경이 특히 부드럽게 열려요. 도움과 배움, 회복이 들어오는 흐름이라서, 누군가와의 관계도 “내가 뭘 보여주느냐”보다 “서로 어떻게 편해지느냐”에 초점이 맞기 쉬워요. 3월경에는 어울려 붙는 관계가 들어와서, 자연스럽게 대화가 이어지거나 마음이 가까워지는 장면이 생기기 좋습니다.\n\n4월경에는 익숙한 결이 강해지면서, 편안하지만 새 자극은 적은 분위기가 느껴질 수 있어요. 게다가 부딪히며 전환이 생기는 흐름도 함께 들어오니, 가까운 사이일수록 말의 온도를 조금 낮추면 좋습니다. 지수님은 관계를 밀어붙이기보다, 리듬을 맞추는 쪽에서 편안함을 찾기 쉬워요.\n\n작게 해볼 수 있는 방법은 2~4월경에 연락의 속도를 맞추는 거예요. 자주 만나야만 가까운 것이 아니라, 부담 없이 이어지는 짧은 응답이나 가벼운 약속이 관계를 더 오래 살릴 수 있어요."
   },
   "career": {
    "heading": "밀고 당기는 일",
    "body": "일과 커리어에서는 2027년이 한쪽으로만 가지 않고 여러 결이 번갈아 들어오는 해예요. 6월경과 7월경에는 지수님이 기운을 바깥으로 내보내는 흐름이 강해져서, 결과물을 만들고 보여주고 나누는 일에 힘이 실리기 쉬워요. 반면 10월경과 11월경에는 책임과 압박이 늘어날 수 있어, 속도를 잘 고르면 오히려 단단해지는 시기로 읽혀요.\n\n현실 장면으로는, 갑자기 요청이 늘거나 한 번 더 확인해야 할 일이 많아질 수 있어요. 이런 때 지수님은 모든 걸 즉시 처리하려 하기보다, 우선순위를 정해 순서를 세우는 편이 좋아요. 12월경과 1월경에는 다시 도움과 회복의 기운이 들어오니, 한 해의 마무리를 정리하고 다음 연결을 준비하기에도 괜찮습니다.\n\n작게 시작하려면 5~7월경에 ‘보여줄 일’과 ‘정리할 일’을 분리해 보세요. 밖으로 내보내는 일은 짧고 선명하게, 안쪽 정리는 천천히 두면 2027년의 흐름을 훨씬 덜 소모적으로 쓸 수 있어요."
   },
   "study": {
    "heading": "배움은 들어오고 나가고",
    "body": "배움의 흐름은 2027년 내내 고르게 한 방향만 향하기보다, 채워짐과 표현이 번갈아 오는 모습이에요. 2월경과 12월경, 1월경에는 도움과 회복이 들어와서 받아들이고 익히는 데 유리하고, 6월경과 7월경에는 아는 것을 밖으로 내보내며 정리하는 데 힘이 실려요. 지수님처럼 바탕에 흙의 비중이 큰 편은 이런 순환형 학습과 잘 맞습니다.\n\n구체적으로는, 새로 배우는 시기에는 메모를 길게 쌓기보다 핵심만 간단히 적어 두는 편이 좋고, 설명하는 시기에는 짧게 말로 풀어보는 방식이 잘 맞아요. 3월경에는 합이 들어와서 누군가와 함께 배우거나 질문을 주고받기 쉬울 수 있고, 10월경 이후에는 책임감이 붙으면서 배운 것을 실제 틀로 묶어 보기 좋아집니다.\n\n작게 시작하려면 2~4월경에 한 가지 주제를 골라 “배우기-말하기-정리하기”를 한 번씩만 돌려 보세요. 완벽하게 이해하려 하기보다, 다시 꺼내 쓸 수 있는 형태로 남기는 것이 더 실용적이에요."
   },
   "health": {
    "heading": "리듬을 지키는 해",
    "body": "몸과 마음의 돌봄에서는 2027년이 ‘무리하지 않기’보다 ‘리듬을 잘 나누기’에 가까워요. 불기운이 강해지면서 에너지가 밖으로 많이 쓰이기 쉬우니, 한 번에 오래 버티는 방식보다 짧게 집중하고 자주 쉬는 방식이 더 잘 맞습니다. 지수님에게는 특히 6월경부터 9월경까지가 활동량이 늘기 쉬운 구간이라, 생활 템포를 조금 더 의식적으로 잡아두면 편해요.\n\n일상에서는 잠드는 시간, 식사 간격, 혼자 조용히 있는 시간을 너무 들쑥날쑥하게 두지 않는 것이 도움이 돼요. 10월경과 11월경에는 책임이 늘며 마음이 빡빡해질 수 있으니, 그 전에 산책, 정리, 짧은 휴식 같은 작은 완충을 넣어 두면 부담이 덜해집니다. 반대로 12월경과 1월경에는 회복의 기운이 들어오니, 다시 채우는 루틴을 시작하기 좋아요.\n\n작게 시작하려면 한 주에 한 번만 “에너지가 새는 곳”을 적어 보세요. 줄일 것 하나, 지킬 것 하나만 정해도 2027년의 소모를 꽤 부드럽게 다룰 수 있습니다."
   }
  },
  "months": [
   {
    "headline": "2월, 회복의 문",
    "body": "2027년 2월경은 지수님에게 도움과 배움이 들어오는 흐름이 먼저 느껴지는 달이에요. 12운성의 건록이 살아 있어서, 다시 힘을 받거나 시작점을 잡기 좋은 기운이 보입니다."
   },
   {
    "headline": "3월, 맞물리는 관계",
    "body": "3월경에는 어울려 붙는 관계가 들어와서 사람과 사람 사이의 결이 자연스럽게 맞기 쉬워요. 제왕의 기운이 있어 존재감이 또렷해지지만, 그만큼 주변과의 호흡을 잘 맞추면 더 편합니다."
   },
   {
    "headline": "4월, 방향 전환",
    "body": "4월경은 익숙한 결이 강하면서도, 부딪히며 방향이 바뀌는 흐름이 함께 들어와요. 쇠의 기운답게 정리와 전환이 함께 오니, 애매한 것은 한 번 더 확인해 두면 좋습니다."
   },
   {
    "headline": "5월, 익숙한 온도",
    "body": "5월경은 편안하고 익숙한 분위기가 중심이 되기 쉬워요. 다만 새 자극은 많지 않을 수 있고, 병의 기운처럼 컨디션보다 분위기가 먼저 느껴질 수 있으니 일상 리듬을 단정하게 두면 좋아요."
   },
   {
    "headline": "6월, 밖으로 흐름",
    "body": "6월경에는 지수님이 기운을 바깥으로 내보내는 흐름이 강해져요. 사의 기운이 들어와 표현과 생산이 늘기 좋지만, 장성살의 영향처럼 추진력이 살아나는 만큼 에너지 소모도 함께 커질 수 있습니다."
   },
   {
    "headline": "7월, 나누는 힘",
    "body": "7월경도 계속해서 베풂과 표현이 살아나는 달이에요. 묘의 기운과 반안살이 겹쳐, 누군가를 돕거나 결과를 공유할 때 자연스러운 호응을 얻기 쉬운 흐름입니다."
   },
   {
    "headline": "8월, 주도권 잡기",
    "body": "8월경은 성과를 밀어붙이기 좋은 기운이 또렷해져요. 절의 기운과 역마살이 함께 들어와 속도를 내기 쉬우니, 움직임이 많아질수록 중심을 분명히 두는 것이 좋습니다."
   },
   {
    "headline": "9월, 조율의 달",
    "body": "9월경에는 주도권을 쥐되, 과하게 밀지 않는 감각이 중요해요. 태의 기운과 육해살이 함께 들어와서, 부드럽게 조율하면 흐름이 매끈해지고 급하게 밀면 손이 많이 갈 수 있습니다."
   },
   {
    "headline": "10월, 책임의 무게",
    "body": "10월경은 책임과 압박이 늘어나지만, 속도를 잘 고르면 오히려 단단해지는 달이에요. 양의 기운과 화개살이 있어 혼자 정리하고 생각을 깊게 하는 데 유리합니다."
   },
   {
    "headline": "11월, 집중의 압력",
    "body": "11월경에는 해야 할 일이 무겁게 느껴질 수 있어요. 장생의 기운이 들어와 오래가는 힘은 생기지만, 겁살의 영향처럼 마음이 조급해지지 않게 속도를 낮추는 편이 좋습니다."
   },
   {
    "headline": "12월, 다시 채우기",
    "body": "12월경은 다시 도움과 회복이 들어오는 흐름으로 돌아와요. 목욕의 기운과 재살이 함께 있어, 불필요한 것을 씻어내고 새로 채울 것을 고르기에 알맞습니다."
   },
   {
    "headline": "1월, 다음 준비",
    "body": "2028년 1월경도 2027년의 끝자락에서 도움과 배움이 이어지는 달이에요. 관대의 기운과 천살이 있어, 넓게 열어 두되 서두르지 않고 다음 흐름을 준비하기 좋습니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 관계와 정리",
    "body": "이 구간은 도움을 받기 쉽고, 관계의 결도 잘 맞는 흐름을 따라가기 좋아요. 새로 들어오는 정보나 사람을 바로 판단하기보다, 한 번 더 듣고 정리하는 습관을 붙여 보세요."
   },
   {
    "title": "5~7월경: 표현과 생산",
    "body": "이 구간은 바깥으로 에너지가 많이 나가므로, 보여줄 것과 나눌 것을 분리해 두는 것이 좋아요. 짧게 완성하는 작업 하나와, 천천히 키울 작업 하나를 나눠 두면 소모가 덜합니다."
   },
   {
    "title": "8~10월경: 주도권과 속도",
    "body": "이 구간은 성과를 밀어붙이기 좋은 흐름과 책임이 함께 와요. 한 번에 크게 움직이기보다, 우선순위를 정하고 중간 점검을 넣으면 과욕을 줄이면서도 힘 있게 갈 수 있습니다."
   },
   {
    "title": "11월~다음해 1월경: 회복과 준비",
    "body": "이 구간은 압박을 지나 다시 채우는 흐름이 들어옵니다. 지수님은 휴식, 정리, 재학습 중 하나를 골라 작게 시작해 두면 다음 흐름을 훨씬 편하게 맞이할 수 있어요."
   }
  ],
  "closing": "36세부터 45세까지는 수 기운이 강해지는 시기입니다. 지금까지의 시기가 저물고 다음 장이 열리는 전환으로 볼 수 있어요. 그런 흐름 위에서 2027년은 지수님이 바깥으로 많이 내보내고, 또 다시 채우는 리듬을 익히기 좋은 해로 보입니다. 서두르기보다 흐름을 나눠 쓰면, 이 해의 열기가 훨씬 부드럽게 힘이 되어 줄 거예요."
 },
 "casey": {
  "year": 2027,
  "title": "2027, tu ritmo se afina",
  "subtitle": "Un año de presión útil, avances medidos y momentos para ordenar el paso",
  "overview": "Casey, en 2027 tu energía de base es metal, y eso se nota en un año que pide forma, criterio y buena administración del esfuerzo. Como tu mapa tiene 38% madera y 38% metal, con 13% fuego, 13% tierra y 0% agua, el contraste con el fuego de 2027 suele sentirse como una etapa que te empuja a responder, decidir y sostener ritmo sin perder precisión. Tu tipo, El acero · Cosecha, encaja bien con esa idea: no se trata de correr más, sino de refinar lo que ya sabes hacer.\n\nLa sensación general de 2027 es la de un año que te exige y, al mismo tiempo, te fortalece. Hay momentos en que tu energía se expande hacia afuera, otros en que conviene ordenar, y otros en que recibes apoyo o simplemente compartes el mismo tono del entorno. La clave está en no querer resolver todo a la vez: cuando eliges bien el paso, el año te devuelve estructura, claridad y una confianza más serena.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso firme",
    "body": "En 2027, el dinero y los recursos se ven mejor cuando tú tomas la iniciativa con cabeza fría. El fuego del año te empuja a mover piezas, pedir más, producir más o buscar resultados visibles, pero tu metal necesita medida; por eso, el mejor escenario no es el impulso rápido, sino la decisión clara. Con tanta madera y metal en tu mapa, es fácil que aparezca tensión entre crecer y conservar, así que conviene pensar en términos de orden y no de urgencia.\n\nEn la vida diaria, esto puede verse como semanas en las que llegan encargos, ventas, propuestas o tareas que te ponen en el centro de la acción. También puede aparecer la tentación de decir que sí a más de lo razonable, o de querer ver resultados demasiado pronto. Si notas que la velocidad sube, Casey, te conviene revisar números, plazos y prioridades antes de cerrar nada.\n\nEmpieza por algo pequeño: define un límite para cada bloque de gasto y otro para tu energía. Si haces una lista breve de lo que sí mueve valor y de lo que solo te dispersa, 2027 se vuelve mucho más manejable."
   },
   "love": {
    "heading": "Vínculos que piden tacto",
    "body": "En relaciones, 2027 te invita a mostrar más, pero sin perder tu centro. Hay tramos en que tu energía se expresa con fuerza, y eso puede hacer que hables más claro, que des mucho o que quieras resolver rápido lo que sientes. Como tu mapa tiene bastante metal, tu manera natural es directa; este año, la suavidad será tan importante como la honestidad.\n\nEn lo cotidiano, podrías notar conversaciones que se encienden con facilidad, encuentros donde se siente movimiento o momentos en que alguien te pide presencia real. También puede haber roces pequeños por ritmo, expectativas o por no decir algo a tiempo. No hace falta dramatizar: basta con escuchar un poco más antes de responder, y dejar espacio para que el otro también termine su idea.\n\nUna forma simple de cuidar este campo es elegir una conversación tranquila por semana, sin intentar arreglarlo todo. Si das un paso pequeño hacia el intercambio sincero, el vínculo gana aire y tú ganas calma."
   },
   "career": {
    "heading": "Trabajo con más relieve",
    "body": "En trabajo y carrera, 2027 se siente como un año que te pone a prueba y te da forma. El fuego del entorno te pide responsabilidad, respuesta rápida y capacidad de sostener presión, pero tu metal puede convertir eso en calidad si eliges bien el ritmo. No se trata de hacer más por hacer más, sino de mostrar criterio, consistencia y una presencia que se nota.\n\nEn el día a día, esto puede verse como más tareas visibles, pedidos urgentes o momentos en que te toca coordinar, decidir o resolver con poco margen. También puede haber semanas de cambio inesperado, así que te conviene tener márgenes y no construir todo sobre una sola opción. Cuando mantienes margen de maniobra, el año deja de sentirse pesado y empieza a sentirse útil.\n\nTu mejor arranque es sencillo: prioriza tres cosas por día y deja el resto en espera consciente. Con esa clase de orden, 2027 puede darte resultados sólidos sin obligarte a correr todo el tiempo."
   },
   "study": {
    "heading": "Aprender con buen pulso",
    "body": "En aprendizaje, 2027 favorece todo lo que te ayude a afinar técnica, método y criterio. Tu combinación de metal y madera suele pedir estructura con crecimiento, así que estudiar de manera dispersa probablemente te canse más de lo que te aporta. En cambio, cuando eliges un tema y lo trabajas por capas, el año responde muy bien.\n\nEn la práctica, esto puede traducirse en lecturas más útiles, cursos cortos, práctica constante o conversaciones con personas que te muestran otra forma de hacer las cosas. También puede aparecer la necesidad de corregir detalles, revisar apuntes o repetir una base para consolidarla. No es una señal de atraso; muchas veces es la forma en que tu mente fija mejor lo aprendido.\n\nTe conviene reservar un momento fijo para repasar sin interrupciones y con una meta pequeña. Si avanzas por tramos claros, 2027 te deja una sensación muy buena de dominio real."
   },
   "health": {
    "heading": "Ritmo para sostenerte",
    "body": "En cuerpo y mente, 2027 te pide cuidar el ritmo más que buscar intensidad. Como el año trae presión y tu mapa tiene 0% agua, puede ser fácil que la mente se quede muy en modo hacer y que te cueste aflojar un poco. No hace falta forzar descanso perfecto; basta con crear pausas que de verdad te bajen una marcha.\n\nEn la vida diaria, esto puede notarse como días en que quieres responder a todo, concentrarte demasiado o seguir aunque ya no te convenga. También puede aparecer una sensación de alerta por asuntos pequeños, así que te ayuda mucho simplificar horarios, bajar ruido y dejar espacios sin exigencia. Cuando el entorno se ordena un poco, tu energía se asienta mejor.\n\nPrueba con una rutina breve y repetible: una pausa sin pantalla, una caminata corta o unos minutos para respirar antes de cerrar el día. Si sostienes ese gesto con regularidad, 2027 se vuelve más amable contigo."
   }
  },
  "months": [
   {
    "headline": "Cierre en movimiento",
    "body": "Febrero te empuja a sacar algo hacia afuera: palabras, trabajo, ideas o gestos concretos. Como la energía del mes choca con una parte de tu base, puede sentirse como un giro rápido, así que te conviene no apurarte a responder todo de inmediato."
   },
   {
    "headline": "Semilla visible",
    "body": "Marzo favorece lo que empieza a tomar forma poco a poco. Hay producción y entrega, pero también pequeños tropiezos que te piden atención fina; si revisas dos veces lo importante, el mes fluye con menos desgaste."
   },
   {
    "headline": "Impulso reservado",
    "body": "Abril te da más margen para mover dinero, decisiones y resultados a tu favor. El avance se siente silencioso, casi interno, así que te ayuda trabajar con estrategia en vez de mostrar todas tus cartas a la vez."
   },
   {
    "headline": "Unión útil",
    "body": "Mayo trae una sensación de ajuste natural entre lo que quieres y lo que haces. Hay capacidad para avanzar con recursos y, al mismo tiempo, conviene cuidar lo que compartes o gastas para que el impulso no se disperse."
   },
   {
    "headline": "Presión que forma",
    "body": "Junio activa una etapa más exigente, con emociones a flor de piel y más sensibilidad ante roces pequeños. Si bajas un poco la velocidad y eliges tus batallas, el mes puede darte mucha solidez."
   },
   {
    "headline": "Confianza en alza",
    "body": "Julio sostiene la presión, pero con una confianza más clara en ti. Los imprevistos pueden aparecer, así que te conviene tener planes simples y flexibles; cuando no te aferras a una sola salida, todo respira mejor."
   },
   {
    "headline": "Ayuda que entra",
    "body": "Agosto abre una fase de apoyo, aprendizaje y recuperación del aliento. Puede sentirse como esfuerzo que por fin da fruto, y un cambio de ambiente te vendría bien si necesitas ver las cosas con otra perspectiva."
   },
   {
    "headline": "Plenitud serena",
    "body": "Septiembre trae una sensación de abundancia más tranquila, con apoyo que se nota y vínculos que atraen. Es un mes bueno para consolidar lo que ya viene creciendo sin forzarlo demasiado."
   },
   {
    "headline": "Paso más lento",
    "body": "Octubre se mueve con más calma y menos estímulo nuevo. La espera puede parecer larga, pero también te da espacio para observar mejor lo que sí vale la pena sostener."
   },
   {
    "headline": "Cuida el tono",
    "body": "Noviembre pide tacto y claridad, porque pueden aparecer malentendidos si hablas con prisa. Si eliges bien el momento y el tono, el mes se vuelve más llevadero de lo que parece al principio."
   },
   {
    "headline": "Orden visible",
    "body": "Diciembre vuelve a pedirte producción y entrega, pero con un foco más ordenado. El liderazgo se nota más, así que te conviene definir qué sí quieres sostener antes de aceptar más de la cuenta."
   },
   {
    "headline": "Reconocimiento quieto",
    "body": "Enero de 2028 cierra el ciclo con una energía más recogida, aunque también con señales de reconocimiento. Es un buen momento para bajar el ruido, observar lo que dejaste listo y preparar el siguiente tramo con calma."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vas a notar más salida de energía, más producción y más empuje para mover recursos. La acción más útil es elegir una sola prioridad visible por semana y dejar por escrito qué no harás todavía."
   },
   {
    "title": "De mayo a julio",
    "body": "Se activa una franja de presión útil: hay capacidad para avanzar, pero también más peso en decisiones y responsabilidades. Conviene revisar plazos, pedir aclaraciones a tiempo y no improvisar con lo importante."
   },
   {
    "title": "De agosto a octubre",
    "body": "Entra una etapa de apoyo, aprendizaje y luego un ritmo más lento. Aprovecha para reforzar hábitos, estudiar con constancia y reservar espacio para recuperar claridad antes de volver a empujar."
   },
   {
    "title": "De noviembre a enero",
    "body": "Aparecen ajustes de tono, orden y cierre de ciclo. Te ayudará simplificar agendas, revisar conversaciones pendientes y dejar preparado un resumen breve de lo que sí quieres continuar."
   }
  ],
  "closing": "A los 41 años, comienza para ti un ciclo de diez años con metal más fuerte, y eso marca un cambio real de tono en tu mapa. En 2027, ese futuro cercano todavía no domina la escena, pero sí se siente el entrenamiento: un año que te pide precisión, ritmo y una forma más consciente de usar tu energía.\n\nSi caminas 2027 con calma firme, Casey, el año puede dejarte más orden, más criterio y una confianza más limpia en lo que haces. No hace falta correr: basta con elegir bien el paso y sostenerlo."
 },
 "jordan": {
  "year": 2027,
  "title": "2027: Reading Your Tempo",
  "subtitle": "A year of steady pull, careful timing, and useful momentum",
  "overview": "Jordan, 2027 feels active without being chaotic. Your core Water nature meets a Fire year, and that tends to bring a strong pull toward results, ownership, and visible progress. Because your Five Elements lean heavily toward Earth and Metal, with very little Wood, the year may reward clear structure, practical choices, and steady follow-through more than spontaneous leaps.\n\nThe first half of the year looks more like warm-up and building than instant breakthrough. From spring into early summer, energy rises through expression and output, so it can feel easier to produce, help, and keep things moving. By midyear, the tone becomes more direct: you may feel ready to lead, ask for more, or push a project forward. The main caution is simple — when momentum is strong, it can be tempting to overreach, so a little restraint may save you time later.\n\nThe second half of 2027 turns more mixed and interesting. Late summer asks for patience and a slower pace, while autumn brings support, learning, and a chance to recover your rhythm. The year closes with a familiar, steady tone again, which may feel reassuring after the sharper turns in the middle. For a Dew · Order type, that pattern often works best when you keep your system clean, your priorities visible, and your energy going where it can actually land.",
  "chapters": {
   "wealth": {
    "heading": "Money that likes direction",
    "body": "In 2027, money matters seem easier to handle when you give them a clear target. This Fire year tends to strengthen your ability to lead, claim results, and move toward tangible gains, and your strong Earth and Metal mix can help you keep things practical. The main theme is not scarcity; it is timing, focus, and not trying to do too many things at once.\n\nYou may notice that spending, earning, and planning all feel more linked to action than to theory. A project that has a clear purpose, a simple budget, or a visible outcome may feel easier to support than something vague. In June and July especially, it can be useful to pause before saying yes to every opportunity that looks bright.\n\nStart small: choose one financial goal for 2027 and make it easy to track. If you keep your choices simple and review them regularly, you’re more likely to feel in charge of the flow instead of chased by it."
   },
   "love": {
    "heading": "Connection with more warmth",
    "body": "Relationships in 2027 may feel warmer, more active, and a little more responsive to how much energy you put in. When your own expression grows, other people are more likely to notice you, which can make your presence feel brighter and easier to remember. At the same time, the year’s middle stretch suggests that pacing matters, especially if you want connection to stay comfortable rather than rushed.\n\nYou might see this in everyday moments: a message that needs a thoughtful reply, a plan that turns into a real conversation, or a friend who opens up more when you slow down and listen. August and September may ask for extra care around misunderstandings or mixed signals, while October and November can feel more receptive and supportive. Jordan, this is a good year to value clarity over guessing.\n\nA helpful approach is simple: name your intentions early, and leave room for the other person’s pace. Small, steady gestures may do more for trust than grand declarations that arrive too fast."
   },
   "career": {
    "heading": "Work that wants shape",
    "body": "Career-wise, 2027 looks like a year where initiative matters. Because the Fire year is something you can work with directly, it may be easier to push a goal forward, take ownership, or show what you can produce. Your Order type also suggests that clean systems, deadlines, and visible structure can help you turn effort into something concrete.\n\nSpring may feel like preparation through output, while June and July are more suited to taking the lead or making your results visible. Then late summer asks for a slower, more careful rhythm, especially if several tasks start competing for your attention. In November, there may be a stronger sense of movement or redirection, so it helps to stay flexible without scattering your focus.\n\nA good first step is to define what “good progress” means for 2027 in one sentence. If you can see the shape of the work, you’ll be better able to choose where to apply pressure and where to let things breathe."
   },
   "study": {
    "heading": "Learning that settles in",
    "body": "Learning in 2027 may work best when it is practical, structured, and tied to something you can use soon. With little Wood in your Five Elements, new growth can feel slower at first, so it may help to build learning through repetition, notes, and clear milestones rather than expecting instant inspiration. The year’s steady support phases are especially useful for absorbing what you’ve already started.\n\nYou may find that October and the months around it bring a better sense of recovery, guidance, or helpful input from others. Earlier in the year, especially in spring, learning could come through doing, explaining, or making something with your hands or words. That means you may remember things better when you use them right away, instead of keeping them purely theoretical.\n\nTry one compact learning routine: a short weekly review, one focused topic, and one small application step. That kind of structure can suit your Dew · Order nature very well, because it lets insight gather without feeling forced."
   },
   "health": {
    "heading": "Keeping your rhythm clean",
    "body": "For body and mind, 2027 seems to reward rhythm more than intensity. The year’s Fire can make life feel faster, while your Water core may prefer steadiness and enough room to reset. That contrast can be helpful if you treat rest, movement, meals, and screen time as a simple pattern rather than something you only think about when you’re already tired.\n\nLate summer especially may feel like a time to slow your pace and double-check how you’re spending your energy. The quieter months can be useful for tidying up routines, getting back to basics, and noticing what keeps you clear-headed. Autumn then looks friendlier for recovery, which may make it easier to regain your balance after a busy stretch.\n\nA small, realistic move is to protect one daily anchor — a regular start, a regular break, or a regular wind-down. When the structure is clean, your energy may feel easier to hold and easier to use."
   }
  },
  "months": [
   {
    "headline": "Soft restart",
    "body": "February feels familiar and easy to enter, but it may not bring a lot of novelty. A few unexpected turns can keep things interesting, so it helps to stay lightly flexible instead of over-planning every detail."
   },
   {
    "headline": "Quiet momentum",
    "body": "March carries a fresh, beginning-like feeling, though the pace may still be gentle. Friction can show up in small ways, which makes this a good month for patience, simple wording, and checking assumptions."
   },
   {
    "headline": "Output wakes up",
    "body": "April starts to ask for more expression, production, and giving. Energy may go out faster than you expect, so it helps to choose one place where your effort will truly count."
   },
   {
    "headline": "New ground",
    "body": "May can feel fertile, open, and ready for something new to take shape. The atmosphere supports making, building, or offering, but it may also ask you to guard your stamina as you keep going."
   },
   {
    "headline": "Lead with care",
    "body": "June brings a stronger sense of direction and leverage. This is a good time to aim for results, though it works best when ambition stays paired with restraint and a clear endpoint."
   },
   {
    "headline": "Store the gain",
    "body": "July feels quieter and more contained, even if the desire to push remains strong. The month may favor waiting, refining, and holding what you’ve already gathered rather than forcing the next step."
   },
   {
    "headline": "A close fit",
    "body": "August can feel demanding, but also strangely well-matched to your inner rhythm. Because the month’s energy connects closely with your own, it may be easier to get serious about responsibility if you slow down enough to read the room correctly."
   },
   {
    "headline": "Careful pace",
    "body": "September asks for steady judgment and a slower, more deliberate pace. Command is in the air, but so is the risk of misreading a situation, so one extra check can save you from unnecessary confusion."
   },
   {
    "headline": "Support returns",
    "body": "October feels more nourishing and easier to recover within. Helpful people, useful ideas, or a renewed sense of learning may enter the picture, making it a good month to accept support without overexplaining yourself."
   },
   {
    "headline": "A turning point",
    "body": "November can bring movement, change, or a strong nudge to shift direction. Because the month may feel more dynamic than stable, staying adaptable will likely serve you better than trying to lock everything into place."
   },
   {
    "headline": "Steady again",
    "body": "December returns to a familiar, comfortable tone. Small hiccups may appear, but they’re more likely to be minor adjustments than major disruptions, so a calm, orderly approach should work well."
   },
   {
    "headline": "Inner settling",
    "body": "January leans inward and reflective, with a quieter kind of momentum. It may be a good time to gather your thoughts, notice what has been working, and let your energy organize itself before the next cycle begins."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: warm up with purpose",
    "body": "Watch for the way early momentum builds through familiarity and output. Choose one project, habit, or goal that benefits from steady repetition, and let the first quarter be about setting a clean base rather than chasing too many new starts."
   },
   {
    "title": "May to July: aim, then hold back a little",
    "body": "Notice where your effort begins to produce visible results, especially when June and July bring stronger leverage. Push on the work that truly matters, but build in a pause before overcommitting, so your gains stay usable."
   },
   {
    "title": "August to October: slow down to get stronger",
    "body": "Pay attention to pressure, mixed signals, and the difference between urgency and importance. Use this stretch to simplify your schedule, confirm details, and accept support when it shows up, especially as recovery starts to return in October."
   },
   {
    "title": "November to January: keep the system clean",
    "body": "Watch for movement, then a return to calm. A good move here is to review what worked in 2027, keep only the routines that actually help, and enter the next cycle with fewer loose ends and more clarity."
   }
  ],
  "closing": "From age 31 to 40, a Fire-strong 10-year cycle opens a new chapter, and 2027 already feels like a preview of that more forceful rhythm. In this year, Jordan, the best results seem to come from using your energy with care: lead when the path is clear, slow down when the pace gets noisy, and let structure do some of the work for you. If you do that, 2027 may feel less like a push and more like a well-directed current."
 },
 "mia": {
  "year": 2027,
  "title": "2027, your steady forge",
  "subtitle": "A year to pace your strength and let it take shape",
  "overview": "In 2027, the year's Fire energy meets your Metal center in a way that feels like being tempered: pressure rises, duties become more visible, and yet your strength can become cleaner and more useful when you choose your pace well. You are not being asked to rush; you are being asked to notice where effort turns into structure, and where structure turns into confidence. With your Five Elements profile leaning strongly toward Wood, the year may also feel more active around making, growing, and giving, which can be energizing but also draining if you try to carry everything at once.\n\nFor Mia, this can be a year of learning the difference between force and focus. The early months favor expression and movement, the middle of the year brings sharper tests of priority, and late summer into early autumn feels more supportive, as if help, learning, or recovery has room to enter. Your Steel · Harvest type suggests you tend to do well when effort has a clear purpose: gather, refine, and keep what matters. In 2027, that instinct can be especially valuable if you let some things mature instead of trying to finish them all at full speed.\n\nThere is also a sense of surprise in the background, so small changes in plans or timing may work better when met with flexibility rather than resistance. The year’s pattern does not point to a single dramatic storyline; it points to repeated chances to adjust your grip. If you can keep your hands steady and your expectations practical, 2027 can feel less like a test and more like a season that makes your abilities easier to trust.",
  "chapters": {
   "wealth": {
    "heading": "Money works best with a rhythm",
    "body": "In 2027, your money story feels tied to initiative, results, and how much energy you are willing to spend making things happen. Because the year supports pushing forward, it may be tempting to chase every opportunity at once, but your best gains are more likely to come from choosing a few clear channels and letting them mature. Your strong Wood tendency can help you grow resources, yet it can also make spending, giving, or expanding feel more natural than pausing.\n\nYou may notice this in ordinary moments: taking on an extra project, saying yes to a friend’s request, or deciding to upgrade something because it seems practical in the moment. Those choices are not wrong, but they may ask for a second look before they become habits. The clearest signals will probably come when something promises quick momentum but quietly demands more time, attention, or follow-through than expected.\n\nA useful approach is to keep one simple rule: before you commit, ask what the real cost is in energy, not just in money. Mia, if you make room for that pause, you may find it easier to direct your effort toward what actually grows with you instead of what only looks active for a short while."
   },
   "love": {
    "heading": "Closer, but with edges smoothed",
    "body": "Relationships in 2027 may feel more active, more visible, and sometimes a bit more demanding. The year’s Fire can bring warmth, attraction, and clearer signals, but it can also make people more reactive, so small misunderstandings may appear if everyone speaks quickly and listens a little too late. For you, the strongest connections are likely to come through steady attention rather than dramatic declarations.\n\nIn daily life, this might look like plans changing at the last minute, a conversation turning more honest than expected, or a familiar bond asking for a new balance. Some months may feel easy and familiar, while others may bring a sense that something needs to be renegotiated. That does not have to be a problem; it can simply be the year asking for clearer timing, clearer words, and a softer landing.\n\nTry making room for the second sentence, not just the first one. If you give people a little more context and yourself a little more time, you may find that warmth lasts longer and tension loses some of its sharpness."
   },
   "career": {
    "heading": "Lead with timing, not force",
    "body": "Career-wise, 2027 looks like a year where responsibility increases and your ability to shape outcomes becomes more noticeable. The Fire of the year can highlight performance, visibility, and the pressure to act decisively, but your Metal center tends to do best when decisions are clean, not rushed. That means your progress may come less from forcing a big leap and more from choosing the right moment to apply your strength.\n\nYou may run into situations where others look to you for answers, deadlines feel tighter, or a project asks for more discipline than you expected. These are not signs that you are off course; they are signs that the year is asking you to refine your focus. With your Steel · Harvest type, you can be especially effective when you separate what is essential from what is merely loud.\n\nA practical move is to finish one important thing before beginning three new ones. If you let your work show shape and sequence, you may find that your authority grows in a way that feels earned rather than strained."
   },
   "study": {
    "heading": "Learning that sharpens you",
    "body": "Study and learning in 2027 may feel especially useful when they are tied to real application. Your year favors movement, testing, and visible effort, so abstract learning alone may not feel satisfying for long. What helps most is learning that can be used, shared, or turned into something concrete; that matches both the year's active tone and your natural tendency to gather what is useful.\n\nYou may find yourself drawn to short courses, hands-on practice, or conversations that clarify a skill you already want to improve. There can also be moments where you need to revisit something you thought you understood, especially if timing or perspective changes. Those moments are not setbacks; they are often where deeper understanding begins.\n\nIf you want a simple method, keep a note of what you learn and how you used it within the same week. That small loop can help you turn scattered insight into steady competence, which suits your profile very well."
   },
   "health": {
    "heading": "Protect your tempo",
    "body": "For body and mind, 2027 points less to dramatic change and more to the importance of rhythm. Because the year can ask for more output, it becomes useful to notice where your energy leaks through overcommitment, irregular routines, or too many open tabs in your day. Your Five Elements balance suggests you may do well when you keep life active but not overfilled.\n\nA common scene might be feeling fine while busy, then realizing later that you need a quieter stretch to catch up with yourself. That is not a warning sign so much as a reminder that momentum works best when it has recovery built into it. Short pauses, tidy surroundings, and a predictable sleep-and-work rhythm can make the whole year feel smoother.\n\nTry building one small reset into each week: a walk without a screen, a desk clear-out, or a quiet hour with no agenda. These little pauses can help your energy stay bright without running hot for too long."
   }
  },
  "months": [
   {
    "headline": "A sharp opening shift",
    "body": "February may feel like a reset that gets your attention quickly. Because the month pushes expression and movement while also bringing a turning-point feel, plans could change faster than expected, especially around matters that involve your usual habits. A flexible first response may help you keep the month useful instead of merely busy."
   },
   {
    "headline": "Small snags, real growth",
    "body": "March may favor output, sharing, and the kind of effort that leaves you a little more tired than you expected. Small hiccups can show up in timing or communication, so double-checking details may save you from repeating work. Keep your pace modest and let the month reward consistency rather than speed."
   },
   {
    "headline": "Quiet leverage",
    "body": "April looks more suited to taking control of a project or resource than to waiting for permission. The inner-world tone suggests you may work best with fewer distractions and a clearer private plan. If you focus on one practical target, the month can feel surprisingly productive."
   },
   {
    "headline": "Unexpected alignment",
    "body": "May brings a more fortunate kind of contact, as if something or someone clicks into place with less effort than usual. Because the month also carries sudden turns, plans may benefit from a little flexibility in the margins. Pay attention to what feels naturally cooperative, and let that guide your next step."
   },
   {
    "headline": "Pressure with purpose",
    "body": "June asks you to carry more responsibility without losing your center. The friction in the air may show up as minor delays, competing expectations, or a sense that you need to stay composed while others move differently. Choosing a steady speed may help you turn pressure into structure."
   },
   {
    "headline": "Wildcard month",
    "body": "July feels less predictable and more improvisational, which can be exciting if you do not demand perfect control. The wild-card tone suggests surprise openings as well as surprise complications, so keep your plans light enough to adjust. A calm backup option could make the month much easier to navigate."
   },
   {
    "headline": "Fresh ground opens",
    "body": "August may feel like a breath of support after a heavier stretch. Learning, help, or recovery can come in more naturally now, and you may notice that effort starts to feel more sustainable. If you accept assistance without overexplaining it, the month can become a useful reset."
   },
   {
    "headline": "Magnetic support",
    "body": "September can bring a fuller sense of momentum and a stronger pull from people, opportunities, or ideas around you. The month may feel socially or professionally lively, with a sense that others notice what you are doing. Use that visibility to strengthen what already works rather than scattering your attention."
   },
   {
    "headline": "Easy familiarity",
    "body": "October may feel comfortable, even a little familiar, but not especially stimulating. That can be a gift if you want to consolidate gains or rest your attention after a busy stretch. Keep an eye on what still needs movement, because the month may not push you to notice it on its own."
   },
   {
    "headline": "Read between lines",
    "body": "November can feel slower and more inward, with a risk of misunderstanding if assumptions move faster than facts. It may help to ask one more clarifying question before settling on a conclusion. Gentle precision will likely serve you better than quick interpretation here."
   },
   {
    "headline": "A tidy command",
    "body": "December may bring a stronger sense of direction and the ability to organize what has been loose. Expression and output return, but with a more ordered tone that rewards clear priorities. If you sort, label, and close loops now, you may enter the next month with much less drag."
   },
   {
    "headline": "Quiet advancement",
    "body": "January may feel like a storage space for what you have built, with progress happening in a quieter, less visible way. The month supports keeping useful things close and letting them settle before the next push. A patient review of what you want to carry forward can make the transition smoother."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: choose your main lane",
    "body": "Watch for where energy goes out quickly through helping, producing, or reacting to changes. Pick one main priority and one backup priority, and let the rest wait until you see what truly deserves your effort."
   },
   {
    "title": "May to July: manage the pressure wave",
    "body": "Notice where responsibility rises and where surprises try to pull your attention apart. Keep your calendar slightly lighter than usual, and build in one check-in before you say yes to anything new."
   },
   {
    "title": "August to October: accept support and refine",
    "body": "Pay attention to who or what restores your energy, because this stretch can be more generous. Let help land, learn by doing, and use the calmer pace to strengthen one skill or project instead of starting too many."
   },
   {
    "title": "November to January: tidy and carry forward",
    "body": "Watch for misunderstanding, slowdowns, or a quieter kind of progress. Use that time to sort unfinished tasks, write down what still matters, and carry only the essentials into the next cycle."
   }
  ],
  "closing": "At 33 years old, the 10-year cycle shifts into a Water-heavy phase, and that marks a clear turn from the pattern described here into a different kind of support. For 2027, though, your year still asks for tempered effort: choose your pace, keep your priorities visible, and let steady structure do some of the work for you.\n\nIf you do that, Mia, 2027 can feel like a year that makes you stronger without asking you to become harder. The gains here are likely to come from refinement, timing, and the quiet confidence that grows when you learn how to carry fire without losing your shape."
 }
};
