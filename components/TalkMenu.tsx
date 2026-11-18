"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "./ContentProvider";
import { SocialIcon, socialHandle } from "./SocialIcon";
import { ArrowUpRight } from "./ui";

/**
 * "Let's Talk" opens a short list so the visitor picks how they want to reach out:
 * WhatsApp first, then email, then the other places you are.
 */
export default function TalkMenu({ className = "" }: { className?: string }) {
  const { profile } = useContent();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
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

  const rank = (l: string) => ["whatsapp", "email", "telegram", "instagram", "linkedin", "behance", "discord", "facebook"].indexOf(l.toLowerCase());
  const rows = [
    ...(profile.email ? [{ label: "Email", href: `mailto:${profile.email}`, text: profile.email }] : []),
    ...profile.socials.filter((s) => s.href).map((s) => ({ label: s.label, href: s.href, text: socialHandle(s.label, s.href) })),
  ].sort((a, b) => (rank(a.label) === -1 ? 99 : rank(a.label)) - (rank(b.label) === -1 ? 99 : rank(b.label)));

  return (
    <div ref={root} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} className={className}>
        Let&apos;s Talk
        <ArrowUpRight className={`size-3 transition-transform duration-300 ${open ? "rotate-45" : "group-hover:-translate-y-px group-hover:translate-x-px"}`} />
      </button>
      <div
        role="menu"
        aria-hidden={!open}
        inert={!open}
        className={`absolute right-0 top-full z-50 mt-3 w-[min(19rem,calc(100vw-2.5rem))] origin-top-right rounded-2xl bg-card p-2 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.3)] ring-1 ring-ink/10 transition-all duration-300 ease-[var(--ease-out-expo)] ${open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}
      >
        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">How would you like to talk?</p>
        {rows.map((r) => (
          <a
            key={r.label}
            role="menuitem"
            href={r.href}
            target={r.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink/[0.06]"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink/[0.07] transition-colors group-hover/item:bg-ember group-hover/item:text-[#111]">
              <SocialIcon label={r.label} className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-medium leading-tight">{r.label}</span>
              <span className="block truncate text-[12px] text-ink/50">{r.text}</span>
            </span>
          </a>
        ))}
        <a
          href="/cv"
          onClick={() => setOpen(false)}
          className="mt-1 flex items-center gap-3 rounded-xl border-t border-ink/10 px-3 py-3 transition-colors hover:bg-ink/[0.06]"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ember text-[#111]">
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
              <path d="M4 1.8h5.2L12 4.6v9.6H4V1.8zM9 2v3h3M6 8h4M6 10.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <span className="block text-[13px] font-medium leading-tight">View my CV</span>
            <span className="block text-[12px] text-ink/50">Read it, then download the PDF</span>
          </span>
        </a>
      </div>
    </div>
  );
}
