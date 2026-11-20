import fs from "node:fs";
import path from "node:path";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/store";
import JsonLd from "@/components/JsonLd";
import { abs, brandSchema, fullName, graph, PERSON_ID, personSchema, SITE_URL, WEBSITE_ID, websiteSchema } from "@/lib/seo";

export default async function Home() {
  const { profile } = await getContent();
  // Dashboard uploads live in /uploads or on a blob URL; built-in files live in /public.
  const hasPortrait = /^(https?:)?\/\//.test(profile.portrait) || profile.portrait.startsWith("/uploads/") || fs.existsSync(path.join(process.cwd(), "public", profile.portrait));
  const { projects } = await getContent();
  const structuredData = graph(
    websiteSchema(),
    personSchema(profile),
    brandSchema(profile),
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/#work`,
      url: SITE_URL,
      name: `Selected work by ${fullName(profile)}`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.slice(0, 20).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/work/${p.slug}`), name: p.title })),
      },
    },
  );

  return (
    <>
      <JsonLd json={structuredData} />
      <main className="mx-auto max-w-[1600px] bg-[#111]">
        <div className="relative">
          <Nav />
          <Hero hasPortrait={hasPortrait} />
        </div>
        <Marquee />
        <Work />
        <Services />
        <Pricing />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
