# Batch G1: backend explainers for teens + PBL classroom practice

## Overview
Six short explainers (1-8 min) cover API/frontend/backend/database/HTTP/SQL; five PBL videos (four Edutopia "Keys" pieces, one TEDx) cover classroom structure. The explainers **agree** on one shape: user -> frontend -> API/request -> backend (logic) -> database, round trip back. Where they differ is depth and honesty about oversimplifying. **Tamara Jost** (NzEYYemQ3_8) is the strongest of the six: one running example (Tina/Airbnb), a diagram that visibly builds, a write not just a read, an external API call, an explicit "CONTAINS OVERSIMPLIFICATION" disclaimer card at the end. **MuleSoft** (s7wmiS2mSXY) and **Codecademy** (1mXrxc_sv1o) are thin, single-analogy, promo-flavored — good only as 60-90s cold-opens (waiter; store showroom/storeroom). **Fireship's SQL** (zsjvFFKOm3c) and **IBM's database** (hRulZhTtUTg) are correct but pitched at adults/developers — Fireship's table/primary-key/foreign-key section is the batch's best relational-data explainer once slowed down and stripped of SQL syntax (we have no SQL layer). **Connected Cookie's HTTP** (KvGi-UDfy00) is the sleeper: the only video that names statelessness, breaks down a URL, and separates GET/POST — maps almost 1:1 onto `doGet`/`doPost` and deployment URLs.

The PBL videos agree with each other closely (same "5 keys" framework, same interview subjects across three videos): real-world connection, core-to-learning (not fluff), structured collaboration with defined roles, student-driven with heavy upfront scaffolding, and continuous multifaceted assessment (fist-to-five, thumbs checks, peer feedback, public culminating event). The Kory Lloyd TEDx talk is the outlier — thin as a PBL definition, valuable only for one thing: a vivid, real, large-scale, cross-disciplinary student project (a rideable Mech) as an upper-bound existence proof. **Cut**: the first 7 minutes of that talk (pure biography), the "two loves" back half of Joe Ruhl's talk (inspirational, not a mechanism), and the IBM/MuleSoft corporate-history and self-promotion segments.

## Concept explainers worth reusing
- Pneumatic-tube API analogy — NzEYYemQ3_8 [0:01:06]-[0:01:39]
- Full 5-box diagram (User/Frontend/API/Backend/Database) built incrementally — NzEYYemQ3_8 [0:01:10]-[0:02:30], reusable as a whiteboard sequence
- "Business logic filters/calculates before responding" — NzEYYemQ3_8 [0:02:13], [0:02:40]
- Primary key / foreign key via two linked tables (Teams/Players) — zsjvFFKOm3c [0:00:33]-[0:01:06], visual at [0:00:40]-[0:01:00]
- URL anatomy (protocol/domain/path/parameters) — KvGi-UDfy00 [0:01:04]-[0:01:34], diagram [0:01:10]-[0:02:00]
- Statelessness + why cookies/sessions exist — KvGi-UDfy00 [0:00:30]
- Status codes by category incl. 404 causes — KvGi-UDfy00 [0:02:07]-[0:02:40]
- Client-store analogy for "user can't touch the database directly" — 1mXrxc_sv1o [0:00:00]-[0:00:32]

## Project seeds
1. **Class poll/vote app** — write a row per vote, read+tally rows back (writing rows, reading them back, basic concurrency if two kids vote at once)
2. **Two-tab lookup app** (e.g. "members" + "teams" tabs linked by an id) — foreign-key-style joins without SQL (relational thinking, `.gs` lookup logic)
3. **Guestbook / comment wall** — CRUD on rows anyone can add to, one can delete their own (CRUD, ownership/permissions)
4. **"Teach the class" demo app** — a pair explains their own app's request/response cycle live (core-to-learning assessment, request/response literacy)
5. **Deliberately-broken deployment exercise** — misconfigure permissions/URL, have kids diagnose the status code (HTTP status codes, debugging deployment)
6. **Score/state tracker across sessions** — proves statelessness by failing first, then fixed by storing state in the Sheet (statelessness, persistence)
7. **Teachable-Machine feeds a Sheet** — browser-side ML model result posted to backend and logged (client-side AI + backend logging, image upload workaround for blocked camera)
8. **Public culminating demo night** — deployed apps shown to parents/other classes through the class's own hub (multifaceted assessment, real audience)

## Traps
- Kids assuming Gemini needs SQL-flavored prompts ("select rows where...") — there's no SQL layer; describe logic in plain English instead (zsjvFFKOm3c mismatch)
- Backend doing all filtering in the frontend instead of the `.gs` layer — call out NzEYYemQ3_8's "business logic" box explicitly to prevent this
- Assuming the backend "remembers" the last request — statelessness will bite any running-score/login feature unless state is explicitly stored in the Sheet
- Worksheet-driven "PBL" that isn't actually student-driven — GExtTQytNNo warns against pre-written step lists, a real risk if Ben hands out exact prompts to paste into Gemini
- Under-budgeting prep time — Joe Ruhl's menu system took him years to build; a first-time PBL+AI-coding combination needs the same honesty about setup cost

## Concept ladder
Teaching order, with the best explainer for each concept:
1. **Client vs. server** (who can touch what) — 1mXrxc_sv1o (store analogy, 90s)
2. **Frontend / backend / database / API, the full loop** — NzEYYemQ3_8 (whole video; the one to actually teach from)
3. **HTTP mechanics: requests, URLs, GET/POST, status codes, statelessness** — KvGi-UDfy00 (whole video)
4. **Rows/columns as records, primary key** — zsjvFFKOm3c [0:00:33]-[0:00:50] only
5. **Relating two tables (foreign key / lookup)** — zsjvFFKOm3c [0:00:50]-[0:01:06], paired with project seed #2
6. **Backend as more than storage (business logic, third-party API calls, async side effects)** — NzEYYemQ3_8 [0:02:13]-[0:03:53] revisited
7. **Why a database beats a shared file, and what a server layer buys you (security, scaling)** — hRulZhTtUTg, three-tier section only [0:02:37]-[0:04:37]
8. **External frontend calling a hosted backend (the year-end Netlify pivot)** — not covered by this batch; flagged as a gap for another batch to fill.
