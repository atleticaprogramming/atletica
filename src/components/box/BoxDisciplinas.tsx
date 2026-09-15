"use client";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import { disciplinas } from "@/lib/box";

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

export function BoxDisciplinas() {
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
                Qué se entrena
              </span>
            </Reveal>
            <h2 className="heading mt-5 text-[clamp(1.55rem,2.9vw,2.4rem)] text-paper-pure">
              <MaskReveal>Tres disciplinas,</MaskReveal>
              <MaskReveal delay={120}>
                <span className="text-white/80">cualquier punto de partida</span>
              </MaskReveal>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-14">
          {disciplinas.map((d, i) => (
            <Reveal key={d.n} delay={i * 120} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-surface ring-1 ring-white/0 transition-all duration-500 ease-brand hover:ring-white/20">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.nombre}
                    style={{ objectPosition: d.pos }}
                    /* Las tres fotos vienen de sitios distintos (interior,
                       exterior, blanco y negro): el desaturado las hace
                       familia y deja el color para los acentos. */
                    className="h-full w-full object-cover grayscale-[0.45] brightness-[0.88] transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  {/* El número necesita piso propio: alguna foto tiene la
                      esquina clara y se perdía. */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/65 to-transparent" />
                  <span className="label absolute left-7 top-6 text-paper-pure/90">
                    {d.n}
                  </span>
                  {/* Mismo eje que el texto de abajo (p-7) */}
                  <div className="absolute inset-x-7 bottom-6">
                    <h3 className="heading text-[1.6rem] leading-tight text-paper-pure">
                      {d.nombre}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[0.92rem] leading-relaxed text-paper/70">
                    {d.desc}
                  </p>
                  <ul className="mt-auto flex flex-col gap-2.5 pt-6">
                    {d.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-[3px] flex h-4 w-4 flex-none items-center justify-center text-blue">
                          <Check />
                        </span>
                        <span className="text-[0.86rem] leading-snug text-paper/80">
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
      </div>
    </section>
  );
}
