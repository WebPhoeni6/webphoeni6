// Brand marks, shown in white. `h` is the height class: wide wordmarks sit lower than tall or square marks.
const logos: { name: string; src: string; w: number; ht: number; h: string }[] = [
  { name: "Pendu", src: "/work/ticker-pendu.webp", w: 58, ht: 72, h: "h-9 md:h-11" },
  { name: "Vowrify", src: "/work/ticker-vowrify.webp", w: 226, ht: 48, h: "h-5 md:h-6" },
  { name: "Sendforte", src: "/work/ticker-sendforte.webp", w: 247, ht: 48, h: "h-5 md:h-6" },
  { name: "Hommission", src: "/work/ticker-hommission.webp", w: 273, ht: 48, h: "h-5 md:h-6" },
  { name: "Unipulse", src: "/work/ticker-unipulse.webp", w: 185, ht: 56, h: "h-6 md:h-7" },
  { name: "Linkco", src: "/work/ticker-linkco.webp", w: 286, ht: 48, h: "h-5 md:h-6" },
  { name: "Rendo", src: "/work/ticker-rendo.webp", w: 327, ht: 72, h: "h-7 md:h-9" },
  { name: "Earlybean", src: "/work/ticker-earlybean.webp", w: 64, ht: 64, h: "h-7 md:h-8" },
];

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="mx-5 size-3 shrink-0 text-white/25 md:mx-8 md:size-3.5" aria-hidden>
      <path fill="currentColor" d="M12 0c.7 6.6 4.9 10.8 12 12-7.1 1.2-11.3 5.4-12 12-.7-6.6-4.9-10.8-12-12C7.100 10.800 11.300 6.600 12 0Z" />
    </svg>
  );
}

/** Brand logos on a slow loop under the hero. Pure CSS, so it costs the main thread nothing. Pauses on hover. */
export default function Marquee() {
  return (
    <div className="m-wrap overflow-hidden border-t border-white/10 bg-[#111] pb-12 pt-6 text-white md:pb-14 md:pt-7" role="img" aria-label={`Brands I have worked on: ${logos.map((l) => l.name).join(", ")}`}>
      <div className="m-track flex w-max items-center whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} aria-hidden className="flex shrink-0 items-center">
            {logos.map((l) => (
              <span key={`${k}-${l.name}`} className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.src}
                  width={l.w}
                  height={l.ht}
                  loading="lazy"
                  decoding="async"
                  alt=""
                  draggable={false}
                  className={`${l.h} w-auto max-w-none select-none opacity-55 transition-opacity duration-300 hover:opacity-100`}
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
