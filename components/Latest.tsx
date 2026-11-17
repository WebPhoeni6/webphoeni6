"use client";

import Image from "next/image";
import Link from "next/link";
import { updates } from "@/lib/updates";
import { useContent } from "./ContentProvider";
import { Reveal } from "./ui";

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });

/** A short row of what was added most recently, so returning visitors see something new straight away. */
export default function Latest() {
  const { projects } = useContent();

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

  if (items.length === 0) return null;

  return (
    <Reveal className="mb-16 md:mb-24">
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
        <span>
          Latest
        </span>
        <span>Newest first</span>
      </div>
      <ul className="no-scrollbar -mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:gap-4 md:px-0">
        {items.map((u) => (
          <li key={u.date + u.title} className="w-[44vw] shrink-0 snap-start sm:w-44 md:w-52">
            <Link href={u.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-[0_2px_18px_rgba(0,0,0,0.06)]">
                <Image src={u.image} alt="" fill sizes="(min-width: 768px) 208px, 44vw" className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold leading-none text-ink backdrop-blur">{u.label}</span>
              </div>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45">{fmt(u.date)}</p>
              <p className="mt-1 text-[13px] font-medium leading-snug">{u.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
