"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/lib/auth";
import {
  upsertCourse,
  deleteCourse,
  createPlan,
  updatePlan,
  deletePlan,
} from "@/lib/content-write";
import { hasDb } from "@/lib/db";
import type { CourseData, Module, PlanData, PlanGroup } from "@/lib/types";

function guardDb(redirectTo: string) {
  if (!hasDb()) redirect(`${redirectTo}?error=nodb`);
}

function str(fd: FormData, name: string): string {
  return String(fd.get(name) ?? "").trim();
}

function bool(fd: FormData, name: string): boolean {
  return fd.get(name) === "on" || fd.get(name) === "true";
}

function num(fd: FormData, name: string): number {
  const n = Number(fd.get(name));
  return Number.isFinite(n) ? n : 0;
}

/** Lee un campo JSON (de los repeaters del formulario) como lista de strings. */
function strList(fd: FormData, name: string): string[] {
  try {
    const v = JSON.parse(String(fd.get(name) ?? "[]"));
    return Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function modules(fd: FormData, name: string): Module[] {
  try {
    const v = JSON.parse(String(fd.get(name) ?? "[]"));
    if (!Array.isArray(v)) return [];
    return v
      .map((m, i) => ({
        n: String(i + 1).padStart(2, "0"),
        t: String(m?.t ?? "").trim(),
        l: String(m?.l ?? "").trim(),
        d: String(m?.d ?? "").trim(),
      }))
      .filter((m) => m.t);
  } catch {
    return [];
  }
}

function refresh(slug?: string) {
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/cursos/${slug}`);
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAction(fd: FormData) {
  const ok = signIn(str(fd, "password"));
  redirect(ok ? "/admin" : "/admin/login?error=1");
}

export async function logoutAction() {
  signOut();
  redirect("/admin/login");
}

// ── Cursos ──────────────────────────────────────────────────────────────────

export async function saveCourseAction(fd: FormData) {
  guardDb("/admin/cursos");
  const slug = str(fd, "slug")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) redirect("/admin/cursos?error=slug");

  const course: CourseData = {
    slug,
    title: str(fd, "title"),
    category: str(fd, "category"),
    image: str(fd, "image"),
    price: str(fd, "price"),
    meta: str(fd, "meta"),
    enrollUrl: str(fd, "enrollUrl"),
    cardDesc: str(fd, "cardDesc"),
    lecciones: str(fd, "lecciones"),
    descParas: strList(fd, "descParas"),
    modules: modules(fd, "modules"),
    incluye: strList(fd, "incluye"),
    instructor: {
      name: str(fd, "instructorName"),
      bio: strList(fd, "instructorBio"),
    },
    order: num(fd, "order"),
    published: bool(fd, "published"),
  };

  await upsertCourse(course);
  refresh(slug);
  redirect("/admin/cursos?saved=1");
}

export async function deleteCourseAction(fd: FormData) {
  guardDb("/admin/cursos");
  const slug = str(fd, "slug");
  if (slug) {
    await deleteCourse(slug);
    refresh(slug);
  }
  redirect("/admin/cursos?deleted=1");
}

// ── Planificaciones ───────────────────────────────────────────────────────────

export async function savePlanAction(fd: FormData) {
  guardDb("/admin/planes");
  const id = num(fd, "id");
  const group = (str(fd, "group") || "main") as PlanGroup;
  const data: Omit<PlanData, "id"> = {
    group,
    name: str(fd, "name"),
    description: str(fd, "description"),
    price: str(fd, "price") || null,
    period: str(fd, "period") || null,
    features: strList(fd, "features"),
    footer: str(fd, "footer") || null,
    url: str(fd, "url") || "#",
    order: num(fd, "order"),
    published: bool(fd, "published"),
    showInFooter: bool(fd, "showInFooter"),
  };

  if (id > 0) {
    await updatePlan({ id, ...data });
  } else {
    await createPlan(data);
  }
  refresh();
  redirect("/admin/planes?saved=1");
}

export async function deletePlanAction(fd: FormData) {
  guardDb("/admin/planes");
  const id = num(fd, "id");
  if (id > 0) {
    await deletePlan(id);
    refresh();
  }
  redirect("/admin/planes?deleted=1");
}
