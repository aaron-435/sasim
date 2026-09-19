/**
 * lib/i18n/es.ts
 * ------------------------------------------------------------------
 * Full Spanish translation, added 2026-09-13 alongside en.ts (see that
 * file's header for the "why now"). Vocabulary for shared concepts is
 * kept identical to mobile/lib/i18n/es.ts on purpose — same elements,
 * zodiac signs, onboarding field labels, and free-tier copy across web
 * and native so the same product doesn't sound different depending on
 * which surface a user is on. Uses "tú" throughout, matching the
 * informal register already established in mobile's Spanish copy.
 * ------------------------------------------------------------------
 */

import type { ko } from "./ko";

export const es: typeof ko = {
  common: {
    brand: "Fatesaid",
    errorTitleNetwork: "Problemas de conexión",
    errorTitleServer: "Algo salió mal",
    retryNetwork: "Actualiza la página",
    retryServer: "Reintentar",
    elementLabels: {
      wood: "Madera",
      fire: "Fuego",
      earth: "Tierra",
      metal: "Metal",
      water: "Agua",
    },
  },

  onboarding: {
    headlineLine1: "Tu destino ya ha hablado.",
    headlineLine2: "Ahora te toca responder.",
    subheadline: "¿Quieres cambiar tu destino? Analiza tu saju y empieza ahora.",
    introStartButton: "Comenzar",
    stepOf: (current: number, total: number) => `PASO ${current} / ${total}`,
    backButton: "Atrás",
    nextButton: "Siguiente",
    labelNickname: "¿Cómo te llamamos?",
    nicknameSubtext: "Usaremos este nombre para tus resultados.",
    nicknamePlaceholder: "Ingresa un apodo",
    trackRomance: "Amor y Apego",
    trackCareer: "Carrera y Agotamiento",
    labelDob: "Fecha de nacimiento",
    yearPlaceholder: "AAAA",
    monthPlaceholder: "MM",
    dayPlaceholder: "DD",
    labelTob: "Hora de nacimiento",
    unknownTime: "No lo sé",
    hourPlaceholder: "HH",
    minutePlaceholder: "MM",
    periodAM: "AM",
    periodPM: "PM",
    labelGender: "Género",
    male: "Hombre",
    female: "Mujer",
    labelCity: "Ciudad de nacimiento (búsqueda mundial)",
    cityPlaceholder: "Ingresa el nombre de una ciudad",
    citySearching: "Buscando...",
    submitButton: "Ver Mi Saju",
    freeNote: "Lectura gratis de 20 minutos · Sin tarjeta de crédito",
    ageNoticePrefix: "Debes tener 14 años o más para usar la app. Al continuar, aceptas los",
    ageNoticeAnd: "y",
    ageNoticeSuffix: ".",
    termsLinkLabel: "Términos de Servicio",
    privacyLinkLabel: "Política de Privacidad",
    errorDefault: "No pudimos calcular tu saju.",
    errorNetwork: "Un error de red impidió calcular tu saju.",
    zodiac: {
      capricorn: "Capricornio", aquarius: "Acuario", pisces: "Piscis", aries: "Aries",
      taurus: "Tauro", gemini: "Géminis", cancer: "Cáncer", leo: "Leo",
      virgo: "Virgo", libra: "Libra", scorpio: "Escorpio", sagittarius: "Sagitario",
    },
  },

  loading: {
    messages: [
      "Ubicando tu fecha y hora de nacimiento en el calendario",
      "Calculando la distribución de tus Cinco Elementos",
      "Dibujando tu carta saju",
      "Ya casi",
    ],
  },

  quiz: {
    devModeBadge: "Modo desarrollo — datos de muestra fijos del sandbox de SAZU",
    nextButton: "Siguiente",
    doneHeader: "Tu primer perfil está listo",
    dominantElementPrefix: "Elemento dominante del saju",
    moreDetail: "Un análisis más profundo (compatibilidad de elementos, rasgos detallados, ideas basadas en la consejería) está disponible en tu informe al terminar la consejería con IA.",
    shareButton: "Compartir",
    shareCopied: "Copiado",
    continueToChatButton: "Continuar a la Consejería con IA",
    restartButton: "Repetir (demo)",
    combinedTypeSuffix: "Tipo Combinado",
    combinedTypeHook: "Un patrón donde aparecen varias tendencias a la vez.",
    progressLabel: (current: number, total: number) => `${current} / ${total}`,
  },

  chat: {
    headerLabel: "Consejería con IA Gratis",
    inputPlaceholder: "Cuéntanos lo que quieras",
    sendAriaLabel: "Enviar mensaje",
    doneBadge: "Sesión terminada — preparando tu informe",
    errorDefault: "No pudimos obtener una respuesta del chatbot.",
    errorNetwork: "Un error de red impidió obtener una respuesta del chatbot.",
    timeUpLabel: "Terminando",
    finishEarlyButton: "Ya compartí suficiente",
    introLines: [
      "Con base en lo que acabas de compartir, empecemos ahora la consejería real.",
      "Si tienes en cuenta unas cosas, obtendrás un informe mucho más preciso al terminar.",
      "Cada pregunta tiene un motivo, así que responde con libertad y sinceridad — esta conversación la lleva una IA y se mantiene completamente privada, así que no hay de qué preocuparse.",
      "Hay varias preguntas porque tus respuestas, juntas, se convierten en la conclusión del informe final. Sigue conversando con calma hasta el final.",
    ],
  },

  qa: {
    headerLabel: "Saju Q&A · Respuesta IA",
    defaultNickname: "amigo",
    greeting1: (nickname: string) => `¡Hola, ${nickname}!`,
    greeting2: "Fatesaid es un equipo de expertos en saju y psicología de Corea.",
    promptCategory: "Pregunta lo que quieras — elige un tema que te interese.",
    analyzing: "Un momento, analizando tu pregunta a través de tu saju...",
    askOneMore: "¿Quieres elegir una pregunta más?",
    installPitch: "Esas son todas las preguntas gratis por ahora. Guarda el código de abajo — ¡cuando la app salga, podrás continuar justo donde lo dejaste!",
    codeMessage: (code: string) => `Guarda este código de verificación: ${code}\n¡Ingrésalo cuando la app salga y continuarás justo donde lo dejaste!`,
    codeErrorFallback: "Hubo un problema al generar tu código de verificación. Intenta de nuevo en un momento.",
    appComingSoonLabel: "La app está en camino",
    doneBadge: "Ya usaste todas tus preguntas gratis",
    errorDefault: "No pudimos obtener una respuesta.",
    errorNetwork: "Un error de red impidió obtener una respuesta.",
    backButton: "Atrás",
    subcategoryHeading: "Elige con más detalle",
    questionHeading: "Elige la pregunta que más te interese",
  },

  moduleSelect: {
    badge: "Selector de módulo de prueba",
    heading: "¿Qué test de personalidad quieres hacer?",
  },

  report: {
    disclaimer: "Este informe es material de referencia destinado a apoyar tu autoconocimiento. No es un diagnóstico médico ni psicológico, y no sustituye la consejería profesional.",
    generatedNote: "Este informe fue redactado por IA, combinando cálculos precisos de saju de nuestro propio motor de manseryeok con los resultados de tu test de personalidad y tu conversación de consejería. La persona del escenario de ejemplo es una ilustración ficticia usada para mayor claridad.",
    loadingMessages: [
      "Desplegando de nuevo tu carta saju",
      "Superponiendo los resultados de tu test sobre tus Cinco Elementos",
      "Poniéndolo en palabras que son solo tuyas",
      "Ya casi",
    ],
    errorDefault: "No pudimos generar tu informe.",
    errorNetwork: "Un error de red impidió generar tu informe.",
  },

  legal: {
    backLink: "Atrás",
    effectiveDatePrefix: "Fecha de vigencia",
    draftNoticePrivacy: "Esta política es un borrador para la operación beta del Servicio y será revisada por un asesor legal antes del lanzamiento formal del Servicio.",
    draftNoticeTerms: "Estos Términos son un borrador para la operación beta del Servicio y serán revisados por un asesor legal antes del lanzamiento formal del Servicio.",
  },

  landing: {
    langLabel: "Idioma",
    heroTitle: "Tu carta natal, leída como\nel ritmo en el que estás ahora",
    heroBody: "Un cálculo real de saju combinado con psicología: tu temperamento y lo que viene, en unos tres minutos. Gratis para empezar, sin registro.",
    cta: "Ver mi carta gratis",
    ctaNote: "Sin registro · unos 3 minutos · solo tu fecha y ciudad de nacimiento",
    trust: "Calculado con datos astronómicos del calendario (KASI, Corea), no inventado.",
    featuresTitle: "Qué vas a descubrir",
    features: [
      { title: "Tu tipo de saju", body: "Cuál de los 50 tipos eres, a través de tu temperamento de nacimiento y la energía que te guía ahora." },
      { title: "Tu ritmo diario", body: "Hoy, esta semana, este mes y el año que viene, contados como tu mejor día y un día para ir con calma." },
      { title: "Tu informe detallado", body: "Tests psicológicos y una conversación con IA reunidos en un informe personal de más de 40 páginas." },
    ],
    featuresAppNote: "Algunas funciones están disponibles en la app.",
    sampleTitle: "Así es un informe",
    sampleNote: "Una muestra de una persona ficticia, solo de ejemplo. No es el resultado de un usuario real.",
    samplePage1Label: "Una escena de una noche",
    samplePage1Body: "En el trayecto a casa enciendes y apagas el móvil una y otra vez. La tarea está clara, pero las manos no arrancan. ¿No se parecen así tus días últimamente, Jisoo?",
    samplePage2Label: "Tus cinco elementos",
    samplePage3Label: "Fortalezas y debilidades",
    samplePage3Locked: "Se abre en la app",
    elementNames: ["Madera", "Fuego", "Tierra", "Metal", "Agua"],
    stepsTitle: "Cómo funciona",
    steps: ["Introduce tu fecha y ciudad de nacimiento", "Mira tu resultado de saju al instante, gratis", "Pregunta lo que te intrigue y profundiza en la app"],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿De verdad se calcula?", a: "Sí. Calculamos tus cuatro pilares a partir de tu fecha, hora y ciudad de nacimiento, incluyendo la diferencia horaria y la longitud. Una IA escribe la lectura, pero el cálculo en sí nunca se inventa." },
      { q: "¿Es gratis?", a: "Tu resultado de saju y tus 2 primeras preguntas son gratis. Los informes más profundos y la fortuna diaria se abren en la app." },
      { q: "¿Cómo se usa mi información?", a: "Lo usas sin registrarte y puede guardarse y borrarse según la política de privacidad. Es una lectura para conocerte mejor, no una predicción ni un diagnóstico." },
    ],
    appNote: "La app llegará pronto a iOS y Android.",
    bottomTitle: "¿Listo para ver tu ritmo?",
  },
  meta: {
    siteTitle: "Fatesaid",
    siteDescription: "Análisis de personalidad gratis que combina saju, tests de personalidad y consejería con IA",
    privacyPageTitle: "Política de Privacidad | Fatesaid",
    termsPageTitle: "Términos de Servicio | Fatesaid",
  },
};
