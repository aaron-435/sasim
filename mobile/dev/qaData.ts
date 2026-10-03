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
 "riley": {
  "content": {
   "title_line1": "When the message stays read, your mind starts running ahead of the room",
   "title_line2": "You reach for closeness fast, then pull a cold face the moment it arrives",
   "subtitle": "Module 1 Love & Attachment deep report — saju × psychological test × counseling integration",
   "opening_scene": "It is late enough that the chat window looks too bright against the rest of the room. Your thumb is still on the screen, and the same thought keeps circling: if they saw it, why didn't they answer? One check-in turns into another, and by the time a reply finally comes back, your chest is already tight with regret. Riley, doesn't your night look a lot like that lately?",
   "case_tag": "EXAMPLE CASE — Maya, early 30s, waiting for a reply",
   "case_paragraphs": [
    "Maya keeps refreshing the same thread after a read receipt, then sends another line before the first one has even settled. She is running on high Anxiety and low Avoidance, and her Five Elements pattern is heavy on Wood with no Metal, so the urge to reach and the difficulty with pause show up in the same hour. By dinner, she has already asked a friend whether her message sounded too much. You do not need a different script to see yourself in this one, because your pattern follows the same shape.",
    "She reads the room first, puts her own feelings last, and then feels exposed when the other person stays quiet. Her day gets smaller around the unanswered message, even when nothing else has changed. The tension is not that she wants too much; it is that her need for contact arrives before her calm can catch up. And yes, you can hear your own rhythm in that."
   ],
   "oheng_intro": "Your Wood is 50%, which is strong, and your Metal is 0%, which is weak. Because your Day Master is Wood, that strong Wood is your own force showing up in full, while the missing Metal shows up as pressure, rules, and the kind of inner friction that makes waiting feel heavier than it looks. In this Love & Attachment module, that balance appears most clearly in the way a delayed reply can take over the whole evening.",
   "quiz_reading": "Your Anxiety score is 82%, and your Avoidance score is 34%, which fits the Anxious-Preoccupied pattern exactly. That combination shows up when a read message sits unanswered for hours and your mind starts building a story before the other person does. You do not drift away first; you move toward them, then feel the sting when the reply finally lands.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — reaching before the silence gets bigger",
     "body": "Your Wood is 50%, so it is strong, and with your Day Master in Wood, this is the part of you that moves first. It is the hand that sends the follow-up text, the mind that checks the thread again, and the part of you that wants closeness to stay alive instead of fading into uncertainty. In this module, that same force becomes the impulse to keep the connection visible when the reply is late. The strength is real: you do not wait passively for meaning to appear."
    },
    "fire": {
     "heading": "🔥 Fire missing — the spark that does not stay lit here",
     "body": "Your Fire is 0%, so the quick warmth that would soften the pause is not carrying much weight. That can make the moment after a read receipt feel colder than it is, because there is less inner heat to hold the gap. In this attachment pattern, the result is a sharper swing from hope to alarm when the message does not come back. The scene is simple: one unread silence, and the whole room feels dimmer."
    },
    "earth": {
     "heading": "⛰️ Earth moderate — the ground that can hold your pace",
     "body": "Your Earth is 25%, so it is moderate, and it gives shape to the part of you that can still keep a day together when you do not let the chat decide everything. That matters here because the module is not only about wanting contact; it is also about whether you can stay seated in your own life while waiting. Earth shows up when you put the phone face down and finish the task in front of you before checking again. It is the steadier ground under your attachment alarm."
    },
    "metal": {
     "heading": "💎 Metal weak — pressure without enough structure",
     "body": "Your Metal is 0%, so it is weak, and Earth helps Metal in your chart by giving it structure and form. Because Metal is the part that feels like rules, responsibility, and pressure, the lack of it can make a delayed reply land as something bigger than a delay. In this module, that is why a read message with no answer for hours can feel personal so quickly. The pressure arrives fast, and you feel it before you can name it."
    },
    "water": {
     "heading": "💧 Water moderate — the depth under the first reaction",
     "body": "Your Water is 25%, so it is moderate, and it gives the feeling underneath the first burst of checking. It is the part that can hold the fear that this might end, even when the surface event is only a late reply. That depth is why your message trail is not random; it is carrying a bigger emotional load than the thread itself. In this module, Water is the quiet undercurrent that makes the waiting feel so charged."
    }
   },
   "upcoming_period_preview_heading": "From 46 years old, earth begins to lead the next chapter",
   "upcoming_period_preview_body": "From 46 years old, Earth becomes stronger, and that shift changes the background you are standing on. The part of you that now rushes toward a late reply will have more structure around it, so the evening will not get swallowed as easily by one thread. The room feels slower, the footing feels heavier, and the air around your relationships starts to hold more shape.",
   "module_map": {
    "title": "Your relationship alarm",
    "body": "When a message is read and left there for hours, that is what flips your alarm on. You do not stay far away when the alarm sounds; you move in, check again, and try to get certainty back as fast as possible. Then, once the answer finally comes, the same system can swing into a cold, distant posture as a kind of protest behavior, almost like your heart is trying to protect itself from needing too much. The moment is not about the text alone; it is about what the silence seems to say about your place in the relationship."
   },
   "module_deep": {
    "title": "A relationship that feels like a safe base",
    "body": "What helps you most is not endless reassurance, but a clear rhythm you can trust. You do well when the other person gives you one clean update and a real time window, because that lets your mind stop filling in the blanks. You can also ask for one sentence that fits your voice: 'If you're busy, just tell me when you'll be back so I don't spiral.' That is not a demand for constant contact; it is a request for a relationship that can stay readable. When the pace is predictable, your closeness can feel safe instead of urgent."
   },
   "strengths_preview": [
    {
     "title": "Mood sensing",
     "body": "You read the other person's tone before you fully speak your own, and that is a real relational skill. In your data, that shows up in the way you notice a late reply quickly and start tracking the shape of the interaction before anyone names it. It is why you can often tell something feels off before it becomes obvious."
    },
    {
     "title": "Deep loyalty",
     "body": "You do not treat closeness as disposable, and that comes through in how hard it is for you to let a thread fade. Your repeated check-ins are not only anxiety; they also show how seriously you take staying connected. In a day-to-day scene, that can look like staying with one person emotionally even when the conversation is uneven."
    },
    {
     "title": "Repair drive",
     "body": "You want the line between you and the other person to be restored, not left broken open. That is why you screenshot the chat, ask a friend, and then keep trying to make sense of what happened. The same energy that can become repeated texting can also become a strong instinct to mend what feels shaky."
    }
   ],
   "upcoming_period_heading": "46 years old, the next chapter opens with stronger earth",
   "upcoming_period_body": "From 46 years old, the relationship field gets more grounded, and that matters because your current pattern is built around quick reaction. With more Earth in the background, you are less likely to let one silent thread take over the whole day, and that changes how you carry closeness. It will help to build habits that keep your attention in your own schedule first, so the connection can sit inside your life instead of replacing it. The shift is not abstract; it looks like checking the message after you have finished what you were already doing.",
   "cross_analysis_quotes": [
    "Your 82% Anxiety and 50% Wood are speaking the same language: you move toward connection the moment it feels unstable. That is why a read message with no reply does not stay neutral for you. It becomes a cue to act, not a cue to wait.",
    "Your low 34% Avoidance and 0% Metal also line up with the way you stay engaged instead of pulling away. You do not disappear when closeness feels uncertain; you check again, then later go cold after the reply lands. That is the push-pull shape your data keeps showing."
   ],
   "answer_notes": [
    "Your answer to the anxiety item shows how quickly your mind goes into active monitoring when the response is slow. In daily life, that becomes the urge to check the thread again before you have even finished the last thought. It tells me you are trying to restore certainty, not create drama.",
    "Your answer to the avoidance item shows that closeness does not make you shut down; it lets you soften. In real time, that means the relationship itself can calm you once you feel the other person is present. You are someone who relaxes toward contact, not away from it."
   ],
   "chat_snapshot_note": "Your main worry and your emotional state are tied together here: the late reply is not just annoying, it makes you feel anxious and a little hurt. The moment it happens, your system reacts as if the connection itself is wobbling, so the pain lands fast. The line I would save is this: you are not overreacting to the text, you are reacting to what the silence seems to mean.",
   "chat_trigger_note": "The trigger is a message that has been read but not answered, and that kind of silence hits you hard because it leaves too much room for interpretation. Your Anxiety score explains why that gap fills with urgency so quickly, while your strong Wood pushes you to move toward the person instead of sitting still. That is why the same event can feel small on the surface and huge in your body.",
   "chat_repeat_note": "The pattern runs like this: you send one check-in, then another, then another, and only afterward do you feel the regret. In the middle of that loop, you are choosing contact over uncertainty, even when the cost is that you later feel exposed. The smallest way out is not to disappear; it is to pause long enough to let one message stand on its own.",
   "chat_fear_note": "Under the repeated checking is a very clear fear: that they will leave in the end. I do not hear that as neediness so much as a wish to keep the bond from slipping out of reach. What you want underneath the fear is simple and human: to feel that a delay does not equal abandonment.",
   "psychology_fact_heading": "Bowlby and attachment anxiety",
   "psychology_fact_body": "John Bowlby’s attachment theory says that when a bond feels uncertain, the attachment system turns on and pushes a person to seek proximity and reassurance. In an anxious attachment pattern, that system tends to activate quickly, especially when cues from the other person are ambiguous. Your data fits that pattern closely: high Anxiety, low Avoidance, and a strong pull toward checking when a reply is late. It is not that you want too much connection; it is that distance gets interpreted as risk very fast.",
   "psychology_takeaway": "You do not calm down by pretending you care less. You calm down when the connection feels readable enough that your mind can stand down.",
   "strengths": [
    {
     "title": "Steady direction",
     "body": "Your Day Master in Wood gives you a steady drive to keep a relationship moving instead of letting it stall in uncertainty. In your relationship data, that shows up as a strong instinct to check in, clarify what is happening, and look for a clear direction when a reply is late. You do not just sit with the silence; you try to restore contact and make the bond feel real again."
    }
   ],
   "weaknesses": [
    {
     "title": "Rapid alarm",
     "body": "When a reply is late, your system jumps to alert before the facts have finished arriving. That is why one read receipt can turn into a whole evening of checking and second-guessing. The feeling is real, but it arrives faster than the situation can justify."
    },
    {
     "title": "Aftershock regret",
     "body": "You tend to feel the cost of the check-in chain only after you have already sent it. That means the regret comes after the relief-seeking, not before it. In practice, this can leave you feeling both exposed and a little angry at yourself."
    },
    {
     "title": "Cold rebound",
     "body": "Once the reply finally comes, your system can swing into distance as a way to protect your pride. It is not indifference; it is a quick reset after feeling too visible. The result is that the conversation can become tense right after it finally opens back up."
    },
    {
     "title": "Self-last habit",
     "body": "You said you read their mood first and put your own feelings last, and that habit makes your inner state harder to notice in time. By the time you admit you are hurt, you have already spent a lot of energy managing theirs. That delay is part of why the day feels like it disappears into the relationship."
    }
   ],
   "fit_good": "You do best in a relationship rhythm where replies do not have to be instant, but they do have to be clear. A partner who says, 'I’m tied up, I’ll text you after dinner,' gives your mind something solid to hold while you go back to your own day. In that kind of setup, you can stay warm without turning every pause into a test.",
   "fit_bad": "You struggle in a setup where silence is left to speak for itself and no one names when they will return. A partner who reads and disappears for hours will keep pulling your attention back to the screen, even if you are trying to work or rest. In that kind of day, your energy gets split between the relationship and the wait.",
   "behavior_guides": [
    {
     "title": "One pause",
     "body": "When you notice the urge to send a second check-in, wait ten minutes before typing anything. Put the phone down, finish one small task, and then decide whether the message still needs to be sent. This gives your Wood room to move without letting the alarm drive."
    },
    {
     "title": "Clear ask",
     "body": "Once a day, if the silence is active, send one message that names what you need in one sentence. Keep it simple: ask for a time window, not a full explanation. That keeps the relationship readable without turning it into a test."
    },
    {
     "title": "Phone away",
     "body": "During meals or work blocks, keep the chat off the main screen for at least thirty minutes. Set one check time instead of checking every few minutes. This protects your day from being reorganized around a single read receipt."
    },
    {
     "title": "Reset note",
     "body": "If you feel yourself going cold after they reply, write one line before answering back. Use it to separate hurt from punishment, so the reply you send is not just a rebound. That small pause helps you stay connected without making the conversation pay for your fear."
    }
   ],
   "mindset_guide": "Think of your attachment alarm like a smoke detector that goes off at burnt toast, not just fire. You do not need to smash the detector; you need to learn which sounds are warning and which are noise. A late reply is a signal to check the facts, not a verdict on your worth. When you give the moment a name, it stops owning the whole room.",
   "closing_title": "What stays after the silence",
   "closing_body": "From 46 years old, Earth takes the lead, and that changes the floor under your relationships. The same late reply that now pulls your whole attention will sit in a wider day, and that makes space for your own plans to stay intact. In this Love & Attachment pattern, the feeling becomes less jagged and more readable. That is the kind of relief that lets you stay close without losing yourself."
  },
  "quizDiagnosis": {
   "moduleId": "module1",
   "moduleTitle": "Module 1 · Love & Attachment",
   "track": "romance",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "When my partner is slow to reply I…",
     "label": "Keep wanting to check what's going on",
     "dimension": "anxiety",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "The closer we get, the more I…",
     "label": "Relax",
     "dimension": "avoidance",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "anxiety",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "avoidance",
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
     "anxiety"
    ],
    "kind": "single",
    "typeKey": "anxiety"
   },
   "typeInfo": {
    "title": "Anxious-Preoccupied",
    "hook": "Often needs reassurance about the relationship and reacts strongly to a partner's cues."
   },
   "nuancedSummary": "Anxiety runs high and avoidance runs low.",
   "dimensionShortNames": {
    "anxiety": "Anxiety",
    "avoidance": "Avoidance"
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
   "primary_concern": "When a reply is late, I fall apart",
   "emotional_state": "Anxious and a little hurt",
   "trigger_point": "A message read but not answered",
   "repeat_pattern": "Sending check-in texts in a row, then regretting it",
   "core_fear_or_meaning": "I'm scared they'll leave in the end",
   "summary_quote": "When a reply is late, I fall apart",
   "integrated_summary": "The moment a reply runs late, the anxiety switches on; you send check-in texts one after another and then regret it. Underneath is the fear that they will leave in the end.",
   "coping": "I screenshot the chat and ask a friend if it's fine",
   "relational": "I read their mood first and put my own feelings last",
   "desired_change": "I want to keep my day intact even when a reply is late",
   "module_fields": {
    "attachment_alarm": "A message read with no reply for hours",
    "protest_or_deactivate": "Texting again and again, then acting cold once they answer"
   }
  }
 },
 "lucia": {
  "content": {
   "title_line1": "Cuando una respuesta tarda, todo tu día tiembla",
   "title_line2": "y tú sigues leyendo señales en silencio",
   "subtitle": "Módulo 1 · Amor y apego — informe profundo — saju × psicología × acompañamiento integrado",
   "opening_scene": "Hay noches en las que el teléfono se queda boca arriba, iluminando la mesa, y tú vuelves a mirar el mismo mensaje leído sin respuesta. La pantalla no cambia, pero tu cabeza sí: primero aparece la duda, luego la urgencia, luego la idea de que quizá hiciste algo mal. Entonces mandas otro mensaje, y después otro, como si repetirlo pudiera ordenar lo que se rompió por dentro. Más tarde, cuando por fin responde, tú ya estás un poco lejos, como si hubieras tenido que protegerte de tu propia ansiedad. Lucía, ¿te estás viendo así últimamente?",
   "case_tag": "CASO DE EJEMPLO — Martina, 30 y tantos, espera respuestas en una relación",
   "case_paragraphs": [
    "Martina deja el móvil junto al plato y mira la hora una y otra vez mientras intenta seguir con su día. Cuando pasan horas sin respuesta, escribe de nuevo, revisa el tono del último mensaje y acaba pidiéndole a una amiga que le diga si todo sigue bien. En su mapa, la tierra pesa mucho y el metal casi no aparece, así que la presión por sostener el vínculo se siente más fuerte que el alivio de poner distancia. Tú también puedes reconocer ese tirón, donde el cuerpo pide confirmación antes de que la mente se calme.",
    "A Martina le pasa que la tarde se le cae entera si el chat se queda en silencio. En lugar de seguir con lo suyo, empieza a leer estados de ánimo en cada frase y deja sus propias necesidades para después. La combinación de alta ansiedad y baja evitación hace que se acerque con insistencia y luego se retire un poco, como si necesitara tocar la puerta para asegurarse de que sigue ahí. Tú también puedes verte en ese movimiento, aunque por fuera parezca pequeño."
   ],
   "oheng_intro": "Tu tierra está en 38% y domina el mapa, mientras que el metal está en 0% y queda muy bajo. En tu Maestro del Día agua, la tierra se vive como presión, norma y peso sobre la respuesta, y el metal como apoyo, aprendizaje y protección que todavía cuesta encontrar. Por eso, en este módulo de amor, la espera de un mensaje no se siente neutra: se vuelve una escena cargada de control, tensión y búsqueda de alivio.",
   "quiz_reading": "Tu puntuación de Ansiedad en 82% y Evitación en 34% dibuja un apego ansioso con poca distancia defensiva. Eso se nota en escenas muy concretas: un mensaje leído sin respuesta te ocupa la cabeza, y la necesidad de comprobar aparece antes que la calma. No estás frente a una frialdad hacia el vínculo, sino frente a una alerta muy activa que busca confirmación enseguida.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera baja — el impulso que busca salida",
     "body": "La madera está en 13%, así que aparece baja y no empuja sola la escena. En tu día a día, eso se nota cuando quieres avanzar en la relación pero te quedas mirando la pantalla más de lo que actúas. La madera baja también hace que el gesto de empezar una conversación nueva dependa mucho de cómo venga la respuesta del otro. No falta deseo; falta empuje estable para sostenerlo sin mirar tanto la reacción ajena."
    },
    "fire": {
     "heading": "🔥 fuego fuerte — el calor que se enciende rápido",
     "body": "El fuego está en 25%, así que se mantiene en un nivel medio y visible. En tu módulo de amor, eso se parece a la urgencia con la que escribes otra vez cuando sientes silencio. Ese fuego no se queda quieto; busca contacto, busca calor, busca una señal que confirme que el vínculo sigue vivo. Por eso, cuando la espera se alarga, tu reacción no es fría ni lejana: se enciende rápido y pide respuesta."
    },
    "earth": {
     "heading": "⛰️ tierra fuerte — la presión de sostenerlo todo",
     "body": "La tierra está en 38%, así que aquí manda con claridad. En tu Maestro del Día agua, esa tierra se siente como una fuerza que te aprieta con deber, norma y peso emocional. En el amor, eso hace que un mensaje sin contestar no sea solo un retraso: se vuelve una carga que tu mente intenta resolver de inmediato. Lucía, tu cuerpo busca firmeza, pero la forma en que la buscas a veces te deja más tensa que tranquila."
    },
    "metal": {
     "heading": "💎 metal bajo — el apoyo que falta a mano",
     "body": "El metal está en 0%, así que aparece ausente y se nota en la manera en que te cuesta apoyar la mente en algo más claro cuando la relación se mueve. La tierra sí puede nutrir el metal, y en tu mapa eso explica por qué el apoyo, la guía y la protección no nacen solos: necesitan ser construidos con cuidado. En un chat que queda abierto sin respuesta, esa falta se vuelve visible enseguida, porque no tienes una base interna muy fuerte para cortar la alarma. Lucía, ahí es donde más se siente el hueco."
    },
    "water": {
     "heading": "💧 agua fuerte — la sensibilidad que lee antes de hablar",
     "body": "El agua está en 25%, así que se mantiene presente y sensible. En tu caso, eso hace que captes el tono, el silencio y el cambio mínimo antes de que nadie diga nada. En una conversación afectiva, esa sensibilidad te ayuda a leer el clima, pero también te deja expuesta a imaginar demasiado rápido lo que pasa. Por eso te notas pendiente de la emoción del otro antes que de la tuya."
    }
   },
   "upcoming_period_preview_heading": "38 años, comienza el fuego",
   "upcoming_period_preview_body": "38 años marcan el inicio de una etapa en la que el fuego toma más fuerza. Lo que hasta ahora se vivía con presión y espera empieza a moverse con más calor, más impulso y más presencia visible. Se siente como una luz que entra por una ventana que antes quedaba a medias, y cambia la forma en que se vive el vínculo.",
   "module_map": {
    "title": "Tu alarma en las relaciones",
    "body": "Cuando no llega una respuesta, tu alarma no se queda en el cuerpo: se va directa a la historia que tu mente arma. Primero miras el mensaje leído, luego revisas si dijiste algo raro, y después aparece la urgencia de escribir otra vez para comprobar. Esa secuencia encaja con una activación del apego ansioso: acercamiento insistente, preguntas repetidas y una tensión que no se apaga sola. Lucía, lo que te enciende no es solo el silencio; es la sensación de quedar fuera del vínculo justo cuando más lo necesitas."
   },
   "module_deep": {
    "title": "Una relación que sea tu base segura",
    "body": "Para ti, la base segura no se construye con promesas grandes, sino con señales pequeñas y repetibles. Te ayuda más un contacto que responde a una hora parecida, que avisa si se va a demorar y que no deja el silencio abierto durante horas. Si quieres pedirlo, puedes decir algo como: ‘Si vas a tardar, me ayuda mucho que me digas solo eso y ya’. Lucía, esa frase no pide perfección: pide suelo."
   },
   "strengths_preview": [
    {
     "title": "Lectura fina",
     "body": "Tú notas el ánimo del otro antes de poner el tuyo sobre la mesa, y eso aparece muy claro en tu forma de relacionarte. En la práctica, eso significa que detectas un cambio pequeño en una respuesta, en el tono o en el tiempo de espera. Esa lectura fina te permite entender el clima afectivo con rapidez, incluso cuando nadie lo nombra. Lucía, tu sensibilidad capta mucho antes de que la escena se rompa."
    },
    {
     "title": "Lealtad activa",
     "body": "Cuando algo te importa, no te quedas mirando desde lejos: vuelves, preguntas y tratas de sostener el contacto. Esa constancia se ve en que mandas capturas a una amiga para comprobar si todo va bien y no sueltas el tema a la primera. No es impulso vacío; es una forma de cuidar el vínculo con insistencia. Lucía, ahí hay una lealtad que se mueve, no que se queda quieta."
    },
    {
     "title": "Reparación rápida",
     "body": "Tu manera de pedir alivio no se corta cuando sientes tensión; intentas recomponer la conexión enseguida. Lo ves en ese patrón de escribir una y otra vez y luego arrepentirte, porque lo que buscas no es pelear sino volver a estar en paz. Esa rapidez para intentar arreglar también muestra que no renuncias fácil a lo que te importa. Lucía, tu impulso de volver a unir lo que se afloja es muy claro."
    }
   ],
   "upcoming_period_heading": "38 años y el fuego abre otro tramo",
   "upcoming_period_body": "38 años abren un ciclo en el que el fuego gana peso y la escena afectiva se vuelve más directa. Después de ese punto, lo que antes se quedaba en tensión silenciosa empieza a pedir más expresión y más claridad en el trato. Para ti, conviene llegar a ese tramo con una forma de hablar que no dependa solo de comprobar, sino también de pedir con más precisión lo que necesitas. Así, el vínculo deja de sentirse como una prueba constante y empieza a tener más margen para respirar.",
   "cross_analysis_quotes": [
    "La tierra te aprieta más de lo que el metal te sostiene. En tu mapa, la tierra es la fuerza que te pone reglas, responsabilidad y presión, y el metal es la que te da apoyo, aprendizaje y protección. Como el metal está en 0% y la tierra llega a 38%, sientes más el peso que el sostén.",
    "Eso explica por qué un silencio breve se convierte en una urgencia grande. Cuando un mensaje queda leído y sin respuesta, tu ansiedad se enciende rápido y quieres comprobar una y otra vez qué pasa. Después te arrepientes, pero el impulso nace de ese miedo a que al final se vaya.",
    "Tu ansiedad no nace de la nada: se activa cuando el vínculo no te da una respuesta clara a tiempo. En tu módulo de apego, aparece un apego ansioso: necesitas confirmar a menudo que la relación está bien y reaccionas con fuerza a las señales de la pareja. Además, tu ansiedad está alta, con 82%, y tu evitación es baja, con 34%, así que te acercas buscando seguridad en vez de alejarte."
   ],
   "answer_notes": [
    "Cuando elegiste ‘Quiero comprobar una y otra vez qué pasa’, mostraste una mente que no tolera bien la incertidumbre afectiva. En tu día, eso se ve como revisar el chat, releer el mensaje y volver a escribir antes de que el cuerpo se calme. Lucía, tu ansiedad intenta protegerte pidiendo certeza de inmediato.",
    "Cuando respondiste ‘Más tranquilidad siento’, mostraste que la cercanía sí te regula y te ordena por dentro. Eso se nota cuando el vínculo está presente y tu día deja de tambalearse tanto. Lucía, tu seguridad crece cuando la conexión se siente cerca y clara."
   ],
   "chat_snapshot_note": "Tu núcleo de preocupación aparece en una frase muy simple: cuando una respuesta tarda, tú te derrumbas. Debajo de eso hay ansiedad y algo de dolor, y por eso el silencio no se vive como un detalle pequeño, sino como una caída emocional. Lucía, lo que más pesa no es solo esperar: es sentir que tu día pierde piso mientras esperas.",
   "chat_trigger_note": "El mensaje leído y sin respuesta durante horas te altera porque deja la escena abierta justo donde tu mente necesita cierre. En un apego ansioso, ese hueco activa la búsqueda de señales y hace que el cuerpo pida comprobar antes de descansar. En tu mapa, además, la tierra fuerte hace que esa espera se sienta como presión real y no como algo liviano.",
   "chat_repeat_note": "Tu patrón se mueve en dos tiempos: primero escribes una y otra vez para comprobar, y luego te alejas cuando por fin responde. En medio, tu mente intenta bajar la incertidumbre, pero el movimiento termina dejándote más tensa. Una pequeña salida sería pausar antes del siguiente mensaje y mirar qué emoción estás intentando calmar con esa nueva línea.",
   "chat_fear_note": "Tu miedo de fondo no es solo que tarde en contestar; es que al final se vaya. Ese temor habla de cuánto valor le das al vínculo y de lo mucho que te importa sostenerlo vivo. Lucía, debajo de la alarma hay un deseo muy claro de permanecer cerca sin perderte a ti.",
   "psychology_fact_heading": "Bolby y el apego ansioso",
   "psychology_fact_body": "John Bowlby explicó que el apego organiza la manera en que buscamos seguridad en los vínculos cercanos. Cuando el sistema de apego se activa, una respuesta lenta o ambigua puede encender conductas de protesta: comprobar, insistir o buscar señales de disponibilidad. En tu caso, eso encaja con una ansiedad alta y una evitación baja, porque no te alejas del vínculo: intentas asegurarte de que sigue ahí. Lucía, la teoría ayuda a poner nombre a algo muy concreto: tu mente no solo espera, también vigila para no perder contacto.",
   "psychology_takeaway": "Tu alarma no está exagerando; está pidiendo certeza. Cuando la cercanía responde, tú vuelves a tu centro con más rapidez.",
   "strengths": [
    {
     "title": "Dirección interna",
     "body": "Tu Maestro del Día agua se ve en una capacidad para orientar la relación desde dentro, no solo reaccionando a lo que viene de fuera. Eso aparece cuando lees primero el ánimo del otro, pero no pierdes del todo la brújula de lo que necesitas. En una escena concreta, puedes notar que algo no cuadra y aun así seguir buscando una forma de entenderlo sin romper el contacto. Lucía, ahí hay una dirección interna que no se apaga aunque la espera te mueva."
    }
   ],
   "weaknesses": [
    {
     "title": "Urgencia de contacto",
     "body": "Cuando sientes silencio, la necesidad de resolverlo crece muy rápido y te empuja a escribir más de una vez. Esa urgencia no nace de capricho, sino de una mente que intenta bajar la tensión cuanto antes. En la práctica, te puede llevar a revisar el chat, mandar otro mensaje y luego arrepentirte cuando ya pasó el pico. Lucía, ahí conviene ver la urgencia como señal, no como orden."
    },
    {
     "title": "Duda amplificada",
     "body": "Con una respuesta tardía, tu mente tiende a convertir una pausa en una historia más grande. Eso hace que un solo silencio ocupe mucho espacio y te cueste volver a tu día. Se nota cuando le mandas capturas a una amiga para comprobar si todo va bien, como si necesitaras un segundo espejo para calmarte. Lucía, esa duda pide contención, no castigo."
    },
    {
     "title": "Retirada tardía",
     "body": "Primero persigues la señal y luego, cuando responde, te apartas un poco para protegerte. Ese movimiento muestra que tu sistema no solo busca cercanía; también intenta evitar quedar demasiado expuesta. En lo cotidiano, puede sentirse como escribir con insistencia y después tomar distancia cuando llega la respuesta. Lucía, ahí hay una forma de defensa que ya conoces bien."
    },
    {
     "title": "Centro frágil",
     "body": "Tu propio día se tambalea cuando la respuesta se demora, y eso habla de un centro que todavía depende mucho del otro. No es falta de interés por tu vida; es que el vínculo ocupa demasiado espacio cuando se activa la alarma. En una tarde cualquiera, puedes notar que dejas tus tareas en pausa mientras el chat sigue abierto. Lucía, fortalecer ese centro cambia mucho más de lo que parece."
    }
   ],
   "fit_good": "Te va mejor un entorno donde las respuestas tengan ritmo claro y no te dejen adivinando durante horas. Un día así te permite seguir con tus cosas mientras sabes cuándo volverá el intercambio, y eso baja mucho la tensión. También te conviene un estilo relacional donde se pueda pedir claridad sin sentir que estás pidiendo demasiado.",
   "fit_bad": "Te complica mucho un contexto donde el silencio se alarga y nadie explica nada. En un día así, te quedas mirando la pantalla, vuelves a escribir y pierdes el hilo de lo que estabas haciendo. También te desgasta un trato ambiguo, porque tu mente llena los huecos con historias que pesan demasiado.",
   "behavior_guides": [
    {
     "title": "Pausa breve",
     "body": "Cuando veas el mensaje leído y sientas la urgencia de escribir otra vez, espera diez minutos antes de mandar algo más. En ese tiempo, deja el móvil boca abajo y haz una sola cosa que te ocupe las manos. Lucía, no buscas ignorar lo que sientes; buscas que la reacción no te arrastre."
    },
    {
     "title": "Frase clara",
     "body": "Si necesitas confirmar, escribe una sola frase concreta y sin rodeos, como una petición de ritmo o de aviso. Hazlo una vez y luego suelta la pantalla durante un rato. Lucía, cuanto más precisa sea tu frase, menos espacio deja para la espiral."
    },
    {
     "title": "Apoyo externo",
     "body": "Antes de mandar otro mensaje, habla con una amiga solo para nombrar la emoción, no para decidir por ti. Ponle nombre a la ansiedad y espera a que baje un poco antes de volver al chat. Lucía, así separas el alivio de la comprobación."
    },
    {
     "title": "Vuelta al día",
     "body": "Cuando notes que la espera te atrapa, vuelve a una tarea concreta de tu día durante quince minutos. El objetivo no es distraerte por completo, sino recordarle a tu cuerpo que tu día sigue en pie. Lucía, ese pequeño regreso cambia mucho la escena."
    }
   ],
   "mindset_guide": "No estás persiguiendo solo una respuesta; estás buscando suelo. Cuando el chat se queda en silencio, tu mente quiere convertir esa pausa en una sentencia, pero no todo hueco significa abandono. Piensa en la relación como una puerta con bisagra: si la empujas demasiado, cruje más; si la sostienes con ritmo, vuelve a abrirse sin romperse. Lucía, tu tarea no es adivinar más rápido, sino necesitar con menos prisa.",
   "closing_title": "Lo que se sostiene",
   "closing_body": "38 años abren un tramo nuevo y el fuego gana presencia en tu mapa. Desde ahí, la espera deja de sentirse solo como presión y empieza a empujarte a hablar con más claridad sobre lo que necesitas. En este módulo, eso cambia el tono del vínculo: la ansiedad baja de volumen y el cuerpo deja de sentir que cada silencio borra tu día. Lucía, la frase que te conviene guardar es esta: tu relación no tiene que comprobarse a cada minuto para seguir siendo real."
  },
  "quizDiagnosis": {
   "moduleId": "module1",
   "moduleTitle": "Módulo 1 · Amor y apego",
   "track": "romance",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "Cuando mi pareja tarda en responder…",
     "label": "Quiero comprobar una y otra vez qué pasa",
     "dimension": "anxiety",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "Cuanto más cerca estamos…",
     "label": "Más tranquilidad siento",
     "dimension": "avoidance",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "anxiety",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "avoidance",
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
     "anxiety"
    ],
    "kind": "single",
    "typeKey": "anxiety"
   },
   "typeInfo": {
    "title": "Apego ansioso",
    "hook": "Necesita confirmar a menudo que la relación está bien y reacciona con fuerza a las señales de la pareja."
   },
   "nuancedSummary": "La ansiedad es alta y la evitación es baja.",
   "dimensionShortNames": {
    "anxiety": "Ansiedad",
    "avoidance": "Evitación"
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
   "primary_concern": "Cuando una respuesta tarda, me derrumbo",
   "emotional_state": "Ansiedad y algo de dolor",
   "trigger_point": "Un mensaje leído y sin respuesta",
   "repeat_pattern": "Mandar mensajes seguidos para comprobar y luego arrepentirme",
   "core_fear_or_meaning": "Me da miedo que al final se vaya",
   "summary_quote": "Cuando una respuesta tarda, me derrumbo",
   "integrated_summary": "En cuanto una respuesta se retrasa, se enciende la ansiedad; mandas mensajes uno tras otro y luego te arrepientes. Debajo está el miedo a que al final se vaya.",
   "coping": "Le mando capturas a una amiga para preguntarle si todo está bien",
   "relational": "Leo primero su estado de ánimo y dejo lo mío para después",
   "desired_change": "Quiero que mi día siga en pie aunque la respuesta tarde",
   "module_fields": {
    "attachment_alarm": "Un mensaje leído sin respuesta durante horas",
    "protest_or_deactivate": "Escribir una y otra vez, y luego tomar distancia cuando responde"
   }
  }
 },
 "casey": {
  "content": {
   "title_line1": "Cuando revisas todo, tu energía se queda sin aire",
   "title_line2": "Y lo que terminas por fuera sigue abierto por dentro",
   "subtitle": "Módulo 3 de agotamiento — informe profundo integrado de saju × psicología × acompañamiento",
   "opening_scene": "Son ya altas horas y sigues con la computadora abierta, aunque el trabajo terminó hace rato. Vuelves a pasar la vista por lo mismo, como si el cuerpo quisiera cerrar y la mente se negara a soltar. El lunes por la mañana, un mensaje basta para volver a encender esa tensión y te deja mirando la pantalla con la sensación de que todavía falta algo. Acumulas, aguantas, y luego la energía cae de golpe. Casey, ¿no te está pasando últimamente así?",
   "case_tag": "CASO DE EJEMPLO — Martín, treinta y tantos, con semanas que no se apagan",
   "case_paragraphs": [
    "Martín termina el día con la mesa limpia, pero no con la cabeza en paz. Revisa una entrega por tercera vez, responde un mensaje del lunes y se queda con la sensación de que descansar es solo cambiar de tarea. Su madera está muy por encima del resto, y en su mapa eso se nota en cómo sigue tomando trabajo aunque ya no le quede margen. Tú también podrías estar viviendo ese mismo tironeo entre cerrar y volver a abrir.",
    "En cuanto afloja un poco, Martín siente inquietud y vuelve a mirar lo pendiente. No es falta de esfuerzo; es un patrón de control que no se suelta ni cuando el reloj ya marcó el final. Su metal, que en su mapa sostiene la precisión, deja el foco pegado a lo que falta corregir. Tú también podrías reconocer ese cansancio que no baja aunque el día ya haya terminado."
   ],
   "oheng_intro": "Tu madera está en 38% y tu metal también en 38%, así que hay dos fuerzas fuertes tirando del mismo día. El fuego y la tierra quedan en 13% cada uno, y el agua en 0%, que es justo la parte que suele aflojar la presión interna. En este módulo de agotamiento, esa combinación se ve como mucho empuje para seguir y muy poco margen para vaciarte de verdad.",
   "quiz_reading": "Tu perfeccionismo está en 82% y la recuperación en 34%, y esa combinación dibuja un tipo muy claro: Quien termina todo y se agota. No se ve en una sola gran crisis, sino en la costumbre de volver al trabajo terminado y en la inquietud que aparece incluso en un día libre. En tu día a día, eso se nota en el momento en que descansas pero tu mente sigue revisando.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera fuerte — empujar sin soltar",
     "body": "Tu madera está en 38%, así que aquí hay una fuerza clara para avanzar, decidir y sostener el ritmo. En tu caso, esa fuerza no se queda quieta: te lleva a revisar, a corregir y a seguir encima incluso cuando ya cumpliste. En un día como el tuyo, eso se parece a cerrar una tarea y abrirla otra vez desde el principio. Y por eso el perfeccionismo no aparece como adorno, sino como motor que no afloja."
    },
    "fire": {
     "heading": "🔥 fuego bajo — chispa breve, gasto rápido",
     "body": "Tu fuego está en 13%, así que la expresión sale con menos espacio y menos impulso del que te gustaría. En este módulo, eso se nota cuando el entusiasmo dura poco y enseguida entra la sensación de estar tirando de algo más pesado. Puede aparecer como una mañana en la que respondes rápido, pero por dentro ya vas mirando cuánta energía te queda. No sobra llama para sostener el ritmo largo, y eso hace que cada esfuerzo pese más."
    },
    "earth": {
     "heading": "⛰️ tierra baja — sostén que cuesta mantener",
     "body": "Tu tierra está en 13%, así que el soporte cotidiano no se siente amplio ni cómodo. En un día de trabajo, eso se nota cuando acumulas tareas y luego te derrumbas, porque falta una base intermedia que reparta el peso. La tierra aquí no desaparece, pero sí se vuelve justa para todo lo que intentas sostener a la vez. Por eso la sensación de cansancio no llega sola: llega con la impresión de estar sosteniéndolo todo sin descanso real."
    },
    "metal": {
     "heading": "💎 metal fuerte — precisión que no se apaga",
     "body": "Tu metal está en 38%, así que la mirada fina y el criterio están muy presentes. En tu día, eso se traduce en volver a revisar, detectar detalles y no dejar pasar lo que para ti todavía no está cerrado. Esa precisión te ayuda a terminar bien, pero también puede dejarte en revisión constante cuando el cuerpo ya pidió salida. Aquí el metal no solo ordena; también mantiene la mente encendida cuando el cuerpo ya pidió salir."
    },
    "water": {
     "heading": "💧 agua baja — lo que afloja casi no aparece",
     "body": "Tu agua está en 0%, así que la parte que baja la presión, suelta y deja circular queda muy poco disponible. En tu mapa, como el metal alimenta el agua, esa ayuda existe como posibilidad, pero ahora mismo no está tomando forma suficiente. Por eso el descanso no se siente como descanso: paras por fuera, pero por dentro sigues en revisión. Cuando falta agua, la energía no se renueva; solo cambia de lugar y vuelve a apretar."
    }
   },
   "upcoming_period_preview_heading": "41 años desde ahora, el metal abre el siguiente tramo",
   "upcoming_period_preview_body": "De los 41 a los 50 años, el metal toma más fuerza y marca un cambio de tono en tu mapa. Lo que hoy se siente como tensión constante empieza a ordenarse con más estructura y menos ruido. Es como pasar de sostener todo con el cuerpo a sostenerlo con una forma más clara.",
   "module_map": {
    "title": "Tu balance de energía",
    "body": "Tu balance de energía muestra una balanza muy clara: por un lado, mucha demanda interna para dejar todo perfecto, sostener la revisión y no perder control; por el otro, pocos recursos para recuperar de verdad y aflojar la tensión. La madera y el metal marcan el empuje y la exigencia, mientras el agua en 0% deja sin espacio la descarga que necesitarías para sentir alivio. En este módulo, lo que más pesa no es la cantidad de trabajo, sino la forma en que tu energía se queda dentro, sin terminar de salir. Ahí aparece el agotamiento: haces mucho, pero el día no te devuelve nada que se parezca a descanso."
   },
   "module_deep": {
    "title": "El orden para recargarte",
    "body": "Primero, baja la revisión que ya no mejora nada: la segunda pasada suele darte calma momentánea, pero te deja sin aire para el resto del día. Después, reserva una franja corta y fija para recuperar, aunque sea breve, porque tu recuperación no aparece sola cuando todo termina. Por último, protege la entrada de los lunes por la mañana: si empiezas la semana con mensajes que te arrastran directo a la alerta, tu energía se va antes de que empiece el trabajo. No se trata de dejar de hacer, sino de dejar de vaciarte en el mismo gesto."
   },
   "strengths_preview": [
    {
     "title": "Responsabilidad fina",
     "body": "Tú no dejas una tarea a medias cuando sientes que todavía puede quedar mejor. Esa forma de revisar desde el principio lo que ya terminaste muestra una responsabilidad muy precisa, no superficial. Se nota en el momento en que cierras un archivo y vuelves a abrirlo solo para asegurarte de que todo quedó como debía."
    },
    {
     "title": "Resistencia activa",
     "body": "Tú puedes seguir funcionando aunque por dentro ya estés muy cerca del límite. Esa resistencia no es silencio: es la capacidad de sostener el día hasta que todo salga. Se ve en cómo acumulas y sigues, incluso cuando la inquietud ya se instaló."
    },
    {
     "title": "Deseo de excelencia",
     "body": "A ti no te basta con entregar; quieres que lo entregado tenga buena forma. Ese deseo de hacerlo bien te da un estándar alto y una mirada muy atenta a los detalles. Se nota cuando un mensaje del lunes te activa de inmediato porque no quieres que nada quede flojo."
    }
   ],
   "upcoming_period_heading": "41 años desde ahora, empieza otra etapa",
   "upcoming_period_body": "De los 41 a los 50 años, el metal gana peso y cambia la manera en que administras la energía del día. Lo que ahora se dispersa en revisión y sobreexigencia encuentra una forma más limpia de organizarse, y eso deja menos espacio para el desgaste acumulado. Para llegar mejor a ese tramo, te conviene empezar a distinguir qué parte de tu esfuerzo es precisión útil y qué parte es simple repetición. Ese cambio no te pide hacer más, sino dejar de vaciarte en lo mismo.",
   "cross_analysis_quotes": [
    "La madera en 38% explica por qué no te resulta fácil dejar una tarea cerrada a la primera. Tu perfeccionismo en 82% no busca solo calidad; busca alivio, como si revisar una vez más pudiera darte calma y alejar la sensación de quedarte atrás. Por eso vuelves sobre lo hecho y te cuesta soltarlo del todo.",
    "Tu agua en 0% encaja con la recuperación en 34%: paras, pero no terminas de recargarte. Por eso el descanso no baja la tensión y el lunes por la mañana vuelve a activarla con facilidad. Aunque dejes de hacer, tu mente sigue en guardia."
   ],
   "answer_notes": [
    "Volver a revisar desde el principio muestra que tu atención no se conforma con un cierre rápido. En el día a día, eso se ve en la costumbre de abrir otra vez lo que ya habías dado por terminado. Esa respuesta habla de una mente que busca certeza antes que alivio.",
    "Sentir inquietud incluso en un día libre muestra que tu descanso está ocupado por dentro. En la práctica, eso aparece cuando intentas parar y aun así sigues revisando mentalmente lo pendiente. Esa respuesta deja ver que lo que más te cuesta no es descansar, sino soltar."
   ],
   "chat_snapshot_note": "Tu preocupación central no es solo el cansancio; es que el descanso nunca te sabe a descanso. A eso se suma una ansiedad suave, pero constante, que se queda pegada a los momentos de pausa y hace que el cuerpo descanse antes que la mente. La frase que se queda es esta: no te falta parar, te falta sentir que parar sirve.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque llegan justo donde más frágil está tu recuperación. No activan solo una tarea; activan la idea de que no puedes aflojar sin quedarte atrás. Ahí el perfeccionismo y la madera se juntan y hacen que una simple notificación pese más de lo normal.",
   "chat_repeat_note": "Tu patrón se mueve en dos tiempos: acumulas mucho mientras aguantas, y luego la energía cae de golpe. En medio, eliges seguir afinando en vez de cortar a tiempo, y eso hace que el desgaste se junte en un solo punto. Una salida pequeña empieza por frenar una revisión antes de la tercera pasada.",
   "chat_fear_note": "Debajo de todo está el miedo a quedarte atrás si paras. No es un miedo caprichoso; es la forma que toma tu necesidad de seguir siendo útil y visible. Cuando lo miras así, se entiende mejor por qué descansar te cuesta tanto: no quieres perder posición.",
   "psychology_fact_heading": "Modelo de demandas y recursos laborales de Bakker y Demerouti",
   "psychology_fact_body": "Este modelo dice que el agotamiento aparece cuando las demandas pesan más que los recursos disponibles para sostenerlas. Las demandas pueden ser cantidad de trabajo, presión por hacerlo bien o tensión constante; los recursos pueden ser autonomía, reconocimiento o tiempo de recuperación. En tu caso, el perfeccionismo alto suma demanda interna, y la recuperación baja deja poco margen para reponer energía. Por eso tu patrón no se ve como pereza ni como falta de capacidad, sino como un desequilibrio sostenido entre lo que das y lo que vuelve.",
   "psychology_takeaway": "No te falta empuje; te falta salida para lo que ya entregaste. Cuando el día solo pide y casi no devuelve, el agotamiento se vuelve el fondo de la escena.",
   "strengths": [
    {
     "title": "Criterio claro",
     "body": "Tu Maestro del Día de metal se nota en que sabes distinguir lo que está bien hecho de lo que todavía no cierra. Esa capacidad aparece en tu manera de revisar y de no conformarte con una versión floja. Se ve, por ejemplo, cuando una tarea ya está lista, pero tú detectas un detalle que nadie más habría visto. Esa mirada te da dirección cuando otros solo ven ruido."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión eterna",
     "body": "Tu impulso de revisar una y otra vez hace que cerrar cueste más de lo necesario. No es falta de criterio, sino exceso de vigilancia sobre lo que ya quedó bastante bien. Se nota en el momento en que vuelves al principio solo para comprobar algo que ya habías resuelto."
    },
    {
     "title": "Descanso tenso",
     "body": "Cuando paras, tu cuerpo se detiene antes que tu mente. Eso hace que el descanso se llene de inquietud y no de alivio. Se ve en esos días libres en los que estás sentado, pero sigues pendiente de lo que vendrá."
    },
    {
     "title": "Acumulación brusca",
     "body": "Tu energía tiende a juntarse hasta que ya no cabe más. Entonces sigues un poco más y después te vienes abajo de golpe. Esa forma de sostener sin descargar se nota en jornadas en las que todo parece ir bien, hasta que de pronto ya no puedes con nada."
    },
    {
     "title": "Miedo a frenar",
     "body": "Frenar te hace sentir que podrías perder lugar. No porque quieras correr siempre, sino porque descansar toca una zona muy sensible de tu seguridad interna. Se nota cuando un mensaje simple basta para devolverte al modo alerta."
    }
   ],
   "fit_good": "Te va mejor un entorno donde puedas cerrar tareas con criterios claros y sin interrupciones constantes. Si empiezas el día sabiendo qué se espera y cuándo se termina, tu energía se ordena mejor y no se queda girando sola. También te ayuda mucho tener un margen real para revisar una vez, no cinco.",
   "fit_bad": "Te desgasta un entorno con mensajes urgentes a cualquier hora y cambios de prioridad sin aviso. Si cada cierre vuelve a abrirse, tu mente se queda en revisión permanente y el cansancio sube rápido. También te pesa mucho trabajar donde el esfuerzo nunca se reconoce y solo se pide un poco más.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Cuando termines una tarea, haz una sola revisión final de 10 minutos y cierra el archivo. Si aparece el impulso de volver, anótalo en una lista aparte y retómalo solo al día siguiente. Así separas terminar de seguir gastando energía."
    },
    {
     "title": "Pausa breve",
     "body": "Después de cada bloque de trabajo, para 5 minutos sin pantalla ni mensajes. Hazlo dos o tres veces al día, no solo al final. Esa pausa corta le da a tu mente una salida antes de que la tensión se acumule."
    },
    {
     "title": "Lunes protegido",
     "body": "Los lunes, entra a los mensajes a una hora fija y no antes. Si puedes, revisa primero tu lista propia durante 15 minutos para no arrancar desde la alerta. Así evitas que una notificación marque todo el tono del día."
    },
    {
     "title": "Descanso visible",
     "body": "Deja escrita una señal concreta de cierre al terminar tu día, como la siguiente acción ya preparada para mañana. Léela solo una vez antes de salir de la mesa. Eso ayuda a que tu mente no siga buscando lo pendiente por la noche."
    }
   ],
   "mindset_guide": "No todo lo que queda sin revisar queda mal. A veces queda bien y solo sigue pidiendo tu atención porque tu estándar es muy alto. Piensa en una mesa llena de papeles: si no apartas algunos, no ves el centro. Tu mente hace algo parecido con el trabajo. No necesitas vaciarla toda. Necesitas distinguir lo importante de lo que solo sigue haciendo ruido.",
   "closing_title": "Lo que sí cambia",
   "closing_body": "De los 41 a los 50 años, el metal toma más fuerza y deja de empujarte solo hacia la revisión infinita. Lo que hoy se siente como cansancio con tensión empieza a volverse una forma más clara de ordenar tu energía, y eso baja la presión del día a día. En este módulo, la diferencia se nota en algo muy concreto: el descanso deja de sentirse como una pausa vacía y empieza a dejar espacio real. Casey, lo que hoy te agota no se queda para siempre igual."
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
 "mia": {
  "content": {
   "title_line1": "When the unread message feels louder than the room",
   "title_line2": "You chase closeness, then brace for the worst before it arrives",
   "subtitle": "Module 1 · Love & Attachment deep report — saju × psychological test × counseling integration",
   "opening_scene": "It’s late, and your phone is still face-up beside you. A read receipt sits there with no answer, and your thumb keeps hovering over the chat like it might pull a reply out of the screen. In your head, the same line keeps looping: if they’re this quiet, did I do something wrong? You’ve already sent one more message, then stared at it long enough to feel embarrassed by your own hope. Mia, isn’t this feeling a little too familiar lately?",
   "case_tag": "EXAMPLE CASE — Nora, early 30s, waiting on a reply",
   "case_paragraphs": [
    "Nora checks her phone every few minutes after her partner leaves a message on read, and by dinner she has already drafted two follow-up texts she never meant to send. Her day keeps shrinking around that silence, even though nothing else has changed in the room. Her Five Elements pattern is also lopsided in the same way: Wood is strong, while Water is weak. You can see the same shape in her relationship habits, and you can feel how easily this could be your story too."
   ],
   "oheng_intro": "Your Wood is strong at 38%, while Water is weak at 13%, so the pattern is tilted toward holding on more than letting words flow out easily. With your Day Master as Metal, that means the strong Wood is the energy you try to grip and manage, while weak Water is the energy you send outward as expression and emotional release. In a love module, that often looks like trying to secure the bond fast, before the silence gets a chance to grow teeth.",
   "quiz_reading": "Your anxiety is at 82%, and your avoidance sits at 34%, which makes you an Anxious-Preoccupied type. That mix shows up as checking the chat again and again when a reply is late, then trying to act cool once the answer finally comes through. The feeling is not that you want less closeness; it’s that closeness starts to feel unstable the second the screen stays quiet.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — the grip that won’t let go",
     "body": "At 38%, Wood is strong, and in your chart it is the energy you try to hold, manage, and secure. That fits the moment you see a message marked read and immediately start building meaning around the delay. Strong Wood can make the relationship feel like something you must steady with your own hands, even before the other person has said a word. In your case, that grip shows up as urgency that arrives faster than calm."
    },
    "fire": {
     "heading": "🔥 Fire weak — the spark that flickers instead of staying bright",
     "body": "Fire is at 13%, so it is weak, and the chart does not give you much easy warmth to burn through uncertainty. In a love moment, that can feel like the bright, open part of you gets crowded out by the need to monitor the thread instead of simply staying in the feeling. You may know the emotional temperature instantly, but you do not always get to stay inside it for long. That is why a late reply can feel bigger than the reply itself."
    },
    "earth": {
     "heading": "⛰️ Earth weak — the ground that does not fully settle the wait",
     "body": "Earth is also 13%, so it is weak, and the chart does not naturally slow the moment down for you. When a message is read and left there, you do not get much built-in settling; your mind wants a result, not a pause. That is why you can go from one check-in text to regret so quickly. The day does not hold its shape for long when the relationship feels uncertain."
    },
    "metal": {
     "heading": "💎 Metal moderate — the part of you that notices before it speaks",
     "body": "Metal is 25%, which is moderate, and it gives you the sharpness to read a shift before you have proof. Because your Day Master is Metal, this is not just a number; it is the lens through which you notice tone, timing, and distance. In a relationship, that can make you the first person to sense something is off, even when the other person has not said anything yet. The same precision that helps you read the room can also make silence feel louder than it is."
    },
    "water": {
     "heading": "💧 Water weak — the words that need support to keep moving",
     "body": "Water is at 13%, so it is weak, and this is the energy you send out as expression and emotional flow. Your chart says that Metal helps Water, so structure and clarity are what let your feelings move instead of getting stuck at the edge of a text thread. That matches the way you screenshot the chat and ask a friend if it’s fine; you borrow structure from outside yourself when the feeling gets too raw. When Water is low, expression can turn into repeated checking first and honest softness later."
    }
   },
   "upcoming_period_preview_heading": "33 years old, Water starts opening the next chapter",
   "upcoming_period_preview_body": "At age 33, a new 10-year cycle begins, and Water grows stronger. That shift can make expression and emotional flow easier to carry, so the quiet between messages may feel less harsh than it does now. The same late reply can still sting, but it does not have to land on such dry ground.",
   "module_map": {
    "title": "Your relationship alarm",
    "body": "What turns your alarm on is not just silence; it is a read message with no reply for hours. Once that happens, your system does not stay neutral for long, and you move toward the connection instead of away from it. The checking texts in a row are your protest behavior, and the coldness that follows once they answer is the quieter side of the same loop. This is the shape your attachment takes when closeness feels uncertain: first reach, then sting, then distance."
   },
   "module_deep": {
    "title": "A relationship that feels like a safe base",
    "body": "A relationship that feels like a safe base for you is not one with perfect constant contact; it is one with readable contact. You need enough clarity that a late reply does not instantly become a story about abandonment. The best check-in style for you is simple and direct: one honest message, then a pause that lets the other person meet you halfway. If you want a sentence to ask for that, try: “If you’re busy, just tell me you’ll reply later, and I’ll be fine.”"
   },
   "strengths_preview": [
    {
     "title": "Mood sensing",
     "body": "You read their mood first, which means you catch the temperature of the relationship before most people would even name it. That sensitivity is why a late reply does not feel small to you; you can feel the shift in the room through the screen. In practice, this is the part of you that notices a pause, a shorter line, or a different tone before anyone says the quiet part out loud."
    },
    {
     "title": "Deep loyalty",
     "body": "When you care, you stay emotionally engaged instead of half-investing and drifting off. The fact that you keep checking rather than simply walking away shows how strongly you want the bond to stay alive. In real life, that can look like holding the relationship in mind even while you’re busy with the rest of your day."
    },
    {
     "title": "Repair drive",
     "body": "You do not just want contact; you want the thread between you to be mended once it frays. The repeated check-in texts show a strong wish to reconnect before the gap gets wider. Even the regret that follows tells us you are aware of the cost and still want to find a better way back."
    }
   ],
   "upcoming_period_heading": "33 years old, the next chapter opens with Water",
   "upcoming_period_body": "At age 33, Water becomes stronger in your 10-year cycle, so the part of you that expresses, names, and releases feeling gets more room to move. That means the same late reply does not have to push you straight into a spiral; the gap can become something you notice without immediately filling it. You can prepare by making room for your own response before you reach for theirs, because that is where this future chapter changes the tone of the whole day. The relationship will still matter, but it will no longer be the only thing holding your mood together.",
   "cross_analysis_quotes": [
    "A read message with no reply for hours is the exact moment your nervous system hears danger. You feel the alarm rise fast, and you want to know what changed right away. That is why silence can feel bigger than the message itself.",
    "Your 82% anxiety is not just a number; it is the engine behind the repeated check-in texts. Your lower avoidance means you move toward contact instead of pulling away first. When you feel unsure, you keep reaching for reassurance instead of letting the distance sit.",
    "The same Wood strength that helps you hold on also makes silence feel like something you must manage immediately. Wood is the part of your Five Elements that helps you grasp what matters in real life, including work, money, and what you are trying to build. When that energy is strong, you may try to act fast so the situation does not slip away."
   ],
   "answer_notes": [
    "Your answer to the slow-reply item shows a mind that tries to restore contact before uncertainty can harden. In daily life, that becomes the urge to send one more text while pretending you are only checking in. The hand that reaches for the phone is also the hand that wants relief, not drama.",
    "Your answer to the closeness item shows that intimacy does not scare you in the usual avoidant way; it actually lets you settle. In real life, that can look like relaxing when the bond feels clear, then getting thrown off only when distance enters the picture. You are not trying to escape closeness; you are trying to make it feel safe enough to stay in."
   ],
   "chat_snapshot_note": "You came in with the question of what to do when a reply is late, and the feeling underneath it was anxious and a little hurt. The hurt is not separate from the anxiety; it is what makes the silence feel personal so quickly. The line worth saving is this: you are not asking for too much when you want the day to stay intact.",
   "chat_trigger_note": "A message read but not answered is a small event that lands like a much bigger one for you. It hits the same place as your 82% anxiety: the mind starts searching for a cause before the other person has even spoken. Because your Water is weak, the feeling has less room to flow out naturally, so it tightens into checking, waiting, and replaying.",
   "chat_repeat_note": "The loop is clear: you send check-in texts in a row, then regret it once the answer finally comes. In that moment, you choose contact first and self-protection second, then switch to coldness to recover a little control. A smaller way out is to pause long enough to write the text and not send it yet, so the urge has somewhere to land before it turns into action.",
   "chat_fear_note": "Under the late-reply anxiety is the fear that they will leave in the end. That fear is not foolish; it is the part of you that wants the bond named clearly instead of guessed at through silence. What you are really asking for is not certainty about the future, but a steadier present.",
   "psychology_fact_heading": "Bowlby and attachment protest behavior",
   "psychology_fact_body": "John Bowlby described attachment as a system that activates when connection feels threatened. In that framework, protest behavior is what people often do when a bond seems unavailable: they reach, check, and try to restore contact. Your repeated texts fit that pattern closely, especially because the behavior starts when the reply is late rather than after a real conversation about distance. The point is not that you are being difficult; it is that your attachment system is trying to re-establish safety fast.",
   "psychology_takeaway": "When silence hits, your system reaches before it settles.\nWhat you are calling neediness is often just attachment trying to get back to safe ground.",
   "strengths": [
    {
     "title": "Direction setting",
     "body": "Your Metal Day Master shows up as a strong instinct to read the shape of the situation and name where it is headed. In love, that means you do not drift blindly; you notice the turn early and want to know what it means. One clear example is how fast you can tell when a read message has changed the mood of the whole evening."
    }
   ],
   "weaknesses": [
    {
     "title": "Urgent checking",
     "body": "When the reply is slow, your mind does not rest in uncertainty; it starts pushing for proof. That is why you send one check-in after another and then feel the sting of regret. The same speed that helps you act quickly can make the waiting feel unbearable."
    },
    {
     "title": "Aftershock coolness",
     "body": "Once the answer arrives, you can pull back and act cold as a way to recover some control. That does not mean you stopped caring; it means the earlier hurt still has momentum. A quieter version of this would be to let a little time pass before answering, so the response is less loaded."
    },
    {
     "title": "Self-last habit",
     "body": "You said you read their mood first and put your own feelings last, and that habit makes your inner state easy to overlook. In the moment, it looks considerate; later, it leaves you carrying the whole day alone. The pattern is visible when you keep checking the chat while ignoring your own hunger, work, or fatigue."
    },
    {
     "title": "Fear of ending",
     "body": "The thought underneath the spiral is that they might leave in the end. That fear makes ordinary delays feel like signs instead of pauses. It also explains why reassurance matters so much when the bond goes quiet."
    }
   ],
   "fit_good": "You do better in a relationship rhythm where replies do not have to be instant, but they do have to be clear. A day that includes work, errands, and a calm check-in later gives your mind something solid to stand on. When the connection is steady enough to read, you can keep your focus on the rest of your life instead of losing the whole afternoon to one thread.",
   "fit_bad": "You struggle in a dynamic where messages are left on read for hours and then answered as if nothing happened. A stop-start rhythm like that keeps your attention pinned to the screen and turns your mood into a weather report for the relationship. By evening, you can end up acting cold just to get some of yourself back.",
   "behavior_guides": [
    {
     "title": "Pause first",
     "body": "When you feel the urge to send a second check-in, wait ten minutes before doing anything. Put the phone face-down and do one fixed task, like making tea or washing a dish. If the urge is still there after that, send one clear message instead of a string."
    },
    {
     "title": "Name the need",
     "body": "Once a day, write one sentence that says what you actually want from the relationship, not what you fear. Keep it short and specific, like wanting a later reply to be acknowledged. This helps you separate the need for connection from the panic around silence."
    },
    {
     "title": "Keep one lane",
     "body": "When you are waiting, keep your day moving in one visible lane, such as work or a planned errand. Do not build the whole afternoon around the chat window. The goal is to let the relationship exist inside your day, not replace it."
    },
    {
     "title": "Answer slowly",
     "body": "If you feel that cold switch flip on after they reply, wait a little before answering back. Use that gap to notice whether you are hurt, embarrassed, or just tired. Then reply from the feeling that is true, not from the one that is trying to protect you."
    }
   ],
   "mindset_guide": "Think of your attachment system like a smoke alarm, not a verdict. It is loud because it wants attention, not because the whole house is burning. A late reply is a trigger, but it is not proof of abandonment. When you hear the alarm, your job is to check the room, not to run outside with your whole heart in your hands.",
   "closing_title": "The reply is not the whole story",
   "closing_body": "At age 33, Water becomes the stronger current in your 10-year cycle, and that can change how silence feels in your body. The same late reply that used to take over the evening can lose its grip on the rest of your day. In this love pattern, the shift is not that you stop caring; it is that your care no longer has to turn into panic to prove itself. What stays with you is this: the bond can matter, and your day can still stay yours."
  },
  "quizDiagnosis": {
   "moduleId": "module1",
   "moduleTitle": "Module 1 · Love & Attachment",
   "track": "romance",
   "answers": [
    {
     "qId": "qa-0",
     "prompt": "When my partner is slow to reply I…",
     "label": "Keep wanting to check what's going on",
     "dimension": "anxiety",
     "score": 3
    },
    {
     "qId": "qa-1",
     "prompt": "The closer we get, the more I…",
     "label": "Relax",
     "dimension": "avoidance",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "anxiety",
     "rawScore": 24.6,
     "maxScore": 30,
     "percentOfMax": 82,
     "distanceFromMid": 64,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "avoidance",
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
     "anxiety"
    ],
    "kind": "single",
    "typeKey": "anxiety"
   },
   "typeInfo": {
    "title": "Anxious-Preoccupied",
    "hook": "Often needs reassurance about the relationship and reacts strongly to a partner's cues."
   },
   "nuancedSummary": "Anxiety runs high and avoidance runs low.",
   "dimensionShortNames": {
    "anxiety": "Anxiety",
    "avoidance": "Avoidance"
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
   "primary_concern": "When a reply is late, I fall apart",
   "emotional_state": "Anxious and a little hurt",
   "trigger_point": "A message read but not answered",
   "repeat_pattern": "Sending check-in texts in a row, then regretting it",
   "core_fear_or_meaning": "I'm scared they'll leave in the end",
   "summary_quote": "When a reply is late, I fall apart",
   "integrated_summary": "The moment a reply runs late, the anxiety switches on; you send check-in texts one after another and then regret it. Underneath is the fear that they will leave in the end.",
   "coping": "I screenshot the chat and ask a friend if it's fine",
   "relational": "I read their mood first and put my own feelings last",
   "desired_change": "I want to keep my day intact even when a reply is late",
   "module_fields": {
    "attachment_alarm": "A message read with no reply for hours",
    "protest_or_deactivate": "Texting again and again, then acting cold once they answer"
   }
  }
 },
 "jisoo": {
  "content": {
   "title_line1": "끝낸 자리에서도 손이 멈추지 않는 사람",
   "title_line2": "쉬어도 다시 훑게 되는 마음의 결이 지수님을 붙잡고 있어요",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침, 메신저 알림이 울리기 전부터 손이 먼저 화면 위에 올라가 있어요. 일은 끝났는데도 머릿속에서는 방금 마친 일을 다시 처음부터 훑고, 빠뜨린 게 없는지 순서를 세어 봐요. 쉬는 날에도 마음이 편하지 않아서, 몸은 멈췄는데 안쪽은 계속 일하고 있는 느낌이 남아 있어요. 지수님, 요즘 이런 모습 아니세요?",
   "case_tag": "가상 사례 — 민지, 30대 초반, 기획 업무",
   "case_paragraphs": [
    "민지는 오후 11시가 넘어서도 보고서를 다시 열어 봐요. 이미 제출한 파일인데도 문장 하나, 숫자 하나가 자꾸 눈에 걸려서요. 토 기운이 강한 사람답게 일을 붙잡는 힘은 좋지만, 쉬는 쪽은 자꾸 뒤로 밀려요. 당신도 비슷하게 끝낸 뒤에 더 지치는 날이 있지 않나요?"
   ],
   "oheng_intro": "지수님은 토 50%가 우세하고 수 0%가 약한 분포예요. 일간이 갑이라서 토는 지수님이 현실과 일을 붙잡는 기운으로 읽히고, 수는 지수님을 살려 주는 지원과 배움의 기운으로 읽혀요. 이번 번아웃 모듈에서는 붙잡는 힘은 강한데, 살려 주는 흐름이 비어 있어서 쉬어도 마음이 쉬지 않는 장면으로 드러나요.",
   "quiz_reading": "지수님은 완벽주의 82%가 높고 회복 34%가 낮은 편이에요. 유형 이름 그대로 끝까지 해내는 힘은 있는데, 끝난 뒤에 마음이 바로 놓이지 않아서 다시 처음부터 훑는 장면으로 이어져요. 그래서 겉으로는 마무리한 하루인데, 안에서는 아직도 점검이 멈추지 않아요.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 강하다 — 시작은 빠르고, 머리는 끝까지 뻗어요",
     "body": "목 33%는 지수님 안에서 꽤 분명하게 살아 있는 편이에요. 일을 보면 바로 구조를 잡고, 다음 수순을 생각하는 힘이 있어요. 완벽주의 82%와 만나면 이 힘이 한 번 더 뻗어서, 끝낸 뒤에도 다시 처음부터 훑게 만들어요."
    },
    "fire": {
     "heading": "🔥 화 약하다 — 바로 타오르기보다 안쪽에서만 열려 있어요",
     "body": "화 0%는 겉으로 확 올라오는 추진보다, 안쪽에서 조용히 버티는 쪽을 보여줘요. 지수님은 급하게 내달리는 날보다, 오래 붙들고 끝내는 날에 더 익숙해 보여요. 그래서 번아웃이 와도 티가 확 나기보다, 어느 순간 갑자기 지치는 식으로 쌓이기 쉬워요."
    },
    "earth": {
     "heading": "⛰️ 토 강하다 — 현실을 손에 쥐고 끝까지 놓지 않아요",
     "body": "토 50%는 지수님이 일을 실제로 굴리는 힘이에요. 마감, 숫자, 일정처럼 손에 잡히는 것들을 잘 붙잡고 버텨요. 다만 회복 34%가 낮은 편이라, 이 힘이 오래 가기보다 오래 쥔 만큼 더 무거워지는 장면이 나와요."
    },
    "metal": {
     "heading": "💎 금 보통 — 선을 긋고 정리하는 감각은 분명해요",
     "body": "금 17%는 지수님이 일을 정리하고 기준을 세우는 감각을 보여줘요. 그래서 흐트러진 것을 보면 그냥 넘기기보다, 다시 맞춰 보고 싶은 마음이 생겨요. 완벽주의가 높을 때 이 금의 성질은 점검을 돕지만, 쉬는 날에도 마음이 계속 정리 모드로 남게 만들 수 있어요."
    },
    "water": {
     "heading": "💧 수 약하다 — 쉬게 하는 물살이 조금 부족해요",
     "body": "수 0%라서 지수님 안에는 일을 잠시 내려놓고 회복 쪽으로 데려가는 흐름이 얇아요. 금이 수를 살려 주는 관계가 있어도, 지금 수치에서는 그 도움을 크게 체감하기가 쉽지 않아요. 그래서 쉬는 날에도 마음이 편하지 않고, 뒤처질까 봐 멈추지 못하는 장면으로 이어져요."
    }
   },
   "upcoming_period_preview_heading": "36세부터, 수의 계절이 열립니다",
   "upcoming_period_preview_body": "36세부터 45세까지는 수 기운이 강해지는 시기예요. 지금처럼 일을 붙드는 힘만으로 버티는 방식에서, 지수님을 살려 주는 흐름이 함께 들어오는 장면으로 바뀌어요. 마른 공기 같던 하루에 물기가 스며들듯, 마음이 덜 마르는 쪽으로 결이 달라집니다.",
   "module_map": {
    "title": "에너지 수지표",
    "body": "지수님에게 빠져나가는 쪽은 완벽주의 82%예요. 일을 끝낸 뒤에도 다시 처음부터 훑게 만드는 그 습관이, 하루의 에너지를 계속 사용하게 해요. 채워 주는 쪽은 회복 34%와 수 0%가 가리키는 휴식 자원이 얇은 지점이에요. 그래서 소진이 두드러지고, 냉소보다 먼저 ‘쉬어도 쉬지 못한다’는 감각이 앞에 와요."
   },
   "module_deep": {
    "title": "다시 채우는 순서",
    "body": "지수님은 먼저 점검을 조금 내려놓아야 해요. 이미 끝낸 일을 다시 처음부터 훑는 습관이 에너지를 가장 많이 가져가니까, 오늘은 마감 직후 10분만 화면을 닫는 쪽부터 시작하면 좋아요. 그다음에는 회복을 ‘쉬는 날 한 번’이 아니라 ‘일이 끝난 뒤 바로 붙는 짧은 공백’으로 채워 주세요. 마지막으로는 월요일 아침 알림처럼 긴장을 깨우는 신호가 와도, 바로 응답하기 전에 물 한 컵을 마시고 3분만 손을 멈추는 순서를 넣어 보세요. 이렇게 하면 일을 더 적게 하는 게 아니라, 지수님이 덜 비워진 상태로 일을 이어갈 수 있어요."
   },
   "strengths_preview": [
    {
     "title": "마감 책임감",
     "body": "지수님은 일을 끝까지 닫아 두려는 힘이 있어요. 실제로 일을 끝낸 뒤 다시 처음부터 훑어본다고 답한 것은, 대충 넘기지 않으려는 책임감이 분명하다는 뜻이에요. 끝난 뒤에도 다시 점검이 이어지는 태도에서 그 힘이 드러나요."
    },
    {
     "title": "지속 버팀",
     "body": "몰아서 하고 무너지는 패턴 속에서도 지수님은 한동안은 버텨 내요. 감정적으로 지쳤고 조금 불안한 상태에서도 일을 계속 붙드는 건, 쉽게 끊어지지 않는 지속력이 있다는 뜻이에요. 월요일 아침 메신저 알림이 긴장을 다시 올릴 때도 그 흐름을 붙잡으려는 힘이 있어요."
    },
    {
     "title": "높은 기준",
     "body": "지수님은 스스로에게 높은 기준을 두는 편이에요. 완벽주의 82%는 그냥 깐깐함이 아니라, 결과를 허술하게 두고 싶지 않은 마음으로 읽혀요. 보고서를 다시 펼쳐서 문장 하나를 더 보는 장면이 그 기준을 보여줘요."
    }
   ],
   "upcoming_period_heading": "36세부터 시작되는 다음 장",
   "upcoming_period_body": "36세부터 45세까지 이어지는 수의 흐름은 지수님에게 회복의 재료를 더 또렷하게 가져와요. 지금은 끝낸 뒤에도 다시 훑는 힘이 앞서지만, 그 시기에는 일만 붙잡는 방식에서 한 발 물러나 숨을 고르는 감각이 함께 살아납니다. 그래서 같은 업무를 해도 남는 무게가 조금 달라지고, 하루를 닫는 방식도 더 부드러워져요. 그때를 위해서는 지금부터 결과만 보지 말고, 일을 마친 뒤 마음을 내려놓는 짧은 틈을 남겨 두는 연습이 필요해요.",
   "cross_analysis_quotes": [
    "토 50%는 지수님이 일을 끝까지 붙드는 힘이에요. 완벽주의 82%가 여기에 붙으면서, 끝낸 뒤에도 다시 처음부터 훑는 장면이 생겨요. 그래서 마무리의 강점이 곧 소진의 속도가 되기도 해요.",
    "수 0%는 쉬는 쪽의 재료가 얇다는 뜻이에요. 회복 34%가 낮은 편이라는 결과와 같이 보면, 쉬어도 마음이 불편한 이유가 더 분명해져요. 몸은 멈춰도 안쪽은 계속 일하는 상태가 여기서 만들어져요."
   ],
   "answer_notes": [
    "다시 처음부터 훑어본다는 답은 지수님이 결과를 대충 넘기지 않는 사람이라는 걸 보여줘요. 그래서 실제로는 일을 끝냈는데도 마음속에서는 계속 검토가 이어져요. 그 꼼꼼함은 강점이지만, 쉬는 순간까지 점검으로 채우지 않도록 잠깐 멈춤을 허락해도 좋아요.",
    "쉬어도 마음이 불편하다는 답은 지수님이 휴식 중에도 역할을 놓기 어려워한다는 뜻이에요. 그래서 쉬는 날에도 알림이 떠오르면 바로 긴장이 올라와요. 그런 반응이 있다는 걸 알아차린 것만으로도, 지수님은 이미 회복 쪽을 보기 시작한 거예요."
   ],
   "chat_snapshot_note": "지수님은 쉬어도 쉬는 것 같지 않다는 고민을 꺼내셨어요. 그 말 뒤에는 지쳤고 조금 불안한 상태가 붙어 있었고, 그래서 휴식이 휴식으로 느껴지지 않았어요. 남기고 싶은 문장은 이거예요, 쉬는 시간인데도 마음이 계속 출근하고 있어요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 그냥 알림이 아니에요. 이미 지쳐 있는 마음을 다시 점검 모드로 돌려 놓는 촉발점이에요. 완벽주의 82%와 붙으면, 그 한 번의 울림이 하루 전체의 긴장을 다시 세웁니다.",
   "chat_repeat_note": "몰아서 하고 무너지는 패턴은 지수님이 오래 버티다가 한 번에 꺼지는 방식으로 굴러가요. 그 안에서 지수님은 중간에 힘을 나눠 쓰기보다, 끝까지 밀어붙인 뒤에야 멈추는 선택을 해요. 아주 작은 틈이라도 미리 넣어 두면, 무너지는 지점이 조금 뒤로 밀려나요.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 두려움은 지수님이 일을 가볍게 보지 않는다는 뜻이에요. 그 밑에는 잘 해내고 싶고, 놓치고 싶지 않은 마음이 있어요. 그래서 멈춤이 포기가 아니라 다음 일을 더 오래 하기 위한 준비가 되도록 봐도 좋아요.",
   "psychology_fact_heading": "직무 요구-자원 모형",
   "psychology_fact_body": "직무 요구-자원 모형은 일이 요구하는 양과 감정적 압박이 크고, 회복 시간이나 자율성 같은 자원이 부족할 때 소진이 커진다고 봐요. 지수님은 완벽주의 82%로 요구를 더 크게 받아들이고, 회복 34%로 자원은 적게 느끼는 구조예요. 그래서 같은 일을 해도 남는 피로가 커지고, 쉬는 시간조차 마음이 일에서 떨어지지 않아요. 이 모형으로 보면 지수님의 번아웃은 의지가 약해서가 아니라 균형이 기울어진 결과로 읽혀요.",
   "psychology_takeaway": "지수님은 게으른 게 아니라, 너무 오래 붙잡고 있었던 거예요. 일을 끝내는 힘만큼, 끝난 뒤 놓는 힘도 같이 봐야 해요.",
   "strengths": [
    {
     "title": "구조 감각",
     "body": "지수님은 흐트러진 일을 다시 구조로 세우는 힘이 있어요. 일간이 갑이라서 방향을 잡는 성향이 있는데, 완벽주의 82%와 만나면 그 힘이 더 또렷해져요. 보고서를 다시 펼쳐 순서를 정리하는 장면이 바로 그 감각이에요."
    }
   ],
   "weaknesses": [
    {
     "title": "과점검",
     "body": "지수님은 끝낸 뒤에도 점검을 멈추기 어려워요. 다시 처음부터 훑는 행동이 반복되면서, 쉬는 시간까지 검토로 채워져요. 이건 대충 해서가 아니라, 기준이 너무 높아서 생기는 피로예요."
    },
    {
     "title": "휴식불안",
     "body": "쉬는 날에도 마음이 불편한 건, 멈춤이 익숙하지 않다는 뜻이에요. 몸은 쉬는데 생각은 다음 일을 찾고 있어서, 휴식이 자꾸 업무의 연장처럼 느껴져요. 월요일 알림이 다시 울릴까 봐 긴장을 놓지 못하는 장면이 여기에 있어요."
    },
    {
     "title": "몰아버팀",
     "body": "지수님은 중간에 조금씩 풀기보다 한꺼번에 몰아붙이는 쪽으로 가요. 그래서 평소에는 버티는 것처럼 보여도, 어느 순간 확 무너질 수 있어요. 작업을 쪼개서 중간 확인을 넣지 않으면 이 패턴이 더 쉽게 반복돼요."
    },
    {
     "title": "뒤처짐 두려움",
     "body": "멈추면 뒤처질까 봐 멈추지 못하는 마음이 있어요. 그래서 쉬는 선택조차 손해처럼 느껴질 수 있어요. 하지만 그 두려움이 강할수록, 오히려 잠깐 멈추는 장면을 의식적으로 만들어야 해요."
    }
   ],
   "fit_good": "지수님에게는 마감이 분명하고 중간 확인이 가능한 환경이 잘 맞아요. 하루가 끝날 때 결과를 한 번 정리하고 닫는 습관이 있는 곳이면, 불필요한 재점검이 줄어들어요. 혼자 오래 버티기보다, 일정과 기준이 앞에서 정리되는 방식이 더 편해요.",
   "fit_bad": "지수님에게는 알림이 계속 밀려오고, 끝난 뒤에도 바로 다음 일을 붙이는 환경이 부담스러워요. 월요일 아침 메신저처럼 예고 없이 긴장을 깨우는 분위기가 자주 있으면 회복이 더 어려워질 수 있어요. 결과를 자주 다시 뒤집어 보는 문화는 지수님을 더 지치게 만들 수 있어요.",
   "behavior_guides": [
    {
     "title": "마감 종료",
     "body": "일을 끝낸 직후 10분 동안은 파일을 다시 열지 말고 화면을 닫아 두세요. 그 시간에는 메모만 한 줄 적고, 다시 확인은 내일 첫 15분으로 미뤄요. 매번 같은 방식으로 닫으면 점검이 습관적으로 새어 나가는 걸 줄일 수 있어요."
    },
    {
     "title": "알림 지연",
     "body": "월요일 아침 첫 메신저 알림이 오면 바로 답하지 말고 3분만 기다려 보세요. 그 사이에 숨을 고르고 오늘 할 일 1개만 적어요. 알림과 반응 사이에 짧은 틈을 넣는 연습이에요."
    },
    {
     "title": "회복 예약",
     "body": "쉬는 날에는 ‘쉬어야지’보다 ‘오후 4시에 20분 걷기’처럼 시간을 박아 두세요. 회복 34%처럼 낮은 상태에서는 마음만으로 쉬기가 어려워요. 정해진 슬롯이 있어야 지수님은 쉬는 시간을 진짜 쉬는 시간으로 받아들여요."
    },
    {
     "title": "중간 점검",
     "body": "큰 일을 몰아서 하기 전에 중간 점검을 두 번만 넣어 보세요. 오전 한 번, 마감 전 한 번처럼요. 한 번에 무너지는 흐름을 잘게 끊어 주는 방식이에요."
    }
   ],
   "mindset_guide": "번아웃은 모래주머니처럼 눈에 띄지 않게 무게가 쌓여요. 지수님은 그 무게를 한 번에 들고 가려 해서 더 지치는 거예요. 조금씩 비우는 쪽이 약한 게 아니라 오래 가는 방식이에요. 끝내는 힘이 센 사람일수록, 비우는 순서가 먼저 필요해요.",
   "closing_title": "끝낸 뒤의 공백",
   "closing_body": "36세부터 45세까지는 수 기운이 강해지는 시기예요. 지금의 지수님은 토 50%로 일을 붙들고 수 0%로 쉬는 쪽이 비어 있지만, 36세부터 45세까지는 마음이 덜 마른 상태로 하루를 닫는 흐름이 들어올 수 있어요. 월요일 아침 메신저 알림이 다시 와도, 예전보다 긴장을 다루는 방식이 조금 달라질 가능성이 있어요. 지수님, 끝까지 해내는 사람에게도 이제는 끝난 뒤 놓아 주는 시간이 생깁니다."
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
 "jordan": {
  "content": {
   "title_line1": "When the work is done, your mind keeps the ledger open",
   "title_line2": "You finish things cleanly, but the feeling of being finished never arrives",
   "subtitle": "Module 3 Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late, the screen is still lit, and your fingers hover over a finished task as if one more check could finally make it feel complete. Monday-morning messages sit in the background like a silent alarm, and even when nothing is actively wrong, your mind keeps asking whether you missed something. You look like someone who has already carried the day to the end, but inside, the day never really closes. Jordan, doesn’t this feel like your evenings lately?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, working full-time",
   "case_paragraphs": [
    "Mina wraps up her reports before dinner, then opens them again after dinner because the first finish never feels trustworthy. Her week has a sharp rhythm: cram hard, get things done, then crash so suddenly that even rest feels like another task. Her Five Elements are tilted in a similar way, with earth and metal both heavy, so the whole day starts to feel governed by pressure and checking rather than release. You can see yourself in that loop, too."
   ],
   "oheng_intro": "Your Five Elements are dominated by earth at 38% and metal at 38%, while wood sits at 0%. For a Water Day Master, that means the pressing side of life feels strong, and the part that should be pouring out expression and energy is the part that’s most absent. In a burnout module, that often shows up as work that keeps asking for structure, correction, and responsibility while your own release gets left behind.",
   "quiz_reading": "Your profile, Finisher's Drain, shows perfectionism at 82% and recovery at 34%, and that combination fits the way your mind reopens work the moment it should be closing. You don’t just want things done; you keep returning to them, which makes even a day off feel uneasy instead of empty in a peaceful way. That is why the tension doesn’t disappear after effort — it keeps looking for one more pass.",
   "element_readings": {
    "wood": {
     "heading": "🌳 wood weak — the part of you that wants to pour out is barely getting room",
     "body": "Wood is at 0%, so the part of you that should flow outward as expression and energy release is almost entirely muted. For a Water Day Master, that kind of gap makes it hard to let work leave your hands; it stays inside as unfinished mental motion. Water feeds wood, so your own replenishing side is the path that can bring that outward push back into view. That is why you can finish a task and still feel like you haven’t actually let it go."
    },
    "fire": {
     "heading": "🔥 fire low — warmth is present, but it doesn’t stay long",
     "body": "Fire is at 13%, which keeps it in the low range and gives your days less visible heat than the workload seems to demand. In practice, that can feel like a burst of effort followed by a quick drop, especially when Monday-morning messages switch the pressure back on before you’ve fully warmed up again. The result is not laziness; it’s a short-lived spark that gets spent fast. You can sense the gap most clearly when the work is done but your body still hasn’t caught up."
    },
    "earth": {
     "heading": "⛰️ earth strong — the weight of responsibility sits close to the center",
     "body": "Earth is at 38%, so the pressure side of life is strong and steady. For a Water Day Master, earth is the force that feels like rules, duty, and being held down by what has to be done. That lines up tightly with your fear of falling behind if you stop, because the sense of obligation does not switch off when the task is over. You keep carrying the project in your head long after the screen should have gone dark."
    },
    "metal": {
     "heading": "💎 metal strong — the urge to refine keeps sharpening itself",
     "body": "Metal is also at 38%, so the checking and correcting side is just as strong as the pressure side. That makes sense of your habit of going back and re-checking everything after finishing a task. In a burnout pattern, metal like this can turn completion into another round of scrutiny instead of a place to rest. You don’t just close the file; you audit the file in your head."
    },
    "water": {
     "heading": "💧 water low — rest is there, but it doesn’t feel like rest",
     "body": "Water is at 13%, so the part of you that should cool, settle, and restore is not coming through strongly. That fits your exact line about resting without it ever feeling like resting, because the recovery side is simply not getting enough room to register. Even on a day off, your system stays alert, which is why quiet can feel uneasy instead of soft. You are not short on effort; you are short on recovery that actually lands."
    }
   },
   "upcoming_period_preview_heading": "31 years old and beyond, a stronger fire cycle begins",
   "upcoming_period_preview_body": "From age 31 to 40, the 10-year cycle shifts into stronger Fire, and that change means your pace will feel faster, brighter, and more exposed than it does now. For you, this is a period when visibility rises and the pressure to keep up can feel sharper. It can also bring more heat into your days, so the way you manage energy will matter even more.",
   "module_map": {
    "title": "Your energy balance sheet",
    "body": "Your energy balance sheet is tilted toward demand more than replenishment. The demand side is coming from the heavy earth and metal pattern: responsibility, checking, and the need to keep things correct even after they are done. The resource side is thinner: wood is absent, and fire and water are both low, so expression, warmth, and recovery all come in small amounts. That is why the burnout here looks less like collapse and more like finishing well while feeling increasingly emptied out."
   },
   "module_deep": {
    "title": "The order for refilling",
    "body": "The first thing to put down is the idea that every finished thing still needs one more look. That habit is taking more from you than it gives back, so the next step is to protect the moments after completion as real ending points. Then fill the empty space with recovery that is scheduled, not improvised, because your low recovery needs a boundary before it can become a feeling. After that, add one small source of visible warmth to the day, something that gives back quickly instead of asking for another round of checking. This order fits your earth-and-metal pressure pattern: close the loop, make room, then let energy return in a form you can actually feel."
   },
   "strengths_preview": [
    {
     "title": "Steady follow-through",
     "body": "You don’t leave things half-shaped. The perfectionism at 82% shows a person who can keep returning to a task until it is complete enough to trust, and that shows up in work that gets across the finish line. The image is simple: you’ve already wrapped the job, but you still open the document one more time because you want it clean."
    },
    {
     "title": "Endurance under pressure",
     "body": "You can keep going through a lot of friction without dropping the thread. The counseling note about cramming, then crashing shows that you are able to push hard when needed, and that push is real effort, not fake momentum. The same strength is visible when Monday-morning messages bring tension back and you still stay with the task instead of walking away."
    },
    {
     "title": "Careful standards",
     "body": "You notice what doesn’t fit, and you do not rush past it. That recovery score of 34% makes the uneasy feeling on a day off very clear, but it also shows how seriously you treat quality and responsibility. The detail is in the scene: even rest gets checked for whether it counts, which tells me your standards are always awake."
    }
   ],
   "upcoming_period_heading": "31 years old, a new chapter of fire opens",
   "upcoming_period_body": "From age 31 to 40, Fire becomes more active, and that matters because your current pattern is built around pressure and checking. When that shift arrives, the day can start to feel more visible and more direct, especially in the way you respond to work demands. It is worth getting used to a rhythm where your own energy has to meet the moment more quickly, instead of only reacting after the fact.",
   "cross_analysis_quotes": [
    "Your earth-heavy pattern and your 82% perfectionism are speaking the same language: pressure becomes proof of care. That is why you keep re-checking after the task is done, because finishing is not the same as feeling settled. The result is a day that looks complete on paper but still feels unfinished in your body.",
    "Your low water and low recovery are aligned in the same quiet way. You can rest, but the rest doesn’t sink in, so the mind stays alert even when the body has stopped moving. That is why a day off can still feel uneasy rather than restoring."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows a mind that does not fully trust the first finish. In daily life, that looks like reopening finished work, scanning for loose ends, and keeping a task alive after it should have been put away. Jordan, that answer tells me your standard for safety is tightly tied to certainty.",
    "Feeling uneasy even when you rest shows that rest has become another place where you monitor yourself. In daily life, that can look like sitting down but still waiting for a message, a mistake, or a reason to get back up. Jordan, that answer tells me your nervous system is still on duty even when your schedule is not."
   ],
   "chat_snapshot_note": "Your main concern is that you rest without ever feeling rested, and that sits right beside tiredness and a little anxiety. The work itself is not the only issue; the feeling follows you after the work is done, which is why the mind keeps checking instead of letting go. The sentence I’d keep is this: you are not failing to rest, you are resting under a mind that won’t close the file.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they reactivate the exact tension you thought had gone quiet. They land on a system that already expects pressure, so one new message can make the whole week feel like it has started asking for more before you’ve had a chance to recover. That is why the trigger feels larger than the message itself.",
   "chat_repeat_note": "Your pattern runs in a clear loop: you cram, then you crash. The choice inside that loop is usually to push through first and pay for it later, which keeps the cycle intact even when you can see it happening. A smaller exit is to notice the first signs of over-collecting tasks and stop before the crash starts to build.",
   "chat_fear_note": "The fear underneath this is not just about pace; it is about falling behind if you stop. That means your mind has connected rest with risk, so slowing down can feel like losing ground instead of gaining it back. What you want underneath that fear is simple: a pause that still feels safe.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "In burnout research, perfectionism can keep effort running long after a task is complete, while low recovery makes it harder for the system to settle afterward. That combination fits your profile closely: a strong drive to recheck and a weak sense of rest that actually registers. The result is not just tiredness; it is the feeling that work keeps extending into every pause. This is why the balance between demand and recovery matters so much in your case.",
   "psychology_takeaway": "A task can be finished without your body believing it yet. For you, the work ends later than the workday does.",
   "strengths": [
    {
     "title": "Directional sense",
     "body": "Your Water Day Master shows up here as the ability to find the next move when everything feels overfull. In a perfectionism-heavy profile, that matters because you can still see the shape of what needs to happen next, even when the day feels clogged with pressure. The scene is practical: after a long stretch of rechecking, you can still choose the next step instead of staying stuck inside the review."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking loop",
     "body": "You don’t just complete work; you circle back to it until completion starts to feel fragile. That loop keeps the mind active after the task is done, which is why rest can feel uneasy instead of open. The scene is familiar: one finished item becomes three more mental passes."
    },
    {
     "title": "Recovery gap",
     "body": "Your recovery score shows that rest is not landing cleanly. That makes the day off feel like a pause in motion, not a real return of energy. The scene is quiet but tense: you sit down, but your attention never fully sits with you."
    },
    {
     "title": "Pressure stacking",
     "body": "Earth and metal together make obligations and corrections pile up in the same mental space. That is why Monday-morning messages can feel bigger than they look, because they land on top of a system already carrying weight. The scene is one of stacking: each new demand finds no empty shelf."
    },
    {
     "title": "Crash after push",
     "body": "You can push hard enough to get through the immediate work, but the drop comes after. That means the crash is not random; it is the bill that arrives after too much has been spent at once. The scene is sharp: you manage the stretch, then feel the collapse all in one breath."
    }
   ],
   "fit_good": "You do best in a workday that has clear endpoints, so you can see when a task is truly done. A manager who gives specific priorities and then leaves room for uninterrupted focus will help you spend less energy on rechecking and more on finishing. A quiet afternoon block with no surprise messages is the kind of structure that lets your mind stand down for a while.",
   "fit_bad": "You struggle in a setting where messages keep arriving without a clear boundary around when you’re supposed to stop. A job that rewards constant availability will keep the checking loop alive and make recovery feel like another missed task. A culture that treats every finished piece as a draft will pull you straight back into the same fatigue cycle.",
   "behavior_guides": [
    {
     "title": "One-pass close",
     "body": "At the end of each work block, give yourself one final review and stop there. Set a 10-minute timer, check only the items on your list, and then close the file without reopening it. Do this once a day for the tasks that most often trigger rechecking."
    },
    {
     "title": "Recovery anchor",
     "body": "Put one fixed recovery block on your calendar after the hardest part of the day. Keep it to 20 minutes and make it the same time for at least four workdays in a row. During that block, do not process messages or evaluate the day."
    },
    {
     "title": "Message boundary",
     "body": "Choose one window for Monday-morning messages and one window for follow-up checks. Outside those windows, leave the inbox closed for 30 minutes at a time so your attention can stop resetting. Repeat that boundary every Monday for the next three weeks."
    },
    {
     "title": "After-work release",
     "body": "When work ends, write down the next action in one sentence and leave it on the desk. Do this before you move to anything personal so your mind does not keep holding the task open. Keep the note short enough that you can read it once and walk away."
    }
   ],
   "mindset_guide": "Think of your day like a ledger, not a courtroom. A ledger can close even when it isn’t perfect. Your mind keeps acting as if every line must be audited before the book can shut, but that only keeps the total open longer. When the day is done, let the line stand. That is how a little recovery starts to count.",
   "closing_title": "The file can close",
   "closing_body": "From age 31 to 40, Fire enters the 10-year cycle more strongly, and that shift changes the feel of your days. The pressure-and-checking pattern does not disappear, but it stops being the only thing in the room, and the weight of the day feels less sealed shut. In this module, that means the uneasy rest, the Monday-morning reactivation, and the crash-after-push feeling start to loosen at the edges. Jordan, the work can end without you having to keep carrying it in your body."
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
   "title_line1": "When the task ends, the mind keeps the door open",
   "title_line2": "You finish it all, then stay behind with the checking",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late enough that the room has gone quiet, but your phone still feels loud in your hand. The work is already done, yet your mind keeps replaying the last pass, asking whether one detail got missed. Then a Monday-morning message lands, and that tight, watchful feeling comes back before you’ve even stood up from the chair. Sam, isn’t this exactly what your nights have been looking like lately?",
   "case_tag": "EXAMPLE CASE — Daniel, early 30s, project work",
   "case_paragraphs": [
    "Daniel closes his laptop after a long stretch of project work, but he still opens the file one more time to check the same line again. His day looks finished from the outside, yet his body stays braced for the next message. His chart shows a similar imbalance: strong Wood and no Fire, so pressure and structure keep pushing, while the support that helps him recover is missing. You can probably feel how close that is to your own pattern.",
    "By evening, Daniel is too tired to enjoy the break he finally earned, so he scrolls through updates instead of resting. He tells himself he’s just being careful, but the real pattern is that finishing never feels complete. That is the same shape your Burnout module is pointing to. And yes, you can see yourself in this too."
   ],
   "oheng_intro": "Your Five Elements are evenly spread at 25% Wood, 25% Earth, 25% Metal, and 25% Water, with Fire at 0%. Because Wood is the strongest and your Day Master is Earth, that Wood pressure lands on you as rules, responsibility, and pressure rather than simple momentum. Fire is the weak point, and in your chart Wood feeds Fire, so the missing support shows up exactly where Burnout needs it most: recovery that doesn’t fully light up.",
   "quiz_reading": "Your Perfectionism score is 82%, and your Recovery score is 34%, which fits the Finisher's Drain pattern very closely. You don’t just care about doing well; you keep returning to the finished task as if the last check could finally make your body relax. That’s why a free day can still feel uneasy, even when nothing is asking for your attention.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — pressure that keeps asking for one more pass",
     "body": "At 25%, Wood is strong enough to shape the whole feel of your workday. With an Earth Day Master, that strength lands as pressure, responsibility, and the sense that you have to hold the line. It matches the way you go back and re-check everything after finishing a task, as if the task itself is still standing over your shoulder. That’s not laziness or lack of skill; it’s a mind that keeps answering pressure with more pressure."
    },
    "fire": {
     "heading": "🔥 Fire weak — the spark that should help you feel restored",
     "body": "At 0%, Fire is weak, and your chart says Wood feeds Fire, so the support that should warm you up after effort has to be carried by something already strong. That lines up with your answer that even a day off feels uneasy, because rest doesn’t naturally register as replenishment. You may stop working, but the inner heat that says \"I’m back\" doesn’t fully catch. That’s why recovery can feel more like waiting than actually being filled."
    },
    "earth": {
     "heading": "⛰️ Earth balanced — the part of you that keeps holding the whole thing together",
     "body": "At 25%, Earth is steady, but not so heavy that it takes over the chart. As your Day Master, it’s the part that wants to keep things contained, finished, and usable. In your Burnout pattern, that shows up as the person who keeps the structure intact even after energy has started to thin out. You are the one who keeps the container from breaking, even when the inside feels drained."
    },
    "metal": {
     "heading": "💎 Metal balanced — the sharpness that notices what still needs fixing",
     "body": "At 25%, Metal is present enough to keep your standards clear and your eye precise. That helps explain why one finished task can still feel unfinished to you, because your attention naturally catches the gap between \"done\" and \"done well.\" In a Burnout week, that can look like opening the same file again, not because you forgot the work, but because your mind won’t let the edge stay soft. You know exactly where the seam is, and that makes it hard to walk away."
    },
    "water": {
     "heading": "💧 Water balanced — the part that keeps scanning for what comes next",
     "body": "At 25%, Water is active enough to keep your awareness moving forward. That can help you stay prepared, but it also explains why Monday-morning messages can switch your tension back on so fast. The moment a message arrives, your attention starts rehearsing the next move before your body has finished the last one. You don’t need more alertness; you need a way for alertness to stop running the room."
    }
   },
   "upcoming_period_preview_heading": "40 years and up, Earth grows stronger",
   "upcoming_period_preview_body": "From age 40, Earth grows stronger, and that shift marks the start of a different rhythm in your chart. The pace feels less like chasing every alert and more like standing on firmer ground between tasks. It is a quieter kind of season, with more weight under your feet and less need to keep proving the day by re-opening it.",
   "module_map": {
    "title": "Your energy balance sheet",
    "body": "Your energy balance sheet is tilted toward demand. The strongest drain in your pattern is the loop of finishing, checking, and then checking again, which keeps your attention tied to work even after the work is over. On the resource side, you do have follow-through and a real sense of responsibility, but the chart shows that recovery is not keeping pace with effort. That is why the same day can look complete and still feel unfinished inside. The imbalance is not that you lack capacity; it’s that your capacity is being spent faster than it is being restored."
   },
   "module_deep": {
    "title": "The order for refilling",
    "body": "First, put down the habit of treating the finish line as a question mark; that is the piece that drains you fastest. Second, refill with one recovery cue that is small but bodily — a real pause after closure, not a mental promise to relax later. Third, protect one stretch of time from Monday-style reactivation so your system can learn that done can stay done. The point is not to escape responsibility; it is to stop letting responsibility keep charging interest after the work is over. That order matters because your chart shows pressure is already strong, while Fire — the part that would help the rest feel warm and real — needs the clearest support."
   },
   "strengths_preview": [
    {
     "title": "Steady follow-through",
     "body": "You do not leave things half-finished when it matters, and that shows up clearly in the way you return to a task after it’s done. The extra check, the careful revisit, the refusal to let a sloppy ending slide — those are signs of a mind that takes responsibility seriously. In a real day, that can look like catching a detail before anyone else sees it."
    },
    {
     "title": "Quiet endurance",
     "body": "You can keep going through a stretch that would make other people drop the thread. Even when you’re tired and a little anxious, you still keep the work moving instead of abandoning it. That’s the kind of stamina that gets a project across the line when the room is already running low on energy."
    },
    {
     "title": "High standards",
     "body": "You don’t settle for \"good enough\" when your own name is on the result. That shows up in the way you re-check everything after finishing, because your standard for done is stricter than a simple deadline. In practice, that can be the difference between a rough output and something clean enough to trust."
    }
   ],
   "upcoming_period_heading": "40 years and beyond, a new ground opens",
   "upcoming_period_body": "From age 40, the stronger Earth phase matters because it changes the balance between effort and structure in a way your current pattern has not had yet. The days begin to feel less like they are being held together by constant checking, and more like they can settle into a shape that lasts. For you, that means the pressure to keep proving the work softens, and the room for steadier pacing becomes more visible. It is the kind of shift that lets the end of a task feel like an end, not a doorway back into the same loop.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism and strong Wood both point to the same line in your day: 'finished' is not the same as 'safe enough to stop.' That is why you go back and re-check everything even after the task is done. The pressure does not disappear when the work ends; it simply changes shape and keeps your mind on duty.",
    "Your 34% Recovery and weak Fire tell the other half of the story. On a day off, the quiet does not immediately feel nourishing, so rest arrives without the warm signal that tells your body it can let go. That is why the uneasy feeling stays close even when nothing is being asked of you."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows a mind that treats closure as something earned, not assumed. In daily life, that can look like reopening a file after everyone else has moved on, just to make sure the edges are clean. You’re not being difficult; you’re showing how seriously you take the finish line.",
    "Feeling uneasy even when you rest shows that your body doesn’t instantly trust downtime. In real life, that can turn a free afternoon into a low-grade scan for what should be done next. You chose that answer because you know rest has to feel safe before it can actually restore you."
   ],
   "chat_snapshot_note": "Your core worry is simple and very specific: you rest, but it never feels like resting. That sits right next to the tired, slightly anxious feeling you named, so the problem is not a lack of downtime; it’s that downtime doesn’t land inside you as relief. The line worth keeping is this: you are not failing to rest, you are struggling to let rest register.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they arrive exactly where your tension is already waiting. The message itself is small, but it reactivates the part of you that believes stopping could make you fall behind. That is why the spike feels bigger than the text on the screen; it connects straight to your fear of losing your place.",
   "chat_repeat_note": "The loop is clear: you cram, then you crash, then you try again with the same pressure still underneath. Your choice inside that loop is to keep pushing until the work is finished, even when your energy has already started to empty out. The smallest way out is not to do less all at once, but to let one finished task stay finished for a little longer before you touch it again.",
   "chat_fear_note": "Under the fear of falling behind, there is a very human wish: to stay secure by staying ahead. You are not asking for perfection just to be difficult; you are trying to protect yourself from the feeling of being overtaken. That means the fear is really guarding your wish to remain steady, respected, and not left scrambling.",
   "psychology_fact_heading": "The job demands-resources model",
   "psychology_fact_body": "The job demands-resources model says burnout grows when demands keep rising faster than the resources that help you recover. In your case, the demand side is obvious in the repeated checking, the Monday-morning reactivation, and the feeling that work stays mentally open even after it is done. The resource side is thinner, especially around recovery, which is why effort keeps draining you instead of settling back into you. That model fits your pattern without turning it into a personal flaw; it simply shows where the balance has been broken.",
   "psychology_takeaway": "You are not running out of character; you are running past your recovery. What looks like diligence on the outside is becoming a drain on the inside.",
   "strengths": [
    {
     "title": "Relentless completion",
     "body": "Your strongest deeper gift is the ability to bring shape to an ending. Because your Day Master is Earth, you naturally want things to settle into something usable, and that shows up in the way you don’t leave a task vague or half-closed. In practice, this can look like you being the person who makes sure the handoff is actually ready before anyone calls it complete."
    }
   ],
   "weaknesses": [
    {
     "title": "Overcheck loop",
     "body": "You can keep returning to a task after it has already been finished, not because it is unfinished, but because your mind does not trust the stop. That shows up most clearly when a Monday-morning message reopens the whole inner file before you’ve even had a chance to settle. The pattern is understandable, but it costs you peace."
    },
    {
     "title": "Rest mismatch",
     "body": "You know how to pause, but the pause doesn’t always feel like recovery. That can leave you sitting still while your mind keeps reaching for the next responsibility, which is a hard place to truly come back from. The discomfort is not proof that you’re broken; it’s proof that your system has learned to stay on duty too long."
    },
    {
     "title": "Crash after push",
     "body": "You tend to hold yourself together until the work is done, and then the drop comes all at once. That means the crash is often delayed, which makes it easy to mistake endurance for unlimited capacity. The cost shows up after the sprint, when the body finally notices how much it had been carrying."
    },
    {
     "title": "Fear of falling behind",
     "body": "A quiet fear sits underneath your pace: if you stop, you may lose your position. That fear can make even ordinary rest feel risky, because stillness starts to look like a setback instead of a pause. Once that belief is in the room, you end up treating every break like a test."
    }
   ],
   "fit_good": "You do best in work that has clear endings, visible standards, and enough autonomy to close the loop without being pulled back by constant interruptions. A day with one main deliverable, a clean handoff, and space to step away after it is the kind of rhythm that helps you breathe. You are strongest when your effort can count as complete without needing a second proof of worth.",
   "fit_bad": "You struggle in environments where messages keep arriving after the task is technically done and every small update feels like a new evaluation. A day full of fragmented requests, ambiguous endings, and no real recovery window will keep your system on edge. The more a workplace rewards constant re-checking, the more your energy gets spent on staying vigilant instead of actually finishing.",
   "behavior_guides": [
    {
     "title": "Close once",
     "body": "When you finish a task, allow one final check and then stop. Do it at the end of the work block, not later at night, so your brain learns there is a boundary. If the urge returns, write the concern down instead of reopening the file."
    },
    {
     "title": "Recover on purpose",
     "body": "After work, take 10 minutes with no screen and no task language. Sit, walk, or make tea, but do it without adding a productivity goal. Keep that window consistent for five days in a row so rest starts to feel recognizable."
    },
    {
     "title": "Delay Monday",
     "body": "When a Monday message lands, wait two minutes before answering. Use that gap to read the message once, breathe, and decide whether it needs action now or later. That small delay helps break the reflex that every message must immediately reset your whole system."
    },
    {
     "title": "One true end",
     "body": "Pick one task each day that gets a clear end marker, like sending the final version or closing the tab. Say out loud, once, that it is done. The goal is to give your mind one place where completion is allowed to stay complete."
    }
   ],
   "mindset_guide": "Think of your workday like a lamp, not a fuse box. A lamp can be switched off and still keep its shape in the room. Right now, your mind keeps acting as if every finished task must stay glowing. You don’t need to prove the light is real by touching the bulb again.",
   "closing_title": "Let the end stay ended",
   "closing_body": "From age 40, Earth grows stronger, and that shift brings a different weight to your days. The same tasks will still exist, but they stop feeling like they have to be re-opened in your head after every finish line. In this Burnout pattern, that means the rushed, stripped-down feeling eases, and your evenings start to feel more like true downshifts than waiting rooms. Sam, that is the kind of change that lets completion finally feel complete."
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
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "riley": {
  "year": 2027,
  "title": "2027, Your Rhythm in Motion",
  "subtitle": "A year of giving, refining, and finding your pace",
  "overview": "In 2027, the Fire energy does not simply sit beside you; it gets fed by your own nature. With a Wood Day Master, abundant Wood, and no Fire showing in your chart, this can feel like a year where your voice, output, and generosity grow quickly. It is a fruitful kind of movement, but it can also ask more of your energy than you may expect, so pacing and selective effort matter.\n\nRiley, your Oak-like, rooted style suggests that you do best when growth has structure. In 2027, the early months look like a gentle refill, midyear leans into familiar momentum, and late summer asks you to steer results with more intention. Then autumn brings more pressure and responsibility, which can still become strength if you keep your steps clear and your schedule honest. Your chart’s quiet Water and Earth support also suggest that rest, planning, and simple routines can matter more than dramatic pushes.\n\nThe overall tone of 2027 is not about forcing a breakthrough. It is more like learning when to speak, when to produce, when to hold back, and when to let help come in. Because this year gives energy outward, the smartest wins may come from choosing where your effort actually belongs.",
  "chapters": {
   "wealth": {
    "heading": "Wealth: earn by steering, not rushing",
    "body": "In 2027, money and results are more likely to respond to your ability to direct energy than to scatter it. Since the year’s Fire is something you feed, the strongest financial feeling may come from producing value, organizing what you already have, and keeping your aims realistic rather than expansive.\n\nYou may notice that late summer is especially active for practical decisions, while early autumn can bring a stronger urge to claim outcomes. That can feel motivating, but it also means you may want to pause before saying yes to every opportunity or expense that looks exciting. A grounded Oak style usually does better with steady growth than with flashy swings.\n\nA useful starting point is to review one stream of income, one recurring cost, and one goal at a time. If you keep your choices simple and visible, 2027 can feel more controlled and less draining."
   },
   "love": {
    "heading": "Love: warmth with room to breathe",
    "body": "Relationship energy in 2027 looks warm, active, and expressive, but not always low-effort. Because the year’s Fire is amplified by your own nature, you may come across as more giving, more visible, and more present than usual. That can deepen connection, yet it can also leave you feeling like you are carrying the emotional temperature for everyone.\n\nIn everyday life, this may show up as more invitations, more conversation, or more moments where people look to you for momentum. Some months may feel especially easy and magnetic, while others invite patience and careful reading of the room. If a situation feels slightly misunderstood, it may help to slow the pace and clarify rather than assume.\n\nTry keeping one honest check-in habit in place, whether with a partner, a close friend, or someone you are just getting to know. Small, steady clarity will likely serve you better than trying to make everything feel perfect at once."
   },
   "career": {
    "heading": "Career: visible effort, clearer direction",
    "body": "Work in 2027 looks like a year of output, visibility, and being asked to show what you can do. The Fire energy can make your efforts more noticeable, which is useful, but it also means you may have to manage your own pace carefully so your work stays sustainable. Your rooted, Oak-like style is a good match for building something that lasts.\n\nYou may find that the middle of the year favors producing, presenting, or taking the lead in a practical way, while late summer could bring a sharper push toward results. Later in the year, responsibility may increase, and the best response may be to choose a clean process instead of trying to prove everything at once. This is a year where competence can speak loudly if you let it.\n\nA good first move is to identify one area where your effort is already strong and make it easier to see. Then, before adding more, make sure your schedule has enough room for recovery and review."
   },
   "study": {
    "heading": "Study: learn by absorbing and refining",
    "body": "Learning in 2027 is supported in a quiet, steady way, especially when you allow yourself to receive before you perform. Your chart’s strong Wood and modest Water suggest that you may learn best through structure, repetition, and reflection rather than through constant novelty. This can be a good year for deepening skills you already care about.\n\nYou may notice that some months feel naturally helpful for study, while others feel more like processing and sorting than collecting new information. That is not a drawback; it may simply mean your mind works best when it has time to settle. If you try to cram too much into the same stretch, your energy may scatter.\n\nBegin with one topic, one note system, or one practice session that you can repeat. A simple learning rhythm is likely to bring more confidence than trying to study in bursts and then recover from them."
   },
   "health": {
    "heading": "Body and mind: protect your pace",
    "body": "The main health theme in 2027 is rhythm, not alarm. Because the year asks you to give more outwardly, your system may benefit from regular pauses, steady sleep habits, and a gentler relationship with overcommitment. Your rooted nature usually likes consistency, and that consistency may matter more than intensity now.\n\nIn daily life, you may feel better when your calendar has visible gaps, your meals are unhurried, and your transitions are not packed too tightly. The middle and later parts of the year especially suggest that pacing yourself could make everything else feel more manageable. Think of restoration as part of the work, not as a reward after everything is finished.\n\nA practical start is to choose one small routine that helps you reset, such as a short walk, a quiet morning, or a firm stop time at night. When your energy is being used to support the year, clear boundaries can feel surprisingly nourishing."
   }
  },
  "months": [
   {
    "headline": "Fresh ground",
    "body": "In February, help, learning, and recovery are more likely to come toward you, and the mood may feel like a fresh start that still asks for effort. If you keep your eyes open for support, you may notice it arriving in practical, useful forms rather than dramatic ones."
   },
   {
    "headline": "Magnetic lift",
    "body": "March carries a fuller, brighter feel, with a stronger sense of pull and connection. People, ideas, or opportunities may seem easier to attract, so it can be a good month for showing up clearly and letting your presence do some of the work."
   },
   {
    "headline": "Easy familiar pace",
    "body": "April feels more like settling into a known rhythm than chasing something new. The comfort can be welcome, but the quieter edge may mean you need to create your own spark if you want progress to keep moving."
   },
   {
    "headline": "Slow the read",
    "body": "May is a month where things may look straightforward at first and then reveal a few subtleties. If you take your time with messages, plans, and assumptions, you may avoid unnecessary confusion and keep your footing steady."
   },
   {
    "headline": "Clean the table",
    "body": "June brings a productive pause, as if the year asks you to tidy, sort, and prepare while still keeping momentum alive. You may feel more effective if you finish what is already open before reaching for something new."
   },
   {
    "headline": "Quiet momentum",
    "body": "July feels inwardly strong even when it does not look loud from the outside. Advancement is more likely to come through careful accumulation, so small consistent actions may matter more than a dramatic push."
   },
   {
    "headline": "Turn and move",
    "body": "August is active and mobile, with a sharp shift in the air and a stronger push toward ownership and results. Because the month can bring a sense of turning in a new direction, it may help to stay flexible and avoid overcommitting before the picture is clear."
   },
   {
    "headline": "Measured pursuit",
    "body": "September favors initiative, results, and a more direct approach to what you want. The pace can be useful, but it works best when you keep your ambition clean and resist the urge to do too much at once."
   },
   {
    "headline": "Pressure as structure",
    "body": "October may bring more responsibility and a sharper sense of being tested, yet that same pressure can help you build something sturdier. If you choose a manageable speed, the month can strengthen your judgment instead of wearing you down."
   },
   {
    "headline": "New form taking shape",
    "body": "November feels like something is beginning to take form, even if the full picture is not obvious yet. A surprise or turn in the flow could nudge you to respond differently, and that flexibility may open a better path than forcing the old one."
   },
   {
    "headline": "Help returns",
    "body": "December brings a softer, more replenishing tone, with support and recovery becoming easier to notice again. If the month feels a little frayed at the edges, a small reset in your routine may restore more than you expect."
   },
   {
    "headline": "Carry the thread",
    "body": "January 2028 keeps the supportive current going, and the mood may feel like a continuation rather than a restart. Good timing, practical help, or a useful opening may appear if you stay attentive and keep your plans simple."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive and sort",
    "body": "Watch for support that arrives through people, information, or a fresh opening, especially when things feel easier than expected. A good action is to collect notes, ask one clear question, and sort what is useful before adding more to your plate."
   },
   {
    "title": "May to July: refine and prepare",
    "body": "Notice where your energy is being used to tidy, clarify, or quietly build momentum. Try finishing one unfinished task each week so your effort stays visible and your mind has less clutter."
   },
   {
    "title": "August to October: direct with care",
    "body": "This stretch asks you to handle results, responsibility, and movement with a steadier hand. Choose one priority, set a clean boundary around it, and make decisions after a second look rather than on impulse."
   },
   {
    "title": "November to January: accept the new shape",
    "body": "Pay attention to the ways pressure softens into form and support returns in a quieter way. A useful move is to revisit your routines, keep what still works, and let the next phase grow from something already stable."
   }
  ],
  "closing": "From age 46 to 55, Earth becomes stronger in your 10-year cycle, and that marks a real shift toward steadier structure and practical grounding. In 2027, though, the story is still about the Fire you help fuel: more expression, more output, and a clearer need to choose where your energy goes. If you treat pacing as wisdom rather than hesitation, this year can feel both active and well-held."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, un pulso claro",
  "subtitle": "Lucía, un año para ordenar, mostrar y medir el gasto de tu energía",
  "overview": "En 2027, tu agua interior se encuentra con un fuego que no te domina, sino que te invita a tomar iniciativa. Como tu mapa tiene mucha tierra y también bastante agua, pero nada de metal, la clave no será correr detrás de todo, sino elegir bien dónde pones tu atención. Cuando actúas con intención, el año favorece resultados visibles; cuando te dispersas, el esfuerzo se siente más grande de lo necesario.\n\nTu tipo, El rocío · Orden, sugiere una manera fina de avanzar: con sensibilidad, pero también con estructura. En 2027, eso encaja bien con un periodo donde conviene producir, mostrar y ordenar sin exagerar. Lucía, te puede ir mejor si piensas en términos de ritmo: empujar cuando el terreno responde, aflojar cuando tu energía pide recuperación, y dejar que lo importante madure sin forzarlo.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso",
    "body": "En 2027, el dinero se mueve mejor cuando tú tomas la iniciativa con criterio. Como el año favorece resultados y la relación con esa energía te empuja a dirigir recursos, hay margen para mejorar ingresos, organizar cobros o dar forma a algo que estaba solo en borrador. La sombra aquí no es la falta, sino el exceso de empuje: querer cerrar demasiado rápido puede hacerte perder precisión.\n\nEn la práctica, podrías notar semanas en que ves una oportunidad clara y te dan ganas de avanzar sin mirar mucho alrededor. También puede aparecer el impulso de gastar para acelerar un plan, o de asumir más de lo que conviene por confianza. Si te pasa, no es una mala señal: solo pide una pausa breve para revisar números, tiempos y prioridades.\n\nEmpieza por una regla simple: antes de mover dinero, deja que pasen unas horas y vuelve a mirar la decisión con calma. Y si surge una entrada nueva, reparte una parte para usarla y otra para sostenerte; esa mezcla te ayuda a aprovechar el año sin apretarlo de más."
   },
   "love": {
    "heading": "Vínculos en movimiento",
    "body": "En el terreno afectivo, 2027 mezcla cercanía con cierta necesidad de definir límites. Tu agua busca conexión, pero el fuego del año pide presencia y claridad; eso puede volver más visibles los acuerdos, los roces pequeños y también el deseo de decir lo que de verdad importa. Con tanta tierra en tu mapa, las relaciones tienden a pedir hechos concretos, no solo intención.\n\nPuede que notes conversaciones más directas, invitaciones a tomar la iniciativa o momentos en que alguien espera de ti una respuesta clara. También podrías sentir que algunas dinámicas se ordenan solas cuando dejas de adivinar y preguntas sin rodeos. Si te relacionas con calma, el año favorece vínculos más honestos y menos confusos.\n\nTe conviene escuchar antes de responder y no llenar silencios con suposiciones. Un gesto simple, una frase bien puesta o una propuesta concreta pueden abrir más espacio que una explicación larga; en 2027, la cercanía crece cuando el trato es claro."
   },
   "career": {
    "heading": "Trabajo que deja huella",
    "body": "En trabajo y proyectos, 2027 se siente como un año para mostrar capacidad. La energía del periodo te ayuda a producir, liderar y convertir ideas en algo visible, así que puede ser un buen momento para asumir más responsabilidad o para dar forma final a algo que ya venías preparando. Como tu mapa tiene 0% de metal, la estructura no siempre aparece sola: conviene construirla a propósito.\n\nEn el día a día, esto puede verse como más tareas saliendo de tu mano, más gente mirando tu criterio o más ocasiones para resolver con rapidez. Si tu entorno te pide mucho, el riesgo no es fallar, sino quedarte sin orden interno. Por eso, una agenda simple, revisada con frecuencia, puede hacer una gran diferencia.\n\nEmpieza por separar lo urgente de lo importante y deja a la vista solo tres prioridades. Si haces eso, el año te permite avanzar con firmeza sin sentir que todo depende de tu memoria o de tu impulso del momento."
   },
   "study": {
    "heading": "Aprender para afinar",
    "body": "El aprendizaje en 2027 se beneficia de tu capacidad para observar y ordenar. Tu agua aprende bien cuando puede conectar ideas, y la tierra abundante de tu mapa ayuda a fijar lo que estudias; por eso, este año favorece métodos prácticos, repetición útil y materiales que puedas convertir en algo concreto. No se trata tanto de absorber mucho como de afinar lo que ya sabes.\n\nEn la vida diaria, esto puede verse como ganas de revisar bases, tomar notas limpias, volver a un tema que parecía cerrado o aprender desde la práctica más que desde la teoría. También podrías notar que entiendes mejor cuando explicas en voz alta o cuando haces un esquema sencillo. Esa mezcla de fluidez y orden te viene muy bien en 2027.\n\nSi quieres aprovechar el ritmo, estudia en bloques cortos y cierra cada bloque con una frase propia, un resumen o un ejemplo. Así conviertes el esfuerzo en comprensión real y no en acumulación dispersa."
   },
   "health": {
    "heading": "Ritmo que te sostiene",
    "body": "En cuerpo y mente, 2027 pide regularidad más que intensidad. Con el fuego del año y tu mezcla de agua y tierra, puedes rendir mucho, pero te conviene cuidar la transición entre actividad y descanso para no gastar de más. El año no te empuja a aflojar por debilidad; te invita a dosificar para que tu energía dure mejor.\n\nEn lo cotidiano, esto puede sentirse como días de mucha iniciativa seguidos por momentos en que necesitas bajar el volumen y ordenar el entorno. También puede aparecer la necesidad de estar más tiempo en tu mundo interior, con menos ruido y más atención a lo que realmente te centra. Si escuchas esas señales, el año se vuelve más llevadero.\n\nTe ayudará crear un pequeño cierre al final del día: apagar pantallas un poco antes, preparar lo de mañana y dejar una pausa breve para respirar. Ese gesto simple le da forma a tu ritmo y protege tu concentración."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "La cercanía de la energía del año te deja en un clima familiar, pero con poca novedad. Como aparecen malentendidos, te conviene preguntar antes de asumir; una frase clara puede evitarte vueltas innecesarias."
   },
   {
    "headline": "Marzo enciende",
    "body": "Sigue un tono parecido, aunque con más iniciativa y ganas de tomar el mando. El brote de algo nuevo puede darte confianza, así que es buen momento para poner nombre a una idea y darle forma simple."
   },
   {
    "headline": "Abril visible",
    "body": "Aquí se nota más la relación de expansión: lo que haces puede verse con facilidad y recibir reconocimiento. Si das sin medida, gastarás más energía de la cuenta; conviene elegir bien dónde muestras tu trabajo."
   },
   {
    "headline": "Mayo en marcha",
    "body": "La misma dinámica de expansión se vuelve más movida y productiva. La semilla pide un gesto concreto, así que una acción pequeña pero constante puede rendir más que un plan demasiado ambicioso."
   },
   {
    "headline": "Junio de cierre",
    "body": "La energía te favorece para dirigir recursos y buscar resultados, aunque con pequeños tropiezos que invitan a revisar detalles. Si avanzas sin apuro y miras dos veces lo importante, puedes cerrar mejor lo que tenías entre manos."
   },
   {
    "headline": "Julio hacia dentro",
    "body": "Sigue el tono de control, pero ahora la mirada se vuelve más interna. Ese recogimiento te ayuda a ordenar deseos y prioridades; un rato de silencio puede aclararte más que una conversación larga."
   },
   {
    "headline": "Agosto con peso",
    "body": "La presión sube y también la necesidad de administrar bien tus recursos. Si eliges un ritmo estable, la carga te fortalece; si te aceleras, el mes se siente más pesado de lo necesario."
   },
   {
    "headline": "Septiembre tenso",
    "body": "La exigencia continúa y además aparece una fricción que puede mover el tablero. Tómalo como una señal de cambio: revisar acuerdos y bajar la velocidad un poco puede ayudarte a salir con más claridad."
   },
   {
    "headline": "Octubre ayuda",
    "body": "Aquí la energía te sostiene con más apoyo y aprendizaje. Como la rama se une a tu rumbo, las personas o ideas que aparezcan pueden encajar mejor de lo esperado; aprovecha para recibir y absorber."
   },
   {
    "headline": "Noviembre abierto",
    "body": "El mes trae ayuda, pero también variaciones de ambiente que te invitan a adaptarte. Si aceptas el cambio de ritmo, puedes sentir más alivio y encontrar una forma más cómoda de seguir."
   },
   {
    "headline": "Diciembre fértil",
    "body": "Vuelves a una energía parecida a la tuya, con sensación de fruto después del esfuerzo. Es un buen momento para valorar lo que sí funcionó y dejar que tu magnetismo atraiga sin forzar."
   },
   {
    "headline": "Enero paciente",
    "body": "La energía sigue cerca de tu tono natural y favorece la confianza, aunque sin prisas. Si algo tarda en responder, el tiempo de espera puede servirte para afinar la siguiente decisión."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vigila malentendidos, ordena tus prioridades y deja que las ideas más claras ganen forma. Una acción útil es escribir cada semana tres decisiones pendientes y marcar cuál necesita respuesta primero."
   },
   {
    "title": "De mayo a julio",
    "body": "Observa dónde se va tu energía cuando produces, ayudas o intentas cerrar resultados. Prueba a poner un límite concreto por día, para que tu impulso no se convierta en desgaste."
   },
   {
    "title": "De agosto a octubre",
    "body": "Mira con atención la presión, los roces y el apoyo que llega desde fuera. Te ayudará revisar acuerdos, pedir aclaraciones y aceptar ayuda sin sentir que pierdes control."
   },
   {
    "title": "De noviembre a enero",
    "body": "Sigue el ritmo más lento y aprovecha la recuperación para preparar la siguiente etapa. Una buena práctica es cerrar cada día con una nota breve de lo aprendido y una sola prioridad para el día siguiente."
   }
  ],
  "closing": "A los 38 años, el ciclo de diez años entra en una etapa donde el fuego gana fuerza y la dirección de tu vida pide más presencia y decisión. En 2027, eso se siente como un año para ordenar, producir y elegir mejor dónde pones tu energía, sin olvidar que la claridad también necesita pausas. Lucía, si escuchas el ritmo del año y no le exiges más de lo que da, puedes atravesarlo con firmeza y con una sensación muy limpia de avance."
 },
 "casey": {
  "year": 2027,
  "title": "2027, ritmo y temple",
  "subtitle": "Un año para afinar la fuerza sin perder el paso",
  "overview": "Casey, en 2027 tu mapa entra en un tramo de trabajo fino: el fuego del año toca tu metal central y te pide forma, criterio y paciencia con el ritmo. Como tienes mucha madera y metal, pero nada de agua, te conviene cuidar los espacios de pausa y de revisión; así, lo que produzcas puede salir más limpio y con mejor dirección.\n\nLa sensación general no es de ir a toda velocidad, sino de aprender a sostener presión sin endurecerte de más. Habrá momentos en que te resulte natural empujar, otros en que te convenga ordenar, y otros en que te llegue ayuda o aprendizaje casi en bandeja. Si eliges bien cuándo avanzar y cuándo afinar, 2027 puede dejarte una sensación de solidez muy útil para lo que viene después.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso",
    "body": "En 2027, el dinero se mueve mejor cuando lo tratas como una extensión de tu capacidad de producir, no como algo que se persigue a golpes. Los tramos de empuje te favorecen para generar, vender, mostrar o ofrecer, pero también pueden pedir más energía de la que parece al principio. Con tu mezcla de metal y madera, te conviene apostar por decisiones claras y por un orden simple que no te quite aire.\n\nEs posible que veas gastos ligados a trabajo, herramientas, desplazamientos o gestiones que acompañan un avance real. También puede aparecer la tentación de hacer demasiado a la vez por querer aprovechar el impulso del año. Si separas lo urgente de lo importante y revisas dos veces antes de cerrar algo, te resultará más fácil conservar margen y evitar dispersión.\n\nEmpieza por una lista breve de entradas y salidas, y por un criterio sencillo para decidir qué sí merece energía en 2027. Cuando notes que el ritmo se acelera, prioriza lo que deja resultado visible y aplaza lo accesorio para otro momento."
   },
   "love": {
    "heading": "Vínculos que se mueven",
    "body": "En tus vínculos, 2027 mezcla impulso y ajuste. Hay meses en que tu manera de dar, decir o mostrar afecto se vuelve más visible, y eso puede acercarte a personas que valoran tu claridad. También puede haber momentos en que el roce aparezca no por falta de cariño, sino por diferencias de ritmo, expectativas o forma de responder.\n\nQuizá notes que algunas conversaciones se vuelven más directas, o que ciertos encuentros te piden elegir mejor cuánto das y cuándo lo das. Como el año trae una energía de presión sobre tu metal, te conviene no responder de inmediato a todo: a veces una pausa pequeña evita que algo útil se vuelva tenso. En los meses de más sintonía, en cambio, la cercanía puede sentirse simple y natural.\n\nPrueba a hablar con frases cortas y claras, sin intentar resolverlo todo en una sola charla. Si dejas espacio para escuchar y para aclarar lo que quieres de verdad, tus relaciones pueden volverse más honestas y menos confusas."
   },
   "career": {
    "heading": "Trabajo con dirección",
    "body": "En 2027, tu trabajo gana fuerza cuando combinas iniciativa con criterio. Hay una parte del año que te empuja a producir, presentar y sostener resultados; otra que te pide aguantar presión sin acelerar de más. Para alguien con mucho metal en el mapa, eso suele traducirse en una ventaja clara: puedes ordenar, afinar y decidir con bastante precisión si no te saturas.\n\nEn lo cotidiano, pueden aparecer semanas con más responsabilidad, más seguimiento o más necesidad de responder por lo que haces. También pueden surgir oportunidades de mostrar capacidad, tomar mando o resolver algo que otros dejan a medias. El riesgo no está tanto en la falta de capacidad como en querer abarcar demasiado y perder foco.\n\nTe conviene dividir los objetivos en pasos pequeños y visibles, y reservar un margen para revisar antes de entregar. Si eliges bien tus batallas y sostienes un ritmo estable, 2027 puede ayudarte a consolidar una imagen de solvencia sin necesidad de forzar nada."
   },
   "study": {
    "heading": "Aprender con calma",
    "body": "El aprendizaje en 2027 se beneficia de dos cosas: práctica constante y espacio para integrar. Tu mapa muestra mucha madera, así que tienes facilidad para crecer, explorar y conectar ideas; pero la falta de agua sugiere que te conviene no llenar la cabeza sin dejar tiempo para asentar. El año favorece más el estudio útil que la acumulación desordenada.\n\nEs probable que aproveches mejor lo que aprendes si lo aplicas enseguida, aunque sea en una versión pequeña. Puede venirte bien una etapa de consulta, guía o apoyo de alguien con experiencia, porque el año trae momentos de ayuda real y de recuperación de energía mental. También te irá mejor si ordenas el material por temas y no por urgencias sueltas.\n\nEmpieza con una rutina breve y repetible: leer, resumir, probar y revisar. Si conviertes el aprendizaje en algo tangible, tu mente se sentirá menos dispersa y más segura de lo que sabe."
   },
   "health": {
    "heading": "Ritmo que te sostiene",
    "body": "En 2027, el cuidado personal se parece menos a “hacer más” y más a sostener un ritmo que no te vacíe. Como el año te pide presión y tu mapa no trae agua, conviene prestar atención a la pausa, al sueño regular, a la comida sin apuro y a los momentos de silencio. No como una gran reforma, sino como ajustes pequeños que te devuelven centro.\n\nEn lo diario, puede pasarte que alternes días muy activos con otros en que notes la necesidad de bajar un poco el volumen. Eso no significa retroceso: muchas veces será la forma en que tu sistema pide reorganización. Si tu entorno cambia, si viajas o si se altera tu agenda, te ayudará volver a lo básico sin exigirte rendimiento continuo.\n\nHazte fácil el descanso: menos pantallas al final del día, más orden en tus horarios y un espacio breve para respirar antes de cambiar de tarea. Cuando tu rutina tenga márgenes, tu energía responderá con más estabilidad."
   }
  },
  "months": [
   {
    "headline": "Febrero abre el ciclo",
    "body": "En 2027, febrero trae una sensación de cierre que a la vez te pone en movimiento. Algo se expresa con más fuerza y te pide gastar energía en mostrar, producir o salir al frente; además, el choque de fondo puede mover una rutina que ya estaba pidiendo cambio. Si aprovechas ese impulso sin apurarte de más, el mes puede servirte para empezar limpio."
   },
   {
    "headline": "Marzo siembra base",
    "body": "Marzo tiene un tono de inicio discreto: lo que hagas ahora puede parecer pequeño, pero deja raíz. También conviene mirar con calma los tropiezos menores, porque se corrigen mejor si los detectas pronto. Es un buen mes para ordenar ideas y dejar que una intención simple gane forma."
   },
   {
    "headline": "Abril toma mando",
    "body": "Abril favorece empujar resultados, mover recursos y tomar más iniciativa. La clave está en no convertir la ambición en prisa, porque el mes puede darte bastante margen si eliges bien. Una parte de ti puede preferir trabajar en silencio; si escuchas esa parte, avanzarás con más precisión."
   },
   {
    "headline": "Mayo se afina",
    "body": "Mayo sigue siendo un mes de empuje, pero ahora la atención se va a lo que se une contigo y te ayuda a cerrar algo con mejor forma. También conviene cuidar lo que administras, porque los recursos piden tacto y no solo velocidad. Si unes claridad con buen trato, el mes se vuelve muy productivo."
   },
   {
    "headline": "Junio aprieta",
    "body": "Junio trae más presión y más responsabilidad a la vez. Puede haber momentos en que te sientas más sensible a las respuestas del entorno, así que te conviene bajar una marcha antes de contestar o decidir. Si mantienes el paso estable, el mes te fortalece en vez de agotarte."
   },
   {
    "headline": "Julio afirma",
    "body": "Julio sostiene la misma intensidad, pero con más confianza para caminarla. Lo inesperado puede aparecer en forma de cambio de plan o giro de agenda, así que te ayudará dejar un margen libre. Si no te aferras al esquema perfecto, podrás adaptarte con bastante elegancia."
   },
   {
    "headline": "Agosto recoge",
    "body": "Agosto abre una etapa más nutritiva: ayuda, aprendizaje y recuperación empiezan a sentirse disponibles. Lo que prepares con paciencia puede dar fruto visible, aunque no conviene forzarlo. Un pequeño cambio de entorno o de rutina puede refrescarte más de lo que imaginas."
   },
   {
    "headline": "Septiembre llena",
    "body": "Septiembre tiende a darte sensación de plenitud y de apoyo real. Es un mes favorable para recibir, asimilar y dejar que algo madure sin empujarlo. También puede haber una atracción especial hacia personas, ideas o espacios que te resulten magnéticos por su claridad."
   },
   {
    "headline": "Octubre baja",
    "body": "Octubre va más despacio y se siente familiar. No es momento de exigir novedad por fuerza; el valor está en sostener lo que ya funciona y esperar el momento correcto. Si aceptas ese ritmo más suave, el mes te devolverá estabilidad."
   },
   {
    "headline": "Noviembre cuida",
    "body": "Noviembre pide atención a los detalles y a la forma en que te hablas y hablas con otros. Puede haber malentendidos pequeños si das por entendido algo que todavía no se dijo con claridad. Revisar, precisar y suavizar el tono te ahorrará vueltas innecesarias."
   },
   {
    "headline": "Diciembre ordena",
    "body": "Diciembre vuelve a poner tu energía al servicio de mostrar, producir y liderar con más presencia. A la vez, el mes pide ordenar antes de seguir empujando, como si te recordara que el final de un tramo también merece limpieza. Si eliges bien qué cerrar, entrarás en el cierre del año con más ligereza."
   },
   {
    "headline": "Enero recoge",
    "body": "Enero de 2028 trae una etapa más recogida, con reconocimiento y menos ruido externo. Puede ser un buen momento para mirar lo hecho sin apurarte a empezar algo enorme de inmediato. Si dejas que el mes te devuelva perspectiva, lo que siga después tendrá una base más serena."
   }
  ],
  "action_plan": [
   {
    "title": "2 a 4 meses: abrir espacio",
    "body": "Observa cómo se activan tu impulso de producir y tu tendencia a querer resolver rápido. Durante este tramo, te ayudará elegir una sola prioridad por semana y dejar un margen corto para revisar antes de cerrar cualquier decisión."
   },
   {
    "title": "5 a 7 meses: sostener presión",
    "body": "Mira cuándo la exigencia sube y cuándo te conviene bajar una marcha para no perder precisión. En este tramo, prueba a repartir tareas en bloques pequeños y a reservar una pausa breve entre una responsabilidad y la siguiente."
   },
   {
    "title": "8 a 10 meses: recibir y afinar",
    "body": "Presta atención a los apoyos, aprendizajes y señales de recuperación que se vuelven más visibles. Te conviene aceptar ayuda concreta, ordenar lo que aprendes y dejar que una parte de tu energía vuelva a llenarse antes de empujar otra vez."
   },
   {
    "title": "11 meses a 1 mes: cerrar con orden",
    "body": "Observa dónde aparecen silencios, demoras o confusiones pequeñas antes de fin de ciclo. En este tramo, te ayudará hacer una lista corta de pendientes, aclarar mensajes importantes y dejar el terreno limpio para entrar al siguiente periodo sin ruido extra."
   }
  ],
  "closing": "A los 41 años, comienza un ciclo de diez años con metal más fuerte, y eso marca una transición real: lo que ahora se está afinando en 2027 encuentra después una base mucho más estable. En 2027, tu tarea no es correr, sino elegir bien el ritmo para que tu fuerza no se disperse. Si haces espacio para revisar, ordenar y descansar a tiempo, este año puede dejarte más firme, más claro y mejor preparado para lo que sigue."
 },
 "mia": {
  "year": 2027,
  "title": "2027, a stronger rhythm",
  "subtitle": "A year of pressure that can shape you into something steadier",
  "overview": "2027 brings a forging kind of fire to your Metal Day Master, Mia. In plain language, that means the year can ask for more responsibility, more visible output, and a sharper sense of timing. With Wood fairly strong in your Five Elements mix, there may be plenty to handle; the art of the year is not to do everything, but to choose the pace that lets your effort become structure rather than strain.\n\nYour chart type, Steel · Harvest, suggests a person who can be both precise and productive when the conditions are right. This year’s movement can feel like a test of endurance at first, yet it also carries momentum: if you keep your steps deliberate, the pressure can help you define what really matters. The middle of the year looks especially active, while late summer and early autumn feel more receptive, as if support, learning, and recovery become easier to notice.\n\nIn 2027, the most helpful approach is to work with the season instead of forcing it. There are months for building, months for adjusting, and months for gathering yourself again. If you treat the year as a sequence of small, intentional decisions, the fire around you can become warmth and shape instead of noise.",
  "chapters": {
   "wealth": {
    "heading": "Money that responds to timing",
    "body": "In 2027, money matters can feel tied to initiative: when you act, create, or offer something useful, the flow around resources tends to move more easily. Because your Wood is already strong, there may be a natural urge to expand, but the year asks for a cleaner filter so that effort doesn’t scatter into too many directions. For Mia, this can be a good year to value consistency over flash.\n\nYou may notice moments when a project, side task, or practical idea seems ready to become more concrete, especially in spring and again near year-end. Those are the times when it can help to ask, “What is actually worth the energy?” rather than “What can I do next?” Small, repeatable choices may bring more ease than a big push.\n\nA useful start is to keep one simple list of what brings value and what quietly drains it. Then, when a new opportunity appears, you can compare it against that list before saying yes. That kind of pause can make your resources feel more settled and less scattered."
   },
   "love": {
    "heading": "Closeness with room to move",
    "body": "Relationships in 2027 may feel more active, expressive, and occasionally changeable. The year can bring more conversation, more visible feelings, and more chances to notice where closeness is flowing well and where it needs a softer touch. Because one part of the year carries a surprise-prone edge, it may help to stay curious rather than fixed.\n\nYou might find that certain months bring sudden invitations, quick shifts in mood, or a sense that someone’s pace does not quite match yours. That does not have to be a problem; it can simply mean the year is asking for better listening and fewer assumptions. If you are already in a relationship, this can be a good time to make room for honest check-ins. If you are not, the year may still feel socially lively in a way that keeps you alert.\n\nTry leading with clarity, but keep your tone gentle. A short message, a direct question, or a simple plan can work better than trying to manage every detail at once. The steadier you are about your own rhythm, the easier it may be for others to meet you there."
   },
   "career": {
    "heading": "Work under useful pressure",
    "body": "Career energy in 2027 looks demanding in a way that can also be refining. This is a year when responsibility may grow, expectations may become more visible, and your ability to stay composed can matter more than speed alone. For a Steel · Harvest type, that can be a powerful setting: not soft, but productive, especially when you choose what deserves your full force.\n\nIn daily life, this may show up as tighter deadlines, more people looking to you for answers, or projects that need structure rather than more ideas. Spring may push for output, midyear may ask for endurance, and late summer may reward careful support from others. If you try to carry everything at once, the year may feel heavy; if you focus your effort, it can feel impressively solid.\n\nA good move is to define what “done” means before you begin. One clear standard, one realistic timeline, and one place where you can ask for help may save you a lot of friction. In 2027, polished effort is likely to matter more than dramatic effort."
   },
   "study": {
    "heading": "Learning that settles into you",
    "body": "Learning in 2027 may work best when it is practical, structured, and connected to real use. The year’s pressure can make you want results quickly, but your chart also suggests that steady absorption may serve you better than cramming for the sake of motion. Because support and recovery become easier to access later in the year, that stretch can be especially useful for building understanding that lasts.\n\nYou might notice that some topics click when they are tied to examples, routines, or tools you can actually use. It may also feel easier to study when you are not trying to prove anything. The more you let learning become part of your workflow, the less it may feel like a separate burden.\n\nTry setting up one small repeatable practice: ten minutes of review, one page of notes, or one concept explained in your own words. If you keep the method simple, the knowledge can settle more deeply and stay with you longer."
   },
   "health": {
    "heading": "Keeping your rhythm intact",
    "body": "Your body and mind may benefit most in 2027 from pacing, regularity, and enough room to recover between bursts. The year’s fire can raise activity and output, which is useful, but it can also make you feel more spent if you never pause. Since your Five Elements balance already shows a good amount of Wood, it may help to remember that growth needs structure to stay comfortable.\n\nIn daily life, this could look like feeling great when you are engaged, then suddenly noticing that you need quiet time afterward. That pattern is not a failure; it is information. The middle of the year may ask you to respect your limits a little more, while late summer may feel like a natural window for restoring your pace.\n\nA gentle routine can help: regular meals, a predictable sleep cue, short walks, or a few minutes without screens before bed. Choose one habit that makes your day feel less jagged, and let that be enough for now. Small steadiness may do more for you than a perfect plan."
   }
  },
  "months": [
   {
    "headline": "February: a sharp reset",
    "body": "This month can feel like a fresh start with a twist, because the energy around you may push for expression and movement while also shaking up your usual footing. If plans change quickly, that may simply be the month asking you to respond rather than resist. A flexible schedule could make the transition much smoother."
   },
   {
    "headline": "March: ideas take shape",
    "body": "March may favor quiet growth, as if something is forming behind the scenes before it becomes visible. Small hiccups are possible, but they may be more annoying than serious, so the best response is often simple correction rather than overreaction. Give your ideas a little room to mature."
   },
   {
    "headline": "April: steady leverage",
    "body": "April looks like a month for taking the lead with practical aims, especially where money, results, or ownership are involved. The energy is useful, but it can tempt you to push too hard, so measured ambition may work better than force. Keep your eye on what actually moves the needle."
   },
   {
    "headline": "May: doors open",
    "body": "May can bring a more organic kind of progress, with useful connections and a sense that things are beginning to move on their own. Because the month carries a surprise-prone tone, plans may shift in ways that turn out helpful. Let the opening happen before you decide where it leads."
   },
   {
    "headline": "June: pressure with purpose",
    "body": "June may feel more demanding, with responsibility becoming harder to ignore. The good news is that this kind of pressure can strengthen your structure if you choose a pace you can actually sustain. Avoid racing the month; work with it instead."
   },
   {
    "headline": "July: stay adaptable",
    "body": "July brings momentum, but also a more unpredictable edge, so the month may reward quick adjustment more than rigid planning. You may feel pulled in several directions at once, and that is a cue to simplify. One clean decision may serve you better than three half-finished ones."
   },
   {
    "headline": "August: support arrives",
    "body": "August looks more nourishing, with help, learning, and recovery becoming easier to notice. Fresh ground energy suggests that new settings or new perspectives could feel especially welcome. If you have been pushing hard, this month may give you a better place to breathe."
   },
   {
    "headline": "September: magnetic ease",
    "body": "September may bring a fuller, more attractive kind of flow, where people, ideas, or opportunities seem to gather more naturally. It can be a good month for collaboration, because support is more likely to meet you halfway. Let the month show you what wants to come closer."
   },
   {
    "headline": "October: familiar ground",
    "body": "October feels steadier and more familiar, though not especially exciting. Waiting may be part of the tone, so it can help to use the month for maintenance rather than forcing a breakthrough. Comfort is available here, even if the pace is slower."
   },
   {
    "headline": "November: read carefully",
    "body": "November may bring moments where signals are easy to misread, so careful listening matters more than usual. Things can still be calm on the surface while meaning sits a layer deeper. A second look can save you from unnecessary confusion."
   },
   {
    "headline": "December: tidy and direct",
    "body": "December can restore a more expressive, productive rhythm, with an added sense of authority around how you organize your time. It may be a good month to clear loose ends and say plainly what needs to happen next. The more direct you are, the easier the month may feel."
   },
   {
    "headline": "January: quiet storage",
    "body": "January looks like a quieter holding period, where progress may be less visible but still meaningful underneath the surface. Advancement is possible, especially if you keep preparing without demanding instant results. Think of it as storing strength for the next step."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: shape the opening",
    "body": "Watch for sudden shifts in plans, a rising need to express yourself, and the first signs of practical momentum. Try choosing one priority lane and giving it a clear container so your energy goes into building, not scattering."
   },
   {
    "title": "May to July: steer the pressure",
    "body": "Notice where opportunities arrive quickly, where responsibility grows, and where the pace becomes less predictable. A good action is to define your limits early, then keep adjusting the schedule instead of trying to overpower it."
   },
   {
    "title": "August to October: receive and consolidate",
    "body": "Look for support, easier learning, and a more settled rhythm in your days. Use that stretch to recover, document what works, and turn scattered effort into a repeatable method."
   },
   {
    "title": "November to January: slow down to see clearly",
    "body": "Pay attention to mixed signals, familiar routines, and the quieter kind of progress that builds under the surface. A helpful action is to review your notes, close loose loops, and prepare one clean starting point for the next cycle."
   }
  ],
  "closing": "From age 33 to 42, a stronger Water 10-year cycle begins, and that is a real shift in your long arc: the current chapter gives way to a more fluid one with a different kind of support. In 2027, though, the main theme stays clear — pressure can refine you, and careful pacing can turn that pressure into strength. If you keep choosing what deserves your effort, the year can leave you more defined, not more exhausted."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027년, 지수님의 흐름 읽기",
  "subtitle": "채워짐과 소모가 함께 오는 해, 리듬을 잘 고르면 더 편안해져요",
  "overview": "지수님에게 2027년은 ‘무언가가 잘 자라나는 해’에 가깝습니다. 중심 기운은 나무처럼 위로 뻗는 성향인데, 2027년은 불의 기운이라 그 나무가 더 많은 표현, 생산, 베풂으로 이어지기 쉬워요. 그래서 성과의 실마리는 늘어나기 좋지만, 그만큼 에너지가 빠르게 쓰이는 느낌도 함께 오기 쉬운 해입니다. 지수님처럼 본래 성취 지향이 강한 유형은 이런 해에 한 번에 많이 해내려는 마음이 생기기 쉬우니, 속도를 나눠 쓰는 감각이 중요해져요.\n\n또 하나 눈에 들어오는 점은, 오행 분포에서 토의 비중이 높고 화와 수가 비어 있다는 점이에요. 그래서 2027년의 뜨거운 흐름은 평소보다 더 분명하게 체감될 수 있고, 반대로 쉬는 법이나 정리하는 법은 의식적으로 챙길수록 편해질 수 있습니다. 반안살의 기운이 들어오는 구간도 있어, 사람들의 시선이나 역할이 자연스럽게 모이는 장면이 생기기 쉬워요. 지수님, 2027년은 ‘더 많이’보다 ‘알맞게’가 더 큰 차이를 만드는 한 해로 읽혀요.",
  "chapters": {
   "wealth": {
    "heading": "성과를 다루는 감각",
    "body": "2027년의 재물 감각은 밀어붙일수록 손에 잡히는 면이 있지만, 동시에 과욕을 조심해야 편한 흐름이에요. 중심 기운이 나무인 지수님에게 불의 기운은 표현과 생산을 키워 주지만, 그 에너지가 곧바로 성과로만 정리되지는 않아서 ‘많이 움직였는데 남는 것’을 따져보는 태도가 중요해져요.\n\n실제로는 8월경과 9월경처럼 주도권을 잡고 결과를 끌어오기 좋은 장면이 보일 수 있어요. 다만 일정이 겹치거나 제안이 한꺼번에 들어오면, 숫자보다 우선순위를 먼저 세우는 편이 더 안정적입니다. 토의 비중이 높은 사주라서, 감으로만 밀기보다 구조를 세우면 훨씬 편해질 거예요.\n\n작게 시작한다면, 월말마다 ‘지금 쓰는 힘이 어디로 갔는지’를 한 줄로 적어보세요. 돈의 크기보다 흐름의 방향을 보는 습관이 2027년의 지수님에게 잘 맞습니다."
   },
   "love": {
    "heading": "가까움이 깊어지는 방식",
    "body": "관계와 연애에서는 2027년이 꽤 다채롭게 느껴질 수 있어요. 2월경과 3월경에는 도움과 배움이 들어오듯, 누군가의 조언이나 호의가 관계의 문을 열어 주기 쉽고, 4월경에는 익숙함 속에서 살짝 부딪히는 장면이 생길 수 있습니다. 가까워질수록 편안함과 전환이 함께 오기 쉬운 해로 보입니다.\n\n특히 3월경처럼 지지 관계가 잘 맞물리는 달에는 대화가 빠르게 통하고, 4월경에는 반대로 말이 엇갈리기 쉬워요. 이때 중요한 건 상대를 설득하는 속도보다, 내 마음이 어떤 지점에서 급해지는지 알아차리는 일입니다. 반안살이 들어오는 7월경에는 사람들 사이에서 존재감이 자연스럽게 드러날 수 있어, 관계의 중심에 서는 경험도 있을 수 있어요.\n\n작게는, 중요한 대화 전에는 하고 싶은 말을 세 문장으로 줄여보세요. 길게 설명하기보다 핵심을 또렷하게 전하는 쪽이 지수님에게 더 편한 리듬이 될 수 있습니다."
   },
   "career": {
    "heading": "일의 속도와 무게",
    "body": "일과 커리어에서는 2027년이 ‘보여주는 힘’과 ‘책임을 지는 힘’이 함께 커지는 해예요. 6월경과 7월경에는 표현과 생산이 활발해져 결과물을 내기 좋고, 10월경과 11월경에는 책임과 압박이 늘면서도 그만큼 단단해지는 흐름이 이어질 수 있습니다. 거목·성취 유형인 지수님에게는 이런 해가 꽤 전형적으로 맞아떨어질 수 있어요.\n\n장성살이 들어오는 6월경에는 스스로 주도권을 잡고 싶은 마음이 강해질 수 있고, 화개살이 있는 10월경에는 혼자 정리하고 깊이 생각하는 시간이 늘기 쉬워요. 이 둘은 서로 다른 방식의 집중을 요구하니, 한쪽에서는 밖으로 내보내고 다른 쪽에서는 안으로 다듬는 식의 분리가 도움이 됩니다. 11월경에는 겁살의 긴장감이 있어 작은 확인을 여러 번 하는 편이 더 안정적이에요.\n\n실행은 단순하게 가는 것이 좋습니다. 주간 단위로 ‘지금 내가 책임지는 일’과 ‘남에게 넘겨도 되는 일’을 나누어 적어보세요. 역할의 경계를 세우면 2027년의 속도가 훨씬 다루기 쉬워집니다."
   },
   "study": {
    "heading": "배움이 몸에 붙는 해",
    "body": "배움의 측면에서는 2027년이 단순한 지식 축적보다 ‘쓸 수 있는 배움’이 잘 붙는 해로 읽혀요. 2월경과 12월경, 1월경에는 도움과 회복의 흐름이 들어와 다시 배우기 좋고, 3월경에는 누군가의 조언이나 협업이 학습의 문을 넓혀 줄 수 있습니다. 지수님처럼 성취 지향이 있는 분에게는 배운 것을 바로 적용해 보는 방식이 잘 맞아요.\n\n제왕의 기운이 있는 3월경에는 이해가 빠르고 자신감도 붙기 쉬워요. 반대로 5월경에는 익숙한 방식이 편해져 새 자극이 적을 수 있으니, 이때는 넓게 벌리기보다 이미 배운 것을 정리하는 쪽이 효율적입니다. 토가 강한 구성이라 머리로만 외우는 것보다, 표나 목록처럼 구조를 만들 때 기억이 오래 갈 가능성이 있어요.\n\n작게 시작한다면, 한 주에 한 개 주제만 잡고 ‘읽기-정리-적용’의 세 단계로 나눠보세요. 지수님에게 2027년의 배움은 넓히는 것보다 붙이는 데서 힘을 얻습니다."
   },
   "health": {
    "heading": "리듬을 살피는 생활감",
    "body": "몸과 마음의 돌봄에서는 2027년이 ‘열이 오르기 쉬운 해’처럼 느껴질 수 있어요. 불의 기운이 들어오고, 나무 기운이 그 불을 키워 주는 구조라서 바쁘게 움직일수록 생활 리듬이 빨라지기 쉽습니다. 그래서 쉬는 시간을 아예 일정처럼 넣어두는 편이 더 편안해요.\n\n4월경에는 전환감이 있고, 8월경과 9월경에는 이동성과 바쁨이 함께 강해질 수 있어요. 10월경과 11월경에는 마음이 안쪽으로 모이면서 생각이 많아질 수 있으니, 밤 시간을 길게 쓰기보다 낮에 정리하는 습관이 도움이 됩니다. 수의 기운이 비어 있는 편이라, 물을 충분히 마시고 잠깐 멈추는 시간을 의식적으로 잡는 것이 생활 리듬을 지키는 데 유리해요.\n\n실행은 아주 작게 해도 됩니다. 하루에 두 번, 3분만 앉아서 호흡과 어깨 힘을 확인해보세요. 지수님에게 2027년의 돌봄은 무언가를 고치는 일보다, 속도를 다시 맞추는 일에 더 가깝습니다."
   }
  },
  "months": [
   {
    "headline": "도움이 들어오는 문",
    "body": "2월경에는 나를 채워 주는 흐름이 시작되며, 배움이나 회복의 실마리가 보이기 쉬워요. 건록의 기운이라 기본 체력이 올라오는 느낌도 있을 수 있으니, 새 계획을 너무 크게 벌리기보다 받아들이는 데 집중하면 좋습니다."
   },
   {
    "headline": "맞물리는 대화",
    "body": "3월경에는 도움과 배움이 더 또렷해지고, 지지 관계도 잘 붙어 대화가 빠르게 이어질 수 있어요. 제왕의 기운이 있어 자신감이 오르기 쉽지만, 상대의 흐름을 함께 읽으면 더 매끄럽게 풀립니다."
   },
   {
    "headline": "익숙함의 전환점",
    "body": "4월경에는 편안한 결이 유지되면서도, 일상 한가운데서 방향이 살짝 꺾이는 장면이 생길 수 있어요. 충의 기운이 있어 익숙한 방식이 흔들릴 수 있으니, 바꾸기보다 정리하는 태도가 먼저면 좋습니다."
   },
   {
    "headline": "익숙한 속도",
    "body": "5월경에는 안정감이 살아 있지만 새 자극은 적어서, 큰 확장보다 정돈에 어울려요. 망신살의 기운은 시선이 모이기 쉬운 느낌으로 나타날 수 있으니, 말과 행동을 조금 더 단정하게 가져가면 편합니다."
   },
   {
    "headline": "표현이 커지는 달",
    "body": "6월경에는 내가 이 해의 기운을 키워 주는 흐름이 강해져, 표현과 생산이 늘기 쉬워요. 장성살이 있어서 주도권을 잡고 싶어질 수 있으니, 하고 싶은 만큼 하되 마무리 기준을 미리 정해두면 좋습니다."
   },
   {
    "headline": "존재감이 드러남",
    "body": "7월경에는 베풂과 출력이 자연스럽게 늘고, 반안살의 흐름 속에서 주변의 시선도 모이기 쉬워요. 누군가의 부탁이 늘 수 있으니, 가능한 범위를 먼저 정해두면 지수님이 덜 지칩니다."
   },
   {
    "headline": "밀어붙이기 좋은 때",
    "body": "8월경에는 주도권, 재물, 성과 쪽으로 힘이 잘 실려서 결과를 끌어오기 좋아요. 역마살이 있어 움직임이 많아질 수 있으니, 한 번에 여러 일을 잡기보다 우선순위를 선명하게 두는 편이 유리합니다."
   },
   {
    "headline": "속도와 확인",
    "body": "9월경에는 성과를 밀어붙이기 좋은 흐름이 이어지지만, 육해살의 기운처럼 어긋남을 한 번 더 살펴야 편해요. 빠르게 처리하되 마지막 점검을 남겨두면, 결과의 안정감이 한층 좋아질 수 있습니다."
   },
   {
    "headline": "깊어지는 책임",
    "body": "10월경에는 책임과 압박이 늘지만, 양의 기운처럼 바깥으로 자라는 힘도 함께 생겨요. 화개살이 있어 혼자 생각을 정리하기 좋으니, 사람 사이보다 작업의 완성도를 먼저 챙기면 좋습니다."
   },
   {
    "headline": "단단해지는 시간",
    "body": "11월경에는 일이 무겁게 느껴질 수 있지만, 장생의 기운이 있어 오래 갈 힘을 다지는 데 도움이 돼요. 겁살이 있어 작은 실수나 걱정이 커 보일 수 있으니, 확인을 한 번 더 하는 습관이 든든합니다."
   },
   {
    "headline": "다시 채워지는 끝",
    "body": "12월경에는 도움과 회복의 흐름이 다시 들어와 숨을 고르기 좋아요. 목욕의 기운이 있어 정리와 비움이 잘 맞고, 다음 단계로 넘어가기 전 마음을 가볍게 해두기 좋습니다."
   },
   {
    "headline": "새 장의 예고",
    "body": "2028년 1월경에는 다시 채워지는 흐름이 이어지며, 관대의 기운처럼 여유를 갖고 준비하기 좋아요. 천살의 기운은 마음이 멀리 가기 쉬운 느낌으로도 읽히니, 당장 할 일 하나에 집중하면 안정적입니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 받는 힘 점검",
    "body": "도움과 배움이 들어오는 흐름, 그리고 한 번 꺾이는 전환감을 함께 살펴보세요. 이 구간에는 새로운 것보다 이미 받은 조언을 정리해 두는 행동이 잘 맞고, 메모 한 장에 ‘지금 도움이 되는 것’만 추려 적어두면 좋습니다."
   },
   {
    "title": "5~7월경: 출력 관리",
    "body": "표현과 생산이 늘어나는 흐름을 지켜보면서, 에너지가 어디서 새는지 확인해보세요. 한 가지 행동으로는 하루의 마감 시간을 미리 정해두는 것이 좋고, 그 시간 이후에는 추가 요청을 받더라도 다음으로 미루는 연습이 도움이 됩니다."
   },
   {
    "title": "8~10월경: 주도권 조율",
    "body": "성과를 밀어붙이기 좋은 힘과 책임이 함께 오는 구간이에요. 이때는 우선순위 표를 만들어 가장 중요한 일 하나만 먼저 처리하고, 나머지는 순서를 나눠 두면 과욕을 줄이기 쉽습니다."
   },
   {
    "title": "11월~다음해 1월경: 재정비",
    "body": "압박이 늘었다가 다시 회복으로 넘어가는 흐름을 보게 될 가능성이 커요. 행동은 단순하게, 지난 1년의 기록을 훑으며 ‘유지할 것 3개, 줄일 것 3개’를 적어보면 다음 장이 훨씬 가벼워집니다."
   }
  ],
  "closing": "36세부터 45세까지 수 기운이 강해지는 시기가 이어집니다. 지금까지의 뜨거운 확장감에서 한 번 물러나, 더 차분하게 채우고 정리하는 장이 열리는 전환으로 읽을 수 있어요.\n\n그 전까지의 2027년은 지수님에게 표현과 성과가 커지되, 리듬을 잘 나누면 훨씬 편해지는 해입니다. 많이 해내는 것보다, 어디에 힘을 둘지 아는 감각이 지수님을 더 단단하게 만들어 줄 거예요."
 },
 "jordan": {
  "year": 2027,
  "title": "2027: A Steady Fire",
  "subtitle": "A year of drive, timing, and careful momentum",
  "overview": "2027 feels like a year where you can take the lead with more ease than usual. Fire supports action, visibility, results, and material momentum, while your Day Master is Water, so the year asks you to steer energy rather than let it scatter. With Earth and Metal already strong in your Five Elements balance, this can feel like a year for using structure, judgment, and discipline to turn effort into something tangible.\n\nBecause this Fire year sits in a controlling relationship to your core energy, it can be good for pushing goals, handling money matters, and making practical progress. At the same time, the chart’s quiet-storage tone and waiting-time note suggest that not every result needs to be forced. Jordan, the best rhythm in 2027 is often simple: act clearly, then pause long enough to see what actually holds.\n\nThe first half of the year leans toward familiar ground, with early months that feel easier to settle into than to reinvent. By late summer, the pace becomes more demanding and may ask for patience, careful reading of people, and a slower hand. Then autumn and early winter bring support, learning, and recovery, which can help you reset your energy before the year closes with a calmer, inward-facing tone.",
  "chapters": {
   "wealth": {
    "heading": "Money moves with timing",
    "body": "In 2027, financial matters look best when you treat them as something to organize, direct, and refine rather than chase. Fire can bring a stronger pull toward results, and because your chart already has a solid base of Earth and Metal, you may do well when you turn ambition into a plan instead of a rush. The main benefit here is not wild expansion, but cleaner control over what comes in and what goes out.\n\nYou may notice moments when a project, side income, or practical opportunity feels especially close to your hands, especially around midyear. That can make it tempting to say yes too quickly, to spend for momentum, or to assume a good opening will stay open forever. A simple budget check, a pause before committing, or one more comparison can keep the year feeling smoother.\n\nA good first step is to choose one money stream to tidy up in 2027. If you can name what you want to strengthen, reduce, or track more closely, the year’s active Fire energy becomes a tool instead of a distraction."
   },
   "love": {
    "heading": "Warmth, but not rush",
    "body": "Relationships in 2027 may feel more alive when there is honesty, movement, and a little shared purpose. Fire tends to brighten interaction, so this can be a year when your presence is noticed and your words carry more force. At the same time, your chart’s quieter, more ordered style suggests that steady care may work better than dramatic gestures.\n\nIn daily life, this could look like clearer conversations, easier introductions, or a stronger desire to define what a connection means. Around late summer, when pressure and responsibility rise, you may want to slow down before reacting, because people can misread tone more easily then. Later in the year, support and recovery make it easier to reconnect from a calmer place.\n\nTry making one relationship more deliberate in 2027: a message you’ve been meaning to send, a plan you can actually keep, or a boundary you can say kindly. Small, consistent signals will likely carry farther than trying to impress anyone all at once."
   },
   "career": {
    "heading": "Lead, then verify",
    "body": "Career-wise, 2027 supports initiative, ownership, and visible progress. Since Fire and your Water core are in a controlling relationship, you may find it easier to direct projects, manage outcomes, and claim practical results when you are clear about what matters. The chart also suggests a pattern of waiting and storage, so the strongest move may be choosing the right moment rather than forcing constant speed.\n\nYou might see this in meetings where your ideas land well, in tasks where you can take charge of a process, or in periods when responsibility grows and others look to you for structure. August and September can feel more demanding, especially if people expect you to read between the lines quickly. In that stretch, slowing your pace a little and checking assumptions can save effort later.\n\nA useful habit is to define one visible goal for the year and one quiet metric for yourself, such as consistency or follow-through. That way, you can measure progress without getting pulled into unnecessary pressure."
   },
   "study": {
    "heading": "Learning through structure",
    "body": "Study and skill-building in 2027 are likely to work best when they are practical, organized, and tied to real use. Your strong Earth and Metal balance already favors structure, and the year’s Fire can add motivation, so you may learn well when there is a clear target, a deadline, or a visible payoff. Pure curiosity still matters, but it may need a container to stay alive.\n\nYou may notice that some months feel especially good for review, consolidation, or returning to something you already know in a new way. Autumn can be helpful here, because support and recovery make it easier to absorb rather than just push. Later, when the year turns quieter, your inner world may become a useful classroom, especially for reflecting on what actually stuck.\n\nPick one thing to learn in layers instead of all at once. A short weekly rhythm, a note system, or a small practice block can help you turn interest into real competence without draining yourself."
   },
   "health": {
    "heading": "Protect your rhythm",
    "body": "For body and mind, 2027 asks for pacing more than intensity. Fire can make life feel fuller and faster, while your chart’s quiet-storage tone suggests you do better when energy is conserved and released with intention. That makes regular sleep, meals, movement, and downtime especially valuable as simple ways to keep your system balanced.\n\nThere may be periods, especially in late summer, when you feel mentally loaded or slightly over-extended because the year asks for more responsibility and sharper attention. That does not have to mean something is wrong; it may simply mean your pace needs adjusting. A lighter schedule, fewer open tabs, or one calm routine at the start or end of the day can make a noticeable difference.\n\nChoose one anchor habit for 2027 that helps you reset quickly. It could be a walk, a fixed bedtime window, or ten quiet minutes without screens. The point is not perfection; it is giving your energy a place to land."
   }
  },
  "months": [
   {
    "headline": "February: familiar spark",
    "body": "This month feels comfortable and recognizable, with enough motion to keep things alive but not so much that you need to reinvent yourself. The renewal tone can help you re-enter plans gently, and the unexpected-turn note suggests a small surprise may appear where you least expect it. Let curiosity lead, but keep your grip light."
   },
   {
    "headline": "March: easy momentum",
    "body": "March continues the same supportive current, making it a good time to settle into routines or reconnect with something that already suits you. The birth tone can make ideas feel freshly alive, even if the setting itself is familiar. A little friction may show up, so a patient reply can work better than a quick correction."
   },
   {
    "headline": "April: output rises",
    "body": "April brings more expression, output, and giving, which can be energizing but also draining if you say yes too often. The incubation tone suggests something is forming behind the scenes, and the wildcard note hints that not everything will follow your first plan. Keep one part of the month open for experimentation."
   },
   {
    "headline": "May: ideas take shape",
    "body": "May favors creation, sharing, and building momentum through what you produce. The conception tone points to something in an early stage, so even small actions can matter more than they look. Fresh ground makes this a good month to try a new format, path, or way of presenting yourself."
   },
   {
    "headline": "June: take the lead",
    "body": "June is one of the clearest months for initiative, results, and practical control. The reset tone can help you clear what is stale and move with purpose, while the magnetism note may bring useful attention or stronger pull toward opportunity. The key is to stay precise rather than overextend."
   },
   {
    "headline": "July: wait, then act",
    "body": "July keeps the same active relationship, but the quiet-storage tone asks you to hold back a little and see what is truly ready. The waiting-time note makes this a month for timing, not just effort. If you resist the urge to force a finish, the next step may reveal itself more cleanly."
   },
   {
    "headline": "August: read carefully",
    "body": "August brings pressure and responsibility, and the atmosphere can feel more sensitive to timing and tone. The tidy-up pause suggests a good moment to slow down, sort details, and correct small things before they grow. With the misread-moments note and a supportive alignment in the background, clear communication becomes your best tool."
   },
   {
    "headline": "September: steady under pressure",
    "body": "September continues the demanding pace, but it can also help you become more disciplined and composed. The winding-down tone suggests energy is starting to settle, and the command note points to situations where your presence or judgment matters. Keep your responses simple and firm."
   },
   {
    "headline": "October: help returns",
    "body": "October feels more supportive, with room for learning, recovery, and practical assistance. The easing-off tone can make the month feel less compressed, and the advancement note suggests a quiet step forward rather than a dramatic leap. This is a good time to accept help without overexplaining it."
   },
   {
    "headline": "November: move with change",
    "body": "November brings stronger support again, but with movement built into the picture, so things may shift more quickly than you expect. The full-power tone can restore energy, while the on-the-move note and the clash-like tension suggest a turning point or change of direction. Stay flexible, and avoid locking in too early."
   },
   {
    "headline": "December: steady finish",
    "body": "December returns to familiar ground, which can feel reassuring after a month of movement. The peak-effort tone makes it a good time to finish what matters, and the small-hiccups note suggests minor delays are more likely than major problems. A calm, methodical finish will serve you well."
   },
   {
    "headline": "January: inward quiet",
    "body": "January carries a quieter, more internal feeling, as if your energy is gathering itself before the next cycle begins. The momentum tone helps you keep moving, but the inner-world note suggests reflection may be just as important as action. This is a good month to notice what you want to carry forward."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: settle and test",
    "body": "Watch for what feels familiar but slightly underused. Try one small experiment in your routine, work, or communication style, and see what gives you energy without creating extra strain."
   },
   {
    "title": "May to July: build, then choose",
    "body": "Notice where your output is strongest and where momentum starts to feel expensive. Make one clear choice about what deserves your effort, and protect that lane from unnecessary noise."
   },
   {
    "title": "August to October: slow the pace",
    "body": "Pay attention to moments when people may misread each other or when responsibility starts to stack up. Respond a little more slowly, ask one more clarifying question, and let support come in before pushing harder."
   },
   {
    "title": "November to January: reset inwardly",
    "body": "Track what changes when movement picks up and when your energy turns inward again. Use that shift to close loose ends, rest your attention, and prepare a cleaner starting point for the next cycle."
   }
  ],
  "closing": "At 31 years old, your 10-year cycle moves into a Fire-strong phase, and that marks a real turning of the page: one stretch is settling, and a new chapter with more heat and visibility is opening. In 2027, that same Fire tone can help you lead, earn, and shape results, as long as you keep your pace honest and your choices clear. If you let the year be active without letting it become frantic, it can feel both productive and surprisingly steady."
 },
 "sam": {
  "year": 2027,
  "title": "2027: A Year of Clearer Rhythm",
  "subtitle": "Support, traction, and steadier choices for Sam",
  "overview": "In 2027, the year’s Fire energy feels like something that can fill you up rather than push against you. For someone with an Earth Day Master, that usually reads as a season of support, learning, and recovery: you may find it easier to gather strength, understand what matters, and rebuild your pace without forcing it. With your Mountain · Order pattern, the year also suits structure, good timing, and practical follow-through, especially because your Five Elements are evenly spread and Fire is absent in your chart, so warmth and momentum can feel noticeable when they arrive.\n\nAt the same time, 2027 doesn’t ask you to rush everything at once. Some months lean toward action and ownership, some toward pressure that sharpens your judgment, and some toward rest, reflection, or quieter consolidation. Sam, the best use of the year may be to treat it as a cycle of alternating gears: move when the current supports you, pause when the rhythm asks for it, and let small corrections count. That kind of pacing can make the whole year feel more usable, even when the energy changes shape from month to month.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best with timing",
    "body": "In 2027, money and results look more responsive when you take the lead with clarity. Because the year’s Fire energy can be something you can manage, this is a favorable backdrop for setting targets, asking for fair terms, and shaping outcomes through your own effort. The main caution is not lack, but overreach: when the pace feels good, it may be tempting to say yes too fast or take on more than your system can comfortably hold.\n\nIn daily life, that could show up as a stronger urge to launch, negotiate, or chase visible progress in late winter, early spring, and again near the end of the year. You may also notice that some opportunities arrive with a little friction, which is often a sign to check the details before moving. A simple way to work with this is to define what “enough” looks like before you start, then review your choices once more before committing.\n\nIf you keep the numbers and deadlines tidy, the year may feel less scattered and more productive. Small, disciplined actions are likely to go further than big gestures made in a hurry."
   },
   "love": {
    "heading": "Relationships that breathe",
    "body": "Relationship-wise, 2027 leans toward support, steadiness, and mutual learning. When the year’s Fire energy meets your Earth-centered nature, connection can feel warmer and more available, as if people are easier to understand and easier to meet halfway. The middle of the year especially may bring a sense of being held by the flow rather than having to create all the momentum yourself.\n\nIn practice, that might look like more honest exchanges, easier invitations, or a clearer sense of who feels reliable. June can bring a turning point in how you relate to others, not necessarily dramatic, but enough to change the tone of a bond or a routine. Later in the year, some interactions may feel more familiar than exciting, which can be a good time to enjoy what is already solid instead of demanding novelty from every connection.\n\nA gentle approach works well here: answer messages with care, make room for unforced meetings, and let trust build through repeated small gestures. You don’t need to perform closeness; consistency may do more for you than intensity."
   },
   "career": {
    "heading": "Steady effort, smarter moves",
    "body": "Career matters in 2027 seem to favor a rhythm of initiative followed by refinement. Early in the year, you may have more room to steer outcomes, while spring can ask for more responsibility and a cleaner sense of priorities. Because your chart has a Mountain · Order quality, work that rewards structure, reliability, and clear sequencing may feel especially natural.\n\nOn the ground, this could mean periods when you’re asked to handle more, coordinate more, or make decisions that shape how others move. Some months may bring unexpected turns or mixed signals, so it helps to slow the first reaction and confirm the second. Later, especially around October and November, output may increase, but so can energy use, so pacing your effort can keep your work from becoming messy or thin.\n\nThe most useful strategy may be to choose one visible goal at a time and build it in layers. That keeps your work practical, and it fits the year’s pattern of traction without unnecessary strain."
   },
   "study": {
    "heading": "Learning that lands",
    "body": "For study and learning, 2027 looks like a year where support can make knowledge easier to absorb. Since the year’s energy is filling rather than emptying for you, it may be a good time to learn through examples, guided practice, and repeated exposure instead of forcing everything through raw effort. Your balanced Five Elements also suggest that you may learn best when information is organized into clear categories.\n\nYou might notice that some months bring a stronger urge to act before you’ve fully processed something, while others feel calmer and better for review. That rhythm is useful: one phase for taking in new material, another for revisiting notes, and another for turning understanding into something you can explain. A small example might be reading less but summarizing more, or choosing one skill to refine over several weeks instead of splitting attention too widely.\n\nIf you allow learning to be gradual, it may stick more naturally. The year seems to reward comprehension that becomes usable, not just impressive."
   },
   "health": {
    "heading": "Keep the rhythm gentle",
    "body": "For body and mind care, 2027 suggests a rhythm of replenishment with a few active peaks. Because the year can feel supportive to you, it may be easier to recover your pace when you respect rest, meals, movement, and quiet time as part of productivity rather than as an afterthought. The year’s changing tempo also means that your energy may feel very different from month to month.\n\nIn everyday life, that could mean some stretches where you naturally want to do more, followed by stretches where your system prefers a slower, tidier pace. Around midyear, a change of scene or routine may help you reset; later, a more regular schedule can feel stabilizing. The point isn’t to optimize every hour, but to notice what keeps you clear-headed and what makes you feel scattered.\n\nA good starting point is simple: keep one or two routines stable, and let the rest be flexible. That gives the year room to support you without making you overmanage it."
   }
  },
  "months": [
   {
    "headline": "February: first push",
    "body": "This month favors initiative, results, and a stronger sense of control. The Birth-like feeling can make new starts easier, while the on-the-move signal suggests movement, trips, or quick changes of scene. If you keep your aims focused, the month can reward momentum without needing to be loud."
   },
   {
    "headline": "March: refine the plan",
    "body": "March keeps the same active current, but the small-hiccups note asks for a little more checking. You may find that a fast start works best when paired with one extra review. It’s a good month to correct before you commit."
   },
   {
    "headline": "April: pressure that shapes",
    "body": "April leans toward responsibility and a more serious tempo. The inner-world tone can make you more reflective, even if the outside pace stays busy. If you choose depth over speed, the month may leave you feeling sturdier."
   },
   {
    "headline": "May: strong but uneven",
    "body": "May brings a peak-effort feeling, so you may be asked to give a lot at once. The unexpected-turns signal suggests that flexibility matters as much as drive. A good move here is to stay alert without getting rigid."
   },
   {
    "headline": "June: help arrives",
    "body": "June is one of the more supportive months of 2027, with a fuller sense of fuel and backing. The friction note says something in the environment may rub against your timing, especially through a shift that asks for adaptation. If you treat the change as a reset point, it can open a cleaner route."
   },
   {
    "headline": "July: soft support",
    "body": "July keeps the supportive current, but in a looser, more open way. The wildcard quality can bring mixed timing, pleasant surprises, or a sense that plans are easier to bend than to force. That makes it a good month for staying responsive rather than overdesigning the outcome."
   },
   {
    "headline": "August: familiar ease",
    "body": "August feels steady and recognizable, with less pressure to invent something new. Fresh ground suggests a small sense of renewal even inside a comfortable routine. You may enjoy doing ordinary things in a cleaner, more settled way."
   },
   {
    "headline": "September: tidy the edges",
    "body": "September keeps the same familiar tone, but with a stronger need to sort, organize, and decide what stays. The magnetism note can make people, ideas, or tasks gather around you more easily. It’s a good month to choose what deserves your attention instead of letting everything pull equally."
   },
   {
    "headline": "October: give and spend",
    "body": "October shifts toward expression, production, and generosity. The quiet-storage tone suggests your energy may be working behind the scenes even while output rises. You may do well to make useful things, but not to empty yourself doing it."
   },
   {
    "headline": "November: clarity check",
    "body": "November continues the expressive pace, though the reset quality can make it feel like a fresh draft rather than a final version. Misread moments are possible, so it helps to verify what others mean instead of filling in the blanks too quickly. Clear wording can save time here."
   },
   {
    "headline": "December: firm direction",
    "body": "December brings back the stronger lead-taking current, with a more direct sense of command. The conception tone supports beginnings that are still forming, which can be useful for setting up next steps rather than demanding immediate results. If you choose one direction and keep it clean, the month can feel purposeful."
   },
   {
    "headline": "January: doors open",
    "body": "January carries the same managing energy, but with more of a gathered, incubating feeling. The advancement note suggests things may line up well when you are ready to step forward. Because this month also connects more smoothly with your own base, it can be a good time to make a simple plan and let it take shape."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: set the frame",
    "body": "Watch for the months when momentum is strongest but pressure starts to build. Use that window to choose one main goal, define your limits early, and keep a short checklist so the pace stays manageable."
   },
   {
    "title": "May to July: adapt in motion",
    "body": "Notice where unexpected turns or friction ask you to change course without abandoning the plan. Try one flexible habit, such as a weekly review or a backup option, so you can move with the year instead of against it."
   },
   {
    "title": "August to October: organize output",
    "body": "Pay attention to the stretch where things feel familiar, then productive, then more demanding. Turn that into action by sorting your tasks, batching similar work, and protecting a little energy for the moments when output rises."
   },
   {
    "title": "November to January: close and prepare",
    "body": "Watch for places where wording, timing, or direction can be misunderstood, then correct them early. Make one clear plan for the next step, and let January carry it forward without forcing speed."
   }
  ],
  "closing": "From age 40 to 49, the Earth energy in your 10-year cycle becomes stronger, and that is a real turning point in the larger pattern of your life. In 2027, that future shift does not need to be rushed; the year itself already offers you support, recovery, and a clearer sense of how to use your strength well. If you let the year’s warmth work with your natural structure, Sam, you can move through it with more ease than effort."
 }
};

// 5-set chat flow (flowVersion 2) reports with test × conversation cards — scripts/gen-qa-fixtures.mts.
export const QA_DEEP_REPORT_V2: Record<string, { content: any; quizDiagnosis: any; chatExtract: any }> = {
 "jisoo": {
  "content": {
   "title_line1": "지치는데도 손을 놓지 못하는 사람",
   "title_line2": "끝까지 붙잡는 힘이 오히려 몸을 먼저 닳게 해요",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "일요일 밤부터 메신저 알림이 하나씩 쌓이면, 지수님은 이미 잠을 설친 채로 월요일을 맞이해요. 알람을 끄고 누운 자리에서 오늘 해야 할 일 목록부터 떠오르고, 머리는 먼저 달리는데 몸은 따라오지 못해요. 지하철 안에서도 내일 보고서 문장을 고치고, 누워서도 오늘 보낸 메일을 다시 읽어요. 쉬어도 크게 달라지지 않는다는 감각이 몇 달째 이어지고 있어요. 지수님, 요즘 이런 모습 아니세요?",
   "case_tag": "가상 사례 — 서연, 30대 초반, 팀 업무가 몰린 상황",
   "case_paragraphs": [
    "서연은 아침마다 눈을 뜨자마자 오늘 할 일부터 떠올라서 벌써 진이 빠져요. 금요일까지 몰아서 버티고 주말에 쓰러지듯 쉬어도 월요일이면 피로가 그대로예요. 사주에서도 토 기운이 50%로 우세해서 현실과 일을 붙잡는 힘이 크고, 수 기운은 0%라서 지친 마음을 부드럽게 풀어 줄 흐름이 비어 있어요. 당신도 그렇게 버티는 쪽이 먼저 몸에 남는 날이 있죠."
   ],
   "oheng_intro": "지수님은 토 50%가 가장 강하고, 수 0%가 가장 비어 있어요. 일간이 갑목이니, 토는 지수님이 다루는 현실과 일의 무게로 느껴지고, 수는 지수님을 살려 주는 지원과 배움의 숨결로 읽혀요. 그래서 번아웃이 단순한 피곤함이 아니라, 맡은 양을 계속 붙잡는 동안 숨 쉴 쪽이 비어 있는 모습으로 나타나요.",
   "quiz_reading": "지수님은 소진 84%와 효능감 저하 71%가 함께 높고, 냉소는 16%로 낮아요. 그래서 유형 이름은 소진형이지만, 마음이 식어서가 아니라 에너지가 먼저 바닥나는 쪽에 가까워요. 일은 계속 붙들고 있는데, 간단한 메일 답장조차 생각만 해도 진이 빠지는 장면으로 이 조합이 드러나요.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 보통 — 생각이 먼저 뻗는 가지",
     "body": "목 33%는 적지 않아서, 지수님 머릿속에서는 할 일의 줄기가 자꾸 뻗어요. 알람을 끄자마자 오늘 할 일 목록이 떠오르는 장면이 바로 이 기운의 속도예요. 다만 토가 더 강해서, 생각은 자라는데 몸은 그만큼 가볍게 움직이지 못해요."
    },
    "fire": {
     "heading": "🔥 화 약하다 — 열이 아니라 버티는 온기",
     "body": "화 0%는 겉으로 드러나는 불꽃보다 오래 타는 열감이 부족하다는 뜻으로 읽혀요. 지수님은 일을 싫어해서가 아니라, 좋아하는 마음이 있어도 그 열이 쉽게 밖으로 번지지 않는 쪽이에요. 그래서 지하철에서도 보고서 문장을 고치고 있는데, 힘은 쓰고 있는데 표정은 쉽게 뜨거워지지 않아요."
    },
    "earth": {
     "heading": "⛰️ 토 강하다 — 손에서 놓지 않는 무게",
     "body": "토 50%는 지수님이 맡은 일과 현실을 끝까지 붙잡는 힘으로 보여요. 주말에 쓰러지듯 쉬어도 월요일이면 다시 같은 무게를 들어 올리는 모습이 여기 들어 있어요. 갑목인 지수님에게 토는 다루어야 할 일의 무게라서, 책임을 놓기보다 더 단단히 쥐는 방향으로 작동해요."
    },
    "metal": {
     "heading": "💎 금 보통 — 정리와 기준의 힘",
     "body": "금 17%는 완전히 약하지도, 압도적으로 강하지도 않은 정리의 감각이에요. 지수님이 메일을 다시 읽고, 문장을 고치고, 확인을 여러 번 하는 습관 안에는 이 금의 기준이 들어 있어요. 다만 그 기준이 쉬는 쪽보다 일의 완성도를 먼저 세우면서, 밤까지 머리를 깨어 있게 만들어요."
    },
    "water": {
     "heading": "💧 수 약하다 — 살려 주는 숨이 비어 있는 자리",
     "body": "수 0%는 지수님에게 지원과 배움, 보호의 숨이 쉽게 채워지지 않는 상태로 보여요. 약한 원소인 수는 금이 수를 살려 준다는 흐름으로 채워지는데, 지금은 그 도움의 통로가 얇게 느껴져요. 그래서 쉬어도 쉬는 것 같지 않고, 회복이 몸에 잘 닿지 않는 장면이 반복돼요."
    }
   },
   "upcoming_period_preview_heading": "",
   "upcoming_period_preview_body": "",
   "module_map": {
    "title": "에너지 수지표",
    "body": "지수님은 일의 양이 늘어날수록 버티는 힘으로 먼저 버텨요. 그런데 소진 84%와 효능감 저하 71%가 같이 높아서, 버티는 동안 에너지는 빠져가고 스스로에 대한 확신도 같이 얇아져요. 냉소 16%가 낮다는 건 일 자체를 놓아버린 상태가 아니라는 뜻이라, 마음은 아직 붙어 있는데 몸과 자존감이 동시에 지치는 구조로 보여요. 그래서 요구는 계속 들어오는데 자율적으로 쉬고 회복하는 자원은 적게 느껴지는 쪽으로 기울어 있어요."
   },
   "module_deep": {
    "title": "다시 채우는 순서",
    "body": "첫 단계는 일의 양이 아니라 확인의 양부터 덜어내는 거예요. 지수님은 이미 한계라 거절하고 싶어진다고 답했으니, 새로운 요청이 들어올 때 바로 받지 말고 오늘 처리할 것과 내일 넘길 것을 먼저 나눠 적어 두는 게 시작이에요. 두 번째는 혼자 끝까지 잡고 있던 부분을 한 칸만 밖으로 빼는 거예요. 부탁하는 순간 감당 못 한다는 뜻이 아니라는 걸 몸이 배우려면, 자료 정리나 일정 확인처럼 작은 조각부터 맡겨 보는 쪽이 맞아요. 세 번째는 퇴근 후 10분의 회복을 일 생각으로 채우지 않는 거예요. 유튜브를 끌어다 새벽으로 넘기기보다, 알람 없이 일어나 목적 없이 걷고 싶다는 마음을 떠올리며 머리가 붙잡는 일을 잠깐 내려두는 시간이 필요해요."
   },
   "set_card_1": {
    "set": 1,
    "theme": "scene",
    "quiz": {
     "id": "E3",
     "prompt": "아침에 눈을 뜨면?",
     "label": "눈뜨자마자 이미 지쳐있다",
     "score": 3
    },
    "quote": "월요일 아침이요. 일요일 밤부터 메신저 알림이 하나씩 쌓이는 게 보이면 잠도 설쳐요.",
    "note": "눈앞에 쌓이는 알림과 그걸 보는 순간의 긴장이 함께 보였어요. 지수님은 일이 시작되기도 전에 몸이 먼저 반응하는 편이에요. 그래서 아침이 오기 전부터 이미 하루를 다 써 버린 느낌이 들어요."
   },
   "set_cards_2to5": [
    {
     "set": 2,
     "theme": "repeat",
     "quiz": {
      "id": "E9",
      "prompt": "새로운 일이나 요청이 들어오면?",
      "label": "이미 한계라 거절하고 싶어진다",
      "score": 3
     },
     "quote": "쉬어도 크게 달라지지 않아요.",
     "note": "새 요청이 들어오는 순간 지수님 안에서 바로 한계선이 먼저 켜지는 상태예요. 일이 많아서가 아니라, 이미 버티는 데 많은 힘을 써서 더 얹을 자리가 얇아진 모습으로 읽혀요. 지금은 거절을 실패가 아니라 용량 확인으로 보는 연습이 필요해요."
    },
    {
     "set": 3,
     "theme": "inner",
     "quiz": {
      "id": "F9",
      "prompt": "새로운 역할이나 책임을 맡게 되면?",
      "label": "내가 감당 못 할 것 같아 두렵다",
      "score": 2
     },
     "quote": "언젠가 제가 별거 아니라는 게 드러날 것 같아서요.",
     "note": "새 역할이 오면 기대보다 두려움이 먼저 올라오는 마음이 그대로 드러나요. 지수님은 맡는 순간부터 실수와 부족함을 크게 계산하는 편이라, 시작보다 검토가 앞서요. 그래서 지금 필요한 건 능력을 증명하는 속도보다, 두려움이 올라와도 혼자만 책임지지 않는 구조예요."
    },
    {
     "set": 4,
     "theme": "coping",
     "quiz": {
      "id": "E8",
      "prompt": "잠들기 전 상태는?",
      "label": "몸은 지쳤는데 머리는 각성돼 있다",
      "score": 3
     },
     "quote": "그럴 땐 유튜브를 틀어 놓고 잠들 때까지 봐요. 생각을 끄려고요. 근데 그러면 새벽 두 시가 돼요.",
     "note": "지수님은 쉬는 시간에도 일을 완전히 내려놓지 못하고, 머리가 계속 확인 모드에 머물러 있어요. 겉으로는 멈춘 것 같아도 안에서는 아직 업무가 끝나지 않은 상태로 남아 있다는 뜻이에요. 그래서 잠들기 전에는 생각을 끄려 하기보다, 머리가 붙잡는 일을 짧게 적어 밖으로 빼두는 쪽이 더 맞아요."
    },
    {
     "set": 5,
     "theme": "strength",
     "quiz": {
      "id": "C3",
      "prompt": "일의 결과물에 대한 관심은?",
      "label": "여전히 진심으로 신경 쓴다",
      "score": 0
     },
     "quote": "네, 그건 맞아요. 지쳐도 결과물은 대충 넘기지 못해요. 그게 저를 힘들게도 하지만요.",
     "note": "지수님은 지쳐도 결과물의 질을 놓지 않는 사람이에요. 이 답은 소진이 있어도 일 자체를 대충 넘기지 못하는 마음이 아직 살아 있다는 걸 보여줘요. 그래서 지금의 피로는 무관심이 아니라, 진심을 오래 써서 생긴 무게에 가깝다고 봐요."
    }
   ],
   "strengths_preview": [
    {
     "title": "책임감",
     "body": "지수님은 결과물에 대해 여전히 진심으로 신경 쓴다고 답했어요. 지쳐도 대충 넘기지 못하고, 후배가 자료를 보고 덕분에 이해됐다고 할 때 기분이 좋아진다는 말이 그걸 보여줘요. 손이 느려져도 기준을 놓지 않는 힘이 분명해요."
    },
    {
     "title": "버티는 힘",
     "body": "주말 내내 누워 있었는데도 월요일에 똑같이 피곤하다고 말한 건, 버틴 시간이 짧아서가 아니라 정말 오래 버텼다는 뜻이에요. 금요일까지 몰아서 버티는 패턴이 몇 달째 이어져도 일을 끊지 않는 점이 그 힘을 말해요. 쉽게 무너지기보다 끝까지 가 보는 쪽이에요."
    },
    {
     "title": "잘하고 싶은 마음",
     "body": "새 프로젝트 리드를 맡았을 때 기쁘기보다 무서웠다고 했지만, 그 안에는 잘해 내고 싶은 마음이 분명히 있어요. 실수 하나가 그동안 쌓은 걸 다 무너뜨릴 것 같아서 남들보다 두 번 세 번 확인한다고 했죠. 두려움이 큰 만큼, 결과를 가볍게 대하지 않는 태도도 함께 보여요."
    }
   ],
   "upcoming_period_heading": "36세부터, 수의 계절이 열려요",
   "upcoming_period_body": "36세부터 45세까지는 수 기운이 강해지는 시기라서, 지수님이 혼자 버티는 방식만으로는 오래 가기 어려웠던 자리에서 도움과 배움이 실제로 들어오는 흐름으로 바뀌어요. 지금까지는 일이 늘수록 더 꽉 쥐는 쪽이었다면, 그 시기에는 확인과 책임만으로 버티던 구조가 조금 덜 빡빡해져요. 그래서 지금부터는 모든 걸 직접 끝까지 붙드는 습관보다, 누가 어떤 부분을 채워 줄 수 있는지 미리 나눠 두는 준비가 더 중요해요. 특히 혼자 감당하는 메일 답장, 일정 정리, 마감 확인을 전부 한 손에 쥐지 않도록 기준을 세워 두면 그 뒤의 흐름이 훨씬 덜 소모적이에요.",
   "cross_analysis_quotes": [
    "지수님은 토 50%가 강하고 소진 84%가 높아서, 맡은 현실을 끝까지 붙드는 힘이 에너지를 먼저 닳게 해요. 몸이 이미 바닥인데도 손은 일을 놓지 않는 구조가 여기서 그대로 보여요. 그래서 버티는 힘이 강점이면서 동시에 소진을 키우는 방식으로도 작동해요.",
    "수 0%와 효능감 저하 71%가 함께 있어서, 지수님은 나를 살려 주는 숨이 비어 있을수록 스스로의 능력도 더 의심하게 돼요. 도움을 받는 감각이 약해질수록 '내가 감당 못 할 것 같아 두렵다'는 마음이 더 커지는 흐름이에요. 지금 필요한 건 더 세게 밀어붙이는 게 아니라, 회복과 배움이 들어올 틈을 먼저 만드는 일이에요."
   ],
   "answer_notes": [],
   "chat_snapshot_note": "",
   "chat_trigger_note": "",
   "chat_repeat_note": "",
   "chat_fear_note": "",
   "psychology_fact_heading": "볼비의 불안-회피가 아니라 애착의 불안정성과 자기확신",
   "psychology_fact_body": "볼비의 애착 이론은 중요한 관계에서 안전감이 어떻게 생기고 흔들리는지 보게 해요. 지수님은 괜찮냐는 질문에 괜찮다고 답하고, 혼자 끝까지 확인하는 쪽으로 움직여요. 그래서 겉으로는 독립적으로 보여도, 안쪽에서는 도움을 받는 감각보다 스스로 무너지지 않아야 한다는 긴장이 더 앞서 있어요. 새 역할이 주어질 때 두려움이 크게 올라오는 것도, 관계의 안전감이 약할수록 자기확신이 같이 흔들리는 모습으로 읽혀요.",
   "psychology_takeaway": "혼자 버티는 힘이 강할수록, 도움을 받는 연습은 더 늦어지기 쉬워요. 지수님은 약해서 흔들리는 게 아니라, 오래 혼자 견뎌서 흔들림이 커진 쪽이에요.",
   "strengths": [
    {
     "title": "방향 감각",
     "body": "갑목인 지수님은 일을 붙들기만 하는 사람이 아니라, 어디를 향해 가야 하는지 스스로 방향을 세우는 힘이 있어요. 새 프로젝트 리드를 맡았을 때 무섭다고 했어도, 남들보다 두세 번 더 확인하면서 결국 흐름을 놓치지 않으려 했죠. 지하철 안에서도 내일 보고서 문장을 고쳐 보는 모습에는, 흐트러진 상황 속에서 기준선을 다시 잡는 감각이 보여요. 이건 지수님이 단순히 버티는 사람이 아니라, 버티면서도 길을 잃지 않으려는 사람이라는 뜻이에요."
    }
   ],
   "weaknesses": [
    {
     "title": "과부하",
     "body": "지수님은 양이 늘어날수록 먼저 거절보다 흡수 쪽으로 움직여요. 사람들은 다 괜찮은데 제가 맡은 게 계속 늘어난다고 했던 말이 그 구조를 보여줘요. 버틸 수 있는 만큼만 들어오는 게 아니라, 버티는 힘 때문에 더 얹히는 흐름이 반복돼요."
    },
    {
     "title": "자기 의심",
     "body": "칭찬이 와도 과분하다고 느끼고, 중요한 결정을 내려야 할 때는 자격이 없다고 느껴요. 실수 하나가 그동안 쌓은 걸 다 무너뜨릴 것 같아서, 확인이 끝나지 않는 방향으로 마음이 흘러가요. 그래서 스스로의 능력을 보는 눈이 늘 실제보다 더 엄격해져요."
    },
    {
     "title": "쉬지 못함",
     "body": "누우면 오늘 보낸 메일을 다시 읽고, 유튜브를 틀어 놓고서도 새벽 두 시가 되는 흐름이 반복돼요. 몸은 쉬는 자리에 있는데 머리는 여전히 일 안쪽에 머물러 있어요. 쉬는 시간이 회복이 아니라 연장된 업무처럼 느껴지는 게 지수님한테는 제일 큰 피로예요."
    },
    {
     "title": "도움 회피",
     "body": "혼자 끝까지 해요, 부탁하는 순간 제가 감당 못 한다고 인정하는 것 같다고 했죠. 괜찮냐는 질문에도 괜찮다고 넘기는 방식이 익숙해져 있어요. 그래서 실제로는 힘이 빠져도, 외부의 손을 받기보다 혼자 증명하려는 쪽으로 더 굳어져요."
    }
   ],
   "fit_good": "지수님에게 맞는 날은, 오전에 들어온 일을 한 번에 몰아넣지 않고 중간중간 기준을 나눠 확인할 수 있는 날이에요. 팀장이 괜찮냐고 묻기 전에 먼저 업무 범위를 나눠 말할 수 있고, 후배가 자료를 보고 이해됐다고 말할 때 그 시간이 제대로 보상으로 돌아와요. 퇴근 뒤에는 노트북을 카페까지 들고 가지 않아도 되는 구조가 있어야 해요.",
   "fit_bad": "지수님을 더 빨리 닳게 하는 날은, 요청이 계속 추가되는데 누가 정리해 주지는 않는 날이에요. 금요일까지 몰아서 버티고 주말에 쓰러지는 패턴이 있는 상태에서, 마지막 확인까지 전부 지수님 몫으로 남으면 머리만 더 오래 켜져요. 하루 끝에 '괜찮죠?'만 남고 실제로 줄어드는 일이 없는 환경은 특히 맞지 않아요.",
   "behavior_guides": [
    {
     "title": "멈춤 메모",
     "body": "잠들기 전 메일을 다시 읽고 싶어질 때, 바로 화면을 닫지 말고 오늘 남은 걱정만 세 줄로 적어 두세요. 3분이면 충분해요. 적은 뒤에는 노트북을 덮고 침대에 눕기 전에 물 한 잔만 마셔요."
    },
    {
     "title": "요청 분리",
     "body": "새 일이 들어오면 즉시 답하지 말고 10분 동안 지금 할 일과 미룰 일을 나눠 적으세요. 그다음에만 답을 보내요. '지금은 여기까지'를 먼저 정해 두면, 한계가 덜 무너져요."
    },
    {
     "title": "도움 한 칸",
     "body": "하루에 한 번은 자료 정리나 일정 확인처럼 작은 일을 한 사람에게 맡겨 보세요. 부탁은 크게 하지 않아도 돼요. 대신 끝까지 혼자 붙잡는 습관을 아주 조금만 늦추는 연습이 돼요."
    },
    {
     "title": "퇴근 차단",
     "body": "퇴근 후 첫 30분은 노트북을 열지 말고, 휴대폰 알림도 업무 채팅만 꺼 두세요. 그 시간에 해야 할 일 대신 산책이나 샤워를 먼저 넣어요. 머리가 각성돼도 몸이 먼저 집으로 돌아오게 만드는 장치예요."
    }
   ],
   "mindset_guide": "지수님은 쉬면 뒤처질 것 같아서 못 쉬는 사람이에요. 하지만 지금의 문제는 게으름이 아니라 과부하예요. 물건을 계속 얹어 두는 책상은 결국 흔들려요. 책상 위를 비우는 건 포기가 아니라, 다시 버틸 자리를 만드는 일이에요.",
   "closing_title": "덜 닳고도 잘하는 쪽으로",
   "closing_body": "36세부터 45세까지는 수의 계절이 열리고, 지수님이 혼자 버티던 방식에 도움과 배움이 들어오기 시작해요. 그 뒤로는 일을 더 세게 쥐는 대신, 덜 닳는 방식으로도 결과를 만들 수 있어요. 오늘의 지수님은 여전히 금요일까지 몰아붙이고 주말에 쓰러질 만큼 버티고 있지만, 앞으로는 그 무게가 조금씩 분산돼요. 스스로에게 \"그 정도면 충분히 했다고요\"라고 말해 주는 연습이, 지금의 지수님을 덜 지치게 해줘요."
  },
  "quizDiagnosis": {
   "moduleId": "module3",
   "moduleTitle": "모듈 3 · 번아웃",
   "track": "career",
   "answers": [
    {
     "qId": "E1",
     "dimension": "exhaustion",
     "prompt": "퇴근 후(혹은 일과 후) 피로감 정도는?",
     "label": "8/10",
     "score": 2.3333333333333335
    },
    {
     "qId": "E2",
     "dimension": "exhaustion",
     "prompt": "일주일 중 에너지가 남아있는 날은?",
     "label": "일주일 내내 방전 상태다",
     "score": 2
    },
    {
     "qId": "E3",
     "dimension": "exhaustion",
     "prompt": "아침에 눈을 뜨면?",
     "label": "눈뜨자마자 이미 지쳐있다",
     "score": 3
    },
    {
     "qId": "E4",
     "dimension": "exhaustion",
     "prompt": "간단한 일(메일 답장, 잡무 등)도?",
     "label": "생각만 해도 진이 빠진다",
     "score": 3
    },
    {
     "qId": "E5",
     "dimension": "exhaustion",
     "prompt": "주말이나 휴가가 끝나면?",
     "label": "쉬어도 크게 달라지지 않는다",
     "score": 2
    },
    {
     "qId": "E6",
     "dimension": "exhaustion",
     "prompt": "몸의 컨디션(두통, 소화불량, 근육긴장 등)은?",
     "label": "여기저기 안 아픈 데가 없다",
     "score": 3
    },
    {
     "qId": "E7",
     "dimension": "exhaustion",
     "prompt": "하루 일과를 마치고 나면 감정은?",
     "label": "탈진한 느낌이 든다",
     "score": 2
    },
    {
     "qId": "E8",
     "dimension": "exhaustion",
     "prompt": "잠들기 전 상태는?",
     "label": "몸은 지쳤는데 머리는 각성돼 있다",
     "score": 3
    },
    {
     "qId": "E9",
     "dimension": "exhaustion",
     "prompt": "새로운 일이나 요청이 들어오면?",
     "label": "이미 한계라 거절하고 싶어진다",
     "score": 3
    },
    {
     "qId": "E10",
     "dimension": "exhaustion",
     "prompt": "스스로 느끼는 전반적인 에너지 수준은?",
     "label": "바닥나 있다",
     "score": 2
    },
    {
     "qId": "C1",
     "dimension": "cynicism",
     "prompt": "일에 대해 무감각하거나 냉소적으로 느껴지는 정도는?",
     "label": "3/10",
     "score": 0.6666666666666666
    },
    {
     "qId": "C2",
     "dimension": "cynicism",
     "prompt": "동료나 고객을 대할 때?",
     "label": "예전처럼 마음 써서 대한다",
     "score": 0
    },
    {
     "qId": "C3",
     "dimension": "cynicism",
     "prompt": "일의 결과물에 대한 관심은?",
     "label": "여전히 진심으로 신경 쓴다",
     "score": 0
    },
    {
     "qId": "C4",
     "dimension": "cynicism",
     "prompt": "회사(혹은 조직)에 대한 감정은?",
     "label": "무난한 정도다",
     "score": 1
    },
    {
     "qId": "C5",
     "dimension": "cynicism",
     "prompt": "예전엔 열정적으로 했던 일을 지금은?",
     "label": "여전히 그 열정이 남아있다",
     "score": 0
    },
    {
     "qId": "C6",
     "dimension": "cynicism",
     "prompt": "일하면서 드는 냉소적인 생각(예: 어차피 다 소용없다)은?",
     "label": "가끔 스친다",
     "score": 1
    },
    {
     "qId": "C7",
     "dimension": "cynicism",
     "prompt": "함께 일하는 사람들에 대한 신뢰는?",
     "label": "여전히 두텁다",
     "score": 0
    },
    {
     "qId": "C8",
     "dimension": "cynicism",
     "prompt": "일의 의미나 목적에 대해 생각하면?",
     "label": "그럭저럭 의미는 있다",
     "score": 1
    },
    {
     "qId": "C9",
     "dimension": "cynicism",
     "prompt": "문제가 생겼을 때 반응은?",
     "label": "해결하려 노력하는 편이다",
     "score": 1
    },
    {
     "qId": "C10",
     "dimension": "cynicism",
     "prompt": "일에 대한 이야기를 할 때 스스로 느끼기에?",
     "label": "긍정적으로 말한다",
     "score": 0
    },
    {
     "qId": "F1",
     "dimension": "efficacyLoss",
     "prompt": "스스로의 능력이나 성과를 의심하는 정도는?",
     "label": "8/10",
     "score": 2.3333333333333335
    },
    {
     "qId": "F2",
     "dimension": "efficacyLoss",
     "prompt": "스스로의 능력에 대한 확신은?",
     "label": "대체로 괜찮다고 느낀다",
     "score": 1
    },
    {
     "qId": "F3",
     "dimension": "efficacyLoss",
     "prompt": "칭찬을 받으면?",
     "label": "과분하다고 느낀다",
     "score": 2
    },
    {
     "qId": "F4",
     "dimension": "efficacyLoss",
     "prompt": "어려운 과제가 주어지면?",
     "label": "내가 감당할 수 있을지 의문이 든다",
     "score": 2
    },
    {
     "qId": "F5",
     "dimension": "efficacyLoss",
     "prompt": "실수를 하면?",
     "label": "내 무능함이 드러난 것 같아 괴롭다",
     "score": 3
    },
    {
     "qId": "F6",
     "dimension": "efficacyLoss",
     "prompt": "다른 사람과 비교했을 때 나의 능력은?",
     "label": "뒤처진다고 자주 느낀다",
     "score": 2
    },
    {
     "qId": "F7",
     "dimension": "efficacyLoss",
     "prompt": "중요한 결정을 내려야 할 때?",
     "label": "결정을 내릴 자격이 없다고 느낀다",
     "score": 3
    },
    {
     "qId": "F8",
     "dimension": "efficacyLoss",
     "prompt": "지금까지 이뤄온 것들을 돌아보면?",
     "label": "나쁘지 않다고 느낀다",
     "score": 1
    },
    {
     "qId": "F9",
     "dimension": "efficacyLoss",
     "prompt": "새로운 역할이나 책임을 맡게 되면?",
     "label": "내가 감당 못 할 것 같아 두렵다",
     "score": 2
    },
    {
     "qId": "F10",
     "dimension": "efficacyLoss",
     "prompt": "스스로에게 하는 평가는?",
     "label": "무능하다고 느낄 때가 많다",
     "score": 3
    }
   ],
   "dimensionResults": [
    {
     "dimension": "exhaustion",
     "rawScore": 25.333333333333336,
     "maxScore": 30,
     "percentOfMax": 84.4,
     "distanceFromMid": 68.9,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "cynicism",
     "rawScore": 4.666666666666666,
     "maxScore": 30,
     "percentOfMax": 15.6,
     "distanceFromMid": 68.9,
     "direction": "low",
     "intensity": "강함"
    },
    {
     "dimension": "efficacyLoss",
     "rawScore": 21.333333333333336,
     "maxScore": 30,
     "percentOfMax": 71.1,
     "distanceFromMid": 42.2,
     "direction": "high",
     "intensity": "보통"
    }
   ],
   "classification": {
    "activeDimensions": [
     "exhaustion"
    ],
    "kind": "single",
    "typeKey": "exhaustion"
   },
   "typeInfo": {
    "title": "소진형",
    "hook": "에너지가 바닥난 상태지만, 일에 대한 애정과 자기 확신은 아직 남아있습니다."
   },
   "nuancedSummary": "소진이 꽤 뚜렷하고, 일에 대한 애정이 꽤 뚜렷하고, 효능감저하가 다소 나타나고요.",
   "dimensionShortNames": {
    "exhaustion": "소진",
    "cynicism": "냉소",
    "efficacyLoss": "효능감 저하"
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
   "repeat_pattern": "금요일까지 몰아서 버티고 주말에 쓰러지기",
   "core_fear_or_meaning": "쉬면 뒤처지고, 언젠가 별거 아니라는 게 드러날까 봐 두려워요",
   "summary_quote": "쉬어도 크게 달라지지 않아요",
   "integrated_summary": "눈뜨자마자 오늘 할 일부터 떠올리며 지치고, 금요일까지 몰아서 버틴 뒤 주말에 쓰러지는 흐름이 몇 달째 이어집니다. 그 밑에는 쉬면 뒤처지고 언젠가 부족함이 드러날 거라는 두려움이 있고, 그래서 도움을 청하지 않고 혼자 끝까지 확인합니다.",
   "coping": "잠들 때까지 유튜브를 틀어 놓아요",
   "relational": "괜찮냐는 질문에 괜찮다고 해요",
   "desired_change": "알람 없이 일어나 목적 없이 걷고 싶어요",
   "set_packets": [
    {
     "set": 1,
     "theme": "scene",
     "quiz": {
      "id": "E3",
      "dimension": "exhaustion",
      "prompt": "아침에 눈을 뜨면?",
      "label": "눈뜨자마자 이미 지쳐있다",
      "score": 3
     },
     "opening_answers": [
      "맞아요. 알람 끄고 누운 채로 오늘 해야 할 일 목록부터 떠올리는데, 그때 벌써 진이 빠져요.",
      "특히 월요일 아침이요. 일요일 밤부터 메신저 알림이 하나씩 쌓이는 게 보이면 잠도 설쳐요."
     ],
     "module_answers": [
      "양이요. 사람들은 다 괜찮은데, 제가 맡은 게 계속 늘어나요. 거절을 잘 못 해서요.",
      "몸이 무거운 쪽이에요. 마음은 아직 잘하고 싶은데 몸이 안 따라와요.",
      "계속 일 생각이요. 지하철에서도 내일 보고서 문장을 고치고 있어요."
     ],
     "has_chat": true
    },
    {
     "set": 2,
     "theme": "repeat",
     "quiz": {
      "id": "E9",
      "dimension": "exhaustion",
      "prompt": "새로운 일이나 요청이 들어오면?",
      "label": "이미 한계라 거절하고 싶어진다",
      "score": 3
     },
     "opening_answers": [
      "쉬어도 크게 달라지지 않아요. 주말 내내 누워 있었는데 월요일에 똑같이 피곤했어요.",
      "보통 금요일까지 몰아서 버티고, 주말에 쓰러지듯 자고, 일요일 저녁부터 다시 불안해져요. 그게 몇 달째 반복이에요."
     ],
     "module_answers": [
      "작년 연말 결산 때도 그랬어요. 그때는 프로젝트가 끝나면 괜찮아질 줄 알았는데 이번엔 끝이 안 보여요.",
      "일이 많은 거요. 알아주긴 하는데, 잘한다는 말을 들으면 일이 더 와요."
     ],
     "has_chat": true
    },
    {
     "set": 3,
     "theme": "inner",
     "quiz": {
      "id": "F9",
      "dimension": "efficacyLoss",
      "prompt": "새로운 역할이나 책임을 맡게 되면?",
      "label": "내가 감당 못 할 것 같아 두렵다",
      "score": 2
     },
     "opening_answers": [
      "네, 새 프로젝트 리드를 맡았을 때 사실 기쁘기보다 무서웠어요. 언젠가 제가 별거 아니라는 게 드러날 것 같아서요.",
      "그래서 남들보다 두 번 세 번 확인해요. 실수 하나가 그동안 쌓은 걸 다 무너뜨릴 것 같거든요."
     ],
     "module_answers": [
      "빼 가는 건 끝없는 확인 작업이고, 채워 주는 건 퇴근 후에 동생이랑 통화하는 10분이요.",
      "제 안에서요. 아무도 쉬지 말라고 안 했는데, 쉬면 뒤처질 것 같아서 제가 못 쉬어요.",
      "솔직히 잘해 내는 제 모습이었던 것 같아요. 인정받을 때 살아 있는 느낌이었어요."
     ],
     "has_chat": true
    },
    {
     "set": 4,
     "theme": "coping",
     "quiz": {
      "id": "E8",
      "dimension": "exhaustion",
      "prompt": "잠들기 전 상태는?",
      "label": "몸은 지쳤는데 머리는 각성돼 있다",
      "score": 3
     },
     "opening_answers": [
      "그거 완전 저예요. 누우면 오늘 보낸 메일을 머릿속에서 다시 읽어요.",
      "그럴 땐 유튜브를 틀어 놓고 잠들 때까지 봐요. 생각을 끄려고요. 근데 그러면 새벽 두 시가 돼요."
     ],
     "module_answers": [
      "쉬면서도 일 생각이 나요. 카페에 가도 노트북을 챙겨 가요.",
      "혼자 끝까지 해요. 부탁하는 순간 제가 감당 못 한다고 인정하는 것 같아서요.",
      "팀장님이 한 번 괜찮냐고 물었는데, 괜찮다고 했어요. 아마 아무도 모를 거예요."
     ],
     "has_chat": true
    },
    {
     "set": 5,
     "theme": "strength",
     "quiz": {
      "id": "C3",
      "dimension": "cynicism",
      "prompt": "일의 결과물에 대한 관심은?",
      "label": "여전히 진심으로 신경 쓴다",
      "score": 0
     },
     "opening_answers": [
      "네, 그건 맞아요. 지쳐도 결과물은 대충 넘기지 못해요. 그게 저를 힘들게도 하지만요.",
      "후배가 제 자료를 보고 덕분에 이해됐다고 할 때요. 그때는 피곤해도 기분이 좋아요."
     ],
     "module_answers": [
      "아침에 알람 없이 일어나서 한강 따라 천천히 걷고 싶어요. 아무 목적 없이요."
     ],
     "has_chat": true,
     "perspective_answer": "친구였다면 그만 좀 확인하고 오늘은 일찍 자라고 했을 거예요. 그 정도면 충분히 했다고요."
    }
   ]
  }
 },
 "lucia": {
  "content": {
   "title_line1": "Cuando un «ok» seco te deja la noche abierta",
   "title_line2": "y tu mente empieza a buscar el error antes que la calma",
   "subtitle": "Lucía, módulo 1 — Amor y apego — sastre espiritual: saju × psicología × acompañamiento integrado",
   "opening_scene": "La semana pasada contestó con un «ok» seco y te pasaste la tarde releyendo el chat para ver dónde te habías equivocado. La pantalla seguía ahí, quieta, pero por dentro la frase no dejaba de moverse. Cuando una respuesta tarda, tu cabeza no se queda en blanco: empieza a ordenar pruebas, a volver sobre cada palabra, a buscar el punto exacto donde algo pudo torcerse. Y si la otra persona llega con mala cara, la noche entera se te puede ir en esa misma pregunta. Lucía, ¿te suena demasiado esta escena de quedarte pegada a una señal mínima y vivirla como si dijera más de lo que dice?",
   "case_tag": "CASO DE EJEMPLO — Marta, 30 y tantos, una relación que se enfría por un mensaje corto",
   "case_paragraphs": [
    "Marta recibe un mensaje seco después de discutir y se queda mirando la pantalla más tiempo del que quería. Primero intenta seguir con su día, pero la cabeza vuelve sola al mismo punto: qué hizo, qué dijo, qué se le escapó. Su mapa tiene tierra muy fuerte y metal en cero, así que la presión pesa más que el alivio. Tú también podrías verte en ese gesto de revisar, volver y volver, aunque por fuera parezca solo un chat."
   ],
   "oheng_intro": "En tu mapa, la tierra está en 38% y el metal en 0%, así que hoy pesa más lo que aprieta que lo que alivia. Como tu Maestro del Día es agua, esa tierra fuerte se vive como una presión que te pone reglas, responsabilidad y miedo a fallar dentro de lo afectivo. Y como el metal está vacío, falta ese soporte que en tu caso sí podría ayudarte a ordenar, aprender y sentirte protegido cuando una respuesta tarda.",
   "quiz_reading": "Tu perfil de apego ansioso aparece con mucha claridad: ansiedad 85% y evitación 10%, así que no te cierras cuando hay cercanía, pero sí te alteras en cuanto una señal cambia. Eso se ve en frases como «No dejo de pensar en qué pude haber hecho mal» y «Entro en pánico pensando que la relación se acabó». En tu día, esa combinación se traduce en mirar una respuesta, una cara o una publicación como si cada detalle pudiera decirte si la relación sigue en pie.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera baja — lo que intenta crecer aun con poco espacio",
     "body": "La madera está en 13%, así que aparece como un gesto pequeño, no como una corriente que se imponga sola. En tu día, eso se nota cuando quieres seguir adelante con una conversación, pero la cabeza vuelve antes a la duda que al movimiento. Con tanta tierra encima, tu impulso de crecer necesita abrirse paso entre la presión y no siempre encuentra sitio de inmediato. Aun así, esa madera baja también deja ver que tú sí buscas seguir tocando la relación, no soltarla a la primera."
    },
    "fire": {
     "heading": "🔥 fuego medio — la chispa que enciende la lectura emocional",
     "body": "El fuego está en 25%, en un punto medio que no domina, pero sí colorea mucho lo que sientes. Por eso un «ok» seco no se te queda como una frase neutra: te calienta la mente y te hace leer intención donde otros verían solo cansancio o prisa. En un vínculo, ese fuego se nota en lo rápido que una señal mínima te cambia el día. No necesitas un gran conflicto para sentir el golpe; te basta un matiz."
    },
    "earth": {
     "heading": "⛰️ tierra alta — la presión que te pide explicaciones",
     "body": "La tierra está en 38%, y en tu Maestro del Día se vive como una fuerza que te aprieta con reglas, responsabilidad y sensación de examen. Cuando la otra persona pone mala cara, no solo notas el gesto: tu mente se va directo a «¿Qué hice yo mal?». Eso encaja con tu respuesta de revisar el chat, escribir otra vez o quedarte en silencio intentando entender antes de hablar. La tierra fuerte te hace sostener mucho, pero también te deja con la sensación de que cualquier error puede pesar demasiado."
    },
    "metal": {
     "heading": "💎 metal baja — el soporte que te ayuda a ordenar",
     "body": "El metal está en 0%, así que aquí no hay reserva propia y tu mapa depende de la tierra para alimentar ese tipo de energía. En tu caso, la tierra puede ayudar a crear metal, y eso se traduce en apoyo, aprendizaje y una forma más clara de protegerte cuando la relación se mueve. Sin ese apoyo, es más fácil que te quedes solo con la pregunta y no con la respuesta. Por eso tu mente busca tanto señales: intenta fabricar orden donde ahora mismo falta."
    },
    "water": {
     "heading": "💧 agua media — la parte que siente y vuelve a sentir",
     "body": "El agua está en 25%, y en tu caso no se queda quieta cuando la relación se mueve. Esa cifra ayuda a entender por qué una demora no te pasa de largo: te toca por dentro y vuelve una y otra vez. Como tu Maestro del Día es agua, tú no miras solo la forma de la respuesta; miras el clima completo que deja. Y por eso un silencio breve puede sentirse más grande de lo que parece desde fuera."
    }
   },
   "upcoming_period_preview_heading": "A los 38 años, empieza el fuego",
   "upcoming_period_preview_body": "A los 38 años empieza un ciclo de diez años en el que el fuego se vuelve más fuerte. Lo que hoy se siente como presión y búsqueda de pruebas entra en otra temperatura, más visible y más intensa. Es un cambio de estación: el aire se vuelve más seco, la luz más directa y la escena emocional más encendida.",
   "module_map": {
    "title": "Tu alarma en las relaciones",
    "body": "Cuando no llega una respuesta, tu alarma se enciende con una escena muy concreta: un «ok» seco, una mala cara, una discusión que quedó abierta. En vez de alejarte, sueles callarte primero, luego escribir tú para arreglarlo y acabar sintiéndote peor. Ahí aparece una especie de comportamiento de protesta: buscas comprobar, insistir o leer señales hasta saber si la relación sigue a salvo. Tu mente no se queda en el hecho; intenta traducirlo de inmediato en una historia sobre ti y sobre lo que pudo fallar."
   },
   "module_deep": {
    "title": "Una relación que sea tu base segura",
    "body": "Para ti, una relación base segura no se construye con promesas grandes, sino con señales pequeñas que se repiten de forma previsible. Te conviene pedir algo muy concreto, como: «Si estás ocupado, dime solo eso y luego seguimos hablando». Esa frase te da una referencia clara sin obligarte a perseguir la respuesta. También te ayuda dejar un margen de tiempo antes de volver a escribir, para que el silencio no se convierta de inmediato en una historia sobre tu valor. Lucía, cuando pidas seguridad, hazlo en una línea simple y sin disculparte por necesitarla."
   },
   "set_card_1": {
    "set": 1,
    "theme": "scene",
    "quiz": {
     "id": "A6",
     "prompt": "Si notas que esa persona tiene mala cara, ¿qué haces?",
     "label": "No dejo de pensar en qué pude haber hecho mal",
     "score": 3
    },
    "quote": "Sí, me pasa mucho. Si llega con mala cara, me paso la noche pensando qué hice yo.",
    "note": "Cuando ves un gesto frío, tu mente no se queda en la cara de la otra persona; salta enseguida hacia tu posible error. Eso muestra una vigilancia emocional muy alta, donde la señal externa se convierte rápido en culpa interna. Lucía, ahí no solo buscas entender: también intentas asegurarte de que no perdiste el vínculo."
   },
   "strengths_preview": [
    {
     "title": "Lectura fina",
     "body": "En tus respuestas aparece una sensibilidad muy precisa para notar el clima de la relación. Dijiste que mantener contacto diario te parece natural y agradable, y también que responder a un gesto atento te resulta reconfortante. Eso muestra que tú sí captas rápido cuándo hay cercanía y cuándo algo cambia de tono. Lo que en otros pasa desapercibido, en ti se vuelve una lectura muy viva."
    },
    {
     "title": "Vínculo directo",
     "body": "Cuando algo se pone difícil, dijiste que se lo cuentas a esa persona antes que a nadie, y eso habla de una forma de confiar muy frontal. Esa disposición no es pequeña: tú no necesitas rodeos para entrar en lo importante. Tu forma de querer no se queda en la superficie."
    },
    {
     "title": "Impulso de arreglo",
     "body": "Después de una pelea, dijiste que das tú el primer paso para repararlo. Eso muestra una energía clara para recomponer lo que se rompió antes de que se enfríe más. No es pasividad: es una voluntad real de volver a unir. En tu manera de estar con alguien, hay una urgencia por reparar que sostiene mucho."
    }
   ],
   "upcoming_period_heading": "A los 38 años, empieza un tramo de fuego.",
   "upcoming_period_body": "Desde los 38 años, el fuego toma más sitio y eso cambia el tono de tus vínculos: habrá más impulso, más calor y menos espacio para quedarte rumiando en silencio. Para ti, Lucía, ese tramo no se vive como una chispa cualquiera, sino como un periodo en el que lo afectivo pide movimiento claro y respuestas más visibles. Si ahora te cuesta sostener la calma cuando algo se enfría, te conviene llegar a esa etapa con una forma más directa de pedir presencia, para no dejar que la espera mande sobre tu día. En ese ciclo, lo que digas a tiempo pesará más que lo que revises después.",
   "cross_analysis_quotes": [
    "Tierra fuerte y ansiedad alta se rozan en tu mapa. La presión de la tierra te empuja a buscar explicación. Tu ansiedad 85% convierte esa búsqueda en culpa muy rápido.",
    "Metal vacío y evitación baja también encajan en ti. No te apartas de la cercanía. Cuando falta apoyo o orden, lo sientes de frente y no como distancia cómoda."
   ],
   "answer_notes": [],
   "chat_snapshot_note": "",
   "chat_trigger_note": "",
   "chat_repeat_note": "",
   "chat_fear_note": "",
   "psychology_fact_heading": "Teoría de la seguridad de base de Bowlby",
   "psychology_fact_body": "John Bowlby propuso que una relación cercana puede funcionar como una base segura: un lugar desde el que explorar el mundo y al que volver cuando algo altera. En tu caso, la respuesta lenta, el gesto frío o el cambio de tono no se quedan como datos sueltos; tu sistema los lee enseguida como una posible pérdida de esa base. Por eso miras, preguntas, repasas y vuelves a intentar: no buscas solo información, buscas sentir que el vínculo sigue sosteniéndose. Cuando la seguridad se tambalea, tu mente no se queda quieta; intenta restaurarla rápido.",
   "psychology_takeaway": "Tu mente no está exagerando por gusto: está buscando suelo donde siente vacío. La clave no es pensar menos, sino aprender a no convertir cada señal en sentencia.",
   "strengths": [
    {
     "title": "Dirección clara",
     "body": "Tu Maestro del Día es agua, y eso te da una capacidad muy concreta: sabes orientarte hacia lo que de verdad importa cuando una relación empieza a moverse. En tus respuestas, no te escondes en la distancia; te inclinas hacia el vínculo y buscas sostenerlo con presencia real. Esa forma de ir hacia delante se ve cuando dices que el contacto diario te parece natural y agradable. Lucía, cuando algo te importa, no te quedas mirando desde lejos: avanzas."
    }
   ],
   "weaknesses": [
    {
     "title": "Lectura en bucle",
     "body": "Cuando ves una mala cara o una publicación, tu mente salta enseguida a revisar qué hiciste mal. No te basta con notar la señal; necesitas traducirla en una explicación sobre ti, y eso te deja dando vueltas más tiempo del que quisieras. Lucía, ese bucle no nace de indiferencia, sino de lo mucho que te importa el vínculo."
    },
    {
     "title": "Alarma interna",
     "body": "Si después de una pelea no te escriben, pasas de la duda al pánico con mucha rapidez. Lo que para otra persona sería espera, para ti se vuelve una prueba de que la relación se tambalea. Lucía, esa alarma te protege de perder el lazo, pero también te empuja a sentir demasiado pronto que todo se acabó."
    },
    {
     "title": "Confirmación breve",
     "body": "Aunque te digan que todo va bien, la ansiedad de fondo no se va del todo. Eso hace que una frase tranquila te alivie un momento, pero no te sostenga por mucho tiempo. Lucía, tu sistema no pide una respuesta bonita: pide una presencia que se repita y se note."
    },
    {
     "title": "Impulso de arreglo",
     "body": "Después de discutir, callarte y escribir tú primero te deja peor al final. Ahí aparece una urgencia por reparar que te mueve rápido, pero también te hace cargar con el peso de arreglarlo aunque no te toque toda la culpa. Lucía, quieres salvar el vínculo antes de que se enfríe, y por eso a veces te adelantas a ti misma."
    }
   ],
   "fit_good": "Te va mejor un día en el que puedas hablar con la otra persona sin esperar a que todo esté perfecto. Un mensaje claro, una respuesta a tiempo y una conversación corta pero directa te ayudan más que un ambiente lleno de suposiciones. Lucía, cuando hay continuidad y acceso real, tu energía deja de pelear con la incertidumbre y puede concentrarse en el vínculo.",
   "fit_bad": "Te pesa mucho un entorno donde cada respuesta llega tarde y nadie nombra lo que está pasando. Si la relación se mueve entre silencios, señales ambiguas y cambios de ánimo sin explicación, tu día se llena de lectura de pistas. Lucía, ese tipo de clima te deja atenta a todo menos a ti.",
   "behavior_guides": [
    {
     "title": "Pausa breve",
     "body": "Cuando veas un mensaje seco, espera diez minutos antes de releerlo. En ese rato, no abras el chat ni mires si está en línea. Después, escribe solo una frase con lo que necesitas saber."
    },
    {
     "title": "Pregunta directa",
     "body": "Si notas mala cara, pregunta una sola vez qué pasa en vez de buscar pistas durante horas. Hazlo en el momento, con una frase corta y sin justificarte de más. Luego deja que la respuesta llegue antes de sacar conclusiones."
    },
    {
     "title": "Cierre simple",
     "body": "Después de una discusión, no llenes el vacío con varias respuestas seguidas. Envía un mensaje claro, espera y vuelve a tu día con una tarea concreta. Así no dejas que la espera ocupe toda la tarde."
    },
    {
     "title": "Límite de revisión",
     "body": "Si te descubres mirando una publicación otra vez, para en la segunda lectura. Di en voz baja qué hecho tienes y qué historia estás inventando. Esa diferencia te baja un paso de la alarma."
    }
   ],
   "mindset_guide": "No todo silencio significa distancia, aunque tu mente lo lea así al primer segundo. Ahora mismo, tu tarea no es adivinarlo todo: es separar dato de temor. La ansiedad quiere convertir una señal pequeña en sentencia, pero tú puedes dejarla en señal. Cuando lo haga falta, vuelve a una frase simple: primero miro el hecho, después decido qué hacer.",
   "closing_title": "Cuando la espera deja de mandar",
   "closing_body": "Desde los 38 años, el fuego entra con más fuerza en tu mapa, y eso cambia el pulso de lo afectivo. Lo que antes te dejaba horas revisando un chat, ahí empieza a pedir una respuesta más clara y menos circular. Lucía, ese tramo no borra tu sensibilidad; la vuelve más directa. Y cuando una relación te da una base más estable, tu día deja de depender tanto de una señal mínima y se siente más firme en tus manos.",
   "set_cards_2to5": [
    {
     "set": 2,
     "theme": "repeat",
     "quiz": {
      "id": "A5",
      "prompt": "Si después de una pelea esa persona no te escribe primero, ¿cómo reaccionas?",
      "label": "Entro en pánico pensando que la relación se acabó",
      "score": 3
     },
     "quote": "Doy yo el primer paso, siempre. Esperar se me hace eterno.",
     "note": "Después de una pelea, tú das el primer paso aunque no haya sido tu culpa, y luego te queda la sensación de que todo pesa más. Ese impulso muestra que no te quedas quieto ante el silencio: intentas arreglarlo enseguida, aunque por dentro termines peor. Lucía, tu reacción nace del miedo a que la otra persona se canse de ti."
    },
    {
     "set": 3,
     "theme": "inner",
     "quiz": {
      "id": "A15",
      "prompt": "Aunque te diga «te quiero», ¿qué sientes?",
      "label": "Aunque lo escuche, la ansiedad de fondo no se va",
      "score": 3
     },
     "quote": "",
     "note": "Aunque lo escuches, la ansiedad de fondo no se va. Tu mente no se apoya solo en esa frase. Necesitas señales repetidas y consistentes para sentir seguridad."
    },
    {
     "set": 4,
     "theme": "coping",
     "quiz": {
      "id": "A10",
      "prompt": "Cuando ves su nueva publicación en redes sociales, ¿qué haces?",
      "label": "La reviso una y otra vez, dándole vueltas a lo que significa",
      "score": 3
     },
     "quote": "",
     "note": "Revisar una publicación una y otra vez te deja sin salida en el significado, no en el hecho. Ahí se ve una forma de intentar controlar la incertidumbre leyendo entre líneas hasta que te falta energía. Tu cabeza no se conforma con ver; necesita cerrar la historia."
    },
    {
     "set": 5,
     "theme": "strength",
     "quiz": {
      "id": "V9",
      "prompt": "¿Qué sientes al mantener contacto todos los días?",
      "label": "Me parece natural y agradable",
      "score": 0
     },
     "quote": "",
     "note": "Que el contacto diario te parezca natural y agradable muestra que la constancia no te pesa como una obligación, sino como una forma de cercanía. También deja ver que tu referencia de normalidad en el amor incluye presencia frecuente y trato continuo. Lucía, cuando algo fluye así, tu sistema descansa más."
    }
   ]
  },
  "quizDiagnosis": {
   "moduleId": "module1",
   "moduleTitle": "Módulo 1 · Amor y apego",
   "track": "romance",
   "answers": [
    {
     "qId": "A1",
     "dimension": "anxiety",
     "prompt": "¿Cuánto te molesta que tarde en responderte?",
     "label": "8/10",
     "score": 2.3333333333333335
    },
    {
     "qId": "A2",
     "dimension": "anxiety",
     "prompt": "Si sientes que te muestra menos cariño que antes, ¿cómo reaccionas?",
     "label": "Empiezo a repasar qué pude haber hecho mal",
     "score": 2
    },
    {
     "qId": "A3",
     "dimension": "anxiety",
     "prompt": "Cuando necesitas que te confirmen que todo va bien en la relación, ¿qué te pasa?",
     "label": "Ni aunque me lo confirmen siempre se me quita la ansiedad",
     "score": 3
    },
    {
     "qId": "A4",
     "dimension": "anxiety",
     "prompt": "Cuando ves que conversa animadamente con otra amistad, ¿qué sientes?",
     "label": "Se me enreda la cabeza",
     "score": 2
    },
    {
     "qId": "A5",
     "dimension": "anxiety",
     "prompt": "Si después de una pelea esa persona no te escribe primero, ¿cómo reaccionas?",
     "label": "Entro en pánico pensando que la relación se acabó",
     "score": 3
    },
    {
     "qId": "A6",
     "dimension": "anxiety",
     "prompt": "Si notas que esa persona tiene mala cara, ¿qué haces?",
     "label": "No dejo de pensar en qué pude haber hecho mal",
     "score": 3
    },
    {
     "qId": "A7",
     "dimension": "anxiety",
     "prompt": "Si guarda silencio mientras están juntos, ¿cómo lo vives?",
     "label": "Me pregunto si se ha molestado conmigo",
     "score": 2
    },
    {
     "qId": "A8",
     "dimension": "anxiety",
     "prompt": "Si los planes de futuro (casarse, vivir juntos, etc.) siguen sin definirse, ¿cómo lo llevas?",
     "label": "Me genera ansiedad, como si la relación misma se tambaleara",
     "score": 3
    },
    {
     "qId": "A9",
     "dimension": "anxiety",
     "prompt": "Cuando algo que hizo esa persona te duele, ¿qué haces?",
     "label": "Antes de decir algo, sigo tanteando cómo está de ánimo",
     "score": 2
    },
    {
     "qId": "A10",
     "dimension": "anxiety",
     "prompt": "Cuando ves su nueva publicación en redes sociales, ¿qué haces?",
     "label": "La reviso una y otra vez, dándole vueltas a lo que significa",
     "score": 3
    },
    {
     "qId": "A11",
     "dimension": "anxiety",
     "prompt": "Cuando tienes la sensación de que te quiere menos que antes, ¿qué pasa?",
     "label": "Ese pensamiento me absorbe tanto que no puedo concentrarme en nada más",
     "score": 3
    },
    {
     "qId": "A12",
     "dimension": "anxiety",
     "prompt": "¿Cuánta confianza sientes en ti dentro de la relación?",
     "label": "A veces me pregunto si soy suficiente",
     "score": 2
    },
    {
     "qId": "A13",
     "dimension": "anxiety",
     "prompt": "Cuando surge un conflicto, aunque sea pequeño, ¿cómo lo tomas?",
     "label": "Imagino lo peor, como si estuviéramos a punto de terminar",
     "score": 3
    },
    {
     "qId": "A14",
     "dimension": "anxiety",
     "prompt": "Cuando pasas mucho tiempo a solas, ¿piensas en esa persona?",
     "label": "No dejo de preguntarme qué estará haciendo",
     "score": 2
    },
    {
     "qId": "A15",
     "dimension": "anxiety",
     "prompt": "Aunque te diga «te quiero», ¿qué sientes?",
     "label": "Aunque lo escuche, la ansiedad de fondo no se va",
     "score": 3
    },
    {
     "qId": "V1",
     "dimension": "avoidance",
     "prompt": "¿Cuánta presión sientes cuando la relación empieza a volverse cercana en lo emocional?",
     "label": "3/10",
     "score": 0.6666666666666666
    },
    {
     "qId": "V2",
     "dimension": "avoidance",
     "prompt": "Cuando algo se pone difícil, ¿qué haces con tu pareja?",
     "label": "Se lo cuento a esa persona antes que a nadie",
     "score": 0
    },
    {
     "qId": "V3",
     "dimension": "avoidance",
     "prompt": "Cuanto más profunda se vuelve la relación, ¿qué te pasa?",
     "label": "Más a gusto me siento",
     "score": 0
    },
    {
     "qId": "V4",
     "dimension": "avoidance",
     "prompt": "Si esa persona te pregunta «¿qué somos exactamente?», ¿qué haces?",
     "label": "Se me hace un poco pesado, pero respondo",
     "score": 1
    },
    {
     "qId": "V5",
     "dimension": "avoidance",
     "prompt": "Si te pregunta los detalles de tu día, ¿cómo reaccionas?",
     "label": "Se lo cuento todo con gusto",
     "score": 0
    },
    {
     "qId": "V6",
     "dimension": "avoidance",
     "prompt": "Cuando quieres apoyarte en tu pareja, ¿qué haces?",
     "label": "Me apoyo de vez en cuando",
     "score": 1
    },
    {
     "qId": "V7",
     "dimension": "avoidance",
     "prompt": "Cuando te dice que algo le dolió, ¿cómo reaccionas?",
     "label": "Lo escucho con seriedad y lo hablamos",
     "score": 0
    },
    {
     "qId": "V8",
     "dimension": "avoidance",
     "prompt": "Cuando se trata de planear un futuro en pareja, ¿cómo te sientes?",
     "label": "Me lo imagino con entusiasmo junto a esa persona",
     "score": 0
    },
    {
     "qId": "V9",
     "dimension": "avoidance",
     "prompt": "¿Qué sientes al mantener contacto todos los días?",
     "label": "Me parece natural y agradable",
     "score": 0
    },
    {
     "qId": "V10",
     "dimension": "avoidance",
     "prompt": "Cuando esa persona te pregunta cómo estás emocionalmente, ¿cómo lo sientes?",
     "label": "Me parece un gesto atento y reconfortante",
     "score": 0
    },
    {
     "qId": "V11",
     "dimension": "avoidance",
     "prompt": "¿Cómo te sientes al comienzo de una relación?",
     "label": "Lo disfruto, pero mantengo cierta distancia",
     "score": 1
    },
    {
     "qId": "V12",
     "dimension": "avoidance",
     "prompt": "Cuando te dice «te quiero», ¿qué haces?",
     "label": "Le respondo con naturalidad",
     "score": 0
    },
    {
     "qId": "V13",
     "dimension": "avoidance",
     "prompt": "Cuando quieres reconciliarte después de una pelea, ¿qué haces?",
     "label": "Doy el primer paso para arreglarlo",
     "score": 0
    },
    {
     "qId": "V14",
     "dimension": "avoidance",
     "prompt": "Si tuvieras que hacer un viaje en el que estén juntos las 24 horas, ¿cómo lo verías?",
     "label": "Suena bien, pero igual necesitaría tiempo a solas",
     "score": 1
    },
    {
     "qId": "V15",
     "dimension": "avoidance",
     "prompt": "¿Con qué frecuencia te viene el pensamiento «estaría bien incluso sin esta persona»?",
     "label": "Casi nunca",
     "score": 0
    }
   ],
   "dimensionResults": [
    {
     "dimension": "anxiety",
     "rawScore": 38.333333333333336,
     "maxScore": 45,
     "percentOfMax": 85.2,
     "distanceFromMid": 70.4,
     "direction": "high",
     "intensity": "강함"
    },
    {
     "dimension": "avoidance",
     "rawScore": 4.666666666666666,
     "maxScore": 45,
     "percentOfMax": 10.4,
     "distanceFromMid": 79.3,
     "direction": "low",
     "intensity": "매우 강함"
    }
   ],
   "classification": {
    "activeDimensions": [
     "anxiety"
    ],
    "kind": "single",
    "typeKey": "anxiety"
   },
   "typeInfo": {
    "title": "Apego ansioso",
    "hook": "Tiendes a buscar confirmación frecuente de que la relación está bien, y eres sensible a las reacciones de la otra persona."
   },
   "nuancedSummary": "Apego ansioso se manifiesta con bastante claridad, Apertura a la intimidad aparece de forma casi extrema.",
   "dimensionShortNames": {
    "anxiety": "Ansiedad",
    "avoidance": "Evitación"
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
   "primary_concern": "Cuando una respuesta tarda, me derrumbo",
   "emotional_state": "Ansiedad y algo de dolor",
   "trigger_point": "Un «ok» seco después de una discusión",
   "repeat_pattern": "Callarme, escribir yo para arreglarlo y sentirme peor",
   "core_fear_or_meaning": "Me da miedo que se canse de mí",
   "summary_quote": "Esperar se me hace eterno",
   "integrated_summary": "Una señal pequeña, como un «ok» seco, enciende la pregunta de qué hiciste mal. Después de discutir te callas, das tú el primer paso aunque no sea tu culpa y terminas peor; debajo está el miedo a que la otra persona se canse de ti.",
   "coping": "Releo el chat buscando el error",
   "relational": "Doy el primer paso aunque no haya sido mi culpa",
   "desired_change": "Quiero que mi día siga en pie aunque la respuesta tarde",
   "set_packets": [
    {
     "set": 1,
     "theme": "scene",
     "quiz": {
      "id": "A6",
      "dimension": "anxiety",
      "prompt": "Si notas que esa persona tiene mala cara, ¿qué haces?",
      "label": "No dejo de pensar en qué pude haber hecho mal",
      "score": 3
     },
     "opening_answers": [
      "Sí, me pasa mucho. Si llega con mala cara, me paso la noche pensando qué hice yo.",
      "La semana pasada contestó con un «ok» seco y estuve toda la tarde releyendo el chat para ver dónde me había equivocado."
     ],
     "module_answers": [
      "«¿Hice algo mal?», siempre esa primero. Aunque sepa que tenía una reunión.",
      "Quiero comprobarlo. Le escribo otra vez o miro si está en línea.",
      "Me alegra, pero me dura poco. Enseguida pienso que algún día dejará de hacerlo."
     ],
     "has_chat": true
    },
    {
     "set": 2,
     "theme": "repeat",
     "quiz": {
      "id": "A5",
      "dimension": "anxiety",
      "prompt": "Si después de una pelea esa persona no te escribe primero, ¿cómo reaccionas?",
      "label": "Entro en pánico pensando que la relación se acabó",
      "score": 3
     },
     "opening_answers": [
      "Exacto. Si después de discutir no me escribe, no puedo concentrarme en nada hasta saber algo.",
      "Casi siempre igual: discutimos, me callo, luego le escribo yo para arreglarlo aunque no haya sido mi culpa, y al final me siento peor."
     ],
     "module_answers": [
      "Hago como si todo estuviera bien. Me da miedo que, si lo digo, se canse de mí.",
      "Doy yo el primer paso, siempre. Esperar se me hace eterno."
     ],
     "has_chat": true
    },
    {
     "set": 3,
     "theme": "inner",
     "quiz": {
      "id": "A15",
      "dimension": "anxiety",
      "prompt": "Aunque te diga «te quiero», ¿qué sientes?",
      "label": "Aunque lo escuche, la ansiedad de fondo no se va",
      "score": 3
     },
     "opening_answers": [],
     "module_answers": [],
     "has_chat": false
    },
    {
     "set": 4,
     "theme": "coping",
     "quiz": {
      "id": "A10",
      "dimension": "anxiety",
      "prompt": "Cuando ves su nueva publicación en redes sociales, ¿qué haces?",
      "label": "La reviso una y otra vez, dándole vueltas a lo que significa",
      "score": 3
     },
     "opening_answers": [],
     "module_answers": [],
     "has_chat": false
    },
    {
     "set": 5,
     "theme": "strength",
     "quiz": {
      "id": "V9",
      "dimension": "avoidance",
      "prompt": "¿Qué sientes al mantener contacto todos los días?",
      "label": "Me parece natural y agradable",
      "score": 0
     },
     "opening_answers": [],
     "module_answers": [],
     "has_chat": false,
     "perspective_answer": null
    }
   ]
  }
 }
};
