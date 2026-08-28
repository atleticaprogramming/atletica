"use client";
import * as React from "react";

function useInView<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => setVisible(true);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    // Safety net: if a fast scroll skips the observer, reveal once the
    // element is anywhere within the viewport.
    const tick = window.setInterval(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
        reveal();
        obs.disconnect();
        window.clearInterval(tick);
      }
    }, 400);
    return () => {
      obs.disconnect();
      window.clearInterval(tick);
    };
  }, []);

  return { ref, visible };
}

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade";
  as?: keyof JSX.IntrinsicElements;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: Props) {
  const { ref, visible } = useInView<HTMLElement>();
  const base = "transition-all duration-[900ms] ease-brand will-change-transform";
  const states: Record<string, string> = {
    up: visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    fade: visible ? "opacity-100" : "opacity-0",
  };
  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as never}
      className={`${base} ${states[variant]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

/**
 * Heading line reveal. The observer lives on the stable (non-transformed)
 * clip wrapper, while the inner element slides up. This is robust against
 * fast scrolls and ancestor clipping.
 */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}
    >
      <span
        className="block transition-transform duration-[900ms] ease-brand will-change-transform"
        style={{
          transform: visible ? "translateY(0)" : "translateY(115%)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
