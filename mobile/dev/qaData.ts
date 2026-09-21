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
   "title_line1": "You keep finishing the day",
   "title_line2": "and your mind keeps asking for one more check.",
   "subtitle": "Module 3 Burnout deep report — Saju x psychology x counseling integrated",
   "opening_scene": "It is late, and your phone is still in your hand after the work is already done. Monday-morning messages light up the screen, and your mind starts running back through what you finished, what you might have missed, and what still needs checking. You tell yourself you are resting, but the rest never lands. You push through in a rush, then feel the drop all at once. Jordan, isn't this what your recent nights have been looking like?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, a work deadline spiral",
   "case_paragraphs": [
    "Mina leaves the office with her laptop closed, but her mind keeps reopening the same task on the ride home. She has the same Earth-heavy pressure in her chart, and the result is a day that feels fully carried before it ever feels complete. By the time she sits down, she is already scanning for what could still be improved. You would recognize that loop immediately, because it is the same shape as your own.",
    "She does not stop at finishing the report once. She checks the numbers again, then checks the formatting, then checks the message she is about to send. That extra round of checking looks small from the outside, but it is the part that drains her most. You would be looking at your own habit if you saw it on her desk.",
    "By evening she is exhausted, yet still uneasy enough to reopen the file one more time. Her day looks productive, but the feeling underneath is strain, not relief. That is why her body is tired while her mind stays on duty. You would feel that same mismatch in yourself.",
    "Mina is not failing to rest. She is carrying too much of the day into the night, and that is exactly why your own pattern feels so familiar to her. The work may already be done, but she cannot let the day end cleanly. So the pause never becomes rest, and the next morning starts with the same unfinished tension."
   ],
   "oheng_intro": "Earth is 38 percent, and that is the strongest force in your chart. Wood is 0 percent, so the part that would normally spill outward as expression, momentum, and forward growth is the weakest. In this burnout pattern, that looks like carrying responsibility hard, finishing things fully, and then having little ease left for recovery.",
   "quiz_reading": "Your Finisher's Drain pattern shows up clearly in the 82 percent perfectionism score and the 34 percent recovery score. That combination means the work does not only need to be done; it also needs to be mentally verified again before your mind lets go. So even an off day can still feel like a workday in disguise, especially when unfinished tension gets reactivated by Monday-morning messages.",
   "element_readings": {
    "wood": {
     "heading": "Wood is absent — the part that should push outward is running dry",
     "body": "Wood sits at 0 percent, so the energy that should turn effort into movement and expression is not showing up on its own. In your burnout pattern, that is why finishing the task can feel heavier than starting it. Water is the one element that can feed Wood, so the path back is not more force; it is more replenishment first. When you skip that, you end up cramming, then crashing, exactly the way you described."
    },
    "fire": {
     "heading": "Fire is light — the spark is there, but it burns fast",
     "body": "Fire is 13 percent, which is low enough that it does not stay bright for long under pressure. That matches the way your energy spikes when a deadline or Monday-morning message hits, then drops once the push is over. The spark is real, but it is not built to carry the whole week alone. So the hard part is not getting started; it is keeping enough warmth left for recovery after the rush."
    },
    "earth": {
     "heading": "Earth is strong — pressure becomes responsibility",
     "body": "Earth is 38 percent, so the weight of duty and structure sits high in your system. In a burnout module, that looks like not being able to leave a task half-checked, even after the work is technically done. You keep returning to the details because your mind treats completion as something that still needs guarding. That is why rest can feel unfinished even when nothing is left on the list."
    },
    "metal": {
     "heading": "Metal is strong — standards stay sharp",
     "body": "Metal is also 38 percent, and that gives you a sharp internal standard. In practice, that shows up as the urge to review, correct, and tighten the edges before you let anything go. It can make your work strong, but it also makes Monday-morning messages feel like a test you have to pass again. When the standard stays this high, the body may stop, but the mind keeps auditing."
    },
    "water": {
     "heading": "Water is light — the inner tide needs room to settle",
     "body": "Water is 13 percent, so the part of you that should cool, restore, and soften after effort is not staying steady for long. That fits the line you gave so directly: you rest, but it never feels like resting. In a burnout cycle, that means your nervous system stays half-alert even when the work is over. A quieter close to the day matters here, because your recovery is not getting enough space to finish its job."
    }
   },
   "upcoming_period_heading": "From age 31 to 40, a stronger Fire 10-year cycle arrives",
   "upcoming_period_body": "That coming stretch should bring more visibility, momentum, and pressure to act quickly. For you, Fire can make effort feel more immediate and more public, so the pace of work may rise and the urge to prove yourself may rise with it. If you prepare now, the biggest help will be building recovery before the heat turns up, not after. The more you practice ending the day cleanly now, the less that future pace will decide for you.",
   "cross_analysis_quotes": [
    "Your strongest pattern is not laziness; it is over-control that keeps the work alive after it is already done. With Earth at 38 percent and perfectionism at 82 percent, you do not just complete tasks — you keep carrying them in your head. That is why finishing can still feel like unfinished business.",
    "Recovery at 34 percent is the softer side of the same story. With Water at 13 percent, your system does not settle quickly, so rest can start physically while your mind keeps auditing the day. That is why a day off can still feel tense, even when nothing is being asked of you."
   ],
   "answer_notes": [
    "Going back to re-check everything shows a mind that does not trust completion to stay complete on its own. In daily life, that becomes the extra scan before you close the laptop, the second look at a message, and the third pass over work that was already good enough. You are not careless; you are trying to feel safe through certainty.",
    "Feeling uneasy even when you rest shows that recovery is not just about time off for you. It becomes a state your body has to enter, and right now it takes more than a pause to get there. That answer names the exact gap between stopping and actually recovering, and it is worth listening to.",
    "You are showing how tightly your mind links stillness with risk. That is why a quiet day can feel strangely exposed, as if something important might slip by while you are not watching. The answer points to a part of you that needs recovery to feel secure, not guilty."
   ],
   "chat_snapshot_note": "You said, \"I rest but it never feels like resting,\" and that line sits right next to the tired, a little anxious feeling you brought in. Those two facts belong together here, because your body is asking for a pause while your mind keeps standing guard. The sentence I would save is this: you are not failing to rest, you are still being asked to feel safe inside it.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they do not feel like simple communication. They switch the whole system back on, and for someone with strong Earth and high perfectionism, that means responsibility comes rushing back before your body has caught up. The message itself is not the whole problem; it is the way it reopens the loop of checking and pressure.",
   "chat_repeat_note": "Your pattern is clear: you cram hard, then crash hard. The first part gives you a burst of control, and the second part is the cost of carrying too much without enough recovery. A smaller way forward is to stop once before the crash, even if the task still feels unfinished, and let that pause count.",
   "chat_fear_note": "The fear underneath this is not really about falling behind on one task. It is about what it would mean if stopping made you lose your place. That tells me you care deeply about staying responsible, and you want your effort to keep you safe rather than cost you sleep.",
   "psychology_fact_heading": "Perfectionism and recovery imbalance",
   "psychology_fact_body": "Perfectionism tends to push a person to keep checking, refining, and tightening even after a task is done. When recovery is low, the body does not get the full signal that the workday is over, so rest stays fragile. Your scores fit that pattern closely: 82 percent perfectionism keeps the mind active, while 34 percent recovery leaves less room for the system to settle. That is why your evenings can still feel supervised by work.",
   "psychology_takeaway": "You do not just need more time off; you need a cleaner landing. Your mind will relax faster when the day ends in one place instead of being reopened five more times.",
   "strengths": [
    {
     "title": "Strong follow-through",
     "body": "You finish what you start, and that matters in the way you work every day. The same energy that leaves you tired also helps you complete tasks instead of letting them drift. When Monday-morning messages arrive, you are the person who has already thought two steps ahead."
    },
    {
     "title": "Sharp standards",
     "body": "Your 38 percent Metal gives you a clear eye for what does not fit. That can make your work neat, accurate, and hard to dismiss. It also explains why you notice the tiny things that others would let slide."
    },
    {
     "title": "Responsibility grip",
     "body": "Your 38 percent Earth gives you staying power under pressure. You can hold a lot, keep going, and keep the structure standing when others would already have let it wobble. That is a real strength, especially when deadlines pile up."
    },
    {
     "title": "Self-monitoring",
     "body": "Your 82 percent perfectionism means you do not drift through your work blindly. You check, adjust, and care about the result, which is part of why people can rely on you. Even the habit of re-checking everything shows how much you want to get it right."
    }
   ],
   "weaknesses": [
    {
     "title": "Unfinished rest",
     "body": "Your recovery score of 34 percent shows up as rest that does not fully land. You may stop working, but your mind keeps one hand on the task. That is why a break can feel like a pause without relief."
    },
    {
     "title": "Overchecking loop",
     "body": "You tend to return to work after it is already done, just to make sure nothing slipped through. That habit can protect quality, but it also keeps your system from ever really closing the file. The result is more mental traffic, not more peace."
    },
    {
     "title": "Crash after push",
     "body": "Your pattern of cramming and then crashing is not random. It is what happens when strong effort is followed by too little recovery. One hard push can carry the day, but it also leaves you empty when the rush is over."
    },
    {
     "title": "Pressure sensitivity",
     "body": "Monday-morning messages can reopen the whole load at once. That tells me your stress is not only about volume; it is about how quickly responsibility returns to the front of your mind. When that happens, even a small message can feel much bigger than it looks."
    }
   ],
   "fit_good": "You do best in work that has a clear finish line and a clear handoff. A day with defined tasks, one final review, and a real end-of-day cutoff will suit you far better than a job that expects you to stay mentally open all night. You also do well when the pace is steady enough that recovery can happen before the next push.",
   "fit_bad": "You struggle most in environments that keep the door half open all the time. If messages arrive at every hour and every task can be reopened endlessly, your mind never gets to stand down. A setting that rewards constant availability will keep your checking loop alive.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "Pick one exact time each day to do your final check, and make it the last one. Spend ten minutes on it, then close the file and leave the desk. When the urge returns later, write the thought down instead of reopening the work."
    },
    {
     "title": "Protect the landing",
     "body": "After a heavy workday, give yourself a 20-minute transition before you answer anything else. Walk, shower, or sit without the phone in your hand. The goal is to let your system notice that the work is over before the next message arrives."
    },
    {
     "title": "Separate checking from doing",
     "body": "Keep one list for active tasks and one list for things you have already finished. When you feel the pull to re-check, look at the finished list first and let it remind you that completion already happened. Use that list once a day, not every hour."
    },
    {
     "title": "Set a hard stop",
     "body": "Choose one evening boundary and protect it for a full week. If Monday-morning messages are your trigger, start by making the first message response deliberate instead of immediate. A small delay can teach your body that urgency is not the same as danger."
    }
   ],
   "mindset_guide": "Think of your workday like a stove burner, not a bonfire. It needs heat to cook, but it also needs a knob that turns all the way down. Right now your mind keeps turning the knob back up after the meal is already done. Recovery is not wasted time here; it is the part that keeps the next day from burning over.",
   "closing_title": "When the day can end",
   "closing_body": "You are not asking for less care; you are asking for a way to let care stop on time. That is a different skill, and it can be learned one clean ending at a time. Save this: you do not have to earn rest by checking one more time."
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
   "title_line1": "When the mind keeps checking, the heart never gets to rest",
   "title_line2": "You finish the day, but the day still follows you home",
   "subtitle": "Module 3 Burnout deep report — Saju x psychological test x counseling integration",
   "opening_scene": "It is late, and your phone still feels warm in your hand from the Monday-morning messages that pulled your attention back on. You tell yourself the work is done, but your eyes keep scanning, and the fear that you might fall behind will not stay quiet. You cram, you push, and then you crash all at once. Even your rest starts to feel like another task you have to get right, Riley.",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, always checking after work",
   "case_paragraphs": [
    "Mina leaves her desk at night, but her mind stays behind and reopens every detail one more time. She keeps rereading what she sent, then checks the next morning message before she has even taken her coat off. Her Five Elements pattern is also heavy on Wood and light on Metal, so the same push that helps her move forward also makes it hard for her to feel settled. You can hear your own rhythm in hers, and that is exactly the point, because this is the kind of loop you live in too."
   ],
   "oheng_intro": "Your Five Elements are led by Wood at 50 percent, while Metal sits at 0 percent. In a Burnout pattern, that looks like constant forward motion with very little inner permission to stop, so the work keeps getting extended in your head even after it is complete. The part of you that pushes is loud, and the part that draws a clean boundary is almost absent, which is why Monday morning can switch the whole system back on so fast.",
   "quiz_reading": "Your 82 percent perfectionism and 34 percent recovery fit the Finisher's Drain pattern with painful clarity. You do not just want things done; you want them sealed, checked, and safe before your mind will let them go. That is why a finished task still leaves you reaching back for one more look, and why a day off can still feel uneasy instead of restful.",
   "element_readings": {
    "wood": {
     "heading": "Wood — strong and always reaching",
     "body": "Your Wood is at 50 percent, so the strongest current in you is the one that keeps moving, deciding, and pushing ahead. In Burnout, that shows up as the version of you that keeps going even after the task is finished, because stopping feels like losing your place. It also explains why Monday-morning messages hit so hard: they meet the part of you that is already leaning forward. You are not lazy when you keep checking; you are over-driven by the same energy that helps you finish."
    },
    "fire": {
     "heading": "Fire — missing the spark that softens the day",
     "body": "Your Fire is at 0 percent, so there is very little built-in warmth for easing off once the work is done. In this Burnout pattern, that can feel like finishing a task without the emotional lightness that should come after it. The result is a day that gets completed on paper, but never really lands in your body. That is why even rest can stay mentally cold and unfinished."
    },
    "earth": {
     "heading": "Earth — enough to hold, not enough to fully settle",
     "body": "Your Earth is at 25 percent, which gives you some capacity to hold things together, but not enough to make the whole system feel grounded on its own. In Burnout, that can look like cramming until the structure holds, then feeling the collapse once the pressure drops. You can keep the day organized for a while, but the strain shows up later as a hard crash. Your Earth is present, but it is carrying more than it can comfortably absorb."
    },
    "metal": {
     "heading": "Metal — thin, pressured, and hard to feel",
     "body": "Your Metal is at 0 percent, so the part that should draw lines, name limits, and say enough is very quiet. Metal is the pressure-bearing side of you, the part that has to face rules, responsibility, and the weight of what must be done, and here it is almost missing. That is why recovery feels uneasy: without that firm boundary, rest does not close the file in your head. Earth can help lift Metal here, and in your pattern that support matters because it gives the boundary some structure to stand on."
    },
    "water": {
     "heading": "Water — present, but kept in alert mode",
     "body": "Your Water is at 25 percent, so reflection and inner awareness are there, but they are not soothing you very much right now. In Burnout, that can become a mind that keeps checking in the dark, replaying what was done and what might still be waiting. It is the part of you that notices the tension before anyone else does, which is useful, but it also means you rarely get to drift fully out of work mode. Your Water is not gone; it is just staying watchful."
    }
   },
   "upcoming_period_heading": "From 46 to 55, Earth gets stronger",
   "upcoming_period_body": "From 46 to 55, the Earth current becomes stronger, and that usually makes it easier to build steadier footing than you have now. For someone who has been living with 50 percent Wood and 0 percent Metal, this can feel like the first stretch where structure starts to support you instead of only being something you push against. It is a good time to simplify how you carry work, so your effort stops spilling into every corner of the day. If you prepare now by practicing cleaner stopping points, that later period can feel less like survival and more like support.",
   "cross_analysis_quotes": [
    "Your 50 percent Wood and 82 percent perfectionism are speaking the same language. Wood keeps reaching for the next step, and perfectionism keeps refusing to call anything finished too early. That is why one more check can feel necessary even when the job is already done.",
    "Your 0 percent Metal matches the uneasy recovery score of 34 percent in a way that is hard to ignore. When the part that draws boundaries is this quiet, even rest can feel unfinished and slightly exposed. You are not failing at resting; your system just does not fully trust the stop yet."
   ],
   "answer_notes": [
    "Going back to check everything shows that completion does not feel like completion to you until it has been re-verified. That points to a mind that protects itself by staying alert after the job is done. You can keep the standard, but you do not have to let the standard keep you hostage.",
    "Feeling uneasy on a day off shows that your recovery system does not switch off cleanly once work stops. That means rest is not just about time off for you; it is about learning that nothing bad starts just because you pause. You are allowed to let the quiet stay quiet for a little longer."
   ],
   "chat_snapshot_note": "You said that you rest, but it never feels like resting, and that lands right next to the tired, slightly anxious feeling you brought into the conversation. The problem is not that you do not stop; it is that your mind keeps reopening the task even after your body has stepped away. The line to keep is this: you are not asking for too much when you want rest to actually feel like rest.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they do not just bring information; they flip your whole system back into alert mode. That is exactly how strong Wood and low Metal can feel in daily life: movement starts fast, but the line that says stop stays weak. So a simple message can feel bigger than it should, because it touches the part of you that fears being pulled behind.",
   "chat_repeat_note": "Your pattern is cram, then crash, which means you borrow energy from tomorrow until tomorrow collects it all at once. In the middle, you keep choosing to push a little further instead of stopping at the first sign of strain. A smaller handoff point, even once, is where the loop starts to loosen.",
   "chat_fear_note": "The fear that stopping means falling behind is really a fear of losing your place. Underneath it, there is a wish to stay reliable, visible, and still on track. That wish makes sense, and it does not need to be argued with before it can be soothed.",
   "psychology_fact_heading": "Perfectionism and recovery balance",
   "psychology_fact_body": "Your 82 percent perfectionism shows up in the way you go back and re-check everything after finishing a task, and your 34 percent recovery shows up in how uneasy you feel even on a day off. That combination means completion does not register as closure for you; it registers as a moment to inspect one more time. In your answers, the body keeps moving toward rest, but the mind keeps asking for proof, which is why the same finished day can still feel unfinished. The pattern is not abstract here — it is already visible in your own two responses.",
   "psychology_takeaway": "Finished is not the same as safe. Your mind wants certainty before it lets go, but your body needs permission to stop first.",
   "strengths": [
    {
     "title": "Strong finish",
     "body": "You have a real ability to carry something through to the end, and that shows in the way you keep returning to the task until it is complete. The Monday-morning messages may re-ignite you, but they also show how seriously you take what you have already built. That kind of follow-through is a strength, even when it is running hotter than you want."
    },
    {
     "title": "Sharp awareness",
     "body": "You notice the shift from effort to strain before many people would even name it, and that awareness is one of your clearest assets. The tired and slightly anxious feeling you described is not vague in your system; you can feel the moment the pressure starts to stack. That sensitivity gives you a real chance to change course earlier."
    },
    {
     "title": "Persistence under load",
     "body": "You can keep moving when the day is heavy, and that is not a small thing. The cram-then-crash pattern shows endurance first, not failure first. Even when the rhythm is costly, it still proves that you know how to keep going when something matters."
    },
    {
     "title": "High standards",
     "body": "Your 82 percent perfectionism gives you a strong sense of what should be cleaned up, checked, and made solid. In practice, that means you do not let things drift carelessly, and people can trust that you will look again when quality matters. Used well, that standard becomes craftsmanship rather than self-pressure."
    }
   ],
   "weaknesses": [
    {
     "title": "Open loop",
     "body": "You have trouble letting a finished task stay finished, and that keeps the loop open in your head. The checking does not come from carelessness; it comes from a system that has a hard time trusting closure. That is why rest can feel occupied even when nothing new is happening."
    },
    {
     "title": "Rest tension",
     "body": "A day off does not always register as relief for you, and that is why recovery feels uneasy instead of easy. Your mind keeps one foot in the work, so your body never gets the full signal that it is allowed to stand down. That tension is tiring because it makes every pause feel provisional."
    },
    {
     "title": "Crash cycle",
     "body": "You tend to cram until the pressure is too high, then drop hard afterward. The cycle is costly because it makes your energy disappear in one wave instead of spreading across the week. You are not lacking effort; you are spending it in a way that leaves nothing in reserve."
    },
    {
     "title": "Behind fear",
     "body": "The fear of falling behind can make even ordinary interruptions feel threatening. A Monday message or a quiet evening can suddenly seem loaded with consequences, which keeps your attention tense. That fear is understandable, but it also keeps you from feeling the present moment as fully as you could."
    }
   ],
   "fit_good": "You do best in a setting where completion has a clear endpoint and where the next step does not arrive the second you finish the last one. A workday with defined handoffs and visible closing rituals would help your mind stop reopening the file after hours. You also do better when Monday does not immediately flood you with messages before you have had a chance to settle in.",
   "fit_bad": "You struggle in environments that reward instant replies, constant availability, and endless rechecking. If every finished item is followed by a fresh ping, your nervous system never gets a clean downshift. A day that is scattered by messages from the moment it starts will keep your recovery thin and uneasy.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "At the end of each task, spend two minutes writing down what is done and what is not. Do it before you move to the next thing, so your mind has a place to put the finished part. Use that same note as your stopping point when the checking urge returns."
    },
    {
     "title": "Protect the pause",
     "body": "Choose one short pause each day that is only for stopping, not for planning the next move. Keep it to ten minutes, and do not pair it with messages or task lists. The goal is to let your body experience a stop without asking it to earn the rest."
    },
    {
     "title": "Delay the check",
     "body": "When you want to reopen something, wait five minutes before touching it again. During that window, name the feeling instead of the flaw, and let your body stay seated. If the urge is still there after five minutes, check once, not repeatedly."
    },
    {
     "title": "Monday buffer",
     "body": "On Monday morning, give yourself the first fifteen minutes before you open incoming messages. Use that time to settle your desk, breathe, and decide what actually needs attention first. That small buffer can keep one message from hijacking the entire day."
    }
   ],
   "mindset_guide": "Think of your energy like a desk that never gets cleared. If every finished paper stays on top of the next one, nothing looks complete, even when the work is done. Your job is not to build a bigger desk. Your job is to clear one surface before you place the next thing on it. That is how rest starts to feel like rest again.",
   "closing_title": "What stays after the checking",
   "closing_body": "You do not need to become a different person to get relief. You need a rhythm that lets completion mean something to your body, not just to your standards. The line worth keeping is this: you can be devoted without staying on duty forever."
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
 "sam": {
  "content": {
   "title_line1": "You keep checking even after the work is done.",
   "title_line2": "And that is exactly where the exhaustion begins.",
   "subtitle": "Module 3 Burnout Deep Report — Saju x Psychological Test x Counseling Integration",
   "opening_scene": "It is late, and your phone is still in your hand after the task is already finished. Monday morning messages light up the screen, and your mind starts checking again before your body has caught up. You tell yourself you are resting, but the rest never lands as rest. By the time you finally stop, you are already tired and a little anxious. Sam, isn't this what your recent nights have been like?",
   "case_tag": "Example case — Mina, early 30s, a project that never feels complete",
   "case_paragraphs": [
    "Mina ends her day with a clean checklist, then opens the same files again because her mind will not accept the first pass. She works in long bursts, then crashes hard when the pressure finally drops. Her Five Elements also lean heavily toward Wood, so pressure and responsibility sit close to the center of her day. You can see how this turns even a quiet evening into one more round of checking, and that is why your pattern may feel so familiar."
   ],
   "oheng_intro": "Your Five Elements are evenly spread in four directions, but Wood stands out at 25 percent while Fire is absent at 0 percent. In a burnout pattern, that means pressure, duty, and forward motion press hard, while the part that should warm, soften, and replenish you has to be deliberately protected. So your exhaustion does not come from having nothing to give; it comes from pushing so long that the warming part never gets to stay lit.",
   "quiz_reading": "Your score pattern is sharp: Perfectionism is high at 82 percent, while Recovery sits at 34 percent and stays moderate-low. That is exactly what Finisher's Drain looks like — the work ends, but your mind keeps standing guard over it. So a day off still feels slightly unsafe, and Monday morning messages can switch the whole system back on in a second.",
   "element_readings": {
    "wood": {
     "heading": "Wood 25 percent — the vine that keeps climbing",
     "body": "Wood is tied at 25 percent with Earth, Metal, and Water, so it is one of several equal currents in your chart rather than a single strongest force. It shows up as the part of you that keeps pushing the work forward even after the task is technically done. In this burnout pattern, that looks like re-checking, tightening, and asking one more time whether it is really enough. For you, Wood is the force that turns Monday morning messages into pressure before the day has even begun."
    },
    "fire": {
     "heading": "Fire 0 percent — the warmth that needs fuel",
     "body": "Fire sits at 0 percent in your chart, so it is simply absent rather than quietly helping from the side. Fire is what helps you feel supported, warmed, and restored. With Fire at 0 percent, recovery does not arrive on its own just because you stopped working for a while. Your balanced chart means recovery needs more than one route back in, and that makes intentional rest, support, and softness especially important."
    },
    "earth": {
     "heading": "Earth 25 percent — the ground that keeps absorbing",
     "body": "Earth is steady at 25 percent, so part of you is always trying to hold things in place. That can look like staying responsible even when you are tired, or feeling that you should not let a task slip once it has landed on your desk. In burnout, that makes it hard to call a pause a real pause, because the ground inside you is still carrying the weight. You keep standing where the work was left, even when your body has already started asking for a break."
    },
    "metal": {
     "heading": "Metal 25 percent — the edge that keeps the line clean",
     "body": "Metal sits at 25 percent, and it gives your days a sharp sense of finish. That is why unfinished details bother you enough to send you back for another check. In a burnout cycle, Metal can be useful, but it can also make the final pass feel mandatory instead of optional. When your mind is already tired, that clean edge becomes the voice that says it must be precise one more time."
    },
    "water": {
     "heading": "Water 25 percent — the current that keeps thinking",
     "body": "Water is also at 25 percent, so your mind keeps moving even when your body wants to stop. That is the part that lets you notice risks, imagine what could go wrong, and keep scanning after the work is done. In this burnout story, Water is why rest can still feel alert, as if something important might be missed if you let your guard down. It keeps the inner current running, even on the days off."
    }
   },
   "upcoming_period_heading": "From age 40 to 49, Earth grows stronger",
   "upcoming_period_body": "From age 40 to 49, the stronger Earth current can make your life feel more structured and more anchored. That can be a useful stretch for building routines that actually hold, especially if you are tired of living in bursts and crashes. It is a good time to practice finishing the work without carrying it home in your head. If you prepare now, this period can become less about pressure and more about dependable support.",
   "cross_analysis_quotes": [
    "Your strongest element and your highest test score are pointing at the same habit: you keep pushing until the work feels airtight. That is Wood pressure meeting high perfectionism. It is why one more check can feel urgent even when the task is already done.",
    "Your weakest element and your lower recovery score are also speaking together. Fire is the part that should help you feel restored, but your recovery stays low, so rest does not fully register. That is why stopping can still feel uneasy instead of soothing."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that your mind trusts precision more than completion. In daily life, that can look like reopening a finished file or rereading a message after you have already sent it. The useful part of this answer is that you care deeply about getting things right, even when it costs you extra energy.",
    "Feeling uneasy even when you rest shows that your system does not switch off easily. In daily life, that can look like lying down but still listening for the next message or the next task. You are not failing at rest; you are showing how alert your mind stays when it has been carrying too much for too long."
   ],
   "chat_snapshot_note": "You said you rest, but it never feels like resting, and that matches the tired, slightly anxious feeling you brought into the conversation. The important part is not only the fatigue itself, but the way your mind stays online even after the work is finished. Your tiredness has a watchful edge, and that is why it can feel heavier than simple sleepiness. The line to keep is this: your body is asking for rest, and your mind keeps asking for proof.",
   "chat_trigger_note": "Monday morning messages matter so much because they hit the exact spot where your system is already braced. The moment a new message appears, the pressure returns before you have had time to settle. That fits the same high-perfectionism pattern as your test results: once something might still need attention, your mind jumps back into gear. For you, the trigger is not the message itself, but the sudden reactivation of responsibility.",
   "chat_repeat_note": "You cram, then you crash, and that rhythm explains why your energy feels uneven. You choose intensity first, because stopping too early feels risky and falling behind feels worse. A smaller move can help: leave one task intentionally unfinished for ten minutes, then return only once, so your mind learns that pause does not equal failure.",
   "chat_fear_note": "Your fear is not laziness or weakness. It is the fear that if you stop, the ground will move and you will lose your place. Under that fear is a very practical wish: you want to stay steady, keep up, and not have to rebuild everything from scratch. That is why your system keeps checking — it is trying to protect your place in the line.",
   "psychology_fact_heading": "The Zeigarnik effect",
   "psychology_fact_body": "The Zeigarnik effect describes how unfinished tasks stay more mentally active than finished ones. That is why a completed job can still keep looping in your head, especially when you are already sensitive to mistakes. In your case, it helps explain why resting does not fully land until your mind believes the work is truly closed. It also fits the way Monday morning messages can pull your attention back into an unfinished mental thread.",
   "psychology_takeaway": "Your mind is treating unfinished work like an open tab that refuses to close. The more you practice a real end point, the less power that tab has over your rest.",
   "strengths": [
    {
     "title": "Sharp finishing",
     "body": "You notice details after the task is done, which means you are rarely careless with your work. That shows up in the way you go back and re-check everything instead of letting a loose end sit there. In a busy week, that sharp finishing can keep quality high even when the pressure is heavy."
    },
    {
     "title": "High endurance",
     "body": "You can push through a lot before you collapse, and that is not a small thing. The cram-then-crash pattern shows stamina first, even if the crash comes later. When used well, that endurance helps you carry demanding work across a long stretch."
    },
    {
     "title": "Strong responsibility",
     "body": "You do not treat your work lightly, and that is clear in how strongly you react to Monday morning messages. Your mind keeps watch because part of you wants to make sure nothing slips. That sense of duty can make you someone others rely on when things need to be handled carefully."
    },
    {
     "title": "Alert self-monitoring",
     "body": "You are quick to notice when your own energy is off, which is a real strength in burnout recovery. You already know the difference between being tired and being tired with anxiety layered on top. That awareness gives you a starting point for changing the pattern instead of only enduring it."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard stop",
     "body": "It is difficult for you to feel that something is truly finished, even after the work is complete. That is why your mind keeps checking and the break never feels clean. The cost is not just extra time; it is the way closure keeps slipping away from you."
    },
    {
     "title": "Rest guilt",
     "body": "Rest does not fully relax you, and that shows up as unease even on a day off. You are not simply tired; you are alert while trying to recover. That makes rest feel like another task instead of a place where your system can soften."
    },
    {
     "title": "Overdrive cycle",
     "body": "You cram your effort into a burst, then hit the wall afterward. That cycle can make the day look productive from the outside while leaving you empty on the inside. The pattern is especially strong when a deadline or message makes you feel that stopping would mean falling behind."
    },
    {
     "title": "Fall-behind fear",
     "body": "A quiet fear sits underneath your pace: if you stop, you may lose ground. That fear can make even a small pause feel expensive. The result is that your body asks for recovery while your mind argues for one more round of effort."
    }
   ],
   "fit_good": "You do best in a setting where tasks have clear endings and expectations are written down early. A day with one final review point and no surprise messages after hours will help your mind settle faster. Work that values quality without asking you to keep proving it over and over will suit you well.",
   "fit_bad": "You will struggle in a place where Monday morning messages keep arriving before you have closed the last round of checking. A culture that expects you to re-check everything on command will feed the same loop you already described. The worst fit is a day built around constant reactivation, because your mind will never get to leave the review mode it keeps slipping back into.",
   "behavior_guides": [
    {
     "title": "One final check",
     "body": "Set a single time for your last review, and make it the same every workday. When that time ends, close the file and do not reopen it unless a real deadline changes. This gives your mind a clear boundary to follow instead of an endless permission to keep scanning."
    },
    {
     "title": "Message delay",
     "body": "After work, wait ten minutes before opening Monday-style messages or any new alerts. Use that gap to breathe, stand up, or wash your hands so your body gets a cue that the workday is over. Keep the same delay for a week so the pause becomes familiar instead of threatening."
    },
    {
     "title": "Recovery block",
     "body": "Protect one short block of rest each day that has no checking, no planning, and no cleanup. Keep it to twenty minutes if that is all you can hold at first. The point is not to be perfectly restful; it is to teach your system that stopping can be safe."
    },
    {
     "title": "Cramming limit",
     "body": "When you feel yourself speeding up, stop after the next small milestone instead of pushing all the way to exhaustion. Write down the next step, then leave it for later on purpose. That keeps your energy from collapsing all at once and makes the crash less severe."
    }
   ],
   "mindset_guide": "Think of your energy like a workbench lamp, not a spotlight. A spotlight burns bright and then leaves you in the dark, which is what your cram-then-crash rhythm has been doing. A lamp can stay on longer when you lower the glare and stop trying to illuminate everything at once. Your rest needs that same gentler setting, because recovery is not proof that you are falling behind.",
   "closing_title": "When the task ends, let your mind end too",
   "closing_body": "You do not need to become less capable to feel better. You need a finish line that your body and mind can actually recognize. The most important sentence to keep is this: stopping is not the same as falling behind."
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
 "jisoo": {
  "content": {
   "title_line1": "멈추지 못한 손끝에",
   "title_line2": "쉬어도 계속 켜져 있는 마음",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침 메신저 알림이 울리면, 아직 몸이 덜 깬 상태인데도 머리는 바로 일을 세기 시작해요. 쉬는 날이어도 마음이 편하지 않아서, 잠깐 멈췄다가도 다시 처음부터 훑어보게 돼요. 끝냈다고 생각한 일도 머릿속에서는 계속 점검이 이어지고, 그 사이 지수님은 이미 지쳐 있어요. 쉬어도 쉬는 것 같지 않다는 말이, 지금 지수님 하루의 표정처럼 붙어 있어요.",
   "case_tag": "가상 사례 — 서윤, 30대 초반, 업무 메신저가 끊이지 않는 직장인",
   "case_paragraphs": [
    "서윤은 퇴근 후에도 노트북을 닫지 못하고, 방금 끝낸 일을 다시 열어 처음부터 확인하는 사람이에요. 월요일 아침 알림이 오면 손보다 먼저 마음이 먼저 굳어 버려요. 사주에서도 토가 강하고 수가 약한 흐름이라, 일을 붙드는 힘은 큰데 쉬는 힘은 잘 붙지 않았어요. 당신도 이렇게 끝낸 뒤에 더 지치는 날이 있지 않으신가요."
   ],
   "oheng_intro": "토가 50퍼센트로 가장 강하고, 수는 0퍼센트로 비어 있어요. 지수님은 현실과 일을 붙잡는 힘이 아주 강한데, 그 뒤를 식혀 주고 받쳐 주는 흐름은 거의 보이지 않아요. 그래서 번아웃에서는 몰아서 버티고 한 번에 무너지는 장면으로 이 분포가 그대로 드러나요.",
   "quiz_reading": "완벽주의가 82퍼센트로 높고 회복이 34퍼센트로 낮게 나온 조합이에요. 끝까지 해내는 힘이 분명한데, 해낸 뒤에 마음이 내려오지 않아서 하루가 끝나도 긴장이 남아 있어요. 완주형 소진이라는 이름이 붙은 이유가 바로 여기에 있어요.",
   "element_readings": {
    "wood": {
     "heading": "목(木) 보통 — 앞으로 밀어 붙이는 줄기",
     "body": "목은 33퍼센트로 보통이라서, 지수님 안에는 일을 앞으로 밀어 붙이는 기세가 분명히 있어요. 그런데 이 기세가 번아웃에서는 멈춤보다 진행을 먼저 택하게 만들어요. 월요일 아침 알림 하나에도 바로 다시 일을 세기 시작하는 반응이 여기서 보여요."
    },
    "fire": {
     "heading": "화(火) 적음 — 바로 타오르지 못한 불씨",
     "body": "화는 0퍼센트라서, 지수님이 지친 뒤에 기세를 다시 올려 주는 온도가 잘 붙지 않아요. 쉬는 날에도 마음이 불편한데, 그 불편함을 데워서 풀어 주는 장치가 약한 모습이에요. 그래서 잠깐 쉬어도 곧바로 머릿속 점검으로 돌아가기 쉬워요."
    },
    "earth": {
     "heading": "토(土) 강함 — 일을 붙잡는 무게",
     "body": "토는 50퍼센트로 가장 강해서, 지수님은 일을 손에서 놓지 않고 끝까지 붙드는 힘이 커요. 완벽주의 82퍼센트는 이 무게와 정확히 맞물려서, 끝낸 뒤에도 다시 처음부터 훑게 만들어요. 번아웃에서 몰아서 하고 무너지는 패턴도 이 토의 힘이 너무 오래 버티는 쪽으로 쓰이기 때문이에요."
    },
    "metal": {
     "heading": "금(金) 보통 — 점검의 칼날",
     "body": "금은 17퍼센트라서, 지수님은 일을 대충 넘기지 않고 기준을 세워 자꾸 다시 살펴보는 편이에요. 이 점검은 번아웃 모듈에서는 강점이면서도, 쉬어도 마음이 불편한 이유가 되기도 해요. 끝난 일을 다시 훑는 습관이 여기서 아주 선명하게 보여요."
    },
    "water": {
     "heading": "수(水) 적음 — 쉬게 해 주는 물길",
     "body": "수는 0퍼센트라서, 지수님은 지친 마음을 받아 주고 내려놓게 해 주는 흐름이 거의 비어 있어요. 이 부족한 자리는 금이 수를 살려 주는 방식으로만 아주 조심스럽게 메워질 수 있어요. 그래서 점검은 잘되는데 회복은 잘 안 붙고, 쉬어도 마음이 편하지 않은 장면이 반복돼요."
    }
   },
   "upcoming_period_heading": "36세부터 45세까지, 물의 흐름이 강해지는 시기",
   "upcoming_period_body": "36세부터 45세까지는 그동안 비어 있던 회복의 감각이 조금씩 더 자주 떠오를 수 있는 흐름이에요. 지금처럼 일의 무게를 끝까지 떠안기보다, 도움을 받는 일과 잠깐 내려놓는 일이 서서히 익숙해질 여지가 있어요. 이 시기를 맞이할 때를 생각하면, 지금부터 끝낸 일을 다시 훑는 습관을 조금 느슨하게 두는 연습이 도움이 돼요. 그래야 물의 흐름이 와도 지수님 몸이 그 변화를 받아들일 자리를 만들 수 있어요.",
   "cross_analysis_quotes": [
    "토가 강한 사람은 끝내는 힘이 크고, 완벽주의 82퍼센트는 그 힘을 멈추지 못하게 만들어요. 지수님은 일을 붙드는 데서는 강하지만, 끝난 뒤 마음을 내려놓는 데서는 훨씬 더 많은 에너지가 들어가요. 그래서 완주형 소진이란 이름이 딱 맞아요.",
    "수가 0퍼센트인 흐름은 회복 34퍼센트의 낮음을 아주 또렷하게 보여 줘요. 쉬는 날에도 마음이 불편하다는 답은, 몸이 쉰다기보다 마음이 계속 경계하고 있다는 뜻이에요. 쉬어도 쉬는 것 같지 않은 이유가 바로 여기에 있어요."
   ],
   "answer_notes": [
    "지수님은 끝낸 일보다 끝난 뒤의 빈틈을 더 오래 바라보는 사람이에요. 그래서 성과가 있어도 마음은 바로 안심하지 못하고, 다시 확인하는 쪽으로 기울어요. 그럴수록 스스로에게는 완료보다 점검이 더 익숙한 언어가 돼요.",
    "지수님은 쉼을 멈춤이 아니라 공백으로 받아들이는 편이에요. 그래서 쉬는 날에도 마음이 편하지 않고, 잠깐 쉬어도 곧바로 다음 일을 떠올리게 돼요. 이런 답은 회복을 의지의 문제가 아니라 안정감의 문제로 보여 줘요."
   ],
   "chat_snapshot_note": "지수님이 꺼낸 핵심 고민은 쉬어도 쉬는 것 같지 않다는 거예요. 그 말 뒤에는 지쳤고 조금 불안한 마음이 바로 붙어 있었어요. 저장하고 싶은 문장은 이거예요, 쉬는 동안에도 마음이 일을 놓지 못하면 사람은 결국 더 오래 지쳐요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 단순한 알림이 아니에요. 멈추면 뒤처질까 봐 멈출 수 없다는 두려움을 바로 건드리는 신호예요. 완벽주의가 높은 사람에게 이런 알림은 일을 시작하라는 소리보다 긴장을 다시 켜라는 소리로 먼저 들려요.",
   "chat_repeat_note": "지수님은 몰아서 하고 무너지는 흐름 안에서 오래 버텨 왔어요. 할 때는 끝까지 밀어붙이고, 무너지기 직전까지 멈추지 않는 선택을 반복해 온 거예요. 그 패턴을 살짝 비틀려면 끝내기 전에 잠깐 멈추는 시간을 일정에 먼저 넣어 두는 게 좋아요.",
   "chat_fear_note": "지수님이 정말 무서워한 것은 쉬는 시간이 아니라 뒤처지는 느낌이었어요. 그래서 멈추는 순간에도 마음은 계속 앞으로 달리고 있었어요. 그 아래에는 잘하고 싶다는 마음과 놓치고 싶지 않다는 마음이 함께 있어요.",
   "psychology_fact_heading": "완벽주의와 회복 탄력성",
   "psychology_fact_body": "완벽주의가 높을수록 일의 기준이 높아지고, 끝난 뒤에도 머릿속 점검이 쉽게 멈추지 않아요. 회복 탄력성은 스트레스를 받은 뒤 다시 내려오는 힘을 뜻하는데, 지수님은 이 축이 낮게 나와 쉬는 시간에도 마음이 편해지기 어려워 보여요. 그래서 일의 양보다 일 뒤의 잔열이 더 오래 남는 패턴으로 읽혀요. 이 조합은 번아웃에서 특히 자주 보이는 흐름이에요.",
   "psychology_takeaway": "끝내는 힘이 큰 사람일수록, 내려오는 연습이 더 필요해요. 지수님은 일을 잘하는 것만큼이나 일을 끝낸 뒤 마음을 접는 기술을 함께 키워야 해요.",
   "strengths": [
    {
     "title": "버티는 힘",
     "body": "지수님은 토가 50퍼센트로 강해서, 일이 몰려도 쉽게 무너지지 않고 끝까지 버티는 힘이 있어요. 실제로 몰아서 하고 무너지기까지 가는 사람들은 중간에 포기하기보다 너무 오래 버티는 경우가 많아요. 이 힘은 번아웃의 원인이 되기도 하지만, 동시에 중요한 일을 끝내는 추진력이기도 해요."
    },
    {
     "title": "점검 감각",
     "body": "완벽주의 82퍼센트는 지수님이 일을 대충 넘기지 않는다는 뜻이에요. 끝낸 뒤 다시 처음부터 훑어보는 습관은 스스로 기준을 지키려는 힘에서 나와요. 월요일 아침 알림이 와도 바로 상황을 파악하는 감각은 이 점검력이 있기 때문에 가능해요."
    },
    {
     "title": "책임 지속",
     "body": "지수님은 한 번 맡은 일을 쉽게 놓지 않는 사람이에요. 그래서 일이 끝난 뒤에도 마음속에서 계속 확인이 이어지고, 그만큼 책임감이 오래 남아요. 이런 지속성은 번아웃에서는 과해지기 쉽지만, 믿고 맡길 수 있는 힘으로도 읽혀요."
    },
    {
     "title": "긴장 감지",
     "body": "지수님은 월요일 아침 메신저 알림이 울리는 순간 긴장이 바로 올라와요. 회복 34퍼센트가 낮게 나온 흐름은 이렇게 쉬는 자리보다 다시 시작하는 신호에 더 예민하게 반응하는 장면으로 보여요. 이 감각은 위험을 놓치지 않는 장점이기도 해요."
    }
   ],
   "weaknesses": [
    {
     "title": "쉼의 불편",
     "body": "지수님은 쉬는 날에도 마음이 편하지 않아서, 쉰다는 감각 자체가 잘 붙지 않아요. 그래서 몸은 멈춰도 머리는 계속 일을 점검하게 돼요. 이 불편함은 게으름이 아니라 회복의 통로가 아직 좁다는 뜻으로 읽혀요."
    },
    {
     "title": "과점검",
     "body": "일을 끝낸 뒤 다시 처음부터 훑는 습관은 안심을 찾는 방식이지만, 번아웃에서는 에너지를 더 빼앗기도 해요. 지수님은 완료보다 검토에 더 오래 머물면서 지치는 쪽이에요. 그 시간이 길어질수록 하루는 끝났는데 마음은 끝나지 않아요."
    },
    {
     "title": "몰아치기",
     "body": "몰아서 하고 무너지는 패턴은 지수님이 한 번에 많이 해내는 만큼 한 번에 많이 소진된다는 뜻이에요. 중간에 조금씩 풀어 놓는 대신 끝까지 쥐고 가기 때문에, 무너질 때는 더 크게 느껴져요. 이 흐름은 의지보다 리듬의 문제로 보는 편이 맞아요."
    },
    {
     "title": "멈춤 불안",
     "body": "뒤처질까 봐 멈출 수 없다는 두려움은 지수님을 계속 앞으로만 몰고 가요. 그래서 쉬어도 쉬는 것 같지 않고, 잠깐 멈추는 순간에도 죄책감이 따라붙어요. 멈춤을 위험이 아니라 조절로 느끼는 연습이 필요해 보여요."
    }
   ],
   "fit_good": "하루의 시작과 끝이 분명한 환경이 지수님에게 잘 맞아요. 해야 할 일이 한 번에 몰리기보다, 우선순위가 정리되어 있고 중간 확인이 가능한 흐름이 좋아요. 끝낸 뒤 바로 다음 일로 급히 넘어가지 않아도 되는 자리에서 지수님은 덜 지쳐요.",
   "fit_bad": "메신저 알림이 끊이지 않고, 끝난 일을 바로 다시 확인해야 하는 환경은 지수님을 빠르게 소진시켜요. 오늘 끝낸 일을 오늘 안에 여러 번 검토하게 만드는 분위기는 회복을 더 어렵게 해요. 하루의 경계가 흐린 일터는 지수님에게 특히 불리해요.",
   "behavior_guides": [
    {
     "title": "알림 분리",
     "body": "월요일 아침처럼 긴장이 올라오는 시간에는 알림을 바로 열지 말고 10분만 미뤄 보세요. 그 10분 동안은 물 한 잔만 마시고 오늘 할 일 세 가지만 적어 두면 돼요. 시작을 늦추는 것이 아니라, 마음이 먼저 달리지 않게 속도를 맞추는 연습이에요."
    },
    {
     "title": "재점검 제한",
     "body": "일을 끝낸 뒤 다시 훑고 싶어질 때는 한 번만 확인하는 규칙을 정해 보세요. 확인은 5분 안에 끝내고, 그 뒤에는 메모를 닫는 흐름이 좋아요. 완벽을 없애는 게 아니라 점검의 끝을 정해 주는 거예요."
    },
    {
     "title": "짧은 회복",
     "body": "쉬는 날에는 길게 쉬려 하기보다 20분 단위로 숨을 돌려 보세요. 20분 산책이나 20분 낮잠처럼 몸이 바로 느끼는 회복이 좋아요. 지수님은 쉼이 길어질수록 불편해질 수 있어서, 작고 분명한 회복이 더 잘 맞아요."
    },
    {
     "title": "마감 분리",
     "body": "퇴근 후에는 업무 화면을 닫는 시간을 매일 비슷하게 고정해 보세요. 예를 들어 밤 9시 이후에는 메신저 확인을 멈추는 식으로 경계를 하나 세우면 좋아요. 일과 마음의 경계를 분리해야 지수님이 덜 무너져요."
    }
   ],
   "mindset_guide": "번아웃은 불이 너무 세게 붙은 뒤 식지 않는 상태에 가까워요. 지수님은 불을 키우는 쪽은 아주 잘하지만, 불을 천천히 낮추는 쪽은 아직 익숙하지 않아요. 장작을 계속 얹는 대신, 잠깐 옆으로 치워 두는 손길이 필요해요. 일을 멈추는 게 아니라, 타는 속도를 조절하는 거예요.",
   "closing_title": "끝내는 힘, 쉬는 기술",
   "closing_body": "지수님은 이미 많이 해내는 사람이고, 그래서 더 많이 지치는 사람이에요. 완벽하게 끝내려는 힘은 분명한 장점이지만, 그 힘이 쉬는 자리까지 차지하지 않도록 경계를 세워야 해요. 오늘의 문장은 이거예요, 일은 끝내도 마음까지 끝낼 필요는 없어요."
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
   "title_line1": "Tu mente no se apaga cuando termina el trabajo",
   "title_line2": "y el lunes vuelve a encender lo que ya había soltado",
   "subtitle": "Informe profundo del módulo 3 · agotamiento — saju × psicología × acompañamiento integrado",
   "opening_scene": "De noche, el cuerpo ya pide pausa, pero tu mente vuelve a abrir lo que cerraste durante el día. Terminas una tarea y todavía sigues mirando si quedó perfecta, como si dejarla quieta fuera dejar algo importante atrás. Luego llega el lunes por la mañana, entran los mensajes, y esa tensión vuelve a subir con una rapidez que tú ya reconoces. Descansas, pero el descanso no se siente como descanso, y por eso Casey, así se ven tus días, ¿no es cierto?",
   "case_tag": "CASO DE EJEMPLO — Martín, 30 y tantos, semana laboral exigente",
   "case_paragraphs": [
    "Martín revisaba el mismo informe dos veces antes de enviarlo. Cuando por fin cerraba la computadora, seguía con la sensación de que algo quedaba suelto. Su mapa también mostraba madera fuerte y agua débil, así que la mente se le iba más a sostener y corregir que a soltar. Tú también podrías verte en ese mismo ir y venir.",
    "El martes llegaba con la energía ya gastada por el repaso del lunes. Martín no se daba permiso de parar del todo, porque sentía que aflojar un poco lo dejaba atrás. Esa mezcla de empuje y desgaste no era flojera; era una forma de sostener demasiado tiempo la tensión. Tú también podrías estar haciendo exactamente eso."
   ],
   "oheng_intro": "Tu madera está en 38% y tu agua en 0%, y esa distancia se nota en el módulo de agotamiento. La madera aquí es la fuerza que te hace sostener lo concreto, tomarlo en serio y seguir empujando el trabajo y el dinero. La ausencia de agua deja menos salida para lo que sientes y para la energía que necesitas devolver al cuerpo después de tanto empuje.",
   "quiz_reading": "El perfeccionismo alto del 82% y la recuperación baja del 34% explican por qué terminas una tarea y todavía te quedas revisando mentalmente lo que ya salió bien. En quien termina todo y se agota, no faltan ganas: sobra vigilancia. Por eso un descanso libre puede sentirse raro, como si el cuerpo se parara pero la cabeza siguiera trabajando.",
   "element_readings": {
    "wood": {
     "heading": "madera fuerte — sostiene más de lo que suelta",
     "body": "Tu madera está en 38%, así que no entra en tu día como una idea suelta, sino como una mano que quiere agarrarlo todo. En este módulo se ve en esa costumbre de terminar algo y volver a revisarlo desde el principio, como si el cierre todavía no mereciera confianza. También aparece en el miedo a quedarte atrás si paras, porque la madera fuerte no tolera bien sentir que algo se escapa. Aquí tu impulso no es correr por correr; es mantener el control de lo que ya tomaste."
    },
    "fire": {
     "heading": "fuego bajo — chispa breve, gasto rápido",
     "body": "Tu fuego está en 13%, así que no domina la escena, pero sí aparece en ráfagas breves cuando algo te activa. Los mensajes del lunes por la mañana pueden encenderte de golpe, aunque después esa misma intensidad se apague rápido. En el agotamiento, eso se parece a arrancar con fuerza y quedarte sin margen antes de terminar el día. Tu fuego no falta; se consume pronto cuando la vigilancia ya venía alta."
    },
    "earth": {
     "heading": "tierra baja — poco lugar para asentarse",
     "body": "Tu tierra está en 13%, y eso deja poco espacio para sentir que algo quedó bien apoyado. En el módulo de agotamiento, se nota cuando descansas pero no logras que el cuerpo crea en ese descanso. Entonces el día sigue acumulándose por dentro, y la sensación de base firme tarda en llegar. Con esta tierra, lo que más cuesta no es hacer; es quedarte quieto sin sentir que algo se desordena."
    },
    "metal": {
     "heading": "metal fuerte — orden que corta y afina",
     "body": "Tu metal está en 38%, así que tu mente sabe separar, revisar y dejar todo más limpio de como estaba. En agotamiento, esa fuerza se vuelve una lupa que vuelve una y otra vez sobre lo ya terminado. También explica por qué el lunes por la mañana, con unos mensajes, se te reactiva la tensión tan rápido. Tu metal no solo ordena; también mantiene alerta lo que todavía no quiere soltar el control."
    },
    "water": {
     "heading": "agua muy baja — salida corta para tanta presión",
     "body": "Tu agua está en 0%, y eso deja muy poco espacio para vaciar lo que llevas acumulado. En tu caso, la madera fuerte empuja a sostener y el agua no alcanza para descargar, así que acabas reuniendo tensión hasta que te derrumbas de golpe. Esa es la parte que encaja con la recuperación baja del 34%: el cuerpo pide pausa, pero no encuentra vía para recuperarse de verdad. Cuando agua casi no hay, el cansancio no se va solo; se queda dando vueltas dentro de ti."
    }
   },
   "upcoming_period_heading": "De los 41 a los 50 años, llega un ciclo de diez años con metal más fuerte",
   "upcoming_period_body": "Cuando entre ese ciclo, tu capacidad para ordenar, decidir y dejar las cosas más claras puede ganar mucho peso. También será una etapa más útil para poner límites al exceso de revisión y para quedarte con lo esencial sin seguir exprimiendo la energía hasta el final. Si desde ahora practicas cierres más limpios y pausas reales, llegarás a ese momento con menos ruido interno. Lo que prepares hoy será la base para que esa fuerza no te endurezca, sino que te ayude a trabajar con más precisión y menos desgaste.",
   "cross_analysis_quotes": [
    "Tu madera fuerte no solo empuja el trabajo; también alimenta el perfeccionismo del 82% y hace que terminar no signifique soltar. Por eso tu mente vuelve al principio cuando ya habías terminado, como si el cierre todavía necesitara una última vuelta. Esa mezcla te da capacidad de sostener mucho, pero también te deja viviendo en revisión constante.",
    "La agua en 0% conversa de frente con la recuperación baja del 34%. Cuando descansas, tu sistema no encuentra del todo la salida para vaciar la tensión, y por eso el descanso se siente raro. No es falta de voluntad; es que la descarga tarda demasiado en llegar y la mente sigue encendida."
   ],
   "answer_notes": [
    "Revisar desde el principio muestra que para ti cerrar una tarea no basta si no queda impecable. En el día a día, eso se ve en una última vuelta a lo ya entregado, aunque por fuera parezca terminado. A ti te sirve recordar que terminar también puede incluir dejarlo ir.",
    "Sentir inquietud incluso al descansar muestra que tu cuerpo no interpreta la pausa como alivio automático. En la práctica, eso aparece cuando te sientas un momento y la mente ya está buscando lo siguiente. A ti te ayuda pensar el descanso como una habilidad que se entrena, no como algo que debería ocurrir solo."
   ],
   "chat_snapshot_note": "Tu frase sobre descansar, pero no sentirlo como descanso, toca justo el punto donde el cansancio y la ansiedad se juntan. No es solo fatiga: es una mente que no baja la guardia ni cuando el día ya terminó. La frase que te conviene guardar es esta: parar no te borra el camino; solo te devuelve el cuerpo.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque no llegan a una mente vacía, sino a un sistema que ya venía revisando demasiado. Ese momento toca de lleno tu perfeccionismo alto y vuelve a encender la exigencia antes de que el día arranque. Por eso algo tan breve puede sentirse tan grande: activa el modo de control que ya conoces demasiado bien.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte muestra que aguantas más de la cuenta antes de permitirte aflojar. Primero sostienes, luego sigues, y cuando el cuerpo ya no da más, la caída llega de golpe. Un pequeño cambio para romper ese ciclo es hacer una pausa corta antes del límite, no después.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de debilidad, sino de cuánto valor le das a seguir avanzando. Debajo de ese miedo hay una necesidad muy clara de no perder el lugar que has construido con tanto esfuerzo. Lo importante aquí no es correr más, sino aprender que detenerte un momento no te quita terreno.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "El perfeccionismo alto suele llevar a revisar más de la cuenta, mientras la recuperación baja hace difícil sentir que una pausa realmente devolvió energía. En tu caso, esa combinación aparece cuando cierras algo y aun así vuelves a mirarlo desde el inicio, como si el final todavía no fuera seguro. También ayuda a entender por qué el descanso puede sentirse raro en lugar de reparador. Tu exigencia no solo empuja; también retrasa la sensación de cierre.",
   "psychology_takeaway": "No te falta pausa; te sobra vigilancia. Cuando la mente aprende a soltar antes, el cuerpo por fin empieza a recuperar.",
   "strengths": [
    {
     "title": "Sostén constante",
     "body": "Tienes una capacidad real para mantener el rumbo incluso cuando ya vienes al límite. Eso se ve en que terminas una tarea y todavía encuentras energía para revisarla con cuidado, en lugar de dejarla caer a medias. Esa constancia es una fuerza muy tuya, aunque a veces te pida más de lo que conviene."
    },
    {
     "title": "Ojo fino",
     "body": "Tu atención detecta detalles que otras personas dejan pasar. En el trabajo, eso te permite ver fallos, ajustar matices y entregar algo más limpio. Ese ojo fino también explica por qué te cuesta dar una tarea por cerrada sin una última revisión."
    },
    {
     "title": "Resistencia alta",
     "body": "Aguantas tramos largos antes de notar que ya te pasaste de punto. El patrón de acumular y luego derrumbarte muestra que tu resistencia no es pequeña; simplemente la estiras demasiado. Bien usada, esa fuerza te permite sostener procesos exigentes sin perder el hilo."
    },
    {
     "title": "Lectura rápida",
     "body": "Captas enseguida cuando algo cambia, y los mensajes del lunes por la mañana te alteran precisamente porque lees rápido el peso que traen. Esa sensibilidad te ayuda a anticiparte y a responder a tiempo. Cuando la regulas bien, se vuelve una ventaja para decidir con claridad."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión excesiva",
     "body": "Tu mente no se conforma con terminar; quiere volver a mirar por si quedó algo mejorable. Eso te lleva a reabrir mentalmente lo que ya habías cerrado, aunque por fuera el trabajo esté listo. El resultado es más desgaste que mejora."
    },
    {
     "title": "Pausa incómoda",
     "body": "Cuando intentas descansar, aparece inquietud en vez de alivio. No es que no quieras parar; es que la pausa te deja demasiado espacio para escuchar la presión acumulada. Por eso un día libre puede sentirse raro, incluso cuando no hay nada urgente delante."
    },
    {
     "title": "Subida y caída",
     "body": "Tu energía no se reparte de manera pareja: primero acumulas mucho y luego te derrumbas de golpe. Esa forma de funcionar hace que el cansancio tarde en avisar y después llegue con más fuerza. Si empiezas a soltar antes, evitas que el bajón te tome por sorpresa."
    },
    {
     "title": "Miedo al freno",
     "body": "Te pesa la idea de quedarte atrás si paras. Ese pensamiento te hace seguir incluso cuando ya pedirías una pausa real. Entenderlo te ayuda a ver que tu impulso no nace de falta de valor, sino de una exigencia muy alta contigo."
    }
   ],
   "fit_good": "Te va mejor un entorno donde el trabajo tenga cierres claros y donde puedas revisar una vez sin quedarte dentro del repaso. También te ayuda un día con bloques definidos, porque así no necesitas sostener todo al mismo tiempo. Cuando sabes qué termina y qué sigue, tu energía se ordena mejor.",
   "fit_bad": "Te desgasta un entorno con mensajes constantes, cambios de último minuto y sensación de urgencia desde la mañana. Ahí tu mente no baja, y el lunes puede volverse una alarma que dura todo el día. También te convienen poco los espacios donde nadie define cuándo algo está realmente terminado.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Elige una sola revisión final para cada tarea importante y hazla en un bloque de 10 minutos. Después de eso, envía o guarda el trabajo sin volver a abrirlo ese mismo día. Así entrenas a tu mente a reconocer un final real."
    },
    {
     "title": "Pausa breve",
     "body": "Antes de seguir con otra tarea, para 3 minutos y deja la pantalla quieta. Hazlo dos veces al día, una a media mañana y otra al final de la tarde. Esa pequeña pausa ayuda a que el cuerpo no llegue siempre al límite."
    },
    {
     "title": "Límite matinal",
     "body": "Si los mensajes de la mañana te encienden demasiado, revisa el teléfono solo después de una primera acción concreta, como ordenar tu escritorio o tomar agua. Repite ese orden durante una semana. Así el día no empieza desde la alarma, sino desde una base más firme."
    },
    {
     "title": "Salida diaria",
     "body": "Al cerrar el día, escribe en una nota tres cosas terminadas y una sola cosa pendiente. Hazlo en 5 minutos, no más. Ese gesto le enseña a tu mente que no todo tiene que quedarse girando hasta la noche."
    }
   ],
   "mindset_guide": "Piensa en tu energía como en una cuenta que no se repone sola si solo sigues sacando de ella. Si no haces pausas para devolver algo, el cansancio se acumula y termina pasando factura. El descanso no es una recompensa tardía; es el depósito que evita que el sistema se rompa. Para ti, aprender a parar a tiempo vale más que seguir apretando hasta que ya no quede nada.",
   "closing_title": "Lo que sí puedes soltar",
   "closing_body": "Tu mapa no dice que debas hacer menos por obligación; dice que necesitas dejar de revisar la vida como si todo dependiera de una última comprobación. Cuando el trabajo termina, tú no tienes que seguir terminándote a ti. La frase para guardar es esta: no llegas más lejos por no parar, llegas más lejos cuando paras antes de romperte."
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
   "title_line1": "You keep finishing the work,",
   "title_line2": "and then your mind starts it all over again.",
   "subtitle": "Module 3 · Burnout deep report — saju x psych test x counseling integration",
   "opening_scene": "It is late enough that the room has gone quiet, but your phone has not. Monday-morning messages are still lighting up the screen, and each one seems to pull your mind back into checking mode. You tell yourself you are resting, but your hand still reaches for the phone as if the day is not really over. That is what \"I rest but it never feels like resting\" looks like for you, Mia, isn’t it?",
   "case_tag": "Example case — Hana, early 30s, the kind of person who cannot stop checking",
   "case_paragraphs": [
    "Hana finishes her shift, sits down in her car, and still opens the same file she already checked twice. By the time she gets home, her body is tired, but her mind is still asking whether she missed one small detail. Her chart also shows a strong Wood pattern and a weak Water pattern, so the urge to keep holding on and the difficulty letting energy flow out show up in the same day. You can probably see yourself in that loop too."
   ],
   "oheng_intro": "Your Five Elements are led by Wood at 38%, while Water sits low at 13%. In a romance context, that often shows up as holding on tightly to what matters and then struggling to let your feelings move freely once the moment has passed. For you, Mia, that can look like being present with someone and then replaying the whole exchange long after the message is sent.",
   "quiz_reading": "Your 82% Perfectionism and 34% Recovery draw a very clear picture: you do not stop because the task is unfinished, but because the checking part never switches off. That is why finishing something can still feel like standing at the edge of another round of review. In a Finisher's Drain pattern, the work ends, but your nervous system keeps acting like there is one more thing to catch.",
   "element_readings": {
    "wood": {
     "heading": "Wood — the grip that keeps reaching",
     "body": "Your Wood is strong at 38%, so you naturally stay attached to what you are trying to build. In burnout, that can look like one more check, one more edit, one more message before you let yourself breathe. Monday-morning messages hit that part of you fast, because they make the unfinished feeling flare up again. You do not just work hard; you keep holding the thread even after the task should already be down."
    },
    "fire": {
     "heading": "Fire — the short bright burst",
     "body": "Your Fire is low at 13%, so the rush of energy does not stay lit for long. That fits the pattern of cramming and then crashing, where you pour yourself in quickly and then feel the drop all at once. In a romance setting, that can make your warmth show strongly in the moment and then vanish into exhaustion afterward. The pace is not steady, so the flame burns hot before it cools."
    },
    "earth": {
     "heading": "Earth — the place where rest should land",
     "body": "Your Earth is also low at 13%, which makes it harder for rest to feel settled in your body. You can sit down, but your mind keeps standing back up to check one more thing. That is why even a day off can feel a little uneasy, as if your system never fully trusts the pause. For you, rest needs structure before it starts to feel real."
    },
    "metal": {
     "heading": "Metal — the part that keeps measuring",
     "body": "Your Metal sits at 25%, so it has enough presence to keep assessing, sorting, and comparing. As the Day Master, Metal is the core tone that shapes how you handle the world, and in your case it meets a strong Wood pattern that keeps asking for more. In burnout, that can become a private audit of everything you have done. Even after the work is finished, the inner review keeps running."
    },
    "water": {
     "heading": "Water — the stream that needs support",
     "body": "Your Water is weak at 13%, and this is the part that lets your energy, expression, and talent flow out easily. Metal supports Water, so what steadies you is not more force, but the kind of structure that helps your feelings and energy move again. When that support is missing, your effort stays bottled up and comes out only after you are already depleted. That is why recovery feels uneasy instead of soft."
    }
   },
   "upcoming_period_heading": "From age 33 to 42, the water years begin",
   "upcoming_period_body": "From age 33 to 42, Water grows stronger, and that can make recovery feel more available than it does now. The pressure to keep proving yourself does not disappear, but it becomes easier to let energy move instead of trapping it in constant checking. For you, this is a time to build habits that help you stop cleanly, rest without reopening the task, and trust that pausing will not make you fall behind. If you practice that now, the coming cycle can feel less like a crash and more like a smoother current.",
   "cross_analysis_quotes": [
    "Your 38% Wood is the part that keeps gripping, and your 82% Perfectionism is the part that keeps checking. That is why finishing does not feel like release for you. You close the task, but your mind stays with its hand on the handle.",
    "Your weak 13% Water matches the low 34% Recovery in a very precise way. Both point to a system that does not settle quickly after effort. Even a day off can feel uneasy when your inner flow never fully switches into rest."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows that you trust precision more than completion. It tells us that closure matters to you only when the details feel sealed. Mia, that level of care is useful, but it can also keep you standing at the doorway long after the room is done.",
    "Feeling uneasy even when you rest shows that your body has not yet accepted pause as safe. It means rest has to be learned as a state, not just taken as a break. Mia, the first quiet moment may feel strange before it starts to feel normal."
   ],
   "chat_snapshot_note": "You said that you rest, but it never feels like resting, and that sits right next to the tired, a little anxious feeling you named. The work may be done, but your mind keeps checking, so the body never gets the message that the day is over. Mia, the clearest line here is this: when your mind stays on duty, your rest never gets to clock in.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they reopen unfinished energy before your system has fully come down. For a mind with high Perfectionism, even a simple notification can feel like proof that one more look is required. That is not you overreacting; it is your checking reflex getting switched back on at the exact wrong time.",
   "chat_repeat_note": "Cramming, then crashing means you push hard enough to get through, and then the bill arrives all at once. In the middle, you choose momentum over pause because stopping feels risky. A smaller step, taken earlier, would give your system room to breathe before the drop hits.",
   "chat_fear_note": "Your fear that stopping means falling behind is really a fear of losing your place. Underneath it is a wish to stay dependable, visible, and still in the race. Mia, the need is not to stop caring; it is to learn that pause does not erase your progress.",
   "psychology_fact_heading": "Perfectionism and recovery",
   "psychology_fact_body": "In psychology, perfectionism often means setting standards so high that finishing does not feel finished yet. Low recovery means the body and mind do not return to baseline quickly after strain. Together, they create a loop where effort keeps going and rest feels incomplete. That is a very close match to your pattern of re-checking after completion and feeling uneasy even on a day off.",
   "psychology_takeaway": "You are not failing to rest; your system is still treating rest like unfinished business. The work here is not to care less, but to let completion count once.",
   "strengths": [
    {
     "title": "Precision",
     "body": "You catch small details that other people would skip, and your 82% Perfectionism gives that skill real force. In practice, that is the reason you go back and re-check everything instead of letting a loose end sit. Mia, that exacting eye can make your work solid and your promises reliable."
    },
    {
     "title": "Follow-through",
     "body": "You do not leave the task halfway just because you are tired. The pattern of cramming, then crashing still shows a person who gets things finished under pressure. That persistence is part of why people can count on you when something has to be done."
    },
    {
     "title": "Sensitivity to timing",
     "body": "You feel Monday-morning messages as a real shift in your internal state, not as a small inconvenience. That means you notice transitions quickly, even before you can explain them. Mia, that sensitivity can help you build better boundaries once you start trusting what your body tells you."
    },
    {
     "title": "Inner discipline",
     "body": "You keep returning to the task because you care about getting it right, not because you are careless. The same impulse that makes rest uneasy also makes your standards consistent. When guided well, that discipline becomes a steady backbone instead of a constant strain."
    }
   ],
   "weaknesses": [
    {
     "title": "Afterhours checking",
     "body": "Your mind keeps opening the file again even after the work is done, and that keeps your day from ending cleanly. The result is not just fatigue, but a sense that you are never fully off the clock. Mia님, that habit steals recovery one small glance at a time."
    },
    {
     "title": "Uneasy rest",
     "body": "A day off does not automatically feel like rest for you, because the quiet itself can trigger checking. That makes recovery feel like something you have to earn before you can receive it. Mia님, this is less about laziness and more about a system that has forgotten how to downshift."
    },
    {
     "title": "Crash cycle",
     "body": "You push hard, then drop hard, and the swing between those two states can leave you drained. The cycle is visible in the way cramming turns into crashing. Mia님, the strain comes from speed without enough recovery in between."
    },
    {
     "title": "Fear of falling behind",
     "body": "The thought that stopping will make you fall behind keeps urgency alive even when the task is already complete. That fear can make every pause feel expensive. Mia님, it is understandable, but it also keeps your rest from ever feeling safe."
    }
   ],
   "fit_good": "You do best in a setting where deadlines are clear, expectations are written down, and the end point is visible. A workday that ends with a real handoff, not a vague maybe, helps your mind stop circling the same task. Mia님, you need people and systems that let completion mean completion.",
   "fit_bad": "You struggle in places where messages keep arriving after hours and urgency never really ends. A loose environment with shifting priorities can keep your checking reflex awake all night. Mia님, endless availability is the fastest way to turn effort into exhaustion.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "At the end of each work block, write down the one thing you have already verified and stop there. Give yourself a 10-minute buffer before checking messages again so your nervous system can notice the shift. Mia님, practice ending once, not three times."
    },
    {
     "title": "Protect the pause",
     "body": "When you have a day off, keep the first hour screen-light and task-free. Use that hour for something physical and simple, like a walk or a shower, so your body gets the signal before your mind starts reviewing. Mia님, rest works better when it starts before the inbox does."
    },
    {
     "title": "Limit rechecking",
     "body": "Choose one specific time to review work, and do not reopen it outside that window unless there is a real change. Keep the review short and bounded, not open-ended. Mia님, a clear limit is kinder to you than an endless search for certainty."
    },
    {
     "title": "Use a landing ritual",
     "body": "After a heavy day, do the same 3-step routine every time: save, shut down, and leave the desk. Make it short enough that you can actually repeat it on tired days. Mia님, repeated endings help your mind learn that the day is done."
    }
   ],
   "mindset_guide": "Think of your effort like a river, not a dam. A river still moves when it is guided, but it does not need to hold everything in one place. Your recovery gets better when you let the current slow instead of forcing one more surge. Mia님, flow will serve you better than constant pressure.",
   "closing_title": "When the checking can rest",
   "closing_body": "You do not need to become less careful to get better rest. You need a way to let care end without turning into more work. Mia님, the line worth saving is this: completion is allowed to be enough."
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
 "lucia": {
  "content": {
   "title_line1": "Tú sigues revisando cuando todo ya terminó.",
   "title_line2": "Y esa noche nunca se apaga del todo.",
   "subtitle": "Informe profundo de Módulo 3 · Agotamiento — saju × psicología × acompañamiento",
   "opening_scene": "Es de noche y la pantalla sigue encendida, aunque tu cuerpo ya pidió cierre varias veces. Terminas una tarea y, en lugar de soltarla, vuelves al principio para mirar otra vez lo mismo. Luego llega el lunes por la mañana y los mensajes te reactivan esa tensión que parecía dormida. Por fuera parece que descansaste, pero por dentro tu mente sigue trabajando sin permiso. Lucía, ¿no se ve últimamente tu vida así?",
   "case_tag": "CASO DE EJEMPLO — Clara, treintañera, rutina de alta exigencia",
   "case_paragraphs": [
    "Clara deja el último envío sobre la mesa, pero antes de levantarse vuelve a abrirlo para revisar cada detalle desde el inicio. El día le pasa entre correcciones pequeñas y una sensación de alarma que no baja ni cuando se sienta a descansar. Su mapa también muestra una tierra muy fuerte y un metal débil, así que vive con mucha norma encima y con poco margen para apoyarse en alivio. Tú también podrías reconocerte en esa forma de terminar algo sin sentir que de verdad terminó."
   ],
   "oheng_intro": "Tu tierra en 38% domina el mapa, y tu metal en 0% deja una zona sin apoyo visible. En este módulo de agotamiento, eso se nota como una vida que aguanta por estructura, pero que no encuentra con facilidad el respiro que la afloja. La presión pesa, y el alivio tarda en llegar porque la parte que debería sostenerte con suavidad está casi ausente.",
   "quiz_reading": "Tu 82% en perfeccionismo y tu 34% en recuperación dibujan una misma escena: cierras una tarea, pero tu cabeza no acepta el cierre. El tipo Quien termina todo y se agota encaja con esa costumbre de seguir revisando cuando ya no queda nada urgente por hacer. Por eso un descanso libre puede sentirse raro en lugar de reparador, como si la pausa dejara demasiado espacio para pensar.",
   "element_readings": {
    "wood": {
     "heading": "Madera, 13% — impulso que todavía busca espacio",
     "body": "Tu madera está en 13%, así que aparece como movimiento contenido, no como expansión fácil. En agotamiento, eso se siente cuando quieres avanzar, pero antes de dar un paso ya estás calculando qué podría salir mal. No es falta de impulso; es un impulso que se queda vigilando para no desordenar lo que ya sostienes. Por eso incluso el descanso puede parecerte una pausa provisional, no un final limpio."
    },
    "fire": {
     "heading": "Fuego, 25% — chispa que se enciende con rapidez",
     "body": "Tu fuego está en 25%, una fuerza suficiente para activar el cuerpo y la mente en cuanto llega un mensaje o una exigencia. Aquí se ve en esos mensajes del lunes por la mañana que te vuelven a poner en marcha antes de que hayas terminado de bajar el ritmo. No es un fuego que se desborda, pero sí bastante vivo para convertir una señal pequeña en tensión inmediata. En este módulo, esa chispa explica por qué te cuesta quedarte quieta cuando el día todavía pide más."
    },
    "earth": {
     "heading": "Tierra, 38% — peso que sostiene y aprieta",
     "body": "Tu tierra está en 38%, y por eso la estructura manda más que el alivio. Como tu Maestro del Día es agua, esta tierra se vive como presión, reglas y responsabilidad que te empujan a contenerte. En agotamiento, eso se convierte en acumular y luego derrumbarte de golpe, porque aguantas demasiado tiempo antes de soltar. La escena se ve clara: terminas, revisas, sostienes, y solo después notas cuánto te pesó todo."
    },
    "metal": {
     "heading": "Metal, 0% — apoyo que falta y se echa de menos",
     "body": "Tu metal está en 0%, así que el mapa deja muy poco lugar para la pausa que ordena sin apretar. Como este elemento es el que te ayuda a apoyar y a protegerte, su ausencia se nota en que descansar no termina de sentirse como descanso. En vez de dejarte en calma, el día libre te deja inquietud, como si faltara una pieza que afloje la exigencia. Y justamente por eso, cuando aparece un poco de apoyo, lo notas enseguida, porque tu sistema lo necesita de verdad."
    },
    "water": {
     "heading": "Agua, 25% — sensibilidad que sigue alerta",
     "body": "Tu agua está en 25%, y eso da una sensibilidad que no se desconecta fácilmente. Esa parte tuya percibe la tensión antes de que todo explote, pero también se queda pensando cuando ya no hay nada que hacer. En agotamiento, el agua se vuelve la voz interna que sigue revisando aunque el trabajo terminó. Por eso el cansancio y la ansiedad se mezclan tanto en tu experiencia diaria."
    }
   },
   "upcoming_period_heading": "De los 38 a los 47 años, llega un ciclo de diez años con fuego más fuerte",
   "upcoming_period_body": "Cuando llegue ese tramo, tu ritmo puede volverse más visible y más decidido. El fuego fuerte suele empujar a actuar antes, a mostrar más iniciativa y a mover lo que ahora solo sostienes en silencio. Si desde ya aprendes a cerrar de verdad una tarea, ese ciclo te encontrará con menos ruido interno y con más espacio para usar tu energía sin quemarla toda. Lo que prepares hoy será la diferencia entre correr detrás del día y dirigirlo con más claridad.",
   "cross_analysis_quotes": [
    "Tu tierra fuerte no te da descanso; te lo pone en lista de pendientes. Esa es la razón por la que el perfeccionismo sube tanto: cuando todo pesa, revisar parece más seguro que soltar. En tu día a día, eso se ve en cerrar algo y volver a abrirlo desde el principio.",
    "Tu metal en 0% deja sin apoyo la parte que debería aflojar la exigencia. Por eso la recuperación sale baja y el descanso se llena de inquietud. No es que no quieras parar; es que parar te deja sin el sostén interno que calma."
   ],
   "answer_notes": [
    "Volver a revisar desde el principio muestra que no te basta con terminar; necesitas sentir que todo quedó bajo control. En la práctica, eso te lleva a abrir otra vez lo que ya cerraste, incluso cuando el cuerpo pedía soltar. La frase para ti es esta: revisar también puede ser una forma de cansarte más.",
    "Sentir inquietud aun en un día libre muestra que tu descanso todavía no encuentra una forma segura de instalarse. En la vida diaria, eso puede verse como estar quieta por fuera y seguir en alerta por dentro. La frase para ti es esta: descansar no debería sentirse como defenderse."
   ],
   "chat_snapshot_note": "Dices que descansas, pero nunca se siente como descanso, y eso ya muestra que tu cansancio no es solo físico. También aparece un poco de ansiedad, así que tu mente no baja el volumen aunque el cuerpo se siente. Lo que más pesa no es solo el esfuerzo, sino la imposibilidad de sentir cierre. La frase para guardar es esta: no te falta descanso, te falta permiso interno para sentirlo.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque no llegan como simples mensajes, sino como una señal de reanudación inmediata. Tu fuego se enciende y tu tierra vuelve a apretar, así que el cuerpo entra otra vez en modo de respuesta antes de haberse recuperado. Por eso ese momento pequeño tiene tanto efecto en ti. No es el mensaje; es todo lo que tu sistema cree que anuncia.",
   "chat_repeat_note": "Acumular y luego derrumbarte es un ciclo que te deja sosteniendo demasiado durante demasiado tiempo. Mientras acumulas, sigues funcionando; cuando cedes, lo haces de golpe. Una salida pequeña empieza por vaciar una parte antes de que todo llegue al borde.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras habla de una necesidad muy clara de seguir siendo valioso para ti mismo mientras avanzas. Debajo de ese miedo no hay solo presión; hay ganas de no perder el sitio que te costó tanto sostener. Por eso el problema no es descansar, sino sentir que descansar te deja fuera de juego. Lo que de verdad pide esa frase es seguridad, no más velocidad.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "El perfeccionismo describe la tendencia a revisar, corregir y elevar el estándar incluso cuando la tarea ya terminó. La baja recuperación, en cambio, muestra que el descanso no logra cumplir su función reparadora porque la mente sigue activa. En tu caso, ambas cosas se juntan con mucha precisión: terminas algo y luego vuelves a mirarlo desde el inicio, y en un día libre aparece inquietud aunque el cuerpo esté quieto. Esa combinación encaja con una mente que no suelta el control con facilidad.",
   "psychology_takeaway": "Terminar no siempre significa soltar. En ti, el cierre necesita permiso, no más esfuerzo.",
   "strengths": [
    {
     "title": "Constancia fina",
     "body": "Tu 82% en perfeccionismo también muestra una atención muy fina para detectar detalles que otras personas dejarían pasar. Eso te ayuda a entregar trabajos cuidados y a notar rápido lo que todavía no encaja, como cuando vuelves a revisar todo desde el principio. Bien usado, ese nivel de vigilancia se convierte en calidad, no solo en presión."
    },
    {
     "title": "Lectura interna",
     "body": "Tu 34% en recuperación baja no borra tu capacidad de notar lo que te pasa; al contrario, te hace percibir enseguida cuándo algo no descansa de verdad. En un día libre, esa inquietud te avisa de que hay tensión acumulada antes de que se vuelva más grande. Esa sensibilidad puede ayudarte a poner nombre al cansancio con mucha precisión."
    },
    {
     "title": "Resistencia sostenida",
     "body": "Tu tierra en 38% te da una fuerza para aguantar responsabilidades largas sin abandonar a la primera. Eso se ve en tu patrón de acumular antes de derrumbarte, porque durante mucho tiempo logras sostener más de lo que parece. Cuando esa resistencia se acompaña de pausas reales, se vuelve una base muy sólida."
    },
    {
     "title": "Respuesta rápida",
     "body": "Tu fuego en 25% hace que reacciones con rapidez cuando algo te llama, como los mensajes del lunes por la mañana. Esa capacidad de encenderte rápido también te permite ponerte en marcha sin mucha fricción. Bien dirigida, te ayuda a resolver sin quedarte congelado."
    }
   ],
   "weaknesses": [
    {
     "title": "Cierre difícil",
     "body": "Tu costumbre de volver a revisar todo desde el principio muestra que cerrar una tarea no siempre cierra la tensión. Aunque ya terminaste, tu mente vuelve a entrar para buscar una seguridad extra. Eso te deja gastando energía en un final que nunca termina de sentirse final."
    },
    {
     "title": "Descanso tenso",
     "body": "Tu 34% en recuperación baja hace que incluso un día libre pueda sentirse raro, como si faltara algo por hacer. En vez de pausa, aparece inquietud. Esa incomodidad no habla de falta de voluntad, sino de una mente que todavía no confía en parar."
    },
    {
     "title": "Presión acumulada",
     "body": "Tu tierra en 38% sostiene mucho, pero también aprieta mucho. Por eso puedes seguir funcionando mientras acumulas, hasta que de pronto el cuerpo y la mente ceden juntos. Ese salto de aguante a derrumbe es una señal de que el peso llega demasiado alto antes de aflojar."
    },
    {
     "title": "Alerta inmediata",
     "body": "Tu fuego en 25% hace que una señal pequeña se convierta rápido en activación. Los mensajes del lunes por la mañana no solo te informan; te mueven por dentro. Esa velocidad te ayuda a responder, pero también te deja sin transición entre el descanso y la exigencia."
    }
   ],
   "fit_good": "Te va mejor un entorno con tareas claras y cierres visibles, donde no todo dependa de estar disponible todo el tiempo. Un día con bloques definidos te ayuda más que una agenda abierta que te obliga a seguir mirando lo pendiente. También te conviene un espacio donde puedas revisar una sola vez y luego soltar sin sentir culpa.",
   "fit_bad": "Te desgastan los entornos que convierten cada mensaje en una urgencia y cada pausa en una sospecha. Un día sin límites entre trabajo y descanso te empuja a seguir revisando aunque ya no haga falta. También te pesa mucho la cultura de estar siempre listo, porque alimenta justo el miedo a quedarte atrás si paras.",
   "behavior_guides": [
    {
     "title": "Corte breve",
     "body": "Cuando termines una tarea, espera diez minutos antes de volver a abrirla. Usa ese tiempo para guardar el archivo, cerrar la pantalla y moverte de lugar. Si después sigues queriendo revisar, haz solo una pasada y luego deja la tarea cerrada."
    },
    {
     "title": "Pausa visible",
     "body": "En tu día libre, marca una pausa concreta con una acción física simple, como apagar notificaciones durante una hora. Hazlo al menos una vez por la mañana y otra por la tarde. Así tu cuerpo recibe una señal clara de que descansar también cuenta."
    },
    {
     "title": "Límite de lunes",
     "body": "El lunes por la mañana, mira los mensajes solo en un horario fijo y no al abrir los ojos. Dale a tu mente diez minutos para despertar antes de entrar en modo respuesta. Esa pequeña demora baja la sensación de golpe y evita que la tensión te tome primero."
    },
    {
     "title": "Cierre único",
     "body": "Antes de terminar el día, escribe una sola línea con lo que ya quedó hecho. No añadas correcciones ni pendientes nuevos en esa nota. Así tu cabeza tiene un lugar concreto donde dejar el cierre sin volver a abrirlo por la noche."
    }
   ],
   "mindset_guide": "Piensa en tu energía como una batería que se vacía cuando la dejas al final de una revisión infinita. No necesitas exprimirla más; necesitas desconectarla a tiempo. El perfeccionismo te promete seguridad, pero muchas veces solo te deja sin carga. Si aprendes a cerrar una vez, tu recuperación deja de pelear contra el mismo trabajo que ya terminaste.",
   "closing_title": "Cuando el cierre también cuenta",
   "closing_body": "Tu mapa no dice que te falte fuerza; dice que la fuerza se te va en revisar demasiado y descansar demasiado poco. Eso se puede ordenar, paso a paso, sin pelearte con tu manera de ser. La frase para llevarte hoy es esta: cerrar a tiempo también es una forma de cuidarte."
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
 }
};

export const QA_YEAR_REPORT: Record<string, any> = {
 "jordan": {
  "year": 2027,
  "title": "2027: Your steady fire",
  "subtitle": "A year to shape momentum with care, timing, and trust in your own pace",
  "overview": "In 2027, the year’s Fire energy meets your Water core in a way that leans toward control, direction, and results. That can make the year feel active and productive, especially around money, responsibility, and visible progress. For Jordan, this is less about waiting for life to happen and more about noticing where your effort can guide the flow without forcing it.\n\nYour overall pattern is Dew · Order, which suggests a person who tends to work best when things are clear, well-arranged, and emotionally clean. With Earth and Metal both strong in your Five Elements balance, structure and discernment may come naturally, while Water and Fire are present in smaller amounts, so pacing and warmth may need a little more intentional attention. In plain terms, 2027 looks like a year where you can do a lot, but you may feel best when you choose your targets carefully and leave a little room to breathe.\n\nThe quieter notes in the year suggest that not every month needs to become a big push. Some stretches look good for building, some for refining, and some for resting your attention so you can see what matters most. If you treat 2027 as a year of measured momentum rather than nonstop acceleration, you’re likely to find it much more workable.",
  "chapters": {
   "wealth": {
    "heading": "Money moves with intention",
    "body": "Money looks more workable in 2027 when you treat it as something you can organize, direct, and improve rather than chase. Because the year’s Fire energy is something you can guide, this can be a favorable stretch for making decisions, setting prices, clarifying priorities, and noticing where effort turns into concrete results. Your Earth and Metal strengths also support practical thinking, so Jordan, you may feel more comfortable when plans are simple, visible, and easy to check.\n\nIn daily life, this may show up as a month where you want to clean up subscriptions, compare options more carefully, or take on a project that rewards clear ownership. There may also be moments when opportunities feel tempting simply because they are bright or fast, and that can be useful to notice. The year’s tone favors earned gains more than impulsive moves, so a little restraint can keep things feeling clean.\n\nA good starting point is to choose one money area to tidy up early in the year, then revisit it later with fresh eyes. If you keep your system easy to track, you’re more likely to feel in charge rather than pulled around by noise."
   },
   "love": {
    "heading": "Closeness grows through timing",
    "body": "Relationships in 2027 may feel warmer when you let them unfold at a pace that matches your energy. The year can bring moments of attraction, initiative, and visible expression, but it also asks for care around overdoing, overexplaining, or moving too quickly just because the moment feels lively. With your order-loving pattern, you may feel especially settled when affection is clear, consistent, and not full of mixed signals.\n\nYou may notice that some connections feel easiest when there is a shared routine, a steady exchange, or a practical kind of support. Other moments may ask for patience, especially when plans shift or when someone’s pace does not match yours. The middle of the year looks especially active, while the later part of the year may make space for deeper understanding, quieter bonding, or a needed reset in how you relate.\n\nA small but useful practice is to say what you mean a little earlier than usual, while still leaving room for the other person to respond. Simple honesty, paired with good timing, can help the year’s warmer energy feel inviting instead of overwhelming."
   },
   "career": {
    "heading": "Work benefits from direction",
    "body": "Career-wise, 2027 looks like a year where your ability to lead, shape outcomes, and turn effort into visible results can stand out. The Fire tone supports initiative, and because it is something your chart can manage, you may find it easier than usual to set a direction and make progress. That said, the same pattern can also invite excess pressure if you try to carry too much at once, so the best results may come from choosing a few things and doing them well.\n\nIn ordinary workdays, this could look like being the person who clarifies the plan, smooths out confusion, or pushes a project from vague idea into real motion. Around late summer and early autumn, responsibility may feel heavier, but that can also be the part of the year that makes your competence most visible. Later on, support from others may become more noticeable, especially if you’ve already done the groundwork.\n\nA helpful approach is to define success in smaller pieces: one deliverable, one conversation, one clean decision at a time. That way, your momentum stays useful instead of turning into pressure for its own sake."
   },
   "study": {
    "heading": "Learning through practice",
    "body": "Learning in 2027 may work best when it is active, applied, and tied to something you can use right away. Your Dew · Order pattern suggests a mind that likes clean systems, and your strong Metal side may help you sort, compare, and refine ideas with care. The year’s Fire energy can add drive and visibility, so this may be a good time to study in ways that produce something tangible, even if the topic is new.\n\nYou might find yourself drawn to courses, tools, or methods that help you organize information more clearly, present ideas better, or translate knowledge into action. Some months may feel more exploratory, while others feel more structured or demanding, but the overall rhythm supports steady progress rather than dramatic leaps. If you try to learn everything at once, the year may feel noisy; if you study in layers, it may feel surprisingly workable.\n\nA simple next step is to pick one skill that would genuinely support your daily life or work, then give it a fixed slot each week. Repetition with a clear purpose may suit you better than chasing novelty."
   },
   "health": {
    "heading": "Keep the pace breathable",
    "body": "For body and mind care, 2027 points toward rhythm, moderation, and not letting momentum turn into strain. The year’s Fire energy can be energizing, but because it is something you can control, it may also tempt you to keep going after your focus has already started to thin. With Water as your Day Master, your system may feel best when there is enough rest, quiet, and recovery time to keep your inner current smooth.\n\nIn everyday life, this could show up as periods when you feel alert and productive, followed by stretches when you need more stillness than you expected. Rather than reading that as a problem, it may help to treat it as useful information. The year seems to favor a practical rhythm: work hard when the moment is right, then step back before you become scattered.\n\nOne gentle habit to try is building small pauses into your day before you feel depleted. A short walk, a screen break, or a calmer evening routine can help the year’s active tone stay sustainable."
   }
  },
  "months": [
   {
    "headline": "February: easy ignition",
    "body": "This month can feel familiar and comfortable, with little effort needed to get moving. Unexpected turns may appear, though, so it helps to stay open rather than overly fixed on one plan."
   },
   {
    "headline": "March: first sparks",
    "body": "The energy here still feels close to your own rhythm, but a bit more friction may enter daily life. Small disagreements or timing snags can be useful if they help you clarify what really matters."
   },
   {
    "headline": "April: words in motion",
    "body": "This is a month for expression, output, and giving more of yourself to what you care about. Because that can take energy, it may feel best to choose where your effort goes instead of scattering it."
   },
   {
    "headline": "May: something takes shape",
    "body": "This month favors beginnings that are still forming under the surface. You may feel the urge to try something fresh, and a new setting or first attempt can be especially encouraging if you keep it light."
   },
   {
    "headline": "June: take the lead",
    "body": "The flow becomes more supportive of ownership, results, and practical wins. A bit of magnetism is in the air, so it can be a good time to present your ideas clearly, while still keeping your ambition measured."
   },
   {
    "headline": "July: keep it contained",
    "body": "This month looks quieter and more inward, even while the year’s productive tone remains present. Waiting, pausing, and holding your cards a little closer may work better than pushing for visible movement."
   },
   {
    "headline": "August: careful adjustments",
    "body": "Responsibility may rise here, and the pace can feel more demanding than before. One part of life may also echo an important personal tie, so listening carefully before reacting can save you from reading the room too fast."
   },
   {
    "headline": "September: steady pressure",
    "body": "This month asks for composure under pressure and clear boundaries around your time. Authority or expectations may feel stronger, but you’re likely to do best when you choose a steady pace instead of rushing to answer everything at once."
   },
   {
    "headline": "October: help arrives",
    "body": "Support, learning, and recovery feel easier to access now. Progress can come through advice, useful contacts, or simply a calmer mind, and that can make the month feel more breathable than the ones before it."
   },
   {
    "headline": "November: a turn in the road",
    "body": "This month may bring movement, change, or a sudden need to adjust your direction. Because there is also a stronger push from the outside, it helps to stay flexible and treat surprise as a cue to reorient, not panic."
   },
   {
    "headline": "December: familiar ground",
    "body": "The tone settles back into what feels known and manageable. Small interruptions may appear, but they are more likely to call for patience than drama, and your inner life may feel especially active underneath the surface."
   },
   {
    "headline": "January: quiet momentum",
    "body": "The year closes with a sense of continuity rather than sharp change. You may feel more inward, reflective, and ready to keep building from what you already understand, which can make this a good time for private planning."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: set the frame",
    "body": "Watch for early signs of momentum that feel easy but slightly uneven, especially in plans, communication, and first attempts. Try one concrete organizing move, such as simplifying a schedule, clarifying a budget category, or defining the next step on a project."
   },
   {
    "title": "May to July: choose your fire",
    "body": "Notice where your energy wants to expand and where it starts to thin out. Put your effort into one visible goal, and give yourself permission to pause on anything that looks bright but would ask for too much at once."
   },
   {
    "title": "August to October: steady the pace",
    "body": "Track the places where responsibility grows and where support starts to appear again. A useful action here is to ask one clear question, request feedback, or revise a process so the pressure feels more manageable."
   },
   {
    "title": "November to January: reset and store",
    "body": "Look for shifts, movement, and quieter inner processing as the year winds down. Use this stretch to review what worked, keep what feels solid, and carry one or two refined habits into the next cycle."
   }
  ],
  "closing": "2027 does not need to be loud to be meaningful. If you let the year’s Fire energy work as a tool rather than a demand, you can shape real progress while still protecting your pace. Jordan, the clearest wins here may come from calm focus, timely action, and knowing when enough is enough."
 },
 "riley": {
  "year": 2027,
  "title": "2027: A Year of Steady Fire",
  "subtitle": "Riley, a year of giving shape to your own energy and learning when to pace it",
  "overview": "2027 feels like a year where your own energy is asked to do more than simply stay rooted. As a Wood Day Master, you naturally grow, support, and extend; with Wood strong in your chart and Fire absent, Fire years can feel like a call to express, produce, and share more openly. For an Oak-type, Rooted chart, that often brings a sense of purpose, but it can also make the year feel busier than it looks on the surface.\n\nThe good news is that 2027 doesn’t read like a year of random pressure. It looks more like a cycle with clear phases: early months that bring support and replenishment, middle months that ask you to create and deliver, and later months that push you toward responsibility, structure, and quieter confidence. Riley, if you treat this as a year for rhythm rather than speed, you may find it easier to keep your energy useful instead of scattered.\n\nBecause your chart has a strong Wood base and some Earth and Water support, you may do best when you give your efforts a real shape: one project at a time, one promise at a time, one clear finish line at a time. The year’s broader tone suggests progress through steady output, not through forcing every door open. That can make 2027 a surprisingly practical year for turning inner strength into visible results.",
  "chapters": {
   "wealth": {
    "heading": "Money through momentum",
    "body": "In 2027, money and material matters look closely tied to how actively you direct your energy. Because the year encourages expression and production, your best results may come from turning effort into something tangible: a service, a finished project, a clear deliverable, or a practical skill that others can recognize. Since your chart is rooted and Wood-heavy, it may be easier to grow value gradually than to chase quick gains.\n\nIn daily life, this can show up as a stronger pull to organize your spending, price your time more clearly, or notice which efforts quietly drain you without returning much in kind. The middle of the year especially may feel like a place where momentum matters, but overextension can blur judgment. You may find that careful tracking, simple budgets, and saying yes only to what has a clear purpose feel more supportive than trying to do everything at once.\n\nA good starting move is to choose one money habit to make visible in 2027: a weekly review, a small savings rule, or a cleaner way to separate necessary costs from impulse spending. If you keep the system simple, your energy is more likely to stay productive instead of leaking away through scattered effort."
   },
   "love": {
    "heading": "Connection that needs breathing room",
    "body": "Relationships in 2027 may feel warm, active, and a little more demanding of your time. The year’s Fire tone can make you more expressive and more visible, which can be lovely for closeness, but it can also mean that people notice your energy more directly. For you, that may bring a chance to be more open about what you want and what you can realistically offer.\n\nIn everyday moments, this could look like more invitations, more messaging, or more situations where your presence seems to matter. Early in the year, support may feel easy to receive; later, you may notice that the people around you respond well when you are clear rather than overextended. If a connection feels especially active around the months that bring movement and change, it may help to keep plans simple and expectations spoken aloud.\n\nA useful place to begin is with honest pacing: reply when you can, show up where you truly want to be, and don’t feel you need to fill every silence. Warmth lands best in 2027 when it has room to breathe, and that can make your connections feel more genuine rather than more crowded."
   },
   "career": {
    "heading": "Work that asks for structure",
    "body": "Career-wise, 2027 looks like a year where your output can become more visible. The Fire energy supports expression, leadership, and making things happen, while your strong Wood nature helps you keep growing into responsibility. That combination can be excellent for taking initiative, but it also means you may need to define your limits carefully so that your effort stays sustainable.\n\nIn real life, this may show up as more chances to present, organize, guide, or take charge of something that has been waiting for shape. Some months may feel especially active, with movement, change, or a shift in direction that asks you to adapt quickly. Later in the year, the tone turns more serious and focused, which can support work that needs patience, reliability, and a calm hand.\n\nA smart first step is to identify one responsibility you want to do well in 2027 and then build a simple system around it: a checklist, a weekly review, or a clearer boundary around your time. The year favors steady excellence more than dramatic leaps, so progress may come from consistency you can actually keep."
   },
   "study": {
    "heading": "Learning that becomes usable",
    "body": "Study and learning in 2027 may work best when they connect directly to something you can apply. The early months look especially supportive for receiving help, guidance, and fresh input, so this is a good time to absorb, ask questions, and let someone else’s experience make your own path clearer. With Water and Earth both present in your chart, you may learn well when knowledge feels grounded and practical.\n\nYou might notice that you retain more when the material has a direct use: a tool, a method, a language habit, a workflow, or a skill you can practice right away. Midyear may bring more outward energy and less patience for endless theory, so short learning cycles may suit you better than long, abstract ones. The later part of the year may ask for more discipline, which can actually help you consolidate what you’ve picked up.\n\nA good experiment is to keep your learning small and concrete: one course, one book, one skill, one note-taking method. If you let knowledge turn into action quickly, 2027 can feel less like scattered input and more like real growth."
   },
   "health": {
    "heading": "Keeping your rhythm gentle",
    "body": "For your body and mind, 2027 suggests paying attention to rhythm, not just output. Because the year asks Wood to generate more Fire, you may feel more active, more mentally on, and more likely to spend energy quickly if you don’t create pauses on purpose. That doesn’t point to anything dramatic; it simply suggests that your system may prefer regular restoration over long stretches of pushing.\n\nIn daily life, this can look like feeling best when your days have a clear beginning, middle, and end. On busier weeks, you may notice that your focus improves when you build in quiet transitions: a walk after work, a slower morning, a screen break, or a small ritual that tells your mind it can unclench. The later months may ask more from your sense of duty, so recovery habits become especially helpful then.\n\nA simple starting point is to protect one repeatable reset in your week, even if it is short. For a rooted Oak type like you, small routines often work better than dramatic changes, and they can keep your energy steady enough to enjoy the year instead of merely managing it."
   }
  },
  "months": [
   {
    "headline": "February: the first lift",
    "body": "This month looks like a helpful opening, with support, learning, and recovery flowing toward you. The feeling may be more about being filled up than about proving anything. If you take in guidance now, the rest of the year may feel easier to navigate."
   },
   {
    "headline": "March: magnetic help",
    "body": "March can bring a stronger sense of ease, as if the right people or information are easier to attract. You may find that your presence feels more noticeable without you having to push for it. This is a good time to ask, listen, and let useful support come closer."
   },
   {
    "headline": "April: familiar ground",
    "body": "April may feel comfortable, steady, and a little less surprising. The pace is likely to be gentler, which can be useful for settling into routines. If you want novelty, you may need to create it yourself rather than wait for it to appear."
   },
   {
    "headline": "May: read carefully",
    "body": "May keeps a familiar tone, but it may also bring moments that are easy to misread. Small assumptions could cause more trouble than the situation itself, so it helps to slow down before reacting. Clear questions may save you time later."
   },
   {
    "headline": "June: time to direct",
    "body": "June shifts into a more active, expressive rhythm, and your effort may start to carry visible weight. This is a good month for leading, producing, and making decisions with confidence. Just remember that strong output works best when you leave room to recover afterward."
   },
   {
    "headline": "July: visible progress",
    "body": "July can feel like a month of quiet consolidation, where what you’ve been building begins to settle into place. Progress may not be loud, but it can be meaningful. If you keep showing up, others may notice your consistency more than your speed."
   },
   {
    "headline": "August: shift in motion",
    "body": "August brings movement and a stronger push toward action, with a sense that something wants to change direction. It may be easier to take charge of money or outcomes, but a clash-like tension in the month can make things feel more restless. Flexibility will likely serve you better than forcing a single plan."
   },
   {
    "headline": "September: push with care",
    "body": "September still supports initiative, ambition, and practical results, but the atmosphere is a little more delicate. Small delays or small snags may appear, so it helps to keep your expectations clean and your timing realistic. You may do especially well if you focus on what can be finished neatly."
   },
   {
    "headline": "October: steady pressure",
    "body": "October brings a more serious tone, with responsibility and pressure asking for patience. The work may feel quieter on the outside but more demanding on the inside. If you choose your pace carefully, the month can make you stronger rather than simply busier."
   },
   {
    "headline": "November: a new opening",
    "body": "November can feel like something is beginning to form, even if it is still small or uncertain. There may be an unexpected turn, and because the month is more likely to bring people or matters together, support can arrive through connection. Stay open to what comes in from the side rather than only from the front."
   },
   {
    "headline": "December: support returns",
    "body": "December looks like a return of help, learning, and recovery after the heavier stretch before it. Even if friction shows up, it may be easier to sort things out once you slow the pace. This is a good month for restoring your inner balance and simplifying what you carry."
   },
   {
    "headline": "January: quiet momentum",
    "body": "January can bring fresh movement, but it may arrive in an unpredictable way. That makes flexibility more useful than rigid expectations. If you stay curious and keep your plans light, you may be able to turn surprise into useful momentum."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive and sort",
    "body": "Watch for help, learning, and easier access to useful people or ideas. Try one simple practice of sorting what you hear into three groups: useful now, useful later, and not for you."
   },
   {
    "title": "May to July: create with limits",
    "body": "Notice where your energy starts turning into output, and where it begins to leak. Pick one project to finish cleanly, and protect one recovery block after each active stretch."
   },
   {
    "title": "August to October: steer with care",
    "body": "Expect stronger movement, more pressure, and a greater need to make clear choices. Use a short pause before major decisions, and write down the one outcome you actually want before you act."
   },
   {
    "title": "November to January: consolidate gently",
    "body": "Look for moments when support returns or a new opening starts to form. Build one quiet review habit, so you can keep what worked and release what no longer fits."
   }
  ],
  "closing": "Riley, 2027 looks like a year that rewards your ability to grow without losing your shape. The more you treat your energy as something to guide rather than spend carelessly, the more the year may feel workable and even quietly rewarding. If you move with patience, your rooted strength can become a real advantage."
 },
 "sam": {
  "year": 2027,
  "title": "2027: A steadier rhythm",
  "subtitle": "A year of support, practice, and well-timed effort for Sam",
  "overview": "2027 feels like a year that tends to fill you back up. For Sam, the Fire of 2027 meets an Earth Day Master in a way that brings in support, learning, and recovery rather than pressure alone. Because your Five Elements are spread quite evenly, this year may feel less like a dramatic overhaul and more like a series of useful adjustments that help you work with what is already there.\n\nYour Mountain · Order type points to a style that likes structure, reliability, and a clear sense of direction. In 2027, that preference can be a strength: when the pace picks up, simple routines and clean priorities may help you keep your footing. The year also has a wildcard feeling, so a little flexibility will likely go a long way. Sam, this is a good year for noticing what restores you, what wastes your energy, and where steady effort brings the most return.\n\nThe rhythm of 2027 seems to move in waves: early months invite initiative, midyear asks for adjustment, late summer settles into familiarity, and the final months bring another push. Rather than trying to force everything at once, you may find it easier to work in seasons, letting each stretch of the year do a different kind of job for you.",
  "chapters": {
   "wealth": {
    "heading": "Money likes clear moves",
    "body": "In 2027, money matters may respond well to your ability to take the lead. The year’s Fire energy can support action, making it a good time to organize, decide, and move with purpose rather than hesitate too long. Because your chart already carries a balanced mix, the strongest gains may come not from chasing more, but from using what you know with a little more confidence.\n\nYou may notice moments where a practical choice feels especially satisfying: setting a budget, tightening a plan, or turning an idea into something concrete. Early in the year, it may be easier to push for results; midyear may ask you to be more careful about pace and expectations. That shift can help you avoid overdoing a good thing.\n\nA useful starting point is to make one simple money system easier to follow. You could track one category more closely, review a recurring expense, or decide in advance what counts as “enough” for a project. Small structure may help your efforts feel cleaner and more rewarding."
   },
   "love": {
    "heading": "Connection with more warmth",
    "body": "Relationships in 2027 may feel more vivid, more active, and sometimes a little less predictable. The year’s Fire can add warmth, honesty, and momentum, which may help conversations feel more alive. At the same time, your Mountain · Order style may prefer consistency, so you may do best when closeness is paired with clear boundaries and dependable habits.\n\nIn everyday life, this could show up as more invitations, more direct messages, or a stronger desire to say what you mean. Some months may feel easy and familiar, while others may bring sudden turns that ask for patience. Around midyear especially, a shift in tone or schedule may invite you to respond with calm instead of trying to control the pace.\n\nA gentle way to work with this is to keep one or two relationship rituals steady. A regular check-in, a shared meal, or a simple message of appreciation can do a lot. Let connection have room to breathe, and you may find that warmth grows more naturally than if you try to manage every detail."
   },
   "career": {
    "heading": "Steady effort, visible shape",
    "body": "Career-wise, 2027 looks like a year where effort can become visible. Early months may favor initiative, ownership, and practical results, while spring may bring more responsibility and the need to pace yourself wisely. Because the year’s Fire supports your Earth Day Master, work may feel more productive when you focus on building something solid rather than proving everything at once.\n\nYou might run into situations where others look to you for direction, or where your reliability becomes the reason a project holds together. That can feel rewarding, but it may also ask for discernment about what is truly yours to carry. Later in the year, especially when the energy softens, it may be easier to refine, polish, and finish rather than start from scratch.\n\nA good first step is to define the next practical milestone in plain language. If you can name what “done” looks like for one task, one proposal, or one work habit, you may feel less scattered. Your natural orderliness can turn into a real advantage when you give it a clear target."
   },
   "study": {
    "heading": "Learning that lands",
    "body": "Learning in 2027 may feel especially useful when it connects to real life. The year seems to support receiving, absorbing, and recovering, so study may work best when it is not forced, but integrated into your daily rhythm. With your balanced Five Elements, you may be able to learn across several styles, yet the strongest results may come from practical, grounded repetition.\n\nYou might find that a book, course, or conversation stays with you longer when it helps you solve an actual problem or see a familiar situation differently. Early-year momentum can help you begin, while midyear pressure may make you more selective about what deserves your attention. Later, quieter months may be ideal for review and consolidation.\n\nTry choosing one topic to deepen rather than scattering your energy across many. A short note system, a weekly review, or a small practice you repeat on purpose can make learning feel less abstract. In 2027, retention may improve when you give knowledge a place to live."
   },
   "health": {
    "heading": "Protect your rhythm",
    "body": "For body and mind care, 2027 suggests that rhythm matters more than force. The year can give you support and recovery, but it may also bring stretches of heightened activity, so your energy may feel best when you move between effort and rest deliberately. As an Earth Day Master with a Mountain · Order type, you may do well with routines that are simple, stable, and easy to return to after busy days.\n\nIn daily life, this might look like feeling most settled when your sleep, meals, and work breaks have a recognizable pattern. Midyear could feel more intense or more changeable, so it may help to keep your schedule a little cleaner and your commitments a little more realistic. When the pace softens later, you may notice that restoration comes more easily if you haven’t been stretching yourself too thin.\n\nA practical place to begin is with one anchor habit that supports the rest of your day. A short walk, a fixed wind-down time, or a calmer first hour in the morning can make a surprising difference. The goal is not perfection; it is a rhythm your system can trust."
   }
  },
  "months": [
   {
    "headline": "A bold start",
    "body": "February may bring a strong sense of initiative, as if you’re ready to take the lead and make things happen. With a fresh, beginning-like quality, it can be a good time to launch, pitch, or move a plan forward. Just keep an eye on overcommitting before the shape of the month settles."
   },
   {
    "headline": "Refining the push",
    "body": "March can carry the same forward drive, but with a slightly more delicate rhythm that asks for adjustment. Small bumps may show up as timing issues or mixed signals, so a little extra checking can save you effort later. If you stay flexible, the month may teach you how to push without forcing."
   },
   {
    "headline": "Pressure with depth",
    "body": "April may feel more demanding, with responsibilities or expectations asking for your attention. The pace can be useful if you choose it carefully, and the quieter inner tone of the month may help you work more thoughtfully. This is a good time to trust depth over speed."
   },
   {
    "headline": "Expect the curve",
    "body": "May brings momentum, but it may also come with turns you don’t see coming at first. You may need to adapt plans on the fly or respond to a change in direction without taking it personally. A steady response is likely to serve you better than a perfect one."
   },
   {
    "headline": "A turning point",
    "body": "June has a fuller, more intense quality, and the friction in the month may come from a clear pivot or a clash of schedules. This can still be productive if you let it redirect you instead of resisting every shift. A change in the setup may open a better route than the one you first expected."
   },
   {
    "headline": "Support returns",
    "body": "July feels like a softer landing, with help, learning, and recovery more available again. The wildcard tone may bring surprises, but not necessarily unwelcome ones; they may simply keep the month lively. If you stay open, useful guidance can show up in unexpected forms."
   },
   {
    "headline": "Easy familiarity",
    "body": "August may feel more settled and familiar, like slipping into a rhythm you already know. Fresh stimulation may be lighter, which can make the month feel calm but less dramatic. It’s a good time to enjoy what works without demanding too much novelty from it."
   },
   {
    "headline": "Tidy and magnetized",
    "body": "September has a quiet, organizing quality that can help you clean up loose ends. At the same time, there may be a subtle pull toward people, ideas, or situations that feel especially engaging. If you choose carefully, you can use this month to simplify and attract at once."
   },
   {
    "headline": "Make room to give",
    "body": "October may bring a stronger need to express, produce, or share what you’ve been building. That can feel satisfying, though it may also ask for more energy than you expect. A patient approach helps the month become generous rather than draining."
   },
   {
    "headline": "Wait and clarify",
    "body": "November can feel like a reset, with mixed signals or moments of misunderstanding asking you to slow down and re-read the situation. It’s a good month for checking details and making sure everyone is talking about the same thing. Clarity may come more easily after the first pass."
   },
   {
    "headline": "Leadership returns",
    "body": "December brings back a more directive feeling, with a chance to shape outcomes and move toward results. The month may support clear decisions and practical progress, as long as you avoid trying to do everything at once. A focused choice can carry more weight than a crowded plan."
   },
   {
    "headline": "Quiet growth",
    "body": "January may feel like a period of incubation, where plans are forming beneath the surface and progress is building in a quieter way. Because the energy also points toward advancement, small but meaningful steps can start to connect into something larger. It’s a good month to prepare the ground and let momentum gather naturally."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: choose the target",
    "body": "Watch for the early-year push to take charge, then the spring shift into more pressure and depth. Pick one project, one money habit, or one work goal that benefits from clear direction, and give it a simple structure you can actually keep."
   },
   {
    "title": "May to July: adapt without losing shape",
    "body": "Notice where sudden turns or friction ask you to change course, especially around June and July. Keep one backup option ready, and practice responding with a short pause before deciding; that small gap may help you stay composed and effective."
   },
   {
    "title": "August to October: simplify and express",
    "body": "Track where the pace becomes familiar, then where your energy wants to produce, share, or give more. Use the calmer stretch to tidy your systems, and then choose one place where you can put your effort into something visible and useful."
   },
   {
    "title": "November to January: clarify and prepare",
    "body": "Look for mixed signals in November, then a more directive, forward-moving tone in December and January. Double-check assumptions, then spend this period preparing the next step rather than rushing it; a clean setup will likely matter more than a fast start."
   }
  ],
  "closing": "Sam, 2027 looks like a year that rewards clear rhythm, practical courage, and a willingness to let support in. You don’t need to force every outcome; in fact, the year seems to work better when you let some things ripen while you keep your own structure steady. If you treat the year as a series of well-timed adjustments, it may feel both calmer and more fruitful."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027년, 지수님의 흐름을 읽는 해",
  "subtitle": "채우고, 펼치고, 다시 다듬는 리듬",
  "overview": "2027년은 지수님에게 에너지가 바깥으로 많이 흘러나가기 쉬운 해예요. 중심 기운은 나무인데, 2027년의 불 기운은 그 나무를 태워 밝히는 쪽으로 작동해서, 표현·생산·베풂이 늘어나기 좋은 대신 체감상 소모도 커질 수 있어요. 지수님의 구조는 토의 비중이 높은 편이라, 바쁘게 움직이더라도 결국은 “무엇을 남길 것인가”를 정리해 주는 힘이 함께 필요해 보입니다.\n\n그래서 2027년은 한 번에 크게 밀어붙이기보다, 채워지는 구간과 쓰이는 구간을 번갈아 읽는 것이 편해요. 초반에는 도움과 회복이 들어오고, 중반에는 익숙함 속에서 속도를 조정하게 되며, 여름부터 가을로 갈수록 성과와 책임을 함께 다루는 흐름이 두드러져요. 지수님에게는 거목·성취라는 유형답게, 급한 결과보다 오래 남는 구조를 만드는 선택이 더 잘 맞는 한 해로 보입니다.",
  "chapters": {
   "wealth": {
    "heading": "성과를 고르는 돈의 흐름",
    "body": "재물 쪽은 2027년에 “내가 직접 움직여서 결과를 만드는 힘”이 살아나기 쉬워 보여요. 특히 8~9월경에는 성과나 주도권을 손에 쥐고 싶어지는 흐름이 강해져서, 돈을 쓰는 방식도 벌이는 방식도 더 적극적으로 보일 수 있습니다. 다만 지수님은 원래 토의 비중이 높아 안정감에 끌리기 쉬운데, 여기에 2027년의 불 기운이 더해지면 마음이 앞서기보다 계획이 앞서야 편해요.\n\n일상에서는 “이건 꼭 해보고 싶다”는 마음이 강해져서 지출이나 선택이 빨라지는 장면이 있을 수 있어요. 예를 들면 마음에 드는 물건, 프로젝트, 서비스에 바로 손이 가거나, 성과가 보이는 쪽으로 에너지가 쏠리기 쉬워요. 이때는 큰 결정을 서두르기보다, 한 번 더 비교하고 남는 가치를 따져보면 흐름을 잘 살릴 수 있습니다.\n\n작게 시작하려면, 2027년에는 지출과 수입을 같은 기준으로 적어 두는 습관이 도움이 돼요. 특히 8~10월경에는 “지금 필요한가, 오래 쓰일까” 두 가지 질문만 붙여도 과한 흐름을 부드럽게 조절하기 좋아요. 지수님처럼 성취 지향이 있는 분에게는, 돈을 모으는 것보다 돈의 방향을 정리하는 일이 더 큰 힘이 될 수 있어요."
   },
   "love": {
    "heading": "가까움이 깊어지는 관계",
    "body": "관계와 연애 쪽은 2027년에 말과 마음이 바깥으로 잘 드러나는 편이에요. 특히 2~3월경에는 도움을 주고받거나 자연스럽게 가까워지는 장면이 들어오기 쉬워서, 처음엔 가벼운 대화라도 금세 정이 붙는 흐름이 보입니다. 다만 지수님은 중심이 단단한 편이라, 편해지면 편해질수록 표현이 적어질 수 있으니 마음이 있다면 작은 반응을 자주 보내는 쪽이 좋아요.\n\n일상에서는 누군가와 일정이 겹치거나, 우연히 함께 움직이면서 관계가 부드럽게 이어지는 장면이 보일 수 있어요. 3월경에는 어울려 붙는 힘이 살아나서 대화의 리듬이 잘 맞을 수 있지만, 4월경에는 서로의 방향이 살짝 부딪혀 조율이 필요해 보입니다. 그럴 때는 “누가 맞다”보다 “어떻게 맞춰 갈까”로 질문을 바꾸면 훨씬 편해요.\n\n작게 시작하려면, 2027년에는 중요한 사람에게 한 달에 한 번이라도 먼저 안부를 건네 보세요. 거창한 말보다 짧은 확인이 관계를 오래 가게 만들 가능성이 커요. 지수님에게는 깊이보다 꾸준함이 더 큰 매력으로 작동할 수 있습니다."
   },
   "career": {
    "heading": "밀어붙이되 조율하는 일",
    "body": "일과 커리어에서는 2027년에 “내가 만들어 내는 결과”가 또렷해지기 쉬워요. 6~7월경에는 표현과 생산이 늘어나는 흐름이 강해서, 아이디어를 내거나 맡은 일을 밖으로 드러내는 데 힘이 실릴 수 있습니다. 다만 에너지가 많이 빠져나가는 구조이기도 해서, 많이 하는 만큼 정리와 회복이 따라와야 오래 갑니다.\n\n일상에서는 갑자기 업무가 몰리거나, 누군가의 기대를 받아서 손이 빨라지는 장면이 있을 수 있어요. 10~11월경에는 책임감과 압박이 함께 커질 수 있으니, 속도를 조금만 낮추고 우선순위를 선명하게 잡는 편이 좋아요. 지수님의 거목·성취 기운은 무작정 버티는 것보다, 어디에 힘을 쓸지 정하는 순간 더 빛나기 쉬워요.\n\n작게 시작하려면, 2027년에는 업무를 “지금 당장”, “이번 주”, “나중에” 세 칸으로 나눠 보는 습관이 유용해요. 특히 바쁜 시기에는 모든 일을 같은 무게로 들지 않는 것이 중요합니다. 6~11월 사이에는 보여 주는 일과 지키는 일을 분리해 두면 흐름이 훨씬 안정적일 거예요."
   },
   "study": {
    "heading": "배움이 들어오고 쌓이는 해",
    "body": "배움 쪽은 2027년에 초반과 후반이 특히 좋아 보여요. 2월경과 12월경에는 도움, 회복, 배움이 들어오는 기운이 살아나서, 새로 배우는 내용이 몸에 잘 붙거나 다시 정리한 지식이 선명해질 수 있습니다. 지수님은 중심이 나무라서 원래도 자라나는 힘이 있는데, 이 해에는 그 성장을 말로 풀고 형태로 남기는 연습이 중요해요.\n\n일상에서는 강의를 듣거나 자료를 모아 두는 것보다, 이해한 내용을 내 방식으로 다시 적는 순간이 더 크게 남을 수 있어요. 3월경에는 집중력이 살아나고, 10월경에는 책임감이 늘면서 공부를 단단히 붙잡아 주는 느낌이 들어요. 반대로 4~5월경에는 익숙한 방식에 머무르기 쉬우니, 같은 내용을 다른 방식으로 설명해 보는 연습이 자극이 됩니다.\n\n작게 시작하려면, 2027년에는 배우는 것과 기록하는 것을 한 세트로 두세요. 읽은 뒤 한 줄 요약, 들은 뒤 세 문장 정리처럼 아주 작게 남기는 방식이 잘 맞아요. 지수님에게는 많이 아는 것보다, 아는 것을 구조로 묶는 일이 더 큰 성취로 이어질 가능성이 큽니다."
   },
   "health": {
    "heading": "리듬을 지키는 돌봄",
    "body": "몸과 마음의 리듬은 2027년에 “쏟고, 쉬고, 다시 채우는” 순서가 중요해 보여요. 화 기운이 나무를 밀어 올리는 해라서, 의욕이 올라갈수록 생활 속 속도도 빨라지기 쉬운데, 지수님은 원래 토가 많은 편이라 규칙이 생기면 훨씬 편안해질 수 있습니다. 무리한 경고보다, 일정한 휴식과 식사, 정리된 루틴이 힘을 오래 유지하게 도와줄 거예요.\n\n일상에서는 바쁘게 움직인 뒤에 한 번에 지치기보다, 중간중간 집중이 흩어지거나 마음이 건조해지는 식으로 피로가 나타날 수 있어요. 6~9월경에는 활동량이 많아질 수 있으니, 약속과 일정을 빽빽하게 채우기보다 여백을 남기는 편이 좋아요. 12월경과 2028년 1월경에는 회복과 재정비의 감각이 돌아오기 쉬우니, 이때는 속도를 줄이는 것이 오히려 생산적일 수 있습니다.\n\n작게 시작하려면, 2027년에는 하루에 한 번 “멈춤 시간”을 정해 보세요. 10분 산책, 물 마시기, 책상 정리처럼 단순한 행동이면 충분합니다. 지수님에게는 거창한 관리보다 반복 가능한 작은 규칙이 몸과 마음을 가장 안정적으로 받쳐 줄 가능성이 커요."
   }
  },
  "months": [
   {
    "headline": "들어오는 힘",
    "body": "2월경에는 도움과 회복이 자연스럽게 들어오기 쉬워요. 새로 시작하는 일도 혼자 끌고 가기보다 주변의 손길을 받으면 한결 편할 수 있습니다."
   },
   {
    "headline": "붙는 대화",
    "body": "3월경에는 사람과 사람의 흐름이 잘 이어지기 좋아요. 말이 잘 통하고, 가까운 관계에서는 함께 움직일 이유가 생기기 쉽습니다."
   },
   {
    "headline": "부딪혀 조정",
    "body": "4월경에는 익숙한 흐름 속에 작은 충돌이 섞일 수 있어요. 방향을 한 번 더 맞춰 보면 오히려 관계나 일정이 또렷해질 수 있습니다."
   },
   {
    "headline": "익숙한 안정",
    "body": "5월경에는 편안함이 먼저 느껴지기 쉬워요. 다만 자극이 적을 수 있으니, 새로운 시도는 아주 작게 넣는 쪽이 좋습니다."
   },
   {
    "headline": "표현이 커짐",
    "body": "6월경에는 말, 결과, 생산이 바깥으로 드러나기 좋아요. 손이 많이 가는 만큼, 한 번에 많은 일을 벌이기보다 순서를 세우면 더 편합니다."
   },
   {
    "headline": "반짝이는 명함",
    "body": "7월경에는 사람들 앞에서 보여 주는 힘이 살아날 수 있어요. 인정받고 싶은 마음이 커지더라도, 속도를 일정하게 유지하면 흐름이 길게 갑니다."
   },
   {
    "headline": "주도권 잡기",
    "body": "8월경에는 성과를 밀어붙이기 좋은 기운이 들어와요. 선택이 빨라질 수 있으니, 중요한 건 한 번 더 비교한 뒤 움직이는 편이 좋습니다."
   },
   {
    "headline": "이동과 선택",
    "body": "9월경에는 방향을 바꾸거나 새 판을 보고 싶어질 수 있어요. 마음이 급해질수록 이동 전 체크를 꼼꼼히 하면 훨씬 부드럽게 흘러갑니다."
   },
   {
    "headline": "책임의 무게",
    "body": "10월경에는 해야 할 일이 선명해지고, 스스로 기준을 높이고 싶어질 수 있어요. 속도를 조금 낮추면 오히려 결과가 더 단단해집니다."
   },
   {
    "headline": "깊어지는 압박",
    "body": "11월경에는 맡은 몫이 커지기 쉬워요. 혼자 다 안고 가기보다 할 일의 경계를 나눠 두면 마음이 한결 가벼워집니다."
   },
   {
    "headline": "회복이 들어옴",
    "body": "12월경에는 배움과 회복의 흐름이 다시 살아나요. 정리하지 못했던 것을 다시 펼쳐 보면 생각보다 쉽게 이어질 수 있습니다."
   },
   {
    "headline": "새해 준비",
    "body": "2028년 1월경에는 한 해를 준비하는 힘이 또렷해질 수 있어요. 무리한 확장보다, 다듬고 채우는 데 집중하면 좋습니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 도움을 받는 법 익히기",
    "body": "이 구간에는 사람의 손길과 흐름이 잘 들어오는지 지켜보세요. 먼저 도움을 청하거나, 받은 도움을 짧게 기록해 두는 행동이 관계와 일의 맥을 살려 줍니다."
   },
   {
    "title": "5~7월경: 표현의 양 조절하기",
    "body": "일과 관계에서 나가는 에너지가 커질 수 있으니, 무엇이 꼭 필요한지 가려 보세요. 하루에 해야 할 것과 보여 줄 것을 나눠 적는 습관이 과열을 줄여 줍니다."
   },
   {
    "title": "8~10월경: 성과를 선별하기",
    "body": "주도권이 강해지는 흐름을 살리되, 모든 기회를 잡으려 하지 않는 편이 좋아요. 하나를 고를 때 기준 3개만 정해 두고 움직이면 선택이 선명해집니다."
   },
   {
    "title": "11월~다음해 1월경: 정리와 회복",
    "body": "책임이 늘고 다시 채우는 흐름이 함께 오기 쉬우니, 일정과 마음을 정돈해 두세요. 마무리할 것과 이어갈 것을 구분해 적는 작은 정리가 2028년의 출발을 편하게 해 줍니다."
   }
  ],
  "closing": "지수님, 2027년은 많이 쓰는 만큼 더 또렷하게 남는 해로 보입니다. 바깥으로 나가는 힘이 큰 만큼, 중간중간 채우고 정리하는 시간을 함께 두면 흐름이 훨씬 안정될 거예요. 서두르지 않아도 괜찮고, 잘 쌓인 것부터 천천히 빛나도 충분합니다."
 },
 "casey": {
  "year": 2027,
  "title": "2027, tu ritmo se afina",
  "subtitle": "Un año para medir fuerza, foco y pausas útiles",
  "overview": "En 2027, la energía de fondo te pide firmeza, pero no a empujones. Tu Maestro del Día es metal, y en tu mapa hay mucha madera y también bastante metal, con agua en 0%. Eso suele dibujar una personalidad que sabe sostener, ordenar y dar forma, aunque a veces necesite más descanso interno para no vivir solo desde la tensión. En un año de fuego, la vida te invita a templarte: no a correr más, sino a elegir mejor dónde pones tu peso.\n\nCasey, este puede ser un año muy útil para aprender a dosificar. La presión puede aparecer como más responsabilidad, más miradas encima o más cosas que dependen de ti, pero también como una oportunidad para volverte más preciso, más claro y más confiable para ti mismo. Si respetas tus ritmos, 2027 puede sentirse menos como un examen y más como una forja: calor suficiente para transformar, sin perder la forma.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso propio",
    "body": "En 2027, el dinero y los recursos se mueven mejor cuando tú tomas la iniciativa con orden. Como tu mapa mezcla mucha madera con metal, puede haber una tendencia a producir mucho, sostener mucho y querer resolver rápido; eso sirve, pero pide criterio para no dispersar esfuerzo. La parte favorable del año es que la energía te empuja a convertir ideas y trabajo en resultados visibles, siempre que no confundas velocidad con eficacia.\n\nEn la práctica, podrían aparecer decisiones pequeñas pero repetidas: ajustar precios, revisar gastos, negociar una tarea o buscar una manera más limpia de organizar ingresos. No suena a un año de apuestas grandes, sino de afinar el modo en que haces rendir lo que ya sabes hacer. Si te das el tiempo de revisar antes de comprometerte, el dinero puede sentirse más estable y menos caprichoso.\n\nTe ayudará empezar con algo simple: anotar durante unas semanas qué te deja más retorno y qué te drena sin dejar huella. Con esa lectura, Casey, será más fácil elegir dónde poner energía y dónde poner un límite amable."
   },
   "love": {
    "heading": "Vínculos con más verdad",
    "body": "En relaciones, 2027 puede traer un tono más serio y más claro. La energía del año no favorece tanto lo tibio como lo auténtico: lo que se dice, se nota; lo que se evita, también. Eso puede volver los vínculos más honestos, aunque a veces un poco más exigentes, porque no siempre alcanza con estar cerca: hace falta presencia real.\n\nPodrías notar conversaciones que aclaran expectativas, cambios en la forma de dar apoyo o momentos en los que prefieres menos ruido y más calidad. En vínculos nuevos, la atracción puede crecer cuando ves coherencia; en vínculos ya existentes, conviene cuidar el tono para que la franqueza no se vuelva dureza. La clave no parece ser “hacer más”, sino escuchar mejor y responder con medida.\n\nUna buena práctica sería preguntar antes de suponer, y decir con sencillez qué sí puedes ofrecer y qué no. Si dejas espacio para la respuesta del otro, el vínculo gana aire y tú también."
   },
   "career": {
    "heading": "Trabajo con disciplina",
    "body": "En trabajo y carrera, 2027 tiene un aire de entrenamiento: más responsabilidades, más exigencia y también más oportunidad de mostrar solidez. Tu metal responde bien a los desafíos, y el fuego del año puede actuar como el calor que le da forma a una pieza valiosa. La condición es clara: avanzar con método, no con prisa por impresionar.\n\nPuede ser un periodo en el que te pidan resolver, coordinar o sostener algo que otros no sostienen con la misma facilidad. Eso puede darte visibilidad, pero también exigir límites para no tomar demasiado de golpe. Si tu mapa ya tiende a la fuerza y al empuje, la mejor versión de 2027 aparece cuando eliges prioridades y no intentas resolver todo al mismo tiempo.\n\nConviene trabajar en bloques pequeños, con revisiones frecuentes. Un plan simple, una lista corta y una entrega bien terminada pueden valer más que una gran promesa. En 2027, la confianza profesional crece cuando tu constancia se nota más que tu prisa."
   },
   "study": {
    "heading": "Aprender para afinar",
    "body": "El aprendizaje en 2027 puede sentirse menos como acumular datos y más como ordenar criterio. Con agua en 0% en tu mapa, suele ayudar estudiar de un modo que deje pausa, reflexión y espacio para integrar, no solo para producir. El año favorece especialmente lo que te enseña a seleccionar, editar, sintetizar y convertir información en algo útil.\n\nEn lo cotidiano, esto puede verse como sesiones de estudio más cortas pero más concentradas, o como un interés por temas que te permiten aplicar enseguida lo aprendido. También puede aparecer la necesidad de revisar fundamentos, porque cuando la energía externa aprieta, vuelve valioso tener bases simples y claras. Si te dispersas, no será por falta de capacidad, sino por exceso de demanda.\n\nEmpieza por una sola pregunta concreta: ¿qué necesito entender mejor para trabajar o vivir con más calma? Desde ahí, un cuaderno, una lista de lectura o una rutina breve de repaso te pueden dar mucho más rendimiento que intentar abarcarlo todo."
   },
   "health": {
    "heading": "Ritmo para sostenerte",
    "body": "En cuerpo y ánimo, 2027 pide ritmo antes que intensidad. No se trata de alarmarte, sino de reconocer que un año con más presión externa suele pedir descansos más intencionales, sobre todo cuando tu forma natural es responder con firmeza. Con tu mezcla de mucho metal y mucha madera, puedes notar ganas de empujar; por eso conviene reservar momentos para bajar el ruido y volver a ti.\n\nEn la vida diaria, esto puede verse en días en los que rindes mucho y luego te conviene una pausa real para no seguir en automático. También puede aparecer una sensibilidad mayor a los cambios de agenda, así que ayuda dejar márgenes y no llenar cada espacio libre. Si cuidas tu energía como cuidas una herramienta valiosa, el año se vuelve más amable.\n\nPrueba con una rutina sencilla: dormir a horas parecidas, caminar un poco, comer sin apuro y dejar un tramo del día sin exigencias. No hace falta hacerlo perfecto; basta con que tu cuerpo y tu mente noten que también tienen un lugar en la agenda."
   }
  },
  "months": [
   {
    "headline": "Cierre que mueve",
    "body": "Febrero de 2027 puede abrirse con un impulso de cambio: algo se cierra y, al mismo tiempo, te dan ganas de moverte más. Como la energía del mes choca con tu punto de apoyo, conviene observar qué te saca de rutina sin pelearte con eso. Si haces espacio para lo nuevo, el giro puede sentirse más fértil que brusco."
   },
   {
    "headline": "Semilla en marcha",
    "body": "Marzo de 2027 favorece empezar a mostrar, producir o compartir más, aunque eso también te pida energía. Con pequeños tropiezos en el camino, te conviene avanzar por partes y no querer resolver todo de una vez. Lo sembrado aquí puede crecer mejor si lo riegas con constancia."
   },
   {
    "headline": "Poder con medida",
    "body": "Abril de 2027 trae una sensación de empuje para tomar la iniciativa y buscar resultados. El mes invita a actuar con decisión, pero sin dejar que el apetito por avanzar te haga pasar por encima de lo esencial. Si eliges bien una meta, el esfuerzo puede rendir más de lo esperado."
   },
   {
    "headline": "Ajuste que suma",
    "body": "Mayo de 2027 puede sentirse más fluido para negociar, unir fuerzas o hacer que una relación te sostenga en lo práctico. También conviene mirar de cerca los recursos, porque lo que se comparte o se mueve aquí pide cuidado. Un acuerdo claro puede ahorrarte vueltas más adelante."
   },
   {
    "headline": "Presión con tacto",
    "body": "Junio de 2027 puede subir la exigencia y volver más sensibles las reacciones. No hace falta responder a todo en el mismo minuto; te irá mejor si eliges el ritmo con calma. Cuando afinas el tono, la presión deja de sentirse como choque constante."
   },
   {
    "headline": "Confianza en alza",
    "body": "Julio de 2027 refuerza la sensación de que puedes sostener lo que tienes delante. Aun así, pueden aparecer imprevistos, así que conviene dejar margen para lo inesperado sin dramatizarlo. Si mantienes la cabeza clara, los cambios de plan se vuelven manejables."
   },
   {
    "headline": "Ayuda que nutre",
    "body": "Agosto de 2027 trae apoyo, aprendizaje y una sensación de recuperación más tranquila. Lo que haces con esfuerzo empieza a dar fruto, aunque quizá no de forma espectacular. Un cambio de ambiente, incluso pequeño, puede devolverte perspectiva."
   },
   {
    "headline": "Plenitud serena",
    "body": "Septiembre de 2027 puede sentirse más lleno, más completo y más fácil de disfrutar. También hay un magnetismo suave que favorece el contacto y la visibilidad. Si te permites recibir, no solo dar, el mes se vuelve especialmente amable."
   },
   {
    "headline": "Ritmo más lento",
    "body": "Octubre de 2027 baja la velocidad y te deja en un terreno conocido. Eso puede darte calma, aunque también menos estímulo nuevo, así que conviene no confundir estabilidad con estancamiento. Un tiempo de espera bien usado puede ordenar mejor tus prioridades."
   },
   {
    "headline": "Cuidado y claridad",
    "body": "Noviembre de 2027 pide más atención a ti y a la forma en que te comunicas. Pueden surgir malentendidos pequeños, de esos que se aclaran rápido si preguntas a tiempo. Ir con suavidad en las palabras puede ahorrarte mucha fricción."
   },
   {
    "headline": "Pausa con liderazgo",
    "body": "Diciembre de 2027 vuelve a activar la producción, la entrega y el gesto de dar a otros. A la vez, el mes favorece ordenar antes de seguir acumulando tareas. Si tomas la iniciativa con calma, puedes cerrar el periodo con una sensación de dirección clara."
   },
   {
    "headline": "Recogida valiosa",
    "body": "Enero de 2028 invita a recogerte un poco y a mirar lo hecho con más distancia. También puede traer reconocimiento, sobre todo por aquello que sostuviste con constancia. Si haces una pausa para integrar, el siguiente tramo empieza con más fuerza interna."
   }
  ],
  "action_plan": [
   {
    "title": "Entre febrero y abril",
    "body": "Observa dónde tu energía se va en empuje y dónde vuelve en forma de resultados. Te conviene probar una lista corta de prioridades y revisar cada semana qué sí merece continuidad."
   },
   {
    "title": "Entre mayo y julio",
    "body": "Mira con atención los acuerdos, los límites y el tono con el que respondes a la presión. Una acción útil sería dejar por escrito lo importante antes de comprometerte, para que todo quede más claro."
   },
   {
    "title": "Entre agosto y octubre",
    "body": "Pon atención a lo que te ayuda a recuperarte y a lo que te deja sin margen. Te puede servir reservar un bloque fijo para aprender, descansar o simplemente pensar sin interrupciones."
   },
   {
    "title": "Entre noviembre y enero",
    "body": "Revisa qué quieres sostener y qué ya necesita otra forma. Una buena acción sería ordenar pendientes, cerrar ciclos pequeños y preparar el terreno para empezar más liviano."
   }
  ],
  "closing": "2027 no te pide correr más, Casey; te pide afinar el paso. Cuando eliges con cuidado dónde poner tu fuerza, tu metal se vuelve más limpio y más útil. Si escuchas el ritmo del año sin pelearte con él, puedes terminar sintiendo que avanzaste con menos ruido y más verdad."
 },
 "mia": {
  "year": 2027,
  "title": "2027, your steady edge",
  "subtitle": "A year of pressure that can turn into poise",
  "overview": "In 2027, the main tone around you feels like heat under a well-forged surface: not soft, not careless, but capable of making you sharper if you choose your pace well. Your Day Master is Metal, and your Five Elements lean strongly toward Wood, with a balanced but lighter presence of Fire, Earth, and Water. That mix suggests a year where practical effort, clear priorities, and careful timing can matter more than force alone.\n\nYour overall pattern reads like Steel · Harvest: something sturdy, useful, and made to hold shape after a season of work. Because 2027 brings a refining kind of Fire, the year can ask more from you, especially in responsibility and follow-through, while also helping you show what you can actually carry. Mia, this is less about pushing harder and more about choosing where your effort belongs.\n\nThe monthly flow adds a nice arc: early months can feel productive and expressive, midyear can bring more pressure and then support, and the end of the year looks more familiar, with a quieter kind of momentum. If you keep your schedule flexible and leave room to revise plans, 2027 can feel less like a test and more like a shaping year.",
  "chapters": {
   "wealth": {
    "heading": "Money likes clear boundaries",
    "body": "In 2027, money matters may respond well to directness, because the year’s tone tends to reward initiative, ownership, and practical follow-through. With your Metal-centered nature and strong Wood presence, you may feel pulled between wanting to build something and wanting to keep it organized; that can be useful if you let structure lead the way.\n\nA likely scene is that you notice more chances to earn, charge for your effort, or make something tangible from your ideas, especially in the spring and early summer. At the same time, the year can make it tempting to say yes too quickly or to take on more than you really want to manage. Small checks, simple budgets, and clear terms can make the whole process feel cleaner.\n\nA good starting move is to separate “useful opportunity” from “extra noise.” If something asks for more energy than it returns, pause and review it once more. When you keep your standards visible, your resources tend to feel easier to protect and easier to grow."
   },
   "love": {
    "heading": "Connection through honesty",
    "body": "In relationships, 2027 can feel lively, noticeable, and a little more demanding than usual, which often helps people show their real preferences. Because the year asks you to be more defined, your connections may improve when you speak plainly and listen for what is actually being said, not just what is assumed.\n\nYou might find yourself drawn into conversations that change the tone of a bond, or into moments where someone’s behavior feels more revealing than usual. Early months may bring movement and a sense of being pulled in new directions, while late spring can make certain ties feel more magnetic or more vivid. That can be lovely, but it also helps to keep your footing and not rush the meaning of every spark.\n\nTry starting with one honest sentence instead of a long explanation. If you want closeness, clarity will probably help more than performance. In 2027, the strongest connections may be the ones that can handle a little heat without losing their shape."
   },
   "career": {
    "heading": "Work that can hold weight",
    "body": "Career-wise, 2027 looks like a year that can strengthen your sense of competence if you’re willing to work at a sustainable speed. The year’s Fire tone can press on Metal, which often shows up as deadlines, expectations, and the feeling that your output is being noticed more closely. That is not always comfortable, but it can be productive when you treat it like a forging process rather than a race.\n\nYou may encounter periods when your responsibilities expand, your standards rise, or your role becomes more visible. Spring can support action and results, while early summer may ask for more discipline and a calmer way of handling friction. Later in the year, support and recovery look more available, so it may be easier to consolidate what you’ve built and let other people meet you halfway.\n\nA useful habit is to define the smallest version of a good day’s work. If you keep your tasks clear and your pace measured, you can make progress without burning through your energy. 2027 favors reliability that can be seen, not just effort that stays hidden."
   },
   "study": {
    "heading": "Learning that becomes usable",
    "body": "For study and skill-building, 2027 can be especially good for turning scattered knowledge into something you can actually use. Your chart’s strong Wood suggests growth, curiosity, and many possible directions, while the year’s refining pressure can help you trim away what is interesting but not essential.\n\nYou may notice that learning feels most alive when it leads to a result: a draft, a presentation, a tool, a method, or a real conversation. Some months encourage output and experimentation, while others are better for absorbing support, reviewing notes, or letting ideas settle before you act on them. That rhythm can be very kind to a Steel · Harvest type, because it lets you gather rather than just chase.\n\nIf you start something new, keep the first version small and usable. A short practice routine, a clean note system, or one focused topic at a time can go further than trying to master everything at once. In 2027, progress may come from repetition with purpose, not from intensity alone."
   },
   "health": {
    "heading": "Energy management, gently done",
    "body": "For body and mind, 2027 asks for balance more than heroics. The year’s pressure can make you feel more “on” than usual, so regular pauses, predictable meals, and enough room between obligations may matter more than trying to maximize every hour. Because your chart is already weighted toward growth and production, rest may work best when it is scheduled, not left to chance.\n\nA likely scene is that you feel fine while moving and then realize later that you’ve been carrying too much momentum for too long. Midyear especially can ask you to notice tension earlier, while late summer and early autumn may feel more replenishing. Simple routines, quieter evenings, and fewer last-minute commitments can help your system settle.\n\nTry building a small reset into your week: a walk without your phone, an earlier night once in a while, or a short block of time with no output required. The goal is not to slow everything down, only to keep your pace honest. When you do that, your energy tends to stay more steady and more available."
   }
  },
  "months": [
   {
    "headline": "Fresh start, sharp edges",
    "body": "February can feel like a reset with momentum: you may want to create, speak up, or get moving quickly. Because this month also carries a clash-like note, a change in routine or direction may arrive through a real-world push, so flexibility can help more than resistance."
   },
   {
    "headline": "Small snags, real growth",
    "body": "March may favor beginnings that are still forming, which makes it good for rough drafts, first conversations, and early plans. A few small hiccups could ask for patience, but they may also reveal what needs adjusting before you invest too much."
   },
   {
    "headline": "Quiet control",
    "body": "April looks better for taking charge of practical matters and shaping results on your own terms. The inward tone of the month can help you work privately, refine a plan, or focus on what will actually hold up over time."
   },
   {
    "headline": "Momentum with surprises",
    "body": "May can bring a strong sense of movement, plus a more unusual twist in how things connect. Because the month also has an easy-joining quality, people, projects, or opportunities may come together faster than expected, so stay open but keep your judgment awake."
   },
   {
    "headline": "Pressure becomes shape",
    "body": "June may feel more demanding, with a clearer sense of responsibility and the need to choose your pace carefully. Friction is part of the month’s texture, so a calmer response and a cleaner schedule can help you turn strain into structure."
   },
   {
    "headline": "Keep your footing",
    "body": "July continues the refining tone, but with a more unpredictable edge. This is a good month for steady habits, because even when the day feels a little wild, simple routines can keep you oriented and prevent scattered energy."
   },
   {
    "headline": "Support returns",
    "body": "August brings a more nourishing current, where help, learning, or recovery can feel easier to receive. It may be a good time to ask questions, accept guidance, or let someone else lighten the load for once."
   },
   {
    "headline": "Full strength",
    "body": "September looks warm, active, and socially magnetic, with a sense that things can come together more naturally. If you’ve been waiting for a clearer opening, this month may reward confident follow-through and visible presence."
   },
   {
    "headline": "Familiar ground",
    "body": "October feels more settled and familiar, which can be comforting after a busier stretch. The tradeoff is that new excitement may be lower, so this is a good month for maintenance, review, and keeping things in good order."
   },
   {
    "headline": "Read twice",
    "body": "November has a slower, more winding tone, and misunderstandings may be easier to create if messages stay too brief. A little extra care with wording, timing, and assumptions can make this month feel much smoother."
   },
   {
    "headline": "Tidy, then command",
    "body": "December brings a pause that favors cleanup, sorting, and closing loops before the year changes. You may feel more capable of taking the lead if you first clear away what has been lingering in the background."
   },
   {
    "headline": "Quiet storage",
    "body": "January can feel inward and contained, as if energy is being gathered rather than spent. It’s a good month for preparing the next step, because quiet progress now may support a clearer move forward soon after."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: shape the first push",
    "body": "Watch for quick starts, fresh ideas, and a few early course corrections. Choose one project or habit to simplify, then give it a clean structure so the spring energy has somewhere useful to go."
   },
   {
    "title": "May to July: pace the heat",
    "body": "Notice where momentum turns into pressure or where enthusiasm starts asking too much of you. Set one boundary in advance, such as a hard stop time or a clearer yes/no rule, so your effort stays sustainable."
   },
   {
    "title": "August to October: receive and refine",
    "body": "Look for help, useful feedback, and moments when recovery comes more easily. Let yourself accept support, then use the calmer stretch to review what is working and trim what isn’t."
   },
   {
    "title": "November to January: close and prepare",
    "body": "Pay attention to misunderstandings, loose ends, and anything that still needs naming. Make one tidy-up ritual your own, such as clearing notes, organizing files, or finishing one lingering task before the new cycle opens."
   }
  ],
  "closing": "2027 does not read like a year that wants you to rush; it reads like a year that wants you to become more exact. Mia, if you let the pressure teach you rhythm instead of panic, the whole year can leave you stronger, clearer, and more self-trusting. Small choices, repeated well, may end up mattering more than dramatic moves."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, tu ritmo claro",
  "subtitle": "Un año para avanzar con pulso sereno y buen criterio",
  "overview": "Lucía, en 2027 se abre un movimiento interesante para ti: tu agua central entra en un año de fuego, y eso suele sentirse como una etapa donde la iniciativa, el dinero y los resultados piden más presencia. Como tu mapa ya tiene mucha tierra y agua en equilibrio, con poca madera y sin metal, la clave no parece ser empujar más fuerte, sino elegir mejor dónde poner la energía. Es un año que favorece tomar la delantera, ordenar prioridades y convertir ideas en hechos visibles.\n\nA la vez, no conviene ir con prisa automática. Hay meses en los que te conviene producir y mostrar, y otros en los que el propio clima te invita a revisar, bajar una marcha y escuchar lo que se mueve por dentro. Tu tipo de energía, ligado a la claridad y al orden, encaja bien con un 2027 que premia la constancia, la estructura y los pasos bien puestos. Si cuidas el ritmo, el año puede dejarte una sensación de avance sólido, no solo de movimiento.\n\nEn conjunto, 2027 no te pide esconderte ni forzarte: te pide administrar bien tu impulso. Cuando el fuego suba, te resultará útil decidir con precisión; cuando baje, te convendrá recuperar centro y dejar que madure lo que ya pusiste en marcha. Si mantienes ese equilibrio, encontrarás más margen para avanzar sin perderte en el exceso.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con dirección",
    "body": "En 2027, el dinero y los recursos se mueven con una energía que te favorece para tomar decisiones, buscar resultados y convertir esfuerzo en algo tangible. Como el año tiene un tono de fuego y tu agua central puede marcar el rumbo, se abre una ventana buena para ordenar ingresos, negociar con claridad y poner límites a los gastos que no aportan. La tierra fuerte en tu mapa sugiere que sabes sostener procesos; lo importante será no confundir firmeza con presión innecesaria.\n\nEn la vida diaria, esto puede verse en momentos en los que te toque revisar precios, calcular mejor un presupuesto o decidir qué proyecto merece realmente tu atención. También puede aparecer la sensación de que, si te organizas bien, el dinero responde mejor a tu iniciativa que a la espera pasiva. En los meses más intensos, conviene mirar dos veces antes de comprometerte con algo que suene bien pero te exija demasiado.\n\nEmpieza por una acción simple: separar tus prioridades en tres niveles, lo necesario, lo útil y lo prescindible. Así podrás usar el impulso de 2027 para avanzar con más precisión y menos desgaste. Si haces eso, el año puede sentirse menos disperso y más provechoso."
   },
   "love": {
    "heading": "Vínculos con más verdad",
    "body": "En tus relaciones, 2027 tiende a sacar a la superficie lo que ya estaba buscando forma. Hay meses en que la cercanía se siente natural y otros en que el entorno te pide más claridad, más escucha y menos suposición. Como tu mapa tiene un espíritu de orden, puede resultarte especialmente favorable hablar con sencillez, poner nombre a lo que sientes y dejar que las conexiones se organicen con menos ruido.\n\nEn lo cotidiano, esto puede verse en conversaciones que aclaran malentendidos, en encuentros donde notas quién sí responde a tu ritmo y en espacios donde prefieres calidad antes que cantidad. También puede haber momentos en los que el clima relacional te invite a marcar distancia de lo confuso y a quedarte con lo que sí tiene base. No parece un año para improvisar vínculos a ciegas, sino para dar forma a los que realmente encajan contigo.\n\nTe ayudará mucho empezar con gestos pequeños: responder con honestidad, preguntar antes de asumir y reservar tiempo para vínculos que te dejan en paz. Si cuidas ese tono, 2027 puede darte relaciones más limpias y más fáciles de sostener. Lucía, la clave no será impresionar, sino construir confianza paso a paso."
   },
   "career": {
    "heading": "Trabajo con empuje",
    "body": "En trabajo y carrera, 2027 favorece dar un paso al frente. El año tiene un tono que te invita a mostrar capacidad, asumir iniciativa y buscar resultados visibles, y eso encaja bien con tu agua central cuando se mueve con propósito. La presencia fuerte de tierra en tu mapa también ayuda a sostener responsabilidad; por eso, si eliges bien tus batallas, puedes convertir presión en avance concreto.\n\nEn el día a día, esto puede aparecer como más tareas de coordinación, más oportunidades para resolver problemas o momentos en los que tu criterio se vuelve especialmente útil. También puede sentirse como una etapa en la que te observan más, no necesariamente para juzgarte, sino para ver cómo respondes. En los meses de mayor intensidad, te convendrá evitar el exceso de promesas y quedarte con lo que sí puedes llevar a cabo con calma.\n\nUna buena forma de empezar es revisar qué parte de tu trabajo te da resultados reales y cuál solo te mantiene ocupado. Desde ahí, el año puede ayudarte a ganar presencia sin perder centro. Si eliges la precisión antes que la prisa, tu avance se verá más claro y más sólido."
   },
   "study": {
    "heading": "Aprender para afinar",
    "body": "En aprendizaje, 2027 se siente como un año muy útil para consolidar conocimientos y darles forma práctica. No parece una etapa de dispersión, sino de estudio con intención: leer, observar, ordenar y aplicar. Como tu mapa ya trae una base de orden, te puede ir especialmente bien cuando aprendes con estructura, objetivos claros y tiempos definidos.\n\nEn la vida diaria, esto puede verse en cursos que te piden constancia, lecturas que te aclaran decisiones o conversaciones donde descubres una forma más simple de entender algo que antes parecía confuso. También puede aparecer una curiosidad más fina: no tanto por acumular información, sino por quedarte con lo que de verdad sirve. En los meses más activos, estudiar un poco cada día puede rendir más que hacer todo de golpe.\n\nTe conviene elegir un tema central y darle continuidad. Si haces espacio para repasar, resumir y aplicar, 2027 puede dejarte con una sensación de aprendizaje útil y bien integrado. No se trata de saberlo todo, sino de aprender lo que te ayuda a avanzar con más criterio."
   },
   "health": {
    "heading": "Cuidar el ritmo",
    "body": "En cuerpo y mente, 2027 pide atención al ritmo más que a la velocidad. Con tanta tierra en tu mapa y un año de fuego que activa el hacer, puede convenirte alternar impulso y pausa para no acumular tensión innecesaria. Tu tipo de energía, ligado al rocío y al orden, suele responder bien cuando hay aire para pensar, descansar y procesar lo que pasa antes de seguir.\n\nEn lo cotidiano, esto puede notarse en días en los que rindes mejor si comienzas con calma, ordenas el espacio y dejas margen entre una tarea y otra. También puede aparecer una sensibilidad mayor a los ambientes muy cargados o a la sobreexigencia mental. Si notas que el cuerpo te pide bajar una marcha, no lo tomes como freno: puede ser la forma más inteligente de conservar claridad.\n\nUna práctica sencilla sería fijar un cierre pequeño al final del día: apagar pantallas un poco antes, ordenar lo básico y respirar sin apuro durante unos minutos. Ese gesto puede ayudarte a entrar y salir mejor del esfuerzo. Si cuidas el ritmo, 2027 puede sentirse más amable y más habitable."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "La energía se parece mucho a la tuya y eso puede hacerte sentir cómodo, aunque con menos sorpresa de la habitual. Conviene prestar atención a malentendidos pequeños, porque una palabra rápida puede tomar más espacio del que merece."
   },
   {
    "headline": "Marzo que despierta",
    "body": "Este mes trae un aire de brote: algo empieza a tomar forma y te anima a moverte con más decisión. La sensación de liderazgo puede crecer si eliges una dirección clara y das el primer paso sin esperar demasiadas señales."
   },
   {
    "headline": "Abril que produce",
    "body": "Aquí se nota que tú alimentas el fuego del año, así que la expresión y la entrega pueden crecer bastante. También puede subir el cansancio si dices que sí a todo, por lo que el reconocimiento llega mejor cuando seleccionas bien dónde poner tu energía."
   },
   {
    "headline": "Mayo en movimiento",
    "body": "La semilla ya está dentro del suelo y pide acción concreta para abrir camino. Puede aparecer un impulso fuerte por cambiar de ritmo, salir, probar y hacer más; si canalizas ese impulso, el mes puede dejarte avances visibles."
   },
   {
    "headline": "Junio decisivo",
    "body": "El fuego del año entra en una fase en la que te conviene tomar la iniciativa con más precisión. Hay margen para resultados y dinero, pero también para pequeños tropiezos si te apresuras demasiado; revisar dos veces te dará más tranquilidad."
   },
   {
    "headline": "Julio interior",
    "body": "El clima te invita a mirar hacia adentro y a decidir desde un lugar más sereno. Si usas este mes para ordenar prioridades, el impulso de conseguir cosas puede volverse más limpio y más estable."
   },
   {
    "headline": "Agosto con peso",
    "body": "La energía empieza a exigirte más responsabilidad y puede pedirte que cuides recursos, tiempos y compromisos. Si bajas un poco la velocidad y sostienes el paso, ese peso se convierte en estructura útil."
   },
   {
    "headline": "Septiembre de roce",
    "body": "Aquí la presión sube y el entorno puede sentirse más tenso, así que te conviene afinar la comunicación. Como la rama terrestre de este mes choca con la tuya, pueden surgir giros que te empujen a cambiar de plan o de enfoque."
   },
   {
    "headline": "Octubre que nutre",
    "body": "Este mes trae ayuda, aprendizaje y una sensación de apoyo más clara. Además, la rama terrestre se lleva bien con la tuya, así que puede abrirse una colaboración útil o una conversación que te deja mejor posicionado."
   },
   {
    "headline": "Noviembre amplio",
    "body": "La energía vuelve a llenarse y eso puede darte más margen para recuperar fuerzas y ordenar ideas. Los cambios de ambiente o de rutina pueden venir bien si buscas una perspectiva nueva sin forzar nada."
   },
   {
    "headline": "Diciembre fértil",
    "body": "La energía se parece otra vez a la tuya y eso favorece una sensación de familiaridad con frutos concretos. Puede ser un mes de magnetismo suave, donde tu presencia pesa más si actúas con coherencia."
   },
   {
    "headline": "Enero paciente",
    "body": "El año nuevo se acerca con un tono tranquilo y bastante conocido para ti. La espera no se siente vacía, sino como un tiempo en el que conviene confiar en lo que ya venías construyendo y dejar que madure."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Observa cómo reaccionas cuando el entorno se siente familiar pero poco estimulante. Haz una lista corta de tres prioridades y empieza por la que más orden te dé; así aprovechas la claridad sin dispersarte."
   },
   {
    "title": "De mayo a julio",
    "body": "Mira dónde estás dando más de lo necesario y dónde el impulso puede llevarte a decidir rápido. Elige una meta concreta y trabaja en ella con pasos breves para que el empuje del período no se te vaya en exceso."
   },
   {
    "title": "De agosto a octubre",
    "body": "Fíjate en qué compromisos te exigen más de lo que devuelven y en qué vínculos o apoyos sí te sostienen. Reorganiza tu agenda para dejar espacio a una ayuda real y a una conversación que te aclare el rumbo."
   },
   {
    "title": "De noviembre a enero",
    "body": "Atiende a lo que ya dio fruto y no intentes acelerar lo que pide madurar. Cierra el período revisando avances, guardando energía y dejando preparada una base simple para empezar el siguiente tramo con más calma."
   }
  ],
  "closing": "2027 no te pide correr sin pausa, sino aprender a dirigir bien tu fuerza. Cuando uses el fuego del año para actuar con criterio, tu agua central encontrará una forma más limpia de avanzar. Lucía, si eliges bien tus tiempos, este puede ser un año de resultados serenos y de una confianza que crece desde dentro."
 }
};
