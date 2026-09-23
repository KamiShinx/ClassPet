# Invoicing Web Dashboard App using Google Sheet and Apps Script (Crud Invoice) | C23 (Mohammad Rameez Imdad, 12.5 min)

**What it is:** feature demo of a finished invoicing app with a customer ledger, product stock, email/PDF invoices, and user blocking. No build process.
**Substance:** mixed: a real ledger/stock-deduction pattern worth teaching, wrapped in a long generic click-through.

## Ideas, in the video's order
- [0:02:13] Adding an invoice item deducts from a "Product" sheet's available-quantity in real time — the clearest inventory-deduction example across this whole batch (pick 2 of a product with 8 in stock → 6 remain).
- [0:03:21] A "Ledger" concept separate from invoices: partial/manual payments recorded against a customer, independent of the invoice record itself — shows accounting-style double-entry thinking (invoice vs payment) rather than conflating the two, a genuinely useful model to explain to teens making a "class store" project.
- [0:05:34] Sending an invoice by email pulls the customer's email typed into a field and fires it via Gmail from Apps Script — concrete `MailApp`-style trigger example.
- [0:08:18] User "Allow/Block" status field gates login entirely — simple binary account-suspension pattern, easy to build.
- [0:11:44] Presenter mentions the whole thing can be "embedded" via iframe into another site, and that it was "created by a Google Apps Script user" — brief nod to the fact viewers can embed a deployed web app in a Google Site/Blogger page (relevant to the "hub" idea).
- Generic: date-range filters on invoice list, print/PDF/download options (generic UI).

## What the frames add
Frames are almost entirely finished-product screenshots — invoice forms, ledger tables, PDF preview, print dialog. No code or Apps Script editor is shown at all in this video's sheets (all 5 frames are the deployed web app). This confirms the video teaches nothing about the build process, only the finished feature set.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Inventory deduction on write; separating a "ledger" (payments) from the primary record (invoices) it references; boolean account-block field gating login.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "class store" where buying an item deducts stock from a Products sheet is an excellent, concrete, one-week milestone that directly teaches "the sheet is the single source of truth, both screens read it."

### Traps a kid will hit
Stock deduction done naively (read count, subtract, write back) will race if two people buy the last item at once — this video never surfaces or discusses that risk, so the course needs to add it explicitly as a "what if two people click buy at the same time?" discussion.

### Doesn't transfer, and why
No AI-build process, no code shown — pure feature demo.

## Honest caveats
Nothing suspicious, just a long straightforward promo video; the presenter apologizes for imperfect English but the content itself is clear.
