// Bridge to the SEO agent: published content lives in the shared Supabase
// `content` table. The site reads it to show agent-published blog posts and to
// override page content. Works gracefully with no Supabase configured.

import { marked } from "marked";

type Row = { slug: string; title: string; body: string };
async function all(): Promise<Row[]> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
    const { data } = await db
      .from("content")
      .select("slug,title,body")
      .not("published_at", "is", null);
    return (data as Row[]) || [];
  } catch {
    return [];
  }
}

// Raw record for a slug (e.g. "blog/junk-removal-cost-vancouver").
export async function publishedContent(slug: string) {
  const rows = await all();
  return rows.find((r) => r.slug === slug) || null;
}

// Rendered HTML for a slug (markdown → HTML), or null.
export async function publishedHtml(slug: string) {
  const row = await publishedContent(slug);
  if (!row) return null;
  return { title: row.title, html: await marked.parse(row.body) };
}

// All agent-published blog posts, for the /blog list.
export async function publishedBlogPosts() {
  const rows = await all();
  return rows
    .filter((r) => r.slug.startsWith("blog/"))
    .map((r) => ({ slug: r.slug.replace(/^blog\//, ""), title: r.title }));
}
