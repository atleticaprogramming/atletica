import { getGallery } from "@/lib/site/gallery";
import { CourseForm } from "@/app/admin/(panel)/cursos/CourseForm";

export const dynamic = "force-dynamic";

export default async function NuevoCurso() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <a href="/admin/cursos" className="text-sm text-ink/50 hover:text-ink">
          ← Cursos
        </a>
        <h1 className="mt-2 text-2xl font-bold">Nuevo curso</h1>
      </div>
      <CourseForm blob={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} gallery={await getGallery()} />
    </div>
  );
}
