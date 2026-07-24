import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="hdr">
      <div className="wrap">
        <Link href="/" className="logo">JUNK<b> FREE</b></Link>
        <nav className="nav">
          <Link href="/services">Services</Link>
          <Link href="/cities">Areas</Link>
          <Link href="/what-we-remove">What we remove</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact" className="btn">Get a free quote</Link>
        </nav>
      </div>
    </header>
  );
}
