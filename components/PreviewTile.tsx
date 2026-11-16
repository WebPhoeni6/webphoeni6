"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/lib/content";

const DWELL = 1100; // ms of hovering before the frame opens
const SPEED = 640; // page pixels per second

/**
 * Wraps a project cover. Hover for a moment and a small browser frame opens over
 * the tile showing the full page. Move the mouse down and the page scrolls down
 * slowly to the end; move it up and it scrolls back up. The direction latches, so
 * it keeps going until the mouse reverses.
 */
export default function PreviewTile({ p, children }: { p: Project; children: React.ReactNode }) {
  const pv = p.preview!;
  const [phase, setPhase] = useState<"idle" | "wait" | "open">("idle");
  const [hint, setHint] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const win = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const st = useRef({ pos: 0, v: 0, dir: 0, lastY: 0, scale: 0.4, max: 0, open: false });

  // One ticker drives the scroll so it stays smooth and frame-rate independent.
  useEffect(() => {
    const tick = (_t: number, dtMs: number) => {
      const s = st.current;
      if (!s.open || !page.current) return;
      const dt = Math.min(dtMs, 50) / 1000;
      s.v += (s.dir * SPEED - s.v) * Math.min(1, dt * 5); // ease toward the target speed
      s.pos = Math.min(s.max, Math.max(0, s.pos + s.v * dt));
      page.current.style.transform = `translate3d(0,${-s.pos * s.scale}px,0) scale(${s.scale})`;
      if (bar.current) bar.current.style.transform = `scaleX(${s.max ? s.pos / s.max : 0})`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // Open / close the frame
  useEffect(() => {
    const s = st.current;
    if (phase === "open" && view.current && win.current) {
      s.scale = view.current.clientWidth / 1440;
      s.max = Math.max(0, pv.height - view.current.clientHeight / s.scale);
      s.pos = 0;
      s.v = 0;
      s.dir = 0;
      s.open = true;
      if (page.current) page.current.style.transform = `translate3d(0,0,0) scale(${s.scale})`;
      gsap.fromTo(win.current, { opacity: 0, y: 26, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" });
    } else {
      s.open = false;
    }
  }, [phase, pv.height]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="absolute inset-0"
      onPointerEnter={(e) => {
        if (!canHover()) return;
        st.current.lastY = e.clientY;
        setPhase("wait");
        timer.current = setTimeout(() => setPhase("open"), DWELL);
      }}
      onPointerLeave={() => {
        clearTimeout(timer.current);
        setPhase("idle");
        setHint(true);
      }}
      onPointerMove={(e) => {
        const s = st.current;
        const dy = e.clientY - s.lastY;
        s.lastY = e.clientY;
        if (!s.open || Math.abs(dy) < 0.6) return;
        s.dir = dy > 0 ? 1 : -1;
        setHint(false);
      }}
    >
      {children}

      <div className={`pointer-events-none absolute inset-0 bg-black/50 transition-opacity duration-500 ${phase === "open" ? "opacity-100" : "opacity-0"}`} />

      {phase === "wait" && (
        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 overflow-hidden rounded-full bg-ink/85 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
          <span className="relative z-10">Opening live preview</span>
          <span className="dwell-bar absolute inset-y-0 left-0 bg-white/20" style={{ animationDuration: `${DWELL}ms` }} />
        </div>
      )}

      {phase === "open" && (
        <div
          ref={win}
          className="pointer-events-none absolute inset-x-[7%] inset-y-[8%] flex flex-col overflow-hidden rounded-xl bg-white opacity-0 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)] ring-1 ring-black/10"
        >
          <div className="relative flex h-6 shrink-0 items-center gap-1.5 bg-[#f1f1ef] px-2.5">
            <span className="size-1.5 rounded-full bg-[#ff5f57]" />
            <span className="size-1.5 rounded-full bg-[#febc2e]" />
            <span className="size-1.5 rounded-full bg-[#28c840]" />
            <span className="absolute left-1/2 -translate-x-1/2 rounded bg-white px-3 py-px text-[9px] text-ink/55">
              {pv.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </span>
            <div ref={bar} className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink/60" />
          </div>
          <div ref={view} className="relative min-h-0 flex-1 overflow-hidden">
            <div ref={page} className="absolute left-0 top-0 origin-top-left will-change-transform" style={{ width: 1440, height: pv.height }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pv.image} alt="" draggable={false} className="block size-full select-none" />
            </div>
          </div>
          {hint && (
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/85 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur">
              Move your mouse down to scroll, up to go back
            </span>
          )}
        </div>
      )}
    </div>
  );
}
