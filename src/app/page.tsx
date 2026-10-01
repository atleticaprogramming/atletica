import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Programas } from "@/components/sections/Programas";
import { Cursos } from "@/components/sections/Cursos";
import { Metodo } from "@/components/sections/Metodo";
import { OtrasPlanificaciones } from "@/components/sections/OtrasPlanificaciones";
import { Valores } from "@/components/sections/Valores";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";
import {
  getPublishedCourses,
  getMainPlans,
  getOtrasPlanes,
} from "@/lib/content";
import { getSite } from "@/lib/site/store";

// El contenido se administra desde /admin; revalidamos para reflejar cambios.
export const revalidate = 60;

export default async function Home() {
  const [cursos, mainPlans, otrasPlanes, site] = await Promise.all([
    getPublishedCourses(),
    getMainPlans(),
    getOtrasPlanes(),
    getSite(),
  ]);

  return (
    <main className="overflow-clip">
      <Nav
        links={site.homeNav.links}
        cta={{ label: site.homeNav.cta, href: site.homeNav.ctaHref }}
      />
      <Hero c={site.homeHero} />
      <Manifiesto c={site.homeQueEs} />
      <Programas plans={mainPlans} c={site.homeProgramas} />
      <Cursos cursos={cursos} c={site.homeCursos} />
      <Metodo c={site.homeMetodo} />
      <OtrasPlanificaciones especiales={otrasPlanes} c={site.homeOtras} />
      <Valores c={site.homeValores} />
      <CtaFinal c={site.homeCta} />
      <Footer />
    </main>
  );
}
