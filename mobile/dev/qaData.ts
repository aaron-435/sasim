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
   "title_line1": "You finish the day",
   "title_line2": "before the day finishes you.",
   "subtitle": "Burnout deep report - Five Elements x psychology x counseling, module Burnout",
   "opening_scene": "It is Monday night, and your phone is still warm in your hand from the messages that landed on Monday morning. You tell yourself you are resting, but your mind keeps reopening the same task, the same checkbox, the same worry that something will slip if you stop. Even when the room gets quiet, your body stays on alert, like it is still waiting for one more request. Jordan, isn't this what your evenings have been looking like lately?",
   "case_tag": "CASE - Mina, late twenties, stuck in overdrive",
   "case_paragraphs": [
    "Mina leaves work with a full inbox and an even fuller head. She keeps rechecking the same file on the train, then opens it again at home because one line still feels unfinished. By midnight, she has done more than enough, but she still cannot let the task rest.",
    "Her days start to feel like a race she cannot afford to lose. Her chart leans heavily on Earth and Metal, with very little Wood, so she holds shape and control well but has little room left for fresh growth. You would recognize yourself in the way she keeps going even after the body has already asked for a stop."
   ],
   "oheng_intro": "Your chart is led by Earth at 38 percent and Metal at 38 percent, while Wood sits at 0 percent. In this burnout module, that looks like someone who can hold structure, polish details, and keep finishing, but struggles to let the work become done in the body. The result is not laziness or lack of care. It is the feeling of carrying a task past its finish line and still not being able to set it down.",
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
   "upcoming_period_heading": "From age 31 to 40, a stronger Fire period is coming",
   "upcoming_period_body": "When that stronger Fire period arrives, your pace is likely to change from pure endurance into visible momentum. Work may ask for faster decisions, clearer leadership, and a more direct way of showing what you can do. Because Fire can raise intensity, it will help to build recovery habits before then, not after you are already overloaded. If you practice stopping on purpose now, you will meet that season with more control and less friction.",
   "cross_analysis_quotes": [
    "Your Earth at 38 percent is the part that keeps saying one more pass. That is exactly why perfectionism is so strong for you in this burnout pattern. You do not leave things half-finished; you keep carrying them until they feel safe enough to set down.",
    "Your weak Wood is the part that should allow release and renewal, but it is underfed. That matches your low recovery score, because even when you rest, your system does not fully believe the pause is real. The body needs a softer landing before the mind can trust that stopping is not falling behind."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that completion is not the same thing as closure for you. You want the result to feel airtight before you let it exist on its own. That level of checking can make you dependable, and it can also keep you in the task long after the task is done.",
    "Feeling uneasy even when you rest shows that your body is not treating pause as safety yet. You may stop the work, but the inner alarm stays on for a while. That answer tells me you are not avoiding rest; you are waiting for it to become believable."
   ],
   "chat_snapshot_note": "You came in saying you rest, but it never feels like resting. That lands right next to tired and a little anxious, which tells me the problem is not just fatigue but the inability to switch off the inner monitor. The line I want to keep for you is this: you are not failing to rest, you are resting without permission from your own alarm system.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they arrive before your inner pace has settled. They do not just add tasks; they restart the whole pressure cycle at once. In burnout terms, that kind of trigger lights up the same overdrive that your high perfectionism already keeps ready.",
   "chat_repeat_note": "Cramming, then crashing shows a loop that burns too hot for too long and then asks the body to pay the bill. You keep choosing short bursts of control because they feel safer than an open-ended pace. A smaller shift would be to stop once before the crash, while the work is still technically going well.",
   "chat_fear_note": "Your fear that stopping will make you fall behind is really a fear of losing ground you worked hard to earn. Under that fear is a very serious wish to stay reliable and not disappoint the version of yourself that keeps up. You do not want less ambition; you want a way to rest without feeling erased.",
   "psychology_fact_heading": "Flett and Hewitt's perfectionism",
   "psychology_fact_body": "Perfectionism research by Flett and Hewitt describes a pattern where standards stay high even when the cost keeps rising. In that frame, the work is not just about quality; it is also about protecting yourself from the feeling that anything less than perfect is unsafe. That fits you closely, because your 82 percent perfectionism score shows up in the way you go back and re-check everything after finishing a task. When recovery is low, that same drive stops being useful and starts taking time away from rest.",
   "psychology_takeaway": "Your pressure is not random; it is organized. The task is not to care less, but to let completion mean completion.",
   "strengths": [
    {
     "title": "Finish line",
     "body": "You do not abandon what you start, and that shows up clearly in the way you keep returning to the same task until it feels complete. In a real workday, that means you are often the person who catches the loose end that others miss. That reliability is real, and it is one of the reasons people can trust you with important work."
    },
    {
     "title": "Sharp eye",
     "body": "Your Metal is strong, so you notice what is off before it becomes a bigger problem. That is why re-checking comes naturally to you after a task is done. Used well, that eye protects quality; used too long, it keeps you stuck in review mode."
    },
    {
     "title": "Steady hold",
     "body": "Earth at 38 percent gives you the ability to carry structure without falling apart immediately. You can keep going on Monday morning even when the messages arrive before you are ready. That steadiness is a strength, especially when a team or project needs someone who will not disappear at the first sign of pressure."
    },
    {
     "title": "Pressure tolerance",
     "body": "You can function under strain longer than many people can, and your chart shows why that looks so natural from the outside. The problem is that your system keeps paying for it later, which is why the crash follows the cramming. Even so, the fact that you can hold the line under pressure means you already know how to endure; now you need a way to recover."
    }
   ],
   "weaknesses": [
    {
     "title": "No off-switch",
     "body": "You have enough drive to keep working, but not enough Wood to make stopping feel natural. That is why rest can happen on the calendar without landing in your body. The issue is not that you never pause; it is that the pause does not yet register as safe."
    },
    {
     "title": "Check loop",
     "body": "Your perfectionism keeps sending you back to the same finished task. In practice, that can look like reopening a document, rereading a message, or scanning for one more mistake after the job is already done. The loop protects quality at first, but it also steals the recovery you need to keep going."
    },
    {
     "title": "False rest",
     "body": "You can sit still and still feel like you are on duty. That is why a day off can feel uneasy instead of restorative. The body is present, but the mind is still waiting for the next Monday morning message."
    },
    {
     "title": "Crash debt",
     "body": "Cramming gives you the short-term feeling of control, and crashing is the bill that follows. You may push hard because it works just long enough to seem necessary. The cost is that your energy comes back in drops instead of in a steady flow."
    }
   ],
   "fit_good": "You do best in work that has clear handoffs, visible standards, and a defined end point. A day built around one main deliverable lets you finish once instead of re-checking forever. You also do better when no one expects instant replies the moment Monday starts.",
   "fit_bad": "You struggle in environments where messages keep arriving before the previous task is closed. A day filled with interruptions and vague expectations will keep your mind on watch even after hours. You are likely to feel drained fastest in places where being available matters more than being finished.",
   "behavior_guides": [
    {
     "title": "One-pass close",
     "body": "Pick one task each afternoon and give it a final review at a fixed time, such as 4:30 p.m. After that, close the file and do not reopen it unless a real error appears. This trains your system to recognize a clean ending instead of an endless one."
    },
    {
     "title": "Recovery block",
     "body": "Schedule twenty minutes after work with no messages, no checking, and no planning. Keep your phone out of reach and do one simple physical thing, like a shower or a walk around the block. The point is not to be productive; it is to let your body notice that the task is over."
    },
    {
     "title": "Monday buffer",
     "body": "On Monday mornings, leave the first fifteen minutes for sorting rather than answering. Read the messages once, write down the top three, and do not respond immediately unless something is urgent. That small delay can keep the whole day from starting in a panic."
    },
    {
     "title": "Stop cue",
     "body": "Choose one sentence to say at the end of work, such as, 'This is enough for today.' Say it out loud before you leave your desk, every day for a week. Repeating the same cue helps your mind learn that stopping is part of the job, not a failure in it. It also gives your body a clear signal that the task can wait until tomorrow."
    }
   ],
   "mindset_guide": "Think of burnout like a battery that keeps getting used for one more round before it has time to cool down. Your strong Earth and Metal make you excellent at finishing, but they also make you tempted to keep the device plugged into the task. You do not need to become less capable. You need to let recovery count as part of the work, not as a reward after it. When you treat rest like a scheduled recharge, not a guilty pause, your pace becomes sustainable.",
   "closing_title": "When the work can end",
   "closing_body": "You are not the problem because you care too much. The problem is that your system has learned to treat stopping as danger. Once rest starts to feel like a real ending, not a trap, you will have more energy left for the work that actually matters. "
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
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind"
  }
 },
 "riley": {
  "content": {
   "title_line1": "You keep finishing, but your body never gets the memo.",
   "title_line2": "What looks complete on the outside still feels unfinished inside.",
   "subtitle": "Burnout deep report — Five Elements x psychology x counseling integration",
   "opening_scene": "It is late, and your phone lights up again with Monday-morning messages before the week has even properly begun. You are tired, but your hand still reaches for the screen, as if one more check might keep everything from slipping. In your mind, the sentence keeps repeating: if I stop, I’ll fall behind. Even when you finally lie down, rest does not arrive cleanly; it comes with a second layer of doubt. Riley, isn’t this what your nights have been looking like lately?",
   "case_tag": "CASE — Maya, 30s, always on call",
   "case_paragraphs": [
    "Maya works through the day with her laptop open, then reopens finished files at night just to make sure nothing was missed. She tells herself she can relax after one more pass, but that one more pass keeps multiplying. By the time she closes the lid, she is too wired to feel done.",
    "What stays with her is not only fatigue, but the sense that stopping is dangerous. Her chart is heavy in Wood and light in Metal, so her mind keeps pushing forward faster than it can sort, close, and release. That imbalance leaves her with long stretches of effort and very little true recovery, and you can feel yourself in that pattern too."
   ],
   "oheng_intro": "Your Five Elements split is Wood 50 percent, Earth 25 percent, and Water 25 percent, with Fire at 0 percent and Metal at 0 percent. That is a chart that grows fast, but does not naturally pause to seal the work. In this Burnout module, that shows up as cramming hard, then crashing before your system has really had time to recover.",
   "element_readings": {
    "wood": {
     "heading": "Wood dominant — the branch that keeps reaching",
     "body": "Wood is your strongest element at 50 percent, and it does not move quietly in a Burnout story. It shows up as the part of you that keeps extending the branch, adding one more task, one more check, one more message to answer. When Monday-morning messages hit, Wood is the part that answers before your body has caught up. It is also the part that makes stopping feel like a risk, not a relief."
    },
    "fire": {
     "heading": "Fire absent — the light that never quite catches",
     "body": "Fire is at 0 percent, so the quick spark that turns effort into warmth is not easy to sustain here. In burnout terms, that means you can keep going without ever feeling lit from within by the pace itself. The work gets done, but the feeling of aliveness burns out before the day is over. That is why your tiredness can feel flat rather than dramatic, and why even success may not land as celebration."
    },
    "earth": {
     "heading": "Earth balanced but steady — the weight that can hold you",
     "body": "Earth sits at 25 percent, which gives you some capacity to contain, organize, and settle. In this module, that matters because Earth is the part that could slow the rush long enough to make rest feel real. It is not the loudest force in you, but it is the one that can keep a structure standing when Wood starts pushing too hard. When you let Earth take the lead for a moment, the day becomes less of a sprint and more of something you can actually stay inside."
    },
    "metal": {
     "heading": "Metal weak — the edge that needs support",
     "body": "Metal is at 0 percent, so the clean cut that says ‘this is finished’ does not come easily on its own. The one supportive link you do have is Earth feeding Metal, and that means steadiness, routine, and containment have to come first before true closure can appear. Without that support, you are left rechecking finished work and still not feeling finished. That is exactly why your perfectionism keeps looping back over the same ground."
    },
    "water": {
     "heading": "Water balanced — the depth that notices what is underneath",
     "body": "Water is at 25 percent, and it gives you enough depth to notice the anxiety under the fatigue. That is the part of you that knows rest is supposed to restore, even when your body does not believe it yet. In a Burnout pattern, Water can quietly carry the fear of falling behind without making a scene. It lets you sense the cost of the pace, even before you have words for it."
    }
   },
   "upcoming_period_heading": "From 46 to 55, Earth grows stronger",
   "upcoming_period_body": "That coming 10-year cycle points toward more structure, more stability, and more support for finishing things cleanly. For you, that matters because Earth is the force that can help your system slow down enough to hold what Wood keeps trying to push forward. This is a good time to practice boundaries, routines, and real closure, so that your effort does not have to end in a crash. If you build those habits now, that later period can feel less like pressure and more like relief.",
   "cross_analysis_quotes": [
    "Your strongest element is the same force that keeps your perfectionism awake at night. Wood at 50 percent pushes for one more check, one more fix, one more pass, and that is exactly how your Burnout pattern keeps extending the work past the point of usefulness. You do not lack effort; you have too much momentum.",
    "Your lower recovery score fits the empty Fire in the chart. When recovery stays low, the system does not easily switch from doing to resting, so even a day off can feel unsettled. That is why your tiredness does not simply disappear when the task ends."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that completion does not feel safe to you yet. Your mind wants proof, not just progress, and that is why perfectionism keeps reaching back after the job is done. You can let one final review be enough, even when your nerves ask for more.",
    "Feeling uneasy even when you rest shows that recovery is not landing as a full stop. Your body may be off duty, but your internal pace is still listening for the next demand. You are not failing to rest; you are learning how to let rest count."
   ],
   "chat_snapshot_note": "You said that you rest, but it never feels like resting, and that lands right next to the tired, slightly anxious state you brought into the room. The problem is not that you never stop; it is that stopping does not yet feel safe enough to settle your mind. That is a heavy place to live in, and it explains why even quiet time can feel loud.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they arrive like a signal that the pause is already over. They wake up the part of you that fears being overtaken, which is why your body reacts before your logic can calm it down. In Burnout terms, it is the trigger that pulls your perfectionism back online.",
   "chat_repeat_note": "You cram hard, then crash, and the pattern keeps eating the space between those two states. In the middle, you choose motion over uncertainty, because slowing down feels like giving up ground. A smaller move would be to stop one task earlier than usual and leave the final check for tomorrow.",
   "chat_fear_note": "You are not really afraid of rest itself. You are afraid that if you stop, you will fall behind, and that fear tells me how much you care about keeping your place. Under it is a simple wish: to rest without losing momentum or belonging.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "In burnout research, perfectionism often keeps people overinvested in performance, while weak recovery makes it hard to bounce back after effort. That pairing fits your pattern closely: you keep returning to finished work, and even time off does not fully feel like time off. The result is not laziness or lack of discipline; it is a system that spends too long in effort mode and too little time in restoration. When those two processes pull apart, fatigue starts to feel like a personal failing, even though it is really a pacing problem.",
   "psychology_takeaway": "You are not short on effort; you are short on recovery that actually lands. The work is not to do less of everything, but to let completion stay complete.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half-built. Your answer about re-checking everything shows that you care about precision, and that care is why people can trust what you hand over. In a day that starts with Monday-morning messages, you are often the one who keeps the whole thing from slipping."
    },
    {
     "title": "Alertness",
     "body": "You notice pressure fast, sometimes before anyone else does. That alertness is why tiredness does not just sit in your body; it turns into a clear sense that something needs attention. In your case, awareness is strong enough to become action almost immediately."
    },
    {
     "title": "High standards",
     "body": "You hold yourself to a level that does not let sloppy work pass easily. That can be exhausting, but it also means you know what good work looks like and when something falls short. Your perfectionism is not random; it is organized, specific, and hard to ignore."
    },
    {
     "title": "Persistence",
     "body": "Even when you are tired, you keep returning to the task instead of letting it drift. That is visible in the cram-then-crash pattern: you can push through a lot before your system finally demands a stop. The same drive that wears you out also explains why you get so much done."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "You return to finished work because closure does not feel secure yet. That means the end of a task can become a new beginning for doubt, which drains more energy than the task itself. The more pressure you feel, the more likely you are to reopen what was already done."
    },
    {
     "title": "Uneasy rest",
     "body": "Your recovery is low enough that rest does not always register as rest. You may sit down, but your mind keeps scanning for what comes next, so your break never fully closes the loop. That leaves you tired in a way that sleep alone does not always fix."
    },
    {
     "title": "Crash cycle",
     "body": "You build up effort until the system finally breaks momentum. Then the crash arrives, not as drama, but as depletion. This is why the pattern can repeat even when you genuinely want a gentler pace."
    },
    {
     "title": "Fear of delay",
     "body": "The thought of falling behind can pull you back into motion faster than you want. That fear makes stopping feel expensive, so you keep paying with energy instead. It is understandable, but it keeps your nervous system on a short leash."
    }
   ],
   "fit_good": "You do best in an environment that gives you clear expectations and enough room to finish without constant interruption. A simple morning plan, one place to track tasks, and a quiet window to close the day all help your mind settle. When the structure is clean, you do not have to spend extra energy wondering whether something is still hanging open.",
   "fit_bad": "You struggle in environments where Monday-morning messages keep breaking into your focus and forcing you back into task mode. If every start to the week feels like a fresh alarm, your mind never gets to leave the workbench. That kind of pace will make your recovery feel even more fragile.",
   "behavior_guides": [
    {
     "title": "One-pass rule",
     "body": "When you finish a task, give yourself one final review only. Set a 10-minute timer and stop when it ends, even if you still want another look. The point is not perfect certainty; it is teaching your system that done can stay done."
    },
    {
     "title": "Protected pause",
     "body": "Pick one 20-minute block each day with no messages, no checking, and no task-list edits. Put your phone in another room so your body can actually feel the pause. Do this before the day gets noisy, not after you are already drained."
    },
    {
     "title": "Close the loop",
     "body": "At the end of work, write three lines: what is finished, what waits, and what can be left alone until tomorrow. Keep it short enough that you will actually do it. This gives your mind a place to put unfinished thoughts without dragging them into the night."
    },
    {
     "title": "Recovery cue",
     "body": "When you sit down to rest, choose one repeatable cue, like tea, a blanket, or one song, and use it the same way each time. Let it mark the difference between working and recovering. Do it for 15 minutes before you decide whether you need more."
    }
   ],
   "mindset_guide": "Think of your energy like a phone that keeps reopening the same app after it has already closed. The problem is not that the battery is fake; it is that too many tabs stay alive. Your job is not to force more charge into it. Your job is to let one screen go dark without checking it again.",
   "closing_title": "When done can stay done",
   "closing_body": "You do not need a louder push. You need a cleaner stop, so your effort can finally turn into rest. That shift may feel small at first, but it is the difference between finishing the day and being finished by it."
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
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind"
  }
 },
 "lucia": {
  "content": {
   "title_line1": "Cuando el descanso no baja",
   "title_line2": "todo queda encendido por dentro",
   "subtitle": "Informe profundo de agotamiento — integración de Cuatro Pilares × psicología × acompañamiento",
   "opening_scene": "Es lunes por la mañana y los mensajes ya están ahí antes de que tu cuerpo termine de despertar. Miras el teléfono, respondes, y al mismo tiempo una parte de ti vuelve a revisar lo que hizo ayer como si nada estuviera cerrado del todo. Descansar no te apaga; solo cambia el lugar desde donde sigues vigilando. En tu cabeza aparece una frase que pesa más que el sueño: si paras, te quedas atrás. Lucía, tus días últimamente se sienten así, ¿no es cierto?",
   "case_tag": "CASE — Marina, treinta y tantos, con la mente siempre en guardia",
   "case_paragraphs": [
    "Marina deja el portátil abierto aunque ya terminó la jornada. Antes de cerrar el día, vuelve a leer cada mensaje, corrige una frase, y luego revisa otra vez porque siente que algo se le pudo escapar. Su descanso empieza, pero nunca termina de asentarse.",
    "Con el tiempo, Marina empezó a vivir entre acumulación y derrumbe. Su mapa tenía Tierra muy fuerte y Metal casi ausente, así que sostener, ordenar y soltar no le salía en la misma medida. Tú reconoces ese borde cuando todo parece bajo control y, aun así, el cuerpo no baja la guardia."
   ],
   "oheng_intro": "Tu Tierra está en 38%, más alta que el resto, y tu Metal está en 0%, completamente ausente. En este módulo de Agotamiento, eso se ve como una mente que quiere dejar todo pulido, pero no encuentra un borde claro para cerrar. Por eso el cansancio y la inquietud aparecen incluso cuando intentas descansar.",
   "element_readings": {
    "wood": {
     "heading": "Madera escasa — el impulso que quiere seguir creciendo",
     "body": "Tu Madera está en 13%, y eso se nota en que el impulso de avanzar aparece, pero no siempre consigue sostenerse solo. En un día como el del lunes por la mañana, ese 13% se activa rápido cuando llegan mensajes y todo vuelve a ponerse en marcha. No te falta deseo de crecer; te falta espacio para que ese impulso respire sin que enseguida lo tape la exigencia. En ti, la Madera empuja, pero no gobierna la escena."
    },
    "fire": {
     "heading": "Fuego alto — la chispa que no sabe apagarse",
     "body": "Tu Fuego está en 25%, y en Agotamiento eso se parece a una energía que enciende la respuesta antes de que el cuerpo haya recuperado. Con los mensajes del lunes por la mañana, ese Fuego salta primero y te pone en modo resolución. La intensidad no es el problema; el problema es que luego cuesta volver al silencio. Por eso terminas haciendo mucho, pero sintiendo poco descanso."
    },
    "earth": {
     "heading": "Tierra dominante — sostener hasta vaciarse",
     "body": "Tu Tierra está en 38%, y aquí está el centro de todo: sostienes, acumulas y vuelves a sostener. En este módulo, esa Tierra se ve en tu necesidad de dejar cada cosa bien cerrada antes de permitirte parar. También se ve en la frase que te acompaña por dentro: si paro, me quedo atrás. Cuando la Tierra domina así, el cuerpo no solo trabaja; también carga con la tarea de no dejar nada suelto."
    },
    "metal": {
     "heading": "Metal ausente — el borde que no termina de aparecer",
     "body": "Tu Metal está en 0%, y eso deja sin borde claro el momento de cerrar, ordenar y soltar. En tu mapa, la Tierra puede alimentar el Metal, y esa es la única vía que aquí se puede leer con claridad para entender por qué necesitas estructura para descansar de verdad. Cuando el Metal falta, el descanso se vuelve revisión, y la revisión se vuelve otra tarea más. Por eso incluso un día libre puede sentirse como una interrupción que no termina de convencerte."
    },
    "water": {
     "heading": "Agua plena — la emoción que sigue moviéndose debajo",
     "body": "Tu Agua está en 25%, y en Agotamiento eso se siente como una corriente que no se detiene aunque por fuera intentes bajar el ritmo. El cansancio y un poco de ansiedad conviven ahí, debajo de la superficie, mientras tú sigues acumulando. El Agua no te deja vacío; te deja sensible a lo que todavía no se resuelve. Y cuando aparece la sensación de quedarte atrás, esa corriente se vuelve más difícil de aplacar."
    }
   },
   "upcoming_period_heading": "De los 38 a los 47 años, llega un ciclo de fuego más intenso",
   "upcoming_period_body": "Ese tramo puede traer más empuje, más visibilidad y más deseo de mover cosas que hoy todavía están contenidas. Para ti, no se trata solo de aprovechar energía; se trata de llegar con límites más claros para que el impulso no vuelva a convertirse en sobrecarga. Si ahora aprendes a cerrar tareas sin revisar todo desde el inicio, ese futuro se siente menos pesado y más fértil. Lo que prepares hoy no es más esfuerzo, sino una forma distinta de detenerte sin miedo.",
   "cross_analysis_quotes": [
    "Tu Tierra no descansa: solo cambia de tarea. Ese 38% explica por qué, en Agotamiento, cerrar algo no te da alivio inmediato. Lo que para otros es fin, en ti sigue vivo como una última revisión.",
    "Tu Tierra dominante necesita una salida para no volverse peso. Por eso el perfeccionismo alto encaja tan bien con tu forma de sostenerlo todo hasta el borde. Cuando no encuentras un cierre claro, el cuerpo sigue trabajando aunque ya no quede energía."
   ],
   "answer_notes": [
    "Revisar todo desde el principio muestra que no te basta con terminar; necesitas sentir que nada quedó flojo. Eso habla de una vigilancia fina, casi automática, que convierte cada entrega en una segunda ronda mental. A ti te sirve más aprender a cerrar que a seguir corrigiendo.",
    "Sentir inquietud aun en descanso muestra que tu sistema no interpreta la pausa como seguridad. No es falta de voluntad; es una alerta que sigue encendida aunque el entorno ya esté quieto. A ti te ayudaría mucho distinguir entre parar y perder terreno."
   ],
   "chat_snapshot_note": "Tu descanso no está fallando por falta de tiempo, sino porque el cuerpo no recibe la señal de que ya puede bajar la guardia. Eso se junta con el cansancio y un poco de ansiedad que dijiste sentir, y hace que incluso una pausa se parezca a otra tarea más. La frase que mejor te retrata hoy es esta: tu cuerpo descansa tarde, pero nunca a medias.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te pegan fuerte porque llegan justo donde más duele: en el punto en que todavía no has cerrado del todo tu propia exigencia. Ahí tu Fuego se enciende rápido y tu Tierra quiere responder sin dejar nada pendiente. No es solo el contenido de los mensajes; es el arranque brusco de un sistema que ya venía cargado.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte se arma en silencio, pieza por pieza, hasta que ya no queda margen. Primero sostienes más de la cuenta, luego te exiges terminarlo todo, y al final el cuerpo cobra lo que la mente fue posponiendo. Un pequeño corte en ese ciclo puede empezar por dejar una cosa sin revisar antes de pasar a la siguiente.",
   "chat_fear_note": "Te da miedo quedarte atrás si paras, y ese miedo no habla de debilidad: habla de cuánto valor le das a seguir avanzando. Debajo de esa alarma hay una necesidad muy clara de no perder lugar, ritmo ni oportunidad. Si lo miras de cerca, no estás pidiendo correr más; estás pidiendo sentir que detenerte no te borra.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "En psicología, el perfeccionismo describe la tendencia a fijar estándares muy altos y a medir el valor propio con lo que queda impecable. La recuperación, en cambio, habla de la capacidad de volver a un estado de reposo real después del esfuerzo. Cuando el perfeccionismo sube y la recuperación baja, la mente puede seguir trabajando aunque la tarea ya terminó. Tu combinación de 82% en perfeccionismo y 34% en recuperación encaja con esa forma de cerrar y volver a abrir mentalmente lo que ya estaba hecho.",
   "psychology_takeaway": "No te falta descanso; te sobra vigilancia. Lo que hoy parece descanso, en tu caso, todavía suena a revisión.",
   "strengths": [
    {
     "title": "Constancia",
     "body": "Tu fuerza está en que no dejas algo a medias sin darte cuenta de todo lo que implica. Con Tierra en 38%, sabes sostener y llevar una tarea hasta el final, incluso cuando el lunes amanece con mensajes y presión. Esa capacidad te da mucha fiabilidad, aunque a veces también te empuje a cargar más de lo que conviene."
    },
    {
     "title": "Respuesta",
     "body": "Tu Fuego en 25% hace que reacciones con rapidez cuando algo exige movimiento. No te quedas inmóvil frente a lo urgente, y eso se nota en cómo entras en acción apenas aparece el mensaje. Esa rapidez puede ser muy valiosa si no la conviertes enseguida en autoexigencia."
    },
    {
     "title": "Lectura fina",
     "body": "Tu Agua en 25% te permite captar el fondo emocional de lo que pasa, no solo la superficie. Por eso notas la diferencia entre descansar y sentir descanso, aunque por fuera parezcan lo mismo. Esa sensibilidad te ayuda a reconocer cuándo algo ya empezó a pesarte antes de que se vuelva derrumbe."
    },
    {
     "title": "Impulso vivo",
     "body": "Tu Madera en 13% no domina, pero sí empuja lo suficiente para que quieras avanzar y mejorar. Ese 13% se ve cuando vuelves a revisar porque no quieres dejar nada torcido. Bien canalizado, ese impulso te ayuda a crecer sin convertir cada paso en examen."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión",
     "body": "Tu mente no suelta fácil lo que ya hizo, y por eso vuelves a mirar desde el principio. Con 82% en perfeccionismo, cada cierre puede abrir otra ronda de comprobación. No es que no sepas terminar; es que terminar no te da paz de inmediato."
    },
    {
     "title": "Pausa tensa",
     "body": "Tu 34% en recuperación muestra que el descanso no alcanza a sentirse seguro. Incluso en un día libre, aparece inquietud, como si el cuerpo sospechara que relajarse cuesta demasiado. Eso vuelve frágil cualquier pausa y la llena de ruido interno."
    },
    {
     "title": "Acumulación",
     "body": "Tu patrón de acumular y luego derrumbarte deja claro que sostienes más de lo que se ve. La carga crece mientras sigues respondiendo, corrigiendo y ordenando. Cuando llega el bajón, no cae solo el ánimo; cae todo lo que venías sosteniendo en silencio."
    },
    {
     "title": "Miedo a frenar",
     "body": "Tu frase sobre quedarte atrás si paras muestra que detenerte se siente arriesgado. Ese miedo hace que el descanso se parezca a una pérdida de terreno, no a una pausa útil. Por eso te cuesta bajar el ritmo aunque ya estés al límite."
    }
   ],
   "fit_good": "Te conviene un entorno donde cerrar una tarea no signifique abrir otra de inmediato. Un día bien llevado para ti tiene bloques claros, pocos cambios bruscos y un final visible antes de la noche. Cuando sabes qué termina y qué empieza, tu energía se dispersa menos.",
   "fit_bad": "Te pesa un entorno con interrupciones constantes y mensajes que exigen respuesta inmediata. Un lunes así te deja con la sensación de que nunca acabas de salir de lo anterior. Si además todo se mide por rapidez, tu perfeccionismo se vuelve más duro contigo.",
   "behavior_guides": [
    {
     "title": "Cierre real",
     "body": "Al terminar una tarea, espera diez minutos antes de volver a abrirla. Durante ese tiempo, escribe solo una frase con lo hecho y otra con lo que ya no vas a tocar hoy. Hazlo una vez al día para enseñarle a tu mente que terminar también puede ser suficiente."
    },
    {
     "title": "Pausa visible",
     "body": "En tu día libre, fija dos pausas cortas sin pantalla, de quince minutos cada una. Coloca el teléfono lejos y no uses ese tiempo para ordenar pendientes. Tu recuperación necesita señales concretas de que el descanso no es una tarea escondida."
    },
    {
     "title": "Límite de revisión",
     "body": "Antes de enviar algo, permite solo una revisión final. Si aparece el impulso de empezar desde cero, anótalo en una nota y sigue adelante. Repetir esta regla tres veces por semana puede bajar mucho el ruido de tu perfeccionismo."
    },
    {
     "title": "Arranque suave",
     "body": "Los lunes por la mañana, deja los mensajes para después de respirar cinco veces y tomar agua. Abre primero una sola conversación, no todas. Ese pequeño orden le enseña a tu Fuego a encenderse sin quemarlo todo de golpe."
    }
   ],
   "mindset_guide": "Piensa en tu energía como en un escritorio lleno de papeles. Si sigues apilando sin poner una bandeja de salida, todo parece urgente y nada descansa. Tu descanso no necesita más fuerza; necesita un lugar donde lo terminado deje de pedirte atención. Cuando le das ese lugar, tu mente deja de vivir en modo borrador.",
   "closing_title": "Lo que sí puede aflojar",
   "closing_body": "Tu problema no es que no sepas hacer mucho; es que te cuesta dejar de seguir haciendo cuando ya hiciste bastante. Con Tierra fuerte, Metal ausente y un perfeccionismo alto, tu reto no es empujar más, sino cerrar con más confianza. Y quizá la frase que más te conviene guardar hoy es esta: terminar no debería costarte la paz."
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
   "core_fear_or_meaning": "Me da miedo quedarme atrás si paro"
  }
 },
 "sam": {
  "content": {
   "title_line1": "You finish it all, then your body pays the bill",
   "title_line2": "And the bill keeps coming back on Monday morning",
   "subtitle": "Burnout deep report - Saju x psychological test x counseling integration",
   "opening_scene": "It is late, and the room is quiet except for the screen lighting up again. You have already finished the task, but your hand still goes back to check it one more time. Monday morning messages are waiting there like a second alarm, and your mind keeps saying that if you stop now, you will fall behind. Even on a day off, rest does not land as rest; it lands as another thing to manage. Sam, isn't this what your nights have been looking like lately?",
   "case_tag": "CASE - Mina, 30s, stuck between finishing and recovering",
   "case_paragraphs": [
    "Mina closes her laptop after dinner, then opens it again because one line still feels too loose. She has already sent the file, but she keeps checking the numbers and rewriting the same message. By the time she finally stands up, her shoulders are tight and her brain is still walking in circles. Her day looks productive from the outside, but inside it feels unfinished.",
    "That habit leaves Mina tired, sharp, and oddly unable to rest even when nothing is demanding her attention. Her chart is also uneven in a way that mirrors yours: one element carries the weight while another is missing, so the system keeps pushing without enough spark to soften the load. You would recognize her in the way she keeps going after the finish line, and you would recognize yourself in that same loop."
   ],
   "oheng_intro": "Your Five Elements show Wood at 25 percent, Earth at 25 percent, Metal at 25 percent, and Water at 25 percent, with Fire at 0 percent. That means the chart is balanced on paper, but the warmth that helps effort feel alive is absent. In a Burnout module, that often shows up as finishing hard, then feeling empty instead of satisfied.",
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
   "upcoming_period_heading": "From age 40 to 49, a heavier Earth cycle arrives",
   "upcoming_period_body": "That coming stretch should make structure easier to rely on. Work may feel more tangible, and long-term responsibilities can become clearer and more manageable. For you, this is a good time to build habits that do not depend on last-minute urgency, because the future you will need systems that hold even when your energy dips. If you learn now how to stop without panic, that later steadiness will feel far less heavy.",
   "cross_analysis_quotes": [
    "Your strong Wood and your high perfectionism are speaking the same language: keep moving, keep improving, keep going. Wood gives you the push, and perfectionism turns that push into a standard you keep trying to satisfy. That is why finishing does not feel finished; the inner branch keeps reaching for one more inch.",
    "Your 0 percent Fire and your low recovery are the other half of the story. There is not enough warmth in the system to make rest feel complete, so even a day off can feel uneasy. The result is a body that keeps working after the job is done, and a mind that does not know how to call that enough."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you do not trust completion to hold by itself. Your perfectionism is not about vanity; it is about trying to make the result feel safe enough to release. You can let one pass be enough, even when your mind asks for a second, third, and fourth.",
    "Feeling uneasy even when you rest shows that recovery has become a task instead of a refuge. Your system is still scanning for what comes next, even when nothing is asking for action. You deserve pauses that do not have to prove themselves before they count."
   ],
   "chat_snapshot_note": "You said that you rest but it never feels like resting, and that lands right next to the tired, a little anxious feeling you named. The problem is not that you never stop; it is that stopping does not switch the inside of you off. That is why the quiet moments can feel more tense than the busy ones. \"Your body is not refusing rest; it is waiting for rest to finally feel safe.\"",
   "chat_trigger_note": "Monday morning messages hit you so hard because they do not just ask for attention; they restart the whole engine. For someone with strong Wood and high perfectionism, that kind of message can feel like a command to stand back up before yesterday has left the room. The trigger is small on paper, but it lands on a system that already thinks falling behind is dangerous.",
   "chat_repeat_note": "Cramming, then crashing is the shape of a system that runs hot, then runs out. You push hard to stay ahead, and then the body collects the debt all at once. A smaller break before the crash is not a luxury for you; it is the first exit ramp.",
   "chat_fear_note": "Your fear of falling behind is really a fear of losing your place. It makes sense that stopping feels risky when your mind equates stillness with delay. What you want underneath that fear is not endless motion; it is the confidence that a pause will not erase you.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout research",
   "psychology_fact_body": "Your own answers make the pattern plain: after finishing a task, you go back and re-check everything, and on a day off you still feel uneasy when you rest. That is the same loop your counseling note names when you say that rest never feels like rest, because the mind keeps auditing the work instead of letting it land. In burnout psychology, that kind of unfinished recovery is the problem in miniature: effort keeps going, but release does not fully arrive. For you, the useful point is not a theory in the abstract; it is that the perfectionism you described is directly blocking the recovery you also said is too low.",
   "psychology_takeaway": "You do not need to earn every pause with exhaustion. What you need is a finish that your mind is willing to believe.",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half done, and that shows up clearly in the way you keep going back to check the work after it is finished. That kind of follow-through is a real asset in career settings where details matter. The same force that can wear you out is also the force that keeps your work reliable."
    },
    {
     "title": "Responsibility",
     "body": "You take Monday morning messages seriously because you register responsibility before convenience. That makes you dependable in moments when other people would rather delay. You are the person who notices the unfinished edge and wants it settled."
    },
    {
     "title": "Precision",
     "body": "Your habit of re-checking everything is not random; it shows a precise internal standard. In the right role, that standard catches mistakes before they spread. You have a sharp eye for what is not fully aligned yet."
    },
    {
     "title": "Persistence",
     "body": "Cramming, then crashing still tells the story of someone who keeps showing up under pressure. You can sustain a lot before you admit you are spent. That persistence is powerful, but it needs boundaries so it does not turn into self-erasure."
    }
   ],
   "weaknesses": [
    {
     "title": "Overcheck",
     "body": "You keep returning to the task because one pass rarely feels final enough. That can make a completed day feel strangely unfinished in your own body. The work is done, but your mind keeps requesting evidence."
    },
    {
     "title": "Uneasy rest",
     "body": "Your day off does not settle easily, and that means recovery is not fully switching on. You may sit still, but the inside of you keeps waiting for the next message. Rest needs to become a place you can enter, not a test you have to pass."
    },
    {
     "title": "Crash cycle",
     "body": "You push hard, then the drop comes all at once. That pattern is exhausting because it leaves no middle gear. The more you rely on emergency effort, the more severe the crash feels afterward."
    },
    {
     "title": "Fear of delay",
     "body": "You seem to treat stopping as if it might cost you your position. That fear makes sense of why Monday morning messages can feel so loaded. It also means your pace is being driven by threat, not only by choice."
    }
   ],
   "fit_good": "You do best in work that has a clear finish line and a realistic handoff. A day with one focused block, one defined review, and one actual stop point suits you far better than constant interruption. You need a place where finishing is allowed to mean finishing.",
   "fit_bad": "You struggle most in a workday that keeps reopening the same task after you have already finished it. When Monday messages arrive and you answer by re-checking, reworking, and staying on alert, your day never gets to close. That kind of setup feeds the exact loop you described: cramming, then crashing.",
   "behavior_guides": [
    {
     "title": "One-pass rule",
     "body": "When you finish a task, give yourself one scheduled review and stop there. Set the review for the last 10 minutes of the block, not the whole afternoon. If you still want to re-check after that, write the concern down and leave it for tomorrow."
    },
    {
     "title": "Hard stop",
     "body": "Choose one daily stop time and protect it like a meeting. At that time, close the work tabs, put the phone on do not disturb for 30 minutes, and do not reopen anything unless it is truly urgent. Your system needs a visible edge."
    },
    {
     "title": "Recovery cue",
     "body": "Before a day off, decide on one small recovery ritual and repeat it every time. It could be a walk, a shower, or 20 minutes away from screens. The point is not to optimize rest; it is to teach your body what rest looks like."
    },
    {
     "title": "Message buffer",
     "body": "When Monday messages arrive, wait 5 minutes before answering unless the issue is truly time sensitive. Use that pause to read once, breathe, and decide what actually needs action. This gives your mind a buffer so the message does not hijack the whole morning."
    }
   ],
   "mindset_guide": "Think of your energy like a workbench, not a fire alarm. A workbench is useful because it holds the task while you work it through, but it does not stay active every second of the day. Right now, you keep treating every message like an alarm bell, and that is why recovery never feels complete. You will go farther if you let some things wait without telling yourself that waiting means losing.",
   "closing_title": "Let the finish line stay finished",
   "closing_body": "You are not lazy, and you are not broken; you are overextended in a pattern that never lets completion land. The chart, the test, and your own words all point to the same place: too much drive, too little recovery, and a mind that keeps checking for danger after the work is done. If you remember one line from this page, let it be this: you do not have to keep proving that you finished."
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
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind"
  }
 },
 "mia": {
  "content": {
   "title_line1": "You keep finishing what others leave behind.",
   "title_line2": "And then you are the one who feels emptied out.",
   "subtitle": "Burnout deep report — Five Elements x psychological test x counseling integration",
   "opening_scene": "It is late, and the messages from Monday morning are already circling in your mind. Your thoughts keep returning to what still needs checking, even after the work should be over. You say you are resting, but one part of you is still back at the task, refusing to let it settle. That is why the rest never quite lands, Mia.",
   "case_tag": "CASE — Nora, late twenties, stuck between finishing and recovering",
   "case_paragraphs": [
    "Nora spends her evenings closing tabs, rewriting one last line, and then opening everything again just to make sure. She tells herself it will only take a minute, but that minute keeps multiplying. By the time she finally sits down, the day already feels used up. What looks like diligence from the outside feels more like being unable to let the task leave her hands.",
    "Over time, that habit leaves Nora tired and a little anxious even on quiet days. Her chart also leans heavily toward Wood, with Water relatively weak, so she keeps pushing forward long after her reserves should have asked for a pause. She learns to equate stopping with falling behind, and rest starts to feel suspicious instead of restorative. You would recognize yourself in her almost immediately."
   ],
   "oheng_intro": "Your Five Elements pattern is led by Wood at 38 percent, while Water sits at 13 percent. That balance shows up here as motion that keeps going even after the work is done, which fits a burnout pattern built around overfinishing. In this module, the shape is not lack of effort; it is effort that has trouble handing the day back to rest.",
   "element_readings": {
    "wood": {
     "heading": "Wood 38 percent — the branch that keeps reaching",
     "body": "Wood is your leading element at 38 percent, and it shows in how hard you keep moving once a task has your attention. After finishing something, you go back and re-check everything, as if the work is not allowed to be done until it feels perfectly grown into place. That is why Monday morning messages can hit so hard for you; they meet a mind that is already leaning forward before the week has even started. In this burnout module, your Wood does not slow down when the body is tired, and that is exactly why you end up cramming and then crashing."
    },
    "fire": {
     "heading": "Fire 13 percent — the spark that burns fast",
     "body": "Fire is not the main driver in your chart, but it is still there at 13 percent, and it gives urgency to the way your day can suddenly feel too hot to hold. When the messages come in on Monday morning, the pressure does not stay quiet; it flares into a need to respond, fix, and move. That quick ignition matches the burnout pattern of pushing hard in short bursts and paying for it later. You are not short on energy in the moment; the problem is how quickly that energy gets spent."
    },
    "earth": {
     "heading": "Earth 13 percent — the ground you keep trying to stand on",
     "body": "Earth also sits at 13 percent, so steadiness is present, but it does not dominate the way your impulses to keep going do. You try to create a sense of control by finishing one more thing, then one more, until the day feels packed enough to justify your effort. In a burnout pattern, that can look like using productivity as a floor to stand on when rest feels uncertain. Your Earth wants order, but right now it is being asked to hold too much while you keep moving."
    },
    "metal": {
     "heading": "Metal 25 percent — the edge that checks and refines",
     "body": "Metal is your second-strongest element, and at 25 percent it gives your mind a sharp, exacting edge. It is the part of you that turns finishing into reviewing, and reviewing into another round of checking. That sharpness fits the perfectionism score of 82 percent almost too neatly, because both point to a mind that notices what still could be improved. Metal in you is capable and precise, but in this module it can also keep the work alive after it should have been put down."
    },
    "water": {
     "heading": "Water 13 percent — the reserve that needs feeding",
     "body": "Water is your weakest element at 13 percent, so recovery does not arrive as naturally as effort does. The only supporting relationship named here is Metal nourishing Water, and that matters because your precision can help restore you only when it stops becoming another round of checking. Your own answer about feeling uneasy even on a day off shows how thin that reserve can feel in real life. Water wants to settle, but in your pattern it keeps getting interrupted before it can refill."
    }
   },
   "upcoming_period_heading": "From age 33 to 42, a waterier 10-year cycle begins",
   "upcoming_period_body": "That coming period is likely to feel less like pushing uphill and more like learning when to stop before exhaustion takes over. Because Water becomes stronger then, recovery, emotional honesty, and quieter pacing can start to matter more naturally than they do now. If you practice letting a task stay finished before that period arrives, you will meet it with more room inside you. It is a good time to build habits that do not rely on urgency to keep working.",
   "cross_analysis_quotes": [
    "Your strongest Wood and your 82 percent perfectionism are speaking the same language: keep going, keep fixing, keep improving. That is why finishing does not feel like relief for you. The moment something is done, your mind reaches for it again.",
    "Your weakest Water and your low recovery score explain why rest feels uneasy instead of restoring. You can stop, but your body does not fully believe the stop is safe yet. That is why even a day off can still feel like unfinished business."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you do not trust completion to protect itself. In daily life, that becomes the extra scan of a sent message, a reopened file, or one more look before bed. For you, perfectionism is not about vanity; it is about trying to keep uncertainty from getting back in.",
    "Feeling uneasy even when you rest shows that recovery is not automatic for you right now. A quiet day can still feel like a hallway with the lights left on, because part of you expects the next interruption. That answer says you need rest that feels permitted, not just available."
   ],
   "chat_snapshot_note": "You said, \"I rest but it never feels like resting,\" and that line carries the whole shape of this Burnout module. It sits right beside being tired and a little anxious, which makes the problem feel less like a lack of downtime and more like a mind that will not fully unclench. The line to keep is this: you are not failing at rest; rest is failing to reach you cleanly.",
   "chat_trigger_note": "Monday morning messages hit so hard because they arrive at the exact point where your mind is still trying to seal the weekend shut. For a perfectionistic mind, a new message can feel like proof that nothing is ever really complete. In your chart, that pressure lands especially on strong Wood, which keeps reaching forward instead of standing still.",
   "chat_repeat_note": "Cramming, then crashing is a cycle with a very clear rhythm: you sprint until the work feels safe, and then your body collects the bill. In that cycle, you choose short-term control over long-term steadiness, usually because stopping feels riskier than overdoing it. A small way out is to end one work block while you still have a little energy left, so rest starts before collapse does.",
   "chat_fear_note": "The fear of falling behind is really a fear of losing your place. Under that fear is a strong wish to stay reliable, keep up, and not have to explain why you paused. You do not need more pressure; you need proof that pausing does not erase your progress.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout research",
   "psychology_fact_body": "In burnout research, perfectionism is often linked to overcommitment, self-criticism, and difficulty disengaging from unfinished work. Your recovery score is low at 34 percent, and that shows up in your own words: you feel uneasy even when you rest. Recovery, for you, is not just about time off; it is about time off that your mind can actually accept as safe. That combination helps explain why finishing something can immediately turn into checking it again instead of letting it go.",
   "psychology_takeaway": "You are not lazy; you are overattached to completion. When finishing feels unsafe, rest will always need a louder invitation.",
   "strengths": [
    {
     "title": "Relentless",
     "body": "You do not let things slip through because you keep returning to them until they feel complete. That shows up in the way you re-check everything after finishing a task, even when the task is already done. In the right setting, that kind of follow-through makes you dependable in a very visible way."
    },
    {
     "title": "Sharp",
     "body": "Your 25 percent Metal gives you a strong eye for what still needs tightening. You can sense weak points quickly, which is why details stay alive in your head long after others would have moved on. In a group, that makes you the person who notices the loose thread before it becomes a problem."
    },
    {
     "title": "Driven",
     "body": "Your strong Wood keeps you moving, even when the day is already crowded. That is part of why you can cram hard and still push for one more pass before stopping. The strength is real, and it becomes most useful when you aim it at finishing cleanly instead of endlessly refining."
    },
    {
     "title": "Responsive",
     "body": "Monday morning messages do not leave you indifferent; they pull you into action quickly. That responsiveness can be useful because you do not ignore what needs attention. The same trait becomes costly when every message feels urgent enough to override your recovery."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard to stop",
     "body": "Once you are in motion, stopping does not feel like a natural endpoint. You keep checking, adjusting, and revisiting because the task still feels close to your hands. That makes rest hard to trust, even when your body clearly needs it."
    },
    {
     "title": "Uneasy rest",
     "body": "Your low Water shows up as a day off that still does not feel fully off. You can sit down, but part of you stays alert, waiting for the next thing to catch up to you. That is why recovery needs structure for you, not just free time."
    },
    {
     "title": "Crash pattern",
     "body": "The cramming-then-crashing rhythm means your effort arrives in waves instead of a steady line. You give too much too soon, and then the drop feels bigger than it should. The problem is not commitment; it is the cost of waiting too long to ease off."
    },
    {
     "title": "Fear of lagging",
     "body": "The fear that stopping will make you fall behind can quietly run the whole week. It turns ordinary pauses into moments that feel risky, which keeps your mind from fully settling. When that fear is in charge, even rest starts to look like delay."
    }
   ],
   "fit_good": "You do best in a rhythm where Monday morning messages do not dictate your whole first hour. A clear check-in window helps you answer once, then stop yourself from reopening everything. You need a setting that gives you room to finish, walk away, and not turn every completion into another review.",
   "fit_bad": "You struggle in environments where every morning begins with a flood of messages and no clear boundary around response time. If the day rewards whoever reacts fastest, you will keep pushing until you are tired and a little anxious again. A setting that treats availability as virtue will drain you quickly.",
   "behavior_guides": [
    {
     "title": "One check",
     "body": "When you finish a task, allow yourself one final review and then close the file. Do it at the same time each day so your mind learns there is an end point. If the urge returns later, write the concern down instead of reopening the work."
    },
    {
     "title": "Delayed reply",
     "body": "On Monday mornings, wait ten minutes before answering messages unless they are truly urgent. Use that pause to read the message once, breathe, and decide what actually needs action. This keeps the message from hijacking the whole first hour of your day."
    },
    {
     "title": "Recovery slot",
     "body": "Put a twenty-minute recovery block on your calendar after a heavy work stretch. During that time, do not improve, sort, or clean up anything. Let your body learn that rest can be scheduled and still count."
    },
    {
     "title": "Stop point",
     "body": "Choose a stopping point before you are exhausted, not after. End the work block while you still have one useful step left, so your nervous system practices leaving things unfinished on purpose. Over time, that makes stopping feel less like losing ground."
    }
   ],
   "mindset_guide": "Think of your week like a desk that keeps getting covered with new notes. If you never clear one stack before adding the next, your hands stay busy but your mind never gets space. You do not need to answer every note at once. You need to trust that one finished stack is still finished after you walk away from it.",
   "closing_title": "A finish that can stay finished",
   "closing_body": "What you are learning is not how to care less. You are learning how to let care stop turning into checking, and effort stop turning into exhaustion. When you do that, rest will finally start to feel like rest, and that is the version of you worth protecting."
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
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind"
  }
 },
 "casey": {
  "content": {
   "title_line1": "Cuando revisas todo, tu energía se queda atrás.",
   "title_line2": "Y el descanso, en vez de cerrar, vuelve a abrir la tarea.",
   "subtitle": "Informe profundo de agotamiento — integración de Cinco Elementos y psicología",
   "opening_scene": "Los mensajes del lunes por la mañana llegan y tú ya sientes que algo se reabre. No es solo una notificación; es la fila entera de tareas volviendo a tocar la puerta de tu cabeza. En la mano llevas el móvil, pero en la mente ya estás repasando lo que dejaste listo, lo que aún podría estar mejor y lo que no puedes permitirte soltar. Descansas, sí, pero tu cuerpo no lo registra como descanso. Casey, ¿no se parece eso demasiado a tus noches recientes?",
   "case_tag": "CASE — Lara, treintañera, entre cierre y revisión",
   "case_paragraphs": [
    "Lara sale del trabajo con la sensación de haber terminado todo, pero al llegar a casa abre otra vez el documento, corrige una línea, cambia una palabra y vuelve al inicio. El fin del día no le trae alivio, sino una segunda ronda de vigilancia. Su mesa queda limpia, pero su cabeza sigue en modo revisión.",
    "Con el tiempo, Lara empieza a acumular tareas como quien guarda aire antes de zambullirse, y luego se derrumba cuando ya no puede sostener más. Su mapa de Cinco Elementos también muestra un desequilibrio parecido: mucho impulso para empujar, poca agua para recuperar. Tú también podrías reconocerte en esa forma de llegar al límite sin darte permiso de bajar el ritmo."
   ],
   "oheng_intro": "Tu mapa muestra Madera 38% y Metal 38%, con Fuego 13%, Tierra 13% y Agua 0%. Esa combinación no habla de falta de capacidad, sino de una tensión muy concreta entre empuje y control, justo lo que aparece en este módulo de agotamiento. Aquí, lo que más te desgasta no es empezar, sino no poder cerrar del todo ni recuperar de verdad.",
   "element_readings": {
    "wood": {
     "heading": "Madera abundante — empujar hasta el borde",
     "body": "Con 38%, tu Madera no avanza con timidez; empuja, insiste y quiere dejar todo en orden. En un módulo de agotamiento, eso se ve en la necesidad de rehacer, revisar y volver al inicio aunque ya hayas terminado. El lunes por la mañana no solo te activan los mensajes: también te activan la sensación de que parar te haría perder terreno. Y cuando tu impulso se acelera así, tú no descansas; solo cambias de tarea."
    },
    "fire": {
     "heading": "Fuego bajo — chispa breve, gasto rápido",
     "body": "Tu Fuego está en 13%, y eso se nota en que la energía aparece, pero no se sostiene mucho tiempo. En este módulo, esa chispa sirve para responder, resolver y seguir, aunque después el cuerpo pida bajar el volumen. Por fuera puedes parecer en marcha, pero por dentro la llama no alcanza para calentar todo el día. Tú no te quedas sin arranque; te quedas sin resto."
    },
    "earth": {
     "heading": "Tierra baja — sostener sin apoyo",
     "body": "Con 13%, tu Tierra no ocupa mucho espacio, y eso hace que el sostén se sienta más frágil de lo que parece. En días como esos, el descanso no termina de asentarse y la mente vuelve a levantar lo pendiente. La acumulación y el derrumbe que contaste encajan con una base que no retiene el peso durante demasiado tiempo. Tú sigues sosteniendo, pero sin una pausa que de verdad te aterrice."
    },
    "metal": {
     "heading": "Metal abundante — revisar, cortar, volver a ordenar",
     "body": "Tu Metal también está en 38%, y esa fuerza se nota en la precisión con la que vuelves sobre lo hecho. En este módulo de agotamiento, Metal no solo ordena: también puede volverse una revisión sin final, sobre todo cuando tu perfeccionismo marca 82%. Esa mezcla hace que una tarea terminada siga sonando incompleta en tu cabeza. Y por eso un mensaje del lunes puede sentirse como una orden para afinarlo todo otra vez."
    },
    "water": {
     "heading": "Agua ausente — recuperación en seco",
     "body": "Tu Agua está en 0%, y eso se lee como una ausencia de reserva interna para volver a ti después de dar mucho. Desde una mirada simbólica, esa falta encaja con la sensación de seguir en marcha incluso cuando el descanso ya empezó. En el módulo de agotamiento, eso explica por qué el descanso no termina de sentirse como descanso. Tú no necesitas más empuje; necesitas que el cierre también pueda apagar algo dentro de ti."
    }
   },
   "upcoming_period_heading": "De los 41 a los 50 años, llega una etapa de Metal más fuerte",
   "upcoming_period_body": "Entre los 41 y los 50 años, la energía de Metal se vuelve más visible en tu recorrido. Eso puede darte más claridad para decidir, separar y cerrar con menos ruido interno. También puede ayudarte a convertir tu precisión en una herramienta más limpia y menos costosa. Será una etapa con más orden posible, siempre que no conviertas esa claridad en otra ronda de exigencia.",
   "cross_analysis_quotes": [
    "Tu Madera al 38% no solo te da empuje. También alimenta el perfeccionismo del 82% que no te deja soltar una tarea a la primera. Cuando revisas todo desde el principio, no estás buscando solo calidad; estás intentando calmar una parte de ti que teme quedarse atrás.",
    "Por eso, en tu día a día, lo que parece productividad a veces termina pareciéndose a vigilancia. Tú sigues moviéndote, pero la recuperación baja del 34% no alcanza para compensar tanto reajuste interno. El resultado es que avanzas con fuerza, pero casi nunca con descanso real."
   ],
   "answer_notes": [
    "Revisar todo desde el principio muestra que, para ti, cerrar una tarea no siempre significa cerrar la tensión. En la vida diaria, eso te lleva a volver sobre lo ya hecho aunque el trabajo esté completo. A ti te sirve más una segunda mirada con límite que una revisión infinita.",
    "Sentir inquietud incluso en un día libre muestra que tu mente no sabe desconectarse solo porque el calendario lo diga. En la práctica, eso convierte el descanso en una pausa con ruido de fondo. Tú necesitas descanso que no te pida rendir mientras descansas."
   ],
   "chat_snapshot_note": "Lo que contaste sobre descansar, pero no sentirlo como descanso, va directo al centro de tu cansancio. No es solo fatiga; también hay un poco de ansiedad que impide que el cuerpo crea en la pausa. Y cuando el descanso no se siente real, todo el día queda en suspenso aunque hayas parado. La frase que te retrata aquí es simple: parar no te sale inocente.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te golpean tanto porque no llegan solo como información, sino como reactivación inmediata. Ese disparo encaja con tu perfeccionismo alto, que convierte cualquier aviso en una invitación a retomar control. En lugar de leer un mensaje, tú sientes que te vuelven a poner delante la tarea entera. Por eso el inicio de semana pesa más de lo que parece.",
   "chat_repeat_note": "Primero acumulas, luego te derrumbas: así se arma el ciclo cuando sostienes demasiado tiempo sin recuperar de verdad. Tú eliges seguir un poco más, corregir un poco más y apretar un poco más, hasta que el cuerpo cobra la factura. Una salida pequeña sería cortar antes, aunque la sensación de incompleto siga ahí durante unos minutos.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de debilidad, sino de cuánta importancia le das a no perder el ritmo. Debajo de ese miedo hay una necesidad muy clara de seguir siendo útil y de no soltar el lugar que has ganado. Lo que pide esa parte de ti no es correr más, sino saber que una pausa no borra tu avance. Tú no quieres frenar por perder; quieres poder frenar sin desaparecer.",
   "psychology_fact_heading": "Perfeccionismo y agotamiento",
   "psychology_fact_body": "El perfeccionismo suele aparecer cuando el estándar interno pesa más que el resultado terminado. En tu caso, el 82% de perfeccionismo encaja con esa revisión constante que vuelve a abrir lo que ya estaba listo. La recuperación baja del 34% muestra que el problema no es solo cuánto haces, sino cuánto cuesta dejar de mirar lo hecho. Cuando ambas cosas se juntan, el descanso deja de sentirse como cierre y se vuelve otra tarea pendiente.",
   "psychology_takeaway": "No te falta capacidad; te sobra revisión. Si el descanso no cierra, tu energía se queda trabajando en silencio.",
   "strengths": [
    {
     "title": "Precisión",
     "body": "Tu Metal al 38% te da una mirada muy fina para detectar lo que otros pasarían por alto. En el trabajo, eso se nota cuando corriges una tarea y ves enseguida qué detalle todavía no encaja. Tú conviertes el error pequeño en una oportunidad de ajuste real."
    },
    {
     "title": "Empuje",
     "body": "Tu Madera al 38% hace que no te quedes inmóvil cuando algo importa. Incluso con cansancio, sigues avanzando y eso explica por qué acumulas tanto antes de derrumbarte. Tú no te rindes fácil; empujas más de la cuenta."
    },
    {
     "title": "Autoexigencia",
     "body": "Tu perfeccionismo alto muestra una capacidad de sostener estándares muy altos durante mucho tiempo. Eso puede ayudarte a terminar con calidad, aunque también te lleve a revisar una y otra vez. Tú sabes subir el nivel, pero necesitas que no siempre te cobre el cuerpo."
    },
    {
     "title": "Persistencia",
     "body": "Cuando algo te importa, no lo sueltas a la primera señal de cansancio. Esa persistencia aparece en tu tendencia a volver sobre la tarea y dejarla mejor de como estaba. Tú tienes una constancia que, bien cuidada, puede volverse una ventaja enorme."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión infinita",
     "body": "Tu impulso de volver a revisar puede convertir un cierre simple en un bucle largo. En un día normal, eso se parece a abrir de nuevo el archivo ya terminado solo para tocar una línea más. Tú pierdes descanso justo donde querías ganar tranquilidad."
    },
    {
     "title": "Pausa tensa",
     "body": "Tu recuperación baja hace que parar no se sienta del todo reparador. Aunque el calendario diga libre, por dentro sigues atento a lo que falta. Tú necesitas una pausa que no venga acompañada de vigilancia."
    },
    {
     "title": "Acumulación",
     "body": "Tu patrón de acumular y luego derrumbarte muestra que aguantas demasiado antes de aflojar. En la práctica, eso hace que el cansancio llegue de golpe, no poco a poco. Tú no te vas vaciando despacio; te vas quedando sin margen de una vez."
    },
    {
     "title": "Miedo al retraso",
     "body": "La idea de quedarte atrás si paras te empuja a seguir incluso cuando ya no te conviene. Eso puede hacer que cualquier interrupción se sienta más grande de lo que es. Tú no solo temes frenar; temes perder tu sitio al frenar."
    }
   ],
   "fit_good": "Te convienen entornos donde el trabajo tenga cierres claros y no se premie la revisión eterna. Un día ideal para ti deja espacio para terminar, registrar y pasar a otra cosa sin volver a abrirlo todo por obligación. Cuando el ritmo es limpio, tú rindes mejor y gastas menos.",
   "fit_bad": "Te desgastan los entornos donde todo llega por mensajes urgentes y el cierre nunca queda definido. Un día así te lleva a mirar el teléfono una y otra vez y a sentir que siempre falta algo por ajustar. Si el trabajo vive en alerta permanente, tú acabas pagando el precio en energía.",
   "behavior_guides": [
    {
     "title": "Cierre breve",
     "body": "Cada vez que termines una tarea, espera diez minutos antes de volver a mirarla. Usa ese tiempo para guardar el archivo, cerrar la pestaña y pasar a otra cosa concreta. Así entrenas a tu mente para distinguir entre terminar y revisar."
    },
    {
     "title": "Pausa real",
     "body": "En tu día libre, bloquea quince minutos sin pantalla y sin lista de pendientes. Si aparece inquietud, nómbrala sin discutir con ella y vuelve a la actividad elegida. Tú necesitas practicar descanso con bordes claros, no solo tiempo libre."
    },
    {
     "title": "Límite de corrección",
     "body": "Elige una sola ronda extra de revisión para cada entrega importante. Cuando la completes, deja una nota breve con lo que ya quedó bien y cierra el documento. Así tu precisión sigue contigo, pero no se convierte en bucle."
    },
    {
     "title": "Inicio sin carga",
     "body": "Los lunes por la mañana, no empieces mirando todos los mensajes a la vez. Abre solo uno, respira antes de responder y ordena el resto por prioridad. Ese pequeño filtro reduce la sensación de que todo te cae encima al mismo tiempo."
    }
   ],
   "mindset_guide": "Tu mente se comporta como un taller que nunca apaga la luz. Si dejas todas las herramientas sobre la mesa, acabas confundiendo orden con vigilancia. No necesitas apretar más el tornillo; necesitas guardar una pieza y saber que sigue ahí. Cuando haces eso, el cansancio deja de mandar tanto.",
   "closing_title": "Cuando cierres, de verdad cierra",
   "closing_body": "Tu mapa no habla de falta de fuerza, sino de una fuerza que se va demasiado en sostener, revisar y volver a empezar. El descanso, para ti, no puede ser una idea bonita; tiene que volverse un gesto concreto. Y la frase que conviene guardar es esta: si tu energía termina en todo, también merece terminar en paz."
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
   "core_fear_or_meaning": "Me da miedo quedarme atrás si paro"
  }
 },
 "jisoo": {
  "content": {
   "title_line1": "멈추지 못해 더 지치는 하루",
   "title_line2": "끝까지 해내는 힘이 먼저 닳아버린 지수님의 리듬",
   "subtitle": "번아웃 모듈 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침 메신저 알림이 울리자마자, 지수님은 아직 시작도 안 한 하루를 이미 따라잡고 있었습니다. 손은 화면을 확인하는데, 머릿속은 벌써 오늘 할 일의 순서를 다시 세고 있었습니다. 쉬어도 쉬는 것 같지 않다는 말이 딱 그 장면 위에 겹쳐집니다. 지수님은 바로 그 알림 앞에서 다시 속도를 올리고 싶어지는 쪽에 더 가까우신가요.",
   "case_tag": "CASE — 미나씨, 삼십대 초반, 마감이 몰린 직장인",
   "case_paragraphs": [
    "미나씨는 퇴근 후에도 노트북을 덮지 못했습니다. 일을 끝낸 뒤에도 다시 처음부터 훑어보는 습관이 있어서, 화면을 닫아도 머리는 계속 같은 문장을 붙잡고 있었습니다. 그녀는 해야 할 일을 다 해놓고도, 그걸 끝냈다는 감각을 거의 남기지 못했습니다.",
    "그 습관은 결국 잠자리까지 따라왔습니다. 쉬는 날에도 마음이 불편해서, 쉬고 있다는 사실 자체가 오히려 걸림돌처럼 느껴졌습니다. 사주에서도 토 기운이 지나치게 두텁고 수 기운이 비어 있는 흐름이 비슷하게 보였습니다. 당신도 일단 해치워야 마음이 놓인다는 쪽에 더 가까우신가요."
   ],
   "oheng_intro": "지수님은 토(土)가 50퍼센트로 가장 두껍고, 수(水)는 0퍼센트로 비어 있습니다. 이번 번아웃 모듈에서는 그 구성이 그대로 드러나서, 쉬는 시간에도 마음이 편히 내려앉지 못하고 계속 점검 모드로 남아 있을 가능성이 큽니다. 목(木) 33퍼센트와 금(金) 17퍼센트가 일을 굴리게는 하지만, 번아웃 앞에서는 지키는 힘보다 버티는 힘이 먼저 소모됩니다.",
   "element_readings": {
    "wood": {
     "heading": "목(木) 33퍼센트 — 앞으로 밀어붙이는 가지",
     "body": "목 기운이 33퍼센트라는 것은, 지수님 안에 일을 앞으로 밀어보내는 추진이 분명히 있다는 뜻입니다. 번아웃 모듈에서는 그 힘이 시작을 잘 여는 대신, 끝난 뒤에도 계속 수정하고 점검하게 만드는 손길로 나타납니다. 일을 끝낸 뒤 다시 처음부터 훑어보는 답변은 바로 이 목의 성질이 멈추지 못한 채 이어지는 장면처럼 보입니다."
    },
    "fire": {
     "heading": "화(火) 0퍼센트 — 불꽃이 잠시 꺼진 자리",
     "body": "화 기운이 0퍼센트라서, 지수님은 에너지를 겉으로 크게 터뜨리기보다 안쪽에서 조용히 소모하는 쪽에 가깝습니다. 번아웃 모듈에서 이 결핍은 열정이 없다는 뜻이 아니라, 뜨겁게 태워서 남기는 방식이 아니라는 뜻으로 읽힙니다. 월요일 아침 메신저 알림을 받는 순간에도 확 치솟는 기세보다, 이미 지친 몸으로 다시 버티는 흐름이 더 앞에 서 있습니다."
    },
    "earth": {
     "heading": "토(土) 50퍼센트 — 버티는 힘이 너무 두꺼운 흙",
     "body": "토 기운이 50퍼센트라서, 지수님은 한 번 맡은 일을 쉽게 놓지 않습니다. 번아웃 모듈의 완주형 소진은 바로 여기서 선명해집니다. 끝까지 해내는 힘이 강한 만큼, 중간에 멈추는 선택이 잘 안 들어옵니다. 몰아서 하고 무너지기 패턴도 이 두꺼운 토가 일을 끝까지 떠받치다가 자기 몸까지 같이 눌러버리는 모습으로 읽힙니다."
    },
    "metal": {
     "heading": "금(金) 17퍼센트 — 기준을 세우는 날 선 선",
     "body": "금 기운이 17퍼센트라서, 지수님은 대충 넘기기보다 기준을 세우려는 감각이 있습니다. 번아웃 모듈에서는 이 금이 일을 정리하는 힘이 되지만, 완벽주의가 높을수록 그 기준이 스스로를 계속 재점검하게 만듭니다. 그래서 끝냈다고 느끼기보다, 아직 덜 다듬은 부분을 찾느라 손이 멈추지 않습니다."
    },
    "water": {
     "heading": "수(水) 0퍼센트 — 쉬어도 가라앉지 못하는 물",
     "body": "수 기운이 0퍼센트라서, 지수님은 쉬는 순간에 마음이 자연스럽게 가라앉는 감각이 약합니다. 이 약한 원소는 금이 수를 살려 주는 관계로 채워지는데, 지금은 그 흐름이 충분히 잘 이어지지 않는 상태로 읽힙니다. 쉬는 날에도 마음이 불편하다는 답은 바로 그 빈자리가 몸으로 느껴진 장면처럼 보입니다. 쉬어도 쉬는 것 같지 않은 이유가, 게으름이 아니라 회복이 잘 붙지 않아서일 수 있습니다."
    }
   },
   "upcoming_period_heading": "36세부터 45세까지, 물의 계절이 옵니다",
   "upcoming_period_body": "지수님에게 36세부터 45세까지는 수 기운이 강해지는 구간이라, 지금보다 멈추고 정리하는 힘이 자연스럽게 살아날 가능성이 있습니다. 그 시기에는 끝까지 밀어붙이는 방식만으로 버티기보다, 중간에 숨을 고르고 다시 흐름을 잇는 감각이 일에 들어오기 쉽습니다. 지금부터는 결과를 더 세게 쥐기보다, 끝낸 뒤 바로 다음 일로 뛰어들지 않는 연습을 조금씩 쌓아 두면 좋습니다. 그래야 그 시기에 들어왔을 때 변화가 더 부드럽게 자리 잡습니다.",
   "cross_analysis_quotes": [
    "토가 50퍼센트인 사람은 일을 끝내는 힘보다, 끝낸 뒤 놓는 힘이 더 늦게 따라옵니다. 지수님은 완벽주의 82퍼센트가 그 토의 무게 위에 얹히면서, 마감 후에도 마음이 계속 현장에 남아 있습니다. 그래서 결과가 나와도 바로 안심하기보다, 손이 먼저 다시 문서를 찾게 됩니다.",
    "수가 0퍼센트인 자리에서는 회복이 의지로만 잘 채워지지 않습니다. 지수님이 쉬는 날에도 마음이 불편하다고 답한 것은, 지친 몸보다 먼저 쉬는 감각 자체가 비어 있다는 신호로 읽힙니다. 그래서 쉰다는 행위가 휴식이 아니라 다음 불안을 예고하는 시간처럼 느껴질 수 있습니다."
   ],
   "answer_notes": [
    "다시 훑어본다는 답은 지수님이 결과보다 누락을 더 무서워한다는 뜻입니다. 그래서 한 번 끝낸 일도 마음속에서는 아직 검토 중인 상태로 남기 쉽습니다. 그런 분에게는 완성보다 종료를 허락하는 연습이 더 필요합니다.",
    "쉬는 날에 마음이 불편하다는 답은 지수님이 회복이 잘 붙지 않는 쪽으로 기울어 있다는 신호입니다. 그래서 앉아 있어도 머리는 계속 다음 일을 찾습니다. 그럴수록 쉬는 시간을 성과가 아닌 회복으로 다시 이름 붙여야 합니다."
   ],
   "chat_snapshot_note": "지수님은 쉬어도 쉬는 것 같지 않다는 말을 꺼냈고, 그 말 뒤에는 지쳤고 조금 불안한 감정이 붙어 있었습니다. 이 조합은 몸이 아니라 마음이 먼저 과열된 상태를 보여 줍니다. 지수님은 휴식이 필요해서 힘든 게 아니라, 쉬는 순간에도 마음이 일을 놓지 못해서 더 힘든 쪽에 가깝습니다.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 단순한 알림이 아니었습니다. 아직 시작하지 않은 하루가 곧바로 압박으로 바뀌는 순간이었기 때문입니다. 완벽주의가 높은 사람에게 이런 알림은 시작 신호이면서 동시에 부족함을 확인할 신호처럼 들리기 쉽습니다.",
   "chat_repeat_note": "몰아서 하고 무너지기 패턴은 지수님이 일을 미루는 사람이어서가 아니라, 버틸 수 있을 때 한꺼번에 밀어붙이는 사람이라는 뜻입니다. 그 안에서는 끝까지 해내야 마음이 놓이고, 놓인 뒤에는 이미 에너지가 바닥난 뒤인 경우가 많습니다. 작은 단위로 끊어 끝내고 바로 점검을 멈추는 시간이 그 흐름을 조금 덜 무너뜨립니다.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 마음은, 지수님이 멈춤 자체를 크게 부담스러워한다는 뜻으로 읽힙니다. 그래서 속도를 늦추는 순간 곧바로 평가나 관계가 흔들릴 것처럼 마음이 앞설 수 있습니다. 그 아래에는 뒤처지지 않으려는 조급함보다, 지금까지의 페이스를 지키고 싶은 마음이 있습니다.",
   "psychology_fact_heading": "완벽주의와 자기점검",
   "psychology_fact_body": "완벽주의가 높을수록 사람은 목표를 달성한 뒤에도 곧바로 만족하기보다, 기준에 못 미친 부분을 먼저 찾기 쉽습니다. 지수님의 경우에는 일 끝낸 뒤 다시 처음부터 훑어본다는 답이 그 흐름을 잘 보여 줍니다. 회복이 낮은 편이라 쉬는 날에도 마음이 편하지 않다는 응답이 함께 보이면서, 끝낸 뒤 놓는 힘보다 다시 붙잡는 힘이 더 앞서는 모습이 드러납니다. 그래서 이 리포트는 성과의 문제가 아니라, 끝난 뒤 마음이 어디에 오래 머무는지에 더 주목하게 합니다.",
   "psychology_takeaway": "끝낸 뒤에도 마음이 돌아가면, 몸은 이미 쉬지 못한 셈입니다. 지수님은 성과보다 종료를 연습할 때 더 오래 버틸 수 있습니다.",
   "strengths": [
    {
     "title": "지속력",
     "body": "지수님은 토가 50퍼센트라서, 한 번 잡은 일은 끝까지 끌고 가는 힘이 분명합니다. 실제로 완주형 소진 유형은 그 힘이 강한 사람에게 자주 붙습니다. 월요일 아침 알림이 와도 바로 무너지기보다 다시 순서를 세우는 모습이 그 증거입니다."
    },
    {
     "title": "기준감",
     "body": "금이 17퍼센트인 사람은 대충 넘기지 않고, 무엇이 맞는지 끝까지 확인하려는 감각이 있습니다. 그래서 일을 끝낸 뒤 다시 처음부터 훑어보는 습관이 생기기 쉽습니다. 이 기준감은 지수님을 꼼꼼하게 만들지만, 번아웃 모듈에서는 자신을 쉬게 하지 않는 쪽으로도 작동합니다."
    },
    {
     "title": "추진력",
     "body": "목이 33퍼센트인 지수님은 시작과 전진에 약하지 않습니다. 몰아서 하고 무너지기 패턴도 결국 이 추진력이 일을 끌고 가기 때문입니다. 다만 번아웃에서는 그 힘이 너무 오래 켜져 있어서, 멈춤보다 계속이 먼저 되어 버립니다."
    },
    {
     "title": "회복감각",
     "body": "수는 0퍼센트라서, 지수님은 쉬는 법을 몰라서가 아니라 회복이 잘 붙지 않는 쪽에 가깝습니다. 쉬어도 마음이 불편하다는 답이 바로 그 빈자리를 보여 줍니다. 이 약점은 의지가 부족해서가 아니라, 회복을 몸이 바로 받아들이지 못하는 구조에서 생깁니다."
    }
   ],
   "weaknesses": [
    {
     "title": "과점검",
     "body": "지수님은 끝낸 뒤에도 다시 처음부터 훑어보는 습관 때문에, 일을 끝내도 마음은 계속 현장에 남아 있습니다. 그래서 성과가 나와도 안심보다 검토가 먼저 옵니다. 이 패턴은 완벽주의 82퍼센트가 만드는 아주 선명한 흔적입니다."
    },
    {
     "title": "휴식불편",
     "body": "쉬는 날에 마음이 불편하다는 것은, 쉬는 시간이 지수님에게 회복으로 바로 붙지 않는다는 뜻입니다. 그래서 앉아 있어도 머리는 계속 다음 일을 찾습니다. 이런 불편감은 지쳤다는 신호를 더 늦게 알아차리게 만듭니다."
    },
    {
     "title": "몰아치기",
     "body": "몰아서 하고 무너지기 패턴은 단기적으로는 빠르게 끝내는 힘처럼 보입니다. 하지만 뒤에서는 회복이 따라오지 못해서, 끝난 뒤의 공백이 더 크게 느껴집니다. 지수님은 일을 잘하는 만큼, 에너지를 한 번에 너무 많이 쓰는 쪽으로 기울기 쉽습니다."
    },
    {
     "title": "불안가속",
     "body": "뒤처질까 봐 멈출 수 없다는 마음은, 속도를 늦추는 순간 조급함이 더 크게 올라오는 감각으로 이어집니다. 그래서 월요일 아침 메신저 알림 같은 작은 자극도 크게 걸립니다. 이 조급함은 게으름을 막지만, 동시에 쉬는 권리까지 같이 밀어내 버립니다."
    }
   ],
   "fit_good": "지수님에게 맞는 환경은 시작과 종료가 분명한 곳입니다. 하루의 일이 오전, 오후, 마감처럼 나뉘어 있고, 끝난 뒤에는 확인 시간을 따로 둬서 바로 다음 일로 점프하지 않아도 되는 구조가 좋습니다. 이렇게 되면 몰아서 하고 무너지기보다, 조금씩 끝내고 조금씩 회복하는 리듬이 생깁니다.",
   "fit_bad": "지수님에게 맞지 않는 환경은 알림이 계속 울리고, 끝난 일도 계속 수정하게 만드는 곳입니다. 월요일 아침 메신저가 곧바로 압박이 되는 구조에서는 마음이 하루 종일 열려 있게 됩니다. 그런 날은 쉬는 시간조차 검토 시간으로 바뀌어서 번아웃이 더 빨리 쌓입니다.",
   "behavior_guides": [
    {
     "title": "종료선긋기",
     "body": "오늘 할 일을 끝내면 예를 들어 저녁 8시처럼 작업을 닫는 시간을 따로 정해 두세요. 그 이후에는 재확인하지 않는 연습을 10분만 해 보세요. 다시 훑어보고 싶은 마음이 올라와도, 메모만 남기고 다음 날 첫 시간으로 넘기면 됩니다."
    },
    {
     "title": "회복예약",
     "body": "쉬는 날에는 쉬는 계획을 먼저 적어 두세요. 점심 뒤 20분 산책, 밤 30분 무음 시간처럼 짧고 확실한 회복을 일정에 넣으면 마음이 덜 불편해집니다. 아무것도 안 하는 시간을 길게 버티기보다, 작은 회복을 여러 번 나누는 편이 지수님에게 더 잘 맞습니다."
    },
    {
     "title": "검토한번",
     "body": "일을 끝낸 뒤 다시 처음부터 훑어보는 대신, 한 번만 확인하는 규칙을 써 보세요. 체크할 항목을 세 개로 줄이고, 그 세 개만 확인한 뒤에는 화면을 닫습니다. 기준을 낮추는 게 아니라, 기준을 정해 두는 쪽에 가깝습니다."
    },
    {
     "title": "알림지연",
     "body": "월요일 아침처럼 알림이 부담스러운 날에는 바로 반응하지 말고 5분만 늦게 여세요. 그 5분 동안 물 한 잔을 마시고 숨을 고르면, 알림이 곧바로 압박으로 바뀌는 속도가 조금 느려집니다. 이렇게 작은 지연을 반복하면 시작과 불안이 꼭 붙어 있지 않다는 감각이 생깁니다."
    }
   ],
   "mindset_guide": "번아웃은 불이 너무 약해서 생기는 게 아니라, 너무 오래 타서 생깁니다. 지수님은 불을 더 키우는 사람이 아니라, 꺼질 타이밍을 알아차리는 사람이 되어야 합니다. 오늘의 일은 오늘의 불씨만 쓰면 됩니다. 남은 열은 내일의 회복에 남겨 두세요.",
   "closing_title": "멈춤이 기술이 되는 순간",
   "closing_body": "지수님은 이미 끝까지 해내는 힘을 갖고 있습니다. 이제 필요한 건 그 힘을 다 쓰기 전에 멈추는 기술입니다. 쉬는 것이 불안한 날에도, 멈춤은 뒤처짐이 아니라 다음 날을 남기는 방식입니다."
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
   "core_fear_or_meaning": "뒤처질까 봐 멈출 수 없어요"
  }
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "jordan": {
  "year": 2027,
  "title": "2027, your steady fire year",
  "subtitle": "A year for shaping momentum with care, not force",
  "overview": "2027 feels like a year where you can steer the flow instead of being swept by it. For Jordan, the year’s Fire energy meets your Water-centered nature in a way that favors initiative, results, and clear direction. Because your chart leans heavily toward Earth and Metal, with very little Wood and a modest amount of Water, this can be a practical year: less about dreaming broadly, more about turning what you already know into something useful. The key is to let confidence stay clean and focused, not inflated.\n\nThe year also carries a Quiet Storage tone, which suggests that some of the strongest gains may happen quietly, through preparation, selection, and timing. Since your type is Dew · Order, you may do best when things are refined rather than rushed, and when you keep your standards visible but flexible. In 2027, it may help to treat momentum like a tool: useful in the right amount, tiring when overused. If you notice yourself trying to do everything at once, that’s a good cue to narrow the field and keep your efforts elegant.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best when it has a shape",
    "body": "This year’s flow can make it easier to pursue results, ownership, and practical gains, but it also asks for restraint. With your chart already weighted toward Earth and Metal, you may prefer clear structures, measurable outcomes, and low-drama decisions, and 2027 supports that style well. The main risk is not lack, but overreach: trying to make every opportunity work at once can blur the signal.\n\nIn daily life, this might look like a season of better bargaining power, more interest in side income, or a stronger urge to turn skills into something tangible. You may also feel drawn to tidy up subscriptions, recurring costs, or old financial habits simply because clutter starts to feel expensive. Jordan, this is a good year for noticing where money leaks through convenience rather than necessity.\n\nA helpful approach is to choose one or two priorities and make them visible. Keep a simple list of what truly supports your life, review it regularly, and let the rest wait its turn. The year seems to reward clean boundaries more than dramatic moves."
   },
   "love": {
    "heading": "Connection deepens through timing",
    "body": "Relationships in 2027 may feel most alive when they are paced well. The months that support ease and help can bring warm exchanges, while the more demanding stretches may ask for patience and clearer expectations. Because your type values order, you may feel safest when affection is not chaotic, even if it is expressive.\n\nYou might notice that people respond well when you are direct without being heavy, or when you show care through consistency rather than grand gestures. In friendships and romance alike, this can be a year where small acts matter more than big declarations: a timely message, a remembered detail, a plan kept simple and real. Some moments may feel like a quiet test of whether a connection can hold steady under pressure.\n\nTry letting relationships breathe without trying to define everything too quickly. A good next step is to notice who feels easy to coordinate with, who respects your pace, and where you naturally relax. If you keep the tone honest and unforced, the year can reveal which bonds are worth more of your attention."
   },
   "career": {
    "heading": "Work favors steady command",
    "body": "Career-wise, 2027 looks like a year where initiative can actually land. There are periods that support action, influence, and visible results, followed by stretches that ask you to slow down, handle responsibility, and refine your method. For a Water Day Master, this can feel like learning how to direct a stronger current without spilling it.\n\nIn practice, you may see yourself taking the lead more often, handling projects with clearer ownership, or being asked to coordinate moving parts that others avoid. Your Earth and Metal emphasis may help you stay organized, realistic, and good at systems, which is valuable when the year gets busy. The challenge is to keep ambition from becoming pressure for its own sake.\n\nA smart move is to define what “enough” looks like before you enter a busy stretch. Then you can work with focus instead of chasing every possible upgrade. If you keep your standards crisp and your pace deliberate, the year may feel less like a scramble and more like a well-run campaign."
   },
   "study": {
    "heading": "Learning works best in rounds",
    "body": "Your learning life in 2027 may move in waves: some months feel like fresh starts, others like consolidation, and the most useful gains may come from revisiting what you already know. The chart’s Dew · Order pattern suggests that you often learn well when information is organized, refined, and practical rather than scattered. This year seems to support that style strongly.\n\nYou might find yourself drawn to structured courses, skill upgrades, or a clearer method for studying and note-taking. There can also be moments when curiosity spikes unexpectedly, especially when something new connects to an older interest. Rather than chasing every topic, it may help to choose a theme and let it deepen over time.\n\nA simple approach would be to keep one “active” subject and one “quiet” subject at the same time. That way, you can build momentum without feeling mentally crowded. The year seems to reward repetition with purpose, especially when you turn learning into something you can actually use."
   },
   "health": {
    "heading": "Energy stays best when it’s not overbooked",
    "body": "This year’s rhythm suggests that your energy may be strongest when you protect your margins. The Fire tone can bring motivation and speed, but your chart’s overall balance points toward the need for pacing, quiet intervals, and regular reset points. Think of 2027 less as a test of endurance and more as a year of managing load.\n\nIn everyday life, that may show up as feeling best when your schedule has breathing room, your environment is uncluttered, and your commitments are not stacked too tightly. You may notice that too much stimulation makes it harder to settle, while simpler routines help you recover your focus. Because the year includes both ease and pressure, your body and mind may appreciate consistency more than intensity.\n\nTry building small pauses into your day before you feel depleted. A short walk, a calmer evening, or one protected block of quiet can do more than a dramatic reset. The goal is not perfection; it’s keeping your inner rhythm intact enough to enjoy what the year brings."
   }
  },
  "months": [
   {
    "headline": "A gentle restart",
    "body": "February begins with a familiar kind of ease, so you may find it simple to settle back into your own rhythm. The Renewal tone supports fresh energy, but the Caught Off Guard signal suggests that small surprises may slip in when you least expect them."
   },
   {
    "headline": "Simple momentum",
    "body": "March feels comfortable and a little understated, which can be useful if you want to build without pressure. Birth energy often brings a sense that something is beginning, while Friction asks you to smooth out any rough edges before they grow."
   },
   {
    "headline": "Give without draining",
    "body": "April leans toward expression and output, so you may feel pulled to produce, share, or support others. Incubation suggests that what you’re building is still forming, and Wildcard adds a playful unpredictability that works best when you stay flexible."
   },
   {
    "headline": "A wider opening",
    "body": "May can feel fertile, busy, and generous, with Conception encouraging something meaningful to take shape. Fresh Ground points to a good month for trying a new approach, especially if you’re willing to learn as you go."
   },
   {
    "headline": "Take the lead",
    "body": "June is one of the stronger months for direction, results, and practical wins. Reset energy can help you clear old habits, while Magnetism makes it easier to attract attention when your effort is focused and clean."
   },
   {
    "headline": "Quiet control",
    "body": "July keeps the same commanding current, but with a drier, more contained feel. Quiet Storage and Dry Spell suggest that this is a month for conserving effort, choosing priorities carefully, and avoiding the temptation to force more than the moment can hold."
   },
   {
    "headline": "Pressure with depth",
    "body": "August brings more responsibility, and the pace may feel heavier than before. Standstill asks for patience, and the fact that the month’s energy connects closely with your inner self suggests that working with the grain, not against it, can make a big difference."
   },
   {
    "headline": "Steady under demand",
    "body": "September can feel like a month of duties, expectations, and visible standards. Fatigue warns against pushing too hard for too long, while Command supports clear decisions, especially when you keep your boundaries and your priorities visible."
   },
   {
    "headline": "Support returns",
    "body": "October brings a friendlier atmosphere, with help, learning, and recovery more available. Easing Off and Advancement together suggest that progress may come more smoothly if you accept guidance, revisit basics, and let things unfold in a lighter way."
   },
   {
    "headline": "Movement changes things",
    "body": "November is active, mobile, and a little disruptive in a useful way. Full Power gives you access to strong energy, and the clash signal can bring a turning point, so it’s a good month to stay adaptable when plans shift or priorities rearrange."
   },
   {
    "headline": "Quiet completion",
    "body": "December returns to a familiar tone, and the month may feel productive in a restrained, disciplined way. Peak Effort and Minor Setback together suggest that small delays are better handled with patience than with force, especially if you want to finish cleanly."
   },
   {
    "headline": "Inner focus",
    "body": "January closes the cycle with a reflective, inward mood. Momentum is still present, but Inner World points you toward private thinking, sorting, and restocking your sense of direction before the next round begins."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: warm up carefully",
    "body": "Watch for the shift from easy familiarity into active giving. Try one small structure that protects your energy, such as a weekly planning hour or a cap on how many open tasks you carry at once."
   },
   {
    "title": "May to July: focus the push",
    "body": "Notice where effort starts turning into results, and where it starts turning into strain. Choose one priority to advance and one habit to stop feeding, so your momentum stays useful instead of scattered."
   },
   {
    "title": "August to October: steady the pace",
    "body": "Pay attention to the months that feel heavier, then lighter again. Use that arc to practice asking for help earlier, simplifying your schedule, and keeping one recovery ritual non-negotiable."
   },
   {
    "title": "November to January: close and reset",
    "body": "Track the change that arrives with movement and the quieter reflection that follows. Let one project, plan, or routine be wrapped up neatly, then give yourself space to review what actually worked."
   }
  ],
  "closing": "Jordan, 2027 reads like a year that responds well to clear choices and measured confidence. When you work with the flow instead of chasing it, the year can feel both productive and surprisingly calm. The strongest results may come from knowing when to move, when to wait, and when to leave a little room around everything."
 },
 "riley": {
  "year": 2027,
  "title": "2027, your steady season",
  "subtitle": "A year of giving, receiving, and learning when to pace yourself",
  "overview": "2027 feels like a year that asks you to keep moving, but not blindly. For Riley, the Fire of the year meets a Day Master like Wood: your natural tendency is to grow, support, and create, and this year can amplify that. Because your chart leans strongly toward Wood, with Earth and Water as supporting notes and little Fire or Metal, the year may feel especially active in the areas of expression, output, and generosity. That can be rewarding, but it can also ask for better pacing than usual.\n\nThe overall tone is one of Quiet Storage with an Advancement signal: progress is there, but it tends to work best when you build it through consistent effort rather than dramatic leaps. Early in the year, support and replenishment are easier to find; midyear asks for more visible output and a bit more discipline; late summer into autumn brings stronger drive, leadership, and pressure; and the year closes with a return to learning, recovery, and useful perspective. If you let the year be a rhythm instead of a race, it can leave you feeling more capable than depleted.\n\nFor an Oak · Rooted type, this is a useful reminder that strong roots do not mean standing still. They mean knowing when to expand, when to absorb, and when to rest in place. You do not need to force every opening. The most helpful approach is to notice where energy is flowing toward you, where it is flowing out, and how to keep the balance humane.",
  "chapters": {
   "wealth": {
    "heading": "Wealth: grow what can be sustained",
    "body": "This year’s money story looks less like a sudden windfall and more like a strong ability to generate value through your own effort. Because the year’s Fire energy encourages output, it can be easier to earn through visible work, creative contribution, teaching, presenting, or simply being the person who gets things moving. For a Riley with a Wood-heavy chart, that can feel natural, but it also means you may need clear limits so your generosity does not quietly outrun your capacity.\n\nIn everyday life, this might show up as being asked to take on extra tasks, help someone troubleshoot, or turn a skill into something practical. Midyear especially can bring a sense that others notice what you can do, which is encouraging, but it can also make it easy to say yes too quickly. You may find the best results come when you pause before committing, especially in the months when the energy is more productive than replenishing.\n\nA good small step is to choose one simple rule for the year: for example, wait a day before agreeing to any new expense, purchase, or commitment that feels larger than routine. That kind of pause helps you keep the year’s abundance practical rather than scattered."
   },
   "love": {
    "heading": "Love: warmth with boundaries",
    "body": "Relationally, 2027 has a warm, active tone. The year’s Fire can make feelings easier to express, and that can help conversations feel more honest, affectionate, and immediate. For you, that may be especially meaningful because a Wood-rooted nature often wants connection to feel alive and purposeful, not merely polite.\n\nYou may notice more invitations, more visible interest, or more situations where your presence matters. The early months look especially supportive for receiving care, while late summer and autumn may bring sharper edges if everyone around you is moving quickly at once. In those moments, it may help to remember that closeness does not need constant intensity to be real. Sometimes the strongest bond is the one that can breathe.\n\nTry one small practice: say what you appreciate before you say what you need. That gentle order can soften misunderstandings and keep your relationships from feeling like a negotiation. Riley, your warmth is an asset this year, especially when paired with a calm boundary."
   },
   "career": {
    "heading": "Career: visible effort, visible results",
    "body": "Career matters look especially active in 2027. The year supports expression, production, and leadership, so your work may be more visible than usual. If you have been waiting for a chance to show what you can do, this can be a favorable year for that kind of steady exposure. The challenge is that visibility often brings expectations, and those expectations can feel heavier when your own energy is already being spent on creating the result.\n\nIn practical terms, you might be asked to present more often, take ownership of a project, or become the person others rely on to keep momentum going. August especially looks like a turning point month, with movement and a shift in direction, while October and November can feel more demanding but also more formative. Those periods are less about rushing and more about choosing a pace that keeps you effective.\n\nA helpful move would be to keep a short record of what you finish, what you begin, and what drains you. That kind of simple log can help you see whether you are building real progress or just carrying too much at once."
   },
   "study": {
    "heading": "Study: learn by doing, then reflect",
    "body": "Learning in 2027 works best when it has a living purpose. The year supports output, so study is likely to stick when it connects to something you can use, explain, or build. Because your chart already has a thoughtful mix of Wood, Earth, and Water, you may learn well through a blend of structure, reflection, and practical application rather than through theory alone.\n\nYou may notice that the early year feels especially receptive to guidance, feedback, and fresh input, while the middle months favor practice and repetition. In the later months, especially when responsibility rises, you may learn a great deal simply by staying with the task and noticing what changes in your own judgment. That can be a quiet but powerful kind of education.\n\nA small and useful experiment would be to turn each new thing you study into one sentence you could teach someone else. If you can explain it simply, you are likely absorbing it in a way that lasts."
   },
   "health": {
    "heading": "Body and mind: protect your rhythm",
    "body": "This year asks for rhythm more than intensity. Since the year’s Fire energy is something you naturally help feed, it can be easy to spend yourself without noticing until you feel mentally scattered or simply less settled than usual. The good news is that your Oak · Rooted nature is well suited to recovery through consistency: regular sleep, regular meals, regular pauses, and regular time away from noise can do a lot for your sense of steadiness.\n\nIn daily life, you may notice that the more social, productive, or visible months leave you needing quieter evenings afterward. That is not a problem to solve; it is useful information. The months around April and May may feel flatter or less stimulating, while June through November asks for more careful energy management. If you keep a gentler schedule than your ambition would prefer, you are more likely to stay clear and present.\n\nOne easy support is to build a repeatable reset into your week: a walk, a quiet meal, a screen-free hour, or a short journaling session. The point is not to optimize yourself, but to give your system a familiar place to land."
   }
  },
  "months": [
   {
    "headline": "Fresh ground",
    "body": "February opens with support, learning, and a sense that the ground is ready beneath you. Peak effort energy can make the month feel active, but in a helpful way, as if the year is meeting you with a hand on your back. Start something small and let momentum arrive before you ask for more."
   },
   {
    "headline": "Magnetic support",
    "body": "March tends to feel fuller and more attractive, with people, ideas, or opportunities coming closer to you. The month’s strong power can help you gather what you need, especially if you stay open to guidance. This is a good time to notice who feels easy to talk with and what kinds of support actually land."
   },
   {
    "headline": "Quiet stretch",
    "body": "April carries a more familiar, settled tone, but not much novelty. That can feel restful if you allow it, though dryness may show up as boredom or a lack of spark. Choose maintenance over pressure, and use the month to tidy, sort, and simplify."
   },
   {
    "headline": "Tired glow",
    "body": "May keeps the same easy-to-recognize atmosphere, but fatigue may be more noticeable. Exposure can make your efforts visible, which is useful, yet it can also leave you feeling a bit over-extended if you try to keep every plate spinning. Let one thing be enough rather than insisting on many."
   },
   {
    "headline": "Command mode",
    "body": "June brings a stronger push to produce, lead, and give, and the energy can feel stalled if you try to force it in too many directions. This is a month for taking charge of what matters most, not for proving everything at once. A clear priority list will help more than extra speed."
   },
   {
    "headline": "Advancement",
    "body": "July keeps the productive tone, but with a quieter, more contained feel. Progress may come through careful follow-through rather than dramatic action, and that suits the month well. Keep your promises small and your standards kind, and you may notice more movement than expected."
   },
   {
    "headline": "Turning point",
    "body": "August stands out as a month of motion and change, with a sense that something needs to be rearranged. Because this month also brings a clash with your Day Master’s branch, transitions may feel more noticeable than usual. Stay flexible, and treat sudden shifts as signals to reorient rather than as reasons to panic."
   },
   {
    "headline": "Measured drive",
    "body": "September supports ambition, money matters, and the push for results, but minor setbacks may ask you to slow down and check your footing. This is a strong month for practical action, especially if you keep your expectations realistic. If something takes longer than planned, that does not mean it is going poorly."
   },
   {
    "headline": "Inner pressure",
    "body": "October can feel more serious, with responsibility and pressure asking for a steadier pace. The month’s incubation quality suggests that some things are developing out of sight, so it helps to trust process over performance. Choose depth over speed, and you may feel more grounded by the end of it."
   },
   {
    "headline": "Unexpected opening",
    "body": "November brings a more formative tone, and the energy may arrive through a surprising connection or an arrangement that naturally clicks into place. Because this month also carries a sense of being caught off guard, it may reward responsiveness more than planning. Leave some room in your schedule so you can meet what comes without feeling crowded."
   },
   {
    "headline": "Gentle renewal",
    "body": "December returns to support, learning, and recovery, which can feel like a relief after the heavier months. Friction may appear in small ways, but it is more likely to be the kind that helps you adjust than the kind that blocks you. Stay curious, and let the month restore your confidence in gradual progress."
   },
   {
    "headline": "New momentum",
    "body": "January closes the cycle with a fresh current of help and possibility. The energy can feel a little unpredictable, but that may also make it useful for trying a new pattern or revisiting an old idea with better timing. Keep your plans light enough to move with the month, not against it."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive and organize",
    "body": "Watch for early support, useful feedback, and a calmer pace that helps you reset. Try making one simple system for notes, tasks, or expenses so the help you receive has somewhere to land."
   },
   {
    "title": "May to July: pace your output",
    "body": "Notice where effort starts to feel repetitive or draining, especially as visibility and responsibility rise. Choose one project to carry well rather than spreading yourself thin across everything at once."
   },
   {
    "title": "August to October: stay flexible under pressure",
    "body": "Look for shifts, deadlines, and moments when you need to adapt quickly without losing your center. Practice making a short pause before reacting, then decide what truly needs your energy."
   },
   {
    "title": "November to next January: learn, recover, renew",
    "body": "Pay attention to the people, ideas, and routines that restore you as the year closes. Pick one restorative habit and keep it steady so the next cycle begins with more clarity than strain."
   }
  ],
  "closing": "Riley, 2027 does not ask you to become someone else. It asks you to notice your own rhythm more carefully and to trust that steady effort can be just as meaningful as big leaps. If you honor the months that give, the months that demand, and the months that quietly restore, the year can leave you stronger in a very grounded way."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, un año para afinar tu ritmo",
  "subtitle": "Lucía, un ciclo de impulso con pausas útiles, logros visibles y momentos de reorganización",
  "overview": "2027 se siente como un año en el que puedes tomar más iniciativa de la que sueles tomar en otros ciclos. Tu energía de base es Agua, y en tu mapa predominan Tierra 38%, Fuego 25% y Agua 25%, con poco Metal y bastante Madera contenida; eso hace que este año de Fuego te empuje a mover recursos, poner orden en lo importante y convertir intención en resultados. Como el año tiene una relación de control contigo, la clave no parece ser forzar más, sino dirigir mejor: elegir qué sí merece tu energía y qué conviene dejar en pausa.\n\nTambién aparece un tono de recogimiento y mundo interior, así que no todo se juega hacia afuera. Puede haber temporadas de mucha acción y otras en las que te convenga revisar, simplificar y escuchar lo que ya sabes. En un perfil como el tuyo, de orden y rocío, 2027 favorece avanzar con método: menos dispersión, más intención, y pequeños ajustes que hacen que todo encaje mejor. Lucía, si este año te pide algo, quizá sea aprender a sostener el impulso sin perder tu centro.\n\nEn conjunto, el año alterna tres movimientos: expansión, presión y apoyo. Primero hay meses para expresarte y producir; luego, momentos para asumir más responsabilidad y afinar el uso de tus recursos; después, llega una fase más nutritiva, con ayuda, aprendizaje y recuperación. Si respetas ese vaivén, el año puede sentirse menos como una carrera y más como una secuencia de decisiones bien colocadas.",
  "chapters": {
   "wealth": {
    "heading": "Dinero que pide dirección",
    "body": "En lo económico, 2027 favorece tomar decisiones con más claridad que de costumbre. Como el año te da margen para mover recursos y buscar resultados, puede ser un buen periodo para ordenar ingresos, gastos y prioridades con una mirada práctica. Tu mezcla de Tierra fuerte y Agua estable sugiere que te conviene construir sobre lo que ya funciona, no perseguir demasiadas ideas a la vez.\n\nEn la vida diaria, esto puede verse como revisar suscripciones que ya no usas, comparar opciones antes de comprar algo importante o poner límites a pequeños gastos que se acumulan sin ruido. También puede aparecer la sensación de que ciertas oportunidades llegan cuando ya tienes una estructura básica lista, no cuando improvisas. La presencia de poco Metal en tu mapa sugiere que poner reglas simples y visibles puede darte alivio.\n\nEmpieza por una sola costumbre concreta: anota durante un mes qué entra, qué sale y qué compras haces por impulso. Luego elige una regla amable, como esperar 24 horas antes de una compra no esencial o separar una parte fija para tus metas. En 2027 parece más útil cuidar la dirección que perseguir la velocidad."
   },
   "love": {
    "heading": "Vínculos con más tacto",
    "body": "En relaciones y amor, el año mezcla cercanía, malentendidos y momentos de reajuste. Hay meses en los que te sentirás más visible y con ganas de conectar, y otros en los que la comunicación pedirá más cuidado. Como tu tipo tiende al orden, puede que notes con facilidad cuándo algo está desalineado, aunque no siempre convenga decirlo todo de inmediato.\n\nEn lo cotidiano, esto puede parecer una conversación que necesita una segunda lectura, un mensaje que conviene responder con calma o una reunión en la que escuchas más de lo habitual. Septiembre trae un tono de roce y cambio de rumbo, así que ahí ayuda bajar el volumen antes de sacar conclusiones. En cambio, octubre se siente más afín, como si una conversación, una amistad o un vínculo encontraran una forma más natural de encajar.\n\nPrueba a hacer preguntas más abiertas y a verificar lo que entendiste antes de reaccionar. Si algo te importa, dilo de forma simple y concreta, sin adornarlo demasiado. En 2027, los vínculos parecen crecer más por honestidad serena que por intensidad."
   },
   "career": {
    "heading": "Trabajo con impulso y revisión",
    "body": "En lo profesional, 2027 trae una curva interesante: primero producción, luego presión y más tarde apoyo. Los meses de abril a julio favorecen mostrar lo que haces, sacar adelante tareas y mover proyectos con decisión; después, agosto y septiembre piden más responsabilidad y mejor administración del tiempo. Como tu mapa tiene mucha Tierra, el trabajo sostenido y bien estructurado puede rendir más que los cambios bruscos.\n\nEn la práctica, esto puede verse como encargarte de algo que otros dejan para después, ordenar procesos, preparar una propuesta o asumir una función con más visibilidad. También puede aparecer la sensación de que te observan más, no necesariamente para juzgarte, sino porque tu manera de resolver destaca. En septiembre, con una energía de cruce y fricción, conviene revisar instrucciones, plazos y acuerdos antes de avanzar.\n\nTe puede ayudar dividir el trabajo en tramos pequeños y medibles. Elige una tarea importante por semana y ciérrala antes de abrir otra grande. Si aparece una oportunidad para liderar, toma el mando solo hasta donde puedas sostenerlo con calma; en este año, más que empujar sin pausa, conviene avanzar con criterio."
   },
   "study": {
    "heading": "Aprender para ordenar",
    "body": "En aprendizaje, 2027 favorece estudiar de forma práctica, útil y muy conectada con tus necesidades reales. No parece un año para acumular información por acumulación, sino para elegir lo que mejora tu criterio, tu organización o tu capacidad de explicar algo con claridad. La energía de Fuego puede darte entusiasmo, pero tu mejor resultado parece venir cuando lo combinas con método.\n\nEn el día a día, esto puede sentirse como tomar notas más limpias, volver a una lectura pendiente, aprender una herramienta que simplifica tareas o pedir ayuda para entender algo que se te hacía enredado. Octubre y noviembre traen apoyo y recuperación, así que son buenos meses para retomar estudios con menos fricción y más constancia. El ciclo de diez años que atraviesas también sugiere que aprender ahora puede dejar una base útil para etapas posteriores.\n\nEmpieza con un tema pequeño y concreto, no con una lista infinita. Elige un curso corto, un libro o una habilidad que puedas practicar dos veces por semana. Si conviertes el aprendizaje en rutina suave, 2027 te devuelve claridad en lugar de cansancio mental."
   },
   "health": {
    "heading": "Cuidar tu ritmo",
    "body": "En cuerpo y ánimo, el año invita a cuidar la energía como un recurso valioso. No se trata de preocuparte más, sino de notar cuándo estás sosteniendo demasiado y cuándo te conviene bajar una marcha. Con tanta Tierra en tu mapa y un año de Fuego, el exceso de exigencia puede hacerte sentir más pesada la rutina; en cambio, la regularidad simple suele ayudarte a volver a centro.\n\nEn la vida diaria, esto puede verse como días en los que necesitas silencio para ordenar ideas, semanas en las que duermes mejor si cenas antes, o momentos en los que una caminata breve te aclara más que seguir pensando. El tono de mundo interior sugiere que escuchar tus señales internas será especialmente útil. Agosto y septiembre piden más cuidado con el ritmo, mientras que octubre y noviembre se sienten más reparadores.\n\nHaz sitio para una costumbre pequeña que puedas repetir sin negociar demasiado: caminar, estirar, apagar pantallas un poco antes o reservar un rato sin demandas. Si un día te notas dispersa, vuelve a algo básico en vez de intentar arreglar todo a la vez. En 2027, la estabilidad nace más de lo sencillo que de lo perfecto."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "Este mes comparte el mismo tono general del año, así que puede sentirse familiar y fácil de entrar. La sensibilidad está más alta y los malentendidos pueden aparecer por detalles pequeños, por lo que conviene leer con calma antes de responder. Si algo te toca de cerca, es mejor nombrarlo con sencillez que dejarlo crecer en silencio."
   },
   {
    "headline": "Marzo con impulso",
    "body": "La energía sigue siendo afín a la tuya, pero ahora trae una sensación de brote y de arranque. Puede ser un buen momento para asumir un papel más visible o para iniciar algo que venías pensando desde hace tiempo. El liderazgo aparece de forma natural si no intentas dirigirlo todo al mismo tiempo."
   },
   {
    "headline": "Abril que expande",
    "body": "Aquí empiezas a darle más forma a lo que haces, y eso puede hacerte sentir útil y con presencia. Es una etapa de producción y también de gasto de energía, así que lo importante no es hacer más por hacer, sino dejar algo bien terminado. El reconocimiento puede llegar por una tarea bien llevada, no por ruido."
   },
   {
    "headline": "Mayo en movimiento",
    "body": "Mayo trae una semilla que quiere crecer, y eso se nota en la necesidad de moverte, probar y responder a más estímulos. Puede ser un mes muy fértil para conversaciones, proyectos y gestos de generosidad, aunque también exige repartir bien tu energía. Si te dispersas, vuelve al punto de partida y recupera el hilo."
   },
   {
    "headline": "Junio de mando",
    "body": "En junio el año se coloca frente a ti de otra manera: es un mes para tomar decisiones y empujar resultados. Al mismo tiempo, los pequeños contratiempos pueden pedirte paciencia con los tiempos y atención a los detalles. Si algo no avanza a la primera, una segunda revisión puede ahorrarte vueltas."
   },
   {
    "headline": "Julio interior",
    "body": "Julio favorece el recogimiento, así que quizá te resulte más natural cerrar puertas, revisar lo ya hecho y quedarte con lo esencial. No es un mes para demostrar tanto como para ordenar por dentro lo que luego tendrá más fuerza afuera. Lo que aclares ahora te puede sostener durante más tiempo del que parece."
   },
   {
    "headline": "Agosto exigente",
    "body": "Agosto pide más responsabilidad y también más atención a los recursos, así que conviene elegir bien dónde pones tu energía. Puede sentirse como una etapa de presión útil, siempre que no intentes correr más de la cuenta. Ir a un ritmo sostenido te deja mejor parada que querer resolverlo todo en un día."
   },
   {
    "headline": "Septiembre de ajuste",
    "body": "Septiembre trae roce y una sensación de cruce que puede mover planes o conversaciones. Si aparece tensión, piensa primero en ordenar el terreno antes de insistir en tener razón. Este mes te conviene revisar acuerdos, cuidar el tono y aceptar que un cambio de forma puede abrir una salida mejor."
   },
   {
    "headline": "Octubre aliado",
    "body": "Octubre se siente más amable, con ayuda y aprendizaje entrando de manera natural. Como además hay una relación de armonía con tu base, puede ser un mes muy bueno para cooperar, pedir apoyo o aceptar una mano sin dudar tanto. Lo inesperado aquí no desordena: más bien reacomoda a tu favor."
   },
   {
    "headline": "Noviembre reparador",
    "body": "Noviembre trae plenitud y un ritmo más lento, algo que puede venirte bien después de meses más intensos. Las ideas se asientan, el cuerpo agradece menos prisa y las relaciones se vuelven más fáciles de llevar. Si algo cambia de aire, no hace falta empujarlo; basta con dejarle espacio."
   },
   {
    "headline": "Diciembre magnético",
    "body": "Diciembre vuelve a un tono parecido al del año en general, pero con más capacidad de atraer atención y cierre de ciclos. Puede ser un buen mes para terminar lo que estaba pendiente y mostrar resultados con naturalidad. Lo que hagas con constancia ahora tiende a dejar huella."
   },
   {
    "headline": "Enero en espera",
    "body": "Enero mantiene un clima familiar, con una confianza que va subiendo poco a poco. No parece un mes de prisa, sino de preparación y espera inteligente. Si dejas listos los detalles básicos, el siguiente tramo del año te encuentra con más soltura."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Observa cómo se mezcla tu impulso con la necesidad de orden. En estos meses, te puede servir probar una rutina breve para registrar ideas, gastos o tareas, y así ver qué patrones se repiten sin agobio."
   },
   {
    "title": "De mayo a julio",
    "body": "Vigila cuánto das y cuánto te desgastas al producir. Una acción útil puede ser elegir un proyecto principal, ponerle límites claros y reservar un espacio fijo para revisar avances antes de seguir empujando."
   },
   {
    "title": "De agosto a octubre",
    "body": "Fíjate en dónde se acumula la presión y en qué relaciones o tareas necesitan un ajuste fino. Te conviene revisar acuerdos, simplificar pendientes y aceptar ayuda cuando aparezca, sobre todo si una situación cambia de forma inesperada."
   },
   {
    "title": "De noviembre a enero",
    "body": "Observa qué te está nutriendo de verdad y qué ya cumplió su función. Puedes cerrar el año con una limpieza suave de compromisos, dejar una lista corta de prioridades y empezar el siguiente tramo con menos ruido y más claridad."
   }
  ],
  "closing": "2027 no parece pedirte que corras más, sino que elijas mejor dónde poner tu fuerza. Si escuchas el ritmo del año, verás que hay momentos para avanzar, otros para ordenar y otros para dejarte ayudar. Lucía, cuando juntas impulso con método, este ciclo puede sentirse mucho más llevadero y también más fértil."
 },
 "sam": {
  "year": 2027,
  "title": "2027, Your Grounded Turning",
  "subtitle": "A year of support, traction, and careful momentum for Sam",
  "overview": "2027 feels like a year that feeds your core rather than draining it. With a Mountain-like nature and an Order-seeking temperament, you often do best when life has structure, meaning, and a steady pace; this year brings a warmer current that can support recovery, learning, and quieter confidence. Since your Five Elements are fairly even, the year does not push one part of life too hard for too long, which can make balance easier to notice.\n\nThe first half of the year asks for discernment. Some months favor initiative, some ask for patience, and some bring useful pressure that helps you become more capable without needing to force the pace. Sam, this is less about chasing big drama and more about recognizing where support is already arriving, then using it well.\n\nBy the second half, the tone becomes more familiar and then more outward-facing. There may be stretches where things feel comfortable but a little flat, followed by periods that invite expression, sharing, and visible output. If you treat the year as a rhythm to be matched rather than a race to win, it can feel surprisingly coherent.",
  "chapters": {
   "wealth": {
    "heading": "Money likes clear hands",
    "body": "This year’s money flow looks strongest when you keep your aims clean and your moves deliberate. Because the year supports you overall, it’s a good backdrop for noticing where resources, opportunities, or practical help are already available, especially when you’re willing to organize rather than chase. Your Mountain-and-Order style fits this well: steady systems tend to serve you better than scattered effort.\n\nIn daily life, this can look like sorting subscriptions, setting a simple budget rhythm, or noticing which tasks quietly produce the best return on your time. The months around late winter, early spring, and year-end feel more naturally suited to taking the lead, but the caution is to avoid pushing for more just because momentum is available. The strongest gains here may come from consistency, not intensity.\n\nA small step that fits this year: choose one money habit to make visible, such as a weekly check-in, a savings transfer, or a list of repeating expenses. Let the habit be plain and easy to repeat; that’s where this year’s support is most likely to show up."
   },
   "love": {
    "heading": "Warmth with room to breathe",
    "body": "Relationships feel more supported when you let warmth arrive in ordinary ways rather than expecting constant excitement. The year’s overall tone is nourishing, so connection may grow through shared routines, helpful gestures, and being available without overcomplicating things. Because your energy tends to value structure, you may prefer bonds that feel dependable and clear.\n\nYou might notice that some months feel especially easy for conversation, while others ask for a little more patience or quiet observation. Midyear can bring a stronger need to adjust to other people’s timing, and that can actually deepen trust if you don’t rush to fix everything at once. Later in the year, the mood becomes gentler and more familiar, which can be good for low-pressure closeness.\n\nTry one simple practice: say what you mean a little earlier than usual, but keep it soft. A clear message, a kind check-in, or a planned moment together can do more for this year than trying to force a perfect emotional script."
   },
   "career": {
    "heading": "Steady authority, better timing",
    "body": "Career-wise, 2027 looks like a year where you may do well by combining initiative with restraint. There are windows that favor taking charge, especially in the first part of the year and again near the end, but the middle months ask you to slow down enough to handle pressure with skill. For a Mountain type, that can be a strong fit: solid presence often matters more than speed.\n\nIn practice, this could mean being the person who brings order to a messy process, clarifies expectations, or makes a plan easier for others to follow. You may also feel more visible when you express your work more openly in the autumn months, though that can take energy, so pacing matters. The year rewards competence that others can rely on.\n\nA useful experiment would be to define one project or responsibility that you want to hold more cleanly, then break it into smaller checkpoints. That way, your leadership feels grounded rather than heavy, and you can tell the difference between real momentum and simple pressure."
   },
   "study": {
    "heading": "Learning that settles in",
    "body": "Learning this year looks less like frantic accumulation and more like helpful absorption. Because the year is supportive overall, it can be a good time to study, review, or practice something that helps you feel more capable in daily life. Your balanced Five Elements suggest that you may learn best when material is approached evenly, with no single style dominating for too long.\n\nYou may notice that some months are ideal for starting fresh or renewing interest, while others are better for repetition and consolidation. The spring months can support active learning, while late summer and early autumn may feel more familiar but less stimulating, which is actually useful if you need time to let knowledge settle. Later in the year, expression becomes stronger, so showing what you know may come more naturally.\n\nA good approach is to keep one visible learning thread, such as a language habit, a reading list, or a skill notebook. Review it lightly but often; that suits both your Order orientation and the year’s tendency to reward steady integration."
   },
   "health": {
    "heading": "Protect your rhythm",
    "body": "For body and mind, this year is less about warning signs and more about rhythm. The supportive tone can feel restorative, but the months still vary: some invite action, some invite pressure, and some ask for a softer pace. If you respect those shifts, you’re more likely to feel stable and clear rather than pulled around by the calendar.\n\nIn everyday life, you might notice that sleep timing, meal regularity, or screen habits matter more than usual to how settled you feel. The midyear period can feel especially full, so keeping your days simple there may help the most. Later, when the pace softens, you may benefit from quieter spaces, lighter commitments, and time that isn’t immediately filled.\n\nOne small practice to try is a weekly reset: tidy your space, choose the next few priorities, and make room for one unhurried hour. That kind of gentle structure suits your Mountain nature and helps the year’s supportive energy land more fully."
   }
  },
  "months": [
   {
    "headline": "February: first push",
    "body": "This month favors initiative, especially if you’re ready to take the lead or move a practical plan forward. The Birth tone gives things a fresh start, and the On the Move feeling may make it easier to get traction quickly. Just keep an eye on eagerness so the pace stays useful rather than scattered."
   },
   {
    "headline": "March: quick correction",
    "body": "March still supports action, but the Renewal tone suggests refining as you go rather than forcing a straight line. A Minor Setback can simply mean one detail asks for a second look, not that the whole effort is off track. Small corrections may save time later."
   },
   {
    "headline": "April: pressure with purpose",
    "body": "April brings more responsibility, and the Momentum feeling can help you build strength through focus. The Inner World theme suggests that some of your best progress may happen quietly, behind the scenes. Choosing your speed carefully may matter more than trying to do everything at once."
   },
   {
    "headline": "May: steady endurance",
    "body": "May keeps the pressure on, but the Peak Effort tone points to meaningful effort rather than chaos. With Caught Off Guard in the mix, it helps to leave a little room in your schedule for surprises. A slower response can be wiser than an instant reaction."
   },
   {
    "headline": "June: support arrives",
    "body": "June feels more nourishing, and the Full Power tone can make help, learning, or recovery easier to notice. Because the month also carries Friction and a clash-like push with your inner ground, you may feel that progress comes with a little tension. Letting other people or systems assist you could make the difference."
   },
   {
    "headline": "July: softer current",
    "body": "July continues the supportive trend, but with a more relaxed feel. The Easing Off tone can make life feel lighter, while the Wildcard note suggests small surprises that are best met with curiosity. This is a good month for adjusting rather than proving anything."
   },
   {
    "headline": "August: familiar ground",
    "body": "August feels comfortable and recognizable, though perhaps less stimulating. Fatigue here does not have to mean exhaustion; it can simply mean your system prefers a slower rhythm. Fresh Ground suggests that even in a familiar setting, a new habit or perspective could take root."
   },
   {
    "headline": "September: quiet magnetism",
    "body": "September keeps the tone steady, but Standstill may make outward progress feel paused. That pause can still be useful, especially with Magnetism adding a subtle pull toward people, ideas, or places that naturally fit you. Let what feels aligned come toward you instead of chasing movement."
   },
   {
    "headline": "October: generous output",
    "body": "October becomes more expressive, and Quiet Storage can make your output feel purposeful rather than flashy. The Dry Spell note suggests that energy may need to be used carefully, especially if you’re giving a lot to others. Choose where your effort goes so you don’t spread yourself thin."
   },
   {
    "headline": "November: visible edges",
    "body": "November continues the expressive trend, and Reset can help you clear space for the next phase. Exposure may make your work or choices more visible, which can be useful if you’re ready to share, present, or publish something. Keep your standards steady, but don’t wait for perfect conditions."
   },
   {
    "headline": "December: take the lead",
    "body": "December returns to a more directive tone, making it a strong month for deciding, organizing, and aiming at a concrete result. Conception suggests something new can begin taking shape, even if it is still small. Command adds a sense of authority, so this is a good time to define the frame clearly."
   },
   {
    "headline": "January: quiet launch",
    "body": "January carries the year’s decisive energy into a more inward phase, so progress may feel subtle but real. Incubation suggests that something important is forming beneath the surface, and Advancement adds forward motion when the timing is right. If you keep the structure simple, the month can set up a strong next step."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: build the frame",
    "body": "Watch for the early-year push to bring more initiative and then a rise in responsibility. Try one concrete action: create a short weekly plan with only three priorities, so your momentum has a clear container."
   },
   {
    "title": "May to July: pace the middle",
    "body": "Watch for pressure, surprise, and then a softer supportive turn. Try one concrete action: leave one flexible block in your week and use it for recovery, review, or catching up instead of adding a new obligation."
   },
   {
    "title": "August to October: let things settle, then speak",
    "body": "Watch for a quieter stretch followed by a more expressive one. Try one concrete action: keep a simple note of what you’ve learned or produced, then share one useful piece of it when the time feels ripe."
   },
   {
    "title": "November to January: close cleanly, open lightly",
    "body": "Watch for visibility, firmer leadership, and then a more inward beginning. Try one concrete action: finish one lingering task, then write down the single direction you want to carry into the next cycle."
   }
  ],
  "closing": "Sam, 2027 looks like a year that helps you become more yourself without demanding that you do everything at once. The strongest thread is not speed, but trustworthy timing: knowing when to press, when to absorb, and when to let things settle. If you move with that rhythm, the year can feel less like a test and more like a well-supported unfolding."
 },
 "mia": {
  "year": 2027,
  "title": "2027, a steadier fire",
  "subtitle": "A year of pressure, pacing, and quiet strength for Mia",
  "overview": "2027 feels like a year that asks you to become more deliberate with your strength. Fire is active and visible, while your core Metal nature tends to prefer shape, clarity, and clean edges; together, that can create useful pressure. Because your Five Elements lean strongly toward Wood, there may be plenty of motion, ideas, and giving, but not always equal room for rest. Mia, this makes the year less about rushing and more about choosing your pace so that effort turns into something durable.\n\nThe overall tone is one of being tempered rather than softened. The year’s energy can feel like a forge: it brings responsibility, sharper deadlines, and moments where you notice what holds and what doesn’t. At the same time, your chart type, Steel · Harvest, suggests you do well when you turn effort into something practical, refined, and worth keeping. If you stay close to what is workable, make fewer but cleaner commitments, and let your timing be intentional, 2027 can feel surprisingly solid.\n\nThere’s also a playful edge in the background, with a Wildcard quality that keeps the year from becoming too predictable. That can show up as sudden changes in plans, unusual people, or a need to respond rather than pre-plan everything. The good news is that your chart already has enough Metal to support discernment. In plain terms: you don’t need to say yes to everything. You’ll likely feel best when you protect your focus, use momentum in short bursts, and leave room for adjustments without taking them personally.",
  "chapters": {
   "wealth": {
    "heading": "Wealth: make gains with shape, not force",
    "body": "This year’s money and value themes look more active than passive. Fire can be a testing element for Metal, so the flow around earning, spending, and deciding what is worth your energy may feel sharper than usual. Because your Five Elements show a strong Wood presence, there can be many things asking for attention at once; the key is to let your resources follow your priorities instead of scattering them.\n\nIn daily life, this might look like being drawn to useful purchases, practical upgrades, or projects that seem promising but need a clear boundary before you commit. You may also notice that generosity comes easily, especially when something feels meaningful. That can be beautiful, but it’s worth checking whether a choice is truly supportive or just attractive in the moment.\n\nA helpful starting point is to keep your own simple rule for what counts as a good use of money or effort. You might compare options, pause before agreeing to new costs, and favor things that last. For Mia, this is less about strictness and more about clean lines: when you know what you’re building, your resources tend to behave better."
   },
   "love": {
    "heading": "Relationships: warmth with clear edges",
    "body": "Relationship energy in 2027 looks lively, expressive, and occasionally a little intense. When Fire is strong, it can bring visibility, attraction, and faster reactions; for a Metal Day Master, that often means you notice very quickly what feels genuine and what feels forced. With your chart’s strong Wood influence, you may also find yourself giving a lot of attention, care, or initiative to others.\n\nIn everyday moments, this could show up as wanting deeper conversations, clearer intentions, or more mutual effort. Some months may feel social and open, while others may ask you to set a firmer boundary around your time. The important thing is not to confuse speed with closeness. A connection can feel exciting without needing to be rushed.\n\nA gentle practice is to ask yourself whether a relationship leaves you clearer or more drained after contact. If you like, Mia, use that as a small compass. You don’t need to over-explain your limits; steady honesty, simple follow-through, and a little breathing room can keep your connections both warm and sustainable."
   },
   "career": {
    "heading": "Career: pressure that can shape mastery",
    "body": "Work and public life look like one of the clearest arenas of this year. The year’s Fire quality can bring responsibility, visibility, and a stronger sense that your actions are being noticed. For someone with a Steel · Harvest profile, that can be productive: steel becomes useful when it’s forged, and harvest becomes meaningful when timing is respected.\n\nYou may encounter situations that ask for quicker decisions, sharper standards, or more accountability. That doesn’t necessarily mean doing more for the sake of more; it may simply mean that your choices carry more weight. At times, the best move may be to slow the pace just enough to protect quality, especially if several things are competing for your attention.\n\nA practical approach is to define what “good enough” means before the pressure rises. Keep your standards clear, but don’t let them become rigid. When you work in shorter, focused stretches and leave a little room for revision, you’re more likely to turn effort into visible results without burning through your energy too fast."
   },
   "study": {
    "heading": "Learning: absorb, refine, and keep only what fits",
    "body": "Learning in 2027 looks especially useful when it’s tied to application. The year brings moments of output and pressure, so study may feel best when it helps you sharpen a skill, make something concrete, or solve a real problem. Your strong Wood balance can make curiosity abundant, but abundance works best when it has a clear container.\n\nIn practice, you might find yourself drawn to courses, books, or methods that give immediate structure rather than endless theory. There may also be phases when you need to revisit basics, because the year favors refinement over novelty alone. That can be a good thing: returning to fundamentals often reveals what you were ready to understand all along.\n\nA good first step is to choose one thread to deepen instead of trying to learn everything at once. Make notes in a way that is easy to reuse, and test what you learn through small projects or conversations. For Mia, the year supports learning that becomes visible in real life, not just stored in the mind."
   },
   "health": {
    "heading": "Body and mind: pace first, intensity second",
    "body": "The rhythm of the year suggests that your energy may be best managed through pacing rather than pushing. Fire can brighten and mobilize, but it can also make life feel faster than your system wants it to be. Since your chart already carries a lot of Wood, there may be a tendency to keep reaching, planning, or responding; the most helpful counterbalance is often a calmer schedule with clearer transitions.\n\nIn ordinary life, this could mean noticing when your days become too full of inputs, too many tabs, or too many unfinished threads. You may feel better with simple routines, clean work blocks, and moments that help you reset between demands. The goal is not to live slowly all the time, but to avoid spending every day at full tilt.\n\nA small practice that fits this year is to build in pauses before and after commitments. Take a short walk, sit without a screen, or leave a little space between tasks. Those tiny gaps can help you keep your strength available for what matters most, instead of letting it leak away in constant motion."
   }
  },
  "months": [
   {
    "headline": "February: new footing",
    "body": "This month brings a reset quality and a sense that movement starts by changing your stance. Because the relationship is one of support-through-expression, you may feel busier, more visible, or more inclined to give something out into the world. The clash-like tension in the background can make the shift feel real, so choosing what to keep steady matters more than trying to control everything."
   },
   {
    "headline": "March: early output",
    "body": "March continues the giving-and-producing rhythm, but with a softer, more forming quality. A minor setback tone suggests that small delays or revisions are easier to handle when you expect them in advance. This is a good month to let ideas settle before you promise too much."
   },
   {
    "headline": "April: quiet leverage",
    "body": "April turns the focus toward shaping outcomes and taking the lead with more intention. The incubation mood favors work done behind the scenes, where pressure can be turned into structure. If you keep your plans compact, the month may feel more manageable than it first appears."
   },
   {
    "headline": "May: sudden opening",
    "body": "May has a fresh-start feeling, and the support of a joining influence can make things click into place in surprising ways. The caught-off-guard note suggests that plans may shift faster than expected, but not necessarily in a bad way. Stay flexible enough to recognize when something is aligning on its own."
   },
   {
    "headline": "June: steady pressure",
    "body": "June brings a more demanding tone, where responsibility and friction sit close together. Because the relationship is one of being tempered, the month works best when you choose your pace carefully rather than trying to carry everything at once. Slow, consistent effort is more useful here than a burst of force."
   },
   {
    "headline": "July: unpredictable heat",
    "body": "July keeps the pressure theme going, but with a wildcard quality that makes the month less easy to predict. You may need to respond on the spot or adjust plans without taking the change too personally. The more room you leave for improvisation, the easier it is to keep your footing."
   },
   {
    "headline": "August: help arrives",
    "body": "August shifts toward support, learning, and recovery. Fresh ground energy can make this a good time to try something with a beginner’s mind, even if you’ve been carrying a lot earlier in the year. The month favors practical help, useful guidance, and a lighter grip on perfection."
   },
   {
    "headline": "September: strong resonance",
    "body": "September feels more magnetic and full-power, with support becoming easier to notice. This is a good month for attracting useful contacts, good feedback, or a sense that your efforts are landing. Let yourself receive as much as you give; that balance matters here."
   },
   {
    "headline": "October: familiar ground",
    "body": "October settles into a more familiar rhythm, which can feel comforting even if it brings less novelty. The dry-spell note suggests that inspiration may need to be invited rather than assumed. Keep your standards, but don’t demand constant freshness from yourself."
   },
   {
    "headline": "November: low spark",
    "body": "November can feel a little more tiring or exposed, as if the year is asking for simple honesty rather than performance. This is a month to notice where your energy goes when nothing is hidden by momentum. A quieter schedule and cleaner priorities can make a real difference."
   },
   {
    "headline": "December: firm voice",
    "body": "December returns to the theme of expression and output, but with more authority behind it. The command quality suggests that your words or choices may carry extra weight, so it helps to speak with clarity and avoid overexplaining. What you define now can carry into the next cycle with more shape."
   },
   {
    "headline": "January: quiet build",
    "body": "January continues the productive thread, though in a more contained and stored-up way. Advancement is present, but it may look like preparation, consolidation, or a small step that sets something larger in motion later. This is a good time to finish cleanly and leave yourself ready."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: set the frame",
    "body": "Watch for rising output, stronger visibility, and the urge to say yes quickly. Try one concrete boundary: choose a daily limit for new commitments, messages, or tasks, so your energy goes into what actually matters."
   },
   {
    "title": "May to July: pace the pressure",
    "body": "Notice where momentum turns into strain, especially when plans change suddenly or responsibilities stack up. Pick one stabilizing habit, such as a mid-day pause or a weekly review, and use it to keep your pace steady."
   },
   {
    "title": "August to October: receive and refine",
    "body": "Pay attention to helpful people, useful feedback, and periods when learning feels easier. Take one skill, tool, or project and improve it through repetition, rather than chasing too many new directions at once."
   },
   {
    "title": "November to January: simplify and store",
    "body": "Watch for a quieter, more inward rhythm that favors closure over expansion. Make one clean finish each week, whether that means wrapping up a task, clearing a space, or writing down what you want to carry forward."
   }
  ],
  "closing": "2027 doesn’t ask you to become someone else; it asks you to use your strength with more intention. For Mia, that can mean fewer rushed choices, more honest pacing, and a better sense of what truly deserves your fire. If you let the year shape you without letting it hurry you, it has a way of leaving you sturdier than before."
 },
 "casey": {
  "year": 2027,
  "title": "2027, un año para afinar tu ritmo",
  "subtitle": "Entre presión, impulso y recuperación, tu mapa pide paso firme y pausas bien elegidas",
  "overview": "2027 se siente como un año que te pide temple. Con un Maestro del Día de Metal y una distribución muy marcada entre Madera 38% y Metal 38%, tu mapa ya habla de tensión creativa entre empuje y estructura; además, la ausencia de Agua sugiere que te conviene cuidar los espacios de pausa, claridad y recuperación para no ir siempre al límite. Casey, no es un año para forzar todo a la vez, sino para elegir bien el ritmo con el que avanzas.\n\nLa energía de este año trae una mezcla interesante: por momentos te empuja a producir, mostrar y sostener más de lo habitual, y en otros te ofrece apoyo, aprendizaje y una sensación de base más sólida. Como tu tipo es \"El acero · Cosecha\", el año puede sentirse como un proceso de afinar lo que ya existe: menos dispersión, más precisión. Si aceptas que no todo se resuelve a la primera, la presión puede volverse forma.\n\nTambién aparece un tono de imprevistos, no como advertencia dramática, sino como recordatorio de que conviene dejar margen para ajustes. En vez de apurarte por cerrar cada cosa rápido, te irá mejor si reservas aire para revisar, corregir y ordenar. Lo más valioso de 2027 parece estar en aprender cuándo empujar y cuándo dejar que la forma se asiente.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso propio",
    "body": "En lo material, el año tiende a moverte entre dos fuerzas: meses en los que puedes generar, ofrecer o producir más, y otros en los que conviene tomar el control con más decisión. Para tu mapa, que ya viene muy cargado hacia Madera y Metal, esto sugiere que el dinero funciona mejor cuando lo conectas con tareas concretas, orden y criterio, no con impulsos. El 2027 no se ve como una carrera de velocidad, sino como una práctica de administración fina.\n\nEn la vida diaria, esto puede verse en encargos que llegan por tu capacidad de resolver, en cambios de prioridad dentro de proyectos, o en decisiones donde conviene revisar dos veces antes de comprometer recursos. En mayo, por ejemplo, la energía favorece que algo se adhiera con facilidad, así que podrías notar que una oportunidad, gasto o acuerdo se vuelve más absorbente de lo esperado. Más adelante, entre agosto y septiembre, el apoyo llega con más suavidad y puede sentirse como un alivio para ordenar mejor lo que ya está en marcha.\n\nTe ayudará empezar por un gesto simple: separar lo urgente de lo importante en una lista breve y revisar qué sí merece tu energía. Si en abril, mayo o diciembre te notas con ganas de empujar más de la cuenta, conviene que Casey se haga una pregunta muy concreta: ¿esto suma estructura o solo añade movimiento? Esa pausa pequeña puede cambiar mucho el resultado."
   },
   "love": {
    "heading": "Vínculos que se mueven",
    "body": "En relaciones y afectos, 2027 trae un tono dinámico: hay meses en los que das más de lo que recibes, y otros en los que el vínculo se siente más cercano, más natural o más fácil de sostener. Con una base de Metal fuerte y Agua ausente, tu forma de relacionarte puede beneficiarse de gestos claros, conversaciones directas y tiempos de silencio bien puestos, sin exigir que todo se explique de inmediato. La clave no parece ser intensificar, sino afinar la calidad del contacto.\n\nPuedes notar esto en encuentros que cambian de dirección, en conversaciones que piden más precisión, o en momentos en que un vínculo se vuelve más cercano porque hay menos esfuerzo por aparentar. Febrero trae movimiento y un cierre de ciclo emocional; mayo, en cambio, puede acercar mucho a alguien o a una dinámica ya existente. En octubre y noviembre, el clima se vuelve más parecido a lo conocido, con menos sorpresa y más necesidad de cuidado mutuo.\n\nUn primer paso útil sería observar qué relaciones te dejan espacio para respirar y cuáles te piden demasiada adaptación. En lugar de responder rápido a todo, prueba a contestar con una frase más clara y un poco más breve. Así, tu manera de vincularte puede ganar firmeza sin perder calidez."
   },
   "career": {
    "heading": "Trabajo con más filo",
    "body": "En trabajo y carrera, el año parece pedirte precisión, resistencia y buen criterio para administrar la presión. La energía de 2027 te pone frente a responsabilidades que pueden aumentar, pero también te ofrece una oportunidad de mostrar solidez si eliges bien el ritmo. Con tu mezcla de Metal fuerte y Madera alta, puedes sentir el impulso de avanzar y, al mismo tiempo, la necesidad de poner límites a la dispersión.\n\nEn la práctica, esto puede verse en proyectos que exigen más entrega, en tareas donde tu capacidad de ordenar se vuelve visible, o en periodos donde la visibilidad crece porque otros notan tu constancia. Abril y mayo favorecen empuje y resultados; junio y julio, en cambio, piden más temple y menos prisa. Hacia diciembre y enero, la energía vuelve a expandirse a través de lo que produces y compartes, aunque conviene cuidar el cansancio acumulado de tantas vueltas.\n\nUna forma sencilla de aprovechar el año es trabajar por bloques cortos y con objetivos muy concretos. Si tienes que elegir, prioriza lo que te deja una base más estable antes que lo que solo promete movimiento inmediato. En 2027, avanzar con método puede darte más que correr detrás de cada cambio."
   },
   "study": {
    "heading": "Aprender con paciencia",
    "body": "En aprendizaje, formación y desarrollo personal, 2027 se ve como un año fértil, pero no siempre lineal. Hay tramos en los que lo nuevo entra con fuerza, otros en los que se asienta en silencio, y también momentos en los que lo mejor no es absorber más, sino integrar lo ya aprendido. Para un mapa como el tuyo, con mucha tensión entre impulso y forma, estudiar puede volverse una manera de ordenar la mente si no lo conviertes en una competencia.\n\nPuedes encontrarte con ideas que aparecen por repetición, con pequeñas trabas que te obligan a repasar, o con momentos en los que la comprensión llega después de una pausa. Marzo y abril son buenos para sembrar algo; agosto y septiembre, para dejar que ese aprendizaje madure; octubre y noviembre, para revisar con calma. No hace falta que todo se entienda al instante: el año también valora el proceso de maduración lenta.\n\nTe conviene empezar por un formato sencillo: una nota corta, una lectura breve o una práctica repetida en horarios parecidos. Si Casey reserva un espacio fijo para aprender, aunque sea pequeño, la constancia puede pesar más que la intensidad. En este año, el conocimiento parece crecer mejor cuando se deja respirar."
   },
   "health": {
    "heading": "Cuidar el ritmo interno",
    "body": "En bienestar cotidiano, 2027 te invita a cuidar el ritmo más que la fuerza. La ausencia de Agua en tu mapa suele hacer más importante lo que refresca, calma y ordena por dentro: descanso real, pausas breves, tiempos sin exigencia y actividades que bajen el ruido mental. No se trata de hacer más, sino de no vivir siempre en modo presión.\n\nEn la vida diaria, esto puede sentirse como días en los que haces mucho y luego notas que necesitas recomponerte, o como semanas en que la claridad aparece después de bajar un poco el volumen externo. Junio y julio pueden traer más intensidad emocional y cierta sensibilidad a los roces; agosto y septiembre, en cambio, favorecen recuperación y alivio. Más adelante, noviembre pide un cuidado más consciente de tus tiempos y de tus conversaciones.\n\nUna acción simple sería revisar tu semana y marcar un bloque pequeño que no se negocie: caminar, leer, dormir mejor, comer con calma o simplemente no llenar cada hueco. Si lo haces de forma regular, tu energía puede sostener mejor la presión del año. Tu cuerpo y tu ánimo agradecerán menos prisa y más continuidad."
   }
  },
  "months": [
   {
    "headline": "Febrero: cierre en movimiento",
    "body": "Este mes activa una energía de cierre de ciclo: algo se termina, se suelta o cambia de forma, y eso puede traer más movimiento del habitual. Con la relación de \"yo impulso esta energía\" y el choque con tu rama terrestre, el mes pide flexibilidad y ganas de reacomodar. Si cambias de plan sin pelearte con el giro, todo fluye mejor."
   },
   {
    "headline": "Marzo: semilla discreta",
    "body": "Marzo favorece sembrar sin prisa, aunque aparezcan pequeños contratiempos. Es un buen mes para empezar algo que no necesita brillo inmediato, sino constancia. Lo que hagas ahora puede parecer pequeño, pero deja raíz."
   },
   {
    "headline": "Abril: foco y empuje",
    "body": "La energía se vuelve más útil para tomar iniciativa, ordenar metas y mover recursos con intención. El crecimiento es silencioso, así que puede que avances sin demasiado ruido, pero con más fondo del que parece. Si trabajas con una idea clara, el mes responde bien."
   },
   {
    "headline": "Mayo: unión útil",
    "body": "Aquí la energía se pega a lo concreto y puede volver más fácil cerrar acuerdos o sostener una meta material. Al mismo tiempo, conviene mirar con atención los recursos, porque algo puede absorber más de lo previsto. Un vínculo, proyecto o hábito puede quedarse contigo con mucha fuerza."
   },
   {
    "headline": "Junio: presión sensible",
    "body": "Junio trae una sensación de responsabilidad más intensa y de piel emocional más fina. Los posibles roces no tienen por qué crecer si eliges respuestas simples y directas. Ir más despacio en lo importante puede ahorrarte tensión."
   },
   {
    "headline": "Julio: firmeza serena",
    "body": "La confianza sube, pero el mes también trae imprevistos, así que conviene sostener el paso con atención. Es un buen momento para confiar en tu criterio sin aferrarte a una sola ruta. Si algo cambia, la adaptación vale más que la rigidez."
   },
   {
    "headline": "Agosto: apoyo que nutre",
    "body": "Este mes entra ayuda, aprendizaje y una sensación de recuperación más clara. El esfuerzo empieza a dar fruto, aunque no siempre de forma espectacular. Un cambio de aire, incluso pequeño, puede devolverte perspectiva."
   },
   {
    "headline": "Septiembre: plenitud suave",
    "body": "Septiembre se siente como un punto de mayor plenitud y magnetismo. Las cosas pueden alinearse con menos fricción, y eso favorece encuentros, avances y entendimiento. Aprovecha la fluidez para consolidar, no para dispersarte."
   },
   {
    "headline": "Octubre: ritmo más lento",
    "body": "El mes se parece a un paso conocido, cómodo y algo más pausado. Con tiempo de espera en el fondo, conviene no apurar respuestas ni forzar novedades. Lo estable puede ser más útil que lo llamativo."
   },
   {
    "headline": "Noviembre: cuidado y claridad",
    "body": "Noviembre pide atención a ti y a tus palabras, porque pueden surgir malentendidos si todo se dice deprisa. Es un mes para cuidarte con más conciencia y revisar lo que das por entendido. Una conversación breve y precisa puede evitar enredos."
   },
   {
    "headline": "Diciembre: ordenar lo hecho",
    "body": "Diciembre trae una pausa para ordenar y revisar lo que ya construiste. La energía de liderazgo aparece, pero más como responsabilidad que como exhibición. Si cierras asuntos con calma, llegas mejor al siguiente tramo."
   },
   {
    "headline": "Enero: recogimiento útil",
    "body": "Enero invita a recogerte un poco, no para detenerte, sino para integrar. También puede traer reconocimiento, así que conviene recibirlo sin correr a multiplicarte. Lo que sostengas con calma ahora prepara un inicio más limpio."
   }
  ],
  "action_plan": [
   {
    "title": "2 a 4 de abril: sembrar con orden",
    "body": "Observa si aparece impulso por producir más de lo que tu energía real sostiene. Te ayudará empezar una lista breve de prioridades y elegir solo una meta principal para estos meses, de modo que tu avance tenga raíz y no solo velocidad."
   },
   {
    "title": "5 a 7 de julio: dosificar la presión",
    "body": "Mira si la responsabilidad empieza a sentirse más pesada o si los cambios te exigen más adaptación. Conviene dividir tareas grandes en pasos pequeños, dejar margen para imprevistos y revisar una vez más antes de cerrar decisiones."
   },
   {
    "title": "8 a 10 de octubre: aprovechar el apoyo",
    "body": "Fíjate en dónde llega ayuda, claridad o una sensación de recuperación. Puedes usar este tramo para aprender, consolidar acuerdos y ordenar hábitos, eligiendo una rutina simple que sea fácil de sostener."
   },
   {
    "title": "11 a 1 de enero: cerrar y recoger",
    "body": "Observa si aparecen más silencios, necesidad de cuidado o mensajes que conviene aclarar con calma. Te sentará bien revisar pendientes, poner orden en lo acumulado y quedarte con una sola intención clara para empezar el nuevo tramo."
   }
  ],
  "closing": "Casey, 2027 no parece pedirte que corras más, sino que elijas mejor dónde poner tu fuerza. Cuando un año trae presión, apoyo, empuje y pausa en distintos momentos, el verdadero talento está en leer el momento y no pelearte con él. Si te mueves con precisión, este puede ser un año muy útil para afinarte por dentro y por fuera."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027, 지수님의 리듬을 읽는 해",
  "subtitle": "표현은 늘고, 속도는 골라야 편한 한 해",
  "overview": "2027년은 지수님에게 ‘밖으로 나가는 힘’이 커지는 해로 읽혀요. 중심 기운이 나무처럼 뻗는 성향인데, 올해는 불의 기운이 더해져 표현·생산·베풂이 자연스럽게 늘기 쉬워요. 다만 그만큼 에너지도 많이 쓰이기 쉬우니, 많이 하는 것보다 무엇을 어디까지 할지 정하는 감각이 중요해 보여요.\n\n또 지수님은 전체적으로 토의 비중이 큰 편이라, 생각과 책임을 한곳에 모아 버티는 힘이 있어요. 여기에 ‘거목 · 성취’의 결이 더해지면 큰 그림을 보는 데 강점이 생기지만, 속도가 붙는 해에는 혼자 다 떠안지 않는 편이 편했어요. 올해는 도움을 받는 구간과 밀어붙이는 구간이 번갈아 나타나니, 흐름을 읽고 리듬을 조절하는 것이 핵심이에요.\n\n특히 4~7월은 익숙한 일을 넓히거나 보여 주는 데 힘이 실리고, 8~11월은 주도권과 책임이 함께 커지기 쉬워요. 반대로 2~3월, 12월~다음해 1월에는 배움이나 회복, 정리의 도움을 받기 좋은 편이라, 지수님에게는 ‘달리는 해’이면서도 ‘다시 채우는 해’로 보입니다.",
  "chapters": {
   "wealth": {
    "heading": "성과를 고르는 돈의 흐름",
    "body": "올해 재물운은 ‘밀어붙이는 힘’보다 ‘선택하는 힘’이 더 중요하게 느껴질 수 있어요. 8~9월처럼 내가 기운을 다스리는 구간엔 성과를 만들고 싶어지는 마음이 커지지만, 오행 분포상 이미 토의 비중이 큰 편이라 이것저것 모두 붙잡기보다 우선순위를 세우는 쪽이 더 편했어요.\n\n일상에서는 제안이 늘거나, 해오던 일을 확장해 보자는 이야기를 듣는 장면이 있을 수 있어요. 이때 지수님은 ‘할 수 있나’보다 ‘지금 해도 되는가’를 한 번 더 따져보는 편이 좋아요. 특히 8월엔 이동이나 변화의 기운이 섞여 있어 지출의 방향이 쉽게 흔들릴 수 있으니, 계획을 짧게 나눠 보는 감각이 도움이 돼요.\n\n작게 시작한다면, 큰 결정을 미루라는 뜻이 아니라 항목을 나눠 적어 보는 것부터 좋아요. 고정적으로 나가는 것, 한 번만 드는 것, 나중으로 넘겨도 되는 것을 구분해 두면 올해의 성과가 더 또렷해져요."
   },
   "love": {
    "heading": "가까워졌다가 다시 맞추는 관계",
    "body": "관계와 연애는 초반에 도움과 연결이 잘 들어오다가, 봄에 한 번 속도가 붙는 흐름으로 보입니다. 3월처럼 내 일상과 잘 붙는 달에는 대화가 자연스럽고, 함께 움직이기 쉬워요. 반면 4월에는 부딪힘의 기운이 들어와 서로의 방식이 또렷해질 수 있으니, 오해를 바로 결론내기보다 템포를 맞추는 쪽이 편했어요.\n\n일상에서는 연락이 잦아지거나, 오랜만에 만난 사람과 다시 가까워지는 장면이 있을 수 있어요. 5월에는 익숙함이 편안하게 느껴지지만 새 자극은 적을 수 있고, 7월에는 반안살의 영향처럼 관계 안에서 역할이나 태도가 더 분명해지기 쉬워요. 지수님은 관계를 키우는 데 능한 편이지만, 올해는 ‘내가 얼마나 주는지’와 ‘상대가 어떻게 받는지’를 같이 보는 감각이 중요해요.\n\n작게 시작한다면, 중요한 이야기를 길게 끌기보다 짧고 분명하게 남겨 보세요. 만나기 전 기대를 한 줄로 정리하거나, 대화 후에 내가 편했던 지점을 적어 두면 관계의 결이 더 선명해져요."
   },
   "career": {
    "heading": "보여 주고, 고르고, 정리하는 일",
    "body": "일과 커리어는 올해 지수님에게 가장 눈에 띄게 움직이는 분야예요. 6~7월에는 표현과 생산의 힘이 커져서, 결과물을 보여 주거나 사람들 앞에서 드러내는 일이 잘 맞을 수 있어요. 거목 같은 성향에 성취의 결이 있는 분이라, 올해는 ‘크게 키우는 것’보다 ‘잘 보이게 정돈하는 것’이 더 강점으로 살아날 가능성이 있어요.\n\n일상에서는 맡은 일이 늘거나, 설명과 전달을 많이 해야 하는 장면이 있을 수 있어요. 10~11월에는 책임과 압박이 함께 커질 수 있지만, 속도를 스스로 조절하면 오히려 실력이 단단해지는 편이에요. 특히 11월의 겁살 기운은 마음이 급해질 때가 있어도, 한 번 더 확인하고 넘어가는 습관이 힘이 돼요.\n\n작게 시작한다면, 한 번에 크게 바꾸기보다 ‘보여 줄 것 1개, 정리할 것 1개’를 정해 두세요. 올해는 일의 양보다 구조가 중요해서, 자신이 맡은 범위를 선명하게 적어 두는 것만으로도 훨씬 편해질 수 있어요."
   },
   "study": {
    "heading": "채우고 익히는 배움의 해",
    "body": "배움은 올해 지수님에게 잘 맞는 숨 고르기예요. 2~3월과 12월~다음해 1월에는 도움·배움·회복의 흐름이 들어와, 새로 익히거나 다시 정리하기 좋은 때로 보입니다. 특히 화와 수가 비어 있는 분포라, 머리로만 버티기보다 외부의 설명, 자료, 스승 같은 ‘채워 주는 정보’를 받아들이면 훨씬 편했어요.\n\n일상에서는 앞서 배운 것을 다시 꺼내 쓰거나, 혼자보다 함께 공부할 때 이해가 빨라지는 장면이 있을 수 있어요. 3월은 붙는 힘이 강해 집중이 잘 되고, 12월은 목욕의 기운처럼 정리와 환기가 필요해 보여요. 지수님은 큰 그림을 잘 보는 편이라, 배움도 전체를 한 번에 잡기보다 예시를 붙여 익히는 쪽이 잘 맞아요.\n\n작게 시작한다면, 한 달에 하나의 주제만 잡아도 충분해요. 강의를 많이 듣기보다 노트 한 장을 반복해서 보는 방식, 또는 배운 내용을 누군가에게 짧게 설명해 보는 방식이 올해의 리듬과 잘 맞습니다."
   },
   "health": {
    "heading": "속도를 조절하는 생활 리듬",
    "body": "몸과 마음은 ‘더 쓰는 해’라는 점을 먼저 기억하면 좋아요. 올해는 표현과 생산이 늘기 쉬워 에너지가 밖으로 많이 나가고, 그래서 생활 리듬을 고르게 잡는 일이 중요해져요. 오행상 불과 물의 비중이 비어 있어, 무언가를 계속 밀어붙이기보다 텀을 두고 회복하는 방식이 더 잘 맞을 수 있어요.\n\n일상에서는 바쁠 때 식사나 수면, 이동의 순서가 흐트러지기 쉽고, 반대로 2~3월이나 12월처럼 들어오는 도움을 잘 받으면 금방 다시 정돈되는 편이에요. 10~11월에는 책임이 늘면서 긴장이 쌓이기 쉬우니, 해야 할 일의 수를 줄이는 것보다 속도를 낮추는 쪽이 더 유효할 수 있어요. 지수님은 버티는 힘이 좋은 편이지만, 올해는 버티기보다 조율이 더 중요한 해예요.\n\n작게 시작한다면, 하루의 시작과 끝에 같은 순서를 두는 것부터 권해요. 물 한 잔, 짧은 산책, 메모 정리처럼 작은 반복을 만들어 두면 흐름이 흔들릴 때도 다시 돌아오기 쉬워집니다."
   }
  },
  "months": [
   {
    "headline": "채움이 먼저 오는 달",
    "body": "2월경은 도움과 회복이 먼저 들어오는 흐름이라, 새로 시작하기보다 받아들이는 쪽이 편해요. 건록의 기운이 있어 몸을 세우듯 기초를 다지기 좋고, 지살의 영향은 작은 이동이나 환경 변화로 리듬을 바꿔 보게 만들 수 있어요."
   },
   {
    "headline": "붙는 힘이 강한 봄",
    "body": "3월경은 제왕의 기운처럼 집중과 존재감이 도드라지기 쉬워요. 내 일상과 잘 어울리는 관계가 들어오니, 대화나 협업을 시작하면 생각보다 부드럽게 이어질 가능성이 있어요."
   },
   {
    "headline": "부딪혀서 맞추기",
    "body": "4월경은 쇠의 기운과 충의 흐름이 만나 익숙한 방식이 흔들릴 수 있어요. 다만 이 흔들림은 틀어짐보다 조정에 가까워서, 서로의 속도를 다시 맞추는 계기로 쓰기 좋아요."
   },
   {
    "headline": "익숙함 속의 표정",
    "body": "5월경은 병의 기운처럼 에너지가 보이지만 아직 크게 튀지는 않는 달이에요. 망신살이 있어 시선이 모이기 쉬우니, 보여 주는 것과 숨기는 것을 적당히 나누면 편합니다."
   },
   {
    "headline": "밖으로 퍼지는 힘",
    "body": "6월경은 내가 기운을 키워 주는 달이라 표현과 생산이 늘기 쉬워요. 사의 기운은 바쁘게 움직이는 느낌을 주니, 무엇을 내보낼지 미리 골라 두면 소모를 줄이기 좋아요."
   },
   {
    "headline": "자리를 잡는 확장",
    "body": "7월경은 묘의 기운과 반안살이 겹쳐, 관계나 일의 자리매김이 선명해질 수 있어요. 무언가를 보여 준 뒤에는 반응을 바로 결론내기보다, 한 번 더 지켜보는 편이 편합니다."
   },
   {
    "headline": "움직이며 고르는 달",
    "body": "8월경은 절의 기운과 역마살이 함께 있어 방향 전환이나 이동성이 살아나요. 주도권을 잡기 좋지만 과욕도 함께 오기 쉬우니, 한 번에 넓히기보다 핵심부터 잡는 것이 좋아요."
   },
   {
    "headline": "성과를 가려 담기",
    "body": "9월경은 태의 기운과 육해살이 만나, 성과를 만들고 싶어지는 마음과 미묘한 엇갈림이 함께 올 수 있어요. 잘 되는 것만 키우기보다, 헷갈리는 부분을 정리하는 데 시간을 쓰면 훨씬 매끈해집니다."
   },
   {
    "headline": "책임이 무거워지는 때",
    "body": "10월경은 양의 기운과 화개살이 들어와 혼자 정리하고 판단할 일이 많아질 수 있어요. 속도를 올리기보다 기준을 분명히 하면, 부담이 오히려 집중력으로 바뀌기 쉬워요."
   },
   {
    "headline": "조심스런 단단함",
    "body": "11월경은 장생의 기운이지만 겁살이 함께 있어, 시작보다 점검이 더 중요한 달처럼 보여요. 급하게 밀기보다 한 번 더 확인하는 습관이 결과를 안정적으로 받쳐 줍니다."
   },
   {
    "headline": "다시 채우는 정리",
    "body": "12월경은 목욕의 기운과 재살이 있어, 마음과 환경을 씻어 내듯 정리하기 좋은 때예요. 이어질 다음 흐름을 위해 불필요한 것을 덜어 두면 새해가 훨씬 가벼워집니다."
   },
   {
    "headline": "새해의 문턱",
    "body": "2028년 1월경은 관대의 기운과 천살이 들어와, 다시 바깥으로 나가기 전 기본을 세우는 느낌이 강해요. 큰 결정보다 준비와 점검에 집중하면, 다음 단계로 넘어가는 발판이 자연스럽게 마련됩니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 도움을 받는 구간",
    "body": "지켜볼 흐름은 사람과 일정이 자연스럽게 붙는지예요. 해볼 행동은 도움받을 사람 한 명, 다시 배울 주제 한 가지를 정해 짧게 연결해 보는 것입니다."
   },
   {
    "title": "5~7월경: 드러내며 넓히는 구간",
    "body": "지켜볼 흐름은 표현과 생산이 늘면서 일정이 빽빽해지는지예요. 해볼 행동은 보여 줄 결과물의 형식을 미리 정하고, 중간 점검일을 하나 넣어 두는 것이 좋습니다."
   },
   {
    "title": "8~10월경: 고르고 다듬는 구간",
    "body": "지켜볼 흐름은 주도권이 커지면서 욕심도 함께 올라오는지예요. 해볼 행동은 우선순위를 3개로 줄이고, 나머지는 다음 달로 넘겨 보는 것입니다."
   },
   {
    "title": "11월~다음해 1월경: 정리와 회복의 구간",
    "body": "지켜볼 흐름은 책임이 늘었다가 다시 정돈되는 리듬이에요. 해볼 행동은 한 해의 기록을 짧게 돌아보고, 내년 시작용 메모를 미리 만들어 두는 것입니다."
   }
  ],
  "closing": "지수님, 2027년은 많이 움직이되 그만큼 잘 골라야 편한 해로 보입니다. 도움을 받는 달과 내 힘을 쓰는 달이 번갈아 오니, 흐름을 거스르기보다 리듬에 맞춰 타는 쪽이 가장 지혜로워요. 올해는 달리는 힘만큼, 멈춰서 정리하는 힘도 함께 챙기면 좋겠습니다."
 }
};
