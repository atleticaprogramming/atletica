/**
 * Contenido de la landing del box de Villa Urquiza (/box).
 *
 * Todo el contenido variable vive acá. Los campos marcados PENDIENTE están en
 * `null` o vacíos a propósito: la página se degrada con elegancia y no afirma
 * ningún dato que todavía no esté confirmado. En cuanto los completás, los
 * módulos que dependen de ellos aparecen solos.
 */

export const box = {
  nombre: "Atlética BOX",
  barrio: "Villa Urquiza",
  ciudad: "CABA",

  /** PENDIENTE — dirección exacta. Con `null`, la dirección se comparte con
   *  quien se preinscribe en lugar de publicarse. */
  direccion: null as string | null,

  /** PENDIENTE — apertura, en texto libre ("Marzo 2027", "Verano 2027").
   *  Con `null` no se afirma ninguna fecha en ninguna sección. */
  apertura: null as string | null,

  /** PENDIENTE — WhatsApp en formato internacional, sólo números
   *  (ej. "5491122334455"). Mientras esté vacío, el botón de contacto
   *  escribe un mail a `email` en lugar de abrir WhatsApp. */
  whatsapp: "",

  email: "atletica.programming@gmail.com",
  instagram: "https://www.instagram.com/atletica.fitness/",

  /** PENDIENTE — link de cobro de la tarifa fundador (Mercado Pago, Stripe,
   *  lo que usen). Mientras esté vacío, el botón de pago manda la intención
   *  por WhatsApp (o por mail si todavía no hay número). */
  pagoUrl: "",
};

/** Enlace de contacto: WhatsApp con el mensaje escrito, o mail mientras no
 *  haya número cargado. */
export function contactoHref(mensaje: string) {
  if (box.whatsapp) {
    return `https://wa.me/${box.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  }
  return `mailto:${box.email}?subject=${encodeURIComponent(
    `Box ${box.barrio}`
  )}&body=${encodeURIComponent(mensaje)}`;
}

/** Enlace del botón de pago. Sin link de cobro cargado, la intención de pago
 *  se canaliza por contacto para no dejar el botón muerto. */
export function pagoHref() {
  return (
    box.pagoUrl ||
    contactoHref(
      `Hola! Quiero pagar la tarifa fundador del box de ${box.barrio}.`
    )
  );
}

export const tarifa = {
  /** PENDIENTE — valor fundador y valor general, como texto con formato
   *  ("$48.000"). Con los dos en `null` la sección explica la mecánica sin
   *  publicar cifras; con los dos cargados muestra el par y el tachado. */
  fundador: null as string | null,
  general: null as string | null,
  periodo: "por mes",
  moneda: "ARS",

  /** PENDIENTE — límite de la preinscripción, en texto libre
   *  ("Primeros 80 socios", "Hasta el 30 de noviembre"). */
  limite: null as string | null,

  /** Propuesta de condiciones — a validar antes de publicar. */
  beneficios: [
    "El valor más bajo del box, congelado",
    "Sin matrícula",
    "Las tres disciplinas incluidas",
  ],
};

export type Disciplina = {
  n: string;
  nombre: string;
  desc: string;
  bullets: string[];
  img: string;
  /** object-position del recorte, para que el sujeto no quede cortado. */
  pos: string;
};

export const disciplinas: Disciplina[] = [
  {
    n: "01",
    nombre: "CrossTraining",
    desc: "Fuerza y aire en la misma hora, con el peso y la versión del movimiento que te sirvan hoy.",
    bullets: [
      "Cada clase se adapta a quien la hace",
      "Si arrancás de cero, arrancás de cero",
      "Vas a tu ritmo, no al del resto",
    ],
    img: "/img/backlit.jpg",
    pos: "50% 38%",
  },
  {
    n: "02",
    nombre: "Levantamiento olímpico",
    desc: "Aprendés a levantar bien antes de levantar pesado. Sin apuro y con alguien mirando.",
    bullets: [
      "Primero la posición, después los kilos",
      "Movilidad pensada para tu cuerpo",
      "Sumás peso cuando estás listo",
    ],
    img: "/img/db-snatch.jpg",
    pos: "50% 38%",
  },
  {
    n: "03",
    nombre: "Gimnásticos",
    desc: "Desde colgarte por primera vez hasta esa dominada que nunca te salía.",
    bullets: [
      "Progresiones para cada punto de partida",
      "Con banda, con asistencia o solo",
      "Sin comparar con el de al lado",
    ],
    img: "/img/rope-arena.jpg",
    pos: "50% 32%",
  },
];

export const pilares = [
  {
    n: "01",
    t: "Espacio para todos",
    d: "Piso corrido y techo alto: entramos todos sin hacer fila por un rack.",
  },
  {
    n: "02",
    t: "Un coach al lado",
    d: "Te mira, te corrige y te ajusta la clase a lo que tu cuerpo puede hoy.",
  },
  {
    n: "03",
    t: "Todos empezamos alguna vez",
    d: "Nadie te mira por el peso que usás ni por cuánto tardás.",
  },
];

export const pasos = [
  { n: "01", t: "Reservás tu lugar", d: "Pagás la tarifa fundador y tu precio queda fijo." },
  { n: "02", t: "Te escribimos", d: "Dirección exacta, fecha de apertura y horarios." },
  {
    n: "03",
    t: "Venís a probar",
    d: "Te acompañamos en tu primera clase, sea la primera de tu vida o no.",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Cuándo abre?",
    a: "Estamos terminando la nave. La fecha la reciben primero las personas preinscriptas.",
  },
  {
    q: "¿Dónde va a estar?",
    a: "En Villa Urquiza, CABA. La dirección exacta la mandamos a quienes se preinscriben, antes de publicarla.",
  },
  {
    q: "Nunca entrené, ¿puedo venir igual?",
    a: "Sí, y no vas a ser la única persona en esa situación. La clase es la misma para todos; lo que cambia es el peso y la versión de cada movimiento.",
  },
  {
    q: "¿Hay una edad para esto?",
    a: "No. Entrena gente de 18 y gente de 60, en la misma hora y cada una con su carga.",
  },
  {
    q: "Estoy volviendo de una lesión",
    a: "Contanos qué te pasó y adaptamos el trabajo. Si hace falta, te pedimos el alta de tu kinesiólogo o tu médico antes de empezar.",
  },
  {
    q: "Quiero competir, ¿me sirve?",
    a: "También. La misma clase escala para arriba y sumamos trabajo específico cuando lo necesites.",
  },
  {
    q: "¿Cómo pago la tarifa fundador?",
    a: "Con el botón de pago. Si preferís arreglarlo hablando con alguien, escribinos por WhatsApp.",
  },
];
