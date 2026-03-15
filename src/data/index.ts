export interface Skill {
  name: string;
  icon: string;
}
export interface Project {
  title: string;
  description: string;
  image: string;
  tag: string;
  liveUrl: string;
}
export interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
}
export interface Personal {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}

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
];

export const projects: Project[] = [
  {
    title: "Bistropulse",
    description:
      "Restaurant management SaaS — menu, orders, and staff scheduling in one place.",
    image: "images/bistropulse.png",
    tag: "SaaS",
    liveUrl: "https://bistropulse.vercel.app/",
  },
  {
    title: "Afrophuket",
    description:
      "Event ticketing platform handling discovery, seat selection, and payment flow.",
    image: "images/afrophuket.png",
    tag: "Platform",
    liveUrl: "https://afrophuket.vercel.app/",
  },
  {
    title: "Pulsecore",
    description:
      "Inventory dashboard with real-time stock tracking, alerts, and supplier management.",
    image: "images/pulsecore.png",
    tag: "Dashboard",
    liveUrl: "http://pulsecore-inventory.vercel.app/home",
  },
  {
    title: "AbJotters",
    description:
      "Notebook e-commerce store — product catalogue, cart, and Stripe checkout.",
    image: "images/abjoters.png",
    tag: "E-commerce",
    liveUrl: "https://abifortune-jotters.vercel.app/",
  },
  {
    title: "Nest Food",
    description:
      "Grocery delivery app with category browsing, cart persistence, and order tracking.",
    image: "images/nest.png",
    tag: "E-commerce",
    liveUrl: "https://nest-roan.vercel.app/home",
  },
  {
    title: "More on GitHub",
    description:
      "Smaller experiments, open-source contributions, and work-in-progress projects.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    tag: "GitHub",
    liveUrl: "https://github.com/WebPhoeni6",
  },
];

export const experiences: Experience[] = [
  {
    date: "November 2024 – Present",
    title: "Frontend Developer",
    company: "Earlybean Inc",
    description:
      "Frontend at a Techstars-backed fintech startup building financial literacy tools for kids. Built gamified UI for the youngster app, parental control dashboards, and the school-facing cashless payment interface — all on Next.js against a live banking API.",
  },
  {
    date: "May 2024 – November 2024",
    title: "Web Developer",
    company: "Charis BI",
    description:
      "Built marketing websites and campaign pages for professional services clients — law firms, consultancies, accounting practices. Integrated analytics tracking and CMS tooling so clients could publish content without touching the codebase.",
  },
  {
    date: "March 2023 – February 2024",
    title: "Frontend Developer",
    company: "Expintek LTD",
    description:
      "Worked across multiple client projects at a software consultancy — responsive web apps, AI-integrated interfaces, and custom tools. Picked up new domains quickly and handed off clean, documented code each time.",
  },
];

export const personal: Personal = {
  name: "Samuel Emeka",
  title: "Software Developer",
  bio: "I build things end to end — React UIs, Node/Django APIs, PostgreSQL databases. Three years shipping production apps across SaaS, HR, and e-commerce. I'm picky about the parts users don't notice until they're missing.",
  email: "devsamuel0611@gmail.com",
  linkedin: "https://www.linkedin.com/in/samuelemekawp",
  github: "https://github.com/WebPhoeni6",
  resumeUrl: "#",
};
