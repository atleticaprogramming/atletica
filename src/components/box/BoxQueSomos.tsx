"use client";
import { Reveal } from "@/components/ui/Reveal";
import { FillText } from "@/components/ui/FillText";
import type { SiteContent } from "@/lib/site/defaults";

export function BoxQueSomos({ c }: { c: SiteContent["boxQueSomos"] }) {
  return (
    <section
      id="que-somos"
      className="relative scroll-mt-32 bg-paper py-14 text-ink sm:py-20"
    >
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <Reveal>
          <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            {c.etiqueta}
          </span>
        </Reveal>

        <div className="mt-8 max-w-4xl">
          <FillText
            text={c.titulo}
            className="text-balance text-ink text-[clamp(1.55rem,3.6vw,2.7rem)] font-medium leading-[1.12] tracking-tightest"
          />
        </div>

        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-[1rem] leading-relaxed text-ink/65 sm:text-[1.08rem]">
            {c.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:mt-14">
          {c.pilares.map((p, i) => (
            <Reveal key={i} delay={i * 100} className="bg-paper p-7 sm:p-8">
              <div className="label text-ink/60">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 text-xl font-semibold tracking-tightest text-ink sm:text-2xl">
                {p.titulo}
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/65">
                {p.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
