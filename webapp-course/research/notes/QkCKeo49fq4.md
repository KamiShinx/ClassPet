# Build AI Sales & Inventory Web App + AI Chat Assistant — Apps Script, Gemini, ChatGPT, Antigravity (Mohammad Rameez Imdad, 16.4 min)

**What it is:** demo/promo of a finished ERP web app (quotations, sales orders, invoices, customers/suppliers, inventory, expenses, reports, an "AI chat assistant") followed by a plug for buying the template, dressed up with a title that name-drops four AI tools.
**Substance:** thin. 13 of 16.4 minutes are a click-through product tour with zero code and zero explanation of how anything works; the last ~3 minutes show static prompt text (not typed live) with no AI tool UI, no errors, no fixes.

## Ideas, in the video's order
- [0:00:00]-[0:12:28] Full click-through of a finished multi-role ERP: quotations -> convert to sales order -> confirm -> create invoice, each step a status change on one record (generic, but a clean example of a status-driven workflow).
- [0:02:09] Narrator states Google Sheets is used as the database for every module (repeated claim, not shown).
- [0:02:41] SWR ("stale-while-revalidate") caching is claimed for read performance — mentioned once, never shown or explained; likely just a buzzword drop for a HtmlService app (generic, unverified).
- [0:04:18]-[0:04:51] Quotation -> sales order conversion decrements inventory only at the sales-order stage, not at quotation stage — a genuine distinction between "quote" and "committed transaction" worth reusing.
- [0:08:37] Stock adjustment via a signed delta (+50 / -10) applied to a running total, not manual overwrite — a decent small backend concept (never explained as such).
- [0:10:49] App-wide settings (currency symbol, app name, logo) propagate everywhere including printouts — generic "global config" idea.
- [0:11:00]-[0:11:22] Settings page has toggles for "Google Gemini" and "ChatGPT (openai)" with an API-key field, framed as **customer-facing** AI chat assistant features of the finished product, not as how the app itself was built.
- [0:11:22]-[0:11:55] AI chat assistant demoed: user types "top 5 customers by revenue", gets a generated answer; narrator says the UI was "designed with the help of AI" and specifically "Google Antigravity" (mentioned once, not shown building it).
- [0:12:28] Narrator says buyers of the paid template can "use Google Antigravity" themselves afterward to customize it — confirms Antigravity is pitched as a tool the *customer* would use later, not demonstrated live here.
- [0:13:00]-[0:13:33] Narrator explicitly says a single one-shot Antigravity prompt "will not give accurate results" for an app this size, so the build was split into 5 prompts — a genuinely useful, if generic, framing (big ask -> break into steps) but stated as a claim, never demonstrated step by step.
- [0:13:33]-[0:16:00] The "5 prompts" are shown as static text in a document/editor window (frame contains one long prompt about a two-file Apps Script sales/inventory system) — text is read out, not typed live into any AI tool; no AI response, no error, no back-and-forth is ever shown.
- [0:14:38] Narrator claims building this from scratch with "Claude or Gemini or ChatGPT" APIs would cost about $20 in tokens — a sales pitch for buying the pre-built template rather than a build-log claim (mark as promotional, not evidence).
- [0:15:10] One prompt line says "make it Gemini 3 1.0" — Gemini is referenced only as a model-selection instruction inside a static prompt document, never as a tool being operated on screen.

## What the frames add
Sheets 1-4 ([0:00:00]-[0:10:30]): pure finished-product UI — dashboard, quotation/sales-order/invoice modals, customer ledger, inventory adjust, supplier payments, reports. No code visible anywhere in this span.
Sheets 5-6 ([0:10:40]-[0:15:10]): settings page with Gemini/ChatGPT API-key toggles (still just app *feature* configuration, not a build tool), then the AI chat panel, then several frames of a plain white document window with dense small text — this is the "5 prompts" document being scrolled/read, not an AI chat or IDE interface. No cursor typing into a prompt box is visible at any point.
Sheet 7 ([0:16:00]-[0:16:10], final two frames): a dark-background code/text window with a few lines of reddish text is visible behind the dashboard, too small and brief to read; it appears once at the very end and is never returned to or explained — cannot confirm what it is.
**Net: at no point in any of the 7 sheets does a frame show an actual AI chat interface (Gemini, ChatGPT, or Antigravity) with a live-typed prompt, a generated response, an error message, or a code diff.** The video's visuals never contradict the transcript's evasiveness — they confirm it.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Status field driving workflow stage (quote -> order -> invoice); stock decrement only on committed transactions, not quotes; signed-delta stock adjustment; global settings object read by many pages/printouts.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **class request/approval tracker**: a request row starts "pending", and only on "approved" does a linked counter (e.g. "spots left" for an event) get decremented — same quote-vs-committed-order distinction at teen scale, and small enough to build in one or two sessions.

### Traps a kid will hit
None new shown — no code, no error, no fix is ever demonstrated, so this video teaches no Apps Script trap directly. The one indirectly relevant trap: kids will be tempted to ask Gemini for a single giant one-shot prompt to build a whole app (the video's own claim that this fails and must be split into 5 steps is worth repeating to the class, even though it's never demonstrated here).

### Doesn't transfer, and why
The entire ERP domain (quotations, tax settings, supplier ledgers, partner/commission bookkeeping) is adult small-business software with no teen project mapping. The "AI chat assistant that reads your Sheet data" feature requires a real AI API key wired into the backend (`doPost` calling an LLM), which is explicitly out of scope for this class (kids don't call AI APIs from their apps).

## Honest caveats
Despite the title naming Gemini, ChatGPT, and Antigravity as if the video demonstrates AI-assisted building across multiple tools, this is a finished-product sales demo with a bolted-on "prompts" section at the end. ChatGPT appears only as an optional customer-facing chat-assistant API setting inside the finished app, unconnected to how the app itself was built. Gemini appears only as one instruction inside a static prompt document ("make it Gemini 3 1.0"). Antigravity is the only tool actually credited with building anything ("I have used the Google anti-gravity" [0:11:22], [0:12:28]), and even that is asserted, never shown in use — no prompt is typed live, no response or error appears on screen, and no code is scrolled or explained. This is title-stuffing for SEO over one finished demo, not a real AI-build log. There is no instance in this video of AI breaking, hallucinating, or rewriting working code, because no live AI interaction is ever shown — CONTEXT.md's "weak, forgetful AI" concern gets zero real evidence from this video.
