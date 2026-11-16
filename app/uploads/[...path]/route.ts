import fs from "node:fs/promises";
import path from "node:path";
import { mimeFor, UPLOAD_DIR } from "@/lib/store";

/** Serves files uploaded from the dashboard when running without Vercel Blob. */
export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await ctx.params;
  const name = path.basename(parts.join("/"));
  const type = mimeFor(name);
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(buf, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
