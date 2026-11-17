"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Path on this site, like "/work/pendu". Defaults to the current page. */
  path?: string;
  title: string;
  text?: string;
  /** If set, phones that can share files send the picture itself. */
  image?: string;
  /** "pill" shows the word Share, "icon" is just the icon. */
  variant?: "pill" | "icon";
  tone?: "light" | "dark";
  className?: string;
  label?: string;
};

const Icon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
    <path d="M8 10V2m0 0L5 5m3-3l3 3M3.5 8v4.5a1 1 0 001 1h7a1 1 0 001-1V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ShareButton({ path, title, text, image, variant = "pill", tone = "light", className = "", label = "Share" }: Props) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const root = useRef<HTMLSpanElement>(null);
  const flash = (m: string) => {
    setNote(m);
    window.setTimeout(() => setNote(""), 1800);
  };
  const url = () => (path ? new URL(path, window.location.origin).toString() : window.location.href.split("#")[0]);

  useEffect(() => {
    if (!open) return;
    // Close on Esc without also closing a viewer behind it, and on a click outside.
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        setOpen(false);
      }
    };
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key, true);
    document.addEventListener("pointerdown", away);
    return () => {
      document.removeEventListener("keydown", key, true);
      document.removeEventListener("pointerdown", away);
    };
  }, [open]);

  const click = async () => {
    const link = url();
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch && typeof navigator.share === "function") {
      try {
        if (image) {
          const blob = await (await fetch(image)).blob();
          const file = new File([blob], `${(path ?? "share").split("/").pop() || "share"}.${blob.type.split("/")[1] || "jpg"}`, { type: blob.type });
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({ files: [file], title, text: `${text ?? title} ${link}` });
            return;
          }
        }
        await navigator.share({ title, text, url: link });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
      }
    }
    setOpen((o) => !o);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      flash("Link copied");
    } catch {
      flash("Copy failed");
    }
    setOpen(false);
  };

  const enc = encodeURIComponent;
  const msg = `${text ?? title}`;
  const targets = () => {
    const u = enc(url());
    return [
      { name: "WhatsApp", href: `https://wa.me/?text=${enc(msg + " " + url())}` },
      { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${enc(msg)}` },
      { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${enc(msg)}` },
      { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
      { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
      { name: "Email", href: `mailto:?subject=${enc(title)}&body=${enc(msg + "\n" + url())}` },
    ];
  };

  const dark = tone === "dark";
  const base =
    variant === "icon"
      ? `grid size-10 place-items-center rounded-full ${dark ? "border border-white/25 hover:bg-white hover:text-black" : "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:scale-105"}`
      : `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-medium ${dark ? "border border-white/25 hover:bg-white hover:text-black" : "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:scale-[1.04]"}`;

  return (
    <span ref={root} className={`relative inline-block ${className}`}>
      <button type="button" onClick={click} aria-label={`${label}: ${title}`} aria-haspopup="menu" aria-expanded={open} className={`${base} transition-all duration-300`}>
        <Icon className={variant === "icon" ? "size-4" : "size-3.5"} />
        {variant === "pill" && label}
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-2xl bg-white p-1.5 text-[13px] text-ink shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
          <button role="menuitem" onClick={copy} className="flex w-full items-center rounded-xl px-3 py-2 text-left font-medium hover:bg-ink/[0.06]">
            Copy link
          </button>
          {targets().map((t) => (
            <a key={t.name} role="menuitem" href={t.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="flex w-full items-center rounded-xl px-3 py-2 hover:bg-ink/[0.06]">
              {t.name}
            </a>
          ))}
        </div>
      )}
      <span role="status" aria-live="polite" className={`pointer-events-none absolute right-0 top-full z-[60] mt-2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] font-medium text-white transition-opacity duration-300 ${note ? "opacity-100" : "opacity-0"}`}>
        {note}
      </span>
    </span>
  );
}
