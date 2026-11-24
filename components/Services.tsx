"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useContent } from "./ContentProvider";
import { ArrowUpRight, Reveal, SectionHead } from "./ui";
import { Blob, BuildArt, GridPattern } from "./Art";

export default function Services({ n = "02", cta = false }: { n?: string; cta?: boolean }) {
  const { services } = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="service" className="relative -mt-8 rounded-t-[2rem] bg-card px-5 pb-28 pt-16 md:px-10 md:pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[2rem]">
        <GridPattern className="inset-0" />
        <Blob className="-right-24 top-0 w-[24rem] text-ember opacity-[0.07] md:-right-8 md:w-[32rem]" />
      </div>
      {cta && <BuildArt className="absolute right-4 top-6 z-0 w-28 sm:w-40 md:right-12 md:top-2 md:w-60" delay={0.15} />}
      <SectionHead n={n} title="Services" />

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
                    <span className="font-display text-[clamp(1.12rem,3.22vw,2.38rem)] font-medium uppercase leading-none tracking-[-0.02em] transition-all duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4">
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

      {cta && (
        <Reveal className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[14px] leading-relaxed text-ink/65">Websites, brands and apps, each with a clear price. See what is included and build your own package on the pricing page.</p>
          <Link href="/services#pricing" className="group inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 text-[14px] font-medium text-[#111] transition-transform hover:scale-[1.04]">
            See full pricing
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      )}
    </section>
  );
}
