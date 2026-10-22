/**
 * lib/choiceScripts/es/module7.ts — Módulo 7 (sensibilidad · sentidos) guion fijo, español (tuteo). Adaptado de ../module7.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE7_SCRIPT_ES: ModuleScript = {
  moduleId: "module7",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿Dónde te llegan con más fuerza esas sensaciones?",
      questionNoQuote: "¿Dónde te llegan con más fuerza las sensaciones agudas?",
      options: [
        o("En lugares con mucha gente", "Las sensaciones llegan con más fuerza en lugares con mucha gente.", "los lugares con mucha gente"),
        o("Donde trabajo", "Las sensaciones llegan con más fuerza en el espacio donde trabajas.", "el espacio de trabajo"),
        o("Incluso en sitios cómodos como casa", "Las sensaciones llegan fuertes incluso en sitios cómodos como casa.", "los sitios cómodos"),
      ],
    },
    2: {
      turn: 2,
      question: "En esos momentos, ¿qué es lo primero que entra?",
      options: [
        o("Sonido o luz", "El estímulo que entra por los sentidos va por delante.", "el sonido o la luz"),
        o("Olor o tacto", "Lo que toca el cuerpo llega primero.", "el olor o el tacto"),
        o("El ambiente de la gente", "Leer primero la energía que lleva el aire.", "el ambiente de la gente"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Dónde se queda más ese estímulo?",
      options: [
        o("En el cuerpo", "El estímulo se queda más en el cuerpo.", "el cuerpo"),
        o("En la cabeza", "El estímulo se queda más en la cabeza.", "la cabeza"),
      ],
    },
    4: {
      turn: 4,
      question: "Cuando te acercas a tu límite, ¿qué se parece más a cómo eres?",
      options: [
        o("Abrumado y en blanco", "La entrada desborda y te apagas un momento.", "quedarte en blanco"),
        o("Irritable", "La reacción sale con aspereza.", "la irritabilidad"),
        o("Con ganas de irme de ahí", "El deseo de poner distancia va por delante.", "las ganas de irte"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Estas sensaciones, ¿las tienes desde pequeño o aparecieron al crecer?",
      questionNoQuote: "Tu sensibilidad aguda, ¿la tienes desde pequeño o apareció al crecer?",
      options: [
        o("Desde pequeño", "Estas sensaciones están desde que eras pequeño.", "una sensibilidad desde la infancia"),
        o("Aparecieron al crecer", "Estas sensaciones aparecieron al crecer.", "una sensibilidad que llegó al crecer"),
      ],
    },
    6: {
      turn: 6,
      question: "Después de un día con muchos estímulos, ¿cuánto tardas en volver a ser tú?",
      options: [
        o("Unas horas", "Vuelves a tu sitio con relativa rapidez.", "unas horas"),
        o("Como un día", "Hace falta pasar una noche para asentarse.", "como un día"),
        o("Más de dos días", "Un cuerpo que necesita bastante tiempo para recuperarse.", "más de dos días"),
      ],
    },
    7: {
      turn: 7,
      question: "En un lugar difícil, ¿qué sueles hacer?",
      options: [
        o("Aguanto hasta el final", "En un lugar difícil, sueles aguantar hasta el final.", "aguantar hasta el final"),
        o("Me escapo a descansar", "En un lugar difícil, sueles escaparte a descansar.", "escaparte a descansar"),
      ],
    },
    8: {
      turn: 8,
      question: "¿En qué tipo de día suele llegar la sobrecarga?",
      options: [
        o("Un día con mucha gente", "Llega fuerte después de un día lleno de gente.", "un día con mucha gente"),
        o("Un día con mucho trabajo junto", "Llega después de un día en que se juntaron las tareas.", "un día de trabajo acumulado"),
        o("Un día en que cambió el plan de golpe", "Un día que se tuerce sin aviso suele quedarse grande.", "un día en que cambió el plan de golpe"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Cuándo fue la primera vez que oíste la palabra «sensible»?",
      options: [
        o("De pequeño", "Convives con esa palabra desde pronto.", "de pequeño"),
        o("Ya de mayor", "Fue algo que oíste después de crecer.", "ya de mayor"),
      ],
    },
    11: {
      turn: 11,
      question: "Cuando lo oíste, ¿hacia dónde se inclinó tu ánimo?",
      options: [
        o("Me dolió", "Te dolió al oírlo en aquel momento.", "el dolor"),
        o("Pensé: será verdad", "Lo oíste y pensaste: será verdad.", "tomarlo con calma"),
        o("No lo sé", "No sabes cómo te sentiste entonces.", "algo que todavía no tiene palabras"),
      ],
    },
    12: {
      turn: 12,
      question: "¿Qué notas antes que los demás?",
      options: [
        o("Los cambios de ambiente", "Sentir antes el momento en que cambia el aire.", "los cambios de ambiente"),
        o("La expresión de la gente", "Hay algo que lees primero en las caras.", "la expresión de la gente"),
        o("Los pequeños detalles", "Las pequeñas diferencias te llaman antes la atención.", "los pequeños detalles"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Cuándo sientes que te recargas?",
      options: [
        o("En la naturaleza", "Te recargas cuando estás en la naturaleza.", "la naturaleza"),
        o("Escuchando música", "Te recargas cuando escuchas música.", "la música"),
        o("En un espacio solo mío", "Te recargas cuando estás en un espacio solo tuyo.", "un espacio solo tuyo"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando sabes que un lugar va a ser demasiado, ¿qué haces?",
      options: [
        o("Suelo evitarlo de antemano", "Elegir de antemano los lugares pesados.", "evitarlo de antemano"),
        o("Voy y lo aguanto", "Ir y ajustarte sobre la marcha.", "ir y aguantarlo"),
      ],
    },
    15: {
      turn: 15,
      question: "¿Qué sueles hacer para reducir el estímulo?",
      options: [
        o("Salir un momento", "Para reducir el estímulo, sales un momento.", "salir un momento"),
        o("Usar algo como auriculares", "Para reducir el estímulo, usas algo como auriculares.", "usar una herramienta"),
        o("Nada en particular", "No tienes nada en particular para reducir el estímulo.", "ningún método fijo"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Sueles explicar tu sensibilidad a quienes te rodean?",
      options: [
        o("La explico si hace falta", "Ponerlo en palabras cuando hace falta.", "explicarlo cuando hace falta"),
        o("Dejé de intentar explicarla", "Hubo un tiempo en que elegiste el silencio en vez de explicar.", "renunciar a explicarlo"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Hay alguien que entienda tu sensibilidad?",
      options: [
        o("Una o dos personas", "Hay una o dos personas que entienden tu sensibilidad.", "una o dos personas"),
        o("Solo mi familia", "Solo tu familia conoce tu sensibilidad.", "solo la familia"),
        o("Todavía nadie", "Todavía nadie entiende tu sensibilidad.", "nadie todavía"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si tu día encajara con tu sensibilidad, ¿qué cambiaría primero?",
      options: [
        o("Cómo empieza la mañana", "Una imagen en la que lo primero que cambia es cómo se abre el día.", "cómo empieza la mañana"),
        o("El espacio donde estoy", "Lo primero que cambia es la forma del lugar donde te quedas.", "el espacio donde estás"),
        o("Cómo conozco a la gente", "Cómo te encuentras con la gente es lo primero que te viene.", "cómo te encuentras con la gente"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál sería la versión más pequeña de empezar eso?",
      options: [
        o("Bajar un poco el sonido", "El comienzo más pequeño es bajar un poco el sonido.", "bajar un poco el sonido"),
        o("Reservar un rato para descansar a solas", "El comienzo más pequeño es reservar un rato para descansar a solas.", "reservar un rato para descansar a solas"),
        o("Dejar un poco de hueco en la agenda", "El comienzo más pequeño es dejar un poco de hueco en la agenda.", "dejar un poco de hueco en la agenda"),
      ],
    },
    20: {
      turn: 20,
      question: "El día en que ese niño oyó por primera vez «eres demasiado sensible», ¿cómo crees que estaba?",
      options: [
        o("Callado", "Un niño que se guardó las palabras sin hacer ruido.", "estar callado"),
        o("Dolido", "Una escena en la que se ve dónde cayeron las palabras.", "verse dolido"),
        o("No lo recuerdo", "Tanto como se ha alejado el recuerdo, así ha pasado el tiempo.", "un recuerdo que se ha alejado"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo que el tú de hoy quiera decirle a ese niño?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, lo primero que entra es {g2}, cerca de tu límite aparece {g4}, y la sobrecarga llega tras {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Lo primero que entra es {g2}, cerca de tu límite aparece {g4}, y volver a ti lleva {g6}.",
      "Ante la palabra «sensible» estaba {g11}, y lo que te recarga ahora es {g13}.",
      "En un lugar difícil, lo tuyo es {g15}, quienes te entienden son {g17}, y querrías empezar por {g19}.",
    ],
    perspectiveLine: "Lo que le dijiste a ese niño también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
