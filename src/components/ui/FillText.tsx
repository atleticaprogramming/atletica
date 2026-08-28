"use client";
import * as React from "react";

/**
 * Reveals a block of text by "filling" each word with color, staggered,
 * when the element scrolls into view. Words start faint and fill to full.
 */
export function FillText({
  text,
  className = "",
  step = 28,
}: {
  text: string;
  className?: string;
  step?: number;
}) {
  const ref = React.useRef<HTMLParagraphElement | null>(null);
  const [filled, setFilled] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setFilled(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    const safety = window.setInterval(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85) {
        setFilled(true);
        obs.disconnect();
        window.clearInterval(safety);
      }
    }, 400);
    return () => {
      obs.disconnect();
      window.clearInterval(safety);
    };
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="transition-colors duration-300 ease-out"
          style={{
            color: filled ? "currentColor" : "rgba(6,24,30,0.42)",
            transitionDelay: `${i * step}ms`,
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
