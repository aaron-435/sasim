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
        o("Me quedo donde estoy", "Cuando se juntan las miradas, te quedas donde estás.", "quedarte bajo la mirada"),
        o("Me escabullo", "Cuando se juntan las miradas, te escabulles.", "escabullirte"),
        o("Se lo paso a otro", "Cuando se juntan las miradas, se lo pasas a otro.", "pasárselo a otro"),
      ],
    },
    2: {
      turn: 2,
      question: "Hace poco, ¿qué tipo de palabras te tragaste justo antes de decirlas?",
      options: [
        o("Mi opinión", "Una escena de un pensamiento que se detiene ante la boca.", "tu opinión"),
        o("Una petición o un deseo", "Algo que querías, doblado hacia dentro.", "una petición o un deseo"),
        o("Un rechazo", "Un «no» que dio la vuelta en la garganta.", "un rechazo"),
      ],
    },
    3: {
      turn: 3,
      question: "¿Qué relación tenías con las personas que estaban allí?",
      options: [
        o("Cercana", "Las personas que estaban allí eran cercanas.", "una relación cercana"),
        o("Apenas las conocía", "Las personas que estaban allí eran gente que apenas conocías.", "una relación de apenas conocerse"),
      ],
    },
    4: {
      turn: 4,
      question: "Después de tragártelo, ¿qué se acerca más a tu ánimo?",
      options: [
        o("Agobio", "Se queda atrás una sensación de bloqueo.", "el agobio"),
        o("Pena por lo que dejé pasar", "Volver a mirar lo que se te escapó.", "la pena por lo que dejaste pasar"),
        o("Alivio", "Lo primero fue la sensación de soltar el aire.", "el alivio"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "¿Con qué frecuencia dices cosas como «lo que sea» o «da igual, estoy bien»?",
      options: [
        o("A menudo", "Eres de los que dicen a menudo «lo que sea» o «estoy bien».", "decirlo a menudo"),
        o("A veces", "Eres de los que a veces dicen «lo que sea» o «estoy bien».", "decirlo a veces"),
        o("Casi nunca", "Eres de los que casi nunca dicen «lo que sea» o «estoy bien».", "casi nunca decirlo"),
      ],
    },
    6: {
      turn: 6,
      question: "¿Dónde sueles acabar tragándote las palabras?",
      options: [
        o("En grupo", "Cuanta más gente, más baja la voz.", "en grupo"),
        o("Cara a cara, a solas con alguien", "Más bien las palabras se pliegan cuando sois solo dos.", "cara a cara"),
        o("En el trabajo", "El trabajo es donde más te tragas.", "en el trabajo"),
      ],
    },
    7: {
      turn: 7,
      question: "Cuando alguien te dice que lo hiciste bien, ¿qué haces primero?",
      options: [
        o("Lo acepto agradecido", "Cuando te dicen que lo hiciste bien, lo aceptas agradecido.", "aceptarlo con gratitud"),
        o("Le quito importancia", "Cuando te dicen que lo hiciste bien, primero le quitas importancia.", "quitarle importancia primero"),
      ],
    },
    8: {
      turn: 8,
      question: "Justo antes de tragártelo, ¿qué te pasa primero por la cabeza?",
      options: [
        o("Destacar", "Lo primero que engancha es llamar la atención.", "el miedo a destacar"),
        o("Equivocarme", "Pesar primero la posibilidad de que no sea la respuesta correcta.", "el miedo a equivocarte"),
        o("Romper el ambiente", "Lo primero que entra en la vista es el tono del lugar.", "el miedo a romper el ambiente"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Cuando dijiste lo que querías, ¿qué tipo de respuesta te llegó con más frecuencia?",
      options: [
        o("Me la aceptaron", "Hay un recuerdo de palabras que llegaron a su sitio.", "que te lo aceptaran"),
        o("Me la dejaron pasar", "Quedan palabras que pasaron sin llegar.", "que te lo dejaran pasar"),
        o("Se rieron de mí", "Una escena que volvió convertida en risa se queda mucho.", "que se rieran de ti"),
      ],
    },
    11: {
      turn: 11,
      question: "Si mostraras lo que quieres, ¿cómo crees que se vería?",
      options: [
        o("Egoísta", "Si mostraras lo que quieres, podría verse egoísta.", "el miedo a parecer egoísta"),
        o("Raro", "Si mostraras lo que quieres, podría resultar raro.", "el miedo a que se ponga raro"),
        o("Nada del otro mundo", "Aunque mostraras lo que quieres, podría no ser para tanto.", "la sensación de que no sería para tanto"),
      ],
    },
    12: {
      turn: 12,
      question: "Cuando te miras en el espejo, ¿qué es lo primero que ves?",
      options: [
        o("Lo que me gusta", "Un ojo que encuentra primero lo bueno.", "lo que te gusta"),
        o("Lo que quiero arreglar", "Lo que hay que retocar te llama primero la atención.", "lo que quieres arreglar"),
        o("Paso de largo", "Del lado de quien no se mira mucho rato.", "pasar de largo"),
      ],
    },
    13: {
      turn: 13,
      question: "Cuando miras atrás lo que te tragaste, ¿qué se parece más a ti?",
      options: [
        o("Me queda arrepentimiento", "Al mirar atrás lo que te tragaste, te queda arrepentimiento.", "el arrepentimiento"),
        o("Más bien siento alivio", "Al mirar atrás lo que te tragaste, más bien sientes alivio.", "el alivio"),
        o("Depende de la ocasión", "Al mirar atrás lo que te tragaste, tu ánimo cambia cada vez.", "un ánimo que cambia"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando surge un lugar desconocido o algo improvisado, ¿qué haces?",
      options: [
        o("Voy hacia lo conocido", "Tu ánimo descansa al elegir un camino ya sabido.", "ir hacia lo conocido"),
        o("Me dejo llevar por ahora", "Entregarte a la corriente y observar.", "dejarte llevar por ahora"),
        o("Pruebo yo primero", "Dar un paso primero hacia lo desconocido.", "probar primero"),
      ],
    },
    15: {
      turn: 15,
      question: "¿Adónde suele ir el sentimiento que te tragaste?",
      options: [
        o("Se olvida", "Un sentimiento tragado suele olvidarse.", "olvidarse"),
        o("Lo lleno yo a solas", "Un sentimiento tragado suele llenarse a solas.", "llenarlo a solas"),
        o("Estalla más tarde", "Un sentimiento tragado suele estallar más tarde.", "estallar más tarde"),
      ],
    },
    16: {
      turn: 16,
      question: "¿Cómo eres cuando estás a solas?",
      options: [
        o("Libre, casi cantando o bailando", "Hay un yo que se suelta cuando no hay nadie.", "la libertad cuando estás a solas"),
        o("Cuidadoso incluso a solas", "Vigilarte aun sin ojos que te miren.", "ser cuidadoso incluso a solas"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Hay a tu lado alguien a quien puedas decirle con comodidad lo que quieres?",
      options: [
        o("Una o dos personas", "Hay una o dos personas a quienes puedes decirles con comodidad lo que quieres.", "una o dos personas"),
        o("A veces, en ciertos momentos", "Hay momentos en que dices con comodidad lo que quieres.", "ciertos momentos de vez en cuando"),
        o("Todavía nadie", "Todavía no hay nadie a quien decirle con comodidad lo que quieres.", "nadie todavía"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "¿Cuándo piensas «así sí que soy bastante yo»?",
      options: [
        o("Cuando estoy a solas", "Ser tú es más nítido en el tiempo a solas.", "cuando estás a solas"),
        o("Cuando estoy con alguien cómodo", "Un momento en que alguien a tu lado te suelta.", "cuando estás con alguien cómodo"),
        o("Cuando me absorbe algo", "Del lado de quien se ve a sí mismo dentro de lo que tiene entre manos.", "cuando te absorbe algo"),
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
      question: "El día en que te diste ese permiso, ¿cómo crees que me vería?",
      options: [
        o("Mucho más ligero", "Una figura con una capa de carga menos en los hombros.", "sentirte mucho más ligero"),
        o("Un poco raro", "Una escena de encontrarte con una cara que nunca habías visto.", "sentirte un poco raro"),
        o("No lo veo claro", "Esa escena sigue borrosa por ahora.", "una imagen todavía borrosa"),
      ],
    },
    21: {
      turn: 21,
      question: "Si el niño que fuiste, el que decía lo que quería sin reparos, pudiera decirte algo ahora, ¿qué sería?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, lo que te tragaste hace poco es {g2}, después tu ánimo se parece a {g4}, y justo antes de tragártelo te pasa primero por la cabeza {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Lo que te tragaste hace poco es {g2}, después tu ánimo se parece a {g4}, y donde más te lo tragas es {g6}.",
      "Mostrar lo que quieres trae {g11}, y para el sentimiento tragado lo tuyo es {g15}.",
      "Las personas con quienes puedes hablar a gusto son {g17}, y el pequeño permiso que te darías empieza por {g19}.",
    ],
    perspectiveLine: "Lo que dijo el niño que fuiste también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
