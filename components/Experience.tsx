"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getProjectIn, useContent } from "./ContentProvider";
import { Cover, Reveal, SectionHead } from "./ui";

export default function Experience() {
  const { experience, projects } = useContent();
  const [hover, setHover] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void; r: (v: number) => void; last: number } | null>(null);

  // The preview follows the pointer with a little ease and tilt.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    move.current = {
      x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
      r: gsap.quickTo(el, "rotation", { duration: 0.5, ease: "power3.out" }),
      last: 0,
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative -mt-8 overflow-hidden rounded-t-[2rem] bg-night px-5 pb-24 pt-12 text-white md:px-10 md:pt-16"
      onPointerMove={(e) => {
        const m = move.current;
        if (!m) return;
        const r = e.currentTarget.getBoundingClientRect();
        const nx = e.clientX - r.left;
        m.r(Math.max(-9, Math.min(9, (nx - m.last) * 0.4)));
        m.last = nx;
        m.x(nx - 110);
        m.y(e.clientY - r.top - 130);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <SectionHead n="04" title="Experience" dark aside={`${experience.length} products`} />

      <ul className="relative">
        {experience.map((e, i) => (
          <li key={e.place}>
            <Reveal delay={i * 0.05}>
              <Link
                href={`/work/${e.slug}`}
                onPointerEnter={() => setHover(i)}
                className="flex items-start justify-between gap-6 border-b border-white/10 py-6 transition-opacity duration-500 md:py-7"
                style={{ opacity: hover === null || hover === i ? 1 : 0.28 }}
              >
                <div>
                  <p className="text-sm font-medium md:text-[15px]">{e.place}</p>
                  <p className="mt-1.5 text-[13px] text-white/55">{e.role}</p>
                </div>
                <p className="whitespace-nowrap text-[13px] text-white/55">{e.period}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div ref={box} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block">
        <div
          className={`relative aspect-[4/3] w-56 overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 ${
            hover === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {experience.map((e, i) => {
            const p = getProjectIn(projects, e.slug);
            return (
              <div key={e.slug} className={`absolute inset-0 transition-opacity duration-300 ${hover === i ? "opacity-100" : "opacity-0"}`}>
                {p && <Cover p={p} sizes="224px" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
