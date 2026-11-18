"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/seed";
import SmoothScroll from "./SmoothScroll";
import BackToTop from "./BackToTop";

const Ctx = createContext<SiteContent | null>(null);

export function ContentProvider({ value, children }: { value: SiteContent; children: React.ReactNode }) {
  return (
    <Ctx.Provider value={value}>
      <SmoothScroll />
      {children}
      <BackToTop />
    </Ctx.Provider>
  );
}

export function useContent() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useContent must be used inside <ContentProvider>");
  return c;
}

export const useContactHref = () => {
  const { profile } = useContent();
  return profile.email ? `mailto:${profile.email}` : "/#contact";
};

export const getProjectIn = (projects: SiteContent["projects"], slug: string) => projects.find((p) => p.slug === slug);
