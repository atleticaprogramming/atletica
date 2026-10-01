import Link from "next/link";
import { sections } from "@/lib/site/schema";
import { getEditedSections } from "@/lib/site/store";

export const dynamic = "force-dynamic";

export default async function Contenido() {
  const edited = new Set(await getEditedSections());
  const pages = Array.from(new Set(sections.map((s) => s.page)));

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold">Textos e imágenes</h1>
        <p className="mt-1 text-sm text-ink/55">
          Cada bloque es una sección de la web. Entrá, cambiá lo que necesites y
          guardá: se actualiza en el momento.
        </p>
      </div>

      {pages.map((page) => (
        <section key={page} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/45">{page}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections
              .filter((s) => s.page === page)
              .map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/contenido/${s.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white px-5 py-4 transition-colors hover:border-ink/30"
                >
                  <span className="text-sm font-semibold">{s.title}</span>
                  {edited.has(s.id) && (
                    <span className="rounded-full bg-ink/[0.06] px-2 py-0.5 text-[11px] text-ink/55">
                      editado
                    </span>
                  )}
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
