"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useContactHref, useContent } from "./ContentProvider";
import { ArrowUpRight } from "./ui";
import Portrait from "./Portrait";

gsap.registerPlugin(useGSAP);

function Chars({
  text,
  cls = "h-char",
  show,
}: {
  text: string;
  cls?: string;
  show?: (i: number) => boolean;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
      {text.split("").map((c, i) => (
        <span
          key={i}
          className={`${cls} inline-block will-change-transform`}
          style={show && !show(i) ? { color: "transparent" } : undefined}
          aria-hidden
        >
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const { profile, projects, brands } = useContent();
  const contactHref = useContactHref();
  const root = useRef<HTMLElement>(null);

  // Numbers come from the content itself, so they stay true as you add work.
  const stats = [
    { n: brands.length, label: "Brands" },
    {
      n: projects.filter((x) => x.category === "Development").length,
      label: "Products",
    },
    {
      n: projects
        .filter((x) => x.poster)
        .reduce((t, x) => t + x.gallery.length, 0),
      label: "Posters",
    },
  ];

  // Put the head in the middle of the gap between the two names, whatever their widths.
  useEffect(() => {
    const place = () => {
      const el = root.current;
      const wrap = el?.querySelector<HTMLElement>(".h-portrait-wrap");
      const h1 = el?.querySelector<HTMLElement>("h1");
      const parent = wrap?.offsetParent as HTMLElement | null;
      if (!el || !wrap || !h1 || !parent) return;
      if (!window.matchMedia("(min-width: 768px)").matches) {
        wrap.style.left = "";
        return;
      }
      const names = h1.querySelectorAll<HTMLElement>(":scope > span");
      if (names.length < 2) return;
      const a = names[0].getBoundingClientRect();
      const b = names[names.length - 1].getBoundingClientRect();
      const mid = (a.right + b.left) / 2 - parent.getBoundingClientRect().left;
      // the head sits ~1.3% left of the image's center
      wrap.style.left = `${mid + wrap.offsetWidth * 0.013}px`;
    };
    const raf = () => requestAnimationFrame(place);
    raf();
    document.fonts?.ready.then(raf);
    window.addEventListener("resize", raf);
    return () => window.removeEventListener("resize", raf);
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!reduce) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(
          ".h-label",
          { opacity: 0, y: 14, duration: 0.8, stagger: 0.1 },
          0.1,
        )
          .from(
            ".h-char",
            { yPercent: 120, rotate: 5, duration: 1.3, stagger: 0.045 },
            0.15,
          )
          .from(".h-portrait", { yPercent: 6, duration: 1.2 }, 0.3)
          .from(
            ".h-copy",
            { opacity: 0, y: 24, duration: 1, stagger: 0.1 },
            0.8,
          );
      }

      // Scroll drift: the name and portrait ease up a little as the hero leaves (desktop only).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = root.current;
        if (!el) return;
        let ticking = false;
        const update = () => {
          ticking = false;
          const p = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
          gsap.set(".h-name", { yPercent: -10 * p });
          gsap.set(".h-portrait-wrap", { yPercent: -5 * p });
        };
        const onScroll = () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative min-h-[min(100svh,1000px)] overflow-hidden bg-[#111] text-white"
    >
      <div className="relative mx-auto flex min-h-[min(100svh,1000px)] max-w-[1600px] flex-col px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-24">
        <p className="h-label text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Portfolio / 2026
        </p>

        {/* Name, big and behind the portrait */}
        {/* Name sits behind the portrait */}
        <div className="relative">
          <h1 aria-label={`${profile.firstName} ${profile.lastName}`} className="h-name relative z-10 mt-5 flex flex-wrap justify-between gap-x-[0.2em] font-display text-[clamp(3.4rem,12.4vw,13.5rem)] font-bold leading-[0.86] tracking-[-0.055em] md:mt-6">
            <Chars text={profile.firstName} />
            <Chars text={profile.lastName} />
          </h1>
        </div>

        {/* Text | portrait | info */}
        <div className="relative -mt-[9vw] grid items-end gap-8 md:-mt-[14vw] md:flex-1 md:grid-cols-[minmax(15rem,1fr)_auto] md:gap-6 lg:gap-8">
          {/* Portrait: overlaps up into the name */}
          <div className="h-portrait-wrap relative z-20 order-1 mx-auto w-full md:absolute md:w-auto md:-bottom-10 md:left-1/2 md:mx-0 md:-translate-x-1/2">
            <div className="h-portrait relative aspect-[1200/1245] w-full md:w-auto md:h-[min(88svh,900px,52vw)]">
              {hasPortrait ? (
                <Portrait
                  src={profile.portrait}
                  alt={`${profile.firstName} ${profile.lastName}`}
                />
              ) : (
                <div className="absolute inset-0 flex items-end justify-center rounded-t-[2rem] border border-dashed border-white/20 bg-white/[0.03] pb-6 text-center">
                  <span className="max-w-[12rem] text-[11px] leading-relaxed text-white/35">
                    Your portrait goes here. Save it as public/samuel.png
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Left: who I am */}
          <div className="relative z-30 order-2 -mt-[30vw] md:order-1 md:mt-0 md:max-w-sm">
            <p className="h-copy font-display text-xl font-medium tracking-tight text-white/90 md:text-2xl">
              {profile.role}
            </p>
            <p className="h-copy mt-3 text-[13px] leading-relaxed text-white/55">
              {profile.blurb} Recent work includes Pendu, Vowrify and Rendo,
              plus brand identities for {brands.length} companies.
            </p>
            <div className="h-copy mt-6 flex flex-wrap gap-2.5">
              <a
                href="#work"
                className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-[13px] font-medium text-ink transition-transform hover:scale-[1.04]"
              >
                See my work
                <ArrowUpRight className="size-3 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href="/brand"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Brand portfolio
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          {/* Right: numbers, what I do, contact */}
          <div className="h-copy relative z-30 order-3 w-full md:w-[min(26vw,400px)]">
            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-5">
              {stats.map((x) => (
                <div key={x.label}>
                  <p className="font-display text-4xl font-bold leading-none tracking-[-0.04em] md:text-5xl">
                    {x.n}
                  </p>
                  <p className="mt-2 text-[11px] leading-tight text-white/45">
                    {x.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center justify-between gap-4">
              {profile.email ? (
                <span className="truncate text-[13px] text-white/60">
                  {profile.email}
                </span>
              ) : (
                <span className="text-[13px] text-white/45">
                  Got a project?
                </span>
              )}
              <a
                href={contactHref}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-3 text-[13px] font-medium text-ink transition-transform hover:scale-[1.04]"
              >
                Say hello
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
