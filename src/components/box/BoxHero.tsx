"use client";
import * as React from "react";
import { box } from "@/lib/box";
import { BoxAcciones } from "@/components/box/BoxAcciones";

export function BoxHero() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: number) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(18px)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Fondo — la nave */}
      <div className="absolute inset-0">
        <img
          src="/img/nave.jpg"
          alt="Interior de la nave: racks, discos y plataformas bajo los lucernarios"
          /* En móvil el recorte cae sobre los racks y los anillos (sin texto);
             en desktop entra la nave completa, con el mural arriba. */
          className="h-full w-full origin-bottom scale-[1.08] object-cover object-[8%_50%] sm:object-[50%_48%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/70" />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Título + acciones, centrados */}
      <div className="relative z-10 mx-auto flex w-full max-w-site flex-col items-center px-5 pb-16 pt-36 text-center sm:px-8 sm:pb-20 sm:pt-40">
        <div
            className="mb-4 flex flex-wrap items-center justify-center gap-2.5 transition-all duration-700 ease-brand sm:mb-5"
            style={anim(160)}
          >
          <span className="label inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-paper-pure/85">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
            </span>
            Preinscripción abierta
          </span>
          <span className="label inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-paper/85 ring-1 ring-white/15 backdrop-blur-md">
            {box.barrio}, {box.ciudad}
          </span>
          {box.apertura && (
            <span className="label inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-paper/85 ring-1 ring-white/15 backdrop-blur-md">
              Apertura {box.apertura}
            </span>
          )}
        </div>

        <div className="flex w-full flex-col gap-4">
          <div
            className="h-px w-full bg-white/20 transition-all duration-700 ease-brand"
            style={{ opacity: show ? 1 : 0, transitionDelay: "300ms" }}
          />
          <h1 className="display -mx-5 select-none leading-[0.82] text-paper-pure sm:-mx-8">
            <span className="block overflow-hidden">
              <span
                className="block whitespace-nowrap text-[clamp(1.9rem,13vw,16rem)] transition-transform duration-[1100ms] ease-brand sm:text-[clamp(2rem,14.3vw,16rem)]"
                style={{ transform: show ? "translateY(0)" : "translateY(14%)" }}
              >
                Atlética BOX
              </span>
            </span>
          </h1>
          <div
            className="h-px w-full bg-white/20 transition-all duration-700 ease-brand"
            style={{ opacity: show ? 1 : 0, transitionDelay: "420ms" }}
          />
        </div>

        <div
          className="mt-10 transition-all duration-1000 ease-brand sm:mt-12"
          style={anim(560)}
        >
          <BoxAcciones className="justify-center" />
        </div>
      </div>
    </section>
  );
}
