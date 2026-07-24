import { meta } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";

export const metadata = meta("Why Junk Free", "Same/next-day service, upfront pricing, and eco-friendly disposal. See why Greater Vancouver chooses Junk Free.", "/why-junk-free");

export default function Why() {
  const reasons = [
    ["Same / next-day service", "We know junk is in your way now. Most jobs are booked within a day."],
    ["Upfront pricing", "You get a clear quote before we lift a finger. No hidden fees."],
    ["We do the heavy lifting", "Our crew handles everything. You don't move or carry a thing."],
    ["Eco-friendly disposal", "We divert to donation and recycling wherever we can, not just the landfill."],
    ["Residential & commercial", "Homes, offices, retail, and job sites — all handled."],
    ["Local & reliable", "A Greater Vancouver crew that shows up on time and cleans up after."],
  ];
  return (
    <>
      <section className="hero"><div className="wrap">
        <span className="eyebrow">Why us</span>
        <h1>Why Junk Free</h1>
        <p className="lead">Straightforward, fast, and responsible junk removal — the way it should be.</p>
      </div></section>
      <section><div className="wrap grid g3">
        {reasons.map(([t, d]) => (
          <div key={t} className="card"><h3 style={{ fontSize: 17 }}>{t}</h3><p>{d}</p></div>
        ))}
      </div></section>
      <CtaBand />
    </>
  );
}
