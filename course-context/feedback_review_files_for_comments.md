---
name: feedback-review-files-for-comments
description: "When a big research/design result lands, Ben wants ONE organised md file he can read and comment in — chat summaries get missed"
metadata:
  node_type: memory
  type: feedback
  originSessionId: b316a12b-8ab8-427a-8055-3553d4f67d84
  modified: 2026-09-24T08:43:02.575Z
---

After the Minecraft course research, Ben said he "missed your entire summary" in chat and asked for "an organized
md file i can go through and leave you comments". Delivered as `REVIEW.md`: contents list, numbered sections,
a `💬 Comments:` slot after each, decisions and tests with a `💬` each, instruction to prefix comments `BEN:`.

**Why:** long chat replies scroll away; he reviews at his own pace and wants to answer point by point.

**Remote Control (24 Sep):** Ben often works through Remote Control and CANNOT open file links in my messages, nor
files outside the session's working dir (a C:/Users/Ben/code path failed). Always deliver files with SendUserFile,
from inside the working directory (copy them there first if needed); give GitHub links as a fallback.

**How to apply:** for any multi-part result (research, course design, plan with decisions), write the organised
review file in the project, commit it, send it with SendUserFile, and keep the chat reply to a few lines pointing
at it. When he says he's done, read every `BEN:`/`💬` comment and answer each. See [[feedback-how-ben-wants-answers]].
