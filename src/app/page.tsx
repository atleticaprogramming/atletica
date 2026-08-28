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

// El contenido se administra desde /admin; revalidamos para reflejar cambios.
export const revalidate = 60;

export default async function Home() {
  const [cursos, mainPlans, otrasPlanes] = await Promise.all([
    getPublishedCourses(),
    getMainPlans(),
    getOtrasPlanes(),
  ]);

  return (
    <main className="overflow-clip">
      <Nav />
      <Hero />
      <Manifiesto />
      <Programas plans={mainPlans} />
      <Cursos cursos={cursos} />
      <Metodo />
      <OtrasPlanificaciones especiales={otrasPlanes} />
      <Valores />
      <CtaFinal />
      <Footer />
    </main>
  );
}
