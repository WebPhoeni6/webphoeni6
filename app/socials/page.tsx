import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { SocialIcon, socialHandle } from "@/components/SocialIcon";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Socials",
  description: "Where to reach me.",
};

export default async function SocialsPage() {
  const { profile } = await getContent();
  const rows = [
    ...(profile.email ? [{ label: "Email", href: `mailto:${profile.email}`, handle: profile.email }] : []),
    ...profile.socials.filter((s) => s.href).map((s) => ({ label: s.label, href: s.href, handle: socialHandle(s.label, s.href) })),
  ];

  return (
    <main className="mx-auto min-h-svh max-w-[1600px] bg-[#111] px-5 pb-24 pt-5 text-white md:px-10">
      <Nav />

      <div className="mt-28 md:mt-36">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Get in touch</p>
        <h1 className="mt-5 font-display text-[clamp(3.2rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.05em]">Socials</h1>
        <p className="mt-6 max-w-md text-[13px] leading-relaxed text-white/50">Pick whichever you check most. I answer on all of them.</p>
      </div>

      <ul className="mt-14 border-t border-white/10 md:mt-20">
        {rows.map((r) => (
          <li key={r.label} className="border-b border-white/10">
            <a
              href={r.href}
              target={r.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group flex items-center gap-5 py-6 transition-colors md:gap-8 md:py-8"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/[0.07] text-white/80 transition-colors duration-300 group-hover:bg-white group-hover:text-ink md:size-14">
                <SocialIcon label={r.label} className="size-5" />
              </span>
              <span className="font-display text-[clamp(1.6rem,4.6vw,3.4rem)] font-medium leading-none tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4">
                {r.label}
              </span>
              <span className="ml-auto hidden truncate text-[13px] text-white/45 sm:block">{r.handle}</span>
              <svg viewBox="0 0 16 16" className="size-5 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white" fill="none" aria-hidden>
                <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
