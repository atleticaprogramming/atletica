"use client";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import { PlanCard, type Plan } from "@/components/ui/PlanCard";
import type { PlanData } from "@/lib/types";
import type { SiteContent } from "@/lib/site/defaults";

export function Programas({
  plans: data,
  c,
}: {
  plans: PlanData[];
  c: SiteContent["homeProgramas"];
}) {
  const plans: Plan[] = data.map((p) => ({
    name: p.name,
    url: p.url,
    desc: p.description,
    price: p.price ?? undefined,
    period: p.period ?? undefined,
    features: p.features,
    footer: p.footer ?? undefined,
  }));

  return (
    <section
      id="programaciones"
      className="relative scroll-mt-24 bg-paper py-24 text-ink sm:py-32"
    >
      <div className="mx-auto max-w-site px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                {c.etiqueta}
              </span>
            </Reveal>
            <h2 className="heading mt-6 text-[clamp(1.9rem,4.2vw,3.4rem)] text-ink">
              <MaskReveal>{c.titulo1}</MaskReveal>
              <MaskReveal delay={120}>{c.titulo2}</MaskReveal>
            </h2>
          </div>
          <Reveal delay={200} className="max-w-sm">
            <p className="text-[0.95rem] leading-relaxed text-ink/65">
              {c.texto}
            </p>
          </Reveal>
        </div>

        {/* Main plans */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <PlanCard p={p} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
