/* The course hub for the web-app course (MAKE): the kids' step-by-step lessons and the teacher's slides.
   Deploy from Ben's account as a web app, "Anyone". Kids open its link; nothing about them is stored here
   (their design card and their place in the lesson stay in their own browser).
   Fill in the two links below after making the template and your demo pet (see TEACHER_SETUP.md). */

const TEMPLATE_URL = 'PASTE_THE_TEMPLATE_SHEET_LINK_HERE';   // the pet starter Sheet, shared "Anyone with the link: Viewer"
const DEMO_URL = 'PASTE_YOUR_DEMO_PET_LINK_HERE';            // your own pet's web app link (ends in /exec)

/* Opens the hub. Add ?page=slides1 to the link for the teacher's slides of meeting 1. */
function doGet(e) {
  const t = HtmlService.createTemplateFromFile('Index');
  t.cfg = JSON.stringify({ template: TEMPLATE_URL, demo: DEMO_URL, page: (e && e.parameter && e.parameter.page) || '' });
  return t.evaluate()
    .setTitle('MAKE · אפליקציות ומשחקים')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
