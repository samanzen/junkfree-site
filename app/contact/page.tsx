import Link from "next/link";
import { meta } from "@/lib/seo";

export const metadata = meta("Get a Free Quote", "Contact Junk Free for fast, upfront junk removal quotes across Greater Vancouver. Same/next-day service.", "/contact");

export default function Contact() {
  return (
    <section className="hero" style={{ minHeight: "70vh" }}><div className="wrap article">
      <span className="eyebrow">Contact</span>
      <h1>Get a free quote</h1>
      <p className="lead">Tell us what you need gone and where. We'll send you an upfront, no-obligation quote — usually within the hour during business hours.</p>
      <div className="card" style={{ maxWidth: 460, marginTop: 20 }}>
        <h3>Two fast ways to book</h3>
        <p style={{ marginBottom: 16 }}>Call or text for the quickest response, or send us your details and we'll reply with pricing.</p>
        <a href="tel:+16040000000" className="btn" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}>Call / text us</a>
        <a href="mailto:hello@junkfree.ca" className="btn ghost" style={{ width: "100%", justifyContent: "center" }}>Email us</a>
      </div>
      <p style={{ marginTop: 22, color: "var(--muted)", fontSize: 14 }}>
        Prefer to browse first? <Link href="/services" style={{ color: "var(--green)", fontWeight: 700 }}>See all services</Link> or <Link href="/what-we-remove" style={{ color: "var(--green)", fontWeight: 700 }}>what we remove</Link>.
      </p>
    </div></section>
  );
}
