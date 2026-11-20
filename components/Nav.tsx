"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useContent } from "./ContentProvider";
import TalkMenu from "./TalkMenu";
import { ArrowUpRight } from "./ui";
import ThemeToggle from "./ThemeToggle";
import LogoMark from "./LogoMark";

/**
 * The site navigation. Fixed to the top on every page: clear over the hero, frosted once you scroll,
 * with a full-screen menu on phones. `tone` matches the page behind it.
 */
export default function Nav({ tone = "light" }: { tone?: "dark" | "light" }) {
  const { profile } = useContent();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Three pages in the bar. The CV, Brand PDF and Socials live in the footer and on the About page.
  const links = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ];
  const more = [
    { label: "CV", href: "/cv" },
    { label: "Brand PDF", href: "/brand" },
    { label: "Socials", href: "/socials" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Phone menu: lock scroll, close with Esc.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  type Item = { label: string; href: string };
  const isActive = (l: Item) => path === l.href || path.startsWith(`${l.href}/`);

  // "dark" is for a page that is always dark (Socials). Everything else follows the theme.
  const dark = tone === "dark";
  const bar =
    scrolled || open
      ? dark
        ? "border-white/10 bg-[#111]/90 backdrop-blur-xl"
        : "border-ink/10 bg-paper/85 backdrop-blur-xl"
      : "border-transparent bg-transparent";
  const text = open || dark ? "text-white" : "text-ink";
  const idle = dark ? "text-white/65 hover:text-white" : "text-ink/60 hover:text-ink";
  const on = dark ? "text-white" : "text-ink";
  const ctaTone = "bg-ember text-[#111]";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${bar} ${text}`}>
        <div className="mx-auto flex h-[4.25rem] max-w-[1600px] items-center justify-between gap-4 px-5 text-[13px] md:px-10">
          <Link href="/" onClick={() => setOpen(false)} aria-label="Home" className="flex items-center gap-2.5 font-display text-base font-bold tracking-[-0.02em]">
            <LogoMark className="size-8" />
            <span className="hidden sm:inline">
              {profile.firstName} {profile.lastName}
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto flex items-center gap-5 lg:gap-8">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                aria-current={isActive(l) ? "page" : undefined}
                className={`group relative hidden font-medium transition-colors lg:block ${isActive(l) ? on : idle}`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-ember transition-transform duration-500 ${isActive(l) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            ))}
            <ThemeToggle tone={open || dark ? "dark" : "light"} />
            <TalkMenu className={`group flex items-center gap-1.5 rounded-full px-4 py-2.5 font-medium transition-transform hover:scale-[1.04] ${ctaTone}`} />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid size-10 place-items-center rounded-full border lg:hidden ${open || dark ? "border-white/25" : "border-ink/20"}`}
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1/2 h-px w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <div
        id="mobile-menu"
        data-lenis-prevent
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[39] flex flex-col justify-between bg-[#111] px-5 pb-8 pt-28 text-white transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ul>
          {([...links, { label: "Contact", href: "/#contact" }] as Item[]).map((l, i) => (
            <li key={l.label} className="overflow-hidden border-b border-white/10">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                className={`flex items-baseline justify-between py-4 font-display text-[clamp(1.4rem,6.3vw,2.1rem)] font-semibold tracking-[-0.03em] transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${isActive(l) ? "text-white" : "text-white/70"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="grid gap-6">
          <ul className="flex flex-wrap gap-2">
            {more.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={() => setOpen(false)} className="inline-block rounded-full border border-white/20 px-4 py-2 text-[12px] font-medium text-white/80">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-4 text-[13px] text-white/55">
            <span className="truncate">{profile.email}</span>
            <ThemeToggle tone="dark" showLabel className="shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
}
