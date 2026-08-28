"use client";
import * as React from "react";
import { MaskReveal } from "@/components/ui/Reveal";

type Word = { w: string; img: string };

const lines: { words: Word[]; tag?: string }[] = [
  {
    words: [
      { w: "Coraje", img: "bar-muscleup" },
      { w: "Honor", img: "handstand" },
    ],
    tag: "01 — 05",
  },
  {
    words: [{ w: "Lealtad", img: "rope-top" }],
    tag: "Bushidō",
  },
  {
    words: [
      { w: "Sinceridad", img: "rope-bw" },
      { w: "Respeto", img: "dips" },
    ],
    tag: "Código samurái",
  },
];

const all = lines.flatMap((l) => l.words);

export function Valores() {
  const [hover, setHover] = React.useState<number | null>(null);
  let gi = 0;

  return (
    <section
      id="valores"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-32"
    >
      {/* Hover image layer */}
      <div className="pointer-events-none absolute inset-0">
        {all.map((it, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: hover === i ? 1 : 0 }}
          >
            <img
              src={`/img/${it.img}.jpg`}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/75" />
          </div>
        ))}
      </div>

      {/* Labels */}
      <span className="label absolute left-5 top-10 z-10 text-paper/40 sm:left-8">
        Valores
      </span>
      <span className="label absolute right-5 top-10 z-10 hidden text-paper/40 sm:right-8 sm:block">
        Código samurái
      </span>

      {/* Composition */}
      <div className="relative z-10 mx-auto max-w-site px-5 sm:px-8">
        <div className="display flex flex-col items-center text-center text-paper">
          {lines.map((line, li) => (
            <MaskReveal key={li} delay={li * 90}>
              <span className="flex flex-wrap items-end justify-center gap-x-5 sm:gap-x-8">
                {line.words.map((it) => {
                  const i = gi++;
                  return (
                    <span
                      key={it.w}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      className="cursor-default text-[clamp(2rem,9.5vw,8rem)] leading-[0.86] text-paper transition-opacity duration-300 hover:opacity-100"
                    >
                      {it.w}
                    </span>
                  );
                })}
              </span>
            </MaskReveal>
          ))}
        </div>

        <MaskReveal delay={lines.length * 90 + 60}>
          <p className="mx-auto mt-14 max-w-2xl text-center font-sans text-[0.95rem] font-normal leading-relaxed tracking-normal text-paper/60">
            El código samurái que llevamos a cada sesión: coraje para empezar,
            honor en el esfuerzo, lealtad con tu equipo, sinceridad con vos mismo
            y respeto por el proceso. Así entrenamos, enseñamos y competimos.
          </p>
        </MaskReveal>
      </div>
    </section>
  );
}
