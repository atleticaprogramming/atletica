"use client";
import { Reveal } from "@/components/ui/Reveal";
import { FillText } from "@/components/ui/FillText";

const strip = [
  "db-snatch",
  "bar-muscleup",
  "sandbag",
  "rope-arena",
  "run-field",
  "handstand",
  "dips",
  "rope-top",
];

export function Manifiesto() {
  return (
    <section id="que-es" className="relative scroll-mt-24 bg-paper text-ink">
      {/* Photo marquee */}
      <div className="overflow-hidden border-b border-ink/10 py-8 sm:py-10">
        <div className="flex w-max animate-marquee gap-5 sm:gap-6">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex flex-none gap-5 sm:gap-6">
              {strip.map((s, i) => (
                <div
                  key={`${dup}-${i}`}
                  className="relative h-[24rem] w-[17rem] flex-none overflow-hidden rounded-[10px] bg-ink/5 sm:h-[34rem] sm:w-[25rem]"
                >
                  <img
                    src={`/img/${s}.jpg`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Statement */}
      <div className="mx-auto max-w-site px-5 py-24 sm:px-8 sm:py-36">
        <Reveal>
          <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            Qué es Atlética
          </span>
        </Reveal>

        <div className="mt-8 max-w-5xl">
          <FillText
            text="Atlética no es una app de rutinas más. Es un método de programación, una escuela de cursos y una comunidad que nació compitiendo. Diseñamos cada bloque para que entrenes con intención: que sepas qué hacés, por qué lo hacés y hacia dónde vas."
            className="text-ink text-[clamp(1.7rem,4.2vw,3.1rem)] font-medium leading-[1.12] tracking-tightest"
          />
        </div>

        {/* Three-pillar row */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {[
            {
              n: "01",
              t: "Programación real",
              d: "Bloques periodizados por coaches que compiten. Cada sesión tiene un objetivo medible.",
            },
            {
              n: "02",
              t: "Formación profesional",
              d: "Cursos para coaches y atletas que quieren entender el porqué detrás de cada movimiento.",
            },
            {
              n: "03",
              t: "Comunidad por WhatsApp",
              d: "Sumate al grupo de WhatsApp y entrená junto a otras personas que siguen tu misma planificación: compartí PRs, dudas y motivación.",
            },
          ].map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 100}
              className="bg-paper p-8 sm:p-10"
            >
              <div className="label text-ink/45">{p.n}</div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tightest text-ink">
                {p.t}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
                {p.d}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
