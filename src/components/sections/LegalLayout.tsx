import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export type LegalSection = { h: string; body: string[] };

export function LegalLayout({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="overflow-clip bg-paper text-ink">
      <Nav solid />

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <a
          href="/"
          className="label text-ink/55 transition-colors hover:text-ink"
        >
          ← Volver al inicio
        </a>

        <h1 className="heading mt-8 text-[clamp(2rem,4.5vw,3.4rem)] text-ink">
          {title}
        </h1>
        <p className="label mt-4 text-ink/45">
          Última actualización · {updated}
        </p>
        <p className="mt-8 text-[1.02rem] leading-relaxed text-ink/70">{intro}</p>

        <div className="mt-12 flex flex-col gap-10 border-t border-ink/15 pt-12">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="heading text-xl text-ink">
                {i + 1}. {s.h}
              </h2>
              <div className="mt-3 flex flex-col gap-3 text-[0.98rem] leading-relaxed text-ink/70">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 text-sm leading-relaxed text-ink/45">
          Este documento es de carácter general y orientativo. Te recomendamos
          revisarlo con asesoramiento legal antes de su publicación definitiva.
        </p>
      </article>

      <Footer />
    </main>
  );
}
