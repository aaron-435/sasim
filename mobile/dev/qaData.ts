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
 "casey": {
  "content": {
   "title_line1": "Tu mente no apaga el turno",
   "title_line2": "y tu energía se queda revisando lo que ya terminó.",
   "subtitle": "Informe profundo de agotamiento — saju × psicología × acompañamiento integrado, módulo 3",
   "opening_scene": "Es lunes por la mañana y los mensajes ya están encendidos antes que tú. Abres la pantalla con la sensación de que el día te está pidiendo algo que todavía no acabó de empezar. Terminas una tarea y, aun así, tu cabeza vuelve al principio para revisar si quedó algo fuera de sitio. Casey, tus días últimamente se ven así, ¿no es así?",
   "case_tag": "CASO DE EJEMPLO — Laura, treintañera, con trabajo exigente",
   "case_paragraphs": [
    "Laura termina una presentación y, en vez de cerrar el archivo, vuelve a mirar cada línea como si todavía faltara una corrección escondida. Su mente se queda pegada al detalle y el descanso nunca le sabe a descanso. Su mapa muestra madera fuerte y agua baja, así que también le cuesta soltar lo que ya quedó hecho. Tú también podrías reconocerte en esa forma de seguir dentro del día aunque el día ya terminó."
   ],
   "oheng_intro": "Tu madera en 38% y tu metal en 38% pesan más que el resto, y esa combinación empuja a seguir ordenando, empujando y controlando lo pendiente. Tu agua en 0% deja justo más débil la parte que suelta, expresa y vacía la presión acumulada. En el agotamiento, eso se nota como una mente que sigue trabajando aun cuando el cuerpo ya pidió pausa.",
   "quiz_reading": "Tu 82% en perfeccionismo dibuja una mente que no suelta el trabajo cuando ya terminó. Tu 34% en recuperación explica por qué un día libre no te baja la tensión del todo. En tu tipo Quien termina todo y se agota, la imagen central no es falta de capacidad, sino exceso de revisión y poca bajada de ritmo.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Madera fuerte — empujar hasta dejarlo perfecto",
     "body": "Tu madera en 38% hace que el trabajo nunca se quede solo en hacer: también quieres que quede bien plantado, claro y útil. En agotamiento, eso se convierte en revisar una vez más, corregir una vez más y seguir empujando aunque ya no quede margen. Por eso los mensajes del lunes por la mañana no solo te avisan algo: te reactivan la urgencia de poner todo en orden otra vez. Y tú sientes que parar un poco podría dejar algo importante fuera de lugar."
    },
    "fire": {
     "heading": "🔥 Fuego bajo — chispa breve, gasto rápido",
     "body": "Tu fuego en 13% no sostiene una llama larga; aparece en ráfagas cortas y luego baja. En este módulo, eso se ve en momentos de impulso para resolverlo todo de golpe y en la caída que viene después. No es que no tengas energía para arrancar, sino que la salida se consume rápido cuando intentas mantenerla encendida demasiado tiempo. Y entonces el cansancio llega con una ansiedad pequeña, pero insistente."
    },
    "earth": {
     "heading": "⛰️ Tierra baja — sostener sin base suficiente",
     "body": "Tu tierra en 13% muestra que el sostén existe, pero no se queda quieto mucho tiempo. En un día de trabajo cargado, eso se nota cuando acumulas tareas y luego te derrumbas de golpe. La base alcanza para aguantar un tramo, pero no para amortiguar toda la presión que vas guardando. Por eso el descanso te toca, pero no termina de asentarse en el cuerpo."
    },
    "metal": {
     "heading": "💎 Metal fuerte — ordenar incluso cuando ya toca parar",
     "body": "Tu metal en 38% te da una capacidad muy visible para revisar, corregir y dejar las cosas limpias. En agotamiento, esa misma fuerza puede hacer que cierres una tarea y, al minuto siguiente, ya estés volviendo a abrirla mentalmente. Los mensajes del lunes por la mañana encuentran justo esa parte tuya que sigue afinando, aunque por dentro ya estés al límite. Tu mente no quiere dejar huecos, y por eso el descanso se te llena de comprobaciones."
    },
    "water": {
     "heading": "💧 Agua baja — vaciar la presión sin quedarte en blanco",
     "body": "Tu agua en 0% deja muy débil la parte que expresa, descarga y afloja la tensión acumulada. En este módulo, eso explica por qué descansas, pero el descanso no se siente como descanso. Tu metal fuerte empuja tanto hacia la revisión que el agua, que debería ayudar a soltar, no alcanza a hacer ese trabajo. Y ahí aparece la sensación de seguir llena de ruido aunque todo esté quieto por fuera."
    }
   },
   "upcoming_period_heading": "De los 41 a los 50 años, llega un ciclo de diez años con más metal",
   "upcoming_period_body": "De los 41 a los 50 años, la energía de metal gana fuerza y te vuelve todavía más preciso con lo que haces. Si hoy ya tiendes a revisar, en ese tramo esa capacidad puede transformarse en criterio fino, orden sólido y decisiones más limpias. La clave será no usar esa lucidez solo para apretar más, sino también para elegir mejor qué sí merece tu energía. Si aprendes a cerrar a tiempo, ese período puede darte estructura sin dejarte perdido en la revisión infinita.",
   "cross_analysis_quotes": [
    "Cuando tu madera y tu metal están tan altos, el perfeccionismo no se ve como capricho: se ve como una alarma que no quiere dejar nada a medias. Por eso vuelves a revisar desde el principio, incluso después de terminar, y tu día se llena de segundos cierres. Lo que parece detalle es en realidad una mente que no tolera bien la sensación de inconcluso.",
    "Tu agua en 0% deja sin descarga natural a esa tensión, y por eso la recuperación baja no solo se siente lenta: se siente incompleta. Descansas, pero algo dentro sigue pidiendo comprobación, como si cerrar los ojos no bastara para cerrar el turno. Ahí es donde tu agotamiento y tu recuperación baja se tocan de frente."
   ],
   "answer_notes": [
    "Volver al principio después de terminar muestra que tu estándar no se conforma con entregar; también quiere asegurarse de que nada se escape. En el día a día, eso aparece como abrir otra vez lo que ya cerraste, solo para mirar una vez más. Si te pasa, no significa que no avances; significa que tu mente pide cierre total antes de soltar.",
    "Sentir inquietud incluso en un día libre enseña que tu descanso todavía no encuentra una puerta clara para entrar. Por eso puedes estar sin tareas y, aun así, seguir con el cuerpo atento a algo pendiente. Si elegiste esa respuesta, estás viendo con mucha honestidad que tu recuperación necesita más que una pausa breve."
   ],
   "chat_snapshot_note": "Lo que contaste sobre descansar, pero no sentirlo como descanso, va directo al centro de tu cansancio. Y cuando dices que también aparece un poco de ansiedad, se nota que el problema no es solo el esfuerzo, sino la dificultad para bajar del todo. La frase que te deja más claro es esta: no todo descanso se siente igual por dentro.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque llegan justo donde tu mente aún quiere seguir organizando. Esa fricción encaja con tu metal fuerte y con tu perfeccionismo alto, que se encienden rápido cuando aparece algo pendiente. No es solo un aviso; para ti suena como una nueva exigencia antes de haber aterrizado el día.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte sigue una secuencia muy nítida: aprietas, sostienes, sigues, y de pronto el cuerpo corta. En medio de ese ciclo, tú eliges aguantar un poco más porque te da miedo quedarte atrás si paras. Un primer desvío pequeño sería bajar la intensidad antes del derrumbe, aunque solo sea unos minutos.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras no habla de debilidad, sino de cuánto valoras mantener tu sitio. Debajo de ese miedo hay una necesidad muy humana de no perder ritmo ni oportunidad. Si lo miras con cuidado, verás que no estás pidiendo correr más; estás pidiendo sentir que parar no te borra.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "Tu 82% en perfeccionismo y tu 34% en recuperación dibujan una combinación muy concreta: revisas lo hecho incluso después de terminarlo y te cuesta bajar la activación aunque el día ya aflojara. Esa lectura encaja con lo que contaste, porque los mensajes del lunes por la mañana te vuelven a encender justo cuando creías haber cerrado. No es una falta de esfuerzo; es una mente que no suelta a tiempo y un cuerpo que tarda en recibir la señal de que ya puede bajar la guardia.",
   "psychology_takeaway": "Tu problema no es que hagas poco; es que tu mente no sabe soltar a tiempo. Cuando aprender a cerrar vale tanto como empezar, el descanso por fin empieza a sentirse real.",
   "strengths": [
    {
     "title": "Constancia fina",
     "body": "Tu perfeccionismo alto trae una capacidad muy valiosa para detectar detalles que otros pasan por alto. En el trabajo, eso se ve cuando revisas otra vez lo que ya entregaste y dejas el resultado más pulido. Bien usado, ese rasgo te da calidad real y una firma muy clara en lo que haces."
    },
    {
     "title": "Alerta sensible",
     "body": "Tu recuperación baja también muestra una sensibilidad muy fina a los cambios de tensión. Notas rápido cuándo algo te vuelve a activar, como pasa con los mensajes del lunes por la mañana. Esa detección temprana te puede ayudar a frenar antes de llegar al derrumbe."
    },
    {
     "title": "Empuje sostenido",
     "body": "Con madera y metal en 38%, tienes una fuerza notable para seguir adelante cuando hay presión. Eso explica por qué puedes acumular tanto y aun así mantenerte funcionando durante un tramo largo. Esa resistencia, bien cuidada, te permite sostener proyectos que piden orden y continuidad."
    },
    {
     "title": "Autoobservación clara",
     "body": "Tus respuestas muestran que sabes mirar con honestidad lo que te pasa. Decir que vuelves a revisarlo todo y que incluso en descanso sientes inquietud no es poca cosa. Esa claridad te da un punto de partida muy real para ajustar tu ritmo sin inventarte una versión más cómoda de ti."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión infinita",
     "body": "Tu mente tiende a volver a lo ya hecho como si siempre faltara una última capa. Eso hace que cerrar una tarea no se sienta como cierre, sino como una pausa provisional. En un día cargado, ese hábito roba espacio a la descarga y deja el cansancio más pegado."
    },
    {
     "title": "Descanso tenso",
     "body": "Tu agua en 0% deja el descanso con poca capacidad para absorber la presión del día. Puedes parar físicamente y, aun así, seguir con el cuerpo en guardia. Por eso el reposo no termina de bajar hasta el fondo."
    },
    {
     "title": "Acumulación brusca",
     "body": "Tu patrón de acumular y luego derrumbarte muestra que sostienes mucho durante demasiado tiempo. En apariencia aguantas bien, pero por dentro vas juntando tensión hasta que cae de golpe. Ese modo de funcionar vuelve más difícil medir el límite antes de pasarlo."
    },
    {
     "title": "Miedo a frenar",
     "body": "Tu miedo a quedarte atrás si paras hace que la pausa se sienta arriesgada. Entonces eliges seguir, incluso cuando ya te vendría bien bajar un poco. Lo importante aquí no es convencerte de parar más por fuerza, sino ayudarte a ver que frenar un rato no te saca del mapa."
    }
   ],
   "fit_good": "Te va mejor un trabajo con prioridades claras y cierres visibles. Un día ordenado, con bloques definidos y poco ruido de última hora, te ayuda a usar tu metal sin convertirlo en revisión infinita. También te conviene un entorno donde puedas terminar algo y pasar de verdad a la siguiente cosa, sin quedarte en la comprobación.",
   "fit_bad": "Te desgasta un entorno con mensajes constantes, cambios de último minuto y presión por responder al instante. Un lunes así te deja la mente abierta todo el día, como si nunca pudieras bajar la guardia. También te pesa cualquier espacio donde se premie estar siempre disponible más que terminar bien.",
   "behavior_guides": [
    {
     "title": "Cierre breve",
     "body": "Cuando termines una tarea, dedica dos minutos a una sola revisión final y luego cierra el archivo. Hazlo cada vez que acabes algo importante, no solo cuando sientas dudas. Ese límite pequeño le enseña a tu mente que cerrar también cuenta como logro."
    },
    {
     "title": "Pausa con nombre",
     "body": "Antes de abrir mensajes por la mañana, espera cinco minutos y respira sin tocar la pantalla. Hazlo especialmente los lunes, cuando sabes que la tensión sube antes de tiempo. Esa pausa corta separa el aviso del arranque y te ayuda a no entrar ya acelerada."
    },
    {
     "title": "Descanso visible",
     "body": "Reserva un tramo de veinte minutos sin tareas ni comprobaciones y deja el equipo lejos de la vista. Repite ese tramo una vez al día durante una semana para que tu cuerpo asocie parar con algo concreto. La clave no es descansar más, sino descansar de una forma que tu sistema pueda reconocer."
    },
    {
     "title": "Límite de revisión",
     "body": "Elige una tarea al día que solo puedas revisar una vez, no más. Escríbelo antes de empezar para que la regla quede clara y no dependa del humor del momento. Con eso entrenas a tu metal para terminar sin volver atrás y otra vez."
    }
   ],
   "mindset_guide": "Piensa en tu energía como en un tanque de combustible de un coche que siempre quiere dar una vuelta más antes de entrar en la estación. Si sigues hasta vaciarlo por completo, luego el arranque cuesta mucho más. Mejor parar un poco antes y volver a salir con margen. Tu semana no necesita una última vuelta perfecta; necesita una salida que no te deje seco.",
   "closing_title": "Cerrar también es avanzar",
   "closing_body": "No necesitas convencerte de hacer más; necesitas aprender a soltar antes de agotarte. Tu fuerza ya está ahí, en tu precisión y en tu capacidad de sostener, pero ahora toca darle un borde al día. La frase que te conviene guardar es esta: terminar también puede ser una forma de cuidarte."
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
 "sam": {
  "content": {
   "title_line1": "When checking never stops, rest turns into another task",
   "title_line2": "You finish the work, but your mind keeps the receipt",
   "subtitle": "Module 3 Burnout deep report — Saju x psych test x counseling integration",
   "opening_scene": "It is late, and your phone lights up with Monday morning messages before you have even finished settling down. You tell yourself you are resting, but one part of you is already replaying what got done, what still needs checking, and what might fall behind. Your body is tired, yet your mind keeps reaching back to the work as if leaving it alone would be dangerous. Sam, your recent nights look exactly like this, don't they?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, a workweek that never fully powers down",
   "case_paragraphs": [
    "Mina leaves her laptop open after dinner and checks one more detail, then one more, then one more. By the time she sits down to rest, the rest already feels spoiled. Her Five Elements are unbalanced in a way that makes pressure feel louder than relief, and that matches the way her day keeps looping back on itself. You would recognize yourself in her before the night is over."
   ],
   "oheng_intro": "Your Five Elements are Wood 25 percent, Earth 25 percent, Metal 25 percent, and Water 25 percent, with Fire at 0 percent. For a Day Master centered on Earth, Wood is one of the equal forces that can press on you through rules, duty, and pressure, and that pressure is easy to feel in this burnout pattern. Fire is absent here, so the part that should soften the edges after work does not have enough presence to turn effort into real recovery.",
   "quiz_reading": "Your score pattern says perfectionism is high at 82 percent, while recovery is low at 34 percent, and that combination is doing exactly what the Finisher's Drain name suggests. You do not just work hard; you keep returning to finished things as if the job is not allowed to end until your mind says so. That is why a day off can still feel tense, with your attention half in the room and half back at the task list.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood balanced — pressure that keeps asking for one more check",
     "body": "Wood sits at 25 percent, so rules, deadlines, and expectations do not stay in the background for you. They step forward, tap your shoulder, and ask whether you are sure you really finished. That fits the way you go back and re-check everything after a task, because pressure does not fade cleanly for you. In burnout, that can make Monday morning messages feel bigger than they are, as if they are already standing in your room."
    },
    "fire": {
     "heading": "🔥 Fire weak — the warmth that helps recovery stay alive",
     "body": "Fire is at 0 percent, so the part that should soften the edges after work has very little room to show up. You can stop, but stopping does not automatically turn into ease, which is why rest can still feel uneasy. The chart shows no Fire to carry that warmth on its own, so recovery has to be built by choice instead of arriving naturally. Without that warmth, you keep going until the crash arrives all at once."
    },
    "earth": {
     "heading": "⛰️ Earth balanced — the part of you that keeps holding the line",
     "body": "Earth is steady at 25 percent, and that gives you a real ability to stay with responsibility until the job is done. You are the kind of person who can carry a full day and still ask whether you missed anything. In this burnout pattern, that becomes the force that keeps you cramming even when you are already tired. It is useful, but it also makes it hard to stop before your body does it for you."
    },
    "metal": {
     "heading": "💎 Metal balanced — the habit of measuring, sorting, and checking",
     "body": "Metal sits at 25 percent, so your mind wants clean edges, clear standards, and a finished result you can trust. That is the part that makes one completed task turn into another round of inspection. You do not just want work done; you want it exact enough that your mind can let go. In a burnout week, that can keep the evening from feeling like evening, because the inner audit is still open."
    },
    "water": {
     "heading": "💧 Water balanced — the current that keeps carrying the worry forward",
     "body": "Water is also at 25 percent, and it gives your mind a strong memory for what might go wrong next. That is why a Monday morning message can hit you before the day has even begun. The worry does not stay in one place; it moves, circles, and returns with new details attached. In your case, that makes rest feel like a pause in motion rather than a true landing."
    }
   },
   "upcoming_period_heading": "From age 40 to 49, Earth becomes stronger",
   "upcoming_period_body": "From age 40 to 49, the steadier side of you gets more support, and work starts to feel less like a race against the clock. That can be a useful time for building structures that do not rely on last-minute effort, especially if you have been living on crunching and crashing. If you begin now, you can practice ending the day before your mind is fully satisfied. Then that later 10-year cycle can feel like consolidation instead of constant recovery.",
   "cross_analysis_quotes": [
    "Your 82 percent perfectionism is not about wanting more work; it is about wanting work to feel safely closed. That is exactly how your Wood shows up here, as pressure that keeps asking whether you are really done. When the mind keeps checking after the task is over, the element pattern and the test result are telling the same story.",
    "Your 34 percent recovery explains why rest does not register as rest. Fire is missing, so the system that should warm you back up after effort never fully turns on. That is why a day off can still feel uneasy, even when nothing is actively demanding you."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that your standards stay active even after the task is completed. You are not careless; you are trying to protect the result from any gap your mind can still spot. That makes you reliable, but it also means finishing does not always feel like finishing to you.",
    "Feeling uneasy even when you rest shows that your body and your mind are not landing at the same time. You can be physically off the clock while your attention keeps waiting for the next signal. That answer points to how hard it is for you to trust stillness once the work has been demanding."
   ],
   "chat_snapshot_note": "You said that you rest, but it never feels like resting, and that lands beside the tired, slightly anxious feeling you described. The important part is not that you cannot stop; it is that stopping does not yet feel safe enough to your mind. That is the line to keep: you are tired, and your mind is still standing guard.",
   "chat_trigger_note": "Monday morning messages hit you so hard because they arrive right where your nervous system is already on alert. They do not just bring information; they restart the pressure that was supposed to end when the day ended. With Wood and Earth sitting at the same level, that kind of signal can still feel like a deadline before breakfast.",
   "chat_repeat_note": "Your pattern is cramming, then crashing, and the crash comes after you have spent too much time acting as if rest can wait. In the middle, you keep pushing because stopping feels like falling behind. A smaller step would be to end work with one deliberate check, then close the loop before your mind offers another one.",
   "chat_fear_note": "The fear underneath this is not laziness or weakness. It is the fear that if you stop, you will lose ground that you cannot easily get back. What you really want is not endless motion; you want confidence that rest will not punish you.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "In burnout research, perfectionism often keeps effort going long after the task itself is complete, because the standard for 'done' keeps moving. Low recovery means the system has trouble switching from performance mode to restoration mode. That is why your mind can stay busy after the work is over, and why a day off can still feel unsettled instead of restorative. The pattern is not that you do not rest; it is that your recovery does not yet get to finish its own job.",
   "psychology_takeaway": "Your mind keeps asking for one more proof, even when the work is already done. The fix is not to care less; it is to let closure arrive before exhaustion does.",
   "strengths": [
    {
     "title": "Finish line focus",
     "body": "You do not leave things half done, and that shows up clearly in the way you go back and re-check everything after finishing a task. That kind of precision is a real asset when work needs accuracy and follow-through. It means people can trust you to catch what others miss, even when you are already tired."
    },
    {
     "title": "Steady endurance",
     "body": "You can keep moving through a full load, which is why cramming is even possible for you in the first place. The same energy that leads to a crash also lets you carry more than many people can for a while. That is strength, even if it needs a better stopping point."
    },
    {
     "title": "Alert judgment",
     "body": "You notice tension early, like the way Monday morning messages can switch your whole system back on. That quick recognition helps you see what is coming before it becomes a bigger mess. Used well, it gives you a chance to set a boundary before the pressure takes over."
    },
    {
     "title": "Responsibility drive",
     "body": "You take responsibility seriously, and that is why the fear of falling behind lands so deeply. You are not drifting; you are trying to stay on top of what matters. In the right environment, that drive becomes reliability people can lean on."
    }
   ],
   "weaknesses": [
    {
     "title": "Open loop",
     "body": "Your mind has trouble treating work as truly finished, so one completed task turns into another pass through the same material. That is why rest can feel interrupted even when nothing new has happened. The loop stays open, and your attention keeps paying the bill."
    },
    {
     "title": "Recovery gap",
     "body": "You can stop your hands before you can stop your mind, and that gap is what makes rest feel uneasy. The problem is not that you refuse to rest; it is that your system does not yet trust the pause. That makes the body tired while the mind stays on duty."
    },
    {
     "title": "Crash cycle",
     "body": "You push hard, then drop hard, which is the shape of cramming and crashing. The effort is real, but the recovery comes too late to soften the fall. That cycle is costly because it turns ordinary workdays into recoveries from the last one."
    },
    {
     "title": "Behind fear",
     "body": "The fear of falling behind can quietly decide your schedule before you do. It makes every pause feel charged, as if a rest moment were already borrowing time from tomorrow. When that fear leads, even quiet evenings stop feeling quiet."
    }
   ],
   "fit_good": "You fit best in work that has a clear end point, a defined handoff, and a manager who respects a closed door. A day with one main deliverable and no endless after-hours checking will suit you better than a role that keeps reopening the same file. You do best when success is measured by completion, not by how long you stayed anxious.",
   "fit_bad": "You struggle in environments that reward being reachable at all hours and keep the inbox active after dinner. A job that turns every message into an immediate expectation can keep your mind from settling, especially if there is no clear boundary for when work is done. You will wear down fast if every finish line is followed by another hidden test.",
   "behavior_guides": [
    {
     "title": "One-close rule",
     "body": "Choose one task each evening and give it one final check, then stop. Do this at the same time every day so your mind learns that closure has a schedule. Keep the check to ten minutes, not thirty, so it stays a boundary instead of becoming another round."
    },
    {
     "title": "Rest cue",
     "body": "When you sit down to rest, put the phone face down for twenty minutes. Do not use that window to catch up on messages or revisit work. Let the first ten minutes be uncomfortable if they need to be, because that is often the moment your mind starts learning a new pattern."
    },
    {
     "title": "Crash buffer",
     "body": "Build a buffer after heavy work days by leaving one small task unfinished until tomorrow. That gives your mind proof that not every day has to end at full capacity. Use that buffer once or twice a week so your energy stops going from all to nothing."
    },
    {
     "title": "Message boundary",
     "body": "Set one fixed time to look at Monday morning messages instead of checking them as soon as they arrive. Pick a ten-minute window and keep it the same for a few weeks. That consistency helps your body stop treating every alert like an emergency."
    }
   ],
   "mindset_guide": "Think of your energy like a workbench, not a conveyor belt. A workbench can hold a task while you stop for a moment. It does not need every project finished in one breath. When you let one task stay closed, you are not falling behind; you are keeping the bench usable for tomorrow.",
   "closing_title": "The work can end before you do",
   "closing_body": "You do not need to prove your worth by staying half on duty after the task is done. The pressure you feel is real, and so is the part of you that wants rest to count. If you remember anything from this page, let it be this: finishing is not the same thing as being finished."
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
 "jordan": {
  "content": {
   "title_line1": "The day you finish, your mind starts again",
   "title_line2": "And the checking never quite lets you rest",
   "subtitle": "Module 3 burnout deep report — Five Elements x psychology x counseling",
   "opening_scene": "It is Monday night, and your phone lights up before you have fully put the work away. You have already finished the task, but your hand still reaches for the screen as if one more check might keep things from slipping. In your head, the same line keeps circling: if you stop, you will fall behind. You look tired, and a little anxious, and even rest still feels like another thing to monitor, Jordan.",
   "case_tag": "Example case — Mina, early 30s, a work sprint that never really ends",
   "case_paragraphs": [
    "Mina sends her last file at 11:40 p.m., then opens it again because the quiet after finishing feels suspicious. She has the same hard Earth-heavy pressure you do, so her day gets built around holding everything in place until she is too drained to hold it anymore. By Monday morning, she is already bracing for messages before they arrive. You would recognize yourself in her before she even says a word."
   ],
   "oheng_intro": "Your Five Elements are heavily weighted toward Earth at 38 percent and Metal at 38 percent, while Wood sits low at 0 percent. Earth is the pressure that presses on you, like rules, duty, and the weight of having to hold everything together. Wood is the part that lets you push things outward, like expression, talent, and energy moving out into the world, and that part is nearly absent here. For your Day Master, Gui Water, Earth is the heavy, blocking force that presses down and constrains you, while Wood is the light, outward-moving force that helps you express and release energy. In a burnout pattern, that shows up as you carrying the structure and the checking, while the release never gets enough room to breathe.",
   "quiz_reading": "Your Finisher's Drain pattern fits the numbers exactly: perfectionism is high at 82 percent, and recovery is low at 34 percent. That means the work does not end when the task ends, because your mind keeps going back to inspect what is already done. So the crash does not come from laziness or lack of care; it comes from a system that keeps spending even after the job is finished.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood weak — the part that needs room to grow",
     "body": "Your Wood is at 0 percent, so the part of you that pushes ideas outward has very little space to move. In a burnout week, that can look like finishing the task and then going back to re-check it instead of letting it breathe. Water is the one thing that helps Wood grow, so the calmer, slower part of you needs actual replenishment before expression can feel natural again. That is why even a real break can still feel unfinished to you, Jordan."
    },
    "fire": {
     "heading": "🔥 Fire moderate — the spark that burns, then drops",
     "body": "Your Fire sits at 13 percent, which is enough to show up, but not enough to stay warm for long. That fits the pattern of cramming hard and then crashing all at once. You can push through a deadline, but the cost lands later, when the body has to collect the bill. In your day, that can feel like one intense burst followed by a heavy blank stretch."
    },
    "earth": {
     "heading": "⛰️ Earth strong — the weight that keeps holding",
     "body": "Your Earth is strong at 38 percent, and that is the part that keeps you responsible, steady, and hard to shake. In burnout terms, it also explains why you keep carrying the task after the task is already done. Monday-morning messages hit this part of you directly, because they sound like another pile of weight being placed back on the table. You do not simply work hard; you keep holding the whole shape of the day in place."
    },
    "metal": {
     "heading": "💎 Metal strong — the scanner that never fully turns off",
     "body": "Your Metal is also strong at 38 percent, so you do not just finish things; you inspect them. That fits the re-checking loop in your answers, where completion does not feel safe until you have looked again. In a workday, this can make your attention sharp and precise, but it can also keep your mind from stepping away. Even rest can start to feel like a room you need to verify before you leave it."
    },
    "water": {
     "heading": "💧 Water moderate — the part that feels the strain first",
     "body": "Your Water is at 13 percent, so the deeper feeling layer is present but not generous. As a Day Master, Water is your center, and that means pressure from Earth can feel especially heavy on you when the week gets packed. In a burnout pattern, that can look like tiredness showing up before relief does. You may be resting, but your system is still listening for the next message."
    }
   },
   "upcoming_period_heading": "From age 31, a hotter cycle begins",
   "upcoming_period_body": "The coming 10-year cycle brings more Fire, and that means your pace can become more visible, more active, and more outwardly driven. For someone with your current pattern, that can be a useful shift if you learn to spend energy in cleaner bursts instead of cramming until you collapse. The best preparation now is to build a finish line that includes stopping, not just completing. If you practice recovery before that cycle arrives, you will meet it with far less strain.",
   "cross_analysis_quotes": [
    "Your strong Earth is the reason you can carry so much, but it is also why your perfectionism keeps asking for one more layer of control. The 82 percent perfectionism score looks exactly like Earth turning every job into a weight you must keep steady. That is why even after the work is done, your mind still behaves as if the structure could fall apart.",
    "Your low recovery score fits your weak Wood: the part that would normally let tension move outward and loosen is barely there. So rest does not feel like rest, because the checking mind stays active after the task is over. You are not failing to recover because you do not care; you are trying to recover with a system that keeps tightening instead of releasing."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you trust precision more than closure. In daily life, that can mean reopening a finished file, rereading a sent message, or scanning one last time before you let go. The useful part of this habit is your care, but you need a stopping point that does not depend on feeling perfectly certain.",
    "Feeling uneasy even when you rest shows that your body is present, but your mind is still on duty. That can look like taking time off and still checking your phone, your inbox, or the time itself. You are allowed to practice rest as a skill, not a reward."
   ],
   "chat_snapshot_note": "You said, \"I rest but it never feels like resting,\" and that matches the tired, slightly anxious tone you brought into the conversation. The problem is not that you never stop; it is that your mind keeps standing guard after the stopping point. The line to keep is this: if rest still feels noisy, the noise is part of the pattern, not proof that you are doing it wrong.",
   "chat_trigger_note": "Monday-morning messages hit you so hard because they do not just bring work back; they switch the whole nervous system back on. They press right into the Earth-and-Metal side of you, where responsibility and checking are already strong. So one message can feel bigger than it looks, because it wakes up the part of you that believes delay means danger.",
   "chat_repeat_note": "The cram-then-crash pattern moves in a very clear arc: you pile everything into one push, then your system collects the cost later. In the middle of that arc, you choose momentum over pacing because stopping feels risky. A smaller step, taken before the pile gets huge, is the easiest way to interrupt the loop.",
   "chat_fear_note": "Your fear of falling behind is not random; it sits right under the whole burnout pattern. What it really shows is how much you want to stay reliable, visible, and ahead of collapse. The wish underneath the fear is simple: you want to pause without losing your place.",
   "psychology_fact_heading": "The perfectionism-recovery loop",
   "psychology_fact_body": "In psychology, perfectionism often keeps attention locked on mistakes, unfinished edges, and the possibility of doing more. When recovery is low, the mind has fewer internal brakes, so stopping can feel uneasy instead of relieving. That combination is a familiar burnout pattern: high standards keep the system active, and weak recovery keeps it from fully discharging. Your scores line up with that loop very cleanly.",
   "psychology_takeaway": "You are not only tired; you are still supervising the tiredness. The next step is not to care less, but to give your mind a real ending.",
   "strengths": [
    {
     "title": "Steady follow-through",
     "body": "You do not leave things half-built, and that shows in how you keep checking a task until it feels complete. In a work setting, that makes you reliable when the deadline is close and the details matter. The same strength that helps you finish is also why your mind resists letting go, Jordan."
    },
    {
     "title": "Sharp standards",
     "body": "Your 82 percent perfectionism gives you a very clear internal benchmark, and you notice when something is off quickly. That can be a real asset in work that needs accuracy, polish, or careful review. It is the reason you can spot the loose thread before anyone else does."
    },
    {
     "title": "Pressure tolerance",
     "body": "Your strong Earth at 38 percent gives you the ability to keep standing when the week feels heavy. You can hold responsibility for longer than many people can, and that helps you get through demanding stretches. Even when Monday-morning messages land hard, you still move toward the task instead of away from it."
    },
    {
     "title": "Clear self-monitoring",
     "body": "Your strong Metal at 38 percent makes you good at noticing what still needs attention. That kind of inner scanning can keep quality high and prevent careless mistakes. In your case, it also explains why your mind keeps looking back after the work is already done."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard to switch off",
     "body": "When recovery is low at 34 percent, stopping does not automatically feel safe or satisfying. You can sit down, but your attention keeps checking whether the day is truly over. That is why rest can feel like another task instead of a release."
    },
    {
     "title": "Overchecking loop",
     "body": "Your mind tends to return to finished work, especially when you have just completed something important. That habit can make a calm moment feel unfinished, even if nothing is actually wrong. It is not carelessness; it is care pushed past the point of usefulness."
    },
    {
     "title": "Crash after push",
     "body": "The cram-then-crash rhythm means your energy gets spent in bursts instead of spread out. You can look productive right up until the point where your system suddenly drops. That pattern often leaves you feeling like you earned the work, but not the recovery."
    },
    {
     "title": "Fear of lagging",
     "body": "The thought that stopping will make you fall behind keeps your pace tense. It makes even ordinary pauses feel loaded, especially when Monday-morning messages arrive. Under that fear is a deep wish to stay safe by staying ahead."
    }
   ],
   "fit_good": "You do best in a role where the day has clear endpoints and the workload is visible in chunks. A schedule with defined handoff times, written priorities, and room to close the loop helps your mind stop scanning after hours. You also benefit from work that rewards careful completion without asking you to stay on call all night.",
   "fit_bad": "You struggle in environments where messages keep arriving without a clear boundary, especially when Monday mornings already feel heavy. A role that treats constant availability as normal will keep your checking mind awake long after the work is done. You also get drained fast when success is measured only by how much more you can squeeze in.",
   "behavior_guides": [
    {
     "title": "Close the loop",
     "body": "At the end of each workday, spend five minutes writing down what is finished and what will wait until tomorrow. Do it before you leave your desk, not after you get home. That small closure gives your mind a place to stop checking."
    },
    {
     "title": "Limit the recheck",
     "body": "Choose one task each day that you are allowed to review only once after completion. Set a timer for ten minutes, make your final pass, and then stop. This trains your system to accept a clean ending instead of a perfect one."
    },
    {
     "title": "Protect the first hour",
     "body": "On Monday mornings, keep your first hour free from message checking if you can. Use that time to sort priorities before the outside noise starts steering you. A slower opening often prevents the whole day from becoming a sprint."
    },
    {
     "title": "Schedule real rest",
     "body": "Block one piece of rest on your calendar the same way you would block a meeting. Keep it specific, like a walk, a meal, or twenty minutes away from the screen. When rest has a place and a time, it is less likely to feel like something you have to justify."
    }
   ],
   "mindset_guide": "Think of your energy like a battery that is not broken, just overused. A full battery does not need to be watched every second; it needs a clear charge and a clear stop. Your job is not to squeeze more out of it, but to let it finish charging before you ask it to run again. When the mind wants to keep checking, remind yourself that the device works better when it is not being tested every minute.",
   "closing_title": "A cleaner ending is possible",
   "closing_body": "You do not need to prove that you can keep going after you are already empty. You need endings that your mind can trust, so rest stops feeling like a suspicious pause. The line to save is this: finishing the work should not require finishing yourself."
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
   "title_line1": "You keep finishing the day, but the day never quite releases you.",
   "title_line2": "What looks done still keeps asking for one more check.",
   "subtitle": "Module 3 Burnout Deep Report - saju x psychology x counseling integrated",
   "opening_scene": "It is late, and your phone lights up with a message that feels like the start of work before your body has even caught up. You have already done the work, but your hand still reaches back to the screen as if one more check could make the pressure quiet down. In bed, you are tired and a little anxious, yet your mind keeps replaying what is left, what might slip, and what could fall behind. Even rest starts to feel like another task you have to do correctly. Riley, doesn’t your recent night look exactly like this?",
   "case_tag": "EXAMPLE CASE - Mina, early 30s, trying to end every day perfectly",
   "case_paragraphs": [
    "Mina sends one final message, closes her laptop, and then opens it again ten minutes later to make sure nothing was missed. Her evening looks finished from the outside, but her mind keeps circling the same unfinished edge. Her chart has the same kind of imbalance you do: too much wood, and not enough metal to bring a clean stop to the loop. You can see yourself in that pattern, too."
   ],
   "oheng_intro": "Your wood is 50 percent, and your metal is 0 percent, so your chart leans hard toward drive, motion, and self-propelling energy. In a burnout pattern, that looks like pushing through, then crashing, because the part that would naturally set a hard boundary is the weakest part of the mix. You keep moving as if momentum alone could protect you from falling behind.",
   "quiz_reading": "Your 82 percent perfectionism and 34 percent recovery closely match the Finisher's Drain pattern. You do not just work hard; you keep auditing the work after it is already done, so your brain never gets the message that the task has ended. That is why a day off can still feel uneasy, especially when Monday-morning messages can switch the whole system back on in one second.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong - the part of you that keeps growing past the finish line",
     "body": "Your wood at 50 percent is strong, so it does not sit still easily. In this burnout pattern, that strength turns into the habit of cramming first and asking questions later. You can finish a task and still feel pulled to go back and re-check everything, because motion feels safer than stopping. That same wood pressure is why Monday-morning messages can grab you so quickly."
    },
    "fire": {
     "heading": "🔥 Fire absent - the spark that should make the work feel alive",
     "body": "Your fire is at 0 percent, so the bright, energizing side of the day does not get much room to show itself. In a burnout week, that can make effort feel functional but not warm, so even a completed task does not leave much inner glow behind. You may keep going, but it can feel more like pushing than being carried. That is why your tiredness comes with a dry, flat edge instead of a sense of momentum."
    },
    "earth": {
     "heading": "⛰️ Earth balanced - the part that can hold what you have already done",
     "body": "Your earth at 25 percent is steady enough to hold things, but not so heavy that it takes over. In practice, that can look like a brief pause after work, a meal, or a small reset before the next demand arrives. When burnout hits, that steadiness helps you gather yourself after a crash instead of staying scattered the whole night. It gives you a place to land, even if only for a moment."
    },
    "metal": {
     "heading": "💎 Metal weak - the boundary that tells you when enough is enough",
     "body": "Your metal is 0 percent, so the part that draws a clean line and says stop is very quiet. Earth can help metal, and that is the route that matters for you here: steadier routines, simpler endings, and calmer closing rituals can give that boundary a little more shape. Without that support, you keep checking because nothing inside has fully clicked into finished. That is why your mind stays on duty even after the task is over."
    },
    "water": {
     "heading": "💧 Water balanced - the part that notices what you feel before you burn out",
     "body": "Your water at 25 percent gives you enough sensitivity to notice tension building before it becomes obvious. In a burnout pattern, that can show up as a quiet awareness that you are not really resting, even when you are lying down. The problem is not that you cannot feel it. The problem is that the checking keeps talking louder than the feeling."
    }
   },
   "upcoming_period_heading": "From age 46 to 55, a stronger earth cycle begins",
   "upcoming_period_body": "From age 46 to 55, the energy becomes more earth-like, and that can feel like life asking you to build steadier ground instead of chasing every open loop. For you, that is a useful shift, because earth can help slow the wood-driven rush and make endings feel more complete. This is a good time to practice cleaner stops, simpler routines, and a way of working that leaves room for recovery. If you learn those habits now, that later period can feel less like pressure and more like relief.",
   "cross_analysis_quotes": [
    "Your strongest element is the one that keeps saying, 'one more check.' That fits your 82 percent perfectionism so closely it is hard to call it a coincidence. Wood pushes forward, and your perfectionism keeps the door open even after the task should already be closed. The same energy that helps you finish also makes it hard to accept the finish line.",
    "Your weakest element is the one that should help you stop, and that lines up with your 34 percent recovery. When metal is quiet, rest does not automatically register as rest. That is why a day off can still feel uneasy, even when nothing is actively demanding you."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you trust precision more than the feeling of completion. In daily life, that can look like reopening a finished message or scanning a task list one more time before bed. You are not careless at all; you simply want certainty to settle in before you let go.",
    "Feeling uneasy even when you rest shows that recovery does not switch on automatically for you. That can show up as lying down while still mentally standing guard over tomorrow. You may need a deliberate closing ritual before rest can feel real."
   ],
   "chat_snapshot_note": "You said that you rest, but it never feels like resting, and that line matches the tired, slightly anxious tone underneath everything else. The work may be done, but your mind keeps checking, so your body never gets full permission to come down. The saved line here is simple: if your mind is still on duty, your rest has not fully begun.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they do not just bring information; they reopen the whole unfinished feeling at once. For a wood-heavy chart, that kind of sudden demand can feel like a green light to keep pushing instead of a signal to slow down. So one notification is enough to pull you back into motion before you have even recovered from the last round.",
   "chat_repeat_note": "Cramming, then crashing is the shape of a system that keeps borrowing from tomorrow. You push past your limit first, and only later do you feel how much it cost. A smaller step earlier in the day would already change the shape of the evening, because not every task needs to be won by force.",
   "chat_fear_note": "The fear of falling behind is really a fear of losing your place if you stop moving. Under that fear is a wish to stay reliable, keep up, and not have to start over from behind. That is a demanding way to live, but it also shows how much you care about staying engaged with your life.",
   "psychology_fact_heading": "Hewitt and Flett's multidimensional perfectionism",
   "psychology_fact_body": "Hewitt and Flett's work is often used to describe perfectionism as a pattern that can include high standards, self-monitoring, and a strong need to keep things correct. That fits your 82 percent perfectionism very closely, because your mind does not seem to accept a task as complete just because the task is complete. In burnout, that style can keep the nervous system active long after the work itself has ended. Your experience of uneasy rest makes that pattern very concrete.",
   "psychology_takeaway": "Completion is not the same as closure. You need an ending that your body can feel, not just a task that your mind can verify.",
   "strengths": [
    {
     "title": "Persistent drive",
     "body": "Your 50 percent wood gives you real forward motion, and that is why you can keep going when others would stall. In the burnout pattern, that shows up as getting through the work even when you are already tired. The same force that can overextend you also helps you finish what you start."
    },
    {
     "title": "Fine noticing",
     "body": "Your 25 percent water keeps you aware that something is off, even when you try to brush it aside. You can tell the difference between real rest and the kind of pause that still feels tense. That sensitivity is useful because it gives you an early signal before the crash becomes bigger."
    },
    {
     "title": "Steady holding",
     "body": "Your 25 percent earth gives you a place to land after the push. Even when the day has been messy, you can still hold on to the next practical step. That makes recovery possible once you decide to stop treating every ending like a test."
    },
    {
     "title": "Reliable follow-through",
     "body": "Your perfectionism at 82 percent means you do not let things slip easily. You check, refine, and stay with the work until it feels complete enough to hand over. In the right setting, that makes you the person others can trust to notice the small details."
    }
   ],
   "weaknesses": [
    {
     "title": "Hard stopping",
     "body": "Your metal at 0 percent leaves you without much built-in stopping power. That is why finishing does not always feel finished, and why your mind keeps reopening the file. The problem is not lack of effort; it is that the boundary itself is too quiet."
    },
    {
     "title": "Recovery lag",
     "body": "Your recovery score of 34 percent shows how slowly your system comes down after strain. You may sit still, but inside you are still scanning for the next thing. That gap between body and mind is what makes rest feel uneasy."
    },
    {
     "title": "Overchecking loop",
     "body": "Your perfectionism turns a finished task into a second task. You complete the work, then immediately create the job of reviewing it again. That loop can steal the relief you earned."
    },
    {
     "title": "Crash after push",
     "body": "Cramming, then crashing is the pattern that keeps repeating when you rely on momentum alone. You use urgency to carry you through, and then your system drops all at once. That rhythm is exhausting because it leaves no gentle middle."
    }
   ],
   "fit_good": "You do better in a setting where work has a clear end point and people respect it. A day with fewer surprise pings and a visible closing routine would help you feel what completion actually is. You would likely breathe easier when the rules for stopping are just as clear as the rules for doing.",
   "fit_bad": "You struggle in an environment that rewards instant replies and treats every message as urgent. If Monday-morning messages can reopen your tension, then a constantly buzzing workspace will keep your body on alert all day. You are more likely to crash there because you never get a clean place to land.",
   "behavior_guides": [
    {
     "title": "Closing ritual",
     "body": "At the end of work, spend five minutes writing down what is done and what waits for tomorrow. Do it at the same time each day so your body starts to recognize the cue. Then stop the checking, even if the urge to reopen things shows up again."
    },
    {
     "title": "Rest boundary",
     "body": "When you take a break, put the phone face down and leave it there for at least twenty minutes. Let the break be one thing only: no rechecking, no polishing, no answering. That small boundary gives your recovery a chance to register."
    },
    {
     "title": "Morning buffer",
     "body": "Before you read Monday-morning messages, take ten minutes to drink water and sit without opening anything. Use that buffer to keep the first message from deciding your whole mood. A short delay can keep your wood energy from jumping straight into overdrive."
    },
    {
     "title": "Single review",
     "body": "Choose one final review point for a task and do it once, not three times. Set a timer for fifteen minutes, check what matters, and then send it. The goal is not lower standards; it is a cleaner stop."
    }
   ],
   "mindset_guide": "Think of your day like a desk that needs clearing, not a fire that must keep burning. If you leave every paper out, your mind will keep acting like the work is still open. A tidy surface does not mean less seriousness; it means the job is truly finished. You do not need to prove the work by carrying it home in your head.",
   "closing_title": "A cleaner ending",
   "closing_body": "You are not failing at rest; you are still teaching your system how to stop. The same drive that makes you finish can also learn to close the door. Keep the ending visible, and your mind will not have to keep inventing one. "
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
   "title_line1": "Cuando todo termina, tu mente sigue revisando",
   "title_line2": "y el descanso se queda fuera de la puerta",
   "subtitle": "Informe profundo del módulo 3 — saju × psicología × acompañamiento integrado",
   "opening_scene": "Llega el lunes por la mañana y tu teléfono se llena de mensajes antes de que el día arranque de verdad. Tú ya estabas tratando de descansar, pero la mente vuelve al mismo gesto: revisar, repasar, volver a mirar. Terminas una cosa y, en vez de soltarla, la dejas dando vueltas otra vez en la cabeza. Por fuera parece que el trabajo ya cerró; por dentro, la puerta sigue abierta. Lucía, tus días de ahora mismo se ven así, ¿no es así?",
   "case_tag": "CASO DE EJEMPLO — Martina, 30 y tantos, en una etapa de mucha exigencia",
   "case_paragraphs": [
    "Martina termina todo lo que le piden, pero después se queda mirando lo hecho como si aún faltara una vuelta más. Su día empieza con mensajes del lunes por la mañana y sigue con la sensación de que descansar no le devuelve de verdad el descanso. Su mapa muestra tierra fuerte y metal débil, así que la presión por sostenerlo todo le pesa más que la posibilidad de aflojar. Tú también podrías verte en ese mismo vaivén."
   ],
   "oheng_intro": "Tu tierra está en 38% y es la fuerza más marcada de tu mapa, así que se vive como presión, regla y responsabilidad encima de ti. Tu metal está en 0% y aparece como la parte más ausente, así que se siente como apoyo, orden y protección que todavía no llegan del todo. En el módulo de agotamiento, esa mezcla hace que cierres una tarea y aun así sientas que la mente sigue de guardia.",
   "quiz_reading": "Tu 82% en perfeccionismo y tu 34% en recuperación dibujan una combinación muy clara: haces que todo quede cerrado, pero no le das al cuerpo el mismo cierre. En el tipo Quien termina todo y se agota, eso se nota cuando revisas una tarea desde el principio justo después de terminarla. También se nota cuando un día libre no se siente como libre, sino como una pausa con la inquietud todavía encendida.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera baja — el impulso que pide espacio",
     "body": "Tu madera está en 13%, así que el impulso de arrancar sin mirar tanto queda más bajo que otras fuerzas de tu mapa. En días como los tuyos, eso se nota cuando una tarea ya cerró, pero tu mente no corre hacia otra cosa con ligereza; se queda revisando la misma escena. En el agotamiento, esa falta de impulso no te quita valor: solo hace que el arranque dependa mucho de cuánto peso traes encima. Y cuando los mensajes del lunes te activan, tú no avanzas por inercia; primero mides el terreno una y otra vez."
    },
    "fire": {
     "heading": "🔥 fuego normal — la chispa que se enciende rápido",
     "body": "Tu fuego está en 25%, y se mantiene en un nivel que sí aporta empuje, intensidad y reacción. Por eso no te cuesta notar de inmediato cuándo algo te altera: los mensajes del lunes por la mañana pueden prender esa tensión en segundos. En el agotamiento, ese fuego no se queda pequeño; se vuelve una llama breve que te hace rendir mucho y luego pedir silencio. Tú puedes sostener mucho con ese impulso, pero también sentir que la energía se va antes de que el día termine."
    },
    "earth": {
     "heading": "⛰️ tierra fuerte — el peso de sostenerlo todo",
     "body": "Tu tierra está en 38%, y es la fuerza que más domina tu mapa. En tu vida de ahora, esa tierra se siente como obligación, control y la idea de que si paras te quedas atrás. Por eso acumulas y luego te derrumbas de golpe: primero sostienes, después el cuerpo reclama todo lo que guardaste. En el agotamiento, esa presión se parece mucho a tu miedo de no aflojar nunca del todo, ni siquiera cuando ya terminaste."
    },
    "metal": {
     "heading": "💎 metal bajo — el apoyo que te hace falta",
     "body": "Tu metal está en 0%, así que la parte que ordena, protege y ayuda a soltar queda muy ausente. En un mapa como el tuyo, esa falta se nota cuando terminas una tarea y no aparece una sensación limpia de cierre; solo vuelve la revisión. La tierra puede alimentar a ese metal y darle forma, pero aquí ese apoyo todavía no se siente en el cuerpo. Por eso, cuando intentas descansar, tu mente sigue buscando una estructura que no termina de aparecer."
    },
    "water": {
     "heading": "💧 agua normal — la corriente que sigue debajo",
     "body": "Tu agua está en 25%, y eso te da una sensibilidad clara para notar lo que se mueve por debajo de la superficie. En el agotamiento, esa corriente se ve en la inquietud que aparece incluso en un día libre. No se trata de falta de conciencia; se trata de que percibes demasiado bien la tensión que queda sin cerrar. Tú no dejas de sentir lo que pasa, aunque por fuera intentes seguir como si nada."
    }
   },
   "upcoming_period_heading": "De los 38 a los 47 años, llega un ciclo de diez años con fuego más fuerte",
   "upcoming_period_body": "Cuando ese ciclo empiece, tu energía va a pedir más visibilidad y más decisión. Lo que hoy te cuesta sostener en silencio puede volverse una etapa más clara para mostrar lo que sabes hacer y moverte con más impulso. Si desde ahora practicas cerrar sin volver a abrirlo todo, entrarás mejor en ese periodo. También te conviene aprender a descansar sin sentir que pierdes terreno, porque ahí estará una parte importante de tu preparación.",
   "cross_analysis_quotes": [
    "Tu tierra fuerte y tu perfeccionismo se empujan entre sí. Cuando una parte de ti quiere dejar algo bien hecho, la otra parte añade peso, regla y más revisión. Por eso terminas haciendo más de lo necesario, y el resultado no se siente descanso sino vigilancia.",
    "Tu metal bajo y tu recuperación baja cuentan la misma historia desde otro ángulo. Te falta esa sensación interna de cierre que ayuda a soltar de verdad después de terminar. Por eso un día libre no siempre baja la tensión; a veces solo la deja sin tarea."
   ],
   "answer_notes": [
    "Tu respuesta muestra que no te basta con terminar; necesitas comprobar que nada quedó fuera de lugar. Eso revela una mente que busca control para sentirse segura. Cuando lo notes, intenta dejar una sola revisión final y cortar ahí.",
    "Tu respuesta muestra que el descanso, por sí solo, no apaga tu alerta. Eso revela que la inquietud sigue activa aunque el cuerpo pare. Si aparece ese mismo movimiento en un día libre, no lo tomes como fallo: tómalo como una señal para bajar la exigencia antes de que suba otra vez."
   ],
   "chat_snapshot_note": "Lo que contaste sobre querer descansar pero no sentirlo como descanso encaja con el cansancio y la pequeña ansiedad que llevas encima. No es solo fatiga; es la sensación de que la mente no acepta el cierre aunque el cuerpo ya pidió pausa. La frase que te conviene guardar es esta: terminar no siempre significa soltar.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te alteran porque llegan justo cuando tu sistema todavía está tratando de bajar. Ese arranque toca de lleno tu perfeccionismo y vuelve a encender la exigencia. En tu caso, no es solo un mensaje: es una llamada a volver a vigilar.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte funciona como una represa que aguanta demasiado. Primero sostienes, luego dejas caer todo de golpe. Una salida pequeña es poner un corte antes del derrumbe, aunque sea de diez minutos, para que la salida no tenga que ser total.",
   "chat_fear_note": "Tu miedo a quedarte atrás si paras habla de una necesidad muy concreta: seguir en movimiento para sentirte a salvo. Debajo de ese miedo no hay ambición vacía; hay ganas de no perder tu lugar. Tú no temes descansar por flojera, sino por la sensación de que el mundo no espera.",
   "psychology_fact_heading": "Perfeccionismo y recuperación",
   "psychology_fact_body": "El perfeccionismo alto suele empujar a revisar más de una vez, a cerrar tareas con dificultad y a sentir que siempre falta un paso más. Cuando la recuperación es baja, el descanso no termina de restaurar y la mente sigue activa aunque el cuerpo se siente sin energía. Esa combinación encaja muy bien con tu respuesta de volver a revisar todo desde el principio y con la inquietud que aparece incluso en un día libre. En ti, el problema no es hacer poco; es no dejar que lo hecho se quede quieto.",
   "psychology_takeaway": "No te falta pausa; te sobra vigilancia. Tu reto no es hacer menos, sino dejar de reabrir lo que ya cerraste.",
   "strengths": [
    {
     "title": "Sostén firme",
     "body": "Tu tierra en 38% te da una capacidad real para aguantar presión y cumplir incluso cuando el día pesa. Eso se ve en que terminas lo que empiezas y no sueltas fácil una responsabilidad. En el agotamiento, esa fuerza te permite seguir en pie cuando otras personas ya habrían bajado los brazos."
    },
    {
     "title": "Alerta fina",
     "body": "Tu agua en 25% te deja captar rápido cuándo la tensión vuelve a subir, como pasa con los mensajes del lunes por la mañana. No pasas por alto lo que te altera; lo reconoces casi al instante. Esa sensibilidad te ayuda a entender tu propio ritmo antes de que el cuerpo se derrumbe del todo."
    },
    {
     "title": "Impulso claro",
     "body": "Tu fuego en 25% te da energía para reaccionar, decidir y ponerte en marcha cuando algo importa. No te quedas apagada frente a lo urgente; respondes con presencia. En tu caso, ese impulso es una base útil para aprender a cerrar mejor sin perder fuerza."
    },
    {
     "title": "Capacidad de detalle",
     "body": "Tu perfeccionismo en 82% también muestra una atención fina para detectar lo que todavía puede mejorar. Eso te vuelve muy cuidadosa con lo que entregas y con la forma en que lo haces. Cuando logras ponerle límite, esa misma precisión se convierte en una herramienta muy valiosa."
    }
   ],
   "weaknesses": [
    {
     "title": "Revisión infinita",
     "body": "Tu respuesta de volver a revisar todo desde el principio muestra que el cierre no se siente definitivo para ti. Eso te lleva a reabrir tareas ya terminadas y a gastar energía donde ya no hacía falta. En el día a día, esa vuelta extra se convierte en cansancio que nadie ve desde fuera."
    },
    {
     "title": "Descanso inquietante",
     "body": "Tu 34% en recuperación indica que parar no siempre te devuelve calma. Puedes tener un día libre y, aun así, sentir inquietud debajo de la superficie. Eso hace que el descanso parezca una pausa incompleta, como si algo siguiera pendiente aunque no lo esté."
    },
    {
     "title": "Peso acumulado",
     "body": "Tu patrón de acumular y luego derrumbarte muestra que aguantas demasiado antes de soltar. Mientras sostienes, parece que todo va bien; después, el bajón llega de golpe. Esa forma de funcionar te deja con la sensación de haber dado más de lo que el cuerpo podía sostener."
    },
    {
     "title": "Miedo al freno",
     "body": "Tu frase sobre quedarte atrás si paras enseña que el reposo se mezcla con amenaza. No es falta de ganas de descansar; es miedo a perder terreno si aflojas. Ese miedo puede hacer que te exijas incluso cuando ya no queda margen."
    }
   ],
   "fit_good": "Te va mejor un entorno donde las tareas tengan principio y final claros. También te conviene un día con bloques cortos, pocas interrupciones y un cierre visible antes de pasar a otra cosa. Así no tienes que pelear tanto con la sensación de que todo sigue abierto.",
   "fit_bad": "Te pesa mucho un entorno con mensajes constantes, cambios de última hora y urgencias que llegan sin aviso. También te desgasta trabajar en un día en el que nadie define qué significa terminar. En ese clima, tu mente se queda de guardia y el cuerpo no llega a descansar.",
   "behavior_guides": [
    {
     "title": "Cierre único",
     "body": "Cuando termines una tarea, haz una sola revisión final y ponle un límite de cinco minutos. Después, cierra la pantalla y cambia de espacio, aunque te quede la tentación de volver. Si lo repites cada tarde, tu mente aprenderá que terminar también incluye soltar."
    },
    {
     "title": "Pausa real",
     "body": "En tu primer descanso del día, deja el teléfono lejos durante diez minutos. No lo uses para comprobar nada ni para adelantar nada. Esa pequeña distancia le enseña a tu cuerpo que parar no significa perder."
    },
    {
     "title": "Límite de mensajes",
     "body": "El lunes por la mañana, revisa mensajes en dos momentos fijos y no entre medio. Elige una hora de inicio y otra de cierre, y respétalas aunque sientas impulso de mirar antes. Así bajas la activación que te enciende desde el primer minuto."
    },
    {
     "title": "Salida gradual",
     "body": "Cuando notes que ya acumulaste demasiado, para antes del derrumbe con una acción pequeña y concreta. Puede ser caminar cinco minutos, beber agua o escribir tres líneas sobre lo que sí quedó hecho. Ese gesto evita que todo tenga que salir de golpe."
    }
   ],
   "mindset_guide": "Piensa en tu energía como en una mesa de trabajo, no como en una alarma que nunca se apaga. Una mesa sirve cuando sabe qué queda encima y qué ya se guardó. Si dejas todo abierto, tu tierra manda y tu metal no logra ordenar nada. Si cierras una cosa a la vez, el descanso empieza a parecer descanso de verdad.",
   "closing_title": "Lo que ya empezó a cambiar",
   "closing_body": "Tu patrón no habla de falta de capacidad, sino de una forma muy exigente de sostener el día. También muestra que, debajo del cansancio, hay un deseo muy claro de no perder tu lugar. Si aprendes a cerrar sin volver a abrirlo todo, vas a sentir más descanso y menos pelea con tu propia mente."
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
 "mia": {
  "content": {
   "title_line1": "Your mind keeps checking long after the work is done.",
   "title_line2": "And the pause never quite lands as rest.",
   "subtitle": "Module 3 burnout deep report — saju x psychology x counseling integration",
   "opening_scene": "It is late enough that your phone light is the brightest thing in the room. Monday morning messages are already sitting there, and your hand keeps reaching for them even though you are tired. You tell yourself you will stop after one more check, then one more, then one more. Even when the work is finished, your mind does not close the file. Mia, isn't this what your nights have been looking like lately?",
   "case_tag": "EXAMPLE CASE — Nora, early 30s, caught in the same loop",
   "case_paragraphs": [
    "Nora finishes her tasks before dinner, but she still opens the same file twice and checks the same line three times. Her day looks productive from the outside, yet her body never gets the message that it is safe to slow down. Her Five Elements are also heavy on Wood, so she keeps gripping the next task instead of letting the day loosen. That is why you can see yourself in her so quickly."
   ],
   "oheng_intro": "Your Five Elements are led by Wood at 38 percent, and through your Day Master, which is Metal, that means Wood is the energy you naturally keep handling and holding in the material world. Water sits at 13 percent, and through that same Day Master, it is the energy that is most easily spent when you are under pressure. In a burnout pattern, that looks like a mind that keeps reaching, holding, and pushing, even after the body has already asked for a pause. Because Water is low, the part of you that should ease release and recovery runs thin, so the strain stays visible in the way Monday morning messages can flip your whole mood back on.",
   "quiz_reading": "Your 82 percent perfectionism and 34 percent recovery sit in a very specific pattern: you do not simply work hard, you keep the task alive after it is already done. That is why the Finisher's Drain type fits so closely. A finished task does not feel finished to you, so your rest gets interrupted by another round of checking.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — always reaching for one more branch",
     "body": "Your Wood is strong at 38 percent, so you naturally keep your hands on the next thing. In a burnout pattern, that can look like checking one more detail after the task is already finished, just to make sure nothing slips. It also shows up when Monday morning messages arrive and your mind immediately starts climbing back into work mode. You are not lazy when this happens; you are over-gripping the branch before you have even sat down."
    },
    "fire": {
     "heading": "🔥 Fire weak — the spark burns fast, then fades",
     "body": "Your Fire is 13 percent, so the energy that should stay warm through the day tends to show up in bursts instead of lasting steadily. That fits your cram-and-crash pattern exactly: you can push hard for a stretch, then feel the heat drop once the pressure lifts. With recovery at 34 percent, the crash does not feel like a gentle slowdown; it feels like a lag that takes a while to settle. Your tired, slightly anxious state makes sense here, because the fire is not missing, it is burning unevenly and then fading too quickly."
    },
    "earth": {
     "heading": "⛰️ Earth weak — not enough pause to hold the load",
     "body": "Your Earth is 13 percent, so steadiness is not coming in as strongly as your effort does. That fits the way rest does not fully register for you, because the part that should help you settle is not carrying much weight. Instead of feeling held after a long week, you keep scanning for the next task or the next reminder. You end up living in the middle of motion, not in the middle of recovery."
    },
    "metal": {
     "heading": "💎 Metal strong — a sharp eye that keeps reviewing",
     "body": "Your Metal is 25 percent, which gives you a clear standard and a strong reviewing instinct. In burnout, that can become the voice that reopens finished work and asks whether it is really done. It is the same part of you that notices what could be cleaner, tighter, or safer, even when everyone else would have moved on. Used well, it keeps your work precise; overused, it keeps your mind awake after hours."
    },
    "water": {
     "heading": "💧 Water weak — the stream that should carry relief runs thin",
     "body": "Your Water is 13 percent, and that is the part that should help you release, soften, and recover. Metal does help Water along, so support can come when structure, clarity, or a clean boundary makes it easier for you to rest. But when that support is not present, you feel it exactly the way you described it: you rest, yet it never feels like resting. That is why your pause can look real from the outside and still feel unfinished inside."
    }
   },
   "upcoming_period_heading": "From age 33 to 42, a water-rich season is coming",
   "upcoming_period_body": "The years from age 33 to 42 point toward a season where recovery, softness, and easier pacing can become more available. For you, that can mean the part that now keeps checking may have more support to let go after the work is done. This is a good time to practice clean stopping points now, so your system learns the shape of rest before that season arrives. If you build that habit early, you will be ready to receive the ease that is on its way.",
   "cross_analysis_quotes": [
    "Your 38 percent Wood and your 82 percent perfectionism are speaking the same language: you keep reaching for the next branch even after the task is finished. That is why a completed job still feels open in your head. The review does not stop at quality; it keeps going until your energy is already spent.",
    "Your 13 percent Water and your 34 percent recovery explain why rest feels uneasy instead of replenishing. The part of you that should let the pressure drain away is running light. So even on a day off, your body may be still while your mind keeps listening for the next message."
   ],
   "answer_notes": [
    "Going back to re-check everything shows that you trust precision more than completion. It means your mind does not fully accept the first pass as safe, so closure takes extra effort. That same instinct can make your work excellent, as long as it does not keep you trapped at the desk after you are done.",
    "Feeling uneasy even when you rest shows that your system has trouble recognizing permission as safety. On a day off, you may still scan for unfinished things instead of letting the hour belong to you. The good news is that unease is a signal, not a verdict, and you can teach your body a different ending."
   ],
   "chat_snapshot_note": "You said, plainly, that you rest but it never feels like resting, and that matches the tired, slightly anxious tone underneath your story. That is not just fatigue; it is fatigue with your mind still standing guard. The line I would save is this: you are not failing to rest, you are resting under inspection.",
   "chat_trigger_note": "Monday morning messages hit you so hard because they do not just bring information; they reopen the whole work mode at once. With your strong Wood and high perfectionism, a message can feel like a new branch you have to climb immediately. That is why the trigger is so sharp for you, even before the week has really begun.",
   "chat_repeat_note": "Your pattern is clear: you cram hard, then crash hard. In the middle, you choose pressure over pacing because stopping feels risky, almost like you might slip behind if you let go. A small way out is to stop once, on purpose, while the task is still manageable, so your body learns that a pause does not mean collapse.",
   "chat_fear_note": "Under the fear of falling behind is a very understandable wish to stay secure. You are not asking for less meaning; you are asking for proof that pausing will not cost you everything. That is why the fear feels so big, and why it deserves gentleness instead of argument.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "Your 82 percent perfectionism keeps the checking loop alive, because one more review can feel safer than a clean stop. Your 34 percent recovery means the body does not get enough real downshift time, so the nervous system stays on duty even after the task is done. Put together, those two scores explain why you keep reopening finished work and why rest still feels uneasy. This is exactly the pattern your answers point to: you trust re-checking more than closure, and that keeps recovery from landing.",
   "psychology_takeaway": "You do not just need more rest; you need rest that your mind is allowed to believe. The work is not only in doing less, but in letting completion count.",
   "strengths": [
    {
     "title": "Sharp standards",
     "body": "Your 82 percent perfectionism gives you a strong eye for what needs to be cleaned up, and that can make your work very precise. You notice loose ends quickly, which is why you can catch what others miss. The same sharpness that keeps you checking also keeps your output tight and careful."
    },
    {
     "title": "Follow-through",
     "body": "Your Finisher's Drain type shows that you do not quit halfway, even when you are tired. You push through until the task is actually finished, and that is a real strength. In daily life, that can look like answering the last message, closing the last tab, and making sure the job lands properly."
    },
    {
     "title": "Alert timing",
     "body": "Monday morning messages affect you quickly because your system is highly alert to what is coming next. That sensitivity helps you respond fast when something matters. It means you are rarely passive in important moments; you notice and move."
    },
    {
     "title": "Strong grip",
     "body": "Your strong Wood at 38 percent gives you the ability to hold onto a goal until it is done. That can be very useful when the work is complex or the stakes are high. It is the same grip that helps you persist through a tiring week and still finish what you started."
    }
   ],
   "weaknesses": [
    {
     "title": "Unfinished rest",
     "body": "Your 34 percent recovery means rest does not fully land as recovery yet. You can sit down, step away, or pause, and still feel internally on duty. That is why even a day off can leave you uneasy instead of restored."
    },
    {
     "title": "Overchecking loop",
     "body": "After finishing a task, you go back and re-check everything, which keeps the task alive in your head. The loop can look small at first, but it steals the same energy the body needs to recover. That is how a finished job keeps acting unfinished."
    },
    {
     "title": "Crash after push",
     "body": "You tend to cram, then crash, which means your energy is being spent in bursts instead of spread more evenly. In practice, that can leave you suddenly empty after a period of intense focus. The problem is not effort; it is the cost of delaying release until the end."
    },
    {
     "title": "Fear of slowdown",
     "body": "You are afraid that if you stop, you will fall behind, and that fear keeps your foot on the gas. It can make even ordinary pauses feel charged with risk. That is why slowing down is not just a schedule issue for you; it is an emotional one."
    }
   ],
   "fit_good": "You do best in a setting where work ends clearly and messages do not spill endlessly into the night. A day with defined handoffs, clean deadlines, and fewer surprise pings will help your mind stand down. You also do well when there is a real stop point, so your evening is not just work in another room.",
   "fit_bad": "You are likely to struggle in a place where everything is always open, always editable, and always waiting for one more pass. A stream of late messages will keep your mind half-working even when your body is off the clock. Any setup that rewards endless checking will drain you fast.",
   "behavior_guides": [
    {
     "title": "One stop point",
     "body": "Choose one clear time each day when you stop checking work, even if the task still feels imperfect. Keep it for at least 20 minutes before bed so your body learns a real ending. Do this consistently for one week before deciding whether it works."
    },
    {
     "title": "Single review",
     "body": "When you finish something, allow yourself one full review only, then close the file. If the urge comes back, write the note down instead of reopening the task. Use this on at least three tasks this week so the habit has something to practice against."
    },
    {
     "title": "Recovery cue",
     "body": "Create one short cue that means you are done for the day, such as dimming the screen or moving the phone to another room. Repeat it every night at the same time so your body starts linking the cue with release. Keep the cue simple enough that you can do it even when you are tired."
    },
    {
     "title": "Monday buffer",
     "body": "On Sunday night, prepare the first step for Monday so the message does not hit you as a wall. Write the top priority on paper and leave it visible before you sleep. That way, Monday morning starts with a shape instead of a shock."
    }
   ],
   "mindset_guide": "Think of your energy like a lamp that keeps being switched back on by every message. The goal is not to make the lamp brighter; it is to give it a true off switch. When you finish, let the finish be a finish. Rest is not proved by how worried you feel while doing it. It is proved by whether your body is allowed to stop guarding the door.",
   "closing_title": "A quieter ending is possible",
   "closing_body": "You do not need to become a different person to rest better. You need a cleaner ending, a gentler review, and a little more trust that stopping is not the same as slipping behind. Mia, the most important sentence here is this: a task can be complete even when your mind is still learning how to let it go."
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
   "title_line1": "멈추지 못한 채",
   "title_line2": "끝까지 버티는 사람의 머릿속은 아직 퇴근하지 않아요",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "월요일 아침 메신저 알림이 울리면, 지수님은 이미 쉬고 있던 몸보다 먼저 머리가 깨어나 버려요. 일을 끝냈는데도 손은 자꾸 다시 화면으로 돌아가고, 머릿속에서는 방금 넘긴 일을 또 한 번 훑고 있어요. 쉬는 날인데도 마음이 편하지 않아서, 쉼이 쉼으로 닫히지 않는 느낌이 남아 있어요. 지수님의 요즘은 이런 모습이지 않으신가요.",
   "case_tag": "가상 사례 — 민지, 30대 초반, 기획 업무",
   "case_paragraphs": [
    "민지는 보고서를 마친 뒤에도 자리를 바로 뜨지 못하고, 표를 다시 열어 숫자를 한 번 더 맞춰 봐요. 토 기운이 강한 사람답게 손에 잡히는 일은 끝까지 붙들지만, 수 기운이 약한 흐름은 쉬는 틈을 편하게 열어 주지 못해요. 그래서 하루를 마쳐도 머릿속은 계속 일의 마감선 근처를 맴돌아요. 지수님도 그런 식으로 하루를 오래 붙들고 계시지 않나요."
   ],
   "oheng_intro": "토가 50퍼센트로 우세하고 수가 0퍼센트로 비어 있는 분포는, 현실과 일을 붙드는 힘이 아주 강한 대신 잠깐 내려놓는 감각이 잘 안 붙는 흐름이에요. 갑 일간 기준으로 보면 토는 지수님이 다루는 기운이라서, 일이 손에 잡히면 계속 붙잡게 만들어요. 번아웃 모듈에서는 그 힘이 몰아서 하고 무너지는 장면으로 가장 선명하게 드러나요.",
   "quiz_reading": "완벽주의가 82퍼센트로 높고 회복이 34퍼센트로 낮은 조합은, 끝을 내는 힘과 쉬어 가는 힘이 같은 속도로 움직이지 않는 상태예요. 완주형 소진이라는 이름이 붙은 이유도 여기에 있어요. 지수님은 일을 끝내는 순간보다, 끝낸 뒤 다시 처음부터 훑는 순간에 더 많은 에너지를 써요.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 보통 — 끝까지 밀어붙이는 시작점",
     "body": "목 33퍼센트는 보통이지만, 지수님 안에서는 시작을 여는 힘이 꽤 또렷하게 살아 있어요. 일이 걸리면 먼저 방향을 잡고, 해야 할 순서를 세우고, 밀어붙일 길을 찾는 쪽이에요. 다만 토가 더 강하게 받쳐 주는 구조라서, 시작한 일을 끝까지 책임지려는 쪽으로 힘이 쉽게 넘어가요. 그래서 월요일 아침 알림 하나에도 다시 일을 잡아채는 반응이 나올 수 있어요."
    },
    "fire": {
     "heading": "🔥 화 적다 — 올라오지 못한 열기",
     "body": "화가 0퍼센트라서, 번아웃이 와도 겉으로는 확 타오르기보다 안쪽에서 조용히 눌리는 느낌이 커요. 지수님은 지쳤다는 신호를 크게 드러내기보다, 해야 할 일을 먼저 정리하는 쪽으로 반응할 가능성이 높아요. 그래서 피로가 올라와도 바로 쉬어 버리기보다, 조금 더 버티고 정리하고 나서야 멈추게 돼요."
    },
    "earth": {
     "heading": "⛰️ 토 우세 — 일이 손에 붙으면 놓기 어려운 땅",
     "body": "토 50퍼센트는 지수님이 현실과 결과를 아주 강하게 붙드는 쪽이라는 뜻이에요. 완벽주의가 82퍼센트로 높다는 점과 만나면, 한 번 시작한 일은 대충 넘기기보다 끝까지 다져 놓고 싶어져요. 그래서 일이 끝난 뒤에도 머릿속 점검이 멈추지 않고, 월요일 아침 알림이 오면 그 긴장이 다시 몸으로 내려와요. 번아웃 모듈에서는 이 토 기운이 지수님을 버티게도 하지만, 같은 힘으로 지치게도 만들어요."
    },
    "metal": {
     "heading": "💎 금 보통 — 기준을 세우는 날카로움",
     "body": "금 17퍼센트는 기준과 판단을 세우는 감각이 분명히 있음을 보여 줘요. 그래서 지수님은 일을 대충 마무리하기보다, 어디가 맞고 어디가 덜 맞는지 다시 확인하려는 편이에요. 그 점검이 번번이 길어지면, 끝낸 일보다 다시 본 일이 더 또렷하게 남아요. 완벽주의가 높은 사람에게 이 금 기운은 꼼꼼함이 되지만, 쉬는 날에는 머릿속 검토를 멈추기 어렵게도 해요."
    },
    "water": {
     "heading": "💧 수 적다 — 쉬는 힘이 잘 차오르지 않는 자리",
     "body": "수 0퍼센트는 지수님에게 쉬어도 마음이 편해지는 흐름이 약하다는 뜻이에요. 그래서 회복이 34퍼센트로 낮게 나온 결과와 정확히 맞물려요. 에너지가 없는 게 아니라, 쉬는 모드로 자연스럽게 넘어가는 통로가 좁은 쪽에 가까워요. 금이 수를 살려 주는 흐름이 들어오면, 그때는 점검만 남기지 않고 배움과 정리로 마음을 조금 덜 다치게 할 수 있어요."
    }
   },
   "upcoming_period_heading": "36세부터 45세까지, 물의 계절이 옵니다",
   "upcoming_period_body": "지금보다 훨씬 뒤에 수 기운이 강해지는 흐름이 오면, 지수님은 일만 밀어붙이던 방식에서 조금 더 배우고 받아들이는 쪽으로 움직이기 쉬워요. 그 시기에는 혼자 버티는 속도보다, 도움을 요청하고 회복의 리듬을 만드는 일이 더 중요한 자산이 돼요. 그래서 지금은 끝까지 해내는 습관은 살리되, 중간에 멈추어도 일이 무너지지 않는 구조를 익혀 두는 게 좋아요. 월요일 아침 알림에 바로 흔들리지 않도록, 미리 쉬는 방식도 연습해 두면 좋아요.",
   "cross_analysis_quotes": [
    "토 50퍼센트와 완벽주의 82퍼센트가 만나면, 지수님은 끝내는 사람보다 끝까지 붙드는 사람이 돼요. 일이 손에 잡히는 순간부터 기준이 올라가고, 그 기준이 다시 지친 몸을 더 오래 붙들어요. 그래서 완주가 성취가 되기 전에 소진이 먼저 따라붙기 쉬워요.",
    "수 0퍼센트와 회복 34퍼센트는 쉬는 장면에서 정확히 맞물려요. 쉬어도 마음이 편하지 않다는 답은, 몸을 멈춰도 머릿속 점검은 계속된다는 뜻이에요. 지수님은 쉬는 시간을 비우는 일보다, 쉬는 시간을 안전하게 만드는 일부터 필요해 보여요."
   ],
   "answer_notes": [
    "일을 끝낸 뒤 다시 처음부터 훑는다는 답은, 지수님이 결과를 내는 것만큼 결과를 검토하는 데도 큰 에너지를 쓰는 사람이라는 뜻이에요. 그래서 마감 직후에도 머릿속에서는 아직 일이 끝나지 않은 것처럼 움직여요. 그만큼 꼼꼼한 사람이지만, 스스로를 너무 오래 점검하지는 않아도 돼요.",
    "쉬는 날에도 마음이 불편하다는 답은, 지수님에게 휴식이 단순한 멈춤으로 닫히지 않는다는 걸 보여 줘요. 몸은 쉬고 있어도 안쪽에서는 아직 해야 할 것들이 떠오르기 쉬워요. 쉬는 시간을 잘 못 누리는 사람이라기보다, 쉬는 동안에도 책임감이 꺼지지 않는 사람이에요."
   ],
   "chat_snapshot_note": "지수님은 쉬어도 쉬는 것 같지 않다고 말했어요. 그 말 뒤에는 지쳤고 조금 불안한 마음이 같이 붙어 있었어요. 몸의 피로보다 마음의 경계가 더 늦게 내려가는 상태로 들려요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 그냥 알림이 아니에요. 멈추면 뒤처질까 봐 멈출 수 없다는 감각을 바로 건드리기 때문이에요. 완벽주의가 높은 사람에게 이런 신호는 다시 달려가라는 스위치처럼 작동해요.",
   "chat_repeat_note": "몰아서 하고 무너지는 패턴은, 지수님이 버티는 동안에는 아주 강해 보이지만 멈추는 순간 한꺼번에 꺼지는 구조예요. 그 안에서 지수님은 쉬기보다 더 하면서 불안을 눌러 버리려는 선택을 해요. 아주 짧게라도 중간 점검을 넣으면, 무너짐의 크기를 조금 줄일 수 있어요.",
   "chat_fear_note": "지수님이 진짜로 무서운 건 쉬는 시간이 아니라 뒤처지는 느낌이에요. 그래서 멈추지 못하는 마음이 생겨났어요. 그 아래에는 잘하고 싶다는 마음과 놓치고 싶지 않다는 마음이 같이 있어요.",
   "psychology_fact_heading": "완벽주의와 회복의 균형",
   "psychology_fact_body": "심리학에서 완벽주의는 기준을 높게 세우고 그 기준을 맞추려는 경향으로 설명돼요. 회복은 스트레스가 지난 뒤 다시 안정 상태로 돌아오는 힘을 뜻해요. 지수님은 82퍼센트로 높은 완벽주의와 34퍼센트로 낮은 회복이 같이 보여서, 일을 끝내는 힘은 강한데 쉬어 돌아오는 힘은 상대적으로 덜 붙어 있어요. 그래서 성과를 내는 순간보다 그 뒤의 피로가 더 길게 남기 쉬워요.",
   "psychology_takeaway": "끝내는 힘과 쉬는 힘은 같은 속도로 자라지 않아요. 지수님은 이미 오래 버텨 온 사람이에요.",
   "strengths": [
    {
     "title": "끈질긴 추진",
     "body": "지수님은 토 50퍼센트답게 일을 손에 잡으면 끝까지 밀어 가는 힘이 있어요. 월요일 아침 알림이 와도 바로 다시 화면을 열고 정리하려는 태도는 그 추진력을 보여 줘요. 이 힘 덕분에 몰아서 버티는 구간에서도 일을 끝내는 쪽으로 가기 쉬워요."
    },
    {
     "title": "높은 기준",
     "body": "완벽주의 82퍼센트는 지수님이 대충 넘기지 않고 결과를 다듬고 싶어 한다는 뜻이에요. 일을 끝낸 뒤 다시 처음부터 훑는 습관도 그 기준 감각에서 나와요. 지수님은 스스로에게 엄격한 만큼, 결과물의 밀도도 높아지기 쉬워요."
    },
    {
     "title": "책임 감각",
     "body": "지수님은 일이 끝나도 머릿속 점검을 바로 멈추지 않을 만큼 책임을 오래 들고 가요. 그래서 맡은 일을 가볍게 흘려보내지 않고, 끝난 뒤에도 정리를 남기지 않으려 해요. 이런 태도는 주변에서 신뢰를 얻기 쉬운 힘이에요."
    },
    {
     "title": "정리 능력",
     "body": "금 17퍼센트는 기준을 세우고 흐트러진 것을 다시 맞추는 감각을 줘요. 지수님은 복잡한 일을 보면 먼저 어디가 맞는지 다시 살피는 편이에요. 번아웃이 와도 정리하려는 습관은 남아 있어서, 흐름을 회복하는 출발점이 되기 좋아요."
    }
   ],
   "weaknesses": [
    {
     "title": "멈춤 불안",
     "body": "수 0퍼센트와 회복 34퍼센트가 겹치면, 쉬는 순간이 편안한 끝이 아니라 불편한 공백처럼 느껴지기 쉬워요. 지수님은 쉬는 날에도 마음이 불편하다고 답했어요. 그래서 멈춤이 회복으로 이어지기보다, 다시 일로 돌아가게 만드는 문처럼 느껴질 수 있어요."
    },
    {
     "title": "과한 점검",
     "body": "일을 끝낸 뒤 다시 처음부터 훑는 습관은 꼼꼼함이지만, 길어지면 피로를 더 키워요. 지수님은 결과를 확인하는 동안에도 마음이 계속 일에 묶여 있어요. 그래서 완성보다 검토가 더 오래 남는 날이 생겨요."
    },
    {
     "title": "몰아치기",
     "body": "몰아서 하고 무너지는 패턴은, 버티는 동안에는 강하지만 이후의 흔들림이 커지는 방식이에요. 지수님은 한 번에 많이 해치우고 나서 크게 지치기 쉬워 보여요. 이 리듬은 성과를 만들기도 하지만, 회복의 빈틈을 쉽게 만들어요."
    },
    {
     "title": "뒤처짐 경계",
     "body": "멈추면 뒤처질까 봐 멈출 수 없다는 마음은 지수님을 계속 앞으로 끌고 가요. 하지만 그 경계가 너무 크면, 지금의 피로보다 미래의 불안이 더 크게 자리를 잡아요. 그래서 쉬는 시간에도 마음이 편하지 않은 쪽으로 흘러가요."
    }
   ],
   "fit_good": "지수님에게는 일을 끊어 놓고 바로 쉬게 하는 환경보다, 중간 점검과 마감이 분명한 환경이 잘 맞아요. 하루가 시작될 때 할 일의 순서가 보이고, 끝날 때는 어디까지 했는지가 보이는 자리가 좋아요. 그런 구조에서는 몰아서 버티는 힘이 성과로 남고, 불안은 조금 덜 흔들려요.",
   "fit_bad": "지수님에게는 알림이 계속 쌓이고 경계가 흐릿한 환경이 너무 소모적이에요. 월요일 아침처럼 갑자기 들어오는 메시지가 잦으면 머리가 쉬지 못하고 다시 긴장해요. 마감도 기준도 흐린 자리는 완벽주의를 더 지치게 만들어요.",
   "behavior_guides": [
    {
     "title": "알림 차단",
     "body": "월요일 아침처럼 긴장이 올라오는 시간대에는 메신저 알림을 한 시간만 꺼 두세요. 그 한 시간 동안은 확인보다 정리만 하고, 새 메시지는 보지 않는 규칙을 두면 좋아요. 매번 길게 하지 말고, 출근 직후처럼 불안이 올라오는 때에만 짧게 적용해 보세요."
    },
    {
     "title": "마감 멈춤",
     "body": "일을 끝낸 뒤에는 다시 훑는 시간을 10분만 정해 두세요. 그 시간이 지나면 더 보지 않고 메모만 남기고 닫아 두는 연습이 필요해요. 처음부터 완벽하게 하려 하지 말고, 하루 한 번만 지키는 것으로 시작하면 돼요."
    },
    {
     "title": "휴식 고정",
     "body": "쉬는 날에는 마음이 불편해지기 전에 미리 쉬는 순서를 만들어 두세요. 아침에 산책 20분, 오후에 화면 없는 시간 30분처럼 작게 고정하면 좋아요. 회복이 약한 사람일수록 쉬는 시간을 즉흥이 아니라 일정으로 잡는 편이 도움이 돼요."
    },
    {
     "title": "점검 분리",
     "body": "일의 점검과 자기 점검을 같은 시간에 하지 마세요. 업무는 업무 메모에, 불안은 따로 적어 두면 머릿속에서 섞이는 양이 줄어요. 하루 끝에 5분만 분리해 적어도, 밤에 계속 되감기하는 느낌이 조금 가벼워져요."
    }
   ],
   "mindset_guide": "번아웃은 불이 크게 난 뒤에만 오는 게 아니에요. 작은 불씨를 오래 들고 가도 몸은 타요. 지수님은 불을 더 세게 키우는 사람이 아니라, 중간에 물을 한 번씩 얹어야 하는 사람이에요. 쉬는 건 멈춤이 아니라, 다음 일을 끝까지 가져가기 위한 식혀 주기예요.",
   "closing_title": "오늘의 점검을 내려놓는 법",
   "closing_body": "지수님은 이미 충분히 오래 버텨 왔어요. 완벽하게 쉬지 못해도, 조금 덜 불안한 쉬는 법은 배울 수 있어요. 오늘 남기고 싶은 문장은 이거예요. 멈추는 연습도 지수님을 지켜 주는 일입니다."
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
 "casey": {
  "year": 2027,
  "title": "2027, un año para afinar",
  "subtitle": "Casey, un ciclo de presión útil, avances concretos y pausas que ordenan",
  "overview": "En 2027, el centro de metal entra en un año de fuego: eso suele sentirse como presión, exigencia y también como una oportunidad clara para pulir criterio. Con metal y madera muy marcados en los Cinco Elementos y agua ausente, conviene avanzar con intención, sin forzar ritmos solo por inercia. La imagen general es la de acero en cosecha: algo en ti se afila, se depura y aprende a dar forma con más precisión.\n\nEste año no pide velocidad constante, sino buena elección de momentos. Hay tramos en los que conviene producir, otros en los que el entorno da apoyo, y otros en los que el mejor recurso será bajar el volumen y ordenar. Si se respetan esos cambios de clima, 2027 puede sentirse menos como una prueba y más como un entrenamiento que deja firmeza, confianza y mejor dirección.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso firme",
    "body": "En dinero y recursos, 2027 favorece la iniciativa y la gestión activa: hay tramos en los que te conviene empujar resultados, decidir con claridad y poner precio a tu trabajo con más seguridad. Como tu mapa ya trae bastante madera, el impulso de crear y mover cosas puede ser fuerte; la clave estará en no abrir demasiadas líneas a la vez ni prometer más de lo que luego te deja margen.\n\nEs posible que aparezcan decisiones prácticas sobre compras, cobros, acuerdos o formas de organizar lo que entra y sale. En especial, los meses de abril, mayo y diciembre parecen más sensibles para tomar control de recursos o para revisar qué vale realmente tu esfuerzo. Si conviertes el dinero en una herramienta de orden, no en una carrera, el año se vuelve mucho más llevadero.\n\nTe puede ayudar empezar por algo simple: anotar gastos y entradas durante unas semanas, revisar una sola prioridad económica por mes y dejar una pequeña reserva para imprevistos. Así sostienes el impulso sin perder suelo, y tu relación con el dinero gana precisión sin tensión extra."
   },
   "love": {
    "heading": "Vínculos que se afinan",
    "body": "En relaciones y amor, 2027 trae mezcla de calor y fricción útil: hay momentos en los que tu presencia puede sentirse más intensa, más visible y más capaz de mover conversaciones que antes quedaban en pausa. Con tu combinación de metal fuerte y agua ausente, puede venirte bien hablar con sencillez y dejar espacio para escuchar, no solo para responder.\n\nPuede que algunas semanas te encuentren con más ganas de moverte, de quedar, de conocer gente o de dar un giro a la forma en que te vinculas. Febrero, mayo y septiembre parecen especialmente vivos: uno abre cambios, otro favorece la cercanía que se pega con naturalidad y otro aporta magnetismo y plenitud. Si eliges vínculos donde haya respeto por tu ritmo, el año te devuelve más calma que ruido.\n\nComo paso pequeño, intenta decir antes lo que necesitas, preguntar con más curiosidad y observar qué relaciones te dejan paz después del encuentro. No hace falta apurar definiciones; en 2027 te conviene reconocer quién suma claridad y quién solo añade ruido a tu día."
   },
   "career": {
    "heading": "Trabajo con más forma",
    "body": "En trabajo y carrera, 2027 te empuja a sostener responsabilidades con más presencia. El fuego del año puede hacer que te pidan decisión, respuesta rápida o capacidad de ordenar situaciones complejas, y tu metal responde bien cuando hay estructura. No se trata de hacer más por reflejo, sino de elegir mejor dónde poner tu fuerza.\n\nEs probable que entre junio y julio sientas más presión o un ritmo algo más exigente, pero también una confianza que crece si no te dispersas. Después, agosto y septiembre abren una zona más favorable para aprender de otros, recibir apoyo y recuperar impulso. Esa secuencia sugiere que tu avance puede venir menos por empuje bruto y más por constancia inteligente.\n\nUn movimiento útil sería revisar tus prioridades laborales en bloques de tres meses, definir qué tarea merece tu energía principal y dejar por escrito acuerdos o pendientes importantes. Si haces visible tu método, tu trabajo gana solidez y el entorno entiende mejor tu forma de avanzar."
   },
   "study": {
    "heading": "Aprendizaje que deja huella",
    "body": "En estudio y aprendizaje, 2027 se ve como un año de maduración: no tanto de absorber por impulso, sino de ordenar lo que ya sabes y convertirlo en criterio. Tu fuerte presencia de metal favorece la precisión, y la madera aporta curiosidad y crecimiento; juntas, esas dos fuerzas pueden ayudarte a aprender con intención si evitas dispersarte en demasiados temas.\n\nEntre febrero y marzo, y de nuevo hacia noviembre y enero, puede haber movimientos de cierre, semillas nuevas, pausas para ordenar y momentos de recogimiento. Son tramos buenos para revisar apuntes, terminar una formación, reescribir métodos o quedarte con lo esencial. Si algo te interesa de verdad, en 2027 te conviene darle forma práctica, no solo acumular información.\n\nPrueba a estudiar en sesiones breves y consistentes, con una sola pregunta guía por vez. Resumir con tus propias palabras, enseñar a otra persona o aplicar enseguida lo aprendido puede ayudarte a fijarlo mejor que leer sin pausa."
   },
   "health": {
    "heading": "Cuerpo y ánimo en equilibrio",
    "body": "En cuerpo y ánimo, 2027 pide cuidado de ritmo más que grandes cambios. El fuego del año puede subir la intensidad del día, y tu mapa, con agua ausente, agradece mucho todo lo que ayude a refrescar, pausar y ordenar. No hace falta interpretar eso de forma dramática: basta con notar cuándo vas demasiado rápido y cuándo un respiro te devuelve presencia.\n\nPuede que algunos meses te encuentren con más sensibilidad, más ganas de moverte o más necesidad de ordenar el entorno para pensar mejor. Junio y julio parecen más tensos; octubre y noviembre, más lentos y de autocuidado; diciembre y enero, más propicios para bajar ruido interno. Si escuchas esas variaciones, tu energía se reparte mejor y el día pesa menos.\n\nTe puede servir algo sencillo: dormir con horarios más estables, caminar con regularidad, beber agua con atención y dejar pequeños espacios sin pantalla. También ayuda reservar momentos de silencio para que tu mente no tenga que responder a todo a la vez."
   }
  },
  "months": [
   {
    "headline": "Febrero en movimiento",
    "body": "La relación de apoyo entre tu centro y el año se activa con ganas de producir y dar más de ti. Como además hay una sensación de cierre de ciclo y un impulso claro a moverte, puede venirte bien aceptar cambios de ritmo sin aferrarte a lo viejo. Si algo se desplaza, quizá no sea pérdida: puede ser una puerta que se abre."
   },
   {
    "headline": "Marzo, siembra lenta",
    "body": "Este mes favorece lo que crece poco a poco: ideas, hábitos y proyectos que necesitan tiempo para tomar forma. Los pequeños contratiempos piden paciencia práctica, no dramatismo; revisar dos veces antes de enviar o cerrar algo puede ahorrarte vueltas. Lo que siembres con calma en marzo tiende a agarrarse mejor."
   },
   {
    "headline": "Abril con firmeza",
    "body": "Aquí el año te da más mando sobre dinero, objetivos y resultados, así que conviene dirigir con claridad. El crecimiento silencioso sugiere que lo importante puede avanzar sin mucho ruido, mientras el mundo interior pide cierta reserva. Si eliges bien tus batallas, abril puede dejar bases muy útiles."
   },
   {
    "headline": "Mayo de encuentro",
    "body": "La energía del mes favorece acuerdos que encajan con naturalidad y asuntos que se pegan de forma orgánica. Al mismo tiempo, conviene mirar con cuidado los recursos, porque lo que parece pequeño puede pedir más atención de la que aparenta. Un gesto bien puesto puede valer más que una explicación larga."
   },
   {
    "headline": "Junio sensible",
    "body": "La presión del año se nota más y las emociones pueden quedar muy a flor de piel. Si aparece roce, será mejor bajar un punto la velocidad antes de responder, sobre todo en conversaciones importantes. Este mes te pide tacto: menos reacción automática y más elección consciente."
   },
   {
    "headline": "Julio con confianza",
    "body": "La confianza sube, pero también pueden aparecer imprevistos que cambien el orden previsto. Esa mezcla favorece respuestas flexibles, no planes rígidos. Si dejas margen para lo inesperado, julio puede enseñarte que adaptarte también es una forma de fortaleza."
   },
   {
    "headline": "Agosto que nutre",
    "body": "Aquí entra ayuda, aprendizaje y una sensación de recuperación que viene bien aprovechar. El esfuerzo empieza a dar fruto y el cambio de aire puede sentarte mejor que insistir en lo mismo. Pedir apoyo a tiempo o dejarte enseñar puede acelerar mucho más que empujar solo."
   },
   {
    "headline": "Septiembre pleno",
    "body": "Este mes trae una sensación más completa: lo recibido, lo aprendido y lo trabajado empiezan a encajar. El magnetismo puede hacer que te noten más o que ciertas propuestas encuentren mejor recepción. Si algo merece mostrarse, septiembre parece un buen momento para hacerlo con naturalidad."
   },
   {
    "headline": "Octubre más lento",
    "body": "El ritmo baja y eso no tiene por qué ser un freno: puede ser un descanso inteligente. La espera invita a no apurar resultados y a aceptar que algunas cosas maduran fuera de foco. Lo simple, bien sostenido, te resultará más valioso que perseguir novedades."
   },
   {
    "headline": "Noviembre de cuidado",
    "body": "Este tramo pide atenderte con más delicadeza y aclarar posibles malentendidos antes de que crezcan. Conviene revisar mensajes, acuerdos y tonos, porque una frase ambigua puede pesar más de lo previsto. Si hablas con precisión y escuchas con paciencia, el mes se vuelve mucho más amable."
   },
   {
    "headline": "Diciembre ordenado",
    "body": "La energía vuelve a empujar la expresión y el trabajo visible, pero con una pausa que ayuda a ordenar. El liderazgo puede aparecer de forma natural si sostienes criterio y no te dispersas. Es un mes útil para cerrar pendientes con cabeza fría y dejar menos ruido para entrar en 2028."
   },
   {
    "headline": "Enero de recogimiento",
    "body": "El año se recoge y eso favorece una mirada más tranquila sobre lo logrado y lo pendiente. El reconocimiento puede llegar de formas sutiles, así que conviene recibirlo sin apuro y sin minimizarlo. Enero te pide escuchar más hacia dentro para empezar el siguiente tramo con mejor centro."
   }
  ],
  "action_plan": [
   {
    "title": "2 a 4 meses: ordenar el impulso",
    "body": "Vigila cómo se mezcla tu deseo de producir con la necesidad de no dispersarte. Prueba a elegir una meta principal por mes y a dejar por escrito lo que sí vas a hacer, para que la energía de febrero, marzo y abril no se vaya en demasiadas direcciones."
   },
   {
    "title": "5 a 7 meses: responder con medida",
    "body": "Observa dónde sube la presión y dónde aparecen roces o cambios inesperados. En vez de apretar más, te conviene revisar tiempos, pedir aclaraciones y reservar margen para lo imprevisto, sobre todo cuando el año te exija más presencia."
   },
   {
    "title": "8 a 10 meses: aprovechar el apoyo",
    "body": "Mira qué ayuda, aprendizaje o descanso te devuelve claridad. Haz una cosa concreta con ese apoyo: pedir consejo, terminar un pendiente o simplificar una rutina, para que el tramo de agosto a octubre no se quede solo en sensación agradable."
   },
   {
    "title": "11 a 1 meses: cerrar con limpieza",
    "body": "Atiende a los meses de noviembre, diciembre y enero como un tiempo de ordenar, cuidar y recoger fruto. Te irá bien revisar acuerdos, bajar el ruido y dejar listo lo esencial para el siguiente ciclo, sin exigirte que todo quede perfecto."
   }
  ],
  "closing": "Casey, 2027 parece un año que te pide forma, no prisa; criterio, no impulso ciego. Si aceptas que habrá tramos de presión, tramos de apoyo y tramos de pausa, puedes caminarlo con bastante más serenidad.\n\nTu mejor versión este año no necesita ruido para verse: le basta con constancia, claridad y buen ritmo."
 },
 "sam": {
  "year": 2027,
  "title": "2027: a steadier, brighter rhythm",
  "subtitle": "A year of support, useful pressure, and clean momentum for Sam",
  "overview": "2027 feels like a year that feeds your foundation first and then asks you to use that strength well. Your Day Master is Earth, and your Five Elements are evenly spread with a noticeable absence of Fire, so a Fire year can feel like warmth returning to the system: more visibility, more movement, and more chances to learn by doing. For a Mountain · Order type, that often works best when you keep your structure simple and let progress build in visible steps.\n\nThe overall tone is supportive, but not flat. Early in the year, you may feel more in charge and ready to push for results; midyear brings a stronger need to pace yourself as responsibility rises; and from late summer into autumn, the rhythm becomes more familiar and settled. Sam, the most useful approach in 2027 is to treat energy as something to guide, not something to force. When you choose a clear priority, a modest schedule, and one practical next step at a time, the year can feel more rewarding and less noisy.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best with a clear hand",
    "body": "For finances, 2027 looks like a year where initiative matters, but overreaching can blur the gains. The early months are especially suited to taking charge of a project, tightening your pricing, or asking for what feels fair. Because your Earth nature tends to like stability, you may do best when money decisions are tied to concrete plans rather than excitement alone.\n\nIn everyday life, this could look like reviewing subscriptions, renegotiating a fee, or noticing that a side effort finally starts to feel more organized. Midyear may ask for more caution around shared spending or rushed choices, especially when the pace around you gets louder. A simple budget check, a written list of priorities, and one measured goal can keep the year feeling grounded.\n\nA good rule for 2027 is to prefer clean gains over fast ones. If something looks promising, give yourself one more day to read the details, compare options, or ask a clarifying question. That small pause can protect your energy and help you move with confidence instead of pressure."
   },
   "love": {
    "heading": "Connections warm up with honest timing",
    "body": "In relationships, 2027 brings a helpful mix of warmth, steadiness, and a few moments that ask for patience. Because the year’s Fire supports you, people may feel easier to reach, and your own warmth may come through more naturally. For a Mountain · Order type, that often means connection grows best when it has a clear shape: honest words, reliable follow-through, and room to breathe.\n\nYou might notice more invitations, more active back-and-forth, or a stronger pull to sort out what you really want from the people around you. Midyear can feel a little more intense, especially when outside demands take up space, so it may help to avoid assuming others can read your mood. A direct message, a calm explanation, or a simple plan for meeting again can keep things from drifting.\n\nIf you’re building a new connection, let it unfold in layers rather than trying to name everything too soon. If you’re deepening an existing bond, small acts of consistency may say more than big declarations. In 2027, steady attention is likely to feel more attractive than dramatic effort."
   },
   "career": {
    "heading": "Work rewards structure with spark",
    "body": "Career matters in 2027 look active and constructive, especially when you give your ambition a clear lane. The year supports help, learning, and recovery, which can make it easier to repair a workflow, find a better rhythm with colleagues, or return to something you already know with more confidence. Your Earth core and Mountain · Order style suggest that you may shine when you bring order to moving parts.\n\nA likely scene could be a project that starts to gain visibility, a task list that becomes more manageable once you simplify it, or a role that asks you to lead without making everything louder. Early in the year, it may be easier to push for results; midyear may require more patience and slower judgment as pressure increases. You may do best by keeping one main objective at the center and trimming distractions around it.\n\nThe useful move in 2027 is to be decisive without becoming rigid. If a plan changes, you may find it easier to adapt when you have already defined what matters most. That kind of disciplined flexibility can make your work feel both more effective and more humane."
   },
   "study": {
    "heading": "Learning lands when it becomes usable",
    "body": "Learning in 2027 looks practical, embodied, and easier to keep when it connects to real life. This is a year where support and recovery are available, so study may feel less like forcing yourself and more like gathering exactly what you need. For you, that suits a Mountain · Order pattern: knowledge tends to stick when it has a shelf, a sequence, or a clear purpose.\n\nYou may find yourself returning to a skill, reviewing something you already know, or learning faster when there’s a visible outcome attached. Midyear could bring more pressure on your time, so shorter study sessions may work better than long, idealized ones. A note system, a weekly review, or a small learning project can help your attention stay warm instead of scattered.\n\n2027 is especially friendly to learning by doing. If you read something useful, try it quickly; if you hear a good idea, test it in a small way. That practical loop can turn scattered information into confidence you can actually use."
   },
   "health": {
    "heading": "Energy stays best when your pace is kind",
    "body": "For body and mind care, 2027 favors rhythm, warmth, and reasonable pacing. Since Fire is missing from your Five Elements, this Fire year can feel like a welcome boost, but it may also ask you to manage stimulation so it doesn’t become too much. The goal is not intensity; it’s a steady sense of being fueled without being burned out.\n\nIn daily life, you might notice that clear routines help more than big bursts of motivation. Morning light, regular meals, a tidy workspace, and brief breaks can all support the kind of calm energy that suits a Mountain · Order type. Midyear may bring more friction or sudden turns in the schedule, so keeping a little slack in your day can make everything feel easier to absorb.\n\nA gentle practice in 2027 is to check in with your pace before you check your performance. If you feel scattered, slow the sequence down; if you feel flat, add something warm, social, or moving. Small adjustments are likely to work better than trying to overhaul everything at once."
   }
  },
  "months": [
   {
    "headline": "A strong start",
    "body": "February opens with a sense that you can steer things directly. This is a good time to initiate, ask, and move, especially if you keep your aim sharp and your appetite for results realistic."
   },
   {
    "headline": "Sharper edges",
    "body": "March still supports initiative, but small hiccups may ask for extra attention to detail. If a plan feels slightly off, one careful review can save you from having to backtrack later."
   },
   {
    "headline": "Pressure with purpose",
    "body": "April brings more responsibility and a stronger need to pace yourself. The good news is that a calm inner focus can make the pressure feel productive rather than heavy."
   },
   {
    "headline": "Stay nimble",
    "body": "May can feel more intense, with unexpected turns asking you to adjust quickly. You may do best by keeping your schedule flexible and your expectations modest."
   },
   {
    "headline": "A helpful reset",
    "body": "June brings support, learning, and recovery back to the front. Because this month carries a clash-like tension with your base rhythm, a change of plan or a fresh approach may be exactly what moves things forward."
   },
   {
    "headline": "Warm support",
    "body": "July feels more open and forgiving, with room for help to land where it’s needed. The energy is a little wild, so staying receptive without trying to control every detail can work in your favor."
   },
   {
    "headline": "Easy momentum",
    "body": "August settles into a familiar, comfortable flow. It may not be the most dramatic month, but it can be a reliable one for steady progress and low-friction routines."
   },
   {
    "headline": "Quiet attraction",
    "body": "September keeps the same easy rhythm, with a stronger pull toward people and things that naturally suit you. A tidy-up mindset can help you notice what’s worth keeping close."
   },
   {
    "headline": "Useful output",
    "body": "October is better for producing, sharing, and giving than for conserving energy. Waiting patiently for the right opening may feel wiser than rushing to be seen."
   },
   {
    "headline": "Speak carefully",
    "body": "November keeps the same outward, expressive tone, but misunderstandings can be easier to slip into. Clear wording and a second look at messages or plans can spare you avoidable confusion."
   },
   {
    "headline": "Direct and decisive",
    "body": "December brings a stronger sense of command and the urge to push outcomes forward. This can be productive if you keep ambition clean and avoid adding extra pressure just because you can."
   },
   {
    "headline": "A quiet alignment",
    "body": "January softens into a more inward, forming phase, and the energy may feel as though it is settling into place. Because this month also brings an easier fit with your base rhythm, agreements, partnerships, or shared plans may feel more natural to build."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: set the frame",
    "body": "Watch for a rise in initiative, visibility, and the urge to move quickly. Choose one goal, one budget check, or one workflow to refine, and let that be the main place where your energy goes."
   },
   {
    "title": "May to July: pace the pressure",
    "body": "Notice where responsibility increases and where plans start changing shape. Build in extra time, ask one clarifying question before committing, and keep a backup version of anything important."
   },
   {
    "title": "August to October: use the easy stretch",
    "body": "Look for the months that feel more familiar and productive. Use that steadier rhythm to finish tasks, clear clutter, and turn loose ideas into something concrete and shareable."
   },
   {
    "title": "November to next January: refine and align",
    "body": "Pay attention to wording, timing, and the way agreements feel in practice. A careful review, a quieter pace, and one well-timed collaboration can help you enter the next cycle with more ease."
   }
  ],
  "closing": "Sam, 2027 looks less like a year of random luck and more like a year that responds well to your sense of order. When you lead with clarity, keep your pace humane, and let support arrive before forcing the next step, the year can feel both productive and surprisingly kind."
 },
 "jordan": {
  "year": 2027,
  "title": "2027, your steady spark",
  "subtitle": "A year for shaping results with care",
  "overview": "2027 asks you to work with a warm, decisive current that you can guide rather than simply follow. For you, Jordan, that can feel like a year where effort turns into visible results more easily, especially when you keep your intentions clear and avoid pushing past what the moment can hold. Your chart leans strongly toward Earth and Metal, with less Wood and Water, so this Fire year can bring momentum, visibility, and useful pressure without needing to become loud.\n\nThe first half of the year feels more familiar, almost like warming up in a room you already know. That can be comforting, but it may also make it easier to stay in old habits. The middle stretch asks for sharper judgment: there are windows for initiative, but also moments when pace, timing, and restraint matter more than force. The later months soften into support, learning, and recovery, which can help you gather what you’ve built and decide what deserves to continue into 2028.",
  "chapters": {
   "wealth": {
    "heading": "Money works best when you steer it",
    "body": "In 2027, money themes look more active and more responsive to your choices. Because the year’s energy leans in a direction you can guide, it can be a useful time for setting prices, asking for fair value, organizing resources, and turning effort into something tangible. With so much Earth and Metal in your chart, you may already be good at structure and follow-through; this year can reward that strength as long as you don’t try to force every outcome at once.\n\nIn daily life, this may show up as a month where a project becomes easier to monetize, a negotiation feels more direct, or you realize that a practical system saves more energy than a bigger push. June and July can feel especially active, with a sense that opportunities are close enough to touch, while August and September may ask for more caution around timing and expectations. If a choice needs one more round of checking, that extra pause may protect both your time and your confidence.\n\nA helpful approach is to keep your money decisions simple and visible. Pick one area to tidy up in the spring, one goal to pursue in early summer, and one habit to review in the autumn. Jordan, 2027 favors clean structure over dramatic moves, so the more clearly you can see what is coming in and going out, the easier it may be to make steady gains."
   },
   "love": {
    "heading": "Connection grows through timing",
    "body": "Relationships in 2027 may feel easier to shape when you’re honest about pace. The year’s warm, outward energy can make you more noticeable, more expressive, and more willing to initiate, but it also benefits from care and proportion. Since your chart has less Wood and Water, it may help to let curiosity and softness enter the picture deliberately, instead of expecting connection to happen only through consistency and duty.\n\nYou might notice periods when people respond quickly to your warmth, then later moments when misunderstandings or mixed signals make things feel slightly off. That does not need to mean anything is wrong; it may simply mean the timing is changing. August could feel more sensitive, with a need to read the room carefully, while November may bring a turn in the conversation, a new perspective, or a fresh opening through movement, travel, or a change in routine.\n\nIf you want relationships to feel easier in 2027, try making room for small gestures rather than big declarations. A direct message, a thoughtful check-in, or a lighter plan can carry more weight than you expect. Let some connections unfold at their own pace, and let the warmer months show you who meets your energy with steadiness rather than speed."
   },
   "career": {
    "heading": "Work favors clean initiative",
    "body": "Career-wise, 2027 looks like a year where your effort can become visible in a practical way. Because the year’s energy is something you can direct, it can support leadership, responsibility, and results, especially when you know what outcome you’re trying to create. Your Dew · Order type suggests that you do well when things have both flow and structure, and this year may reward exactly that blend.\n\nAt work, the spring may feel more familiar and less stimulating, while April and May can bring a stronger need to produce, present, or help. June and July may be the most useful window for taking initiative, asking for what you need, or moving a project forward with confidence. Later, August and September may bring a sense of pressure or accountability, which can actually become a strength if you slow down enough to keep your steps clean and deliberate.\n\nA good strategy in 2027 is to choose one lane at a time. Instead of trying to prove everything, focus on the work that clearly shows your judgment and reliability. If a decision needs a second look, give it one; if a task can be done with less noise, let it stay simple. That kind of discipline may help your results feel both stronger and calmer."
   },
   "study": {
    "heading": "Learning deepens through repetition",
    "body": "Learning in 2027 may work best when it is steady, applied, and a little practical. Your chart’s strong Earth and Metal can support memory, organization, and pattern recognition, while the year’s Fire energy can help ideas become more visible and easier to share. That means you may learn fastest when you can explain, demonstrate, or use what you’re studying right away.\n\nIn everyday terms, this could look like taking in information quickly in the spring, then needing a more deliberate rhythm in the middle of the year so the material actually sticks. October and November may be especially helpful for study, review, mentorship, or returning to something you already know with a fresher perspective. A month with a sudden change in plans may also push you to learn in a new way, which can be surprisingly useful even if it feels inconvenient at first.\n\nTry building a study routine that is short enough to keep, but structured enough to matter. A small weekly review, a clear note system, or one repeated practice session can go further than a burst of intensity. In 2027, your mind may do well when it has both order and breathing room."
   },
   "health": {
    "heading": "Protect your rhythm, not your pace",
    "body": "For body and mind care, 2027 seems to ask for rhythm rather than intensity. Fire can be energizing, but for you it may work best when it is balanced by regular rest, clear transitions, and enough quiet to process what you’re carrying. Since your chart already leans toward structure, it may be easy to keep going on discipline alone; this year may ask you to notice when a slower pace is actually what helps you stay steady.\n\nYou may feel most comfortable when the day has a shape: a calm start, a focused middle, and a real stopping point. In the busier months, especially June through September, it may help to avoid stacking too many expectations into one stretch of time. Later in the year, support and recovery may come more naturally, so simpler routines, earlier nights, and lighter commitments could feel surprisingly restoring.\n\nA practical way to work with 2027 is to make your routine visible. Keep one anchor habit in the morning, one in the evening, and one weekly reset that helps you clear mental clutter. Jordan, that kind of order can give your energy somewhere safe to land, which may make the whole year feel more manageable."
   }
  },
  "months": [
   {
    "headline": "February: easy ignition",
    "body": "February may feel familiar in a comforting way, like stepping back into a rhythm you already know. Because the month carries a renewal quality, small surprises can also appear, so it may help to stay open to changes in plans without overreacting to them."
   },
   {
    "headline": "March: warm momentum",
    "body": "March can bring a sense of fresh start, but also a little friction around timing or tone. If conversations feel slightly sharper, a slower reply or a clearer question may keep things moving without unnecessary strain."
   },
   {
    "headline": "April: giving mode",
    "body": "April leans toward expression, production, and generosity, which can make it a lively month for sharing your work. The tradeoff is energy use, so a realistic schedule may serve you better than trying to do everything at once."
   },
   {
    "headline": "May: open ground",
    "body": "May may feel like a month where something new wants room to emerge. Because the ground feels fresh, this can be a good time to test an idea, start a draft, or let a new connection develop without forcing a final shape."
   },
   {
    "headline": "June: clear leverage",
    "body": "June looks strong for initiative, results, and practical wins. You may feel a stronger pull to act, and that can work well if you keep your goals precise instead of stretching for too much at once."
   },
   {
    "headline": "July: quiet harvest",
    "body": "July may bring a quieter version of the same productive current, with more emphasis on holding what you’ve built. If something is already in motion, this could be the month to stabilize it rather than constantly adding more."
   },
   {
    "headline": "August: careful reading",
    "body": "August may ask for extra attention to timing, especially when people or plans feel more tightly linked. Because this month can bring a strong sense of overlap, checking assumptions before you act may save you from avoidable confusion."
   },
   {
    "headline": "September: firm edges",
    "body": "September can feel more responsible and more demanding, but also more defining. If you choose your pace carefully, the pressure may help you clarify what belongs and what doesn’t, which can be oddly satisfying."
   },
   {
    "headline": "October: support returns",
    "body": "October may feel like help arrives in practical or intellectual forms. It can be a good time for guidance, study, or recovery of confidence, especially if you let yourself receive input instead of carrying everything alone."
   },
   {
    "headline": "November: turning point",
    "body": "November can bring movement, change, or a shift in perspective that opens a new route. Because the month may nudge you out of a fixed pattern, flexibility could matter more than perfect planning."
   },
   {
    "headline": "December: steady finish",
    "body": "December feels familiar again, with less novelty and more chance to consolidate what matters. Small snags may appear, but they are likely to be manageable if you keep your expectations simple and your process tidy."
   },
   {
    "headline": "January: inner focus",
    "body": "January may feel quiet on the surface, but rich underneath, like a month for private sorting and subtle preparation. If you use it to gather your thoughts, the next cycle may begin with a cleaner sense of direction."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: set the tone",
    "body": "Watch for familiar routines that make it easy to coast. Try one small change in how you plan your week, so the spring energy has a place to land without becoming scattered."
   },
   {
    "title": "May to July: shape the result",
    "body": "Notice where your effort starts turning into visible progress. Choose one project, one conversation, or one practical goal to push forward, and keep the scope clear enough that momentum stays useful."
   },
   {
    "title": "August to October: slow the lens",
    "body": "Pay attention to moments when timing feels sensitive or information arrives in layers. Build in one extra check, one pause, or one second opinion before you commit to the next step."
   },
   {
    "title": "November to next January: gather and refine",
    "body": "Look for support, learning, and quiet consolidation. Use this stretch to review what worked, keep what feels sturdy, and let the rest become simpler before the next year begins."
   }
  ],
  "closing": "2027 doesn’t ask you to become someone else; it asks you to use your existing strengths with more timing and care. If you let the year be warm without rushing it, steady without flattening it, and productive without overreaching, it may feel surprisingly well matched to you. Jordan, there’s a lot here to build with, and you don’t need to build it all at once."
 },
 "riley": {
  "year": 2027,
  "title": "2027: Riley's steady bloom",
  "subtitle": "A year of giving, refining, and finding the right pace",
  "overview": "2027 feels like a year that asks you to keep moving while also noticing where your energy goes. Your core nature is strongly Wood, with a rooted, oak-like quality: steady, persistent, and able to grow well when there is clear direction. In 2027, Fire is active, and Fire tends to turn Wood into expression, output, and visible effort. That means there is a natural push toward creating, sharing, teaching, and producing, but it can also feel like you are spending energy faster than usual.\n\nBecause your chart already carries plenty of Wood and very little Fire, 2027 may feel less like forcing a new identity and more like learning how to use your existing strength with better timing. The early part of the year looks especially supportive for receiving help, learning, and recovering momentum. Midyear shifts toward action and contribution, then late summer asks for sharper choices around money, ownership, and results. The final stretch brings more pressure in a constructive way, which can help you become sturdier if you keep the pace humane.\n\nFor Riley, the big theme is simple: don’t confuse constant effort with effective effort. In 2027, small adjustments, honest pauses, and selective commitment can go much farther than trying to carry everything at once.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best with timing",
    "body": "In 2027, money matters look less like a straight sprint and more like a question of timing, priorities, and how firmly you want to steer your own resources. Since the year’s Fire energy supports output and initiative, it can be a good time to turn skills into visible results, but your strong Wood nature may also want to keep giving more than is strictly necessary. That makes it important to notice where effort is creating value and where it is just creating motion.\n\nYou may see this in practical moments: a project that asks for clearer pricing, a side task that becomes more demanding than expected, or a chance to organize what you already have so it works harder for you. The late-summer period especially looks active for ownership, income, and results, while asking you not to overreach just because momentum is strong. Riley, if something feels exciting and urgent at the same time, that may be a good cue to slow the decision down by one beat.\n\nA useful approach in 2027 is to define one or two priorities and let the rest be secondary. Keep your records clean, compare options carefully, and choose the path that leaves you with energy after the task is done, not only applause in the moment."
   },
   "love": {
    "heading": "Connection through honest warmth",
    "body": "Relationships in 2027 tend to work best when warmth is paired with clarity. Your chart’s rooted Wood nature often prefers loyalty, steadiness, and thoughtful care, and the year’s Fire energy can make that care more visible, expressive, and generous. That can be beautiful for closeness, but it also means you may need to watch for overextending yourself to keep a connection comfortable for everyone.\n\nIn daily life, this could show up as more invitations, more conversation, or a stronger pull to be the person who keeps things moving. Some months are especially receptive to support and attraction, while a few later months may bring sharper exchanges or mixed signals that are easier to handle if you ask direct questions early. If you notice yourself guessing too much, it may help to name what you need in plain language rather than hoping the other person will infer it.\n\nThe most helpful move in 2027 is to let affection be practical. Small gestures, consistent check-ins, and simple honesty can do more than dramatic declarations. You don’t need to perform closeness; you can build it."
   },
   "career": {
    "heading": "Visible work, better directed",
    "body": "Career-wise, 2027 looks like a year where your effort is easier to see. Fire supports expression, so your ideas, contributions, and output may become more noticeable to others, and that can open doors when you are ready to show what you can do. At the same time, because you are naturally strong in Wood, there may be a tendency to keep growing in every direction instead of choosing the most strategic branch.\n\nYou might feel this as busier calendars, more requests for your help, or a stronger need to prove yourself through action. Midyear especially may bring a sense of responsibility and visible leadership, while late summer can shift the focus toward ownership and results. If the pace rises, it may help to decide in advance what kind of work is worth your best energy and what can be done more simply.\n\nFor Riley, 2027 favors clean execution over heroic effort. Make the next step obvious, keep communication direct, and protect time for finishing what you start. The people around you are more likely to trust your work when your boundaries are clear."
   },
   "study": {
    "heading": "Learning that restores and sharpens",
    "body": "Learning in 2027 looks especially supportive in the early and later parts of the year, when help, recovery, and fresh perspective can come in more naturally. Your strong Wood foundation is well suited to steady accumulation, and the year’s pattern suggests that knowledge may land best when it is tied to real use rather than abstract collecting. This is a good year to learn in a way that feeds both confidence and practicality.\n\nYou may notice that some topics come easily when someone explains them well, or that you retain more when you can immediately apply what you read. A few months may bring a stronger sense of momentum, while others feel quieter and more reflective, almost like your mind is storing material for later use. If you feel mentally scattered, that may be a sign to simplify the input rather than push harder.\n\nA strong strategy in 2027 is to keep a short list of what you are truly studying, not everything that catches your attention. Revisit notes, ask better questions, and let repetition do some of the work. What you absorb calmly is likely to stay with you longer than what you rush through."
   },
   "health": {
    "heading": "Protect your rhythm, not just your energy",
    "body": "For body and mind, 2027 is less about intensity and more about rhythm. The year’s Fire energy can make you feel more active, expressive, and outward-facing, but because that energy is something you naturally help produce, it may also leave you feeling used up if you never step back. Your oak-like, rooted style does best when the pace is steady enough for your system to keep up.\n\nIn ordinary life, this may look like feeling fine when you are engaged, then suddenly noticing you need more quiet than you expected. Some months feel replenishing, some feel busy, and a few ask you to slow down and sort yourself out before you continue. That does not mean something is wrong; it may simply mean your energy works best in cycles, not in a constant push.\n\nThe most helpful habit in 2027 is to build small recovery moments into the week before you feel depleted. Keep sleep, meals, movement, and screen time reasonably regular, and give yourself permission to pause after especially social or demanding days. A little consistency will likely serve you better than dramatic resets."
   }
  },
  "months": [
   {
    "headline": "Fresh ground",
    "body": "February opens with a feeling of support entering the picture. The energy around you may feel like it is helping you gather strength, learn faster, or recover your footing after a quiet stretch. New beginnings can feel practical rather than flashy here."
   },
   {
    "headline": "Full magnetism",
    "body": "March can feel especially alive and receptive, with people, ideas, or opportunities seeming easier to draw toward you. It’s a good month for being visible, asking for help, or noticing what naturally comes your way. If you stay open, useful connections may arrive without much forcing."
   },
   {
    "headline": "Easy drift",
    "body": "April may feel familiar and comfortable, though less stimulating than the months before. This can be a good time to keep things simple and enjoy routines that already work. You may not need to chase novelty to make the month worthwhile."
   },
   {
    "headline": "Quiet caution",
    "body": "May brings a softer, more winding energy, and misunderstandings may be easier to create if you move too quickly. It may help to check assumptions before reacting and to give conversations a little extra room. What seems unclear at first could become clearer with one more look."
   },
   {
    "headline": "Steady output",
    "body": "June shifts into a more productive mode, with a feeling of giving, producing, and handling more at once. You may be asked to take the lead or carry something important, and that can feel satisfying if you pace yourself well. It’s a month where structure can keep generosity from turning into exhaustion."
   },
   {
    "headline": "Stored momentum",
    "body": "July keeps the same outward, expressive tone, but with a more contained quality underneath it. Progress may look quieter than expected, as if useful things are being tucked away for later use. Advancement is possible, especially if you keep doing the work without needing instant applause."
   },
   {
    "headline": "Turning point",
    "body": "August brings a strong push toward ownership, results, and direct action, and it may also stir up a need to move or change direction. Because the month carries a clash-like tension, a sudden shift in plans or priorities may feel more likely than usual. Keep your choices intentional, and don’t let urgency make the decision for you."
   },
   {
    "headline": "Small friction",
    "body": "September still favors initiative and results, but the path may contain a few minor snags. This is a good month for refining details, checking numbers, and staying practical about what can actually be finished. If you keep your expectations realistic, the month can still be productive."
   },
   {
    "headline": "Inner pressure",
    "body": "October may feel more serious, with responsibility or pressure asking you to move at a measured pace. The best results are likely to come from focusing inward and choosing quality over speed. Quiet concentration can turn this into a month of real strengthening."
   },
   {
    "headline": "Unexpected opening",
    "body": "November keeps the serious tone, but with a more surprising and lively twist. A helpful connection or well-timed development may come together in ways you didn’t plan for. Stay flexible, because what arrives may fit better than what you tried to arrange."
   },
   {
    "headline": "Renewing warmth",
    "body": "December brings a sense of replenishment, as if support and recovery are finding their way back in. The month may feel a little frictive at first, but that tension can help you see what needs to be adjusted before the new year. Gentle consistency will likely work better than forcing closure."
   },
   {
    "headline": "Wildcard momentum",
    "body": "January of 2028 carries a lively, less predictable energy that can still feel useful if you stay adaptable. Fresh ideas, sudden changes, or a quick turn in plans may keep things interesting. If you treat the month as a chance to respond creatively rather than control everything, it can move in your favor."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: receive and simplify",
    "body": "Watch for support, learning, and recovery coming in more easily than usual. Your best action is to reduce clutter in your schedule and keep one clear learning or planning priority so the helpful energy has somewhere to land."
   },
   {
    "title": "May to July: express with boundaries",
    "body": "Notice where your output is growing and where you may be giving too much. Try choosing one project, one relationship habit, or one work responsibility to handle with extra care, while letting the rest stay simpler."
   },
   {
    "title": "August to October: steer carefully",
    "body": "Pay attention to shifts in money, ownership, and direction, especially when momentum feels strong. A good action is to pause before committing, compare options in writing, and choose the path that leaves room for adjustment."
   },
   {
    "title": "November to January: consolidate and reset",
    "body": "Look for surprising openings, then use the quieter moments to store what you’ve learned. A practical step is to review the year, keep what worked, and enter the next cycle with a lighter, more organized load."
   }
  ],
  "closing": "2027 is not asking you to become someone else. It is asking you to use your steady, rooted strength with more precision, so your effort creates more than it drains. Riley, if you move with care, the year can feel not only productive, but deeply formative."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, un año para afinar",
  "subtitle": "Lucía, un ciclo de empuje con pausas útiles y buen oído para lo que conviene sostener",
  "overview": "En 2027, tu mapa se mueve con una energía de fuego que tú sí sabes manejar. Como tu centro es agua y tu perfil se parece a un rocío que busca orden, el año te invita a tomar iniciativa sin perder sensibilidad: hay impulso para mover recursos, buscar resultados y dar forma a lo que te importa, pero conviene cuidar el exceso de prisa o de control. Con tus Cinco Elementos bastante apoyados por tierra y agua, y con poco metal, te viene bien simplificar, afinar criterios y dejar espacio para que las cosas respiren.\n\nLa primera mitad del año suele sentirse más expresiva y demandante: habrá meses para mostrar, producir y sostener ritmo, y otros en los que la presión suba para pedir más estructura. En cambio, hacia el último tramo aparece un tono más nutritivo, con ayuda, aprendizaje y recuperación de energía. Si escuchas el ritmo de 2027 en vez de forzarlo, puedes avanzar con más claridad y menos desgaste, como quien riega con medida: suficiente para que crezca, no tanto como para encharcar.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso firme",
    "body": "En 2027, el dinero y los recursos se mueven mejor cuando tú marcas el ritmo. Como la energía del año te da margen para dirigir y obtener resultados, puede ser un tiempo favorable para ordenar ingresos, pedir lo que corresponde y convertir esfuerzo en algo tangible. A la vez, el mismo impulso puede llevarte a querer abarcar más de la cuenta, así que te conviene medir cada paso con calma.\n\nEn lo cotidiano, esto puede verse en decisiones pequeñas pero importantes: revisar pagos, comparar opciones antes de comprometerte o poner orden en lo que entra y sale para no depender del impulso del momento. También puede aparecer la tentación de resolver todo de una vez, sobre todo entre junio y julio, cuando la sensación de control crece. Si ese impulso aparece, te ayudará más una lista clara que una reacción rápida.\n\nEmpieza por una sola costumbre: anota lo que llega y lo que sale durante unas semanas, sin juzgarlo. Desde ahí, Lucía, será más fácil detectar dónde hay margen para mejorar, qué gasto merece quedarse y qué meta conviene trabajar con paciencia."
   },
   "love": {
    "heading": "Vínculos más claros",
    "body": "En los vínculos, 2027 favorece una forma de relacionarte más directa y visible. Habrá meses en los que te resulte natural mostrar afecto, proponer encuentros o sostener conversaciones con más presencia, pero también momentos en los que la sensibilidad suba y cualquier malentendido pese un poco más. Por eso te conviene hablar con sencillez y no dar por supuesto que la otra persona lee entre líneas.\n\nEn la vida diaria, esto puede verse como mensajes que necesitan una segunda lectura, planes que cambian de tono a mitad de camino o ganas de acercarte más a ciertas personas sin saber del todo cómo decirlo. Hacia septiembre, el clima puede pedirte un cambio de enfoque: no para alejarte, sino para revisar qué vínculo necesita más espacio, cuál necesita más cuidado y cuál ya no se sostiene con la misma facilidad.\n\nPrueba algo simple: antes de responder en caliente, haz una pausa breve y formula lo que quieres decir en una frase corta. Esa pequeña claridad puede abrir más puertas que una explicación larga."
   },
   "career": {
    "heading": "Trabajo con dirección",
    "body": "En el trabajo, 2027 te favorece cuando tomas iniciativa con criterio. Hay una mezcla interesante entre empuje y orden: puedes producir más, hacer visibles tus aportes y ganar reconocimiento si sostienes un ritmo estable. Como tu perfil busca estructura y tus Cinco Elementos ya muestran bastante tierra, te conviene construir sobre bases sólidas en vez de improvisar demasiado.\n\nEn la práctica, esto puede traducirse en meses donde te toque presentar ideas, coordinar tareas o asumir más responsabilidad sin perder el hilo. Entre agosto y septiembre, la presión puede subir y pedirte más atención a los recursos, al tiempo y a la forma de repartir tu energía. Si el entorno se vuelve más exigente, responder con método te ayudará más que correr detrás de todo.\n\nUn buen comienzo sería elegir una prioridad por bloque de tiempo y cerrarla antes de abrir otra. Así, tu avance se verá más limpio y tendrás más margen para sostener lo que construyas."
   },
   "study": {
    "heading": "Aprender con enfoque",
    "body": "El aprendizaje en 2027 se beneficia de tu capacidad para observar, ordenar y retener lo esencial. No parece un año para dispersarte en demasiadas líneas a la vez, sino para profundizar en lo que sí te sirve y dejar que el conocimiento se asiente poco a poco. Tu agua interior puede absorber mucho, pero necesita estructura para no quedarse en pura intuición.\n\nEn lo cotidiano, esto puede verse en lecturas que te abren una puerta nueva, cursos que avanzan mejor cuando tienes un plan o conversaciones que te dejan una idea útil para después. Entre octubre y noviembre, el clima tiende a favorecer la ayuda, la recuperación y el aprendizaje con menos fricción, así que puede ser un buen tramo para retomar algo que habías dejado en pausa o para recibir apoyo de alguien con más experiencia.\n\nTe conviene estudiar en bloques cortos y con una meta concreta: entender una cosa, practicarla y dejarla asentarse. Si haces eso, el aprendizaje se vuelve más liviano y mucho más tuyo."
   },
   "health": {
    "heading": "Cuidar el ritmo interno",
    "body": "En 2027, tu bienestar se relaciona mucho con el ritmo, el descanso y la manera en que administras tu energía mental. Con tanta tierra en tu mapa, a veces puedes sostener más de lo que parece, pero eso no siempre significa que convenga apretar. El año trae momentos de recogimiento y vida interior, así que escuchar tu propio tempo puede ayudarte a mantenerte más estable y presente.\n\nEn la vida diaria, esto puede sentirse como necesidad de silencio, ganas de ordenar tu entorno o una sensibilidad mayor cuando acumulas demasiados estímulos. Los meses de agosto y septiembre pueden pedirte más cuidado con la sobrecarga; en cambio, hacia noviembre y enero, el clima se vuelve más amable para recuperar aire y volver a una cadencia más tranquila. Pequeños ajustes, como dormir a horas parecidas o dejar un espacio sin pantallas, pueden marcar una diferencia real.\n\nEmpieza por una rutina sencilla que sí puedas repetir: una pausa breve al despertar, una comida sin apuro o diez minutos para cerrar el día. No hace falta hacer mucho; basta con hacerlo con constancia."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "La energía del mes se parece bastante a la tuya, así que puede sentirse conocida y cómoda. A la vez, la sensibilidad está más abierta y los malentendidos pueden aparecer si das por sentadas ciertas cosas; te ayudará comprobar antes de suponer."
   },
   {
    "headline": "Marzo en brote",
    "body": "Sigue un clima cercano al tuyo, pero con un empuje de inicio que invita a mover algo nuevo. Puede ser un mes bueno para tomar la delantera en un plan pequeño y dejar que tu presencia se note sin forzar el resultado."
   },
   {
    "headline": "Abril que muestra",
    "body": "Aquí la energía pide expresarte y producir, aunque eso te demande más esfuerzo de lo normal. También puede traer reconocimiento, así que conviene enseñar lo que haces sin esconder tu trabajo detrás de la modestia."
   },
   {
    "headline": "Mayo en expansión",
    "body": "El mes favorece sembrar, ofrecer y poner en marcha ideas que necesitan movimiento. Si sientes más ganas de ir y venir, úsalo para avanzar en tareas concretas; la clave estará en no dispersarte."
   },
   {
    "headline": "Junio de empuje",
    "body": "La energía te da más control sobre resultados, dinero y decisiones prácticas. Es un buen tramo para tomar el mando, pero conviene vigilar el exceso de confianza y revisar dos veces lo que quieras cerrar."
   },
   {
    "headline": "Julio hacia dentro",
    "body": "Sigue el impulso para dirigir y conseguir, pero con un tono más interior y reservado. Puede venirte bien trabajar en silencio, ordenar prioridades y proteger tu espacio mental antes de dar el siguiente paso."
   },
   {
    "headline": "Agosto con peso",
    "body": "El mes pide responsabilidad y atención a los recursos; si sube la exigencia, tendrás que elegir bien la velocidad. Avanzar con método te ayudará a convertir la presión en solidez."
   },
   {
    "headline": "Septiembre en cruce",
    "body": "Aquí la tensión puede sentirse más directa y los roces, más fáciles de notar. Como la energía del mes choca con tu base, puede marcar un giro útil si aceptas cambiar de enfoque en vez de insistir en lo mismo."
   },
   {
    "headline": "Octubre que nutre",
    "body": "La energía se acomoda para darte apoyo, aprendizaje y recuperación. Al mezclarse bien con tu base, puede ser un mes muy útil para retomar confianza, pedir ayuda o dejar que algo se ordene por sí solo."
   },
   {
    "headline": "Noviembre abierto",
    "body": "Sigue llegando ayuda, pero con un matiz más móvil y cambiante. Puede ser un buen momento para moverte, recibir ideas nuevas y dejar que el entorno te ofrezca una perspectiva distinta."
   },
   {
    "headline": "Diciembre con fruto",
    "body": "La energía vuelve a parecerse bastante a la tuya y eso da una sensación de familiaridad. Lo trabajado empieza a mostrar resultados, así que te conviene reconocer lo que sí salió bien y no mirar solo lo pendiente."
   },
   {
    "headline": "Enero paciente",
    "body": "El mes mantiene un tono afín a tu forma de ser, con más confianza y menos urgencia. Puede sentirse como una espera fértil: no todo se mueve rápido, pero lo que se sostiene ahora gana base para después."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Observa cómo se mezclan la sensibilidad y el impulso de mostrar lo que haces. Prueba a llevar una lista breve de pendientes y a cerrar una cosa al día; así podrás notar dónde se te va la energía sin perderte en la dispersión."
   },
   {
    "title": "De mayo a julio",
    "body": "Fíjate en los meses donde más ganas tengas de empujar resultados y de dirigir recursos. Elige una meta concreta por semana y revísala al final del día; eso te ayudará a evitar excesos y a usar mejor tu fuerza."
   },
   {
    "title": "De agosto a octubre",
    "body": "Atiende a la presión que pide orden y al giro que puede abrirse después. Si aparece tensión, reduce el ruido alrededor, pide una aclaración y deja que el cambio te lleve a una forma más simple de avanzar."
   },
   {
    "title": "De noviembre a enero",
    "body": "Aprovecha el tramo más nutritivo para aprender, recuperar ritmo y consolidar lo que ya venías construyendo. Haz una revisión tranquila de lo que te dio resultado y guarda una pequeña rutina que puedas repetir sin esfuerzo."
   }
  ],
  "closing": "Lucía, 2027 parece un año para avanzar con inteligencia: no tanto por correr, sino por saber cuándo empujar y cuándo afinar. Si escuchas tus tiempos internos y no te exiges más de la cuenta, vas a encontrar un ritmo muy tuyo, firme y vivo a la vez."
 },
 "mia": {
  "year": 2027,
  "title": "2027, your steady fire",
  "subtitle": "A year of pressure that can sharpen your pace",
  "overview": "2027 feels like a year that asks you to become more deliberate, Mia. Your core energy is Metal, so a Fire year can feel like heat applied to a blade: it may bring pressure, responsibility, and a stronger sense that you need to choose your speed carefully. Because your Five Elements lean heavily toward Wood, with Metal, Fire, Earth, and Water all present in smaller but meaningful amounts, this year may reward clear priorities more than sheer force.\n\nThe good news is that this is not only a year of testing. The rhythm shifts across the months: early on, you may be pouring energy outward; in the middle, you may be asked to step up and shape results; later, there can be a helpful window for support, learning, and recovery. In a Steel · Harvest type, that can feel like refining raw material into something usable. If you keep your plans simple, your pace honest, and your commitments visible, 2027 can feel less like strain and more like strengthening.",
  "chapters": {
   "wealth": {
    "heading": "Money flows that reward restraint",
    "body": "In 2027, your money story may be less about sudden gains and more about how well you direct effort into visible results. Fire tends to push action, and for a Metal Day Master, that can make spending, earning, and managing resources feel more active and demanding at the same time. Because your chart already carries a strong Wood presence, it may be wise to watch for moments when enthusiasm runs ahead of structure.\n\nIn daily life, this could look like taking on a project with real upside, then realizing the details need more care than expected. You might also notice that small, repeated costs matter more than one dramatic expense. A useful image for 2027 is a metal tool being polished: not rushed, but steadily improved until it works better.\n\nA good first step is to keep your money choices visible and simple. Mia, if you track what comes in and what goes out in a basic way, you may feel calmer and more in control. Let 2027 reward consistency rather than intensity."
   },
   "love": {
    "heading": "Relationships with more spark",
    "body": "Relationships in 2027 may feel more active, expressive, and changeable than usual. Early in the year, you may find yourself giving more energy than you take in, which can make you feel generous but also a little stretched. Later, there may be moments when connection comes through shared effort, shared goals, or simply being present without trying to impress.\n\nIn everyday scenes, this could show up as extra messages, more invitations, or conversations that move quickly from casual to meaningful. You may also notice that certain people respond well when you are direct and clear, especially if you normally hold back. Because the year carries a Wildcard feel, the social tone may be lively, but not always predictable.\n\nA gentle way to handle 2027 is to pace your openness. Say what is true, but give people room to meet you halfway. If you want warmth without overload, keep one or two relationships especially well-fed rather than trying to be available everywhere at once."
   },
   "career": {
    "heading": "Work that asks for clean decisions",
    "body": "Career-wise, 2027 may ask you to step into clearer ownership. Fire can bring visibility, pressure, and a stronger need to decide where your energy belongs, which often suits a Metal Day Master when the goal is to shape something solid. Your Steel · Harvest type also suggests you may do well when effort turns into something tangible, usable, or well-finished.\n\nAt work, this could mean being the person who organizes a messy situation, sharpens a process, or turns broad ideas into something others can follow. There may be periods when you feel more responsible than inspired, but those periods can still be fruitful if you keep the scope manageable. The midyear months especially may ask you to balance ambition with timing.\n\nTry choosing one practical standard for 2027, such as finishing what you start or clarifying expectations early. If you make fewer promises and keep them well, your reputation may feel stronger by the end of the year. Mia, the year favors steady authority more than dramatic moves."
   },
   "study": {
    "heading": "Learning through repetition and timing",
    "body": "Study and learning in 2027 may work best when you treat knowledge like a craft rather than a race. The year’s heat can make you eager to produce quickly, but your chart suggests that deeper gains come when you refine, review, and return to the same material with patience. This is a good year for learning that becomes useful in practice.\n\nYou might notice that in some months you absorb information quickly, while in others you need more quiet space before it makes sense. That is not a problem; it may simply mean your mind learns in cycles. If you are studying languages, tools, systems, or any skill with real-world use, repeated exposure may help more than trying to master everything at once.\n\nA simple approach is to keep one small study habit alive for the full year. Ten to twenty minutes a day, or one weekly review, may be more powerful than an intense burst followed by a long pause. Let 2027 be the year you build a method you can trust."
   },
   "health": {
    "heading": "Energy care that respects your pace",
    "body": "For body and mind, 2027 may be less about pushing hard and more about matching your tempo to the season. A Fire year can raise the sense of urgency, and that can make rest feel optional when it is actually the thing that keeps you steady. Because your chart holds strong Wood and solid Metal, the best support may come from rhythm, structure, and enough breathing room between commitments.\n\nIn everyday life, you may notice that busy days feel easier when meals, sleep, movement, and quiet time follow a pattern. You do not need a perfect routine; even a few repeatable anchors can help your system feel less scattered. The middle of the year may especially reward slower transitions between tasks.\n\nA useful experiment is to protect one daily pause that belongs only to you. It could be a short walk, a screen-free break, or ten minutes of stillness before bed. In 2027, small habits may do more for your steadiness than dramatic resets."
   }
  },
  "months": [
   {
    "headline": "February: the reset turn",
    "body": "This month may feel like a fresh start that also asks you to adapt quickly. Because the energy is tied to outward expression and your path may cross a turning point, you could feel pulled to respond fast, but the real advantage may come from choosing what deserves your full attention. A change in direction may work better when you let it simplify your next step."
   },
   {
    "headline": "March: steady output",
    "body": "March may bring a productive, practical rhythm with small interruptions that keep you alert. It can be a good month for making, sharing, or helping, as long as you accept that not every detail will move in a straight line. If you leave a little extra room in your schedule, the month may feel much smoother."
   },
   {
    "headline": "April: hold the reins",
    "body": "April may put you in a stronger position to shape outcomes and push for what matters. The inner tone can be quiet and observant, so you may do best when you set direction before you speak too widely. A little restraint may help your effort land more cleanly."
   },
   {
    "headline": "May: doors open sideways",
    "body": "May may feel active and a little surprising, with opportunities arriving through connection or a natural fit rather than force. Because the month carries a joining quality, things may come together more easily when you follow what already resonates. Let curiosity lead, but keep your feet on the ground."
   },
   {
    "headline": "June: pressure with purpose",
    "body": "June may feel more demanding, but that pressure can also help you become sharper and more capable. The month may reward people who stay composed when responsibilities increase. If you choose a pace you can actually sustain, the month can strengthen your confidence."
   },
   {
    "headline": "July: expect the unexpected",
    "body": "July may bring a less predictable rhythm, so flexibility could be your best tool. Plans may shift, priorities may change, and the month may ask you to respond rather than control. If you stay open to revision, you may find useful openings in places you did not expect."
   },
   {
    "headline": "August: helpful support",
    "body": "August may feel more nourishing, with support, learning, or recovery coming in more naturally. This is a good time to accept guidance, ask questions, or let someone else carry part of the load. You may feel stronger simply by not insisting on doing everything alone."
   },
   {
    "headline": "September: strong magnetism",
    "body": "September may draw people, ideas, and opportunities toward you with unusual ease. It can be a good month for connection, presentation, or any situation where your presence matters. If you stay clear about what you want, that attention may become very useful."
   },
   {
    "headline": "October: comfortable pause",
    "body": "October may feel familiar and easy to settle into, though not especially stimulating. This can be a good time to consolidate what you already know and avoid rushing toward novelty for its own sake. Let the month be useful in a quieter way."
   },
   {
    "headline": "November: read twice",
    "body": "November may bring moments where intentions and interpretations do not line up perfectly. That does not mean something is wrong; it simply suggests that careful reading and slower replies may save energy. A second look could make the month feel much cleaner."
   },
   {
    "headline": "December: tidy and direct",
    "body": "December may support clearing the desk, finishing loose ends, and speaking with a bit more authority. The month can feel productive if you use it to organize what matters and release what no longer needs your attention. Clear boundaries may make your next step easier."
   },
   {
    "headline": "January: quiet advancement",
    "body": "January may feel inward, stored, and slightly hidden, but that does not mean nothing is happening. Progress may be taking shape beneath the surface, especially if you keep showing up in small, steady ways. This is a good month to prepare the ground for what you want to grow next."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: simplify the launch",
    "body": "Watch for a period of outward effort, quick output, and a stronger need to steer your own direction. Try one concrete action: choose three priorities only, and write them where you can see them every day so your energy stays focused."
   },
   {
    "title": "May to July: keep your pace honest",
    "body": "Watch for momentum, opportunity, and a mix of pressure and surprise. Try one concrete action: before saying yes, pause long enough to check whether the commitment fits your real time and energy."
   },
   {
    "title": "August to October: accept support and refine",
    "body": "Watch for help, learning, and a smoother social or professional flow. Try one concrete action: ask one trusted person for feedback or guidance, then apply only the part that feels truly useful."
   },
   {
    "title": "November to January: close cleanly and prepare",
    "body": "Watch for slower clarity, mixed signals, and a quieter buildup under the surface. Try one concrete action: finish one unfinished task each week so the year ends with less drag and more room for what comes next."
   }
  ],
  "closing": "2027 does not ask you to become louder; it asks you to become more exact. If you let pressure sharpen your priorities instead of scattering them, the year can leave you feeling more capable, more selective, and more grounded in what truly works. Mia, a steady blade is not made in a rush, and this year seems to understand that."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027, 키우고 다듬는 해",
  "subtitle": "지수님에게 들어오는 도움과 나가는 에너지를 함께 읽는 시간",
  "overview": "2027년은 지수님에게 ‘내가 무언가를 만들어 내는 힘’이 또렷해지기 쉬운 해예요. 중심 기운이 갑목이고, 사주 유형도 거목·성취 쪽이라서 큰 생각을 품고 꾸준히 밀어붙이는 힘이 있는 편인데, 2027년의 화 기운은 그 힘을 밖으로 드러내게 돕는 대신 에너지를 많이 쓰게 만들 수 있어요. 그래서 표현, 생산, 베풂, 발표처럼 밖으로 나가는 일은 활발해지기 쉽고, 반대로 일정과 체력을 조절하는 감각이 중요해 보입니다.\n\n다만 2027년은 한 방향으로만 달리는 해라기보다, 돕는 흐름·익숙한 흐름·밀어붙이는 흐름·단단해지는 흐름이 계절처럼 번갈아 나타나는 모습이에요. 특히 2~3월과 12월~다음 해 1월에는 도움과 회복이 들어오기 쉬워서 숨을 고르기 좋고, 6~9월에는 성과를 손에 잡으려는 움직임이 강해지기 쉬워요. 지수님은 무리하게 속도를 올리기보다, ‘언제 내보내고 언제 채울지’를 구분하면 훨씬 편하게 2027년을 지나가기 좋습니다.",
  "chapters": {
   "wealth": {
    "heading": "성과를 다루는 감각",
    "body": "2027년의 재물 흐름은 ‘내가 움직인 만큼 결과가 보이기 쉬운’ 방향으로 읽혀요. 특히 8~9월경에는 주도권을 잡고 성과를 밀어붙이기 좋은 기운이 들어오지만, 동시에 욕심이 커지면 지출이나 선택이 빨라질 수 있어요. 목 기운이 강한 거목형은 한 번 방향을 잡으면 크게 뻗는 힘이 있으니, 돈을 다루는 일도 넓게 벌리기보다 우선순위를 선명하게 두면 편합니다.\n\n일상에서는 “이건 바로 써도 되는가, 조금 더 묵혀도 되는가”를 가르는 장면이 자주 보일 수 있어요. 계획했던 지출이 늘어나거나, 성과를 눈앞에 두고 더 큰 결과를 기대하고 싶어지는 순간도 생기기 쉽습니다. 이때는 서두르기보다 한 번 더 비교해 보는 습관이 도움이 돼요. 지수님에게는 큰 수확보다도, 새는 곳을 줄이는 정리가 더 실속 있게 느껴질 수 있습니다.\n\n작게 시작하려면 2027년 초에 ‘고정비, 선택비, 여유비’를 나눠 적어 두는 방식이 좋아요. 거창한 절약보다, 한 달에 한 번만 쓰임새를 점검해도 흐름이 훨씬 안정적으로 보일 거예요."
   },
   "love": {
    "heading": "가까워지는 방식",
    "body": "관계와 연애는 2027년 내내 ‘표현이 늘고, 반응도 더 크게 느껴지는’ 흐름으로 보기 좋아요. 화 기운이 나를 바깥으로 드러내는 해라서, 호감이나 관심을 말로 옮기기 쉬워지고, 반대로 내 마음도 상대의 반응에 더 민감하게 흔들릴 수 있어요. 그래서 관계의 온도는 뜨거워지기 쉽지만, 속도를 맞추는 배려가 중요해 보입니다.\n\n2~3월경에는 도움과 회복이 들어오는 기운이 강해서, 먼저 다가가기보다 자연스럽게 연결되는 인연이 편할 수 있어요. 4월경에는 익숙한 결이 강해지고, 일상적인 만남 속에서 관계의 방향이 바뀌는 느낌이 들어도 이상하지 않아요. 6~7월경엔 표현이 많아지니, 마음을 전하는 말 한마디가 관계를 한층 가깝게 만들 수 있습니다.\n\n작게 시작하려면, 상대를 설득하기보다 ‘내가 편안한 속도’를 먼저 정해 두는 게 좋아요. 자주 연락하는 방식이든, 한 번 만나면 깊게 이야기하는 방식이든 지수님에게 맞는 리듬을 찾으면 2027년의 관계가 훨씬 부드럽게 흘러갈 거예요."
   },
   "career": {
    "heading": "드러나는 성취",
    "body": "일과 커리어에서는 2027년이 지수님의 성취 욕구를 바깥으로 보여 주기 쉬운 해예요. 표현과 생산이 늘어나는 흐름이라, 결과물을 만들거나 발표하고, 누군가에게 보이는 역할을 맡을수록 존재감이 살아나기 쉽습니다. 다만 화 기운은 나를 소모시키기도 하니, 일의 양보다 ‘보여 줄 핵심’을 고르는 감각이 중요해 보여요.\n\n6~7월경에는 생산성이 올라가고, 손이 많이 가는 일도 의외로 잘 굴러갈 수 있어요. 10~11월경에는 책임감과 압박이 함께 들어오면서, 속도를 너무 높이면 지치기 쉬운 반면, 리듬을 안정적으로 잡으면 오히려 단단해질 수 있습니다. 지수님은 크게 키우는 힘이 있는 만큼, 중간중간 점검하지 않으면 체감 피로가 빨리 쌓일 수 있어요.\n\n작게 시작하려면, ‘이번 분기에는 무엇을 끝내 보일지’를 한 가지로 좁혀 보는 게 좋아요. 여러 일을 동시에 키우기보다, 하나를 선명하게 마무리하는 방식이 2027년의 커리어를 더 빛나게 만들 수 있습니다."
   },
   "study": {
    "heading": "배움이 채우는 시간",
    "body": "배움은 2027년에 특히 ‘들어오는 것’을 잘 받아들이는 쪽이 유리해 보여요. 2~3월경과 12월~다음 해 1월경에는 도움, 회복, 지식이 자연스럽게 들어오기 쉬워서, 새로 시작한 공부나 정리해 두었던 학습을 다시 붙잡기 좋습니다. 목 기운이 중심인 지수님에게 배움은 단순한 정보 축적보다, 생각의 가지를 넓혀 주는 역할을 하기에 잘 맞을 수 있어요.\n\n일상에서는 누군가의 조언이 오래 기억되거나, 우연히 본 자료가 방향을 정리해 주는 장면이 생길 수 있어요. 3월경에는 관계와 배움이 함께 움직이기 쉬워서, 스터디나 협업처럼 함께 익히는 방식이 잘 맞을 수 있습니다. 10~11월경에는 책임이 늘면서 공부 시간이 줄어들 수 있으니, 이때는 양보다 반복이 더 실속 있어요.\n\n작게 시작하려면, 한 번에 큰 목표를 잡기보다 ‘주 2회, 20분’처럼 작고 선명한 습관을 두는 게 좋아요. 지수님은 몰아서 하는 공부보다 꾸준히 쌓는 방식에서 더 안정적인 성과를 느끼기 쉬울 거예요."
   },
   "health": {
    "heading": "리듬을 지키는 해",
    "body": "몸과 마음의 돌봄은 2027년에 ‘에너지가 밖으로 많이 새는 만큼, 다시 채우는 시간도 꼭 필요하다’는 메시지로 읽혀요. 화 기운이 강하게 작동하는 해라서 활동량이 늘고 표현이 활발해지기 쉽지만, 오행 분포상 물 기운이 없고 화도 원래 부족한 편이라면, 쉬는 법을 의식적으로 만들어 두는 편이 훨씬 편할 수 있어요. 지수님은 버티는 힘이 있는 대신, 회복을 미루면 피로가 누적되기 쉬운 구조로 보입니다.\n\n2~3월경과 12월경에는 도움과 회복이 들어오기 쉬워서 생활 리듬을 다시 정비하기 좋고, 4~5월경에는 익숙한 패턴이 굳어지기 쉬워서 수면, 식사, 운동의 순서를 단순하게 두는 게 도움이 될 수 있어요. 8~9월경에는 바깥일이 많아져 일정이 흐트러지기 쉬우니, 이동과 약속을 한 번 더 정리해 두면 몸과 마음이 한결 편해질 거예요.\n\n작게 시작하려면, 하루 중 가장 먼저 지킬 한 가지를 정해 보세요. 예를 들면 ‘기상 후 물 한 잔’, ‘저녁 10분 정리’, ‘주 3회 산책’처럼 아주 작은 루틴 하나만 꾸준히 붙잡아도 2027년의 소모를 부드럽게 낮출 수 있습니다."
   }
  },
  "months": [
   {
    "headline": "2월, 받으며 시작",
    "body": "도움과 배움이 들어오는 흐름이 먼저 열리기 쉬워요. 건록의 기운은 시작할 힘을 채워 주고, 지살은 움직임을 조금 더 넓혀 줍니다. 새로운 계획은 크게 벌리기보다, 받을 것부터 정리하면 편해요."
   },
   {
    "headline": "3월, 붙는 인연",
    "body": "제왕의 힘이 올라와 말과 행동에 힘이 실리기 쉬워요. 일지와 어울리는 흐름이 있어 가까운 사람, 가까운 일과의 연결이 자연스럽게 깊어질 수 있습니다. 먼저 맞추기보다, 잘 맞는 부분을 찾아 이어 가면 좋습니다."
   },
   {
    "headline": "4월, 흔들림 속 전환",
    "body": "익숙한 결이 강한데도, 안쪽에서는 방향 전환이 일어나기 쉬운 달이에요. 충돌처럼 느껴지는 장면이 있더라도 꼭 나쁜 뜻은 아니고, 오래된 습관을 바꾸는 계기가 되기 좋습니다. 서두르지 말고 반응을 한 번 더 살피면 좋아요."
   },
   {
    "headline": "5월, 익숙한 온도",
    "body": "편안하고 익숙한 흐름이 이어지지만, 새 자극은 많지 않을 수 있어요. 망신살의 이름처럼 말과 이미지가 눈에 띄기 쉬우니, 말 한마디를 조금 더 다듬으면 유리합니다. 보여 주기보다 정리하는 데 힘을 쓰기 좋아요."
   },
   {
    "headline": "6월, 밖으로 번짐",
    "body": "내가 이 해의 기운을 키워 주는 달이라 표현과 생산이 활발해지기 쉬워요. 장성살은 기세를 올려 주지만, 그만큼 쓰는 힘도 커집니다. 결과를 내는 일은 좋되, 한 번에 너무 많은 일을 얹지 않는 편이 편해요."
   },
   {
    "headline": "7월, 성과의 윤곽",
    "body": "반안살의 기운은 무언가를 드러내고 정돈해 보이게 만들기 쉬워요. 6월보다 조금 더 안정적으로 결과를 묶어 내기 좋습니다. 지수님에게는 ‘완성도’를 높이는 선택이 특히 잘 맞을 수 있어요."
   },
   {
    "headline": "8월, 밀어붙일 힘",
    "body": "주도권과 성과를 잡기 좋은 흐름이 강하게 들어와요. 절의 기운은 한 단계 끊고 넘어가는 결단을 돕지만, 역마살처럼 움직임도 많아질 수 있습니다. 과하게 벌리기보다 핵심 한두 개에 힘을 모으면 좋아요."
   },
   {
    "headline": "9월, 선택이 중요",
    "body": "태의 기운은 가능성을 키우지만 아직 완전히 굳지는 않은 느낌을 줘요. 육해살처럼 작은 어긋남이 생기기 쉬우니, 일정과 약속을 다시 확인하면 편합니다. 속도보다 정밀함을 챙기면 흐름이 안정돼요."
   },
   {
    "headline": "10월, 책임의 무게",
    "body": "이 해의 기운이 지수님을 단련하는 구간이라 책임과 압박이 함께 들어오기 쉬워요. 양의 기운은 한 단계 자라나는 힘을 주고, 화개살은 혼자 정리할 시간을 찾게 만들 수 있습니다. 속도를 낮추고 우선순위를 정하면 단단해집니다."
   },
   {
    "headline": "11월, 단단해지는 중",
    "body": "장생의 기운처럼 오래 가는 힘을 기르는 달이에요. 겁살은 마음을 조심스럽게 만들 수 있지만, 그만큼 판단을 신중하게 해 주기도 합니다. 급하게 결론내기보다, 한 번 더 생각한 선택이 잘 맞아요."
   },
   {
    "headline": "12월, 다시 채우기",
    "body": "도움과 회복이 다시 들어오는 흐름이라 한숨 돌리기 좋습니다. 목욕의 기운은 묵은 것을 씻어 내듯 정리하기에 어울리고, 재살은 일상의 번잡함을 조금 더 예민하게 느끼게 할 수 있어요. 정리와 휴식을 함께 두면 편합니다."
   },
   {
    "headline": "1월, 새로 받는 힘",
    "body": "관대의 기운은 새 출발을 준비하는 품을 넓혀 줘요. 천살은 바깥 상황보다 내 페이스를 더 의식하게 만들 수 있으니, 무리한 출발보다 준비를 다지는 편이 유리합니다. 2027년의 끝과 새해의 시작을 천천히 잇는 느낌이 좋아요."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 받는 힘 정리",
    "body": "도움이 들어오고, 관계와 배움이 붙기 쉬운 흐름을 지켜보세요. 이때는 새 계획을 크게 늘리기보다, 들어온 정보와 제안을 한 장 메모로 정리하고 우선순위를 매겨 두는 행동이 잘 맞습니다."
   },
   {
    "title": "5~7월경: 표현의 과열 조절",
    "body": "생산과 표현이 늘면서 에너지가 많이 쓰이는 흐름을 살펴보세요. 발표, 작업, 약속을 한 주에 몰아넣기보다 핵심 한 가지를 정해 보여 주는 방식으로 움직이면 훨씬 편할 거예요."
   },
   {
    "title": "8~10월경: 성과와 속도 조율",
    "body": "주도권을 잡고 싶어지는 마음과 책임이 함께 커질 수 있어요. 이 구간에는 중요한 결정 전 체크리스트를 두고, 일정과 지출, 말의 속도를 한 번 더 확인하는 습관을 제안해요."
   },
   {
    "title": "11월~다음해 1월경: 회복과 정비",
    "body": "단단해지는 흐름 속에서 다시 채우는 시간이 필요해 보입니다. 한 해를 마무리하는 기록, 생활 리듬 점검, 내년 목표를 3개 이하로 줄이는 정리가 지수님에게 잘 맞을 거예요."
   }
  ],
  "closing": "지수님, 2027년은 크게 보면 ‘밖으로 많이 쓰고, 중간중간 다시 채우는 법을 배우는 해’로 읽혀요. 무언가를 키우는 힘이 있는 만큼, 쉬는 타이밍을 함께 잡으면 훨씬 부드럽게 흐를 수 있습니다.\n\n모든 달을 완벽하게 보내려 하기보다, 도움을 받는 달에는 받아들이고, 밀어붙이는 달에는 핵심만 남기는 식으로 리듬을 나누어 보세요. 그렇게 하면 2027년은 지수님에게 꽤 실속 있고, 또 꽤 다정한 해가 되어 줄 가능성이 큽니다."
 }
};
