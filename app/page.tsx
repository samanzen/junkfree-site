import Link from "next/link";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import CtaBand from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">Greater Vancouver · Lower Mainland</span>
          <h1>Junk gone. Same day.<br />No heavy lifting for you.</h1>
          <p className="lead">
            Professional junk removal, demolition, and waste management for homes and businesses across
            Greater Vancouver. We load it, sweep up, and recycle what we can.
          </p>
          <div className="cta">
            <Link href="/contact" className="btn">Get a free quote →</Link>
            <Link href="/services" className="btn ghost">Browse services</Link>
          </div>
          <div className="trust">
            <span><i className="dot" /> Same / next-day pickup</span>
            <span><i className="dot" /> Upfront, no-surprise pricing</span>
            <span><i className="dot" /> Eco-friendly disposal</span>
            <span><i className="dot" /> Residential &amp; commercial</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">What we do</span>
          <h2>Services</h2>
          <div className="grid g3" style={{ marginTop: 24 }}>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="card">
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <span className="arrow">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="wrap">
          <span className="eyebrow">Where we work</span>
          <h2>Serving all of Greater Vancouver</h2>
          <p style={{ maxWidth: 620, color: "var(--muted)" }}>
            From Vancouver to the Fraser Valley — book fast local pickup in your city.
          </p>
          <div className="chips" style={{ marginTop: 20 }}>
            {CITIES.map((c) => (
              <Link key={c.slug} href={`/junk-removal-${c.slug}`} className="chip">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap grid g4">
          {[
            ["Book in minutes", "Tell us what you have. We give you an upfront quote — no surprises."],
            ["We do the work", "Our crew lifts, loads, and cleans up. You don't touch a thing."],
            ["Hauled & sorted", "We haul it away and divert to donation and recycling wherever possible."],
            ["Space back", "Same or next-day slots so you get your space back fast."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <h3 style={{ fontSize: 17 }}>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
