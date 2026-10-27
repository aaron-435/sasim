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
      question: "En esos momentos, ¿qué es lo primero que te desvía la atención?",
      options: [
        o("Las notificaciones", "Las señales de fuera te llaman primero.", "las notificaciones"),
        o("Otros pensamientos", "Tu mente suele irse por otros caminos.", "otros pensamientos"),
        o("Otra cosa que me apetece más", "Tu atención se va hacia la otra tarea que te atrae.", "otra tarea que te atrae"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Qué cuesta más: empezar o seguir?",
      options: [
        o("Empezar", "Para ti lo más difícil es empezar.", "empezar"),
        o("Seguir", "Para ti lo más difícil es seguir.", "seguir"),
      ],
    },
    4: {
      turn: 4,
      question: "Cuando se te dispersa, ¿qué sentimiento se acerca más al tuyo?",
      options: [
        o("Frustración", "Lo primero es una sensación de bloqueo.", "la frustración"),
        o("Inquietud acelerada", "Una energía que se acelera en vez de frenarse.", "la inquietud acelerada"),
        o("Autorreproche", "Las primeras palabras van dirigidas contra ti.", "el autorreproche"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Se te ha quedado alguna vez a medias algo nuevo que empezaste?",
      options: [
        o("A menudo", "Has dejado cosas a medias a menudo.", "algo que ocurrió a menudo"),
        o("A veces", "A veces has dejado cosas a medias.", "algo que ocurrió a veces"),
        o("Casi nunca", "Casi nunca has dejado cosas a medias.", "algo que casi nunca ocurrió"),
      ],
    },
    6: {
      turn: 6,
      question: "Cuando algo se queda a medias, ¿en qué punto suele pasar?",
      options: [
        o("Tras los primeros días", "Sueles parar cuando se asienta la novedad.", "tras los primeros días"),
        o("Cuando me atasco a mitad", "En el medio, donde el camino se estrecha.", "cuando te atascas a mitad"),
        o("Justo antes de terminar", "Tus pasos se frenan cuando se ve el final.", "justo antes de terminar"),
      ],
    },
    7: {
      turn: 7,
      question: "Cuando algo te absorbe, ¿qué se parece más a ti?",
      options: [
        o("Pierdo la noción del tiempo", "Cuando algo te absorbe, pierdes la noción del tiempo.", "tan hondo que pierdes la noción del tiempo"),
        o("Vuelvo a la realidad de vez en cuando", "Aunque algo te absorba, vuelves a la realidad de vez en cuando.", "yendo y viniendo con la realidad"),
      ],
    },
    8: {
      turn: 8,
      question: "Si tuvieras que señalar un momento en que se enciende tu concentración, ¿cuál sería?",
      options: [
        o("Cuando se acerca una fecha límite", "Cuanto más cerca el plazo, más rápido avanzas.", "una fecha límite cercana"),
        o("Cuando aprendo algo nuevo", "La curiosidad es lo que lo pone en marcha.", "aprender algo nuevo"),
        o("Cuando alguien me mira", "La mirada de otra persona hace de interruptor.", "la mirada de alguien"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Te han dicho alguna vez que «no te concentras»?",
      options: [
        o("A menudo", "Esas palabras se han ido acumulando.", "palabras oídas a menudo"),
        o("A veces", "Oídas solo de vez en cuando, pero recordadas.", "palabras oídas a veces"),
        o("Nunca", "Esas palabras nunca han ido dirigidas a ti.", "no haberlo oído nunca"),
      ],
    },
    11: {
      turn: 11,
      question: "Si has oído palabras así, ¿cómo te afectaron?",
      options: [
        o("Empecé a dudar de mí", "Esas palabras te llevaron a dudar de ti.", "empezar a dudar de ti"),
        o("Me esforcé más en disimularlo", "Esas palabras te hicieron esforzarte más en disimularlo.", "esforzarte más en disimularlo"),
        o("No cambió mucho", "Esas palabras no cambiaron mucho en ti.", "que no cambiara mucho"),
      ],
    },
    12: {
      turn: 12,
      question: "Piensa en la última vez que perdiste la noción del tiempo. ¿Qué estabas haciendo?",
      options: [
        o("Algo hecho con las manos", "Esa absorción que se instala en las manos.", "hacer algo con las manos"),
        o("Algo que exigía pensar", "El tiempo desapareció mientras dabas vueltas a las ideas.", "usar la cabeza"),
        o("Ahondar en algo que me gusta", "Tiempo dedicado a profundizar en algo que te gusta.", "profundizar en algo"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Cómo te resultaba de difícil esa tarea en aquel momento?",
      options: [
        o("Fácil", "Esa tarea te resultaba más bien fácil.", "fácil"),
        o("Justo lo bastante difícil", "Esa tarea te resultaba justo lo bastante difícil.", "justo lo bastante difícil"),
        o("Bastante difícil", "Esa tarea te resultaba bastante difícil.", "bastante difícil"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "¿Tienes alguna forma habitual de intentar concentrarte?",
      options: [
        o("He probado varios", "Has pasado un tiempo probando una cosa y otra.", "probar varias cosas"),
        o("Realmente no", "No tienes un método fijo.", "nada fijo"),
      ],
    },
    15: {
      turn: 15,
      question: "Si tuvieras que elegir, ¿cuál usas más a menudo?",
      options: [
        o("Cambiar de sitio o de entorno", "Lo que más usas es cambiar de sitio o de entorno.", "cambiar de sitio o de entorno"),
        o("Dividir el tiempo con un temporizador", "Lo que más usas es dividir el tiempo con un temporizador.", "dividir el tiempo con un temporizador"),
        o("Aún no he fijado ninguno", "Todavía no has fijado un método.", "algo todavía sin fijar"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Cómo crees que ven los demás tu manera de concentrarte?",
      options: [
        o("Como dispersa", "Así te leen los demás desde fuera.", "que vean tu forma de concentrarte como dispersa"),
        o("Como absorta", "A ojos de los demás destaca cómo te sumerges en lo que haces.", "que vean tu forma de concentrarte como absorta"),
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
        o("Cómo empiezo a trabajar", "Lo primero que cambiaría es la línea de salida.", "cómo empiezas a trabajar"),
        o("Dónde trabajo", "Lo primero que cambiaría es el lugar donde trabajas.", "dónde trabajas"),
        o("Los descansos entre tareas", "Lo primero que cambiaría son los huecos entre tareas.", "los descansos entre tareas"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál sería el paso más pequeño para organizar tu día así?",
      options: [
        o("Apagar una notificación", "Apagar una notificación es el comienzo más pequeño.", "apagar una notificación"),
        o("Abrir una sola cosa cada vez", "Abrir una sola cosa cada vez es el comienzo más pequeño.", "abrir una sola cosa cada vez"),
        o("Reservar un rato sin interrupciones", "Reservar un rato sin interrupciones es el comienzo más pequeño.", "reservar un rato sin interrupciones"),
      ],
    },
    20: {
      turn: 20,
      question: "Cuando algo te absorbía y se te iba el tiempo, ¿cómo eras?",
      options: [
        o("Con los ojos brillantes", "Un brillo que los demás podían ver.", "unos ojos brillantes"),
        o("En silencio total", "Te sumergías hondo sin hacer ruido.", "guardar silencio del todo"),
        o("No lo recuerdo bien", "La escena se ha desdibujado, aunque queda el tiempo perdido.", "un recuerdo borroso"),
      ],
    },
    21: {
      turn: 21,
      question: "Si el tú de aquellos momentos de absorción pudiera decirle algo al tú de hoy, ¿qué sería?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, tu atención se desvía primero hacia {g2}, cuando se te dispersa el sentimiento que más se acerca al tuyo es {g4}, y tu concentración se enciende con {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Tu atención se desvía primero hacia {g2}, cuando se te dispersa el sentimiento que más se acerca al tuyo es {g4}, y lo que empiezas suele quedarse a medias {g6}.",
      "Con esas palabras de «no te concentras», lo que pasó contigo fue {g11}. La última tarea que te absorbió te resultó {g13}.",
      "Tu forma habitual de concentrarte: {g15}. En cuanto a gente cuyo ritmo encaje con el tuyo: {g17}. El comienzo más pequeño que elegiste es {g19}.",
    ],
    perspectiveLine: "Lo que dijo el tú de aquellos momentos de absorción también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
