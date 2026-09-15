import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { BoxHero } from "@/components/box/BoxHero";
import { BoxNave } from "@/components/box/BoxNave";
import { BoxDisciplinas } from "@/components/box/BoxDisciplinas";
import { BoxFundador } from "@/components/box/BoxFundador";
import { BoxFaq } from "@/components/box/BoxFaq";
import { box } from "@/lib/box";

// El footer lee contenido administrado desde /admin.
export const revalidate = 60;

const title = `Atlética BOX — ${box.barrio}`;
const description = `Atlética abre su box en ${box.barrio}, ${box.ciudad}: crosstraining, levantamiento olímpico y gimnásticos en una nave propia. Preinscribite y te queda la tarifa fundador.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

const navLinks = [
  { label: "Qué se entrena", href: "#disciplinas" },
  { label: "Tarifa fundador", href: "#preinscripcion" },
  { label: "Preguntas", href: "#preguntas" },
];

export default function BoxPage() {
  return (
    <main className="overflow-clip">
      <Nav
        links={navLinks}
        cta={{ label: "Preinscribirme", href: "#preinscripcion" }}
      />
      <BoxHero />
      <BoxNave />
      <BoxDisciplinas />
      <BoxFundador />
      <BoxFaq />
      <Footer />
    </main>
  );
}
