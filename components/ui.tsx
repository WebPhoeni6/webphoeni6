"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import type { Project } from "@/lib/content";

export const ease = [0.16, 1, 0.3, 1] as const;

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LiveDot() {
  return (
    <span className="relative flex size-2.5 shrink-0 items-center justify-center">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-live shadow-[0_0_0_2px_rgba(34,197,94,0.25)]" />
    </span>
  );
}

/** Fades and lifts its children into view once. Plain CSS plus one observer, no animation library. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--ry": `${y}px`, "--rd": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

/** Section heading in the brand-PDF style: tiny numbered label, big tight title. */
export function SectionHead({
  n,
  title,
  dark = false,
  aside,
}: {
  n: string;
  title: string;
  dark?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <div className="pb-12 pt-4 md:pb-16">
      <Reveal className={`flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/45" : "text-ink/50"}`}>
        <span>
          {n} / {title}
        </span>
        {aside && <span>{aside}</span>}
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.92] tracking-[-0.05em]">{title}</h2>
      </Reveal>
    </div>
  );
}

/**
 * A project's cover. Uses the image when there is one and otherwise draws a
 * typographic card so every project still looks intentional.
 */
export function Cover({ p, sizes = "(min-width: 768px) 50vw, 100vw", priority = false }: { p: Project; sizes?: string; priority?: boolean }) {
  if (!p.cover) {
    return (
      <div className="relative flex size-full flex-col justify-between overflow-hidden p-6 text-white" style={{ background: p.coverBg ?? "#1c1c1c" }}>
        <div className="absolute -right-10 -top-10 size-56 rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-16 left-10 size-64 rounded-full bg-white/[0.04]" />
        <span className="relative text-[11px] uppercase tracking-[0.2em] text-white/50">{p.kind}</span>
        <span className="relative font-display text-5xl font-extrabold tracking-tight">{p.title.split(": ")[0].toLowerCase()}</span>
      </div>
    );
  }
  const contain = p.coverFit === "contain";
  return (
    <div className="relative size-full" style={{ background: p.coverBg }}>
      <Image
        src={p.cover}
        alt={p.title}
        fill
        sizes={sizes}
        priority={priority}
        className={contain ? `object-contain ${p.coverPad ? "p-[18%]" : ""}` : "object-cover"}
      />
    </div>
  );
}
