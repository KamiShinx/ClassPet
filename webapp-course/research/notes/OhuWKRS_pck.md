# FREE Lottery Management System with Google Apps Script & React Dashboard | Full Web App | E28 (Mohammad Rameez Imdad, 6.7 min)

**What it is:** short promo feature-tour demo of a pre-built lottery-ticket-checker web app. No code walkthrough. Explicitly labelled by the narrator as "for educational purposes."
**Substance:** thin, but it's the smallest/simplest app shown in this batch and maps well to a fun, low-scope teen project.

## Ideas, in the video's order
- [0:00:00 - 0:01:07] **Public, no-login "check your ticket" page**: enter phone number + lottery number, get a win/lose result — same unauthenticated-lookup pattern as the payslip video (AbFbc615J9M), reinforcing it's a recurring shape across these apps, not a one-off.
- [0:01:43] Separate **admin login** for managing users/prizes; the app deliberately gives users no dashboard at all, only the ticket-check form — an explicit, simple two-surface design (public form vs private admin) worth naming for kids as the minimum viable split between "anyone can hit this" and "only I can hit this."
- [0:02:17] Adding a user auto-generates their lottery number and stores a **password field** alongside phone/email — again, shown as a plain visible field in the Sheet in the frames (see below).
- [0:03:25] "Award prize" is a separate admin action from ticket creation — the winning status is written after the fact by an admin picking a user and a prize tier, not computed automatically — a manual/human-in-the-loop write rather than an automatic rule, worth contrasting with "the computer decides."
- [0:03:57] Prize tiers are just a lookup — first/second/third mapped to gold/silver/diamond display colors — trivial but a clean small feature (a "type" field driving a display style, same idea as the invoice-type branching in KSBLAVgEdvA).
- [0:06:11] Admin username check is **case/role-specific** ("username not found" because it only accepts the literal string "admin") — the video accidentally demonstrates that this login check is hardcoded rather than reading a real admin flag from a table, an authentication-design smell worth pointing out (should be a role field, not a magic string).

## What the frames add
Sheet_002 (~00:02:40-00:03:50) shows the raw Google Sheet columns for the Users table: name, phone number, lottery number, **a "Password/PIN" column containing what looks like a long hash-like or URL-like string**, and a timestamp. This is the best frame in the whole batch to show kids a real Users sheet, but also worth a closer look/discussion: even if this looks hashed rather than plaintext, storing any password-equivalent value in a spreadsheet column that any editor of the Sheet can read is a fundamental limitation of "Sheets as auth store" that the class should understand explicitly (Apps Script has no built-in secure credential storage; a real auth system would never keep passwords, hashed or not, in a shared spreadsheet cell visible to co-editors).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Public unauthenticated read/check endpoint vs private admin CRUD — the cleanest, smallest example of this split in the batch, good as a first-week teaching example.
- A "type" field (prize tier) driving purely cosmetic behavior (color) — safe, low-stakes place to introduce conditional rendering.
- Manual admin action vs automatic computation — a good discussion prompt ("could the app decide who won automatically? what would it need to know?").

### Becomes something kids do (activity, mini-project, milestone)
- **Week 1-2 milestone project**: a "check your raffle ticket" app — enter a name/number, look it up in a Sheet, show win/lose. Small enough to build in one or two sessions, and it's literally this exact app at kid scale (class raffle, not real money) — a strong first small project candidate.
- Extend it with an **admin-only "draw a winner" button** that picks a random row and writes the win flag — introduces `Math.random()` over sheet rows as a next step.

### Traps a kid will hit
- The hardcoded "admin" username check (rather than a role column) is exactly the kind of security shortcut a kid vibe-coding with Gemini will produce by default — flag it explicitly: check should be "does this user's role = admin," not "is the username literally the string admin."
- Any password/PIN field, however it looks, needs an explicit lesson that co-editors of the underlying Sheet can see it — this is the cleanest visual for that lesson in the whole batch.

### Doesn't transfer, and why
- Nothing here doesn't transfer — this is the most teen-appropriate, smallest-scope app in the batch (a raffle/lottery checker maps directly onto a class or club raffle).

## Honest caveats
Still a promo demo with zero code explanation; the security observations above are our own reading of the frames, not something the video points out (the video calls the Password/PIN field just that, without saying whether or how it's protected).
