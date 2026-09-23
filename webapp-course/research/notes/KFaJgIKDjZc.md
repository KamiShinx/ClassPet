# How to Build a Mobile Inventory Dashboard with Google Apps Script (Mohammad Rameez Imdad, 9.3 min)

**What it is:** demo/promo of a phone-resale inventory system (stock in/out, invoicing, barcode scanning). Same channel format: click-through tour, no code taught.
**Substance:** thin as a tutorial, but the only video in the batch to show camera/scanner usage in an Apps Script web app, which is directly relevant to CONTEXT.md's webcam/HtmlService caveat.

## Ideas, in the video's order
- [0:00:33] Admin vs user roles again (admin sees all, user sees own) — the batch's most repeated pattern.
- [0:01:40] A device record carries a **status derived from a stock action**: "stock in" vs "sold out" are two different transaction types recorded against the same device row, not just a boolean.
- [0:02:47]–[0:03:55] Two different **printable invoices** are generated from the same data depending on transaction type (stock-receipt vs sale-invoice) — one entity, two report views, decided by a status field.
- [0:04:28] Editing a device pre-fills the Add Device form from the existing row — the standard "Edit = load row into the same form as Create" pattern.
- [0:05:37] Attaching supporting documents/photos to a transaction, saved into an auto-created Google Drive folder — same Drive-upload pattern seen elsewhere in the batch.
- [0:06:09] A separate **Stock Balance** report cross-references "units in stock" vs "units sold" vs "stock value" per product — an aggregate report distinct from the raw device list, i.e. a second read-view over the same underlying rows.
- [0:06:43]–[0:07:50] **QR/barcode generation and scanning**: the app generates a barcode image for a device's IMEI, and separately offers a "Start Camera" scanner in the Add Device form that reads a barcode and auto-fills the IMEI field. This is the batch's one clear example of requesting camera access from inside an Apps Script HtmlService page.
- [0:08:57] A 3-second delay before the dashboard reflects a new device is called out explicitly by the narrator — another rare acknowledgment of request latency.

## What the frames add
[6:20] shows the **raw Sheet columns**: IMEI 1, IMEI 2, Brand, Model, Seller Name/Mobile, Buy Date, Buy Price, Status, Sale Date, Sale Price, Sold Customer Name/Mobile, Comment, Doc1-4, Created By, Created/Modified Date — a genuinely good, concrete "Sheet as a wide table" example to show kids: one row = one item's whole lifecycle. [6:50]-[7:10] shows the barcode-generator UI and a real generated barcode image, then [7:10]-[7:20] the "Start Camera" scanner view — useful, concrete visual for discussing whether/how camera access works in this stack.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
One row tracking an item's full lifecycle (bought -> in stock -> sold) via a status field rather than separate tables; two report views (raw list vs aggregated balance) over the same data; barcode encode/decode as a small, self-contained feature; camera access requested from a web page.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **classroom lending library or lost-and-found log**: each item has a status (available/checked out/returned), and a small stock-balance-style report shows counts per status — teaches the "status field on a row" pattern well. Barcode generation (encoding a value as an image) is a fun, scoped JS-library milestone that doesn't touch the backend at all.

### Traps a kid will hit
**Camera/scanner access is the trap CONTEXT.md already flags**: Apps Script HtmlService pages run in a sandboxed iframe, and `getUserMedia` (camera) is very likely blocked there in practice — this video shows a scanner working, but we cannot verify it actually ran inside a *deployed* Apps Script web app rather than being staged, and even if genuine, browser/version differences make this unreliable to promise kids. Treat "camera scan a barcode" as an IMAGE-UPLOAD-based feature during the year (photograph a barcode, decode from the uploaded image, or just type the code) and save live camera for the Netlify-hosted final project.

### Doesn't transfer, and why
Buy/sell pricing, profit calculation, and supplier invoices are resale-business bookkeeping with no natural teen project mapping beyond the generic "status log" idea already captured above.

## Honest caveats
No code shown or explained; QR/barcode library usage is inferred, not confirmed, and its exact JS library is never named on screen. Whether the "Start Camera" feature genuinely works inside a deployed Apps Script `/exec` page (vs. being demoed in a regular browser tab) is not verifiable from this video — flag this explicitly to Ben rather than promising it works. No AI-assisted-building content shown, consistent with the rest of the batch.
