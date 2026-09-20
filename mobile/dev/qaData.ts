// Persona-analysis test mode data — DEV ONLY (see dev/qaMode.ts and dev/README.md).
//
// Never imported by production code: dev/qaMode.ts loads this file through `require` inside an
// `if (__DEV__)` branch, which Metro removes from release/OTA bundles.
//
// Contents were produced by the real engine and the real GPT prompts (2026-09-20), so the
// screens show realistic, full-length content without calling paid endpoints:
//   - QA_PERSONAS: saju results from POST /api/saju (no sessionId → nothing persisted)
//   - QA_DEEP_REPORT: a generated deep report + the diagnosis / chat extract it was written from
//   - QA_YEAR_REPORT: a generated year-ahead report
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

export const QA_DEEP_REPORT: Record<"ko" | "en" | "es", { content: any; quizDiagnosis: any; chatExtract: any }> = {
 "ko": {
  "content": {
   "title_line1": "월요일 알림 하나에",
   "title_line2": "끝난 하루가 다시 시작됩니다",
   "subtitle": "번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침, 메신저 알림이 울리자마자 마음이 먼저 굳습니다. 쉬는 날에도 머릿속은 일을 놓지 못하고, 끝낸 뒤에는 다시 처음부터 훑어보게 됩니다. 지수님의 요즘은 이런 모습이지 않으신가요",
   "case_tag": "CASE — 민서씨, 30대, 마감 뒤에도 쉬지 못하는 사람",
   "case_paragraphs": [
    "민서씨는 일을 끝내고 나면 안도보다 점검이 먼저 오는 사람이었습니다. 화면을 닫아도 손은 자꾸 다시 열리고, 이미 끝난 문서도 한 번 더 살펴봐야 마음이 놓였습니다.",
    "문제는 그 습관이 쉬는 시간까지 따라온다는 점이었습니다. 쉬는 날에도 머리가 편해지지 않아서, 잠깐 멈추면 오히려 뒤처진 것 같은 불안이 더 크게 올라왔습니다.",
    "민서씨의 사주에서도 화가 강하고 금이 비어 있었습니다. 밀어붙이는 힘은 충분했지만, 속도를 정리하고 선을 그어 주는 감각이 약해서 결국 몰아서 하고 무너지는 쪽으로 기울었습니다."
   ],
   "element_readings": {
    "wood": {
     "heading": "목(木) 보통 — 방향은 있으나 속도에 밀리는 줄기",
     "body": "목은 25퍼센트로 적당히 살아 있습니다. 생각을 뻗는 힘은 있지만, 지금은 그 힘이 화의 속도에 눌려 오래 가지 못합니다."
    },
    "fire": {
     "heading": "화(火) 과다 — 끝까지 달리게 하는 불",
     "body": "화가 50퍼센트라서 추진력이 강합니다. 끝까지 해내는 힘은 분명하지만, 번아웃 모듈의 완주형 소진처럼 끝까지 지치기 쉬운 구조이기도 합니다."
    },
    "earth": {
     "heading": "토(土) 보통 — 버티게는 하지만 무겁게 남는 흙",
     "body": "토는 13퍼센트로 적지 않지만 넉넉하지도 않습니다. 몰아서 하고 무너진 뒤의 무게를 잠깐 붙잡아 주는 정도입니다."
    },
    "metal": {
     "heading": "금(金) 결핍 — 멈춤과 정리의 칸이 비어 있음",
     "body": "금이 0퍼센트라서 경계와 정리가 비어 있습니다. 이 비어 있음은 토가 금을 살려 주는 흐름으로 채워야 하는데, 지금은 그 연결이 약해서 쉬어도 쉬는 느낌이 잘 오지 않습니다."
    },
    "water": {
     "heading": "수(水) 보통 — 식히는 힘은 있으나 깊지는 않음",
     "body": "수는 13퍼센트로 남아 있습니다. 불안을 잠시 식히는 데는 도움이 되지만, 지친 마음을 충분히 회복시키기에는 얇은 편입니다."
    }
   },
   "upcoming_period_heading": "다가오는 흐름",
   "upcoming_period_body": "지금은 숫자를 붙일 만큼 확정된 시기가 보이지 않습니다. 다만 무리해서 밀어붙이던 방식보다, 정리와 회복을 먼저 두는 흐름이 더 유리해질 가능성이 큽니다.",
   "cross_analysis_quotes": [
    "화가 50퍼센트라는 점은 완벽주의 82퍼센트와 정확히 맞물립니다. 끝까지 해내려는 힘이 강한 만큼, 멈추지 못하고 스스로를 소모하기 쉽습니다.",
    "금이 0퍼센트라는 점은 회복 34퍼센트와 이어집니다. 쉬는 시간에 마음이 편하지 않은 것은 게으름이 아니라, 정리와 경계를 세우는 힘이 약해서입니다."
   ],
   "answer_notes": [
    "완벽주의가 높다는 것은 일을 끝내는 순간에도 마음이 종결되지 않는다는 뜻입니다. 결과보다 누락 가능성을 먼저 보는 시선이 강합니다.",
    "회복이 낮다는 것은 쉬는 시간을 휴식으로 받아들이기보다, 아직 끝나지 않은 시간처럼 느낀다는 뜻입니다."
   ],
   "psychology_fact_heading": "완벽주의와 자기비판",
   "psychology_fact_body": "완벽주의가 높을수록 성취 뒤에도 기준이 쉽게 내려오지 않고, 자기비판이 이어지기 쉽습니다. 이 사람의 반복 점검 습관은 그 기준이 쉬는 시간까지 따라오는 모습으로 읽힙니다.",
   "psychology_takeaway": "지금 필요한 것은 더 세게 버티는 힘이 아니라, 끝난 일을 끝났다고 인정하는 연습입니다.",
   "strengths": [
    {
     "title": "추진력",
     "body": "화가 강해서 시작한 일을 끝까지 끌고 가는 힘이 분명합니다."
    },
    {
     "title": "집중력",
     "body": "한 번 붙으면 쉽게 놓지 않아서, 마감이 있는 일에서 특히 힘이 살아납니다."
    },
    {
     "title": "책임감",
     "body": "일을 대충 넘기지 않고 다시 훑어보는 태도는 책임감의 다른 이름입니다."
    },
    {
     "title": "민감함",
     "body": "월요일 아침 알림에도 바로 반응할 만큼, 상황 변화를 빨리 감지합니다."
    }
   ],
   "weaknesses": [
    {
     "title": "과점검",
     "body": "끝낸 뒤에도 다시 처음부터 훑는 습관이 마음의 종료를 늦춥니다."
    },
    {
     "title": "소진",
     "body": "몰아서 해내는 힘이 큰 만큼, 한 번 무너지면 회복까지 오래 걸립니다."
    },
    {
     "title": "불안",
     "body": "뒤처질까 봐 멈추지 못해서, 쉬는 시간조차 긴장으로 채워집니다."
    },
    {
     "title": "경계약함",
     "body": "금이 비어 있어 일과 쉼의 선을 분명히 긋는 데 에너지가 더 필요합니다."
    }
   ],
   "fit_good": "마감이 분명하고 기준이 명확한 환경에서, 혼자 정리하고 마무리까지 책임질 때 가장 안정적으로 힘을 냅니다.",
   "fit_bad": "하루 종일 알림이 끊이지 않고, 즉시 반응을 요구하는 환경에서는 지친 속도가 더 빨라집니다.",
   "behavior_guides": [
    {
     "title": "종료메모",
     "body": "일을 마칠 때 다음 점검 항목을 따로 적고, 지금 확인할 것은 여기서 끝난다고 표시해 두세요."
    },
    {
     "title": "알림유예",
     "body": "월요일 아침처럼 흔들리는 시간에는 메신저를 바로 열지 말고, 먼저 정해 둔 한 가지 일부터 시작하세요."
    },
    {
     "title": "휴식구분",
     "body": "쉬는 날에는 일과 무관한 행동을 하나 먼저 정해 두고, 그 행동이 끝나면 휴식으로 인정하세요."
    },
    {
     "title": "재점검제한",
     "body": "끝난 일을 다시 보는 횟수를 미리 정해 두면, 완벽주의가 회복을 잠식하는 속도를 줄일 수 있습니다."
    }
   ],
   "mindset_guide": "번아웃은 연료가 없는 상태라기보다, 이미 너무 많이 태워 버린 상태에 가깝습니다. 지금의 지수님은 불을 더 키워야 하는 사람이 아닙니다. 재를 치우고 숨을 넣어야 다시 타오릅니다.",
   "closing_title": "멈춤은 실패가 아닙니다",
   "closing_body": "지금의 지치고 불안한 마음은 약해서가 아니라, 오래 버틴 흔적입니다. 끝까지 해내는 힘에 더해, 끝났다고 놓아 주는 힘이 붙으면 훨씬 덜 무너지게 됩니다."
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
    "wood": 25,
    "fire": 50,
    "earth": 12.5,
    "metal": 0,
    "water": 12.5
   },
   "dominantElement": "fire"
  },
  "chatExtract": {
   "primary_concern": "쉬어도 쉬는 것 같지 않아요",
   "emotional_state": "지쳤고 조금 불안함",
   "trigger_point": "월요일 아침 메신저 알림",
   "repeat_pattern": "몰아서 하고 무너지기",
   "core_fear_or_meaning": "뒤처질까 봐 멈출 수 없어요"
  }
 },
 "en": {
  "content": {
   "title_line1": "Bright Output, Hidden Burnout",
   "title_line2": "You keep finishing things that never quite let you rest.",
   "subtitle": "Burnout Deep Report — Saju × Psychology × Counseling Integration",
   "opening_scene": "It starts on a Monday morning, when the messages land before your body has fully woken up. You push through, cram everything into one stretch, and then crash hard enough to call it rest, even though it never feels like resting. Mia, isn’t this what your recent days have looked like?",
   "case_tag": "CASE — Nora, late 20s, work pressure",
   "case_paragraphs": [
    "Nora kept telling herself she just needed one more push. She would finish a task, then circle back to check it again, as if the first completion could never be trusted.",
    "By the end of the week, she had done more than anyone around her noticed. But she felt tense even on her day off, because stillness did not register as recovery.",
    "Her chart also leaned heavily toward Fire, with Metal at zero and Earth relatively low. That same imbalance showed up in her life as output that ran hot, while recovery stayed thin and underbuilt."
   ],
   "element_readings": {
    "wood": {
     "heading": "Wood — Steady growth",
     "body": "Wood is present, but it is not the part driving the overload. It gives movement and direction, yet it is being pulled into a pace that never fully slows down."
    },
    "fire": {
     "heading": "Fire — Overlit engine",
     "body": "Fire is the dominant force at 50 percent, and it reads like a system that keeps burning to the end of every task. In the burnout module, that looks exactly like finishing everything and then feeling drained by the finishing itself."
    },
    "earth": {
     "heading": "Earth — Thin reserve",
     "body": "Earth is low, so the part that helps things settle has less room to do its work. It is also the element that can support Metal, which matters here because recovery needs structure before it can feel real."
    },
    "metal": {
     "heading": "Metal — The missing edge",
     "body": "Metal is at zero, so closure, boundary, and clean stopping points are the weakest part of the pattern. That is why re-checking can keep replacing completion, even after the work is already done."
    },
    "water": {
     "heading": "Water — Limited refill",
     "body": "Water is only lightly present, so replenishment does not come easily after the push. That makes the tiredness feel less like emptiness and more like a system that never fully recharges."
    }
   },
   "upcoming_period_heading": "In the coming flow, the pace asks for cleaner stops.",
   "upcoming_period_body": "Because no future age range is specified, the emphasis stays on the pattern rather than the calendar. The next opening is likely to reward work that ends on purpose, instead of work that keeps reopening itself after it should already be closed.",
   "cross_analysis_quotes": [
    "\"High Fire mirrors the burnout pattern of pushing hard, finishing fast, and then feeling emptied by the very success you were chasing.\"",
    "\"Low Metal fits the restlessness after rest, because the part that knows how to close the day cleanly is underpowered here.\""
   ],
   "answer_notes": [
    "The re-checking habit shows a mind that does not fully accept completion until it has inspected every edge.",
    "Feeling uneasy on a day off reveals that recovery is not yet experienced as safe, even when the body has stopped."
   ],
   "psychology_fact_heading": "Allostatic Load",
   "psychology_fact_body": "Allostatic load describes the wear and tear that builds when the body stays in repeated adaptation mode for too long. That fits this pattern closely: the work gets done, but the system pays for it afterward.",
   "psychology_takeaway": "The problem is not that you cannot finish; it is that finishing has started costing too much.",
   "strengths": [
    {
     "title": "Drive",
     "body": "You bring strong forward motion, and that helps you get through the tasks that other people postpone."
    },
    {
     "title": "Follow-through",
     "body": "You do not stop at intention; you keep going until the task is actually complete."
    },
    {
     "title": "Standards",
     "body": "Your high standards keep the quality sharp, even when your energy is already running low."
    },
    {
     "title": "Awareness",
     "body": "You can feel the pattern clearly enough to name it, which makes change more possible than denial would."
    }
   ],
   "weaknesses": [
    {
     "title": "Overcheck",
     "body": "Completion does not feel stable to you, so you keep reopening finished work."
    },
    {
     "title": "False Rest",
     "body": "Time off does not register as recovery, which means the body stays alert even when the schedule pauses."
    },
    {
     "title": "Crash Cycle",
     "body": "You tend to cram first and pay later, so the break arrives only after depletion has already set in."
    },
    {
     "title": "Behind Fear",
     "body": "The fear of falling behind makes stopping feel risky, so rest becomes emotionally expensive."
    }
   ],
   "fit_good": "You do best in work that has clear endpoints, visible priorities, and room to stop without having to justify every pause.",
   "fit_bad": "You will struggle in environments that reward constant availability, open-ended revisions, and urgency without recovery time.",
   "behavior_guides": [
    {
     "title": "Stop Mark",
     "body": "Before you begin, decide what counts as done so the task does not stay alive after completion."
    },
    {
     "title": "One Review",
     "body": "Allow one deliberate check after finishing, then close the file instead of circling back again."
    },
    {
     "title": "Recovery Slot",
     "body": "Treat rest as a scheduled task with a start and end, not as a vague pause you have to earn."
    },
    {
     "title": "Message Buffer",
     "body": "Build a small delay between Monday messages and your response so urgency does not seize the whole morning."
    }
   ],
   "mindset_guide": "Burnout is not a weakness problem. It is a pacing problem. A fire that keeps relighting the same work will look productive for a while, but it will also burn through the room faster than it can be repaired.",
   "closing_title": "What Needs to End",
   "closing_body": "You do not need to prove that you can keep going forever. You need a way to finish that leaves some of you still intact."
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
    "fire": 50,
    "earth": 12.5,
    "metal": 0,
    "water": 12.5
   },
   "dominantElement": "fire"
  },
  "chatExtract": {
   "primary_concern": "I rest but it never feels like resting",
   "emotional_state": "Tired and a little anxious",
   "trigger_point": "Monday-morning messages",
   "repeat_pattern": "Cramming, then crashing",
   "core_fear_or_meaning": "I'm afraid that if I stop I'll fall behind"
  }
 },
 "es": {
  "content": {
   "title_line1": "Fuego alto, descanso que no alcanza",
   "title_line2": "y una mente que vuelve a empezar cuando ya quería parar",
   "subtitle": "Informe profundo del módulo Agotamiento — síntesis de astrología, psicología y conversación",
   "opening_scene": "El lunes por la mañana llegan mensajes y, con ellos, se enciende algo que no se apaga fácil. Usted descansa, pero el cuerpo sigue en guardia; incluso cuando se detiene, la mente sigue revisando lo que falta. Lucía, ¿no se ve últimamente así su día a día?",
   "case_tag": "CASE — Nora, treintañera, cerrando todo sin poder soltar",
   "case_paragraphs": [
    "Nora trabaja con la costumbre de dejar todo impecable antes de pasar a otra cosa. Si algo queda a medias, siente que la jornada no terminó de verdad.",
    "Después de cada entrega, vuelve sobre lo ya hecho y lo revisa otra vez. Eso le roba aire, le quita descanso y hace que cualquier pausa se sienta como una deuda.",
    "Su carta también mostraba un fuego muy dominante y un metal muy bajo. Esa mezcla la empujaba a empujar más, pero le costaba encontrar borde, pausa y cierre limpio."
   ],
   "element_readings": {
    "wood": {
     "heading": "Madera 25 % — impulso que busca salida",
     "body": "La madera está viva, pero no domina la escena. Aquí aparece como una energía que quiere avanzar, aunque no lleva el peso principal de esta historia."
    },
    "fire": {
     "heading": "Fuego 50 % — la llama que no sabe bajar",
     "body": "El fuego es el centro de todo: intensidad, rapidez y una necesidad constante de seguir. En Agotamiento, eso se parece a terminar una tarea y no sentir cierre, porque la energía ya está mirando la siguiente."
    },
    "earth": {
     "heading": "Tierra 13 % — el suelo que intenta sostener",
     "body": "La tierra es poca, pero hace el trabajo de contención que permite no desbordarse del todo. En esta persona, se nota como el intento de sostener tanto que al final termina acumulando demasiado."
    },
    "metal": {
     "heading": "Metal 0 % — borde ausente",
     "body": "Aquí está el vacío más claro. El metal es lo que pone límite y orden, y en esta carta solo puede empezar a reconstruirse desde la tierra, que es la relación que lo alimenta."
    },
    "water": {
     "heading": "Agua 13 % — pausa corta, recuperación frágil",
     "body": "El agua existe, pero no alcanza para que el descanso se sienta completo. Por eso descansar no apaga la inquietud; solo la deja en silencio por un momento."
    }
   },
   "upcoming_period_heading": "Flujo próximo, sin fecha fija",
   "upcoming_period_body": "Como no hay un tramo de edad definido, lo que viene se entiende más como proceso que como calendario. Lo más probable es que aparezcan oportunidades para ordenar mejor la energía y dejar de vivir cada cierre como si fuera una emergencia.",
   "cross_analysis_quotes": [
    "El fuego alto conversa de forma directa con el perfeccionismo: cuanto más intensa es la chispa, más difícil se vuelve aceptar un trabajo simplemente terminado.",
    "El metal ausente encaja con la baja recuperación: sin borde interno claro, incluso el descanso queda abierto y la ansiedad encuentra por dónde volver."
   ],
   "answer_notes": [
    "Ese patrón muestra que el cierre no basta por sí solo; necesita una segunda pasada para calmar la exigencia interna.",
    "Ese malestar en un día libre revela que el descanso, para ella, todavía se vive como interrupción y no como reparación."
   ],
   "psychology_fact_heading": "Perfeccionismo y recuperación autorreparable",
   "psychology_fact_body": "El perfeccionismo suele empujar a revisar, ajustar y reabrir incluso cuando una tarea ya está lista. Si además la recuperación es baja, el cuerpo descansa menos de lo que aparenta, y la mente sigue trabajando por su cuenta.",
   "psychology_takeaway": "No le falta esfuerzo; le falta una forma de cerrar que no vuelva a abrirlo todo por dentro.",
   "strengths": [
    {
     "title": "Empuje",
     "body": "Tiene una energía de arranque muy fuerte y rara vez se queda quieta cuando algo importante depende de ella."
    },
    {
     "title": "Exigencia",
     "body": "Su estándar alto le permite ver detalles que otras personas pasarían por alto."
    },
    {
     "title": "Resistencia",
     "body": "Aunque se canse, sigue intentando sostener el ritmo hasta terminar lo que empezó."
    },
    {
     "title": "Conciencia",
     "body": "Percibe con claridad cuándo algo no quedó bien, y esa sensibilidad le da precisión."
    }
   ],
   "weaknesses": [
    {
     "title": "Sobrecarga",
     "body": "Acumula tanto antes de soltar que el cansancio aparece cuando ya está demasiado lleno todo."
    },
    {
     "title": "Revisión",
     "body": "Le cuesta aceptar el punto final, y por eso vuelve una y otra vez sobre lo mismo."
    },
    {
     "title": "Inquietud",
     "body": "Incluso cuando descansa, una parte de ella sigue activa y alerta."
    },
    {
     "title": "Miedo",
     "body": "Parar le despierta la sensación de quedarse atrás, y esa idea la empuja a seguir aunque ya esté agotada."
    }
   ],
   "fit_good": "Le favorecen entornos con entregas claras, prioridades visibles y margen real para cerrar sin estar reabriendo lo hecho.",
   "fit_bad": "Le desgastan los trabajos con urgencia constante, cambios sin cierre y culturas donde descansar se siente como perder terreno.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Al terminar una tarea, haga una sola revisión final con tiempo limitado y déla por cerrada sin volver a entrar."
    },
    {
     "title": "Pausa real",
     "body": "Separe el descanso en un bloque sin pantallas ni listas, para que el cuerpo tenga una señal distinta de apagado."
    },
    {
     "title": "Límite visible",
     "body": "Antes de empezar, defina qué significa terminado para esa tarea y escríbalo en una frase corta."
    },
    {
     "title": "Descarga breve",
     "body": "Cuando llegue la inquietud, anote lo pendiente en tres líneas y retome solo cuando toque, no en el impulso."
    }
   ],
   "mindset_guide": "Piense su energía como una jornada de cocina, no como una fogata que nunca se deja sola. Si todo sigue en el fuego, nada termina de asentarse y el cansancio se queda pegado al fondo.\n\nSu tarea no es añadir más intensidad. Es dar lugar a una etapa de reposo donde lo hecho pueda enfriarse sin sentirse abandonado.",
   "closing_title": "Cerrar sin perseguirse",
   "closing_body": "Lo que hoy la agota no es falta de capacidad, sino exceso de retorno sobre lo ya terminado. Cuando el cierre deje de parecer una amenaza, el descanso por fin podrá sentirse como descanso."
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
     "label": "Me siento inquieta aunque descanse",
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
    "title": "Agotamiento de quien termina todo",
    "hook": "Termina todo y el todo la termina a ella"
   },
   "nuancedSummary": "El perfeccionismo es alto y la recuperación es baja.",
   "dimensionShortNames": {
    "perfectionism": "Perfeccionismo",
    "recovery": "Recuperación"
   },
   "elements": {
    "wood": 25,
    "fire": 50,
    "earth": 12.5,
    "metal": 0,
    "water": 12.5
   },
   "dominantElement": "fire"
  },
  "chatExtract": {
   "primary_concern": "Descanso pero nunca se siente como descanso",
   "emotional_state": "Cansada y un poco ansiosa",
   "trigger_point": "Los mensajes del lunes por la mañana",
   "repeat_pattern": "Acumular y luego derrumbarme",
   "core_fear_or_meaning": "Me da miedo quedarme atrás si paro"
  }
 }
};

export const QA_YEAR_REPORT: Record<"ko" | "en" | "es", any> = {
 "ko": {
  "year": 2027,
  "title": "2027, 익숙함을 다듬는 해",
  "subtitle": "지수님에게 편안함과 정돈이 함께 오는 리듬",
  "overview": "2027년은 지수님에게 익숙한 결의 흐름이 들어와, 큰 낯섦보다는 이미 가진 힘을 정리하고 다듬기 좋은 한 해로 읽혀요. 중심 기운이 불처럼 밝고 빠른 편인데, 오행 분포도 화가 많은 편이라 올해는 그 에너지가 자연스럽게 살아나기 쉽습니다. 태양처럼 결집하는 유형답게 한 번 방향이 잡히면 집중력이 잘 모이지만, 새 자극은 상대적으로 적을 수 있어요. 그래서 올해는 ‘더 세게’보다 ‘더 고르게’가 편한 해로 보입니다.\n\n전체적으로는 익숙한 리듬 속에서 책임감, 표현, 성과, 정리의 흐름이 차례로 지나가요. 초반에는 속도를 조절하며 단단해지고, 중반에는 도움과 회복이 들어오며, 여름 이후에는 당신의 에너지가 바깥으로 잘 흘러가요. 지수님에게는 무리한 돌파보다, 이미 가진 것을 잘 배치하고 쓰는 감각이 중요해 보입니다. 특히 금(金)이 비어 있어 결과를 숫자로만 재기보다, 구조와 기준을 천천히 세우는 쪽이 더 편했을 수 있어요.",
  "chapters": {
   "wealth": {
    "heading": "돈은 ‘속도 조절’이 핵심",
    "body": "2027년의 재물 흐름은 한 번에 크게 벌거나 크게 바꾸기보다, 주도권을 잡고 성과를 다듬는 쪽에 가까워 보여요. 지수님처럼 화의 비중이 큰 사주는 순간 판단이 빠른 장점이 있지만, 올해는 그 빠름이 과해지면 지출이나 선택이 앞서기 쉬워서, ‘내가 원하는 방향인가’를 한 번 더 보는 습관이 도움이 됩니다.\n\n일상에서는 “지금 사두면 편할 것 같아서” 하는 선택이 늘거나, 주변의 분위기에 맞춰 지갑이 열리는 장면이 생기기 쉬워요. 10~11월경에는 특히 성과를 밀어붙이고 싶은 마음이 커질 수 있어, 눈에 보이는 결과에 마음이 쏠릴 수 있습니다. 반대로 4~5월경에는 도움이나 배움이 들어오면서, 돈보다 시스템을 정리하는 감각이 살아나기 쉬워요.\n\n작게 시작한다면, 큰 결정을 내리기 전 메모 한 줄을 남겨보세요. “왜 필요한가, 지금인가, 대체 방법은 없는가”만 적어도 흐름이 한결 차분해집니다. 올해의 재물운은 빠른 수익보다, 지수님이 납득할 수 있는 기준을 만드는 데서 편안함이 생기기 좋아요."
   },
   "love": {
    "heading": "관계는 익숙함 속의 온도",
    "body": "관계와 연애에서는 올해의 ‘같은 결’이 주는 편안함이 먼저 느껴질 수 있어요. 지수님은 기본적으로 사람을 모으고 분위기를 밝히는 힘이 있는데, 2027년에는 그 매력이 더 자연스럽게 드러나되, 새로움보다는 이미 알고 있는 사람들과의 호흡이 더 안정적으로 이어지기 쉬워요.\n\n실제로는 연락의 템포가 편해지고, 굳이 설명하지 않아도 통하는 대화가 늘어날 수 있습니다. 다만 8월경에는 이동감이 커지고 관계의 결이 바뀌는 느낌이 들어, 만나고 헤어지는 것보다 ‘어떤 거리감이 나에게 맞는가’를 다시 보게 될 수 있어요. 11월경에는 사람과의 연결이 더 또렷해지지만, 가까움이 곧 부담이 되지 않도록 여유를 남겨두는 편이 좋습니다.\n\n작은 제안은, 관계를 넓히기보다 깊이를 살펴보는 거예요. 지수님에게 올해는 많은 사람보다 편안한 몇 사람과의 리듬이 더 중요할 수 있습니다. 상대에게 맞추느라 속도를 올리기보다, 내 말의 온도를 일정하게 두는 연습이 관계를 부드럽게 만들어 줘요."
   },
   "career": {
    "heading": "일은 쌓고, 드러내고, 다듬는 해",
    "body": "일과 커리어에서는 2027년이 지수님의 에너지를 바깥으로 잘 흘려보내는 해처럼 보여요. 표현과 생산이 늘어나는 시기가 있어, 맡은 일을 보여주거나 결과물을 내놓는 데 유리한 흐름이 생기기 쉽습니다. 태양 같은 성향과 결집형 기질은 목표가 분명할수록 강해지니, 올해는 ‘내가 무엇을 내보낼지’를 정하는 것이 중요해요.\n\n현실 장면으로는 발표, 공유, 정리, 기획처럼 결과를 밖으로 드러내는 일이 늘 수 있어요. 6~9월경에는 익숙한 방식으로 잘 해내지만, 8월에는 이동이나 방향 전환 같은 변수가 살짝 섞일 수 있으니, 일정과 약속을 넉넉하게 잡는 편이 편합니다. 10~11월경에는 주도권과 성과를 밀어붙이기 좋은 흐름이 오지만, 욕심이 커지면 오히려 힘이 분산될 수 있어요.\n\n작게 시작하려면, 한 가지 일에 ‘보여줄 형태’를 먼저 정해보세요. 보고서, 발표, 포트폴리오, 정리 노트처럼 결과를 눈에 보이게 만드는 방식이 잘 맞습니다. 올해는 많이 벌리기보다, 한 번 만든 것을 정돈해 재사용하는 습관이 지수님에게 특히 어울려요."
   },
   "study": {
    "heading": "배움은 도움을 받아 깊어지는 해",
    "body": "배움의 흐름은 초반에 압박감이 조금 들어오다가, 중반부터는 훨씬 부드럽게 풀리는 편이에요. 2027년은 지수님이 이미 가진 이해력을 바탕으로, 주변의 도움이나 자료, 스승 같은 요소를 통해 한 단계 정리해 나가기 좋은 해로 보입니다. 화의 에너지가 강한 편이라 속도는 빠를 수 있지만, 올해는 빠르게 익히는 것보다 오래 남는 방식이 더 중요해요.\n\n일상에서는 새 수업을 듣거나, 기존에 해오던 공부를 다시 정리하는 장면이 어울립니다. 2~3월경에는 책임감이 늘어 공부량이 부담처럼 느껴질 수 있고, 4~5월경에는 도움이나 회복의 흐름이 들어와 “아, 이렇게 하면 되겠구나” 하는 감이 살아나기 쉬워요. 12월~다음 해 1월에도 다시 정리와 점검의 흐름이 오니, 끝까지 완주하는 감각이 중요합니다.\n\n작은 제안은 ‘한 번에 많이’보다 ‘짧게 자주’예요. 지수님에게는 메모를 요약하고, 배운 것을 말로 다시 설명해보는 방식이 잘 맞을 수 있습니다. 올해의 배움은 새로운 지식 자체보다, 이미 아는 것을 더 안정적으로 연결하는 데서 빛이 나요."
   },
   "health": {
    "heading": "리듬을 고르게 하는 돌봄",
    "body": "몸과 마음의 리듬에서는 올해가 비교적 익숙하게 흐르지만, 새 자극이 적은 대신 스스로의 템포를 잘 관리해야 편한 해로 읽혀요. 화의 기운이 강한 지수님에게 2027년은 에너지가 잘 살아나는 편이지만, 그만큼 생활 리듬이 들쭉날쭉해지면 피로감이 누적되기 쉬울 수 있습니다. 그래서 올해는 ‘더 움직이기’보다 ‘고르게 쓰기’가 핵심이에요.\n\n일상 장면으로는 하고 싶은 일이 많아 한 번에 몰아서 처리하거나, 반대로 집중이 붙으면 쉬는 타이밍을 놓치는 식의 흐름이 보일 수 있어요. 2~3월경에는 책임이 늘면서 긴장감이 올라갈 수 있고, 8월에는 이동이나 일정 변화로 하루의 리듬이 흔들리기 쉬워 보입니다. 반대로 6~7월경에는 익숙하고 편안한 흐름이 와서, 회복과 재정비에 유리합니다.\n\n작게 시작한다면, 잠드는 시간과 일어나는 시간을 너무 크게 흔들지 않는 것부터 해보세요. 식사, 걷기, 잠깐의 휴식처럼 반복 가능한 습관을 한두 개만 고정해도 올해의 에너지가 훨씬 안정적으로 느껴질 수 있어요. 지수님에게는 ‘열심히’보다 ‘꾸준히’가 더 좋은 보호막이 됩니다."
   }
  },
  "months": [
   {
    "headline": "책임을 고르는 달",
    "body": "초반에는 책임과 압박이 늘 수 있지만, 속도를 조절하면 오히려 단단해지기 좋아요. 서두르기보다 우선순위를 정하는 쪽이 편합니다."
   },
   {
    "headline": "긴장 속 정돈",
    "body": "비슷한 압박감이 이어지면서도, 할 일을 나누어 보면 생각보다 안정적일 수 있어요. 한 번에 다 잡기보다 순서를 두는 달입니다."
   },
   {
    "headline": "도움이 들어오는 때",
    "body": "배움이나 회복의 기운이 들어와 숨이 트이기 쉬워요. 누군가의 조언이나 자료가 의외로 큰 도움이 될 수 있습니다."
   },
   {
    "headline": "기초가 살아나는 달",
    "body": "힘이 채워지면서 기본기가 또렷해지기 좋아요. 작은 성취를 쌓아두면 이후 흐름이 훨씬 부드럽습니다."
   },
   {
    "headline": "편안한 중심",
    "body": "익숙한 결이 살아나 안정감이 커지기 쉬워요. 새로움보다 지금 가진 것을 잘 쓰는 쪽이 어울립니다."
   },
   {
    "headline": "자신감이 차는 시기",
    "body": "에너지가 강해지고 주도권도 또렷해지기 좋아요. 다만 무리해서 속도를 올리기보다, 리듬을 일정하게 두는 편이 좋습니다."
   },
   {
    "headline": "움직임이 커지는 달",
    "body": "이동감이 들어와 일정이나 관계의 방향이 바뀔 수 있어요. 부딪힘이 있어도 전환의 계기로 받아들이면 가볍습니다."
   },
   {
    "headline": "표현이 많아지는 달",
    "body": "내가 만든 것, 내가 한 일이 바깥으로 드러나기 쉬워요. 다만 에너지 소모도 커질 수 있어 쉬는 시간을 함께 챙기면 좋습니다."
   },
   {
    "headline": "성과를 밀어붙일 때",
    "body": "주도권과 결과를 잡고 싶어지는 흐름입니다. 과하게 몰아붙이기보다, 끝맺음을 깔끔하게 하는 쪽이 더 유리해요."
   },
   {
    "headline": "결과를 다듬는 달",
    "body": "성과와 재물 쪽 감각이 또렷해지기 쉬워요. 다만 욕심이 커지면 판단이 빨라질 수 있으니 한 번 더 확인하면 좋습니다."
   },
   {
    "headline": "붙잡음과 정리",
    "body": "관계나 일에서 가까워짐과 정리가 함께 느껴질 수 있어요. 어울림이 생길수록 경계도 함께 살피는 편이 편합니다."
   },
   {
    "headline": "다시 책임으로",
    "body": "연말로 갈수록 다시 책임감이 올라오며 마무리 정리가 중요해져요. 다음 해를 위해 속도를 조금 낮추고 점검하는 달입니다."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 속도 조절하기",
    "body": "책임과 도움의 흐름이 번갈아 들어오니, 한 번에 다 해내려 하기보다 우선순위를 적어두는 습관이 좋아요. 해볼 행동은 하루 시작 전에 ‘오늘 꼭 할 일 3개’만 정하는 것입니다."
   },
   {
    "title": "5~7월경: 중심을 세우기",
    "body": "편안함과 자신감이 함께 올라오는 구간이라, 익숙한 방식이 잘 먹히는지 살펴보면 좋아요. 해볼 행동은 반복해서 쓰는 문서, 메모, 루틴을 하나 정리해 두는 것입니다."
   },
   {
    "title": "8~10월경: 바깥으로 내보내기",
    "body": "표현과 생산이 늘고 이동감도 섞이니, 결과물을 보여줄 타이밍을 잘 고르는 것이 중요해요. 해볼 행동은 작업물이나 생각을 한 번 정리해 외부에 공유할 형태로 다듬는 것입니다."
   },
   {
    "title": "11월~다음해 1월경: 마무리와 점검",
    "body": "성과를 다듬고 책임을 정리하는 흐름이 이어지니, 욕심보다 완성도를 살피는 쪽이 편합니다. 해볼 행동은 올해 한 일들을 짧게 돌아보며 ‘유지할 것 1개, 줄일 것 1개’를 적어보는 것입니다."
   }
  ],
  "closing": "지수님에게 2027년은 새로움을 쫓기보다, 이미 가진 밝은 힘을 더 안정적으로 쓰는 해로 보입니다. 너무 빠르게 달리기보다 리듬을 고르게 두면, 편안함 속에서 의외로 큰 정리가 일어나기 쉬워요. 올해의 핵심은 ‘많이’가 아니라 ‘잘’에 가깝습니다."
 },
 "en": {
  "year": 2027,
  "title": "2027, Your Warm Momentum",
  "subtitle": "A year of familiar fire, steady pace, and small but meaningful shifts",
  "overview": "2027 feels like a year that matches your inner temperature, Jisoo. Because the year’s energy is close to your own, it can feel comfortable, natural, and easy to settle into. At the same time, that familiarity may also mean fewer dramatic surprises, so the year tends to reward steady choices more than bold leaps.\n\nYour chart leans strongly toward Fire, with some Wood to support it and only a little Water and Earth to balance it out. That makes this year especially useful for noticing where you already shine, while also learning how to pace yourself, simplify, and leave room for recovery. The overall mood is not about forcing change, but about refining how you use your energy.\n\nThe year also carries a sense of advancement, so even when things feel ordinary, there is often quiet forward movement underneath. You may notice that progress comes most smoothly when you keep your rhythm clear, avoid overfilling your schedule, and let small improvements count. In that way, 2027 can become a year of warm confidence rather than loud transformation.",
  "chapters": {
   "wealth": {
    "heading": "Money: Steady Hands, Clear Priorities",
    "body": "For money matters, 2027 looks better for shaping and directing what you already have than for chasing something flashy. The year’s fire-like quality can make goals feel vivid and motivating, but your chart already has plenty of that energy, so the best results may come from choosing focus over impulse. This is a year to make your resources feel more intentional, not more intense.\n\nIn daily life, that could look like noticing a few moments when spending feels emotionally satisfying but not especially useful, or when you feel tempted to speed up a decision just because the timing feels lively. Jisoo, the clearest opportunities may come through simple organization: reviewing recurring costs, comparing options calmly, or giving yourself a pause before committing.\n\nA good first step is to set one small money routine that feels easy to keep, such as a weekly check-in or a short list of priorities. If you keep the pace moderate, this year can support a steadier relationship with resources and a clearer sense of what truly matters."
   },
   "love": {
    "heading": "Love: Warmth With Room to Breathe",
    "body": "In relationships, 2027 feels warm, expressive, and familiar, which can make it easier to connect without overthinking. Because the year mirrors your own core energy, affection may come naturally, but new sparks may need a little more intentional space. The most supportive relationships this year are likely to be the ones that feel both lively and easy to return to.\n\nYou may find yourself drawn to people, conversations, or plans that feel bright and immediate, while also noticing that too much heat at once can leave little room for listening. A conversation may go especially well when you slow down just enough to hear what is being implied, not only what is being said. Shared activities, small gestures, and consistent attention may matter more than dramatic declarations.\n\nA gentle practice is to create one regular moment for honest check-ins, whether with a partner, a close friend, or someone you are getting to know. The year supports warmth best when it is paired with patience, so let connection unfold at a pace that stays comfortable for both sides."
   },
   "career": {
    "heading": "Work: Visible Progress, Measured Pace",
    "body": "Career-wise, this year can feel active and recognizable, with a sense that your efforts are easier to notice. The fire energy supports initiative and presence, and your strong Fire makeup suggests you may naturally step into visible roles or take the lead when something needs momentum. Still, because the year feels close to your own nature, results may depend more on consistency than on reinvention.\n\nAt work, you may encounter periods when people expect you to carry more, speak up more, or move faster. That can be productive, especially when you choose your priorities carefully, but it may also be easy to overcommit simply because you can handle a lot. The most useful question may be not “Can I do this?” but “What is worth my energy right now?”\n\nA practical move is to keep one short list of top priorities and review it before saying yes to new requests. If you treat visibility as a chance to simplify rather than impress, this year can help you build trust through calm competence."
   },
   "study": {
    "heading": "Learning: Fast Insight, Better With Structure",
    "body": "For learning, 2027 brings a lively, responsive kind of growth. Fire energy often favors quick understanding, inspiration, and the urge to engage right away, and your chart suggests you may learn best when you can feel the subject actively lighting you up. The challenge is not lack of ability, but making sure interest turns into something that lasts.\n\nYou may notice that certain topics come quickly at first, then fade if they are not anchored in a routine or repeated practice. That can show up as enthusiastic starts, strong notes, or a burst of curiosity followed by a drop in follow-through. The year is especially friendly to learning that includes examples, discussion, and immediate application.\n\nA useful experiment is to pair every new idea with one small output: a summary, a voice note, a practice question, or a simple teaching moment to someone else. That way, what you learn has somewhere to land. For Jisoo, the year supports learning that is active, visible, and steadily repeated."
   },
   "health": {
    "heading": "Body and Mind: Keep the Flame Even",
    "body": "For your overall rhythm, 2027 asks for balance more than intensity. With so much Fire in your makeup, it can be easy to run hot, stay engaged for too long, or fill your days with more movement than your system really needs. This year does not call for shutting down; it asks for a steadier flame, one that burns clearly without being stretched thin.\n\nIn everyday life, that may look like feeling energized at first and then realizing you need more recovery than you planned, or noticing that your mood stays better when your schedule has pockets of quiet. You may also find that simple, repeatable habits feel more supportive than ambitious resets. Sleep rhythm, regular meals, time away from screens, and short pauses between tasks can make a noticeable difference.\n\nA good starting point is to choose one small recovery habit and protect it as if it were part of your work. Even ten minutes of stillness, stretching, or uninterrupted breathing can help the year feel more spacious. If you let rest be practical rather than optional, the year tends to feel smoother overall."
   }
  },
  "months": [
   {
    "headline": "New Ground, New Pace",
    "body": "February asks for responsibility and a slightly more disciplined rhythm. Starting small and staying steady may feel far more effective than trying to do everything at once."
   },
   {
    "headline": "Pull of Attention",
    "body": "March can bring visibility and a stronger sense of being noticed. It is a good time to stay centered, because charm works best when it is paired with clear boundaries."
   },
   {
    "headline": "Support Arrives",
    "body": "April feels more nourishing, with help, learning, or recovery easier to receive. Even if the pace is uneven, it is a good month to accept assistance without overexplaining."
   },
   {
    "headline": "Strong Effort, Clearer View",
    "body": "May asks for effort, but it also makes progress easier to see. If you keep expectations realistic, you may find that the work itself becomes more meaningful."
   },
   {
    "headline": "In Full Flow",
    "body": "June feels familiar and powerful, almost like moving on well-worn ground. The comfort is useful, as long as you do not confuse ease with the need to keep pushing."
   },
   {
    "headline": "Quiet Momentum",
    "body": "July continues the same warm current, with advancement showing up in subtle ways. This is a good month to refine rather than reinvent."
   },
   {
    "headline": "Energy in Motion",
    "body": "August brings expression, output, and movement, but it may also ask for more energy than usual. Because the month carries a turning-point feel, pacing and flexibility matter more than forcing a fixed plan."
   },
   {
    "headline": "Give, Then Pause",
    "body": "September can feel productive but slightly draining, especially if you are giving a lot to others. Small pauses and simple follow-through may help keep the month from feeling scattered."
   },
   {
    "headline": "Quiet Control",
    "body": "October favors direction, results, and a clearer grip on what matters. It is a strong time to lead, as long as you avoid the temptation to do too much at once."
   },
   {
    "headline": "Close Contact",
    "body": "November can bring a tighter, more involved atmosphere, with some things coming together in unexpected ways. Staying alert and flexible may help you use the month well."
   },
   {
    "headline": "Pressure Into Structure",
    "body": "December returns to a more demanding tone, asking for patience and a steadier pace. If you simplify your commitments, the month can feel more manageable."
   },
   {
    "headline": "Slow Build",
    "body": "January leans toward quiet preparation rather than immediate results. It is a good time to incubate ideas, keep your footing, and let things develop without rushing them."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: Build the Base",
    "body": "Watch for rising responsibilities and early support arriving at the same time. Try one simple structure, such as a weekly planning hour, so pressure does not turn into scattered effort."
   },
   {
    "title": "May to July: Use Momentum Wisely",
    "body": "Notice when visibility and comfort make you want to do more than necessary. Choose one main goal per week and leave space around it, so your energy stays clean."
   },
   {
    "title": "August to October: Channel Output",
    "body": "Expect a more expressive, active stretch with some turning-point energy. Pick one project to complete and one habit to protect, especially if the pace starts to rise."
   },
   {
    "title": "November to January: Simplify and Reset",
    "body": "Watch for moments when things feel more closely linked or slightly pressurized. A helpful move is to reduce optional tasks and keep one reliable routine that helps you recover."
   }
  ],
  "closing": "Jisoo, 2027 does not ask you to become someone else. It asks you to use your already-strong fire with a little more rhythm, care, and selectivity. When you choose pace over pressure, the year can feel warm, capable, and quietly rewarding."
 },
 "es": {
  "year": 2027,
  "title": "2027, tu ritmo en llama",
  "subtitle": "Un año cálido, familiar y con momentos para ajustar la velocidad",
  "overview": "Jisoo, 2027 se siente como un año de fuego conocido: cercano, cómodo y fácil de reconocer. Como tu energía central también es de fuego, este ciclo suele traer familiaridad más que sorpresa; eso puede dar estabilidad, pero también pedirte que busques estímulos nuevos de manera consciente.\n\nTu distribución muestra mucha presencia de fuego y madera, con poco metal y algo de agua, así que el año tiende a funcionar mejor cuando no intentas hacer todo a la vez. En una carta de tipo Sun · Rooted, la imagen general es la de alguien que brilla mejor cuando tiene base: este año favorece sostener lo ya encendido, ordenar prioridades y dejar que el ritmo madure sin forzarlo.\n\nLa primera parte del año parece más exigente y la segunda más expresiva. Entre abril y julio aparece apoyo, aprendizaje y una sensación de recuperación; entre agosto y noviembre surge más movimiento, producción y toma de iniciativa; y hacia el cierre vuelven las responsabilidades, con una invitación clara a bajar un cambio y consolidar lo recorrido.",
  "chapters": {
   "wealth": {
    "heading": "Dinero: avanzar sin exceso",
    "body": "En lo material, 2027 no se ve como un año de empuje ciego, sino de criterio. La energía del año se relaciona contigo de forma ambivalente: a ratos te simplifica el paso y a ratos te pide disciplina, así que el dinero parece responder mejor cuando hay orden, no cuando hay prisa. Con tanto fuego y poca presencia de metal, conviene cuidar la claridad de números, acuerdos y prioridades.\n\nEn la práctica, esto puede sentirse como revisar gastos con más atención, comparar opciones antes de aceptar compromisos y notar que algunas oportunidades llegan por exposición o por moverte más, sobre todo hacia finales de verano y en otoño. También puede aparecer la tentación de decir sí a demasiadas cosas porque todo parece posible; ahí conviene recordar que una agenda llena no siempre significa un buen margen.\n\nUn inicio suave sería separar una parte para lo fijo, otra para lo flexible y otra para lo que realmente te entusiasma. No hace falta complicarlo: si Jisoo mantiene visibles sus números y se deja un margen de respiración, el año suele premiar más la constancia que el riesgo."
   },
   "love": {
    "heading": "Vínculos: calidez con espacio",
    "body": "En relaciones y afectos, el año tiene un tono bastante reconocible para ti: cercano, cálido y con facilidad para conectar desde lo familiar. Eso puede hacer que te sientas cómodo en vínculos ya conocidos, aunque también puede dejar menos espacio para sorpresas. La clave parece estar en no confundir comodidad con inercia.\n\nDurante varios meses hay momentos de impulso social, magnetismo o movimiento, así que es fácil que aparezcan conversaciones, reencuentros o ganas de mostrar más de ti. Agosto destaca especialmente por traer cambio de ritmo: algo en la forma de vincularte puede moverse, no necesariamente de manera dramática, sino como una invitación a ajustar hábitos, límites o expectativas. Hacia noviembre, el tono se vuelve más cercano y de mayor fusión, lo que puede intensificar la complicidad o hacerte notar más lo que compartes con alguien.\n\nUn paso pequeño y útil sería hablar con más precisión de lo que sí te gusta y de lo que necesitas para estar bien. Si dejas espacio para escuchar y no llenas todos los silencios, el vínculo suele respirar mejor."
   },
   "career": {
    "heading": "Trabajo: mostrar, ordenar, sostener",
    "body": "En trabajo y carrera, 2027 parece dividirse en tres movimientos: primero exigencia, luego apoyo, después visibilidad. Eso suele pedir que no te apresures a definir todo de golpe; más bien, conviene dejar que el año te muestre dónde vale la pena invertir energía. Tu perfil de fuego con base firme favorece liderar cuando ya tienes un marco claro, no cuando todo está aún disperso.\n\nEn lo cotidiano, esto puede verse como semanas en las que te piden más responsabilidad, otras en las que recibes guía o aprendizaje, y más adelante momentos en que tu aporte se vuelve visible para otros. Entre agosto y octubre hay una fase especialmente activa para producir, proponer y mover proyectos, aunque también con mayor desgaste si no administras bien el esfuerzo. En noviembre, la energía se vuelve más propicia para tomar iniciativa con sentido práctico, pero sin sobrecargar el tablero.\n\nUna forma amable de aprovecharlo es revisar qué tareas te dan brillo y cuáles solo consumen combustible. Si eliges bien dónde poner tu fuerza, el año puede dejar una sensación de avance sólido, no de carrera frenética."
   },
   "study": {
    "heading": "Aprendizaje: absorber antes de acelerar",
    "body": "En estudio y aprendizaje, el año favorece mucho más la integración que la acumulación. Como ya traes bastante fuego, aprender te puede sentar mejor cuando hay método, repetición y una dosis de pausa para que lo nuevo se asiente. La parte más fértil del año parece llegar cuando aceptas recibir ayuda, guía o corrección sin sentir que eso reduce tu autonomía.\n\nEn la vida diaria, esto puede parecerse a releer apuntes, volver a una base que ya conocías o descubrir que una explicación simple te ordena ideas que estaban dispersas. Los meses de abril y mayo se ven especialmente buenos para asimilar, practicar y recuperar confianza; agosto y septiembre, en cambio, pueden empujarte a producir más que a escuchar, así que allí conviene no confundir velocidad con comprensión. Jisoo, si estudias algo nuevo, te irá mejor si lo conviertes en hábito pequeño y constante.\n\nUna estrategia sencilla sería fijar una rutina breve y repetible, con un espacio concreto para repasar. Aprender este año parece menos una carrera de fondo que una serie de pasos bien elegidos."
   },
   "health": {
    "heading": "Cuerpo y ánimo: bajar un poco el fuego",
    "body": "En cuidado personal, el año no pide alarmas, sino regulación. Con tanta energía de fuego y una base bastante estable, el riesgo no parece ser la falta de impulso, sino el exceso de intensidad sostenida. Por eso, 2027 se vive mejor cuando alternas momentos de acción con pausas reales, aunque sean cortas.\n\nEn lo cotidiano, esto puede notarse como días en los que vas muy encendido, con muchas ideas y ganas de resolverlo todo, y otros en los que el cuerpo o el ánimo agradecen menos estímulo. Los tramos de febrero y marzo marcan una exigencia mayor, mientras que abril, mayo y parte de junio se sienten más nutritivos; hacia agosto y septiembre vuelve el gasto de energía por movimiento y producción, así que ahí conviene cuidar la regularidad de sueño, comida y descanso, sin volverlo rígido.\n\nUn gesto pequeño que puede ayudarte mucho es reservar un espacio fijo para desconectar sin pantallas o sin tareas. No se trata de hacer menos por obligación, sino de sostener tu brillo con más suavidad."
   }
  },
  "months": [
   {
    "headline": "Base nueva",
    "body": "Febrero trae una energía de comienzo con presión: hay terreno nuevo y ganas de responder bien. Conviene avanzar paso a paso, porque la prisa puede hacer que gastes más de lo necesario."
   },
   {
    "headline": "Pulso exigente",
    "body": "Marzo mantiene el tono de renovación bajo demanda, con magnetismo y más responsabilidad a la vez. Es un mes bueno para ajustar ritmo y no prometer más de lo que puedes sostener."
   },
   {
    "headline": "Apoyo claro",
    "body": "Abril se siente más nutritivo: aparece ayuda, aprendizaje y una sensación de alivio. Lo que antes costaba empieza a ordenarse si aceptas recibir guía."
   },
   {
    "headline": "Esfuerzo útil",
    "body": "Mayo pide bastante entrega, pero también deja ver resultados concretos. La exposición aumenta, así que es mejor mostrar lo que ya está bastante trabajado."
   },
   {
    "headline": "Calor estable",
    "body": "Junio trae una calma potente, familiar y cómoda. Es un buen momento para consolidar lo que ya funciona y evitar moverlo todo por impulso."
   },
   {
    "headline": "Subida lenta",
    "body": "Julio conserva la sensación de ascenso, aunque con ritmo más pausado. Lo que avances aquí se apoya más en continuidad que en grandes gestos."
   },
   {
    "headline": "Giro visible",
    "body": "Agosto activa movimiento y cambio de dirección, con una energía que empuja a expresar y producir. Como además toca una zona sensible de tu carta, conviene observar qué hábito, vínculo o plan pide reajuste."
   },
   {
    "headline": "Salida al mundo",
    "body": "Septiembre continúa con mucha producción y más intercambio con el entorno. Es fácil dar mucho, así que ayuda poner límites suaves para no vaciarte."
   },
   {
    "headline": "Toma de mando",
    "body": "Octubre favorece la iniciativa, la gestión y el impulso de resultados. Si eliges bien tus batallas, puedes sentir más control sobre el rumbo."
   },
   {
    "headline": "Unión práctica",
    "body": "Noviembre trae una energía de ajuste fino y mayor cercanía con lo que ya tienes entre manos. Lo que se une aquí puede darte foco, siempre que no te disperses."
   },
   {
    "headline": "Peso y forma",
    "body": "Diciembre vuelve a pedir responsabilidad y paciencia, con cierta fricción que invita a ordenar. Es mejor ir por lo importante que tratar de resolverlo todo."
   },
   {
    "headline": "Cierre sereno",
    "body": "Enero de 2028 abre con un tono de incubación: menos prisa, más preparación. Lo que se está gestando ahora gana fuerza si no lo obligas a salir antes de tiempo."
   }
  ],
  "action_plan": [
   {
    "title": "Febrero a abril: ordenar la base",
    "body": "Observa dónde se te acumula presión y qué tareas realmente requieren tu energía. Haz una lista corta de prioridades y elige una sola rutina de apoyo para sostenerte mejor."
   },
   {
    "title": "Mayo a julio: recibir y consolidar",
    "body": "Fíjate en qué ayuda, aprendizaje o contacto te deja más claridad. Prueba a cerrar cada semana con una revisión breve de lo que sí avanzó, aunque haya sido poco."
   },
   {
    "title": "Agosto a octubre: mover con criterio",
    "body": "Vigila el exceso de actividad y el impulso de decir sí por entusiasmo. Elige un proyecto principal y un límite concreto de tiempo o energía para no dispersarte."
   },
   {
    "title": "Noviembre a enero: cerrar y preparar",
    "body": "Pon atención a lo que pide unión, ajuste o redefinición, sin forzarlo. Haz una limpieza suave de pendientes y deja una intención simple para arrancar el año siguiente con más espacio."
   }
  ],
  "closing": "2027 no parece pedirte que te reinventes por completo, sino que te conozcas mejor mientras avanzas. Cuando tu fuego se ordena, Jisoo, puede iluminar mucho sin agotarse tanto. Si este año aprendes a dosificar, elegir y pausar, la sensación final puede ser la de un brillo más firme y más tuyo."
 }
};
