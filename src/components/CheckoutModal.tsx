import { FormEvent, useEffect, useState } from "react";
import { fmt } from "../data/products";
import { cx } from "../lib";
import { computeTotals, ResolvedLine } from "./CartDrawer";
import { BeanSolidIcon, CheckIcon, CloseIcon, FlameIcon } from "./icons";

type Step = "form" | "processing" | "success";

const EMPTY = {
  email: "",
  name: "",
  address: "",
  city: "",
  zip: "",
  card: "",
  exp: "",
  cvc: "",
};

export function CheckoutModal({
  open,
  lines,
  subtotal,
  onClose,
  onComplete,
}: {
  open: boolean;
  lines: ResolvedLine[];
  subtotal: number;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>("form");
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY, string>>>({});
  const [orderId, setOrderId] = useState("");

  const { shipping, total } = computeTotals(subtotal);

  useEffect(() => {
    if (open) {
      setStep("form");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "card") {
      v = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    if (k === "exp") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    }
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setFields((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) er.email = "Enter a valid email";
    if (fields.name.trim().length < 2) er.name = "Required";
    if (fields.address.trim().length < 4) er.address = "Enter a street address";
    if (!fields.city.trim()) er.city = "Required";
    if (!fields.zip.trim()) er.zip = "Required";
    if (fields.card.replace(/\s/g, "").length < 15) er.card = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(fields.exp)) er.exp = "MM/YY";
    if (fields.cvc.length < 3) er.cvc = "3–4 digits";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setOrderId(`NJ-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep("processing");
    window.setTimeout(() => {
      setStep("success");
      onComplete();
    }, 2100);
  };

  const inputCls = (err?: string) =>
    cx(
      "w-full rounded-lg border bg-espresso px-3.5 py-2.5 text-sm text-foam placeholder:text-crema/50 transition-colors focus:outline-none",
      err ? "border-ember/70" : "border-foam/15 focus:border-caramel/70"
    );

  const field = (k: keyof typeof EMPTY, label: string) => (
    <label className="block">
      <span className="mb-1.5 flex justify-between text-[10px] font-bold uppercase tracking-widest text-caramel">
        {label}
        {errors[k] && <span className="normal-case tracking-normal text-ember">{errors[k]}</span>}
      </span>
      <input
        value={fields[k]}
        onChange={set(k)}
        className={inputCls(errors[k])}
        placeholder={
          { email: "you@morning.com", name: "Sam Barista", address: "88 Roast Ave", city: "Portland", zip: "97209", card: "4242 4242 4242 4242", exp: "08/27", cvc: "123" }[k]
        }
        inputMode={k === "card" || k === "cvc" || k === "zip" || k === "exp" ? "numeric" : undefined}
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        className="absolute inset-0 bg-espresso/85 backdrop-blur-sm"
        onClick={step === "processing" ? undefined : onClose}
        aria-label="Close checkout"
      />
      <div className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-foam/12 bg-roast shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-xl">
        {step === "form" && (
          <>
            <div className="flex items-center justify-between border-b border-foam/10 px-6 py-5 sm:px-8">
              <h2 className="font-display text-2xl font-semibold">
                Checkout <span className="font-light italic text-crema">— almost there</span>
              </h2>
              <button
                onClick={onClose}
                className="rounded-full border border-foam/15 p-2 text-crema transition-all hover:rotate-90 hover:text-foam"
                aria-label="Close"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="grid gap-8 px-6 py-6 sm:px-8 md:grid-cols-[1fr_240px]">
              <div className="space-y-6">
                <fieldset className="space-y-3">
                  <legend className="mb-2 font-display text-lg font-semibold text-honey">Contact</legend>
                  {field("email", "Email")}
                </fieldset>
                <fieldset className="space-y-3">
                  <legend className="mb-2 font-display text-lg font-semibold text-honey">Ship to</legend>
                  {field("name", "Full name")}
                  {field("address", "Street address")}
                  <div className="grid grid-cols-2 gap-3">
                    {field("city", "City")}
                    {field("zip", "ZIP")}
                  </div>
                </fieldset>
                <fieldset className="space-y-3">
                  <legend className="mb-2 font-display text-lg font-semibold text-honey">Payment</legend>
                  {field("card", "Card number")}
                  <div className="grid grid-cols-2 gap-3">
                    {field("exp", "Expiry")}
                    {field("cvc", "CVC")}
                  </div>
                </fieldset>
              </div>

              <aside className="h-fit rounded-lg border border-foam/10 bg-espresso/60 p-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-caramel">Order summary</h3>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {lines.map((l) => (
                    <li key={l.key} className="flex justify-between gap-3">
                      <span className="text-crema">
                        <span className="font-bold text-foam">{l.qty}×</span> {l.product.name}
                      </span>
                      <span className="shrink-0 tabular-nums">{fmt(l.product.price * l.qty)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 space-y-1.5 border-t border-foam/10 pt-3 text-sm text-crema">
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className={cx(shipping === 0 && "font-bold text-honey")}>
                      {shipping === 0 ? "Free" : fmt(shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-foam">
                    <dt>Total</dt>
                    <dd className="font-display text-honey tabular-nums">{fmt(total)}</dd>
                  </div>
                </dl>
              </aside>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-caramel py-4 text-sm font-bold text-espresso transition-all hover:bg-honey hover:shadow-[0_12px_32px_-10px_rgba(217,154,78,0.7)] active:scale-[0.99]"
                >
                  Pay {fmt(total)} — place order
                </button>
                <p className="mt-3 text-center text-[11px] text-crema/70">
                  Simulated payment · no card is charged · no coffee is withheld
                </p>
              </div>
            </form>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center px-8 py-24 text-center">
            <div className="relative">
              <BeanSolidIcon className="spin-slow h-14 w-14 text-caramel" />
              <span className="drop-fall absolute -bottom-7 left-1/2 h-2.5 w-1.5 -translate-x-1/2 rounded-full bg-honey" />
            </div>
            <h2 className="mt-12 font-display text-2xl font-semibold">Steeping your order…</h2>
            <p className="mt-2 text-sm text-crema">Confirming payment and reserving your bags from Friday's roast.</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center px-8 py-16 text-center sm:py-20">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-sage/15 ring-1 ring-sage/50">
              <CheckIcon className="h-9 w-9 text-sage" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-caramel">Order confirmed</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              Thanks — <em className="font-light italic text-honey">order {orderId}</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-crema">
              A receipt is on its way to <span className="font-bold text-foam">{fields.email || "your inbox"}</span>.
              Your beans join Friday's roast and ship within 48 hours — peak flavor, zero warehouse time.
            </p>
            <p className="mt-5 flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-2 text-xs font-bold text-crema">
              <FlameIcon className="h-4 w-4 text-ember" /> Roast day: Friday, 9:00 AM PT
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-caramel px-8 py-3.5 text-sm font-bold text-espresso transition-all hover:bg-honey active:scale-95"
            >
              Back to the shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
