"use client";

import { regions } from "@/lib/pricing";
import { useRegion } from "./useRegion";

/** The website add-on costs the same as a business website on the services page, in the visitor's own currency. */
export default function AddOnPrice() {
  const region = useRegion();
  const r = regions.find((x) => x.id === region);
  const min = r?.prices["business-site"]?.min;

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
