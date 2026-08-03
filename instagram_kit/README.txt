ClassPet / T.A.V.A.S. — Instagram Carousel Image Kit
=====================================================

This kit downloads a fitting, FREE image for every frame of the 7 carousels
(Ben's 4 posts + Ram's 3 posts = 42 frames total), each file already named by
post and frame number.

------------------------------------------------------------------
WHY ISN'T THE ZIP JUST FULL OF PHOTOS?
------------------------------------------------------------------
The workspace these posts were written in has its internet access locked down
by an organization policy — it can't reach Wikimedia / NASA / image sites — so
the pictures couldn't be bundled directly. This tiny script fetches them on
YOUR computer instead. It needs nothing but Python 3 (already on every Mac and
Linux; on Windows install from python.org).

------------------------------------------------------------------
HOW TO RUN
------------------------------------------------------------------
1. Open a terminal in this folder.
2. Run:      python3 download_images.py
   (on Windows, sometimes:   py download_images.py )
3. Wait ~1 minute.

You'll get:
   images/Post1_Ben_Mars/P1_Mars_frame1_title.jpg   ... and so on for all 42
   images/CREDITS.csv      -> author + license + source link for EVERY image
   images/gallery.html     -> open in any browser to preview the whole set

------------------------------------------------------------------
FILE NAMING
------------------------------------------------------------------
   P<post#>_<topic>_frame<frame#>_<what-it-shows>.jpg
   e.g.  P2_Moon_frame4_artemis.jpg  = Post 2 (Moon/Artemis), frame 4.
Folders are grouped per post and say who writes it (Ben / Ram).

------------------------------------------------------------------
LICENSING — PLEASE READ
------------------------------------------------------------------
All images come from Wikimedia Commons and are free to use, but most licenses
(CC-BY / CC-BY-SA) REQUIRE crediting the author. CREDITS.csv lists the author
and license for each file — keep that credit when you publish (e.g. in the
post caption or a "photo credits" note). NASA/ESA/public-domain images need no
credit but it's polite to add one.

------------------------------------------------------------------
NOT HAPPY WITH A PICTURE?
------------------------------------------------------------------
Just go to https://commons.wikimedia.org , search for a better one, download
it, and save it over the file with the SAME name. Done.

POSTS_TEXT.md in this folder has the full Hebrew text of all 7 posts (every
slide + caption + hashtags) so everything for Hadar Porat is in one place.
