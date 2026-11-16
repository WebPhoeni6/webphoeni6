"use client";

import { useState } from "react";

export default function LoginForm({ configured }: { configured: boolean }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (res.ok) {
      location.href = "/admin";
      return;
    }
    setBusy(false);
    setErr((await res.json().catch(() => ({}))).error || "Could not log in");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#111] p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[2rem] bg-paper p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">Dashboard</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.04em]">Welcome back.</h1>
        {!configured ? (
          <p className="mt-6 rounded-2xl bg-white p-4 text-[13px] leading-relaxed">
            No password is set yet. Add <code className="rounded bg-paper px-1">ADMIN_PASSWORD=your-password</code> (at least 8 characters) to <code className="rounded bg-paper px-1">.env.local</code>, or to your Vercel environment variables, then restart.
          </p>
        ) : (
          <>
            <input
              type="password"
              autoFocus
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              className="mt-8 w-full rounded-full border border-line bg-white px-5 py-3 text-[14px] outline-none focus:border-ink"
            />
            {err && <p className="mt-3 text-[12px] text-red-600">{err}</p>}
            <button disabled={busy || !pw} className="mt-4 w-full rounded-full bg-ink py-3 text-[13px] font-medium text-white transition-transform hover:scale-[1.02] disabled:opacity-40">
              {busy ? "Checking…" : "Log in"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
