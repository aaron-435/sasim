import type { Metadata } from "next";
import { legalLocale } from "@/lib/legalMeta";
import LegalPage from "@/components/LegalPage";
import { LOCALES, type Locale } from "@/lib/i18n";

// Support page: the App Store / Google Play listings need a working support URL (guideline 1.5).
// Same chrome and language rule as /data-deletion; the answers mirror the app's real labels
// (Settings → Subscription and legal → Restore purchases / Reset my info).

type Faq = { q: string; a: string };
type Body = {
  title: string;
  description: string;
  intro: string;
  contactHeading: string;
  contactText: string;
  emailLabel: string;
  faqHeading: string;
  faqs: Faq[];
  refundText: string;
  appleRefund: string;
  googleRefund: string;
  moreHeading: string;
  privacy: string;
  terms: string;
  deletion: string;
};

const BODY: Record<Locale, Body> = {
  ko: {
    title: "고객 지원",
    description: "Fatesaid 이용 중 궁금한 점이나 문제가 있으면 이메일로 문의해 주세요.",
    intro: "Fatesaid 이용 중 궁금한 점이나 문제가 있으면 아래 이메일로 알려주세요. 사용 중인 기기(iPhone/Android)와 앱 언어를 함께 적어주시면 더 빨리 도와드릴 수 있어요.",
    contactHeading: "문의하기",
    contactText: "이메일로 답장드려요.",
    emailLabel: "이메일",
    faqHeading: "자주 묻는 질문",
    faqs: [
      { q: "구매한 구독이나 리포트가 보이지 않아요.", a: "앱의 설정 → 구독·약관 → ‘구매 복원’을 눌러주세요. 구매할 때 쓴 Apple ID 또는 Google 계정으로 로그인되어 있어야 해요." },
      { q: "구독은 어떻게 해지하나요?", a: "iPhone: 설정 앱 → 내 이름 → 구독에서 해지할 수 있어요. Android: Play 스토어 → 프로필 → 결제 및 정기 결제 → 정기 결제에서 해지할 수 있어요. 다음 갱신 24시간 전까지 해지하면 다음 결제가 되지 않아요." },
      { q: "새 휴대폰으로 바꿨어요.", a: "앱을 설치하고 사주 정보를 다시 입력한 뒤, 설정에서 ‘구매 복원’을 누르면 구독과 구매한 리포트가 돌아와요." },
      { q: "입력한 정보를 지우고 싶어요.", a: "기기에 저장된 정보는 앱의 설정 → ‘내 정보 초기화’로 바로 지울 수 있어요. 서버에 저장된 정보는 아래 데이터 삭제 요청 페이지에서 요청해 주세요." },
    ],
    refundText: "결제는 Apple과 Google이 처리하기 때문에 환불도 각 스토어에 요청해야 해요.",
    appleRefund: "App Store 환불 요청",
    googleRefund: "Google Play 환불 안내",
    moreHeading: "더 보기",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    deletion: "데이터 삭제 요청",
  },
  en: {
    title: "Support",
    description: "Questions or problems with Fatesaid? Email us and we'll help.",
    intro: "If you have a question or run into a problem with Fatesaid, email us at the address below. Mentioning your device (iPhone or Android) and the app language helps us help you faster.",
    contactHeading: "Contact us",
    contactText: "We reply by email.",
    emailLabel: "Email",
    faqHeading: "Common questions",
    faqs: [
      { q: "I can't see my subscription or a report I bought.", a: "In the app, go to Settings → Subscription and legal → Restore purchases. Make sure you're signed in with the Apple ID or Google account you bought with." },
      { q: "How do I cancel my subscription?", a: "iPhone: open the Settings app → your name → Subscriptions. Android: Play Store → your profile → Payments & subscriptions → Subscriptions. Cancel at least 24 hours before renewal to avoid the next charge." },
      { q: "I switched to a new phone.", a: "Install the app, enter your birth details again, then tap Restore purchases in Settings to get your subscription and reports back." },
      { q: "I want to delete the information I entered.", a: "Information on your device can be cleared right away with Settings → Reset my info. For information on our servers, use the data deletion page below." },
    ],
    refundText: "Payments are handled by Apple and Google, so refunds are requested from the store you bought from.",
    appleRefund: "Request an App Store refund",
    googleRefund: "Google Play refund help",
    moreHeading: "More",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    deletion: "Request data deletion",
  },
  es: {
    title: "Soporte",
    description: "¿Tienes dudas o algún problema con Fatesaid? Escríbenos y te ayudamos.",
    intro: "Si tienes una duda o algún problema con Fatesaid, escríbenos al correo de abajo. Si nos dices qué dispositivo usas (iPhone o Android) y en qué idioma tienes la app, podremos ayudarte más rápido.",
    contactHeading: "Contáctanos",
    contactText: "Te respondemos por correo.",
    emailLabel: "Correo electrónico",
    faqHeading: "Preguntas frecuentes",
    faqs: [
      { q: "No veo mi suscripción o un reporte que compré.", a: "En la app, ve a Ajustes → Suscripción y legal → Restaurar compras. Asegúrate de haber iniciado sesión con el Apple ID o la cuenta de Google con la que compraste." },
      { q: "¿Cómo cancelo mi suscripción?", a: "iPhone: abre la app Ajustes → tu nombre → Suscripciones. Android: Play Store → tu perfil → Pagos y suscripciones → Suscripciones. Cancela al menos 24 horas antes de la renovación para evitar el siguiente cargo." },
      { q: "Cambié de teléfono.", a: "Instala la app, vuelve a ingresar tus datos de nacimiento y toca Restaurar compras en Ajustes para recuperar tu suscripción y tus reportes." },
      { q: "Quiero borrar la información que ingresé.", a: "La información de tu dispositivo se borra al momento con Ajustes → Restablecer mis datos. Para la información de nuestros servidores, usa la página de eliminación de datos de abajo." },
    ],
    refundText: "Los pagos los procesan Apple y Google, así que el reembolso se pide en la tienda donde compraste.",
    appleRefund: "Pedir un reembolso en App Store",
    googleRefund: "Ayuda de reembolsos de Google Play",
    moreHeading: "Más",
    privacy: "Política de privacidad",
    terms: "Términos del servicio",
    deletion: "Solicitar la eliminación de datos",
  },
};

const CONTACT_EMAIL = "435deed@gmail.com";
const UPDATED_AT = "2026-11-06";
const PATH = "/support";

const urlFor = (path: string, locale: Locale) => (locale === "en" ? path : `${path}?lang=${locale}`);

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = legalLocale(searchParams?.lang);
  // Canonical names only the language the URL itself carries; a bare URL is the English one (as in legalMeta).
  const canon: Locale = (LOCALES as string[]).includes(searchParams?.lang ?? "") ? (searchParams!.lang as Locale) : "en";
  const { title, description } = BODY[locale];
  return {
    title,
    description,
    alternates: {
      canonical: urlFor(PATH, canon),
      languages: { ko: urlFor(PATH, "ko"), en: urlFor(PATH, "en"), es: urlFor(PATH, "es"), "x-default": PATH },
    },
    openGraph: { title, description, url: urlFor(PATH, canon), type: "website", images: ["/opengraph-image"] },
  };
}

export default function SupportPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale: Locale = legalLocale(searchParams?.lang);
  const b = BODY[locale];

  return (
    <LegalPage title={b.title} updatedAt={UPDATED_AT} locale={locale} path={PATH}>
      <p>{b.intro}</p>

      <h2>{b.contactHeading}</h2>
      <p>
        {b.emailLabel}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>{b.contactText}</p>

      <h2>{b.faqHeading}</h2>
      {b.faqs.map((f) => (
        <div key={f.q}>
          <p>
            <strong>{f.q}</strong>
          </p>
          <p>{f.a}</p>
        </div>
      ))}
      <p>{b.refundText}</p>
      <ul>
        <li>
          <a href="https://reportaproblem.apple.com" rel="noopener noreferrer">{b.appleRefund}</a>
        </li>
        <li>
          <a href="https://support.google.com/googleplay/answer/2479637" rel="noopener noreferrer">{b.googleRefund}</a>
        </li>
      </ul>

      <h2>{b.moreHeading}</h2>
      <ul>
        <li>
          <a href={urlFor("/privacy", locale)}>{b.privacy}</a>
        </li>
        <li>
          <a href={urlFor("/terms", locale)}>{b.terms}</a>
        </li>
        <li>
          <a href={urlFor("/data-deletion", locale)}>{b.deletion}</a>
        </li>
      </ul>
    </LegalPage>
  );
}
