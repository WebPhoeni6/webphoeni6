import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}: Samuel Emeka, developer and designer`,
    short_name: SITE_NAME,
    description: "Portfolio of Samuel Emeka (Web Phoenix): products, software, websites, brand identities and posters.",
    start_url: "/",
    display: "standalone",
    background_color: "#161616",
    theme_color: "#161616",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
