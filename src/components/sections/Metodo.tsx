"use client";
import * as React from "react";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/lib/site/defaults";

export function Metodo({ c }: { c: SiteContent["homeMetodo"] }) {
  const tabs = c.etapas.map((e) => ({ label: e.titulo, body: e.texto, img: e.imagen }));
  const [active, setActive] = React.useState(0);

  return (
    <section id="metodo" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div className="flex flex-col">
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-paper/70">
                {c.etiqueta}
              </span>
            </Reveal>
            <h2 className="heading mt-7 text-paper text-[clamp(1.8rem,4vw,3.1rem)]">
              <MaskReveal>{c.titulo1}</MaskReveal>
              <MaskReveal delay={120}>
                <span className="text-white/80">{c.titulo2}</span>
              </MaskReveal>
            </h2>

            <div className="mt-10 flex flex-col gap-2">
              {tabs.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`group rounded-[12px] border p-5 text-left transition-all duration-500 ease-brand ${
                    active === i
                      ? "border-white/15 bg-white/[0.06]"
                      : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`label transition-colors ${
                        active === i ? "text-blue" : "text-paper/40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl font-semibold tracking-tightest text-paper sm:text-2xl">
                      {t.label}
                    </span>
                  </div>
                  <div
                    className="grid transition-all duration-500 ease-brand"
                    style={{
                      gridTemplateRows: active === i ? "1fr" : "0fr",
                      opacity: active === i ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pl-[3.4rem] pt-3 text-[0.95rem] leading-relaxed text-paper/65">
                        {t.body}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative min-h-[420px] overflow-hidden rounded-[16px] lg:min-h-full">
            {tabs.map((t, i) => (
              <img
                key={i}
                src={t.img}
                alt={t.label}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-brand"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "scale(1)" : "scale(1.06)",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
