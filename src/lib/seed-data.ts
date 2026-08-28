import type { CourseData, PlanData } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// Datos base ("seed"). Sirven para:
//   1. Poblar la base de datos la primera vez (botón "Reseed" en /admin).
//   2. Fallback de solo lectura cuando todavía no hay base de datos conectada
//      (p. ej. desarrollo local sin POSTGRES_URL), para que el sitio no se rompa.
// La fuente de verdad en producción es Postgres; esto es solo el contenido inicial.
// ─────────────────────────────────────────────────────────────────────────────

// Dominio de la plataforma de cursos y planificaciones.
const APP = "https://app.atleticafitness.com";
const PLATFORM = `${APP}/checkout`;
const SUB = `${APP}/subscribe`;

const delfi = {
  name: "Delfina Ortuño",
  bio: [
    "Hice Gimnasia Artística desde los 4 hasta los 18 años e integré la Selección Argentina Juvenil y Mayor. Creo en el esfuerzo, la perseverancia y la dedicación: los logros no nos los regala nadie, se ganan.",
    "Empecé a entrenar a fines de 2013 y fue un antes y un después. Me capacité como entrenadora y participé en los CrossFit Games 2014 y 2018, y en 7 instancias de Regionales y Semifinales. ¡Estoy feliz de tenerte acá!",
  ],
};

const julieta = {
  name: "Julieta Chapi",
  bio: [
    "Profesora de Educación Física (Instituto Romero Brest N°1) y Coach Level 1, con más de 10 cursos de levantamiento olímpico y formación en movilidad, control motor y prevención de lesiones.",
    "Compito desde 2011: más de 10 Opens, primeros puestos a nivel nacional y latinoamericano, dos veces Top 10 mundial élite, y los CrossFit Games 2014 en California.",
  ],
};

const pablo = {
  name: "Pablo Rodríguez",
  bio: [
    "Workshop conducido por Pablo Rodríguez, especialista en respiración nasal aplicada al rendimiento, la salud y el bienestar.",
  ],
};

export const seedCourses: CourseData[] = [
  {
    slug: "curso-coach-nivel-1",
    title: "Curso Nivel 1 de Coach",
    category: "Formación · Entrenadores",
    image: "/img/cursos/coach.jpg",
    price: "$129.999",
    meta: "17 lecciones · examen teórico final · 100% virtual",
    enrollUrl: `${PLATFORM}/68f2a4d215dcd49a90f0b2b7`,
    cardDesc:
      "Formación base para dar clases: enseñanza del movimiento, seguridad y comando de sala.",
    lecciones: "17 lecciones",
    order: 1,
    published: true,
    descParas: [
      "Dirigido a coaches y futuros coaches, profesores de Educación Física, estudiantes del deporte, atletas y practicantes. No se necesita conocimiento previo.",
      "El egresado del Nivel 1 tendrá los conocimientos básicos para dictar una clase personalizada o grupal, en gimnasios o al aire libre, con distintos objetivos según su población y entorno.",
      "Una formación completa para incorporar los conceptos del entrenamiento: perfil del coach, cómo dictar una clase, movimientos fundamentales, fuerza, levantamiento olímpico, kettlebells y alimentación.",
    ],
    modules: [
      { n: "01", t: "Presentación", l: "1 lección", d: "Presentación gratuita del Curso Nivel 1." },
      { n: "02", t: "Perfil del entrenador", l: "1 lección", d: "Perfil y roles del coach: qué se espera de un buen entrenador." },
      { n: "03", t: "Principios del entrenamiento", l: "1 lección", d: "Conceptos básicos y planificación Nivel 1." },
      { n: "04", t: "Fuerza", l: "1 lección", d: "Tipos de fuerza y cómo entrenarla." },
      { n: "05", t: "Core & Torque", l: "3 lecciones", d: "Estabilidad, core y transferencia de fuerza." },
      { n: "06", t: "La clase", l: "1 lección", d: "Cómo dictar una clase: partes y organización." },
      { n: "07", t: "Salud y alto rendimiento", l: "2 lecciones", d: "Cuidado del atleta y rendimiento sostenible." },
      { n: "08", t: "Los 4 movimientos fundamentales", l: "2 lecciones", d: "Sentadilla, peso muerto, flexo-extensión y dominadas: ejecución, errores y correcciones." },
      { n: "09", t: "Levantamiento olímpico", l: "2 lecciones", d: "Práctica de levantamiento olímpico Nivel 1 (Snatch)." },
      { n: "10", t: "Kettlebells", l: "2 lecciones", d: "Por qué y cómo utilizar la kettlebell." },
      { n: "11", t: "Alimentación", l: "1 lección", d: "Conceptos básicos de alimentación para el entrenamiento." },
      { n: "12", t: "Examen final", l: "1 examen", d: "Examen teórico al finalizar para certificarte." },
    ],
    incluye: [
      "17 lecciones en video (1 gratis)",
      "Material de estudio teórico",
      "Movimientos fundamentales y correcciones",
      "Levantamiento olímpico y kettlebells",
      "Examen teórico final",
      "Sin conocimiento previo necesario",
    ],
    instructor: {
      name: "Pablo Rodríguez & Julieta Chapi",
      bio: [
        "Prof. Pablo Rodríguez — Profesor de Educación Física (Romero Brest ISEF n°1), con más de 10 años en preparación física de alto rendimiento. 3 clasificaciones a los CrossFit Games (2014, 2018 y 2024). Director deportivo de Atlética Fitness y head coach de @samurai.team.",
        "Prof. Julieta Chapi Gangemi — Profesora de Educación Física (Romero Brest ISEF n°1) y Coach Level 1. 13 años como coach y 10 como head coach, con 8 capacitaciones en levantamiento olímpico. Atleta de los CrossFit Games 2014 y múltiples podios en SouthFit y Argentina Throwdown.",
      ],
    },
  },
  {
    slug: "workshop-respiracion",
    title: "Workshop: Respiración",
    category: "Workshop · Bienestar",
    image: "/img/cursos/respiracion.jpg",
    price: "$29.999",
    meta: "3 lecciones · workshop · certificado",
    enrollUrl: `${PLATFORM}/68c1282225d8206c1f15af1e`,
    cardDesc:
      "Respirá bajo esfuerzo: control, recuperación y foco para sostener el ritmo.",
    lecciones: "3 lecciones",
    order: 2,
    published: true,
    descParas: [
      "Workshop de Respiración Nasal. Descubrí el poder de tu respiración para mejorar el rendimiento, la salud y el bienestar.",
      "La respiración nasal es mucho más que una técnica: es una herramienta natural para optimizar tu energía, aumentar la concentración y cuidar tu sistema respiratorio.",
      "Vas a reconectar con tu respiración de manera consciente y práctica, con ejercicios que podrás aplicar tanto en tu entrenamiento como en tu vida diaria.",
    ],
    modules: [
      { n: "01", t: "Workshop · Respiración", l: "3 lecciones", d: "Respiración nasal consciente aplicada al rendimiento y al bienestar." },
    ],
    incluye: [
      "3 lecciones en video",
      "Respiración nasal consciente",
      "Ejercicios prácticos aplicables",
      "Más energía y concentración",
      "Cuidado del sistema respiratorio",
      "Certificado al finalizar",
    ],
    instructor: pablo,
  },
  {
    slug: "double-unders",
    title: "Double Unders",
    category: "Workshop técnico · Gimnásticos",
    image: "/img/cursos/double-unders.jpg",
    price: "$29.999",
    meta: "1 lección · workshop · certificado",
    enrollUrl: `${PLATFORM}/6970d68a10cc16c5911186b5`,
    cardDesc:
      "Dominá el doble salto: técnica, ritmo y resistencia para que no se te corte el WOD.",
    lecciones: "1 lección",
    order: 3,
    published: true,
    descParas: [
      "Workshop técnico de una habilidad motriz específica: el Double Under. Coordinativa, rítmica y cíclica, con transferencia directa al functional fitness y el conditioning.",
      "Una formación pensada también para entrenadores: metodología de enseñanza, errores comunes, progresiones, drills y cómo corregir a tus alumnos.",
      "El Double Under es una de las habilidades más determinantes del rendimiento: dominarla cambia por completo tus WODs.",
    ],
    modules: [
      { n: "01", t: "Double Unders eficientes", l: "1 lección", d: "Técnica, ritmo y consistencia para dominar el doble salto." },
    ],
    incluye: [
      "Workshop en video (acceso completo)",
      "Técnica, ritmo y consistencia",
      "Metodología de enseñanza",
      "Errores comunes y cómo corregirlos",
      "Progresiones y drills",
      "Certificado al finalizar",
    ],
    instructor: julieta,
  },
  {
    slug: "snatch-nivel-1",
    title: "Snatch Nivel 1",
    category: "Workshop técnico · Halterofilia",
    image: "/img/cursos/snatch.jpg",
    price: "$39.999",
    meta: "16 lecciones · 7 módulos · certificado",
    enrollUrl: `${PLATFORM}/6970fce8da2258fda3c4f5b9`,
    cardDesc: "Cómo enseñar, corregir y progresar el arranque desde cero.",
    lecciones: "16 lecciones",
    order: 4,
    published: true,
    descParas: [
      "Workshop técnico de análisis y corrección del Snatch (Nivel 1), con ~20 minutos de video diseñados para pausar y analizar en detalle cada error técnico de manera individual.",
      "Identificar un error puede tomar pocos segundos, pero su corrección efectiva requiere tiempo, práctica y reiteración consciente. Cómo enseñar, progresar y corregir el movimiento según el nivel del atleta.",
      "Los videos de los ejercicios están disponibles en el canal de YouTube de Atlética Fitness, como guía de apoyo para entrenar, repasar la técnica y facilitar la correcta ejecución.",
    ],
    modules: [
      { n: "01", t: "Presentación", l: "1 lección", d: "Introducción al workshop y su metodología." },
      { n: "02", t: "Shoulder press / Back shoulder press", l: "2 lecciones", d: "Trabajo de hombro y posiciones de soporte." },
      { n: "03", t: "Squat / OHS", l: "2 lecciones", d: "Sentadilla y overhead squat como base del movimiento." },
      { n: "04", t: "Metodología de enseñanza y corrección", l: "1 lección", d: "Cómo enseñar, progresar y corregir el snatch según el nivel del atleta." },
      { n: "05", t: "Análisis técnico por posiciones", l: "8 lecciones", d: "Descripción detallada de cada posición del snatch, por fases." },
      { n: "06", t: "Snatch completo", l: "1 lección", d: "La integración final de todas las progresiones trabajadas." },
      { n: "07", t: "Ejecución · Fin de Nivel 1", l: "1 lección", d: "Cierre del nivel con la ejecución completa del movimiento." },
    ],
    incluye: [
      "16 lecciones en video (1 gratis)",
      "Metodología de enseñanza y corrección",
      "Análisis técnico por posiciones",
      "Videos de apoyo en YouTube",
      "Criterios biomecánicos y de seguridad",
      "Certificado al finalizar",
    ],
    instructor: {
      name: "Luis Dotta",
      bio: [
        "Especialista en levantamiento olímpico, a cargo del análisis técnico y la enseñanza del Snatch en Atlética: cómo enseñar, corregir y progresar el movimiento según el nivel del atleta.",
      ],
    },
  },
  {
    slug: "programa-de-handstand",
    title: "Programa de Handstand",
    category: "Curso · Gimnásticos",
    image: "/img/cursos/handstand.jpg",
    price: "$100.000",
    meta: "43 lecciones · 10 módulos · certificado",
    enrollUrl: `${PLATFORM}/6a16bd8420af7690da20cc99`,
    cardDesc:
      "Fuerza, equilibrio y progresiones para desarrollar y dominar tu handstand.",
    lecciones: "43 lecciones",
    order: 5,
    published: true,
    descParas: [
      "Fuerza, equilibrio y progresiones para desarrollar y dominar tu handstand. No se logra haciendo verticales todo el día: hay que entrenar el cuerpo para soportar y equilibrar tu peso teniendo como único apoyo las manos.",
      "Para una vertical alineada necesitás fortalecer los músculos involucrados, tener buena movilidad articular y aprender bien la técnica. Así, tu cuerpo logra alinearse y encontrar equilibrio y estabilidad invertido.",
      "Te enseño cada detalle en video, explicando y mostrando todo. Es como si estuviera con vos enseñándote personalmente.",
    ],
    modules: [
      { n: "01", t: "Introducción y bienvenida", l: "1 lección", d: "Bienvenida y explicación de la modalidad del programa." },
      { n: "02", t: "Entrada en calor específica", l: "2 lecciones", d: "Cómo entrar en calor para hacer verticales y por qué es importante." },
      { n: "03", t: "Movilidad y fuerza específica · Teoría", l: "5 lecciones", d: "Qué partes del cuerpo trabajar en movilidad y fuerza, y por qué." },
      { n: "04", t: "Movilidad · Práctica", l: "3 lecciones", d: "Ejercicios para aumentar el rango de las articulaciones involucradas." },
      { n: "05", t: "Fortalecimiento específico · Práctica", l: "3 lecciones", d: "Fortalecer las articulaciones para invertirte y sostener la vertical." },
      { n: "06", t: "Elongación", l: "4 lecciones", d: "Para qué sirve, cuándo, cuánto y cómo elongar para ganar amplitud." },
      { n: "07", t: "Técnica y alineación", l: "7 lecciones", d: "El detalle del movimiento: alineación, equilibrio y estabilidad." },
      { n: "08", t: "Progresiones y control invertido", l: "4 lecciones", d: "Progresiones para ganar control y confianza cabeza abajo." },
      { n: "09", t: "Planificación", l: "13 lecciones", d: "El plan paso a paso para lograr tu vertical recta y alineada." },
      { n: "10", t: "Certificado", l: "1 lección", d: "Al finalizar recibís un certificado por completar el programa." },
    ],
    incluye: [
      "43 lecciones en video (1 gratis)",
      "10 módulos paso a paso",
      "Movilidad, fuerza y técnica",
      "Progresiones y planificación",
      "Vas a poder verlo las veces que necesites",
      "Certificado al finalizar",
    ],
    instructor: delfi,
  },
  {
    slug: "programa-de-pull-ups",
    title: "Pull Ups, Chest to Bar & Butterfly",
    category: "Curso · Gimnásticos",
    image: "/img/cursos/pullups.jpg",
    price: "$100.000",
    meta: "19 lecciones · 5 módulos · certificado",
    enrollUrl: `${PLATFORM}/6a16b025abb036901cdc812b`,
    cardDesc: "Tracción y kipping: de tu primera dominada al butterfly eficiente.",
    lecciones: "19 lecciones",
    order: 6,
    published: true,
    descParas: [
      "No es sólo cuestión de intentarlo. Necesitamos generar la fuerza y estructura para mover y levantar nuestro propio peso, y trabajar la técnica de cada movimiento para poder lograrlo.",
      "En este programa trabajamos paso a paso para aprenderlos, mejorarlos y dominarlos. Te enseño cada detalle en video para que veas cada capítulo las veces que necesites.",
      "Seas principiante, intermedio o avanzado, siempre se puede mejorar. La base, los detalles y la ejecución marcan la diferencia para hacer el salto de calidad y rendimiento.",
    ],
    modules: [
      { n: "01", t: "Introducción y bienvenida", l: "1 lección", d: "Bienvenida y explicación de la modalidad del programa." },
      { n: "02", t: "Fundamentales", l: "3 lecciones", d: "Posturas fundamentales y fuerza específica para los movimientos de colgado." },
      { n: "03", t: "Técnica", l: "9 lecciones", d: "Progresiones y metodologías para cada fase de los movimientos." },
      { n: "04", t: "Planificación", l: "5 lecciones", d: "El plan para aprender, mejorar y dominar pull ups, C2B y butterfly." },
      { n: "05", t: "Certificado", l: "1 lección", d: "Al finalizar recibís un certificado por completar el programa." },
    ],
    incluye: [
      "19 lecciones en video (1 gratis)",
      "Posturas fundamentales y fuerza",
      "Técnica de pull ups, C2B y butterfly",
      "Accesorios y progresiones",
      "Planificación paso a paso",
      "Certificado al finalizar",
    ],
    instructor: delfi,
  },
  {
    slug: "programa-de-bar-muscle-up",
    title: "Programa de Bar Muscle Up",
    category: "Curso · Gimnásticos",
    image: "/img/cursos/bar-mu.jpg",
    price: "$100.000",
    meta: "19 lecciones · 5 módulos · certificado",
    enrollUrl: `${PLATFORM}/6a16ab8f91b7100ce0354e66`,
    cardDesc:
      "Fuerza de tracción y empuje, progresiones y transición eficiente para lograr tu BMU.",
    lecciones: "19 lecciones",
    order: 7,
    published: true,
    descParas: [
      "Fuerza de tracción y empuje, progresiones y una transición eficiente para lograr tu primer Bar Muscle Up. No alcanza con colgarse de la barra e intentarlo: hay que construir la fuerza, la estructura y la técnica.",
      "En este programa vamos paso a paso para aprenderlo, mejorarlo y dominarlo. Te enseño cada detalle en video, como si estuviera con vos personalmente.",
      "Mejor técnica → más eficiencia → menos desgaste → menos lesiones → más consistencia → más reps → mayor rendimiento.",
    ],
    modules: [
      { n: "01", t: "Introducción y bienvenida", l: "1 lección", d: "Bienvenida y explicación de la modalidad del programa." },
      { n: "02", t: "Fundamentales", l: "3 lecciones", d: "Fuerza y estructura necesarias para levantar tu propio peso." },
      { n: "03", t: "Técnica", l: "7 lecciones", d: "Cada fase del movimiento: transición, timing y ejecución." },
      { n: "04", t: "Planificación", l: "7 lecciones", d: "El plan para llegar a tu primer Bar Muscle Up y sumar reps." },
      { n: "05", t: "Certificado", l: "1 lección", d: "Al finalizar recibís un certificado por completar el programa." },
    ],
    incluye: [
      "19 lecciones en video (1 gratis)",
      "Fundamentales y fuerza específica",
      "Técnica y transición a la barra",
      "Progresiones por nivel",
      "Planificación paso a paso",
      "Certificado al finalizar",
    ],
    instructor: delfi,
  },
  {
    slug: "programa-de-ring-muscle-up",
    title: "Programa de Ring Muscle Up",
    category: "Curso · Gimnásticos",
    image: "/img/cursos/ring-mu.jpg",
    price: "$100.000",
    meta: "22 lecciones · 6 módulos · certificado",
    enrollUrl: `${PLATFORM}/6a1586ea58b34d9ef6f2a05b`,
    cardDesc:
      "Control, estabilidad, tipos de agarres, fondos y una transición eficiente.",
    lecciones: "22 lecciones",
    order: 8,
    published: true,
    descParas: [
      "Control, estabilidad, tipos de agarres, fondos y una transición eficiente: todo lo que necesitás para lograr y dominar el Ring Muscle Up, uno de los movimientos más complejos y desafiantes de la disciplina.",
      "Las anillas son un elemento distinto, inestables, y hay que aprender a controlarlas. En este programa vamos paso a paso para ganar la fuerza y el control necesarios.",
      "Te enseño cada detalle en video para que entiendas cada fase, progresión y ejercicio, y no te quede ninguna duda.",
    ],
    modules: [
      { n: "01", t: "Introducción y bienvenida", l: "1 lección", d: "Bienvenida y explicación de la modalidad del programa." },
      { n: "02", t: "Fundamentales", l: "3 lecciones", d: "Fuerza y estructura para levantar tu propio peso." },
      { n: "03", t: "Especificaciones de las anillas", l: "3 lecciones", d: "Cómo controlar un elemento inestable y distinto a la barra." },
      { n: "04", t: "Técnica", l: "7 lecciones", d: "Cada fase del movimiento: falsa toma, transición y control." },
      { n: "05", t: "Planificación", l: "7 lecciones", d: "El plan para llegar a tu primer Ring Muscle Up." },
      { n: "06", t: "Certificado", l: "1 lección", d: "Al finalizar recibís un certificado por completar el programa." },
    ],
    incluye: [
      "22 lecciones en video (1 gratis)",
      "Fundamentales y fuerza específica",
      "Control y estabilidad en las anillas",
      "Tipos de agarres y fondos",
      "Falsa toma y transición eficiente",
      "Planificación paso a paso",
      "Certificado al finalizar",
    ],
    instructor: delfi,
  },
];

export const seedPlans: PlanData[] = [
  // ── Principales (sección "Planificaciones") ──
  {
    id: 1,
    group: "main",
    name: "Advance",
    description:
      "Si ya entrenás fuera de la clase y querés subir al próximo nivel: un pack de 3 planificaciones para organizarte según tus tiempos, habilidades, debilidades, fechas de competencia y períodos de fuerza.",
    price: "$43.000",
    period: "ARS / mes",
    features: [
      "Planificación Atleta Advance · 6 días por semana",
      "Levantamiento olímpico · 2 días por semana",
      "Protocolo de Fuerza Nivel 1",
    ],
    footer: null,
    url: `${SUB}/68f2b4ba056d44b3ebec78b3`,
    order: 1,
    published: true,
    showInFooter: true,
  },
  {
    id: 2,
    group: "main",
    name: "RX/Máster",
    description:
      "Si ya dominás todos los movimientos (ring MU, HSW, snatch +70/50…), tu planificación está acá. Para atletas RX/Élite que entrenan en modo open box o guían un grupo RX.",
    price: "$64.000",
    period: "ARS / mes",
    features: [
      "Planificación Atleta RX/Élite · 6 días por semana",
      "Levantamiento olímpico · 2 días por semana",
      "Protocolo de Fuerza Nivel 2",
    ],
    footer: null,
    url: `${SUB}/69270010545085e6cee5e2c2`,
    order: 2,
    published: true,
    showInFooter: true,
  },
  {
    id: 3,
    group: "main",
    name: "Samurai Athlete",
    description:
      "El grupo elite de Atlética. Un equipo forjado en la disciplina, la excelencia técnica y el espíritu indomable del guerrero, para atletas que buscan trascender sus límites físicos, mentales y emocionales.",
    price: "$79.000",
    period: "ARS / mes",
    features: [
      "Fuerza, halterofilia y gimnasia avanzada",
      "Metcons estratégicos y movilidad inteligente",
      "Bloques preventivos y desafíos temáticos",
      "Planificación semanal grupal",
      "Nivel elite competitivo",
    ],
    footer:
      "Cada semana es una misión; cada benchmark, una batalla; cada progreso, un paso hacia la maestría.",
    url: `${SUB}/68f2b18ee6cb651387e53692`,
    order: 3,
    published: true,
    showInFooter: true,
  },

  // ── Otras planificaciones (carrusel) ──
  {
    id: 4,
    group: "otras",
    name: "Planificación para BOX",
    description:
      "Si tenés tu propio box con clases diarias, este combo es para vos: planificación diaria, variada y con estímulos seleccionados para que tus coaches expliquen una técnica distinta cada día y tus alumnos crezcan.",
    price: null,
    period: null,
    features: [
      "Planificación diaria general",
      "Atletas Scaled · 3 días por semana",
      "Protocolo de Fuerza Nivel 1",
    ],
    footer:
      "Se entrega por app cada semana; el encargado del box la distribuye según sus atletas.",
    url: `${SUB}/6927056cfb0c3b5c11b433e6`,
    order: 4,
    published: true,
    showInFooter: true,
  },
  {
    id: 5,
    group: "otras",
    name: "Levantamiento Olímpico",
    description:
      "Combo de levantamiento olímpico para sumar a tu semana, con todos los ejercicios subidos a nuestro canal de YouTube.",
    price: null,
    period: null,
    features: [
      "2 días de levantamiento olímpico (videos en YouTube)",
      "2 protocolos de fuerza Nivel 1 y 2 para agregar",
      "3 días estructurales",
    ],
    footer: "Organizá las planificaciones para no generar sobrecarga ni lesiones.",
    url: `${SUB}/697a2a58eb54806807347e8a`,
    order: 5,
    published: true,
    showInFooter: true,
  },
  {
    id: 6,
    group: "otras",
    name: "Hybrid Race Program",
    description:
      "Preparación completa para carreras híbridas (Hyrox, Deka, Turf Games y eventos de resistencia funcional).",
    price: null,
    period: null,
    features: [
      "4 días por semana · 60 min por sesión",
      "Fuerza, potencia y capacidad aeróbica en un solo plan",
      "Correr más rápido y sostener el esfuerzo más tiempo",
      "Mantener la eficiencia bajo fatiga",
    ],
    footer: null,
    url: `${SUB}/69dc21221b35da287497cc5c`,
    order: 6,
    published: true,
    showInFooter: true,
  },
  {
    id: 7,
    group: "otras",
    name: "Planificación en casa",
    description:
      "Sin salir de casa, en un parque o incluso en el gimnasio. Vas a contar con 4 días de entrenamiento de ~45 minutos con una kettlebell o mancuerna como único material.",
    price: null,
    period: null,
    features: [
      "4 días semanales · ~45 min",
      "Solo una kettlebell o mancuerna",
      "En casa, parque o gimnasio",
    ],
    footer: null,
    url: `${SUB}/697e9507aa0ef62d576c8d83`,
    order: 7,
    published: true,
    showInFooter: true,
  },
];
