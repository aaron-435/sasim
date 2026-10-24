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
      question: "¿Qué se acerca más al gran cambio que has vivido últimamente?",
      options: [
        o("Separarme de alguien", "El gran cambio de últimamente es separarte de alguien.", "separarte de alguien"),
        o("Cambió mi trabajo o mis estudios", "El gran cambio de últimamente está en tu trabajo o tus estudios.", "un cambio de trabajo o de estudios"),
        o("Cambió dónde vivo", "El gran cambio de últimamente es el lugar donde vives.", "un cambio de lugar donde vives"),
      ],
    },
    2: {
      turn: 2,
      question: "Ese cambio, ¿lo elegiste tú?",
      options: [
        o("Lo elegí yo", "Fijaste tú la dirección.", "algo que elegiste"),
        o("Me vino sin más", "Lo fuiste recorriendo según iba llegando.", "algo que te vino sin más"),
        o("Un poco de cada", "Una parte la elegiste y otra simplemente llegó.", "en parte elegido y en parte llegado"),
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
        o("Ligereza", "Lo primero en llegar fue la ligereza.", "la ligereza"),
        o("Vacío", "Lo primero que sentiste fue el vacío.", "el vacío"),
        o("Desorientación", "Primero llegó la sensación de perder el rumbo.", "la desorientación"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Con qué frecuencia te vienen pensamientos de cómo eran antes las cosas?",
      options: [
        o("A menudo", "Te vienen a menudo pensamientos de cómo eran antes las cosas.", "pensamientos que vienen a menudo"),
        o("A veces", "Te vienen a veces pensamientos de cómo eran antes las cosas.", "pensamientos que vienen a veces"),
        o("Lo dejé atrás antes de lo esperado", "Lo de antes quedó atrás antes de lo que esperabas.", "algo que quedó atrás pronto"),
      ],
    },
    6: {
      turn: 6,
      question: "Si te vienen pensamientos del pasado, ¿cuándo suelen llegar?",
      options: [
        o("Cuando estoy a solas", "Suben cuando se abre un hueco de silencio.", "cuando estás a solas"),
        o("Cuando el sitio nuevo no encaja", "Cuando el presente no encaja, aparece el pasado.", "cuando el sitio nuevo no encaja"),
        o("De repente, sin motivo", "Pensamientos que se cuelan sin avisar.", "de repente, sin un momento especial"),
      ],
    },
    7: {
      turn: 7,
      question: "Si esos pensamientos llegan, ¿qué pasa?",
      options: [
        o("Me quedo con ellos un rato", "Cuando llegan, te quedas un rato con ellos.", "quedarte con ellos un rato"),
        o("Vuelvo enseguida", "Aunque lleguen, vuelves enseguida al ahora.", "volver enseguida"),
      ],
    },
    8: {
      turn: 8,
      question: "Cuando tienes tiempo libre, ¿cómo lo pasas normalmente?",
      options: [
        o("Lo lleno con algo", "Rellenas el hueco en vez de dejarlo.", "llenarlo con algo"),
        o("Lo dejo vacío", "Ese tiempo lo dejas vacío, tal cual.", "dejarlo vacío"),
        o("Miro hacia el pasado", "Vuelves a desplegar las huellas del lugar de donde vienes.", "mirar hacia el pasado"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Te viene a veces el pensamiento de «a estas alturas ya debería haberme asentado»?",
      options: [
        o("A menudo", "Siempre hay una línea de base trazada en tu cabeza.", "un pensamiento que viene a menudo"),
        o("A veces", "A veces ese listón aparece de repente.", "un pensamiento que viene a veces"),
        o("Casi nunca", "No sueles medirte con una vara de velocidad.", "un pensamiento que casi nunca viene"),
      ],
    },
    11: {
      turn: 11,
      question: "Si hay un plazo para asentarse, ¿de quién es más bien ese listón?",
      options: [
        o("Mío", "Ese listón es más bien tuyo.", "el tuyo"),
        o("De los demás", "Ese listón es más bien de los demás.", "el de los demás"),
        o("Una mezcla de los dos", "En ese listón se mezclan el tuyo y el de los demás.", "una mezcla del tuyo y el de los demás"),
      ],
    },
    12: {
      turn: 12,
      question: "Cuando pasaste por otros cambios en el pasado, ¿cómo fue?",
      options: [
        o("Me adapté despacio", "Te costó un tiempo hacerte al cambio.", "una experiencia de adaptarte despacio"),
        o("Me adapté rápido", "Encontraste rápido tu sitio.", "una experiencia de adaptarte rápido"),
        o("No lo recuerdo bien", "El ritmo de entonces se queda borroso.", "un recuerdo borroso"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Cómo te parece aferrarte mucho tiempo a algo que ya terminó?",
      options: [
        o("Como debilidad", "Para ti, aferrarte tanto tiempo parece debilidad.", "debilidad"),
        o("Como que importaba tanto", "Para ti, aferrarte tanto tiempo significa que importaba mucho.", "señal de que importaba tanto"),
        o("No lo sé", "Todavía no sabes qué significa aferrarte tanto tiempo.", "algo que todavía no sabes nombrar"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "¿Cómo sueles pasar el tiempo cuando lo siguiente aún no está decidido?",
      options: [
        o("Intento decidirlo rápido", "Rellenas el hueco antes de que se alargue.", "intentar decidir rápido"),
        o("Me quedo en pausa por ahora", "Recobras el aliento antes de moverte.", "quedarte en pausa por ahora"),
        o("Día a día", "El tiempo pasa de día en día.", "dejar pasar los días"),
      ],
    },
    15: {
      turn: 15,
      question: "En ese tiempo sin decidir, ¿qué haces con más frecuencia?",
      options: [
        o("Lleno la agenda hasta arriba", "En ese tiempo llenas la agenda hasta arriba.", "llenar la agenda hasta arriba"),
        o("Vuelvo al sitio de antes", "En ese tiempo vuelves al sitio de antes.", "volver al sitio de antes"),
        o("Solo observo", "En ese tiempo, lo que más haces es observar.", "solo observar"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Hay alguien que esté pasando por esta etapa contigo?",
      options: [
        o("Sí", "Hay a tu lado alguien que recorre el mismo camino.", "tener a alguien que lo pasa contigo"),
        o("Lo paso casi a solas", "Estás recorriendo casi todo el camino a solas.", "pasarlo casi a solas"),
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
      question: "¿Ya hay al menos un lugar del sitio nuevo que te resulte familiar?",
      options: [
        o("Sí", "Hay un lugar al que van tus pasos a menudo.", "ya hay un lugar familiar"),
        o("Uno se va formando", "La extrañeza se va aclarando poco a poco.", "se está formando un lugar familiar"),
        o("Todavía no", "Sigues en una etapa como de invitado.", "todavía ningún lugar familiar"),
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
      question: "El día en que aparezca esa escena, ¿cómo te imaginas?",
      options: [
        o("Respirando un poco mejor", "El pecho se te abre un poco.", "respirar un poco mejor"),
        o("Aún con extrañeza", "La extrañeza se queda cerca un tiempo.", "seguir sintiendo extrañeza"),
        o("No lo veo claro", "El contorno de esa imagen sigue borroso.", "una imagen todavía borrosa"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo que el tú de hoy quiera decirle al tú del último día antes del cambio?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, el cambio fue {g2}, el primer sentimiento tras él se parece a {g4}, y cuando tienes tiempo libre tu costumbre es {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "El primer sentimiento tras el cambio se parecía a {g4}, y los pensamientos del pasado suelen llegar {g6}.",
      "El listón de lo rápido que se espera que te asientes es {g11}, y aferrarte a lo que terminó te parece {g13}.",
      "En el tiempo sin decidir, lo que más haces es {g15}, tu fuerza de ahora viene de {g17}, y querrías empezar a echar raíces en el sitio nuevo con {g19}.",
    ],
    perspectiveLine: "Lo que le dijiste a tu yo del último día antes del cambio también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
