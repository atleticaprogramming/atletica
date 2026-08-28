import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import { getCourse, getCourseSlugs } from "@/lib/content";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCourseSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = await getCourse(params.slug);
  if (!c) return { title: "Curso — Atlética" };
  return {
    title: `${c.title} — Atlética`,
    description: c.descParas[0],
  };
}

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 18 13" fill="none" aria-hidden>
    <path
      d="M17 1L6 12L1 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-ink/15 py-10 md:grid-cols-[1fr_1.7fr] md:py-12">
      <span className="label text-ink/55">{label}</span>
      <div>{children}</div>
    </div>
  );
}

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const c = await getCourse(params.slug);
  if (!c) notFound();

  return (
    <main className="overflow-clip bg-paper text-ink">
      <Nav solid />

      <article className="mx-auto max-w-site px-5 pb-8 pt-32 sm:px-8 sm:pt-36">
        {/* Back link */}
        <Reveal variant="fade">
          <a
            href="/#cursos"
            className="label text-ink/55 transition-colors hover:text-ink"
          >
            ← Volver a cursos
          </a>
        </Reveal>

        {/* Header */}
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/65">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                {c.category}
              </span>
            </Reveal>

            <h1 className="heading text-[clamp(1.9rem,3.6vw,3rem)] text-ink">
              <MaskReveal>{c.title}</MaskReveal>
            </h1>

            <Reveal delay={200} className="max-w-xl">
              <p className="text-[1rem] leading-relaxed text-ink/65">
                {c.descParas[0]}
              </p>
            </Reveal>

            <Reveal delay={280}>
              <span className="label text-ink/45">{c.meta}</span>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <span className="display text-3xl leading-none text-ink">
                  {c.price}
                </span>
                <a
                  href={c.enrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label rounded-full bg-ink px-7 py-3.5 text-[0.64rem] text-paper transition-all hover:bg-teal"
                >
                  Comprar curso
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={160}>
            <div className="aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-[18px] bg-ink/5 lg:ml-auto">
              <img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-cover object-[50%_30%]"
              />
            </div>
          </Reveal>
        </div>

        {/* Content */}
        <div className="mt-16">
          <Row label="Sobre el programa">
            <div className="flex flex-col gap-5 text-[1.02rem] leading-relaxed text-ink/75">
              {c.descParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Row>

          <Row label={`Contenido · ${c.modules.length} módulos`}>
            <div className="flex flex-col">
              {c.modules.map((m, i) => (
                <div
                  key={m.n}
                  className={`flex items-start gap-5 py-4 ${
                    i > 0 ? "border-t border-ink/10" : ""
                  }`}
                >
                  <span className="label mt-1 text-teal">{m.n}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="text-lg font-semibold tracking-tightest text-ink">
                        {m.t}
                      </h3>
                      <span className="label text-ink/45">{m.l}</span>
                    </div>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink/60">
                      {m.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Row>

          <Row label="Incluye">
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {c.incluye.map((f) => (
                <div key={f} className="flex items-center gap-4">
                  <span className="flex h-6 w-6 flex-none items-center justify-center text-teal">
                    <Check />
                  </span>
                  <span className="text-[0.98rem] leading-snug text-ink/80">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </Row>

          <Row label="Instructor/a">
            <div>
              <h3 className="heading text-2xl text-ink">{c.instructor.name}</h3>
              <div className="mt-4 flex max-w-2xl flex-col gap-4 text-[0.98rem] leading-relaxed text-ink/70">
                {c.instructor.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Row>

          <div className="h-px w-full bg-ink/15" />

          {/* Bottom CTA */}
          <Reveal className="flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-end gap-3">
              <span className="display text-4xl leading-none text-ink">
                {c.price}
              </span>
              <span className="label mb-1 text-ink/45">
                ARS · acceso de por vida
              </span>
            </div>
            <a
              href={c.enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label rounded-full bg-ink px-9 py-4 text-[0.66rem] text-paper transition-all hover:bg-teal"
            >
              Inscribite
            </a>
          </Reveal>
        </div>
      </article>

      <Footer />
    </main>
  );
}
