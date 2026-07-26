import type { Metadata } from "next";

export const SITE = {
  name: "JUNK FREE",
  url: "https://www.junkfree.ca",
  // Single source of truth for contact info — header, footer, contact page,
  // and schema all read from here. Override per-deploy via env if needed.
  phone: process.env.NEXT_PUBLIC_PHONE || "+16045002003",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(604) 500-2003",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@junkfree.ca",
  region: "Greater Vancouver",
  theme: "#228B5A",
};

export function meta(title: string, description: string, path = "/"): Metadata {
  const url = SITE.url + path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, locale: "en_CA", type: "website" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

// LocalBusiness schema for the whole site.
export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    areaServed: SITE.region,
    address: { "@type": "PostalAddress", addressRegion: "BC", addressCountry: "CA" },
  };
}

// Service schema for a service (optionally in a city).
export function serviceLd(service: string, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service,
    provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url },
    areaServed: city || SITE.region,
  };
}

export function Json({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
