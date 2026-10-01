import { uploadMode } from "@/lib/upload-mode";
import { notFound } from "next/navigation";
import { getSectionDef } from "@/lib/site/schema";
import { getSite, canSaveSite } from "@/lib/site/store";
import { getGallery } from "@/lib/site/gallery";
import { SectionForm } from "@/components/admin/SectionForm";

export const dynamic = "force-dynamic";

export default async function EditarSeccion({ params }: { params: { id: string } }) {
  const def = getSectionDef(params.id);
  if (!def) notFound();
  const [site, gallery] = await Promise.all([getSite(), getGallery()]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <a href="/admin/contenido" className="text-sm text-ink/50 hover:text-ink">
          ← Textos e imágenes
        </a>
        <h1 className="mt-2 text-2xl font-bold">
          <span className="text-ink/40">{def.page} · </span>
          {def.title}
        </h1>
      </div>
      <SectionForm
        id={def.id}
        fields={def.fields}
        initial={site[def.id] as Record<string, unknown>}
        href={def.href}
        canSave={canSaveSite()}
        blob={uploadMode()}
        gallery={gallery}
      />
    </div>
  );
}
