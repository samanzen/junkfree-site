import { meta, Json } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";
import { publishedHtml } from "@/lib/content";

export const metadata = meta("FAQ", "Answers to common questions about Junk Free's junk removal service in Greater Vancouver — pricing, scheduling, what we take.", "/faq");
export const dynamic = "force-dynamic";

// Fallback FAQs (used until the SEO agent publishes a deeper version to /faq).
const FALLBACK: [string, string][] = [
  ["How much does junk removal cost?", "Pricing is based on the volume your items take up in our truck. We always give an upfront quote before we start — no surprises."],
  ["How soon can you come?", "Most jobs are booked same or next day across Greater Vancouver, subject to availability."],
  ["Do I need to move anything?", "No. Our crew does all the lifting, loading, and cleanup. Just point at what needs to go."],
  ["What do you do with the junk?", "We divert everything we can to donation and recycling, and dispose of the rest responsibly."],
  ["What can't you take?", "We can't take hazardous materials like paint, chemicals, or asbestos. Ask us and we'll point you to the right disposal option."],
  ["Do you serve businesses?", "Yes — offices, retail, construction sites, and ongoing commercial pickup are all covered."],
];

// Pull Q/A pairs out of the agent's markdown (bold question, following text = answer).
function parseFaqs(md: string): [string, string][] {
  const out: [string, string][] = [];
  const blocks = md.split(/\n(?=\*\*|##\s)/);
  for (const b of blocks) {
    const q = b.match(/\*\*(.+?)\*\*/)?.[1] || b.match(/^##\s+(.+)$/m)?.[1];
    if (!q) continue;
    const a = b.replace(/\*\*.+?\*\*/, "").replace(/^##\s+.+$/m, "").replace(/[#*]/g, "").trim();
    if (a) out.push([q.replace(/[#*]/g, "").trim(), a]);
  }
  return out.length ? out : FALLBACK;
}

export default async function Faq() {
  const pub = await publishedHtml("faq");
  const faqs = pub ? parseFaqs(pub.title ? await rawFaqBody() : "") : FALLBACK;
  const list = faqs.length ? faqs : FALLBACK;
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: list.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <>
      <Json data={ld} />
      <section className="hero"><div className="wrap article">
        <span className="eyebrow">Answers</span>
        <h1>Frequently asked questions</h1>
      </div></section>
      <section><div className="wrap article">
        {list.map(([q, a]) => (
          <div key={q} style={{ borderBottom: "1px solid var(--line)", padding: "18px 0" }}>
            <h3>{q}</h3><p style={{ margin: 0, color: "var(--body)" }}>{a}</p>
          </div>
        ))}
      </div></section>
      <CtaBand />
    </>
  );
}

// Get the raw markdown body of the published /faq content, if any.
async function rawFaqBody(): Promise<string> {
  const { publishedContent } = await import("@/lib/content");
  const row = await publishedContent("faq");
  return row?.body || "";
}
