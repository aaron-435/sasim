/**
 * lib/legalContent.ts
 * ------------------------------------------------------------------
 * Structured content for /privacy and /terms, split out of
 * app/privacy/page.tsx and app/terms/page.tsx (2026-09-02) so the body
 * text is translatable data instead of hardcoded JSX — same "fill in a
 * translated copy of this file later" pattern as lib/i18n/ (see
 * lib/i18n/README.md). Only `ko` is populated; `getLegalContent()`
 * falls back to it for any locale without its own file yet.
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

const privacyKo: LegalDocument = {
  title: "개인정보처리방침",
  updatedAt: "2026년 8월 31일",
  sections: [
    {
      body: [
        {
          type: "p",
          text: "“Fatesaid”(이하 “서비스”)는 이용자의 개인정보를 소중히 다루며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 서비스가 어떤 개인정보를 수집하고, 어떻게 이용·보관·파기하는지 안내합니다.",
        },
        {
          type: "p",
          style: "highlight",
          text: "서비스는 현재 베타 운영 단계이며, 아직 별도 사업자 등록 전입니다. 사업자 정보가 확정되는 대로 본 방침의 운영주체 정보를 갱신합니다.",
        },
      ],
    },
    {
      heading: "1. 수집하는 개인정보 항목",
      body: [
        { type: "p", text: "서비스는 사주 계산, 심리테스트 채점, AI 상담 응답 생성을 위해 아래 정보를 수집합니다." },
        {
          type: "list",
          items: [
            "**필수 입력 정보**: 생년월일, 성별, 출생 도시, 관심 분야(연애&애착 / 커리어&번아웃)",
            "**선택 입력 정보**: 태어난 시간(모름으로 표시 가능)",
            "**심리테스트 응답**: 30문항에 대한 선택·슬라이더 응답",
            "**AI 상담 대화 내용**: 이용자가 챗봇과의 대화에서 직접 작성한 텍스트",
            "**익명 세션 식별자**: 로그인 없이도 위 정보들을 하나의 이용 흐름으로 묶어 저장하기 위해 이용자 기기에서 임의로 생성되는 값(개인을 특정할 수 없음)",
            "**자동 수집 정보**: 접속 로그, 접속 IP, 기기·브라우저 정보 (부정이용 방지 및 오류 대응 목적)",
          ],
        },
        { type: "p", text: "회원가입 절차 없이 이용 가능한 서비스이므로, 이름·이메일·비밀번호 등은 수집하지 않습니다." },
      ],
    },
    {
      heading: "2. 개인정보의 수집 및 이용 목적",
      body: [
        {
          type: "list",
          items: [
            "사주 원국 계산 및 오행 분포 분석 제공",
            "심리테스트 채점 및 성향 유형 분석",
            "AI 챗봇 상담 응답 생성",
            "사주·심리테스트·상담 내용을 종합한 리포트 생성",
            "서비스 부정이용 방지, 오류 확인 및 개선",
          ],
        },
      ],
    },
    {
      heading: "3. 개인정보의 보유 및 이용 기간",
      body: [
        {
          type: "p",
          text: "서비스는 위 1항의 정보를 **익명 세션 식별자**와 함께 데이터베이스에 저장합니다. 이 식별자는 이름·이메일 등 개인을 직접 특정할 수 있는 정보와 연결되어 있지 않습니다. 현재 화면에서는 저장된 과거 결과를 다시 불러와 보여주는 기능은 제공하지 않으며, 서비스 품질 개선과 향후 기능(계정 연동 등) 준비 목적으로 보관됩니다.",
        },
        {
          type: "p",
          text: "저장된 정보는 **수집일로부터 최대 1년간** 보관되며, 보유기간이 지나면 지체 없이 파기합니다. 이용자가 삭제를 원하시는 경우 9항의 연락처로 요청하시면 즉시 삭제해 드립니다. 향후 로그인 기능이 추가되면, 기존 세션 데이터를 계정에 연결할지 여부를 별도로 안내하고 동의를 받습니다.",
        },
      ],
    },
    {
      heading: "4. 개인정보 처리의 위탁 및 국외 이전",
      body: [
        { type: "p", text: "서비스는 아래와 같이 외부 업체에 개인정보 처리를 위탁하고 있습니다." },
        {
          type: "list",
          items: [
            "**OpenAI, L.L.C. (미국)** — AI 상담 응답 생성을 위해, 이용자가 챗봇에 입력한 대화 내용과 상담에 필요한 최소한의 맥락(심리테스트 결과 요약, 사주 오행 분포)이 상담 진행 시점에 네트워크를 통해 실시간으로 미국 소재 서버로 전송·처리됩니다. 보유기간은 OpenAI의 API 데이터 처리 정책을 따르며, 자세한 내용은 OpenAI의 개인정보처리방침을 참고하실 수 있습니다.",
            "**SAZU API 제공업체** — 사주 원국 및 오행 분포 계산을 위해, 입력하신 생년월일·시간·성별·출생도시가 계산 요청 시점에 전송·처리됩니다.",
            "**Supabase, Inc. (미국)** — 이용자가 재방문 시 결과를 다시 확인할 수 있도록, 1항의 정보(익명 세션 식별자 포함)를 미국 소재 데이터베이스 서버에 저장합니다. 보유기간은 3항과 같습니다.",
          ],
        },
        { type: "p", text: "위 위탁·이전 업체 외에는 이용자의 개인정보를 제3자에게 제공하지 않습니다." },
      ],
    },
    {
      heading: "5. 만 14세 미만 아동의 개인정보",
      body: [
        {
          type: "p",
          text: "본 서비스는 **만 14세 이상**만 이용할 수 있습니다. 서비스는 만 14세 미만 아동으로부터 개인정보를 의도적으로 수집하지 않으며, 만 14세 미만으로 확인되는 경우 관련 정보의 이용을 중단합니다.",
        },
      ],
    },
    {
      heading: "6. 정보주체의 권리와 행사 방법",
      body: [
        {
          type: "p",
          text: "이용자는 자신의 세션에 저장된 정보에 대해 열람, 정정, 삭제를 요청할 수 있습니다. 다만 로그인 기능이 없는 구조상, 요청하신 분이 실제로 그 세션의 이용자인지 확인하기 위해 세션 생성 시점이나 입력하신 정보 일부를 여쭤볼 수 있습니다. 요청은 9항의 연락처로 해 주시기 바랍니다.",
        },
      ],
    },
    {
      heading: "7. 개인정보의 안전성 확보조치",
      body: [
        {
          type: "list",
          items: [
            "이용자와 서버 간 통신 구간 암호화(HTTPS) 적용",
            "OPENAI_API_KEY, SAZU_API_KEY 등 인증키는 서버 환경변수로만 관리하며 클라이언트에 노출하지 않음",
            "서비스 인프라(Vercel) 자체의 접근 통제 및 보안 정책 적용",
          ],
        },
      ],
    },
    {
      heading: "8. 쿠키(Cookie) 등 자동 수집 장치",
      body: [
        { type: "p", text: "현재 서비스는 별도의 분석·광고 쿠키를 사용하지 않습니다. 추후 분석 도구 등을 도입할 경우, 본 방침을 통해 미리 안내하겠습니다." },
      ],
    },
    {
      heading: "9. 개인정보 보호책임자",
      body: [
        { type: "p", text: "개인정보 관련 문의는 아래로 연락해 주시기 바랍니다." },
        { type: "contact", label: "이메일", email: "435deed@gmail.com" },
        { type: "p", style: "muted", text: "위 연락처는 임시 운영 연락처입니다. 사업자 등록 및 정식 개인정보 보호책임자 지정 후 갱신 예정입니다." },
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
        { type: "p", text: "본 방침이 변경되는 경우 서비스 화면을 통해 사전에 공지합니다. 이 방침은 2026년 8월 31일부터 적용됩니다." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "본 방침은 서비스 베타 운영을 위한 초안이며, 정식 서비스 전환 시 법률 전문가의 검토를 거칠 예정입니다." },
      ],
    },
  ],
};

const termsKo: LegalDocument = {
  title: "이용약관",
  updatedAt: "2026년 8월 30일",
  sections: [
    {
      heading: "제1조 (목적)",
      body: [
        { type: "p", text: "이 약관은 “Fatesaid”(이하 “서비스”)가 제공하는 사주 분석, 심리테스트, AI 상담, 리포트 서비스의 이용과 관련하여 서비스 운영자와 이용자 간의 권리, 의무 및 책임사항을 정하는 것을 목적으로 합니다." },
      ],
    },
    {
      heading: "제2조 (정의)",
      body: [
        {
          type: "list",
          items: [
            "“서비스”란 사주 계산, 심리테스트, AI 챗봇 상담 및 통합 리포트를 제공하는 웹 서비스를 말합니다.",
            "“이용자”란 이 약관에 따라 서비스를 이용하는 자를 말합니다.",
          ],
        },
      ],
    },
    {
      heading: "제3조 (약관의 게시와 개정)",
      body: [
        { type: "p", text: "서비스 운영자는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 화면에 게시합니다. 약관은 관련 법령을 위배하지 않는 범위에서 개정될 수 있으며, 개정 시 서비스 화면을 통해 사전 공지합니다." },
      ],
    },
    {
      heading: "제4조 (서비스의 내용)",
      body: [
        { type: "p", text: "서비스는 현재 **무료 베타**로 제공되며, 아래 기능을 포함합니다." },
        {
          type: "list",
          items: [
            "생년월일 기반 사주 원국 및 오행 분포 계산",
            "심리테스트(30문항) 채점 및 성향 유형 분석",
            "AI 챗봇과의 대화형 상담",
            "위 내용을 종합한 리포트 제공",
          ],
        },
        {
          type: "p",
          text: "서비스는 베타 운영 특성상 사전 예고 없이 기능이 변경, 추가, 중단될 수 있습니다. 별도의 회원가입 절차 없이 이용할 수 있으며, 입력하신 정보와 리포트 내용은 익명 세션 식별자와 함께 서버에 보관됩니다. 다만 현재 화면에서는 이전 리포트를 다시 불러와 보는 기능은 제공되지 않으며, 새로고침하면 처음부터 다시 진행하게 됩니다. 보관·삭제 정책은 개인정보처리방침을 참고하시기 바랍니다.",
        },
      ],
    },
    {
      heading: "제5조 (이용 제한)",
      body: [
        {
          type: "p",
          text: "본 서비스는 **만 14세 이상**만 이용할 수 있습니다. 만 14세 미만인 경우 서비스를 이용하실 수 없으며, 서비스 운영자는 이용자가 만 14세 이상임을 별도로 확인하지 않으므로, 만 14세 미만이 서비스를 이용하지 않도록 보호자의 지도가 필요합니다.",
        },
      ],
    },
    {
      heading: "제6조 (이용자의 의무)",
      body: [
        { type: "p", text: "이용자는 서비스 이용 시 다음 행위를 해서는 안 됩니다." },
        {
          type: "list",
          items: [
            "타인의 정보를 도용하거나 허위 정보를 입력하는 행위",
            "서비스의 정상적인 운영을 방해하는 행위(과도한 반복 요청, 자동화된 접근 등)",
            "서비스를 이용해 얻은 정보를 서비스 운영자의 동의 없이 영리 목적으로 재배포하는 행위",
            "AI 챗봇에 부적절한 요청(시스템 지시 무시 유도, 서비스 목적과 무관한 요청 등)을 반복하는 행위",
          ],
        },
      ],
    },
    {
      heading: "제7조 (서비스 내용에 대한 중요 안내 — 진단이 아닙니다)",
      headingColor: "#C9A24B",
      body: [
        {
          type: "p",
          text: "서비스가 제공하는 사주 풀이, 심리테스트 결과, AI 상담 응답 및 리포트는 **자기 이해를 돕기 위한 참고 자료**이며, 의학적·심리학적 진단이 아니고 전문적인 심리상담이나 정신건강 치료를 대체하지 않습니다. AI가 생성하는 응답은 부정확하거나 이용자의 실제 상황과 다를 수 있습니다.",
        },
        {
          type: "p",
          text: "정신건강과 관련하여 어려움을 겪고 계시다면 반드시 전문 의료기관이나 상담기관을 방문하시기 바랍니다. 위급한 경우 자살예방상담전화(1393) 또는 정신건강위기상담전화(1577-0199)로 24시간 상담받으실 수 있습니다.",
        },
      ],
    },
    {
      heading: "제8조 (지식재산권)",
      body: [
        { type: "p", text: "서비스가 제공하는 텍스트, 디자인, 로직 등에 대한 저작권은 서비스 운영자에게 있으며, 이용자는 서비스 운영자의 사전 동의 없이 이를 복제, 배포, 상업적으로 이용할 수 없습니다." },
      ],
    },
    {
      heading: "제9조 (면책조항)",
      body: [
        {
          type: "list",
          items: [
            "서비스 운영자는 무료로 제공되는 서비스와 관련하여 관련 법령에 특별한 규정이 없는 한 이용자에게 발생한 손해에 대해 책임을 지지 않습니다.",
            "서비스 운영자는 AI가 생성한 응답의 정확성, 완전성을 보증하지 않으며, 이를 신뢰하여 발생한 결과에 대해 책임을 지지 않습니다.",
            "천재지변, 서비스 제공업체(SAZU API, OpenAI 등)의 장애 등 서비스 운영자가 통제할 수 없는 사유로 서비스가 중단되는 경우 책임이 면제됩니다.",
          ],
        },
      ],
    },
    {
      heading: "제10조 (준거법 및 관할)",
      body: [
        { type: "p", text: "이 약관은 대한민국 법령에 따라 규율되며, 서비스와 관련하여 분쟁이 발생하는 경우 관련 법령이 정한 절차에 따릅니다." },
      ],
    },
    {
      heading: "부칙",
      body: [
        { type: "p", text: "이 약관은 2026년 8월 30일부터 시행합니다." },
      ],
    },
    {
      body: [
        { type: "p", style: "muted", text: "본 약관은 서비스 베타 운영을 위한 초안이며, 정식 서비스 전환 시 법률 전문가의 검토를 거칠 예정입니다." },
      ],
    },
  ],
};

export const LEGAL_CONTENT = {
  ko: { privacy: privacyKo, terms: termsKo },
} as const;

export type LegalLocale = keyof typeof LEGAL_CONTENT;

export function getLegalContent(doc: "privacy" | "terms", locale: string = "ko"): LegalDocument {
  const table = LEGAL_CONTENT[locale as LegalLocale] ?? LEGAL_CONTENT.ko;
  return table[doc];
}
