"use client";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import { tarifa, pasos } from "@/lib/box";
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

function CardTarifa() {
  return (
    <div className="flex h-full flex-col rounded-[18px] bg-teal p-8 text-paper-pure sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <span className="label text-paper-pure/75">Tarifa fundador</span>
        {tarifa.limite && (
          <span className="label rounded-full bg-white/15 px-3 py-1 text-[0.58rem] text-paper-pure">
            {tarifa.limite}
          </span>
        )}
      </div>

      {tarifa.fundador ? (
        <div className="mt-7">
          <div className="flex items-end gap-3">
            <span className="display text-[3.4rem] leading-none">
              {tarifa.fundador}
            </span>
            <span className="label mb-2 text-paper-pure/75">
              {tarifa.moneda} · {tarifa.periodo}
            </span>
          </div>
          {tarifa.general && (
            <p className="mt-3 text-[0.9rem] text-paper-pure/75">
              Después de la apertura:{" "}
              <span className="line-through">{tarifa.general}</span>
            </p>
          )}
        </div>
      ) : (
        <p className="heading mt-7 text-[1.4rem] leading-snug text-paper-pure">
          El valor se fija ahora y no se mueve
        </p>
      )}

      <ul className="mt-8 flex flex-col gap-3.5 border-t border-white/20 pt-7">
        {tarifa.beneficios.map((b) => (
          <li key={b} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center text-paper-pure">
              <Check />
            </span>
            <span className="text-[0.95rem] leading-snug text-paper-pure/90">
              {b}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-8 text-xs leading-relaxed text-paper-pure/75">
        No vuelve a abrirse después de la apertura.
      </p>
    </div>
  );
}

export function BoxFundador() {
  return (
    <section
      id="preinscripcion"
      className="relative scroll-mt-32 bg-paper py-14 text-ink sm:py-20"
    >
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                Preinscripción
              </span>
            </Reveal>
            <h2 className="heading mt-5 text-[clamp(1.55rem,2.9vw,2.4rem)] text-ink">
              <MaskReveal>Los que llegan primero</MaskReveal>
              <MaskReveal delay={120}>
                <span className="text-ink/70">pagan menos</span>
              </MaskReveal>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <Reveal>
            <CardTarifa />
          </Reveal>

          <Reveal delay={140} className="flex flex-col justify-center">
            {pasos.map((p, i) => (
              <div
                key={p.n}
                className={`flex items-baseline gap-6 py-6 ${
                  i > 0 ? "border-t border-ink/15" : ""
                }`}
              >
                <span className="label flex-none text-teal">{p.n}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tightest text-ink">
                    {p.t}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/65">
                    {p.d}
                  </p>
                </div>
              </div>
            ))}
            <BoxAcciones tone="light" className="mt-7" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
