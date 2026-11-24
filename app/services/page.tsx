import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import { BuildArt } from "@/components/Art";
import JsonLd from "@/components/JsonLd";
import { getContent } from "@/lib/store";
import { breadcrumbs, brandSchema, fullName, graph, personSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const name = fullName(profile);
  const title = `Services and pricing | ${name}`;
  const description = `Websites, brand identities, logos, apps and design from ${name}. See what each service includes and what it costs, then build a package.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/services" },
    openGraph: { type: "website", url: "/services", siteName: "Web Phoenix", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicesPage() {
  const { profile } = await getContent();
  return (
    <>
      <JsonLd
        json={graph(
          personSchema(profile),
          brandSchema(profile),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        )}
      />
      <main className="mx-auto max-w-[1600px] bg-[#111]">
        <Nav />
        <header className="relative overflow-hidden bg-paper px-5 pb-24 pt-32 text-ink md:px-10 md:pb-28 md:pt-44">
          <BuildArt className="absolute -right-3 top-28 hidden w-36 opacity-90 sm:right-6 sm:block sm:w-52 md:right-16 md:top-36 md:w-72" delay={0.2} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">Services and pricing</p>
          <h1 className="mt-6 font-display text-[clamp(2.1rem,6.65vw,6.3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            What I can
            <br />
            build for you
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/70 md:text-base">
            Websites, brands and apps, from the first sketch to the day it goes live. Pick what you need below and see what it costs.
          </p>
        </header>
        <Services n="01" />
        <Pricing n="02" />
        <Contact />
      </main>
    </>
  );
}
