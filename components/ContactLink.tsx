"use client";

import type { ReactNode } from "react";
import { useContent } from "./ContentProvider";

/**
 * "Say hello" opens WhatsApp. If nothing seems to have opened (the visitor has no WhatsApp, or it was
 * blocked), it falls back to email a moment later. With no WhatsApp link in the profile it is simply an email link.
 */
export default function ContactLink({ className, children, onClick }: { className?: string; children: ReactNode; onClick?: () => void }) {
  const { profile } = useContent();
  const wa = profile.socials.find((s) => /whatsapp/i.test(s.label) && s.href)?.href;
  const mail = profile.email ? `mailto:${profile.email}` : "/#contact";

  if (!wa) {
    return (
      <a href={mail} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  const click = () => {
    onClick?.();
    // If WhatsApp or its tab took over, the page loses focus. If we are still here, offer email instead.
    window.setTimeout(() => {
      if (document.visibilityState === "visible" && document.hasFocus() && profile.email) {
        window.location.href = mail;
      }
    }, 2800);
  };

  return (
    <a href={wa} target="_blank" rel="noreferrer" className={className} onClick={click}>
      {children}
    </a>
  );
}
