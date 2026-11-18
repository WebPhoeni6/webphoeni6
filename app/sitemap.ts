import type { MetadataRoute } from "next";
import { getContent } from "@/lib/store";
import { abs, SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { profile, projects } = await getContent();
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1, images: [abs(profile.portrait)] },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8, images: [abs(profile.portrait)] },
    { url: `${SITE_URL}/brand`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/socials`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const work: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.poster ? 0.7 : 0.9,
    // Lets image search find the posters and screens.
    images: [p.cover, ...p.gallery.map((g) => g.src)].filter((v, i, a) => a.indexOf(v) === i).slice(0, 30).map(abs),
  }));

  return [...pages, ...work];
}
