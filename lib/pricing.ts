/**
 * Service prices for clients in Nigeria, in naira. Change a number here and the Pricing section follows.
 * "from" means the price depends on the scope. "best" puts a small "Best value" tag on the item.
 */
export type PriceItem = { name: string; text: string; price: string; unit?: string; from?: boolean; best?: boolean };
export type PriceGroup = { title: string; items: PriceItem[] };

export const pricing: PriceGroup[] = [
  {
    title: "Websites",
    items: [
      { name: "One-page website", text: "One scrolling page, designed and built, put online with the first year of hosting. Good for a launch or a personal page.", price: "₦90,000" },
      { name: "Business website", text: "Up to 5 pages, a contact form, a WhatsApp button and basic SEO, put online with the first year of hosting.", price: "₦180,000" },
      { name: "Online store or custom site", text: "A shop, bookings, or anything the other two don't cover. Priced after we talk about what you need.", price: "₦450,000", from: true },
    ],
  },
  {
    title: "Branding",
    items: [
      { name: "Logo", text: "A logo with revisions, delivered in every file format you need. The price depends on how detailed it is.", price: "₦20,000 – ₦30,000" },
      { name: "Full brand identity", text: "Logo, colors, fonts, mockups and a short brand guide, so the brand looks the same everywhere.", price: "₦120,000" },
      { name: "Brand and website", text: "A full identity and a 5-page business website, made together. Cheaper than buying them one by one.", price: "₦235,000", best: true },
    ],
  },
  {
    title: "Apps",
    items: [
      { name: "Web app", text: "A working web product with accounts, a database and the screens people use. Priced by what it does.", price: "₦700,000", from: true },
      { name: "Mobile and web app", text: "The same product on Android, iOS and the web. Priced by what it does.", price: "₦1,800,000", from: true },
      { name: "App design only", text: "The screens and flows designed and ready for a developer, if you already have someone to build it.", price: "₦120,000", from: true },
    ],
  },
  {
    title: "Extras",
    items: [
      { name: "Website care plan", text: "I keep your site updated, backed up and online, and make small edits when you ask.", price: "₦12,000", unit: "a month" },
      { name: "Social media posts", text: "Designed posts in your brand colors, ready to upload.", price: "₦5,000", unit: "a post" },
      { name: "Monthly post pack", text: "A set of 12 designed posts every month.", price: "₦45,000", unit: "a month" },
      { name: "SEO setup", text: "Your site added to Google, a sitemap, and the right titles and descriptions.", price: "₦30,000" },
      { name: "Fixes and small jobs", text: "Changes to an existing site, or anything small that doesn't need a full project.", price: "₦10,000", unit: "an hour" },
    ],
  },
];

export const pricingNote = {
  negotiable: "Every price here is open to negotiation. Tell me what you need and what you have to spend, and we'll work something out.",
  scope: "Prices are in naira for clients in Nigeria. A domain name is paid separately. Working from outside Nigeria? Message me and I'll send a quote.",
};
