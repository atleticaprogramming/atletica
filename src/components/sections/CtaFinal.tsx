"use client";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";

export function CtaFinal() {
  return (
    <section id="sumate" className="relative flex min-h-[80svh] scroll-mt-24 items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/img/wallball.jpg"
          alt="Atleta de Atlética haciendo wall balls — when you're done"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-site px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="label inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-paper-pure/80">
              Empezá hoy
            </span>
          </Reveal>
          <h2 className="heading mt-6 text-paper-pure text-[clamp(2.1rem,5vw,4.4rem)]">
            <MaskReveal>Dejá de improvisar</MaskReveal>
          </h2>
          <Reveal delay={220}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper-pure/80">
              Sumate a la programación que entrena con método y a una comunidad
              que no afloja.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#programaciones"
                className="label rounded-full bg-blue px-8 py-4 text-[0.66rem] text-ink transition-all hover:bg-blue/90"
              >
                Empezá ahora
              </a>
              <a
                href="#cursos"
                className="label rounded-full bg-white/10 px-8 py-4 text-[0.66rem] text-paper-pure ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-white/20"
              >
                Ver cursos
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
