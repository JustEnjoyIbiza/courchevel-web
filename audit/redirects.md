# Redirects for launch

**Status (Phase 5):** implemented in `netlify.toml`; `/assets/logo.png` now goes to `/icon-512.png`. Tested by `scripts/qa/launch-check.mjs` on the preview and on production (`docs/launch-plan.md`).

The old site has a single page, so the redirect list is short. These go into
`netlify.toml` in Phase 4 and are tested in Phase 5.

| From | To | Code | Why |
|---|---|---|---|
| `https://courchevelluxuryconcierge.com/*` | `https://www.courchevelluxuryconcierge.com/:splat` | 301 | The plan's canonical host is `www.`; today it is the other way round |
| `/index.html` | `/` | 301 | Old direct file URL |
| `/css/styles.css` | (none) | 404 is fine | Not a page |
| `/assets/logo.png` | `/logo.png` (new path) | 301 | May be linked from Instagram or directories |
| `/assets/*.jpeg`, `/assets/photo/*.jpeg` | `/` | 301 | May be indexed in Google Images; send to the homepage |

Anchor links (`/#services`, `/#contact` and so on) need no redirect; the new
homepage should keep `id="services"` and `id="contact"` so old shared links still land
in the right place.

TODO once Search Console access is available: export every URL Google has
indexed for the domain and add any missing ones here.
