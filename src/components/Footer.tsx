import { FormEvent, useState } from "react";
import { Category } from "../data/products";
import { BeanSolidIcon, CheckIcon, MailIcon, PinIcon } from "./icons";

export function Footer({ onJumpCategory }: { onJumpCategory: (c: Category) => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr(true);
      return;
    }
    setDone(true);
  };

  return (
    <footer id="visit" className="relative scroll-mt-20 border-t border-foam/10 bg-roast/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* newsletter */}
        <div className="grid gap-10 border-b border-foam/10 pb-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-caramel">The Nightjar letter</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              First pour's <em className="font-light italic text-honey">on us.</em>
            </h2>
            <p className="mt-3 max-w-md text-crema">
              Roast-day reminders, new-lot drops, and the occasional brew-nerd deep dive. One email a
              week, never more.
            </p>
          </div>
          {done ? (
            <p className="flex items-center gap-3 justify-self-start rounded-xl border border-sage/40 bg-sage/10 px-6 py-5 font-semibold text-sage lg:justify-self-end">
              <CheckIcon className="h-5 w-5" /> You're on the list — see you Friday.
            </p>
          ) : (
            <form onSubmit={subscribe} className="w-full max-w-md lg:justify-self-end">
              <div className="flex gap-2 rounded-full border border-foam/15 bg-espresso p-1.5 transition-colors focus-within:border-caramel/70">
                <label className="relative flex-1">
                  <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-crema" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErr(false);
                    }}
                    placeholder="you@morning.com"
                    className="w-full bg-transparent py-2.5 pl-10 pr-3 text-sm text-foam placeholder:text-crema/50 focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-full bg-caramel px-6 py-2.5 text-sm font-bold text-espresso transition-all hover:bg-honey active:scale-95"
                >
                  Sign up
                </button>
              </div>
              {err && <p className="mt-2 pl-4 text-xs font-bold text-ember">That email doesn't look quite brewed — try again?</p>}
            </form>
          )}
        </div>

        {/* columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-caramel text-espresso">
                <BeanSolidIcon className="h-4.5 w-4.5" />
              </span>
              <span className="font-display text-xl font-semibold">Nightjar</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-crema">
              A small roastery in Southeast Portland, buying directly from 27 farms and roasting every
              bean over oak — because coffee this fresh shouldn't be a luxury.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-caramel">The shelf</h3>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-crema">
              {(["Light", "Medium", "Dark", "Blend"] as Category[]).map((c) => (
                <li key={c}>
                  <button
                    onClick={() => onJumpCategory(c)}
                    className="transition-colors hover:text-honey"
                  >
                    {c === "Blend" ? "House blend" : `${c} roasts`}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-caramel">Visit</h3>
            <address className="mt-4 space-y-2.5 text-sm not-italic font-semibold text-crema">
              <p className="flex gap-2">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                2140 SE Belmont St
                <br />
                Portland, OR 97214
              </p>
              <p>Mon – Fri · 7am – 4pm</p>
              <p>Sat – Sun · 8am – 5pm</p>
            </address>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-caramel">Say hello</h3>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-crema">
              <li>
                <a href="mailto:hello@nightjarcoffee.co" className="transition-colors hover:text-honey">
                  hello@nightjarcoffee.co
                </a>
              </li>
              <li>(503) 555-0119</li>
              <li>@nightjarcoffee</li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-foam/10 pt-7 text-xs text-crema/70 sm:flex-row">
          <p>© 2026 Nightjar Coffee Co. Roasted with patience in Portland, OR.</p>
          <p className="flex items-center gap-2">
            <BeanSolidIcon className="h-3.5 w-3.5 text-caramel" />
            Demo storefront — orders are simulated, the enthusiasm is real.
          </p>
        </div>
      </div>
    </footer>
  );
}
