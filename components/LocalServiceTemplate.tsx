import Link from "next/link";
import CtaBand from "./CtaBand";
import { Json, serviceLd } from "@/lib/seo";
import { CITIES } from "@/lib/data/cities";

type Props = {
  h1: string;
  intro: string;
  service: string;
  city?: string;
  items: string[];
  relatedCities?: { slug: string; name: string; href: string }[];
  crumb: { href: string; label: string }[];
  publishedBody?: string | null;
};

export default function LocalServiceTemplate(p: Props) {
  return (
    <>
      <Json data={serviceLd(p.service, p.city)} />
      <section className="hero">
        <div className="wrap">
          <div className="breadcrumb">
            {p.crumb.map((c, i) => (
              <span key={i}>
                {i > 0 && " / "}
                <Link href={c.href}>{c.label}</Link>
              </span>
            ))}
          </div>
          <span className="eyebrow">{p.city ? `${p.city} · Greater Vancouver` : "Greater Vancouver"}</span>
          <h1>{p.h1}</h1>
          <p className="lead">{p.intro}</p>
          <div className="cta">
            <Link href="/contact" className="btn">Get a free quote →</Link>
            <Link href="/what-we-remove" className="btn ghost">See what we take</Link>
          </div>
          <div className="trust">
            <span><i className="dot" /> Same / next-day service</span>
            <span><i className="dot" /> We do all the lifting</span>
            <span><i className="dot" /> Eco-friendly disposal</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap grid g2" style={{ alignItems: "start", gap: 40 }}>
          <div className="article">
            {p.publishedBody ? (
              <div dangerouslySetInnerHTML={{ __html: p.publishedBody }} />
            ) : (
              <>
                <h2>What we handle{p.city ? ` in ${p.city}` : ""}</h2>
                <p>
                  Junk Free makes {p.service.toLowerCase()} simple{p.city ? ` for ${p.city} homes and businesses` : ""}.
                  Book a slot, point at what needs to go, and our crew loads it, sweeps up, and hauls it away — sorting
                  for donation and recycling wherever we can.
                </p>
                <ul className="checklist">
                  {p.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <h2>How it works</h2>
                <p>
                  Tell us what you have and where. We give you an upfront quote — no surprises — then arrive on time,
                  do the heavy work, and leave the space clean. Most jobs are booked same or next day.
                </p>
              </>
            )}
          </div>
          <aside>
            <div className="card">
              <h3>Fast, upfront quote</h3>
              <p style={{ marginBottom: 14 }}>No-obligation pricing before we start. Residential and commercial.</p>
              <Link href="/contact" className="btn" style={{ width: "100%", justifyContent: "center" }}>Get a free quote</Link>
            </div>
            {p.relatedCities && p.relatedCities.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h3 style={{ fontSize: 15 }}>Also serving nearby</h3>
                <div className="chips" style={{ marginTop: 10 }}>
                  {p.relatedCities.map((c) => (
                    <Link key={c.slug} href={c.href} className="chip">{c.name}</Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CtaBand area={p.city} />
    </>
  );
}

export const nearbyCities = (exclude?: string) =>
  CITIES.filter((c) => c.slug !== exclude).slice(0, 8);
