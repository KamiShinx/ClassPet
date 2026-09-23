# What is a Database? (IBM Technology, 7.6 min)

**What it is:** talking-head lecture (IBM's Aisha Syed, "Data Management Leader") narrating over a black background with hand-drawn text/diagrams appearing beside her as she talks; explicitly corporate ("IBM has long since been a pioneer..." [0:06:27]). Adult, business-audience framing throughout.
**Substance:** mixed: the core definitions (what a database is, why not flat files, tiers) are clear and correct, but roughly half the runtime is IBM-product-history trivia and "business intelligence"/DBA-career framing that has zero relevance to 14-year-olds.

## Ideas, in the video's order
- [0:00:00] Database = "an organized collection of information," with data as the raw material that "goes into tables... in a database" — fine, minimal starting definition.
- [0:01:12] Names the actual alternative to a database: companies "storing data in flat files... an Excel sheet that's going around an organization" — explicitly the same shape as our own stack (Sheets as storage), so this section reads almost as an argument *against* what we're doing, worth addressing head-on in class ("yes, we're using a spreadsheet as a database — here's why that's fine at our scale and what breaks at large scale").
- [0:01:12]-[0:01:52] Three stated reasons to prefer a real database over passing a file around: efficiency/access, staying on the latest version (not stale copies), consistency and security (generic business reasoning, not really backend mechanics, but useful as "why not just email everyone a spreadsheet").
- [0:01:52]-[0:04:37] One-tier / two-tier / three-tier architecture explained: one-tier = database and app on the same machine (example: Microsoft Access on your home computer); two-tier = database plus apps running off it; three-tier = database + a middle "server" layer with business logic + the application(s), which the video calls "the most common architecture." Reasons given for three-tier: security (server as a checkpoint/"firewall" in front of the database), independent scalability of each layer, and reliability (one tier's outage doesn't take down the others).
- [0:05:15]-[0:05:52] Quick, IBM-centric database history (1960s IMS hierarchical database, then relational databases and SQL, all credited to IBM) — trivia, not concept, and one-sided (doesn't mention Codd/System R's actual multi-company context; treat as promotional framing).
- [0:05:52]-[0:06:27] Database-as-a-Service (DBaaS)/cloud databases: a third party manages security, uptime, and updates so the organization's own staff can focus on "getting intelligence from data" rather than upkeep — a real, useful idea (this is basically what Google is doing for us with Sheets — someone else manages the "server" so kids never touch it).

## What the frames add
Almost nothing beyond words appearing next to the speaker's head: [0:00:10]-[0:02:00] hand-written-style text ("database," "big collection of info," "data -> tables -> database," "efficiency," "update data/consistency," "security") appears to her left as she talks, functioning as a running outline rather than a diagram. [0:02:40]-[0:04:30] adds small labelled boxes for "one-tier," "two-tier" (database/server/application in a row), "three-tier" — genuinely useful as a bare-bones architecture diagram, but it's just boxes and arrows, no visual distinction of what a "tier" running on a different machine actually looks like (no client device, no network line drawn). [0:05:20]-[0:07:10] adds a timeline-style arrow with labels (IMS, relational, "as a service," "by a third party," "managing") tracking the history/DBaaS section — supports the audio, adds nothing new to look at.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Why a shared, organized store beats passing files around (the flat-file problem), the three-tier idea in its simplest form (client/app -> server with logic -> database, matching our own Apps Script-as-middle-layer setup even though the video never uses our stack), and "someone else manages the database for you" (DBaaS), which is a fair description of what Google does for our Sheets.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Use the flat-file section as a discussion starter in week 1-2: "why not just email a spreadsheet to everyone in the class instead of building an app?" and let kids arrive at the answers themselves (someone overwrites it, no one has the latest version, no way to stop people editing others' rows) before revealing those are the same three reasons this video gives (efficiency, currency, consistency/security). Good five-minute framing discussion, not a build task.

### Traps a kid will hit
None shown (no code, no build process, no tool demonstrated).

### Doesn't transfer, and why
The one/two/three-tier taxonomy and DBaaS vocabulary are enterprise-architecture concepts a kid will never need to name explicitly — our whole stack collapses into "your Sheet is the database, your `.gs` code is the one tier of server logic, and there's no separate middleware to reason about." The IBM history section [0:05:15]-[0:05:52] and the "business intelligence"/DBA-career framing throughout are pure adult-workplace content and should be skipped entirely.

## Honest caveats
No AI-building content. Fairly promotional in tone (closes on "IBM has long since been a pioneer in the database world" [0:06:27]) and somewhat one-sided in its history claims; nothing is technically wrong, but roughly 3 of the video's 7.6 minutes (history + DBaaS + closing pitch) are not worth class time. The three-tier diagram is the only piece worth screenshotting; the rest is better delivered as a paraphrased 90-second summary than shown in full.
