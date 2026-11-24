import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PaylaneCase from "@/components/PaylaneCase";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { getContent } from "@/lib/store";
import { abs, breadcrumbs, brandSchema, fullName, graph, personSchema, projectSchema } from "@/lib/seo";

// A hand-built case study. Next.js serves this route ahead of the generic /work/[slug] page.
const PATH = "/work/paylane";
const OG = "/work/paylane/og.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const name = fullName(profile);
  const title = `Paylane: Brand Identity (concept project) | ${name}`;
  const description = "A concept brand identity for Paylane, a Lagos payments app for small businesses and freelancers. Logo, colors and applications from billboard to danfo wrap.";
  const images = [{ url: OG, width: 1200, height: 630, alt: "Paylane logo on a billboard above a busy Lagos highway" }];
  return {
    title: { absolute: title },
    description,
    keywords: ["Paylane", "fintech brand identity", "Lagos", "Nigeria", "logo design", "brand identity", "concept project", "Samuel Emeka", "Web Phoenix"],
    alternates: { canonical: PATH },
    openGraph: { type: "article", url: PATH, siteName: "Web Phoenix", title, description, images, authors: [name] },
    twitter: { card: "summary_large_image", title, description, images: [OG] },
  };
}

export default async function PaylanePage() {
  const { profile, projects } = await getContent();
  const p = projects.find((x) => x.slug === "paylane");
  return (
    <>
      <JsonLd
        json={graph(
          personSchema(profile),
          brandSchema(profile),
          ...(p ? [{ ...projectSchema(p), image: abs(OG) }] : []),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Paylane", path: PATH },
          ]),
        )}
      />
      <main className="mx-auto max-w-[1600px] bg-[#111]">
        <Nav />
        <PaylaneCase />
        <Contact n="07" />
      </main>
    </>
  );
}
