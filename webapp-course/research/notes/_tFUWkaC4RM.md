# Invoice Generator Web App using Google Sheets | Dashboard, Login & Print PDF | D18 (Mohammad Rameez Imdad, 6.1 min)

**What it is:** feature demo of a finished invoicing web app (login, invoice builder, PDF/print, ledger of invoice numbers). No build process shown. 2025/2026-era UI.
**Substance:** thin for our purposes: it is a click-through of a pre-built template, not an AI-build session. One useful nugget (manual HTML edit by line number).

## Ideas, in the video's order
- [0:00:36] Sheet has a "user" child sheet storing username/password directly; add a user by adding a row (generic, but real: plaintext credentials in a spreadsheet).
- [0:01:12] Invoice number auto-increments by reading the last row of the Invoices sheet — simplest possible "generate the next ID" pattern, good first backend lesson.
- [0:01:12] To change default text (company name etc.) you edit `index.html` "by line number" (line ~475) — shows the presenter editing raw HTML directly rather than re-prompting the AI. Useful counter-example: hand-editing beats re-generating for small text tweaks.
- [0:02:20] Payment-method and item drop-downs are populated from separate "Dropdown"/"Item" sheets, not hardcoded — dropdown-from-sheet is a reusable no-code pattern.
- [0:02:52] Item price/qty come from an "Item" sheet (name in col A, price in col B) — a tiny lookup-table demo of client reading server data.
- [0:04:00] Saving an invoice shows a "loading next invoice number" state — the only visible nod to async/latency in the whole video.
- [0:05:05] Change-password flow requires current + new + confirm, calls back to the Users sheet — standard but real auth pattern.
- Generic: repeated "so easy, no developer needed" framing (generic marketing filler, discount as content).

## What the frames add
[0:00:40] contact sheet shows the Users sheet with plain **Username / Password** columns in clear text (e.g. "Ramiz" / a visible password) — concrete visual proof passwords sit unencrypted in the Sheet. [0:01:40]-[0:02:20] show the actual `index.html` open in the Apps Script editor (raw HTML with inline CSS, a `<div class="invoice-header">`-style structure) — useful as a "this is what Gemini's HTML output looks like" reference image. [0:03:50] shows the browser print/PDF dialog generated from the invoice view. No code-writing or prompting is ever shown — only finished code being scrolled.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Auto-incrementing IDs from existing rows; dropdown options driven by a settings sheet instead of hardcoded; a login sheet as the "auth database."

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A minimal "ticket/order number generator": read the last row's ID, add 1, write a new row — the smallest possible read-then-write backend exercise, good for week 2-3.

### Traps a kid will hit
Plaintext passwords in the sheet (anyone with edit access to the Sheet can read every password) — must be an explicit warning early in the course, since this template does exactly that and a kid copying the pattern will too.

### Doesn't transfer, and why
The video itself is not an AI-build session — nothing here shows prompting, errors, or fixes, so it teaches finished-product literacy, not workflow.

## Honest caveats
Purely a demo/sales video for a paid template channel ("if you have any web app idea, comment and we'll build it"). Treat every UI feature as inspiration only, not as vetted practice — the plaintext-password pattern in particular should NOT be copied as-is.
