import { NextResponse } from "next/server";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { ownerAlertAddress, sendEmail } from "@/lib/email/resend";
import { leadAlertEmail } from "@/lib/email/templates";

const KINDS = ["emergency", "contact"] as const;
type Kind = (typeof KINDS)[number];

function str(v: unknown, max: number) {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (str(body.company, 50)) {
    return NextResponse.json({ ok: true, stored: false, id: "spam" });
  }

  const kindRaw = str(body.kind, 20);
  const kind: Kind = (KINDS as readonly string[]).includes(kindRaw) ? (kindRaw as Kind) : "emergency";
  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 200);
  const address = str(body.address, 300);
  const whatHappened = str(body.what_happened, 3000);
  const service = str(body.service, 80);
  const insuranceRaw = body.insurance_claim;
  const insurance_claim =
    insuranceRaw === true || insuranceRaw === "yes"
      ? true
      : insuranceRaw === false || insuranceRaw === "no"
        ? false
        : null;
  const source_page = str(body.source_page, 300);
  const utm = body.utm && typeof body.utm === "object" ? (body.utm as Record<string, string>) : null;

  if (!name || !phone || !address || !whatHappened) {
    return NextResponse.json(
      { error: "Name, phone, address and what happened are required." },
      { status: 400 }
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const lead = {
    kind,
    name,
    phone,
    email: email || null,
    address,
    what_happened: whatHappened,
    service: service || null,
    insurance_claim,
    source_page: source_page || null,
    utm,
  };

  let id = `demo-${Date.now()}`;
  let stored = false;

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("emergency_requests")
      .insert(lead)
      .select("id")
      .single();
    if (error) {
      console.error("[emergency] insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not save your request. Please call us instead." },
        { status: 500 }
      );
    }
    id = data.id;
    stored = true;
  } else {
    console.warn("[emergency] Supabase not configured, lead not persisted:", { name, phone, address });
  }

  // Owner alert is best-effort and never fails the lead.
  const alert = leadAlertEmail({
    kind,
    name,
    phone,
    email: email || null,
    address,
    whatHappened,
    service: service || null,
    sourcePage: source_page || null,
  });
  await sendEmail({
    to: ownerAlertAddress(),
    subject: alert.subject,
    html: alert.html,
    text: alert.text,
    replyTo: email || undefined,
  });

  return NextResponse.json({ ok: true, stored, id });
}
