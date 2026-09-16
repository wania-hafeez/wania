import { BeanSolidIcon, BagIcon } from "./icons";

const TICKER = [
  "Roasted every Friday — order by Wednesday midnight",
  "Free U.S. shipping over $40",
  "New this week: Kenya Nyeri AA · 90.1 pts",
  "Drum-roasted in 12 kg batches over oak",
  "30-day freshness guarantee",
];

export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-40 overflow-hidden bg-caramel text-espresso">
      <div className="animate-marquee flex w-max items-center gap-8 py-1.5 pr-8 text-[11px] font-bold uppercase tracking-[0.16em]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            {t}
            <BeanSolidIcon className="h-3 w-3 opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Header({
  cartCount,
  bump,
  onCartOpen,
}: {
  cartCount: number;
  bump: number;
  onCartOpen: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-foam/10 bg-espresso/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-caramel text-espresso transition-transform duration-500 group-hover:rotate-[140deg]">
            <BeanSolidIcon className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-tight">Nightjar</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-caramel">
              Coffee Co.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-crema md:flex">
          {[
            ["The Shelf", "#shop"],
            ["Roastery", "#roastery"],
            ["Visit", "#visit"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative py-1 transition-colors hover:text-foam"
            >
              {label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-caramel transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 rounded-full border border-foam/15 bg-bark px-4 py-2.5 text-sm font-bold transition-all hover:border-caramel/70 hover:bg-mocha active:scale-95"
          aria-label={`Open bag, ${cartCount} items`}
        >
          <BagIcon className="h-4.5 w-4.5 text-caramel" />
          <span className="hidden sm:inline">Your bag</span>
          {cartCount > 0 && (
            <span
              key={bump}
              className="badge-pop absolute -right-1.5 -top-1.5 grid h-5.5 min-w-5.5 place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-foam"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
