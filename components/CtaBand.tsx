import Link from "next/link";

export default function CtaBand({ area }: { area?: string }) {
  return (
    <section>
      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>Ready to clear it out{area ? ` in ${area}` : ""}?</h2>
            <p>Same or next-day pickup. We do all the lifting and loading — you just point.</p>
          </div>
          <Link href="/contact" className="btn amber">Get a free quote →</Link>
        </div>
      </div>
    </section>
  );
}
