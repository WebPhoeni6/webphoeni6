/**
 * The CV. Edit the words here and the CV page and the PDF follow.
 *
 * Written for applicant tracking systems (ATS) as well as people: one column, standard section names,
 * plain text, every bullet starts with a verb, and tools are named inside the bullets.
 */

export const cv = {
  name: "Samuel Emeka",
  title: "Full-Stack Developer | Brand Designer",
  contact: [
    { label: "Lagos State, Nigeria" },
    { label: "+234 904 608 8720" },
    { label: "devsamuel0611@gmail.com", href: "mailto:devsamuel0611@gmail.com" },
    { label: "linkedin.com/in/samuelemekawp", href: "https://www.linkedin.com/in/samuelemekawp" },
    { label: "webphoenix.net", href: "https://webphoenix.net" },
    { label: "behance.net/samuelemeka2", href: "https://www.behance.net/samuelemeka2" },
  ],

  summary:
    "Full-Stack Developer with 3+ years of professional experience building web and mobile products with React, Next.js, TypeScript, Node.js and PostgreSQL, from design to deployment. Co-founder of Pendu, Head Software Engineer at Vowrify and Backend Developer at Rendo. Experienced in REST API integration, component architecture, automated testing with Jest, Git workflows and CI/CD, and in working with designers, product managers and backend engineers in Agile teams. Also a brand designer, with identities for six companies and a series of 20+ posters.",

  experience: [
    {
      role: "Co-founder, Designer and Developer",
      org: "Pendu",
      period: "2026 – Present",
      bullets: [
        "Co-founded a free app for gaming communities that combines chat, voice and video calls and community discovery on Android, iOS and the web.",
        "Built the mobile app with Flutter and the web app with React, backed by a Node.js, Socket.IO, PostgreSQL and Redis system for real-time messaging and calls.",
        "Engineered message delivery that survives dropped connections and closed apps, so messages are not lost.",
        "Designed the brand (the P and D logo, the mascot and the landing page) and the app interface.",
      ],
    },
    {
      role: "Head Software Engineer",
      org: "Vowrify",
      period: "2026 – Present",
      bullets: [
        "Lead engineering of a payments platform that makes large purchases safe between people who do not know each other: a licensed partner holds the money until both sides have done what they agreed.",
        "Architect and build the backend with TypeScript, Node.js, PostgreSQL and Redis, keeping one clear record of every step of each transaction.",
        "Develop the React interface screen by screen, finishing and testing each screen together with its backend before starting the next.",
        "Designed the brand identity, color system and interface.",
      ],
    },
    {
      role: "Backend Developer",
      org: "Rendo (formerly Rentipede)",
      period: "2026 – Present",
      bullets: [
        "Develop the backend of a rental housing platform for students, professionals, owners and hostel staff: the data model, REST APIs, payments and role-based permissions.",
        "Implemented applications, bookings, payments and room maintenance in one system, with online payments that confirm automatically.",
        "Write automated tests with Jest that run on every update before it goes live (CI/CD).",
      ],
      stack: "Node.js, Express, Prisma, PostgreSQL, TypeScript, Zod, Jest",
    },
    {
      role: "Frontend Developer",
      org: "Earlybean Inc.",
      period: "2025 – Present",
      bullets: [
        "Build and maintain responsive interfaces with React.js and TypeScript, converting Figma designs into accessible, pixel-accurate components.",
        "Develop reusable components with Tailwind CSS and manage state with React hooks and the Context API.",
        "Integrate REST APIs with async handling, loading states and error boundaries.",
        "Write unit and integration tests with Jest and React Testing Library to catch regressions early.",
        "Collaborate with designers, product managers and backend engineers, and take part in code reviews.",
      ],
    },
    {
      role: "Frontend Developer / Backend Developer",
      org: "Charis BI",
      period: "2024 – 2025",
      bullets: [
        "Built responsive web applications with React.js, TypeScript and Tailwind CSS across multiple product lines.",
        "Translated Figma designs into accessible UI components and integrated REST APIs with loading and error states.",
        "Optimized application performance and scalability through code optimization, and resolved technical issues to improve stability.",
        "Collaborated in Agile teams using Git branching and pull request reviews.",
      ],
    },
    {
      role: "Frontend Developer",
      org: "Expintek LTD",
      period: "2023 – 2024",
      bullets: [
        "Built responsive, semantic interfaces with React.js, TypeScript, HTML5, CSS3 and JavaScript.",
        "Integrated REST APIs, managed state with React hooks, and ensured cross-browser and mobile compatibility.",
        "Wrote tests and took part in code reviews to keep components reliable and code quality high.",
        "Maintained and optimized existing applications for performance and usability.",
      ],
    },
  ],

  projects: [
    { name: "Pendu", text: "Voice, chat and calls for gaming communities on Android, iOS and web (Flutter, React, Node.js).", link: "webphoenix.net/work/pendu" },
    { name: "Vowrify", text: "Protected payments for big purchases (TypeScript, Node.js, PostgreSQL).", link: "webphoenix.net/work/vowrify" },
    { name: "Rendo", text: "Hostels and rentals platform: apply online, pay securely, move in (Node.js, Express, Prisma).", link: "webphoenix.net/work/rendo" },
    { name: "Earlybean", text: "A money app that teaches kids to save, spend and earn, with parents in control.", link: "earlybean.co" },
    { name: "Brand identities", text: "Logos and identities for Pendu, Vowrify, Sendforte, Hommission, Unipulse and Linkco.", link: "webphoenix.net/brand" },
    { name: "Poster series", text: "20+ posters, including the Board Notes chess set.", link: "webphoenix.net/work/poster-series" },
  ],

  skills: [
    { label: "Languages", text: "TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3" },
    { label: "Frontend", text: "React.js, Next.js, Tailwind CSS, Flutter, AngularJS, jQuery, GSAP, responsive and accessible UI, Figma-to-code" },
    { label: "Backend", text: "Node.js, Express, Prisma, REST APIs, Socket.IO, Django, Flask, Zod" },
    { label: "Databases", text: "PostgreSQL, Redis, SQLite" },
    { label: "Testing and DevOps", text: "Jest, React Testing Library, Git, GitHub, pull request workflows, CI/CD, Agile" },
    { label: "Design", text: "Brand identity, logo design, poster design, product UI/UX, Figma, Affinity Designer, Affinity Photo, Illustrator" },
  ],

  achievements: [
    "Built reusable React.js components that improved project delivery speed by 25%.",
    "Integrated RESTful APIs behind dashboards used by 500+ people a day.",
    "Optimized web application performance, cutting load times by 35%.",
    "Built and maintained AngularJS applications, improving cross-device experience by 40% and reducing bug reports by 30%.",
    "Mentored junior developers, improving team code quality and collaboration.",
  ],

  education: [{ what: "Senior Secondary Certificate Examination (SSCE)", where: "Senior High School, Alimosho", period: "2021 – 2024" }],

  certifications: [
    "Developing Frontend Applications with React, IBM (Coursera)",
    "Responsive Web Design Certification",
    "Web Application Development Training",
    "UI/UX Design Principles and Guidelines Training",
  ],

  languages: "English, Igbo, Yoruba, Sign Language",
};
