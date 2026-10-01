import type { Metadata } from "next";
import { LegalLayout } from "@/components/sections/LegalLayout";
import { getSite } from "@/lib/site/store";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { terminos: c } = await getSite();
  return { title: `${c.titulo} — Atlética`, description: c.descripcion };
}

export default async function Page() {
  const { terminos: c } = await getSite();
  return (
    <LegalLayout
      title={c.titulo}
      updated={c.actualizado}
      intro={c.intro}
      sections={c.secciones}
      nota={c.nota}
    />
  );
}
