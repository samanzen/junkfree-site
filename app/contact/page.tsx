import Link from "next/link";
import { meta, SITE } from "@/lib/seo";
import QuoteForm from "@/components/QuoteForm";

export const metadata = meta("Get a Free Quote", "Contact Junk Free for fast, upfront junk removal quotes across Greater Vancouver. Same/next-day service.", "/contact");

export default function Contact() {
  return (
    <section className="hero" style={{ minHeight: "70vh" }}><div className="wrap article">
      <span className="eyebrow">Contact</span>
      <h1>Get a free quote</h1>
      <p className="lead">Tell us what you need gone and where. We&apos;ll send you an upfront, no-obligation quote — usually within the hour during business hours.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 20, alignItems: "flex-start" }}>
        <QuoteForm />
        <div className="card" style={{ maxWidth: 320 }}>
          <h3>Prefer to talk?</h3>
          <p style={{ marginBottom: 16 }}>Call or text for the quickest response.</p>
          <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="btn" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}>Call / text {SITE.phoneDisplay}</a>
          <a href={`mailto:${SITE.email}`} className="btn ghost" style={{ width: "100%", justifyContent: "center" }}>Email us</a>
        </div>
      </div>

      <p style={{ marginTop: 22, color: "var(--muted)", fontSize: 14 }}>
        Prefer to browse first? <Link href="/services" style={{ color: "var(--green)", fontWeight: 700 }}>See all services</Link> or <Link href="/what-we-remove" style={{ color: "var(--green)", fontWeight: 700 }}>what we remove</Link>.
      </p>
    </div></section>
  );
}
