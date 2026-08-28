import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { loginAction } from "@/app/admin/actions";

export const metadata = { title: "Admin — Atlética" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAuthenticated()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-ink">
      <form
        action={loginAction}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-8"
      >
        <div>
          <h1 className="text-xl font-bold">Atlética · Admin</h1>
          <p className="mt-1 text-sm text-ink/55">
            Ingresá la contraseña para gestionar el contenido.
          </p>
        </div>
        {searchParams.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            Contraseña incorrecta.
          </p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoFocus
          className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-ink/40"
        />
        <button
          type="submit"
          className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink/85"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
