# T15 triage summary

32 videos (29 with captions read in full; 3 checked as nocaps: fdaqudiSo5c got a Whisper transcript
mid-triage and was read in full, y0ue4ZZlZwg and r8jQ9hVA2qs stayed caption-less and were judged by title).

**Counts:** core 14, useful 10, skip 8.

## Five best
1. **AGWyx96lP8U** - Tech With Tim, *How I Plan My Coding Projects - 9 Steps*. Stack-agnostic goal -> user
   stories -> data model -> MVP -> wireframe process that maps almost 1:1 onto this course.
2. **dwI5b-wRLic** - Game Maker's Toolkit, *The Two Types of Random*. Input vs. output randomness, plus how
   designers tame it (pity timers, bag systems) - directly usable for loot/turn outcomes.
3. **Lu-RjxeDpU8** - GDC, *Idle Games: Mechanics and Monetization*. A real talk on exactly the genre (idle,
   resource-economy) these kids are building, with the actual exponential/prestige curve math.
4. **LPZh9BOjkQs** - 3Blue1Brown, *Large Language Models explained briefly*. Rigorous, correct core AI-literacy
   video; pairs with u8tjByJtFrg (Harper Carroll, *Why Does AI Hallucinate?*) as a teen-accessible companion.
5. **H0XScE08hy8** - Chrome for Developers, *Debugging JavaScript - Chrome DevTools 101*. Tight 7-minute,
   official walkthrough of the exact tool the kids will debug in.

## Duplicates found
The gap-search picks clustered hard on a few narrow subtopics:
- **Chrome DevTools debugging x3**: H0XScE08hy8 (core, best), ZaOZFkHTloM (useful, deeper but drier),
  y0ue4ZZlZwg (skip - nocaps, redundant with the two already confirmed).
- **Git intros x3**: hwP7WQkmECE (core, 100s primer), tRZGeaHPoaw (useful, thorough but padded with
  GitHub project-management features), r8jQ9hVA2qs (skip - nocaps, redundant).
- **Fetch API x2**: Qblfirx_smU (core, tight + real debugging gotcha) vs. zOrejGF0oBA (useful, messier but
  adds DOM/UI wiring).
- **Skeleton loaders x2**: 4HuI9oHYpNs (core, clean) vs. qa5nWjZggRU (skip - same ground, 17-min rambling
  podcast).
- **Password storage x2**: mQHiil7R2Wc (useful, names bcrypt/argon2) vs. 8ZtInClXe1Q (skip - older, weaker).
- LPZh9BOjkQs + u8tjByJtFrg on LLMs are genuinely complementary, not duplicates - kept both.

## Surprising
Six of the eight topic clusters in this "gap-search" batch turned out to be 2-3 videos on the exact same
narrow subtopic rather than eight distinct gaps - title-based pre-selection produced heavy redundancy.
Several otherwise-solid "useful" videos are thinly-disguised product ads (ClickUp's bug-report video, the
Trello walkthrough, half of the "Vibe Coding Best Practices" video promoting a paid AI app-builder) - the
underlying skill is sound but needs our own write-up to strip the branding. Both password-storage videos and
the Unity state-machine video are correct but solve a harder problem than what these kids actually face
(Sheets-as-database, JS not C#), so they're capped at "useful"/teacher-background rather than core.
