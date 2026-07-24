import Link from "next/link";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";

export default function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="logo" style={{ fontSize: 22 }}>JUNK<b> FREE</b></div>
            <p style={{ color: "var(--muted)", marginTop: 10, maxWidth: 260 }}>
              Fast, eco-friendly junk removal, demolition, and waste management across Greater Vancouver. Same and next-day service.
            </p>
            <Link href="/contact" className="btn" style={{ marginTop: 6 }}>Get a free quote</Link>
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.slice(0, 6).map((s) => <Link key={s.slug} href={`/${s.slug}`}>{s.name}</Link>)}
            <Link href="/services">All services →</Link>
          </div>
          <div>
            <h4>Popular areas</h4>
            {CITIES.slice(0, 7).map((c) => <Link key={c.slug} href={`/junk-removal-${c.slug}`}>{c.name}</Link>)}
            <Link href="/cities">All areas →</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/why-junk-free">Why Junk Free</Link>
            <Link href="/what-we-remove">What we remove</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="base">
          <span>© {new Date().getFullYear()} Junk Free. Greater Vancouver, BC.</span>
          <span>Eco-friendly disposal · Residential &amp; commercial</span>
        </div>
      </div>
    </footer>
  );
}
