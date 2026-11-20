import { NextResponse } from "next/server";

// Which price list a visitor sees is decided here, from the country their connection comes from.
// Vercel adds the header. Nigeria gets naira, the UK gets pounds, everyone else gets dollars.
export const dynamic = "force-dynamic";

const UK = new Set(["GB", "IM", "JE", "GG"]);

export function GET(request: Request) {
  const country = (request.headers.get("x-vercel-ip-country") ?? "").toUpperCase();
  // No header (local development, or a connection Vercel can't place): say so and let the page fall back.
  const region = country === "NG" ? "ng" : UK.has(country) ? "uk" : country ? "us" : null;
  return NextResponse.json({ region }, { headers: { "Cache-Control": "private, no-store" } });
}
