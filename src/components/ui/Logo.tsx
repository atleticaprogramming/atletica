export function LogoMark({
  className = "h-9 w-9",
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg viewBox="0 0 449 448" className={className} fill="none" aria-hidden>
      <path
        d="M351.887 124.729V191.133L337.377 209.487V337.538H302.43V252.121H244.772L230.937 302.713L230.763 252.121V199.79H302.372V145.475H146.628V199.79H204.229L218.237 151.257V252.121H146.57V337.538H111.623V209.487L97.1138 191.133V124.729L47.9185 110.465H401.082L351.887 124.729Z"
        fill={fill}
      />
    </svg>
  );
}

export function Wordmark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`} style={{ color }}>
      <LogoMark className="h-9 w-9" fill={color} />
      <span className="display text-[1.35rem] leading-none pt-[2px]">Atlética</span>
    </span>
  );
}
