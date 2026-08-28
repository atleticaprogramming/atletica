import { notFound } from "next/navigation";
import { getCourse } from "@/lib/content";
import { CourseForm } from "@/app/admin/(panel)/cursos/CourseForm";

export const dynamic = "force-dynamic";

export default async function EditarCurso({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourse(params.slug);
  if (!course) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <a href="/admin/cursos" className="text-sm text-ink/50 hover:text-ink">
          ← Cursos
        </a>
        <h1 className="mt-2 text-2xl font-bold">{course.title}</h1>
      </div>
      <CourseForm course={course} />
    </div>
  );
}
