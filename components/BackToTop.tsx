"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** A round button that appears after you scroll down and takes you back to the top. */
export default function BackToTop() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  const off = path.startsWith("/admin") || path.startsWith("/brand");

  useEffect(() => {
    if (off) return;
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [off]);

  if (off) return null;

  const top = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={top}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-30 grid size-12 place-items-center rounded-full bg-ember text-[#111] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:scale-110 active:scale-95 md:bottom-8 md:right-8 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
        <path d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
