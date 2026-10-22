/**
 * lib/choiceScripts/es/module10.ts — Módulo 10 (concentración · flow) guion fijo, español (tuteo). Adaptado de ../module10.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE10_SCRIPT_ES: ModuleScript = {
  moduleId: "module10",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿Cuándo se te dispersa más la concentración?",
      options: [
        o("Mientras trabajo", "La concentración se te dispersa sobre todo mientras trabajas.", "mientras trabajas"),
        o("Al estudiar o leer", "La concentración se te dispersa al estudiar o leer.", "estudiar o leer"),
        o("Cuando estoy con gente", "La concentración se te dispersa cuando estás con gente.", "estar con gente"),
      ],
    },
    2: {
      turn: 2,
      question: "En esos momentos, ¿qué se lleva primero tu atención?",
      options: [
        o("Las notificaciones", "Las señales de fuera van por delante.", "las notificaciones"),
        o("Otros pensamientos", "Sueles irte hacia otras ramas de tu cabeza.", "otros pensamientos"),
        o("Otra cosa que me apetece más", "La atención se desplaza hacia la otra tarea que te atrae.", "otra tarea que te atrae"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Qué cuesta más: empezar o seguir?",
      options: [
        o("Empezar", "Lo que más cuesta es empezar.", "empezar"),
        o("Seguir", "Lo que más cuesta es seguir.", "seguir"),
      ],
    },
    4: {
      turn: 4,
      question: "Cuando se dispersa, ¿qué se acerca más a tu ánimo?",
      options: [
        o("Frustración", "Una sensación de bloqueo va por delante.", "la frustración"),
        o("Excitación inquieta", "Una energía que sube hacia arriba.", "la excitación inquieta"),
        o("Autorreproche", "Primero salen las palabras dirigidas a ti.", "el autorreproche"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Se te ha quedado alguna vez a medias algo nuevo que empezaste?",
      options: [
        o("A menudo", "Eres de los que han dejado cosas a medias a menudo.", "algo que ocurrió a menudo"),
        o("A veces", "Eres de los que a veces dejan cosas a medias.", "algo que ocurrió a veces"),
        o("Casi nunca", "Eres de los que casi nunca dejan cosas a medias.", "algo que casi nunca ocurrió"),
      ],
    },
    6: {
      turn: 6,
      question: "¿En qué punto suele quedarse a medias?",
      options: [
        o("Tras los primeros días", "Te paras cuando se asienta la novedad.", "tras los primeros días"),
        o("Cuando me atasco a mitad", "El punto en que el camino se estrecha en el medio.", "cuando te atascas a mitad"),
        o("Justo antes de terminar", "Los pasos se frenan donde se ve el final.", "justo antes de terminar"),
      ],
    },
    7: {
      turn: 7,
      question: "Una vez absorto, ¿qué se parece más a ti?",
      options: [
        o("Pierdo la noción del tiempo", "Una vez absorto, pierdes la noción del tiempo.", "tan hondo que pierdes la noción del tiempo"),
        o("Vuelvo a la realidad de vez en cuando", "Aun absorto, vuelves a la realidad de vez en cuando.", "yendo y viniendo con la realidad"),
      ],
    },
    8: {
      turn: 8,
      question: "Si tuvieras que señalar un momento en que se enciende tu concentración, ¿cuál sería?",
      options: [
        o("Cuando se acerca una fecha límite", "Cuanto más cerca el plazo, más velocidad cogen las cosas.", "una fecha límite cerca"),
        o("Cuando aprendo algo nuevo", "Hay un momento en que la curiosidad prende.", "el momento de aprender algo nuevo"),
        o("Cuando alguien me mira", "La mirada de al lado actúa como interruptor.", "la mirada de alguien"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Te han dicho alguna vez que eres alguien que «no se concentra»?",
      options: [
        o("A menudo", "Se han acumulado palabras oídas muchas veces.", "palabras oídas a menudo"),
        o("A veces", "Oídas solo de vez en cuando, pero recordadas.", "palabras oídas a veces"),
        o("Nunca", "Estabas lejos de ese tipo de palabras.", "no haberlo oído nunca"),
      ],
    },
    11: {
      turn: 11,
      question: "¿Cómo te cambiaron esas palabras?",
      options: [
        o("Empecé a dudar de mí", "Al oírlo, empezaste a dudar de ti.", "la duda sobre ti mismo"),
        o("Me esforcé más en disimularlo", "Al oírlo, te esforzaste más en disimularlo.", "esforzarte más en disimularlo"),
        o("No cambió mucho", "Aun después de oírlo, no cambió mucho.", "ningún cambio"),
      ],
    },
    12: {
      turn: 12,
      question: "¿Cuál fue lo último que hiciste en lo que perdiste la noción del tiempo?",
      options: [
        o("Algo hecho con las manos", "Una absorción que se instala en la punta de los dedos.", "hacer algo con las manos"),
        o("Algo que exigía pensar", "El tiempo desapareció mientras dabas vueltas a las ideas.", "usar la cabeza"),
        o("Ahondar en algo que me gusta", "Un tiempo dedicado a profundizar en un tema que te atrae.", "profundizar en algo"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Qué dificultad tenía esa tarea entonces?",
      options: [
        o("Fácil", "La tarea era más bien fácil.", "una tarea fácil"),
        o("Justo lo bastante difícil", "La tarea era justo lo bastante difícil.", "una tarea justo lo bastante difícil"),
        o("Bastante difícil", "La tarea era bastante difícil.", "una tarea bastante difícil"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "¿Tienes algún método que uses para concentrarte?",
      options: [
        o("He probado varios", "Ha habido un tiempo probando una cosa y otra.", "probar varias cosas"),
        o("Realmente no", "Eres de los que no tienen un método fijo.", "nada fijo"),
      ],
    },
    15: {
      turn: 15,
      question: "De esos, ¿cuál usas más a menudo?",
      options: [
        o("Cambiar de sitio o de entorno", "Cambiar de sitio o de entorno es lo que más usas.", "cambiar de sitio o de entorno"),
        o("Dividir el tiempo con un temporizador", "Dividir el tiempo con un temporizador es lo que más usas.", "dividir el tiempo con un temporizador"),
        o("Aún no he fijado ninguno", "Todavía no has fijado un método que uses a menudo.", "ningún método fijo"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Cómo crees que ven los demás tu manera de concentrarte?",
      options: [
        o("Como dispersa", "Hay una lectura de ti desde fuera.", "que te vean disperso"),
        o("Como absorta", "Destaca cómo te hundes en lo que haces.", "que te vean absorto"),
        o("No lo sé", "Cómo te ven los demás aún está borroso.", "una mirada que no tienes clara"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Hay a tu lado alguien con quien tu ritmo encaje bien?",
      options: [
        o("Una o dos personas", "Hay a tu lado una o dos personas con las que tu ritmo encaja bien.", "una o dos personas"),
        o("Me cruzo con alguien de vez en cuando", "De vez en cuando te cruzas con gente con quien el ritmo encaja bien.", "alguien con quien te cruzas de vez en cuando"),
        o("Todavía nadie", "Todavía no hay a tu lado nadie con quien el ritmo encaje bien.", "nadie todavía"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si tu día estuviera hecho a la medida de cómo funciona tu atención, ¿qué cambiaría primero?",
      options: [
        o("Cómo empiezo a trabajar", "Una imagen en la que primero cambia la forma de la línea de salida.", "cómo empiezas a trabajar"),
        o("Dónde trabajo", "Una escena en la que primero cambia el lugar donde te quedas.", "dónde trabajas"),
        o("Los descansos entre tareas", "Primero cambian la duración y el uso de los huecos.", "los descansos entre tareas"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál sería la versión más pequeña de empezar eso?",
      options: [
        o("Apagar una notificación", "Apagar una notificación es el comienzo más pequeño.", "apagar una notificación"),
        o("Abrir una sola cosa cada vez", "Abrir una sola cosa cada vez es el comienzo más pequeño.", "abrir una sola cosa cada vez"),
        o("Reservar un hueco para el flow", "Reservar un hueco para el flow es el comienzo más pequeño.", "reservar un hueco para el flow"),
      ],
    },
    20: {
      turn: 20,
      question: "Cuando estaba absorto y el tiempo se me iba, ¿cómo era yo?",
      options: [
        o("Con los ojos brillantes", "La luz estaba encendida hasta poder verse.", "unos ojos brillantes"),
        o("Muy callado", "Entrando hondo sin hacer ruido.", "estar muy callado"),
        o("No lo recuerdo bien", "La escena se ha desdibujado, pero el tiempo permanece.", "un recuerdo borroso"),
      ],
    },
    21: {
      turn: 21,
      question: "Si el tú de entonces pudiera decirle algo al tú disperso de ahora, ¿qué sería?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, lo que primero se lleva tu atención es {g2}, al dispersarte tu ánimo se parece a {g4}, y tu concentración se enciende con {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Lo que primero se lleva tu atención es {g2}, al dispersarte tu ánimo se parece a {g4}, y el punto donde se queda a medias es {g6}.",
      "Ante las palabras «no se concentra» estaba {g11}, y la condición del flow es {g13}.",
      "Para concentrarte, lo tuyo es {g15}, las personas con quienes el ritmo encaja son {g17}, y un comienzo a tu medida empieza por {g19}.",
    ],
    perspectiveLine: "Lo que dijo el tú de entonces también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
