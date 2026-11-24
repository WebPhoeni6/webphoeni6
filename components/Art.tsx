import { Reveal } from "./ui";

/**
 * Decorative graphics for the site. One style throughout: thick rounded strokes in the page's ink
 * colour, one flat ember shape per picture, and a soft tint behind it. Everything is inline SVG so it
 * costs almost nothing, follows light and dark themes through currentColor, and is hidden from
 * screen readers. The line drawing and gentle float run once the picture scrolls into view.
 */

const stroke = { stroke: "currentColor", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;

type P = { className?: string; delay?: number; light?: boolean };

/** A faint grid that fades out towards one corner. Sits behind a section's content. */
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute text-ink opacity-[0.07] ${className}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <pattern id="art-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <linearGradient id="art-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="art-mask">
          <rect width="100%" height="100%" fill="url(#art-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#art-grid)" mask="url(#art-mask)" />
    </svg>
  );
}

/** A soft organic shape. Tint it with a text colour class, for example text-ember. */
export function Blob({ className = "", variant = 0 }: { className?: string; variant?: 0 | 1 }) {
  const d =
    variant === 0
      ? "M421 91c60 46 62 130 20 196s-122 114-208 112S61 345 49 262 94 101 175 66s186-21 246 25z"
      : "M388 78c58 34 78 112 51 180s-97 117-175 130-163-12-197-76 8-143 62-188S330 44 388 78z";
  return (
    <svg aria-hidden viewBox="0 0 480 440" className={`pointer-events-none absolute ${className}`}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/** Three loose lines, used as an accent beside headings. */
export function LineAccent({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 40" className={`pointer-events-none text-ember ${className}`} fill="none">
      <path className="art-draw" pathLength={1} d="M4 8c28-8 40 8 68 0s40-8 84 0" {...stroke} strokeWidth={4} />
      <path className="art-draw" pathLength={1} d="M4 20c28-8 40 8 68 0s40-8 84 0" {...stroke} strokeWidth={4} opacity={0.6} />
      <path className="art-draw" pathLength={1} d="M4 32c28-8 40 8 68 0s40-8 84 0" {...stroke} strokeWidth={4} opacity={0.3} />
    </svg>
  );
}

function Frame({ children, className, delay = 0, light = false }: { children: React.ReactNode; className?: string; delay?: number; light?: boolean }) {
  return (
    <Reveal delay={delay} y={20} className={className}>
      <div aria-hidden className={`art-float relative ${light ? "text-white" : "text-ink"}`}>
        {children}
      </div>
    </Reveal>
  );
}

/** A browser window being built: for websites and services. */
export function BuildArt({ className = "", delay = 0, light }: P) {
  return (
    <Frame className={className} delay={delay} light={light}>
      <svg viewBox="0 0 240 200" fill="none" className="w-full">
        <circle cx="120" cy="104" r="86" className="fill-ember/10" />
        <rect x="26" y="34" width="176" height="126" rx="14" {...stroke} className="art-draw" pathLength={1} />
        <path d="M26 62h176" {...stroke} strokeWidth={4} />
        <circle cx="44" cy="48" r="3.5" fill="currentColor" />
        <circle cx="58" cy="48" r="3.5" fill="currentColor" opacity=".5" />
        <circle cx="72" cy="48" r="3.5" fill="currentColor" opacity=".25" />
        <rect x="44" y="80" width="62" height="62" rx="9" className="fill-ember" />
        <path d="M122 84h64M122 102h46M122 120h58M122 138h30" {...stroke} strokeWidth={4} className="art-draw" pathLength={1} />
        <path d="M168 128l30 30 6-16 16-6z" fill="currentColor" stroke="var(--color-paper)" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="214" cy="40" r="11" className="fill-ember" />
      </svg>
    </Frame>
  );
}

/** A bezier curve with anchor points beside a logo shape: for brand and design work. */
export function BrandArt({ className = "", delay = 0, light }: P) {
  return (
    <Frame className={className} delay={delay} light={light}>
      <svg viewBox="0 0 240 200" fill="none" className="w-full">
        <circle cx="124" cy="100" r="88" className="fill-ember/10" />
        <path d="M30 150C60 40 120 40 128 100S190 170 214 56" {...stroke} className="art-draw" pathLength={1} />
        <path d="M30 150L58 112M214 56L186 92" {...stroke} strokeWidth={3} opacity={0.4} />
        {[
          [30, 150],
          [128, 100],
          [214, 56],
        ].map(([x, y]) => (
          <rect key={x} x={x - 8} y={y - 8} width="16" height="16" rx="3" fill="var(--color-paper)" stroke="currentColor" strokeWidth="4" />
        ))}
        <circle cx="58" cy="112" r="5" className="fill-ember" />
        <circle cx="186" cy="92" r="5" className="fill-ember" />
        <rect x="150" y="124" width="64" height="48" rx="10" className="fill-ember" />
        <path d="M164 148h36M164 160h22" stroke="var(--color-paper)" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </Frame>
  );
}

/** Lane markings running into a point: for the packages page and anything about getting somewhere fast. */
export function LaneArt({ className = "", delay = 0, light }: P) {
  return (
    <Frame className={className} delay={delay} light={light}>
      <svg viewBox="0 0 240 200" fill="none" className="w-full">
        <circle cx="120" cy="100" r="88" className="fill-ember/10" />
        <path d="M22 186L96 28M218 186L144 28" {...stroke} className="art-draw" pathLength={1} />
        <path d="M120 176v-18M120 140v-24M120 98v-30M120 50v-16" {...stroke} strokeWidth={8} className="art-draw" pathLength={1} />
        <circle cx="120" cy="20" r="12" className="fill-ember" />
        <path d="M40 150h26M174 150h26" {...stroke} strokeWidth={4} opacity={0.35} />
      </svg>
    </Frame>
  );
}

/** A flame: for the contact section and the Flame package. */
export function FlameArt({ className = "", delay = 0, light }: P) {
  return (
    <Frame className={className} delay={delay} light={light}>
      <svg viewBox="0 0 240 200" fill="none" className="w-full">
        <circle cx="120" cy="104" r="86" className="fill-ember/10" />
        <path d="M120 24c8 34 52 52 52 98a52 52 0 01-104 0c0-22 12-34 22-46 2 14 8 22 16 26-4-34 6-56 14-78z" {...stroke} className="art-draw" pathLength={1} />
        <path d="M120 100c4 18 24 28 24 48a24 24 0 01-48 0c0-12 8-20 14-26 2 8 6 12 10 14-2-14 0-24 0-36z" className="fill-ember" />
        <path d="M44 168h152" {...stroke} strokeWidth={4} opacity={0.35} />
      </svg>
    </Frame>
  );
}
