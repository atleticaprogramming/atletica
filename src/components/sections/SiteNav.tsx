import { Nav } from "@/components/sections/Nav";
import { getSite } from "@/lib/site/store";

/** El menú de la home, con los textos que se editan en /admin. Para las
 *  páginas que no son la home (cursos, legales). */
export async function SiteNav({ solid = false }: { solid?: boolean }) {
  const { homeNav } = await getSite();
  return (
    <Nav
      solid={solid}
      links={homeNav.links}
      cta={{ label: homeNav.cta, href: homeNav.ctaHref }}
    />
  );
}
