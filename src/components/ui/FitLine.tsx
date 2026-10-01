"use client";
import * as React from "react";

/**
 * Una línea de texto escalada para ocupar exactamente el ancho de su
 * contenedor (lockups tipográficos). Mide, escala y vuelve a medir cuando
 * cambia el ancho o cuando termina de cargar la fuente. Queda invisible
 * hasta la primera medida para que no se vea el salto.
 */
export function FitLine({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const outer = React.useRef<HTMLSpanElement | null>(null);
  const inner = React.useRef<HTMLSpanElement | null>(null);
  const [size, setSize] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const fit = () => {
      const w = i.getBoundingClientRect().width;
      const current = parseFloat(getComputedStyle(i).fontSize);
      if (w <= 0 || o.clientWidth <= 0) return;
      const next = (current * o.clientWidth) / w;
      setSize((prev) => (prev !== null && Math.abs(prev - next) < 0.5 ? prev : next));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={outer} className="block w-full overflow-hidden">
      <span
        ref={inner}
        className={`inline-block whitespace-nowrap align-top ${className}`}
        style={{
          fontSize: size ?? 100,
          visibility: size === null ? "hidden" : undefined,
          ...style,
        }}
      >
        {children}
      </span>
    </span>
  );
}
