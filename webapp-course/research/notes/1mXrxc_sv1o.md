# Front-end vs back-end: What's the difference? (Codecademy, 1.2 min)

**What it is:** very short brand explainer (Codecademy course teaser), single analogy, no follow-through, no code.
**Substance:** thin: one clean analogy, one worked example started but cut off before it says anything about a database, request, or API.

## Ideas, in the video's order
- [0:00:00] Frames the question directly: "what exactly do they mean" by front end/back end — good hook for a 2-minute class intro.
- [0:00:00]-[0:00:32] Computer-store analogy: front end = the showroom (what the customer sees, "nicely designed"), back end = the warehouse/storeroom (where things are actually kept and prepared); the customer "can't go in there themselves." This "customer never touches the storeroom" detail is a nice, reusable way to say the client can't read the database directly — it can only ask (generic framing, but a good hook).
- [0:00:32] Back end named as "where all of the data is stored and requests are processed" — a correct, compact one-liner.
- [0:00:32]-[0:01:04] Restaurant-website example: HTML/CSS files "retrieved from the back end and displayed in the user's browser" — this is the video's one specific technical claim, and it is a simplification worth flagging: it conflates "backend serves static files" with "backend processes requests/data," which are different jobs. For Apps Script specifically, `HtmlService` really does serve the front-end files from server-side code, so this line is *closer* to literally true for our stack than for a typical file-hosted site — worth pointing out as a nice coincidence.

## What the frames add
Nothing conceptual: [0:00:10]-[0:00:20] generic flat-illustration people in a computer store (a faceless character deliberately drawn with no face — probably a template asset). [0:00:30]-[0:01:00] a simple browser-window mockup on purple background showing a "Front-End" label over a wireframe page, and later a tiny stylized "server" icon (stacked rectangles) with an arrow to the browser window, labelled "Place Order for Computer" / "Order Placed" / "Requesting CSS" — this is a genuinely nice, minimal client<->server request/response diagram (server icon + browser icon + labelled arrows) that's simple enough to redraw on a classroom whiteboard.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Front end = what the user sees and can touch; back end = where data lives and is processed, and the user cannot reach it directly. Implicitly: the front end has to ask the back end for things (shown as an arrow "Place Order," not explained as an API call).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
As a 90-second cold-open before building the first Apps Script app: "you (the browser) are the store customer, your `.gs` code is the storeroom kid — you never touch Google Sheets directly, you always ask the storeroom kid to fetch or change a row for you." Reinforces why direct spreadsheet edits by the user don't count as "using the app."

### Traps a kid will hit
None — no code shown at all.

### Doesn't transfer, and why
Nothing to strip; the video is generic enough (no framework names, no outdated tech) that it ages fine, but it's too short and thin to teach anything past the opening framing line.

## Honest caveats
1.2 minutes total, ends mid-thought (never explains what a database or API is, despite implying "requests are processed"). Best used only for its first 30 seconds; the last 30 seconds add a specific-but-oversimplified claim about HTML/CSS being "retrieved from the back end" that would need a follow-up correction (static assets vs. dynamic data are different, even if Apps Script blurs this specific line). No AI-building content.
