/**
 * lib/choiceScripts/es/module1.ts — Módulo 1 (apego · alarma en la relación) guion fijo, español (tuteo).
 * Adaptado de ../module1.ts: mismas 22 vueltas y mismo mapa de campos.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE1_SCRIPT_ES: ModuleScript = {
  moduleId: "module1",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿En qué tipo de momento se despierta más esa sensación?",
      questionNoQuote: "¿En qué tipo de momento se agita más tu ánimo en las relaciones cercanas?",
      options: [
        o("Cuando tardan en responder", "Se despierta más cuando tardan en responder.", "que tarden en responder"),
        o("Cuando cambia su tono", "Se despierta más cuando cambia su tono.", "un cambio de tono"),
        o("Cuando cambian los planes", "Se despierta más cuando cambian los planes.", "los planes que cambian"),
      ],
    },
    2: {
      turn: 2,
      question: "Cuando no llega la respuesta, ¿cuál es la primera historia que te viene a la cabeza?",
      options: [
        o("Tendrá mucho que hacer", "Sueles buscar primero la razón en la situación del otro.", "la idea de que tendrá mucho que hacer"),
        o("¿Habré hecho algo mal?", "La primera flecha apunta hacia ti.", "la idea de que hiciste algo mal"),
        o("No me viene nada en particular", "Que no se pegue ninguna historia también es una respuesta.", "nada en particular"),
      ],
    },
    3: {
      turn: 3,
      question: "En ese momento, ¿hacia dónde se inclina más tu ánimo?",
      options: [
        o("Quiero acercarme", "En ese momento te nace acercarte.", "las ganas de acercarte"),
        o("Necesito espacio para respirar", "En ese momento necesitas espacio para respirar.", "las ganas de tomar distancia"),
      ],
    },
    4: {
      turn: 4,
      question: "Si pusieras una palabra a ese sentimiento, ¿cuál se acerca más?",
      options: [
        o("Ansiedad", "La preocupación crece en los huecos de silencio.", "la ansiedad"),
        o("Dolor por lo que no recibo", "El ánimo se queda enganchado en lo que no llegó.", "el dolor"),
        o("Agobio", "Una sensación de no tener salida ocupa el centro.", "el agobio"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Este patrón ya apareció en relaciones pasadas o es la primera vez?",
      questionNoQuote: "¿Tu ánimo ya se había agitado así en relaciones cercanas antes o es la primera vez?",
      options: [
        o("Sí, también antes", "Es un patrón que también apareció en relaciones pasadas.", "un patrón que también se dio antes"),
        o("Es la primera vez", "Es un patrón que aparece por primera vez en esta relación.", "un patrón que aparece por primera vez"),
      ],
    },
    6: {
      turn: 6,
      question: "Cuando algo te duele, ¿qué sueles hacer?",
      options: [
        o("Lo digo con palabras", "Eres de quienes ponen lo que sienten en palabras.", "ponerlo en palabras"),
        o("Hago como si nada", "Dejar la superficie en calma y guardarlo dentro.", "hacer como si nada"),
        o("Hablo menos", "Crear distancia hablando menos.", "hablar menos"),
      ],
    },
    7: {
      turn: 7,
      question: "Después de una discusión, ¿quién suele tender la mano primero?",
      options: [
        o("Yo", "Después de una discusión, sueles ser quien tiende la mano primero.", "ser quien tiende la mano primero"),
        o("Espero a que lo haga el otro", "Después de una discusión, sueles esperar a que el otro tienda la mano.", "esperar a que el otro dé el paso"),
      ],
    },
    8: {
      turn: 8,
      question: "Después de una discusión, ¿qué se parece más a lo que haces?",
      options: [
        o("Contacto para comprobar", "Comprobar directamente en vez de dejarlo en duda.", "contactar para comprobar"),
        o("Me tomo tiempo a solas para ordenarme", "Hacerte primero un espacio para ordenar lo que sientes.", "tomarte tiempo a solas para ordenarte"),
        o("Me ocupo con otras cosas", "Acallar lo que sientes con la rutina.", "ocuparte con otras cosas"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "¿De dónde sientes que viene esa idea de cómo hay que ser para que te quieran?",
      questionNoQuote: "Si tienes una idea de cómo hay que ser para que te quieran, ¿de dónde sientes que viene?",
      options: [
        o("De una relación anterior", "Más bien una regla aprendida en una relación pasada.", "una relación anterior"),
        o("De mi infancia", "Una regla que llega hasta recuerdos antiguos.", "un recuerdo de la infancia"),
        o("No lo sé", "Te acompaña sin que su origen esté claro.", "algo de origen desconocido"),
      ],
    },
    11: {
      turn: 11,
      question: "¿Qué completa mejor esta frase: «Para que me quieran, tengo que ___»?",
      options: [
        o("tratar muy bien al otro", "Es decir, sientes que para que te quieran tienes que tratar muy bien al otro.", "la creencia de que hay que tratar muy bien al otro"),
        o("aguantar", "Es decir, para que te quieran tienes que aguantar.", "la creencia de que hay que aguantar"),
        o("ser alguien que el otro necesite", "Es decir, para que te quieran tienes que ser alguien que el otro necesite.", "la creencia de que hay que ser alguien que el otro necesite"),
      ],
    },
    12: {
      turn: 12,
      question: "Cuando el otro se porta muy bien contigo, ¿hacia dónde va tu ánimo?",
      options: [
        o("Me da calma", "Recibir lo que te dan tal cual.", "sentir calma"),
        o("Más bien me da ansiedad", "En un buen momento la guardia sube primero.", "la ansiedad que sube cuando todo va bien"),
        o("Quiero tomar distancia", "Dar un paso atrás cuanto más cerca se está.", "echarte atrás cuando hay cercanía"),
      ],
    },
    13: {
      turn: 13,
      question: "¿En qué tipo de momento sientes que te quieren?",
      options: [
        o("Cuando me lo dicen", "Sientes el cariño cuando te lo dicen con palabras.", "oír el cariño en palabras"),
        o("Cuando lo veo en hechos", "Sientes el cariño cuando lo ves en hechos.", "ver el cariño en hechos"),
        o("Cuando están a mi lado", "Sientes el cariño cuando están a tu lado.", "tener al otro a tu lado"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando algo te incomoda por dentro, ¿qué sueles hacer?",
      options: [
        o("Lo proceso a solas", "Darte primero un tiempo para digerirlo a solas.", "procesarlo a solas"),
        o("Se lo cuento a alguien", "Aliviarlo compartiéndolo con palabras.", "contárselo a alguien"),
        o("Depende del momento", "Moverte entre los dos caminos según la situación.", "que dependa del momento"),
      ],
    },
    15: {
      turn: 15,
      question: "Cuando eso te incomoda, ¿cómo lo calmas sobre todo?",
      options: [
        o("Me doy tiempo a solas", "Sobre todo la calmas dándote tiempo a solas.", "tiempo a solas"),
        o("Busco que el otro me lo confirme", "Sobre todo la calmas buscando que el otro te lo confirme.", "la confirmación del otro"),
        o("Me meto de lleno en otra cosa", "Sobre todo la calmas metiéndote de lleno en otra cosa.", "meterte de lleno en otra cosa"),
      ],
    },
    16: {
      turn: 16,
      question: "Después de hacer eso, ¿cómo queda la relación con el otro?",
      options: [
        o("Nos acercamos", "La distancia se acorta una vez resuelto.", "acercarnos"),
        o("Nos alejamos", "El ánimo se calma pero la distancia se abre.", "alejarnos"),
        o("Queda igual", "No suele cambiar mucho lo que hay entre los dos.", "quedar igual"),
      ],
    },
    17: {
      turn: 17,
      question: "En esos momentos, ¿qué suele hacer la otra persona?",
      options: [
        o("Se acerca primero", "En esos momentos suele acercarse primero.", "acercarse primero"),
        o("Espera", "En esos momentos suele esperarte.", "esperar"),
        o("Se aparta también", "En esos momentos suele apartarse también.", "apartarse también"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "En una relación estable, ¿qué escena del día es la primera que te viene a la mente?",
      options: [
        o("Una tarde pasada juntos", "Una imagen con el tiempo juntos en el centro.", "una tarde pasada juntos"),
        o("Cada uno cuidando su tiempo", "Primero llega la imagen de respetar el espacio del otro.", "cada uno cuidando su tiempo"),
        o("Estar bien aunque casi no nos escribamos", "Una escena donde no tener noticias no te sacude.", "estar bien aunque haya poco contacto"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál es el paso más pequeño para acercarte a esa escena?",
      options: [
        o("Decir mi dolor en una línea", "Decir el dolor en una línea es el paso más pequeño.", "decir tu dolor en una línea"),
        o("Esperar un día aunque tarde en responder", "Esperar un día aunque tarde en responder es el paso más pequeño.", "esperar un día"),
        o("Preguntar primero cómo está", "Preguntar primero cómo está es el paso más pequeño.", "preguntar primero cómo está"),
      ],
    },
    20: {
      turn: 20,
      question: "Cuando empiece tu próximo amor y suene tu alarma interior, ¿cómo te imaginas?",
      options: [
        o("Tomándome un respiro", "Una imagen con una pausa antes de moverse.", "tomarte un respiro"),
        o("Comprobando primero, como ahora", "Una imagen donde sigue la forma de hoy.", "comprobar primero"),
        o("No lo veo claro", "Que aún no tenga contorno también es una respuesta.", "una imagen todavía borrosa"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo que el tú de hoy quiera decirle de verdad al tú de aquel momento?",
    },
  },
  checkpoint: [
    "Por lo que me contaste, cuando no llega la respuesta lo primero que aparece es {g2}; lo que sientes entonces es, más que nada, {g4}; y tras una discusión lo primero es {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Cuando no llega la respuesta, lo primero que aparece es {g2}, y lo que sientes entonces es, más que nada, {g4}.",
      "Tras una discusión, lo primero es {g8}, y en cuanto a que te quieran, te acompaña {g11}.",
      "Lo que te hace sentir que te quieren es {g13}; lo que te calma cuando algo te incomoda es {g15}; lo que suele hacer el otro entonces es {g17}; y querrías empezar por {g19}.",
    ],
    perspectiveLine: "Lo que le dijiste a quien empieza su próximo amor también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me contaste para escribir tu informe.",
  },
};
