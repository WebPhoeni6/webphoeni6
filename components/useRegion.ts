"use client";

import { useEffect, useState } from "react";
import type { RegionId } from "@/lib/pricing";

/** Best guess from the browser's time zone, used only if the country lookup fails. */
function guessRegion(): RegionId {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Africa/Lagos") return "ng";
    if (tz === "Europe/London") return "uk";
  } catch {}
  return "us";
}

/**
 * Which price list this visitor gets, decided from their connection (/api/region), never picked by them.
 * Null until it is known, so nothing is shown in the wrong currency first.
 */
export function useRegion(): RegionId | null {
  const [region, setRegion] = useState<RegionId | null>(null);
  useEffect(() => {
    let live = true;
    fetch("/api/region", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { region: string | null }) => live && setRegion(j.region === "ng" || j.region === "uk" || j.region === "us" ? j.region : guessRegion()))
      .catch(() => live && setRegion(guessRegion()));
    return () => {
      live = false;
    };
  }, []);
  return region;
}
