"use client";
import * as React from "react";
import { upload } from "@vercel/blob/client";

const btn =
  "rounded-lg border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink/75 transition-colors hover:bg-ink/5 disabled:opacity-50";

/** Achica la foto en el navegador antes de subirla: 2400 px de lado mayor
 *  alcanzan para pantalla completa y evitan subir fotos de 12 MB del celular. */
async function preparar(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  const bmp = await createImageBitmap(file).catch(() => null);
  if (!bmp) return file;
  const max = 2400;
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  if (k === 1 && file.size < 1.5 * 1024 * 1024) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * k);
  canvas.height = Math.round(bmp.height * k);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const png = file.type === "image/png";
  const blob = await new Promise<Blob | null>((r) =>
    canvas.toBlob(r, png ? "image/png" : "image/jpeg", 0.86)
  );
  if (!blob || blob.size >= file.size) return file;
  const name = file.name.replace(/\.\w+$/, png ? ".png" : ".jpg");
  return new File([blob], name, { type: blob.type });
}

export async function subirArchivo(file: File, blob: boolean): Promise<string> {
  const listo = await preparar(file);
  if (blob) {
    const res = await upload(`atletica/${listo.name}`, listo, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
    });
    return res.url;
  }
  const fd = new FormData();
  fd.append("file", listo);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.url) throw new Error(json.error || "No se pudo subir el archivo.");
  return json.url;
}

/**
 * Imagen (o video) editable: vista previa, «Subir», «Elegir de la web» y la
 * ruta a mano para quien la tenga.
 */
export function ImageField({
  value,
  onChange,
  kind = "image",
  blob,
  gallery,
}: {
  value: string;
  onChange: (v: string) => void;
  kind?: "image" | "video";
  blob: boolean;
  gallery: string[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const [picking, setPicking] = React.useState(false);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setError("");
    setBusy(true);
    try {
      onChange(await subirArchivo(f, blob));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <div className="relative h-24 w-32 flex-none overflow-hidden rounded-lg border border-ink/10 bg-ink/[0.04]">
          {value ? (
            kind === "video" ? (
              <video src={value} muted playsInline className="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            )
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-xs text-ink/40">
              Sin {kind === "video" ? "video" : "imagen"}
            </span>
          )}
          {busy && (
            <span className="absolute inset-0 flex items-center justify-center bg-white/80 text-xs font-medium text-ink/70">
              Subiendo…
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={btn}
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            >
              {kind === "video" ? "Subir video" : "Subir imagen"}
            </button>
            {kind === "image" && gallery.length > 0 && (
              <button type="button" className={btn} onClick={() => setPicking((v) => !v)}>
                {picking ? "Cerrar" : "Elegir de la web"}
              </button>
            )}
          </div>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="o pegá una ruta / enlace"
            className="w-full truncate rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink/60 outline-none focus:border-ink/40"
          />
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={kind === "video" ? "video/mp4,video/webm" : "image/jpeg,image/png,image/webp,image/gif,image/avif"}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>

      {picking && (
        <div className="grid max-h-72 grid-cols-4 gap-2 overflow-y-auto rounded-lg border border-ink/10 bg-white p-2 sm:grid-cols-6">
          {gallery.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                onChange(src);
                setPicking(false);
              }}
              className={`aspect-square overflow-hidden rounded-md ring-2 transition ${
                src === value ? "ring-blue" : "ring-transparent hover:ring-ink/30"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
