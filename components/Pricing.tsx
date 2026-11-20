"use client";

import { useEffect, useMemo, useState } from "react";
import { bundle, pricing, pricingNote, regions, type Price, type PriceItem, type Region, type RegionId } from "@/lib/pricing";
import { useContent } from "./ContentProvider";
import { ArrowUpRight, Reveal, SectionHead } from "./ui";

const money = (r: Region, n: number) => `${r.symbol}${n.toLocaleString("en-US")}`;

/** The price as written on a card: "₦90,000" or "₦20,000 – ₦30,000". "from" is added by the caller. */
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
      setShown(Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return shown;
}

/** Only used when the server can't tell where the visitor is (local development, or an unplaceable connection). */
function guessRegion(): RegionId {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Africa/Lagos") return "ng";
    if (tz === "Europe/London" || tz === "Europe/Belfast") return "uk";
  } catch {}
  return "us";
}

export default function Pricing() {
  const { profile } = useContent();
  // The price list is chosen for the visitor from their country (see /api/region), never by them. Until it is
  // known, nothing with a price is shown, so nobody outside Nigeria ever sees naira, not even for a moment.
  const [regionId, setRegionId] = useState<RegionId | null>(null);
  const [tab, setTab] = useState(pricing[0].id);
  const [picked, setPicked] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let live = true;
    const done = (id: RegionId) => live && setRegionId(id);
    fetch("/api/region", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { region: RegionId | null }) => done(regions.some((r) => r.id === j.region) ? (j.region as RegionId) : guessRegion()))
      .catch(() => done(guessRegion()));
    return () => {
      live = false;
    };
  }, []);

  const region = regions.find((r) => r.id === regionId) ?? null;
  const group = pricing.find((g) => g.id === tab) ?? pricing[0];
  const all = useMemo(() => pricing.flatMap((g) => g.items), []);
  const items = picked.map((id) => all.find((i) => i.id === id)).filter(Boolean) as PriceItem[];

  const oneOff = items.filter((i) => !i.unit);
  const recurring = items.filter((i) => i.unit);
  const low = region ? oneOff.reduce((s, i) => s + region.prices[i.id].min, 0) : 0;
  const high = region ? oneOff.reduce((s, i) => s + (region.prices[i.id].max ?? region.prices[i.id].min), 0) : 0;
  const open = region ? oneOff.some((i) => region.prices[i.id].from) : false;
  const countedLow = useCountUp(low);
  const countedHigh = useCountUp(high);
  const totalText = !region ? "" : open ? `from ${money(region, countedLow)}` : high > low ? `${money(region, countedLow)} – ${money(region, countedHigh)}` : money(region, countedLow);

  const saving = region ? Math.max(0, bundle.replaces.reduce((s, id) => s + region.prices[id].min, 0) - region.prices[bundle.id].min) : 0;
  const canSwap = saving > 0 && bundle.replaces.every((id) => picked.includes(id)) && !picked.includes(bundle.id);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const swapToBundle = () => setPicked((p) => [...p.filter((id) => !(bundle.replaces as readonly string[]).includes(id)), bundle.id]);

  const message = region
    ? [
        `Hi ${profile.firstName}, I'd like to talk about this package:`,
        ...items.map((i) => `- ${i.name}: ${priceText(region, region.prices[i.id])}${region.prices[i.id].from ? " and up" : ""}${i.unit ? ` ${i.unit}` : ""}`),
        oneOff.length ? `One-off total: ${open ? "from " : ""}${money(region, low)}${!open && high > low ? ` to ${money(region, high)}` : ""}` : "",
        "Is there room to negotiate?",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

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

  const currencyName = region ? (region.symbol === "₦" ? "naira" : region.symbol === "£" ? "pounds" : "dollars") : "";

  return (
    <section id="pricing" className="relative -mt-8 rounded-t-[2rem] bg-paper px-5 pb-28 pt-16 text-ink md:px-10 md:pt-16">
      <SectionHead n="03" title="Pricing" aside={region ? `In ${currencyName}` : undefined} />

      <Reveal>
        <p className="max-w-xl text-[15px] leading-relaxed text-ink/70 md:text-base">
          {pricingNote.negotiable} Tap <span className="font-semibold text-ink">Add</span> on anything you need and I'll add it up for you.
        </p>
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

      {/* Cards. While the visitor's country is being worked out, grey placeholders hold the space. */}
      {!region ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
          {group.items.map((it) => (
            <div key={it.id} className="h-[17rem] animate-pulse rounded-2xl bg-card ring-1 ring-line" />
          ))}
        </div>
      ) : (
        <div key={tab} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      )}

      {/* Package bar: sits above the back-to-top button on phones. */}
      {region && items.length > 0 && (
        <div className="price-in sticky bottom-[4.75rem] z-20 mt-8 overflow-hidden rounded-2xl bg-night text-white shadow-[0_24px_60px_-18px_rgba(0,0,0,0.6)] ring-1 ring-white/10 md:bottom-4 md:mr-16">
          {canSwap && (
            <button onClick={swapToBundle} className="flex w-full items-center justify-between gap-3 bg-ember px-5 py-3 text-left text-[12.5px] font-semibold leading-snug text-[#111] transition-colors hover:bg-[#ff6a3a] md:text-[13px]">
              <span>Buying both? The Brand and website bundle saves you {money(region, saving)}.</span>
              <span className="shrink-0 rounded-full bg-[#111] px-3 py-1.5 text-[11px] text-white">Switch</span>
            </button>
          )}
          <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:p-6">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Your package · {items.length} {items.length === 1 ? "item" : "items"}
              </p>
              <p className="mt-2 font-display text-[clamp(1.6rem,6.5vw,2.3rem)] font-bold leading-none tracking-[-0.02em] tabular-nums">{oneOff.length > 0 ? totalText : "Monthly only"}</p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/50">{oneOff.length > 0 ? "One-off · open to negotiation" : "Open to negotiation"}</p>
              <div className="mt-3 hidden flex-wrap gap-2 md:flex">
                {items.map((i) => (
                  <button key={i.id} onClick={() => toggle(i.id)} aria-label={`Remove ${i.name}`} className="group/chip inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] transition-colors hover:bg-white/20">
                    {i.name}
                    <span className="text-white/50 transition-colors group-hover/chip:text-white">×</span>
                  </button>
                ))}
              </div>
              {recurring.length > 0 && (
                <p className="mt-2 text-[12px] text-white/55">Plus {recurring.map((i) => `${priceText(region, region.prices[i.id])} ${i.unit}`).join(", ")}</p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-2 gap-2.5 md:flex">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    onClick={copy}
                    className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-ember px-5 py-3.5 text-[13px] font-semibold text-[#111] transition-transform hover:scale-[1.04]"
                  >
                    <span className="md:hidden">WhatsApp</span>
                    <span className="hidden md:inline">Send on WhatsApp</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                <a href={mail} className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white/10 px-5 py-3.5 text-[13px] font-semibold transition-colors hover:bg-white/20">
                  Email it
                </a>
              </div>
              {copied && <p className="mt-2.5 text-[12px] text-white/70">Copied. Paste it in the chat when WhatsApp opens.</p>}
            </div>
          </div>
        </div>
      )}

      {region && (
        <Reveal>
          <p className="mt-12 max-w-2xl text-[13px] leading-relaxed text-ink/55">{region.note} Working from another country? Message me and I'll send a quote.</p>
        </Reveal>
      )}
    </section>
  );
}
