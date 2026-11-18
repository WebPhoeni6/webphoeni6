"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Smooth, eased mouse-wheel scrolling with Lenis. Loaded after the page is interactive so it costs
 * nothing at start-up. Touch screens keep their native scrolling, and it stays off for people who ask
 * for reduced motion and on the dashboard and the print page.
 */
export default function SmoothScroll() {
  const path = usePathname();
  const off = path.startsWith("/admin") || path.startsWith("/brand");

  useEffect(() => {
    if (off || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let cancelled = false;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({
        lerp: 0.1, // how quickly it catches up: lower is floatier, higher is snappier
        wheelMultiplier: 1,
        smoothWheel: true,
        anchors: true, // #links like #work glide too
      });
      let raf = 0;
      const tick = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      stop = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = idle ? idle(start) : window.setTimeout(start, 400);
    return () => {
      cancelled = true;
      if (!idle) window.clearTimeout(id);
      stop();
    };
  }, [off]);

  return null;
}
