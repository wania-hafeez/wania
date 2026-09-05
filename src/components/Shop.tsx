import { useRef, useState } from "react";
import { Category, CATEGORIES, fmt, Product } from "../data/products";
import { cx, Reveal } from "../lib";
import { BagIcon, BeanIcon, CheckIcon, ChevronIcon, CloseIcon, RoastMeter, SearchIcon } from "./icons";

export type SortKey = "featured" | "price-asc" | "price-desc" | "score";

function ProductCard({
  product,
  onAdd,
  onOpen,
}: {
  product: Product;
  onAdd: (p: Product) => void;
  onOpen: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-foam/10 bg-roast transition-all duration-500 hover:-translate-y-1.5 hover:border-caramel/50 hover:shadow-[0_24px_60px_-24px_rgba(217,154,78,0.35)]">
      <button
        onClick={() => onOpen(product)}
        className="relative block aspect-[10/9] w-full cursor-pointer overflow-hidden"
        aria-label={`View details for ${product.name}`}
      >
        <span
          className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(80% 70% at 50% 30%, ${product.accent}30, transparent 70%)` }}
        />
        <img
          src={product.image}
          alt={`${product.name} — ${product.origin} coffee bag`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-rotate-1"
        />
        {product.badge && (
          <span className="absolute left-3.5 top-3.5 rounded-md bg-ember px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foam shadow-md">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3.5 top-3.5 rounded-md border border-foam/15 bg-espresso/75 px-2.5 py-1 text-[11px] font-bold tabular-nums text-honey backdrop-blur-sm">
          {product.score ? `SCA ${product.score.toFixed(1)}` : "House blend"}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-crema">
          <RoastMeter level={product.roast === "Light" ? 1 : product.roast === "Medium" ? 2 : 3} />
          <span>{product.roast} roast</span>
          <span className="text-foam/25">·</span>
          <span>{product.process}</span>
        </div>

        <h3 className="mt-2.5 font-display text-2xl font-semibold leading-tight">
          <button onClick={() => onOpen(product)} className="cursor-pointer transition-colors hover:text-honey">
            {product.name}
          </button>
        </h3>
        <p className="mt-0.5 text-sm text-crema">
          {product.origin} · <span className="italic">{product.region}</span>
        </p>

        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {product.notes.map((n) => (
            <li
              key={n}
              className="rounded-full border border-foam/12 px-2.5 py-0.5 text-[11px] font-semibold text-crema transition-colors group-hover:border-foam/25"
            >
              {n}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[22px] font-extrabold leading-none tabular-nums">{fmt(product.price)}</p>
            <p className="mt-1 text-xs text-crema">{product.weight} · whole bean</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpen(product)}
              className="rounded-full border border-foam/15 px-4 py-2.5 text-xs font-bold text-crema transition-all hover:border-caramel/70 hover:text-honey active:scale-95"
            >
              Details
            </button>
            <button
              onClick={handleAdd}
              className={cx(
                "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition-all active:scale-95",
                added
                  ? "bg-sage text-espresso"
                  : "bg-caramel text-espresso hover:bg-honey hover:shadow-[0_8px_24px_-8px_rgba(217,154,78,0.7)]"
              )}
              aria-label={added ? `${product.name} added` : `Add ${product.name} to bag`}
            >
              {added ? (
                <>
                  <CheckIcon className="h-3.5 w-3.5" /> Added
                </>
              ) : (
                <>
                  <BagIcon className="h-3.5 w-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Shop({
  products,
  totalCount,
  query,
  onQuery,
  cat,
  onCat,
  sort,
  onSort,
  onAdd,
  onOpen,
}: {
  products: Product[];
  totalCount: number;
  query: string;
  onQuery: (q: string) => void;
  cat: Category;
  onCat: (c: Category) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  onAdd: (p: Product) => void;
  onOpen: (p: Product) => void;
}) {
  return (
    <section id="shop" className="relative mx-auto max-w-7xl scroll-mt-20 px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-caramel">This week's shelf</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Six coffees, <em className="font-light italic text-honey">one roaster.</em>
            </h2>
          </div>
          <p className="pb-1 text-sm font-semibold text-crema" aria-live="polite">
            Showing <span className="text-honey">{products.length}</span> of {totalCount}
          </p>
        </div>
      </Reveal>

      {/* ---- sticky toolbar ---- */}
      <Reveal>
        <div className="sticky top-16 z-30 -mx-4 border-y border-foam/8 bg-espresso/88 px-4 py-3.5 backdrop-blur-md sm:-mx-6 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-crema" />
              <input
                type="search"
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Search origin, name, or tasting note…"
                className="w-full rounded-full border border-foam/15 bg-roast py-3 pl-11 pr-10 text-sm text-foam placeholder:text-crema/60 transition-colors focus:border-caramel/70 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  onClick={() => onQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-crema transition-colors hover:text-foam"
                  aria-label="Clear search"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </label>

            <div className="flex items-center gap-3">
              <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto lg:flex-none">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => onCat(c)}
                    className={cx(
                      "whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all active:scale-95",
                      cat === c
                        ? "bg-caramel text-espresso shadow-[0_6px_18px_-6px_rgba(217,154,78,0.8)]"
                        : "border border-foam/15 text-crema hover:border-caramel/60 hover:text-honey"
                    )}
                    aria-pressed={cat === c}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <label className="relative hidden shrink-0 sm:block">
                <select
                  value={sort}
                  onChange={(e) => onSort(e.target.value as SortKey)}
                  className="cursor-pointer appearance-none rounded-full border border-foam/15 bg-roast py-2 pl-4 pr-9 text-xs font-bold uppercase tracking-wider text-crema transition-colors hover:border-caramel/60 focus:border-caramel/70 focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                  <option value="score">Top scored</option>
                </select>
                <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-caramel" />
              </label>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- grid ---- */}
      {products.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
              <ProductCard product={p} onAdd={onAdd} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-foam/15 bg-roast/50 px-6 py-20 text-center">
          <BeanIcon className="h-12 w-12 text-crema/40" />
          <h3 className="mt-5 font-display text-2xl font-semibold">No beans match that brew.</h3>
          <p className="mt-2 max-w-sm text-sm text-crema">
            Nothing on the shelf fits "{query}"{cat !== "All" ? ` in ${cat}` : ""}. Try a tasting note
            like "chocolate", or clear your filters.
          </p>
          <button
            onClick={() => {
              onQuery("");
              onCat("All");
            }}
            className="mt-6 rounded-full bg-caramel px-6 py-3 text-sm font-bold text-espresso transition-all hover:bg-honey active:scale-95"
          >
            Clear search & filters
          </button>
        </div>
      )}
    </section>
  );
}
