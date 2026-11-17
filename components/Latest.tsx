"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { updates } from "@/lib/updates";
import { useContent } from "./ContentProvider";
import { Reveal } from "./ui";

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
// The newest few get a "New" badge.
const NEW_COUNT = 3;

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
  <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
    <path d={dir === "l" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** A slider of what was added most recently, so returning visitors see something new straight away. */
export default function Latest() {
  const { projects } = useContent();
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0, ratio: 0.25 });

  const items = updates
    .map((u) => {
      if (u.poster) {
        const src = `/work/${u.poster}.webp`;
        const owner = projects.find((p) => p.poster && p.gallery.some((g) => g.src === src));
        if (!owner) return null;
        const i = owner.gallery.findIndex((g) => g.src === src);
        return { ...u, image: src, href: `/work/${owner.slug}?poster=${i + 1}` };
      }
      if (!u.image || !u.href) return null;
      return { ...u, image: u.image, href: u.href };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4, progress: max > 0 ? el.scrollLeft / max : 0, ratio: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, items.length]);

  const slide = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li")?.getBoundingClientRect().width ?? 220;
    el.scrollBy({ left: dir * (card + 16) * 2, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  const btn = "grid size-10 place-items-center rounded-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <Reveal className="mb-16 md:mb-24">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">Latest</span>
        <div className="flex gap-2">
          <button onClick={() => slide(-1)} disabled={edge.start} aria-label="Previous" className={btn}>
            <Arrow dir="l" />
          </button>
          <button onClick={() => slide(1)} disabled={edge.end} aria-label="Next" className={btn}>
            <Arrow dir="r" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={measure}
        aria-label="Latest uploads"
        className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {items.map((u, i) => (
          <li key={u.date + u.title} className="w-[58vw] shrink-0 snap-start sm:w-56 md:w-[19.5rem]">
            <Link href={u.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-[0_2px_18px_rgba(0,0,0,0.06)]">
                <Image src={u.image} alt="" fill sizes="(min-width: 768px) 312px, 58vw" className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
                {i < NEW_COUNT && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink py-1 pl-2 pr-2.5 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-white">
                    <svg viewBox="0 0 12 12" className="size-2.5 text-amber-300" aria-hidden>
                      <path d="M6 0l1.4 4.1L11.5 5.5 7.4 6.9 6 11 4.6 6.9.5 5.5l4.1-1.4z" fill="currentColor" />
                    </svg>
                    New
                  </span>
                )}
              </div>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45">
                {fmt(u.date)} · {u.label}
              </p>
              <p className="mt-1 text-[14px] font-medium leading-snug">{u.title}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div aria-hidden className="mt-5 h-0.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-ink" style={{ width: `${edge.ratio * 100}%`, transform: `translateX(${edge.progress * (1 / edge.ratio - 1) * 100}%)` }} />
      </div>
    </Reveal>
  );
}
