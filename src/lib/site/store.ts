import "server-only";
import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { sql, hasDb } from "@/lib/db";
import { siteDefaults, type SiteContent, type SectionId } from "@/lib/site/defaults";

// ─────────────────────────────────────────────────────────────────────────────
// Textos e imágenes de la web.
// Con Postgres: una fila por sección en `site_sections`. Sin Postgres, en
// desarrollo se guarda en `.content/site.json` para poder probar el panel en
// local; en producción sin base, la web muestra el contenido base.
// ─────────────────────────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

const LOCAL_FILE = path.join(process.cwd(), ".content", "site.json");

/** ¿Se pueden guardar cambios en este entorno? */
export function canSaveSite(): boolean {
  return hasDb() || process.env.NODE_ENV === "development";
}

let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS site_sections (
      id          TEXT PRIMARY KEY,
      data        JSONB NOT NULL,
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  tableReady = true;
}

async function readLocal(): Promise<Record<string, any>> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8"));
  } catch {
    return {};
  }
}

async function readStored(): Promise<Record<string, any>> {
  if (hasDb()) {
    try {
      await ensureTable();
      const { rows } = await sql`SELECT id, data FROM site_sections`;
      return Object.fromEntries(rows.map((r) => [r.id, r.data]));
    } catch {
      return {};
    }
  }
  if (process.env.NODE_ENV === "development") return readLocal();
  return {};
}

const isObj = (v: unknown): v is Record<string, any> =>
  Boolean(v) && typeof v === "object" && !Array.isArray(v);

/** Lo guardado pisa al contenido base campo a campo; las listas se
 *  reemplazan enteras. Un tipo distinto al esperado se ignora. */
function merge(base: any, over: any): any {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) return Array.isArray(over) ? over : base;
  if (isObj(base)) {
    if (!isObj(over)) return base;
    const out: Record<string, any> = { ...base };
    for (const k of Object.keys(base)) out[k] = merge(base[k], over[k]);
    return out;
  }
  return typeof over === typeof base ? over : base;
}

/** Todo el contenido de la web, ya mezclado con el contenido base. */
export const getSite = cache(async (): Promise<SiteContent> => {
  const stored = await readStored();
  const out: Record<string, any> = {};
  for (const id of Object.keys(siteDefaults) as SectionId[]) {
    out[id] = merge(siteDefaults[id], stored[id]);
  }
  return out as SiteContent;
});

/** IDs de las secciones que tienen cambios guardados. */
export async function getEditedSections(): Promise<string[]> {
  return Object.keys(await readStored());
}

export async function saveSection(id: SectionId, data: unknown): Promise<void> {
  const clean = merge(siteDefaults[id], data);
  if (hasDb()) {
    await ensureTable();
    await sql`
      INSERT INTO site_sections (id, data, updated_at)
      VALUES (${id}, ${JSON.stringify(clean)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `;
    return;
  }
  if (process.env.NODE_ENV !== "development") {
    throw new Error("No hay base de datos configurada.");
  }
  const all = await readLocal();
  all[id] = clean;
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(all, null, 2));
}

/** Vuelve la sección al contenido base. */
export async function resetSection(id: SectionId): Promise<void> {
  if (hasDb()) {
    await ensureTable();
    await sql`DELETE FROM site_sections WHERE id = ${id}`;
    return;
  }
  if (process.env.NODE_ENV !== "development") return;
  const all = await readLocal();
  delete all[id];
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(all, null, 2));
}
