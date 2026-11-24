import Image from "next/image";
import Link from "next/link";
import { addOn, tiers } from "@/lib/packages";
import ContactLink from "./ContactLink";
import TierPrice from "./TierPrice";
import AddOnPrice from "./AddOnPrice";
import { ArrowUpRight, Reveal } from "./ui";
import { Blob, FlameArt, GridPattern, LaneArt, LineAccent } from "./Art";

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
    <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The page body: three tier cards, the website add-on, and the Paylane case study as proof. */
export default function Packages() {
  return (
    <>
      <header className="relative overflow-hidden bg-paper px-5 pb-16 pt-32 text-ink md:px-10 md:pb-24 md:pt-44">
        <GridPattern className="inset-0" />
        <Blob className="-right-28 -top-16 w-[26rem] text-ember opacity-[0.09] md:-right-10 md:w-[36rem]" />
        <div className="relative mx-auto flex max-w-[1600px] items-end justify-between gap-8">
          <div>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">Brand packages</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-[clamp(2.1rem,6.65vw,6.3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                A brand for
                <br />
                every stage
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <LineAccent className="mt-6 w-28" />
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/70 md:text-base">Three ways to get a complete identity, from the day you register to the day you launch big. Pick the one that matches where your business is.</p>
            </Reveal>
          </div>
          <LaneArt className="hidden w-52 shrink-0 sm:block md:w-72" delay={0.2} />
        </div>
      </header>

      <section aria-label="Packages" className="relative -mt-8 rounded-t-[2rem] bg-card px-5 pb-20 pt-14 text-ink md:px-10 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-[1600px]">
          <ul className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
            {tiers.map((t, i) => (
              <li key={t.id} className="flex">
                <Reveal delay={i * 0.1} y={40} className="flex w-full">
                  <article
                    className={`relative flex w-full flex-col overflow-hidden rounded-[1.6rem] p-6 md:p-8 ${
                      t.popular ? "bg-night text-white shadow-[0_30px_70px_-30px_rgba(255,79,26,0.55)] ring-2 ring-ember lg:-mt-4 lg:mb-0 lg:pb-12 lg:pt-12" : "bg-paper ring-1 ring-line"
                    }`}
                  >
                    {t.popular && (
                      <>
                        <Blob className="-right-24 -top-24 w-80 text-ember opacity-[0.16]" variant={1} />
                        <span className="absolute right-5 top-5 rounded-full bg-ember px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]">Most popular</span>
                      </>
                    )}
                    <div className="relative">
                      <h2 className="font-display text-[2.1rem] font-bold leading-none tracking-[-0.03em] md:text-5xl">{t.name}</h2>
                      <p className={`mt-3 text-[14px] ${t.popular ? "text-white/65" : "text-ink/60"}`}>
                        For &ldquo;{t.forWho}&rdquo;
                      </p>
                      <TierPrice tier={t} />

                      {t.includes && <p className={`mt-8 text-[13px] font-semibold ${t.popular ? "text-ember" : "text-ember-deep"}`}>{t.includes}</p>}
                      <ul className={`${t.includes ? "mt-4" : "mt-8"} grid gap-3 text-[14px] leading-snug`}>
                        {t.features.map((f) => (
                          <li key={f} className="flex gap-3">
                            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${t.popular ? "bg-ember text-[#111]" : "bg-ember/15 text-ember-deep"}`}>
                              <Check className="size-3" />
                            </span>
                            <span className={t.popular ? "text-white/85" : "text-ink/80"}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative mt-auto pt-10">
                      <ContactLink
                        className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[14px] font-semibold transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                          t.popular ? "bg-ember text-[#111]" : "bg-ink text-paper"
                        }`}
                      >
                        {t.custom ? "Contact me for a quote" : `Start with ${t.name}`}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </ContactLink>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Add-on */}
          <Reveal y={40} className="mt-6 lg:mt-8">
            <aside className="relative overflow-hidden rounded-[1.6rem] bg-ember p-6 text-[#111] md:p-10">
              <GridPattern className="inset-0 !text-[#111] !opacity-[0.12]" />
              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-70">Add-on</p>
                  <h2 className="mt-3 font-display text-[clamp(1.6rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                    {addOn.title}: {addOn.line}
                  </h2>
                  <p className="mt-3 text-[15px] font-medium opacity-80">({addOn.text})</p>
                  <p className="mt-3 max-w-xl text-[14px] leading-relaxed opacity-75">{addOn.detail}</p>
                  <AddOnPrice />
                </div>
                <ContactLink className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#111] px-7 py-4 text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-[0.97]">
                  Add a website
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </ContactLink>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="relative bg-paper px-5 pb-28 pt-16 text-ink md:px-10 md:pb-36 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">See what a package looks like</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/work/paylane" className="group mt-8 grid overflow-hidden rounded-[1.6rem] bg-[#0B1B3F] text-white md:grid-cols-[1.3fr_1fr]">
              <div className="relative aspect-[1376/768] md:aspect-auto md:min-h-[24rem]">
                <Image
                  src="/work/paylane/flat-lay.webp"
                  alt="The full Paylane brand identity laid out on navy: stationery, cards, card terminal, t-shirts, caps, tote bag and mug"
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 55vw, 92vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="relative flex flex-col justify-between gap-10 p-6 md:p-10">
                <FlameArt className="absolute right-4 top-4 hidden w-24 opacity-30 md:block" />
                <div>
                  <p className="inline-flex rounded-full bg-[#C6F432] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0B1B3F]">Concept project</p>
                  <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] md:text-4xl">Paylane: Brand Identity</h2>
                  <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/70">A complete identity for a Lagos payments app, from the logo to a danfo wrap. This is the kind of system a package gives you.</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#C6F432]">
                  Read the case study
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
