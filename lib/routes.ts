import { CITIES } from "./data/cities";
import { SERVICES } from "./data/services";

// Every flat single-segment slug the site serves, and what kind of page it is.
// This is the single source of truth that keeps URLs identical to the old site.

export type FlatRoute =
  | { kind: "service"; serviceSlug: string }
  | { kind: "service_city"; serviceSlug: string; citySlug: string }
  | { kind: "city"; citySlug: string };

// [slug] handles ONLY service, service+city, and city-base pages.
// All custom pages (services, blog, cities, contact, faq, why-junk-free,
// what-we-remove) live in their own folders and take priority automatically.

export function allFlatSlugs(): string[] {
  const slugs: string[] = [];
  for (const s of SERVICES) slugs.push(s.slug); // 9 service landing pages
  for (const s of SERVICES) for (const c of CITIES) slugs.push(`${s.slug}-${c.slug}`); // 198
  for (const c of CITIES) slugs.push(`junk-removal-${c.slug}`); // 22 city base pages
  return slugs;
}

export function resolveFlat(slug: string): FlatRoute | null {
  if (slug.startsWith("junk-removal-")) {
    const citySlug = slug.replace("junk-removal-", "");
    if (CITIES.some((c) => c.slug === citySlug)) return { kind: "city", citySlug };
  }
  // service landing page (exact match)
  const svc = SERVICES.find((s) => s.slug === slug);
  if (svc) return { kind: "service", serviceSlug: svc.slug };
  // service + city (longest service prefix that matches, then a known city)
  for (const s of SERVICES) {
    if (slug.startsWith(s.slug + "-")) {
      const citySlug = slug.slice(s.slug.length + 1);
      if (CITIES.some((c) => c.slug === citySlug)) return { kind: "service_city", serviceSlug: s.slug, citySlug };
    }
  }
  return null;
}
