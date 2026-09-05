import { useCallback, useEffect, useMemo, useState } from "react";
import { Category, Grind, Product, PRODUCTS } from "./data/products";
import { Reveal } from "./lib";
import { Header, Ticker } from "./components/Header";
import { Hero } from "./components/Hero";
import { Shop, SortKey } from "./components/Shop";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer, ResolvedLine } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { Footer } from "./components/Footer";
import { BagIcon, CupIcon, FlameIcon, TruckIcon } from "./components/icons";

interface CartEntry {
  qty: number;
  grind: Grind;
}

function AmbientBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 750px at 88% -8%, rgba(217,154,78,0.11), transparent 60%), radial-gradient(900px 700px at -12% 34%, rgba(192,95,51,0.09), transparent 55%), radial-gradient(800px 700px at 55% 112%, rgba(233,185,106,0.07), transparent 60%)",
          }}
        />
        <div className="ring-drift absolute -right-36 top-28 h-[26rem] w-[26rem] rounded-full border-[3px] border-foam/[0.05]" />
        <div className="ring-drift absolute -left-28 top-[52%] h-80 w-80 rounded-full border-2 border-foam/[0.05]" style={{ animationDelay: "-13s" }} />
        <div className="absolute bottom-[16%] right-[10%] h-44 w-44 rounded-full border border-foam/[0.06]" />
        <div className="absolute left-[18%] top-[14%] h-24 w-24 rounded-full border border-foam/[0.05]" />
      </div>
      <div className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.05]" aria-hidden />
    </>
  );
}

function RoasterySection() {
  return (
    <section id="roastery" className="relative scroll-mt-20 border-y border-foam/8 bg-roast/50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl border border-foam/10">
            <img
              src="https://image.qwenlm.ai/generated-images/4ea34f61-a945-4bb3-b23f-404269c34c0f/_result.png"
              alt="Inside the Nightjar roastery — the oak-fired drum roaster mid-batch"
              loading="lazy"
              className="kenburns aspect-[4/3] w-full object-cover"
            />
          </div>
          <span className="absolute -bottom-4 left-6 rounded-md bg-caramel px-4 py-2 text-xs font-bold uppercase tracking-wider text-espresso shadow-lg">
            Inside the roastery · SE Portland
          </span>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-caramel">Our craft</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Roasted by ear,
            <br />
            <em className="font-light italic text-honey">judged by the cup.</em>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-crema">
            Every Friday morning the 12-kilo drum fires up, and Mara and Den roast each lot the old way —
            by sound, smell, and feel. Nothing leaves the building until it's been cupped blind at 8 a.m.
            and scored against last week's roast. If it isn't better, it doesn't ship.
          </p>

          <ul className="mt-8 space-y-5">
            {[
              [FlameIcon, "Oak-fired drum roasting", "12 kg batches, developed slow for sweetness over bitterness."],
              [CupIcon, "Cupped blind every morning", "Every roast scored before a single bag is stamped."],
              [TruckIcon, "Ships within 48 hours", "Peak flavor lands on your doorstep, not in a warehouse."],
            ].map(([Icon, title, body]) => {
              const I = Icon as typeof FlameIcon;
              return (
                <li key={title as string} className="group flex gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-caramel/40 bg-caramel/10 text-caramel transition-all duration-300 group-hover:bg-caramel group-hover:text-espresso">
                    <I className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{title as string}</h3>
                    <p className="mt-0.5 text-sm text-crema">{body as string}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-9 border-l-2 border-caramel pl-5 font-display text-lg italic text-crema">
            “Coffee should taste like the place it grew — our job is just to not get in the way.”
            <span className="mt-1 block text-sm font-body not-italic font-bold text-caramel">
              — Mara Ellison & Den Okafor, head roasters
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [bump, setBump] = useState(0);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category>("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; key: number } | null>(null);

  /* ---------- derived ---------- */

  const lines: ResolvedLine[] = useMemo(
    () =>
      Object.entries(cart)
        .map(([key, entry]) => {
          const product = PRODUCTS.find((p) => p.id === key.split("__")[0]);
          return product ? { key, product, qty: entry.qty, grind: entry.grind } : null;
        })
        .filter((l): l is ResolvedLine => l !== null),
    [cart]
  );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const inCat =
        cat === "All" || (cat === "Blend" ? p.kind === "Blend" : p.roast === cat);
      if (!inCat) return false;
      if (!q) return true;
      return [p.name, p.origin, p.region, p.process, p.roast, ...p.notes]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "score") sorted.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    return sorted;
  }, [query, cat, sort]);

  /* ---------- cart actions ---------- */

  const showToast = useCallback((msg: string) => setToast({ msg, key: Date.now() }), []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2350);
    return () => window.clearTimeout(id);
  }, [toast]);

  const addToCart = useCallback(
    (p: Product, qty = 1, grind: Grind = "Whole bean") => {
      const key = `${p.id}__${grind}`;
      setCart((c) => ({
        ...c,
        [key]: { grind, qty: Math.min(12, (c[key]?.qty ?? 0) + qty) },
      }));
      setBump((b) => b + 1);
      showToast(`${qty > 1 ? `${qty} × ` : ""}${p.name} added to your bag`);
    },
    [showToast]
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((c) => ({ ...c, [key]: { ...c[key], qty: Math.min(12, Math.max(1, qty)) } }));
  }, []);

  const removeLine = useCallback((key: string) => {
    setCart((c) => {
      const next = { ...c };
      delete next[key];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const jumpCategory = useCallback((c: Category) => {
    setCat(c);
    setQuery("");
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ---------- overlay behavior ---------- */

  const anyOverlay = cartOpen || checkoutOpen || selected !== null;
  useEffect(() => {
    document.body.style.overflow = anyOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOverlay]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || checkoutOpen) return;
      if (selected) setSelected(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [checkoutOpen, selected, cartOpen]);

  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  /* ---------- render ---------- */

  return (
    <div id="top" className="relative min-h-screen">
      <AmbientBackground />

      <div className="relative z-10">
        <Ticker />
        <Header cartCount={count} bump={bump} onCartOpen={() => setCartOpen(true)} />

        <main>
          <Hero featured={PRODUCTS[0]} onView={setSelected} />
          <Shop
            products={visible}
            totalCount={PRODUCTS.length}
            query={query}
            onQuery={setQuery}
            cat={cat}
            onCat={setCat}
            sort={sort}
            onSort={setSort}
            onAdd={addToCart}
            onOpen={setSelected}
          />
          <RoasterySection />
        </main>

        <Footer onJumpCategory={jumpCategory} />
      </div>

      {/* ---------- overlays ---------- */}

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={(p, qty, grind) => addToCart(p, qty, grind)}
      />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeLine}
        onClear={clearCart}
        onCheckout={openCheckout}
        onBrowse={() => {
          setCartOpen(false);
          document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        subtotal={subtotal}
        onClose={() => setCheckoutOpen(false)}
        onComplete={clearCart}
      />

      {/* ---------- toast ---------- */}
      {toast && (
        <div
          key={toast.key}
          className="toast-in fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-caramel/40 bg-bark py-3 pl-5 pr-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
          role="status"
        >
          <BagIcon className="h-4.5 w-4.5 shrink-0 text-caramel" />
          <p className="whitespace-nowrap text-sm font-bold">{toast.msg}</p>
          <button
            onClick={() => {
              setToast(null);
              setCartOpen(true);
            }}
            className="shrink-0 rounded-full bg-caramel px-4 py-1.5 text-xs font-bold text-espresso transition-colors hover:bg-honey"
          >
            View bag
          </button>
        </div>
      )}

    </div>
  );
}
