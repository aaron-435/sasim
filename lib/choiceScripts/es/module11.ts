/**
 * lib/choiceScripts/es/module11.ts — Módulo 11 (instinto · silencio propio) guion fijo, español (tuteo). Adaptado de ../module11.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE11_SCRIPT_ES: ModuleScript = {
  moduleId: "module11",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "Cuando las miradas de la gente se juntan en ti, ¿qué sueles hacer?",
      options: [
        o("Me quedo donde estoy", "Cuando las miradas se dirigen a ti, te quedas donde estás.", "quedarte bajo la mirada"),
        o("Me escabullo", "Cuando las miradas se dirigen a ti, te escabulles.", "escabullirte"),
        o("Se lo paso a otro", "Cuando las miradas se dirigen a ti, le pasas el foco a otra persona.", "pasárselo a otro"),
      ],
    },
    2: {
      turn: 2,
      question: "Piensa en una vez reciente en que te callaste justo antes de decir algo. ¿Qué era?",
      options: [
        o("Mi opinión", "Un pensamiento que se detuvo justo en tus labios.", "tu opinión"),
        o("Una petición o un deseo", "Algo que querías, guardado hacia dentro.", "una petición o un deseo"),
        o("Un rechazo", "Un «no» que se quedó en la garganta.", "un rechazo"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Qué relación tenías con las personas que estaban allí?",
      options: [
        o("Cercana", "Las personas que estaban allí eran cercanas a ti.", "una relación cercana"),
        o("Apenas las conocía", "Apenas conocías a las personas que estaban allí.", "apenas conocerse"),
      ],
    },
    4: {
      turn: 4,
      question: "Después, ¿cuál de estos sentimientos se acerca más al tuyo?",
      options: [
        o("Agobio", "Se queda atrás una sensación de bloqueo.", "el agobio"),
        o("Pena por lo que dejé pasar", "Sigues mirando atrás, a lo que se te escapó.", "la pena por lo que dejaste pasar"),
        o("Alivio", "Lo primero fue soltar el aire.", "el alivio"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Con qué frecuencia dices cosas como «lo que sea» o «da igual, estoy bien»?",
      options: [
        o("A menudo", "A menudo dices «lo que sea» o «estoy bien».", "decirlo a menudo"),
        o("A veces", "A veces dices «lo que sea» o «estoy bien».", "decirlo a veces"),
        o("Casi nunca", "Casi nunca dices «lo que sea» o «estoy bien».", "casi nunca decirlo"),
      ],
    },
    6: {
      turn: 6,
      question: "¿Dónde sueles acabar callándote lo que piensas?",
      options: [
        o("En grupo", "Cuanta más gente, más baja la voz.", "en grupo"),
        o("Cara a cara, a solas con alguien", "Las palabras se repliegan más cuando sois solo dos.", "cara a cara"),
        o("En el trabajo", "El trabajo es donde más te callas.", "en el trabajo"),
      ],
    },
    7: {
      turn: 7,
      question: "Cuando alguien te dice que lo hiciste bien, ¿qué haces primero?",
      options: [
        o("Lo acepto y doy las gracias", "Cuando te dicen que lo hiciste bien, lo aceptas con gratitud.", "aceptarlo con gratitud"),
        o("Le quito importancia", "Cuando te dicen que lo hiciste bien, primero le quitas importancia.", "quitarle importancia primero"),
      ],
    },
    8: {
      turn: 8,
      question: "Justo antes de callarte, ¿qué te pasa primero por la cabeza?",
      options: [
        o("Destacar", "Lo primero que te frena es llamar la atención.", "la idea de destacar"),
        o("Equivocarme", "Primero pesas si es lo correcto.", "la idea de equivocarte"),
        o("Romper el ambiente", "Lo primero que notas es el ambiente del lugar.", "la idea de romper el ambiente"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Cuando dijiste lo que querías, ¿qué tipo de respuesta te llegó con más frecuencia?",
      options: [
        o("Lo aceptaron", "Recuerdas palabras que llegaron a su sitio.", "que te lo aceptaran"),
        o("Lo dejaron pasar", "Recuerdas palabras que pasaron sin llegar.", "que te lo dejaran pasar"),
        o("Se rieron de mí", "Una respuesta de risa es de las que se quedan.", "que se rieran de ti"),
      ],
    },
    11: {
      turn: 11,
      question: "Si mostraras lo que quieres, ¿cómo crees que resultaría?",
      options: [
        o("Egoísta", "Sientes que mostrar lo que quieres se vería egoísta.", "egoísta"),
        o("Raro", "Sientes que mostrar lo que quieres resultaría raro.", "raro"),
        o("Nada del otro mundo", "Sientes que mostrar lo que quieres no sería para tanto.", "nada del otro mundo"),
      ],
    },
    12: {
      turn: 12,
      question: "Cuando te miras en el espejo, ¿qué es lo primero que ves?",
      options: [
        o("Lo que me gusta", "Primero encuentras lo que te gusta.", "lo que te gusta"),
        o("Lo que quiero arreglar", "Lo que quieres arreglar te llama primero la atención.", "lo que quieres arreglar"),
        o("Paso de largo", "No sueles mirarte mucho rato.", "pasar de largo"),
      ],
    },
    13: {
      turn: 13,
      question: "Cuando miras atrás lo que te callaste, ¿qué se acerca más a lo que sientes?",
      options: [
        o("Me queda arrepentimiento", "Al mirar atrás lo que te callaste, te queda arrepentimiento.", "el arrepentimiento"),
        o("Más bien siento alivio", "Al mirar atrás lo que te callaste, más bien sientes alivio.", "el alivio"),
        o("Depende de la ocasión", "Al mirar atrás lo que te callaste, lo que sientes cambia según el momento.", "un ánimo que cambia"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando surge un lugar desconocido o algo improvisado, ¿qué haces?",
      options: [
        o("Voy hacia lo conocido", "Encuentras tranquilidad en elegir un camino ya conocido.", "ir hacia lo conocido"),
        o("Me dejo llevar por ahora", "Te dejas llevar por la corriente y observas.", "dejarte llevar por ahora"),
        o("Pruebo yo primero", "Das tú el primer paso hacia lo desconocido.", "probar primero"),
      ],
    },
    15: {
      turn: 15,
      question: "¿Adónde suele ir un sentimiento que te callaste?",
      options: [
        o("Se olvida", "Un sentimiento callado suele olvidarse.", "olvidado"),
        o("Lo digiero a solas", "Un sentimiento callado sueles digerirlo a solas.", "digerido a solas"),
        o("Estalla más tarde", "Un sentimiento callado suele estallar más tarde.", "estallando más tarde"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Cómo eres cuando estás a solas?",
      options: [
        o("Libre, casi cantando o bailando", "Hay un yo que se suelta cuando no hay nadie.", "la libertad cuando estás a solas"),
        o("Con cuidado incluso a solas", "Te vigilas aun sin ojos que te miren.", "cuidarte incluso a solas"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Hay a tu lado alguien a quien puedas decirle con comodidad lo que quieres?",
      options: [
        o("Una o dos personas", "Hay una o dos personas a quienes puedes decirles con comodidad lo que quieres.", "una o dos personas"),
        o("A veces, en ciertos momentos", "Hay momentos en que dices con comodidad lo que quieres.", "solo ciertos momentos"),
        o("Todavía nadie", "Todavía no hay nadie a quien decirle con comodidad lo que quieres.", "nadie todavía"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "¿Cuándo piensas «así sí que soy bastante yo»?",
      options: [
        o("Cuando estoy a solas", "Ser tú se nota más cuando estás a solas.", "cuando estás a solas"),
        o("Cuando estoy con alguien cómodo", "Alguien a tu lado te ayuda a soltarte.", "cuando estás con alguien cómodo"),
        o("Cuando me absorbe algo", "Te ves más a ti en lo que tienes entre manos.", "cuando te absorbe algo"),
      ],
    },
    19: {
      turn: 19,
      question: "Si te dieras un pequeño permiso, ¿por dónde querrías empezar?",
      options: [
        o("Decir lo que quiero comer", "Te gustaría empezar por decir lo que quieres comer.", "decir lo que quieres comer"),
        o("Probar a decir que no", "Te gustaría empezar por probar a decir que no.", "probar a decir que no"),
        o("Proponer yo primero lo que quiero hacer", "Te gustaría empezar por proponer tú primero lo que quieres hacer.", "proponer tú primero lo que quieres hacer"),
      ],
    },
    20: {
      turn: 20,
      question: "El día en que te des ese permiso, ¿cómo te imaginas?",
      options: [
        o("Con mucho menos peso", "Una capa de peso menos en los hombros.", "sentir mucha más ligereza"),
        o("Con algo de extrañeza", "Como encontrarte con una cara que no habías visto.", "sentir cierta extrañeza"),
        o("No lo veo claro", "Esa imagen sigue borrosa por ahora.", "una imagen todavía borrosa"),
      ],
    },
    21: {
      turn: 21,
      question: "Si tu yo de la infancia pudiera decirte algo ahora, ¿qué sería?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, lo que te callaste hace poco es {g2}, después el sentimiento que más se acerca al tuyo es {g4}, y justo antes de callarte lo primero que aparece es {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Lo que te callaste hace poco es {g2}, después el sentimiento que más se acerca al tuyo es {g4}, y donde más te callas es {g6}.",
      "Si mostraras lo que quieres, imaginas que resultaría {g11}, y un sentimiento callado suele acabar {g15}.",
      "Para contarle a alguien lo que quieres: {g17}. El pequeño permiso que te darías empieza por {g19}.",
    ],
    perspectiveLine: "Lo que dijo tu yo de la infancia también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
