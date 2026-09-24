# T08 triage summary — Soper database course, part 2 (41 videos)

**Counts:** core 16 · useful 15 · skip 10. Two videos had no caption file (`1DAnVydNmxc`, `O3ey0Mggz84`) and were judged from title/series position only.

## Five best videos

1. **cy4uGB7Gc-U — The Lost Update Problem.** The crown jewel of the batch: two users read the same value, both write back, one write silently vanishes. This *is* the race condition the "15 kids click the Sheet at once" lesson is built around — show it before touching LockService.
2. **-CXWjbYX1MY — Introduction to Concurrency Control.** Short, jargon-light setup for why the Lost Update happens at all; the full-lock-vs-no-lock trade-off maps straight onto choosing how aggressively to lock a Sheet.
3. **x1wZPXKz40k — Optimistic vs. Pessimistic Locking.** Names the two strategies LockService actually embodies (pessimistic = lock-the-range-then-write). Runs long and drifts into SQL pseudocode in the last third — point kids at the first two-thirds only.
4. **6XSE3PWo29s — Considerations for Modeling Many-to-Many Relationships.** Teaches the junction-tab pattern directly, with two worked examples (inventories, tags) that map onto real Sheet designs kids will need.
5. **oeRlzvmUB8Q — Considerations for Modeling One-to-Many Binary Relationships.** The single clearest, most teen-followable rule for structuring linked Sheet tabs, with a concrete before/after.

Honorable mention: **PydAvj0eu8o** (Transactions, commit/rollback via an unsaved-Word-doc analogy) and **Zc54pFX6VxY** (Introduction to Database Indexes, a clean textbook-index analogy) — both short and code-free.

## Duplicates noticed

- **Cardinality covered twice from two angles:** `Kzp5wkP9Lo8` (Topic 04, conceptual ER cardinalities) overlaps heavily with `oeRlzvmUB8Q` + `6XSE3PWo29s` (Topic 05, the same one-to-many/many-to-many patterns applied to implementation). All three are `core`, but a guide should probably lead with the Topic 05 pair and treat Topic 04's version as backup.
- **Recursive relationships, twice:** `On4ITNnhSKc` (concept) and `u6-yuru14iI` (implementation) are a tight pair; the second adds only a modest new pattern on top of the first.
- **"Why we lock at all" gets re-explained across the whole Topic 06 arc** (`-CXWjbYX1MY`, `cy4uGB7Gc-U`, `ch65WIjhF4M`, `O3ey0Mggz84`, `x1wZPXKz40k`, `BwaFhBCPDdc`) — useful redundancy for a teacher building the lesson, but a kid only needs 2-3 of the six.

## Surprising

The brief's prediction landed cleanly: **DBA duties (Topic 06, Parts 09-13 — cursors, security, permissions, backup, misc DBA responsibilities) are a clean five-in-a-row `skip`**, all SQL-Server/enterprise-specific with zero Apps Script + Sheets analogue. Same story for most of the **index sub-series (Topic 07)** — 6 of 8 videos skip (B-tree internals, clustered/non-clustered storage, an SSMS tool tutorial), and only the intro + intuitive-overview survive as `core` for the concept of "why lookups can be slow." Nothing else in the group was off the predicted map — the ER-diagram and normalization/denormalization videos (Topic 04-05) triaged almost entirely `core`/`useful` as expected.
