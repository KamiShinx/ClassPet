# Prompt to paste into Claude Code on your PC

Open a terminal in the folder that contains this `instagram_kit/` and start
Claude Code there, then paste the prompt below.

---

I'm preparing an Instagram carousel series (educational science/tech posts in
Hebrew). This folder has an `instagram_kit/` with:

- `IMAGE_BRIEF.md` — a table of all 42 carousel frames: the exact output
  filename, what each image should show, and a search hint.
- `POSTS_TEXT.md` — the full Hebrew text of all 7 posts (for context).
- `download_images.py` — a ready stdlib-only fetcher (Wikimedia Commons) you
  may run as a starting point.

Please get me a real, freely-licensed image for every one of the 42 frames:

1. Run `python3 instagram_kit/download_images.py` first — it downloads one
   Wikimedia Commons image per frame into `instagram_kit/images/<folder>/`,
   already named per `IMAGE_BRIEF.md`, and writes `CREDITS.csv`.
2. Then open `instagram_kit/images/gallery.html` and review every image.
   For any frame where the auto-pick is a poor fit, low-res (< ~1000px wide),
   a diagram when a photo is better (or vice-versa), or awkwardly cropped —
   find a better freely-licensed replacement yourself (Wikimedia Commons,
   NASA images, ESA, or another CC-BY / public-domain source) and save it over
   the file with the SAME filename. Update its row in `CREDITS.csv`
   (author + license + source URL) to match.
3. Prefer images that are landscape or square and at least ~1080px wide so
   they fit an Instagram 1080×1080 frame without pixelating.
4. Keep everything freely usable: only public-domain or CC-BY / CC-BY-SA
   images. Do NOT use anything that's copyrighted / all-rights-reserved.
   Make sure `CREDITS.csv` ends up accurate for all 42 — I need it for
   attribution in the captions.
5. When done, give me a short summary: which frames used the auto-pick and
   which you replaced, and flag any frame where you couldn't find a good free
   image so I can source it manually.
