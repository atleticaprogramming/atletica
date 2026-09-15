"use client";
import * as React from "react";
import { Wordmark } from "@/components/ui/Logo";

type NavLink = { label: string; href: string };

const defaultLinks: NavLink[] = [
  { label: "Planificaciones", href: "/#programaciones" },
  { label: "Cursos", href: "/#cursos" },
  { label: "Nuestro método", href: "/#metodo" },
];

const defaultCta: NavLink = { label: "Empezá ahora", href: "/#programaciones" };

export function Nav({
  solid = false,
  links = defaultLinks,
  cta = defaultCta,
}: {
  solid?: boolean;
  links?: NavLink[];
  cta?: NavLink;
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[200]">
      {/* Bar */}
      <div className="px-4 pt-4 sm:px-6">
        <div
          className={`mx-auto flex max-w-site items-center justify-between rounded-[14px] px-4 py-3 transition-all duration-500 ease-brand sm:px-6 ${
            scrolled || solid
              ? "bg-ink/85 backdrop-blur-xl ring-1 ring-white/10"
              : "bg-transparent"
          }`}
        >
          <a href="/" aria-label="Atlética" className="text-paper">
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label rounded-full px-4 py-2 !text-[12px] text-paper/80 transition-colors hover:bg-white/10 hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={cta.href}
              className="label hidden rounded-full bg-blue px-5 py-2.5 !text-[12px] text-ink transition-all hover:bg-blue/90 sm:inline-block"
            >
              {cta.label}
            </a>
            <button
              aria-label="Menú"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-paper lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-[2px] w-5 bg-current transition-all ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-[2px] w-5 bg-current transition-all ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-5 bg-current transition-all ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="mx-auto mt-2 max-w-site rounded-[14px] bg-ink/95 p-4 ring-1 ring-white/10 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="heading border-b border-white/10 py-3 text-xl text-paper last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={cta.href}
                onClick={() => setOpen(false)}
                className="label mt-4 rounded-full bg-blue px-5 py-3 text-center text-[0.64rem] text-ink"
              >
                {cta.label}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
