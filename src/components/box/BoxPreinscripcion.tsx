"use client";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/lib/site/defaults";
import type { Ajustes } from "@/lib/box";
import { BoxAcciones } from "@/components/box/BoxAcciones";

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 18 13" fill="none" aria-hidden>
    <path
      d="M17 1L6 12L1 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function CardIncluye({ c }: { c: SiteContent["boxPreinscripcion"] }) {
  return (
    <div className="flex h-full flex-col rounded-[18px] bg-teal p-8 text-paper-pure sm:p-10">
      <span className="label text-paper-pure/75">{c.tituloTarjeta}</span>

      <ul className="mt-7 flex flex-col gap-4">
        {c.incluye.map((b, i) => (
          <li key={i} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center text-paper-pure">
              <Check />
            </span>
            <span className="text-[1.02rem] leading-snug text-paper-pure/95">
              {b}
            </span>
          </li>
        ))}
      </ul>

      <p className="heading mt-8 border-t border-white/20 pt-7 text-[1.15rem] text-paper-pure">
        {c.cupos}
      </p>

      <p className="mt-auto pt-8 text-xs leading-relaxed text-paper-pure/70">
        {c.letraChica}
      </p>
    </div>
  );
}

export function BoxPreinscripcion({
  c,
  ajustes,
}: {
  c: SiteContent["boxPreinscripcion"];
  ajustes: Ajustes;
}) {
  return (
    <section
      id="preinscripcion"
      className="relative scroll-mt-32 bg-paper py-14 text-ink sm:py-20"
    >
      <div className="mx-auto max-w-site px-5 sm:px-8">
        {/* En móvil el orden es texto → tarjeta → botones; en desktop la
            tarjeta ocupa la columna derecha entera. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-start-1 lg:row-start-1">
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                {c.etiqueta}
              </span>
            </Reveal>
            <h2 className="heading mt-5 text-[clamp(1.55rem,2.9vw,2.4rem)] text-ink">
              <MaskReveal>{c.titulo1}</MaskReveal>
              <MaskReveal delay={120}>
                <span className="text-ink/70">{c.titulo2}</span>
              </MaskReveal>
            </h2>
            <Reveal delay={220}>
              <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ink/65 sm:text-[1.08rem]">
                {c.texto}
              </p>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <CardIncluye c={c} />
          </Reveal>

          <Reveal delay={300} className="lg:col-start-1 lg:row-start-2 lg:self-start lg:pt-8">
            <BoxAcciones
              tone="light"
              ajustes={ajustes}
              boton1={c.boton1}
              boton2={c.boton2}
              mensaje={c.mensajeWhatsapp}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
