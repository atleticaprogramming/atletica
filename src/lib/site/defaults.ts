/**
 * Contenido base de toda la web (textos e imágenes).
 *
 * Es lo que se ve mientras nadie lo cambie desde /admin → «Textos e imágenes».
 * Lo que se guarda en el admin se mezcla por encima de esto, campo a campo,
 * así que un campo nuevo que se agregue acá aparece solo aunque la sección ya
 * se haya editado antes.
 */

import { legalDefaults } from "@/lib/site/legal-defaults";

export const siteDefaults = {
  // ── General ────────────────────────────────────────────────────────────────
  ajustes: {
    whatsapp: "5491170649757",
    email: "atletica.programming@gmail.com",
    instagram: "https://www.instagram.com/atletica.fitness/",
    youtube: "https://www.youtube.com/@atleticafitness",
    preinscripcionUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSftwn9155lJ6Gnu-MS-WqvPxlxKNYaAEF41QnpTtmaHXGESzA/viewform",
  },

  footer: {
    texto:
      "Programación, cursos y comunidad nacidos compitiendo en Buenos Aires. Entrená con método.",
    contacto: "Contacto",
    tituloPlanes: "Planificaciones",
    tituloCursos: "Cursos",
    copyright: "Atlética Fitness",
  },

  // ── Home ───────────────────────────────────────────────────────────────────
  homeNav: {
    links: [
      { label: "Planificaciones", href: "/#programaciones" },
      { label: "Cursos", href: "/#cursos" },
      { label: "Nuestro método", href: "/#metodo" },
    ],
    cta: "Empezá ahora",
    ctaHref: "/#programaciones",
  },

  homeHero: {
    video: "/video/manifiesto.mp4",
    poster: "/img/rings.jpg",
    titulo: "Atlética",
    texto:
      "Para quienes compiten. Para quienes entrenan por primera vez.\nUn mismo lugar. Un mismo método. Una misma comunidad.",
    boton1: "Ver programaciones",
    boton2: "Ver cursos",
  },

  homeQueEs: {
    fotos: [
      "/img/db-snatch.jpg",
      "/img/bar-muscleup.jpg",
      "/img/sandbag.jpg",
      "/img/rope-arena.jpg",
      "/img/run-field.jpg",
      "/img/handstand.jpg",
      "/img/dips.jpg",
      "/img/rope-top.jpg",
    ],
    etiqueta: "Qué es Atlética",
    texto:
      "Atlética no es una app de rutinas más. Es un método de programación, una escuela de cursos y una comunidad que nació compitiendo. Diseñamos cada bloque para que entrenes con intención: que sepas qué hacés, por qué lo hacés y hacia dónde vas.",
    pilares: [
      {
        titulo: "Programación real",
        texto:
          "Bloques periodizados por coaches que compiten. Cada sesión tiene un objetivo medible.",
      },
      {
        titulo: "Formación profesional",
        texto:
          "Cursos para coaches y atletas que quieren entender el porqué detrás de cada movimiento.",
      },
      {
        titulo: "Comunidad por WhatsApp",
        texto:
          "Sumate al grupo de WhatsApp y entrená junto a otras personas que siguen tu misma planificación: compartí PRs, dudas y motivación.",
      },
    ],
  },

  homeProgramas: {
    etiqueta: "Planificaciones",
    titulo1: "Elegí tu",
    titulo2: "nivel de juego",
    texto:
      "Tres caminos, un mismo método. Elegí el que va con tu momento y entrená con intención. Sin permanencia.",
  },

  homeCursos: {
    etiqueta: "Cursos · Formación",
    titulo1: "Aprendé de",
    titulo2: "los que compiten",
    boton: "Ver curso",
  },

  homeMetodo: {
    etiqueta: "El método",
    titulo1: "Cuatro etapas",
    titulo2: "un solo objetivo",
    etapas: [
      {
        titulo: "Evaluación inicial",
        texto:
          "Antes de programar, medimos. Tests de fuerza, gimnásticos y motor para saber de dónde partís y a dónde podés llegar.",
        imagen: "/img/db-snatch.jpg",
      },
      {
        titulo: "Bloques periodizados",
        texto:
          "Mesociclos con foco claro: fuerza, capacidad de trabajo, gimnásticos o picos de competencia. Nada queda librado al azar.",
        imagen: "/img/bar-muscleup.jpg",
      },
      {
        titulo: "Movilidad y accesorios",
        texto:
          "El trabajo invisible que sostiene el rendimiento. Accesorios, core y movilidad integrados a cada semana.",
        imagen: "/img/handstand.jpg",
      },
      {
        titulo: "Seguimiento y comunidad",
        texto:
          "Registrás tus resultados, recibís feedback y entrenás acompañado por una comunidad que rinde cuentas con vos.",
        imagen: "/img/rope-sunset.jpg",
      },
    ],
  },

  homeOtras: {
    etiqueta: "Otras planificaciones",
    titulo: "Para tu box, tu casa y la calle",
  },

  homeValores: {
    etiqueta: "Valores",
    etiquetaDerecha: "Código samurái",
    lineas: [
      {
        palabras: [
          { palabra: "Coraje", imagen: "/img/bar-muscleup.jpg" },
          { palabra: "Honor", imagen: "/img/handstand.jpg" },
        ],
      },
      {
        palabras: [{ palabra: "Lealtad", imagen: "/img/rope-top.jpg" }],
      },
      {
        palabras: [
          { palabra: "Sinceridad", imagen: "/img/rope-bw.jpg" },
          { palabra: "Respeto", imagen: "/img/dips.jpg" },
        ],
      },
    ],
    texto:
      "El código samurái que llevamos a cada sesión: coraje para empezar, honor en el esfuerzo, lealtad con tu equipo, sinceridad con vos mismo y respeto por el proceso. Así entrenamos, enseñamos y competimos.",
  },

  homeCta: {
    imagen: "/img/wallball.jpg",
    etiqueta: "Empezá hoy",
    titulo: "Dejá de improvisar",
    texto:
      "Sumate a la programación que entrena con método y a una comunidad que no afloja.",
    boton1: "Empezá ahora",
    boton2: "Ver cursos",
  },

  // ── Landing del box (/box) ─────────────────────────────────────────────────
  box: {
    nombre: "Atlética Fitness Center",
    nombreCorto: "Atlética",
    barrio: "Villa Pueyrredón",
    ciudad: "CABA",
    direccion: "Vallejos 2960",
    descripcion:
      "Entrenamiento para cada objetivo: fuerza, resistencia, movilidad y bienestar. Hyrox, Pilates, Functional y CrossFit en un mismo lugar.",
    links: [
      { label: "Qué somos", href: "#que-somos" },
      { label: "Qué se entrena", href: "#disciplinas" },
      { label: "Preguntas", href: "#preguntas" },
    ],
    ctaNav: "Preinscripción",
  },

  boxHero: {
    imagenIzquierda: "/img/hero-left.jpg",
    imagenDerecha: "/img/hero-right.jpg",
    chip: "Preinscripción abierta",
    bajada:
      "Entrenamiento para cada objetivo:\nfuerza, resistencia, movilidad y bienestar. Hyrox, Pilates,\nFunctional y CrossFit en un mismo lugar.",
    boton1: "Preinscripción",
    boton2: "Escribinos",
    mensajeWhatsapp: "Hola! Quiero info de Atlética Fitness Center, Villa Pueyrredón.",
  },

  boxQueSomos: {
    etiqueta: "Qué somos",
    titulo: "La forma en que entrenás cambia la forma en que vivís",
    intro:
      "Atlética es un espacio de entrenamiento para quienes eligen construir fuerza, disciplina y bienestar en el tiempo. Creemos que entrenar va más allá de cumplir una hora. Es aprender, sostener el esfuerzo y respetar el proceso. No se trata de ser mejor que los demás, sino de desarrollar una versión más fuerte, más presente y más capaz de vos.",
    pilares: [
      {
        titulo: "Entrenamiento completo",
        texto:
          "Fuerza, resistencia, técnica, movilidad y recuperación. Elegís una disciplina o combinás las que te hacen bien.",
      },
      {
        titulo: "Coaches que te conocen",
        texto:
          "Cada clase tiene guía. Te acompañamos a aprender, ajustar y progresar con un entrenamiento que tiene sentido para vos.",
      },
      {
        titulo: "Comunidad que suma",
        texto:
          "No importa si venís por primera vez o si entrenás hace años. Acá se comparte el esfuerzo y se celebra cada avance.",
      },
    ],
  },

  boxDisciplinas: {
    etiqueta: "Qué se entrena",
    titulo1: "Cinco formas de entrenar.",
    titulo2: "Elegí tu ritmo, combiná tu entrenamiento.",
    tarjetas: [
      {
        nombre: "CrossFit",
        texto:
          "Fuerza, capacidad física y técnica en clases guiadas que se adaptan a cada nivel.",
        puntos: [
          "Aprendés los movimientos con progresiones claras",
          "Entrenás intenso, sin entrenar a ciegas",
          "Podés empezar aunque nunca hayas hecho CrossFit",
        ],
        imagen: "/img/cards/crossfit.jpg",
        encuadre: "50% 45%",
        oscurecer: "40",
        zoom: "1.7",
      },
      {
        nombre: "Hyrox",
        texto:
          "Trabajo de fuerza y resistencia para prepararte para una carrera Hyrox o simplemente sentirte más capaz.",
        puntos: [
          "Corré, empujá, cargá y recuperá con método",
          "Sesiones para quienes empiezan y para quienes compiten",
          "Construí capacidad real para tu día a día",
        ],
        imagen: "/img/cards/hyrox.jpg",
        encuadre: "55% 55%",
        oscurecer: "40",
        zoom: "1.6",
      },
      {
        nombre: "Functional",
        texto:
          "Entrenamiento funcional para ganar fuerza, moverte con confianza y volver a disfrutar del movimiento.",
        puntos: [
          "Una entrada accesible al entrenamiento de fuerza",
          "Movimientos útiles y clases dinámicas",
          "Progresás a tu ritmo, con objetivos reales",
        ],
        imagen: "/img/hero-left.jpg",
        encuadre: "50% 42%",
        oscurecer: "20",
        zoom: "1",
      },
      {
        nombre: "Pilates",
        texto:
          "Control, movilidad y fuerza profunda para sentir el cuerpo más estable, disponible y equilibrado.",
        puntos: [
          "Mejorá postura, control y rango de movimiento",
          "Una práctica que complementa el entrenamiento intenso",
          "Una hora para conectar con tu cuerpo y construir base",
        ],
        imagen: "/img/hero-right.jpg",
        encuadre: "50% 30%",
        oscurecer: "42",
        zoom: "1",
      },
    ],
    aMedida: {
      nombre: "Planificación a tu medida",
      texto:
        "En Atlética también desarrollamos planificaciones a medida para quienes necesitan un camino de entrenamiento específico.",
      imagen: "/img/wallball.jpg",
      enlace: "Contanos qué necesitás",
      mensajeWhatsapp: "Hola! Quiero una planificación a medida en Atlética Fitness Center.",
    },
  },

  boxPreinscripcion: {
    etiqueta: "Preinscripción abierta",
    titulo1: "Empezá Atlética",
    titulo2: "desde el primer día.",
    texto:
      "Preinscribite antes de la apertura y accedé a beneficios exclusivos de lanzamiento. Reservás tu lugar, recibís primero toda la información y empezás a entrenar.",
    tituloTarjeta: "Tu preinscripción incluye",
    incluye: [
      "Beneficio especial de apertura.",
      "Si te inscribís durante noviembre, no pagás matrícula.",
      "Remera oficial Atlética para las primeras 50 personas inscriptas.",
    ],
    cupos: "Los cupos de apertura son limitados.",
    letraChica:
      "La remera se entrega a las primeras 50 inscripciones confirmadas, sujeta a disponibilidad. El beneficio sin matrícula aplica durante el primer mes desde la apertura.",
    boton1: "Empezá a entrenar",
    boton2: "WhatsApp",
    mensajeWhatsapp: "Hola! Quiero info de Atlética Fitness Center, Villa Pueyrredón.",
  },

  boxFaq: {
    etiqueta: "Preguntas",
    titulo1: "Preguntas",
    titulo2: "frecuentes",
    intro:
      "Si te falta información, escribinos. Queremos que elijas tu entrenamiento con claridad y llegues a tu primera clase con confianza.",
    preguntas: [
      {
        pregunta: "¿Cuándo abre?",
        respuesta:
          "Estamos preparando el espacio y terminando los detalles para abrir. Las personas de la lista fundadora reciben la fecha antes que nadie.",
      },
      {
        pregunta: "¿Dónde va a estar?",
        respuesta: "En Vallejos 2960, Villa Pueyrredón, CABA.",
      },
      {
        pregunta: "Nunca entrené, ¿puedo venir igual?",
        respuesta:
          "Sí. No necesitás experiencia previa. Te orientamos para elegir una clase y cada entrenamiento se adapta a tu punto de partida.",
      },
      {
        pregunta: "¿Qué clase elijo: CrossFit, Hyrox, Functional o Pilates?",
        respuesta:
          "Depende de tu objetivo y de cómo te gusta entrenar. En tu primer contacto te ayudamos a armar un camino que tenga sentido para vos. También vas a poder combinar disciplinas.",
      },
      {
        pregunta: "¿Puedo hacer Pilates si también entreno CrossFit o Hyrox? ¿Y al revés?",
        respuesta:
          "Sí. El Pilates es una gran herramienta para sumar control, movilidad y fuerza profunda. Puede ser tu entrenamiento principal o complementar CrossFit o Hyrox. Y también al revés. La clave va a estar en el equilibrio.",
      },
      {
        pregunta: "Estoy volviendo de una lesión, ¿puedo entrenar?",
        respuesta:
          "Contanos tu situación antes de empezar. Vamos a indicar la opción más adecuada, acompañando tu regreso al entrenamiento.",
      },
      {
        pregunta: "Quiero competir en Hyrox o CrossFit, ¿me sirve?",
        respuesta:
          "Sí. Hay espacio para quien quiere mejorar su rendimiento y para quien busca entrenar por bienestar. La diferencia está en la programación y el acompañamiento que necesitás.",
      },
      {
        pregunta:
          "Si quiero prepararme para otro deporte o disciplina, ¿me sirve entrenar en Atlética?",
        respuesta:
          "Sí. El trabajo de fuerza, resistencia, movilidad y control que hacemos en Atlética complementa tu preparación para otros deportes y objetivos. Si buscás algo específico, también lo armamos a tu medida.",
      },
    ],
  },

  // ── Legales ────────────────────────────────────────────────────────────────
  terminos: legalDefaults.terminos,
  privacidad: legalDefaults.privacidad,
};

export type SiteContent = typeof siteDefaults;
export type SectionId = keyof SiteContent;
