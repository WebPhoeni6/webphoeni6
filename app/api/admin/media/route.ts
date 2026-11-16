import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/auth";
import { deleteUpload, listSiteImages, listUploads } from "@/lib/store";

export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const scope = new URL(req.url).searchParams.get("scope");
  return NextResponse.json(scope === "site" ? await listSiteImages() : await listUploads());
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  const url = new URL(req.url).searchParams.get("url") || "";
  try {
    await deleteUpload(url);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Delete failed" }, { status: 400 });
  }
}
