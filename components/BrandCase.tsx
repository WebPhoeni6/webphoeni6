import Image from "next/image";
import type { Project } from "@/lib/content";
import LogoMark from "./LogoMark";
import { Reveal } from "./ui";

/** Black or white text, whichever reads better on a color. */
function onColor(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.42 ? "#111111" : "#ffffff";
}

const kicker = "text-[11px] font-semibold uppercase tracking-[0.18em]";

/**
 * A brand case study laid out as a stack of boards, one idea per board: the hero mockup, the logo
 * with the story, the colors, then the logo in use, and a closing board. Everything is drawn in the
 * brand's own colors, so each identity reads like its own presentation.
 */
export default function BrandCase({ p }: { p: Project }) {
  const b = p.brand;
  if (!b) return null;
  const name = p.title.split(": ")[0];
  const key = name.toLowerCase();
  const m = p.mockups ?? [];
  const find = (part: string) => m.find((s) => s.includes(`-${part}.`));
  // Every identity has a phone-in-hand mockup, even when its set leads with the app-icon screen.
  const hero = find("phone") ?? `/work/mockups/${key}-phone.webp`;
  const pairs: { src: string; label: string }[][] = [
    [
      { src: find("card") ?? "", label: "Business card" },
      { src: find("mug") ?? "", label: "Mug" },
    ],
    [
      { src: find("sign") ?? "", label: "Signage" },
      { src: find("tee") ?? "", label: "T-shirt" },
    ],
  ].map((row) => row.filter((x) => x.src));

  const primaryText = onColor(b.primary);
  const mutedOnPrimary = primaryText === "#ffffff" ? "rgba(255,255,255,0.78)" : "rgba(17,17,17,0.72)";

  return (
    <section aria-label={`${name} brand identity case study`} className="mx-auto max-w-[1200px] px-5 pb-24 md:px-10">
      <div className="overflow-hidden rounded-[1.5rem] bg-card shadow-[0_2px_24px_rgba(0,0,0,0.12)]">
        {/* 1. Hero */}
        {hero && (
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]" style={{ background: b.tint }}>
              <Image src={hero} alt={`${name} logo in use`} fill priority sizes="(min-width: 1200px) 1100px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        )}

        {/* 2. The logo and the story */}
        <Reveal>
          <div className="grid md:grid-cols-2">
            <div className="grid place-items-center p-10 md:aspect-[4/3] md:p-14" style={{ background: b.tint }}>
              <Image src={b.mark} alt={`${name} logo`} width={900} height={Math.round(900 / b.markRatio)} sizes="(min-width: 768px) 460px, 80vw" className="h-auto max-h-[300px] w-auto max-w-[78%] object-contain" />
            </div>
            <div className="flex flex-col justify-center gap-6 p-8 md:p-12" style={{ background: b.primary, color: primaryText }}>
              <div>
                <p className={kicker} style={{ color: mutedOnPrimary }}>
                  The brief
                </p>
                <p className="mt-2 text-[13px] leading-relaxed md:text-sm">{b.challenge}</p>
              </div>
              <div>
                <p className={kicker} style={{ color: mutedOnPrimary }}>
                  The idea
                </p>
                <p className="mt-2 text-[13px] leading-relaxed md:text-sm">{b.approach}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. Color, and the small version of the mark */}
        <Reveal>
          <div className="bg-paper p-8 md:p-12">
            <div className="flex items-end justify-between gap-6">
              <p className={`${kicker} text-ink/50`}>Brand colors</p>
              {b.icon && <p className={`${kicker} hidden text-ink/50 sm:block`}>Icon</p>}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {b.colors.map((c) => (
                  <div key={c.hex}>
                    <div className="aspect-[4/5] rounded-2xl ring-1 ring-ink/10" style={{ background: c.hex }} />
                    <p className="mt-2 text-[12px] font-semibold">{c.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-ink/50">{c.hex}</p>
                  </div>
                ))}
              </div>
              {b.icon && (
                <div className="hidden w-40 sm:block md:w-48">
                  <div className="relative aspect-square overflow-hidden rounded-[1.6rem] ring-1 ring-ink/10" style={{ background: b.tint }}>
                    <Image src={b.icon} alt={`${name} icon`} fill sizes="192px" className="object-contain p-7" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* 4. Sketch, when there is one */}
        {b.sketch && (
          <Reveal>
            <div className="bg-card p-8 md:p-12">
              <p className={`${kicker} text-ink/50`}>First sketches</p>
              <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl bg-white">
                <Image src={b.sketch} alt={`${name} sketch`} fill sizes="1100px" className="object-contain" />
              </div>
            </div>
          </Reveal>
        )}

        {/* 5. In use, two at a time */}
        {pairs.map(
          (row, i) =>
            row.length > 0 && (
              <Reveal key={i}>
                <div className={`grid ${row.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {row.map((it) => (
                    <figure key={it.src} className="relative aspect-square overflow-hidden" style={{ background: b.tint }}>
                      <Image src={it.src} alt={`${name} ${it.label.toLowerCase()} mockup`} fill sizes="(min-width: 1200px) 550px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                      <figcaption className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">{it.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            ),
        )}

        {/* 6. Closing board */}
        <Reveal>
          <div className="grid gap-10 p-8 md:grid-cols-[1.3fr_1fr] md:items-end md:p-14" style={{ background: b.primary, color: primaryText }}>
            <p className="font-display text-[clamp(2.2rem,7vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              Thank
              <br />
              you.
            </p>
            <div>
              <ul className="space-y-1.5 text-[13px] font-medium">
                {p.services.split(",").map((s) => (
                  <li key={s}>{s.trim().replace(/^./, (c) => c.toUpperCase())}</li>
                ))}
                <li>Color system and mockups</li>
              </ul>
              <div className="mt-8 flex items-center gap-3" style={{ color: mutedOnPrimary }}>
                <LogoMark className="size-8" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Designed by
                  <br />
                  <span style={{ color: primaryText }}>Samuel Emeka</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="sr-only">{key} case study</p>
    </section>
  );
}
