import Link from "next/link";
import { getAllPlans } from "@/lib/content";
import type { PlanData } from "@/lib/types";

export const dynamic = "force-dynamic";

function Group({ title, plans }: { title: string; plans: PlanData[] }) {
  if (plans.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-ink/55">{title}</h2>
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        {plans.map((p, i) => (
          <Link
            key={p.id}
            href={`/admin/planes/${p.id}`}
            className={`flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ink/[0.03] ${
              i > 0 ? "border-t border-ink/10" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">{p.name}</span>
              {!p.published && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                  Oculto
                </span>
              )}
            </div>
            <span className="flex-none text-sm font-mono text-ink/60">
              {p.price ?? "—"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function PlanesList({
  searchParams,
}: {
  searchParams: { error?: string; saved?: string; deleted?: string };
}) {
  const plans = await getAllPlans();

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
          Planificación eliminada.
        </p>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Planificaciones</h1>
        <Link
          href="/admin/planes/nuevo"
          className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink/85"
        >
          + Nueva planificación
        </Link>
      </div>

      <Group title="Principales" plans={plans.filter((p) => p.group === "main")} />
      <Group title="Otras planificaciones" plans={plans.filter((p) => p.group === "otras")} />
    </div>
  );
}
