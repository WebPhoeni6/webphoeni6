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
    summary: "Protected payments for big purchases. A licensed partner holds the money until both sides meet the agreed conditions.",
    description: "Vowrify protects large payments between people who do not know each other yet. Buyer and seller agree the terms, a licensed bank or payment partner holds the money, and it is released only when the agreed evidence is in. Vowrify never holds the funds itself. It keeps the agreement, the evidence and a permanent record of every step, and it tells the partner what to do. It launches in Nigeria, on the web first, starting with real-estate buyer deposits for Hommission. I am doing all of it: the brand, the screens and the backend.",
    services: "Product design, full-stack development",
    role: "Founder, design and engineering",
    timeline: "In progress",
    tools: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "React"],
    highlights: [
      "A modular TypeScript backend on Node and PostgreSQL, with an automated check that stops one module from reaching into another.",
      "Every change to a transaction goes through one command path with idempotency keys, so a retried request cannot release or charge twice.",
      "Money is stored in whole minor units, never decimals, and every state change is written to an append-only audit trail.",
      "Calls to payment and identity providers happen after the database commit, and incoming provider events are verified and de-duplicated first.",
      "Built one slice at a time. Each slice ships its API, its tests and its screens, and I click through it before starting the next.",
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
    description: "Gaming communities juggle one app for voice, another for casual chat and more for events and discovery. Pendu puts messaging, voice and video calls and community discovery in one free app for Android, iOS and the web. I designed the brand and the interface, and I built the mobile app, the backend, the web app and the landing page.",
    services: "Brand, UI/UX design, mobile and web development",
    role: "Product designer and developer",
    timeline: "2026",
    tools: ["Flutter", "React", "Node.js", "Socket.IO", "PostgreSQL", "Redis"],
    highlights: [
      "Real-time chat with replies, reactions, voice notes, link previews and read receipts, plus one-to-one and group audio and video calls.",
      "Messages survive bad networks. An outbox and replay system makes sure nothing is lost when the app is killed or the connection drops.",
      "Sessions are tracked per device, so logging out one phone does not break live connections. Deleted accounts get a 30-day grace period.",
      "A Flutter app for Android and iOS, a React web app that caches offline in the browser, and a Node backend with Socket.IO, PostgreSQL and Redis.",
      "The brand itself: the P and D monogram, the mascot, the wordmark and the landing page.",
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
    description: "Rendo, formerly Rentipede, helps students and urban professionals find a room, apply, pay and move in. It also gives owners, institutions and staff the tools to run their hostels. I am the lead backend developer: I design the API, the database and the payment flows, and ship the work in small packages that are reviewed one at a time.",
    services: "Backend architecture, API design",
    role: "Lead backend developer",
    timeline: "2026 to now",
    tools: ["Node.js", "Express", "Prisma", "PostgreSQL", "TypeScript", "Zod", "Jest"],
    highlights: [
      "An Express and Prisma API on PostgreSQL with 37 data models, covering hostels, institutions, owners, applications, reservations, wallets, payments, maintenance and announcements.",
      "Payments through the Inflow gateway: hosted checkout, virtual accounts and wallet balances, with webhooks that confirm money in and out.",
      "85 test files and a pipeline that lints, builds and runs the tests in four parallel groups before anything can merge.",
      "Work lands as pull requests, and every merge deploys to a live sandbox with Swagger docs.",
      "Argon2 password hashing, JWT sessions, rate limiting, Helmet and Zod validation on every request.",
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
    summary: "A money app that teaches kids to save, spend and earn, with parents in control and schools able to collect fees.",
    description: "Earlybean is a money app for children and teenagers in Nigeria. Kids get a wallet, savings goals, an allowance and short courses on saving and business, sorted by age. Parents link their children's accounts and set the rules, and schools can collect fees through the same system. I worked across the whole family of products: the marketing site and blog, the school portal, the admin panel and the Laravel API behind them.",
    services: "UI/UX design, full-stack development",
    role: "Full-stack developer",
    timeline: "Delivered",
    tools: ["Laravel", "Next.js", "React", "Material UI", "OpenAPI"],
    highlights: [
      "A Laravel API with 505 routes, split by area (auth, wallets, parents, kids, schools, merchants, admin) and documented with generated OpenAPI docs.",
      "Wallets and ledgers for transactions, allowances, savings goals and interest, plus a daily bonus and in-app coins.",
      "Courses with sections, lessons and quizzes, assigned by age group.",
      "A school portal for collecting and managing fees, and an admin panel for users, courses, earnings, wallets and transactions.",
      "A Next.js marketing site with separate pages for kids, parents and schools, and a blog.",
      "Bank account and BVN checks, and telecom bill payments for Nigeria.",
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
