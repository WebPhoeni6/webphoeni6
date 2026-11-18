import type { Metadata } from "next";
import Link from "next/link";
import { cv } from "@/lib/cv";

// The CV is shared as a PDF. This page is where that PDF is made from, so it stays out of search.
// The title becomes the PDF's title, which applicant tracking systems and recruiters often show.
export const metadata: Metadata = { title: { absolute: "Samuel Emeka - Full-Stack Developer CV" }, robots: { index: false, follow: false } };

// One column and plain section names on purpose: applicant tracking systems read straight down the page.
const h = "font-display text-[9pt] font-bold uppercase tracking-normal";
const li = "pl-[1mm] text-[8.9pt] leading-[1.4] marker:text-[#ff4f1a]";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-[4.4mm]">
      <h2 className={`${h} border-b-[0.35mm] border-[#111] pb-[1.6mm]`}>{title}</h2>
      <div className="mt-[3mm]">{children}</div>
    </section>
  );
}

export default function CvPage() {
  return (
    <main className="cv-doc">
      <div className="no-print mx-auto mb-4 flex max-w-[210mm] items-center justify-between">
        <Link href="/" className="rounded-full bg-white px-3.5 py-2 text-[12px] font-medium text-[#111] shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
          &larr; Back to site
        </Link>
        <a href="/samuel-emeka-cv.pdf" download="Samuel-Emeka-Full-Stack-Developer-CV.pdf" className="rounded-full bg-[#ff4f1a] px-4 py-2.5 text-[12px] font-semibold text-[#111] transition-transform hover:scale-[1.04]">
          Download PDF
        </a>
      </div>
      <div className="cv-sheet">
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="font-display text-[24pt] font-bold leading-none tracking-[-0.02em]">{cv.name}</h1>
            <p className="mt-[2.4mm] text-[10.5pt] font-semibold text-[#e0430f]">{cv.title}</p>
          </div>
        </header>
        <p className="mt-[4mm] flex flex-wrap gap-x-[4mm] gap-y-[1mm] border-y-[0.35mm] border-[#111] py-[2mm] text-[8.6pt]">
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

        <Section title="Professional Summary">
          <p className="text-[9.4pt] leading-[1.5]">{cv.summary}</p>
        </Section>

        <Section title="Work Experience">
          <div className="space-y-[3.2mm]">
            {cv.experience.map((e) => (
              <article key={e.org} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[10pt] leading-tight">
                    <span className="font-bold">{e.role}</span>
                    <span className="text-[#444]">{`, ${e.org}`}</span>
                  </h3>
                  <span className="shrink-0 text-[8.6pt] font-medium text-[#444]">{e.period}</span>
                </div>
                <ul className="mt-[1.6mm] list-disc space-y-[0.6mm] pl-[4mm]">
                  {e.bullets.map((b) => (
                    <li key={b} className={li}>
                      {b}
                    </li>
                  ))}
                </ul>
                {"stack" in e && e.stack && (
                  <p className="mt-[1.2mm] pl-[5mm] text-[8.2pt] text-[#555]">
                    <span className="font-semibold">Tech: </span>
                    {e.stack}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <ul className="list-disc space-y-[1.2mm] pl-[4mm]">
            {cv.projects.map((p) => (
              <li key={p.name} className={li}>
                <span className="font-bold">{p.name}</span>
                {`: ${p.text} `}
                <span className="font-medium text-[#e0430f]">{p.link}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <ul className="space-y-[1.3mm]">
            {cv.skills.map((s) => (
              <li key={s.label} className="text-[9pt] leading-[1.45]">
                <span className="font-bold">{s.label}: </span>
                {s.text}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Key Achievements">
          <ul className="list-disc space-y-[0.6mm] pl-[4mm]">
            {cv.achievements.map((a) => (
              <li key={a} className={li}>
                {a}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          {cv.education.map((e) => (
            <p key={e.what} className="text-[9pt] leading-[1.45]">
              <span className="font-bold">{e.what}</span>
              {`, ${e.where}, ${e.period}`}
            </p>
          ))}
        </Section>

        <Section title="Certifications">
          <ul className="list-disc space-y-[0.6mm] pl-[4mm]">
            {cv.certifications.map((c) => (
              <li key={c} className={li}>
                {c}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Languages">
          <p className="text-[9pt] leading-[1.45]">{cv.languages}</p>
        </Section>
      </div>
    </main>
  );
}
