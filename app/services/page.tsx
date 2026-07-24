import Link from "next/link";
import { SERVICES, SERVICE_DETAILS } from "@/lib/data/services";
import { meta } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";

export const metadata = meta("Our Services", "Junk removal, demolition, appliance and furniture removal, recycling and more across Greater Vancouver.", "/services");

export default function Services() {
  return (
    <>
      <section className="hero"><div className="wrap">
        <span className="eyebrow">Greater Vancouver</span>
        <h1>Our services</h1>
        <p className="lead">Whatever needs to go, we handle it — for homes, offices, and job sites.</p>
      </div></section>
      <section><div className="wrap">
        <h2>Core services</h2>
        <div className="grid g2" style={{ marginTop: 20 }}>
          {SERVICE_DETAILS.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card">
              <h3>{s.name}</h3><p>{s.blurb}</p><span className="arrow">Learn more →</span>
            </Link>
          ))}
        </div>
      </div></section>
      <section className="section-soft"><div className="wrap">
        <h2>Specialty removal</h2>
        <div className="grid g3" style={{ marginTop: 20 }}>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className="card">
              <h3>{s.name}</h3><p>{s.blurb}</p><span className="arrow">Learn more →</span>
            </Link>
          ))}
        </div>
      </div></section>
      <CtaBand />
    </>
  );
}
