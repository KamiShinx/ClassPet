# Batch S2 — Laurence Svekis Apps Script channel (10 videos)

## Overview
This batch splits cleanly into three groups: (1) a custom Apps Script `doGet`/JSON-API mini-series (`8YhwarXcPeU`, `fqQOdkwBr9E`) — the strongest "what is an API" material in the batch; (2) a no-backend, public-sheet gviz/tq query-language mini-series (`CtLRDP0jLNc`, `3QWzYqZd0w4`, `89wp3_5Vp5w`, `aP2cM7EuLeo`) — a genuinely different architecture worth contrasting against (1); and (3) two off-topic Apps Script automation videos (`1o_axAfvIiQ` cell-styling, `fwmG1E5PoSc` sheet-copying) plus one HtmlService templating lesson (`j8y7hRxsSww`) and one near-content-free trailer (`eivt2_YXecM`). Per the brief: 5 of 10 videos are squarely web-app/API content, 2 are pure Sheets automation with little to do with web apps, 1 is templating (a related but distinct concept), and 1 is a promo.

## Where videos agree
All the API-flavored videos (both the custom-`doGet` and the gviz groups) converge on the same core model: a URL is a request, query parameters configure what comes back, the response has to be turned from text into a usable JS object, and you loop the result to render it. Every video that touches deployment repeats the same warning almost verbatim: **redeploy after every code change, or the public `/exec` URL won't reflect it** — this recurs across `8YhwarXcPeU`, `fqQOdkwBr9E`, and `j8y7hRxsSww`, strongly suggesting it is THE most common real beginner trap for this stack, not a one-off annoyance.

## Where they contradict / diverge
The two API sub-series are architecturally opposed and this is worth teaching explicitly rather than glossing over: the custom-`doGet` approach (private-by-default, needs deployment, can filter/paginate/write) vs. the gviz/public-sheet approach (zero deploy, but read-only, sheet must be shared publicly, response isn't valid JSON out of the box — needs a fragile string-strip hack). A kid who watches only the gviz videos would come away thinking "APIs = public spreadsheets," which is a wrong generalization for anything needing privacy or writes.

## What to cut
Cut `eivt2_YXecM` (55-second promo, no content) outright. Treat `aP2cM7EuLeo` as the single representative of the gviz sub-series rather than showing all four gviz videos — it's the most polished/debugged version of the same technique already covered in `CtLRDP0jLNc`/`3QWzYqZd0w4`/`89wp3_5Vp5w`. Don't use `1o_axAfvIiQ` or `fwmG1E5PoSc` to teach "what is an API" — they're honest, competent Sheets-scripting lessons but have zero web/HTTP content; use them only if/when the class needs plain server-side data-manipulation exercises.

## Concept explainers worth reusing
- Request/response/deploy pipeline, taught cleanly end to end: `8YhwarXcPeU` [0:04:19]-[0:19:01].
- Query params as server-side configuration + pagination math: `fqQOdkwBr9E` [0:02:40]-[0:12:22].
- A live, real CORS error and its fix: `CtLRDP0jLNc` [0:12:36]-[0:13:07] — rare to see this shown honestly on screen; reuse as a "here's what this error actually looks like" reference.
- URL encoding + SQL-like server-side filtering: `89wp3_5Vp5w` [0:04:27]-[0:11:00] — the cleanest single-concept video in the batch.
- Server-side templating (scriptlet injection) vs. fetch-a-JSON-API, as two distinct patterns: `j8y7hRxsSww` [0:10:56]-[0:13:42].

## Project seeds (rewritten at teen scale, tagged with backend concept)
1. **Class joke/fact API** — Sheet of items with categories/status; `doGet` returns JSON; separate page fetches and renders. *Teaches: request/response, deployment, JSON parsing.* (from `8YhwarXcPeU`)
2. **Filtered leaderboard** — extend #1 with `?category=` and `?page=` params, server-side splice/pagination. *Teaches: query params, input validation, pagination.* (from `fqQOdkwBr9E`)
3. **Zero-deploy public dashboard** — share a Sheet publicly, read it straight via gviz from a plain page (no Apps Script backend). *Teaches: an API can be a service you didn't write; CORS; read-only vs. read-write tradeoffs.* (from `CtLRDP0jLNc`)
4. **"Query builder" tool** — form with sheet-ID/sheet-name/query text inputs, builds a gviz request live. *Teaches: URL construction, encoding, SQL-like filtering.* (from `89wp3_5Vp5w`, `eivt2_YXecM`'s screenshot as the target UI)
5. **One-page Apps Script app** — single project, `doGet` injects Sheet data via scriptlet into one HTML page, no separate fetch. *Teaches: templating as the simplest possible full-stack pattern; good FIRST milestone before introducing fetch/JSON APIs.* (from `j8y7hRxsSww`)
6. **"Two ways to the same data" comparison exercise** — build the same small feature once with `doGet`+fetch and once with gviz, then discuss tradeoffs as a class. *Teaches: architecture choice, not just syntax.* (synthesized from groups 1+2 above)
7. **Weekly archive utility** — button that copies this week's sheet to a dated, contents-only backup. *Teaches: server-side data housekeeping, options-object parameters.* (from `fwmG1E5PoSc`, secondary/optional)

## Traps
Forgetting to redeploy (the single biggest recurring trap, named 3+ times across this batch); 0-based array index vs. 1-based sheet row/column off-by-one (`1o_axAfvIiQ`); CORS errors from a raw fetch to a non-CORS-enabled Docs URL (`CtLRDP0jLNc`); the gviz response not being valid JSON out of the box, requiring a fragile substring hack that breaks if Google changes the wrapper text (`CtLRDP0jLNc`, `aP2cM7EuLeo`); blank header cells silently corrupting the whole gviz response (`3QWzYqZd0w4`); untrusted/unvalidated query params breaking pagination math (`fqQOdkwBr9E`); confusing whole-sheet vs. range `copyTo()` behavior (`fwmG1E5PoSc`); Apps Script's own iframe-sandbox console noise (unrelated feature-detection warnings) being mistaken for a real bug (`j8y7hRxsSww`).
