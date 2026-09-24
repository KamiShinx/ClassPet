# T10 summary — Gaurav Sen: System Design (interview-oriented)

**26 videos: 2 core, 7 useful, 17 skip.**

This group is almost entirely graduate/interview-level distributed-systems content (sharding, consistent
hashing, quorum, two-phase commit, LSM trees, QuadTrees/Hilbert curves, CAP theorem) that has nothing to
do with 15 kids building small turn-based apps on Apps Script + Sheets. Four videos have no captions
(`zaRkONvyGr8`, `-BOysyYErLY`, `07BVxmVFDGY`, `CtmBGH8MkX4`) and were judged by title alone — all clearly
interview-prep or deep distributed-systems topics, so all `skip`. One video (`CC-AxHIgBSM`) isn't teaching
content at all, just a walkthrough of the paid InterviewReady course website — `skip`.

## The 5 best videos in the group

1. **Caching in distributed systems** (`zw7VwIlkPPc`) — the strongest video in the group and the only
   other `core` besides the API one. Uses an Instagram-newsfeed example to show why repeating database
   work is wasteful, cuts response time from 220ms to a few ms, and covers cache eviction/staleness in
   plain language. This is precisely the "why apps feel fast" angle the brief asks for, and Apps Script's
   own `CacheService` gives the teacher a direct hook.
2. **What is an API and how do you design it?** (`_YlYuNMTCc8`) — `core`. The first ~9 minutes (what an
   API is, naming functions honestly, why not to overstuff params/responses, thinking through error
   cases) is exactly the API-design literacy these kids need before writing their first Apps Script
   function; the back third gets into HTTP routing/pagination/atomicity and is skippable.
3. **WHATSAPP System Design** (`vvhC64hQZMk`) — `useful`. Minutes 2:51–10:49 answer a question every teen
   has actually wondered: how do the sent/delivered/read tick marks work, and why can't chat just use
   normal request/response? This is the brief's own "fun bonus" example in practice. The rest (consistent
   hashing for groups, message queues, idempotency) needs a guide.
4. **How NETFLIX onboards new content** (`x9Hrn0oNmJM`) — `useful`. Relatable case study on why streaming
   video doesn't buffer and why quality changes — accessible once a few terms (CDN, S3, codec) are
   unpacked.
5. **Designing INSTAGRAM: News Feed** (`QmX2NPkJTKg`) — `useful`. Minutes 3:15–11:00 design the
   likes/comments/follows tables step by step (why you don't bolt a "likes count" onto the posts table) —
   genuinely transferable database-design thinking, in the same spirit as the Database Star videos in
   another group, but surrounded by load-balancer/fan-out material that's out of scope.

Also `useful` but more marginal: **System Design Primer** (`SqcXvc3ZmRU`, the pizza-shop scaling analogy —
teen-followable but the content itself, horizontal scaling for millions of orders, isn't needed), **What
is a Message Queue** (`oUJbuFMyBDk`, another pizza analogy, this time for async processing), **What is a
CDN** (`b4_6thkYZXs`, short and clear but assumes prior videos), and **Introduction to NoSQL databases**
(`xQnIN9bW0og` — only the first 5 minutes on flexible-schema JSON blobs vs. rigid SQL columns is worth a
teacher's time; the rest is Cassandra internals).

## Duplicates noticed

`SqcXvc3ZmRU` (Primer) and `xpDnVSmNFX0` (Horizontal vs Vertical Scaling) cover nearly identical ground —
the Primer does it better with its pizza-shop story, so the Basics video is redundant and was marked
`skip`. The big "design X" case studies (Tinder, Instagram, WhatsApp, TikTok) all share the same
interview-room framing and repeat the same building blocks (gateway → auth → microservices → load
balancer) each time.

## Surprising find

The channel is far more consistent than expected — almost every video is well-produced and correct, just
aimed squarely at software engineers prepping for FAANG interviews, not curious teenagers. The two
`core` picks stood out specifically because they're the only two that teach a transferable *mental model*
(why caching matters, what an API contract is) rather than an engineering technique for scale these kids
will never hit with 15 users.
