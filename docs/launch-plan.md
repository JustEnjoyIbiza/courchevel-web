# Phase 5: launch plan (DNS, Netlify, deploy, rollback)

Prepared 22 October 2026. Target launch: **Tuesday 24 November 2026**, morning (season opens 4 December).
Nothing in this document has been done on the live site, DNS or accounts yet: every
step marked **Owner** or **Live** waits for the owner's go-ahead.

## 1. Where things stand today (read-only checks, 22 Oct)

| Item | Today | Meaning for the launch |
|---|---|---|
| Registrar | GoDaddy | DNS is managed at GoDaddy (nameservers `ns41/ns42.domaincontrol.com`) |
| **Domain expiry** | **30 November 2026** | **Renew now and turn on auto-renew.** It expires 6 days after launch and 4 days before the season. If it lapses, the site, emails and Google listing links all stop working. |
| `courchevelluxuryconcierge.com` (apex) | `A 75.2.60.5` (Netlify load balancer) | Correct. No change needed |
| `www` | `CNAME courchevel-luxury-concierge.netlify.app` | Correct. No change needed |
| Primary domain on Netlify | the bare domain (`www` 301s to it) | **Must switch to `www`** (step 4.2). The new `netlify.toml` sends bare → www; with the old setting the two rules would loop |
| HTTPS | Netlify certificate, HSTS on | Keep. Check the certificate lists both names after the switch |
| Google verification TXT | `google-site-verification=tU05…` | A Search Console property probably already exists. **Who owns it?** We need access to submit the sitemap |
| Mail (MX) | none | No email at the domain yet. Leads currently go to the Gmail address |
| DMARC | `p=quarantine` (GoDaddy default), no SPF, no DKIM | Any email sent "from" the domain today would go to spam. Fixed by the Resend records (section 3) |
| CAA | none | Fine (Netlify's Let's Encrypt certificate is allowed). Do not add one |
| Repo / deploys | `JustEnjoyIbiza/courchevel-web`, `main` auto-deploys | The rebuild is on `rebuild/phase-0-setup`, **local only** until GitHub push access is granted |

**Good news:** the website itself needs **no DNS change**. Launch is a Netlify setting plus a merge.
DNS changes are only for email (Resend and, optionally, a mailbox).

## 2. Launch blockers (must be done before launch day)

| # | What | Who | Why it blocks |
|---|---|---|---|
| 1 | Renew the domain, auto-renew on | Owner (GoDaddy) | Expires 30 Nov |
| 2 | GitHub push access to `JustEnjoyIbiza/courchevel-web` | Owner | To open the pull request and get a Netlify preview |
| 3 | Netlify team access | Owner | Environment variables, domain setting, rollback |
| 4 | Lead system accounts (Supabase, Resend, Telegram, Turnstile): `lead-system-setup.md` | Owner, ~45 min | Without them the form answers "could not be sent, message us on WhatsApp" (no lead is lost, but the form is useless) |
| 5 | Legal pages: mentions légales, privacy policy, cookie policy | Owner gives the facts, we write them | French law (LCEN art. 6) requires mentions légales on a business site; the form's consent links to the privacy policy |
| 6 | About page facts (founder, photo, story) | Owner | Trust page linked from every footer |
| 7 | Native French read-through | Owner or a French speaker | Half the site is French |
| 8 | Photo rights, and replacements for the 5 stock / non-Courchevel photos | Owner | Legal and trust |

Good to have but not blocking: street address (due 15 Nov), Google Places API key, GA4 ID, the Google Business Profile fixes.

## 3. DNS records to add at GoDaddy (email only)

GoDaddy → My Products → the domain → **DNS** → Add record. Do not edit or delete the existing
`A @` and `CNAME www` records.

### 3.1 Resend (sends the lead emails), required

In Resend → Domains → Add `courchevelluxuryconcierge.com`, **region EU (Ireland, eu-west-1)**.
Resend then shows the exact values; they look like this:

| Type | Name (host) | Value | Priority |
|---|---|---|---|
| TXT | `resend._domainkey` | `p=MIGfMA0G…` (DKIM key from Resend, copy exactly) | |
| MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` | 10 |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | |

These are on the `send.` subdomain and `resend._domainkey`, so they cannot affect the website or any mailbox.
With DKIM verified, the existing DMARC record (`adkim=r`) passes and emails reach the inbox.

### 3.2 A mailbox at the domain, optional but recommended

For `hello@courchevelluxuryconcierge.com` (shown on the site, used as reply-to). Choose one:

- **Google Workspace** (about €7/month per user): MX `@ → smtp.google.com` (priority 1), TXT `@ → v=spf1 include:_spf.google.com ~all`, plus the DKIM TXT that Workspace generates.
- **Free forwarding** (ImprovMX or similar) to the Gmail address: two MX records and one SPF TXT from the provider.

When the mailbox exists, change `email` in `src/data/business.ts`, `CONCIERGE_EMAIL` on Netlify, and every platform profile on the same day.

### 3.3 DMARC reports, optional

The current DMARC record sends reports to GoDaddy (`onsecureserver.net`). To receive them yourself, change
`rua=` to your own address. Keep `p=quarantine`.

### 3.4 Verification records

- Search Console: if nobody can find the owner of the existing property, add a new **Domain property**; Google gives a new `google-site-verification=` TXT on `@`. Keep the old one.
- Bing Webmaster Tools: import from Search Console (no DNS record needed).

## 4. Netlify settings

### 4.1 Environment variables (Site configuration → Environment variables)

| Variable | Production | Deploy previews |
|---|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | real project | same project (test leads are marked by page URL, delete after) |
| `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `CONCIERGE_EMAIL` | real | same |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | real | same |
| `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | real (add both hostnames in Cloudflare) | Cloudflare's test keys, or add the `netlify.app` hostname |
| `GOOGLE_PLACES_API_KEY` | real (restricted to the Places API) | same |
| `PUBLIC_GA4_MEASUREMENT_ID` | real | **leave empty** (no test visits in analytics) |
| `INDEXNOW_KEY` | 32 random hex characters | not needed (the plugin only runs in production) |
| `LEAD_DRY_RUN` | **never set** | not needed once the accounts exist |

### 4.2 Domain management

- Set **`www.courchevelluxuryconcierge.com` as the primary domain**. Netlify then 301s the bare domain to www.
  This is safe to do **before** the merge: the old site simply starts answering on www.
- Check HTTPS → the certificate covers both names.

### 4.3 Builds

- Build command and Node 24 come from `netlify.toml`; nothing to set by hand.
- If an old "Asset optimization" (post-processing) setting still shows, keep it off: Astro already optimises, and rewriting the HTML would break the CSP hashes.
- Leave Deploy Previews on.
- After launch: a **build hook** called once a day refreshes the Google rating and reviews (a GitHub Actions schedule or a Netlify scheduled function calls the hook URL).

## 5. Deploy plan

### 5.1 Preview (from about 16 November, once blockers 2–4 are done)

1. Push `rebuild/phase-0-setup` and open a pull request into `main`. Netlify builds a deploy preview at
   `https://deploy-preview-<n>--courchevel-luxury-concierge.netlify.app` (Netlify marks previews `noindex` automatically).
2. Run `node scripts/qa/launch-check.mjs <preview URL>`: redirects, headers, robots, sitemap, llms.txt,
   404, lead endpoint, and all 74 sitemap URLs. Expected: **0 failed** (except the IndexNow file, which only exists in production).
3. Lighthouse mobile on the preview (home, a service, a village, a guide, enquire, EN + FR).
4. Send a real test enquiry from a phone: lead in Supabase, client email, concierge email, Telegram alert, all in under 30 s. Delete the test row.
5. Owner reviews the preview on phone and desktop and signs off.

### 5.2 Launch day (Tuesday 24 Nov, morning, about 1 hour)

| Step | Action | Check |
|---|---|---|
| 1 | Final `npm run qa` and `npm run qa:content` on the branch | 0 failures |
| 2 | **Live:** Netlify → primary domain → www (4.2) | `curl -I https://courchevelluxuryconcierge.com/` → 301 to www |
| 3 | **Live:** merge the pull request into `main` (merge commit, keeps history) | Netlify production deploy goes green |
| 4 | `node scripts/qa/launch-check.mjs https://www.courchevelluxuryconcierge.com --production --indexnow-key=<key>` | 0 failed |
| 5 | Manual smoke test: tap-to-call, WhatsApp opens the app, one real enquiry, language switcher, cookie banner | All work |
| 6 | Search Console: submit `https://www.courchevelluxuryconcierge.com/sitemap-index.xml`; URL Inspection → Request indexing for `/`, `/fr/`, `/services/`, `/courchevel-1850/`, `/services/transfers/`, `/services/chalets/` | Accepted |
| 7 | Bing Webmaster Tools: import from Search Console, submit the sitemap (IndexNow already pinged by the deploy) | Netlify deploy log shows "IndexNow: submitted 74 URLs" |
| 8 | Google Business Profile and Instagram: website links with UTM tags (`platform-profiles-kit.md`) | Links open the new site |
| 9 | Old form service (Basin): keep it a week for late submissions, then close it | |

### 5.3 Rollback (if something is badly wrong)

- **Fastest (seconds):** Netlify → Deploys → pick the last deploy of the old site → **Publish deploy**. Production
  serves the old site again; the www primary domain setting can stay.
- **Then:** fix on the branch, re-run the preview checks, publish again.
- **Do not** roll back by changing DNS: DNS changes take hours to spread.

### 5.4 First two weeks

- Daily: leads arrive in all three places; Netlify function logs show no errors.
- Search Console (days 3, 7, 14): pages indexed, no 404 or "Duplicate, Google chose different canonical" warnings, Core Web Vitals.
- Day 7: Lighthouse on production; compare with the audit table.
- Day 30: repeat the baseline AI prompt test (20 prompts, EN and FR) and compare.

## 6. What changed in the code for Phase 5

- `scripts/qa/launch-check.mjs`: the launch check above (GET requests only, safe to run on production).
- `netlify.toml`: `/assets/logo.png` → `/icon-512.png` (301), so old links to the logo still show the logo.
- Homepage: the Google reviews section carries the old `#testimonials` anchor until manual reviews exist,
  so every anchor from the old one-page site (`#hero`, `#services`, `#packages`, `#about`, `#testimonials`, `#contact`) still lands somewhere. `#gallery` lands at the top of the page.
