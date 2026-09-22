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
   "title_line1": "You finish the task, but the task doesn’t quite finish you",
   "title_line2": "Your mind stays on watch long after the work is done",
   "subtitle": "Module 3 deep report — Saju × psychology test × counseling integration",
   "opening_scene": "It’s late, the desk is finally quiet, and your hands are still near the keyboard. The work is done, but your mind is back at it, checking one more detail, then one more. A Monday-morning message lands, and the tension comes alive again before you’ve even had a chance to exhale. You say you rested, but the feeling of rest never really arrives. Jordan, doesn’t this look like your days lately?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, a deadline-heavy role",
   "case_paragraphs": [
    "Mina leaves the office with her bag on one shoulder and her phone still open to the task list. On the train home, she rechecks what she already finished, then stays up because the day still feels unfinished. Her chart is heavy with Earth and Metal, so pressure, rules, and review keep pressing in while her output keeps getting folded back into more work. You can see how that same loop would keep turning in your own day, too."
   ],
   "oheng_intro": "Your Earth and Metal are both at 38%, and your Wood is at 0%. With a Water Day Master, Earth feels like pressure, rules, and responsibility, while Wood is the energy you release outward through expression and creativity. In a burnout report, that shows up as finishing hard, then having almost nothing left to pour back into yourself.",
   "quiz_reading": "Your Perfectionism score is 82%, while Recovery sits at 34%, and that combination fits the Finisher's Drain pattern exactly. You don't just want things done; you want them sealed, checked, and made safe before you let go. That is why even a day off can still feel like a task you haven't finished yet.",
   "element_readings": {
    "wood": {
     "heading": "🌳 wood weak — your output is getting stuck inside",
     "body": "Wood is at 0%, so the energy you would normally send outward through expression, initiative, and creative release is almost silent. With a Water Day Master, Water feeds Wood, and that means your recovery has to come first if you want your output to move again. This is why you can finish something and still feel oddly blocked, as if the work left your hands but not your nervous system. The sharp line to remember is this: when Wood is empty, finishing does not automatically feel like relief."
    },
    "fire": {
     "heading": "🔥 fire low — warmth arrives, but briefly",
     "body": "Fire is 13%, so there is some warmth and momentum, but not enough to keep your energy glowing for long. In a burnout pattern, that looks like a strong start, a full push, and then a sudden drop when the task is over. You can feel it in the way Monday-morning messages switch your body back on before your mind is ready. The line to keep is simple: the spark is there, but it burns fast."
    },
    "earth": {
     "heading": "⛰️ earth strong — pressure keeps asking for one more check",
     "body": "Earth is 38%, and with a Water Day Master that means pressure, duty, and the weight of responsibility sit close to the center of your day. That is the part of you that says, 'Check it once more,' even after the job is already done. It fits the way you go back and re-check everything after finishing a task. The sentence worth saving is this: your system does not let a finished thing feel finished right away."
    },
    "metal": {
     "heading": "💎 metal strong — review becomes a habit, not a moment",
     "body": "Metal is also 38%, so precision and correction are not occasional; they are built into the way you approach work. That shows up in the clean, controlled second pass you keep making over your own output. It is the part of you that can catch what others miss, but it also keeps the door open long after you meant to close it. What you carry here is sharpness, and sharpness can stay awake too long."
    },
    "water": {
     "heading": "💧 water low — rest needs to feel safe before it can land",
     "body": "Water is 13%, so even the part of you that should soften, settle, and restore is running on a modest supply. With a Water Day Master, that means your own source is not absent, but it gets used up by the push to keep going. That matches your line about feeling uneasy even when you rest. The clearest way to say it is this: your body may stop, but your inner current keeps checking the clock."
    }
   },
   "upcoming_period_preview_heading": "31 years old, fire begins the next chapter",
   "upcoming_period_preview_body": "From 31 years old, the 10-year cycle turns toward Fire. The long stretch that has been defined by pressure and review starts to give way to a different kind of motion. The air changes here, like a room finally getting warmer after being kept too tight for too long.",
   "upcoming_period_heading": "31 years old, the next chapter opens with fire",
   "upcoming_period_body": "From 31 years old, Fire becomes stronger, and that matters because your chart has been carrying a lot of Earth and Metal already. The new cycle does not erase your precision, but it shifts the center of gravity away from endless checking and toward visible momentum. For you, this is the point where work can start to feel less like proof and more like movement.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism and 38% Earth are speaking the same language. Earth is the Five Elements force that feels like pressure, rules, and responsibility, and it shows up strongly for you. That is why \"one more check\" can turn into a whole way of working.",
    "Your 34% Recovery and 0% Wood line up too. Wood is the Five Elements force that lets you express, release, and send energy outward, and you have very little of it. When output has nowhere to go, rest starts to feel strange instead of restoring."
   ],
   "answer_notes": [
    "Choosing 'go back and re-check everything' shows that your perfectionism is not casual caution; it is a need to secure the result before you can emotionally release it. In daily life, that can look like reopening a file after it was already sent, just to make sure it still feels right. The part of you that chose that answer deserves honesty more than blame.",
    "Feeling uneasy even when you rest shows that recovery for you is not only about stopping work; it is about whether stopping feels allowed. That can show up on a day off when your body is still on the sofa but your mind is already scanning for what comes next. If that sounds familiar, it means your rest needs a softer landing, not more force."
   ],
   "chat_snapshot_note": "Your core worry is that resting never really feels like resting, and the feeling behind it is tiredness with a thread of anxiety. That combination explains why your mind keeps staying near the work even after the work is finished. The line to keep is this: you are not lazy; you are still standing guard.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they do not just bring information; they restart the whole internal pressure system. In your chart, that fits Earth strongly enough to feel like responsibility pressing in, and in your burnout pattern it matches a mind that re-activates the moment a message arrives. The message is small, but the meaning you attach to it is not.",
   "chat_repeat_note": "Your pattern is cram, then crash. First you push through with too much force, then the drop comes all at once, and by then even rest feels thin and shaky. A smaller way through is to stop once before the crash, while you still have enough energy to notice the difference.",
   "chat_fear_note": "The fear underneath this is not just about falling behind; it is about what stopping seems to say about you. You are trying to protect your place, your pace, and your sense of being enough. That means your real wish is simple: you want to rest without losing your footing.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "In burnout research, perfectionism often keeps the task open in the mind even after the work is technically finished. Recovery, on the other hand, depends on being able to mentally disengage, not just physically stop. Your scores show the gap clearly: high perfectionism keeps the checking loop alive, while low recovery makes it hard for rest to register as rest. That is why your experience feels less like exhaustion alone and more like unfinished pressure.",
   "psychology_takeaway": "Completion is not the same as closure. For you, the mind needs permission to stand down.",
   "strengths": [
    {
     "title": "Sharp finish",
     "body": "You notice what is still loose, and that makes your work careful in a way other people can rely on. Your 82% Perfectionism is not just a strain; it is also the reason you can catch what needs tightening before it becomes a mess. The same instinct that sends you back to re-check everything is the instinct that keeps your standards steady."
    },
    {
     "title": "Steady pressure",
     "body": "Your 38% Earth gives you the ability to carry responsibility without dropping the whole frame. That shows up when deadlines stack up and you still keep the structure intact long enough to finish. Even when you feel tired, you are not fragile in the middle of the load."
    },
    {
     "title": "Clear review",
     "body": "Your 38% Metal makes your mind precise enough to separate what is done from what still needs work. That is useful in any role that asks for quality control, edits, or final checks. The gift here is that you can see details cleanly, even when you are already tired."
    },
    {
     "title": "Persistent push",
     "body": "The way you keep going after you are already drained shows real staying power. Your Monday-morning tension and your cram-then-crash pattern both prove that you do not give up early. The strength is not that you never tire; it is that you keep showing up even when the battery is low."
    }
   ],
   "weaknesses": [
    {
     "title": "Endless review",
     "body": "Your mind tends to reopen what was already finished, especially when you have just sent something out. That makes closure hard, because the final step keeps turning into another pass. The cost is not sloppiness; it is that rest gets delayed by your own standards."
    },
    {
     "title": "Rest guilt",
     "body": "Your 34% Recovery means stopping does not automatically translate into relief. On a day off, you can be physically still and still feel unsettled inside. That is not a character flaw; it is a sign that rest has not yet become safe enough to settle in."
    },
    {
     "title": "Sudden drop",
     "body": "When you push too hard for too long, the crash comes all at once. That makes the day feel productive on the front end and empty on the back end. The pattern is exhausting because it spends everything before anything can be replenished."
    },
    {
     "title": "Pressure lock",
     "body": "Monday-morning messages seem to catch the exact place where your system is already braced. The first ping is enough to tighten the whole day around work again. The weakness is not the message itself; it is how quickly your body learns to treat it like a verdict."
    }
   ],
   "fit_good": "You do best in a role where the day has clear deliverables, visible standards, and enough time to close the loop properly. A work style with written priorities, scheduled review points, and a clean end to the day helps your mind stop reopening the file. You also do better when feedback arrives in a predictable window instead of as surprise interruptions that keep the pressure alive.",
   "fit_bad": "You struggle in a setting where messages can arrive all day and every task can be reopened at any time. A role that rewards constant availability can keep your nervous system on edge from morning to night. You also tire faster when the job never gives you a real finish line, because then your mind never gets a chance to stand down.",
   "behavior_guides": [
    {
     "title": "One final pass",
     "body": "Set a 10-minute review limit at the end of each task, and stop when the timer ends. Do it once in the afternoon and once before you log off, so checking has a container instead of a tunnel. That way, your standards stay intact without taking the whole evening with them."
    },
    {
     "title": "Closed day",
     "body": "Pick one small ritual that tells your brain work is over, such as shutting the laptop, saving the file, and writing tomorrow’s first step on paper. Do it at the same time each day, especially after a heavy Monday. The point is to make the ending visible enough that your mind can stop negotiating with it."
    },
    {
     "title": "Recovery slot",
     "body": "Block 20 minutes of real downtime after your hardest work block, and do not pair it with messages or task lists. Sit, walk, or lie down without asking yourself to be useful. This gives your low Recovery score a place to breathe before the next round starts."
    },
    {
     "title": "Message buffer",
     "body": "When Monday-morning messages land, wait five minutes before opening every thread or replying to everything at once. Use that gap to name the one message that actually matters. Small buffering like this stops the first ping from becoming an all-day pressure wave."
    }
   ],
   "mindset_guide": "Your mind treats every task like a container that must be sealed perfectly before it can be set down. But a sealed container still needs a hand to carry it, and your hand has been carrying too much for too long. Think of your energy less like a test you must ace and more like a desk you need to clear one stack at a time. When you do that, rest stops feeling like a risk and starts feeling like the space where the next clean step can actually appear.",
   "closing_title": "What gets to end",
   "closing_body": "From 31 years old, Fire becomes stronger, and that change is already pointing beyond the old loop of pressure and review. The day will still have standards, but it will not have to feel like a courtroom every time you finish something. For your burnout pattern, that means the body starts to feel less pinned down and the mind learns that stopping does not automatically mean losing your place. That is the version of work you’ve been trying to reach all along, Jordan."
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
   "title_line1": "You finish the day, but your mind keeps one hand on the checklist.",
   "title_line2": "And even rest starts to feel like another task you have to get right.",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychological test × counseling integration",
   "opening_scene": "It’s late, and your phone is still close enough to reach without thinking. A Monday morning message lights up the screen, and before you even open it, your mind starts checking what you missed, what could be improved, and what still isn’t quite finished. You tell yourself you’re resting, but the feeling in your body says you’re still on duty. Mia, isn’t this exactly the kind of night you’ve been living through lately?",
   "case_tag": "EXAMPLE CASE — Claire, early 30s, always-on at work",
   "case_paragraphs": [
    "Claire closes her laptop, but she opens it again ten minutes later to re-check a line she already approved. Her Five Elements chart is lopsided in the same way yours is, with Wood pressing hard and Water running low, so she keeps pushing output while having almost no room left for recovery. By Sunday night she feels productive and strangely empty at the same time. You can probably recognize yourself in that rhythm already.",
    "On Monday morning, a single message can pull her straight back into alert mode, even if she had promised herself a quiet weekend. She spends the day finishing tasks perfectly, then pays for it by crashing all at once. The pattern is not laziness; it is a system that never fully lets her come down. And that is where your own pattern starts to look painfully familiar."
   ],
   "oheng_intro": "Your Wood is 38%, which is clearly strong, while Water is 13%, which is low. With your Day Master as Metal, that means Wood is the force you work with in real life, while Water is the force you pour out as expression and energy. In a burnout theme, that looks like someone who can keep producing and holding things together, but has a harder time letting the output soften into recovery.",
   "quiz_reading": "Your Perfectionism score is 82%, and your Recovery score is 34%, which fits the Finisher's Drain type. That mix shows up when you finish the work, but your mind keeps walking back through it as if the day is not allowed to end yet. On a day off, the body may be still while the mind stays uneasy, waiting for the next message to prove it was right to stay alert.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — the branch that keeps reaching",
     "body": "At 38%, Wood is the strongest element in your chart, so it does not sit quietly in the background. With your Day Master as Metal, this is the force you work with in real life, and it shows up as the part of you that keeps grabbing the next task and shaping it until it looks right. In burnout mode, that can feel like re-checking one line after another even after the work is already done. The sentence that fits this Wood is simple: you do not just finish things, you keep holding them."
    },
    "fire": {
     "heading": "🔥 Fire weak — the light that burns too fast",
     "body": "Fire is at 13%, so it is low in your chart and does not stay loud for long. In a burnout pattern, that often looks like a burst of urgency that gets used up quickly, especially when a Monday morning message flips the switch back on. You can look energetic from the outside while the inside is already running on the last bit of heat. What stands out here is not a lack of drive, but how short the flame feels after you have pushed through."
    },
    "earth": {
     "heading": "⛰️ Earth weak — the ground that does not get enough time",
     "body": "Earth is also at 13%, so steadiness is present, but it is not the dominant note. That matters in a module about burnout, because the pause between effort and the next demand can feel too thin to hold you. You may finish one thing, move straight to the next, and only later realize you never actually stood still long enough to land. The image here is a desk that never gets fully cleared before the next stack arrives."
    },
    "metal": {
     "heading": "💎 Metal moderate — the edge that keeps everything precise",
     "body": "Metal sits at 25%, which is a moderate amount, and it gives your chart its clean, exacting edge. Because your Day Master is Metal, this is not abstract for you; it is the part of you that notices what is off and wants it corrected before anyone else sees it. In a burnout week, that can mean one more review, one more pass, one more correction long after everyone else would have stopped. The strength here is precision, but the cost is how hard it is for precision to know when to rest."
    },
    "water": {
     "heading": "💧 Water weak — the stream that needs a nudge to flow",
     "body": "Water is at 13%, so it is low, and Metal helps Water along in your chart. Since Water is the force you pour out as expression and energy, this means the part of you that should release and soften needs more support than it naturally gets. That is why resting can feel oddly unfinished, like your body stopped but your mind never got the memo. The sharp line to remember is this: you do not lack energy; you have trouble letting energy drain out safely."
    }
   },
   "upcoming_period_preview_heading": "33 years old, the Water season opens",
   "upcoming_period_preview_body": "33 years old marks the start of a new 10-year cycle where Water becomes stronger. The long stretch that asked you to keep pushing and checking begins to give way to a different rhythm. It feels less like a locked room and more like air finally moving through it.",
   "upcoming_period_heading": "33 years old, a new chapter begins",
   "upcoming_period_body": "33 years old brings a stronger Water current, and that matters because Water is the part of your chart tied to expression and release. In the burnout story you are living now, that means the pressure to keep everything tight starts to loosen enough for your mind to stop gripping every detail so hard. From there, the day can feel less like a series of unfinished alarms and more like a sequence you can actually step through. You’ll want to protect that shift by making room for pauses that are real, not just pauses in name.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism and strong Wood are speaking the same language: you keep reaching for the next correction even after the task is technically done. That is why Monday-morning messages hit so hard, because they reactivate the part of you that cannot leave anything half-finished. The result is not just careful work; it is a mind that stays on after the work is over.",
    "Your 34% Recovery and low Water match each other too closely to ignore. When recovery stays low, even a day off can feel uneasy, because your system is used to pouring out more than it takes back in. That is why the crash comes after the cram, not during it."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows how strongly you trust correction over closure. In daily life, that becomes the habit of reopening a finished file just to make sure the feeling of certainty is there. The useful part of this answer is that it shows how badly you want to avoid a loose end.",
    "Feeling uneasy even when you rest points to a nervous system that does not fully recognize stillness as safe. In real life, that can look like sitting down but staying mentally on call, waiting for the next message or the next task to prove you can relax. You are not bad at resting; you are used to treating rest like a test."
   ],
   "chat_snapshot_note": "You said the core problem was that you rest, but it never feels like resting, and that lands right on top of the tired, slightly anxious state you described. The feeling is not empty fatigue; it is fatigue with one eye still open. The line to keep is this: even your rest has been doing overtime.",
   "chat_trigger_note": "Monday-morning messages are the trigger because they do not just bring work back; they bring your vigilance back with them. They hit the same perfectionism that is already running high, so one notification can reopen the whole loop. That is why the reaction feels bigger than the message itself.",
   "chat_repeat_note": "Your pattern is cram first, then crash later, which means the pressure builds while you are still looking functional. You keep choosing one more push, one more check, one more pass, until the drop finally arrives all at once. The smallest way out is to stop one step earlier than usual, before the body has to force the stop for you.",
   "chat_fear_note": "You are afraid that if you stop, you will fall behind, and that fear makes sense of why rest never quite feels allowed. Underneath it, what you want is not endless motion; it is proof that pausing will not cost you your place. That is a very human want, and it is already visible in the way you keep going even when you are tired.",
   "psychology_fact_heading": "Perfectionism and recovery imbalance",
   "psychology_fact_body": "In psychology, perfectionism is often understood as a pattern of setting unusually high standards and then staying emotionally attached to whether every detail meets them. Recovery is the capacity to come back down after effort, and when that capacity is low, the mind keeps carrying work long after the task is over. Your scores fit that pattern neatly: 82% perfectionism keeps the checking alive, while 34% recovery makes it harder to truly switch off. That is why the problem does not look like simple overwork; it looks like effort that never fully releases its grip.",
   "psychology_takeaway": "You are not failing to rest; your system is failing to let rest count. The good news is that what was trained to keep checking can also be trained to stop sooner.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half-done, and that shows up clearly in the way you go back and re-check everything after a task. In a workday, that can mean catching errors other people miss and carrying the final mile without being asked. The strength is real: when you commit, you finish."
    },
    {
     "title": "Sharp noticing",
     "body": "Your high perfectionism gives you a very sharp eye for what still needs attention. That is why Monday-morning messages do not just arrive as messages; they arrive as signals that your mind immediately knows how to decode. You notice the unfinished edge before most people even see there is one."
    },
    {
     "title": "Push capacity",
     "body": "Cramming before crashing is still a form of capacity, even if it comes at a cost. You can carry a heavy stretch of effort and keep functioning long enough to get it done. The real work is not learning how to push harder; it is learning how to stop before the crash has to do it for you."
    },
    {
     "title": "Self-monitoring",
     "body": "You keep track of your own state more closely than you may realize, which is why the phrase 'it never feels like resting' came out so clearly. That awareness matters, because it means you are already noticing the mismatch between what you do and how it lands in your body. The more you trust that signal, the less you have to wait for exhaustion to explain it."
    }
   ],
   "weaknesses": [
    {
     "title": "No off switch",
     "body": "When recovery is low, stopping does not feel like stopping; it feels like leaving something unfinished in the air. That is why even a day off can still carry tension for you. The problem is not that you refuse to rest, but that your system keeps asking for one more check."
    },
    {
     "title": "Overchecking",
     "body": "You go back and re-check everything because certainty feels safer than completion. In daily life, that can turn one finished task into three invisible ones, all happening in your head. The cost is that the work ends, but your nervous system keeps the file open."
    },
    {
     "title": "Crash cycle",
     "body": "The cram-then-crash rhythm means you often arrive at rest only after you have emptied yourself too far. That can make the break feel dramatic instead of gentle, like a forced stop rather than a chosen one. Small, earlier pauses would change the shape of the whole day."
    },
    {
     "title": "Fear of falling behind",
     "body": "The fear that stopping means falling behind keeps a lot of your energy locked in place. It makes Monday morning feel heavier than it needs to, because every new message sounds like proof that you must stay ahead. What it really shows is how strongly you want to protect your place."
    }
   ],
   "fit_good": "You do best in a setting where deadlines are clear and the handoff point is explicit, so you know when a task is actually done. A workday with one main deliverable, a short review window, and a real end time will suit you far better than a day full of open loops. You also need people who do not treat every quiet moment as a chance to add one more request.",
   "fit_bad": "You struggle in environments where messages keep arriving after hours and everything feels provisional. A day with constant pings, vague priorities, and no clear finish line will keep your checking mind switched on all the way through dinner. The more a role rewards being always available, the more your burnout pattern gets fed.",
   "behavior_guides": [
    {
     "title": "One-pass review",
     "body": "Pick one task each afternoon and give it a single, timed review before you close it. Set a 10-minute limit, do the check once, and then write down the final version in one sentence. That turns your perfectionism into a boundary instead of an endless loop."
    },
    {
     "title": "Real stop point",
     "body": "Choose a fixed stopping time for three days this week and treat it like an appointment. At that time, close the laptop, silence work alerts, and move the phone to another room for at least 30 minutes. The point is not to feel ready; the point is to teach your body what a real end feels like."
    },
    {
     "title": "Recovery anchor",
     "body": "Build a 15-minute recovery ritual after the last task of the day. Use the same sequence each time, like water, a short walk, and no screens, so your system learns the pattern. Repeat it for a full week before changing anything."
    },
    {
     "title": "Message buffer",
     "body": "When Monday-morning messages hit, wait 5 minutes before opening them and do one slow lap around the room first. Then open them once, answer only the urgent items, and leave the rest for your planned review block. That small buffer helps you meet the message without letting it take over the whole morning."
    }
   ],
   "mindset_guide": "Your mind has been acting like a laptop with too many tabs open, and rest keeps getting treated like another tab to monitor. Try thinking of recovery as the charger, not the reward: it is what lets the next stretch of work actually hold power. When you close the lid, nothing useful is lost. What matters is that the machine can reopen without burning through itself. You do not fall behind by plugging in; you fall behind when you stay dim and keep pretending that is enough.",
   "closing_title": "What finally gets to stay closed",
   "closing_body": "At 33 years old, Water becomes stronger, and that shift is already written into your chart. For you, that means the part of life that keeps pouring out effort begins to make room for release, so the day does not have to end in a crash every time. In this burnout story, the change feels like your shoulders lowering before bed and your mind not racing back to the checklist quite so fast. The line to keep is simple: you are allowed to end the day before the day ends you."
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
 "sam": {
  "content": {
   "title_line1": "When the work is done, your mind stays on the clock",
   "title_line2": "You finish it all, then end up checking it all again",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychology × counseling integration",
   "opening_scene": "It’s late on a Monday night, and your phone lights up with a message before you’ve even fully settled into the chair. The task is already done, but your mind is still moving through it, line by line, asking whether you missed something. Even when you try to rest, the feeling doesn’t land as rest; it lands as unfinished business. Sam, isn’t this exactly how your evenings have been going lately?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, project-based work",
   "case_paragraphs": [
    "Mina leaves the office with a finished file on her laptop, but she opens it again on the train because one sentence still feels too loose. Her day looks calm from the outside, yet her head keeps re-running the same checklist until it starts to feel heavy instead of helpful. Her Five Elements chart is similar to yours in one important way: the strong Wood pressure keeps pushing for control, while Fire is missing and doesn’t step in to soften the pace. You can probably see yourself in that rhythm already, and that’s why this example matters to you."
   ],
   "oheng_intro": "Your Five Elements are balanced at Wood 25%, Earth 25%, Metal 25%, and Water 25%, with Fire at 0%. For a Day Master rooted in Earth, Wood feels like pressure, rules, and responsibility pressing in from above, while Fire is the support, learning, and protection that should help you breathe again. In a burnout module, that exact split shows up as finishing hard, then struggling to let the finish actually count.",
   "quiz_reading": "Your Perfectionism score is 82%, and your Recovery score is 34%, which fits the Finisher's Drain type. That combination shows up as the habit of going back to re-check everything right after you finish, then feeling uneasy even on a day off. So the work gets completed, but your nervous system doesn’t get the memo that it can stand down.",
   "element_readings": {
    "wood": {
     "heading": "🌳 wood strong — pressure that keeps asking for one more pass",
     "body": "Wood is at 25%, which makes it strong enough to shape your day without overpowering the whole chart. For your Earth Day Master, that Wood feels like rules, deadlines, and the sense that you have to keep everything in line. It matches the way you go back and re-check everything after a task is already done. The pressure is not random; it is organized, and you feel it as a constant need to stay ahead."
    },
    "fire": {
     "heading": "🔥 fire weak — the warmth that should have helped you stop",
     "body": "Fire is at 0%, so this is the clearest gap in the chart. Wood supports Fire, and that means the energy that should bring warmth, encouragement, and ease has to be fed from effort instead of arriving on its own. That fits the way a day off can still feel uneasy for you, because rest does not quite register as rest. Sam, this is the part that leaves you doing more even when you most need less."
    },
    "earth": {
     "heading": "⛰️ earth strong — the part of you that keeps carrying",
     "body": "Earth is at 25%, so it sits at the same level as Metal and Water, steady and present rather than extreme. As an Earth Day Master, this is the part of you that keeps holding the structure together even when you are tired. It shows up when you keep moving after the work is done, just to make sure nothing slips. That steadiness is useful, but it can also make it hard to notice when you’ve already carried enough."
    },
    "metal": {
     "heading": "💎 metal strong — the inner editor that won’t let go",
     "body": "Metal is at 25%, which gives you a clean, exacting edge without making the whole chart rigid. In burnout terms, it looks like the voice that notices what could still be improved and refuses to stop at 'good enough.' That is the voice behind re-checking, tightening, and polishing after everyone else has already moved on. You can feel how it helps your work stay sharp, even while it keeps your mind from switching off."
    },
    "water": {
     "heading": "💧 water strong — the stream of thoughts that keeps running",
     "body": "Water is at 25%, so your thinking has depth and continuity rather than staying shallow. In your day, that can look like a mind that keeps moving after the body is ready to stop. The result is not a lack of effort; it is effort that keeps flowing past the point where rest should begin. That is why Monday-morning messages can flip the whole system back on so quickly."
    }
   },
   "upcoming_period_preview_heading": "40 years old, earth takes the lead",
   "upcoming_period_preview_body": "From age 40 to 49, Earth becomes the dominant 10-year cycle for you. The pace changes, and the old feeling of having to prove everything through sheer output starts giving way to a heavier, slower kind of structure. It feels less like a sprint and more like the floor beneath your feet changing texture.",
   "upcoming_period_heading": "40 years old, a new chapter begins",
   "upcoming_period_body": "From age 40 to 49, Earth takes the lead in a way that fits your Day Master more closely, so the whole rhythm becomes less driven by pressure from outside and more by what you can actually hold. For you, that matters because burnout has been built around finishing hard and then collapsing, and this cycle shifts the emphasis toward steadier containment. It is a useful phase for building workdays that end cleanly, instead of leaving your mind in the task long after the task is done. The feeling is less like chasing the finish line and more like standing on ground that finally stays put.",
   "cross_analysis_quotes": [
    "Your 82% Perfectionism lines up with the same pattern as your strong Wood: \"I finish it, then I check it again.\" Wood keeps pressing for control, and your perfectionism score shows that the pressure does not stop just because the work is done. That is why finishing something can still leave you feeling as if you have to look once more.",
    "Your 34% Recovery sits right beside your missing Fire. That means rest has too little warmth to feel complete, so even a day off can still feel uneasy. The chart and the test are pointing to the same thing: you do not struggle to stop because you are lazy, but because stopping does not yet feel safe enough to count."
   ],
   "answer_notes": [
    "Going back to re-check everything shows a mind that treats completion as a moment of risk, not relief. In daily life, that becomes one more look at the file, the message, or the number before you let yourself stand up. Sam, this is the part of you that wants certainty before it will allow closure.",
    "Feeling uneasy even when you rest shows that recovery is not landing as a settled state. In real life, that can look like sitting down with nothing urgent to do and still feeling as if you should be doing something. Sam, the answer tells me you are not resisting rest; you are waiting for rest to feel real."
   ],
   "chat_snapshot_note": "Your core worry is that rest never feels like resting, and that lands together with feeling tired and a little anxious. Those two pieces fit tightly: you are not only worn out, you are also watching your own downtime as if it might fail. The line to keep is this: you do not need more effort to prove you’re tired; you need a way for rest to count.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they reopen the tension before your body has fully left it behind. That fits your strong Wood and high Perfectionism: both are quick to switch back into control mode the moment something arrives. For you, the message is not just information; it is a signal that the checking can start again.",
   "chat_repeat_note": "Your pattern is cramming, then crashing. First you push hard to finish and tighten everything, then you drop all at once when the pressure has nowhere else to go. A small way out is to set a stopping point before the last ounce of energy is gone, so the ending arrives on purpose instead of as a collapse.",
   "chat_fear_note": "The fear underneath this is simple and sharp: if you stop, you’ll fall behind. That fear makes sense when your mind has learned to link movement with safety. What you really seem to want is not endless motion, but proof that pausing will not cost you your place.",
   "psychology_fact_heading": "Perfectionism and recovery balance",
   "psychology_fact_body": "Perfectionism and recovery balance is a useful way to understand why finishing can still feel unfinished. When perfectionism stays high, the mind keeps scanning for flaws even after the task is complete; when recovery stays low, the system has less room to settle afterward. In your case, the 82% perfectionism and 34% recovery scores make that pattern very visible: you keep checking because stopping does not yet feel fully safe.",
   "psychology_takeaway": "Completion is not the same thing as relief. Your system needs permission to let a finished task stay finished.",
   "strengths": [
    {
     "title": "Strong finish",
     "body": "You do not leave things half-done, and that shows up clearly in the way you go back and re-check everything after finishing a task. That habit says you care about the quality of what leaves your hands. Sam, your work has staying power because you actually stay with it."
    },
    {
     "title": "Sharp noticing",
     "body": "Your 82% perfectionism means you catch small details quickly, even after the main job is over. In practice, that is why you can still spot the line that feels off, the number that needs one more look, or the message that should be checked again. Sam, you notice what others might miss."
    },
    {
     "title": "Endurance",
     "body": "Your chart shows enough Earth, Metal, and Water to keep carrying structure, precision, and thought all at once. That is part of why you can push through busy stretches and keep functioning even when tired. Sam, your strength is not speed alone; it is the fact that you keep going when the work is heavy."
    },
    {
     "title": "Self-monitoring",
     "body": "You are aware of your own state enough to say that rest does not feel like rest. That kind of awareness is useful, because it lets you name the exact point where the system starts to fray. Sam, the fact that you can see the pattern already gives you somewhere to begin."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "You keep returning to what is already done, which means the end of a task does not always feel like an end. That can make the last stretch of the day longer than the task itself. Sam, the cost is not just time; it is the feeling of never truly getting to stand down."
    },
    {
     "title": "Thin recovery",
     "body": "With Recovery at 34% and Fire at 0%, rest has less support than your effort does. That is why a day off can still feel uneasy instead of replenishing. Sam, your body may pause, but your mind keeps looking for the next thing."
    },
    {
     "title": "Crash cycle",
     "body": "Cramming, then crashing means your energy is being spent in spikes instead of spread out steadily. You can probably feel the shape of it: a hard push, a tight finish, then a drop that arrives all at once. Sam, this is the kind of rhythm that makes ordinary days feel more dramatic than they need to be."
    },
    {
     "title": "Fear of falling behind",
     "body": "The fear that stopping means falling behind keeps your attention locked on momentum. It makes rest feel like a gamble instead of a break. Sam, that fear is loud, but it is also a clue about how much you value staying on track."
    }
   ],
   "fit_good": "You do best in a workday with clear start and stop points, where a task can be marked done without being reopened three more times. A calm handoff, a written checklist, and a predictable end to the day help your mind stop treating every finish as provisional. Sam, you fit environments where closure is visible and not left to memory alone.",
   "fit_bad": "You struggle in settings where Monday-morning messages, late edits, and constant after-hours checking are treated as normal. A day like that keeps your body in the chair and your mind in the file long after work should have ended. Sam, environments that never close the loop will keep feeding the part of you that cannot rest.",
   "behavior_guides": [
    {
     "title": "Hard stop",
     "body": "Pick one ending time each workday and stop at that time for five days in a row. Put the last check in writing before that time, then close the file and leave it closed. Sam, the point is not to do less work; it is to let one ending become believable."
    },
    {
     "title": "Recovery cue",
     "body": "When you sit down to rest, keep one small object nearby that signals the day is over, like a notebook closed flat or a laptop shut and out of reach. Use that cue for ten minutes before you check anything else. Sam, this gives your mind a visible sign that rest is allowed to count."
    },
    {
     "title": "Check limit",
     "body": "After finishing a task, allow yourself one review pass and no more for that item. If the urge returns, write the concern down instead of reopening the work. Sam, this keeps your perfectionism from turning every finish into a loop."
    },
    {
     "title": "Monday buffer",
     "body": "On Monday mornings, wait ten minutes before opening messages, and spend that time on one neutral routine instead. Keep it simple and repeatable, so the first signal of the day is not stress. Sam, you are teaching your system that contact does not have to equal immediate tension."
    }
   ],
   "mindset_guide": "Think of your energy like a desk that only clears when one stack is fully put away. If you keep reopening the same pile, the desk never looks finished, even when the work is done. Your job is not to prove that every page is perfect; it is to let one completed stack stay closed. Sam, the moment you stop treating finishing as a test, your mind gets room to breathe.",
   "closing_title": "The work can end before you do",
   "closing_body": "From age 40 to 49, Earth takes the lead, and that shift gives your days a different weight. The constant need to re-check starts to lose its grip, and the finish of a task can finally feel like a finish instead of a prompt to keep going. In this 10-year cycle, that means the tension eases at the point where it used to spike, and your evenings stop carrying the whole day on their back. The work can end before you do."
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
 "lucia": {
  "content": {
   "title_line1": "Todo termina fuera, pero dentro sigues revisando",
   "title_line2": "Y esa energía que no se apaga te pide otra forma de descansar",
   "subtitle": "Módulo 3 de agotamiento: informe profundo de tu mapa, cinco elementos, Maestro del Día, ciclo de diez años, tronco celeste y rama terrestre",
   "opening_scene": "De noche, cuando ya terminaste lo que tenías entre manos, tu mente no se queda quieta. Vuelves a mirar lo que ya tocaste, como si faltara una vuelta más, y el cuerpo sigue sentado aunque la cabeza ya esté corriendo. Luego llega el lunes por la mañana y los mensajes vuelven a encender esa tensión en un segundo. Descansas, pero por dentro sigues revisando, y el descanso no termina de sentirse como descanso. Lucía, ¿no te está pasando eso últimamente?",
   "case_tag": "CASO DE EJEMPLO — Marta, treintañera, con exceso de revisión y fatiga acumulada",
   "case_paragraphs": [
    "Marta deja una tarea cerrada a las nueve de la noche, pero diez minutos después vuelve a abrirla para mirar si falta algo. Al día siguiente, los mensajes de la mañana la encuentran ya con la mente apretada, y el descanso del fin de semana se le queda corto antes de empezar. Su mapa también muestra una tierra dominante y un metal casi ausente, así que vive como si la presión pesara más que el apoyo. Tú también podrías estar sosteniendo demasiado tiempo antes de soltar."
   ],
   "oheng_intro": "Tu 38% de tierra marca una base dominante, y en tu Maestro del Día agua eso se siente como una presión que aprieta con reglas, responsabilidad y exigencia. Tu metal está en 0%, así que la parte que te daría apoyo, aprendizaje y protección queda muy baja. Por eso este módulo se te pega tan fácil: sostienes mucho, pero te cuesta encontrar un borde que te devuelva aire.",
   "quiz_reading": "Tu 82% en perfeccionismo encaja con una forma de funcionar que no suelta la tarea cuando termina, porque la sigue repasando desde dentro. Tu 34% en recuperación explica por qué un día libre no baja la tensión del todo, sino que deja una inquietud de fondo. Esa combinación aparece en tu día como una revisión extra, un cuerpo quieto y una cabeza que sigue trabajando sola.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera baja — poco espacio para aflojar",
     "body": "Tu madera está en 13%, así que no domina la escena, pero tampoco desaparece del todo. En un día como el tuyo, eso se nota cuando intentas abrirte paso con una idea nueva y enseguida vuelves a la lista de lo que falta. No hay mucho margen para improvisar antes de que la revisión te gane el pulso."
    },
    "fire": {
     "heading": "🔥 fuego medio — empuje que se consume",
     "body": "Tu fuego está en 25%, en un punto que sí te da impulso para empezar y responder rápido. En tu módulo de agotamiento, ese empuje aparece cuando contestas mensajes, resuelves y sigues, aunque el cuerpo ya vaya más lento. El problema no es que falte energía; es que sale con tanta prisa que luego te deja sin reserva."
    },
    "earth": {
     "heading": "⛰️ tierra fuerte — la presión que te sostiene y te pesa",
     "body": "Tu tierra está en 38%, y eso la vuelve dominante en tu mapa. Como tu Maestro del Día es agua, esta tierra se siente como una presión que te organiza, te exige y te deja poco espacio para aflojar. En tu día se ve en ese impulso de terminar, revisar y cargar con más de lo que conviene, justo antes de derrumbarte."
    },
    "metal": {
     "heading": "💎 metal bajo — apoyo que todavía pide lugar",
     "body": "Tu metal está en 0%, así que aquí hay una ausencia clara. En tu mapa, la tierra puede alimentar el metal, y eso habla de apoyo, aprendizaje y protección que nacen de lo que ya sostienes. Por eso, en vez de descanso que te limpie la cabeza, a veces solo acumulas más revisión y más peso."
    },
    "water": {
     "heading": "💧 agua media — mente que sigue moviéndose",
     "body": "Tu agua está en 25%, así que no es una energía pequeña ni apagada. Como Maestro del Día, el agua en ti piensa, recuerda y sigue haciendo preguntas incluso cuando ya cerraste el día. En el módulo de agotamiento, eso se ve en una noche en la que el cuerpo pide pausa, pero la mente todavía repasa lo que quedó abierto."
    }
   },
   "upcoming_period_preview_heading": "Desde los 38 años, se abre una etapa de fuego",
   "upcoming_period_preview_body": "Desde los 38 años, la energía de fuego toma más fuerza en tu ciclo de diez años. Lo que venía pidiendo revisión y aguante deja paso a una etapa más visible, más rápida y más encendida. Se siente como una luz que cambia de color al final del día y anuncia otro ritmo.",
   "upcoming_period_heading": "Desde los 38 años, empieza otro ritmo",
   "upcoming_period_body": "Desde los 38 años, el fuego marca un cambio real en la manera en que se mueve tu energía. Esa etapa no viene a pedirte más revisión, sino a mostrarte con más claridad dónde te enciendes y dónde se te va la fuerza. Si ahora sientes que sostienes demasiado antes de soltar, más adelante te conviene llegar con un modo más limpio de gastar tu energía, para que el brillo no se te vaya en el intento.",
   "cross_analysis_quotes": [
    "Tu 82% en perfeccionismo y tu tierra dominante dicen lo mismo: terminas la tarea, pero no terminas la revisión. Eso deja tu noche llena de pequeños repasos, como si cerrar fuera solo otra vuelta del mismo gesto. Vuelves a mirar desde el principio porque tu mente no suelta el control con facilidad.",
    "Tu 34% en recuperación y tu metal en 0% explican por qué el descanso no te cae encima como alivio, sino como una inquietud suave que sigue ahí. No te falta voluntad; te falta un apoyo interno que te deje parar sin sentir que pierdes terreno. Por eso, incluso en un día libre, el cuerpo baja el ritmo, pero la mente sigue en alerta."
   ],
   "answer_notes": [
    "Responder que vuelves a revisarlo todo desde el principio muestra que no te basta con terminar; necesitas comprobar una vez más que nada quedó flojo. En la práctica, eso te lleva a abrir de nuevo una tarea ya cerrada, aunque el reloj diga que ya terminaste. A ti te sirve mirar esa costumbre como una forma de control, no como una falla.",
    "Decir que sientes inquietud aunque descanses deja ver que tu recuperación no apaga del todo la activación interna. En tu día, eso aparece cuando paras el cuerpo pero la cabeza sigue alerta, como si el descanso tuviera que ganarse primero. No te pelees con esa señal; úsala para notar que necesitas otro tipo de pausa."
   ],
   "chat_snapshot_note": "Tu preocupación central no es solo descansar, sino que el descanso nunca se sienta como descanso. Debajo de eso hay cansancio y un poco de ansiedad, y los dos se mezclan en la misma escena: parar por fuera y seguir tensándote por dentro. Lo que más se queda aquí es esta frase: descansas, pero tu mente sigue en guardia.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque llegan justo cuando tu sistema todavía quiere seguir controlando todo. Esa entrada repentina engancha con tu perfeccionismo alto y vuelve a encender la revisión antes de que el día arranque. En ti, no es solo el mensaje; es el aviso de que otra vez toca estar listo demasiado pronto.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte no aparece de golpe; se arma en silencio mientras sigues aguantando. Tú eliges seguir sosteniendo un poco más, y justo por eso el bajón llega después con más peso. La salida pequeña está en soltar antes de llegar al borde, aunque sea una sola cosa.",
   "chat_fear_note": "Te da miedo quedarte atrás si paras, y esa frase dice mucho más que una simple prisa. Debajo hay una necesidad de seguir siendo útil, visible y al día, como si detenerte te borrara un poco. Lo que pide ese miedo no es más velocidad, sino una forma de parar sin sentir que desapareces.",
   "psychology_fact_heading": "Perfeccionismo desadaptativo y rumiación",
   "psychology_fact_body": "El perfeccionismo desadaptativo describe una forma de funcionar en la que el estándar interno sigue subiendo incluso después de terminar. La rumiación, por su parte, mantiene la atención enganchada a lo ya hecho y hace que la mente siga repasando en lugar de cerrar. En tu caso, esas dos piezas encajan con la escena de terminar una tarea y volver a mirarla desde el principio, como si el cierre nunca terminara de asentarse.",
   "psychology_takeaway": "No te falta descanso; te sobra revisión. Cuando la mente no suelta, el cuerpo tampoco siente que terminó.",
   "strengths": [
    {
     "title": "Persistencia fina",
     "body": "Tu 82% en perfeccionismo no habla solo de exigencia; también muestra una capacidad real para sostener atención hasta el final. En tu día, eso se ve cuando revisas una tarea con detalle y no dejas cabos sueltos a la primera. Bien usado, ese impulso te da una calidad de entrega que otras personas solo prometen."
    },
    {
     "title": "Lectura interna",
     "body": "Tu 34% en recuperación baja hace que notes rápido cuando algo dentro de ti no termina de bajar. Eso te da una sensibilidad clara para detectar la inquietud antes de que se convierta en derrumbe. En una tarde cualquiera, puedes notar que el descanso no está entrando y ponerle nombre antes de seguir empujando."
    },
    {
     "title": "Resistencia sostenida",
     "body": "Tu tierra dominante te da capacidad para aguantar mucho tiempo en pie antes de caer. Esa fuerza se ve en cómo mantienes el ritmo aunque ya notes cansancio y ansiedad al mismo tiempo. No es poca cosa: hay una parte de ti que sabe sostener incluso cuando el día pesa demasiado."
    },
    {
     "title": "Alerta sensible",
     "body": "Tu agua como Maestro del Día hace que percibas los cambios de ambiente con mucha rapidez. Por eso los mensajes del lunes por la mañana te llegan como una señal completa, no como un simple aviso. Esa sensibilidad, bien cuidada, también puede ayudarte a notar cuándo necesitas un límite antes de que todo se acumule."
    }
   ],
   "weaknesses": [
    {
     "title": "Cierre difícil",
     "body": "Con un perfeccionismo de 82%, cerrar una tarea no siempre significa cerrarla por dentro. Puedes terminar algo y aun así volver a abrirlo para revisar desde cero. Ese gesto te da control por un momento, pero también te roba descanso."
    },
    {
     "title": "Pausa en alerta",
     "body": "Tu recuperación baja hace que parar no se sienta del todo seguro. Incluso en un día libre, aparece una inquietud que no deja bajar la guardia. No es falta de descanso físico; es una dificultad para creer que parar no te deja atrás."
    },
    {
     "title": "Acumulación",
     "body": "Tu patrón de acumular y luego derrumbarte muestra que aguantas demasiado antes de aflojar. Primero sumas, luego sostienes, y solo después notas el peso completo. Esa secuencia te deja con la sensación de que el bajón llega tarde y de golpe."
    },
    {
     "title": "Presión interna",
     "body": "Tu tierra fuerte, unida a un metal en 0%, hace que la presión pese más que el apoyo en muchos momentos. En la práctica, eso se parece a seguir funcionando sin sentir una base que te proteja de tanto exigir. Cuando todo eso se junta, el cansancio no se va; se acumula."
    }
   ],
   "fit_good": "Te va mejor un día con bloques claros y un cierre visible antes de cambiar de tarea. Si trabajas con tiempos definidos, puedes terminar sin dejar la mente abierta toda la noche. También te ayuda un espacio donde el mensaje urgente no llegue como sorpresa constante, para que tu atención no arranque en tensión desde temprano.",
   "fit_bad": "Te desgasta un ambiente donde todo cambia por mensajes sueltos y urgencias de última hora. Si empiezas el día con interrupciones constantes, tu perfeccionismo se engancha a revisar y revisar sin terminar de soltar. También te pesa un ritmo en el que nunca sabes si de verdad cerraste algo antes de pasar a lo siguiente.",
   "behavior_guides": [
    {
     "title": "Cierre visible",
     "body": "Antes de terminar tu día, deja por escrito tres cosas cerradas y una sola pendiente. Hazlo a la misma hora durante cinco minutos, sin volver a abrir lo ya listado. Así le enseñas a tu mente que terminar también cuenta."
    },
    {
     "title": "Pausa breve",
     "body": "Cuando aparezcan los mensajes del lunes por la mañana, espera dos minutos antes de responder. En esos dos minutos, mira qué parte de tu cuerpo se pone más tensa y suéltala con una respiración lenta. No hace falta hacer más; hace falta notar el arranque."
    },
    {
     "title": "Revisión única",
     "body": "Si revisas una tarea, hazlo una sola vez con un límite de diez minutos. Cuando se acabe ese tiempo, ciérrala aunque te queden ganas de mirar otra línea más. Ese borde pequeño te ayuda a cortar el ciclo de volver al principio."
    },
    {
     "title": "Descanso real",
     "body": "Elige un descanso que no mezcle trabajo ni pantallas durante quince minutos. Siéntate, mira un punto fijo o camina sin abrir mensajes, y deja que el cuerpo note una pausa distinta. Tu recuperación baja necesita experiencias claras, no pausas a medias."
    }
   ],
   "mindset_guide": "Tu mente funciona como una mesa donde nunca se retira del todo el trabajo. Si dejas todo extendido, siempre parece que falta algo. En cambio, cuando recoges una sola cosa, el espacio cambia de verdad. No necesitas apagarlo todo de golpe; necesitas aprender a cerrar una superficie antes de tocar la siguiente. Así, tu energía deja de gastarse en vigilar lo que ya terminó.",
   "closing_title": "Cuando cerrar también cuenta",
   "closing_body": "Desde los 38 años, el fuego abre otra etapa en tu ciclo de diez años. Hasta entonces, lo que más se ve en tu día es esa tensión entre terminar por fuera y seguir revisando por dentro, y eso encaja de lleno con el agotamiento que describiste. Más adelante, el cambio no te pide ser otra persona; te pide gastar la energía con menos fuga y más claridad. Y si te quedas con una sola frase de todo esto, que sea esta: terminar también puede ser una forma de descansar."
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
   "title_line1": "끝낸 일 위에 또 덧칠하는 마음",
   "title_line2": "쉬어도 멈추지 않는 점검의 리듬을 읽습니다",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침, 메신저 알림이 뜨는 순간 손은 화면 위에 멈추고 머리는 이미 다음 일을 찾고 있어요. 일을 끝냈는데도 마음은 다시 처음부터 훑고, 방금 닫은 파일보다 아직 열지 않은 일정표가 더 크게 보이는 밤이 반복돼요. 쉬는 날에도 몸은 자리에 있는데, 마음은 계속 점검 모드에 붙잡혀 있어요. 지수님, 요즘 이런 모습 아니세요?",
   "case_tag": "가상 사례 — 민준, 30대 초반, 업무 과부하",
   "case_paragraphs": [
    "민준은 퇴근 후에도 노트북을 덮지 못해요. 보고서를 보낸 뒤에도 제목부터 다시 읽고, 메신저 알림이 울리면 가슴이 먼저 반응해요. 그의 토 기운도 강해서 현실을 붙잡는 힘은 센데, 그 힘이 쉬는 자리까지 일로 채워 버려요. 당신도 비슷하게 끝낸 뒤에 더 지치는 쪽인가요?"
   ],
   "oheng_intro": "오행은 토 50%가 우세하고 수 0%가 약해요. 갑목인 지수님에게 토는 내가 다루는 기운이라서, 현실과 일을 붙잡는 힘이 아주 강하게 드러나요. 반대로 수는 나를 살려 주는 기운인데 비어 있어서, 이번 번아웃 모듈에서는 멈춤보다 버팀이 먼저 앞서는 장면으로 보입니다.",
   "quiz_reading": "지수님은 완벽주의 82%가 높고 회복 34%가 낮은 완주형 소진으로 나와요. 끝까지 해내려는 힘은 분명한데, 일이 끝난 뒤에도 마음이 멈추지 않아 다시 처음부터 훑는 장면으로 이어져요. 쉬는 날에도 편안함보다 불편함이 먼저 올라오는 흐름이라, 겉으로는 쉬어도 안에서는 계속 일하고 있어요.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 우세 — 앞으로 밀어붙이는 가지",
     "body": "목 33%는 지수님 안에서 이미 꽤 힘 있게 움직이고 있어요. 새 일을 보면 바로 뻗어나가고, 시작한 일을 끝까지 이어 붙이려는 결이 분명해요. 그런데 번아웃 모듈에서는 그 힘이 ‘조금 더’에서 멈추지 않고, 끝난 뒤에도 다시 한 번 확인하게 만들어요. 그래서 지수님은 시작보다 마무리 뒤의 점검에서 더 오래 서 있게 돼요."
    },
    "fire": {
     "heading": "🔥 화 약하다 — 열이 꺼진 자리",
     "body": "화 0%는 화면의 속도는 빠른데 체감 온도는 낮은 상태처럼 보여요. 일이 돌아가고 있어도 손끝에 남는 온기가 적어서, 해냈다는 감각이 오래 붙지 않아요. 그래서 지수님은 성과를 만든 직후보다 그 다음 순간에 더 쉽게 허전함을 느껴요."
    },
    "earth": {
     "heading": "⛰️ 토 우세 — 현실을 붙드는 무게",
     "body": "토 50%는 지수님이 일을 대하는 방식의 중심이에요. 마감이 오면 버티는 힘이 생기고, 중간에 흐트러진 것도 다시 정리해서 끝까지 가져가요. 다만 번아웃 모듈에서는 그 토가 휴식 시간까지도 작업 공간처럼 만들어 버려요. 그래서 쉬는 날에도 마음 한쪽은 아직 할 일 목록을 붙잡고 있어요."
    },
    "metal": {
     "heading": "💎 금 보통 — 기준을 세우는 선",
     "body": "금 17%는 지수님 안에 기준과 검토의 감각을 남겨 둬요. 덕분에 일을 대충 넘기지 않고, 어디가 빠졌는지 한 번 더 보게 돼요. 그런데 회복이 낮은 날에는 그 기준이 멈춤의 신호보다 수정의 신호로 먼저 작동해요. 그래서 지수님은 쉬면서도 계속 선을 다듬고 있어요."
    },
    "water": {
     "heading": "💧 수 약하다 — 쉬게 해 주는 물길",
     "body": "수 0%라서 지수님에게는 쉬는 감각이 쉽게 채워지지 않아요. 금이 수를 살려 주는 흐름이 필요하지만, 지금은 그 연결이 약해서 머리가 먼저 식지 않고 계속 달려요. 그래서 월요일 아침 메신저 알림 하나에도 마음이 다시 긴장 상태로 돌아가요. 지수님은 쉬지 못해서 지친 게 아니라, 쉬는 쪽으로 물이 흐르지 않아 더 오래 마르는 모습이에요."
    }
   },
   "upcoming_period_preview_heading": "36세부터, 수의 계절이 열립니다",
   "upcoming_period_preview_body": "36세부터 45세까지 수 기운이 강해지는 시기가 열려요. 지금까지 지수님을 몰아세우던 리듬이 그때는 다른 결로 바뀌고, 멈춤과 정리가 자연스럽게 들어오는 장면이 생겨요. 공기가 조금 눅눅해지듯 마음의 속도도 낮아지는 쪽으로 장면이 넘어갑니다.",
   "upcoming_period_heading": "36세부터 시작되는 다음 장",
   "upcoming_period_body": "36세부터 45세까지의 수 기운은 지수님에게 점검보다 회복의 비중을 키워 줘요. 지금까지는 몰아서 버티고 한 번에 무너지는 식이었다면, 그 뒤에는 중간중간 숨을 고르는 흐름이 더 선명해져요. 지금은 일을 끝낸 뒤의 공백을 견디는 연습이 중요하고, 그 시기에는 그 공백이 덜 불편한 쪽으로 바뀝니다. 월요일 아침 알림이 다시 마음을 휘어잡는 힘도 그때는 지금보다 훨씬 약해져요.",
   "cross_analysis_quotes": [
    "토 50%와 완벽주의 82%는 같은 방향을 보고 있어요. 지수님은 현실을 붙드는 힘이 강해서, 한 번 맡은 일을 대충 끝내는 쪽으로 잘 못 가요. 그래서 끝낸 뒤에도 다시 훑는 습관이 단순한 성격이 아니라, 토가 과하게 일 쪽으로 붙은 모습으로 읽혀요.",
    "수 0%와 회복 34%는 지수님이 왜 쉬어도 쉬지 못하는지 정확히 보여줘요. 마음이 가라앉아야 회복이 시작되는데, 지금은 그 물길이 약해서 쉬는 시간에도 불편함이 먼저 올라와요. 그래서 불안이 커질수록 더 일에 매달리게 되는 구조가 만들어져요."
   ],
   "answer_notes": [
    "다시 처음부터 훑는다는 답은 지수님이 결과보다 누락을 더 크게 보는 사람이라는 뜻이에요. 일상에서는 일을 마친 뒤에도 메일 제목, 숫자, 문장 끝을 다시 확인하는 장면으로 나타나요. 그런 꼼꼼함은 강점이지만, 오늘은 멈춰도 된다는 표시를 스스로 한 번 남겨 보세요.",
    "쉬어도 마음이 불편하다는 답은 몸의 휴식보다 마음의 경계가 더 높게 서 있다는 신호예요. 쉬는 날에도 알림이 오면 바로 긴장하는 모습으로 이어지고, 빈 시간이 오히려 부담이 돼요. 쉬는 시간을 실패로 보지 않는 연습이 먼저 필요해요."
   ],
   "chat_snapshot_note": "지수님은 상담에서 ‘쉬어도 쉬는 것 같지 않다’는 고민을 꺼냈고, 그 말 뒤에는 지쳤는데도 불안이 남아 있는 감정이 붙어 있었어요. 월요일 아침 메신저 알림이 그 불안을 다시 켜는 장면까지 이어져서, 쉬는 시간조차 긴장으로 바뀌고 있었어요. 지수님에게 필요한 건 더 세게 버티는 법이 아니라, 쉬어도 불편하지 않은 틈을 만드는 일이에요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 단순한 연락이 아니에요. 멈추면 뒤처질 수 있다는 두려움을 바로 건드리는 신호라서, 마음이 그 순간 다시 일 모드로 붙어요. 이 반응은 회복 34%의 낮은 수치와도 잘 맞아떨어져요.",
   "chat_repeat_note": "몰아서 하고 무너지는 패턴은 지수님이 평소에 버티는 힘이 강하다는 뜻이에요. 한동안은 끝까지 밀어붙이지만, 쉬는 구간이 없어서 어느 순간 한꺼번에 꺼져요. 그 틈을 조금 줄이려면 하루 끝에 10분만이라도 ‘오늘은 여기까지’라고 적어 두는 게 시작이에요.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 두려움 아래에는, 제자리에 머물러도 괜찮다는 감각을 갖고 싶은 마음이 있어요. 지수님은 게으른 사람이 아니라, 놓치면 안 된다는 압박을 오래 들고 있었던 사람이에요. 그래서 진짜 바람은 더 빨리 가는 게 아니라, 멈춰도 불안하지 않은 상태예요.",
   "psychology_fact_heading": "완벽주의와 소진의 악순환",
   "psychology_fact_body": "완벽주의가 높은 사람은 일을 끝낸 뒤에도 기준을 쉽게 내려놓지 못해요. 그래서 성과를 만든 뒤에도 마음속 검토가 계속 이어지고, 그 과정이 회복을 늦추기도 해요. 지수님처럼 완벽주의 82%와 회복 34%가 함께 보일 때는, ‘더 잘해야 한다’는 마음이 쉬는 감각을 밀어내는 구조로 읽을 수 있어요. 이 패턴은 의지가 약해서가 아니라, 기준이 너무 오래 켜져 있어서 생겨요.",
   "psychology_takeaway": "끝난 일보다 끝나지 않은 점검이 더 지치게 해요. 지수님은 일을 더 잘하는 법보다, 마음이 멈추는 법을 먼저 배워야 해요.",
   "strengths": [
    {
     "title": "끝까지 버팀",
     "body": "지수님은 토 50%답게 해야 할 일을 쉽게 놓지 않아요. 월요일 아침 메신저 알림이 와도 바로 반응하는 힘이 있고, 일이 밀려도 끝까지 끌고 가는 버팀이 보여요. 이 힘은 소진을 만들기도 하지만, 동시에 지수님이 책임을 끝까지 지키는 힘이기도 해요."
    },
    {
     "title": "세밀한 점검",
     "body": "완벽주의 82%는 지수님이 빠진 부분을 금방 알아차린다는 뜻이에요. 일을 끝낸 뒤 다시 처음부터 훑는 습관은 지치게 하지만, 한편으로는 놓친 것을 발견하는 감각이 아주 선명하다는 뜻이기도 해요. 그래서 지수님은 대충 넘기지 않는 사람으로 남아요."
    },
    {
     "title": "불안 감지",
     "body": "회복 34%처럼 낮은 수치가 보일 때도, 지수님은 자신의 상태가 불편하다는 걸 분명히 알아차려요. ‘쉬어도 쉬는 것 같지 않다’는 말을 꺼낸 것 자체가 이미 몸과 마음의 어긋남을 정확히 읽고 있다는 뜻이에요. 그 감지는 나중에 회복의 기준을 세울 때 아주 중요한 출발점이 돼요."
    },
    {
     "title": "책임 지속력",
     "body": "지수님은 한 번 맡은 일을 중간에 놓는 쪽보다 끝까지 책임지는 쪽에 가까워요. 몰아서 하고 무너지는 패턴이 있어도, 그 시작점에는 일을 붙드는 강한 지속력이 있어요. 이 지속력은 방향만 잘 잡히면 지수님을 오래 버티게 해요."
    }
   ],
   "weaknesses": [
    {
     "title": "쉬지 못함",
     "body": "수 0%는 지수님에게 쉬는 시간이 자동으로 채워지지 않는다는 뜻이에요. 몸은 쉬어도 마음이 계속 일 쪽에 붙어 있어서, 쉬는 날에도 편안함보다 불편함이 먼저 와요. 그래서 휴식이 쉬운 사람이 아니라, 휴식을 따로 배워야 하는 사람이에요."
    },
    {
     "title": "과점검 습관",
     "body": "일을 끝낸 뒤 다시 처음부터 훑는 습관은 지수님을 계속 긴장시키는 방식으로 굴러가요. 한 번 확인하면 끝날 것 같지만, 오히려 다음 확인을 부르고 마음은 더 늦게 내려와요. 이 습관은 실수를 줄이지만, 동시에 지수님의 에너지를 천천히 갉아먹어요."
    },
    {
     "title": "몰아치기",
     "body": "몰아서 하고 무너지는 패턴은 지수님이 평소에 너무 오래 참는다는 뜻이에요. 평일에는 버티다가 어느 순간 한꺼번에 꺼지기 쉬워서, 겉으로는 잘 가는 것처럼 보여도 안에서는 이미 많이 소모돼요. 조금씩 비우는 시간이 없으면 이 패턴은 더 선명해져요."
    },
    {
     "title": "멈춤 불안",
     "body": "뒤처질까 봐 멈출 수 없다는 감정은 지수님을 늘 앞으로만 밀어요. 쉬는 순간조차 불안이 따라와서, 머리는 계속 다음 일을 찾고 몸은 계속 긴장해요. 멈춤을 실패로 보지 않는 시선이 들어와야 이 불안이 조금 느슨해져요."
    }
   ],
   "fit_good": "지수님에게 맞는 환경은 해야 할 일이 분명하고, 중간에 기준이 자주 바뀌지 않는 자리예요. 하루의 시작과 끝이 또렷해서, 오전에 정리한 일을 오후에 다시 확인해도 흐름이 무너지지 않는 곳이 좋아요. 혼자 조용히 마무리할 수 있는 시간이 있고, 메신저 알림이 계속 튀지 않는 리듬이 잘 맞아요.",
   "fit_bad": "지수님은 알림이 계속 울리고 우선순위가 수시로 바뀌는 환경에서 더 빨리 지쳐요. 오전에 끝낸 일을 오후에 다시 뒤집는 분위기에서는 완벽주의 82%가 계속 켜져서 쉬는 틈이 사라져요. 하루가 끝나도 끝난 느낌이 없는 자리에서는 회복 34%가 더 낮게 체감돼요.",
   "behavior_guides": [
    {
     "title": "종료 신호",
     "body": "하루가 끝날 때 5분만 써서 오늘의 마지막 일을 적어 두세요. 퇴근 직전이나 잠들기 전처럼 같은 시간에 반복하면, 마음이 끝났다는 신호를 배우기 쉬워요. 적어 둔 뒤에는 다시 열지 않는 것을 목표로 해요."
    },
    {
     "title": "알림 구분",
     "body": "월요일 아침 메신저 알림처럼 바로 긴장을 올리는 알림은 첫 30분만 따로 묶어 두세요. 출근 직후에는 확인할 것, 나중에 볼 것을 구분해서 적어 두면 마음이 덜 흔들려요. 하루에 한 번이라도 알림을 즉시 반응하지 않는 연습이 필요해요."
    },
    {
     "title": "점검 한 번",
     "body": "일을 끝낸 뒤 다시 훑고 싶어질 때는, 확인 횟수를 한 번으로 정해 두세요. 두 번째 확인이 떠오르면 메모만 남기고 화면은 닫아 두는 방식이 좋아요. 이렇게 하면 완벽주의가 일을 돕는 쪽으로만 남고, 소진까지 끌고 가지 않아요."
    },
    {
     "title": "짧은 회복",
     "body": "쉬는 날에도 불편함이 올라오면 10분 단위로 쉬는 시간을 끊어 보세요. 산책, 물 마시기, 눈 감고 앉아 있기처럼 짧고 단순한 행동이 좋아요. 길게 쉬려고 애쓰기보다, 불편함을 견딜 수 있는 길이부터 만드는 게 먼저예요."
    }
   ],
   "mindset_guide": "지수님은 일을 잘 마치는 사람이지, 쉬는 데 서툰 사람이 아니에요. 지금은 종이에 선을 너무 진하게 그려서, 지우개를 들 틈이 없는 상태에 가까워요. 선이 진하다고 그림이 완성되는 건 아니고, 여백이 있어야 다음 장면도 들어와요. 메신저 알림이 울려도 바로 펜을 다시 잡지 않아도 된다는 감각을 조금씩 익혀 보세요.",
   "closing_title": "멈춤이 들어오는 자리",
   "closing_body": "36세부터 45세까지 수 기운이 강해지는 시기가 지수님 앞에 열립니다. 그때는 지금처럼 끝낸 뒤에도 마음이 계속 일 쪽으로 달리는 감각이 옅어지고, 쉬는 시간이 덜 불편해져요. 월요일 아침 메신저 알림이 전부를 흔드는 힘도 약해지고, 하루가 끝났다는 사실이 몸에 더 잘 내려와요. 지수님에게 가장 저장하고 싶은 문장은 이것이에요. 멈춤이 들어오면, 지수님은 더 적게 버티는 게 아니라 더 오래 숨 쉬게 됩니다."
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
   "title_line1": "Cuando la mente no suelta el cierre",
   "title_line2": "y la energía se va justo al terminar",
   "subtitle": "Módulo 3 de agotamiento — informe profundo de saju × prueba psicológica × acompañamiento integrado",
   "opening_scene": "Son las primeras horas del lunes y tu pantalla ya está llena de mensajes antes de que el día empiece de verdad. Abres uno, lo cierras, y en tu cabeza aparece la misma frase una vez más: “todavía falta algo”. Aunque el trabajo ya terminó, tu atención sigue pasando revisión por revisión, como si no te dejaras salir del último paso. Casey, ¿no te está pasando eso mismo estos días?",
   "case_tag": "CASO DE EJEMPLO — Martín, treinta y tantos, cierre de tareas y descanso que no se siente como descanso",
   "case_paragraphs": [
    "Martín termina todo antes de la hora, pero luego vuelve a abrir lo que ya cerró y revisa cada detalle otra vez. Vive pendiente de los mensajes del lunes por la mañana, y esa primera notificación le cambia el ritmo del día entero. Su mapa también muestra madera fuerte y agua ausente, así que le cuesta soltar lo que ya sostuvo con tanta tensión. Tú también puedes estar quedándote pegado al cierre cuando en realidad ya habías terminado."
   ],
   "oheng_intro": "Tu distribución muestra madera 38% y metal 38% como fuerzas dominantes, mientras fuego y tierra quedan en 13% y agua en 0%. Como tu Maestro del Día es metal, la madera es la energía que tú manejas para sostener trabajo y dinero, y el agua es la que tú sacas hacia fuera en forma de expresión, talento y energía visible. En este módulo de agotamiento, esa mezcla se nota en un cierre que no termina de apagarse y en una mente que vuelve al borde una y otra vez.",
   "quiz_reading": "Tu perfil marca perfeccionismo alto con 82% y recuperación baja con 34%, y esa combinación encaja con la imagen de quien termina todo y luego no logra apagar la mente. En tu día, eso se ve como revisar una tarea “por si acaso” justo cuando ya deberías estar descansando. El cuerpo para, pero la cabeza sigue trabajando.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera fuerte — lo que sostienes hasta el final",
     "body": "Tu madera está en 38%, y eso te pone en modo de sostener trabajo, dinero y pendientes con mucha fuerza. Cuando esa energía se pasa de vuelta, terminas haciendo una segunda pasada sobre lo que ya estaba listo, como si el cierre nunca fuera suficiente. En tu día, eso se parece a seguir empujando después de haber terminado, solo para no sentir que algo quedó flojo. En ti, la madera no se queda quieta: aprieta el final para que nada se escape."
    },
    "fire": {
     "heading": "🔥 fuego bajo — el impulso que no alcanza a encenderse",
     "body": "Tu fuego está en 13%, así que la chispa aparece, pero no se sostiene mucho tiempo. Eso se nota cuando empiezas con energía y, al poco rato, todo ese empuje se va gastando en correcciones y revisiones. En un día como el tuyo, el impulso se enciende con un mensaje o una tarea, y luego se consume antes de darte alivio. Tu fuego no falta; simplemente se apaga rápido cuando lo obligas a sostener demasiadas cosas a la vez."
    },
    "earth": {
     "heading": "⛰️ tierra baja — el suelo que buscas al final del día",
     "body": "Tu tierra está en 13%, así que el descanso y la estabilidad no se instalan solos en tu rutina. Eso explica por qué un día libre puede sentirse raro, como si el cuerpo bajara el ritmo pero la cabeza siguiera de pie. En tu caso, la tierra aparece más como una búsqueda que como una base automática: quieres parar, pero no terminas de sentir el suelo debajo. Por eso el descanso no se te vuelve descanso de inmediato."
    },
    "metal": {
     "heading": "💎 metal fuerte — la revisión que no suelta",
     "body": "Tu metal también está en 38%, y como Maestro del Día eso significa que tu manera de ordenar, corregir y cerrar pesa mucho en lo que haces. Ese metal fuerte se ve cuando vuelves sobre una tarea desde el principio y no te conformas con dejarla a medias por dentro. En tu día, el perfeccionismo no llega como una idea abstracta, sino como esa mano que abre otra vez lo que ya habías terminado. Tu metal te da precisión, pero también te deja muy cerca del punto en que nada parece suficientemente cerrado."
    },
    "water": {
     "heading": "💧 agua ausente — la salida que se queda corta",
     "body": "Tu agua está en 0%, y eso deja muy poca vía para soltar lo que sientes, expresas o produces hacia fuera. Por eso el cansancio no se vacía del todo y se queda dando vueltas dentro de ti, incluso en un día libre. Aquí encaja muy bien la relación que aparece en tu mapa: el metal puede ayudar a que el agua aparezca, pero ahora esa salida todavía se siente contenida. Cuando no hay agua, todo lo que acumulas tarda más en convertirse en alivio."
    }
   },
   "upcoming_period_preview_heading": "41 años, comienza un nuevo tramo de metal",
   "upcoming_period_preview_body": "A los 41 años, el metal entra con más fuerza y marca un cambio claro en tu ciclo de diez años. Lo que antes se vivía como empuje disperso empieza a tomar una forma más definida, más ordenada y más visible en tu manera de trabajar. Se siente como si la luz cambiara de ángulo y el mismo pasillo dejara de verse igual.",
   "upcoming_period_heading": "41 años, empieza otra etapa de metal",
   "upcoming_period_body": "A los 41 años, ese metal más fuerte da un marco distinto a tu manera de cerrar, revisar y decidir. Lo que hoy te hace repetir puede ganar una forma más limpia y más clara, con menos desgaste al final del día. Te conviene llegar a ese tramo con hábitos de pausa ya instalados, para que la precisión no vuelva a comerse tu energía. Así, el trabajo deja de sentirse como una puerta que nunca termina de cerrarse.",
   "cross_analysis_quotes": [
    "La madera fuerte no solo te hace sostener más; también te empuja a revisar más. Tu perfeccionismo alto del 82% encuentra ahí su combustible, y por eso no te basta con terminar: necesitas comprobar otra vez. Cuando acabas una tarea, vuelves a mirarla desde el principio y buscas lo que todavía podría mejorarse.",
    "El agua en 0% deja sin salida todo lo que acumulas, y por eso tu recuperación baja del 34% se nota tanto. No es que no quieras descansar; es que tu mente tarda en aceptar que ya puede soltar. En un día libre, incluso si descansas, sigues con inquietud por dentro."
   ],
   "answer_notes": [
    "Tu respuesta de volver a revisar todo desde el principio muestra una necesidad de control muy afinada. No buscas solo terminar; buscas cerrar sin fisuras, y eso habla de una vigilancia interna que no se apaga fácil. Cuando notes ese impulso, recuerda que no todo lo sólido necesita una segunda pasada para valer.",
    "Decir que sientes inquietud aunque descanses muestra que tu mente no interpreta el descanso como una señal segura. El problema no es la pausa en sí, sino la sensación de que parar te deja expuesto. Esa respuesta explica por qué incluso un día libre puede seguir sonando como una tarea pendiente."
   ],
   "chat_snapshot_note": "Tu preocupación central no es solo descansar, sino que el descanso no se sienta como descanso, y eso va de la mano con cansancio y un poco de ansiedad. En tu caso, la mente no baja cuando el trabajo termina; sigue mirando de reojo lo que falta. La frase que se queda contigo es esta: parar no siempre se siente seguro cuando llevas tanto tiempo sosteniendo todo.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te activan porque llegan justo cuando todavía no has terminado de soltar el fin de semana. Ese golpe encaja con tu metal fuerte: una sola notificación puede reabrir la revisión interna y ponerte otra vez en guardia. No es el mensaje en sí; es lo que enciende dentro de ti al verlo.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte funciona como una cuerda tensa que aguanta demasiado tiempo. Tú eliges seguir sosteniendo, seguir revisando y seguir empujando, hasta que el cuerpo ya no acompaña. Un pequeño cambio para salir de ahí es cortar antes la acumulación con una pausa breve y real, antes de llegar al punto de caída.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de debilidad, sino de cuánto valor le das a seguir avanzando. Debajo de ese miedo hay una necesidad muy clara de no perder ritmo ni lugar. Lo que de verdad pides es sentir que parar un momento no borra todo lo que ya construiste.",
   "psychology_fact_heading": "Burnout y perfeccionismo",
   "psychology_fact_body": "El burnout no aparece solo por hacer mucho, sino también por sostener una exigencia interna que nunca da por terminado el trabajo. El perfeccionismo alto hace que el cierre se alargue mentalmente, aunque la tarea ya esté entregada. En tu caso, eso coincide con una recuperación baja: el descanso llega, pero la mente sigue en modo revisión. Por eso el agotamiento no se ve como falta de capacidad, sino como exceso de control sostenido.",
   "psychology_takeaway": "No te falta descanso; te sobra vigilancia. Cuando bajas un poco la revisión interna, tu energía deja de irse en la última vuelta.",
   "strengths": [
    {
     "title": "Precisión firme",
     "body": "Tu combinación de madera y metal en 38% muestra una capacidad real para sostener y corregir sin perder el hilo. En tu día, eso se nota cuando terminas una tarea con ojo fino y detectas detalles que otros dejan pasar. Esa precisión te hace fiable, incluso cuando por dentro ya te sientes al límite."
    },
    {
     "title": "Resistencia alta",
     "body": "El hecho de que acumules y luego te derrumbes no borra tu resistencia; la explica. Aguantas mucho más de lo que parece, y por eso tu caída llega tarde y de golpe. En la práctica, eso te permite sacar adelante días pesados, aunque después necesites un corte más claro para no vaciarte del todo."
    },
    {
     "title": "Alerta fina",
     "body": "Tu respuesta al lunes por la mañana muestra una sensibilidad muy precisa al cambio de ritmo. Percibes enseguida cuándo algo vuelve a abrir tensión, y eso te ayuda a notar antes lo que otros pasarían por alto. Esa alerta, bien usada, puede servirte para poner límites antes de entrar en exceso."
    },
    {
     "title": "Capacidad de cierre",
     "body": "Aunque revises demasiado, sí tienes una fuerza clara para terminar lo que empiezas. Tu perfeccionismo del 82% no nace de abandono, sino de querer dejar las cosas bien rematadas. Cuando logras no añadir una vuelta extra, tu trabajo gana limpieza y tu energía dura más."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión infinita",
     "body": "Tu mente vuelve a empezar la tarea incluso después de terminarla. Eso hace que el cierre se convierta en una segunda jornada invisible, sobre todo cuando ya te quedas sin energía. En tu caso, una tarea entregada no siempre se siente entregada por dentro."
    },
    {
     "title": "Descanso tenso",
     "body": "Un día libre no te baja del todo el ruido interno. El cuerpo puede parar, pero la inquietud sigue buscando qué revisar o qué anticipar. Por eso el descanso, en tu experiencia, a veces se parece más a una pausa vigilada que a un alivio real."
    },
    {
     "title": "Acumulación brusca",
     "body": "Tu patrón de acumular y luego derrumbarte hace que el desgaste crezca sin mucha señal externa. Sigues sosteniendo hasta que ya no queda margen, y entonces la caída se siente grande. Esa forma de funcionar te pide cortes más pequeños y más frecuentes antes de llegar al límite."
    },
    {
     "title": "Miedo al freno",
     "body": "La idea de parar te altera porque la asocias con quedarte atrás. Ese miedo te empuja a seguir incluso cuando ya no te conviene seguir igual. El problema no es solo el esfuerzo; es que el freno te parece una pérdida de lugar."
    }
   ],
   "fit_good": "Te va mejor un día con bloques claros y cierres visibles, donde puedas terminar una cosa antes de abrir la siguiente. También te ayuda trabajar con mensajes y entregas en horarios predecibles, para que tu mente no viva pendiente de cada aviso. Cuando el final del día está bien marcado, tu energía se queda contigo un poco más.",
   "fit_bad": "Te desgasta un entorno con mensajes constantes desde temprano y cambios de prioridad a cada rato. Si te interrumpen justo cuando ya estabas cerrando, tu mente vuelve a empezar la revisión y el cansancio se multiplica. También te pesa un ritmo donde nunca sabes si lo hecho ya quedó realmente terminado.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Cuando termines una tarea, dedica solo cinco minutos a una revisión final y luego cierra la pestaña o el archivo. Hazlo al final de cada bloque, no cada vez que te entre la duda. Así entrenas a tu mente para aceptar que terminar también cuenta."
    },
    {
     "title": "Pausa real",
     "body": "En tu día libre, reserva veinte minutos sin pantalla ni tareas pendientes, aunque al principio sientas inquietud. Quédate solo con una actividad simple, como sentarte, tomar agua o mirar por la ventana. Repite eso una vez al día para que el descanso empiece a sentirse menos extraño."
    },
    {
     "title": "Mensaje diferido",
     "body": "Si los mensajes del lunes te activan, espera diez minutos antes de abrirlos. Usa ese margen para respirar, estirar los hombros o anotar lo primero que estás pensando. Ese pequeño retraso baja la tensión antes de que la mente se meta de nuevo en alerta."
    },
    {
     "title": "Salida breve",
     "body": "Cuando notes que estás acumulando demasiado, escribe tres líneas sobre lo que ya hiciste y deja ahí el registro. Hazlo al cerrar el día, no al final de cada tarea. Esa salida corta le da al agua un camino pequeño para no quedarse toda adentro."
    }
   ],
   "mindset_guide": "Tu mente se comporta como una mesa de trabajo que nunca se vacía del todo. Si sigues dejando herramientas encima después de cada tarea, el cierre no llega nunca. En cambio, cuando guardas una por una, el espacio vuelve a verse claro. No necesitas hacerlo perfecto para dejarlo terminado. Necesitas dejar de tratar cada final como si fuera una prueba más.",
   "closing_title": "Cuando el cierre sí cierra",
   "closing_body": "A los 41 años, el metal entra con más fuerza y tu ciclo de diez años cambia de tono. Lo que hoy se te hace pesado por la revisión constante empieza a tomar una forma más limpia, y el día deja de sentirse como una tarea abierta sin fin. En este módulo de agotamiento, esa diferencia se nota en el cuerpo: la tensión baja un poco y el cierre deja de reclamarte tanto. Casey, lo más importante es esto: tu energía no tiene que acabarse para que puedas parar."
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
   "title_line1": "The work is done, but your mind keeps one more hand on the door",
   "title_line2": "And even rest feels like something you have to check twice",
   "subtitle": "Module 3 · Burnout deep report — saju × psychology × counseling integration",
   "opening_scene": "It’s late on a Sunday night, and your phone lights up with Monday-morning messages before you’ve even fully settled into the couch. The task is already finished, but your mind is still circling back to the same line: did you miss anything, did you leave anything loose, did you really close it out. Even when you try to rest, the rest itself starts to feel unfinished. Riley, doesn’t your week sometimes begin again inside your head before Monday actually arrives?",
   "case_tag": "EXAMPLE CASE — Daniel, early 40s, work pressure",
   "case_paragraphs": [
    "Daniel finishes his last task after dinner, then opens the file again just to check one more detail before bed. His Five Elements are also lopsided in a way that mirrors that same strain: growth and self-drive are loud, while pressure and structure feel thin in the background. He tells himself he’s being careful, but the real result is a night that never fully switches off. You can see yourself in that loop too.",
    "By morning, he is already tired from a day that has not even started. He pushes hard, then crashes, then calls the crash “rest” even though it doesn’t land that way. The pattern is not that he lacks effort; it’s that effort keeps eating the space that recovery needs. And yes, that can look a lot like your own rhythm."
   ],
   "oheng_intro": "Your Five Elements are dominated by Wood at 50%, with Metal down at 0%, and that imbalance matters in a burnout module because the mind keeps growing, reaching, and extending instead of drawing a clean boundary. For you, Wood is the same force as your own initiative and your peer-like drive; it keeps saying “one more pass, one more fix.” Metal is the pressure of rules and responsibility, and at 0% it doesn’t naturally step in to say enough is enough. That is exactly why the finish line can feel less like relief and more like another place to keep working.",
   "quiz_reading": "Your 82% perfectionism and 34% recovery line up cleanly with the Finisher's Drain type. You don’t just want the task done; you want it sealed, checked, and re-checked, which is why the work can be over while your mind is still on duty. That combination shows up in the exact moment you try to rest and still feel uneasy, as if stopping too soon would leave something exposed.",
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
   "upcoming_period_preview_heading": "46 years old, Earth begins to take the lead",
   "upcoming_period_preview_body": "At 46 years old, Earth begins to take the lead, and that marks the start of a new chapter after a long stretch of pure pushing. The pace changes from reaching outward to holding weight more steadily, and the air around your days feels less sharp, less hurried, more grounded. It’s the kind of shift that changes the texture of an evening first: fewer loose ends buzzing at the edge, more sense that something has finally been set down.",
   "upcoming_period_heading": "46 years old, the next chapter opens on steadier ground",
   "upcoming_period_body": "At 46 years old, the Earth phase becomes the main backdrop, and that matters because your burnout pattern is built around overextending Wood without enough structure to stop it cleanly. In that next chapter, the day is less about chasing perfect closure and more about holding a stable rhythm that doesn’t demand a second look every few minutes. For you, that means the same effort can start to feel less jagged, because the frame around it is stronger. It’s worth preparing for a life where finishing something does not automatically mean turning back to guard it.",
   "cross_analysis_quotes": [
    "Your 82% perfectionism shows up as Wood in action, and Wood is the same kind of energy as your Day Master, meaning the force that keeps you moving and pushing from within. It keeps reaching for one more correction, one more check, and one more pass. That is why finishing a task doesn’t feel like release for you; it feels like a new place to monitor.",
    "Your 34% recovery is low, and your 0% Metal means the energy that would normally draw a clean stopping point is not showing up on its own. So even on a day off, you can feel uneasy while resting instead of letting rest settle. That fits the pattern of going back to re-check everything after a task and feeling uneasy even when you rest."
   ],
   "answer_notes": [
    "Your answer to re-checking everything shows a mind that treats completion as a responsibility, not just an ending. In daily life, that can look like reopening what you already sent, just to make sure the edges are tight. Riley, you’re not careless here — you’re carrying too much ownership of the final result.",
    "Your answer about feeling uneasy on a day off shows that recovery is not only physical for you; it’s psychological too. That can show up as sitting still, but still scanning, as if stillness itself needs permission. Riley, the wish underneath this is simple: you want rest that actually feels like rest."
   ],
   "chat_snapshot_note": "You came in with the core problem that rest never feels like rest, and it sits right beside tiredness and a little anxiety. That combination makes your exhaustion feel alert, not sleepy — the body wants to pause, but the mind keeps standing watch. Riley, the line I’d keep is this: you are not failing to rest; you are resting under inspection.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they don’t just ask for attention; they restart the whole internal checking loop. In a burnout pattern, that kind of trigger lands exactly where perfectionism is already high, so the tension jumps back on fast. Wood is already leaning forward in you, and the message arrives like a hand on your shoulder from behind.",
   "chat_repeat_note": "You cram, then crash, and the pattern keeps its own rhythm because the crash arrives after the body has already been overused. In the middle of it, you choose one more push, because stopping feels riskier than spending a little more energy. A small break that is timed before the last ounce is gone would interrupt the loop more effectively than trying to recover after collapse.",
   "chat_fear_note": "The fear underneath all of this is not laziness or weakness; it is the fear of falling behind if you stop. That fear tells me you care deeply about staying dependable and not losing your place. Riley, what you want most is probably to rest without feeling like you’ve surrendered your position.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "In psychology, perfectionism is often linked to a constant sense that work is never quite finished, while recovery depends on the ability to mentally disengage after effort. Research on burnout consistently shows that when perfectionistic standards stay high, people have a harder time switching off even after the task is over. Your profile fits that pattern closely: the checking continues after completion, and rest gets treated like another thing to evaluate. That is why your fatigue feels mixed with alertness instead of clean relief.",
   "psychology_takeaway": "You don’t need more proof that you worked hard; you need a mind that can let the task stay finished. The real shift is from guarding the result to letting recovery actually count.",
   "strengths": [
    {
     "title": "Strong follow-through",
     "body": "You finish what you start, and your 82% perfectionism shows that you care enough to return and tighten the details. That can be exhausting, but it also means people can trust your work to be handled carefully. Riley, the same drive that wears you out is also the reason your output rarely feels half-baked."
    },
    {
     "title": "Sensitive alarm",
     "body": "Your 34% recovery and the way Monday-morning messages spike your tension show that your system notices pressure quickly. That sensitivity can be useful because it catches problems before they spread too far. Riley, your alarm is loud not because you’re fragile, but because you register what matters."
    },
    {
     "title": "Persistent stamina",
     "body": "Cramming, then crashing, still tells me you can mobilize fast when you have to. Even when the pattern isn’t ideal, you keep finding a way to get through the demand in front of you. Riley, that kind of persistence is real strength, even if it currently costs too much."
    },
    {
     "title": "Quiet responsibility",
     "body": "Your fear of falling behind shows how seriously you take your role and your place. You don’t drift away from duty; you hold on to it even when you’re already tired. Riley, that sense of responsibility is strong enough that it deserves better boundaries, not less care."
    }
   ],
   "weaknesses": [
    {
     "title": "Endless checking",
     "body": "You can finish a task and still feel pulled back into it, which keeps your mind from getting the message that the work is done. That makes the last part of the day feel like open tabs instead of closure. Riley, the problem isn’t effort; it’s the inability to let a finished thing stay finished."
    },
    {
     "title": "Thin recovery",
     "body": "Your low recovery means rest can happen without actually landing as rest. You may sit down, but the inner review keeps going, so the body pauses while the mind stays on duty. Riley, that is why time off can still leave you feeling tired and a little anxious."
    },
    {
     "title": "Crash cycle",
     "body": "Cramming, then crashing, means your energy is being spent in spikes instead of in a steadier line. The push feels effective in the moment, but it takes a bigger toll later because the collapse arrives all at once. Riley, the cycle is not a character flaw; it’s a pattern that has learned to look normal."
    },
    {
     "title": "Fearful stopping",
     "body": "You seem to treat stopping as a possible way to lose ground, which keeps your system tense even when no one is asking for more. That fear can make every pause feel slightly unsafe, like the day might slip away if you don’t keep a hand on it. Riley, what you’re really protecting is your place, not just your productivity."
    }
   ],
   "fit_good": "You do best in a setting where the day has clear endpoints and the next step is visible before you start. A role with defined handoffs, written expectations, and a predictable close lets you stop without feeling careless. Riley, your mind settles more easily when the finish line is named, not implied.",
   "fit_bad": "You get worn down fast in a setting where messages keep arriving after the work should be over and every answer creates three more checks. A loose, always-on environment makes your perfectionism stay awake long after your body wants to shut down. Riley, the worst fit is a day that never quite ends.",
   "behavior_guides": [
    {
     "title": "Closing ritual",
     "body": "At the end of your workday, spend five minutes writing the three things that are actually complete. Then close the file, silence the notifications, and leave the room or desk for at least fifteen minutes without reopening anything. Riley, this gives your brain a concrete ending instead of a vague hope."
    },
    {
     "title": "Recovery window",
     "body": "On your day off, block one protected hour where checking is not allowed, even if you feel the urge to tidy things mentally. Pick one simple activity, like a walk or a meal, and stay with it from start to finish. Riley, recovery needs a container before it can feel real."
    },
    {
     "title": "Message boundary",
     "body": "Before Monday starts, choose one time when work messages are checked and one time when they are not. If a message arrives outside that window, let it wait until the next check instead of answering on reflex. Riley, this is how you teach your nervous system that every ping is not an emergency."
    },
    {
     "title": "One-pass rule",
     "body": "When a task is done, allow yourself one review pass and then stop. Set a timer for ten minutes, check once, and then send or save it without reopening it again. Riley, the goal is not to lower your standards; it is to stop letting standards eat your rest."
    }
   ],
   "mindset_guide": "Think of your energy like a battery that keeps getting asked to run both the job and the inspection at the same time. Your perfectionism keeps the inspection app open after the task is finished, and that drains the charge faster than the work itself. If you want rest to feel real, the first move is not to do more; it is to stop checking the screen for a second. Riley, finished does not mean unsafe.",
   "closing_title": "When the checking finally stops",
   "closing_body": "At 46 years old, Earth takes the lead, and the way you carry your days starts to feel less like a sprint and more like something with edges you can trust. In this module, that means the inner noise around work begins to lose its grip, and rest starts to feel less like a test and more like a place you can actually stand in. Monday still comes, but it doesn’t have to grab the whole room anymore. Riley, the line I want to leave you with is this: finished can stay finished, and you can finally let it."
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
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "jordan": {
  "year": 2027,
  "title": "2027, your steady spark",
  "subtitle": "A year to steer momentum without overpushing",
  "overview": "In 2027, the fire tone around you feels active and usable: it supports your drive, your sense of direction, and your ability to make things happen. Because your Day Master is Water, this is a year where you may feel invited to guide energy rather than simply react to it. That can be exciting, especially with your Dew · Order pattern, which often likes clarity, timing, and clean structure.\n\nYour Five Elements balance leans strongly toward Earth and Metal, with very little Wood and a modest amount of Fire and Water. In plain language, that can make 2027 feel like a year where movement and expression need a bit more intention, not less. If you try to force too much at once, the pace may feel scattered; if you choose one clear target at a time, the year can feel surprisingly productive.\n\nThe general tone is not chaotic, but it does ask for judgment. Early in the year, the fire matches your own rhythm and feels familiar; midyear, it becomes more about output, leadership, and resource use; later, the pace turns toward pressure, support, and a few useful course corrections. For you, Jordan, 2027 looks like a year to stay warm, stay organized, and let momentum build in readable steps rather than dramatic leaps.",
  "chapters": {
   "wealth": {
    "heading": "Wealth: focus that can pay off",
    "body": "In 2027, money matters may respond well to clear decisions, active follow-through, and a willingness to take the lead. Because the year’s fire energy is something you can direct, the theme here is less about waiting and more about steering: you may notice opportunities when you define what you want, set a boundary, and keep your attention on one lane. The caution is simple too much appetite can blur the result.\n\nIn daily life, this can look like choosing the more practical option instead of the flashier one, or noticing that a side project gets better results when you keep it tidy. Midyear, especially around June and July, the atmosphere may feel good for pushing a goal forward, but only if you keep checking the details instead of assuming speed equals success. A small overcommitment could make the month feel heavier than it needs to be.\n\nA useful start is to pick one priority area for each quarter and give it a simple rule: one budget, one deadline, one review. That kind of structure fits your Order pattern well and helps the year’s fire stay useful rather than scattered."
   },
   "love": {
    "heading": "Relationships: warmth with a few honest edges",
    "body": "In 2027, your relationship life may feel warmer, more visible, and a little more reactive than usual. The early months can feel easy to be around: familiar chemistry, easy conversation, and less pressure to perform. As the year moves on, the tone may ask for more patience, especially when your pace and someone else’s pace do not match neatly.\n\nYou might notice this in small scenes: a message that lands better when you answer after a pause, a plan that works only after one more round of checking, or a conversation that opens up once you stop trying to make it perfect. August and November stand out as months where interactions may shift more suddenly, either because of a misunderstanding or because a change in setting brings a new angle into view. That does not need to be dramatic; it just asks for a slower, clearer read.\n\nTry leading with plain words and leaving a little room for the other person to catch up. In 2027, warmth tends to work best when it is paired with timing, not pressure."
   },
   "career": {
    "heading": "Career: useful momentum, then a reset",
    "body": "Career-wise, 2027 looks like a year where your ability to produce, present, and direct energy can become especially noticeable. The middle of the year may be the most active stretch: June and July can support initiative, visibility, and a stronger sense of ownership. Because the year’s fire is something you can control, it favors leadership that is measured rather than forceful.\n\nIn practical terms, this could show up as being asked to take charge of a task, refine a presentation, or turn an idea into something concrete. Later in the year, around August and September, the atmosphere shifts toward pressure and responsibility, which can be useful if you slow down just enough to avoid reacting too quickly. Then October and November may bring support, learning, or a helpful change of pace that lets you recover your footing.\n\nA good strategy is to build in review points before you reach the point of strain. If you keep your process clean, 2027 can reward you for being reliable, not just fast."
   },
   "study": {
    "heading": "Learning: steady gains through structure",
    "body": "In 2027, learning may work best when it has shape, deadlines, and visible milestones. Your Dew · Order pattern tends to like clarity, and your strong Earth and Metal mix often supports systems, categorization, and practical thinking. That means the year can be excellent for learning that is applied, organized, and easy to verify step by step.\n\nYou may notice that you retain more when a topic is broken into small units, or when you can immediately use what you’ve learned. In the earlier part of the year, the familiar fire tone may help you feel motivated; later, the supportive months from October onward may feel better for review, correction, and consolidation. If you try to absorb too much at once, the material may blur; if you keep it arranged, it can stick.\n\nStart with a simple study rhythm: one topic, one note system, one weekly recap. Jordan, that kind of structure matches your year unusually well and can turn effort into visible progress."
   },
   "health": {
    "heading": "Body and mind: keep the pace breathable",
    "body": "For 2027, the main theme for your body and mind is pacing. The year carries enough fire to make you want to do more, but your chart’s balance suggests that order and consistency will matter more than intensity. When your schedule is clean and your transitions are smooth, you may feel more rested and mentally clear.\n\nIn everyday life, this can mean that a packed day feels fine until the boundaries disappear, or that you feel best when meals, sleep, and work time are not all competing at once. The quieter months later in the year may be especially helpful for resetting your rhythm, while the more active middle months may ask you to notice when enthusiasm starts turning into overextension. A little spacing can make the whole year feel easier to inhabit.\n\nA good approach is to protect one small daily anchor, such as a regular wake-up window, a short walk, or a screen-free pause before bed. Keep it simple enough that you can repeat it even when the year gets busy."
   }
  },
  "months": [
   {
    "headline": "February: easy ignition",
    "body": "The first month feels familiar and comfortable, with the year’s energy matching your own rhythm. It may not bring a lot of new stimulation, but it can help you settle in and notice what already works. Stay open to small surprises rather than chasing a big breakthrough."
   },
   {
    "headline": "March: soft beginning",
    "body": "March carries a fresh-start feeling, though it can also bring a little friction. Something may begin simply, then ask for a bit more patience than expected. If you let the pace stay human, the month can unfold more smoothly."
   },
   {
    "headline": "April: output rises",
    "body": "April leans toward expression, production, and giving more of yourself to what you are building. The energy can be generous, but it may also use up more of your reserves than you first expect. Choose what deserves your best effort."
   },
   {
    "headline": "May: ideas take shape",
    "body": "May feels like a month of forming, preparing, and letting something develop beneath the surface. It can be a good time for quiet progress and careful setup. Let things mature a little before you demand results."
   },
   {
    "headline": "June: lead with care",
    "body": "June brings a stronger sense of control and momentum, especially around money or results. This is a good window for taking initiative, as long as you do not push past what is realistic. The more precise you are, the better it can go."
   },
   {
    "headline": "July: hold the gain",
    "body": "July has a quieter, stored-up feel, almost like the energy is waiting behind the scenes. It may be better for preserving progress than forcing a new move. Give unfinished matters a little room to settle before you act again."
   },
   {
    "headline": "August: read twice",
    "body": "August asks for extra care because responsibility rises while the atmosphere can be easy to misread. A small misunderstanding may matter more than usual if you rush past it. Double-checking a message or plan can save you time later."
   },
   {
    "headline": "September: firm boundaries",
    "body": "September feels more serious and structured, with pressure that can sharpen your focus if you handle it calmly. The month favors clear authority and clean decisions, but not rigidity. Stay firm without becoming tense."
   },
   {
    "headline": "October: support arrives",
    "body": "October brings a gentler current, with help, learning, or recovery becoming easier to access. It may feel like the pace finally softens enough for you to breathe again. Use the opening to restore your energy and sharpen your tools."
   },
   {
    "headline": "November: sudden turn",
    "body": "November can move quickly and unexpectedly, with a push to get moving or change direction. Because the month also carries a clash-like tension, plans may shift faster than you intended. Flexibility will serve you better than insisting on one fixed route."
   },
   {
    "headline": "December: familiar ground",
    "body": "December returns to a more comfortable, recognizable tone. The month may feel calm on the surface, though small hiccups can still appear if you assume too much. Keep your routine tidy and the month should feel easy to navigate."
   },
   {
    "headline": "January: inward rhythm",
    "body": "January closes the cycle with a quieter, more private mood. It can be a good time for reflection, planning, and noticing what you want to carry forward. Let the month stay gentle, and it can prepare you well for the next round."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: build the frame",
    "body": "Watch for the early-year comfort that can make you underestimate how much structure you need. Choose one visible system for your work or daily life, and keep it simple enough to maintain without strain."
   },
   {
    "title": "May to July: steer the middle burn",
    "body": "Notice where your energy starts turning into output, especially around June and July. Pick one goal that can benefit from your initiative, and give it clear checkpoints so momentum stays useful instead of becoming scattered."
   },
   {
    "title": "August to October: slow the read, then recover",
    "body": "Pay attention to moments when pressure or misunderstanding could distort a decision. When that happens, pause, verify, and then use October’s softer support to reset your pace and restore confidence."
   },
   {
    "title": "November to January: move with the turn",
    "body": "Expect the late-year mood to shift quickly, then soften again into reflection. Keep your plans flexible, let one change lead to the next, and use the quieter closing weeks to organize what you want to continue."
   }
  ],
  "closing": "From age 31 to 40, your 10-year cycle enters a fire-strong phase, and that marks a real turning of the page from the quieter groundwork of earlier years. In 2027, that larger current is already visible in small ways: more drive, more visibility, and a stronger need to choose your moves carefully rather than quickly. If you keep your pace clear and your priorities simple, the year can feel both productive and manageable."
 },
 "mia": {
  "year": 2027,
  "title": "2027, sharpened and steady",
  "subtitle": "A year that asks for pace, proof, and careful strength",
  "overview": "In 2027, your chart meets a Fire year in a way that feels like training rather than ease. For you, Mia, that can mean more responsibility, more visible output, and more moments where you are asked to prove what you can carry. With your Day Master in Metal, and with Wood already strong in your Five Elements balance, the year may feel lively and demanding at once: there is plenty to work with, but the key is to choose your speed instead of matching every outside push.\n\nYour Steel · Harvest type suggests that you do well when effort has a clear shape, and 2027 supports that lesson. The year’s momentum can help you refine your edges, especially when you keep your attention on what is worth finishing, what is worth sharing, and what is worth leaving alone. The middle of the year looks more pressure-heavy, while late summer and early autumn can feel more supportive, almost like breathing room returning through people, learning, and practical help.\n\nBecause the year carries a wildcard quality, small surprises may appear in timing, tone, or other people’s reactions. That does not have to mean chaos; it simply means you may feel better when you leave a little space in your plans. If you let the year teach you pacing, 2027 can become less about forcing results and more about becoming sturdier while you move.",
  "chapters": {
   "wealth": {
    "heading": "Money wants shape",
    "body": "In 2027, money matters are less about chasing more and more about directing energy with purpose. Because the year pushes you toward action and output, it can be easier to earn through visible effort, practical delivery, or work that others can clearly see and value. The main lesson is not to overextend just because opportunities look active.\n\nYou may notice moments when spending, pricing, or commitments feel tied to momentum rather than reflection. That could show up as agreeing too quickly, taking on one more task than planned, or feeling tempted to match someone else’s pace. A steadier approach may suit you better: write things down, compare options, and give yourself one extra check before saying yes.\n\nA small habit can help a lot here. Try separating “useful spending” from “reactive spending,” even in a simple note on your phone, so your energy goes where it really supports you. In a Fire year, your Metal nature tends to do best when money is handled like a tool, not a mood."
   },
   "love": {
    "heading": "Warmth with boundaries",
    "body": "Relationships in 2027 may feel more active, more direct, and sometimes a little more sensitive to timing. Because the year asks you to show more of yourself, people around you may notice your words, effort, and presence more clearly. That can deepen connection, but it can also make mixed signals or rushed reactions more visible.\n\nYou might find yourself in situations where plans change quickly, conversations turn sharper than expected, or attraction grows through shared activity rather than slow buildup. Mia, this is a good year to let honesty stay simple. You don’t need to perform warmth; you may do better by being clear, responsive, and selective about where your energy goes.\n\nIf something feels slightly off, a small pause can be kinder than forcing the moment. Ask one more question, leave a little breathing room between messages, or meet people in settings that feel natural rather than pressured. The year’s active tone can support closeness when it is given room to breathe."
   },
   "career": {
    "heading": "Pressure can refine you",
    "body": "Career matters in 2027 look especially active, because the year encourages output, accountability, and visible contribution. This can be a strong year for taking on work that needs structure, finishing power, or clear standards. The pressure may rise, but so can your sense of competence when you choose what deserves your full attention.\n\nDaily life may bring sharper deadlines, more requests for updates, or situations where your judgment is tested in public. Since your chart has a strong Wood presence, there may be many directions calling at once, but your Metal nature tends to shine when you cut through noise and define the real priority. It may help to make decisions in layers: what must be done now, what can wait, and what can be delegated or simplified.\n\nA practical move this year is to protect your best working hours for the tasks that need precision. If you try to answer every demand immediately, the year can feel scattered; if you build a clear sequence, it can feel powerful. 2027 rewards clean edges, not constant urgency."
   },
   "study": {
    "heading": "Learning through use",
    "body": "Learning in 2027 may work best when it is tied to something you are actively making, solving, or improving. Because the year leans toward production and expression, study can feel most alive when it has a real-world shape. Reading, practice, and feedback may all stick better when they connect to a concrete goal.\n\nYou might notice that passive learning feels less satisfying than usual, while hands-on work, short experiments, or direct teaching from others feels easier to absorb. There can also be a benefit in revisiting basics, since a strong year of action can sometimes expose where foundations need tightening. That is not a setback; it is often how your skill becomes more dependable.\n\nTry learning in short, repeatable loops: read, test, review. If a topic feels big, break it into one small section and one immediate application. Your Steel · Harvest type tends to respond well to learning that produces something tangible, even if the result is modest at first."
   },
   "health": {
    "heading": "Keep your rhythm clean",
    "body": "For body and mind, 2027 asks for rhythm more than intensity. The year’s Fire can make life feel faster and busier, so your system may appreciate consistent meals, clear sleep windows, and moments with fewer inputs. This is less about perfection and more about keeping your pace from getting frayed.\n\nYou may feel the effects of overcommitment more quickly when your schedule is crowded with people, errands, and unfinished tasks. That can show up as mental clutter, restlessness, or a sense that your energy is leaking into too many places at once. A calmer routine, even a simple one, may help you stay sharper and more present.\n\nChoose one anchor you can keep almost every day, such as a walk after work, a quiet morning start, or a fixed time to stop checking messages. In a year with a wildcard edge, a dependable rhythm can do more for you than heroic effort. Gentle consistency is likely to serve you well."
   }
  },
  "months": [
   {
    "headline": "A sharp reset",
    "body": "February around 2027 feels like a restart that also stirs movement around you. Because the month connects with a change-making tension, plans may shift quickly, and your energy may go toward helping, producing, or responding on the fly. It’s a good month to stay flexible rather than overly attached to the first version of a plan."
   },
   {
    "headline": "Small sparks",
    "body": "March around 2027 leans into beginnings that are still forming, so progress may feel quiet but meaningful. Small hiccups can appear, but they may also help you notice what needs a little more care before it grows. If you keep your standards simple, the month can become more useful than dramatic."
   },
   {
    "headline": "Drive with limits",
    "body": "April around 2027 supports initiative, money matters, and visible results. The challenge is that the more you push, the easier it is to overdo it, so a measured pace may work better than a full sprint. This month responds well to clear targets and a firm sense of enough."
   },
   {
    "headline": "A lucky fit",
    "body": "May around 2027 brings a sense of things clicking into place, especially through connections that feel naturally aligned. Unexpected turns may still show up, but some of them can open doors you didn’t plan for. Letting one good opportunity stay simple may be wiser than trying to force it into a bigger shape."
   },
   {
    "headline": "Pressure builds",
    "body": "June around 2027 turns the heat up in a way that asks for discipline. The work may feel heavier, and friction can appear in schedules, conversations, or expectations, so pacing becomes important. If you can slow down just enough to choose your next move carefully, the month may feel much steadier."
   },
   {
    "headline": "Momentum tests",
    "body": "July around 2027 carries strong forward motion, but the energy can be unpredictable. That wild-card feeling may make the month exciting one day and demanding the next, so it helps to keep your plans slightly elastic. You may do best when you treat surprises as signals to adjust, not as reasons to panic."
   },
   {
    "headline": "Help arrives",
    "body": "August around 2027 feels more supportive, with help, learning, and recovery coming in more easily. Fresh ground can make familiar things feel new again, which is useful if you’ve been carrying a lot since early summer. This is a good month to accept guidance without overexplaining why you need it."
   },
   {
    "headline": "Pull and support",
    "body": "September around 2027 can bring a stronger sense of being noticed, supported, or drawn toward helpful people and useful chances. The energy feels fuller here, so what you’ve been building may start to respond more clearly. If you stay open to collaboration, the month may become one of the most nourishing in the year."
   },
   {
    "headline": "Easy flow",
    "body": "October around 2027 feels familiar and comfortable, almost like settling into a known rhythm. Because the pace eases, there may be less novelty, but also less friction, which can be a relief after the busier middle months. It’s a good time to organize, tidy, and enjoy what already works."
   },
   {
    "headline": "Read carefully",
    "body": "November around 2027 stays calm on the surface, but mixed signals may be easier to misread. The month is less about bold moves and more about paying attention to tone, timing, and what is left unsaid. If you give conversations a little extra space, you may avoid unnecessary confusion."
   },
   {
    "headline": "Quiet authority",
    "body": "December around 2027 brings a sense of gathering your strength and using it with more intention. There may be more chances to direct, organize, or set the tone, but the work can still be tiring if you try to carry everything yourself. A measured, tidy finish may feel better than a dramatic push."
   },
   {
    "headline": "Stored progress",
    "body": "January around 2028 feels like things are being tucked in, saved, and prepared for the next round. Advancement is present, but it may come through quiet consolidation rather than obvious leaps. This is a good month to keep your commitments clean and let your effort settle into place."
   }
  ],
  "action_plan": [
   {
    "title": "2–4 months: set the pace",
    "body": "Watch for quick shifts, rising output, and the temptation to say yes too fast. Try making a short daily priority list with only three items, so your energy goes into what truly matters."
   },
   {
    "title": "5–7 months: protect your center",
    "body": "Notice where pressure, friction, or sudden turns start to crowd your attention. Choose one boundary in advance, such as a reply window or a work cutoff time, and keep it steady."
   },
   {
    "title": "8–10 months: receive and refine",
    "body": "Pay attention to help, learning, and smoother cooperation as they arrive. Accept one form of support without overcomplicating it, and use the calmer stretch to improve a system you already rely on."
   },
   {
    "title": "11 months–next January: close cleanly",
    "body": "Watch for mixed signals, quieter authority, and the urge to finish everything at once. Pick one area to tidy up, then end the year by preserving what is working instead of forcing a grand finish."
   }
  ],
  "closing": "From age 33 to 42, the Water phase is the next major 10-year cycle, and it marks a real shift in the background current of your life. In 2027, though, the focus stays on a Fire year that trains you through pressure, visibility, and the choice to move at a pace you can actually hold.\n\nIf you let the year sharpen your priorities instead of scattering them, 2027 can leave you feeling more capable, more deliberate, and more at ease with your own rhythm. Mia, this is a year for learning how strong you already are without needing to prove it every minute."
 },
 "sam": {
  "year": 2027,
  "title": "2027, your steady spark",
  "subtitle": "A year that fills, trains, and reorders your pace",
  "overview": "In 2027, the Fire of the year meets your Earth nature in a way that tends to nourish rather than drain. For a Mountain-type, Order-oriented person with a balanced spread of the Five Elements and no Fire of your own, this can feel like a year of being warmed from the outside: support, learning, and recovery are easier to receive when you stay open to them.\n\nThe pace is not flat. Early in the year, you may feel more able to push for results and take the lead, while spring asks for more discipline and a little patience with pressure. By midyear, the tone softens and becomes more receptive, then late summer and autumn settle into familiar ground before turning toward expression, output, and visible contribution. Sam, this looks like a year to work with timing rather than force it.\n\nBecause the year’s energy is a helping one, small choices can matter more than dramatic moves. When you simplify your schedule, check details twice, and leave room for rest between stretches of effort, the year can feel surprisingly generous. It is less about proving yourself and more about letting the right support reach you at the right time.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best with a clear hand",
    "body": "In 2027, money themes look more active when you take the lead, set a price, or decide what deserves your attention. Because the year can support your drive to shape results, this is a good time to favor clarity, initiative, and practical follow-through over vague hopes. The caution is simple: when the energy is generous, it can also tempt you to push a little too hard.\n\nYou might notice moments when a project feels ready to be named, packaged, or turned into something more concrete. A conversation about payment, a side task that starts to feel worthwhile, or a chance to organize your resources may come into focus. Since your Earth nature likes structure, you may feel more comfortable once numbers and priorities are visible.\n\nStart small by choosing one money-related decision to clean up, one to advance, and one to leave alone. If you keep the plan simple and check the details before you commit, the year’s momentum can work in your favor without becoming noisy."
   },
   "love": {
    "heading": "Relationships warm up by being real",
    "body": "In 2027, your relationships are likely to feel most comfortable when they are rooted in sincerity, timing, and simple care. The middle of the year especially can bring a sense of being supported or understood, which may make it easier to let people see the steadier parts of you. Because your chart leans toward order, you may prefer relationships that are clear rather than overly dramatic.\n\nYou might find that certain conversations go better when you do not rush to explain everything at once. A shared meal, a calm check-in, or a practical offer of help could matter more than a big declaration. If something feels slightly tangled in early summer, the answer may be to slow the pace and let the connection breathe.\n\nTry one small act of warmth that does not demand an immediate response. A message, an invitation, or a thoughtful follow-up can open space without pressure, and that tends to suit the year’s gentler middle stretch."
   },
   "career": {
    "heading": "Work moves through pressure into shape",
    "body": "In 2027, your work life looks like a story of early initiative, a spring test, and a clearer rhythm later on. The year can support you in building results, but it also asks for measured pacing when responsibility rises. For a Mountain-type person, this often works best when you keep your standards high and your movements deliberate.\n\nYou may notice that some tasks ask for more structure than usual, especially from April through May. That can feel demanding, yet it also has a shaping effect: the more carefully you choose your steps, the more solid the outcome can become. Later in the year, your output may become more visible, which suits a person whose Earth nature likes to create something dependable.\n\nA good approach is to separate what must be done from what merely looks urgent. If you keep your calendar clean, confirm expectations early, and leave room for revision, the year’s pressure can turn into competence rather than noise."
   },
   "study": {
    "heading": "Learning lands when you let it settle",
    "body": "In 2027, learning looks especially fruitful when it is practical, applied, and tied to real life. The year’s supportive tone can make it easier to absorb guidance, recover confidence, and refine skills you already have. Because your Five Elements are balanced overall, you may learn best when study is neither too abstract nor too chaotic.\n\nYou might feel more receptive to mentors, references, and structured methods, especially in the middle of the year when the atmosphere becomes more replenishing. Later, when the energy turns toward expression, it can be useful to show what you know rather than keep collecting information. That shift may help your knowledge feel alive instead of stored away.\n\nChoose one subject to revisit in small, regular pieces. A short lesson, a note-taking habit, or a weekly review can make the year’s learning feel calm and cumulative, which suits your Order-oriented nature very well."
   },
   "health": {
    "heading": "Protect your rhythm, not just your energy",
    "body": "In 2027, your well-being is best supported by rhythm, pacing, and enough room between demands. The year’s help-giving quality may make it easier to recover from busy stretches, but it also works best when you do not crowd every hour. Because your chart leans toward steadiness, your body and mind may respond well to routines that are simple and repeatable.\n\nYou might notice that spring asks more of your attention, while midyear and late summer invite you to release some tension. That does not mean doing less in a dramatic way; it means giving yourself cleaner transitions between work, rest, and social time. A tidy environment and a predictable schedule can feel especially comforting for an Order-oriented nature.\n\nTry starting with one stable anchor: a consistent morning, a calmer evening, or a short reset between tasks. If you keep the pace humane, the year can feel less like strain and more like being carried by a steady current."
   }
  },
  "months": [
   {
    "headline": "Quick start",
    "body": "February leans toward momentum, and the year’s energy supports you in taking charge. It can be a useful month for starting something that needs initiative, as long as you keep an eye on excess enthusiasm."
   },
   {
    "headline": "Refine the push",
    "body": "March brings a fresh reset, but with a few small bumps along the way. A practical adjustment, a tighter budget, or a cleaner plan may help you turn effort into something more stable."
   },
   {
    "headline": "Pressure with purpose",
    "body": "April asks for discipline, and the work may feel more serious than casual. If you pick your speed wisely, the month can strengthen your footing instead of wearing you down."
   },
   {
    "headline": "Unexpected turns",
    "body": "May can bring surprises in the middle of effort. Flexibility will serve you better than rigid plans, especially if responsibilities shift shape."
   },
   {
    "headline": "Recovery under strain",
    "body": "June has a replenishing quality, but with a little friction in the background. Support is available, yet it may arrive through change rather than comfort, so stay adaptable."
   },
   {
    "headline": "Ease in",
    "body": "July feels naturally supportive, with a little room for rest and recovery. A relaxed conversation or an easy reunion may land well because the atmosphere is less demanding."
   },
   {
    "headline": "Fresh ground",
    "body": "August introduces a lighter, newer feeling. If you try something unfamiliar, the month may reward curiosity more than perfection."
   },
   {
    "headline": "Tidy and attract",
    "body": "September has a magnetic quality, which can help useful ideas or teachers find you. Organizing what you already know may make new insights easier to spot."
   },
   {
    "headline": "Quiet output",
    "body": "October turns the focus toward expression and contribution. You may feel more inclined to produce, share, or give, and that can be rewarding if you budget your energy carefully."
   },
   {
    "headline": "Reset the message",
    "body": "November can bring a few misunderstood moments, so it helps to speak plainly and confirm what matters. Clear wording may save you from unnecessary backtracking."
   },
   {
    "headline": "Solid footing",
    "body": "December returns to a strong, directive tone, so results may respond well to clear intent. This is a good time to steer resources with confidence, while still resisting the urge to overextend."
   },
   {
    "headline": "A joined-up start",
    "body": "January brings an easy fit, as if things can connect without much friction. If you let a conversation unfold naturally, the month may feel more intimate than expected."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: shape the push",
    "body": "Watch for a rise in initiative, then a rise in pressure. A good action is to choose one priority, define the finish line clearly, and keep a small buffer for corrections."
   },
   {
    "title": "May to July: let support in",
    "body": "Watch for changeable demands followed by a more replenishing stretch. A good action is to simplify your calendar and make one regular habit that helps you recover between tasks."
   },
   {
    "title": "August to October: turn comfort into output",
    "body": "Watch for familiar rhythms becoming ready for expression. A good action is to share one piece of work, one idea, or one helpful gesture without polishing it forever."
   },
   {
    "title": "November to January: clear, reset, begin",
    "body": "Watch for mixed signals, then a stronger opening at the turn of the year. A good action is to confirm plans in writing, tidy loose ends, and start January with one well-defined commitment."
   }
  ],
  "closing": "From age 40 to 49, a stronger Earth cycle begins, and that marks a real shift into a more grounded chapter. In 2027, you are still in the phase of receiving help, learning, and finding the right pace, so the year works best when you let support arrive without forcing it.\n\nIf you treat 2027 as a year of steady shaping rather than dramatic proof, you may feel how naturally your Mountain side responds to structure. Keep the steps simple, stay open to useful help, and let the year warm you into a clearer rhythm."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, tu ritmo en foco",
  "subtitle": "Un año para avanzar con orden, brillo y medida",
  "overview": "En 2027, tu agua interior se encuentra con un fuego que puedes conducir mejor que otros impulsos. Eso suele traer una mezcla interesante: más iniciativa, más deseo de hacer que las cosas rindan y una sensación de tener margen para mover recursos, ideas y resultados. Con una distribución de Cinco Elementos de tierra 38%, fuego 25%, agua 25%, madera 13% y metal 0%, el año puede sentirse como una invitación a usar lo que ya sabes organizar, sin perder flexibilidad ni apurarte más de la cuenta.\n\nEl tono general de 2027 no apunta a improvisar sin rumbo, sino a elegir bien dónde poner energía. Hay meses de comodidad conocida, otros de producción visible, y algunos en los que conviene bajar un poco la velocidad para ordenar, escuchar y revisar detalles. La clave no parece ser hacer más por hacer, sino sostener un ritmo claro: cuando te apoyas en tu orden natural, el fuego del año puede volverse impulso útil en lugar de exceso.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso firme",
    "body": "En 2027, el dinero y los recursos se ven ligados a tu capacidad de tomar la iniciativa sin perder medida. Como el año te favorece para conducir la energía, puede aparecer una sensación de mayor control sobre lo que entra, lo que sale y lo que decides priorizar. La ausencia de metal en tu mapa sugiere que te conviene cuidar especialmente los límites, los números y la revisión fina de cada decisión: no por desconfianza, sino para que el impulso no se vuelva exceso.\n\nEn la práctica, esto puede notarse en momentos en que quieras avanzar rápido con compras, proyectos o acuerdos, pero una segunda mirada te ahorre tensiones. También puede pasar que veas con más claridad qué te da retorno real y qué solo ocupa espacio. Si empiezas por anotar, comparar y separar lo urgente de lo importante, el año se vuelve más amable con tu bolsillo y con tu tranquilidad.\n\nUn paso pequeño y útil sería revisar una vez por semana tus movimientos de dinero y dejar por escrito una prioridad concreta. Así conviertes la energía de 2027 en dirección, no en prisa."
   },
   "love": {
    "heading": "Vínculos que piden tacto",
    "body": "En el terreno afectivo, 2027 favorece los vínculos que entienden tu ritmo y respetan tu forma de ordenar lo importante. Tu tipo de mapa, asociado a la claridad y al orden, suele llevarte a valorar la coherencia; por eso, cuando el entorno se acelera, puedes preferir conversaciones directas y gestos simples antes que mucha intensidad. El año no parece pedir dramatismo, sino presencia y buen criterio para distinguir cercanía real de ruido.\n\nEn lo cotidiano, eso puede verse en reuniones donde hablas menos pero con más precisión, o en encuentros donde notas enseguida quién suma calma y quién te empuja a ir demasiado rápido. También puede haber momentos en que te convenga aclarar malentendidos con palabras breves y concretas, sobre todo en los meses más sensibles. Si algo no encaja, nombrarlo con suavidad suele abrir más puertas que insistir.\n\nTe ayudará empezar por una frase clara, una escucha más larga de lo habitual y un límite amable cuando haga falta. Con ese tono, tus vínculos pueden sentirse más honestos y menos agotadores."
   },
   "career": {
    "heading": "Trabajo con más mando",
    "body": "En trabajo y carrera, 2027 se ve como un año en el que puedes tomar más mando sobre resultados, tiempos y prioridades. Como la energía del año está de tu lado para empujar logros, hay margen para mostrar capacidad, ordenar procesos y convertir esfuerzo en algo visible. Al mismo tiempo, tu base de tierra fuerte pide estructura: si repartes bien la carga, el avance se siente sólido y no forzado.\n\nUn escenario posible es que te encuentres con tareas donde tu criterio valga más que la velocidad, o con proyectos en los que tu forma de organizar marque una diferencia clara. También puede aparecer más exposición: reconocimiento, liderazgo o más ojos puestos en lo que haces. Si eso sucede, te conviene no responder solo con intensidad, sino con método, porque ahí está tu ventaja real.\n\nUn buen comienzo sería elegir una meta concreta por mes y dividirla en pasos pequeños. Cuando haces visible tu orden, 2027 tiende a premiar la constancia más que el ruido."
   },
   "study": {
    "heading": "Aprender con estructura",
    "body": "En estudios y aprendizaje, 2027 favorece lo que se puede practicar, afinar y aplicar con paciencia. Tu mapa tiene una base de orden muy marcada, así que los temas que requieren secuencia, método y repetición pueden encajar bien contigo. Además, el fuego del año anima a mostrar lo aprendido, no solo a acumularlo, por lo que estudiar con salida práctica puede resultarte especialmente productivo.\n\nEn la vida diaria, esto puede parecerse a retomar un curso, profundizar en una habilidad o traducir ideas sueltas en algo útil y visible. También podrías notar que aprendes mejor cuando haces pausas cortas y luego vuelves con una intención clara. Si te dispersas, no parece falta de capacidad; más bien conviene volver al orden básico y reducir el ruido alrededor.\n\nPara empezar, elige un tema central y trabaja con bloques cortos, medibles y repetibles. Así tu aprendizaje gana forma sin pedirte más energía de la necesaria."
   },
   "health": {
    "heading": "Ritmo, pausa y centro",
    "body": "En cuerpo y mente, 2027 pide regularidad antes que exceso. Como el año empuja bastante la acción y tu mapa ya trae mucha tierra, te puede sentar bien sostener ritmos simples: dormir a horas parecidas, alternar actividad y descanso, y reservar momentos de silencio para no vivir siempre en modo respuesta. La idea no es frenar tu impulso, sino darle un cauce que no te vacíe.\n\nEn lo cotidiano, esto puede verse en días muy productivos seguidos de otros en los que notas necesidad de recogerte un poco y bajar estímulos. También puede ayudarte mucho cuidar el ambiente: menos ruido, menos interrupciones y más espacios donde puedas pensar con claridad. Cuando tu mundo interior tiene sitio, el año se vuelve más llevadero y tus decisiones salen mejor afinadas.\n\nEmpieza por una rutina mínima que sí puedas sostener: una pausa fija, una caminata breve o un cierre tranquilo al final del día. Con algo tan simple, tu energía se ordena sin forzarla."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "La cercanía con tu misma energía puede hacer que todo se sienta más familiar, aunque también más expuesto. Con emociones a flor de piel y malentendidos posibles, te conviene hablar claro y leer entre líneas con calma. Una pregunta simple puede evitar una confusión larga."
   },
   {
    "headline": "Marzo con mando",
    "body": "Aquí el mes se parece a un brote: algo empieza a asomar con fuerza propia. El liderazgo se nota en tu forma de decidir, así que es buen momento para tomar una pequeña iniciativa y sostenerla sin dudar demasiado. Si organizas el primer paso, el resto encuentra mejor sitio."
   },
   {
    "headline": "Abril visible",
    "body": "La energía se expande y te pide dar, producir o mostrar más de lo que llevas dentro. El reconocimiento puede llegar por una tarea bien hecha o por una presencia más clara de tu parte. Conviene cuidar la energía para que lo que entregas no te deje vacío."
   },
   {
    "headline": "Mayo en marcha",
    "body": "Este mes trae semilla y ganas de moverte, como si algo quisiera salir al mundo. Te favorece empezar algo pequeño, probar una ruta distinta o mover un plan que venía quieto. Si eliges un objetivo sencillo, el impulso se vuelve aliado."
   },
   {
    "headline": "Junio de control",
    "body": "La relación con el año te da más margen para dirigir, negociar y cerrar asuntos con firmeza. Aun así, los pequeños contratiempos piden revisar detalles antes de apretar demasiado. Si afinas la estrategia, el avance se siente más limpio."
   },
   {
    "headline": "Julio interior",
    "body": "La pausa se vuelve valiosa y el foco se recoge hacia dentro. El mundo interior gana peso, así que puede ser un mes muy bueno para pensar, revisar y decidir sin ruido. Si no fuerzas la salida, encuentras respuestas más serenas."
   },
   {
    "headline": "Agosto exigente",
    "body": "Aquí la energía te pide ordenar recursos y sostener responsabilidades con más atención. La mejor versión del mes aparece cuando eliges un ritmo medido y no intentas resolver todo a la vez. Un ajuste práctico puede ahorrarte más desgaste que un esfuerzo grande."
   },
   {
    "headline": "Septiembre de giro",
    "body": "La tensión se mueve y puede empujarte a cambiar de postura o de plan. El cruce con tu base hace que algunas cosas no sigan igual, y eso puede abrir una transición útil si no te apresuras. Escuchar tu cuerpo y tus límites te ayudará a responder mejor."
   },
   {
    "headline": "Octubre que nutre",
    "body": "El mes trae ayuda, aprendizaje y una sensación de alivio más clara. Como la energía se enlaza de forma favorable con tu base, pueden aparecer apoyos inesperados o una idea que te ordena por dentro. Si recibes antes de exigir, todo fluye con más naturalidad."
   },
   {
    "headline": "Noviembre amplio",
    "body": "La plenitud del mes puede sentirse como espacio mental y más aire para entender lo que pasa. Los imprevistos piden flexibilidad, pero no necesariamente prisa. Si dejas margen en la agenda, te será más fácil adaptarte sin perder centro."
   },
   {
    "headline": "Diciembre magnético",
    "body": "Vuelves a una energía más parecida a la tuya, con fruto del esfuerzo y cierta capacidad de atraer apoyos o miradas. Es un mes bueno para cerrar con orden y reconocer lo que sí construiste. Si no te exiges perfección, puedes terminar el tramo con satisfacción tranquila."
   },
   {
    "headline": "Enero paciente",
    "body": "El inicio de 2028 se siente confiado y con menos prisa por demostrar. La espera no se vive vacía, sino como un tiempo que madura lo hecho antes. Te conviene sostener lo ya iniciado y dejar que tome forma sin empujarlo demasiado."
   }
  ],
  "action_plan": [
   {
    "title": "2 a 4 meses: ordenar la base",
    "body": "Observa cómo se mezclan la familiaridad y la sensibilidad en los primeros meses. Te servirá poner orden en una sola prioridad por semana, revisar malentendidos rápido y anotar lo que te da energía de verdad."
   },
   {
    "title": "5 a 7 meses: empujar con medida",
    "body": "Entre mayo y julio, mira dónde puedes producir más sin vaciarte. Prueba una iniciativa pequeña, concreta y visible, y acompáñala con pausas para que el impulso no se vuelva exceso."
   },
   {
    "title": "8 a 10 meses: afinar y recibir",
    "body": "De agosto a octubre, vigila la carga y la forma en que respondes a las tensiones. Haz una revisión de recursos, acepta ayuda cuando aparezca y reserva un espacio fijo para pensar con calma."
   },
   {
    "title": "11 a 1 meses: cerrar con claridad",
    "body": "De noviembre a enero, observa qué fruto dejó tu esfuerzo y qué necesita seguir madurando. Elige una forma simple de cierre —una lista, una conversación o una revisión breve— para entrar en el siguiente tramo con más orden."
   }
  ],
  "closing": "A los 38 años, tu ciclo de diez años entra en una etapa en la que el fuego gana fuerza y el paisaje cambia de tono con más claridad. En 2027, eso se siente como un año para conducir mejor lo que ya sabes hacer: con más dirección, más criterio y menos ruido alrededor. Si cuidas el ritmo, Lucía, el año puede dejarte una sensación muy valiosa de orden con movimiento."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027, 지수님의 리듬을 읽는 해",
  "subtitle": "채워짐과 발산이 번갈아 오는 한 해",
  "overview": "지수님, 2027년은 에너지가 한 방향으로만 흐르기보다 들어오고, 나가고, 다시 정리되는 리듬이 분명한 해로 보입니다. 중심 기운이 목이고, 토의 비중이 높은 편이라서 원래도 버티고 쌓는 힘이 좋은데, 2027년의 화 기운은 그 안에 있던 생각과 준비를 밖으로 드러내게 만들기 쉬워요. 그래서 말, 결과물, 역할, 책임이 늘어나며 성취의 손맛도 함께 커질 수 있습니다.\n\n다만 이 해는 지수님이 기운을 키워 주는 자리도 있고, 다스리는 자리도 있고, 단련하는 자리도 섞여 있어요. 특히 6~9월경에는 표현과 생산이 늘면서 에너지가 많이 쓰이기 쉬우니, 많이 하는 것보다 무엇을 남길지 고르는 감각이 중요합니다. 반대로 2~3월과 12월~1월에는 도움과 회복이 들어오기 쉬워서, 다시 힘을 채우고 방향을 조정하기에 좋습니다.",
  "chapters": {
   "wealth": {
    "heading": "성과를 수확하는 감각",
    "body": "2027년의 재물 흐름은 ‘더 벌기 위한 무리한 확장’보다 ‘내가 쥘 수 있는 성과를 선명하게 만드는 방식’에 잘 맞습니다. 지수님의 사주 유형이 거목·성취 쪽이라, 한 번 방향이 잡히면 오래 키워 가는 힘이 있는데, 이 해에는 그 힘이 실제 결과나 보상으로 연결되기 쉬워요.\n\n일상에서는 8~9월경처럼 주도권이 살아나는 때에 제안, 협상, 정리, 정산 같은 일이 자주 눈에 띌 수 있습니다. 반대로 6~7월경에는 베풂과 생산이 늘면서 돈보다 에너지가 먼저 빠져나가는 느낌이 들 수 있으니, “지금 필요한 지출인지”를 한 번 더 보는 습관이 편합니다.\n\n작게는 지출 항목을 줄이기보다 우선순위를 적어 두는 방식이 좋습니다. 지수님에게 2027년의 재물은 넓게 퍼뜨리는 것보다, 중심을 잡아 두고 성과가 남는 곳에 힘을 모을 때 더 안정적으로 읽혀요."
   },
   "love": {
    "heading": "가까워지고 멀어지는 온도",
    "body": "관계와 연애에서는 2027년이 꽤 입체적으로 느껴질 수 있습니다. 2~3월경에는 도움을 주고받는 흐름이 살아나서, 누군가와의 거리감이 부드럽게 좁혀지기 쉽고, 4월경에는 관계의 방향이 살짝 흔들리며 익숙한 패턴을 다시 보게 만들 수 있어요.\n\n실제 장면으로는 연락이 자주 오가거나, 가까운 사람과 역할이 달라지거나, 말이 빨라져 오해가 생기기보다 반응 속도를 조절해야 편한 순간이 보일 수 있습니다. 7월경에는 반안살의 기운이 있어 관계가 한층 편안해 보이지만, 편하다고 해서 설명을 줄이면 미묘한 차이가 생길 수 있으니 중요한 말은 짧게라도 또렷하게 남기는 쪽이 좋습니다.\n\n작게는 약속을 늘리기보다 질을 높여 보세요. 지수님에게 2027년의 관계는 ‘많이 만나는 것’보다 ‘서로의 리듬을 맞추는 것’에서 더 따뜻해지기 쉽습니다."
   },
   "career": {
    "heading": "보이는 일, 드러나는 힘",
    "body": "일과 커리어에서는 2027년의 화 기운이 지수님의 안에 있던 것을 밖으로 드러내는 쪽으로 작용하기 쉽습니다. 표현, 발표, 기획, 생산, 전달처럼 눈에 보이는 결과를 만드는 일에 힘이 실리기 좋아서, 조용히 준비하던 것이 드러나는 장면이 생기기 쉬워요.\n\n6~7월경에는 생산량이 늘고 역할이 커지면서 바쁘게 돌아갈 수 있고, 10~11월경에는 책임과 압박이 함께 올라오며 속도를 조절하는 감각이 중요해집니다. 이때는 ‘더 빨리’보다 ‘누락 없이’가 더 큰 차이를 만들 수 있어서, 한 번에 크게 밀기보다 단계를 나누는 방식이 잘 맞습니다.\n\n작게는 마감 전날보다 중간 점검을 한 번 더 넣어 보세요. 지수님은 2027년에 성취의 기운이 살아나기 쉬운 만큼, 결과를 키우려면 체력보다 순서를 먼저 잡는 편이 한결 편합니다."
   },
   "study": {
    "heading": "배움이 결과로 이어지는 해",
    "body": "배움에서는 2027년이 ‘받아들이는 공부’와 ‘내 것으로 바꾸는 공부’가 번갈아 들어오는 해로 보입니다. 2~3월경에는 도움과 회복이 들어와 배우기 좋은 흐름이 열리고, 12월~2028년 1월경에도 다시 정리와 흡수가 잘 되는 편이라, 앞뒤에서 공부의 숨을 고르기 좋아요.\n\n중간에는 4월경의 전환감, 8~9월경의 추진력이 강하게 들어와서, 배운 것을 바로 써 보거나 설명해 보려는 마음이 커질 수 있습니다. 지수님처럼 목의 힘이 있는 사람은 단순 암기보다 구조를 이해하고 연결하는 방식이 잘 맞는데, 토의 비중이 큰 편이라 한 번 잡은 틀을 오래 가져가는 습관도 도움이 됩니다.\n\n작게는 메모를 길게 쓰기보다 핵심 문장 세 개로 정리해 보세요. 2027년의 배움은 많이 읽는 것보다, 읽은 것을 다시 말할 수 있게 만드는 쪽에서 더 깊어질 수 있습니다."
   },
   "health": {
    "heading": "리듬을 지키는 돌봄",
    "body": "몸과 마음의 리듬은 2027년에 ‘과열과 회복’의 차이가 비교적 분명하게 느껴질 수 있습니다. 화 기운이 들어오면서 의욕과 속도는 살아나기 쉽지만, 지수님에게 원래 부족한 수의 흐름이 강하게 깔려 있지 않기 때문에, 쉬는 타이밍을 의식적으로 잡아 주는 편이 더 편안합니다.\n\n일상에서는 6~9월경에 말과 일, 약속이 늘면서 하루가 빨리 지나가는 느낌이 들 수 있고, 10~11월경에는 책임감이 올라오면서 머리가 쉽게 과밀해질 수 있어요. 이럴 때는 생활을 크게 바꾸기보다, 잠들기 전 화면 시간을 조금 줄이거나, 낮에 짧게 걷는 식의 작은 조정이 더 잘 맞습니다.\n\n작게는 하루의 시작과 끝을 비슷한 순서로 반복해 보세요. 2027년의 돌봄은 특별한 처방보다, 리듬을 일정하게 붙잡아 주는 습관에서 훨씬 힘을 얻습니다."
   }
  },
  "months": [
   {
    "headline": "2월, 회복의 문",
    "body": "이달은 이 해의 기운이 지수님을 채워 주는 쪽이라, 도움과 배움이 자연스럽게 들어오기 좋은 흐름이에요. 건록의 힘이 살아 있어 기초를 다시 세우기 편하고, 지살의 기운 덕분에 작은 이동이나 환경 변화가 새 자극이 될 수 있습니다."
   },
   {
    "headline": "3월, 붙는 인연",
    "body": "이달은 제왕의 힘이 들어와 존재감이 또렷해지기 쉬워요. 지지가 내 일지와 합하는 흐름이라 사람과 일이 잘 맞물리며, 누군가와의 관계가 한 단계 가까워지는 장면이 보일 수 있습니다."
   },
   {
    "headline": "4월, 방향 전환",
    "body": "이달은 익숙한 결이 이어지지만, 지지가 내 일지와 충하는 흐름이라 한 번쯤 방향을 다시 잡게 될 수 있어요. 쇠의 단계답게 속도보다 균형이 중요하고, 월살의 영향으로 마음이 예민해질 수 있으니 일정은 조금 여유 있게 두는 편이 좋습니다."
   },
   {
    "headline": "5월, 익숙한 속도",
    "body": "이달은 병의 단계라 에너지가 드러나지만, 새 자극은 조금 적은 편이에요. 망신살의 기운이 있어 말이 빠르게 퍼질 수 있으니, 확인되지 않은 이야기보다 직접 확인한 사실을 중심에 두면 편합니다."
   },
   {
    "headline": "6월, 많이 내는 달",
    "body": "이달은 지수님이 이 해의 기운을 키워 주는 쪽이라, 표현과 생산이 눈에 띄게 늘기 쉬워요. 사의 단계와 장성살의 기운이 겹쳐 주도적으로 움직이기 좋지만, 그만큼 에너지도 많이 쓰이니 선택과 집중이 중요합니다."
   },
   {
    "headline": "7월, 편안한 확장",
    "body": "이달은 묘의 단계와 반안살이 만나, 부드럽고 편안한 확장이 느껴지기 쉬워요. 사람을 챙기고 결과를 다듬는 데 강점이 살아나지만, 편한 분위기 속에서도 해야 할 일의 경계는 분명히 두는 편이 좋습니다."
   },
   {
    "headline": "8월, 성과를 당김",
    "body": "이달은 절의 단계라 결단이 빠르게 붙고, 역마살의 기운이 더해져 이동성과 변화가 살아나기 쉬워요. 이 해의 기운을 다스리는 흐름이라 주도권과 성과를 밀어붙이기 좋지만, 한꺼번에 너무 많은 것을 잡으려 하면 흐트러질 수 있습니다."
   },
   {
    "headline": "9월, 조율과 속도",
    "body": "이달은 태의 단계라 아직 다듬어지는 느낌이 남아 있고, 육해살의 영향으로 사소한 어긋남을 더 민감하게 느낄 수 있어요. 성과를 내고 싶다면 속도를 높이기보다 기준을 맞추는 쪽이 더 안정적입니다."
   },
   {
    "headline": "10월, 책임의 무게",
    "body": "이달은 양의 단계라 밖으로 드러나는 힘이 커지고, 화개살의 기운이 더해져 혼자 정리하고 싶은 마음도 함께 생길 수 있어요. 이 해가 지수님을 단련하는 흐름으로 들어오니, 책임을 작게 쪼개서 다루면 훨씬 덜 버겁습니다."
   },
   {
    "headline": "11월, 단단해지는 때",
    "body": "이달은 장생의 단계라 다시 이어지는 힘이 생기지만, 겁살의 기운 때문에 경계심도 함께 올라올 수 있어요. 압박을 크게 느끼기보다 우선순위를 선명하게 잡으면, 스스로를 더 단단하게 세우는 경험으로 바뀌기 쉽습니다."
   },
   {
    "headline": "12월, 채움의 복귀",
    "body": "이달은 이 해의 기운이 다시 지수님을 채워 주는 쪽이라, 도움과 회복이 들어오기 좋은 흐름이에요. 목욕의 단계답게 정리와 새로 고침이 어울리고, 재살의 기운이 있어 바깥 자극은 줄이고 안쪽 정돈을 늘리면 편합니다."
   },
   {
    "headline": "1월, 다음 장 준비",
    "body": "2028년 1월은 관대의 단계라 숨을 고르며 다음 흐름을 맞이하기 좋아요. 천살의 기운이 있어 멀리 내다보는 생각이 많아질 수 있으니, 당장 완성보다 방향을 점검하는 쪽에 시간을 쓰면 좋습니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 관계와 기준 정리",
    "body": "이 구간은 도움을 받는 흐름과 방향 전환이 함께 들어오니, 누구와 무엇을 자주 주고받는지 살펴보면 좋습니다. 해볼 행동은 연락 목록이나 협업 메모를 한 번 정리해서, 자주 맞는 사람과 다시 맞춰 보는 거예요."
   },
   {
    "title": "5~7월경: 생산과 소모의 균형",
    "body": "이 구간은 표현과 생산이 늘어나는 대신 에너지 소모도 커지기 쉬워요. 해볼 행동은 하고 싶은 일을 세 개만 남기고, 나머지는 다음 달로 미루는 기준을 미리 적어 두는 것입니다."
   },
   {
    "title": "8~10월경: 주도권 다루기",
    "body": "이 구간은 성과를 밀어붙이기 좋지만, 과욕이 섞이면 속도가 흔들릴 수 있습니다. 해볼 행동은 시작 전 체크리스트를 짧게 만들어, 결정과 실행 사이의 틈을 한 번만 더 확인하는 거예요."
   },
   {
    "title": "11월~다음해 1월경: 회복과 재정렬",
    "body": "이 구간은 책임감이 올라오면서도 다시 채워지는 흐름이 함께 들어옵니다. 해볼 행동은 하루의 시작과 끝을 비슷한 순서로 두고, 수면·식사·메모 같은 기본 리듬을 고정해 보는 것입니다."
   }
  ],
  "closing": "36세부터 45세까지 수 기운이 강해지는 시기가 이어집니다. 지금까지의 시기가 저물고 다음 장이 열리는 전환으로 읽을 수 있고, 2027년에는 그 이전의 흐름 속에서 표현과 성취가 더 선명하게 드러나기 쉬워요. 지수님에게 이 해는 많이 밀어붙이기보다, 들어오는 도움과 나가는 에너지를 잘 나누어 쓰면 한결 편안하게 지나가기 좋은 해입니다."
 },
 "casey": {
  "year": 2027,
  "title": "2027, tu ritmo de acero",
  "subtitle": "Un año para ajustar la velocidad sin perder firmeza",
  "overview": "Casey, en 2027 tu mapa entra en un año que te pide fuerza bien medida: hay empuje, presión y una sensación clara de que conviene elegir el ritmo con cuidado. Tu centro es de metal, y además tienes mucho metal y mucha madera en tu distribución, así que el año no viene a borrarte, sino a afinar tu forma de actuar: menos impulso automático y más decisión consciente.\n\nComo tu tipo es acero · cosecha, 2027 puede sentirse como un terreno donde se recoge lo trabajado, pero también donde cada paso pesa más. Habrá tramos en los que expresar, producir o dar a otros te salga con facilidad, otros en los que convenga tomar control con tacto, y momentos en los que recibir ayuda o volver a ti te siente especialmente bien. Si cuidas la velocidad, el año puede dejarte más sólido por dentro, no solo más ocupado por fuera.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con medida",
    "body": "En 2027, el dinero y los asuntos materiales se mueven mejor cuando tú marcas el paso con claridad. Hay tramos en los que te conviene empujar, negociar o buscar resultados, pero tu mapa también sugiere que el exceso de prisa puede restarle limpieza a lo que intentas construir. Con tu mezcla fuerte de metal y madera, el reto no es faltarte iniciativa, sino ordenar la ambición para que no se disperse.\n\nEn la vida diaria, esto puede verse en decisiones que parecen pequeñas pero pesan: cuánto aceptas, qué priorizas, cuándo dices que no a algo que promete mucho y pide demasiado. Tal vez notes que ciertos gastos, compromisos o proyectos se mueven mejor cuando los revisas con calma y no por reflejo. Si quieres que el dinero te rinda más, te ayudará separar lo urgente de lo realmente valioso.\n\nPrueba a avanzar con una lista breve: una meta concreta, un límite claro y una revisión semanal. Así conviertes la presión del año en orden útil, no en desgaste."
   },
   "love": {
    "heading": "Vínculos que cambian",
    "body": "En 2027, tus vínculos pueden sentirse más vivos, más directos y también más sensibles a los cambios de ritmo. Hay meses en los que das más de lo que recibes, y otros en los que te conviene dejar que el intercambio fluya sin forzarlo. Para ti, la conexión mejora cuando no intentas sostenerlo todo a la vez.\n\nEn el día a día, esto puede aparecer como conversaciones más intensas, ganas de moverte, de cambiar de ambiente o de acercarte a personas que te despiertan otra forma de estar. También puede haber momentos en los que una respuesta tardía, un malentendido pequeño o una diferencia de prioridades te pidan más paciencia que explicación. Si te relacionas desde la claridad, el año te deja ver mejor quién suma de verdad.\n\nEmpieza por escuchar antes de responder y por decir una cosa a la vez. Un vínculo se vuelve más fácil cuando no le pides que resuelva todo en una sola charla."
   },
   "career": {
    "heading": "Trabajo con pulso",
    "body": "En 2027, el trabajo y la carrera se ven empujados por una mezcla de responsabilidad y oportunidad de demostrar criterio. Hay una parte del año que te pide producir, servir o sacar adelante lo que sabes hacer; otra parte te invita a tomar iniciativa y mover resultados. Como tu mapa tiene bastante metal, puedes sostener bien la exigencia, siempre que no confundas firmeza con rigidez.\n\nEn lo cotidiano, podrías notar más tareas que dependen de ti, más ojos puestos en tu forma de responder y más necesidad de decidir qué sí merece tu energía. También puede haber avances discretos: una mejora que no hace ruido, pero sí ordena tu posición. Si te toca liderar, te conviene hacerlo con precisión y no con prisa.\n\nTe ayudará trabajar por bloques: una prioridad, un cierre y una pausa breve antes de seguir. Así conviertes la presión en estructura y evitas que el esfuerzo se vuelva confuso."
   },
   "study": {
    "heading": "Aprender con fondo",
    "body": "En 2027, el aprendizaje se ve favorecido cuando lo usas para afinar criterio, no solo para acumular información. Tu mapa sugiere un año con momentos de ayuda, recuperación y consolidación, así que estudiar, leer o entrenar una habilidad nueva puede darte más de lo que parece si lo haces con constancia tranquila. Con el agua ausente en tu distribución, te conviene dar espacio a la reflexión, no solo a la acción.\n\nEn la práctica, esto puede sentirse como ganas de ordenar ideas, revisar métodos o entender mejor lo que ya vienes haciendo. Tal vez notes que aprendes más cuando escribes, comparas ejemplos o te explicas algo en voz alta. También puede ser un buen año para retomar un tema que dejaste a medias y verlo con ojos más serenos.\n\nElige un solo foco por temporada y dale forma simple: leer, practicar y resumir. Cuando haces menos cosas a la vez, tu mente recoge mejor lo que importa."
   },
   "health": {
    "heading": "Ritmo y cuidado",
    "body": "En 2027, tu bienestar se parece más a un tema de ritmo que de fuerza. El año trae presión, sí, pero también confianza en aumento: eso sugiere que te irá mejor cuando alternes esfuerzo y pausa en vez de empujar siempre igual. Tu mezcla de metal y madera puede darte mucha capacidad de sostener, pero también te pide no vivir en tensión constante.\n\nEn lo diario, esto puede notarse como necesidad de dormir mejor, de bajar el ruido mental o de reservar momentos sin demanda externa. No hace falta hacer grandes cambios: a veces basta con comer con más orden, caminar un poco más despacio o dejar un espacio breve sin pantallas antes de seguir. Cuando te das ese margen, el año se vuelve más amable.\n\nPrueba con una rutina mínima que puedas repetir sin negociar demasiado: una pausa al empezar, otra al cerrar y una respiración más larga entre tareas. Ese pequeño orden puede sostenerte mucho en 2027."
   }
  },
  "months": [
   {
    "headline": "Puerta en movimiento",
    "body": "Febrero de 2027 abre con una sensación de salida y giro: lo que expresas o entregas pide más energía, y eso puede dejarte con menos margen al final del día. Como la rama terrestre de este mes choca con la de tu día, es fácil que aparezcan cambios de plan o ganas de moverte. Conviene no aferrarte demasiado a una sola forma de hacer las cosas."
   },
   {
    "headline": "Brotes discretos",
    "body": "Marzo de 2027 favorece sembrar sin apuro. La energía te empuja a producir y a dar, pero en un tono más suave, como si algo empezara a tomar forma todavía por debajo de la superficie. Si avanzas con pasos pequeños, el mes te responde mejor que si intentas verlo todo resuelto enseguida."
   },
   {
    "headline": "Firmeza útil",
    "body": "Abril de 2027 te da más margen para tomar la iniciativa y mover recursos. Es un buen momento para ordenar prioridades y empujar lo que quieres sostener, aunque el exceso de presión puede restarte precisión. Si eliges bien dónde poner fuerza, el mes se vuelve productivo."
   },
   {
    "headline": "Ajuste y apoyo",
    "body": "Mayo de 2027 mezcla impulso y apoyo en la misma escena. La rama terrestre se acerca a la tuya de un modo que facilita que algo encaje, como si una pieza encontrara su sitio. Aun así, te conviene revisar lo que compartes y lo que dejas en manos de otros."
   },
   {
    "headline": "Peso visible",
    "body": "Junio de 2027 trae más exigencia y también más sensibilidad. Puedes notar que ciertas responsabilidades te piden respuesta rápida, pero el mes premia mucho más la claridad que la velocidad. Si bajas un cambio, lo que parece tenso puede volverse manejable."
   },
   {
    "headline": "Confianza que crece",
    "body": "Julio de 2027 refuerza tu aplomo, aunque no te libra de imprevistos pequeños. Es un mes para sostener tu centro mientras resuelves lo que aparezca sin dramatizar. Si mantienes el orden básico, incluso lo inesperado puede quedar en simple ajuste."
   },
   {
    "headline": "Ayuda que rinde",
    "body": "Agosto de 2027 abre una etapa más nutritiva: recibes apoyo, aprendes con más facilidad y recuperas energía. Lo que haces con esfuerzo empieza a mostrar fruto, aunque todavía requiera constancia. Si aceptas ayuda sin apurarte, el mes se vuelve más amable."
   },
   {
    "headline": "Plenitud serena",
    "body": "Septiembre de 2027 se siente lleno y magnético, como si varias cosas encontraran su forma al mismo tiempo. Es buen mes para aprovechar oportunidades, pero sin querer exprimir cada minuto. Lo que atraes funciona mejor si no lo fuerzas."
   },
   {
    "headline": "Paso lento",
    "body": "Octubre de 2027 baja la velocidad y te devuelve a un ritmo más conocido. Puede ser un mes cómodo, aunque con menos novedad de la que imaginas. Si respetas la pausa, notarás mejor lo que ya está maduro."
   },
   {
    "headline": "Silencio útil",
    "body": "Noviembre de 2027 pide más cuidado con las palabras y con el modo en que interpretas lo que escuchas. Puede haber malentendidos pequeños o respuestas menos claras de lo normal. Antes de sacar conclusiones, vale la pena verificar una vez más."
   },
   {
    "headline": "Orden antes de cerrar",
    "body": "Diciembre de 2027 vuelve a activar tu capacidad de liderar y de ordenar lo que has ido construyendo. La energía de expresar y producir sigue presente, pero ahora conviene darle forma limpia en vez de abrir demasiados frentes. Si cierras bien, enero te encuentra con menos ruido."
   },
   {
    "headline": "Recogimiento claro",
    "body": "Enero de 2028 invita a bajar un poco el volumen y a recoger lo que el año dejó en movimiento. Reconocimiento y calma pueden aparecer juntos si dejas de empujar por inercia. Es un mes bueno para mirar hacia atrás con criterio y elegir qué continúas."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vigila cómo se mueve tu energía cuando el año te pide producir y tomar impulso. Te conviene empezar con metas cortas, revisar dos veces lo importante y no comprometerte por reflejo."
   },
   {
    "title": "De mayo a julio",
    "body": "Observa qué cambia cuando el año se vuelve más exigente y directo. Prueba a repartir mejor la carga, a pedir aclaraciones temprano y a mantener un margen para lo imprevisto."
   },
   {
    "title": "De agosto a octubre",
    "body": "Fíjate en todo lo que te ayuda a recuperar claridad y a consolidar lo aprendido. Es buen tramo para recibir apoyo, ordenar métodos y dejar que una idea madure antes de empujarla."
   },
   {
    "title": "De noviembre a enero",
    "body": "Atiende a los signos de cansancio mental, de malentendidos o de exceso de ruido alrededor. Te sentará bien cerrar asuntos pendientes, simplificar rutinas y guardar espacio para pensar con calma."
   }
  ],
  "closing": "A los 41 años, empieza un ciclo de diez años en el que el metal gana fuerza, y esa transición marca un cambio real en la manera en que sostienes tu camino. En 2027, ese fondo ya se deja sentir como una invitación a afinar la velocidad, ordenar mejor tu energía y confiar en una firmeza más serena. Si eliges el ritmo con cuidado, el año puede dejarte más claro, más sólido y mejor colocado para lo que sigue."
 },
 "riley": {
  "year": 2027,
  "title": "2027: Your steady blaze",
  "subtitle": "A year of giving, refining, and moving with care",
  "overview": "In 2027, the Fire energy around you tends to work like a bright furnace placed beside a deeply rooted oak: it brings visibility, output, and momentum, but it also asks for fuel. Because your Day Master is Wood, and your Five Elements lean heavily toward Wood with no Fire showing in the mix, this can feel like a year where your ideas, effort, and generosity naturally spill outward. You may notice that people come to you for help, that your work becomes more expressive, and that your energy is best spent where it can actually grow something.\n\nRiley, the key is not to force a faster pace just because the year is lively. In 2027, some months feel supportive and replenishing, while others ask you to choose carefully, speak clearly, and keep your spending of time and energy intentional. Your Oak · Rooted nature suggests that you do well when you keep your footing, even while the surface around you changes. If you treat the year as a cycle of expansion, adjustment, and recovery, it can feel more manageable and a lot more meaningful.",
  "chapters": {
   "wealth": {
    "heading": "Money that moves, money that needs a plan",
    "body": "In 2027, money matters may feel more active than usual, not because numbers are magically bigger, but because your energy is naturally pushed toward producing, sharing, and taking initiative. That can be useful for earning through visible effort, but it can also mean that income and outflow both become easier to notice. Since your chart leans strongly toward Wood, a practical structure around spending can help the year feel less scattered.\n\nYou may find yourself saying yes to more invitations, more projects, or more chances to contribute, and that can quietly increase everyday expenses. A month with strong momentum might tempt you to upgrade too quickly or assume a plan is already secure before it is fully set. A simple habit like checking the next three weeks of commitments before making a new purchase can keep things smooth.\n\nStart small: choose one clear rule for 2027, such as pausing before any nonessential expense above a set amount. That kind of boundary can give your generous side room to breathe without draining the energy you want for the things that truly matter."
   },
   "love": {
    "heading": "Relationships that warm up slowly",
    "body": "In 2027, connection tends to feel warmer, busier, and more expressive, but not always restful. Because the year encourages output, you may be more visible to others, more likely to be approached, and more likely to notice who responds well when you show up with sincerity. The most helpful relationships are likely to be the ones that can handle both your generosity and your need for a steady pace.\n\nYou might see this in practical scenes: a friend asking for advice at the exact moment you are already stretched, a new acquaintance drawn to your energy, or a familiar bond becoming easier once expectations are spoken aloud. There can be plenty of chemistry in the air, yet the better moments may come from honest timing rather than forced intensity. Your grounded, rooted style works best when you let trust build in steps.\n\nTry this: when a relationship feels active, name your pace early instead of overcommitting. A clear, kind boundary can actually make warmth last longer, because it keeps your energy available for real connection instead of performance."
   },
   "career": {
    "heading": "Work that asks for visible effort",
    "body": "Career-wise, 2027 looks like a year where being seen matters more. The Fire tone supports expression, presentation, and output, so this can be a strong time for showing your work, refining your message, and letting people understand what you actually do well. Because your own nature is strongly Wood, your strength may come from growing something steadily rather than chasing constant novelty.\n\nA likely scene is that your effort becomes more public: you may be asked to explain, present, lead, or produce in a way that others can immediately notice. That can feel exciting, but it can also make it easier to overextend if you keep saying yes without checking your capacity. The months that bring pressure may be especially useful for learning where your real boundaries sit.\n\nA good move in 2027 is to keep your work visible in small, consistent ways. Share progress before it feels perfect, and choose one project or responsibility that deserves your best energy instead of trying to carry everything at once."
   },
   "study": {
    "heading": "Learning through use, not just theory",
    "body": "Learning in 2027 tends to work best when it has a practical outlet. The year’s Fire quality favors expression and application, so you may absorb things faster when you can immediately use them, explain them, or turn them into something tangible. With your Wood-heavy makeup, you may especially enjoy learning that helps you build structure, skill, or confidence over time.\n\nYou might notice that passive studying feels less satisfying than active learning. For example, reading about something may only become meaningful once you try it, teach it, or write it down in your own words. Periods that feel quiet or repetitive are not wasted; they can be the moments when understanding settles in and becomes reliable.\n\nTry creating a learning loop: read a little, use a little, and review a little. That rhythm can suit 2027 very well, because it lets your natural growth energy stay engaged without burning out in a rush of unfinished ideas."
   },
   "health": {
    "heading": "Keeping your rhythm steady",
    "body": "For body and mind, 2027 asks for rhythm more than intensity. Because the year encourages output, your system may feel best when there is a clear alternation between activity and recovery. The point is not to do less in a fearful way, but to notice when enthusiasm starts to outrun your reserves and to bring things back into balance before you feel flattened.\n\nYou may see this in ordinary moments: skipping meals because you are focused, staying mentally switched on too late, or feeling better once you step away from constant stimulation. The months that feel especially full may also be the months when simple routines matter most. A calm morning, a regular break, or an earlier wind-down can make a surprising difference.\n\nA gentle practice for 2027 is to protect one daily anchor, such as a fixed start time, a short walk, or a device-free pause. Small habits like that can help your rooted nature stay grounded while the year’s Fire keeps everything moving."
   }
  },
  "months": [
   {
    "headline": "Fresh ground",
    "body": "February opens with support arriving in a practical way, and that can make the year feel easier to enter. The peak-effort tone suggests that even small actions may carry more momentum than usual, so a fresh start can be surprisingly effective."
   },
   {
    "headline": "Magnetic lift",
    "body": "March tends to bring helpful attention, easier conversation, and a stronger sense that others are receptive. This is a good month for letting yourself be noticed without forcing the spotlight, because the energy around you naturally draws people in."
   },
   {
    "headline": "Easy settling",
    "body": "April feels more familiar and less dramatic, which can be a relief after the stronger opening months. Since the pace begins to ease, it may help to use this time for sorting, sorting again, and deciding what deserves your attention next."
   },
   {
    "headline": "Quiet caution",
    "body": "May can bring a slower unwind, and that makes misreading signals a little more likely if you rush. It is a useful month for checking assumptions, especially when something sounds simple but carries a second meaning."
   },
   {
    "headline": "Tidy the edges",
    "body": "June asks for a pause that still has purpose: finish, clean up, and organize what is already in motion. The commanding tone can make your voice stronger, so it is a good time to speak clearly without pushing too hard."
   },
   {
    "headline": "Forward motion",
    "body": "July keeps the productive current moving, and your efforts may start to show more clearly. Advancement is favored here, especially when you build on what you already know instead of scattering your energy across too many directions."
   },
   {
    "headline": "Turn and shift",
    "body": "August brings a sharper change in direction, and that can be useful if you are ready to move. Because this month stirs motion and tension at the same time, it helps to stay flexible and avoid locking yourself into one fixed plan too early."
   },
   {
    "headline": "Steady leverage",
    "body": "September supports initiative, results, and practical leverage, as long as you do not overreach. Small hiccups are possible, so double-checking details can save you from having to redo something later."
   },
   {
    "headline": "Pressure that shapes",
    "body": "October can feel more demanding, but in a way that strengthens your structure if you keep your pace sensible. The inner-world tone suggests that reflection and private planning may matter as much as visible action."
   },
   {
    "headline": "Unexpected alignment",
    "body": "November may bring an unusual sense of things coming together, even if the route there feels surprising. Because the energy can shift suddenly, it is wise to leave room for adjustment instead of assuming the first version will stay fixed."
   },
   {
    "headline": "Renewed support",
    "body": "December brings a replenishing note, and that can help you recover from the more demanding parts of the year. Friction may still appear in small ways, but it is easier to handle when you keep your expectations simple and your timing clean."
   },
   {
    "headline": "Momentum returns",
    "body": "January carries a lively, somewhat unpredictable finish, but it also helps move things forward again. This is a good month to stay open, notice what surprises feel useful, and let the year close with a sense of movement rather than pressure."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: build a base",
    "body": "Watch for support, easier access, and the first signs of momentum. Use this window to choose one priority, gather help, and set a simple structure before the pace becomes more active."
   },
   {
    "title": "May to July: refine your output",
    "body": "Watch for moments when your energy starts spilling outward too quickly. Focus on finishing, clarifying, and presenting one thing well, rather than trying to expand everything at once."
   },
   {
    "title": "August to October: choose your direction",
    "body": "Watch for turns, pressure, and the need to make cleaner decisions. Keep plans flexible, check details twice, and move toward the project or role that best matches your actual capacity."
   },
   {
    "title": "November to January: recover and reset",
    "body": "Watch for surprise openings, renewed support, and a fresh wave of motion. Let yourself rest between commitments, and use the quieter moments to prepare the next step instead of forcing an immediate answer."
   }
  ],
  "closing": "At age 46 to 55, Earth energy becomes stronger in your 10-year cycle, and that marks a real shift into a more grounded chapter. For 2027, though, the story is simpler and very usable: this is a year that rewards what you can grow, share, and shape with care. If you keep your footing while the pace rises and falls, Riley, the year can feel less like a race and more like a well-tended path."
 }
};
