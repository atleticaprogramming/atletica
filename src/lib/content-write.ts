import "server-only";
import { sql, seedDatabase } from "@/lib/db";
import type { CourseData, PlanData } from "@/lib/types";

// Escrituras de contenido (usadas por las server actions del panel /admin).
// Antes de escribir se cargan los datos base si la base está vacía: si no,
// editar un curso en una base nueva dejaría la web con ese único curso.

export async function upsertCourse(c: CourseData): Promise<void> {
  await seedDatabase(false);
  await sql`
    INSERT INTO courses
      (slug, title, category, image, price, meta, enroll_url, card_desc, lecciones,
       desc_paras, modules, incluye, instructor, sort_order, published, updated_at)
    VALUES
      (${c.slug}, ${c.title}, ${c.category}, ${c.image}, ${c.price}, ${c.meta},
       ${c.enrollUrl}, ${c.cardDesc}, ${c.lecciones},
       ${JSON.stringify(c.descParas)}::jsonb, ${JSON.stringify(c.modules)}::jsonb,
       ${JSON.stringify(c.incluye)}::jsonb, ${JSON.stringify(c.instructor)}::jsonb,
       ${c.order}, ${c.published}, NOW())
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      category = EXCLUDED.category,
      image = EXCLUDED.image,
      price = EXCLUDED.price,
      meta = EXCLUDED.meta,
      enroll_url = EXCLUDED.enroll_url,
      card_desc = EXCLUDED.card_desc,
      lecciones = EXCLUDED.lecciones,
      desc_paras = EXCLUDED.desc_paras,
      modules = EXCLUDED.modules,
      incluye = EXCLUDED.incluye,
      instructor = EXCLUDED.instructor,
      sort_order = EXCLUDED.sort_order,
      published = EXCLUDED.published,
      updated_at = NOW()
  `;
}

export async function deleteCourse(slug: string): Promise<void> {
  await seedDatabase(false);
  await sql`DELETE FROM courses WHERE slug = ${slug}`;
}

export async function createPlan(p: Omit<PlanData, "id">): Promise<void> {
  await seedDatabase(false);
  await sql`
    INSERT INTO plans
      (grp, name, description, price, period, features, footer, url,
       sort_order, published, show_in_footer, updated_at)
    VALUES
      (${p.group}, ${p.name}, ${p.description}, ${p.price ?? null}, ${p.period ?? null},
       ${JSON.stringify(p.features)}::jsonb, ${p.footer ?? null}, ${p.url},
       ${p.order}, ${p.published}, ${p.showInFooter}, NOW())
  `;
}

export async function updatePlan(p: PlanData): Promise<void> {
  await seedDatabase(false);
  await sql`
    UPDATE plans SET
      grp = ${p.group},
      name = ${p.name},
      description = ${p.description},
      price = ${p.price ?? null},
      period = ${p.period ?? null},
      features = ${JSON.stringify(p.features)}::jsonb,
      footer = ${p.footer ?? null},
      url = ${p.url},
      sort_order = ${p.order},
      published = ${p.published},
      show_in_footer = ${p.showInFooter},
      updated_at = NOW()
    WHERE id = ${p.id}
  `;
}

export async function deletePlan(id: number): Promise<void> {
  await seedDatabase(false);
  await sql`DELETE FROM plans WHERE id = ${id}`;
}
