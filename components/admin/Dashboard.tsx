"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/seed";
import { btnDark, btnLight, Card, type Media, uploadFiles } from "./fields";
import { BrandsSection, CampaignsSection, ExperienceSection, ProfileSection, ProjectsSection, ServicesSection } from "./sections";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "profile", label: "Profile and contact" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "brands", label: "Brands" },
  { id: "campaigns", label: "Campaigns" },
  { id: "media", label: "Media library" },
] as const;
type Tab = (typeof TABS)[number]["id"];

export default function Dashboard({ initial }: { initial: SiteContent }) {
  const [saved, setSaved] = useState(initial);
  const [c, setC] = useState(initial);
  const [tab, setTab] = useState<Tab>("overview");
  const [status, setStatus] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [nav, setNav] = useState(false);

  const dirty = JSON.stringify(c) !== JSON.stringify(saved);

  const save = useCallback(async () => {
    setSaving(true);
    setStatus(null);
    const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(c) });
    setSaving(false);
    if (res.status === 401) {
      location.href = "/admin/login";
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setSaved(c);
      setStatus({ kind: "ok", text: "Published. The site is updated." });
    } else setStatus({ kind: "err", text: data.error || "Could not save" });
  }, [c]);

  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveRef.current();
      }
    };
    const onLeave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    addEventListener("keydown", onKey);
    addEventListener("beforeunload", onLeave);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("beforeunload", onLeave);
    };
  }, [dirty]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    location.href = "/admin/login";
  };

  const discard = () => {
    if (!confirm("Discard all unsaved changes?")) return;
    setC(saved);
    setStatus(null);
  };

  const props = { c, set: setC };

  return (
    <div className="min-h-screen bg-[#111] md:p-3">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:min-h-[calc(100vh-1.5rem)] md:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 text-white md:sticky md:top-3 md:h-[calc(100vh-1.5rem)] md:w-64">
          <div className="flex items-center justify-between px-5 py-4 md:block md:px-6 md:pt-7">
            <div>
              <p className="font-display text-xl font-bold tracking-tight">
                {c.profile.firstName[0]}.{c.profile.lastName[0]}
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Dashboard</p>
            </div>
            <button className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] md:hidden" onClick={() => setNav(!nav)}>
              {nav ? "Close" : "Menu"}
            </button>
          </div>
          <nav className={`${nav ? "block" : "hidden"} px-3 pb-4 md:block`}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  setNav(false);
                  scrollTo({ top: 0 });
                }}
                className={`mb-0.5 block w-full rounded-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors ${tab === t.id ? "bg-white text-ink" : "text-white/60 hover:text-white"}`}
              >
                {t.label}
              </button>
            ))}
            <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
              <Link href="/" target="_blank" className="block rounded-full px-4 py-2 text-[12px] text-white/50 hover:text-white">
                View site ↗
              </Link>
              <button onClick={logout} className="block w-full rounded-full px-4 py-2 text-left text-[12px] text-white/50 hover:text-white">
                Log out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 rounded-t-[2rem] bg-paper px-4 pb-32 pt-8 md:rounded-[2rem] md:px-10 md:pt-10">
          <h1 className="mb-6 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em]">{TABS.find((t) => t.id === tab)?.label}</h1>
          {tab === "overview" && <Overview c={c} go={setTab} />}
          {tab === "projects" && <ProjectsSection {...props} />}
          {tab === "profile" && <ProfileSection {...props} />}
          {tab === "services" && <ServicesSection {...props} />}
          {tab === "experience" && <ExperienceSection {...props} />}
          {tab === "brands" && <BrandsSection {...props} />}
          {tab === "campaigns" && <CampaignsSection {...props} />}
          {tab === "media" && <MediaLibrary />}
        </main>
      </div>

      {/* Save bar */}
      {(dirty || status) && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="flex max-w-full items-center gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-[13px] text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
            <span className={status?.kind === "err" ? "text-red-300" : "text-white/80"}>
              {status?.kind === "err" ? status.text : dirty ? "Unsaved changes" : status?.text}
            </span>
            {dirty ? (
              <>
                <button className="rounded-full px-3 py-2 text-white/60 hover:text-white" onClick={discard}>
                  Discard
                </button>
                <button className="rounded-full bg-white px-4 py-2 font-medium text-ink disabled:opacity-50" disabled={saving} onClick={save}>
                  {saving ? "Publishing…" : "Publish changes"}
                </button>
              </>
            ) : (
              <button className="rounded-full px-3 py-2 text-white/60 hover:text-white" onClick={() => setStatus(null)}>
                Dismiss
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Overview({ c, go }: { c: SiteContent; go: (t: Tab) => void }) {
  const stats = [
    { n: c.projects.length, label: "Projects", tab: "projects" as Tab },
    { n: c.brands.length, label: "Brands", tab: "brands" as Tab },
    { n: c.services.length, label: "Services", tab: "services" as Tab },
    { n: c.experience.length, label: "Experience", tab: "experience" as Tab },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <button key={s.label} onClick={() => go(s.tab)} className="rounded-[1.5rem] bg-white p-5 text-left shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform hover:scale-[1.02]">
            <span className="block font-display text-4xl font-bold tracking-tight">{String(s.n).padStart(2, "0")}</span>
            <span className="text-[12px] text-mute">{s.label}</span>
          </button>
        ))}
      </div>
      <Card title="How this works">
        <ul className="space-y-2 text-[13px] leading-relaxed text-ink/80">
          <li>
            <b>New poster, logo or mockup:</b> go to{" "}
            <button className="underline" onClick={() => go("projects")}>
              Projects
            </button>
            , press New project, upload the images, and publish. Add logos under{" "}
            <button className="underline" onClick={() => go("brands")}>
              Brands
            </button>{" "}
            to also get them in the Brand PDF page.
          </li>
          <li>
            <b>Any text on the page:</b> your name, intro, links and email are in{" "}
            <button className="underline" onClick={() => go("profile")}>
              Profile
            </button>
            ; the section copy is in Services and Experience.
          </li>
          <li>
            <b>Nothing goes live until you press Publish changes</b> (or Ctrl+S). Discard throws away everything since the last publish.
          </li>
        </ul>
      </Card>
      <div className="flex gap-2">
        <button className={btnDark} onClick={() => go("projects")}>
          Add a project
        </button>
        <button className={btnLight} onClick={() => go("media")}>
          Upload files
        </button>
      </div>
    </div>
  );
}

function MediaLibrary() {
  const [items, setItems] = useState<Media[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/media");
    setItems(r.ok ? await r.json() : []);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const upload = async (files: FileList | File[]) => {
    setBusy(true);
    const { errors } = await uploadFiles(files);
    setErr(errors.join(" · "));
    setBusy(false);
    load();
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
      }}
    >
      <input ref={input} type="file" hidden multiple accept="image/*,.svg,.pdf,video/mp4,video/webm" onChange={(e) => e.target.files && upload(e.target.files)} />
      <button className={btnDark} disabled={busy} onClick={() => input.current?.click()}>
        {busy ? "Uploading…" : "Upload files"}
      </button>
      <span className="ml-3 text-[12px] text-mute">or drop them anywhere here. Images, SVG, PDF, MP4, WebM up to 25 MB.</span>
      {err && <p className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-[12px] text-red-700">{err}</p>}
      <p className="mt-3 text-[12px] text-mute">Uploading adds files to the library only. To show one on the site, choose it in a project, brand or profile field.</p>

      {items === null ? (
        <p className="mt-6 text-[13px] text-mute">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-6 grid min-h-[200px] place-items-center rounded-[1.5rem] border border-dashed border-line text-[13px] text-mute">No uploads yet.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((m) => (
            <li key={m.url} className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <div className="grid aspect-square place-items-center bg-[repeating-conic-gradient(#f1f1ef_0_25%,#fff_0_50%)] bg-[length:16px_16px]">
                {/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(m.name) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt="" loading="lazy" className="size-full object-contain" />
                ) : (
                  <span className="text-[11px] font-semibold uppercase text-mute">{m.name.split(".").pop()}</span>
                )}
              </div>
              <p className="truncate px-3 pt-2 text-[11px] font-medium">{m.name}</p>
              <div className="flex gap-1 px-2 pb-2 pt-1">
                <button
                  className="rounded-full px-2 py-1 text-[11px] text-mute hover:text-ink"
                  onClick={async () => {
                    await navigator.clipboard.writeText(m.url.startsWith("/") ? location.origin + m.url : m.url).catch(() => {});
                    setCopied(m.url);
                    setTimeout(() => setCopied(""), 1500);
                  }}
                >
                  {copied === m.url ? "Copied" : "Copy link"}
                </button>
                <button
                  className="rounded-full px-2 py-1 text-[11px] text-mute hover:text-red-600"
                  onClick={async () => {
                    if (!confirm(`Delete ${m.name}? Any page using it will show a broken image.`)) return;
                    await fetch(`/api/admin/media?url=${encodeURIComponent(m.url)}`, { method: "DELETE" });
                    load();
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
