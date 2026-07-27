import { NextResponse } from "next/server";

// Quote request capture. Writes to the shared Supabase project's `leads`
// table (schema in the junkfree-agent repo: supabase/leads.sql).
// CASL: we store the consent flag + timestamp with every lead.

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const email = String(body.email || "").trim().slice(0, 160);
  const city = String(body.city || "").trim().slice(0, 80);
  const details = String(body.details || "").trim().slice(0, 2000);
  const consent = body.consent === true;
  const sourcePage = String(body.sourcePage || "").slice(0, 300);

  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { ok: false, error: "Please include your name and a phone number or email." },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Please confirm you agree to be contacted about your quote." },
      { status: 400 }
    );
  }

  // Honeypot — bots fill every field.
  if (body.company) return NextResponse.json({ ok: true });

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Not configured yet: don't lose the lead silently — tell the visitor to call.
    return NextResponse.json(
      { ok: false, error: "Online booking is temporarily unavailable — please call or text us." },
      { status: 503 }
    );
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
    const { error } = await db.from("leads").insert({
      brand: "junkfree",
      name,
      phone: phone || null,
      email: email || null,
      city: city || null,
      details: details || null,
      source_page: sourcePage || null,
      casl_consent: true,
      consented_at: new Date().toISOString(),
    });
    if (error) throw error;

    // Also push into GoHighLevel Contacts (free — no premium webhook trigger).
    // Never blocks the lead: if GHL fails, the Supabase row is still saved.
    await pushToGHL({ name, phone, email, city, details }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong — please call or text us instead." },
      { status: 500 }
    );
  }
}

// Send the lead to GHL as a Contact via the v2 API. Uses a private-integration
// token + location id from env. Silent no-op if not configured.
async function pushToGHL(lead: {
  name: string;
  phone: string;
  email: string;
  city: string;
  details: string;
}) {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return;

  const [firstName, ...rest] = lead.name.split(" ");
  const lastName = rest.join(" ");

  await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      firstName: firstName || lead.name,
      lastName: lastName || undefined,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      city: lead.city || undefined,
      source: "Website quote form",
      tags: ["website-lead", "junkfree"],
      customFields: lead.details
        ? [{ key: "quote_details", field_value: lead.details }]
        : undefined,
    }),
  });
}
