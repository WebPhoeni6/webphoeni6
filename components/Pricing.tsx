"use client";

import { useEffect, useMemo, useState } from "react";
import { bundle, pricing, pricingNote, regions, type Price, type PriceItem, type Region, type RegionId } from "@/lib/pricing";
import { useContent } from "./ContentProvider";
import { ArrowUpRight, Reveal, SectionHead } from "./ui";

const money = (r: Region, n: number) => `${r.symbol}${n.toLocaleString("en-US")}`;

/** The price as written on a card: "₦90,000", "₦20,000 – ₦30,000", with "from" handled by the caller. */
const priceText = (r: Region, p: Price) => (p.max ? `${money(r, p.min)} – ${money(r, p.max)}` : money(r, p.min));

/** Counts up to a number, so the total feels alive when the package changes. */
function useCountUp(target: number) {
  const [shown, setShown] = useState(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    let raf = 0;
    let from = 0;
    setShown((cur) => {
      from = cur;
      return cur;
    });
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 450);
      const eased = 1 - Math.pow(1 - k, 3);
      setShown(Math.round(from + (target - from) * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return shown;
}

/** A first guess at the visitor's region from their time zone. They can change it with the switch. */
function guessRegion(): RegionId {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Africa/")) return "ng";
    if (tz === "Europe/London" || tz === "Europe/Belfast") return "uk";
    return "us";
  } catch {
    return "ng";
  }
}

export default function Pricing() {
  const { profile } = useContent();
  const [regionId, setRegionId] = useState<RegionId>("ng");
  const [tab, setTab] = useState(pricing[0].id);
  const [picked, setPicked] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("pricing-region");
    } catch {}
    setRegionId(regions.some((r) => r.id === saved) ? (saved as RegionId) : guessRegion());
  }, []);

  const region = regions.find((r) => r.id === regionId) ?? regions[0];
  const group = pricing.find((g) => g.id === tab) ?? pricing[0];
  const all = useMemo(() => pricing.flatMap((g) => g.items), []);
  const items = picked.map((id) => all.find((i) => i.id === id)).filter(Boolean) as PriceItem[];

  const oneOff = items.filter((i) => !i.unit);
  const recurring = items.filter((i) => i.unit);
  const low = oneOff.reduce((s, i) => s + region.prices[i.id].min, 0);
  const high = oneOff.reduce((s, i) => s + (region.prices[i.id].max ?? region.prices[i.id].min), 0);
  const open = oneOff.some((i) => region.prices[i.id].from);
  const countedLow = useCountUp(low);
  const countedHigh = useCountUp(high);
  const totalText = open ? `from ${money(region, countedLow)}` : high > low ? `${money(region, countedLow)} – ${money(region, countedHigh)}` : money(region, countedLow);

  const bundlePrice = region.prices[bundle.id].min;
  const separate = bundle.replaces.reduce((s, id) => s + region.prices[id].min, 0);
  const saving = Math.max(0, separate - bundlePrice);
  const canSwap = saving > 0 && bundle.replaces.every((id) => picked.includes(id)) && !picked.includes(bundle.id);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const swapToBundle = () => setPicked((p) => [...p.filter((id) => !(bundle.replaces as readonly string[]).includes(id)), bundle.id]);
  const chooseRegion = (id: RegionId) => {
    setRegionId(id);
    try {
      localStorage.setItem("pricing-region", id);
    } catch {}
  };

  const message = [
    `Hi ${profile.firstName}, I'd like to talk about this package (${region.name} prices):`,
    ...items.map((i) => `- ${i.name}: ${priceText(region, region.prices[i.id])}${region.prices[i.id].from ? " and up" : ""}${i.unit ? ` ${i.unit}` : ""}`),
    oneOff.length ? `One-off total: ${open ? "from " : ""}${money(region, low)}${!open && high > low ? ` to ${money(region, high)}` : ""}` : "",
    "Is there room to negotiate?",
  ]
    .filter(Boolean)
    .join("\n");

  const wa = profile.socials.find((s) => /whatsapp/i.test(s.label) && s.href)?.href;
  const mail = profile.email ? `mailto:${profile.email}?subject=${encodeURIComponent("My package")}&body=${encodeURIComponent(message)}` : "/#contact";
  const copy = () => {
    try {
      navigator.clipboard?.writeText(message).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 6000);
      });
    } catch {}
  };

  return (
    <section id="pricing" className="relative -mt-8 rounded-t-[2rem] bg-paper px-5 pb-28 pt-16 text-ink md:px-10 md:pt-16">
      <SectionHead n="03" title="Pricing" aside={`In ${region.symbol === "₦" ? "naira" : region.symbol === "£" ? "pounds" : "dollars"}`} />

      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink/70 md:text-base">
            {pricingNote.negotiable} Tap <span className="font-semibold text-ink">Add</span> on anything you need and I'll add it up for you.
          </p>
          <div role="group" aria-label="Where are you based?" className="flex w-fit shrink-0 rounded-full bg-card p-1 ring-1 ring-line">
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => chooseRegion(r.id)}
                aria-pressed={r.id === regionId}
                title={r.name}
                className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-colors duration-300 ${r.id === regionId ? "bg-ember text-[#111]" : "text-ink/60 hover:text-ink"}`}
              >
                {r.short} <span className="opacity-70">{r.symbol}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Category tabs */}
      <div role="tablist" aria-label="Services" className="mt-10 flex gap-2 overflow-x-auto px-1 pb-1 pt-2 [scrollbar-width:none] md:mt-14 [&::-webkit-scrollbar]:hidden">
        {pricing.map((g) => {
          const n = g.items.filter((i) => picked.includes(i.id)).length;
          const on = g.id === tab;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={on}
              onClick={() => setTab(g.id)}
              className={`relative shrink-0 rounded-full px-5 py-3 text-[13px] font-semibold transition-all duration-300 ${on ? "bg-ink text-paper" : "bg-card text-ink/70 ring-1 ring-line hover:text-ink"}`}
            >
              {g.title}
              {n > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-ember text-[10px] font-bold text-[#111]">{n}</span>}
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-[13px] text-ink/55">{group.blurb}</p>

      {/* Cards */}
      <div key={`${tab}-${regionId}`} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((it, i) => {
          const price = region.prices[it.id];
          const on = picked.includes(it.id);
          const featured = !!it.best;
          return (
            <div
              key={it.id}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
              className={`price-in group relative flex flex-col overflow-hidden rounded-2xl p-6 ring-1 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 md:p-7 ${
                on ? "bg-ember/10 ring-2 ring-ember" : featured ? "bg-card ring-2 ring-ember/60" : "bg-card ring-line hover:ring-ink/25"
              }`}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,79,26,0.18),transparent_70%)]" />
              <div className="relative flex min-h-6 items-center justify-between gap-3">
                <p className="text-[15px] font-semibold md:text-base">{it.name}</p>
                {featured && (
                  <span className="shrink-0 rounded-full bg-ember px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#111]">
                    {saving > 0 ? `Save ${money(region, saving)}` : "Best value"}
                  </span>
                )}
              </div>
              <p className="relative mt-3 flex-1 text-[13px] leading-relaxed text-ink/60 md:text-sm">{it.text}</p>
              <p className="relative mt-6">
                {price.from && <span className="mr-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">from</span>}
                <span className="font-display text-[clamp(1.1rem,1.65vw,1.4rem)] font-bold tracking-[-0.02em]">{priceText(region, price)}</span>
                {it.unit && <span className="ml-1.5 text-[12px] text-ink/50">{it.unit}</span>}
              </p>
              <button
                onClick={() => toggle(it.id)}
                aria-pressed={on}
                className={`relative mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold transition-all duration-300 active:scale-95 ${on ? "bg-ink text-paper" : "bg-ember text-[#111] hover:scale-[1.03]"}`}
              >
                {on ? (
                  <>
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                      <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Added
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    Add to my package
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Package tray */}
      {items.length > 0 && (
        <div className="price-in sticky bottom-4 z-20 mr-14 mt-8 rounded-2xl bg-night p-4 text-white shadow-[0_24px_60px_-18px_rgba(0,0,0,0.6)] ring-1 ring-white/10 md:mr-16 md:p-6">
          {canSwap && (
            <button onClick={swapToBundle} className="mb-4 flex w-full items-center justify-between gap-3 rounded-xl bg-ember px-4 py-3 text-left text-[13px] font-semibold text-[#111] transition-transform hover:scale-[1.01]">
              <span>Buying both? The Brand and website bundle saves you {money(region, saving)}.</span>
              <span className="shrink-0 underline underline-offset-2">Switch</span>
            </button>
          )}
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Your package · {items.length} {items.length === 1 ? "item" : "items"}
              </p>
              <div className="mt-2 hidden flex-wrap gap-2 md:flex">
                {items.map((i) => (
                  <button key={i.id} onClick={() => toggle(i.id)} aria-label={`Remove ${i.name}`} className="group/chip inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] transition-colors hover:bg-white/20">
                    {i.name}
                    <span className="text-white/50 transition-colors group-hover/chip:text-white">×</span>
                  </button>
                ))}
              </div>
              {recurring.length > 0 && (
                <p className="mt-2 text-[12px] text-white/55">
                  Plus {recurring.map((i) => `${priceText(region, region.prices[i.id])} ${i.unit}`).join(", ")}
                </p>
              )}
            </div>
            <div className="shrink-0 md:text-right">
              {oneOff.length > 0 && (
                <>
                  <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-none tracking-[-0.02em] tabular-nums">{totalText}</p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/50">One-off · open to negotiation</p>
                </>
              )}
              <div className="mt-3 flex gap-2 md:mt-4 md:justify-end">
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    onClick={copy}
                    className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ember px-4 py-3 text-[13px] font-semibold text-[#111] transition-transform hover:scale-[1.04] md:px-5"
                  >
                    Send on WhatsApp
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : null}
                <a href={mail} className="inline-flex items-center whitespace-nowrap rounded-full bg-white/10 px-4 py-3 md:px-5 text-[13px] font-semibold transition-colors hover:bg-white/20">
                  {wa ? "Email it" : "Send by email"}
                </a>
              </div>
              {copied && <p className="mt-2 text-[12px] text-white/70">Copied. Paste it in the chat when WhatsApp opens.</p>}
            </div>
          </div>
        </div>
      )}

      <Reveal>
        <p className="mt-12 max-w-2xl text-[13px] leading-relaxed text-ink/55">
          {region.note} Working from another country? Message me and I'll send a quote.
        </p>
      </Reveal>
    </section>
  );
}
