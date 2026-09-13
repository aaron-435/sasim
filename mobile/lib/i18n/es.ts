import type { ko } from "./ko";

export const es: typeof ko = {
  common: {
    brand: "Fatesaid",
    backLabel: "Atrás",
    nextLabel: "Siguiente",
    retryLabel: "Reintentar",
    elementLabels: {
      wood: "Madera",
      fire: "Fuego",
      earth: "Tierra",
      metal: "Metal",
      water: "Agua",
    },
    zodiacLabels: {
      capricorn: "Capricornio",
      aquarius: "Acuario",
      pisces: "Piscis",
      aries: "Aries",
      taurus: "Tauro",
      gemini: "Géminis",
      cancer: "Cáncer",
      leo: "Leo",
      virgo: "Virgo",
      libra: "Libra",
      scorpio: "Escorpio",
      sagittarius: "Sagitario",
    },
  },

  language: {
    heading: "Elige tu idioma",
    subtext: "Puedes cambiarlo más tarde en los ajustes.",
  },

  intro: {
    headlineLine1: "Tu destino ya ha hablado.",
    headlineLine2: "Ahora te toca responder.",
    subheadline: "¿Quieres cambiar tu destino? Analiza tu saju y empieza ahora.",
    freeNote: "Lectura gratis de 10 minutos · Sin tarjeta de crédito",
    ageNoticePrefix: "Debes tener 14 años o más para usar la app · Al continuar, aceptas los",
    ageNoticeAnd: "y",
    ageNoticeSuffix: "",
    termsLinkLabel: "Términos de Servicio",
    privacyLinkLabel: "Política de Privacidad",
  },

  verifyCode: {
    heading: "¿Tienes un código de verificación?",
    subtext:
      "Si hiciste el Q&A en la web, ingresa el código de 6 dígitos que te dieron ahí para continuar justo donde lo dejaste.",
    placeholder: "000000",
    skipLabel: "No tengo código, empezar de nuevo",
    errorDefault: "Este código no es válido o ya fue usado.",
    errorNetwork: "Un error de red impidió verificar tu código.",
  },

  nickname: {
    heading: "¿Cómo te llamamos?",
    subtext: "Usaremos este nombre para tus resultados.",
    placeholder: "Ingresa un apodo",
  },

  gender: {
    heading: "Género",
    male: "Hombre",
    female: "Mujer",
  },

  dob: {
    heading: "Fecha de nacimiento",
    yearPlaceholder: "AAAA",
    monthPlaceholder: "MM",
    dayPlaceholder: "DD",
    ageWarning: (minAge: number) => `Lo sentimos, debes tener ${minAge} años o más para usar la app.`,
  },

  tob: {
    heading: "Hora de nacimiento",
    unknownTime: "No lo sé",
    hourPlaceholder: "HH",
    minutePlaceholder: "MM",
    periodAM: "AM",
    periodPM: "PM",
  },

  city: {
    heading: "Ciudad de nacimiento (búsqueda mundial)",
    placeholder: "Ingresa el nombre de una ciudad",
    noResultsHint:
      "No se encontraron resultados. Como lo que más importa para el cálculo del saju es tu zona horaria de nacimiento, también puedes buscar una ciudad grande cercana en la misma zona horaria (por ejemplo, Seúl, Busan, Daegu).",
    errorDefault: "No pudimos calcular tu saju.",
    errorNetwork: "Un error de red impidió calcular tu saju.",
  },

  home: {
    greeting: (nickname: string) => `Hola, ${nickname}`,
    elementBadgePrefix: "Elemento ·",
    elementDistribution: "Mi Balance de los Cinco Elementos",
    dailyInsightLabel: "El Mensaje de Hoy",
    explainerSectionLabel: "Cómo aprovechar mejor tu saju",
    explainerHeading1: "¿Qué es el Saju (Cuatro Pilares)?",
    explainerBody1:
      "El Saju (四柱) interpreta la energía de los cuatro pilares de tu nacimiento —año, mes, día y hora— a través de los cinco elementos (madera, fuego, tierra, metal, agua) para leer tus tendencias naturales y el rumbo de tu vida. Más que un destino fijo para predecir, funciona mejor como una herramienta para entender tu propio equilibrio y conocerte mejor a ti mismo.",
    explainerHeading2: "Pruébalo así",
    explainerBody2:
      "Empieza por hacer en Saju Q&A la pregunta que más te ronda ahora mismo. Luego haz el test psicológico para diagnosticar tus tendencias y patrones — combinar tus datos de elementos con los datos psicológicos te da una comprensión mucho más completa. Al terminar el test, pasarás de forma natural a una sesión de consejería con IA, y al final recibirás tu propio informe detallado que reúne todo lo que has compartido hasta ahora.",
    featuresSectionLabel: "¿Qué te gustaría hacer?",
    featureQaLabel: "Saju Q&A",
    featureQaDescription: "¿Tienes una pregunta? Pregúntala ahora mismo",
    featureQuizLabel: "Test Psicológico",
    featureQuizDescription: "El primer paso para entenderte a ti mismo",
    featureChatLabel: "Consejería con IA",
    featureChatDescription: "Disponible al terminar el test psicológico",
    featureReportLabel: "Informe Detallado",
    featureReportDescription: "Disponible al terminar el test psicológico",
    recentQuestionLabel: "Pregunta Reciente",
    recentQuestionEmpty: "Aún no has preguntado nada · Haz tu primera pregunta",
  },

  dailyInsight: {
    wood: [
      "Hoy hay un flujo especialmente bueno para empezar algo nuevo. Incluso un pequeño plan sembrado hoy crecerá bien. Trabajar con otros también trae buenos resultados hoy.",
      "Tu impulso por crecer recibe un empujón natural hoy. Cuanto más flexible sea tu forma de pensar, más claro se verá el camino — tómate tu tiempo en vez de apresurarte.",
      "Buen momento para empezar algo que has estado postergando. Hoy sentirás en carne propia que dar el primer paso importa más que tener un plan perfecto.",
    ],
    fire: [
      "Hoy no necesitas ocultar lo que quieres decir. Dar el primer paso juega a tu favor, y con tanta energía, no olvides tomar un descanso breve también.",
      "Tu pasión se muestra de forma natural hoy. No dejes pasar esa chispa de entusiasmo que sientes — anótala, podría ser una gran pista más adelante.",
      "Cuanto más te muevas con decisión, mejor será la respuesta que recibas hoy. Solo cuida que las emociones no se adelanten — pausar un momento antes de hablar ayuda.",
    ],
    earth: [
      "Estabilizarte sin exigirte de más es la respuesta de hoy. Abrirte a alguien de confianza ayuda, y cumplir hasta las pequeñas promesas construye confianza real.",
      "Ordenar las cosas paso a paso te aliviará la mente. Hoy, sé quien aporta estabilidad — eso es, al final, lo que también te protege a ti.",
      "Mejor dejar reposar una decisión un día que apresurarla. La paciencia que muestres hoy volverá como un resultado mucho más sólido más adelante.",
    ],
    metal: [
      "Cuando se necesite una decisión, sigue adelante con principios. Trazar un límite claro hoy en realidad te dará tranquilidad, y tu juicio estará más agudo de lo habitual.",
      "Buen momento para resolver lo que has estado postergando. Dite a ti mismo que está bien no ser perfecto, y cierra las cosas hoy con ligereza.",
      "Buen día para equilibrar principios y flexibilidad. Mantén el criterio que has fijado, pero escucha también el punto de vista del otro.",
    ],
    water: [
      "Cuanto más profundos sean tus pensamientos, menos necesitas apresurarte. Hoy podrías necesitar especialmente tiempo a solas — no te fuerces a llenarlo.",
      "Tu intuición acierta bastante hoy. Dejarte llevar por el flujo también es una estrategia, así que no tienes que explicar lo que sentiste hoy.",
      "Aunque no lo muestres, hoy se ordenan muchas cosas por dentro. Puedes confiar en silencio en la conclusión a la que llegues.",
    ],
    default: ["Tómate un momento hoy para revisar el equilibrio de tus propios elementos. El saju no es un destino fijo — es un mapa para leer el flujo."],
  },

  moduleSelect: {
    badge: "Test Psicológico",
    heading: "¿Qué test psicológico quieres hacer?",
  },

  quiz: {
    nextButton: "Siguiente",
    doneHeader: "Tu primer perfil está listo",
    elementBadgePrefix: "Elemento ·",
    moreDetail: "Un análisis más profundo (compatibilidad de elementos, rasgos detallados, ideas basadas en la consejería) está disponible en tu informe al terminar la consejería con IA.",
    continueToChatButton: "Continuar a la Consejería con IA",
    restartButton: "Repetir",
    combinedTypeSuffix: "Tipo Combinado",
    combinedTypeHook: "Un patrón donde aparecen varias tendencias a la vez.",
    progressLabel: (current: number, total: number) => `${current} / ${total}`,
  },

  chat: {
    headerLabel: "Consejería con IA Gratis",
    inputPlaceholder: "Cuéntanos lo que quieras",
    doneBadge: "Sesión terminada — preparando tu informe",
    errorDefault: "No pudimos obtener una respuesta del chatbot.",
    errorNetwork: "Un error de red impidió obtener una respuesta del chatbot.",
    timeUpLabel: "Terminando",
    finishEarlyButton: "Ya compartí suficiente",
  },

  qa: {
    headerLabel: "Saju Q&A",
    subscriptionPriceLabel: "$19/mes",
    defaultNickname: "amigo",
    greeting1: (nickname: string) => `¡Hola, ${nickname}!`,
    greeting2: "Fatesaid es un equipo de expertos en saju y psicología de Corea.",
    promptCategory: "Pregunta lo que quieras — elige un tema que te interese.",
    askOneMore: "¿Quieres elegir una pregunta más?",
    limitReached1: "Ya usaste tus preguntas gratis de hoy. Puedes volver a preguntar mañana.",
    limitReached2: (price: string, limit: number) => `Estamos preparando una función para que los suscriptores de ${price} puedan hacer hasta ${limit} preguntas al día.`,
    errorDefault: "No pudimos obtener una respuesta.",
    errorNetwork: "Un error de red impidió obtener una respuesta.",
    subcategoryHeading: "Elige la pregunta que te interesa",
    categoryHeading: "Elige con más detalle",
  },

  report: {
    loadingMessages: ["Integrando tu saju y tu test psicológico...", "Escribiendo tu propia historia...", "Ya casi está..."],
    errorDefault: "No pudimos generar tu informe.",
    errorNetwork: "Un error de red impidió generar tu informe.",
    homeLinkLabel: "Inicio",
    homeButtonLabel: "Volver al Inicio",
    nicknameSuffix: "",
    sectionOpeningScene: "Una Escena de Cierta Noche",
    sectionCaseStudy: "Una Historia Parecida a la Tuya",
    quizAnalysisSuffix: "Análisis",
    defaultModuleTitle: "Test Psicológico",
    sectionSajuPattern: "Qué Formó Este Patrón",
    sectionSajuPatternSubtitle: "Análisis de tu Carta de Saju",
    sectionChatStory: "Lo que Surgió en Tus Propias Palabras",
    chatStoryIntro: "Si tu saju y tu test psicológico muestran la estructura, la conversación que acabas de tener muestra la textura real de este momento.",
    chatQuoteLabel: "De tu sesión de consejería",
    chatStoryBodyPrefix: "En nuestra conversación, tu preocupación por",
    chatStoryBodyMiddle: "salió con claridad, y el sentimiento debajo de ella estaba más cerca de",
    chatStoryBodySuffix: ".",
    sectionCrossAnalysis: "Dónde tu Saju y tu Test Psicológico Cuentan la Misma Historia",
    breatherLabel: "Un dato rápido de psicología",
    takeawayBold: "Algo para recordar ·",
    sectionStrengths: "Fortalezas",
    sectionWeaknesses: "Puntos Débiles a Cuidar",
    sectionFit: "Trabajos y Entornos que Encajan Contigo",
    fitGoodLabel: "Busca entornos como este",
    fitBadLabel: "Evita entornos como este",
    sectionBehaviorGuides: "Cómo Actuar con Esto",
    sectionMindset: "Una Forma de Pensar que Podría Ayudarte",
    disclaimer1:
      "Este informe es contenido interpretado por IA basado en cálculos precisos de saju de nuestro propio motor manseryeok, y no reemplaza la consejería psicológica profesional ni el diagnóstico médico.",
    disclaimer2: "Tómalo como material de referencia para divertirte y conocerte mejor.",
    paywallTitle: "Aquí continúa el informe detallado",
    paywallBody: "Análisis de citas de tu chat, análisis cruzado de saju y psicología, fortalezas y debilidades, entornos que encajan contigo y guías de comportamiento — el consejo central del informe continúa abajo.",
    paywallPriceSuffix: "para ver el informe completo",
    paywallBundle: (remaining: number, price: string) => `Ve tus ${remaining} informes restantes juntos por ${price} (25% de descuento)`,
    paywallComingSoon: "Los pagos estarán disponibles pronto",
  },
};
