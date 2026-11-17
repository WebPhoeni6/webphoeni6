import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/store";
import { about } from "@/lib/about";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const name = `${profile.firstName} ${profile.lastName}`;
  return {
    title: `About ${name}`,
    description: `${name} is a designer and developer in Nigeria who builds products and brands, also known online as Web Phoenix.`,
  };
}

const label = "text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45";

export default async function AboutPage() {
  const { profile, projects } = await getContent();
  const contact = profile.email ? `mailto:${profile.email}` : "/#contact";

  return (
    <main className="min-h-svh bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10">
        <header className="flex items-center justify-between pt-5">
          <Link href="/" className="group inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-medium shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
            <svg viewBox="0 0 16 16" className="size-3 transition-transform duration-300 group-hover:-translate-x-1" fill="none" aria-hidden>
              <path d="M13 8H3m4-4L3 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
          <nav aria-label="Switch side" className="flex rounded-full bg-white p-1 text-[12px] font-medium shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
            <Link href="/#work" className="rounded-full px-4 py-1.5 text-ink/55 transition-colors hover:text-ink">
              Work
            </Link>
            <span aria-current="page" className="rounded-full bg-ink px-4 py-1.5 text-white">
              Me
            </span>
          </nav>
        </header>

        {/* Intro */}
        <section className="grid items-end gap-12 pt-16 md:grid-cols-[1.2fr_1fr] md:pt-24">
          <div>
            <p className={label}>About</p>
            <h1 className="mt-6 font-display text-[clamp(3.4rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              Hi, I&apos;m
              <br />
              {profile.firstName}.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">{about.lede}</p>
          </div>
          <div className="relative mx-auto aspect-[1200/1245] w-full max-w-md overflow-hidden rounded-[2rem] bg-[#161616] md:max-w-none">
            <Image src={profile.portrait} alt={`${profile.firstName} ${profile.lastName}`} fill priority sizes="(min-width: 768px) 40vw, 90vw" className="object-contain object-bottom" />
          </div>
        </section>

        {/* Story and facts */}
        <section className="mt-24 grid gap-14 md:mt-32 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-[15px] leading-relaxed text-ink/75 md:text-base">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="border-t border-ink/15">
            {about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4">
                <dt className={label}>{f.label}</dt>
                <dd className="max-w-[16rem] text-right text-[13px] font-medium leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* How I work */}
        <section className="mt-28 md:mt-40">
          <p className={label}>01 / How I work</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em]">What working with me looks like</h2>
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {about.principles.map((p, i) => (
              <li key={p.title} className="border-t border-ink/15 pt-5">
                <span className={label}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{p.title}</h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink/65 md:text-sm">{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Beyond work */}
        <section className="mt-28 md:mt-40">
          <p className={label}>02 / Beyond work</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em]">Away from the client work</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {about.beyond.map((b) => (
              <article key={b.title} className="grid grid-cols-[1fr_7rem] gap-5 rounded-[1.4rem] bg-white p-5 shadow-[0_2px_18px_rgba(0,0,0,0.05)] md:grid-cols-[1fr_9rem] md:p-6">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{b.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink/65">{b.text}</p>
                </div>
                <div className="relative aspect-[4/5] self-start overflow-hidden rounded-xl">
                  <Image src={b.image} alt="" fill sizes="144px" className="object-cover" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Now */}
        <section className="mt-28 md:mt-40">
          <p className={label}>03 / Now</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em]">What I&apos;m working on</h2>
          <ul className="mt-12 border-t border-ink/15">
            {about.now.map((n) => {
              const p = projects.find((x) => x.slug === n.slug);
              if (!p) return null;
              return (
                <li key={n.slug} className="border-b border-ink/15">
                  <Link href={`/work/${p.slug}`} className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-6">
                    <span className="font-display text-2xl font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{p.title.split(": ")[0]}</span>
                    <span className="max-w-md text-[13px] text-ink/60">{n.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Close */}
        <section className="mt-28 rounded-[2rem] bg-[#111] px-6 py-14 text-white md:mt-40 md:px-14 md:py-20">
          <h2 className="font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em]">
            Got something
            <br />
            to build?
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={contact} className="rounded-full bg-white px-6 py-3.5 text-[13px] font-medium text-ink transition-transform hover:scale-[1.04]">
              Say hello
            </a>
            <Link href="/socials" className="rounded-full border border-white/25 px-6 py-3.5 text-[13px] font-medium transition-colors hover:bg-white/10">
              All socials
            </Link>
            <Link href="/#work" className="rounded-full border border-white/25 px-6 py-3.5 text-[13px] font-medium transition-colors hover:bg-white/10">
              See the work
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
