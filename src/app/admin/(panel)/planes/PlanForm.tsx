import { StringListField } from "@/components/admin/Fields";
import { savePlanAction, deletePlanAction } from "@/app/admin/actions";
import type { PlanData } from "@/lib/types";

const input =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/40";
const lbl = "text-sm font-semibold text-ink";

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
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
        className={input}
      />
    </div>
  );
}

export function PlanForm({ plan }: { plan?: PlanData }) {
  const isEdit = Boolean(plan);

  return (
    <div className="flex flex-col gap-8">
      <form action={savePlanAction} className="flex flex-col gap-6">
        {isEdit && <input type="hidden" name="id" value={plan!.id} />}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Nombre" name="name" defaultValue={plan?.name} />
          <div className="flex flex-col gap-2">
            <label className={lbl}>Grupo</label>
            <select
              name="group"
              defaultValue={plan?.group ?? "main"}
              className={input}
            >
              <option value="main">Principal (sección Planificaciones)</option>
              <option value="otras">Otras planificaciones (carrusel)</option>
            </select>
          </div>
          <Field
            label="Precio (opcional)"
            name="price"
            defaultValue={plan?.price ?? ""}
            placeholder="$43.000"
            hint="vacío = sin precio"
          />
          <Field
            label="Período (opcional)"
            name="period"
            defaultValue={plan?.period ?? ""}
            placeholder="ARS / mes"
          />
          <Field
            label="Orden"
            name="order"
            defaultValue={String(plan?.order ?? 0)}
            hint="menor = primero"
          />
          <Field
            label="Link de suscripción"
            name="url"
            defaultValue={plan?.url}
            placeholder="https://…/subscribe/…"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={lbl}>Descripción</label>
          <textarea
            name="description"
            defaultValue={plan?.description}
            rows={3}
            className={input}
          />
        </div>

        <StringListField
          name="features"
          label="Características (bullet points)"
          hint="un ítem por fila"
          initial={plan?.features ?? []}
        />

        <div className="flex flex-col gap-2">
          <label className={lbl}>Nota al pie (opcional)</label>
          <textarea
            name="footer"
            defaultValue={plan?.footer ?? ""}
            rows={2}
            className={input}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={plan?.published ?? true}
              className="h-4 w-4"
            />
            Publicado (visible en el sitio)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="showInFooter"
              defaultChecked={plan?.showInFooter ?? true}
              className="h-4 w-4"
            />
            Mostrar en el listado del footer
          </label>
        </div>

        <div className="flex gap-3">
          <button className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/85">
            Guardar
          </button>
          <a
            href="/admin/planes"
            className="rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 hover:bg-ink/5"
          >
            Cancelar
          </a>
        </div>
      </form>

      {isEdit && (
        <form action={deletePlanAction} className="border-t border-ink/10 pt-6">
          <input type="hidden" name="id" value={plan!.id} />
          <button className="text-sm text-red-600 hover:underline">
            Eliminar planificación
          </button>
        </form>
      )}
    </div>
  );
}
