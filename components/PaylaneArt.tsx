import { Reveal } from "./ui";

/**
 * Vector illustrations for the Paylane case study, drawn in Paylane's own colors (navy, lime, coral, cloud).
 * Each sits on its own colored panel so it reads the same in the light and dark theme. Same style as the rest of the
 * site: thick rounded strokes, flat fills, and a line that draws in when it scrolls into view.
 */
const NAVY = "#0B1B3F";
const LIME = "#C6F432";
const CORAL = "#FF6B4A";
const CLOUD = "#F5F7FA";

const line = { strokeWidth: 6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Panel({ bg, children, delay = 0, label }: { bg: string; children: React.ReactNode; delay?: number; label: string }) {
  return (
    <Reveal delay={delay} y={30}>
      <div role="img" aria-label={label} className="art-float relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem]" style={{ background: bg }}>
        <svg viewBox="0 0 240 180" fill="none" className="absolute inset-0 size-full" aria-hidden>
          {children}
        </svg>
      </div>
    </Reveal>
  );
}

/** The brief: a phone taking a payment along a lane. */
export function BriefArt({ delay }: { delay?: number }) {
  return (
    <Panel bg={NAVY} delay={delay} label="Illustration of a phone showing a confirmed payment">
      <path d="M20 150h200" stroke={LIME} opacity={0.25} {...line} strokeWidth={4} strokeDasharray="2 14" />
      <rect x="78" y="22" width="84" height="136" rx="16" stroke={CLOUD} className="art-draw" pathLength={1} {...line} />
      <path d="M100 40h40" stroke={CLOUD} opacity={0.4} {...line} strokeWidth={4} />
      <circle cx="120" cy="86" r="22" fill={LIME} />
      <path d="M109 87l8 8 15-17" stroke={NAVY} {...line} strokeWidth={6} className="art-draw" pathLength={1} />
      <path d="M96 128h48M104 142h32" stroke={CLOUD} opacity={0.45} {...line} strokeWidth={5} />
      <circle cx="40" cy="60" r="7" fill={CORAL} />
      <circle cx="204" cy="112" r="9" fill={LIME} opacity={0.5} />
      <path d="M180 48h22M191 37v22" stroke={LIME} {...line} strokeWidth={4} />
    </Panel>
  );
}

/** The challenge: a crowd of green, purple and blue, and one lime circle that is not like the others. */
export function ChallengeArt({ delay }: { delay?: number }) {
  const crowd = ["#2E9E6B", "#7B5CFF", "#2F6BFF"];
  const dots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) if (!(r === 1 && c === 4)) dots.push({ x: 30 + c * 36, y: 32 + r * 38, f: crowd[(r * 6 + c) % 3] });
  return (
    <Panel bg={CLOUD} delay={delay} label="Illustration of many green, purple and blue circles with one lime circle standing out">
      {dots.map((d) => (
        <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r="13" fill={d.f} opacity={0.85} />
      ))}
      <circle cx="174" cy="70" r="24" fill={LIME} stroke={NAVY} className="art-draw" pathLength={1} {...line} />
      <path d="M200 30l-14 18M206 46l-18 8" stroke={NAVY} {...line} strokeWidth={4} />
    </Panel>
  );
}

/** The idea: a road of lane markings running into a destination. */
export function IdeaArt({ delay }: { delay?: number }) {
  return (
    <Panel bg={LIME} delay={delay} label="Illustration of a road with lane markings leading to a destination">
      <path d="M22 168L92 28h56l70 140z" fill={NAVY} />
      <path d="M120 164v-16M120 132v-22M120 94v-26M120 52v-12" stroke={CLOUD} {...line} strokeWidth={8} className="art-draw" pathLength={1} />
      <circle cx="120" cy="22" r="14" fill={CORAL} stroke={NAVY} {...line} strokeWidth={5} />
      <path d="M30 40h34M176 56h34" stroke={NAVY} opacity={0.35} {...line} strokeWidth={5} />
    </Panel>
  );
}

/** Type: a big A and a, built from simple strokes. */
export function TypeArt({ delay }: { delay?: number }) {
  return (
    <Panel bg={NAVY} delay={delay} label="Illustration of a large capital A and a small a">
      <path d="M30 144L74 36l44 108M46 108h56" stroke={CLOUD} className="art-draw" pathLength={1} {...line} strokeWidth={9} />
      <circle cx="166" cy="116" r="26" stroke={LIME} className="art-draw" pathLength={1} {...line} strokeWidth={9} />
      <path d="M192 90v54" stroke={LIME} {...line} strokeWidth={9} />
      <path d="M26 160h188" stroke={CORAL} {...line} strokeWidth={4} opacity={0.8} />
    </Panel>
  );
}

/** The result: the app icon with the identity around it, ready to launch. */
export function ResultArt({ delay }: { delay?: number }) {
  return (
    <Panel bg={CORAL} delay={delay} label="Illustration of the Paylane app icon with sparkles around it, ready to launch">
      <rect x="70" y="34" width="100" height="100" rx="26" fill={NAVY} />
      <path d="M96 56h20v22H96zM96 84h20v22H96zM96 112h46v14H96z" fill={CLOUD} />
      <path d="M120 56h8a14 14 0 010 28h-8z" fill={LIME} />
      <path d="M40 60l10 10M40 70l10-10M196 46l8 8M196 54l8-8M198 120l10 10M198 130l10-10" stroke={NAVY} {...line} strokeWidth={4} className="art-draw" pathLength={1} />
      <path d="M52 152h136" stroke={NAVY} opacity={0.35} {...line} strokeWidth={4} strokeDasharray="2 12" />
    </Panel>
  );
}
