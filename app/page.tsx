import fs from "node:fs";
import path from "node:path";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/store";

export default async function Home() {
  const { profile } = await getContent();
  // Dashboard uploads live in /uploads or on a blob URL; built-in files live in /public.
  const hasPortrait = /^(https?:)?\/\//.test(profile.portrait) || profile.portrait.startsWith("/uploads/") || fs.existsSync(path.join(process.cwd(), "public", profile.portrait));

  return (
    <main className="mx-auto max-w-[1600px] bg-[#111]">
      <div className="relative">
        <Nav />
        <Hero hasPortrait={hasPortrait} />
      </div>
      <Marquee />
      <Work />
      <Services />
      <Experience />
      <Contact />
    </main>
  );
}
