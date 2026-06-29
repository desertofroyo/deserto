/* Netlify function: GET /.netlify/functions/callback
 *
 * Step 2 of the GitHub OAuth handshake for the Sveltia CMS. GitHub redirects
 * here with a one-time code; we exchange it for an access token (using the secret
 * key, server-side only) and hand the token back to the CMS window via postMessage.
 *
 * Required Netlify environment variables:
 *   OAUTH_GITHUB_CLIENT_ID      from the GitHub OAuth App
 *   OAUTH_GITHUB_CLIENT_SECRET  from the GitHub OAuth App (keep secret!)
 */
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const PROVIDER = "github";

/* Parse the Cookie header into a plain object. */
function parseCookies(header) {
  const out = {};
  (header || "").split(";").forEach((pair) => {
    const i = pair.indexOf("=");
    if (i > -1) out[pair.slice(0, i).trim()] = decodeURIComponent(pair.slice(i + 1).trim());
  });
  return out;
}

/* The tiny page the popup renders: it posts the token back to the CMS that
   opened it, following Decap/Sveltia's expected handshake protocol. */
function postMessagePage(status, payload) {
  const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(payload)}`;
  return `<!doctype html><html><head><meta charset="utf-8" /></head><body>
<p>Completing sign-in… you can close this window if it doesn't close itself.</p>
<script>
  (function () {
    var message = ${JSON.stringify(message)};
    function receive(e) {
      window.opener && window.opener.postMessage(message, e.origin);
      window.removeEventListener("message", receive, false);
    }
    window.addEventListener("message", receive, false);
    window.opener && window.opener.postMessage("authorizing:${PROVIDER}", "*");
  })();
</script>
</body></html>`;
}

export async function handler(event) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return { statusCode: 500, body: "GitHub OAuth is not configured (missing client id/secret)." };
  }

  const { code, state } = event.queryStringParameters || {};
  const cookies = parseCookies(event.headers.cookie);

  // CSRF check: the state GitHub echoed back must match the cookie we set in /auth.
  if (!state || !cookies.oauth_state || state !== cookies.oauth_state) {
    return { statusCode: 403, body: "Invalid OAuth state. Please try signing in again." };
  }
  if (!code) {
    return { statusCode: 400, body: "Missing authorization code." };
  }

  const clearCookie = "oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0";

  try {
    const res = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await res.json();

    if (!data.access_token) {
      const html = postMessagePage("error", { message: data.error_description || "No access token returned." });
      return { statusCode: 200, headers: { "Content-Type": "text/html", "Set-Cookie": clearCookie, "Cache-Control": "no-store" }, body: html };
    }

    const html = postMessagePage("success", { token: data.access_token, provider: PROVIDER });
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html", "Set-Cookie": clearCookie, "Cache-Control": "no-store" },
      body: html,
    };
  } catch (err) {
    const html = postMessagePage("error", { message: "Could not reach GitHub. Please try again." });
    return { statusCode: 200, headers: { "Content-Type": "text/html", "Set-Cookie": clearCookie, "Cache-Control": "no-store" }, body: html };
  }
}
