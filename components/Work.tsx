"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/content";
import { useContent } from "./ContentProvider";
import { ArrowUpRight, Cover, Reveal } from "./ui";
import PreviewTile from "./PreviewTile";
import PosterCover from "./PosterCover";
import Latest from "./Latest";

const filters: ("All" | Category)[] = ["All", "Development", "Design", "Branding"];

/**
 * `limit` shows only the first few projects with a link to the rest (the home page).
 * `page` is the full /work page: every project, with the filters.
 */
export default function Work({ limit, page = false }: { limit?: number; page?: boolean }) {
  const { projects } = useContent();
  const [active, setActive] = useState<"All" | Category>("All");
  const filtered = projects.filter((p) => active === "All" || p.category === active);
  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="work" className={`relative bg-paper px-5 pb-28 md:px-10 ${page ? "pt-32 md:pt-44" : "-mt-8 rounded-t-[2rem] pt-16 md:pt-24"}`}>
      <div className="mx-auto max-w-[1600px]">
        {!page && <Latest />}
        <Reveal className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
          <span>{page ? "Work" : "01 / Selected work"}</span>
          <span>
            {limit && projects.length > shown.length ? `${shown.length} of ${projects.length}` : String(shown.length).padStart(2, "0")} projects
          </span>
        </Reveal>
        <Reveal delay={0.08}>
        {page ? (
          <h1 className="mt-6 font-display text-[clamp(2.1rem,6.65vw,6.3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            All
            <br />
            work
          </h1>
        ) : (
          <h2 className="mt-6 font-display text-[clamp(2.1rem,6.65vw,6.3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            Selected
            <br />
            work
          </h2>
        )}
        </Reveal>

        {!limit && <Reveal delay={0.16}><div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1 text-[13px] font-medium md:mt-14">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`whitespace-nowrap rounded-full px-4 py-2 transition-colors duration-300 ${
                active === f ? "bg-ink text-paper" : "bg-card text-ink/70 hover:bg-ink/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div></Reveal>}

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
                  <span className="absolute right-4 top-4 grid size-11 translate-y-2 place-items-center rounded-full bg-white text-[#111] opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
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
                      <span key={t} className="rounded-full bg-card px-3 py-1 text-[11px] font-medium text-ink/65">
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

        {limit && projects.length > shown.length && (
          <Reveal className="mt-16 flex justify-center">
            <Link href="/work" className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[14px] font-medium text-paper transition-transform hover:scale-[1.04]">
              See all {projects.length} projects
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
