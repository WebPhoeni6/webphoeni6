/**
 * Everything personal lives here. Edit this file, nothing else, to change
 * the copy, links, dates and projects shown on the site.
 */

import { brands, mockupSet, type BrandWork } from "./brand";

export const profile = {
  firstName: "Samuel",
  lastName: "Emeka",
  role: "Developer and designer",
  blurb: "I design and build products, from the logo to the backend.",
  status: "Open to new projects",
  // Put a transparent-background portrait at /public/samuel.webp and it will
  // replace the poster collage in the hero automatically.
  portrait: "/samuel.webp",
  // TODO: add your real email and profile URLs. Empty values hide the link.
  email: "devsamuel0611@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://ng.linkedin.com/in/samuelemekawp" },
    { label: "Instagram", href: "https://www.instagram.com/web_phoenix___/" },
    { label: "Telegram", href: "https://t.me/webphoeni6" },
    { label: "WhatsApp", href: "https://wa.me/qr/BCKVQZZLC4HZG1" },
    { label: "Discord", href: "https://discord.com/users/1109887724808315030" },
    { label: "Facebook", href: "https://www.facebook.com/webphoeni6" },
  ],
};

export type Category = "Development" | "Design" | "Branding";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  category: Category;
  tags: string[];
  summary: string;
  description: string;
  services: string;
  timeline: string;
  tools: string[];
  /** Your part in the project, shown beside the tools. */
  role?: string;
  /** Short, concrete points shown as "What I built" on the project page. */
  highlights?: string[];
  cover: string;
  /** Solid background used behind logo-style covers. */
  coverBg?: string;
  coverFit?: "cover" | "contain";
  coverPad?: boolean;
  /** Portrait poster: cards use a 4:5 tile instead of 5:4. */
  poster?: boolean;
  /** Cover is a website screenshot: cards use a 16:10 tile. */
  shot?: boolean;
  /** Brand mockups shown in an "In use" section on the project page. */
  mockups?: string[];
  /**
   * Hover preview on the Work grid: after a short dwell, a browser-style frame
   * opens and scrolls this full-page capture as the mouse moves. `height` is the
   * page height in CSS pixels at 1440px wide.
   */
  preview?: { url: string; height: number; image: string };
  gallery: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    bg?: string;
  }[];
  link?: string;
};

const w = (f: string) => `/work/${f}.webp`;

export const projects: Project[] = [
  {
    slug: "vowrify",
    mockups: mockupSet("Vowrify"),
    title: "Vowrify: Protected transactions",
    kind: "Fintech Platform",
    category: "Development",
    tags: ["Web App", "Fintech"],
    summary: "A safe way to pay for something big when you don't know the other person yet.",
    description: "Vowrify makes it safe to pay for something big when you don't know the other person yet. The money stays with a licensed partner until both sides have done what they agreed, and Vowrify keeps the record of who agreed to what. I'm designing and building all of it: the brand, the screens and the system behind them.",
    services: "Product design, full-stack development",
    role: "Founder, design and engineering",
    timeline: "In progress",
    tools: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "React"],
    highlights: [
      "The logo, colors and screens, made to feel calm and trustworthy when real money is involved.",
      "A system that keeps one clear record of every step, so nobody can argue later about what was agreed.",
      "Built in small pieces. I finish each screen together with the system behind it and test it before starting the next.",
    ],
    cover: "/work/live/vowrify-1.webp",
    shot: true,
    coverFit: "cover",
    gallery: [
      { src: "/work/live/vowrify-1.webp", alt: "Vowrify home page" },
      { src: "/work/live/vowrify-2.webp", alt: "What every Vow gives you" },
      { src: "/work/live/vowrify-3.webp", alt: "How a Vow runs" },
      {
        src: "/work/vowrify-mark.png",
        alt: "Vowrify logo",
        fit: "contain",
        bg: "#e9f7ef",
      },
    ],
    link: "https://vowrify.com/",
    preview: {
      url: "https://vowrify.com/",
      height: 4958,
      image: "/work/live/vowrify-full.webp",
    },
  },
  {
    slug: "pendu",
    mockups: mockupSet("Pendu"),
    title: "Pendu: Voice and chat for gamers",
    kind: "Mobile and web app",
    category: "Development",
    tags: ["Mobile App", "Real-time"],
    summary: "Voice, chat and calls for gaming communities, on mobile and web.",
    description: "Gaming groups usually end up with one app for voice, another for chat and a third for finding people to play with. Pendu puts chat, voice and video calls and finding communities in one free app for Android, iOS and the web. I designed the brand and the screens, and built the apps and the system behind them.",
    services: "Brand, UI/UX design, mobile and web development",
    role: "Product designer and developer",
    timeline: "2026",
    tools: ["Flutter", "React", "Node.js", "Socket.IO", "PostgreSQL", "Redis"],
    highlights: [
      "Chat with replies, reactions, voice notes and link previews, plus one-to-one and group calls.",
      "Messages still arrive after a bad connection. If the app closes or the network drops, nothing gets lost.",
      "The brand itself: the P and D logo, the mascot and the landing page.",
    ],
    cover: "/work/live/pendu-1.webp",
    shot: true,
    coverFit: "cover",
    gallery: [
      { src: "/work/live/pendu-1.webp", alt: "Pendu landing page" },
      { src: "/work/live/pendu-2.webp", alt: "Pendu calls section" },
      { src: "/work/live/pendu-3.webp", alt: "Pendu messaging section" },
      { src: "/work/live/pendu-4.webp", alt: "Pendu party rooms section" },
      {
        src: "/work/pendu2-mark.png",
        alt: "Pendu logo",
        fit: "contain",
        bg: "#EEF0FF",
      },
      {
        src: "/work/pendu-char-color.svg",
        alt: "Pendu mascot",
        fit: "contain",
        bg: "#FFF6BF",
      },
      {
        src: "/work/pendu-char-line.svg",
        alt: "Pendu mascot, line version",
        fit: "contain",
        bg: "#ffffff",
      },
    ],
    link: "https://www.penduu.com/",
    preview: {
      url: "https://www.penduu.com/",
      height: 4687,
      image: "/work/live/pendu-full.webp",
    },
  },
  {
    slug: "rendo",
    title: "Rendo: Hostels and rentals",
    kind: "Marketplace Backend",
    category: "Development",
    tags: ["API", "Marketplace"],
    summary: "Rental housing for students and urban professionals. Apply online, pay securely, move in.",
    description: "Rendo, formerly Rentipede, helps students and professionals find a room, apply, pay and move in. Owners and hostel staff use it to manage their rooms, tenants and payments. I'm the lead backend developer, so I build the system behind the app: the data, the payments and the rules for who can do what.",
    services: "Backend architecture, API design",
    role: "Lead backend developer",
    timeline: "2026 to now",
    tools: ["Node.js", "Express", "Prisma", "PostgreSQL", "TypeScript", "Zod", "Jest"],
    highlights: [
      "Applications, bookings, payments and room maintenance in one system for owners, staff and tenants.",
      "Online payments that confirm themselves, so money coming in and going out is tracked automatically.",
      "Every update is tested automatically before it goes live.",
    ],
    cover: "/work/live/rendo-1.webp",
    shot: true,
    coverFit: "cover",
    gallery: [
      { src: "/work/live/rendo-1.webp", alt: "Rendo home page" },
      { src: "/work/live/rendo-2.webp", alt: "Rendo listings" },
      { src: "/work/live/rendo-3.webp", alt: "Rendo how it works" },
    ],
    link: "https://rentipede.com/",
    preview: {
      url: "https://rentipede.com/",
      height: 9777,
      image: "/work/live/rendo-full.webp",
    },
  },
  {
    slug: "earlybean",
    title: "Earlybean: Money app for kids",
    kind: "Fintech for kids",
    category: "Development",
    tags: ["Fintech", "Education"],
    summary: "A money app that teaches kids to save, spend and earn, with parents in control.",
    description: "Earlybean is a money app for kids and teenagers. Kids get a wallet, savings goals, an allowance and short lessons on saving and business, grouped by age. Parents link their children's accounts and decide the rules. Schools can use it to collect fees. I worked on the whole set: the website and blog, the school portal, the admin tools and the system behind them.",
    services: "UI/UX design, full-stack development",
    role: "Full-stack developer",
    timeline: "Delivered",
    tools: ["Laravel", "Next.js", "React", "Material UI", "OpenAPI"],
    highlights: [
      "For kids: a wallet, savings goals, an allowance and courses with quizzes, grouped by age.",
      "For parents: linking their children's accounts and setting the rules.",
      "For schools: a portal to collect and manage fees.",
      "A website with separate pages for kids, parents and schools, and a blog.",
      "Admin tools for the team to manage users, courses and transactions.",
    ],
    cover: w("earlybean-logo"),
    coverBg: "#efeaff",
    coverFit: "contain",
    coverPad: true,
    gallery: [
      {
        src: w("earlybean-logo"),
        alt: "Earlybean logo",
        fit: "contain",
        bg: "#efeaff",
      },
    ],
  },
  {
    slug: "linkco",
    poster: true,
    title: "Linkco: Power bank campaign",
    kind: "Product Visuals",
    category: "Design",
    tags: ["Product", "Poster"],
    summary: "Launch posters for a 50,000 mAh power bank range.",
    description:
      "Two poster layouts built around the product. Large numerals sit behind a lit power bank on a pedestal, and the spec callouts stay small.",
    services: "Art direction, product visuals",
    timeline: "Campaign",
    tools: ["Affinity Designer", "Affinity Photo"],
    cover: w("linco-max"),
    coverFit: "cover",
    gallery: [
      { src: w("linco-max"), alt: "Linkco Max poster" },
      { src: w("linco-50000"), alt: "Linkco 50000 mAh poster" },
    ],
  },
  {
    slug: "poster-series",
    poster: true,
    title: "Poster series",
    kind: "Exploration",
    category: "Design",
    tags: ["Poster", "Typography", "Exploration"],
    summary:
      "Poster studies where the headline and the image compete for the same space.",
    description:
      "A running series. Each poster tests one idea, like scale, overlap, contrast or a single dominant color.",
    services: "Poster design, typography",
    timeline: "Ongoing",
    tools: ["Affinity Designer", "Affinity Photo"],
    cover: w("for-the-record"),
    coverFit: "cover",
    gallery: [
      { src: w("for-the-record"), alt: "For the Record poster" },
      { src: w("lagos"), alt: "Lagos hustle poster" },
      { src: w("polar"), alt: "Polar poster" },
      { src: w("liquid-gold"), alt: "Liquid gold poster" },
      { src: w("june"), alt: "June poster" },
      { src: w("tempted"), alt: "Tempted poster" },
      { src: w("maze"), alt: "Maze poster" },
      { src: w("reveal"), alt: "Reveal your true self poster" },
      { src: w("clouds"), alt: "Clouds poster" },
      { src: w("topmodel"), alt: "Top Model poster" },
      { src: w("bird-of-prey"), alt: "Bird of Prey poster" },
      { src: w("formula-max"), alt: "Formula Max poster" },
    ],
  },
  {
    slug: "sendforte",
    mockups: mockupSet("Sendforte"),
    title: "Sendforte",
    kind: "Brand Identity",
    category: "Branding",
    tags: ["Logo", "Identity"],
    summary:
      "A rounded wordmark with a location pin standing in for the letter o.",
    description:
      "A rounded wordmark in orange and blue. The pin replaces the o in forte, so the name already points at delivery.",
    services: "Logo design, brand identity",
    timeline: "Delivered",
    tools: ["Illustrator"],
    cover: w("sendforte"),
    coverBg: "#ffffff",
    coverFit: "contain",
    coverPad: true,
    gallery: [
      {
        src: w("sendforte"),
        alt: "Sendforte logo",
        fit: "contain",
        bg: "#ffffff",
      },
    ],
  },
];

/** Identity work lives in lib/brand.ts and is shown here automatically. */
const fromBrand = (b: BrandWork): Project => {
  const [, kind = "Logo"] = b.type.split(" / ");
  return {
    slug: `${b.name.toLowerCase()}-logo`,
    title: b.name,
    kind,
    category: "Branding",
    tags: ["Logo", "Identity"],
    summary: b.challenge,
    description: `${b.challenge} ${b.approach}`,
    services: "Logo design, brand identity",
    timeline: "Delivered",
    tools: ["Illustrator"],
    cover: b.mark,
    coverBg: b.tint,
    coverFit: "contain",
    coverPad: true,
    mockups: mockupSet(b.name),
    gallery: [
      { src: b.mark, alt: `${b.name} logo`, fit: "contain", bg: b.tint },
      ...(b.icon
        ? [
            {
              src: b.icon,
              alt: `${b.name} icon`,
              fit: "contain" as const,
              bg: b.tint,
            },
          ]
        : []),
      ...(b.sketch ? [{ src: b.sketch, alt: `${b.name} sketch` }] : []),
    ],
  };
};

projects.push(
  ...brands
    .filter((b) =>
      ["Hommission", "Trackr", "Unipulse", "Linkco"].includes(b.name),
    )
    .map(fromBrand),
);

export const filters: ("All" | Category)[] = [
  "All",
  "Development",
  "Design",
  "Branding",
];

export const services = [
  {
    title: "Software development",
    text: "Web and mobile products, full-stack: APIs, dashboards, real-time apps and payments apps.",
    image: "/work/pendu-og.webp",
  },
  {
    title: "Web Design",
    text: "Interfaces for apps and websites, from the first sketch to the handoff.",
    image: "/work/earlybean-ui.webp",
  },
  {
    title: "Branding and Posters",
    text: "Logos, brand identities and posters.",
    image: "/work/liquid-gold.webp",
  },
];

// TODO: adjust roles and periods to match your real history.
export const experience = [
  {
    place: "Vowrify",
    role: "Founder, design and engineering",
    period: "2026 to now",
    slug: "vowrify",
  },
  {
    place: "Pendu",
    role: "Product designer and developer",
    period: "2026 to now",
    slug: "pendu",
  },
  {
    place: "Rendo",
    role: "Lead backend developer",
    period: "2026 to now",
    slug: "rendo",
  },
  {
    place: "Earlybean",
    role: "Full-stack developer",
    period: "Delivered",
    slug: "earlybean",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
