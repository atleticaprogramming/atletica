export type Plan = {
  name: string;
  desc: string;
  price?: string;
  period?: string;
  features: string[];
  footer?: string;
  cta?: string;
  url?: string;
};

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

export function PlanCard({ p }: { p: Plan }) {
  return (
    <div className="flex h-full flex-col rounded-[18px] bg-paper-pure p-8 ring-1 ring-ink/10 sm:p-9">
      <span className="heading flex min-h-[2.4rem] items-start text-2xl">
        {p.name}
      </span>
      <p className="mt-3 min-h-[8.5rem] text-[0.9rem] leading-relaxed text-ink/60">
        {p.desc}
      </p>

      {p.price && (
        <div className="mt-7 flex items-end gap-2">
          <span className="heading text-[2.4rem] leading-none">{p.price}</span>
          <span className="label mb-1 text-ink/45">{p.period}</span>
        </div>
      )}

      <a
        href={p.url ?? "#sumate"}
        {...(p.url?.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={`label rounded-full px-6 py-3.5 text-center text-[0.64rem] transition-all ${
          p.price
            ? "mt-7 bg-ink text-paper hover:bg-teal"
            : "mt-7 bg-paper text-ink ring-1 ring-ink/20 hover:bg-ink hover:text-paper"
        }`}
      >
        {p.cta ?? "Empezá ahora"}
      </a>

      <div className="mt-8 h-px w-full bg-ink/10" />
      <span className="label mt-6 text-ink/45">Incluye</span>
      <ul className="mt-4 flex flex-col gap-3.5">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center text-teal">
              <Check />
            </span>
            <span className="text-[0.9rem] leading-snug text-ink/75">{f}</span>
          </li>
        ))}
      </ul>

      {p.footer ? (
        <p className="mt-auto pt-7 text-xs leading-relaxed text-ink/45">
          {p.footer}
        </p>
      ) : (
        <div className="mt-auto" />
      )}
    </div>
  );
}
