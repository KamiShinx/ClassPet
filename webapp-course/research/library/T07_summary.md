# T07 summary — Dr. Daniel Soper, Database Design & Management (videos 1-40)

**Counts:** 13 core, 14 useful, 13 skip.

The split is clean and follows the course structure almost exactly. Topic 01 (9 videos: purpose of
a database, problems with lists, intro to relational databases, database systems overview) and most
of Topic 02 (entities, keys, composite/candidate keys, null values) are taught with zero SQL — just
whiteboard drawing and relatable real-world examples (a car repair shop, university IDs, airline
flight numbers, a Sheldon/Penny/Leonard cast of customers). These are excellent, clear, teen-followable
material and map almost one-to-one onto how the kids should design their Google Sheets tabs. All of
Topic 03 (SQL CREATE/INSERT/UPDATE/DELETE/SELECT/joins/GROUP BY/views) is live SQL Server Management
Studio demonstration and syntax — correctly `skip` per the brief, since Gemini writes all the code and
the kids never see SQL.

**5 best videos:**
1. **T6EeA122DlY** (Intro to Relational Databases) — the best single video in the group. Draws live
   how you break one messy list into separate tables linked by matching ID values; this *is* the
   design pattern for a multi-tab Sheet database.
2. **jMTpsTUVGaM** (List Modification Issues) — the clearest walk-through anywhere in the course of
   insert/update/delete anomalies, using a car-repair-shop customer list.
3. **41BTnJ9o2fs** (Users and Databases) — introduces ER diagrams and, crucially, the lookup-table
   pattern for many-to-many relationships (customers × courses × enrollment) — directly useful for
   things like players × items × inventory.
4. **vatOryRgJpQ** (Composite Keys) — the airline flight-number example is a model of how to teach an
   abstract concept through one concrete, memorable scenario.
5. **3d78pO7-JKE** (DBMS and Database Applications) — constraints and referential integrity, with a
   live demo of the database rejecting an invalid row; maps onto data-validation bugs kids will hit.

**Duplicates/overlap noticed:** none exactly duplicated, but the course is intentionally repetitive by
design (Soper re-illustrates the same insert/update/delete anomaly pattern three times across Topic 01
with different casts of characters — students/advisors/departments, then customers/cars). That's a
teaching device, not padding, so nothing was marked skip for redundancy.

**Surprising:** Normalization (oC9ezd5ydaI) and Functional Dependencies (wvxZlIR0Ies) are conceptually
core to the "why split into tabs" story, but both lean on formal jargon (1NF/2NF/3NF, "determinants",
transitive dependency) that would need a guide to translate for 14-15 year-olds — marked `useful`
rather than `core` for that reason, even though the underlying idea (one table = one business concept)
is simple and already taught cleanly elsewhere. Also: 3 videos (BOW-Tc8YVPs, el8cUJyh-T0, uqbuzxxT5lc)
had no caption file and were judged from title/position alone — flagged `nocaps`, verdicts are
best-guess (`useful`, `useful`, `skip` respectively) and should be spot-checked if this group gets used.
