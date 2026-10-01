"use client";
import * as React from "react";
import type { SiteContent } from "@/lib/site/defaults";

export function Hero({ c }: { c: SiteContent["homeHero"] }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={c.poster || undefined}
          key={c.video}
          className="h-full w-full object-cover object-[60%_28%]"
        >
          <source src={c.video} />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-transparent to-transparent" />
      </div>

      {/* Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-site flex-1 flex-col px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        {/* Isologo + big wordmark framed by lines, top and bottom — pushed down */}
        <div className="mt-auto flex flex-col gap-5">
          <div
            className="h-px w-full bg-white/15 transition-all duration-700 ease-brand"
            style={{ opacity: show ? 1 : 0, transitionDelay: "300ms" }}
          />

          {/* Big full-width wordmark — at 30% */}
          <h1 className="display -mx-5 select-none text-center leading-[0.8] text-paper opacity-30 sm:-mx-8">
            <span className="block overflow-hidden">
              <span
                className="block text-[clamp(2.5rem,21vw,24rem)] transition-transform duration-[1100ms] ease-brand"
                style={{ transform: show ? "translateY(0)" : "translateY(12%)" }}
              >
                {c.titulo}
              </span>
            </span>
          </h1>

          <div
            className="h-px w-full bg-white/15 transition-all duration-700 ease-brand"
            style={{ opacity: show ? 1 : 0, transitionDelay: "420ms" }}
          />
        </div>

        {/* Bottom — tagline + CTAs (sticky on mobile) */}
        <div
          className="mt-10 flex flex-col gap-6 transition-all duration-1000 ease-brand max-sm:sticky max-sm:bottom-4 sm:flex-row sm:items-end sm:justify-between"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "560ms",
          }}
        >
          <div className="max-w-md text-[0.9rem] leading-relaxed text-paper/85">
            {c.texto
              .split(/\r?\n/)
              .filter((l) => l.trim())
              .map((l, i) => (
                <p key={i}>{l}</p>
              ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#programaciones"
              className="label rounded-full bg-blue px-7 py-3.5 text-[0.66rem] text-ink transition-all hover:bg-blue/90"
            >
              {c.boton1}
            </a>
            <a
              href="#cursos"
              className="label rounded-full bg-white/10 px-7 py-3.5 text-[0.66rem] text-paper ring-1 ring-white/20 backdrop-blur-md transition-all hover:bg-white/20"
            >
              {c.boton2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
