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
    retryNetwork: "Recarga la página",
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
    subheadline: "¿Quieres cambiar tu destino? Descubre tu saju y empieza hoy.",
    introStartButton: "Comenzar",
    stepOf: (current: number, total: number) => `PASO ${current} / ${total}`,
    backButton: "Atrás",
    nextButton: "Siguiente",
    labelNickname: "¿Cómo te llamamos?",
    nicknameSubtext: "Usaremos este nombre para tus resultados.",
    nicknamePlaceholder: "Escribe un apodo",
    trackRomance: "Amor y apego",
    trackCareer: "Carrera y agotamiento",
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
    labelCity: "Ciudad de nacimiento (búsqueda en todo el mundo)",
    cityPlaceholder: "Escribe el nombre de una ciudad",
    citySearching: "Buscando...",
    submitButton: "Ver mi saju",
    freeNote: "Lectura gratis de 20 minutos · Sin tarjeta de crédito",
    ageNoticePrefix: "Debes tener 14 años o más para usar la app. Al continuar, aceptas los",
    ageNoticeAnd: "y la",
    ageNoticeSuffix: ".",
    termsLinkLabel: "Términos de servicio",
    privacyLinkLabel: "Política de privacidad",
    errorDefault: "No pudimos calcular tu saju.",
    errorNetwork: "Un problema de conexión nos impidió calcular tu saju.",
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
      "Dibujando tu mapa de saju",
      "Casi listo",
    ],
  },

  quiz: {
    devModeBadge: "Modo desarrollo — datos de muestra fijos del sandbox de SAZU",
    nextButton: "Siguiente",
    doneHeader: "Tu primer perfil está listo",
    dominantElementPrefix: "Elemento dominante del saju",
    moreDetail: "Un análisis más profundo (compatibilidad de elementos, rasgos detallados, ideas de tu conversación) te espera en tu informe cuando termines la conversación con IA.",
    shareButton: "Compartir",
    shareCopied: "Copiado",
    continueToChatButton: "Seguir con la conversación con IA",
    restartButton: "Repetir (demo)",
    combinedTypeSuffix: "· tipo combinado",
    combinedTypeHook: "Un patrón en el que aparecen varias tendencias a la vez.",
    progressLabel: (current: number, total: number) => `${current} / ${total}`,
  },

  chat: {
    headerLabel: "Conversación con IA gratis",
    inputPlaceholder: "Cuéntanos lo que quieras",
    sendAriaLabel: "Enviar mensaje",
    doneBadge: "Conversación terminada: preparando tu informe",
    errorDefault: "No pudimos obtener una respuesta.",
    errorNetwork: "Un problema de conexión nos impidió obtener una respuesta.",
    timeUpLabel: "Cerrando",
    finishEarlyButton: "Ya he contado suficiente",
    introLines: [
      "Con lo que acabas de compartir, empezamos ahora la conversación de verdad.",
      "Ten en cuenta un par de cosas y el informe final será mucho más preciso.",
      "Cada pregunta tiene un motivo, así que responde con libertad y sinceridad. Esta conversación la lleva una IA y es completamente privada, así que no hay de qué preocuparse.",
      "Son varias preguntas porque tus respuestas, juntas, forman la conclusión del informe final. Sigue conversando con calma hasta el final.",
    ],
  },

  qa: {
    headerLabel: "Preguntas de saju · Respuesta de IA",
    defaultNickname: "tú",
    greeting1: (nickname: string) => `¡Hola, ${nickname}!`,
    greeting2: "Fatesaid es un equipo de especialistas en saju y psicología que viene de Corea.",
    promptCategory: "Pregunta lo que quieras: elige un tema que te interese.",
    analyzing: "Un momento, estoy analizando tu pregunta a través de tu saju...",
    askOneMore: "¿Quieres elegir otra pregunta?",
    installPitch: "Esas son todas las preguntas gratuitas por ahora. Guarda el código de abajo: cuando la app esté disponible, podrás continuar justo donde lo dejaste.",
    codeMessage: (code: string) => `Guarda este código de verificación: ${code}\nEscríbelo cuando la app esté disponible y seguirás justo donde lo dejaste.`,
    codeErrorFallback: "Hubo un problema al generar tu código de verificación. Inténtalo de nuevo en un momento.",
    appComingSoonLabel: "La app llegará pronto",
    doneBadge: "Has usado todas tus preguntas gratuitas",
    errorDefault: "No pudimos obtener una respuesta.",
    errorNetwork: "Un problema de conexión nos impidió obtener una respuesta.",
    backButton: "Atrás",
    subcategoryHeading: "Elige con más detalle",
    questionHeading: "Elige la pregunta que más te interese",
  },

  moduleSelect: {
    badge: "Selector de módulo de prueba",
    heading: "¿Qué test psicológico quieres hacer?",
  },

  report: {
    disclaimer: "Este informe es una referencia para apoyar tu autoconocimiento. No es un diagnóstico médico ni psicológico y no sustituye la orientación profesional.",
    generatedNote: "Este informe lo ha redactado una IA a partir de cálculos de saju precisos, hechos con nuestro propio motor basado en el calendario perpetuo coreano (manseryeok), junto con los resultados de tu test psicológico y tu conversación con IA. La persona del escenario de ejemplo es una ilustración ficticia, usada solo para mayor claridad.",
    loadingMessages: [
      "Abriendo tu mapa de saju",
      "Cruzando los resultados de tu test con tus Cinco Elementos",
      "Escribiéndolo con palabras hechas a tu medida",
      "Casi listo",
    ],
    errorDefault: "No pudimos generar tu informe.",
    errorNetwork: "Un problema de conexión nos impidió generar tu informe.",
  },

  legal: {
    backLink: "Atrás",
    effectiveDatePrefix: "Fecha de vigencia",
    draftNoticePrivacy: "Esta política es un borrador para la fase beta del servicio; un asesor legal la revisará antes del lanzamiento oficial.",
    draftNoticeTerms: "Estos términos son un borrador para la fase beta del servicio; un asesor legal los revisará antes del lanzamiento oficial.",
  },

  landing: {
    langLabel: "Idioma",
    heroTitle: "Tu mapa natal, leído desde\nel momento que estás viviendo",
    heroBody: "Un cálculo real de saju unido a la psicología: tu temperamento y lo que viene, en unos tres minutos. Gratis y sin registro.",
    cta: "Ver mi mapa gratis",
    ctaNote: "Sin registro · unos 3 minutos · solo tu fecha y ciudad de nacimiento",
    trust: "Calculado con datos astronómicos oficiales (KASI, Corea), nunca inventado.",
    featuresTitle: "Qué vas a descubrir",
    features: [
      { title: "Tu tipo de saju", body: "Cuál de los 50 tipos eres, según tu temperamento de nacimiento y la energía que te mueve ahora." },
      { title: "Tu ritmo diario", body: "Hoy, esta semana, este mes y el año que viene, con tu mejor día y un día para ir con calma." },
      { title: "Tu informe profundo", body: "Tests psicológicos y una conversación con IA reunidos en un informe personal de más de 40 páginas." },
    ],
    featuresAppNote: "Algunas funciones están disponibles en la app.",
    sampleTitle: "Así es un informe",
    sampleNote: "Una muestra de una persona ficticia, solo de ejemplo. No es el resultado de un usuario real.",
    samplePage1Label: "Una escena de una noche",
    samplePage1Body: "De camino a casa, enciendes y apagas la pantalla del móvil una y otra vez. La tarea está clara, pero las manos no arrancan. ¿No se parecen un poco así tus días últimamente, Jisoo?",
    samplePage2Label: "Tus Cinco Elementos",
    samplePage3Label: "Fortalezas y debilidades",
    samplePage3Locked: "Se abre en la app",
    elementNames: ["Madera", "Fuego", "Tierra", "Metal", "Agua"],
    stepsTitle: "Cómo funciona",
    steps: ["Escribe tu fecha y tu ciudad de nacimiento", "Mira tu resultado de saju al instante, gratis", "Pregunta lo que te intrigue y profundiza en la app"],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿De verdad se calcula?", a: "Sí. Calculamos tus cuatro pilares a partir de tu fecha, hora y ciudad de nacimiento, teniendo en cuenta la zona horaria y la longitud. Una IA escribe la lectura, pero el cálculo en sí nunca se inventa." },
      { q: "¿Es gratis?", a: "Tu resultado de saju y tus 2 primeras preguntas son gratis. Los informes profundos y la lectura diaria se abren en la app." },
      { q: "¿Cómo se usa mi información?", a: "Puedes usarlo sin registrarte, y tus datos pueden guardarse y borrarse según la política de privacidad. Es una lectura para conocerte mejor, no una predicción ni un diagnóstico." },
    ],
    appNote: "La app llegará pronto a iOS y Android.",
    bottomTitle: "¿Quieres ver tu ritmo?",
  },
  meta: {
    siteTitle: "Fatesaid",
    siteDescription: "Análisis de personalidad gratuito que combina saju, tests psicológicos y conversación con IA",
    privacyPageTitle: "Política de privacidad | Fatesaid",
    termsPageTitle: "Términos de servicio | Fatesaid",
  },
};
