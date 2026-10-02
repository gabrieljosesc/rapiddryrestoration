function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

export function leadAlertEmail(lead: {
  kind: string;
  name: string;
  phone: string;
  email?: string | null;
  address: string;
  whatHappened: string;
  service?: string | null;
  sourcePage?: string | null;
}) {
  const urgent = lead.kind === "emergency";
  const subject = `${urgent ? "EMERGENCY" : "New"} lead: ${lead.name}, ${lead.address}`;
  const rows: [string, string][] = [
    ["Type", urgent ? "Emergency request" : "Contact request"],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "n/a"],
    ["Address", lead.address],
    ["Service", lead.service || "n/a"],
    ["What happened", lead.whatHappened],
    ["Page", lead.sourcePage || "n/a"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const telDigits = lead.phone.replace(/\D/g, "");
  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px">
<h2 style="color:#0b2545">${esc(subject)}</h2>
<table cellpadding="6" style="border-collapse:collapse;width:100%">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:#64748b;vertical-align:top;width:130px">${esc(k)}</td><td>${esc(v)}</td></tr>`
  )
  .join("")}
</table>
<p style="margin-top:16px"><a href="tel:${telDigits}" style="background:#e63946;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:700">Call ${esc(lead.name)} now</a></p>
</div>`;
  return { subject, html, text };
}
