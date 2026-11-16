"use client";

import Image from "next/image";
import { useState } from "react";
import { useContent } from "./ContentProvider";
import { ArrowUpRight, Reveal, SectionHead } from "./ui";

export default function Services() {
  const { services } = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="service" className="relative -mt-8 rounded-t-[2rem] bg-white px-5 pb-28 pt-16 md:px-10 md:pt-16">
      <SectionHead n="02" title="Services" />

      <ul className="relative">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.title}>
              <Reveal delay={i * 0.06}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`group relative block w-full text-left transition-colors duration-500 ${isOpen ? "rounded-xl bg-night text-white" : "border-b border-line"}`}
                >
                  <div className="flex items-center justify-between gap-4 px-4 py-6 md:px-8 md:py-8">
                    <span className="font-display text-[clamp(1.6rem,4.6vw,3.4rem)] font-medium uppercase leading-none tracking-tight transition-all duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4">
                      {s.title}
                    </span>
                    <span className={`shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] ${isOpen ? "rotate-90" : ""}`}>
                      {isOpen ? (
                        <svg viewBox="0 0 16 16" className="size-5 md:size-6" fill="none" aria-hidden>
                          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <ArrowUpRight className="size-5 md:size-7" />
                      )}
                    </span>
                  </div>

                  <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="flex min-h-36 items-end justify-between gap-6 px-4 pb-6 md:px-8 md:pb-8">
                        <p className="max-w-xs text-[13px] leading-relaxed text-white/60 md:text-sm">{s.text}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -top-10 right-12 hidden aspect-[16/11] w-56 overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition-all duration-700 ease-[var(--ease-out-expo)] sm:block md:right-24 md:w-72 ${
                      isOpen ? "translate-y-0 rotate-[5deg] scale-100 opacity-100" : "translate-y-5 rotate-0 scale-90 opacity-0"
                    }`}
                  >
                    <Image src={s.image} alt="" fill sizes="288px" className="object-cover" />
                  </div>
                </button>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
