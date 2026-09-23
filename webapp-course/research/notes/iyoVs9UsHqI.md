# How to Create a Flowchart Web App with Google Apps Script (Free) (Mohammad Rameez Imdad, 8.4 min)

**What it is:** demo of a different kind of app than the rest of the batch: a **canvas-based flowchart drawing tool** built on Apps Script/Sheets, shown by the narrator drawing a login-flow diagram live. Not a business-admin dashboard. No architecture explanation, but it is a genuinely distinct example of what an Apps Script `HtmlService` page can be used for beyond CRUD tables.
**Substance:** thin as a tutorial (it's mostly "watch me draw shapes"), but structurally interesting as a project shape.

## Ideas, in the video's order
- [0:00:00 - 0:00:33] The tool itself is used to sketch the **login flow the narrator plans to build elsewhere** (start → login → 2FA check yes/no → Google auth → 6-digit code → design → end) — a nice meta-example: this video is a tool for planning the kind of app the rest of the batch builds, i.e. flowcharting as a design step before coding.
- [0:01:05 - 0:02:12] Shapes (rectangle/process, diamond/decision, rounded/start-end, arrows) each carry semantic meaning (decision = branch, start/end = terminal nodes) — a genuine, simple introduction to flowchart notation, which is itself a useful pre-coding skill for planning branching logic (if/else, roles) before writing it.
- [0:06:44] **Save persists the flowchart to the user's Google Drive**, and re-opening lets you pick a previously saved project by name — the diagram itself is treated as a saved document tied to a Sheet-backed backend, not just an in-browser canvas; also **export as an image** for use in a presentation.
- [0:07:17] Narrator explicitly invites viewers to "learn this code... about canvas," acknowledging (uniquely in the batch) that there's something worth learning from the implementation, though he never actually explains it.

## What the frames add
This is the one video in the batch whose frames genuinely differ from the others: consistent screenshots of a **freehand drawing/canvas tool** (shape palette, color pickers, drag-and-drop shape placement) rather than table/form UI. The last frame (sheet_003, ~07:20) briefly shows the **raw `index.html`/CSS source** (Bootstrap CDN `<link>`, some inline styles) in the Apps Script editor for about a second — confirming the tool is HTML5 `<canvas>` + CSS/JS inside a standard `HtmlService` page, not a special product; useful to know it's built on the same stack as everything else in the batch, just applied to a drawing surface instead of a data table.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Almost none, directly — this is a frontend-canvas showcase. The one real backend idea: a **user's saved work items listed and reopened by name** (Drive-backed "my projects" list) is the same "list of my own records" pattern as everywhere else in the batch, just applied to diagrams instead of business records.
- Indirectly useful: flowcharting itself as a *design technique* for planning branching backend logic (roles, statuses, decisions) before coding it — worth adopting as a classroom practice regardless of this specific video's content.

### Becomes something kids do (activity, mini-project, milestone)
- Have kids **sketch their own app's flow** (even on paper, or with a simple tool) before building it — not a coding milestone, but a planning habit this video demonstrates well by example (the narrator literally diagrams "should this be Google login or manual" before deciding).
- A **fun mini-project**: a simple shared drawing/whiteboard tool saved to Drive per user — same shape as this video (canvas + save/list/reopen), and drawing tools are inherently appealing to 14-year-olds; much more approachable than another CRUD dashboard.

### Traps a kid will hit
- `<canvas>` drawing state (shapes, positions, colors) has to be serialized into something savable (likely JSON stuffed into a Sheet cell or Drive file) — kids attempting a similar "save my drawing" project will discover that not everything maps cleanly onto Sheet rows/columns, a good lesson that Sheets-as-database has limits for non-tabular data.

### Doesn't transfer, and why
- The specific flowchart-shapes-for-software-architecture use case is a professional planning tool with limited direct teen appeal as a *product*, though the underlying "canvas app saved to Drive" shape is appealing repackaged as a drawing tool.

## Honest caveats
This video stands apart from the rest of the batch (different tool entirely, not a business dashboard) and gives no real explanation of its own implementation despite the narrator's comment that there's "something to learn... about canvas" — that remains an unfulfilled promise in the video itself.
