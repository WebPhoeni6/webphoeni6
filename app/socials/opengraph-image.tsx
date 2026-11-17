import { ogSize, ogType, shareImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogType;
export const alt = "Samuel Emeka on social media";

export default function Image() {
  return shareImage({ eyebrow: "Socials", title: "Find me online", line: "Email, WhatsApp, Telegram, Instagram, LinkedIn and more.", image: "/samuel.webp", fit: "contain" });
}
