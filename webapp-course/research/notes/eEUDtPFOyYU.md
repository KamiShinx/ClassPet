# I Built a Restaurant Inventory & Kitchen Dispatch System with ChatGPT AI (Mohammad Rameez Imdad, 16.6 min)

**What it is:** same channel/format as the real-estate CRM video: a promo/demo walkthrough of a finished, paid Apps Script + Sheets inventory-management template for a 5-branch restaurant group, narrated as a client case study. Not a build log; ends with a pitch to build a "custom ERP/CRM" for the viewer's business.
**Substance:** thin — 16.5 minutes of clicking through a finished dashboard's modules (branches, items, recipes, purchases, dispatches, stock counts). Despite the title "I Built... with ChatGPT AI," no AI-assisted coding is shown at any point; ChatGPT only appears as an optional, end-user-facing chatbot feature inside the finished product, exactly as in the companion CRM video.

## Ideas, in the video's order
- [0:00:00] Problem framing: a real client (5 branches ordering from one central kitchen) had no visibility into branch-level stock — the stated reason the system exists. Concrete and usable as a "why would you build a backend" hook for class.
- [0:00:18] Four roles: admin, storekeeper, kitchen manager, branch manager, with the same per-section edit-permission toggle pattern as the CRM video [0:00:39].
- [0:01:35] Language switch, color themes, dark mode (generic, cosmetic).
- [0:02:02] Bulk CSV import for branches/sites (generic import pattern; unlike the CRM video, no dedupe/skip logic is described here — just "import").
- [0:02:25] "360 view" of one branch/store: stock on hand per item with quantity and total value in local currency — a simple valuation calc (qty × unit cost).
- [0:03:40] Item master: 272 items, each with category, unit, cost/kg, on-hand quantity, stock value — a straightforward "items table" a kid could model directly.
- [0:05:40] **Recipes/BOM (bill of materials)**: a finished item (e.g. "beef bacon dish") is defined as a list of raw ingredient items + quantities + a method/notes field. This is a clean, concrete one-to-many relational idea: one recipe row links to many ingredient-line rows.
- [0:06:53] **Par levels**: minimum/maximum stock thresholds per item per location — the app flags when stock is below the minimum. Good, simple "if value < threshold, alert" logic to teach.
- [0:07:28] Vendors + a **vendor price list** (price per item, per vendor, with lead time and minimum order) — a many-to-many relation (vendor × item → price) that's easy to explain with two linked sheets.
- [0:08:47] **Stock ledger / stock adjustment**: additions or reductions of stock are logged with a *reason code* (spoilage, expired, over-production, staff meal) rather than just overwriting a "current stock" number. This is the clearest real backend concept in either video: an append-only transaction log that the current stock is *derived from*, instead of a single mutable cell being edited directly.
- [0:09:36] **Stock count / blind count**: a physical-inventory reconciliation workflow — open a count, staff enter counted quantities blind (without seeing the system's expected number), admin reviews. Concept: recorded data vs. physically verified data can diverge and need reconciling.
- [0:10:37] Batch & expiry tracking per item per location.
- [0:11:05] **Purchase request → approval workflow**: a branch submits a request, an admin approves or rejects it, and the emergency/priority field feeds the document. A clean three-state (pending/approved/rejected) workflow, easy to teach as a state machine.
- [0:11:55] Dispatch from central kitchen to a branch auto-generates a printable invoice.
- [0:12:14] Purchases/GRN (goods-received note) from a vendor, with a live **unit conversion** shown on screen (1 kg = 1000 g) [0:12:35].
- [0:13:08] Production: converts raw materials into a finished batch using the recipe's ingredient list, consuming stock accordingly — ties the recipe/BOM concept [0:05:40] to an actual stock-deduction event.
- [0:13:49] AI assistant again requires the user's own ChatGPT API key entered in Settings [0:13:49]-[0:14:06]; test query "what was dispatched today and what is it worth" is run live [0:14:33].
- [0:15:01]-[0:15:30] The live AI demo's actual answer: "dispatched today... documents found zero, total dispatched value is zero" — i.e. the on-camera demo query returned an empty/null result on the demo data, not an impressive answer. Worth noting honestly since the video moves past it without comment.

## What the frames add
Mostly confirms the UI tour; two frames carry real content beyond "here's a screen":
- [0:14:40] (sheet_006) a raw Google Sheet grid of inventory data is visible behind the AI assistant panel — direct visual confirmation that "Sheets as database" is real, not just claimed.
- [0:16:00]-[0:16:20] (sheet_007) an "About App" page shows two genuinely informative static tables: "Formulas & Business Logic" (named formulas like unit conversion, stock value, reorder threshold, production cost — text only, not actual code) and "Corrections — Edit & Delete rules," which documents what happens if you edit or delete an already-approved record (the system reverses/re-applies the associated stock movement rather than just changing a number). That second table is the one place in either video that gestures at a real backend-integrity problem (edits to historical records must not silently corrupt derived totals), even though it's documentation, not a demonstrated fix.
No code editor, Apps Script IDE, or AI chat "typing a prompt to generate code" appears anywhere in the video.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Append-only stock ledger with reason codes, vs. overwriting a single "current stock" cell [0:08:47] — the strongest reusable concept in either video.
- Threshold-based alerting (par levels) [0:06:53].
- Simple 3-state approval workflow (request → approved/rejected) [0:11:05].
- One-to-many relation (recipe → ingredient lines) [0:05:40] and many-to-many with an attribute (vendor × item → price) [0:07:28].
- "Editing a past record must not silently break totals" as a named problem [0:16:00], even if only documented, not solved on screen.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Ledger-not-cell milestone**: convert a kid's "class supply tracker" (or any app with a running total) from "edit one cell directly" to "append a row (+/-, reason, timestamp) and compute the total as a sum" — directly modelled on [0:08:47], doable in one session, and a good vehicle for teaching why logs beat overwriting.
- **Approve/reject mini-project**: a "hall pass" or "equipment checkout request" app — a student submits a request row (status=pending), a "teacher" role can approve or reject it, and the student's view updates. Models [0:11:05]'s workflow at teen scale and is genuinely useful as a real school tool.
- **Threshold alert milestone**: add a "low stock" (or "low points," "low lives," anything numeric) banner that checks a value against a stored minimum and changes color/text — small, concrete version of [0:06:53].

### Traps a kid will hit
- None shown directly (no build process on screen). By extrapolation only: an append-only ledger where "current stock" is computed by summing all rows [0:08:47] gets slow in Apps Script once the log sheet grows, because summing means reading every row — a kid will need to learn to read a range once and sum in JS rather than looping `getValue()` cell by cell. This is our own inference, not something the video shows.
- The "edit/delete an approved record must reverse the stock movement" rule [0:16:00] is exactly the kind of rule a weak/forgetful AI will forget to apply consistently once a kid asks for "one more feature" — worth flagging to the class as a case where writing the rule down (a project-memory note) matters, even though the video only documents it in English prose, not as enforced code.

### Doesn't transfer, and why
- Multi-branch restaurant logistics (5 branches, central kitchen, GRNs, dispatch invoices) is an adult B2B domain with no teen-project analog.
- The OpenAI API key requirement for the AI assistant [0:13:49] conflicts directly with our course rule (kids don't use API keys or call AI APIs from their apps).
- Blind stock counts, batch/expiry compliance tracking, and vendor price lists are restaurant-operations specific and not motivating or relevant to a 14-year-old audience.

## Honest caveats
- Same channel, same format, same ending pitch as the CRM video (paid template, "custom ERP/CRM" hire pitch) [0:15:58]-[0:16:26] — every performance or capability claim should be read as marketing, not verified engineering.
- Despite "ChatGPT AI" in the title, this video contains zero seconds of AI-assisted building — no prompt is typed to generate code, no error appears, nothing is fixed. The only AI content is a finished, optional, end-user chatbot that needs the viewer's own API key, and its one live demo on screen returned an empty/zero answer [0:15:01]. This video is not usable evidence for how AI-assisted building goes; it should not be cited for the "weak, forgetful AI" concern in CONTEXT.md.
