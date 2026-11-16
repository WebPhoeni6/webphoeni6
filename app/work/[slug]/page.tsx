import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectView from "@/components/ProjectView";
import { getContent } from "@/lib/store";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profile, projects } = await getContent();
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} | ${profile.firstName} ${profile.lastName}`,
    description: p.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const { projects } = await getContent();
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return <ProjectView p={p} next={next} />;
}
