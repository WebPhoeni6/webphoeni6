/**
 * The personal side of the site.
 *
 * Only facts that are already public on this site are in here. Everything personal
 * (where you are, what you like, how you work, photos) is left out on purpose, because
 * it has to come from you, in your own words. Each section below only shows if it has
 * content, so you can fill them in one at a time.
 */

export const about = {
  lede: "I'm a designer and developer. I draw the logo and the screens, then build the backend and the app that run them. Online I go by Web Phoenix.",

  story: [
    "Right now my time splits into two kinds of work. The first is products: Vowrify, Rendo, Pendu and Earlybean. The second is brand and visual work: logos, mascots and posters for those products and for other people.",
  ],

  // Add rows here when you are ready, for example { label: "Based in", value: "..." }.
  facts: [
    { label: "I do", value: "Product design, brand identity and full-stack development" },
    { label: "Online as", value: "Web Phoenix" },
  ] as { label: string; value: string }[],

  // Add your own working principles: { title: "...", text: "..." }
  principles: [] as { title: string; text: string }[],

  // Add things outside work: { title: "...", text: "...", image: "/work/....webp" }
  beyond: [] as { title: string; text: string; image: string }[],

  now: [
    { slug: "vowrify", text: "Designing and building it." },
    { slug: "rendo", text: "Building the backend." },
    { slug: "pendu", text: "Keeping the apps, the web app and the landing page moving." },
  ],
};
