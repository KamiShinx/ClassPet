# Build a B2B Ecommerce Web Portal with Gemini AI + Google Sheets (Mohammad Rameez Imdad, 12.6 min)

**What it is:** feature demo of a large wholesale B2B storefront + admin (bulk order matrix, quotations, shipping zones, AI chat trained on the store's own FAQ/policy data). No build process shown.
**Substance:** mixed: too complex and too "adult business" to be a project shape for teens, but the AI-knowledge-base pattern and the "SWR" live-refresh mention are worth a line each.

## Ideas, in the video's order
- [0:00:00] Tiered bulk pricing: unit price drops automatically as quantity crosses a threshold (1-19 units = one price, 20+ = a lower price) — a clean, teachable "price depends on a rule applied to a live number" example, good for a school "bake sale" bulk-discount mini-feature.
- [0:03:48] Shipping cost computed from a PIN-code → zone lookup table — same lookup-table pattern as other videos, here tied to a real address field.
- [0:04:53] Two login roles (admin vs customer), with a public storefront that works even logged-out ("continue as guest") — a good three-tier access model (public / logged-in user / admin) to hold up as a target shape.
- [0:05:26] Presenter names the tech explicitly: "we use SWR technology... you will not find any kind of delay fetching data" — SWR (stale-while-revalidate, a caching pattern) is mentioned by name but never explained; worth a one-line mention that this is a real web-dev term for "show cached data instantly, refresh quietly in background," a nice advanced concept for a stretch goal but not week-1 material.
- [0:11:19] "Ask AI" widget answers customer questions like "is there a discount on bulk orders?" by reading the store's own settings/FAQ data, with its own separate Gemini API key field in Settings — same AI-grounded-on-your-data pattern as other videos in this batch.
- Generic: quotations-to-orders conversion, invoicing, returns, procurement (all real but generic B2B/ERP features, not teen-relevant).

## What the frames add
Frames are entirely finished storefront/admin screenshots (product cards, cart drawer, checkout, quotations table, print jobs) — no code or Apps Script editor shown at all in the five sampled frames. Confirms this is pure feature demo with zero build-process content.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Quantity-based tiered pricing; PIN-code-to-zone lookup for computed shipping; guest vs logged-in vs admin as three real access tiers; AI grounded on the app's own settings data.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "bake sale" cart with tiered pricing (buy more, pay less per item) is a fun, scoped mini-project that teaches "read a quantity, apply a rule, compute a price" without any of this video's B2B complexity.

### Traps a kid will hit
Not directly demonstrated (no errors shown), but the sheer number of interconnected sheets (products, quotations, orders, invoices, returns, payments, shipping, FAQs) hints at a real trap: as a Sheets-backed app grows past ~5-6 linked sheets, keeping them in sync by hand (or by re-prompting the AI each time) gets fragile fast — worth naming as a "this is why we keep projects small" cautionary example.

### Doesn't transfer, and why
Squarely adult wholesale/B2B software — "useful as architecture, rarely as a project a 14-year-old wants to build," exactly as CONTEXT.md anticipates. No teen would organically want a GST/tax-invoice quotation pipeline.

## Honest caveats
Promotional in tone ("watch this bulk order e-commerce web application," subscribe/share pitch at the end); no AI mistakes, errors, or limitations are shown at any point — purely a polished feature reel.
