/**
 * lib/choiceScripts/es/module12.ts — Módulo 12 (nuevos comienzos) guion fijo, español (tuteo). Adaptado de ../module12.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE12_SCRIPT_ES: ModuleScript = {
  moduleId: "module12",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿Qué se acerca más a tu gran cambio reciente?",
      options: [
        o("Separarme de alguien", "El gran cambio de últimamente es separarte de alguien.", "separarte de alguien"),
        o("Cambió mi trabajo o mis estudios", "El gran cambio de últimamente va por el lado del trabajo o los estudios.", "un cambio de trabajo o de estudios"),
        o("Cambió dónde vivo", "El gran cambio de últimamente es el lugar donde vives.", "un cambio de lugar donde vives"),
      ],
    },
    2: {
      turn: 2,
      question: "Ese cambio, ¿lo elegiste tú?",
      options: [
        o("Lo elegí yo", "Un camino que recorriste tras fijar tú la dirección.", "algo que elegiste"),
        o("Me vino sin más", "Un camino recorrido siguiendo lo que llegó primero.", "algo que te vino sin más"),
        o("Un poco de cada", "La parte que elegiste y la que llegó están mezcladas.", "en parte elegido y en parte llegado"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Cuándo se te hizo más real ese cambio?",
      options: [
        o("Al recoger mis cosas", "El cambio se te hizo más real al recoger tus cosas.", "recoger tus cosas"),
        o("Al notar el vacío en mi rutina", "Se te hizo más real al notar el vacío en tu rutina.", "notar el vacío en tu rutina"),
        o("La primera vez en el sitio nuevo", "Se te hizo más real la primera vez en el sitio nuevo.", "el primer día en el sitio nuevo"),
      ],
    },
    4: {
      turn: 4,
      question: "Después del cambio, ¿cuál fue el primer sentimiento que llegó?",
      options: [
        o("Ligereza", "Primero vino el lado que aligera.", "la ligereza"),
        o("Vacío", "Lo primero que se sintió fue el lugar vaciado.", "el vacío"),
        o("Desorientación", "Primero ganó la sensación de que se desdibuja la dirección.", "la desorientación"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Con qué frecuencia te vienen pensamientos de cómo eran antes las cosas?",
      options: [
        o("A menudo", "Los pensamientos de cómo eran antes las cosas te vienen a menudo.", "pensamientos que vienen a menudo"),
        o("A veces", "Los pensamientos de cómo eran antes las cosas te vienen a veces.", "pensamientos que vienen a veces"),
        o("Lo dejé atrás antes de lo esperado", "Lo de antes quedó atrás antes de lo que esperabas.", "algo que quedó atrás pronto"),
      ],
    },
    6: {
      turn: 6,
      question: "¿Cuándo suelen llegar esos pensamientos del pasado?",
      options: [
        o("Cuando estoy solo", "Suben cuando se abre un hueco de silencio.", "cuando estás solo"),
        o("Cuando el sitio nuevo no encaja", "Cuando el presente chirría, viene a la mente el pasado.", "cuando el sitio nuevo no encaja"),
        o("De repente, sin motivo", "Pensamientos que se cuelan sin avisar.", "de repente, sin un momento especial"),
      ],
    },
    7: {
      turn: 7,
      question: "Cuando vienen, ¿qué pasa?",
      options: [
        o("Me quedo con ellos un rato", "Cuando vienen, te quedas un rato con el pensamiento.", "quedarte con ellos un rato"),
        o("Vuelvo enseguida", "Aunque vengan, vuelves enseguida al ahora.", "volver enseguida"),
      ],
    },
    8: {
      turn: 8,
      question: "Cuando tienes tiempo libre, ¿cómo lo pasas normalmente?",
      options: [
        o("Lo lleno con algo", "Eres de los que rellenan el hueco en vez de dejarlo.", "llenarlo con algo"),
        o("Lo dejo vacío", "Hay un tiempo que dejas vacío tal cual.", "dejarlo vacío"),
        o("Miro hacia el pasado", "Volver a desplegar las huellas del lugar de donde vienes.", "mirar hacia el pasado"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Te viene a veces el pensamiento de «a estas alturas ya debería haberme asentado»?",
      options: [
        o("A menudo", "Siempre hay una línea de base trazada en tu cabeza.", "un pensamiento que viene a menudo"),
        o("A veces", "Hay momentos en que el listón levanta de repente la cabeza.", "un pensamiento que viene a veces"),
        o("Casi nunca", "Eres de los que no tienen una vara grande para medir la velocidad.", "un pensamiento que casi nunca viene"),
      ],
    },
    11: {
      turn: 11,
      question: "¿De quién es, más bien, ese listón?",
      options: [
        o("Mío", "Ese listón es más bien tuyo.", "tu propio listón"),
        o("De los demás", "Ese listón es más bien de los demás.", "el de los demás"),
        o("Una mezcla de los dos", "En ese listón se mezclan el tuyo y el de los demás.", "una mezcla del tuyo y el de los demás"),
      ],
    },
    12: {
      turn: 12,
      question: "Cuando pasaste por otros cambios en el pasado, ¿cómo fue?",
      options: [
        o("Me adapté despacio", "Eres de los que se fueron haciendo al cambio con tiempo.", "una experiencia de adaptarte despacio"),
        o("Me adapté rápido", "Hubo una vez en que encontraste rápido tu sitio.", "una experiencia de adaptarte rápido"),
        o("No lo recuerdo bien", "El ritmo de entonces se queda borroso.", "un recuerdo borroso"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Cómo se siente aferrarse mucho tiempo a algo que ya terminó?",
      options: [
        o("Como debilidad", "Sientes que aferrarte tanto tiempo viene de la debilidad.", "debilidad"),
        o("Como que importaba tanto", "Sientes que aferrarte tanto tiempo es señal de lo mucho que importaba.", "señal de que importaba tanto"),
        o("No lo sé", "Todavía no sabes cómo se siente aferrarte mucho tiempo.", "algo que todavía no sabes nombrar"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "¿Cómo pasa el tiempo cuando lo siguiente aún no está decidido?",
      options: [
        o("Intento decidirlo rápido", "Eres de los que rellenan el hueco antes de que se alargue.", "intentar decidir rápido"),
        o("Me quedo en pausa por ahora", "Una manera de recobrar el aliento antes de moverte.", "quedarte parado por ahora"),
        o("Día a día", "Un tiempo que fluye pasando un día cada vez.", "dejar pasar los días"),
      ],
    },
    15: {
      turn: 15,
      question: "En ese tiempo, ¿qué haces con más frecuencia?",
      options: [
        o("Lleno la agenda hasta arriba", "En ese tiempo, llenas la agenda hasta arriba.", "llenar la agenda hasta arriba"),
        o("Vuelvo al sitio de antes", "En ese tiempo, vuelves al sitio de antes.", "volver al sitio de antes"),
        o("Solo observo", "En ese tiempo, lo que más haces es observar.", "solo observar"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Hay alguien que esté pasando por esta etapa contigo?",
      options: [
        o("Sí", "Hay a tu lado alguien que recorre el mismo camino.", "tener a alguien que lo pasa contigo"),
        o("Lo paso casi a solas", "Estás recorriendo casi todo el camino solo.", "pasarlo casi a solas"),
      ],
    },
    17: {
      turn: 17,
      question: "¿De dónde viene ahora la mayor fuerza?",
      options: [
        o("De quienes se quedaron en el sitio de antes", "Ahora, quienes se quedaron en el sitio de antes te dan más fuerza.", "quienes se quedaron en el sitio de antes"),
        o("De quienes conocí en el sitio nuevo", "Ahora, quienes conociste en el sitio nuevo te dan más fuerza.", "quienes conociste en el sitio nuevo"),
        o("De quienes pasan por la misma etapa", "Quienes pasan por la misma etapa te dan más fuerza ahora.", "quienes pasan por la misma etapa"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "¿Ya hay al menos un lugar que te resulte familiar en el sitio nuevo?",
      options: [
        o("Sí", "Hay un lugar al que van tus pasos a menudo.", "ya hay un lugar familiar"),
        o("Uno se va formando", "La extrañeza se va aclarando poco a poco.", "se está formando un lugar familiar"),
        o("Todavía no", "Sigue un tiempo como de invitado.", "todavía ningún lugar familiar"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Qué escena bastaría para que pensaras «este es mi sitio»?",
      options: [
        o("Un lugar de siempre", "Bastaría con tener un lugar de siempre.", "un lugar de siempre"),
        o("Una persona con quien esté a gusto", "Bastaría con tener una persona con quien estés a gusto.", "una persona con quien estés a gusto"),
        o("Una rutina que sea solo mía", "Bastaría con tener una rutina que sea solo tuya.", "una rutina que sea solo tuya"),
      ],
    },
    20: {
      turn: 20,
      question: "El día en que aparezca esa escena, ¿cómo crees que te verás?",
      options: [
        o("Respirando un poco mejor", "Una escena en la que el pecho se ensancha un palmo.", "respirar un poco mejor"),
        o("Aún con extrañeza", "Una imagen en que la extrañeza se queda cerca un tiempo.", "seguir sintiéndote extraño"),
        o("No lo veo claro", "El contorno de esa escena sigue borroso.", "una imagen todavía borrosa"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo que el tú de hoy quiera decirle al tú del último día en el sitio de antes?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, el cambio fue {g2}, el primer sentimiento tras él se parece a {g4}, y lo que sueles hacer con el tiempo libre es {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "El primer sentimiento tras el cambio se parecía a {g4}, y el momento en que suelen llegar los pensamientos del pasado es {g6}.",
      "El listón de lo rápido que se espera que te asientes es {g11}, y para ti aferrarte a lo que terminó es {g13}.",
      "En el tiempo sin decidir lo que más haces es {g15}, tu fuerza de ahora viene de {g17}, y querrías empezar a echar ancla en el sitio nuevo con {g19}.",
    ],
    perspectiveLine: "Lo que le dijiste a tu yo de aquel último día también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
