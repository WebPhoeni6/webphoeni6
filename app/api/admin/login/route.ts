import { NextResponse } from "next/server";
import { authConfigured, checkPassword, COOKIE, cookieOptions, makeToken, sameOrigin } from "@/lib/auth";

// Simple in-memory throttle: 5 wrong attempts per IP per 15 minutes.
const tries = new Map<string, { n: number; reset: number }>();

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  if (!authConfigured()) return NextResponse.json({ error: "ADMIN_PASSWORD is not set (min 8 characters)." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const t = tries.get(ip);
  if (t && t.reset > now && t.n >= 5) return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  if (!checkPassword(String(body.password ?? ""))) {
    tries.set(ip, { n: t && t.reset > now ? t.n + 1 : 1, reset: t && t.reset > now ? t.reset : now + 15 * 60_000 });
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  tries.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, makeToken(), cookieOptions);
  return res;
}
