# How the hub's meeting 1 is built

`hub/Index.html` is one file, but its lesson data lives here so it can be edited in pieces:
- `hub_v3_data.js`: the kids' plan, the messages to Gemini, the 12 steps.
- `hub_v3_slides.js`: the teacher's 10 slides.
- `hub_v3_build.py`: puts both into `hub/Index.html`, and embeds `m1/pet/Pet.html` (the egg) as `EGG`.
- `v3_test.py`: a local browser test (Playwright + Edge) of the egg, the steps and the slides.

After changing any of these, or `m1/pet/Pet.html`: `python hub_v3_build.py`, then `python v3_test.py`.
