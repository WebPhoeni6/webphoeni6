import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin, sameOrigin } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/store";
import type { SiteContent } from "@/lib/seed";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getContent());
}

function validate(c: any): string | null {
  if (!c || typeof c !== "object") return "Invalid content";
  if (!c.profile || typeof c.profile !== "object") return "Missing profile";
  for (const k of ["projects", "services", "experience", "brands"]) if (!Array.isArray(c[k])) return `Missing ${k}`;
  if (!c.campaigns?.linkco || !c.campaigns?.explorations) return "Missing campaigns";
  const slugs = new Set<string>();
  for (const p of c.projects) {
    if (typeof p.slug !== "string" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) return `Project "${p.title || "?"}": the URL slug must be lowercase letters, numbers and dashes`;
    if (slugs.has(p.slug)) return `Two projects share the slug "${p.slug}"`;
    slugs.add(p.slug);
    if (!p.title || !p.cover) return `Project "${p.slug}" needs a title and a cover image`;
    if (!Array.isArray(p.gallery) || !Array.isArray(p.tags) || !Array.isArray(p.tools)) return `Project "${p.slug}" is malformed`;
  }
  return null;
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  const text = await req.text();
  if (text.length > 2_000_000) return NextResponse.json({ error: "Content too large" }, { status: 413 });
  let content: SiteContent;
  try {
    content = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const problem = validate(content);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });
  await saveContent(content);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
