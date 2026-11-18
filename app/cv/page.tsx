import type { Metadata } from "next";
import LogoMark from "@/components/LogoMark";
import { cv } from "@/lib/cv";

// The CV is shared as a PDF. This page is where that PDF is made from, so it stays out of search.
export const metadata: Metadata = { title: "CV", robots: { index: false, follow: false } };

const h = "font-display text-[8.5pt] font-bold uppercase tracking-[0.16em]";

function Section({ title, n, children }: { title: string; n: string; children: React.ReactNode }) {
  return (
    <section className="mt-[6mm]">
      <div className="flex items-center gap-3 border-b border-[#111] pb-[1.6mm]">
        <span className="font-display text-[7pt] font-semibold text-[#ff4f1a]">{n}</span>
        <h2 className={h}>{title}</h2>
      </div>
      <div className="mt-[3mm]">{children}</div>
    </section>
  );
}

export default function CvPage() {
  return (
    <main className="cv-doc">
      <div className="cv-sheet">
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="font-display text-[25pt] font-bold leading-none tracking-[-0.03em]">{cv.name}</h1>
            <p className="mt-[2.4mm] text-[10.5pt] font-semibold text-[#e0430f]">{cv.title}</p>
          </div>
          <LogoMark className="size-[15mm] shrink-0 text-[#111]" />
        </header>
        <p className="mt-[4mm] flex flex-wrap gap-x-[4mm] gap-y-[1mm] border-y border-[#111] py-[2mm] text-[8.6pt]">
          {cv.contact.map((c) =>
            c.href ? (
              <a key={c.label} href={c.href} className="font-medium">
                {c.label}
              </a>
            ) : (
              <span key={c.label}>{c.label}</span>
            ),
          )}
        </p>

        <Section n="01" title="Summary">
          <p className="text-[9.4pt] leading-[1.5]">{cv.summary}</p>
        </Section>

        <Section n="02" title="Experience">
          <div className="space-y-[4.2mm]">
            {cv.experience.map((e) => (
              <article key={e.org} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[10pt] leading-tight">
                    <span className="font-display font-bold tracking-[-0.01em]">{e.role}</span>
                    <span className="text-[#555]"> · {e.org}</span>
                  </h3>
                  <span className="shrink-0 text-[8.4pt] font-medium text-[#555]">{e.period}</span>
                </div>
                <ul className="mt-[1.4mm] space-y-[0.9mm]">
                  {e.bullets.map((b) => (
                    <li key={b} className="relative pl-[3.6mm] text-[9pt] leading-[1.42]">
                      <span className="absolute left-0 top-[0.62em] size-[1.1mm] rounded-full bg-[#ff4f1a]" />
                      {b}
                    </li>
                  ))}
                </ul>
                {"stack" in e && e.stack && <p className="mt-[1.2mm] pl-[3.6mm] text-[8pt] font-medium text-[#777]">{e.stack}</p>}
              </article>
            ))}
          </div>
        </Section>

        <Section n="03" title="Selected projects">
          <ul className="grid grid-cols-2 gap-x-[6mm] gap-y-[2.6mm]">
            {cv.projects.map((p) => (
              <li key={p.name} className="break-inside-avoid">
                <p className="text-[9.2pt] font-bold">{p.name}</p>
                <p className="text-[8.6pt] leading-[1.4]">{p.text}</p>
                <p className="text-[7.8pt] font-medium text-[#e0430f]">{p.link}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section n="04" title="Skills">
          <dl className="space-y-[1.4mm]">
            {cv.skills.map((s) => (
              <div key={s.label} className="grid grid-cols-[22mm_1fr] text-[8.8pt] leading-[1.42]">
                <dt className="font-bold">{s.label}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section n="05" title="Key achievements">
          <ul className="space-y-[0.9mm]">
            {cv.achievements.map((a) => (
              <li key={a} className="relative pl-[3.6mm] text-[9pt] leading-[1.42]">
                <span className="absolute left-0 top-[0.62em] size-[1.1mm] rounded-full bg-[#ff4f1a]" />
                {a}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-[6mm] grid grid-cols-3 gap-[7mm] break-inside-avoid">
          <section>
            <h2 className={`${h} border-b border-[#111] pb-[1.6mm]`}>Education</h2>
            {cv.education.map((e) => (
              <div key={e.what} className="mt-[2.4mm] text-[8.8pt] leading-[1.42]">
                <p className="font-bold">{e.what}</p>
                <p>{e.where}</p>
                <p className="text-[#555]">{e.period}</p>
              </div>
            ))}
          </section>
          <section>
            <h2 className={`${h} border-b border-[#111] pb-[1.6mm]`}>Certifications</h2>
            <ul className="mt-[2.4mm] space-y-[1mm] text-[8.6pt] leading-[1.38]">
              {cv.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className={`${h} border-b border-[#111] pb-[1.6mm]`}>Languages</h2>
            <ul className="mt-[2.4mm] space-y-[1mm] text-[8.8pt]">
              {cv.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
