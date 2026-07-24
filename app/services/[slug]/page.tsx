import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_DETAILS } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import { meta } from "@/lib/seo";
import { publishedContent } from "@/lib/content";
import LocalServiceTemplate from "@/components/LocalServiceTemplate";

export const dynamicParams = false;
export const generateStaticParams = () => SERVICE_DETAILS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICE_DETAILS.find((x) => x.slug === slug);
  if (!s) return {};
  return meta(s.name, s.blurb, `/services/${s.slug}`);
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICE_DETAILS.find((x) => x.slug === slug);
  if (!s) notFound();
  const published = await publishedContent(`services/${slug}`);
  return (
    <LocalServiceTemplate
      h1={s.name} intro={s.blurb} service={s.name} items={s.items}
      crumb={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: `/services/${s.slug}`, label: s.name }]}
      relatedCities={CITIES.slice(0, 8).map((c) => ({ ...c, href: `/junk-removal-${c.slug}` }))}
      publishedBody={published?.body}
    />
  );
}
