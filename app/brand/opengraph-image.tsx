import { ogSize, ogType, shareImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogType;
export const alt = "Brand portfolio by Samuel Emeka";

export default function Image() {
  return shareImage({ eyebrow: "Brand portfolio", title: "Logos, mascots and posters", line: "Brand identity work by Samuel Emeka.", image: "/work/for-the-record.webp" });
}
