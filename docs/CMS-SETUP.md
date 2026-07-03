# Deserto Content Manager (Sveltia CMS) — how it works & one-time setup

The owner edits the website herself at **`yoursite.com/admin`** — the hero banner,
menu items, photos, store details, everything. It's a free, git-based CMS
([Sveltia](https://github.com/sveltia/sveltia-cms)). There is **no monthly fee**
and nothing to maintain: it saves changes straight to this GitHub repo, and
Netlify rebuilds the site automatically.

```
Owner opens /admin ──▶ edits content / uploads photos ──▶ presses "Publish"
        │                                                       │
        │                              Sveltia commits to GitHub (this repo)
        ▼                                                       ▼
  logs in with GitHub                              Netlify auto-builds & deploys
                                                            ▼
                                              ~1–2 min later the live site updates
```

## What's editable (and where the data lives)

Each CMS section maps to a file in **`/content`**. The site reads those files via
`src/site/data.js`, so editing them changes the live site.

| CMS section | File | Controls |
|---|---|---|
| Home → Hero | `content/hero.json` | The rotating banner slides (image, copy, button) |
| Home → What we make | `content/highlights.json` | The category cards |
| Home → Our story gallery | `content/story.json` | The story photo carousel |
| Menu items | `content/menu.json` | Every menu item (froyo, tonics, coffee, pastries, extras) |
| Store details | `content/site.json` | Address, hours, phone, maps, delivery partners |
| Menu categories | `content/categories.json` | Category list (advanced) |

Uploaded images are committed to `public/assets/uploads/` and referenced as
`/assets/uploads/<file>`.

---

## One-time setup (you, with the GitHub + Netlify accounts)

You only do this once. It connects the `/admin` login to GitHub.

### 1. Create a GitHub OAuth App
GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
([direct link](https://github.com/settings/developers)). Fill in:

- **Application name:** `Deserto CMS`
- **Homepage URL:** `https://YOUR-SITE.netlify.app` *(your live site)*
- **Authorization callback URL:** `https://YOUR-SITE.netlify.app/.netlify/functions/callback`

Click **Register application**, then **Generate a new client secret**. Copy the
**Client ID** and the **Client secret** — you'll need them next.

### 2. Add the secrets to Netlify
Netlify → your site → **Site configuration → Environment variables → Add a variable**:

| Key | Value |
|---|---|
| `OAUTH_GITHUB_CLIENT_ID` | the Client ID from step 1 |
| `OAUTH_GITHUB_CLIENT_SECRET` | the Client secret from step 1 |

### 3. Point the CMS at your real site address
Edit **`public/admin/config.yml`** and replace **both** `YOUR-SITE.netlify.app`
placeholders (`base_url`, `site_url`, `display_url`) with your real Netlify
address. Commit the change.

> The `repo:` line is already set to `ZahraaSadeqProd/deserto`. If the repo is
> ever renamed or transferred, update it to match.

### 4. Give the owner access to edit
The owner logs in with a **GitHub account that has write access to the repo**:

- Easiest for now: create a free GitHub account for her, then add it under
  **GitHub repo → Settings → Collaborators → Add people** with **Write** access.
- After the eventual handoff (when the repo is transferred to her), she's the
  owner and already has access.

### 5. Deploy
Trigger a deploy (or just push). Visit `https://YOUR-SITE.netlify.app/admin`,
click **Sign in with GitHub**, approve once — you're in.

---

## For the owner — the everyday flow
1. Go to **yoursite.com/admin** and sign in with GitHub (one tap after the first time).
2. Pick a section (e.g. **Menu items**), make changes, **upload photos by dragging them in**.
3. Changes are **saved as you go but stay private** — nothing is live yet.
4. When ready, press **Publish**. About a minute later the live site shows the update.

She can also **save a draft, preview, and undo** — every change is versioned.

---

## Notes & gotchas

- **Custom domain later:** when the real domain is attached, update the GitHub
  OAuth App's Homepage + Callback URLs **and** the `config.yml` URLs to the new
  domain, or login will fail.
- **Login is GitHub-based.** A git-based CMS authenticates through GitHub; the
  owner needs a GitHub login with repo write access (see step 4). No extra
  service or password system to run.
- **Developer fallback:** you can always edit the `content/*.json` files directly
  in the repo and push — same result as using the CMS.
- **The `/admin` page is excluded from search engines** (`noindex`) and only
  people you grant repo access can actually edit.
