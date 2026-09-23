# Batch R1 — Mohammad Rameez Imdad (10 videos)

## Headline finding: this is a sales-demo channel, not a build-log channel
9 of 10 videos are promo click-throughs of a finished, paid Sheets+Apps Script template, ending in a
purchase/hire pitch. "Claude Code / ChatGPT / Gemini / Antigravity" in the titles is almost always marketing:
either an optional end-user AI-chat feature bolted onto the finished app (requiring the *viewer's own* API key —
`dcddyP_2q6w` [0:11:39], `eEUDtPFOyYU` [0:13:49], `QkCKeo49fq4` [0:11:00]), or an asserted-but-never-shown build
claim (`vzpuCkGnkd4`, `ZOMVXar9YUg` — a "Welcome to Claude Code" title card is decorative, not footage), or a
title-stuffed keyword (`QkCKeo49fq4` names four tools, only Antigravity is even claimed to have built anything,
and that's never shown; `VqA770IsfDU`'s "+ React" is contradicted by its own frames, which show plain
`HtmlService` `.gs`/`.html` files [0:12:00]). Only two videos show anything real:
- **`i9kOEIDyvPw` (POS)**: ~4 real minutes — install Claude Code extension, paste one prompt, watch it write
  `code.js`/`index.html` live [0:02:08], copy into Apps Script, deploy, hit the "unverified app" screen. Zero
  errors, zero fixes, a multi-role POS with OTP in "one prompt" — not credible as literal, almost certainly cut.
- **`UzFe3oGQoPI` (ISP billing)**: ~90 real seconds — installs the extension, scrolls a prompt document split
  into ~10 staged parts, then admits AI got it "60 to 70 percent" built, the rest by hand [0:13:24]. No prompting
  or errors actually shown, but the staged-prompt habit and the "AI gets you most, not all, of the way" admission
  are the most honest AI-workflow evidence in the whole batch.
**Net: this batch gives almost no footage of the AI actually breaking/erroring/being corrected — the one
concrete trap is Apps Script's own OAuth "unverified app" step**, hit independently by `i9kOEIDyvPw` [0:03:47],
`ZOMVXar9YUg` [0:14:18], and `VqA770IsfDU` [0:12:20] — worth pre-teaching since three unrelated videos stumble
on it the same way.

## Where videos agree
Nearly every video (7 of 10) independently shows the same shapes: a role→permission checkbox matrix
(view/add/edit/delete per section), a status pipeline (quote→order→invoice, or pending→approved/rejected), an
append-only ledger instead of an overwritten balance cell, a "config values live in a settings sheet" pattern,
and the real Apps Script deploy sequence (Extensions→Apps Script→Deploy→New deployment→Web app→Anyone→Authorize
→Advanced→proceed anyway). That deploy sequence is shown accurately and near-identically in `i9kOEIDyvPw`
[0:03:47–0:04:20] and `VqA770IsfDU` [0:11:38–0:12:31] — reusable almost verbatim as a first-week class walkthrough.
"SWR/stale-while-revalidate" is name-dropped as a performance claim in three separate videos (`lCvJpQwhCDw`,
`dcddyP_2q6w`, `QkCKeo49fq4`) with zero code shown — treat as a repeated buzzword, not a fact, and not teachable
from this batch.

## What to cut
Every domain (3D-print costing, real-estate CRM, restaurant logistics, ISP billing, clinic payroll,
commission-agent trading) is adult B2B software a 14-year-old won't want to build — keep only the generic
patterns, drop the business framing. Don't show `vzpuCkGnkd4`, `dcddyP_2q6w`, `eEUDtPFOyYU`, `NtU3ST63970`, or
`ZOMVXar9YUg` to kids as "how AI builds an app" — none of them show it. Also cut "AI chat over your data" as a
feature idea — every video that has one needs the end user's own OpenAI/Gemini key wired into `doPost`, which
conflicts with the no-API-key rule.

## Concept explainers worth reusing
- Role/permission matrix, live-toggled: `vzpuCkGnkd4` [0:01:58–0:02:56] — clean, generic, good for "what is
  authorization."
- Sheet-as-database confirmed on screen: `dcddyP_2q6w` [0:01:00], `eEUDtPFOyYU` [0:14:40].
- Append-only ledger vs. overwritten cell — the clearest single explainer in the batch: `eEUDtPFOyYU` [0:08:47].
- Real deploy/authorize dance: `i9kOEIDyvPw` [0:03:47–0:04:20], `VqA770IsfDU` [0:11:38–0:12:31].
- "One parent record + related child tables" as relational data without saying "foreign key": `UzFe3oGQoPI`
  [0:01:55–0:02:33].
- The OAuth "you don't have permission to call the app script" moment: `ZOMVXar9YUg` [0:14:18–0:14:50].

## Project seeds (teen scale)
1. **Class store / event sign-up tracker** — writing rows + a status column + a live KPI count. (append-only
   write, computed aggregate)
2. **Check-in/out kiosk** — log a name+timestamp, later stamp checkout and compute duration. (timestamp math)
3. **Hall-pass / equipment-checkout approve-reject app** — student submits, teacher approves/rejects, a
   server-side check blocks over-limit requests. (3-state workflow + server-side validation before write)
4. **Class snack fund / chore-payment ledger** — balance is a sum of append-only +/- rows with a reason, never
   an edited cell. (append-only ledger with reason codes)
5. **Daily reminder emailer** — time-driven trigger + `MailApp` for an upcoming due date. (Apps Script triggers)
6. **"Reset to demo data" utility function** — every kid's project ships a function that wipes/reseeds their own
   sheet, as a recovery net when the AI nukes a project. (project-safety habit, not a stack concept)
7. **Deploy-your-first-web-app milestone** — run the exact make-a-copy→Deploy→Web app→Anyone→Authorize sequence
   as a week-1 exercise. (deployment)
8. **Config-row settings milestone** — move one hard-coded number (points-per-answer, price) into a Settings
   sheet the app reads at runtime. (config vs. code)

## Traps a kid will hit
The OAuth "Google hasn't verified this app" screen, hit independently in three videos, reads as a bug the first
time — pre-teach it. Server-side validation is easy to skip: `VqA770IsfDU` shows a write blocked only after a
business-rule check [0:06:29], [0:08:11] — most kid apps will validate in the UI only and miss this. None of
these videos' "instant, multi-sheet cascading write" demos (lead→member, quote→order→invoice) show what a
*weak* AI does with that scope — expect a free/weak Gemini to drop a step or desync sheets on any multi-sheet
write; the clean one-shot demos actively mislead kids here. `QkCKeo49fq4`'s own admission that one Antigravity
prompt "will not give accurate results" for an app this size, so it split into 5 [0:13:00], is worth repeating
even though never demonstrated — the batch's best (secondhand) argument for small, staged asks over one giant
prompt.
