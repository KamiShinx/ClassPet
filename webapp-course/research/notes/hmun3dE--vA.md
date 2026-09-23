# Build a Complete Car Marketplace with Google Sheets & Apps Script | Admin & Dealer dashboard (Mohammad Rameez Imdad, 11.5 min)

**What it is:** demo/promo of a car-marketplace template (public listing site + admin + dealer back office). Click-through tour with a phone number for hire in the on-screen banner throughout; no code taught.
**Substance:** mixed — the one video in the batch that clearly separates a **public-facing, unauthenticated storefront** from an **authenticated back office**, which is a genuinely useful architecture split to point at.

## Ideas, in the video's order
- [0:00:32]–[0:02:11] The car listing grid (search, filter by condition/city/country/price, sort, list/grid view, a 3-way "compare" feature) is shown **before any login** — i.e. this part of the app is public read access to sheet data, no auth required.
- [0:02:45] "Compare" picks up to 3 cars and shows them side by side; a WhatsApp link hands off to the dealer's real contact — an external "deep link," not part of the backend proper.
- [0:03:18] Self-registration: a new account defaults to role "dealer" with **status "pending"** — new dealer accounts can't do anything until an admin approves them, a real access-control example ("write a row but gate what it does until approved").
- [0:03:53] Immediately after signup, the dealer's dashboard is empty except stock counts scoped to their own name — role AND ownership-based filtering combined (like other videos, but here explicitly tied to a pending-approval state).
- [0:04:26]–[0:06:36] Add Car form: brand/model/price/stock/condition/country/city/driver + an **image upload that saves to a specific Google Drive folder automatically** and writes the resulting URL back to the row — same image-to-Drive pattern as other videos in the batch, worth treating as the "reference way" to handle images from Apps Script.
- [0:07:08] Separate **Invoice** creation flow tied to a specific car and customer, with a payment status (pending/paid) that can later be toggled — a lightweight "orders" or "transactions" sub-entity linked by car ID.
- [0:08:48] Admin can flip a pending dealer to approved, and there's a system-setting toggle for "auto-approve new registrations" — shows the admin workflow behind that pending-status gate introduced at 3:18.
- [0:09:34]–[0:11:01] Log out and back in as the dealer: dealer sees **only their own cars, invoices, and stock**, cannot see other dealers' data — multi-tenant row scoping, consistent with what admin saw before.
- Stock management is a separate concept from car listing (a car can have "5 in stock"; adding stock is its own action, distinct from adding a new car model) — an inventory-quantity pattern.

## What the frames add
[3:00]-[3:20] clean before/after of the login screen and a "Create Account" form, useful for teaching the signup step. [9:40] shows the raw Google Sheet with tabs (glimpsed: Login/users data, Cars, Invoices — hard to read fully but confirms multi-tab structure). [6:00]-[6:30] shows the "Upload Images" control and the "Images URLs will appear here after upload" placeholder text, then the resulting Drive-hosted image thumbnail — a clear before/after of the image-upload -> Drive -> URL-in-sheet flow. Dashboards at [3:40]-[4:50] show donut/bar charts (car condition split, price-band counts) computed from the same rows the inventory table uses — same data, two views.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Public read vs authenticated write as two different access levels in the same app; a "pending approval" state gating a newly created account; file upload from a web form to Google Drive with the URL written back to the sheet; an invoice/order entity linked to a parent record by ID; a simple stock/quantity field distinct from the "add a new item" action.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **class "swap meet" / trading-card marketplace**: anyone can browse a public list of items for trade (no login), but adding your own item or contacting someone requires signing in; new sellers start "pending" until the teacher approves them. This teaches public-vs-private access cleanly and is genuinely fun/relatable at 14. The image-upload-to-Drive piece is a great, scoped milestone on its own (upload a photo of your item, see the URL land in the sheet).

### Traps a kid will hit
Public read access on an Apps Script web app (deploying with "Anyone" but only exposing certain functions) vs. gating writes is a real permissions-design decision a kid will get wrong by default — likely either everything is public or everything requires login, not a deliberate split. The pending-approval gate requires the code to check a status field on every privileged action, easy to forget on one of several forms. Uploading images through `HtmlService` works via file-picker input, not camera — worth flagging against the class's plan to use Teachable Machine/camera features, which are separately blocked in Apps Script's sandboxed iframe per CONTEXT.md.

### Doesn't transfer, and why
WhatsApp deep-linking and dealer/company system settings (auto-approve toggle, company name/email) are business-configuration features with no teen project use.

## Honest caveats
As with the rest of the batch, this is a sales demo with a contact number banner running the entire video — no code is shown being written, and the "how" of auth, approval-gating, or the image upload is never narrated, only inferred from watching the UI. No AI-assisted-building content despite the batch theme.
