interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BeanIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <g transform="rotate(32 12 12)">
        <ellipse cx="12" cy="12" rx="6.4" ry="8.8" />
        <path d="M12 3.6c-2.7 2.6-3.3 5.3-1.1 8.2 2.1 2.8 2.5 5.6-.8 8.6" />
      </g>
    </svg>
  );
}

export function BeanSolidIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g transform="rotate(32 12 12)">
        <ellipse cx="12" cy="12" rx="6.4" ry="8.8" fill="currentColor" />
        <path
          d="M12 3.6c-2.7 2.6-3.3 5.3-1.1 8.2 2.1 2.8 2.5 5.6-.8 8.6"
          fill="none"
          stroke="#17100b"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 8.2h12l-1.1 11.3a1.6 1.6 0 0 1-1.6 1.5H8.7a1.6 1.6 0 0 1-1.6-1.5L6 8.2Z" />
      <path d="M9 8.2V6.4a3 3 0 0 1 6 0v1.8" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4.5 7h15M9.5 7V5.4A1.4 1.4 0 0 1 10.9 4h2.2a1.4 1.4 0 0 1 1.4 1.4V7M7 7l.8 12a1.6 1.6 0 0 0 1.6 1.5h5.2a1.6 1.6 0 0 0 1.6-1.5L17 7M10.2 11v5M13.8 11v5" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21c3.9 0 6.5-2.5 6.5-6.1 0-2.7-1.7-4.6-3.1-6.3C14 6.9 13 5.2 13 3c-3 1.8-4.2 4.5-3.6 7-.9-.3-1.7-1-2.1-2.2-1.3 1.5-1.8 3.3-1.8 5.1C5.5 18.5 8.1 21 12 21Z" />
      <path d="M12 21c1.9 0 3.2-1.4 3.2-3.3 0-1.7-1.1-2.8-3.2-4.7-2.1 1.9-3.2 3-3.2 4.7C8.8 19.6 10.1 21 12 21Z" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CupIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 10h13v5.5A5.5 5.5 0 0 1 11.5 21h-2A5.5 5.5 0 0 1 4 15.5V10Z" />
      <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3.5c-1 1.2 1 1.8 0 3M12 3.5c-1 1.2 1 1.8 0 3" />
    </svg>
  );
}

/** Three coffee beans showing roast level (1 = light … 3 = dark). */
export function RoastMeter({ level, className }: { level: 1 | 2 | 3; className?: string }) {
  return (
    <span className={cxInline(className, "inline-flex items-center gap-0.5")} title={`${["Light", "Medium", "Dark"][level - 1]} roast`}>
      {[1, 2, 3].map((i) =>
        i <= level ? (
          <BeanSolidIcon key={i} className="h-3.5 w-3.5 text-caramel" />
        ) : (
          <BeanIcon key={i} className="h-3.5 w-3.5 text-crema/40" />
        )
      )}
    </span>
  );
}

function cxInline(a: string | undefined, b: string) {
  return [a, b].filter(Boolean).join(" ");
}
