import "server-only";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";

const COOKIE = "atletica_admin";

export function adminPassword(): string {
  // En producción definí ADMIN_PASSWORD en las variables de entorno de Vercel.
  return process.env.ADMIN_PASSWORD || "atletica";
}

function sessionToken(): string {
  const secret = process.env.SESSION_SECRET || "atletica-cms-secret";
  return createHash("sha256")
    .update(`${adminPassword()}::${secret}`)
    .digest("hex");
}

/** ¿La request actual tiene una sesión válida de admin? */
export function isAuthenticated(): boolean {
  const c = cookies().get(COOKIE)?.value;
  return Boolean(c) && c === sessionToken();
}

/** Inicia sesión si la contraseña es correcta. Devuelve true/false. */
export function signIn(password: string): boolean {
  if (password !== adminPassword()) return false;
  cookies().set(COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });
  return true;
}

export function signOut(): void {
  cookies().delete(COOKIE);
}
