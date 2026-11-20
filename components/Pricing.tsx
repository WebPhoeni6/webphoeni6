import { pricing, pricingNote } from "@/lib/pricing";
import ContactLink from "./ContactLink";
import { ArrowUpRight, Reveal, SectionHead } from "./ui";

export default function Pricing() {
  return (
    <section id="pricing" className="relative -mt-8 rounded-t-[2rem] bg-paper px-5 pb-28 pt-16 text-ink md:px-10 md:pt-16">
      <SectionHead n="03" title="Pricing" aside="In naira" />

      <Reveal>
        <p className="max-w-2xl text-[15px] leading-relaxed text-ink/70 md:text-base">{pricingNote.negotiable}</p>
      </Reveal>

      <div className="mt-14 grid gap-14 md:mt-20">
        {pricing.map((g) => (
          <div key={g.title} className="grid gap-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)] md:gap-12">
            <Reveal>
              <h3 className="font-display text-xl font-semibold uppercase tracking-[-0.01em] md:text-2xl">{g.title}</h3>
            </Reveal>
            <ul>
              {g.items.map((it, i) => (
                <li key={it.name}>
                  <Reveal delay={i * 0.05}>
                    <div className="flex flex-col gap-3 border-b border-line py-6 first:pt-0 md:flex-row md:items-start md:justify-between md:gap-10">
                      <div className="max-w-lg">
                        <p className="flex flex-wrap items-center gap-2.5 text-[15px] font-semibold md:text-base">
                          {it.name}
                          {it.best && <span className="rounded-full bg-ember px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#111]">Best value</span>}
                        </p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60 md:text-sm">{it.text}</p>
                      </div>
                      <p className="shrink-0 md:text-right">
                        {it.from && <span className="mr-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">from</span>}
                        <span className="font-display text-xl font-bold tracking-[-0.02em] md:text-2xl">{it.price}</span>
                        {it.unit && <span className="ml-1.5 text-[12px] text-ink/50">{it.unit}</span>}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 flex flex-col gap-6 rounded-2xl bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="max-w-xl text-[13px] leading-relaxed text-ink/70 md:text-sm">{pricingNote.scope}</p>
          <ContactLink className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-ember px-5 py-3 text-[13px] font-semibold text-[#111] transition-transform hover:scale-[1.04]">
            Talk about your price
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ContactLink>
        </div>
      </Reveal>
    </section>
  );
}
