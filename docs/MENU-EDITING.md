# Owner-editable menu — how it works & one-time setup

The menu on the website is driven by a **Google Sheet the owner edits**. She
changes the sheet whenever she likes; nothing goes live until she opens the
**`/publish`** page and presses **Publish my menu**, which rebuilds the site
from the sheet. Prices are never read or shown.

```
Owner edits Google Sheet ──▶ presses "Publish" on /publish
        │                              │
        │                    Netlify function checks passphrase
        │                              ▼
        │                    triggers Netlify build hook
        ▼                              ▼
  (publish-to-web CSV) ◀── build runs scripts/build-menu.mjs
                                       ▼
                       writes src/site/menu.products.json → site shows it
```

If the sheet is ever unreachable, the build automatically falls back to the
seed catalog in `src/site/data.js`, so the live menu never goes blank.

---

## One-time setup (you, with a Netlify + Google account)

### 1. Create the menu sheet
1. Open Google Sheets → blank sheet.
2. **File → Import → Upload** `docs/menu-template.csv` → *Replace current sheet*.
   This seeds it with the current 27 items and the right column headers.
3. Columns (don't rename the header row):
   `Category | Group | Name | Description | Tags | Photo | InStoreOnly`
   - **Category** — one of: `Frozen Yogurt`, `Tonics`, `Coffee`, `Pastries`, `Extras`
   - **Group** — optional sub-heading (`Hot`, `Iced`, `Cookies NYC`…). Blank = no sub-heading.
   - **Name** — required (a blank Name row is ignored).
   - **Description** — optional one-liner.
   - **Tags** — optional, comma-separated (`Vegan, GF`).
   - **Photo** — optional. Paste a full `https://` image link, or leave blank for a colored tile. (Existing catalog photos can be referenced by filename, e.g. `cappuccino.jpg`.)
   - **InStoreOnly** — `yes` adds an “In store” badge.

### 2. Publish the sheet to the web (read-only)
`File → Share → Publish to web` → **Entire document**, format **Comma-separated values (.csv)** → **Publish**.
Copy the link it gives you — that's the **CSV URL**. Also copy the normal
shareable **edit link** (Share → Copy link) for the owner's button.

### 3. Create a Netlify build hook
Site → **Configuration → Build & deploy → Build hooks** → *Add build hook*
(name it “Publish menu”, branch `main`). Copy the URL.

### 4. Set Netlify environment variables
Site → **Configuration → Environment variables**:

| Key | Value |
|---|---|
| `MENU_SHEET_CSV_URL` | the **publish-to-web CSV** link from step 2 |
| `VITE_MENU_SHEET_URL` | the owner's **edit link** (shown as the button on `/publish`) |
| `PUBLISH_PASSPHRASE` | a passphrase you give the owner |
| `BUILD_HOOK_URL` | the build-hook URL from step 3 |

### 5. Deploy
Trigger a deploy. The build runs `scripts/build-menu.mjs`, pulls the sheet, and
bakes the menu in. The Netlify function at `/.netlify/functions/publish` is live.

---

## For the owner (the everyday flow)
1. Go to **yoursite.com/publish**.
2. Press **Open my menu sheet**, make changes, they save automatically.
3. Back on `/publish`, type your **passphrase** and press **Publish my menu**.
4. Wait ~1 minute, refresh the menu page — done.

---

## Editing the menu without the sheet (developer fallback)
Edit `SITE.products` in `src/site/data.js` and rebuild. With no
`MENU_SHEET_CSV_URL` set, the build uses that seed directly. Prices are stripped
automatically, so leaving old `price:` fields in place is harmless.
