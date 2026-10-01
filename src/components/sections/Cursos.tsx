"use client";
import * as React from "react";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import type { CourseData } from "@/lib/types";
import type { SiteContent } from "@/lib/site/defaults";

type Card = {
  n: string;
  t: string;
  d: string;
  img: string;
  lecciones: string;
  precio: string;
  href: string;
};

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

export function Cursos({
  cursos: data,
  c: textos,
}: {
  cursos: CourseData[];
  c: SiteContent["homeCursos"];
}) {
  const cursos: Card[] = data.map((c, i) => ({
    n: String(i + 1).padStart(2, "0"),
    t: c.title,
    d: c.cardDesc,
    img: c.image,
    lecciones: c.lecciones,
    precio: c.price,
    href: `/cursos/${c.slug}`,
  }));

  const trackRef = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.34, behavior: "smooth" });
  };

  return (
    <section
      id="cursos"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-paper-pure sm:py-32"
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-paper-pure/80">
                {textos.etiqueta}
              </span>
            </Reveal>
            <h2 className="heading mt-6 text-[clamp(1.9rem,4.4vw,3.6rem)] text-paper-pure">
              <MaskReveal>{textos.titulo1}</MaskReveal>
              <MaskReveal delay={120}>{textos.titulo2}</MaskReveal>
            </h2>
          </div>
          <div className="flex w-full items-end justify-end gap-6 lg:w-auto lg:items-center">
            {/* Arrows */}
            <div className="flex flex-none gap-2">
              <button
                aria-label="Anterior"
                onClick={() => scroll(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-white/25 text-paper transition-colors hover:bg-white/10"
              >
                <Arrow dir="left" />
              </button>
              <button
                aria-label="Siguiente"
                onClick={() => scroll(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-white/25 text-paper transition-colors hover:bg-white/10"
              >
                <Arrow dir="right" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cursos.map((c) => (
            <a
              key={c.n}
              href={(c as { href?: string }).href ?? "#sumate"}
              className="group flex w-[80%] flex-none snap-start flex-col overflow-hidden rounded-[18px] bg-surface ring-1 ring-white/0 transition-all duration-500 ease-brand hover:ring-white/20 sm:w-[44%] lg:w-[30%]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={c.img}
                  alt={c.t}
                  className="h-full w-full object-cover grayscale-[0.1] transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
                />
                <span className="label absolute left-4 top-4 text-paper/90">
                  {c.n}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h4 className="heading min-h-[4rem] text-2xl text-paper">
                  {c.t}
                </h4>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-paper/55">
                  {c.d}
                </p>
                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between gap-3">
                    <span className="label text-paper/45">{c.lecciones}</span>
                    <span className="font-mono text-xl font-medium text-blue">
                      {c.precio}
                    </span>
                  </div>
                  <span className="label mt-5 flex items-center justify-center gap-2 rounded-full bg-blue px-5 py-3 text-[0.6rem] text-ink transition-all group-hover:bg-blue/90">
                    {textos.boton}
                    <span className="transition-transform duration-300 ease-brand group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
