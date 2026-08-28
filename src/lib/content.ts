import "server-only";
import { sql, hasDb, ensureSchema } from "@/lib/db";
import { seedCourses, seedPlans } from "@/lib/seed-data";
import type { CourseData, PlanData, PlanLink } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// Capa de lectura de contenido.
// Si hay Postgres conectado, lee de la DB. Si no (o si falla), cae a los datos
// base de seed-data.ts para que el sitio nunca se rompa.
// ─────────────────────────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

function rowToCourse(r: any): CourseData {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category ?? "",
    image: r.image ?? "",
    price: r.price ?? "",
    meta: r.meta ?? "",
    enrollUrl: r.enroll_url ?? "",
    cardDesc: r.card_desc ?? "",
    lecciones: r.lecciones ?? "",
    descParas: r.desc_paras ?? [],
    modules: r.modules ?? [],
    incluye: r.incluye ?? [],
    instructor: r.instructor ?? { name: "", bio: [] },
    order: r.sort_order ?? 0,
    published: r.published ?? true,
  };
}

function rowToPlan(r: any): PlanData {
  return {
    id: r.id,
    group: r.grp,
    name: r.name,
    description: r.description ?? "",
    price: r.price,
    period: r.period,
    features: r.features ?? [],
    footer: r.footer,
    url: r.url ?? "#",
    order: r.sort_order ?? 0,
    published: r.published ?? true,
    showInFooter: r.show_in_footer ?? true,
  };
}

// ── Cursos ──────────────────────────────────────────────────────────────────

/** Todos los cursos (incluye no publicados). Para el panel /admin. */
export async function getAllCourses(): Promise<CourseData[]> {
  if (!hasDb()) return [...seedCourses].sort((a, b) => a.order - b.order);
  try {
    await ensureSchema();
    const { rows } = await sql`SELECT * FROM courses ORDER BY sort_order ASC, title ASC`;
    if (rows.length === 0) return [...seedCourses].sort((a, b) => a.order - b.order);
    return rows.map(rowToCourse);
  } catch {
    return [...seedCourses].sort((a, b) => a.order - b.order);
  }
}

/** Cursos publicados, para el sitio público. */
export async function getPublishedCourses(): Promise<CourseData[]> {
  return (await getAllCourses()).filter((c) => c.published);
}

export async function getCourse(slug: string): Promise<CourseData | null> {
  if (!hasDb()) return seedCourses.find((c) => c.slug === slug) ?? null;
  try {
    await ensureSchema();
    const { rows } = await sql`SELECT * FROM courses WHERE slug = ${slug} LIMIT 1`;
    if (rows.length === 0) {
      return seedCourses.find((c) => c.slug === slug) ?? null;
    }
    return rowToCourse(rows[0]);
  } catch {
    return seedCourses.find((c) => c.slug === slug) ?? null;
  }
}

export async function getCourseSlugs(): Promise<string[]> {
  return (await getPublishedCourses()).map((c) => c.slug);
}

// ── Planificaciones ───────────────────────────────────────────────────────────

export async function getAllPlans(): Promise<PlanData[]> {
  if (!hasDb()) return [...seedPlans].sort((a, b) => a.order - b.order);
  try {
    await ensureSchema();
    const { rows } = await sql`SELECT * FROM plans ORDER BY sort_order ASC, id ASC`;
    if (rows.length === 0) return [...seedPlans].sort((a, b) => a.order - b.order);
    return rows.map(rowToPlan);
  } catch {
    return [...seedPlans].sort((a, b) => a.order - b.order);
  }
}

export async function getPlan(id: number): Promise<PlanData | null> {
  const all = await getAllPlans();
  return all.find((p) => p.id === id) ?? null;
}

export async function getMainPlans(): Promise<PlanData[]> {
  return (await getAllPlans()).filter((p) => p.published && p.group === "main");
}

export async function getOtrasPlanes(): Promise<PlanData[]> {
  return (await getAllPlans()).filter((p) => p.published && p.group === "otras");
}

/** Enlaces para el footer (nombre + url). */
export async function getPlanLinks(): Promise<PlanLink[]> {
  return (await getAllPlans())
    .filter((p) => p.published && p.showInFooter)
    .map((p) => ({ name: p.name, url: p.url }));
}
