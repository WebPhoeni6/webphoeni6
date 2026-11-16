"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/seed";
import { Area, btnDark, btnLight, Card, Color, Field, ImageField, ImageList, measure, move, RowActions, Select, Tags, Text, Thumb, Toggle, uploadFiles } from "./fields";

export type Props = { c: SiteContent; set: (next: SiteContent) => void };
type Project = SiteContent["projects"][number];
type Brand = SiteContent["brands"][number];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ---------- Profile ---------- */

export function ProfileSection({ c, set }: Props) {
  const p = c.profile;
  const up = (patch: Partial<typeof p>) => set({ ...c, profile: { ...p, ...patch } });
  return (
    <div className="space-y-5">
      <Card title="You">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="First name">
            <Text value={p.firstName} onChange={(v) => up({ firstName: v })} />
          </Field>
          <Field label="Last name">
            <Text value={p.lastName} onChange={(v) => up({ lastName: v })} />
          </Field>
          <Field label="Role (under your name)">
            <Text value={p.role} onChange={(v) => up({ role: v })} />
          </Field>
          <Field label="Status">
            <Text value={p.status} onChange={(v) => up({ status: v })} />
          </Field>
          <Field label="Short intro" className="md:col-span-2">
            <Area rows={3} value={p.blurb} onChange={(v) => up({ blurb: v })} />
          </Field>
          <div className="md:col-span-2">
            <ImageField label="Portrait" value={p.portrait} onChange={(v) => up({ portrait: v })} hint="A transparent-background cut-out works best. Leave empty to use the poster collage." />
          </div>
        </div>
      </Card>
      <Card title="Contact and links">
        <Field label="Email" hint="Leave empty to send visitors to the contact section instead of an email link.">
          <Text type="email" value={p.email} onChange={(v) => up({ email: v })} />
        </Field>
        <ul className="mt-4 space-y-2">
          {p.socials.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-36 shrink-0">
                <Text value={s.label} placeholder="Label" onChange={(v) => up({ socials: p.socials.map((x, j) => (j === i ? { ...x, label: v } : x)) })} />
              </div>
              <Text value={s.href} placeholder="https://…  (empty hides it)" onChange={(v) => up({ socials: p.socials.map((x, j) => (j === i ? { ...x, href: v } : x)) })} />
              <RowActions i={i} count={p.socials.length} onMove={(to) => up({ socials: move(p.socials, i, to) })} onRemove={() => up({ socials: p.socials.filter((_, j) => j !== i) })} />
            </li>
          ))}
        </ul>
        <button className={`${btnLight} mt-3`} onClick={() => up({ socials: [...p.socials, { label: "", href: "" }] })}>
          + Add link
        </button>
      </Card>
    </div>
  );
}

/* ---------- Services ---------- */

export function ServicesSection({ c, set }: Props) {
  const list = c.services;
  const up = (next: typeof list) => set({ ...c, services: next });
  return (
    <div className="space-y-4">
      {list.map((s, i) => (
        <Card key={i} title={s.title || "New service"} actions={<RowActions i={i} count={list.length} onMove={(to) => up(move(list, i, to))} onRemove={() => up(list.filter((_, j) => j !== i))} />}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <Text value={s.title} onChange={(v) => up(list.map((x, j) => (j === i ? { ...x, title: v } : x)))} />
            </Field>
            <ImageField label="Image" value={s.image} onChange={(v) => up(list.map((x, j) => (j === i ? { ...x, image: v } : x)))} />
            <Field label="Description" className="md:col-span-2">
              <Area rows={3} value={s.text} onChange={(v) => up(list.map((x, j) => (j === i ? { ...x, text: v } : x)))} />
            </Field>
          </div>
        </Card>
      ))}
      <button className={btnDark} onClick={() => up([...list, { title: "", text: "", image: "" }])}>
        + Add service
      </button>
    </div>
  );
}

/* ---------- Experience ---------- */

export function ExperienceSection({ c, set }: Props) {
  const list = c.experience;
  const up = (next: typeof list) => set({ ...c, experience: next });
  const slugs = [{ value: "", label: "(no link)" }, ...c.projects.map((p) => ({ value: p.slug, label: p.title }))];
  return (
    <div className="space-y-4">
      {list.map((e, i) => (
        <Card key={i} title={e.place || "New entry"} actions={<RowActions i={i} count={list.length} onMove={(to) => up(move(list, i, to))} onRemove={() => up(list.filter((_, j) => j !== i))} />}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company / product">
              <Text value={e.place} onChange={(v) => up(list.map((x, j) => (j === i ? { ...x, place: v } : x)))} />
            </Field>
            <Field label="Role">
              <Text value={e.role} onChange={(v) => up(list.map((x, j) => (j === i ? { ...x, role: v } : x)))} />
            </Field>
            <Field label="Period">
              <Text value={e.period} onChange={(v) => up(list.map((x, j) => (j === i ? { ...x, period: v } : x)))} />
            </Field>
            <Field label="Shows this project on hover">
              <Select value={e.slug} options={slugs} onChange={(v) => up(list.map((x, j) => (j === i ? { ...x, slug: v } : x)))} />
            </Field>
          </div>
        </Card>
      ))}
      <button className={btnDark} onClick={() => up([...list, { place: "", role: "", period: "", slug: "" }])}>
        + Add entry
      </button>
    </div>
  );
}

/* ---------- Projects ---------- */

const blankProject = (): Project => ({
  slug: "",
  title: "",
  kind: "",
  category: "Design",
  tags: [],
  summary: "",
  description: "",
  services: "",
  timeline: "",
  tools: [],
  cover: "",
  coverFit: "cover",
  gallery: [],
});

export function ProjectsSection({ c, set }: Props) {
  const list = c.projects;
  const [open, setOpen] = useState<number | null>(null);
  const up = (next: Project[]) => set({ ...c, projects: next });
  const patch = (i: number, p: Partial<Project>) => up(list.map((x, j) => (j === i ? { ...x, ...p } : x)));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-mute">The order here is the order on the site.</p>
        <button
          className={btnDark}
          onClick={() => {
            up([blankProject(), ...list]);
            setOpen(0);
          }}
        >
          + New project
        </button>
      </div>

      {list.map((p, i) => {
        const isOpen = open === i;
        return (
          <section key={i} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 p-3 md:p-4">
              <button className="flex min-w-0 flex-1 items-center gap-3 text-left" onClick={() => setOpen(isOpen ? null : i)}>
                <Thumb src={p.cover} bg={p.coverBg} className="size-14" />
                <span className="min-w-0">
                  <span className="block truncate font-display text-[15px] font-semibold tracking-tight">{p.title || "Untitled project"}</span>
                  <span className="block truncate text-[11px] text-mute">
                    {p.category} · /work/{p.slug || "…"}
                  </span>
                </span>
              </button>
              <RowActions
                i={i}
                count={list.length}
                onMove={(to) => {
                  up(move(list, i, to));
                  setOpen(null);
                }}
                onRemove={() => {
                  up(list.filter((_, j) => j !== i));
                  setOpen(null);
                }}
              />
            </div>
            {isOpen && <ProjectForm p={p} patch={(x) => patch(i, x)} />}
          </section>
        );
      })}
    </div>
  );
}

function ProjectForm({ p, patch }: { p: Project; patch: (x: Partial<Project>) => void }) {
  const [slugTouched, setSlugTouched] = useState(!!p.slug);
  const [uploading, setUploading] = useState(false);
  const hasPreview = !!p.preview;

  return (
    <div className="space-y-6 border-t border-line p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" hint='Use "Name: tagline" to split the heading in two.'>
          <Text
            value={p.title}
            onChange={(v) => patch({ title: v, ...(slugTouched ? {} : { slug: slugify(v.split(":")[0]) }) })}
          />
        </Field>
        <Field label="URL slug" hint={`Page address: /work/${p.slug || "…"}`}>
          <Text
            value={p.slug}
            onChange={(v) => {
              setSlugTouched(true);
              patch({ slug: slugify(v) });
            }}
          />
        </Field>
        <Field label="Kind" hint="e.g. Brand Identity, Mobile app">
          <Text value={p.kind} onChange={(v) => patch({ kind: v })} />
        </Field>
        <Field label="Category">
          <Select value={p.category} onChange={(v) => patch({ category: v })} options={["Development", "Design", "Branding"].map((x) => ({ value: x as Project["category"], label: x }))} />
        </Field>
        <Field label="Tags" hint="Comma separated">
          <Tags value={p.tags} onChange={(v) => patch({ tags: v })} />
        </Field>
        <Field label="Tools" hint="Comma separated">
          <Tags value={p.tools} onChange={(v) => patch({ tools: v })} />
        </Field>
        <Field label="Services">
          <Text value={p.services} onChange={(v) => patch({ services: v })} />
        </Field>
        <Field label="Timeline">
          <Text value={p.timeline} onChange={(v) => patch({ timeline: v })} />
        </Field>
        <Field label="Live link (optional)" className="md:col-span-2">
          <Text value={p.link ?? ""} placeholder="https://…" onChange={(v) => patch({ link: v || undefined })} />
        </Field>
        <Field label="Summary (shown on the card)" className="md:col-span-2">
          <Area rows={2} value={p.summary} onChange={(v) => patch({ summary: v })} />
        </Field>
        <Field label="Description (project page)" className="md:col-span-2">
          <Area rows={5} value={p.description} onChange={(v) => patch({ description: v })} />
        </Field>
      </div>

      <div className="rounded-2xl bg-paper p-4">
        <h4 className="mb-3 font-display text-[15px] font-semibold">Cover</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <ImageField label="Cover image" value={p.cover} bg={p.coverBg} onChange={(v) => patch({ cover: v })} />
          <div className="space-y-3">
            <Field label="Fit">
              <Select value={p.coverFit ?? "cover"} onChange={(v) => patch({ coverFit: v })} options={[{ value: "cover", label: "Fill the card (crop)" }, { value: "contain", label: "Fit inside (logo style)" }]} />
            </Field>
            <Field label="Background behind cover">
              <Color value={p.coverBg ?? ""} onChange={(v) => patch({ coverBg: v || undefined })} />
            </Field>
            <Toggle label="Add padding around cover (logos)" checked={!!p.coverPad} onChange={(v) => patch({ coverPad: v || undefined })} />
            <Toggle label="Poster: tall 4:5 card" checked={!!p.poster} onChange={(v) => patch({ poster: v || undefined })} />
            <Toggle label="Website screenshot: wide 16:10 card" checked={!!p.shot} onChange={(v) => patch({ shot: v || undefined })} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-paper p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-display text-[15px] font-semibold">Gallery</h4>
          <label className={`${btnDark} cursor-pointer`}>
            {uploading ? "Uploading…" : "Upload images"}
            <input
              type="file"
              hidden
              multiple
              accept="image/*,.svg"
              onChange={async (e) => {
                if (!e.target.files?.length) return;
                setUploading(true);
                const { items, errors } = await uploadFiles(e.target.files);
                setUploading(false);
                e.target.value = "";
                if (errors.length) alert(errors.join("\n"));
                patch({ gallery: [...p.gallery, ...items.map((m) => ({ src: m.url, alt: m.name.replace(/-[0-9a-f]{6}\.\w+$/, "").replace(/-/g, " ") }))] });
              }}
            />
          </label>
        </div>
        <ul className="space-y-2">
          {p.gallery.map((g, gi) => (
            <li key={gi} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-2.5 md:flex-nowrap">
              <Thumb src={g.src} bg={g.bg} className="size-16" />
              <div className="grid min-w-0 flex-1 gap-2 md:grid-cols-[1fr_1fr_auto]">
                <Text value={g.alt} placeholder="Caption / alt text" onChange={(v) => patch({ gallery: p.gallery.map((x, j) => (j === gi ? { ...x, alt: v } : x)) })} />
                <Text value={g.src} onChange={(v) => patch({ gallery: p.gallery.map((x, j) => (j === gi ? { ...x, src: v } : x)) })} />
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-xl border border-line bg-white px-2 py-2.5 text-[12px]"
                    value={g.fit ?? "cover"}
                    onChange={(e) => patch({ gallery: p.gallery.map((x, j) => (j === gi ? { ...x, fit: e.target.value as "cover" | "contain" } : x)) })}
                  >
                    <option value="cover">crop</option>
                    <option value="contain">fit</option>
                  </select>
                  <input
                    type="color"
                    title="Background"
                    className="size-9 cursor-pointer rounded-lg border border-line bg-white p-0.5"
                    value={g.bg ?? "#ffffff"}
                    onChange={(e) => patch({ gallery: p.gallery.map((x, j) => (j === gi ? { ...x, bg: e.target.value } : x)) })}
                  />
                </div>
              </div>
              <RowActions i={gi} count={p.gallery.length} onMove={(to) => patch({ gallery: move(p.gallery, gi, to) })} onRemove={() => patch({ gallery: p.gallery.filter((_, j) => j !== gi) })} />
            </li>
          ))}
        </ul>
        {!p.gallery.length && <p className="text-[12px] text-mute">No images yet. Upload some, or the project page shows only the cover.</p>}
      </div>

      <div className="rounded-2xl bg-paper p-4">
        <ImageList label='Mockups ("In use" section)' value={p.mockups ?? []} onChange={(v) => patch({ mockups: v.length ? v : undefined })} hint="Optional. Shown as an In use strip on the project page." />
      </div>

      <div className="rounded-2xl bg-paper p-4">
        <Toggle label="Hover preview on the Work grid (scrolling website capture)" checked={hasPreview} onChange={(v) => patch({ preview: v ? { url: p.link ?? "", height: 4000, image: "" } : undefined })} />
        {p.preview && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Site URL">
              <Text value={p.preview.url} onChange={(v) => patch({ preview: { ...p.preview!, url: v } })} />
            </Field>
            <Field label="Page height (px at 1440 wide)">
              <Text type="number" value={String(p.preview.height)} onChange={(v) => patch({ preview: { ...p.preview!, height: Number(v) || 0 } })} />
            </Field>
            <div className="md:col-span-2">
              <ImageField label="Full-page capture" value={p.preview.image} onChange={(v) => patch({ preview: { ...p.preview!, image: v } })} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Brands and brand PDF ---------- */

const MOCK_LABELS = ["Lead", "Business card", "Mug", "Sign", "Tee"];

const blankBrand = (): Brand => ({
  name: "",
  type: "Brand identity / ",
  challenge: "",
  approach: "",
  mark: "",
  markRatio: 3,
  primary: "#111111",
  tint: "#f1f1ef",
  colors: [{ name: "Primary", hex: "#111111" }],
});

export function BrandsSection({ c, set }: Props) {
  const list = c.brands;
  const [open, setOpen] = useState<number | null>(null);
  const up = (next: Brand[]) => set({ ...c, brands: next });
  const patch = (i: number, p: Partial<Brand>) => up(list.map((x, j) => (j === i ? { ...x, ...p } : x)));

  /** Same shape lib/content.ts builds for the built-in logo projects. */
  const addToWork = (b: Brand) => {
    const slug = `${slugify(b.name)}-logo`;
    if (c.projects.some((p) => p.slug === slug)) return alert("This brand is already in Work.");
    const [, kind = "Logo"] = b.type.split(" / ");
    const proj: Project = {
      slug,
      title: b.name,
      kind,
      category: "Branding",
      tags: ["Logo", "Identity"],
      summary: b.challenge,
      description: `${b.challenge} ${b.approach}`,
      services: "Logo design, brand identity",
      timeline: "Delivered",
      tools: ["Illustrator"],
      cover: b.mark,
      coverBg: b.tint,
      coverFit: "contain",
      coverPad: true,
      mockups: b.mockups?.length ? b.mockups : undefined,
      gallery: [
        { src: b.mark, alt: `${b.name} logo`, fit: "contain", bg: b.tint },
        ...(b.icon ? [{ src: b.icon, alt: `${b.name} icon`, fit: "contain" as const, bg: b.tint }] : []),
        ...(b.sketch ? [{ src: b.sketch, alt: `${b.name} sketch` }] : []),
      ],
    };
    set({ ...c, projects: [...c.projects, proj] });
    alert("Added to Work. Find it in Projects.");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-mute">Each brand becomes two sheets in the Brand PDF page: the identity and its mockups.</p>
        <button
          className={btnDark}
          onClick={() => {
            up([...list, blankBrand()]);
            setOpen(list.length);
          }}
        >
          + New brand
        </button>
      </div>
      {list.map((b, i) => {
        const isOpen = open === i;
        return (
          <section key={i} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 p-3 md:p-4">
              <button className="flex min-w-0 flex-1 items-center gap-3 text-left" onClick={() => setOpen(isOpen ? null : i)}>
                <Thumb src={b.mark} bg={b.tint} className="size-14" />
                <span className="truncate font-display text-[15px] font-semibold tracking-tight">{b.name || "Untitled brand"}</span>
              </button>
              <RowActions
                i={i}
                count={list.length}
                onMove={(to) => {
                  up(move(list, i, to));
                  setOpen(null);
                }}
                onRemove={() => {
                  up(list.filter((_, j) => j !== i));
                  setOpen(null);
                }}
              />
            </div>
            {isOpen && (
              <div className="space-y-5 border-t border-line p-4 md:p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name">
                    <Text value={b.name} onChange={(v) => patch(i, { name: v })} />
                  </Field>
                  <Field label="Type" hint='Format: "Brand identity / Fintech"'>
                    <Text value={b.type} onChange={(v) => patch(i, { type: v })} />
                  </Field>
                  <Field label="The brief" className="md:col-span-2">
                    <Area rows={2} value={b.challenge} onChange={(v) => patch(i, { challenge: v })} />
                  </Field>
                  <Field label="The approach" className="md:col-span-2">
                    <Area rows={4} value={b.approach} onChange={(v) => patch(i, { approach: v })} />
                  </Field>
                  <Field label="Primary colour">
                    <Color value={b.primary} onChange={(v) => patch(i, { primary: v })} />
                  </Field>
                  <Field label="Tint (sheet background)">
                    <Color value={b.tint} onChange={(v) => patch(i, { tint: v })} />
                  </Field>
                </div>

                <div className="grid gap-4 rounded-2xl bg-paper p-4 md:grid-cols-3">
                  <ImageField
                    label="Logo / mark"
                    value={b.mark}
                    bg={b.tint}
                    onChange={async (v) => {
                      patch(i, { mark: v });
                      const r = await measure(v);
                      if (r) patch(i, { mark: v, markRatio: r });
                    }}
                    hint="Transparent PNG or SVG."
                  />
                  <ImageField
                    label="Icon (optional)"
                    value={b.icon}
                    bg={b.tint}
                    onChange={async (v) => {
                      patch(i, { icon: v || undefined });
                      const r = v ? await measure(v) : null;
                      if (r) patch(i, { icon: v, iconRatio: r });
                    }}
                  />
                  <ImageField label="Sketch (optional)" value={b.sketch} onChange={(v) => patch(i, { sketch: v || undefined })} />
                </div>

                <div className="rounded-2xl bg-paper p-4">
                  <h4 className="mb-3 font-display text-[15px] font-semibold">Palette</h4>
                  <ul className="space-y-2">
                    {b.colors.map((col, ci) => (
                      <li key={ci} className="flex items-center gap-2">
                        <div className="w-40 shrink-0">
                          <Text value={col.name} placeholder="Name" onChange={(v) => patch(i, { colors: b.colors.map((x, j) => (j === ci ? { ...x, name: v } : x)) })} />
                        </div>
                        <Color value={col.hex} onChange={(v) => patch(i, { colors: b.colors.map((x, j) => (j === ci ? { ...x, hex: v } : x)) })} />
                        <RowActions i={ci} count={b.colors.length} onMove={(to) => patch(i, { colors: move(b.colors, ci, to) })} onRemove={() => patch(i, { colors: b.colors.filter((_, j) => j !== ci) })} />
                      </li>
                    ))}
                  </ul>
                  <button className={`${btnLight} mt-2`} onClick={() => patch(i, { colors: [...b.colors, { name: "", hex: "#000000" }] })}>
                    + Add colour
                  </button>
                </div>

                <div className="rounded-2xl bg-paper p-4">
                  <h4 className="mb-1 font-display text-[15px] font-semibold">Mockups</h4>
                  <p className="mb-3 text-[12px] text-mute">Five images in this order. Leave all empty to use the files named after the brand.</p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {MOCK_LABELS.map((label, mi) => (
                      <ImageField
                        key={label}
                        label={label}
                        value={b.mockups?.[mi]}
                        onChange={(v) => {
                          const next = [...(b.mockups ?? ["", "", "", "", ""])];
                          next[mi] = v;
                          patch(i, { mockups: next.some(Boolean) ? next : undefined });
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 max-w-xs">
                    <Field label="Lead mockup is">
                      <Select
                        value={b.mockupLayout ?? "phone"}
                        onChange={(v) => patch(i, { mockupLayout: v })}
                        options={[{ value: "phone", label: "A big phone / hand photo" }, { value: "app", label: "A phone home screen (small, 5 across)" }]}
                      />
                    </Field>
                  </div>
                </div>

                <button className={btnLight} onClick={() => addToWork(b)}>
                  Also add this brand to the Work grid
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function CampaignsSection({ c, set }: Props) {
  const L = c.campaigns.linkco;
  const E = c.campaigns.explorations;
  const upL = (p: Partial<typeof L>) => set({ ...c, campaigns: { ...c.campaigns, linkco: { ...L, ...p } } });
  const upE = (p: Partial<typeof E>) => set({ ...c, campaigns: { ...c.campaigns, explorations: { ...E, ...p } } });
  return (
    <div className="space-y-5">
      <Card title="Campaign sheet">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title">
            <Text value={L.title} onChange={(v) => upL({ title: v })} />
          </Field>
          <Field label="Type">
            <Text value={L.type} onChange={(v) => upL({ type: v })} />
          </Field>
          <Field label="The brief" className="md:col-span-2">
            <Area rows={2} value={L.challenge} onChange={(v) => upL({ challenge: v })} />
          </Field>
          <Field label="The approach" className="md:col-span-2">
            <Area rows={3} value={L.approach} onChange={(v) => upL({ approach: v })} />
          </Field>
          <div className="md:col-span-2">
            <ImageList label="Posters (the sheet fits two)" value={L.images} onChange={(v) => upL({ images: v })} />
          </div>
        </div>
      </Card>
      <Card title="Poster explorations">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title">
            <Text value={E.title} onChange={(v) => upE({ title: v })} />
          </Field>
          <Field label="Type">
            <Text value={E.type} onChange={(v) => upE({ type: v })} />
          </Field>
        </div>
        <div className="mt-5 space-y-5">
          {E.sets.map((s, si) => (
            <div key={si} className="rounded-2xl bg-paper p-4">
              <ImageList label={`Sheet ${si + 1} (three posters)`} value={s} onChange={(v) => upE({ sets: E.sets.map((x, j) => (j === si ? v : x)) })} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button className={btnLight} onClick={() => upE({ sets: [...E.sets, []] })}>
            + Add sheet
          </button>
          {E.sets.length > 1 && (
            <button className={btnLight} onClick={() => confirm("Remove the last sheet?") && upE({ sets: E.sets.slice(0, -1) })}>
              Remove last sheet
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
