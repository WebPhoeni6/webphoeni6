import { FaBehance, FaDiscord, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";

const icons: Record<string, IconType> = {
  email: FaEnvelope,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  discord: FaDiscord,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  behance: FaBehance,
};

/** Picks an icon from a social's label. Unknown labels get an envelope. */
export function SocialIcon({ label, className = "size-4" }: { label: string; className?: string }) {
  const Icon = icons[label.trim().toLowerCase()] ?? FaEnvelope;
  return <Icon className={className} aria-hidden />;
}

/** The text shown next to the icon on the socials page. */
export function socialHandle(label: string, href: string): string {
  const l = label.trim().toLowerCase();
  if (l === "telegram") return "@webphoeni6";
  if (l === "discord") return "web_phoeni6";
  if (l === "whatsapp") return "Message me on WhatsApp";
  if (l === "instagram") return "@web_phoenix___";
  if (l === "facebook") return "webphoeni6";
  if (l === "linkedin") return "samuelemekawp";
  if (l === "behance") return "samuelemeka2";
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
