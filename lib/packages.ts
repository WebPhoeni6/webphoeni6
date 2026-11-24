/**
 * Brand packages. Prices are placeholders until they are decided: change PRICE here and every card follows,
 * or give a tier its own `price`.
 */
export const PRICE = "[PRICE]";

export type Tier = {
  id: "ember" | "flame" | "phoenix";
  name: string;
  forWho: string;
  /** Shown above the list, for the tiers that build on the one before. */
  includes?: string;
  features: string[];
  popular?: boolean;
  price?: string;
};

export const tiers: Tier[] = [
  {
    id: "ember",
    name: "Ember",
    forWho: "we just registered",
    features: [
      "Logo suite (primary, secondary, icon)",
      "Light/dark/mono versions",
      "Color palette",
      "Typography pairing",
      "One-page logo guide",
      "Favicon and app icon",
      "Social profile kit",
      "Business card",
      "Email signature",
      "3 mockups",
      "SVG/PNG/PDF files",
    ],
  },
  {
    id: "flame",
    name: "Flame",
    forWho: "we're getting customers",
    includes: "Everything in Ember, plus:",
    popular: true,
    features: [
      "Brand guidelines (15–20 pages)",
      "Brand story and voice guide",
      "Patterns and graphic elements",
      "Custom icon set",
      "Stationery suite",
      "Editable social templates",
      "Flyer and poster template",
      "Pitch deck template",
      "Merch designs",
      "10+ mockups",
    ],
  },
  {
    id: "phoenix",
    name: "Phoenix",
    forWho: "we're going big",
    includes: "Everything in Flame, plus:",
    features: [
      "Brand strategy and audience personas",
      "Tagline development",
      "Packaging",
      "Signage",
      "Vehicle wrap",
      "Animated logo",
      "UI style kit",
      "Landing page design",
      "Launch kit",
      "20+ mockups",
      "Print-ready brand book",
      "30 days of support",
    ],
  },
];

export const addOn = {
  title: "Website build",
  line: "I don't just design it, I ship it.",
  text: "A live site built from your brand.",
};
