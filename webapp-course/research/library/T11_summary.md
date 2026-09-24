# T11 summary

**Counts:** core 0, useful 4, skip 4 (of 8 sampled). No `nocaps`.

All 8 are SCALER (interview-prep bootcamp) system-design videos. None are truly `core` - even the useful ones only earn it for a few minutes, because the delivery is interview-framed (QPS/storage math, "how I cracked Facebook") or assumes SQL/RDBMS background. Nothing here is watchable start-to-finish by a 14-year-old without a guide picking the segment.

**Top picks (all `useful`, segment-only):**
1. **zBZEz1vZdIQ** - Relational Data Modelling (LinkedIn schema, 14.5 min, whole video) - the single best video in the group. Clean, complete walkthrough of turning a feature list into entities/relationships, one-to-many vs many-to-many, mapping tables. Directly maps to "how do I lay out my Google Sheets tabs." Needs a guide to swap SQL-speak for Sheets-speak.
2. **mJ_JZCKTki8** - CAP Theorem and Caching (21.4 min) - skip the CAP half (real distributed-systems trade-off, not relevant); the caching half (fridge/milk-tea analogy, cache hit/miss, browser caching) is exactly the "caching as an idea" the brief wants, 0:11:43-0:21:24.
3. **8telu1SoCKM** - System Design Course For Beginners (423 min, sampled first 30) - the "Delicious" story (0:15:40-0:26:45): one laptop -> DNS -> app server + database -> why growth forces horizontal scaling and a load balancer. Good "how the web works" narrative, no math.
4. **ZotHUoS-RCE** - Uber System Design (66 min, sampled first 30) - one narrow segment (0:16:09-0:20:35) cleanly contrasts HTTP request/response with an always-open WebSocket connection. Everything else in the video (QPS math, geohashing, Google S2) is Uber-interview-scale and out of scope.

**Skipped:**
- **AJ11dV1dYqI** (interview framework + URL-shortener math) - redundant with the Delicious story, more interview-flavored.
- **tPjNWR8Ir4c** - Hindi audio, Whisper small.en transcript is garbled/looping nonsense ("value value value value"). Unusable, skip per the Hindi rule.
- **895XCPFr4-k** - its first 30 min is a **near word-for-word duplicate** of 8telu1SoCKM (same LinkedIn schema segment, same Delicious story, same load-balancer intro, same phrasing). Parent course is a 583-min DS/Algo interview marathon.
- **tVwEGkQ6idg** - database sharding; no analogue in a single Google Sheet, and its "why one server gets overloaded" opening repeats ground the Delicious story already covers.

**Duplicates noticed:** the LinkedIn-schema segment (zBZEz1vZdIQ's whole video) is embedded verbatim inside both 8telu1SoCKM and 895XCPFr4-k's first 30 minutes. The Delicious/scaling/load-balancer segment is also identical between 8telu1SoCKM and 895XCPFr4-k. This channel clearly reuses the same standalone clips inside its "complete course" compilations.

**Surprising:** SCALER's short standalone concept videos (schema design, caching) are noticeably cleaner and more teen-usable than the same content wrapped inside their multi-hour "complete course" or "interview prep" videos - the compilations add QPS math and interview framing without adding teaching value.

**Is the rest of the T11 playlist (32 ids total) worth fetching?** **No, not broadly.** Scanning all 32 titles in `videos.json`: it's entirely SCALER interview-prep content - HLD of Tinder/Uber/hotel-booking/Twitter, LLD of Tic-Tac-Toe, multiple 200-650 min "Full DSA + System Design" marathons, and repeated standalone videos on the exact topics we already sampled (three separate horizontal-vs-vertical-scaling videos: `SRggOumoGqE`, `e4fh8M-F6bg`, `Egim7phMIvA`; a second CAP theorem video `8UryASGBiR4`; a second caching video `NFzHTqbd8GU`; consistent hashing `-4XwdbV6Ncg`; load balancing x3 `a0rFl3_BAt0`, `hHi1da5orDk`, `mswjnBHHd1M`). Given the duplication pattern already confirmed in our sample, these are very likely more of the same clips repackaged. The whole playlist skews well past a Sheets-backed app's needs (sharding, HLD interviews, LLD). If anything is worth a cheap standalone check, it's **`q7hEUcgJfZE`** ("Stateless vs Stateful Systems", 6.5 min) - session state is a concept that could plausibly matter for an Apps Script app and wasn't covered in our sample - but that's a minor, low-confidence maybe, not a recommendation to fetch the group.
