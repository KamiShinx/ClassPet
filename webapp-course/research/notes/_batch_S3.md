# Batch S3 — Laurence Svekis Apps Script channel (10 videos)

## Overview
Of 10 videos, only **2 are real web-app content**: `WU-rsx6M8mI` (fetch a public Sheet as JSON via Google's gviz endpoint, render it) and `1cIkUafhhIk` (a real HTML frontend uploading files to Drive via `google.script.run`). The other **8 are Docs/Sheets/Drive/Slides/email automation with little to do with web apps**: no HTML frontend, no `doGet`/`doPost`, no HTTP request/response anywhere. Two pairs are effectively duplicated content: `N5N2oyF4Ok4` and `yBX6E-6YUz8` are the same "email the selected row" lesson (captions vs Whisper transcript of what looks like the same recording); `OuchTYb0vYY`/`TW5ZFyo0FwI`/(`N5N2oyF4Ok4`) all reteach the identical `onOpen()`+`createMenu()`+`addItem()` custom-menu boilerplate. Say this plainly per the brief: this batch is mostly *not* about web apps.

## Where videos agree
Every video that creates a Google resource (Doc, Sheet range, Drive file, Slide) uses the same "create or get by ID, then act on it" idiom — `getFolderById`, `getFileById`, `openById`, `DocumentApp.create()` — reinforcing one clean, reusable mental model: resources have durable IDs, and every service's API is built the same way around them. Every video that needs elevated access shows the live OAuth-style consent screen honestly (Drive edit, Slides access, send-as-you email) — good, authentic material for teaching "the browser/account is asking permission for a specific capability," a real 2026-relevant UX kids will actually see.

## Where they contradict / diverge
`WU-rsx6M8mI`'s gviz approach treats "API" as a public, read-only, no-deployment spreadsheet feed; `1cIkUafhhIk` treats it as a real client→server(`google.script.run`)→Drive round trip with explicit permission scoping and a deployed, access-restricted web app. These are architecturally opposite (public/read-only vs private/deployed/read-write) and should be taught as a contrast, exactly as flagged in batch S2's notes for the same channel's `doGet`-vs-gviz split. `nVQKj1zcfak` (Docs) shows **additive** updates (re-running adds more content) while `OuchTYb0vYY` (Sheets dedup) shows **overwrite** semantics (`clearContents()` then `setValues()`) — worth teaching explicitly as "check whether a service adds or replaces before you assume either."

## What to cut
Cut one of `N5N2oyF4Ok4`/`yBX6E-6YUz8` outright — they are the same lesson. Don't reteach the `onOpen`+`createMenu` menu pattern three separate times; show it once (best isolated explanation is `TW5ZFyo0FwI`, 6 min, cleanest single example) and treat `OuchTYb0vYY`'s and `N5N2oyF4Ok4`'s copies as reference only. None of the 8 automation videos should be used to teach "what is a backend" (client/server, HTTP) — they teach server-side scripting against Google services, which is a different (related but distinct) skill.

## Concept explainers worth reusing
- URL as configurable request + response cleanup + real DOM rendering from messy JSON: `WU-rsx6M8mI` [0:04:50]-[0:22:04], the best single "here's what a real, unfriendly API response looks like" material in the batch.
- Async `FileReader`/base64 upload → `google.script.run` round trip, including live debugging of a data-shape bug: `1cIkUafhhIk` [0:09:18]-[0:31:03].
- Iterator pattern (`hasNext()`/`next()`) vs array loops: `F0pHi8KomTU` [0:03:22]-[0:04:33].
- "Container vs content" object model (Doc vs Body; same idea generalizes to Sheet vs Range, Presentation vs Slides): `nVQKj1zcfak` [0:04:00]-[0:05:05].
- `getActiveRange()`/`getRow()` reading user intent from a UI selection: `N5N2oyF4Ok4` [0:02:42]-[0:04:22].

## Project seeds (rewritten at teen scale, tagged with backend concept)
1. **Zero-deploy class data viewer** — publish a class Sheet, fetch via gviz `tq`, render as a colored table. *Teaches: request/response, JSON cleanup, data-driven styling.* (from `WU-rsx6M8mI`)
2. **Photo/PDF drop box** — file picker uploads to a Drive folder via `google.script.run`, returns a link. *Teaches: async FileReader, client→server calls, Blob creation, permissions.* Natural pairing with Teachable Machine later (swap "store the file" for "classify the image"). (from `1cIkUafhhIk`)
3. **Class file gallery** — list a shared Drive folder's files with names/links in a page. *Teaches: iterators, resource IDs, connecting Drive data to a UI.* (from `F0pHi8KomTU`)
4. **Certificate/report generator** — fill a Slides template per student, convert to PDF, email it. *Teaches: cross-service orchestration, Blob conversion, options-object parameters, cleanup.* High wow-factor end-of-unit project. (from `Mfhx8wPJLe4`)
5. **Auto-generated class journal/report doc** — script appends a dated entry to a Doc each run. *Teaches: create-vs-reopen-by-ID, additive vs overwrite updates.* (from `nVQKj1zcfak`)
6. **"Notify a classmate" button** — select a row, click a menu item, email that person. *Teaches: reading UI selection, one-line email service call.* Minor warm-up, not a milestone. (from `N5N2oyF4Ok4`)
7. **Cleanup utility for a class roster** — menu button removes duplicate sign-ups. *Teaches: read-transform-write, basic array algorithms.* Minor. (from `OuchTYb0vYY`)

## Traps
0-indexed array vs 1-indexed sheet row math, recurring across `OuchTYb0vYY`, `gWO1wU-gDRI`, `Mfhx8wPJLe4` — the single most repeated bug class in this batch. The gviz JSON-that-isn't-JSON wrapper needing a fragile string-replace fix (`WU-rsx6M8mI`) — will silently break if Google changes the wrapper text. Sending unstructured base64 data to the server without separating mime type, a real live bug in `1cIkUafhhIk` that is a strong, concrete example of the kind of silent data-shape failure CONTEXT.md warns a weak/forgetful AI will produce and a kid won't catch without testing. Calling the wrong `getXById` (Folder vs File) — an easy copy-paste mistake with a non-obvious error, hit live in `Mfhx8wPJLe4`. Forgetting `.saveAndClose()` before reading a mutated Slides/Docs object, so changes appear lost (`Mfhx8wPJLe4`). Function names needing to be passed as strings to `addItem`/menu arrays — hit live in two separate videos (`N5N2oyF4Ok4`, implied elsewhere). Assuming all Apps Script writes behave the same way (overwrite vs additive) — differs per service and isn't obvious (`nVQKj1zcfak` vs `OuchTYb0vYY`).
