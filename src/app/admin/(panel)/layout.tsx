import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { hasDb } from "@/lib/db";
import { logoutAction } from "@/app/admin/actions";

export const metadata = { title: "Admin — Atlética" };
export const dynamic = "force-dynamic";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-10 border-b border-ink/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold">
              Atlética · Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm text-ink/70">
              <Link href="/admin/cursos" className="hover:text-ink">
                Cursos
              </Link>
              <Link href="/admin/planes" className="hover:text-ink">
                Planificaciones
              </Link>
              <a href="/" target="_blank" className="hover:text-ink">
                Ver sitio ↗
              </a>
            </nav>
          </div>
          <form action={logoutAction}>
            <button className="text-sm text-ink/50 hover:text-ink">Salir</button>
          </form>
        </div>
      </header>

      {!hasDb() && (
        <div className="border-b border-amber-200 bg-amber-50 px-5 py-2.5 text-center text-sm text-amber-700">
          ⚠️ No hay base de datos conectada. Estás viendo el contenido base de
          solo lectura — los cambios no se guardarán hasta configurar Postgres.
        </div>
      )}

      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
    </div>
  );
}
