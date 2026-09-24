# T17 summary

16 videos triaged. **Verdicts: 5 core / 6 useful / 5 skip.**

## The 5 best videos
1. **BOW-Tc8YVPs** (Database Entities, Soper) -- core. What a "table" should represent; maps straight onto one-tab-per-thing Sheets design.
2. **O3ey0Mggz84** (Resource Locking, Soper) -- core. The exact concept behind LockService (exclusive access + deadlock), told entirely through everyday analogies, no SQL Server needed.
3. **j4WITZFLkUM** (Functional vs Non-functional Requirements, PMC Lounge) -- core. Jargon-light, immediately useful for scoping a solo app: what to build vs. the quality bar it's expected to hit.
4. **tXXxfYHblXs** (Gold Plating, PMC Lounge) -- core. Names the "I added this cool thing nobody asked for" trap that hobbyist solo coders fall into constantly.
5. **1DAnVydNmxc** (Crow's Foot Symbols, Soper) -- core. Short, concrete one-vs-many notation for deciding which side of a Sheet-tab link the ID column lives on.

## Duplicates found (same idea, one beats the other)
- **Scope creep**: VVS90RgEunw (useful, has the bridge-vs-boat "stick to your goal" example and "document exclusions" advice) beats **_ufV2iBlOeI** (skip, same definition, no actionable prevention tips).
- **Work Breakdown Structure**: QLoYKsOP9Ig (useful, 8 min, software-project example) beats **CWgT38w7aSU** (skip, 21-min IIT classroom lecture built around a bridge -- needs civil-engineering vocabulary kids don't have).

## Soper database series (title-only "useful" calls, now confirmed/changed)
All four hold up conceptually and were originally judged correctly on title alone -- entities, foreign keys, crow's-foot notation, and resource locking all map directly onto the kids' Sheets-as-database + LockService design. The one change: **el8cUJyh-T0** (foreign keys) drops from an implicit "core" assumption to **useful**, because roughly the back half of its 28 minutes is a live SQL Server Management Studio point-and-click demo (plus an off-topic date-format tangent) that doesn't transfer -- only the first ~16 minutes are usable.

## Surprising
- The PMP/IIT "planning" batch splits cleanly along one axis: videos built around a **concrete, relatable example** (a website, a car, a solo developer's temptation to over-deliver) survive; videos built around **construction or enterprise-PM examples** (Chennai metro, bridges, ISO standards) don't, even when the underlying planning concept is sound.
- The three UI/UX "marathon" videos (sampled, first 30 min each) are long-form live-recorded classes with a lot of instructor personal tangents and paid-course ads. None hit "core" -- **xkXaPOb9Qxo** (user research) skips outright as padding/ad-heavy and redundant with the existing CareerFoundry video; **FZ1r5nlqpuc** and **hN65NAkGOw4** land at useful only because of two dense, well-chosen sub-segments (Nielsen's heuristics with famous-app examples; Gestalt principles with the FedEx-arrow/Google-symmetry examples) buried in otherwise ramble-heavy footage.
