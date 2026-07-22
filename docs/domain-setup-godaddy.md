# Connecting desertofroyo.com to the website (GoDaddy steps)

**Time needed:** about 10 minutes, plus up to 1 hour of waiting at the end (nothing to do during the wait).

**What this does:** points the domain `desertofroyo.com` at the new website. It does **not** change anything about email.

---

## ⚠️ Read this first — the one rule that matters

You will see a list of "records." **Do not delete or edit anything labeled `MX` or `TXT`.**
Those run the `hello@desertofroyo.com` email. If you leave them alone, email keeps working perfectly.

You will only change **two** records (`A` and `CNAME`) and turn **off** one setting (Forwarding). That's the whole job.

---

## Step 1 — Open the domain's DNS page

1. Go to **godaddy.com** and **sign in**.
2. Click your name in the top-right corner, then click **My Products**.
3. Find **desertofroyo.com** in the list of domains.
4. Next to it, click the three dots **( ⋯ )** (or the **DNS** button) and choose **Manage DNS**.

You should now see a table of records with columns like **Type / Name / Data / TTL**.

---

## Step 2 — Turn OFF Domain Forwarding (if it's on)

On the same DNS page, scroll down to a section called **Forwarding** (it may say "Domain" and "Subdomain" forwarding).

- If there is a forwarding entry, click **Edit** or the trash/remove icon and **turn it off / delete it**.
- If there is nothing there, skip this step.

*(Forwarding, if left on, quietly overrides the next steps — so it has to be off.)*

---

## Step 3 — Change the "A" record

In the records table, find the row where:

- **Type** = `A`
- **Name** = `@`

Click the **pencil / edit** icon on that row and change its value:

- **Value / "Data" / "Points to":**  →  type exactly:  `75.2.60.5`
- Leave **TTL** at its default (e.g. "1 Hour").

Click **Save**.

> If turning off Forwarding removed the `A` record, just **add** one instead:
> click **Add Record** → Type `A` → Name `@` → Value `75.2.60.5` → Save.

---

## Step 4 — Change the "www" record

In the records table, find the row where:

- **Type** = `CNAME`
- **Name** = `www`

Click the **pencil / edit** icon on that row and change its value:

- **Value / "Data" / "Points to":**  →  type exactly:  `deserto-froyo.netlify.app`
- Leave **TTL** at its default.

Click **Save**.

> If there is no `www` row, add one:
> click **Add Record** → Type `CNAME` → Name `www` → Value `deserto-froyo.netlify.app` → Save.

---

## Step 5 — Double-check and finish

Your two changed records should now read:

| Type   | Name | Value                       |
|--------|------|-----------------------------|
| `A`    | `@`  | `75.2.60.5`                 |
| `CNAME`| `www`| `deserto-froyo.netlify.app` |

And the **MX** and **TXT** records should be **unchanged** (untouched = email is safe).

That's everything on the GoDaddy side. ✅

---

## What happens next (automatic)

- Nothing else to do. The website connection turns on by itself, usually within a few minutes and up to 1 hour.
- The secure padlock (**https**) also turns on automatically once the connection is detected.

**To confirm it's done:** please take a **screenshot of the DNS records table** after saving, and send it back. That lets us verify the two records are correct and that email was left untouched.
