# Build a Google Sheets AI Data Assistant with Apps Script & ChatGPT | D49 (Mohammad Rameez Imdad, 8.3 min)

**What it is:** feature demo of a sidebar AI assistant (built with Apps Script + a ChatGPT/OpenRouter API call) that manipulates the *active* Sheet via natural-language commands (remove duplicates, generate formulas, summarize, create a new sheet). Crucially, this one **does show the AI failing and needing a retry** — directly on-topic for the "weak, forgetful AI" brief.
**Substance:** mixed: short but has real content — a genuine AI failure moment and an alternate free-API-key source, wrapped in a fairly thin feature tour otherwise.

## Ideas, in the video's order
- [0:01:42] First command "delete all the duplicate data" works, and duplicates visibly disappear from the sheet.
- **[0:02:16]-[0:03:23] The AI fails on the same command the second time round.** Transcript: "it will ask you... execute command remove duplicate... so we will need here again... delete all the duplicate data from my sheet... maybe we need to refresh the data or we need to reselect the sheet." The presenter has to re-select the sheet from the sidebar dropdown and retry before it works — a real, unstaged example of the assistant losing track of its target/context and needing a manual nudge to recover, plus the presenter's own aside: **"sometimes it make mistakes or don't understand your query... it will take it will make definitely error."** This is the clearest, most explicit "the AI is imperfect and needs a recovery step" moment in the entire batch, and it's admitted candidly rather than edited out.
- [0:03:57] Asking for a formula (count pending vs. complete in column H) makes the AI **respond with the formula text itself rather than silently changing the sheet**, and the presenter manually pastes and tests it — a good, safer pattern than letting the AI directly edit formulas: get the formula as text first, verify it, then apply it.
- [0:05:38] "Create sheet" from a typed name generates a new sheet with demo data — shows the assistant can create structure, not just edit existing data.
- **[0:06:19]-[0:06:42] Free API key from `openrouter.ai`** (not Google AI Studio): search "free" models, pick one (e.g. an open GPT-OSS model), generate a key — an alternate, model-agnostic source of a free key, worth mentioning as a backup if Gemini's own free tier is constrained for the class's Gmail accounts. Presenter cautions to use it "for study purposes... educational way," implying awareness it's a shared/rate-limited free tier.
- Generic: "analyze/summarize/clean/remove duplicates/create formula" listed as generic capabilities (mostly marketing recap).

## What the frames add
Frames largely confirm the sidebar assistant UI (a chat panel next to the live Sheet, with quick-action buttons: Analyze Data, Add Column, Clean Data, Demo Data, Remove Duplicates, Create Formula) and the Sheet visibly changing (duplicate rows disappearing, a new sheet appearing) in near real time — good visual confirmation the assistant really does write to the live sheet, not just chat. No Apps Script code is shown in the sampled frames, so the actual API-call implementation isn't visible, only the sidebar UI and its OpenRouter/AI-Studio account screens.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
An AI-driven sidebar acting on the currently active sheet; the difference between "AI edits the sheet directly" (remove duplicates) vs. "AI returns text/formula for a human to apply" (the COUNTIF example) — a genuinely useful distinction to teach as a safety spectrum; an alternate free-API-key provider (OpenRouter) beyond Google AI Studio.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Not a good first-week project (it's a meta-tool that edits sheets, more advanced than a CRUD app), but a strong "AI feature add-on" milestone later in the course: build a small sidebar button that asks Gemini to summarize the class's own data sheet in plain language.

### Traps a kid will hit
The exact failure shown here — asking the AI to act on data, getting no visible result, and not realizing the fix is to reselect/refresh the target sheet — is a very plausible trap for a 14-year-old, who is likely to conclude "it's broken" and give up rather than try reselecting. Worth pre-teaching "if an AI action on your Sheet seems to do nothing, check whether it's still pointed at the right sheet/tab" as a first debugging step, directly modeled by this video's own recovery.

### Doesn't transfer, and why
The sidebar-assistant pattern and the "formula as text, verified before applying" habit both transfer well; only the specific OpenRouter model choice is throwaway detail (free-tier availability changes constantly and shouldn't be relied on as a fixed recommendation).

## Honest caveats
Short and fairly thin outside the one real failure moment; the "for you" ending is generic self-promotion. The AI failure itself is genuine and unscripted-looking (the presenter visibly troubleshoots on camera rather than cutting away), which is why it's flagged as the video's standout value despite the otherwise thin content.
