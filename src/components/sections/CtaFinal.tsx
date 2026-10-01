"use client";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/lib/site/defaults";

export function CtaFinal({ c }: { c: SiteContent["homeCta"] }) {
  return (
    <section id="sumate" className="relative flex min-h-[80svh] scroll-mt-24 items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={c.imagen}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-site px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="label inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-paper-pure/80">
              {c.etiqueta}
            </span>
          </Reveal>
          <h2 className="heading mt-6 text-paper-pure text-[clamp(2.1rem,5vw,4.4rem)]">
            <MaskReveal>{c.titulo}</MaskReveal>
          </h2>
          <Reveal delay={220}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper-pure/80">
              {c.texto}
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#programaciones"
                className="label rounded-full bg-blue px-8 py-4 text-[0.66rem] text-ink transition-all hover:bg-blue/90"
              >
                {c.boton1}
              </a>
              <a
                href="#cursos"
                className="label rounded-full bg-white/10 px-8 py-4 text-[0.66rem] text-paper-pure ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-white/20"
              >
                {c.boton2}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
