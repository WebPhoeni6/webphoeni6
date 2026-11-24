import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { getContent } from "@/lib/store";
import { breadcrumbs, brandSchema, fullName, graph, personSchema } from "@/lib/seo";

const OG = "/work/paylane/og.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const name = fullName(profile);
  const title = `Brand packages: Ember, Flame and Phoenix | ${name}`;
  const description = `Three brand identity packages for startups, from a first logo suite to a full launch kit with strategy, packaging and signage. Designed and delivered by ${name}.`;
  const images = [{ url: OG, width: 1200, height: 630, alt: "Paylane brand identity on a billboard, an example of a Web Phoenix brand package" }];
  return {
    title: { absolute: title },
    description,
    keywords: ["brand packages", "brand identity packages", "logo design", "startup branding", "Nigeria", "Samuel Emeka", "Web Phoenix"],
    alternates: { canonical: "/packages" },
    openGraph: { type: "website", url: "/packages", siteName: "Web Phoenix", title, description, images },
    twitter: { card: "summary_large_image", title, description, images: [OG] },
  };
}

export default async function PackagesPage() {
  const { profile } = await getContent();
  return (
    <>
      <JsonLd
        json={graph(
          personSchema(profile),
          brandSchema(profile),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Brand packages", path: "/packages" },
          ]),
        )}
      />
      <main className="mx-auto max-w-[1600px] bg-[#111]">
        <Nav />
        <Packages />
        <Contact n="" />
      </main>
    </>
  );
}
