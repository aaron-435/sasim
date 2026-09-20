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
   "title_line1": "You keep finishing the day",
   "title_line2": "But your mind keeps reopening it",
   "subtitle": "Burnout deep-dive report — Saju x psychology x counseling, module 1",
   "opening_scene": "It is late, and your phone lights up with Monday-morning messages even before the week has properly started. You have already finished the work, yet your mind is still on the screen, checking one more time and then one more time again. The body is tired, but the mind keeps acting like the task is still unfinished. That is the kind of night you have been living in, Sam.",
   "case_tag": "CASE — Daniel, early 30s, a deadline-driven office worker",
   "case_paragraphs": [
    "Daniel clears his inbox before dinner, but he cannot leave it alone. He reopens the same file three times, changes a line, saves it, and then checks it again from his phone. By midnight, the work is done, but his head is still rehearsing what could be missing. He tells himself he is just being careful, but the evening has already turned into another round of checking.",
    "That habit leaves him tense even on days that should feel light. His own chart carries the same imbalance you do, with Fire absent and Wood taking the lead, so his energy keeps pushing before it can warm and settle. He looks productive from the outside, but inside he is running on strain and second guesses. You can see how easily that would start to feel like home for you too."
   ],
   "oheng_intro": "Your Five Elements are split into a very even pattern, with Wood at 25%, Earth at 25%, Metal at 25%, and Water at 25%, while Fire sits at 0%. That means the week can look balanced on paper and still feel cold at the point where energy should turn into momentum. In a burnout pattern, this shows up as pushing hard, then hitting a wall before the system ever gets a chance to recover.",
   "quiz_reading": "Your 82% perfectionism and 34% recovery make a very specific pair. In the Finisher's Drain pattern, you do not just want things done, you want them sealed shut with no loose edge left behind. That is why a finished task can still keep your mind open all night, and why rest can feel uneasy instead of restful.",
   "element_readings": {
    "wood": {
     "heading": "Wood — the engine that keeps reaching",
     "body": "Your Wood is at 25%, so it is not the problem by itself. But in a burnout week, Wood is the part of you that keeps saying, 'one more pass, one more fix, one more message.' When perfectionism is already high, that reaching turns into cramming, then crashing. You keep moving the goalpost because stopping feels riskier than staying in motion."
    },
    "fire": {
     "heading": "Fire — the missing warmth",
     "body": "Fire is at 0%, and that absence matters in a burnout pattern. Fire is the spark that helps effort feel alive, but here the work gets finished without that warm release afterward. The one relationship that can fill this gap is Wood feeding Fire, and that fits your own habit of pushing harder instead of resting. You keep trying to earn relief through more effort, but the relief never quite arrives."
    },
    "earth": {
     "heading": "Earth — the place where work should land",
     "body": "Your Earth is at 25%, which gives you enough structure to keep carrying responsibility. But when Monday-morning messages hit, that structure becomes a holding pattern instead of a landing place. You do not fully set the work down, so your mind keeps standing at the edge of it. Earth helps you hold things, and right now you may be holding them too long."
    },
    "metal": {
     "heading": "Metal — the part that keeps checking",
     "body": "Your Metal is at 25%, and it shows up as sharp review and precision. That is the part of you that goes back and re-checks everything after a task is already finished. In a burnout cycle, Metal can turn useful standards into endless inspection. You can feel that in the way a completed job still does not feel complete until you have looked at it again."
    },
    "water": {
     "heading": "Water — the tired current underneath",
     "body": "Your Water is at 25%, so there is still depth and sensitivity in the system. But when recovery is low, that depth does not restore you; it just keeps the worry circulating. On a day off, you feel uneasy even when you rest, and that is Water staying active without getting to soften. It is not emptiness you are dealing with here, but a current that will not settle."
    }
   },
   "upcoming_period_heading": "From age 40 to 49, Earth grows stronger",
   "upcoming_period_body": "A stronger Earth phase can give you more stability, more structure, and a better place to set things down after work. For someone who now crams and then crashes, that kind of period can reward routines that are steady instead of extreme. If you practice closing loops cleanly now, you will be ready to use that steadier ground when it arrives. The more you learn to stop without guilt, the more fully you can receive what that season brings.",
   "cross_analysis_quotes": [
    "Your Wood is not just drive; it is the part of you that keeps the whole machine moving. With perfectionism at 82%, that same drive turns into another round of checking, because stopping feels like leaving something unfinished. You do not need more pressure. You need a way for momentum to land.",
    "Your missing Fire explains why recovery stays low at 34%. Without warmth after the work is done, your body is still carrying the task long after your calendar says it is over. That is why rest can feel uneasy instead of restful."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows that your standards are active even after the task is complete. You do not just want accuracy; you want closure, and your mind tries to manufacture it through review. The small practice here is to notice when checking has stopped helping and started feeding itself.",
    "Feeling uneasy even when you rest shows that your nervous system does not fully trust downtime yet. The body may be paused, but the inner monitor keeps scanning for what comes next. You are the kind of person who benefits from rest that is scheduled, visible, and protected."
   ],
   "chat_snapshot_note": "You said you rest, but it never feels like resting, and that lands right next to the tired, slightly anxious tone in your voice. The problem is not that you never stop; it is that stopping does not switch the system off. That makes your fatigue feel mixed with alertness, which is a hard combination to live inside. The line to keep is this: you are not lazy, you are still on watch.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they reopen the week before you have even had a clean handoff from the weekend. That fits the burnout pattern and your low recovery score, because the signal is not just information; it feels like the work is already chasing you again. When the message arrives, your body reads it as a restart button, not a simple notification. Wood keeps pushing forward, and Fire never gets the chance to warm the pace.",
   "chat_repeat_note": "Cramming, then crashing is the whole cycle in miniature. You push hard, hold too much, and then pay for it all at once. A smaller way forward is to stop one step earlier than you think you must, just to prove the day can end without a collapse.",
   "chat_fear_note": "Your fear that stopping means falling behind is not irrational; it is a sign of how seriously you take your work. Underneath it is a wish to stay reliable and not lose ground. What you may need most is proof that a pause can protect your pace instead of threaten it. You are not trying to do less; you are trying to keep yourself in the game.",
   "psychology_fact_heading": "Perfectionism and recovery depletion",
   "psychology_fact_body": "In psychology, perfectionism often means setting very high standards and then judging yourself harshly when the result does not feel complete enough. Low recovery means the mind and body do not fully come down after effort, so even free time can stay tense. Put together, those two tendencies can create a loop where finishing a task does not create relief. Instead, it creates another round of monitoring, which is exactly what your pattern shows.",
   "psychology_takeaway": "You are not failing to rest; your system is failing to release. The work ends, but the inner audit keeps going.",
   "strengths": [
    {
     "title": "Reliable",
     "body": "You do not leave things half-done, and that shows in the way you go back and re-check everything after finishing a task. That kind of care makes you dependable when a deadline matters and details cannot slip. The risk is not carelessness; it is caring so hard that the day never quite closes."
    },
    {
     "title": "Persistent",
     "body": "Your Wood at 25% gives you the push to keep moving even when you are tired. That is the energy behind cramming, then still showing up for the next round. In a good setting, that persistence becomes follow-through instead of self-pressure."
    },
    {
     "title": "Alert",
     "body": "You notice tension early, which is why Monday-morning messages land so strongly for you. That alertness helps you respond quickly, but it also keeps your mind from going fully off duty. When used well, it can help you spot overload before it becomes a crash."
    },
    {
     "title": "Disciplined",
     "body": "Your chart does not look scattered; it looks controlled, with each of Wood, Earth, Metal, and Water sitting at 25%. That balance supports a disciplined style that can keep a project moving. The challenge is learning when discipline needs a closing step, not another review."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "Your perfectionism score of 82% shows up as the urge to revisit what is already done. That can make a finished task feel fragile, as if one more look is needed to keep it safe. The strain is not in the checking itself, but in how hard it is for you to stop once it starts."
    },
    {
     "title": "Uneasy rest",
     "body": "Your recovery score of 34% shows that rest does not fully register as rest yet. You can sit down, but part of you keeps standing by for the next demand. That makes downtime feel occupied, even when nothing is happening."
    },
    {
     "title": "Crash cycle",
     "body": "Cramming, then crashing is not just a habit; it is the shape your energy takes when Fire is absent. You spend heavily, then pay for it all at once. The crash is your system asking for a pace it can actually hold."
    },
    {
     "title": "Fear of pause",
     "body": "Your fear that stopping means falling behind keeps the pressure alive even after the work is done. That fear makes every pause feel expensive. What it really shows is how much you value staying in motion."
    }
   ],
   "fit_good": "You do best in a role where the day has a clear end point and the handoff is visible. A manager, team, or process that lets you close the file, send the update, and leave the rest for tomorrow will help you more than a culture that rewards endless availability. You need work that respects completion, not work that keeps the door open all night.",
   "fit_bad": "You may struggle in a role that quietly expects you to stay reachable after the work should already be over. If the pace rewards endless checking, your mind can slip back into the same loop of cramming and crashing. What looks efficient at first can start to drain you if there is never a clean end to the day.",
   "behavior_guides": [
    {
     "title": "Hard stop",
     "body": "Pick one time each evening, even on busy days, when you stop all work checks for 20 minutes. Put the phone in another room and do one non-work action, like washing up or walking around the block. The point is not to relax perfectly; it is to teach your body that the day can end."
    },
    {
     "title": "Single review",
     "body": "After finishing a task, allow yourself one final review only. Set a timer for 10 minutes, check what matters, and then send or save it without reopening the file again. This gives your perfectionism a container instead of a blank runway."
    },
    {
     "title": "Rest cue",
     "body": "On days off, begin rest with a visible cue, like changing clothes and shutting the laptop before noon. Keep that first pause to 15 minutes and let it be deliberate instead of vague. Your recovery improves when rest has a start that your body can recognize."
    },
    {
     "title": "Notification boundary",
     "body": "When an after-hours notification comes in, wait 30 minutes before answering unless it truly needs an immediate response. Use that gap to write down what is actually due today and what can wait until morning. That small delay helps stop the message from becoming your whole nervous system's alarm."
    }
   ],
   "mindset_guide": "Think of your energy like a workbench, not an open tab. A finished task belongs on the bench, not under your hand all night. Fire is the warmth that tells you the job is done, and right now you need more of that signal, not more force. Let closure count as part of the work.",
   "closing_title": "When the work is done",
   "closing_body": "You do not need to prove your value by staying in motion after the task is complete. The clearest sign of growth for you will be the moment you can stop, feel the finish, and trust that nothing is lost. That is the sentence worth keeping: you are allowed to let a finished day stay finished."
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
 "riley": {
  "content": {
   "title_line1": "You keep checking long after the work is done.",
   "title_line2": "And that is where your tiredness really begins.",
   "subtitle": "Burnout deep report - Saju × psychology × counseling integration, module 1",
   "opening_scene": "It is late, and your phone lights up again with Monday-morning messages. Even after you put the work down, your mind picks it back up and starts checking it all over again. You tell yourself you are resting, but the rest never lands cleanly. The body stays still while the thoughts keep moving. Riley, isn't this what your nights have been looking like lately?",
   "case_tag": "CASE - Nora, early 30s, trying to unwind after work",
   "case_paragraphs": [
    "Nora ends her workday with a final pass through every detail, then opens the file again because one line still feels unfinished. She answers a few messages, closes the laptop, and still finds herself mentally walking back through the same task. By the time she sits down to rest, the rest already feels borrowed. Her evening looks calm from the outside, but inside she is still finishing.",
    "That pattern leaves Nora drained, because every finish becomes another round of checking. Her Five Elements chart is also tilted toward Wood with very little Metal, so the same forward push has little built-in stop to it. She keeps moving before she has fully recovered, and the crash arrives all at once. You can hear your own rhythm in that, can't you?"
   ],
   "oheng_intro": "Your chart is 50% Wood, 25% Earth, 25% Water, with Fire and Metal both at 0%. That means the system is strong on growth and movement, but thin where pause, release, and clean closure should happen. In a burnout pattern, that shows up as pushing hard, then crashing hard, with very little gentle middle ground.",
   "quiz_reading": "Your 82% perfectionism and 34% recovery fit the Finisher's Drain pattern almost too neatly. The high score does not just mean you care about quality; it means you keep reopening the door after the task is already done. The low recovery score shows why a day off can still feel uneasy, even when nothing is being asked of you.",
   "element_readings": {
    "wood": {
     "heading": "Wood, overfull - the part of you that keeps reaching",
     "body": "Wood is your strongest element at 50%, so it does not sit still for long. In burnout terms, that looks like the part of you that keeps extending one more hand toward the task, the message, the correction, the next thing to improve. It is the same force that makes Monday-morning messages feel louder than they should. You do not just notice them; you grow toward them, and that makes it hard to stop."
    },
    "fire": {
     "heading": "Fire, absent - the spark that does not stay lit",
     "body": "Fire is at 0%, and that shows up as a shortage of warmth in the middle of effort. You can finish something and still not feel the small lift that says, 'That was enough for today.' In a burnout pattern, the result is not drama; it is a flat, tired kind of urgency. You keep going, but the inner glow that makes effort feel alive is hard to find."
    },
    "earth": {
     "heading": "Earth, balanced but burdened - the ground that has to hold too much",
     "body": "Earth sits at 25%, and that makes it the part of you that tries to contain the mess and make it usable. It is the side that wants a clear pile, a clear plan, and a clear finish before you let yourself breathe. In this burnout pattern, Earth is doing quiet labor all day: holding the schedule, holding the follow-up, holding the worry that you might fall behind. It is also the only element here that can feed your weak Water, so the steadier your Earth work gets, the easier it becomes to let your system settle."
    },
    "metal": {
     "heading": "Metal, weakened - the edge that should say 'enough'",
     "body": "Metal is at 0%, so the clean line between done and not done is hard to feel. That is why you can finish a task and still go back to re-check everything. The weak place is not a lack of effort; it is a lack of crisp stopping power. Earth is the one element that can strengthen your Water here, so a more grounded routine helps the mind cool down instead of staying trapped in the same checking loop."
    },
    "water": {
     "heading": "Water, present but quiet - the part that can cool the pace",
     "body": "Water is at 25%, so there is some capacity for reflection and rest, but it is not loud enough to overrule the push. That is why you can lie down and still feel uneasy, as if your body has stopped but your mind has not received the message. In a burnout cycle, Water is the part that would let the nervous system settle into depth instead of staying on alert. Right now, it is there, but it needs room."
    }
   },
   "upcoming_period_heading": "From age 46 to 55, a stronger Earth cycle arrives",
   "upcoming_period_body": "That coming 10-year cycle should feel steadier than the one you are carrying now. Stronger Earth can make it easier to build routines that hold you instead of routines that only demand more from you. For you, that may mean cleaner finishes, better pacing, and less pressure to keep proving that you are still keeping up. If you prepare now by practicing real stopping points, that later cycle can feel like support instead of another task.",
   "cross_analysis_quotes": [
    "Your strongest Wood is feeding the same perfectionism that keeps you reopening finished work. The 82% perfectionism score shows exactly how that growth energy turns into constant refinement. You are not lazy; you are overextending your own drive.",
    "Your 0% Metal and 34% recovery explain why rest feels uneasy instead of restorative. The weaker boundary energy leaves too much space for checking, while the low recovery score shows that your system does not easily switch off. That is why a day off can still feel like unfinished business."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you trust precision more than relief. In daily life, that can look like reopening a finished message or rereading a task after everyone else has moved on. You are trying to stay safe by making sure nothing slips through.",
    "Feeling uneasy even when you rest shows that your nervous system has learned to stay on duty. That can appear as checking the time, checking messages, or checking your own guilt during a break. You deserve rest that does not need to be defended."
   ],
   "chat_snapshot_note": "Your core worry is that rest never quite feels like rest, and that lands together with tiredness and a little anxiety. The feeling is not only physical; it is the mind staying on after the workday has already ended. That is why even a quiet moment can still feel busy. Your body wants to stop, but your thoughts keep asking for one more check.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they wake the whole system back up at once. They do not just bring information; they reactivate the part of you that believes stopping might cost you ground. That fits your burnout pattern and your strong Wood: the moment something arrives, your forward motion turns back on. Your nerves are reading those messages as a test of whether you can keep up.",
   "chat_repeat_note": "Your cram-then-crash pattern moves in a very clear arc: you push hard, you squeeze the work in, and then your system drops. In the middle, you choose momentum over pacing because stopping feels risky. A smaller step would be to close the day before you feel empty, not after.",
   "chat_fear_note": "Under the fear of falling behind is a very human wish: to stay secure without having to stay on guard all the time. You are not asking for less care; you are asking for a safer way to pause. That is why the fear is so sticky. It is protecting your place, even while it exhausts you.",
   "psychology_fact_heading": "Perfectionism and recovery",
   "psychology_fact_body": "In psychology, perfectionism often means setting standards so high that finishing does not feel like finishing. Recovery is the part of the system that lets effort settle and the body come back down after strain. When perfectionism runs high and recovery runs low, the person can keep checking after the task is done and still feel uneasy on a day off. That is the shape your scores describe with unusual clarity.",
   "psychology_takeaway": "You are not failing to rest; your system is failing to believe the stop is real. The work is not only to do less, but to let done stay done.",
   "strengths": [
    {
     "title": "Finish power",
     "body": "You do not drift away from responsibility; you run straight into it. That is why you can finish tasks other people might leave half-open. The same force shows up when you keep returning to check details after the job is done."
    },
    {
     "title": "High standards",
     "body": "Your 82% perfectionism score shows that you care deeply about the quality of what you put into the world. That can make your work precise and reliable, especially when something matters. It can also make a finished task feel suspicious until you have checked it one more time."
    },
    {
     "title": "Persistent drive",
     "body": "Your 50% Wood gives you a strong push toward action and growth. That means you are unlikely to stay passive when something matters to you. You reach, you respond, and you keep the thread moving."
    },
    {
     "title": "Quiet endurance",
     "body": "Even with 34% recovery, you are still trying to make room for rest. That means there is a part of you that wants repair, not just output. When you finally slow down, you are not empty; you are overdue."
    }
   ],
   "weaknesses": [
    {
     "title": "No stopping edge",
     "body": "With Metal at 0%, the line between done and not done can blur. That is why you can leave a task and still keep circling back to it in your head. The problem is not that you do not know how to finish; it is that finishing does not always feel final."
    },
    {
     "title": "Thin recovery",
     "body": "Your 34% recovery score fits the feeling that resting should help, but somehow does not fully land. You may sit down, but your mind keeps standing at the door. That is why a day off can still feel like work in another room."
    },
    {
     "title": "Crash cycle",
     "body": "Cramming then crashing is a costly rhythm because it makes relief arrive only after depletion. You push through the week, then the body collects the bill all at once. That pattern can make you look steady from the outside while feeling brittle on the inside."
    },
    {
     "title": "Reply alarm",
     "body": "Monday-morning messages can flip your system back on before you have fully come online. A note that should be ordinary starts feeling like a demand. That is a small trigger with a big emotional footprint."
    }
   ],
   "fit_good": "You do best in settings that give you clear expectations, predictable timing, and a real end point. When the day has a visible shape, you are less likely to keep reopening what is already closed. A calm environment that lets you stop once and trust it will help you settle instead of staying on alert.",
   "fit_bad": "You will struggle in environments that keep changing the target after you have already aimed. If every finish is followed by another round of adjustment, your mind will stay in re-check mode all day. That kind of pace turns a normal task into a moving test you never get to leave.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "At the end of the day, spend 10 minutes naming the one thing you are actually done with. Put the phone down after that and do not reopen the same item again. The point is to practice a real stop, not a perfect one."
    },
    {
     "title": "Protect the morning",
     "body": "Before Monday messages start arriving, keep the first 20 minutes for yourself. No inbox, no rereading, no checking what is already waiting. That small buffer helps your nervous system meet the day instead of being hit by it."
    },
    {
     "title": "Schedule recovery",
     "body": "Choose one break each day that is not a reward for finishing. Make it 15 minutes, and let it happen even if one more task is still open. Recovery works better when it is treated like part of the workday, not a prize."
    },
    {
     "title": "Stop once",
     "body": "When you catch yourself re-checking, allow only one deliberate second pass. After that, write the task down as closed and move your hands to something else. You are training your body to trust the boundary."
    }
   ],
   "mindset_guide": "Think of your energy like a house light, not a spotlight. A spotlight burns hot when it stays on one thing too long. A house light keeps the room usable, which is what your pace needs now. You do not need to prove brightness by staying on all night.",
   "closing_title": "Let done stay done",
   "closing_body": "Your chart says you have enough drive to keep going, but not enough Metal to make stopping feel natural. Your scores say the same thing in a different language: high perfectionism, low recovery, and a mind that keeps checking after the task is complete. Riley, the strongest shift ahead is not learning how to work harder; it is learning how to let a finished thing remain finished."
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
 "jordan": {
  "content": {
   "title_line1": "When the mind keeps signing off the workday",
   "title_line2": "your body is still answering Monday's call",
   "subtitle": "Burnout deep report — Saju × psychology × counseling integration, module Burnout",
   "opening_scene": "It is late, and your phone lights up with Monday-morning messages. The work is already done, but your hand still reaches back to check it again. In your head, the sentence keeps circling: if I stop, I'll fall behind. Jordan, does your night sometimes feel like this pattern of checking and not settling?",
   "case_tag": "Case — Mina, early 30s, a project lead who cannot leave work alone",
   "case_paragraphs": [
    "Mina finishes her tasks before dinner, but she does not really leave them. She opens the file one more time, then one more time after that, until the room feels smaller and the hour feels later. On her day off, she says she is resting, yet her shoulders stay tight and her mind keeps auditing what was already done.",
    "That habit left her exhausted, but also oddly proud of never letting anything slip. Her Five Elements chart was heavy in Earth and Metal, with Wood clearly weak, so she lived like someone always trying to hold the whole structure in place. You can feel the same strain when rest never lands and stopping feels like danger."
   ],
   "oheng_intro": "Earth at 38% and Metal at 38% tell the same story from two sides: you can hold, organize, and refine almost anything. Wood at 0% is the missing stretch, the part that would let something move forward without constant correction. In a burnout pattern, that shows up as finishing hard, then feeling the need to check the finish line instead of stepping away from it.",
   "quiz_reading": "Your 82% perfectionism shows up as the part of you that cannot let a task be finished once; it wants a second pass, and then a third. Your 34% recovery means the pause that should refill you arrives too weak to compete with that urge. That is why a day off can still feel busy in your head, and why Monday-morning messages can switch the whole system back on at once.",
   "element_readings": {
    "wood": {
     "heading": "Wood at 0% — the branch that never gets to grow loose",
     "body": "Wood is the weak point in your chart, so forward motion does not come naturally; it has to be borrowed. Water is the element that feeds Wood, so the calm, replenishing part of you has to arrive first. In burnout terms, that is the difference between moving on and circling back to re-check everything. When Monday messages hit, you do not just lose ease; you lose the part that would let you trust the next step."
    },
    "fire": {
     "heading": "Fire at 13% — a small flame that burns fast under pressure",
     "body": "Your Fire is present, but not dominant, so it shows up as bursts rather than a steady warmth. In this burnout pattern, that looks like cramming until the deadline and then dropping all at once. The energy is real, but it is used in a way that leaves little glow behind. You can see it when one message on Monday morning is enough to switch the whole system from rest to alarm."
    },
    "earth": {
     "heading": "Earth at 38% — the shelf that keeps taking weight",
     "body": "Earth is one of your strongest elements, and it shows in how much you can carry without immediately falling apart. You keep the work together, then you keep checking whether it is still together. In a burnout module, that becomes the habit of making yourself into the container for everything. The problem is not that you lack discipline; it is that your steadiness keeps getting drafted into one more round of holding."
    },
    "metal": {
     "heading": "Metal at 38% — the sharp edge that keeps reviewing the cut",
     "body": "Metal is just as strong as Earth in your chart, so precision is never far away. That helps you finish, but it also makes you return to the finished thing and inspect it again. In the burnout story, that is the part of you that cannot easily say 'done' without asking whether done is good enough. You feel it most when the work is over, but your mind is still running quality control."
    },
    "water": {
     "heading": "Water at 13% — the quiet reservoir that needs more room",
     "body": "Water is present, but only at a modest level, so rest exists in you without fully taking over. That fits your answer about feeling uneasy even when you rest. In a burnout cycle, Water is the part that should soften the system after effort, yet here it arrives as a thin layer instead of a deep refill. That is why you can lie down and still not feel restored."
    }
   },
   "upcoming_period_heading": "From age 31 to 40, the Fire cycle rises",
   "upcoming_period_body": "A stronger Fire phase can bring more visibility, momentum, and a faster pace of action. For you, that matters because your current pattern already runs hot and then drops; a stronger Fire decade will make clear priorities and steady recovery especially useful. This is the time to build recovery habits before the pace climbs, so that your energy is spent on direction rather than on repeated repair. If you learn to stop checking every finished task now, that later stretch can become a stage, not a furnace.",
   "cross_analysis_quotes": [
    "Your strongest elements are also your sharpest overworkers. Earth at 38% and Metal at 38% make you excellent at holding and refining, and that is exactly why perfectionism climbs so high. The same strength that helps you finish the job also keeps asking whether the job was finished well enough.",
    "The 82% perfectionism score is not random against your chart. It sits right on top of your Earth-and-Metal habit of stabilizing, correcting, and checking, until rest starts to feel like unfinished business. That is why recovery has so little room to breathe when the work is already done."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that completion does not automatically feel safe for you. Your mind wants proof, not just progress, and that makes every finished task invite one more round of review. You can let yourself notice when 'done' starts turning into 'not yet' again.",
    "Feeling uneasy even when you rest shows that recovery is not just about time off for you. The body may be still, but the system stays alert, waiting for the next demand. You do not need to force rest to be perfect; you need rest to be allowed to be imperfect."
   ],
   "chat_snapshot_note": "You said that you rest, but it never feels like resting, and that lands right beside the tired, a little anxious feeling you brought into the session. That combination is important because it shows the problem is not laziness or lack of effort; it is the inability to let your system believe the work is truly over. The line to keep is this: your body stops before your mind does.",
   "chat_trigger_note": "Monday-morning messages hit hard because they do not just bring tasks; they reopen the whole alarm system. For someone with 82% perfectionism, a message can feel like a verdict on whether the work was safe enough to leave alone. That is why the trigger is so fast and so physical for you: it meets a mind that already expects one more correction.",
   "chat_repeat_note": "The pattern runs in two sharp moves: you cram, then you crash. In the first move, you push through by tightening everything; in the second, the body collects the bill all at once. A small way out is to stop once before the final push and ask whether you are finishing the task or just feeding the checking loop.",
   "chat_fear_note": "The fear underneath this is not simply about speed. It is the fear that if you stop, you will fall behind. What wants to be protected there is your sense of momentum, because you have worked hard to keep life from slipping out of reach.",
   "psychology_fact_heading": "Perfectionism and the overcontrol loop",
   "psychology_fact_body": "Perfectionism often keeps attention locked on possible flaws even after a task is complete. In practice, that can make rest feel unsafe, because the mind treats pause as a chance for something to go wrong. Your pattern fits that loop closely: you finish, then you check, then Monday messages pull you back into vigilance. The goal is not to erase standards, but to let completion count without demanding another inspection.",
   "psychology_takeaway": "If finishing never counts, your mind will never clock out. You do not need more pressure; you need permission for 'done' to stay done.",
   "strengths": [
    {
     "title": "Steady hold",
     "body": "With Earth at 38%, you can keep a lot from falling apart under pressure. That is why you are often the person who finishes the task, then catches the small things everyone else missed. The strength is real, and so is the cost when you never let your grip loosen."
    },
    {
     "title": "Sharp finish",
     "body": "Metal at 38% gives you a clean eye for what is off, which is why your work does not stay sloppy for long. You notice the detail, the gap, the thing that needs one more pass. That same strength becomes exhausting when the last pass turns into a habit instead of a choice."
    },
    {
     "title": "Fast push",
     "body": "Your Fire at 13% is enough to help you surge when a deadline gets close. That is the energy behind cramming until everything is done. It helps you get across the line, but it also helps explain why you can crash so hard once the sprint ends."
    },
    {
     "title": "Quiet insight",
     "body": "Your Water at 13% is subtle, but it gives you the capacity to notice your own unease. You already know the difference between being off and being restored, even if the gap is hard to close. That awareness is useful, because it tells you when rest is present in form but not yet in feeling."
    }
   ],
   "weaknesses": [
    {
     "title": "Endless review",
     "body": "Wood at 0% makes it hard to let a finished thing move on without one more check. That is why a task can be complete and still not feel released. You are not failing to finish; you are struggling to trust the finish."
    },
    {
     "title": "Hard pause",
     "body": "Your 34% recovery means the pause does not refill you quickly enough to compete with your inner pressure. So even a day off can feel uneasy instead of restful. You deserve a break that actually lands, not one that only changes the calendar."
    },
    {
     "title": "Alarm reset",
     "body": "Monday-morning messages flip your system back on before you have had time to settle. Because your perfectionism is so high, a simple message can feel like the next test. That is why your nervous system seems to wake up faster than your schedule does."
    },
    {
     "title": "Crash after push",
     "body": "You can carry a lot for a while, then drop into exhaustion all at once. That pattern is not a lack of strength; it is strength being spent too hard and too fast. The crash is the bill that follows the sprint."
    }
   ],
   "fit_good": "You do best in work that has clear finish lines and fewer surprise interruptions. A day with one main task, a defined handoff, and time to close the file will suit you better than a stream of messages that keeps reopening it. You are at your best when completion is visible and respected.",
   "fit_bad": "You will struggle in a workplace that treats constant availability as professionalism. A day filled with late edits, vague requests, and Monday-style interruptions will keep your checking loop alive. The more a job rewards never being done, the more it will wear you down.",
   "behavior_guides": [
    {
     "title": "One close",
     "body": "At the end of the workday, choose one task to close for real. Spend five minutes checking it once, then stop and write down that it is done. Do this every weekday so your mind learns that completion has a boundary."
    },
    {
     "title": "Rest with limits",
     "body": "On your day off, set a 20-minute rest block where no work messages are allowed. Put the phone in another room and let the discomfort pass without fixing it. Repeat it once more later in the day so rest becomes a practice, not an accident."
    },
    {
     "title": "Monday buffer",
     "body": "Before Monday begins, leave a 10-minute buffer to read messages only once. Answer the urgent ones, then stop instead of reopening the whole list. This gives your system a start point instead of a full alarm."
    },
    {
     "title": "Done note",
     "body": "Keep a short note titled 'done' and write one finished item in it each evening. Read it back before bed so your brain gets a second signal that work has ended. Do it for two weeks and watch how often your mind still wants extra proof."
    }
   ],
   "mindset_guide": "Think of your energy like a ledger, not a fire alarm. A ledger only works when entries are closed, not rewritten every hour. When you rest, you are not losing money; you are stopping the leak that comes from endless rechecking. Your job is to let one line stay settled before you open the next one.",
   "closing_title": "Let done stay done",
   "closing_body": "You do not need to earn rest by finishing perfectly. You need rest that can survive the message, the check, and the urge to look again. If this feels like your life on the screen, keep the line that matters most: done is still done, even when your mind asks for one more look."
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
 "jisoo": {
  "content": {
   "title_line1": "멈추지 못한 채 닳아 가는",
   "title_line2": "월요일 알림 앞에서 다시 시작되는 긴장",
   "subtitle": "번아웃 모듈 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침, 메신저 알림이 울리자마자 머릿속이 먼저 긴장합니다. 아직 손에 쥔 커피가 다 식기도 전에, 이번 주 할 일들이 순서 없이 떠올랐다가 다시 점검 목록처럼 정렬됩니다. 일을 끝냈는데도 마음은 끝난 적이 없어서, 화면을 닫아도 생각은 계속 열려 있습니다. 쉬어도 쉬는 것 같지 않은 그 느낌이 지수님의 요즘은 이런 모습이지 않으신가요.",
   "case_tag": "사례 — 민지, 30대 초반, 마감이 몰릴 때마다 무너지는 상황",
   "case_paragraphs": [
    "민지는 평일 내내 일을 미뤄 두지 않으려고 아침부터 속도를 올렸습니다. 끝내 놓고도 한 번 더 확인하고, 다시 처음부터 훑어보는 습관이 남아 있었습니다. 쉬는 날에도 머리가 일을 놓지 못해서, 낮잠을 자고도 마음은 더 피곤해졌습니다.",
    "그 버릇은 민지의 하루를 조용히 갉아먹었습니다. 몰아서 해치우는 날이 늘수록 몸은 버티는데 마음은 먼저 닳아 갔습니다. 민지의 사주도 토의 무게가 크고 물이 약해서, 멈추어 흐르는 감각이 쉽게 붙지 않았습니다. 당신도 비슷하게, 끝냈는데도 끝나지 않은 느낌을 오래 붙들고 계신가요."
   ],
   "oheng_intro": "토가 50퍼센트로 가장 강하고 수가 0퍼센트로 비어 있으면, 버티는 힘은 크지만 내려놓는 감각은 쉽게 오지 않습니다. 목이 33퍼센트라서 일의 방향을 잡는 힘은 있지만, 화가 0퍼센트라 속도를 올린 뒤 식혀 주는 장면이 부족합니다. 이번 번아웃 흐름에서는 이 분포가 몰아서 하고 무너지기의 리듬으로 아주 또렷하게 드러납니다.",
   "quiz_reading": "완벽주의 82퍼센트와 회복 34퍼센트가 함께 보이면, 하루가 끝난 뒤에도 마음은 계속 현장을 돌고 있는 셈입니다. 완주형 소진은 끝까지 해내는 힘이 있는 대신, 끝까지 지치는 흐름을 남깁니다. 그래서 지수님은 이미 해낸 일보다 아직 남은 흠집을 먼저 보고, 쉬는 시간에도 머릿속에서는 다시 점검을 시작합니다.",
   "element_readings": {
    "wood": {
     "heading": "목(木) 보통 — 방향은 잡지만 멈춤은 서툰 가지",
     "body": "목이 33퍼센트인 지수님은 일을 시작할 때 방향을 잡는 감각이 분명합니다. 그래서 해야 할 일이 보이면 한 번에 정리하려는 쪽으로 움직이기 쉽습니다. 다만 번아웃 모듈에서는 그 추진이 쉬는 틈보다 앞서서, 월요일 알림 하나에도 다시 속도를 붙이는 장면으로 나타납니다."
    },
    "fire": {
     "heading": "화(火) 결핍 — 달아오른 뒤 식혀 줄 불씨가 적은 상태",
     "body": "화가 0퍼센트라는 건, 일을 밀어붙이는 순간의 열은 있어도 그 뒤를 부드럽게 식혀 주는 장면이 잘 안 붙는다는 뜻처럼 읽힙니다. 지수님은 몰아서 해내는 동안에는 버티지만, 한 번 긴장이 올라가면 꺼지는 대신 계속 타는 쪽에 가깝습니다. 번아웃 모듈에서 이 결핍은 쉬어도 마음이 편해지지 않는 감각으로 드러납니다."
    },
    "earth": {
     "heading": "토(土) 과다 — 끝까지 버티는 대신 끝까지 무거워지는 흙",
     "body": "토가 50퍼센트면 버티는 힘이 생활의 바닥처럼 깔려 있습니다. 지수님은 일이 쌓여도 당장 무너지기보다, 먼저 더 담아 두고 더 견디는 쪽을 택하기 쉽습니다. 그런데 번아웃 모듈에서는 그 힘이 장점으로만 남지 않고, 몰아서 하고 무너지는 패턴으로 돌아와 몸과 마음을 함께 무겁게 만듭니다. 그래서 해낸 양이 늘어도 회복감은 잘 쌓이지 않습니다."
    },
    "metal": {
     "heading": "금(金) 보통 — 다시 훑어보게 만드는 날카로운 확인",
     "body": "금이 17퍼센트인 지수님은 마감 뒤에도 그냥 넘기지 않고 다시 확인하는 힘이 있습니다. 완벽주의 82퍼센트와 만나면 이 힘은 강점이 되기보다, 끝난 일을 다시 처음부터 훑어보게 만드는 습관으로 굳어집니다. 번아웃 모듈에서는 그 확인이 안전장치처럼 보이지만, 실제로는 쉬는 시간을 계속 잠식합니다."
    },
    "water": {
     "heading": "수(水) 결핍 — 쉬어도 마음이 풀리지 않는 마른 호수",
     "body": "수가 0퍼센트라서, 멈추는 순간에 마음이 자연스럽게 가라앉는 감각이 약합니다. 지수님은 쉬는 날에도 편안함보다 불편함을 먼저 느끼기 쉽고, 그래서 쉴수록 더 신경이 곤두섭니다. 이 결핍은 약한 원소를 채워 주는 금의 힘을 통해서만 조금씩 숨을 얻습니다. 확인하고 정리하는 금의 힘을 물의 쪽으로 조금만 돌려 놓아야, 비로소 긴장이 풀리는 숨이 붙습니다."
    }
   },
   "upcoming_period_heading": "36세부터 45세까지, 물의 계절이 옵니다",
   "upcoming_period_body": "36세부터 45세까지는 지금보다 훨씬 자연스럽게 힘을 풀고, 속도를 조절하는 감각이 살아나는 흐름으로 읽힙니다. 그때는 끝까지 밀어붙이는 힘만이 아니라, 중간에 멈추고 다시 살피는 여유가 함께 들어올 가능성이 큽니다. 지금은 일을 더 잘하는 법보다, 쉬는 순간에도 마음이 덜 불편하도록 작은 회복 습관을 먼저 만들어 두는 편이 좋습니다. 월요일 아침 알림에 바로 반응하기보다, 하루의 시작을 천천히 여는 방식부터 익혀 두면 그 시기가 왔을 때 훨씬 부드럽게 연결됩니다.",
   "cross_analysis_quotes": [
    "토가 50퍼센트인 사람은 버티는 데 익숙하고, 완벽주의 82퍼센트는 그 버팀에 브레이크를 잘 걸지 못하게 합니다. 그래서 지수님은 일을 끝내는 순간보다 끝난 뒤 다시 점검하는 순간에 더 오래 머뭅니다. 해낸 양보다 남은 흠을 먼저 보는 습관이, 번아웃의 속도를 더 빠르게 만듭니다.",
    "수가 0퍼센트이고 회복이 34퍼센트면, 쉬는 시간도 마음이 편히 내려앉는 자리로 잘 바뀌지 않습니다. 지수님은 몸은 멈췄는데 머리는 여전히 업무 화면에 남아 있는 듯한 상태를 자주 겪기 쉽습니다. 그래서 휴식이 부족한 것이 아니라, 휴식이 휴식으로 인식되지 않는 것이 더 큰 문제입니다."
   ],
   "answer_notes": [
    "일을 끝낸 뒤 다시 처음부터 훑어보는 답은, 지수님이 결과보다 오차를 먼저 보는 사람이라는 뜻입니다. 그래서 해낸 뒤의 안도보다, 놓친 부분을 찾아내야 마음이 놓이는 장면이 자주 생깁니다. 그 꼼꼼함은 강점이지만, 스스로를 쉬게 하는 순간까지 검사실로 바꾸지는 않아도 됩니다.",
    "쉬는 날에도 마음이 불편하다는 답은, 지수님에게 휴식이 단순한 멈춤이 아니라 불안과 함께 오는 시간이라는 뜻입니다. 그래서 몸은 쉬어도 마음은 계속 일을 확인하려는 방향으로 움직입니다. 쉬는 동안 불편함이 올라와도, 그 불편함을 바로 실패로 읽지 않는 연습이 필요합니다."
   ],
   "chat_snapshot_note": "지수님이 가장 힘들어한 건 일이 많아서가 아니라, 쉬어도 쉬는 것 같지 않다는 감각이었습니다. 그 말 뒤에는 지쳤고 조금 불안한 상태가 그대로 붙어 있었고, 그래서 월요일 아침 메신저 알림 하나가 하루 전체를 흔들었습니다. 저장해 둘 문장은 분명합니다. 쉬지 못해서 지친 게 아니라, 쉬는 동안에도 일을 놓지 못해서 더 지친 것입니다.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 단순한 알림이 아니라 다시 긴장을 켜는 스위치처럼 작동합니다. 이미 지친 상태에서는 작은 신호도 크게 느껴지고, 뒤처질까 봐 멈출 수 없다는 두려움이 바로 그 순간에 올라옵니다. 완벽주의가 높은 사람에게 이 자극은 시작의 신호이면서 동시에 다시 무너질 위험의 신호가 됩니다.",
   "chat_repeat_note": "지수님은 몰아서 하고 버티는 힘으로 한 번은 넘어갑니다. 하지만 그다음에는 몸과 마음이 함께 꺾이면서, 일을 끝낸 뒤에도 점검을 멈추지 못하는 흐름이 이어집니다. 작은 방법은 일의 끝에 바로 다음 일을 붙이지 않는 것입니다. 끝난 뒤 십 분만이라도 알림을 꺼 두면, 무너지는 속도가 조금 늦춰집니다.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 말은, 사실 뒤처짐 자체보다 불안이 더 크다는 뜻입니다. 지수님은 멈추면 놓치는 사람이 될까 봐 스스로를 계속 밀어붙이고 있습니다. 그 아래에는 잘하고 싶다는 마음과 놓치고 싶지 않다는 마음이 함께 있습니다.",
   "psychology_fact_heading": "완벽주의와 회복탄력성",
   "psychology_fact_body": "완벽주의가 높을수록 실수 가능성을 크게 느끼고, 결과를 끝낸 뒤에도 다시 확인하려는 경향이 강해집니다. 회복탄력성은 스트레스를 받은 뒤 원래 상태로 돌아오거나, 그 충격을 조절해 다시 기능하는 힘을 말합니다. 지수님은 완벽주의 82퍼센트와 회복 34퍼센트가 함께 보여서, 일의 질을 끌어올리는 힘과 쉬어 돌아오는 힘이 서로 균형을 이루지 못하는 모습으로 읽힙니다. 그래서 완성도는 높아지기 쉬워도, 그만큼 소진도 빠르게 쌓입니다.",
   "psychology_takeaway": "완벽하게 끝내는 힘이, 완전히 쉬게 하지는 않습니다. 지수님에게 필요한 건 더 세게 밀어붙이는 법이 아니라, 끝난 뒤 마음을 제자리로 돌려놓는 법입니다.",
   "strengths": [
    {
     "title": "완주력",
     "body": "지수님은 일이 끝날 때까지 손을 놓지 않는 힘이 있습니다. 월요일 아침 알림이 와도 다시 일의 모양을 잡아내는 걸 보면, 시작과 마무리 둘 다 쉽게 포기하지 않습니다. 이 힘은 번아웃 모듈에서 지치게도 하지만, 동시에 결과를 만들어 내는 바탕이 됩니다."
    },
    {
     "title": "정리감각",
     "body": "금 17퍼센트는 일을 대충 넘기지 않는 눈을 보여 줍니다. 그래서 끝낸 뒤 다시 처음부터 훑어보는 습관이 생기고, 그 덕분에 빠뜨린 부분을 빨리 찾을 가능성도 큽니다. 다만 그 장점이 과해지면 쉬는 시간까지 검토의 대상이 됩니다."
    },
    {
     "title": "버팀힘",
     "body": "토 50퍼센트는 지수님이 쉽게 무너지지 않는 바닥을 만들어 줍니다. 몰아서 하고 무너지는 패턴이 반복돼도, 한 번에 완전히 놓아 버리지는 않는 이유가 여기에 있습니다. 이 버팀힘은 잘 쓰면 큰 일도 해내게 하지만, 회복이 따라오지 않으면 소진으로 이어집니다."
    },
    {
     "title": "방향성",
     "body": "목 33퍼센트는 해야 할 일을 보면 곧장 방향을 잡는 감각으로 나타납니다. 그래서 지수님은 막연히 불안해하기보다, 일을 손에 쥐고 정리하면서 불안을 다루려는 편입니다. 문제는 그 방향성이 쉴 틈 없이 계속 작동할 때입니다."
    }
   ],
   "weaknesses": [
    {
     "title": "과점검",
     "body": "지수님은 끝난 일을 끝났다고 느끼기보다 다시 확인해야 안심하는 쪽에 가깝습니다. 완벽주의 82퍼센트가 이 습관을 더 단단하게 붙잡고 있습니다. 그래서 하루를 마쳐도 마음은 계속 업무 화면 위에 머물러 있습니다."
    },
    {
     "title": "휴식불안",
     "body": "쉬는 날에도 마음이 불편하다는 답은, 휴식이 지수님에게 자연스럽게 닫히는 문이 아니라는 뜻입니다. 몸은 멈췄는데 머리가 계속 일을 찾으니, 쉬는 시간이 오히려 불편한 공간이 됩니다. 이 불편함을 없애야 한다기보다, 불편해도 쉬어도 된다는 감각을 조금씩 익혀야 합니다."
    },
    {
     "title": "몰아치기",
     "body": "지수님은 평소에는 쌓아 두다가, 어느 순간 한꺼번에 밀어붙이는 흐름이 강합니다. 그래서 겉으로는 성실해 보여도 내부 리듬은 자주 과열과 붕괴 사이를 오갑니다. 그 결과가 번아웃 모듈에서 말하는 완주형 소진입니다."
    },
    {
     "title": "불안반응",
     "body": "월요일 아침 메신저 알림처럼 작은 자극도 지수님에게는 크게 느껴질 수 있습니다. 이미 지친 상태라면 그 알림은 단순한 연락이 아니라 뒤처짐의 신호처럼 읽히기 쉽습니다. 그래서 반응 속도를 늦추는 장치가 꼭 필요합니다."
    }
   ],
   "fit_good": "지수님에게 맞는 환경은 일을 끊어 주는 경계가 분명한 곳입니다. 하루에 해야 할 범위가 정해져 있고, 끝난 뒤에는 다음 알림이 바로 이어지지 않는 리듬이 좋습니다. 오전에 집중하고 오후에 정리하는 식으로 한 번에 오래 버티기보다, 짧게 마치고 확실히 끊는 하루가 더 잘 맞습니다.",
   "fit_bad": "항상 연결되어 있어야 하는 환경은 지수님을 빨리 닳게 합니다. 메신저 알림이 쉬는 시간까지 밀고 들어오는 곳에서는 머리가 계속 일터를 떠나지 못합니다. 마감이 연달아 붙고 확인이 끝없이 이어지는 하루는 소진을 더 빠르게 만듭니다.",
   "behavior_guides": [
    {
     "title": "알림끊기",
     "body": "저녁 9시 이후에는 메신저 알림을 꺼 두세요. 하루에 한 번, 적어도 30분은 화면을 보지 않는 시간을 먼저 정해 두는 것이 좋습니다. 월요일 아침에는 바로 답하지 말고, 물 한 컵을 마신 뒤에 확인하는 순서를 만들어 보세요."
    },
    {
     "title": "재점검멈춤",
     "body": "일을 끝낸 뒤 다시 훑어보는 습관은 한 번만 허용하세요. 마감 후 10분 안에 체크를 끝내고, 그 뒤에는 메모를 닫아 두는 연습이 필요합니다. 같은 내용을 두 번 넘게 보게 되면, 그때는 점검이 아니라 불안인지 먼저 확인해 보세요."
    },
    {
     "title": "회복예약",
     "body": "쉬는 날에는 아무것도 안 하려 하기보다, 쉬는 일을 먼저 일정에 넣으세요. 점심 뒤 20분 산책이나 낮잠 15분처럼 짧고 확실한 회복을 정해 두면 좋습니다. 회복을 느낌이 아니라 일정으로 다루면, 불편함이 덜 흔들립니다."
    },
    {
     "title": "하루마감",
     "body": "퇴근 전 마지막 15분은 내일 할 일 적는 시간으로만 쓰세요. 그다음에는 화면을 닫고, 오늘 끝난 일 세 가지만 적어 두면 충분합니다. 남은 미흡함보다 끝난 것 세 가지를 먼저 보게 하는 훈련이 지수님에게는 필요합니다."
    }
   ],
   "mindset_guide": "번아웃은 배터리가 없는 문제가 아니라, 계속 충전기에 꽂아 둔 채 쓰는 문제에 더 가깝습니다. 지수님은 일을 더 잘하려고 스스로를 계속 꽂아 두는 쪽입니다. 그런데 충전기는 오래 꽂아 둔다고 힘이 늘지 않습니다. 잠깐 빼 두어야 다시 오래 갑니다.",
   "closing_title": "끝났는데도 끝나지 않은 하루",
   "closing_body": "지수님은 이미 많은 걸 해내는 사람입니다. 다만 그 해냄이 쉬는 힘을 밀어내고 있어서 더 지치고 있습니다. 오늘부터는 끝낸 뒤 다시 시작하지 않는 연습이, 지수님을 지키는 가장 현실적인 시작입니다."
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
 "casey": {
  "content": {
   "title_line1": "Tu mente no suelta la tarea",
   "title_line2": "y el lunes vuelve a encenderse sola",
   "subtitle": "Informe profundo del módulo  Agotamiento — saju × psicología × acompañamiento integrado",
   "opening_scene": "El domingo por la noche, el cuerpo ya pide pausa, pero la mente vuelve a abrir cada pendiente como si aún faltara algo por corregir. El lunes por la mañana, los mensajes encienden otra vez esa tensión, y tú sigues revisando aunque el trabajo ya haya terminado. Terminas una cosa y, en vez de sentir cierre, aparece la necesidad de volver al principio. Luego aguantas demasiado y el cansancio se te junta con un poco de ansiedad. Casey, ¿no se parece esto mucho a tus días de ahora?",
   "case_tag": "CASO — Martín, 30 y tantos, con trabajo exigente y poco margen mental",
   "case_paragraphs": [
    "Martín salía de la oficina con la computadora cerrada, pero en la cabeza llevaba todavía tres correos sin responder y una lista invisible de errores posibles. En casa intentaba descansar, aunque cada pausa le parecía incompleta. Si algo quedaba bien, igual lo volvía a mirar desde el principio. Por fuera parecía un día normal; por dentro, nada terminaba de apagarse.",
    "Con el tiempo, ese ritmo le dejó el hábito de acumular y luego derrumbarse de golpe. Su mapa también mostraba madera muy fuerte y agua muy baja, así que vivía empujando más de lo que recuperaba. Cuando entendió eso, dejó de pelearse con su forma de funcionar y empezó a poner límites más concretos. Tú también puedes reconocer ese mismo circuito antes de que te pase por encima."
   ],
   "oheng_intro": "Tu madera y tu metal están ambos en 38%, y esa simetría hace que la mente empuje con mucha fuerza mientras el criterio revisa sin descanso. El agua en 0% deja poco margen para soltar, enfriar y recuperar entre un tramo y el siguiente. En un módulo de agotamiento, eso se nota como trabajo terminado por fuera y revisión encendida por dentro.",
   "quiz_reading": "El 82% en perfeccionismo y el 34% en recuperación dibujan un día en el que cerrar algo no basta para sentir alivio. En el perfil Quien termina todo y se agota, no te quedas en la tarea: vuelves sobre ella hasta que la mente la deja más pesada que al empezar. Por eso un día libre puede sentirse inquietante, incluso cuando el cuerpo ya no tiene más que dar.",
   "element_readings": {
    "wood": {
     "heading": "madera fuerte — impulso que no aprende a soltar",
     "body": "Tu madera está en 38%, y eso se nota como una mente que quiere avanzar, corregir y seguir. En el agotamiento, esa fuerza no se queda quieta: toma el lunes por la mañana como una señal para volver a empujar. Por eso, aunque ya hayas terminado, tu cabeza busca otra vuelta más. En ti, la madera no camina; acelera."
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
   "upcoming_period_heading": "",
   "upcoming_period_body": "",
   "cross_analysis_quotes": [],
   "answer_notes": [],
   "chat_snapshot_note": "",
   "chat_trigger_note": "",
   "chat_repeat_note": "",
   "chat_fear_note": "",
   "psychology_fact_heading": "",
   "psychology_fact_body": "",
   "psychology_takeaway": "",
   "strengths": [],
   "weaknesses": [],
   "fit_good": "",
   "fit_bad": "",
   "behavior_guides": [],
   "mindset_guide": "",
   "closing_title": "",
   "closing_body": ""
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
 "lucia": {
  "content": {
   "title_line1": "Terminas todo,",
   "title_line2": "y tu energía también se queda en el borde.",
   "subtitle": "Agotamiento profundo — módulo 0 — sutil integración de mapa × pruebas × acompañamiento",
   "opening_scene": "Es lunes por la mañana y los mensajes llegan antes de que tu cuerpo termine de despertar. Tienes el teléfono en la mano, pero la cabeza ya está repasando lo de ayer, lo de hoy y lo que todavía no hiciste. Dices que vas a descansar, aunque por dentro algo sigue contando pendientes y comparando. Lucía, ¿no se parece demasiado esto a tus noches de estos días?",
   "case_tag": "CASO — Clara, treintañera, revisa todo antes de cerrar el día",
   "case_paragraphs": [
    "Clara termina su trabajo y, en vez de cerrar la computadora, vuelve a abrirlo todo para mirar una vez más cada detalle. Su pausa de media tarde se le llena de notificaciones y de la sensación de que todavía falta algo. Aunque el cuerpo pide silencio, ella sigue buscando la forma de dejarlo perfecto. Al final del día, lo que más pesa no es la tarea, sino la revisión que no se apaga.",
    "Ese ritmo le fue dejando una tensión limpia por fuera y muy incómoda por dentro. Su mapa tiene tierra muy marcada y metal ausente, así que le cuesta soltar el control cuando algo ya está hecho. A veces parece que descansa, pero en realidad sigue sosteniendo el día con la mente. Tú también podrías reconocerte en esa forma de no soltar del todo."
   ],
   "oheng_intro": "Tu tierra de 38% domina el mapa y le da peso a todo lo que tocas, incluso a lo emocional. Como el metal está en 0%, cuesta más poner borde, cortar a tiempo y dar por terminado lo que ya está bien. En el agotamiento, eso se nota cuando tu cabeza sigue apretando incluso después de haber cumplido.",
   "quiz_reading": "Tu perfeccionismo de 82% no se queda en una idea bonita de orden; se mete en la mano que vuelve al texto, en la mirada que revisa el detalle y en la cabeza que no acepta cerrar del todo. La puntuación baja de recuperación, 34%, explica por qué el descanso no te baja el volumen interno. En el tipo Quien termina todo y se agota, tú no te rindes por falta de fuerza: te gastas por no dejar una puerta sin mirar.",
   "element_readings": {
    "wood": {
     "heading": "madera en equilibrio tenso — lo que empuja sin pedir permiso",
     "body": "Tu madera está en 13%, así que el impulso de avanzar existe, pero no lleva la escena principal. Por eso no sueles explotar de golpe; más bien acumulas, corriges y sigues tirando del día con una paciencia que se va gastando. En una semana como la tuya, la madera aparece cuando quieres empezar de nuevo aunque todavía estés revisando lo anterior. No te falta movimiento: te falta espacio para que ese movimiento no se convierta en carga."
    },
    "fire": {
     "heading": "fuego en ritmo alto — la chispa que no sabe apagarse",
     "body": "Tu fuego está en 25%, y en un cuadro de agotamiento eso se siente como intensidad que sigue encendida cuando ya no conviene. Los mensajes del lunes por la mañana te lo muestran bien: una sola señal basta para encender otra vez la alarma interna. El fuego aquí no te da ligereza; te da urgencia, y esa urgencia te empuja a responder antes de haber respirado. Cuando hay tanta chispa, descansar requiere más que parar el cuerpo."
    },
    "earth": {
     "heading": "tierra dominante — sostener hasta que el peso se note",
     "body": "Tu tierra está en 38%, y eso hace que quieras dejar todo firme, cerrado y en orden antes de permitirte bajar la guardia. En el agotamiento, esa tierra se ve en la frase que te acompaña por dentro: si paro, me quedo atrás. También se ve en ese patrón de acumular y luego derrumbarte, como si sostener fuera más seguro que aflojar un poco cada día. Tu tierra no es pereza ni rigidez vacía; es la costumbre de cargar con demasiado tiempo sin pedir relevo."
    },
    "metal": {
     "heading": "metal ausente — el borde que no termina de aparecer",
     "body": "Tu metal está en 0%, y eso deja sin apoyo justo la función que ayuda a recortar, separar y dar por concluido. Por eso el descanso no se siente como descanso: el cuerpo se detiene, pero la mente sigue revisando. Aquí sí aparece la única relación que llena ese hueco: la tierra puede nutrir al metal, y en tu caso eso habla de aprender a poner límites desde la misma solidez que ya tienes. No necesitas inventarte una dureza nueva; necesitas dejar que tu propia tierra te ayude a marcar el final."
    },
    "water": {
     "heading": "agua en flujo constante — sensibilidad que no se apaga del todo",
     "body": "Tu agua está en 25%, y por eso no solo piensas en lo que falta: también lo sientes en el cuerpo. Esa combinación hace que el cansancio no sea seco, sino mezclado con una inquietud que sigue incluso en un día libre. Cuando descansas y aun así no descansas, el agua está ahí recordándote todo lo que todavía no se ha soltado. En tu caso, la sensibilidad no te vuelve blanda; te vuelve receptiva a cualquier señal que parezca pendiente."
    }
   },
   "upcoming_period_heading": "De los 38 a los 47 años, llega un fuego más fuerte",
   "upcoming_period_body": "Entre los 38 y los 47 años, la energía se vuelve más visible y más rápida. Lo que hoy te cuesta sostener en silencio puede pedirte una forma más clara de actuar, decidir y mostrar lo que quieres. Si preparas ahora un modo de cerrar sin revisar una y otra vez, ese tramo puede darte impulso en vez de desgaste. Lo importante será entrar con criterio, no con más acumulación.",
   "cross_analysis_quotes": [
    "Tu tierra de 38% no te deja soltar a medias. Por eso un 82% en perfeccionismo no se queda en una idea, sino en un cuerpo que vuelve a revisar aunque ya terminó. Esa combinación hace que el cierre se te vuelva una tarea más. Y ahí es donde la energía empieza a filtrarse.",
    "La tierra quiere dejar todo firme, y el perfeccionismo le da una excusa elegante para seguir apretando. Por eso tu mente no se conforma con acabar: necesita comprobar, y ahí se te va la energía. Cuando esa lógica se repite, el descanso pierde su borde y se vuelve otra forma de vigilancia."
   ],
   "answer_notes": [
    "Volver al inicio después de terminar una tarea muestra que no te basta con cumplir; necesitas sentir que todo quedó realmente cerrado. En tu día, eso se traduce en abrir otra vez lo que ya habías dejado listo, como si la tranquilidad dependiera de una última pasada. Te conviene recordar que no todo lo bien hecho necesita una segunda vigilancia.",
    "Sentir inquietud incluso en un día libre revela que tu recuperación no se activa solo por detenerte. Tu cuerpo puede estar quieto mientras tu mente sigue buscando algo que corregir o anticipar. No se trata de descansar más horas, sino de bajar la alerta que se queda encendida dentro."
   ],
   "chat_snapshot_note": "Tu frase sobre descansar pero no sentir descanso resume algo muy concreto: no te falta pausa, te sobra vigilancia. Y cuando dices que hay cansancio y un poco de ansiedad, aparece la mezcla exacta que ya se ve en tu perfeccionismo alto y en tu metal en 0%. Lo que más pesa no es solo el trabajo; es la sensación de que ni siquiera al parar puedes dejar de sostenerte.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te golpean porque no llegan solo como mensajes, sino como una orden de volver a estar disponible. Ahí se activa tu fuego de 25%, que en vez de encender entusiasmo enciende tensión. Esa reacción encaja con una mente que ya venía revisando y que interpreta cualquier aviso como señal de que no puede aflojar.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte muestra que aguantas más de lo que tu recuperación puede devolver. Primero sostienes, corriges y sigues; después el cuerpo cobra la cuenta de golpe. Si quieres salir un poco de ese ciclo, te conviene soltar una sola cosa antes de que todo se vuelva demasiado pesado.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de debilidad, sino de una exigencia interna muy fuerte. Debajo de ese miedo hay un deseo claro: seguir siendo parte, seguir avanzando y no perder tu lugar. Cuando lo miras así, ya no parece una amenaza; parece una necesidad de seguridad que pide otra forma de cuidado.",
   "psychology_fact_heading": "Perfeccionismo y recuperación del esfuerzo",
   "psychology_fact_body": "Tu 82% en perfeccionismo y tu 34% en recuperación muestran una combinación muy concreta: terminas algo y tu mente no acepta soltarlo del todo. En tu caso, el perfeccionismo no se queda en querer hacer bien las cosas; empuja a volver a revisarlas, como en tu respuesta de mirar todo desde el principio. Con esa recuperación baja, el descanso se queda corto y la alerta sigue encendida. No es una idea abstracta: es la forma exacta en que tu energía se te va cuando todo parece ya terminado.",
   "psychology_takeaway": "No te falta disciplina; te sobra revisión. Cuando el cierre no llega, la energía se va por la grieta.",
   "strengths": [
    {
     "title": "Firmeza",
     "body": "Tu tierra de 38% te da una capacidad real para sostener lo que otros dejarían a medias. Se nota en que terminas tareas y luego vuelves a mirarlas, como si tu mano no quisiera abandonar el cuidado. Esa constancia es valiosa, siempre que no te obligue a cargar sola con todo el peso."
    },
    {
     "title": "Precisión",
     "body": "Tu perfeccionismo de 82% no nace del capricho, sino de un deseo fuerte de dejar las cosas bien hechas. En la práctica, eso puede verse en revisar desde el principio otra vez, incluso cuando ya habías terminado. Bien orientada, esa precisión te permite detectar detalles que otras personas pasan por alto."
    },
    {
     "title": "Sensibilidad",
     "body": "Tu agua de 25% hace que notes enseguida cuándo algo sigue abierto por dentro. Por eso un día libre no siempre se siente libre: tu cuerpo capta la inquietud aunque estés quieta. Esa sensibilidad te da información fina sobre tu estado antes de que el derrumbe llegue del todo."
    },
    {
     "title": "Impulso",
     "body": "Tu fuego de 25% mantiene vivo el empuje, incluso cuando ya vienes con poca energía. Se ve en cómo reaccionas a los mensajes del lunes por la mañana, como si una chispa bastara para reactivar la tensión. Ese impulso puede ayudarte mucho si aprendes a no usarlo como combustible para seguir agotándote."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión",
     "body": "Tu metal en 0% deja muy poco espacio para decir “ya está” sin mirar una vez más. Eso hace que un trabajo terminado siga ocupando cabeza y manos. Lo que parece cuidado termina robando descanso."
    },
    {
     "title": "Acumulación",
     "body": "Tu patrón de acumular y luego derrumbarte muestra que aguantas más de lo que recuperas. Vas guardando tensión pequeña, y un día esa suma te cae encima de golpe. No es falta de esfuerzo; es exceso de carga sin descarga intermedia."
    },
    {
     "title": "Hipervigilancia",
     "body": "Tu mente se activa rápido cuando aparece una señal como los mensajes del lunes por la mañana. En vez de leerlos como un dato más, los convierte en un aviso interno. Esa vigilancia constante te mantiene lista, pero también te impide bajar del todo."
    },
    {
     "title": "Autoexigencia",
     "body": "Tu perfeccionismo alto hace que el descanso también se mida como si fuera una tarea. Incluso en pausa, aparece la sensación de que falta algo por hacer. Esa dureza no te mejora el resultado; solo te deja con menos aire."
    }
   ],
   "fit_good": "Te conviene un entorno donde puedas cerrar por bloques y no vivir en interrupción constante. Un día con espacios claros, tareas concretas y poca revisión externa te ayuda a no convertir cada cierre en una nueva apertura. También te favorece trabajar con personas que respeten tus límites y no alimenten la urgencia con mensajes a deshoras.",
   "fit_bad": "Te desgastan los entornos donde todo cambia a última hora y cada mensaje parece exigir respuesta inmediata. Un día así te empuja a revisar, corregir y volver a empezar sin pausa. Si además te ponen a demostrar que siempre puedes más, tu energía se va antes de que termine la jornada.",
   "behavior_guides": [
    {
     "title": "Corte final",
     "body": "Cuando termines una tarea, date cinco minutos para revisar solo una vez y luego cierra el archivo o deja el objeto fuera de vista. Hazlo cada día al final de tu bloque principal, no cuando ya estés de madrugada. Ese límite pequeño entrena a tu mente para aceptar el cierre."
    },
    {
     "title": "Pausa real",
     "body": "En un día libre, separa veinte minutos sin pantalla ni mensajes, aunque la inquietud aparezca al principio. Quédate ahí con algo simple, como una bebida o una caminata corta, sin usar ese rato para producir. Repetido varios días, ese espacio le enseña a tu cuerpo que parar no es perder."
    },
    {
     "title": "Mensaje diferido",
     "body": "Si un mensaje te activa, espera diez minutos antes de responder y mira primero cómo está tu respiración. Hazlo especialmente en la mañana, cuando la tensión entra más rápido. Esa demora breve te ayuda a responder desde elección y no desde alarma."
    },
    {
     "title": "Límite visible",
     "body": "Escribe al empezar el día cuál será la última tarea que sí vas a revisar y cuál no tocarás más. Déjalo a la vista en tu escritorio o en una nota del teléfono. Tener ese borde visible le da forma a tu metal ausente sin pedirte más fuerza de la que ya tienes."
    }
   ],
   "mindset_guide": "Tu mente se comporta como una mesa con demasiadas cosas encima. Cuanto más dejas allí, más difícil se vuelve distinguir qué ya terminó. No necesitas más presión para sostenerlo todo. Necesitas aprender a retirar una pieza antes de que el peso te gane.",
   "closing_title": "Cuando ya basta",
   "closing_body": "Lo que hoy te agota no es solo hacer mucho; es no permitir que nada termine de verdad dentro de ti. Cuando empieces a cerrar una cosa sin volver a abrirla, vas a notar que el descanso empieza a parecerse al descanso. Y si te quedas con una sola frase de todo esto, que sea esta: no tienes que vigilar todo para seguir avanzando."
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
 },
 "mia": {
  "content": {
   "title_line1": "You keep checking even after the work is done.",
   "title_line2": "And the moment you rest, your mind starts counting again.",
   "subtitle": "Burnout deep dive report — Saju x psychological test x counseling integration",
   "opening_scene": "It is late, and your phone is still within reach. A Monday morning message lands, and your body answers before your mind does: shoulders tight, eyes open, thoughts already moving through what still needs fixing. You tell yourself you are resting, but your attention keeps circling back to unfinished edges and what might slip if you stop. Even after the day is over, you are still checking, still bracing, still half at work in your head. Mia, isn’t this what your nights have been looking like lately?",
   "case_tag": "CASE — Elena, early 30s, always on after the task is done",
   "case_paragraphs": [
    "Elena finishes her workday with a clean checklist, then sits back down to reread every line one more time. If a message comes in on Monday morning, she feels her chest tighten before she even opens it. She keeps telling herself she will rest after one last check, but the checks keep multiplying. By the time she closes her laptop, the evening already feels spent.",
    "That habit leaves her tired in a very specific way: not from doing too little, but from never fully standing down. Her Five Elements pattern is similar to yours, with strong Wood and weak Water, so the mind keeps pushing forward while recovery stays thin. The result is a person who can finish almost anything, but cannot easily let the finishing count. You would recognize yourself in that loop too."
   ],
   "oheng_intro": "Your Five Elements pattern is heavily Wood at 38%, while Water sits at 13%. In a burnout pattern, that often looks like constant forward motion with too little inner replenishment. You push, refine, and extend yourself, but the part that should soften and restore you is running on a smaller reserve.",
   "quiz_reading": "Your 82% Perfectionism and 34% Recovery explain why finishing something does not give you a clean stop. With Finisher's Drain, the task ends, but your mind keeps reopening it, searching for what could still be improved. That is why a day off can still feel tense, especially when one Monday message is enough to switch the whole system back on.",
   "element_readings": {
    "wood": {
     "heading": "Wood overfull — growth that never wants to stop",
     "body": "Wood at 38% is the strongest current in your chart, and it shows up as momentum that does not like to pause. In this burnout pattern, that can look like finishing a task and immediately reaching for the next fix, the next edit, the next safeguard. You do not just want things done; you want them clean, sharp, and still moving forward. That is why a Monday morning message can feel less like a note and more like a branch snapping back into tension."
    },
    "fire": {
     "heading": "Fire moderate — heat that burns through the day",
     "body": "Fire sits at 13%, so your energy is not loud all the time, but it can flare when pressure rises. In your burnout pattern, that flare shows up when you are trying to cram, push through, and hold yourself together long enough to finish. It is the part of you that can power a sprint, but not a long recovery. When the work is done, the heat drops fast, and the crash feels sharper because so much was spent at once."
    },
    "earth": {
     "heading": "Earth moderate — the ground you keep overloading",
     "body": "Earth is also at 13%, which gives you enough structure to keep carrying responsibility, but not enough slack to absorb endless strain. In this burnout pattern, Earth looks like the part of you that says there is still one more thing to organize before you can stop. That makes your rest feel provisional, as if even sitting still is only allowed after the list is fully settled. You keep standing on the same ground until it feels packed too hard to soften."
    },
    "metal": {
     "heading": "Metal balanced — the edge that keeps things precise",
     "body": "Metal at 25% gives you a strong instinct to review, trim, and get things right. In your burnout pattern, that precision is useful, but it also feeds the habit of going back to re-check everything after a task is finished. It is the part of you that notices what could be cleaner before anyone else sees it. That makes you reliable, but it also means closure can feel like a door you are not fully allowed to shut."
    },
    "water": {
     "heading": "Water weak — rest that does not yet refill you",
     "body": "Water is the weakest element at 13%, and that matters because this is the part that should cool, replenish, and let your system settle. The only balancing path here is Metal feeding Water, so your careful review can support recovery only when it becomes a boundary instead of a loop. Right now, though, the same checking that helps you finish is also keeping you from feeling restored. That is why you can rest and still feel uneasy, as if your body heard the word but not the permission."
    }
   },
   "upcoming_period_heading": "From age 33 to 42, a wetter season arrives",
   "upcoming_period_body": "From age 33 to 42, Water becomes stronger, and that changes the feel of effort. What now gets pushed through in a rush may later ask for more pacing, more breathing room, and more trust in what is already done. If you learn now to stop checking the same thing twice, that future period can feel less like a correction and more like relief. What you practice before then will decide whether that season feels restful or just unfamiliar.",
   "cross_analysis_quotes": [
    "Your 38% Wood and 82% Perfectionism are saying the same sharp thing: you keep growing the task after the task is already finished. That is why a completed day can still feel open-ended to you. The work ends, but your mind keeps branching into one more check, one more adjustment, one more look.",
    "Your weak Water and 34% Recovery explain why rest does not land cleanly. You can sit down, but your system stays alert, and that alertness keeps the rest from becoming rest. The body is paused, but the inner meter is still running."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that finishing is not the same as settling for you. It reveals a mind that trusts accuracy more than closure, especially when something matters. You are not careless; you are trying to protect the result from any crack you might have missed.",
    "Feeling uneasy even when you rest shows that your off time is still being monitored from the inside. A day off can become another place where you evaluate whether you are doing recovery correctly. You deserve rest that does not require a performance review."
   ],
   "chat_snapshot_note": "You said, 'I rest but it never feels like resting,' and that line sits right next to 'tired and a little anxious.' Those two pieces fit together tightly: your body wants to stop, but your mind keeps scanning for what comes next. The image is simple and exact, and it is the one to keep: you are exhausted, and you are still checking.",
   "chat_trigger_note": "Monday morning messages hit you so hard because they do not just ask for attention; they reactivate the whole unfinished system. For someone with strong Wood and high Perfectionism, that kind of ping feels like a branch being pulled before it has fully settled. The message itself is small, but it opens the door to everything you were trying to hold in place.",
   "chat_repeat_note": "Your pattern is cramming, then crashing. You load the day too full, push until the finish line, and then pay for it all at once when the pressure finally drops. A smaller step helps here: stop one round earlier, and let the first version be enough before you touch it again.",
   "chat_fear_note": "The fear underneath your pace is not laziness or weakness. It is the fear that if you stop, you will fall behind, and that thought keeps you moving even when you are tired. What you really want is not endless motion; you want safety that does not depend on constant effort.",
   "psychology_fact_heading": "Self-monitoring and perfectionism",
   "psychology_fact_body": "Perfectionism often overlaps with high self-monitoring, where a person keeps checking their own output for flaws, gaps, or risk. That pattern can be useful for quality, but it also makes closure harder because the mind stays in review mode after the task is already complete. In your case, the 82% Perfectionism score and the habit of re-checking everything fit that pattern closely. The result is not just high standards; it is a hard time letting the work be finished without reopening it.",
   "psychology_takeaway": "You do not just finish tasks; you keep auditing them. Your relief will grow when finishing stops meaning 'keep checking.'",
   "strengths": [
    {
     "title": "Follow-through",
     "body": "You do not leave things half done, and that shows in how you keep returning to the task until it feels complete. In a Monday-morning message situation, you are the person who notices what still needs attention before anyone else does. That makes you dependable, even when it costs you energy."
    },
    {
     "title": "Precision",
     "body": "Your strong Metal and high Perfectionism give you a sharp eye for what is off. You can see the detail that would slip past someone else, and you do not ignore it. That precision is part of why you end up re-checking everything after the task is finished."
    },
    {
     "title": "Persistence",
     "body": "Even when you are tired and a little anxious, you still keep going. The cramming part of your pattern shows real stamina, not because it is easy, but because you can keep pushing through until the work is done. That same persistence can become steadier when it is not forced into a sprint."
    },
    {
     "title": "Responsiveness",
     "body": "You react quickly to what is happening around you, especially when a message or deadline lands. That sensitivity can make you effective in fast-moving moments, because you notice the shift right away. With better recovery, that quick response would feel less like panic and more like skill."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking",
     "body": "You go back to the finished thing and ask it one more question. That habit may feel responsible, but it keeps your mind from stepping out of work mode. When you re-check everything, the task is over, yet your nervous system stays on duty."
    },
    {
     "title": "Poor recovery",
     "body": "Your rest does not always register as rest, which means the break is happening without the full internal landing. You can sit still and still feel uneasy, as if you have to earn the pause. That makes recovery look present from the outside, but thin from the inside."
    },
    {
     "title": "Crash cycle",
     "body": "You cram until you have no room left, then you crash all at once. The problem is not only the workload; it is the way you spend yourself in bursts instead of pacing the effort. That cycle leaves you tired, and then more anxious because you can feel the next crash coming."
    },
    {
     "title": "Fear of slowing",
     "body": "You seem to believe that stopping could make you fall behind. That fear keeps pressure in the system even during downtime, so rest starts to feel risky instead of restoring. It is understandable, but it also keeps you from trusting a quieter pace."
    }
   ],
   "fit_good": "You do best in a relationship rhythm that leaves space between contact and does not punish slow replies. A partner who is clear, steady, and not easily thrown by a pause will help your nervous system settle instead of scanning for trouble. When the evening is calm and the message tone is consistent, you can actually feel the connection rather than manage it.",
   "fit_bad": "You will struggle in a dynamic where messages are unpredictable and attention feels like a test. If every silence turns into a question and every reply has to be perfect, your mind will stay on guard all day. That kind of pace turns romance into another task list, and you already have enough of those.",
   "behavior_guides": [
    {
     "title": "One-pass check",
     "body": "When you finish a message, a plan, or a shared detail, give yourself one final check and stop there. Do it once, not three times, and set a 10-minute timer if you need a hard edge. The point is to train your mind that completion can survive without reopening."
    },
    {
     "title": "Recovery block",
     "body": "Put a 20-minute no-review window on the first part of your day off. No messages, no re-checking, and no 'just one look' at what is waiting. Let your body learn that time off can begin before you feel fully convinced."
    },
    {
     "title": "Message buffer",
     "body": "When a Monday morning message lands, wait two minutes before answering. Use that gap to breathe, put the phone down, and name the first feeling that comes up. That small buffer keeps one message from resetting your whole system."
    },
    {
     "title": "Stop point",
     "body": "Choose a daily stop point in advance, such as 8:30 p.m., and treat it as the end of work even if the mind wants another pass. Write down the one thing you will revisit tomorrow, then close the notebook or laptop. The habit is small, but it teaches your body that finishing can mean release."
    }
   ],
   "mindset_guide": "Think of your burnout like a phone that keeps checking for updates after it has already reached 100%. The problem is not that it cannot work; it is that it never quite exits the checking mode. Your job is not to force more charge into it, but to let it stay unplugged long enough to settle. When you stop treating every pause like a risk, recovery starts to feel real.",
   "closing_title": "Let the task end",
   "closing_body": "You are not failing at rest; you are learning how to let rest count. The same mind that keeps you precise can also learn where to stop, and that will matter more than one more check. Keep this one close: finished is allowed to mean finished."
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
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "sam": {
  "year": 2027,
  "title": "2027, a steadier fire",
  "subtitle": "A year of support, steady effort, and timely resets for Sam",
  "overview": "For you, 2027 feels like a year that brings support into the room instead of asking you to carry everything alone. As an Earth Day Master, you tend to do well when life gives you structure, and this year’s Fire tone can feel like warm light on solid ground: encouraging, clarifying, and quietly restorative. With your Five Elements spread quite evenly, the year is less about dramatic reinvention and more about noticing which part of your life is asking for a little more attention.\n\nThere is also a Mountain · Order quality in your chart, which makes consistency, timing, and clear priorities especially helpful. Early in the year, you may feel more ready to lead, decide, and push for results; midyear can bring more responsibility and a need to pace yourself; later months lean toward expression, sharing, and letting your effort become visible. Sam, the overall theme is not to force the year open, but to work with its rhythm and let support arrive in forms you can actually use.\n\nThe most useful posture this year is probably simple: stay organized, keep your plans visible, and leave a little space for adjustment. When things feel busy, a slower and more deliberate pace may serve you better than trying to prove anything. This is a year for steady gains, useful conversations, and the kind of progress that becomes clear only after you look back and notice how much has settled into place.",
  "chapters": {
   "wealth": {
    "heading": "money grows best with clean lines",
    "body": "This year’s money story looks more active than usual, especially in the months when you feel more able to take the lead. Because your chart already leans toward balance, the key may be not intensity but clarity: knowing what you want to direct your time and energy toward, and what can stay simple for now. The Mountain · Order pattern suggests you’re at your best when value is tied to structure, so practical choices may feel more satisfying than scattered opportunities.\n\nIn everyday life, this could show up as a clearer sense of what is worth the effort: a project with visible results, a side task that rewards consistency, or a chance to organize resources in a way that feels cleaner than before. You may also notice that when you try to do too much at once, the return feels thinner, while a focused push brings better traction. The year seems to favor deliberate action over impulsive action.\n\nA good starting point is to review where your energy is leaking and where it actually multiplies. Try choosing one financial habit or one work-related system to simplify, and let that become your anchor. If something looks promising, give it a careful look before you pour in more than you need to."
   },
   "love": {
    "heading": "connection asks for timing",
    "body": "Relationship-wise, 2027 looks like a year where warmth and momentum are available, but they work best when you don’t rush the pace. There are stretches where support comes naturally and others where interaction may feel a little more reactive, so timing matters. For someone with your steady Earth nature, this can be a useful reminder that closeness doesn’t always need to be pushed; sometimes it’s built by being dependable and present.\n\nYou might notice more meaningful conversations in settings where people already know your style, or where shared effort creates trust without needing a big announcement. In some moments, tension could come less from disagreement and more from trying to move before everyone is ready. If that happens, a pause, a softer tone, or a second reading of the situation may help the interaction stay constructive.\n\nA small step could be to pay attention to where your energy feels welcomed rather than demanded. Let some relationships breathe, and put more care into the ones that feel steady, mutual, and easy to return to. This year seems to favor connections that can hold both movement and patience."
   },
   "career": {
    "heading": "work rewards steady command",
    "body": "Career-wise, the year has a strong sense of initiative. The early months especially look suited to taking charge, setting direction, and making visible progress, while the middle of the year may ask you to handle more pressure with a calm hand. Because your chart is shaped like Mountain · Order, you may do especially well when responsibilities are organized into clear steps instead of treated as one huge block.\n\nIn daily work, this might look like being the person who can sort out the plan, make decisions, or keep a project from drifting. At the same time, there may be moments when you feel pulled in several directions and need to choose what matters most rather than trying to answer everything at once. The year seems to respect competence, but it also asks you not to overextend yourself just to prove it.\n\nOne useful move is to define your top priority before the month gets busy. Keep your schedule visible, and when new requests appear, check whether they truly fit the main direction you want to build. Progress this year may come less from speed and more from the right kind of momentum."
   },
   "study": {
    "heading": "learning comes with useful heat",
    "body": "Your learning life in 2027 looks active and rewarding, especially when the material connects to real-world use. Because the year brings support and replenishment, you may find it easier to absorb ideas when they are tied to practice, mentorship, or a clear purpose. With your even Five Elements balance, variety may help you stay engaged, but the Mountain · Order style suggests you’ll remember more when study is organized and repeatable.\n\nA likely scene is this: you open something new, feel energized by it, then realize you learn best when you can structure it into small, dependable sessions. That could mean notes, checklists, or a regular rhythm rather than long, irregular bursts. Later in the year, sharing what you’ve learned may become part of the learning itself, since expression helps the material settle.\n\nA good experiment would be to pick one topic and give it a simple weekly container. Keep it practical, and try turning one idea into a summary, a template, or a short explanation to someone else. This year seems to reward learning that becomes usable instead of merely impressive."
   },
   "health": {
    "heading": "protect your pace, not just your plans",
    "body": "For your body and mind, 2027 points toward rhythm, recovery, and sensible pacing. The year’s supportive quality can feel nourishing, but the middle of the year especially may make you feel more exposed to pressure if you keep saying yes without checking your capacity. Because you’re naturally more stable than flashy, your well-being tends to improve when your days have shape, not when they are packed to the brim.\n\nIn ordinary life, this could show up as noticing that your focus gets better when your schedule has breathing room, or that your mood stays steadier when you can move through tasks in a clean order. You may also find that quiet routines matter more than dramatic changes: regular sleep windows, simple meals, short walks, or a brief reset between commitments. The goal isn’t perfection; it’s a pace you can keep.\n\nTry building one small reset into your day, especially during busier months. It could be ten minutes of silence, a short stretch, or a tidy end-of-day ritual that helps your mind close its tabs. When you treat rest as part of the plan, the year may feel much easier to carry."
   }
  },
  "months": [
   {
    "headline": "First push",
    "body": "The early months favor initiative, so this is a good time to step forward and make a clear ask. Just keep an eye on enthusiasm that runs faster than your actual resources; a strong start works best when it stays grounded."
   },
   {
    "headline": "Sharper edges",
    "body": "Momentum is still there, but small snags may ask for patience and a second look. If something feels slightly off, it may be smarter to refine the plan than to force a clean finish."
   },
   {
    "headline": "Pressure builds",
    "body": "This month can feel more demanding, with responsibility asking for steadier attention. You may do well by protecting your inner space and choosing one or two priorities instead of trying to manage everything at once."
   },
   {
    "headline": "Big effort",
    "body": "The workload or expectations may feel more intense here, but that can also sharpen your focus. Stay open to surprises, and let flexibility be part of your strength rather than a sign of uncertainty."
   },
   {
    "headline": "Support arrives",
    "body": "This is a strong month for receiving help, learning from others, or recovering your balance. A direct clash in the background may push a change in direction, so the best move is to stay responsive and avoid locking yourself into one rigid version of the plan."
   },
   {
    "headline": "Warm relief",
    "body": "The flow here is gentler, and support may come in a form that feels quietly practical. The mood is a little unpredictable, though, so it helps to stay curious and not assume the month will unfold in only one way."
   },
   {
    "headline": "Easy rhythm",
    "body": "This month feels familiar and settling, which can be very comforting after the more intense stretch before it. Because the energy is not especially provocative, it may be a good time to enjoy what already works and let new openings appear naturally."
   },
   {
    "headline": "Quiet polish",
    "body": "You may feel more at ease in your own skin, and that can make this a good month for tidying, refining, or preparing. Connections may feel a little magnetic, so notice where attention gathers without needing to chase it."
   },
   {
    "headline": "Useful output",
    "body": "Your energy starts moving outward, which can support sharing, creating, or helping others in visible ways. The tradeoff is that this kind of month can drain you if you overgive, so keep an eye on how much you are producing versus how much you are replenishing."
   },
   {
    "headline": "Careful words",
    "body": "Expression stays active, but misunderstandings can creep in if messages move too quickly. It’s a helpful time to slow down before sending, presenting, or promising, especially when the stakes feel important."
   },
   {
    "headline": "Clear intent",
    "body": "Late in the year, your drive to direct outcomes becomes stronger again. This is a good window for making a serious request, setting a firm target, or deciding what deserves your effort next."
   },
   {
    "headline": "Ready to grow",
    "body": "The year closes with a sense of quiet preparation and forward motion. A helpful connection may feel especially natural now, so let alignment do some of the work instead of trying to manufacture momentum."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: choose your lane",
    "body": "Watch for the way initiative comes easily, then gets tested by small frictions and rising responsibility. Try choosing one main goal and one backup path, so your energy has direction without becoming scattered."
   },
   {
    "title": "May to July: pace the pressure",
    "body": "Notice where support is available, especially when a difficult turn or a clash-like push asks you to adapt. A practical action is to build a midyear reset ritual, such as a weekly review that helps you adjust before things pile up."
   },
   {
    "title": "August to October: make it usable",
    "body": "This stretch favors familiar routines, visible output, and careful communication. Consider turning your ideas into something shareable, while also checking that you are not giving away more energy than you can comfortably replace."
   },
   {
    "title": "November to January: set the next anchor",
    "body": "Watch for stronger command, clearer goals, and a sense that things are preparing to open. A good action is to define one concrete target for the next season and let your plans settle around that point."
   }
  ],
  "closing": "2027 doesn’t read like a year that asks you to become someone else. It looks more like a year that helps you use your existing strengths with better timing, better support, and less strain. If you keep your pace honest and your priorities visible, Sam, the year may leave you with a quieter kind of confidence: the kind that comes from knowing you can build, adjust, and keep going without having to force the whole path at once."
 },
 "riley": {
  "year": 2027,
  "title": "2027: your steady fire year",
  "subtitle": "A year of giving outward, then gathering back what you need",
  "overview": "2027 feels like a year that asks you to spend your energy with intention, Riley. Your core nature is wood-heavy and deeply rooted, so when fire arrives, it tends to bring expression, visibility, and output. That can feel exciting and productive, but it can also mean you’ll want to notice where you’re overextending yourself and where your efforts are actually creating real warmth around you.\n\nThe year doesn’t move in a straight line. Early months are more supportive and restorative, midyear asks for more showing up and making things happen, and late summer into autumn brings a sharper edge around money, initiative, and responsibility. Since your chart is already strong in wood and light on fire and metal, this is a year for balancing action with structure: say yes to growth, but keep your footing. You’ll likely do best when you treat momentum as something to shape, not something to chase.",
  "chapters": {
   "wealth": {
    "heading": "Money likes clear edges",
    "body": "This year can be good for taking the lead with money, projects, and results, especially from late summer into early autumn. Because the year’s fire energy tends to turn your ideas into visible action, you may find it easier to push for outcomes than to sit still and wait. For an Oak-like, rooted type, that can be useful, as long as you remember that strong roots still need a fence, a plan, and a stopping point.\n\nIn daily life, this may show up as wanting to upgrade something, negotiate more confidently, or bring a side project into a more concrete shape. You might also feel tempted to say yes to more than one financial goal at once, which can blur your focus. A simple way to work with this is to choose one main target per season and let the rest stay in the background. Riley, the year rewards clarity more than speed.\n\nA practical first step is to make your next three money-related decisions smaller and more specific. Instead of asking, \"How do I do everything?\" try asking, \"What is the one move that would make the rest easier?\""
   },
   "love": {
    "heading": "Connection grows through warmth",
    "body": "Your relationship life in 2027 looks more expressive than subtle. The fire tone of the year tends to bring more openness, more visible effort, and more chances to show care in direct ways. Early in the year, support and ease can make it simpler to receive affection; later, there may be more moments where you are the one giving energy, attention, or reassurance.\n\nA likely scene is a conversation that starts casually but becomes surprisingly honest, or a social setting where you feel more noticed than usual. With your rooted wood nature, you may naturally be generous, but this year asks you to keep an eye on whether generosity is being returned in some form. Not every connection needs to be intense; some of the best ones this year may simply feel steady, clear, and real.\n\nA good small move is to practice naming what feels good instead of only noticing what feels off. That can make your connections warmer without making them heavier."
   },
   "career": {
    "heading": "Visible effort, careful pacing",
    "body": "Career-wise, 2027 looks like a year where your work wants to be seen. The fire influence supports expression, delivery, and contribution, so this is a good time to put shape around ideas, present your work more clearly, and let people see what you can build. Because your chart already leans strongly toward wood, you may naturally want to keep growing; the key is making sure growth has a container.\n\nIn real terms, this could look like taking on more responsibility, leading a piece of a project, or being the person who brings momentum when others stall. Midyear especially may feel busier, and by late year the pressure can become more serious, but also more meaningful. The best results may come when you choose a pace you can sustain rather than trying to prove how much you can carry.\n\nA useful habit is to finish one thing before starting the next. That keeps your energy from scattering and helps your effort turn into something others can clearly recognize."
   },
   "study": {
    "heading": "Learning by doing",
    "body": "This year supports learning that has a real use. The early months are especially friendly for receiving help, recovering focus, and absorbing new material, while the middle of the year shifts toward output and application. For you, that means study may feel best when it is tied to a project, a skill, or a purpose you can actually touch.\n\nYou may notice that passive learning is less satisfying than it used to be. Reading, listening, or collecting ideas can still help, but 2027 wants you to test what you learn by using it. That fits your rooted wood nature well: trees don’t just store energy, they turn it into growth. If you’ve been meaning to improve a language, refine a craft, or deepen a professional skill, this is a good year to make it practical.\n\nTry choosing one skill to practice in small, repeatable steps. A little consistency will probably teach you more than a burst of enthusiasm followed by silence."
   },
   "health": {
    "heading": "Protect your rhythm",
    "body": "For body and mind, 2027 is less about dramatic change and more about rhythm. The year’s fire can bring activity, outward focus, and a sense of being pulled into motion, which may feel energizing at first and then a bit draining if you don’t leave room to recover. Since your Five Elements are already strong in wood and lighter in fire, balance may come from making rest and pacing part of the plan, not an afterthought.\n\nIn everyday life, this might show up as feeling most balanced when your days have a clear beginning, middle, and end. Busy stretches can be productive, but they may also make it easy to skip the little pauses that keep you steady. Rather than forcing a perfect routine, look for a repeatable one: meals at similar times, a short walk, a quieter evening, or a few minutes away from screens.\n\nOne gentle practice is to notice where your energy rises and where it leaks away. That simple awareness can help you keep the year feeling lively without letting it become too scattered."
   }
  },
  "months": [
   {
    "headline": "April's quiet support",
    "body": "This month feels like help arriving before you even ask for it. The energy is nourishing and restorative, so learning, receiving advice, and letting yourself recover all come more easily. A small opening can go a long way here."
   },
   {
    "headline": "May's bright pull",
    "body": "This is a month of strong attraction and easy connection. People may notice you more, or you may feel naturally drawn toward the places and conversations that feed you. It’s a good time to say yes to what feels genuinely energizing."
   },
   {
    "headline": "June, easy familiarity",
    "body": "The mood turns comfortable and recognizable, almost like slipping into a well-worn chair. That can be soothing, though it may not offer much novelty. If something feels repetitive, you can keep it simple and let it be enough."
   },
   {
    "headline": "May's fading edge",
    "body": "This month has a softer, winding-down quality, and that can make signals easier to misread. It helps to slow your assumptions before you act on them. A second look may save you from unnecessary confusion."
   },
   {
    "headline": "June takes the stage",
    "body": "Your output energy grows here, and it may feel easier to speak, create, and contribute. The atmosphere supports visible effort, but it can also ask a lot from you. Put your energy where it will actually be seen and used."
   },
   {
    "headline": "July's quiet vault",
    "body": "This month feels more inward than loud, as if your work is being stored before the next push. Progress may be happening behind the scenes rather than in public. That makes it a good time to refine, archive, and prepare."
   },
   {
    "headline": "August in motion",
    "body": "Momentum picks up sharply, and movement may come with a sense of turning a corner. This is a strong month for initiative and for handling practical results, but it can also tempt you to overdo it. Keep your focus narrow enough to stay effective."
   },
   {
    "headline": "September's sharp aim",
    "body": "This is a good month for pushing toward outcomes, especially if you’ve already chosen a clear target. The tone is direct and practical, though small snags may ask for patience. Progress comes more easily when you avoid trying to force every detail."
   },
   {
    "headline": "October under pressure",
    "body": "Responsibilities feel more noticeable now, and the pace may ask you to become more deliberate. That can be a useful kind of pressure, because it encourages structure and seriousness. Choosing your speed carefully will help the month feel solid instead of heavy."
   },
   {
    "headline": "November opens inward",
    "body": "A deeper, more private mood arrives, and what’s happening inside you may matter as much as what others can see. Surprises are possible, especially through close connections or unexpected shifts in tone. Stay open, but don’t rush to explain everything at once."
   },
   {
    "headline": "December's renewal",
    "body": "Support returns, and with it comes a sense of recovery and clearer perspective. There may still be some friction, but it can be the kind that helps you sharpen your direction. Let the month restore what the rest of the year has used up."
   },
   {
    "headline": "January's wild card",
    "body": "The year closes with a more unpredictable rhythm, which can be useful if you stay flexible. New information, sudden changes, or an unexpected opening may appear. Treat the month like a draft, not a final version."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive and sort",
    "body": "Watch for support, fresh energy, and easier learning. Use this window to ask for help, gather information, and separate what truly matters from what is merely interesting."
   },
   {
    "title": "May to July: express with limits",
    "body": "Notice where your output grows and where you start giving too much. Try one concrete project, one clear boundary, and one finishing habit so your energy goes somewhere useful."
   },
   {
    "title": "August to October: aim and pace",
    "body": "Pay attention to moments when initiative, money, and responsibility all rise at once. Choose one priority, keep your plans simple, and check the details before you commit your energy."
   },
   {
    "title": "November to January: restore and adapt",
    "body": "Look for deeper reflection, surprise turns, and the return of support. Make room for rest, review what worked, and keep your schedule flexible enough to absorb change without strain."
   }
  ],
  "closing": "Riley, 2027 doesn’t ask you to become someone else. It asks you to use your strength with more shape, more selectivity, and a little more patience. If you let the year be a rhythm of giving, steering, and recovering, it can feel both productive and deeply yours."
 },
 "jordan": {
  "year": 2027,
  "title": "2027: Your steady fire year",
  "subtitle": "A year for shaping, pacing, and using your energy well",
  "overview": "2027 feels like a year where the outer weather is lively, but your own center prefers calm clarity. With a Water Day Master, Fire can feel like something you are asked to manage rather than simply follow, which often makes this a good year for directing energy, shaping results, and noticing where ambition needs a lid. Your Five Elements pattern is also quite weighted toward Earth and Metal, so the year may feel practical, structured, and outcome-focused rather than dreamy or random. For Jordan, that can be a useful mix: enough heat to move things forward, enough structure to keep the movement useful.\n\nThe tone of the year is not constant, though. Early months are more familiar and easy to settle into; midyear asks for more output and more discipline; late summer can feel more demanding in a way that rewards patience and careful timing; and autumn tends to bring support, learning, and a sense of being helped back into rhythm. The overall pattern is less about dramatic reinvention and more about choosing where your effort goes, then letting that effort build something solid. If you keep your pace honest, 2027 can feel like a year of clean, visible progress rather than noisy pressure.",
  "chapters": {
   "wealth": {
    "heading": "Money with a steering wheel",
    "body": "This year can be favorable for taking the lead with money, results, and practical gains, especially because the year’s Fire energy is something you can actively direct. That often means there’s room to make decisions, set priorities, and see where your effort turns into visible return. Since your chart leans Earth and Metal, you may naturally prefer things that are measurable, organized, and worth the trouble, which can help you avoid scattering energy. The caution is simple: when the current is favorable, it can be tempting to push too hard or try to do everything at once.\n\nIn daily life, this may show up as a strong urge to take on a bigger project, renegotiate a plan, or make a more ambitious offer of your time and skill. You might also notice that certain opportunities feel magnetically close, as if they’re asking for quick confidence rather than long hesitation. The useful question is not only “Can I do this?” but “Can I do this without overfilling the tank?”\n\nA good first step is to choose one place where you want your effort to count and give it a clear boundary. Define what success looks like before you start, then check in halfway through so enthusiasm doesn’t outrun judgment."
   },
   "love": {
    "heading": "Connection that needs pacing",
    "body": "In relationships, 2027 seems to begin with ease and familiarity, then gradually ask for more attention to timing and tone. The first part of the year may feel socially comfortable, with less pressure to explain yourself and more room to simply be around people who already understand your rhythm. Later, the atmosphere becomes a little more active and demanding, which can be good for clarity but not always for speed. Because your Five Elements profile is not heavily Wood-based, it may help to treat connection as something that grows through steady gestures rather than big declarations.\n\nYou may find yourself in conversations that feel warm but not especially novel, or in moments where you want to be generous but also want your own space protected. There can also be a period where other people’s expectations feel stronger than usual, so it helps to notice whether you’re agreeing because it’s true or because the moment is loud. The year supports sincerity more than performance.\n\nTry small, consistent signals: reply with care, make plans you can actually keep, and say what you mean in plain language. That kind of rhythm can make your connections feel safer and more real without needing to become dramatic."
   },
   "career": {
    "heading": "Work that asks for shape",
    "body": "Career-wise, this looks like a year where your ability to organize, produce, and steer outcomes can stand out. The middle of the year especially favors action, initiative, and practical results, which suits a chart that already leans toward structure and discipline. Because the year can also bring periods of pressure and responsibility, your success is likely to depend less on speed and more on choosing a pace you can sustain. The strongest theme here is not “more effort” but “better-directed effort.”\n\nIn ordinary settings, this might look like being the person who can tighten a process, calm a messy workflow, or turn a broad idea into something usable. You may also notice moments when others look to you for direction, even if you didn’t ask for that role. That can be flattering, but it can also pull you into saying yes too quickly. Jordan, this is a good year to remember that being capable does not mean being endlessly available.\n\nA practical move is to make your priorities visible early. Write down the few outcomes that matter most, then let that list be the filter for new requests, so your energy goes where it can actually compound."
   },
   "study": {
    "heading": "Learning through refinement",
    "body": "Learning in 2027 may feel less like collecting new facts and more like strengthening what you already know. The year has a steady, practical quality, so study can go well when it is tied to application, structure, and clear purpose. Since your chart includes strong Earth and Metal, you may especially enjoy learning that can be sorted, tested, edited, or put into a reliable system. This is a good year for turning scattered knowledge into something ordered and usable.\n\nYou might notice that you learn best when the material has a direct use: a project, a certification, a skill you can apply, or a framework that helps you make decisions. By contrast, purely abstract learning may not hold your attention as well unless it connects to something concrete. There can also be periods when your mind feels full and orderly rather than wildly curious, which is not a drawback; it just means your learning style may favor depth over novelty this year.\n\nA strong approach is to keep one “working notebook” for ideas you want to reuse. Review it regularly, summarize in your own words, and turn each topic into a small action so the learning stays alive."
   },
   "health": {
    "heading": "Protecting your rhythm",
    "body": "For body and mind, 2027 points more toward rhythm than intensity. The year can bring bursts of output, but it also includes stretches that ask for waiting, quiet storage, and a slower internal pace. Since your chart already leans practical and contained, you may be good at holding things together for a long time before noticing you’ve used more energy than you intended. This year works better when you check your rhythm early, not only after you feel behind.\n\nIn everyday life, that may mean your schedule gets full with useful tasks, while your mind stays active even when the day is technically done. You may do best with routines that create clear starts and endings: a walk before work, a hard stop in the evening, or a simple ritual that tells your system it can settle. The goal is not perfection; it is keeping your pace legible to yourself.\n\nStart small by choosing one regular anchor, such as a fixed sleep window, a daily pause, or a short reset between tasks. When you keep one thing steady, the rest of the year tends to feel easier to carry."
   }
  },
  "months": [
   {
    "headline": "A familiar opening",
    "body": "February feels close to your own rhythm, so it may be easy to settle in and work from habit. The surprise is that small turns can appear when you least expect them, so flexibility is more useful than rigid plans."
   },
   {
    "headline": "Warmth with friction",
    "body": "March still feels familiar, but there can be a sharper edge in conversations and timing. If you slow down just enough to hear the other side fully, the month can stay productive without becoming tense."
   },
   {
    "headline": "Quiet output grows",
    "body": "April brings a softer, more internal kind of productivity, where expression and giving take more energy than they first seem to. This is a good month to produce steadily and avoid promising more than your calendar can hold."
   },
   {
    "headline": "First real spark",
    "body": "May keeps that outward, generative mood going, but with a stronger sense of starting something fresh. New ground is available here, especially if you let curiosity lead before you try to perfect the result."
   },
   {
    "headline": "Results come forward",
    "body": "June shifts into a more decisive current, where it can be easier to press for outcomes and take the lead. The pull of attention is strong, so it helps to choose your target carefully instead of chasing every open door."
   },
   {
    "headline": "Hold the line",
    "body": "July still supports action, but the atmosphere is quieter and more contained than June. Waiting can be part of the work now, and a patient delay may bring better timing than a forced move."
   },
   {
    "headline": "Pressure with a mirror",
    "body": "August asks for discipline and careful pace, and the month may feel more serious because people and situations can read each other a little sideways. Since the energy connects closely with your own foundation, it’s wise to check assumptions twice before reacting."
   },
   {
    "headline": "Steady under load",
    "body": "September continues the responsible tone, but with a clearer sense of direction and authority. You may feel called to take charge in a way that is useful, as long as you keep your tempo measured rather than forceful."
   },
   {
    "headline": "Help comes in",
    "body": "October feels like support returning to the picture, with room for learning, rest, and practical recovery. If you’ve been carrying too much by yourself, this is a good month to accept guidance or let someone else make things easier."
   },
   {
    "headline": "Movement and change",
    "body": "November can bring motion, new information, or a change in direction that shakes up your routine. Because the month also tends to stir things internally, it helps to stay adaptable and not cling too tightly to the first version of a plan."
   },
   {
    "headline": "Back to the familiar",
    "body": "December settles into a more recognizable rhythm again, with fewer surprises and more room to refine what already exists. Small interruptions may still appear, but they’re easier to handle when you keep your expectations simple."
   },
   {
    "headline": "Inner winter rhythm",
    "body": "January feels inward and reflective, like your system is organizing itself quietly before the next cycle begins. This is a good month for private planning, gentle closure, and noticing what wants to continue without being forced."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: settle and observe",
    "body": "Watch for the way familiar routines can hide small changes in mood, timing, or relationships. Try one concrete action: keep a short daily note on where your energy feels easiest and where it leaks, so you can adjust before the busier middle of the year."
   },
   {
    "title": "May to July: direct your effort",
    "body": "Pay attention to how often opportunity feels close enough to grab, and whether that makes you overcommit. Choose one project or goal to prioritize, and give it a simple boundary so your momentum stays useful instead of sprawling."
   },
   {
    "title": "August to October: slow, then steady",
    "body": "Notice where responsibility rises and where other people’s expectations become louder. Your best move is to pause before answering, then use that pause to confirm what is actually needed and where support can be accepted."
   },
   {
    "title": "November to January: receive and reset",
    "body": "Keep an eye on changes in direction, especially when they arrive through conversations, opportunities, or a shift in your routine. Let one small reset become a habit, such as weekly review or a protected evening off, so the next cycle starts with less drag."
   }
  ],
  "closing": "2027 does not ask you to become someone else; it asks you to use yourself more cleanly. The year has enough heat to move things forward, but it rewards the person who knows when to steer, when to wait, and when to let support in. If you work with the rhythm instead of fighting it, Jordan, the year can feel quietly satisfying in a very real way."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027, 지수님의 리듬 지도",
  "subtitle": "채워짐과 표현, 그리고 속도 조절이 함께 오는 해",
  "overview": "2027년은 지수님에게 에너지가 바깥으로 많이 흘러나가는 해로 읽혀요. 중심 기운이 나무처럼 크고, 전체 분포도 흙의 비중이 큰 편이라, 한 번 자리를 잡으면 오래 버티는 힘이 있는 대신 마음과 몸의 리듬이 한쪽으로만 쏠리지 않게 챙기는 감각이 중요해 보여요. 올해는 표현, 생산, 베풂이 자연스럽게 늘기 쉬워서 누군가를 돕거나 결과물을 내는 일에서 존재감이 살아나기 좋습니다.\n\n다만 그만큼 에너지 소모도 커지기 쉬워서, 처음부터 끝까지 같은 속도로 달리기보다는 구간별로 리듬을 나누는 편이 편했어요. 특히 상반기에는 도움과 회복이 들어오는 구간이 있고, 중반에는 밀어붙이기 좋은 구간, 후반에는 책임감이 더 또렷해지는 구간이 보여요. 지수님에게는 ‘무엇을 더 하느냐’만큼 ‘언제 덜 하느냐’가 중요한 한 해예요.\n\n올해의 큰 키워드는 성장입니다. 그런데 그 성장은 무리한 확장보다, 이미 가진 것을 잘 쓰는 쪽에 가까워요. 거목 같은 성향은 한 번 방향을 잡으면 깊게 뻗는 힘이 있으니, 2027년에는 새로움만 쫓기보다 기존의 강점을 정리하고 다듬는 쪽이 더 잘 맞을 수 있어요.",
  "chapters": {
   "wealth": {
    "heading": "성과를 손에 쥐는 감각",
    "body": "올해의 재물 흐름은 ‘기회를 붙잡는 힘’이 살아나는 편이에요. 지수님은 원래 토의 비중이 큰 편이라 쌓고 정리하는 감각이 있는데, 2027년에는 그 감각이 결과나 성과로 이어지기 쉬워 보여요. 다만 많이 벌고 많이 쓰는 식의 속도전보다, 무엇이 실제로 남는지 가려보는 태도가 더 잘 맞습니다.\n\n일상에서는 부탁을 받아 일을 더 맡거나, 내가 만든 결과물이 보상으로 연결되는 장면이 생기기 쉬워요. 그럴 때는 “지금 이 선택이 나중에 어떤 형태로 남을까?”를 한 번만 더 생각해보면 좋습니다. 특히 성과를 급히 키우기보다, 금액·조건·기한을 또렷하게 적어두는 습관이 작지만 큰 차이를 만들어요.\n\n작게 시작하려면, 올해는 지출과 수입을 아주 세밀하게 통제하기보다 ‘중요한 항목 3개’만 정해서 살펴보세요. 지수님에게 맞는 방식은 과도한 절약이 아니라, 힘이 새는 곳을 덜어내는 정리예요. 그렇게 하면 성과를 다루는 감각이 훨씬 안정적으로 자리 잡습니다."
   },
   "love": {
    "heading": "가까워짐의 온도",
    "body": "관계와 연애에서는 따뜻하게 오가는 말과 행동이 늘기 쉬운 해예요. 올해는 내 안의 표현력이 살아나서, 호감이나 마음을 말로 드러내는 일이 자연스러워질 수 있어요. 다만 감정이 커질수록 상대의 속도도 함께 살피는 것이 중요해 보여요. 지수님은 진심이 생기면 깊게 들어가는 편일 수 있으니, 올해는 ‘얼마나 주는가’와 ‘얼마나 서로 맞는가’를 함께 보는 감각이 도움 됩니다.\n\n실제로는 연락이 잦아지거나, 함께 뭔가를 만들며 가까워지는 장면이 떠오릅니다. 3월경처럼 어울려 붙는 흐름에서는 대화가 잘 이어지고, 4월경처럼 부딪힘이 섞이는 구간에는 작은 오해가 생겨도 관계의 방향을 다시 맞추는 계기가 되기 쉬워요. 이때는 결론을 서두르기보다, 왜 그렇게 느꼈는지 차분히 말로 풀어보는 편이 편합니다.\n\n작게 시작하려면, 마음이 가는 사람이나 가까운 사람에게 ‘한 번 더 설명하기’보다 ‘한 번 더 질문하기’를 해보세요. 지수님에게 올해의 관계운은 밀어붙이는 힘보다, 온도를 맞추는 섬세함에서 더 반짝입니다."
   },
   "career": {
    "heading": "보여지는 힘을 쓰는 해",
    "body": "일과 커리어에서는 결과를 만들고 드러내는 힘이 강해지는 흐름이에요. 올해는 내 안에 있던 생각이나 능력이 바깥으로 나와 형태를 갖추기 쉬워서, 발표·기획·제안·창작처럼 ‘보이는 일’과 잘 맞을 수 있어요. 거목 같은 성향은 한 번 방향을 잡으면 크게 자라나는 장점이 있으니, 2027년에는 존재감을 조용히 키우기보다 필요한 순간에 분명하게 내는 쪽이 어울립니다.\n\n현실에서는 맡은 일을 정리해 보여주거나, 그동안 쌓은 것을 바탕으로 더 큰 역할을 요청받는 장면이 있을 수 있어요. 8~9월경에는 주도권을 잡고 성과를 밀어붙이기 좋은 흐름이 보이지만, 과욕만 조금 조심하면 좋습니다. 너무 많은 것을 한 번에 가져가려 하기보다, 지금 가장 잘할 수 있는 한두 가지에 힘을 모으는 편이 결과가 선명해요.\n\n작게 시작하려면, 올해는 ‘내가 잘하는 것 3개’를 글로 적고 자주 보세요. 그 목록이 흔들릴 때 기준점이 되어줍니다. 지수님은 이미 기반이 있는 사람처럼 보이니, 올해는 새로 증명하기보다 이미 가진 힘을 제대로 쓰는 연습이 더 큰 도움이 될 수 있어요."
   },
   "study": {
    "heading": "배움이 곧 회복이 되는 때",
    "body": "배움에서는 혼자 버티기보다 도움을 받아 흡수하는 흐름이 좋아 보여요. 올해의 앞부분과 끝부분에는 생각보다 잘 채워지는 구간이 있어서, 좋은 정보나 조언이 들어오면 그냥 지나치지 말고 받아 적는 편이 유리해요. 지수님은 전체적으로 ‘거목 · 성취’ 유형의 결이 있어서, 한 번 익힌 것을 깊게 쌓는 방식에 강점이 있어 보입니다.\n\n일상에서는 누군가의 설명이 갑자기 이해되거나, 막혔던 부분이 다른 자료 하나로 풀리는 장면이 생기기 쉬워요. 2~3월경과 12~1월경에는 배움이 회복과 함께 들어오는 느낌이 있어, 기초를 다시 잡거나 정리하는 데 특히 잘 맞습니다. 반대로 새 자극이 적게 느껴지는 달에는 무리해서 범위를 넓히기보다, 이미 배운 것을 복습하는 쪽이 더 편할 수 있어요.\n\n작게 시작하려면, 올해는 새 강의나 책을 많이 늘리기보다 ‘끝까지 보는 것 1개’를 정해보세요. 지수님에게는 많이 아는 것보다, 한 가지를 자기 언어로 설명할 수 있게 되는 과정이 더 큰 자산이 됩니다."
   },
   "health": {
    "heading": "리듬을 지키는 생활감",
    "body": "몸과 마음의 돌봄에서는 에너지를 쓰는 만큼 회복의 틈을 의식하는 해예요. 올해는 바깥으로 표현하고 생산하는 힘이 커지기 쉬워서, 마음이 앞서면 생활 리듬이 한쪽으로 치우치기 쉬워 보여요. 그래서 ‘더 열심히’보다 ‘더 일정하게’가 지수님에게는 훨씬 잘 맞습니다.\n\n실제로는 바쁜 날에 쉬는 법을 건너뛰거나, 쉬는 날에도 머리가 계속 일 쪽으로 가는 장면이 있을 수 있어요. 그런 때는 완벽한 휴식보다 짧고 자주 끊는 방식이 더 효과적일 수 있습니다. 10월~11월경처럼 책임감이 커지는 구간에는 특히 속도를 조금 낮추고, 일정 사이에 비워두는 시간을 확보하는 것이 도움이 돼요.\n\n작게 시작하려면, 잠들기 전 10분만이라도 화면을 멀리하고 오늘의 흐름을 정리해보세요. 지수님은 이미 버티는 힘이 있는 편이라, 올해는 그 힘을 더 키우기보다 소진되지 않게 다루는 습관이 중요합니다."
   }
  },
  "months": [
   {
    "headline": "2월, 채움의 시작",
    "body": "이달은 도움이 들어오고 회복의 감각이 살아나기 좋은 흐름이에요. 12운성의 힘도 시작을 받쳐주니, 새 계획을 세우기보다 기초를 다시 붙잡는 쪽이 편할 수 있습니다."
   },
   {
    "headline": "3월, 맞물리는 대화",
    "body": "사람과 사람이 자연스럽게 이어지는 장면이 눈에 띄기 쉬워요. 잘 맞는 흐름이 강해서 누군가와 함께 움직일 때 일이 한결 부드럽게 풀릴 수 있습니다."
   },
   {
    "headline": "4월, 방향 재조정",
    "body": "익숙한 결이지만 안쪽에서는 작은 충돌이 생기기 쉬운 달이에요. 겉으로는 평소처럼 보여도, 안에서는 선택의 방향을 다시 잡아보게 될 수 있습니다."
   },
   {
    "headline": "5월, 익숙한 안정",
    "body": "새 자극은 적지만 편안한 리듬을 만들기 좋은 시기예요. 다만 너무 익숙해져서 흐름이 느려지지 않도록, 작은 변화 하나를 넣어보면 좋습니다."
   },
   {
    "headline": "6월, 표현이 커짐",
    "body": "내가 가진 것을 밖으로 내보내기 좋은 달이에요. 말, 결과물, 도움 주기가 늘 수 있어 에너지를 많이 쓰는 대신 존재감도 또렷해질 수 있습니다."
   },
   {
    "headline": "7월, 손길이 넓어짐",
    "body": "베풀고 나누는 힘이 자연스럽게 커질 수 있어요. 주변을 돕는 일이 많아질수록 내 페이스를 따로 챙기는 습관이 함께 있으면 좋습니다."
   },
   {
    "headline": "8월, 밀어붙이는 힘",
    "body": "주도권과 성과를 잡기 좋은 흐름이 들어옵니다. 역동성이 커지는 만큼 한 번에 너무 많이 벌리기보다, 우선순위를 분명히 하면 더 유리해요."
   },
   {
    "headline": "9월, 성과의 정리",
    "body": "앞서 만든 흐름을 실제 결과로 묶어보기 좋은 달이에요. 다만 욕심이 앞서면 여기저기 힘이 분산될 수 있으니, 선택과 집중이 중요합니다."
   },
   {
    "headline": "10월, 책임의 무게",
    "body": "책임감이 또렷해지고 마음가짐도 단단해지기 쉬워요. 차분히 속도를 맞추면 흔들림이 줄고, 정리해야 할 것들이 보이기 시작합니다."
   },
   {
    "headline": "11월, 단단해지는 시간",
    "body": "압박감이 조금 늘 수 있지만, 그만큼 버티는 힘도 함께 커질 수 있어요. 혼자 다 끌어안기보다 역할을 나누는 편이 훨씬 안정적입니다."
   },
   {
    "headline": "12월, 다시 채워짐",
    "body": "도움과 배움이 다시 들어오며 숨을 고르기 좋은 달입니다. 올해를 정리하고 내년을 준비하는 데 필요한 정보가 자연스럽게 모일 수 있어요."
   },
   {
    "headline": "1월, 새로 받는 힘",
    "body": "마무리와 시작이 동시에 느껴지는 시기예요. 마음을 정돈하고 흐름을 받아들이면, 다음 해의 출발선이 한결 선명해집니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 관계와 방향 점검",
    "body": "이 구간은 도움을 받는 흐름과 미묘한 충돌이 함께 보여요. 새로운 제안을 받을 때는 바로 결론 내리기보다, 함께 움직일 사람과의 호흡이 맞는지 먼저 살펴보세요."
   },
   {
    "title": "5~7월경: 표현과 소진 관리",
    "body": "내가 내보내는 힘이 커지는 시기라 결과도 잘 보이지만, 에너지 소모도 함께 늘기 쉬워요. 해볼 행동으로는 일정마다 짧은 회복 시간을 미리 넣어두는 습관이 좋습니다."
   },
   {
    "title": "8~10월경: 성과를 정리하기",
    "body": "주도권을 잡기 좋은 흐름과 책임이 늘어나는 흐름이 이어져요. 이때는 할 일을 넓히기보다, 가장 중요한 목표 1~2개를 정해 끝까지 밀어보는 것이 좋습니다."
   },
   {
    "title": "11월~다음해 1월경: 회복과 축적",
    "body": "마지막 구간은 단단해지는 압력과 다시 채워지는 흐름이 함께 옵니다. 해볼 행동으로는 기록을 정리하고, 배운 것과 남은 과제를 한 번에 묶어보는 작업이 잘 맞아요."
   }
  ],
  "closing": "지수님, 2027년은 많이 쏟아내는 만큼 다시 채우는 법을 배우는 해로 읽혀요. 바깥으로 드러나는 힘이 커질수록, 안쪽의 리듬을 챙기는 일이 더 중요해집니다. 올해는 서두르기보다, 잘 자라기 위한 속도를 찾는 쪽이 지수님에게 더 편한 길일 수 있어요."
 },
 "casey": {
  "year": 2027,
  "title": "Un año para afinar el ritmo",
  "subtitle": "2027 pide firmeza, medida y buen pulso",
  "overview": "2027 se siente como un año que te pone a prueba con suavidad, Casey: no tanto para frenarte, sino para invitarte a elegir mejor el ritmo. Con un Maestro del Día de metal y una mezcla muy marcada de metal y madera, tu mapa ya muestra una tensión creativa entre sostener, ordenar y producir. Este año el fuego se acerca como una fuerza que exige presencia: cuando intentas correr demasiado, se nota; cuando ajustas el paso, aparece una solidez muy útil.\n\nTu estilo de fondo, el de acero y cosecha, encaja bien con esta dinámica: hay capacidad para afilar criterios, separar lo esencial de lo accesorio y convertir presión en forma. Como los Cinco Elementos muestran agua ausente, puede venirte bien construir pausas conscientes, espacios de descanso mental y momentos para pensar antes de responder. No es un año para empujar por impulso, sino para aprender a dosificar tu energía y dejar que cada avance tenga peso real.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso propio",
    "body": "En dinero, 2027 favorece una relación más activa con lo que produces y administras. El año tiende a empujarte a decidir, ordenar y tomar la iniciativa, pero el exceso de confianza puede hacer que quieras abarcar demasiado. Para un perfil como el tuyo, con metal fuerte y mucha madera, el reto no es generar ideas sino elegir cuáles sí merecen tiempo y cuáles conviene dejar pasar.\n\nEn lo cotidiano, esto puede verse en semanas con más encargos, más propuestas o más ganas de mover recursos de un lado a otro. También puede aparecer la sensación de que algo “se abre” y pide acción rápida, sobre todo en los meses de abril, mayo y luego otra vez al final del año. En esos momentos, revisar números, condiciones y plazos con calma puede darte una ventaja discreta pero real.\n\nEmpieza por un hábito pequeño: antes de comprometer dinero o energía, haz una pausa breve y nombra el objetivo en una sola frase. Si Casey, además, separa lo urgente de lo importante, este año puede sentirse menos disperso y más productivo."
   },
   "love": {
    "heading": "Vínculos con más verdad",
    "body": "En relaciones y amor, 2027 trae una mezcla interesante entre impulso y aprendizaje. Hay meses en que te será más fácil dar, expresar y mostrar interés, pero también momentos en que la relación con el entorno se vuelva más exigente y pida claridad. Tu mapa sugiere que no te conviene forzar cercanía: te favorece más la conexión que nace de la honestidad y del ritmo compartido.\n\nEn la vida diaria, esto puede aparecer como conversaciones más directas, ganas de tomar la iniciativa o encuentros que te mueven de sitio sin demasiado aviso. Febrero y mayo parecen especialmente activos, con movimientos que cambian la forma de vincularte; septiembre, en cambio, puede traer una sensación más plena y amable. Si en algunos tramos notas malentendidos o respuestas poco precisas, conviene preguntar una vez más antes de sacar conclusiones.\n\nPrueba a expresar con sencillez lo que sí quieres sostener: un plan, una frecuencia, una forma de trato. Cuando dejas de adivinar y empiezas a nombrar, tus vínculos ganan aire."
   },
   "career": {
    "heading": "Trabajo con dirección",
    "body": "En lo profesional, este año favorece una versión más visible de ti: más acción, más producción y más capacidad para poner en marcha lo que otros solo comentan. El fuego de 2027 puede darte presión, sí, pero también una sensación de enfoque si eliges bien dónde poner el esfuerzo. Como tu base es bastante de metal, te ayuda trabajar con criterios claros, estructuras simples y objetivos concretos.\n\nEn el día a día, esto puede sentirse como más responsabilidad, más exigencia por resultados o más momentos en los que te toca sostener decisiones. Junio y julio parecen pedirte temple y atención a los imprevistos; en cambio, abril y mayo se prestan mejor para empujar iniciativas, siempre que no te pases de velocidad. El año parece premiar a quien se organiza sin rigidez excesiva.\n\nUn paso útil sería revisar cada semana qué tarea de verdad mueve la aguja y cuál solo te llena la agenda. Si haces menos ruido y más precisión, tu trabajo puede ganar consistencia sin perder impulso."
   },
   "study": {
    "heading": "Aprender para afinar",
    "body": "En estudio y aprendizaje, 2027 se ve como un año fértil si aceptas que no todo entra de una vez. Hay una parte del año que favorece recoger ayuda, absorber información y descansar la mente, y otra en la que resulta más natural producir, explicar o compartir lo aprendido. Con agua ausente en tu mapa, te conviene aprender por bloques y con pausas, no por saturación.\n\nEn la práctica, esto puede verse en momentos de mucha curiosidad seguidos de otros en los que necesitas silencio para ordenar. Agosto y septiembre parecen buenos para integrar y comprender mejor; octubre y noviembre, para bajar el ritmo y dejar que lo aprendido asiente. Si te exiges entenderlo todo al momento, el avance se vuelve más pesado de lo necesario.\n\nTe puede servir estudiar con una secuencia simple: leer, resumir, descansar, repetir. Así conviertes el aprendizaje en algo que se queda contigo, en lugar de algo que solo pasa por encima."
   },
   "health": {
    "heading": "Cuidar el ritmo interno",
    "body": "En cuerpo y mente, 2027 pide atención al ritmo más que a la intensidad. No se trata de hacer más, sino de notar cuándo tu energía sube, cuándo baja y en qué momento necesitas bajar una marcha. La combinación de presión y confianza en alza sugiere que puedes sostener bastante, pero también que te conviene escuchar las señales pequeñas antes de acumular cansancio mental.\n\nEn lo cotidiano, esto puede sentirse como días de mucha actividad seguidos por otros en que prefieres silencio, orden y menos estímulos. Octubre y noviembre parecen invitar a cuidarte con más mimo; junio y julio, a no responder todo al mismo tiempo. Como tu mapa no muestra agua, las pausas, la hidratación mental y los momentos sin pantalla pueden ayudarte más de lo que parece.\n\nUna práctica sencilla sería cerrar el día con tres minutos de revisión: qué te drenó, qué te ordenó y qué te devolvió calma. Ese pequeño gesto puede volverse una base muy sólida durante todo el año."
   }
  },
  "months": [
   {
    "headline": "Febrero se mueve",
    "body": "Este mes te empuja a expresarte más y a sacar energía hacia fuera, aunque eso te pida más desgaste del habitual. La rama terrestre toca tu día de una forma que puede sentirse como giro, cambio de lugar o necesidad de reaccionar con rapidez. Mejor si eliges moverte con intención, no por impulso."
   },
   {
    "headline": "Marzo germina",
    "body": "Aquí la energía vuelve a crecer desde dentro, como una semilla que pide tiempo para tomar forma. Puede haber pequeños contratiempos o detalles que no salen a la primera, pero no parecen bloquearte: más bien te obligan a ajustar el método. Si aceptas esa curva, el mes gana orden."
   },
   {
    "headline": "Abril toma mando",
    "body": "Este mes favorece empujar objetivos, tomar la iniciativa y buscar resultados concretos. La sensación puede ser de avance silencioso, casi subterráneo, como si algo se estuviera organizando sin hacer ruido. Conviene cuidar el exceso de ambición y no abrir más frentes de los que puedes sostener."
   },
   {
    "headline": "Mayo se une",
    "body": "Aquí la energía de acción se mezcla con una sensación de encaje: algo o alguien puede alinearse contigo con más facilidad. También conviene mirar de cerca el uso de recursos, porque lo que parece fluido puede consumir más de lo previsto. Si mantienes el enfoque, el mes te ayuda a unir piezas."
   },
   {
    "headline": "Junio aprieta",
    "body": "Llega un tramo más exigente, con más responsabilidad y una sensibilidad emocional más expuesta. Puede haber roces pequeños o respuestas más intensas de lo normal, así que te conviene bajar la velocidad antes de contestar. El mes funciona mejor cuando eliges precisión y no urgencia."
   },
   {
    "headline": "Julio afianza",
    "body": "La confianza sube, pero no en un clima simple: más bien en un entorno con imprevistos que te pide flexibilidad. Eso puede ayudarte a comprobar de qué estás hecho cuando el plan cambia. Si mantienes la calma, sales de este mes con más solidez."
   },
   {
    "headline": "Agosto nutre",
    "body": "Este mes trae ayuda, aprendizaje y una sensación de recuperación más clara. El esfuerzo empieza a dar fruto, aunque todavía convenga no sobrecargar la agenda. Un cambio de aires, incluso pequeño, puede devolverte perspectiva."
   },
   {
    "headline": "Septiembre llena",
    "body": "Aquí la energía se siente más completa y redonda, con una facilidad especial para recibir y conectar. También puede aumentar tu magnetismo, así que conviene elegir bien dónde pones tu atención. Lo que se acerca con naturalidad merece ser escuchado."
   },
   {
    "headline": "Octubre baja",
    "body": "El ritmo se vuelve más lento y el mes pide paciencia con lo que todavía no termina de definirse. Puede aparecer una sensación de espera, como si el tiempo necesitara acomodar piezas antes de mostrarte el siguiente paso. No fuerces la respuesta: deja que madure."
   },
   {
    "headline": "Noviembre cuida",
    "body": "Este tramo invita a proteger tu energía y a revisar mejor los malentendidos antes de que crezcan. El mes favorece un trato más delicado contigo y con los demás. Si reduces el ruido, escuchas con más claridad lo que de verdad importa."
   },
   {
    "headline": "Diciembre ordena",
    "body": "La energía vuelve a expandirse hacia fuera, con más visibilidad, liderazgo y necesidad de poner orden en lo producido. Puede ser un mes de pausa para ordenar, más que de correr sin dirección. Si cierras asuntos con método, entras al final del ciclo con mejor base."
   },
   {
    "headline": "Enero recoge",
    "body": "Ya cerca del cambio de año, el movimiento se vuelve más recogido y reflexivo. También puede aparecer reconocimiento por lo que has sostenido durante meses, aunque de forma discreta. Es un buen tramo para mirar atrás, agradecer y preparar el siguiente paso sin prisa."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Observa cómo sube tu impulso de hacer, decir y mover cosas. En vez de responder a todo, prueba a elegir una sola prioridad por semana y a dejar por escrito lo que no conviene abrir todavía."
   },
   {
    "title": "De mayo a julio",
    "body": "Vigila los momentos en que la presión te empuje a acelerar demasiado. El mejor gesto en este tramo puede ser revisar recursos, plazos y conversaciones clave antes de comprometerte más."
   },
   {
    "title": "De agosto a octubre",
    "body": "Mira qué aprendizajes te están nutriendo de verdad y cuáles solo ocupan espacio. Te puede ayudar cerrar cada día con una nota breve: qué integraste, qué soltaste y qué merece seguir."
   },
   {
    "title": "De noviembre a enero",
    "body": "Atiende a los malentendidos, al cansancio acumulado y a la necesidad de ordenar. Un hábito útil sería reservar un momento fijo para revisar pendientes, agradecer avances y decidir qué entra en el siguiente ciclo."
   }
  ],
  "closing": "Casey, 2027 no parece pedirte velocidad, sino criterio. Cuando eliges bien el ritmo, lo que al principio se siente como presión puede volverse forma, fuerza y presencia. Si te apoyas en pausas cortas, decisiones claras y una producción bien medida, este año puede dejarte más firme de lo que empezó."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, un año para avanzar",
  "subtitle": "Lucía, un ciclo de fuego que pide foco, medida y buen pulso",
  "overview": "2027 trae una energía de fuego que, para ti, no se siente como algo ajeno, sino como una fuerza que tú mismo puedes encauzar. Eso suele abrir un año favorable para tomar iniciativa, mover recursos y buscar resultados visibles. Como tu mapa tiene bastante tierra y agua en proporción similar, con poco metal, conviene recordar que la abundancia no siempre se gana empujando más: a veces se gana eligiendo mejor, ordenando y dejando espacio para que lo importante respire.\n\nEn un nivel más íntimo, tu tipo de mapa, muy ligado a la claridad, el orden y lo que se va revelando poco a poco, encaja bien con un año que premia la estrategia y la constancia. Lucía, esto no habla de correr todo el tiempo, sino de saber cuándo acelerar y cuándo revisar. El tono general del año parece pedirte ambición con medida: si te haces cargo de lo que quieres, el año responde; si te exiges de más, el mismo impulso puede dispersarse.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con dirección",
    "body": "En dinero, 2027 se ve como un año en el que puedes empujar ingresos, cobrar mejor por tu esfuerzo y dar forma concreta a proyectos que antes estaban solo en idea. Como el fuego te favorece en este ciclo, hay más facilidad para decidir, negociar y buscar resultados; al mismo tiempo, tu tierra fuerte pide prudencia para no convertir cada oportunidad en una carga. La clave parece estar en mover el dinero con intención, no con prisa.\n\nEn lo cotidiano, esto puede verse en conversaciones sobre tarifas, ajustes de presupuesto, compras importantes o pequeños proyectos que empiezan a rendir. También puede aparecer la tentación de decir que sí a demasiadas cosas porque el año trae sensación de potencia. Un buen gesto sería revisar números con calma, anotar entradas y salidas y elegir solo lo que tenga sentido real para ti.\n\nEmpieza por una regla simple: antes de comprometer dinero o energía, deja pasar una noche y vuelve a mirar. Si algo sigue teniendo forma al día siguiente, probablemente merece espacio; si no, conviene dejarlo ir sin drama."
   },
   "love": {
    "heading": "Vínculos más claros",
    "body": "En relaciones, el año favorece una presencia más visible y una comunicación con más calor. Hay meses en los que te sentirás cómodo mostrando iniciativa y otros en los que convendrá escuchar más de lo habitual, porque el clima general no siempre premia la rapidez, sino la claridad. Para vínculos cercanos, esto puede traer conversaciones sinceras, ganas de colaborar y una búsqueda más honesta de reciprocidad.\n\nEn la vida diaria, podrías notar que algunas personas se acercan porque te perciben con más energía, mientras que otras necesitan tiempo para seguir tu ritmo. También puede haber momentos de malentendidos o roces suaves, sobre todo si das por entendido algo que la otra persona todavía no ha dicho en voz alta. Tu mejor aliada aquí es la precisión: preguntar, aclarar y no llenar huecos con suposiciones.\n\nPrueba a decir una cosa concreta en lugar de insinuar tres. Una frase clara, una petición simple o una respuesta honesta pueden ahorrarte mucho desgaste y, además, abrir vínculos más limpios."
   },
   "career": {
    "heading": "Trabajo con empuje",
    "body": "En trabajo y carrera, 2027 parece un año de visibilidad y resultados. La relación entre tu energía central y el fuego del año suele favorecer tomar el mando, organizar recursos y convertir esfuerzo en logro tangible. Aun así, como tu mapa tiene mucho de tierra, el reto no es solo producir más, sino sostener el ritmo sin caer en exceso de control o en cansancio por acumulación.\n\nEn lo cotidiano, esto puede reflejarse en responsabilidades que crecen, en tareas que te ponen al frente o en momentos en que tu criterio pesa más que antes. También puede haber semanas en las que todo parece avanzar con facilidad y otras en las que conviene afinar detalles, porque pequeños contratiempos pueden pedir más paciencia que fuerza. Si te toca liderar, te conviene combinar decisión con una estructura simple y visible.\n\nHaz una lista corta de prioridades y deja fuera lo accesorio. Cuando el año te empuje a hacer más, esa lista puede ser tu manera de mantener el rumbo sin dispersarte."
   },
   "study": {
    "heading": "Aprender con método",
    "body": "En aprendizaje, 2027 favorece más la práctica constante que la acumulación acelerada. Tu mapa sugiere una relación natural con el orden, así que te puede ir especialmente bien cuando estudias, investigas o desarrollas una habilidad siguiendo pasos claros y un ritmo que no se rompe cada dos días. El fuego del año añade impulso, pero no siempre paciencia; por eso, aprender con método parece más útil que querer abarcar demasiado.\n\nEn la vida diaria, eso puede verse en cursos que avanzan mejor cuando tomas apuntes ordenados, en lecturas que por fin se conectan entre sí o en ideas que se vuelven útiles cuando las pruebas sobre el terreno. También puede haber épocas en que sientas mucha inspiración y luego una bajada de atención; no pasa nada, forma parte del clima. Lo importante es volver sin dramatizar.\n\nTe puede ayudar un sistema muy simple: una libreta, una lista de temas y una revisión breve cada semana. Si mantienes ese hilo, el año te devuelve claridad en lugar de ruido."
   },
   "health": {
    "heading": "Cuidar tu ritmo",
    "body": "En cuidado personal, 2027 pide atención a tus ritmos más que a la velocidad. Con bastante tierra en tu mapa y una energía de fuego que empuja, puede ser fácil llenar el día de tareas y dejar poco margen para el descanso mental. No hace falta leer esto como alarma; más bien como una invitación a notar cuándo estás funcionando por impulso y cuándo de verdad te hace bien bajar un poco el volumen.\n\nEn lo cotidiano, esto puede sentirse como días muy productivos seguidos por otros en los que necesitas más silencio, más orden o menos estímulos. También puede aparecer la sensación de que tu mundo interior se activa mucho, con pensamientos que piden pausa antes de seguir. Dormir a horas parecidas, comer con regularidad y reservar pequeños ratos sin pantalla pueden marcar una diferencia notable en tu sensación de estabilidad.\n\nElige un gesto sencillo para repetir casi a diario: caminar unos minutos, dejar el móvil lejos durante una franja corta o cerrar el día con tres líneas escritas. Lo pequeño, sostenido, puede darte más equilibrio que un gran cambio improvisado."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "Este mes puede sentirse familiar y, a la vez, un poco más vulnerable a malentendidos. La emoción está cerca de la superficie, así que conviene hablar con cuidado y no asumir que el otro capta todo a la primera. Un gesto claro vale más que una explicación larga."
   },
   {
    "headline": "Marzo despierto",
    "body": "Aquí aparece un tono de brote: algo empieza a moverse con más decisión y puede darte sensación de liderazgo natural. Es un buen momento para dar el primer paso en lo que venías observando desde lejos. Si te muestras, el entorno parece responder mejor de lo esperado."
   },
   {
    "headline": "Abril visible",
    "body": "En abril se nota más la parte de dar, producir y mostrar lo que sabes hacer. Puede haber reconocimiento por algo que has venido sosteniendo en silencio, aunque también se gasta más energía de la que parece. Elegir bien dónde pones tu esfuerzo será decisivo."
   },
   {
    "headline": "Mayo en movimiento",
    "body": "Este mes trae ganas de avanzar, cambiar de escena y poner en marcha una idea que ya tenía raíz. Es un buen momento para probar, enviar, presentar o abrir conversación. Si te mueves con intención, el impulso puede volverse muy fértil."
   },
   {
    "headline": "Junio de mando",
    "body": "Junio favorece tomar el control y buscar resultados concretos, sobre todo en asuntos de dinero o responsabilidad. Aun así, pequeños tropiezos pueden pedirte más atención a los detalles que a la velocidad. Conviene revisar dos veces antes de cerrar algo importante."
   },
   {
    "headline": "Julio interior",
    "body": "La energía se vuelve más recogida y te invita a actuar desde dentro, no desde la exhibición. Puede ser un mes excelente para ordenar prioridades y proteger tu espacio mental. Lo que madure en silencio ahora puede darte forma más adelante."
   },
   {
    "headline": "Agosto exigente",
    "body": "Agosto te pide disciplina y una mirada cuidadosa a los recursos. La presión puede subir un poco, pero también la posibilidad de volver tu trabajo más sólido si no aceleras de más. Ir por partes te ayudará a sostener mejor el mes."
   },
   {
    "headline": "Septiembre tenso",
    "body": "Este mes puede traer roces y una sensación de giro, como si algo te empujara a cambiar de postura. La mejor respuesta suele ser bajar la intensidad y escuchar antes de reaccionar. Si cuidas tu energía, el cambio puede ordenar más de lo que desordena."
   },
   {
    "headline": "Octubre apoyado",
    "body": "Octubre abre una etapa de ayuda, aprendizaje y recuperación. Además, hay un tono de encuentro que facilita que algo encaje mejor con tu ritmo. Aceptar apoyo o consejo puede ahorrarte esfuerzo y darte una visión más amplia."
   },
   {
    "headline": "Noviembre amplio",
    "body": "Noviembre trae una sensación de plenitud más tranquila, como si las piezas empezaran a respirar mejor. Puede haber cambios de ambiente, planes distintos o una mirada más fresca sobre lo que haces. Dejar espacio a lo nuevo te sentará bien."
   },
   {
    "headline": "Diciembre magnético",
    "body": "Diciembre vuelve a un clima conocido, cómodo y con cierto brillo personal. Lo que sostienes con constancia puede empezar a mostrar fruto, y tu presencia puede resultar más atractiva para otros. Es buen mes para cerrar con elegancia, no con prisa."
   },
   {
    "headline": "Enero paciente",
    "body": "Enero continúa en un tono familiar, pero con una confianza que sube poco a poco. Puede sentirse como un tiempo de espera útil, en el que no todo necesita resolverse de inmediato. Si sostienes el ritmo, el comienzo del nuevo ciclo llega con más base de la que parece."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vigila los malentendidos y el impulso de decir que sí demasiado rápido. Prueba a hacer una pausa breve antes de responder, especialmente en conversaciones importantes, y usa ese margen para ordenar lo que realmente quieres decir."
   },
   {
    "title": "De mayo a julio",
    "body": "Observa cómo aumenta tu capacidad de producir y de tomar el mando, pero también cómo sube el gasto de energía. Elige un proyecto principal y llévalo con una rutina simple: una tarea clave al día y una revisión semanal."
   },
   {
    "title": "De agosto a octubre",
    "body": "Fíjate en dónde aparece presión, roce o necesidad de cambio de postura. Un buen paso aquí sería pedir aclaraciones a tiempo, aceptar ayuda si se ofrece y dejar que el ritmo baje cuando el cuerpo o la mente lo pidan."
   },
   {
    "title": "De noviembre a enero",
    "body": "Aprovecha la sensación de apoyo y cierre para consolidar hábitos, relaciones y decisiones prácticas. Haz una lista corta de lo que sí funcionó este año y repítelo como base del siguiente, sin querer reinventarlo todo."
   }
  ],
  "closing": "Lucía, 2027 parece un año para avanzar con inteligencia, no solo con fuerza. Cuando te apoyas en tu capacidad de ordenar, elegir y sostener, el fuego del año puede volverse muy útil; cuando te dispersas, en cambio, te pide volver al centro. Si te quedas con una sola idea, que sea esta: menos prisa, más dirección."
 },
 "mia": {
  "year": 2027,
  "title": "2027: A Year of Steady Forging",
  "subtitle": "For Mia, a year where pressure can become shape, and pace becomes strength",
  "overview": "2027 feels like a year that asks you to be both strong and selective. For a Day Master of Metal, Fire years can feel like heat on a blade: not always comfortable, but often clarifying. Because your Five Elements lean strongly toward Wood, with Metal already present and Fire, Earth, and Water more modest, this year may be less about doing everything and more about choosing where your effort is worth the spark.\n\nYour chart type, Steel · Harvest, suggests a practical kind of resilience: you tend to do well when effort has a clear purpose and results can be seen. In 2027, that quality can help you turn pressure into structure. Mia, the main theme is not speed for its own sake, but pacing yourself so that your energy goes into the right places. Some months feel busy and outward, some feel demanding, and some offer a chance to refill; the year works best when you let each phase do its job instead of asking every month to be the same.",
  "chapters": {
   "wealth": {
    "heading": "Money: build, then refine",
    "body": "This year’s money story looks more like active shaping than passive waiting. Fire can push you to take initiative, ask for fair value, and make visible progress, while your strong Wood side may keep generating ideas, plans, and things to manage. That can be productive, but it can also make spending, commitments, or effort feel spread thin if everything seems equally important.\n\nA likely scene is that you may be offered several options at once: a project with visible upside, a tempting purchase, or a chance to put resources into something that looks promising but needs more checking. The key feeling is not scarcity, but discernment. Because your Metal side is already capable of cutting through noise, you may do best when you pause long enough to ask which choice actually gives shape to your long-term life.\n\nStart small by separating “interesting” from “necessary.” A simple list of what supports your core goals can keep your decisions cleaner, and it may help you notice when enthusiasm is running ahead of usefulness."
   },
   "love": {
    "heading": "Relationships: warmth with clear edges",
    "body": "In relationships, 2027 can feel vivid and a little more exposed than usual. Fire tends to bring visibility, so feelings, preferences, and expectations may come to the surface faster. For you, that can be useful: it may be easier to see where connection is genuine, where effort is mutual, and where you’ve been smoothing over differences for too long.\n\nA common scene might be a conversation that starts casually and then suddenly turns important. Someone may want a quicker answer, a clearer promise, or a more honest statement of what you can and can’t offer. That doesn’t have to mean conflict; it may simply mean the year prefers directness. Your strongest moments may come when you stay warm without becoming vague.\n\nTry answering one relational question more plainly than usual. A simple “I can do this, but not that” or “I need a little time to think” can create more trust than overexplaining. Mia, clarity can be a form of care this year."
   },
   "career": {
    "heading": "Career: pressure that can sharpen you",
    "body": "Work and public life may feel more demanding in 2027, but not in a random way. This is the kind of year that can ask you to hold responsibility with composure and choose your pace carefully. For a Metal Day Master, that can be a refining force: what is solid becomes clearer, and what is overextended becomes harder to ignore.\n\nYou may notice moments when deadlines, expectations, or leadership roles feel more visible than usual. A project might need firmer boundaries, or your role may require you to make a decision others have been avoiding. Because your chart carries both discipline and harvest-like practicality, you may do especially well when you focus on what can actually be completed well rather than what only looks impressive.\n\nOne useful habit is to define the finish line before you start. If you know what “good enough” looks like, you can keep the heat of the year from turning into unnecessary strain. That kind of precision is likely to serve you better than pushing at full speed all the time."
   },
   "study": {
    "heading": "Learning: gather, test, and keep what works",
    "body": "Learning in 2027 may feel especially active in the first half of the year, when expression, output, and sharing are emphasized. That can be a good fit if you learn by doing: writing, speaking, teaching, building, or trying things in real time. Your strong Wood influence suggests you may have plenty of curiosity and growth energy, so the main task is not finding interest, but organizing it.\n\nA realistic scene could be collecting many useful ideas, then realizing that not all of them need to become immediate projects. You may also find that you learn faster when you explain things to someone else or turn notes into something practical. The year seems to reward learning that leaves a trace, not just learning that stays in the head.\n\nA good starting point is one small system for capture and review. Keep a single place for notes, and once a week choose one idea to use, one to shelve, and one to discard. That simple sorting can make your learning feel lighter and more effective."
   },
   "health": {
    "heading": "Body and mind: pace over force",
    "body": "For your daily rhythm, 2027 seems to favor steadiness over intensity. There are phases in this year that may feel energizing and outward, and others that feel more like recovery or quiet storage, so your well-being is likely to improve when you match your effort to the month instead of forcing one constant tempo. Because Fire can heat things up and your chart already has plenty of growth energy, rest may work best when it is planned rather than left to chance.\n\nYou may notice that busy periods affect your focus more than your body alone: rushing, overscheduling, or carrying too many tabs open can make everything feel louder. The helpful scene is not dramatic; it is simple. A calmer morning, a shorter to-do list, or a deliberate pause before answering messages may restore more than you expect.\n\nTry building one repeating reset into your week. It could be a walk without input, an early night, or a tidy desk before Monday begins. Small rituals like that fit your Steel · Harvest style well: they help you stay sharp without becoming brittle."
   }
  },
  "months": [
   {
    "headline": "February: fresh turns",
    "body": "This month may feel like a reset button with movement attached. Because the energy around you pushes expression and release, you may notice plans changing quickly or your attention being pulled in a new direction. The clash-like tension in this period can be useful if you let it redirect you instead of resisting every shift."
   },
   {
    "headline": "March: ideas take root",
    "body": "March leans into a quieter kind of growth, with more room for things to begin forming beneath the surface. Small hiccups may ask you to double-check details, but they also keep you from rushing past something important. It can be a good month for drafting, sketching, and letting a project breathe before you name it."
   },
   {
    "headline": "April: hold the reins",
    "body": "April brings a stronger sense of control and results, so it may be easier to push a plan forward or claim a clearer role. The inner-world tone suggests that private judgment matters here: what you choose quietly may matter more than what you announce publicly. A little restraint can make your effort more effective."
   },
   {
    "headline": "May: doors swing open",
    "body": "May can feel lively and surprising, especially in the way people and opportunities seem to meet you halfway. The supportive link here may make collaboration smoother, but the unexpected-turns note suggests you may want to stay flexible as things come together. This is a good month to respond quickly without becoming rigid."
   },
   {
    "headline": "June: steady under heat",
    "body": "June may feel more demanding, with friction showing up in schedules, expectations, or the pace of work. The good news is that this is the kind of pressure that can strengthen your structure if you avoid trying to do everything at once. Choose the pace that keeps your hands steady, not the pace that merely looks impressive."
   },
   {
    "headline": "July: keep your center",
    "body": "July carries a more unpredictable flavor, so it may ask for alertness and a willingness to adapt. The wildcard feel can be exciting, but it may work best when you keep one part of your life simple and dependable. If plans shift, your advantage is composure rather than speed."
   },
   {
    "headline": "August: help arrives",
    "body": "August looks more restorative, with support, learning, and recovery becoming easier to notice. Fresh ground suggests that a new environment, new method, or new conversation could unlock momentum you didn’t have before. This is a good time to accept help without feeling you must earn every bit of it first."
   },
   {
    "headline": "September: strong attraction",
    "body": "September may feel full and magnetic, with people, opportunities, or ideas naturally drawing closer. That can be pleasant and productive, but it may also make it easy to say yes too quickly. Let the month’s pull work for you by choosing what truly deserves your attention."
   },
   {
    "headline": "October: familiar ground",
    "body": "October has a slower, more settled rhythm, which may feel comforting after the fuller months before it. There is less novelty here, so the gift of the month may be consistency rather than excitement. If you’ve been waiting for a clearer signal, this may be a time to observe instead of forcing one."
   },
   {
    "headline": "November: read carefully",
    "body": "November may bring a few moments where people hear different things from what was actually meant. That does not have to become a problem if you’re willing to slow the conversation down and confirm the details. A little extra precision in writing, timing, or tone can save a lot of rework."
   },
   {
    "headline": "December: tidy and direct",
    "body": "December leans toward closure, cleanup, and a more authoritative voice. You may feel more inclined to organize, finish, and clarify what has been left open. This is a good month to make your expectations visible and to straighten out practical loose ends before the year turns."
   },
   {
    "headline": "January: quiet advancement",
    "body": "January feels inward and stored, but not stagnant. The energy here can support quiet preparation, subtle progress, and a sense that the next step is forming behind the scenes. If you keep your focus steady, this month can reward patient groundwork more than public display."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: sort and shape",
    "body": "Watch for changes that push you to respond quickly, then slow down enough to separate what is useful from what is merely urgent. Try one concrete action: make a short list of your top three priorities and use it to decide what deserves your energy each week."
   },
   {
    "title": "May to July: move with precision",
    "body": "Notice where momentum rises and where pressure starts to build, especially when opportunities or responsibilities arrive all at once. Try one concrete action: before saying yes to anything new, write down the time, cost, and follow-up it would require."
   },
   {
    "title": "August to October: receive and refine",
    "body": "Pay attention to support, learning, and the moments when things feel naturally easier to absorb. Try one concrete action: choose one skill, one relationship habit, or one work process to improve by 1% each week rather than trying to upgrade everything."
   },
   {
    "title": "November to January: close with care",
    "body": "Watch for misunderstandings, loose ends, and the quieter kind of progress that happens when you clean up and prepare. Try one concrete action: set aside one recurring hour each week for review, tidying, and planning the next small step."
   }
  ],
  "closing": "Mia, 2027 does not read like a year that wants you to rush blindly; it reads like a year that rewards thoughtful force. If you let pressure reveal what matters, the year can leave you clearer, steadier, and more capable than you were at the start. The strongest move may simply be to keep choosing the right pace."
 }
};
