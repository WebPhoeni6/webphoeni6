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
    description: "Restaurant Management SaaS",
    image: "images/bistropulse.png",
    tag: "Full Stack",
    liveUrl: "https://bistropulse.vercel.app/",
  },
  {
    title: "Afrophuket",
    description: "Event Ticketing & Management Platform",
    image: "images/afrophuket.png",
    tag: "Full Stack",
    liveUrl: "https://afrophuket.vercel.app/",
  },
  {
    title: "Pulsecore",
    description: "Inventory Management Dashboard",
    image: "images/pulsecore.png",
    tag: "Full Stack",
    liveUrl: "http://pulsecore-inventory.vercel.app/home",
  },
  {
    title: "AbJotters",
    description: "Notebook Ecommerce App",
    image: "images/abjoters.png",
    tag: "Full Stack",
    liveUrl: "https://abifortune-jotters.vercel.app/",
  },
  {
    title: "Nest Food",
    description: "Ecommerce App",
    image: "images/nest.png",
    tag: "Full Stack",
    liveUrl: "https://nest-roan.vercel.app/home",
  },
  {
    title: "More Projects",
    description: "Explore my work",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    tag: "Various",
    liveUrl: "https://github.com/WebPhoeni6",
  },
]

export const experiences: Experience[] = [
  {
    date: "November 2024 - Present",
    title: "Frontend Developer",
    company: "Earlybena Inc",
    description:
      "Designed and implemented responsive, accessible UI components with React. Optimized performance and bundle size, collaborated with designers and backend engineers to integrate APIs, and improved user experience through usability testing and analytics.",
  },
  {
    date: "May 2024 - November 2024",
    title: "Full Stack Developer",
    company: "Charis BI",
    description:
      "Built marketing-focused web applications and campaign landing pages, integrated analytics and tracking, collaborated with designers and marketers to optimize conversion funnels, and implemented CMS and automation integrations to support campaign workflows.",
  },
  {
    date: "March 2023 - February 2024",
    title: "Frontend Developer",
    company: "Expintek LTD",
    description:
      "Built and maintained the frontend of an HR system, implementing responsive interfaces, complex form workflows, employee dashboards, and integrations with HR APIs and authentication. Focused on performance, accessibility, and close collaboration with backend and QA teams to deliver production-ready features.",
  },
]

export const personal: Personal = {
  name: "Samuel Emeka",
  title: "Full Stack Developer",
  bio: "I'm a passionate Full Stack Developer with expertise in building scalable web applications. I specialize in modern frameworks and technologies, creating seamless user experiences from front-end to back-end. With a strong foundation in both client and server-side development, I bring ideas to life through clean, efficient code.",
  email: "devsamuel0611@gmail.com",
  linkedin: "https://www.linkedin.com/in/samuelemekawp",
  github: "https://github.com/WebPhoeni6",
  resumeUrl: "#",
}
