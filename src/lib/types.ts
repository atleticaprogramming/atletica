export type Module = { n: string; t: string; l: string; d: string };

export type Instructor = { name: string; bio: string[] };

export type CourseData = {
  slug: string;
  title: string;
  category: string;
  /** Ruta a un asset existente en /public (texto, sin subida de imágenes). */
  image: string;
  price: string;
  /** ej: "43 lecciones · 10 módulos · certificado" */
  meta: string;
  enrollUrl: string;
  /** Descripción corta para la tarjeta del home. */
  cardDesc: string;
  /** Etiqueta de la tarjeta del home, ej: "43 lecciones". */
  lecciones: string;
  descParas: string[];
  modules: Module[];
  incluye: string[];
  instructor: Instructor;
  order: number;
  published: boolean;
};

export type PlanGroup = "main" | "otras";

export type PlanData = {
  id: number;
  group: PlanGroup;
  name: string;
  description: string;
  price?: string | null;
  period?: string | null;
  features: string[];
  footer?: string | null;
  url: string;
  order: number;
  published: boolean;
  showInFooter: boolean;
};

export type PlanLink = { name: string; url: string };
