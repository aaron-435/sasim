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
      question: "En ese momento, ¿qué se acerca más a tu ánimo?",
      options: [
        o("Inquietud", "Inclinado hacia no poder estar quieto.", "la inquietud"),
        o("Ansiedad", "El ánimo ya se ha ido por delante a lo que viene.", "la ansiedad"),
        o("Resentimiento", "Un lado donde queda una parte sin resolver.", "el resentimiento"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Ya habías tenido noches así?",
      questionNoQuote: "¿Ya habías tenido noches en que cuesta dormirse?",
      options: [
        o("Desde hace mucho", "Estas noches llevan mucho tiempo.", "noches que vienen de lejos"),
        o("Empezaron hace poco", "Estas noches empezaron hace poco.", "noches que empezaron hace poco"),
      ],
    },
    6: {
      turn: 6,
      question: "Cuando piensas en cuándo empezó a desordenarse tu sueño, ¿qué había?",
      options: [
        o("Cambió mi trabajo", "Coincide con una época en que se movió un gran eje de la vida.", "una época en que cambió el trabajo"),
        o("Cambió una relación", "Un cambio por el lado de las personas llegó a la noche.", "una época en que cambió una relación"),
        o("Nada en particular", "La noche estaba ahí antes que cualquier razón.", "un comienzo sin causa clara"),
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
      question: "Cuando ya estás en la cama, ¿qué te hace seguir retrasando el sueño?",
      options: [
        o("Terminar lo que me queda", "Lo que no terminaste te sigue hasta la cama.", "terminar lo que queda"),
        o("Ver un poco más de vídeos", "El tiempo en pantalla alarga la noche.", "ver vídeos"),
        o("Los pensamientos que empiezan al tumbarme", "Saber de antemano lo que se abre al tumbarte.", "los pensamientos que empiezan al tumbarte"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿La tensión del día te acompaña hasta la noche?",
      options: [
        o("Casi todos los días", "La frontera entre día y noche es fina.", "la tensión del día que sigue cada día"),
        o("Solo los días ajetreados", "Un patrón que sigue los días en que todo se junta.", "la tensión de los días ajetreados"),
      ],
    },
    11: {
      turn: 11,
      question: "¿Hay veces en que estás cansado pero no quieres dormirte?",
      options: [
        o("Sí, me da pena perder la noche", "Hay veces en que no quieres dormir porque te da pena perder la noche.", "no querer perder la noche"),
        o("Sí, no quiero que acabe el día", "Hay veces en que no quieres dormir porque no quieres que acabe el día.", "no querer que acabe el día"),
        o("No, eso no me pasa", "No sientes reparo en dormir cuando estás cansado.", "nada en especial"),
      ],
    },
    12: {
      turn: 12,
      question: "En los días en que dormiste bien, ¿cómo fue el día?",
      options: [
        o("Un día de mucho esfuerzo físico", "El cuerpo tiene que cansarse primero para tumbarte.", "un día de mucho uso del cuerpo"),
        o("Un día en que me sentí ligero", "El sueño vino en los días en que la carga del ánimo bajó.", "un día de ánimo ligero"),
        o("No recuerdo un día especial", "Todavía no se ha formado un criterio claro.", "ningún día que recuerdes"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Qué te da un poco de calma, incluso ahora?",
      options: [
        o("Después de una ducha o un baño caliente", "Después de lavarte con agua caliente, llega un poco de calma.", "lavarte con agua caliente"),
        o("Al oír sonidos tranquilos", "Al oír sonidos tranquilos, llega un poco de calma.", "los sonidos tranquilos"),
        o("Cuando bajo las luces", "Cuando bajas las luces, llega un poco de calma.", "la luz tenue"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando no llega el sueño, ¿te quedas tumbado o te levantas?",
      options: [
        o("Me quedo tumbado esperando", "Una manera de mantener el sitio y esperar.", "quedarte tumbado esperando"),
        o("Me levanto y hago algo", "Salir del sitio y aprovechar el rato.", "levantarte y hacer algo"),
      ],
    },
    15: {
      turn: 15,
      question: "¿Qué usas más a menudo para dormirte?",
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
      question: "¿Hay alguien que sepa que tu sueño se ha desordenado?",
      options: [
        o("Una o dos personas", "Una o dos personas saben que tu sueño se ha desordenado.", "una o dos personas"),
        o("Solo una persona cercana", "Solo una persona cercana sabe que tu sueño se ha desordenado.", "una persona cercana"),
        o("Nadie", "Nadie sabe que tu sueño se ha desordenado.", "nadie"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "En una noche en que te duermes con facilidad, ¿qué cambiaría primero?",
      options: [
        o("La hora a la que me acuesto", "Una imagen que empieza por la hora en que se cierra el día.", "la hora a la que te acuestas"),
        o("Lo que hay en mi cabeza al acostarme", "Una escena donde la cabeza se calla primero al tumbarte.", "lo que hay en tu cabeza al acostarte"),
        o("Cómo me levanto por la mañana", "Una imagen que empieza por la sensación al abrir los ojos.", "cómo te levantas por la mañana"),
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
      question: "¿Hay algo que el tú de ahora quiera dejarle dicho de antemano al tú de esta noche?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, lo primero que se reproduce al apagar la luz es {g2}, tu ánimo entonces se parece a {g4}, y lo que te hace posponer el sueño parece ser {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Lo primero que se reproduce al apagar la luz es {g2}, tu ánimo entonces se parece a {g4}, y lo que empezó a desordenar tu sueño fue {g6}.",
      "Lo que te retiene en la noche: {g11}, y lo que te da un poco de calma aun ahora es {g13}.",
      "Para dormirte, lo tuyo es {g15}; quién lo sabe: {g17}; y una noche más fácil empieza por {g19}.",
    ],
    perspectiveLine: "Lo que le dijiste a tu yo de esta noche también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
