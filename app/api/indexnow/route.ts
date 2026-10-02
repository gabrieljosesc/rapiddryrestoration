import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { site } from "@/lib/site";

/**
 * POST /api/indexnow  → submits every sitemap URL to IndexNow (Bing, Yandex,
 * and by extension ChatGPT search). Call after each deploy or new guide.
 * Protected by the same key: send header `x-indexnow-key: <INDEXNOW_KEY>`.
 */
export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY is not configured." }, { status: 503 });
  }
  if (request.headers.get("x-indexnow-key") !== key) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const host = new URL(site.url).host;
  const urlList = sitemap().map((e) => e.url);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${site.url}/indexnow.txt`,
      urlList,
    }),
  });

  return NextResponse.json({ ok: res.ok, status: res.status, submitted: urlList.length });
}
