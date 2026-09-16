import { useEffect, useState } from "react";
import { fmt, GRINDS, Grind, Product } from "../data/products";
import { cx } from "../lib";
import { BagIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, RoastMeter } from "./icons";

export function ProductModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, qty: number, grind: Grind) => void;
}) {
  const [qty, setQty] = useState(1);
  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setGrind("Whole bean");
    setAdded(false);
  }, [product?.id]);

  if (!product) return null;

  const handleAdd = () => {
    onAdd(product, qty, grind);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button
        className="absolute inset-0 bg-espresso/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close details"
      />
      <div className="animate-[toast-in_0.4s_cubic-bezier(0.2,0.7,0.2,1)_forwards] relative grid max-h-[94vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-t-2xl border border-foam/12 bg-roast shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-xl md:grid-cols-[0.9fr_1.1fr]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-foam/15 bg-espresso/70 p-2 text-crema backdrop-blur-sm transition-all hover:rotate-90 hover:text-foam"
          aria-label="Close"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {/* image */}
        <div className="relative min-h-64 overflow-hidden md:min-h-full">
          <span
            className="absolute inset-0"
            style={{ background: `radial-gradient(90% 70% at 50% 20%, ${product.accent}38, transparent 75%)` }}
          />
          <img src={product.image} alt={`${product.name} coffee bag`} className="h-full w-full object-cover" />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-md bg-ember px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foam">
              {product.badge}
            </span>
          )}
        </div>

        {/* details */}
        <div className="p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-caramel">
            {product.kind} · {product.process}
          </p>
          <h3 className="mt-2 font-display text-4xl font-semibold leading-none">{product.name}</h3>
          <p className="mt-2 text-sm italic text-crema">
            {product.origin} — {product.region}
          </p>

          {product.score && (
            <span className="mt-4 inline-block rounded-md border border-honey/40 bg-honey/10 px-3 py-1 text-xs font-bold tabular-nums text-honey">
              ★ SCA score {product.score.toFixed(1)}
            </span>
          )}

          <p className="mt-4 text-[15px] leading-relaxed text-crema">{product.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 rounded-lg border border-foam/10 bg-espresso/50 p-4 text-sm">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-caramel">Altitude</dt>
              <dd className="mt-1 font-semibold">{product.altitude}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-caramel">Varietal</dt>
              <dd className="mt-1 font-semibold">{product.varietal}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-caramel">Roast</dt>
              <dd className="mt-1 flex items-center gap-2 font-semibold">
                <RoastMeter level={product.roast === "Light" ? 1 : product.roast === "Medium" ? 2 : 3} />
                {product.roast}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-caramel">Tastes like</dt>
              <dd className="mt-1 font-semibold">{product.notes.join(" · ")}</dd>
            </div>
          </dl>

          {/* grind */}
          <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-caramel">Grind</p>
          <div className="mt-2 flex gap-2">
            {GRINDS.map((g) => (
              <button
                key={g}
                onClick={() => setGrind(g)}
                className={cx(
                  "rounded-full px-4 py-2 text-xs font-bold transition-all active:scale-95",
                  grind === g
                    ? "bg-caramel text-espresso"
                    : "border border-foam/15 text-crema hover:border-caramel/60 hover:text-honey"
                )}
                aria-pressed={grind === g}
              >
                {g}
              </button>
            ))}
          </div>

          {/* qty + add */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-foam/15 p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="grid h-9 w-9 place-items-center rounded-full text-crema transition-all hover:bg-mocha hover:text-foam disabled:opacity-30 active:scale-90"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-extrabold tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(12, q + 1))}
                disabled={qty >= 12}
                className="grid h-9 w-9 place-items-center rounded-full text-crema transition-all hover:bg-mocha hover:text-foam disabled:opacity-30 active:scale-90"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={cx(
                "flex min-w-44 flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all active:scale-95",
                added ? "bg-sage text-espresso" : "bg-caramel text-espresso hover:bg-honey"
              )}
            >
              {added ? (
                <>
                  <CheckIcon className="h-4 w-4" /> In your bag
                </>
              ) : (
                <>
                  <BagIcon className="h-4 w-4" /> Add {qty > 1 ? `${qty} ` : ""}to bag — {fmt(product.price * qty)}
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-xs text-crema/80">
            {product.weight} bag · roasted this Friday · ships within 48 hours of roasting
          </p>
        </div>
      </div>
    </div>
  );
}
