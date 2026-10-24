/**
 * lib/choiceScripts/es/module9.ts — Módulo 9 (familia de origen) guion fijo, español (tuteo). Adaptado de ../module9.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE9_SCRIPT_ES: ModuleScript = {
  moduleId: "module9",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "Después de hablar con tu familia, ¿cuánto suele durar esa sensación?",
      options: [
        o("Se calma en unas horas", "La sensación tras hablar con la familia se calma en unas horas.", "unas horas"),
        o("Dura varios días", "La sensación tras hablar con la familia dura varios días.", "varios días"),
        o("Se queda mucho tiempo", "La sensación tras hablar con la familia se queda mucho tiempo.", "mucho tiempo"),
      ],
    },
    2: {
      turn: 2,
      question: "En esas conversaciones, ¿de qué lado sueles estar?",
      options: [
        o("Del que habla", "Sueles llevar la conversación.", "el de quien habla"),
        o("Del que escucha", "Sueles ser quien escucha.", "el de quien escucha"),
        o("Del que media entre unos y otros", "Sueles ir y venir suavizando las cosas.", "el de quien media entre unos y otros"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Quién suele dar el primer paso para contactar con la familia?",
      options: [
        o("Yo", "Con la familia, eres quien contacta primero.", "contactar tú primero"),
        o("Ellos", "Sobre todo contacta primero tu familia.", "que contacte primero la familia"),
        o("Más o menos por igual", "Con la familia, el contacto va más o menos por igual en los dos sentidos.", "un contacto más o menos igual"),
      ],
    },
    4: {
      turn: 4,
      question: "Cuando termina la conversación, ¿qué se parece más a lo que se queda contigo?",
      options: [
        o("Culpa", "Un aire de deuda se queda en un rincón del ánimo.", "la culpa"),
        o("Dolor", "Quedan palabras que no llegaron.", "el dolor"),
        o("Un peso de responsabilidad", "La parte que cargas se siente pesada.", "un peso de responsabilidad"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Tu lugar actual en la familia, ¿es el mismo desde la infancia o llegó al crecer?",
      options: [
        o("Desde la infancia", "Tu lugar actual en la familia es el mismo desde la infancia.", "desde la infancia"),
        o("Llegó al crecer", "Tu lugar actual en la familia llegó al crecer.", "desde que creciste"),
      ],
    },
    6: {
      turn: 6,
      question: "Si pusieras nombre a tu lugar en la familia, ¿cuál se acerca más?",
      options: [
        o("Quien media", "La persona que se ponía entre las peleas.", "el de quien media"),
        o("Quien protege", "La persona que cuida a alguien.", "el de quien protege"),
        o("Quien calla", "Mucho tiempo pasado bajando la voz.", "el de quien calla"),
      ],
    },
    7: {
      turn: 7,
      question: "Ese lugar, ¿lo asumiste tú o acabaste en él sin más?",
      options: [
        o("Lo asumí yo", "Asumiste tú ese lugar.", "asumirlo tú"),
        o("Acabé en él sin más", "Acabaste en ese lugar sin más.", "acabar en él sin más"),
      ],
    },
    8: {
      turn: 8,
      question: "Cuando surgía un conflicto en la familia, ¿dónde estabas tú?",
      options: [
        o("En medio, pasando mensajes", "Justo entre las palabras de ambos lados.", "justo en medio"),
        o("Al lado de uno, escuchando", "Cerca de la versión de una persona.", "al lado de una persona"),
        o("Un paso más allá", "Mirando desde un poco más lejos.", "un paso más allá"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "La parte que asumías, ¿iba más de cuidados o de acoger los sentimientos?",
      options: [
        o("Tareas de casa y cuidados", "Has asumido buena parte del trabajo práctico.", "los cuidados y las tareas de casa"),
        o("Acoger sus sentimientos", "Estuviste mucho tiempo en el papel de acoger sentimientos.", "acoger sentimientos"),
        o("Ninguna de las dos", "Tu parte estaba en otro sitio.", "otra parte"),
      ],
    },
    11: {
      turn: 11,
      question: "¿Cómo crees que se sentiría dejar ese lugar?",
      options: [
        o("La familia se tambalearía", "Sientes que, si lo dejas, la familia se tambalearía.", "la sensación de que la familia se tambalearía"),
        o("Dejaría de hacer falta", "Sientes que, si lo dejas, dejarías de hacer falta.", "la sensación de que dejarías de hacer falta"),
        o("No lo sé", "No sabes cómo se sentiría dejarlo.", "algo que todavía no sabes"),
      ],
    },
    12: {
      turn: 12,
      question: "De lo que has hecho en ese lugar, ¿qué ha tenido sentido para ti?",
      options: [
        o("Ver a mi familia tranquila", "Sacaste fuerzas de ver más tranquilas a las personas que tenías al lado.", "ver a tu familia tranquila"),
        o("Sentirme alguien en quien confiar", "Queda la sensación de haber estado a la altura de lo que se esperaba.", "sentirte alguien en quien confiar"),
        o("Nunca lo sentí con sentido", "El papel llegó antes de que pudieras darle un sentido.", "no sentir ningún sentido"),
      ],
    },
    13: {
      turn: 13,
      question: "Incluso ahora, ¿cuándo estás un poco a gusto con tu familia?",
      options: [
        o("Cuando comemos juntos", "Comer juntos con la familia es un momento de tranquilidad.", "comer juntos"),
        o("Cuando hablamos entre risas", "Hablar y reír juntos hace que estar con la familia sea un poco más fácil.", "la conversación entre risas"),
        o("Solo con una persona", "Solo con una persona de la familia estás un poco a gusto.", "el tiempo con una persona en concreto"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "¿A qué se parece ahora la distancia con tu familia?",
      options: [
        o("Demasiado cerca, y cuesta", "A esa distancia, todo te llega más.", "una distancia demasiado corta"),
        o("Demasiado lejos, y cuesta", "La distancia que se ha abierto te pesa.", "una distancia demasiado larga"),
        o("Me parece adecuada", "La distancia actual parece encajar.", "una distancia adecuada"),
      ],
    },
    15: {
      turn: 15,
      question: "¿Cómo ajustas esa distancia?",
      options: [
        o("Regulo cuánto contactamos", "Para ajustar la distancia, regulas cuánto contactas.", "regular cuánto contactas"),
        o("Reduzco el tiempo que nos vemos", "Para ajustar la distancia, reduces el tiempo de verse.", "reducir el tiempo juntos"),
        o("Me cuesta ajustarla", "Ajustar la distancia con la familia te cuesta.", "no saber bien cómo ajustarla"),
      ],
    },
    16: {
      turn: 16,
      question: "Ese lugar en la familia, ¿también aparece en otras relaciones?",
      options: [
        o("También con amigos o pareja", "Ocupas el mismo lugar también con amigos o pareja.", "las relaciones con amigos o pareja"),
        o("También en el trabajo", "La misma forma aparece en el trabajo.", "el trabajo"),
        o("No, en otros sitios no", "Ese lugar se queda dentro de la familia.", "solo dentro de la familia"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Alguien ha reconocido el papel que has tenido ahí?",
      options: [
        o("Una o dos personas", "Una o dos personas han reconocido el papel que has tenido ahí.", "una o dos personas"),
        o("Alguien de mi familia", "Alguien de tu familia ha reconocido el papel que has tenido ahí.", "una persona de la familia"),
        o("Todavía nadie", "Nadie ha reconocido todavía el papel que has tenido ahí.", "nadie todavía"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si pudieras ser como eres sin perder el vínculo con tu familia, ¿qué cambiaría primero?",
      options: [
        o("Cómo mantenemos el contacto", "Lo primero que cambia es cómo mantienes el vínculo.", "cómo mantienes el contacto"),
        o("La parte que asumo", "Lo primero que cambia es el tamaño de la parte que asumes.", "la parte que asumes"),
        o("El peso en el ánimo", "Lo primero que se aligera es el peso en el ánimo.", "el peso en el ánimo"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál sería la versión más pequeña de empezar eso?",
      options: [
        o("No responder al instante", "El comienzo más pequeño es no responder al instante.", "no responder al instante"),
        o("Elegir yo mis horas de contacto", "El comienzo más pequeño es elegir tú tus horas de contacto.", "elegir tú tus horas de contacto"),
        o("Repartir una de las tareas que llevo", "El comienzo más pequeño es repartir una de las tareas que llevas.", "repartir una de las tareas que llevas"),
      ],
    },
    20: {
      turn: 20,
      question: "Imagínate cuando asumiste por primera vez ese lugar. ¿Cómo crees que eras?",
      options: [
        o("Muy formal, como un adulto", "Comportándote como un adulto.", "estar muy formal"),
        o("En silencio, leyendo el ambiente", "Tiempo pasado leyendo el ambiente.", "estar callado, atento al ambiente"),
        o("No lo recuerdo bien", "Ese recuerdo se ha ido desdibujando con el tiempo.", "un recuerdo que se ha alejado"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo que quieras decirle a quien eras entonces?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, en esas conversaciones tu papel es {g2}, lo que se queda contigo después es sobre todo {g4}, y cuando surgía un conflicto tu sitio era {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "En la familia tu papel ha sido {g6}, cuando surgía un conflicto tu sitio era {g8}, y lo que se quedaba contigo después era {g4}.",
      "Al imaginar que dejas ese lugar, lo que surge es {g11}, y aun así {g13} te alivia un poco.",
      "Tu manera de ajustar la distancia es {g15}. En cuanto a quién ha reconocido tu papel, la respuesta es {g17}. Y si pudieras ser como eres sin perder el vínculo, querrías empezar por {g19}.",
    ],
    perspectiveLine: "Lo que le dijiste a quien eras entonces también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
