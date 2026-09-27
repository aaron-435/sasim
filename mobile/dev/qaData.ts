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
   "title_line1": "When the work is done, your mind keeps the ledger open",
   "title_line2": "And even rest gets treated like another task to finish",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychology × counseling integration",
   "opening_scene": "It’s late on a Sunday night, and your phone is still within reach before you’ve even settled into bed. A Monday-morning message lights up the screen, and the first thought isn’t about the message itself — it’s about what it might demand next. Your body is tired, but your mind keeps going back to the task you already finished, checking it once more in case something slipped through. You rest, but it doesn’t land as rest, and that uneasy feeling hangs around even when nothing is happening. Jordan, isn’t this the way your nights have been going lately?",
   "case_tag": "EXAMPLE CASE — Mina, early 30s, a project lead",
   "case_paragraphs": [
    "Mina stays late after a deadline, then opens the file again to re-check every line before sending it. By the time she leaves the office, the work is done, but her mind is still standing at the desk. Her Five Elements profile is heavy in Earth and Metal, so the pressure to hold things together and get them right sits close to the surface. You can see yourself in her, because the same loop keeps pulling you back even after the work is already finished."
   ],
   "oheng_intro": "Your Earth and Metal are both at 38%, so the structure-and-responsibility side of you is strong, while Wood is at 0% and stays almost absent. With your Day Master as Water, that means Earth presses on you like rules, duty, and pressure, while Wood is the energy you send outward through expression and talent. In this Burnout module, that balance shows up as doing the work, then feeling too drained to step away from it cleanly.",
   "quiz_reading": "Your Finisher's Drain pattern shows up clearly in the 82% perfectionism score and the 34% recovery score. That mix means your energy goes out through checking, tightening, and finishing, while the part that should help you come back online stays underfed. In daily life, that looks like completing the task, then losing the ability to let it be complete.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood weak — the part that leaves the room when you need it most",
     "body": "Your Wood is at 0%, so the outward-moving energy that helps you express, release, and keep momentum is almost not showing up. With Water feeding Wood, that missing piece is not a mystery; it asks for steadier replenishment from the quieter part of you, not from one more push. In practice, this is why you can finish the task and still feel unable to step out of it emotionally. The sentence to keep is simple: you don't lack effort, you lack an outlet."
    },
    "fire": {
     "heading": "🔥 Fire low — the light that flickers after the check is done",
     "body": "Your Fire is 13%, which is low, so the warmth that helps you feel immediate reward after effort comes on weakly. That matters in burnout because the finished task doesn't automatically give you relief; it can just become one more thing to verify. You may notice that even when the work is objectively complete, the inner brightness doesn't arrive fast enough to change the mood. The result is a day that ends with output, but not with ease."
    },
    "earth": {
     "heading": "⛰️ Earth strong — the weight that keeps asking for one more proof",
     "body": "Your Earth is 38%, and with your Day Master as Water, this is the pressure side: rules, responsibility, and the sense that you have to hold everything up. That strength helps you stay reliable, but it also explains why a Monday-morning message can feel heavier than the message itself. You don't just read the text; you feel the demand sitting behind it. The line to remember is that your steadiness is real, but it can turn into load when there is no release."
    },
    "metal": {
     "heading": "💎 Metal strong — the sharp eye that finds the unfinished edge",
     "body": "Your Metal is also 38%, so the part of you that notices flaws, standards, and what still needs tightening is highly developed. That is why you go back and re-check everything after finishing a task; the eye that finds the detail is working even after the deadline has passed. In a burnout pattern, that sharpness can keep the task alive long after the task is done. The capture-worthy line here is: your standards are precise enough to keep working after your hands have stopped."
    },
    "water": {
     "heading": "💧 Water low — the current that should refill you, but runs thin",
     "body": "Your Water is 13%, so the part of you that restores, loosens, and lets energy circulate is not carrying much weight right now. Since Water feeds Wood, this also helps explain why your expression and release feel underpowered: the source that should refill that outward flow is running lean. You can still move through the day, but it takes more effort to feel naturally replenished afterward. That is why rest can feel uneasy instead of restful."
    }
   },
   "upcoming_period_preview_heading": "31 years old onward, Fire opens the next chapter",
   "upcoming_period_preview_body": "From age 31, Fire becomes stronger, and that change is already part of your path. The air around your effort starts to feel warmer, and the day stops ending so coldly after every task. What has been all checking and pressure begins to meet more visible energy, like a room that finally gets light in the late afternoon.",
   "module_map": {
    "title": "Your energy balance sheet",
    "body": "Your energy balance sheet is tilted toward demand. The work side is carrying a lot: 82% perfectionism, 38% Earth, and 38% Metal all point to a life where standards, responsibility, and checking are doing too much of the lifting. The resource side is thinner: 34% recovery, 13% Fire, 13% Water, and 0% Wood leave less room for ease, warmth, and outward release to come back in. This is less about laziness and more about a system where energy leaves quickly and comes home slowly, so tiredness and a small edge of anxiety stay close together."
   },
   "module_deep": {
    "title": "The order for refilling",
    "body": "Your first move is to loosen the grip on the finishing ritual itself. Before you add anything new, cut one re-check at the end of the day and let the task leave your hands while it is still imperfect enough to be human. Your second move is to feed recovery with something that is small but scheduled, because your 34% recovery needs a place on the calendar before your mind will believe it is allowed. Your third move is to protect the handoff from work to home by making the last five minutes of the day about closing, not improving; that is where your energy starts to come back to you instead of leaking into the next morning."
   },
   "upcoming_period_heading": "31 years old onward, a warmer chapter begins",
   "upcoming_period_body": "From age 31, the stronger Fire period brings more immediate warmth into the way you work, so output is less likely to end in a blank, drained feeling. That matters for you because the current pattern is not a lack of ability; it is a shortage of recovery after performance. In that next phase, you’ll want to protect the habits that let warmth stay with you instead of burning off at the first sign of pressure. If you keep one thing ready, make it a way to stop re-checking the moment the work is done.",
   "cross_analysis_quotes": [
    "Your 82% perfectionism and 38% Metal are speaking the same language: you don't just finish, you audit the finish. That is why a task can be complete on paper and still feel unfinished in your body. When your standards stay this active, rest gets treated like a draft version of work.",
    "Your 34% recovery and 13% Water match the part of you that feels uneasy even on a day off. This isn't because you can't rest; it's because the system that should restore you is running low while the checking mind keeps its hand on the door. The result is a pause that never fully turns into a pause."
   ],
   "answer_notes": [
    "Going back and re-checking everything shows that you trust precision more than relief in the moment. In daily life, that becomes the extra pass through an email, the reread before sending, or the quiet delay before letting yourself move on. Keep that awareness close, because it shows how your standards protect quality even when they also prolong strain.",
    "Feeling uneasy even when you rest shows that your nervous system still expects a task to be waiting. In real life, that can look like sitting down with a drink and still scanning for what you forgot. You chose this answer because you know rest is not just physical stillness for you; it has to feel permitted too."
   ],
   "chat_snapshot_note": "Your core concern is that rest never feels like rest, and the feeling underneath it is tiredness with a little anxiety. That combination is exactly why Monday-morning messages can reopen the whole tension so fast. The line to keep is this: you are not failing to rest; your mind is still acting like the shift has not ended.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they arrive right where your checking habit is already waiting. They don't just ask for attention; they reactivate the part of you that fears falling behind if you stop. That is why a simple notification can feel like a whole week opening at once.",
   "chat_repeat_note": "Your pattern is cramming, then crashing, which means your energy goes into one hard burst and then drops all at once. In the middle of that swing, you choose to keep pushing because stopping feels riskier than overextending. A small way to interrupt it is to leave one task unfinished on purpose at the end of the day, just enough to teach your system that not every stop is a loss.",
   "chat_fear_note": "The fear underneath this is not just about delay; it is about being left behind. That fear makes sense when your mind has learned to equate pausing with danger. What you want, underneath all of it, is to stay current without having to keep proving your worth every hour.",
   "psychology_fact_heading": "Perfectionism and recovery in burnout",
   "psychology_fact_body": "In burnout research, perfectionism often acts like a demand amplifier, while weak recovery leaves no room for the system to settle. That combination fits your pattern: the task gets finished, but the mind keeps scanning for defects, so completion does not convert into relief. The result is not just tiredness; it is a loop where effort keeps extending past the point of usefulness. Your scores make that loop visible in a very concrete way.",
   "psychology_takeaway": "You are not short on effort; you are short on a clean ending. When your mind keeps auditing after the job is done, rest has to be protected on purpose, not assumed.",
   "strengths": [
    {
     "title": "Reliable follow-through",
     "body": "You don't leave things half-finished, and your 82% perfectionism shows how much you care about getting the details right. That kind of follow-through is a real asset when a deadline is tight and other people are counting on you. The same force that can exhaust you is also what makes you someone others trust with the last mile."
    },
    {
     "title": "Strong standards",
     "body": "Your 38% Metal gives you a sharp eye for what doesn't fit, what needs tightening, and what still needs one more pass. In a workday, that can look like catching the small error before it spreads. Your standard-setting is not the problem; it is one of the reasons your output holds together."
    },
    {
     "title": "Pressure tolerance",
     "body": "With Earth at 38%, you can carry responsibility without immediately dropping the whole load. That shows up when Monday-morning messages arrive and you still move toward the task instead of away from it. The strength here is endurance, especially when the day asks for steadiness before it offers comfort."
    },
    {
     "title": "Quiet self-awareness",
     "body": "You can tell the difference between being busy and being restored, which is why 'I rest but it never feels like resting' came out so clearly. That distinction matters, because it means you already notice when the system is off balance. The people who change fastest are often the ones who can name the strain this precisely."
    }
   ],
   "weaknesses": [
    {
     "title": "Endless checking",
     "body": "Your mind keeps returning to the finished task, and that loop is expensive. It can look like one more review, one more edit, one more message check before you let yourself stand up. The cost is not carelessness; it is the fact that care has stopped knowing when to leave."
    },
    {
     "title": "Thin recovery",
     "body": "With recovery at 34%, your off time does not refill you as quickly as your effort drains you. That makes a day off feel strangely unsettled, even when nothing urgent is happening. This isn't a flaw in your character; it is a mismatch between how much you give and how little comes back right away."
    },
    {
     "title": "Pressure lock",
     "body": "Your Earth at 38% can turn responsibility into a locked posture, where stopping feels like letting the structure crack. That is why the fear of falling behind lands so strongly. When the pressure stays this active, even a simple pause can start to feel morally risky."
    },
    {
     "title": "Low release",
     "body": "Your 0% Wood means expression and outward release are almost missing from the system, so tension has fewer exits. In practice, that can leave everything circling inside until the crash finally comes. The important thing to see is that the pressure is not just in the work; it is also in the lack of a safe outlet."
    }
   ],
   "fit_good": "You do better in a setting where the day has a clear finish line and the next step is not hidden in your inbox. A work style with explicit handoff points, visible priorities, and time that belongs to recovery will suit you better than a place where messages can reopen everything at any hour. You need a rhythm that lets you close the loop once, not keep auditing it all night.",
   "fit_bad": "You will struggle in a place where Monday-morning messages are treated like a permanent state of being. Environments that reward constant re-checking, shifting priorities, and invisible standards will keep your body on duty long after the work is done. If the day never really ends, your mind will keep acting like it has to stay awake too.",
   "behavior_guides": [
    {
     "title": "One-pass close",
     "body": "At the end of your workday, give yourself one final review and then stop. Do it for 10 minutes, not 30, so the task ends with a boundary instead of a loop. After that, close the file and move your hands away from the keyboard."
    },
    {
     "title": "Recovery block",
     "body": "Put 20 minutes of off-time on the calendar after work, and treat it like a meeting you cannot reschedule. During that block, do something that does not invite checking, such as a walk without headphones or a shower without your phone. The point is not to relax perfectly; it is to let your system notice that nothing breaks when you stop."
    },
    {
     "title": "Message delay",
     "body": "When a Monday-morning message arrives, wait 5 minutes before opening it if the timing is safe. Use those minutes to name the first thought that appears, then answer only after your breathing slows once. This keeps the message from instantly taking over the whole morning."
    },
    {
     "title": "Exit cue",
     "body": "Choose one small action that always means 'work is over' for you, such as shutting the laptop lid or writing tomorrow's first task on paper. Do it at the same time each day for a week. The repetition matters because your body needs a visible ending, not just a mental one."
    }
   ],
   "mindset_guide": "Think of your day like a file that needs saving, not a page that has to be polished forever. Perfectionism wants to keep the document open, but burnout eases when you let one version count as enough. Recovery is not a reward for finishing; it is part of what makes finishing sustainable. You do not need a flawless close, Jordan — you need a real close.",
   "closing_title": "A cleaner ending",
   "closing_body": "From age 31, Fire becomes stronger, and that next chapter brings more warmth into the way you move through work. The heavy, checked, over-reviewed feeling does not have to run the whole day anymore, and the pressure-heavy rhythm starts to loosen its hold. For this burnout pattern, that means your evenings can start to feel lighter, and the gap between finishing and resting can finally stop feeling like a threat. You can end the day without carrying it home, and that is the version of relief your system has been waiting for."
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
 "casey": {
  "content": {
   "title_line1": "Cuando todo queda listo, tu energía queda en rojo",
   "title_line2": "Y la mente sigue revisando incluso después de cerrar el día",
   "subtitle": "Módulo 3 · Agotamiento — informe profundo — saju × prueba psicológica × acompañamiento integrado",
   "opening_scene": "Son las últimas horas de la noche y, aunque ya terminaste lo que tocaba, tu mente sigue volviendo al mismo punto. Ves de nuevo esa lista mental que no se calla: revisar, corregir, dejarlo perfecto, aunque el cuerpo ya pida parar. El mensaje del lunes por la mañana aparece antes de tiempo, como si ya estuviera encendiendo la tensión. Y aun cuando intentas descansar, algo dentro de ti sigue vigilando el trabajo que ya cerraste. Casey, ¿no te pasa que el día termina, pero tú sigues dentro de él?",
   "case_tag": "CASO DE EJEMPLO — Laura, principios de los 30, rutina laboral exigente",
   "case_paragraphs": [
    "Laura pasa el día dejando todo en orden y, cuando por fin cierra la computadora, vuelve a abrir mentalmente cada detalle. Su mapa tiene un peso parecido al tuyo: madera y metal muy altos, y agua muy baja, así que sostiene mucho más de lo que repone. En su trabajo, eso se nota en que entrega, revisa y vuelve a revisar, aunque ya no quede energía fina para seguir afinando. Y tú también podrías verte en esa escena.",
    "Laura cree que descansar debería sentirse como descanso, pero su cuerpo sigue en alerta y su cabeza no acepta el cierre. La mezcla de exigencia alta y recuperación baja la deja funcionando por inercia, no por descanso real. Cuando el lunes se acerca, el teléfono basta para volver a tensar todo. Tú también puedes estar viviendo ese mismo umbral."
   ],
   "oheng_intro": "Tu madera está en 38% y tu metal también está en 38%, así que lo que empuja y lo que ordena en ti van muy parejos. Tu agua está en 0%, y eso hace que la parte que devuelve, afloja y refresca quede casi sin presencia. En un módulo de agotamiento, esta combinación se ve como alguien que sigue produciendo forma y control, pero tarda mucho en sentir que algo realmente repone.",
   "quiz_reading": "Tu perfeccionismo está en 82% y tu recuperación en 34%, y esa combinación describe a alguien que no suelta el trabajo ni siquiera cuando ya terminó. Quien termina todo y se agota no deja cosas sin hacer; deja su energía dentro de cada cierre. Por eso, en tu día, una tarea terminada puede seguir ocupando espacio como si todavía estuviera abierta.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera fuerte — empuje que no se rinde",
     "body": "Tu madera está en 38%, así que la parte que te hace tomar iniciativa y sostener metas va con mucha fuerza. Como tu Maestro del Día es metal, esta madera es la energía que tú manejas en el trabajo: objetivos, dinero y tareas que piden dirección. En agotamiento, eso se ve como días en los que sigues avanzando aunque ya estés vaciándote por dentro. Y tú no te quedas quieto: sigues empujando incluso cuando el cuerpo ya pidió pausa."
    },
    "fire": {
     "heading": "🔥 fuego bajo — chispa breve, no ruido constante",
     "body": "Tu fuego está en 13%, así que la expresión directa y la sensación de impulso visible aparecen poco. En un día de trabajo, eso puede sentirse como responder lo justo, sin mucho margen para entusiasmo extra. En este módulo, tu fuego no llena la escena; apenas asoma entre tarea y tarea. Y eso deja más espacio para que la exigencia silenciosa tome el control."
    },
    "earth": {
     "heading": "⛰️ tierra baja — sostén que se nota poco",
     "body": "Tu tierra está en 13%, así que la base que ayuda a asentar y dar continuidad no pesa demasiado. En un día largo, eso puede verse como pasar de un pendiente a otro sin sentir que el descanso quede bien plantado. No falta capacidad; falta suelo para que lo hecho se quede de verdad. Y por eso tu esfuerzo a veces termina sintiéndose más frágil de lo que merece."
    },
    "metal": {
     "heading": "💎 metal fuerte — orden que aprieta",
     "body": "Tu metal está en 38%, así que la parte que ordena, corrige y deja todo a punto está muy activa. Como tu Maestro del Día también es metal, esta es una energía muy reconocible en ti: la forma en que separas, eliges y pides precisión en el trabajo. En agotamiento, esa misma fuerza puede hacer que cierres una tarea, pero sigas revisándola por dentro. Y tú, cuando terminas algo, a veces no descansas; simplemente cambias de ronda."
    },
    "water": {
     "heading": "💧 agua baja — reposo que no termina de entrar",
     "body": "Tu agua está en 0%, así que la parte que baja la velocidad, afloja la mente y devuelve energía aparece casi ausente. Con metal alimentando agua, esa reposición podría sostenerte más, pero aquí esa vía está vacía y se nota en tu recuperación. Por eso un día libre no siempre se siente libre: el cuerpo para, pero la inquietud sigue trabajando. Y tú sigues buscando descanso con una mente que no baja el volumen."
    }
   },
   "upcoming_period_preview_heading": "41 años, metal se abre",
   "upcoming_period_preview_body": "A los 41 años empieza un ciclo de diez años en el que el metal gana fuerza. Lo que hoy te deja revisando y sosteniendo de más cambia de forma, y el orden deja de sentirse solo como presión. La luz de ese tramo cae distinto: más nítida, más limpia, menos dispersa.",
   "module_map": {
    "title": "Tu balance de energía",
    "body": "Tu balance de energía se inclina mucho hacia lo que exige y muy poco hacia lo que repone. El perfeccionismo de 82% hace que el trabajo pida más de ti incluso después de haberlo terminado, y la recuperación de 34% deja poco espacio para desactivar esa presión. No se ve un problema de falta de capacidad, sino de desgaste por exceso de control y poca vuelta al centro. En tu día, eso se parece a seguir pendiente de lo ya cerrado mientras el alivio tarda en llegar."
   },
   "module_deep": {
    "title": "El orden para recargarte",
    "body": "Primero conviene bajar la exigencia que sigue corriendo después de terminar, porque ahí se va buena parte de tu energía. Después conviene devolverle espacio a lo que sí te repone, aunque sea en dosis pequeñas y muy concretas, para que tu recuperación deje de quedar tan atrás. Y por último conviene ordenar el trabajo en cierres reales, no solo en entregas, porque tu mente necesita una señal clara de que ya puede soltar. En tu caso, el cambio no empieza por hacer más, sino por dejar de pagar con energía extra cada cierre perfecto."
   },
   "upcoming_period_heading": "41 años, empieza otra etapa de metal",
   "upcoming_period_body": "A los 41 años, ese metal más fuerte ordena tu energía con otra clase de claridad. Lo que ahora te hace terminar y seguir pensando después empieza a volverse más selectivo, y el día deja de pedirte tanto desgaste invisible. Para llegar mejor a ese tramo, te conviene observar desde ya qué tareas te dejan limpio y cuáles te dejan vacío, porque esa diferencia será la que más importe. No se trata de hacer más, sino de llegar con menos fuga.",
   "cross_analysis_quotes": [
    "Terminas todo, pero tu energía también termina ahí. Revisas otra vez lo que ya dejaste listo, y eso hace que el cierre no te deje descanso. Cuando acabas una tarea, tu mente sigue en movimiento y te empuja a empezar de nuevo desde el principio.",
    "Tu agua en 0% explica por qué el descanso no entra del todo. El perfeccionismo en 82% explica por qué sigues revisando cuando ya no hace falta. Por eso, aunque pares, tu mente no suelta del todo y vuelve a mirar lo que ya diste por terminado."
   ],
   "answer_notes": [
    "Volver a revisar desde el principio muestra que no te basta con cerrar una tarea; necesitas sentir que quedó impecable. En tu día, eso te lleva a reabrir mentalmente lo que ya entregaste y a gastar energía donde ya no hacía falta. Si elegiste esa respuesta, se nota que tu mente no negocia fácil con el cierre.",
    "Sentir inquietud aunque descanses muestra que tu reposo no siempre logra apagar la vigilancia interna. En la vida diaria, eso se ve como estar sentado, pero seguir por dentro en modo alerta. Si marcaste eso, estás describiendo un cuerpo que para antes que tu mente."
   ],
   "chat_snapshot_note": "Tu preocupación central es que el descanso nunca se siente como descanso, y eso viene pegado a cansancio y un poco de ansiedad. No estás describiendo falta de ganas; estás describiendo una mente que no baja del todo después del trabajo. La frase que se queda es simple: terminas el día, pero el día no termina dentro de ti.",
   "chat_trigger_note": "Los mensajes del lunes por la mañana te activan porque no llegan solo como mensajes: llegan como señal de que vuelve la exigencia. Esa clase de aviso toca tu perfeccionismo alto y hace que tu metal se ponga otra vez en guardia. Por eso un lunes temprano puede sentirse más pesado que una tarea grande.",
   "chat_repeat_note": "Tu patrón de acumular y luego derrumbarte se arma poco a poco, como una carga que va creciendo sin pedir permiso. Primero sostienes, luego sigues sosteniendo, y cuando ya no entra más, todo cae de golpe. Un pequeño cambio empieza por no esperar a estar al límite para aflojar un poco.",
   "chat_fear_note": "Te da miedo quedarte atrás si paras, y debajo de eso hay una necesidad muy clara de seguir siendo útil y de no perder sitio. No es un miedo caprichoso; es una forma de proteger tu valor cuando el trabajo aprieta. Lo que pide esa parte de ti no es correr más, sino sentir que parar no borra lo que eres.",
   "psychology_fact_heading": "Modelo de demandas y recursos laborales de Bakker y Demerouti",
   "psychology_fact_body": "Este modelo dice que el agotamiento aparece cuando las demandas del trabajo pesan más que los recursos disponibles para sostenerlas. Las demandas no son solo cantidad de tareas; también incluyen presión por hacerlo perfecto, vigilancia constante y poco margen para recuperar energía. En tu caso, el 82% de perfeccionismo y el 34% de recuperación encajan muy bien con esa idea: das mucho, pero el sistema de reposición se queda corto. Por eso tu cansancio no parece falta de capacidad, sino un desbalance repetido entre lo que se te pide y lo que te devuelve aire.",
   "psychology_takeaway": "No te falta empuje; te sobra exigencia sin suficiente vuelta. Tu energía se va más por el cierre perfecto que por la tarea en sí.",
   "strengths": [
    {
     "title": "responsabilidad fina",
     "body": "Tu madera en 38% y tu metal en 38% muestran que no haces las cosas a medias. En el trabajo, eso se ve cuando terminas una tarea y todavía revisas los bordes para que no quede nada suelto. Esa responsabilidad te da una presencia muy confiable, incluso cuando nadie está mirando."
    },
    {
     "title": "criterio claro",
     "body": "Tu metal fuerte hace que distingas rápido qué está bien armado y qué no. Eso se nota en tu manera de volver a revisar desde el principio en lugar de dejar pasar un fallo que después te molestaría más. Tu criterio no es frío; es una forma de cuidar el resultado."
    },
    {
     "title": "resistencia silenciosa",
     "body": "Aunque te vacíes, sigues hasta terminar lo que te tocó. Ese patrón de aguantar y luego derrumbarte no borra la resistencia que hay antes de la caída. Tú sostienes mucho más de lo que aparentas, y eso también habla de fuerza."
    },
    {
     "title": "ojo para el detalle",
     "body": "El 82% de perfeccionismo hace que captes enseguida lo que todavía no encaja. En un día laboral, eso se traduce en detectar un ajuste pequeño antes de que crezca. Bien usado, ese ojo te ayuda a resolver; mal sostenido, te deja sin descanso."
    }
   ],
   "weaknesses": [
    {
     "title": "cierre infinito",
     "body": "Tu mente no siempre acepta que una tarea ya terminó, y por eso vuelve a abrirla. Se nota cuando acabas algo y todavía lo repasas una y otra vez desde el principio. Esa insistencia te roba más energía de la que la tarea pedía."
    },
    {
     "title": "descanso que no se asienta",
     "body": "Tu recuperación de 34% muestra que parar no siempre te relaja de verdad. En un día libre, puedes quedarte en pausa por fuera y seguir con la mente en marcha por dentro. Ese descanso que no se asienta deja el cuerpo quieto, pero no afloja la tensión."
    },
    {
     "title": "acumulación",
     "body": "Tu patrón de acumular y luego derrumbarte hace que la carga crezca sin que se note al principio. En la práctica, eso significa seguir sumando tareas, correcciones y pendientes hasta que ya no entra más. La salida pequeña está en soltar antes de llegar al borde."
    },
    {
     "title": "miedo a parar",
     "body": "Te pesa la idea de quedarte atrás si paras, y ese miedo te empuja a seguir incluso cuando ya vas justo de energía. En el día a día, eso puede hacer que aceptes seguir un poco más, revisar un poco más, responder un poco más. El costo no es falta de voluntad; es demasiado peso sobre una misma lógica."
    }
   ],
   "fit_good": "Te convienen días con bloques de trabajo muy claros y un cierre visible, porque tu mente necesita saber cuándo algo termina de verdad. También te favorecen entornos donde tu precisión tenga valor, porque ahí tu metal fuerte trabaja a favor y no contra ti. Cuando tienes un margen real entre una entrega y la siguiente, tu recuperación deja de quedarse tan atrás.",
   "fit_bad": "Te pesan los entornos que nunca cierran, donde siempre aparece un mensaje más y una revisión más. También te desgastan los días con cambios constantes y poca claridad, porque ahí tu perfeccionismo se queda sin borde donde apoyarse. Cuando todo depende de estar pendiente todo el tiempo, tu energía se vacía muy rápido.",
   "behavior_guides": [
    {
     "title": "cierre visible",
     "body": "Cuando termines una tarea, dedica 3 minutos a escribir qué quedó hecho y qué no toca revisar hoy. Hazlo al final del día, antes de abrir otro mensaje o otra pestaña, para que tu mente tenga una frontera clara. Repite ese cierre en cada entrega importante durante la semana."
    },
    {
     "title": "pausa real",
     "body": "Una vez al día, toma 10 minutos sin revisar nada de trabajo, sin corregir nada y sin responder mensajes. Hazlo después de la comida o al salir de una tarea larga, cuando tu impulso de seguir todavía esté activo. Tu objetivo no es descansar perfecto, sino entrenar una bajada real."
    },
    {
     "title": "revisión única",
     "body": "Elige solo una revisión final por tarea y respétala aunque te den ganas de volver atrás. Si te vuelve la duda, anótala y déjala para el siguiente bloque, no para el mismo momento. Así entrenas a tu mente a no convertir cada entrega en un bucle."
    },
    {
     "title": "lunes suave",
     "body": "Los lunes por la mañana, empieza con una tarea breve y concreta en vez de abrir todo lo pendiente a la vez. Tómate los primeros 15 minutos para mirar solo prioridades reales, no todo lo que pide atención. Esa entrada más simple baja la activación que te dejan los mensajes tempranos."
    }
   ],
   "mindset_guide": "Tu mente trata cada entrega como si aún pudiera fallar, y por eso no suelta aunque ya haya terminado. Piensa en tu energía como una mesa de trabajo: no hace falta mantener todas las herramientas encima al mismo tiempo. Dejar una herramienta fuera no estropea el trabajo; le da espacio a la siguiente parte. Cuando el cierre tiene borde, el cansancio no se queda pegado tanto tiempo.",
   "closing_title": "Lo que ya puede aflojar",
   "closing_body": "A los 41 años, el metal se abre y tu energía empieza a ordenarse de otra manera. Lo que hoy se te va en revisar sin parar deja de quedarse tan pegado, y el cierre deja de sentirse como una deuda. En tu trabajo, eso se nota como menos peso en la cabeza al terminar el día y más espacio para respirar entre una entrega y la siguiente. Y sí, Casey, esa ligereza empieza a verse en lo cotidiano: en el mensaje que ya no te deja temblando por dentro y en la tarea que por fin puede quedarse donde terminó."
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
 "lucia": {
  "content": {
   "title_line1": "Cuando la respuesta se tarda",
   "title_line2": "tu corazón no espera: vigila, insiste y luego se retira",
   "subtitle": "Módulo 1 · Amor y apego · informe profundo integrado de tu mapa y tu acompañamiento psicológico",
   "opening_scene": "De noche, con el móvil en la mano, miras una respuesta leída y sin contestación durante horas. La pantalla se apaga y la vuelves a encender, como si al hacerlo pudieras cambiar el orden de las cosas. En la cabeza aparece una frase muy concreta: “seguro que hice algo mal”. Entonces mandas otro mensaje, y después te quedas mirando el chat con un nudo en el pecho. Lucía, ¿no te está pasando últimamente que tu día se tambalea justo ahí, en ese silencio?",
   "case_tag": "CASO DE EJEMPLO — Martina, 30 y tantos, espera en una relación",
   "case_paragraphs": [
    "Martina revisa el chat cada pocos minutos cuando siente que la otra persona se aleja un poco. Si ve el mensaje leído y no recibe respuesta, escribe otra vez, y luego se arrepiente de haberlo hecho. Su mapa también muestra tierra fuerte y metal débil, así que la presión pesa más que el apoyo fino que le ayudaría a ordenar lo que siente. Y tú, Lucía, podrías reconocerte en esa misma secuencia.",
    "A Martina le cuesta dejar en pausa el impulso de comprobar, porque el silencio le suena a pérdida. En vez de quedarse quieta, manda señales una tras otra y luego toma distancia cuando por fin contestan. Su patrón no se mueve por frialdad, sino por la necesidad de asegurar el vínculo antes de que se rompa. Y tú también estás mirando ese borde.",
    "Por dentro, Martina no busca pelear; busca alivio. Por eso alterna entre insistir y apartarse, como si quisiera tocar la relación sin perder el control. Ese vaivén encaja con una ansiedad alta y una evitación baja, muy parecida a la que aparece en tu propio mapa. Y tú, Lucía, también estás intentando sostener algo que no quieres perder."
   ],
   "oheng_intro": "Tu tierra está en 38% y el metal en 0%, así que la presión pesa más de lo que te sostiene la estructura fina. En tu mapa, la tierra es la fuerza que te pone peso, responsabilidad y exigencia encima, y el metal es la energía que te daría apoyo, aprendizaje y protección. En un módulo de amor y apego, esa mezcla se nota cuando una respuesta tarda y tú sientes que necesitas confirmar el vínculo antes de que la mente se te vaya al peor escenario.",
   "quiz_reading": "Tu ansiedad está en 82% y la evitación en 34%, y esa combinación dibuja un apego ansioso. Cuando la respuesta tarda, tu mente no se queda en blanco: busca una explicación, la revisa y vuelve a tocar la puerta. Por eso tu día no se rompe por fuera, pero por dentro sí se te mueve el suelo hasta que recibes una señal clara.",
   "element_readings": {
    "wood": {
     "heading": "🌳 madera débil — el impulso que llega antes que la calma",
     "body": "Tu madera está en 13%, así que aparece poco y sin ocupar demasiado espacio. En un día de espera, eso se nota cuando te cuesta abrir una conversación nueva que te saque del bucle. La tierra puede alimentar a la madera, pero aquí primero sientes el peso de la tierra antes de que llegue ese gesto de avance."
    },
    "fire": {
     "heading": "🔥 fuego en equilibrio — el pulso que busca respuesta",
     "body": "Tu fuego está en 25%, así que no falta, pero tampoco domina. En tu forma de esperar una respuesta, ese fuego se ve en la urgencia de escribir otra vez y en la necesidad de que algo pase ya. También es la parte que te devuelve calor cuando el contacto sí llega y por fin notas alivio."
    },
    "earth": {
     "heading": "⛰️ tierra fuerte — el peso que te pide pruebas",
     "body": "Tu tierra está en 38%, y es la fuerza más marcada de tu mapa. En ti, eso se siente como una exigencia interna que pide comprobaciones, sobre todo cuando el chat queda en visto y no avanza. Como tu agua recibe esa presión de la tierra, la ansiedad se vuelve más intensa justo cuando intentas sostener el vínculo con más firmeza."
    },
    "metal": {
     "heading": "💎 metal débil — el apoyo que todavía pide espacio",
     "body": "Tu metal está en 0%, así que ahora mismo casi no se deja ver. En tu mapa, la tierra puede alimentar al metal, y por eso la estructura que te ayudaría a ordenar lo que sientes necesita ser construida con cuidado, no a golpes. En una espera larga, eso se nota porque te cuesta apoyarte en una pausa limpia antes de volver a escribir."
    },
    "water": {
     "heading": "💧 agua en equilibrio — la sensibilidad que capta el silencio",
     "body": "Tu agua está en 25%, así que la sensibilidad está presente de forma clara. En una relación, eso te hace captar enseguida el cambio de tono, la demora o el mensaje leído sin respuesta. También te da una lectura muy fina del clima emocional, aunque a veces esa lectura se vuelva demasiado rápida para tu propio descanso."
    }
   },
   "upcoming_period_preview_heading": "38 años, el fuego abre otro tramo",
   "upcoming_period_preview_body": "38 años marcan el inicio de un ciclo de diez años en el que el fuego gana fuerza. Hasta ahora, tu mapa ha sentido más el peso de la tierra que el empuje de ese fuego que viene después. En la imagen de fondo, la luz cambia de sitio y el aire deja de sentirse tan denso.",
   "module_map": {
    "title": "Tu alarma en las relaciones",
    "body": "Tu alarma en las relaciones se enciende cuando ves un mensaje leído y pasan horas sin respuesta. En ese momento, tu mente no se queda quieta: empieza a revisar qué pasó, qué dijiste y qué cambió. Ahí aparece el impulso de mandar mensajes seguidos para comprobar, y luego el gesto contrario de tomar distancia cuando por fin contestan. No es un capricho; es una forma de buscar seguridad cuando la señal del otro se vuelve ambigua. En este patrón, la cercanía no te apaga la alarma por sí sola: necesitas una respuesta clara para que tu sistema deje de vigilar."
   },
   "module_deep": {
    "title": "Una relación que sea tu base segura",
    "body": "Una relación que sea tu base segura no se construye con pruebas eternas, sino con señales repetidas que puedas leer sin esfuerzo. A ti te sirve pedir algo muy concreto: “Si vas a tardar, mándame un mensaje corto para que no me quede esperando”. Esa frase no suena a exigencia vacía; suena a cuidado bien puesto. También te ayuda mantener un poco de distancia entre una señal y la siguiente, para que la ansiedad no tome el mando antes de tiempo. Lucía, lo que necesitas no es adivinar menos: es recibir mejor."
   },
   "upcoming_period_heading": "38 años, comienza un tramo de fuego",
   "upcoming_period_body": "A los 38 años, el fuego entra con más fuerza y eso cambia el tono de tus vínculos. La espera deja de sentirse tan cerrada y pasa a pedir más movimiento, más presencia y más calor visible en el día a día. Para ti, eso significa que la relación deja de sostenerse solo con comprobaciones y empieza a pedir una manera más directa de mostrar lo que sientes. Conviene llegar a ese tramo con más claridad en tu forma de pedir respuesta, porque ahí el contacto se vuelve más activo y más fácil de notar.",
   "cross_analysis_quotes": [
    "“Cuando una respuesta tarda, tu mente no descansa: busca una explicación y vuelve a tocar la puerta.” Esa frase encaja con tu ansiedad en 82% y con la tierra en 38%, porque ambas empujan a revisar antes de soltar. En tu día, eso aparece cuando miras el chat, vuelves a escribir y todavía sientes que falta algo.",
    "“Tu necesidad de confirmar no viene de frío, viene de miedo a perder el vínculo.” Esa frase une tu evitación baja, en 34%, con el hecho de que te acercas más cuando notas distancia. Por eso, cuando la otra persona tarda, no te cierras del todo: insistes primero y te apartas después."
   ],
   "answer_notes": [
    "Cuando dijiste que querías comprobar una y otra vez qué pasa si tu pareja tarda, mostraste una ansiedad que no se queda quieta. En la vida diaria, eso se ve en abrir el chat, volver a mirar y buscar una señal que calme el pecho. Te sirve saber que tu mente está pidiendo seguridad, no un juicio contra ti.",
    "Cuando dijiste que sientes más tranquilidad cuanto más cerca están, mostraste que la cercanía sí regula tu sistema. Eso se nota en cómo cambia tu ánimo cuando hay contacto claro y el silencio deja de mandar. Te conviene recordar que tu alivio crece con señales limpias, no con suposiciones."
   ],
   "chat_snapshot_note": "Tu preocupación central es que, cuando una respuesta tarda, te derrumbas. Debajo de esa ansiedad y de ese dolor hay una búsqueda muy concreta: saber que el vínculo sigue ahí. Lo que más pesa no es solo la demora, sino la duda que deja detrás, y esa duda te mueve de inmediato.",
   "chat_trigger_note": "Un mensaje leído y sin respuesta durante horas te altera porque convierte el silencio en una historia completa. Tu ansiedad alta hace que ese hueco no se quede vacío: intenta llenarlo con explicaciones, con otro mensaje o con una retirada brusca. En tu mapa, ese momento toca directo la tierra fuerte, que pide certeza, y el agua sensible, que capta el cambio enseguida.",
   "chat_repeat_note": "Primero escribes una y otra vez para comprobar, y luego te arrepientes. Después, cuando por fin responden, tomas distancia como si quisieras recuperar el control que sentiste perdido. Un paso pequeño para salir de ahí es esperar unos minutos antes de enviar el siguiente mensaje y mirar qué emoción estás intentando calmar.",
   "chat_fear_note": "Tu miedo a que al final se vaya no habla de dramatismo, sino de valor afectivo. Lo que quieres proteger es la continuidad del vínculo, no solo una respuesta puntual. Debajo de ese miedo hay un deseo muy claro de que la relación siga viva y no se te escape entre los dedos.",
   "psychology_fact_heading": "Apego ansioso de Bowlby y Ainsworth",
   "psychology_fact_body": "El apego ansioso describe una forma de vincularse en la que la señal del otro regula mucho el estado interno. Cuando la respuesta tarda, la mente busca contacto, explicación y confirmación con rapidez. En tu caso, eso encaja muy bien con la ansiedad en 82% y con el patrón de insistir primero y arrepentirte después. No es que no soportes el amor; es que la incertidumbre te ocupa demasiado espacio.",
   "psychology_takeaway": "Tu sistema no pide más drama: pide más señal clara. Cuando la relación se vuelve ambigua, tu cuerpo y tu mente se ponen a trabajar de más para no perder el vínculo.",
   "strengths": [
    {
     "title": "Lectura fina",
     "body": "Notas enseguida cuando el tono cambia, y esa sensibilidad aparece en tu forma de leer un mensaje leído sin respuesta. No tardas mucho en captar que algo se movió, y eso te da una percepción muy precisa del clima emocional. Lucía, esa agudeza es una forma real de cuidado."
    },
    {
     "title": "Lealtad activa",
     "body": "Tu impulso no es irte, sino volver a tocar la relación cuando sientes distancia. Eso se ve en que mandas mensajes seguidos para comprobar y luego sigues pendiente de la respuesta. Esa insistencia habla de un vínculo que te importa de verdad."
    },
    {
     "title": "Búsqueda de calma",
     "body": "Cuando dijiste que sientes más tranquilidad cuanto más cerca están, dejaste ver una necesidad muy honesta de regulación compartida. No buscas pelear; buscas que el contacto te ordene por dentro. Lucía, ahí hay una capacidad clara para reconocer qué te hace bien."
    },
    {
     "title": "Reparación rápida",
     "body": "Después de insistir, aparece el arrepentimiento, y eso muestra que también registras el exceso a tiempo. No te quedas instalada en el mismo gesto para siempre. Esa conciencia te da una puerta para ajustar la forma sin perder la intención de acercarte."
    }
   ],
   "weaknesses": [
    {
     "title": "Alarma alta",
     "body": "Un mensaje leído y sin respuesta durante horas te activa más de lo que quisieras. En lugar de dejar espacio, tu mente empieza a llenar el vacío con explicaciones rápidas. Lucía, eso te deja expuesta a vivir demasiado dentro del silencio."
    },
    {
     "title": "Insistencia rápida",
     "body": "Tu patrón de escribir una y otra vez aparece antes de que la emoción baje. Así intentas recuperar control, pero el alivio dura poco. El impulso te ayuda a actuar, aunque luego te deje con más dudas."
    },
    {
     "title": "Retirada posterior",
     "body": "Cuando por fin responden, tomas distancia como si necesitaras enfriar lo que quedó demasiado abierto. Ese giro te protege un poco, pero también corta la posibilidad de respirar junto a la otra persona. Lucía, ahí se ve tu esfuerzo por no quedarte sin aire en la espera."
    },
    {
     "title": "Miedo al final",
     "body": "Debajo de todo está la idea de que al final se vaya. No es una fantasía lejana: es la historia que tu mente cuenta cuando el otro tarda. Ese miedo te empuja a comprobar antes de tiempo y a vivir la relación con demasiada urgencia."
    }
   ],
   "fit_good": "Te va bien un día con respuestas claras, horarios previsibles y margen para hablar sin correr detrás del chat. Te sienta mejor una relación en la que puedas pedir una señal concreta y recibirla sin rodeos. Lucía, cuando el contacto es directo, tu día conserva mejor el ritmo.",
   "fit_bad": "Te desgasta mucho un entorno donde las respuestas quedan en el aire y todo depende de adivinar el tono del otro. También te complica una relación en la que cada demora se interpreta como desinterés. Lucía, ese tipo de clima te deja pendiente del teléfono y te roba presencia.",
   "behavior_guides": [
    {
     "title": "Pausa breve",
     "body": "Cuando veas un mensaje leído y sin respuesta, espera diez minutos antes de volver a escribir. En esos minutos, mira si lo que buscas es información o alivio. Lucía, esa pausa pequeña ya cambia el tono de la reacción."
    },
    {
     "title": "Pedido claro",
     "body": "Dile a la otra persona una frase concreta sobre lo que te ayuda cuando tarda. Hazlo en un momento tranquilo, no en medio del pico de ansiedad. Así conviertes la espera en una petición legible y no en una prueba."
    },
    {
     "title": "Límite al chat",
     "body": "Si notas que ya mandaste varios mensajes seguidos, cierra la aplicación durante un rato. No para castigar, sino para que tu cuerpo baje un poco la alarma. Lucía, ese corte corto te devuelve aire sin romper el vínculo."
    },
    {
     "title": "Revisión nocturna",
     "body": "Por la noche, antes de dormir, mira una sola vez si hubo respuesta y luego deja el chat fuera de vista. Así evitas entrar al bucle de comprobar y arrepentirte varias veces. Ese gesto simple protege tu descanso y tu ánimo del día siguiente."
    }
   ],
   "mindset_guide": "Piensa en tu relación como en una puerta con mirilla, no como en una pared que hay que golpear. No necesitas tocarla cada segundo para saber que sigue ahí. Cuando la señal tarda, no significa automáticamente que se haya roto. Tu tarea es aprender a esperar una respuesta sin convertir el silencio en sentencia. Lucía, la calma también puede ser una forma de seguir cerca.",
   "closing_title": "Lo que queda encendido",
   "closing_body": "A los 38 años, el fuego entra con más fuerza y deja atrás el tramo en el que la tierra pesaba tanto. Hoy todavía sientes la demora como un golpe en el pecho, pero ese ciclo de diez años cambia la forma de mirar la respuesta y de sostener el vínculo. En el terreno del amor, eso hace que la espera pierda dureza y que el contacto se note con más claridad. Lucía, lo más importante que te deja este mapa es esto: tu necesidad de confirmación no te define, pero sí te muestra dónde empieza tu cuidado."
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
 "riley": {
  "content": {
   "title_line1": "When the reply stalls, your mind starts pacing",
   "title_line2": "and your heart starts counting the silence",
   "subtitle": "Module 1 · Love & Attachment deep report — Saju × psychology × counseling integration",
   "opening_scene": "It’s late, the chat is still open, and your thumb keeps hovering over the same thread. You’ve already checked the read receipt more than once, and the room feels quieter every time you do it. In your head, the line keeps arriving before the facts do: \"Did I do something wrong?\" Then you send another check-in, sit with the sting, and start watching your own reaction as if it belongs to someone else. Riley, doesn’t this feel a lot like your nights lately?",
   "case_tag": "EXAMPLE CASE — Emma, early 30s, waiting on a partner’s reply",
   "case_paragraphs": [
    "Emma sees a read receipt and then spends the next hour picking up her phone again and again. She sends two short check-in texts, feels embarrassed right after, and then goes cold the moment the reply finally comes back. Her Five Elements pattern is tilted toward Wood, so the feeling of reaching out first is strong while the urge to hold back doesn’t last long. You can see yourself in her before the story even finishes, can’t you?"
   ],
   "oheng_intro": "Your Wood is 50%, which is strong, and your Metal is 0%, which is weak. Because your Day Master is Wood, that strong Wood feels like your own force at work, while Metal lands as pressure, rules, and a sense of being pinned down. In this love module, that balance shows up when a delayed reply starts to feel less like timing and more like a test.",
   "quiz_reading": "Your anxiety score is 82%, and your avoidance score is 34%, which matches the Anxious-Preoccupied pattern exactly. That combination shows up as reading a partner’s mood first, then putting your own feelings last until the silence gets too loud. In your day, it becomes the moment you screenshot the chat, ask a friend if it looks okay, and still can’t stop checking the thread yourself.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — always reaching for contact first",
     "body": "Your Wood at 50% is strong, so the first impulse is movement: checking, reaching, clarifying, trying again. Because your Day Master is Wood, this is not a borrowed style; it is your own energy turning toward the relationship and wanting a live response. When a message sits unread, your mind does not stay still for long. Riley, that is why the silence feels active to you, not empty."
    },
    "fire": {
     "heading": "🔥 Fire absent — the spark doesn’t stay visible for long",
     "body": "Fire is at 0%, so warmth doesn’t naturally stay on the surface long enough to carry you through the wait. In a love setting, that can make the gap between sending and hearing back feel colder than it looks on the screen. You may still care deeply, but the feeling doesn’t get to burn steadily in the background. Riley, that is why one unread message can change the whole temperature of your evening."
    },
    "earth": {
     "heading": "⛰️ Earth balanced — the ground you can build on",
     "body": "Your Earth at 25% is present in a moderate way, giving you some steadiness without making it the strongest part of your chart. In this module, that can support your wish to keep your day intact even when a reply is late. Earth does not erase the anxiety, but it gives you a place to stand while you feel it. Riley, this is the part of you that wants the bond to feel dependable, not dramatic."
    },
    "metal": {
     "heading": "💎 Metal weak — pressure lands too sharply",
     "body": "Your Metal is 0%, so the weight of rules, limits, and unclear expectations can feel especially sharp. Earth supports Metal, and that matters here because steadier routines and clearer structure are what help that pressure stop feeling so personal. When a reply is late, the problem is not just the delay; it can start to feel like judgment. Riley, that is why a simple pause can press on you like a verdict."
    },
    "water": {
     "heading": "💧 Water balanced — feeling flows fast under the surface",
     "body": "Your Water at 25% is present in a moderate way, so feeling can move quickly enough for you to pick up cues before you’ve fully named them. That is why you read a partner’s mood first and only then notice your own. In a romance context, this can make you very alert to shifts that other people miss. Riley, your sensitivity is real, and it shows up before the words do."
    }
   },
   "upcoming_period_preview_heading": "46 years old and beyond, Earth begins to take the lead",
   "upcoming_period_preview_body": "From age 46 to 55, Earth takes the lead and the pace of your inner weather changes. The part of you that now reacts first and thinks later starts to meet a steadier rhythm, like the room itself has more weight in it. The same relationship silence does not vanish, but it begins to land on firmer ground.",
   "module_map": {
    "title": "Your relationship alarm",
    "body": "A delayed reply is what flips your alarm on, especially when the message has already been read and hours keep passing with no answer. Once that alarm goes off, you do not really move away; you move toward it, through check-in texts, screenshots, and asking someone else if the chat looks okay. That is the classic push-pull of attachment: the protest behavior starts, and then the coldness arrives after the reply finally comes back. Riley, your system is not asking for drama — it is asking for contact that feels legible."
   },
   "module_deep": {
    "title": "A relationship that feels like a safe base",
    "body": "What helps you most is not more closeness in the abstract; it is clearer closeness. A partner who can name timing, even briefly, gives your system something solid to hold while you wait. You also do better with a little distance that is predictable, not sudden, because surprise is what makes your attachment alarm jump. If you want one sentence to ask for, keep it simple: \"If you’re busy, can you just tell me when you’ll reply?\" Riley, that one line asks for structure without turning the relationship into a test."
   },
   "upcoming_period_heading": "46 years old and beyond, the next chapter settles in",
   "upcoming_period_body": "From age 46 to 55, this Earth shift marks a different kind of relationship timing for you. The rush to send another text is less likely to run the whole night, because the frame around the feeling gets thicker. That means you get more room to notice the gap between the message and the meaning you attach to it. Riley, the same silence will still exist, but it will no longer fill the whole room.",
   "cross_analysis_quotes": [
    "Your 82% anxiety and your strong Wood point in the same direction: you reach for reassurance when the bond feels uncertain. As a Wood Day Master, you lean on the same kind of energy for support, so you do not want to be left alone with the worry. That is why a late reply can pull you straight into checking again.",
    "A late reply, a message read with no answer, and the regret that follows all show how quickly your relationship alarm turns contact into urgency. You send check-in texts one after another because the silence feels loaded, and then you feel bad about it afterward. Underneath that pattern is the fear that the other person may leave in the end.",
    "Your low avoidance means you do not pull away when things feel tense. You stay close, keep reading the other person's mood, and put your own feelings last. Even when closeness starts to hurt, you still try to hold the connection together."
   ],
   "answer_notes": [
    "Your answer on anxiety shows a mind that keeps scanning for contact instead of letting the silence stay neutral. In daily life, that becomes phone-checking, rereading the thread, and asking for reassurance before the feeling settles. Riley, the part of you that wants to know what’s going on is also the part that wants to stay attached.",
    "Your answer on avoidance shows that closeness actually helps you relax rather than shut down. In real life, that means distance is the sharper trigger, while warmth and response soften your body fast. Riley, you are not built to disappear when a bond gets real."
   ],
   "chat_snapshot_note": "Your core worry is simple and very specific: when a reply is late, you fall apart. The feeling attached to it is anxious and a little hurt, which makes sense because a read message with no answer for hours is the exact thing that lights the fuse. Riley, the line worth saving is this: your nervous system treats silence like a relationship event.",
   "chat_trigger_note": "A message being read but not answered is not a small thing for you; it is the moment your mind starts trying to protect you. That is why the trigger is so strong: it lands right on your high anxiety and makes the bond feel uncertain before there is any real evidence of loss. In Wood terms, the signal you receive feels like a branch bending without warning.",
   "chat_repeat_note": "Your repeat pattern is to send check-in texts in a row and then regret it. The loop is clear: pressure rises, you reach out again, and then you feel exposed once the reply comes in. A small way to interrupt it is to make one private note before you text, so the second message waits while your body catches up.",
   "chat_fear_note": "Underneath the checking is one fear: that they’ll leave in the end. That fear makes sense because it is really asking for continuity, not just a reply. Riley, the longing inside that fear is to be chosen without having to chase for proof.",
   "psychology_fact_heading": "Bowlby and attachment protest",
   "psychology_fact_body": "John Bowlby’s attachment theory describes how people seek closeness to a trusted figure when they feel uncertain or distressed. In anxious attachment, the attachment system activates quickly, and protest behaviors like repeated contact can appear when connection feels threatened. Your pattern fits that logic closely: the late reply activates alarm, and checking becomes an attempt to restore felt safety. The theory helps name what you already know in your body — you are not craving attention for its own sake; you are trying to re-establish connection.",
   "psychology_takeaway": "Your alarm is about connection, not neediness. When the bond feels unclear, your system reaches first and thinks later.",
   "strengths": [
    {
     "title": "Relational radar",
     "body": "You catch shifts in a partner’s tone fast, sometimes before the other person has even named them. That is why you notice a read message with no reply so quickly and why the silence feels personal right away. Riley, this sensitivity is a strength because it tells you when the bond matters to you."
    },
    {
     "title": "Deep commitment",
     "body": "You do not detach easily, and that low avoidance shows up as staying emotionally present even when you feel uneasy. In the chat, you still keep reaching, even after the first check-in text already made you regret it. Riley, that persistence is a form of devotion, not just anxiety."
    },
    {
     "title": "Repair drive",
     "body": "You want the day to stay intact, and that means you are not trying to burn the connection down when you feel hurt. Instead, you keep trying to stitch the thread back together, even if the method sometimes gets clumsy. Riley, there is real strength in wanting to return to contact instead of giving up on it."
    },
    {
     "title": "Self-observation",
     "body": "You already screenshot the chat and ask a friend if it looks okay, which means you can step back far enough to watch your own reactions. That is important because it gives you a pause before the next text goes out. Riley, the fact that you can notice the pattern is the first place change can actually begin."
    }
   ],
   "weaknesses": [
    {
     "title": "Reassurance hunger",
     "body": "When the reply is late, one question is rarely enough; your system wants another and another until the tension drops. That is how the late-night thread turns into a string of check-in texts. Riley, the problem is not the need for reassurance — it is how fast the need turns into urgency."
    },
    {
     "title": "Meaning spiral",
     "body": "A read receipt can turn into a whole story before the facts have caught up. You move from \"they’re busy\" to \"I did something wrong\" very quickly, and that shift is what makes the hurt spike. Riley, the spiral is fast because your attachment alarm is fast."
    },
    {
     "title": "Hot then cold",
     "body": "You reach out, then feel embarrassed, then act cold once they answer. That swing is your way of protecting yourself after you’ve already exposed how much the silence affected you. Riley, the coldness is not indifference; it is a shield that arrives late."
    },
    {
     "title": "Outsourced certainty",
     "body": "You screenshot the chat and ask a friend if it is fine, which means your calm can start depending on someone else’s reading. That can help for a moment, but it also keeps your own sense of the relationship from settling inside you. Riley, you deserve a steadier place to check than the edge of your phone."
    }
   ],
   "fit_good": "You do best with a relationship rhythm that answers clearly and at a pace you can predict. A partner who says, \"I’m tied up, I’ll text you after work,\" gives your system a place to land, and your own day stays more intact. Riley, you work better when contact is clear enough that you do not have to guess what silence means.",
   "fit_bad": "You struggle most in a setup where replies come in bursts and the tone changes without explanation. A partner who leaves messages read for hours and then answers casually can keep your nervous system on alert all day. Riley, that kind of environment turns your attention into a constant scan.",
   "behavior_guides": [
    {
     "title": "Pause rule",
     "body": "When a message is read but unanswered, wait ten minutes before sending anything else. Use that time to put the phone face down and name the feeling once, out loud or in a note. Riley, the goal is not to suppress the urge — it is to let the first wave pass before you act."
    },
    {
     "title": "Single check-in",
     "body": "Send one clear check-in text, then stop at one. Keep it short, and do not add a second message unless they respond or the plan changes. Riley, this gives your care a shape without letting it spill into a string."
    },
    {
     "title": "Private reality check",
     "body": "Before you ask a friend, write down the exact evidence you have: read, no reply, hours passed. Then write the story your mind is adding on top. Riley, that split helps you see the difference between the fact and the fear."
    },
    {
     "title": "After-reply reset",
     "body": "When they finally answer, do not punish the bond by going cold. Take one breath, read the message once, and reply in the same tone you would have used if you had felt secure all along. Riley, this keeps the connection from becoming a tug-of-war after the wait."
    }
   ],
   "mindset_guide": "Think of your attachment system like a smoke alarm that is very good at noticing heat. The alarm is not wrong for sounding; it is just early, and early is not the same as final. Your job is not to smash the alarm, but to check the room before you decide there is a fire. Riley, when you do that, the same sensitivity that used to overwhelm you starts to become information.",
   "closing_title": "The thread stays, even when the reply doesn’t",
   "closing_body": "From age 46 to 55, Earth begins to lead, and that shift changes the way a late reply lands in your body. The same message gap still exists, but it stops filling the whole night, and the need to chase it loses some of its force. In this love pattern, that means your day can stay more intact even when the thread goes quiet. Riley, what used to feel like proof of loss starts to feel like a pause you can stand inside."
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
 "mia": {
  "content": {
   "title_line1": "You reach for a reply before the silence can settle.",
   "title_line2": "And the moment it takes too long, your whole day starts to wobble.",
   "subtitle": "Module 1 · Love & Attachment deep report — Saju × psychology × counseling integration",
   "opening_scene": "It’s late enough that the screen glow feels sharper than the room, and your thumb keeps hovering over the chat thread with the read receipt sitting there untouched. You’ve already checked the message once, maybe twice, and the thought in your head is not subtle anymore: if you wait, something might slip away. Then the checking starts to feel embarrassing, so you tell yourself to stop, only to pick the phone up again a minute later. Mia, isn’t this exactly what your nights have been looking like lately?",
   "case_tag": "EXAMPLE CASE — Hannah, early 30s, dating and waiting for replies",
   "case_paragraphs": [
    "Hannah keeps her phone face-up through dinner because one unread reply can change the whole mood of the evening. She sends one check-in text, then another, and by the time the answer arrives she already feels annoyed with herself. Her Five Elements balance is also uneven in a way that mirrors this: strong Wood and weak Water, which makes her hold hard onto what matters while struggling to let feelings flow out cleanly. You can see yourself in her before the message even lands."
   ],
   "oheng_intro": "Your Wood is 38%, which is strong, and your Water is 13%, which is weak. In Day Master terms, that means Wood is the energy you hold and manage, while Water is the energy you pour out through expression, talent, and emotional release. In this love module, that balance shows up as holding on tightly to the relationship while finding it harder to let your feelings move without getting stuck on the reply itself.",
   "quiz_reading": "Your Anxiety score is 82%, and your type is Anxious-Preoccupied, so your system reacts fast the moment a reply slows down. Your Avoidance score is 34%, which fits the way you stay engaged first and only go cold after the tension has already built up. That is why your day can shift from checking the chat to texting again and again, then regretting the whole thing once the other person finally answers.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — you hold on before you let go",
     "body": "Your Wood sits at 38%, so it’s strong rather than merely present. That means you don’t treat a relationship casually; you grip the thread, watch the thread, and feel the thread before you can relax your hand. In a late-reply moment, that strength turns into the urge to keep the bond active at all costs, which is why one quiet chat can start to feel like the center of the room. It’s also why your care doesn’t stay vague — it becomes action fast."
    },
    "fire": {
     "heading": "🔥 Fire weak — the spark is there, but it gets swallowed by waiting",
     "body": "Your Fire is 13%, so it’s weak and not the loudest thing in the room. In your case, that can look like the warmth of wanting closeness getting buried under the tension of not hearing back, so the emotional spark never gets to stay simple for long. You may feel the heat first, then immediately start reading into the delay instead of staying with the feeling itself. That makes the relationship feel less like a glow and more like a signal you have to decode."
    },
    "earth": {
     "heading": "⛰️ Earth weak — steadiness has to be built, not assumed",
     "body": "Your Earth is 13%, so steadiness is also on the thin side. That matters here because the part of you that wants a calm middle ground has to work harder when the chat goes silent for hours. Instead of settling into the day and letting the relationship sit in the background, your mind starts reorganizing around the missing reply. The scene that fits your data is simple: the message is read, the answer doesn’t come, and your balance goes straight out of your hands."
    },
    "metal": {
     "heading": "💎 Metal moderate — you notice the edge in the exchange",
     "body": "Your Metal is 25%, which is moderate and gives you a clear sense of boundaries, tone, and timing. That’s part of why you catch the difference between a warm reply and a flat one so quickly, sometimes before the other person has even finished typing. In a relationship, that sharpness helps you read what’s happening, but it can also make you track every pause like evidence. You don’t just hear the words; you hear the distance inside them."
    },
    "water": {
     "heading": "💧 Water weak — your feelings need a cleaner channel",
     "body": "Your Water is 13%, so it is weak. In Five Elements terms, Metal supports Water, so your Metal can help Water move more smoothly. In this love module, that matters because your feelings can build up quickly when a reply is late, and then come out as repeated texts followed by regret. The sharpest line here is this: you feel first, but you do not always get to release cleanly."
    }
   },
   "upcoming_period_preview_heading": "33 years old onward, Water season begins",
   "upcoming_period_preview_body": "From age 33 to 42, Water becomes stronger in your 10-year cycle. That is the start of a new chapter, and the shift itself is already part of your chart. The feeling is less like standing outside a door and more like the air finally moving again after a long still room.",
   "module_map": {
    "title": "Your relationship alarm",
    "body": "A read message with no answer for hours is what flips your alarm on. Once that alarm sounds, you move toward the connection first, not away from it, which is why the impulse becomes checking, sending another text, and trying to keep the bond visible. The attachment theory frame fits you closely here: your protest behavior shows up before your mind has time to calm the story down. Then, after the reply finally comes, the coldness that follows is less about not caring and more about trying to recover some control."
   },
   "module_deep": {
    "title": "A relationship that feels like a safe base",
    "body": "What helps you feel safe is not nonstop reassurance, but a steady, specific signal. A short check-in like “I’m tied up, I’ll reply later tonight” does more for you than a flood of vague affection, because it gives your Wood something firm to hold and your Water something clean to release into. You do not need constant closeness; you need predictable contact that keeps the bond from feeling like a guessing game. If you want to ask for it, your line can be simple: “If you’re busy, can you just tell me when you’ll be back?”"
   },
   "upcoming_period_heading": "33 years old onward, a new chapter opens",
   "upcoming_period_body": "From age 33 to 42, the stronger Water phase means the part of you that feels, softens, and releases has more room to work. In a love life that currently tightens around silence, that shift matters because your inner response no longer has to rush straight into checking and repairing. You will still care deeply, but the emotional current has a better path through you, so the relationship does not have to carry every ounce of your day. What is worth preparing now is not a strategy for less love, but a way to let the reply arrive without letting your whole mood collapse first.",
   "cross_analysis_quotes": [
    "Your 82% anxiety and strong Wood are speaking the same language: when a reply stalls, your system reaches for connection instead of letting it drift. Wood is the force that helps you grasp real-life matters, so you move toward contact and reassurance. That is why your first move is usually another text, not silence.",
    "Your 34% avoidance and weak Water line up in a quieter way: you do not disappear from closeness, but you can turn cold after the tension has already built. Water is the force that helps you stay emotionally fluid, so when it runs low, you may protect yourself by pulling back after the pressure rises. That coldness is a reset attempt, not proof that you stopped caring."
   ],
   "answer_notes": [
    "Your answer on Anxiety shows that uncertainty pushes you toward contact, not withdrawal. In daily life, that looks like refreshing the thread, rereading the last line, and trying to restore the bond before the discomfort grows. The more important clue is that you want reassurance fast enough to keep the relationship feeling intact.",
    "Your answer on Avoidance shows that closeness itself does not scare you off; it actually lets you relax. In daily life, that means the relationship feels better once the distance is gone, even if you acted stiff or chilly while waiting. You chose the response that reveals how quickly warmth returns when the connection feels safe again."
   ],
   "chat_snapshot_note": "Your core concern is not abstract at all: when a reply is late, you fall apart. The feeling attached to that is anxious and a little hurt, which is why the unread message can take over the whole evening so fast. Save this line: you are not asking for too much; you are asking for contact before your mind starts writing the worst ending.",
   "chat_trigger_note": "A message being read but not answered is a direct trigger for you because it creates a gap with no explanation. That gap lands right on your high Anxiety score and wakes up the part of you that wants to check what’s going on immediately. In this chart, the trigger is not small; it is the exact moment your attachment alarm turns on.",
   "chat_repeat_note": "Your repeating pattern is clear: you send check-in texts in a row, then regret it. The loop works like this — tension rises, you reach out again, then you pull back emotionally once the reply finally lands. The smallest way to interrupt it is to pause after the first text and wait long enough to notice the urge instead of obeying it right away.",
   "chat_fear_note": "Under the anxiety is a very plain fear: you’re scared they’ll leave in the end. That fear doesn’t make you dramatic; it makes you protective of the bond before you have enough proof that it’s steady. What you want underneath it is simple — to feel chosen without having to chase the feeling every time.",
   "psychology_fact_heading": "Bowlby and attachment theory",
   "psychology_fact_body": "John Bowlby’s attachment theory says that people look for a safe base in close relationships, especially when connection feels uncertain. In an anxious style, the attachment system gets activated quickly, and reassurance-seeking can become the fastest way to reduce distress. Your pattern fits that logic closely: a delayed reply is enough to wake up the system, and the mind starts scanning for signs of loss. The theory does not say you are broken; it explains why proximity matters so much to your nervous system.",
   "psychology_takeaway": "Your alarm is about uncertainty, not neediness. When the bond feels less predictable, your system reaches first and thinks later.",
   "strengths": [
    {
     "title": "Fast sensing",
     "body": "You catch shifts in tone quickly, sometimes from a single read receipt. That sensitivity is part of why you notice when the relationship feels warm, flat, or delayed before someone else might. In your data, it shows up as reading their mood first and putting your own feelings last."
    },
    {
     "title": "Deep loyalty",
     "body": "You do not drift casually when you care about someone; you stay engaged. That is why one slow reply can matter so much, because your investment is already real by the time the silence starts. The same force that makes you anxious also makes you deeply committed."
    },
    {
     "title": "Repair drive",
     "body": "You keep trying to restore contact instead of giving up on it. Sending another text after the silence is not just a habit; it is your instinct to stitch the connection back together. Even the regret afterward shows how seriously you take the relationship."
    },
    {
     "title": "Warm re-entry",
     "body": "Your Avoidance score stays low enough that closeness actually helps you relax. Once the other person responds, you are able to soften again instead of staying shut down. That gives the relationship a chance to recover quickly once the tension has passed."
    }
   ],
   "weaknesses": [
    {
     "title": "Reply panic",
     "body": "A late reply can take over the whole emotional field before you’ve had time to ground yourself. The result is a chain reaction: checking, texting, regretting, and then trying to act cool after the answer arrives. It’s not that the relationship is already failing; it’s that your system treats silence like a threat."
    },
    {
     "title": "Self-erasure",
     "body": "You tend to read the other person’s mood first and put your own feelings second. That makes you very attentive, but it also means your day can disappear inside someone else’s timing. When that happens, your own needs get quieter than they should be."
    },
    {
     "title": "Overchecking",
     "body": "The urge to send multiple check-in texts grows fast once the answer is delayed. It feels like action, but it usually creates more regret than relief. The pattern is understandable, yet it leaves you with less steadiness than you wanted."
    },
    {
     "title": "Cold reset",
     "body": "After the reply finally comes, you sometimes go cold to recover control. That shift can protect you for a moment, but it also adds distance right after you wanted closeness most. It is a reset move, not your true preference."
    }
   ],
   "fit_good": "You do best in a relationship rhythm where replies are not left hanging for long and tone is clear. A partner who sends a brief “busy now, back later” message gives your mind something solid to stand on, and your day stays more intact. You also work better when you can keep your own plans moving instead of waiting beside the phone all evening.",
   "fit_bad": "You struggle most in a setup where silence is left unexplained and timing is used loosely. Long gaps after a read receipt tend to pull you out of your own day and into monitoring mode. A relationship style that relies on guesswork will keep waking up the part of you that wants to check again and again.",
   "behavior_guides": [
    {
     "title": "One-text rule",
     "body": "When a reply is delayed, send one clear check-in and then stop. Set a 20-minute timer before you look again, so the urge does not turn into a chain. Use that pause to do one concrete thing away from the chat, like showering, walking, or finishing a task."
    },
    {
     "title": "Mood check",
     "body": "Before you text again, name what you feel in one sentence. Do it once in the moment, not after ten minutes of scrolling. This helps you separate the real feeling from the story your mind is building."
    },
    {
     "title": "Reply window",
     "body": "Agree with yourself on a specific time when you’ll return to the thread, such as after dinner or before bed. Until then, keep the app closed and let the day continue. The point is not to suppress the urge, but to stop it from setting the schedule."
    },
    {
     "title": "Cold reset pause",
     "body": "When they finally answer, wait a beat before replying if you notice the urge to act cold. Take one breath, read the message once, and answer from the part of you that actually wants connection. That small pause keeps you from turning hurt into distance automatically."
    }
   ],
   "mindset_guide": "Think of your attachment alarm like a smoke detector, not a verdict. It sounds fast, and it sounds loud, but it still needs a real signal before you treat the whole room as on fire. Your job is not to rip it out; your job is to look for the source before you sprint into the hallway. When the reply is late, your mind can learn to wait for evidence instead of writing the ending first.",
   "closing_title": "What stays after the silence",
   "closing_body": "From age 33 to 42, Water gets stronger, and that shift is already written into your chart. For you, that means the part of you that feels, speaks, and releases will have more room than it does now, so the late-reply spiral loses some of its grip. The day will feel less like it is being held hostage by one message, and more like it belongs to you again. In this love module, that is the lasting change: the bond can stay important without swallowing the whole day."
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
 "sam": {
  "content": {
   "title_line1": "You finish the day, but the day doesn’t finish you",
   "title_line2": "Your mind keeps the checklist alive long after your hands have stopped",
   "subtitle": "Module 3 · Burnout deep report — Saju × psychology test × counseling integration",
   "opening_scene": "It’s late, and your phone lights up with Monday-morning messages before you’ve even fully left the workday behind. You’ve already finished the task, but your mind is still back there, tracing each line, checking what might have been missed, as if the work only counts if you look at it one more time. The body is tired, but the part of you that measures readiness won’t sit down. Even on a day off, rest doesn’t land cleanly; it arrives with a second thought attached. Sam, doesn’t this sound like you lately?",
   "case_tag": "EXAMPLE CASE — Daniel, early 30s, stuck in a high-control workload",
   "case_paragraphs": [
    "Daniel ends every project by reopening it, then reopening it again, because he trusts the second check more than the first one. His week is packed, and the smallest message on Monday morning can pull his whole attention back into work mode. His Five Elements also show the same imbalance: Wood is dominant, while Fire is absent, so pressure is strong and relief is thin. You can hear your own rhythm in his day.",
    "He keeps pushing through, then crashes all at once, and the crash feels bigger because he has already spent so much energy pretending he is still fine. The problem is not laziness; it is a system that keeps asking for more than it returns. That is exactly how burnout builds when recovery never gets a real place to land. You keep pushing through, then crashing, and the fear underneath is that if you stop, you’ll fall behind."
   ],
   "oheng_intro": "Your Five Elements are evenly spread at 25% Wood, 25% Earth, 25% Metal, and 25% Water, with Fire at 0%. For a Day Master of Earth, Wood is the force that presses on you with rules, responsibility, and pressure, while Fire is the force that supports you with help, learning, and protection. That is why the burnout pattern here is not a dramatic collapse but a steady draining of energy from work and role demands. The imbalance shows up most clearly in the places where you feel you must keep going even after the task is already done.",
   "quiz_reading": "Your type, Finisher's Drain — Finishes everything, and is finished by it, sits right on top of the numbers: perfectionism at 82% and recovery at 34%. That combination shows up as the kind of day where you complete the work, then spend the rest of the evening mentally auditing it. Rest is there, but it doesn’t feel like rest because your attention keeps returning to unfinished danger. The low recovery score explains why a day off can still feel uneasy instead of light.",
   "element_readings": {
    "wood": {
     "heading": "🌳 Wood strong — pressure that keeps asking for one more pass",
     "body": "Wood is strong at 25%, and for your Earth Day Master that means the pressure to follow rules, carry responsibility, and stay on top of things sits close to the surface. It shows up when a finished task still does not feel finished until you have re-checked everything. That is a lot of mental weight to carry through the workday, and it helps explain why Monday-morning messages can hit so hard. The line to keep is this: you do not just do the work, you keep standing under it."
    },
    "fire": {
     "heading": "🔥 Fire weak — the kind of support that would let you exhale",
     "body": "Fire is weak at 0%, and Wood is the element that would nourish it, so the pressure in you has more to do than the warmth that would soften it. For your Earth Day Master, Fire is the support side of the equation: help, learning, protection, and the feeling that you do not have to hold everything alone. Without it, rest can feel suspicious instead of restoring. That is why even a day off can stay unsettled in your body."
    },
    "earth": {
     "heading": "⛰️ Earth strong — the part of you that keeps carrying",
     "body": "Earth sits at 25%, and as your Day Master it is the center that keeps you steady even when the workload keeps shifting. In a burnout pattern like yours, that steadiness turns into endurance: you keep holding the line, even when your energy is already frayed. It is the reason you can finish things, but it is also the reason you may not notice how much you have spent until the crash arrives. The image here is not collapse; it is a person still standing after too many loads."
    },
    "metal": {
     "heading": "💎 Metal balanced — the part that wants clean edges",
     "body": "Metal is at 25%, so it is not the source of the imbalance, but it gives your days a strong sense of standards and closure. You can feel it in the way unfinished details keep calling you back after the task is technically done. That can be useful when quality matters, but in burnout it can turn into a habit of tightening the screws long after the work is already enough. The result is a sharper finish and a softer center."
    },
    "water": {
     "heading": "💧 Water balanced — the quiet part that still keeps watch",
     "body": "Water is also at 25%, which gives you a mind that can stay alert and notice what might go wrong. In your case, that alertness does not turn off easily, so even rest can come with a thin layer of unease. It is part of why the Monday message lands so strongly: the mind is already ready to scan. The feeling is simple and specific — you are not empty, you are still monitoring."
    }
   },
   "upcoming_period_preview_heading": "From 40, Earth takes the lead",
   "upcoming_period_preview_body": "At age 40, Earth becomes the stronger current, and that 10-year cycle is still ahead of you. Until then, you are living in the present pattern, where overchecking and fatigue still shape the day. When that period arrives, the pace is likely to feel heavier, steadier, and more grounded, as if the ground itself is asking for a different kind of endurance.",
   "module_map": {
    "title": "Your energy balance sheet",
    "body": "Your energy balance sheet is tilted toward demand: perfectionism is high, recovery is low, and the workday seems to keep a claim on your attention after hours. The drain side is obvious in the re-checking, the Monday-morning messages, and the way you cram and then crash. The resource side is thinner, but it is not absent: you do finish things, and you do keep going with real responsibility. The main loss here is not effort; it is how little of that effort comes back to you as recovery, so the day feels spent without ever feeling complete."
   },
   "module_deep": {
    "title": "The order for refilling",
    "body": "The first thing to put down is the idea that every finish needs one more check to be valid. The second is the habit of treating rest as something you must earn by being completely done, because that rule keeps recovery too small to matter. The third is to put energy back into the parts of the day that actually return something to you: a clear handoff, a clean end to the task, and a pause that is protected from Monday-style re-entry. For you, refilling starts by making the end of work feel final enough to let your mind stand down."
   },
   "upcoming_period_heading": "From 40, a new ground opens",
   "upcoming_period_body": "At age 40, Earth does not just add weight; it changes the shape of the weight, and that 10-year cycle is still ahead of you. Right now, you are still dealing with the strain of overchecking, the Monday-morning messages that switch the tension back on, and the crash that follows a push too hard. When that period begins, the workday can feel less like a race against invisible failure and more like something that can be held in a clearer frame. That would make it easier to plan around steadier rhythms, clearer boundaries, and recovery that is treated as part of the job rather than a reward for surviving it.",
   "cross_analysis_quotes": [
    "“You’re not failing to rest; your mind is refusing to let the task stay finished.” That fits your 82% perfectionism exactly, because the checking reflex keeps the work mentally alive long after the deadline is over. You go back and re-check everything after finishing a task, so the work never really feels done.",
    "“Low recovery makes even a day off feel like a test you didn’t sign up for.” That is why your 34% recovery score matters so much here: the body stops, but the nervous system keeps asking whether stopping is safe. Even on a day off, you feel uneasy when you rest, so recovery never fully settles in."
   ],
   "answer_notes": [
    "Your answer to finishing by re-checking everything shows a mind that treats closure as something earned only after one more audit. In daily life, that becomes the extra pass over an email, the reopened file, the silent replay of what you already did well. Keep that question close: if the work is done, what is the checking still trying to protect?",
    "Your answer about feeling uneasy even when you rest shows that recovery is not just about time off for you; it is about whether your system believes the pause is allowed. That is why a quiet afternoon can still feel tense, with no obvious reason and no visible deadline. What you chose says you need rest that feels permitted, not just available."
   ],
   "chat_snapshot_note": "You came in saying that rest never really feels like resting, and the feeling underneath it was tired with a little anxiety. That combination matters, because the fatigue is not pure exhaustion; it is fatigue with vigilance still attached. The line I’d keep is this: you are not only tired, you are still on watch.",
   "chat_trigger_note": "Monday-morning messages hit so hard because they reactivate the exact state you were trying to leave behind. They don’t just bring information; they bring the work posture back with them, and that is why the tension jumps so fast. In burnout terms, the trigger lands on a system that already has high pressure and low recovery.",
   "chat_repeat_note": "Your pattern is to cram hard, then crash all at once, which means the workload gets compressed into a burst instead of spread across a steadier rhythm. In the middle of that burst, you choose control over ease, because control feels safer than slowing down. A small way out is to stop one step earlier than you usually do and leave one thing intentionally unpolished.",
   "chat_fear_note": "Under the fatigue sits a very clear fear: if you stop, you’ll fall behind. That fear makes sense, because it sounds like you’ve learned to equate pause with loss. What it really points to is a wish to stay safe, keep pace, and not disappear inside the gap between tasks.",
   "psychology_fact_heading": "Job Demands–Resources model",
   "psychology_fact_body": "The Job Demands–Resources model says burnout grows when demands keep rising while resources stay too small to balance them. In your case, the demands are visible in the re-checking, the Monday-morning messages, and the cram-then-crash rhythm, while recovery time and felt relief stay low. That is why the problem is not simply that you work hard; it is that the work keeps taking more than it gives back. The model fits your pattern because it explains why effort alone does not solve the exhaustion.",
   "psychology_takeaway": "The issue is not that you can’t finish; it’s that finishing has become expensive. Your system needs more return, not more force.",
   "strengths": [
    {
     "title": "Steady endurance",
     "body": "You keep going when the work is heavy, and that is not a small thing. Your chart shows a strong Earth center, which matches the way you stay standing even after the pressure of the day has already started to wear you down. In practice, that looks like finishing what you started, even when no one is watching."
    },
    {
     "title": "Quality care",
     "body": "Your 82% perfectionism is not just a source of strain; it is also the reason you notice what others might miss. You go back and check because you care about the result, and that care has real value in work that depends on precision. The strength inside it is a sharp sense that details matter."
    },
    {
     "title": "Responsibility sense",
     "body": "You seem to carry responsibility as something real, not theoretical. That shows up in the way Monday-morning messages can pull you back in so quickly, because you already feel answerable before anyone asks twice. The strength here is reliability: people can count on you to take things seriously."
    },
    {
     "title": "Alert awareness",
     "body": "Your low recovery score does not mean you are careless; it means your system stays alert even when the day is supposed to end. That alertness helps you catch problems early and stay ready under pressure. It is a form of watchfulness that has probably helped you a lot, even if it also keeps you from fully landing."
    }
   ],
   "weaknesses": [
    {
     "title": "Overchecking loop",
     "body": "You finish something, then immediately feel pulled back into it. The loop is simple: the task ends, the mind refuses to let it end, and one more check becomes a temporary promise that nothing was missed. In your day, that can turn into late-night reopening of work that was already good enough."
    },
    {
     "title": "Recovery gap",
     "body": "Your 34% recovery score shows that rest is not giving back enough to match what you spend. That is why a day off can still feel uneasy, even when nothing urgent is happening. The gap is not a lack of time; it is a lack of felt restoration."
    },
    {
     "title": "Compressed effort",
     "body": "You cram, then you crash, which means your energy is not flowing evenly across the week. The pattern is efficient in the short term, but it leaves you depleted all at once. The shape of the day becomes a sprint followed by a drop."
    },
    {
     "title": "Fear of lagging",
     "body": "The thought that stopping means falling behind keeps pressure alive even when the work is already done. That fear can make rest feel risky, so you stay half-attached to the job even when you are off the clock. It is not a flaw in character; it is a protective habit that has started to cost too much."
    }
   ],
   "fit_good": "You do better in a setting where the day has clear endpoints and the standards are written down before the work starts. A manager who gives you specific priorities, not constant surprise messages, will help your attention settle instead of staying on guard. You also need real recovery time between heavy tasks, so your finish line can actually feel like a finish line.",
   "fit_bad": "You struggle in a culture where messages arrive all weekend and every pause is treated like a risk. A loose environment with shifting priorities will keep your mind in re-check mode all day. If the day has no real stopping point, you will keep spending energy long after the work itself is done.",
   "behavior_guides": [
    {
     "title": "Close once",
     "body": "Pick one task each day and make a rule that you will close it once, then stop reopening it. Do it at a fixed time, ideally before the last hour of work, so your mind learns that completion can be trusted. If the urge to re-check returns, write the urge down instead of reopening the file."
    },
    {
     "title": "Protect recovery",
     "body": "Put a 20-minute buffer after work with no messages and no task review. Use it on weekdays, not just on days off, so recovery becomes part of the schedule instead of a reward. Keep the buffer simple: sit, walk, or eat without checking the work again."
    },
    {
     "title": "Reduce re-entry",
     "body": "Choose one boundary for Monday-morning messages, such as checking them only after a planned start time. Tell yourself the first look is enough unless a true priority appears. This keeps the work from reclaiming your whole morning before you have even started."
    },
    {
     "title": "Limit the crash",
     "body": "When you notice the cram-then-crash rhythm starting, stop the cram one step earlier than usual. Leave one small detail for the next day on purpose, so your energy does not empty all at once. The goal is not lower quality; it is a steadier ending."
    }
   ],
   "mindset_guide": "Think of your attention like a desk that never gets fully cleared. Right now, every finished task leaves one more stack on it, and that is why rest feels crowded. You do not need to empty the whole desk in one day. You need to put one folder away without reopening it. That is how your system learns that finishing is safe.",
   "closing_title": "When the task ends, let the day end too",
   "closing_body": "At age 40, Earth becomes stronger, and that 10-year cycle points toward a steadier way of carrying work. For you, that future shift would not be a dramatic rescue; it would be quieter than that, but very real, with the day feeling more contained and the weight of finishing no longer spilling into everything else. For this burnout pattern, that means the tightness can ease and the sense of being constantly on duty can soften. The line to keep is simple: you can finish without being finished by it."
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
   "title_line1": "끝난 뒤에도 계속 도는 체크리스트",
   "title_line2": "멈추지 못하는 마음이 몸보다 먼저 닳아 있어요",
   "subtitle": "모듈 3 번아웃 심층 리포트 — 사주 × 심리검사 × 상담 통합",
   "opening_scene": "밤늦게 일을 끝내고도 손이 바로 휴대폰으로 가요. 월요일 아침 메신저 알림이 떠오르면, 아직 오지 않은 일정까지 머릿속에서 먼저 정리하려고 하죠. 쉬는 날인데도 마음은 쉬는 쪽으로 잘 내려앉지 않고, 끝낸 일도 다시 처음부터 훑게 됩니다. 지수님, 요즘 이런 모습 아니세요?",
   "case_tag": "가상 사례 — 민서, 30대 초반, 기획 직무",
   "case_paragraphs": [
    "민서는 퇴근 후에도 노트북을 덮지 못하고, 보낸 메일을 다시 열어 제목부터 문장 끝까지 훑어봅니다. 쉬는 날에도 머리는 다음 주 일정표를 먼저 세우고, 몸은 소파에 있는데 마음은 이미 출근해 있어요. 사주에서도 토 기운이 강하고 수 기운이 비어 있어서, 일을 붙잡는 힘은 큰데 쉬어 주는 결이 약하게 보입니다. 당신도 같은 식으로 끝난 뒤에 더 지치는 편이죠."
   ],
   "oheng_intro": "토 50%가 우세하고 수 0%가 비어 있어요. 지수님은 내가 다루는 기운인 현실·재물·일을 붙잡는 힘이 강한 대신, 나를 살려 주는 기운인 지원·배움·보호가 비어 있는 쪽으로 보입니다. 이번 모듈의 번아웃은 바로 그 불균형이 일터에서 몸보다 먼저 마음을 마르게 만드는 장면으로 읽혀요.",
   "quiz_reading": "지수님은 완벽주의 82%가 높고 회복 34%가 낮은 완주형 소진으로 나와요. 끝낸 뒤 다시 처음부터 훑어보는 답은 일이 끝나도 점검이 멈추지 않는 마음을 그대로 보여 줍니다. 쉬는 날에도 마음이 불편하다는 감각은, 휴식이 비어 있는 시간이 아니라 긴장을 견디는 시간이 되어 버렸다는 뜻이에요.",
   "element_readings": {
    "wood": {
     "heading": "🌳 목 보통 — 끝까지 키우는 힘이 남아 있어요",
     "body": "목 33%는 지수님 안에 계속 성장시키고 싶은 마음이 꽤 분명하다는 뜻이에요. 일이 끝나도 다시 처음부터 훑어보는 습관은, 이 목 기운이 결과를 더 낫게 만들고 싶어 멈추지 않는 장면으로 보입니다. 번아웃 모듈에서는 이 힘이 책임감으로도, 과한 자기수정으로도 나타나요. 지수님은 대충 넘기는 쪽보다 끝까지 다듬는 쪽에 서 있어요."
    },
    "fire": {
     "heading": "🔥 화 약하다 — 바로 타오르는 체력은 적어요",
     "body": "화 0%는 지수님이 시작할 때의 열기보다, 이미 오래 써서 소진된 뒤의 피로를 더 먼저 느끼기 쉬운 구성으로 보여요. 월요일 아침 메신저 알림이 긴장을 다시 켠다는 점은, 일이 붙는 순간보다 일이 끝난 뒤에도 긴장이 오래 남는 쪽에 가깝다는 뜻으로 읽을 수 있어요. 지수님은 순간적으로 확 달아오르기보다, 오래 붙들다가 한 번에 지치는 패턴이 더 잘 보입니다."
    },
    "earth": {
     "heading": "⛰️ 토 강하다 — 일을 손에서 놓지 않는 힘이에요",
     "body": "토 50%는 지수님이 현실을 붙들고 책임을 묵직하게 가져가는 힘으로 드러나요. 몰아서 하고 무너지기 패턴은 이 토 기운이 일을 쌓아두었다가 한꺼번에 처리하려는 방식과 닮아 있습니다. 마감이 가까워질수록 더 버티고, 버티는 동안에는 자신도 모르게 기준이 더 높아져요."
    },
    "metal": {
     "heading": "💎 금 보통 — 점검하고 정리하는 감각이 있어요",
     "body": "금 17%는 끝난 일을 다시 훑어보는 습관으로 아주 선명하게 보입니다. 이 감각은 흐트러진 걸 다시 맞추고, 놓친 부분을 찾아내는 힘이 있어요. 다만 번아웃 모듈에서는 그 정리가 휴식으로 이어지지 않고, 점검이 또 다른 업무처럼 이어질 수 있습니다. 지수님은 정돈을 잘하지만, 그 정돈이 자꾸 끝나지 않아요."
    },
    "water": {
     "heading": "💧 수 약하다 — 쉬게 해 주는 통로가 비어 있어요",
     "body": "수 0%는 지수님에게 쉬는 시간이 곧바로 회복으로 이어지기 어렵다는 점을 보여 줘요. 오행의 흐름에서는 금이 수를 생하게 하는데, 지금은 그 도움을 받아 회복으로 넘어가는 길이 잘 쓰이지 못하는 상태로 읽혀요. 쉬어도 마음이 불편하다는 말은, 몸은 멈춰도 마음이 안심으로 내려오지 않는 상태를 잘 보여 줍니다. 지수님은 쉬는 법이 없는 게 아니라, 쉬어도 편안함으로 이어지는 길이 막혀 있어요."
    }
   },
   "upcoming_period_preview_heading": "36세부터, 수의 계절이 열립니다",
   "upcoming_period_preview_body": "36세부터 45세까지는 수 기운이 강해지는 시기가 시작돼요. 지금까지는 일을 붙잡는 힘이 먼저 앞섰다면, 그 다음 장에서는 지수님을 살려 주는 기운이 전면에 들어옵니다. 공기가 한 번 식고, 오래 달리던 속도가 잠깐 낮아지는 장면처럼 느껴질 거예요.",
   "module_map": {
    "title": "에너지 수지표",
    "body": "지수님은 일의 양이 줄기보다 점검의 양이 늘어날 때 더 빨리 비어 가요. 완벽주의 82%는 요구를 스스로 더 키우는 쪽으로 작동하고, 회복 34%는 자원을 바로 채워 주지 못해요. 그래서 겉으로는 잘 해내는데 안쪽에서는 소진이 먼저 쌓이고, 효능감은 뒤늦게 따라옵니다. 이 리포트는 그 균형이 어디서 기울었는지 보여 주는 지도예요."
   },
   "module_deep": {
    "title": "다시 채우는 순서",
    "body": "지수님은 먼저 점검을 내려놓아야 해요. 일을 끝낸 뒤 다시 처음부터 훑는 습관을 하루에 한 번만 멈추고, 그 자리에 10분짜리 비점검 시간을 넣어 주세요. 다음으로는 자원을 채워야 해요. 월요일 아침 알림처럼 긴장을 켜는 시작 앞에, 물 한 컵이나 짧은 메모처럼 몸이 먼저 안심하는 신호를 붙여 두는 거예요. 마지막으로는 회복을 일정에 넣어야 해요. 쉬는 날에도 마음이 불편한 지수님은, 쉬는 시간을 비워 두면 계속 일로 바뀌기 때문에, 끝난 뒤 바로 할 수 있는 아주 작은 마무리 동작을 정해 두는 편이 맞아요."
   },
   "upcoming_period_heading": "36세부터 시작되는 다음 장",
   "upcoming_period_body": "36세부터 45세까지는 지수님에게 수가 강해지는 흐름이라, 일만 밀어붙이던 방식이 그대로 유지되지 않아요. 그 시기에는 점검보다 숨 고르기가 더 중요해지고, 혼자 버티는 구조보다 도움을 받는 구조가 자연스럽게 보입니다. 지금부터는 일의 양을 늘리는 것보다, 회복이 들어올 자리를 남겨 두는 쪽이 훨씬 중요해요. 그래서 36세 이후의 하루는 끝난 일을 다시 훑는 밤보다, 덜 긴장한 상태로 다음 일을 여는 쪽에 가까워집니다.",
   "cross_analysis_quotes": [
    "토 50%는 지수님이 일을 끝까지 붙드는 힘이에요. 완벽주의 82%와 정확히 맞물리면서, 끝낸 뒤에도 다시 처음부터 훑게 만듭니다. 그래서 겉으로는 성실한데 안쪽에서는 소진이 먼저 쌓여요.",
    "수 0%는 회복 34%와 같은 방향을 보고 있어요. 쉬는 날에도 마음이 불편하다는 답은, 쉬는 시간이 자원으로 바뀌지 못하고 긴장으로 남는다는 뜻입니다. 지수님은 쉬고 있는데도 계속 일하고 있는 것처럼 느껴질 때가 많아요."
   ],
   "answer_notes": [
    "다시 처음부터 훑어본다는 답은 지수님이 결과보다 오류 가능성을 먼저 보는 사람이라는 뜻이에요. 그래서 일이 끝나도 머릿속에서는 점검이 계속 이어집니다. 지수님, 완성보다 확인이 먼저 앞설 때가 있죠.",
    "쉬어도 마음이 불편하다는 답은 지수님에게 휴식이 단순한 멈춤이 아니라 낯선 상태라는 뜻이에요. 그래서 쉬는 날에도 몸은 멈춰도 마음은 계속 일의 자리를 지키고 있습니다. 지수님, 편히 쉬는 것 자체가 생각보다 큰 과제였던 거예요."
   ],
   "chat_snapshot_note": "지수님은 핵심 고민으로 쉬어도 쉬는 것 같지 않다고 말했어요. 그 말 뒤에는 지쳤고 조금 불안한 감정이 붙어 있어서, 멈추는 순간에도 마음이 바로 안심하지 못하는 상태가 보입니다. 남기고 싶은 문장은 이거예요: 쉬는 시간까지 일처럼 느껴질 때, 이미 너무 오래 버틴 거예요.",
   "chat_trigger_note": "월요일 아침 메신저 알림은 지수님에게 단순한 알림이 아니에요. 그 한 번의 소리가 아직 끝나지 않은 책임을 다시 켜고, 불안한 마음을 바로 작업 모드로 돌려놓습니다. 완벽주의 82%와 토 50%가 그 자극을 크게 받쳐 주고 있어요.",
   "chat_repeat_note": "몰아서 하고 무너지기 패턴은 지수님이 평소에는 계속 쌓아 두다가, 어느 순간 한 번에 쏟아내는 방식이에요. 그 안에서 지수님은 쉬는 시간을 먼저 쓰기보다 버틸 수 있을 때까지 버티는 쪽을 고릅니다. 아주 작은 방법은 중간 점검을 마감 직전이 아니라 하루 안쪽에 한 번만 넣어 두는 거예요.",
   "chat_fear_note": "뒤처질까 봐 멈출 수 없다는 두려움은 게으름이 아니라 책임감에 가까워요. 지수님은 멈추면 놓치는 것보다, 멈추지 않아서 지키는 것을 더 크게 보고 있습니다. 그 아래에는 뒤처지지 않고 제 몫을 해내고 싶은 마음이 분명히 있어요.",
   "psychology_fact_heading": "직무 요구-자원 모델",
   "psychology_fact_body": "이 모델은 일이 요구하는 양과 감정적 압박이 크고, 자율성·인정·회복 시간 같은 자원이 부족할 때 소진이 커진다고 봐요. 지수님의 경우 완벽주의 82%가 요구를 스스로 키우는 쪽으로 작동하고, 회복 34%는 자원을 채우는 속도가 낮게 나타납니다. 그래서 끝까지 해내는 모습 뒤에서 먼저 닳는 것은 의지가 아니라 여유예요. 이 관점은 지수님이 왜 쉬어도 쉬는 것 같지 않은지 정확히 설명해 줍니다.",
   "psychology_takeaway": "일을 더 잘하는 힘이, 쉬는 힘까지 대신해 주지는 않아요. 지수님은 지금 완성보다 회복의 자리를 먼저 알아봐야 해요.",
   "strengths": [
    {
     "title": "책임감",
     "body": "지수님은 토 50%답게 일을 손에서 놓지 않는 힘이 있어요. 실제로도 끝낸 뒤 다시 처음부터 훑어보는 답에서, 결과를 대충 넘기지 않으려는 태도가 분명하게 보입니다. 번아웃 모듈에서는 이 힘이 지수님을 오래 버티게 해 주는 버팀목이 돼요."
    },
    {
     "title": "정리 감각",
     "body": "금 17%는 놓친 부분을 다시 찾아내고, 흐트러진 걸 정리하는 감각으로 나타나요. 지수님은 메일을 보낸 뒤에도 문장과 흐름을 다시 보는 사람이고, 그 세심함이 일의 완성도를 올립니다. 다만 이 감각이 과해지면 휴식까지 점검 목록으로 바꿔 버릴 수 있어요."
    },
    {
     "title": "지속력",
     "body": "목 33%는 지수님이 한 번 마음먹은 일을 끝까지 키워 가는 힘이에요. 몰아서 하고 무너지는 패턴 속에서도, 그 전에 오래 참고 버티는 시간이 길다는 뜻이기도 합니다. 이 지속력은 소진을 만들기도 하지만, 동시에 쉽게 놓지 않는 장점이기도 해요."
    },
    {
     "title": "경계 감지",
     "body": "수 0%처럼 회복 기운이 약하게 보일 때는, 쉬어도 마음이 편해지지 않는 신호를 스스로 알아차리기 쉽지 않아요. 지수님이 쉬어도 마음이 불편하다고 느끼는 건, 이미 회복이 잘 안 붙는 상태를 몸과 마음이 함께 알려 주는 신호예요. 그 감각을 놓치지 않는 것이 지금부터 속도를 조절할 실마리가 됩니다."
    }
   ],
   "weaknesses": [
    {
     "title": "과점검",
     "body": "완벽주의 82%는 일이 끝난 뒤에도 다시 처음부터 훑어보게 만들어, 휴식이 늦어지게 해요. 이미 해낸 일보다 아직 못 찾은 흠집이 더 크게 보이기 쉬워서, 확인이 길어질수록 마음은 더 지치고 몸은 더 쉬지 못합니다. 지수님은 확인으로 안심하려 하지만, 그 확인이 오히려 피로를 키워요."
    },
    {
     "title": "회복 저하",
     "body": "회복 34%는 쉬는 날을 보내도 마음이 바로 풀리지 않는 상태로 드러나요. 몸은 멈췄는데 머릿속은 여전히 일정과 책임을 붙들고 있어서, 쉬는 시간이 자원이 되지 못합니다. 지수님에게는 휴식이 양이 아니라 질의 문제예요."
    },
    {
     "title": "몰아 처리",
     "body": "몰아서 하고 무너지기 패턴은 평소에는 참고 쌓다가 한 번에 쏟는 흐름이에요. 그 사이에 지수님은 일을 미루는 게 아니라 계속 품고 있기 때문에, 겉보기보다 더 많이 소모됩니다. 아주 짧게라도 중간에 끊어 두는 시간이 필요해요."
    },
    {
     "title": "불안 점화",
     "body": "월요일 아침 메신저 알림은 지수님에게 불안을 바로 켜는 스위치처럼 작동해요. 그 순간부터 아직 오지 않은 일까지 먼저 떠올라서, 몸보다 마음이 먼저 긴장합니다. 지수님은 시작보다 예고에 더 많이 흔들리는 편이에요."
    }
   ],
   "fit_good": "지수님에게 맞는 환경은 끝난 일을 바로 재점검하게 만들지 않는 자리예요. 하루에 해야 할 범위가 또렷하고, 중간 확인이 짧게 허용되는 팀에서 지수님은 훨씬 덜 닳습니다. 퇴근 후에도 메신저가 계속 울리지 않는 구조면, 지수님은 같은 일도 더 오래 안정적으로 해낼 수 있어요.",
   "fit_bad": "지수님에게 맞지 않는 환경은 모든 일이 급하게 몰리고, 알림이 끊이지 않는 자리예요. 매번 월요일 아침처럼 긴장을 다시 켜는 구조에서는 완벽주의가 더 세게 달리고 회복은 더 늦어집니다. 끝난 뒤에도 바로 다음 확인이 붙는 방식은 지수님을 빠르게 비워요.",
   "behavior_guides": [
    {
     "title": "점검 제한",
     "body": "일이 끝난 뒤 다시 보는 시간은 10분으로만 정해 두세요. 퇴근 후 한 번 보고, 다음 확인은 다음 날 시작 전에 한 번만 하면 충분해요. 그 사이에는 메신저 알림을 열지 않는 규칙을 붙여 두면 좋아요."
    },
    {
     "title": "알림 거리두기",
     "body": "월요일 아침에는 첫 30분만 알림을 꺼 두세요. 그 시간에 해야 할 일 3개만 적고, 나머지는 열지 말고 남겨 두세요. 지수님은 시작을 조용하게 열어야 덜 무너져요."
    },
    {
     "title": "회복 예약",
     "body": "쉬는 날에는 회복을 따로 예약해 두세요. 점심 뒤 20분, 저녁 뒤 15분처럼 짧게 끊어도 괜찮아요. 중요한 건 오래 쉬는 게 아니라, 쉬는 동안 마음이 불편해지기 전에 먼저 멈춰 주는 거예요."
    },
    {
     "title": "마감 분리",
     "body": "한 번에 몰아서 처리해야 할 일을 오전과 오후로 나눠 보세요. 각 구간이 끝날 때마다 손에서 일을 내려놓는 동작을 하나 정해 두세요. 지수님은 끝을 분리할수록 덜 무너집니다."
    }
   ],
   "mindset_guide": "번아웃은 불이 너무 커서 생기는 게 아니라, 꺼질 틈이 없어서 길어지는 거예요. 지수님은 계속 켜 두는 스위치가 아니라, 중간에 잠깐 내려오는 차단기를 배워야 해요. 쉬는 날이 불편한 건 의지가 약해서가 아니라, 몸이 아직 안심 신호를 못 받았기 때문이에요. 그러니 목표는 더 버티는 것이 아니라, 덜 닳는 방식으로 일하는 거예요.",
   "closing_title": "지치지 않게 끝내는 법",
   "closing_body": "36세부터 45세까지 수 기운이 강해지면, 지수님은 일을 붙잡는 힘만으로 버티던 구조에서 조금 벗어나게 돼요. 그때는 끝난 뒤에도 계속 점검하는 밤보다, 다음 날을 덜 긴장한 얼굴로 여는 아침이 더 자주 옵니다. 번아웃 모듈에서 이 변화는 거창한 반전이 아니라, 무겁던 느낌이 조금씩 가벼워지는 쪽으로 나타나요. 지수님, 오늘의 지침은 더 달리기가 아니라 덜 닳으면서도 충분히 해내는 쪽이에요."
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
  "title": "2027, your steady fire",
  "subtitle": "A year of momentum, careful focus, and timely support",
  "overview": "In 2027, the year’s Fire energy meets your Water core in a way that can feel active, productive, and a little demanding. Because your chart is already rich in Earth and Metal, with very little Wood, this can be a year where structure, timing, and clear priorities matter more than trying to do everything at once. Jordan, the good news is that Fire is not just pressure here — it can also be a useful force for shaping results, especially when you choose your targets carefully.\n\nThe overall pattern leans toward initiative, visible effort, and a stronger pull toward results than usual. Early in the year, the tone feels familiar and easy to settle into; midyear asks for more output and better pacing; late summer brings responsibility and a need to read the room carefully; autumn offers support, learning, and a chance to recover strength. The 10-year cycle ahead, from age 31 to 40, brings stronger Fire energy, which means 2027 can feel like a quiet preview of a future phase that rewards courage, focus, and better use of your energy.",
  "chapters": {
   "wealth": {
    "heading": "Money moves with intent",
    "body": "In 2027, money matters look more tied to initiative than to waiting for luck. Since the year’s Fire energy is something you can direct, this can be a useful time for making plans, pricing your work clearly, and noticing where your effort turns into visible value. With so much Earth and Metal in your chart, you may already have a practical sense of what is solid; 2027 asks you to use that sense without becoming overly cautious.\n\nIn daily life, this can show up as a month where a side project suddenly feels worth organizing, a payment conversation needs cleaner wording, or you realize that one recurring expense deserves a simpler system. The middle of the year especially can tempt you to push for more than you need, so it helps to keep your goals specific rather than broad and dramatic.\n\nA good first step is to choose one financial area to make cleaner in 2027: one budget line, one pricing rule, or one savings habit. If you keep the process simple and measurable, you’ll probably feel more in control without having to force outcomes."
   },
   "love": {
    "heading": "Connection needs pacing",
    "body": "Relationships in 2027 may feel warmer, more active, and a little less automatic than usual. The year encourages you to show care through action, but it also asks you to avoid overextending yourself just to keep things moving. Because your chart has a strong ordered quality, you may prefer clarity and consistency over emotional drama, and 2027 tends to reward that preference.\n\nYou might notice that some conversations feel easier when they are direct and practical, while vague signals can become tiring. Late summer, in particular, can bring situations where you need to slow down and read what is really being said before reacting. That doesn’t mean the connection is fragile; it just means timing and tone matter more than speed.\n\nTry starting with one honest, low-pressure check-in instead of a big emotional declaration. A simple message, a clear plan, or a thoughtful question can do more for closeness in 2027 than trying to force a perfect moment."
   },
   "career": {
    "heading": "Work rewards clean focus",
    "body": "Career-wise, 2027 looks like a year where initiative can turn into visible progress if you keep your scope tight. Fire energy can help you lead, produce, and get things moving, but because it’s also a year you can dominate, the main risk is pushing too hard or taking on too many goals at once. Your Water core is adaptable, so your advantage is not brute force — it’s timing, judgment, and knowing when to act.\n\nThis may show up as a period where your work becomes more public, your output is more noticeable, or you’re asked to take responsibility for something that needs a steady hand. Around late summer, you may need to be especially careful about assumptions, because a small misread can create extra work. The good news is that autumn brings support and momentum for recovery, learning, and better coordination.\n\nA strong move in 2027 is to define success before you start. Pick one main result for a project, one person to clarify details with, and one point where you’ll stop polishing and deliver."
   },
   "study": {
    "heading": "Learning deepens through use",
    "body": "Learning in 2027 is less about collecting new ideas and more about turning what you already know into something usable. Your chart’s strong Earth and Metal can help you organize, refine, and remember, while the year’s Fire energy adds urgency and application. That combination often works best when you study with a purpose, not just for the sake of accumulation.\n\nYou may find that classes, reading, or skill-building feel most satisfying when they connect to a real project or practical need. Midyear can bring a burst of output, while autumn is better for receiving guidance, revisiting notes, and letting understanding settle. If you try to learn too many unrelated things at once, the energy can scatter; if you focus, the gains can be surprisingly durable.\n\nStart with one topic you can apply within a month. Short, repeated sessions will probably serve you better than dramatic study marathons, especially when you want the knowledge to stick."
   },
   "health": {
    "heading": "Protect your rhythm",
    "body": "For body and mind, 2027 favors rhythm over intensity. Fire can make days feel busy and charged, while your Water core does best when it has room to recover, reflect, and reset. The balance to aim for is not perfect calm, but a pace that lets you stay present without running yourself dry.\n\nIn ordinary life, this can look like feeling fine when your schedule is clear, then getting drained when too many commitments stack up. Late summer may feel especially sensitive to timing, so it helps to build in pauses before you need them. Your ordered nature can be a real asset here: simple routines, clean transitions, and a consistent sleep-wind-down pattern are likely to help more than big lifestyle overhauls.\n\nChoose one daily anchor you can keep almost no matter what — a walk, a quiet first hour, or a fixed evening reset. Small regularity will probably do more for you in 2027 than trying to be productive all the time."
   }
  },
  "months": [
   {
    "headline": "Gentle re-entry",
    "body": "February feels familiar in a good way: easy to settle into, with a few unexpected turns that keep things from becoming dull. You may want to trust what already works and let newness arrive in small doses. A light, flexible start can set the tone without asking for too much."
   },
   {
    "headline": "Warm momentum",
    "body": "March keeps the same easy current, but with a little more movement and a few points of friction. The month may feel like something is waking up, though not yet fully formed. If you keep your expectations realistic, the pace can feel encouraging rather than messy."
   },
   {
    "headline": "Energy outflow",
    "body": "April leans toward expression, output, and giving more of yourself to the world. That can feel productive, but it can also leave you more tired than you expected if you say yes too quickly. It helps to choose where your energy goes instead of letting it leak everywhere."
   },
   {
    "headline": "Fresh ground",
    "body": "May has a more open, beginning-like quality, as if something is taking shape beneath the surface. You may notice a stronger urge to build, create, or plant a new idea. Starting small makes this month feel promising instead of overwhelming."
   },
   {
    "headline": "Steady leverage",
    "body": "June brings a more decisive mood, with a stronger sense that results can be pushed forward. Because the month favors action and attraction, it can be a good time to notice what responds well to your effort. Just keep the pressure measured so ambition stays useful."
   },
   {
    "headline": "Quiet storage",
    "body": "July feels more contained, as if progress is being held rather than displayed. The tone suits patience, preparation, and a quieter kind of persistence. If you let things ripen without forcing them, you may discover that less visible work still matters a lot."
   },
   {
    "headline": "Careful reading",
    "body": "August asks for sharper attention, especially because responsibility and pressure can rise at the same time. Since the month also brings a sense of close connection, what you say and how you say it may matter more than usual. Slower reactions and better listening can keep the month smooth."
   },
   {
    "headline": "Measured authority",
    "body": "September keeps the weight of duty in view, but with a slightly more settled tone. You may feel called to take charge, yet the best version of that energy is calm and precise rather than forceful. Choosing your pace carefully can make the month feel sturdier."
   },
   {
    "headline": "Support returns",
    "body": "October brings help, learning, and a chance to restore what has been stretched. Guidance may come more easily, and you may feel more able to absorb it. This is a good month to accept assistance without treating it as a weakness."
   },
   {
    "headline": "Move and pivot",
    "body": "November can feel active and disruptive in a useful way, with movement that opens a new angle. Because the month also carries a sense of collision, plans may need quick adjustments. If you stay adaptable, the shift can work in your favor."
   },
   {
    "headline": "Soft peaks",
    "body": "December returns to a familiar, steady tone, though small hiccups may appear. The month can feel productive without being especially adventurous, which may suit your need for order. A little extra patience with details will keep things from feeling rough."
   },
   {
    "headline": "Inner momentum",
    "body": "January closes the cycle with a quiet, inward-facing energy that still has movement underneath. It may be easier to sort out your own thoughts than to push outward aggressively. This is a good time to notice what you’ve learned and carry it forward gently."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: find your pace",
    "body": "Watch for the early-year feeling of ease turning into output and slight friction. A good action is to set one weekly priority and protect one block of quiet time so your energy doesn’t scatter as the month grows busier."
   },
   {
    "title": "May to July: build with restraint",
    "body": "Notice where effort starts producing real results, and where enthusiasm starts to overextend you. Try one project boundary: define what “done” looks like before you begin, then stop adding extras once you reach it."
   },
   {
    "title": "August to October: read before you react",
    "body": "Pay attention to the months that ask for careful interpretation, then later offer support and recovery. Make one habit of checking assumptions twice, and let yourself accept advice or help sooner than you normally would."
   },
   {
    "title": "November to January: adapt and absorb",
    "body": "Track the movement, turns, and quieter consolidation that close the year. Choose one review ritual — notes, calendar cleanup, or a short monthly reflection — so you can capture what changed instead of carrying it vaguely into the next phase."
   }
  ],
  "closing": "From age 31 to 40, Fire energy becomes stronger in your 10-year cycle, and that marks a real shift into a more active chapter. In 2027, you’re getting a preview of that future rhythm: not by rushing, but by learning how to direct energy cleanly, pace yourself well, and let the right things grow. If you treat the year as a place to practice focus, Jordan, it can leave you better prepared for what comes next."
 },
 "casey": {
  "year": 2027,
  "title": "2027, ritmo y temple",
  "subtitle": "Un año para afinar tu fuerza sin perder el pulso",
  "overview": "En 2027, Casey, tu mapa se mueve con una mezcla muy clara: tienes metal muy presente, madera también alta y agua en cero. Eso habla de una persona con estructura, criterio y capacidad de sostener ritmo, pero que en este año se beneficia de poner más atención a la flexibilidad, a escuchar el entorno y a no querer resolver todo por pura fuerza. Como el fuego de 2027 te pone a prueba y te pule, el aprendizaje no va tanto de empujar más como de elegir bien el ritmo.\n\nLa primera mitad del año tiende a pedirte producción, visibilidad y movimiento: habrá momentos en que dar, crear y responder ocupe mucho espacio. Después, entre mitad y final de año, la energía se vuelve más exigente y luego más nutritiva: primero te pide firmeza y orden, luego te devuelve apoyo, aprendizaje y recuperación. En un tipo de mapa como el tuyo, el equilibrio suele aparecer cuando no intentas hacerlo todo a la vez; en 2027, avanzar con método te conviene más que correr. Si respetas tus pausas, el año puede dejarte una sensación de solidez muy útil para los siguientes pasos.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con pulso",
    "body": "En 2027, el dinero se relaciona contigo de una forma activa: hay tramos en los que puedes empujar resultados, tomar iniciativa y mover recursos con más decisión. Como tu mapa tiene mucha madera y mucho metal, el tema no es tanto la falta de capacidad como el riesgo de querer abrir demasiadas puertas al mismo tiempo. Cuando el fuego del año entra en escena, la ambición se enciende; bien usada, te ayuda a convertir esfuerzo en algo visible.\n\nEn la vida diaria, esto puede verse en encargos que crecen, tareas que te piden más presencia o decisiones en las que conviene revisar números con calma antes de seguir. Puede que notes momentos de abundancia de ideas y otros en los que el gasto de energía sea alto, así que te vendrá bien distinguir entre oportunidad real y simple impulso. También habrá ventanas en las que una propuesta o un recurso se acerquen con más facilidad, sobre todo si ya dejaste algo bien armado antes.\n\nEmpieza por una regla sencilla: antes de comprometerte, mira si el esfuerzo que pide encaja con el tiempo que tienes. Si ordenas prioridades y dejas un margen para imprevistos, 2027 se vuelve más amable contigo y menos disperso."
   },
   "love": {
    "heading": "Vínculos en movimiento",
    "body": "En 2027, tus vínculos tienden a moverse con más intensidad emocional y con cambios de ritmo que te invitan a estar presente. Hay meses en los que expresar lo que piensas o das a los demás puede abrir mucho, pero también gastar bastante energía. Como tu agua es cero en los Cinco Elementos, te conviene poner palabras a lo que sientes sin esperar a que todo se ordene solo por dentro.\n\nEn situaciones concretas, esto puede aparecer como conversaciones más directas, ganas de acercarte a personas que te inspiran o necesidad de aclarar expectativas para no cargar con supuestos. También puede haber encuentros que te sacan de la rutina y te hacen mirar una relación con ojos nuevos, sobre todo cuando el año te empuja a moverte. La clave no es forzar cercanía, sino dejar que el contacto tenga espacio real para respirar.\n\nPrueba con gestos pequeños: una frase clara, una invitación sencilla, una escucha sin prisa. Si haces sitio para el intercambio sin intentar controlarlo todo, tus relaciones pueden ganar naturalidad y menos tensión."
   },
   "career": {
    "heading": "Trabajo con firmeza",
    "body": "En 2027, tu carrera se beneficia de una mezcla interesante: hay etapas para producir, otras para sostener presión y otras para recibir apoyo. Tu perfil de acero y cosecha sugiere que sabes construir sobre lo ya hecho, y este año esa cualidad cobra valor cuando el fuego te pide responder con rapidez y criterio. No se trata de correr más, sino de mostrar consistencia en lo que haces.\n\nEn el día a día, esto puede verse en responsabilidades que aumentan, decisiones que te exigen más precisión o momentos en los que conviene terminar bien lo que ya está en marcha antes de abrir algo nuevo. También habrá fases en las que la confianza sube y te resulta más fácil ocupar tu lugar, aunque con algún giro inesperado que te obligue a ajustar el plan. Si mantienes el foco, esos cambios pueden volverse útiles en vez de agotadores.\n\nHazte el hábito de revisar una cosa por vez y de cerrar asuntos pendientes antes de sumar más. En 2027, una presencia constante vale más que una aceleración breve."
   },
   "study": {
    "heading": "Aprender con calma",
    "body": "En 2027, el aprendizaje entra por dos vías: por el esfuerzo que haces para sostener el ritmo y por la ayuda que recibes cuando aflojas un poco el control. Tu combinación de metal y madera ya habla de mente activa, pero el cero en agua sugiere que te conviene dejar más espacio a la pausa reflexiva, no solo al rendimiento. Cuando estudias o te formas desde la presión, puedes avanzar; cuando añades recuperación, retienes mejor.\n\nEn la práctica, esto puede sentirse como semanas de mucha producción mental seguidas de otras en las que una idea se asienta por fin. Puede que te convenga aprender con ejemplos, esquemas o procesos cortos, en lugar de intentar absorberlo todo de una vez. También es un año bueno para revisar lo que ya sabes y darle forma útil, porque el fuego favorece mostrar, explicar y compartir.\n\nEmpieza por bloques pequeños y repetibles. Si alternas práctica y descanso mental, el aprendizaje se vuelve más claro y menos pesado."
   },
   "health": {
    "heading": "Cuidar el ritmo",
    "body": "En 2027, el cuidado de tu cuerpo y tu mente pasa por el ritmo más que por la intensidad. El fuego del año puede hacerte sentir con más impulso en algunos momentos y con más sensibilidad en otros, así que te conviene observar cuándo estás funcionando por inercia y cuándo de verdad te conviene seguir. Tu mapa, muy fuerte en metal y madera, agradece la disciplina; aun así, en este año la disciplina funciona mejor si incluye pausas.\n\nEn la vida cotidiana, eso puede verse en días muy productivos seguidos por otros en los que notas que necesitas ordenar el espacio, bajar estímulos o simplificar planes. También puede haber momentos de mucha confianza y otros de pequeños contratiempos, así que te ayudará no llenar cada hueco del día. Dormir a horas parecidas, comer con regularidad y dejar un tramo de silencio pueden hacer más por ti que un esfuerzo extra.\n\nPrueba a revisar tu semana con una pregunta simple: qué te da energía y qué te la quita. Si ajustas el ritmo antes de llegar al límite, 2027 se vuelve mucho más llevadero."
   }
  },
  "months": [
   {
    "headline": "Cierre que se mueve",
    "body": "En febrero de 2027, la energía te empuja a cerrar una etapa mientras te pone más en movimiento. Puede sentirse como una mezcla de ganas de actuar y necesidad de soltar algo que ya terminó su ciclo. Si aceptas ese cambio de dirección, el mes te deja más liviandad para lo que viene."
   },
   {
    "headline": "Siembra discreta",
    "body": "En marzo de 2027, todo avanza como una semilla: despacio, con potencial y sin demasiado ruido. Los pequeños contratiempos te piden paciencia, no dramatismo. Conviene revisar detalles y dejar que lo nuevo arraigue antes de exigirle resultados."
   },
   {
    "headline": "Empuje silencioso",
    "body": "En abril de 2027, el foco va hacia tomar la iniciativa y mover recursos con más decisión. El crecimiento se ve por dentro antes de volverse visible, así que te sirve trabajar con discreción. Si evitas el exceso, puedes avanzar con mucha más precisión."
   },
   {
    "headline": "Alianzas útiles",
    "body": "En mayo de 2027, las cosas tienden a unirse con facilidad y eso puede ayudarte a concretar. También conviene mirar con cuidado cómo administras lo que tienes, porque el mes pide atención a los recursos. Lo que se conecta ahora puede dejar una base muy práctica."
   },
   {
    "headline": "Presión que forma",
    "body": "En junio de 2027, el año te exige más responsabilidad y eso puede activar fricción si te aceleras. Las emociones salen con más fuerza, así que conviene responder con pausa. Si eliges bien el ritmo, la presión termina fortaleciendo tu criterio."
   },
   {
    "headline": "Confianza en marcha",
    "body": "En julio de 2027, la confianza sube y eso te ayuda a sostener lo que llevas entre manos. También aparecen imprevistos, así que el mes pide flexibilidad sin perder el centro. Un plan con margen te funcionará mejor que uno demasiado rígido."
   },
   {
    "headline": "Fruto del esfuerzo",
    "body": "En agosto de 2027, la ayuda, el aprendizaje y la recuperación entran con más claridad. Lo que vienes sosteniendo empieza a dar fruto de un modo más visible. Un cambio de ambiente o de rutina puede venirte muy bien para recuperar aire mental."
   },
   {
    "headline": "Plenitud cercana",
    "body": "En septiembre de 2027, la energía se siente más llena y más receptiva. Puede aparecer magnetismo en tus contactos y una facilidad especial para atraer apoyo o interés. Es un mes bueno para recibir, no solo para empujar."
   },
   {
    "headline": "Paso más lento",
    "body": "En octubre de 2027, el ritmo baja y eso no te resta valor; simplemente te invita a ir con más calma. La espera puede hacerse visible, así que te conviene usarla para ordenar lo pendiente. Lo familiar pesa más que lo nuevo, y eso también tiene su utilidad."
   },
   {
    "headline": "Cuidado y tacto",
    "body": "En noviembre de 2027, el mes pide más atención a tu energía y a tu manera de hablar. Pueden aparecer malentendidos si vas demasiado rápido o si asumes demasiado. Una revisión tranquila de acuerdos y mensajes te ahorrará esfuerzos innecesarios."
   },
   {
    "headline": "Liderazgo sereno",
    "body": "En diciembre de 2027, tu capacidad de expresar, producir y sostener a otros gana presencia. Es un tramo que puede pedirte ordenar lo acumulado y asumir un papel más visible. Si lideras con claridad y sin exceso, el mes te responde mejor."
   },
   {
    "headline": "Reconocimiento interno",
    "body": "En enero de 2028, la energía se recoge y te invita a mirar lo hecho con más quietud. El reconocimiento llega de una forma más discreta, como una confirmación de lo que ya construiste. Te conviene cerrar el ciclo con orden para entrar en lo que sigue con la mente despejada."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vigila cómo te afecta el impulso de empezar cosas nuevas mientras todavía cierras asuntos viejos. Te conviene probar una práctica concreta: elegir solo tres prioridades por semana y dejar por escrito qué no vas a tocar todavía."
   },
   {
    "title": "De mayo a julio",
    "body": "Observa dónde se concentra la presión y en qué momentos quieres resolverlo todo de golpe. Prueba a dividir cada tarea importante en dos pasos: uno para decidir y otro para ejecutar, dejando una pausa breve entre ambos."
   },
   {
    "title": "De agosto a octubre",
    "body": "Mira qué apoyo, aprendizaje o descanso te llega cuando bajas un poco la exigencia. Haz espacio para revisar tu rutina y reserva un tramo fijo para leer, ordenar ideas o cambiar de ambiente sin llenar ese tiempo con más compromisos."
   },
   {
    "title": "De noviembre a enero",
    "body": "Atiende con cuidado la forma en que te comunicas y cómo cierras pendientes antes del siguiente tramo. Te ayudará hacer una lista corta de asuntos por terminar y revisar mensajes importantes con calma antes de enviarlos."
   }
  ],
  "closing": "A los 41 años, comienza para ti un ciclo de diez años con metal más fuerte, y ese cambio marca una etapa distinta en tu mapa. En 2027, el terreno ya te invita a templarte con método: menos prisa, más criterio y una forma de avanzar que respete tu energía real. Si sostienes ese ritmo, Casey, el año puede dejarte mejor preparado para lo que viene después."
 },
 "lucia": {
  "year": 2027,
  "title": "2027, un año que te ordena",
  "subtitle": "Lucía, un ciclo para avanzar con foco y sin exceso",
  "overview": "En 2027, tu energía de base es agua y el año llega con fuego: eso crea una relación en la que tú puedes dirigir, mover recursos y buscar resultados con más decisión. Como tu mapa combina tierra en buen peso, agua en equilibrio y madera moderada, el impulso no te pide improvisar sin rumbo, sino actuar con criterio, elegir bien dónde pones tiempo y dinero, y no confundirte entre rapidez y prisa. Tu tipo de mapa, El rocío · Orden, sugiere que te va mejor cuando hay claridad, ritmo y pequeñas decisiones bien puestas.\n\nTambién aparece un tono de recogimiento y mundo interior, así que 2027 no se siente solo como empuje hacia afuera. Hay momentos en que conviene mirar más adentro, revisar lo que de verdad quieres sostener y dejar que el año te muestre qué merece más energía. Lucía, si combinas iniciativa con pausa, puedes aprovechar un ciclo que favorece la productividad sin perder tu centro.",
  "chapters": {
   "wealth": {
    "heading": "Dinero con dirección",
    "body": "En 2027, el dinero se mueve mejor cuando tú tomas la iniciativa con intención clara. Como el fuego del año te deja conducir el ritmo, hay margen para ordenar ingresos, pedir mejores condiciones o dar forma a algo que ya venías pensando, pero sin entrar en exceso ni querer resolver todo a la vez.\n\nEn lo cotidiano, esto puede sentirse como revisar números con más frecuencia, detectar gastos que se te escapaban o notar que una decisión pequeña cambia el margen de tu mes. También puede aparecer la tentación de gastar por impulso cuando ves una oportunidad rápida. Te conviene separar deseo de conveniencia y dejar un poco de aire antes de cerrar acuerdos o compras importantes.\n\nEmpieza por una regla simple: define un objetivo concreto y una cifra límite. Si haces visible lo que entra y lo que sale, vas a notar con más facilidad dónde el año te da impulso real y dónde solo te empuja a acelerar."
   },
   "love": {
    "heading": "Vínculos con pausa y verdad",
    "body": "En relación con el afecto, 2027 mezcla cercanía con momentos de recogimiento. Eso puede hacer que busques vínculos más honestos, menos ruidosos y más útiles para tu bienestar, aunque no siempre te nazca mostrar todo de inmediato. Con tu equilibrio entre agua y tierra, te ayuda mucho decir lo que sientes con calma y sin adornarlo demasiado.\n\nEn la vida diaria, podrías notar malentendidos al inicio del año, especialmente si das por entendido algo que la otra persona no leyó igual. Más adelante, el tono cambia y se vuelve más fácil liderar conversaciones, proponer planes o marcar límites con suavidad. También puede haber un periodo en que prefieras quedarte más en tu mundo interior, y eso no es distancia fría: a veces es simplemente necesidad de ordenar lo que sientes.\n\nPrueba a hablar menos por suposición y más por claridad. Una frase breve, dicha a tiempo, puede evitar enredos y dejar espacio para vínculos más limpios."
   },
   "career": {
    "heading": "Trabajo con empuje medido",
    "body": "En lo profesional, 2027 favorece que tomes el mando de tareas, recursos o decisiones que antes quedaban a medias. Hay una combinación útil: por un lado, puedes producir más; por otro, conviene no querer abarcar demasiado, porque el mismo fuego que impulsa también puede gastar energía si no lo encauzas bien.\n\nEn el día a día, esto puede verse como más visibilidad, más responsabilidad o más necesidad de responder rápido. También puede haber un tramo en el que surjan pequeños tropiezos: detalles que obligan a corregir, demoras menores o asuntos que piden doble revisión. Si te apoyas en tu gusto por el orden, el año se vuelve más manejable y hasta más fértil.\n\nHazte amiga de la revisión corta: antes de enviar, presentar o cerrar algo, dale una segunda mirada. No hace falta ir lento en todo; basta con elegir bien en qué momento conviene acelerar y en cuál conviene afinar."
   },
   "study": {
    "heading": "Aprender con ritmo propio",
    "body": "El aprendizaje en 2027 se beneficia de un ritmo constante y de temas que te permitan construir con calma. No parece un año para saltar de una cosa a otra sin forma, sino para absorber mejor cuando hay estructura, práctica y un sentido claro de para qué estudias lo que estudias.\n\nEn la práctica, puede que te resulte más fácil aprender cuando divides el contenido en partes pequeñas o cuando estudias para aplicar algo de inmediato. También es posible que notes que tu atención cambia según el mes: a veces más impulsada por la curiosidad, otras veces más concentrada y silenciosa. Como hay poco metal en tu mapa, la claridad externa no siempre llega sola; te ayuda crear tus propios marcos.\n\nElige un método simple y repítelo durante varias semanas. Un cuaderno, una lista breve o una rutina fija pueden darte más resultados que intentar hacerlo todo de memoria."
   },
   "health": {
    "heading": "Cuidarte sin apurarte",
    "body": "Para tu bienestar cotidiano, 2027 pide un cuidado que combine movimiento y pausa. El fuego del año puede activar mucho tu día, pero tu parte de agua necesita espacios para bajar revoluciones, y tu tierra agradece hábitos que den estabilidad. No se trata de hacer más, sino de sostener mejor lo que ya haces.\n\nEn la vida diaria, esto puede sentirse como días de mucha actividad seguidos por momentos en que prefieres silencio, orden o menos estímulo. Si te exiges seguir igual en todos los tramos, te vas a sentir más dispersa; si respetas tus cambios de ritmo, el año se vuelve más amable. Dormir con regularidad, comer a horas parecidas y dejar ratos sin pantalla pueden ayudarte a no perder centro.\n\nEmpieza por una sola costumbre: una caminata breve, unos minutos de respiración o una pausa fija antes de terminar el día. Lo pequeño, en 2027, puede darte más estabilidad que cualquier gran promesa."
   }
  },
  "months": [
   {
    "headline": "Febrero sensible",
    "body": "El mes se siente cercano a tu propia base, así que puedes entrar con cierta comodidad y menos necesidad de forzar cambios. La sensibilidad está alta y, con ella, también la posibilidad de malentendidos si das por claro lo que todavía no se dijo del todo."
   },
   {
    "headline": "Marzo con iniciativa",
    "body": "Aquí vuelve una sensación familiar, pero con un empujón más visible para tomar la delantera. Es un buen momento para abrir algo pequeño, mostrar una idea o asumir un papel más activo sin esperar a que todo esté perfecto."
   },
   {
    "headline": "Abril que fecunda",
    "body": "Este mes te pide dar más de ti, producir y compartir con naturalidad. Puede sentirse como un crecimiento silencioso: haces bastante, quizá sin tanto ruido, y aun así otras personas empiezan a notar lo que aportas."
   },
   {
    "headline": "Mayo en movimiento",
    "body": "La energía se vuelve más fértil y con ganas de salir al mundo. Si canalizas bien ese impulso, puedes sembrar algo que luego tenga recorrido; si no lo ordenas, puedes terminar más dispersa de lo que querías."
   },
   {
    "headline": "Junio decisivo",
    "body": "Aquí el año te deja tomar el control con más facilidad, sobre todo en asuntos de dinero, gestión o resultados. Conviene actuar con ambición moderada: un paso firme vale más que querer resolver todo de una vez."
   },
   {
    "headline": "Julio hacia adentro",
    "body": "El tono se recoge y te invita a mirar con más atención lo que haces y por qué lo haces. Puede ser un mes muy útil para revisar prioridades, cerrar ciclos pequeños y dejar que el ruido baje un poco."
   },
   {
    "headline": "Agosto de ajuste",
    "body": "Aumentan las exigencias y la sensación de tener que sostener más de una cosa a la vez. Si ordenas recursos y eliges un ritmo razonable, puedes salir de este tramo con más solidez de la que tenías al entrar."
   },
   {
    "headline": "Septiembre de roce",
    "body": "Este mes puede traer tensiones que te obligan a cambiar de postura o de plan. No hace falta pelear con el giro: si escuchas mejor y bajas un poco la velocidad, el cambio puede dejarte en una posición más clara."
   },
   {
    "headline": "Octubre que ayuda",
    "body": "Llega un tramo más amable para recibir apoyo, aprender y recuperar energía. Puede aparecer una ayuda puntual, una idea útil o una conversación que te devuelve perspectiva; conviene dejar espacio para que eso entre."
   },
   {
    "headline": "Noviembre abierto",
    "body": "El mes trae movimiento y una sensación de aire distinto, como si algo se reorganizara alrededor tuyo. Aunque no todo avance al mismo ritmo, suele ser un buen momento para adaptarte sin resistencia y aprovechar lo que se mueve."
   },
   {
    "headline": "Diciembre fértil",
    "body": "Vuelve una energía parecida a la de tu base, pero con más fruto visible de lo que sembraste antes. Lo que sostuviste con constancia empieza a dar señales claras, y eso puede darte confianza para cerrar el año con más calma."
   },
   {
    "headline": "Enero paciente",
    "body": "El cierre del ciclo se siente más confiado y menos apurado, como si el tiempo te pidiera esperar sin ansiedad. Es un mes bueno para consolidar lo hecho y dejar que el siguiente paso madure sin forzarlo."
   }
  ],
  "action_plan": [
   {
    "title": "De febrero a abril",
    "body": "Vigila cómo se mezclan sensibilidad, iniciativa y crecimiento silencioso. En estos meses, te conviene empezar con poco, observar qué te da energía real y elegir una sola idea para desarrollarla con orden."
   },
   {
    "title": "De mayo a julio",
    "body": "Mira de cerca el impulso para producir y el deseo de tomar el mando. Haz una acción concreta: revisa un ingreso, una tarea importante o una decisión pendiente, y ponle un límite claro antes de avanzar."
   },
   {
    "title": "De agosto a octubre",
    "body": "Observa dónde aparecen presión, roce y ayuda inesperada. El gesto más útil aquí puede ser reorganizar tu semana para dejar espacio a lo esencial y pedir apoyo en vez de sostener todo sola por inercia."
   },
   {
    "title": "De noviembre a enero",
    "body": "Atiende el tramo más receptivo y lento del ciclo. Te irá bien cerrar pendientes, agradecer lo que sí funcionó y preparar el siguiente paso con paciencia, sin exigir resultados inmediatos."
   }
  ],
  "closing": "A los 38 años, comienza para ti un ciclo de diez años en el que el fuego gana fuerza en tu mapa, y eso marca un cambio real de fondo: la etapa que queda atrás se va cerrando mientras se abre otra con más empuje y más visibilidad. En 2027, esa transición se siente de forma práctica en tus decisiones, en tu manera de ordenar recursos y en cómo eliges dónde poner tu energía.\n\nSi te mantienes cerca de tu ritmo y no te dejas arrastrar por la prisa, 2027 puede dejarte una sensación muy valiosa: la de avanzar con más dirección, sin perder tu centro. Lucía, el año no te pide correr todo el tiempo; te pide saber cuándo empujar y cuándo recoger."
 },
 "riley": {
  "year": 2027,
  "title": "2027: your steady brightening",
  "subtitle": "A year of giving shape to what you carry",
  "overview": "In 2027, your own energy helps feed the year’s Fire, so life may feel more expressive, productive, and outward-facing than usual. For an Oak · Rooted type with a strong Wood base and no Fire in the chart, that can feel like a year where what you know, feel, and make wants a channel. It is not a quiet year in the emotional sense, but it can be a very useful one if you let your effort have a direction.\n\nBecause your chart is already rooted and Wood-heavy, the Fire tone of 2027 may ask for careful pacing. You may notice that saying yes, sharing more, or producing more comes with a real energy cost, so the win is not to do less for fear, but to choose where your effort matters. Riley, when you keep your attention on one or two meaningful tracks, the year can feel much more coherent.\n\nThere is also a subtle thread of advancement in the background, which can make 2027 feel like a year of visible movement without needing a dramatic leap. A quieter storage pattern is part of the year’s larger shape, too, so some of the best results may come from gathering, refining, and preparing rather than pushing every idea at once. In a simple way, 2027 rewards you when you let warmth, output, and timing work together.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best through focus",
    "body": "In 2027, money and results may respond well when you take the lead with clear intent rather than scattered effort. Because the year’s Fire is something you help feed, the flow around earning and achievement can feel active, but it may also ask for discipline around how much you spread yourself out. Your Wood-heavy, rooted nature can be a strength here: you know how to build, but you may need to avoid overextending the branches.\n\nA likely scene is that a few practical opportunities appear at once, and the real question becomes which one deserves your best energy. You may also notice that the middle of the year favors output, while late summer invites a more direct push on goals and resources. The challenge is not lack of potential; it is making sure your momentum stays clean instead of becoming noisy.\n\nTry setting one simple rule for 2027: before saying yes to a new project or expense, pause long enough to ask whether it helps a main goal. If it does, you can move confidently; if it does not, you may feel better keeping your energy for what has a stronger return in time, attention, or peace of mind."
   },
   "love": {
    "heading": "Connection warms and clarifies",
    "body": "Relationships in 2027 may feel more active, more visible, and more dependent on how openly you show up. Since the year’s Fire is amplified by your own nature, affection and expression can come more easily, but so can the feeling that you are the one keeping the warmth going. That makes honesty, pacing, and mutual effort especially important.\n\nYou might find that some people seem easier to reach in spring and early summer, while later in the year you prefer clearer boundaries and more direct conversations. A rooted Oak type often prefers steady trust over flashy change, so 2027 may be best when you let connection grow through consistent gestures rather than pressure. Even if the atmosphere feels lively, your heart may still want reliability.\n\nA helpful practice would be to name what you want in plain language before assuming it is understood. One sincere message, one thoughtful invitation, or one calm conversation can do more than a long emotional performance. In 2027, closeness may deepen most when warmth is matched by clarity."
   },
   "career": {
    "heading": "Work wants your voice",
    "body": "Career matters in 2027 may feel like a place where your ideas want to be seen, not just kept in reserve. The year supports expression and production, so speaking up, presenting your work, or taking the lead on something practical may feel more natural than usual. Because your chart has no Fire and a strong Wood base, this can be a year where your inner reserves are translated into visible action.\n\nA common scene could be that your workload becomes more public: more sharing, more explaining, more shaping of outcomes for others to see. In late summer, the energy may tilt toward results and initiative, while autumn can bring a more serious tone that asks for steadiness and careful timing. You do not need to force a dramatic leap; you may simply need to keep showing your work.\n\nIf a role, project, or responsibility starts asking more of you, try responding with structure instead of urgency. Make the next step concrete, keep the scope readable, and let your reliability speak for itself. In 2027, progress may come less from speed and more from the quality of what you consistently deliver."
   },
   "study": {
    "heading": "Learning becomes useful fire",
    "body": "Learning in 2027 may work best when it turns quickly into something you can use, share, or apply. Because the year encourages output, study may feel most rewarding when it is tied to a project, a skill, or a practical question rather than abstract collecting. For an Oak · Rooted type, that can be a good fit: you already know how to hold information, and now you may want to give it shape.\n\nYou might notice that the strongest learning moments come in the first part of the year, when help and recovery are easier to receive, and again near the end, when renewal brings another opening. A useful image for 2027 is not a library shelf, but a workshop table. What you learn may want to become a draft, a plan, a presentation, or a habit.\n\nA small and effective approach would be to choose one topic and one output. Read, listen, or practice with the intention of making a short summary, a useful note, or a simple demo. In 2027, knowledge may feel more alive when it moves through your hands instead of staying only in your head."
   },
   "health": {
    "heading": "Protect your rhythm gently",
    "body": "For body and mind, 2027 may ask for rhythm more than intensity. Since you are helping feed the year’s Fire, it can be easy to feel engaged, productive, and a little stretched at the same time. That does not mean you need to slow everything down; it means your energy may do better when it has regular pauses and clear edges.\n\nYou may notice that busy stretches feel manageable if you build in recovery before you feel depleted. Quiet storage is part of the year’s design, so rest, reflection, and simple routines can be surprisingly powerful. The most useful support may be the kind that keeps your system from running hot for too long: sleep consistency, calmer transitions, and fewer unnecessary commitments.\n\nA gentle experiment would be to make one part of your day predictable, such as a morning start, an evening wind-down, or a weekly reset. Keep it simple enough that you can actually maintain it. In 2027, steadiness may do more for your wellbeing than trying to optimize everything at once."
   }
  },
  "months": [
   {
    "headline": "Fresh footing",
    "body": "In February 2027, help, learning, and recovery may arrive more easily, almost like the ground is ready for your next step. The effort level can feel high, but it is the kind of effort that helps you get established rather than exhausted."
   },
   {
    "headline": "Magnetic lift",
    "body": "March 2027 may bring a strong sense of pull: people, ideas, or opportunities can feel closer and easier to attract. Because the flow is full, it may help to choose carefully what deserves your attention so the month stays lively instead of scattered."
   },
   {
    "headline": "Quiet comfort",
    "body": "April 2027 may feel familiar in a soothing way, with less pressure to chase novelty. Since the pace is easing off, it can be a good month for letting reliable routines do their work."
   },
   {
    "headline": "Waiting room",
    "body": "May 2027 may ask for patience with timing, because some things can feel slightly misread or out of sync. A slower response and a second look may help you avoid turning a small confusion into a bigger one."
   },
   {
    "headline": "Open the channel",
    "body": "June 2027 may bring a strong urge to produce, speak, or give more of yourself to what matters. With a command-like tone in the air, it can be a good time to set direction before the month starts pulling you in too many directions."
   },
   {
    "headline": "Stored momentum",
    "body": "July 2027 may feel quieter on the surface, but there is still real movement underneath. Advancement is part of the month’s tone, so what you prepare now may matter more than what looks obvious right away."
   },
   {
    "headline": "A turning point",
    "body": "August 2027 may be active, mobile, and a little disruptive in a useful way, especially if you are ready to shift direction. Because the pattern touches your own inner axis, it may be a month for movement, but not for rushing."
   },
   {
    "headline": "Direct gain",
    "body": "September 2027 may support initiative around goals, money, or concrete results. Small hiccups are possible, so the better move is to keep your plan simple and your follow-through clean."
   },
   {
    "headline": "Pressure shapes form",
    "body": "October 2027 may feel more serious, with responsibility asking you to settle into a steadier pace. The pressure can be constructive if you let it refine your focus instead of making you hurry."
   },
   {
    "headline": "Unexpected openings",
    "body": "November 2027 may bring sudden turns that ask you to stay flexible. Because the month has a joining quality, one new connection or alignment may change how you see the path ahead."
   },
   {
    "headline": "Renewal returns",
    "body": "December 2027 may feel like a fresh wave of support, learning, or recovery after a demanding stretch. If friction shows up, it may be best handled by simplifying your schedule and protecting your attention."
   },
   {
    "headline": "New momentum",
    "body": "January 2028 may carry a feeling of forward motion, even if the shape of it is still forming. It can be a good month to begin lightly, test what works, and let the year open gradually."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: build the base",
    "body": "Watch for help that arrives early, along with a steadier pace that lets you recover and organize. A good action is to choose one priority and give it a simple structure before the faster months begin."
   },
   {
    "title": "May to July: refine your output",
    "body": "Notice where timing feels slightly off and where your energy starts to go outward into speaking, making, or supporting others. A useful move is to trim one unnecessary commitment so your effort lands more cleanly."
   },
   {
    "title": "August to October: direct the push",
    "body": "Pay attention to movement, initiative, and the pressure that can sharpen your work if you stay calm. Try setting a concrete target and reviewing it once before you act, especially when the pace starts to rise."
   },
   {
    "title": "November to January: receive and reset",
    "body": "Watch for unexpected turns, renewed support, and a softer opening into the next cycle. A smart action is to close one loose loop, then leave space for the next idea to arrive without forcing it."
   }
  ],
  "closing": "From age 46 to 55, Earth becomes stronger in your 10-year cycle, which marks a clear shift into a more grounded chapter. In 2027, that next layer is still ahead of you, so this year can feel like a bridge: expressive, active, and full of useful output, while quietly preparing you for a steadier phase to come. If you let your energy move with purpose, 2027 can leave you with more shape, more clarity, and a better sense of where your effort truly belongs."
 },
 "mia": {
  "year": 2027,
  "title": "2027: A Steady Forge",
  "subtitle": "A year that asks for pace, polish, and clean direction",
  "overview": "2027 feels like a year that strengthens you by asking for more responsibility, clearer timing, and a steadier pace. Your core energy is Metal, and your Five Elements lean toward Wood, so the year’s Fire tone can feel like heat on a blade: not always comfortable, but useful for shaping something sharper and more reliable. For Mia, that means progress is less about forcing speed and more about choosing where your effort belongs.\n\nBecause your type is Steel · Harvest, you’re naturally suited to refining what already exists, separating what matters from what doesn’t, and making practical use of your energy. In 2027, that strength becomes especially visible when you work in focused bursts, keep your plans simple enough to carry, and let pressure become structure instead of noise. There’s momentum in the year, but it’s best used with intention rather than haste.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best through structure",
    "body": "In 2027, your money flow looks better when it’s tied to decisions, output, and clear priorities rather than scattered effort. The year supports taking initiative, but because the heat is strong, overreaching can make gains feel harder to hold. You may notice that the most satisfying results come from work you can measure and repeat.\n\nIn daily life, this could show up as wanting to take on a project, raise your visibility, or finally organize something that has been drifting. It may also be a year when spending feels linked to momentum: you do more, so you need cleaner boundaries around where the energy goes. A simple budget check or a short review of what’s actually profitable can feel surprisingly grounding.\n\nStart with one practical rule: before adding anything new, ask whether it increases clarity or just adds motion. If it sharpens your focus, it’s probably worth it."
   },
   "love": {
    "heading": "Closeness needs room to breathe",
    "body": "Your relationship life in 2027 looks lively, but not always quiet. There’s a stronger pull toward expressing yourself, giving more, and showing what you feel through action, which can make you generous and magnetic. At the same time, that same energy can leave you feeling a little spent if you’re doing all the reaching.\n\nYou might notice more invitations, more messages, or more moments where someone’s response changes the tone of the day. In one month, a conversation can move fast; in another, a small misunderstanding may ask for a second look rather than a quick reaction. The year favors honest contact, but it also rewards pacing yourself so your warmth stays real.\n\nTry letting connection unfold in smaller, clearer steps. A direct message, a calm check-in, or a gentle boundary can do more than trying to carry the whole mood alone."
   },
   "career": {
    "heading": "Career sharpens under pressure",
    "body": "Work and career in 2027 look like a training ground: more responsibility, more visibility, and more chances to prove what you can handle. That doesn’t mean everything needs to be pushed at once. It means your strength grows when you choose your speed carefully and let pressure become discipline.\n\nIn practice, this could be a year of tighter deadlines, more judgment calls, or moments when others look to you for direction. If your work involves leadership, production, design, or decision-making, you may feel the year asking for cleaner standards and firmer follow-through. The good news is that your Metal core tends to improve through refinement, and this year supports exactly that.\n\nA useful move is to set one clear priority per cycle and finish it well before taking on the next. That kind of discipline will likely feel more powerful than trying to do everything at once."
   },
   "study": {
    "heading": "Learning works through use",
    "body": "In 2027, study and learning are best approached as something active, not purely theoretical. The year supports growth through doing: writing, practicing, revising, teaching, or turning ideas into something visible. Since your Five Elements lean toward Wood, your natural tendency to build and expand can help, as long as you don’t let too many directions compete at once.\n\nYou may find that classes, books, or mentors become most helpful when they connect directly to a project or a real need. A concept may suddenly click when you test it in a conversation or apply it to a task you already care about. The year is less about collecting information and more about making knowledge usable.\n\nIf you want to keep momentum, choose one topic and give it a container: notes, practice, or a weekly review. Small repetition will likely teach you more than a big burst of inspiration."
   },
   "health": {
    "heading": "Protect your rhythm, not just your output",
    "body": "Your body and mind in 2027 benefit most from rhythm, recovery, and not treating every alert feeling like a command. The year has strong forward motion, which can be energizing, but it may also make you feel as if you should always be producing. A steadier schedule will likely help you feel more like yourself.\n\nYou might notice that busy periods feel fine at first and then ask for a later reset, especially if you’ve been saying yes too quickly. Quiet meals, regular sleep windows, and short pauses between tasks can make a bigger difference than dramatic changes. This is a good year to notice how your concentration changes when your day is too crowded.\n\nStart by building one small anchor into the day: a walk, a screen break, or a fixed time to stop. When your rhythm is protected, everything else tends to settle more easily."
   }
  },
  "months": [
   {
    "headline": "February: a sharp reset",
    "body": "The month’s energy can feel like a fresh start that also pulls you into change, especially through a direct clash-like tension with your usual pattern. That can bring sudden movement, new demands, or a need to adjust quickly. Keeping your plans light and flexible may help you turn the disruption into a useful reset."
   },
   {
    "headline": "March: ideas take root",
    "body": "March supports expression, growth, and giving more of yourself outward, so your energy may go toward making, sharing, or helping. Small hiccups are possible, but they’re the kind that respond well to patience and a second pass. If you stay responsive rather than rushed, the month can become more productive than it first looks."
   },
   {
    "headline": "April: quiet leverage",
    "body": "April favors taking the lead, pursuing results, and handling resources with a firmer hand. Since the energy is still gathering underneath the surface, it works best when you build before you broadcast. A private plan, a cleaner system, or one focused decision can give you more leverage than pushing too hard in public."
   },
   {
    "headline": "May: doors open fast",
    "body": "May brings a sense of arrival and movement, and the month’s joining quality can make people, plans, or opportunities connect quickly. Unexpected turns may also show up, so it helps to stay open without becoming scattered. If something begins suddenly, let it breathe before deciding how far to carry it."
   },
   {
    "headline": "June: pressure becomes form",
    "body": "June asks for endurance, duty, and a steadier pace, with a little friction woven in. That can feel like being tested by schedules, expectations, or the need to keep showing up. If you simplify your commitments and move in measured steps, the month can make you stronger rather than merely busier."
   },
   {
    "headline": "July: stay adaptable",
    "body": "July keeps the pressure moving, but in a less predictable way, so your best tool is responsiveness. The wildcard tone can bring sudden shifts in plans or mood, which means rigid expectations may wear you out faster. It’s a good month for adjusting on the fly while protecting your core priorities."
   },
   {
    "headline": "August: support arrives",
    "body": "August feels more nourishing, with help, learning, and recovery becoming easier to access. Fresh ground energy can make new environments, new methods, or new connections feel refreshing rather than demanding. If you’ve been carrying too much alone, this month may be better for receiving than proving."
   },
   {
    "headline": "September: strong pull",
    "body": "September brings fuller power and a stronger sense of presence, along with a magnetic quality that can draw attention or useful contact. It’s a good month for making your work visible or for leaning into what already has traction. Just keep your boundaries clear, so the attention you attract doesn’t spread you too thin."
   },
   {
    "headline": "October: easy pace",
    "body": "October softens the tempo and feels more familiar, but it may not bring much new stimulation. The waiting-time quality can make the month useful for observation, review, and letting things settle. If you’ve been pushing hard, this is a good time to let the dust clear before making your next move."
   },
   {
    "headline": "November: read carefully",
    "body": "November keeps the energy calm on the surface, but the misread-moments tone suggests that assumptions may need checking. Small misunderstandings are easier to prevent than repair, so clarity matters more than speed. A slower reply or a second look can save you from unnecessary confusion."
   },
   {
    "headline": "December: clean the desk",
    "body": "December brings a quieter, more orderly kind of expression, with a command-like quality that supports setting direction. It’s a good month for wrapping up loose ends, organizing what remains, and speaking with calm authority. If you clear space now, the next move can start from a much cleaner base."
   },
   {
    "headline": "January: stored strength",
    "body": "January favors quiet storage and a sense of advancement that builds beneath the surface. The month supports tucking away useful progress, preserving energy, and preparing for the next round without forcing it. When you leave room for what’s forming, the next step tends to come with better timing."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: reset and shape",
    "body": "Watch for sudden shifts, early momentum, and moments when your voice or output wants to expand quickly. Choose one area to simplify, and use that space to build a cleaner routine or a more focused project."
   },
   {
    "title": "May to July: direct the pressure",
    "body": "Watch for fast openings, higher expectations, and a stronger need to keep your pace steady. Put your energy into one visible goal, and give yourself a rule for when to pause before reacting."
   },
   {
    "title": "August to October: receive and refine",
    "body": "Watch for help arriving, attention increasing, and the tempo softening into review mode. Accept support where it’s offered, then use the quieter stretch to polish what’s already working."
   },
   {
    "title": "November to January: clear and prepare",
    "body": "Watch for moments when communication needs extra care and when the year asks for tidying rather than pushing. Make one closing ritual for your plans, then carry only what you truly want to keep into the next cycle."
   }
  ],
  "closing": "From age 33 to 42, a Water-heavy 10-year cycle begins, and that marks a real shift from the current phase into a different kind of flow. In 2027, though, your task is simpler: let pressure refine you, let pace protect you, and let your Metal nature keep choosing what is worth carrying. If you do that, Mia, the year can feel less like a test and more like a forge with a purpose."
 },
 "sam": {
  "year": 2027,
  "title": "2027: A Grounded, Brave Rhythm",
  "subtitle": "A year of support, steady momentum, and clean timing for Sam",
  "overview": "In 2027, the year’s fire energy feels like something that can feed and strengthen your Earth core rather than overwhelm it. For someone with a Mountain · Order pattern and a balanced spread of the Five Elements, that often translates into a year where help, learning, and recovery are easier to recognize when you slow down enough to receive them. The tone is not loud all at once; it moves in waves, with some months asking you to push and others inviting you to settle, refine, and let things mature.\n\nBecause your elements are evenly distributed, the year may feel less like a dramatic pivot and more like a series of clean adjustments. Sam, you may notice that your best progress comes when you match the pace of the month instead of forcing one single strategy across the whole year. The fire of 2027 can brighten your direction, but your Earth nature still does best with structure, practical choices, and a clear sense of order. That combination makes this a good year for building confidence through repetition, not just through big moments.",
  "chapters": {
   "wealth": {
    "heading": "Money grows best with restraint",
    "body": "In 2027, your money story looks more active in the months when the year’s fire is something you can guide. That can support decisions, pricing, and results, but it also suggests that pushing too hard may create extra noise. Your Mountain-like nature usually prefers solid ground, so the strongest financial rhythm may come from clear priorities rather than chasing every opportunity.\n\nYou might see this in everyday life as a stronger urge to take charge of a budget, ask for better terms, or put energy into something that could visibly pay off. The useful move is to keep your plans simple enough that you can explain them in one breath. If a choice starts to feel rushed, a short pause and one more review will likely save you more energy than a bold leap."
   },
   "love": {
    "heading": "Connection through steadier pace",
    "body": "Your relationship life in 2027 seems to favor warmth that is practical, not flashy. When the year supports you, it can be easier to feel seen, learn from others, and let trust return in small ways. Because your pattern values order, you may prefer relationships that feel consistent enough to breathe in, rather than intense enough to keep guessing.\n\nA likely scene is a conversation that starts casually but ends up revealing something useful about how you and another person actually work together. That kind of exchange can be more important than a dramatic gesture. If you want to deepen a connection, try showing up with a small repeatable habit: a regular check-in, a thoughtful message, or a shared plan that is easy to keep."
   },
   "career": {
    "heading": "Work rewards clear direction",
    "body": "Career-wise, 2027 has a strong feel of being supported from behind while still asking you to keep your hands on the wheel. The year can bring help, learning, and recovery, but it also seems to reward people who know how to organize effort into visible results. With your Earth core and balanced elements, you may do especially well when you turn broad goals into a sequence of manageable steps.\n\nIn daily work, this could look like a season where a project gains traction after a few adjustments, or where someone’s advice finally clicks because it fits your style. The best approach is to keep your priorities visible and your process tidy. If you’re managing multiple tasks, a short list with a clear order will likely serve you better than trying to hold everything in your head."
   },
   "study": {
    "heading": "Learning gets easier when you slow down",
    "body": "In 2027, learning may feel most fruitful when it is practical and well-paced. The year’s fire can sharpen focus, but your Earth nature usually absorbs knowledge better when it has time to settle. That makes this a strong year for study that builds skill, confidence, and usable understanding rather than just collecting information.\n\nYou might notice that a book, course, or conversation lands more deeply when you revisit it later instead of trying to master everything at once. Sam, if you are exploring something new, it may help to keep one notebook, one main thread, and one simple review habit. A steady rhythm can turn scattered curiosity into something reliable and surprisingly durable."
   },
   "health": {
    "heading": "Protect your energy by pacing it",
    "body": "For body and mind, 2027 points toward rhythm, not intensity. The year contains stretches that support rest, easing off, and a gradual return to balance, which fits your grounded style well. Because your elements are evenly spread, your system may respond best when your schedule has enough structure to feel safe but enough space to breathe.\n\nIn everyday life, this could show up as feeling better when you keep meal times, sleep windows, or quiet breaks more consistent. When the month gets busier, a small reset can be more helpful than trying to power through on will alone. A short walk, a tidy workspace, or a ten-minute pause can be a surprisingly good way to keep your inner weather clear."
   }
  },
  "months": [
   {
    "headline": "A fresh start in motion",
    "body": "February 2027 favors initiative, so it’s a good time to step forward with something you want to shape. The energy can support money, agency, and visible progress, though a little restraint will keep enthusiasm from turning into overreach."
   },
   {
    "headline": "Small snags, steady gains",
    "body": "March 2027 still supports action, but the pace may feel a bit more uneven. If something needs a second look, that extra check can save time later and help your results feel cleaner."
   },
   {
    "headline": "Pressure that builds strength",
    "body": "April 2027 brings a more demanding tone, and your best move is to choose your speed carefully. The month can feel productive when you let responsibility sharpen you instead of rushing to outrun it."
   },
   {
    "headline": "Stay flexible inside the plan",
    "body": "May 2027 may bring a few unexpected turns, so a flexible mindset will help more than a rigid one. If you keep your priorities simple, you can respond to changes without losing your center."
   },
   {
    "headline": "Support comes closer",
    "body": "June 2027 feels especially nourishing, with help and recovery more available than before. Because the month includes a push-pull kind of tension, a change in routine or environment could open a useful new angle."
   },
   {
    "headline": "A month with surprise value",
    "body": "July 2027 keeps the supportive tone but adds a wildcard feel, so not everything needs to be predictable to be useful. Stay open to an unexpected lead, a useful conversation, or a fresh way of doing something familiar."
   },
   {
    "headline": "Comfort in familiar ground",
    "body": "August 2027 feels easy to inhabit, though it may not bring much novelty. That makes it a good month for refining what already works and enjoying the relief of knowing where you stand."
   },
   {
    "headline": "Quiet attraction",
    "body": "September 2027 has a magnetic quality, with people and opportunities tending to notice what you’re putting together. The best use of that pull is to tidy your space, your schedule, or your message so the right things can come closer."
   },
   {
    "headline": "Expression with a cost",
    "body": "October 2027 encourages output, sharing, and generosity, and that can feel energizing if you pace yourself well. Because the month asks for more from you, it helps to decide in advance what deserves your effort."
   },
   {
    "headline": "Wait before you assume",
    "body": "November 2027 may involve moments where something is easy to misread, so patience matters. If a situation feels unclear, holding your response for a bit can make your eventual choice much cleaner."
   },
   {
    "headline": "Command with care",
    "body": "December 2027 brings a stronger sense of direction, so you may feel ready to take the lead or claim a result. That’s useful as long as you keep your ambition tidy and don’t turn pressure into force."
   },
   {
    "headline": "A door opens neatly",
    "body": "January 2028 links well with your own rhythm, which can make cooperation and alignment feel smoother. It’s a good month to let a plan settle into place and to start the next stretch with clear intent."
   }
  ],
  "action_plan": [
   {
    "title": "February to April: build clean momentum",
    "body": "Watch for a stronger urge to lead, earn, or get visible results, but also for the point where speed starts to blur judgment. Try one practical action: set one priority list for the season and review it weekly so your energy goes where it actually matters."
   },
   {
    "title": "May to July: stay open to support",
    "body": "This stretch can bring pressure, then relief, then a useful surprise, so the key theme is responsiveness. Try one practical action: keep one person, tool, or routine you can lean on when plans shift, instead of trying to improvise everything alone."
   },
   {
    "title": "August to October: refine and express",
    "body": "These months favor familiarity, attraction, and output, which means your work may become more visible. Try one practical action: polish one thing you already do well and share it in a clearer, simpler form."
   },
   {
    "title": "November to January: finish with discernment",
    "body": "The final stretch asks you to read situations carefully, then step forward with cleaner timing. Try one practical action: before agreeing to anything big, pause long enough to write down what the request is, what it costs you, and what you actually want."
   }
  ],
  "closing": "From age 40 to 49, your 10-year cycle shifts into a stronger Earth phase, and that marks a clear new chapter after the one that is closing now. In 2027, the year’s fire still works in your favor by bringing support, learning, and recovery into view, especially when you let timing stay simple and grounded.\n\nIf you trust your own pace and keep your choices orderly, this can be a year that strengthens your confidence quietly rather than dramatically. Sam, the most valuable wins here may come from knowing when to act, when to wait, and when to let good help reach you."
 },
 "jisoo": {
  "year": 2027,
  "title": "2027년, 지수님의 리듬",
  "subtitle": "채우고, 쓰고, 다듬는 흐름을 읽는 해",
  "overview": "2027년은 지수님에게 에너지가 바깥으로 많이 흘러나가기 쉬운 해예요. 나무가 햇빛을 받아 자라듯, 가진 것을 표현하고 나누고 만들어 내는 쪽으로 힘이 쓰이기 쉽습니다. 지수님의 사주 유형이 ‘거목 · 성취’인 만큼, 한 번 방향이 잡히면 크게 뻗는 힘이 있지만, 2027년에는 그 힘을 쓰는 만큼 체력과 집중을 아껴 쓰는 감각도 함께 필요해 보여요.\n\n또한 지수님의 오행 분포를 보면 토의 비중이 높고 화와 수가 비어 있어요. 그래서 2027년의 뜨거운 흐름은 활력을 주기도 하지만, 동시에 속도를 너무 높이면 금세 건조해질 수 있습니다. 반대로 2월~3월과 12월~1월처럼 도움과 회복이 들어오는 구간을 잘 받쳐 주면, 한 해 전체가 훨씬 안정적으로 이어질 거예요.\n\n지수님에게 2027년은 ‘내가 무엇을 더 내놓을 수 있는가’를 배우는 해에 가깝습니다. 성과를 크게 노리기보다, 무엇을 하면 오래 가는지, 어떤 방식이 나를 덜 소모시키는지 살피면 좋습니다. 2027년은 화의 해답게 분명한 색을 띠지만, 그 색을 오래 유지하려면 중간중간 숨을 고르는 리듬이 중요해요.",
  "chapters": {
   "wealth": {
    "heading": "성과를 세우는 돈의 감각",
    "body": "2027년의 재물 흐름은 지수님이 직접 움직이고 밀어붙일수록 결과가 보이기 쉬운 편이에요. 다만 ‘내가 다 끌어안는 방식’으로 가면 에너지가 먼저 빠질 수 있어서, 돈의 흐름을 키우는 일과 돈을 지키는 일을 함께 보는 감각이 중요합니다. 토의 비중이 높은 편이라, 눈에 보이는 결과를 좋아하는 성향과도 잘 맞지만, 화가 강한 해에는 속도만 믿기보다 구조를 확인하는 쪽이 더 편할 거예요.\n\n일상에서는 “이건 지금 바로 해도 되는 일인가, 한 번 더 정리하고 가야 하는 일인가”를 가르는 장면이 자주 보일 수 있어요. 8월~9월경처럼 주도권이 생기는 구간에는 제안이 들어오거나 직접 기획을 잡고 싶어질 수 있고, 그때 판단이 빨라지는 대신 과감함이 조금 앞설 수 있습니다. 반대로 2월~3월경에는 도움을 받아 정리하는 쪽이 더 유리해 보여요.\n\n작게 시작한다면, 큰 결정을 서두르기보다 한 달 단위로 들어오는 것과 나가는 것을 적어 보는 방식이 좋습니다. 지수님에게는 ‘벌기’보다 ‘흐름을 읽기’가 먼저일 수 있어요. 숫자를 크게 키우는 해라기보다, 돈이 어디서 새고 어디서 힘을 얻는지 감각을 만드는 해로 쓰면 한결 편할 거예요."
   },
   "love": {
    "heading": "가까워지고 식별하는 관계",
    "body": "2027년의 관계·연애 흐름은 뜨겁게 표현되는 장면과, 그 열기 속에서 서로의 속도를 맞추는 장면이 함께 들어와요. 지수님은 원래 성취를 향해 힘을 모으는 성향이 있어, 마음이 열리면 진심이 크게 드러날 수 있습니다. 그래서 관계에서도 가볍게 스쳐 가는 인연보다, 함께 무언가를 만들어 가는 사람과 더 깊게 맞닿기 쉬워 보여요.\n\n3월경에는 서로 어울려 붙는 흐름이 들어와 대화가 잘 풀리거나, 누군가와의 거리감이 부드럽게 좁아질 수 있어요. 반면 4월경에는 익숙한 관계 안에서 작은 전환이 생기기 쉬워, 당연하게 넘기던 습관을 다시 보게 될 수 있습니다. 이때는 서두르기보다 “나는 어떤 방식의 친밀함이 편한가”를 확인하는 쪽이 좋습니다.\n\n작게 시작한다면, 상대에게 맞추기 전에 내 리듬을 먼저 말해 보는 연습이 도움이 돼요. 지수님에게 2027년의 관계는, 누군가를 더 얻는 해라기보다 맞는 속도를 고르는 해에 가깝습니다. 잘 맞는 사람과는 더 깊어지고, 그렇지 않은 관계는 자연스럽게 정리되는 쪽이 한결 편할 거예요."
   },
   "career": {
    "heading": "보여 주고 맡아 보는 일",
    "body": "2027년의 일·커리어 흐름은 지수님이 가진 것을 바깥으로 드러내고, 실제로 맡아 보는 기회가 늘기 쉬운 편이에요. 표현·생산·베풂이 커지는 해라서, 결과물이나 역할이 눈에 띄기 쉽지만 그만큼 소모도 함께 따라올 수 있습니다. 거목형의 강한 성장감이 살아나는 시기라, 한 번 맡은 일에 힘이 실리면 존재감이 분명해질 가능성이 있어요.\n\n6월~7월경에는 내가 만들어 내는 것, 내가 돕는 것, 내가 보여 주는 것이 많아지기 쉬워요. 이때는 사람들에게 인정받는 장면이 생길 수 있지만, 일정이 빽빽해지면 마음보다 손이 먼저 바빠질 수 있습니다. 10월~11월경에는 책임감이 올라오면서 속도를 스스로 조절하는 능력이 중요해져요.\n\n작게 시작한다면, “내가 꼭 해야 하는 일”과 “내가 해 주면 좋은 일”을 나누어 적어 보세요. 지수님은 성실함이 강점이지만, 2027년에는 성실함을 어디에 쓰는지가 더 중요합니다. 보이는 성과보다 오래 남는 구조를 하나씩 만들면, 일의 만족도가 훨씬 안정적으로 이어질 거예요."
   },
   "study": {
    "heading": "배움이 몸에 붙는 해",
    "body": "2027년의 배움은 머리로만 익히기보다, 써 보면서 배우는 쪽이 더 잘 맞아요. 도움을 받는 구간과 직접 밀어붙이는 구간이 번갈아 들어오므로, 지수님에게는 공부가 ‘정리’와 ‘실행’ 두 얼굴을 함께 가질 수 있습니다. 화의 기운이 들어오는 해라서, 이해가 되면 빠르게 흡수하지만, 급하게 지나치면 금방 흩어질 수도 있어요.\n\n2월~3월경에는 배움의 도움이나 회복감이 들어와서, 기초를 다시 잡기에 좋습니다. 12월~1월경에도 다시 채워지는 흐름이 와서, 한 해를 정리하고 다음 단계를 준비하기에 적당해 보여요. 반면 8월~9월경에는 결과를 빨리 내고 싶어져서, 아는 것을 바로 써 보고 싶은 마음이 커질 수 있습니다.\n\n작게 시작한다면, 하나의 주제를 정해 짧게 반복하는 방식이 잘 맞습니다. 지수님은 넓게 많이 보는 것보다, 선택한 것을 깊게 익혀 쌓는 쪽에서 힘이 나기 쉬워요. 배움을 성과의 재료로만 보지 말고, 내 리듬을 안정시키는 도구로 쓰면 훨씬 편해집니다."
   },
   "health": {
    "heading": "리듬을 지키는 돌봄",
    "body": "2027년의 몸과 마음 돌봄은 ‘더 하기’보다 ‘덜 새게 하기’가 핵심이에요. 화의 해는 움직임과 열기를 올려 주지만, 지수님처럼 이미 안쪽의 무게감이 있는 사람에게는 일정과 감정이 한꺼번에 몰릴 때 쉽게 지칠 수 있습니다. 그래서 규칙적인 휴식, 식사, 이동의 간격을 일정하게 두는 것이 꽤 중요해 보여요.\n\n4월경에는 익숙한 흐름 속에서 전환이 생기고, 10월~11월경에는 책임감이 늘면서 스스로를 더 몰아붙이고 싶어질 수 있어요. 이럴 때는 “지금 더 해야 하나, 잠깐 멈춰도 되나”를 점검하는 습관이 도움이 됩니다. 반대로 2월~3월경과 12월~1월경에는 회복과 보충의 감각이 들어와서, 생활 리듬을 다시 맞추기 좋습니다.\n\n작게 시작한다면, 잠들기 전과 일어나기 직전의 시간을 짧게 고정해 보세요. 지수님에게 2027년은 생활의 큰 변화를 억지로 만들기보다, 작은 리듬을 지키는 힘이 더 빛나는 해예요. 몸과 마음을 동시에 챙기려 하기보다, 하루에 한 가지씩만 정돈해도 충분히 달라질 수 있습니다."
   }
  },
  "months": [
   {
    "headline": "2월, 받는 힘",
    "body": "도움과 배움이 들어오는 흐름이 먼저 열려요. 건록의 기운이라 기초를 다시 세우기 좋고, 지살의 움직임은 익숙한 자리에서도 작은 변화 욕구를 건드립니다. 천천히 받아들이면 시작이 한결 가벼워질 거예요."
   },
   {
    "headline": "3월, 맞물림",
    "body": "제왕의 기운이 들어와 자신감이 또렷해지기 쉬워요. 지지의 합이 함께 있어 사람이나 일의 흐름이 부드럽게 맞물릴 수 있습니다. 다만 힘이 잘 실리는 만큼, 먼저 나가는 말의 온도만 조금 살피면 좋아요."
   },
   {
    "headline": "4월, 전환의 문",
    "body": "익숙한 결이지만 충의 기운이 있어 방향이 살짝 꺾이기 쉬워요. 쇠의 흐름이라 마무리와 정리가 잘 보이는 대신, 새 자극은 덜할 수 있습니다. 한 번 더 확인하고 움직이면 흔들림이 줄어들 거예요."
   },
   {
    "headline": "5월, 익숙한 숨",
    "body": "편안한 결이 살아나지만 큰 자극은 적은 달이에요. 병의 흐름은 속도를 낮추며 살펴보게 만들 수 있고, 망신살은 말과 이미지에 신경이 쓰이게 할 수 있습니다. 과하게 드러내기보다 평소 루틴을 지키는 쪽이 더 편합니다."
   },
   {
    "headline": "6월, 펼치는 달",
    "body": "내가 기운을 키워 주는 달이라 표현과 생산이 늘기 쉬워요. 사의 흐름은 움직임이 많아지고, 장성살은 주도권을 잡고 싶게 만듭니다. 할 수 있는 만큼만 넓히면, 밀도는 오히려 좋아질 수 있어요."
   },
   {
    "headline": "7월, 반짝이는 여름",
    "body": "묘의 흐름이 들어와 한 번 더 성장의 손길이 느껴져요. 반안살은 사람 앞에서의 존재감이나 정돈된 인상이 살아나기 쉽습니다. 보여 주는 일은 좋지만, 소모를 줄이는 여백도 같이 두면 더 오래 갑니다."
   },
   {
    "headline": "8월, 잡아당기는 힘",
    "body": "내가 기운을 다스리는 달이라 성과와 주도권이 선명해지기 쉬워요. 절의 흐름은 과감함을 돕지만, 역마살은 이동과 변화 욕구를 키울 수 있습니다. 속도를 앞세우기보다 우선순위를 좁히면 힘이 새지 않아요."
   },
   {
    "headline": "9월, 선을 가르기",
    "body": "태의 흐름은 아직 완성되기 전의 가능성을 보여 줘요. 육해살은 사소한 오해나 어긋남에 예민해질 수 있어서, 말의 맥락을 또렷하게 두는 편이 좋습니다. 덜 복잡하게 정리할수록 결과가 선명해집니다."
   },
   {
    "headline": "10월, 무게를 받다",
    "body": "이 해의 기운이 나를 단련하는 달이라 책임감이 커지기 쉬워요. 양의 흐름은 힘이 올라오는 구간이지만, 화개살은 혼자 정리하고 싶게 만들 수 있습니다. 조용히 정돈하는 시간을 일부러 넣으면 단단해져요."
   },
   {
    "headline": "11월, 버티는 힘",
    "body": "장생의 흐름이 들어와 길게 이어 가는 힘이 살아나요. 겁살의 영향으로 마음이 예민해질 수 있지만, 그만큼 기준을 더 또렷하게 세우게 됩니다. 급하게 결론 내리기보다, 속도를 일정하게 유지하는 것이 좋습니다."
   },
   {
    "headline": "12월, 다시 채움",
    "body": "도움과 회복이 들어오는 달이라 한 해의 피로를 덜어내기 좋아요. 목욕의 흐름은 새로 정리하고 비워 내는 감각을 주고, 재살은 작은 실수에 주의를 요구합니다. 가벼운 정리부터 시작하면 다음 달이 편해집니다."
   },
   {
    "headline": "1월, 새로 받기",
    "body": "관대의 흐름으로 다시 품을 넓히는 감각이 들어와요. 천살은 먼 생각이나 막연한 불안을 건드릴 수 있지만, 동시에 더 큰 그림을 보게도 합니다. 너무 멀리 가지 말고, 눈앞의 한 가지를 채우는 쪽이 안정적이에요."
   }
  ],
  "action_plan": [
   {
    "title": "2~4월경: 받는 흐름 점검",
    "body": "이 구간은 도움, 배움, 전환이 함께 들어와요. 먼저 도와주는 사람과 다시 확인할 일이 있는 분야를 정리하고, 시작 전에 한 번 더 묻는 습관을 들여 보세요."
   },
   {
    "title": "5~7월경: 표현을 가볍게 넓히기",
    "body": "표현과 생산이 늘어나는 흐름이 보입니다. 한 번에 크게 벌리기보다, 보여 주고 싶은 것 하나를 정해 작은 결과물로 내보내면 소모를 줄이면서도 성취감을 얻기 좋아요."
   },
   {
    "title": "8~10월경: 주도권을 좁게 쓰기",
    "body": "성과를 밀어붙이고 책임이 늘어나는 시기예요. 하고 싶은 일을 늘리기보다 우선순위를 세 개 이하로 줄이고, 이동·일정·약속을 한 번 더 정돈해 보세요."
   },
   {
    "title": "11월~다음해 1월경: 회복과 정리",
    "body": "단련과 회복이 교차하는 흐름입니다. 한 해 동안 쌓인 것을 정리하면서, 내게 남길 것과 내려놓을 것을 나누고, 생활 리듬을 다시 고정하는 행동이 잘 맞아요."
   }
  ],
  "closing": "36세부터 45세까지 수 기운이 강해지는 시기가 이어집니다. 지금의 2027년은 그 다음 장으로 들어가기 전, 에너지를 밖으로 쓰는 법과 스스로를 덜 소모시키는 법을 익히는 해로 읽을 수 있어요. 지수님에게 2027년은 무리한 확장보다, 잘 맞는 속도를 찾을 때 더 빛나는 해입니다."
 }
};
