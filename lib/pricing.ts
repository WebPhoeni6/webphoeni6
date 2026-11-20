/**
 * Service prices, by region. Change a number here and the Pricing section follows.
 *
 * Every service has one price per region (Nigeria in naira, the UK in pounds, the US in dollars):
 *   min / max   the price, or the range. Leave max out for one fixed price.
 *   from        true when the final price depends on the scope ("from ₦700,000").
 * A service with a `unit` ("a month", "a post", "an hour") is listed in the visitor's package but is not
 * added into the one-off total. `best` puts the "Best value" tag on the card.
 */
export type RegionId = "ng" | "uk" | "us";
export type Price = { min: number; max?: number; from?: boolean };
export type PriceItem = { id: string; name: string; text: string; unit?: string; best?: boolean };
export type PriceGroup = { id: string; title: string; blurb: string; items: PriceItem[] };
export type Region = { id: RegionId; short: string; name: string; symbol: string; note: string; prices: Record<string, Price> };

export const pricing: PriceGroup[] = [
  {
    id: "websites",
    title: "Websites",
    blurb: "Designed, built and put online for you.",
    items: [
      { id: "one-page", name: "One-page website", text: "One scrolling page, designed and built, put online with the first year of hosting. Good for a launch or a personal page." },
      { id: "business-site", name: "Business website", text: "Up to 5 pages, a contact form, a WhatsApp button and basic SEO, put online with the first year of hosting." },
      { id: "store", name: "Online store or custom site", text: "A shop, bookings, or anything the other two don't cover. The final price is set after we talk about what you need." },
    ],
  },
  {
    id: "branding",
    title: "Branding",
    blurb: "A look people remember, on everything you put out.",
    items: [
      { id: "logo", name: "Logo", text: "A logo with revisions, delivered in every file format you need. The price depends on how detailed it is." },
      { id: "brand-identity", name: "Full brand identity", text: "Logo, colors, fonts, mockups and a short brand guide, so the brand looks the same everywhere." },
      { id: "brand-site", name: "Brand and website", text: "A full identity and a 5-page business website, made together. Cheaper than buying them one by one.", best: true },
    ],
  },
  {
    id: "apps",
    title: "Apps",
    blurb: "Web and mobile products, from the screens to the servers.",
    items: [
      { id: "web-app", name: "Web app", text: "A working web product with accounts, a database and the screens people use. Priced by what it does." },
      { id: "mobile-app", name: "Mobile and web app", text: "The same product on Android, iOS and the web. Priced by what it does." },
      { id: "app-design", name: "App design only", text: "The screens and flows designed and ready for a developer, if you already have someone to build it." },
    ],
  },
  {
    id: "extras",
    title: "Extras",
    blurb: "Keep things running, or add a little more.",
    items: [
      { id: "care", name: "Website care plan", text: "I keep your site updated, backed up and online, and make small edits when you ask.", unit: "a month" },
      { id: "post", name: "Social media post", text: "A designed post in your brand colors, ready to upload.", unit: "a post" },
      { id: "post-pack", name: "Monthly post pack", text: "A set of 12 designed posts every month.", unit: "a month" },
      { id: "seo", name: "SEO setup", text: "Your site added to Google, a sitemap, and the right titles and descriptions." },
      { id: "fixes", name: "Fixes and small jobs", text: "Changes to an existing site, or anything small that doesn't need a full project.", unit: "an hour" },
    ],
  },
];

export const regions: Region[] = [
  {
    id: "ng",
    short: "NG",
    name: "Nigeria",
    symbol: "₦",
    note: "Prices are in naira for clients in Nigeria. A domain name is paid separately.",
    prices: {
      "one-page": { min: 90000 },
      "business-site": { min: 180000 },
      store: { min: 250000, max: 300000 },
      logo: { min: 20000, max: 30000 },
      "brand-identity": { min: 120000 },
      "brand-site": { min: 235000 },
      "web-app": { min: 700000, from: true },
      "mobile-app": { min: 1800000, from: true },
      "app-design": { min: 120000, from: true },
      care: { min: 12000 },
      post: { min: 5000 },
      "post-pack": { min: 45000 },
      seo: { min: 30000 },
      fixes: { min: 10000 },
    },
  },
  {
    id: "uk",
    short: "UK",
    name: "United Kingdom",
    symbol: "£",
    note: "Prices are in pounds for clients in the UK. A domain name is paid separately.",
    prices: {
      "one-page": { min: 360 },
      "business-site": { min: 720 },
      store: { min: 1200, max: 1600 },
      logo: { min: 120, max: 240 },
      "brand-identity": { min: 560 },
      "brand-site": { min: 1040 },
      "web-app": { min: 3200, from: true },
      "mobile-app": { min: 7200, from: true },
      "app-design": { min: 960, from: true },
      care: { min: 50 },
      post: { min: 20 },
      "post-pack": { min: 200 },
      seo: { min: 200 },
      fixes: { min: 25 },
    },
  },
  {
    id: "us",
    short: "US",
    name: "United States",
    symbol: "$",
    note: "Prices are in US dollars, for clients in the US and anywhere else outside Nigeria and the UK. A domain name is paid separately.",
    prices: {
      "one-page": { min: 450 },
      "business-site": { min: 900 },
      store: { min: 1500, max: 2000 },
      logo: { min: 150, max: 300 },
      "brand-identity": { min: 700 },
      "brand-site": { min: 1300 },
      "web-app": { min: 4000, from: true },
      "mobile-app": { min: 9000, from: true },
      "app-design": { min: 1200, from: true },
      care: { min: 60 },
      post: { min: 25 },
      "post-pack": { min: 250 },
      seo: { min: 250 },
      fixes: { min: 30 },
    },
  },
];

/** Buying a business website and a full brand identity separately costs more than the bundle. */
export const bundle = { id: "brand-site", replaces: ["brand-identity", "business-site"] as const };

export const pricingNote = {
  negotiable: "Every price here is open to negotiation. Tell me what you need and what you have to spend, and we'll work something out.",
};
