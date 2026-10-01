import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { BoxHero } from "@/components/box/BoxHero";
import { BoxQueSomos } from "@/components/box/BoxQueSomos";
import { BoxDisciplinas } from "@/components/box/BoxDisciplinas";
import { BoxPreinscripcion } from "@/components/box/BoxPreinscripcion";
import { BoxFaq } from "@/components/box/BoxFaq";
import { preinscripcionHref } from "@/lib/box";
import { getSite } from "@/lib/site/store";

// Textos e imágenes se administran desde /admin.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { box } = await getSite();
  const title = `${box.nombre} — ${box.barrio}`;
  const description = box.descripcion;
  return { title, description, openGraph: { title, description, type: "website" } };
}

export default async function BoxPage() {
  const site = await getSite();
  const { box, ajustes } = site;

  return (
    <main className="overflow-clip">
      <Nav
        links={box.links}
        cta={{ label: box.ctaNav, href: preinscripcionHref(ajustes, box.nombre) }}
        wordmark={box.nombre}
        wordmarkCorto={box.nombreCorto}
      />
      <BoxHero c={site.boxHero} box={box} ajustes={ajustes} />
      <BoxQueSomos c={site.boxQueSomos} />
      <BoxDisciplinas c={site.boxDisciplinas} ajustes={ajustes} />
      <BoxPreinscripcion c={site.boxPreinscripcion} ajustes={ajustes} />
      <BoxFaq c={site.boxFaq} />
      <Footer />
    </main>
  );
}
