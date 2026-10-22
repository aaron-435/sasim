/**
 * lib/choiceScripts/es/module3.ts — Módulo 3 (agotamiento) guion fijo, español (tuteo).
 * Adaptado del guion coreano (../module3.ts): mismas 22 vueltas, mismo mapa de campos. Sin sintaxis de partículas.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE3_SCRIPT_ES: ModuleScript = {
  moduleId: "module3",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿En qué momento del día se nota más?",
      questionNoQuote: "¿En qué momento del día notas más el cansancio del trabajo?",
      options: [
        o("Antes de ir a trabajar", "Se nota más antes de ir a trabajar.", "antes de ir a trabajar"),
        o("En pleno trabajo", "Se nota más en pleno trabajo.", "en pleno trabajo"),
        o("Al terminar la jornada", "Se nota más al terminar la jornada.", "al terminar la jornada"),
      ],
    },
    2: {
      turn: 2,
      question: "¿Qué parte de ese peso es la más grande?",
      options: [
        o("La cantidad de trabajo", "Lo primero que choca es la cantidad en sí.", "la cantidad de trabajo"),
        o("Las personas", "El peso viene más de la gente que del trabajo.", "las personas"),
        o("No sabría elegir una", "No caber en una sola cosa también es una respuesta.", "varias cosas a la vez"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Dónde apareció primero el agotamiento?",
      options: [
        o("Primero se cansó el cuerpo", "El agotamiento llegó primero por el cuerpo.", "el cuerpo"),
        o("Primero se enfrió el ánimo", "El agotamiento llegó primero por el ánimo.", "el ánimo"),
      ],
    },
    4: {
      turn: 4,
      question: "Si tuvieras que resumir cómo estás en una palabra, ¿cuál se acerca más?",
      options: [
        o("Desgana", "Inclinado hacia no encontrar ganas de nada.", "la desgana"),
        o("Irritación", "Lo más áspero es lo que va por delante.", "la irritación"),
        o("Vacío", "Una sensación de hueco ocupa el centro.", "el vacío"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Habías pasado por una etapa así antes, o es la primera vez?",
      questionNoQuote: "¿Habías pasado por una etapa de cansancio laboral así antes, o es la primera vez?",
      options: [
        o("Sí, ya me había pasado", "Entonces ya hubo etapas así antes.", "una etapa que ya se había dado"),
        o("Es la primera vez", "Entonces es la primera etapa así.", "una etapa que vives por primera vez"),
      ],
    },
    6: {
      turn: 6,
      question: "Cuando piensas en esas etapas, ¿qué es lo primero que te viene a la cabeza?",
      options: [
        o("Se acumuló el trabajo", "Primero aparece la escena de las tareas apiladas.", "un tiempo de trabajo acumulado"),
        o("Me costaba la gente", "La relación con las personas va por delante en ese recuerdo.", "un tiempo en que la gente costaba"),
        o("Lo recuerdo borroso", "Hay tramos que se cruzan sin verlos bien.", "una etapa borrosa"),
      ],
    },
    7: {
      turn: 7,
      question: "¿Por qué sientes el trabajo tan pesado?",
      options: [
        o("Hay demasiado", "Pesa porque hay demasiado.", "la cantidad"),
        o("No le veo sentido", "Pesa porque cuesta verle el sentido.", "el sentido"),
      ],
    },
    8: {
      turn: 8,
      question: "¿Qué es lo que más energía te quita?",
      options: [
        o("La cantidad de trabajo", "El montón que no deja de crecer es la mayor fuga.", "la cantidad de trabajo"),
        o("Gestionar emociones", "Gastar sentimientos es lo que más se lleva.", "gestionar emociones"),
        o("Que nada salga como quiero", "Lo que queda fuera de mi mano es lo que más se lleva.", "que nada salga como quieres"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: '¿De dónde viene la sensación de "no debo descansar"?',
      questionNoQuote: "Si algo te frena a la hora de descansar, ¿de dónde crees que viene?",
      options: [
        o("De dentro de mí", "Muchas veces es una vara de medir que uno mismo se puso.", "de ti mismo"),
        o("De lo que pensarán los demás", "Una mirada de fuera se ha vuelto la vara de medir.", "lo que pensarán los demás"),
      ],
    },
    11: {
      turn: 11,
      question: "Si esa sensación desapareciera, ¿qué es lo que más te preocuparía?",
      options: [
        o("Quedarme atrás", "Quedarte atrás es lo que más te preocupa.", "el miedo a quedarte atrás"),
        o("Volverme inútil", "Volverte inútil es lo que más te preocupa.", "el miedo a volverte inútil"),
        o("No lo sé", "Lo que más te preocupa aún no está claro.", "una preocupación que todavía no tiene palabras"),
      ],
    },
    12: {
      turn: 12,
      question: "¿Qué te gustaba de este trabajo cuando lo empezaste?",
      options: [
        o("El trabajo en sí", "El gusto que venía del trabajo mismo.", "el trabajo en sí"),
        o("Verme hacerlo bien", "La sensación de haberlo logrado era la fuerza.", "hacerlo bien"),
        o("Sentirme reconocido", "La respuesta que llegaba de fuera era la fuerza.", "el reconocimiento"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Hay algo que todavía te recargue un poco, aunque sea poco?",
      options: [
        o("La gente cercana", "Aun ahora, la gente cercana te recarga un poco.", "la gente cercana"),
        o("El tiempo a solas", "Aun ahora, el tiempo a solas te recarga un poco.", "el tiempo a solas"),
        o("Pequeños logros del trabajo", "Aun ahora, los pequeños logros del trabajo te recargan un poco.", "algún pequeño logro del trabajo"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "¿Cómo pasas los días libres?",
      options: [
        o("Descanso de verdad", "El tiempo libre se convierte en descanso de verdad.", "descansar de verdad en los días libres"),
        o("Sigo pensando en el trabajo", "El cuerpo descansa, la cabeza se queda en el trabajo.", "seguir pensando en el trabajo aun descansando"),
      ],
    },
    15: {
      turn: 15,
      question: "Cuando se cuelan los pensamientos del trabajo, ¿qué sueles hacer?",
      options: [
        o("Los dejo estar", "Cuando se cuelan pensamientos del trabajo, sueles dejarlos estar.", "dejar estar esos pensamientos"),
        o("Reviso o lo resuelvo", "Cuando se cuelan pensamientos del trabajo, sueles revisar o resolver.", "revisar y resolver"),
        o("Me distraigo con otra cosa", "Cuando se cuelan pensamientos del trabajo, sueles distraerte con otra cosa.", "distraerte con otra cosa"),
      ],
    },
    16: {
      turn: 16,
      question: "Cuando lo pasas mal, ¿cómo pides ayuda?",
      options: [
        o("Suelo decirlo", "Eres de los que lo dicen primero.", "decirlo"),
        o("Aguanto solo hasta el final", "De los que cargan solos hasta el final.", "cargar solo"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Alguien se ha dado cuenta de cómo estás ahora?",
      options: [
        o("Una o dos personas lo saben", "Una o dos personas se han dado cuenta de cómo estás.", "una o dos personas"),
        o("Solo familia y amigos", "Solo la familia y los amigos saben cómo estás.", "solo gente de fuera del trabajo"),
        o("Nadie lo sabe", "Nadie se ha dado cuenta de cómo estás.", "nadie"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si te volviera la energía, ¿qué querrías hacer primero?",
      options: [
        o("Hacer bien mi trabajo", "Querer volver primero al trabajo.", "el trabajo"),
        o("Ver a gente", "El ánimo se va primero hacia las personas.", "la gente"),
        o("Cuidarme", "El tiempo para ti va primero.", "cuidarte"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cómo sería la versión más pequeña de empezar eso?",
      options: [
        o("Caminar diez minutos", "El comienzo más pequeño es caminar diez minutos.", "caminar diez minutos"),
        o("Retomar algo que me gustaba", "El comienzo más pequeño es retomar algo que te gustaba.", "retomar algo que te gustaba"),
        o("Dormir bien una noche entera", "El comienzo más pequeño es dormir bien una noche entera.", "dormir bien una noche entera"),
      ],
    },
    20: {
      turn: 20,
      question: "¿Cómo eras el día en que empezaste este trabajo?",
      options: [
        o("Con ilusión", "Empezaste aquel día con ilusión.", "la ilusión"),
        o("Con nervios", "Empezaste aquel día con nervios.", "los nervios"),
        o("No lo recuerdo bien", "El recuerdo se ha alejado tanto como el tiempo.", "un recuerdo que se ha alejado"),
      ],
    },
    21: {
      turn: 21,
      question: "Si el tú de hoy pudiera decirle una palabra al tú de aquel día, ¿cuál sería?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, la parte más grande parece ser {g2}, el tipo de agotamiento se parece a {g4} y lo que más te quita parece ser {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "El peso de tu día empieza en {g2}, sigue hacia {g4}, y lo que más te quita es {g8}.",
      "Bajo la sensación de que no debes descansar está {g11}, y aun así {g13} te recarga un poco.",
      "Tu forma de aguantar es {g15}; quién sabe cómo estás: {g17}; y cuando vuelva la energía empezarías por {g19}.",
    ],
    perspectiveLine: "Lo que te dijiste a ti mismo aquel primer día también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
