import { meta, Json } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";

export const metadata = meta("FAQ", "Answers to common questions about Junk Free's junk removal service in Greater Vancouver — pricing, scheduling, what we take.", "/faq");

const FAQS = [
  ["How much does junk removal cost?", "Pricing is based on the volume your items take up in our truck. We always give an upfront quote before we start — no surprises."],
  ["How soon can you come?", "Most jobs are booked same or next day across Greater Vancouver, subject to availability."],
  ["Do I need to move anything?", "No. Our crew does all the lifting, loading, and cleanup. Just point at what needs to go."],
  ["What do you do with the junk?", "We divert everything we can to donation and recycling, and dispose of the rest responsibly."],
  ["What can't you take?", "We can't take hazardous materials like paint, chemicals, or asbestos. Ask us and we'll point you to the right disposal option."],
  ["Do you serve businesses?", "Yes — offices, retail, construction sites, and ongoing commercial pickup are all covered."],
];

export default function Faq() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <>
      <Json data={ld} />
      <section className="hero"><div className="wrap article">
        <span className="eyebrow">Answers</span>
        <h1>Frequently asked questions</h1>
      </div></section>
      <section><div className="wrap article">
        {FAQS.map(([q, a]) => (
          <div key={q} style={{ borderBottom: "1px solid var(--line)", padding: "18px 0" }}>
            <h3>{q}</h3><p style={{ margin: 0, color: "var(--body)" }}>{a}</p>
          </div>
        ))}
      </div></section>
      <CtaBand />
    </>
  );
}
