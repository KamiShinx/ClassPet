# Round 1: engineer

Position: the design must make Gemini's damage **small, visible and undoable**, and keep the backend
**visible**, not hidden. Everything below is my own 2026 practice unless a batch is cited; "unverified" means
test it before relying on it.

## 0. Before November: one student account, 20 minutes (blocks everything)
Does the editor load? Does a deploy work? Which access options exist? Does `/exec` open in incognito? Can a test
Netlify page `fetch` it? Is there a Gemini icon in the editor? Does TM image run in HtmlService? The answers pick
Plan A or B (§6).

## 1. Course shape
| M | Project | Teaches |
|---|---|---|
| 1-3 | **Hello backend** (guestbook), from the starter | URL = request (`?action=hello&name=Dana` on the hub, S9/A1), deploy, the paste ritual; M3: Ben sabotages their app, they recover it |
| 4-7 | **Quiz Duel** | answers live on the server; M6 cheat hunt; M7 mini-showcase |
| 8-10 | **Live class board** (poll or points ledger) | append + poll; M8 race demo → LockService; M10 showcase |
| 11-12 | **TM photo judge** | the model runs on the client, the record on the server; M12 **"the other door"**: a Netlify page calls their `/exec`, so the migration is rehearsed in February |
| 13-20 | **Final** | M13 pitch + contract; M14-18 sprints; M17 to Netlify; M19 rehearsal; M20 showcase |

## 2. The skeleton: one contract, two doors
Every project, the hub included, starts as a copy of one **template Sheet with a bound script** (Make a copy
brings every file). The files, one concern each:

```
README.gs        project card (comment only); pasted at the top of every new Gemini chat
Api.gs       🔒  doGet / doPost / rpc → route(action, data); selfTest()
Db.gs        🔒  readRows(tab) / addRow(tab, obj) / updateRow; LockService inside; Dates → ISO strings
Logic.gs         the kid's rules, one function per action (getQuestions, checkAnswer…)
Index.html   🔒  shell: include('Style'), include('App'), include('ApiClient')
ApiClient.html 🔒 call(action, data): the one door; logs every request and response to the console
App.html         the kid's page JS          Style.html   the kid's CSS
```

```js
// Api.gs  🔒 FROZEN-API-1: Gemini never rewrites this file
function route(action, data) {
  const allowed = ['getQuestions', 'checkAnswer'];     // THE CONTRACT: kids add names here, nothing else
  if (!allowed.includes(action)) return { error: 'unknown action: ' + action };
  return globalThis[action](data || {});
}
function rpc(action, data) { return route(action, data); }                    // door 1: google.script.run
function doPost(e) { const b = JSON.parse(e.postData.contents); return out_(route(b.action, b.data)); } // door 2
```
In Apps Script, `call()` wraps `google.script.run...rpc()` in a Promise. On Netlify, only `api.js` changes:
`fetch(EXEC, {method:'POST', body: JSON.stringify({action, data})})`, with **no headers** (a string body is
`text/plain`, so no preflight; platform facts §5) and **no `mode:'no-cors'`** (the reply can't be read). GET
`?action=getQuestions` answers too, as raw JSON in the address bar. Ben's `webstreak/Code.gs` already works
this way: the page uses `google.script.run`, a phone app uses `?action=` JSON, and `doPost` feeds the same
handlers. Unverified: I haven't run these exact shapes on a student account.

`selfTest()` (Run ▶ after **every** paste) checks `String(doGet).includes('FROZEN-API-1')`, a marker comment
kept *inside* `doGet`'s body. Then it runs one line per action that the kid writes, like
`check('checkAnswer', {id:1, choice:'b'}, r => r.correct)`: the Minecraft card's checkable claims as code.
Why check `doGet`: all `.gs` files share one global scope, and Ben's `Code.gs` header records a stale pasted
`Habits.gs` whose second `doGet` silently took over the routing. Gemini will do exactly that. `Db.gs` turns
Dates into ISO strings because, from my own knowledge, a `Date` in a `google.script.run` result nulls it with no
error (A1/A2's "silent failure").

## 3. How the class survives a forgetful Gemini
**The five-step paste**, on the wall and in the hub:
1. **New chat per task, README card first.** Gemini's memory is the file, not the chat.
2. **Ask for one function by name**, paste its current code, "reply with only this function" (G2: full-file
   paste overwrites hand edits; `Qu0mJj1nLbw`'s per-file rules; R1's staged asks).
3. **Paste over only the old function.** Never Select All.
4. **Run selfTest, then look at the row in the Sheet** (G2: the real side effect, not the "success" text).
5. **Green = save**: Manage deployments → ✏️ → **New version** (never "New deployment", which gives a new
   URL). Write `v8: checkAnswer works` in the card.

**Reframe the #1 trap** (A1, A2, S2, S4, S6, S10): `/exec` = **last save**, `/dev` = **work in progress**, so
`/exec` keeps working while `/dev` is broken. Recovery: Project History → vN → copy the function back (my
knowledge of the IDE; check it). At each block's end, make a Drive copy into `backups/`.

**Reject a reply on sight** if it has `function doGet`, `openById('YOUR_...')`, a renamed action,
`mode:'no-cors'`, `Content-Type`, an unrequested `<script src>` or framework, or a whole file. **Canvas** is
for the look only; its preview can't run the server half (platform facts §1a). **README card** (~12 lines):
the app in one sentence, the files with 🔒s, tabs and columns, the actions table
(`checkAnswer {id,choice} → {correct,points}`), the rules for Gemini, the last good version. No secrets and no
real names (§0.1). **Guard comments** (`6XC-vN0Ox2k` 12:05) head every 🔒 file and every contract function.

## 4. Where things live
- **Answers and scores**: in the Sheet and Logic.gs. `getQuestions` strips `answer`; the server compares. If
  it shows up in View Source or the console, it's a bug.
- **Teacher tokens**: in Script Properties, never in code, because kids paste code into Gemini. (`webstreak`
  keeps its token as a literal: fine for Ben, wrong for kids.)
- **Concurrency**: `Db.gs` writes use `getScriptLock()`, `tryLock(5000)` and `finally releaseLock()`, the shape
  in `TrumpPrize/backend/Code.gs` (verified; I couldn't find the ClassPet file SYNTHESIS cites). In M8, 15 kids
  hit "+1" on one unlocked cell, the total comes out under 15, and then they add the lock.

## 5. What a backend is, and how Ben knows they got it
`call()` logs every request (`→ checkAnswer {id:3}` / `← {correct:false}`). Ben grades against the kid's
**own** code: **predict the JSON** before opening `?action=getQuestions`; **trace one button** (file → action
→ tab → JSON); a **cheat hunt**, running `call('submitScore',{points:9999})` against a classmate's app and
explaining why it worked or failed; **fix without Gemini**, after Ben renames one entry in `allowed` and the
console shows `unknown action`.

## Typical 90 minutes (a build meeting)
0-5 does last week's `/exec` still work? · 5-20 one concept, one live demo · 20-25 the card's "today" line ·
25-70 three or four paste loops (a whole-file reply gets a red card) · 70-80 cold test: a neighbour does one real
action and tries one cheat · 80-90 hub log: version, what works, "Gemini lied", one exit question.

## 6. Final project and Netlify
The contract sets the scope: **3-6 actions and 2-3 tabs**, written in M13 before any code. At least one action
uses Teachable Machine on live camera or mic, which is the reason to leave Apps Script. The kid ends with a
Netlify frontend (`index.html`, `app.js`, frozen `api.js`), the same skeleton backend, the card as
documentation, and a version history.
- **Plan A** ("Anyone" allowed): fetch as above. `/exec` only; `/dev` needs editor login.
- **Plan B** ("Anyone" removed): an anonymous fetch hits a login wall (§0.3). Fallbacks, all **unverified**:
  (1) IT enables it for the class; (2) Ben deploys the final backends from a teacher account that allows it; (3)
  the Netlify page is only the sensor and hands its result over by top-level navigation
  (`/exec?action=save&label=cat`), which carries the signed-in kid's cookies.
- Netlify: an under-18 Ministry "Sign in with Google" may be blocked (§0.4), so Ben hosts all 15 sites.

## 7. The hub
The same template, bigger, and it doubles as the backend example. It holds `?p=m05` lesson pages, the starter
copy links, each kid's `/exec` URL with version and last selfTest, the "Gemini lied" log and exit tickets. Its
public actions (`hello`, `leaderboard`, `classPoll`) are what M1 opens in the address bar and M12 calls from
Netlify, and kids read its `Api.gs` in M9. Worry: the hub runs as Ben, so 15 kids polling may count against
his 30 simultaneous executions (unverified). Poll every 10 s or more.

## 8. Three claims, how it fails, what others will get wrong
**Claims.** (1) **One contract, two doors from day one**: May becomes a one-file swap, not a rewrite (S4, S5;
`webstreak` works this way). (2) **Frozen files, one-function asks, selfTest, and a new version on green**
contain Gemini (G2, `6XC-vN0Ox2k`, R1, Ben's two-`doGet` bug). (3) **`/exec` = last save** makes the
corpus's top trap the undo button.

**How it fails.** Kids paste whole files anyway. Eight files is a lot for M1. 🔒 files feel like magic, and
`call()` hides HTTP unless the address-bar and console demos stay. Excited kids skip "New version", or pick
"New deployment" and the hub's link goes stale. The history restore is clunky. A Ministry block on Apps Script
or on "Anyone" turns §6 into a workaround.

**What others will get wrong.** `google.script.run` all year, then "just switch" in May. Trusting the Canvas
preview. Treating Gemini's memory as storage. Showcase links never tested logged-out. Concurrency ignored
until the poll loses votes. Frameworks, build steps and server-side `async` let in.
