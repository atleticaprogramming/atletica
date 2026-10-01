"use client";
import { Reveal } from "@/components/ui/Reveal";
import { FillText } from "@/components/ui/FillText";
import type { SiteContent } from "@/lib/site/defaults";

export function Manifiesto({ c }: { c: SiteContent["homeQueEs"] }) {
  const strip = c.fotos.filter(Boolean);
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
                    src={s}
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
            {c.etiqueta}
          </span>
        </Reveal>

        <div className="mt-8 max-w-5xl">
          <FillText
            text={c.texto}
            className="text-ink text-[clamp(1.7rem,4.2vw,3.1rem)] font-medium leading-[1.12] tracking-tightest"
          />
        </div>

        {/* Three-pillar row */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {c.pilares.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="bg-paper p-8 sm:p-10"
            >
              <div className="label text-ink/45">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tightest text-ink">
                {p.titulo}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
                {p.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
