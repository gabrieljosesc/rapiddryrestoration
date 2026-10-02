/**
 * IndexNow key file. Bing (and therefore ChatGPT search) verifies ownership by
 * fetching this file, whose body must equal the key. Set INDEXNOW_KEY in env.
 */
export const dynamic = "force-static";

export function GET() {
  const key = process.env.INDEXNOW_KEY ?? "";
  return new Response(key, {
    status: key ? 200 : 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
