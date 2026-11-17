"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import ShareButton from "./ShareButton";

type Item = { src: string; alt: string };

/**
 * Full-screen viewer. Swipe (touch or trackpad), arrow keys, the side buttons or the
 * thumbnails all move between items. Esc or a click on the backdrop closes it.
 * The track is a native scroll-snap row, so swiping is smooth and costs no JavaScript.
 */
export default function Lightbox({ slug, items, start, onClose }: { slug: string; items: Item[]; start: number; onClose: () => void }) {
  const [index, setIndex] = useState(start);
  const track = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const raf = useRef(0);

  const go = useCallback(
    (i: number, smooth = true) => {
      const el = track.current;
      if (!el) return;
      const next = Math.max(0, Math.min(items.length - 1, i));
      el.scrollTo({ left: next * el.clientWidth, behavior: smooth ? "smooth" : "instant" });
      setIndex(next);
    },
    [items.length],
  );

  // Open on the poster that was clicked, without animating there.
  useLayoutEffect(() => {
    const el = track.current;
    if (el) el.scrollTo({ left: start * el.clientWidth, behavior: "instant" });
  }, [start]);

  // Keyboard, scroll lock, and give focus to the close button.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(items.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, index, items.length, onClose]);

  // Keep the index in step with the swipe, and the active thumbnail in view.
  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = track.current;
      if (!el) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIndex((cur) => (cur === i ? cur : i));
    });
  };
  useEffect(() => {
    const t = thumbs.current?.children[index] as HTMLElement | undefined;
    t?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [index]);

  const nn = (n: number) => String(n).padStart(2, "0");

  return (
    <div role="dialog" aria-modal="true" aria-label="Poster viewer" className="fixed inset-0 z-50 flex flex-col bg-black/92 text-white backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60">
          {nn(index + 1)} / {nn(items.length)}
        </p>
        <div className="flex items-center gap-2">
        <ShareButton
          variant="icon"
          tone="dark"
          path={`/work/${slug}?poster=${index + 1}`}
          title={items[index]?.alt.replace(/ poster$/i, "") ?? "Poster"}
          text={`${items[index]?.alt.replace(/ poster$/i, "")}, a poster by Samuel Emeka`}
          image={items[index]?.src}
        />
        <button ref={closeBtn} onClick={onClose} aria-label="Close viewer" className="grid size-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-black">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div ref={track} onScroll={onScroll} className="no-scrollbar flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
          {items.map((it, i) => (
            <div key={it.src} className="relative size-full shrink-0 snap-center snap-always" onClick={(e) => e.target === e.currentTarget && onClose()}>
              <div className="absolute inset-x-4 inset-y-2 md:inset-x-24">
                <Image src={it.src} alt={it.alt} fill sizes="100vw" priority={i === start} className="select-none object-contain" draggable={false} />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous poster"
          className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/40 backdrop-blur transition-all hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-0 md:grid"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => go(index + 1)}
          disabled={index === items.length - 1}
          aria-label="Next poster"
          className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/40 backdrop-blur transition-all hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-0 md:grid"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="px-5 pb-5 pt-3 md:px-8">
        <p className="mb-3 truncate text-center text-[13px] text-white/70">{items[index]?.alt.replace(/ poster$/i, "")}</p>
        <div ref={thumbs} className="no-scrollbar mx-auto flex max-w-full gap-2 overflow-x-auto py-1 md:justify-center">
          {items.map((it, i) => (
            <button
              key={it.src}
              onClick={() => go(i)}
              aria-label={`Show ${it.alt}`}
              aria-current={i === index}
              className={`relative h-14 w-11 shrink-0 overflow-hidden rounded-md transition-all duration-300 md:h-16 md:w-[3.2rem] ${i === index ? "opacity-100 ring-2 ring-white" : "opacity-45 hover:opacity-80"}`}
            >
              <Image src={it.src} alt="" fill sizes="52px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
