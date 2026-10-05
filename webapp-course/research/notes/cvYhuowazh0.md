# User Flow Diagram Basics (Jesse Showalter, 10.3 min)

**What it is / substance:** A short, focused tutorial on how to read and draw a user flow diagram in Figma: the
three required pieces (entry point, steps to completion, final interaction), the standard shape vocabulary
(circle, rectangle, decision diamond, solid/dotted lines), and a few "keep it clean" conventions — built live
around one example flow (open app -> welcome -> select task -> search -> decision: found/not found -> details).
**Is it good enough to assign to a 14-year-old as homework?** Yes, largely as-is. This is the single video in the
batch that teaches **user flows** specifically (the third theme in this batch's title), it's short, the vocabulary
is small and concrete (4 shapes, 2 line types), and the example diagram stays on screen and builds up
incrementally, which is easy to follow even without knowing Figma.

**Watch-list (whole video is short and worth watching in full; if trimming):**
- [0:01:17]-[0:03:42] The three required parts of any user flow (entry point, steps, final interaction).
- [0:03:42]-[0:06:36] The shape vocabulary (circle/rectangle/diamond/lines) — the actual reusable vocabulary.
- [0:06:36]-[0:08:32] The three "keep it clean" rules (minimal color, meaningful labels, consistency).

## The ideas (in order, with [h:mm:ss])
- [0:00:33] A **user flow diagram** maps every path a user could take from a starting point to an ending point (or
  several possible endings) inside an app or website — "point A to point B, or C, D, E, F."
- [0:01:17] **Entry point**: where the user's journey into the flow begins. Websites can have many entry points
  (social media -> landing page, direct visit, etc.); apps/mobile usually have one clear entry point (download ->
  splash screen -> sign-up/login).
- [0:02:47] **Steps to completion**: everything between entry and the goal — every screen, decision or action the
  user might pass through.
- [0:02:47] **Final interaction**: the end goal state (e.g. an order placed) — every good user flow needs an entry
  point, steps to completion, and a final interaction, no exceptions.
- [0:03:42] **Shape vocabulary** (presented as loose industry convention, not a hard rule):
  - **Circle** = entry point or final interaction/exit — the clear start/end marker.
  - **Rectangle** = a screen or step; the most common shape; no decision happens here unless annotated. The
    presenter's own style adds small dots (browser chrome) or a lightning-bolt icon to mark "an action happens
    on this screen."
  - **Diamond** = a **decision point** — yes/no, approve/not-approve, found/not-found. Called a "non-negotiable"
    convention in UX — always represents a branch, never a plain step.
  - **Lines**: solid = the main path from one screen to another; dotted = an alternate/secondary path (e.g. "no,
    go back and re-select").
- [0:06:36] Three "keep it clean" rules:
  1. Keep colors minimal/muted so people focus on the flow's content, not its decoration — "think of this like a
     wireframe."
  2. Make labels meaningful and specific — not "Screen" but "Welcome screen" or "Select Task screen"; not
     generic "Yes/No" on a decision but a description of the actual outcome (e.g. "Found" / "Not Found").
  3. Be consistent — once a shape or line style means something, never reuse it to mean something else, so anyone
     reading the diagram can trust the legend at a glance.
- [0:08:32] Next step after the basic flow: replace the placeholder shapes with real wireframes or finished screens
  to turn it into a higher-fidelity **"wireflow"** or **"screenflow"** — more detail, more like a site map, entirely
  optional and team-dependent.

## Vocabulary for prompting Gemini
- **User flow** → the full path/decision tree a user follows through an app → "before building this feature, list
  every screen and decision a user passes through from tapping 'Start' to finishing a game round."
- **Entry point** → where a user's journey into a flow begins → "what's the entry point for a new player — the
  first screen they see?"
- **Decision point / branch** → a place where the app must choose between two or more outcomes based on user input
  or data → "add a decision point after 'Submit Answer': if correct, go to the next question; if wrong, show the
  hint screen."
- **Final interaction / end state** → the goal screen or outcome that ends a flow → "the final interaction for the
  checkout flow should be an order confirmation screen."
- **Steps to completion** → all the intermediate screens/actions between the entry point and the end goal → "map
  out every step to completion between opening the app and submitting a high score."

## Before/after examples from the frames
- [0:00:48]-[0:01:04] The full example flow appears early, fully built, as a preview of the finished diagram (blue
  entry circle -> Welcome -> Select Task -> a lightning-bolt "action" box -> a decision diamond -> two more
  decisions -> Search Items -> a found/not-found branch -> final circle). This is the single diagram the whole
  video builds up piece by piece — good to embed as the page's central example image.
- [0:01:20]-[0:02:32] Zoomed-in "Entry" circle isolated with the on-screen label "THE ENTRY POINT" — a clean,
  simple frame for teaching just that one concept.
- [0:04:16]-[0:04:48] Zoomed rectangle sequence (Entry -> Welcome -> Select Tasks -> a lightning-bolt action box)
  with the on-screen label "RECTANGLE" — shows the little browser-dot and lightning-bolt icon conventions the
  presenter adds inside plain rectangles.
- [0:05:04]-[0:05:44] Zoomed decision diamond ("Correct?" branching Yes/No) with the on-screen label "DECISION
  DIAMONDS" highlighted with a box around the diamond — the clearest single frame for explaining branching.
- [0:07:36] A small isolated snippet: "Yes" label on a line pointing into a "Details" rectangle, with a dotted line
  returning — good minimal frame for explaining solid-vs-dotted lines.

## Page material
- **Rules of thumb:**
  1. Every user flow needs three things: an entry point, steps to completion, and a final interaction — if you
     can't identify one of these three in your feature's flow, it's not finished being planned.
  2. Draw a decision point (diamond) anywhere the app's next screen depends on user input or data — a decision
     diamond should never be skipped by drawing a plain rectangle instead.
  3. Label every screen and every decision outcome specifically ("Login screen," "Password incorrect") — vague
     labels like "Screen" or "Yes/No" make the diagram useless to someone else reading it later.
  4. Keep the diagram's visual style boring on purpose — one shape per meaning, one line style per meaning, muted
     colors — so the flow's logic is what stands out, not the diagram's decoration.
  5. Before writing a single line of code (or asking Gemini to), sketch the flow: what's the entry point, what
     decisions branch it, what's the end state?
- **Exercises:**
  1. On paper (or in a doc), draw the user flow for one feature of your app using only a circle, rectangles, a
     diamond, and solid/dotted lines. Identify the entry point, every decision, and the final interaction.
  2. Pick one screen in your app that currently has no clear "next step" defined. Add a decision diamond for what
     happens next based on user input, and label both branches specifically.
  3. Take an existing feature you already built. Draw its ACTUAL flow (not the one you intended) by clicking
     through it — did you find any dead ends or missing "no" branches?
- **Quiz:**
  1. Q: What shape represents a point where the app has to choose between two or more outcomes, and why is it
     called "non-negotiable" in the video? A: A diamond (decision point) — it's called non-negotiable because,
     unlike other shapes, its meaning (a branch/decision) is treated as a fixed industry convention, not a personal
     style choice.
  2. Q: Why does the video recommend "Found" / "Not Found" instead of "Yes" / "No" as labels on a decision
     diamond's branches? A: Specific labels describe the actual outcome and are clearer to anyone reading the
     diagram later, versus generic Yes/No which requires re-reading the diamond's question to understand.
- **For game videos:** N/A (general UX video, not game-specific), but user flow diagrams apply directly and
  cleanly to a turn-based/idle Apps Script game: entry point (open the web app URL), steps (choose a
  character/menu -> take a turn -> submit an action), decision diamonds (was the move valid? did the player win
  this round?), and a final interaction (game over / high score saved to Sheets). Recommend kids sketch this
  BEFORE asking Gemini to build the screens, since it clarifies what server calls (`google.script.run`) are needed
  where.

## Caveats
- Entirely Figma-based, but unlike the pure-visual-design videos, what's being taught here (the flowchart
  vocabulary itself) is tool-independent — a kid can draw this on paper, in Google Slides, or in a free tool like
  draw.io/Whimsical/Figma's free tier just as well.
- The shape conventions (circle/rectangle/diamond) are described accurately as convention, not universal law — the
  video itself says "user flow diagrams are customizable... there are some industry standards, though" — keep that
  framing in the guide rather than presenting the shapes as a strict rulebook.
- No code, no backend concept explained — purely a planning/communication tool. Good fit as a "do this before you
  prompt Gemini" step, not a replacement for understanding client/server.
- Short video with essentially no padding or filler (unlike some others in this batch) — safe to assign in full
  rather than excerpting.
