/** Prints structured data for search engines. `json` must come from graph() in lib/seo. */
export default function JsonLd({ json }: { json: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
