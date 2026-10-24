/**
 * lib/choiceScripts/es/module8.ts — Módulo 8 (sueño · activación nocturna) guion fijo, español (tuteo). Adaptado de ../module8.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE8_SCRIPT_ES: ModuleScript = {
  moduleId: "module8",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿Cuándo te cuesta más conciliar el sueño?",
      options: [
        o("Justo al apagar la luz", "El momento difícil llega justo al apagar la luz.", "justo al apagar la luz"),
        o("Tras dar muchas vueltas", "Se hace difícil tras dar muchas vueltas.", "tras un buen rato dando vueltas"),
        o("Después de despertarme de madrugada", "El momento difícil llega después de despertarte de madrugada.", "después de despertarte de madrugada"),
      ],
    },
    2: {
      turn: 2,
      question: "Si los primeros diez minutos tras apagar la luz fueran un vídeo, ¿qué se vería?",
      options: [
        o("Lo que pasó hoy", "El día sigue sin haberse cerrado.", "lo que pasó hoy"),
        o("Lo que tengo que hacer mañana", "Lo primero que se despliega es la agenda de lo que viene.", "lo que tienes que hacer mañana"),
        o("Algo de hace mucho", "Una noche en que el pasado sube de golpe.", "algo de hace mucho"),
      ],
    },
    3: {
      turn: 3,
      question: "En ese momento, ¿se mueve primero la mente o el cuerpo?",
      options: [
        o("Los pensamientos empiezan a correr", "En ese momento se mueven primero los pensamientos.", "los pensamientos"),
        o("Primero se tensa el cuerpo", "En ese momento se tensa primero el cuerpo.", "el cuerpo"),
      ],
    },
    4: {
      turn: 4,
      question: "En ese momento, ¿qué se parece más a lo que sientes?",
      options: [
        o("Inquietud", "Más cerca de no poder quedarte quieto.", "la inquietud"),
        o("Ansiedad", "Ya te adelantas a lo que viene.", "la ansiedad"),
        o("Resentimiento", "Queda algo sin resolver.", "el resentimiento"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Estas noches vienen de hace mucho o empezaron hace poco?",
      questionNoQuote: "¿Las noches en que cuesta dormirse vienen de hace mucho o empezaron hace poco?",
      options: [
        o("Desde hace mucho", "Llevas mucho tiempo pasando noches así.", "noches que vienen de lejos"),
        o("Empezaron hace poco", "Estas noches empezaron hace poco.", "noches que empezaron hace poco"),
      ],
    },
    6: {
      turn: 6,
      question: "¿Qué estaba pasando en tu vida cuando tu sueño empezó a desordenarse?",
      options: [
        o("Cambió mi trabajo", "Coincide con una época en que cambió algo grande en tu vida.", "un cambio en el trabajo"),
        o("Cambió una relación", "Un cambio en una relación coincide con ello.", "un cambio en una relación"),
        o("Nada en particular", "Empezó sin un motivo que puedas señalar.", "nada en particular"),
      ],
    },
    7: {
      turn: 7,
      question: "¿Sientes que la noche es el momento del día que más es «tuyo»?",
      options: [
        o("Sí, la noche es mi momento", "Sientes que la noche es el momento del día que más es tuyo.", "la noche como tu momento"),
        o("No, no lo siento así", "No sientes la noche como tu momento.", "no reservar la noche aparte"),
      ],
    },
    8: {
      turn: 8,
      question: "Si retrasas el sueño estando ya en la cama, ¿qué suele provocarlo?",
      options: [
        o("Terminar lo que me queda", "Lo que no terminaste te sigue hasta la cama.", "terminar lo que queda"),
        o("Ver un poco más de vídeos", "El tiempo en pantalla alarga la noche.", "ver vídeos"),
        o("Los pensamientos que empiezan al tumbarme", "Ya sabes lo que se abre al tumbarte.", "los pensamientos que empiezan al tumbarte"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿La tensión del día te acompaña hasta la noche?",
      options: [
        o("Casi todos los días", "La frontera entre día y noche es fina.", "la tensión del día que sigue cada día"),
        o("Solo los días ajetreados", "Te acompaña los días en que todo se junta.", "la tensión de los días ajetreados"),
      ],
    },
    11: {
      turn: 11,
      question: "¿Hay veces en que te entra el cansancio pero no quieres dormirte?",
      options: [
        o("Sí, me da pena perder la noche", "Hay veces en que no quieres dormir porque te da pena perder la noche.", "no querer perder la noche"),
        o("Sí, no quiero que acabe el día", "Hay veces en que no quieres dormir porque no quieres que acabe el día.", "no querer que acabe el día"),
        o("No, eso no me pasa", "Cuando te entra el cansancio, no sueles resistirte al sueño.", "no resistirte al sueño"),
      ],
    },
    12: {
      turn: 12,
      question: "En los días en que dormiste bien, ¿cómo fue el día?",
      options: [
        o("Un día de mucho esfuerzo físico", "Primero se cansa el cuerpo y luego te tumbas.", "un día de mucho uso del cuerpo"),
        o("Un día en que me sentí ligero", "El sueño viene los días en que la carga del ánimo es más ligera.", "un día de ánimo ligero"),
        o("No recuerdo un día especial", "Todavía no hay una señal clara.", "ningún día que recuerdes"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Qué te da un poco de calma, incluso ahora?",
      options: [
        o("Después de una ducha o un baño caliente", "Después de lavarte con agua caliente, llega un poco de calma.", "una ducha o un baño caliente"),
        o("Al oír sonidos tranquilos", "Al oír sonidos tranquilos, llega un poco de calma.", "los sonidos tranquilos"),
        o("Cuando bajo las luces", "Cuando bajas las luces, llega un poco de calma.", "la luz tenue"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando no llega el sueño, ¿te quedas en la cama o te levantas?",
      options: [
        o("Me quedo en la cama esperando", "Mantienes el sitio y esperas.", "quedarte en la cama esperando"),
        o("Me levanto y hago algo", "Sales de la cama y aprovechas el rato.", "levantarte y hacer algo"),
      ],
    },
    15: {
      turn: 15,
      question: "¿Qué sueles hacer para intentar dormirte?",
      options: [
        o("Miro el reloj a cada rato", "Al intentar dormir, miras el reloj a cada rato.", "mirar el reloj"),
        o("Dejo algún sonido puesto", "Al intentar dormir, dejas algún sonido puesto.", "dejar algún sonido puesto"),
        o("Aún no tengo un método", "Todavía no has fijado una forma de dormirte.", "no tener aún un método fijo"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Vives con alguien o solo?",
      options: [
        o("Solo", "Un entorno donde la noche es enteramente tuya.", "vivir solo"),
        o("Con alguien", "Una noche con la presencia de alguien cerca.", "vivir con alguien"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Hay alguien que sepa de tus problemas para dormir?",
      options: [
        o("Una o dos personas", "Una o dos personas saben de tus problemas para dormir.", "una o dos personas"),
        o("Solo una persona cercana", "Solo una persona cercana sabe de tus problemas para dormir.", "una persona cercana"),
        o("Nadie", "Nadie sabe de tus problemas para dormir.", "nadie"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si pudieras dormirte con facilidad, ¿qué cambiaría primero?",
      options: [
        o("La hora a la que me acuesto", "Empieza por la hora en que se cierra el día.", "la hora a la que te acuestas"),
        o("Lo que hay en mi cabeza al acostarme", "La cabeza se calla primero al tumbarte.", "lo que hay en tu cabeza al acostarte"),
        o("Cómo me levanto por la mañana", "Empieza por cómo te sientes al abrir los ojos.", "cómo te levantas por la mañana"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál sería la versión más pequeña de empezar eso?",
      options: [
        o("Acostarme un poco antes", "El comienzo más pequeño es acostarte un poco antes.", "acostarte un poco antes"),
        o("Bajar la luz un escalón", "El comienzo más pequeño es bajar la luz un escalón.", "bajar la luz un escalón"),
        o("Dejar mis tareas apuntadas en papel", "El comienzo más pequeño es dejar tus tareas apuntadas en papel.", "dejar tus tareas apuntadas en papel"),
      ],
    },
    20: {
      turn: 20,
      question: "Esta noche, cuando apagues la luz y te acuestes, ¿cómo crees que estarás?",
      options: [
        o("Sin energía", "Acostarte con el peso del día encima.", "estar agotado"),
        o("Con la cabeza llena", "Parece una cabeza que sigue ocupada.", "tener la cabeza llena"),
        o("Ojalá en calma", "La escena que deseas fue la primera en venir.", "desear estar tranquilo"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo que quieras dejarte dicho de antemano para esta noche?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, lo primero que se reproduce al apagar la luz es {g2}, lo que sientes entonces se parece más a {g4}, y lo que te hace posponer el sueño es {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Lo primero que se reproduce al apagar la luz es {g2}, lo que sientes entonces se parece más a {g4}, y cuando tu sueño empezó a desordenarse, lo que había era {g6}.",
      "Cuando te entra el cansancio, lo que cuentas es {g11}, y lo que te da un poco de calma aun ahora es {g13}.",
      "Tu manera de intentar dormir es {g15}. En cuanto a quién sabe de tu sueño, dijiste: {g17}. Y una noche más fácil empieza por {g19}.",
    ],
    perspectiveLine: "Lo que te dijiste para esta noche también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
