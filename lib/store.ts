import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { del, list, put } from "@vercel/blob";
import { seed, type SiteContent } from "./seed";

/**
 * Two backends, picked automatically:
 *  - BLOB_READ_WRITE_TOKEN set (Vercel): content.json and uploads live in Vercel Blob.
 *  - otherwise: ./data/content.json and ./data/uploads on disk (served at /uploads/*).
 */
const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const DATA = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA, "uploads");
const CONTENT_FILE = path.join(DATA, "content.json");
const BLOB_CONTENT = "site/content.json";

export type MediaItem = { url: string; name: string; size: number; uploadedAt: string };

const merge = (stored: Partial<SiteContent>): SiteContent => ({ ...seed, ...stored });

export async function getContent(): Promise<SiteContent> {
  try {
    if (useBlob()) {
      const { blobs } = await list({ prefix: BLOB_CONTENT, limit: 1 });
      if (!blobs[0]) return seed;
      const res = await fetch(`${blobs[0].url}?v=${blobs[0].uploadedAt.getTime()}`, { next: { revalidate: 60, tags: ["content"] } });
      return res.ok ? merge(await res.json()) : seed;
    }
    return merge(JSON.parse(await fs.readFile(CONTENT_FILE, "utf8")));
  } catch {
    return seed;
  }
}

export async function saveContent(content: SiteContent) {
  const json = JSON.stringify(content, null, 2);
  if (useBlob()) {
    await put(BLOB_CONTENT, json, { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
    return;
  }
  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(CONTENT_FILE, json);
}

const ALLOWED: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};
export const MAX_BYTES = 25 * 1024 * 1024;
export const mimeFor = (file: string) => ALLOWED[path.extname(file).toLowerCase()];

const safeName = (original: string) => {
  const ext = path.extname(original).toLowerCase();
  const base = path.basename(original, path.extname(original)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "file";
  return `${base}-${randomBytes(3).toString("hex")}${ext}`;
};

export async function saveUpload(file: File): Promise<MediaItem> {
  const type = mimeFor(file.name);
  if (!type) throw new Error(`${file.name}: file type not allowed`);
  if (file.size > MAX_BYTES) throw new Error(`${file.name}: larger than 25 MB`);
  const name = safeName(file.name);
  if (useBlob()) {
    const b = await put(`uploads/${name}`, file, { access: "public", addRandomSuffix: false, contentType: type, cacheControlMaxAge: 31536000 });
    return { url: b.url, name, size: file.size, uploadedAt: new Date().toISOString() };
  }
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return { url: `/uploads/${name}`, name, size: file.size, uploadedAt: new Date().toISOString() };
}

export async function listUploads(): Promise<MediaItem[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: "uploads/", limit: 1000 });
    return blobs
      .map((b) => ({ url: b.url, name: b.pathname.replace("uploads/", ""), size: b.size, uploadedAt: b.uploadedAt.toISOString() }))
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  }
  try {
    const names = await fs.readdir(UPLOAD_DIR);
    const items = await Promise.all(
      names.map(async (name) => {
        const st = await fs.stat(path.join(UPLOAD_DIR, name));
        return { url: `/uploads/${name}`, name, size: st.size, uploadedAt: st.mtime.toISOString() };
      }),
    );
    return items.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  } catch {
    return [];
  }
}

export async function deleteUpload(url: string) {
  if (useBlob()) {
    if (!/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/uploads\//.test(url)) throw new Error("Not an upload");
    await del(url);
    return;
  }
  if (!url.startsWith("/uploads/")) throw new Error("Not an upload");
  const name = path.basename(url);
  await fs.unlink(path.join(UPLOAD_DIR, name));
}

/** Images already shipped with the site (public/work), so they can be reused from the picker. */
export async function listSiteImages(): Promise<MediaItem[]> {
  const root = path.join(process.cwd(), "public", "work");
  const out: MediaItem[] = [];
  const walk = async (dir: string) => {
    for (const e of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === "pdf") continue; // JPEG twins used only for the PDF
        await walk(full);
      } else if (/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(e.name)) {
        const st = await fs.stat(full);
        out.push({ url: "/work/" + path.relative(root, full).split(path.sep).join("/"), name: e.name, size: st.size, uploadedAt: st.mtime.toISOString() });
      }
    }
  };
  try {
    await walk(root);
  } catch {}
  return out.sort((a, b) => a.url.localeCompare(b.url));
}
