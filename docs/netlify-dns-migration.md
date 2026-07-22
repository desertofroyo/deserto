# Migrating desertofroyo.com to Netlify DNS

**Why:** Netlify's Let's Encrypt certificate will not provision with external (GoDaddy) DNS on this
account — the same failure happened previously on zahraasadeq.dev, which was only resolved by moving
to Netlify DNS. Netlify DNS makes the certificate automatic.

**The risk:** switching nameservers makes Netlify authoritative for ALL DNS. Any record not recreated
in Netlify **disappears** — which would break `hello@desertofroyo.com`.

**The mitigation:** create every record in Netlify FIRST, switch nameservers LAST.

> ⚠️ The domain's DMARC policy is `p=reject`. That means if SPF/MX are wrong after the move, mail is
> **rejected outright**, not sent to spam. The email records below must be entered exactly.

---

## ORDER OF OPERATIONS (do not reorder)

1. Create the DNS zone in Netlify
2. Add **all 10 records** below to that zone
3. Double-check them against this list
4. **Only then** change the nameservers at GoDaddy
5. Verify email still works
6. Provision the SSL certificate

Doing it in this order means that the moment the nameserver change takes effect, every record already
exists — so there is no window where email is broken.

---

## STEP 1 — Create the zone in Netlify

Netlify → **Domains** → **Add or register domain** → enter `desertofroyo.com` → choose to host DNS
with Netlify. This creates an empty DNS zone and shows you four `nsone.net` nameservers.

**Write those four nameservers down. Do not enter them at GoDaddy yet.**

---

## STEP 2 — Add these records to the Netlify DNS zone

### 📧 EMAIL — Microsoft 365 (all required)

| # | Type | Name | Value | Priority |
|---|------|------|-------|----------|
| 1 | `MX` | `@` | `desertofroyo-com.mail.protection.outlook.com` | `0` |
| 2 | `TXT` | `@` | `NETORGFT18891296.onmicrosoft.com` | — |
| 3 | `TXT` | `@` | `v=spf1 include:secureserver.net -all` | — |
| 4 | `TXT` | `_dmarc` | `v=DMARC1; p=reject; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` | — |
| 5 | `CNAME` | `autodiscover` | `autodiscover.outlook.com` | — |
| 6 | `CNAME` | `msoid` | `clientconfig.microsoftonline-p.net` | — |
| 7 | `CNAME` | `sip` | `sipdir.online.lync.com` | — |
| 8 | `CNAME` | `lyncdiscover` | `webdir.online.lync.com` | — |

### 📞 Teams / Skype (SRV records)

| # | Type | Name | Priority | Weight | Port | Target |
|---|------|------|----------|--------|------|--------|
| 9 | `SRV` | `_sipfederationtls._tcp` | `100` | `1` | `5061` | `sipfed.online.lync.com` |
| 10 | `SRV` | `_sip._tls` | `100` | `1` | `443` | `sipdir.online.lync.com` |

### 🌐 Website records

Netlify usually creates these automatically once the site is attached to the zone. Verify they exist:

- `desertofroyo.com` → the `deserto-froyo` site
- `www.desertofroyo.com` → the `deserto-froyo` site

### ⏭️ Intentionally NOT migrated

- `CNAME _domainconnect → _domainconnect.gd.domaincontrol.com` — a GoDaddy-only convenience feature.
  Not needed once DNS leaves GoDaddy. Safe to drop.
- No DKIM selectors exist on this domain today, so there are none to move.

---

## STEP 3 — Verify before switching

Re-read the Netlify zone against the table above. Confirm all 10 records are present, especially the
`MX` and the three `TXT` records. This is the last checkpoint before the switch.

---

## STEP 4 — Change nameservers at GoDaddy

GoDaddy → `desertofroyo.com` → **Nameservers** → **Change** → **I'll use my own nameservers** →
enter the four `nsone.net` nameservers from Step 1 → Save.

Propagation is usually 15–60 minutes, occasionally up to 48 hours.

---

## STEP 5 — Verify email still works

**Before** declaring success, send a test email TO `hello@desertofroyo.com` from an outside address
(a personal Gmail), and confirm it arrives. Also send one FROM that account.

If mail fails, the fastest rollback is to change the nameservers at GoDaddy back to:

```
ns35.domaincontrol.com
ns36.domaincontrol.com
```

GoDaddy retains the old zone, so this restores the previous state.

---

## STEP 6 — Provision the certificate

Netlify → `deserto-froyo` site → **Domain management** → **HTTPS** → **Verify DNS configuration** →
**Provision certificate**. With Netlify DNS this normally succeeds within minutes.

Then enable **Force HTTPS**.

---

## Original GoDaddy state (for rollback reference)

```
NS:    ns35.domaincontrol.com, ns36.domaincontrol.com
A      @                        75.2.60.5
CNAME  www                      deserto-froyo.netlify.app
MX     @         0              desertofroyo-com.mail.protection.outlook.com
TXT    @                        NETORGFT18891296.onmicrosoft.com
TXT    @                        v=spf1 include:secureserver.net -all
TXT    _dmarc                   v=DMARC1; p=reject; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;
CNAME  autodiscover             autodiscover.outlook.com
CNAME  msoid                    clientconfig.microsoftonline-p.net
CNAME  sip                      sipdir.online.lync.com
CNAME  lyncdiscover             webdir.online.lync.com
SRV    _sipfederationtls._tcp   100 1 5061 sipfed.online.lync.com
SRV    _sip._tls                100 1 443  sipdir.online.lync.com
CNAME  _domainconnect           _domainconnect.gd.domaincontrol.com   (not migrated)
```
