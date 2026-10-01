"use client";
import * as React from "react";
import type { Field } from "@/lib/site/schema";
import { ImageField } from "@/components/admin/ImageField";
import { saveSiteSection, resetSiteSection } from "@/app/admin/site-actions";
import type { UploadMode } from "@/lib/upload-mode";

/* eslint-disable @typescript-eslint/no-explicit-any */

const input =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/40";
const btn =
  "rounded-lg border border-ink/15 px-3 py-2 text-xs font-medium text-ink/70 transition-colors hover:bg-ink/5 disabled:opacity-40";

type Ctx = { blob: UploadMode; gallery: string[] };

/** Un elemento nuevo de una lista: vacío, con la forma de sus campos. */
function vacio(fields: Field[]): Record<string, any> {
  const o: Record<string, any> = {};
  for (const f of fields) {
    if (f.type === "list" || f.type === "strings") o[f.k] = [];
    else if (f.type === "group") o[f.k] = vacio(f.fields);
    else o[f.k] = "";
  }
  return o;
}

function Label({ f }: { f: Field }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <label className="text-sm font-semibold text-ink">{f.label}</label>
      {f.hint && <span className="text-right text-xs text-ink/45">{f.hint}</span>}
    </div>
  );
}

function AutoTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [props.value]);
  return <textarea ref={ref} rows={2} {...props} className={`${input} resize-none`} />;
}

/** Botones para mover y borrar un elemento de una lista. */
function ItemTools({
  i,
  n,
  move,
  remove,
}: {
  i: number;
  n: number;
  move: (from: number, to: number) => void;
  remove: (i: number) => void;
}) {
  return (
    <div className="flex gap-1.5">
      <button type="button" className={btn} disabled={i === 0} onClick={() => move(i, i - 1)} aria-label="Subir">
        ↑
      </button>
      <button type="button" className={btn} disabled={i === n - 1} onClick={() => move(i, i + 1)} aria-label="Bajar">
        ↓
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => {
          if (confirm("¿Borrar este elemento?")) remove(i);
        }}
        aria-label="Borrar"
      >
        ✕
      </button>
    </div>
  );
}

function useList<T>(value: T[], onChange: (v: T[]) => void) {
  return {
    set: (i: number, v: T) => onChange(value.map((x, j) => (j === i ? v : x))),
    add: (v: T) => onChange([...value, v]),
    remove: (i: number) => onChange(value.filter((_, j) => j !== i)),
    move: (from: number, to: number) => {
      const next = [...value];
      const [it] = next.splice(from, 1);
      next.splice(to, 0, it);
      onChange(next);
    },
  };
}

function FieldEditor({
  f,
  value,
  onChange,
  ctx,
}: {
  f: Field;
  value: any;
  onChange: (v: any) => void;
  ctx: Ctx;
}) {
  if (f.type === "text" || f.type === "url") {
    return (
      <div className="flex flex-col gap-2">
        <Label f={f} />
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          type={f.type === "url" ? "url" : "text"}
          className={input}
        />
      </div>
    );
  }

  if (f.type === "textarea") {
    return (
      <div className="flex flex-col gap-2">
        <Label f={f} />
        <AutoTextarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }

  if (f.type === "image" || f.type === "video") {
    return (
      <div className="flex flex-col gap-2">
        <Label f={f} />
        <ImageField
          value={value ?? ""}
          onChange={onChange}
          kind={f.type}
          blob={ctx.blob}
          gallery={ctx.gallery}
        />
      </div>
    );
  }

  if (f.type === "strings") {
    return <StringsEditor f={f} value={Array.isArray(value) ? value : []} onChange={onChange} />;
  }

  if (f.type === "group") {
    const v = value ?? {};
    return (
      <fieldset className="flex flex-col gap-5 rounded-xl border border-ink/10 bg-ink/[0.02] p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold text-ink">{f.label}</legend>
        {f.fields.map((sub) => (
          <FieldEditor
            key={sub.k}
            f={sub}
            value={v[sub.k]}
            onChange={(nv) => onChange({ ...v, [sub.k]: nv })}
            ctx={ctx}
          />
        ))}
      </fieldset>
    );
  }

  if (f.type === "list") {
    return <ListEditor f={f} value={Array.isArray(value) ? value : []} onChange={onChange} ctx={ctx} />;
  }
  return null;
}

function StringsEditor({
  f,
  value,
  onChange,
}: {
  f: Extract<Field, { type: "strings" }>;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const l = useList(value, onChange);
  return (
    <div className="flex flex-col gap-2">
      <Label f={f} />
      {value.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          {f.multiline ? (
            <AutoTextarea value={v} onChange={(e) => l.set(i, e.target.value)} />
          ) : (
            <input value={v} onChange={(e) => l.set(i, e.target.value)} className={input} />
          )}
          <ItemTools i={i} n={value.length} move={l.move} remove={l.remove} />
        </div>
      ))}
      <button type="button" onClick={() => l.add("")} className={`${btn} w-fit`}>
        + Agregar {f.item ?? "ítem"}
      </button>
    </div>
  );
}

function ListEditor({
  f,
  value,
  onChange,
  ctx,
}: {
  f: Extract<Field, { type: "list" }>;
  value: any[];
  onChange: (v: any[]) => void;
  ctx: Ctx;
}) {
  const l = useList(value, onChange);
  const resumen = (it: any) => {
    const first = f.fields.find((x) => x.type === "text" || x.type === "textarea");
    return first ? String(it?.[first.k] ?? "") : "";
  };

  return (
    <div className="flex flex-col gap-3">
      <Label f={f} />
      {value.map((it, i) => (
        <details
          key={i}
          className="group rounded-xl border border-ink/10 bg-ink/[0.02] open:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
            <span className="flex min-w-0 items-baseline gap-3">
              <span className="text-xs font-medium tabular-nums text-ink/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate text-sm font-medium text-ink">
                {resumen(it) || `${f.item} sin título`}
              </span>
            </span>
            <span className="text-xs text-ink/40 group-open:hidden">Editar</span>
            <span className="hidden text-xs text-ink/40 group-open:inline">Cerrar</span>
          </summary>
          <div className="flex flex-col gap-5 border-t border-ink/10 p-4 sm:p-5">
            {f.fields.map((sub) => (
              <FieldEditor
                key={sub.k}
                f={sub}
                value={it?.[sub.k]}
                onChange={(nv) => l.set(i, { ...it, [sub.k]: nv })}
                ctx={ctx}
              />
            ))}
            <div className="flex justify-end border-t border-ink/10 pt-4">
              <ItemTools i={i} n={value.length} move={l.move} remove={l.remove} />
            </div>
          </div>
        </details>
      ))}
      <button type="button" onClick={() => l.add(vacio(f.fields))} className={`${btn} w-fit`}>
        + Agregar {f.item.toLowerCase()}
      </button>
    </div>
  );
}

export function SectionForm({
  id,
  fields,
  initial,
  href,
  canSave,
  blob,
  gallery,
}: {
  id: string;
  fields: Field[];
  initial: Record<string, any>;
  href: string;
  canSave: boolean;
  blob: UploadMode;
  gallery: string[];
}) {
  const [data, setData] = React.useState(initial);
  const [saved, setSaved] = React.useState(initial);
  const [status, setStatus] = React.useState<"" | "ok" | "error">("");
  const [error, setError] = React.useState("");
  const [pending, start] = React.useTransition();
  const dirty = JSON.stringify(data) !== JSON.stringify(saved);

  // Avisa antes de salir con cambios sin guardar.
  React.useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const guardar = () =>
    start(async () => {
      const r = await saveSiteSection(id, data);
      if (r.ok) {
        setSaved(data);
        setStatus("ok");
      } else {
        setStatus("error");
        setError(r.error ?? "No se pudo guardar.");
      }
    });

  const restaurar = () => {
    if (!confirm("Se pierden los cambios de esta sección y vuelve el contenido original. ¿Seguimos?")) return;
    start(async () => {
      const r = await resetSiteSection(id);
      if (r.ok && r.data) {
        setData(r.data);
        setSaved(r.data);
        setStatus("ok");
      } else {
        setStatus("error");
        setError(r.error ?? "No se pudo restaurar.");
      }
    });
  };

  const ctx = { blob, gallery };

  return (
    <div className="flex flex-col gap-6 pb-28">
      <div className="flex flex-col gap-6 rounded-2xl border border-ink/10 bg-white p-5 sm:p-7">
        {fields.map((f) => (
          <FieldEditor
            key={f.k}
            f={f}
            value={data[f.k]}
            onChange={(v) => {
              setStatus("");
              setData((d) => ({ ...d, [f.k]: v }));
            }}
            ctx={ctx}
          />
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="text-sm">
            {status === "ok" && !dirty && <span className="text-emerald-700">Guardado. Ya se ve en la web.</span>}
            {status === "error" && <span className="text-red-600">{error}</span>}
            {dirty && status !== "error" && <span className="text-ink/55">Hay cambios sin guardar</span>}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={restaurar} disabled={pending || !canSave} className={btn}>
              Volver al original
            </button>
            <a href={href} target="_blank" className={btn}>
              Ver en la web ↗
            </a>
            <button
              type="button"
              onClick={guardar}
              disabled={pending || !dirty || !canSave}
              className="rounded-lg bg-ink px-5 py-2 text-sm font-semibold text-paper transition-opacity disabled:opacity-40"
            >
              {pending ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
