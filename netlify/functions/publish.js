/* Netlify function: POST /.netlify/functions/publish
 *
 * Checks the owner's passphrase, then triggers a Netlify build hook so the site
 * rebuilds and re-reads the menu from her Google Sheet.
 *
 * Required Netlify environment variables:
 *   PUBLISH_PASSPHRASE  the secret the owner types on /publish
 *   BUILD_HOOK_URL      the Netlify build hook (Site config → Build & deploy →
 *                       Build hooks). Kept server-side only; never shipped to
 *                       the browser, so nobody can spam rebuilds.
 */
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const expected = process.env.PUBLISH_PASSPHRASE;
  const hook = process.env.BUILD_HOOK_URL;
  if (!expected || !hook) {
    return { statusCode: 500, body: "Publisher is not configured yet." };
  }

  let passphrase = "";
  try { passphrase = (JSON.parse(event.body || "{}").passphrase || "").trim(); }
  catch { return { statusCode: 400, body: "Bad request." }; }

  if (passphrase !== expected) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  try {
    const res = await fetch(hook, { method: "POST" });
    if (!res.ok) return { statusCode: 502, body: "Build hook failed." };
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch {
    return { statusCode: 502, body: "Could not reach the build hook." };
  }
}
