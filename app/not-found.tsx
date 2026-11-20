import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-paper px-5 text-ink">
      <Nav />
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">404</p>
        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]">That page isn&apos;t here.</h1>
        <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-ink/60">It may have moved, or the link is wrong. The work is still on the home page.</p>
        <div className="mt-8 flex justify-center gap-2.5">
          <Link href="/" className="rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-paper transition-transform hover:scale-[1.04]">
            Go home
          </Link>
          <Link href="/work" className="rounded-full border border-ink/25 px-5 py-3 text-[13px] font-medium transition-colors hover:bg-ink/10">
            See the work
          </Link>
        </div>
      </div>
    </main>
  );
}
