"use client";
import * as React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PlanCard, type Plan } from "@/components/ui/PlanCard";
import type { PlanData } from "@/lib/types";
import type { SiteContent } from "@/lib/site/defaults";

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function OtrasPlanificaciones({
  especiales: data,
  c,
}: {
  especiales: PlanData[];
  c: SiteContent["homeOtras"];
}) {
  const especiales: Plan[] = data.map((p) => ({
    name: p.name,
    url: p.url,
    desc: p.description,
    price: p.price ?? undefined,
    period: p.period ?? undefined,
    features: p.features,
    footer: p.footer ?? undefined,
  }));

  const trackRef = React.useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.34, behavior: "smooth" });
  };

  return (
    <section
      id="otras"
      className="relative scroll-mt-24 bg-paper py-24 text-ink sm:py-32"
    >
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                {c.etiqueta}
              </span>
            </Reveal>
            <h2 className="heading mt-5 text-[clamp(1.8rem,3.6vw,3rem)] text-ink">
              {c.titulo}
            </h2>
          </div>
          <div className="flex flex-none gap-2">
            <button
              aria-label="Anterior"
              onClick={() => scroll(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-ink/20 transition-colors hover:bg-ink/5"
            >
              <Arrow dir="left" />
            </button>
            <button
              aria-label="Siguiente"
              onClick={() => scroll(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-ink/20 transition-colors hover:bg-ink/5"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {especiales.map((p) => (
            <div
              key={p.name}
              className="w-[85%] flex-none snap-start sm:w-[48%] lg:w-[31%]"
            >
              <PlanCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
