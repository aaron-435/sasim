/**
 * lib/legalContent.ts
 * ------------------------------------------------------------------
 * Structured content for /privacy and /terms, split out of
 * app/privacy/page.tsx and app/terms/page.tsx (2026-09-02) so the body
 * text is translatable data instead of hardcoded JSX — same "fill in a
 * translated copy of this file later" pattern as lib/i18n/ (see
 * lib/i18n/README.md). ko, en and es are all populated; `getLegalContent()`
 * falls back to ko for any other locale.
 *
 * Inline `**bold**` markup is supported in `p`/`list` text (rendered by
 * components/LegalContentRenderer.jsx) — kept deliberately minimal
 * (no nested markup, no links-in-text) since this is legal copy that
 * will get a real translator/reviewer pass anyway, not a rich-text CMS.
 * ------------------------------------------------------------------
 */

export type LegalBodyItem =
  | { type: "p"; text: string; style?: "default" | "muted" | "highlight" }
  | { type: "list"; items: string[] }
  | { type: "contact"; label: string; email: string };

export interface LegalSection {
  heading?: string;
  headingColor?: string;
  body: LegalBodyItem[];
}

export interface LegalDocument {
  title: string;
  updatedAt: string;
  sections: LegalSection[];
}

// 2026-10-07: rewritten against what the app and server actually do now (native app, paid
// subscription and one-time reports, self-hosted saju engine instead of SAZU, event log,
// invites, couple mode, journal, other people's birth dates). Earlier drafts described a free
// web-only beta. privacyEn/privacyEs and termsEn/termsEs are section-for-section translations
// of these two — keep all three in step. Still a draft pending legal review.
const privacyKo: LegalDocument = {
  title: "개인정보처리방침",
  updatedAt: "2026년 10월 7일",
  sections: [
    {
      body: [
        {
          type: "p",
          text: "“Fatesaid”(이하 “서비스”)는 웹사이트(fatesaidapp.com)와 모바일 앱으로 제공되며, 이용자의 개인정보를 「개인정보 보호법」 등 관련 법령에 따라 처리합니다. 본 방침은 서비스가 어떤 정보를 수집하고, 어디에 쓰고, 얼마나 보관하고, 어떻게 파기하는지 안내합니다.",
        },
        {
          type: "p",
          style: "highlight",
          text: "서비스는 회원가입 없이 이용합니다. 이름, 이메일, 비밀번호, 전화번호는 수집하지 않으며, 결제 수단 정보(카드 번호 등)는 Apple·Google이 처리하고 서비스는 받지 않습니다.",
        },
      ],
    },
    {
      heading: "1. 수집하는 정보",
      body: [
        { type: "p", text: "**이용자가 직접 입력하는 정보**" },
        {
          type: "list",
          items: [
            "표시 이름(닉네임), 생년월일, 성별, 태어난 시간(선택, 모름 가능), 출생 도시(선택), 지금 궁금한 주제",
            "심리테스트 응답(30문항 선택·슬라이더 응답)",
            "AI 상담 대화에서 이용자가 작성한 글",
            "사주 Q&A에서 고른 질문",
          ],
        },
        { type: "p", text: "**다른 사람에 관한 정보**" },
        {
          type: "list",
          items: [
            "궁합, ‘특정한 사람에 대해’ 질문, 그룹 케미 맵을 이용할 때 이용자가 입력한 다른 사람의 생년월일·성별·태어난 시간·표시 이름. 결과를 계산하는 요청 안에서만 쓰고 서버에 저장하지 않습니다(아래 궁합 리포트 구매 기록은 예외).",
            "궁합 상세 리포트 구매 기록: 같은 구매를 같은 두 사람에게만 쓰도록, 두 사람의 정보를 되돌릴 수 없는 값(암호화 해시)으로 바꿔 구매 거래 번호와 함께 보관합니다. 생년월일 원문은 남지 않습니다.",
            "친구 궁합 초대 링크: 보낸 사람의 표시 이름과 일간(사주의 중심 글자 하나), 언어, 링크를 받은 친구가 적은 표시 이름(선택)과 계산 결과(일간·사주 유형·가장 많은 오행). 친구의 생년월일은 결과를 계산하는 요청 안에서만 쓰고 저장하지 않습니다.",
            "커플 모드 연결: 두 사람의 표시 이름, 일간·일지(사주 글자 한 개씩), 구독 확인을 위한 결제 서비스(RevenueCat) 사용자 식별자. 생년월일은 저장하지 않습니다.",
          ],
        },
        { type: "p", text: "**서비스 이용 중 생성되는 정보**" },
        {
          type: "list",
          items: [
            "익명 세션 식별자: 로그인 없이 입력 정보와 결과를 하나의 이용 흐름으로 묶기 위해 무작위로 만든 값",
            "이용 기록: 어떤 화면을 열었는지, 어떤 버튼을 눌렀는지, 구매 시도와 결과, 답변에 대한 👍/👎. 기기(앱)나 브라우저(웹)마다 무작위로 만든 식별자에 묶이며, 생년월일·이름·직접 입력한 글은 포함하지 않습니다.",
            "구매 정보: 결제 서비스(RevenueCat)가 앱 설치마다 만드는 익명 사용자 식별자와 구매·구독 내역",
            "AI 사용량 기록: 요청 종류와 사용한 토큰 수(대화·질문 원문은 포함하지 않음)",
            "접속 정보: IP 주소와 기기·브라우저 정보. 과도한 요청을 막는 데 쓰며 서비스 데이터베이스에 저장하지 않습니다(호스팅 업체의 접속 기록에는 남을 수 있습니다).",
          ],
        },
        { type: "p", text: "**기기에만 저장되고 서비스 서버로 보내지 않는 정보**" },
        {
          type: "list",
          items: [
            "한 줄 저널(기분과 한 줄 기록). 단, 이용자가 월말 패턴 리포트를 만들 때 그 달의 기록이 리포트 생성 요청에 담겨 전송되며, 서버는 생성에만 쓰고 저장하지 않습니다.",
            "구매한 리포트 사본, 알림 설정, 일간 레슨 진행, 사주 Q&A 주제별 횟수, 홈 화면 위젯에 표시할 내용",
          ],
        },
      ],
    },
    {
      heading: "2. 이용 목적",
      body: [
        {
          type: "list",
          items: [
            "사주 원국·오행 분포 계산, 운세·궁합·리포트 제공",
            "심리테스트 채점, AI 상담·사주 Q&A 답변·리포트 생성",
            "유료 서비스의 구매 확인과 이용 권한 관리",
            "친구 궁합 초대와 커플 모드 연결 제공",
            "서비스 이용 분석과 개선(이용 기록), 오류 확인, 부정 이용 방지",
          ],
        },
        { type: "p", text: "서비스는 수집한 정보를 광고에 쓰지 않고, 다른 회사의 앱·웹사이트를 넘나드는 추적에 쓰지 않습니다." },
      ],
    },
    {
      heading: "3. 보유 및 파기",
      body: [
        {
          type: "list",
          items: [
            "입력 정보·심리테스트 응답·상담 대화·리포트 결과(익명 세션 식별자와 함께 저장): 수집일로부터 **최대 1년**",
            "이용 기록, AI 사용량 기록: 수집일로부터 **최대 1년**",
            "친구 궁합 초대 링크: 만든 날로부터 **30일** 뒤 만료되며, 만료된 링크는 정리할 때 삭제",
            "커플 모드 연결: 어느 한쪽이 연결을 해제하면 **즉시 삭제**, 상대가 입력하지 않은 연결 코드는 **7일** 뒤 만료되어 삭제",
            "궁합 상세 리포트 구매 기록: 해당 구매로 리포트를 다시 열 수 있는 동안",
            "기기에 저장된 정보: 앱을 삭제하거나 설정의 ‘내 정보 초기화’를 하면 삭제(초기화하면 커플 모드 연결도 서버에서 해제)",
          ],
        },
        { type: "p", text: "보유 기간이 지나거나 이용자가 삭제를 요청하면 지체 없이 파기합니다. 전자적 파일은 복구할 수 없는 방법으로 삭제합니다." },
      ],
    },
    {
      heading: "4. 처리 위탁 및 국외 이전",
      body: [
        { type: "p", text: "서비스는 아래 업체에 정보 처리를 맡기며, 이 업체들의 서버는 미국에 있습니다. 정보는 서비스 이용 시점에 암호화된 네트워크(HTTPS)로 전송됩니다." },
        {
          type: "list",
          items: [
            "**OpenAI, L.L.C. (미국)** — AI 상담, 사주 Q&A 답변, 리포트, 월말 패턴 리포트 생성. 상담 대화·고른 질문·심리테스트 결과 요약·사주 계산 결과(그 사람 질문·궁합 리포트는 상대의 사주 계산 결과 포함)·월말 리포트용 저널 기록이 생성 요청에 담겨 전송됩니다. 보유 기간은 OpenAI의 API 데이터 정책을 따릅니다.",
            "**Supabase, Inc. (미국)** — 데이터베이스. 1항에서 서버에 저장한다고 적은 정보를 보관합니다. 보유 기간은 3항과 같습니다.",
            "**Vercel Inc. (미국)** — 웹사이트·API 서버 운영과 웹사이트 방문 통계.",
            "**RevenueCat, Inc. (미국)** — 앱 내 구매·구독 관리. 익명 사용자 식별자와 구매 내역을 처리합니다.",
            "**Apple Inc., Google LLC** — 앱 내 결제 처리와 앱 업데이트·알림 전달. 결제 정보는 각 회사의 개인정보처리방침을 따릅니다.",
          ],
        },
        { type: "p", text: "사주 계산은 서비스가 직접 만든 계산 엔진으로 서비스 서버 안에서 하며, 생년월일을 외부 계산 업체로 보내지 않습니다. 위 업체 외에는 이용자의 정보를 제3자에게 제공하지 않습니다." },
      ],
    },
    {
      heading: "5. 만 14세 미만 아동",
      body: [
        {
          type: "p",
          text: "본 서비스는 **만 14세 이상**만 이용할 수 있습니다. 만 14세 미만 아동의 정보를 의도적으로 수집하지 않으며, 만 14세 미만으로 확인되면 관련 정보를 삭제합니다.",
        },
      ],
    },
    {
      heading: "6. 이용자의 권리",
      body: [
        {
          type: "p",
          text: "이용자는 자신의 정보에 대해 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 기기에 저장된 정보는 앱 설정의 ‘내 정보 초기화’로 바로 지울 수 있고, 서버에 저장된 정보는 9항의 연락처나 데이터 삭제 요청 페이지(fatesaidapp.com/data-deletion)로 요청하실 수 있습니다. 로그인이 없는 구조상, 요청하신 분이 해당 정보의 이용자인지 확인하기 위해 입력하신 정보 일부를 여쭤볼 수 있습니다.",
        },
        {
          type: "p",
          text: "다른 사람의 정보를 입력하실 때는 그 사람이 동의하는지 먼저 확인해 주세요. 친구 궁합 초대 링크로 결과를 받는 친구에게는 입력 화면에서 동의를 받습니다.",
        },
      ],
    },
    {
      heading: "7. 안전성 확보 조치",
      body: [
        {
          type: "list",
          items: [
            "모든 통신 구간 암호화(HTTPS)",
            "인증 키는 서버 환경 변수로만 관리하고 앱·브라우저에 노출하지 않음",
            "데이터베이스는 서버만 접근할 수 있게 하고(행 수준 보안), 앱·브라우저에서 직접 읽을 수 없음",
            "초대 링크·커플 연결의 접근 토큰은 원문 대신 해시 값만 저장",
            "요청 횟수 제한으로 자동화된 남용 방지",
          ],
        },
      ],
    },
    {
      heading: "8. 자동 수집 장치",
      body: [
        {
          type: "p",
          text: "서비스는 광고 쿠키와 광고 식별자(IDFA·광고 ID)를 쓰지 않습니다. 웹사이트는 방문 통계를 위해 Vercel Web Analytics를 쓰고, 앱과 웹사이트는 1항의 이용 기록을 남기기 위해 기기·브라우저 저장소에 무작위 식별자를 저장합니다. 이 식별자는 앱 삭제, 브라우저 저장소 삭제로 지울 수 있습니다.",
        },
      ],
    },
    {
      heading: "9. 개인정보 보호책임자",
      body: [
        { type: "p", text: "개인정보 관련 문의와 요청은 아래로 연락해 주시기 바랍니다." },
        { type: "contact", label: "이메일", email: "435deed@gmail.com" },
        { type: "list", items: ["상호: 스튜디오 아론 (Studio Aaron)", "대표자: 권현조", "사업자등록번호: 230-38-01618", "통신판매업 신고번호: 제2026-경기시흥-2276호", "주소: 경기도 시흥시 새재로 19, 6층 6110호", "전화: 010-8757-2948", "개인정보 보호책임자: 권현조"] },
      ],
    },
    {
      heading: "10. 권익침해 구제방법",
      body: [
        { type: "p", text: "개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다." },
        {
          type: "list",
          items: [
            "개인정보보호위원회 (privacy.go.kr / 국번없이 182)",
            "개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)",
            "대검찰청 사이버범죄수사단 (spo.go.kr / 국번없이 1301)",
            "경찰청 사이버수사국 (ecrm.police.go.kr / 국번없이 182)",
          ],
        },
      ],
    },
    {
      heading: "11. 고지의 의무",
      body: [
        { type: "p", text: "본 방침이 변경되면 서비스 화면을 통해 알립니다. 이 방침은 2026년 10월 7일부터 적용됩니다." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "본 방침은 법률 전문가 검토 전 초안입니다." },
      ],
    },
  ],
};

const termsKo: LegalDocument = {
  title: "이용약관",
  updatedAt: "2026년 10월 7일",
  sections: [
    {
      heading: "제1조 (목적)",
      body: [
        { type: "p", text: "이 약관은 “Fatesaid”(이하 “서비스”)가 웹사이트와 모바일 앱으로 제공하는 사주 분석, 운세, 심리테스트, AI 상담, 리포트 등의 이용과 관련하여 서비스 운영자와 이용자 사이의 권리, 의무, 책임을 정합니다." },
      ],
    },
    {
      heading: "제2조 (정의)",
      body: [
        {
          type: "list",
          items: [
            "“서비스”란 웹사이트(fatesaidapp.com)와 Fatesaid 모바일 앱으로 제공되는 모든 기능을 말합니다.",
            "“이용자”란 이 약관에 따라 서비스를 이용하는 사람을 말합니다.",
            "“유료 서비스”란 앱 안에서 Apple App Store 또는 Google Play 결제로 구매하는 구독과 단건 콘텐츠를 말합니다.",
          ],
        },
      ],
    },
    {
      heading: "제3조 (약관의 게시와 개정)",
      body: [
        { type: "p", text: "운영자는 이 약관을 서비스 화면에 게시합니다. 약관은 관련 법령을 위반하지 않는 범위에서 개정될 수 있으며, 개정하면 적용일과 개정 내용을 적용일 7일 전부터(이용자에게 불리한 변경은 30일 전부터) 서비스 화면에 알립니다." },
      ],
    },
    {
      heading: "제4조 (서비스의 내용)",
      body: [
        { type: "p", text: "**무료로 제공하는 기능**: 사주 원국 계산, 사주 유형, 오늘 운세 총론, 심리테스트와 AI 상담, 리포트 미리보기, 궁합 결과, 친구 궁합 초대, 그룹 케미 맵, 사주 Q&A 하루 정해진 개수, 한 줄 저널 등" },
        {
          type: "p",
          text: "**유료 서비스**: (1) 구독 “Fatesaid Pro” — 운세 전체(오늘·주간·월간·연간), 사주 Q&A 하루 최대 10개, ‘특정한 사람에 대해’ 질문, 월말 패턴 리포트, 커플 모드 등. (2) 단건 구매 — 심리테스트별 심층 리포트와 전체 묶음, 신년 리포트, 궁합 상세 리포트(상대 한 사람당 1회).",
        },
        { type: "p", text: "각 유료 서비스의 내용과 가격은 구매 화면에 표시된 내용을 따릅니다. 운영자는 서비스 개선을 위해 기능을 바꾸거나 추가할 수 있으며, 이미 구매한 유료 콘텐츠의 핵심 내용을 줄이는 변경은 하지 않습니다." },
      ],
    },
    {
      heading: "제5조 (유료 서비스의 결제와 구독)",
      body: [
        {
          type: "list",
          items: [
            "결제는 Apple App Store 또는 Google Play를 통해 이루어지며, 결제·영수증·결제 수단은 각 스토어의 약관을 따릅니다.",
            "구독은 선택한 기간(월간 또는 연간)마다 **자동으로 갱신**됩니다. 현재 기간이 끝나기 최소 24시간 전에 해지하지 않으면 다음 기간 요금이 청구됩니다. 해지는 기기의 App Store 또는 Google Play 구독 설정에서 할 수 있고, 해지해도 이미 결제한 기간이 끝날 때까지 이용할 수 있습니다.",
            "무료 체험이 제공되는 경우, 체험 기간이 끝나면 자동으로 유료 구독으로 전환됩니다. 체험 기간이 끝나기 최소 24시간 전에 해지하면 요금이 청구되지 않습니다. 무료 체험은 스토어 규칙에 따라 처음 구독하는 이용자에게만 제공될 수 있습니다.",
            "심층 리포트·묶음·신년 리포트는 한 번 구매하면 계속 이용할 수 있으며, 같은 스토어 계정에서 ‘구매 복원’으로 다시 열 수 있습니다.",
            "궁합 상세 리포트는 구매한 두 사람의 조합에만 쓰입니다. 구매한 리포트는 기기에 저장되므로, 앱을 삭제하거나 기기를 바꾸면 다시 열지 못할 수 있습니다.",
          ],
        },
      ],
    },
    {
      heading: "제6조 (청약철회와 환불)",
      body: [
        { type: "p", text: "유료 서비스의 환불은 결제한 스토어의 환불 절차를 따릅니다(Apple: reportaproblem.apple.com, Google Play: 주문 내역의 환불 요청). 관련 법령이 보장하는 청약철회 등 이용자의 권리는 이 약관으로 제한되지 않습니다. 결제나 이용 권한에 문제가 있으면 개인정보처리방침에 적힌 연락처로 알려 주시기 바랍니다." },
      ],
    },
    {
      heading: "제7조 (이용 제한)",
      body: [
        { type: "p", text: "본 서비스는 **만 14세 이상**만 이용할 수 있습니다. 운영자는 이용자의 나이를 별도로 확인하지 않으므로, 만 14세 미만이 이용하지 않도록 보호자의 지도가 필요합니다." },
      ],
    },
    {
      heading: "제8조 (이용자의 의무)",
      body: [
        { type: "p", text: "이용자는 서비스를 이용할 때 다음 행위를 해서는 안 됩니다." },
        {
          type: "list",
          items: [
            "다른 사람의 정보를 그 사람의 동의 없이 입력하거나, 그 결과로 다른 사람을 괴롭히거나 평가하는 행위",
            "서비스의 정상적인 운영을 방해하는 행위(과도한 반복 요청, 자동화된 접근, 결제 우회 시도 등)",
            "서비스에서 얻은 콘텐츠를 운영자의 동의 없이 영리 목적으로 재배포하는 행위",
            "AI 상담에 서비스 목적과 무관하거나 부적절한 요청(시스템 지시 무시 유도 등)을 반복하는 행위",
          ],
        },
      ],
    },
    {
      heading: "제9조 (서비스 내용에 대한 중요 안내 — 진단이 아닙니다)",
      headingColor: "#6FA98B",
      body: [
        {
          type: "p",
          text: "서비스가 제공하는 사주 풀이, 운세, 궁합, 심리테스트 결과, AI 상담 응답과 리포트는 **자기 이해를 돕기 위한 참고 자료**입니다. 의학적·심리학적 진단이 아니고, 전문적인 상담·치료나 법률·재무·의료 판단을 대신하지 않으며, 미래를 보장하지 않습니다. AI가 만든 내용은 부정확하거나 이용자의 실제 상황과 다를 수 있습니다. 중요한 결정은 서비스 결과만으로 내리지 마시기 바랍니다.",
        },
        {
          type: "p",
          text: "정신건강과 관련해 어려움을 겪고 계시다면 전문 의료기관이나 상담기관을 찾아 주세요. 위급한 경우 자살예방상담전화(109) 또는 정신건강위기상담전화(1577-0199)로 24시간 상담받으실 수 있습니다.",
        },
      ],
    },
    {
      heading: "제10조 (지식재산권)",
      body: [
        { type: "p", text: "서비스의 텍스트, 디자인, 계산 엔진, 소프트웨어에 대한 권리는 운영자에게 있습니다. 이용자는 서비스가 제공하는 공유 기능으로 자기 결과를 개인적으로 공유할 수 있으나, 운영자의 동의 없이 서비스 콘텐츠를 복제·배포하거나 상업적으로 이용할 수 없습니다." },
      ],
    },
    {
      heading: "제11조 (면책)",
      body: [
        {
          type: "list",
          items: [
            "운영자는 AI가 생성한 내용의 정확성과 완전성을 보증하지 않으며, 이를 근거로 한 이용자의 판단과 그 결과에 대해 관련 법령이 허용하는 범위에서 책임을 지지 않습니다.",
            "천재지변, 이용 중인 외부 서비스(OpenAI, 호스팅, 결제 서비스 등)의 장애 등 운영자가 통제할 수 없는 사유로 서비스가 중단되면 운영자의 책임이 면제됩니다. 다만 유료 서비스 이용에 생긴 문제는 관련 법령에 따라 처리합니다.",
            "운영자는 무료로 제공하는 기능과 관련하여 관련 법령에 특별한 규정이 없는 한 이용자에게 생긴 손해에 대해 책임을 지지 않습니다.",
          ],
        },
      ],
    },
    {
      heading: "제12조 (준거법 및 관할)",
      body: [
        { type: "p", text: "이 약관은 대한민국 법령에 따라 해석되며, 서비스와 관련한 분쟁은 관련 법령이 정한 절차에 따릅니다. 다만 이용자가 거주하는 나라의 소비자 보호 법령이 이용자에게 더 유리한 권리를 보장하는 경우, 그 권리는 이 약관으로 제한되지 않습니다." },
      ],
    },
    {
      heading: "운영자 정보",
      body: [
        { type: "list", items: ["상호: 스튜디오 아론 (Studio Aaron)", "대표자: 권현조", "사업자등록번호: 230-38-01618", "통신판매업 신고번호: 제2026-경기시흥-2276호", "주소: 경기도 시흥시 새재로 19, 6층 6110호", "전화: 010-8757-2948"] },
      ],
    },
    {
      heading: "부칙",
      body: [
        { type: "p", text: "이 약관은 2026년 10월 7일부터 시행합니다." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "본 약관은 법률 전문가 검토 전 초안입니다." },
      ],
    },
  ],
};

const privacyEn: LegalDocument = {
  title: "Privacy Policy",
  updatedAt: "October 7, 2026",
  sections: [
    {
      body: [
        {
          type: "p",
          text: "“Fatesaid” (the “Service”) is offered through our website (fatesaidapp.com) and mobile app, and handles personal information in line with the Personal Information Protection Act of the Republic of Korea and other applicable laws. This policy explains what we collect, what we use it for, how long we keep it and how we delete it.",
        },
        {
          type: "p",
          style: "highlight",
          text: "The Service works without an account. We don't collect your name, email address, password or phone number, and payment details (such as card numbers) are handled by Apple and Google — we never receive them.",
        },
      ],
    },
    {
      heading: "1. What We Collect",
      body: [
        { type: "p", text: "**Information you enter**" },
        {
          type: "list",
          items: [
            "Display name (nickname), birth date, gender, birth time (optional, can be “unknown”), birth city (optional), and the topic on your mind",
            "Your answers to the personality test (30 multiple-choice and slider questions)",
            "What you write in the AI conversation",
            "The questions you pick in Saju Q&A",
          ],
        },
        { type: "p", text: "**Information about other people**" },
        {
          type: "list",
          items: [
            "When you use Compatibility, “About someone” questions or the Group chemistry map, the other person's birth date, gender, birth time and display name that you enter. We use them only within the request that calculates the result and don't store them on our servers (except the compatibility report purchase record below).",
            "Compatibility report purchase record: so that one purchase is used for one pair of people only, we keep the two people's details as an irreversible value (a cryptographic hash) together with the purchase transaction number. The birth dates themselves are not kept.",
            "Friend compatibility invite links: the sender's display name and Day Master (the one central character of their chart), language, and the friend's display name (optional) and result (Day Master, saju type, strongest element). The friend's birth date is used only within the request that calculates the result and is not stored.",
            "Couple mode: both people's display names, Day Master and day branch (one chart character each), and the payment service (RevenueCat) user identifier used to check the subscription. Birth dates are not stored.",
          ],
        },
        { type: "p", text: "**Information created while you use the Service**" },
        {
          type: "list",
          items: [
            "Anonymous session identifier: a random value that ties your entries and results together without an account",
            "Usage records: which screens are opened, which buttons are tapped, purchase attempts and results, and 👍/👎 on answers. They're tied to a random identifier created on your device (app) or browser (website) and never include birth dates, names or anything you type.",
            "Purchase information: the anonymous user identifier the payment service (RevenueCat) creates for each app install, and your purchase and subscription history",
            "AI usage records: the type of request and the number of tokens used (never the text of conversations or questions)",
            "Connection information: IP address and device/browser details. We use it to stop excessive requests and don't store it in our database (it may appear in our hosting provider's access logs).",
          ],
        },
        { type: "p", text: "**Information kept only on your device and not sent to our servers**" },
        {
          type: "list",
          items: [
            "Your one-line journal (mood and a short note). When you create a monthly pattern report, that month's entries are sent with the request; the server uses them only to write the report and doesn't store them.",
            "Copies of reports you bought, notification settings, Day Master lesson progress, Saju Q&A topic counts, and what the home screen widget shows",
          ],
        },
      ],
    },
    {
      heading: "2. How We Use It",
      body: [
        {
          type: "list",
          items: [
            "Calculating your saju chart and element balance, and providing fortunes, compatibility and reports",
            "Scoring the personality test, and writing AI conversation replies, Saju Q&A answers and reports",
            "Confirming purchases and managing access to paid features",
            "Friend compatibility invites and couple mode",
            "Analyzing and improving the Service (usage records), finding errors, and preventing abuse",
          ],
        },
        { type: "p", text: "We don't use your information for advertising or for tracking you across other companies' apps and websites." },
      ],
    },
    {
      heading: "3. Retention and Deletion",
      body: [
        {
          type: "list",
          items: [
            "Your entries, test answers, AI conversation and report results (stored with the anonymous session identifier): **up to 1 year** from collection",
            "Usage records and AI usage records: **up to 1 year** from collection",
            "Friend compatibility invite links: expire **30 days** after creation and are deleted when expired links are cleared",
            "Couple mode: **deleted immediately** when either person unlinks; a code the partner never entered expires and is deleted after **7 days**",
            "Compatibility report purchase records: for as long as that purchase can reopen the report",
            "Information on your device: deleted when you delete the app or use “Reset my info” in Settings (resetting also unlinks couple mode on our server)",
          ],
        },
        { type: "p", text: "When a retention period ends or you ask us to delete your information, we delete it without delay, in a way that can't be recovered." },
      ],
    },
    {
      heading: "4. Service Providers and International Transfers",
      body: [
        { type: "p", text: "We use the providers below, whose servers are in the United States. Information is sent over an encrypted connection (HTTPS) when you use the related feature." },
        {
          type: "list",
          items: [
            "**OpenAI, L.L.C. (USA)** — writes AI conversation replies, Saju Q&A answers, reports and monthly pattern reports. Requests contain your conversation, the question you picked, a summary of your test results and your saju calculation (for “About someone” questions and the compatibility report, also the other person's saju calculation), and for the monthly report, that month's journal entries. Retention follows OpenAI's API data policy.",
            "**Supabase, Inc. (USA)** — database. Stores the information section 1 says is kept on our servers, for the periods in section 3.",
            "**Vercel Inc. (USA)** — runs the website and API servers, and provides website visit statistics.",
            "**RevenueCat, Inc. (USA)** — manages in-app purchases and subscriptions; processes the anonymous user identifier and purchase history.",
            "**Apple Inc., Google LLC** — process in-app payments and deliver app updates and notifications. Payment information follows each company's privacy policy.",
          ],
        },
        { type: "p", text: "Saju charts are calculated by our own engine on our own servers; birth dates are not sent to any outside calculation provider. We don't share your information with any third party other than the providers above." },
      ],
    },
    {
      heading: "5. Children Under 14",
      body: [
        {
          type: "p",
          text: "The Service is for people **aged 14 and over** only. We don't knowingly collect information from children under 14, and we delete it if we learn a user is under 14.",
        },
      ],
    },
    {
      heading: "6. Your Rights",
      body: [
        {
          type: "p",
          text: "You can ask to access, correct, delete or stop the processing of your information. Information on your device can be cleared right away with “Reset my info” in the app's Settings; for information on our servers, contact us at the address in section 9 or use the data deletion page (fatesaidapp.com/data-deletion). Because there are no accounts, we may ask about some of the details you entered to confirm the information is yours.",
        },
        {
          type: "p",
          text: "Before entering someone else's details, please make sure they agree. A friend who answers a compatibility invite link is asked for consent on the entry screen.",
        },
      ],
    },
    {
      heading: "7. Security Measures",
      body: [
        {
          type: "list",
          items: [
            "Encryption of all connections (HTTPS)",
            "API keys kept only in server environment variables, never exposed to the app or browser",
            "The database is reachable only by our server (row-level security); the app and browser can't read it directly",
            "Access tokens for invite links and couple mode are stored only as hashes",
            "Request rate limits against automated abuse",
          ],
        },
      ],
    },
    {
      heading: "8. Cookies and Similar Technologies",
      body: [
        {
          type: "p",
          text: "We don't use advertising cookies or advertising identifiers (IDFA / Advertising ID). The website uses Vercel Web Analytics for visit statistics, and the app and website store a random identifier in device or browser storage for the usage records in section 1. You can remove it by deleting the app or clearing your browser storage.",
        },
      ],
    },
    {
      heading: "9. Privacy Contact",
      body: [
        { type: "p", text: "For privacy questions and requests, please contact:" },
        { type: "contact", label: "Email", email: "435deed@gmail.com" },
        { type: "list", items: ["Business name: Studio Aaron (스튜디오 아론)", "Representative: Aaron Kwon (Hyunjo Kwon)", "Business registration number: 230-38-01618", "Mail-order business registration: 2026-Gyeonggi Siheung-2276", "Address: Room 6110, 6F, 19 Saejae-ro, Siheung-si, Gyeonggi-do, Republic of Korea", "Phone: +82 10-8757-2948", "Privacy officer: Aaron Kwon (Hyunjo Kwon)"] },
      ],
    },
    {
      heading: "10. Remedies",
      body: [
        { type: "p", text: "If you need to report or get advice about a privacy issue, you can contact the following Korean authorities, or the data protection authority where you live." },
        {
          type: "list",
          items: [
            "Personal Information Protection Commission (privacy.go.kr / dial 182 in Korea)",
            "Personal Information Infringement Report Center (privacy.kisa.or.kr / dial 118 in Korea)",
            "Supreme Prosecutors' Office Cybercrime Investigation (spo.go.kr / dial 1301 in Korea)",
            "Korean National Police Agency Cyber Bureau (ecrm.police.go.kr / dial 182 in Korea)",
          ],
        },
      ],
    },
    {
      heading: "11. Changes to This Policy",
      body: [
        { type: "p", text: "If this policy changes, we'll let you know in the Service. This policy applies from October 7, 2026." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "This policy is a draft that has not yet been reviewed by a legal professional." },
      ],
    },
  ],
};

const termsEn: LegalDocument = {
  title: "Terms of Service",
  updatedAt: "October 7, 2026",
  sections: [
    {
      heading: "Article 1 (Purpose)",
      body: [
        { type: "p", text: "These Terms set out the rights, obligations and responsibilities between the operator of “Fatesaid” (the “Service”) and its users regarding the saju readings, fortunes, personality tests, AI conversations, reports and other features offered through the website and mobile app." },
      ],
    },
    {
      heading: "Article 2 (Definitions)",
      body: [
        {
          type: "list",
          items: [
            "“Service” means all features offered through the website (fatesaidapp.com) and the Fatesaid mobile app.",
            "“User” means anyone who uses the Service under these Terms.",
            "“Paid Services” means subscriptions and one-time content bought in the app through the Apple App Store or Google Play.",
          ],
        },
      ],
    },
    {
      heading: "Article 3 (Posting and Changes)",
      body: [
        { type: "p", text: "The operator posts these Terms in the Service. They may be changed within the limits of applicable law; we'll announce the change and its effective date in the Service at least 7 days in advance (30 days for changes unfavorable to users)." },
      ],
    },
    {
      heading: "Article 4 (What the Service Includes)",
      body: [
        { type: "p", text: "**Free features**: your saju chart, saju type, today's fortune overview, personality tests and AI conversation, report previews, compatibility results, friend compatibility invites, the Group chemistry map, a daily number of Saju Q&A questions, the one-line journal, and more." },
        {
          type: "p",
          text: "**Paid Services**: (1) the “Fatesaid Pro” subscription — full fortunes (today, week, month, year), up to 10 Saju Q&A questions a day, “About someone” questions, monthly pattern reports, couple mode and more; (2) one-time purchases — the in-depth report for each test and the all-reports bundle, the year-ahead report, and the compatibility report (once per other person).",
        },
        { type: "p", text: "What each Paid Service includes and its price are as shown on the purchase screen. The operator may change or add features to improve the Service, but won't remove the core content of paid content you already bought." },
      ],
    },
    {
      heading: "Article 5 (Payments and Subscriptions)",
      body: [
        {
          type: "list",
          items: [
            "Payments are made through the Apple App Store or Google Play; payment, receipts and payment methods follow that store's terms.",
            "Subscriptions **renew automatically** for the period you chose (monthly or yearly). You'll be charged for the next period unless you cancel at least 24 hours before the current period ends. You can cancel in your device's App Store or Google Play subscription settings, and keep access until the end of the period you've paid for.",
            "If a free trial is offered, it turns into a paid subscription automatically when it ends. Cancel at least 24 hours before the trial ends and you won't be charged. Under store rules, free trials may be available only to first-time subscribers.",
            "In-depth reports, the bundle and the year-ahead report stay available once bought and can be reopened with “Restore purchases” on the same store account.",
            "A compatibility report applies only to the pair of people it was bought for. Bought reports are saved on your device, so you may not be able to reopen them after deleting the app or changing devices.",
          ],
        },
      ],
    },
    {
      heading: "Article 6 (Cancellation and Refunds)",
      body: [
        { type: "p", text: "Refunds for Paid Services follow the refund process of the store you paid through (Apple: reportaproblem.apple.com; Google Play: request a refund from your order history). These Terms don't limit any cancellation or refund rights you have under applicable law. If something is wrong with a payment or your access, please contact us at the address in the Privacy Policy." },
      ],
    },
    {
      heading: "Article 7 (Age Requirement)",
      body: [
        { type: "p", text: "The Service is for people **aged 14 and over** only. The operator doesn't verify users' ages, so parents or guardians should make sure children under 14 don't use it." },
      ],
    },
    {
      heading: "Article 8 (User Obligations)",
      body: [
        { type: "p", text: "When using the Service, you must not:" },
        {
          type: "list",
          items: [
            "Enter someone else's details without their consent, or use the results to harass or judge another person",
            "Interfere with the normal operation of the Service (excessive repeated requests, automated access, attempts to bypass payment, etc.)",
            "Redistribute content from the Service for commercial purposes without the operator's consent",
            "Repeatedly send the AI conversation requests unrelated to the Service's purpose or inappropriate requests (such as trying to make it ignore its instructions)",
          ],
        },
      ],
    },
    {
      heading: "Article 9 (Important Notice — Not a Diagnosis)",
      headingColor: "#6FA98B",
      body: [
        {
          type: "p",
          text: "The saju readings, fortunes, compatibility results, personality test results, AI replies and reports provided by the Service are **reference material to support self-understanding**. They are not a medical or psychological diagnosis, don't replace professional counseling or treatment or legal, financial or medical advice, and don't guarantee the future. AI-written content may be inaccurate or differ from your actual situation. Please don't make important decisions based on the Service's results alone.",
        },
        {
          type: "p",
          text: "If you're struggling with your mental health, please reach out to a medical professional or counseling service. In an emergency, contact your local emergency services or a crisis line (in the US, call or text 988).",
        },
      ],
    },
    {
      heading: "Article 10 (Intellectual Property)",
      body: [
        { type: "p", text: "Rights to the Service's text, design, calculation engine and software belong to the operator. You may share your own results personally using the Service's sharing features, but may not copy, distribute or commercially use the Service's content without the operator's consent." },
      ],
    },
    {
      heading: "Article 11 (Disclaimer)",
      body: [
        {
          type: "list",
          items: [
            "The operator doesn't guarantee the accuracy or completeness of AI-written content and, to the extent permitted by law, isn't responsible for decisions you make based on it or their outcomes.",
            "The operator isn't responsible for interruptions caused by events beyond its control, such as natural disasters or outages of outside services we rely on (OpenAI, hosting, payment services, etc.). Problems affecting Paid Services are handled as required by applicable law.",
            "Unless applicable law provides otherwise, the operator isn't responsible for damages related to features provided free of charge.",
          ],
        },
      ],
    },
    {
      heading: "Article 12 (Governing Law and Jurisdiction)",
      body: [
        { type: "p", text: "These Terms are governed by the laws of the Republic of Korea, and disputes related to the Service follow the procedures set by applicable law. If the consumer protection laws of the country where you live give you more favorable rights, these Terms don't limit those rights." },
      ],
    },
    {
      heading: "Operator",
      body: [
        { type: "list", items: ["Business name: Studio Aaron (스튜디오 아론)", "Representative: Aaron Kwon (Hyunjo Kwon)", "Business registration number: 230-38-01618", "Mail-order business registration: 2026-Gyeonggi Siheung-2276", "Address: Room 6110, 6F, 19 Saejae-ro, Siheung-si, Gyeonggi-do, Republic of Korea", "Phone: +82 10-8757-2948"] },
      ],
    },
    {
      heading: "Addendum",
      body: [
        { type: "p", text: "These Terms take effect on October 7, 2026." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "These Terms are a draft that has not yet been reviewed by a legal professional." },
      ],
    },
  ],
};

const privacyEs: LegalDocument = {
  title: "Política de privacidad",
  updatedAt: "7 de octubre de 2026",
  sections: [
    {
      body: [
        {
          type: "p",
          text: "“Fatesaid” (el “Servicio”) se ofrece en nuestro sitio web (fatesaidapp.com) y en la app móvil, y trata la información personal conforme a la Ley de Protección de Información Personal de la República de Corea y demás leyes aplicables. Esta política explica qué recopilamos, para qué lo usamos, cuánto tiempo lo guardamos y cómo lo eliminamos.",
        },
        {
          type: "p",
          style: "highlight",
          text: "El Servicio funciona sin cuenta. No recopilamos tu nombre, correo electrónico, contraseña ni número de teléfono, y los datos de pago (como el número de tarjeta) los gestionan Apple y Google: nunca nos llegan.",
        },
      ],
    },
    {
      heading: "1. Qué recopilamos",
      body: [
        { type: "p", text: "**Información que introduces**" },
        {
          type: "list",
          items: [
            "Nombre visible (apodo), fecha de nacimiento, género, hora de nacimiento (opcional, puede quedar como “no la sé”), ciudad de nacimiento (opcional) y el tema que te interesa",
            "Tus respuestas al test de personalidad (30 preguntas de opción múltiple y de deslizador)",
            "Lo que escribes en la conversación con la IA",
            "Las preguntas que eliges en Preguntas de saju",
          ],
        },
        { type: "p", text: "**Información sobre otras personas**" },
        {
          type: "list",
          items: [
            "Cuando usas Compatibilidad, las preguntas “Sobre una persona” o el Mapa de química del grupo, la fecha de nacimiento, el género, la hora de nacimiento y el nombre visible de otra persona que introduces. Solo los usamos dentro de la solicitud que calcula el resultado y no los guardamos en nuestros servidores (salvo el registro de compra del informe de compatibilidad que se describe abajo).",
            "Registro de compra del informe de compatibilidad: para que una compra sirva para una sola pareja de personas, guardamos los datos de ambas convertidos en un valor irreversible (un hash criptográfico) junto con el número de la transacción. Las fechas de nacimiento no se conservan.",
            "Enlaces de invitación de compatibilidad: el nombre visible y el Maestro del Día (el carácter central de la carta) de quien envía, el idioma, y el nombre visible (opcional) y el resultado de la amistad que responde (Maestro del Día, tipo de saju, elemento más presente). Su fecha de nacimiento solo se usa dentro de la solicitud que calcula el resultado y no se guarda.",
            "Modo pareja: los nombres visibles de ambas personas, su Maestro del Día y su rama del día (un carácter de la carta cada uno) y el identificador de usuario del servicio de pagos (RevenueCat) que usamos para comprobar la suscripción. No guardamos fechas de nacimiento.",
          ],
        },
        { type: "p", text: "**Información que se genera al usar el Servicio**" },
        {
          type: "list",
          items: [
            "Identificador de sesión anónimo: un valor aleatorio que agrupa tus datos y resultados sin necesidad de cuenta",
            "Registros de uso: qué pantallas se abren, qué botones se tocan, los intentos y resultados de compra, y el 👍/👎 sobre las respuestas. Se asocian a un identificador aleatorio creado en tu dispositivo (app) o navegador (sitio web) y nunca incluyen fechas de nacimiento, nombres ni lo que escribes.",
            "Información de compra: el identificador de usuario anónimo que el servicio de pagos (RevenueCat) crea para cada instalación de la app, y tu historial de compras y suscripciones",
            "Registros de uso de la IA: el tipo de solicitud y la cantidad de tokens usados (nunca el texto de las conversaciones ni de las preguntas)",
            "Datos de conexión: dirección IP y datos del dispositivo o navegador. Los usamos para frenar solicitudes excesivas y no los guardamos en nuestra base de datos (pueden aparecer en los registros de acceso de nuestro proveedor de alojamiento).",
          ],
        },
        { type: "p", text: "**Información que se queda solo en tu dispositivo y no se envía a nuestros servidores**" },
        {
          type: "list",
          items: [
            "Tu diario de una línea (estado de ánimo y una nota breve). Cuando creas el informe mensual de patrones, las entradas de ese mes se envían con la solicitud; el servidor solo las usa para escribir el informe y no las guarda.",
            "Copias de los informes que compraste, ajustes de notificaciones, progreso de las lecciones del Maestro del Día, el recuento de temas de Preguntas de saju y lo que muestra el widget de la pantalla de inicio",
          ],
        },
      ],
    },
    {
      heading: "2. Para qué la usamos",
      body: [
        {
          type: "list",
          items: [
            "Calcular tu carta de saju y el equilibrio de los cinco elementos, y ofrecer lecturas del día, compatibilidad e informes",
            "Puntuar el test de personalidad y escribir las respuestas de la conversación con la IA, de Preguntas de saju y los informes",
            "Confirmar compras y gestionar el acceso a las funciones de pago",
            "Las invitaciones de compatibilidad y el modo pareja",
            "Analizar y mejorar el Servicio (registros de uso), detectar errores y prevenir abusos",
          ],
        },
        { type: "p", text: "No usamos tu información para publicidad ni para seguirte a través de apps y sitios web de otras empresas." },
      ],
    },
    {
      heading: "3. Conservación y eliminación",
      body: [
        {
          type: "list",
          items: [
            "Tus datos, respuestas del test, conversación con la IA y resultados de informes (guardados con el identificador de sesión anónimo): **hasta 1 año** desde su recopilación",
            "Registros de uso y de uso de la IA: **hasta 1 año** desde su recopilación",
            "Enlaces de invitación de compatibilidad: caducan **30 días** después de crearse y se eliminan cuando se depuran los enlaces caducados",
            "Modo pareja: **se elimina de inmediato** cuando cualquiera de las dos personas lo desvincula; un código que la otra persona nunca introdujo caduca y se elimina a los **7 días**",
            "Registros de compra del informe de compatibilidad: mientras esa compra permita volver a abrir el informe",
            "Información en tu dispositivo: se elimina al borrar la app o al usar “Restablecer mis datos” en Ajustes (restablecer también desvincula el modo pareja en nuestro servidor)",
          ],
        },
        { type: "p", text: "Cuando termina el plazo de conservación o nos pides eliminar tu información, la borramos sin demora y de forma que no pueda recuperarse." },
      ],
    },
    {
      heading: "4. Proveedores y transferencias internacionales",
      body: [
        { type: "p", text: "Trabajamos con los proveedores siguientes, cuyos servidores están en Estados Unidos. La información se envía por una conexión cifrada (HTTPS) cuando usas la función correspondiente." },
        {
          type: "list",
          items: [
            "**OpenAI, L.L.C. (EE. UU.)**: escribe las respuestas de la conversación con la IA, de Preguntas de saju, los informes y los informes mensuales de patrones. Las solicitudes incluyen tu conversación, la pregunta que elegiste, un resumen de tus resultados del test y el cálculo de tu saju (en las preguntas “Sobre una persona” y en el informe de compatibilidad, también el cálculo de la otra persona) y, para el informe mensual, las entradas del diario de ese mes. La conservación sigue la política de datos de la API de OpenAI.",
            "**Supabase, Inc. (EE. UU.)**: base de datos. Guarda la información que el apartado 1 indica que se conserva en nuestros servidores, durante los plazos del apartado 3.",
            "**Vercel Inc. (EE. UU.)**: aloja el sitio web y los servidores de la API, y ofrece estadísticas de visitas del sitio web.",
            "**RevenueCat, Inc. (EE. UU.)**: gestiona las compras y suscripciones dentro de la app; trata el identificador de usuario anónimo y el historial de compras.",
            "**Apple Inc., Google LLC**: procesan los pagos dentro de la app y entregan las actualizaciones y notificaciones de la app. La información de pago sigue la política de privacidad de cada empresa.",
          ],
        },
        { type: "p", text: "Las cartas de saju se calculan con nuestro propio motor en nuestros propios servidores; las fechas de nacimiento no se envían a ningún proveedor externo de cálculo. No compartimos tu información con terceros fuera de los proveedores anteriores." },
      ],
    },
    {
      heading: "5. Menores de 14 años",
      body: [
        {
          type: "p",
          text: "El Servicio es solo para personas **de 14 años o más**. No recopilamos a sabiendas información de menores de 14 años y, si sabemos que alguien es menor de 14, la eliminamos.",
        },
      ],
    },
    {
      heading: "6. Tus derechos",
      body: [
        {
          type: "p",
          text: "Puedes pedir acceder a tu información, corregirla, eliminarla o detener su tratamiento. La información de tu dispositivo se borra al momento con “Restablecer mis datos” en los Ajustes de la app; para la información de nuestros servidores, escríbenos a la dirección del apartado 9 o usa la página de eliminación de datos (fatesaidapp.com/data-deletion). Como no hay cuentas, quizá te preguntemos por algunos de los datos que introdujiste para confirmar que la información es tuya.",
        },
        {
          type: "p",
          text: "Antes de introducir los datos de otra persona, asegúrate de que está de acuerdo. A quien responde un enlace de invitación de compatibilidad le pedimos su consentimiento en la pantalla de entrada.",
        },
      ],
    },
    {
      heading: "7. Medidas de seguridad",
      body: [
        {
          type: "list",
          items: [
            "Cifrado de todas las conexiones (HTTPS)",
            "Claves de API guardadas solo en variables de entorno del servidor, nunca expuestas a la app ni al navegador",
            "La base de datos solo es accesible desde nuestro servidor (seguridad a nivel de fila); la app y el navegador no pueden leerla directamente",
            "Los tokens de acceso de los enlaces de invitación y del modo pareja se guardan solo como hash",
            "Límites de solicitudes contra el abuso automatizado",
          ],
        },
      ],
    },
    {
      heading: "8. Cookies y tecnologías similares",
      body: [
        {
          type: "p",
          text: "No usamos cookies publicitarias ni identificadores de publicidad (IDFA / ID de publicidad). El sitio web usa Vercel Web Analytics para estadísticas de visitas, y la app y el sitio web guardan un identificador aleatorio en el almacenamiento del dispositivo o del navegador para los registros de uso del apartado 1. Puedes quitarlo borrando la app o el almacenamiento de tu navegador.",
        },
      ],
    },
    {
      heading: "9. Contacto de privacidad",
      body: [
        { type: "p", text: "Para preguntas y solicitudes sobre privacidad, escríbenos a:" },
        { type: "contact", label: "Correo electrónico", email: "435deed@gmail.com" },
        { type: "list", items: ["Nombre comercial: Studio Aaron (스튜디오 아론)", "Representante: Aaron Kwon (Hyunjo Kwon)", "Número de registro empresarial: 230-38-01618", "Registro de venta a distancia: 2026-Gyeonggi Siheung-2276", "Dirección: Oficina 6110, planta 6, 19 Saejae-ro, Siheung-si, Gyeonggi-do, República de Corea", "Teléfono: +82 10-8757-2948", "Responsable de privacidad: Aaron Kwon (Hyunjo Kwon)"] },
      ],
    },
    {
      heading: "10. Vías de reclamación",
      body: [
        { type: "p", text: "Si necesitas denunciar o consultar un problema de privacidad, puedes acudir a las siguientes autoridades de Corea o a la autoridad de protección de datos de tu país." },
        {
          type: "list",
          items: [
            "Comisión de Protección de Información Personal (privacy.go.kr / 182 desde Corea)",
            "Centro de Denuncias de Vulneración de Información Personal (privacy.kisa.or.kr / 118 desde Corea)",
            "Unidad de Investigación de Ciberdelitos de la Fiscalía Suprema (spo.go.kr / 1301 desde Corea)",
            "Oficina de Ciberinvestigación de la Policía Nacional de Corea (ecrm.police.go.kr / 182 desde Corea)",
          ],
        },
      ],
    },
    {
      heading: "11. Cambios en esta política",
      body: [
        { type: "p", text: "Si esta política cambia, te lo indicaremos en el Servicio. Esta política se aplica desde el 7 de octubre de 2026." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "Esta política es un borrador que todavía no ha revisado un profesional del derecho." },
      ],
    },
  ],
};

const termsEs: LegalDocument = {
  title: "Términos del servicio",
  updatedAt: "7 de octubre de 2026",
  sections: [
    {
      heading: "Artículo 1 (Objeto)",
      body: [
        { type: "p", text: "Estos Términos establecen los derechos, obligaciones y responsabilidades entre quien opera “Fatesaid” (el “Servicio”) y las personas que lo usan, en relación con las lecturas de saju, lecturas del día, tests de personalidad, conversaciones con IA, informes y demás funciones del sitio web y la app móvil." },
      ],
    },
    {
      heading: "Artículo 2 (Definiciones)",
      body: [
        {
          type: "list",
          items: [
            "“Servicio”: todas las funciones que se ofrecen en el sitio web (fatesaidapp.com) y en la app móvil Fatesaid.",
            "“Usuario”: cualquier persona que usa el Servicio conforme a estos Términos.",
            "“Servicios de pago”: las suscripciones y el contenido de compra única que se adquieren dentro de la app a través de Apple App Store o Google Play.",
          ],
        },
      ],
    },
    {
      heading: "Artículo 3 (Publicación y cambios)",
      body: [
        { type: "p", text: "Publicamos estos Términos en el Servicio. Pueden cambiar dentro de lo que permita la ley aplicable; anunciaremos el cambio y su fecha de entrada en vigor en el Servicio con al menos 7 días de antelación (30 días si el cambio es desfavorable para ti)." },
      ],
    },
    {
      heading: "Artículo 4 (Qué incluye el Servicio)",
      body: [
        { type: "p", text: "**Funciones gratuitas**: tu carta de saju, tu tipo de saju, el resumen de la lectura de hoy, los tests de personalidad y la conversación con la IA, las vistas previas de los informes, los resultados de compatibilidad, las invitaciones de compatibilidad, el Mapa de química del grupo, un número diario de Preguntas de saju, el diario de una línea y más." },
        {
          type: "p",
          text: "**Servicios de pago**: (1) la suscripción “Fatesaid Pro”: lecturas completas (hoy, semana, mes y año), hasta 10 Preguntas de saju al día, las preguntas “Sobre una persona”, informes mensuales de patrones, modo pareja y más; (2) compras únicas: el informe a fondo de cada test y el paquete de todos los informes, el informe del año y el informe de compatibilidad (una vez por cada otra persona).",
        },
        { type: "p", text: "Lo que incluye cada Servicio de pago y su precio son los que se muestran en la pantalla de compra. Podemos cambiar o añadir funciones para mejorar el Servicio, pero no quitaremos el contenido principal de lo que ya compraste." },
      ],
    },
    {
      heading: "Artículo 5 (Pagos y suscripciones)",
      body: [
        {
          type: "list",
          items: [
            "Los pagos se hacen a través de Apple App Store o Google Play; el pago, los recibos y los métodos de pago siguen los términos de esa tienda.",
            "Las suscripciones **se renuevan automáticamente** por el periodo que elegiste (mensual o anual). Se cobrará el siguiente periodo salvo que canceles al menos 24 horas antes de que termine el actual. Puedes cancelar en los ajustes de suscripciones de App Store o Google Play de tu dispositivo y mantienes el acceso hasta el final del periodo pagado.",
            "Si se ofrece una prueba gratuita, al terminar se convierte automáticamente en una suscripción de pago. Si cancelas al menos 24 horas antes de que termine la prueba, no se te cobrará. Según las normas de cada tienda, la prueba gratuita puede estar disponible solo para quien se suscribe por primera vez.",
            "Los informes a fondo, el paquete y el informe del año siguen disponibles una vez comprados y pueden volver a abrirse con “Restaurar compras” en la misma cuenta de la tienda.",
            "Un informe de compatibilidad sirve solo para la pareja de personas para la que se compró. Los informes comprados se guardan en tu dispositivo, así que es posible que no puedas volver a abrirlos si borras la app o cambias de dispositivo.",
          ],
        },
      ],
    },
    {
      heading: "Artículo 6 (Desistimiento y reembolsos)",
      body: [
        { type: "p", text: "Los reembolsos de los Servicios de pago siguen el proceso de la tienda donde pagaste (Apple: reportaproblem.apple.com; Google Play: solicitar un reembolso desde tu historial de pedidos). Estos Términos no limitan los derechos de desistimiento o reembolso que te reconozca la ley aplicable. Si hay algún problema con un pago o con tu acceso, escríbenos a la dirección que aparece en la Política de privacidad." },
      ],
    },
    {
      heading: "Artículo 7 (Edad mínima)",
      body: [
        { type: "p", text: "El Servicio es solo para personas **de 14 años o más**. No verificamos la edad, así que madres, padres o tutores deben asegurarse de que no lo usen menores de 14 años." },
      ],
    },
    {
      heading: "Artículo 8 (Obligaciones de quien usa el Servicio)",
      body: [
        { type: "p", text: "Al usar el Servicio, no debes:" },
        {
          type: "list",
          items: [
            "Introducir los datos de otra persona sin su consentimiento, ni usar los resultados para acosar o juzgar a alguien",
            "Interferir con el funcionamiento normal del Servicio (solicitudes repetidas en exceso, acceso automatizado, intentos de eludir el pago, etc.)",
            "Redistribuir contenido del Servicio con fines comerciales sin nuestro consentimiento",
            "Enviar repetidamente a la conversación con la IA peticiones ajenas al propósito del Servicio o inapropiadas (como intentar que ignore sus instrucciones)",
          ],
        },
      ],
    },
    {
      heading: "Artículo 9 (Aviso importante: no es un diagnóstico)",
      headingColor: "#6FA98B",
      body: [
        {
          type: "p",
          text: "Las lecturas de saju, lecturas del día, resultados de compatibilidad, resultados de los tests, respuestas de la IA e informes del Servicio son **material de referencia para conocerte mejor**. No son un diagnóstico médico ni psicológico, no sustituyen la orientación o el tratamiento profesional ni el asesoramiento legal, financiero o médico, y no garantizan el futuro. El contenido escrito por la IA puede ser inexacto o no coincidir con tu situación real. No tomes decisiones importantes basándote solo en los resultados del Servicio.",
        },
        {
          type: "p",
          text: "Si estás pasando por un momento difícil con tu salud mental, acude a un profesional de la salud o a un servicio de apoyo psicológico. En una emergencia, contacta con los servicios de emergencia o una línea de crisis de tu país (en EE. UU., llama o escribe al 988; en España, llama al 024).",
        },
      ],
    },
    {
      heading: "Artículo 10 (Propiedad intelectual)",
      body: [
        { type: "p", text: "Los derechos sobre los textos, el diseño, el motor de cálculo y el software del Servicio nos pertenecen. Puedes compartir tus propios resultados de forma personal con las funciones para compartir del Servicio, pero no puedes copiar, distribuir ni usar comercialmente su contenido sin nuestro consentimiento." },
      ],
    },
    {
      heading: "Artículo 11 (Exención de responsabilidad)",
      body: [
        {
          type: "list",
          items: [
            "No garantizamos la exactitud ni la integridad del contenido escrito por la IA y, en la medida en que lo permita la ley, no somos responsables de las decisiones que tomes basándote en él ni de sus consecuencias.",
            "No somos responsables de interrupciones causadas por hechos fuera de nuestro control, como desastres naturales o fallos de servicios externos de los que dependemos (OpenAI, alojamiento, servicios de pago, etc.). Los problemas que afecten a los Servicios de pago se atienden según exija la ley aplicable.",
            "Salvo que la ley aplicable disponga otra cosa, no somos responsables de los daños relacionados con las funciones gratuitas.",
          ],
        },
      ],
    },
    {
      heading: "Artículo 12 (Ley aplicable y jurisdicción)",
      body: [
        { type: "p", text: "Estos Términos se rigen por las leyes de la República de Corea, y las disputas relacionadas con el Servicio siguen los procedimientos que establezca la ley aplicable. Si las leyes de protección al consumidor del país donde vives te reconocen derechos más favorables, estos Términos no los limitan." },
      ],
    },
    {
      heading: "Datos del operador",
      body: [
        { type: "list", items: ["Nombre comercial: Studio Aaron (스튜디오 아론)", "Representante: Aaron Kwon (Hyunjo Kwon)", "Número de registro empresarial: 230-38-01618", "Registro de venta a distancia: 2026-Gyeonggi Siheung-2276", "Dirección: Oficina 6110, planta 6, 19 Saejae-ro, Siheung-si, Gyeonggi-do, República de Corea", "Teléfono: +82 10-8757-2948"] },
      ],
    },
    {
      heading: "Disposición adicional",
      body: [
        { type: "p", text: "Estos Términos entran en vigor el 7 de octubre de 2026." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "Estos Términos son un borrador que todavía no ha revisado un profesional del derecho." },
      ],
    },
  ],
};

export const LEGAL_CONTENT = {
  ko: { privacy: privacyKo, terms: termsKo },
  en: { privacy: privacyEn, terms: termsEn },
  es: { privacy: privacyEs, terms: termsEs },
} as const;

export type LegalLocale = keyof typeof LEGAL_CONTENT;

export function getLegalContent(doc: "privacy" | "terms", locale: string = "ko"): LegalDocument {
  const table = LEGAL_CONTENT[locale as LegalLocale] ?? LEGAL_CONTENT.ko;
  return table[doc];
}
