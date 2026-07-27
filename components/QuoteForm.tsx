"use client";

import { useState } from "react";

// Lead capture form. Posts to /api/lead; stores CASL consent with the lead.
export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit() {
    const get = (id: string) =>
      (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value || "";
    const consent = (document.getElementById("qf-consent") as HTMLInputElement | null)?.checked === true;

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("qf-name"),
          phone: get("qf-phone"),
          email: get("qf-email"),
          city: get("qf-city"),
          details: get("qf-details"),
          company: get("qf-company"), // honeypot
          consent,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      if (data.ghlError) console.warn("GHL:", data.ghlError);
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="card" style={{ maxWidth: 520 }}>
        <h3>Request received ✓</h3>
        <p>Thanks — we&apos;ll get back to you with an upfront quote, usually within the hour during business hours.</p>
      </div>
    );
  }

  const field: React.CSSProperties = {
    width: "100%",
    padding: "11px 13px",
    borderRadius: 8,
    border: "1.5px solid var(--line)",
    fontSize: 15,
    marginBottom: 12,
    fontFamily: "inherit",
  };

  return (
    <div className="card" style={{ maxWidth: 520 }}>
      <h3>Request a free quote</h3>
      <p style={{ marginBottom: 16 }}>Tell us what needs to go and where — we&apos;ll reply with upfront pricing.</p>

      <input id="qf-name" style={field} placeholder="Your name *" autoComplete="name" />
      <input id="qf-phone" style={field} placeholder="Phone" inputMode="tel" autoComplete="tel" />
      <input id="qf-email" style={field} placeholder="Email" inputMode="email" autoComplete="email" />
      <input id="qf-city" style={field} placeholder="City (e.g. Burnaby)" autoComplete="address-level2" />
      <textarea id="qf-details" style={{ ...field, minHeight: 90, resize: "vertical" }} placeholder="What needs to go? (e.g. sofa + mattress, garage cleanout…)" />
      {/* Honeypot — hidden from humans */}
      <input id="qf-company" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13.5, color: "var(--muted)", marginBottom: 14, cursor: "pointer" }}>
        <input id="qf-consent" type="checkbox" style={{ marginTop: 3 }} />
        <span>I agree that Junk Free may contact me by phone, text, or email about my quote request. You can unsubscribe anytime.</span>
      </label>

      {status === "error" && (
        <p style={{ color: "#b3261e", fontSize: 14, marginBottom: 12 }}>{error}</p>
      )}

      <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={submit} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get my quote"}
      </button>
    </div>
  );
}
