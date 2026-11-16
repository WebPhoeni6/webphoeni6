"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ---------- shared bits ---------- */

export type Media = { url: string; name: string; size: number; uploadedAt: string };

export const inputCls =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-ink";

export const btn =
  "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[12px] font-medium transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100";
export const btnDark = `${btn} bg-ink text-white`;
export const btnLight = `${btn} bg-white text-ink shadow-[0_1px_8px_rgba(0,0,0,0.06)]`;
export const btnGhost = `${btn} text-mute hover:text-ink`;

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-mute">{hint}</span>}
    </label>
  );
}

export function Text({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input className={inputCls} type={type} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

export function Area({ value, onChange, rows = 4, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return <textarea className={`${inputCls} resize-y leading-relaxed`} rows={rows} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

export function Select<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <select className={inputCls} value={value} onChange={(e) => onChange(e.target.value as T)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-2.5 text-left text-[13px]" role="switch" aria-checked={checked}>
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-ink" : "bg-line"}`}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
      </span>
      {label}
    </button>
  );
}

export function Color({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ok = /^#[0-9a-f]{6}$/i.test(value);
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={ok ? value : "#000000"} onChange={(e) => onChange(e.target.value)} className="size-10 shrink-0 cursor-pointer rounded-xl border border-line bg-white p-1" />
      <input className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="#ffffff" />
    </div>
  );
}

/** Comma separated list. Commits on blur so typing a trailing comma works. */
export function Tags({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [raw, setRaw] = useState(value.join(", "));
  useEffect(() => setRaw(value.join(", ")), [value]);
  return (
    <input
      className={inputCls}
      value={raw}
      placeholder={placeholder}
      onChange={(e) => setRaw(e.target.value)}
      onBlur={() =>
        onChange(
          raw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        )
      }
    />
  );
}

export function Card({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-[1.5rem] bg-white p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] md:p-6">
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function RowActions({ i, count, onMove, onRemove }: { i: number; count: number; onMove: (to: number) => void; onRemove: () => void }) {
  const b = "grid size-8 place-items-center rounded-full bg-paper text-[13px] text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-paper disabled:hover:text-ink";
  return (
    <div className="flex items-center gap-1">
      <button type="button" className={b} disabled={i === 0} onClick={() => onMove(i - 1)} aria-label="Move up">
        ↑
      </button>
      <button type="button" className={b} disabled={i === count - 1} onClick={() => onMove(i + 1)} aria-label="Move down">
        ↓
      </button>
      <button type="button" className={`${b} hover:!bg-red-600`} onClick={() => confirm("Remove this?") && onRemove()} aria-label="Remove">
        ×
      </button>
    </div>
  );
}

export function move<T>(arr: T[], from: number, to: number): T[] {
  const a = [...arr];
  const [x] = a.splice(from, 1);
  a.splice(to, 0, x);
  return a;
}

/* ---------- uploads ---------- */

export async function uploadFiles(files: FileList | File[]): Promise<{ items: Media[]; errors: string[] }> {
  const form = new FormData();
  Array.from(files).forEach((f) => form.append("files", f));
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    location.href = "/admin/login";
    return { items: [], errors: ["Session expired"] };
  }
  return { items: data.items ?? [], errors: data.errors ?? (data.error ? [data.error] : res.ok ? [] : ["Upload failed"]) };
}

/** Natural width / height of an image, for the brand sheets which size marks by ratio. */
export const measure = (url: string) =>
  new Promise<number | null>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img.naturalWidth && img.naturalHeight ? Math.round((img.naturalWidth / img.naturalHeight) * 1000) / 1000 : null);
    img.onerror = () => resolve(null);
    img.src = url;
  });

const isImage = (u: string) => /\.(png|jpe?g|webp|gif|avif|svg)(\?|$)/i.test(u);
const kb = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

/* ---------- media picker ---------- */

export function MediaPicker({ onPick, onClose, multiple = false }: { onPick: (urls: string[]) => void; onClose: () => void; multiple?: boolean }) {
  const [tab, setTab] = useState<"uploads" | "site">("uploads");
  const [items, setItems] = useState<Media[] | null>(null);
  const [sel, setSel] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const file = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setItems(null);
    const res = await fetch(`/api/admin/media${tab === "site" ? "?scope=site" : ""}`);
    setItems(res.ok ? await res.json() : []);
  }, [tab]);
  useEffect(() => {
    load();
  }, [load]);

  const upload = async (files: FileList | File[]) => {
    setBusy(true);
    setErr("");
    const { items: added, errors } = await uploadFiles(files);
    setBusy(false);
    if (errors.length) setErr(errors.join(" · "));
    if (added.length) {
      if (tab !== "uploads") setTab("uploads");
      else await load();
      if (!multiple && added.length === 1) onPick([added[0].url]);
      else setSel((s) => (multiple ? [...s, ...added.map((a) => a.url)] : [added[0].url]));
    }
  };

  const toggle = (url: string) => {
    if (!multiple) return onPick([url]);
    setSel((s) => (s.includes(url) ? s.filter((x) => x !== url) : [...s, url]));
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] bg-paper" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 md:px-6">
          <div className="flex gap-1 rounded-full bg-white p-1 text-[12px] font-medium">
            {(["uploads", "site"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3.5 py-1.5 ${tab === t ? "bg-ink text-white" : "text-mute"}`}>
                {t === "uploads" ? "My uploads" : "Already on the site"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={file}
              type="file"
              hidden
              multiple={multiple}
              accept="image/*,.svg,.pdf,video/mp4,video/webm"
              onChange={(e) => e.target.files && upload(e.target.files)}
            />
            <button className={btnDark} disabled={busy} onClick={() => file.current?.click()}>
              {busy ? "Uploading…" : "Upload new"}
            </button>
            <button className={btnLight} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        {err && <p className="bg-red-50 px-6 py-2 text-[12px] text-red-700">{err}</p>}
        <div
          className="min-h-[300px] flex-1 overflow-y-auto p-4 md:p-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
          }}
        >
          {items === null ? (
            <p className="text-[13px] text-mute">Loading…</p>
          ) : items.length === 0 ? (
            <p className="grid min-h-[240px] place-items-center rounded-2xl border border-dashed border-line text-center text-[13px] text-mute">
              Nothing here yet.
              <br />
              Drop files here or press Upload new.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((m) => {
                const on = sel.includes(m.url);
                return (
                  <li key={m.url}>
                    <button onClick={() => toggle(m.url)} className={`group block w-full overflow-hidden rounded-2xl bg-white text-left ring-2 transition ${on ? "ring-ink" : "ring-transparent hover:ring-line"}`}>
                      <span className="grid aspect-square place-items-center bg-[repeating-conic-gradient(#f1f1ef_0_25%,#fff_0_50%)] bg-[length:16px_16px]">
                        {isImage(m.url) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.url} alt="" loading="lazy" className="size-full object-contain" />
                        ) : (
                          <span className="text-[11px] font-semibold uppercase text-mute">{m.name.split(".").pop()}</span>
                        )}
                      </span>
                      <span className="block truncate px-2.5 pt-2 text-[11px] font-medium">{m.name}</span>
                      <span className="block px-2.5 pb-2 text-[10px] text-mute">{kb(m.size)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {multiple && (
          <div className="flex items-center justify-between border-t border-line p-4 md:px-6">
            <span className="text-[12px] text-mute">{sel.length} selected</span>
            <button className={btnDark} disabled={!sel.length} onClick={() => onPick(sel)}>
              Add selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- image fields ---------- */

export function Thumb({ src, bg, className = "" }: { src?: string; bg?: string; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-xl bg-[repeating-conic-gradient(#f1f1ef_0_25%,#fff_0_50%)] bg-[length:12px_12px] ${className}`}
      style={bg ? { background: bg } : undefined}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full object-contain" />
      ) : (
        <span className="text-[10px] text-mute">No image</span>
      )}
    </span>
  );
}

export function ImageField({ label, value, onChange, hint, bg }: { label: string; value: string | undefined; onChange: (v: string) => void; hint?: string; bg?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">{label}</span>
      <div className="flex items-start gap-3">
        <Thumb src={value} bg={bg} className="size-20" />
        <div className="min-w-0 flex-1 space-y-2">
          <input className={inputCls} value={value ?? ""} placeholder="/work/… or pick below" onChange={(e) => onChange(e.target.value)} />
          <div className="flex gap-2">
            <button type="button" className={btnDark} onClick={() => setOpen(true)}>
              Choose / upload
            </button>
            {value && (
              <button type="button" className={btnGhost} onClick={() => onChange("")}>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
      {hint && <p className="mt-1 text-[11px] text-mute">{hint}</p>}
      {open && (
        <MediaPicker
          onClose={() => setOpen(false)}
          onPick={([u]) => {
            onChange(u);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

/** A reorderable list of image URLs. */
export function ImageList({ label, value, onChange, hint }: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">{label}</span>
      <ul className="space-y-2">
        {value.map((u, i) => (
          <li key={`${u}-${i}`} className="flex items-center gap-3 rounded-2xl bg-paper p-2">
            <Thumb src={u} className="size-14" />
            <input className={inputCls} value={u} onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} />
            <RowActions i={i} count={value.length} onMove={(to) => onChange(move(value, i, to))} onRemove={() => onChange(value.filter((_, j) => j !== i))} />
          </li>
        ))}
      </ul>
      <button type="button" className={`${btnLight} mt-2`} onClick={() => setOpen(true)}>
        + Add images
      </button>
      {hint && <p className="mt-1 text-[11px] text-mute">{hint}</p>}
      {open && (
        <MediaPicker
          multiple
          onClose={() => setOpen(false)}
          onPick={(urls) => {
            onChange([...value, ...urls]);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
