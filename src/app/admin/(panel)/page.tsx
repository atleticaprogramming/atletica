import Link from "next/link";
import { getAllCourses, getAllPlans } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [courses, plans] = await Promise.all([getAllCourses(), getAllPlans()]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Panel de contenido</h1>
        <p className="mt-1 text-sm text-ink/55">
          Gestioná los textos, cursos, planificaciones y precios del sitio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/cursos"
          className="rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-ink/30"
        >
          <div className="text-3xl font-bold">{courses.length}</div>
          <div className="mt-1 text-sm font-semibold">Cursos</div>
          <p className="mt-1 text-xs text-ink/50">
            Crear, editar textos, precios y módulos.
          </p>
        </Link>
        <Link
          href="/admin/planes"
          className="rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-ink/30"
        >
          <div className="text-3xl font-bold">{plans.length}</div>
          <div className="mt-1 text-sm font-semibold">Planificaciones</div>
          <p className="mt-1 text-xs text-ink/50">
            Principales y otras, con sus precios y enlaces.
          </p>
        </Link>
      </div>
    </div>
  );
}
