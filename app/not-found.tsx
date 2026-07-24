import Link from "next/link";
export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "70vh" }}><div className="wrap article">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p className="lead">That page moved or never existed. Let's get you back on track.</p>
      <Link href="/" className="btn">Back home →</Link>
    </div></section>
  );
}
