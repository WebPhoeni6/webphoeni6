import Image from "next/image";
import Link from "next/link";
import { Reveal, ArrowUpRight } from "./ui";
import { Blob, GridPattern, LaneArt } from "./Art";

const label = "text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50";
const body = "max-w-xl text-[15px] leading-relaxed text-ink/75 md:text-[17px]";
const h2 = "mt-5 font-display text-[clamp(1.7rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em]";

/** Paylane's own colours. Built in code so they stay sharp at any size. */
const swatches = [
  { name: "Midnight Navy", hex: "#0B1B3F", note: "Trust", dark: true },
  { name: "Electric Lime", hex: "#C6F432", note: "Speed", dark: false },
  { name: "Cloud", hex: "#F5F7FA", note: "Clean space", dark: false },
  { name: "Signal Coral", hex: "#FF6B4A", note: "Alerts", dark: false },
];

const shots = {
  billboard: { src: "/work/paylane/billboard.webp", alt: "Paylane logo and the line 'Your fast lane to getting paid' on a billboard above a busy Lagos highway, with yellow danfo buses below", caption: "On the road" },
  glass: { src: "/work/paylane/glass-sign.webp", alt: "Navy Paylane logo as a 3D sign on a frosted glass office wall", caption: "The sign" },
  card: { src: "/work/paylane/debit-card.webp", alt: "A hand holding a navy Paylane debit card with the logo and a contactless symbol", caption: "The card" },
  danfo: { src: "/work/paylane/danfo-wrap.webp", alt: "A yellow Lagos danfo bus wrapped in Paylane navy and lime with the line 'Your fast lane to getting paid'", caption: "The danfo wrap" },
  door: { src: "/work/paylane/shop-door.webp", alt: "A round 'We accept Paylane' sticker on the glass door of a Lagos corner shop", caption: "Shop door sticker" },
  app: { src: "/work/paylane/app-home.webp", alt: "A hand holding a phone showing the Paylane app home screen with a balance and recent activity", caption: "The app" },
  insta: { src: "/work/paylane/instagram.webp", alt: "A phone showing the Paylane Instagram profile with a grid of navy and lime posts", caption: "Instagram" },
  tee: { src: "/work/paylane/tshirt-cap.webp", alt: "A folded navy t-shirt and a navy cap printed with the white Paylane logo", caption: "Merch" },
  poster: { src: "/work/paylane/poster.webp", alt: "A framed A3 navy poster with the Paylane logo and the line 'Your fast lane to getting paid'", caption: "The poster" },
  flat: { src: "/work/paylane/flat-lay.webp", alt: "A flat lay of the full Paylane identity on navy: stationery, cards, card terminal, t-shirts, caps, tote bag, mug and posters", caption: "The whole system" },
};

function Shot({ s, priority = false, className = "aspect-[1376/768]", sizes = "(min-width: 1600px) 1500px, 92vw" }: { s: (typeof shots)[keyof typeof shots]; priority?: boolean; className?: string; sizes?: string }) {
  return (
    <figure>
      <div className={`relative overflow-hidden rounded-[1.2rem] bg-stage md:rounded-[1.6rem] ${className}`}>
        <Image src={s.src} alt={s.alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"} className="object-cover" />
      </div>
      <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45">{s.caption}</figcaption>
    </figure>
  );
}

const Row = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <Reveal delay={delay} y={44}>
    {children}
  </Reveal>
);

export default function PaylaneCase() {
  return (
    <>
      {/* Title and hero */}
      <header className="relative overflow-hidden bg-paper px-5 pb-10 pt-32 text-ink md:px-10 md:pb-14 md:pt-44">
        <GridPattern className="inset-0 -z-0" />
        <Blob variant={1} className="-right-24 -top-10 w-[26rem] text-ember opacity-[0.08] md:-right-10 md:w-[34rem]" />
        <div className="relative mx-auto max-w-[1600px]">
          <nav aria-label="Breadcrumb" className={`${label} flex items-center gap-2`}>
            <Link href="/work" className="transition-colors hover:text-ink">
              Work
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">Paylane</span>
          </nav>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-[clamp(2.2rem,7vw,6.6rem)] font-bold leading-[1] tracking-[-0.035em]">Paylane: Brand Identity</h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 text-[15px] font-medium text-ink/60 md:text-lg">Concept project · Fintech · Lagos</p>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <Shot s={shots.billboard} priority sizes="(min-width: 1600px) 1500px, 92vw" />
          </div>
        </div>
      </header>

      <div className="bg-paper px-5 pb-24 text-ink md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1600px] gap-20 md:gap-32">
          {/* Brief */}
          <section className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
            <Reveal>
              <p className={label}>01 / The brief</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className={body}>Paylane is a payments app for Nigerian small businesses and freelancers. It needed a brand that feels fast, trustworthy and unmistakably local, without looking like every other fintech.</p>
            </Reveal>
          </section>

          <Row>
            <Shot s={shots.glass} />
          </Row>

          {/* Challenge */}
          <section className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
            <Reveal>
              <p className={label}>02 / The challenge</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className={body}>Nigerian fintech is a sea of green, purple and blue. Most brands sell &ldquo;banking&rdquo;. Paylane sells speed: getting paid without the &ldquo;transfer pending&rdquo; anxiety.</p>
            </Reveal>
          </section>

          <Row>
            <Shot s={shots.card} />
          </Row>

          {/* Idea + logo */}
          <section>
            <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
              <Reveal>
                <p className={label}>03 / The idea</p>
              </Reveal>
              <div className="relative">
                <Reveal delay={0.08}>
                  <p className={body}>The logo is a P built from lane markings. The navy blocks are the road and the lime bowl is the destination, so it&apos;s a fast lane straight into the wordmark.</p>
                </Reveal>
                <LaneArt className="mt-8 w-40 md:absolute md:-top-6 md:right-0 md:mt-0 md:w-56" />
              </div>
            </div>
            <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
              <Reveal y={36}>
                <div className="grid aspect-[10/6] place-items-center overflow-hidden rounded-[1.2rem] bg-[#F5F7FA] ring-1 ring-black/5 md:rounded-[1.6rem]">
                  <Image src="/work/paylane/logo-light.webp" alt="Paylane logo in full colour on a light background: navy lane-marking blocks, a lime P bowl and the lowercase wordmark" width={800} height={280} loading="lazy" sizes="(min-width: 768px) 46vw, 92vw" className="w-[78%]" />
                </div>
              </Reveal>
              <Reveal y={36} delay={0.1}>
                <div className="grid aspect-[10/6] place-items-center overflow-hidden rounded-[1.2rem] bg-[#0B1B3F] md:rounded-[1.6rem]">
                  <Image src="/work/paylane/logo-dark.webp" alt="Paylane logo in white and lime on Midnight Navy" width={800} height={280} loading="lazy" sizes="(min-width: 768px) 46vw, 92vw" className="w-[78%]" />
                </div>
              </Reveal>
            </div>
          </section>

          <Row>
            <Shot s={shots.danfo} />
          </Row>

          {/* Colours */}
          <section>
            <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
              <Reveal>
                <p className={label}>04 / Colors</p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className={body}>Midnight Navy (trust), Electric Lime (speed, and a color no Nigerian fintech owns), Cloud (clean space), Signal Coral (alerts).</p>
              </Reveal>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-5">
              {swatches.map((s, i) => (
                <li key={s.hex}>
                  <Reveal delay={i * 0.07} y={30}>
                    <div
                      className={`flex aspect-[4/5] flex-col justify-between rounded-[1.2rem] p-4 md:rounded-[1.6rem] md:p-6 ${s.dark ? "text-white" : "text-[#0B1B3F]"} ${s.hex === "#F5F7FA" ? "ring-1 ring-black/10" : ""}`}
                      style={{ background: s.hex }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">{s.note}</span>
                      <span>
                        <span className="block font-display text-lg font-bold leading-tight tracking-[-0.02em] md:text-2xl">{s.name}</span>
                        <span className="mt-1 block font-mono text-[12px] uppercase opacity-70">{s.hex}</span>
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          <Row>
            <Shot s={shots.door} />
          </Row>

          {/* Type */}
          <section className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
            <Reveal>
              <p className={label}>05 / Type</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className={body}>Clash Display for bold headlines, and Satoshi for clean, readable UI.</p>
            </Reveal>
          </section>

          <Row>
            <Shot s={shots.app} />
          </Row>
          <Row>
            <Shot s={shots.insta} />
          </Row>
          <Row>
            <Shot s={shots.tee} />
          </Row>

          {/* Result + poster */}
          <section className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <Reveal>
                <p className={label}>06 / The result</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className={h2}>A complete identity system</h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className={`${body} mt-6`}>A complete identity system that&apos;s ready for launch, from app icon to danfo wrap.</p>
              </Reveal>
            </div>
            <Reveal y={50} delay={0.1}>
              <Shot s={shots.poster} className="mx-auto aspect-[896/1200] max-w-sm md:max-w-none" sizes="(min-width: 768px) 40vw, 92vw" />
            </Reveal>
          </section>

          <Row>
            <Shot s={shots.flat} />
          </Row>
        </div>
      </div>

      {/* CTA */}
      <section className="relative -mt-8 overflow-hidden rounded-t-[2rem] bg-[#0B1B3F] px-5 py-20 text-white md:px-10 md:py-28">
        <Blob className="-bottom-24 -left-20 w-[28rem] text-[#C6F432] opacity-[0.10]" />
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(1.9rem,5.2vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.03em]">Got a startup that needs a brand this sharp?</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/packages" className="group inline-flex items-center gap-2 rounded-full bg-[#C6F432] px-8 py-4 text-[15px] font-semibold text-[#0B1B3F] transition-transform duration-300 hover:scale-105 active:scale-[0.97]">
              Start your brand
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
