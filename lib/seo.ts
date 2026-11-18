import type { Project } from "./content";

export const SITE_NAME = "Web Phoenix";
export const SITE_URL = "https://webphoenix.net";

/** Absolute URL for a path or an image on this site. Remote URLs are left alone. */
export const abs = (path: string) => (/^https?:\/\//.test(path) ? path : new URL(path, SITE_URL).toString());

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BRAND_ID = `${SITE_URL}/#brand`;

type Profile = { firstName: string; lastName: string; role: string; portrait: string; email?: string; socials: { label: string; href: string }[] };

export const fullName = (p: Pick<Profile, "firstName" | "lastName">) => `${p.firstName} ${p.lastName}`;

/** Words people actually search for. Kept short and honest. */
export const KEYWORDS = [
  "Samuel Emeka",
  "Web Phoenix",
  "WebPhoenix",
  "developer and designer",
  "full-stack developer",
  "backend developer",
  "brand identity designer",
  "logo designer",
  "poster design",
  "product design",
  "portfolio",
  "Nigeria",
];

const slim = <T extends Record<string, unknown>>(o: T) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== "")) as T;

/** Who the site is about, and the studio name it goes by. Used on every page. */
export function personSchema(p: Profile) {
  return slim({
    "@type": "Person",
    "@id": PERSON_ID,
    name: fullName(p),
    alternateName: [SITE_NAME, "WebPhoenix"],
    url: SITE_URL,
    image: p.portrait ? abs(p.portrait) : undefined,
    jobTitle: p.role,
    description: `${fullName(p)}, known as ${SITE_NAME}, designs and builds digital products, software, websites and brand identities.`,
    knowsAbout: ["Software engineering", "Backend development", "Brand identity", "Logo design", "Poster design", "Product design"],
    sameAs: p.socials.map((s) => s.href).filter((h) => /^https?:\/\//.test(h) && !/wa\.me/.test(h)),
    brand: { "@id": BRAND_ID },
  });
}

export function brandSchema(p: Profile) {
  return {
    "@type": "Brand",
    "@id": BRAND_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: abs("/icon.png"),
    founder: { "@id": PERSON_ID },
  };
}

export function websiteSchema() {
  return { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL, name: SITE_NAME, alternateName: "Samuel Emeka portfolio", inLanguage: "en", publisher: { "@id": PERSON_ID } };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** One project as a creative work, so search engines understand what it is and who made it. */
export function projectSchema(p: Project) {
  const url = abs(`/work/${p.slug}`);
  return slim({
    "@type": p.category === "Development" ? "CreativeWork" : "VisualArtwork",
    "@id": `${url}#work`,
    url,
    name: p.title.split(": ")[0],
    headline: p.title,
    description: p.summary,
    abstract: p.description,
    image: abs(p.cover),
    genre: p.kind,
    keywords: [...p.tags, ...p.tools].join(", "),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    mainEntityOfPage: url,
    isPartOf: { "@id": WEBSITE_ID },
  });
}

/** Wraps schema objects in one graph, ready to print into a script tag. */
export const graph = (...nodes: unknown[]) => JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
