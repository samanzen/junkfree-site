// Bridge to the agent repo: if the SEO agent has published content for a slug,
// use it; otherwise the page renders its solid default template.
// Works even with no Supabase configured (returns null gracefully).

let cache: Record<string, { title: string; body: string }> | null = null;

export async function publishedContent(slug: string) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    if (!cache) {
      const { createClient } = await import("@supabase/supabase-js");
      const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      });
      const { data } = await db.from("content").select("slug,title,body");
      cache = {};
      (data || []).forEach((r: { slug: string; title: string; body: string }) => {
        cache![r.slug] = { title: r.title, body: r.body };
      });
    }
    return cache[slug] || null;
  } catch {
    return null;
  }
}
