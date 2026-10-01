"use client";
import * as React from "react";
import type { SiteContent } from "@/lib/site/defaults";
import { contactoHref, preinscripcionHref, externo, type Ajustes } from "@/lib/box";
import { Lineas } from "@/components/ui/Lineas";
import { FitLine } from "@/components/ui/FitLine";

/**
 * Primer fold según el Figma (nodo 65:28): díptico de fotos a media pantalla
 * cada una con su velo, chips, el nombre completo en una sola línea a todo
 * el ancho, bajada en mono y dos botones. Sin reglas ni vidrio.
 */
export function BoxHero({
  c,
  box,
  ajustes,
}: {
  c: SiteContent["boxHero"];
  box: SiteContent["box"];
  ajustes: Ajustes;
}) {
  const pre = preinscripcionHref(ajustes, box.nombre);
  const contacto = contactoHref(ajustes, c.mensajeWhatsapp);
  // En móvil el nombre va en dos líneas: el nombre corto y el resto.
  const lineasMovil = box.nombre.startsWith(box.nombreCorto + " ")
    ? [box.nombreCorto, box.nombre.slice(box.nombreCorto.length + 1)]
    : [box.nombre];
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
      {/* Díptico con una sola veladura #001014 al 60% por encima de las dos
          fotos (sustituye a los velos negros por foto del Figma). En móvil
          queda sólo la primera foto (la mancuerna). */}
      <div className="absolute inset-0 flex">
        <div className="relative w-full sm:w-1/2">
          <img
            src={c.imagenIzquierda}
            alt=""
            className="h-full w-full object-cover object-[45%_0%] sm:object-top"
          />
        </div>
        <div className="relative hidden w-1/2 sm:block">
          <img
            src={c.imagenDerecha}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-[#001014]/60" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-site flex-col items-center px-5 pb-16 pt-36 text-center sm:px-8 sm:pb-20 sm:pt-40">
        <div
          className="flex flex-wrap items-center justify-center gap-2.5 transition-all duration-700 ease-brand"
          style={anim(160)}
        >
          <span className="label inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-2 text-paper-pure ring-1 ring-white/[0.06] whitespace-nowrap backdrop-blur-2xl sm:w-[15.5rem]">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-blue" />
            </span>
            {c.chip}
          </span>
          <span className="label inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2 text-paper-pure ring-1 ring-white/[0.14] whitespace-nowrap backdrop-blur-2xl sm:w-[15.5rem]">
            {box.barrio}, {box.ciudad}
          </span>
        </div>

        {/* El nombre completo es el título, en una línea que llena el ancho
            del contenedor (medida en el DOM). */}
        <h1 className="display mt-8 w-full select-none leading-[0.9] text-paper-pure sm:mt-10">
          {/* En móvil una sola línea quedaría a 27px: se parte en dos. */}
          <span className="flex flex-col gap-[0.04em] leading-[0.84] sm:hidden">
            {lineasMovil.map((l, i) => (
              <FitLine
                key={i}
                className="transition-transform duration-[1100ms] ease-brand"
                style={{
                  transform: show ? "translateY(0)" : "translateY(14%)",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {l}
              </FitLine>
            ))}
          </span>
          <span className="hidden sm:block">
            <FitLine
              className="transition-transform duration-[1100ms] ease-brand"
              style={{ transform: show ? "translateY(0)" : "translateY(14%)" }}
            >
              {box.nombre}
            </FitLine>
          </span>
        </h1>

        <p
          className="label mt-6 max-w-[34rem] !tracking-[0.1em] leading-[1.65] text-paper-pure transition-all duration-1000 ease-brand sm:mt-7"
          style={anim(480)}
        >
          <Lineas texto={c.bajada} />
        </p>

        <div
          className="mt-9 flex w-full flex-wrap items-center justify-center gap-3 transition-all duration-1000 ease-brand sm:mt-11 sm:gap-8"
          style={anim(600)}
        >
          <a
            href={pre}
            {...externo(pre)}
            className="label w-full rounded-full bg-blue px-8 py-4 text-center !text-[12px] text-ink transition-all hover:bg-blue/90 sm:w-[10.5rem]"
          >
            {c.boton1}
          </a>
          <a
            href={contacto}
            {...externo(contacto)}
            /* En el Figma el texto va en negro, pero sobre la foto oscurecida no se
               lee: va en blanco como el resto de los secundarios del sitio. */
            className="label w-full rounded-full bg-white/10 px-8 py-4 text-center !text-[12px] text-paper-pure ring-1 ring-white/[0.14] backdrop-blur-2xl transition-all hover:bg-white/20 sm:w-[10.5rem]"
          >
            {c.boton2}
          </a>
        </div>
      </div>
    </section>
  );
}
