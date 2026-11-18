"use client";

import { useContent } from "./ContentProvider";
import ContactLink from "./ContactLink";
import { ArrowUpRight, Reveal } from "./ui";
import { SocialIcon } from "./SocialIcon";

/** Closes the page like the last sheet of the PDF: dark, one big line. */
export default function Contact() {
  const { profile } = useContent();
  return (
    <section id="contact" className="relative -mt-8 overflow-hidden rounded-t-[2rem] bg-[#111] px-5 pb-8 pt-16 text-white md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          <span>04 / Contact</span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 font-display text-[clamp(2.1rem,7.35vw,7rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            Got a project?
            <br />
            Let&apos;s talk.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <Reveal delay={0.15} className="max-w-sm text-[13px] leading-relaxed text-white/50">
            Brand identity, product design or a full build. Tell me what you&apos;re making and I&apos;ll tell you how I&apos;d approach it.
          </Reveal>
          <Reveal delay={0.2}>
            <ContactLink className="group inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 text-[14px] font-medium text-[#111] transition-transform duration-300 hover:scale-105 active:scale-[0.97]">
              Say hello
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
            </ContactLink>
            {profile.email && (
              <p className="mt-3 text-[12px] text-white/45">
                No WhatsApp?{" "}
                <a href={`mailto:${profile.email}`} className="underline underline-offset-4 transition-colors hover:text-white">
                  Email me instead
                </a>
              </p>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.25} className="mt-16 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-8">
          <span className="rounded-full bg-white px-3.5 py-2 text-[11px] font-semibold text-[#111]">
            {profile.firstName} {profile.lastName}
          </span>
          {profile.socials.filter((x) => x.href).map((x) => (
            <a
              key={x.label}
              href={x.href}
              target="_blank"
              rel="noreferrer"
              aria-label={x.label}
              title={x.label}
              className="grid size-9 place-items-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#111]"
            >
              <SocialIcon label={x.label} className="size-[15px]" />
            </a>
          ))}
          <a href="/cv" className="rounded-full bg-ember px-3.5 py-2 text-[11px] font-semibold text-[#111] transition-transform hover:scale-105">
            View my CV
          </a>
          <a href="/about" className="rounded-full border border-white/20 px-3.5 py-2 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10">
            About me
          </a>
          <a href="/socials" className="rounded-full border border-white/20 px-3.5 py-2 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10">
            All socials
          </a>
          <a href="/brand" className="rounded-full border border-white/20 px-3.5 py-2 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10">
            Brand portfolio
          </a>
          <span className="ml-auto text-[11px] text-white/35">
            &copy; {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
