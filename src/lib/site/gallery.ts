import "server-only";
import { siteDefaults } from "@/lib/site/defaults";
import { getSite } from "@/lib/site/store";
import { getAllCourses } from "@/lib/content";

const IMG = /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;

function collect(v: unknown, out: Set<string>) {
  if (typeof v === "string") {
    if (IMG.test(v)) out.add(v);
  } else if (Array.isArray(v)) {
    v.forEach((x) => collect(x, out));
  } else if (v && typeof v === "object") {
    Object.values(v).forEach((x) => collect(x, out));
  }
}

/** Todas las imágenes que la web usa o usó (las subidas primero), para
 *  «Elegir de la web» en el panel. */
export async function getGallery(): Promise<string[]> {
  const [site, courses] = await Promise.all([getSite(), getAllCourses()]);
  const out = new Set<string>();
  collect(site, out);
  collect(courses.map((c) => c.image), out);
  collect(siteDefaults, out);
  const all = Array.from(out);
  const subidas = all.filter((s) => !s.startsWith("/img/"));
  return [...subidas, ...all.filter((s) => s.startsWith("/img/"))];
}
