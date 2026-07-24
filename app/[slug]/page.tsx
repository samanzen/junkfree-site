import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allFlatSlugs, resolveFlat } from "@/lib/routes";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import { meta } from "@/lib/seo";
import { publishedContent } from "@/lib/content";
import LocalServiceTemplate, { nearbyCities } from "@/components/LocalServiceTemplate";

export const dynamicParams = false;
export function generateStaticParams() {
  return allFlatSlugs().map((slug) => ({ slug }));
}

const svc = (s: string) => SERVICES.find((x) => x.slug === s)!;
const cty = (s: string) => CITIES.find((x) => x.slug === s)!;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = resolveFlat(slug);
  if (!r) return {};
  if (r.kind === "service") {
    const s = svc(r.serviceSlug);
    return meta(`${s.name} in Greater Vancouver`, s.blurb, `/${slug}`);
  }
  if (r.kind === "service_city") {
    const s = svc(r.serviceSlug), c = cty(r.citySlug);
    return meta(`${s.name} in ${c.name}`, `${s.name} in ${c.name}, BC. ${s.blurb} Same/next-day service.`, `/${slug}`);
  }
  const c = cty(r.citySlug);
  return meta(`Junk Removal in ${c.name}`, `Fast, eco-friendly junk removal in ${c.name}, BC. Residential & commercial. Same/next-day service.`, `/${slug}`);
}

export default async function FlatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = resolveFlat(slug);
  if (!r) notFound();
  const published = await publishedContent(slug);

  if (r.kind === "service") {
    const s = svc(r.serviceSlug);
    return (
      <LocalServiceTemplate
        h1={`${s.name} in Greater Vancouver`} intro={s.blurb} service={s.name} items={s.items}
        crumb={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: `/${s.slug}`, label: s.name }]}
        relatedCities={CITIES.slice(0, 8).map((c) => ({ ...c, href: `/${s.slug}-${c.slug}` }))}
        publishedBody={published?.body}
      />
    );
  }
  if (r.kind === "service_city") {
    const s = svc(r.serviceSlug), c = cty(r.citySlug);
    return (
      <LocalServiceTemplate
        h1={`${s.name} in ${c.name}`} intro={`${s.blurb} Serving ${c.name} and the surrounding Lower Mainland.`}
        service={s.name} city={c.name} items={s.items}
        crumb={[{ href: "/", label: "Home" }, { href: `/${s.slug}`, label: s.name }, { href: `/${s.slug}-${c.slug}`, label: c.name }]}
        relatedCities={nearbyCities(c.slug).map((x) => ({ ...x, href: `/${s.slug}-${x.slug}` }))}
        publishedBody={published?.body}
      />
    );
  }
  const c = cty(r.citySlug);
  return (
    <LocalServiceTemplate
      h1={`Junk Removal in ${c.name}`}
      intro={`Fast, friendly, eco-friendly junk removal for ${c.name} homes and businesses. We do the lifting — you just point.`}
      service="Junk Removal" city={c.name}
      items={["Furniture & mattresses", "Appliances & electronics", "Renovation & yard debris", "Full home, garage & office cleanouts"]}
      crumb={[{ href: "/", label: "Home" }, { href: "/cities", label: "Areas" }, { href: `/junk-removal-${c.slug}`, label: c.name }]}
      relatedCities={nearbyCities(c.slug).map((x) => ({ ...x, href: `/junk-removal-${x.slug}` }))}
      publishedBody={published?.body}
    />
  );
}
