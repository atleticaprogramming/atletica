"use client";
import * as React from "react";
import type { Module } from "@/lib/types";

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/40";
const btnCls =
  "rounded-lg border border-ink/15 px-3 py-2 text-xs font-medium text-ink/70 transition-colors hover:bg-ink/5";

/** Lista editable de strings (un ítem por fila). Serializa a JSON en un input oculto. */
export function StringListField({
  name,
  label,
  hint,
  initial,
  multiline = false,
}: {
  name: string;
  label: string;
  hint?: string;
  initial: string[];
  multiline?: boolean;
}) {
  const [items, setItems] = React.useState<string[]>(
    initial.length ? initial : [""]
  );

  const set = (i: number, v: string) =>
    setItems((arr) => arr.map((x, j) => (j === i ? v : x)));
  const add = () => setItems((arr) => [...arr, ""]);
  const remove = (i: number) =>
    setItems((arr) => (arr.length > 1 ? arr.filter((_, j) => j !== i) : [""]));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-ink">{label}</label>
        {hint && <span className="text-xs text-ink/45">{hint}</span>}
      </div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {items.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          {multiline ? (
            <textarea
              value={v}
              onChange={(e) => set(i, e.target.value)}
              rows={2}
              className={inputCls}
            />
          ) : (
            <input
              value={v}
              onChange={(e) => set(i, e.target.value)}
              className={inputCls}
            />
          )}
          <button
            type="button"
            onClick={() => remove(i)}
            className={btnCls}
            aria-label="Eliminar"
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className={`${btnCls} w-fit`}>
        + Agregar
      </button>
    </div>
  );
}

/** Lista editable de módulos (título · etiqueta · descripción). */
export function ModulesField({
  name,
  initial,
}: {
  name: string;
  initial: Module[];
}) {
  const [items, setItems] = React.useState<Omit<Module, "n">[]>(
    initial.length ? initial.map(({ t, l, d }) => ({ t, l, d })) : [{ t: "", l: "", d: "" }]
  );

  const set = (i: number, k: "t" | "l" | "d", v: string) =>
    setItems((arr) => arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const add = () => setItems((arr) => [...arr, { t: "", l: "", d: "" }]);
  const remove = (i: number) =>
    setItems((arr) =>
      arr.length > 1 ? arr.filter((_, j) => j !== i) : [{ t: "", l: "", d: "" }]
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-ink">Módulos / contenido</label>
        <span className="text-xs text-ink/45">se numeran solos</span>
      </div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {items.map((m, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-lg border border-ink/10 bg-ink/[0.02] p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink/45">
              {String(i + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className={btnCls}
              aria-label="Eliminar módulo"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr]">
            <input
              value={m.t}
              onChange={(e) => set(i, "t", e.target.value)}
              placeholder="Título del módulo"
              className={inputCls}
            />
            <input
              value={m.l}
              onChange={(e) => set(i, "l", e.target.value)}
              placeholder="ej: 3 lecciones"
              className={inputCls}
            />
          </div>
          <textarea
            value={m.d}
            onChange={(e) => set(i, "d", e.target.value)}
            placeholder="Descripción del módulo"
            rows={2}
            className={inputCls}
          />
        </div>
      ))}
      <button type="button" onClick={add} className={`${btnCls} w-fit`}>
        + Agregar módulo
      </button>
    </div>
  );
}
