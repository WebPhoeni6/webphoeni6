import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectView from "@/components/ProjectView";
import { getContent } from "@/lib/store";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, brandSchema, graph, personSchema, projectSchema, abs } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profile, projects } = await getContent();
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const title = `${project.title} | ${fullName}`;
  const description = `${project.summary} Project by ${fullName}, known as Web Phoenix.`;
  const canonical = `/work/${project.slug}`;
  return {
    title: { absolute: title },
    description,
    keywords: [...project.tags, ...project.tools, project.kind, "Samuel Emeka", "Web Phoenix"],
    alternates: { canonical },
    openGraph: { type: "article", url: canonical, siteName: "Web Phoenix", title, description, authors: [fullName] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const { profile, projects } = await getContent();
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      <JsonLd
        json={graph(
          personSchema(profile),
          brandSchema(profile),
          projectSchema(p),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: p.title.split(": ")[0], path: `/work/${p.slug}` },
          ]),
        )}
      />
      <ProjectView p={p} next={next} />
    </>
  );
}
