# How to Build a AI Helpdesk Ticketing System with Google Sheets & Apps Script | E33 (Mohammad Rameez Imdad, 10.1 min)

**What it is:** feature demo of a finished 3-role helpdesk (user/agent/admin), with auto-routing of tickets and two small AI-assist buttons (improve ticket text, draft a reply email). No build process shown.
**Substance:** mixed: the routing logic and role split are concrete and teen-buildable; the AI features are minor polish, correctly scaled small.

## Ideas, in the video's order
- [0:01:39] Ticket category determines automatic routing to a matching department/agent — pick "Account and Access" and the ticket is auto-assigned to whichever agent covers that category — a clean "if category X, assign to Y" rule, simple enough to build early.
- [0:03:54] **Round-robin fallback**: "if this particular support agent does not have this department then it will automatically assign to some other department" and "if one support agent... is occupied with one ticket, it will automatically assign it to the next one" — load-balancing across multiple agents, a nice stretch-goal concept once basic single-assignment routing works.
- [0:00:33] Two small, well-scoped AI buttons: "Improve with AI" rewrites a ticket's title/description, and "Write with AI" drafts a reply email using that ticket's own data as context — both are single-click, single-purpose AI assists rather than a full open-ended chatbot, a good model for "AI features" scoped small enough for a first project (e.g. "clean up my message" button).
- [0:00:56] Duplicate-account check on registration ("if the email is already registered it will not allow you to create new account") — a real, simple server-side validation example.
- [0:03:13] Attachments allowed up to "10 MB per file," uploaded and stored (implicitly via Drive) — worth flagging as a real Apps Script constraint area (upload size limits) even though the exact ceiling isn't explained.
- [0:08:39] Email templates use variable placeholders (e.g. a ticket-ID token) inserted into a subject/body, then triggered automatically on events like "ticket created" or "ticket assigned" — a clean event-to-template-to-email pattern.
- Generic: light/dark mode, mobile-friendly layout (cosmetic, not backend-relevant).

## What the frames add
Frames are entirely finished-app screenshots (ticket list, ticket edit modal with AI-improve buttons, category/department management, email-trigger settings) — no Apps Script code or AI chat/prompt interface shown in the five sampled frames. Confirms the video is feature-tour only, no build-process content to verify beyond the transcript's description.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Category-to-assignee routing rules; round-robin/fallback assignment when the first choice is unavailable; duplicate-value validation before writing a new row; event-triggered templated emails.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "class help desk" (submit a problem, it auto-routes to whichever "helper" role covers that category, they mark it resolved) is an excellent, well-scoped project: it reuses the CRUD skills from earlier lessons and adds one new concept (routing-by-category) without overwhelming complexity — a strong candidate for a mid-course milestone project.

### Traps a kid will hit
Auto-routing logic (checking who's "occupied" and picking "the next one") is exactly the kind of feature a kid will ask Gemini for in one big prompt and get something that half-works — a good candidate for teaching "build the simple version first (just route by category), then ask for the fallback/round-robin part as a second, separate prompt."

### Doesn't transfer, and why
Nothing here doesn't transfer — this is a well-scaled, genuinely teen-appropriate feature set; only the "10 MB attachment" and email-template polish are more advanced than a first project needs.

## Honest caveats
No AI mistakes or build process shown; standard promotional demo. The exact routing algorithm (how "the next available agent" is chosen) is described verbally but never shown as code, so treat the mechanism as approximate, not verified.
