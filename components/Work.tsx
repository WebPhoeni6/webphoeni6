"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/content";
import { useContent } from "./ContentProvider";
import { ArrowUpRight, Cover, Reveal } from "./ui";
import PreviewTile from "./PreviewTile";
import PosterCover from "./PosterCover";

const filters: ("All" | Category)[] = ["All", "Development", "Design", "Branding"];

export default function Work() {
  const { projects } = useContent();
  const [active, setActive] = useState<"All" | Category>("All");
  const shown = projects.filter((p) => active === "All" || p.category === active);

  return (
    <section id="work" className="relative -mt-8 rounded-t-[2rem] bg-paper px-5 pb-28 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
          <span>01 / Selected work</span>
          <span>{String(shown.length).padStart(2, "0")} projects</span>
        </Reveal>
        <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-[clamp(3rem,9.5vw,9rem)] font-bold leading-[0.9] tracking-[-0.05em]">
          Selected
          <br />
          work
        </h2>
        </Reveal>

        <Reveal delay={0.16}><div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1 text-[13px] font-medium md:mt-14">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`whitespace-nowrap rounded-full px-4 py-2 transition-colors duration-300 ${
                active === f ? "bg-ink text-white" : "bg-white text-ink/70 hover:bg-ink/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div></Reveal>

        <div className="mt-10 grid gap-x-6 gap-y-14 md:mt-14 md:grid-cols-2 md:gap-x-8">
          {shown.map((p, i) => (
            <Reveal key={p.slug} y={60} delay={(i % 2) * 0.08} className="md:even:mt-24">
            <article>
              <Link href={`/work/${p.slug}`} className="group block">
                <div
                  className={`relative overflow-hidden rounded-[1.4rem] ${p.poster || p.shot ? "aspect-[16/10]" : "aspect-[5/4]"}`}
                  style={{ background: p.coverBg ?? "#e6e6e3" }}
                >
                  {p.preview ? (
                    <PreviewTile p={p}>
                      <div className="absolute inset-0">
                        <Cover p={p} />
                      </div>
                    </PreviewTile>
                  ) : p.poster ? (
                    <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
                      <PosterCover srcs={p.gallery.map((g) => g.src)} title={p.title} />
                    </div>
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
                      <Cover p={p} />
                    </div>
                  )}
                  <span className="absolute right-4 top-4 grid size-11 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                      {String(i + 1).padStart(2, "0")} / {p.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-[1.7rem]">{p.title}</h3>
                    <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-ink/55">{p.summary}</p>
                  </div>
                  <div className="hidden shrink-0 flex-wrap justify-end gap-1.5 sm:flex">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink/65">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
