/**
 * The personal side of the site. This is a DRAFT written from your project files,
 * your folders and our conversations, so check every line and change what is not
 * true or not how you would say it. The facts block and "beyond work" are the parts
 * most worth correcting.
 */

export const about = {
  lede: "I'm a designer and developer in Nigeria, and online I go by Web Phoenix. I draw the logo and the screens, then build the backend and the app that run them. A lot of what I've made deals with money, trust or both.",

  story: [
    "Right now my time splits into two kinds of work. The first is products: Vowrify, which holds a deposit safely until a deal is done; Rendo, which runs hostels and rentals; Pendu, a chat and calling app for gaming communities; and Earlybean, a money app for kids.",
    "The second is brand and visual work: logos, mascots and posters for those products and a few others. I like having both. The product work shows me where a brand actually ends up, on an app icon, a sign or a receipt, and the brand work keeps the product from looking like an afterthought.",
  ],

  facts: [
    { label: "Based in", value: "Nigeria" },
    { label: "I do", value: "Product design, brand identity and full-stack development" },
    { label: "Online as", value: "Web Phoenix" },
    { label: "I build with", value: "TypeScript, Node, React, Flutter, Laravel and PostgreSQL" },
    { label: "I design in", value: "Affinity and Illustrator" },
    { label: "I edit video in", value: "Premiere Pro" },
  ],

  principles: [
    {
      title: "I explain before I build",
      text: "Before I write code I say what I'm about to do and why, in plain words. When a decision is yours, I ask instead of guessing.",
    },
    {
      title: "Screens and server together",
      text: "I build the API and the screens that use it in one slice, so you can click through each piece before the next one starts.",
    },
    {
      title: "Only what's needed",
      text: "No placeholder modules and no \"we might need it later.\" Each step gets the smallest thing that does the job.",
    },
    {
      title: "I check the docs, then decide",
      text: "I look up technical choices in the official documentation. If something you've asked for will cause trouble later, I'll say so and show why.",
    },
    {
      title: "Nothing merges unreviewed",
      text: "Changes go in as pull requests with tests. On Rendo, four groups of tests run on every one before it can merge.",
    },
  ],

  beyond: [
    {
      title: "Type and posters",
      text: "I keep a library of thousands of font files, and many of my posters start with the letters. The series on this site is where I try ideas that don't have a client yet.",
      image: "/work/for-the-record.webp",
    },
    {
      title: "Cars",
      text: "I like fast cars. There's an F1 poster in the series, a set of GT-R clips I cut in Premiere, and Forza Horizon 5 on the machine.",
      image: "/work/formula-max.webp",
    },
    {
      title: "Video",
      text: "I edit in Premiere Pro: car clips, a year-in-review film for 2026, and SIGNAL, a project with its own music, sound effects and voiceover.",
      image: "/work/lagos.webp",
    },
    {
      title: "Games",
      text: "I like building around the things I play. I made a dashboard to track an EA FC career mode.",
      image: "/work/tempted.webp",
    },
  ],

  now: [
    { slug: "vowrify", text: "Designing and building it. Nigeria first, starting with real-estate deposits." },
    { slug: "rendo", text: "Lead backend developer. Shipping the API in small, reviewed packages." },
    { slug: "pendu", text: "Keeping the apps, the web app and the landing page moving." },
  ],
};
