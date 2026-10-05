# How I do an accessibility check -- A11ycasts #11 (Chrome for Developers / Rob Dodson, 12.3 min)
**What it is / substance:** a practitioner's personal, repeatable checklist for a quick accessibility pass on someone else's website, demoed live on real sites (WebAIM, a Material Design template, a Polymer shop app, Wikipedia, GitHub).
**With a guide** for 14-year-olds — the checklist itself is concrete and demoable in class, but the screen-reader (VoiceOver) segment moves fast and assumes familiarity with a tool most kids have never opened.

## The ideas (in order, with [h:mm:ss])
- [0:00:32]-[0:01:36] **Tab through your site with only the keyboard**, no mouse. Check you can reach everything interactive and that you always see a visible focus ring (a highlighted outline showing what's currently selected). Jargon: *skip link* = a hidden link, revealed on first Tab press, that jumps straight to the main content — useful on sites with big navigation menus.
- [0:01:36]-[0:03:13] **Check for hidden-but-still-tabbable content.** If you shrink the browser and a sidebar gets visually hidden, but tabbing still lands inside it, that's a bug: a screen reader user (or keyboard user) can get "stuck" interacting with things they can't see.
- [0:03:13]-[0:05:56] **Do a quick screen-reader pass** (he uses VoiceOver on Mac): land on an image and check it has real alt text (otherwise a screen reader just reads the filename); check custom controls (like a styled dropdown) announce properly and work with arrow keys; check that when something new appears on screen (like an "added to cart" popup), the screen reader's focus jumps there too — otherwise the user never even knows it happened.
- [0:05:56]-[0:08:10] **Check heading structure and landmarks.** Good sites use H1 -> H2 -> H3 in order to build a "skeleton" a screen reader user can jump around by (never skip levels just to make text smaller — use CSS for that). *Landmark* elements (banner, navigation, search, main) are jump-points, like keyboard shortcuts for a big page — screen reader users often start by browsing a page's headings/landmarks before reading anything.
- [0:08:42]-[0:10:53] **Check color contrast** with a browser extension (he uses "aXe" and "Accessibility Dev Tools") that scans the page and flags low-contrast text, and even suggests a passing replacement color.
- [0:11:07]-[0:11:27] **Recommend automated testing**: the same engine that powers the aXe extension (axe-core) can run inside a test suite so accessibility bugs get caught automatically before shipping, not just when someone happens to check by hand.

## Vocabulary for prompting Gemini
- **Focus ring** → the visible outline showing which element is currently selected by keyboard → "make sure every button has a visible focus outline when you Tab to it."
- **Skip link** → a hidden link that jumps straight to main content → "add a skip link at the top of the page that jumps to the game area."
- **Alt text** → a text description of an image, read aloud by screen readers → "add alt text to every image describing what it shows."
- **Landmark** → a labeled region of the page (main, nav, search) that screen readers can jump to → "wrap the main game area in a `<main>` tag so it's a landmark."
- **Heading hierarchy** → H1 then H2 then H3 in order, never skipped, forming the page's outline → "use one H1 for the page title and H2s for each section, don't skip to H3."
- **Contrast ratio** → how much text color stands out from its background; low contrast is hard to read → "check the button text has enough contrast against its background color."

## Before/after examples from the frames
The frames genuinely help here. [0:04:16]-[0:04:24] shows the screen-reader focus rectangle sitting over a background image link with NO visible text — this is what a missing-alt-text problem looks like from the screen reader's point of view, and is worth reusing on the page. [0:05:04]-[0:05:44] shows a custom dropdown (size selector) with a black caption box narrating exactly what VoiceOver announces at each step ("M, Size, collapsed, popup button") — a good side-by-side of "here's the control" + "here's what gets read aloud." [0:09:04]-[0:09:52] shows the aXe extension's results panel flagging "Elements must have sufficient color contrast" with a clickable link straight to the offending CSS — concretely showable to kids using Chrome DevTools, which they'll already have open for Apps Script debugging.

## Page material
- **Rules of thumb:**
  1. Try using your own app with only the Tab key and no mouse — if you get stuck or lost, so will a real keyboard user.
  2. Every image needs alt text describing what it shows (or empty alt="" if it's purely decorative).
  3. Use one H1 per page, then H2, then H3, in order — never skip a level just to make text smaller.
  4. When something new appears (a popup, a "saved!" message), make sure focus or attention is drawn to it — don't let it appear silently off in a corner.
  5. Check text contrast with a free tool (Chrome DevTools has a contrast checker built into the Elements panel) instead of guessing by eye.
- **Exercises:**
  1. Unplug your mouse (or just don't touch it) and try to use your own app for 2 minutes with only Tab, Shift+Tab and Enter. List every place you got stuck.
  2. Open Chrome DevTools, right-click an element, and check its computed accessible name in the Accessibility panel — does it say something useful, or something generic like "button" with no label?
  3. Turn on your phone or laptop's screen reader (VoiceOver on Mac/iPhone, TalkBack on Android, Narrator on Windows) for 60 seconds on your own app's homepage and just listen. Write down the first thing that confused you.
- **Quiz:**
  1. Q: Why does a missing focus ring matter even if the site looks fine visually? A: A keyboard-only user can't see which element is currently selected, so they lose track of where they are on the page.
  2. Q: What's wrong with skipping from an H1 straight to an H3 just because you want smaller text? A: It breaks the "outline" a screen reader user relies on to navigate — use CSS for size, headings for structure.
- **For a game built with Gemini on Apps Script:** all of it transfers to the HTML frontend Gemini writes — ask it for real `<button>`/`<label>` elements (not styled `<div>`s), for a `<main>` landmark, for alt text on images, and for a heading hierarchy. The screen-reader-focus-jump-on-popup trick from [0:05:24]-[0:05:56] applies directly to any Apps Script app that shows a "Saved!" toast or modal after `google.script.run` calls back. Doesn't fit: automated CI testing with axe-core — that needs a real build/test pipeline, which is out of scope for a browser-only Apps Script class project; a manual once-over with the browser extension or DevTools panel is the realistic version.

## Caveats
Dated ~2018: he references "previous episodes" covering NVDA and VoiceOver basics that aren't in this video, so a kid watching cold will be lost during the screen-reader segment without extra explanation. The "aXe" Chrome extension he demos is now distributed as "axe DevTools"; Chrome's built-in Accessibility panel in DevTools has since gained more features (and Lighthouse now runs a similar audit built-in) — the underlying checks (contrast, labels, roles) are unchanged, only the exact menu names moved. Don't assign the raw video cold; a guide should point out which parts are still click-for-click accurate (contrast checker, Tab test) versus which need "it looks a little different now, but the idea is the same" framing.
