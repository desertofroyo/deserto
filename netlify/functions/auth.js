/* Netlify function: GET /.netlify/functions/auth
 *
 * Step 1 of the GitHub OAuth handshake for the Sveltia CMS. Redirects the owner
 * to GitHub's authorization screen. GitHub then sends them back to /callback.
 *
 * Required Netlify environment variable:
 *   OAUTH_GITHUB_CLIENT_ID      from the GitHub OAuth App (see docs/CMS-SETUP.md)
 *
 * No secrets are exposed here — only the public client id is used.
 */
import { randomBytes } from "node:crypto";

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";

export async function handler(event) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return { statusCode: 500, body: "GitHub OAuth is not configured (missing OAUTH_GITHUB_CLIENT_ID)." };
  }

  const proto = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers.host;
  const redirectUri = `${proto}://${host}/.netlify/functions/callback`;

  // CSRF protection: random state echoed back by GitHub and verified in /callback.
  const state = randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
    state,
    allow_signup: "false",
  });

  return {
    statusCode: 302,
    headers: {
      Location: `${GITHUB_AUTHORIZE}?${params.toString()}`,
      "Set-Cookie": `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
      "Cache-Control": "no-store",
    },
    body: "",
  };
}
