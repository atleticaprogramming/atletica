import { PlanForm } from "@/app/admin/(panel)/planes/PlanForm";

export const dynamic = "force-dynamic";

export default function NuevaPlan() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <a href="/admin/planes" className="text-sm text-ink/50 hover:text-ink">
          ← Planificaciones
        </a>
        <h1 className="mt-2 text-2xl font-bold">Nueva planificación</h1>
      </div>
      <PlanForm />
    </div>
  );
}
