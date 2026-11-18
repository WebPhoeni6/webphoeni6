import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/store";
import { ContentProvider } from "@/components/ContentProvider";
import type { Viewport } from "next";
import { KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const title = `${fullName} | ${SITE_NAME} | ${profile.role}`;
  const description = `The portfolio of ${fullName}, known as ${SITE_NAME}: a ${profile.role.toLowerCase()} creating digital products, software, websites, and brand identities. Explore selected work and get in touch.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    keywords: KEYWORDS,
    authors: [{ name: fullName, url: SITE_URL }],
    creator: fullName,
    publisher: fullName,
    category: "portfolio",
    alternates: { canonical: "/" },
    openGraph: { type: "website", url: SITE_URL, siteName: SITE_NAME, title, description, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    // Search Console and Bing: set these two variables on Vercel with the codes they give you.
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
  ],
  colorScheme: "dark light",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}" }} />
      </head>
      <body>
        <ContentProvider value={content}>{children}</ContentProvider>
      </body>
    </html>
  );
}
