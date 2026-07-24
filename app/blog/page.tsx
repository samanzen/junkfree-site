import Link from "next/link";
import { POSTS } from "@/lib/data/blog";
import { meta } from "@/lib/seo";

export const metadata = meta("Blog", "Junk removal tips, local guides, and eco-friendly disposal advice for Greater Vancouver.", "/blog");

export default function Blog() {
  return (
    <>
      <section className="hero"><div className="wrap">
        <span className="eyebrow">Junk Free blog</span>
        <h1>Guides &amp; tips</h1>
        <p className="lead">Local junk removal advice, disposal guides, and eco-friendly tips.</p>
      </div></section>
      <section><div className="wrap">
        <div className="grid g2">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card">
              <h3>{p.title}</h3>
              <span className="arrow">Read more →</span>
            </Link>
          ))}
        </div>
      </div></section>
    </>
  );
}
