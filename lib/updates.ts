/**
 * The "Latest" row on the landing page, newest first.
 *
 * To announce something new, add one line at the top:
 *   - a poster:      { date: "2026-12-01", label: "New poster", title: "Name", poster: "file-name" }
 *     ("file-name" is the poster's file in /public/work, without .webp. It must also be in the poster series.)
 *   - anything else: { date: "...", label: "New project", title: "Name", image: "/work/x.webp", href: "/work/slug" }
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
  { date: "2026-11-18", label: "New poster", title: "Pizza", poster: "pizza" },
  { date: "2026-11-18", label: "New poster", title: "Coca-Cola", poster: "coca-cola" },
  { date: "2026-11-17", label: "New poster series", title: "Board Notes: six chess pieces", poster: "pawn" },
  { date: "2026-11-17", label: "New poster", title: "Lagos", poster: "lagos" },
  { date: "2026-10-22", label: "New poster", title: "Clouds", poster: "clouds" },
  { date: "2026-10-22", label: "New poster", title: "Maze", poster: "maze" },
];
