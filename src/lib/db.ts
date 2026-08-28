import "server-only";
import { sql } from "@vercel/postgres";
import { seedCourses, seedPlans } from "@/lib/seed-data";

// ¿Hay una base de datos Postgres configurada? (Vercel inyecta POSTGRES_URL)
export function hasDb(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

export { sql };

let schemaReady = false;

/** Crea las tablas si no existen. Idempotente. */
export async function ensureSchema(): Promise<void> {
  if (!hasDb()) throw new Error("No hay base de datos configurada (POSTGRES_URL).");
  if (schemaReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      slug        TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      category    TEXT NOT NULL DEFAULT '',
      image       TEXT NOT NULL DEFAULT '',
      price       TEXT NOT NULL DEFAULT '',
      meta        TEXT NOT NULL DEFAULT '',
      enroll_url  TEXT NOT NULL DEFAULT '',
      card_desc   TEXT NOT NULL DEFAULT '',
      lecciones   TEXT NOT NULL DEFAULT '',
      desc_paras  JSONB NOT NULL DEFAULT '[]'::jsonb,
      modules     JSONB NOT NULL DEFAULT '[]'::jsonb,
      incluye     JSONB NOT NULL DEFAULT '[]'::jsonb,
      instructor  JSONB NOT NULL DEFAULT '{"name":"","bio":[]}'::jsonb,
      sort_order  INT NOT NULL DEFAULT 0,
      published   BOOLEAN NOT NULL DEFAULT TRUE,
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS plans (
      id            SERIAL PRIMARY KEY,
      grp           TEXT NOT NULL DEFAULT 'main',
      name          TEXT NOT NULL,
      description   TEXT NOT NULL DEFAULT '',
      price         TEXT,
      period        TEXT,
      features      JSONB NOT NULL DEFAULT '[]'::jsonb,
      footer        TEXT,
      url           TEXT NOT NULL DEFAULT '#',
      sort_order    INT NOT NULL DEFAULT 0,
      published     BOOLEAN NOT NULL DEFAULT TRUE,
      show_in_footer BOOLEAN NOT NULL DEFAULT TRUE,
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  schemaReady = true;
}

/** ¿La base ya tiene contenido? */
export async function isSeeded(): Promise<boolean> {
  await ensureSchema();
  const { rows } = await sql`SELECT COUNT(*)::int AS n FROM courses`;
  return (rows[0]?.n ?? 0) > 0;
}

/**
 * Carga el contenido base en la DB.
 * Con `replace = true` borra todo y lo reemplaza por los datos base.
 * Con `replace = false` solo inserta si las tablas están vacías.
 */
export async function seedDatabase(replace = false): Promise<void> {
  await ensureSchema();

  if (replace) {
    await sql`TRUNCATE courses`;
    await sql`TRUNCATE plans RESTART IDENTITY`;
  } else if (await isSeeded()) {
    return;
  }

  for (const c of seedCourses) {
    await sql`
      INSERT INTO courses
        (slug, title, category, image, price, meta, enroll_url, card_desc, lecciones,
         desc_paras, modules, incluye, instructor, sort_order, published)
      VALUES
        (${c.slug}, ${c.title}, ${c.category}, ${c.image}, ${c.price}, ${c.meta},
         ${c.enrollUrl}, ${c.cardDesc}, ${c.lecciones},
         ${JSON.stringify(c.descParas)}::jsonb, ${JSON.stringify(c.modules)}::jsonb,
         ${JSON.stringify(c.incluye)}::jsonb, ${JSON.stringify(c.instructor)}::jsonb,
         ${c.order}, ${c.published})
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  for (const p of seedPlans) {
    await sql`
      INSERT INTO plans
        (grp, name, description, price, period, features, footer, url,
         sort_order, published, show_in_footer)
      VALUES
        (${p.group}, ${p.name}, ${p.description}, ${p.price ?? null}, ${p.period ?? null},
         ${JSON.stringify(p.features)}::jsonb, ${p.footer ?? null}, ${p.url},
         ${p.order}, ${p.published}, ${p.showInFooter})
    `;
  }
}
