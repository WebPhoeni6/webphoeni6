import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const ogSize = { width: 1200, height: 630 };
export const ogType = "image/png";

/** Reads a site image (or a remote one) and returns a small JPEG data URI the share-image renderer can draw. */
async function pic(src: string, w: number, h: number, fit: "cover" | "contain") {
  try {
    const input = src.startsWith("http")
      ? Buffer.from(await (await fetch(src)).arrayBuffer())
      : await readFile(path.join(process.cwd(), "public", src));
    const out = await sharp(input)
      .resize(w, h, { fit, background: "#161616", position: "top" })
      .flatten({ background: "#161616" })
      .jpeg({ quality: 88 })
      .toBuffer();
    return `data:image/jpeg;base64,${out.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function shareImage(o: { eyebrow: string; title: string; line: string; image: string; fit?: "cover" | "contain" }) {
  const panelW = 520;
  const img = await pic(o.image, panelW * 2, ogSize.height * 2, o.fit ?? "cover");
  const size = o.title.length > 26 ? 60 : o.title.length > 16 ? 78 : 96;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#111", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px 52px", width: ogSize.width - panelW }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "#ff4f1a" }}>{o.eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>{o.title}</div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 28, color: "#cfcfcf", lineHeight: 1.3 }}>{o.line}</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8a8a8a" }}>Samuel Emeka · webphoenix.net</div>
        </div>
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} width={panelW} height={ogSize.height} alt="" style={{ width: panelW, height: ogSize.height, objectFit: "cover" }} />
        )}
      </div>
    ),
    ogSize,
  );
}
