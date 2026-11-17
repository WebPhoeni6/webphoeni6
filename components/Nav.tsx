"use client";

import Link from "next/link";
import { useContactHref, useContent } from "./ContentProvider";
import { ArrowUpRight } from "./ui";
import ShareButton from "./ShareButton";

const pad = (n: number) => String(n).padStart(2, "0");

/** Sits over the dark hero. */
export default function Nav() {
  const { profile, projects, services, experience } = useContent();
  const contactHref = useContactHref();
  const links = [
    { label: "Work", href: "/#work", count: pad(projects.length) },
    { label: "Service", href: "/#service", count: pad(services.length) },
    { label: "Experience", href: "/#experience", count: pad(experience.length) },
    { label: "Brand PDF", href: "/brand", count: undefined },
    { label: "About", href: "/about", count: undefined },
    { label: "Socials", href: "/socials", count: undefined },
    { label: "Contact", href: "/#contact", count: undefined },
  ];
  return (
    <header className="anim-down absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 pt-5 text-[13px] text-white md:px-10">
      <Link href="/" className="font-display text-base font-bold tracking-tight sm:hidden">
        {profile.firstName[0]}.{profile.lastName[0]}
      </Link>

      <nav className="ml-auto flex items-center gap-5 md:gap-8">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="group relative hidden font-medium text-white/65 transition-colors hover:text-white md:block">
            {l.label}
            {l.count && <span className="ml-1.5 rounded-full bg-white/12 px-1.5 py-0.5 align-middle text-[10px] font-semibold leading-none text-white/75">{l.count}</span>}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        ))}
        <ShareButton variant="icon" tone="dark" path="/" title="Samuel Emeka, developer and designer" text="Samuel Emeka (Web Phoenix), developer and designer" className="hidden sm:inline-block [&>button]:size-9" label="Share this site" />
        <Link
          href={contactHref}
          className="group flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 font-medium text-ink transition-transform hover:scale-[1.04]"
        >
          Let&apos;s Talk
          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
        </Link>
      </nav>
    </header>
  );
}
