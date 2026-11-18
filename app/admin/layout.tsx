import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

// The dashboard stays light, whatever theme the site is in.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="light" className="min-h-svh bg-[var(--backdrop)] text-ink">
      {children}
    </div>
  );
}
