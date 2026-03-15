export interface Skill { name: string; icon: string; }
export interface Project { title: string; description: string; image: string; tag: string; liveUrl: string; }
export interface Experience { date: string; title: string; company: string; description: string; }
export interface Personal { name: string; title: string; bio: string; email: string; linkedin: string; github: string; resumeUrl: string; }

export const skills: Skill[] = [
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "JAVASCRIPT", icon: "fab fa-js" },
  { name: "ANGULAR", icon: "fab fa-angular" },
  { name: "REACT", icon: "fab fa-react" },
  { name: "BOOTSTRAP", icon: "fab fa-bootstrap" },
  { name: "TAILWIND", icon: "fas fa-wind" },
  { name: "PYTHON", icon: "fab fa-python" },
  { name: "NODEJS", icon: "fab fa-node-js" },
  { name: "DJANGO", icon: "fas fa-code" },
  { name: "POSTGRESQL", icon: "fas fa-database" },
  { name: "AWS", icon: "fab fa-aws" },
  { name: "DOCKER", icon: "fab fa-docker" },
  { name: "GIT", icon: "fab fa-git-alt" },
]

export const projects: Project[] = [
  {
    title: "Bistropulse",
    description: "Restaurant management SaaS — menu, orders, and staff scheduling in one place.",
    image: "images/bistropulse.png",
    tag: "SaaS",
    liveUrl: "https://bistropulse.vercel.app/",
  },
  {
    title: "Afrophuket",
    description: "Event ticketing platform handling discovery, seat selection, and payment flow.",
    image: "images/afrophuket.png",
    tag: "Platform",
    liveUrl: "https://afrophuket.vercel.app/",
  },
  {
    title: "Pulsecore",
    description: "Inventory dashboard with real-time stock tracking, alerts, and supplier management.",
    image: "images/pulsecore.png",
    tag: "Dashboard",
    liveUrl: "http://pulsecore-inventory.vercel.app/home",
  },
  {
    title: "AbJotters",
    description: "Notebook e-commerce store — product catalogue, cart, and Stripe checkout.",
    image: "images/abjoters.png",
    tag: "E-commerce",
    liveUrl: "https://abifortune-jotters.vercel.app/",
  },
  {
    title: "Nest Food",
    description: "Grocery delivery app with category browsing, cart persistence, and order tracking.",
    image: "images/nest.png",
    tag: "E-commerce",
    liveUrl: "https://nest-roan.vercel.app/home",
  },
  {
    title: "More on GitHub",
    description: "Smaller experiments, open-source contributions, and work-in-progress projects.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    tag: "GitHub",
    liveUrl: "https://github.com/WebPhoeni6",
  },
]

export const experiences: Experience[] = [
  {
    date: "November 2024 – Present",
    title: "Frontend Developer",
    company: "Earlybena Inc",
    description:
      "Building React components for a B2B SaaS product. Cut initial bundle size by 30% through code-splitting and lazy loading. Work directly with the design team to close the gap between Figma and production.",
  },
  {
    date: "May 2024 – November 2024",
    title: "Software Developer",
    company: "Charis BI",
    description:
      "Built campaign landing pages and integrated analytics tracking for a digital marketing agency. Wired up CMS and automation tools that reduced manual publishing time for the content team.",
  },
  {
    date: "March 2023 – February 2024",
    title: "Frontend Developer",
    company: "Expintek LTD",
    description:
      "Maintained and extended the frontend of an HR platform — employee dashboards, multi-step onboarding forms, and role-based access. Worked alongside backend and QA to ship fortnightly releases.",
  },
]

export const personal: Personal = {
  name: "Samuel Emeka",
  title: "Software Developer",
  bio: "I build things end to end — React UIs, Node/Django APIs, PostgreSQL databases. Three years shipping production apps across SaaS, HR, and e-commerce. I'm picky about the parts users don't notice until they're missing.",
  email: "devsamuel0611@gmail.com",
  linkedin: "https://www.linkedin.com/in/samuelemekawp",
  github: "https://github.com/WebPhoeni6",
  resumeUrl: "#",
}
