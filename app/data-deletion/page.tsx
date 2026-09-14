import LegalPage from "@/components/LegalPage";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";

const TITLE: Record<Locale, string> = {
  ko: "데이터 삭제 요청",
  en: "Request Data Deletion",
  es: "Solicitar Eliminación de Datos",
};

const BODY: Record<Locale, { intro: string; stepsHeading: string; steps: string[]; note: string; emailLabel: string }> = {
  ko: {
    intro:
      "Fatesaid는 별도의 회원가입·로그인 없이 이용하는 서비스입니다. 온보딩 중 입력하신 생년월일·출생시간·출생지·닉네임, AI 상담 및 Q&A 대화 내용은 익명 세션 식별자와 함께 서버에 저장됩니다.",
    stepsHeading: "삭제 요청 방법",
    steps: [
      "아래 이메일로 연락해 주세요.",
      "제목에 “데이터 삭제 요청”이라고 적어주세요.",
      "본인 확인을 위해 서비스를 이용하신 대략적인 날짜나 입력하신 닉네임을 알려주세요.",
    ],
    note: "요청을 받으면 지체 없이 해당 세션의 모든 데이터를 삭제합니다. 별도 요청이 없어도 모든 데이터는 수집일로부터 최대 1년 후 자동으로 삭제됩니다.",
    emailLabel: "이메일",
  },
  en: {
    intro:
      "Fatesaid requires no signup or login. The birth date, birth time, birth city, and nickname you enter during onboarding, along with your AI chat and Q&A conversation content, are stored on our servers together with an anonymous session identifier.",
    stepsHeading: "How to request deletion",
    steps: [
      "Email us at the address below.",
      "Use the subject line “Data Deletion Request.”",
      "To confirm you're the actual user, include roughly when you used the Service or the nickname you entered.",
    ],
    note: "We delete all data for that session immediately upon request. Even without a request, all data is automatically deleted no later than one year after collection.",
    emailLabel: "Email",
  },
  es: {
    intro:
      "Fatesaid no requiere registro ni inicio de sesión. La fecha de nacimiento, hora de nacimiento, ciudad de nacimiento y apodo que ingresas durante el onboarding, junto con el contenido de tus conversaciones de chat con IA y Q&A, se almacenan en nuestros servidores junto con un identificador de sesión anónimo.",
    stepsHeading: "Cómo solicitar la eliminación",
    steps: [
      "Escríbenos al correo indicado abajo.",
      "Usa el asunto “Solicitud de Eliminación de Datos”.",
      "Para confirmar que eres el usuario real, indica aproximadamente cuándo usaste el Servicio o el apodo que ingresaste.",
    ],
    note: "Eliminamos todos los datos de esa sesión de inmediato al recibir la solicitud. Incluso sin una solicitud, todos los datos se eliminan automáticamente a más tardar un año después de su recopilación.",
    emailLabel: "Correo electrónico",
  },
};

const CONTACT_EMAIL = "435deed@gmail.com";
const UPDATED_AT = "2026-09-14";

export const metadata = {
  title: "Fatesaid — Data Deletion",
};

export default function DataDeletionPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale: Locale = (LOCALES as string[]).includes(searchParams?.lang ?? "") ? (searchParams!.lang as Locale) : "ko";
  const t = getDictionary(locale);
  const body = BODY[locale];

  return (
    <LegalPage title={TITLE[locale]} updatedAt={UPDATED_AT} locale={locale}>
      <p>{body.intro}</p>
      <h2>{body.stepsHeading}</h2>
      <ul>
        {body.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>
      <p>
        {t.legal.backLink === "돌아가기" ? "이메일" : t.legal.backLink === "Volver" ? "Correo electrónico" : "Email"}:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p style={{ color: "#756B54", fontSize: "12.5px" }}>{body.note}</p>
    </LegalPage>
  );
}
