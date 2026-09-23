# HTTP Explained in 3 minutes (Connected Cookie, 3.5 min)

**What it is:** brand-produced explainer (channel outro pitches subscribing for more tech content), narrated over clean flat-style animated diagrams (browser icon, server icon, arrows). No code, but the only video in the batch that stays specifically on HTTP mechanics rather than the whole stack.
**Substance:** substantive for its narrow scope: correct, reasonably dense, and the one video in the batch that actually explains requests, URLs, status codes and HTTPS as distinct, named pieces rather than folding them into a generic "API" wave.

## Ideas, in the video's order
- [0:00:00] HTTP = "a communication protocol specifically designed for the web," defines "how messages should be structured and how data exchanges are organized between web browsers and servers" — correct, compact definition; "more than 90% of web exchanges take place using HTTP" is a plausible-sounding but unsourced stat (generic, don't repeat as a fact to kids without caveat).
- [0:00:30] HTTP is "stateless": "the server doesn't remember the history of interactions with a client," and cookies/sessions/JWTs exist specifically to work around this. This is a genuinely important, under-covered idea for the class: kids should learn early that each request to their Apps Script backend starts fresh with no memory of the last one, unless they build that memory themselves (e.g., by re-sending a user ID/token each time, or storing it in the Sheet).
- [0:01:04]-[0:01:34] Breaks a URL into its named parts: protocol (http), domain name (server's address), path, file name, and optional parameters ("indicating the ID of a particular resource") — a clean, reusable checklist for reading any URL, including an Apps Script `.../exec?id=...` address.
- [0:01:34] Names the HTTP verbs and their purposes: GET to retrieve data, PUT/POST to submit form data or upload files — directly maps to `doGet`/`doPost` in Apps Script, making this the clearest bridge in the batch between generic HTTP theory and our actual backend code.
- [0:02:07]-[0:02:40] Status codes explained by category (200 success, 300 redirection, 400 access denied/client error, 500 server error), with "404 Not Found" singled out as the most familiar example and its causes given (file not published, misspelled, wrong directory) — good, concrete, and directly useful for debugging a broken Apps Script deployment URL with kids.
- [0:02:40]-[0:03:15] HTTPS named as the secure version of HTTP via SSL/TLS encryption, "ensuring exchanges are confidential" — brief but correct; worth a one-line mention that Apps Script `/exec` URLs are HTTPS by default so kids don't need to think about this themselves.

## What the frames add
This is the clearest, most reusable diagram set in the whole batch for HTTP specifically. [0:00:20]-[0:01:00] shows a simple two-box diagram, a laptop labelled "Browser" and a server-rack icon labelled "Web server," connected by a double-headed arrow — the minimal client/server picture, good as a recurring visual anchor. [0:01:10]-[0:02:00] overlays the URL breakdown directly on screen as a labelled string (`http://example.com/category/webpage.html?id=42` with Protocol/Domain name/Path/File name/Parameters called out underneath) — this exact image is worth reusing or recreating as a handout since it maps almost one-to-one onto reading an Apps Script deployment URL with a query parameter. [0:01:50]-[0:02:40] adds "HTTP request" and boxed verb chips (GET/POST/PUT/DELETE) on the arrow between browser and server, then adds a "Status code" legend box on the server side — by [0:02:40] the diagram shows the full round trip: request out with a verb, response back, both labelled. [0:03:00] shows a small padlock icon appearing on the arrow for the HTTPS mention — a nice, simple way to distinguish HTTP from HTTPS visually without extra explanation.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Statelessness (and why cookies/sessions exist), the anatomy of a URL, GET vs. POST/PUT as different request purposes, status codes as the server's way of reporting what happened, HTTPS as encrypted HTTP.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "read the URL" exercise: paste the class's own deployed `.../exec?id=42`-style Apps Script URL (or a mocked one) on the whiteboard and have kids label each part using this video's breakdown (protocol/domain/path/parameters) before they ever see the code behind it. Pair with a second exercise: deliberately break a deployment (wrong permission, unpublished version) and have kids diagnose it as "which status code would this be and why" (404 vs. 403-style access denied) using only this video's status-code categories.

### Traps a kid will hit
Statelessness is the real, concrete trap: kids will build something (e.g. a login or a running score) assuming the backend "remembers" the last request, and it won't — each `google.script.run` call is a fresh, stateless hit unless state is explicitly stored in the Sheet (or PropertiesService) and re-read every time. This video is the only one in the batch that names statelessness explicitly, so it's the natural anchor for pre-empting that trap.

### Doesn't transfer, and why
Nothing to strip — the video is technology-neutral (doesn't push a specific framework or language) and the verbs/status codes it teaches (GET/POST, 200/404/500) are exactly the ones Apps Script's `doGet`/`doPost` and any `fetch()` call to it will actually produce, including in the year-end Netlify pivot. This is one of the few videos in the batch with no content to discard.

## Honest caveats
No AI-assisted-building content (pure narrated explainer, no code editor, no chat tool). Mildly promotional channel outro at the end [0:03:15]-[0:03:30], otherwise no padding. The "90% of web exchanges" stat [0:00:00] is unsourced and shouldn't be repeated to kids as a hard fact. Technically nothing is outdated or wrong.
