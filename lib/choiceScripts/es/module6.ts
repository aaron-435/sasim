/**
 * lib/choiceScripts/es/module6.ts — Módulo 6 (ira · límites) guion fijo, español (tuteo). Adaptado de ../module6.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE6_SCRIPT_ES: ModuleScript = {
  moduleId: "module6",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿Delante de qué tipo de persona sube más a menudo ese enfado?",
      questionNoQuote: "¿Delante de qué tipo de persona sube más a menudo el enfado?",
      options: [
        o("Gente del trabajo", "El enfado sube más a menudo delante de gente del trabajo.", "la gente del trabajo"),
        o("Gente cercana", "El enfado sube más a menudo delante de gente cercana.", "la gente cercana"),
        o("Gente que acabo de conocer", "El enfado sube más a menudo delante de gente que acabas de conocer.", "los desconocidos"),
      ],
    },
    2: {
      turn: 2,
      question: "¿En qué tipo de momento sube más el enfado?",
      options: [
        o("Cuando veo su tono o su actitud", "Engancharte más en cómo se dice que en lo que se dice.", "el tono y la actitud del otro"),
        o("Que se rompa una promesa", "El momento en que algo acordado se tuerce se queda grande.", "una promesa rota"),
        o("Que ignoren lo que digo", "La escena de palabras que no llegan está por delante.", "que ignoren lo que dices"),
      ],
    },
    3: {
      turn: 3,
      question: "En ese momento, ¿el enfado sube enseguida o más tarde?",
      options: [
        o("Ahí mismo, al instante", "El enfado sube ahí mismo, al instante.", "ahí mismo"),
        o("Mucho después, a posteriori", "El enfado solo sube mucho después, ya pasado el momento.", "más tarde"),
      ],
    },
    4: {
      turn: 4,
      question: "Si quitaras una capa a ese enfado, ¿qué habría debajo?",
      options: [
        o("Sensación de injusticia", "La sensación de que no fue justo está en el fondo.", "la sensación de injusticia"),
        o("Dolor", "Donde lo que esperabas no llegó de vuelta.", "el dolor"),
        o("Sentirme despreciado", "La sensación de que tu existencia se trató a la ligera.", "sentirte despreciado"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Ya había pasado antes una situación igual o es la primera vez?",
      questionNoQuote: "¿Ya había pasado antes una situación que te provoca enfado o es la primera vez?",
      options: [
        o("Ya había pasado", "La misma situación ya había pasado antes.", "algo que se ha repetido"),
        o("Es la primera vez", "Este tipo de situación es una primera vez.", "algo nuevo para ti"),
      ],
    },
    6: {
      turn: 6,
      question: "¿Adónde suele ir ese enfado?",
      options: [
        o("Me lo trago", "Dejarlo dentro en lugar de sacarlo.", "tragártelo"),
        o("Estalla", "Lo acumulado sale de golpe.", "que estalle"),
        o("Le doy vueltas sin parar", "Rebobinar la escena aun después de que acabe.", "darle vueltas"),
      ],
    },
    7: {
      turn: 7,
      question: "¿Hacia dónde apunta el enfado?",
      options: [
        o("Hacia el otro", "El enfado apunta hacia el otro.", "hacia el otro"),
        o("Hacia mí mismo", "El enfado apunta hacia ti mismo.", "hacia ti mismo"),
      ],
    },
    8: {
      turn: 8,
      question: "¿Cuánto suele tardar en calmarse el enfado?",
      options: [
        o("Unas horas", "Se afloja sin pasar de un día.", "unas horas"),
        o("Un día o dos", "Se queda contigo un día o dos.", "un día o dos"),
        o("Más de unos días", "Ha habido veces en que se ha quedado mucho.", "más de unos días"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Qué se parece más a lo que piensas por dentro sobre enfadarte?",
      options: [
        o("No se debe", "Primero viene la idea de que el enfado hay que contenerlo.", "pensar que enfadarse no está bien"),
        o("Está bien si hay motivo", "Puedes mostrarlo si hay una razón.", "pensar que enfadarse está bien si hay motivo"),
      ],
    },
    11: {
      turn: 11,
      question: "En un momento así, ¿qué línea sientes que se cruza?",
      options: [
        o("El respeto", "La línea que se cruzó fue el respeto.", "el respeto"),
        o("La justicia", "La línea que se cruzó fue la justicia.", "la justicia"),
        o("Mi tiempo o mi espacio", "La línea que se cruzó fue tu tiempo o tu espacio.", "tu tiempo y tu espacio"),
      ],
    },
    12: {
      turn: 12,
      question: "En tu infancia, ¿cómo era el enfado en casa?",
      options: [
        o("Algo que se podía mostrar", "Un ambiente en que se permitía expresarlo.", "algo que se podía mostrar"),
        o("Algo que había que aguantar", "Un entorno donde contenerlo era lo habitual.", "algo que había que aguantar"),
        o("Algo que daba miedo", "La tensión era alta cuando el enfado andaba cerca.", "algo que daba miedo"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Hay alguien con quien puedas desahogarte?",
      options: [
        o("Sí, alguien con quien es fácil", "Hay alguien con quien te resulta fácil desahogarte.", "alguien con quien es fácil"),
        o("Elijo un poco con quién", "Al desahogarte, eliges un poco a la persona.", "unas pocas personas que eliges"),
        o("Nadie en particular", "No hay realmente nadie con quien desahogarte.", "nadie en particular"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando sube el enfado, ¿qué es lo primero que haces?",
      options: [
        o("Me aparto", "Una manera de poner distancia física.", "apartarte"),
        o("Me quedo quieto", "Esperar a que pase sin moverte.", "quedarte quieto"),
        o("Lo digo enseguida", "Soltarlo en palabras en el momento.", "decirlo enseguida"),
      ],
    },
    15: {
      turn: 15,
      question: "¿Cómo calmas principalmente el enfado?",
      options: [
        o("Muevo el cuerpo", "Para calmar el enfado, principalmente mueves el cuerpo.", "mover el cuerpo"),
        o("Me doy tiempo a solas", "Para calmar el enfado, principalmente te das tiempo a solas.", "darte tiempo a solas"),
        o("Hablo con alguien", "Para calmar el enfado, principalmente hablas con alguien.", "hablar con alguien"),
      ],
    },
    16: {
      turn: 16,
      question: "Cuando el enfado ya pasó, ¿qué pasa con esa escena?",
      options: [
        o("Vuelvo a repasarla", "Sueles repasar la escena después de que acabe.", "repasarla"),
        o("La dejo guardada", "Cerrarla rápido.", "guardarla"),
      ],
    },
    17: {
      turn: 17,
      question: "Cuando has puesto el enfado en palabras, ¿cómo ha reaccionado el otro?",
      options: [
        o("Lo acogió", "Cuando lo dijiste, la otra persona lo recibió bien.", "que el otro lo recibió bien"),
        o("Fue una discusión mayor", "Cuando lo dijiste, acabó en una discusión más fuerte.", "que acabó en una discusión más fuerte"),
        o("Casi nunca lo he dicho", "Casi nunca has puesto el enfado en palabras.", "que casi nunca lo has dicho"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si piensas en lo que lograste mantener incluso estando enfadado, ¿qué se acerca más?",
      options: [
        o("Dije lo que había que decir", "Una experiencia de que saliera lo que había que decir.", "decir lo que había que decir"),
        o("Mantuve la relación", "Del lado de quien no soltó a la persona.", "mantener la relación"),
        o("Me protegí a mí", "Un recuerdo de sostener tu propia línea.", "protegerte"),
      ],
    },
    19: {
      turn: 19,
      question: "Si trazaras una línea con palabras, ¿qué frase se acercaría más?",
      options: [
        o("«Esto me incomoda»", "Si trazaras una línea, dirías que esto te incomoda.", "decir que te incomoda"),
        o("«Para ahora, por favor»", "Si trazaras una línea, pedirías pararlo por ahora.", "pedir pararlo por ahora"),
        o("«Luego lo hablamos»", "Si trazaras una línea, propondrías hablarlo luego.", "proponer hablarlo luego"),
      ],
    },
    20: {
      turn: 20,
      question: "A la mañana siguiente, con el enfado ya calmado, ¿cómo ves aquello?",
      options: [
        o("Más pequeño", "Hay cosas que cambian de tamaño de la noche a la mañana.", "que se vea más pequeño"),
        o("Igual de grande", "Era algo que una noche no podía reducir.", "que siga igual de grande"),
        o("Casi no lo recuerdo", "Hay días que no dejan nada claro.", "que quede difuso"),
      ],
    },
    21: {
      turn: 21,
      question: "Si el tú de esa mañana siguiente pudiera decirle una palabra al tú de aquel momento de rabia, ¿cuál sería?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, el enfado sube con {g2}, debajo está {g4}, y tarda en calmarse {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Tu enfado sube con {g2}, debajo está {g4}, y tardó en calmarse {g8}.",
      "La línea que se cruzó fue {g11}, y con quién desahogarte: {g13}.",
      "Para calmarte, lo tuyo es {g15}. Al ponerlo en palabras, lo que ha pasado es {g17}. Y si trazaras una línea sería algo como {g19}.",
    ],
    perspectiveLine: "Lo que dijo el tú de la mañana siguiente también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
