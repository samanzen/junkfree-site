import Link from "next/link";
import { CITIES } from "@/lib/data/cities";
import { meta } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";

export const metadata = meta("Service Areas", "Junk removal across Greater Vancouver and the Fraser Valley — find your city.", "/cities");

export default function Cities() {
  return (
    <>
      <section className="hero"><div className="wrap">
        <span className="eyebrow">Coverage</span>
        <h1>Where we work</h1>
        <p className="lead">Fast local junk removal across all of Greater Vancouver and the Fraser Valley.</p>
      </div></section>
      <section><div className="wrap">
        <div className="grid g4">
          {CITIES.map((c) => (
            <Link key={c.slug} href={`/junk-removal-${c.slug}`} className="card">
              <h3 style={{ fontSize: 17 }}>{c.name}</h3>
              <span className="arrow">Junk removal in {c.name} →</span>
            </Link>
          ))}
        </div>
      </div></section>
      <CtaBand />
    </>
  );
}
