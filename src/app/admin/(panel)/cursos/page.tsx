import Link from "next/link";
import { getAllCourses } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CursosList({
  searchParams,
}: {
  searchParams: { error?: string; saved?: string; deleted?: string };
}) {
  const courses = await getAllCourses();

  return (
    <div className="flex flex-col gap-6">
      {searchParams.error === "nodb" && (
        <p className="rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-700">
          No se pudo guardar: todavía no hay base de datos conectada. Conectá
          Postgres (ver ADMIN.md) para que los cambios se guarden.
        </p>
      )}
      {searchParams.saved && (
        <p className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
          Cambios guardados.
        </p>
      )}
      {searchParams.deleted && (
        <p className="rounded-lg bg-ink/5 px-3 py-2.5 text-sm text-ink/60">
          Curso eliminado.
        </p>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cursos</h1>
        <Link
          href="/admin/cursos/nuevo"
          className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink/85"
        >
          + Nuevo curso
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        {courses.map((c, i) => (
          <Link
            key={c.slug}
            href={`/admin/cursos/${c.slug}`}
            className={`flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ink/[0.03] ${
              i > 0 ? "border-t border-ink/10" : ""
            }`}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-semibold">{c.title}</span>
                {!c.published && (
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                    Oculto
                  </span>
                )}
              </div>
              <div className="truncate text-xs text-ink/45">/cursos/{c.slug}</div>
            </div>
            <span className="flex-none text-sm font-mono text-ink/60">{c.price}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
