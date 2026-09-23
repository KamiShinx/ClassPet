# Platform facts for the Apps Script + Gemini course (14-15 y/o, Israeli MoE student accounts)

Researched 2026-09-23. Students use **Israeli Ministry of Education (MoE) managed Google Workspace for
Education accounts** ("משתמש תלמיד של משרד החינוך"), not personal Gmail. They will generate code in the
**Gemini web app (gemini.google.com)** and paste it into the Apps Script editor — no API keys, no calling
the Gemini API from the app itself. Every claim below has a source and, where I could find one, a date.
Where I could not verify something (especially anything specific to the MoE's own admin configuration), I
say so explicitly — the teacher needs to test it with one real student account before relying on it.

---

## 0. THE MOE ACCOUNT — read this section first, it overrides assumptions elsewhere in this doc

### 0.1 Is Gemini available to MoE student accounts aged 14-15, which tools, what limits

The Ministry's own digital-learning portal lists the internationally licensed AI tools and their grade
gates. Fetched 2026-09-23 from **pop.education.gov.il** (Hebrew; my translation):
[כלי AI בין-לאומיים | משרד החינוך](https://pop.education.gov.il/sherutey-tiksuv-bachinuch/international-digital-ai-tools/ai-tools/)

- **Gemini** is listed with the note "קיים רישוי למשרד החינוך עבור צוותי חינוך ותלמידים" — "a license
  exists for the Ministry of Education for teaching staff **and students**" — gated to **grades 7-12**.
- The page's general rule: from **grade 8 up, students may use the approved AI tools independently**; for
  grades 5-7 the tool is operated by the teacher only, students don't get their own login. Since Gemini's
  own row says grades 7-12, a 9th-grade class (גיל 14-15, כיתה ט) is inside both gates — this checks out
  as usable, but the "grade 7 vs grade 8" wording is not fully consistent within the same page, so it's
  worth the teacher confirming the class's own grade is unambiguously covered.
- The page does **not** name a specific Gemini model, does **not** mention Apps Script, and does **not**
  mention Google AI Studio at all.
- Privacy instruction on the same page: don't put identifying student/teacher data (full names, ID
  numbers, grades) into the tool.

**Which model, and what "Pro has rate limits" means:** Google's own account of what "Gemini for Education"
grants is split across two different things, and I could not find a document that says which one Israel's
MoE actually turned on:

1. **"Gemini in Workspace" (the add-on / side panel inside Docs, Gmail, etc., and the Apps Script editor
   side panel)** — per Google's release notes this requires **Education Plus or the Teaching & Learning
   upgrade**, and starting 2026-02-03 (Rapid Release) / 2026-02-24 (Scheduled Release) is available "to
   users 18 years and older" in those editions. [Google Workspace Updates, Feb 2026](https://workspaceupdates.googleblog.com/2026/02/gemini-in-workspace-education.html)
   — i.e. **this specific product is gated 18+ even inside a school domain**, unless the admin has used
   age-based access controls to reclassify specific users, which a school would not normally do for
   14-year-olds.
2. **"Gemini app" access via Classroom / an admin-granted service** — Google's support page states the
   Gemini app is usable by education-domain users **13 years of age and older** once an admin turns it on
   ("Google Workspace for Education admins can turn on the Gemini app with added data protection as an
   additional service for their teen users, ages 13+"), and separately that **starting 2026-08-10, Gemini
   in Classroom expanded to K-12 students of all ages who have already been granted access by their
   admin**. [Gemini Apps Help — Education](https://support.google.com/gemini/answer/14620100?hl=en&co=DASHER._Family%3DEducation),
   [Workspace Updates, Aug 2026](https://workspaceupdates.googleblog.com/2026/08/gemini-in-google-classroom-is-expanding-to-users-of-all-ages-with-contextualized-Gemini-starter-prompts-for-students.html)

Given the teacher's own note that "Pro has rate limits," the MoE deployment most likely sits on a
**Google AI Pro for Education** style license (this is the same licence tier that unlocks the Gemini side
panel in the Apps Script editor — see §1b) rather than the bare free-tier Gemini app. That would explain
Pro-model access with compute/rate limits rather than a hard per-day prompt count (see §3 for what "Pro"
even means as of May 2026). **This is my inference, not a confirmed fact** — I found no MoE or Google page
that names the exact SKU Israel purchased. **Verify by having the teacher open gemini.google.com signed
in as one student and checking Settings → the plan name shown, and whether Canvas/Pro model selection is
present.**

### 0.2 Is Apps Script enabled for MoE student accounts, and can they deploy web apps

Not verifiable from public sources — this is a Google Admin console setting the MoE's central IT
sets per organizational unit, and it is not documented on the public MoE portal pages I could reach
(fetched 2026-09-23: [ענן חינוך Google | משרד החינוך](https://pop.education.gov.il/sherutey-tiksuv-bachinuch/anan-hinuch-google/)
names only Gmail, Drive, Meet and Classroom as the enabled apps — Apps Script and Gemini are not mentioned
either way, which tells us the portal simply doesn't document Apps Script access, not that it's off).

What I can confirm generically about Workspace for Education:
- Admins **can** turn Apps Script on/off for an entire org unit, or disable individual script projects,
  from the Admin console. [Monitor and control Google Apps Script use — Google for Developers](https://developers.google.com/apps-script/guides/admin/monitor-use)
- On Business Plus/Enterprise/Education Standard/Teaching & Learning Upgrade/Education Plus editions,
  admins can additionally restrict **which external domains** Apps Script (UrlFetchApp etc.) is allowed
  to reach. [Monitor & restrict OAuth scopes — Google for Developers](https://developers.google.com/apps-script/guides/admin/monitor-restrict-oauth-scopes)

**Action item for the teacher, unverified until tested:** open script.google.com signed in as one real
student account and confirm (a) the editor loads at all, (b) a trivial script can be saved and run, (c) a
web app deployment can be created. If Apps Script is blocked at the OU level the whole course plan needs a
different account (e.g. the teacher deploys and demos, or the school IT enables it for the class OU).

### 0.3 Web app access options under the Workspace for Education domain

Two things compound here, and both need testing with a real account before the course is built around
them:

1. **Deployment "Who has access" options.** A personal Gmail account deploying an Apps Script web app can
   choose "Anyone" (fully anonymous, no Google sign-in needed) or "Anyone with a Google account." A
   Workspace account gets an **extra, narrower option — "Anyone within [domain]"** — and multiple
   Apps Script community reports describe Workspace/Education admins **removing the fully-anonymous
   "Anyone" option entirely**, leaving only domain-restricted or Google-account-required choices.
   [No 'Anyone, even anonymous' option — Apps Script community](https://groups.google.com/g/google-apps-script-community/c/owFeX5fTcyo)
   This is admin-configurable and not something I can verify for the MoE specifically.
2. **Drive/Docs external-sharing defaults.** Google's own default for Education editions is
   **"Restricted"** (only explicitly-added people) with an org-wide option rather than a public-link
   option; whether "Anyone with the link" is even offered depends on the domain's sharing-options
   setting in the Admin console. [Manage external sharing — Google Workspace Help](https://support.google.com/a/answer/60781?hl=en),
   [About access settings — Classroom Help](https://support.google.com/edu/classroom/answer/11081157?hl=en-419)
   This setting is separate from Apps Script deployment access, but the two are usually locked down
   together by security-conscious school IT.

**Consequences if "Anyone" (anonymous) is blocked, which is a real possibility in a MoE domain:**
- **Classmates in the same domain** would still be able to open a `/exec` URL deployed as "Anyone within
  [domain]," since they're signed into the same Workspace.
- **A parent or outside visitor at a showcase**, not signed into a MoE account, would hit a Google sign-in
  wall or an access-denied page — the demo would need to run on a school laptop signed into a MoE account,
  or the deployment would need "Anyone" enabled (which the domain may not allow).
- **A page hosted elsewhere (e.g. Netlify) calling the deployed `/exec` endpoint with `fetch()`** would
  break for anonymous visitors if "Anyone" is disabled, because the browser has no MoE session and the
  request would redirect to a Google login page instead of returning JSON/text. If the domain does allow
  "Anyone," the CORS/redirect behavior in §5 still applies unchanged.

**This entire section is a "test before you build the curriculum around it" item.** Have the teacher
deploy one trivial "Hello World" web app from a student account, set it to each available access level,
and check from an incognito/private browser window (logged out of any Google account) whether the `/exec`
URL loads.

### 0.4 Other known MoE-domain restrictions relevant to the course

- **Drive sharing outside the domain**: governed by the same Admin-console "external sharing" setting as
  §0.3(2); not separately confirmed for MoE, but Israeli school Workspace domains are commonly configured
  to block or heavily restrict external sharing by default for child-safety/compliance reasons — this is
  a pattern across Workspace for Education generally, not an MoE-specific citation.
- **Third-party app / "Sign in with Google" access (relevant to Teachable Machine, which itself doesn't
  require Google sign-in, but relevant to anything that does)**: Workspace for Education domains can be
  set to **block all third-party API/OAuth access by default**, with admins allow-listing specific apps as
  "Trusted." Google explicitly documents a **separate, more restrictive review path for users flagged as
  under 18**, where the normal "request access to an app" self-service flow is unavailable and an admin
  must allow-list the app instead. [Control which apps access Workspace data](https://support.google.com/a/answer/7281227?hl=en),
  [Manage access to unconfigured third-party apps for under-18 users](https://support.google.com/a/answer/13288950?hl=en)
  Teachable Machine's own training/export flow (teachablemachine.withgoogle.com) does not require signing
  in with a Google account to use, so this mainly matters if the course adds any tool that does ask
  students to "Sign in with Google."
- **Google AI Studio**: separately from the MoE licensing question, AI Studio's own terms require the user
  to be **18 or older** to use the API (see the now-dropped §4, kept here as still-relevant background) —
  irrelevant to this course's workflow since students aren't using AI Studio or API keys at all, but worth
  knowing if a student asks why they can't just get an API key themselves.

### 0.5 Bottom line for §0

**Verified:** Gemini is Ministry-licensed for grades 7-12 including students, which covers a 14-15-year-old
class; the general independent-use gate is grade 8+; don't feed the tool identifying student data.
**Not verified, must be tested by the teacher with one real student account before the course is built
around it:** which Gemini model/tier the MoE account actually gets, whether Apps Script is enabled for
students, what web-app deployment access levels are offered, and whether "Anyone" (anonymous) access is
available for a Netlify page or a showcase audience to hit a deployed `/exec` URL.

---

## 1. How to build Apps Script with Gemini today

### (a) Gemini web app (gemini.google.com) chat/Canvas → copy-paste into the Apps Script editor
This is the workflow the teacher has chosen, so it gets the most detail.

- **Canvas** is Gemini's live, editable workspace: go to gemini.google.com, click "Canvas" below the
  prompt box, and describe the app — Gemini renders and lets you iterate on a doc, app, slide deck, or
  code in place, with changes shown as a diff you can accept/reject and auto-saved as you go.
  [Create docs, apps & more with Canvas — Gemini Apps Help](https://support.google.com/gemini/answer/16047321?hl=en&co=GENIE.Platform%3DDesktop) (fetched 2026-09-23, undated page)
- **What Canvas actually generates for a "web app" prompt**: independent write-ups consistently describe
  Canvas producing **client-side HTML/CSS/JS rendered in a sandboxed iframe preview** — a single
  self-contained page, not a client+server split. The sandbox explicitly blocks filesystem access,
  external network calls, and anything outside the iframe. If Gemini splits the output into separate
  HTML/CSS/JS blocks, the documented workaround is to explicitly ask: *"Give me this entire page as a
  single HTML file with all CSS and JavaScript inline."* [Gemini Canvas Exporter / community reports](https://chromewebstore.google.com/detail/gemini-canvas-exporter/kcliopdpkibbmeoifkkkolhjdmpkicgf?hl=en); corroborated by a Gemini Apps Community thread of a user unable to get Canvas to produce backend files for a Docker project. **Not an official Google statement** — Google's own Canvas help page doesn't document file-count behavior at all, so treat this as "consistently reported, not officially confirmed."
  - **Practical implication for this course**: Canvas does not natively think in terms of "Code.gs +
    Index.html" (Apps Script's actual two-file client/server split). The realistic classroom pattern is:
    ask Gemini for the **frontend HTML/CSS/JS** in Canvas, then **separately** ask it (in the same chat,
    or a follow-up prompt) for the matching Apps Script **server-side `.gs` functions** (`doGet`,
    `google.script.run` handlers, Sheet read/write code) as a plain code block in the chat — then paste
    each into the right file in the Apps Script editor by hand. Canvas's live preview is not useful for
    the server half at all, since it can't run Apps Script services (SpreadsheetApp, etc.) in its sandbox.
- **Memory across turns**: Google's own Canvas documentation does not state how much conversation context
  is retained turn-to-turn; this determines how much a student can revise iteratively before Gemini starts
  contradicting earlier code, and I could not find an official number. **Unverified — expect it to degrade
  over a long back-and-forth, and plan for "start a fresh chat if it gets confused" as a taught habit
  rather than relying on infinite memory.**
- **Pros for 14-year-olds**: zero setup (no CLI, no npm, no accounts beyond the one they already have), a
  visible live preview builds confidence, diff view teaches them to read what changed, works entirely in a
  browser tab identical to the one they use for everything else.
- **Cons**: copy-paste between two browser tabs is itself a source of classroom friction and errors (partial
  copies, wrong file, stale paste); Canvas's own preview cannot validate the Apps Script half at all, so
  "it worked in Canvas" doesn't mean "it will work once pasted into script.google.com" — Sheets-specific
  APIs, `doGet(e)`, and `HtmlService` behavior are invisible to Canvas; multi-file project structure has to
  be manufactured by the student/teacher through prompting discipline, not something the tool does for you.

### (b) Gemini built into the Apps Script editor itself
**It exists**, rolled out mid-to-late 2026, but **is not available on the free/personal tier** —
- Official doc: [Use the Gemini side panel in the Apps Script editor — Google for Developers](https://developers.google.com/apps-script/guides/gemini) (fetched 2026-09-23). It requires one of: **Google Workspace Business Standard/Plus, Enterprise Standard/Plus, a Workspace Gemini Add-on license, or Google AI Pro for Education / Google AI Pro / Google AI Ultra.** An admin must also enable Gemini/Generative AI features in the Admin console. The page describes the feature as still in a **"Gemini Beta program,"** available only to enrolled customers — no firm GA date found.
- Coverage: [AppsScriptPulse, Aug 2026 — "Gemini Side Panel Rolling Out"](https://pulse.appsscript.info/p/2026/08/google-apps-script-editor-gemini-side-panel-rolling-out/) and [AppsScriptPulse, Sep 2026 — "8 Practical Developer Workflows"](https://pulse.appsscript.info/p/2026/09/gemini-in-the-apps-script-ide-8-practical-developer-workflows-by-stephane-giron/) confirm it generates code across the manifest/`.gs`/HTML files, edits existing code, and debugs runtime errors — i.e. this would actually solve the multi-file problem in (a) if the class had access to it.
- **For this course**: whether this is available depends entirely on whether the MoE's Gemini licence for
  students is one of the qualifying tiers (see §0.1) and whether the domain admin turned the Beta on —
  **unverified, worth having the teacher check the Apps Script editor's side panel for a Gemini/spark icon
  on a real student account before assuming it isn't there.** If it is there, it's a meaningfully better
  workflow than (a) because it edits `.gs`/`.html` files directly and can iterate against real execution
  logs.

### (c) Google AI Studio "Build" (full-stack vibe coding)
- Google AI Studio's "Build" mode generates **full-stack apps with Firebase for auth/database**, deployable
  with one click to **Cloud Run or Firebase Hosting** — launched 2026-03-19, and is free.
  [Introducing full-stack vibe coding in AI Studio — blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/full-stack-vibe-coding-google-ai-studio/)
- It **does not target Apps Script** — its output stack is Firebase/Cloud Run, a different platform
  entirely from `HtmlService` + `.gs` + Sheets. There's no path from AI Studio's Build output into the
  Apps Script editor.
- Moot for this course anyway: AI Studio's own terms require the user to be **18+** (§0.4), and the
  teacher has already confirmed students won't be using AI Studio at all. Included here only to close out
  the original question — **not a workflow to build the course around.**

### (d) Gemini CLI / Google Antigravity + clasp
- `clasp` is Google's official CLI for syncing local files to an Apps Script project (push/pull,
  version control, etc.). [google/clasp — GitHub](https://github.com/google/clasp)
- Community tooling connects Gemini CLI or the Antigravity IDE to clasp (and a local Apps-Script emulator,
  `gas-fakes`) via MCP, letting an agent generate/test/push Apps Script code from a local editor instead of
  the browser IDE. [tanaikech gist, "Streamlining GAS Development with Gemini CLI Extensions and VSCode"](https://gist.github.com/tanaikech/0e12338ca99bbddc51fe69c07a1bc36f);
  [Antigravity + Apps Script + gas-fakes — tanaikech](https://tanaikech.github.io/2025/11/21/next-generation-google-apps-script-development-leveraging-antigravity-and-gemini-3.0/)
- **Not realistic for this class**: requires local Node.js install, npm, a terminal, `clasp login` OAuth,
  and — as of 2026-06-18 — **Gemini Code Assist's free individual tier and the old Gemini CLI free tier
  were both discontinued**, with users redirected to Antigravity CLI/Antigravity instead. [GitHub issue tracking the change](https://github.com/benjamincanac/whichcodingtools/issues/124)
  That's a moving target and real installation/auth overhead for 14-year-olds in a single classroom
  period. Fine for an advanced/extension track, wrong default for the whole class.

### (e) Gemini Code Assist free tier
- Briefly free for individual developers starting **March 2026** (6,000 completions/day at that time), but
  **the free "for individuals" tier was discontinued 2026-06-18**, with Gemini Code Assist IDE extensions
  and Gemini CLI both migrated to Antigravity. [yangmao.ai deal tracker](https://yangmao.ai/en/deals/google-gemini-code-assist-free-tier-expanded-2026-06-04/),
  [GitHub issue #124](https://github.com/benjamincanac/whichcodingtools/issues/124)
- Irrelevant to this course either way — it's an IDE autocomplete/agent product (VS Code/JetBrains), not
  something that touches the browser-based Apps Script editor or Sheets.

### Recommendation for this class
Given the teacher's correction (Gemini web app only, no API keys, no CLI installs), **workflow (a) is the
only realistic option unless (b) turns out to be available on the school's licence** — in which case (b)
is strictly better and worth switching to, because it eliminates the copy-paste failure mode and can see
real Apps Script errors. **The one thing worth doing before day one of the course: have the teacher check
a real student account for the Gemini spark icon inside script.google.com's editor.** If it's there, teach
that. If not, teach (a) and explicitly build in the "ask for the frontend, then separately ask for the
matching .gs backend, paste both by hand" pattern as a named step in the lesson plan, since Canvas will not
do that split on its own.

---

## 2. Age rules (personal-account version, kept for reference; §0 has the MoE-specific version)

- **Gemini app, personal/school account**: minimum age 13 (or higher national minimum — 16 in
  Ireland/Netherlands/Poland/Germany, 15 in France/Denmark, 14 in Spain/Italy), verified as current
  2026-07-27. [While You Create — Gemini minimum age by country](https://whileyoucreate.com/blog/en/gemini-minimum-age-by-country);
  [What you need to sign in to Gemini Apps — Gemini Apps Help](https://support.google.com/gemini/answer/13278668?hl=en)
- **Under-13 on a personal/Family-Link account**: can use Gemini only via a parent-managed Family Link
  account with the Gemini toggle explicitly turned on; not available at all in the EEA, Switzerland, UK.
  [Guide your child's Gemini Apps experience](https://support.google.com/families/answer/16109150?hl=en)
- **Teens 13-17**: get a distinct "Gemini Teen Experience" — under-18 users cannot generate images with
  Gemini by default, and their conversations are not used for AI training. [search-sourced, not an official single page — see §2 caveat below]
- **Google AI Studio / Gemini API key creation**: **18+ only.** The API terms state plainly "You must be
  18 years of age or older to use the APIs." [Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms) (fetched 2026-09-23)
  A 14-year-old cannot legitimately create a Gemini API key in AI Studio on their own account, personal or
  MoE. (This section is moot for the actual course design per the teacher's correction, but is worth
  knowing if a curious student asks.)
- **Caveat**: I could not find one single authoritative Google page laying out the *complete* teen-specific
  feature-toggle list (image gen off, Voice Match off under 13, etc.) — the picture above is assembled from
  several support pages and secondary summaries and should be treated as **broadly right, not
  page-by-page verified.**

---

## 3. Gemini Pro vs free — what it means in Sept 2026

- **"Gemini Pro" for an individual today = the Gemini 3.1 Pro model**, reachable either free (with tight,
  compute-based limits) or with much higher limits under a paid **Google AI Pro** subscription
  ($19.99/mo) or **Google AI Ultra**. [Gemini API pricing page, fetched 2026-09-23](https://ai.google.dev/gemini-api/docs/pricing) lists Gemini 3.1 Pro as **paid-tier only** on the *API* side, while the consumer Gemini *app*'s free tier gives access to Gemini 3 Flash/Flash-Lite and only occasional/limited Pro use.
- **How usage limits actually work as of Sept 2026**: Google **stopped counting a fixed number of prompts
  per day starting 2026-05-17** and switched the Gemini app to a **compute-based budget that refreshes
  every 5 hours inside a weekly cap** — a short Flash question costs a sliver of budget, a Pro-model or
  Deep-Research request costs much more. Free tier gets "standard" compute; Google AI Plus ($4.99) gets
  2x, Google AI Pro ($19.99) 4x, Google AI Ultra 5x-20x. [Gemini Apps limits & upgrades — Gemini Apps Help](https://support.google.com/gemini/answer/16275805?hl=en) (fetched 2026-09-23); corroborated by press coverage e.g. [TechBuzz.ai, "Does Gemini Have a Limit?"](https://www.techbuzz.ai/articles/does-gemini-have-a-limit-usage-caps-explained)
  and [Tom's Guide](https://www.tomsguide.com/ai/geminis-free-tier-is-capped-at-5-prompts-heres-how-to-get-more-without-upgrading) (describing the pre-May-2026 5/day figure that this replaced).
- **Free-tier context window**: 32K tokens on the free Gemini app tier per Google's own limits page (vs.
  larger windows on paid tiers). [Gemini Apps limits & upgrades](https://support.google.com/gemini/answer/16275805?hl=en)
- **Gemini API free tier (background only — not used by this course per the teacher's correction)**:
  Google's rate-limits doc no longer publishes a fixed universal table; it directs developers to check
  their live limits in the AI Studio dashboard, stating only that limits are **per-project, not per API
  key**, vary "by usage tier," and reset daily quotas at midnight Pacific. [Rate limits — Gemini API docs](https://ai.google.dev/gemini-api/docs/rate-limits) (fetched 2026-09-23). Third-party trackers report
  numbers like ~10 RPM / 250K TPM / ~250-500 RPD for `gemini-2.5-flash` on the free API tier, but these are
  **not from an official fixed table and conflict between sources** — treat as indicative only, and
  irrelevant to this course's actual design since no API keys are involved.
- **A free "Google AI Pro for students" offer exists** (12 months free, US college students, requires
  SheerID-style enrollment verification **and a payment method on file** for auto-renewal after the trial).
  [blog.google — student offer](https://blog.google/innovation-and-ai/products/gemini-app/student-offer-google-ai/)
  **Not applicable here**: it targets higher-ed students, not 14-15-year-olds, and requires entering a
  card — not something to set up for a minor's own account. The MoE's own school-wide license (§0.1) is
  the relevant path for this class, not this consumer offer.
- **Would 15 kids in one room hit limits?** With the compute-budget model, this is no longer a simple "N
  requests, N kids" arithmetic question, and Google doesn't publish the conversion rate from
  "prompt complexity" to budget. If the class is in fact on a paid Google AI Pro-for-Education-style
  license via the MoE (see §0.1), the 4x/5x multiplier over "standard" free-tier compute should give real
  headroom for 15 students doing typical Canvas back-and-forth in a single period — but this is inference,
  not a verified number. **Unverified — worth a real-world test: have the whole class hit Gemini
  simultaneously during a dry run and see if anyone gets throttled.**

---

## 4. (Dropped per teacher's correction)
The Gemini-API-from-Apps-Script question (`UrlFetchApp` → `generativelanguage.googleapis.com`) is **out of
scope** — students are not using API keys or calling the API directly. Kept as a heading only so this
document's numbering matches the original 6 questions.

---

## 5. Apps Script platform facts relevant in 2026

- **V8 runtime language support**: Apps Script's V8 runtime supports modern JS syntax including
  Promises and `async`/`await`. [V8 runtime overview — Google for Developers](https://developers.google.com/apps-script/guides/v8-runtime), corroborated by [Justin Poehnelt, "Promises, async and await in Google Apps Script"](https://justin.poehnelt.com/posts/apps-script-async-await/)
  and a Google Workspace dev blog post of the same title. **Caveat that matters for teaching**: almost none
  of Apps Script's own built-in services (SpreadsheetApp, HtmlService, etc.) are actually asynchronous —
  they're synchronous under the hood — so `async`/`await` mostly has nothing real to await server-side; the
  one genuinely async native API is `WebAssembly.instantiate()`. **Top-level `await` is not supported** —
  it only works inside an `async function`. Practically: don't teach `async`/`await` as a needed pattern
  for basic Sheets/HtmlService work; it's there if a student reaches for it, but it isn't buying them much.
- **HtmlService sandbox**: **IFRAME is the only supported sandbox mode** — the old NATIVE/EMULATED modes
  were deprecated back in 2015 and are fully sunset. [Migrate to IFRAME Sandbox Mode — Google for Developers](https://developers.google.com/apps-script/migration/iframe),
  [Enum SandboxMode](https://developers.google.com/apps-script/reference/html/sandbox-mode)
- **Camera/microphone in HtmlService pages**: I could **not find an official Google statement** saying
  this explicitly for Apps Script's iframe. What's confirmed is the general mechanism: IFRAME mode serves
  the page inside a sandboxed `<iframe>`, and standard browser security requires an explicit
  `allow="camera; microphone"` attribute on that iframe for `getUserMedia()` to work in *any* sandboxed
  iframe — and Apps Script's HtmlService does not expose a way to add that attribute to its own generated
  iframe. **Treat "camera/mic are blocked in HtmlService" as very likely true by mechanism, but not
  independently confirmed by an official Google page — worth a 2-minute live test (try `getUserMedia()` in
  a deployed web app) rather than taking on faith**, especially since this would matter a lot if the course
  ever wants to combine Apps Script with Teachable Machine's webcam features.
- **CORS behavior for a `/exec` web app called from an external page (e.g. Netlify)**:
  - Apps Script web apps only support **GET and POST**, not the `OPTIONS` preflight verb — so they
    **cannot support CORS preflight at all**, which is why calls with `Content-Type: application/json`
    fail. [Struggling with CORS in Google Apps Script? — Medium](https://diyavijay.medium.com/struggling-with-cors-in-google-apps-script-heres-the-fix-e3eec09f07dd);
    corroborated by an Apps Script community thread.
  - **Workaround**: send the POST body with `Content-Type: text/plain;charset=utf-8` instead of
    `application/json` (still send JSON *text* in the body, just under a MIME type that qualifies as a
    "simple request" and skips preflight), then `JSON.parse()` it server-side in `doPost(e)`.
  - **Redirect to googleusercontent.com**: Content returned by Apps Script's Content service is served via
    a one-time redirect to `script.googleusercontent.com` — any HTTP client (including browser `fetch`)
    calling a deployed `/exec` URL must follow redirects (the default for `fetch`), or it will only see a
    302 and no body. [Content Service — Google for Developers](https://developers.google.com/apps-script/guides/content)
  - Combined with §0.3: if the MoE domain restricts the deployment to signed-in domain users only, none of
    this CORS mechanics matters for an anonymous external caller — they'll hit a Google login wall before
    any of it applies.
- **Quotas** (official, [Quotas for Google Services — Google for Developers](https://developers.google.com/apps-script/guides/services/quotas), fetched 2026-09-23):
  - UrlFetch calls/day: **20,000 (Consumer) / 100,000 (Workspace)**
  - Script runtime per execution: **6 minutes**, identical on Consumer and Workspace — upgrading account
    type does not raise this ceiling.
  - Simultaneous executions: **30 per user**, 1,000 per script project.
  - Total trigger runtime/day: **90 minutes (Consumer) / 6 hours (Workspace)**.
  - A MoE Education Workspace account should count as "Workspace" tier for these numbers, but this wasn't
    separately confirmed for Education editions specifically vs. Business editions — **unverified for the
    Education SKU precisely, though there's no indication Education is lower than Business.**
- **LockService**: provides `getDocumentLock()`, `getScriptLock()`, `getUserLock()` as mutual-exclusion
  locks to serialize concurrent writes (e.g. multiple students' web app instances all appending rows to
  the same Sheet at once) — a document lock blocks other executions touching the *same* document but lets
  executions on *different* documents proceed in parallel; a script lock blocks *all* concurrent executions
  regardless of user. [LockService reference — Google for Developers](https://developers.google.com/apps-script/reference/lock) (dated by Google as updated 2026-04-13).
  **Directly relevant to this course**: if the class design has 15 students' deployed web apps all writing
  to one shared Sheet (e.g. a shared leaderboard), teach `LockService.getScriptLock()` + `tryLock()` around
  the write, or students will lose data to race conditions the first time two of them submit at once.
- **"Unverified app" OAuth warning**: appears when a script requests sensitive/restricted scopes (Gmail,
  Drive, Calendar, Contacts, etc.) without completing Google's app-verification review. For an app with
  **fewer than 100 users**, the developer and those users can still click through the warning
  indefinitely — but once triggered, the app is subject to a **hard, non-resettable 100-lifetime-user cap**
  (a new OAuth client or redeploy doesn't reset the counter). [OAuth Client Verification — Google for Developers](https://developers.google.com/apps-script/guides/client-verification);
  general background at [Unverified apps — API Console Help](https://support.google.com/googleapi/answer/7454865?hl=en&ref_topic=7013279).
  For a class of 10-15 this cap is a non-issue in practice, but it's worth teaching students not to publish
  their toy web app link publicly beyond the class. Inside a Workspace for Education domain, an admin can
  also mark internal apps as trusted, which may suppress this screen entirely for domain-internal use —
  **unconfirmed for the MoE domain specifically.**

---

## 6. Teachable Machine in 2026

- **Still live and reachable** at teachablemachine.withgoogle.com; Google's own creative-lab GitHub repo
  (`googlecreativelab/teachablemachine-community`) is still receiving user bug reports through 2026 (issues
  opened March/April/May 2026 tagged "something isn't working"), which indicates the tool is still in
  active use but **I found no evidence of it being actively maintained/patched by Google in 2026** — the
  presence of open, unresolved bug reports over several months is at minimum a caution flag, not a
  confirmation of abandonment. [Issues — googlecreativelab/teachablemachine-community](https://github.com/googlecreativelab/teachablemachine-community/issues) (fetched 2026-09-23). **Unverified**: I could not find an official statement from Google about Teachable Machine's maintenance status one way or the other in 2026 — treat "is it still maintained" as an open question, not a settled fact.
- **Export formats**: Teachable Machine has always offered both (1) an auto-generated **hosted TF.js model
  link** (a URL you load at runtime, no download needed) and (2) a **downloadable model bundle** for local
  hosting — this matches the tool's long-standing design and nothing in 2026-dated sources suggests this
  changed, but I did not find a 2026-dated page re-confirming it (the codelab and export UI references
  found were undated or older). **Treat as likely-still-true by continuity, not freshly verified.**
- **Library versions (`tmImage`, `tmPose`, speech-commands) and TF.js compatibility**: older, widely-copied
  tutorial code pins `@teachablemachine/image@0.8.3`/`0.8.4` against `@tensorflow/tfjs@1.3.1` — a
  **2019-era TF.js version**. [npm search results / node-red-contrib-teachable-machine changelog](https://github.com/bonastreyair/node-red-contrib-teachable-machine/blob/main/CHANGELOG.md)
  I was **not able to confirm a current/2026 version number** for `@teachablemachine/image` — npm's own
  page returned a 403 to automated fetching, and no 2026-dated source stated a newer release exists.
  **This is the single biggest unresolved risk for the course if it plans to use Teachable Machine**: if
  the package hasn't had a real release since ~2019-2021 while TensorFlow.js itself has moved forward
  multiple major versions, there's real risk of breakage (deprecated TF.js APIs, WebGL backend changes,
  browser API changes) that won't show up until someone actually tries it live in a current browser.
  **Action item: before building any lesson around Teachable Machine, have someone load a fresh
  Teachable-Machine-exported model in a brand-new HTML page today, in the actual browser the classroom
  will use, and confirm it runs without console errors** — don't trust the tutorial snippets found online,
  they're years old.

---

## Recommendations for the class

1. **Teach workflow 1(a) as the default** (Gemini web app chat/Canvas → hand-paste into the Apps Script
   editor), because it's the only workflow that requires zero extra accounts, installs, or permissions
   beyond what the MoE has already provisioned, and matches the teacher's explicit choice. **But before
   day one**, have the teacher check one real student's Apps Script editor for a Gemini side-panel icon
   (§1b) — if the school's licence includes it, switch to that instead: it solves the multi-file
   `Code.gs`/`Index.html` problem that Canvas does not solve on its own, and it can read real execution
   errors.
2. **Explicitly teach the "ask for the frontend, then separately ask for the matching .gs backend" step**
   as its own lesson beat, not an assumed skill — Canvas defaults to single-file client-side output and
   won't produce Apps Script server code unless asked for by name, and won't structure a two-file project
   without being told to.
3. **Resolve the four §0 unknowns before finalizing the syllabus, not during week one**: (a) which Gemini
   model/tier the MoE license actually grants, (b) whether Apps Script is enabled at all for the student
   OU, (c) what web-app deployment access levels the domain permits (this decides whether a showcase for
   parents or a Netlify frontend is even possible without everyone being signed into a MoE account), (d)
   whether the domain blocks third-party sign-in flows the course might later want to add. All four are a
   single 15-minute test with one student account, and all four are load-bearing for how the course can be
   structured.
4. **Build in `LockService` from the first lesson that has students writing to a shared Sheet** — with
   10-15 kids testing web apps that write to the same spreadsheet, unguarded concurrent writes will produce
   confusing, hard-to-debug data loss on exactly the first day multiple students submit near-simultaneously.
   Teaching the lock as a "just do this" pattern early avoids a debugging detour later.
5. **Don't build a lesson around calling the Gemini API from Apps Script** (matches the teacher's decision)
   — even setting aside the "no API keys" choice, the API's own terms require users to be 18+, which a
   14-15-year-old's own key creation would violate regardless of account type.
6. **Treat Teachable Machine as needing a live smoke test before it goes in the lesson plan**, not as a
   known-good dependency — the export libraries look stale (last clearly-dated version info is from
   ~2019-2021) against a TensorFlow.js ecosystem that has moved on, and nothing 2026-dated confirms current
   compatibility one way or the other.
7. **Plan the CORS/redirect mechanics in §5 as a single explicit lesson** if the course includes a page
   hosted outside Apps Script (e.g. Netlify) calling a deployed `/exec` endpoint: text/plain trick to dodge
   preflight, and following the redirect to script.googleusercontent.com. This is exactly the kind of thing
   that "just doesn't work" for a 14-year-old without someone naming the two specific gotchas up front.
