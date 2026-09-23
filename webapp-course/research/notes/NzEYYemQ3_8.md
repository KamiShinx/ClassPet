# Frontend, API, Backend and Database explained (Tamara Jost, 5.4 min)

**What it is:** whiteboard-style tutorial (drawn diagrams built up live over a beige background), a single running example (Tina booking Airbnb in Zurich) walked end to end through all four layers, then a fast tech-stack name-drop at the end. 2020s style, self-aware about its own simplification.
**Substance:** substantive: the single best concept explainer in this batch — one persistent example, one persistent diagram that keeps growing, and it explicitly flags itself as simplified rather than pretending to be complete.

## Ideas, in the video's order
- [0:00:00]-[0:00:33] Sets up one concrete scenario (Tina wants a Zurich apartment) and commits to it for the whole video instead of jumping between examples — this alone makes it more teachable than the other explainers in the batch.
- [0:00:33] Front end defined as "the part of the website Tina sees and interacts with... its main task is displaying things," compared to "a friendly receptionist who greets you but doesn't necessarily have access to all hotel bookings in the system" — a better analogy than "just the pretty part" because it explains *why* the front end needs to ask someone else.
- [0:01:06] Names the front end -> back end hop explicitly as "sending a request," phrased as dialogue: "Tina wants to see apartments in Zurich for these dates. What should I show her?" — makes the request concrete and readable as a sentence, good for a 14-year-old.
- [0:01:06]-[0:01:39] API introduced as the answer to "how does front end communicate with back end," visualized as "a high-speed tube like the kind you still see in pharmacies" (pneumatic tube) — a strong, physical, kid-legible analogy for a request/response channel, arguably better than "waiter" because it emphasizes the *two-way pipe*, not a personified messenger.
- [0:01:39] Back end named as "the brain of the operation... where all the logical decisions are made," and explicitly said to not have all the answers itself either — sets up why it then needs the database, avoiding the common conflation of "backend" and "database."
- [0:01:39]-[0:02:13] Database = "a giant filing cabinet or... a huge collection of Excel tables" holding apartments/availability/prices/booking history — the Excel-tables framing lands especially well for our stack since Sheets literally is the database.
- [0:02:13] Backend "applies business logic" to the raw database result before sending it back — filtering, calculating a total price. This is the clearest statement in the whole batch that the backend's job isn't just "fetch a row," it's also to transform/validate data (directly maps to what a `.gs` function does before returning JSON).
- [0:02:45]-[0:03:18] Runs the *entire* request/response loop again for the booking action (not just the search), including "updates the apartment in the database as booked" — models a write, not just a read, in the same visual language.
- [0:03:18] States an email confirmation can be triggered by the backend with "no front end involved... it's all happening in the background" — a good, concrete example of a server-only side effect the user never sees (maps to e.g. `MailApp.sendEmail()` in Apps Script).
- [0:03:53] Backend can call an *external* API (weather.com) as part of building its own response — shows a backend as both a server (to the front end) and a client (to another service) in the same request, a genuinely advanced but well-explained idea.
- [0:04:26]-[0:04:59] Fast survey of real tech names: front end (HTML/CSS/JS, React/Angular), back end (Python/Ruby/Java, Django/Rails/Spring Boot), database (SQL/MySQL vs. NoSQL/MongoDB), API style (REST/GraphQL) — useful vocabulary-dropping moment, but says nothing about *why* to choose any of them.
- [0:04:59] Self-aware caveat: "this is a simplified overview... we didn't even touch on... security, encryption, or processes running in parallel" — honest framing, worth imitating rather than pretending backend systems are this clean.

## What the frames add
Everything — this is a whiteboard-diagram video and the diagram *is* the content. [0:00:10] shows the full pipeline in one shot before it's explained (Frontend -> API -> Backend -> Database, with a technologies footer: React, Python) — good as a single "map" image to put up before diving into any one piece. [0:01:10]-[0:02:30] builds the diagram incrementally, panel by panel, exactly matching the transcript's build-up (User -> Frontend -> API -> Backend -> Database, each arrow labelled "REQUEST" then later "QUERY" / "INFO"), then [0:02:40]-[0:03:10] labels a green "BUSINESS LOGIC" box inside Backend with "FILTER, CALCULATE, ETC" written next to it — a good visual for "the backend does work, it's not just a pipe." [0:05:10] ends on a title card literally reading "CONTAINS OVERSIMPLIFICATION :)" over the same diagram — worth screenshotting directly as a disclaimer slide for class.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
The full request lifecycle end to end (front end -> API -> backend -> database -> back), a write (booking) alongside a read (search), backend calling a third-party API for extra data (weather), business logic living in the backend rather than the front end, an async server-only side effect (email) the user doesn't see.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Recreate this exact five-box diagram (User, Frontend, API, Backend, Database) on the classroom whiteboard, mapped to our own stack: Frontend = the HTML page kids write, API = `google.script.run`, Backend = the `.gs` functions, Database = the Sheet. Then walk one of their own app's actions (e.g. submitting a class poll answer) through all five boxes as a first-week milestone, exactly the way the video walks Tina's search and booking.

### Traps a kid will hit
None shown directly (no live code), but the "business logic filters/calculates before responding" idea predicts a real trap: kids' first instinct with Gemini is often to have the front end read the whole Sheet and filter/calculate in JavaScript, rather than having the `.gs` function do it — worth calling out explicitly using this video's own "business logic" box as the reference.

### Doesn't transfer, and why
The specific frameworks named (React/Angular/Django/Rails/Spring Boot, REST/GraphQL) are irrelevant to Apps Script + Sheets and would confuse kids if presented as "the" stack — use only the concept layer (front end/API/backend/database), skip the 30-second tech-name-drop section [0:04:26]-[0:04:59] entirely or explicitly say "we use a much simpler version of this."

## Honest caveats
No AI-assisted-building content (this is 100% human-narrated concept explanation, no code editor shown). The video's own "contains oversimplification" disclaimer is accurate — it never shows a real request payload, a status code, or an error case, so it should be paired with a hands-on demo (a real `google.script.run` call succeeding and failing) rather than treated as sufficient on its own.
