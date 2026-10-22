/**
 * lib/choiceScripts/es/module2.ts — Módulo 2 (guion del dinero) guion fijo, español (tuteo). Adaptado de ../module2.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE2_SCRIPT_ES: ModuleScript = {
  moduleId: "module2",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "¿En qué tipo de momento se despierta más esa sensación?",
      questionNoQuote: "¿En qué tipo de momento te mueve más el dinero por dentro?",
      options: [
        o("Justo antes de pagar", "Se despierta más justo antes de pagar.", "el momento justo antes de pagar"),
        o("Al mirar el saldo", "Se despierta más al mirar el saldo.", "mirar el saldo"),
        o("Al ver cómo gastan otros", "Se despierta más al ver cómo gastan otros.", "ver cómo gastan otros"),
      ],
    },
    2: {
      turn: 2,
      question: "En ese momento, ¿qué te pesa más?",
      options: [
        o("La cantidad que gasto", "Cuánto gastas es la primera puerta del ánimo.", "la cantidad gastada"),
        o("El saldo que queda", "El número que queda es lo primero que te entra por los ojos.", "el saldo que queda"),
        o("Verme a mí gastando", "La mirada sobre ti mismo gastando va por delante del dinero.", "verte a ti gastando"),
      ],
    },
    3: {
      turn: 3,
      question: "Justo antes de pagar, ¿cuál se parece más a ti?",
      options: [
        o("Paro y lo pienso", "Justo antes de pagar, eres de los que paran y lo piensan.", "parar un momento"),
        o("Pago ya y lo pienso luego", "Justo antes de pagar, eres de los que pagan primero y piensan después.", "pagar primero"),
      ],
    },
    4: {
      turn: 4,
      question: "Después de pagar, ¿qué se acerca más a lo que te queda?",
      options: [
        o("Alivio", "Hay una parte que suelta el aire al resolver algo.", "el alivio"),
        o("Culpa", "Un rincón del ánimo se pone pesado después de gastar.", "la culpa"),
        o("Un vacío", "Queda una sensación de hueco aunque hayas llenado algo.", "un vacío"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Esta sensación con el dinero, ¿viene de hace tiempo o ha crecido últimamente?",
      questionNoQuote: "Tu sensación con el dinero, ¿viene de hace tiempo o ha crecido últimamente?",
      options: [
        o("Viene de hace tiempo", "Esta sensación con el dinero viene de hace tiempo.", "una sensación de hace tiempo"),
        o("Ha crecido últimamente", "Esta sensación con el dinero ha crecido últimamente.", "una sensación que ha crecido últimamente"),
      ],
    },
    6: {
      turn: 6,
      question: "Cuando alguien habla de su sueldo o de su casa, ¿cómo te suena?",
      options: [
        o("Me comparo", "Poner tu número al lado del suyo.", "compararte"),
        o("Lo dejo pasar", "Dejar su historia como su historia.", "dejarlo pasar"),
        o("Primero siento envidia", "La envidia está en primera fila.", "la envidia"),
      ],
    },
    7: {
      turn: 7,
      question: "Después de compararte, ¿hacia dónde se inclina tu ánimo?",
      options: [
        o("Me impaciento", "Después de compararte, se inclina hacia la impaciencia.", "la impaciencia"),
        o("Me encojo", "Después de compararte, se inclina hacia encogerte.", "encogerte"),
        o("Casi no cambia nada", "Después de compararte, casi nada cambia en tu ánimo.", "que casi nada cambie"),
      ],
    },
    8: {
      turn: 8,
      question: "En un día en que crece la preocupación por el dinero, ¿hacia dónde se mueve tu cartera?",
      options: [
        o("Se cierra más", "Cuanto mayor la preocupación, más firme el cierre.", "ahorrar más"),
        o("Más bien se abre", "Soltar la ansiedad gastando.", "gastar más en cambio"),
        o("Casi no cambia", "La preocupación y la cartera van por separado.", "que nada cambie"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "De pequeño, ¿qué ambiente había en casa cuando se hablaba de dinero?",
      options: [
        o("Era un tema frecuente", "Una casa donde el dinero llegaba a la mesa.", "un tema frecuente"),
        o("Se evitaba en silencio", "Un tema que tenía presencia por no decirse.", "un tema que se evitaba"),
        o("No lo recuerdo bien", "Hay escenas que quedan sin ser claras.", "algo borroso en el recuerdo"),
      ],
    },
    11: {
      turn: 11,
      question: "Si completaras de golpe «El dinero es, al final, ___», ¿qué te viene primero?",
      options: [
        o("La seguridad que me protege", "Entonces el dinero es, al final, la seguridad que te protege.", "la seguridad"),
        o("La libertad de vivir con holgura", "Entonces el dinero es, al final, la libertad de vivir con holgura.", "la libertad"),
        o("La vara con la que me miden", "Entonces el dinero es, al final, la vara con la que te miden.", "una vara para medirte"),
      ],
    },
    12: {
      turn: 12,
      question: "Si tuvieras dinero de sobra, ¿hacia dónde crees que iría tu ánimo?",
      options: [
        o("Estaría tranquilo", "Una imagen en la que el número se vuelve alivio.", "una imagen de tranquilidad"),
        o("Aparecerían otras preocupaciones", "Una imagen en la que la preocupación solo cambia de sitio.", "una imagen en la que aparecen otras preocupaciones"),
        o("No lo sé", "Quizá una imagen que nunca has dibujado.", "una imagen todavía sin dibujar"),
      ],
    },
    13: {
      turn: 13,
      question: "¿Qué has mantenido con constancia en lo que al dinero se refiere?",
      options: [
        o("No gastar más de lo necesario", "No gastar más de lo necesario es lo que has mantenido con constancia.", "no gastar más de lo necesario"),
        o("Ahorrar con constancia", "Ahorrar con constancia es lo que has mantenido.", "ahorrar con constancia"),
        o("Dar a los demás", "Dar a los demás es lo que has mantenido con constancia.", "dar a los demás"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Cuando hablas de dinero, ¿cómo eres?",
      options: [
        o("Lo digo con naturalidad", "Puedes sacar los números como números.", "decirlo con naturalidad"),
        o("Doy rodeos", "Una manera de dar vueltas para no tocarlo directamente.", "dar rodeos"),
        o("Ni lo saco", "Guardar el tema del todo.", "no sacarlo nunca"),
      ],
    },
    15: {
      turn: 15,
      question: "Cuando sube la preocupación por el dinero, ¿qué sueles hacer?",
      options: [
        o("Hago un plan primero", "Cuando sube la preocupación por el dinero, sueles hacer un plan primero.", "hacer un plan primero"),
        o("Desconecto y hago otra cosa", "Cuando sube la preocupación por el dinero, sueles desconectar y hacer otra cosa.", "desconectar y hacer otra cosa"),
        o("Se lo cuento a alguien", "Cuando sube la preocupación por el dinero, sueles contárselo a alguien.", "contárselo a alguien"),
      ],
    },
    16: {
      turn: 16,
      question: "Después de eso, ¿qué pasa con la preocupación?",
      options: [
        o("Se reduce", "Una acción baja el tamaño de la preocupación.", "que se reduzca"),
        o("Solo se aplaza un rato", "Cambia de sitio más que desaparecer.", "que solo se aplace un rato"),
        o("Sigue igual", "Hagas lo que hagas, el tamaño no cambia.", "que siga igual"),
      ],
    },
    17: {
      turn: 17,
      question: "¿Con quién te resulta más incómodo hablar de dinero?",
      options: [
        o("Con la familia", "Hablar de dinero con la familia es lo más incómodo.", "la familia"),
        o("Con la pareja", "Hablar de dinero con la pareja es lo más incómodo.", "la pareja"),
        o("Con amigos o compañeros", "Hablar de dinero con amigos o compañeros es lo más incómodo.", "amigos o compañeros"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Si estuvieras en paz con el dinero, ¿cómo sería tu día de cobro?",
      options: [
        o("Miro rápido y sigo", "Una imagen de mirar un número con calma y seguir.", "mirar rápido y seguir"),
        o("Me hago un pequeño regalo", "Una imagen donde mi parte va primero.", "hacerte un pequeño regalo"),
        o("Lo comparto con alguien", "Primero llega la escena de compartir con alguien cercano.", "compartir con alguien"),
      ],
    },
    19: {
      turn: 19,
      question: "¿Cuál es el paso más pequeño para acercarte a esa imagen?",
      options: [
        o("Mirar el saldo con calma", "El paso más pequeño es mirar el saldo con calma.", "mirar el saldo con calma"),
        o("Hablar de dinero con una persona", "El paso más pequeño es hablar de dinero con una persona.", "hablar de dinero con una persona"),
        o("Gastar un poco en mí", "El paso más pequeño es gastar un poco en ti.", "gastar un poco en ti"),
      ],
    },
    20: {
      turn: 20,
      question: "Si tuvieras delante a alguien que acaba de cobrar su primera nómina, ¿qué sentirías primero?",
      options: [
        o("Ternura", "Primero está la alegría de recibir a quien empieza.", "la ternura"),
        o("Preocupación", "Alguien cuyas reglas aún no se han fijado se te queda en la mente.", "la preocupación"),
        o("Envidia", "Se ve de cerca la ilusión de lo primero.", "la envidia"),
      ],
    },
    21: {
      turn: 21,
      question: "¿Hay algo sobre el dinero que de verdad quisieras decirle a esa persona?",
    },
  },
  checkpoint: [
    "Por lo que me has contado, lo que más pesa con el dinero parece ser {g2}, después de pagar se parece a {g4}, y en los días de más preocupación lo primero es {g8}.",
    "Si algo te sonó distinto, dímelo mientras seguimos y lo corrijo. La lectura detallada llega en tu informe.",
    "¿Seguimos hablando un poco más o lo dejamos aquí?",
  ],
  closing: {
    summary: [
      "Lo que más pesa con el dinero es {g2}, y después de pagar se parece a {g4}.",
      "En el hueco de «El dinero es, al final, ___» pusiste {g11}, y lo que has mantenido con constancia es {g13}.",
      "Cuando sube la preocupación es {g15}, con quien más incómodo resulta hablar de dinero es {g17}, y querrías empezar por {g19}.",
    ],
    perspectiveLine: "Lo que le dirías a esa persona con su primera nómina también lo guardo, con tus palabras.",
    finalLine: "Gracias por responder con tanto cuidado. Ahora reuniré tu saju, tu test y todo lo que me has contado para escribir tu informe.",
  },
};
