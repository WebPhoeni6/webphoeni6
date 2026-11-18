"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const GREY = "grayscale(1) contrast(1.1) brightness(0.9)";

/**
 * The portrait sits in grey. Where the pointer is, a soft circle of the real
 * colors shows through. Position and size are eased, so it follows with a little
 * weight and relaxes back to grey when the pointer leaves.
 * On a phone the same thing follows your finger: drag across the portrait or tap it. While your finger is
 * on the portrait the page does not scroll; swipe the text below it to scroll again. The spot stays where you leave it. Reduced-motion users get a
 * still spot of color instead, which costs nothing to run.
 */
export default function Portrait({ src, alt }: { src: string; alt: string }) {
  // Built-in files go through the optimizer. Dashboard uploads are served as they are.
  const optimize = src.startsWith("/") && !src.startsWith("/uploads/");
  const sizes = "(min-width: 768px) 52vw, 100vw";
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w0 = el.clientWidth;
    const h0 = el.clientHeight;
    const s = { x: w0 * 0.5, y: h0 * 0.3, r: 1, tx: w0 * 0.5, ty: h0 * 0.3, tr: 1 };
    const apply = () => {
      el.style.setProperty("--mx", `${s.x.toFixed(1)}px`);
      el.style.setProperty("--my", `${s.y.toFixed(1)}px`);
      el.style.setProperty("--r", `${Math.max(1, s.r).toFixed(1)}px`);
    };

    // Reduced motion: a still spot of color on the face, no animation loop at all.
    if (reduce) {
      s.r = w0 * 0.26;
      apply();
      return;
    }
    // Phones start with the spot on the face, and give it a short sweep once to show it can move.
    const timers: number[] = [];
    if (!fine) {
      s.r = s.tr = w0 * 0.26;
      timers.push(
        window.setTimeout(() => {
          s.tx = w0 * 0.3;
          wake();
        }, 700),
        window.setTimeout(() => {
          s.tx = w0 * 0.7;
          wake();
        }, 1500),
        window.setTimeout(() => {
          s.tx = w0 * 0.5;
          wake();
        }, 2300),
      );
    }
    apply();

    // Hover: ease toward the pointer, and stop the loop as soon as it has settled.
    let raf = 0;
    const tick = () => {
      s.x += (s.tx - s.x) * 0.16;
      s.y += (s.ty - s.y) * 0.16;
      s.r += (s.tr - s.r) * 0.1;
      apply();
      const settled = Math.abs(s.tx - s.x) < 0.3 && Math.abs(s.ty - s.y) < 0.3 && Math.abs(s.tr - s.r) < 0.3;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const touch = e.pointerType === "touch";
      if (!touch) el.dataset.hover = "true";
      timers.forEach(clearTimeout);
      const b = el.getBoundingClientRect();
      s.tx = e.clientX - b.left;
      s.ty = e.clientY - b.top;
      s.tr = el.clientWidth * (touch ? 0.26 : 0.3);
      wake();
    };
    const leave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // on a phone the spot stays where you left it
      s.tr = 1;
      el.dataset.hover = "false";
      wake();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerenter", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const mask = "radial-gradient(circle var(--r) at var(--mx) var(--my), #000 0%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)";

  return (
    <div ref={root} className="absolute inset-0 group cursor-none [@media(hover:none)]:cursor-auto [@media(hover:none)]:touch-none [-webkit-mask-image:linear-gradient(to_bottom,#000_62%,transparent_97%)] [mask-image:linear-gradient(to_bottom,#000_62%,transparent_97%)] md:[-webkit-mask-image:none] md:[mask-image:none]" style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%", ["--r" as string]: "1px" }}>
      {/* lens: a soft ring that follows the pointer, so it is clear the color is under your cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border border-white/80 opacity-0 shadow-[0_0_0_1px_rgba(0,0,0,0.25)] transition-[opacity,scale] duration-300 group-data-[hover=true]:scale-100 group-data-[hover=true]:opacity-100 md:block [@media(hover:none)]:hidden"
        style={{ left: "var(--mx)", top: "var(--my)" }}
      >
        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>

      {/* soft light behind the head so the dark hoodie separates from the page */}
      <div className="pointer-events-none absolute inset-x-[6%] bottom-[8%] top-[10%] hidden rounded-[50%] bg-white/[0.08] blur-3xl md:block" />

      <Image src={src} alt={alt} fill priority fetchPriority="high" quality={90} sizes={sizes} unoptimized={!optimize} draggable={false} className="select-none object-contain object-bottom" style={{ filter: GREY }} />

      {/* the same image in color, shown only inside the circle */}
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        quality={90}
        sizes={sizes}
        unoptimized={!optimize}
        draggable={false}
        className="pointer-events-none select-none object-contain object-bottom"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>
  );
}
