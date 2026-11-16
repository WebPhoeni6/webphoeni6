import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

const password = () => process.env.ADMIN_PASSWORD || "";
export const authConfigured = () => password().length >= 8;

const secret = () => process.env.SESSION_SECRET || `portfolio-admin::${password()}`;
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

const safeEqual = (a: string, b: string) => {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
};

export const checkPassword = (attempt: string) => {
  if (!authConfigured()) return false;
  // Compare HMACs so the lengths always match and timing leaks nothing.
  return safeEqual(sign(`pw:${attempt}`), sign(`pw:${password()}`));
};

export const makeToken = () => {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
};

const validToken = (token?: string) => {
  if (!token || !authConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
};

export async function isAdmin() {
  return validToken((await cookies()).get(COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};

/** Same-origin check for state-changing requests (CSRF defence on top of SameSite). */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
