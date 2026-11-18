/**
 * The CV. Edit the words here and the CV page and the PDF follow.
 * It uses the same facts as the site, plus the history from the old CV.
 */

export const cv = {
  name: "Samuel Emeka",
  title: "Developer and designer",
  contact: [
    { label: "Lagos State, Nigeria" },
    { label: "devsamuel0611@gmail.com", href: "mailto:devsamuel0611@gmail.com" },
    { label: "webphoenix.net", href: "https://webphoenix.net" },
    { label: "linkedin.com/in/samuelemekawp", href: "https://www.linkedin.com/in/samuelemekawp" },
  ],

  summary:
    "Developer and designer with 3+ years of professional experience. I design and build products from the logo to the backend: React, TypeScript and Tailwind on the front, Node.js and PostgreSQL behind it. I co-founded Pendu, I'm head software engineer at Vowrify and a backend developer at Rendo. I also design brand identities and posters, so the product and the brand come from the same hands.",

  experience: [
    {
      role: "Co-founder, designer and developer",
      org: "Pendu",
      period: "2026 – Present",
      bullets: [
        "Co-founded a free app for gaming communities that puts chat, voice and video calls and finding communities in one place, on Android, iOS and the web.",
        "Designed the brand (the P and D logo, the mascot and the landing page) and the app screens.",
        "Built the mobile apps, the web app and the system behind them: chat with replies, reactions and voice notes, one-to-one and group calls, and messages that still arrive after a bad connection.",
      ],
      stack: "Flutter · React · Node.js · Socket.IO · PostgreSQL · Redis",
    },
    {
      role: "Head software engineer",
      org: "Vowrify",
      period: "2026 – Present",
      bullets: [
        "Lead the engineering of a platform that makes it safe to pay for something big when you don't know the other person yet. A licensed partner holds the money until both sides have done what they agreed.",
        "Built the system so every step is kept in one clear record, and nobody can argue later about what was agreed.",
        "Designed the brand, the colors and the screens, and build each screen together with the system behind it before starting the next.",
      ],
      stack: "TypeScript · Node.js · PostgreSQL · Redis · React",
    },
    {
      role: "Backend developer",
      org: "Rendo (formerly Rentipede)",
      period: "2026 – Present",
      bullets: [
        "Build the system behind a rental housing app for students and professionals: the data, the payments and the rules for who can do what.",
        "Applications, bookings, payments and room maintenance in one system for owners, staff and tenants, with online payments that confirm themselves.",
        "Every update is tested automatically before it goes live.",
      ],
      stack: "Node.js · Express · Prisma · PostgreSQL · TypeScript · Zod · Jest",
    },
    {
      role: "Frontend developer",
      org: "Earlybean Inc.",
      period: "2025 – Present",
      bullets: [
        "Build and maintain responsive interfaces with React and TypeScript, turning Figma designs into accessible, pixel-accurate components.",
        "Integrate REST APIs with proper loading states and error handling, and manage state with hooks and Context.",
        "Write unit and integration tests with Jest and React Testing Library, and take part in code reviews with designers, product managers and backend engineers.",
      ],
      stack: "React · TypeScript · Tailwind CSS · Jest",
    },
    {
      role: "Frontend developer / Backend developer",
      org: "Charis BI",
      period: "2024 – 2025",
      bullets: [
        "Built responsive web applications with React, TypeScript and Tailwind CSS across several product lines.",
        "Improved performance and scalability through code optimization, and fixed technical issues to keep the system stable.",
      ],
    },
    {
      role: "Frontend developer",
      org: "Expintek LTD",
      period: "2023 – 2024",
      bullets: [
        "Built user-friendly interfaces with React, TypeScript, HTML5, CSS3 and JavaScript, and kept them working across browsers and phones.",
        "Integrated REST APIs, wrote tests, and maintained and sped up existing applications.",
      ],
    },
  ],

  projects: [
    { name: "Pendu", text: "Voice, chat and calls for gaming communities, on mobile and web.", link: "webphoenix.net/work/pendu" },
    { name: "Vowrify", text: "Protected payments for big purchases between people who don't know each other yet.", link: "webphoenix.net/work/vowrify" },
    { name: "Rendo", text: "Hostels and rentals: apply online, pay securely, move in.", link: "webphoenix.net/work/rendo" },
    { name: "Earlybean", text: "A money app that teaches kids to save, spend and earn, with parents in control.", link: "earlybean.co" },
    { name: "Brand identities", text: "Logos and identities for Pendu, Vowrify, Sendforte, Hommission, Unipulse and Linkco.", link: "webphoenix.net/brand" },
    { name: "Poster series", text: "Over 20 posters, including the Board Notes chess set.", link: "webphoenix.net/work/poster-series" },
  ],

  skills: [
    { label: "Frontend", text: "React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, GSAP, Flutter" },
    { label: "Backend", text: "Node.js, Express, Prisma, REST APIs, Socket.IO, Python, Django, Flask, Zod" },
    { label: "Data", text: "PostgreSQL, Redis, SQLite" },
    { label: "Design", text: "Brand identity, logos, posters, product UI, Figma, Affinity Designer and Photo, Illustrator" },
    { label: "Practice", text: "Git and pull-request workflows, CI/CD, Jest, React Testing Library, performance work, Agile teams" },
  ],

  achievements: [
    "Built reusable React components that sped up project delivery by 25%.",
    "Integrated REST APIs behind dashboards used by 500+ people a day.",
    "Cut web application load times by 35%.",
    "Built and maintained AngularJS applications: 40% better cross-device experience and 30% fewer bug reports.",
    "Mentored junior developers, improving the team's code quality and collaboration.",
  ],

  education: [{ what: "Senior Secondary Certificate Examination (SSCE)", where: "Senior High School, Alimosho", period: "2021 – 2024" }],

  certifications: [
    "Developing Frontend Applications with React, IBM (Coursera)",
    "Responsive Web Design Certification",
    "Web Application Development Training",
    "UI/UX Design Principles and Guidelines Training",
  ],

  languages: ["English", "Igbo", "Yoruba", "Sign Language"],
};
