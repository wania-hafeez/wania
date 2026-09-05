import { fmt, FREE_SHIPPING_AT, Grind, Product, SHIPPING_FEE } from "../data/products";
import { cx } from "../lib";
import { ArrowIcon, BeanIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon } from "./icons";

export interface ResolvedLine {
  key: string;
  product: Product;
  qty: number;
  grind: Grind;
}

export function computeTotals(subtotal: number) {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  return { shipping, total: subtotal + shipping };
}

export function CartDrawer({
  open,
  lines,
  subtotal,
  onClose,
  onSetQty,
  onRemove,
  onClear,
  onCheckout,
  onBrowse,
}: {
  open: boolean;
  lines: ResolvedLine[];
  subtotal: number;
  onClose: () => void;
  onSetQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
  onCheckout: () => void;
  onBrowse: () => void;
}) {
  const { shipping, total } = computeTotals(subtotal);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const progress = Math.min(subtotal / FREE_SHIPPING_AT, 1);

  return (
    <div className={cx("fixed inset-0 z-[60]", !open && "pointer-events-none")} aria-hidden={!open}>
      <button
        className={cx(
          "absolute inset-0 bg-espresso/75 backdrop-blur-sm transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-label="Close bag"
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={cx(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-foam/12 bg-roast shadow-[-30px_0_80px_rgba(0,0,0,0.5)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shopping bag"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-foam/10 px-6 py-5">
          <h2 className="flex items-baseline gap-2.5 font-display text-2xl font-semibold">
            Your bag
            {count > 0 && (
              <span className="rounded-full bg-caramel px-2.5 py-0.5 text-xs font-bold tabular-nums text-espresso">
                {count}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-3">
            {lines.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs font-bold text-crema underline decoration-foam/30 underline-offset-4 transition-colors hover:text-ember"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full border border-foam/15 p-2 text-crema transition-all hover:rotate-90 hover:border-caramel/60 hover:text-foam"
              aria-label="Close bag"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-foam/20">
              <BeanIcon className="h-9 w-9 text-crema/40" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold">Nothing brewing yet.</h3>
            <p className="mt-2 text-sm text-crema">Your bag is empty — the shelf, however, is full.</p>
            <button
              onClick={onBrowse}
              className="mt-7 flex items-center gap-2 rounded-full bg-caramel px-6 py-3 text-sm font-bold text-espresso transition-all hover:bg-honey active:scale-95"
            >
              Browse the shelf <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            {/* shipping meter */}
            <div className="border-b border-foam/10 bg-espresso/50 px-6 py-4">
              {shipping === 0 ? (
                <p className="flex items-center gap-2 text-sm font-bold text-honey">
                  <CheckIcon className="h-4 w-4" /> Free shipping unlocked
                </p>
              ) : (
                <p className="flex items-center gap-2 text-sm text-crema">
                  <TruckIcon className="h-4.5 w-4.5 shrink-0 text-caramel" />
                  <span>
                    <span className="font-bold text-foam">{fmt(FREE_SHIPPING_AT - subtotal)}</span> away from
                    free shipping
                  </span>
                </p>
              )}
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-mocha">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember via-caramel to-honey transition-all duration-700 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* lines */}
            <ul className="flex-1 divide-y divide-foam/6 overflow-y-auto">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 px-6 py-5">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-22 w-20 shrink-0 rounded-lg border border-foam/10 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold leading-tight">{l.product.name}</h3>
                        <p className="mt-0.5 text-xs text-crema">{l.product.origin}</p>
                        <span className="mt-1.5 inline-block rounded-full border border-foam/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-crema">
                          {l.grind}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemove(l.key)}
                        className="rounded-full p-1.5 text-crema/60 transition-all hover:bg-ember/15 hover:text-ember active:scale-90"
                        aria-label={`Remove ${l.product.name}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-foam/12 p-0.5">
                        <button
                          onClick={() => onSetQty(l.key, l.qty - 1)}
                          disabled={l.qty <= 1}
                          className="grid h-7 w-7 place-items-center rounded-full text-crema transition-all hover:bg-mocha hover:text-foam disabled:opacity-30 active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-extrabold tabular-nums">{l.qty}</span>
                        <button
                          onClick={() => onSetQty(l.key, l.qty + 1)}
                          disabled={l.qty >= 12}
                          className="grid h-7 w-7 place-items-center rounded-full text-crema transition-all hover:bg-mocha hover:text-foam disabled:opacity-30 active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-extrabold tabular-nums">
                        {fmt(l.product.price * l.qty)}
                        <span className="ml-1.5 text-[11px] font-semibold text-crema">
                          ({fmt(l.product.price)} ea)
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* footer */}
            <div className="border-t border-foam/10 bg-espresso/60 px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-crema">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{fmt(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-crema">
                  <dt>Shipping</dt>
                  <dd className={cx("tabular-nums", shipping === 0 && "font-bold text-honey")}>
                    {shipping === 0 ? "Free" : fmt(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-foam/10 pt-3 text-base font-extrabold text-foam">
                  <dt>Total</dt>
                  <dd className="font-display text-xl tabular-nums text-honey">{fmt(total)}</dd>
                </div>
              </dl>
              <button
                onClick={onCheckout}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-caramel py-4 text-sm font-bold text-espresso transition-all hover:bg-honey hover:shadow-[0_12px_32px_-10px_rgba(217,154,78,0.7)] active:scale-[0.98]"
              >
                Check out
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 text-center text-[11px] text-crema/70">
                Demo checkout — no real payment is processed.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
