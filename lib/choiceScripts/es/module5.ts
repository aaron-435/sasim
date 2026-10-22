/**
 * lib/choiceScripts/es/module5.ts — Módulo 5 (ejecución · procrastinación) guion fijo, español (tuteo). Adaptado de ../module5.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE5_SCRIPT_ES: ModuleScript = {
  moduleId: "module5",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿Con qué tipo de tarea aparece más a menudo esa faceta tuya?",
      questionNoQuote: "¿Qué tipo de tarea dejas para después con más frecuencia?",
      options: [
        o("Papeleo y tareas de orden", "Aparece más a menudo con el papeleo y las tareas de orden.", "las tareas menores"),
        o("Trabajo o estudio que se evalúa", "Aparece más a menudo con el trabajo o el estudio que se evalúa.", "el trabajo evaluado"),
        o("Mensajes y respuestas a otras personas", "Aparece más a menudo con los mensajes y las respuestas a otras personas.", "lo que implica a otras personas"),
      ],
    },
    2: {
      turn: 2,
      question: "Justo antes de abrir esa tarea, ¿qué pensamiento te cruza?",
      options: [
        o("Tengo que hacerlo bien", "El listón se levanta antes de empezar.", "pensar que hay que hacerlo bien"),
        o("Ahora no me apetece", "Primero habla la falta de ganas.", "no tener ganas"),
        o("No sé por dónde empezar", "Te quedas parado al no encontrar la primera casilla.", "no saber por dónde empezar"),
      ],
    },
    3: {
      turn: 3,
      question: "En ese momento, ¿qué es lo que más quieres evitar?",
      options: [
        o("Lo engorroso y aburrido", "En ese momento, lo que más quieres evitar es lo engorroso y aburrido.", "lo engorroso"),
        o("Que no salga bien", "En ese momento, lo que más quieres evitar es que no salga bien.", "el miedo a que no salga bien"),
      ],
    },
    4: {
      turn: 4,
      question: "Mientras lo vas dejando, ¿qué se parece más a tu ánimo?",
      options: [
        o("Inquietud", "El reloj sigue sonando en tu cabeza.", "la inquietud"),
        o("Culpa", "Lo que no has hecho se queda en un rincón del ánimo.", "la culpa"),
        o("Un alivio momentáneo", "Hay una parte que suelta el aire al dejarlo.", "un alivio momentáneo"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Esta faceta tuya, ¿viene de hace tiempo o ha crecido últimamente?",
      questionNoQuote: "Eso de dejar las cosas para después, ¿viene de hace tiempo o ha crecido últimamente?",
      options: [
        o("Viene de hace tiempo", "Esto viene de hace tiempo.", "un hábito de hace tiempo"),
        o("Ha crecido últimamente", "Esto ha crecido últimamente.", "algo que ha crecido últimamente"),
      ],
    },
    6: {
      turn: 6,
      question: "¿Dónde sueles pararte?",
      options: [
        o("Al empezar", "El primer paso es el que más pesa.", "al empezar"),
        o("A mitad", "Empiezas, pero te paras en medio.", "a mitad"),
        o("Justo antes de terminar", "Las manos se paran casi al final.", "justo antes de terminar"),
      ],
    },
    7: {
      turn: 7,
      question: "Cuando tienes que elegir, ¿hacia dónde vas?",
      options: [
        o("Elijo tanto rato que se me escapa", "Cuando tienes que elegir, lo piensas tanto rato que se te escapa.", "elegir durante demasiado tiempo"),
        o("Elijo rápido y me arrepiento", "Cuando tienes que elegir, eliges rápido y luego te arrepientes.", "elegir rápido"),
      ],
    },
    8: {
      turn: 8,
      question: "¿Qué te frena con más fuerza a la hora de empezar?",
      options: [
        o("El miedo a equivocarme", "La preocupación por los errores está en el freno.", "el miedo a equivocarte"),
        o("Un listón demasiado alto", "La vista va muy por delante de la mano.", "un listón alto"),
        o("Demasiadas opciones", "Tantas ramas que no puedes agarrarte a una.", "demasiadas opciones"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Quién se parece más a quien puso ese listón?",
      questionNoQuote: "¿Quién se parece más a quien puso el listón que sientes que debes alcanzar?",
      options: [
        o("Lo puse yo", "Una marca que te hiciste tú mismo.", "un listón que pusiste tú"),
        o("Siento que lo esperan los demás", "Las expectativas de fuera se volvieron el listón.", "las expectativas de los demás"),
      ],
    },
    11: {
      turn: 11,
      question: "Cuando el resultado no llega al listón, ¿qué es lo que más te pesa?",
      options: [
        o("Que digan que el trabajo es malo", "Que digan que el trabajo es malo es lo que más te pesa.", "una mala opinión del trabajo"),
        o("Que digan que yo soy malo", "Que digan que tú eres malo es lo que más te pesa.", "una mala opinión de ti mismo"),
        o("Aún no lo sé", "Lo que más te pesa aún no está claro.", "algo que todavía no tiene palabras"),
      ],
    },
    12: {
      turn: 12,
      question: "¿De quién te importa más el juicio?",
      options: [
        o("De alguien por encima de mí", "La mirada de quien reparte el trabajo es la más cercana.", "el juicio de alguien por encima"),
        o("De alguien cercano", "La mirada de quien tienes al lado pesa mucho.", "el juicio de alguien cercano"),
        o("Del mío propio", "La mirada apunta hacia dentro más que hacia fuera.", "tu propio juicio"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Qué fue lo que acabó poniéndote en marcha?",
      options: [
        o("Una fecha límite encima", "Al final, una fecha límite encima te puso en marcha.", "una fecha límite"),
        o("Alguien a mi lado", "Al final, alguien a tu lado te puso en marcha.", "alguien a tu lado"),
        o("Partirlo en trozos diminutos", "Al final, partirlo en trozos diminutos te puso en marcha.", "partirlo en trozos"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "El día que sacas por fin algo que habías dejado, ¿cómo te sientes?",
      options: [
        o("Aliviado", "Un día en que te sientes más ligero tanto como has terminado.", "el alivio"),
        o("Aliviado, pero me reprocho", "Aunque ya terminó, el tiempo perdido te pesa.", "el reproche que queda pese al alivio"),
      ],
    },
    15: {
      turn: 15,
      question: "Cuando se acumulan las tareas aplazadas, ¿qué sueles hacer?",
      options: [
        o("Todo de golpe", "Cuando se acumulan, sueles hacerlo todo de golpe.", "hacerlo todo de golpe"),
        o("Elijo una y empiezo por ella", "Cuando se acumulan, sueles elegir una y empezar por ella.", "elegir una para empezar"),
        o("Me paso a otras tareas", "Cuando se acumulan, sueles pasarte a otras tareas.", "pasarte a otras tareas"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Sueles contar a quienes te rodean que lo estás dejando?",
      options: [
        o("Suelo decirlo", "Eres de los que avisan con antelación.", "avisar con antelación"),
        o("Procuro que no se note", "Sueles dejar que no se note por fuera.", "ocultarlo"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Hay alguien que sepa que lo dejas para después?",
      options: [
        o("Una o dos personas cercanas", "Una o dos personas cercanas saben que lo dejas para después.", "una o dos personas cercanas"),
        o("Todos a mi alrededor", "Quienes te rodean saben todos que lo dejas para después.", "todos a tu alrededor"),
        o("Nadie", "Nadie sabe que lo dejas para después.", "nadie"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si esa faceta apareciera un poco más a menudo, ¿en qué tipo de tarea te gustaría?",
      questionNoQuote: "Si empezar lo que tienes que hacer pasara un poco más a menudo, ¿en qué tipo de tarea te gustaría?",
      options: [
        o("En el trabajo o el estudio", "Lo primero que viene es lo que tienes que hacer.", "el trabajo o el estudio"),
        o("En asuntos con otras personas", "Querer primero en los asuntos entre personas.", "los asuntos con otras personas"),
        o("En cosas para mí", "Querer primero en lo que haces por ti.", "las cosas para ti"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál sería la versión más pequeña de empezarlo?",
      options: [
        o("Abrirlo solo cinco minutos", "El comienzo es abrirlo solo cinco minutos.", "abrirlo cinco minutos"),
        o("Terminar solo una parte primero", "El comienzo es terminar solo una parte primero.", "terminar solo una parte primero"),
        o("Contárselo a alguien", "El comienzo es contárselo a alguien.", "contárselo a alguien"),
      ],
    },
    20: {
      turn: 20,
      question: "Dentro de un año, si esa tarea ya está hecha, ¿cómo te ves?",
      options: [
        o("Aliviado y ligero", "Una imagen de haber dejado la carga.", "la ligereza"),
        o("Como si nada", "Una imagen en la que se pierde en un día cualquiera.", "seguir como si nada"),
        o("No lo veo claro", "Una imagen aún borrosa también es una respuesta.", "una imagen todavía borrosa"),
      ],
    },
    21: {
      turn: 21,
      question: "Si el tú de dentro de un año pudiera decirle una palabra al tú de hoy, ¿cuál sería?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, justo antes de empezar te cruza {g2}, tu ánimo entonces se parece a {g4}, y lo que más te frena es {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Justo antes de empezar te cruza {g2}, y debajo, lo que más te frena es {g8}.",
      "Bajo el listón está {g11}, y lo que te puso en marcha fue {g13}.",
      "Cuando se acumula, lo tuyo es {g15}, quienes lo saben son {g17}, y querrías empezar por {g19}.",
    ],
    perspectiveLine: "Lo que dijo el tú de dentro de un año también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
