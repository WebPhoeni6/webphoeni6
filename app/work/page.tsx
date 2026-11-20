import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { getContent } from "@/lib/store";
import { abs, breadcrumbs, brandSchema, fullName, graph, PERSON_ID, personSchema, SITE_URL, WEBSITE_ID } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const name = fullName(profile);
  const title = `Work by ${name}`;
  const description = `Every project by ${name}: apps and websites, brand identities and logos, and a growing series of posters.`;
  return {
    title,
    description,
    alternates: { canonical: "/work" },
    openGraph: { type: "website", url: "/work", siteName: "Web Phoenix", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WorkPage() {
  const { profile, projects } = await getContent();
  return (
    <>
      <JsonLd
        json={graph(
          personSchema(profile),
          brandSchema(profile),
          {
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/work#page`,
            url: `${SITE_URL}/work`,
            name: `Work by ${fullName(profile)}`,
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": PERSON_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.slice(0, 50).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/work/${p.slug}`), name: p.title })),
            },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        )}
      />
      <main className="mx-auto max-w-[1600px] bg-[#111]">
        <Nav />
        <Work page />
        <Contact />
      </main>
    </>
  );
}
