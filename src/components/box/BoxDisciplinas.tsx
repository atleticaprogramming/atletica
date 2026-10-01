"use client";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/lib/site/defaults";
import { contactoHref, externo, type Ajustes } from "@/lib/box";

const num = (v: string, fallback: number) => {
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
};

const Check = () => (
  <svg width="13" height="13" viewBox="0 0 18 13" fill="none" aria-hidden>
    <path
      d="M17 1L6 12L1 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function BoxDisciplinas({
  c,
  ajustes,
}: {
  c: SiteContent["boxDisciplinas"];
  ajustes: Ajustes;
}) {
  const disciplinas = c.tarjetas.map((t, i) => ({
    n: String(i + 1).padStart(2, "0"),
    nombre: t.nombre,
    desc: t.texto,
    bullets: t.puntos,
    img: t.imagen || null,
    pos: t.encuadre || "50% 50%",
    velo: Math.min(Math.max(num(t.oscurecer, 0), 0), 100) / 100,
    zoom: Math.max(num(t.zoom, 1), 1),
  }));
  const aMedida = c.aMedida;
  const aMedidaHref = contactoHref(ajustes, aMedida.mensajeWhatsapp);
  return (
    <section
      id="disciplinas"
      className="relative scroll-mt-32 overflow-hidden bg-ink py-14 text-paper sm:py-20"
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-paper/80">
                {c.etiqueta}
              </span>
            </Reveal>
            <h2 className="heading mt-5 text-[clamp(1.55rem,2.9vw,2.4rem)] text-paper-pure">
              <MaskReveal>{c.titulo1}</MaskReveal>
              <MaskReveal delay={120}>
                <span className="text-white/80">{c.titulo2}</span>
              </MaskReveal>
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {disciplinas.map((d, i) => (
            <Reveal key={d.n} delay={i * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-surface ring-1 ring-white/0 transition-all duration-500 ease-brand hover:ring-white/20">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {d.img ? (
                    <>
                      {/* El zoom va en un contenedor aparte para no pisar
                          el scale del hover. */}
                      <div
                        className="absolute inset-0"
                        style={{
                          transform: `scale(${d.zoom})`,
                          transformOrigin: d.pos,
                        }}
                      >
                        <img
                          src={d.img}
                          alt={d.nombre}
                          style={{ objectPosition: d.pos }}
                          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
                        />
                      </div>
                      {/* Velo del Figma, distinto en cada foto */}
                      <div
                        className="absolute inset-0"
                        style={{ background: `rgba(0,0,0,${d.velo})` }}
                      />
                    </>
                  ) : (
                    /* Sin foto todavía: panel tonal con el nombre en grande,
                       para que la tarjeta no parezca rota. */
                    <div className="absolute inset-0 bg-gradient-to-br from-teal to-surface">
                      <div className="grain absolute inset-0" />
                      <span className="display absolute -bottom-2 -right-3 select-none text-[7rem] leading-none text-white/[0.07]">
                        {d.n}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  {/* El número necesita piso propio: alguna foto tiene la
                      esquina clara y se perdía. */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/65 to-transparent" />
                  <span className="label absolute left-6 top-5 text-paper-pure/90">
                    {d.n}
                  </span>
                  {/* Mismo eje que el texto de abajo (p-6) */}
                  <div className="absolute inset-x-6 bottom-5">
                    <h3 className="heading text-[1.45rem] leading-tight text-paper-pure">
                      {d.nombre}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.88rem] leading-relaxed text-paper/70">
                    {d.desc}
                  </p>
                  <ul className="mt-auto flex flex-col gap-2 pt-5">
                    {d.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-[3px] flex h-4 w-4 flex-none items-center justify-center text-blue">
                          <Check />
                        </span>
                        <span className="text-[0.82rem] leading-snug text-paper/80">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* La quinta forma no es una clase: es un camino propio. Misma
            tarjeta que las otras, en horizontal, con la foto a la izquierda. */}
        <Reveal delay={120} className="mt-4">
          <article className="group grid overflow-hidden rounded-[18px] bg-surface ring-1 ring-white/0 transition-all duration-500 ease-brand hover:ring-white/20 md:grid-cols-[2fr_3fr]">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[240px]">
              <img
                src={aMedida.imagen}
                alt={aMedida.nombre}
                style={{ objectPosition: "50% 40%" }}
                className="absolute inset-0 h-full w-full object-cover grayscale-[0.45] brightness-[0.88] transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              {/* En horizontal la foto se funde con el panel de texto. */}
              <div className="absolute inset-0 hidden bg-gradient-to-l from-surface via-transparent to-transparent md:block" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/65 to-transparent" />
              <span className="label absolute left-6 top-5 text-paper-pure/90">
                {String(disciplinas.length + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-6 bottom-5">
                <h3 className="heading text-[1.45rem] leading-tight text-paper-pure">
                  {aMedida.nombre}
                </h3>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="max-w-xl text-[0.88rem] leading-relaxed text-paper/70 md:text-[0.95rem]">
                {aMedida.texto}
              </p>
              <a
                href={aMedidaHref}
                {...externo(aMedidaHref)}
                className="label mt-5 inline-flex w-fit items-center gap-2 text-[0.62rem] text-blue transition-colors hover:text-paper-pure"
              >
                {aMedida.enlace}
                <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
