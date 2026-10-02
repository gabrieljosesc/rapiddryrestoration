import "server-only";

/** Minimal Resend client via fetch. Without RESEND_API_KEY it logs and skips. */
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "RapidDry Restoration <onboarding@resend.dev>";

export function ownerAlertAddress(): string {
  return process.env.OWNER_ALERT_EMAIL ?? "";
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !input.to) {
    console.warn(`[email] not configured, skipped "${input.subject}"`);
    return { sent: false, error: "Email is not configured." };
  }
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? DEFAULT_FROM,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error(`[email] Resend ${res.status}:`, (await res.text()).slice(0, 500));
      return { sent: false, error: `Email provider error (${res.status}).` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { sent: false, error: "Email send failed." };
  }
}
