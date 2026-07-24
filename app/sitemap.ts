import type { MetadataRoute } from "next";
import { SERVICES, SERVICE_DETAILS } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import { POSTS } from "@/lib/data/blog";
import { SITE } from "@/lib/seo";

// Regenerates the EXACT 257-URL set from the original sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority = 0.8, changeFrequency: "weekly" | "monthly" = "monthly") =>
    ({ url: SITE.url + path, lastModified: new Date(), changeFrequency, priority });

  const out: MetadataRoute.Sitemap = [
    u("/", 1.0, "weekly"),
    u("/services", 0.9),
    ...SERVICE_DETAILS.map((s) => u(`/services/${s.slug}`, 0.8)),
    ...SERVICES.map((s) => u(`/${s.slug}`, 0.85)),
    u("/what-we-remove", 0.85),
    u("/faq", 0.85),
    ...SERVICES.flatMap((s) => CITIES.map((c) => u(`/${s.slug}-${c.slug}`, 0.8))),
    u("/cities", 0.9),
    ...CITIES.map((c) => u(`/junk-removal-${c.slug}`, 0.85)),
    u("/why-junk-free", 0.7),
    u("/contact", 0.9, "weekly"),
    u("/blog", 0.9, "weekly"),
    ...POSTS.map((p) => u(`/blog/${p.slug}`, 0.8)),
  ];
  return out;
}
