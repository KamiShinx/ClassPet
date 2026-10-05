# The app onboarding secrets that convert (proven strategies) (Adam Lyttle, 10.9 min)

**What it is / substance:** A step-through of the Cal AI calorie-tracker's 20-step onboarding funnel (which the
video says drove $2M/month from 800K downloads), the psychology behind each step, the creator's own simpler 4-step
"cinematic" onboarding, and a shorter Gen Z Bible example. Substantive and well-illustrated (real screen recordings
of the actual flow), but the whole frame is **monetization/sales**, not classroom UX. **Assign only with a guide**
that separates the transferable UX ideas from the paywall/upsell content, which doesn't belong in a school project.

**Watch-list:** [0:00–3:19] what onboarding is for + the 4 key elements (skip the Cal AI 20-step walkthrough, it's
long and sales-heavy); [8:14–9:54] the simpler "Gen Z Bible" alternative — closer to what a 4-step teen project
should look like.

## The ideas (in order, with [h:mm:ss])
- [0:32–1:37] Onboarding exists because you have a few seconds of a user's full attention ("captive audience," like
  a plane passenger with nothing else to look at) before they get lost or miss your best features.
- [2:12–3:19] **4 elements of a good onboarding flow**: congratulate the user, show social proof, demonstrate
  benefits (not features — what the user *gets*, not what it *does*), then (for paid apps) a paywall. "Benefits,
  benefits, benefits" is the refrain.
- [3:52–4:58] The creator's own simple 4-screen flow: welcome + social proof → core feature demo (an animated
  graphic) → extra "value-add" features they didn't know they wanted → paywall. Calls this "cinematic onboarding."
- [4:58–9:21] **Cal AI's 20-step flow, annotated**: shows the app in action first (photo → calories, "genius" —
  hooks the *why* before asking anything); asks a generic fitness question before a specific weight-loss one (so it
  works for both bulking and cutting users); asks "where did you hear about us" — **disguised market research**
  collected even if the user doesn't finish signup; personal stats (weight/height/age/goal) followed by an
  affirmation screen ("losing 5kg is realistic") with a supporting stat; **honesty about slow initial results**
  ("results are usually delayed at first, but after 7 days...") — explicitly framed as reducing refund requests and
  building trust rather than overpromising; ends with account setup, a fake-feeling "generating your custom plan"
  loading screen, then the paywall.
- [9:21–10:28] **Gen Z Bible**, a simpler version of the same shape (why are you here → affirmation → benefits →
  personal question → demo → social proof → review prompt → paywall) — the creator says this is the one he'd
  actually copy, not the 20-step version.
- [10:28–end] Recap: congratulate, demonstrate benefit, then sell.

## Vocabulary for prompting Gemini
- **Onboarding flow** → the sequence of screens before a user reaches the real app → "add a 3-screen onboarding
  before the main dashboard."
- **Social proof** → evidence other people like/use the thing (ratings, stats, testimonials) → "show a '4.8 stars,
  10k users' line on the welcome screen."
- **Personalization question** → a question used to tailor later screens → "ask what the player's favorite color is
  and use it to theme their character."
- **Affirmation screen** → a screen reassuring the user their goal is realistic/good → "add a screen that says
  'Great, this is a good starting point!' after they set a goal."
- **Paywall** → a screen asking for payment before continuing → not applicable to school projects (no real money),
  but useful to recognize when analyzing real apps.

## Before/after examples from the frames
The whole video is illustrated with real phone screen recordings, not mock-ups: [0:16] an actual App Store update
screen; [0:40] "Waybetter" fitness app onboarding ("Goals that fit into your day," purple illustration); [4:16–4:56]
the creator's own iMic app onboarding screens (bluetooth-mic feature demo, voice-filter robot mascot, paywall with
a 3-day free trial toggle); [5:04–8:24] the full Cal AI sequence screen by screen (calorie-tracking demo → workout
frequency question → weight-loss stat screens → honesty-about-delay screen → privacy screen → account setup →
"Congratulations, your custom plan is ready!" with a calorie/macro breakdown); [9:04–10:16] Gen Z Bible's colorful,
teen-coded onboarding (mood-check question, "It's not your grandma's Bible," a spinning discount wheel, App Store
review prompt). The visuals are genuinely useful for seeing *exactly* what each described screen looks like.

## Page material
- **Rules of thumb:** (1) congratulate the user before asking anything of them; (2) show benefits, not a feature
  list; (3) one well-placed personal question can make later screens feel custom-built for the user; (4) if results
  take time, say so honestly — it builds trust; (5) a 4-step onboarding is often enough — don't copy a 20-step flow
  just because a big app has one.
- **Exercises:** (1) Write a 3–4 screen onboarding script for your own app/game: a welcome+benefit screen, one
  personalizing question, and a "get started" screen. (2) Watch the first-launch screen of one app you use and
  count how many of the 4 elements (congratulate/social proof/benefit/paywall) it actually uses.
- **Quiz:** Q: Why does the video compare the first seconds of app use to being strapped into an airplane seat? A:
  the user has your full attention for a few seconds before deciding whether to stay engaged ("captive audience").
  Q: What's the benefit of an onboarding question like "how did you hear about us," even for users who never
  finish onboarding? A: it's free market research collected either way.
- **Game angle:** For an Apps Script turn-based/idle game with no real money involved, the useful pieces are: (1)
  congratulate + show a benefit before the first real turn; (2) one personalizing question (e.g. "pick a
  strategy/class") to make the rest feel tailored, easy to fake with a Sheets lookup; (3) a fake-but-fun "building
  your world..." loading screen before the first playable state — cheap to build, adds excitement. **The paywall
  step and the "market research disguised as a question" trick do not fit** and should be explicitly called out as
  inappropriate for a school project — flag as an ethics talking point (the video itself asks "is this bait and
  switch?").
- **Discussion point (not in video, our own note):** this video is a good prompt for a short class discussion on
  manipulative app design ("dark patterns") — kids should learn to *recognize* the honesty-builds-trust technique
  and the disguised-market-research technique, not necessarily copy every trick uncritically.

## Caveats
This is unapologetically a monetization tutorial for real commercial apps (subscriptions, paywalls, revenue
figures) — most of the second half doesn't belong in a 14-year-old's project as a goal to imitate. The genuinely
reusable material is concentrated in the first 3 minutes and the shorter Gen Z Bible example. Nothing here is
technically outdated; it's iOS/SwiftUI-flavored (source code link is for SwiftUI) but nothing shown is
tool-specific — it's all UI/UX pattern, applicable to any platform including a web app.
