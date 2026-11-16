import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/auth";
import { saveUpload } from "@/lib/store";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  const form = await req.formData();
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (!files.length) return NextResponse.json({ error: "No files" }, { status: 400 });
  const items = [];
  const errors: string[] = [];
  for (const f of files) {
    try {
      items.push(await saveUpload(f));
    } catch (e) {
      errors.push(e instanceof Error ? e.message : "Upload failed");
    }
  }
  return NextResponse.json({ items, errors }, { status: items.length ? 200 : 400 });
}
