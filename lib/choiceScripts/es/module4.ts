/**
 * lib/choiceScripts/es/module4.ts — Módulo 4 (la máscara · yo social) guion fijo, español (tuteo). Adaptado de ../module4.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE4_SCRIPT_ES: ModuleScript = {
  moduleId: "module4",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿En qué lugar aparece más a menudo esa faceta tuya?",
      questionNoQuote: "¿En qué tipo de lugar sueles cambiar tu forma de ser según la otra persona?",
      options: [
        o("En el trabajo o en clase", "Aparece más a menudo en el trabajo o en clase.", "el trabajo o la clase"),
        o("En grupos o entre amigos", "Aparece más a menudo en grupos o entre amigos.", "los grupos o los amigos"),
        o("Delante de la familia", "Aparece más a menudo delante de la familia.", "la familia"),
      ],
    },
    2: {
      turn: 2,
      question: "En ese lugar, ¿qué es lo que más ajustas?",
      options: [
        o("La expresión", "La cara se mueve primero según la situación.", "la expresión"),
        o("El tono", "Regular la calidez de la voz.", "el tono"),
        o("La opinión", "Poner tu propia opinión un paso atrás.", "la opinión"),
      ],
    },
    3: {
      turn: 3,
      question: "Justo al terminar ese encuentro, ¿cómo se siente más tu cuerpo?",
      options: [
        o("Quiero descansar enseguida", "Al terminar, tu cuerpo quiere descansar enseguida.", "un cuerpo que quiere descansar enseguida"),
        o("Mejor de lo que esperaba", "Incluso al terminar, tu cuerpo está mejor de lo que esperabas.", "un cuerpo que está bien"),
      ],
    },
    4: {
      turn: 4,
      question: "Justo al terminar, ¿qué se parece más a lo que te queda por dentro?",
      options: [
        o("Cansancio", "El rastro de la energía gastada está en el centro.", "el cansancio"),
        o("Soledad", "Queda un hueco donde pasó la risa.", "la soledad"),
        o("Alivio", "Soltar el aire porque ya terminó.", "el alivio"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Sientes que tu forma de ser cambia según con quién estés?",
      options: [
        o("Bastante", "Tu forma de ser cambia bastante según con quién estés.", "una forma de ser que cambia mucho"),
        o("Solo un poco", "Con personas distintas, tu forma de ser cambia solo un poco.", "una forma de ser que cambia poco"),
      ],
    },
    6: {
      turn: 6,
      question: "¿Recuerdas cuándo empezaste a ajustarte así?",
      options: [
        o("Desde la infancia", "Una manera que lleva mucho tiempo en el cuerpo.", "desde la infancia"),
        o("Al pasar a la vida adulta", "Un hábito que nació al cambiar los lugares.", "desde que empezó tu vida adulta"),
        o("No lo sé", "Ha seguido sin un punto de partida claro.", "algo sin un comienzo claro"),
      ],
    },
    7: {
      turn: 7,
      question: "¿Delante de quién se vuelve más gruesa tu máscara?",
      options: [
        o("Ante gente que acabo de conocer", "La máscara es más gruesa ante gente que acabas de conocer.", "gente que acabas de conocer"),
        o("Ante gente que conozco de hace tiempo", "La máscara es más gruesa ante gente que conoces desde hace tiempo.", "gente que conoces desde hace tiempo"),
      ],
    },
    8: {
      turn: 8,
      question: "Cuando se fija un plan con gente, ¿cómo reacciona tu ánimo?",
      options: [
        o("Me hace ilusión", "Primero está la ilusión de esperar ese día.", "la ilusión"),
        o("Ya me cansa", "Calcular de antemano la energía de ese día.", "el cansancio que llega antes de tiempo"),
        o("Solo lo sé cuando llega el día", "Hay sentimientos que no se deciden de antemano.", "un sentimiento que solo aparece ese día"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿Qué sientes que pasaría si te quitaras la máscara?",
      options: [
        o("Decepcionaría", "Lo primero que aparece es no estar a la altura.", "la idea de decepcionar"),
        o("Me alejaría de la gente", "Lo que aparece es que cambie la distancia en la relación.", "la idea de alejarte de la gente"),
        o("Seguramente nada", "Una imagen en que quitártela cambia poco.", "pensar que no pasaría nada"),
      ],
    },
    11: {
      turn: 11,
      question: "Ahora mismo, ¿qué es lo que protege tu máscara?",
      options: [
        o("A mí", "La máscara te está protegiendo a ti ahora mismo.", "tu propia persona"),
        o("La relación", "La máscara está protegiendo la relación ahora mismo.", "la relación"),
        o("Mi lugar", "La máscara está protegiendo tu lugar ahora mismo.", "tu lugar"),
      ],
    },
    12: {
      turn: 12,
      question: "¿Qué se acerca más a cómo crees que eres sin máscara?",
      options: [
        o("Mucho más callado", "Las palabras y las expresiones bajan un escalón.", "un yo mucho más callado"),
        o("Mucho más sincero", "Los pensamientos salen sin filtro.", "un yo mucho más sincero"),
        o("No muy distinto", "Los dos yos están más cerca de lo que parece.", "un yo no muy distinto"),
      ],
    },
    13: {
      turn: 13,
      question: "Delante de alguien con quien puedes ser tú sin máscara, ¿qué cambia?",
      options: [
        o("Las palabras salen fáciles", "Delante de esa persona, las palabras salen fáciles.", "palabras que salen fáciles"),
        o("Se me relaja la cara", "Delante de esa persona, se te relaja la cara.", "una cara relajada"),
        o("No tengo que hacer nada", "Delante de esa persona, no tienes que hacer nada.", "no tener que hacer nada"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "En un día en que ocultaste lo que sentías, ¿cómo sueles recuperarte?",
      options: [
        o("Con tiempo a solas", "Recargar en el silencio.", "tiempo a solas"),
        o("Con una persona cómoda", "La persona con quien te sientes a gusto es donde te recuperas.", "una persona cómoda"),
        o("Durmiendo o descansando", "Recomponerte tumbándote.", "dormir y descansar"),
      ],
    },
    15: {
      turn: 15,
      question: "Ese tiempo de recuperación, ¿te basta ahora?",
      options: [
        o("Me basta", "El tiempo de recuperación te basta ahora.", "tiempo suficiente"),
        o("Siempre me falta", "El tiempo de recuperación siempre te falta ahora.", "tiempo que falta"),
        o("No lo sé", "Aún no sabes si el tiempo de recuperación basta.", "un tiempo difícil de medir"),
      ],
    },
    16: {
      turn: 16,
      question: "En un día con la máscara puesta, ¿cómo te sentaría que alguien notara cómo estás?",
      options: [
        o("Me alegraría", "Hay un deseo de que te noten.", "el deseo de que te noten"),
        o("Me pesaría", "Cierta cautela ante que te miren por dentro.", "el peso de que te miren por dentro"),
        o("Sentiría que me descubrieron", "Más cerca de la sensación de que sale lo escondido.", "la sensación de que te descubran"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Hay ahora a tu lado alguien con quien puedas ser tú sin máscara?",
      options: [
        o("Una o dos personas", "Hay a tu lado una o dos personas con quienes puedes ser tú sin máscara.", "una o dos personas"),
        o("Había, pero nos alejamos", "Había alguien así a tu lado, pero se alejó.", "alguien que se alejó"),
        o("Todavía no", "Todavía no hay a tu lado nadie con quien ser tú sin máscara.", "nadie todavía"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si te quitaras un poco la máscara, ¿en qué lugar querrías empezar?",
      options: [
        o("Delante de la persona más cómoda", "Un deseo de soltarte primero en el lugar más seguro.", "delante de la persona más cómoda"),
        o("Delante de la familia", "Querer dejarla primero con quien está cerca.", "la familia"),
        o("En un escrito o un diario", "Una manera que viene a la mente: escribirlo primero a solas.", "en un escrito o un diario"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál sería la forma más pequeña de quitártela ahí?",
      options: [
        o("Sonreír menos por compromiso", "Lo más pequeño sería sonreír menos por compromiso.", "sonreír menos por compromiso"),
        o("Decir una línea sincera", "Lo más pequeño sería decir una línea sincera.", "decir una línea sincera"),
        o("Decir que necesito descansar", "Lo más pequeño sería decir que necesitas descansar.", "decir que necesitas descansar"),
      ],
    },
    20: {
      turn: 20,
      question: "Alguien a tu lado sonríe exactamente igual en el mismo lugar. ¿Cómo crees que está por dentro?",
      options: [
        o("Sin fuerzas", "Una imagen en la que se te va la vista al cansancio tras la sonrisa.", "una cara de agotamiento"),
        o("A gusto", "Alguien para quien ese lugar es natural.", "una cara de estar a gusto"),
        o("No lo sé", "Lo de dentro de los demás no se ve por fuera.", "una cara que no se puede leer"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo que le dirías en voz baja a esa persona?",
    },
  },
  checkpoint: [
    "Por lo que me contaste, el lugar donde la máscara es más gruesa es {g1}, lo que más ajustas es {g2}, tras un encuentro te queda {g4} y ante un plan con gente te viene {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "El lugar donde la máscara es más gruesa es {g1}, y tras un encuentro lo que te queda es {g4}.",
      "Lo que protege tu máscara es {g11}. Con alguien con quien puedes ser tú sin máscara, cambia esto: {g13}.",
      "En los días que ocultas lo que sientes, te recuperas con {g14}. Sobre alguien con quien ser tú sin máscara: {g17}. Y querrías empezar por {g19}.",
    ],
    perspectiveLine: "Lo que le dijiste a la persona de al lado en ese mismo lugar también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me contaste para escribir tu informe.",
  },
};
