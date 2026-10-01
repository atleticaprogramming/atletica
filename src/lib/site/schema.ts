import type { SectionId } from "@/lib/site/defaults";

/**
 * Qué campos ve el cliente en /admin → «Textos e imágenes», con qué etiqueta
 * y qué tipo de control. Las claves (`k`) son las de `siteDefaults`.
 */

export type Field =
  | { k: string; type: "text" | "textarea" | "url"; label: string; hint?: string }
  | { k: string; type: "image" | "video"; label: string; hint?: string }
  | { k: string; type: "strings"; label: string; hint?: string; item?: string; multiline?: boolean }
  | { k: string; type: "list"; label: string; hint?: string; item: string; fields: Field[] }
  | { k: string; type: "group"; label: string; hint?: string; fields: Field[] };

export type SectionDef = {
  id: SectionId;
  page: string;
  title: string;
  /** Dónde se ve, para el link «Ver en la web». */
  href: string;
  fields: Field[];
};

const titulo2: Field[] = [
  { k: "titulo1", type: "text", label: "Título · primera línea" },
  { k: "titulo2", type: "text", label: "Título · segunda línea" },
];

const legal = (id: "terminos" | "privacidad", title: string): SectionDef => ({
  id,
  page: "Legales",
  title,
  href: `/${id}`,
  fields: [
    { k: "titulo", type: "text", label: "Título" },
    { k: "descripcion", type: "textarea", label: "Descripción para Google" },
    { k: "actualizado", type: "text", label: "Última actualización", hint: "ej: Junio de 2026" },
    { k: "intro", type: "textarea", label: "Introducción" },
    {
      k: "secciones",
      type: "list",
      label: "Apartados",
      item: "Apartado",
      hint: "Se numeran solos",
      fields: [
        { k: "h", type: "text", label: "Título del apartado" },
        { k: "body", type: "strings", label: "Párrafos", item: "párrafo", multiline: true },
      ],
    },
    { k: "nota", type: "textarea", label: "Nota final" },
  ],
});

export const sections: SectionDef[] = [
  // ── General ────────────────────────────────────────────────────────────────
  {
    id: "ajustes",
    page: "General",
    title: "Contacto y enlaces",
    href: "/box",
    fields: [
      {
        k: "whatsapp",
        type: "text",
        label: "WhatsApp",
        hint: "Sólo números, con código de país: 5491170649757",
      },
      { k: "email", type: "text", label: "Email de contacto" },
      { k: "preinscripcionUrl", type: "url", label: "Formulario de preinscripción" },
      { k: "instagram", type: "url", label: "Instagram" },
      { k: "youtube", type: "url", label: "YouTube" },
    ],
  },
  {
    id: "footer",
    page: "General",
    title: "Pie de página",
    href: "/#footer",
    fields: [
      { k: "texto", type: "textarea", label: "Texto debajo del logo" },
      { k: "contacto", type: "text", label: "Botón de contacto" },
      { k: "tituloPlanes", type: "text", label: "Título de la columna de planificaciones" },
      { k: "tituloCursos", type: "text", label: "Título de la columna de cursos" },
      { k: "copyright", type: "text", label: "Texto del ©" },
    ],
  },

  // ── Home ───────────────────────────────────────────────────────────────────
  {
    id: "homeNav",
    page: "Home",
    title: "Menú",
    href: "/",
    fields: [
      {
        k: "links",
        type: "list",
        label: "Enlaces del menú",
        item: "Enlace",
        fields: [
          { k: "label", type: "text", label: "Texto" },
          { k: "href", type: "text", label: "Destino", hint: "ej: /#cursos" },
        ],
      },
      { k: "cta", type: "text", label: "Botón del menú" },
      { k: "ctaHref", type: "text", label: "Destino del botón" },
    ],
  },
  {
    id: "homeHero",
    page: "Home",
    title: "Portada",
    href: "/",
    fields: [
      { k: "video", type: "video", label: "Video de fondo", hint: "MP4, liviano (menos de 20 MB)" },
      { k: "poster", type: "image", label: "Imagen mientras carga el video" },
      { k: "titulo", type: "text", label: "Palabra grande" },
      { k: "texto", type: "textarea", label: "Texto", hint: "Cada renglón es una línea" },
      { k: "boton1", type: "text", label: "Botón principal" },
      { k: "boton2", type: "text", label: "Botón secundario" },
    ],
  },
  {
    id: "homeQueEs",
    page: "Home",
    title: "Qué es Atlética",
    href: "/#que-es",
    fields: [
      { k: "fotos", type: "strings", label: "Fotos de la tira", item: "foto", hint: "Rutas o enlaces" },
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      { k: "texto", type: "textarea", label: "Texto grande" },
      {
        k: "pilares",
        type: "list",
        label: "Pilares",
        item: "Pilar",
        fields: [
          { k: "titulo", type: "text", label: "Título" },
          { k: "texto", type: "textarea", label: "Texto" },
        ],
      },
    ],
  },
  {
    id: "homeProgramas",
    page: "Home",
    title: "Planificaciones (encabezado)",
    href: "/#programaciones",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      ...titulo2,
      { k: "texto", type: "textarea", label: "Texto" },
    ],
  },
  {
    id: "homeCursos",
    page: "Home",
    title: "Cursos (encabezado)",
    href: "/#cursos",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      ...titulo2,
      { k: "boton", type: "text", label: "Botón de cada tarjeta" },
    ],
  },
  {
    id: "homeMetodo",
    page: "Home",
    title: "El método",
    href: "/#metodo",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      ...titulo2,
      {
        k: "etapas",
        type: "list",
        label: "Etapas",
        item: "Etapa",
        fields: [
          { k: "titulo", type: "text", label: "Título" },
          { k: "texto", type: "textarea", label: "Texto" },
          { k: "imagen", type: "image", label: "Imagen" },
        ],
      },
    ],
  },
  {
    id: "homeOtras",
    page: "Home",
    title: "Otras planificaciones (encabezado)",
    href: "/#otras",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      { k: "titulo", type: "text", label: "Título" },
    ],
  },
  {
    id: "homeValores",
    page: "Home",
    title: "Valores",
    href: "/#valores",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta izquierda" },
      { k: "etiquetaDerecha", type: "text", label: "Etiqueta derecha" },
      {
        k: "lineas",
        type: "list",
        label: "Líneas de palabras",
        item: "Línea",
        fields: [
          {
            k: "palabras",
            type: "list",
            label: "Palabras",
            item: "Palabra",
            hint: "Al pasar el mouse se ve su imagen",
            fields: [
              { k: "palabra", type: "text", label: "Palabra" },
              { k: "imagen", type: "image", label: "Imagen" },
            ],
          },
        ],
      },
      { k: "texto", type: "textarea", label: "Texto" },
    ],
  },
  {
    id: "homeCta",
    page: "Home",
    title: "Cierre (Empezá hoy)",
    href: "/#sumate",
    fields: [
      { k: "imagen", type: "image", label: "Imagen de fondo" },
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      { k: "titulo", type: "text", label: "Título" },
      { k: "texto", type: "textarea", label: "Texto" },
      { k: "boton1", type: "text", label: "Botón principal" },
      { k: "boton2", type: "text", label: "Botón secundario" },
    ],
  },

  // ── Box ────────────────────────────────────────────────────────────────────
  {
    id: "box",
    page: "Fitness Center (/box)",
    title: "Datos del centro y menú",
    href: "/box",
    fields: [
      { k: "nombre", type: "text", label: "Nombre completo" },
      { k: "nombreCorto", type: "text", label: "Nombre corto (menú en el celular)" },
      { k: "barrio", type: "text", label: "Barrio" },
      { k: "ciudad", type: "text", label: "Ciudad" },
      { k: "direccion", type: "text", label: "Dirección" },
      { k: "descripcion", type: "textarea", label: "Descripción para Google y redes" },
      {
        k: "links",
        type: "list",
        label: "Enlaces del menú",
        item: "Enlace",
        fields: [
          { k: "label", type: "text", label: "Texto" },
          { k: "href", type: "text", label: "Destino", hint: "ej: #preguntas" },
        ],
      },
      { k: "ctaNav", type: "text", label: "Botón del menú" },
    ],
  },
  {
    id: "boxHero",
    page: "Fitness Center (/box)",
    title: "Portada",
    href: "/box",
    fields: [
      { k: "imagenIzquierda", type: "image", label: "Foto izquierda", hint: "También es la del celular" },
      { k: "imagenDerecha", type: "image", label: "Foto derecha" },
      { k: "chip", type: "text", label: "Etiqueta de estado" },
      { k: "bajada", type: "textarea", label: "Bajada", hint: "Cada renglón es una línea en la compu" },
      { k: "boton1", type: "text", label: "Botón de preinscripción" },
      { k: "boton2", type: "text", label: "Botón de WhatsApp" },
      { k: "mensajeWhatsapp", type: "textarea", label: "Mensaje que se escribe en WhatsApp" },
    ],
  },
  {
    id: "boxQueSomos",
    page: "Fitness Center (/box)",
    title: "Qué somos",
    href: "/box#que-somos",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      { k: "titulo", type: "textarea", label: "Título" },
      { k: "intro", type: "textarea", label: "Texto" },
      {
        k: "pilares",
        type: "list",
        label: "Pilares",
        item: "Pilar",
        fields: [
          { k: "titulo", type: "text", label: "Título" },
          { k: "texto", type: "textarea", label: "Texto" },
        ],
      },
    ],
  },
  {
    id: "boxDisciplinas",
    page: "Fitness Center (/box)",
    title: "Qué se entrena",
    href: "/box#disciplinas",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      ...titulo2,
      {
        k: "tarjetas",
        type: "list",
        label: "Disciplinas",
        item: "Disciplina",
        fields: [
          { k: "nombre", type: "text", label: "Nombre" },
          { k: "texto", type: "textarea", label: "Texto" },
          { k: "puntos", type: "strings", label: "Puntos", item: "punto" },
          { k: "imagen", type: "image", label: "Foto" },
          {
            k: "encuadre",
            type: "text",
            label: "Encuadre de la foto",
            hint: "horizontal% vertical% · 50% 50% = centro",
          },
          { k: "zoom", type: "text", label: "Zoom", hint: "1 = sin zoom · 1.5 = más cerca" },
          { k: "oscurecer", type: "text", label: "Oscurecer la foto (%)", hint: "0 a 100" },
        ],
      },
      {
        k: "aMedida",
        type: "group",
        label: "Tarjeta «a tu medida»",
        fields: [
          { k: "nombre", type: "text", label: "Nombre" },
          { k: "texto", type: "textarea", label: "Texto" },
          { k: "imagen", type: "image", label: "Foto" },
          { k: "enlace", type: "text", label: "Texto del enlace" },
          { k: "mensajeWhatsapp", type: "textarea", label: "Mensaje que se escribe en WhatsApp" },
        ],
      },
    ],
  },
  {
    id: "boxPreinscripcion",
    page: "Fitness Center (/box)",
    title: "Preinscripción",
    href: "/box#preinscripcion",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      ...titulo2,
      { k: "texto", type: "textarea", label: "Texto" },
      { k: "tituloTarjeta", type: "text", label: "Título de la tarjeta" },
      { k: "incluye", type: "strings", label: "Beneficios", item: "beneficio" },
      { k: "cupos", type: "text", label: "Frase de cupos" },
      { k: "letraChica", type: "textarea", label: "Letra chica" },
      { k: "boton1", type: "text", label: "Botón de preinscripción" },
      { k: "boton2", type: "text", label: "Botón de WhatsApp" },
      { k: "mensajeWhatsapp", type: "textarea", label: "Mensaje que se escribe en WhatsApp" },
    ],
  },
  {
    id: "boxFaq",
    page: "Fitness Center (/box)",
    title: "Preguntas frecuentes",
    href: "/box#preguntas",
    fields: [
      { k: "etiqueta", type: "text", label: "Etiqueta" },
      ...titulo2,
      { k: "intro", type: "textarea", label: "Texto" },
      {
        k: "preguntas",
        type: "list",
        label: "Preguntas",
        item: "Pregunta",
        fields: [
          { k: "pregunta", type: "text", label: "Pregunta" },
          { k: "respuesta", type: "textarea", label: "Respuesta" },
        ],
      },
    ],
  },

  // ── Legales ────────────────────────────────────────────────────────────────
  legal("terminos", "Términos y condiciones"),
  legal("privacidad", "Política de privacidad"),
];

export function getSectionDef(id: string): SectionDef | undefined {
  return sections.find((s) => s.id === id);
}
