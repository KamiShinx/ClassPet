# T09 summary — Database Star (design) + CodeAI (How the Internet Works)

**36 videos: 11 core, 17 useful, 8 skip.**

All 8 CodeAI "How the Internet Works" videos are `skip` — no caption files, and they're no longer on
YouTube. Title pattern and channel strongly suggest these are a re-upload of code.org's official series;
use code.org's originals instead. All 28 Database Star videos have captions (mostly Whisper-transcribed,
a few original YouTube captions) and are on-topic — none were padded, duplicated, or off-topic enough to
skip.

## The 5 best videos in the group

1. **How to Design a Database** (`5RpUmDEsn1k`) — the master template every other video here actually
   follows: write your idea as a sentence, find the nouns, add attributes, add relationships, review.
   Teach this one first, before any of the "design for X" examples.
2. **Database Design for Chat Application** (`xL_tYrEcP9M`) — closest project shape to what these kids
   will vibe-code, and it's the one video that shows the designer catching and fixing his own mistake
   (a circular relationship) live, which is a good habit to model.
3. **Database Design: Trello (Kanban Board App)** (`7Ck8wSoKJXI`) — boards/lists/cards built feature by
   feature straight from screenshots of the real app; maps directly onto a turn-based/task-tracker app.
4. **Database Design for School Students for an Entire School** (`1YPT6VH256w`) — the most
   requirement-dense walkthrough (16 requirements), realistic and relatable; long, so it's the one video
   in this pick worth handling as "sample the sections."
5. **How I Designed the Hogwarts Database** (`FWobkkYD2s8`) — the fun one: houses, Quidditch teams and
   matches, all built from a fictional world kids already know, while quietly teaching two more
   many-to-many relationships and a self-join (category hierarchy).

Food Delivery App (`vf_9sUqhjwM`) rounds out the picks per the brief's suggested list (chat, school,
Trello, food delivery, games) — also `core`, short and clean.

## Duplicates / overlap noticed

Database Star repeats the same three moves across nearly every "design for X" video: (1) turn a
many-to-many into a joining table, (2) put "type" fields in a lookup table instead of a free-text column,
(3) split a table when it's secretly storing two different things (e.g. Real Estate's property vs.
listing). Once a kid has watched 2–3 "core" examples, the rest (Instagram, Facebook, StackOverflow,
eCommerce, AirBNB, Hotel, Train, Real Estate, Online Course) are all correct and clear but repeat the
same lessons in a different skin — hence `useful`, not `core`. The SQL-syntax trio (Joins, Join 3 Tables,
Self Join) and the two deep-SQL videos (eCommerce Product Database, the design critique) are genuinely
teacher-only: none of it maps to a Google Sheets tab, only the underlying modeling ideas do.

## Surprising find

**The Best Way to Store Phone Numbers** (`PiMlUjQP-JM`) turned out to be one of the most directly useful
videos in the whole group, despite being framed as SQL trivia: storing a phone number as a *number*
silently drops leading zeros — which is exactly what happens in a number-formatted Google Sheets cell
too. Short, concrete, and a real gotcha these kids will actually hit.
