import * as React from "react";

/**
 * Texto con renglones escritos en el admin: cada salto de línea es un corte
 * en pantallas grandes; en el celular el texto corre seguido.
 */
export function Lineas({ texto }: { texto: string }) {
  const lineas = texto.split(/\r?\n/).filter((l) => l.trim());
  return (
    <>
      {lineas.map((l, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br className="hidden sm:block" />}
          {i > 0 && " "}
          {l.trim()}
        </React.Fragment>
      ))}
    </>
  );
}
