"use client";
import * as React from "react";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import { faqs, box } from "@/lib/box";

export function BoxFaq() {
  const [open, setOpen] = React.useState<number | null>(0);

  const items = faqs.map((f) => {
    if (f.q === "¿Cuándo abre?" && box.apertura) {
      return { ...f, a: `Abrimos ${box.apertura}. ${f.a}` };
    }
    if (f.q === "¿Dónde va a estar?" && box.direccion) {
      return { ...f, a: `En ${box.direccion}, ${box.barrio}, ${box.ciudad}.` };
    }
    return f;
  });

  return (
    <section
      id="preguntas"
      className="relative scroll-mt-32 bg-paper py-14 text-ink sm:py-20"
    >
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
                Preguntas
              </span>
            </Reveal>
            <h2 className="heading mt-5 text-[clamp(1.55rem,2.9vw,2.4rem)] text-ink">
              <MaskReveal>Preguntas</MaskReveal>
              <MaskReveal delay={120}>frecuentes</MaskReveal>
            </h2>
            <Reveal delay={220}>
              <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-ink/65">
                Si te falta algo, escribinos y te contestamos.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col">
            {items.map((f, i) => (
              <div
                key={f.q}
                className={`border-t border-ink/15 ${
                  i === items.length - 1 ? "border-b" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[1.05rem] font-semibold tracking-tightest text-ink sm:text-[1.15rem]">
                    {f.q}
                  </span>
                  <span
                    className={`mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-transform duration-500 ease-brand ${
                      open === i ? "rotate-45 bg-ink text-paper" : ""
                    }`}
                    aria-hidden
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-brand"
                  style={{
                    gridTemplateRows: open === i ? "1fr" : "0fr",
                    opacity: open === i ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pr-10 text-[0.98rem] leading-relaxed text-ink/65">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
