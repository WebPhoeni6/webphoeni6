import { getContent } from "@/lib/store";
import { ogSize, ogType, shareImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogType;
export const alt = "Project by Samuel Emeka";

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getContent();
  const p = projects.find((x) => x.slug === slug);
  const title = p ? p.title.split(": ")[0] : "Samuel Emeka";
  return shareImage({
    eyebrow: p ? `${p.kind} / ${p.category}` : "Portfolio",
    title,
    line: p?.summary ?? "Developer and designer",
    image: p?.cover ?? "/samuel.webp",
    fit: p?.coverFit === "cover" || p?.poster ? "cover" : "contain",
  });
}
