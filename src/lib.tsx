import { ReactNode, useEffect, useRef, useState } from "react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Scroll-reveal wrapper — fades content up as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx("reveal", inView && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}

/** Milliseconds until the next Friday at 09:00 local time (roast day). */
export function msUntilRoastDay(now: Date) {
  const target = new Date(now);
  target.setHours(9, 0, 0, 0);
  let days = (5 - target.getDay() + 7) % 7; // Friday = 5
  if (days === 0 && now.getTime() >= target.getTime()) days = 7;
  target.setDate(target.getDate() + days);
  return target.getTime() - now.getTime();
}

export function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d * 24 + h)}:${pad(m)}:${pad(s)}`;
}
