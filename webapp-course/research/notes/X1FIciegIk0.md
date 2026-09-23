# Create a Professional Dashboard in MINUTES with Google Gemini 3 (Step-by-Step) (Mohammad Rameez Imdad, 8.1 min)

**What it is:** demo of **Google AI Studio "Build" mode** (Gemini 3) generating a dashboard app from one plain-English prompt — explicitly **not** Apps Script/Sheets. The narrator states this outright near the end. Late 2025/2026 (Gemini 3 described as "launched just a few hours ago").
**Substance:** mixed — thinner than a tutorial, but it's the only video in the batch that shows an AI actually writing code live from a prompt, end to end, which is directly relevant to "how AI-assisted building actually goes."

## Ideas, in the video's order
- [0:01:43] Narrator demos a separate **game** also built by this AI tool (a car-driving game), establishing the tool is general-purpose, not dashboard-specific.
- [0:02:18 - 0:02:54] The actual prompt used, read aloud and shown on screen: a single paragraph asking for a dark/light theme income-expense dashboard, 60 days of demo data, a settings page, an add-income/expense form, a 3x3 grid of charts (bar/line/donut), "make the dashboard visually amazing." Narrator explicitly frames this as deliberately unsophisticated ("not a high-class programmer level prompt... too much common, too much easy") to show that plain conversational prompting works — directly relevant evidence for how Gemini-driven vibe-coding actually performs from an ordinary prompt, which is exactly our class's approach.
- [0:03:28] Narrator explicitly contrasts this with "normal" AI chat coding: "we need to tell them the CSS properties, JavaScript functionalities... here I just enter simple human-level language" — a real, stated observation about how much detail a prompt needs (or doesn't) to get a working result.
- [0:03:36 - 0:04:35] Model choice offered: **Angular TypeScript or React TypeScript** — the tool generates a full typed frontend framework project, with an explicit note that the AI **"rethinks" and self-corrects errors** in its own generated code without the user needing to fix them ("if any error in its written code, it will solve automatically").
- [0:04:35 - 0:06:51] AI Insights feature auto-appears in the generated dashboard (a canned "Capitalize on your impressive net balance..." message) — narrator calls this "amazing" uncritically; worth flagging this generated copy as fairly generic/empty AI filler, not a meaningful insight, a useful example for kids of shallow "AI feature" output versus something that actually analyzes their data.
- [0:06:18] The tool can **deploy directly** to what looks like Google Cloud (a "create project," a live console, "Welcome" screen) — a genuinely different, heavier deployment path than the Apps Script exec-URL flow used everywhere else in the batch.
- [0:07:24] **Explicit, important admission from the narrator**: "there is a con — we can't create the Google App Script or Google sheet-based applications from here right now... hopefully in future." This directly confirms, from the source material itself, that **Google AI Studio / Gemini 3 Build mode is a different product from Apps Script + Sheets**, and does not fit our class's stack as of this recording.

## What the frames add
Frames show, in sequence: the finished demo dashboard (charts, income/expense form, dark/light toggle); the Google AI Studio landing/gallery page (sample app ideas: alarm clock, banana image game, Genie sprite AI); the prompt being typed and a spinner while it "builds"; **live code visible mid-generation** at [0:04:40-0:04:50] (readable-ish TypeScript/React syntax in a code pane) — the only video in the batch showing an AI actually writing framework code live, letting the class see roughly what generated React/TS output looks like (JSX-like structure, component files in a sidebar tree) — useful purely as a visual contrast to Apps Script's plainer `.gs`/`.html` files.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- None specific to our stack — this tool has no Sheets/Apps Script backend; the generated app's "60 days of demo data" is fabricated by the model, not read from any real database, which is worth pointing out explicitly (it *looks* like a working app with real data but there is no persistence — refreshing likely resets it, though the video doesn't test that).
- Useful transferable idea regardless of stack: a short, plain-English prompt ("build a dashboard with X, Y, Z, make it look amazing") can produce a full working UI — validates the class's own "describe what you want" approach, and shows self-correcting AI behavior (errors fixed without being told).

### Becomes something kids do (activity, mini-project, milestone)
- Not directly applicable as a project template since it's off-stack, but worth a **short comparison exercise**: have kids write one Gemini prompt for Google AI Studio's Build mode vs the same prompt to build an Apps Script app, and discuss why the AI Studio one has no real backend/database while the Apps Script one does — a good concrete lesson in "what makes something a *real* backend app vs a nice-looking mockup with fake data."

### Traps a kid will hit
- The biggest risk if this tool is used unsupervised: it produces something that *looks* like a fully working, data-backed app (charts, forms, "AI insights") but has **no real persistence or backend** — exactly the gap CONTEXT.md warns the class must understand (client vs server, real database vs demo data). Worth using this video as a cautionary contrast case, not a template.

### Doesn't transfer, and why
- The tool itself doesn't transfer at all to our stack (confirmed by the narrator himself). Only the "plain prompt → self-correcting AI build" *behavioral* observation is worth keeping, and only as an illustration of prompting style, not architecture.

## Honest caveats
This is a genuine hands-on AI-build demo (not a pure promo for a paid template), and the narrator is unusually candid about the tool's biggest limitation for our purposes (no Sheets/Apps Script support) — that one admission is the most valuable single sentence in this video for our research question about how AI-assisted building goes and where it breaks.
