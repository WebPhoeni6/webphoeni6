/**
 * Brand portfolio content. The briefs are DRAFTS written from what the files
 * show. Rewrite the "challenge" and "approach" lines in your own words
 * before sending, and keep them short.
 */

export type BrandWork = {
  name: string;
  type: string;
  challenge: string;
  approach: string;
  mark: string;
  markRatio: number; // width / height of the mark file
  icon?: string;
  iconRatio?: number;
  sketch?: string;
  /** Mascot artwork shown beside the mark on the same board. */
  characters?: { line: string; color: string; bg: string };
  /** Five mockups: lead, card, mug, sign, tee. Defaults to the files named after the brand. */
  mockups?: string[];
  /** "app" when the lead mockup is a phone home screen with the app icon. */
  mockupLayout?: "app" | "phone";
  primary: string;
  tint: string;
  colors: { name: string; hex: string }[];
};

export const brands: BrandWork[] = [
  {
    name: "Pendu",
    type: "Brand identity and mascot / Community messaging app",
    challenge: "A voice-and-chat app for gaming communities needed an identity of its own next to Discord.",
    approach: "The mark joins a P and a D into one blocky monogram, set above a squared wordmark. A single periwinkle blue keeps it recognizable at app-icon size. The mascot, drawn in line and in flat color, covers stickers and reactions.",
    mark: "/work/pendu2-mark.png",
    markRatio: 900 / 1112,
    icon: "/work/pendu2-icon.png",
    iconRatio: 900 / 884,
    characters: { line: "/work/pendu-char-line.svg", color: "/work/pendu-char-color.svg", bg: "#FFF6BF" },
    primary: "#5B6CFF",
    tint: "#EEF0FF",
    colors: [
      { name: "Primary", hex: "#5B6CFF" },
      { name: "Ink", hex: "#0E1220" },
      { name: "Mist", hex: "#EEF0FF" },
    ],
  },
  {
    name: "Vowrify",
    type: "Brand identity / Payment protection",
    challenge: "Protected payments can feel bureaucratic. People handing over a large deposit needed something that felt simple and safe.",
    approach: "A check mark next to a heavy wordmark. The teal-to-green gradient reads as confirmed, and the black type keeps it serious enough to trust with money.",
    mark: "/work/vowrify-mark.png",
    markRatio: 894 / 190,
    primary: "#00C057",
    tint: "#E8F8EF",
    colors: [
      { name: "Green", hex: "#00C057" },
      { name: "Teal", hex: "#00D2B4" },
      { name: "Ink", hex: "#0A0A0A" },
    ],
  },
  {
    name: "Sendforte",
    type: "Logo / Delivery brand",
    challenge: "A delivery brand that should feel fast and friendly, and say what it does.",
    approach: "A rounded wordmark where a location pin replaces the o, so the name already points at delivery. Orange for energy, blue for trust.",
    mark: "/work/sendforte-mark.png",
    markRatio: 1029 / 200,
    icon: "/work/sendforte-icon.png",
    iconRatio: 124 / 196,
    primary: "#F7941D",
    tint: "#FFF3E3",
    colors: [
      { name: "Orange", hex: "#F7941D" },
      { name: "Blue", hex: "#00A3E0" },
      { name: "Ink", hex: "#1A1A1A" },
    ],
  },
  {
    name: "Hommission",
    type: "Logo / Real estate",
    challenge: "A real-estate brand that looks warm instead of corporate blue.",
    approach: "The H is drawn as a house, so the letter and the category are one shape. Coral keeps it friendly, and a heavy black wordmark anchors it.",
    mark: "/work/hommission-mark.png",
    markRatio: 900 / 158,
    icon: "/work/hommission-icon.png",
    iconRatio: 829 / 834,
    primary: "#F46448",
    tint: "#FFEFEA",
    colors: [
      { name: "Coral", hex: "#F46448" },
      { name: "Black", hex: "#000000" },
      { name: "Blush", hex: "#FFEFEA" },
    ],
  },
  {
    name: "Trackr",
    type: "Logo / Tracking product",
    challenge: "A tracking tool that should feel calm and dependable.",
    approach: "A lowercase wordmark where the t and r share a stroke, ending in a bold green full stop. The sketch shows the letters worked out by hand first.",
    mark: "/work/trackr-mark.png",
    markRatio: 900 / 241,
    icon: "/work/trackr-icon.png",
    iconRatio: 644 / 560,
    sketch: "/work/trackr-sketch.jpg",
    primary: "#006C49",
    tint: "#E7F2EE",
    colors: [
      { name: "Green", hex: "#006C49" },
      { name: "Ink", hex: "#231F20" },
      { name: "Mist", hex: "#E7F2EE" },
    ],
  },
  {
    name: "Unipulse",
    type: "Logo / Learning product",
    challenge: "Show learning without a graduation cap or a pile of books.",
    approach: "The U is drawn as an open book. Navy carries the trust, and one red dot adds the pulse.",
    mark: "/work/unipulse-mark.png",
    markRatio: 900 / 273,
    icon: "/work/unipulse-icon.png",
    iconRatio: 500 / 671,
    primary: "#111827",
    tint: "#EEF0F4",
    colors: [
      { name: "Navy", hex: "#111827" },
      { name: "Red", hex: "#ED1C24" },
      { name: "Cloud", hex: "#EEF0F4" },
    ],
  },
  {
    name: "Linkco",
    type: "Logo / Power bank brand",
    challenge: "A power-bank brand named around the idea of connection.",
    approach:
      "Two linked hexagons make the icon, and the wordmark pairs a black LINK with a cyan CO so the join reads at a glance. It works as a small icon on hardware and as a full lockup on packaging.",
    mark: "/work/linkco-mark.png",
    markRatio: 900 / 151,
    icon: "/work/linkco-icon.png",
    iconRatio: 751 / 600,
    primary: "#33D1EC",
    tint: "#E9FAFD",
    colors: [
      { name: "Cyan", hex: "#33D1EC" },
      { name: "Black", hex: "#111111" },
      { name: "Mist", hex: "#E9FAFD" },
    ],
  },
];

export const campaigns = {
  linkco: {
    title: "Linkco",
    type: "Campaign / Power bank launch posters",
    challenge: "Launching a 50,000 mAh power bank in a category where every product looks alike.",
    approach:
      "Large numerals sit behind a lit power bank on a pedestal, so the spec is the hero. Callouts stay small. Both posters follow the same layout rules.",
    images: ["/work/linco-max.webp", "/work/linco-50000.webp"],
  },
  explorations: {
    title: "Poster explorations",
    type: "Type-led poster studies",
    sets: [
      ["/work/for-the-record.webp", "/work/maze.webp", "/work/reveal.webp"],
      ["/work/polar.webp", "/work/liquid-gold.webp", "/work/june.webp"],
    ],
  },
};

/** Brands whose lead mockup is a phone home screen with the app icon, not a hand holding a phone. */
const appIconLead = ["unipulse", "sendforte", "pendu", "hommission"];

/** The five mockups for a brand, big one first, then card, mug, sign, tee. */
export const mockupSet = (name: string) => {
  const n = name.toLowerCase();
  const lead = appIconLead.includes(n) ? "app" : "phone";
  return [lead, "card", "mug", "sign", "tee"].map((k) => `/work/mockups/${n}-${k}.webp`);
};
