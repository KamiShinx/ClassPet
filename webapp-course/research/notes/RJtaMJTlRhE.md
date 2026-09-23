# Web App - Remove "This application was created by another user, not by Google." - Part 11 (Learn Google Sheets & Excel Spreadsheets, 10.7 min)

**What it is:** short tutorial (2019), part 11. Shows how to deploy/embed an Apps Script web app inside another page (a plain HTML site, or Google Sites) via `<iframe>` so the default "created by another user" Google warning banner disappears.
**Substance:** substantive for a short video: a real deployment/UX step every finished project needs, with one genuine and reusable gotcha (X-Frame-Options) explained.

## Ideas, in the video's order
- [0:00:31] Names the actual goal: the scary "created by another user, not by Google" banner is a default guard on the raw `.../exec` URL; the fix is not a setting, it's *embedding the app in an iframe on your own page* so the visitor never sees the raw execution URL.
- [0:01:07] Practical step: deploy "new version" before iframing, since an iframe otherwise keeps pointing at stale code — a real, easy-to-forget deployment trap.
- [0:03:21] **Key trap, shown failing then fixed**: by default Apps Script refuses to be iframed at all (blank iframe). Fix: `HtmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)` on the served output. Concrete, copy-pasteable, and non-obvious — this is the load-bearing fact of the whole video.
- [0:05:01]-[0:06:10] **Second trap, also shown failing then fixed**: even once iframed, clicking an internal link (e.g. "Add record") broke out of the iframe to a raw Google error page, because the HTML's `<base target="_top">` was still set from earlier in the series. Fix: change every page's `<base target="_self">` so links stay inside the iframe. Directly connects back to Part 7's "links inside an iframe behave differently" lesson — same underlying issue, different manifestation.
- [0:07:26]-[0:10:13] Shows a second, no-code hosting option: Google Sites' built-in "Embed" block pointed at the app's URL — a genuinely useful zero-setup way for a kid (or the class hub) to give a project a shareable, banner-free page without needing Netlify or any other host.

## What the frames add
Confirms each failure/fix pair visually: blank iframe before the X-Frame-Options fix; link breaking out of the frame to a raw error page before the `target=_self` fix; then a working embedded app inside both a plain HTML page and a Google Sites page. Frames also show the Apps Script "Deploy as web app" dialog and the Google Sites embed UI directly — useful as a reference for how few clicks Sites embedding actually takes.

## What it is (project relevance)
This is the "how do I actually show people the thing I built" video — pure deployment/UX polish, not new programming concepts, but the single most requested finishing step every kid project will need once it works.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- The distinction between "code is deployed and working" and "code is presentable to a visitor" — deployment versioning (must push a new version for changes to show) is a real Apps Script quirk worth a dedicated mention, since kids will otherwise edit code and wonder why nothing changed.
- Reinforces (from Part 7) that an Apps Script web app always effectively lives inside an iframe wrapper, which has real, visible consequences for links and banners — not an abstract detail.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Ship it" milestone**: every kid embeds their finished mini-project into a free Google Site as the last step of a project cycle, giving them a clean link to share with friends/family with no scary Google warning banner. Zero new code, high payoff, good morale moment.
- Directly relevant to Ben's planned "hub": the hub itself, or individual project showcases, could use this exact Google Sites embed technique rather than building a separate gallery page.

### Traps a kid will hit
- Forgetting to deploy a new version after code changes, then wondering why the iframe/site shows old behavior — likely the single most common "it's not working" support request across the whole course, not just this video.
- Missing `X-Frame-Options`/`setXFrameOptionsMode` causing a silently blank iframe with no error message — a kid won't know to look for this unless told in advance.
- `<base target>` mismatches (`_top` vs `_self`) breaking navigation once embedded — an easy one-line trap that produces a confusing "my link kicked me to an ugly error page" symptom.

### Doesn't transfer, and why
- Nothing Materialize-specific; this video is pure Apps Script/hosting mechanics and transfers cleanly.

## Honest caveats
- Short and to the point, minimal padding. Good candidate to show close to verbatim (or as a short written cheat-sheet) near the end of each project cycle rather than adapting its content.
