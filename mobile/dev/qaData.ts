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
   "title_line1": "When the checklist never sleeps, the finish line starts following you",
   "title_line2": "You keep closing loops, but your mind keeps opening them again",
   "subtitle": "Module 3, burnout deep report — Saju × psychological testing × counseling integration",
   "opening_scene": "It’s late, and your phone lights up with Monday-morning messages before you’ve even fully left the day behind. You’ve already finished the task, but your hand still goes back to the screen to check one more detail, then another. The room is quiet, yet your mind keeps running the same line: if you stop now, will you fall behind? By the time you try to rest, the rest doesn’t feel like rest at all. Jordan, isn’t this starting to look like your nights lately?",
   "case_tag": "EXAMPLE CASE — Minho, early 30s, a deadline-heavy job",
   "case_paragraphs": [
    "Minho finishes his reports on time, but he never lets them stay finished. At 11:40 p.m., he reopens the file, checks the numbers again, and tells himself it will only take a minute. His Five Elements are also heavy on Earth, so responsibility keeps pressing down on his day just like it does for you. And yes, you can already see yourself in that loop.",
    "By the time Friday arrives, he looks like someone who has worked all week and still hasn’t mentally clocked out. He says he is resting, but his shoulders stay tight and his attention keeps circling back to unfinished details. That is what happens when checking becomes a habit instead of a choice. You know that feeling too."
   ],
   "oheng_intro": "Your Five Elements are led by Earth at 38%, while Wood sits at 0%. For a Water Day Master, Earth feels like pressure, rules, and responsibility pressing on you from above, while Wood is the energy you send outward through expression and output. In a burnout module, that mix shows up as holding everything together too tightly, then feeling drained once the holding is over.",
   "quiz_reading": "Your profile shows Perfectionism at 82%, which is strong, and Recovery at 34%, which sits much lower. That combination fits Finisher's Drain: you complete the task, then keep paying for it with another round of checking and mental replay. So the day may look productive from the outside, while inside you’re already running on fumes.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood weak — the part of you that needs somewhere to move",
     "body": "Wood is at 0%, so the energy that normally carries your expression, initiative, and outward momentum is almost absent here. For a Water Day Master, this is the part that lets you pour yourself into action and let something leave your hands. When Wood is this low, the finished task can still feel unfinished inside you, because nothing has fully moved out yet. Water helps Wood grow, so the pressure in your system eases when recovery gives your effort somewhere to breathe."
    },
    "fire": {
     "heading": "🔥 Fire moderate — warmth that burns through the day",
     "body": "Fire is 13%, so the energy that brings visible drive and quick heat is present, but not in a way that keeps burning all day. In your burnout pattern, that can look like a strong push at the start of the week and then a steep drop once the work is done. You can get a lot lit at once, but the flame is not built to stay steady for long. That is why Monday-morning messages can feel like a fresh spark hitting a tired room."
    },
    "earth": {
     "heading": "⛰️ Earth strong — the weight of duty that stays on your shoulders",
     "body": "Earth is 38%, and for a Water Day Master that means pressure, duty, and the sense that you must hold things together are strong in your system. It shows up when you finish a task and immediately start checking it again, as if the work will only count if you keep carrying it after completion. That is the exact shape of your perfectionism: not just doing the job, but refusing to let the job leave you alone. Earth can make you reliable, but here it also makes rest feel suspicious."
    },
    "metal": {
     "heading": "💎 Metal strong — the inner editor that keeps reviewing",
     "body": "Metal is 38%, so your mind has a sharp review function that notices gaps quickly and wants things clean before they are called done. In your day, that can look like reopening the file, rereading the message, or checking one more line even after you already know it is fine. The strength here is precision, but the cost is how hard it is for your thoughts to stand down. That is why your rest can still feel like work."
    },
    "water": {
     "heading": "💧 Water moderate — the part that keeps sensing too much",
     "body": "Water is 13%, so the core energy of feeling, noticing, and carrying things inward is present, but not spacious enough to absorb everything without strain. As a Water Day Master, you are not short on sensitivity; you are short on softness toward yourself once the task is done. That is why tired and a little anxious fits so well here: your system keeps scanning even when the work is over. The result is not emptiness, but a mind that won’t fully unclench."
    }
   },
   "upcoming_period_heading": "31 to 40: the fire years begin",
   "upcoming_period_body": "31 to 40 is the 10-year cycle where Fire becomes stronger. The long stretch that has been dominated by holding, checking, and carrying starts giving way to a phase that asks for more visible energy and faster movement. In that next chapter, your pace changes from quietly absorbing pressure to acting with more heat and outward force. It helps to make room now for cleaner boundaries around work, so your energy does not get spent twice.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism is Earth and Metal doing exactly what they do best: holding the line and checking the line again. That is why one completed task can still feel unfinished in your body. The score is not saying you care too much; it is showing how hard it is for you to let a finished thing stay finished.",
    "Your 34% Recovery matches the part of your chart that struggles to replenish after pressure. When rest feels uneasy, you do not actually need more effort — you need a cleaner stop. That is the same tension your Wood 0% pattern carries: nothing gets to move out, so nothing gets to soften in."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you trust precision more than completion. In daily life, that can look like reopening a file after dinner or rereading a message that already made sense. The part of you that chose this answer is trying to protect quality, and it deserves that respect even while it learns to stop sooner.",
    "Feeling uneasy even when you rest shows that your nervous system does not easily recognize a pause as safe. You may sit down, but your mind keeps standing at the door, listening for the next thing. The answer tells me you are not lazy at all; you are carrying work into places that were meant to help you recover."
   ],
   "chat_snapshot_note": "You said the core problem is that you rest but it never feels like resting, and that lands right beside the tired, a little anxious feeling you described. The work may be done, but your mind keeps checking whether it really is, so the pause never fully arrives. The line to save is this: your body stops before your mind does.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they reopen the pressure before your system has finished coming down. That fits your strong Earth and Metal: one message can turn duty and review back on in a second. So the trigger is not just the message itself; it is what the message asks you to become again.",
   "chat_repeat_note": "The pattern runs like this: you cram, then you crash. First you push past the limit to get everything closed, then you pay for it all at once when the energy drops. One small way to step out of it is to set a hard stopping point before the last hour, so the crash does not get the whole night.",
   "chat_fear_note": "You named the fear clearly: if you stop, you’ll fall behind. Underneath that is not weakness, but how much you care about staying reliable and not losing ground. What you seem to want most is not endless motion — it is permission to pause without feeling abandoned by your own standards.",
   "psychology_fact_heading": "Maladaptive perfectionism and the effort-recovery model",
   "psychology_fact_body": "Maladaptive perfectionism describes a pattern where high standards keep turning into self-checking, self-criticism, and difficulty letting work stay done. The effort-recovery model says that recovery only happens when the demands of effort are followed by real disengagement, not by more mental replay. Your profile fits both: strong perfectionism keeps the checking going, while low recovery makes the pause feel uneasy instead of restorative. That is why the body may be off duty while the mind is still on call.",
   "psychology_takeaway": "You are not failing to rest; your mind is failing to stand down. Once the checking loses its grip, the break starts to feel like a break again.",
   "strengths": [
    {
     "title": "Reliable finish",
     "body": "You do not leave things half-done, and that shows up in the way you go back and re-check everything after finishing a task. That habit can be costly, but it also means you notice what others miss. In the right setting, that same drive makes you the person who can be trusted with the final stretch that usually slips through."
    },
    {
     "title": "Sharp review",
     "body": "Your 38% Metal gives you a strong internal editor, so you catch gaps quickly and know when something still feels off. In practice, that can look like spotting a weak line in a report before anyone else does. The strength is real: you see details before they become problems."
    },
    {
     "title": "Pressure tolerance",
     "body": "Your 38% Earth means you can carry responsibility long enough to finish what others would drop. That is why deadlines do not break you right away; you keep holding the structure in place. Even when you feel tired, there is still a part of you that keeps the whole thing standing."
    },
    {
     "title": "Quiet endurance",
     "body": "Your Water Day Master nature gives you a deep capacity to keep sensing what is happening without making a scene. That can look small from the outside, but it is a real kind of endurance. You keep going through the tension, and that is why your effort often lasts longer than it feels like it should."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard stopping",
     "body": "When the task ends, your mind does not end with it, and that is where the strain begins. You keep checking, then checking the checking, and the break turns into another job. The problem is not lack of effort; it is that effort has trouble finding a stopping point."
    },
    {
     "title": "Rest guilt",
     "body": "With Recovery at 34%, rest can feel unsafe or incomplete even when nothing is actually demanding you. You sit down, but part of you is still scanning for what you should be doing next. That is why a free day can still leave you restless instead of restored."
    },
    {
     "title": "All-at-once crash",
     "body": "The cram-then-crash rhythm means you spend a lot of energy in one block and then hit a wall after. You can look highly productive right up until the drop, which makes the drop feel even sharper. A smaller pace would help, but the habit of pushing makes that hard to choose in the moment."
    },
    {
     "title": "Trigger sensitivity",
     "body": "Monday-morning messages can switch your whole system back on before you are ready. That is not because the message is huge; it is because it lands on a body that already expects pressure. The result is a quick return to vigilance, even when you were trying to rest."
    }
   ],
   "fit_good": "You do best in work that has clear deliverables and a visible end point, because your mind needs to know when something is actually finished. A day with one main task, one review pass, and a clean stop will serve you better than a schedule full of loose, open-ended demands. You also do better when the first message of the morning does not decide the whole tone of the day.",
   "fit_bad": "You struggle in environments where the work is never formally closed and where messages can rewrite your priorities all day long. A job that rewards constant rechecking, late edits, and instant replies will keep your checking loop alive. If every pause feels like a risk, your energy gets spent before the real work even ends.",
   "behavior_guides": [
    {
     "title": "One review only",
     "body": "After you finish a task, give yourself one review pass and set a timer for 10 minutes. When the timer ends, close the file and do not reopen it unless someone else asks for a change. This gives your perfectionism a lane without letting it take the whole road."
    },
    {
     "title": "Hard stop ritual",
     "body": "At the end of the workday, write the next step on a single line and stop there. Do this at the same time for five days in a row so your brain starts recognizing the end point. The goal is not to feel ready; it is to teach your system where the line is."
    },
    {
     "title": "Protected first hour",
     "body": "Keep the first hour of the morning free from messages when you can. Use that time for one focused task, not for scanning updates that pull you back into pressure. This helps Monday stop acting like a switch that turns the whole inner machine on."
    },
    {
     "title": "Recovery block",
     "body": "Schedule 20 to 30 minutes after a heavy work block where you do nothing that asks for evaluation. No checking, no polishing, no redoing. Let the break be plain and unproductive on purpose so your body learns that stopping is allowed."
    }
   ],
   "mindset_guide": "Think of your energy like a ledger, not a courtroom. A ledger only needs an honest closing entry; it does not need a second trial over every line. Right now, your mind keeps reopening the books after they are balanced. When you practice ending once, the next task starts with less debt already attached.",
   "closing_title": "The book can close here",
   "closing_body": "31 to 40 is the 10-year cycle where Fire gets stronger, and that shift begins a new chapter in how you use your energy. In this burnout pattern, that means the heavy, checked-out-afterward feeling starts loosening, and your days begin to feel less like one long audit. The work still matters, but it stops taking the whole evening with it. Jordan, the book can close here."
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
 "sam": {
  "content": {
   "title_line1": "The work is done, but your mind keeps the receipt",
   "title_line2": "You finish things cleanly, then keep reopening them in your head",
   "subtitle": "Module 3 Burnout deep report — Saju × psychology × counseling integrated",
   "opening_scene": "It’s late, and your phone lights up with Monday-morning messages before you’ve fully settled into the evening. You’ve already finished the task, but your hand still reaches back to the screen, checking the same details again. In your head, the line keeps repeating: if I stop now, I’ll fall behind. You look tired in a way that rest hasn’t touched yet, and a little anxious even while nothing is actively happening. Sam, isn’t this exactly how your nights have been lately?",
   "case_tag": "EXAMPLE CASE — Daniel, early 30s, project deadlines",
   "case_paragraphs": [
    "Daniel clears his desk at the end of the day, but he doesn’t actually leave the work behind. He reopens the file on his train ride home and checks one small thing twice because he can’t shake the feeling that a missed detail will cost him tomorrow. His Five Elements chart is lopsided in the same way yours is: Wood is strong, Fire is absent, and the body never gets the signal to soften. By bedtime, he is technically done and still not finished, and you are probably familiar with that same feeling."
   ],
   "oheng_intro": "Your Five Elements are balanced at 25% Wood, 25% Earth, 25% Metal, and 25% Water, with Fire at 0%. For a Day Master rooted in Earth, Wood feels like pressure, rules, and responsibility pressing in from above, while Fire is the support, learning, and protection that should warm the whole structure. That is why the Burnout module lands so cleanly here: the chart has plenty of structure, but nothing to keep the work feeling warm or recoverable.",
   "quiz_reading": "Your score pattern is sharply split: Perfectionism is high at 82%, while Recovery sits at 34%. That combination fits the Finisher's Drain type, where finishing a task doesn’t bring release, it brings another round of checking. In your day, that shows up as “I’m done” turning into “let me just make sure” before you can even breathe out.",
   "element_readings": {
    "wood": {
     "heading": "",
     "body": ""
    },
    "fire": {
     "heading": "",
     "body": ""
    },
    "earth": {
     "heading": "",
     "body": ""
    },
    "metal": {
     "heading": "",
     "body": ""
    },
    "water": {
     "heading": "",
     "body": ""
    }
   },
   "upcoming_period_heading": "40 years old and beyond, earth takes the lead",
   "upcoming_period_body": "From age 40, Earth becomes the dominant force in your 10-year cycle. The pace changes from pushing through to building with more weight, and the work begins to ask for steadier boundaries instead of constant self-correction. For this Burnout pattern, that shift matters because the pressure to keep finishing will no longer be the only thing in the room; support and structure can finally become more visible parts of the day. If you prepare for that season now, you will be ready to let effort feel more contained.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism is not just high standards; it is the engine that keeps reopening finished work after the job is already done. That matches your strong Wood, which feels like pressure and responsibility in your Earth-based system. The result is a mind that keeps checking because stopping feels riskier than staying tense.",
    "Your 34% Recovery explains why rest still feels uneasy, and it lines up with Fire at 0%. Fire is the support and warmth that would help your system settle, but that warmth is missing from the chart. So even a day off can feel unfinished, like something important has been left hanging."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows a mind that trusts precision more than closure. In daily life, that becomes the habit of reopening a task after it is already complete, just to make sure no detail escaped you. The part of you that chose this answer is the part that wants safety through certainty, and you can work with it without letting it run the whole day.",
    "Feeling uneasy even when you rest shows that recovery is not landing as rest yet. In real life, that can look like sitting down for a break and still scanning for the next message or the next correction. If that is your answer, it means your system is asking for recovery that feels safe enough to stay with."
   ],
   "chat_snapshot_note": "Your core concern is simple and sharp: you rest, but it never feels like resting. The feeling underneath it is tiredness with a thread of anxiety, so even quiet time stays alert. That is the line to keep: you are not failing to rest, you are resting inside a mind that has not stood down yet.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they arrive right where your tension is most vulnerable. They don’t just ask for attention; they switch the checking mode back on. With strong Wood pressing on an Earth-based Day Master, that kind of message can feel like responsibility landing before the day has even begun.",
   "chat_repeat_note": "The pattern is cram, then crash: you push hard, finish a lot, and only later feel how empty the tank actually is. In the middle, you choose continuation over pause because stopping seems to invite falling behind. The smallest way out is not to do less forever; it is to leave one task fully closed before starting the next one.",
   "chat_fear_note": "The fear beneath all of this is not failure; it is falling behind if you stop. That tells me you care about your pace because you care about keeping your place. The need underneath the fear is steadier than the fear itself: you want rest that does not cost you momentum.",
   "psychology_fact_heading": "Perfectionism and burnout",
   "psychology_fact_body": "Perfectionism is a pattern of setting very high standards and then continuing to monitor performance after the work is already finished. Burnout research often describes this kind of loop as one where effort stays high while recovery stays low, which fits your 82% Perfectionism and 34% Recovery split. In your case, the pattern is not only about doing well; it is about staying mentally attached to the task long after completion. That is why the work ends on paper before it ends in your nervous system.",
   "psychology_takeaway": "You finish the task, but your mind keeps auditing it. The real shift is learning to let completion count before your anxiety asks for another round.",
   "strengths": [
    {
     "title": "Strong finish",
     "body": "You do not drift away from what matters; you bring things to completion. That shows up in the way you finish a task and then still go back to check it, which is exhausting but also tells me you care deeply about accuracy. The strength here is follow-through, and it is real."
    },
    {
     "title": "Sharp noticing",
     "body": "You catch what is slightly off before other people do. In your day, that can look like seeing the weak spot in a plan or the missing detail in a message before anyone else notices it. That sharpness helps you protect your work, even when it makes rest harder."
    },
    {
     "title": "Enduring drive",
     "body": "You can keep going through pressure that would scatter other people. Strong Wood in your chart gives you that push, and it is part of why you can carry responsibility without immediately dropping it. The same drive that makes you reliable also explains why you sometimes need a harder stop than you think."
    },
    {
     "title": "Quiet steadiness",
     "body": "Even when you feel tired and a little anxious, you still keep the structure standing. Your balanced Earth shows up as the part of you that remains functional under load, not flashy, just solid. That steadiness is one reason people can count on you."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "You keep returning to finished work because your mind doesn’t fully accept the first pass as enough. That can mean rereading the same message, reopening the same file, or mentally replaying the same choice after the day is already over. It is not carelessness; it is care that has lost its stopping point."
    },
    {
     "title": "Thin recovery",
     "body": "Rest does not fully land for you, so even downtime can feel unfinished. A day off can still carry tension, as if your mind is waiting for a message that will pull it back in. That is what low Recovery looks like in real life."
    },
    {
     "title": "Pressure loop",
     "body": "Strong Wood keeps pressure in the system, and because you are an Earth Day Master, that pressure feels personal. You take responsibility seriously, which is useful, but it also means the work can start sounding like a moral test. That is why the loop feels so hard to break once it starts."
    },
    {
     "title": "Crash after push",
     "body": "You can hold it together for a long stretch and then drop all at once. The cram-then-crash pattern means your energy is not absent; it is being spent too fast and too completely. Once the push ends, the body and mind both notice the bill."
    }
   ],
   "fit_good": "You do best in work that has clear endings, clear owners, and a defined next step. A day with one main deliverable and a real off-switch will suit you better than a stream of open loops. You also work well when feedback is specific, because it helps your mind stop inventing extra checks.",
   "fit_bad": "You struggle in environments where messages keep arriving after the task should already be closed. A role that rewards constant availability will keep your checking habit awake all day. You also have a harder time in work that leaves every decision open-ended, because your mind will try to finish what the system never closed.",
   "behavior_guides": [
    {
     "title": "Close once",
     "body": "When you finish one task, stop for two minutes before opening the next one. Use that pause to write one line that says the task is done and where the next step belongs. That small closure helps your mind accept the ending instead of reopening it."
    },
    {
     "title": "Message boundary",
     "body": "Pick one specific time to look at Monday-morning messages instead of checking them the moment they appear. Keep that window short, and do not reopen the thread after you leave it. You are training your attention to treat a message as information, not a command."
    },
    {
     "title": "Recovery anchor",
     "body": "During rest, choose one repeatable action that marks the break, such as making tea, walking once around the block, or putting the phone in another room. Do it every time you stop work so your body learns the switch. The point is not perfect relaxation; it is making rest feel like an actual state."
    },
    {
     "title": "One-pass review",
     "body": "Review finished work once, with a timer, and then move on. If a second doubt appears later, write it down without reopening the file. That gives your perfectionism a place to land without letting it take over the whole evening."
    }
   ],
   "mindset_guide": "Think of your energy like a lamp, not a test score. A lamp can be turned off without losing its value. Right now, your mind treats every finished task like something that must keep glowing. That is why recovery feels uneasy. You do not need to prove the work by staying lit all night.",
   "closing_title": "When the checking finally quiets",
   "closing_body": "From age 40, Earth takes the lead in your 10-year cycle, and the whole rhythm becomes more grounded. In this Burnout pattern, that means the habit of pushing until you crash loses its grip, and your days start to feel less like an endless audit. Monday-morning messages still matter, but they stop deciding the whole tone of your body. What stays with you is a steadier kind of completion, and that is the version of work you can finally live inside."
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
   "title_line1": "You finish the task, but your mind keeps the receipt.",
   "title_line2": "The work is done; the checking isn’t.",
   "subtitle": "Module 3 Burnout Deep Report — Saju × psychology × counseling integration",
   "opening_scene": "It’s Monday night, and your phone lights up with a message before you’ve fully landed in the evening. The work may already be finished, but your eyes still go back over the same details, as if one more pass could finally make your body believe it’s allowed to stop. Even on a day off, rest doesn’t feel like rest; it feels like waiting for the next thing to catch up with you. You sound tired and a little anxious, Mia — isn’t this exactly how your evenings have been lately?",
   "case_tag": "Example case — Claire, early 30s, a relationship that keeps getting checked",
   "case_paragraphs": [
    "Claire gets home after a long day and tells herself she is done for the night, but her hand still reaches for the phone every few minutes. She rereads a text she already sent, then rechecks the wording in her head while dinner goes cold. Her Five Elements pattern leans the same way yours does: strong Wood with weak Water, so the part that pushes, organizes, and holds things together keeps outrunning the part that would let her release them. You can already see yourself in her, can't you?"
   ],
   "oheng_intro": "Wood is 38%, so it is the strongest element in your chart, and Water is 13%, so it is thin. In Day Master terms, Wood is the force you handle as something concrete to catch and work with, while Water is the force you pour out as expression, talent, and energy. That is why this Burnout module lands so cleanly here: you keep grabbing the task, but the release never arrives with it.",
   "quiz_reading": "Your Perfectionism score is 82%, and your Recovery score is 34%, which matches the Finisher's Drain type. That combination shows up in the small ritual after the task is done: one more check, one more pass, one more reason not to let the day go quiet yet. The result is not laziness or a lack of effort; it is effort that stays switched on long after the work itself has ended.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — the grip that won’t let go",
     "body": "At 38%, Wood is strong, so your mind likes to keep a hold on what it has touched. That shows up when a task is already finished, but you still go back to re-check everything as if the answer might change on the second look. In Day Master language, this is the force you handle as something concrete to catch and work with, and yours is doing that with real intensity. The line that fits you here is simple: once you’ve taken it on, you do not easily put it down."
    },
    "fire": {
     "heading": "🔥 Fire weak — the spark that burns fast",
     "body": "Fire is 13%, so it is weak, and the energy it carries does not stay stretched out for long. That fits the way you cram, push through, and then crash all at once instead of moving in a steady rhythm. A day can look productive from the outside while still leaving you feeling wrung out by evening. The scene is not drama; it is a short, hot burst of effort that spends itself quickly."
    },
    "earth": {
     "heading": "⛰️ Earth weak — the place where a pause could settle",
     "body": "Earth is 13%, so it is weak, and that makes it harder for your system to land in a stable middle ground. You are not describing a lack of ability; you are describing how hard it is for rest to feel like rest once the work has been done. On a day off, that unease shows up even when nothing is actively asking for you. The quiet is there, but it does not fully register as safe enough to sink into."
    },
    "metal": {
     "heading": "💎 Metal strong — the standard that keeps the edges sharp",
     "body": "Metal is 25%, so it sits in the middle range, and it gives your chart a clean, exacting edge. That matters because your perfectionism score is 82%, and the two fit together in a very practical way: you notice what is unfinished, what is off by a little, and what still needs another look. In a relationship, that can make you careful and reliable, but it can also keep the internal review running long after the moment is over. The sharpness is useful; it just doesn’t know when to put itself away."
    },
    "water": {
     "heading": "💧 Water weak — the release that needs support",
     "body": "Water is 13%, so it is one of the lighter elements, and in your chart it is the part that would normally help expression, talent, and energy flow outward more easily. Metal supports Water, so the steadier, more structured side of you can help that release when you are ready to let something move. Right now, though, your Recovery score is only 34%, and that matches the feeling of resting while still staying on alert. The line to keep in view is this: you do not lack energy, you just have trouble letting it drain out cleanly."
    }
   },
   "upcoming_period_heading": "33 to 42: the water years begin",
   "upcoming_period_body": "From age 33 to 42, Water becomes stronger, and that future 10-year cycle is already mapped in your chart. The part of you that can let things move, soften, and settle will have more room, so the constant re-checking does not have to stay in command forever. For you, that means the edge of burnout eases into something more breathable, and the sense that you must stay switched on starts to loosen. What helps most before then is building small off-switches now, so the next cycle has something real to work with.",
   "cross_analysis_quotes": [
    "You are not short on effort; you are stuck in effort that never gets to land. Your 82% Perfectionism keeps reaching for one more check, and that is exactly what your strong Wood looks like when it refuses to release what it has already held. The sentence that captures it is this: you finish the work, but your mind keeps asking for proof.",
    "Rest feels uneasy because Recovery is only 34%, and weak Water makes release harder to trust. That is why a day off can still feel like a watchful day, even when nothing urgent is happening. Your system knows how to push; it is still learning how to let go."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows a mind that trusts control more than completion. In daily life, that looks like reopening a finished message, a closed file, or a done task just to make sure the feeling of certainty matches the facts. If that is your answer, you are not being difficult — you are showing how hard it is for you to accept 'done' without one more confirmation.",
    "Feeling uneasy even when you rest shows that your body has not fully learned to treat stillness as safe. That can look like checking the time on a quiet afternoon or feeling oddly restless after a day off. If that is how you answered, you are telling the truth about a system that needs rest to become familiar, not just available."
   ],
   "chat_snapshot_note": "Your main concern is that you rest, but it never feels like resting, and the emotion attached to it is tiredness with a little anxiety. That pairing matters, because it means the problem is not a lack of downtime; it is the way your mind keeps standing guard inside the downtime. The line to keep is this: you are not failing at rest, you are carrying vigilance into it.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they flip the switch back on before your system has finished standing down. For you, they do more than deliver information; they reactivate the part that thinks every pause might cost you later. That is why they connect so neatly to your strong Wood and your high Perfectionism: they press directly on the part that cannot stand to leave anything unfinished.",
   "chat_repeat_note": "The pattern runs in a very clear loop: you cram, then you crash. First you push through with focus and force, then the drop comes all at once, and the body gets the bill later. The smallest way to interrupt it is not to do everything differently, but to place one real stop before the crash begins.",
   "chat_fear_note": "Under the fatigue sits a very specific fear: if you stop, you’ll fall behind. That fear does not make you weak; it shows how closely rest and risk have become tied together in your mind. What you actually want is not to work forever — you want to know that pausing will not cost you your place.",
   "psychology_fact_heading": "Perfectionism and burnout",
   "psychology_fact_body": "In psychology, perfectionism is the tendency to set very high standards and keep checking whether the result meets them. In burnout research, that kind of constant self-monitoring often keeps the nervous system from fully downshifting after the task is done. Your 82% Perfectionism and 34% Recovery fit that pattern closely: the work ends, but the internal review keeps going. That is why your tiredness does not feel clean; it comes with a second layer of unfinished checking.",
   "psychology_takeaway": "You are not short on capacity; you are overusing it past the finish line. The cure is not more effort, but a cleaner stop.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half-held, and that is a real strength in your chart. The same Wood that makes you re-check also makes you dependable when a task needs to be finished carefully. In a relationship, that can look like remembering details, following up, and noticing what still needs attention before it slips away."
    },
    {
     "title": "Precision",
     "body": "Your 82% Perfectionism gives you a sharp eye for what does not line up yet. That means you catch the small mismatch in a message, a plan, or a promise before it grows teeth. The strength here is not that you never doubt; it is that your doubt often comes with useful accuracy."
    },
    {
     "title": "Persistence",
     "body": "Cramming, then crashing is still persistence, even if it is costing you too much. You can carry a lot through a difficult stretch and keep moving when others would have stopped. What matters is that your effort is real, and it has backbone."
    },
    {
     "title": "Quiet vigilance",
     "body": "You notice when something feels off, even if the rest of the room has moved on. That is part of why Monday-morning messages land so sharply for you: your system is already awake to the next demand. Used well, that vigilance helps you stay responsive and thoughtful in close relationships."
    }
   ],
   "weaknesses": [
    {
     "title": "Endless review",
     "body": "Once something is done, your mind still wants to run it through again. The finished task does not always feel finished, so you keep checking for a cleaner ending that never quite arrives. That is less about indecision and more about how hard it is for you to trust completion."
    },
    {
     "title": "Rest alarm",
     "body": "A day off does not automatically read as safe rest for you. The body may be still, but the mind stays uneasy, as if it should be doing something just in case. That makes recovery feel delayed even when the calendar says you are off."
    },
    {
     "title": "Overpush cycle",
     "body": "You tend to hold too much for too long, then collapse into the crash that follows. The cycle is simple enough to recognize and hard enough to interrupt, especially when the next message or deadline pulls you right back in. The problem is not a lack of discipline; it is too much discipline with too little release."
    },
    {
     "title": "Fear of pause",
     "body": "Stopping can feel like losing ground, which is why you keep moving even when you are already tired. That fear makes sense of the constant checking and the uneasy rest. It also explains why the quiet moments feel loaded instead of light."
    }
   ],
   "fit_good": "You do best in a relationship rhythm that leaves room for clear follow-up without constant urgency. A partner who sends one message and lets the answer breathe gives your system space to settle. A day with predictable contact and no surprise pressure makes it easier for you to stay present instead of scanning for the next update.",
   "fit_bad": "You struggle most in a relationship environment that keeps reopening the same loop of urgency and correction. Rapid-fire messages, repeated last-minute changes, and vague expectations will pull you back into re-checking mode. By evening, you end up spending more energy managing tension than actually being with the person in front of you.",
   "behavior_guides": [
    {
     "title": "Single check",
     "body": "When you finish a message or task, check it once more and then stop. Give yourself a clear rule: one review, then send or close it. That small boundary helps your mind practice completion instead of endless reopening."
    },
    {
     "title": "Scheduled pause",
     "body": "Set one fixed 10-minute break in the middle of your day and do not use it to catch up. Sit down, put the phone away, and let the break stay boring on purpose. Repeating that daily trains your system to recognize pause as real."
    },
    {
     "title": "Evening shutdown",
     "body": "Choose one time each night when work-related checking ends, even if the phone is still near you. Put the device face down, leave the room, or switch to a non-work activity for at least 30 minutes. The point is not to force calm; it is to give your mind a visible ending."
    },
    {
     "title": "Recovery cue",
     "body": "Pick one small cue that tells your body it is off duty, like changing clothes or making tea after work. Do it the same way every day for a week so the cue starts to mean something. That repetition gives weak Water a path to follow instead of leaving rest to chance."
    }
   ],
   "mindset_guide": "Think of your energy like a tab that keeps reopening because it never got a proper close. You do not need to keep the page open to prove you care. You need a cleaner ending so the mind stops polling for updates. When the ending is clear, rest stops feeling like a risk and starts feeling like a fact.",
   "closing_title": "When the check finally goes quiet",
   "closing_body": "From age 33 to 42, Water becomes stronger, and that future shift changes the feel of your Burnout pattern. The constant internal checking softens, and the pressure to keep proving that you are not behind starts to lose its grip. In this module’s terms, the day stops feeling like a test you have to keep retaking, and it starts feeling more like time you can actually inhabit. The sentence to keep is this: you can finish, and then you can rest."
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
 "casey": {
  "content": {
   "title_line1": "Terminas todo con la mente encendida",
   "title_line2": "y el descanso se queda sin entrar del todo.",
   "subtitle": "Módulo 3 · Agotamiento — informe profundo de saju × psicología × acompañamiento integrado",
   "opening_scene": "Son las primeras horas del lunes y el móvil vuelve a iluminarse con mensajes antes de que el día arranque. Tú miras la pantalla, lees una línea, y en tu cabeza ya aparece la frase de siempre: “todavía falta revisar”. Aunque el trabajo haya terminado, la mente no baja el ritmo; da una vuelta más, y otra más, como si soltar algo fuera perder terreno. Descansas, pero el cuerpo no lo registra como descanso, y encima aparece una inquietud fina que no te deja quedarte quieto. Casey, ¿no te está pasando últimamente algo así?",
   "case_tag": "CASO DE EJEMPLO — Martín, 30s, cierre de tareas y revisión constante",
   "case_paragraphs": [
    "Martín termina su día con todo entregado, pero a los diez minutos ya abre otra vez el archivo para mirar un detalle que nadie le pidió corregir. Su madera fuerte le empuja a tomar la realidad, ordenar, sostener y llevar la tarea hasta el final, mientras su agua nula deja la descarga sin salida. Por fuera parece que cerró la jornada; por dentro sigue encendido y sin poder aflojar. Tú también reconoces ese punto en el que terminar no se siente como terminar."
   ],
   "oheng_intro": "Tu madera está en 38% y el metal también en 38%, así que hay dos fuerzas muy visibles sosteniendo tu mapa al mismo nivel. La madera, en tu Maestro del Día de metal, es la energía con la que tomas lo real, el trabajo y el dinero; por eso no dejas asuntos sueltos. El agua está en 0%, y esa ausencia se nota justo en este módulo de agotamiento: te cuesta dejar salir, soltar y bajar la presión después de rendir.",
   "quiz_reading": "Tu perfeccionismo está en 82% y tu recuperación en 34%, y esa combinación encaja con el perfil Quien termina todo y se agota. No te falta empuje; lo que pasa es que tu día se alarga dentro de la cabeza, donde cada cierre se convierte en una segunda revisión. Por eso el descanso te llega con inquietud, como si el cuerpo se sentara mientras la mente sigue de pie.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera fuerte — tomas el trabajo con las dos manos",
     "body": "Tu madera está en 38%, así que no aparece como un detalle de fondo, sino como una fuerza que te lleva a agarrar tareas, resolver y seguir adelante. En tu Maestro del Día de metal, esta madera es la energía con la que tomas lo real, el dinero y el trabajo, y por eso revisar una vez más te parece casi natural. El problema no es que empieces poco; es que te cuesta dejar de sostener cuando ya diste suficiente. Casey, esa mano que no suelta también explica por qué un mensaje del lunes por la mañana te deja otra vez en tensión."
    },
    "fire": {
     "heading": "🔥 fuego moderado — el impulso sube y baja rápido",
     "body": "Tu fuego está en 13%, así que no domina la escena, pero sí mete un pulso breve que enciende la urgencia. En un día de agotamiento, eso se nota cuando quieres cerrar rápido, responder rápido y pasar al siguiente punto antes de que la incomodidad crezca. No es una llama larga; es un arranque corto que acelera justo cuando ya estabas intentando parar. Casey, ese empujón breve hace que el cansancio llegue con más contraste."
    },
    "earth": {
     "heading": "⛰️ tierra moderada — sostienes, pero sin mucho margen",
     "body": "Tu tierra está en 13%, así que la base existe, aunque no sobra espacio para amortiguar todo lo que cargas. En este módulo, eso se ve cuando intentas mantener el orden después de terminar, pero la sensación de descanso no termina de asentarse. La tierra te ayuda a aguantar la estructura del día, aunque no alcanza para darte una sensación amplia de pausa. Casey, por eso puedes seguir funcionando incluso cuando ya te pesa todo."
    },
    "metal": {
     "heading": "💎 metal fuerte — revisas, afinas y vuelves a revisar",
     "body": "Tu metal está en 38%, y eso te da una mirada precisa para detectar lo que falta, lo que se puede mejorar y lo que todavía no cierra. En tu mapa, el metal es el centro desde el que miras con exigencia, y en este módulo se nota en la revisión constante después de terminar una tarea. La misma precisión que te ayuda a entregar bien también te deja poco margen para sentir que algo ya está suficientemente hecho. Casey, tu estándar alto no se apaga cuando el día se acaba."
    },
    "water": {
     "heading": "💧 agua escasa — cuesta dejar salir la presión",
     "body": "Tu agua está en 0%, así que la salida, la descarga y el alivio espontáneo no aparecen como un recurso fácil en tu mapa. En tu Maestro del Día de metal, esta agua es la energía que suelta, expresa y deja correr; por eso el descanso te puede dejar inquietud en vez de alivio. Aquí el metal alimenta al agua, y esa relación explica por qué una parte de ti necesita bajar el ritmo pero no encuentra enseguida cómo hacerlo. Casey, cuando no hay agua, la tensión se queda dando vueltas dentro."
    }
   },
   "upcoming_period_heading": "41 años부터, el metal abre el siguiente tramo",
   "upcoming_period_body": "41 años marca el inicio de una etapa en la que el metal se vuelve más fuerte. Eso cambia el modo en que sostienes el trabajo: la exigencia deja de sentirse tan dispersa y empieza a ordenarse con más estructura. En ese tramo, conviene llegar con hábitos de cierre más simples, para que la revisión no se coma toda la energía del día. Casey, este nuevo ciclo no te pide más presión; te pide mejor forma de terminar.",
   "cross_analysis_quotes": [
    "Tu madera fuerte y tu perfeccionismo alto dicen lo mismo: no te basta con terminar, también quieres dejarlo impecable. Por eso una tarea cerrada todavía te sigue buscando en la cabeza. En tu caso, la exigencia no aparece como ruido; aparece como impulso para revisar una vez más.",
    "Tu agua en 0% y tu recuperación baja se entienden entre sí sin esfuerzo. Cuando algo termina, te cuesta convertir ese final en alivio, y la inquietud se queda encendida. Casey, ahí está la pista más clara: no solo te cansas, también te cuesta vaciar lo que ya diste."
   ],
   "answer_notes": [
    "Cuando respondes que vuelves a revisar todo desde el principio, muestras una mente que no acepta el cierre a medias. Eso habla de un estándar interno que busca control y precisión incluso después de entregar. Casey, esa misma fuerza te ayuda a hacer bien el trabajo, pero también te deja sin descanso fácil.",
    "Cuando dices que en un día libre sientes inquietud aunque descanses, aparece una relación difícil con la pausa. No estás diciendo que no quieras parar; estás diciendo que parar no te baja la tensión de inmediato. Casey, esa respuesta muestra que tu recuperación necesita una forma más clara de desconectar de lo pendiente."
   ],
   "chat_snapshot_note": "Tu preocupación central no es solo descansar, sino que el descanso no se sienta como descanso. Debajo de eso aparece cansancio, y también una ansiedad fina que se enciende cuando llegan los mensajes del lunes por la mañana. Casey, la frase que te guarda mejor es esta: tu cuerpo para antes que tu mente.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque llegan justo donde tu sistema ya está atento a no dejar nada atrás. Con tu perfeccionismo alto, ese aviso temprano no suena neutro; suena como una llamada a revisar, corregir y volver a sostener. Casey, lo que para otros es un simple inicio de semana, en ti toca una cuerda de exigencia.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte no aparece de golpe; se va armando mientras aguantas más de la cuenta. Primero sostienes, luego sigues sosteniendo, y cuando ya no queda margen, el cuerpo baja todo de una vez. Casey, el cambio pequeño empieza antes del derrumbe: cortar una revisión antes de la última vuelta ya afloja un poco la cadena.",
   "chat_fear_note": "Debajo de tu miedo a quedarte atrás si paras hay una necesidad muy humana de no perder lugar. No estás buscando correr por correr; estás buscando sentir que sigues dentro del ritmo. Casey, esa parte de ti no pide más presión, pide una forma de parar sin sentir que desapareces del mapa.",
   "psychology_fact_heading": "Perfeccionismo y recuperación en la autorregulación",
   "psychology_fact_body": "El perfeccionismo alto suele llevar a revisar, ajustar y posponer el cierre, incluso cuando la tarea ya salió bien. Cuando la recuperación es baja, la pausa no se vive como alivio inmediato, sino como un espacio donde la mente sigue activa. En tu caso, esas dos piezas encajan con mucha precisión: terminas, pero no sueltas del todo. Por eso el descanso necesita una entrada más clara, no más esfuerzo.",
   "psychology_takeaway": "No te falta descanso; te falta permiso interno para cerrar sin una última vuelta. Tu patrón no pide más fuerza, pide una salida más limpia.",
   "strengths": [
    {
     "title": "Cierre fino",
     "body": "Tu perfeccionismo alto hace que veas detalles que otros dejan pasar, y eso se nota en cómo revisas desde el principio una tarea ya terminada. Ese nivel de atención te da calidad real en el trabajo, no solo corrección superficial. Casey, tu fuerza está en que no entregas a medias."
    },
    {
     "title": "Resistencia",
     "body": "La frase “acumular y luego derrumbarme” muestra que puedes sostener mucho antes de soltar. Esa capacidad de aguante te permite seguir funcionando cuando el día ya pesa. Casey, tu resistencia no es pequeña; solo necesita una forma más amable de repartirse."
    },
    {
     "title": "Alerta precisa",
     "body": "Los mensajes del lunes por la mañana activan enseguida tu atención, y eso demuestra una vigilancia muy afinada. Lees rápido el cambio de clima y captas enseguida cuándo una exigencia vuelve a entrar. Casey, esa alerta puede ayudarte mucho si no la dejas trabajar todo el día sin pausa."
    },
    {
     "title": "Exigencia útil",
     "body": "Tu metal en 38% y tu madera en 38% dan una combinación que empuja a hacer, revisar y sostener con mucha seriedad. Esa mezcla no solo te fatiga; también te da una capacidad clara para llevar proyectos hasta un estándar alto. Casey, tu exigencia vale cuando la usas para cerrar, no para castigarte."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión infinita",
     "body": "Cuando terminas una tarea y vuelves a mirarla desde el inicio, el cierre se estira más de lo necesario. Esa vuelta extra parece pequeña, pero te roba el descanso que ya estabas buscando. Casey, ahí el trabajo no termina; solo cambia de lugar."
    },
    {
     "title": "Descanso sin calma",
     "body": "Tu respuesta sobre el día libre muestra que parar no te da alivio automático. El cuerpo se sienta, pero por dentro sigue la sensación de que algo quedó pendiente. Casey, por eso descansar no basta si no cierras también la revisión mental."
    },
    {
     "title": "Acumulación tensa",
     "body": "Tu patrón de acumular y luego derrumbarte hace que la energía se concentre demasiado tiempo antes de soltar. Eso vuelve cada tramo más pesado de lo necesario. Casey, no te falta constancia; te falta una salida más repartida."
    },
    {
     "title": "Miedo a parar",
     "body": "Tu miedo a quedarte atrás si paras hace que el descanso se sienta como riesgo. Esa idea te empuja a seguir incluso cuando ya no estás rindiendo mejor. Casey, lo que te conviene no es acelerar más, sino aprender a parar sin traducirlo como pérdida."
    }
   ],
   "fit_good": "Te conviene un trabajo con cierres claros, entregas definidas y poca ambigüedad al final del día. Cuando puedes dejar una tarea marcada como hecha sin que vuelva a abrirse sola, tu energía dura más. Casey, te va mejor un entorno donde revisar tenga un momento concreto y no invada toda la noche.",
   "fit_bad": "Te desgasta un entorno donde los mensajes llegan a cualquier hora y cada cierre vuelve a abrirse al minuto siguiente. Si el día termina con interrupciones constantes, tu mente no encuentra dónde bajar. Casey, también te pesa mucho un estilo de trabajo en el que siempre parece faltar una última corrección.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Al terminar una tarea, define una sola revisión final de diez minutos y después cierra el archivo. Hazlo siempre a la misma hora durante cinco días seguidos para que tu mente reconozca el final. Casey, una sola vuelta bien hecha vale más que tres rondas de tensión."
    },
    {
     "title": "Pausa visible",
     "body": "Cuando llegue el momento de descansar, deja el móvil en otra habitación durante veinte minutos. No lo hagas para rendir más; hazlo para que el cuerpo note que sí terminó el tramo. Casey, una pausa que se ve ayuda más que una pausa que solo se promete."
    },
    {
     "title": "Límite de revisión",
     "body": "Si ya revisaste algo una vez, anota en una línea qué quedó resuelto y no vuelvas al punto salvo que haya un cambio real. Usa esa nota como cierre para no depender de la memoria que se altera con facilidad. Casey, dejar el final por escrito te ayuda a no abrirlo otra vez por impulso."
    },
    {
     "title": "Entrada lenta",
     "body": "Cuando lleguen mensajes del lunes por la mañana, espera tres minutos antes de responder y mira primero qué parte de la tensión es real y cuál es automática. Hazlo sentado, sin cambiar de tarea todavía. Casey, ese pequeño margen corta la reacción en cadena."
    }
   ],
   "mindset_guide": "Tu mente funciona como una mesa de trabajo que nunca acepta quedar vacía. Si todo sigue encima, no hay descanso que entre de verdad. No necesitas más peso, necesitas una forma clara de dejar una pieza fuera. Casey, cerrar no es perder; cerrar es dejar de pagar dos veces por la misma tarea.",
   "closing_title": "Lo que sí cambia",
   "closing_body": "41 años abre un tramo en el que el metal se vuelve más fuerte y tu forma de ordenar el trabajo gana estructura. En este módulo de agotamiento, eso se traduce en algo muy concreto: la revisión deja de comerse toda la energía y el descanso empieza a sentirse más limpio. Tu cuerpo deja de vivir cada cierre como una alarma, y la inquietud baja de intensidad al terminar el día. Casey, lo que queda para ti es esta frase: cuando el cierre se vuelve claro, el descanso por fin entra."
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
 "riley": {
  "content": {
   "title_line1": "You finish the whole thing, then your mind starts the second shift.",
   "title_line2": "What looks complete outside still feels unfinished inside.",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late, and the work is already done, but your hand still reaches for the screen. Monday-morning messages light up the same old tension, and your mind starts checking what you already checked. You tell yourself you’re resting, yet the body stays tired and the mind stays a little anxious. Even the quiet feels like something you have to earn. Riley, doesn’t this sound exactly like you lately?",
   "case_tag": "EXAMPLE CASE — Maya, early 30s, someone who keeps going until the last drop is gone",
   "case_paragraphs": [
    "Maya finishes her tasks before dinner, then spends another twenty minutes going back through the same details because she can’t quite let the day close. Her Five Elements pattern is also top-heavy in Wood with almost no Metal, so her mind pushes forward while the pressure to stop and contain things feels thin. By the time she sits down, the rest has already been spent on checking. You can see yourself in that loop too."
   ],
   "oheng_intro": "Your Five Elements are Wood 50%, Earth 25%, Water 25%, with Fire and Metal both at 0%. In Day Master terms, Wood is the same energy as you, while Metal is the pressure that rules and constrains you. That means this burnout module lands in a pattern where your own drive is strong, but the part that would normally set boundaries and end the loop is almost absent.",
   "quiz_reading": "Your profile is Finisher's Drain, and the numbers match it cleanly: Perfectionism at 82% and Recovery at 34%. That mix shows up as the kind of day where you keep revisiting finished work, then feel uneasy even on a day off. So the problem isn’t that you never stop; it’s that stopping doesn’t fully switch your system off.",
   "element_readings": {
    "wood": {
     "heading": "🌳 wood strong — you keep the engine running after the finish line",
     "body": "With Wood at 50%, your energy doesn’t just start tasks — it keeps them moving long after they should have been set down. That’s why finishing one thing can turn into reopening the file, scanning the message again, or mentally replaying the whole sequence before bed. In this burnout module, that looks like a person who can’t quite trust the done state, even when everyone else would call it complete. Riley, this is your own force, and it’s powerful enough to keep you working past the point where rest should have begun."
    },
    "fire": {
     "heading": "🔥 fire absent — the spark that makes rest feel alive is missing",
     "body": "Fire is at 0%, so the bright, immediate feeling that says “this is enough for now” doesn’t arrive on its own. That can make a day off feel flat instead of warm, even when nothing urgent is happening. In your burnout pattern, the absence shows up as tiredness that doesn’t fully convert into relief. Riley, the room gets quiet, but the inside doesn’t light up with ease."
    },
    "earth": {
     "heading": "⛰️ earth moderate — the part that holds things together is there",
     "body": "Earth at 25% gives you some capacity to hold structure, even when you’re tired. It’s the part that can make a list, keep a plan, or stay with one task long enough to finish it cleanly. In this module, that steadiness helps explain why you can keep functioning while still feeling worn down underneath. Riley, you do have a place that can hold the day, even when the day feels heavy."
    },
    "metal": {
     "heading": "💎 metal absent — the boundary line that says ‘enough’ is too thin",
     "body": "Metal is at 0%, so the part of you that sets a clean limit and stops the review cycle is nearly silent. In Day Master terms, Metal is the weak energy that helps with boundaries and closure, and here it barely shows up. That is why Monday-morning messages can bring the tension back on: they connect straight to the unfinished feeling and make your mind want to check again. Riley, when the line is thin, your mind keeps drawing it by hand."
    },
    "water": {
     "heading": "💧 water moderate — the inner current keeps the worry moving",
     "body": "Water at 25% gives your mind a steady inner stream, so thoughts don’t vanish quickly once they’re formed. That’s useful for noticing details, but in burnout it also means the uneasy thought can keep circulating after the work is done. On a day off, that can feel like being physically still while the inside keeps moving. Riley, the thought doesn’t shout — it just stays."
    }
   },
   "upcoming_period_heading": "46 to 55, earth takes the lead",
   "upcoming_period_body": "46 to 55 is the next 10-year cycle, and Earth becomes the leading force there. The part of you that can hold, settle, and close things down grows stronger, so the current pattern of pushing through and then crashing loosens its grip. That shift gives your rest more shape and makes it easier to stop without feeling like you’re slipping behind. From here, the best preparation is to practice endings that are smaller, cleaner, and more deliberate.",
   "cross_analysis_quotes": [
    "Your 82% perfectionism is why a finished task still feels open. After you finish something, you go back and re-check everything instead of letting it close. That habit keeps the work mentally alive, even when the task is already done.",
    "That high finishing drive matches your Wood-heavy chart, where the same energy keeps pushing forward even after the work itself is done. Wood is the Day Master, the core energy that describes how you naturally move through life, and yours stays active. That is why you can keep going long after the finish line has already been crossed.",
    "With Metal at 0%, the stopping signal is too quiet, so checking becomes the way you try to feel safe. Metal is the energy that helps you draw a line and stop. When that signal is weak, your mind reaches for more checking instead of settling down.",
    "Your 34% recovery explains why the pause doesn’t land as relief. On a day off, you can still feel uneasy even when you rest. Instead of feeling restored, the break can feel unfinished.",
    "That low recovery fits the same chart gap: the part that should help you settle is weak, so rest stays uneasy instead of restorative. You may stop working, but your body and mind do not fully switch off. That is why rest can feel like another task instead of a real pause.",
    "So the anxiety on a day off isn’t random; it is the place where your lower recovery and missing Metal meet. You rest, but it never feels like resting, because the part that helps you stop is quiet and the part that helps you recover is underpowered. That is also why Monday-morning messages can switch the tension back on so fast."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows that you trust precision more than the feeling of completion. In daily life, that can look like reopening a finished message or rereading a task list even after you’ve already moved on. Riley, your care is real — it just needs a closing point, not another pass.",
    "Feeling uneasy even when you rest shows that your system doesn’t automatically recognize stillness as safe. That often appears as keeping one ear open for the next message, even while you’re trying to sit down and do nothing. Riley, the part of you that wants to rest is there; it just needs permission to stop scanning."
   ],
   "chat_snapshot_note": "Your core complaint is simple and sharp: you rest, but it never feels like resting. Under that sits tiredness with a little anxiety, so the body wants downshift while the mind keeps one eye on what might come next. Riley, the line to keep is this: you are not lazy when rest feels hard; you’re over-engaged even while sitting still.",
   "chat_trigger_note": "Monday-morning messages are the trigger because they reopen the unfinished loop before the week has even begun. For you, that kind of message lands right on the same place as high perfectionism and weak Metal: the part that wants one more check wakes up fast, and the part that says ‘stop here’ stays quiet. That is why the reaction feels bigger than the message itself.",
   "chat_repeat_note": "You cram, then crash, because the first half of the cycle runs on force and the second half arrives only after the fuel is gone. In the middle, you keep choosing one more push instead of a real pause. A small way out is to put a hard stop after the first check and leave the second pass for the next day, not the same night.",
   "chat_fear_note": "The fear underneath is simple and clear: you’re afraid that if you stop, you’ll fall behind. That fear keeps the pressure alive even when the work is done. Riley, it points to how hard it is for you to trust rest when your mind is still measuring time.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "Burnout research often treats perfectionism as a risk factor because it keeps standards high even when energy is already low. Recovery, on the other hand, depends on letting the nervous system register that work is over, and that shift does not happen automatically for everyone. In your pattern, high perfectionism and low recovery create a loop where finishing a task does not create closure, it creates another round of checking. That is why the problem feels less like overwork alone and more like unfinished tension that follows you into rest.",
   "psychology_takeaway": "You don’t just need more rest; you need rest that your mind is willing to believe. When perfectionism is high and recovery is low, the ending has to be made visible on purpose.",
   "strengths": [
    {
     "title": "Strong follow-through",
     "body": "You finish what you start, and that is not a small thing. The same 82% perfectionism that keeps you checking also means you notice what others miss and care enough to return to the details. In your day, that can look like staying with a task until it is genuinely solid, even when you’re already tired."
    },
    {
     "title": "Fine-grained attention",
     "body": "You can tell when something is almost right but not quite there. That sensitivity shows up in the way you go back over finished work instead of letting a rough edge slide. Riley, this is a real strength when it has a stopping point."
    },
    {
     "title": "Endurance under strain",
     "body": "You can keep moving even when the day has already asked for a lot. The Wood-heavy pattern helps explain why you can push through, and why other people may not notice how much effort it takes. That kind of endurance is valuable, especially in work that depends on consistency."
    },
    {
     "title": "Inner alertness",
     "body": "You do not miss the signal when something feels off, even if the signal is only a slight unease. Your 34% recovery and 25% Water show a mind that keeps track of what is still unresolved. Riley, that alertness can become wisdom once it is paired with a real stopping rule."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard to close",
     "body": "Once something is done, your mind still wants one more look. That is the same pattern behind re-checking everything after a task is finished, and it keeps the day from ending cleanly. Riley, the problem is not carelessness — it is that closure arrives too late."
    },
    {
     "title": "Uneasy rest",
     "body": "Rest does not automatically register as rest for you. On a day off, you can still feel like you should be doing something, or at least monitoring what comes next. That makes quiet time feel thin, even when nothing is actually demanding your attention."
    },
    {
     "title": "Crash after push",
     "body": "You tend to cram first and only feel the cost later. That pattern explains why energy can look available for a while and then drop all at once, after you’ve already spent too much of it. Riley, the crash is not a mystery; it is the bill arriving after the spending."
    },
    {
     "title": "Behind fear",
     "body": "The fear of falling behind keeps your foot on the gas longer than your body wants. It makes Monday-morning messages feel heavier because they seem to measure you before you’ve even started. Riley, this fear is really asking for reassurance that stopping does not equal disappearing."
    }
   ],
   "fit_good": "You do best in a relationship rhythm where replies have a natural end and no one expects instant replay. A calm evening with one clear plan, one clear check-in, and no endless back-and-forth helps your mind relax instead of scanning. Riley, spaces that let you finish cleanly are the ones that let you feel close without getting flooded.",
   "fit_bad": "You struggle in environments where messages arrive without rhythm and every pause feels like a problem. A relationship style that rewards constant availability will pull you back into checking and make rest feel guilty. Riley, anything that keeps the conversation half-open all day will feed the same burnout loop.",
   "behavior_guides": [
    {
     "title": "One check rule",
     "body": "Choose one time to review a finished task, then stop. Do it in the evening or right after you finish, and keep it to ten minutes so the second pass doesn’t expand. Riley, the point is not to be less careful — it is to make care end on schedule."
    },
    {
     "title": "Off-duty buffer",
     "body": "Before a day off, write down the three things you are allowed to ignore until the next workday. Keep that note where you can see it when Monday-morning messages start to stir you up. Riley, this gives your mind a place to put the unfinished feeling without carrying it all night."
    },
    {
     "title": "Stop signal",
     "body": "Create one physical cue that means work is over, like closing the laptop, putting the phone in another room, or changing clothes immediately after the last task. Use the same cue every day so your body learns the ending faster. Riley, the signal matters because your mind does not seem to accept invisible endings."
    },
    {
     "title": "Recovery slot",
     "body": "Schedule a short rest block that is not for catching up, only for letting the mind land. Keep it to twenty minutes and do not turn it into planning time. Riley, that small protected gap can teach your system that stillness is allowed to stay still."
    }
   ],
   "mindset_guide": "Think of your energy like a door that keeps swinging open because no one has put a stop on it. Perfectionism keeps you reaching for the handle again. Recovery grows when you let the door rest in the frame for a while. Riley, you do not need to slam it shut — you need to leave it closed long enough to feel the quiet.",
   "closing_title": "What closes can finally rest",
   "closing_body": "46 to 55 brings Earth forward, and that changes the shape of your days. In this 10-year cycle, Earth becomes stronger, which can support steadier structure and a more grounded pace. For now, the pattern of re-checking and pushing through is still part of your present experience, so this period can be seen as a later chapter where stability has more room to grow. Riley, 46 to 55 is the chapter where your energy has more support for settling into a steadier rhythm."
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
   "title_line1": "Cuando revisas todo, tu energía se va en silencio",
   "title_line2": "Y el descanso se queda mirando desde la puerta",
   "subtitle": "Módulo 3 · Agotamiento — informe profundo de saju × psicología × acompañamiento integrado",
   "opening_scene": "Son las noches en las que ya terminaste todo, pero tu mente sigue volviendo al mismo gesto: revisar otra vez, abrir de nuevo, mirar si quedó algo fuera de lugar. En la pantalla todavía quedan los mensajes del lunes por la mañana, y ese contacto pequeño te enciende por dentro más de lo que debería. De fondo aparece una frase muy tuya: \"si paro, me quedo atrás\". Y aunque el cuerpo pide pausa, la cabeza sigue haciendo cuentas con el cansancio. Lucía, ¿no te estás viendo así últimamente?",
   "case_tag": "CASO DE EJEMPLO — Martina, 30 y tantos, rutina de trabajo y pareja",
   "case_paragraphs": [
    "Martina termina su día, apaga la computadora y aun así vuelve a abrir el correo para revisar si dejó algo sin cerrar. En la mesa quedan el café frío y una lista de pendientes que no se acaba nunca, porque cada cierre le deja la sensación de que falta una última vuelta. Su mapa muestra una tierra muy fuerte y un metal muy bajo, así que la presión por dejar todo perfecto pesa más que la facilidad para soltar. Lucía, tú también podrías estar viviendo esa misma secuencia."
   ],
   "oheng_intro": "Tu tierra está en 38% y domina el mapa, mientras el metal aparece en 0% y queda muy bajo. En tu Maestro del Día agua, esa tierra fuerte se vive como presión, reglas y responsabilidad encima de lo tuyo, y el metal bajo deja poco espacio para la ayuda, el aprendizaje o la protección que te aflojan la carga. En este módulo de agotamiento, esa mezcla se nota justo cuando intentas descansar y no consigues bajar del todo el ritmo.",
   "quiz_reading": "Tu 82% en perfeccionismo y tu 34% en recuperación dibujan a alguien que no se va del día cuando el día termina. El tipo \"Quien termina todo y se agota\" encaja porque cierras tareas, pero tu mente sigue de guardia. Por eso, un descanso libre no se siente libre: se siente incompleto, como si todavía faltara revisar algo más.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera débil — lo que se corta antes de crecer",
     "body": "Tu madera está en 13%, y eso la deja en un nivel bajo. Cuando intentas abrir un espacio nuevo para un vínculo o para una iniciativa, primero miras todo lo pendiente y el impulso se te queda a medio camino. Como tu metal está en 0%, la tierra es la que termina dominando la escena y te deja menos margen para ordenar sin tensión. Lucía, por eso a veces tu crecimiento emocional parece empezar con una revisión y no con un respiro."
    },
    "fire": {
     "heading": "🔥 fuego medio — la chispa que empuja y también acelera",
     "body": "Tu fuego está en 25%, así que no falta impulso, pero tampoco sobra. Esa energía se siente cuando respondes rápido, piensas mucho en el vínculo y sostienes la conversación aunque por dentro ya te quedes sin energía. El problema no es la falta de intensidad, sino que esa intensidad se enciende mientras tu recuperación sigue baja. Lucía, tu fuego quiere avanzar, pero no siempre encuentra un cuerpo que lo acompañe con calma."
    },
    "earth": {
     "heading": "⛰️ tierra fuerte — la carga que no sueltas del todo",
     "body": "Tu tierra está en 38%, y ahí está la fuerza que más pesa en tu mapa. Con tu Maestro del Día agua, esa tierra se vive como responsabilidad, presión y obligación de sostener el vínculo sin dejar huecos. Se nota en escenas muy concretas, como cuando llegan los mensajes del lunes por la mañana y tu mente se pone en modo vigilancia antes de que el día arranque. Lucía, esta tierra te hace cumplir, pero también te deja con la sensación de que descansar todavía es una tarea pendiente."
    },
    "metal": {
     "heading": "💎 metal débil — el apoyo que necesitas para aflojar",
     "body": "Tu metal está en 0%, y por eso queda muy poco espacio para la claridad, el límite y la ayuda que ordena. La tierra puede nutrir al metal, y en tu caso esa relación importa porque la parte que más pesa en ti también podría sostener un poco la estructura que te protege, si la dejaras entrar en mejor forma. Pero hoy esa ayuda casi no aparece, así que terminas sosteniendo mucho más de lo que suelta tu cuerpo. Lucía, aquí está una de las razones por las que el descanso no termina de sentirse como descanso."
    },
    "water": {
     "heading": "💧 agua media — la parte que siente todo mientras sigue funcionando",
     "body": "Tu agua está en 25%, y eso te da sensibilidad para notar lo que pasa incluso antes de nombrarlo. En una relación, esa agua hace que captes el tono, el silencio y el cambio mínimo, y por eso el lunes por la mañana te altera más de la cuenta. No te falta percepción; te falta pausa para que esa percepción no se convierta enseguida en revisión y tensión. Lucía, tu agua entiende rápido lo que pasa, pero después se queda trabajando de más."
    }
   },
   "upcoming_period_heading": "38 años desde ahora, el fuego abre otro tramo",
   "upcoming_period_body": "38 años marca el inicio de un ciclo de diez años en el que el fuego se vuelve más fuerte. Lo que hoy se vive como vigilancia y sobrecarga cambia de tono, porque esa energía empuja más a actuar que a revisar sin fin. En el vínculo, eso trae más impulso y más presencia, pero también pide que llegues con límites más claros para no volver a vaciarte. Lucía, te conviene ir preparando espacios donde no todo dependa de sostener y responder al instante.",
   "cross_analysis_quotes": [
    "Tu tierra en 38% y tu perfeccionismo en 82% dicen lo mismo con lenguajes distintos: sostienes demasiado y luego te vacías de golpe. Esa presión no se queda en una idea; aparece cuando revisas otra vez lo que ya terminaste. Lucía, lo que parece disciplina muchas veces ya va rozando el agotamiento.",
    "Tu metal en 0% y tu recuperación en 34% encajan de una forma muy precisa: hay poca estructura interna para soltar sin sentir culpa. Por eso un día libre no baja la alarma del todo. Lucía, tu mente no descansa porque todavía no encuentra un borde que la contenga."
   ],
   "answer_notes": [
    "Cuando respondes que vuelves a revisar todo desde el principio, muestras una necesidad de cierre total que no deja espacio para la versión suficientemente buena. En el día a día eso se ve como abrir de nuevo lo que ya estaba terminado, solo para quitar una duda más. Lucía, tu perfeccionismo no busca pulir por capricho; busca tranquilidad.",
    "Cuando dices que sientes inquietud aunque descanses, aparece una recuperación que no logra cambiar de marcha ni en tiempo libre. Eso se nota en un día sin obligaciones, cuando el cuerpo se detiene pero la mente sigue buscando algo que vigilar. Lucía, tu respuesta enseña que descansar para ti todavía necesita permiso interno."
   ],
   "chat_snapshot_note": "Tu preocupación no es solo descansar, sino que el descanso no se sienta como descanso. Eso viene pegado a cansancio y un poco de ansiedad, así que tu cuerpo quiere parar mientras tu mente sigue contando lo que falta. Lucía, la frase que se queda es esta: no te falta pausa, te falta permiso para sentirla.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque abren de golpe la parte de ti que cree que no puede aflojar. Ahí se mezclan tu perfeccionismo alto y tu recuperación baja, y por eso un simple aviso toca una alarma más grande de lo que parece. Lucía, no reaccionas solo al mensaje; reaccionas a todo lo que ese mensaje te hace recordar.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte funciona como una cuerda tensa que aguanta demasiado antes de soltar todo junto. En medio de eso, tú eliges seguir sosteniendo hasta que ya no queda margen. Un pequeño cambio sería cortar antes el exceso, no cuando ya te pasó por encima. Lucía, ahí empieza a cambiar la forma del día.",
   "chat_fear_note": "Debajo de tu miedo a quedarte atrás si paras hay un deseo muy claro de seguir siendo parte, de no perder ritmo con lo que importa para ti. No es miedo vacío; es una forma de proteger el lugar que quieres ocupar en el vínculo y en tu vida. Lucía, ese miedo habla de cuánto valor le das a no desaparecer de la escena.",
   "psychology_fact_heading": "Perfeccionismo y autoverificación repetida",
   "psychology_fact_body": "Tus respuestas muestran un perfeccionismo alto, con 82%, y una recuperación baja, con 34%. Eso se nota cuando, después de terminar una tarea, vuelves a revisarlo todo desde el principio, y también cuando en un día libre sientes inquietud aunque descanses. En tu caso, el perfeccionismo no se queda en querer hacerlo bien: se convierte en una revisión que no termina de soltar lo ya hecho. Lo importante no es hacer menos por hacer menos, sino notar cuándo esa revisión deja de ayudar y empieza a consumir descanso.",
   "psychology_takeaway": "Cuando revisar se vuelve refugio, también se vuelve desgaste. Tu descanso necesita menos comprobación y más permiso.",
   "strengths": [
    {
     "title": "Constancia fina",
     "body": "Tienes una capacidad muy clara para terminar lo que empiezas, y eso se ve en tu 82% de perfeccionismo. No dejas que una tarea quede a medias sin mirarla de nuevo, y esa atención te permite detectar detalles que otros pasarían por alto. Lucía, tu fuerza está en esa constancia que mantiene el hilo incluso cuando ya estás al límite."
    },
    {
     "title": "Alerta emocional",
     "body": "Tu 25% de agua te da una sensibilidad fina para leer el ambiente y notar cuándo algo cambia de tono. Por eso los mensajes del lunes por la mañana no te pasan desapercibidos: entran directo en tu sistema y activan una respuesta rápida. Lucía, esa alerta te ayuda a captar mucho antes de que algo se complique."
    },
    {
     "title": "Compromiso real",
     "body": "Con tu tierra en 38%, no te quedas en la intención; sostienes, organizas y respondes. Esa fuerza hace que las personas a tu alrededor sepan que contigo las cosas no se abandonan a la mitad. Lucía, tu compromiso es serio y deja huella en cómo te relacionas."
    },
    {
     "title": "Impulso afectivo",
     "body": "Tu fuego en 25% mantiene viva la iniciativa para acercarte, escribir y seguir el intercambio aunque ya te quedes sin energía. En romance, eso hace que no te apagues del todo, incluso cuando el cansancio ya pidió turno. Lucía, esa chispa sostiene mucho más de lo que parece."
    }
   ],
   "weaknesses": [
    {
     "title": "Reposo frágil",
     "body": "Tu recuperación en 34% muestra que parar no siempre cambia el estado interno. Puedes dejar la tarea, pero la inquietud se queda cerca y no deja que el cuerpo entienda que ya terminó el turno. Lucía, ahí es donde el descanso se te escapa por una rendija."
    },
    {
     "title": "Exceso de revisión",
     "body": "Tu perfeccionismo en 82% empuja a volver al inicio aunque ya cerraste algo. Esa costumbre te hace perder tiempo y energía en una vuelta más que promete tranquilidad, pero te deja más tensa. Lucía, tu mente busca alivio en la revisión y a veces encuentra más carga."
    },
    {
     "title": "Carga interna",
     "body": "Tu tierra en 38% pesa como responsabilidad sostenida, y con tu Maestro del Día agua eso se siente como presión encima de lo sensible. En la práctica, puedes terminar respondiendo antes de preguntarte si de verdad quieres hacerlo así. Lucía, esa carga te vuelve fiable, pero también muy exigida."
    },
    {
     "title": "Apoyo escaso",
     "body": "Tu metal en 0% deja poco margen para recibir estructura, ayuda o contención sin sentir que dependes demasiado. Por eso lo que debería ordenar termina faltando justo cuando más lo necesitas, sobre todo en momentos como el lunes por la mañana. Lucía, no es que no quieras apoyo; es que te cuesta encontrar dónde dejar peso."
    }
   ],
   "fit_good": "Te conviene un entorno donde las tareas tengan cierre claro y no se te pida revisar todo tres veces. Un día con bloques definidos, mensajes en horarios previsibles y espacios cortos de pausa te ayuda más que una agenda abierta todo el tiempo. Lucía, rindes mejor cuando la estructura te acompaña sin invadirte.",
   "fit_bad": "Te desgasta un entorno de interrupciones constantes, respuestas urgentes y cambios de último minuto. Si cada lunes empieza con mensajes que exigen atención inmediata, tu mente se queda en guardia desde temprano. Lucía, ese tipo de día te roba energía antes de que puedas usarla.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Elige una sola revisión final para cada tarea y ponle un límite de 10 minutos. Hazla al terminar, no al rato ni al día siguiente, y después cierra la pantalla sin volver a abrirla. Lucía, así entrenas a tu mente a reconocer que terminar también cuenta."
    },
    {
     "title": "Pausa marcada",
     "body": "Antes de dormir, deja 15 minutos sin mensajes, sin correos y sin listas. Usa ese tramo para sentarte, respirar y notar que no tienes que resolver nada más en ese momento. Lucía, esa pausa corta le enseña a tu cuerpo a bajar sin pelear."
    },
    {
     "title": "Lunes lento",
     "body": "Los lunes por la mañana, retrasa la primera revisión de mensajes unos minutos y empieza por una tarea simple. No abras todo a la vez; entra de uno en uno para que la tensión no se te suba de golpe. Lucía, un arranque más lento te protege más que una respuesta inmediata."
    },
    {
     "title": "Descanso visible",
     "body": "Cada día, reserva un bloque pequeño que no sirva para producir ni para corregir. Déjalo escrito en tu agenda como un compromiso real y cúmplelo igual que cumples una entrega. Lucía, cuando el descanso ocupa un lugar visible, deja de parecer una deuda."
    }
   ],
   "mindset_guide": "Tu mente funciona como una mesa donde nunca retiras los papeles del trabajo. Si todo queda encima, nada descansa de verdad. Necesitas aprender a dejar una superficie limpia aunque no todo esté perfecto. Lucía, no se trata de cerrar más fuerte, sino de soltar a tiempo.",
   "closing_title": "Lo que por fin afloja",
   "closing_body": "A los 38 años empieza un ciclo de diez años en el que el fuego toma más fuerza y tu forma de vincularte cambia de ritmo. A los 38 años, ese periodo puede ayudarte a sentir menos peso y a salir de la revisión permanente, porque la energía del fuego favorece más movimiento y menos presión. Lucía, el descanso empieza a sentirse más real cuando ya no tienes que demostrarlo todo antes de parar. Y esta es la frase que te conviene guardar: no vienes a rendir más, vienes a respirar sin culpa."
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
   "title_line1": "끝낸 뒤에도 멈추지 않는 점검",
   "title_line2": "쉬지 못하는 마음이 월요일 알림까지 끌고 가요",
   "subtitle": "모듈 3 · 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "밤이 깊은데도 휴대폰이 손에서 멀어지지 않아요. 일을 끝냈는데도 머릿속에서는 다시 처음부터 훑어보는 문장이 계속 돌아가고, 몸은 침대에 있는데 마음은 아직 퇴근을 못 한 상태예요. 월요일 아침 메신저 알림이 떠오르는 순간, 이미 끝난 하루가 다시 시작되는 느낌이 들었을 거예요. 지수님, 요즘 이런 모습 아니세요?",
   "case_tag": "가상 사례 — 민준, 30대 초반, 업무 과부하",
   "case_paragraphs": [
    "민준은 퇴근 후에도 노트북을 덮지 못하고, 방금 보낸 메일을 한 번 더 열어 봐요. 완벽주의가 높아서 일을 끝내도 마음은 끝났다고 느끼지 못하고, 쉬는 날에도 머릿속이 계속 일을 붙잡고 있어요. 사주에서도 토가 강해서 현실을 단단히 붙드는 힘이 크지만, 수가 약해 쉬어도 마음을 풀어 주는 숨구멍이 부족해요. 당신도 비슷하게 버틴 뒤에 더 지치는 쪽이라면 이 장면이 낯설지 않을 거예요."
   ],
   "oheng_intro": "토 50%가 우세하고 수 0%가 약한 분포예요. 지수님은 현실과 일을 붙잡는 힘이 강해서 맡은 일을 놓치지 않지만, 그 일을 내려놓고 숨을 돌리는 쪽은 비어 있어요. 이번 모듈이 번아웃인 이유도 여기서 선명해져요. 끝까지 해내는 힘이 쉬는 힘보다 더 앞서 있기 때문이에요.",
   "quiz_reading": "완벽주의 82%와 회복 34%가 같이 보이면, 끝내는 힘은 강한데 풀어내는 힘이 뒤따르지 않는 하루가 만들어져요. 유형 이름이 완주형 소진인 이유가 바로 여기에 있어요. 마감은 넘기는데, 끝난 뒤에도 몸은 계속 긴장한 채로 남아 있어요.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 보통 — 방향은 잡히지만 속도는 토에 눌려요",
     "body": "목 33%는 지수님 안에서 일을 앞으로 밀어 주는 힘이에요. 갑 일간 기준으로 보면, 목은 내가 시작하고 뻗어 가는 기운이라서 계획을 세우고 손을 대는 속도가 분명해요. 다만 토가 50%로 더 커서, 시작한 일도 곧바로 현실의 무게로 바뀌어요. 그래서 지수님은 아이디어를 떠올리는 순간보다, 그걸 실제 결과로 묶어 두는 순간에 더 오래 붙잡혀 있어요."
    },
    "fire": {
     "heading": "🔥 화 약하다 — 열은 작고, 점검은 길어요",
     "body": "화 0%는 일의 온도를 바로 올려 주는 숨이 거의 없다는 뜻이에요. 번아웃 모듈에서는 이게 '잠깐 쉬자'는 말보다 '한 번만 더 확인하자'는 말로 더 자주 나타나요. 지수님은 일을 끝냈는데도 마음이 따뜻하게 마무리되지 않고, 바로 다음 점검으로 넘어가요. 그래서 에너지가 없어서가 아니라, 켜진 채로 식지 못해서 더 지쳐요."
    },
    "earth": {
     "heading": "⛰️ 토 우세 — 붙잡는 힘이 강해서 놓는 순간이 어려워요",
     "body": "토 50%는 지수님이 현실을 꽉 쥐고 버티는 힘이에요. 갑 일간 기준으로 보면, 이 토는 내가 다루는 기운이라서 일, 돈, 책임 같은 것을 손에서 쉽게 놓지 않게 해요. 그래서 마감이 끝나도 마음은 자꾸 결과를 다시 점검하고, 월요일 아침 메신저 알림 하나에도 긴장이 바로 올라와요. 이 힘 덕분에 끝까지 해내지만, 같은 힘 때문에 쉬는 쪽이 늦어져요."
    },
    "metal": {
     "heading": "💎 금 보통 — 기준은 또렷하고, 그래서 더 꼼꼼해요",
     "body": "금 17%는 지수님 안의 기준과 정리를 담당해요. 이 수치는 크지 않지만, 완벽주의 82%와 붙으면 '이 정도면 됐나?'보다 '더 다듬을 부분이 있나?'를 먼저 보게 해요. 일을 끝낸 뒤 다시 처음부터 훑어보는 답변도 이 금의 결이 보여요. 기준이 분명한 사람이라서, 마무리 뒤에도 확인이 한 번 더 붙어요."
    },
    "water": {
     "heading": "💧 수 약하다 — 쉬는 감각을 살려 주는 숨이 부족해요",
     "body": "수 0%는 지수님에게 회복의 여백이 거의 없다는 뜻이에요. 약한 수는 금이 수를 살려 주는 흐름으로 채워 주는데, 그래서 정리와 확인이 쌓인 뒤에야 비로소 마음이 조금 풀릴 수 있어요. 지금은 쉬는 날에도 마음이 불편하다는 답처럼, 쉬어도 쉬는 느낌이 바로 오지 않아요. 하지만 이 수는 아예 없는 것이 아니라, 정리된 환경과 작은 확인이 쌓일 때 조금씩 살아나요."
    }
   },
   "upcoming_period_heading": "36세부터 시작되는 물의 장이 열립니다",
   "upcoming_period_body": "36세부터 45세까지는 수 기운이 강해지는 시기예요. 지금까지 지수님을 끌고 온 토의 밀도는 이때부터 조금씩 느슨해지고, 일을 끝낸 뒤에도 계속 점검하던 흐름이 한결 부드러워져요. 번아웃 모듈에서 이 전환은 아주 분명해요. 몰아서 버티고 무너지는 리듬보다, 중간에 숨을 고르고 다시 이어 가는 쪽이 더 자연스러워져요.",
   "cross_analysis_quotes": [
    "토 50%와 완벽주의 82%는 서로 정확히 맞물려 있어요. 지수님은 끝내는 힘이 강해서 일을 놓지 않아요. 그런데 그 힘이 커질수록 끝난 뒤 점검도 길어져서, 완주보다 소진이 먼저 남아요.",
    "수 0%와 회복 34%는 같은 방향을 가리켜요. 쉬어도 마음이 불편한 건 게으름이 아니라, 몸이 멈춰도 내부가 아직 쉬는 법을 못 배운 상태라는 뜻이에요. 그래서 월요일 아침 메신저 알림 하나가 긴장을 다시 켜요."
   ],
   "answer_notes": [
    "일을 끝낸 뒤 다시 처음부터 훑어본다는 답은, 지수님이 결과보다 오차를 먼저 보는 사람이라는 뜻이에요. 실제 일상에서는 제출 버튼을 누른 뒤에도 화면을 닫지 못하고 한 번 더 확인하게 돼요. 그 꼼꼼함은 강점이지만, 오늘은 그만큼 자신을 오래 붙잡는 방식이기도 해요.",
    "쉬는 날에도 마음이 불편하다는 답은, 지수님이 휴식 자체를 거부해서가 아니에요. 멈춘 상태를 편안하게 받아들이는 감각이 아직 약해서, 쉬는 순간에도 머릿속이 다음 일을 찾고 있어요. 그러니 쉬는 날의 불편함을 탓하기보다, 짧게라도 마음이 덜 바빠지는 방식을 찾아보면 좋아요."
   ],
   "chat_snapshot_note": "지수님은 쉬어도 쉬는 것 같지 않다는 고민을 실제로 꺼내셨어요. 그 말 뒤에는 지쳤고 조금 불안하다는 감정이 붙어 있었고, 그래서 멈추는 순간이 오히려 더 불편하게 느껴져요. 남기고 싶은 문장은 이거예요. 쉬지 못하는 게 아니라, 쉬는 동안에도 계속 일하는 마음이에요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 단순한 알림이 아니에요. 완벽주의 82%와 토 50%가 붙어 있어서, 그 한 번의 울림이 곧바로 다시 점검 모드로 들어가게 만들어요. 알림이 크게 걸리는 건 일이 많아서가 아니라, 멈추면 뒤처질까 봐 마음이 먼저 달리기 때문이에요.",
   "chat_repeat_note": "몰아서 하고 무너지는 패턴은 지수님이 버티는 방식이 아주 분명하다는 뜻이에요. 한 번에 집중해서 끝내는 선택을 자주 하다 보니, 중간의 숨은 줄고 끝난 뒤에 꺼짐이 크게 와요. 이 패턴을 살짝 벗어나려면, 일이 커지기 전에 10분짜리 멈춤을 먼저 넣는 쪽이 좋아요.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 두려움은, 사실 뒤처짐 그 자체보다 멈춘 뒤의 불안을 더 크게 느끼고 있다는 뜻이에요. 지수님은 속도를 사랑하는 사람이 아니라, 속도를 늦출 때 생길 공백이 두려운 사람이에요. 그래서 이 두려움 아래에는 더 안전하게 숨을 고르고 싶다는 바람이 있어요.",
   "psychology_fact_heading": "브레이크-회복 균형",
   "psychology_fact_body": "브레이크-회복 균형은 일을 멈추는 기능과 다시 회복되는 기능이 서로 맞물려야 한다는 관점이에요. 지수님은 완벽주의가 높은 쪽으로 브레이크를 세게 밟는 편인데, 회복은 낮아서 멈춘 뒤의 복원이 늦어요. 그래서 일의 완성도는 높아도, 끝난 뒤의 체감은 늘 더 지쳐 있게 돼요. 이 조합은 번아웃에서 아주 선명하게 드러나요.",
   "psychology_takeaway": "잘 멈추는 사람보다, 잘 다시 시작하는 사람이 오래 가요. 지수님은 지금 멈춤보다 복원 쪽을 키우는 게 더 중요해요.",
   "strengths": [
    {
     "title": "끝내는 힘",
     "body": "지수님은 토 50%답게 맡은 일을 끝까지 붙잡는 힘이 있어요. 실제로 일의 끝에서 다시 처음부터 훑어보는 모습은, 대충 넘기지 않겠다는 책임감으로 읽혀요. 이 힘 덕분에 주변은 지수님에게 마무리를 맡길 수 있어요."
    },
    {
     "title": "기준 감각",
     "body": "완벽주의 82%는 지수님이 무엇을 놓치면 안 되는지 빨리 알아차린다는 뜻이에요. 월요일 아침 메신저 알림이 크게 느껴지는 것도, 기준이 예민하게 살아 있기 때문이에요. 그래서 지수님은 흐릿한 상태를 그냥 지나치지 않아요."
    },
    {
     "title": "집중 지속",
     "body": "몰아서 하고 무너지는 패턴은 반대로 보면, 한 번 붙으면 깊게 들어가는 집중이 있다는 뜻이에요. 짧은 시간에 많은 걸 밀어내는 힘이 있어서, 급한 일에서는 특히 강해요. 다만 그 집중이 길어질수록 회복이 뒤따라야 해요."
    },
    {
     "title": "현실 감각",
     "body": "토가 강한 사람은 눈앞의 일을 실제로 굴리는 감각이 좋아요. 지수님도 막연한 위로보다 오늘 처리할 일과 남은 양을 바로 보는 쪽이에요. 그래서 혼란한 상황에서도 실무의 중심을 쉽게 놓치지 않아요."
    }
   ],
   "weaknesses": [
    {
     "title": "쉬는 불편",
     "body": "수 0%는 쉼을 편안하게 받아들이는 감각이 약하다는 뜻이에요. 쉬는 날에도 마음이 불편하다는 답처럼, 몸은 멈춰도 안쪽은 계속 돌아가요. 그래서 휴식이 휴식으로 남기보다, 다음 일을 준비하는 시간처럼 느껴져요."
    },
    {
     "title": "과점검",
     "body": "일을 끝낸 뒤 다시 처음부터 훑어보는 습관은 꼼꼼함이지만, 길어지면 과점검이 돼요. 지수님은 이미 한 번 끝낸 일을 마음속에서 여러 번 다시 열어 봐요. 그 과정이 길어질수록 피로는 쌓이고 만족은 늦어져요."
    },
    {
     "title": "긴장 점화",
     "body": "월요일 아침 메신저 알림은 지수님에게 긴장을 다시 켜는 스위치예요. 작은 소리 하나가 크게 걸리는 건, 이미 내부가 쉬지 못한 채 예민하게 대기하고 있기 때문이에요. 그래서 하루의 시작이 자주 무겁게 열려요."
    },
    {
     "title": "무리 버팀",
     "body": "몰아서 하고 무너지기 패턴은 버티는 힘이 강한 대신, 나눠서 쉬는 힘이 약하다는 뜻이에요. 지수님은 중간에 잠깐 내려놓기보다, 일단 끝까지 버티는 쪽을 더 자주 골라요. 그 선택이 누적되면 무너짐은 더 크게 느껴져요."
    }
   ],
   "fit_good": "지수님에게 맞는 환경은 중간 점검이 짧고 분명한 곳이에요. 하루가 길어도 해야 할 일이 눈에 보이고, 끝낸 뒤 10분 정도는 완전히 끊을 수 있는 구조가 좋아요. 월요일 아침처럼 알림이 몰리는 환경보다, 시작과 끝이 또렷한 일정이 더 잘 맞아요.",
   "fit_bad": "지수님에게 맞지 않는 환경은 계속 즉답을 요구하는 곳이에요. 메신저가 끊임없이 울리고, 끝난 뒤에도 수정이 계속 붙는 하루는 완벽주의를 더 세게 자극해요. 그런 환경에서는 쉬는 감각이 더 빨리 닳아요.",
   "behavior_guides": [
    {
     "title": "끝난 뒤 멈춤",
     "body": "일이 끝나면 바로 다시 열지 말고, 15분만 화면을 닫아 두세요. 그 시간에는 메신저 확인도 하지 말고 물 한 잔만 천천히 마셔요. 매일 같은 마감 뒤에 이 루틴을 붙이면 점검과 휴식의 경계가 조금씩 생겨요."
    },
    {
     "title": "알림 분리",
     "body": "월요일 아침 첫 30분은 메신저를 보지 않는 시간으로 정해 두세요. 바로 확인해야 하는 일과 나중에 볼 일을 미리 나눠 두면 긴장이 덜 올라와요. 알림을 늦게 보는 연습이 아니라, 확인 순서를 바꾸는 연습이에요."
    },
    {
     "title": "작은 복원",
     "body": "쉬는 날에는 큰 휴식보다 20분짜리 복원을 두세 번 넣어 보세요. 산책, 샤워, 창밖 보기처럼 몸이 바로 반응하는 행동이 좋아요. 길게 쉬려다 불편해지는 대신, 짧게 풀어 주는 쪽이 지수님에게 더 맞아요."
    },
    {
     "title": "점검 줄이기",
     "body": "일을 끝낸 뒤 다시 훑는 횟수를 한 번만 줄여 보세요. 예를 들어 제출 후 재확인은 한 번만 하고, 그다음에는 다른 작업으로 넘어가요. 줄어든 한 번이 쌓이면, 소진 속도도 같이 느려져요."
    }
   ],
   "mindset_guide": "지수님은 엔진을 잘 돌리는 사람이지, 멈춤이 약한 사람이 아니에요. 지금은 속도를 더 올릴 때가 아니라 브레이크와 복원이 같이 작동하도록 손보는 때예요. 번아웃은 불이 꺼진 상태가 아니라, 계속 켠 채로 달린 뒤에 찾아오는 열기예요. 그래서 필요한 건 더 센 의지가 아니라, 열을 식힐 구조예요.",
   "closing_title": "다음 장은 더 조용하게 열려요",
   "closing_body": "36세부터 45세까지는 수 기운이 강해져요. 그 전까지 지수님을 끌고 오던 토의 무게가 조금 가벼워지고, 끝난 뒤에도 계속 점검하던 감각이 훨씬 부드러워져요. 번아웃 모듈에서 이 변화는 분명해요. 무겁던 느낌이 가벼워지고, 쉬는 시간이 몸에 먼저 들어와요."
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
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "jordan": {
  "year": 2027,
  "title": "2027: A Clearer Current",
  "subtitle": "A year for steady momentum, careful pacing, and well-placed effort",
  "overview": "2027 carries a fire-like charge, and your core nature is water, so the year tends to feel like a force you can work with rather than simply endure. Because your Five Elements are balanced more toward earth and metal, with less wood and water, the year may highlight practical results, clear choices, and the need to keep your energy directed instead of scattered. Jordan, this makes 2027 a useful year for shaping outcomes, especially when you keep your aims specific and your pace honest.\n\nThe overall tone is active but not frantic. The first half of the year leans toward familiar ground, then the middle months ask for more output, more responsibility, and more discernment, before the late-year stretch brings support, learning, and a few useful pivots. Your chart type suggests a life that prefers order and clean structure, so you may feel best when plans are simple, roles are clear, and you leave room for quiet adjustment instead of forcing every door open at once.",
  "chapters": {
   "wealth": {
    "heading": "Wealth: aim for clean wins",
    "body": "In 2027, money and material results can respond well to direct effort, because the year’s fire energy tends to favor action, visibility, and momentum. Since your chart already leans toward earth and metal, you may do especially well when you work with practical systems rather than chasing too many options at once. The main lesson is not scarcity; it’s precision. When the year asks for more, it also asks you to notice what is truly worth the extra push.\n\nIn daily life, this may look like periods when a project, side income, or work-based reward feels closer once you define it clearly. You might notice that vague plans drain you, while a focused offer, a concrete deliverable, or a tidy budget gives you a stronger sense of control. The months around early summer especially can bring a stronger urge to steer outcomes, so it helps to keep your expectations grounded and your timing deliberate.\n\nA good starting move is to choose one financial priority for 2027 and give it a simple structure: one target, one review point, one small habit. If something looks promising, give it one more check before you commit energy, and if something feels noisy, let it stay on the page until it becomes clearer."
   },
   "love": {
    "heading": "Love: warmth with room to breathe",
    "body": "Relationship-wise, 2027 can feel warmer and more expressive than usual, but not always in a soft, effortless way. Fire can bring visibility, attraction, and clearer signals, while your water nature prefers emotional honesty and room to move at your own pace. That mix can be good for connection, as long as you do not try to force closeness faster than trust can grow.\n\nIn everyday moments, this may show up as more direct conversations, stronger reactions, or a clearer sense of who feels easy to be around and who does not. Some months are likely to feel familiar and comfortable, while others may bring tension around timing, tone, or mixed signals. The key is to stay curious without rushing to conclusions, especially when feelings are bright but not yet fully shaped.\n\nTry starting with smaller, more honest exchanges: one clear message, one thoughtful question, one gentle boundary. If a connection matters, let it show itself through repeated steadiness rather than dramatic gestures, and give yourself permission to keep a little space while you learn what is real."
   },
   "career": {
    "heading": "Career: lead, but keep the edges neat",
    "body": "Career matters in 2027 can move forward well because the year supports initiative, ownership, and visible results. Your chart’s order-seeking quality suggests you may thrive when expectations are defined and the path is organized, not improvised. This is a year that can reward you for stepping forward, especially when you combine confidence with restraint.\n\nYou may notice that the middle of the year brings more chances to direct a project, take responsibility, or shape the outcome of something already in motion. At the same time, the year’s stronger fire can tempt you to say yes too quickly or to overextend in the name of progress. The best results are likely to come from choosing a lane and staying with it long enough for your effort to compound.\n\nA useful habit is to separate what is urgent from what is important before you answer requests. If you are offered more than you can comfortably hold, it may help to negotiate scope, timing, or roles instead of simply pushing harder. That kind of clarity can make your work feel more sustainable and more impressive at the same time."
   },
   "study": {
    "heading": "Study: learn by refining",
    "body": "Learning in 2027 may work best when it is practical, structured, and tied to something you can actually use. Your Five Elements lean toward metal and earth, which often supports careful thinking, systems, and methodical improvement. Fire adds speed and visibility, so this can be a year when you learn quickly—but only if you keep your notes, goals, and review process tidy.\n\nIn real life, that could mean you absorb information best when it connects to a project, a tool, or a specific question. You may find it easier to study in bursts, then pause to organize what you learned before moving on. Some late-year months may feel especially receptive, with help, guidance, or useful feedback arriving at the right time.\n\nStart small by choosing one topic and giving it a clear container: a reading list, a weekly review, or a simple summary page. If your mind feels busy, do not force more input; instead, let the structure do the work for you."
   },
   "health": {
    "heading": "Body and mind: protect your rhythm",
    "body": "For body and mind, 2027 is less about dramatic change and more about rhythm. Fire years can make the pace feel faster, while your water nature tends to do best when there is enough quiet space to recover and reset. Because your chart type leans toward order, you may feel better when your days are predictable enough to settle into, even if your tasks are active.\n\nYou might notice that your energy is strongest when you alternate focus and pause, rather than trying to stay “on” all day. Busy stretches can feel manageable if you keep your sleep, meals, and downtime reasonably consistent, and if you allow yourself a few low-stimulation moments to clear your head. The months that ask for more output may also ask for more intentional recovery.\n\nA simple practice is to give your day a beginning, a middle, and an end: one starting ritual, one short reset, and one clear stopping point. That kind of structure can help you stay steady without feeling boxed in, and it may make the whole year feel more workable."
   }
  },
  "months": [
   {
    "headline": "Easy start, quiet signs",
    "body": "February may feel familiar and comfortable, with little pressure to reinvent anything. Even so, small surprises can pop up, so it helps to stay flexible rather than assuming the month will be completely routine."
   },
   {
    "headline": "Soft momentum, slight friction",
    "body": "March can bring a gentle sense of beginning, like something is waking up at the edge of your attention. A little friction may appear in conversations or schedules, so a calm tone can save you time."
   },
   {
    "headline": "Output begins to rise",
    "body": "April may ask for more expression, more production, and more giving from you. Energy can go out quickly here, so it helps to choose what deserves your best effort instead of scattering it everywhere."
   },
   {
    "headline": "Fresh ground opens",
    "body": "May can feel like new soil: not fully settled, but full of possibility. You may do well by testing ideas lightly first, because this month rewards exploration more than overcommitment."
   },
   {
    "headline": "Steering becomes easier",
    "body": "June may give you a stronger hand on the wheel, especially around money, results, or decisions. This is a good month to press forward, as long as you keep your appetite for more from outrunning your actual capacity."
   },
   {
    "headline": "Hold the line",
    "body": "July can feel like a quiet storage room rather than a flashy stage, which makes it a good time to consolidate. A waiting mood may be in the air, so patience and timing can matter more than speed."
   },
   {
    "headline": "A close call, handled well",
    "body": "August may bring responsibility along with a need to slow down and sort things properly. Because the month links tightly with your personal rhythm, misreading signals is possible, so double-checking details can pay off."
   },
   {
    "headline": "Firm steps, clear commands",
    "body": "September can feel more demanding, but also more structured. If you keep your pace steady, you may find that pressure turns into competence rather than strain."
   },
   {
    "headline": "Support comes in",
    "body": "October may feel like a gentle easing after the heavier stretch. Help, learning, or recovery energy can arrive here, making it easier to regroup and move with more confidence."
   },
   {
    "headline": "Movement changes shape",
    "body": "November may bring useful support, but also a strong sense that things are shifting. A change in direction or environment can be productive, especially if you stay open to movement rather than clinging to the first plan."
   },
   {
    "headline": "Strong finish, small bumps",
    "body": "December can feel lively and full of effort, with a sense that you are pushing toward the top of your capacity. Small hiccups may appear, so a little extra patience can keep the month from feeling too jagged."
   },
   {
    "headline": "Quiet inner reset",
    "body": "January may feel inward and reflective, with momentum still present but turned toward your private world. This is a good time to sort your thoughts, gather yourself, and prepare for what comes next without forcing a dramatic finish."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: notice the warm-up",
    "body": "Watch for the shift from familiar ease into rising output. A useful action is to define one project or goal early, then give it a simple weekly check so you can tell what is gaining traction."
   },
   {
    "title": "May to July: direct your energy",
    "body": "Expect stronger chances to steer outcomes, along with the risk of overdoing it. Choose one priority to push forward, and protect it by setting a clear limit on how many extra commitments you accept."
   },
   {
    "title": "August to October: refine and recover",
    "body": "This stretch may mix pressure with support, which means you can grow through careful pacing. Build in one review habit, such as rereading key messages or summarizing what you learned before making your next move."
   },
   {
    "title": "November to January: move with the change",
    "body": "Watch for helpful support paired with a sense of transition. Keep one flexible plan ready, and use it to adjust quickly when a new opening appears instead of trying to hold everything exactly as it is."
   }
  ],
  "closing": "From age 31 to 40, a stronger fire phase begins, and that marks a real shift into a more active chapter of your life. For 2027, that means the year can feel like a useful rehearsal for stronger momentum: not a time to force everything, but a time to learn how to direct your energy cleanly and with less waste. Stay steady, stay specific, and let the year show you where your effort lands best."
 },
 "sam": {
  "year": 2027,
  "title": "2027, A Steady Fire",
  "subtitle": "A year of support, momentum, and careful momentum",
  "overview": "2027 feels like a year that brings warmth into your system, Sam, and that matters because your core is Earth: steady, practical, and shaped by what you can hold, build, and organize. Fire tends to nourish Earth, so the overall tone leans toward being supported, taught, and gently restored. With your Mountain · Order pattern and a balanced spread across the Five Elements, this is less about dramatic reinvention and more about receiving the right kind of fuel so your structure can breathe.\n\nThe year also has a useful rhythm to it. The first half asks for initiative and a bit of boldness, then the middle softens into recovery and stability, and the later months ask you to give back through expression, output, and visible contribution. Because the year carries some wildcard energy, timing and pacing matter more than force. If you let each phase do its own job, 2027 can feel surprisingly coherent.\n\nThere’s also a quiet theme of transition in the background. Your next 10-year cycle, from age 40 to 49, is an Earth-strong period, and that means the longer arc is already moving toward greater grounding and consolidation. For 2027 specifically, the invitation is simpler: take in what supports you, use your judgment well, and don’t rush past the moments that ask for a pause.",
  "chapters": {
   "wealth": {
    "heading": "Money that likes a plan",
    "body": "In 2027, money matters look best when you treat them as something to manage, direct, and shape rather than chase. Because the year’s energy can help you take the lead, this is a good time for clear decisions, firm boundaries, and practical follow-through. The risk is not lack; it’s overreaching, so the winning move is to stay focused on what is already within reach.\n\nIn daily life, that may show up as wanting to organize accounts, compare options more carefully, or feel more decisive about what deserves your attention. You might notice that simple systems work better than big promises, especially in the spring and early winter. If you feel a strong urge to push harder, that’s a useful signal to check whether the goal is truly clear.\n\nStart small: set one money-related rule that makes your life easier, like a review day, a spending cap for impulse choices, or a checklist before commitments. Sam, this is a year to prefer clean structure over emotional urgency. The more calmly you direct resources, the more useful the year’s momentum becomes."
   },
   "love": {
    "heading": "Warmth with room to breathe",
    "body": "Your relationship life in 2027 leans toward comfort, steadiness, and a more generous kind of connection. Because the year supports you rather than challenges you directly, it can be easier to receive care, offer care, and notice who feels naturally good to be around. The strongest connections may be the ones that respect your pace and your need for order.\n\nYou may notice phases where conversation flows easily, followed by moments when people seem to expect a quick response or a clearer stance from you. Around the middle of the year, small misunderstandings or sudden turns could ask for extra patience, not because the bond is weak, but because timing and expectations are shifting. If you keep things simple and direct, you’re more likely to preserve ease.\n\nA good starting point is to make one relationship more intentional: a message you’ve been meaning to send, a plan that is actually realistic, or a small gesture that says, “I’m here.” In 2027, connection deepens more through steadiness than through intensity. Let warmth arrive in manageable doses, and it will land better."
   },
   "career": {
    "heading": "Work that wants structure",
    "body": "Career-wise, 2027 favors clear ownership, visible results, and practical leadership. The early months are especially good for pushing forward, because the year’s energy can help you claim space and move projects along. Later, the pace shifts: the work may ask for more output, more communication, and more visible contribution, which can be rewarding but also draining if you try to do everything at once.\n\nIn real life, this could look like being asked to take the lead, refine a plan, or become the person who keeps things organized when others are moving fast. Some months may feel like you’re carrying responsibility while also having to stay flexible, especially when unexpected turns or mixed signals appear. Since your pattern is Mountain · Order, your strength is not just effort; it’s the ability to make things legible and usable.\n\nA practical first step is to choose one project or role where your structure makes a difference and define what “done” actually means. Then protect your energy by pacing the parts that require public visibility. In 2027, your career grows best when you pair ambition with restraint."
   },
   "study": {
    "heading": "Learning that settles in",
    "body": "Learning in 2027 has a restorative quality. Because the year’s fire supports your Earth core, study is less about forcing yourself to absorb everything and more about letting useful knowledge sink in. Your balanced Five Elements suggest you already have a broad base; this year is about deepening, organizing, and making what you know easier to use.\n\nYou may find that you learn best when a topic has a clear purpose, a practical framework, or a sense of order. The spring can bring drive and ambition, while the middle of the year may feel more inward, making it easier to reflect, review, and integrate. There may also be moments when you feel magnetized by a topic or teacher simply because it matches your current needs.\n\nTry one simple study habit: a short weekly review, a tidy note system, or a single recurring time block that helps information settle instead of scattering. If you are Sam, this is a good year to trust repetition more than intensity. What you revisit carefully may become more valuable than what you rush to finish."
   },
   "health": {
    "heading": "Rhythm over rush",
    "body": "For body and mind, 2027 points toward rhythm, recovery, and pacing. The year’s warmth can be supportive, but it can also tempt you to overextend when you feel capable, especially during the months that ask for more output. Since your chart already carries a strong sense of order, your best support comes from protecting a steady cadence rather than reacting to every burst of energy.\n\nYou might notice that your days go better when meals, sleep, movement, and downtime follow a repeatable pattern. The middle of the year may feel a bit more sensitive to interruptions or changes in routine, while late summer and early autumn can feel calmer and more settled. Small frictions are easier to handle when you’ve already built in pauses.\n\nA good place to begin is with one anchor habit that makes the rest of the day easier, such as a morning reset, a short walk, or a screen-free window before bed. In 2027, consistency is kinder to you than intensity. Let the year support you by keeping your tempo human."
   }
  },
  "months": [
   {
    "headline": "Bold start, clean aim",
    "body": "February brings a strong push for initiative, so it’s a good time to claim space and move something forward. The energy is fresh and active, but it works best when you avoid turning eagerness into overreach."
   },
   {
    "headline": "Momentum with checks",
    "body": "March keeps the same forward motion, but it asks for a little more discernment. Small hiccups are possible, so a quick review before you commit can save time later."
   },
   {
    "headline": "Pressure with depth",
    "body": "April can feel more demanding, yet it also helps you get stronger if you choose your pace well. The inward tone may make you more reflective, which is useful when responsibilities start to stack up."
   },
   {
    "headline": "Careful turning point",
    "body": "May brings a peak-effort feeling with a few unexpected turns mixed in. If you stay flexible and avoid locking yourself too tightly into one plan, you’re more likely to keep your footing."
   },
   {
    "headline": "Support arrives",
    "body": "June feels more nourishing, with help, learning, and recovery coming in more naturally. The clash-like tension in the background suggests a turning point, so changes may ask to be handled with a little extra awareness."
   },
   {
    "headline": "A useful wildcard",
    "body": "July keeps the supportive tone, but it comes with a less predictable edge. That makes it a good month for openness, especially if something helpful appears in an unexpected way."
   },
   {
    "headline": "Ease and fresh ground",
    "body": "August feels familiar and comfortable, with less pressure to prove anything. Fresh ground shows up, so even a routine month can give you a clean starting point for a new pattern."
   },
   {
    "headline": "Quiet attraction",
    "body": "September has a tidy, settled quality that can make things feel easier to arrange. There’s also a magnetic pull in the air, which may draw useful people, ideas, or opportunities toward you without much force."
   },
   {
    "headline": "Give what you can",
    "body": "October asks for expression, output, and generosity, and that can make the month feel full. The waiting-time note suggests that patience helps, especially if something needs time to mature before it becomes clear."
   },
   {
    "headline": "Speak carefully",
    "body": "November keeps the same outward energy, but it’s easier to misread situations or react too quickly. This is a month for checking assumptions twice and letting your message stay simple."
   },
   {
    "headline": "Clear command",
    "body": "December brings a more decisive tone, with a strong sense that you can direct resources and outcomes well. It’s a promising time to take initiative, as long as you keep the pace measured instead of forcing the finish."
   },
   {
    "headline": "New roots forming",
    "body": "January feels like a quiet incubation period, where things are taking shape beneath the surface. With a supportive alignment in the background, this is a good month to let plans settle and prepare the next step without rushing it."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: build the frame",
    "body": "Watch for the rise of initiative, ambition, and the urge to move quickly. Choose one practical structure to support that energy, such as a weekly planning slot, a clear budget rule, or a simple project outline you can actually keep."
   },
   {
    "title": "May to July: stay flexible",
    "body": "Notice where pressure, sudden turns, and support appear together. Keep one backup option ready, and practice making smaller adjustments instead of forcing a single path to work."
   },
   {
    "title": "August to October: refine and share",
    "body": "Pay attention to the calmer pace, the magnetic pull of useful connections, and the increase in output. Put one idea, skill, or piece of work into a cleaner form so it can be seen and used more easily."
   },
   {
    "title": "November to January: close and prepare",
    "body": "Watch for mixed signals, stronger command, and a quieter period of formation. Review what is worth continuing, then choose one concrete preparation that makes the next cycle easier to begin."
   }
  ],
  "closing": "At age 40 to 49, your next 10-year cycle is Earth-strong, and that is a clear turning of the page: a period of greater grounding, consolidation, and practical strength is already ahead. In 2027, the task is gentler and more immediate—receive what supports you, move with timing, and let your natural order do some of the work. Sam, if you trust the year’s rhythm instead of forcing one, it can meet you with more help than resistance."
 },
 "mia": {
  "year": 2027,
  "title": "2027: Steady fire, steady form",
  "subtitle": "A year of pressure that can refine your pace",
  "overview": "2027 feels like a year that asks you to become more precise with your energy, Mia. Your Day Master is Metal, which means you often do well with structure, clarity, and clean decisions; in 2027, the Fire tone adds heat, responsibility, and a stronger sense of being seen. That can feel demanding, but it also supports a kind of polishing process: less rushing, more shaping.\n\nYour Five Elements balance leans strongly toward Wood, with Metal as a solid second and Fire, Earth, and Water more evenly present in smaller amounts. That mix suggests that growth, output, and practical effort may all be close to the surface in 2027, while your best results may come from choosing where to spend yourself instead of trying to respond to everything at once. Because your type is Steel · Harvest, the year can work best when you treat effort like a careful harvest: gather what matters, sort what doesn't, and keep only what can truly be used.\n\nThe overall tone is not about forcing speed. It is more about learning how to carry pressure without losing shape. If you let the year be a training ground rather than a test, you may find that even the busy months leave you stronger, clearer, and more ready for the next phase that follows.",
  "chapters": {
   "wealth": {
    "heading": "Money wants direction, not noise",
    "body": "In 2027, money-related matters may respond well to active handling, because the year supports taking the lead and turning effort into results. With your strong Wood influence, ideas and opportunities may keep arriving, but Metal does better when those ideas are sorted, priced, and given a clear boundary. The useful question is less “Can I do more?” and more “What is worth the energy it takes to do well?”\n\nYou may notice moments when extra tasks, side projects, or generous offers appear at the same time. That can be productive, but it can also make spending, giving, or committing feel too easy in the moment. A simple budget check, a list of priorities, or a pause before saying yes can make the whole year feel more manageable.\n\nStart small: separate what brings steady value from what only creates motion. If you treat money as something to organize rather than chase, 2027 can feel much cleaner."
   },
   "love": {
    "heading": "Warmth with room to breathe",
    "body": "Relationship energy in 2027 looks lively, expressive, and a little more visible than usual. You may naturally give more, speak more, or show care in practical ways, and that can make you feel generous and open. At the same time, because the year carries pressure, closeness may work best when it doesn’t become another job.\n\nIn daily life, this could look like more invitations, more conversations that move quickly, or a stronger need to name what you want instead of hoping others will guess. There may also be a few moments when a small misunderstanding comes from timing rather than meaning. If that happens, slowing the exchange down can help more than trying to win the point.\n\nTry choosing one relationship habit that keeps things soft: a thoughtful check-in, a clear boundary, or a calmer reply when you feel pulled in several directions. That’s often enough to keep warmth without turning it into strain."
   },
   "career": {
    "heading": "Lead with shape, not force",
    "body": "Career matters in 2027 may feel more demanding, but also more capable of real progress if you keep your pace deliberate. The Fire tone can bring visibility, accountability, and a sense that your work is being noticed, while your Metal nature may prefer crisp standards and measurable results. This combination often rewards people who can hold steady under pressure without becoming rigid.\n\nYou may encounter situations where you’re asked to decide faster, explain your choices more clearly, or carry a bit more responsibility than usual. That doesn’t have to become overwhelming if you break large tasks into smaller steps and keep your priorities visible. In a year like this, doing fewer things with more consistency can be stronger than trying to impress through volume.\n\nA useful move is to define what “good enough” looks like before the week gets busy. When your standards are clear, your effort becomes easier to direct, and your work can feel more grounded."
   },
   "study": {
    "heading": "Learning through use",
    "body": "2027 supports learning that is practical, applied, and tied to real output. Because your chart leans toward growth and production, study may feel best when it leads to something you can use, teach, build, or improve. Pure theory can still be interesting, but this year may reward learning that quickly becomes visible in daily life.\n\nYou might find that you retain things better when you write them down, explain them to someone else, or connect them to a project. There may also be periods when your attention scatters because too many ideas arrive at once. In those moments, a simple outline or a short review routine can keep your mind from feeling overfull.\n\nStart with one topic that supports the next step you care about most. When learning has a purpose, your energy is less likely to leak away."
   },
   "health": {
    "heading": "Protect your rhythm",
    "body": "For body and mind care, 2027 asks for pacing. The year’s pressure can make you feel productive, but it can also tempt you to keep going after your focus has already thinned out. Since your balance includes enough Wood to keep things moving, the key is not to stop; it’s to avoid letting momentum become overextension.\n\nIn everyday life, that may show up as crowded schedules, fast transitions, or the sense that you are always one step behind your own to-do list. You’ll likely do better with regular meals, simple routines, and short breaks that let your mind reset before it gets noisy. Quiet, repeatable habits are more useful here than dramatic changes.\n\nChoose one rhythm you can protect most days, such as a steady sleep window, a walk after work, or a device-free pause. Small consistency will probably feel more supportive than pushing for intensity."
   }
  },
  "months": [
   {
    "headline": "A moving start",
    "body": "February may bring a fresh push to express, produce, and give, and that can feel energizing even if it also asks a lot from you. Because the month carries a turning-point quality, a change in plan or role may open space for a new direction."
   },
   {
    "headline": "Small snags, useful clues",
    "body": "March may feel active but slightly uneven, with a few minor delays or mixed signals along the way. If you keep your expectations flexible, those small hiccups can show you where your process needs a little more care."
   },
   {
    "headline": "Quiet leverage",
    "body": "April looks good for taking the lead, handling resources, and pushing a goal forward with discipline. The inward tone of the month suggests that the strongest moves may come from private planning rather than public display."
   },
   {
    "headline": "A strong fit",
    "body": "May may bring a natural alignment between your effort and the month’s energy, making cooperation and momentum feel easier to find. Because the month includes an unexpected-turn quality, staying open to a surprising opening could be more useful than sticking too tightly to the first plan."
   },
   {
    "headline": "Pressure with shape",
    "body": "June may feel more demanding, but also more capable of making you solid if you keep your pace realistic. This is a month for steady responsibility, not for proving how much you can carry at once."
   },
   {
    "headline": "Heat in motion",
    "body": "July can bring strong momentum, along with a more unpredictable edge than the previous month. If you keep one eye on timing and one eye on your limits, the month may feel intense in a productive way rather than a draining one."
   },
   {
    "headline": "Support arrives",
    "body": "August looks like a month where help, learning, or recovery can naturally come toward you. It may be easier to accept guidance, rest, or a fresh perspective, especially if you’ve been pushing hard earlier in the summer."
   },
   {
    "headline": "A magnetic pull",
    "body": "September may feel fuller, smoother, and more socially or emotionally attractive than the month before. With energy gathering well, it can be a good time to deepen what already has promise instead of starting everything from scratch."
   },
   {
    "headline": "Comfortable ground",
    "body": "October may feel familiar and easy to settle into, though not especially charged with new stimulation. That makes it a good month for reliable routines, quiet follow-through, and noticing what already works."
   },
   {
    "headline": "Read carefully",
    "body": "November may bring a slower, more reflective tone, along with a few moments that are easy to misread. A little extra checking in with others, and with yourself, can keep small assumptions from becoming bigger than they need to be."
   },
   {
    "headline": "Clear command",
    "body": "December may return you to a more expressive, productive rhythm, with a stronger sense of direction around what you want to accomplish. It can be a good time to tidy loose ends and make sure your efforts are pointed where they matter most."
   },
   {
    "headline": "Quiet advance",
    "body": "January of the following year may feel like a more inward version of the same productive current, with energy stored rather than scattered. If you keep your focus clean, the month can support a calm sense of progress without needing to announce itself loudly."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: sort and choose",
    "body": "Watch for a strong rise in output, opportunities, and quick decisions. Try choosing one priority list and one boundary list so you can decide faster without spreading yourself thin."
   },
   {
    "title": "May to July: steady the pace",
    "body": "Watch for moments when responsibility, visibility, and unexpected turns arrive together. Make a habit of pausing before saying yes, so your effort stays deliberate instead of reactive."
   },
   {
    "title": "August to October: receive and refine",
    "body": "Watch for support, smoother connections, and a more settled rhythm. Use that window to ask for help, review your systems, and strengthen whatever is already working."
   },
   {
    "title": "November to January: close cleanly",
    "body": "Watch for slower timing, possible misunderstandings, and a quieter finish to the year. Keep one simple review ritual each week so you can end 2027 with less clutter and more clarity."
   }
  ],
  "closing": "From age 33 to 42, a stronger Water phase is already set to begin, and that marks a real shift into a different kind of flow. In 2027, though, the main lesson is still about being refined by pressure without losing your shape. If you let the year move at a chosen pace, Mia, it can leave you more focused, more grounded, and more able to recognize what truly deserves your strength."
 },
 "casey": {
  "year": 2027,
  "title": "2027, forja y ritmo",
  "subtitle": "Un año para afinar tu fuerza sin perder el pulso",
  "overview": "En 2027, Casey, tu mapa se mueve entre empuje y disciplina. Tu centro de metal encuentra un año de fuego, y eso suele sentirse como presión útil: más exigencia, más responsabilidad y más necesidad de elegir bien el ritmo. Como tu distribución está muy equilibrada entre madera y metal, con agua en 0%, el año te invita a producir, ordenar y decidir con más intención, sin ir siempre al máximo.\n\nTambién hay un matiz importante: tu tipo de mapa, el acero y la cosecha, habla de una fuerza que gana valor cuando se pule y se recoge con paciencia. En 2027, eso se nota en una mezcla de impulso y ajuste. Habrá tramos para avanzar, tramos para consolidar y tramos para escuchar mejor lo que te conviene sostener. Si bajas un poco la velocidad en los momentos densos, el año puede sentirse mucho más llevadero y útil.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso",
    "body": "En 2027, el dinero se mueve mejor cuando tú tomas la iniciativa con criterio. Hay una mezcla de impulso y control: puedes abrir espacio para generar más, pero conviene evitar la sensación de que todo tiene que resolverse de inmediato. Tu mapa sugiere que sabes producir, y este año esa capacidad puede traducirse en resultados visibles si no te dispersas.\n\nEn la práctica, esto puede verse en semanas con más encargos, más decisiones sobre recursos o más ganas de convertir ideas en algo útil. También puede aparecer la tentación de gastar energía en demasiadas direcciones a la vez. Si te encuentras revisando cifras, comparando opciones o pensando cómo hacer rendir mejor lo que ya tienes, ahí está la clave del año.\n\nEmpieza por una regla simple: prioriza una meta económica concreta por tramo del año. Revisa lo que entra y sale con calma, y deja margen para ajustar sin apuro. En un año de fuego, tu metal se fortalece más cuando eliges con precisión que cuando intentas abarcarlo todo."
   },
   "love": {
    "heading": "Vínculos en ajuste",
    "body": "En tus relaciones, 2027 puede traer más intensidad, más conversaciones directas y más necesidad de claridad. Tu centro de metal suele valorar la coherencia, y el fuego de este año puede empujarte a decir lo que piensas con más rapidez. Eso ayuda a limpiar ambigüedades, siempre que cuides el tono y no conviertas la urgencia en dureza.\n\nPodrías notar que ciertas personas te piden presencia, decisión o definiciones más claras. También puede ser un año en el que te atraigan vínculos con más iniciativa, más calor humano o más movimiento. Si aparece fricción, no hace falta leerla como problema: a veces solo muestra dónde necesitas ajustar expectativas o hablar con más precisión.\n\nTe conviene escuchar antes de responder, sobre todo cuando sientas que algo te toca de cerca. Un gesto pequeño, una frase bien elegida o una pausa a tiempo pueden cambiar mucho el ambiente. En 2027, los vínculos se benefician más de la honestidad serena que de la reacción rápida."
   },
   "career": {
    "heading": "Trabajo con presión útil",
    "body": "En lo laboral, 2027 te pide firmeza y criterio. El año no se siente liviano, pero sí fértil para quien sabe sostener responsabilidades sin perder el eje. Con tu mezcla de madera y metal tan fuerte, es fácil que tengas ideas y voluntad; la clave será ordenar esa energía para que no se disperse en demasiadas prioridades.\n\nEn el día a día, esto puede verse como más tareas que coordinar, más exigencia de precisión o más necesidad de responder con claridad. También puede aparecer el deseo de tomar el control de un proceso, liderar una parte del trabajo o dejar algo mejor estructurado de lo que lo encontraste. Si notas que todo te exige más, no siempre significa freno: a veces es el modo en que el año te afina.\n\nTe ayudará dividir los objetivos en pasos pequeños y medibles. Haz una revisión breve al cierre de cada tramo y decide qué sí merece tu atención completa. Cuando eliges bien dónde poner tu energía, 2027 puede dejarte una sensación muy sólida de avance real."
   },
   "study": {
    "heading": "Aprender con método",
    "body": "El aprendizaje en 2027 gana mucho cuando lo conviertes en práctica constante. Tu mapa tiene bastante impulso para crear y avanzar, pero casi nada de agua, así que te conviene estudiar de forma concreta, con ejemplos, repaso y aplicación. No se trata solo de entender: se trata de integrar.\n\nPuedes notar que en algunos momentos aprendes muy rápido y en otros necesitas repetir o aterrizar mejor lo que recibes. Eso no es un retroceso; es tu manera de consolidar. Si estás leyendo, tomando cursos o desarrollando una habilidad, te resultará más fácil cuando ordenes el contenido en bloques pequeños y lo conectes con algo útil de inmediato.\n\nEmpieza por una rutina corta y regular en lugar de sesiones largas y esporádicas. Resume lo aprendido con tus propias palabras, practica una vez más de lo que crees necesario y deja espacio para revisar sin prisa. En 2027, la claridad se construye mejor por acumulación que por golpe de inspiración."
   },
   "health": {
    "heading": "Ritmo y cuidado",
    "body": "En cuerpo y mente, 2027 te pide escuchar el ritmo antes que forzarlo. Un año de fuego sobre tu centro de metal puede sentirse como más activación, más tensión por cumplir y más necesidad de gestionar bien la energía diaria. No hace falta interpretar eso como alarma; basta con reconocer que el descanso, la pausa y el orden te ayudan mucho más de lo habitual.\n\nEn la vida cotidiana, esto puede verse como días muy productivos seguidos de momentos en que necesitas bajar un poco el ritmo para recuperar enfoque. También puede aparecer la sensación de que todo pide respuesta inmediata. Si eso pasa, te conviene volver a lo básico: horarios simples, comidas regulares, movimiento suave y espacio sin sobrecarga.\n\nPrueba a dejar un margen breve entre una tarea y otra, y a cerrar el día con una pequeña revisión mental. No intentes sostener el mismo nivel de intensidad todo el tiempo. En 2027, cuidarte bien no es retirarte del avance: es la forma más inteligente de sostenerlo."
   }
  },
  "months": [
   {
    "headline": "Inicio que empuja",
    "body": "En febrero de 2027, la energía te invita a expresarte más y a mover cosas que estaban quietas. El cierre de ciclo se siente como una puerta que se abre a otra forma de actuar, aunque el cuerpo pida elegir bien el esfuerzo. Si notas cambios de planes o un giro repentino, puede servirte aceptar la transición sin intentar controlarlo todo."
   },
   {
    "headline": "Brotes y tropiezos",
    "body": "En marzo de 2027, algo nuevo puede empezar a tomar forma, pero con pequeños contratiempos que te obligan a ajustar. Es un mes para sembrar con paciencia, no para exigir resultados inmediatos. Si avanzas paso a paso, el movimiento gana solidez."
   },
   {
    "headline": "Mando silencioso",
    "body": "En abril de 2027, te conviene tomar iniciativa con calma y sin exceso. La energía favorece el crecimiento discreto, como si algo importante se estuviera ordenando por dentro antes de mostrarse afuera. Un rato de silencio o de trabajo a solas puede darte una ventaja clara."
   },
   {
    "headline": "Recursos que se unen",
    "body": "En mayo de 2027, las cosas tienden a encajar mejor cuando unes fuerzas o combinas bien lo que ya tienes. Hay una sensación de brote, pero también de cuidado con los recursos: conviene mirar dónde pones tiempo, dinero y atención. Si aparece una oportunidad de colaboración, vale la pena revisarla con detalle."
   },
   {
    "headline": "Tensión útil",
    "body": "En junio de 2027, la presión sube y los roces pequeños pueden aparecer con más facilidad. Eso no impide avanzar, pero sí pide tacto y un ritmo más consciente. Si eliges una respuesta más suave, el mes se vuelve mucho más manejable."
   },
   {
    "headline": "Confianza firme",
    "body": "En julio de 2027, tu confianza puede crecer incluso entre imprevistos. El mes no promete linealidad, pero sí una base interna más estable para responder sin perderte. Cuando algo cambie de golpe, te irá mejor si adaptas el plan antes que si te aferras a la primera versión."
   },
   {
    "headline": "Ayuda que fructifica",
    "body": "En agosto de 2027, la ayuda, el aprendizaje y la recuperación de energía se sienten más cerca. El esfuerzo empieza a dar fruto, y eso puede darte un alivio muy concreto. Es buen momento para recibir apoyo y dejar que alguien o algo te simplifique el camino."
   },
   {
    "headline": "Plenitud cercana",
    "body": "En septiembre de 2027, la energía se siente más llena y más magnética. Puedes notar más facilidad para atraer atención, acuerdos o respuestas favorables. Aprovecha ese impulso para consolidar, no solo para brillar."
   },
   {
    "headline": "Ritmo más lento",
    "body": "En octubre de 2027, el paso se vuelve más pausado y familiar. Puede sentirse cómodo, aunque con menos novedad que otros meses. Si aparece espera, úsala para ordenar lo pendiente en vez de forzar movimiento."
   },
   {
    "headline": "Cuidar el diálogo",
    "body": "En noviembre de 2027, conviene prestar atención a malentendidos pequeños. El mes favorece un trato más amable contigo y con los demás, porque la energía se parece mucho a la tuya y eso puede volver todo más sensible. Repetir una idea con calma puede ahorrarte confusiones."
   },
   {
    "headline": "Liderazgo visible",
    "body": "En diciembre de 2027, tu capacidad de mostrar dirección se vuelve más clara. La pausa para ordenar puede ayudarte a decidir qué merece seguir y qué no. Si asumes una guía concreta, hazlo con sencillez y sin querer abarcar demasiado."
   },
   {
    "headline": "Recogida y eco",
    "body": "En enero de 2028, el movimiento baja hacia adentro y aparece una energía más recogida. El reconocimiento puede llegar de formas discretas, como una señal de que lo sembrado empieza a dejar huella. Es un buen cierre de tramo para mirar lo hecho y preparar el siguiente paso con serenidad."
   }
  ],
  "action_plan": [
   {
    "title": "De 2 a 4 meses",
    "body": "Observa cómo se activa tu impulso para producir, hablar y mover asuntos pendientes. En esta franja, te conviene empezar con una meta clara y una sola prioridad principal, para que la energía no se disperse."
   },
   {
    "title": "De 5 a 7 meses",
    "body": "Vigila dónde aparece presión útil y dónde se cuelan roces o imprevistos. Te ayudará revisar dos veces los acuerdos, bajar un poco la velocidad en los días más tensos y sostener lo importante con pasos cortos."
   },
   {
    "title": "De 8 a 10 meses",
    "body": "Fíjate en qué apoyos, aprendizajes o pausas te devuelven fuerza de verdad. Esta franja pide aprovechar lo que fructifica, ordenar lo que ya funciona y no llenar la agenda por inercia."
   },
   {
    "title": "De 11 a 1 meses",
    "body": "Mira cómo cambian tu tono y tu energía cuando el año se acerca a su cierre. Te conviene cerrar asuntos, dejar más espacio para revisar y preparar el siguiente tramo con una estructura simple y realista."
   }
  ],
  "closing": "De 41 a 50 años, tu ciclo de diez años entra en una etapa en la que el metal gana fuerza y peso dentro de tu mapa. Eso encaja con 2027 como un año de presión útil: te pide más criterio, más orden y más conciencia de dónde pones tu energía.\n\nSi atraviesas el año con paso medido, puede dejarte una sensación muy clara de consolidación. Casey, no necesitas ir rápido para que el avance sea real: en 2027, elegir bien el ritmo puede ser tu forma más sólida de crecer."
 },
 "riley": {
  "year": 2027,
  "title": "2027: A Steady Fire",
  "subtitle": "A year of giving, growing, and learning your pace",
  "overview": "Riley, 2027 feels like a year that asks you to show up more fully than usual. Your core energy is Wood, and Fire is almost absent in your chart, so this Fire year can feel like a strong outlet: ideas, effort, and generosity may flow more easily, but so can fatigue if you keep saying yes too often. Because your nature is rooted and oak-like, the best version of this year is not flashy speed; it is steady expression with clear edges.\n\nThe first half of the year leans toward support, recovery, and momentum from other people or from your own renewed confidence. From late spring into summer, the pace looks more outward: you may feel more visible, more productive, and more responsible for what you create. In late summer and autumn, the tone shifts toward focus, pressure, and refinement, which can be useful if you choose one or two priorities instead of trying to carry everything. Riley, 2027 rewards a calm rhythm: receive help when it appears, build when energy is present, and simplify before you feel crowded.",
  "chapters": {
   "wealth": {
    "heading": "Money likes clear lanes",
    "body": "In 2027, your money story looks tied to action, output, and what you’re willing to make visible. Because Fire is being fed by your Wood nature, there may be more chances to earn through initiative, presentation, teaching, creating, or simply being more active in the world. The key is that the flow can be strong, but it may not like waste; a clear plan tends to feel better than chasing every opportunity.\n\nA likely scene is that a few practical choices seem more attractive than a big dramatic move: taking on a project that matches your strengths, packaging your work more neatly, or noticing where your effort is leaking out through small unnecessary costs. The early summer and late summer months especially can make you feel more motivated to produce, which is useful if you keep one eye on limits. For an oak-like personality, this is a good year to ask, 'What am I building, and what can I leave out?'\n\nStart small by choosing one money habit to make cleaner in 2027. You might review recurring spending, set a simple weekly check-in, or write down the kind of work that pays you back in energy as well as income."
   },
   "love": {
    "heading": "Connection through warmth",
    "body": "Your relationship life in 2027 may feel warmer, more expressive, and easier to approach than in quieter years. Since the year’s energy is something you naturally feed, you may come across as more giving, more visible, and more willing to initiate. That can draw people in, but it also means you’ll want to notice whether your care is being met with equal steadiness.\n\nYou could find yourself in conversations that move quickly from polite to personal, or in moments where someone seems especially receptive to your presence. The spring months look more supportive and magnetic, while late summer may bring a sharper need to define what feels mutual and what feels one-sided. For you, connection works best when warmth doesn’t become overextension.\n\nA gentle place to begin is by checking how you feel after contact: lighter, steadier, or drained. Let that be your guide, and choose one or two relationships in 2027 where you can be openly kind without having to perform."
   },
   "career": {
    "heading": "Work with visible momentum",
    "body": "Career-wise, 2027 looks active and expressive. Your Wood energy can feed Fire, which often shows up as output, leadership, visibility, or the need to turn ideas into something others can see. That can be exciting, especially for someone with a rooted, oak-like style, because it gives your effort a shape and a direction.\n\nIn everyday life, this may look like more requests to present, explain, organize, or carry a project forward. Early in the year, support and encouragement can make it easier to get moving; by midyear, your work may ask for more decisive follow-through. Late summer brings a turning point mood, so it may help to watch for moments when a plan needs a reset rather than more force.\n\nA good first step is to make your work visible in one simple way: a clearer update, a cleaner portfolio, a sharper summary, or a project list with fewer distractions. If you keep your pace honest, 2027 can feel productive without becoming noisy."
   },
   "study": {
    "heading": "Learning that lands",
    "body": "Study and learning in 2027 look especially favorable for practical growth. The year’s energy tends to support expression, so what you learn may stick best when you can explain it, use it, or teach it back to someone else. Because your chart already has a strong Wood base, you may learn quickly when the material feels alive and connected to real life.\n\nA likely scene is that you absorb advice well in the spring, then want to turn it into something concrete by summer. Later in the year, your attention may sharpen around one subject while unrelated information starts to feel noisy. That’s not a problem; it can simply mean your mind is asking for focus instead of breadth.\n\nTry beginning with one learning lane that matters now, not three that compete for attention. Notes, summaries, voice memos, or short practice sessions may work better than long, abstract study blocks in 2027."
   },
   "health": {
    "heading": "Protect your rhythm",
    "body": "For body and mind, 2027 asks for rhythm more than intensity. Because this year’s Fire energy is something you help fuel, it can feel energizing at first and then quietly demanding if you don’t pause between bursts. Your oak-like chart suggests strength through rootedness, so regularity will likely serve you better than heroic effort.\n\nIn daily life, you may notice that social weeks, busy work stretches, or emotionally full periods ask for extra recovery time afterward. The middle of the year especially may feel more outward and active, while the later months can benefit from simpler routines, quieter evenings, and fewer open tabs in your life. Nothing dramatic needs to be assumed here; just notice what helps you feel centered and repeat it.\n\nA useful start is to protect one small anchor: a consistent wake-up window, a walk, a meal rhythm, or a screen-free pause. In 2027, that kind of simple structure can help your energy stay usable instead of scattered."
   }
  },
  "months": [
   {
    "headline": "Fresh ground opens",
    "body": "February 2027 looks like a month where support begins to show up in practical ways. The 'peak effort' tone can make the start feel active, but the deeper message is that you may get a cleaner footing than expected. Let help be help, and don’t rush to prove you already know everything."
   },
   {
    "headline": "Magnetic momentum",
    "body": "March 2027 may bring a fuller, brighter sense of traction. Attention, encouragement, or useful introductions can feel easier to receive, and that can make your own confidence rise. If something good appears, let it stay good without immediately overexplaining it."
   },
   {
    "headline": "Easy familiarity",
    "body": "April 2027 leans into comfort and recognition rather than novelty. You may feel settled into a familiar rhythm, which is useful for maintenance but not especially stimulating. This is a fine month for sorting, tidying, and keeping promises small enough to keep."
   },
   {
    "headline": "Quiet adjustment",
    "body": "May 2027 looks softer and more reflective, with a chance to misread a situation if you move too quickly. The energy feels like it is winding down, so a slower response may save you from unnecessary friction. Ask one more question before you decide what something means."
   },
   {
    "headline": "Steady output",
    "body": "June 2027 brings a stronger push to create, speak, and contribute. The tone favors leadership and visible effort, so this can be a good month to take the wheel on something you already understand. Watch your energy budget, because giving more is easier now than refueling later."
   },
   {
    "headline": "Stored strength",
    "body": "July 2027 feels more inward than June, even while you may still be producing a lot. The quiet-storage quality suggests that what you do now can be useful later, especially if you keep it organized. Advancement is possible here when you build carefully instead of chasing applause."
   },
   {
    "headline": "Turning point month",
    "body": "August 2027 looks like a pivot point, especially because the month can stir movement and change in your direction. Since the flow is more competitive and direct, it helps to stay intentional rather than forceful. If something shifts, treat it as a redesign opportunity, not a test of your worth."
   },
   {
    "headline": "Power with restraint",
    "body": "September 2027 supports initiative, results, and a firmer grip on what you want to shape. Small snags may appear, though, so precision matters more than speed. Choose one target, then keep your hands on that one lane until it becomes clearer."
   },
   {
    "headline": "Pressure sharpens",
    "body": "October 2027 may feel more demanding, but also more defining. The inward tone can make you think deeply about responsibilities, and that can be useful if you avoid turning every task into a burden. A slower pace here can make you sturdier rather than less ambitious."
   },
   {
    "headline": "New form emerging",
    "body": "November 2027 brings a more visible start to something that has been forming quietly. Because the month can link things together unexpectedly, your plans may work best when you leave a little room for surprise. This is a good time to notice what wants to become real, not just what sounds impressive."
   },
   {
    "headline": "Gentle renewal",
    "body": "December 2027 feels like a return of support, learning, or recovery after the more demanding stretch. Friction may show up in small ways, but it doesn’t need to dominate the month. Keep your standards kind and your schedule breathable, and the month can restore more than it drains."
   },
   {
    "headline": "Wildcard opening",
    "body": "January 2028 looks open-ended and a little unpredictable, which can be useful if you stay flexible. Momentum returns, but it may arrive in a less linear way than you expect. Let the month show you what wants to continue, and don’t rush to label the whole story yet."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive and refine",
    "body": "Watch for help that arrives naturally, along with moments when familiar routines feel easy to slip into. Say yes to support, then use the calm to sort what is actually useful from what is just comfortable."
   },
   {
    "title": "May to July: create with limits",
    "body": "Notice where your output increases and where your energy starts to thin out. Pick one project, one message, or one practical goal to carry forward, and give yourself a stopping point before you feel emptied."
   },
   {
    "title": "August to October: steer carefully",
    "body": "Pay attention to changes in direction, pressure, or the urge to push harder than needed. Make one deliberate adjustment instead of several reactive ones, and keep checking whether the pace still serves you."
   },
   {
    "title": "November to January: welcome the reset",
    "body": "Look for the quieter signs of renewal, especially where something new begins to take shape. Let the year close with simpler routines, honest reflection, and one clear intention you can carry into the next stretch."
   }
  ],
  "closing": "From age 46 to 55, your 10-year cycle shifts into a stronger Earth phase, and that marks a real turning of the page after the current stretch. In 2027, though, the invitation is still to work with Fire carefully: create, give, and move, but keep your roots visible so your energy has somewhere to land. Riley, if you treat this year as a season of steady expression rather than constant output, it can feel both productive and surprisingly humane."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, ritmo y enfoque",
  "subtitle": "Un año para avanzar con calma y medir bien cada paso",
  "overview": "En 2027, el ritmo encuentra una mezcla interesante: hay impulso suficiente para mover proyectos, pero también una base que pide orden, medida y buen criterio. Como el Maestro del Día es agua, y los Cinco Elementos muestran mucha tierra y fuego, el año empuja a traducir ideas en resultados sin perder sensibilidad ni claridad.\n\nLa sensación general es de avance con responsabilidad: cuando se elige bien dónde poner energía, el entorno responde. Al mismo tiempo, como el año se relaciona con el día desde un lugar de dominio sobre la energía del fuego, conviene vigilar el exceso de control, la prisa por cerrar asuntos o el deseo de hacer más de lo que conviene en un solo tramo. Si se mantiene un ritmo limpio, en 2027 puede sentirse que cada paso deja una huella útil.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con criterio",
    "body": "En 2027, el dinero y los recursos se mueven mejor cuando se toma la iniciativa con cabeza fría. La relación entre la energía personal y la del año favorece decisiones, cobros, negociación y resultados concretos, pero también puede empujar a querer abarcar demasiado. Como hay poca presencia de metal en los Cinco Elementos, ayuda mucho poner reglas simples, revisar números con calma y no improvisar cuando haya margen para ordenar.\n\nEn la vida diaria, esto puede verse en conversaciones sobre pagos, ajustes de presupuesto o decisiones sobre cómo usar mejor el tiempo y los recursos. Puede aparecer la tentación de decir que sí a más de una cosa por impulso, o de querer resolverlo todo en un solo movimiento. Si se separa lo urgente de lo importante, será más fácil notar dónde sí hay retorno y dónde solo hay ruido.\n\nEmpieza por una revisión breve y honesta de gastos, compromisos y prioridades. Define un límite claro para cada proyecto o gasto y deja un pequeño margen para imprevistos; esa simple disciplina puede dar mucha más tranquilidad que intentar exprimir cada oportunidad."
   },
   "love": {
    "heading": "Vínculos que se afinan",
    "body": "En tus vínculos, 2027 tiende a traer una mezcla de cercanía, exigencia y necesidad de claridad. Hay momentos en los que la comunicación fluye con naturalidad y otros en los que conviene escuchar más despacio, porque el exceso de intensidad puede volver más sensibles las diferencias. Tu agua necesita espacio para entender, y la fuerte presencia de tierra en tu mapa pide vínculos que den forma sin volverse pesados.\n\nEn lo cotidiano, esto puede sentirse en conversaciones donde notas que alguien espera más definición, más presencia o más coherencia entre lo que dices y lo que haces. También puede aparecer el deseo de ordenar prioridades afectivas, decidir con quién vale la pena profundizar y con qué ritmos te sientes en paz. Si te das tiempo para responder en vez de reaccionar, las relaciones se vuelven más claras.\n\nTe conviene mostrar interés de manera sencilla: una pregunta bien hecha, una respuesta a tiempo, un plan pequeño pero cumplido. No necesitas forzar intensidad; en 2027, la confianza crece más con consistencia que con grandes gestos."
   },
   "career": {
    "heading": "Trabajo con dirección",
    "body": "En el trabajo, 2027 favorece avanzar con iniciativa, mostrar resultados y tomar un lugar más visible. Hay una energía que te ayuda a empujar proyectos, coordinar tareas y sostener metas concretas, aunque también puede llevarte a querer resolver demasiado rápido. Tu combinación de agua con tierra y fuego pide estrategia: sentir el momento, pero sin perder estructura.\n\nEn el día a día, esto puede verse en más responsabilidad, en tareas donde otros esperan que marques el rumbo o en espacios donde tu criterio empieza a contar más. Puede haber semanas en las que sientas que todo pide decisión inmediata, y ahí te conviene distinguir entre mover y apresurar. Si eliges bien el orden, el año te permite demostrar capacidad sin agotarte por exceso de presión.\n\nDa prioridad a una sola meta principal por tramo y divídela en pasos pequeños. Revisa avances con frecuencia, no para juzgarte, sino para ajustar el rumbo; esa clase de seguimiento te ayuda a sostener el impulso sin perder claridad."
   },
   "study": {
    "heading": "Aprender con método",
    "body": "En 2027, el aprendizaje se beneficia mucho de la repetición clara, la práctica y el estudio con propósito. Tu mapa muestra una base fuerte de tierra, así que te convienen procesos ordenados, materiales bien elegidos y una rutina que no dependa solo de la inspiración. El agua en tu centro hace que comprendas mejor cuando puedes conectar ideas, no solo memorizar datos.\n\nEn la práctica, esto puede sentirse como una etapa donde te resulta útil volver a lo esencial, tomar notas simples, repasar con calma o profundizar en un tema que ya conoces pero quieres dominar mejor. También puede aparecer la necesidad de aprender algo que te sirva de forma concreta, no solo por curiosidad. Si estudias con estructura, tu mente gana seguridad y el avance se nota más.\n\nPrueba con bloques cortos de concentración y una revisión final al cierre de cada semana. Explicar con tus propias palabras lo que aprendiste puede darte más claridad que acumular mucha información sin orden."
   },
   "health": {
    "heading": "Cuidar tu ritmo",
    "body": "En 2027, tu bienestar se apoya mucho en el ritmo: cuánto haces, cuándo paras y cómo administras tu energía. Como el año trae bastante fuego y tu mapa ya tiene bastante tierra, te favorece no vivir en modo acelerado durante demasiado tiempo. La clave no está en hacer menos por sistema, sino en alternar impulso y pausa de forma inteligente.\n\nEn la vida diaria, esto puede aparecer como días de mucha actividad seguidos de una sensación de saturación si no afinas el descanso. También puede ayudarte mucho mantener horarios simples, comer con regularidad y reservar momentos breves para bajar revoluciones. Cuando tu entorno interior se ordena, tu cuerpo y tu ánimo suelen responder con más estabilidad.\n\nBusca un hábito pequeño que puedas sostener sin esfuerzo extra: caminar unos minutos, respirar antes de cambiar de tarea o cerrar el día con una pausa silenciosa. Si cuidas esos detalles, 2027 se vuelve más amable y más habitable para ti."
   }
  },
  "months": [
   {
    "headline": "Eco conocido",
    "body": "En febrero, todo se siente cercano y familiar, aunque con poca novedad. La sensibilidad puede estar más abierta de lo habitual, así que conviene leer con calma las palabras de los demás y no sacar conclusiones deprisa. Un malentendido pequeño se aclara mejor si preguntas una vez más antes de asumir."
   },
   {
    "headline": "Paso firme",
    "body": "Marzo trae una sensación de arranque tranquilo, como si algo dentro de ti volviera a brotar. La energía de liderazgo se nota en decisiones sencillas y en la manera en que organizas a otros o a ti misma/o. Si eliges una dirección clara, el mes gana mucha solidez."
   },
   {
    "headline": "Brillo útil",
    "body": "Abril empuja a expresar más, producir más y dar más de ti, con un costo de energía que conviene medir. También puede aparecer reconocimiento por algo que vienes haciendo en silencio. Si repartes bien tus fuerzas, el brillo no se te va en un solo golpe."
   },
   {
    "headline": "Semilla en marcha",
    "body": "Mayo se siente como una semilla que empieza a moverse por dentro. Hay ganas de hacer, de probar y de abrir camino, pero todavía en una fase de crecimiento discreto. Si no te obligas a acelerar, la idea que nace puede echar raíces más sanas."
   },
   {
    "headline": "Resultados al frente",
    "body": "Junio favorece tomar la iniciativa y buscar resultados concretos. La energía del mes ayuda a dirigir, negociar y poner foco en lo que sí produce avance. Solo conviene no apretar demasiado: cuando eliges bien el objetivo, el esfuerzo rinde más."
   },
   {
    "headline": "Retiro útil",
    "body": "Julio invita a mirar hacia dentro y a bajar un poco el ruido externo. Puede ser un mes muy bueno para revisar lo hecho, ajustar prioridades y actuar con más reserva. Si guardas energía para lo importante, llegas mejor preparado/a al siguiente tramo."
   },
   {
    "headline": "Orden bajo presión",
    "body": "Agosto pide atención a recursos, tiempos y límites. Hay más presión, pero también la oportunidad de volverte más preciso/a si no corres sin mirar. Una agenda simple y realista te ayuda a sostener el mes con menos desgaste."
   },
   {
    "headline": "Cambio de rumbo",
    "body": "Septiembre puede traer roces o diferencias que te obligan a cambiar de postura o de estrategia. La tensión no tiene por qué ser mala: a veces solo muestra que algo necesita otra forma. Si escuchas antes de responder, conviertes el choque en giro útil."
   },
   {
    "headline": "Apoyo cercano",
    "body": "Octubre abre un clima de ayuda, aprendizaje y recuperación del ánimo. La vida parece bajar un poco el ritmo para que puedas integrar mejor lo que pasó antes. Un encuentro, una conversación o una idea compartida pueden darte mucho aire."
   },
   {
    "headline": "Puertas más abiertas",
    "body": "Noviembre se siente más pleno y amable, con cambios de ambiente que refrescan la mirada. Puede llegar información útil o una oportunidad de aprender algo que encaja mejor contigo. Si aceptas el movimiento, el mes te muestra caminos menos rígidos."
   },
   {
    "headline": "Cosecha serena",
    "body": "Diciembre mezcla cercanía con fruto visible: lo que sostuviste empieza a dar forma concreta. También puede aumentar tu magnetismo, no tanto por buscar atención, sino por la coherencia que transmites. Si sigues con calma, el mes deja una sensación de logro bien ganado."
   },
   {
    "headline": "Espera confiada",
    "body": "Enero cierra el ciclo con una confianza más estable y una espera que no pesa tanto. Lo conocido vuelve a sentirse útil, aunque sin grandes sobresaltos. Es un buen cierre para ordenar deseos y llegar con más claridad al siguiente paso."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Observa cómo reaccionas cuando algo te pide respuesta rápida y nota si estás entendiendo bien o solo acelerando. En estos meses, te conviene escribir prioridades, revisar mensajes importantes con calma y elegir una sola meta que merezca tu energía."
   },
   {
    "title": "De mayo a julio",
    "body": "Mira dónde estás dando demasiado y dónde podrías poner un límite más sano. En este tramo, prueba a dividir tus tareas en pasos cortos y a dejar espacio para revisar antes de cerrar algo importante; eso te ayudará a sostener el impulso sin dispersarte."
   },
   {
    "title": "De agosto a octubre",
    "body": "Fíjate en qué situaciones te piden más paciencia, más orden o una respuesta menos inmediata. Aquí funciona muy bien una rutina simple de revisión semanal y una conversación clara cuando notes tensión, porque así conviertes la presión en aprendizaje."
   },
   {
    "title": "De noviembre a enero",
    "body": "Observa qué apoyos aparecen cuando bajas el ritmo y permites que algo madure. En este periodo, te conviene recoger lo aprendido, agradecer lo que sí funcionó y dejar preparado un plan pequeño para empezar el siguiente ciclo con más estabilidad."
   }
  ],
  "closing": "De los 38 a los 47 años, tu ciclo de diez años entra en una etapa donde el fuego se vuelve más fuerte, y eso marca un cambio real en la forma de vivir tus metas y tus decisiones. En 2027, esa transición se siente de manera más suave pero ya visible: avanzar con intención, ordenar bien tu energía y no apurarte de más te deja en una posición mucho más clara para lo que viene."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027년, 지수님의 리듬",
  "subtitle": "채워짐과 발산 사이에서 균형을 읽는 해",
  "overview": "지수님에게 2027년은 에너지가 바깥으로 많이 흘러나가는 해예요. 중심 기운이 목이고, 사주 유형이 거목·성취로 잡혀 있어서 원래도 자라며 성과를 만들어 내는 힘이 있는데, 2027년의 화 기운은 그 힘을 더 드러내게 합니다. 말, 결과물, 베풂, 정리되지 않은 아이디어를 밖으로 꺼내는 일이 늘기 쉬워요. 그래서 성취감도 생기지만, 동시에 체감 피로도 함께 올라오기 쉬운 해로 읽힙니다.\n\n오행 분포를 보면 토가 강하고 화와 수가 비어 있어, 2027년처럼 뜨거운 기운이 들어오는 시기에는 속도와 열기를 잘 조절하는 감각이 중요해져요. 한 번에 크게 밀어붙이기보다, 이미 가진 것을 다듬고 구조를 세우는 쪽이 더 편할 수 있습니다. 특히 2월부터 3월, 12월부터 다음 해 1월은 도움과 회복이 들어오기 쉬워서 숨 고르기에 좋고, 8월부터 9월은 주도권을 잡아 성과를 밀어보기 좋은 구간이에요.\n\n지수님, 2027년은 ‘더 많이’보다 ‘어떻게 나누어 쓰는가’가 관건인 해예요. 받은 도움을 잘 쓰고, 만든 결과를 적절히 내보내고, 필요한 순간엔 속도를 낮추는 식으로 리듬을 잡으면 훨씬 편안합니다. 반안살의 기운도 들어 있어, 지나온 자리에서의 인정이나 안정감이 은근히 힘이 되어 줄 수 있어요.",
  "chapters": {
   "wealth": {
    "heading": "성과를 고르는 돈의 감각",
    "body": "2027년의 재물 흐름은 ‘벌어들이는 방식’보다 ‘무엇에 힘을 쓸지 고르는 방식’에 더 가까워 보여요. 지수님은 원래 키우고 완성하는 힘이 있는 편이라, 화 기운이 들어오는 2027년에는 결과물을 밖으로 내보내며 기회가 생기기 쉽지만, 그만큼 지출이나 자원 소모도 함께 늘기 쉬워요. 토가 강한 구조와 만나면 겉으로는 안정적으로 보여도 안쪽에서는 이미 여러 곳에 힘이 분산될 수 있습니다.\n\n일상에서는 부탁이 늘거나, 내가 만든 것을 주변이 자연스럽게 기대하는 장면이 생기기 쉬워요. 누군가에게 설명을 덧붙이거나, 한 번 더 손보느라 시간이 더 들어가거나, ‘이 정도는 내가 해두자’ 하고 넘어가는 순간이 많아질 수 있습니다. 그럴수록 지수님은 “지금 당장 넓히는 것”과 “조금 더 다듬는 것”을 나눠 보는 편이 좋아요.\n\n작게 시작하려면, 한 달에 한 번만이라도 고정 지출과 선택 지출을 따로 적어 보세요. 그리고 새로 벌어들이는 기회가 생기면 바로 넓히기보다, 먼저 유지할 것과 줄일 것을 나누어 보는 습관을 들이면 2027년의 재물 흐름이 한결 편해질 거예요."
   },
   "love": {
    "heading": "가까움이 깊어지는 방식",
    "body": "관계와 연애에서는 2027년이 꽤 따뜻하게 작용하기 쉬워요. 이 해의 기운이 지수님을 채워 주는 구간도 있고, 반안살처럼 익숙한 자리에서의 편안함과 인정이 힘이 되는 흐름도 있어서, 새로운 자극보다 “함께 있으면 편하다”는 감각이 중요해질 수 있습니다. 다만 화 기운이 강해질수록 말과 반응이 빨라질 수 있으니, 감정이 먼저 달리기 전에 속도를 한 번만 늦추면 더 부드러워요.\n\n일상에서는 오랜 지인과 연락이 다시 이어지거나, 평소보다 마음을 열고 이야기할 수 있는 자리가 생기기 쉽습니다. 반대로 4월처럼 충돌의 기운이 들어오는 시기에는 사소한 오해가 말의 결을 바꾸기 쉬워요. 그럴 때는 결론을 서두르기보다, 무엇이 서운했는지를 짧고 분명하게 말하는 쪽이 도움이 됩니다.\n\n작게 해볼 일은 관계의 온도를 자주 확인하는 거예요. 연락의 빈도보다 대화의 질을 보고, 상대의 반응을 해석하기 전에 한 번 더 묻는 습관을 들이면 좋아요. 지수님에게 2027년의 관계는 많이 붙잡는 것보다, 편안한 거리와 진심을 함께 유지할 때 더 단단해질 가능성이 큽니다."
   },
   "career": {
    "heading": "내가 밀어붙이는 자리",
    "body": "일과 커리어에서는 2027년 8월과 9월이 특히 눈에 띄어요. 이때는 지수님이 상황을 주도하고 성과를 만들어 내기 좋은 흐름이어서, 그동안 쌓아 둔 것을 결과로 바꾸기 좋습니다. 다만 기운이 강하게 앞으로 밀리는 만큼, 욕심이 앞서면 일이 넓어지기보다 분산될 수 있으니 선택과 집중이 중요해요. 거목·성취의 성향답게, 방향만 분명하면 추진력은 꽤 좋게 살아납니다.\n\n현실에서는 맡은 일이 늘거나, 결과를 빨리 보여 달라는 요청이 들어오거나, 내가 먼저 나서서 정리해야 하는 장면이 나타나기 쉬워요. 10월과 11월에는 책임과 압박이 조금 더 선명해질 수 있어서, 속도를 조금 조절하며 기준을 세우는 편이 좋습니다. 반대로 2월과 3월에는 도움과 배움이 들어오니, 준비와 정리에는 이 시기를 활용하면 편해요.\n\n실행은 간단하게 시작할 수 있어요. 지금 진행 중인 일 가운데 가장 중요한 것 1개만 남기고, 나머지는 순서를 조정해 보세요. 그리고 8월~9월에는 “더 많이”보다 “더 명확하게”를 목표로 잡으면, 2027년의 커리어 흐름이 훨씬 선명해질 거예요."
   },
   "study": {
    "heading": "배움이 결과로 이어지는 해",
    "body": "배움의 흐름은 2027년에 꽤 실용적으로 작동해요. 이 해는 지수님이 알고 있는 것을 말로 풀고, 손으로 만들고, 사람들 앞에 내놓는 힘이 커지기 쉬운 구조라서, 공부가 단순한 축적에서 끝나기보다 표현과 결과로 이어지기 좋습니다. 목 기운이 중심인 사람에게 화 기운은 생각을 밖으로 꺼내는 불빛 같은 역할을 해요.\n\n일상에서는 메모해 두었던 아이디어를 다시 꺼내 정리하거나, 배운 내용을 누군가에게 설명해야 하는 장면이 생길 수 있어요. 12월과 다음 해 1월에는 도움과 회복의 기운이 들어오므로, 부족했던 부분을 다시 채우고 기초를 정돈하기에 좋습니다. 6월과 7월처럼 표현과 생산이 늘어나는 시기에는, 배운 것을 바로 적용해 보는 감각이 특히 살아나요.\n\n작게 시작하려면, 한 번에 길게 공부하기보다 ‘짧게 배우고 바로 써보기’ 방식이 잘 맞아요. 읽은 뒤 한 줄로 요약하거나, 배운 내용을 누군가에게 설명해 보는 식으로 정리하면 기억이 오래갑니다. 지수님에게 2027년의 배움은 지식을 쌓는 일과 내 것을 만들어 내는 일이 함께 가는 해로 보입니다."
   },
   "health": {
    "heading": "열을 조절하는 생활 리듬",
    "body": "몸과 마음의 리듬에서는 2027년에 ‘열이 많이 오르는 느낌’이 중요해 보여요. 화 기운이 들어오고, 지수님의 구조는 이미 토가 강해서, 바깥으로 일을 많이 내보내는 동안 안에서는 무게감이 쌓이기 쉬워요. 그래서 무리한 관리보다, 리듬을 나누고 쉬는 틈을 의식적으로 두는 쪽이 더 잘 맞습니다.\n\n일상에서는 일정이 몰리면 생각보다 더 빨리 지치거나, 해야 할 일이 많을수록 집중이 산만해지는 장면이 생길 수 있어요. 10월과 11월에는 책임감이 커지며 속도를 조절하는 감각이 필요하고, 2월과 12월에는 회복과 정리가 들어오기 쉬워서 숨을 고르기 좋습니다. 아주 사소해 보여도 식사 시간, 수면 시간, 혼자 있는 시간의 간격을 일정하게 두면 훨씬 편해질 수 있어요.\n\n작게 해볼 일은 하루의 시작과 끝을 분리하는 거예요. 아침에는 할 일을 하나만 정하고, 밤에는 내일로 넘길 것을 적어 두면 마음이 덜 얽혀요. 지수님, 2027년에는 많이 버티는 것보다 리듬을 지키는 쪽이 오래 갑니다."
   }
  },
  "months": [
   {
    "headline": "2월, 채움의 시작",
    "body": "도움과 배움이 자연스럽게 들어오는 달이에요. 건록의 힘이 살아서 몸과 마음이 다시 서는 느낌을 받기 쉽고, 지살의 기운은 이동이나 환경 변화에 작은 자극을 더할 수 있습니다. 익숙하지 않은 흐름이 와도 서두르지 않으면 오히려 잘 흡수돼요."
   },
   {
    "headline": "3월, 붙는 인연",
    "body": "제왕의 강한 기운이 들어와 존재감이 살아나는 달이에요. 지지가 내 일지와 어울려 붙는 관계라서, 사람 사이의 연결이 자연스럽게 이어지기 쉽습니다. 다만 기대가 커질 수 있으니, 말은 또렷하게 두는 편이 좋아요."
   },
   {
    "headline": "4월, 방향 전환점",
    "body": "쇠의 기운이라 익숙한 패턴은 안정감을 주지만, 월살의 영향으로 마음이 쉽게 흔들릴 수 있어요. 지지가 내 일지와 부딪히는 흐름이 있어, 생각보다 빠르게 방향을 바꾸는 장면이 생길 수 있습니다. 이때는 맞서기보다 조정하는 쪽이 더 유리해요."
   },
   {
    "headline": "5월, 익숙한 리듬",
    "body": "병의 흐름이어서 에너지가 한껏 치솟기보다는, 익숙한 방식으로 하루를 보내기 쉬워요. 망신살은 시선이 모이거나 말이 퍼지기 쉬운 분위기를 만들 수 있으니, 표현은 간결하게 다듬는 편이 좋습니다. 새로움은 적지만, 기본을 지키기엔 괜찮은 달이에요."
   },
   {
    "headline": "6월, 내보내는 힘",
    "body": "사의 단계답게 안에 있던 것이 밖으로 흘러나오기 쉬워요. 장성살은 추진력과 드러남을 더해 주어서, 만들고 보여 주고 나누는 일이 늘기 쉽습니다. 대신 에너지 소모도 커지니, 시작한 일을 끝까지 담백하게 정리하는 감각이 중요해요."
   },
   {
    "headline": "7월, 인정의 온기",
    "body": "묘의 흐름은 부드럽게 자라나는 느낌을 줘요. 반안살이 함께 들어와서, 지나온 자리에서의 인정이나 편안한 지지가 힘이 되기 쉽습니다. 겉으로 크게 흔들리기보다, 조용히 쌓아 온 것이 드러나는 달로 읽혀요."
   },
   {
    "headline": "8월, 주도권 잡기",
    "body": "절의 기운은 과감한 선택과 정리가 필요한 흐름이에요. 역마살이 함께 있어서 이동, 전환, 방향 바꾸기가 더 잦아질 수 있습니다. 주도권을 잡기 좋지만, 속도를 너무 높이면 분산되기 쉬우니 우선순위를 분명히 해두세요."
   },
   {
    "headline": "9월, 성과를 밀다",
    "body": "태의 기운은 아직 완전히 굳지 않은 가능성을 품고 있어요. 육해살은 작은 엇갈림을 만들 수 있으니, 전달과 확인을 한 번 더 챙기면 편합니다. 성과를 밀어붙이기엔 좋지만, 서두름보다 정리가 먼저예요."
   },
   {
    "headline": "10월, 책임의 무게",
    "body": "양의 기운이 올라오며 해야 할 일이 또렷해지는 달이에요. 화개살은 혼자 생각을 정리하고 깊이를 더하는 데 도움을 줄 수 있습니다. 바깥의 속도보다 내 기준을 세우는 쪽이 훨씬 중요해져요."
   },
   {
    "headline": "11월, 단단해지는 때",
    "body": "장생의 흐름으로 다시 힘이 붙는 느낌이 있어요. 겁살은 긴장감을 조금 올릴 수 있지만, 그만큼 준비와 점검이 잘 먹히는 달이기도 합니다. 부담을 한 번에 다 안기보다, 나눠서 처리하면 훨씬 안정적이에요."
   },
   {
    "headline": "12월, 다시 채우기",
    "body": "목욕의 흐름이라 정리하고 비우는 감각이 살아나요. 재살은 신경이 분산되기 쉬운 분위기를 만들 수 있으니, 일정과 약속을 단순하게 두는 편이 좋습니다. 도움과 회복이 들어오기 쉬워서, 한숨 돌리며 다음을 준비하기 좋아요."
   },
   {
    "headline": "1월, 새로 정돈",
    "body": "관대의 흐름은 자세를 바로 세우고 다시 시작하는 힘을 줘요. 천살은 바깥의 변수보다 내 태도를 단단히 하는 쪽에 초점을 맞추면 부담이 덜합니다. 2027년의 마무리와 다음 장의 준비가 자연스럽게 이어지는 달이에요."
   }
  ],
  "action_plan": [
   {
    "title": "2월~4월경: 정리와 적응",
    "body": "도움이 들어오고, 관계의 결이 미세하게 바뀌는 흐름을 지켜보세요. 이 구간에는 새로 벌리기보다, 받은 정보와 제안을 분류하고 한 번 더 확인하는 행동이 잘 맞습니다."
   },
   {
    "title": "5월~7월경: 표현과 생산",
    "body": "내가 만든 것, 말한 것, 나눈 것이 밖으로 드러나는 흐름을 보게 될 거예요. 글, 발표, 기록, 정리처럼 결과물로 남는 행동을 작게라도 이어가면 2027년의 힘을 잘 쓸 수 있습니다."
   },
   {
    "title": "8월~10월경: 선택과 집중",
    "body": "주도권이 살아나고 책임도 함께 커지는 흐름이에요. 가장 중요한 일 1~2개만 남기고 나머지는 속도를 조절하는 식으로, 힘을 한곳에 모으는 연습을 해보세요."
   },
   {
    "title": "11월~다음해 1월경: 회복과 재정비",
    "body": "다시 도움과 정리가 들어오니, 밀린 것들을 가볍게 정돈하기 좋습니다. 일정, 관계, 작업 방식을 단순하게 만들고 내년으로 가져갈 것만 남겨 두면 한결 편해져요."
   }
  ],
  "closing": "36세부터 45세까지 수 기운이 강해지는 시기가 이어집니다. 지금의 2027년은 그 다음 장으로 넘어가기 전, 바깥으로 많이 쓰는 힘을 어떻게 다루는지 배우는 해처럼 읽혀요. 지수님은 이 해에 받은 도움을 잘 쓰고, 나온 결과를 무리 없이 정리하면 훨씬 안정적인 리듬을 만들 수 있습니다."
 }
};
