"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Dark is the default. The choice is saved in this browser, and an inline script in the page head
 * applies it before anything paints, so there is no flash.
 */
export default function ThemeToggle({ tone = "light", className = "", showLabel = false }: { tone?: "dark" | "light"; className?: string; showLabel?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const flip = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const look = tone === "dark" ? "border-white/25 hover:bg-white hover:text-[#111]" : "border-ink/20 hover:bg-ink hover:text-paper";

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 rounded-full border transition-colors duration-300 ${showLabel ? "px-3.5 py-2 text-[12px] font-medium" : "size-9"} ${look} ${className}`}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <path d="M13.5 9.6A5.7 5.7 0 016.4 2.5a5.7 5.7 0 107.1 7.1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      )}
      {showLabel && (theme === "dark" ? "Light mode" : "Dark mode")}
    </button>
  );
}
