"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { getSectionDef } from "@/lib/site/schema";
import { saveSection, resetSection } from "@/lib/site/store";
import { siteDefaults } from "@/lib/site/defaults";

type Result = { ok: boolean; error?: string; data?: Record<string, unknown> };

export async function saveSiteSection(id: string, data: unknown): Promise<Result> {
  if (!isAuthenticated()) return { ok: false, error: "La sesión venció. Volvé a entrar." };
  const def = getSectionDef(id);
  if (!def) return { ok: false, error: "Sección desconocida." };
  try {
    await saveSection(def.id, data);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function resetSiteSection(id: string): Promise<Result> {
  if (!isAuthenticated()) return { ok: false, error: "La sesión venció. Volvé a entrar." };
  const def = getSectionDef(id);
  if (!def) return { ok: false, error: "Sección desconocida." };
  try {
    await resetSection(def.id);
    revalidatePath("/", "layout");
    return { ok: true, data: siteDefaults[def.id] as Record<string, unknown> };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
