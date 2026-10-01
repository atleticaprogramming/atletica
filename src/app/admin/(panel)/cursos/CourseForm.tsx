import { StringListField, ModulesField } from "@/components/admin/Fields";
import { ImageInput } from "@/components/admin/ImageInput";
import { saveCourseAction, deleteCourseAction } from "@/app/admin/actions";
import type { CourseData } from "@/lib/types";
import type { UploadMode } from "@/lib/upload-mode";

const input =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/40";
const lbl = "text-sm font-semibold text-ink";

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  readOnly,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label className={lbl}>{label}</label>
        {hint && <span className="text-xs text-ink/45">{hint}</span>}
      </div>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`${input} ${readOnly ? "bg-ink/[0.04] text-ink/50" : ""}`}
      />
    </div>
  );
}

export function CourseForm({
  course,
  blob,
  gallery,
}: {
  course?: CourseData;
  blob: UploadMode;
  gallery: string[];
}) {
  const isEdit = Boolean(course);

  return (
    <div className="flex flex-col gap-8">
      <form action={saveCourseAction} className="flex flex-col gap-6">
        {isEdit && <input type="hidden" name="slug" value={course!.slug} />}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Título" name="title" defaultValue={course?.title} />
          {isEdit ? (
            <Field
              label="Slug (URL)"
              name="_slug_readonly"
              defaultValue={course!.slug}
              readOnly
              hint="no se puede cambiar"
            />
          ) : (
            <Field
              label="Slug (URL)"
              name="slug"
              placeholder="programa-de-handstand"
              hint="solo minúsculas y guiones"
            />
          )}
          <Field
            label="Categoría"
            name="category"
            defaultValue={course?.category}
            placeholder="Curso · Gimnásticos"
          />
          <Field
            label="Precio"
            name="price"
            defaultValue={course?.price}
            placeholder="$100.000"
          />
          <Field
            label="Etiqueta lecciones (tarjeta)"
            name="lecciones"
            defaultValue={course?.lecciones}
            placeholder="43 lecciones"
          />
          <Field
            label="Meta (detalle)"
            name="meta"
            defaultValue={course?.meta}
            placeholder="43 lecciones · 10 módulos · certificado"
          />
          <Field
            label="Orden"
            name="order"
            defaultValue={String(course?.order ?? 0)}
            hint="menor = primero"
          />
          <Field
            label="Link de compra"
            name="enrollUrl"
            defaultValue={course?.enrollUrl}
            placeholder="https://…/checkout/…"
          />
        </div>

        <ImageInput
          name="image"
          label="Imagen"
          defaultValue={course?.image}
          blob={blob}
          gallery={gallery}
        />

        <div className="flex flex-col gap-2">
          <label className={lbl}>Descripción corta (tarjeta del home)</label>
          <textarea
            name="cardDesc"
            defaultValue={course?.cardDesc}
            rows={2}
            className={input}
          />
        </div>

        <StringListField
          name="descParas"
          label="Descripción larga (página del curso)"
          hint="un párrafo por fila"
          initial={course?.descParas ?? []}
          multiline
        />

        <ModulesField name="modules" initial={course?.modules ?? []} />

        <StringListField
          name="incluye"
          label="Incluye"
          hint="un ítem por fila"
          initial={course?.incluye ?? []}
        />

        <div className="grid grid-cols-1 gap-5">
          <Field
            label="Instructor/a"
            name="instructorName"
            defaultValue={course?.instructor.name}
          />
          <StringListField
            name="instructorBio"
            label="Bio del instructor/a"
            hint="un párrafo por fila"
            initial={course?.instructor.bio ?? []}
            multiline
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={course?.published ?? true}
            className="h-4 w-4"
          />
          Publicado (visible en el sitio)
        </label>

        <div className="flex gap-3">
          <button className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/85">
            Guardar
          </button>
          <a
            href="/admin/cursos"
            className="rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 hover:bg-ink/5"
          >
            Cancelar
          </a>
        </div>
      </form>

      {isEdit && (
        <form
          action={deleteCourseAction}
          className="border-t border-ink/10 pt-6"
        >
          <input type="hidden" name="slug" value={course!.slug} />
          <button className="text-sm text-red-600 hover:underline">
            Eliminar curso
          </button>
        </form>
      )}
    </div>
  );
}
