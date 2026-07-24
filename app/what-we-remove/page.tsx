import Link from "next/link";
import { meta } from "@/lib/seo";
import { SERVICES } from "@/lib/data/services";
import CtaBand from "@/components/CtaBand";

export const metadata = meta("What We Remove", "From furniture and appliances to renovation debris and full cleanouts — see what Junk Free takes across Greater Vancouver.", "/what-we-remove");

export default function WhatWeRemove() {
  return (
    <>
      <section className="hero"><div className="wrap">
        <span className="eyebrow">The full list</span>
        <h1>What we remove</h1>
        <p className="lead">If it's not hazardous, chances are we'll take it. Here's the short version.</p>
      </div></section>
      <section><div className="wrap grid g3">
        {SERVICES.map((s) => (
          <div key={s.slug} className="card">
            <h3 style={{ fontSize: 17 }}>{s.name}</h3>
            <ul className="checklist" style={{ marginTop: 4 }}>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            <Link href={`/${s.slug}`} className="arrow">More →</Link>
          </div>
        ))}
      </div></section>
      <CtaBand />
    </>
  );
}
