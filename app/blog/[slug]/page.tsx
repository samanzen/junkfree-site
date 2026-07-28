import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/lib/data/blog";
import { meta } from "@/lib/seo";
import { publishedHtml, publishedBlogPosts } from "@/lib/content";
import CtaBand from "@/components/CtaBand";

// Allow new agent-published slugs (not just the original static ones).
export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const agent = await publishedBlogPosts();
  const slugs = new Set([...POSTS.map((p) => p.slug), ...agent.map((a) => a.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const staticPost = POSTS.find((x) => x.slug === slug);
  const pub = await publishedHtml(`blog/${slug}`);
  const title = pub?.title || staticPost?.title;
  if (!title) return {};
  return meta(title, `${title} — practical junk removal advice for Greater Vancouver from Junk Free.`, `/blog/${slug}`);
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const staticPost = POSTS.find((x) => x.slug === slug);
  const pub = await publishedHtml(`blog/${slug}`);
  if (!staticPost && !pub) notFound();

  const title = pub?.title || staticPost!.title;

  return (
    <>
      <section className="hero"><div className="wrap article">
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link></div>
        <h1>{title}</h1>
      </div></section>
      <section><div className="wrap article">
        {pub?.html ? (
          <div className="post-body" dangerouslySetInnerHTML={{ __html: pub.html }} />
        ) : (
          <>
            <p>
              This guide covers {staticPost!.title.toLowerCase()} for homeowners and businesses across Greater Vancouver.
              Junk Free offers same and next-day pickup, upfront pricing, and eco-friendly disposal.
            </p>
            <p>
              Need a hand right now? <Link href="/contact" style={{ color: "var(--green)", fontWeight: 700 }}>Get a free quote</Link> and
              we&apos;ll take care of the heavy lifting.
            </p>
          </>
        )}
      </div></section>
      <CtaBand />
    </>
  );
}
