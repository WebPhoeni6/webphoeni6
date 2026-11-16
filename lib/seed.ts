/**
 * The starting content, used until the first save from /admin.
 * After that the live content comes from the store (lib/store.ts).
 */
import { brands, campaigns } from "./brand";
import { experience, profile, projects, services } from "./content";

export const seed = { profile, projects, services, experience, brands, campaigns };

export type SiteContent = typeof seed;
