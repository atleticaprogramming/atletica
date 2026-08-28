import { notFound } from "next/navigation";
import { getPlan } from "@/lib/content";
import { PlanForm } from "@/app/admin/(panel)/planes/PlanForm";

export const dynamic = "force-dynamic";

export default async function EditarPlan({
  params,
}: {
  params: { id: string };
}) {
  const plan = await getPlan(Number(params.id));
  if (!plan) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <a href="/admin/planes" className="text-sm text-ink/50 hover:text-ink">
          ← Planificaciones
        </a>
        <h1 className="mt-2 text-2xl font-bold">{plan.name}</h1>
      </div>
      <PlanForm plan={plan} />
    </div>
  );
}
