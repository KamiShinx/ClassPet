# Build a Complete Trolley Management System Web dashboard with Google Sheets & Apps Script | E20 (Mohammad Rameez Imdad, 8.6 min)

**What it is:** promo feature-tour demo of a pre-built asset check-in/check-out dashboard (warehouse trolleys), four roles. No code walkthrough, but a genuinely clear plain-English explanation of a time-based trigger.
**Substance:** thin overall, but the **alert-trigger explanation** and the **QR-scan check-in/out** are the two most concrete, reusable ideas in the batch.

## Ideas, in the video's order
- [0:00:34] Four roles (admin, quality, dispatch, sales) each restricted to specific actions: quality can only check *out*, dispatch can only check *in* — role restriction narrower than a simple admin/user split, i.e. **roles gate specific actions, not just whole screens** — a useful refinement of the role pattern seen elsewhere.
- [0:01:41] Adding a trolley **auto-generates a QR code** tied to its row ID; later, "scan QR" (via camera) looks up that row to perform a check-in/out — the only video in the batch to show camera-based input tied to a backend record lookup, directly relevant to Ben's interest in camera/image use (even though this is a barcode scan, not a Teachable Machine model).
- [0:03:52 - 0:04:57] **Explicit alert-threshold setting** ("if a trolley is out more than N days, send an email") with a plain-English explanation of the mechanism shown on screen: "This system checks for trolleys out 7+ days. Alerts are sent automatically via Google Apps Script time-based triggers... go to Extensions → Apps Script → Triggers → add a time-driven trigger to check and send alerts daily." This is the **clearest, most explicit explanation of an Apps Script trigger anywhere in the batch** — worth quoting/reusing almost verbatim in class material.
- [0:07:39] The narrator gives an explicit **tip about demo data**: "use generic demo data, not real personal data, or YouTube can give you a copyright [strike]" — actually a privacy/ToS point mislabeled as copyright by the narrator (flag as the narrator's own confusion, not something to repeat uncritically), but the underlying instinct (don't publicly demo real people's data) is sound and worth adapting into a data-privacy reminder for the class's own demos.

## What the frames add
Frames are UI-only (QR code generation, check-in/out modals, alert-settings form with the "How it works" explainer text block legible on screen at [0:03:52], mobile-responsive login). The alert-settings frame (sheet_002, ~03:20-04:50) is worth a direct look/reuse since the on-screen "How It Works" box spells out the trigger mechanism in writing, not just narration.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **Time-based triggers**, explained clearly in plain English on-screen and in narration — the best explainer in the batch, reusable close to verbatim.
- Action-level (not just screen-level) role restriction — a good refinement once kids have built a basic two-role app and want to go further.
- QR/camera scan → row lookup — a concrete bridge between physical/camera input and a backend record, relevant groundwork before Teachable Machine integration (though this uses a barcode library, not a trained model).

### Becomes something kids do (activity, mini-project, milestone)
- A **"library book / equipment checkout" tracker** for the classroom: each item gets a QR code, checking out scans it and logs who/when, a daily trigger emails a reminder for anything out more than N days — this is close to a direct kid-scale port of the whole app, appealing because it solves a real classroom problem (borrowed markers, chargers, etc.).
- A stand-alone milestone: build **one time-based trigger** that emails a daily summary (this reuses the exact trigger mechanism explained here, without needing the whole trolley app around it).

### Traps a kid will hit
- Time-based triggers are **set up per-user, per-script** and need re-authorization if the script's permissions change or if ownership moves — kids sharing a script or having Ben re-deploy it may find their triggers silently stopped firing; flag this before the "daily reminder" milestone.
- Camera/QR scanning inside an Apps Script `HtmlService` page depends on getting camera permission inside a sandboxed iframe — per CONTEXT.md this is very likely blocked; the narrator even hits a live "camera error" during the demo ("In my PC I don't have a camera, but in my laptop we have a camera") without diagnosing whether it's a permissions or sandbox issue. This is a real, first-hand example of the exact camera-in-iframe risk flagged in our course constraints — worth citing to Ben as evidence, not just theory.

### Doesn't transfer, and why
- Warehouse trolley/asset tracking for a transport business is adult logistics; only the checkout/QR/trigger mechanisms transfer, rebuilt around something like class equipment or library books.

## Honest caveats
Mostly a promo demo, but the trigger explanation is unusually clear and worth treating as a rare genuine explainer moment in this batch rather than pure demo. The narrator's "copyright" comment about demo data is his own mistaken framing (it's a privacy/ToS concern, not copyright) — worth correcting if reused.
