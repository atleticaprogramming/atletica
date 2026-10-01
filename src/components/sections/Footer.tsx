import { LogoMark } from "@/components/ui/Logo";
import { getPlanLinks, getPublishedCourses } from "@/lib/content";
import { getSite } from "@/lib/site/store";

export async function Footer() {
  const [planLinks, cursos, site] = await Promise.all([
    getPlanLinks(),
    getPublishedCourses(),
    getSite(),
  ]);
  const { footer: c, ajustes } = site;
  const socials = [
    { label: "Instagram", href: ajustes.instagram },
    { label: "YouTube", href: ajustes.youtube },
  ].filter((s) => s.href.trim());

  return (
    <footer id="footer" className="bg-ink-deep pt-20 text-paper">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand — logotipo */}
          <div>
            <div className="flex items-center gap-3 text-paper">
              <LogoMark className="h-11 w-11" fill="#FFFFFF" />
              <span className="display pt-1 text-3xl leading-none">Atlética</span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/60">
              {c.texto}
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label rounded-full bg-white/10 px-4 py-2 text-[0.58rem] text-paper/80 transition-colors hover:bg-white/20"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href={`mailto:${ajustes.email}`}
              className="label mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-[0.6rem] text-ink transition-all hover:bg-blue/90"
            >
              {c.contacto}
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Planificaciones */}
          <div>
            <h4 className="label text-paper/50">{c.tituloPlanes}</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {planLinks.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cursos */}
          <div>
            <h4 className="label text-paper/50">{c.tituloCursos}</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {cursos.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/cursos/${c.slug}`}
                    className="text-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big wordmark */}
        <div className="py-10">
          <div className="display select-none text-center text-[clamp(3rem,19vw,18rem)] leading-[0.8] text-white/5">
            Atlética
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
          <span className="label text-paper/45">
            © {new Date().getFullYear()} {c.copyright}
          </span>
          <div className="flex gap-6">
            <a
              href="/terminos"
              className="label text-paper/45 transition-colors hover:text-paper"
            >
              Términos y condiciones
            </a>
            <a
              href="/privacidad"
              className="label text-paper/45 transition-colors hover:text-paper"
            >
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
