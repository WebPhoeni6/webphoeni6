"use client";

import { useRegion } from "./useRegion";
import type { Tier } from "@/lib/packages";

const naira = (n: number) => `₦${n.toLocaleString("en-US")}`;

/**
 * One tier's price. Naira is shown only to visitors in Nigeria and pounds only to visitors in the UK, decided from
 * their connection (/api/region), never picked by them. Everyone else is invited to ask for a quote, and nothing
 * is shown until we know.
 */
export default function TierPrice({ tier }: { tier: Tier }) {
  const region = useRegion();

  const box = "mt-8 flex min-h-[4.5rem] flex-col justify-end";

  if (tier.custom) {
    return (
      <div className={box}>
        <p className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Custom price</p>
        <p className="mt-1 text-[13px] opacity-60">Contact me and we&apos;ll scope it together</p>
      </div>
    );
  }

  if (region === null) {
    return (
      <div className={box} aria-hidden>
        <span className="h-9 w-40 animate-pulse rounded-lg bg-current opacity-10" />
      </div>
    );
  }

  if (region === "uk" && tier.uk) {
    return (
      <div className={box}>
        <p className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{`£${tier.uk.toLocaleString("en-GB")}`}</p>
      </div>
    );
  }

  if (region !== "ng" || !tier.price) {
    return (
      <div className={box}>
        <p className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">Message me for a quote</p>
      </div>
    );
  }

  const save = tier.was ? tier.was - tier.price : 0;
  return (
    <div className={box}>
      {tier.was ? (
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="text-[15px] line-through opacity-50">{naira(tier.was)}</span>
          <span className="rounded-full bg-ember px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111]">Save {naira(save)}</span>
        </div>
      ) : null}
      <p className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{naira(tier.price)}</p>
    </div>
  );
}
