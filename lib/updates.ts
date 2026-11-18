/**
 * The "Latest" row on the landing page, newest first.
 *
 * To announce something new, add one line at the top:
 *   - a poster:      { date: "2026-12-01", label: "Poster", title: "Name", poster: "file-name" }
 *     ("file-name" is the poster's file in /public/work, without .webp. It must also be in the poster series.)
 *   - anything else: { date: "...", label: "Project", title: "Name", image: "/work/x.webp", href: "/work/slug" }
 * Keep it to the last five or six, so the row stays short.
 */
export type Update = {
  date: string;
  label: string;
  title: string;
  poster?: string;
  image?: string;
  href?: string;
};

export const updates: Update[] = [
  { date: "2026-11-18", label: "Poster", title: "Apple", poster: "apple" },
  { date: "2026-11-18", label: "Poster", title: "Zurich", poster: "zurich" },
  { date: "2026-11-18", label: "Poster", title: "Birds of America", poster: "birds-of-america" },
  { date: "2026-11-18", label: "Poster", title: "Phonograph", poster: "phonograph" },
  { date: "2026-11-18", label: "Poster", title: "Pizza", poster: "pizza" },
  { date: "2026-11-18", label: "Poster", title: "Coca-Cola", poster: "coca-cola" },
];
