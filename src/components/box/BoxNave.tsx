"use client";
import { Reveal } from "@/components/ui/Reveal";
import { FillText } from "@/components/ui/FillText";
import { pilares } from "@/lib/box";

export function BoxNave() {
  return (
    <section
      id="nave"
      className="relative scroll-mt-32 bg-paper py-14 text-ink sm:py-20"
    >
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <Reveal>
          <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            Qué estamos abriendo
          </span>
        </Reveal>

        <div className="mt-8 max-w-4xl">
          <FillText
            text="Abrimos un lugar grande para entrenar como estés hoy: si nunca pisaste un box, si volvés de una lesión o si querés competir. Entrenás con lo tuyo, en la misma clase que el resto."
            className="text-ink text-[clamp(1.35rem,3.2vw,2.3rem)] font-medium leading-[1.18] tracking-tightest"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:mt-14">
          {pilares.map((p, i) => (
            <Reveal key={p.n} delay={i * 100} className="bg-paper p-7 sm:p-8">
              <div className="label text-ink/60">{p.n}</div>
              <h3 className="mt-4 text-xl font-semibold tracking-tightest text-ink sm:text-2xl">
                {p.t}
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/65">
                {p.d}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
