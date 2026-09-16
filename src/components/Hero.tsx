import { CSSProperties, useEffect, useState } from "react";
import { Product } from "../data/products";
import { formatCountdown, msUntilRoastDay } from "../lib";
import { ArrowIcon, FlameIcon, PinIcon } from "./icons";

function Steam() {
  return (
    <svg
      viewBox="0 0 60 60"
      className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 text-foam/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    >
      <path className="steam-line" d="M19 50c-4-6 4-10 0-16s4-10 0-16" style={{ animationDelay: "0s" }} />
      <path className="steam-line" d="M31 52c-4-6 4-10 0-16s4-10 0-16" style={{ animationDelay: "1.2s" }} />
      <path className="steam-line" d="M43 50c-4-6 4-10 0-16s4-10 0-16" style={{ animationDelay: "2.3s" }} />
    </svg>
  );
}

export function Hero({
  featured,
  onView,
}: {
  featured: Product;
  onView: (p: Product) => void;
}) {
  const [left, setLeft] = useState(() => msUntilRoastDay(new Date()));

  useEffect(() => {
    const id = setInterval(() => setLeft(msUntilRoastDay(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:pb-28 lg:pt-16">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---- copy ---- */}
        <div>
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.28em] text-caramel">
            <span className="ember-pulse inline-block h-2 w-2 rounded-full bg-ember" />
            <PinIcon className="h-4 w-4" />
            Portland, OR — roasting since 2016
          </p>

          <h1 className="mt-6 font-display text-[2.85rem] font-medium leading-[1.02] tracking-tight sm:text-6xl xl:text-[4.6rem]">
            Small-batch coffee,
            <br />
            <em className="font-light italic text-honey">roasted the slow way.</em>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-crema">
            Six coffees on the shelf each week — single origins and one house blend,
            drum-roasted over oak, cupped every morning, and shipped within 48 hours
            of the roast. No warehouses, no stale beans, no nonsense.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="group flex items-center gap-3 rounded-full bg-caramel px-7 py-3.5 text-sm font-bold text-espresso transition-all hover:bg-honey hover:shadow-[0_12px_36px_-10px_rgba(217,154,78,0.6)] active:scale-95"
            >
              Browse the shelf
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#roastery"
              className="rounded-full border border-foam/20 px-7 py-3.5 text-sm font-bold text-foam transition-all hover:border-caramel/70 hover:text-honey active:scale-95"
            >
              Meet the roastery
            </a>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-ember/40 bg-ember/10 px-5 py-2.5">
            <FlameIcon className="h-4.5 w-4.5 text-ember" />
            <span className="text-sm text-crema">
              Next roast ships in{" "}
              <span className="font-bold tabular-nums text-foam">{formatCountdown(left)}</span>
            </span>
          </div>

          <dl className="mt-10 flex max-w-lg divide-x divide-foam/10 border-t border-foam/10 pt-6">
            {[
              ["27", "partner farms"],
              ["6", "origins this season"],
              ["88+", "avg. SCA score"],
            ].map(([n, label]) => (
              <div key={label} className="flex-1 px-4 first:pl-0">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl font-semibold text-honey">{n}</dd>
                <dd className="mt-1 text-xs uppercase tracking-wider text-crema">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- featured bag ---- */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Steam />
          <button
            onClick={() => onView(featured)}
            className="group relative block w-full cursor-pointer text-left"
            aria-label={`View ${featured.name} details`}
          >
            <span className="arch block border border-caramel/30 p-2.5 transition-colors duration-500 group-hover:border-caramel/70">
              <span className="arch block overflow-hidden bg-bark">
                <img
                  src={featured.image}
                  alt={`${featured.name} — ${featured.origin} coffee bag`}
                  className="kenburns aspect-[10/11] w-full object-cover"
                />
              </span>
            </span>

            <span className="absolute -left-3 top-10 -rotate-6 rounded-md bg-ember px-4 py-2 font-display text-sm font-semibold italic text-foam shadow-lg sm:-left-6">
              Roasted 2 days ago
            </span>

            {featured.notes.map((note, i) => (
              <span
                key={note}
                className="floaty absolute rounded-full border border-foam/15 bg-espresso/80 px-3.5 py-1.5 text-xs font-bold text-honey backdrop-blur-sm"
                style={
                  [
                    { right: "-4%", top: "22%", "--tilt": "5deg", animationDelay: "0s" },
                    { left: "-6%", top: "48%", "--tilt": "-6deg", animationDelay: "1.4s" },
                    { right: "-2%", top: "66%", "--tilt": "3deg", animationDelay: "2.6s" },
                  ][i] as unknown as CSSProperties
                }
              >
                {note}
              </span>
            ))}
          </button>

          <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-foam/10 bg-roast/80 px-5 py-4 backdrop-blur-sm">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-caramel">
                This week's featured pour
              </p>
              <p className="mt-1 font-display text-xl font-semibold">
                {featured.name} · <span className="font-light italic text-crema">{featured.origin}</span>
              </p>
            </div>
            <button
              onClick={() => onView(featured)}
              className="shrink-0 rounded-full border border-caramel/50 p-3 text-caramel transition-all hover:bg-caramel hover:text-espresso active:scale-90"
              aria-label="View featured coffee"
            >
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
