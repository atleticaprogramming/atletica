"use client";
import * as React from "react";
import { ImageField } from "@/components/admin/ImageField";
import type { UploadMode } from "@/lib/upload-mode";

/** ImageField para formularios clásicos: guarda el valor en un input oculto. */
export function ImageInput({
  name,
  label,
  defaultValue = "",
  blob,
  gallery,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  blob: UploadMode;
  gallery: string[];
}) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-ink">{label}</label>
      <input type="hidden" name={name} value={value} />
      <ImageField value={value} onChange={setValue} blob={blob} gallery={gallery} />
    </div>
  );
}
