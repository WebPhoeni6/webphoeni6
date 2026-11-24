"use client";

import { regions } from "@/lib/pricing";
import { addOn } from "@/lib/packages";
import { useRegion } from "./useRegion";

/** The website add-on's starting price, in the visitor's own currency (see addOn.from). */
export default function AddOnPrice() {
  const region = useRegion();
  const r = regions.find((x) => x.id === region);
  const min = region ? addOn.from[region] : undefined;

  return (
    <p className="mt-5 flex min-h-9 items-baseline gap-2 font-display text-2xl font-semibold tracking-[-0.02em]">
      {min ? (
        <>
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] opacity-70">From</span>
          {r!.symbol}
          {min.toLocaleString("en-US")}
        </>
      ) : (
        <span aria-hidden className="h-7 w-36 animate-pulse rounded-lg bg-current opacity-10" />
      )}
    </p>
  );
}
