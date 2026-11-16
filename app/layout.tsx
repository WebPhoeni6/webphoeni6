import type { Metadata } from "next";
import { Inter_Tight, Manrope } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/store";
import { ContentProvider } from "@/components/ContentProvider";

const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const title = `${profile.firstName} ${profile.lastName} | ${profile.role}`;
  return { title, description: profile.blurb, openGraph: { title, description: profile.blurb, type: "website" } };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <ContentProvider value={content}>{children}</ContentProvider>
      </body>
    </html>
  );
}
