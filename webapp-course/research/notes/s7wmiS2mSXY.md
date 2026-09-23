# What is an API? (in 3 minutes) (MuleSoft Videos, 3.4 min)

**What it is:** brand-produced explainer (promo for MuleSoft, tagline at the end: "whenever you think of creating an API, think Mulesoft" [0:03:14]). Corporate voiceover over abstract motion graphics.
**Substance:** thin: one analogy (waiter) stretched over the full runtime, textbook definition read aloud then immediately dismissed as jargon, one worked example (flight booking), no code, no real API call ever shown.

## Ideas, in the video's order
- [0:00:33] Names the API as "the unsung hero," "the engine under the hood" — pure hype language, no content (generic).
- [0:01:04] Core definition: "an API is the messenger that takes requests and tells a system what you want to do and then returns the response back to you." This is the one reusable line.
- [0:01:04]-[0:01:36] The waiter analogy: you (client) order from a menu (interface), the waiter (API) carries the request to the kitchen (backend/system) and carries the response (food) back. Clean and simple, no dependencies on other jargon.
- [0:01:36]-[0:02:42] Applied example: an online travel aggregator site doesn't have its own flight data; it calls the airline's API to check seats/prices/book, then shows the result to the user. Good real-world grounding for "why would an app call someone else's API" (third-party APIs), distinct from a client calling its own backend.
- [0:02:42] Generalizes: "all interactions between applications, data, and devices" use APIs — overclaims a bit (generic, borderline vague), but fine as a closing line.

## What the frames add
Almost nothing conceptual. [0:00:10]-[0:00:50] generic stock-style vector icons (glasses on a phone, an airplane, gears meshing) illustrating "connectivity," no diagram of client/server. [0:01:10]-[0:01:30] the waiter scene is actually drawn (waiter carrying a tray between a diner and a menu) — a literal, cute illustration of the analogy, could be reused as-is or redrawn simply on the whiteboard. [0:01:50]-[0:02:30] a flight-booking form UI mockup and then, importantly, a system diagram at [0:02:20]-[0:02:40]: a central "FlyAirways" search page/server box with database cylinders and other airline logos ("FlySky" etc.) connected around it by lines — this is the clearest visual in the video of "one API sits between many client apps and one backend/database," worth reusing to show APIs as a hub, not just point-to-point.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
API as messenger between a requester and a system (client/server request-response, informally); the idea that an app can call someone else's API (external services) rather than only its own backend.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Use the waiter analogy verbatim as the opening 2-minute framing when first introducing "what happens when you click a button in your app" — cheap, no build needed, just narration to precede the first `google.script.run` demo.

### Traps a kid will hit
None shown — no code, no build process at all.

### Doesn't transfer, and why
Everything specific to MuleSoft/enterprise API management (the ISO-style "textbook definition," the corporate framing) is irrelevant. The flight-aggregator example is adult B2B software — fine as a mental model, not as a project shape a 14-year-old would want to build.

## Honest caveats
No AI-building content (pre-dates that framing entirely; it's a 2010s-style corporate explainer). No mention of HTTP, JSON, or any technical mechanics — purely conceptual, and thin even at that. Treat as a 90-second framing device, not a teaching video to show in full.
