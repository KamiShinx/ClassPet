# Batch S7 summary — Laurence Svekis: getting started, sharing/deploying, bound scripts, Docs/Forms/Sheets services

10 Svekis code-along tutorials, no visible dates but consistent modern (2020-2021-era) editor UI — nothing meaningfully outdated. Four are Sheets/general-editor focused (JSrK4uHdVlQ, HDalfwFPmIQ, Z8XgBR8oSDY, ghRiM6Vr0YM), one is deployment-specific (voft0qZfkvw), one is bound-script/UI-specific (vIiuAkum30U), one is a thin resources pointer (RgXBF6KydK8), and three are single-service deep-dives (ia2KweduNUg/Docs, I2r5vJAA8T0/Forms+trigger+email, U3IWoAppDVY/Forms-by-code). Most of the batch is beginner/reference material, not web-app building — only voft0qZfkvw touches `doGet`/deployment, and none of the ten builds an HTML frontend or uses `google.script.run`. Treat this batch as "the plumbing underneath the web app" (Sheets as database, permissions, triggers, deployment mechanics), not as web-app tutorials themselves.

## Where videos agree (reinforcing, trustworthy)
- **Bound vs. standalone scripts**: JSrK4uHdVlQ [0:01:40] and vIiuAkum30U [0:01:43] independently claim bound scripts don't appear as their own Drive file and can't be detached from their container. Safe to teach as fact.
- **"Create a Google resource, then email yourself the link"** repeats near-identically in ghRiM6Vr0YM [0:04:52], U3IWoAppDVY [0:03:19], and I2r5vJAA8T0 — worth naming as a template kids will see everywhere (`Session.getActiveUser().getEmail()` + `MailApp.sendEmail()`).
- **`openById(id)` / `create(name)`** is the same shape across SpreadsheetApp, DocumentApp, and FormApp — teach as one generic convention, not three facts.
- **OAuth consent walkthrough** appears near-verbatim in six of the ten videos — kids WILL see "Google hasn't verified this app" the first time any script touches Mail/Sheets/Forms/an external URL. Needs a five-minute "don't panic" class moment before anyone's first run.

## No contradictions found, one gap
Nothing here contradicts another video. The gap: only voft0qZfkvw explains `doGet`/deployment/access; none of the ten shows `doPost`, `google.script.run`, an HTML frontend, or CORS — the actual "web app" mechanics live in a different batch per this batch's own theme.

## What to cut
HDalfwFPmIQ (macro-recording intro) teaches no backend concept (client-side cell formatting) and RgXBF6KydK8 (resource links) is just a links list — skip showing either to kids; keep RgXBF6KydK8's "check the reference docs before trusting an AI-written method name" as a habit, not a video. ia2KweduNUg (DocumentApp) and U3IWoAppDVY (FormApp-by-code) have long, incremental back halves — fine as references, not worth full-length viewing.

## Concept explainers worth reusing
- **What is a backend, in one demo**: I2r5vJAA8T0's Form -> `onFormSubmit` trigger -> event payload -> Sheet write -> email response [0:04:55-0:26:31] — receives a request, reacts, reads/writes data, responds. Best single explainer in the batch.
- **Deployment versioning**: voft0qZfkvw [0:03:20-0:04:24] — "your live app runs old code until you redeploy," a real backend concept most tutorials never make explicit.
- **Sheets as CRUD**: ghRiM6Vr0YM (write/create/delete) + JSrK4uHdVlQ (read) together cover the full loop.
- **Event triggers**: vIiuAkum30U's `onOpen` [0:03:21] as the simple case, I2r5vJAA8T0's `onFormSubmit` [0:06:01] with a real payload — good two-step ramp.

## Project seeds (teen scale, tagged with backend concept)
1. **Class feedback form + auto-confirmation email** (I2r5vJAA8T0) — trigger, payload, row write, response. Strongest single seed; touches nearly every core concept in one session.
2. **"Deploy your first web app"** (voft0qZfkvw) — `doGet` returning "Hello, [name]," deployed and shared. Entry point + access control + versioning trap.
3. **Custom menu mini-tool on a shared class sheet** (vIiuAkum30U) — `onOpen` + `createMenu` + `ui.alert`. Event triggers + UI feedback, week-1 warm-up.
4. **Class roster/leaderboard with idempotent sheet creation** (ghRiM6Vr0YM) — create/read/update Sheets safely on repeated runs. CRUD + idempotency, important given a forgetful AI that re-runs code.
5. **Auto-generated class quiz from a data list** (U3IWoAppDVY) — iterate structured data into a real Form quiz with points/feedback. Server-side validation as a bonus concept.
6. **"Generate my certificate" stretch feature** (I2r5vJAA8T0's PDF-blob trick) — attach an auto-generated PDF to the confirmation email.
7. **"Break it on purpose" deployment exercise** (voft0qZfkvw) — edit code, reload live exec URL (nothing changes), redeploy, reload again. Makes the versioning trap experiential.
8. **Debug-the-payload exercise** (I2r5vJAA8T0) — trigger a submit, open the raw JSON logged to a sheet, find a field by hand. Builds "look at the real data" against a hallucinating AI.

## Traps
- **Range/data shape mismatches** (ghRiM6Vr0YM, repeated 3+ times on screen) — the most concrete, most likely-to-recur trap in this batch.
- **Deployment not updating** (voft0qZfkvw) — the biggest "why didn't my change show up" trap for anything web-app shaped.
- **Bound-script confusion** ("where did my project go," JSrK4uHdVlQ + vIiuAkum30U).
- **Renaming a Form question silently breaks code that reads it by name** (I2r5vJAA8T0) — a "the data source changed shape under you" lesson in fixed contracts.
- **Incremental permission grants** (I2r5vJAA8T0) — sheet write can succeed while email send fails on a not-yet-authorized call; confusing if not flagged.
- **Style bleeding forward / child-index shifting** in DocumentApp (ia2KweduNUg) — lower priority (Docs isn't core) but good general examples of "state carries forward unless reset."
- **OAuth "app not verified" screen looking broken** — universal across the batch; needs a proactive heads-up, not a surprise.

## Honest caveat
This batch is genuinely useful for the plumbing (Sheets-as-database, triggers, permissions, deployment) but light on the frontend/backend split the course centers on — no HTML service pages, `google.script.run`, doPost/JSON API, or CORS/Netlify material anywhere in these ten. Pair with whichever other batch covers doGet/doPost and JSON APIs directly.
