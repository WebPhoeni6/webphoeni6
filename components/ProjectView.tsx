"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import type { Project } from "@/lib/content";
import ContactLink from "./ContactLink";
import { ArrowUpRight, Cover, Reveal } from "./ui";
import BrandCase from "./BrandCase";

// Loaded only when a poster is opened, so it adds nothing to the page weight.
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

export default function ProjectView({ p, next }: { p: Project; next: Project }) {
  const [viewer, setViewer] = useState<number | null>(null);
  // A shared poster link (?poster=3) opens the viewer on that poster.
  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("poster"));
    if (p.poster && n >= 1 && n <= p.gallery.length) setViewer(n - 1);
  }, [p.poster, p.gallery.length]);
  const [name, ...rest] = p.title.split(": ");
  const sub = rest.join(": ");

  return (
    <main className="anim-up mx-auto max-w-[1600px] bg-paper">
      <Nav tone="light" />

      <section className="grid gap-10 px-5 pb-16 pt-32 md:grid-cols-[1.4fr_1fr] md:px-10 md:pt-40">
        <div>
          <Reveal className="flex flex-wrap gap-2">
            <span className="rounded-full bg-card px-3 py-1.5 text-[11px] font-medium shadow-[0_1px_6px_rgba(0,0,0,0.05)]">{p.category}</span>
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-card px-3 py-1.5 text-[11px] font-medium shadow-[0_1px_6px_rgba(0,0,0,0.05)]">{t}</span>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[clamp(1.82rem,4.9vw,3.85rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              {name}
              <span className="ml-3 align-baseline text-sm font-normal tracking-normal text-ink/45 md:text-base">/{p.kind}</span>
            </h1>
            {sub && <p className="mt-3 font-display text-xl text-ink/60">{sub}</p>}
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-ink/60 md:text-sm">{p.description}</p>
          </Reveal>
          {p.highlights && p.highlights.length > 0 && (
            <Reveal delay={0.2} className="mt-10 max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">What I built</p>
              <ul className="mt-4 space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[13px] leading-relaxed text-ink/70 md:text-sm">
                    <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink/40" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={0.24} className="mt-8 flex gap-2.5">
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-paper transition-transform hover:scale-[1.04]">
                Live Preview
                <ArrowUpRight className="size-3" />
              </a>
            )}
            <ContactLink className="rounded-full bg-card px-4 py-2.5 text-xs font-medium shadow-[0_1px_8px_rgba(0,0,0,0.06)] transition-transform hover:scale-[1.04]">
              Contact Me
            </ContactLink>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex flex-col gap-6 text-sm md:items-end md:text-right">
          {p.role && <Meta label="Role" value={p.role} />}
          <Meta label="Services" value={p.services} />
          <Meta label="Timeline" value={p.timeline} />
          <div className="md:text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-mute">Tools</p>
            <div className="mt-2 flex flex-wrap gap-1.5 md:justify-end">
              {p.tools.map((t) => (
                <span key={t} className="rounded-md bg-card px-2.5 py-1 text-[11px] font-medium shadow-[0_1px_6px_rgba(0,0,0,0.05)]">{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {p.brand ? <BrandCase p={p} /> : (
      <section
        className={
          p.poster
            ? `mx-auto grid gap-3 px-5 pb-24 md:gap-4 md:px-10 ${
                p.gallery.length === 1 ? "max-w-xs" : p.gallery.length === 2 ? "max-w-2xl grid-cols-2" : "max-w-5xl grid-cols-2 md:grid-cols-3"
              }`
            : "mx-auto grid max-w-5xl gap-6 px-5 pb-24 md:px-10"
        }
      >
        {p.gallery.length === 0 && (
          <Reveal>
            <div className="aspect-[16/9] overflow-hidden rounded-2xl">
              <Cover p={p} priority />
            </div>
          </Reveal>
        )}
        {p.gallery.map((g, i) => p.poster ? (
          <Reveal key={g.src} y={40} delay={(i % 3) * 0.06}>
            <button
              type="button"
              onClick={() => setViewer(i)}
              aria-label={`Open ${g.alt} in the viewer`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-card text-left shadow-[0_2px_18px_rgba(0,0,0,0.06)]"
            >
              <Image src={g.src} alt={g.alt} width={900} height={1125} priority={i < 3} sizes="(min-width: 1024px) 320px, 50vw" className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-3 pb-2.5 pt-8 text-[11px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {g.alt.replace(/ poster$/i, "")}
                <span aria-hidden>View</span>
              </span>
            </button>
          </Reveal>
        ) : (
          <Reveal key={g.src} y={50}>
            <div className="rounded-2xl bg-card p-2.5 shadow-[0_2px_18px_rgba(0,0,0,0.05)]">
              <div className="relative overflow-hidden rounded-xl" style={{ background: g.bg ?? "#eee" }}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1200}
                  height={g.fit === "contain" ? 700 : 1500}
                  priority={i === 0}
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className={g.fit === "contain" ? "mx-auto h-[min(60vh,520px)] w-auto object-contain p-10" : "h-auto w-full"}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </section>
      )}

      {!p.brand && p.mockups && (
        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-10">
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">In use</p>
          </Reveal>
          <div className={`grid grid-cols-2 gap-3 md:gap-4 ${p.mockups[0].includes("-app") ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
            {p.mockups.map((src, i) => (
              <Reveal key={src} y={40} delay={(i % 4) * 0.05} className={i === 0 && !src.includes("-app") ? "col-span-2 row-span-2" : ""}>
                <div className="aspect-square overflow-hidden rounded-2xl bg-card shadow-[0_2px_18px_rgba(0,0,0,0.05)]">
                  <Image
                    src={src}
                    alt={`${p.title.split(": ")[0]} mockup`}
                    width={1080}
                    height={1080}
                    sizes={i === 0 && !src.includes("-app") ? "(min-width: 1024px) 480px, 100vw" : "(min-width: 1024px) 240px, 50vw"}
                    className="size-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Link href={`/work/${next.slug}`} className="group relative block overflow-hidden bg-night px-5 py-20 text-white md:px-10 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">Next project</p>
        <div className="mt-4 flex items-end justify-between gap-6">
          <span className="font-display text-[clamp(1.4rem,4.2vw,3.15rem)] font-medium uppercase leading-none tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
            {next.title.split(": ")[0]}
          </span>
          <ArrowUpRight className="size-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-12" />
        </div>
      </Link>
    {viewer !== null && <Lightbox slug={p.slug} items={p.gallery} start={viewer} onClose={() => setViewer(null)} />}
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-mute">{label}</p>
      <p className="mt-1.5 max-w-xs font-medium">{value}</p>
    </div>
  );
}
