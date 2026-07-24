import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/lib/data/blog";
import { meta } from "@/lib/seo";
import { publishedContent } from "@/lib/content";
import CtaBand from "@/components/CtaBand";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  return meta(p.title, `${p.title} — practical junk removal advice for Greater Vancouver from Junk Free.`, `/blog/${p.slug}`);
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((x) => x.slug === slug);
  if (!post) notFound();
  const published = await publishedContent(`blog/${slug}`);
  return (
    <>
      <section className="hero"><div className="wrap article">
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link></div>
        <h1>{post.title}</h1>
      </div></section>
      <section><div className="wrap article">
        {published?.body ? (
          <div dangerouslySetInnerHTML={{ __html: published.body }} />
        ) : (
          <>
            <p>
              This guide covers {post.title.toLowerCase()} for homeowners and businesses across Greater Vancouver.
              Junk Free offers same and next-day pickup, upfront pricing, and eco-friendly disposal.
            </p>
            <p>
              Need a hand right now? <Link href="/contact" style={{ color: "var(--green)", fontWeight: 700 }}>Get a free quote</Link> and
              we'll take care of the heavy lifting.
            </p>
          </>
        )}
      </div></section>
      <CtaBand />
    </>
  );
}
