/**
 * Brand packages. `price` is naira, shown only to visitors in Nigeria; `uk` is pounds, shown only to visitors in the UK
 * (see TierPrice). Everyone else is asked to message for a quote.
 * `was` is the price before the discount. `custom` tiers have no listed price: the visitor contacts me.
 */
export type Tier = {
  id: "ember" | "flame" | "phoenix";
  name: string;
  forWho: string;
  /** Shown above the list, for the tiers that build on the one before. */
  includes?: string;
  features: string[];
  popular?: boolean;
  /** Naira. */
  price?: number;
  /** Pounds, set from what UK freelance designers typically charge for the same scope. */
  uk?: number;
  /** Naira, the full price before the discount. Shown crossed out with a saving tag. */
  was?: number;
  /** No listed price: the card says so and the button asks the visitor to get in touch. */
  custom?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "ember",
    name: "Ember",
    forWho: "we just registered",
    price: 120000,
    uk: 1500,
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
    price: 150000,
    uk: 3500,
    was: 180000,
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
    custom: true,
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
