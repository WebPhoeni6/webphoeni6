import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { mockupSet, type BrandWork } from "@/lib/brand";
import { getContent } from "@/lib/store";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  return {
    title: `${profile.firstName} ${profile.lastName} | Brand and visual design`,
    description: "Selected brand identity and poster work.",
  };
}

const u = (n: number) => `calc(var(--u) * ${n})`;
/** The PDF uses JPEG copies: Chrome embeds JPEG as-is but inflates WebP and PNG photos. */
const pdf = (src: string) =>
  !src.startsWith("/work/")
    ? src // uploaded from the dashboard: no JPEG twin exists
    : src.startsWith("/work/mockups/")
    ? src.replace("/work/mockups/", "/work/pdf/mockups/").replace(".webp", ".jpg")
    : src.endsWith(".webp")
      ? src.replace("/work/", "/work/pdf/").replace(".webp", ".jpg")
      : src;
const display = { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.04em" } as const;
const WHITE = "brightness(0) invert(1)";

function Sheet({ children, bg = "#fff", dark = false }: { children: React.ReactNode; bg?: string; dark?: boolean }) {
  return (
    <div className="sheet-wrap">
      <section className="sheet" style={{ background: bg, color: dark ? "#fff" : "#111" }}>
        {children}
      </section>
    </div>
  );
}

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontSize: u(1.05), letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5, fontWeight: 600, ...style }}>
      {children}
    </p>
  );
}

function Header({ n, left, who }: { n: string; left: string; who: string }) {
  return (
    <div style={{ position: "absolute", left: u(5), right: u(5), top: u(4), display: "flex", justifyContent: "space-between" }}>
      <Label>
        {n} / {left}
      </Label>
      <Label>
        {who}
      </Label>
    </div>
  );
}

function Copy({ name, type, challenge, approach, accent }: { name: string; type: string; challenge: string; approach: string; accent?: string }) {
  return (
    <div style={{ position: "absolute", left: u(5), top: u(10), width: u(34), bottom: u(5), display: "flex", flexDirection: "column" }}>
      <h2 style={{ ...display, fontSize: u(name.length > 9 ? 5.6 : 7.2), lineHeight: 0.95 }}>{name}</h2>
      <p style={{ fontSize: u(1.35), marginTop: u(1.2), opacity: 0.55 }}>{type}</p>
      <Label style={{ marginTop: u(6) }}>The brief</Label>
      <p style={{ fontSize: u(1.5), lineHeight: 1.55, marginTop: u(1) }}>{challenge}</p>
      <Label style={{ marginTop: u(3.2) }}>The approach</Label>
      <p style={{ fontSize: u(1.5), lineHeight: 1.55, marginTop: u(1) }}>{approach}</p>
      {accent && <div style={{ marginTop: "auto", width: u(4), height: u(0.5), background: accent }} />}
    </div>
  );
}

/** Size limits that keep any mark proportional: wide wordmarks vs tall/square ones. */
function fit(ratio: number, scale = 1): React.CSSProperties {
  const wide = ratio > 2;
  return {
    width: "auto",
    height: "auto",
    maxWidth: `${(wide ? 64 : ratio > 1.2 ? 44 : 30) * scale}%`,
    maxHeight: `${(wide ? 46 : 64) * scale}%`,
    objectFit: "contain",
  };
}

function BrandSheet({ b, n, who }: { b: BrandWork; n: string; who: string }) {
  const tile: React.CSSProperties = { borderRadius: u(1.6), overflow: "hidden", position: "relative" };
  const icon = b.icon ?? b.mark;
  const iconRatio = b.icon ? (b.iconRatio ?? 1) : b.markRatio;
  return (
    <Sheet>
      <Header who={who} n={n} left="Brand identity" />
      <Copy name={b.name} type={b.type} challenge={b.challenge} approach={b.approach} accent={b.primary} />

      <div style={{ position: "absolute", left: u(43), right: u(5), top: u(10), bottom: u(5), display: "grid", gridTemplateRows: "1.7fr 1fr", gap: u(2) }}>
        {/* Primary mark on its tint (with the hand sketch beside it when there is one) */}
        <div style={{ display: "grid", gridTemplateColumns: b.sketch ? "1fr 1.3fr" : b.characters ? "1.1fr 1fr" : "1fr", gap: u(2) }}>
          {b.sketch && (
            <div style={{ ...tile, background: "#f4f4f2" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.sketch} alt={`${b.name} sketch`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          <div style={{ ...tile, background: b.tint, display: "grid", placeItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.mark} alt={`${b.name} logo`} style={fit(b.markRatio, b.sketch ? 1.25 : 1)} />
          </div>
          {b.characters && (
            <div style={{ ...tile, background: b.characters.bg, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: `0 ${u(1)}` }}>
              {[b.characters.line, b.characters.color].map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="Pendu character" style={{ width: "100%", height: "auto", maxHeight: "88%", objectFit: "contain" }} />
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: u(2) }}>
          {/* Palette */}
          <div style={{ ...tile, border: "1px solid #e6e6e6", display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
            {b.colors.map((c) => (
              <div key={c.hex} style={{ background: c.hex, color: parseInt(c.hex.slice(1), 16) > 0x888888 ? "#111" : "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${u(1.4)}`, fontSize: u(1.1) }}>
                <span style={{ fontWeight: 600 }}>{c.name}</span>
                <span style={{ opacity: 0.8, fontFamily: "ui-monospace, monospace" }}>{c.hex}</span>
              </div>
            ))}
          </div>

          {/* Reversed on the primary color */}
          <div style={{ ...tile, background: b.primary, display: "grid", placeItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.mark} alt="" style={{ ...fit(b.markRatio, 1.1), filter: WHITE }} />
          </div>

          {/* App icon */}
          <div style={{ ...tile, background: "#f4f4f2", display: "grid", placeItems: "center" }}>
            <div style={{ width: u(13), height: u(13), borderRadius: u(3), background: b.primary, display: "grid", placeItems: "center", boxShadow: "0 12px 24px -10px rgba(0,0,0,.35)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt="" style={{ width: "auto", height: "auto", maxWidth: "62%", maxHeight: iconRatio < 1 ? "64%" : "62%", objectFit: "contain", filter: WHITE }} />
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

function MockupSheet({ b, n, who }: { b: BrandWork; n: string; who: string }) {
  const m = b.mockups?.length ? b.mockups : mockupSet(b.name); // lead, card, mug, sign, tee
  const app = b.mockupLayout ? b.mockupLayout === "app" : m[0].includes("-app"); // small source files: show at a modest size so they stay sharp
  const img: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", borderRadius: u(1.6), display: "block" };
  return (
    <Sheet bg="#f4f4f2">
      <Header who={who} n={n} left={`${b.name} in use`} />
      <div
        style={{
          position: "absolute",
          left: u(5),
          right: u(5),
          top: app ? "50%" : u(10),
          transform: app ? "translateY(-55%)" : undefined,
          display: "grid",
          gridTemplateColumns: app ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
          gridAutoRows: "auto",
          gap: u(2),
        }}
      >
        {m.map((src, i) => (
          <div key={src} style={{ aspectRatio: "1 / 1", gridColumn: i === 0 && !app ? "1 / 3" : undefined, gridRow: i === 0 && !app ? "1 / 3" : undefined }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pdf(src)} alt={`${b.name} mockup`} style={img} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: u(5), right: u(5), bottom: u(4.5), display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <h2 style={{ ...display, fontSize: u(4.6), lineHeight: 1 }}>{b.name}</h2>
        <p style={{ fontSize: u(1.3), opacity: 0.55 }}>Phone, business card, mug, sign and tee</p>
      </div>
    </Sheet>
  );
}

export default async function BrandPortfolio() {
  const { profile, brands, campaigns } = await getContent();
  const who = `${profile.firstName} ${profile.lastName}`;
  const L = campaigns.linkco;
  const E = campaigns.explorations;
  const total = brands.length;
  const nn = (i: number) => String(i).padStart(2, "0");

  return (
    <main className="brand-doc">
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1123, margin: "0 auto", padding: "20px 16px" }}>
        <Link href="/" className="rounded-full bg-white px-3.5 py-2 text-[12px] font-medium shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
          &larr; Back to site
        </Link>
        <a href="/samuel-emeka-brand-portfolio.pdf" download className="rounded-full bg-ink px-4 py-2.5 text-[12px] font-medium text-white">
          Download PDF
        </a>
      </div>

      {/* Cover */}
      <Sheet bg="#111" dark>
        <div style={{ position: "absolute", left: u(6), top: u(6) }}>
          <Label>Portfolio / 2026</Label>
        </div>
        <div style={{ position: "absolute", left: u(6), bottom: u(6), width: u(52) }}>
          <h1 style={{ ...display, fontSize: u(10.5), lineHeight: 0.9, letterSpacing: "-0.045em" }}>
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <p style={{ fontSize: u(2.2), marginTop: u(2.4), opacity: 0.8 }}>Brand and visual designer</p>
          <p style={{ fontSize: u(1.3), marginTop: u(1), opacity: 0.45 }}>Selected brand identities, a mascot, a campaign and posters</p>
        </div>
        <div style={{ position: "absolute", right: u(6), top: u(6), bottom: u(6), width: u(46), display: "grid", gridTemplateColumns: "1fr 1fr", gap: u(1.6), alignContent: "center" }}>
          {[["/work/for-the-record.webp", 0], ["/work/liquid-gold.webp", 6], ["/work/polar.webp", 0], ["/work/tempted.webp", 6]].map(([src, off], i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={pdf(src as string)} alt="" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: u(1), transform: i % 2 === 1 ? `translateY(${u(off as number)})` : undefined }} />
          ))}
        </div>
      </Sheet>

      {brands.map((b, i) => (
        <Fragment key={b.name}>
          <BrandSheet who={who} b={b} n={nn(i + 1)} />
          <MockupSheet who={who} b={b} n={nn(i + 1)} />
        </Fragment>
      ))}

      {/* Campaign */}
      <Sheet>
        <Header who={who} n={nn(total + 1)} left="Campaign" />
        <Copy name={L.title} type={L.type} challenge={L.challenge} approach={L.approach} accent="#F3B933" />
        <div style={{ position: "absolute", left: u(43), right: u(5), top: u(10), bottom: u(5), display: "grid", gridTemplateColumns: "1fr 1fr", gap: u(2), alignContent: "center" }}>
          {L.images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={pdf(src)} alt="Linkco poster" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: u(1.6) }} />
          ))}
        </div>
      </Sheet>

      {/* Explorations */}
      {E.sets.map((set, k) => (
        <Sheet key={k} bg={k === 0 ? "#f4f4f2" : "#fff"}>
          <Header who={who} n={nn(total + 2 + k)} left={`Explorations ${k === 0 ? "I" : "II"}`} />
          <div style={{ position: "absolute", left: u(5), top: u(9), right: u(5) }}>
            <h2 style={{ ...display, fontSize: u(5.6), lineHeight: 1 }}>{E.title}</h2>
            <p style={{ fontSize: u(1.35), marginTop: u(0.8), opacity: 0.55 }}>{E.type}</p>
          </div>
          <div style={{ position: "absolute", left: u(5), right: u(5), bottom: u(5), top: u(20), display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: u(2), alignContent: "end" }}>
            {set.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={pdf(src)} alt="Poster" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: u(1.4) }} />
            ))}
          </div>
        </Sheet>
      ))}

      {/* Close */}
      <Sheet bg="#111" dark>
        <div style={{ position: "absolute", inset: u(6), display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <h2 style={{ ...display, fontSize: u(9), lineHeight: 0.92, letterSpacing: "-0.045em" }}>
            Got a brand
            <br />
            to build?
          </h2>
          <div style={{ display: "flex", gap: u(3), marginTop: u(3), fontSize: u(1.6), opacity: 0.8 }}>
            <span>
              {profile.firstName} {profile.lastName}
            </span>
            {profile.email && <span>{profile.email}</span>}
            {profile.socials.filter((s) => s.href).map((s) => (
              <span key={s.label}>{s.href.replace(/^https?:\/\//, "")}</span>
            ))}
          </div>
        </div>
      </Sheet>
    </main>
  );
}
